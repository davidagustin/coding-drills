'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [1, 2, 3, 4, 5, 6, 7];
const K = 3;

interface RotateStep {
  arr: number[];
  k: number;
  i: number;
  j: number;
  explanation: string;
}

function computeSteps(): RotateStep[] {
  const steps: RotateStep[] = [];
  const arr = [...ARRAY];
  const n = arr.length;
  const k = K % n;

  steps.push({
    arr: [...arr],
    k,
    i: -1,
    j: -1,
    explanation: `Start: Rotate array right by ${K} positions (effective: ${k})`,
  });

  function reverse(start: number, end: number): void {
    while (start < end) {
      steps.push({
        arr: [...arr],
        k,
        i: start,
        j: end,
        explanation: `Reverse: swap arr[${start}]=${arr[start]} and arr[${end}]=${arr[end]}`,
      });
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  }

  steps.push({
    arr: [...arr],
    k,
    i: -1,
    j: -1,
    explanation: 'Step 1: Reverse entire array',
  });
  reverse(0, n - 1);

  steps.push({
    arr: [...arr],
    k,
    i: -1,
    j: -1,
    explanation: `Step 2: Reverse first ${k} elements`,
  });
  reverse(0, k - 1);

  steps.push({
    arr: [...arr],
    k,
    i: -1,
    j: -1,
    explanation: `Step 3: Reverse remaining ${n - k} elements`,
  });
  reverse(k, n - 1);

  steps.push({
    arr: [...arr],
    k,
    i: -1,
    j: -1,
    explanation: `Complete: Rotated [${arr.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  swapping: '#22c55e',
  default: '#3b82f6',
} as const;

export default function RotateArrayViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, i, j, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Rotate Array</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Result: [{arr.join(', ')}]</p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array</h3>
        <div className="flex gap-2 justify-center">
          {arr.map((n, idx) => {
            let bgColor: string = COLORS.default;
            if (idx === i || idx === j) {
              bgColor = COLORS.swapping;
            }

            return (
              <motion.div
                key={idx}
                className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: bgColor,
                  borderColor: idx === i || idx === j ? '#fff' : bgColor,
                }}
                animate={{
                  scale: idx === i || idx === j ? 1.2 : 1,
                }}
              >
                {n}
              </motion.div>
            );
          })}
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
