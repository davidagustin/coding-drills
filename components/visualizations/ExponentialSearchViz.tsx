'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [1, 3, 5, 7, 9, 11, 13, 15];
const TARGET = 7;

interface ExponentialSearchStep {
  arr: number[];
  target: number;
  bound: number;
  phase: 'exponential' | 'binary';
  lo: number;
  hi: number;
  mid: number;
  explanation: string;
}

function computeSteps(): ExponentialSearchStep[] {
  const steps: ExponentialSearchStep[] = [];
  let bound = 1;

  steps.push({
    arr: [...ARRAY],
    target: TARGET,
    bound: 0,
    phase: 'exponential',
    lo: -1,
    hi: -1,
    mid: -1,
    explanation: `Start: Exponential search for ${TARGET}`,
  });

  if (ARRAY[0] === TARGET) {
    steps.push({
      arr: [...ARRAY],
      target: TARGET,
      bound: 0,
      phase: 'exponential',
      lo: -1,
      hi: -1,
      mid: -1,
      explanation: `Found at index 0`,
    });
    return steps;
  }

  while (bound < ARRAY.length && ARRAY[bound] < TARGET) {
    steps.push({
      arr: [...ARRAY],
      target: TARGET,
      bound,
      phase: 'exponential',
      lo: -1,
      hi: -1,
      mid: -1,
      explanation: `Bound ${bound}: arr[${bound}] = ${ARRAY[bound]} < ${TARGET} → double bound`,
    });
    bound *= 2;
  }

  steps.push({
    arr: [...ARRAY],
    target: TARGET,
    bound,
    phase: 'exponential',
    lo: -1,
    hi: -1,
    mid: -1,
    explanation: `Bound ${bound}: arr[${bound}] >= ${TARGET} or bound >= length → binary search in [${Math.floor(bound / 2)}, ${Math.min(bound, ARRAY.length - 1)}]`,
  });

  let lo = Math.floor(bound / 2);
  let hi = Math.min(bound, ARRAY.length - 1);

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    steps.push({
      arr: [...ARRAY],
      target: TARGET,
      bound,
      phase: 'binary',
      lo,
      hi,
      mid,
      explanation: `Binary search: mid = ${mid}, arr[${mid}] = ${ARRAY[mid]}`,
    });

    if (ARRAY[mid] === TARGET) {
      steps.push({
        arr: [...ARRAY],
        target: TARGET,
        bound,
        phase: 'binary',
        lo,
        hi,
        mid,
        explanation: `Found! Index = ${mid}`,
      });
      return steps;
    }

    if (ARRAY[mid] < TARGET) {
      lo = mid + 1;
      steps.push({
        arr: [...ARRAY],
        target: TARGET,
        bound,
        phase: 'binary',
        lo,
        hi,
        mid,
        explanation: `${ARRAY[mid]} < ${TARGET} → search right`,
      });
    } else {
      hi = mid - 1;
      steps.push({
        arr: [...ARRAY],
        target: TARGET,
        bound,
        phase: 'binary',
        lo,
        hi,
        mid,
        explanation: `${ARRAY[mid]} > ${TARGET} → search left`,
      });
    }
  }

  steps.push({
    arr: [...ARRAY],
    target: TARGET,
    bound,
    phase: 'binary',
    lo,
    hi,
    mid: -1,
    explanation: `Not found`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function ExponentialSearchViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, target, bound, phase, lo, hi, mid, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Exponential Search</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        <p className="text-zinc-400 text-xs mt-1">
          Phase: {phase === 'exponential' ? 'Exponential Growth' : 'Binary Search'}
        </p>
      </div>

      <div className="space-y-6">
        {/* Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Array</h3>
          <div className="flex gap-2 flex-wrap">
            {arr.map((val, idx) => {
              const isBound = phase === 'exponential' && idx === bound;
              const isInRange = phase === 'binary' && idx >= lo && idx <= hi;
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
                        : isBound
                          ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                          : isInRange
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
