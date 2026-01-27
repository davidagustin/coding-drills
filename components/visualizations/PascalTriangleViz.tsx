'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ROWS = 5;

interface PascalStep {
  row: number;
  col: number;
  triangle: number[][];
  explanation: string;
}

function computeSteps(): PascalStep[] {
  const steps: PascalStep[] = [];
  const triangle: number[][] = [];

  steps.push({
    row: -1,
    col: -1,
    triangle: [],
    explanation: `Start: Generate Pascal's triangle with ${ROWS} rows`,
  });

  for (let i = 0; i < ROWS; i++) {
    triangle[i] = [];
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) {
        triangle[i][j] = 1;
        steps.push({
          row: i,
          col: j,
          triangle: triangle.map((r) => [...r]),
          explanation: `Row ${i}, Col ${j}: Edge element = 1`,
        });
      } else {
        triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
        steps.push({
          row: i,
          col: j,
          triangle: triangle.map((r) => [...r]),
          explanation: `Row ${i}, Col ${j}: ${triangle[i - 1][j - 1]} + ${triangle[i - 1][j]} = ${triangle[i][j]}`,
        });
      }
    }
  }

  steps.push({
    row: -1,
    col: -1,
    triangle: triangle.map((r) => [...r]),
    explanation: `Complete: Pascal's triangle generated`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  computed: '#22c55e',
  default: '#3b82f6',
} as const;

export default function PascalTriangleViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { row, col, triangle, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Pascal&apos;s Triangle</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Triangle</h3>
        <div className="flex flex-col items-center gap-2">
          {triangle.map((rowArr, r) => (
            <div key={r} className="flex gap-2 justify-center">
              {rowArr.map((val, c) => {
                const isCurrent = row === r && col === c;

                let bgColor: string = COLORS.default;
                if (isCurrent) {
                  bgColor = COLORS.current;
                } else if (r < triangle.length - 1 || (r === triangle.length - 1 && c <= col)) {
                  bgColor = COLORS.computed;
                }

                return (
                  <motion.div
                    key={c}
                    className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white text-sm"
                    style={{
                      backgroundColor: bgColor,
                      borderColor: isCurrent ? '#fff' : bgColor,
                    }}
                    animate={{
                      scale: isCurrent ? 1.2 : 1,
                      opacity: 1,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                  >
                    {val}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
