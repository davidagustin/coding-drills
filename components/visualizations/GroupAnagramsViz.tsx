'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const STRINGS = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];

interface AnagramStep {
  str: string;
  key: string;
  groups: Record<string, string[]>;
  explanation: string;
}

function computeSteps(): AnagramStep[] {
  const steps: AnagramStep[] = [];
  const groups: Record<string, string[]> = {};

  for (const str of STRINGS) {
    const key = str.split('').sort().join('');
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(str);
    steps.push({
      str,
      key,
      groups: JSON.parse(JSON.stringify(groups)),
      explanation: `"${str}" → key="${key}" → group with [${groups[key].join(', ')}]`,
    });
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  group1: '#3b82f6',
  group2: '#22c55e',
  group3: '#f97316',
} as const;

const GROUP_COLORS = [COLORS.group1, COLORS.group2, COLORS.group3];

export default function GroupAnagramsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const keyToColor = useMemo(() => {
    const keys = Object.keys(currentStep.groups);
    const map: Record<string, string> = {};
    keys.forEach((key, idx) => {
      map[key] = GROUP_COLORS[idx % GROUP_COLORS.length];
    });
    return map;
  }, [currentStep.groups]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Group Anagrams</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
      </div>

      <div className="mb-6 flex items-center justify-center gap-2 flex-wrap">
        {STRINGS.map((str, idx) => {
          const isCurrent = currentStep.str === str;
          const key = str.split('').sort().join('');
          const color = keyToColor[key] || COLORS.current;

          return (
            <motion.div
              key={idx}
              className="px-4 py-2 rounded-lg border-2 flex items-center gap-2 font-mono font-bold text-white"
              style={{
                backgroundColor: isCurrent ? `${COLORS.current}40` : `${color}20`,
                borderColor: isCurrent ? COLORS.current : color,
              }}
              animate={{ scale: isCurrent ? 1.15 : 1 }}
            >
              <span>{str}</span>
              <span className="text-xs opacity-70">({key})</span>
            </motion.div>
          );
        })}
      </div>

      <div className="mb-6 space-y-2">
        {Object.entries(currentStep.groups).map(([key, group], _idx) => (
          <div key={key} className="p-3 bg-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-500 mb-1">Key: &quot;{key}&quot;</div>
            <div className="flex gap-2">
              {group.map((str) => (
                <span
                  key={str}
                  className="px-3 py-1 rounded bg-zinc-700 text-white font-mono"
                  style={{
                    backgroundColor: `${keyToColor[key]}40`,
                  }}
                >
                  {str}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <VizControls controls={controls} accentColor={COLORS.group1} />
    </div>
  );
}
