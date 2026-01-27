'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const S = '226';

interface DecodeStep {
  i: number;
  dp: number[];
  oneDigit: number | null;
  twoDigits: number | null;
  explanation: string;
}

function computeSteps(): DecodeStep[] {
  const steps: DecodeStep[] = [];
  const dp = new Array(S.length + 1).fill(0);
  dp[0] = 1;
  dp[1] = S[0] !== '0' ? 1 : 0;

  steps.push({
    i: 1,
    dp: [...dp],
    oneDigit: parseInt(S[0], 10),
    twoDigits: null,
    explanation: `Base: dp[0]=1, dp[1]=${dp[1]} (first digit ${S[0]} is valid)`,
  });

  for (let i = 2; i <= S.length; i++) {
    const oneDigit = parseInt(S[i - 1], 10);
    const twoDigits = parseInt(S.substring(i - 2, i), 10);
    const _prevDp = dp[i];

    if (oneDigit >= 1 && oneDigit <= 9) {
      dp[i] += dp[i - 1];
    }
    if (twoDigits >= 10 && twoDigits <= 26) {
      dp[i] += dp[i - 2];
    }

    steps.push({
      i,
      dp: [...dp],
      oneDigit: oneDigit >= 1 && oneDigit <= 9 ? oneDigit : null,
      twoDigits: twoDigits >= 10 && twoDigits <= 26 ? twoDigits : null,
      explanation: `dp[${i}]: oneDigit=${oneDigit >= 1 && oneDigit <= 9 ? `${oneDigit} (valid)` : 'invalid'}, twoDigits=${twoDigits >= 10 && twoDigits <= 26 ? `${twoDigits} (valid)` : 'invalid'} → ${dp[i]} ways`,
    });
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  valid: '#22c55e',
  current: '#eab308',
  computed: '#3b82f6',
} as const;

export default function DecodeWaysViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Decode Ways</h2>
      <div className="mb-4 text-zinc-400">
        String: <span className="font-mono text-white">{S}</span>
      </div>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Total Ways: {currentStep.dp[S.length]}
          </p>
        )}
      </div>

      <div className="mb-6 flex items-center justify-center gap-2">
        {S.split('').map((char, idx) => {
          const isCurrent = currentStep.i === idx + 1;
          const isOneDigit = currentStep.oneDigit !== null && idx === currentStep.i - 1;
          const isTwoDigits =
            currentStep.twoDigits !== null && idx >= currentStep.i - 2 && idx < currentStep.i;

          let bgColor = '#1f2937';
          if (isCurrent) bgColor = COLORS.current;
          else if (isOneDigit || isTwoDigits) bgColor = COLORS.valid;

          return (
            <motion.div
              key={idx}
              className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
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

      <div className="mb-6 grid grid-cols-4 gap-2">
        {currentStep.dp.map((value, idx) => (
          <div
            key={idx}
            className="p-3 rounded border text-center"
            style={{
              backgroundColor:
                idx === currentStep.i ? `${COLORS.current}20` : `${COLORS.computed}10`,
              borderColor: idx === currentStep.i ? COLORS.current : COLORS.computed,
            }}
          >
            <div className="text-xs text-zinc-500">dp[{idx}]</div>
            <div className="text-lg font-mono font-bold" style={{ color: COLORS.computed }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      <VizControls controls={controls} accentColor={COLORS.computed} />
    </div>
  );
}
