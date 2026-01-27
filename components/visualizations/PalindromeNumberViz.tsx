'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NUM = 121;

interface PalindromeStep {
  num: number;
  reversed: number;
  original: number;
  isPalindrome: boolean;
  explanation: string;
}

function computeSteps(): PalindromeStep[] {
  const steps: PalindromeStep[] = [];

  if (NUM < 0) {
    steps.push({
      num: NUM,
      reversed: 0,
      original: NUM,
      isPalindrome: false,
      explanation: 'Negative numbers are not palindromes',
    });
    return steps;
  }

  let reversed = 0;
  let original = NUM;

  steps.push({
    num: NUM,
    reversed: 0,
    original,
    isPalindrome: false,
    explanation: `Start: Check if ${NUM} is a palindrome`,
  });

  while (original > 0) {
    reversed = reversed * 10 + (original % 10);
    original = Math.floor(original / 10);

    steps.push({
      num: NUM,
      reversed,
      original,
      isPalindrome: false,
      explanation: `Reverse: reversed = ${reversed}, remaining = ${original}`,
    });
  }

  const isPalindrome = reversed === NUM;

  steps.push({
    num: NUM,
    reversed,
    original: 0,
    isPalindrome,
    explanation: isPalindrome
      ? `Complete: ${reversed} === ${NUM} → Palindrome ✓`
      : `Complete: ${reversed} !== ${NUM} → Not a palindrome ✗`,
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

export default function PalindromeNumberViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { num, reversed, isPalindrome, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Palindrome Number</h2>

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
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-zinc-400 text-sm mb-1">Original</p>
            <p className="text-white font-bold text-2xl">{num}</p>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-zinc-400 text-sm mb-1">Reversed</p>
            <p className="text-yellow-400 font-bold text-2xl">{reversed}</p>
          </div>
        </div>

        {step === STEPS.length - 1 && (
          <div className="flex gap-2 justify-center">
            {num
              .toString()
              .split('')
              .map((digit, idx) => (
                <motion.div
                  key={idx}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: COLORS.palindrome,
                    borderColor: COLORS.palindrome,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {digit}
                </motion.div>
              ))}
          </div>
        )}
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
