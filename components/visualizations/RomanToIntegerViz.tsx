'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ROMAN = 'MCMXCIV';

interface RomanStep {
  roman: string;
  i: number;
  current: string;
  next: string;
  value: number;
  total: number;
  explanation: string;
}

function computeSteps(): RomanStep[] {
  const steps: RomanStep[] = [];
  const values: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let total = 0;

  steps.push({
    roman: ROMAN,
    i: -1,
    current: '',
    next: '',
    value: 0,
    total: 0,
    explanation: `Start: Convert "${ROMAN}" to integer`,
  });

  for (let i = 0; i < ROMAN.length; i++) {
    const current = ROMAN[i];
    const next = ROMAN[i + 1];
    const currentVal = values[current];
    const nextVal = next ? values[next] : 0;

    steps.push({
      roman: ROMAN,
      i,
      current,
      next: next || '',
      value: currentVal,
      total,
      explanation: `Check "${current}" (value: ${currentVal})`,
    });

    if (nextVal > currentVal) {
      total += nextVal - currentVal;
      steps.push({
        roman: ROMAN,
        i: i + 1,
        current: next,
        next: '',
        value: nextVal - currentVal,
        total,
        explanation: `Subtractive: ${nextVal} - ${currentVal} = ${nextVal - currentVal}, total = ${total}`,
      });
      i++;
    } else {
      total += currentVal;
      steps.push({
        roman: ROMAN,
        i,
        current,
        next: '',
        value: currentVal,
        total,
        explanation: `Additive: ${currentVal}, total = ${total}`,
      });
    }
  }

  steps.push({
    roman: ROMAN,
    i: -1,
    current: '',
    next: '',
    value: 0,
    total,
    explanation: `Complete: "${ROMAN}" = ${total}`,
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

export default function RomanToIntegerViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { roman, i, current, value, total, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Roman to Integer</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Result: {total}</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Roman Numeral</h3>
          <div className="flex gap-2 justify-center">
            {roman.split('').map((char, idx) => {
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
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: isCurrent || isProcessed ? '#fff' : bgColor,
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

        {current && (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-800 rounded-lg">
              <p className="text-zinc-400 text-sm mb-1">Current Value</p>
              <p className="text-white font-bold text-xl">{value}</p>
            </div>
            <div className="p-4 bg-zinc-800 rounded-lg">
              <p className="text-zinc-400 text-sm mb-1">Total</p>
              <p className="text-yellow-400 font-bold text-xl">{total}</p>
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
