'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const TOKENS = ['2', '1', '+', '3', '*'];

interface RPNStep {
  tokens: string[];
  index: number;
  stack: number[];
  result: number | null;
  explanation: string;
}

function computeSteps(): RPNStep[] {
  const steps: RPNStep[] = [];
  const stack: number[] = [];

  steps.push({
    tokens: [...TOKENS],
    index: -1,
    stack: [],
    result: null,
    explanation: `Start: Evaluate RPN expression [${TOKENS.join(', ')}]`,
  });

  for (let i = 0; i < TOKENS.length; i++) {
    const token = TOKENS[i];

    steps.push({
      tokens: [...TOKENS],
      index: i,
      stack: [...stack],
      result: null,
      explanation: `Process token "${token}"`,
    });

    if (['+', '-', '*', '/'].includes(token)) {
      const b = stack.pop()!;
      const a = stack.pop()!;
      let result = 0;

      if (token === '+') {
        result = a + b;
      } else if (token === '-') {
        result = a - b;
      } else if (token === '*') {
        result = a * b;
      } else {
        result = Math.trunc(a / b);
      }

      stack.push(result);
      steps.push({
        tokens: [...TOKENS],
        index: i,
        stack: [...stack],
        result,
        explanation: `Apply ${token}: ${a} ${token} ${b} = ${result}`,
      });
    } else {
      const num = parseInt(token, 10);
      stack.push(num);
      steps.push({
        tokens: [...TOKENS],
        index: i,
        stack: [...stack],
        result: null,
        explanation: `Push number ${num}`,
      });
    }
  }

  const result = stack[0];
  steps.push({
    tokens: [...TOKENS],
    index: -1,
    stack: [...stack],
    result,
    explanation: `Complete: Result = ${result}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  number: '#22c55e',
  operator: '#ef4444',
  default: '#3b82f6',
} as const;

export default function EvaluateReversePolishViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { tokens, index, stack, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Evaluate Reverse Polish Notation</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {result !== null && step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Result: {result}</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Tokens</h3>
          <div className="flex gap-2 justify-center">
            {tokens.map((token, idx) => {
              const isCurrent = index === idx;
              const isOperator = ['+', '-', '*', '/'].includes(token);

              let bgColor: string = COLORS.default;
              if (isCurrent) {
                bgColor = COLORS.current;
              } else if (isOperator) {
                bgColor = COLORS.operator;
              } else {
                bgColor = COLORS.number;
              }

              return (
                <motion.div
                  key={idx}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: isCurrent ? '#fff' : bgColor,
                  }}
                  animate={{
                    scale: isCurrent ? 1.2 : 1,
                  }}
                >
                  {token}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Stack</h3>
          <div className="flex flex-col-reverse gap-2 items-center min-h-[150px] justify-end">
            {stack.length === 0 ? (
              <p className="text-zinc-500">Stack is empty</p>
            ) : (
              stack.map((n, i) => (
                <motion.div
                  key={i}
                  className="px-4 py-2 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: COLORS.number,
                    borderColor: COLORS.number,
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {n}
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
