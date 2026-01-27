'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const OPERATIONS: Array<['pushFront', number] | ['pushBack', number] | ['popFront'] | ['popBack']> =
  [['pushFront', 1], ['pushBack', 2], ['pushFront', 3], ['popBack'], ['popFront']];

interface DequeStep {
  deque: number[];
  operation: string;
  value: number | null;
  result: number | null;
  explanation: string;
}

function computeSteps(): DequeStep[] {
  const steps: DequeStep[] = [];
  const deque: number[] = [];

  steps.push({
    deque: [],
    operation: 'init',
    value: null,
    result: null,
    explanation: `Start: Empty deque`,
  });

  for (const op of OPERATIONS) {
    if (op[0] === 'pushFront') {
      deque.unshift(op[1]);
      steps.push({
        deque: [...deque],
        operation: 'pushFront',
        value: op[1],
        result: null,
        explanation: `pushFront(${op[1]}): Add ${op[1]} to front`,
      });
    } else if (op[0] === 'pushBack') {
      deque.push(op[1]);
      steps.push({
        deque: [...deque],
        operation: 'pushBack',
        value: op[1],
        result: null,
        explanation: `pushBack(${op[1]}): Add ${op[1]} to back`,
      });
    } else if (op[0] === 'popFront') {
      const result = deque.length > 0 ? deque.shift()! : -1;
      steps.push({
        deque: [...deque],
        operation: 'popFront',
        value: null,
        result,
        explanation: `popFront(): Remove from front → ${result}`,
      });
    } else if (op[0] === 'popBack') {
      const result = deque.length > 0 ? deque.pop()! : -1;
      steps.push({
        deque: [...deque],
        operation: 'popBack',
        value: null,
        result,
        explanation: `popBack(): Remove from back → ${result}`,
      });
    }
  }

  steps.push({
    deque: [...deque],
    operation: 'complete',
    value: null,
    result: null,
    explanation: `Complete: All operations processed`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function DequeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { deque, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Double-Ended Queue (Deque)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        {result !== null && <p className="text-green-400 font-semibold mt-2">Result: {result}</p>}
      </div>

      <div className="space-y-6">
        {/* Deque Visualization */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Deque</h3>
          {deque.length === 0 ? (
            <div className="p-8 bg-zinc-800 rounded-lg text-center text-zinc-500">(empty)</div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="text-xs text-zinc-500 px-2">Front</div>
              <div className="flex gap-2 flex-1 justify-center">
                {deque.map((val, idx) => (
                  <div
                    key={idx}
                    className="w-16 h-16 rounded-lg bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center font-mono text-lg font-semibold text-cyan-400"
                  >
                    {val}
                  </div>
                ))}
              </div>
              <div className="text-xs text-zinc-500 px-2">Back</div>
            </div>
          )}
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
