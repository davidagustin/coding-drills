'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Pre-computed data
// ---------------------------------------------------------------------------

const HEIGHTS = [1, 8, 6, 2, 5, 4, 8, 3, 7] as const;

interface ContainerStep {
  left: number;
  right: number;
  leftHeight: number;
  rightHeight: number;
  width: number;
  currentHeight: number;
  area: number;
  maxArea: number;
  action: string;
}

function computeSteps(): ContainerStep[] {
  const steps: ContainerStep[] = [];
  let left = 0;
  let right = HEIGHTS.length - 1;
  let maxArea = 0;

  while (left < right) {
    const leftHeight = HEIGHTS[left];
    const rightHeight = HEIGHTS[right];
    const width = right - left;
    const currentHeight = Math.min(leftHeight, rightHeight);
    const area = width * currentHeight;
    maxArea = Math.max(maxArea, area);

    const action =
      leftHeight < rightHeight
        ? `height[${left}] (${leftHeight}) < height[${right}] (${rightHeight}) → move left pointer`
        : `height[${right}] (${rightHeight}) ≤ height[${left}] (${leftHeight}) → move right pointer`;

    steps.push({
      left,
      right,
      leftHeight,
      rightHeight,
      width,
      currentHeight,
      area,
      maxArea,
      action,
    });

    if (leftHeight < rightHeight) {
      left++;
    } else {
      right--;
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
  left: '#3b82f6', // blue
  right: '#f97316', // orange
  container: '#22c55e', // green
  maxContainer: '#eab308', // yellow
  water: '#60a5fa', // light blue
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ContainerMostWaterViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const current: ContainerStep | null = step === 0 ? null : (STEPS[step - 1] ?? null);
  const _isComplete = step >= TOTAL_STEPS;

  // Find the step with maximum area for highlighting
  const maxAreaStep = useMemo(() => {
    if (!STEPS.length) return null;
    let max = STEPS[0];
    for (const s of STEPS) {
      if (s.area > max.area) max = s;
    }
    return max;
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto select-none">
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
          Container With Most Water
        </h2>
        <p className="text-zinc-400 text-sm">
          Maximum Area: <span className="text-white font-semibold">{current?.maxArea ?? 0}</span>
        </p>
      </div>

      {/* Visualization */}
      <div className="bg-zinc-800/80 rounded-xl p-6 border border-zinc-700/60">
        {/* Bars visualization */}
        <div className="flex items-end justify-center gap-2 mb-6" style={{ minHeight: 200 }}>
          {HEIGHTS.map((height, idx) => {
            const isLeft = current !== null && idx === current.left;
            const isRight = current !== null && idx === current.right;
            const isMaxContainer =
              maxAreaStep !== null &&
              current !== null &&
              ((idx === maxAreaStep.left && isLeft) || (idx === maxAreaStep.right && isRight));

            const barHeight = (height / Math.max(...HEIGHTS)) * 150;

            return (
              <div key={idx} className="flex flex-col items-center gap-2" style={{ width: 50 }}>
                {/* Container visualization */}
                {current !== null &&
                  ((isLeft && idx < current.right) || (isRight && idx > current.left)) && (
                    <div
                      className="absolute opacity-30 rounded-t"
                      style={{
                        width: 50,
                        height: (current.currentHeight / Math.max(...HEIGHTS)) * 150,
                        background: isMaxContainer
                          ? `linear-gradient(to bottom, ${COLORS.maxContainer}88, ${COLORS.maxContainer}44)`
                          : `linear-gradient(to bottom, ${COLORS.water}88, ${COLORS.water}44)`,
                        border: `2px solid ${isMaxContainer ? COLORS.maxContainer : COLORS.container}`,
                        borderBottom: 'none',
                        marginTop: -barHeight,
                        zIndex: 0,
                      }}
                    />
                  )}

                {/* Bar */}
                <div
                  className="relative rounded-t transition-all duration-400"
                  style={{
                    width: 40,
                    height: barHeight,
                    background: isMaxContainer
                      ? `linear-gradient(to top, ${COLORS.maxContainer}, ${COLORS.maxContainer}dd)`
                      : isLeft
                        ? `linear-gradient(to top, ${COLORS.left}, ${COLORS.left}dd)`
                        : isRight
                          ? `linear-gradient(to top, ${COLORS.right}, ${COLORS.right}dd)`
                          : 'linear-gradient(to top, #52525b, #71717a)',
                    border: `2px solid ${
                      isMaxContainer
                        ? COLORS.maxContainer
                        : isLeft
                          ? COLORS.left
                          : isRight
                            ? COLORS.right
                            : '#52525b'
                    }`,
                    boxShadow:
                      isLeft || isRight
                        ? `0 0 12px ${
                            isLeft ? COLORS.left : COLORS.right
                          }66, 0 0 24px ${isLeft ? COLORS.left : COLORS.right}33`
                        : 'none',
                    zIndex: 1,
                    transition: 'all 0.4s cubic-bezier(.4,0,.2,1)',
                  }}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white">
                    {height}
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

        {/* Info panel */}
        <div
          className="mt-4 rounded-xl border border-zinc-700/60 bg-zinc-800/80 px-5 py-4 text-center"
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
                  Area = min({current.leftHeight}, {current.rightHeight}) × {current.width} ={' '}
                  <span className="text-white font-semibold">{current.area}</span>
                </span>
                <span>
                  Max Area: <span className="text-white font-semibold">{current.maxArea}</span>
                </span>
              </div>
            </>
          )}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <LegendItem color={COLORS.left} label="left pointer" />
          <LegendItem color={COLORS.right} label="right pointer" />
          <LegendItem color={COLORS.container} label="current container" />
          <LegendItem color={COLORS.maxContainer} label="max container" />
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

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: color }} />
      <span className="text-zinc-400 text-xs">{label}</span>
    </div>
  );
}
