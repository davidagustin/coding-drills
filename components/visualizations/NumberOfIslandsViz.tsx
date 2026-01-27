'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Grid and DFS steps                                                */
/* ------------------------------------------------------------------ */

const GRID = [
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1'],
];

interface IslandStep {
  grid: string[][];
  visited: Set<string>; // "r,c" format
  currentCell: { r: number; c: number } | null;
  islandCount: number;
  explanation: string;
  exploring: Array<{ r: number; c: number }>; // Cells being explored in current DFS
}

function computeSteps(): IslandStep[] {
  const steps: IslandStep[] = [];
  const grid = GRID.map((row) => [...row]);
  const visited = new Set<string>();
  let islandCount = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  function dfs(r: number, c: number, exploring: Array<{ r: number; c: number }>): void {
    const key = `${r},${c}`;
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0' || visited.has(key)) {
      return;
    }

    visited.add(key);
    exploring.push({ r, c });

    steps.push({
      grid: grid.map((row) => [...row]),
      visited: new Set(visited),
      currentCell: { r, c },
      islandCount,
      explanation: `Exploring cell (${r}, ${c}) - marking as visited`,
      exploring: [...exploring],
    });

    // Explore neighbors
    dfs(r + 1, c, exploring);
    dfs(r - 1, c, exploring);
    dfs(r, c + 1, exploring);
    dfs(r, c - 1, exploring);

    exploring.pop();
  }

  // Scan grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = `${r},${c}`;
      if (grid[r][c] === '1' && !visited.has(key)) {
        islandCount++;
        steps.push({
          grid: grid.map((row) => [...row]),
          visited: new Set(visited),
          currentCell: { r, c },
          islandCount,
          explanation: `Found new island at (${r}, ${c}) - Island count: ${islandCount}`,
          exploring: [],
        });
        dfs(r, c, []);
      }
    }
  }

  // Final state
  steps.push({
    grid: grid.map((row) => [...row]),
    visited: new Set(visited),
    currentCell: null,
    islandCount,
    explanation: `Complete! Found ${islandCount} island${islandCount !== 1 ? 's' : ''}`,
    exploring: [],
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const COLORS = {
  water: '#1e293b',
  land: '#10b981',
  visited: '#3b82f6',
  current: '#eab308',
  exploring: '#8b5cf6',
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function NumberOfIslandsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { grid, visited, currentCell, islandCount, explanation, exploring } = currentStep;

  const getCellColor = (r: number, c: number): string => {
    const key = `${r},${c}`;
    if (currentCell && currentCell.r === r && currentCell.c === c) {
      return COLORS.current;
    }
    if (exploring.some((cell) => cell.r === r && cell.c === c)) {
      return COLORS.exploring;
    }
    if (visited.has(key)) {
      return COLORS.visited;
    }
    return grid[r][c] === '1' ? COLORS.land : COLORS.water;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Number of Islands (DFS)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        <p className="text-yellow-400 font-bold text-lg mt-2">Islands Found: {islandCount}</p>
      </div>

      {/* Grid Visualization */}
      <div className="mb-6 flex justify-center">
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${grid[0].length}, 1fr)` }}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const color = getCellColor(r, c);
              const isLand = cell === '1';

              return (
                <motion.div
                  key={`${r}-${c}`}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: color,
                    borderColor: color === COLORS.current ? COLORS.current : '#374151',
                  }}
                  animate={{
                    scale: currentCell && currentCell.r === r && currentCell.c === c ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {isLand ? '1' : '0'}
                </motion.div>
              );
            }),
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mb-6 flex gap-4 justify-center flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.land }} />
          <span className="text-xs text-zinc-400">Land (Unvisited)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.current }} />
          <span className="text-xs text-zinc-400">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.exploring }} />
          <span className="text-xs text-zinc-400">Exploring</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.visited }} />
          <span className="text-xs text-zinc-400">Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.water }} />
          <span className="text-xs text-zinc-400">Water</span>
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.land} />
    </div>
  );
}
