'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Pre-computed data
// ---------------------------------------------------------------------------

const HEIGHTS = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] as const;

interface TrappingStep {
  left: number;
  right: number;
  leftMax: number;
  rightMax: number;
  water: number;
  totalWater: number;
  action: string;
  waterAtCurrent: number;
}

function computeSteps(): TrappingStep[] {
  const steps: TrappingStep[] = [];
  let left = 0;
  let right = HEIGHTS.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let totalWater = 0;

  while (left < right) {
    const leftHeight = HEIGHTS[left];
    const rightHeight = HEIGHTS[right];

    let waterAtCurrent = 0;
    let action = '';

    if (leftHeight < rightHeight) {
      if (leftHeight >= leftMax) {
        leftMax = leftHeight;
        action = `height[${left}] (${leftHeight}) >= leftMax → update leftMax to ${leftMax}`;
      } else {
        waterAtCurrent = leftMax - leftHeight;
        totalWater += waterAtCurrent;
        action = `height[${left}] (${leftHeight}) < leftMax (${leftMax}) → trap ${waterAtCurrent} units of water`;
      }
      left++;
    } else {
      if (rightHeight >= rightMax) {
        rightMax = rightHeight;
        action = `height[${right}] (${rightHeight}) >= rightMax → update rightMax to ${rightMax}`;
      } else {
        waterAtCurrent = rightMax - rightHeight;
        totalWater += waterAtCurrent;
        action = `height[${right}] (${rightHeight}) < rightMax (${rightMax}) → trap ${waterAtCurrent} units of water`;
      }
      right--;
    }

    steps.push({
      left: leftHeight < rightHeight ? left - 1 : left,
      right: leftHeight < rightHeight ? right : right + 1,
      leftMax,
      rightMax,
      water: waterAtCurrent,
      totalWater,
      action,
      waterAtCurrent,
    });
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const COLORS = {
  left: '#3b82f6', // blue
  right: '#f97316', // orange
  water: '#60a5fa', // light blue
  bar: '#71717a', // gray
  leftMax: '#8b5cf6', // purple
  rightMax: '#ec4899', // pink
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TrappingRainWaterViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const current: TrappingStep | null = step === 0 ? null : (STEPS[step - 1] ?? null);
  const _isComplete = step >= TOTAL_STEPS;

  // Calculate water level at each position
  const waterLevels = useMemo(() => {
    if (!current) return new Array(HEIGHTS.length).fill(0);
    const levels = new Array(HEIGHTS.length).fill(0);
    for (let i = 0; i < HEIGHTS.length; i++) {
      const leftMaxForI = Math.max(...Array.from(HEIGHTS.slice(0, i + 1)));
      const rightMaxForI = Math.max(...Array.from(HEIGHTS.slice(i)));
      levels[i] = Math.max(0, Math.min(leftMaxForI, rightMaxForI) - HEIGHTS[i]);
    }
    return levels;
  }, [current]);

  const maxHeight = Math.max(...HEIGHTS);

  return (
    <div className="w-full max-w-5xl mx-auto select-none">
      {/* Header */}
      <div className="text-center mb-6">
        <h2
          className="text-xl font-bold mb-1"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Trapping Rain Water
        </h2>
        <p className="text-zinc-400 text-sm">
          Total Water Trapped:{' '}
          <span className="text-white font-semibold">{current?.totalWater ?? 0}</span> units
        </p>
      </div>

      {/* Visualization */}
      <div className="bg-zinc-800/80 rounded-xl p-6 border border-zinc-700/60 mb-4">
        {/* Bars and water */}
        <div className="flex items-end justify-center gap-1.5 mb-6" style={{ minHeight: 250 }}>
          {HEIGHTS.map((height, idx) => {
            const isLeft = current !== null && idx === current.left;
            const isRight = current !== null && idx === current.right;
            const waterLevel = waterLevels[idx];
            const barHeight = (height / maxHeight) * 180;
            const waterHeight = (waterLevel / maxHeight) * 180;

            return (
              <div key={idx} className="flex flex-col items-center gap-1" style={{ width: 40 }}>
                {/* Container for bar and water */}
                <div className="relative" style={{ height: 200 }}>
                  {/* Water */}
                  {waterLevel > 0 && (
                    <div
                      className="absolute bottom-0 left-0 right-0 rounded-t transition-all duration-400"
                      style={{
                        height: waterHeight,
                        background: `linear-gradient(to top, ${COLORS.water}88, ${COLORS.water}44)`,
                        border: `1px solid ${COLORS.water}66`,
                        borderBottom: 'none',
                        zIndex: 1,
                      }}
                    />
                  )}

                  {/* Bar */}
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rounded-t transition-all duration-400"
                    style={{
                      width: 30,
                      height: barHeight,
                      background:
                        isLeft || isRight
                          ? `linear-gradient(to top, ${isLeft ? COLORS.left : COLORS.right}, ${isLeft ? COLORS.left : COLORS.right}dd)`
                          : 'linear-gradient(to top, #52525b, #71717a)',
                      border: `2px solid ${isLeft ? COLORS.left : isRight ? COLORS.right : '#52525b'}`,
                      boxShadow:
                        isLeft || isRight
                          ? `0 0 12px ${isLeft ? COLORS.left : COLORS.right}66, 0 0 24px ${isLeft ? COLORS.left : COLORS.right}33`
                          : 'none',
                      zIndex: 2,
                    }}
                  >
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white">
                      {height}
                    </div>
                    {waterLevel > 0 && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-[10px] font-bold text-blue-300">
                        +{waterLevel}
                      </div>
                    )}
                  </div>
                </div>

                {/* Index */}
                <span className="text-[10px] font-mono text-zinc-400">[{idx}]</span>

                {/* Pointer badges */}
                <div className="flex gap-1 h-5">
                  {current !== null && (
                    <>
                      {isLeft && <Badge color={COLORS.left} label="L" />}
                      {isRight && <Badge color={COLORS.right} label="R" />}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Max indicators */}
        {current && (
          <div className="flex justify-between items-center mb-4 px-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: COLORS.leftMax }} />
              <span className="text-zinc-400">
                leftMax: <span className="text-white font-semibold">{current.leftMax}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: COLORS.rightMax }} />
              <span className="text-zinc-400">
                rightMax: <span className="text-white font-semibold">{current.rightMax}</span>
              </span>
            </div>
          </div>
        )}

        {/* Info panel */}
        <div
          className="rounded-xl border border-zinc-700/60 bg-zinc-800/80 px-5 py-4 text-center"
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
              <p className="font-mono text-sm font-semibold text-white mb-2">{current.action}</p>
              <div className="flex justify-center gap-4 text-xs text-zinc-400">
                <span>
                  Water at position:{' '}
                  <span className="text-white font-semibold">{current.waterAtCurrent}</span>
                </span>
                <span>
                  Total Water:{' '}
                  <span className="text-white font-semibold">{current.totalWater}</span>
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Controls */}
      <VizControls controls={controls} accentColor="#3b82f6" />
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
