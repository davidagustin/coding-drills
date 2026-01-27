'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const MATRIX = [
  [1, 2, 3],
  [4, 5, 6],
];

interface TransposeStep {
  matrix: number[][];
  transposed: number[][];
  row: number;
  col: number;
  explanation: string;
}

function computeSteps(): TransposeStep[] {
  const steps: TransposeStep[] = [];
  const rowCount = MATRIX.length;
  const colCount = MATRIX[0].length;
  const transposed: number[][] = Array.from({ length: colCount }, () => Array(rowCount).fill(0));

  steps.push({
    matrix: MATRIX.map((r) => [...r]),
    transposed: transposed.map((r) => [...r]),
    row: -1,
    col: -1,
    explanation: `Start: Transpose ${rowCount}x${colCount} matrix to ${colCount}x${rowCount}`,
  });

  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      transposed[col][row] = MATRIX[row][col];
      steps.push({
        matrix: MATRIX.map((r) => [...r]),
        transposed: transposed.map((r) => [...r]),
        row,
        col,
        explanation: `matrix[${row}][${col}] = ${MATRIX[row][col]} → transposed[${col}][${row}]`,
      });
    }
  }

  steps.push({
    matrix: MATRIX.map((r) => [...r]),
    transposed: transposed.map((r) => [...r]),
    row: -1,
    col: -1,
    explanation: `Complete: Matrix transposed`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function TransposeMatrixViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { matrix, transposed, row, col, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Transpose Matrix</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Original Matrix */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Original Matrix</h3>
          <div className="space-y-2">
            {matrix.map((rowData, r) => (
              <div key={r} className="flex gap-2">
                {rowData.map((val, c) => {
                  const isCurrent = r === row && c === col;
                  return (
                    <motion.div
                      key={`${r}-${c}`}
                      initial={false}
                      animate={{
                        scale: isCurrent ? 1.1 : 1,
                      }}
                      className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                        isCurrent
                          ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                      }`}
                    >
                      {val}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Transposed Matrix */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Transposed Matrix</h3>
          <div className="space-y-2">
            {transposed.map((rowData, r) => (
              <div key={r} className="flex gap-2">
                {rowData.map((val, c) => {
                  const isCurrent = r === col && c === row;
                  return (
                    <motion.div
                      key={`${r}-${c}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: isCurrent ? 1.1 : 1, opacity: 1 }}
                      className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                        isCurrent
                          ? 'bg-green-500/20 border-green-500 text-green-400'
                          : 'bg-green-500/10 border-green-500/30 text-green-300'
                      }`}
                    >
                      {val}
                    </motion.div>
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
