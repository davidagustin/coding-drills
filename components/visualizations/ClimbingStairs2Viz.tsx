'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const N = 5;

interface ClimbingStep {
  n: number;
  dp: number[];
  i: number;
  explanation: string;
}

function computeSteps(): ClimbingStep[] {
  const steps: ClimbingStep[] = [];
  const dp = new Array(N + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  steps.push({
    n: N,
    dp: [...dp],
    i: -1,
    explanation: `Start: Climb ${N} stairs (can take 1 or 2 steps)`,
  });

  for (let i = 2; i <= N; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    steps.push({
      n: N,
      dp: [...dp],
      i,
      explanation: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`,
    });
  }

  steps.push({
    n: N,
    dp: [...dp],
    i: -1,
    explanation: `Complete: Ways to climb ${N} stairs = ${dp[N]}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  computed: '#22c55e',
  base: '#3b82f6',
  default: '#6b7280',
} as const;

export default function ClimbingStairs2Viz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { n, dp, i, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Climbing Stairs</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Ways to climb {n} stairs: {dp[n]}
          </p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">DP Array</h3>
        <div className="flex gap-2 justify-center flex-wrap">
          {dp.map((val, idx) => {
            const isCurrent = i === idx;
            const isBase = idx <= 1;
            const isComputed = idx <= i && i >= 0;

            let bgColor: string = COLORS.default;
            if (isCurrent) {
              bgColor = COLORS.current;
            } else if (isBase) {
              bgColor = COLORS.base;
            } else if (isComputed) {
              bgColor = COLORS.computed;
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <motion.div
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: isCurrent ? '#fff' : bgColor,
                  }}
                  animate={{
                    scale: isCurrent ? 1.2 : 1,
                  }}
                >
                  {val}
                </motion.div>
                <div className="text-xs text-zinc-500">dp[{idx}]</div>
              </div>
            );
          })}
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
