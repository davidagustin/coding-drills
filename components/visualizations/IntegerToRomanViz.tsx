'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NUM = 1994;

interface IntToRomanStep {
  num: number;
  remaining: number;
  roman: string;
  value: number;
  symbol: string;
  explanation: string;
}

function computeSteps(): IntToRomanStep[] {
  const steps: IntToRomanStep[] = [];
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

  let remaining = NUM;
  let roman = '';

  steps.push({
    num: NUM,
    remaining,
    roman: '',
    value: 0,
    symbol: '',
    explanation: `Start: Convert ${NUM} to Roman numeral`,
  });

  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    const symbol = symbols[i];

    steps.push({
      num: NUM,
      remaining,
      roman,
      value,
      symbol,
      explanation: `Check ${value} (${symbol})`,
    });

    const count = Math.floor(remaining / value);

    if (count > 0) {
      roman += symbol.repeat(count);
      remaining -= value * count;

      steps.push({
        num: NUM,
        remaining,
        roman,
        value,
        symbol,
        explanation: `Add ${count} × "${symbol}", remaining = ${remaining}`,
      });
    }
  }

  steps.push({
    num: NUM,
    remaining: 0,
    roman,
    value: 0,
    symbol: '',
    explanation: `Complete: ${NUM} = "${roman}"`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  result: '#22c55e',
  default: '#3b82f6',
} as const;

export default function IntegerToRomanViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { num, remaining, roman, value, symbol, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Integer to Roman</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Result: &quot;{roman}&quot;</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-zinc-400 text-sm mb-1">Number</p>
            <p className="text-white font-bold text-xl">{num}</p>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-zinc-400 text-sm mb-1">Remaining</p>
            <p className="text-yellow-400 font-bold text-xl">{remaining}</p>
          </div>
        </div>

        {symbol && (
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-white text-sm">
              Checking: {value} ({symbol})
            </p>
          </div>
        )}

        {roman && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Roman Numeral</h3>
            <div className="flex gap-2 justify-center flex-wrap">
              {roman.split('').map((char, idx) => (
                <motion.div
                  key={idx}
                  className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: COLORS.result,
                    borderColor: COLORS.result,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {char}
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
