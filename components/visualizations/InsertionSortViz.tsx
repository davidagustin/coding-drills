'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [64, 34, 25, 12, 22, 11, 90];

interface InsertionStep {
  arr: number[];
  i: number;
  j: number;
  key: number;
  explanation: string;
}

function computeSteps(): InsertionStep[] {
  const steps: InsertionStep[] = [];
  const arr = [...ARRAY];

  steps.push({
    arr: [...arr],
    i: -1,
    j: -1,
    key: 0,
    explanation: `Start: Insertion sort [${arr.join(', ')}]`,
  });

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      arr: [...arr],
      i,
      j,
      key,
      explanation: `Insert arr[${i}]=${key} into sorted portion`,
    });

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      steps.push({
        arr: [...arr],
        i,
        j,
        key,
        explanation: `Shift arr[${j}]=${arr[j]} to position ${j + 1}`,
      });
      j--;
    }

    arr[j + 1] = key;
    steps.push({
      arr: [...arr],
      i,
      j: j + 1,
      key,
      explanation: `Place ${key} at position ${j + 1}`,
    });
  }

  steps.push({
    arr: [...arr],
    i: -1,
    j: -1,
    key: 0,
    explanation: `Complete: Sorted [${arr.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  key: '#ef4444',
  sorted: '#22c55e',
  shifting: '#3b82f6',
  default: '#6b7280',
} as const;

export default function InsertionSortViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, i, j, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Insertion Sort</h2>

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
            if (idx === i && i >= 0) {
              bgColor = COLORS.key;
            } else if (idx === j && j >= 0) {
              bgColor = COLORS.shifting;
            } else if (idx < i && i > 0) {
              bgColor = COLORS.sorted;
            }

            return (
              <motion.div
                key={idx}
                className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: bgColor,
                  borderColor: idx === i || idx === j ? '#fff' : bgColor,
                }}
                animate={{
                  scale: idx === i || idx === j ? 1.2 : 1,
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
