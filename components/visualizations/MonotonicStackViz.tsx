'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [4, 5, 2, 10, 8];

interface StackStep {
  i: number;
  stack: number[];
  result: number[];
  explanation: string;
  action: 'push' | 'pop' | 'set';
}

function computeSteps(): StackStep[] {
  const steps: StackStep[] = [];
  const result = new Array(ARRAY.length).fill(-1);
  const stack: number[] = [];

  for (let i = 0; i < ARRAY.length; i++) {
    while (stack.length > 0 && ARRAY[stack[stack.length - 1]] < ARRAY[i]) {
      const idx = stack.pop();
      if (idx === undefined) break;
      result[idx] = ARRAY[i];
      steps.push({
        i,
        stack: [...stack],
        result: [...result],
        explanation: `Pop index ${idx}, set result[${idx}] = ${ARRAY[i]}`,
        action: 'set',
      });
    }
    stack.push(i);
    steps.push({
      i,
      stack: [...stack],
      result: [...result],
      explanation: `Push index ${i} (value=${ARRAY[i]})`,
      action: 'push',
    });
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  stack: '#3b82f6',
  result: '#22c55e',
  current: '#eab308',
} as const;

export default function MonotonicStackViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Next Greater Element (Monotonic Stack)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
      </div>

      <div className="mb-6 flex items-center justify-center gap-2">
        {ARRAY.map((value, idx) => {
          const isCurrent = currentStep.i === idx;
          const resultValue = currentStep.result[idx];
          return (
            <div key={idx} className="flex flex-col items-center">
              <motion.div
                className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: isCurrent ? `${COLORS.current}40` : '#1f2937',
                  borderColor: isCurrent ? COLORS.current : '#374151',
                }}
                animate={{ scale: isCurrent ? 1.15 : 1 }}
              >
                {value}
              </motion.div>
              <div className="text-xs text-zinc-500 mt-1">{idx}</div>
              <div className="text-xs font-mono mt-1" style={{ color: COLORS.result }}>
                → {resultValue === -1 ? '?' : resultValue}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-zinc-300 mb-2">Stack (indices):</h3>
        <div className="flex items-end justify-center gap-2 h-32">
          <AnimatePresence mode="popLayout">
            {currentStep.stack.map((idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: `${COLORS.stack}40`,
                  borderColor: COLORS.stack,
                }}
              >
                {idx}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.stack} />
    </div>
  );
}
