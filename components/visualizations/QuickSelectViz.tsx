'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [3, 2, 1, 5, 6, 4];
const K = 2; // Find 2nd smallest (1-indexed)

interface SelectStep {
  left: number;
  right: number;
  pivot: number;
  pivotIdx: number;
  explanation: string;
  kth: number | null;
}

function computeSteps(): SelectStep[] {
  const steps: SelectStep[] = [];
  const arr = [...ARRAY];

  function partition(left: number, right: number, pivotIdx: number): number {
    const pivotValue = arr[pivotIdx];
    [arr[pivotIdx], arr[right]] = [arr[right], arr[pivotIdx]];

    let storeIdx = left;
    for (let i = left; i < right; i++) {
      if (arr[i] < pivotValue) {
        [arr[storeIdx], arr[i]] = [arr[i], arr[storeIdx]];
        storeIdx++;
      }
    }
    [arr[right], arr[storeIdx]] = [arr[storeIdx], arr[right]];
    return storeIdx;
  }

  function quickSelect(left: number, right: number, k: number): number {
    if (left === right) {
      steps.push({
        left,
        right,
        pivot: arr[left],
        pivotIdx: left,
        explanation: `Base case: left === right → return arr[${left}]=${arr[left]}`,
        kth: arr[left],
      });
      return arr[left];
    }

    const pivotIdx = Math.floor((left + right) / 2);
    const pivotPos = partition(left, right, pivotIdx);

    steps.push({
      left,
      right,
      pivot: arr[pivotPos],
      pivotIdx: pivotPos,
      explanation: `Pivot at index ${pivotPos}, value=${arr[pivotPos]}`,
      kth: null,
    });

    if (pivotPos === k - 1) {
      steps.push({
        left,
        right,
        pivot: arr[pivotPos],
        pivotIdx: pivotPos,
        explanation: `Found! pivotPos=${pivotPos} === k-1=${k - 1} → return ${arr[pivotPos]}`,
        kth: arr[pivotPos],
      });
      return arr[pivotPos];
    } else if (pivotPos > k - 1) {
      return quickSelect(left, pivotPos - 1, k);
    } else {
      return quickSelect(pivotPos + 1, right, k);
    }
  }

  quickSelect(0, arr.length - 1, K);

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  pivot: '#eab308',
  left: '#3b82f6',
  right: '#f97316',
  found: '#22c55e',
} as const;

export default function QuickSelectViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Quick Select (Kth Smallest, K={K})</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {currentStep.kth !== null && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Kth Smallest: {currentStep.kth}</p>
        )}
      </div>

      <div className="mb-6 flex items-center justify-center gap-2">
        {ARRAY.map((value, idx) => {
          const isPivot = currentStep.pivotIdx === idx;
          const isInRange = idx >= currentStep.left && idx <= currentStep.right;
          const isFound = currentStep.kth !== null && value === currentStep.kth;

          let bgColor = '#1f2937';
          if (isFound) bgColor = COLORS.found;
          else if (isPivot) bgColor = COLORS.pivot;
          else if (isInRange) bgColor = idx < currentStep.pivotIdx ? COLORS.left : COLORS.right;

          return (
            <motion.div
              key={idx}
              className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
              style={{
                backgroundColor: `${bgColor}40`,
                borderColor: bgColor,
              }}
              animate={{ scale: isPivot || isFound ? 1.15 : 1 }}
            >
              {value}
            </motion.div>
          );
        })}
      </div>

      <VizControls controls={controls} accentColor={COLORS.pivot} />
    </div>
  );
}
