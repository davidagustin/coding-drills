'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NUMS = [2, 3, -2, 4];

interface ProductStep {
  i: number;
  currentMax: number;
  currentMin: number;
  maxProduct: number;
  explanation: string;
}

function computeSteps(): ProductStep[] {
  const steps: ProductStep[] = [];
  let maxProduct = NUMS[0];
  let currentMax = NUMS[0];
  let currentMin = NUMS[0];

  steps.push({
    i: 0,
    currentMax,
    currentMin,
    maxProduct,
    explanation: `Initialize: currentMax=${currentMax}, currentMin=${currentMin}, maxProduct=${maxProduct}`,
  });

  for (let i = 1; i < NUMS.length; i++) {
    const num = NUMS[i];
    const candidates = [num, num * currentMax, num * currentMin];
    const newMax = Math.max(...candidates);
    const newMin = Math.min(...candidates);

    steps.push({
      i,
      currentMax: newMax,
      currentMin: newMin,
      maxProduct: Math.max(maxProduct, newMax),
      explanation: `nums[${i}]=${num}: candidates=[${candidates.join(', ')}] → max=${newMax}, min=${newMin}`,
    });

    currentMax = newMax;
    currentMin = newMin;
    maxProduct = Math.max(maxProduct, currentMax);
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  positive: '#22c55e',
  negative: '#ef4444',
  current: '#eab308',
} as const;

export default function MaxProductSubarrayViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Maximum Product Subarray</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Max Product: {currentStep.maxProduct}
          </p>
        )}
      </div>

      <div className="mb-6 flex items-center justify-center gap-2">
        {NUMS.map((value, idx) => {
          const isCurrent = currentStep.i === idx;
          const bgColor = value >= 0 ? COLORS.positive : COLORS.negative;

          return (
            <motion.div
              key={idx}
              className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
              style={{
                backgroundColor: isCurrent ? `${COLORS.current}40` : `${bgColor}20`,
                borderColor: isCurrent ? COLORS.current : bgColor,
              }}
              animate={{ scale: isCurrent ? 1.15 : 1 }}
            >
              {value}
            </motion.div>
          );
        })}
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-zinc-800 rounded-lg">
          <div className="text-xs text-zinc-500 mb-1">currentMax</div>
          <div className="text-lg font-mono font-bold text-green-400">{currentStep.currentMax}</div>
        </div>
        <div className="p-4 bg-zinc-800 rounded-lg">
          <div className="text-xs text-zinc-500 mb-1">currentMin</div>
          <div className="text-lg font-mono font-bold text-red-400">{currentStep.currentMin}</div>
        </div>
        <div className="p-4 bg-zinc-800 rounded-lg">
          <div className="text-xs text-zinc-500 mb-1">maxProduct</div>
          <div className="text-lg font-mono font-bold text-yellow-400">
            {currentStep.maxProduct}
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.current} />
    </div>
  );
}
