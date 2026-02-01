'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NUM1 = '123';
const NUM2 = '456';

interface MultiplyStep {
  i: number;
  j: number;
  product: number;
  carry: number;
  result: number[];
  explanation: string;
}

function computeSteps(): MultiplyStep[] {
  const steps: MultiplyStep[] = [];
  const result = new Array(NUM1.length + NUM2.length).fill(0);

  steps.push({
    i: -1,
    j: -1,
    product: 0,
    carry: 0,
    result: [...result],
    explanation: `Start: Multiply "${NUM1}" × "${NUM2}"`,
  });

  for (let i = NUM1.length - 1; i >= 0; i--) {
    for (let j = NUM2.length - 1; j >= 0; j--) {
      const digit1 = parseInt(NUM1[i], 10);
      const digit2 = parseInt(NUM2[j], 10);
      const product = digit1 * digit2;
      const pos1 = i + j;
      const pos2 = i + j + 1;
      const sum = product + result[pos2];

      steps.push({
        i,
        j,
        product,
        carry: Math.floor(sum / 10),
        result: [...result],
        explanation: `${digit1} × ${digit2} = ${product}, add to position ${pos2}`,
      });

      result[pos2] = sum % 10;
      result[pos1] += Math.floor(sum / 10);

      steps.push({
        i,
        j,
        product,
        carry: Math.floor(sum / 10),
        result: [...result],
        explanation: `Update result[${pos2}] = ${result[pos2]}, carry = ${Math.floor(sum / 10)}`,
      });
    }
  }

  let start = 0;
  while (start < result.length && result[start] === 0) {
    start++;
  }

  steps.push({
    i: -1,
    j: -1,
    product: 0,
    carry: 0,
    result: result.slice(start),
    explanation: `Complete: "${result.slice(start).join('')}"`,
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

export default function MultiplyStringsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { i, j, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Multiply Strings</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Result: &quot;{result.join('')}&quot;
          </p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">
              Number 1: &quot;{NUM1}&quot;
            </h3>
            <div className="flex gap-2 justify-center">
              {NUM1.split('').map((c, idx) => {
                const isCurrent = i === idx;
                return (
                  <motion.div
                    key={idx}
                    className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                    style={{
                      backgroundColor: isCurrent ? COLORS.current : COLORS.default,
                      borderColor: isCurrent ? '#fff' : COLORS.default,
                    }}
                    animate={{
                      scale: isCurrent ? 1.2 : 1,
                    }}
                  >
                    {c}
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">
              Number 2: &quot;{NUM2}&quot;
            </h3>
            <div className="flex gap-2 justify-center">
              {NUM2.split('').map((c, idx) => {
                const isCurrent = j === idx;
                return (
                  <motion.div
                    key={idx}
                    className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                    style={{
                      backgroundColor: isCurrent ? COLORS.current : COLORS.default,
                      borderColor: isCurrent ? '#fff' : COLORS.default,
                    }}
                    animate={{
                      scale: isCurrent ? 1.2 : 1,
                    }}
                  >
                    {c}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {result.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Result</h3>
            <div className="flex gap-2 justify-center">
              {result.map((digit, idx) => (
                <motion.div
                  key={idx}
                  className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: COLORS.result,
                    borderColor: COLORS.result,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {digit}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
