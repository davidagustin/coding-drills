'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const SIZE = 5;
const UPDATES: [number, number, number][] = [
  [1, 3, 2],
  [2, 4, 3],
  [0, 2, -1],
];

interface DifferenceArrayStep {
  diff: number[];
  result: number[];
  updateIndex: number;
  phase: 'update' | 'reconstruct' | 'complete';
  i: number;
  explanation: string;
}

function computeSteps(): DifferenceArrayStep[] {
  const steps: DifferenceArrayStep[] = [];
  const diff: number[] = new Array(SIZE + 1).fill(0);
  const result: number[] = new Array(SIZE).fill(0);

  steps.push({
    diff: [...diff],
    result: [...result],
    updateIndex: -1,
    phase: 'update',
    i: -1,
    explanation: `Start: Apply ${UPDATES.length} range updates using difference array`,
  });

  // Apply updates
  for (let u = 0; u < UPDATES.length; u++) {
    const [start, end, value] = UPDATES[u];
    diff[start] += value;
    if (end + 1 <= SIZE) {
      diff[end + 1] -= value;
    }
    steps.push({
      diff: [...diff],
      result: [...result],
      updateIndex: u,
      phase: 'update',
      i: -1,
      explanation: `Update ${u + 1}: [${start}, ${end}, ${value}] → diff[${start}] += ${value}, diff[${end + 1}] -= ${value}`,
    });
  }

  // Reconstruct
  result[0] = diff[0];
  steps.push({
    diff: [...diff],
    result: [...result],
    updateIndex: -1,
    phase: 'reconstruct',
    i: 0,
    explanation: `Reconstruct: result[0] = diff[0] = ${result[0]}`,
  });

  for (let i = 1; i < SIZE; i++) {
    result[i] = result[i - 1] + diff[i];
    steps.push({
      diff: [...diff],
      result: [...result],
      updateIndex: -1,
      phase: 'reconstruct',
      i,
      explanation: `Reconstruct ${i}: result[${i}] = result[${i - 1}] + diff[${i}] = ${result[i - 1]} + ${diff[i]} = ${result[i]}`,
    });
  }

  steps.push({
    diff: [...diff],
    result: [...result],
    updateIndex: -1,
    phase: 'complete',
    i: -1,
    explanation: `Complete: Final array = [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function DifferenceArrayViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { diff, result, phase, i, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Difference Array Range Updates</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Difference Array */}
        {phase === 'update' && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Difference Array</h3>
            <div className="flex gap-2 flex-wrap">
              {diff.map((val, idx) => (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                    val !== 0
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  {val}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Result Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Result Array</h3>
          <div className="flex gap-2 flex-wrap">
            {result.map((val, idx) => {
              const isCurrent = idx === i && phase === 'reconstruct';
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                    isCurrent
                      ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                      : phase === 'complete'
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  {val}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
