'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

interface KadaneStep {
  arr: number[];
  currentSum: number;
  bestSum: number;
  i: number;
  explanation: string;
}

function computeSteps(): KadaneStep[] {
  const steps: KadaneStep[] = [];
  let bestSum = ARRAY[0];
  let currentSum = ARRAY[0];

  steps.push({
    arr: [...ARRAY],
    currentSum,
    bestSum,
    i: 0,
    explanation: `Start: Initialize currentSum = ${currentSum}, bestSum = ${bestSum}`,
  });

  for (let i = 1; i < ARRAY.length; i++) {
    const val = ARRAY[i];
    currentSum = Math.max(val, currentSum + val);
    bestSum = Math.max(bestSum, currentSum);
    steps.push({
      arr: [...ARRAY],
      currentSum,
      bestSum,
      i,
      explanation: `Index ${i}: val=${val}, currentSum = max(${val}, ${currentSum - val} + ${val}) = ${currentSum}, bestSum = ${bestSum}`,
    });
  }

  steps.push({
    arr: [...ARRAY],
    currentSum,
    bestSum,
    i: -1,
    explanation: `Complete: Maximum subarray sum = ${bestSum}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function KadanesAlgorithmViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, currentSum, bestSum, i, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Kadane&apos;s Algorithm</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Array</h3>
          <div className="flex gap-2 flex-wrap">
            {arr.map((val, idx) => {
              const isCurrent = idx === i;
              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                    isCurrent
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

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-400 mb-1">Current Sum</div>
            <div className="text-2xl font-bold text-blue-400">{currentSum}</div>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-400 mb-1">Best Sum</div>
            <div className="text-2xl font-bold text-green-400">{bestSum}</div>
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
