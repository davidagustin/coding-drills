'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [2, 2, 1, 1, 1, 2, 2];

interface MajorityStep {
  arr: number[];
  candidate: number | null;
  count: number;
  i: number;
  explanation: string;
}

function computeSteps(): MajorityStep[] {
  const steps: MajorityStep[] = [];
  let candidate: number | null = null;
  let count = 0;

  steps.push({
    arr: [...ARRAY],
    candidate: null,
    count: 0,
    i: -1,
    explanation: 'Start: Find majority element (Boyer-Moore algorithm)',
  });

  for (let i = 0; i < ARRAY.length; i++) {
    if (count === 0) {
      candidate = ARRAY[i];
      count = 1;
      steps.push({
        arr: [...ARRAY],
        candidate,
        count,
        i,
        explanation: `Count = 0: Set candidate = ${candidate}, count = 1`,
      });
    } else if (ARRAY[i] === candidate) {
      count++;
      steps.push({
        arr: [...ARRAY],
        candidate,
        count,
        i,
        explanation: `Match: Increment count to ${count}`,
      });
    } else {
      count--;
      steps.push({
        arr: [...ARRAY],
        candidate,
        count,
        i,
        explanation: `Mismatch: Decrement count to ${count}`,
      });
    }
  }

  steps.push({
    arr: [...ARRAY],
    candidate,
    count,
    i: -1,
    explanation: `Complete: Candidate = ${candidate}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  candidate: '#22c55e',
  default: '#3b82f6',
} as const;

export default function MajorityElementViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, candidate, count, i, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Majority Element</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {candidate !== null && step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Majority Element: {candidate}</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array</h3>
          <div className="flex gap-2 justify-center">
            {arr.map((n, idx) => {
              const isCurrent = i === idx;
              const isCandidate = candidate === n;

              let bgColor: string = COLORS.default;
              if (isCandidate && step === STEPS.length - 1) {
                bgColor = COLORS.candidate;
              } else if (isCurrent) {
                bgColor = COLORS.current;
              }

              return (
                <motion.div
                  key={idx}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: isCurrent || isCandidate ? '#fff' : bgColor,
                  }}
                  animate={{
                    scale: isCurrent || isCandidate ? 1.2 : 1,
                  }}
                >
                  {n}
                </motion.div>
              );
            })}
          </div>
        </div>

        {candidate !== null && (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-800 rounded-lg">
              <p className="text-zinc-400 text-sm mb-1">Candidate</p>
              <p className="text-white font-bold text-xl">{candidate}</p>
            </div>
            <div className="p-4 bg-zinc-800 rounded-lg">
              <p className="text-zinc-400 text-sm mb-1">Count</p>
              <p className="text-yellow-400 font-bold text-xl">{count}</p>
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
