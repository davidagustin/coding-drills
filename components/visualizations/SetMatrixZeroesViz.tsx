'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const MATRIX = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

interface MatrixZeroStep {
  matrix: number[][];
  row: number;
  col: number;
  phase: 'mark' | 'set';
  explanation: string;
}

function computeSteps(): MatrixZeroStep[] {
  const steps: MatrixZeroStep[] = [];
  const matrix = MATRIX.map((row) => [...row]);
  const rows = matrix.length;
  const cols = matrix[0].length;
  const zeroRows = new Set<number>();
  const zeroCols = new Set<number>();

  steps.push({
    matrix: matrix.map((r) => [...r]),
    row: -1,
    col: -1,
    phase: 'mark',
    explanation: 'Start: Set matrix zeroes',
  });

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === 0) {
        zeroRows.add(i);
        zeroCols.add(j);
        steps.push({
          matrix: matrix.map((r) => [...r]),
          row: i,
          col: j,
          phase: 'mark',
          explanation: `Found zero at (${i}, ${j}) → mark row ${i} and col ${j}`,
        });
      }
    }
  }

  steps.push({
    matrix: matrix.map((r) => [...r]),
    row: -1,
    col: -1,
    phase: 'set',
    explanation: 'Phase 2: Set marked rows and columns to zero',
  });

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (zeroRows.has(i) || zeroCols.has(j)) {
        matrix[i][j] = 0;
        steps.push({
          matrix: matrix.map((r) => [...r]),
          row: i,
          col: j,
          phase: 'set',
          explanation: `Set (${i}, ${j}) to 0`,
        });
      }
    }
  }

  steps.push({
    matrix: matrix.map((r) => [...r]),
    row: -1,
    col: -1,
    phase: 'set',
    explanation: 'Complete: Matrix updated',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  zero: '#ef4444',
  set: '#22c55e',
  default: '#3b82f6',
} as const;

export default function SetMatrixZeroesViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { matrix, row, col, phase, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Set Matrix Zeroes</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Matrix</h3>
        <div
          className="grid gap-1 p-2 bg-zinc-950 rounded-lg border border-zinc-800"
          style={{ gridTemplateColumns: `repeat(${matrix[0]?.length || 0}, minmax(0, 1fr))` }}
        >
          {matrix.map((rowArr, r) =>
            rowArr.map((cell, c) => {
              const isCurrent = row === r && col === c;
              const isZero = cell === 0;

              let bgColor: string = COLORS.default;
              if (isCurrent) {
                bgColor = phase === 'mark' ? COLORS.zero : COLORS.set;
              } else if (isZero) {
                bgColor = COLORS.zero;
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
