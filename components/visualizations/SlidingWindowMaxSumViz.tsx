'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [2, 1, 5, 1, 3, 2];
const K = 3;

interface SlidingWindowMaxSumStep {
  arr: number[];
  windowSum: number;
  maxSum: number;
  left: number;
  right: number;
  explanation: string;
}

function computeSteps(): SlidingWindowMaxSumStep[] {
  const steps: SlidingWindowMaxSumStep[] = [];
  let windowSum = 0;
  let maxSum = 0;

  steps.push({
    arr: [...ARRAY],
    windowSum: 0,
    maxSum: 0,
    left: -1,
    right: -1,
    explanation: `Start: Find maximum sum of ${K} consecutive elements`,
  });

  // Build initial window
  for (let i = 0; i < K; i++) {
    windowSum += ARRAY[i];
  }
  maxSum = windowSum;
  steps.push({
    arr: [...ARRAY],
    windowSum,
    maxSum,
    left: 0,
    right: K - 1,
    explanation: `Initial window [0, ${K - 1}]: sum = ${windowSum}`,
  });

  // Slide window
  for (let right = K; right < ARRAY.length; right++) {
    const left = right - K;
    windowSum += ARRAY[right] - ARRAY[left];
    maxSum = Math.max(maxSum, windowSum);
    steps.push({
      arr: [...ARRAY],
      windowSum,
      maxSum,
      left,
      right,
      explanation: `Slide window [${left}, ${right}]: sum = ${windowSum}, maxSum = ${maxSum}`,
    });
  }

  steps.push({
    arr: [...ARRAY],
    windowSum,
    maxSum,
    left: -1,
    right: -1,
    explanation: `Complete: Maximum sum = ${maxSum}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function SlidingWindowMaxSumViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, windowSum, maxSum, left, right, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Maximum Sum of K Consecutive Elements</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Array</h3>
          <div className="flex gap-2 flex-wrap">
            {arr.map((val, idx) => {
              const isInWindow = left >= 0 && idx >= left && idx <= right;
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                    isInWindow
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  {val}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-400 mb-1">Window Sum</div>
            <div className="text-2xl font-bold text-blue-400">{windowSum}</div>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-400 mb-1">Max Sum</div>
            <div className="text-2xl font-bold text-green-400">{maxSum}</div>
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
