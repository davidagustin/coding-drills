'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NUM = 16;

interface PowerStep {
  n: number;
  binary: string;
  nMinusOne: number;
  binaryMinusOne: string;
  andResult: number;
  isPower: boolean;
  explanation: string;
}

function computeSteps(): PowerStep[] {
  const steps: PowerStep[] = [];

  if (NUM <= 0) {
    steps.push({
      n: NUM,
      binary: NUM.toString(2),
      nMinusOne: NUM - 1,
      binaryMinusOne: (NUM - 1).toString(2),
      andResult: NUM & (NUM - 1),
      isPower: false,
      explanation: `${NUM} ≤ 0 → not a power of 2`,
    });
    return steps;
  }

  const nMinusOne = NUM - 1;
  const andResult = NUM & nMinusOne;
  const isPower = andResult === 0;

  steps.push({
    n: NUM,
    binary: NUM.toString(2),
    nMinusOne,
    binaryMinusOne: nMinusOne.toString(2),
    andResult,
    isPower,
    explanation: isPower
      ? `${NUM} & ${nMinusOne} = ${andResult} → power of 2 ✓`
      : `${NUM} & ${nMinusOne} = ${andResult} ≠ 0 → not a power of 2`,
  });

  steps.push({
    n: NUM,
    binary: NUM.toString(2),
    nMinusOne,
    binaryMinusOne: nMinusOne.toString(2),
    andResult,
    isPower,
    explanation: isPower
      ? `Complete: ${NUM} is a power of 2 ✓`
      : `Complete: ${NUM} is not a power of 2 ✗`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  power: '#22c55e',
  notPower: '#ef4444',
  default: '#3b82f6',
} as const;

export default function PowerOfTwoViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { n, binary, nMinusOne, binaryMinusOne, andResult, isPower, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Power of Two</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className={`font-bold text-lg mt-2 ${isPower ? 'text-green-400' : 'text-red-400'}`}>
            {isPower ? 'Power of 2 ✓' : 'Not a Power of 2 ✗'}
          </p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Number: {n}</h3>
          <div className="flex flex-col items-center gap-2">
            <div className="text-zinc-400 text-sm">Binary: {binary}</div>
            <div className="flex gap-1">
              {binary.split('').map((bit, i) => (
                <motion.div
                  key={i}
                  className="w-10 h-10 rounded border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: bit === '1' ? COLORS.current : COLORS.default,
                    borderColor: bit === '1' ? COLORS.current : COLORS.default,
                  }}
                >
                  {bit}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Number - 1: {nMinusOne}</h3>
          <div className="flex flex-col items-center gap-2">
            <div className="text-zinc-400 text-sm">Binary: {binaryMinusOne}</div>
            <div className="flex gap-1">
              {binaryMinusOne.split('').map((bit, i) => (
                <motion.div
                  key={i}
                  className="w-10 h-10 rounded border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: bit === '1' ? COLORS.current : COLORS.default,
                    borderColor: bit === '1' ? COLORS.current : COLORS.default,
                  }}
                >
                  {bit}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">
            Bitwise AND Result: {andResult}
          </h3>
          <div className="flex justify-center">
            <motion.div
              className="w-24 h-24 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white text-2xl"
              style={{
                backgroundColor: isPower ? COLORS.power : COLORS.notPower,
                borderColor: isPower ? COLORS.power : COLORS.notPower,
              }}
            >
              {andResult}
            </motion.div>
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
