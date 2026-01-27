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

interface RotateImageStep {
  matrix: number[][];
  i: number;
  j: number;
  phase: 'transpose' | 'reverse' | 'complete';
  explanation: string;
}

function computeSteps(): RotateImageStep[] {
  const steps: RotateImageStep[] = [];
  const matrix = MATRIX.map((row) => [...row]);
  const n = matrix.length;

  steps.push({
    matrix: matrix.map((r) => [...r]),
    i: -1,
    j: -1,
    phase: 'transpose',
    explanation: 'Start: Rotate matrix 90° clockwise',
  });

  steps.push({
    matrix: matrix.map((r) => [...r]),
    i: -1,
    j: -1,
    phase: 'transpose',
    explanation: 'Step 1: Transpose matrix',
  });

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      steps.push({
        matrix: matrix.map((r) => [...r]),
        i,
        j,
        phase: 'transpose',
        explanation: `Transpose: swap (${i}, ${j}) and (${j}, ${i})`,
      });
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  steps.push({
    matrix: matrix.map((r) => [...r]),
    i: -1,
    j: -1,
    phase: 'reverse',
    explanation: 'Step 2: Reverse each row',
  });

  for (let i = 0; i < n; i++) {
    let left = 0;
    let right = n - 1;
    while (left < right) {
      steps.push({
        matrix: matrix.map((r) => [...r]),
        i,
        j: left,
        phase: 'reverse',
        explanation: `Reverse row ${i}: swap col ${left} and ${right}`,
      });
      [matrix[i][left], matrix[i][right]] = [matrix[i][right], matrix[i][left]];
      left++;
      right--;
    }
  }

  steps.push({
    matrix: matrix.map((r) => [...r]),
    i: -1,
    j: -1,
    phase: 'complete',
    explanation: 'Complete: Matrix rotated 90° clockwise',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  swapping: '#22c55e',
  default: '#3b82f6',
} as const;

export default function RotateImageViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { matrix, i, j, phase, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Rotate Image (90° Clockwise)</h2>

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
              const isCurrent =
                (i === r && j === c) || (i === c && j === r && phase === 'transpose');

              let bgColor: string = COLORS.default;
              if (isCurrent) {
                bgColor = COLORS.swapping;
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
