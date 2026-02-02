'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Pre-computed data
// ---------------------------------------------------------------------------

const INPUT = [2, 0, 2, 1, 1, 0] as const;
const PIVOT = 1;

interface DutchFlagStep {
  low: number;
  mid: number;
  high: number;
  array: number[];
  action: string;
  currentValue: number;
}

function computeSteps(): DutchFlagStep[] {
  const steps: DutchFlagStep[] = [];
  const arr = [...INPUT];
  let low = 0;
  let mid = 0;
  let high = arr.length - 1;

  steps.push({
    low,
    mid,
    high,
    array: [...arr],
    action: `Initialize: low = ${low}, mid = ${mid}, high = ${high}`,
    currentValue: arr[mid],
  });

  while (mid <= high) {
    const currentValue = arr[mid];
    let action = '';

    if (currentValue < PIVOT) {
      // Swap with low, increment both low and mid
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      action = `arr[${mid}] (${currentValue}) < pivot (${PIVOT}) → swap with arr[${low]}, increment low and mid`;
      low++;
      mid++;
    } else if (currentValue > PIVOT) {
      // Swap with high, decrement high
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      action = `arr[${mid}] (${currentValue}) > pivot (${PIVOT}) → swap with arr[${high]}, decrement high`;
      high--;
    } else {
      // Equal to pivot, just increment mid
      action = `arr[${mid}] (${currentValue}) === pivot (${PIVOT}) → already in correct section, increment mid`;
      mid++;
    }

    steps.push({
      low,
      mid,
      high,
      array: [...arr],
      action,
      currentValue,
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
  less: '#3b82f6', // blue (< pivot)
  equal: '#22c55e', // green (== pivot)
  greater: '#f97316', // orange (> pivot)
  low: '#8b5cf6', // purple
  mid: '#eab308', // yellow
  high: '#ec4899', // pink
  swapped: '#ef4444', // red
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DutchNationalFlagViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const current: DutchFlagStep | null = step === 0 ? null : (STEPS[step - 1] ?? null);
  const isComplete = step >= TOTAL_STEPS;

  // Determine partition sections
  const partitionSections = useMemo(() => {
    if (!current) return { less: [], equal: [], greater: [] };
    const less: number[] = [];
    const equal: number[] = [];
    const greater: number[] = [];

    for (let i = 0; i < current.array.length; i++) {
      const val = current.array[i];
      if (val < PIVOT) less.push(i);
      else if (val === PIVOT) equal.push(i);
      else greater.push(i);
    }

    return { less, equal, greater };
  }, [current]);

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
          Dutch National Flag
        </h2>
        <p className="text-zinc-400 text-sm">
          Pivot: <span className="text-white font-semibold">{PIVOT}</span>
        </p>
        <p className="text-zinc-500 text-xs mt-1">
          Input: <span className="text-white font-mono">[{INPUT.join(', ')}]</span>
        </p>
      </div>

      {/* Partition visualization */}
      <div className="bg-zinc-800/80 rounded-xl p-4 border border-zinc-700/60 mb-4">
        <div className="flex justify-center gap-1 mb-2">
          <div
            className="px-4 py-2 rounded-lg text-xs font-semibold"
            style={{
              background: `${COLORS.less}22`,
              border: `1px solid ${COLORS.less}55`,
              color: COLORS.less,
            }}
          >
            &lt; {PIVOT}
          </div>
          <div
            className="px-4 py-2 rounded-lg text-xs font-semibold"
            style={{
              background: `${COLORS.equal}22`,
              border: `1px solid ${COLORS.equal}55`,
              color: COLORS.equal,
            }}
          >
            = {PIVOT}
          </div>
          <div
            className="px-4 py-2 rounded-lg text-xs font-semibold"
            style={{
              background: `${COLORS.greater}22`,
              border: `1px solid ${COLORS.greater}55`,
              color: COLORS.greater,
            }}
          >
            &gt; {PIVOT}
          </div>
        </div>
      </div>

      {/* Array visualization */}
      <div className="bg-zinc-800/80 rounded-xl p-6 border border-zinc-700/60 mb-4">
        <div className="flex justify-center gap-2 flex-wrap">
          {current?.array.map((value, idx) => {
            const isLow = idx === current.low;
            const isMid = idx === current.mid;
            const isHigh = idx === current.high;
            const isLess = value < PIVOT;
            const isEqual = value === PIVOT;
            const isGreater = value > PIVOT;
            const wasSwapped =
              step > 1 &&
              STEPS[step - 1]?.array[idx] !== current.array[idx] &&
              (idx === current.low || idx === current.mid || idx === current.high);

            let borderColor = 'rgba(63,63,70,0.6)';
            let bg = 'rgba(39,39,42,0.8)';
            let textColor = '#e4e4e7';

            if (wasSwapped) {
              borderColor = COLORS.swapped;
              bg = `${COLORS.swapped}22`;
              textColor = COLORS.swapped;
            } else if (isLess) {
              borderColor = COLORS.less;
              bg = `${COLORS.less}22`;
              textColor = COLORS.less;
            } else if (isEqual) {
              borderColor = COLORS.equal;
              bg = `${COLORS.equal}22`;
              textColor = COLORS.equal;
            } else {
              borderColor = COLORS.greater;
              bg = `${COLORS.greater}22`;
              textColor = COLORS.greater;
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className="relative flex items-center justify-center rounded-lg font-mono text-sm font-bold transition-all duration-400"
                  style={{
                    width: 64,
                    height: 64,
                    border: `2px solid ${borderColor}`,
                    background: bg,
                    color: textColor,
                    boxShadow:
                      isLow || isMid || isHigh
                        ? `0 0 12px ${isLow ? COLORS.low : isMid ? COLORS.mid : COLORS.high}66, 0 0 24px ${isLow ? COLORS.low : isMid ? COLORS.mid : COLORS.high}33`
                        : 'none',
                    animation: wasSwapped ? 'swapPulse 0.6s ease-out' : 'none',
                  }}
                >
                  {value}
                </div>
                <span className="text-[10px] font-mono text-zinc-500">[{idx}]</span>
                <div className="flex gap-0.5 h-5">
                  {current !== null && (
                    <>
                      {isLow && <Badge color={COLORS.low} label="low" />}
                      {isMid && <Badge color={COLORS.mid} label="mid" />}
                      {isHigh && <Badge color={COLORS.high} label="high" />}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

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
            <p className="font-mono text-sm font-semibold text-white mb-2">{current.action}</p>
            <div className="flex justify-center gap-4 text-xs text-zinc-400">
              <span>
                low: <span className="text-white font-semibold">{current.low}</span>
              </span>
              <span>
                mid: <span className="text-white font-semibold">{current.mid}</span>
              </span>
              <span>
                high: <span className="text-white font-semibold">{current.high}</span>
              </span>
            </div>
          </>
        )}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mb-4 flex-wrap">
        <LegendItem color={COLORS.low} label="low pointer" />
        <LegendItem color={COLORS.mid} label="mid pointer" />
        <LegendItem color={COLORS.high} label="high pointer" />
        <LegendItem color={COLORS.less} label="&lt; pivot" />
        <LegendItem color={COLORS.equal} label="= pivot" />
        <LegendItem color={COLORS.greater} label="&gt; pivot" />
      </div>

      {/* Controls */}
      <VizControls controls={controls} accentColor="#8b5cf6" />

      {/* Animations */}
      <style>{`
        @keyframes swapPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
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
