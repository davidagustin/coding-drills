'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const INPUT = 'aaabbc';

interface RunLengthEncodeStep {
  input: string;
  result: string;
  currentIndex: number;
  currentChar: string;
  count: number;
  explanation: string;
}

function computeSteps(): RunLengthEncodeStep[] {
  const steps: RunLengthEncodeStep[] = [];
  let result = '';
  let count = 1;

  if (INPUT.length === 0) {
    steps.push({
      input: '',
      result: '',
      currentIndex: -1,
      currentChar: '',
      count: 0,
      explanation: `Empty string, return empty`,
    });
    return steps;
  }

  steps.push({
    input: INPUT,
    result: '',
    currentIndex: 0,
    currentChar: INPUT[0],
    count: 1,
    explanation: `Start: Encode "${INPUT}"`,
  });

  for (let i = 1; i <= INPUT.length; i++) {
    if (i < INPUT.length && INPUT[i] === INPUT[i - 1]) {
      count++;
      steps.push({
        input: INPUT,
        result,
        currentIndex: i,
        currentChar: INPUT[i - 1],
        count,
        explanation: `Index ${i}: Same char '${INPUT[i]}', count = ${count}`,
      });
    } else {
      result += `${count}${INPUT[i - 1]}`;
      steps.push({
        input: INPUT,
        result,
        currentIndex: i - 1,
        currentChar: INPUT[i - 1],
        count,
        explanation: `Encode run: ${count}${INPUT[i - 1]}, result = "${result}"`,
      });
      if (i < INPUT.length) {
        count = 1;
        steps.push({
          input: INPUT,
          result,
          currentIndex: i,
          currentChar: INPUT[i],
          count: 1,
          explanation: `New char '${INPUT[i]}', reset count = 1`,
        });
      }
    }
  }

  steps.push({
    input: INPUT,
    result,
    currentIndex: -1,
    currentChar: '',
    count: 0,
    explanation: `Complete: Encoded = "${result}"`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function RunLengthEncodeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { input, result, currentIndex, currentChar, count, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Run-Length Encoding</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Input String */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Input String</h3>
          <div className="flex gap-2 flex-wrap">
            {input.split('').map((char, idx) => {
              const isCurrent = idx === currentIndex && currentIndex !== -1;
              const isSameRun = idx <= currentIndex && char === currentChar && currentChar !== '';
              return (
                <div
                  key={idx}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center font-mono text-sm font-semibold border-2 ${
                    isCurrent
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : isSameRun
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  {char}
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Run */}
        {currentChar !== '' && (
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-sm text-zinc-400 mb-2">Current Run:</p>
            <p className="font-mono text-cyan-400">
              Char: &apos;{currentChar}&apos;, Count: {count}
            </p>
          </div>
        )}

        {/* Result */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Encoded Result</h3>
          <div className="p-4 bg-zinc-800 rounded-lg font-mono text-lg text-green-400">
            {result || '(empty)'}
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
