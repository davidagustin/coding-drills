'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [2, 7, 11, 15];
const TARGET = 9;

interface TwoSumStep {
  arr: number[];
  target: number;
  map: Record<number, number>;
  i: number;
  complement: number | null;
  result: number[] | null;
  explanation: string;
}

function computeSteps(): TwoSumStep[] {
  const steps: TwoSumStep[] = [];
  const map: Record<number, number> = {};
  let result: number[] | null = null;

  steps.push({
    arr: [...ARRAY],
    target: TARGET,
    map: {},
    i: -1,
    complement: null,
    result: null,
    explanation: `Start: Find two numbers that sum to ${TARGET}`,
  });

  for (let i = 0; i < ARRAY.length; i++) {
    const num = ARRAY[i];
    const complement = TARGET - num;

    steps.push({
      arr: [...ARRAY],
      target: TARGET,
      map: { ...map },
      i,
      complement,
      result: null,
      explanation: `Check index ${i}: num=${num}, complement=${complement}`,
    });

    if (complement in map) {
      result = [map[complement], i];
      steps.push({
        arr: [...ARRAY],
        target: TARGET,
        map: { ...map },
        i,
        complement,
        result,
        explanation: `Found! ${ARRAY[map[complement]]} + ${num} = ${TARGET}`,
      });
      break;
    }

    map[num] = i;
    steps.push({
      arr: [...ARRAY],
      target: TARGET,
      map: { ...map },
      i,
      complement: null,
      result: null,
      explanation: `Add ${num} to map at index ${i}`,
    });
  }

  steps.push({
    arr: [...ARRAY],
    target: TARGET,
    map: { ...map },
    i: -1,
    complement: null,
    result,
    explanation: result
      ? `Complete: Indices [${result[0]}, ${result[1]}]`
      : 'Complete: No solution found',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  found: '#22c55e',
  default: '#3b82f6',
} as const;

export default function TwoSumViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, map, i, complement, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Two Sum</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {result && step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Result: Indices [{result[0]}, {result[1]}]
          </p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array</h3>
          <div className="flex gap-2 justify-center">
            {arr.map((n, idx) => {
              const isCurrent = i === idx;
              const inResult = result && (result[0] === idx || result[1] === idx);

              let bgColor: string = COLORS.default;
              if (inResult && step === STEPS.length - 1) {
                bgColor = COLORS.found;
              } else if (isCurrent) {
                bgColor = COLORS.current;
              }

              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <motion.div
                    className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                    style={{
                      backgroundColor: bgColor,
                      borderColor: isCurrent || inResult ? '#fff' : bgColor,
                    }}
                    animate={{
                      scale: isCurrent || inResult ? 1.2 : 1,
                    }}
                  >
                    {n}
                  </motion.div>
                  <div className="text-xs text-zinc-500">{idx}</div>
                </div>
              );
            })}
          </div>
        </div>

        {complement !== null && (
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-white text-sm">Looking for complement: {complement}</p>
          </div>
        )}

        {Object.keys(map).length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Map (value → index)</h3>
            <div className="flex gap-2 justify-center flex-wrap">
              {Object.entries(map).map(([val, idx]) => (
                <div
                  key={val}
                  className="px-3 py-2 rounded-lg border-2 flex flex-col items-center"
                  style={{
                    backgroundColor: `${COLORS.default}20`,
                    borderColor: COLORS.default,
                  }}
                >
                  <div className="text-white font-mono font-bold">{val}</div>
                  <div className="text-zinc-400 text-xs">→ {idx}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
