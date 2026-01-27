'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const N = 4;

interface CatalanNumberStep {
  n: number;
  dp: number[];
  currentI: number;
  currentJ: number;
  explanation: string;
}

function computeSteps(): CatalanNumberStep[] {
  const steps: CatalanNumberStep[] = [];
  const dp: number[] = new Array(N + 1).fill(0);
  dp[0] = 1;

  steps.push({
    n: 0,
    dp: [...dp],
    currentI: -1,
    currentJ: -1,
    explanation: `Initialize: C(0) = 1 (base case)`,
  });

  for (let i = 1; i <= N; i++) {
    steps.push({
      n: i,
      dp: [...dp],
      currentI: i,
      currentJ: -1,
      explanation: `Computing C(${i}): sum of C(j) × C(${i - 1} - j) for j = 0 to ${i - 1}`,
    });

    for (let j = 0; j < i; j++) {
      const contribution = dp[j] * dp[i - 1 - j];
      dp[i] += contribution;
      steps.push({
        n: i,
        dp: [...dp],
        currentI: i,
        currentJ: j,
        explanation: `C(${i}) += C(${j}) × C(${i - 1 - j}) = ${dp[j]} × ${dp[i - 1 - j]} = ${contribution}, total = ${dp[i]}`,
      });
    }
  }

  steps.push({
    n: N,
    dp: [...dp],
    currentI: -1,
    currentJ: -1,
    explanation: `Complete: C(${N}) = ${dp[N]}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function CatalanNumberViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { dp, currentI, currentJ, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Catalan Number</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* DP Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Catalan Numbers (DP Array)</h3>
          <div className="flex gap-2 flex-wrap">
            {dp.map((val, idx) => {
              const isCurrent = idx === currentI && currentI !== -1;
              const isContributing = idx === currentJ && currentJ !== -1;
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-sm font-semibold border-2 ${
                    isCurrent
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : isContributing
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  <span className="text-xs text-zinc-500">C({idx})</span>
                  <span className="text-lg">{val}</span>
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
