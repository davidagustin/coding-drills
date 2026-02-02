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
  action: 'compare' | 'move-left' | 'move-right';
  description: string;
}

// ---------------------------------------------------------------------------
// Pre-computed data
// ---------------------------------------------------------------------------

const HEIGHTS = [1, 8, 6, 2, 5, 4, 8, 3, 7];

/** Pre-compute every step of the container with most water algorithm. */
function buildSteps(heights: number[]): ContainerStep[] {
  const steps: ContainerStep[] = [];
  let left = 0;
  let right = heights.length - 1;
  let maxArea = 0;

  while (left < right) {
    const width = right - left;
    const leftHeight = heights[left];
    const rightHeight = heights[right];
    const containerHeight = Math.min(leftHeight, rightHeight);
    const area = width * containerHeight;
    maxArea = Math.max(maxArea, area);

    steps.push({
      left,
      right,
      leftHeight,
      rightHeight,
      width,
      area,
      maxArea,
      action: leftHeight < rightHeight ? 'move-left' : 'move-right',
      description: `Area = min(${leftHeight}, ${rightHeight}) × ${width} = ${area}. Max so far: ${maxArea}`,
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
  water: '#06b6d4', // cyan
  max: '#22c55e', // green
  idle: '#3f3f46', // zinc-700
  border: '#52525b', // zinc-600
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function BarCell({
  height,
  index,
  status,
  pointerLabel,
  isMaxContainer,
}: {
  height: number;
  index: number;
  status: 'idle' | 'left' | 'right' | 'container';
  pointerLabel: 'L' | 'R' | null;
  isMaxContainer: boolean;
}) {
  const barColor =
    status === 'left'
      ? COLORS.left
      : status === 'right'
        ? COLORS.right
        : status === 'container'
          ? isMaxContainer
            ? COLORS.max
            : COLORS.water
          : COLORS.idle;

  const borderColor = status !== 'idle' ? barColor : COLORS.border;

  return (
    <div className="flex flex-col items-center gap-1" style={{ minWidth: 48 }}>
      <div className="flex flex-col items-center justify-end" style={{ height: 120 }}>
        <div
          className="w-12 rounded-t transition-all duration-300"
          style={{
            height: `${(height / 8) * 100}%`,
            background: barColor,
            border: `2px solid ${borderColor}`,
            minHeight: height > 0 ? '8px' : '0',
          }}
        />
      </div>
      <span className="text-xs text-zinc-500 font-mono">{index}</span>
      <span className="text-xs text-zinc-400 font-mono">{height}</span>
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

export default function ContainerMostWaterViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep: ContainerStep | null = step > 0 ? STEPS[step - 1] : null;
  const isComplete = step >= TOTAL_STEPS;

  const maxArea = useMemo(() => {
    if (!currentStep) return 0;
    return currentStep.maxArea;
  }, [currentStep]);

  const cellData = useMemo(() => {
    if (!currentStep) {
      return HEIGHTS.map((height, index) => ({
        height,
        index,
        status: 'idle' as const,
        pointerLabel: null as const,
        isMaxContainer: false,
      }));
    }

    return HEIGHTS.map((height, index) => {
      let status: 'idle' | 'left' | 'right' | 'container' = 'idle';
      let pointerLabel: 'L' | 'R' | null = null;

      if (index === currentStep.left) {
        status = 'left';
        pointerLabel = 'L';
      } else if (index === currentStep.right) {
        status = 'right';
        pointerLabel = 'R';
      } else if (index > currentStep.left && index < currentStep.right) {
        status = 'container';
      }

      const isMaxContainer = currentStep.area === maxArea && status === 'container';

      return { height, index, status, pointerLabel, isMaxContainer };
    });
  }, [currentStep, maxArea]);

  const description = currentStep?.description || 'Press Play or Step to find container with most water';

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
          Container With Most Water
        </h3>
        <p className="text-sm text-zinc-400">Find two lines that form the largest container</p>
      </div>

      <div className="text-center">
        <span className="text-xs text-zinc-500 font-mono">
          Heights: [{HEIGHTS.join(', ')}]
        </span>
      </div>

      <div className="flex justify-center gap-2 items-end">
        {cellData.map((cell) => (
          <BarCell
            key={cell.index}
            height={cell.height}
            index={cell.index}
            status={cell.status}
            pointerLabel={cell.pointerLabel}
            isMaxContainer={cell.isMaxContainer}
          />
        ))}
      </div>

      {currentStep && (
        <div className="flex justify-center gap-2 text-xs text-zinc-400">
          <span>Width: {currentStep.width}</span>
          <span>•</span>
          <span>Height: min({currentStep.leftHeight}, {currentStep.rightHeight}) = {Math.min(currentStep.leftHeight, currentStep.rightHeight)}</span>
        </div>
      )}

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
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.water }} />
          <span className="text-zinc-400">Container</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.max }} />
          <span className="text-zinc-400">Max Area</span>
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
              <span className="text-zinc-500 shrink-0">Current Area:</span>
              <span className="text-zinc-300">{currentStep.area}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-zinc-500 shrink-0">Max Area:</span>
              <span className="text-zinc-300 font-bold" style={{ color: COLORS.max }}>
                {currentStep.maxArea}
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

      {isComplete && (
        <div
          className="text-center py-3 px-4 rounded-xl font-bold text-white text-sm"
          style={{
            background: `linear-gradient(135deg, ${COLORS.max}, #16a34a)`,
            animation: 'fadeInUp 0.4s ease-out',
          }}
        >
          Maximum water area: {maxArea} units²
        </div>
      )}

      <VizControls controls={controls} accentColor={COLORS.left} />
    </div>
  );
}
