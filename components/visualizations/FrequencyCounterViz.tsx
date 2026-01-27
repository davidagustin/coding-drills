'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = ['a', 'b', 'a', 'c', 'b', 'a'];

interface FrequencyStep {
  arr: string[];
  freq: Record<string, number>;
  i: number;
  explanation: string;
}

function computeSteps(): FrequencyStep[] {
  const steps: FrequencyStep[] = [];
  const freq: Record<string, number> = {};

  steps.push({
    arr: [...ARRAY],
    freq: {},
    i: -1,
    explanation: `Start: Count frequency of each element`,
  });

  for (let i = 0; i < ARRAY.length; i++) {
    const val = ARRAY[i];
    freq[val] = (freq[val] || 0) + 1;
    steps.push({
      arr: [...ARRAY],
      freq: { ...freq },
      i,
      explanation: `Index ${i}: '${val}' → count = ${freq[val]}`,
    });
  }

  steps.push({
    arr: [...ARRAY],
    freq: { ...freq },
    i: -1,
    explanation: `Complete: Frequency map built`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function FrequencyCounterViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, freq, i, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Frequency Counter</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Original Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Original Array</h3>
          <div className="flex gap-2 flex-wrap">
            {arr.map((val, idx) => {
              const isCurrent = idx === i;
              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                    isCurrent
                      ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  {val}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Frequency Map */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Frequency Map</h3>
          <div className="flex gap-2 flex-wrap">
            {Object.keys(freq).length === 0 ? (
              <div className="text-zinc-500 text-sm">Empty</div>
            ) : (
              Object.entries(freq).map(([key, count]) => (
                <motion.div
                  key={key}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-4 py-2 rounded-lg bg-green-500/20 border-2 border-green-500 flex flex-col items-center"
                >
                  <span className="text-green-400 font-mono text-lg font-semibold">{key}</span>
                  <span className="text-green-300 text-xs">count: {count}</span>
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
