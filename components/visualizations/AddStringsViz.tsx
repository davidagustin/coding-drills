'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NUM1 = '456';
const NUM2 = '77';

interface AddStep {
  i: number;
  j: number;
  carry: number;
  sum: number;
  result: string;
  explanation: string;
}

function computeSteps(): AddStep[] {
  const steps: AddStep[] = [];
  let i = NUM1.length - 1;
  let j = NUM2.length - 1;
  let carry = 0;
  const result: number[] = [];
  
  steps.push({
    i: -1,
    j: -1,
    carry: 0,
    sum: 0,
    result: '',
    explanation: `Start: Add "${NUM1}" + "${NUM2}"`,
  });
  
  while (i >= 0 || j >= 0 || carry > 0) {
    const digit1 = i >= 0 ? parseInt(NUM1[i], 10) : 0;
    const digit2 = j >= 0 ? parseInt(NUM2[j], 10) : 0;
    const sum = digit1 + digit2 + carry;
    
    steps.push({
      i,
      j,
      carry,
      sum,
      result: result.join(''),
      explanation: `${digit1} + ${digit2} + ${carry} = ${sum}`,
    });
    
    result.unshift(sum % 10);
    carry = Math.floor(sum / 10);
    
    steps.push({
      i,
      j,
      carry,
      sum,
      result: result.join(''),
      explanation: `Result digit: ${sum % 10}, carry: ${carry}`,
    });
    
    i--;
    j--;
  }
  
  steps.push({
    i: -1,
    j: -1,
    carry: 0,
    sum: 0,
    result: result.join(''),
    explanation: `Complete: "${result.join('')}"`,
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

export default function AddStringsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { i, j, carry, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Add Strings</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {carry > 0 && (
          <p className="text-yellow-400 text-sm mt-1">Carry: {carry}</p>
        )}
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Result: &quot;{result}&quot;
          </p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Number 1: &quot;{NUM1}&quot;</h3>
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
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Number 2: &quot;{NUM2}&quot;</h3>
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

        {result && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Result</h3>
            <div className="flex gap-2 justify-center">
              {result.split('').map((c, idx) => (
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
                  {c}
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
