'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const EXPR = '3+2*2';

interface CalculatorStep {
  expr: string;
  index: number;
  numStack: number[];
  opStack: string[];
  result: number | null;
  explanation: string;
}

function computeSteps(): CalculatorStep[] {
  const steps: CalculatorStep[] = [];
  const numStack: number[] = [];
  const opStack: string[] = [];
  let num = 0;
  let sign = 1;

  steps.push({
    expr: EXPR,
    index: -1,
    numStack: [],
    opStack: [],
    result: null,
    explanation: `Start: Evaluate "${EXPR}"`,
  });

  for (let i = 0; i < EXPR.length; i++) {
    const char = EXPR[i];

    if (char >= '0' && char <= '9') {
      num = num * 10 + parseInt(char, 10);
      steps.push({
        expr: EXPR,
        index: i,
        numStack: [...numStack],
        opStack: [...opStack],
        result: null,
        explanation: `Digit "${char}": num = ${num}`,
      });
    } else if (char === '+' || char === '-') {
      numStack.push(num * sign);
      steps.push({
        expr: EXPR,
        index: i,
        numStack: [...numStack],
        opStack: [...opStack],
        result: null,
        explanation: `Operator "${char}": push ${num * sign}, set sign = ${char === '+' ? 1 : -1}`,
      });
      sign = char === '+' ? 1 : -1;
      num = 0;
    } else if (char === '*' || char === '/') {
      numStack.push(num * sign);
      steps.push({
        expr: EXPR,
        index: i,
        numStack: [...numStack],
        opStack: [...opStack],
        result: null,
        explanation: `Operator "${char}": push ${num * sign}, set sign = 1`,
      });
      opStack.push(char);
      sign = 1;
      num = 0;
    }
  }

  numStack.push(num * sign);

  let result = numStack[0];
  let opIdx = 0;

  for (let i = 1; i < numStack.length; i++) {
    const op = opStack[opIdx];
    const nextNum = numStack[i];

    steps.push({
      expr: EXPR,
      index: -1,
      numStack: [...numStack],
      opStack: [...opStack],
      result,
      explanation: `Apply ${op}: ${result} ${op} ${nextNum}`,
    });

    if (op === '*') {
      result *= nextNum;
    } else {
      result = Math.floor(result / nextNum);
    }

    steps.push({
      expr: EXPR,
      index: -1,
      numStack: [...numStack],
      opStack: [...opStack],
      result,
      explanation: `Result = ${result}`,
    });

    opIdx++;
  }

  steps.push({
    expr: EXPR,
    index: -1,
    numStack: [...numStack],
    opStack: [...opStack],
    result,
    explanation: `Complete: ${result}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  number: '#22c55e',
  operator: '#3b82f6',
  default: '#6b7280',
} as const;

export default function BasicCalculatorViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { expr, index, numStack, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Basic Calculator</h2>

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
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">
            Expression: &quot;{expr}&quot;
          </h3>
          <div className="flex gap-2 justify-center">
            {expr.split('').map((char, idx) => {
              const isCurrent = index === idx;
              const isOperator = ['+', '-', '*', '/'].includes(char);

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
                  className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: isCurrent ? '#fff' : bgColor,
                  }}
                  animate={{
                    scale: isCurrent ? 1.2 : 1,
                  }}
                >
                  {char}
                </motion.div>
              );
            })}
          </div>
        </div>

        {numStack.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Number Stack</h3>
            <div className="flex flex-col-reverse gap-2 items-center min-h-[100px] justify-end">
              {numStack.map((n, i) => (
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
              ))}
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
