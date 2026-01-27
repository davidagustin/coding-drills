'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const PERM = [2, 1, 3];

interface PermutationRankStep {
  perm: number[];
  index: number;
  smallerCount: number;
  factorial: number;
  contribution: number;
  rank: number;
  explanation: string;
}

function factorial(n: number): number {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function computeSteps(): PermutationRankStep[] {
  const steps: PermutationRankStep[] = [];
  let rank = 0;

  steps.push({
    perm: [...PERM],
    index: -1,
    smallerCount: 0,
    factorial: 0,
    contribution: 0,
    rank: 0,
    explanation: `Start: Find 1-based rank of permutation [${PERM.join(', ')}]`,
  });

  for (let i = 0; i < PERM.length; i++) {
    let smallerCount = 0;
    for (let j = i + 1; j < PERM.length; j++) {
      if (PERM[j] < PERM[i]) {
        smallerCount++;
        steps.push({
          perm: [...PERM],
          index: i,
          smallerCount,
          factorial: 0,
          contribution: 0,
          rank,
          explanation: `Position ${i}: Found ${PERM[j]} < ${PERM[i]}, smallerCount = ${smallerCount}`,
        });
      }
    }

    const fact = factorial(PERM.length - 1 - i);
    const contribution = smallerCount * fact;
    rank += contribution;

    steps.push({
      perm: [...PERM],
      index: i,
      smallerCount,
      factorial: fact,
      contribution,
      rank,
      explanation: `Position ${i}: ${smallerCount} smaller elements × ${fact}! = ${contribution}, rank += ${contribution} = ${rank}`,
    });
  }

  const finalRank = rank + 1;
  steps.push({
    perm: [...PERM],
    index: -1,
    smallerCount: 0,
    factorial: 0,
    contribution: 0,
    rank: finalRank,
    explanation: `Complete: 1-based rank = ${finalRank}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function PermutationRankViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const {
    perm,
    index,
    smallerCount,
    factorial: fact,
    contribution,
    rank,
    explanation,
  } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Permutation Rank (1-based)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        {rank > 0 && <p className="text-green-400 font-semibold mt-2">Current Rank: {rank}</p>}
      </div>

      <div className="space-y-6">
        {/* Permutation */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Permutation</h3>
          <div className="flex gap-2 flex-wrap">
            {perm.map((val, idx) => {
              const isCurrent = idx === index && index !== -1;
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-sm font-semibold border-2 ${
                    isCurrent
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  <span className="text-xs text-zinc-500">{idx}</span>
                  <span className="text-lg">{val}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Calculation */}
        {index !== -1 && (
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-sm text-zinc-400 mb-2">Calculation for position {index}:</p>
            <p className="font-mono text-cyan-400">
              smallerCount = {smallerCount}, factorial({perm.length - 1 - index}) = {fact}
            </p>
            <p className="font-mono text-green-400 mt-2">
              contribution = {smallerCount} × {fact} = {contribution}
            </p>
          </div>
        )}
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
