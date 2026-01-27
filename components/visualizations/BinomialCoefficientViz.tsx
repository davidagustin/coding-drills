'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const N = 5;
const K = 2;

interface BinomialStep {
  n: number;
  k: number;
  step: number;
  result: number;
  numerator: number;
  denominator: number;
  explanation: string;
}

function computeSteps(): BinomialStep[] {
  const steps: BinomialStep[] = [];
  const n: number = N;
  const k: number = K;
  let result = 1;

  steps.push({
    n,
    k,
    step: -1,
    result: 0,
    numerator: 0,
    denominator: 0,
    explanation: `Start: Calculate C(${n}, ${k}) = ${n} choose ${k}`,
  });

  if (k > n) {
    steps.push({
      n,
      k,
      step: -1,
      result: 0,
      numerator: 0,
      denominator: 0,
      explanation: `k > n → return 0`,
    });
    return steps;
  }

  if (k === 0) {
    steps.push({
      n,
      k,
      step: -1,
      result: 1,
      numerator: 0,
      denominator: 0,
      explanation: `k === 0 → return 1`,
    });
    return steps;
  }

  if (k === n) {
    steps.push({
      n,
      k,
      step: -1,
      result: 1,
      numerator: 0,
      denominator: 0,
      explanation: `k === n → return 1`,
    });
    return steps;
  }

  for (let step = 0; step < k; step++) {
    const numerator = n - step;
    const denominator = step + 1;
    result = (result * numerator) / denominator;
    steps.push({
      n,
      k,
      step,
      result,
      numerator,
      denominator,
      explanation: `Step ${step + 1}: result = result * (${numerator}) / (${denominator}) = ${result}`,
    });
  }

  steps.push({
    n,
    k,
    step: -1,
    result,
    numerator: 0,
    denominator: 0,
    explanation: `Complete: C(${n}, ${k}) = ${result}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function BinomialCoefficientViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { n, k, step: currentStepNum, result, numerator, denominator, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Binomial Coefficient</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Parameters */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-400 mb-1">n</div>
            <div className="text-2xl font-bold text-blue-400">{n}</div>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-400 mb-1">k</div>
            <div className="text-2xl font-bold text-purple-400">{k}</div>
          </div>
        </div>

        {/* Current Calculation */}
        {currentStepNum >= 0 && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Current Step</h3>
            <div className="p-4 bg-zinc-800 rounded-lg">
              <div className="text-white font-mono">
                result = result * ({numerator}) / ({denominator})
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Result</h3>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-2xl font-bold text-green-400 font-mono">
              C({n}, {k}) = {result}
            </div>
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
