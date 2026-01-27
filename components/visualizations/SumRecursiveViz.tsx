'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [1, 2, 3, 4, 5];

interface SumStep {
  arr: number[];
  result: number;
  depth: number;
  explanation: string;
}

function computeSteps(): SumStep[] {
  const steps: SumStep[] = [];

  function sumRecursive(arr: number[], currentDepth: number): number {
    if (arr.length === 0) {
      steps.push({
        arr: [],
        result: 0,
        depth: currentDepth,
        explanation: `Base case: empty array → return 0`,
      });
      return 0;
    }

    const first = arr[0];
    const rest = arr.slice(1);
    steps.push({
      arr: [...arr],
      result: 0,
      depth: currentDepth,
      explanation: `Depth ${currentDepth}: sum([${arr.join(', ')}]) = ${first} + sum([${rest.join(', ')}])`,
    });

    const restSum = sumRecursive(rest, currentDepth + 1);
    const total = first + restSum;

    steps.push({
      arr: [...arr],
      result: total,
      depth: currentDepth,
      explanation: `Depth ${currentDepth}: ${first} + ${restSum} = ${total}`,
    });

    return total;
  }

  steps.push({
    arr: [...ARRAY],
    result: 0,
    depth: 0,
    explanation: `Start: Sum array [${ARRAY.join(', ')}] recursively`,
  });

  const finalSum = sumRecursive(ARRAY, 0);

  steps.push({
    arr: [...ARRAY],
    result: finalSum,
    depth: 0,
    explanation: `Complete: Total sum = ${finalSum}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function SumRecursiveViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, result, depth, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Sum Array (Recursive)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        {depth > 0 && <p className="text-zinc-400 text-xs mt-1">Recursion depth: {depth}</p>}
      </div>

      <div className="space-y-6">
        {/* Current Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Current Array</h3>
          <div className="flex gap-2 flex-wrap">
            {arr.length === 0 ? (
              <div className="text-zinc-500 text-sm">Empty (base case)</div>
            ) : (
              arr.map((val, idx) => (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                    idx === 0
                      ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  {val}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Result */}
        {result > 0 && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Running Sum</h3>
            <div className="p-4 bg-zinc-800 rounded-lg">
              <div className="text-2xl font-bold text-green-400 font-mono">{result}</div>
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
