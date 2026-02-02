'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WindowStep {
  left: number;
  right: number;
  sum: number;
  target: number;
  minLength: number;
  action: 'expand' | 'shrink' | 'found';
  description: string;
}

// ---------------------------------------------------------------------------
// Pre-computed data
// ---------------------------------------------------------------------------

const ARRAY = [2, 3, 1, 2, 4, 3];
const TARGET = 7;

/** Pre-compute every step of the sliding window min subarray algorithm. */
function buildSteps(nums: number[], target: number): WindowStep[] {
  const steps: WindowStep[] = [];
  let left = 0;
  let minLength = Infinity;
  let sum = 0;

  steps.push({
    left: 0,
    right: -1,
    sum: 0,
    target,
    minLength: Infinity,
    action: 'expand',
    description: 'Start: initialize window',
  });

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    steps.push({
      left,
      right,
      sum,
      target,
      minLength,
      action: 'expand',
      description: `Expand: add nums[${right}]=${nums[right]}, sum=${sum}`,
    });

    while (sum >= target) {
      const currentLength = right - left + 1;
      minLength = Math.min(minLength, currentLength);
      steps.push({
        left,
        right,
        sum,
        target,
        minLength,
        action: 'found',
        description: `Found valid window: length=${currentLength}, minLength=${minLength}`,
      });

      sum -= nums[left];
      steps.push({
        left,
        right,
        sum,
        target,
        minLength,
        action: 'shrink',
        description: `Shrink: remove nums[${left}]=${nums[left]}, sum=${sum}`,
      });
      left++;
    }
  }

  return steps;
}

const STEPS = buildSteps(ARRAY, TARGET);
const TOTAL_STEPS = STEPS.length;

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const COLORS = {
  window: '#3b82f6', // blue
  valid: '#22c55e', // green
  left: '#f97316', // orange
  right: '#ec4899', // pink
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
  pointerLabel,
  isInWindow,
}: {
  value: number;
  index: number;
  status: 'idle' | 'window' | 'valid' | 'left' | 'right';
  pointerLabel: 'L' | 'R' | null;
  isInWindow: boolean;
}) {
  const bgColor =
    status === 'valid'
      ? COLORS.valid
      : status === 'window' || isInWindow
        ? COLORS.window
        : status === 'left'
          ? COLORS.left
          : status === 'right'
            ? COLORS.right
            : COLORS.idle;

  const borderColor = status !== 'idle' ? bgColor : COLORS.border;
  const boxShadow = status !== 'idle' ? `0 0 12px ${bgColor}80, 0 0 24px ${bgColor}40` : 'none';

  return (
    <div className="flex flex-col items-center gap-1" style={{ minWidth: 64 }}>
      <div
        className="flex items-center justify-center rounded-lg transition-all duration-300"
        style={{
          width: 64,
          height: 64,
          background: bgColor,
          border: `2px solid ${borderColor}`,
          boxShadow,
        }}
      >
        <span className="text-xl font-bold text-white select-none">{value}</span>
      </div>
      <span className="text-xs text-zinc-500 font-mono">{index}</span>
      {pointerLabel && (
        <div className="h-5 flex items-center justify-center">
          <span
            className="text-xs font-bold tracking-wider"
            style={{
              color: pointerLabel === 'L' ? COLORS.left : COLORS.right,
            }}
          >
            {pointerLabel}
          </span>
        </div>
      )}
    </div>
  );
}

export default function SlidingWindowMinSubarrayViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep: WindowStep | null = step > 0 ? STEPS[step - 1] : null;
  const isComplete = step >= TOTAL_STEPS;

  const cellData = useMemo(() => {
    if (!currentStep) {
      return ARRAY.map((value, index) => ({
        value,
        index,
        status: 'idle' as const,
        pointerLabel: null as const,
        isInWindow: false,
      }));
    }

    return ARRAY.map((value, index) => {
      let status: 'idle' | 'window' | 'valid' | 'left' | 'right' = 'idle';
      let pointerLabel: 'L' | 'R' | null = null;
      const isInWindow = index >= currentStep.left && index <= currentStep.right;

      if (index === currentStep.left) {
        status = 'left';
        pointerLabel = 'L';
      } else if (index === currentStep.right) {
        status = 'right';
        pointerLabel = 'R';
      } else if (isInWindow) {
        status = currentStep.action === 'found' ? 'valid' : 'window';
      }

      return { value, index, status, pointerLabel, isInWindow };
    });
  }, [currentStep]);

  const description = currentStep?.description || 'Press Play or Step to find minimum subarray';

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
            background: `linear-gradient(135deg, ${COLORS.left}, ${COLORS.right})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Minimum Length Subarray
        </h3>
        <p className="text-sm text-zinc-400">Find shortest subarray with sum &ge; {TARGET}</p>
      </div>

      <div className="text-center">
        <span className="text-xs text-zinc-500 font-mono">
          Array: [{ARRAY.join(', ')}] | Target: {TARGET}
        </span>
      </div>

      <div className="flex justify-center gap-2 flex-wrap">
        {cellData.map((cell) => (
          <ArrayCell
            key={cell.index}
            value={cell.value}
            index={cell.index}
            status={cell.status}
            pointerLabel={cell.pointerLabel}
            isInWindow={cell.isInWindow}
          />
        ))}
      </div>

      <div className="flex justify-center gap-6 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.left }} />
          <span className="text-zinc-400">Left (L)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.right }} />
          <span className="text-zinc-400">Right (R)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.window }} />
          <span className="text-zinc-400">Window</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.valid }} />
          <span className="text-zinc-400">Valid (&ge; target)</span>
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
              <span className="text-zinc-500 shrink-0">Window Sum:</span>
              <span className="text-zinc-300">{currentStep.sum}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-zinc-500 shrink-0">Window Length:</span>
              <span className="text-zinc-300">
                {currentStep.right >= currentStep.left
                  ? currentStep.right - currentStep.left + 1
                  : 0}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-zinc-500 shrink-0">Min Length:</span>
              <span className="text-zinc-300 font-bold" style={{ color: COLORS.valid }}>
                {currentStep.minLength === Infinity ? '∞' : currentStep.minLength}
              </span>
            </div>
          </>
        )}

        <div className="flex items-center gap-2">
          <span className="text-zinc-500 shrink-0">Step:</span>
          <span className="text-zinc-300">
            {Math.min(step, TOTAL_STEPS)} / {TOTAL_STEPS}
          </span>
        </div>
      </div>

      {isComplete && currentStep && currentStep.minLength !== Infinity && (
        <div
          className="text-center py-3 px-4 rounded-xl font-bold text-white text-sm"
          style={{
            background: `linear-gradient(135deg, ${COLORS.valid}, #16a34a)`,
            animation: 'fadeInUp 0.4s ease-out',
          }}
        >
          Minimum subarray length: {currentStep.minLength}
        </div>
      )}

      <VizControls controls={controls} accentColor={COLORS.left} />
    </div>
  );
}
