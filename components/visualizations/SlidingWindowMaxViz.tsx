'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SlidingWindowMaxStep {
  index: number;
  deque: number[];
  windowStart: number;
  windowEnd: number;
  result: number[];
  action: 'add' | 'remove-out-of-window' | 'remove-smaller' | 'record-max';
  description: string;
}

// ---------------------------------------------------------------------------
// Pre-computed data
// ---------------------------------------------------------------------------

const ARRAY = [1, 3, -1, -3, 5, 3, 6, 7];
const K = 3;

/** Pre-compute every step of the sliding window maximum algorithm. */
function buildSteps(nums: number[], k: number): SlidingWindowMaxStep[] {
  const steps: SlidingWindowMaxStep[] = [];
  const result: number[] = [];
  const deque: number[] = [];

  steps.push({
    index: -1,
    deque: [],
    windowStart: 0,
    windowEnd: -1,
    result: [],
    action: 'add',
    description: 'Start: initialize deque',
  });

  for (let i = 0; i < nums.length; i++) {
    // Remove indices that are out of the current window
    while (deque.length > 0 && deque[0] < i - k + 1) {
      const removed = deque.shift()!;
      steps.push({
        index: i,
        deque: [...deque],
        windowStart: Math.max(0, i - k + 1),
        windowEnd: i,
        result: [...result],
        action: 'remove-out-of-window',
        description: `Remove index ${removed} (out of window [${Math.max(0, i - k + 1)}..${i}])`,
      });
    }

    // Remove indices from back whose values are <= current value
    while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
      const removed = deque.pop()!;
      steps.push({
        index: i,
        deque: [...deque],
        windowStart: Math.max(0, i - k + 1),
        windowEnd: i,
        result: [...result],
        action: 'remove-smaller',
        description: `Remove index ${removed} (value ${nums[removed]} <= ${nums[i]})`,
      });
    }

    // Add current index
    deque.push(i);
    steps.push({
      index: i,
      deque: [...deque],
      windowStart: Math.max(0, i - k + 1),
      windowEnd: i,
      result: [...result],
      action: 'add',
      description: `Add index ${i} (value ${nums[i]})`,
    });

    // Record result if window is complete
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
      steps.push({
        index: i,
        deque: [...deque],
        windowStart: i - k + 1,
        windowEnd: i,
        result: [...result],
        action: 'record-max',
        description: `Window [${i - k + 1}..${i}]: max = ${nums[deque[0]]} at index ${deque[0]}`,
      });
    }
  }

  return steps;
}

const STEPS = buildSteps(ARRAY, K);
const TOTAL_STEPS = STEPS.length;

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const COLORS = {
  window: '#3b82f6', // blue
  max: '#22c55e', // green
  deque: '#8b5cf6', // purple
  current: '#f97316', // orange
  idle: '#3f3f46', // zinc-700
  border: '#52525b', // zinc-600
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function ArrayCell({
  value,
  index,
  status,
  isInWindow,
  isMax,
  isInDeque,
}: {
  value: number;
  index: number;
  status: 'idle' | 'window' | 'current' | 'max' | 'deque';
  isInWindow: boolean;
  isMax: boolean;
  isInDeque: boolean;
}) {
  const bgColor =
    status === 'max' || isMax
      ? COLORS.max
      : status === 'current'
        ? COLORS.current
        : status === 'deque' || isInDeque
          ? COLORS.deque
          : status === 'window' || isInWindow
            ? COLORS.window
            : COLORS.idle;

  const borderColor = status !== 'idle' ? bgColor : COLORS.border;
  const boxShadow = status !== 'idle' ? `0 0 12px ${bgColor}80, 0 0 24px ${bgColor}40` : 'none';

  return (
    <div className="flex flex-col items-center gap-1" style={{ minWidth: 64 }}>
      <div
        className="flex items-center justify-center rounded-lg transition-all duration-300 relative"
        style={{
          width: 64,
          height: 64,
          background: bgColor,
          border: `2px solid ${borderColor}`,
          boxShadow,
        }}
      >
        <span className="text-xl font-bold text-white select-none">{value}</span>
        {isMax && (
          <span className="absolute -top-1 -right-1 text-xs bg-green-500 text-white px-1 rounded font-bold">
            MAX
          </span>
        )}
        {isInDeque && (
          <span className="absolute -top-1 -left-1 text-xs bg-purple-500 text-white px-1 rounded font-bold">
            D
          </span>
        )}
      </div>
      <span className="text-xs text-zinc-500 font-mono">{index}</span>
    </div>
  );
}

export default function SlidingWindowMaxViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep: SlidingWindowMaxStep | null = step > 0 ? STEPS[step - 1] : null;
  const isComplete = step >= TOTAL_STEPS;

  const cellData = useMemo(() => {
    if (!currentStep) {
      return ARRAY.map((value, index) => ({
        value,
        index,
        status: 'idle' as const,
        isInWindow: false,
        isMax: false,
        isInDeque: false,
      }));
    }

    return ARRAY.map((value, index) => {
      const isInWindow = index >= currentStep.windowStart && index <= currentStep.windowEnd;
      const isCurrent = index === currentStep.index;
      const isInDeque = currentStep.deque.includes(index);
      const isMax = currentStep.deque.length > 0 && index === currentStep.deque[0];

      let status: 'idle' | 'window' | 'current' | 'max' | 'deque' = 'idle';
      if (isMax) {
        status = 'max';
      } else if (isCurrent) {
        status = 'current';
      } else if (isInDeque) {
        status = 'deque';
      } else if (isInWindow) {
        status = 'window';
      }

      return { value, index, status, isInWindow, isMax, isInDeque };
    });
  }, [currentStep]);

  const description = currentStep?.description || 'Press Play or Step to find sliding window maximums';

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="text-center space-y-1">
        <h3
          className="text-lg font-bold"
          style={{
            background: `linear-gradient(135deg, ${COLORS.window}, ${COLORS.max})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Sliding Window Maximum
        </h3>
        <p className="text-sm text-zinc-400">Find maximum in each window of size {K}</p>
      </div>

      <div className="text-center">
        <span className="text-xs text-zinc-500 font-mono">
          Array: [{ARRAY.join(', ')}] | Window Size: {K}
        </span>
      </div>

      <div className="flex justify-center gap-2 flex-wrap">
        {cellData.map((cell) => (
          <ArrayCell
            key={cell.index}
            value={cell.value}
            index={cell.index}
            status={cell.status}
            isInWindow={cell.isInWindow}
            isMax={cell.isMax}
            isInDeque={cell.isInDeque}
          />
        ))}
      </div>

      {currentStep && currentStep.deque.length > 0 && (
        <div className="text-center">
          <span className="text-xs text-zinc-500 font-mono">
            Deque (indices): [{currentStep.deque.join(', ')}] → Values: [
            {currentStep.deque.map((idx) => ARRAY[idx]).join(', ')}]
          </span>
        </div>
      )}

      <div className="flex justify-center gap-6 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.window }} />
          <span className="text-zinc-400">Window</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.deque }} />
          <span className="text-zinc-400">Deque (D)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.max }} />
          <span className="text-zinc-400">Max</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.current }} />
          <span className="text-zinc-400">Current</span>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-800 border border-zinc-700 p-4 space-y-3 text-sm font-mono">
        <div className="flex items-start gap-2">
          <span className="text-zinc-500 shrink-0">Status:</span>
          <span className="text-zinc-200">{description}</span>
        </div>

        {currentStep && (
          <>
            <div className="flex items-start gap-2">
              <span className="text-zinc-500 shrink-0">Window:</span>
              <span className="text-zinc-300">
                [{currentStep.windowStart}..{currentStep.windowEnd}]
              </span>
            </div>
            {currentStep.deque.length > 0 && (
              <div className="flex items-start gap-2">
                <span className="text-zinc-500 shrink-0">Max Index:</span>
                <span className="text-zinc-300 font-bold" style={{ color: COLORS.max }}>
                  {currentStep.deque[0]} (value: {ARRAY[currentStep.deque[0]]})
                </span>
              </div>
            )}
            {currentStep.result.length > 0 && (
              <div className="flex items-start gap-2">
                <span className="text-zinc-500 shrink-0">Result:</span>
                <span className="text-zinc-300">[{currentStep.result.join(', ')}]</span>
              </div>
            )}
          </>
        )}

        <div className="flex items-center gap-2">
          <span className="text-zinc-500 shrink-0">Step:</span>
          <span className="text-zinc-300">
            {Math.min(step, TOTAL_STEPS)} / {TOTAL_STEPS}
          </span>
        </div>
      </div>

      {isComplete && currentStep && (
        <div
          className="text-center py-3 px-4 rounded-xl font-bold text-white text-sm"
          style={{
            background: `linear-gradient(135deg, ${COLORS.max}, #16a34a)`,
            animation: 'fadeInUp 0.4s ease-out',
          }}
        >
          Result: [{currentStep.result.join(', ')}]
        </div>
      )}

      <VizControls controls={controls} accentColor={COLORS.window} />
    </div>
  );
}
