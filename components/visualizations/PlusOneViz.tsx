'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const DIGITS = [1, 2, 3];

interface PlusOneStep {
  digits: number[];
  index: number;
  carry: number;
  result: number[];
  explanation: string;
}

function computeSteps(): PlusOneStep[] {
  const steps: PlusOneStep[] = [];
  const result = [...DIGITS];
  let carry = 1;

  steps.push({
    digits: [...DIGITS],
    index: -1,
    carry: 1,
    result: [...result],
    explanation: `Start: Add 1 to [${DIGITS.join(', ')}]`,
  });

  for (let i = result.length - 1; i >= 0; i--) {
    const sum = result[i] + carry;
    steps.push({
      digits: [...DIGITS],
      index: i,
      carry,
      result: [...result],
      explanation: `Process digit ${i}: ${result[i]} + ${carry} = ${sum}`,
    });

    result[i] = sum % 10;
    carry = Math.floor(sum / 10);

    steps.push({
      digits: [...DIGITS],
      index: i,
      carry,
      result: [...result],
      explanation: `Update: result[${i}] = ${result[i]}, carry = ${carry}`,
    });

    if (carry === 0) break;
  }

  if (carry > 0) {
    result.unshift(carry);
    steps.push({
      digits: [...DIGITS],
      index: -1,
      carry: 0,
      result: [...result],
      explanation: `Carry remains → add ${carry} at front`,
    });
  }

  steps.push({
    digits: [...DIGITS],
    index: -1,
    carry: 0,
    result: [...result],
    explanation: `Complete: [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  updated: '#22c55e',
  default: '#3b82f6',
} as const;

export default function PlusOneViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { digits, index, carry, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Plus One</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {carry > 0 && <p className="text-yellow-400 text-sm mt-1">Carry: {carry}</p>}
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Result: [{result.join(', ')}]</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Original</h3>
          <div className="flex gap-2 justify-center">
            {digits.map((n, idx) => {
              const isCurrent = index === idx;
              return (
                <motion.div
                  key={idx}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: isCurrent ? COLORS.current : COLORS.default,
                    borderColor: isCurrent ? '#fff' : COLORS.default,
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

        {result.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Result</h3>
            <div className="flex gap-2 justify-center">
              {result.map((n, idx) => {
                const isNew = idx === 0 && result.length > digits.length;
                return (
                  <motion.div
                    key={idx}
                    className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                    style={{
                      backgroundColor: isNew ? COLORS.updated : COLORS.default,
                      borderColor: isNew ? COLORS.updated : COLORS.default,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {n}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
