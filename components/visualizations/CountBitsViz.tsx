'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NUM = 11; // Binary: 1011

interface CountStep {
  num: number;
  binary: string;
  bit: number;
  count: number;
  explanation: string;
}

function computeSteps(): CountStep[] {
  const steps: CountStep[] = [];
  let count = 0;
  const binary = NUM.toString(2);

  steps.push({
    num: NUM,
    binary,
    bit: -1,
    count: 0,
    explanation: `Start: Count set bits in ${NUM} (binary: ${binary})`,
  });

  let n = NUM;
  let bitPos = 0;
  while (n > 0) {
    const bit = n & 1;
    if (bit === 1) {
      count++;
    }
    steps.push({
      num: NUM,
      binary,
      bit: bitPos,
      count,
      explanation: `Bit ${bitPos}: ${bit === 1 ? 'set' : 'not set'}, count = ${count}`,
    });
    n >>= 1;
    bitPos++;
  }

  steps.push({
    num: NUM,
    binary,
    bit: -1,
    count,
    explanation: `Complete: ${NUM} has ${count} set bits`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  set: '#22c55e',
  notSet: '#6b7280',
  default: '#3b82f6',
} as const;

export default function CountBitsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { num, binary, bit, count, explanation } = currentStep;
  const binaryArray = binary.split('').reverse();

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Count Set Bits (Hamming Weight)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Result: {count} set bits</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Number: {num}</h3>
          <div className="flex flex-col items-center gap-2">
            <div className="text-zinc-400 text-sm">Binary: {binary}</div>
            <div className="flex gap-2">
              {binaryArray.map((bitVal, i) => {
                const isCurrent = bit === i;
                const isSet = bitVal === '1';

                let bgColor: string = COLORS.notSet;
                if (isCurrent) {
                  bgColor = COLORS.current;
                } else if (isSet) {
                  bgColor = COLORS.set;
                }

                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <motion.div
                      className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                      style={{
                        backgroundColor: bgColor,
                        borderColor: isCurrent ? '#fff' : bgColor,
                      }}
                      animate={{
                        scale: isCurrent ? 1.2 : 1,
                      }}
                    >
                      {bitVal}
                    </motion.div>
                    <div className="text-xs text-zinc-500">b{i}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Count</h3>
          <div className="flex justify-center">
            <motion.div
              className="w-24 h-24 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white text-2xl"
              style={{
                backgroundColor: COLORS.set,
                borderColor: COLORS.set,
              }}
              animate={{
                scale: step === STEPS.length - 1 ? 1.1 : 1,
              }}
            >
              {count}
            </motion.div>
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
