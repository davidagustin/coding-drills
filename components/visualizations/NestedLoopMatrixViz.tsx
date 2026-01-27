'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const MATRIX = [
  [1, 2],
  [3, 4],
  [5, 6],
];

interface MatrixStep {
  matrix: number[][];
  result: number[];
  row: number;
  col: number;
  explanation: string;
}

function computeSteps(): MatrixStep[] {
  const steps: MatrixStep[] = [];
  const result: number[] = [];

  steps.push({
    matrix: MATRIX.map((r) => [...r]),
    result: [],
    row: -1,
    col: -1,
    explanation: `Start: Traverse matrix row by row`,
  });

  for (let row = 0; row < MATRIX.length; row++) {
    for (let col = 0; col < MATRIX[row].length; col++) {
      result.push(MATRIX[row][col]);
      steps.push({
        matrix: MATRIX.map((r) => [...r]),
        result: [...result],
        row,
        col,
        explanation: `matrix[${row}][${col}] = ${MATRIX[row][col]}`,
      });
    }
  }

  steps.push({
    matrix: MATRIX.map((r) => [...r]),
    result: [...result],
    row: -1,
    col: -1,
    explanation: `Complete: Result = [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function NestedLoopMatrixViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { matrix, result, row, col, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Matrix Traversal</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Matrix */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Matrix</h3>
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
                      className="relative"
                    >
                      <div
                        className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-lg font-semibold border-2 ${
                          isCurrent
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                            : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                        }`}
                      >
                        {val}
                      </div>
                      <div className="text-xs text-zinc-500 text-center mt-1">
                        [{r}][{c}]
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Result Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Result Array</h3>
          <div className="flex gap-2 flex-wrap">
            {result.length === 0 ? (
              <div className="text-zinc-500 text-sm">Empty</div>
            ) : (
              result.map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-16 h-16 rounded-lg bg-green-500/20 border-2 border-green-500 flex items-center justify-center font-mono text-lg font-semibold text-green-400"
                >
                  {val}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
