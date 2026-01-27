'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const INPUT = [0, 1, false, 2, '', 3, null, undefined, NaN];

interface CompactStep {
  input: (number | boolean | string | null | undefined)[];
  result: number[];
  currentIndex: number;
  explanation: string;
}

function computeSteps(): CompactStep[] {
  const steps: CompactStep[] = [];
  const result: number[] = [];

  steps.push({
    input: [...INPUT],
    result: [],
    currentIndex: -1,
    explanation: `Start: Compact array, removing all falsy values`,
  });

  for (let i = 0; i < INPUT.length; i++) {
    const value = INPUT[i];
    const isTruthy = Boolean(value);

    steps.push({
      input: [...INPUT],
      result: [...result],
      currentIndex: i,
      explanation: `Check index ${i}: value = ${String(value)}, Boolean(${String(value)}) = ${isTruthy}`,
    });

    if (isTruthy) {
      result.push(value as number);
      steps.push({
        input: [...INPUT],
        result: [...result],
        currentIndex: i,
        explanation: `Keep ${value}: result = [${result.join(', ')}]`,
      });
    } else {
      steps.push({
        input: [...INPUT],
        result: [...result],
        currentIndex: i,
        explanation: `Remove ${String(value)} (falsy)`,
      });
    }
  }

  steps.push({
    input: [...INPUT],
    result: [...result],
    currentIndex: -1,
    explanation: `Complete: Compacted array = [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function CompactViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { input, result, currentIndex, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Compact Array</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Input Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Input Array</h3>
          <div className="flex gap-2 flex-wrap">
            {input.map((val, idx) => {
              const isCurrent = idx === currentIndex && currentIndex !== -1;
              const isTruthy = Boolean(val);
              return (
                <div
                  key={idx}
                  className={`w-20 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-xs font-semibold border-2 ${
                    isCurrent
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : isTruthy
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-red-500/20 border-red-500 text-red-400'
                  }`}
                >
                  <span className="text-xs text-zinc-500">{idx}</span>
                  <span className="text-xs">{String(val)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Result */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Compact Result (truthy only)</h3>
          {result.length === 0 ? (
            <div className="p-4 bg-zinc-800 rounded-lg text-center text-zinc-500">(empty)</div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {result.map((val, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-green-500/20 border-2 border-green-500 rounded-lg font-mono text-sm font-semibold text-green-400"
                >
                  {val}
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
