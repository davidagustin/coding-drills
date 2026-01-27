'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const STRING = 'the sky is blue';

interface ReverseStep {
  words: string[];
  result: string;
  explanation: string;
}

function computeSteps(): ReverseStep[] {
  const steps: ReverseStep[] = [];
  const words = STRING.trim().split(/\s+/);
  
  steps.push({
    words: [...words],
    result: '',
    explanation: `Start: Reverse words in "${STRING}"`,
  });
  
  const reversed: string[] = [];
  for (let i = words.length - 1; i >= 0; i--) {
    reversed.push(words[i]);
    steps.push({
      words: [...words],
      result: reversed.join(' '),
      explanation: `Add "${words[i]}" to result`,
    });
  }
  
  steps.push({
    words: [...words],
    result: reversed.join(' '),
    explanation: `Complete: "${reversed.join(' ')}"`,
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

export default function ReverseWordsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { words, result, explanation } = currentStep;
  const resultWords = result ? result.split(' ') : [];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Reverse Words in String</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Result: &quot;{result}&quot;
          </p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Original</h3>
          <div className="flex gap-2 justify-center flex-wrap">
            {words.map((word, i) => (
              <motion.div
                key={i}
                className="px-4 py-2 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: COLORS.default,
                  borderColor: COLORS.default,
                }}
              >
                {word}
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Reversed</h3>
          <div className="flex gap-2 justify-center flex-wrap">
            {resultWords.map((word, i) => (
              <motion.div
                key={i}
                className="px-4 py-2 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: COLORS.processed,
                  borderColor: COLORS.processed,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {word}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
