'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const X = 16;

interface SqrtStep {
  x: number;
  left: number;
  right: number;
  mid: number;
  midSquared: number;
  result: number;
  explanation: string;
}

function computeSteps(): SqrtStep[] {
  const steps: SqrtStep[] = [];

  if (X < 2) {
    steps.push({
      x: X,
      left: 0,
      right: X,
      mid: X,
      midSquared: X * X,
      result: X,
      explanation: `x < 2 → sqrt(${X}) = ${X}`,
    });
    return steps;
  }

  let left = 0;
  let right = X;
  let result = 0;

  steps.push({
    x: X,
    left,
    right,
    mid: 0,
    midSquared: 0,
    result: 0,
    explanation: `Start: Binary search for sqrt(${X})`,
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midSquared = mid * mid;

    steps.push({
      x: X,
      left,
      right,
      mid,
      midSquared,
      result,
      explanation: `Check mid = ${mid}, ${mid}² = ${midSquared}`,
    });

    if (midSquared === X) {
      result = mid;
      steps.push({
        x: X,
        left,
        right,
        mid,
        midSquared,
        result,
        explanation: `${mid}² = ${X} → sqrt(${X}) = ${mid}`,
      });
      break;
    } else if (midSquared < X) {
      result = mid;
      left = mid + 1;
      steps.push({
        x: X,
        left,
        right,
        mid,
        midSquared,
        result,
        explanation: `${mid}² < ${X} → search right, update result = ${mid}`,
      });
    } else {
      right = mid - 1;
      steps.push({
        x: X,
        left,
        right,
        mid,
        midSquared,
        result,
        explanation: `${mid}² > ${X} → search left`,
      });
    }
  }

  steps.push({
    x: X,
    left,
    right,
    mid: result,
    midSquared: result * result,
    result,
    explanation: `Complete: sqrt(${X}) = ${result}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function SqrtViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { x, left, right, mid, midSquared, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Square Root (Binary Search)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Result: {result}</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-zinc-800 rounded-lg text-center">
            <p className="text-zinc-400 text-sm mb-2">x</p>
            <p className="text-xl font-bold text-white">{x}</p>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg text-center">
            <p className="text-zinc-400 text-sm mb-2">Left</p>
            <p className="text-xl font-bold text-white">{left}</p>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg text-center">
            <p className="text-zinc-400 text-sm mb-2">Right</p>
            <p className="text-xl font-bold text-white">{right}</p>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg text-center">
            <p className="text-zinc-400 text-sm mb-2">Mid</p>
            <p className="text-xl font-bold text-white">{mid}</p>
          </div>
        </div>

        <div className="p-6 bg-zinc-950 rounded-lg border border-zinc-800">
          <div className="text-center">
            <p className="text-white text-lg mb-2">
              Checking: {mid}² = {midSquared}
            </p>
            <p className="text-white text-2xl font-mono">
              √{x} = {result || '...'}
            </p>
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
