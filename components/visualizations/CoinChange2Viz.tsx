'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const COINS = [1, 2, 5];
const AMOUNT = 5;

interface CoinChangeStep {
  coins: number[];
  amount: number;
  dp: number[];
  i: number;
  coin: number;
  explanation: string;
}

function computeSteps(): CoinChangeStep[] {
  const steps: CoinChangeStep[] = [];
  const dp = new Array(AMOUNT + 1).fill(0);
  dp[0] = 1;

  steps.push({
    coins: [...COINS],
    amount: AMOUNT,
    dp: [...dp],
    i: -1,
    coin: -1,
    explanation: `Start: Count ways to make ${AMOUNT} with coins [${COINS.join(', ')}]`,
  });

  for (const coin of COINS) {
    steps.push({
      coins: [...COINS],
      amount: AMOUNT,
      dp: [...dp],
      i: -1,
      coin,
      explanation: `Process coin ${coin}`,
    });

    for (let i = coin; i <= AMOUNT; i++) {
      dp[i] += dp[i - coin];
      steps.push({
        coins: [...COINS],
        amount: AMOUNT,
        dp: [...dp],
        i,
        coin,
        explanation: `dp[${i}] += dp[${i - coin}] = ${dp[i]}`,
      });
    }
  }

  steps.push({
    coins: [...COINS],
    amount: AMOUNT,
    dp: [...dp],
    i: -1,
    coin: -1,
    explanation: `Complete: Ways to make ${AMOUNT} = ${dp[AMOUNT]}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  updated: '#22c55e',
  default: '#3b82f6',
} as const;

export default function CoinChange2Viz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { coins, amount, dp, i, coin, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Coin Change II (Count Ways)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Ways: {dp[amount]}</p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Coins</h3>
          <div className="flex gap-2 justify-center">
            {coins.map((c, idx) => {
              const isCurrent = coin === c;
              return (
                <motion.div
                  key={idx}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: isCurrent ? COLORS.current : COLORS.default,
                    borderColor: isCurrent ? '#fff' : COLORS.default,
                  }}
                  animate={{
                    scale: isCurrent ? 1.2 : 1,
                  }}
                >
                  {c}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">DP Array</h3>
          <div className="flex gap-2 justify-center flex-wrap">
            {dp.map((val, idx) => {
              const isCurrent = i === idx;
              const isUpdated = i === idx && coin >= 0;

              let bgColor: string = COLORS.default;
              if (isCurrent) {
                bgColor = isUpdated ? COLORS.updated : COLORS.current;
              }

              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <motion.div
                    className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                    style={{
                      backgroundColor: bgColor,
                      borderColor: isCurrent ? '#fff' : bgColor,
                    }}
                    animate={{
                      scale: isCurrent ? 1.2 : 1,
                    }}
                  >
                    {val}
                  </motion.div>
                  <div className="text-xs text-zinc-500">dp[{idx}]</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
