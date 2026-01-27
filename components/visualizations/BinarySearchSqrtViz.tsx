'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const TARGET = 16;

interface SqrtStep {
  target: number;
  lo: number;
  hi: number;
  mid: number;
  square: number;
  explanation: string;
}

function computeSteps(): SqrtStep[] {
  const steps: SqrtStep[] = [];
  let lo = 1;
  let hi = Math.floor(TARGET / 2);

  steps.push({
    target: TARGET,
    lo,
    hi,
    mid: -1,
    square: -1,
    explanation: `Start: Find integer sqrt of ${TARGET}`,
  });

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const square = mid * mid;
    steps.push({
      target: TARGET,
      lo,
      hi,
      mid,
      square,
      explanation: `mid = ${mid}, ${mid}² = ${square}`,
    });

    if (square === TARGET) {
      steps.push({
        target: TARGET,
        lo,
        hi,
        mid,
        square,
        explanation: `Found! ${mid}² = ${TARGET} → answer = ${mid}`,
      });
      break;
    }

    if (square < TARGET) {
      lo = mid + 1;
      steps.push({
        target: TARGET,
        lo,
        hi,
        mid,
        square,
        explanation: `${square} < ${TARGET} → search right (lo = ${lo})`,
      });
    } else {
      hi = mid - 1;
      steps.push({
        target: TARGET,
        lo,
        hi,
        mid,
        square,
        explanation: `${square} > ${TARGET} → search left (hi = ${hi})`,
      });
    }
  }

  steps.push({
    target: TARGET,
    lo,
    hi,
    mid: -1,
    square: -1,
    explanation: `Complete: Integer sqrt(${TARGET}) = ${hi}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function BinarySearchSqrtViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { target, lo, hi, mid, square, explanation } = currentStep;

  const searchSpace = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Integer Square Root via Binary Search</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        <p className="text-zinc-400 text-xs mt-1">
          Target: {target}, Search space: [{lo}, {hi}]
        </p>
      </div>

      <div className="space-y-6">
        {/* Search Space */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Search Space</h3>
          <div className="flex gap-2 flex-wrap">
            {searchSpace.map((val) => {
              const isLo = val === lo;
              const isHi = val === hi;
              const isMid = val === mid;
              const valSquare = val * val;
              const isFound = valSquare === target;
              return (
                <motion.div
                  key={val}
                  initial={false}
                  animate={{
                    scale: isMid ? 1.1 : 1,
                  }}
                  className={`px-3 py-2 rounded-lg border-2 flex flex-col items-center ${
                    isFound
                      ? 'bg-green-500/20 border-green-500'
                      : isMid
                        ? 'bg-yellow-500/20 border-yellow-500'
                        : isLo || isHi
                          ? 'bg-blue-500/20 border-blue-500'
                          : 'bg-zinc-800 border-zinc-700'
                  }`}
                >
                  <span
                    className={`font-mono text-sm ${
                      isFound ? 'text-green-400' : isMid ? 'text-yellow-400' : 'text-zinc-300'
                    }`}
                  >
                    {val}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {val}² = {valSquare}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Current Calculation */}
        {mid >= 0 && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Current Calculation</h3>
            <div className="p-4 bg-zinc-800 rounded-lg">
              <div className="text-white font-mono">
                mid = {mid}, {mid}² = {square}
              </div>
              <div className="text-zinc-400 text-sm mt-1">
                {square === target
                  ? 'Perfect match!'
                  : square < target
                    ? `${square} < ${target} → search right`
                    : `${square} > ${target} → search left`}
              </div>
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
