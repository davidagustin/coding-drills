'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const S = 'leetcode';
const WORD_DICT = ['leet', 'code'];

interface WordBreakStep {
  i: number;
  j: number;
  dp: boolean[];
  substring: string;
  explanation: string;
  found: boolean;
}

function computeSteps(): WordBreakStep[] {
  const steps: WordBreakStep[] = [];
  const dp = new Array(S.length + 1).fill(false);
  dp[0] = true;

  steps.push({
    i: 0,
    j: -1,
    dp: [...dp],
    substring: '',
    explanation: 'Base case: dp[0] = true (empty string is valid)',
    found: false,
  });

  for (let i = 1; i <= S.length; i++) {
    for (let j = 0; j < i; j++) {
      const substring = S.substring(j, i);
      const inDict = WORD_DICT.includes(substring);
      if (dp[j] && inDict) {
        dp[i] = true;
        steps.push({
          i,
          j,
          dp: [...dp],
          substring,
          explanation: `dp[${j}]=true and "${substring}" in dict → dp[${i}]=true`,
          found: true,
        });
        break;
      } else {
        steps.push({
          i,
          j,
          dp: [...dp],
          substring,
          explanation: `Check "${substring}": ${inDict ? 'in dict' : 'not in dict'} but dp[${j}]=${dp[j]}`,
          found: false,
        });
      }
    }
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  valid: '#22c55e',
  current: '#eab308',
  checking: '#3b82f6',
} as const;

export default function WordBreakViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Word Break</h2>
      <div className="mb-4 text-zinc-400">
        String: <span className="font-mono text-white">{S}</span> | Dict:{' '}
        <span className="font-mono text-white">{WORD_DICT.join(', ')}</span>
      </div>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p
            className={`font-bold text-lg mt-2 ${currentStep.dp[S.length] ? 'text-green-400' : 'text-red-400'}`}
          >
            {currentStep.dp[S.length] ? 'Can be segmented' : 'Cannot be segmented'}
          </p>
        )}
      </div>

      <div className="mb-6 flex items-center justify-center gap-2 flex-wrap">
        {S.split('').map((char, idx) => {
          const isCurrent = currentStep.i === idx + 1;
          const isInRange = currentStep.j >= 0 && idx >= currentStep.j && idx < currentStep.i;
          const isValid = currentStep.dp[idx + 1];

          let bgColor = '#1f2937';
          if (isValid) bgColor = COLORS.valid;
          else if (isCurrent) bgColor = COLORS.current;
          else if (isInRange) bgColor = COLORS.checking;

          return (
            <motion.div
              key={idx}
              className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
              style={{
                backgroundColor: `${bgColor}40`,
                borderColor: bgColor,
              }}
              animate={{ scale: isCurrent ? 1.15 : 1 }}
            >
              {char}
            </motion.div>
          );
        })}
      </div>

      <div className="mb-6 grid grid-cols-6 gap-2">
        {currentStep.dp.map((value, idx) => (
          <div
            key={idx}
            className="p-2 rounded border text-center text-xs"
            style={{
              backgroundColor: value ? `${COLORS.valid}20` : '#1f2937',
              borderColor: value ? COLORS.valid : '#374151',
            }}
          >
            <div className="text-zinc-500">dp[{idx}]</div>
            <div className={`font-mono font-bold ${value ? 'text-green-400' : 'text-zinc-600'}`}>
              {value ? 'T' : 'F'}
            </div>
          </div>
        ))}
      </div>

      <VizControls controls={controls} accentColor={COLORS.checking} />
    </div>
  );
}
