'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [64, 25, 12, 22, 11];

interface SelectionStep {
  arr: number[];
  i: number;
  minIdx: number;
  j: number;
  explanation: string;
}

function computeSteps(): SelectionStep[] {
  const steps: SelectionStep[] = [];
  const arr = [...ARRAY];

  steps.push({
    arr: [...arr],
    i: -1,
    minIdx: -1,
    j: -1,
    explanation: `Start: Selection sort [${arr.join(', ')}]`,
  });

  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;

    steps.push({
      arr: [...arr],
      i,
      minIdx,
      j: i + 1,
      explanation: `Find minimum in unsorted portion starting at index ${i}`,
    });

    for (let j = i + 1; j < arr.length; j++) {
      steps.push({
        arr: [...arr],
        i,
        minIdx,
        j,
        explanation: `Compare arr[${j}]=${arr[j]} with current min arr[${minIdx}]=${arr[minIdx]}`,
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          arr: [...arr],
          i,
          minIdx,
          j,
          explanation: `New minimum found at index ${minIdx}`,
        });
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        arr: [...arr],
        i,
        minIdx,
        j: -1,
        explanation: `Swap arr[${i}]=${arr[i]} with arr[${minIdx}]=${arr[minIdx]}`,
      });
    }
  }

  steps.push({
    arr: [...arr],
    i: -1,
    minIdx: -1,
    j: -1,
    explanation: `Complete: Sorted [${arr.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  min: '#ef4444',
  sorted: '#22c55e',
  comparing: '#3b82f6',
  default: '#6b7280',
} as const;

export default function SelectionSortViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, i, minIdx, j, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Selection Sort</h2>

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
              bgColor = COLORS.current;
            } else if (idx === minIdx && minIdx >= 0) {
              bgColor = COLORS.min;
            } else if (idx === j && j >= 0) {
              bgColor = COLORS.comparing;
            } else if (idx < i && i > 0) {
              bgColor = COLORS.sorted;
            }

            return (
              <motion.div
                key={idx}
                className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: bgColor,
                  borderColor: idx === i || idx === minIdx || idx === j ? '#fff' : bgColor,
                }}
                animate={{
                  scale: idx === i || idx === minIdx || idx === j ? 1.2 : 1,
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
