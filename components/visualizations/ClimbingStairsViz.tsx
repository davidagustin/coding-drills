'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Pre-computed DP steps                                             */
/* ------------------------------------------------------------------ */

const N = 5; // Number of stairs

interface StepState {
  stairs: number[];
  dp: number[];
  currentStair: number | null;
  explanation: string;
  paths: Array<{ from: number; to: number; count: number }>;
}

function computeSteps(): StepState[] {
  const steps: StepState[] = [];
  const dp = new Array(N + 1).fill(0);
  dp[0] = 1; // One way to stay at ground
  dp[1] = 1; // One way to reach step 1

  // Initial state
  steps.push({
    stairs: Array.from({ length: N + 1 }, (_, i) => i),
    dp: [...dp],
    currentStair: null,
    explanation: `Base cases: dp[0] = 1 (stay at ground), dp[1] = 1 (one step)`,
    paths: [],
  });

  // Fill DP table
  for (let i = 2; i <= N; i++) {
    const prev1 = dp[i - 1];
    const prev2 = dp[i - 2];

    steps.push({
      stairs: Array.from({ length: N + 1 }, (_, i) => i),
      dp: [...dp],
      currentStair: i,
      explanation: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${prev1} + ${prev2} = ${prev1 + prev2}`,
      paths: [
        { from: i - 1, to: i, count: prev1 },
        { from: i - 2, to: i, count: prev2 },
      ],
    });

    dp[i] = prev1 + prev2;
  }

  // Final state
  steps.push({
    stairs: Array.from({ length: N + 1 }, (_, i) => i),
    dp: [...dp],
    currentStair: null,
    explanation: `Answer: dp[${N}] = ${dp[N]} ways to climb ${N} stairs`,
    paths: [],
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const COLORS = {
  stair: '#3b82f6',
  current: '#10b981',
  computed: '#eab308',
  path: '#8b5cf6',
  dpValue: '#f97316',
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ClimbingStairsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { stairs, dp, currentStair, explanation, paths } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Climbing Stairs (Dynamic Programming)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white font-mono text-sm">{explanation}</p>
      </div>

      {/* Stairs Visualization */}
      <div className="mb-6 space-y-4">
        <h3 className="text-lg font-semibold text-zinc-300">Stairs</h3>
        <div className="flex items-end gap-2 justify-center">
          {stairs.map((stairNum, idx) => {
            const isCurrent = currentStair === stairNum;
            const isComputed = dp[idx] > 0 && idx <= (currentStair ?? N);
            const height = 40 + idx * 8;

            return (
              <div key={idx} className="flex flex-col items-center">
                <motion.div
                  className="rounded-t-lg border-2 flex items-center justify-center font-mono font-bold text-white text-xs"
                  style={{
                    width: '50px',
                    height: `${height}px`,
                    backgroundColor: isCurrent ? COLORS.current : COLORS.stair,
                    borderColor: isCurrent ? COLORS.computed : COLORS.stair,
                    boxShadow: isCurrent ? `0 0 15px ${COLORS.current}40` : 'none',
                  }}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {stairNum}
                </motion.div>
                {isComputed && (
                  <motion.div
                    className="mt-2 px-2 py-1 rounded bg-zinc-800 border border-zinc-700"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span className="text-xs font-mono font-bold" style={{ color: COLORS.dpValue }}>
                      {dp[idx]}
                    </span>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Path Visualization */}
      {paths.length > 0 && (
        <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
          <h3 className="text-sm font-semibold text-zinc-300 mb-2">Paths to Current Stair</h3>
          <div className="flex gap-4">
            {paths.map((path, idx) => (
              <div key={idx} className="text-xs text-zinc-400">
                <span className="font-mono">
                  {path.count} way{path.count !== 1 ? 's' : ''} from stair {path.from}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DP Table */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">DP Table</h3>
        <div className="grid grid-cols-6 gap-2">
          {dp.map((value, idx) => {
            const isCurrent = currentStair === idx;
            const isComputed = idx <= (currentStair ?? N) && idx <= N;

            return (
              <motion.div
                key={idx}
                className="p-3 rounded-lg border-2 text-center"
                style={{
                  backgroundColor: isCurrent ? `${COLORS.current}20` : `${COLORS.stair}10`,
                  borderColor: isCurrent ? COLORS.current : `${COLORS.stair}40`,
                }}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                }}
              >
                <div className="text-xs text-zinc-500 mb-1">dp[{idx}]</div>
                <div
                  className="text-lg font-mono font-bold"
                  style={{
                    color: isComputed ? COLORS.dpValue : COLORS.stair,
                  }}
                >
                  {isComputed ? value : '-'}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.stair} />
    </div>
  );
}
