'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const MATRIX = [
  [1, 4, 7, 11],
  [2, 5, 8, 12],
  [3, 6, 9, 16],
  [10, 13, 14, 17],
];
const TARGET = 5;

interface SearchStep {
  row: number;
  col: number;
  value: number;
  comparison: string;
  found: boolean;
}

function computeSteps(): SearchStep[] {
  const steps: SearchStep[] = [];
  let row = 0;
  let col = MATRIX[0].length - 1;

  while (row < MATRIX.length && col >= 0) {
    const value = MATRIX[row][col];
    const found = value === TARGET;

    if (found) {
      steps.push({
        row,
        col,
        value,
        comparison: `Found target ${TARGET} at [${row}, ${col}]`,
        found: true,
      });
      break;
    }

    if (value > TARGET) {
      steps.push({
        row,
        col,
        value,
        comparison: `${value} > ${TARGET} → move left`,
        found: false,
      });
      col--;
    } else {
      steps.push({
        row,
        col,
        value,
        comparison: `${value} < ${TARGET} → move down`,
        found: false,
      });
      row++;
    }
  }

  if (steps.length === 0 || !steps[steps.length - 1].found) {
    steps.push({
      row: -1,
      col: -1,
      value: -1,
      comparison: `Target ${TARGET} not found`,
      found: false,
    });
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  found: '#22c55e',
  visited: '#6b7280',
  default: '#3b82f6',
} as const;

export default function Search2DMatrixViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const visited = useMemo(() => {
    const v = new Set<string>();
    for (let i = 0; i <= step && i < STEPS.length; i++) {
      if (STEPS[i].row >= 0) {
        v.add(`${STEPS[i].row},${STEPS[i].col}`);
      }
    }
    return v;
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Search 2D Matrix (Target: {TARGET})</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.comparison}</p>
      </div>

      <div className="mb-6 flex justify-center">
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${MATRIX[0].length}, 1fr)` }}
        >
          {MATRIX.map((row, r) =>
            row.map((value, c) => {
              const key = `${r},${c}`;
              const isCurrent = currentStep.row === r && currentStep.col === c;
              const isVisited = visited.has(key) && !isCurrent;
              const isFound = currentStep.found && isCurrent;

              let bgColor: string = COLORS.default;
              if (isFound) bgColor = COLORS.found;
              else if (isCurrent) bgColor = COLORS.current;
              else if (isVisited) bgColor = COLORS.visited;

              return (
                <motion.div
                  key={key}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: `${bgColor}20`,
                    borderColor: bgColor,
                  }}
                  animate={{ scale: isCurrent ? 1.15 : 1 }}
                >
                  {value}
                </motion.div>
              );
            }),
          )}
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.current} />
    </div>
  );
}
