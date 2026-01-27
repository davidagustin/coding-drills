'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const PATH = '/home//foo/';

interface SimplifyStep {
  path: string;
  parts: string[];
  stack: string[];
  explanation: string;
}

function computeSteps(): SimplifyStep[] {
  const steps: SimplifyStep[] = [];
  const parts = PATH.split('/').filter((p) => p !== '' && p !== '.');
  const stack: string[] = [];

  steps.push({
    path: PATH,
    parts: [...parts],
    stack: [],
    explanation: `Start: Simplify path "${PATH}"`,
  });

  for (const part of parts) {
    steps.push({
      path: PATH,
      parts: [...parts],
      stack: [...stack],
      explanation: `Process: "${part}"`,
    });

    if (part === '..') {
      if (stack.length > 0) {
        stack.pop();
        steps.push({
          path: PATH,
          parts: [...parts],
          stack: [...stack],
          explanation: `".." → go up, pop from stack`,
        });
      } else {
        steps.push({
          path: PATH,
          parts: [...parts],
          stack: [...stack],
          explanation: `".." at root → ignore`,
        });
      }
    } else {
      stack.push(part);
      steps.push({
        path: PATH,
        parts: [...parts],
        stack: [...stack],
        explanation: `Add "${part}" to stack`,
      });
    }
  }

  const result = '/' + stack.join('/');
  steps.push({
    path: PATH,
    parts: [...parts],
    stack: [...stack],
    explanation: `Complete: "${result}"`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  added: '#22c55e',
  popped: '#ef4444',
  default: '#3b82f6',
} as const;

export default function SimplifyPathViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { parts, stack, explanation } = currentStep;
  const result = '/' + stack.join('/');

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Simplify Path</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Result: &quot;{result}&quot;</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Path Parts</h3>
          <div className="flex gap-2 justify-center flex-wrap">
            {parts.map((part, idx) => (
              <motion.div
                key={idx}
                className="px-4 py-2 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: COLORS.default,
                  borderColor: COLORS.default,
                }}
              >
                {part}
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Stack</h3>
          <div className="flex flex-col-reverse gap-2 items-center min-h-[100px] justify-end">
            {stack.length === 0 ? (
              <p className="text-zinc-500">Stack is empty</p>
            ) : (
              stack.map((item, i) => (
                <motion.div
                  key={i}
                  className="px-4 py-2 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: COLORS.added,
                    borderColor: COLORS.added,
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {item}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
