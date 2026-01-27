'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const MAX_RETRIES = 2;
const DELAY = 2;

interface RetryAsyncStep {
  attempt: number;
  success: boolean;
  error: boolean;
  waiting: boolean;
  explanation: string;
}

function computeSteps(): RetryAsyncStep[] {
  const steps: RetryAsyncStep[] = [];
  let attempt = 0;

  steps.push({
    attempt: 0,
    success: false,
    error: false,
    waiting: false,
    explanation: `Start: Retry async function (max retries: ${MAX_RETRIES}, delay: ${DELAY} steps)`,
  });

  // Simulate 3 attempts: first two fail, third succeeds
  for (let i = 0; i <= MAX_RETRIES; i++) {
    attempt = i + 1;
    steps.push({
      attempt,
      success: false,
      error: true,
      waiting: false,
      explanation: `Attempt ${attempt}: Failed, ${i < MAX_RETRIES ? 'retrying...' : 'all retries exhausted'}`,
    });

    if (i < MAX_RETRIES) {
      // Show waiting steps
      for (let wait = 1; wait <= DELAY; wait++) {
        steps.push({
          attempt,
          success: false,
          error: false,
          waiting: true,
          explanation: `Waiting ${wait}/${DELAY} steps before retry...`,
        });
      }
    } else {
      // Last attempt - simulate success
      steps.push({
        attempt,
        success: true,
        error: false,
        waiting: false,
        explanation: `Attempt ${attempt}: Success!`,
      });
      break;
    }
  }

  steps.push({
    attempt: 0,
    success: false,
    error: false,
    waiting: false,
    explanation: `Complete: Retry pattern shown`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function RetryAsyncViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { attempt, success, error, waiting, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Retry Async Function</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {attempt > 0 && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Attempt {attempt}</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-zinc-800 rounded-lg">
                <div className="text-xs text-zinc-400 mb-1">Status</div>
                <div
                  className={`text-xl font-bold ${
                    success
                      ? 'text-green-400'
                      : error
                        ? 'text-red-400'
                        : waiting
                          ? 'text-yellow-400'
                          : 'text-zinc-400'
                  }`}
                >
                  {success ? 'Success' : error ? 'Failed' : waiting ? 'Waiting' : 'Pending'}
                </div>
              </div>
              <div className="p-4 bg-zinc-800 rounded-lg">
                <div className="text-xs text-zinc-400 mb-1">Retries Remaining</div>
                <div className="text-xl font-bold text-zinc-300">
                  {Math.max(0, MAX_RETRIES - attempt + 1)}
                </div>
              </div>
              <div className="p-4 bg-zinc-800 rounded-lg">
                <div className="text-xs text-zinc-400 mb-1">Total Attempts</div>
                <div className="text-xl font-bold text-zinc-300">{attempt}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
