'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [1, 2, 3, 4, 5, 1];
const PREDICATE = (x: number) => x < 4;

interface TakeWhileStep {
  arr: number[];
  result: number[];
  i: number;
  explanation: string;
}

function computeSteps(): TakeWhileStep[] {
  const steps: TakeWhileStep[] = [];
  const result: number[] = [];

  steps.push({
    arr: [...ARRAY],
    result: [],
    i: -1,
    explanation: `Start: Take elements while predicate (x < 4) is true`,
  });

  for (let i = 0; i < ARRAY.length; i++) {
    const val = ARRAY[i];
    const passes = PREDICATE(val);
    if (passes) {
      result.push(val);
      steps.push({
        arr: [...ARRAY],
        result: [...result],
        i,
        explanation: `Index ${i}: ${val} < 4 → add to result`,
      });
    } else {
      steps.push({
        arr: [...ARRAY],
        result: [...result],
        i,
        explanation: `Index ${i}: ${val} >= 4 → stop (predicate false)`,
      });
      break;
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

export default function TakeWhileViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, result, i, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Take While</h2>

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
              const passes = PREDICATE(val);
              const isTaken = idx < result.length;
              const isStopped = idx === i && !passes;
              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                    isStopped
                      ? 'bg-red-500/20 border-red-500 text-red-400'
                      : isTaken
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : isCurrent
                          ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  {val}
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
