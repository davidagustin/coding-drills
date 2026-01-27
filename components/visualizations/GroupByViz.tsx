'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

interface Item {
  type: string;
  val: number;
}

const ARRAY: Item[] = [
  { type: 'a', val: 1 },
  { type: 'b', val: 2 },
  { type: 'a', val: 3 },
];

const KEY_FN = (item: Item) => item.type;

interface GroupByStep {
  arr: Item[];
  groups: Record<string, Item[]>;
  i: number;
  explanation: string;
}

function computeSteps(): GroupByStep[] {
  const steps: GroupByStep[] = [];
  const groups: Record<string, Item[]> = {};

  steps.push({
    arr: [...ARRAY],
    groups: {},
    i: -1,
    explanation: `Start: Group elements by key function (type)`,
  });

  for (let i = 0; i < ARRAY.length; i++) {
    const item = ARRAY[i];
    const key = KEY_FN(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    steps.push({
      arr: [...ARRAY],
      groups: Object.fromEntries(Object.entries(groups).map(([k, v]) => [k, [...v]])),
      i,
      explanation: `Index ${i}: Add {type: '${key}', val: ${item.val}} to group '${key}'`,
    });
  }

  steps.push({
    arr: [...ARRAY],
    groups: Object.fromEntries(Object.entries(groups).map(([k, v]) => [k, [...v]])),
    i: -1,
    explanation: `Complete: ${Object.keys(groups).length} groups created`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function GroupByViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, groups, i, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Group By Key</h2>

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
                  <span className="text-zinc-300 font-mono text-sm">{item.type}</span>
                  <span className="text-zinc-400 text-xs">val: {item.val}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Groups */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Groups</h3>
          <div className="space-y-3">
            {Object.keys(groups).length === 0 ? (
              <div className="text-zinc-500 text-sm">No groups yet</div>
            ) : (
              Object.entries(groups).map(([key, items]) => (
                <div key={key} className="space-y-2">
                  <div className="text-xs text-zinc-500 font-medium">Group &apos;{key}&apos;:</div>
                  <div className="flex gap-2 flex-wrap">
                    {items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="px-4 py-2 rounded-lg bg-green-500/20 border-2 border-green-500 flex flex-col items-center"
                      >
                        <span className="text-green-400 font-mono text-sm">{item.type}</span>
                        <span className="text-green-300 text-xs">val: {item.val}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
