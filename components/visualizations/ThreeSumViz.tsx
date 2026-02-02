'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Pre-computed data
// ---------------------------------------------------------------------------

const INPUT = [-1, 0, 1, 2, -1, -4];
const SORTED = [...INPUT].sort((a, b) => a - b);

interface ThreeSumStep {
  fixed: number;
  fixedIdx: number;
  left: number;
  right: number;
  sum: number;
  triplet: number[] | null;
  action: string;
  skipDuplicate: boolean;
}

function computeSteps(): ThreeSumStep[] {
  const steps: ThreeSumStep[] = [];
  const nums = [...SORTED];
  const triplets: number[][] = [];

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicates for fixed element
    if (i > 0 && nums[i] === nums[i - 1]) {
      steps.push({
        fixed: nums[i],
        fixedIdx: i,
        left: i + 1,
        right: nums.length - 1,
        sum: 0,
        triplet: null,
        action: `Skip duplicate fixed element: nums[${i}] = ${nums[i]} (same as nums[${i - 1}])`,
        skipDuplicate: true,
      });
      continue;
    }

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        const triplet = [nums[i], nums[left], nums[right]];
        triplets.push(triplet);
        steps.push({
          fixed: nums[i],
          fixedIdx: i,
          left,
          right,
          sum,
          triplet,
          action: `Found triplet: [${nums[i]}, ${nums[left]}, ${nums[right]}] = 0`,
          skipDuplicate: false,
        });

        // Skip duplicates
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
          steps.push({
            fixed: nums[i],
            fixedIdx: i,
            left,
            right,
            sum: 0,
            triplet: null,
            action: `Skip duplicate left: nums[${left}] = nums[${left - 1}]`,
            skipDuplicate: true,
          });
        }
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
          steps.push({
            fixed: nums[i],
            fixedIdx: i,
            left,
            right,
            sum: 0,
            triplet: null,
            action: `Skip duplicate right: nums[${right}] = nums[${right + 1}]`,
            skipDuplicate: true,
          });
        }

        left++;
        right--;
      } else if (sum < 0) {
        steps.push({
          fixed: nums[i],
          fixedIdx: i,
          left,
          right,
          sum,
          triplet: null,
          action: `Sum (${nums[i]} + ${nums[left]} + ${nums[right]} = ${sum}) < 0 → move left pointer`,
          skipDuplicate: false,
        });
        left++;
      } else {
        steps.push({
          fixed: nums[i],
          fixedIdx: i,
          left,
          right,
          sum,
          triplet: null,
          action: `Sum (${nums[i]} + ${nums[left]} + ${nums[right]} = ${sum}) > 0 → move right pointer`,
          skipDuplicate: false,
        });
        right--;
      }
    }
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const COLORS = {
  fixed: '#8b5cf6', // purple
  left: '#3b82f6', // blue
  right: '#f97316', // orange
  triplet: '#22c55e', // green
  skipped: '#6b7280', // gray
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ThreeSumViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const current: ThreeSumStep | null = step === 0 ? null : (STEPS[step - 1] ?? null);
  const isComplete = step >= TOTAL_STEPS;

  // Collect all found triplets
  const foundTriplets = useMemo(() => {
    const triplets: number[][] = [];
    for (let s = 0; s < step; s++) {
      if (STEPS[s]?.triplet) {
        triplets.push(STEPS[s].triplet!);
      }
    }
    return triplets;
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto select-none">
      {/* Header */}
      <div className="text-center mb-6">
        <h2
          className="text-xl font-bold mb-1"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Three Sum
        </h2>
        <p className="text-zinc-400 text-sm">
          Target Sum: <span className="text-white font-semibold">0</span>
        </p>
        <p className="text-zinc-500 text-xs mt-1">
          Input: [{INPUT.join(', ')}] → Sorted: [{SORTED.join(', ')}]
        </p>
      </div>

      {/* Array visualization */}
      <div className="bg-zinc-800/80 rounded-xl p-6 border border-zinc-700/60 mb-4">
        <div className="flex justify-center gap-2 flex-wrap">
          {SORTED.map((value, idx) => {
            const isFixed = current !== null && idx === current.fixedIdx;
            const isLeft = current !== null && idx === current.left;
            const isRight = current !== null && idx === current.right;
            const isInTriplet =
              current?.triplet !== null &&
              (idx === current.fixedIdx || idx === current.left || idx === current.right);

            let borderColor = 'rgba(63,63,70,0.6)';
            let bg = 'rgba(39,39,42,0.8)';
            let textColor = '#e4e4e7';

            if (current?.skipDuplicate && (isFixed || isLeft || isRight)) {
              borderColor = COLORS.skipped;
              bg = `${COLORS.skipped}22`;
              textColor = COLORS.skipped;
            } else if (isInTriplet && current?.triplet) {
              borderColor = COLORS.triplet;
              bg = `${COLORS.triplet}22`;
              textColor = COLORS.triplet;
            } else if (isFixed) {
              borderColor = COLORS.fixed;
              bg = `${COLORS.fixed}22`;
              textColor = COLORS.fixed;
            } else if (isLeft) {
              borderColor = COLORS.left;
              bg = `${COLORS.left}22`;
              textColor = COLORS.left;
            } else if (isRight) {
              borderColor = COLORS.right;
              bg = `${COLORS.right}22`;
              textColor = COLORS.right;
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className="relative flex items-center justify-center rounded-lg font-mono text-sm font-bold transition-all duration-400"
                  style={{
                    width: 56,
                    height: 56,
                    border: `2px solid ${borderColor}`,
                    background: bg,
                    color: textColor,
                    boxShadow:
                      isInTriplet && current?.triplet
                        ? `0 0 14px ${COLORS.triplet}88, 0 0 30px ${COLORS.triplet}44`
                        : isFixed || isLeft || isRight
                          ? `0 0 10px ${borderColor}66`
                          : 'none',
                    opacity: current?.skipDuplicate && (isFixed || isLeft || isRight) ? 0.5 : 1,
                  }}
                >
                  {value}
                </div>
                <span className="text-[10px] font-mono text-zinc-500">[{idx}]</span>
                <div className="flex gap-0.5 h-5">
                  {current !== null && (
                    <>
                      {isFixed && <Badge color={COLORS.fixed} label="fixed" />}
                      {isLeft && !isFixed && <Badge color={COLORS.left} label="L" />}
                      {isRight && !isFixed && <Badge color={COLORS.right} label="R" />}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Found triplets */}
      {foundTriplets.length > 0 && (
        <div className="bg-zinc-800/80 rounded-xl p-4 border border-zinc-700/60 mb-4">
          <h3 className="text-sm font-semibold text-zinc-400 mb-2">Found Triplets:</h3>
          <div className="flex gap-2 flex-wrap">
            {foundTriplets.map((triplet, idx) => (
              <div
                key={idx}
                className="px-3 py-1 rounded-lg font-mono text-sm"
                style={{
                  background: `${COLORS.triplet}22`,
                  border: `1px solid ${COLORS.triplet}55`,
                  color: COLORS.triplet,
                }}
              >
                [{triplet.join(', ')}]
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info panel */}
      <div
        className="rounded-xl border border-zinc-700/60 bg-zinc-800/80 px-5 py-4 text-center mb-4"
        style={{ minHeight: 80 }}
      >
        {current === null ? (
          <p className="text-zinc-500 text-sm italic">
            Press <span className="font-semibold text-zinc-400">Play</span> or{' '}
            <span className="font-semibold text-zinc-400">Step</span> to begin
          </p>
        ) : (
          <>
            <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider font-semibold">
              Step {step} of {TOTAL_STEPS}
            </p>
            <p
              className="font-mono text-sm font-semibold mb-2"
              style={{
                color: current.triplet ? COLORS.triplet : current.skipDuplicate ? COLORS.skipped : '#e4e4e7',
              }}
            >
              {current.action}
            </p>
            {!current.skipDuplicate && (
              <p className="text-zinc-500 text-xs">
                Sum = {current.fixed} + {SORTED[current.left]} + {SORTED[current.right]} ={' '}
                <span className="text-white font-semibold">{current.sum}</span>
              </p>
            )}
          </>
        )}
      </div>

      {/* Controls */}
      <VizControls controls={controls} accentColor="#8b5cf6" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helper components
// ---------------------------------------------------------------------------

function Badge({ color, label }: { color: string; label: string }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full text-[9px] font-bold uppercase leading-none px-1.5 py-0.5"
      style={{
        background: `${color}22`,
        color,
        border: `1px solid ${color}55`,
      }}
    >
      {label}
    </span>
  );
}
