'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [1, 3, 5, 6];
const TARGET = 2;

interface SearchInsertStep {
  arr: number[];
  target: number;
  left: number;
  right: number;
  mid: number;
  insertPos: number | null;
  explanation: string;
}

function computeSteps(): SearchInsertStep[] {
  const steps: SearchInsertStep[] = [];
  let left = 0;
  let right = ARRAY.length - 1;
  let insertPos = ARRAY.length;

  steps.push({
    arr: [...ARRAY],
    target: TARGET,
    left,
    right,
    mid: 0,
    insertPos: null,
    explanation: `Start: Find insert position for ${TARGET}`,
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      arr: [...ARRAY],
      target: TARGET,
      left,
      right,
      mid,
      insertPos: null,
      explanation: `Check mid = ${mid}, arr[${mid}] = ${ARRAY[mid]}`,
    });

    if (ARRAY[mid] === TARGET) {
      insertPos = mid;
      steps.push({
        arr: [...ARRAY],
        target: TARGET,
        left,
        right,
        mid,
        insertPos,
        explanation: `Found ${TARGET} at index ${mid}`,
      });
      break;
    } else if (ARRAY[mid] < TARGET) {
      left = mid + 1;
      steps.push({
        arr: [...ARRAY],
        target: TARGET,
        left,
        right,
        mid,
        insertPos: null,
        explanation: `${ARRAY[mid]} < ${TARGET} → search right`,
      });
    } else {
      insertPos = mid;
      right = mid - 1;
      steps.push({
        arr: [...ARRAY],
        target: TARGET,
        left,
        right,
        mid,
        insertPos,
        explanation: `${ARRAY[mid]} > ${TARGET} → search left, update insertPos = ${mid}`,
      });
    }
  }

  if (left > right) {
    insertPos = left;
  }

  steps.push({
    arr: [...ARRAY],
    target: TARGET,
    left,
    right,
    mid: insertPos,
    insertPos,
    explanation: `Complete: Insert position = ${insertPos}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  target: '#22c55e',
  insert: '#ef4444',
  default: '#3b82f6',
} as const;

export default function SearchInsertViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, target, mid, insertPos, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Search Insert Position</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {insertPos !== null && step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Insert Position: {insertPos}</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array</h3>
          <div className="flex gap-2 justify-center">
            {arr.map((n, idx) => {
              const isCurrent = mid === idx;
              const isInsertPos = insertPos === idx;

              let bgColor: string = COLORS.default;
              if (isCurrent && insertPos === null) {
                bgColor = COLORS.current;
              } else if (isInsertPos) {
                bgColor = COLORS.insert;
              }

              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <motion.div
                    className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                    style={{
                      backgroundColor: bgColor,
                      borderColor: isCurrent || isInsertPos ? '#fff' : bgColor,
                    }}
                    animate={{
                      scale: isCurrent || isInsertPos ? 1.2 : 1,
                    }}
                  >
                    {n}
                  </motion.div>
                  {isInsertPos && <div className="text-xs text-red-400">Insert</div>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center">
          <motion.div
            className="px-6 py-3 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
            style={{
              backgroundColor: COLORS.target,
              borderColor: COLORS.target,
            }}
          >
            Target: {target}
          </motion.div>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
