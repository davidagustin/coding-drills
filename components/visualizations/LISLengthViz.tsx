'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NUMS = [10, 9, 2, 5, 3, 7, 101, 18];

interface LISStep {
  i: number;
  j: number;
  dp: number[];
  explanation: string;
  extending: boolean;
}

function computeSteps(): LISStep[] {
  const steps: LISStep[] = [];
  const dp = new Array(NUMS.length).fill(1);

  steps.push({
    i: -1,
    j: -1,
    dp: [...dp],
    explanation: 'Initialize: each element is a subsequence of length 1',
    extending: false,
  });

  for (let i = 1; i < NUMS.length; i++) {
    for (let j = 0; j < i; j++) {
      if (NUMS[j] < NUMS[i]) {
        const oldDp = dp[i];
        dp[i] = Math.max(dp[i], dp[j] + 1);
        steps.push({
          i,
          j,
          dp: [...dp],
          explanation: `nums[${j}]=${NUMS[j]} < nums[${i}]=${NUMS[i]} → extend LIS: dp[${i}] = max(${oldDp}, ${dp[j]} + 1) = ${dp[i]}`,
          extending: true,
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
  extending: '#22c55e',
  computed: '#3b82f6',
} as const;

export default function LISLengthViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Longest Increasing Subsequence (LIS)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            LIS Length: {Math.max(...currentStep.dp)}
          </p>
        )}
      </div>

      <div className="mb-6 flex items-end justify-center gap-2">
        {NUMS.map((value, idx) => {
          const isCurrent = currentStep.i === idx;
          const isComparing = currentStep.j === idx;
          const height = value * 3;

          let bgColor: string = COLORS.computed;
          if (isCurrent) bgColor = COLORS.current;
          else if (isComparing && currentStep.extending) bgColor = COLORS.extending;

          return (
            <motion.div
              key={idx}
              className="flex flex-col items-center"
              animate={{ scale: isCurrent ? 1.1 : 1 }}
            >
              <motion.div
                className="w-12 rounded-t-lg border-2 flex items-end justify-center font-mono font-bold text-white text-xs pb-1"
                style={{
                  height: `${height}px`,
                  backgroundColor: bgColor,
                  borderColor: bgColor,
                  minHeight: '30px',
                }}
              >
                {value}
              </motion.div>
              <div className="text-xs text-zinc-500 mt-1">{idx}</div>
              <div className="text-xs font-mono font-bold mt-1" style={{ color: COLORS.computed }}>
                dp={currentStep.dp[idx]}
              </div>
            </motion.div>
          );
        })}
      </div>

      <VizControls controls={controls} accentColor={COLORS.computed} />
    </div>
  );
}
