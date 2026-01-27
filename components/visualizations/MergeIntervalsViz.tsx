'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const INTERVALS: [number, number][] = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
];

interface MergeStep {
  current: [number, number] | null;
  merged: [number, number][];
  explanation: string;
  action: 'add' | 'merge' | 'sort';
}

function computeSteps(): MergeStep[] {
  const steps: MergeStep[] = [];
  const sorted = [...INTERVALS].sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];

  steps.push({
    current: null,
    merged: [],
    explanation: 'Sort intervals by start time',
    action: 'sort',
  });

  merged.push(sorted[0]);
  steps.push({
    current: sorted[0],
    merged: [...merged],
    explanation: `Add first interval: [${sorted[0][0]}, ${sorted[0][1]}]`,
    action: 'add',
  });

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = merged[merged.length - 1];

    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
      steps.push({
        current,
        merged: [...merged],
        explanation: `Merge [${current[0]}, ${current[1]}] with [${last[0]}, ${last[1]}]`,
        action: 'merge',
      });
    } else {
      merged.push(current);
      steps.push({
        current,
        merged: [...merged],
        explanation: `Add new interval: [${current[0]}, ${current[1]}]`,
        action: 'add',
      });
    }
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  merged: '#22c55e',
  existing: '#3b82f6',
} as const;

export default function MergeIntervalsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Merge Overlapping Intervals</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
      </div>

      <div className="mb-6 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-300 mb-2">Merged Intervals:</h3>
          <div className="flex gap-4 flex-wrap">
            {currentStep.merged.map((interval, idx) => {
              const isCurrent = currentStep.current && interval[0] === currentStep.current[0];
              const width = (interval[1] - interval[0]) * 40;
              return (
                <motion.div
                  key={idx}
                  className="relative h-12 flex items-center"
                  style={{ width: `${Math.max(width, 60)}px` }}
                  animate={{ scale: isCurrent ? 1.1 : 1 }}
                >
                  <div
                    className="h-full rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white text-xs"
                    style={{
                      backgroundColor: isCurrent ? `${COLORS.current}40` : `${COLORS.merged}40`,
                      borderColor: isCurrent ? COLORS.current : COLORS.merged,
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

      <VizControls controls={controls} accentColor={COLORS.merged} />
    </div>
  );
}
