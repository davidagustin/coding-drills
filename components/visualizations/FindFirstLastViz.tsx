'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [5, 7, 7, 8, 8, 10];
const TARGET = 8;

interface FirstLastStep {
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

function computeSteps(): FirstLastStep[] {
  const steps: FirstLastStep[] = [];
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
        explanation: `Find first: mid = ${mid}, arr[${mid}] = ${arr[mid]}`,
      });

      if (arr[mid] >= target) {
        if (arr[mid] === target) {
          result = mid;
        }
        right = mid - 1;
      } else {
        left = mid + 1;
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
        explanation: `Find last: mid = ${mid}, arr[${mid}] = ${arr[mid]}`,
      });

      if (arr[mid] <= target) {
        if (arr[mid] === target) {
          result = mid;
        }
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
    explanation: `Start: Find first and last position of ${TARGET}`,
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
        ? `Complete: First = ${first}, Last = ${last}`
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

export default function FindFirstLastViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, target, mid, first, last, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Find First and Last Position</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && first !== null && last !== null && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            First: {first}, Last: {last}
          </p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array</h3>
        <div className="flex gap-2 justify-center">
          {arr.map((n, idx) => {
            const isCurrent = mid === idx;
            const isTarget = n === target;
            const isFirst = first === idx;
            const isLast = last === idx;

            let bgColor: string = COLORS.default;
            if (isCurrent) {
              bgColor = COLORS.current;
            } else if (isFirst || isLast) {
              bgColor = COLORS.range;
            } else if (isTarget) {
              bgColor = COLORS.target;
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <motion.div
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: isCurrent || isFirst || isLast ? '#fff' : bgColor,
                  }}
                  animate={{
                    scale: isCurrent || isFirst || isLast ? 1.2 : 1,
                  }}
                >
                  {n}
                </motion.div>
                {isFirst && <div className="text-xs text-yellow-400">First</div>}
                {isLast && <div className="text-xs text-yellow-400">Last</div>}
              </div>
            );
          })}
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
