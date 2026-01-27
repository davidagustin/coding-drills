'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// Pre-populated Fenwick tree for demonstration
const TREE = [0, 1, 3, 2, 10, 4];
const QUERIES = [5, 3, 1];

interface FenwickTreeQueryStep {
  tree: number[];
  queryIndex: number;
  currentIndex: number;
  sum: number;
  explanation: string;
}

function computeSteps(): FenwickTreeQueryStep[] {
  const steps: FenwickTreeQueryStep[] = [];

  for (const queryIdx of QUERIES) {
    steps.push({
      tree: [...TREE],
      queryIndex: queryIdx,
      currentIndex: queryIdx,
      sum: 0,
      explanation: `Query: Compute prefix sum from index 1 to ${queryIdx}`,
    });

    let sum = 0;
    let currentIndex = queryIdx;
    while (currentIndex > 0) {
      sum += TREE[currentIndex];
      const nextIndex = currentIndex - (currentIndex & -currentIndex);
      steps.push({
        tree: [...TREE],
        queryIndex: queryIdx,
        currentIndex,
        sum,
        explanation: `Add tree[${currentIndex}] = ${TREE[currentIndex]} to sum. Sum = ${sum}. Next: ${currentIndex} - (${currentIndex} & -${currentIndex}) = ${nextIndex}`,
      });
      if (nextIndex <= 0) break;
      currentIndex = nextIndex;
    }

    steps.push({
      tree: [...TREE],
      queryIndex: queryIdx,
      currentIndex: 0,
      sum,
      explanation: `Result: Prefix sum[1..${queryIdx}] = ${sum}`,
    });
  }

  steps.push({
    tree: [...TREE],
    queryIndex: -1,
    currentIndex: -1,
    sum: 0,
    explanation: `Complete: All queries processed`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function FenwickTreeQueryViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { tree, queryIndex, currentIndex, sum, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Fenwick Tree: Prefix Sum Query</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        {sum > 0 && <p className="text-green-400 font-semibold mt-2">Current Sum: {sum}</p>}
      </div>

      <div className="space-y-6">
        {/* Tree Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Fenwick Tree (1-indexed)</h3>
          <div className="flex gap-2 flex-wrap">
            {tree.map((val, idx) => {
              const isCurrent = idx === currentIndex && currentIndex !== -1;
              const isQueryTarget = idx <= queryIndex && queryIndex !== -1 && idx > 0;
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-sm font-semibold border-2 ${
                    isCurrent
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : isQueryTarget
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : idx === 0
                          ? 'bg-zinc-700 border-zinc-600 text-zinc-500'
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
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
