'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [3, 0, 1]; // Missing 2
const N = ARRAY.length;

interface MissingStep {
  index: number;
  num: number;
  expectedSum: number;
  actualSum: number;
  missing: number | null;
  explanation: string;
}

function computeSteps(): MissingStep[] {
  const steps: MissingStep[] = [];
  let actualSum = 0;
  const expectedSum = (N * (N + 1)) / 2;

  steps.push({
    index: -1,
    num: 0,
    expectedSum,
    actualSum: 0,
    missing: null,
    explanation: `Start: Find missing number. Expected sum 0..${N} = ${expectedSum}`,
  });

  for (let i = 0; i < ARRAY.length; i++) {
    actualSum += ARRAY[i];
    steps.push({
      index: i,
      num: ARRAY[i],
      expectedSum,
      actualSum,
      missing: null,
      explanation: `Add ${ARRAY[i]}, actual sum = ${actualSum}`,
    });
  }

  const missing = expectedSum - actualSum;
  steps.push({
    index: ARRAY.length,
    num: 0,
    expectedSum,
    actualSum,
    missing,
    explanation: `Missing = ${expectedSum} - ${actualSum} = ${missing}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  missing: '#ef4444',
  present: '#22c55e',
  default: '#3b82f6',
} as const;

export default function MissingNumberViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { index, expectedSum, actualSum, missing, explanation } = currentStep;
  const allNumbers = Array.from({ length: N + 1 }, (_, i) => i);
  const presentNumbers = new Set(ARRAY);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Missing Number</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {missing !== null && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Missing Number: {missing}</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array</h3>
          <div className="flex gap-2 justify-center">
            {ARRAY.map((n, i) => {
              const isCurrent = index === i;
              return (
                <motion.div
                  key={i}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: isCurrent ? COLORS.current : COLORS.present,
                    borderColor: isCurrent ? '#fff' : COLORS.present,
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

        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Expected Numbers: 0 to {N}</h3>
          <div className="flex gap-2 justify-center flex-wrap">
            {allNumbers.map((n) => {
              const isPresent = presentNumbers.has(n);
              const isMissing = missing === n;

              let bgColor: string = COLORS.default;
              if (isMissing) {
                bgColor = COLORS.missing;
              } else if (isPresent) {
                bgColor = COLORS.present;
              }

              return (
                <motion.div
                  key={n}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: isMissing ? '#fff' : bgColor,
                  }}
                  animate={{
                    scale: isMissing ? 1.2 : 1,
                  }}
                >
                  {n}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-zinc-400 text-sm mb-2">Expected Sum</p>
            <p className="text-2xl font-bold text-white">{expectedSum}</p>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-zinc-400 text-sm mb-2">Actual Sum</p>
            <p className="text-2xl font-bold text-white">{actualSum}</p>
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
