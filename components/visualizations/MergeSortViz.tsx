'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [38, 27, 43, 3, 9, 82, 10];

interface MergeStep {
  phase: 'split' | 'merge';
  left: number[];
  right: number[];
  merged: number[];
  leftIdx: number;
  rightIdx: number;
  explanation: string;
}

function computeSteps(): MergeStep[] {
  const steps: MergeStep[] = [];

  function mergeSort(arr: number[], depth: number = 0): number[] {
    if (arr.length <= 1) {
      return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    steps.push({
      phase: 'split',
      left,
      right,
      merged: [],
      leftIdx: -1,
      rightIdx: -1,
      explanation: `Split [${arr.join(', ')}] into [${left.join(', ')}] and [${right.join(', ')}]`,
    });

    const sortedLeft = mergeSort(left, depth + 1);
    const sortedRight = mergeSort(right, depth + 1);

    return merge(sortedLeft, sortedRight);
  }

  function merge(left: number[], right: number[]): number[] {
    const merged: number[] = [];
    let leftIdx = 0;
    let rightIdx = 0;

    while (leftIdx < left.length && rightIdx < right.length) {
      if (left[leftIdx] <= right[rightIdx]) {
        merged.push(left[leftIdx]);
        steps.push({
          phase: 'merge',
          left,
          right,
          merged: [...merged],
          leftIdx,
          rightIdx,
          explanation: `Compare ${left[leftIdx]} ≤ ${right[rightIdx]} → add ${left[leftIdx]}`,
        });
        leftIdx++;
      } else {
        merged.push(right[rightIdx]);
        steps.push({
          phase: 'merge',
          left,
          right,
          merged: [...merged],
          leftIdx,
          rightIdx,
          explanation: `Compare ${left[leftIdx]} > ${right[rightIdx]} → add ${right[rightIdx]}`,
        });
        rightIdx++;
      }
    }

    while (leftIdx < left.length) {
      merged.push(left[leftIdx]);
      steps.push({
        phase: 'merge',
        left,
        right,
        merged: [...merged],
        leftIdx,
        rightIdx,
        explanation: `Add remaining ${left[leftIdx]} from left`,
      });
      leftIdx++;
    }

    while (rightIdx < right.length) {
      merged.push(right[rightIdx]);
      steps.push({
        phase: 'merge',
        left,
        right,
        merged: [...merged],
        leftIdx,
        rightIdx,
        explanation: `Add remaining ${right[rightIdx]} from right`,
      });
      rightIdx++;
    }

    return merged;
  }

  steps.push({
    phase: 'split',
    left: [],
    right: [],
    merged: [],
    leftIdx: -1,
    rightIdx: -1,
    explanation: `Start: Merge sort [${ARRAY.join(', ')}]`,
  });

  const result = mergeSort([...ARRAY]);

  steps.push({
    phase: 'merge',
    left: [],
    right: [],
    merged: result,
    leftIdx: -1,
    rightIdx: -1,
    explanation: `Complete: Sorted array [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  merged: '#22c55e',
  left: '#3b82f6',
  right: '#f97316',
  default: '#6b7280',
} as const;

export default function MergeSortViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { phase, left, right, merged, leftIdx, rightIdx, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Merge Sort</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="mb-6 space-y-6">
        {phase === 'split' && (
          <>
            <div>
              <h3 className="text-lg font-semibold text-zinc-300 mb-3">Left Array</h3>
              <div className="flex gap-2 justify-center">
                {left.map((n, i) => (
                  <motion.div
                    key={i}
                    className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                    style={{
                      backgroundColor: COLORS.left,
                      borderColor: COLORS.left,
                    }}
                  >
                    {n}
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-300 mb-3">Right Array</h3>
              <div className="flex gap-2 justify-center">
                {right.map((n, i) => (
                  <motion.div
                    key={i}
                    className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                    style={{
                      backgroundColor: COLORS.right,
                      borderColor: COLORS.right,
                    }}
                  >
                    {n}
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {phase === 'merge' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-zinc-300 mb-3">Left Array</h3>
                <div className="flex gap-2 justify-center">
                  {left.map((n, i) => {
                    const isCurrent = leftIdx === i;
                    return (
                      <motion.div
                        key={i}
                        className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                        style={{
                          backgroundColor: isCurrent ? COLORS.current : COLORS.left,
                          borderColor: isCurrent ? '#fff' : COLORS.left,
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
                <h3 className="text-lg font-semibold text-zinc-300 mb-3">Right Array</h3>
                <div className="flex gap-2 justify-center">
                  {right.map((n, i) => {
                    const isCurrent = rightIdx === i;
                    return (
                      <motion.div
                        key={i}
                        className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                        style={{
                          backgroundColor: isCurrent ? COLORS.current : COLORS.right,
                          borderColor: isCurrent ? '#fff' : COLORS.right,
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
            <div>
              <h3 className="text-lg font-semibold text-zinc-300 mb-3">Merged Array</h3>
              <div className="flex gap-2 justify-center">
                {merged.map((n, i) => (
                  <motion.div
                    key={i}
                    className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                    style={{
                      backgroundColor: COLORS.merged,
                      borderColor: COLORS.merged,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {n}
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
