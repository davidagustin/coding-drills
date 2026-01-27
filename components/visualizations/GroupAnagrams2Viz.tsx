'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const STRINGS = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];

interface GroupAnagramsStep {
  strings: string[];
  groups: Record<string, string[]>;
  current: string;
  key: string;
  explanation: string;
}

function computeSteps(): GroupAnagramsStep[] {
  const steps: GroupAnagramsStep[] = [];
  const groups: Record<string, string[]> = {};

  steps.push({
    strings: [...STRINGS],
    groups: {},
    current: '',
    key: '',
    explanation: 'Start: Group anagrams',
  });

  for (const str of STRINGS) {
    const key = str.split('').sort().join('');

    steps.push({
      strings: [...STRINGS],
      groups: { ...groups },
      current: str,
      key,
      explanation: `Process "${str}": sorted key = "${key}"`,
    });

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(str);

    steps.push({
      strings: [...STRINGS],
      groups: { ...groups },
      current: str,
      key,
      explanation: `Add "${str}" to group "${key}"`,
    });
  }

  steps.push({
    strings: [...STRINGS],
    groups: { ...groups },
    current: '',
    key: '',
    explanation: `Complete: ${Object.keys(groups).length} groups`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  grouped: '#22c55e',
  default: '#3b82f6',
} as const;

export default function GroupAnagrams2Viz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { strings, groups, current, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Group Anagrams</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Strings</h3>
          <div className="flex gap-2 justify-center flex-wrap">
            {strings.map((str, idx) => {
              const isCurrent = current === str;
              return (
                <motion.div
                  key={idx}
                  className="px-4 py-2 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: isCurrent ? COLORS.current : COLORS.default,
                    borderColor: isCurrent ? '#fff' : COLORS.default,
                  }}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                >
                  {str}
                </motion.div>
              );
            })}
          </div>
        </div>

        {Object.keys(groups).length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Groups</h3>
            <div className="space-y-3">
              {Object.entries(groups).map(([key, group]) => (
                <motion.div
                  key={key}
                  className="p-4 bg-zinc-800 rounded-lg border border-zinc-700"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-zinc-400 text-sm mb-2">Key: &quot;{key}&quot;</p>
                  <div className="flex gap-2 flex-wrap">
                    {group.map((str, i) => (
                      <div
                        key={i}
                        className="px-3 py-1 rounded border-2 font-mono font-bold text-white"
                        style={{
                          backgroundColor: COLORS.grouped + '40',
                          borderColor: COLORS.grouped,
                        }}
                      >
                        {str}
                      </div>
                    ))}
                  </div>
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
