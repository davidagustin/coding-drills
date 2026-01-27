'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// Example: add(a, b, c) = a + b + c
const ARITY = 3;
const CALLS = [
  { args: [1], complete: false },
  { args: [1, 2], complete: false },
  { args: [1, 2, 3], complete: true },
];

interface CurryFunctionStep {
  collectedArgs: number[];
  additionalArgs: number[];
  arity: number;
  complete: boolean;
  result: number | null;
  explanation: string;
}

function computeSteps(): CurryFunctionStep[] {
  const steps: CurryFunctionStep[] = [];
  let collectedArgs: number[] = [];

  steps.push({
    collectedArgs: [],
    additionalArgs: [],
    arity: ARITY,
    complete: false,
    result: null,
    explanation: `Start: Curry function with arity ${ARITY} (needs ${ARITY} arguments)`,
  });

  for (const call of CALLS) {
    collectedArgs = [...call.args];
    const isComplete = collectedArgs.length >= ARITY;

    steps.push({
      collectedArgs: [...collectedArgs],
      additionalArgs: [],
      arity: ARITY,
      complete: isComplete,
      result: null,
      explanation: `Call with [${call.args.join(', ')}]: collected ${collectedArgs.length}/${ARITY} arguments`,
    });

    if (isComplete) {
      const result = collectedArgs.reduce((a, b) => a + b, 0);
      steps.push({
        collectedArgs: [...collectedArgs],
        additionalArgs: [],
        arity: ARITY,
        complete: true,
        result,
        explanation: `Complete! All ${ARITY} arguments collected. Result = ${collectedArgs.join(' + ')} = ${result}`,
      });
    } else {
      steps.push({
        collectedArgs: [...collectedArgs],
        additionalArgs: [],
        arity: ARITY,
        complete: false,
        result: null,
        explanation: `Not enough arguments. Return curried function waiting for ${ARITY - collectedArgs.length} more`,
      });
    }
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function CurryFunctionViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { collectedArgs, arity, complete, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Curry Function</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        {result !== null && <p className="text-green-400 font-semibold mt-2">Result: {result}</p>}
      </div>

      <div className="space-y-6">
        {/* Collected Arguments */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">
            Collected Arguments ({collectedArgs.length} / {arity})
          </h3>
          {collectedArgs.length === 0 ? (
            <div className="p-4 bg-zinc-800 rounded-lg text-center text-zinc-500">(empty)</div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {collectedArgs.map((arg, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-cyan-500/20 border-2 border-cyan-500 rounded-lg font-mono text-sm font-semibold text-cyan-400"
                >
                  {arg}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status */}
        <div className="p-4 bg-zinc-800 rounded-lg">
          <p className="text-sm text-zinc-400 mb-2">Status:</p>
          <p className={`font-semibold ${complete ? 'text-green-400' : 'text-yellow-400'}`}>
            {complete
              ? `✓ Complete (${collectedArgs.length} >= ${arity})`
              : `⏳ Waiting (${collectedArgs.length} < ${arity})`}
          </p>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
