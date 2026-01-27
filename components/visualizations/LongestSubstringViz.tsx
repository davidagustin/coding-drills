'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const STRING = 'abcabcbb';

interface SubstringStep {
  str: string;
  left: number;
  right: number;
  seen: Set<string>;
  maxLen: number;
  explanation: string;
}

function computeSteps(): SubstringStep[] {
  const steps: SubstringStep[] = [];
  const seen = new Set<string>();
  let left = 0;
  let maxLen = 0;

  steps.push({
    str: STRING,
    left: 0,
    right: 0,
    seen: new Set(),
    maxLen: 0,
    explanation: 'Start: Find longest substring without repeating characters',
  });

  for (let right = 0; right < STRING.length; right++) {
    const char = STRING[right];

    steps.push({
      str: STRING,
      left,
      right,
      seen: new Set(seen),
      maxLen,
      explanation: `Check char "${char}" at index ${right}`,
    });

    while (seen.has(char)) {
      seen.delete(STRING[left]);
      steps.push({
        str: STRING,
        left: left + 1,
        right,
        seen: new Set(seen),
        maxLen,
        explanation: `Remove "${STRING[left]}" from window, move left to ${left + 1}`,
      });
      left++;
    }

    seen.add(char);
    maxLen = Math.max(maxLen, right - left + 1);

    steps.push({
      str: STRING,
      left,
      right,
      seen: new Set(seen),
      maxLen,
      explanation: `Add "${char}", current length = ${right - left + 1}, maxLen = ${maxLen}`,
    });
  }

  steps.push({
    str: STRING,
    left,
    right: STRING.length - 1,
    seen: new Set(seen),
    maxLen,
    explanation: `Complete: Longest substring length = ${maxLen}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  inWindow: '#22c55e',
  default: '#3b82f6',
} as const;

export default function LongestSubstringViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { str, left, right, seen, maxLen, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">
        Longest Substring Without Repeating Characters
      </h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Max Length: {maxLen}</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">String</h3>
          <div className="flex gap-2 justify-center">
            {str.split('').map((char, idx) => {
              const isCurrent = right === idx;
              const inWindow = idx >= left && idx <= right;

              let bgColor: string = COLORS.default;
              if (inWindow) {
                bgColor = COLORS.inWindow;
              } else if (isCurrent) {
                bgColor = COLORS.current;
              }

              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <motion.div
                    className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                    style={{
                      backgroundColor: bgColor,
                      borderColor: isCurrent || inWindow ? '#fff' : bgColor,
                    }}
                    animate={{
                      scale: isCurrent || inWindow ? 1.1 : 1,
                    }}
                  >
                    {char}
                  </motion.div>
                  <div className="text-xs text-zinc-500">{idx}</div>
                </div>
              );
            })}
          </div>
        </div>

        {seen.size > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Characters in Window</h3>
            <div className="flex gap-2 justify-center flex-wrap">
              {Array.from(seen).map((char) => (
                <motion.div
                  key={char}
                  className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: COLORS.inWindow,
                    borderColor: COLORS.inWindow,
                  }}
                >
                  {char}
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
