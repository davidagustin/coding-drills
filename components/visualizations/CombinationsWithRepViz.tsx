'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ITEMS = [1, 2, 3];
const SIZE = 2;

interface CombinationsWithRepStep {
  items: number[];
  size: number;
  start: number;
  current: number[];
  result: number[][];
  explanation: string;
}

function computeSteps(): CombinationsWithRepStep[] {
  const steps: CombinationsWithRepStep[] = [];
  const result: number[][] = [];

  steps.push({
    items: [...ITEMS],
    size: SIZE,
    start: 0,
    current: [],
    result: [...result],
    explanation: `Start: Generate combinations with repetition of size ${SIZE} from [${ITEMS.join(', ')}]`,
  });

  function backtrack(start: number, current: number[]): void {
    if (current.length === SIZE) {
      result.push([...current]);
      steps.push({
        items: [...ITEMS],
        size: SIZE,
        start,
        current: [...current],
        result: [...result],
        explanation: `Found combination: [${current.join(', ')}]`,
      });
      return;
    }

    for (let i = start; i < ITEMS.length; i++) {
      steps.push({
        items: [...ITEMS],
        size: SIZE,
        start: i,
        current: [...current],
        result: [...result],
        explanation: `Try item[${i}] = ${ITEMS[i]} (start=${i} allows repetition)`,
      });

      current.push(ITEMS[i]);
      steps.push({
        items: [...ITEMS],
        size: SIZE,
        start: i,
        current: [...current],
        result: [...result],
        explanation: `Add ${ITEMS[i]}: current = [${current.join(', ')}]`,
      });

      backtrack(i, current);

      current.pop();
      steps.push({
        items: [...ITEMS],
        size: SIZE,
        start: i,
        current: [...current],
        result: [...result],
        explanation: `Backtrack: remove ${ITEMS[i]}`,
      });
    }
  }

  backtrack(0, []);

  steps.push({
    items: [...ITEMS],
    size: SIZE,
    start: -1,
    current: [],
    result: [...result],
    explanation: `Complete: Found ${result.length} combinations with repetition`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function CombinationsWithRepViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { items, size, start, current, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Combinations with Repetition</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Items */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Items</h3>
          <div className="flex gap-2 flex-wrap">
            {items.map((item, idx) => {
              const isCurrent = idx === start && start !== -1;
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
                  <span className="text-lg">{item}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Combination */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">
            Current Combination (target size: {size})
          </h3>
          {current.length === 0 ? (
            <div className="p-4 bg-zinc-800 rounded-lg text-center text-zinc-500">(empty)</div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {current.map((val, idx) => (
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

        {/* Results */}
        {result.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">
              Found Combinations ({result.length})
            </h3>
            <div className="flex gap-2 flex-wrap">
              {result.map((comb, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-green-500/20 border-2 border-green-500 rounded-lg font-mono text-sm font-semibold text-green-400"
                >
                  [{comb.join(', ')}]
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
