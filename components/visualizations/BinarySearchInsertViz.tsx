'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [1, 3, 5, 6];
const TARGET = 2;

interface InsertStep {
  left: number;
  right: number;
  mid: number;
  midValue: number;
  comparison: string;
  insertPos: number | null;
}

function computeSteps(): InsertStep[] {
  const steps: InsertStep[] = [];
  let left = 0;
  let right = ARRAY.length - 1;
  let insertPos = ARRAY.length;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = ARRAY[mid];

    if (midValue === TARGET) {
      steps.push({
        left,
        right,
        mid,
        midValue,
        comparison: `arr[${mid}]=${midValue} === ${TARGET} → insert at ${mid}`,
        insertPos: mid,
      });
      insertPos = mid;
      break;
    }

    if (midValue < TARGET) {
      steps.push({
        left,
        right,
        mid,
        midValue,
        comparison: `arr[${mid}]=${midValue} < ${TARGET} → search right`,
        insertPos: null,
      });
      left = mid + 1;
    } else {
      steps.push({
        left,
        right,
        mid,
        midValue,
        comparison: `arr[${mid}]=${midValue} > ${TARGET} → search left`,
        insertPos: null,
      });
      insertPos = mid;
      right = mid - 1;
    }
  }

  if (insertPos === ARRAY.length || steps[steps.length - 1].insertPos === null) {
    steps.push({
      left,
      right,
      mid: left,
      midValue: ARRAY[left] ?? TARGET,
      comparison: `Insert position: ${left}`,
      insertPos: left,
    });
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  left: '#3b82f6',
  right: '#f97316',
  mid: '#eab308',
  insert: '#22c55e',
} as const;

export default function BinarySearchInsertViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">
        Binary Search Insert Position (Target: {TARGET})
      </h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.comparison}</p>
        {currentStep.insertPos !== null && (
          <p className="text-green-400 font-bold text-lg mt-2">
            Insert at index: {currentStep.insertPos}
          </p>
        )}
      </div>

      <div className="mb-6 flex items-center justify-center gap-2 flex-wrap">
        {ARRAY.map((value, idx) => {
          const isLeft = idx === currentStep.left;
          const isRight = idx === currentStep.right;
          const isMid = idx === currentStep.mid;
          const isInsert = currentStep.insertPos === idx;

          let bgColor = '#1f2937';
          let borderColor = '#374151';
          let scale = 1;

          if (isInsert) {
            bgColor = COLORS.insert;
            borderColor = COLORS.insert;
            scale = 1.2;
          } else if (isMid) {
            bgColor = COLORS.mid;
            borderColor = COLORS.mid;
            scale = 1.1;
          } else if (isLeft) {
            bgColor = COLORS.left;
            borderColor = COLORS.left;
          } else if (isRight) {
            bgColor = COLORS.right;
            borderColor = COLORS.right;
          }

          return (
            <motion.div
              key={idx}
              className="w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center font-mono font-bold text-white"
              style={{
                backgroundColor: bgColor,
                borderColor,
              }}
              animate={{ scale }}
            >
              <div>{value}</div>
              <div className="text-xs mt-1 opacity-70">{idx}</div>
            </motion.div>
          );
        })}
        {currentStep.insertPos !== null && currentStep.insertPos === ARRAY.length && (
          <motion.div
            className="w-16 h-16 rounded-lg border-2 border-dashed flex items-center justify-center font-mono font-bold"
            style={{
              borderColor: COLORS.insert,
              color: COLORS.insert,
            }}
            animate={{ scale: 1.2 }}
          >
            {TARGET}
          </motion.div>
        )}
      </div>

      <VizControls controls={controls} accentColor={COLORS.mid} />
    </div>
  );
}
