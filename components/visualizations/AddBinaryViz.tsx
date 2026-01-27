'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const A = '11';
const B = '1';

interface AddBinaryStep {
  a: string;
  b: string;
  i: number;
  j: number;
  carry: number;
  result: string;
  explanation: string;
}

function computeSteps(): AddBinaryStep[] {
  const steps: AddBinaryStep[] = [];
  let i = A.length - 1;
  let j = B.length - 1;
  let carry = 0;
  const result: string[] = [];

  steps.push({
    a: A,
    b: B,
    i: -1,
    j: -1,
    carry: 0,
    result: '',
    explanation: `Start: Add binary "${A}" + "${B}"`,
  });

  while (i >= 0 || j >= 0 || carry > 0) {
    const digitA = i >= 0 ? parseInt(A[i], 10) : 0;
    const digitB = j >= 0 ? parseInt(B[j], 10) : 0;
    const sum = digitA + digitB + carry;

    steps.push({
      a: A,
      b: B,
      i,
      j,
      carry,
      result: result.join(''),
      explanation: `${digitA} + ${digitB} + ${carry} = ${sum}`,
    });

    result.unshift((sum % 2).toString());
    carry = Math.floor(sum / 2);

    steps.push({
      a: A,
      b: B,
      i,
      j,
      carry,
      result: result.join(''),
      explanation: `Result bit: ${sum % 2}, carry: ${carry}`,
    });

    i--;
    j--;
  }

  steps.push({
    a: A,
    b: B,
    i: -1,
    j: -1,
    carry: 0,
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

export default function AddBinaryViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { a, b, i, j, carry, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Add Binary</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {carry > 0 && <p className="text-yellow-400 text-sm mt-1">Carry: {carry}</p>}
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Result: &quot;{result}&quot;</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Binary 1: &quot;{a}&quot;</h3>
            <div className="flex gap-2 justify-center">
              {a.split('').map((bit, idx) => {
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
                    {bit}
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Binary 2: &quot;{b}&quot;</h3>
            <div className="flex gap-2 justify-center">
              {b.split('').map((bit, idx) => {
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
                    {bit}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {result && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Result</h3>
            <div className="flex gap-2 justify-center">
              {result.split('').map((bit, idx) => (
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
                  {bit}
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
