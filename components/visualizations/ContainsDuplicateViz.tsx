'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [1, 2, 3, 1];

interface DuplicateStep {
  arr: number[];
  seen: Set<number>;
  current: number;
  hasDuplicate: boolean;
  explanation: string;
}

function computeSteps(): DuplicateStep[] {
  const steps: DuplicateStep[] = [];
  const seen = new Set<number>();
  let hasDuplicate = false;

  steps.push({
    arr: [...ARRAY],
    seen: new Set(),
    current: -1,
    hasDuplicate: false,
    explanation: 'Start: Check for duplicates',
  });

  for (const num of ARRAY) {
    steps.push({
      arr: [...ARRAY],
      seen: new Set(seen),
      current: num,
      hasDuplicate: false,
      explanation: `Check ${num}`,
    });

    if (seen.has(num)) {
      hasDuplicate = true;
      steps.push({
        arr: [...ARRAY],
        seen: new Set(seen),
        current: num,
        hasDuplicate: true,
        explanation: `Duplicate found: ${num} already seen`,
      });
      break;
    }

    seen.add(num);
    steps.push({
      arr: [...ARRAY],
      seen: new Set(seen),
      current: num,
      hasDuplicate: false,
      explanation: `Add ${num} to set`,
    });
  }

  steps.push({
    arr: [...ARRAY],
    seen: new Set(seen),
    current: -1,
    hasDuplicate,
    explanation: hasDuplicate ? 'Complete: Duplicate found ✓' : 'Complete: No duplicates ✗',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  duplicate: '#ef4444',
  seen: '#22c55e',
  default: '#3b82f6',
} as const;

export default function ContainsDuplicateViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, seen, current, hasDuplicate, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Contains Duplicate</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p
            className={`font-bold text-lg mt-2 ${hasDuplicate ? 'text-red-400' : 'text-green-400'}`}
          >
            {hasDuplicate ? 'Duplicate Found!' : 'No Duplicates'}
          </p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array</h3>
          <div className="flex gap-2 justify-center">
            {arr.map((n, idx) => {
              const isCurrent = current === n && step < STEPS.length - 1;
              const isSeen = seen.has(n);
              const isDuplicate = hasDuplicate && current === n && step < STEPS.length - 1;

              let bgColor: string = COLORS.default;
              if (isDuplicate) {
                bgColor = COLORS.duplicate;
              } else if (isSeen && !isCurrent) {
                bgColor = COLORS.seen;
              } else if (isCurrent) {
                bgColor = COLORS.current;
              }

              return (
                <motion.div
                  key={idx}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: isCurrent || isDuplicate ? '#fff' : bgColor,
                  }}
                  animate={{
                    scale: isCurrent || isDuplicate ? 1.2 : 1,
                  }}
                >
                  {n}
                </motion.div>
              );
            })}
          </div>
        </div>

        {seen.size > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Seen Set</h3>
            <div className="flex gap-2 justify-center flex-wrap">
              {Array.from(seen).map((n) => (
                <motion.div
                  key={n}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: COLORS.seen,
                    borderColor: COLORS.seen,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {n}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
