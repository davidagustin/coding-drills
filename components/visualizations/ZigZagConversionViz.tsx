'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const STRING = 'PAYPALISHIRING';
const ROWS = 3;

interface ZigZagStep {
  str: string;
  rows: number;
  grid: string[][];
  row: number;
  col: number;
  direction: number;
  explanation: string;
}

function computeSteps(): ZigZagStep[] {
  const steps: ZigZagStep[] = [];
  const grid: string[][] = Array.from({ length: ROWS }, () => []);
  let row = 0;
  let direction = 1;

  steps.push({
    str: STRING,
    rows: ROWS,
    grid: grid.map((r) => [...r]),
    row: 0,
    col: 0,
    direction: 1,
    explanation: `Start: Convert "${STRING}" to zigzag pattern with ${ROWS} rows`,
  });

  for (let i = 0; i < STRING.length; i++) {
    grid[row].push(STRING[i]);

    steps.push({
      str: STRING,
      rows: ROWS,
      grid: grid.map((r) => [...r]),
      row,
      col: grid[row].length - 1,
      direction,
      explanation: `Place "${STRING[i]}" at row ${row}`,
    });

    if (row === 0) {
      direction = 1;
    } else if (row === ROWS - 1) {
      direction = -1;
    }

    row += direction;
  }

  const result = grid.map((r) => r.join('')).join('');

  steps.push({
    str: STRING,
    rows: ROWS,
    grid: grid.map((r) => [...r]),
    row: -1,
    col: -1,
    direction: 0,
    explanation: `Complete: Result = "${result}"`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  placed: '#22c55e',
  default: '#3b82f6',
} as const;

export default function ZigZagConversionViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { grid, row, col, explanation } = currentStep;
  const result = grid.map((r) => r.join('')).join('');

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">ZigZag Conversion</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Result: &quot;{result}&quot;</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">ZigZag Grid</h3>
          <div className="space-y-2">
            {grid.map((rowArr, r) => (
              <div key={r} className="flex gap-1 justify-center">
                {rowArr.map((char, c) => {
                  const isCurrent = row === r && col === c;

                  let bgColor: string = COLORS.default;
                  if (isCurrent) {
                    bgColor = COLORS.current;
                  } else if (c < rowArr.length) {
                    bgColor = COLORS.placed;
                  }

                  return (
                    <motion.div
                      key={c}
                      className="w-10 h-10 rounded border-2 flex items-center justify-center font-mono font-bold text-white text-sm"
                      style={{
                        backgroundColor: bgColor,
                        borderColor: isCurrent ? '#fff' : bgColor,
                      }}
                      animate={{
                        scale: isCurrent ? 1.1 : 1,
                      }}
                    >
                      {char}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
