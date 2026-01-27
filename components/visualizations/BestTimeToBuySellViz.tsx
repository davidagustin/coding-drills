'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const PRICES = [7, 1, 5, 3, 6, 4];

interface BuySellStep {
  prices: number[];
  i: number;
  minPrice: number;
  maxProfit: number;
  buyDay: number;
  sellDay: number;
  explanation: string;
}

function computeSteps(): BuySellStep[] {
  const steps: BuySellStep[] = [];
  let minPrice = PRICES[0];
  let maxProfit = 0;
  let buyDay = 0;
  let sellDay = 0;

  steps.push({
    prices: [...PRICES],
    i: -1,
    minPrice: PRICES[0],
    maxProfit: 0,
    buyDay: 0,
    sellDay: 0,
    explanation: 'Start: Find best time to buy and sell stock',
  });

  for (let i = 1; i < PRICES.length; i++) {
    steps.push({
      prices: [...PRICES],
      i,
      minPrice,
      maxProfit,
      buyDay,
      sellDay,
      explanation: `Day ${i}: Price = ${PRICES[i]}`,
    });

    const profit = PRICES[i] - minPrice;

    if (profit > maxProfit) {
      maxProfit = profit;
      sellDay = i;
      steps.push({
        prices: [...PRICES],
        i,
        minPrice,
        maxProfit,
        buyDay,
        sellDay,
        explanation: `Update: Profit = ${PRICES[i]} - ${minPrice} = ${profit}, sell on day ${i}`,
      });
    }

    if (PRICES[i] < minPrice) {
      minPrice = PRICES[i];
      buyDay = i;
      steps.push({
        prices: [...PRICES],
        i,
        minPrice,
        maxProfit,
        buyDay,
        sellDay,
        explanation: `Update: Min price = ${minPrice}, buy on day ${i}`,
      });
    }
  }

  steps.push({
    prices: [...PRICES],
    i: -1,
    minPrice,
    maxProfit,
    buyDay,
    sellDay,
    explanation: `Complete: Max profit = ${maxProfit}, buy on day ${buyDay}, sell on day ${sellDay}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  buy: '#ef4444',
  sell: '#22c55e',
  default: '#3b82f6',
} as const;

export default function BestTimeToBuySellViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { prices, i, maxProfit, buyDay, sellDay, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Best Time to Buy and Sell Stock</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Max Profit: {maxProfit}</p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Stock Prices</h3>
        <div className="flex items-end gap-2 justify-center h-64">
          {prices.map((price, idx) => {
            const isCurrent = i === idx;
            const isBuy = buyDay === idx && step === STEPS.length - 1;
            const isSell = sellDay === idx && step === STEPS.length - 1;

            let bgColor: string = COLORS.default;
            if (isBuy) {
              bgColor = COLORS.buy;
            } else if (isSell) {
              bgColor = COLORS.sell;
            } else if (isCurrent) {
              bgColor = COLORS.current;
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <motion.div
                  className="w-12 rounded-t border-2 flex items-end justify-center font-mono font-bold text-white text-xs p-1"
                  style={{
                    height: `${(price / Math.max(...PRICES)) * 200}px`,
                    backgroundColor: bgColor,
                    borderColor: isCurrent || isBuy || isSell ? '#fff' : bgColor,
                  }}
                  animate={{
                    scale: isCurrent || isBuy || isSell ? 1.1 : 1,
                  }}
                >
                  {price}
                </motion.div>
                <div className="text-xs text-zinc-500">Day {idx}</div>
                {isBuy && <div className="text-xs text-red-400">Buy</div>}
                {isSell && <div className="text-xs text-green-400">Sell</div>}
              </div>
            );
          })}
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
