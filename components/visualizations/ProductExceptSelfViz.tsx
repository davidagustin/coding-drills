'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NUMS = [1, 2, 3, 4];

interface ProductStep {
  phase: 'prefix' | 'suffix' | 'complete';
  i: number;
  prefix: number[];
  suffix: number;
  result: number[];
  explanation: string;
}

function computeSteps(): ProductStep[] {
  const steps: ProductStep[] = [];
  const n = NUMS.length;
  const result = new Array(n).fill(1);
  let prefix = 1;

  // Prefix pass
  steps.push({
    phase: 'prefix',
    i: -1,
    prefix: [],
    suffix: 0,
    result: [...result],
    explanation: 'Start: Initialize result array with 1s',
  });

  for (let i = 0; i < n; i++) {
    result[i] = prefix;
    prefix *= NUMS[i];
    steps.push({
      phase: 'prefix',
      i,
      prefix: Array.from({ length: i + 1 }, (_, j) =>
        j === 0 ? 1 : NUMS.slice(0, j).reduce((a, b) => a * b, 1),
      ),
      suffix: 0,
      result: [...result],
      explanation: `Prefix pass ${i}: result[${i}] = ${result[i]} (product of left elements)`,
    });
  }

  // Suffix pass
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= NUMS[i];
    steps.push({
      phase: 'suffix',
      i,
      prefix: [],
      suffix,
      result: [...result],
      explanation: `Suffix pass ${i}: result[${i}] *= ${suffix / NUMS[i]} = ${result[i]}`,
    });
  }

  steps.push({
    phase: 'complete',
    i: -1,
    prefix: [],
    suffix: 0,
    result: [...result],
    explanation: 'Complete: Final result array',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  prefix: '#3b82f6',
  suffix: '#f97316',
  current: '#eab308',
  result: '#22c55e',
} as const;

export default function ProductExceptSelfViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Product of Array Except Self</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          {NUMS.map((value, idx) => {
            const isCurrent = currentStep.i === idx;
            return (
              <motion.div
                key={idx}
                className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: isCurrent
                    ? `${COLORS.current}40`
                    : currentStep.phase === 'prefix' && idx <= currentStep.i
                      ? `${COLORS.prefix}20`
                      : '#1f2937',
                  borderColor: isCurrent ? COLORS.current : '#374151',
                }}
                animate={{ scale: isCurrent ? 1.15 : 1 }}
              >
                {value}
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2">
          {currentStep.result.map((value, idx) => {
            const isCurrent = currentStep.i === idx;
            return (
              <motion.div
                key={idx}
                className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: isCurrent ? `${COLORS.result}40` : `${COLORS.result}20`,
                  borderColor: COLORS.result,
                }}
                animate={{ scale: isCurrent ? 1.15 : 1 }}
              >
                {value}
              </motion.div>
            );
          })}
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.prefix} />
    </div>
  );
}
