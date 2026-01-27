'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const A = 'abcde';
const B = 'ace';

interface LCSStep {
  i: number;
  j: number;
  dp: number[][];
  explanation: string;
  match: boolean;
}

function computeSteps(): LCSStep[] {
  const steps: LCSStep[] = [];
  const m = A.length;
  const n = B.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  steps.push({
    i: 0,
    j: 0,
    dp: dp.map((r) => [...r]),
    explanation: 'Initialize DP table with zeros',
    match: false,
  });

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const match = A[i - 1] === B[j - 1];
      if (match) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        steps.push({
          i,
          j,
          dp: dp.map((r) => [...r]),
          explanation: `Match: '${A[i - 1]}' === '${B[j - 1]}' → dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${dp[i][j]}`,
          match: true,
        });
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        steps.push({
          i,
          j,
          dp: dp.map((r) => [...r]),
          explanation: `No match: '${A[i - 1]}' !== '${B[j - 1]}' → dp[${i}][${j}] = max(${dp[i - 1][j]}, ${dp[i][j - 1]}) = ${dp[i][j]}`,
          match: false,
        });
      }
    }
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  match: '#22c55e',
  current: '#eab308',
  computed: '#3b82f6',
} as const;

export default function LCSLengthViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">
        Longest Common Subsequence (LCS) Length
      </h2>
      <div className="mb-4 text-zinc-400">
        String A: <span className="font-mono text-white">{A}</span> | String B:{' '}
        <span className="font-mono text-white">{B}</span>
      </div>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            LCS Length: {currentStep.dp[A.length][B.length]}
          </p>
        )}
      </div>

      <div className="mb-6 flex justify-center">
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${B.length + 2}, 1fr)` }}>
          <div className="p-2" />
          <div className="p-2" />
          {B.split('').map((char, idx) => (
            <div key={idx} className="p-2 text-center font-mono text-sm text-zinc-400">
              {char}
            </div>
          ))}
          {currentStep.dp.map((row, i) => (
            <>
              <div className="p-2 text-center font-mono text-sm text-zinc-400">
                {i === 0 ? '' : A[i - 1]}
              </div>
              {row.map((value, j) => {
                const isCurrent = currentStep.i === i && currentStep.j === j;
                const isComputed = i <= currentStep.i && j <= currentStep.j;
                const isMatch = currentStep.match && isCurrent;

                return (
                  <motion.div
                    key={`${i}-${j}`}
                    className="w-12 h-12 rounded border-2 flex items-center justify-center font-mono font-bold text-white text-xs"
                    style={{
                      backgroundColor: isMatch
                        ? `${COLORS.match}40`
                        : isCurrent
                          ? `${COLORS.current}40`
                          : isComputed
                            ? `${COLORS.computed}20`
                            : '#1f2937',
                      borderColor: isMatch
                        ? COLORS.match
                        : isCurrent
                          ? COLORS.current
                          : isComputed
                            ? COLORS.computed
                            : '#374151',
                    }}
                    animate={{ scale: isCurrent ? 1.15 : 1 }}
                  >
                    {value}
                  </motion.div>
                );
              })}
            </>
          ))}
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.computed} />
    </div>
  );
}
