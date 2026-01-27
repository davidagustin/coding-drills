'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ROW_INDEX = 4;

interface PascalsTriangleRowStep {
  rowIndex: number;
  currentRow: number[];
  previousRow: number[] | null;
  explanation: string;
}

function computeSteps(): PascalsTriangleRowStep[] {
  const steps: PascalsTriangleRowStep[] = [];
  let currentRow: number[] = [1];
  let previousRow: number[] | null = null;

  steps.push({
    rowIndex: 0,
    currentRow: [...currentRow],
    previousRow: null,
    explanation: `Row 0: [1] (base case)`,
  });

  for (let i = 1; i <= ROW_INDEX; i++) {
    previousRow = [...currentRow];
    const newRow: number[] = [1];

    steps.push({
      rowIndex: i,
      currentRow: [...currentRow],
      previousRow: [...previousRow],
      explanation: `Building row ${i}: Start with [1]`,
    });

    for (let j = 1; j < i; j++) {
      const value = previousRow[j - 1] + previousRow[j];
      newRow.push(value);
      steps.push({
        rowIndex: i,
        currentRow: [...newRow],
        previousRow: [...previousRow],
        explanation: `Row ${i}[${j}] = prev[${j - 1}] + prev[${j}] = ${previousRow[j - 1]} + ${previousRow[j]} = ${value}`,
      });
    }

    newRow.push(1);
    steps.push({
      rowIndex: i,
      currentRow: [...newRow],
      previousRow: [...previousRow],
      explanation: `Row ${i}: End with [1], complete row = [${newRow.join(', ')}]`,
    });

    currentRow = newRow;
  }

  steps.push({
    rowIndex: ROW_INDEX,
    currentRow: [...currentRow],
    previousRow: null,
    explanation: `Complete: Row ${ROW_INDEX} = [${currentRow.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function PascalsTriangleRowViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { rowIndex, currentRow, previousRow, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Pascal&apos;s Triangle Row</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Previous Row */}
        {previousRow && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Previous Row</h3>
            <div className="flex gap-2 flex-wrap">
              {previousRow.map((val, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-zinc-800 border-2 border-zinc-700 rounded-lg font-mono text-sm font-semibold text-zinc-300"
                >
                  {val}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Current Row */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Row {rowIndex}</h3>
          <div className="flex gap-2 flex-wrap">
            {currentRow.map((val, idx) => (
              <div
                key={idx}
                className="px-4 py-2 bg-cyan-500/20 border-2 border-cyan-500 rounded-lg font-mono text-sm font-semibold text-cyan-400"
              >
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
