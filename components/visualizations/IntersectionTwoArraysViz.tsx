'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARR1 = [1, 2, 2, 1];
const ARR2 = [2, 2];

interface IntersectionStep {
  arr1: number[];
  arr2: number[];
  freq: Record<number, number>;
  result: number[];
  current: number;
  explanation: string;
}

function computeSteps(): IntersectionStep[] {
  const steps: IntersectionStep[] = [];
  const freq: Record<number, number> = {};
  const result: number[] = [];

  steps.push({
    arr1: [...ARR1],
    arr2: [...ARR2],
    freq: {},
    result: [],
    current: -1,
    explanation: 'Start: Find intersection of two arrays',
  });

  for (const num of ARR1) {
    freq[num] = (freq[num] || 0) + 1;
    steps.push({
      arr1: [...ARR1],
      arr2: [...ARR2],
      freq: { ...freq },
      result: [],
      current: num,
      explanation: `Count ${num}: freq[${num}] = ${freq[num]}`,
    });
  }

  for (const num of ARR2) {
    steps.push({
      arr1: [...ARR1],
      arr2: [...ARR2],
      freq: { ...freq },
      result: [...result],
      current: num,
      explanation: `Check ${num} in arr2`,
    });

    if (freq[num] && freq[num] > 0) {
      result.push(num);
      freq[num]--;
      steps.push({
        arr1: [...ARR1],
        arr2: [...ARR2],
        freq: { ...freq },
        result: [...result],
        current: num,
        explanation: `Add ${num} to result, decrement freq[${num}]`,
      });
    }
  }

  steps.push({
    arr1: [...ARR1],
    arr2: [...ARR2],
    freq: { ...freq },
    result: [...result],
    current: -1,
    explanation: `Complete: Intersection = [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  matched: '#22c55e',
  default: '#3b82f6',
} as const;

export default function IntersectionTwoArraysViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr1, arr2, result, current, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Intersection of Two Arrays</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Result: [{result.join(', ')}]</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array 1</h3>
            <div className="flex gap-2 justify-center">
              {arr1.map((n, idx) => {
                const isCurrent = current === n && step < STEPS.length - 1;
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
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array 2</h3>
            <div className="flex gap-2 justify-center">
              {arr2.map((n, idx) => {
                const isCurrent = current === n && step >= ARR1.length;
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
        </div>

        {result.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Intersection</h3>
            <div className="flex gap-2 justify-center">
              {result.map((n, idx) => (
                <motion.div
                  key={idx}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: COLORS.matched,
                    borderColor: COLORS.matched,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {n}
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
