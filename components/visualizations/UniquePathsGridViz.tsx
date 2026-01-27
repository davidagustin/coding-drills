'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Pre-computed DP steps                                             */
/* ------------------------------------------------------------------ */

const M = 3;
const N = 7;

interface GridStep {
  row: number;
  col: number;
  dp: number[][];
  explanation: string;
  fromAbove: number | null;
  fromLeft: number | null;
}

function computeSteps(): GridStep[] {
  const steps: GridStep[] = [];
  const dp: number[][] = Array.from({ length: M }, () => Array(N).fill(1));

  // Initial state - first row and column are all 1s
  steps.push({
    row: -1,
    col: -1,
    dp: dp.map((row) => [...row]),
    explanation: 'Base case: First row and column are all 1s (only one path to reach them)',
    fromAbove: null,
    fromLeft: null,
  });

  // Fill DP table
  for (let i = 1; i < M; i++) {
    for (let j = 1; j < N; j++) {
      const fromAbove = dp[i - 1][j];
      const fromLeft = dp[i][j - 1];
      dp[i][j] = fromAbove + fromLeft;

      steps.push({
        row: i,
        col: j,
        dp: dp.map((row) => [...row]),
        explanation: `dp[${i}][${j}] = dp[${i - 1}][${j}] + dp[${i}][${j - 1}] = ${fromAbove} + ${fromLeft} = ${dp[i][j]}`,
        fromAbove,
        fromLeft,
      });
    }
  }

  // Final state
  steps.push({
    row: M - 1,
    col: N - 1,
    dp: dp.map((row) => [...row]),
    explanation: `Answer: ${dp[M - 1][N - 1]} unique paths from (0,0) to (${M - 1},${N - 1})`,
    fromAbove: null,
    fromLeft: null,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const COLORS = {
  cell: '#3b82f6',
  current: '#eab308',
  computed: '#22c55e',
  base: '#6b7280',
  path: '#8b5cf6',
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function UniquePathsGridViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { row, col, dp, explanation, fromAbove, fromLeft } = currentStep;

  const getCellColor = (r: number, c: number): string => {
    if (r === row && c === col) {
      return COLORS.current;
    }
    if (r === 0 || c === 0) {
      return COLORS.base;
    }
    if (r <= row && c <= col) {
      return COLORS.computed;
    }
    return COLORS.cell;
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Unique Paths in Grid (2D DP)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Total Paths: {dp[M - 1][N - 1]}</p>
        )}
      </div>

      {/* Grid Visualization */}
      <div className="mb-6 flex justify-center">
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${N}, 1fr)` }}>
          {dp.map((rowData, r) =>
            rowData.map((value, c) => {
              const isCurrent = r === row && c === col;
              const _isBase = r === 0 || c === 0;
              const color = getCellColor(r, c);

              return (
                <motion.div
                  key={`${r}-${c}`}
                  className="w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: `${color}20`,
                    borderColor: color,
                  }}
                  animate={{
                    scale: isCurrent ? 1.15 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ color }}>{value}</div>
                  <div className="text-xs text-zinc-500 mt-1">
                    ({r},{c})
                  </div>
                </motion.div>
              );
            }),
          )}
        </div>
      </div>

      {/* Current Calculation */}
      {fromAbove !== null && fromLeft !== null && (
        <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
          <div className="text-center">
            <div className="text-xs text-zinc-500 mb-2">
              Calculating dp[{row}][{col}]
            </div>
            <div className="flex items-center justify-center gap-3 text-lg">
              <div className="flex flex-col items-center">
                <span className="text-xs text-zinc-500">From Above</span>
                <span className="font-mono font-bold" style={{ color: COLORS.computed }}>
                  {fromAbove}
                </span>
              </div>
              <span className="text-zinc-500">+</span>
              <div className="flex flex-col items-center">
                <span className="text-xs text-zinc-500">From Left</span>
                <span className="font-mono font-bold" style={{ color: COLORS.computed }}>
                  {fromLeft}
                </span>
              </div>
              <span className="text-zinc-500">=</span>
              <div className="flex flex-col items-center">
                <span className="text-xs text-zinc-500">Total</span>
                <span className="font-mono font-bold" style={{ color: COLORS.current }}>
                  {dp[row][col]}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mb-6 flex gap-4 justify-center flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.base }} />
          <span className="text-xs text-zinc-400">Base Case (1)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.current }} />
          <span className="text-xs text-zinc-400">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.computed }} />
          <span className="text-xs text-zinc-400">Computed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.cell }} />
          <span className="text-xs text-zinc-400">Pending</span>
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.cell} />
    </div>
  );
}
