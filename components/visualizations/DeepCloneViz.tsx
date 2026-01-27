'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const INPUT = { a: 1, b: { c: 2, d: [3, 4] } };

interface DeepCloneStep {
  original: unknown;
  cloned: unknown;
  currentPath: string[];
  explanation: string;
}

function computeSteps(): DeepCloneStep[] {
  const steps: DeepCloneStep[] = [];
  const path: string[] = [];

  steps.push({
    original: INPUT,
    cloned: null,
    currentPath: [],
    explanation: `Start: Deep clone object with nested structure`,
  });

  function deepClone(value: unknown, currentPath: string[]): unknown {
    path.push(...currentPath);
    steps.push({
      original: value,
      cloned: null,
      currentPath: [...path],
      explanation: `Processing: ${currentPath.length === 0 ? 'root' : currentPath.join('.')} (${typeof value === 'object' && value !== null ? (Array.isArray(value) ? 'array' : 'object') : 'primitive'})`,
    });

    if (value === null || typeof value !== 'object') {
      path.pop();
      steps.push({
        original: value,
        cloned: value,
        currentPath: [...path],
        explanation: `Primitive/null: Return directly (${JSON.stringify(value)})`,
      });
      return value;
    }

    if (Array.isArray(value)) {
      const clonedArray: unknown[] = [];
      steps.push({
        original: value,
        cloned: clonedArray,
        currentPath: [...path],
        explanation: `Array detected: Create new array and clone each element`,
      });
      value.forEach((item, idx) => {
        clonedArray.push(deepClone(item, [...currentPath, `[${idx}]`]));
      });
      path.pop();
      steps.push({
        original: value,
        cloned: clonedArray,
        currentPath: [...path],
        explanation: `Array cloned: ${clonedArray.length} elements`,
      });
      return clonedArray;
    }

    // Plain object
    const clonedObject: Record<string, unknown> = {};
    steps.push({
      original: value,
      cloned: clonedObject,
      currentPath: [...path],
      explanation: `Object detected: Create new object and clone each property`,
    });
    for (const key in value as Record<string, unknown>) {
      if (Object.hasOwn(value, key)) {
        clonedObject[key] = deepClone((value as Record<string, unknown>)[key], [
          ...currentPath,
          key,
        ]);
      }
    }
    path.pop();
    steps.push({
      original: value,
      cloned: clonedObject,
      currentPath: [...path],
      explanation: `Object cloned: ${Object.keys(clonedObject).length} properties`,
    });
    return clonedObject;
  }

  const result = deepClone(INPUT, []);
  steps.push({
    original: INPUT,
    cloned: result,
    currentPath: [],
    explanation: `Complete: Deep clone finished, all nested structures cloned independently`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function DeepCloneViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { original, cloned, currentPath, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Deep Clone Object/Array</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        {currentPath.length > 0 && (
          <p className="text-cyan-400 text-sm mt-1">Path: {currentPath.join('.') || 'root'}</p>
        )}
      </div>

      <div className="space-y-6">
        {/* Original */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Original</h3>
          <div className="p-4 bg-zinc-800 rounded-lg font-mono text-sm text-zinc-300">
            <pre>{JSON.stringify(original, null, 2)}</pre>
          </div>
        </div>

        {/* Cloned */}
        {cloned !== null && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Cloned</h3>
            <div className="p-4 bg-zinc-800 rounded-lg font-mono text-sm text-green-400">
              <pre>{JSON.stringify(cloned, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
