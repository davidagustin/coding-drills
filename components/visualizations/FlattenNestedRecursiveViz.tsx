'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const INPUT: (number | unknown)[] = [1, [2, [3, [4]]]];

interface FlattenNestedRecursiveStep {
  input: unknown;
  result: number[];
  currentPath: string[];
  explanation: string;
}

function computeSteps(): FlattenNestedRecursiveStep[] {
  const steps: FlattenNestedRecursiveStep[] = [];
  const result: number[] = [];
  const path: string[] = [];

  steps.push({
    input: INPUT,
    result: [],
    currentPath: [],
    explanation: `Start: Flatten nested array recursively`,
  });

  function flatten(elements: unknown[], currentPath: string[]): void {
    path.push(...currentPath);
    steps.push({
      input: elements,
      result: [...result],
      currentPath: [...path],
      explanation: `Processing: ${currentPath.length === 0 ? 'root' : currentPath.join('.')} (array with ${elements.length} elements)`,
    });

    for (let i = 0; i < elements.length; i++) {
      const item = elements[i];
      const itemPath = [...currentPath, `[${i}]`];

      if (Array.isArray(item)) {
        steps.push({
          input: item,
          result: [...result],
          currentPath: [...path, `[${i}]`],
          explanation: `Element [${i}] is an array, recursing into it`,
        });
        flatten(item, itemPath);
      } else {
        result.push(item as number);
        steps.push({
          input: item,
          result: [...result],
          currentPath: [...path, `[${i}]`],
          explanation: `Element [${i}] is primitive (${item}), adding to result`,
        });
      }
    }

    path.pop();
  }

  flatten(INPUT, []);

  steps.push({
    input: INPUT,
    result: [...result],
    currentPath: [],
    explanation: `Complete: Flattened array = [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function FlattenNestedRecursiveViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { input, result, currentPath, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Flatten Nested Arrays Recursively</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        {currentPath.length > 0 && (
          <p className="text-cyan-400 text-sm mt-1">Path: {currentPath.join('.') || 'root'}</p>
        )}
      </div>

      <div className="space-y-6">
        {/* Input */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Input (Nested Array)</h3>
          <div className="p-4 bg-zinc-800 rounded-lg font-mono text-sm text-zinc-300">
            <pre>{JSON.stringify(input, null, 2)}</pre>
          </div>
        </div>

        {/* Result */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Result (Flattened)</h3>
          <div className="flex gap-2 flex-wrap">
            {result.length === 0 ? (
              <span className="text-zinc-500">(empty)</span>
            ) : (
              result.map((val, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-green-500/20 border-2 border-green-500 rounded-lg font-mono text-sm font-semibold text-green-400"
                >
                  {val}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
