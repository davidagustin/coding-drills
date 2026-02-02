'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ContainerStep {
  left: number;
  right: number;
  leftHeight: number;
  rightHeight: number;
  width: number;
  area: number;
  maxArea: number;
  isNewMax: boolean;
  action: 'move-left' | 'move-right';
  description: string;
}

// ---------------------------------------------------------------------------
// Pre-computed data
// ---------------------------------------------------------------------------

const HEIGHTS = [1, 8, 6, 2, 5, 4, 8, 3, 7] as const;

/** Pre-compute every step of the container most water algorithm. */
function buildSteps(heights: readonly number[]): ContainerStep[] {
  const steps: ContainerStep[] = [];
  let left = 0;
  let right = heights.length - 1;
  let maxArea = 0;

  while (left < right) {
    const leftHeight = heights[left];
    const rightHeight = heights[right];
    const width = right - left;
    const containerHeight = Math.min(leftHeight, rightHeight);
    const area = width * containerHeight;
    const isNewMax = area > maxArea;
    if (isNewMax) maxArea = area;

    const action = leftHeight < rightHeight ? 'move-left' : 'move-right';
    const description =
      action === 'move-left'
        ? `Left height ${leftHeight} < Right height ${rightHeight}, move left pointer`
        : `Right height ${rightHeight} <= Left height ${leftHeight}, move right pointer`;

    steps.push({
      left,
      right,
      leftHeight,
      rightHeight,
      width,
      area,
      maxArea,
      isNewMax,
      action,
      description,
    });

    if (leftHeight < rightHeight) {
      left++;
    } else {
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
  container: '#22c55e', // green
  maxContainer: '#10b981', // emerald-500
  water: '#3b82f6', // blue for water fill
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ContainerMostWaterViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep: ContainerStep | null = step > 0 ? STEPS[step - 1] : null;
  const maxArea = useMemo(() => {
    if (!currentStep) return 0;
    return STEPS.slice(0, step).reduce((max, s) => Math.max(max, s.maxArea), 0);
  }, [step, currentStep]);

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      <style>{`
        @keyframes containerPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes maxGlow {
          from { box-shadow: 0 0 8px ${COLORS.maxContainer}66, 0 0 16px ${COLORS.maxContainer}33; }
          to { box-shadow: 0 0 16px ${COLORS.maxContainer}aa, 0 0 32px ${COLORS.maxContainer}55; }
        }
      `}</style>

      {/* Title */}
      <div className="text-center space-y-1">
        <h3
          className="text-lg font-bold"
          style={{
            background: `linear-gradient(135deg, ${COLORS.left}, ${COLORS.right})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Container With Most Water
        </h3>
        <p className="text-sm text-zinc-400">Find two lines that form the largest container</p>
      </div>

      {/* Array visualization with bars */}
      <div className="relative">
        {/* Container visualization */}
        {currentStep && (
          <div
            className="absolute bottom-0 border-2 rounded-t-lg transition-all duration-500"
            style={{
              left: `${currentStep.left * 60 + 20}px`,
              width: `${currentStep.width * 60}px`,
              height: `${Math.min(currentStep.leftHeight, currentStep.rightHeight) * 30}px`,
              borderColor: currentStep.isNewMax ? COLORS.maxContainer : COLORS.container,
              background: currentStep.isNewMax
                ? `linear-gradient(to top, ${COLORS.maxContainer}44, ${COLORS.maxContainer}22)`
                : `linear-gradient(to top, ${COLORS.water}44, ${COLORS.water}22)`,
              boxShadow: currentStep.isNewMax
                ? `0 0 16px ${COLORS.maxContainer}66`
                : `0 0 8px ${COLORS.water}44`,
              animation: currentStep.isNewMax ? 'maxGlow 0.8s ease-in-out infinite alternate' : undefined,
              zIndex: 5,
            }}
          >
            {/* Area label */}
            <div
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-mono font-bold whitespace-nowrap"
              style={{
                color: currentStep.isNewMax ? COLORS.maxContainer : COLORS.container,
              }}
            >
              Area: {currentStep.area}
            </div>
          </div>
        )}

        {/* Bars */}
        <div className="flex items-end justify-center gap-2 relative z-10">
          {HEIGHTS.map((height, idx) => {
            const isLeft = currentStep?.left === idx;
            const isRight = currentStep?.right === idx;
            const isActive = isLeft || isRight;

            let borderColor = '#52525b'; // zinc-600
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

            const boxShadow = isActive ? `0 0 12px ${borderColor}80, 0 0 24px ${borderColor}40` : 'none';

            return (
              <div key={idx} className="flex flex-col items-center gap-1" style={{ minWidth: 56 }}>
                {/* Bar */}
                <div
                  className="flex items-end justify-center rounded-t-lg transition-all duration-300 font-mono text-sm font-bold border-2 border-b-0"
                  style={{
                    width: 48,
                    height: `${height * 30}px`,
                    background: bgColor,
                    borderColor,
                    boxShadow,
                    color: textColor,
                    animation: isActive ? 'containerPulse 1.2s ease-in-out infinite' : undefined,
                  }}
                >
                  <span className="mb-1">{height}</span>
                </div>

                {/* Index label */}
                <span className="text-xs text-zinc-500 font-mono">{idx}</span>

                {/* Pointer labels */}
                <div className="h-5 flex items-center justify-center">
                  {isLeft && (
                    <span
                      className="text-xs font-bold tracking-wider"
                      style={{ color: COLORS.left }}
                    >
                      L
                    </span>
                  )}
                  {isRight && (
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
            style={{ background: COLORS.container }}
          />
          <span className="text-zinc-400">Container</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.maxContainer }}
          />
          <span className="text-zinc-400">Max Area</span>
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
                <span className="text-zinc-500 shrink-0">Width:</span>
                <span className="text-zinc-300">{currentStep.width}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 shrink-0">Height:</span>
                <span className="text-zinc-300">
                  min({currentStep.leftHeight}, {currentStep.rightHeight}) ={' '}
                  {Math.min(currentStep.leftHeight, currentStep.rightHeight)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 shrink-0">Area:</span>
                <span
                  className="font-semibold"
                  style={{
                    color: currentStep.isNewMax ? COLORS.maxContainer : COLORS.container,
                  }}
                >
                  {currentStep.area}
                  {currentStep.isNewMax ? ' ✨ NEW MAX!' : ''}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 shrink-0">Max Area:</span>
                <span
                  className="font-semibold"
                  style={{ color: COLORS.maxContainer }}
                >
                  {currentStep.maxArea}
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
