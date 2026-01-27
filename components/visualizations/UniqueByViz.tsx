'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

interface Item {
  id: number;
  name: string;
}

const ARRAY: Item[] = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 1, name: 'c' },
];

const KEY_FN = (item: Item) => item.id;

interface UniqueByStep {
  arr: Item[];
  seen: Set<number>;
  result: Item[];
  i: number;
  explanation: string;
}

function computeSteps(): UniqueByStep[] {
  const steps: UniqueByStep[] = [];
  const seen = new Set<number>();
  const result: Item[] = [];

  steps.push({
    arr: [...ARRAY],
    seen: new Set(),
    result: [],
    i: -1,
    explanation: `Start: Remove duplicates by key function (id)`,
  });

  for (let i = 0; i < ARRAY.length; i++) {
    const item = ARRAY[i];
    const key = KEY_FN(item);
    if (seen.has(key)) {
      steps.push({
        arr: [...ARRAY],
        seen: new Set(seen),
        result: [...result],
        i,
        explanation: `Index ${i}: id=${key} already seen → skip`,
      });
    } else {
      seen.add(key);
      result.push(item);
      steps.push({
        arr: [...ARRAY],
        seen: new Set(seen),
        result: [...result],
        i,
        explanation: `Index ${i}: id=${key} not seen → add to result`,
      });
    }
  }

  steps.push({
    arr: [...ARRAY],
    seen: new Set(seen),
    result: [...result],
    i: -1,
    explanation: `Complete: ${result.length} unique items`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function UniqueByViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, seen, result, i, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Unique By Key</h2>

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
              const isDuplicate = seen.has(key) && idx !== i;
              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  className={`px-4 py-2 rounded-lg border-2 flex flex-col items-center ${
                    isDuplicate
                      ? 'bg-red-500/20 border-red-500'
                      : isCurrent
                        ? 'bg-yellow-500/20 border-yellow-500'
                        : 'bg-zinc-800 border-zinc-700'
                  }`}
                >
                  <span className="text-zinc-300 font-mono text-sm">id: {item.id}</span>
                  <span className="text-zinc-400 text-xs">name: {item.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Result Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Result Array</h3>
          <div className="flex gap-2 flex-wrap">
            {result.length === 0 ? (
              <div className="text-zinc-500 text-sm">Empty</div>
            ) : (
              result.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-4 py-2 rounded-lg bg-green-500/20 border-2 border-green-500 flex flex-col items-center"
                >
                  <span className="text-green-400 font-mono text-sm">id: {item.id}</span>
                  <span className="text-green-300 text-xs">name: {item.name}</span>
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
