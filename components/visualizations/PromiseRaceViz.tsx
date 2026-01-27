'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const PROMISES = [
  new Promise<number>((resolve) => setTimeout(() => resolve(1), 100)),
  new Promise<number>((resolve) => setTimeout(() => resolve(2), 50)),
  new Promise<number>((resolve) => setTimeout(() => resolve(3), 200)),
];

interface PromiseRaceStep {
  promises: Array<{ id: number; status: 'pending' | 'resolved' | 'rejected'; value: unknown }>;
  winner: number | null;
  explanation: string;
}

function computeSteps(): PromiseRaceStep[] {
  const steps: PromiseRaceStep[] = [];
  const promises: Array<{
    id: number;
    status: 'pending' | 'resolved' | 'rejected';
    value: unknown;
  }> = PROMISES.map((_, idx) => ({ id: idx, status: 'pending' as const, value: null }));
  let winner: number | null = null;

  steps.push({
    promises: [...promises],
    winner: null,
    explanation: `Start: Promise.race with ${PROMISES.length} promises`,
  });

  PROMISES.forEach((promise, idx) => {
    promise.then((value) => {
      if (winner === null) {
        promises[idx].status = 'resolved';
        promises[idx].value = value;
        winner = idx;

        steps.push({
          promises: [...promises],
          winner,
          explanation: `Promise ${idx} resolved first with value ${value}. Winner!`,
        });
      } else {
        promises[idx].status = 'resolved';
        promises[idx].value = value;
        steps.push({
          promises: [...promises],
          winner,
          explanation: `Promise ${idx} resolved with value ${value} (too late, winner already determined)`,
        });
      }
    });
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function PromiseRaceViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { promises, winner, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Implement Promise.race</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        {winner !== null && (
          <p className="text-green-400 font-semibold mt-2">Winner: Promise {winner}</p>
        )}
      </div>

      <div className="space-y-6">
        {/* Promises */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Promises</h3>
          <div className="flex gap-2 flex-wrap">
            {promises.map((promise) => {
              const isWinner = promise.id === winner && winner !== null;
              return (
                <div
                  key={promise.id}
                  className={`w-20 h-20 rounded-lg flex flex-col items-center justify-center font-mono text-xs font-semibold border-2 ${
                    isWinner
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : promise.status === 'resolved'
                        ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                        : 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                  }`}
                >
                  <span className="text-xs text-zinc-500">P{promise.id}</span>
                  <span className="text-sm">{promise.status}</span>
                  {promise.value !== null && (
                    <span className="text-xs mt-1">{String(promise.value)}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
