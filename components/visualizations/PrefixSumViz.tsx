'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [1, 2, 3, 4];

interface PrefixSumStep {
  arr: number[];
  prefix: number[];
  i: number;
  explanation: string;
}

function computeSteps(): PrefixSumStep[] {
  const steps: PrefixSumStep[] = [];
  const prefix: number[] = [];

  steps.push({
    arr: [...ARRAY],
    prefix: [],
    i: -1,
    explanation: `Start: Build prefix sum array`,
  });

  if (ARRAY.length > 0) {
    prefix.push(ARRAY[0]);
    steps.push({
      arr: [...ARRAY],
      prefix: [...prefix],
      i: 0,
      explanation: `Index 0: prefix[0] = arr[0] = ${ARRAY[0]}`,
    });

    for (let i = 1; i < ARRAY.length; i++) {
      prefix.push(prefix[i - 1] + ARRAY[i]);
      steps.push({
        arr: [...ARRAY],
        prefix: [...prefix],
        i,
        explanation: `Index ${i}: prefix[${i}] = prefix[${i - 1}] + arr[${i}] = ${prefix[i - 1]} + ${ARRAY[i]} = ${prefix[i]}`,
      });
    }
  }

  steps.push({
    arr: [...ARRAY],
    prefix: [...prefix],
    i: -1,
    explanation: `Complete: Prefix sum = [${prefix.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function PrefixSumViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, prefix, i, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Build Prefix Sum Array</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Original Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Original Array</h3>
          <div className="flex gap-2 flex-wrap">
            {arr.map((val, idx) => {
              const isCurrent = idx === i;
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                    isCurrent
                      ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  {val}
                </div>
              );
            })}
          </div>
        </div>

        {/* Prefix Sum Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Prefix Sum Array</h3>
          <div className="flex gap-2 flex-wrap">
            {prefix.length === 0 ? (
              <div className="text-zinc-500 text-sm">Empty</div>
            ) : (
              prefix.map((val, idx) => (
                <div
                  key={idx}
                  className="w-20 h-16 rounded-lg bg-green-500/20 border-2 border-green-500 flex items-center justify-center font-mono text-lg font-semibold text-green-400"
                >
                  {val}
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
