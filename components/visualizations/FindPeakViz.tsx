'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Pre-computed binary search steps                                  */
/* ------------------------------------------------------------------ */

const ARRAY = [1, 2, 1, 3, 5, 6, 4] as const;

interface PeakStep {
  left: number;
  right: number;
  mid: number;
  midValue: number;
  nextValue: number;
  comparison: string;
  eliminated: Set<number>;
  found: boolean;
}

function computeSteps(): PeakStep[] {
  const steps: PeakStep[] = [];
  let left = 0;
  let right = ARRAY.length - 1;
  const eliminated = new Set<number>();

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = ARRAY[mid];
    const nextValue = ARRAY[mid + 1];

    if (midValue < nextValue) {
      // Peak is to the right
      steps.push({
        left,
        right,
        mid,
        midValue,
        nextValue,
        comparison: `arr[${mid}]=${midValue} < arr[${mid + 1}]=${nextValue} → peak in right half`,
        eliminated: new Set(eliminated),
        found: false,
      });
      // Eliminate left half including mid
      for (let i = left; i <= mid; i++) eliminated.add(i);
      left = mid + 1;
    } else {
      // Peak is at mid or to the left
      steps.push({
        left,
        right,
        mid,
        midValue,
        nextValue,
        comparison: `arr[${mid}]=${midValue} >= arr[${mid + 1}]=${nextValue} → peak at mid or left`,
        eliminated: new Set(eliminated),
        found: false,
      });
      // Eliminate right half (but not mid)
      for (let i = mid + 1; i <= right; i++) eliminated.add(i);
      right = mid;
    }
  }

  // Found peak
  steps.push({
    left,
    right,
    mid: left,
    midValue: ARRAY[left],
    nextValue: ARRAY[left + 1] ?? -Infinity,
    comparison: `Found peak at index ${left}: arr[${left}]=${ARRAY[left]}`,
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
  peak: '#ec4899',
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FindPeakViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { left, right, mid, midValue, nextValue, comparison, eliminated, found } = currentStep;

  // Check if index is a peak (greater than neighbors)
  const isPeak = (idx: number): boolean => {
    const val = ARRAY[idx];
    const leftVal = idx > 0 ? ARRAY[idx - 1] : -Infinity;
    const rightVal = idx < ARRAY.length - 1 ? ARRAY[idx + 1] : -Infinity;
    return val > leftVal && val > rightVal;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Find Peak Element</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white font-mono text-sm">{comparison}</p>
      </div>

      {/* Array Visualization with Bar Chart */}
      <div className="mb-6">
        <div className="flex items-end justify-center gap-2 h-64">
          {ARRAY.map((value, idx) => {
            const isLeft = idx === left;
            const isRight = idx === right;
            const isMid = idx === mid;
            const isEliminated = eliminated.has(idx);
            const isFound = found && idx === left;
            const peak = isPeak(idx);

            const height = (value / Math.max(...ARRAY)) * 200;

            let bgColor: string = COLORS.eliminated;
            let borderColor: string = '#374151';
            let scale = 1;

            if (isFound) {
              bgColor = COLORS.found;
              borderColor = COLORS.found;
              scale = 1.1;
            } else if (peak && !isEliminated) {
              bgColor = COLORS.peak;
              borderColor = COLORS.peak;
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
                className="flex flex-col items-center"
                animate={{ scale }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="w-12 rounded-t-lg border-2 flex items-end justify-center font-mono font-bold text-white text-xs pb-2"
                  style={{
                    height: `${height}px`,
                    backgroundColor: bgColor,
                    borderColor,
                    minHeight: '30px',
                  }}
                  initial={{ height: 0 }}
                  animate={{ height }}
                  transition={{ duration: 0.3 }}
                >
                  {value}
                </motion.div>
                <div className="text-xs text-zinc-500 mt-1">{idx}</div>
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
              <span className="text-xs text-zinc-400">peak</span>
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
              <div className="text-xs text-zinc-500 mb-1">arr[mid+1]</div>
              <div className="text-lg font-mono font-bold" style={{ color: COLORS.right }}>
                {nextValue}
              </div>
            </div>
          </div>
        </div>
      )}

      <VizControls controls={controls} accentColor={COLORS.mid} />
    </div>
  );
}
