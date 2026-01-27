'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const MATRIX = [
  ['1', '0', '1', '0', '0'],
  ['1', '0', '1', '1', '1'],
  ['1', '1', '1', '1', '1'],
  ['1', '0', '0', '1', '0'],
];

interface MaxRectStep {
  matrix: string[][];
  heights: number[];
  row: number;
  area: number;
  maxArea: number;
  explanation: string;
}

function computeSteps(): MaxRectStep[] {
  const steps: MaxRectStep[] = [];
  const heights = new Array(MATRIX[0].length).fill(0);
  let maxArea = 0;

  steps.push({
    matrix: MATRIX.map((r) => [...r]),
    heights: [...heights],
    row: -1,
    area: 0,
    maxArea: 0,
    explanation: 'Start: Find maximal rectangle',
  });

  for (let r = 0; r < MATRIX.length; r++) {
    for (let c = 0; c < MATRIX[0].length; c++) {
      heights[c] = MATRIX[r][c] === '1' ? heights[c] + 1 : 0;
    }

    steps.push({
      matrix: MATRIX.map((row) => [...row]),
      heights: [...heights],
      row: r,
      area: 0,
      maxArea,
      explanation: `Row ${r}: Update heights = [${heights.join(', ')}]`,
    });

    const stack: number[] = [];
    for (let i = 0; i <= heights.length; i++) {
      const h = i < heights.length ? heights[i] : 0;
      while (stack.length > 0 && heights[stack[stack.length - 1]] > h) {
        const height = heights[stack.pop()!];
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
        const area = height * width;
        maxArea = Math.max(maxArea, area);

        steps.push({
          matrix: MATRIX.map((row) => [...row]),
          heights: [...heights],
          row: r,
          area,
          maxArea,
          explanation: `Row ${r}: Calculate area ${height} × ${width} = ${area}, maxArea = ${maxArea}`,
        });
      }
      if (i < heights.length) {
        stack.push(i);
      }
    }
  }

  steps.push({
    matrix: MATRIX.map((r) => [...r]),
    heights: [...heights],
    row: -1,
    area: maxArea,
    maxArea,
    explanation: `Complete: Maximal rectangle area = ${maxArea}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  rectangle: '#22c55e',
  one: '#3b82f6',
  zero: '#1f2937',
} as const;

export default function MaximalRectangleViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { matrix, heights, row, maxArea, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Maximal Rectangle</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Max Area: {maxArea}</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Matrix</h3>
          <div
            className="grid gap-1 p-2 bg-zinc-950 rounded-lg border border-zinc-800"
            style={{ gridTemplateColumns: `repeat(${matrix[0]?.length || 0}, minmax(0, 1fr))` }}
          >
            {matrix.map((rowArr, r) =>
              rowArr.map((cell, c) => {
                const isCurrentRow = row === r;
                const isOne = cell === '1';

                let bgColor: string = COLORS.zero;
                if (isCurrentRow) {
                  bgColor = isOne ? COLORS.current : COLORS.zero;
                } else if (isOne) {
                  bgColor = COLORS.one;
                }

                return (
                  <motion.div
                    key={`${r}-${c}`}
                    className="aspect-square rounded border flex items-center justify-center font-mono font-bold text-white text-sm"
                    style={{
                      backgroundColor: bgColor,
                      borderColor: isCurrentRow ? '#fff' : '#52525b',
                    }}
                    animate={{
                      scale: isCurrentRow ? 1.05 : 1,
                    }}
                  >
                    {cell}
                  </motion.div>
                );
              }),
            )}
          </div>
        </div>

        {row >= 0 && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Heights for Row {row}</h3>
            <div className="flex gap-2 justify-center">
              {heights.map((h, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <motion.div
                    className="w-12 rounded-t border-2 flex items-end justify-center font-mono font-bold text-white text-xs p-1"
                    style={{
                      height: `${(h / Math.max(...heights, 1)) * 100}px`,
                      backgroundColor: COLORS.rectangle,
                      borderColor: COLORS.rectangle,
                    }}
                  >
                    {h}
                  </motion.div>
                  <div className="text-xs text-zinc-500">{idx}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
