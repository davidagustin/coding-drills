'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY: (number | boolean | string | null | undefined)[] = [
  0,
  1,
  false,
  2,
  '',
  3,
  null,
  undefined,
];

interface CompactStep {
  arr: (number | boolean | string | null | undefined)[];
  result: number[];
  i: number;
  explanation: string;
}

function computeSteps(): CompactStep[] {
  const steps: CompactStep[] = [];
  const result: number[] = [];

  steps.push({
    arr: [...ARRAY],
    result: [],
    i: -1,
    explanation: `Start: Remove falsy values from array`,
  });

  for (let i = 0; i < ARRAY.length; i++) {
    const val = ARRAY[i];
    const isTruthy = Boolean(val);
    if (isTruthy) {
      result.push(val as number);
      steps.push({
        arr: [...ARRAY],
        result: [...result],
        i,
        explanation: `Index ${i}: ${val} is truthy → keep`,
      });
    } else {
      steps.push({
        arr: [...ARRAY],
        result: [...result],
        i,
        explanation: `Index ${i}: ${String(val)} is falsy → remove`,
      });
    }
  }

  steps.push({
    arr: [...ARRAY],
    result: [...result],
    i: -1,
    explanation: `Complete: Result = [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function CompactViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, result, i, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Compact Array</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Original Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Original Array</h3>
          <div className="flex gap-2 flex-wrap">
            {arr.map((val, idx) => {
              const isCurrent = idx === i;
              const isTruthy = Boolean(val);
              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  className={`w-20 h-16 rounded-lg flex items-center justify-center font-mono text-sm font-semibold border-2 ${
                    isCurrent
                      ? isTruthy
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-red-500/20 border-red-500 text-red-400'
                      : isTruthy
                        ? 'bg-zinc-800 border-zinc-700 text-zinc-300'
                        : 'bg-zinc-700/50 border-zinc-600 text-zinc-500'
                  }`}
                >
                  {String(val === null ? 'null' : val === undefined ? 'undefined' : val)}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Result Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Result Array (Truthy Only)</h3>
          <div className="flex gap-2 flex-wrap">
            {result.length === 0 ? (
              <div className="text-zinc-500 text-sm">Empty</div>
            ) : (
              result.map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-16 h-16 rounded-lg bg-green-500/20 border-2 border-green-500 flex items-center justify-center font-mono text-lg font-semibold text-green-400"
                >
                  {val}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
