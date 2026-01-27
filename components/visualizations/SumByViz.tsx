'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

interface Item {
  n: number;
}

const ARRAY: Item[] = [{ n: 4 }, { n: 2 }, { n: 8 }];

const VALUE_FN = (item: Item) => item.n;

interface SumByStep {
  arr: Item[];
  sum: number;
  i: number;
  explanation: string;
}

function computeSteps(): SumByStep[] {
  const steps: SumByStep[] = [];
  let sum = 0;

  steps.push({
    arr: [...ARRAY],
    sum: 0,
    i: -1,
    explanation: `Start: Sum values extracted by value function`,
  });

  for (let i = 0; i < ARRAY.length; i++) {
    const val = VALUE_FN(ARRAY[i]);
    sum += val;
    steps.push({
      arr: [...ARRAY],
      sum,
      i,
      explanation: `Index ${i}: Extract ${val} from {n: ${ARRAY[i].n}} → sum = ${sum}`,
    });
  }

  steps.push({
    arr: [...ARRAY],
    sum,
    i: -1,
    explanation: `Complete: Total sum = ${sum}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function SumByViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, sum, i, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Sum By Key</h2>

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
              const extracted = VALUE_FN(item);
              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  className={`px-4 py-2 rounded-lg border-2 flex flex-col items-center ${
                    isCurrent ? 'bg-yellow-500/20 border-yellow-500' : 'bg-zinc-800 border-zinc-700'
                  }`}
                >
                  <span className="text-zinc-300 font-mono text-sm">{item.n}</span>
                  {isCurrent && <span className="text-yellow-400 text-xs mt-1">→ {extracted}</span>}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Running Sum */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Running Sum</h3>
          <div className="flex items-center gap-4">
            <motion.div
              initial={false}
              animate={{
                scale: step === STEPS.length - 1 ? 1.1 : 1,
              }}
              className="px-6 py-4 rounded-lg bg-green-500/20 border-2 border-green-500"
            >
              <span className="text-green-400 font-mono text-2xl font-bold">{sum}</span>
            </motion.div>
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
