'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [1, 1, 2];

interface RemoveDupStep {
  arr: number[];
  i: number;
  j: number;
  length: number;
  explanation: string;
}

function computeSteps(): RemoveDupStep[] {
  const steps: RemoveDupStep[] = [];
  const arr = [...ARRAY];

  if (arr.length === 0) {
    steps.push({
      arr: [],
      i: -1,
      j: -1,
      length: 0,
      explanation: 'Empty array',
    });
    return steps;
  }

  steps.push({
    arr: [...arr],
    i: 0,
    j: 1,
    length: arr.length,
    explanation: `Start: Remove duplicates from [${arr.join(', ')}]`,
  });

  let i = 0;
  for (let j = 1; j < arr.length; j++) {
    steps.push({
      arr: [...arr],
      i,
      j,
      length: i + 1,
      explanation: `Compare arr[${i}]=${arr[i]} and arr[${j}]=${arr[j]}`,
    });

    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
      steps.push({
        arr: [...arr],
        i,
        j,
        length: i + 1,
        explanation: `Different: move arr[${j}]=${arr[j]} to position ${i}`,
      });
    } else {
      steps.push({
        arr: [...arr],
        i,
        j,
        length: i + 1,
        explanation: `Duplicate: skip arr[${j}]=${arr[j]}`,
      });
    }
  }

  steps.push({
    arr: arr.slice(0, i + 1),
    i: -1,
    j: -1,
    length: i + 1,
    explanation: `Complete: Length = ${i + 1}, array = [${arr.slice(0, i + 1).join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  unique: '#22c55e',
  duplicate: '#6b7280',
  default: '#3b82f6',
} as const;

export default function RemoveDuplicatesViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, i, j, length, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Remove Duplicates from Sorted Array</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Length: {length}</p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array</h3>
        <div className="flex gap-2 justify-center">
          {ARRAY.map((n, idx) => {
            const isCurrent = (i === idx || j === idx) && step < STEPS.length - 1;
            const isUnique = idx <= i;

            let bgColor: string = COLORS.default;
            if (isCurrent) {
              bgColor = COLORS.current;
            } else if (isUnique && step < STEPS.length - 1) {
              bgColor = COLORS.unique;
            } else if (!isUnique && step < STEPS.length - 1) {
              bgColor = COLORS.duplicate;
            } else if (idx < arr.length) {
              bgColor = COLORS.unique;
            }

            return (
              <motion.div
                key={idx}
                className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: bgColor,
                  borderColor: isCurrent ? '#fff' : bgColor,
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
        {step === STEPS.length - 1 && (
          <div className="mt-4">
            <p className="text-zinc-400 text-sm mb-2">Result Array</p>
            <div className="flex gap-2 justify-center">
              {arr.map((n, idx) => (
                <motion.div
                  key={idx}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: COLORS.unique,
                    borderColor: COLORS.unique,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {n}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
