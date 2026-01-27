'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const STRING = 'Hello World';

interface LastWordStep {
  str: string;
  index: number;
  length: number;
  explanation: string;
}

function computeSteps(): LastWordStep[] {
  const steps: LastWordStep[] = [];
  const trimmed = STRING.trim();
  let length = 0;

  steps.push({
    str: STRING,
    index: -1,
    length: 0,
    explanation: `Start: Find length of last word in "${STRING}"`,
  });

  for (let i = trimmed.length - 1; i >= 0; i--) {
    steps.push({
      str: STRING,
      index: i,
      length,
      explanation: `Check index ${i}: "${trimmed[i]}"`,
    });

    if (trimmed[i] === ' ') {
      steps.push({
        str: STRING,
        index: i,
        length,
        explanation: `Found space at ${i} → last word length = ${length}`,
      });
      break;
    }

    length++;
    steps.push({
      str: STRING,
      index: i,
      length,
      explanation: `Count character, length = ${length}`,
    });
  }

  steps.push({
    str: STRING,
    index: -1,
    length,
    explanation: `Complete: Last word length = ${length}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  counted: '#22c55e',
  default: '#3b82f6',
} as const;

export default function LengthOfLastWordViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { str, index, length, explanation } = currentStep;
  const trimmed = str.trim();

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Length of Last Word</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Length: {length}</p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">String</h3>
        <div className="flex gap-2 justify-center flex-wrap">
          {trimmed.split('').map((char, idx) => {
            const isCurrent = index === idx;
            const isCounted = idx > index && index >= 0;

            let bgColor: string = COLORS.default;
            if (isCurrent) {
              bgColor = COLORS.current;
            } else if (isCounted) {
              bgColor = COLORS.counted;
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

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
