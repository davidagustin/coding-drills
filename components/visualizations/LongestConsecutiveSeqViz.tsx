'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NUMS = [100, 4, 200, 1, 3, 2];

interface ConsecutiveStep {
  num: number;
  visited: Set<number>;
  currentSeq: number[];
  longestSeq: number[];
  explanation: string;
}

function computeSteps(): ConsecutiveStep[] {
  const steps: ConsecutiveStep[] = [];
  const numSet = new Set(NUMS);
  const visited = new Set<number>();
  let longestSeq: number[] = [];

  for (const num of NUMS) {
    if (visited.has(num)) continue;

    const seq: number[] = [];
    let current = num;

    // Expand left
    while (numSet.has(current - 1)) {
      current--;
    }

    // Expand right
    while (numSet.has(current)) {
      seq.push(current);
      visited.add(current);
      current++;
    }

    if (seq.length > longestSeq.length) {
      longestSeq = seq;
    }

    steps.push({
      num,
      visited: new Set(visited),
      currentSeq: [...seq],
      longestSeq: [...longestSeq],
      explanation: `Start from ${num}: found sequence [${seq.join(', ')}] (length ${seq.length})`,
    });
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  inSeq: '#22c55e',
  longest: '#3b82f6',
  default: '#6b7280',
} as const;

export default function LongestConsecutiveSeqViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Longest Consecutive Sequence</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Longest: [{currentStep.longestSeq.join(', ')}] (length {currentStep.longestSeq.length})
          </p>
        )}
      </div>

      <div className="mb-6 flex items-center justify-center gap-2 flex-wrap">
        {NUMS.map((value, idx) => {
          const isCurrent = currentStep.num === value;
          const isInSeq = currentStep.currentSeq.includes(value);
          const isLongest = currentStep.longestSeq.includes(value);
          const _isVisited = currentStep.visited.has(value);

          let bgColor: string = COLORS.default;
          if (isLongest) bgColor = COLORS.longest;
          else if (isInSeq) bgColor = COLORS.inSeq;
          else if (isCurrent) bgColor = COLORS.current;

          return (
            <motion.div
              key={idx}
              className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
              style={{
                backgroundColor: `${bgColor}40`,
                borderColor: bgColor,
              }}
              animate={{ scale: isCurrent ? 1.15 : 1 }}
            >
              {value}
            </motion.div>
          );
        })}
      </div>

      <VizControls controls={controls} accentColor={COLORS.inSeq} />
    </div>
  );
}
