'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [2, 4, 1, 3, 5];

interface InversionStep {
  left: number[];
  right: number[];
  merged: number[];
  inversions: number;
  explanation: string;
}

function computeSteps(): InversionStep[] {
  const steps: InversionStep[] = [];
  let totalInversions = 0;

  function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    const merged: number[] = [];
    let i = 0;
    let j = 0;
    let inversions = 0;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        merged.push(left[i++]);
      } else {
        inversions += left.length - i;
        steps.push({
          left: [...left],
          right: [...right],
          merged: [...merged],
          inversions: inversions,
          explanation: `left[${i}]=${left[i]} > right[${j}]=${right[j]} → ${left.length - i} inversions`,
        });
        merged.push(right[j++]);
      }
    }

    while (i < left.length) merged.push(left[i++]);
    while (j < right.length) merged.push(right[j++]);

    totalInversions += inversions;
    return merged;
  }

  mergeSort([...ARRAY]);

  steps.push({
    left: [],
    right: [],
    merged: [],
    inversions: totalInversions,
    explanation: `Total inversions: ${totalInversions}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  left: '#3b82f6',
  right: '#f97316',
  inversion: '#ef4444',
  merged: '#22c55e',
} as const;

export default function CountInversionsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Count Inversions</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Total Inversions: {currentStep.inversions}
          </p>
        )}
      </div>

      {currentStep.left.length > 0 && (
        <div className="mb-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-2">Left:</h3>
            <div className="flex gap-2">
              {currentStep.left.map((val, idx) => (
                <div
                  key={idx}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: `${COLORS.left}40`,
                    borderColor: COLORS.left,
                  }}
                >
                  {val}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-2">Right:</h3>
            <div className="flex gap-2">
              {currentStep.right.map((val, idx) => (
                <div
                  key={idx}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: `${COLORS.right}40`,
                    borderColor: COLORS.right,
                  }}
                >
                  {val}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <VizControls controls={controls} accentColor={COLORS.inversion} />
    </div>
  );
}
