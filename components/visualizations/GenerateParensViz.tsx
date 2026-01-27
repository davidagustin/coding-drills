'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const N = 3;

interface ParenStep {
  current: string;
  open: number;
  close: number;
  explanation: string;
  result: string[];
}

function computeSteps(): ParenStep[] {
  const steps: ParenStep[] = [];
  const result: string[] = [];

  function generate(current: string, open: number, close: number): void {
    if (current.length === 2 * N) {
      result.push(current);
      steps.push({
        current,
        open,
        close,
        explanation: `Complete: "${current}" added to result`,
        result: [...result],
      });
      return;
    }

    if (open < N) {
      steps.push({
        current,
        open,
        close,
        explanation: `Add '(': open=${open} < ${N}`,
        result: [...result],
      });
      generate(`${current}(`, open + 1, close);
    }

    if (close < open) {
      steps.push({
        current,
        open,
        close,
        explanation: `Add ')': close=${close} < open=${open}`,
        result: [...result],
      });
      generate(`${current})`, open, close + 1);
    }
  }

  generate('', 0, 0);
  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  complete: '#22c55e',
} as const;

export default function GenerateParensViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Generate Valid Parentheses (n={N})</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Generated: {currentStep.result.length} combinations
          </p>
        )}
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          {currentStep.current.split('').map((char, idx) => (
            <motion.div
              key={idx}
              className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white text-xl"
              style={{
                backgroundColor: `${COLORS.current}40`,
                borderColor: COLORS.current,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {char}
            </motion.div>
          ))}
        </div>
        <div className="text-center text-sm text-zinc-400">
          open={currentStep.open}, close={currentStep.close}
        </div>
      </div>

      {currentStep.result.length > 0 && (
        <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
          <div className="text-sm text-zinc-400 mb-2">Results:</div>
          <div className="flex gap-2 flex-wrap">
            {currentStep.result.map((str, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded bg-green-500 text-white font-mono text-sm"
              >
                {str}
              </span>
            ))}
          </div>
        </div>
      )}

      <VizControls controls={controls} accentColor={COLORS.current} />
    </div>
  );
}
