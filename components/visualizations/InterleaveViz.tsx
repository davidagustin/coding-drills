'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const FIRST = [1, 2, 3];
const SECOND = ['a', 'b', 'c'];

interface InterleaveStep {
  first: (number | string)[];
  second: (number | string)[];
  result: (number | string)[];
  currentIndex: number;
  explanation: string;
}

function computeSteps(): InterleaveStep[] {
  const steps: InterleaveStep[] = [];
  const result: (number | string)[] = [];
  const longerLength = Math.max(FIRST.length, SECOND.length);

  steps.push({
    first: [...FIRST],
    second: [...SECOND],
    result: [],
    currentIndex: -1,
    explanation: `Start: Interleave [${FIRST.join(', ')}] and [${SECOND.join(', ')}]`,
  });

  for (let i = 0; i < longerLength; i++) {
    steps.push({
      first: [...FIRST],
      second: [...SECOND],
      result: [...result],
      currentIndex: i,
      explanation: `Processing index ${i}`,
    });

    if (i < FIRST.length) {
      result.push(FIRST[i]);
      steps.push({
        first: [...FIRST],
        second: [...SECOND],
        result: [...result],
        currentIndex: i,
        explanation: `Add first[${i}] = ${FIRST[i]} to result`,
      });
    }

    if (i < SECOND.length) {
      result.push(SECOND[i]);
      steps.push({
        first: [...FIRST],
        second: [...SECOND],
        result: [...result],
        currentIndex: i,
        explanation: `Add second[${i}] = ${SECOND[i]} to result`,
      });
    }
  }

  steps.push({
    first: [...FIRST],
    second: [...SECOND],
    result: [...result],
    currentIndex: -1,
    explanation: `Complete: Interleaved result = [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function InterleaveViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { first, second, result, currentIndex, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Interleave Arrays</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* First Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">First Array</h3>
          <div className="flex gap-2 flex-wrap">
            {first.map((val, idx) => {
              const isCurrent = idx === currentIndex && currentIndex !== -1;
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-sm font-semibold border-2 ${
                    isCurrent
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  <span className="text-xs text-zinc-500">{idx}</span>
                  <span className="text-lg">{String(val)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Second Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Second Array</h3>
          <div className="flex gap-2 flex-wrap">
            {second.map((val, idx) => {
              const isCurrent = idx === currentIndex && currentIndex !== -1;
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-sm font-semibold border-2 ${
                    isCurrent
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  <span className="text-xs text-zinc-500">{idx}</span>
                  <span className="text-lg">{String(val)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Result */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Interleaved Result</h3>
          {result.length === 0 ? (
            <div className="p-4 bg-zinc-800 rounded-lg text-center text-zinc-500">(empty)</div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {result.map((val, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-cyan-500/20 border-2 border-cyan-500 rounded-lg font-mono text-sm font-semibold text-cyan-400"
                >
                  {String(val)}
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
