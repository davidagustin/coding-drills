'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const VALUES = [3, 2, 0, -4];

interface DetectCycleStep {
  values: number[];
  slow: number;
  fast: number;
  cycleStart: number | null;
  explanation: string;
}

function computeSteps(): DetectCycleStep[] {
  const steps: DetectCycleStep[] = [];

  steps.push({
    values: [...VALUES],
    slow: 0,
    fast: 0,
    cycleStart: null,
    explanation: "Start: Detect cycle start using Floyd's algorithm",
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
      cycleStart: null,
      explanation: `Slow: ${slow}, Fast: ${fast}`,
    });
  } while (slow !== fast && slow !== -1 && fast !== -1);

  if (slow === fast && slow !== -1) {
    slow = 0;
    steps.push({
      values: [...VALUES],
      slow,
      fast,
      cycleStart: null,
      explanation: 'Cycle detected! Reset slow to start, find cycle entry',
    });

    while (slow !== fast) {
      slow = VALUES[slow];
      fast = VALUES[fast];
      steps.push({
        values: [...VALUES],
        slow,
        fast,
        cycleStart: null,
        explanation: `Move both pointers: slow=${slow}, fast=${fast}`,
      });
    }

    steps.push({
      values: [...VALUES],
      slow,
      fast,
      cycleStart: slow,
      explanation: `Cycle starts at node ${slow}`,
    });
  } else {
    steps.push({
      values: [...VALUES],
      slow: -1,
      fast: -1,
      cycleStart: null,
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
  entry: '#22c55e',
  default: '#3b82f6',
} as const;

export default function DetectCycleViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { values, slow, fast, cycleStart, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Linked List Cycle II (Find Entry)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {cycleStart !== null && step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Cycle Entry: Node {cycleStart}</p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Linked List</h3>
        <div className="flex gap-2 justify-center items-center flex-wrap">
          {values.map((val, idx) => {
            const isSlow = slow === idx;
            const isFast = fast === idx;
            const isEntry = cycleStart === idx;

            let bgColor: string = COLORS.default;
            if (isEntry) {
              bgColor = COLORS.entry;
            } else if (isSlow || isFast) {
              bgColor = COLORS.current;
            }

            return (
              <div key={idx} className="flex items-center gap-2">
                <motion.div
                  className="w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: isSlow || isFast || isEntry ? '#fff' : bgColor,
                  }}
                  animate={{
                    scale: isSlow || isFast || isEntry ? 1.2 : 1,
                  }}
                >
                  <div>{val}</div>
                  {isSlow && <div className="text-xs">S</div>}
                  {isFast && <div className="text-xs">F</div>}
                  {isEntry && <div className="text-xs text-green-400">Entry</div>}
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
