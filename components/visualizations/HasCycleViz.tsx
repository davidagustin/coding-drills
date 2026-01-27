'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const VALUES = [3, 2, 0, -4];

interface CycleStep {
  values: number[];
  slow: number;
  fast: number;
  hasCycle: boolean;
  explanation: string;
}

function computeSteps(): CycleStep[] {
  const steps: CycleStep[] = [];

  steps.push({
    values: [...VALUES],
    slow: 0,
    fast: 0,
    hasCycle: false,
    explanation: "Start: Detect cycle using Floyd's algorithm",
  });

  let slow = 0;
  let fast = 0;

  do {
    if (slow >= 0 && slow < VALUES.length) {
      slow = VALUES[slow];
    } else {
      break;
    }

    if (fast >= 0 && fast < VALUES.length) {
      fast = VALUES[fast];
      if (fast >= 0 && fast < VALUES.length) {
        fast = VALUES[fast];
      } else {
        break;
      }
    } else {
      break;
    }

    steps.push({
      values: [...VALUES],
      slow,
      fast,
      hasCycle: false,
      explanation: `Slow: ${slow}, Fast: ${fast}`,
    });

    if (slow === fast && slow !== -1) {
      steps.push({
        values: [...VALUES],
        slow,
        fast,
        hasCycle: true,
        explanation: `Cycle detected! Slow and fast pointers meet at ${slow}`,
      });
      break;
    }
  } while (slow !== fast && slow !== -1 && fast !== -1);

  if (slow !== fast || slow === -1) {
    steps.push({
      values: [...VALUES],
      slow: -1,
      fast: -1,
      hasCycle: false,
      explanation: 'No cycle detected',
    });
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  cycle: '#ef4444',
  default: '#3b82f6',
} as const;

export default function HasCycleViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { values, slow, fast, hasCycle, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Linked List Cycle</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className={`font-bold text-lg mt-2 ${hasCycle ? 'text-red-400' : 'text-green-400'}`}>
            {hasCycle ? 'Cycle Found!' : 'No Cycle'}
          </p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Linked List</h3>
        <div className="flex gap-2 justify-center items-center flex-wrap">
          {values.map((val, idx) => {
            const isSlow = slow === idx;
            const isFast = fast === idx;
            const isCycle = hasCycle && idx === slow;

            let bgColor: string = COLORS.default;
            if (isCycle) {
              bgColor = COLORS.cycle;
            } else if (isSlow || isFast) {
              bgColor = COLORS.current;
            }

            return (
              <div key={idx} className="flex items-center gap-2">
                <motion.div
                  className="w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: isSlow || isFast || isCycle ? '#fff' : bgColor,
                  }}
                  animate={{
                    scale: isSlow || isFast || isCycle ? 1.2 : 1,
                  }}
                >
                  <div>{val}</div>
                  {isSlow && <div className="text-xs">S</div>}
                  {isFast && <div className="text-xs">F</div>}
                </motion.div>
                {idx < values.length - 1 && <div className="text-white">→</div>}
              </div>
            );
          })}
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
