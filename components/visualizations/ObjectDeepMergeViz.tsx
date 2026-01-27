'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const TARGET = { a: 1, b: { c: 2 } };
const SOURCE = { b: { d: 3 }, e: 4 };

interface ObjectDeepMergeStep {
  target: unknown;
  source: unknown;
  result: unknown;
  path: string[];
  explanation: string;
}

function computeSteps(): ObjectDeepMergeStep[] {
  const steps: ObjectDeepMergeStep[] = [];
  const result: Record<string, unknown> = JSON.parse(JSON.stringify(TARGET));
  const path: string[] = [];

  steps.push({
    target: JSON.parse(JSON.stringify(TARGET)),
    source: JSON.parse(JSON.stringify(SOURCE)),
    result: JSON.parse(JSON.stringify(result)),
    path: [],
    explanation: `Start: Deep merge source into target`,
  });

  function deepMerge(
    target: Record<string, unknown>,
    source: Record<string, unknown>,
    currentPath: string[],
  ): void {
    path.push(...currentPath);

    for (const key in source) {
      if (Object.hasOwn(source, key)) {
        const sourceValue = source[key];
        const targetValue = target[key];
        const keyPath = [...currentPath, key];

        steps.push({
          target: JSON.parse(JSON.stringify(TARGET)),
          source: JSON.parse(JSON.stringify(SOURCE)),
          result: JSON.parse(JSON.stringify(result)),
          path: [...keyPath],
          explanation: `Merge key '${key}' at ${keyPath.join('.')}`,
        });

        if (
          typeof sourceValue === 'object' &&
          sourceValue !== null &&
          !Array.isArray(sourceValue) &&
          typeof targetValue === 'object' &&
          targetValue !== null &&
          !Array.isArray(targetValue)
        ) {
          steps.push({
            target: JSON.parse(JSON.stringify(TARGET)),
            source: JSON.parse(JSON.stringify(SOURCE)),
            result: JSON.parse(JSON.stringify(result)),
            path: [...keyPath],
            explanation: `Both are objects, recursively merge`,
          });
          if (!target[key]) {
            target[key] = {};
          }
          deepMerge(
            target[key] as Record<string, unknown>,
            sourceValue as Record<string, unknown>,
            keyPath,
          );
        } else {
          target[key] = sourceValue;
          steps.push({
            target: JSON.parse(JSON.stringify(TARGET)),
            source: JSON.parse(JSON.stringify(SOURCE)),
            result: JSON.parse(JSON.stringify(result)),
            path: [...keyPath],
            explanation: `Set target['${key}'] = ${JSON.stringify(sourceValue)}`,
          });
        }
      }
    }

    path.pop();
  }

  deepMerge(result, SOURCE, []);

  steps.push({
    target: JSON.parse(JSON.stringify(TARGET)),
    source: JSON.parse(JSON.stringify(SOURCE)),
    result: JSON.parse(JSON.stringify(result)),
    path: [],
    explanation: `Complete: Merged result = ${JSON.stringify(result)}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function ObjectDeepMergeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { target, source, result, path, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Object Deep Merge</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        {path.length > 0 && (
          <p className="text-cyan-400 text-sm mt-1">Path: {path.join('.') || 'root'}</p>
        )}
      </div>

      <div className="space-y-6">
        {/* Target */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Target</h3>
          <div className="p-4 bg-zinc-800 rounded-lg font-mono text-sm text-zinc-300">
            <pre>{JSON.stringify(target, null, 2)}</pre>
          </div>
        </div>

        {/* Source */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Source</h3>
          <div className="p-4 bg-zinc-800 rounded-lg font-mono text-sm text-zinc-300">
            <pre>{JSON.stringify(source, null, 2)}</pre>
          </div>
        </div>

        {/* Result */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Merged Result</h3>
          <div className="p-4 bg-zinc-800 rounded-lg font-mono text-sm text-green-400">
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
