'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const PRICES = [1, 5, 8, 9, 10, 17, 17, 20];
const LENGTH = 4;

interface RodCuttingStep {
  prices: number[];
  length: number;
  dp: number[];
  currentRodLen: number;
  currentCutSize: number;
  bestRevenue: number;
  explanation: string;
}

function computeSteps(): RodCuttingStep[] {
  const steps: RodCuttingStep[] = [];
  const dp: number[] = new Array(LENGTH + 1).fill(0);

  steps.push({
    prices: [...PRICES],
    length: LENGTH,
    dp: [...dp],
    currentRodLen: 0,
    currentCutSize: -1,
    bestRevenue: 0,
    explanation: `Start: Rod cutting problem (length = ${LENGTH}, prices = [${PRICES.join(', ')}])`,
  });

  for (let rodLen = 1; rodLen <= LENGTH; rodLen++) {
    steps.push({
      prices: [...PRICES],
      length: LENGTH,
      dp: [...dp],
      currentRodLen: rodLen,
      currentCutSize: -1,
      bestRevenue: dp[rodLen],
      explanation: `Computing dp[${rodLen}]: maximum revenue for rod of length ${rodLen}`,
    });

    for (let cutSize = 0; cutSize < rodLen && cutSize < PRICES.length; cutSize++) {
      const price = PRICES[cutSize];
      const remainderLen = rodLen - cutSize - 1;
      const revenue = price + dp[remainderLen];
      const bestRevenue = Math.max(dp[rodLen], revenue);

      steps.push({
        prices: [...PRICES],
        length: LENGTH,
        dp: [...dp],
        currentRodLen: rodLen,
        currentCutSize: cutSize,
        bestRevenue,
        explanation: `Try cut size ${cutSize + 1}: price = ${price}, remainder = ${remainderLen}, revenue = ${price} + dp[${remainderLen}] = ${price} + ${dp[remainderLen]} = ${revenue}`,
      });

      dp[rodLen] = bestRevenue;
    }

    steps.push({
      prices: [...PRICES],
      length: LENGTH,
      dp: [...dp],
      currentRodLen: rodLen,
      currentCutSize: -1,
      bestRevenue: dp[rodLen],
      explanation: `dp[${rodLen}] = ${dp[rodLen]} (best revenue for length ${rodLen})`,
    });
  }

  steps.push({
    prices: [...PRICES],
    length: LENGTH,
    dp: [...dp],
    currentRodLen: -1,
    currentCutSize: -1,
    bestRevenue: dp[LENGTH],
    explanation: `Complete: Maximum revenue for rod of length ${LENGTH} = ${dp[LENGTH]}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function RodCuttingViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { prices, dp, currentRodLen, currentCutSize, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Rod Cutting</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Prices */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Prices (index = length - 1)</h3>
          <div className="flex gap-2 flex-wrap">
            {prices.map((price, idx) => {
              const isCurrent = idx === currentCutSize && currentCutSize !== -1;
              return (
                <div
                  key={idx}
                  className={`w-20 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-xs font-semibold border-2 ${
                    isCurrent
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  <span className="text-xs text-zinc-500">len {idx + 1}</span>
                  <span className="text-sm">{price}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* DP Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">
            DP Array (max revenue by length)
          </h3>
          <div className="flex gap-2 flex-wrap">
            {dp.map((val, idx) => {
              const isCurrent = idx === currentRodLen && currentRodLen !== -1;
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-sm font-semibold border-2 ${
                    isCurrent
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  <span className="text-xs text-zinc-500">dp[{idx}]</span>
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
