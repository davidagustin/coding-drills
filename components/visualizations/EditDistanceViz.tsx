'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const A = 'horse';
const B = 'ros';

interface EditStep {
  i: number;
  j: number;
  dp: number[][];
  explanation: string;
  operation: 'match' | 'insert' | 'delete' | 'replace' | null;
}

function computeSteps(): EditStep[] {
  const steps: EditStep[] = [];
  const m = A.length;
  const n = B.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  steps.push({
    i: 0,
    j: 0,
    dp: dp.map((r) => [...r]),
    explanation: 'Base cases: dp[i][0] = i (delete all), dp[0][j] = j (insert all)',
    operation: null,
  });

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (A[i - 1] === B[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
        steps.push({
          i,
          j,
          dp: dp.map((r) => [...r]),
          explanation: `Match: '${A[i - 1]}' === '${B[j - 1]}' → no operation, dp[${i}][${j}] = ${dp[i][j]}`,
          operation: 'match',
        });
      } else {
        const insert = dp[i][j - 1] + 1;
        const deleteOp = dp[i - 1][j] + 1;
        const replace = dp[i - 1][j - 1] + 1;
        dp[i][j] = Math.min(insert, deleteOp, replace);
        steps.push({
          i,
          j,
          dp: dp.map((r) => [...r]),
          explanation: `No match: min(insert=${insert}, delete=${deleteOp}, replace=${replace}) = ${dp[i][j]}`,
          operation: dp[i][j] === insert ? 'insert' : dp[i][j] === deleteOp ? 'delete' : 'replace',
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
  insert: '#3b82f6',
  delete: '#ef4444',
  replace: '#f97316',
  current: '#eab308',
} as const;

export default function EditDistanceViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Edit Distance (Levenshtein)</h2>
      <div className="mb-4 text-zinc-400">
        A: <span className="font-mono text-white">{A}</span> → B:{' '}
        <span className="font-mono text-white">{B}</span>
      </div>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Edit Distance: {currentStep.dp[A.length][B.length]}
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

                let opColor: string = COLORS.current;
                if (currentStep.operation === 'match') opColor = COLORS.match;
                else if (currentStep.operation === 'insert') opColor = COLORS.insert;
                else if (currentStep.operation === 'delete') opColor = COLORS.delete;
                else if (currentStep.operation === 'replace') opColor = COLORS.replace;

                return (
                  <motion.div
                    key={`${i}-${j}`}
                    className="w-12 h-12 rounded border-2 flex items-center justify-center font-mono font-bold text-white text-xs"
                    style={{
                      backgroundColor: isCurrent
                        ? `${opColor}40`
                        : isComputed
                          ? `${COLORS.current}20`
                          : '#1f2937',
                      borderColor: isCurrent ? opColor : isComputed ? COLORS.current : '#374151',
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

      <VizControls controls={controls} accentColor={COLORS.current} />
    </div>
  );
}
