'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const COUNT = 10;

interface FibonacciIterativeStep {
  fib: number[];
  position: number;
  prev1: number;
  prev2: number;
  current: number;
  explanation: string;
}

function computeSteps(): FibonacciIterativeStep[] {
  const steps: FibonacciIterativeStep[] = [];

  // COUNT is 10, so we skip the edge case checks

  const fib: number[] = [0, 1];
  steps.push({
    fib: [...fib],
    position: 1,
    prev1: 0,
    prev2: 0,
    current: 1,
    explanation: `Initialize: fib[0] = 0, fib[1] = 1`,
  });

  for (let position = 2; position < COUNT; position++) {
    const prev1 = fib[position - 1];
    const prev2 = fib[position - 2];
    const current = prev1 + prev2;

    steps.push({
      fib: [...fib],
      position,
      prev1,
      prev2,
      current,
      explanation: `Position ${position}: fib[${position}] = fib[${position - 1}] + fib[${position - 2}] = ${prev1} + ${prev2} = ${current}`,
    });

    fib.push(current);

    steps.push({
      fib: [...fib],
      position,
      prev1,
      prev2,
      current,
      explanation: `Added: fib[${position}] = ${current}`,
    });
  }

  steps.push({
    fib: [...fib],
    position: -1,
    prev1: 0,
    prev2: 0,
    current: 0,
    explanation: `Complete: First ${COUNT} Fibonacci numbers = [${fib.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function FibonacciIterativeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { fib, position, prev1, prev2, current, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Fibonacci Sequence (Iterative)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Fibonacci Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Fibonacci Sequence</h3>
          <div className="flex gap-2 flex-wrap">
            {fib.map((val, idx) => {
              const isCurrent = idx === position && position !== -1;
              const isPrev1 = idx === position - 1 && position !== -1;
              const isPrev2 = idx === position - 2 && position !== -1;
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-sm font-semibold border-2 ${
                    isCurrent
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : isPrev1
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : isPrev2
                          ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  <span className="text-xs text-zinc-500">fib[{idx}]</span>
                  <span className="text-lg">{val}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Formula */}
        {position !== -1 && (
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-sm text-zinc-400 mb-2">Formula:</p>
            <p className="font-mono text-cyan-400">
              fib[{position}] = fib[{position - 1}] + fib[{position - 2}] = {prev1} + {prev2} ={' '}
              <span className="text-green-400 font-bold">{current}</span>
            </p>
          </div>
        )}
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
