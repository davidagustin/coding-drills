'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [1, 3, 5, 7, 9];
const TARGET = 5;

interface LowerBoundStep {
  arr: number[];
  target: number;
  lo: number;
  hi: number;
  mid: number;
  explanation: string;
}

function computeSteps(): LowerBoundStep[] {
  const steps: LowerBoundStep[] = [];
  let lo = 0;
  let hi = ARRAY.length;

  steps.push({
    arr: [...ARRAY],
    target: TARGET,
    lo,
    hi,
    mid: -1,
    explanation: `Start: Find lower bound (first index >= ${TARGET})`,
  });

  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    steps.push({
      arr: [...ARRAY],
      target: TARGET,
      lo,
      hi,
      mid,
      explanation: `mid = ${mid}, arr[${mid}] = ${ARRAY[mid]}`,
    });

    if (ARRAY[mid] < TARGET) {
      lo = mid + 1;
      steps.push({
        arr: [...ARRAY],
        target: TARGET,
        lo,
        hi,
        mid,
        explanation: `${ARRAY[mid]} < ${TARGET} → search right (lo = ${lo})`,
      });
    } else {
      hi = mid;
      steps.push({
        arr: [...ARRAY],
        target: TARGET,
        lo,
        hi,
        mid,
        explanation: `${ARRAY[mid]} >= ${TARGET} → search left (hi = ${hi})`,
      });
    }
  }

  steps.push({
    arr: [...ARRAY],
    target: TARGET,
    lo,
    hi,
    mid: -1,
    explanation: `Complete: Lower bound = ${lo}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function LowerBoundViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, target, lo, hi, mid, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Lower Bound (Binary Search)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        <p className="text-zinc-400 text-xs mt-1">
          Target: {target}, Range: [{lo}, {hi})
        </p>
      </div>

      <div className="space-y-6">
        {/* Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Array</h3>
          <div className="flex gap-2 flex-wrap">
            {arr.map((val, idx) => {
              const isLo = idx === lo;
              const isHi = idx === hi;
              const isMid = idx === mid;
              const isTarget = val === target;
              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    scale: isMid ? 1.1 : 1,
                  }}
                  className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                    isTarget
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : isMid
                        ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                        : isLo || isHi
                          ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  {val}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
