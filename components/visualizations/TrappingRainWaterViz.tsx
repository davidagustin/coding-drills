'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TrappingStep {
  left: number;
  right: number;
  leftMax: number;
  rightMax: number;
  waterTrapped: number;
  totalWater: number;
  action: 'process-left' | 'process-right';
  description: string;
  waterLevels: number[]; // Water level at each position
}

// ---------------------------------------------------------------------------
// Pre-computed data
// ---------------------------------------------------------------------------

const HEIGHTS = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] as const;

/** Pre-compute every step of the trapping rain water algorithm. */
function buildSteps(heights: readonly number[]): TrappingStep[] {
  const steps: TrappingStep[] = [];
  let left = 0;
  let right = heights.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let totalWater = 0;
  const waterLevels = new Array(heights.length).fill(0);

  while (left < right) {
    const waterLevelsCopy = [...waterLevels];

    if (heights[left] < heights[right]) {
      // Process left side
      if (heights[left] >= leftMax) {
        leftMax = heights[left];
        steps.push({
          left,
          right,
          leftMax,
          rightMax,
          waterTrapped: 0,
          totalWater,
          action: 'process-left',
          description: `Left bar ${heights[left]} >= leftMax (${leftMax}), update leftMax`,
          waterLevels: [...waterLevelsCopy],
        });
      } else {
        const trapped = leftMax - heights[left];
        totalWater += trapped;
        waterLevels[left] = trapped;
        steps.push({
          left,
          right,
          leftMax,
          rightMax,
          waterTrapped: trapped,
          totalWater,
          action: 'process-left',
          description: `Trap water at index ${left}: ${leftMax} - ${heights[left]} = ${trapped}`,
          waterLevels: [...waterLevels],
        });
      }
      left++;
    } else {
      // Process right side
      if (heights[right] >= rightMax) {
        rightMax = heights[right];
        steps.push({
          left,
          right,
          leftMax,
          rightMax,
          waterTrapped: 0,
          totalWater,
          action: 'process-right',
          description: `Right bar ${heights[right]} >= rightMax (${rightMax}), update rightMax`,
          waterLevels: [...waterLevelsCopy],
        });
      } else {
        const trapped = rightMax - heights[right];
        totalWater += trapped;
        waterLevels[right] = trapped;
        steps.push({
          left,
          right,
          leftMax,
          rightMax,
          waterTrapped: trapped,
          totalWater,
          action: 'process-right',
          description: `Trap water at index ${right}: ${rightMax} - ${heights[right]} = ${trapped}`,
          waterLevels: [...waterLevels],
        });
      }
      right--;
    }
  }

  return steps;
}

const STEPS = buildSteps(HEIGHTS);
const TOTAL_STEPS = STEPS.length;

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const COLORS = {
  left: '#3b82f6', // blue
  right: '#f97316', // orange
  water: '#3b82f6', // blue for water
  bar: '#71717a', // zinc-500
  max: '#22c55e', // green for max heights
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TrappingRainWaterViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep: TrappingStep | null = step > 0 ? STEPS[step - 1] : null;
  const waterLevels = currentStep?.waterLevels || new Array(HEIGHTS.length).fill(0);

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      <style>{`
        @keyframes trapPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes waterFill {
          from { height: 0; }
          to { height: var(--water-height); }
        }
      `}</style>

      {/* Title */}
      <div className="text-center space-y-1">
        <h3
          className="text-lg font-bold"
          style={{
            background: `linear-gradient(135deg, ${COLORS.left}, ${COLORS.water})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Trapping Rain Water
        </h3>
        <p className="text-sm text-zinc-400">Calculate trapped rainwater between bars</p>
      </div>

      {/* Visualization */}
      <div className="relative">
        {/* Bars with water */}
        <div className="flex items-end justify-center gap-1 relative" style={{ minHeight: '200px' }}>
          {HEIGHTS.map((height, idx) => {
            const isLeft = currentStep?.left === idx;
            const isRight = currentStep?.right === idx;
            const waterLevel = waterLevels[idx] || 0;
            const waterHeight = waterLevel * 30; // Scale water level
            const barHeight = height * 30;

            let borderColor = COLORS.bar;
            let bgColor = '#27272a'; // zinc-800
            let textColor = '#a1a1aa'; // zinc-400

            if (isLeft) {
              borderColor = COLORS.left;
              bgColor = `${COLORS.left}22`;
              textColor = COLORS.left;
            } else if (isRight) {
              borderColor = COLORS.right;
              bgColor = `${COLORS.right}22`;
              textColor = COLORS.right;
            }

            const boxShadow =
              isLeft || isRight ? `0 0 12px ${borderColor}80, 0 0 24px ${borderColor}40` : 'none';

            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-end gap-0 relative"
                style={{ minWidth: 40, height: '200px' }}
              >
                {/* Water (if trapped) */}
                {waterLevel > 0 && (
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-t-lg transition-all duration-500"
                    style={{
                      height: `${waterHeight}px`,
                      background: `linear-gradient(to top, ${COLORS.water}88, ${COLORS.water}66)`,
                      borderTop: `2px solid ${COLORS.water}`,
                      borderLeft: `1px solid ${COLORS.water}44`,
                      borderRight: `1px solid ${COLORS.water}44`,
                      zIndex: 2,
                      animation: 'waterFill 0.5s ease-out',
                    }}
                  >
                    {/* Water level label */}
                    <div
                      className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[10px] font-mono font-bold whitespace-nowrap"
                      style={{ color: COLORS.water }}
                    >
                      {waterLevel}
                    </div>
                  </div>
                )}

                {/* Bar */}
                <div
                  className="flex items-end justify-center rounded-t-lg transition-all duration-300 font-mono text-xs font-bold border-2 border-b-0 relative z-10"
                  style={{
                    width: 36,
                    height: `${barHeight}px`,
                    background: bgColor,
                    borderColor,
                    boxShadow,
                    color: textColor,
                    animation: isLeft || isRight ? 'trapPulse 1.2s ease-in-out infinite' : undefined,
                  }}
                >
                  {height > 0 && <span className="mb-1">{height}</span>}
                </div>

                {/* Index label */}
                <span className="text-[10px] text-zinc-500 font-mono mt-1">{idx}</span>

                {/* Pointer labels */}
                <div className="h-4 flex items-center justify-center mt-1">
                  {isLeft && (
                    <span
                      className="text-[10px] font-bold tracking-wider"
                      style={{ color: COLORS.left }}
                    >
                      L
                    </span>
                  )}
                  {isRight && (
                    <span
                      className="text-[10px] font-bold tracking-wider"
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
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 flex-wrap text-xs">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.left }}
          />
          <span className="text-zinc-400">Left Pointer</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.right }}
          />
          <span className="text-zinc-400">Right Pointer</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.water }}
          />
          <span className="text-zinc-400">Trapped Water</span>
        </div>
      </div>

      {/* Stats panel */}
      <div className="rounded-xl bg-zinc-800 border border-zinc-700 p-4 space-y-3 text-sm font-mono">
        {currentStep ? (
          <>
            <div className="flex items-start gap-2">
              <span className="text-zinc-500 shrink-0">Action:</span>
              <span className="text-zinc-200">{currentStep.description}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 shrink-0">Left Max:</span>
                <span className="text-zinc-300">{currentStep.leftMax}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 shrink-0">Right Max:</span>
                <span className="text-zinc-300">{currentStep.rightMax}</span>
              </div>
              {currentStep.waterTrapped > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500 shrink-0">Water Trapped:</span>
                  <span className="font-semibold" style={{ color: COLORS.water }}>
                    +{currentStep.waterTrapped}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 shrink-0">Total Water:</span>
                <span className="font-semibold" style={{ color: COLORS.water }}>
                  {currentStep.totalWater}
                </span>
              </div>
            </div>
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
      <VizControls controls={controls} accentColor={COLORS.left} />
    </div>
  );
}
