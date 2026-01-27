'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [4, 3, 2, 7, 8, 2, 3, 1];

interface DuplicateStep {
  arr: number[];
  index: number;
  num: number;
  absNum: number;
  duplicates: number[];
  explanation: string;
}

function computeSteps(): DuplicateStep[] {
  const steps: DuplicateStep[] = [];
  const arr = [...ARRAY];
  const duplicates: number[] = [];
  
  steps.push({
    arr: [...arr],
    index: -1,
    num: 0,
    absNum: 0,
    duplicates: [],
    explanation: 'Start: Find all duplicates using negative marking',
  });
  
  for (let i = 0; i < arr.length; i++) {
    const num = Math.abs(arr[i]);
    const absNum = num;
    
    steps.push({
      arr: [...arr],
      index: i,
      num,
      absNum,
      duplicates: [...duplicates],
      explanation: `Check index ${i}, value = ${arr[i]}, abs = ${absNum}`,
    });
    
    if (arr[absNum - 1] < 0) {
      duplicates.push(absNum);
      steps.push({
        arr: [...arr],
        index: i,
        num,
        absNum,
        duplicates: [...duplicates],
        explanation: `arr[${absNum - 1}] is negative → ${absNum} is duplicate`,
      });
    } else {
      arr[absNum - 1] = -arr[absNum - 1];
      steps.push({
        arr: [...arr],
        index: i,
        num,
        absNum,
        duplicates: [...duplicates],
        explanation: `Mark arr[${absNum - 1}] as negative`,
      });
    }
  }
  
  steps.push({
    arr: [...arr],
    index: -1,
    num: 0,
    absNum: 0,
    duplicates: [...duplicates],
    explanation: `Complete: Found duplicates [${duplicates.join(', ')}]`,
  });
  
  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  duplicate: '#ef4444',
  marked: '#22c55e',
  default: '#3b82f6',
} as const;

export default function FindDuplicatesViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, index, duplicates, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Find All Duplicates</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Duplicates: [{duplicates.join(', ')}]
          </p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array</h3>
          <div className="flex gap-2 justify-center flex-wrap">
            {arr.map((n, idx) => {
              const isCurrent = index === idx;
              const isMarked = n < 0;
              const isDuplicate = duplicates.includes(Math.abs(n));
              
              let bgColor: string = COLORS.default;
              if (isCurrent) {
                bgColor = COLORS.current;
              } else if (isDuplicate) {
                bgColor = COLORS.duplicate;
              } else if (isMarked) {
                bgColor = COLORS.marked;
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
                  {Math.abs(n)}
                </motion.div>
              );
            })}
          </div>
        </div>

        {duplicates.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Duplicates Found</h3>
            <div className="flex gap-2 justify-center">
              {duplicates.map((n, i) => (
                <motion.div
                  key={i}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: COLORS.duplicate,
                    borderColor: COLORS.duplicate,
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
