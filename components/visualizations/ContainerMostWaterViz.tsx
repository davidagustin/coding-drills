'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Algorithm data
// ---------------------------------------------------------------------------
const HEIGHTS = [1, 8, 6, 2, 5, 4, 8, 3, 7] as const;

interface ContainerStep {
  left: number;
  right: number;
  width: number;
  height: number;
  area: number;
  maxArea: number;
  action: string;
}

// ---------------------------------------------------------------------------
// Pre-compute steps
// ---------------------------------------------------------------------------
function precomputeSteps(): ContainerStep[] {
  const steps: ContainerStep[] = [];
  let maxArea = 0;
  let left = 0;
  let right = HEIGHTS.length - 1;

  // Initial state
  steps.push({
    left,
    right,
    width: right - left,
    height: Math.min(HEIGHTS[left], HEIGHTS[right]),
    area: (right - left) * Math.min(HEIGHTS[left], HEIGHTS[right]),
    maxArea: 0,
    action: 'Start: Initialize pointers at both ends',
  });

  while (left < right) {
    const width = right - left;
    const height = Math.min(HEIGHTS[left], HEIGHTS[right]);
    const area = width * height;
    maxArea = Math.max(maxArea, area);

    steps.push({
      left,
      right,
      width,
      height,
      area,
      maxArea,
      action: `Area = ${width} × ${height} = ${area}. Max so far: ${maxArea}`,
    });

    if (HEIGHTS[left] < HEIGHTS[right]) {
      left++;
    } else {
      right--;
    }
  }

  // Final state
  steps.push({
    left: -1,
    right: -1,
    width: 0,
    height: 0,
    area: 0,
    maxArea,
    action: `Complete! Maximum area: ${maxArea}`,
  });

  return steps;
}

const STEPS = precomputeSteps();
const TOTAL_STEPS = STEPS.length;

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------
const ACCENT_LEFT = '#3b82f6'; // blue
const ACCENT_RIGHT = '#f97316'; // orange
const WATER_COLOR = '#06b6d4'; // cyan
const MAX_AREA_COLOR = '#22c55e'; // green

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function ContainerMostWaterViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  const isComplete = step >= TOTAL_STEPS - 1;
  const maxBarWidth = Math.max(...HEIGHTS);

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      {/* Title */}
      <div className="text-center space-y-1">
        <h3
          className="text-lg font-bold"
          style={{
            background: `linear-gradient(135deg, ${ACCENT_LEFT}, ${ACCENT_RIGHT})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Container With Most Water
        </h3>
        <p className="text-sm text-zinc-400">Two-pointer greedy approach</p>
      </div>

      {/* Visualization */}
      <div className="relative" style={{ height: `${maxBarWidth * 8 + 100}px` }}>
        {/* Water container visualization */}
        {!isComplete && currentStep.left >= 0 && currentStep.right >= 0 && (
          <div
            className="absolute border-2 rounded-t-lg opacity-30 transition-all duration-500"
            style={{
              left: `${(currentStep.left / HEIGHTS.length) * 100}%`,
              width: `${((currentStep.right - currentStep.left) / HEIGHTS.length) * 100}%`,
              bottom: '40px',
              height: `${(currentStep.height / maxBarWidth) * 100}%`,
              borderColor: WATER_COLOR,
              background: `linear-gradient(to top, ${WATER_COLOR}40, ${WATER_COLOR}20)`,
            }}
          />
        )}

        {/* Bars */}
        <div className="flex items-end justify-between gap-1 h-full">
          {HEIGHTS.map((height, idx) => {
            const isLeft = idx === currentStep.left && !isComplete;
            const isRight = idx === currentStep.right && !isComplete;
            const inContainer =
              !isComplete &&
              currentStep.left >= 0 &&
              idx >= currentStep.left &&
              idx <= currentStep.right;

            const barColor = isLeft
              ? ACCENT_LEFT
              : isRight
                ? ACCENT_RIGHT
                : inContainer
                  ? WATER_COLOR
                  : '#52525b'; // zinc-600

            const barHeight = (height / maxBarWidth) * 100;

            return (
              <div
                key={idx}
                className="flex flex-col items-center gap-1 flex-1"
                style={{ height: '100%' }}
              >
                {/* Bar */}
                <div
                  className="w-full rounded-t transition-all duration-300 relative"
                  style={{
                    height: `${barHeight}%`,
                    background: barColor,
                    border: `2px solid ${barColor}`,
                    borderBottom: 'none',
                    boxShadow:
                      isLeft || isRight
                        ? `0 0 12px ${barColor}80, 0 0 24px ${barColor}40`
                        : 'none',
                    animation:
                      isLeft || isRight ? 'barPulse 1.2s ease-in-out infinite' : undefined,
                  }}
                >
                  {/* Height label */}
                  <div
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold"
                    style={{ color: barColor }}
                  >
                    {height}
                  </div>
                </div>

                {/* Index label */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-zinc-500 font-mono">
                  {idx}
                </div>

                {/* Pointer labels */}
                {(isLeft || isRight) && (
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <span
                      className="text-xs font-bold"
                      style={{ color: isLeft ? ACCENT_LEFT : ACCENT_RIGHT }}
                    >
                      {isLeft ? 'L' : 'R'}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats panel */}
      <div className="rounded-xl bg-zinc-800 border border-zinc-700 p-4 space-y-3 text-sm">
        <div className="flex items-start gap-2">
          <span className="text-zinc-500 shrink-0">Action:</span>
          <span className="text-zinc-200 font-mono">{currentStep.action}</span>
        </div>
        {!isComplete && currentStep.left >= 0 && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-zinc-500">Width:</span>
              <span className="ml-2 text-zinc-300 font-mono">{currentStep.width}</span>
            </div>
            <div>
              <span className="text-zinc-500">Height:</span>
              <span className="ml-2 text-zinc-300 font-mono">{currentStep.height}</span>
            </div>
            <div>
              <span className="text-zinc-500">Area:</span>
              <span className="ml-2 text-zinc-300 font-mono">{currentStep.area}</span>
            </div>
            <div>
              <span className="text-zinc-500">Max Area:</span>
              <span
                className="ml-2 font-mono font-bold"
                style={{ color: MAX_AREA_COLOR }}
              >
                {currentStep.maxArea}
              </span>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 shrink-0">Step:</span>
          <span className="text-zinc-300">
            {Math.min(step + 1, TOTAL_STEPS)} / {TOTAL_STEPS}
          </span>
        </div>
      </div>

      {/* Complete banner */}
      {isComplete && (
        <div
          className="text-center py-3 px-4 rounded-xl font-bold text-white text-sm"
          style={{
            background: `linear-gradient(135deg, ${MAX_AREA_COLOR}, #16a34a)`,
            animation: 'fadeInUp 0.4s ease-out',
          }}
        >
          Maximum area found: {currentStep.maxArea}
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes barPulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.05); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Controls */}
      <VizControls controls={controls} accentColor={ACCENT_LEFT} />
    </div>
  );
}
