'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [1, 2, 3, 4, 5, 6, 7, 8];

interface SkipStep {
  arr: number[];
  result: number[];
  i: number;
  explanation: string;
}

function computeSteps(): SkipStep[] {
  const steps: SkipStep[] = [];
  const result: number[] = [];

  steps.push({
    arr: [...ARRAY],
    result: [],
    i: -1,
    explanation: `Start: Skip every other element from array [${ARRAY.join(', ')}]`,
  });

  for (let i = 0; i < ARRAY.length; i += 2) {
    result.push(ARRAY[i]);
    steps.push({
      arr: [...ARRAY],
      result: [...result],
      i,
      explanation: `Index ${i}: Add arr[${i}] = ${ARRAY[i]} to result`,
    });
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

export default function SkipEveryOtherViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, result, i, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Skip Every Other Element</h2>

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
              return (
                <motion.div
                  key={idx}
                  className="relative"
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                >
                  <div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                      isCurrent
                        ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                    }`}
                  >
                    {val}
                  </div>
                  <div className="text-xs text-zinc-500 text-center mt-1">{idx}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Result Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Result Array</h3>
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
