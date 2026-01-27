'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const BASE = 2;
const EXP = 10;

interface PowStep {
  base: number;
  exp: number;
  result: number;
  explanation: string;
}

function computeSteps(): PowStep[] {
  const steps: PowStep[] = [];
  
  function power(base: number, exp: number): number {
    if (exp === 0) {
      steps.push({
        base,
        exp: 0,
        result: 1,
        explanation: 'Base case: any number to power 0 = 1',
      });
      return 1;
    }
    
    if (exp < 0) {
      steps.push({
        base,
        exp,
        result: 0,
        explanation: `Negative exponent: ${base}^${exp} = 1 / ${base}^${Math.abs(exp)}`,
      });
      return 1 / power(base, -exp);
    }
    
    const half = Math.floor(exp / 2);
    steps.push({
      base,
      exp,
      result: 0,
      explanation: `Compute ${base}^${exp} = (${base}^${half})^2 × ${base}^${exp % 2}`,
    });
    
    const halfResult = power(base, half);
    const result = halfResult * halfResult * (exp % 2 === 1 ? base : 1);
    
    steps.push({
      base,
      exp,
      result,
      explanation: `${base}^${half} = ${halfResult}, ${base}^${exp} = ${halfResult}² × ${exp % 2 === 1 ? base : 1} = ${result}`,
    });
    
    return result;
  }
  
  steps.push({
    base: BASE,
    exp: EXP,
    result: 0,
    explanation: `Start: Compute ${BASE}^${EXP}`,
  });
  
  const result = power(BASE, EXP);
  
  steps.push({
    base: BASE,
    exp: EXP,
    result,
    explanation: `Complete: ${BASE}^${EXP} = ${result}`,
  });
  
  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  result: '#22c55e',
  default: '#3b82f6',
} as const;

export default function PowViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { base, exp, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Power (x^n)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Result: {result}
          </p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-zinc-800 rounded-lg text-center">
            <p className="text-zinc-400 text-sm mb-2">Base</p>
            <p className="text-2xl font-bold text-white">{base}</p>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg text-center">
            <p className="text-zinc-400 text-sm mb-2">Exponent</p>
            <p className="text-2xl font-bold text-white">{exp}</p>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg text-center">
            <p className="text-zinc-400 text-sm mb-2">Result</p>
            <motion.p
              className="text-2xl font-bold text-white"
              style={{ color: COLORS.result }}
              animate={{
                scale: step === STEPS.length - 1 ? 1.1 : 1,
              }}
            >
              {result}
            </motion.p>
          </div>
        </div>

        <div className="p-6 bg-zinc-950 rounded-lg border border-zinc-800">
          <p className="text-white text-center text-2xl font-mono">
            {base}<sup>{exp}</sup> = {result || '...'}
          </p>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
