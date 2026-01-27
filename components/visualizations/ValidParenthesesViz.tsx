'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const STRING = '()[]{}';

interface ParenStep {
  char: string;
  index: number;
  stack: string[];
  isValid: boolean;
  explanation: string;
}

function computeSteps(): ParenStep[] {
  const steps: ParenStep[] = [];
  const stack: string[] = [];
  const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };

  steps.push({
    char: '',
    index: -1,
    stack: [],
    isValid: true,
    explanation: 'Start: Check if parentheses are valid',
  });

  for (let i = 0; i < STRING.length; i++) {
    const char = STRING[i];

    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
      steps.push({
        char,
        index: i,
        stack: [...stack],
        isValid: true,
        explanation: `Found opening ${char}, push to stack`,
      });
    } else if (char === ')' || char === ']' || char === '}') {
      if (stack.length === 0) {
        steps.push({
          char,
          index: i,
          stack: [...stack],
          isValid: false,
          explanation: `Found closing ${char} but stack is empty → invalid`,
        });
        return steps;
      }

      const top = stack.pop()!;
      const expected = pairs[char];

      if (top !== expected) {
        steps.push({
          char,
          index: i,
          stack: [...stack],
          isValid: false,
          explanation: `Found closing ${char}, expected ${expected} but got ${top} → invalid`,
        });
        return steps;
      }

      steps.push({
        char,
        index: i,
        stack: [...stack],
        isValid: true,
        explanation: `Found closing ${char}, matches ${top}, pop from stack`,
      });
    }
  }

  const isValid = stack.length === 0;
  steps.push({
    char: '',
    index: STRING.length,
    stack: [...stack],
    isValid,
    explanation: isValid
      ? 'Complete: All parentheses matched ✓'
      : `Complete: Stack not empty, unmatched: ${stack.join(', ')} ✗`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  opening: '#22c55e',
  closing: '#3b82f6',
  match: '#eab308',
  invalid: '#ef4444',
  default: '#6b7280',
} as const;

export default function ValidParenthesesViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { index, stack, isValid, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Valid Parentheses</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className={`font-bold text-lg mt-2 ${isValid ? 'text-green-400' : 'text-red-400'}`}>
            {isValid ? 'Valid ✓' : 'Invalid ✗'}
          </p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">String</h3>
          <div className="flex gap-2 justify-center">
            {STRING.split('').map((c, i) => {
              const isCurrent = index === i;
              const isOpening = c === '(' || c === '[' || c === '{';
              const isClosing = c === ')' || c === ']' || c === '}';

              let bgColor: string = COLORS.default;
              if (isCurrent) {
                bgColor = isValid ? COLORS.match : COLORS.invalid;
              } else if (isOpening) {
                bgColor = COLORS.opening;
              } else if (isClosing) {
                bgColor = COLORS.closing;
              }

              return (
                <motion.div
                  key={i}
                  className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: isCurrent ? '#fff' : bgColor,
                  }}
                  animate={{
                    scale: isCurrent ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {c}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Stack</h3>
          <div className="flex flex-col items-center gap-2 min-h-[200px] justify-end">
            {stack.length === 0 ? (
              <p className="text-zinc-500 text-sm">Stack is empty</p>
            ) : (
              stack.map((item, i) => (
                <motion.div
                  key={i}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: COLORS.opening,
                    borderColor: COLORS.opening,
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {item}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
