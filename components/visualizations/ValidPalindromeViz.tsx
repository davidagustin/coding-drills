'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const STRING = 'A man, a plan, a canal: Panama';

interface ValidPalindromeStep {
  str: string;
  cleaned: string;
  left: number;
  right: number;
  isPalindrome: boolean;
  explanation: string;
}

function computeSteps(): ValidPalindromeStep[] {
  const steps: ValidPalindromeStep[] = [];
  const cleaned = STRING.toLowerCase().replace(/[^a-z0-9]/g, '');

  steps.push({
    str: STRING,
    cleaned,
    left: 0,
    right: cleaned.length - 1,
    isPalindrome: false,
    explanation: `Start: Check if "${STRING}" is a palindrome (ignoring case and non-alphanumeric)`,
  });

  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    steps.push({
      str: STRING,
      cleaned,
      left,
      right,
      isPalindrome: false,
      explanation: `Compare "${cleaned[left]}" and "${cleaned[right]}"`,
    });

    if (cleaned[left] !== cleaned[right]) {
      steps.push({
        str: STRING,
        cleaned,
        left,
        right,
        isPalindrome: false,
        explanation: `Mismatch: "${cleaned[left]}" !== "${cleaned[right]}" → Not a palindrome`,
      });
      break;
    }

    left++;
    right--;

    steps.push({
      str: STRING,
      cleaned,
      left,
      right,
      isPalindrome: false,
      explanation: `Match: Move pointers inward`,
    });
  }

  const isPalindrome = left >= right;

  steps.push({
    str: STRING,
    cleaned,
    left,
    right,
    isPalindrome,
    explanation: isPalindrome ? 'Complete: Palindrome ✓' : 'Complete: Not a palindrome ✗',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  matched: '#22c55e',
  mismatch: '#ef4444',
  default: '#3b82f6',
} as const;

export default function ValidPalindromeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { cleaned, left, right, isPalindrome, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Valid Palindrome</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p
            className={`font-bold text-lg mt-2 ${isPalindrome ? 'text-green-400' : 'text-red-400'}`}
          >
            {isPalindrome ? 'Palindrome ✓' : 'Not a Palindrome ✗'}
          </p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Cleaned String</h3>
          <div className="flex gap-1 justify-center flex-wrap">
            {cleaned.split('').map((char, idx) => {
              const isLeft = left === idx;
              const isRight = right === idx;
              const isCurrent = isLeft || isRight;
              const isMatched = idx < left || idx > right;

              let bgColor: string = COLORS.default;
              if (isMatched && step === STEPS.length - 1 && isPalindrome) {
                bgColor = COLORS.matched;
              } else if (isCurrent) {
                bgColor = COLORS.current;
              }

              return (
                <motion.div
                  key={idx}
                  className="w-10 h-10 rounded border-2 flex items-center justify-center font-mono font-bold text-white text-sm"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: isCurrent ? '#fff' : bgColor,
                  }}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                >
                  {char}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
