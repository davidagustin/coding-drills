'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const STRING = 'babad';

interface LongestPalindromeStep {
  str: string;
  center: number;
  left: number;
  right: number;
  longest: string;
  explanation: string;
}

function computeSteps(): LongestPalindromeStep[] {
  const steps: LongestPalindromeStep[] = [];
  let longest = '';

  function expandAroundCenter(left: number, right: number): string {
    while (left >= 0 && right < STRING.length && STRING[left] === STRING[right]) {
      steps.push({
        str: STRING,
        center: Math.floor((left + right) / 2),
        left,
        right,
        longest,
        explanation: `Expand: "${STRING[left]}" === "${STRING[right]}"`,
      });
      left--;
      right++;
    }
    return STRING.slice(left + 1, right);
  }

  steps.push({
    str: STRING,
    center: -1,
    left: -1,
    right: -1,
    longest: '',
    explanation: `Start: Find longest palindromic substring in "${STRING}"`,
  });

  for (let i = 0; i < STRING.length; i++) {
    const odd = expandAroundCenter(i, i);
    const even = expandAroundCenter(i, i + 1);
    const longer = odd.length > even.length ? odd : even;

    if (longer.length > longest.length) {
      longest = longer;
      steps.push({
        str: STRING,
        center: i,
        left: i - Math.floor(longer.length / 2),
        right: i + Math.floor(longer.length / 2),
        longest,
        explanation: `Update longest: "${longest}" (length: ${longest.length})`,
      });
    }
  }

  steps.push({
    str: STRING,
    center: -1,
    left: -1,
    right: -1,
    longest,
    explanation: `Complete: Longest palindrome = "${longest}"`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  palindrome: '#22c55e',
  default: '#3b82f6',
} as const;

export default function LongestPalindromeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { str, center, left, right, longest, explanation } = currentStep;
  const longestStart = str.indexOf(longest);
  const longestEnd = longestStart + longest.length - 1;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Longest Palindromic Substring</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Longest: &quot;{longest}&quot;</p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">String</h3>
        <div className="flex gap-1 justify-center flex-wrap">
          {str.split('').map((char, idx) => {
            const isCurrent = center === idx || (left <= idx && idx <= right);
            const inLongest = step === STEPS.length - 1 && idx >= longestStart && idx <= longestEnd;

            let bgColor: string = COLORS.default;
            if (inLongest) {
              bgColor = COLORS.palindrome;
            } else if (isCurrent) {
              bgColor = COLORS.current;
            }

            return (
              <motion.div
                key={idx}
                className="w-10 h-10 rounded border-2 flex items-center justify-center font-mono font-bold text-white text-sm"
                style={{
                  backgroundColor: bgColor,
                  borderColor: isCurrent || inLongest ? '#fff' : bgColor,
                }}
                animate={{
                  scale: isCurrent || inLongest ? 1.1 : 1,
                }}
              >
                {char}
              </motion.div>
            );
          })}
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
