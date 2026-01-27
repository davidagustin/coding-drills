'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const N = 4;

interface CountAndSayStep {
  n: number;
  current: string;
  next: string;
  i: number;
  char: string;
  count: number;
  explanation: string;
}

function computeSteps(): CountAndSayStep[] {
  const steps: CountAndSayStep[] = [];
  let current = '1';

  steps.push({
    n: 1,
    current: '1',
    next: '',
    i: -1,
    char: '',
    count: 0,
    explanation: 'Start: Count and Say sequence',
  });

  for (let n = 2; n <= N; n++) {
    let next = '';
    let i = 0;

    steps.push({
      n,
      current,
      next: '',
      i: -1,
      char: '',
      count: 0,
      explanation: `Generate term ${n} from "${current}"`,
    });

    while (i < current.length) {
      const char = current[i];
      let count = 1;

      while (i + count < current.length && current[i + count] === char) {
        count++;
      }

      steps.push({
        n,
        current,
        next,
        i,
        char,
        count,
        explanation: `Count ${count} of "${char}"`,
      });

      next += count.toString() + char;

      steps.push({
        n,
        current,
        next,
        i: i + count,
        char: '',
        count: 0,
        explanation: `Append "${count}${char}" → "${next}"`,
      });

      i += count;
    }

    current = next;

    steps.push({
      n,
      current,
      next: '',
      i: -1,
      char: '',
      count: 0,
      explanation: `Term ${n}: "${current}"`,
    });
  }

  steps.push({
    n: N,
    current,
    next: '',
    i: -1,
    char: '',
    count: 0,
    explanation: `Complete: Term ${N} = "${current}"`,
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

export default function CountAndSayViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { n, current, next, i, char, count, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Count and Say</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Term {n}: &quot;{current}&quot;
          </p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Current Term</h3>
          <div className="flex gap-1 justify-center flex-wrap">
            {current.split('').map((c, idx) => {
              const isCurrent = i === idx;

              let bgColor: string = COLORS.default;
              if (isCurrent) {
                bgColor = COLORS.current;
              }

              return (
                <motion.div
                  key={idx}
                  className="w-10 h-10 rounded border-2 flex items-center justify-center font-mono font-bold text-white text-sm"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: isCurrent ? '#fff' : bgColor,
                  }}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                >
                  {c}
                </motion.div>
              );
            })}
          </div>
        </div>

        {next && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Next Term</h3>
            <div className="flex gap-1 justify-center flex-wrap">
              {next.split('').map((c, idx) => (
                <motion.div
                  key={idx}
                  className="w-10 h-10 rounded border-2 flex items-center justify-center font-mono font-bold text-white text-sm"
                  style={{
                    backgroundColor: COLORS.processed,
                    borderColor: COLORS.processed,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {c}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {count > 0 && (
          <div className="p-4 bg-zinc-800 rounded-lg">
            <p className="text-white text-sm">
              Count: {count} of &quot;{char}&quot;
            </p>
          </div>
        )}
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
