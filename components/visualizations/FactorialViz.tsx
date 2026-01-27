'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const N = 5;

interface FactorialStep {
  n: number;
  result: number;
  callStack: number[];
  explanation: string;
}

function computeSteps(): FactorialStep[] {
  const steps: FactorialStep[] = [];
  const callStack: number[] = [];

  function factorial(n: number): number {
    callStack.push(n);
    steps.push({
      n,
      result: 0,
      callStack: [...callStack],
      explanation: `Call factorial(${n})`,
    });

    if (n === 0 || n === 1) {
      callStack.pop();
      steps.push({
        n,
        result: 1,
        callStack: [...callStack],
        explanation: `Base case: factorial(${n}) = 1`,
      });
      return 1;
    }

    const prev = factorial(n - 1);
    const result = n * prev;

    callStack.pop();
    steps.push({
      n,
      result,
      callStack: [...callStack],
      explanation: `factorial(${n}) = ${n} × factorial(${n - 1}) = ${n} × ${prev} = ${result}`,
    });

    return result;
  }

  steps.push({
    n: N,
    result: 0,
    callStack: [],
    explanation: `Start: Compute ${N}!`,
  });

  const result = factorial(N);

  steps.push({
    n: N,
    result,
    callStack: [],
    explanation: `Complete: ${N}! = ${result}`,
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

export default function FactorialViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { n, result, callStack, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Factorial</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Result: {result}</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div className="p-6 bg-zinc-950 rounded-lg border border-zinc-800">
          <p className="text-white text-center text-2xl font-mono mb-4">{n}!</p>
          <p className="text-white text-center text-xl">
            = {step === STEPS.length - 1 ? result : '...'}
          </p>
        </div>

        {callStack.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Call Stack</h3>
            <div className="flex flex-col-reverse gap-2 items-center">
              {callStack.map((val, i) => (
                <motion.div
                  key={i}
                  className="w-24 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: COLORS.current,
                    borderColor: COLORS.current,
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  factorial({val})
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
