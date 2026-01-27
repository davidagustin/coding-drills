'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [3, 2, 2, 3];
const VAL = 3;

interface RemoveElementStep {
  arr: number[];
  val: number;
  i: number;
  j: number;
  length: number;
  explanation: string;
}

function computeSteps(): RemoveElementStep[] {
  const steps: RemoveElementStep[] = [];
  const arr = [...ARRAY];

  steps.push({
    arr: [...arr],
    val: VAL,
    i: 0,
    j: 0,
    length: arr.length,
    explanation: `Start: Remove all occurrences of ${VAL}`,
  });

  let i = 0;
  for (let j = 0; j < arr.length; j++) {
    steps.push({
      arr: [...arr],
      val: VAL,
      i,
      j,
      length: i,
      explanation: `Check arr[${j}]=${arr[j]}`,
    });

    if (arr[j] !== VAL) {
      arr[i] = arr[j];
      steps.push({
        arr: [...arr],
        val: VAL,
        i: i + 1,
        j,
        length: i + 1,
        explanation: `Keep ${arr[j]}, move to position ${i}`,
      });
      i++;
    } else {
      steps.push({
        arr: [...arr],
        val: VAL,
        i,
        j,
        length: i,
        explanation: `Remove ${arr[j]}`,
      });
    }
  }

  steps.push({
    arr: arr.slice(0, i),
    val: VAL,
    i: -1,
    j: -1,
    length: i,
    explanation: `Complete: Length = ${i}, array = [${arr.slice(0, i).join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  kept: '#22c55e',
  removed: '#ef4444',
  default: '#3b82f6',
} as const;

export default function RemoveElementViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, val, i, j, length, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Remove Element</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Length: {length}</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array</h3>
          <div className="flex gap-2 justify-center">
            {ARRAY.map((n, idx) => {
              const isCurrent = (i === idx || j === idx) && step < STEPS.length - 1;
              const isRemoved = n === val;
              const isKept = idx < i && step < STEPS.length - 1;

              let bgColor: string = COLORS.default;
              if (isCurrent) {
                bgColor = COLORS.current;
              } else if (isRemoved && step < STEPS.length - 1) {
                bgColor = COLORS.removed;
              } else if (isKept) {
                bgColor = COLORS.kept;
              }

              return (
                <motion.div
                  key={idx}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: isCurrent ? '#fff' : bgColor,
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

        {step === STEPS.length - 1 && arr.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Result Array</h3>
            <div className="flex gap-2 justify-center">
              {arr.map((n, idx) => (
                <motion.div
                  key={idx}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: COLORS.kept,
                    borderColor: COLORS.kept,
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
