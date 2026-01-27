'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const N = 2;

interface TruthTableStep {
  n: number;
  rows: boolean[][];
  currentRow: number;
  explanation: string;
}

function computeSteps(): TruthTableStep[] {
  const steps: TruthTableStep[] = [];
  const rows: boolean[][] = [];
  const total = 1 << N;

  steps.push({
    n: N,
    rows: [],
    currentRow: -1,
    explanation: `Start: Generate truth table for ${N} variables (${total} rows)`,
  });

  for (let i = 0; i < total; i++) {
    const row: boolean[] = [];
    for (let j = 0; j < N; j++) {
      row.push(((i >> j) & 1) === 1);
    }
    rows.push(row);
    steps.push({
      n: N,
      rows: rows.map((r) => [...r]),
      currentRow: i,
      explanation: `Row ${i + 1}: Binary ${i.toString(2).padStart(N, '0')} → [${row.map((b) => b.toString()).join(', ')}]`,
    });
  }

  steps.push({
    n: N,
    rows: rows.map((r) => [...r]),
    currentRow: -1,
    explanation: `Complete: ${rows.length} rows generated`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function TruthTableViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { n, rows, currentRow, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Generate Truth Table</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Truth Table */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Truth Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {Array.from({ length: n }, (_, i) => (
                    <th key={i} className="border border-zinc-700 px-4 py-2 text-zinc-400 text-sm">
                      Var {i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => {
                  const isCurrent = idx === currentRow;
                  return (
                    <tr key={idx}>
                      {row.map((val, i) => (
                        <td
                          key={i}
                          className={`border border-zinc-700 px-4 py-2 text-center font-mono ${
                            isCurrent
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-zinc-800 text-zinc-300'
                          }`}
                        >
                          {val ? 'T' : 'F'}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
