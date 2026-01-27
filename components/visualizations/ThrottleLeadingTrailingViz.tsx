'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const CALLS = [1, 2, 3, 4, 5];
const INTERVAL = 2;

interface ThrottleLeadingTrailingStep {
  callNumber: number;
  timerActive: boolean;
  leadingExecuted: boolean;
  trailingPending: boolean;
  explanation: string;
}

function computeSteps(): ThrottleLeadingTrailingStep[] {
  const steps: ThrottleLeadingTrailingStep[] = [];
  let timerActive = false;
  let trailingPending = false;

  steps.push({
    callNumber: 0,
    timerActive: false,
    leadingExecuted: false,
    trailingPending: false,
    explanation: `Start: Throttle with leading and trailing edge (interval = ${INTERVAL} steps)`,
  });

  for (let i = 0; i < CALLS.length; i++) {
    if (!timerActive) {
      trailingPending = false;
      timerActive = true;
      steps.push({
        callNumber: i + 1,
        timerActive: true,
        leadingExecuted: true,
        trailingPending: false,
        explanation: `Call ${i + 1}: Leading edge → execute immediately, start timer`,
      });
    } else {
      trailingPending = true;
      steps.push({
        callNumber: i + 1,
        timerActive: true,
        leadingExecuted: false,
        trailingPending: true,
        explanation: `Call ${i + 1}: Timer active → save args for trailing edge`,
      });
    }

    if (i === INTERVAL - 1) {
      if (trailingPending) {
        steps.push({
          callNumber: i + 1,
          timerActive: false,
          leadingExecuted: false,
          trailingPending: false,
          explanation: `Timer expired → execute trailing edge with saved args`,
        });
      }
      timerActive = false;
      trailingPending = false;
    }
  }

  steps.push({
    callNumber: 0,
    timerActive: false,
    leadingExecuted: false,
    trailingPending: false,
    explanation: `Complete: Leading + trailing throttle pattern shown`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function ThrottleLeadingTrailingViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { callNumber, timerActive, leadingExecuted, trailingPending, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Throttle with Leading and Trailing</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Call Status */}
        {callNumber > 0 && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Call {callNumber}</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-zinc-800 rounded-lg">
                <div className="text-xs text-zinc-400 mb-1">Timer Active</div>
                <div
                  className={`text-xl font-bold ${timerActive ? 'text-yellow-400' : 'text-green-400'}`}
                >
                  {timerActive ? 'Yes' : 'No'}
                </div>
              </div>
              <div className="p-4 bg-zinc-800 rounded-lg">
                <div className="text-xs text-zinc-400 mb-1">Leading Executed</div>
                <div
                  className={`text-xl font-bold ${leadingExecuted ? 'text-green-400' : 'text-red-400'}`}
                >
                  {leadingExecuted ? 'Yes' : 'No'}
                </div>
              </div>
              <div className="p-4 bg-zinc-800 rounded-lg">
                <div className="text-xs text-zinc-400 mb-1">Trailing Pending</div>
                <div
                  className={`text-xl font-bold ${trailingPending ? 'text-blue-400' : 'text-zinc-400'}`}
                >
                  {trailingPending ? 'Yes' : 'No'}
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
