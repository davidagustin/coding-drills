'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NUMS = [1, 5, 11, 5];

interface PartitionStep {
  num: number | null;
  target: number;
  dp: boolean[];
  explanation: string;
  canPartition: boolean;
}

function computeSteps(): PartitionStep[] {
  const steps: PartitionStep[] = [];
  const total = NUMS.reduce((a, b) => a + b, 0);

  if (total % 2 !== 0) {
    steps.push({
      num: null,
      target: total / 2,
      dp: [],
      explanation: `Total sum ${total} is odd → Cannot partition equally`,
      canPartition: false,
    });
    return steps;
  }

  const target = total / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;

  steps.push({
    num: null,
    target,
    dp: [...dp],
    explanation: `Total sum=${total}, target=${target}. Initialize dp[0]=true`,
    canPartition: false,
  });

  for (const num of NUMS) {
    for (let j = target; j >= num; j--) {
      const oldValue = dp[j];
      dp[j] = dp[j] || dp[j - num];
      if (dp[j] !== oldValue) {
        steps.push({
          num,
          target,
          dp: [...dp],
          explanation: `Using ${num}: dp[${j}] = dp[${j}] || dp[${j - num}] = ${dp[j]}`,
          canPartition: dp[target],
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

export default function PartitionEqualSubsetViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Partition Equal Subset Sum</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p
            className={`font-bold text-lg mt-2 ${currentStep.canPartition ? 'text-green-400' : 'text-red-400'}`}
          >
            {currentStep.canPartition ? 'Can partition' : 'Cannot partition'}
          </p>
        )}
      </div>

      <div className="mb-6 flex items-center justify-center gap-2">
        {NUMS.map((value, idx) => {
          const isCurrent = currentStep.num === value;
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
                backgroundColor: value ? `${COLORS.achievable}20` : '#1f2937',
                borderColor: value ? COLORS.achievable : '#374151',
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
