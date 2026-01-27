'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NUMS = [3, 34, 4, 12, 5, 2];
const TARGET = 9;

interface SubsetStep {
  i: number;
  sum: number;
  dp: boolean[];
  explanation: string;
  exists: boolean;
}

function computeSteps(): SubsetStep[] {
  const steps: SubsetStep[] = [];
  const dp = new Array(TARGET + 1).fill(false);
  dp[0] = true;

  steps.push({
    i: -1,
    sum: 0,
    dp: [...dp],
    explanation: 'Base case: dp[0] = true (empty subset sums to 0)',
    exists: false,
  });

  for (let i = 0; i < NUMS.length; i++) {
    for (let sum = TARGET; sum >= NUMS[i]; sum--) {
      const oldValue = dp[sum];
      dp[sum] = dp[sum] || dp[sum - NUMS[i]];
      if (dp[sum] !== oldValue) {
        steps.push({
          i,
          sum,
          dp: [...dp],
          explanation: `Using ${NUMS[i]}: dp[${sum}] = dp[${sum}] || dp[${sum - NUMS[i]}] = ${dp[sum]}`,
          exists: dp[TARGET],
        });
      }
    }
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  achievable: '#22c55e',
  default: '#3b82f6',
} as const;

export default function SubsetSumExistsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Subset Sum Exists (Target: {TARGET})</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p
            className={`font-bold text-lg mt-2 ${currentStep.exists ? 'text-green-400' : 'text-red-400'}`}
          >
            {currentStep.exists ? 'Subset exists!' : 'No subset found'}
          </p>
        )}
      </div>

      <div className="mb-6 flex items-center justify-center gap-2">
        {NUMS.map((value, idx) => {
          const isCurrent = currentStep.i === idx;
          return (
            <motion.div
              key={idx}
              className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
              style={{
                backgroundColor: isCurrent ? `${COLORS.current}40` : '#1f2937',
                borderColor: isCurrent ? COLORS.current : '#374151',
              }}
              animate={{ scale: isCurrent ? 1.15 : 1 }}
            >
              {value}
            </motion.div>
          );
        })}
      </div>

      {currentStep.dp.length > 0 && (
        <div className="mb-6 grid grid-cols-6 gap-2">
          {currentStep.dp.map((value, idx) => (
            <div
              key={idx}
              className="p-2 rounded border text-center text-xs"
              style={{
                backgroundColor:
                  idx === TARGET && value
                    ? `${COLORS.achievable}40`
                    : value
                      ? `${COLORS.achievable}20`
                      : '#1f2937',
                borderColor:
                  idx === TARGET && value
                    ? COLORS.achievable
                    : value
                      ? COLORS.achievable
                      : '#374151',
              }}
            >
              <div className="text-zinc-500">dp[{idx}]</div>
              <div className={`font-mono font-bold ${value ? 'text-green-400' : 'text-zinc-600'}`}>
                {value ? 'T' : 'F'}
              </div>
            </div>
          ))}
        </div>
      )}

      <VizControls controls={controls} accentColor={COLORS.default} />
    </div>
  );
}
