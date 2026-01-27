'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const MATRIX_A = [
  [1, 2],
  [3, 4],
];
const MATRIX_B = [
  [5, 6],
  [7, 8],
];

interface MatrixMultiplyStep {
  a: number[][];
  b: number[][];
  result: number[][];
  row: number;
  col: number;
  k: number;
  explanation: string;
}

function computeSteps(): MatrixMultiplyStep[] {
  const steps: MatrixMultiplyStep[] = [];
  const result: number[][] = Array.from({ length: MATRIX_A.length }, () =>
    Array(MATRIX_B[0].length).fill(0),
  );

  steps.push({
    a: MATRIX_A.map((r) => [...r]),
    b: MATRIX_B.map((r) => [...r]),
    result: result.map((r) => [...r]),
    row: -1,
    col: -1,
    k: -1,
    explanation: `Start: Multiply ${MATRIX_A.length}x${MATRIX_A[0].length} by ${MATRIX_B.length}x${MATRIX_B[0].length}`,
  });

  for (let row = 0; row < MATRIX_A.length; row++) {
    for (let col = 0; col < MATRIX_B[0].length; col++) {
      steps.push({
        a: MATRIX_A.map((r) => [...r]),
        b: MATRIX_B.map((r) => [...r]),
        result: result.map((r) => [...r]),
        row,
        col,
        k: -1,
        explanation: `Compute result[${row}][${col}]`,
      });

      for (let k = 0; k < MATRIX_A[0].length; k++) {
        result[row][col] += MATRIX_A[row][k] * MATRIX_B[k][col];
        steps.push({
          a: MATRIX_A.map((r) => [...r]),
          b: MATRIX_B.map((r) => [...r]),
          result: result.map((r) => [...r]),
          row,
          col,
          k,
          explanation: `result[${row}][${col}] += A[${row}][${k}] * B[${k}][${col}] = ${MATRIX_A[row][k]} * ${MATRIX_B[k][col]} = ${MATRIX_A[row][k] * MATRIX_B[k][col]}`,
        });
      }
    }
  }

  steps.push({
    a: MATRIX_A.map((r) => [...r]),
    b: MATRIX_B.map((r) => [...r]),
    result: result.map((r) => [...r]),
    row: -1,
    col: -1,
    k: -1,
    explanation: `Complete: Result matrix computed`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function MatrixMultiplyViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { a, b, result, row, col, k, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Matrix Multiplication</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Matrix A */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Matrix A</h3>
          <div className="space-y-2">
            {a.map((rowData, r) => (
              <div key={r} className="flex gap-2">
                {rowData.map((val, c) => {
                  const isCurrent = r === row && c === k;
                  return (
                    <div
                      key={c}
                      className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                        isCurrent
                          ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                      }`}
                    >
                      {val}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Matrix B */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Matrix B</h3>
          <div className="space-y-2">
            {b.map((rowData, r) => (
              <div key={r} className="flex gap-2">
                {rowData.map((val, c) => {
                  const isCurrent = r === k && c === col;
                  return (
                    <div
                      key={c}
                      className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                        isCurrent
                          ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                      }`}
                    >
                      {val}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Result Matrix */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Result Matrix</h3>
          <div className="space-y-2">
            {result.map((rowData, r) => (
              <div key={r} className="flex gap-2">
                {rowData.map((val, c) => {
                  const isCurrent = r === row && c === col;
                  return (
                    <div
                      key={c}
                      className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                        isCurrent
                          ? 'bg-green-500/20 border-green-500 text-green-400'
                          : val !== 0
                            ? 'bg-green-500/10 border-green-500/30 text-green-300'
                            : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                      }`}
                    >
                      {val}
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
