'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const GRID = [
  [1, 1, 1],
  [1, 1, 0],
  [1, 0, 1],
];
const START_ROW = 1;
const START_COL = 1;
const NEW_COLOR = 2;

interface FloodFillStep {
  grid: number[][];
  currentRow: number;
  currentCol: number;
  visited: Set<string>;
  explanation: string;
}

function computeSteps(): FloodFillStep[] {
  const steps: FloodFillStep[] = [];
  const grid = GRID.map((row) => [...row]);
  const visited = new Set<string>();
  const origColor = grid[START_ROW][START_COL];

  if (origColor === NEW_COLOR) {
    steps.push({
      grid: grid.map((row) => [...row]),
      currentRow: -1,
      currentCol: -1,
      visited: new Set(visited),
      explanation: `Early exit: Original color equals new color, no change needed`,
    });
    return steps;
  }

  function fill(r: number, c: number): void {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) return;
    if (grid[r][c] !== origColor) return;

    const key = `${r},${c}`;
    if (visited.has(key)) return;

    visited.add(key);
    grid[r][c] = NEW_COLOR;
    steps.push({
      grid: grid.map((row) => [...row]),
      currentRow: r,
      currentCol: c,
      visited: new Set(visited),
      explanation: `Fill cell [${r}, ${c}]: Change color from ${origColor} to ${NEW_COLOR}`,
    });

    fill(r + 1, c);
    fill(r - 1, c);
    fill(r, c + 1);
    fill(r, c - 1);
  }

  steps.push({
    grid: grid.map((row) => [...row]),
    currentRow: START_ROW,
    currentCol: START_COL,
    visited: new Set(),
    explanation: `Start: Flood fill from [${START_ROW}, ${START_COL}], original color = ${origColor}, new color = ${NEW_COLOR}`,
  });

  fill(START_ROW, START_COL);

  steps.push({
    grid: grid.map((row) => [...row]),
    currentRow: -1,
    currentCol: -1,
    visited: new Set(visited),
    explanation: `Complete: All connected cells filled`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function FloodFillViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { grid, currentRow, currentCol, visited, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Flood Fill</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Grid */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Grid</h3>
          <div className="inline-block">
            {grid.map((row, r) => (
              <div key={r} className="flex gap-2">
                {row.map((cell, c) => {
                  const isCurrent = r === currentRow && c === currentCol && currentRow !== -1;
                  const isVisited = visited.has(`${r},${c}`);
                  return (
                    <div
                      key={c}
                      className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                        isCurrent
                          ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                          : isVisited
                            ? 'bg-green-500/20 border-green-500 text-green-400'
                            : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                      }`}
                    >
                      {cell}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
