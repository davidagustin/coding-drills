'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

interface Item {
  n: number;
}

const ARRAY: Item[] = [{ n: 1 }, { n: 3 }, { n: 2 }];

const KEY_FN = (item: Item) => item.n;

interface MaxByStep {
  arr: Item[];
  max: Item | null;
  maxKey: number;
  i: number;
  explanation: string;
}

function computeSteps(): MaxByStep[] {
  const steps: MaxByStep[] = [];
  let max: Item | null = null;
  let maxKey = -Infinity;

  steps.push({
    arr: [...ARRAY],
    max: null,
    maxKey: -Infinity,
    i: -1,
    explanation: `Start: Find element with maximum key value`,
  });

  for (let i = 0; i < ARRAY.length; i++) {
    const item = ARRAY[i];
    const key = KEY_FN(item);
    if (key > maxKey) {
      max = item;
      maxKey = key;
      steps.push({
        arr: [...ARRAY],
        max: { ...max },
        maxKey,
        i,
        explanation: `Index ${i}: key(${item.n}) = ${key} > current max → new max`,
      });
    } else {
      steps.push({
        arr: [...ARRAY],
        max: max ? { ...max } : null,
        maxKey,
        i,
        explanation: `Index ${i}: key(${item.n}) = ${key} <= current max → keep current`,
      });
    }
  }

  steps.push({
    arr: [...ARRAY],
    max: max ? { ...max } : null,
    maxKey,
    i: -1,
    explanation: `Complete: Max element = {n: ${maxKey}}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function MaxByViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, max, maxKey, i, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Max By Key</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Original Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Original Array</h3>
          <div className="flex gap-2 flex-wrap">
            {arr.map((item, idx) => {
              const isCurrent = idx === i;
              const key = KEY_FN(item);
              const isMax = max && item.n === max.n;
              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  className={`px-4 py-2 rounded-lg border-2 flex flex-col items-center ${
                    isMax
                      ? 'bg-green-500/20 border-green-500'
                      : isCurrent
                        ? 'bg-yellow-500/20 border-yellow-500'
                        : 'bg-zinc-800 border-zinc-700'
                  }`}
                >
                  <span
                    className={`font-mono text-sm ${isMax ? 'text-green-400' : 'text-zinc-300'}`}
                  >
                    {item.n}
                  </span>
                  <span className="text-xs text-zinc-500">key: {key}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Current Max */}
        {max && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Current Max</h3>
            <div className="flex gap-2">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="px-6 py-4 rounded-lg bg-green-500/20 border-2 border-green-500 flex flex-col items-center"
              >
                <span className="text-green-400 font-mono text-lg font-semibold">{max.n}</span>
                <span className="text-green-300 text-xs">key: {maxKey}</span>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
