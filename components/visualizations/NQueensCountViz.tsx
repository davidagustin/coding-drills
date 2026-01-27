'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const N = 4;

interface QueenStep {
  row: number;
  col: number;
  board: boolean[][];
  explanation: string;
  count: number;
  valid: boolean;
}

function computeSteps(): QueenStep[] {
  const steps: QueenStep[] = [];
  const board: boolean[][] = Array.from({ length: N }, () => Array(N).fill(false));
  let count = 0;

  function isValid(row: number, col: number): boolean {
    for (let i = 0; i < row; i++) {
      if (board[i][col]) return false;
      if (col - (row - i) >= 0 && board[i][col - (row - i)]) return false;
      if (col + (row - i) < N && board[i][col + (row - i)]) return false;
    }
    return true;
  }

  function solve(row: number): void {
    if (row === N) {
      count++;
      steps.push({
        row: -1,
        col: -1,
        board: board.map((r) => [...r]),
        explanation: `Solution ${count} found!`,
        count,
        valid: true,
      });
      return;
    }

    for (let col = 0; col < N; col++) {
      if (isValid(row, col)) {
        board[row][col] = true;
        steps.push({
          row,
          col,
          board: board.map((r) => [...r]),
          explanation: `Place queen at [${row}, ${col}]`,
          count,
          valid: true,
        });
        solve(row + 1);
        board[row][col] = false;
        steps.push({
          row,
          col,
          board: board.map((r) => [...r]),
          explanation: `Backtrack: remove queen from [${row}, ${col}]`,
          count,
          valid: false,
        });
      }
    }
  }

  solve(0);
  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  queen: '#ef4444',
  current: '#eab308',
  valid: '#22c55e',
} as const;

export default function NQueensCountViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">N-Queens Count (N={N})</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Total Solutions: {currentStep.count}
          </p>
        )}
      </div>

      <div className="mb-6 flex justify-center">
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${N}, 1fr)` }}>
          {currentStep.board.map((row, r) =>
            row.map((hasQueen, c) => {
              const isCurrent = currentStep.row === r && currentStep.col === c;
              const isQueen = hasQueen;
              const bgColor = (r + c) % 2 === 0 ? '#1f2937' : '#374151';

              return (
                <motion.div
                  key={`${r}-${c}`}
                  className="w-16 h-16 rounded border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: isCurrent
                      ? `${COLORS.current}40`
                      : isQueen
                        ? `${COLORS.queen}40`
                        : bgColor,
                    borderColor: isCurrent ? COLORS.current : isQueen ? COLORS.queen : '#52525b',
                  }}
                  animate={{ scale: isCurrent ? 1.15 : 1 }}
                >
                  {isQueen ? '♕' : ''}
                </motion.div>
              );
            }),
          )}
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.queen} />
    </div>
  );
}
