'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const STRING = '   -42';

interface AtoiStep {
  str: string;
  i: number;
  sign: number;
  result: number;
  char: string;
  explanation: string;
}

function computeSteps(): AtoiStep[] {
  const steps: AtoiStep[] = [];
  let i = 0;
  let sign = 1;
  let result = 0;

  steps.push({
    str: STRING,
    i: 0,
    sign: 1,
    result: 0,
    char: '',
    explanation: `Start: Convert "${STRING}" to integer`,
  });

  while (i < STRING.length && STRING[i] === ' ') {
    i++;
    steps.push({
      str: STRING,
      i,
      sign: 1,
      result: 0,
      char: STRING[i - 1] || '',
      explanation: `Skip whitespace at index ${i - 1}`,
    });
  }

  if (i < STRING.length && (STRING[i] === '+' || STRING[i] === '-')) {
    sign = STRING[i] === '-' ? -1 : 1;
    steps.push({
      str: STRING,
      i,
      sign,
      result: 0,
      char: STRING[i],
      explanation: `Found sign: "${STRING[i]}" → sign = ${sign}`,
    });
    i++;
  }

  while (i < STRING.length && STRING[i] >= '0' && STRING[i] <= '9') {
    const digit = parseInt(STRING[i], 10);
    const newResult = result * 10 + digit;

    if (newResult > 2147483647) {
      result = sign === 1 ? 2147483647 : -2147483648;
      steps.push({
        str: STRING,
        i,
        sign,
        result,
        char: STRING[i],
        explanation: 'Overflow → clamp to INT_MAX/INT_MIN',
      });
      break;
    }

    result = newResult;
    steps.push({
      str: STRING,
      i,
      sign,
      result,
      char: STRING[i],
      explanation: `Process digit "${STRING[i]}": result = ${result}`,
    });
    i++;
  }

  result *= sign;

  steps.push({
    str: STRING,
    i: -1,
    sign,
    result,
    char: '',
    explanation: `Complete: Result = ${result}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  processed: '#22c55e',
  default: '#3b82f6',
} as const;

export default function StringToIntegerViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { str, i, sign, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">String to Integer (atoi)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Result: {result}</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">String</h3>
          <div className="flex gap-1 justify-center flex-wrap">
            {str.split('').map((c, idx) => {
              const isCurrent = i === idx;
              const isProcessed = idx < i && i >= 0;

              let bgColor: string = COLORS.default;
              if (isProcessed) {
                bgColor = COLORS.processed;
              } else if (isCurrent) {
                bgColor = COLORS.current;
              }

              return (
                <motion.div
                  key={idx}
                  className="w-10 h-10 rounded border-2 flex items-center justify-center font-mono font-bold text-white text-sm"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: isCurrent || isProcessed ? '#fff' : bgColor,
                  }}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                >
                  {c}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-zinc-400 text-sm mb-1">Sign</p>
            <p className="text-white font-bold text-xl">{sign === 1 ? '+' : '-'}</p>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-zinc-400 text-sm mb-1">Result</p>
            <p className="text-yellow-400 font-bold text-xl">{result}</p>
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
