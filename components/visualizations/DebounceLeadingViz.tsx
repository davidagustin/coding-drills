'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const CALLS = [1, 2, 3, 4, 5];
const DELAY = 2;

interface DebounceLeadingStep {
  callNumber: number;
  timerActive: boolean;
  executed: boolean;
  explanation: string;
}

function computeSteps(): DebounceLeadingStep[] {
  const steps: DebounceLeadingStep[] = [];
  let timerActive = false;

  steps.push({
    callNumber: 0,
    timerActive: false,
    executed: false,
    explanation: `Start: Debounce with leading edge (delay = ${DELAY} steps)`,
  });

  for (let i = 0; i < CALLS.length; i++) {
    if (!timerActive) {
      timerActive = true;
      steps.push({
        callNumber: i + 1,
        timerActive: true,
        executed: true,
        explanation: `Call ${i + 1}: Leading edge → execute immediately, start timer`,
      });
    } else {
      steps.push({
        callNumber: i + 1,
        timerActive: true,
        executed: false,
        explanation: `Call ${i + 1}: Timer active → ignore, reset timer`,
      });
    }

    if (i === DELAY - 1) {
      timerActive = false;
      steps.push({
        callNumber: i + 1,
        timerActive: false,
        executed: false,
        explanation: `Timer expired → ready for next leading edge`,
      });
    }
  }

  steps.push({
    callNumber: 0,
    timerActive: false,
    executed: false,
    explanation: `Complete: Leading edge debounce pattern shown`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function DebounceLeadingViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { callNumber, timerActive, executed, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Debounce with Leading Edge</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Call Status */}
        {callNumber > 0 && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Call {callNumber}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-800 rounded-lg">
                <div className="text-xs text-zinc-400 mb-1">Timer Active</div>
                <div
                  className={`text-2xl font-bold ${timerActive ? 'text-yellow-400' : 'text-green-400'}`}
                >
                  {timerActive ? 'Yes' : 'No'}
                </div>
              </div>
              <div className="p-4 bg-zinc-800 rounded-lg">
                <div className="text-xs text-zinc-400 mb-1">Executed</div>
                <div
                  className={`text-2xl font-bold ${executed ? 'text-green-400' : 'text-red-400'}`}
                >
                  {executed ? 'Yes' : 'No'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
