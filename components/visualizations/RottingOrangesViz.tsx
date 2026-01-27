'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const GRID = [
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1],
];

interface OrangeStep {
  grid: number[][];
  minutes: number;
  explanation: string;
  done: boolean;
}

function computeSteps(): OrangeStep[] {
  const steps: OrangeStep[] = [];
  const grid = GRID.map((row) => [...row]);
  let minutes = 0;

  steps.push({
    grid: grid.map((row) => [...row]),
    minutes: 0,
    explanation: 'Initial state: 2=fresh, 1=rotten, 0=empty',
    done: false,
  });

  while (true) {
    const toRot = new Set<string>();
    let changed = false;

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if (grid[r][c] === 2) {
          const dirs = [
            [r + 1, c],
            [r - 1, c],
            [r, c + 1],
            [r, c - 1],
          ];
          for (const [nr, nc] of dirs) {
            if (
              nr >= 0 &&
              nr < grid.length &&
              nc >= 0 &&
              nc < grid[0].length &&
              grid[nr][nc] === 1
            ) {
              toRot.add(`${nr},${nc}`);
              changed = true;
            }
          }
        }
      }
    }

    if (!changed) break;

    minutes++;
    for (const key of toRot) {
      const [r, c] = key.split(',').map(Number);
      grid[r][c] = 2;
    }

    steps.push({
      grid: grid.map((row) => [...row]),
      minutes,
      explanation: `Minute ${minutes}: Rot adjacent fresh oranges`,
      done: false,
    });
  }

  const hasFresh = grid.some((row) => row.some((cell) => cell === 1));
  steps.push({
    grid: grid.map((row) => [...row]),
    minutes,
    explanation: hasFresh ? 'Some oranges never rot!' : 'All oranges rotted!',
    done: true,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  fresh: '#22c55e',
  rotten: '#ef4444',
  empty: '#6b7280',
  current: '#eab308',
} as const;

export default function RottingOrangesViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Rotting Oranges</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {currentStep.done && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Minutes: {currentStep.minutes}</p>
        )}
      </div>

      <div className="mb-6 flex justify-center">
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${GRID[0].length}, 1fr)` }}
        >
          {currentStep.grid.map((row, r) =>
            row.map((cell, c) => {
              let bgColor: string = COLORS.empty;
              if (cell === 1) bgColor = COLORS.fresh;
              else if (cell === 2) bgColor = COLORS.rotten;

              return (
                <motion.div
                  key={`${r}-${c}`}
                  className="w-20 h-20 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: `${bgColor}40`,
                    borderColor: bgColor,
                  }}
                >
                  {cell}
                </motion.div>
              );
            }),
          )}
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.rotten} />
    </div>
  );
}
