'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const CHARS = ['a', 'a', 'b', 'b', 'c', 'c', 'c'];

interface CompressStep {
  i: number;
  writePos: number;
  count: number;
  result: string[];
  explanation: string;
}

function computeSteps(): CompressStep[] {
  const steps: CompressStep[] = [];
  const result: string[] = [];
  let writePos = 0;
  let count = 1;

  steps.push({
    i: 0,
    writePos: 0,
    count: 1,
    result: [],
    explanation: 'Start: writePos=0',
  });

  for (let i = 1; i <= CHARS.length; i++) {
    if (i < CHARS.length && CHARS[i] === CHARS[i - 1]) {
      count++;
      steps.push({
        i,
        writePos,
        count,
        result: [...result],
        explanation: `chars[${i}]='${CHARS[i]}' === chars[${i - 1}] → count=${count}`,
      });
    } else {
      result[writePos++] = CHARS[i - 1];
      steps.push({
        i,
        writePos: writePos - 1,
        count,
        result: [...result],
        explanation: `Write '${CHARS[i - 1]}' at position ${writePos - 1}`,
      });

      if (count > 1) {
        const countStr = String(count);
        for (let j = 0; j < countStr.length; j++) {
          result[writePos++] = countStr[j];
          steps.push({
            i,
            writePos: writePos - 1,
            count,
            result: [...result],
            explanation: `Write count '${countStr[j]}' at position ${writePos - 1}`,
          });
        }
      }
      count = 1;
    }
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  written: '#22c55e',
  counting: '#3b82f6',
} as const;

export default function StringCompressViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">String Compression</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Result: &quot;{currentStep.result.join('')}&quot;
          </p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-zinc-300 mb-2">Input:</h3>
        <div className="flex items-center justify-center gap-2">
          {CHARS.map((char, idx) => {
            const isCurrent = currentStep.i === idx + 1;
            return (
              <motion.div
                key={idx}
                className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: isCurrent ? `${COLORS.current}40` : '#1f2937',
                  borderColor: isCurrent ? COLORS.current : '#374151',
                }}
                animate={{ scale: isCurrent ? 1.15 : 1 }}
              >
                {char}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-zinc-300 mb-2">Output:</h3>
        <div className="flex items-center justify-center gap-2">
          {currentStep.result.map((char, idx) => {
            const isWritePos = idx === currentStep.writePos;
            return (
              <motion.div
                key={idx}
                className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: isWritePos ? `${COLORS.written}40` : `${COLORS.written}20`,
                  borderColor: COLORS.written,
                }}
                animate={{ scale: isWritePos ? 1.15 : 1 }}
              >
                {char}
              </motion.div>
            );
          })}
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.current} />
    </div>
  );
}
