'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY1 = [1, 2];
const ARRAY2 = ['a', 'b'];

interface CartesianStep {
  arr1: number[];
  arr2: string[];
  pairs: [number, string][];
  i: number;
  j: number;
  explanation: string;
}

function computeSteps(): CartesianStep[] {
  const steps: CartesianStep[] = [];
  const pairs: [number, string][] = [];

  steps.push({
    arr1: [...ARRAY1],
    arr2: [...ARRAY2],
    pairs: [],
    i: -1,
    j: -1,
    explanation: `Start: Generate Cartesian product of two arrays`,
  });

  for (let i = 0; i < ARRAY1.length; i++) {
    for (let j = 0; j < ARRAY2.length; j++) {
      pairs.push([ARRAY1[i], ARRAY2[j]]);
      steps.push({
        arr1: [...ARRAY1],
        arr2: [...ARRAY2],
        pairs: [...pairs],
        i,
        j,
        explanation: `Pair arr1[${i}]=${ARRAY1[i]} with arr2[${j}]='${ARRAY2[j]}' → [${ARRAY1[i]}, '${ARRAY2[j]}']`,
      });
    }
  }

  steps.push({
    arr1: [...ARRAY1],
    arr2: [...ARRAY2],
    pairs: [...pairs],
    i: -1,
    j: -1,
    explanation: `Complete: ${pairs.length} pairs generated`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function CartesianProductViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr1, arr2, pairs, i, j, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Cartesian Product of Two Arrays</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Arrays */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Array 1</h3>
            <div className="flex gap-2 flex-wrap">
              {arr1.map((val, idx) => {
                const isCurrent = idx === i;
                return (
                  <div
                    key={idx}
                    className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                      isCurrent
                        ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                    }`}
                  >
                    {val}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Array 2</h3>
            <div className="flex gap-2 flex-wrap">
              {arr2.map((val, idx) => {
                const isCurrent = idx === j;
                return (
                  <div
                    key={idx}
                    className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                      isCurrent
                        ? 'bg-purple-500/20 border-purple-500 text-purple-400'
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

        {/* Pairs */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Cartesian Product Pairs</h3>
          <div className="flex gap-2 flex-wrap">
            {pairs.length === 0 ? (
              <div className="text-zinc-500 text-sm">Empty</div>
            ) : (
              pairs.map((pair, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 rounded-lg bg-green-500/20 border-2 border-green-500 flex items-center gap-2 font-mono text-sm text-green-400"
                >
                  <span className="text-blue-400">[{pair[0]}</span>
                  <span>,</span>
                  <span className="text-purple-400">&apos;{pair[1]}&apos;</span>
                  <span className="text-green-400">]</span>
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
