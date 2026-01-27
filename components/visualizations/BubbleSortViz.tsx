'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [64, 34, 25, 12, 22, 11, 90];

interface BubbleStep {
  arr: number[];
  i: number;
  j: number;
  swapped: boolean;
  explanation: string;
}

function computeSteps(): BubbleStep[] {
  const steps: BubbleStep[] = [];
  const arr = [...ARRAY];
  const n = arr.length;

  steps.push({
    arr: [...arr],
    i: -1,
    j: -1,
    swapped: false,
    explanation: `Start: Bubble sort [${arr.join(', ')}]`,
  });

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        arr: [...arr],
        i,
        j,
        swapped: false,
        explanation: `Compare arr[${j}]=${arr[j]} and arr[${j + 1}]=${arr[j + 1]}`,
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        steps.push({
          arr: [...arr],
          i,
          j,
          swapped: true,
          explanation: `Swap: ${arr[j + 1]} and ${arr[j]}`,
        });
      }
    }

    if (!swapped) {
      steps.push({
        arr: [...arr],
        i,
        j: -1,
        swapped: false,
        explanation: 'No swaps in this pass → array is sorted',
      });
      break;
    }
  }

  steps.push({
    arr: [...arr],
    i: -1,
    j: -1,
    swapped: false,
    explanation: `Complete: Sorted [${arr.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  comparing: '#3b82f6',
  sorted: '#22c55e',
  default: '#6b7280',
} as const;

export default function BubbleSortViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, i, j, swapped, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Bubble Sort</h2>

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
            if (idx === j || idx === j + 1) {
              bgColor = swapped ? COLORS.current : COLORS.comparing;
            } else if (idx > arr.length - 1 - (i + 1) && i >= 0) {
              bgColor = COLORS.sorted;
            }

            return (
              <motion.div
                key={idx}
                className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: bgColor,
                  borderColor: idx === j || idx === j + 1 ? '#fff' : bgColor,
                }}
                animate={{
                  scale: idx === j || idx === j + 1 ? 1.2 : 1,
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
