'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY1 = [1, 2, 3];
const ARRAY2 = ['a', 'b', 'c'];

interface InterleaveStep {
  arr1: (number | string)[];
  arr2: (number | string)[];
  result: (number | string)[];
  i: number;
  explanation: string;
}

function computeSteps(): InterleaveStep[] {
  const steps: InterleaveStep[] = [];
  const result: (number | string)[] = [];
  const longerLength = Math.max(ARRAY1.length, ARRAY2.length);

  steps.push({
    arr1: [...ARRAY1],
    arr2: [...ARRAY2],
    result: [],
    i: -1,
    explanation: `Start: Interleave arrays [${ARRAY1.join(', ')}] and [${ARRAY2.join(', ')}]`,
  });

  for (let i = 0; i < longerLength; i++) {
    if (i < ARRAY1.length) {
      result.push(ARRAY1[i]);
      steps.push({
        arr1: [...ARRAY1],
        arr2: [...ARRAY2],
        result: [...result],
        i,
        explanation: `Index ${i}: Add arr1[${i}] = ${ARRAY1[i]}`,
      });
    }
    if (i < ARRAY2.length) {
      result.push(ARRAY2[i]);
      steps.push({
        arr1: [...ARRAY1],
        arr2: [...ARRAY2],
        result: [...result],
        i,
        explanation: `Index ${i}: Add arr2[${i}] = ${ARRAY2[i]}`,
      });
    }
  }

  steps.push({
    arr1: [...ARRAY1],
    arr2: [...ARRAY2],
    result: [...result],
    i: -1,
    explanation: `Complete: Result = [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function InterleaveViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr1, arr2, result, i, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Interleave Arrays</h2>

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
                const isCurrent = idx === i && step % 2 === 1;
                return (
                  <motion.div
                    key={idx}
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.1 : 1,
                    }}
                    className="w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 bg-blue-500/20 border-blue-500 text-blue-400"
                  >
                    {val}
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Array 2</h3>
            <div className="flex gap-2 flex-wrap">
              {arr2.map((val, idx) => {
                const isCurrent = idx === i && step % 2 === 0 && step > 0;
                return (
                  <motion.div
                    key={idx}
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.1 : 1,
                    }}
                    className="w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 bg-purple-500/20 border-purple-500 text-purple-400"
                  >
                    {val}
                  </motion.div>
                );
              })}
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
                  className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono text-lg font-semibold ${
                    typeof val === 'number'
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-purple-500/20 border-purple-500 text-purple-400'
                  }`}
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
