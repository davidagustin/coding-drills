'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [64, 34, 25, 12, 22, 11, 90];

interface QuickStep {
  arr: number[];
  pivot: number;
  pivotIdx: number;
  left: number;
  right: number;
  i: number;
  j: number;
  phase: 'partition' | 'complete';
  explanation: string;
}

function computeSteps(): QuickStep[] {
  const steps: QuickStep[] = [];
  const arr = [...ARRAY];

  function quickSort(arr: number[], low: number, high: number): void {
    if (low < high) {
      const pivotIdx = partition(arr, low, high);
      quickSort(arr, low, pivotIdx - 1);
      quickSort(arr, pivotIdx + 1, high);
    }
  }

  function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      arr: [...arr],
      pivot,
      pivotIdx: high,
      left: low,
      right: high,
      i: i,
      j: low,
      phase: 'partition',
      explanation: `Partition [${low}..${high}], pivot = ${pivot}`,
    });

    for (let j = low; j < high; j++) {
      steps.push({
        arr: [...arr],
        pivot,
        pivotIdx: high,
        left: low,
        right: high,
        i,
        j,
        phase: 'partition',
        explanation: `Compare arr[${j}]=${arr[j]} with pivot ${pivot}`,
      });

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          arr: [...arr],
          pivot,
          pivotIdx: high,
          left: low,
          right: high,
          i,
          j,
          phase: 'partition',
          explanation: `Swap arr[${i}]=${arr[i]} and arr[${j}]=${arr[j]}`,
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      arr: [...arr],
      pivot,
      pivotIdx: i + 1,
      left: low,
      right: high,
      i: i + 1,
      j: high,
      phase: 'complete',
      explanation: `Place pivot at index ${i + 1}`,
    });

    return i + 1;
  }

  steps.push({
    arr: [...arr],
    pivot: 0,
    pivotIdx: -1,
    left: 0,
    right: arr.length - 1,
    i: -1,
    j: -1,
    phase: 'partition',
    explanation: `Start: Quick sort [${arr.join(', ')}]`,
  });

  quickSort(arr, 0, arr.length - 1);

  steps.push({
    arr: [...arr],
    pivot: 0,
    pivotIdx: -1,
    left: 0,
    right: arr.length - 1,
    i: -1,
    j: -1,
    phase: 'complete',
    explanation: `Complete: Sorted [${arr.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  pivot: '#ef4444',
  current: '#eab308',
  sorted: '#22c55e',
  partition: '#3b82f6',
  default: '#6b7280',
} as const;

export default function QuickSortViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, pivotIdx, left, right, i, j, phase, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Quick Sort</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array</h3>
        <div className="flex gap-2 justify-center">
          {arr.map((n, idx) => {
            let bgColor: string = COLORS.default;
            if (phase === 'complete') {
              bgColor = COLORS.sorted;
            } else if (idx === pivotIdx) {
              bgColor = COLORS.pivot;
            } else if (idx === i || idx === j) {
              bgColor = COLORS.current;
            } else if (idx >= left && idx <= right) {
              bgColor = COLORS.partition;
            }

            return (
              <motion.div
                key={idx}
                className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: bgColor,
                  borderColor: idx === pivotIdx ? '#fff' : bgColor,
                }}
                animate={{
                  scale: idx === pivotIdx || idx === i || idx === j ? 1.2 : 1,
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
