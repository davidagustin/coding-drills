'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Pre-computed binary search steps                                  */
/* ------------------------------------------------------------------ */

const ARRAY = [4, 5, 6, 7, 0, 1, 2] as const;

interface SearchStep {
  left: number;
  right: number;
  mid: number;
  midValue: number;
  rightValue: number;
  comparison: string;
  eliminated: Set<number>;
  found: boolean;
}

function computeSteps(): SearchStep[] {
  const steps: SearchStep[] = [];
  let left = 0;
  let right = ARRAY.length - 1;
  const eliminated = new Set<number>();

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = ARRAY[mid];
    const rightValue = ARRAY[right];

    if (midValue > rightValue) {
      // Minimum is in right half
      steps.push({
        left,
        right,
        mid,
        midValue,
        rightValue,
        comparison: `arr[${mid}]=${midValue} > arr[${right}]=${rightValue} → min in right half`,
        eliminated: new Set(eliminated),
        found: false,
      });
      // Eliminate left half including mid
      for (let i = left; i <= mid; i++) eliminated.add(i);
      left = mid + 1;
    } else {
      // Minimum is at mid or in left half
      steps.push({
        left,
        right,
        mid,
        midValue,
        rightValue,
        comparison: `arr[${mid}]=${midValue} <= arr[${right}]=${rightValue} → min at mid or left`,
        eliminated: new Set(eliminated),
        found: false,
      });
      // Eliminate right half (but not mid)
      for (let i = mid + 1; i <= right; i++) eliminated.add(i);
      right = mid;
    }
  }

  // Found minimum
  steps.push({
    left,
    right,
    mid: left,
    midValue: ARRAY[left],
    rightValue: ARRAY[right],
    comparison: `Found minimum: arr[${left}]=${ARRAY[left]}`,
    eliminated: new Set(eliminated),
    found: true,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const COLORS = {
  left: '#3b82f6',
  right: '#f97316',
  mid: '#eab308',
  found: '#22c55e',
  eliminated: '#6b7280',
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MinInRotatedViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { left, right, mid, midValue, rightValue, comparison, eliminated, found } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Find Minimum in Rotated Sorted Array</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white font-mono text-sm">{comparison}</p>
      </div>

      {/* Array Visualization */}
      <div className="mb-6">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {ARRAY.map((value, idx) => {
            const isLeft = idx === left;
            const isRight = idx === right;
            const isMid = idx === mid;
            const isEliminated = eliminated.has(idx);
            const isFound = found && idx === left;

            let bgColor: string = COLORS.eliminated;
            let borderColor: string = '#374151';
            let scale = 1;

            if (isFound) {
              bgColor = COLORS.found;
              borderColor = COLORS.found;
              scale = 1.1;
            } else if (isMid) {
              bgColor = COLORS.mid;
              borderColor = COLORS.mid;
              scale = 1.05;
            } else if (isLeft) {
              bgColor = COLORS.left;
              borderColor = COLORS.left;
            } else if (isRight) {
              bgColor = COLORS.right;
              borderColor = COLORS.right;
            } else if (!isEliminated) {
              bgColor = '#1f2937';
              borderColor = '#374151';
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
                transition={{ duration: 0.2 }}
              >
                <div>{value}</div>
                <div className="text-xs mt-1 opacity-70">{idx}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Labels */}
        <div className="flex justify-center gap-8 mt-4">
          {left === right ? null : (
            <>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.left }} />
                <span className="text-xs text-zinc-400">left</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.mid }} />
                <span className="text-xs text-zinc-400">mid</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.right }} />
                <span className="text-xs text-zinc-400">right</span>
              </div>
            </>
          )}
          {found && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.found }} />
              <span className="text-xs text-zinc-400">minimum</span>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Details */}
      {!found && (
        <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-xs text-zinc-500 mb-1">arr[mid]</div>
              <div className="text-lg font-mono font-bold" style={{ color: COLORS.mid }}>
                {midValue}
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-1">arr[right]</div>
              <div className="text-lg font-mono font-bold" style={{ color: COLORS.right }}>
                {rightValue}
              </div>
            </div>
          </div>
        </div>
      )}

      <VizControls controls={controls} accentColor={COLORS.mid} />
    </div>
  );
}
