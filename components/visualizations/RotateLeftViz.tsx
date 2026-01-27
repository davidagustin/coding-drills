'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [1, 2, 3, 4, 5];
const K = 2;

interface RotateStep {
  arr: number[];
  result: number[];
  k: number;
  effectiveShift: number;
  explanation: string;
}

function computeSteps(): RotateStep[] {
  const steps: RotateStep[] = [];
  const effectiveShift = K % ARRAY.length;

  steps.push({
    arr: [...ARRAY],
    result: [],
    k: K,
    effectiveShift,
    explanation: `Start: Rotate array left by ${K} positions`,
  });

  const result = [...ARRAY.slice(effectiveShift), ...ARRAY.slice(0, effectiveShift)];

  steps.push({
    arr: [...ARRAY],
    result: [...result],
    k: K,
    effectiveShift,
    explanation: `Effective shift: ${K} % ${ARRAY.length} = ${effectiveShift}`,
  });

  steps.push({
    arr: [...ARRAY],
    result: [...result],
    k: K,
    effectiveShift,
    explanation: `Slice [${effectiveShift}..end]: [${ARRAY.slice(effectiveShift).join(', ')}]`,
  });

  steps.push({
    arr: [...ARRAY],
    result: [...result],
    k: K,
    effectiveShift,
    explanation: `Slice [0..${effectiveShift}]: [${ARRAY.slice(0, effectiveShift).join(', ')}]`,
  });

  steps.push({
    arr: [...ARRAY],
    result: [...result],
    k: K,
    effectiveShift,
    explanation: `Complete: Result = [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function RotateLeftViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, result, k, effectiveShift, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Rotate Array Left</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        {step > 0 && step < STEPS.length - 1 && (
          <p className="text-zinc-400 text-xs mt-1">
            k = {k}, effective shift = {effectiveShift}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {/* Original Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Original Array</h3>
          <div className="flex gap-2 flex-wrap">
            {arr.map((val, idx) => {
              const isShiftPoint = idx === effectiveShift && step >= 2 && step < 4;
              return (
                <motion.div
                  key={idx}
                  className="relative"
                  initial={false}
                  animate={{
                    scale: isShiftPoint ? 1.1 : 1,
                  }}
                >
                  <div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                      isShiftPoint
                        ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                    }`}
                  >
                    {val}
                  </div>
                  <div className="text-xs text-zinc-500 text-center mt-1">{idx}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Result Array */}
        {result.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Result Array</h3>
            <div className="flex gap-2 flex-wrap">
              {result.map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="w-16 h-16 rounded-lg bg-green-500/20 border-2 border-green-500 flex items-center justify-center font-mono text-lg font-semibold text-green-400"
                >
                  {val}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
