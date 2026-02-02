'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const S1 = 'anagram';
const S2 = 'nagaram';

interface AnagramStep {
  char: string;
  index: number;
  freq1: Record<string, number>;
  freq2: Record<string, number>;
  isAnagram: boolean;
  explanation: string;
}

function computeSteps(): AnagramStep[] {
  const steps: AnagramStep[] = [];
  const freq1: Record<string, number> = {};
  const freq2: Record<string, number> = {};

  steps.push({
    char: '',
    index: -1,
    freq1: {},
    freq2: {},
    isAnagram: true,
    explanation: 'Start: Check if strings are anagrams',
  });

  for (let i = 0; i < S1.length; i++) {
    const char = S1[i];
    freq1[char] = (freq1[char] || 0) + 1;
    steps.push({
      char,
      index: i,
      freq1: { ...freq1 },
      freq2: { ...freq2 },
      isAnagram: true,
      explanation: `Count "${char}" in s1: ${freq1[char]}`,
    });
  }

  for (let i = 0; i < S2.length; i++) {
    const char = S2[i];
    freq2[char] = (freq2[char] || 0) + 1;
    steps.push({
      char,
      index: i + S1.length,
      freq1: { ...freq1 },
      freq2: { ...freq2 },
      isAnagram: true,
      explanation: `Count "${char}" in s2: ${freq2[char]}`,
    });
  }

  let isAnagram = true;
  const allChars = new Set([...Object.keys(freq1), ...Object.keys(freq2)]);

  for (const char of allChars) {
    if (freq1[char] !== freq2[char]) {
      isAnagram = false;
      steps.push({
        char,
        index: S1.length + S2.length,
        freq1: { ...freq1 },
        freq2: { ...freq2 },
        isAnagram: false,
        explanation: `"${char}": s1 has ${freq1[char] || 0}, s2 has ${freq2[char] || 0} → not anagram`,
      });
      break;
    }
  }

  if (isAnagram) {
    steps.push({
      char: '',
      index: S1.length + S2.length,
      freq1: { ...freq1 },
      freq2: { ...freq2 },
      isAnagram: true,
      explanation: 'All character frequencies match → anagram',
    });
  }

  steps.push({
    char: '',
    index: S1.length + S2.length + 1,
    freq1: { ...freq1 },
    freq2: { ...freq2 },
    isAnagram,
    explanation: isAnagram
      ? 'Complete: Strings are anagrams ✓'
      : 'Complete: Strings are not anagrams ✗',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  match: '#22c55e',
  mismatch: '#ef4444',
  default: '#3b82f6',
} as const;

export default function ValidAnagramViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { index, freq1, freq2, isAnagram, explanation } = currentStep;
  const allChars = new Set([...Object.keys(freq1), ...Object.keys(freq2)]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Valid Anagram</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className={`font-bold text-lg mt-2 ${isAnagram ? 'text-green-400' : 'text-red-400'}`}>
            {isAnagram ? 'Anagrams ✓' : 'Not Anagrams ✗'}
          </p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">String 1: &quot;{S1}&quot;</h3>
          <div className="flex gap-2">
            {S1.split('').map((c, i) => {
              const isCurrent = index === i;
              return (
                <motion.div
                  key={i}
                  className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: isCurrent ? COLORS.current : COLORS.default,
                    borderColor: isCurrent ? '#fff' : COLORS.default,
                  }}
                  animate={{
                    scale: isCurrent ? 1.2 : 1,
                  }}
                >
                  {c}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">String 2: &quot;{S2}&quot;</h3>
          <div className="flex gap-2">
            {S2.split('').map((c, i) => {
              const isCurrent = index === i + S1.length;
              return (
                <motion.div
                  key={i}
                  className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: isCurrent ? COLORS.current : COLORS.default,
                    borderColor: isCurrent ? '#fff' : COLORS.default,
                  }}
                  animate={{
                    scale: isCurrent ? 1.2 : 1,
                  }}
                >
                  {c}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Character Frequencies</h3>
          <div className="grid grid-cols-4 gap-4">
            {Array.from(allChars)
              .sort()
              .map((c) => {
                const count1 = freq1[c] || 0;
                const count2 = freq2[c] || 0;
                const matches = count1 === count2;

                return (
                  <div
                    key={c}
                    className="p-3 rounded-lg border-2"
                    style={{
                      backgroundColor: matches ? `${COLORS.match}20` : `${COLORS.mismatch}20`,
                      borderColor: matches ? COLORS.match : COLORS.mismatch,
                    }}
                  >
                    <div className="text-center font-mono font-bold text-white text-2xl mb-2">
                      {c}
                    </div>
                    <div className="text-center text-sm">
                      <div className="text-zinc-400">s1: {count1}</div>
                      <div className="text-zinc-400">s2: {count2}</div>
                      <div className={`font-bold ${matches ? 'text-green-400' : 'text-red-400'}`}>
                        {matches ? '✓' : '✗'}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
