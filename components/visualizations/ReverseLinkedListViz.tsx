'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const VALUES = [1, 2, 3, 4, 5];

interface ReverseLLStep {
  values: number[];
  prev: number | null;
  curr: number | null;
  next: number | null;
  explanation: string;
}

function computeSteps(): ReverseLLStep[] {
  const steps: ReverseLLStep[] = [];
  const values = [...VALUES];

  steps.push({
    values: [...values],
    prev: null,
    curr: 0,
    next: 1,
    explanation: 'Start: Reverse linked list',
  });

  let prev = null;
  let curr = 0;

  while (curr < values.length) {
    const next = curr + 1 < values.length ? curr + 1 : null;

    steps.push({
      values: [...values],
      prev: prev !== null ? prev : null,
      curr,
      next,
      explanation: `Current: node ${curr}, value = ${values[curr]}`,
    });

    if (next !== null) {
      steps.push({
        values: [...values],
        prev: prev !== null ? prev : null,
        curr,
        next,
        explanation: `Reverse link: node ${curr} now points to ${prev !== null ? `node ${prev}` : 'null'}`,
      });
    }

    prev = curr;
    curr = next !== null ? next : values.length;
  }

  const reversed = [...values].reverse();
  steps.push({
    values: reversed,
    prev: null,
    curr: null,
    next: null,
    explanation: 'Complete: Linked list reversed',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  reversed: '#22c55e',
  default: '#3b82f6',
} as const;

export default function ReverseLinkedListViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { values, curr, next, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Reverse Linked List</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Linked List</h3>
        <div className="flex gap-2 justify-center items-center">
          {values.map((val, idx) => {
            const isCurrent = curr === idx;
            const isNext = next === idx;

            let bgColor: string = COLORS.default;
            if (isCurrent) {
              bgColor = COLORS.current;
            } else if (
              step === STEPS.length - 1 ||
              idx < values.length - (curr !== null ? curr : 0)
            ) {
              bgColor = COLORS.reversed;
            }

            return (
              <div key={idx} className="flex items-center gap-2">
                <motion.div
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: isCurrent ? '#fff' : bgColor,
                  }}
                  animate={{
                    scale: isCurrent ? 1.2 : 1,
                  }}
                >
                  {val}
                </motion.div>
                {idx < values.length - 1 && (
                  <motion.div
                    className="text-white"
                    animate={{
                      opacity: isCurrent || isNext ? 1 : 0.5,
                    }}
                  >
                    →
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
