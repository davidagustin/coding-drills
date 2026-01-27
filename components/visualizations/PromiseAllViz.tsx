'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const PROMISES = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

interface PromiseAllStep {
  promises: Array<{ id: number; status: 'pending' | 'resolved' | 'rejected'; value: unknown }>;
  results: unknown[];
  resolvedCount: number;
  explanation: string;
}

function computeSteps(): PromiseAllStep[] {
  const steps: PromiseAllStep[] = [];
  const promises: Array<{
    id: number;
    status: 'pending' | 'resolved' | 'rejected';
    value: unknown;
  }> = PROMISES.map((_, idx) => ({ id: idx, status: 'pending' as const, value: null }));
  const results: unknown[] = new Array(PROMISES.length);
  let resolvedCount = 0;

  steps.push({
    promises: [...promises],
    results: [...results],
    resolvedCount: 0,
    explanation: `Start: Promise.all with ${PROMISES.length} promises`,
  });

  PROMISES.forEach((promise, idx) => {
    promise.then((value) => {
      promises[idx].status = 'resolved';
      promises[idx].value = value;
      results[idx] = value;
      resolvedCount++;

      steps.push({
        promises: [...promises],
        results: [...results],
        resolvedCount,
        explanation: `Promise ${idx} resolved with value ${value}. Resolved: ${resolvedCount}/${PROMISES.length}`,
      });

      if (resolvedCount === PROMISES.length) {
        steps.push({
          promises: [...promises],
          results: [...results],
          resolvedCount,
          explanation: `Complete: All promises resolved. Result = [${results.join(', ')}]`,
        });
      }
    });
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function PromiseAllViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { promises, results, resolvedCount, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Implement Promise.all</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Promises */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">
            Promises ({resolvedCount}/{promises.length} resolved)
          </h3>
          <div className="flex gap-2 flex-wrap">
            {promises.map((promise) => (
              <div
                key={promise.id}
                className={`w-20 h-20 rounded-lg flex flex-col items-center justify-center font-mono text-xs font-semibold border-2 ${
                  promise.status === 'resolved'
                    ? 'bg-green-500/20 border-green-500 text-green-400'
                    : 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                }`}
              >
                <span className="text-xs text-zinc-500">P{promise.id}</span>
                <span className="text-sm">{promise.status}</span>
                {promise.value !== null && (
                  <span className="text-xs mt-1">{String(promise.value)}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Results Array</h3>
          <div className="flex gap-2 flex-wrap">
            {results.map((val, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-sm font-semibold border-2 ${
                  val !== undefined
                    ? 'bg-green-500/20 border-green-500 text-green-400'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                }`}
              >
                <span className="text-xs text-zinc-500">{idx}</span>
                <span className="text-lg">{val !== undefined ? String(val) : '?'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
