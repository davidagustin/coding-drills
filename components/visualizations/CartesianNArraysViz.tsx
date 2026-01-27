'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAYS: (number | string)[][] = [[1, 2], ['a', 'b'], ['x']];

interface CartesianNStep {
  arrays: (number | string)[][];
  combos: (number | string)[][];
  arrayIndex: number;
  explanation: string;
}

function computeSteps(): CartesianNStep[] {
  const steps: CartesianNStep[] = [];
  let combos: (number | string)[][] = [[]];

  steps.push({
    arrays: ARRAYS.map((a) => [...a]),
    combos: [[]],
    arrayIndex: -1,
    explanation: `Start: Generate Cartesian product of ${ARRAYS.length} arrays`,
  });

  for (let arrIdx = 0; arrIdx < ARRAYS.length; arrIdx++) {
    const newCombos: (number | string)[][] = [];
    for (const combo of combos) {
      for (const val of ARRAYS[arrIdx]) {
        newCombos.push([...combo, val]);
      }
    }
    combos = newCombos;
    steps.push({
      arrays: ARRAYS.map((a) => [...a]),
      combos: combos.map((c) => [...c]),
      arrayIndex: arrIdx,
      explanation: `After array ${arrIdx + 1}: ${combos.length} combinations`,
    });
  }

  steps.push({
    arrays: ARRAYS.map((a) => [...a]),
    combos: combos.map((c) => [...c]),
    arrayIndex: -1,
    explanation: `Complete: ${combos.length} total combinations`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function CartesianNArraysViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arrays, combos, arrayIndex, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Cartesian Product of N Arrays</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Arrays */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Input Arrays</h3>
          <div className="space-y-2">
            {arrays.map((arr, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <span className="text-zinc-500 text-xs w-12">Array {idx + 1}:</span>
                <div className="flex gap-2">
                  {arr.map((val, i) => (
                    <div
                      key={i}
                      className={`w-12 h-12 rounded-lg flex items-center justify-center font-mono text-sm font-semibold border-2 ${
                        idx === arrayIndex
                          ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                      }`}
                    >
                      {String(val)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Combinations */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Combinations</h3>
          <div className="flex gap-2 flex-wrap">
            {combos.length === 0 ? (
              <div className="text-zinc-500 text-sm">Empty</div>
            ) : (
              combos.map((combo, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 rounded-lg bg-green-500/20 border-2 border-green-500 flex items-center gap-1 font-mono text-xs text-green-400"
                >
                  [{combo.map((v) => String(v)).join(', ')}]
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
