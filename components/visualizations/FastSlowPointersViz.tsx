'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NEXT_INDICES = [1, 2, 0]; // Cycle: 0->1->2->0

interface FastSlowStep {
  nextIndices: number[];
  tortoise: number;
  hare: number;
  explanation: string;
}

function computeSteps(): FastSlowStep[] {
  const steps: FastSlowStep[] = [];
  let tortoise = 0;
  let hare = 0;

  steps.push({
    nextIndices: [...NEXT_INDICES],
    tortoise: 0,
    hare: 0,
    explanation: `Start: Floyd's cycle detection (tortoise and hare)`,
  });

  let iterations = 0;
  const maxIterations = 10;

  while (iterations < maxIterations) {
    iterations++;
    tortoise = NEXT_INDICES[tortoise];
    if (tortoise === -1) {
      steps.push({
        nextIndices: [...NEXT_INDICES],
        tortoise: -1,
        hare,
        explanation: `Tortoise reached end (-1) → no cycle`,
      });
      break;
    }

    hare = NEXT_INDICES[hare];
    if (hare === -1) {
      steps.push({
        nextIndices: [...NEXT_INDICES],
        tortoise,
        hare: -1,
        explanation: `Hare reached end (-1) → no cycle`,
      });
      break;
    }
    hare = NEXT_INDICES[hare];
    if (hare === -1) {
      steps.push({
        nextIndices: [...NEXT_INDICES],
        tortoise,
        hare: -1,
        explanation: `Hare reached end (-1) → no cycle`,
      });
      break;
    }

    if (tortoise === hare) {
      steps.push({
        nextIndices: [...NEXT_INDICES],
        tortoise,
        hare,
        explanation: `Tortoise (${tortoise}) === Hare (${hare}) → cycle detected!`,
      });
      break;
    }

    steps.push({
      nextIndices: [...NEXT_INDICES],
      tortoise,
      hare,
      explanation: `Tortoise at ${tortoise}, Hare at ${hare} → continue`,
    });
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function FastSlowPointersViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { nextIndices, tortoise, hare, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Floyd&apos;s Cycle Detection</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Linked List Representation */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">
            Linked List (Array Representation)
          </h3>
          <div className="flex gap-2 flex-wrap items-center">
            {nextIndices.map((next, idx) => {
              const isTortoise = idx === tortoise;
              const isHare = idx === hare;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className={`px-4 py-2 rounded-lg border-2 flex flex-col items-center ${
                      isTortoise && isHare
                        ? 'bg-purple-500/20 border-purple-500'
                        : isTortoise
                          ? 'bg-blue-500/20 border-blue-500'
                          : isHare
                            ? 'bg-green-500/20 border-green-500'
                            : 'bg-zinc-800 border-zinc-700'
                    }`}
                  >
                    <span className="text-zinc-300 font-mono text-sm">Node {idx}</span>
                    <span className="text-zinc-500 text-xs">
                      → {next === -1 ? 'end' : `Node ${next}`}
                    </span>
                    {isTortoise && <span className="text-blue-400 text-xs">🐢</span>}
                    {isHare && <span className="text-green-400 text-xs">🐰</span>}
                  </div>
                  {idx < nextIndices.length - 1 && <span className="text-zinc-500">→</span>}
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
