'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [1, 2, 3, 4];

interface PrefixProductStep {
  arr: number[];
  leftProducts: number[];
  rightProducts: number[];
  result: number[];
  phase: 'left' | 'right' | 'complete';
  i: number;
  explanation: string;
}

function computeSteps(): PrefixProductStep[] {
  const steps: PrefixProductStep[] = [];
  const result: number[] = new Array(ARRAY.length).fill(1);
  const leftProducts: number[] = [];
  const rightProducts: number[] = [];

  steps.push({
    arr: [...ARRAY],
    leftProducts: [],
    rightProducts: [],
    result: [...result],
    phase: 'left',
    i: -1,
    explanation: `Start: Product except self (two-pass approach)`,
  });

  // Left pass
  let runningLeft = 1;
  for (let i = 0; i < ARRAY.length; i++) {
    result[i] = runningLeft;
    leftProducts.push(runningLeft);
    runningLeft *= ARRAY[i];
    steps.push({
      arr: [...ARRAY],
      leftProducts: [...leftProducts],
      rightProducts: [],
      result: [...result],
      phase: 'left',
      i,
      explanation: `Left pass ${i}: result[${i}] = ${result[i]} (product of left elements)`,
    });
  }

  // Right pass
  let runningRight = 1;
  for (let i = ARRAY.length - 1; i >= 0; i--) {
    result[i] *= runningRight;
    rightProducts.unshift(runningRight);
    runningRight *= ARRAY[i];
    steps.push({
      arr: [...ARRAY],
      leftProducts: [...leftProducts],
      rightProducts: [...rightProducts],
      result: [...result],
      phase: 'right',
      i,
      explanation: `Right pass ${i}: result[${i}] *= ${rightProducts[0]} → ${result[i]}`,
    });
  }

  steps.push({
    arr: [...ARRAY],
    leftProducts: [...leftProducts],
    rightProducts: [...rightProducts],
    result: [...result],
    phase: 'complete',
    i: -1,
    explanation: `Complete: Result = [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function PrefixProductViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, result, phase, i, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Product of Array Except Self</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        <p className="text-zinc-400 text-xs mt-1">
          Phase: {phase === 'left' ? 'Left Pass' : phase === 'right' ? 'Right Pass' : 'Complete'}
        </p>
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

        {/* Result Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Result Array</h3>
          <div className="flex gap-2 flex-wrap">
            {result.map((val, idx) => (
              <div
                key={idx}
                className="w-20 h-16 rounded-lg bg-green-500/20 border-2 border-green-500 flex items-center justify-center font-mono text-lg font-semibold text-green-400"
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
