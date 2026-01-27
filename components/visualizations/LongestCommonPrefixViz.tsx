'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const STRINGS = ['flower', 'flow', 'flight'];
const MAX_LEN = Math.max(...STRINGS.map((s) => s.length));

interface PrefixStep {
  index: number;
  char: string | null;
  prefix: string;
  allMatch: boolean;
  explanation: string;
}

function computeSteps(): PrefixStep[] {
  const steps: PrefixStep[] = [];
  let prefix = '';

  steps.push({
    index: -1,
    char: null,
    prefix: '',
    allMatch: true,
    explanation: 'Start: Find longest common prefix',
  });

  for (let i = 0; i < MAX_LEN; i++) {
    const firstChar = STRINGS[0][i];
    if (!firstChar) break;

    let allMatch = true;
    for (let j = 1; j < STRINGS.length; j++) {
      if (STRINGS[j][i] !== firstChar) {
        allMatch = false;
        break;
      }
    }

    if (!allMatch) {
      steps.push({
        index: i,
        char: firstChar,
        prefix,
        allMatch: false,
        explanation: `Position ${i}: ${firstChar} doesn't match in all strings → stop`,
      });
      break;
    }

    prefix += firstChar;
    steps.push({
      index: i,
      char: firstChar,
      prefix,
      allMatch: true,
      explanation: `Position ${i}: ${firstChar} matches in all strings → add to prefix`,
    });
  }

  steps.push({
    index: MAX_LEN,
    char: null,
    prefix,
    allMatch: true,
    explanation: `Complete: Longest common prefix = "${prefix}"`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  match: '#22c55e',
  current: '#eab308',
  prefix: '#3b82f6',
  default: '#6b7280',
} as const;

export default function LongestCommonPrefixViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { index, prefix, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Longest Common Prefix</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Result: &quot;{prefix}&quot;</p>
        )}
      </div>

      <div className="mb-6 space-y-4">
        {STRINGS.map((str, strIdx) => (
          <div key={strIdx}>
            <p className="text-zinc-400 text-sm mb-2">String {strIdx + 1}</p>
            <div className="flex gap-2">
              {str.split('').map((c, i) => {
                const isCurrent = index === i;
                const inPrefix = i < prefix.length;

                let bgColor: string = COLORS.default;
                if (isCurrent) {
                  bgColor = COLORS.current;
                } else if (inPrefix) {
                  bgColor = COLORS.prefix;
                }

                return (
                  <motion.div
                    key={i}
                    className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                    style={{
                      backgroundColor: bgColor,
                      borderColor: isCurrent ? '#fff' : bgColor,
                    }}
                    animate={{
                      scale: isCurrent ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {c}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="mt-4 pt-4 border-t border-zinc-700">
          <p className="text-zinc-400 text-sm mb-2">Common Prefix</p>
          <div className="flex gap-2">
            {prefix.split('').map((c, i) => (
              <motion.div
                key={i}
                className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: COLORS.match,
                  borderColor: COLORS.match,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {c}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
