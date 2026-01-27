'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [2, 5, 6, 0, 0, 1, 2];
const TARGET = 0;

interface SearchRotated2Step {
  arr: number[];
  target: number;
  left: number;
  right: number;
  mid: number;
  found: boolean;
  explanation: string;
}

function computeSteps(): SearchRotated2Step[] {
  const steps: SearchRotated2Step[] = [];
  let left = 0;
  let right = ARRAY.length - 1;
  let found = false;

  steps.push({
    arr: [...ARRAY],
    target: TARGET,
    left,
    right,
    mid: 0,
    found: false,
    explanation: `Start: Search ${TARGET} in rotated array with duplicates`,
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      arr: [...ARRAY],
      target: TARGET,
      left,
      right,
      mid,
      found: false,
      explanation: `Check mid = ${mid}, arr[${mid}] = ${ARRAY[mid]}`,
    });

    if (ARRAY[mid] === TARGET) {
      found = true;
      steps.push({
        arr: [...ARRAY],
        target: TARGET,
        left,
        right,
        mid,
        found: true,
        explanation: `Found ${TARGET} at index ${mid}`,
      });
      break;
    }

    if (ARRAY[left] === ARRAY[mid] && ARRAY[mid] === ARRAY[right]) {
      left++;
      right--;
      steps.push({
        arr: [...ARRAY],
        target: TARGET,
        left,
        right,
        mid,
        found: false,
        explanation: `arr[left] = arr[mid] = arr[right] → skip duplicates`,
      });
      continue;
    }

    if (ARRAY[left] <= ARRAY[mid]) {
      if (ARRAY[left] <= TARGET && TARGET < ARRAY[mid]) {
        right = mid - 1;
        steps.push({
          arr: [...ARRAY],
          target: TARGET,
          left,
          right,
          mid,
          found: false,
          explanation: `Left half is sorted, target in range → search left`,
        });
      } else {
        left = mid + 1;
        steps.push({
          arr: [...ARRAY],
          target: TARGET,
          left,
          right,
          mid,
          found: false,
          explanation: `Left half is sorted, target not in range → search right`,
        });
      }
    } else {
      if (ARRAY[mid] < TARGET && TARGET <= ARRAY[right]) {
        left = mid + 1;
        steps.push({
          arr: [...ARRAY],
          target: TARGET,
          left,
          right,
          mid,
          found: false,
          explanation: `Right half is sorted, target in range → search right`,
        });
      } else {
        right = mid - 1;
        steps.push({
          arr: [...ARRAY],
          target: TARGET,
          left,
          right,
          mid,
          found: false,
          explanation: `Right half is sorted, target not in range → search left`,
        });
      }
    }
  }

  steps.push({
    arr: [...ARRAY],
    target: TARGET,
    left,
    right,
    mid: -1,
    found,
    explanation: found ? 'Complete: Target found' : 'Complete: Target not found',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  target: '#22c55e',
  default: '#3b82f6',
} as const;

export default function SearchRotated2Viz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, target, mid, found, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Search in Rotated Sorted Array II</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className={`font-bold text-lg mt-2 ${found ? 'text-green-400' : 'text-red-400'}`}>
            {found ? 'Found ✓' : 'Not Found ✗'}
          </p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array</h3>
        <div className="flex gap-2 justify-center">
          {arr.map((n, idx) => {
            const isCurrent = mid === idx;
            const isTarget = n === target && found;

            let bgColor: string = COLORS.default;
            if (isTarget) {
              bgColor = COLORS.target;
            } else if (isCurrent) {
              bgColor = COLORS.current;
            }

            return (
              <motion.div
                key={idx}
                className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: bgColor,
                  borderColor: isCurrent || isTarget ? '#fff' : bgColor,
                }}
                animate={{
                  scale: isCurrent || isTarget ? 1.2 : 1,
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
