'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARR1 = [1, 3];
const ARR2 = [2];

interface MedianStep {
  arr1: number[];
  arr2: number[];
  merged: number[];
  i: number;
  j: number;
  median: number | null;
  explanation: string;
}

function computeSteps(): MedianStep[] {
  const steps: MedianStep[] = [];
  const merged: number[] = [];
  let i = 0;
  let j = 0;

  steps.push({
    arr1: [...ARR1],
    arr2: [...ARR2],
    merged: [],
    i: 0,
    j: 0,
    median: null,
    explanation: `Start: Find median of two sorted arrays`,
  });

  while (i < ARR1.length && j < ARR2.length) {
    if (ARR1[i] <= ARR2[j]) {
      merged.push(ARR1[i]);
      steps.push({
        arr1: [...ARR1],
        arr2: [...ARR2],
        merged: [...merged],
        i,
        j,
        median: null,
        explanation: `Merge: arr1[${i}]=${ARR1[i]} ≤ arr2[${j}]=${ARR2[j]} → add ${ARR1[i]}`,
      });
      i++;
    } else {
      merged.push(ARR2[j]);
      steps.push({
        arr1: [...ARR1],
        arr2: [...ARR2],
        merged: [...merged],
        i,
        j,
        median: null,
        explanation: `Merge: arr2[${j}]=${ARR2[j]} < arr1[${i}]=${ARR1[i]} → add ${ARR2[j]}`,
      });
      j++;
    }
  }

  while (i < ARR1.length) {
    merged.push(ARR1[i]);
    steps.push({
      arr1: [...ARR1],
      arr2: [...ARR2],
      merged: [...merged],
      i,
      j,
      median: null,
      explanation: `Add remaining: arr1[${i}]=${ARR1[i]}`,
    });
    i++;
  }

  while (j < ARR2.length) {
    merged.push(ARR2[j]);
    steps.push({
      arr1: [...ARR1],
      arr2: [...ARR2],
      merged: [...merged],
      i,
      j,
      median: null,
      explanation: `Add remaining: arr2[${j}]=${ARR2[j]}`,
    });
    j++;
  }

  const n = merged.length;
  const median = n % 2 === 0 ? (merged[n / 2 - 1] + merged[n / 2]) / 2 : merged[Math.floor(n / 2)];

  steps.push({
    arr1: [...ARR1],
    arr2: [...ARR2],
    merged: [...merged],
    i: -1,
    j: -1,
    median,
    explanation: `Complete: Median = ${median}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  merged: '#22c55e',
  median: '#ef4444',
  arr1: '#3b82f6',
  arr2: '#f97316',
} as const;

export default function MedianSortedArraysViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr1, arr2, merged, i, j, median, explanation } = currentStep;
  const medianIdx =
    merged.length % 2 === 0
      ? [merged.length / 2 - 1, merged.length / 2]
      : [Math.floor(merged.length / 2)];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Median of Two Sorted Arrays</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {median !== null && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Median: {median}</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array 1</h3>
            <div className="flex gap-2 justify-center">
              {arr1.map((n, idx) => {
                const isCurrent = i === idx;
                return (
                  <motion.div
                    key={idx}
                    className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                    style={{
                      backgroundColor: isCurrent ? COLORS.current : COLORS.arr1,
                      borderColor: isCurrent ? '#fff' : COLORS.arr1,
                    }}
                    animate={{
                      scale: isCurrent ? 1.2 : 1,
                    }}
                  >
                    {n}
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array 2</h3>
            <div className="flex gap-2 justify-center">
              {arr2.map((n, idx) => {
                const isCurrent = j === idx;
                return (
                  <motion.div
                    key={idx}
                    className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                    style={{
                      backgroundColor: isCurrent ? COLORS.current : COLORS.arr2,
                      borderColor: isCurrent ? '#fff' : COLORS.arr2,
                    }}
                    animate={{
                      scale: isCurrent ? 1.2 : 1,
                    }}
                  >
                    {n}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {merged.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Merged Array</h3>
            <div className="flex gap-2 justify-center flex-wrap">
              {merged.map((n, idx) => {
                const isMedian = medianIdx.includes(idx);

                let bgColor: string = COLORS.merged;
                if (isMedian) {
                  bgColor = COLORS.median;
                }

                return (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <motion.div
                      className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                      style={{
                        backgroundColor: bgColor,
                        borderColor: isMedian ? '#fff' : bgColor,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {n}
                    </motion.div>
                    {isMedian && <div className="text-xs text-red-400">Median</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
