'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const HEIGHT = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];

interface TrapStep {
  height: number[];
  left: number;
  right: number;
  leftMax: number;
  rightMax: number;
  water: number;
  totalWater: number;
  explanation: string;
}

function computeSteps(): TrapStep[] {
  const steps: TrapStep[] = [];
  let left = 0;
  let right = HEIGHT.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let totalWater = 0;

  steps.push({
    height: [...HEIGHT],
    left,
    right,
    leftMax: 0,
    rightMax: 0,
    water: 0,
    totalWater: 0,
    explanation: 'Start: Trapping rain water using two pointers',
  });

  while (left < right) {
    if (HEIGHT[left] < HEIGHT[right]) {
      if (HEIGHT[left] >= leftMax) {
        leftMax = HEIGHT[left];
        steps.push({
          height: [...HEIGHT],
          left,
          right,
          leftMax,
          rightMax,
          water: 0,
          totalWater,
          explanation: `Left pointer: update leftMax = ${leftMax}`,
        });
      } else {
        const water = leftMax - HEIGHT[left];
        totalWater += water;
        steps.push({
          height: [...HEIGHT],
          left,
          right,
          leftMax,
          rightMax,
          water,
          totalWater,
          explanation: `Left pointer: trap ${water} units of water at index ${left}`,
        });
      }
      left++;
    } else {
      if (HEIGHT[right] >= rightMax) {
        rightMax = HEIGHT[right];
        steps.push({
          height: [...HEIGHT],
          left,
          right,
          leftMax,
          rightMax,
          water: 0,
          totalWater,
          explanation: `Right pointer: update rightMax = ${rightMax}`,
        });
      } else {
        const water = rightMax - HEIGHT[right];
        totalWater += water;
        steps.push({
          height: [...HEIGHT],
          left,
          right,
          leftMax,
          rightMax,
          water,
          totalWater,
          explanation: `Right pointer: trap ${water} units of water at index ${right}`,
        });
      }
      right--;
    }
  }

  steps.push({
    height: [...HEIGHT],
    left,
    right,
    leftMax,
    rightMax,
    water: 0,
    totalWater,
    explanation: `Complete: Total trapped water = ${totalWater}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  water: '#3b82f6',
  bar: '#6b7280',
  default: '#1f2937',
} as const;

export default function TrapRainWaterViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { height, left, right, leftMax, rightMax, totalWater, explanation } = currentStep;
  const maxHeight = Math.max(...HEIGHT);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Trapping Rain Water</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Total Water: {totalWater}</p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Elevation Map</h3>
        <div className="flex items-end gap-2 justify-center h-64">
          {height.map((h, idx) => {
            const isLeft = left === idx;
            const isRight = right === idx;
            const isCurrent = isLeft || isRight;
            const trapped = Math.min(leftMax, rightMax) - h;
            const hasWater = trapped > 0 && idx >= left && idx <= right;

            let bgColor: string = COLORS.bar;
            if (isCurrent) {
              bgColor = COLORS.current;
            } else if (hasWater) {
              bgColor = COLORS.water;
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                {hasWater && (
                  <motion.div
                    className="w-12 rounded-t border-2 flex items-center justify-center font-mono font-bold text-white text-xs"
                    style={{
                      height: `${(trapped / maxHeight) * 200}px`,
                      backgroundColor: COLORS.water,
                      borderColor: COLORS.water,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {trapped}
                  </motion.div>
                )}
                <motion.div
                  className="w-12 rounded-t border-2 flex items-end justify-center font-mono font-bold text-white text-xs p-1"
                  style={{
                    height: `${(h / maxHeight) * 200}px`,
                    backgroundColor: bgColor,
                    borderColor: isCurrent ? '#fff' : bgColor,
                  }}
                  animate={{
                    scale: isCurrent ? 1.05 : 1,
                  }}
                >
                  {h}
                </motion.div>
                <div className="text-xs text-zinc-500">{idx}</div>
              </div>
            );
          })}
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
