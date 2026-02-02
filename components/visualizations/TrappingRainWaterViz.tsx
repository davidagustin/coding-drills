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
}

// ---------------------------------------------------------------------------
// Pre-computed data
// ---------------------------------------------------------------------------

const HEIGHTS = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];

/** Pre-compute every step of the trapping rain water algorithm. */
function buildSteps(heights: number[]): TrappingStep[] {
  const steps: TrappingStep[] = [];
  let left = 0;
  let right = heights.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let totalWater = 0;

  while (left < right) {
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
          description: `Height[${left}] = ${heights[left]} >= leftMax, update leftMax to ${leftMax}`,
        });
      } else {
        const waterAtPos = leftMax - heights[left];
        totalWater += waterAtPos;
        steps.push({
          left,
          right,
          leftMax,
          rightMax,
          waterTrapped: waterAtPos,
          totalWater,
          action: 'process-left',
          description: `Water at ${left}: min(${leftMax}, ${rightMax}) - ${heights[left]} = ${waterAtPos}`,
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
          description: `Height[${right}] = ${heights[right]} >= rightMax, update rightMax to ${rightMax}`,
        });
      } else {
        const waterAtPos = rightMax - heights[right];
        totalWater += waterAtPos;
        steps.push({
          left,
          right,
          leftMax,
          rightMax,
          waterTrapped: waterAtPos,
          totalWater,
          action: 'process-right',
          description: `Water at ${right}: min(${leftMax}, ${rightMax}) - ${heights[right]} = ${waterAtPos}`,
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
  water: '#06b6d4', // cyan
  bar: '#8b5cf6', // purple
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
  waterLevel,
  leftMax,
  rightMax,
}: {
  height: number;
  index: number;
  status: 'idle' | 'left' | 'right' | 'processed';
  pointerLabel: 'L' | 'R' | null;
  waterLevel: number;
  leftMax: number;
  rightMax: number;
}) {
  const maxHeight = Math.max(...HEIGHTS);
  const waterHeight = Math.max(0, Math.min(leftMax, rightMax) - height);
  const showWater = waterHeight > 0 && (status === 'processed' || status === 'left' || status === 'right');

  return (
    <div className="flex flex-col items-center gap-1" style={{ minWidth: 40 }}>
      <div className="flex flex-col items-center justify-end" style={{ height: 160 }}>
        {/* Water */}
        {showWater && (
          <div
            className="w-10 rounded-t transition-all duration-300 opacity-70"
            style={{
              height: `${(waterHeight / maxHeight) * 100}%`,
              background: COLORS.water,
              minHeight: waterHeight > 0 ? '4px' : '0',
            }}
          />
        )}
        {/* Bar */}
        <div
          className="w-10 rounded-t transition-all duration-300"
          style={{
            height: `${(height / maxHeight) * 100}%`,
            background: status === 'left' ? COLORS.left : status === 'right' ? COLORS.right : COLORS.bar,
            border: `2px solid ${status !== 'idle' ? (status === 'left' ? COLORS.left : status === 'right' ? COLORS.right : COLORS.bar) : COLORS.border}`,
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

export default function TrappingRainWaterViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep: TrappingStep | null = step > 0 ? STEPS[step - 1] : null;
  const isComplete = step >= TOTAL_STEPS;

  const cellData = useMemo(() => {
    if (!currentStep) {
      return HEIGHTS.map((height, index) => ({
        height,
        index,
        status: 'idle' as const,
        pointerLabel: null as const,
        waterLevel: 0,
        leftMax: 0,
        rightMax: 0,
      }));
    }

    return HEIGHTS.map((height, index) => {
      let status: 'idle' | 'left' | 'right' | 'processed' = 'idle';
      let pointerLabel: 'L' | 'R' | null = null;

      if (index === currentStep.left) {
        status = 'left';
        pointerLabel = 'L';
      } else if (index === currentStep.right) {
        status = 'right';
        pointerLabel = 'R';
      } else if (
        (currentStep.action === 'process-left' && index < currentStep.left) ||
        (currentStep.action === 'process-right' && index > currentStep.right)
      ) {
        status = 'processed';
      }

      const waterLevel = Math.min(currentStep.leftMax, currentStep.rightMax) - height;

      return {
        height,
        index,
        status,
        pointerLabel,
        waterLevel: Math.max(0, waterLevel),
        leftMax: currentStep.leftMax,
        rightMax: currentStep.rightMax,
      };
    });
  }, [currentStep]);

  const description = currentStep?.description || 'Press Play or Step to calculate trapped rainwater';

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
          Trapping Rain Water
        </h3>
        <p className="text-sm text-zinc-400">Calculate water trapped between bars</p>
      </div>

      <div className="text-center">
        <span className="text-xs text-zinc-500 font-mono">
          Heights: [{HEIGHTS.join(', ')}]
        </span>
      </div>

      <div className="flex justify-center gap-1 items-end">
        {cellData.map((cell) => (
          <BarCell
            key={cell.index}
            height={cell.height}
            index={cell.index}
            status={cell.status}
            pointerLabel={cell.pointerLabel}
            waterLevel={cell.waterLevel}
            leftMax={cell.leftMax}
            rightMax={cell.rightMax}
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
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.water }} />
          <span className="text-zinc-400">Water</span>
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
              <span className="text-zinc-500 shrink-0">Left Max:</span>
              <span className="text-zinc-300">{currentStep.leftMax}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-zinc-500 shrink-0">Right Max:</span>
              <span className="text-zinc-300">{currentStep.rightMax}</span>
            </div>
            {currentStep.waterTrapped > 0 && (
              <div className="flex items-start gap-2">
                <span className="text-zinc-500 shrink-0">Water at position:</span>
                <span className="text-zinc-300">{currentStep.waterTrapped}</span>
              </div>
            )}
            <div className="flex items-start gap-2">
              <span className="text-zinc-500 shrink-0">Total Water:</span>
              <span className="text-zinc-300 font-bold" style={{ color: COLORS.water }}>
                {currentStep.totalWater}
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
            background: `linear-gradient(135deg, ${COLORS.water}, #0891b2)`,
            animation: 'fadeInUp 0.4s ease-out',
          }}
        >
          Total rainwater trapped: {currentStep?.totalWater || 0} units
        </div>
      )}

      <VizControls controls={controls} accentColor={COLORS.left} />
    </div>
  );
}
