'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const INPUT = 5;
const FUNCTIONS = [
  { name: 'sub3', fn: (x: number) => x - 3 },
  { name: 'mul2', fn: (x: number) => x * 2 },
  { name: 'add1', fn: (x: number) => x + 1 },
];

interface PipeStep {
  input: number;
  functions: Array<{ name: string; fn: (x: number) => number }>;
  currentFn: number;
  value: number;
  explanation: string;
}

function computeSteps(): PipeStep[] {
  const steps: PipeStep[] = [];
  let value = INPUT;

  steps.push({
    input: INPUT,
    functions: FUNCTIONS,
    currentFn: -1,
    value,
    explanation: `Start: pipe(sub3, mul2, add1)(${INPUT})`,
  });

  // Apply functions left-to-right
  for (let i = 0; i < FUNCTIONS.length; i++) {
    const fn = FUNCTIONS[i];
    const prevValue = value;
    value = fn.fn(value);
    steps.push({
      input: INPUT,
      functions: FUNCTIONS,
      currentFn: i,
      value,
      explanation: `Apply ${fn.name}: ${fn.name}(${prevValue}) = ${value}`,
    });
  }

  steps.push({
    input: INPUT,
    functions: FUNCTIONS,
    currentFn: -1,
    value,
    explanation: `Complete: Result = ${value}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function PipeFunctionsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { functions, currentFn, value, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Pipe Functions</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Functions */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Functions (Left-to-Right)</h3>
          <div className="flex gap-2 flex-wrap">
            {functions.map((fn, idx) => {
              const isCurrent = idx === currentFn;
              const isApplied = currentFn > idx && currentFn >= 0;
              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  className={`px-4 py-2 rounded-lg border-2 ${
                    isCurrent
                      ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                      : isApplied
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  {fn.name}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Current Value */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Current Value</h3>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-2xl font-bold text-blue-400 font-mono">{value}</div>
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
