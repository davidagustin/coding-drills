'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const A = 48;
const B = 18;

interface GCDStep {
  a: number;
  b: number;
  remainder: number;
  explanation: string;
}

function computeSteps(): GCDStep[] {
  const steps: GCDStep[] = [];
  let a = A;
  let b = B;

  steps.push({
    a,
    b,
    remainder: 0,
    explanation: `Start: Find GCD(${A}, ${B}) using Euclidean algorithm`,
  });

  while (b !== 0) {
    const remainder = a % b;
    steps.push({
      a,
      b,
      remainder,
      explanation: `${a} % ${b} = ${remainder}`,
    });

    a = b;
    b = remainder;

    steps.push({
      a,
      b,
      remainder,
      explanation: `Update: a = ${a}, b = ${b}`,
    });
  }

  steps.push({
    a,
    b: 0,
    remainder: 0,
    explanation: `Complete: GCD(${A}, ${B}) = ${a}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function GCDViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { a, b, remainder, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">
        Greatest Common Divisor (Euclidean Algorithm)
      </h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            GCD({A}, {B}) = {a}
          </p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-zinc-800 rounded-lg text-center">
            <p className="text-zinc-400 text-sm mb-2">a</p>
            <p className="text-2xl font-bold text-white">{a}</p>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg text-center">
            <p className="text-zinc-400 text-sm mb-2">b</p>
            <p className="text-2xl font-bold text-white">{b}</p>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg text-center">
            <p className="text-zinc-400 text-sm mb-2">Remainder</p>
            <p className="text-2xl font-bold text-white">{remainder}</p>
          </div>
        </div>

        <div className="p-6 bg-zinc-950 rounded-lg border border-zinc-800">
          <p className="text-white text-center text-xl font-mono">
            GCD({A}, {B}) = {step === STEPS.length - 1 ? a : '...'}
          </p>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
