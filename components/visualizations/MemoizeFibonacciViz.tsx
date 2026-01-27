'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const N = 6;

interface FibStep {
  n: number;
  memo: Record<number, number>;
  explanation: string;
  result: number | null;
}

function computeSteps(): FibStep[] {
  const steps: FibStep[] = [];
  const memo: Record<number, number> = {};

  function fib(n: number): number {
    if (n in memo) {
      steps.push({
        n,
        memo: { ...memo },
        explanation: `fib(${n}) found in memo → return ${memo[n]}`,
        result: memo[n],
      });
      return memo[n];
    }

    if (n <= 1) {
      memo[n] = n;
      steps.push({
        n,
        memo: { ...memo },
        explanation: `Base case: fib(${n}) = ${n}`,
        result: n,
      });
      return n;
    }

    steps.push({
      n,
      memo: { ...memo },
      explanation: `Compute fib(${n}) = fib(${n - 1}) + fib(${n - 2})`,
      result: null,
    });

    const result = fib(n - 1) + fib(n - 2);
    memo[n] = result;

    steps.push({
      n,
      memo: { ...memo },
      explanation: `Store fib(${n}) = ${result} in memo`,
      result,
    });

    return result;
  }

  fib(N);

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  computed: '#22c55e',
  memoized: '#3b82f6',
  current: '#eab308',
} as const;

export default function MemoizeFibonacciViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Memoized Fibonacci (n={N})</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            fib({N}) = {currentStep.memo[N]}
          </p>
        )}
      </div>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <div className="text-sm text-zinc-400 mb-2">Memo:</div>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(currentStep.memo)
            .sort(([a], [b]) => parseInt(a, 10) - parseInt(b, 10))
            .map(([n, value]) => (
              <div
                key={n}
                className="px-3 py-1 rounded border font-mono text-sm"
                style={{
                  backgroundColor:
                    parseInt(n, 10) === currentStep.n
                      ? `${COLORS.current}40`
                      : `${COLORS.memoized}20`,
                  borderColor: parseInt(n, 10) === currentStep.n ? COLORS.current : COLORS.memoized,
                  color: 'white',
                }}
              >
                fib({n})={value}
              </div>
            ))}
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.memoized} />
    </div>
  );
}
