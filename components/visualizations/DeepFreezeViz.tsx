'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const INPUT = { a: 1, b: { c: 2, d: [3, 4] } };

interface DeepFreezeStep {
  obj: unknown;
  path: string[];
  frozen: Set<string>;
  explanation: string;
}

function computeSteps(): DeepFreezeStep[] {
  const steps: DeepFreezeStep[] = [];
  const path: string[] = [];
  const frozen = new Set<string>();

  steps.push({
    obj: INPUT,
    path: [],
    frozen: new Set(),
    explanation: `Start: Deep freeze object`,
  });

  function deepFreeze(obj: Record<string, unknown>, currentPath: string[]): void {
    path.push(...currentPath);
    Object.freeze(obj);
    const key = currentPath.join('.') || 'root';
    frozen.add(key);

    steps.push({
      obj: JSON.parse(JSON.stringify(INPUT)),
      path: [...path],
      frozen: new Set(frozen),
      explanation: `Freeze ${key}: Object.freeze() applied`,
    });

    Object.values(obj).forEach((value, idx) => {
      const propName = Object.keys(obj)[idx];
      const valuePath = [...currentPath, propName];

      if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
        steps.push({
          obj: JSON.parse(JSON.stringify(INPUT)),
          path: [...path],
          frozen: new Set(frozen),
          explanation: `Property '${propName}' is object, recursively freezing`,
        });
        deepFreeze(value as Record<string, unknown>, valuePath);
      } else {
        steps.push({
          obj: JSON.parse(JSON.stringify(INPUT)),
          path: [...path],
          frozen: new Set(frozen),
          explanation: `Property '${propName}' is ${typeof value === 'object' ? 'already frozen' : typeof value}, skip`,
        });
      }
    });

    path.pop();
  }

  deepFreeze(INPUT, []);

  steps.push({
    obj: INPUT,
    path: [],
    frozen: new Set(frozen),
    explanation: `Complete: All nested objects frozen`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function DeepFreezeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { obj, path, frozen, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Deep Freeze Object</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        {path.length > 0 && (
          <p className="text-cyan-400 text-sm mt-1">Path: {path.join('.') || 'root'}</p>
        )}
      </div>

      <div className="space-y-6">
        {/* Object */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Object</h3>
          <div className="p-4 bg-zinc-800 rounded-lg font-mono text-sm text-zinc-300">
            <pre>{JSON.stringify(obj, null, 2)}</pre>
          </div>
        </div>

        {/* Frozen Paths */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Frozen Paths</h3>
          {frozen.size === 0 ? (
            <div className="p-4 bg-zinc-800 rounded-lg text-center text-zinc-500">(none)</div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {Array.from(frozen).map((key) => (
                <div
                  key={key}
                  className="px-3 py-1 bg-green-500/20 border-2 border-green-500 rounded-lg font-mono text-xs font-semibold text-green-400"
                >
                  {key || '(root)'}
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
