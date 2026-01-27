'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const SIZE = 5;
const UPDATES: Array<[number, number]> = [
  [1, 3],
  [3, 5],
];

interface FenwickTreeUpdateStep {
  tree: number[];
  index: number;
  delta: number;
  currentIndex: number;
  explanation: string;
}

function computeSteps(): FenwickTreeUpdateStep[] {
  const steps: FenwickTreeUpdateStep[] = [];
  const tree: number[] = new Array(SIZE + 1).fill(0);

  steps.push({
    tree: [...tree],
    index: -1,
    delta: 0,
    currentIndex: -1,
    explanation: `Initialize: Fenwick tree (1-indexed) with ${SIZE} elements, all zeros`,
  });

  for (const [idx, delta] of UPDATES) {
    steps.push({
      tree: [...tree],
      index: idx,
      delta,
      currentIndex: idx,
      explanation: `Update: Add ${delta} to index ${idx}`,
    });

    let currentIndex = idx;
    while (currentIndex <= SIZE) {
      tree[currentIndex] += delta;
      const nextIndex = currentIndex + (currentIndex & -currentIndex);
      steps.push({
        tree: [...tree],
        index: idx,
        delta,
        currentIndex,
        explanation: `Update tree[${currentIndex}] += ${delta}. Next: ${currentIndex} + (${currentIndex} & -${currentIndex}) = ${nextIndex}`,
      });
      if (nextIndex > SIZE) break;
      currentIndex = nextIndex;
    }
  }

  steps.push({
    tree: [...tree],
    index: -1,
    delta: 0,
    currentIndex: -1,
    explanation: `Complete: All updates applied`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function FenwickTreeUpdateViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { tree, index, currentIndex, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Fenwick Tree: Point Update</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Tree Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Fenwick Tree (1-indexed)</h3>
          <div className="flex gap-2 flex-wrap">
            {tree.map((val, idx) => {
              const isCurrent = idx === currentIndex && currentIndex !== -1;
              const isTarget = idx === index && index !== -1;
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-sm font-semibold border-2 ${
                    isCurrent
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : isTarget
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
          <p className="text-xs text-zinc-500 mt-2">Index 0 is unused (1-indexed structure)</p>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
