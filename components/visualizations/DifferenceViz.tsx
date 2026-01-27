'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY1 = [1, 2, 3, 4, 5];
const ARRAY2 = [2, 4];

interface DifferenceStep {
  arr1: number[];
  arr2: number[];
  set: Set<number>;
  result: number[];
  i: number;
  phase: 'build-set' | 'filter' | 'complete';
  explanation: string;
}

function computeSteps(): DifferenceStep[] {
  const steps: DifferenceStep[] = [];
  const set = new Set(ARRAY2);
  const result: number[] = [];

  steps.push({
    arr1: [...ARRAY1],
    arr2: [...ARRAY2],
    set: new Set(),
    result: [],
    i: -1,
    phase: 'build-set',
    explanation: `Start: Find elements in arr1 not in arr2`,
  });

  steps.push({
    arr1: [...ARRAY1],
    arr2: [...ARRAY2],
    set: new Set(set),
    result: [],
    i: -1,
    phase: 'build-set',
    explanation: `Build Set from arr2: {${Array.from(set).join(', ')}}`,
  });

  for (let i = 0; i < ARRAY1.length; i++) {
    const val = ARRAY1[i];
    const inSet = set.has(val);
    if (!inSet) {
      result.push(val);
      steps.push({
        arr1: [...ARRAY1],
        arr2: [...ARRAY2],
        set: new Set(set),
        result: [...result],
        i,
        phase: 'filter',
        explanation: `Index ${i}: ${val} not in Set → add to result`,
      });
    } else {
      steps.push({
        arr1: [...ARRAY1],
        arr2: [...ARRAY2],
        set: new Set(set),
        result: [...result],
        i,
        phase: 'filter',
        explanation: `Index ${i}: ${val} in Set → skip`,
      });
    }
  }

  steps.push({
    arr1: [...ARRAY1],
    arr2: [...ARRAY2],
    set: new Set(set),
    result: [...result],
    i: -1,
    phase: 'complete',
    explanation: `Complete: Result = [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function DifferenceViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr1, arr2, set, result, i, phase, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Array Difference</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Arrays */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Array 1</h3>
            <div className="flex gap-2 flex-wrap">
              {arr1.map((val, idx) => {
                const isCurrent = idx === i && phase === 'filter';
                const inSet = set.has(val);
                return (
                  <motion.div
                    key={idx}
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.1 : 1,
                    }}
                    className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                      isCurrent
                        ? inSet
                          ? 'bg-red-500/20 border-red-500 text-red-400'
                          : 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                    }`}
                  >
                    {val}
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Array 2 (Exclusion Set)</h3>
            <div className="flex gap-2 flex-wrap">
              {arr2.map((val, idx) => (
                <div
                  key={idx}
                  className="w-16 h-16 rounded-lg bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center font-mono text-lg font-semibold text-purple-400"
                >
                  {val}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Result Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Result Array</h3>
          <div className="flex gap-2 flex-wrap">
            {result.length === 0 ? (
              <div className="text-zinc-500 text-sm">Empty</div>
            ) : (
              result.map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-16 h-16 rounded-lg bg-green-500/20 border-2 border-green-500 flex items-center justify-center font-mono text-lg font-semibold text-green-400"
                >
                  {val}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
