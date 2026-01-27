'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

let callCount = 0;
const FN = () => {
  callCount++;
  return Math.floor(Math.random() * 100);
};

interface OnceStep {
  callNumber: number;
  called: boolean;
  result: number | null;
  explanation: string;
}

function computeSteps(): OnceStep[] {
  const steps: OnceStep[] = [];
  let called = false;
  let result: number | null = null;

  steps.push({
    callNumber: 0,
    called: false,
    result: null,
    explanation: `Start: Function wrapped with once()`,
  });

  for (let i = 1; i <= 3; i++) {
    if (!called) {
      called = true;
      callCount = 0;
      result = FN();
      steps.push({
        callNumber: i,
        called: true,
        result,
        explanation: `Call ${i}: First call → execute function → result = ${result}`,
      });
    } else {
      steps.push({
        callNumber: i,
        called: true,
        result,
        explanation: `Call ${i}: Already called → return cached result = ${result}`,
      });
    }
  }

  steps.push({
    callNumber: 0,
    called: true,
    result,
    explanation: `Complete: Function executed ${callCount} time(s), all calls return ${result}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function OnceFunctionViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { callNumber, called, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Once Function</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-400 mb-1">Called</div>
            <div className={`text-2xl font-bold ${called ? 'text-green-400' : 'text-red-400'}`}>
              {called ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-400 mb-1">Cached Result</div>
            <div className="text-2xl font-bold text-blue-400 font-mono">
              {result !== null ? result : '—'}
            </div>
          </div>
        </div>

        {/* Calls */}
        {callNumber > 0 && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Call {callNumber}</h3>
            <div className="p-4 bg-zinc-800 rounded-lg">
              <div className="text-white">
                {called && callNumber === 1
                  ? 'First call → Execute function'
                  : called
                    ? 'Subsequent call → Return cached result'
                    : 'Not called yet'}
              </div>
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
