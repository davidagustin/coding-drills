'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NUMS = [2, 3, 1, 1, 4];

interface JumpStep {
  i: number;
  maxReach: number;
  explanation: string;
  canReach: boolean;
}

function computeSteps(): JumpStep[] {
  const steps: JumpStep[] = [];
  let maxReach = 0;

  for (let i = 0; i < NUMS.length; i++) {
    if (i > maxReach) {
      steps.push({
        i,
        maxReach,
        explanation: `Index ${i} > maxReach ${maxReach} → Cannot reach`,
        canReach: false,
      });
      return steps;
    }

    maxReach = Math.max(maxReach, i + NUMS[i]);
    steps.push({
      i,
      maxReach,
      explanation: `Index ${i}: jump=${NUMS[i]}, maxReach = max(${maxReach - NUMS[i]}, ${i + NUMS[i]}) = ${maxReach}`,
      canReach: maxReach >= NUMS.length - 1,
    });

    if (maxReach >= NUMS.length - 1) {
      break;
    }
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  reachable: '#22c55e',
  current: '#eab308',
  unreachable: '#ef4444',
} as const;

export default function JumpGameViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Jump Game</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p
            className={`font-bold text-lg mt-2 ${currentStep.canReach ? 'text-green-400' : 'text-red-400'}`}
          >
            {currentStep.canReach ? 'Can reach end!' : 'Cannot reach end'}
          </p>
        )}
      </div>

      <div className="mb-6 flex items-end justify-center gap-2">
        {NUMS.map((value, idx) => {
          const isCurrent = currentStep.i === idx;
          const isReachable = idx <= currentStep.maxReach;
          const _jumpRange = idx + value;

          return (
            <motion.div key={idx} className="flex flex-col items-center">
              <motion.div
                className="w-16 rounded-t-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  height: `${value * 20 + 40}px`,
                  backgroundColor: isCurrent
                    ? `${COLORS.current}40`
                    : isReachable
                      ? `${COLORS.reachable}40`
                      : `${COLORS.unreachable}40`,
                  borderColor: isCurrent
                    ? COLORS.current
                    : isReachable
                      ? COLORS.reachable
                      : COLORS.unreachable,
                }}
                animate={{ scale: isCurrent ? 1.1 : 1 }}
              >
                {value}
              </motion.div>
              <div className="text-xs text-zinc-500 mt-1">{idx}</div>
              {isCurrent && (
                <div className="text-xs text-yellow-400 mt-1">maxReach: {currentStep.maxReach}</div>
              )}
            </motion.div>
          );
        })}
      </div>

      <VizControls controls={controls} accentColor={COLORS.reachable} />
    </div>
  );
}
