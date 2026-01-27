'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const S = 'babad';

interface PalindromeStep {
  left: number;
  right: number;
  isPalindrome: boolean;
  explanation: string;
  longest: string;
}

function computeSteps(): PalindromeStep[] {
  const steps: PalindromeStep[] = [];
  let longest = '';

  // Expand around centers
  for (let center = 0; center < S.length; center++) {
    // Odd length palindromes
    let left = center;
    let right = center;
    while (left >= 0 && right < S.length && S[left] === S[right]) {
      const substr = S.substring(left, right + 1);
      if (substr.length > longest.length) {
        longest = substr;
      }
      steps.push({
        left,
        right,
        isPalindrome: true,
        explanation: `Center ${center} (odd): "${substr}" is palindrome`,
        longest,
      });
      left--;
      right++;
    }

    // Even length palindromes
    left = center;
    right = center + 1;
    while (left >= 0 && right < S.length && S[left] === S[right]) {
      const substr = S.substring(left, right + 1);
      if (substr.length > longest.length) {
        longest = substr;
      }
      steps.push({
        left,
        right,
        isPalindrome: true,
        explanation: `Center ${center} (even): "${substr}" is palindrome`,
        longest,
      });
      left--;
      right++;
    }
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  palindrome: '#22c55e',
  current: '#eab308',
  default: '#3b82f6',
} as const;

export default function LongestPalindromeSubstrViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Longest Palindromic Substring</h2>
      <div className="mb-4 text-zinc-400">
        String: <span className="font-mono text-white">{S}</span>
      </div>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Longest: &quot;{currentStep.longest}&quot;
          </p>
        )}
      </div>

      <div className="mb-6 flex items-center justify-center gap-2">
        {S.split('').map((char, idx) => {
          const isInRange =
            currentStep.left >= 0 && idx >= currentStep.left && idx <= currentStep.right;
          const bgColor = isInRange ? COLORS.palindrome : COLORS.default;

          return (
            <motion.div
              key={idx}
              className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
              style={{
                backgroundColor: `${bgColor}40`,
                borderColor: bgColor,
              }}
              animate={{ scale: isInRange ? 1.1 : 1 }}
            >
              {char}
            </motion.div>
          );
        })}
      </div>

      <VizControls controls={controls} accentColor={COLORS.palindrome} />
    </div>
  );
}
