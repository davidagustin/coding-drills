'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const CALLS: [number, number][] = [
  [1, 2],
  [1, 2],
  [3, 4],
];

const FN = (a: number, b: number) => a + b;

interface MemoizeStep {
  calls: [number, number][];
  cache: Map<string, number>;
  currentCall: number;
  explanation: string;
}

function computeSteps(): MemoizeStep[] {
  const steps: MemoizeStep[] = [];
  const cache = new Map<string, number>();

  steps.push({
    calls: [...CALLS],
    cache: new Map(),
    currentCall: -1,
    explanation: `Start: Memoize function with multiple arguments`,
  });

  for (let i = 0; i < CALLS.length; i++) {
    const [a, b] = CALLS[i];
    const key = JSON.stringify([a, b]);

    if (cache.has(key)) {
      steps.push({
        calls: [...CALLS],
        cache: new Map(cache),
        currentCall: i,
        explanation: `Call ${i + 1}: fn(${a}, ${b}) → cache hit! Return ${cache.get(key)}`,
      });
    } else {
      const result = FN(a, b);
      cache.set(key, result);
      steps.push({
        calls: [...CALLS],
        cache: new Map(cache),
        currentCall: i,
        explanation: `Call ${i + 1}: fn(${a}, ${b}) → compute ${a} + ${b} = ${result}, cache it`,
      });
    }
  }

  steps.push({
    calls: [...CALLS],
    cache: new Map(cache),
    currentCall: -1,
    explanation: `Complete: Cache has ${cache.size} entries`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function MemoizeMultiArgViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { calls, cache, currentCall, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Memoize with Multiple Arguments</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Function Calls */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Function Calls</h3>
          <div className="flex gap-2 flex-wrap">
            {calls.map((call, idx) => {
              const isCurrent = idx === currentCall;
              const key = JSON.stringify(call);
              const isCached = cache.has(key);
              return (
                <div
                  key={idx}
                  className={`px-4 py-2 rounded-lg border-2 flex flex-col items-center ${
                    isCurrent
                      ? isCached
                        ? 'bg-green-500/20 border-green-500'
                        : 'bg-yellow-500/20 border-yellow-500'
                      : 'bg-zinc-800 border-zinc-700'
                  }`}
                >
                  <span className="text-zinc-300 font-mono text-sm">
                    fn({call[0]}, {call[1]})
                  </span>
                  {isCached && <span className="text-green-400 text-xs">cached</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Cache */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Cache</h3>
          <div className="flex gap-2 flex-wrap">
            {cache.size === 0 ? (
              <div className="text-zinc-500 text-sm">Empty</div>
            ) : (
              Array.from(cache.entries()).map(([key, value]) => (
                <div
                  key={key}
                  className="px-4 py-2 rounded-lg bg-blue-500/20 border-2 border-blue-500 flex flex-col items-center"
                >
                  <span className="text-blue-400 font-mono text-xs">{key}</span>
                  <span className="text-blue-300 text-sm font-semibold">→ {value}</span>
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
