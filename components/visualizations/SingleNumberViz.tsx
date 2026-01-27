'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [4, 1, 2, 1, 2];

interface SingleStep {
  num: number;
  index: number;
  xor: number;
  explanation: string;
}

function computeSteps(): SingleStep[] {
  const steps: SingleStep[] = [];
  let xor = 0;

  steps.push({
    num: 0,
    index: -1,
    xor: 0,
    explanation: 'Start: Find single number using XOR',
  });

  for (let i = 0; i < ARRAY.length; i++) {
    const num = ARRAY[i];
    xor ^= num;
    steps.push({
      num,
      index: i,
      xor,
      explanation: `XOR with ${num}: ${xor ^ num} ^ ${num} = ${xor}`,
    });
  }

  steps.push({
    num: 0,
    index: ARRAY.length,
    xor,
    explanation: `Complete: Single number = ${xor} (all pairs cancel out)`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  result: '#22c55e',
  default: '#3b82f6',
} as const;

export default function SingleNumberViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { index, xor, explanation } = currentStep;
  const seen = new Set<number>();
  const pairs = new Set<number>();

  for (let i = 0; i <= index && i < ARRAY.length; i++) {
    if (seen.has(ARRAY[i])) {
      pairs.add(ARRAY[i]);
    } else {
      seen.add(ARRAY[i]);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Single Number</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Result: {xor}</p>
        )}
      </div>

      <div className="mb-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array</h3>
          <div className="flex gap-2 justify-center">
            {ARRAY.map((n, i) => {
              const isCurrent = index === i;
              const isPair = pairs.has(n);

              let bgColor: string = COLORS.default;
              if (isCurrent) {
                bgColor = COLORS.current;
              } else if (isPair) {
                bgColor = '#6b7280';
              }

              return (
                <motion.div
                  key={i}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: isCurrent ? '#fff' : bgColor,
                  }}
                  animate={{
                    scale: isCurrent ? 1.2 : 1,
                  }}
                >
                  {n}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">XOR Result</h3>
          <div className="flex justify-center">
            <motion.div
              className="w-24 h-24 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white text-2xl"
              style={{
                backgroundColor: COLORS.result,
                borderColor: COLORS.result,
              }}
              animate={{
                scale: step === STEPS.length - 1 ? 1.1 : 1,
              }}
            >
              {xor}
            </motion.div>
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
