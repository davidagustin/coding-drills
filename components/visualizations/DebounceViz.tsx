'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const CALLS = [0, 100, 200, 300, 500, 600, 700];
const DELAY = 300;

interface DebounceStep {
  callTime: number;
  timer: number | null;
  executed: boolean;
  explanation: string;
}

function computeSteps(): DebounceStep[] {
  const steps: DebounceStep[] = [];
  let timer: number | null = null;

  for (const callTime of CALLS) {
    if (timer !== null) {
      steps.push({
        callTime,
        timer,
        executed: false,
        explanation: `Call at ${callTime}ms: Cancel previous timer, start new timer`,
      });
    } else {
      steps.push({
        callTime,
        timer: null,
        executed: false,
        explanation: `Call at ${callTime}ms: Start timer`,
      });
    }

    timer = callTime + DELAY;

    if (callTime === CALLS[CALLS.length - 1]) {
      steps.push({
        callTime: timer,
        timer: null,
        executed: true,
        explanation: `Timer expires at ${timer}ms: Execute function`,
      });
    }
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  call: '#3b82f6',
  execute: '#22c55e',
  timer: '#eab308',
} as const;

export default function DebounceViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Debounce (Delay: {DELAY}ms)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
      </div>

      <div className="mb-6 relative h-32 bg-zinc-950 rounded-lg border border-zinc-800 p-4">
        {CALLS.map((callTime, idx) => {
          const isCurrent = currentStep.callTime === callTime;
          const x = (callTime / 700) * 100;
          return (
            <motion.div
              key={idx}
              className="absolute bottom-0 w-2 h-8 rounded-t"
              style={{
                left: `${x}%`,
                backgroundColor: COLORS.call,
              }}
              animate={{ scale: isCurrent ? 1.5 : 1 }}
            />
          );
        })}
        {currentStep.executed && (
          <motion.div
            className="absolute bottom-0 w-4 h-12 rounded-t"
            style={{
              left: `${(currentStep.callTime / 700) * 100}%`,
              backgroundColor: COLORS.execute,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
        )}
      </div>

      <VizControls controls={controls} accentColor={COLORS.call} />
    </div>
  );
}
