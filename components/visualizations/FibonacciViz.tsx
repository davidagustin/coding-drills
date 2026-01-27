'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const N = 6;

interface FibonacciStep {
  n: number;
  dp: number[];
  explanation: string;
}

function computeSteps(): FibonacciStep[] {
  const steps: FibonacciStep[] = [];
  const dp = new Array(N + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;

  steps.push({
    n: -1,
    dp: [...dp],
    explanation: `Base cases: F(0) = 0, F(1) = 1`,
  });

  for (let i = 2; i <= N; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    steps.push({
      n: i,
      dp: [...dp],
      explanation: `F(${i}) = F(${i - 1}) + F(${i - 2}) = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`,
    });
  }

  steps.push({
    n: N,
    dp: [...dp],
    explanation: `Complete: F(${N}) = ${dp[N]}`,
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

export default function FibonacciViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { n, dp, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Fibonacci Number</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            F({N}) = {dp[N]}
          </p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">DP Array</h3>
        <div className="flex gap-2 justify-center flex-wrap">
          {dp.map((val, idx) => {
            const isCurrent = n === idx;
            const isBase = idx <= 1;
            const isComputed = idx <= n && n >= 0;

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
                <div className="text-xs text-zinc-500">F({idx})</div>
              </div>
            );
          })}
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
