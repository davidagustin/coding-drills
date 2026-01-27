'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [5, 7, 7, 8, 8, 10];
const TARGET = 8;

interface SearchRangeStep {
  arr: number[];
  target: number;
  left: number;
  right: number;
  mid: number;
  first: number | null;
  last: number | null;
  phase: 'findFirst' | 'findLast' | 'complete';
  explanation: string;
}

function computeSteps(): SearchRangeStep[] {
  const steps: SearchRangeStep[] = [];
  let first: number | null = null;
  let last: number | null = null;

  function findFirst(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      steps.push({
        arr: [...arr],
        target,
        left,
        right,
        mid,
        first: null,
        last: null,
        phase: 'findFirst',
        explanation: `Search first: mid = ${mid}, arr[${mid}] = ${arr[mid]}`,
      });

      if (arr[mid] === target) {
        result = mid;
        right = mid - 1;
        steps.push({
          arr: [...arr],
          target,
          left,
          right,
          mid,
          first: result,
          last: null,
          phase: 'findFirst',
          explanation: `Found at ${mid}, search left for earlier occurrence`,
        });
      } else if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  }

  function findLast(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      steps.push({
        arr: [...arr],
        target,
        left,
        right,
        mid,
        first,
        last: null,
        phase: 'findLast',
        explanation: `Search last: mid = ${mid}, arr[${mid}] = ${arr[mid]}`,
      });

      if (arr[mid] === target) {
        result = mid;
        left = mid + 1;
        steps.push({
          arr: [...arr],
          target,
          left,
          right,
          mid,
          first,
          last: result,
          phase: 'findLast',
          explanation: `Found at ${mid}, search right for later occurrence`,
        });
      } else if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  }

  steps.push({
    arr: [...ARRAY],
    target: TARGET,
    left: 0,
    right: ARRAY.length - 1,
    mid: 0,
    first: null,
    last: null,
    phase: 'findFirst',
    explanation: `Start: Find range of ${TARGET} in [${ARRAY.join(', ')}]`,
  });

  first = findFirst(ARRAY, TARGET);
  last = findLast(ARRAY, TARGET);

  steps.push({
    arr: [...ARRAY],
    target: TARGET,
    left: 0,
    right: ARRAY.length - 1,
    mid: 0,
    first,
    last,
    phase: 'complete',
    explanation:
      first !== -1 && last !== -1
        ? `Complete: Range [${first}, ${last}]`
        : 'Complete: Target not found',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  target: '#22c55e',
  range: '#3b82f6',
  default: '#6b7280',
} as const;

export default function SearchRangeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, target, mid, first, last, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Search for a Range</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && first !== null && last !== null && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Range: [{first}, {last}]
          </p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array</h3>
        <div className="flex gap-2 justify-center">
          {arr.map((n, idx) => {
            const isCurrent = mid === idx;
            const isTarget = n === target;
            const inRange = first !== null && last !== null && idx >= first && idx <= last;

            let bgColor: string = COLORS.default;
            if (isCurrent) {
              bgColor = COLORS.current;
            } else if (inRange) {
              bgColor = COLORS.range;
            } else if (isTarget) {
              bgColor = COLORS.target;
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
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
