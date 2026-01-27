'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const WEIGHTS = [2, 3, 4, 5];
const VALUES = [3, 4, 5, 6];
const CAPACITY = 5;

interface KnapsackStep {
  i: number;
  w: number;
  dp: number[][];
  explanation: string;
  include: boolean;
}

function computeSteps(): KnapsackStep[] {
  const steps: KnapsackStep[] = [];
  const n = WEIGHTS.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(CAPACITY + 1).fill(0));

  steps.push({
    i: 0,
    w: 0,
    dp: dp.map((r) => [...r]),
    explanation: 'Initialize: dp[0][w] = 0 for all w (no items)',
    include: false,
  });

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= CAPACITY; w++) {
      dp[i][w] = dp[i - 1][w];
      let include = false;

      if (WEIGHTS[i - 1] <= w) {
        const includeValue = VALUES[i - 1] + dp[i - 1][w - WEIGHTS[i - 1]];
        if (includeValue > dp[i][w]) {
          dp[i][w] = includeValue;
          include = true;
        }
      }

      steps.push({
        i,
        w,
        dp: dp.map((r) => [...r]),
        explanation: `Item ${i - 1} (w=${WEIGHTS[i - 1]}, v=${VALUES[i - 1]}), capacity ${w}: ${include ? `include → ${dp[i][w]}` : `exclude → ${dp[i][w]}`}`,
        include,
      });
    }
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  include: '#22c55e',
  exclude: '#6b7280',
  current: '#eab308',
} as const;

export default function Knapsack01Viz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">0/1 Knapsack (Capacity: {CAPACITY})</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Max Value: {currentStep.dp[WEIGHTS.length][CAPACITY]}
          </p>
        )}
      </div>

      <div className="mb-6 flex gap-4 justify-center">
        {WEIGHTS.map((weight, idx) => (
          <div key={idx} className="text-center">
            <div className="text-xs text-zinc-500 mb-1">Item {idx}</div>
            <div className="w-20 h-20 rounded-lg border-2 flex flex-col items-center justify-center font-mono font-bold text-white bg-zinc-800">
              <div>w={weight}</div>
              <div>v={VALUES[idx]}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6 flex justify-center overflow-x-auto">
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${CAPACITY + 2}, 1fr)` }}>
          <div className="p-2" />
          <div className="p-2" />
          {Array.from({ length: CAPACITY + 1 }, (_, w) => (
            <div key={w} className="p-2 text-center font-mono text-xs text-zinc-400">
              w={w}
            </div>
          ))}
          {currentStep.dp.map((row, i) => (
            <>
              <div className="p-2 text-center font-mono text-xs text-zinc-400">
                {i === 0 ? '' : `i=${i - 1}`}
              </div>
              {row.map((value, w) => {
                const isCurrent = currentStep.i === i && currentStep.w === w;
                return (
                  <motion.div
                    key={`${i}-${w}`}
                    className="w-12 h-12 rounded border-2 flex items-center justify-center font-mono font-bold text-white text-xs"
                    style={{
                      backgroundColor: isCurrent ? `${COLORS.current}40` : '#1f2937',
                      borderColor: isCurrent ? COLORS.current : '#374151',
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
