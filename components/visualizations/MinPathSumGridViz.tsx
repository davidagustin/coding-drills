'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const GRID = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
];

interface PathStep {
  i: number;
  j: number;
  dp: number[][];
  explanation: string;
}

function computeSteps(): PathStep[] {
  const steps: PathStep[] = [];
  const m = GRID.length;
  const n = GRID[0].length;
  const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));

  dp[0][0] = GRID[0][0];
  steps.push({
    i: 0,
    j: 0,
    dp: dp.map((r) => [...r]),
    explanation: `Start: dp[0][0] = ${GRID[0][0]}`,
  });

  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j - 1] + GRID[0][j];
    steps.push({
      i: 0,
      j,
      dp: dp.map((r) => [...r]),
      explanation: `First row: dp[0][${j}] = dp[0][${j - 1}] + grid[0][${j}] = ${dp[0][j]}`,
    });
  }

  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + GRID[i][0];
    steps.push({
      i,
      j: 0,
      dp: dp.map((r) => [...r]),
      explanation: `First column: dp[${i}][0] = dp[${i - 1}][0] + grid[${i}][0] = ${dp[i][0]}`,
    });
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      const fromAbove = dp[i - 1][j];
      const fromLeft = dp[i][j - 1];
      dp[i][j] = Math.min(fromAbove, fromLeft) + GRID[i][j];
      steps.push({
        i,
        j,
        dp: dp.map((r) => [...r]),
        explanation: `dp[${i}][${j}] = min(${fromAbove}, ${fromLeft}) + ${GRID[i][j]} = ${dp[i][j]}`,
      });
    }
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  computed: '#22c55e',
  path: '#3b82f6',
} as const;

export default function MinPathSumGridViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Minimum Path Sum</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Minimum Sum: {currentStep.dp[GRID.length - 1][GRID[0].length - 1]}
          </p>
        )}
      </div>

      <div className="mb-6 flex justify-center">
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${GRID[0].length}, 1fr)` }}
        >
          {GRID.map((row, r) =>
            row.map((value, c) => {
              const isCurrent = currentStep.i === r && currentStep.j === c;
              const isComputed = r <= currentStep.i && c <= currentStep.j;

              return (
                <motion.div
                  key={`${r}-${c}`}
                  className="w-20 h-20 rounded-lg border-2 flex flex-col items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: isCurrent
                      ? `${COLORS.current}40`
                      : isComputed
                        ? `${COLORS.computed}20`
                        : '#1f2937',
                    borderColor: isCurrent
                      ? COLORS.current
                      : isComputed
                        ? COLORS.computed
                        : '#374151',
                  }}
                  animate={{ scale: isCurrent ? 1.15 : 1 }}
                >
                  <div className="text-xs text-zinc-400">grid={value}</div>
                  <div className="text-sm" style={{ color: COLORS.path }}>
                    dp={currentStep.dp[r]?.[c] ?? '-'}
                  </div>
                </motion.div>
              );
            }),
          )}
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.path} />
    </div>
  );
}
