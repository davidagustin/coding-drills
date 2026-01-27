'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const N = 5;

interface FibonacciRecursiveStep {
  n: number;
  result: number | null;
  callStack: Array<{ n: number; result: number | null }>;
  explanation: string;
}

function computeSteps(): FibonacciRecursiveStep[] {
  const steps: FibonacciRecursiveStep[] = [];
  const callStack: Array<{ n: number; result: number | null }> = [];

  function fibonacciRecursive(n: number): number {
    callStack.push({ n, result: null });
    steps.push({
      n,
      result: null,
      callStack: [...callStack],
      explanation: `fibonacciRecursive(${n}): ${n <= 0 ? 'Base case, return 0' : n === 1 ? 'Base case, return 1' : `Recursive: fib(${n - 1}) + fib(${n - 2})`}`,
    });

    if (n <= 0) {
      callStack.pop();
      steps.push({
        n,
        result: 0,
        callStack: [...callStack],
        explanation: `fibonacciRecursive(${n}) = 0 (base case)`,
      });
      return 0;
    }

    if (n === 1) {
      callStack.pop();
      steps.push({
        n,
        result: 1,
        callStack: [...callStack],
        explanation: `fibonacciRecursive(${n}) = 1 (base case)`,
      });
      return 1;
    }

    const result1 = fibonacciRecursive(n - 1);
    const result2 = fibonacciRecursive(n - 2);
    const result = result1 + result2;

    callStack.pop();
    steps.push({
      n,
      result,
      callStack: [...callStack],
      explanation: `fibonacciRecursive(${n}) = fib(${n - 1}) + fib(${n - 2}) = ${result1} + ${result2} = ${result}`,
    });

    return result;
  }

  const finalResult = fibonacciRecursive(N);
  steps.push({
    n: N,
    result: finalResult,
    callStack: [],
    explanation: `Complete: fib(${N}) = ${finalResult}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function FibonacciRecursiveViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { result, callStack, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Fibonacci (Recursive)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        {result !== null && <p className="text-green-400 font-semibold mt-2">Result: {result}</p>}
      </div>

      <div className="space-y-6">
        {/* Call Stack */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Call Stack</h3>
          {callStack.length === 0 ? (
            <div className="p-4 bg-zinc-800 rounded-lg text-center text-zinc-500">(empty)</div>
          ) : (
            <div className="space-y-2">
              {callStack.map((call, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-zinc-800 rounded-lg border-2 border-zinc-700 font-mono text-sm"
                >
                  <span className="text-cyan-400">fibonacciRecursive</span>
                  <span className="text-white">({call.n})</span>
                  {call.result !== null && (
                    <span className="text-green-400 ml-2">→ {call.result}</span>
                  )}
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
