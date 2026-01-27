'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const CALLS = [0, 100, 200, 300, 400, 500, 600];
const LIMIT = 300;

interface ThrottleStep {
  callTime: number;
  inThrottle: boolean;
  executed: boolean;
  explanation: string;
}

function computeSteps(): ThrottleStep[] {
  const steps: ThrottleStep[] = [];
  let inThrottle = false;
  let lastExecute = -LIMIT;

  for (const callTime of CALLS) {
    if (callTime - lastExecute >= LIMIT) {
      inThrottle = false;
    }

    if (!inThrottle) {
      lastExecute = callTime;
      inThrottle = true;
      steps.push({
        callTime,
        inThrottle: true,
        executed: true,
        explanation: `Call at ${callTime}ms: Execute immediately, set throttle`,
      });
    } else {
      steps.push({
        callTime,
        inThrottle: true,
        executed: false,
        explanation: `Call at ${callTime}ms: In throttle, ignore`,
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
  throttled: '#ef4444',
} as const;

export default function ThrottleViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Throttle (Limit: {LIMIT}ms)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
      </div>

      <div className="mb-6 relative h-32 bg-zinc-950 rounded-lg border border-zinc-800 p-4">
        {CALLS.map((callTime, idx) => {
          const isCurrent = currentStep.callTime === callTime;
          const x = (callTime / 600) * 100;
          const executed = STEPS.find((s) => s.callTime === callTime)?.executed || false;

          return (
            <motion.div
              key={idx}
              className="absolute bottom-0 rounded-t"
              style={{
                left: `${x}%`,
                width: '2px',
                height: executed ? '48px' : '24px',
                backgroundColor: executed ? COLORS.execute : COLORS.throttled,
              }}
              animate={{ scale: isCurrent ? 1.5 : 1 }}
            />
          );
        })}
      </div>

      <VizControls controls={controls} accentColor={COLORS.execute} />
    </div>
  );
}
