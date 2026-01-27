'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const OBJ = { a: 1, b: 2, c: 3, d: 4 };
const OMIT_KEYS = ['b', 'd'];

interface ObjectOmitStep {
  obj: Record<string, number>;
  omitKeys: string[];
  omitSet: Set<string>;
  result: Record<string, number>;
  currentKey: string;
  explanation: string;
}

function computeSteps(): ObjectOmitStep[] {
  const steps: ObjectOmitStep[] = [];
  const omitSet = new Set(OMIT_KEYS);
  const result: Record<string, number> = {};

  steps.push({
    obj: { ...OBJ },
    omitKeys: [...OMIT_KEYS],
    omitSet: new Set(omitSet),
    result: {},
    currentKey: '',
    explanation: `Start: Omit keys [${OMIT_KEYS.join(', ')}] from object`,
  });

  steps.push({
    obj: { ...OBJ },
    omitKeys: [...OMIT_KEYS],
    omitSet: new Set(omitSet),
    result: {},
    currentKey: '',
    explanation: `Create omit Set: {${[...omitSet].join(', ')}} for O(1) lookup`,
  });

  for (const key of Object.keys(OBJ)) {
    steps.push({
      obj: { ...OBJ },
      omitKeys: [...OMIT_KEYS],
      omitSet: new Set(omitSet),
      result: { ...result },
      currentKey: key,
      explanation: `Check key '${key}': ${omitSet.has(key) ? 'in omit set, skip' : 'not in omit set, include'}`,
    });

    if (!omitSet.has(key)) {
      result[key] = (OBJ as Record<string, number>)[key];
      steps.push({
        obj: { ...OBJ },
        omitKeys: [...OMIT_KEYS],
        omitSet: new Set(omitSet),
        result: { ...result },
        currentKey: key,
        explanation: `Add '${key}': ${key} = ${(OBJ as Record<string, number>)[key]}`,
      });
    }
  }

  steps.push({
    obj: { ...OBJ },
    omitKeys: [...OMIT_KEYS],
    omitSet: new Set(omitSet),
    result: { ...result },
    currentKey: '',
    explanation: `Complete: Omitted object = ${JSON.stringify(result)}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function ObjectOmitViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { obj, omitKeys, omitSet, result, currentKey, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Omit Keys from Object</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Source Object */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Source Object</h3>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(obj).map(([key, val]) => {
              const isCurrent = key === currentKey && currentKey !== '';
              const isOmitted = omitSet.has(key);
              return (
                <div
                  key={key}
                  className={`px-4 py-2 rounded-lg font-mono text-sm font-semibold border-2 ${
                    isCurrent
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : isOmitted
                        ? 'bg-red-500/20 border-red-500 text-red-400'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  {key}: {val}
                </div>
              );
            })}
          </div>
        </div>

        {/* Omit Set */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Keys to Omit</h3>
          <div className="flex gap-2 flex-wrap">
            {omitKeys.map((key) => (
              <div
                key={key}
                className="px-4 py-2 bg-red-500/20 border-2 border-red-500 rounded-lg font-mono text-sm font-semibold text-red-400"
              >
                {key}
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Result</h3>
          {Object.keys(result).length === 0 ? (
            <div className="p-4 bg-zinc-800 rounded-lg text-center text-zinc-500">(empty)</div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {Object.entries(result).map(([key, val]) => (
                <div
                  key={key}
                  className="px-4 py-2 bg-green-500/20 border-2 border-green-500 rounded-lg font-mono text-sm font-semibold text-green-400"
                >
                  {key}: {val}
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
