'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const N = 4;

interface DerangementsCountStep {
  n: number;
  twoBack: number;
  oneBack: number;
  current: number;
  explanation: string;
}

function computeSteps(): DerangementsCountStep[] {
  const steps: DerangementsCountStep[] = [];

  // N is 4, so we skip the edge case checks
  let twoBack = 1; // D(0)
  let oneBack = 0; // D(1)

  steps.push({
    n: 0,
    twoBack: 1,
    oneBack: 0,
    current: 1,
    explanation: `Base cases: D(0) = ${twoBack}, D(1) = ${oneBack}`,
  });

  for (let i = 2; i <= N; i++) {
    const current = (i - 1) * (oneBack + twoBack);
    steps.push({
      n: i,
      twoBack,
      oneBack,
      current,
      explanation: `D(${i}) = (${i} - 1) × (D(${i - 1}) + D(${i - 2})) = ${i - 1} × (${oneBack} + ${twoBack}) = ${i - 1} × ${oneBack + twoBack} = ${current}`,
    });
    twoBack = oneBack;
    oneBack = current;
  }

  steps.push({
    n: N,
    twoBack: 0,
    oneBack: 0,
    current: oneBack,
    explanation: `Complete: D(${N}) = ${oneBack}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function DerangementsCountViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { n, twoBack, oneBack, current, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Count Derangements</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Values */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Values</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-zinc-800 rounded-lg border-2 border-zinc-700">
              <div className="text-xs text-zinc-500 mb-1">D(n-2)</div>
              <div className="text-2xl font-mono font-bold text-yellow-400">{twoBack}</div>
            </div>
            <div className="p-4 bg-zinc-800 rounded-lg border-2 border-zinc-700">
              <div className="text-xs text-zinc-500 mb-1">D(n-1)</div>
              <div className="text-2xl font-mono font-bold text-green-400">{oneBack}</div>
            </div>
            <div className="p-4 bg-zinc-800 rounded-lg border-2 border-blue-500">
              <div className="text-xs text-zinc-500 mb-1">D({n})</div>
              <div className="text-2xl font-mono font-bold text-blue-400">{current}</div>
            </div>
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
