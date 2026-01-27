'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Pre-computed DP steps                                             */
/* ------------------------------------------------------------------ */

const HOUSES = [1, 2, 3, 1] as const;

interface RobberStep {
  houseIndex: number;
  houseValue: number;
  prev2: number;
  prev1: number;
  current: number;
  decision: 'rob' | 'skip';
  explanation: string;
  dp: number[];
}

function computeSteps(): RobberStep[] {
  const steps: RobberStep[] = [];
  let prev2 = 0;
  let prev1 = 0;
  const dp: number[] = [0];

  // Initial state
  steps.push({
    houseIndex: -1,
    houseValue: 0,
    prev2: 0,
    prev1: 0,
    current: 0,
    decision: 'skip',
    explanation: 'Base case: dp[0] = 0 (no houses)',
    dp: [...dp],
  });

  // Process each house
  for (let i = 0; i < HOUSES.length; i++) {
    const houseValue = HOUSES[i];
    const robCurrent = prev2 + houseValue;
    const skipCurrent = prev1;
    const current = Math.max(robCurrent, skipCurrent);
    const decision = robCurrent > skipCurrent ? 'rob' : 'skip';

    dp.push(current);

    steps.push({
      houseIndex: i,
      houseValue,
      prev2,
      prev1,
      current,
      decision,
      explanation: `House ${i}: rob=${robCurrent} (prev2=${prev2} + value=${houseValue}), skip=${skipCurrent} (prev1=${prev1}) → ${decision} → dp[${i + 1}]=${current}`,
      dp: [...dp],
    });

    prev2 = prev1;
    prev1 = current;
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const COLORS = {
  house: '#3b82f6',
  robbed: '#22c55e',
  skipped: '#6b7280',
  current: '#eab308',
  dpValue: '#f97316',
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HouseRobberViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { houseIndex, prev2, prev1, current, explanation, dp } = currentStep;

  // Determine which houses were robbed (greedy reconstruction)
  const robbedHouses = useMemo(() => {
    const robbed = new Set<number>();
    const i = dp.length - 1;
    let prev2Val = 0;
    let prev1Val = 0;

    for (let j = 0; j < i; j++) {
      const robValue = prev2Val + HOUSES[j];
      const skipValue = prev1Val;
      if (robValue > skipValue) {
        robbed.add(j);
        prev2Val = prev1Val;
        prev1Val = robValue;
      } else {
        prev2Val = prev1Val;
        prev1Val = skipValue;
      }
    }
    return robbed;
  }, [dp]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">House Robber (Dynamic Programming)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Maximum Amount: {current}</p>
        )}
      </div>

      {/* Houses Visualization */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Houses</h3>
        <div className="flex items-end justify-center gap-4">
          {HOUSES.map((value, idx) => {
            const isCurrent = houseIndex === idx;
            const isRobbed = robbedHouses.has(idx) && step >= idx + 1;
            const height = value * 40;

            let bgColor: string = COLORS.house;
            let borderColor: string = COLORS.house;
            let scale = 1;

            if (isCurrent) {
              bgColor = COLORS.current;
              borderColor = COLORS.current;
              scale = 1.1;
            } else if (isRobbed) {
              bgColor = COLORS.robbed;
              borderColor = COLORS.robbed;
            }

            return (
              <motion.div
                key={idx}
                className="flex flex-col items-center"
                animate={{ scale }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="w-20 rounded-t-lg border-2 flex items-end justify-center font-mono font-bold text-white pb-2"
                  style={{
                    height: `${height}px`,
                    backgroundColor: bgColor,
                    borderColor,
                    minHeight: '40px',
                  }}
                >
                  {value}
                </motion.div>
                <div className="text-xs text-zinc-500 mt-1">House {idx}</div>
                {isRobbed && <div className="text-xs text-green-400 font-bold mt-1">✓ Robbed</div>}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* DP Table */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">DP Table</h3>
        <div className="grid grid-cols-5 gap-2">
          {dp.map((value, idx) => {
            const isCurrent = idx === dp.length - 1 && houseIndex >= 0;
            return (
              <motion.div
                key={idx}
                className="p-3 rounded-lg border-2 text-center"
                style={{
                  backgroundColor: isCurrent ? `${COLORS.dpValue}20` : `${COLORS.house}10`,
                  borderColor: isCurrent ? COLORS.dpValue : `${COLORS.house}40`,
                }}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                }}
              >
                <div className="text-xs text-zinc-500 mb-1">dp[{idx}]</div>
                <div
                  className="text-lg font-mono font-bold"
                  style={{
                    color: COLORS.dpValue,
                  }}
                >
                  {value}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Current State */}
      {houseIndex >= 0 && (
        <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-zinc-500 mb-1">prev2</div>
              <div className="text-lg font-mono font-bold" style={{ color: COLORS.dpValue }}>
                {prev2}
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-1">prev1</div>
              <div className="text-lg font-mono font-bold" style={{ color: COLORS.dpValue }}>
                {prev1}
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-1">current</div>
              <div className="text-lg font-mono font-bold" style={{ color: COLORS.dpValue }}>
                {current}
              </div>
            </div>
          </div>
        </div>
      )}

      <VizControls controls={controls} accentColor={COLORS.house} />
    </div>
  );
}
