'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const MATRIX = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

interface ZigzagStep {
  matrix: number[][];
  result: number[];
  row: number;
  col: number;
  explanation: string;
}

function computeSteps(): ZigzagStep[] {
  const steps: ZigzagStep[] = [];
  const result: number[] = [];

  steps.push({
    matrix: MATRIX.map((r) => [...r]),
    result: [],
    row: -1,
    col: -1,
    explanation: `Start: Zigzag traversal (even rows: left→right, odd rows: right→left)`,
  });

  for (let row = 0; row < MATRIX.length; row++) {
    const isEven = row % 2 === 0;
    if (isEven) {
      for (let col = 0; col < MATRIX[row].length; col++) {
        result.push(MATRIX[row][col]);
        steps.push({
          matrix: MATRIX.map((r) => [...r]),
          result: [...result],
          row,
          col,
          explanation: `Row ${row} (even): left→right, add matrix[${row}][${col}] = ${MATRIX[row][col]}`,
        });
      }
    } else {
      for (let col = MATRIX[row].length - 1; col >= 0; col--) {
        result.push(MATRIX[row][col]);
        steps.push({
          matrix: MATRIX.map((r) => [...r]),
          result: [...result],
          row,
          col,
          explanation: `Row ${row} (odd): right→left, add matrix[${row}][${col}] = ${MATRIX[row][col]}`,
        });
      }
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

export default function ZigzagIterationViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { matrix, result, row, col, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Zigzag Matrix Traversal</h2>

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
                  const isEvenRow = r % 2 === 0;
                  return (
                    <motion.div
                      key={`${r}-${c}`}
                      initial={false}
                      animate={{
                        scale: isCurrent ? 1.1 : 1,
                      }}
                      className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-lg font-semibold border-2 ${
                        isCurrent
                          ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                          : isEvenRow
                            ? 'bg-blue-500/10 border-blue-500/30 text-zinc-300'
                            : 'bg-purple-500/10 border-purple-500/30 text-zinc-300'
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
