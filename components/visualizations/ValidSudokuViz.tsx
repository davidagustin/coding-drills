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

interface SudokuValidStep {
  board: string[][];
  row: number;
  col: number;
  checkType: 'row' | 'col' | 'box';
  isValid: boolean;
  explanation: string;
}

function computeSteps(): SudokuValidStep[] {
  const steps: SudokuValidStep[] = [];

  function isValidRow(board: string[][], row: number): boolean {
    const seen = new Set<string>();
    for (let col = 0; col < 9; col++) {
      const val = board[row][col];
      if (val !== '.') {
        if (seen.has(val)) {
          steps.push({
            board: board.map((r) => [...r]),
            row,
            col,
            checkType: 'row',
            isValid: false,
            explanation: `Row ${row}: duplicate ${val} at col ${col}`,
          });
          return false;
        }
        seen.add(val);
      }
    }
    steps.push({
      board: board.map((r) => [...r]),
      row,
      col: -1,
      checkType: 'row',
      isValid: true,
      explanation: `Row ${row}: valid`,
    });
    return true;
  }

  function isValidCol(board: string[][], col: number): boolean {
    const seen = new Set<string>();
    for (let row = 0; row < 9; row++) {
      const val = board[row][col];
      if (val !== '.') {
        if (seen.has(val)) {
          steps.push({
            board: board.map((r) => [...r]),
            row,
            col,
            checkType: 'col',
            isValid: false,
            explanation: `Col ${col}: duplicate ${val} at row ${row}`,
          });
          return false;
        }
        seen.add(val);
      }
    }
    steps.push({
      board: board.map((r) => [...r]),
      row: -1,
      col,
      checkType: 'col',
      isValid: true,
      explanation: `Col ${col}: valid`,
    });
    return true;
  }

  function isValidBox(board: string[][], boxRow: number, boxCol: number): boolean {
    const seen = new Set<string>();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const row = boxRow * 3 + i;
        const col = boxCol * 3 + j;
        const val = board[row][col];
        if (val !== '.') {
          if (seen.has(val)) {
            steps.push({
              board: board.map((r) => [...r]),
              row,
              col,
              checkType: 'box',
              isValid: false,
              explanation: `Box (${boxRow}, ${boxCol}): duplicate ${val} at (${row}, ${col})`,
            });
            return false;
          }
          seen.add(val);
        }
      }
    }
    steps.push({
      board: board.map((r) => [...r]),
      row: boxRow,
      col: boxCol,
      checkType: 'box',
      isValid: true,
      explanation: `Box (${boxRow}, ${boxCol}): valid`,
    });
    return true;
  }

  steps.push({
    board: BOARD.map((r) => [...r]),
    row: -1,
    col: -1,
    checkType: 'row',
    isValid: true,
    explanation: 'Start: Validate Sudoku board',
  });

  for (let i = 0; i < 9; i++) {
    if (!isValidRow(BOARD, i)) {
      steps.push({
        board: BOARD.map((r) => [...r]),
        row: -1,
        col: -1,
        checkType: 'row',
        isValid: false,
        explanation: 'Complete: Invalid Sudoku (row violation)',
      });
      return steps;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (!isValidCol(BOARD, i)) {
      steps.push({
        board: BOARD.map((r) => [...r]),
        row: -1,
        col: -1,
        checkType: 'col',
        isValid: false,
        explanation: 'Complete: Invalid Sudoku (column violation)',
      });
      return steps;
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!isValidBox(BOARD, i, j)) {
        steps.push({
          board: BOARD.map((r) => [...r]),
          row: -1,
          col: -1,
          checkType: 'box',
          isValid: false,
          explanation: 'Complete: Invalid Sudoku (box violation)',
        });
        return steps;
      }
    }
  }

  steps.push({
    board: BOARD.map((r) => [...r]),
    row: -1,
    col: -1,
    checkType: 'row',
    isValid: true,
    explanation: 'Complete: Valid Sudoku ✓',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  valid: '#22c55e',
  invalid: '#ef4444',
  default: '#3b82f6',
  empty: '#6b7280',
} as const;

export default function ValidSudokuViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { board, row, col, checkType, isValid, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Valid Sudoku</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className={`font-bold text-lg mt-2 ${isValid ? 'text-green-400' : 'text-red-400'}`}>
            {isValid ? 'Valid Sudoku ✓' : 'Invalid Sudoku ✗'}
          </p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Sudoku Board</h3>
        <div className="grid grid-cols-9 gap-1 p-2 bg-zinc-950 rounded-lg border border-zinc-700">
          {board.map((rowArr, r) =>
            rowArr.map((cell, c) => {
              const isCurrent = row === r && col === c;
              const isEmpty = cell === '.';

              let bgColor: string = COLORS.default;
              if (isCurrent) {
                bgColor = isValid ? COLORS.current : COLORS.invalid;
              } else if (isEmpty) {
                bgColor = COLORS.empty;
              } else if (checkType === 'row' && r === row) {
                bgColor = isValid ? COLORS.valid : COLORS.invalid;
              } else if (checkType === 'col' && c === col) {
                bgColor = isValid ? COLORS.valid : COLORS.invalid;
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
