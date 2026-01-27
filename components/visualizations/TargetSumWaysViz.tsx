'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NUMS = [1, 1, 1, 1, 1];
const TARGET = 3;

interface TargetSumStep {
  i: number;
  sum: number;
  dp: Record<number, number>;
  explanation: string;
  ways: number;
}

function computeSteps(): TargetSumStep[] {
  const steps: TargetSumStep[] = [];
  const dp: Record<number, number> = { 0: 1 };

  steps.push({
    i: -1,
    sum: 0,
    dp: { ...dp },
    explanation: 'Base case: dp[0] = 1 (one way to get sum 0)',
    ways: 1,
  });

  for (let i = 0; i < NUMS.length; i++) {
    const newDp: Record<number, number> = {};
    for (const [sum, count] of Object.entries(dp)) {
      const sumNum = parseInt(sum, 10);
      const add = sumNum + NUMS[i];
      const subtract = sumNum - NUMS[i];

      newDp[add] = (newDp[add] || 0) + count;
      newDp[subtract] = (newDp[subtract] || 0) + count;

      steps.push({
        i,
        sum: sumNum,
        dp: { ...newDp },
        explanation: `nums[${i}]=${NUMS[i]}: sum ${sumNum} → +${NUMS[i]}=${add} or -${NUMS[i]}=${subtract}`,
        ways: newDp[TARGET] || 0,
      });
    }
    Object.assign(dp, newDp);
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  add: '#22c55e',
  subtract: '#ef4444',
  current: '#eab308',
} as const;

export default function TargetSumWaysViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Target Sum Ways (Target: {TARGET})</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Ways to reach {TARGET}: {currentStep.ways}
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

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <div className="text-sm text-zinc-400 mb-2">DP State:</div>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(currentStep.dp)
            .sort(([a], [b]) => parseInt(a, 10) - parseInt(b, 10))
            .map(([sum, count]) => (
              <div
                key={sum}
                className={`px-3 py-1 rounded font-mono text-sm ${
                  parseInt(sum, 10) === TARGET
                    ? 'bg-yellow-500 text-black'
                    : 'bg-zinc-700 text-white'
                }`}
              >
                sum={sum}: {count}
              </div>
            ))}
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.current} />
    </div>
  );
}
