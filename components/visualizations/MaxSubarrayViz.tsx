'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

interface MaxSubarrayStep {
  arr: number[];
  i: number;
  currentSum: number;
  maxSum: number;
  start: number;
  end: number;
  explanation: string;
}

function computeSteps(): MaxSubarrayStep[] {
  const steps: MaxSubarrayStep[] = [];
  let currentSum = 0;
  let maxSum = ARRAY[0];
  let start = 0;
  let end = 0;

  steps.push({
    arr: [...ARRAY],
    i: -1,
    currentSum: 0,
    maxSum: ARRAY[0],
    start: 0,
    end: 0,
    explanation: "Start: Find maximum subarray sum (Kadane's algorithm)",
  });

  for (let i = 0; i < ARRAY.length; i++) {
    if (currentSum < 0) {
      currentSum = ARRAY[i];
      start = i;
      steps.push({
        arr: [...ARRAY],
        i,
        currentSum,
        maxSum,
        start,
        end: i,
        explanation: `Reset: currentSum < 0, start new subarray at ${i}`,
      });
    } else {
      currentSum += ARRAY[i];
      steps.push({
        arr: [...ARRAY],
        i,
        currentSum,
        maxSum,
        start,
        end: i,
        explanation: `Extend: currentSum += ${ARRAY[i]} = ${currentSum}`,
      });
    }

    if (currentSum > maxSum) {
      maxSum = currentSum;
      end = i;
      steps.push({
        arr: [...ARRAY],
        i,
        currentSum,
        maxSum,
        start,
        end,
        explanation: `Update maxSum = ${maxSum}, subarray [${start}, ${end}]`,
      });
    }
  }

  steps.push({
    arr: [...ARRAY],
    i: -1,
    currentSum,
    maxSum,
    start,
    end,
    explanation: `Complete: Max sum = ${maxSum}, subarray [${start}, ${end}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  maxSubarray: '#22c55e',
  default: '#3b82f6',
} as const;

export default function MaxSubarrayViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, i, currentSum, maxSum, start, end, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Maximum Subarray</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Max Sum: {maxSum}, Subarray: [{arr.slice(start, end + 1).join(', ')}]
          </p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array</h3>
          <div className="flex gap-2 justify-center">
            {arr.map((n, idx) => {
              const isCurrent = i === idx;
              const inSubarray = idx >= start && idx <= end && step === STEPS.length - 1;

              let bgColor: string = COLORS.default;
              if (inSubarray) {
                bgColor = COLORS.maxSubarray;
              } else if (isCurrent) {
                bgColor = COLORS.current;
              }

              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <motion.div
                    className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                    style={{
                      backgroundColor: bgColor,
                      borderColor: isCurrent || inSubarray ? '#fff' : bgColor,
                    }}
                    animate={{
                      scale: isCurrent || inSubarray ? 1.2 : 1,
                    }}
                  >
                    {n}
                  </motion.div>
                  <div className="text-xs text-zinc-500">{idx}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-zinc-400 text-sm mb-1">Current Sum</p>
            <p className="text-white font-bold text-xl">{currentSum}</p>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-zinc-400 text-sm mb-1">Max Sum</p>
            <p className="text-yellow-400 font-bold text-xl">{maxSum}</p>
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
