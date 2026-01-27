'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ITEMS = [1, 2, 3, 4, 5];
const EXCLUDE_ITEMS = [2, 4];

interface DifferenceStep {
  items: number[];
  excludeItems: number[];
  exclusionSet: Set<number>;
  result: number[];
  currentIndex: number;
  explanation: string;
}

function computeSteps(): DifferenceStep[] {
  const steps: DifferenceStep[] = [];
  const exclusionSet = new Set(EXCLUDE_ITEMS);
  const result: number[] = [];

  steps.push({
    items: [...ITEMS],
    excludeItems: [...EXCLUDE_ITEMS],
    exclusionSet: new Set(exclusionSet),
    result: [],
    currentIndex: -1,
    explanation: `Start: Find elements in [${ITEMS.join(', ')}] not in [${EXCLUDE_ITEMS.join(', ')}]`,
  });

  steps.push({
    items: [...ITEMS],
    excludeItems: [...EXCLUDE_ITEMS],
    exclusionSet: new Set(exclusionSet),
    result: [],
    currentIndex: -1,
    explanation: `Create exclusion Set: {${[...exclusionSet].join(', ')}} for O(1) lookup`,
  });

  for (let i = 0; i < ITEMS.length; i++) {
    const item = ITEMS[i];
    const inExclusion = exclusionSet.has(item);

    steps.push({
      items: [...ITEMS],
      excludeItems: [...EXCLUDE_ITEMS],
      exclusionSet: new Set(exclusionSet),
      result: [...result],
      currentIndex: i,
      explanation: `Check items[${i}] = ${item}: ${inExclusion ? 'in exclusion set, skip' : 'not in exclusion set, include'}`,
    });

    if (!inExclusion) {
      result.push(item);
      steps.push({
        items: [...ITEMS],
        excludeItems: [...EXCLUDE_ITEMS],
        exclusionSet: new Set(exclusionSet),
        result: [...result],
        currentIndex: i,
        explanation: `Add ${item} to result: [${result.join(', ')}]`,
      });
    }
  }

  steps.push({
    items: [...ITEMS],
    excludeItems: [...EXCLUDE_ITEMS],
    exclusionSet: new Set(exclusionSet),
    result: [...result],
    currentIndex: -1,
    explanation: `Complete: Difference = [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function DifferenceViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { items, excludeItems, exclusionSet, result, currentIndex, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Array Difference</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Items Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Items Array</h3>
          <div className="flex gap-2 flex-wrap">
            {items.map((val, idx) => {
              const isCurrent = idx === currentIndex && currentIndex !== -1;
              const inExclusion = exclusionSet.has(val);
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-sm font-semibold border-2 ${
                    isCurrent
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : inExclusion
                        ? 'bg-red-500/20 border-red-500 text-red-400'
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

        {/* Exclusion Set */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Exclusion Set</h3>
          <div className="flex gap-2 flex-wrap">
            {excludeItems.map((val) => (
              <div
                key={val}
                className="px-4 py-2 bg-red-500/20 border-2 border-red-500 rounded-lg font-mono text-sm font-semibold text-red-400"
              >
                {val}
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Difference Result</h3>
          {result.length === 0 ? (
            <div className="p-4 bg-zinc-800 rounded-lg text-center text-zinc-500">(empty)</div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {result.map((val, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-green-500/20 border-2 border-green-500 rounded-lg font-mono text-sm font-semibold text-green-400"
                >
                  {val}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
