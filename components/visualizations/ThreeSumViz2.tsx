'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [-1, 0, 1, 2, -1, -4];

interface ThreeSumStep {
  arr: number[];
  i: number;
  left: number;
  right: number;
  sum: number;
  triplets: number[][];
  explanation: string;
}

function computeSteps(): ThreeSumStep[] {
  const steps: ThreeSumStep[] = [];
  const sorted = [...ARRAY].sort((a, b) => a - b);
  const triplets: number[][] = [];

  steps.push({
    arr: [...sorted],
    i: -1,
    left: -1,
    right: -1,
    sum: 0,
    triplets: [],
    explanation: `Start: Find all unique triplets that sum to 0`,
  });

  for (let i = 0; i < sorted.length - 2; i++) {
    if (i > 0 && sorted[i] === sorted[i - 1]) continue;

    let left = i + 1;
    let right = sorted.length - 1;

    steps.push({
      arr: [...sorted],
      i,
      left,
      right,
      sum: 0,
      triplets: [...triplets],
      explanation: `Fix i=${i}, use two pointers`,
    });

    while (left < right) {
      const sum = sorted[i] + sorted[left] + sorted[right];

      steps.push({
        arr: [...sorted],
        i,
        left,
        right,
        sum,
        triplets: [...triplets],
        explanation: `Sum: ${sorted[i]} + ${sorted[left]} + ${sorted[right]} = ${sum}`,
      });

      if (sum === 0) {
        triplets.push([sorted[i], sorted[left], sorted[right]]);
        steps.push({
          arr: [...sorted],
          i,
          left,
          right,
          sum,
          triplets: [...triplets],
          explanation: `Found triplet: [${sorted[i]}, ${sorted[left]}, ${sorted[right]}]`,
        });

        while (left < right && sorted[left] === sorted[left + 1]) left++;
        while (left < right && sorted[right] === sorted[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  steps.push({
    arr: [...sorted],
    i: -1,
    left: -1,
    right: -1,
    sum: 0,
    triplets: [...triplets],
    explanation: `Complete: Found ${triplets.length} triplets`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  fixed: '#3b82f6',
  pointer: '#22c55e',
  triplet: '#ef4444',
  default: '#6b7280',
} as const;

export default function ThreeSumViz2() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, i, left, right, triplets, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">3Sum (All Unique Triplets)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Found {triplets.length} triplets</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Sorted Array</h3>
          <div className="flex gap-2 justify-center">
            {arr.map((n, idx) => {
              const isFixed = i === idx;
              const isLeft = left === idx;
              const isRight = right === idx;

              let bgColor: string = COLORS.default;
              if (isFixed) {
                bgColor = COLORS.fixed;
              } else if (isLeft || isRight) {
                bgColor = COLORS.pointer;
              }

              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <motion.div
                    className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                    style={{
                      backgroundColor: bgColor,
                      borderColor: isFixed || isLeft || isRight ? '#fff' : bgColor,
                    }}
                    animate={{
                      scale: isFixed || isLeft || isRight ? 1.2 : 1,
                    }}
                  >
                    {n}
                  </motion.div>
                  <div className="text-xs text-zinc-500">
                    {isFixed && 'i'}
                    {isLeft && 'L'}
                    {isRight && 'R'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {triplets.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Triplets</h3>
            <div className="space-y-2">
              {triplets.map((triplet, idx) => (
                <motion.div
                  key={idx}
                  className="flex gap-2 justify-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {triplet.map((n, i) => (
                    <div
                      key={i}
                      className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                      style={{
                        backgroundColor: COLORS.triplet,
                        borderColor: COLORS.triplet,
                      }}
                    >
                      {n}
                    </div>
                  ))}
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
