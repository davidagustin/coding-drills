'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const PAIRS: [number, string][] = [
  [1, 'a'],
  [2, 'b'],
  [3, 'c'],
];

interface UnzipStep {
  pairs: [number, string][];
  result1: number[];
  result2: string[];
  i: number;
  phase: 'first' | 'second' | 'complete';
  explanation: string;
}

function computeSteps(): UnzipStep[] {
  const steps: UnzipStep[] = [];
  const result1: number[] = [];
  const result2: string[] = [];

  steps.push({
    pairs: PAIRS.map((p) => [...p] as [number, string]),
    result1: [],
    result2: [],
    i: -1,
    phase: 'first',
    explanation: `Start: Unzip ${PAIRS.length} pairs`,
  });

  // Extract first elements
  for (let i = 0; i < PAIRS.length; i++) {
    result1.push(PAIRS[i][0]);
    steps.push({
      pairs: PAIRS.map((p) => [...p] as [number, string]),
      result1: [...result1],
      result2: [],
      i,
      phase: 'first',
      explanation: `Extract first: pairs[${i}][0] = ${PAIRS[i][0]}`,
    });
  }

  // Extract second elements
  for (let i = 0; i < PAIRS.length; i++) {
    result2.push(PAIRS[i][1]);
    steps.push({
      pairs: PAIRS.map((p) => [...p] as [number, string]),
      result1: [...result1],
      result2: [...result2],
      i,
      phase: 'second',
      explanation: `Extract second: pairs[${i}][1] = '${PAIRS[i][1]}'`,
    });
  }

  steps.push({
    pairs: PAIRS.map((p) => [...p] as [number, string]),
    result1: [...result1],
    result2: [...result2],
    i: -1,
    phase: 'complete',
    explanation: `Complete: Array1 = [${result1.join(', ')}], Array2 = [${result2.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function UnzipPairsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { pairs, result1, result2, i, phase, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Unzip Array of Pairs</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Pairs */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Pairs</h3>
          <div className="flex gap-2 flex-wrap">
            {pairs.map((pair, idx) => {
              const isCurrent = idx === i;
              const isHighlighted = phase === 'first' ? isCurrent : phase === 'second' && isCurrent;
              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    scale: isHighlighted ? 1.1 : 1,
                  }}
                  className={`px-4 py-2 rounded-lg border-2 flex items-center gap-2 font-mono text-sm ${
                    isHighlighted && phase === 'first'
                      ? 'bg-blue-500/20 border-blue-500'
                      : isHighlighted && phase === 'second'
                        ? 'bg-purple-500/20 border-purple-500'
                        : 'bg-zinc-800 border-zinc-700'
                  }`}
                >
                  <span
                    className={
                      isHighlighted && phase === 'first' ? 'text-blue-400' : 'text-zinc-300'
                    }
                  >
                    [{pair[0]}
                  </span>
                  <span className="text-zinc-500">,</span>
                  <span
                    className={
                      isHighlighted && phase === 'second' ? 'text-purple-400' : 'text-zinc-300'
                    }
                  >
                    &apos;{pair[1]}&apos;
                  </span>
                  <span className="text-zinc-300">]</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Result Arrays */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Array 1 (First Elements)</h3>
            <div className="flex gap-2 flex-wrap">
              {result1.length === 0 ? (
                <div className="text-zinc-500 text-sm">Empty</div>
              ) : (
                result1.map((val, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-16 h-16 rounded-lg bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center font-mono text-lg font-semibold text-blue-400"
                  >
                    {val}
                  </motion.div>
                ))
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Array 2 (Second Elements)</h3>
            <div className="flex gap-2 flex-wrap">
              {result2.length === 0 ? (
                <div className="text-zinc-500 text-sm">Empty</div>
              ) : (
                result2.map((val, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-16 h-16 rounded-lg bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center font-mono text-lg font-semibold text-purple-400"
                  >
                    {val}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
