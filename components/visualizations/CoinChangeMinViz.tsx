'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Pre-computed DP steps                                             */
/* ------------------------------------------------------------------ */

const COINS = [1, 5, 10, 25] as const;
const AMOUNT = 30;

interface CoinStep {
  amount: number;
  coin: number;
  dp: number[];
  explanation: string;
  tryingCoin: boolean;
  bestValue: number | null;
}

function computeSteps(): CoinStep[] {
  const steps: CoinStep[] = [];
  const dp = new Array(AMOUNT + 1).fill(Infinity);
  dp[0] = 0;

  // Initial state
  steps.push({
    amount: 0,
    coin: 0,
    dp: [...dp],
    explanation: 'Base case: dp[0] = 0 (zero coins for amount 0)',
    tryingCoin: false,
    bestValue: null,
  });

  // Fill DP table
  for (let i = 1; i <= AMOUNT; i++) {
    let best = Infinity;
    let bestCoin = 0;

    for (const coin of COINS) {
      if (coin <= i) {
        steps.push({
          amount: i,
          coin,
          dp: [...dp],
          explanation: `Amount ${i}: Try coin ${coin}, dp[${i - coin}]=${dp[i - coin]} → ${dp[i - coin] + 1} coins`,
          tryingCoin: true,
          bestValue: dp[i - coin] + 1,
        });

        if (dp[i - coin] + 1 < best) {
          best = dp[i - coin] + 1;
          bestCoin = coin;
        }
      }
    }

    dp[i] = best;

    steps.push({
      amount: i,
      coin: bestCoin,
      dp: [...dp],
      explanation: `Amount ${i}: Best = ${best} coin${best !== 1 ? 's' : ''} (using coin ${bestCoin})`,
      tryingCoin: false,
      bestValue: best,
    });
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const COLORS = {
  coin: '#3b82f6',
  current: '#eab308',
  computed: '#22c55e',
  impossible: '#ef4444',
  dpValue: '#f97316',
} as const;

const COIN_COLORS: Record<number, string> = {
  1: '#6366f1',
  5: '#8b5cf6',
  10: '#ec4899',
  25: '#f59e0b',
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CoinChangeMinViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { amount, coin, dp, explanation, tryingCoin, bestValue } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Minimum Coins to Make Amount</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Answer: {dp[AMOUNT] === Infinity ? 'Impossible' : `${dp[AMOUNT]} coins`}
          </p>
        )}
      </div>

      {/* Coins Display */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Available Coins</h3>
        <div className="flex justify-center gap-4">
          {COINS.map((c) => {
            const isCurrent = tryingCoin && coin === c && amount > 0;
            return (
              <motion.div
                key={c}
                className="w-16 h-16 rounded-full border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: isCurrent ? COLORS.current : COIN_COLORS[c] || COLORS.coin,
                  borderColor: isCurrent ? COLORS.current : COIN_COLORS[c] || COLORS.coin,
                }}
                animate={{
                  scale: isCurrent ? 1.2 : 1,
                }}
              >
                {c}¢
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* DP Table */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">DP Table</h3>
        <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
          {dp.map((value, idx) => {
            const isCurrent = idx === amount && amount > 0;
            const isImpossible = value === Infinity;
            const isComputed = value !== Infinity && idx <= amount;

            return (
              <motion.div
                key={idx}
                className="p-2 rounded-lg border-2 text-center"
                style={{
                  backgroundColor: isCurrent
                    ? `${COLORS.current}20`
                    : isComputed
                      ? `${COLORS.computed}10`
                      : `${COLORS.coin}10`,
                  borderColor: isCurrent
                    ? COLORS.current
                    : isComputed
                      ? `${COLORS.computed}40`
                      : `${COLORS.coin}40`,
                }}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                }}
              >
                <div className="text-xs text-zinc-500 mb-1">dp[{idx}]</div>
                <div
                  className="text-sm font-mono font-bold"
                  style={{
                    color: isImpossible ? COLORS.impossible : COLORS.dpValue,
                  }}
                >
                  {isImpossible ? '∞' : value}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Current Calculation */}
      {tryingCoin && amount > 0 && coin <= amount && (
        <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
          <div className="text-center">
            <div className="text-xs text-zinc-500 mb-2">Calculating dp[{amount}]</div>
            <div className="flex items-center justify-center gap-2 text-lg">
              <span className="font-mono">dp[{amount - coin}]</span>
              <span className="text-zinc-500">+</span>
              <span className="font-mono" style={{ color: COLORS.current }}>
                1 coin ({coin}¢)
              </span>
              <span className="text-zinc-500">=</span>
              <span className="font-mono font-bold" style={{ color: COLORS.dpValue }}>
                {bestValue}
              </span>
            </div>
          </div>
        </div>
      )}

      <VizControls controls={controls} accentColor={COLORS.coin} />
    </div>
  );
}
