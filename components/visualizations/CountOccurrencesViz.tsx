'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [1, 2, 2, 2, 3, 3, 4, 5] as const;
const TARGET = 2;

interface SearchStep {
  left: number;
  right: number;
  mid: number;
  midValue: number;
  phase: 'findFirst' | 'findLast' | 'complete';
  explanation: string;
  first: number | null;
  last: number | null;
}

function computeSteps(): SearchStep[] {
  const steps: SearchStep[] = [];
  let first = -1;
  let last = -1;

  // Find first occurrence
  let left = 0;
  let right = ARRAY.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = ARRAY[mid];

    if (midValue === TARGET) {
      first = mid;
      steps.push({
        left,
        right,
        mid,
        midValue,
        phase: 'findFirst',
        explanation: `Found ${TARGET} at ${mid}, continue searching left for first occurrence`,
        first: mid,
        last: null,
      });
      right = mid - 1;
    } else if (midValue < TARGET) {
      steps.push({
        left,
        right,
        mid,
        midValue,
        phase: 'findFirst',
        explanation: `arr[${mid}]=${midValue} < ${TARGET} → search right`,
        first: null,
        last: null,
      });
      left = mid + 1;
    } else {
      steps.push({
        left,
        right,
        mid,
        midValue,
        phase: 'findFirst',
        explanation: `arr[${mid}]=${midValue} > ${TARGET} → search left`,
        first: null,
        last: null,
      });
      right = mid - 1;
    }
  }

  // Find last occurrence
  left = 0;
  right = ARRAY.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = ARRAY[mid];

    if (midValue === TARGET) {
      last = mid;
      steps.push({
        left,
        right,
        mid,
        midValue,
        phase: 'findLast',
        explanation: `Found ${TARGET} at ${mid}, continue searching right for last occurrence`,
        first,
        last: mid,
      });
      left = mid + 1;
    } else if (midValue < TARGET) {
      steps.push({
        left,
        right,
        mid,
        midValue,
        phase: 'findLast',
        explanation: `arr[${mid}]=${midValue} < ${TARGET} → search right`,
        first,
        last,
      });
      left = mid + 1;
    } else {
      steps.push({
        left,
        right,
        mid,
        midValue,
        phase: 'findLast',
        explanation: `arr[${mid}]=${midValue} > ${TARGET} → search left`,
        first,
        last,
      });
      right = mid - 1;
    }
  }

  steps.push({
    left: first,
    right: last,
    mid: -1,
    midValue: TARGET,
    phase: 'complete',
    explanation: `First: ${first}, Last: ${last} → Count: ${last - first + 1}`,
    first,
    last,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  target: '#22c55e',
  found: '#eab308',
  searching: '#3b82f6',
} as const;

export default function CountOccurrencesViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Count Occurrences (Target: {TARGET})</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {currentStep.phase === 'complete' && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Count:{' '}
            {currentStep.last !== null && currentStep.first !== null
              ? currentStep.last - currentStep.first + 1
              : 0}
          </p>
        )}
      </div>

      <div className="mb-6 flex items-center justify-center gap-2 flex-wrap">
        {ARRAY.map((value, idx) => {
          const isTarget = value === TARGET;
          const isFirst = currentStep.first === idx;
          const isLast = currentStep.last === idx;
          const isInRange =
            currentStep.first !== null &&
            currentStep.last !== null &&
            idx >= currentStep.first &&
            idx <= currentStep.last;

          let bgColor = '#1f2937';
          let borderColor = '#374151';

          if (isFirst || isLast) {
            bgColor = COLORS.found;
            borderColor = COLORS.found;
          } else if (isInRange) {
            bgColor = COLORS.target;
            borderColor = COLORS.target;
          } else if (isTarget) {
            bgColor = `${COLORS.target}40`;
            borderColor = COLORS.target;
          }

          return (
            <motion.div
              key={idx}
              className="w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center font-mono font-bold text-white"
              style={{
                backgroundColor: bgColor,
                borderColor,
              }}
              animate={{
                scale: isFirst || isLast ? 1.15 : 1,
              }}
            >
              <div>{value}</div>
              <div className="text-xs mt-1 opacity-70">{idx}</div>
              {isFirst && <div className="text-xs text-yellow-400">First</div>}
              {isLast && <div className="text-xs text-yellow-400">Last</div>}
            </motion.div>
          );
        })}
      </div>

      <VizControls controls={controls} accentColor={COLORS.target} />
    </div>
  );
}
