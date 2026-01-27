'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const LIST1 = [1, 2, 4];
const LIST2 = [1, 3, 4];

interface MergeListsStep {
  list1: number[];
  list2: number[];
  merged: number[];
  i: number;
  j: number;
  explanation: string;
}

function computeSteps(): MergeListsStep[] {
  const steps: MergeListsStep[] = [];
  const merged: number[] = [];
  let i = 0;
  let j = 0;

  steps.push({
    list1: [...LIST1],
    list2: [...LIST2],
    merged: [],
    i: 0,
    j: 0,
    explanation: 'Start: Merge two sorted linked lists',
  });

  while (i < LIST1.length && j < LIST2.length) {
    if (LIST1[i] <= LIST2[j]) {
      merged.push(LIST1[i]);
      steps.push({
        list1: [...LIST1],
        list2: [...LIST2],
        merged: [...merged],
        i,
        j,
        explanation: `list1[${i}]=${LIST1[i]} ≤ list2[${j}]=${LIST2[j]} → add ${LIST1[i]}`,
      });
      i++;
    } else {
      merged.push(LIST2[j]);
      steps.push({
        list1: [...LIST1],
        list2: [...LIST2],
        merged: [...merged],
        i,
        j,
        explanation: `list2[${j}]=${LIST2[j]} < list1[${i}]=${LIST1[i]} → add ${LIST2[j]}`,
      });
      j++;
    }
  }

  while (i < LIST1.length) {
    merged.push(LIST1[i]);
    steps.push({
      list1: [...LIST1],
      list2: [...LIST2],
      merged: [...merged],
      i,
      j,
      explanation: `Add remaining from list1: ${LIST1[i]}`,
    });
    i++;
  }

  while (j < LIST2.length) {
    merged.push(LIST2[j]);
    steps.push({
      list1: [...LIST1],
      list2: [...LIST2],
      merged: [...merged],
      i,
      j,
      explanation: `Add remaining from list2: ${LIST2[j]}`,
    });
    j++;
  }

  steps.push({
    list1: [...LIST1],
    list2: [...LIST2],
    merged: [...merged],
    i: -1,
    j: -1,
    explanation: `Complete: Merged list = [${merged.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  merged: '#22c55e',
  list1: '#3b82f6',
  list2: '#f97316',
} as const;

export default function MergeTwoListsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { list1, list2, merged, i, j, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Merge Two Sorted Lists</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="mb-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">List 1</h3>
            <div className="flex gap-2 justify-center">
              {list1.map((n, idx) => {
                const isCurrent = i === idx;
                return (
                  <motion.div
                    key={idx}
                    className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                    style={{
                      backgroundColor: isCurrent ? COLORS.current : COLORS.list1,
                      borderColor: isCurrent ? '#fff' : COLORS.list1,
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
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">List 2</h3>
            <div className="flex gap-2 justify-center">
              {list2.map((n, idx) => {
                const isCurrent = j === idx;
                return (
                  <motion.div
                    key={idx}
                    className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                    style={{
                      backgroundColor: isCurrent ? COLORS.current : COLORS.list2,
                      borderColor: isCurrent ? '#fff' : COLORS.list2,
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
        </div>

        {merged.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Merged List</h3>
            <div className="flex gap-2 justify-center">
              {merged.map((n, idx) => (
                <motion.div
                  key={idx}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: COLORS.merged,
                    borderColor: COLORS.merged,
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
