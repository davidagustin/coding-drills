'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const VALUE = 7;

interface CountBitsStep {
  value: number;
  binary: string;
  count: number;
  explanation: string;
}

function computeSteps(): CountBitsStep[] {
  const steps: CountBitsStep[] = [];
  let remaining = VALUE;
  let count = 0;

  steps.push({
    value: VALUE,
    binary: VALUE.toString(2),
    count: 0,
    explanation: `Start: Count set bits in ${VALUE} (binary: ${VALUE.toString(2)})`,
  });

  while (remaining !== 0) {
    const prev = remaining;
    remaining = remaining & (remaining - 1);
    count++;
    steps.push({
      value: remaining,
      binary: remaining.toString(2),
      count,
      explanation: `Iteration ${count}: ${prev} & (${prev} - 1) = ${prev} & ${prev - 1} = ${remaining}, count = ${count}`,
    });
  }

  steps.push({
    value: 0,
    binary: '0',
    count,
    explanation: `Complete: ${VALUE} has ${count} set bits`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function CountBitsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { value, binary, count, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Count Set Bits (Brian Kernighan)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Current Value */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Current Value</h3>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-2xl font-bold text-blue-400 font-mono">{value}</div>
            <div className="text-zinc-400 text-sm mt-1">Binary: {binary}</div>
          </div>
        </div>

        {/* Count */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Set Bits Count</h3>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-2xl font-bold text-green-400 font-mono">{count}</div>
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
