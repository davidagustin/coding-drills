'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const HEIGHTS = [2, 1, 5, 6, 2, 3];

interface RectangleStep {
  heights: number[];
  stack: number[];
  i: number;
  area: number;
  maxArea: number;
  explanation: string;
}

function computeSteps(): RectangleStep[] {
  const steps: RectangleStep[] = [];
  const stack: number[] = [];
  let maxArea = 0;

  steps.push({
    heights: [...HEIGHTS],
    stack: [],
    i: -1,
    area: 0,
    maxArea: 0,
    explanation: 'Start: Find largest rectangle in histogram',
  });

  for (let i = 0; i <= HEIGHTS.length; i++) {
    const h = i < HEIGHTS.length ? HEIGHTS[i] : 0;

    steps.push({
      heights: [...HEIGHTS],
      stack: [...stack],
      i,
      area: maxArea,
      maxArea,
      explanation: `Check index ${i}, height = ${h}`,
    });

    while (stack.length > 0 && (i === HEIGHTS.length || HEIGHTS[stack[stack.length - 1]] > h)) {
      const height = HEIGHTS[stack.pop() ?? 0];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      const area = height * width;
      maxArea = Math.max(maxArea, area);

      steps.push({
        heights: [...HEIGHTS],
        stack: [...stack],
        i,
        area,
        maxArea,
        explanation: `Pop: height=${height}, width=${width}, area=${area}, maxArea=${maxArea}`,
      });
    }

    if (i < HEIGHTS.length) {
      stack.push(i);
      steps.push({
        heights: [...HEIGHTS],
        stack: [...stack],
        i,
        area: maxArea,
        maxArea,
        explanation: `Push index ${i}`,
      });
    }
  }

  steps.push({
    heights: [...HEIGHTS],
    stack: [],
    i: -1,
    area: maxArea,
    maxArea,
    explanation: `Complete: Largest rectangle area = ${maxArea}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  rectangle: '#22c55e',
  default: '#3b82f6',
} as const;

export default function LargestRectangleViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { heights, stack, i, maxArea, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Largest Rectangle in Histogram</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Max Area: {maxArea}</p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Histogram</h3>
        <div className="flex items-end gap-2 justify-center h-64">
          {heights.map((h, idx) => {
            const isCurrent = i === idx;
            const inStack = stack.includes(idx);

            let bgColor: string = COLORS.default;
            if (isCurrent) {
              bgColor = COLORS.current;
            } else if (inStack) {
              bgColor = COLORS.rectangle;
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <motion.div
                  className="w-12 rounded-t border-2 flex items-end justify-center font-mono font-bold text-white text-xs p-1"
                  style={{
                    height: `${(h / Math.max(...heights)) * 200}px`,
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
