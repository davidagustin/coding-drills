'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ThreeSumStep {
  fixedIndex: number;
  left: number;
  right: number;
  sum: number;
  triplet: [number, number, number] | null;
  action: 'init' | 'sum-zero' | 'sum-negative' | 'sum-positive' | 'skip-duplicate';
  description: string;
}

type CellStatus = 'idle' | 'fixed' | 'left' | 'right' | 'matched' | 'eliminated';

// ---------------------------------------------------------------------------
// Pre-computed data
// ---------------------------------------------------------------------------

const INPUT = [-1, 0, 1, 2, -1, -4];
const SORTED = [...INPUT].sort((a, b) => a - b);

/** Pre-compute every step of the three-sum algorithm. */
function buildSteps(nums: number[]): ThreeSumStep[] {
  const steps: ThreeSumStep[] = [];
  const sorted = [...nums].sort((a, b) => a - b);

  for (let i = 0; i < sorted.length - 2; i++) {
    // Skip duplicates for fixed index
    if (i > 0 && sorted[i] === sorted[i - 1]) {
      steps.push({
        fixedIndex: i,
        left: i + 1,
        right: sorted.length - 1,
        sum: 0,
        triplet: null,
        action: 'skip-duplicate',
        description: `Skip duplicate at index ${i}: ${sorted[i]}`,
      });
      continue;
    }

    let left = i + 1;
    let right = sorted.length - 1;

    steps.push({
      fixedIndex: i,
      left,
      right,
      sum: sorted[i] + sorted[left] + sorted[right],
      triplet: null,
      action: 'init',
      description: `Fixed index ${i} = ${sorted[i]}, searching with two pointers`,
    });

    while (left < right) {
      const sum = sorted[i] + sorted[left] + sorted[right];

      if (sum === 0) {
        steps.push({
          fixedIndex: i,
          left,
          right,
          sum: 0,
          triplet: [sorted[i], sorted[left], sorted[right]],
          action: 'sum-zero',
          description: `Found triplet: [${sorted[i]}, ${sorted[left]}, ${sorted[right]}]`,
        });

        // Skip duplicates
        while (left < right && sorted[left] === sorted[left + 1]) {
          left++;
          steps.push({
            fixedIndex: i,
            left,
            right,
            sum: sorted[i] + sorted[left] + sorted[right],
            triplet: null,
            action: 'skip-duplicate',
            description: `Skip duplicate left: ${sorted[left]}`,
          });
        }
        while (left < right && sorted[right] === sorted[right - 1]) {
          right--;
          steps.push({
            fixedIndex: i,
            left,
            right,
            sum: sorted[i] + sorted[left] + sorted[right],
            triplet: null,
            action: 'skip-duplicate',
            description: `Skip duplicate right: ${sorted[right]}`,
          });
        }

        left++;
        right--;
      } else if (sum < 0) {
        steps.push({
          fixedIndex: i,
          left,
          right,
          sum,
          triplet: null,
          action: 'sum-negative',
          description: `Sum ${sum} < 0, move left pointer to increase sum`,
        });
        left++;
      } else {
        steps.push({
          fixedIndex: i,
          left,
          right,
          sum,
          triplet: null,
          action: 'sum-positive',
          description: `Sum ${sum} > 0, move right pointer to decrease sum`,
        });
        right--;
      }
    }
  }

  return steps;
}

const STEPS = buildSteps(INPUT);
const TOTAL_STEPS = STEPS.length;

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const COLORS = {
  fixed: '#8b5cf6', // purple
  left: '#3b82f6', // blue
  right: '#f97316', // orange
  matched: '#22c55e', // green
  eliminated: '#52525b', // zinc-600
} as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getCellStatus(
  index: number,
  currentStep: number,
  steps: ThreeSumStep[],
): CellStatus {
  if (currentStep === 0) return 'idle';

  const step = steps[currentStep - 1];
  if (!step) return 'idle';

  // Check if this index was part of a matched triplet in previous steps
  for (let s = 0; s < currentStep - 1; s++) {
    const prevStep = steps[s];
    if (prevStep.triplet) {
      const fixedIdx = prevStep.fixedIndex;
      const leftIdx = prevStep.left;
      const rightIdx = prevStep.right;
      if (index === fixedIdx || index === leftIdx || index === rightIdx) {
        return 'matched';
      }
    }
  }

  // Current step state
  if (step.triplet) {
    if (index === step.fixedIndex || index === step.left || index === step.right) {
      return 'matched';
    }
  }

  if (index === step.fixedIndex) return 'fixed';
  if (index === step.left) return 'left';
  if (index === step.right) return 'right';

  // Eliminated: indices before fixed or after right that are no longer considered
  if (index < step.fixedIndex) return 'eliminated';
  if (index > step.right && step.right < SORTED.length - 1) return 'eliminated';

  return 'idle';
}

function getFoundTriplets(currentStep: number, steps: ThreeSumStep[]): Array<[number, number, number]> {
  const triplets: Array<[number, number, number]> = [];
  for (let s = 0; s < currentStep; s++) {
    if (steps[s].triplet) {
      triplets.push(steps[s].triplet);
    }
  }
  return triplets;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ThreeSumZeroViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep: ThreeSumStep | null = step > 0 ? STEPS[step - 1] : null;
  const foundTriplets = useMemo(() => getFoundTriplets(step, STEPS), [step]);

  const cellData = useMemo(
    () =>
      SORTED.map((value, i) => ({
        value,
        index: i,
        status: getCellStatus(i, step, STEPS),
      })),
    [step],
  );

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      <style>{`
        @keyframes threeSumPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes threeSumGlow {
          from { box-shadow: 0 0 8px ${COLORS.matched}66, 0 0 16px ${COLORS.matched}33; }
          to { box-shadow: 0 0 16px ${COLORS.matched}aa, 0 0 32px ${COLORS.matched}55; }
        }
      `}</style>

      {/* Title */}
      <div className="text-center space-y-1">
        <h3
          className="text-lg font-bold"
          style={{
            background: `linear-gradient(135deg, ${COLORS.fixed}, ${COLORS.left})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Three Sum Zero
        </h3>
        <p className="text-sm text-zinc-400">Find all unique triplets that sum to zero</p>
      </div>

      {/* Input label */}
      <div className="text-center">
        <span className="text-xs text-zinc-500 font-mono">
          Input: [{INPUT.join(', ')}] → Sorted: [{SORTED.join(', ')}]
        </span>
      </div>

      {/* Array visualization */}
      <div className="flex justify-center gap-2 flex-wrap">
        {cellData.map((cell) => {
          const isActive =
            cell.status === 'fixed' ||
            cell.status === 'left' ||
            cell.status === 'right' ||
            cell.status === 'matched';

          let borderColor = '#52525b'; // zinc-600
          let bgColor = '#27272a'; // zinc-800
          let textColor = '#a1a1aa'; // zinc-400

          if (cell.status === 'matched') {
            borderColor = COLORS.matched;
            bgColor = `${COLORS.matched}22`;
            textColor = COLORS.matched;
          } else if (cell.status === 'fixed') {
            borderColor = COLORS.fixed;
            bgColor = `${COLORS.fixed}22`;
            textColor = COLORS.fixed;
          } else if (cell.status === 'left') {
            borderColor = COLORS.left;
            bgColor = `${COLORS.left}22`;
            textColor = COLORS.left;
          } else if (cell.status === 'right') {
            borderColor = COLORS.right;
            bgColor = `${COLORS.right}22`;
            textColor = COLORS.right;
          } else if (cell.status === 'eliminated') {
            borderColor = COLORS.eliminated;
            bgColor = '#1f1f23';
            textColor = '#52525b';
          }

          const boxShadow = isActive
            ? `0 0 12px ${borderColor}80, 0 0 24px ${borderColor}40`
            : 'none';

          return (
            <div key={cell.index} className="flex flex-col items-center gap-1" style={{ minWidth: 56 }}>
              {/* Cell */}
              <div
                className="flex items-center justify-center rounded-lg transition-all duration-300 font-mono text-sm font-bold"
                style={{
                  width: 56,
                  height: 56,
                  background: bgColor,
                  border: `2px solid ${borderColor}`,
                  boxShadow,
                  color: textColor,
                  opacity: cell.status === 'eliminated' ? 0.4 : 1,
                  animation:
                    cell.status === 'matched' && currentStep?.triplet
                      ? 'threeSumGlow 0.8s ease-in-out infinite alternate'
                      : isActive
                        ? 'threeSumPulse 1.2s ease-in-out infinite'
                        : undefined,
                }}
              >
                {cell.value}
              </div>

              {/* Index label */}
              <span className="text-xs text-zinc-500 font-mono">{cell.index}</span>

              {/* Pointer labels */}
              <div className="h-5 flex items-center justify-center">
                {cell.status === 'fixed' && (
                  <span
                    className="text-xs font-bold tracking-wider"
                    style={{ color: COLORS.fixed }}
                  >
                    FIXED
                  </span>
                )}
                {cell.status === 'left' && (
                  <span
                    className="text-xs font-bold tracking-wider"
                    style={{ color: COLORS.left }}
                  >
                    L
                  </span>
                )}
                {cell.status === 'right' && (
                  <span
                    className="text-xs font-bold tracking-wider"
                    style={{ color: COLORS.right }}
                  >
                    R
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 flex-wrap text-xs">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.fixed }}
          />
          <span className="text-zinc-400">Fixed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.left }}
          />
          <span className="text-zinc-400">Left</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.right }}
          />
          <span className="text-zinc-400">Right</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.matched }}
          />
          <span className="text-zinc-400">Matched</span>
        </div>
      </div>

      {/* Found triplets */}
      {foundTriplets.length > 0 && (
        <div className="rounded-xl bg-zinc-800 border border-zinc-700 p-4">
          <div className="text-xs text-zinc-500 mb-2 font-semibold">Found Triplets:</div>
          <div className="flex flex-wrap gap-2">
            {foundTriplets.map((triplet, idx) => (
              <div
                key={idx}
                className="px-3 py-1 rounded-lg font-mono text-sm"
                style={{
                  background: `${COLORS.matched}22`,
                  border: `1px solid ${COLORS.matched}`,
                  color: COLORS.matched,
                }}
              >
                [{triplet.join(', ')}]
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status panel */}
      <div className="rounded-xl bg-zinc-800 border border-zinc-700 p-4 space-y-3 text-sm font-mono">
        {currentStep ? (
          <>
            <div className="flex items-start gap-2">
              <span className="text-zinc-500 shrink-0">Action:</span>
              <span className="text-zinc-200">{currentStep.description}</span>
            </div>
            {currentStep.action !== 'skip-duplicate' && (
              <div className="flex items-start gap-2">
                <span className="text-zinc-500 shrink-0">Sum:</span>
                <span
                  className="font-semibold"
                  style={{
                    color:
                      currentStep.sum === 0
                        ? COLORS.matched
                        : currentStep.sum < 0
                          ? COLORS.left
                          : COLORS.right,
                  }}
                >
                  {currentStep.sum === 0
                    ? `${currentStep.sum} ✓`
                    : `${currentStep.sum} ${currentStep.sum < 0 ? '(too small)' : '(too large)'}`}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 shrink-0">Step:</span>
              <span className="text-zinc-300">
                {step} / {TOTAL_STEPS}
              </span>
            </div>
          </>
        ) : (
          <p className="text-zinc-500 text-sm italic">
            Press <span className="font-semibold text-zinc-400">Play</span> or{' '}
            <span className="font-semibold text-zinc-400">Step</span> to begin
          </p>
        )}
      </div>

      {/* Controls */}
      <VizControls controls={controls} accentColor={COLORS.fixed} />
    </div>
  );
}
