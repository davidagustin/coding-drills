'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [2, 3, 1, 2, 4, 3];
const TARGET = 7;

interface SlidingWindowMinSubarrayStep {
  arr: number[];
  sum: number;
  left: number;
  right: number;
  minLen: number;
  explanation: string;
}

function computeSteps(): SlidingWindowMinSubarrayStep[] {
  const steps: SlidingWindowMinSubarrayStep[] = [];
  let sum = 0;
  let left = 0;
  let minLen = Infinity;

  steps.push({
    arr: [...ARRAY],
    sum: 0,
    left: 0,
    right: -1,
    minLen: Infinity,
    explanation: `Start: Find minimum length subarray with sum >= ${TARGET}`,
  });

  for (let right = 0; right < ARRAY.length; right++) {
    sum += ARRAY[right];
    steps.push({
      arr: [...ARRAY],
      sum,
      left,
      right,
      minLen: minLen === Infinity ? Infinity : minLen,
      explanation: `Expand right to ${right}: sum = ${sum}`,
    });

    while (sum >= TARGET) {
      minLen = Math.min(minLen, right - left + 1);
      steps.push({
        arr: [...ARRAY],
        sum,
        left,
        right,
        minLen,
        explanation: `Shrink left from ${left}: sum = ${sum} >= ${TARGET}, minLen = ${minLen}`,
      });
      sum -= ARRAY[left];
      left++;
    }
  }

  steps.push({
    arr: [...ARRAY],
    sum,
    left,
    right: ARRAY.length - 1,
    minLen: minLen === Infinity ? 0 : minLen,
    explanation: `Complete: Minimum length = ${minLen === Infinity ? 0 : minLen}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function SlidingWindowMinSubarrayViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { arr, sum, left, right, minLen, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">
        Minimum Length Subarray with Sum &gt;= Target
      </h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Array</h3>
          <div className="flex gap-2 flex-wrap">
            {arr.map((val, idx) => {
              const isInWindow = idx >= left && idx <= right;
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                    isInWindow
                      ? sum >= TARGET
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  {val}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-400 mb-1">Sum</div>
            <div className="text-2xl font-bold text-blue-400">{sum}</div>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-400 mb-1">Target</div>
            <div className="text-2xl font-bold text-yellow-400">{TARGET}</div>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-400 mb-1">Min Length</div>
            <div className="text-2xl font-bold text-green-400">
              {minLen === Infinity ? '∞' : minLen}
            </div>
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
