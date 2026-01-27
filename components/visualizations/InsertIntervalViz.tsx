'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const INTERVALS: [number, number][] = [
  [1, 3],
  [6, 9],
];
const NEW_INTERVAL: [number, number] = [2, 5];

interface InsertStep {
  phase: 'before' | 'merge' | 'after' | 'complete';
  i: number;
  intervals: [number, number][];
  explanation: string;
}

function computeSteps(): InsertStep[] {
  const steps: InsertStep[] = [];
  const result: [number, number][] = [];
  let i = 0;

  // Add intervals before new interval
  while (i < INTERVALS.length && INTERVALS[i][1] < NEW_INTERVAL[0]) {
    result.push(INTERVALS[i]);
    steps.push({
      phase: 'before',
      i,
      intervals: [...result],
      explanation: `Interval [${INTERVALS[i][0]}, ${INTERVALS[i][1]}] ends before new interval → add as-is`,
    });
    i++;
  }

  // Merge overlapping intervals
  const merged: [number, number] = [NEW_INTERVAL[0], NEW_INTERVAL[1]];
  while (i < INTERVALS.length && INTERVALS[i][0] <= NEW_INTERVAL[1]) {
    merged[0] = Math.min(merged[0], INTERVALS[i][0]);
    merged[1] = Math.max(merged[1], INTERVALS[i][1]);
    steps.push({
      phase: 'merge',
      i,
      intervals: [...result, merged],
      explanation: `Merge [${INTERVALS[i][0]}, ${INTERVALS[i][1]}] with new interval → [${merged[0]}, ${merged[1]}]`,
    });
    i++;
  }
  result.push(merged);

  // Add remaining intervals
  while (i < INTERVALS.length) {
    result.push(INTERVALS[i]);
    steps.push({
      phase: 'after',
      i,
      intervals: [...result],
      explanation: `Add remaining interval [${INTERVALS[i][0]}, ${INTERVALS[i][1]}]`,
    });
    i++;
  }

  steps.push({
    phase: 'complete',
    i: -1,
    intervals: [...result],
    explanation: 'Complete: Final merged intervals',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  new: '#eab308',
  merged: '#22c55e',
  existing: '#3b82f6',
} as const;

export default function InsertIntervalViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Insert Interval</h2>
      <div className="mb-4 text-zinc-400">
        New:{' '}
        <span className="font-mono text-white">
          [{NEW_INTERVAL[0]}, {NEW_INTERVAL[1]}]
        </span>
      </div>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
      </div>

      <div className="mb-6 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-300 mb-2">Result:</h3>
          <div className="flex gap-4 flex-wrap">
            {currentStep.intervals.map((interval, idx) => {
              const isNew = interval[0] === NEW_INTERVAL[0] && interval[1] === NEW_INTERVAL[1];
              const width = (interval[1] - interval[0]) * 40;
              return (
                <motion.div
                  key={idx}
                  className="relative h-12 flex items-center"
                  style={{ width: `${Math.max(width, 60)}px` }}
                >
                  <div
                    className="h-full rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white text-xs"
                    style={{
                      backgroundColor: isNew ? `${COLORS.new}40` : `${COLORS.merged}40`,
                      borderColor: isNew ? COLORS.new : COLORS.merged,
                    }}
                  >
                    [{interval[0]}, {interval[1]}]
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.new} />
    </div>
  );
}
