'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const HOUSES = [2, 3, 2];

interface RobberStep {
  houses: number[];
  dp: number[];
  i: number;
  rob1: number;
  rob2: number;
  explanation: string;
}

function computeSteps(): RobberStep[] {
  const steps: RobberStep[] = [];

  if (HOUSES.length === 0) {
    steps.push({
      houses: [],
      dp: [],
      i: -1,
      rob1: 0,
      rob2: 0,
      explanation: 'No houses',
    });
    return steps;
  }

  if (HOUSES.length === 1) {
    steps.push({
      houses: [...HOUSES],
      dp: [HOUSES[0]],
      i: -1,
      rob1: HOUSES[0],
      rob2: 0,
      explanation: `Only one house: rob ${HOUSES[0]}`,
    });
    return steps;
  }

  function robLinear(houses: number[]): number {
    let rob1 = 0;
    let rob2 = 0;

    steps.push({
      houses: [...houses],
      dp: [],
      i: -1,
      rob1: 0,
      rob2: 0,
      explanation: `Start: Rob houses [${houses.join(', ')}]`,
    });

    for (let i = 0; i < houses.length; i++) {
      const temp = Math.max(rob1 + houses[i], rob2);
      rob1 = rob2;
      rob2 = temp;

      steps.push({
        houses: [...houses],
        dp: [],
        i,
        rob1,
        rob2,
        explanation: `House ${i}: rob1=${rob1}, rob2=${rob2}`,
      });
    }

    return rob2;
  }

  const robFirst = robLinear(HOUSES.slice(0, -1));
  const robLast = robLinear(HOUSES.slice(1));
  const result = Math.max(robFirst, robLast);

  steps.push({
    houses: [...HOUSES],
    dp: [],
    i: -1,
    rob1: robFirst,
    rob2: robLast,
    explanation: `Complete: Max(rob first ${HOUSES.length - 1} houses=${robFirst}, rob last ${HOUSES.length - 1} houses=${robLast}) = ${result}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  robbed: '#ef4444',
  skipped: '#22c55e',
  default: '#3b82f6',
} as const;

export default function HouseRobber2Viz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { houses, i, rob1, rob2, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">House Robber II (Circular)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Max Robbed: {Math.max(rob1, rob2)}
          </p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Houses</h3>
        <div className="flex gap-2 justify-center">
          {houses.map((money, idx) => {
            const isCurrent = i === idx;

            let bgColor: string = COLORS.default;
            if (isCurrent) {
              bgColor = COLORS.current;
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
                  {money}
                </motion.div>
                <div className="text-xs text-zinc-500">House {idx}</div>
              </div>
            );
          })}
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
