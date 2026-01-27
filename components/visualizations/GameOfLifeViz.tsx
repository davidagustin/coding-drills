'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const BOARD = [
  [0, 1, 0],
  [0, 0, 1],
  [1, 1, 1],
  [0, 0, 0],
];

interface LifeStep {
  board: number[][];
  generation: number;
  row: number;
  col: number;
  neighbors: number;
  explanation: string;
}

function computeSteps(): LifeStep[] {
  const steps: LifeStep[] = [];
  const board = BOARD.map((row) => [...row]);
  const rows = board.length;
  const cols = board[0].length;

  steps.push({
    board: board.map((r) => [...r]),
    generation: 0,
    row: -1,
    col: -1,
    neighbors: 0,
    explanation: 'Generation 0: Initial state',
  });

  function countNeighbors(board: number[][], r: number, c: number): number {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const nr = r + i;
        const nc = c + j;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          count += board[nr][nc];
        }
      }
    }
    return count;
  }

  const nextBoard = board.map((row) => [...row]);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const neighbors = countNeighbors(board, r, c);
      const isAlive = board[r][c] === 1;

      steps.push({
        board: board.map((row) => [...row]),
        generation: 0,
        row: r,
        col: c,
        neighbors,
        explanation: `Cell (${r}, ${c}): ${isAlive ? 'alive' : 'dead'}, ${neighbors} neighbors`,
      });

      if (isAlive) {
        if (neighbors < 2 || neighbors > 3) {
          nextBoard[r][c] = 0;
          steps.push({
            board: nextBoard.map((row) => [...row]),
            generation: 1,
            row: r,
            col: c,
            neighbors,
            explanation: `Cell (${r}, ${c}) dies (under/overpopulation)`,
          });
        } else {
          nextBoard[r][c] = 1;
          steps.push({
            board: nextBoard.map((row) => [...row]),
            generation: 1,
            row: r,
            col: c,
            neighbors,
            explanation: `Cell (${r}, ${c}) survives`,
          });
        }
      } else {
        if (neighbors === 3) {
          nextBoard[r][c] = 1;
          steps.push({
            board: nextBoard.map((row) => [...row]),
            generation: 1,
            row: r,
            col: c,
            neighbors,
            explanation: `Cell (${r}, ${c}) becomes alive (reproduction)`,
          });
        } else {
          nextBoard[r][c] = 0;
        }
      }
    }
  }

  steps.push({
    board: nextBoard.map((row) => [...row]),
    generation: 1,
    row: -1,
    col: -1,
    neighbors: 0,
    explanation: 'Complete: Generation 1',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  alive: '#22c55e',
  dead: '#1f2937',
  born: '#3b82f6',
  dying: '#ef4444',
} as const;

export default function GameOfLifeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { board, generation, row, col, neighbors, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Game of Life</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {row >= 0 && <p className="text-zinc-400 text-sm mt-1">Neighbors: {neighbors}</p>}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Generation {generation}</h3>
        <div
          className="grid gap-1 p-2 bg-zinc-950 rounded-lg border border-zinc-800"
          style={{ gridTemplateColumns: `repeat(${board[0]?.length || 0}, minmax(0, 1fr))` }}
        >
          {board.map((rowArr, r) =>
            rowArr.map((cell, c) => {
              const isCurrent = row === r && col === c;
              const isAlive = cell === 1;

              let bgColor: string = COLORS.dead;
              if (isCurrent) {
                bgColor = COLORS.current;
              } else if (isAlive) {
                bgColor = COLORS.alive;
              }

              return (
                <motion.div
                  key={`${r}-${c}`}
                  className="aspect-square rounded border flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: isCurrent ? '#fff' : '#52525b',
                  }}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                >
                  {cell}
                </motion.div>
              );
            }),
          )}
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
