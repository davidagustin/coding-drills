'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const STEP = 3;

interface StepIterationStep {
  arr: number[];
  result: number[];
  i: number;
  step: number;
  explanation: string;
}

function computeSteps(): StepIterationStep[] {
  const steps: StepIterationStep[] = [];
  const result: number[] = [];

  steps.push({
    arr: [...ARRAY],
    result: [],
    i: -1,
    step: STEP,
    explanation: `Start: Iterate with step ${STEP} through array [${ARRAY.join(', ')}]`,
  });

  for (let i = 0; i < ARRAY.length; i += STEP) {
    result.push(ARRAY[i]);
    steps.push({
      arr: [...ARRAY],
      result: [...result],
      i,
      step: STEP,
      explanation: `Index ${i}: Add arr[${i}] = ${ARRAY[i]} to result (next: ${i + STEP})`,
    });
  }

  steps.push({
    arr: [...ARRAY],
    result: [...result],
    i: -1,
    step: STEP,
    explanation: `Complete: Result = [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function StepIterationViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, result, i, step: stepSize, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Custom Step Iteration</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        <p className="text-zinc-400 text-xs mt-1">Step size: {stepSize}</p>
      </div>

      <div className="space-y-6">
        {/* Original Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Original Array</h3>
          <div className="flex gap-2 flex-wrap">
            {arr.map((val, idx) => {
              const isCurrent = idx === i;
              const isSkipped = i >= 0 && idx > i && idx < i + stepSize;
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
                        ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                        : isSkipped
                          ? 'bg-zinc-700/50 border-zinc-600 text-zinc-500'
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
