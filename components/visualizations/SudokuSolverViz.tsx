'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const BOARD = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];

interface SudokuStep {
  board: string[][];
  row: number;
  col: number;
  num: string;
  valid: boolean;
  explanation: string;
}

function computeSteps(): SudokuStep[] {
  const steps: SudokuStep[] = [];
  const board = BOARD.map((row) => [...row]);

  function isValid(board: string[][], row: number, col: number, num: string): boolean {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) {
        return false;
      }
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (board[i][j] === num) {
          return false;
        }
      }
    }

    return true;
  }

  function solve(board: string[][]): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === '.') {
          for (let num = 1; num <= 9; num++) {
            const numStr = num.toString();
            const valid = isValid(board, row, col, numStr);

            steps.push({
              board: board.map((r) => [...r]),
              row,
              col,
              num: numStr,
              valid,
              explanation: valid
                ? `Try ${numStr} at (${row}, ${col}) → valid`
                : `Try ${numStr} at (${row}, ${col}) → invalid`,
            });

            if (valid) {
              board[row][col] = numStr;
              steps.push({
                board: board.map((r) => [...r]),
                row,
                col,
                num: numStr,
                valid: true,
                explanation: `Place ${numStr} at (${row}, ${col})`,
              });

              if (solve(board)) {
                return true;
              }

              board[row][col] = '.';
              steps.push({
                board: board.map((r) => [...r]),
                row,
                col,
                num: '',
                valid: false,
                explanation: `Backtrack: remove ${numStr} from (${row}, ${col})`,
              });
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  steps.push({
    board: board.map((r) => [...r]),
    row: -1,
    col: -1,
    num: '',
    valid: true,
    explanation: 'Start: Solve Sudoku',
  });

  solve(board);

  steps.push({
    board: board.map((r) => [...r]),
    row: -1,
    col: -1,
    num: '',
    valid: true,
    explanation: 'Complete: Sudoku solved',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  placed: '#22c55e',
  invalid: '#ef4444',
  original: '#3b82f6',
  empty: '#6b7280',
} as const;

export default function SudokuSolverViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { board, row, col, valid, explanation } = currentStep;
  const originalBoard = BOARD;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Sudoku Solver</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Sudoku Board</h3>
        <div className="grid grid-cols-9 gap-1 p-2 bg-zinc-950 rounded-lg border border-zinc-700">
          {board.map((rowArr, r) =>
            rowArr.map((cell, c) => {
              const isCurrent = row === r && col === c;
              const isOriginal = originalBoard[r][c] !== '.';
              const isEmpty = cell === '.';

              let bgColor: string = COLORS.empty;
              if (isCurrent) {
                bgColor = valid ? COLORS.current : COLORS.invalid;
              } else if (!isEmpty) {
                bgColor = isOriginal ? COLORS.original : COLORS.placed;
              }

              return (
                <motion.div
                  key={`${r}-${c}`}
                  className="aspect-square rounded border flex items-center justify-center font-mono font-bold text-white text-sm"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: isCurrent ? '#fff' : '#52525b',
                  }}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                >
                  {cell !== '.' ? cell : ''}
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
