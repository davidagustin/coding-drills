'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ITEMS = [1, 2, 3];
const TRANSFORM = (n: number) => [n, n * 2]; // Returns array

interface FlatMapStep {
  items: number[];
  result: number[];
  currentIndex: number;
  mappedValue: number[] | null;
  explanation: string;
}

function computeSteps(): FlatMapStep[] {
  const steps: FlatMapStep[] = [];
  const result: number[] = [];

  steps.push({
    items: [...ITEMS],
    result: [],
    currentIndex: -1,
    mappedValue: null,
    explanation: `Start: flatMap([${ITEMS.join(', ')}], n => [n, n*2])`,
  });

  for (let i = 0; i < ITEMS.length; i++) {
    const item = ITEMS[i];
    const mapped = TRANSFORM(item);

    steps.push({
      items: [...ITEMS],
      result: [...result],
      currentIndex: i,
      mappedValue: mapped,
      explanation: `Transform items[${i}] = ${item}: [${item}, ${item * 2}]`,
    });

    result.push(...mapped);
    steps.push({
      items: [...ITEMS],
      result: [...result],
      currentIndex: i,
      mappedValue: mapped,
      explanation: `Flatten and add to result: [${result.join(', ')}]`,
    });
  }

  steps.push({
    items: [...ITEMS],
    result: [...result],
    currentIndex: -1,
    mappedValue: null,
    explanation: `Complete: flatMap result = [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function FlatMapViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { items, result, currentIndex, mappedValue, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Implement flatMap</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Items */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Items</h3>
          <div className="flex gap-2 flex-wrap">
            {items.map((val, idx) => {
              const isCurrent = idx === currentIndex && currentIndex !== -1;
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

        {/* Mapped Value */}
        {mappedValue && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Mapped Value</h3>
            <div className="flex gap-2 flex-wrap">
              {mappedValue.map((val, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-cyan-500/20 border-2 border-cyan-500 rounded-lg font-mono text-sm font-semibold text-cyan-400"
                >
                  {val}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Result (Flattened)</h3>
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
