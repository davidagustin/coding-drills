'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [3, 4, -1, 1];

interface MissingStep {
  arr: number[];
  index: number;
  num: number;
  correctPos: number;
  missing: number | null;
  explanation: string;
}

function computeSteps(): MissingStep[] {
  const steps: MissingStep[] = [];
  const arr = [...ARRAY];
  const n = arr.length;

  steps.push({
    arr: [...arr],
    index: -1,
    num: 0,
    correctPos: -1,
    missing: null,
    explanation: 'Start: Find first missing positive using cyclic sort',
  });

  for (let i = 0; i < n; i++) {
    while (arr[i] > 0 && arr[i] <= n && arr[i] !== arr[arr[i] - 1]) {
      const num = arr[i];
      const correctPos = num - 1;

      steps.push({
        arr: [...arr],
        index: i,
        num,
        correctPos,
        missing: null,
        explanation: `Place ${num} at correct position ${correctPos}`,
      });

      [arr[i], arr[correctPos]] = [arr[correctPos], arr[i]];

      steps.push({
        arr: [...arr],
        index: correctPos,
        num,
        correctPos,
        missing: null,
        explanation: `Swapped: ${num} now at position ${correctPos}`,
      });
    }
  }

  for (let i = 0; i < n; i++) {
    if (arr[i] !== i + 1) {
      steps.push({
        arr: [...arr],
        index: i,
        num: arr[i],
        correctPos: i,
        missing: i + 1,
        explanation: `Position ${i} has ${arr[i]} instead of ${i + 1} → missing = ${i + 1}`,
      });
      break;
    }
  }

  const missing = arr.every((val, idx) => val === idx + 1) ? n + 1 : null;
  if (missing === null) {
    for (let i = 0; i < n; i++) {
      if (arr[i] !== i + 1) {
        steps.push({
          arr: [...arr],
          index: -1,
          num: 0,
          correctPos: -1,
          missing: i + 1,
          explanation: `Complete: First missing positive = ${i + 1}`,
        });
        return steps;
      }
    }
  }

  steps.push({
    arr: [...arr],
    index: -1,
    num: 0,
    correctPos: -1,
    missing: n + 1,
    explanation: `Complete: All numbers 1..${n} present → missing = ${n + 1}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  correct: '#22c55e',
  incorrect: '#ef4444',
  default: '#3b82f6',
} as const;

export default function FirstMissingPositiveViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, index, correctPos, missing, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">First Missing Positive</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {missing !== null && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            First Missing Positive: {missing}
          </p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array</h3>
          <div className="flex gap-2 justify-center flex-wrap">
            {arr.map((n, idx) => {
              const isCurrent = index === idx;
              const isCorrectPos = idx === correctPos;
              const expected = idx + 1;
              const isCorrect = n === expected;

              let bgColor: string = COLORS.default;
              if (isCurrent || isCorrectPos) {
                bgColor = COLORS.current;
              } else if (isCorrect) {
                bgColor = COLORS.correct;
              } else if (n > 0 && n <= arr.length) {
                bgColor = COLORS.incorrect;
              }

              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <motion.div
                    className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                    style={{
                      backgroundColor: bgColor,
                      borderColor: isCurrent || isCorrectPos ? '#fff' : bgColor,
                    }}
                    animate={{
                      scale: isCurrent || isCorrectPos ? 1.2 : 1,
                    }}
                  >
                    {n}
                  </motion.div>
                  <div className="text-xs text-zinc-500">exp:{expected}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
