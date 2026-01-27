'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ITEMS = [1, 2, 3];

interface PowerSetBitmaskStep {
  items: number[];
  mask: number;
  subset: number[];
  result: number[][];
  explanation: string;
}

function computeSteps(): PowerSetBitmaskStep[] {
  const steps: PowerSetBitmaskStep[] = [];
  const result: number[][] = [];
  const length = ITEMS.length;
  const total = 1 << length; // 2^n

  steps.push({
    items: [...ITEMS],
    mask: -1,
    subset: [],
    result: [],
    explanation: `Start: Generate power set using bitmask (${length} items = ${total} subsets)`,
  });

  for (let mask = 0; mask < total; mask++) {
    const subset: number[] = [];

    steps.push({
      items: [...ITEMS],
      mask,
      subset: [],
      result: [...result],
      explanation: `Mask ${mask} (binary: ${mask.toString(2).padStart(length, '0')}): Building subset`,
    });

    for (let j = 0; j < length; j++) {
      if (mask & (1 << j)) {
        subset.push(ITEMS[j]);
        steps.push({
          items: [...ITEMS],
          mask,
          subset: [...subset],
          result: [...result],
          explanation: `Bit ${j} is set: include items[${j}] = ${ITEMS[j]}, subset = [${subset.join(', ')}]`,
        });
      } else {
        steps.push({
          items: [...ITEMS],
          mask,
          subset: [...subset],
          result: [...result],
          explanation: `Bit ${j} is not set: skip items[${j}] = ${ITEMS[j]}`,
        });
      }
    }

    result.push([...subset]);
    steps.push({
      items: [...ITEMS],
      mask,
      subset: [...subset],
      result: [...result],
      explanation: `Mask ${mask} → subset [${subset.join(', ')}]`,
    });
  }

  steps.push({
    items: [...ITEMS],
    mask: -1,
    subset: [],
    result: [...result],
    explanation: `Complete: Generated ${result.length} subsets`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function PowerSetBitmaskViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { items, mask, subset, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Power Set via Bitmask</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        {mask !== -1 && (
          <p className="text-cyan-400 text-sm mt-1">
            Mask: {mask} (binary: {mask.toString(2).padStart(items.length, '0')})
          </p>
        )}
      </div>

      <div className="space-y-6">
        {/* Items */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Items</h3>
          <div className="flex gap-2 flex-wrap">
            {items.map((val, idx) => {
              const isIncluded = mask !== -1 && (mask & (1 << idx)) !== 0;
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-sm font-semibold border-2 ${
                    isIncluded
                      ? 'bg-green-500/20 border-green-500 text-green-400'
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

        {/* Current Subset */}
        {mask !== -1 && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Current Subset</h3>
            {subset.length === 0 ? (
              <div className="p-4 bg-zinc-800 rounded-lg text-center text-zinc-500">(empty)</div>
            ) : (
              <div className="flex gap-2 flex-wrap">
                {subset.map((val, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 bg-cyan-500/20 border-2 border-cyan-500 rounded-lg font-mono text-sm font-semibold text-cyan-400"
                  >
                    {val}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {result.length > 0 && mask === -1 && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">
              All Subsets ({result.length})
            </h3>
            <div className="flex gap-2 flex-wrap">
              {result.map((sub, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1 bg-green-500/20 border-2 border-green-500 rounded-lg font-mono text-xs font-semibold text-green-400"
                >
                  [{sub.join(', ')}]
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
