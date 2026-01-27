'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [1, 2, 3, 4, 5, 6];
const PREDICATE = (n: number) => n % 2 === 0; // Even numbers

interface PartitionStep {
  arr: number[];
  truthy: number[];
  falsy: number[];
  i: number;
  explanation: string;
}

function computeSteps(): PartitionStep[] {
  const steps: PartitionStep[] = [];
  const truthy: number[] = [];
  const falsy: number[] = [];

  steps.push({
    arr: [...ARRAY],
    truthy: [],
    falsy: [],
    i: -1,
    explanation: `Start: Partition array by predicate (even numbers)`,
  });

  for (let i = 0; i < ARRAY.length; i++) {
    const val = ARRAY[i];
    const passes = PREDICATE(val);
    if (passes) {
      truthy.push(val);
      steps.push({
        arr: [...ARRAY],
        truthy: [...truthy],
        falsy: [...falsy],
        i,
        explanation: `Index ${i}: ${val} is even → add to truthy group`,
      });
    } else {
      falsy.push(val);
      steps.push({
        arr: [...ARRAY],
        truthy: [...truthy],
        falsy: [...falsy],
        i,
        explanation: `Index ${i}: ${val} is odd → add to falsy group`,
      });
    }
  }

  steps.push({
    arr: [...ARRAY],
    truthy: [...truthy],
    falsy: [...falsy],
    i: -1,
    explanation: `Complete: Truthy = [${truthy.join(', ')}], Falsy = [${falsy.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function PartitionViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, truthy, falsy, i, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Partition Array</h2>

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
              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                    isCurrent
                      ? passes
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-red-500/20 border-red-500 text-red-400'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  {val}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Partitioned Arrays */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Truthy Group (Even)</h3>
            <div className="flex gap-2 flex-wrap">
              {truthy.length === 0 ? (
                <div className="text-zinc-500 text-sm">Empty</div>
              ) : (
                truthy.map((val, idx) => (
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
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Falsy Group (Odd)</h3>
            <div className="flex gap-2 flex-wrap">
              {falsy.length === 0 ? (
                <div className="text-zinc-500 text-sm">Empty</div>
              ) : (
                falsy.map((val, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-16 h-16 rounded-lg bg-red-500/20 border-2 border-red-500 flex items-center justify-center font-mono text-lg font-semibold text-red-400"
                  >
                    {val}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
