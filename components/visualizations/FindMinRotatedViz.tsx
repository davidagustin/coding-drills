'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [4, 5, 6, 7, 0, 1, 2];

interface MinRotatedStep {
  arr: number[];
  left: number;
  right: number;
  mid: number;
  min: number | null;
  explanation: string;
}

function computeSteps(): MinRotatedStep[] {
  const steps: MinRotatedStep[] = [];
  let left = 0;
  let right = ARRAY.length - 1;
  let min = ARRAY[0];

  steps.push({
    arr: [...ARRAY],
    left,
    right,
    mid: 0,
    min,
    explanation: `Start: Find minimum in rotated sorted array`,
  });

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      arr: [...ARRAY],
      left,
      right,
      mid,
      min,
      explanation: `Check mid = ${mid}, arr[${mid}] = ${ARRAY[mid]}`,
    });

    if (ARRAY[mid] > ARRAY[right]) {
      left = mid + 1;
      steps.push({
        arr: [...ARRAY],
        left,
        right,
        mid,
        min,
        explanation: `arr[${mid}] > arr[${right}] → pivot in right half`,
      });
    } else {
      right = mid;
      min = ARRAY[mid];
      steps.push({
        arr: [...ARRAY],
        left,
        right,
        mid,
        min,
        explanation: `arr[${mid}] ≤ arr[${right}] → pivot in left half, update min = ${min}`,
      });
    }
  }

  min = ARRAY[left];
  steps.push({
    arr: [...ARRAY],
    left,
    right,
    mid: left,
    min,
    explanation: `Complete: Minimum = ${min} at index ${left}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  min: '#22c55e',
  default: '#3b82f6',
} as const;

export default function FindMinRotatedViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, mid, min, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Find Minimum in Rotated Sorted Array</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {min !== null && step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Minimum: {min}</p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array</h3>
        <div className="flex gap-2 justify-center">
          {arr.map((n, idx) => {
            const isCurrent = mid === idx;
            const isMin = min !== null && n === min && step === STEPS.length - 1;

            let bgColor: string = COLORS.default;
            if (isMin) {
              bgColor = COLORS.min;
            } else if (isCurrent) {
              bgColor = COLORS.current;
            }

            return (
              <motion.div
                key={idx}
                className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: bgColor,
                  borderColor: isCurrent || isMin ? '#fff' : bgColor,
                }}
                animate={{
                  scale: isCurrent || isMin ? 1.2 : 1,
                }}
              >
                {n}
              </motion.div>
            );
          })}
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
