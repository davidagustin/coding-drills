'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NUM = 123;

interface ReverseIntStep {
  num: number;
  reversed: number;
  remaining: number;
  digit: number;
  explanation: string;
}

function computeSteps(): ReverseIntStep[] {
  const steps: ReverseIntStep[] = [];
  let reversed = 0;
  let remaining = Math.abs(NUM);
  const isNegative = NUM < 0;

  steps.push({
    num: NUM,
    reversed: 0,
    remaining,
    digit: 0,
    explanation: `Start: Reverse ${NUM}`,
  });

  while (remaining > 0) {
    const digit = remaining % 10;
    const newReversed = reversed * 10 + digit;

    if (newReversed > 2147483647) {
      steps.push({
        num: NUM,
        reversed: 0,
        remaining: 0,
        digit: 0,
        explanation: 'Overflow detected → return 0',
      });
      return steps;
    }

    reversed = newReversed;
    remaining = Math.floor(remaining / 10);

    steps.push({
      num: NUM,
      reversed,
      remaining,
      digit,
      explanation: `Extract digit ${digit}, reversed = ${reversed}, remaining = ${remaining}`,
    });
  }

  const result = isNegative ? -reversed : reversed;

  steps.push({
    num: NUM,
    reversed: result,
    remaining: 0,
    digit: 0,
    explanation: `Complete: Reversed = ${result}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function ReverseIntegerViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { num, reversed, remaining, digit, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Reverse Integer</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Result: {reversed}</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-zinc-400 text-sm mb-1">Original</p>
            <p className="text-white font-bold text-xl">{num}</p>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-zinc-400 text-sm mb-1">Reversed</p>
            <p className="text-yellow-400 font-bold text-xl">{reversed}</p>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-zinc-400 text-sm mb-1">Remaining</p>
            <p className="text-white font-bold text-xl">{remaining}</p>
          </div>
        </div>

        {digit > 0 && (
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-white text-sm">Current digit: {digit}</p>
          </div>
        )}
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
