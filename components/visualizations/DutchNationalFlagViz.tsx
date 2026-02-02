'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DutchFlagStep {
  low: number;
  mid: number;
  high: number;
  array: number[];
  action: 'less-than' | 'equal' | 'greater-than';
  description: string;
}

// ---------------------------------------------------------------------------
// Pre-computed data
// ---------------------------------------------------------------------------

const INPUT = [2, 0, 2, 1, 1, 0];
const PIVOT = 1;

/** Pre-compute every step of the Dutch National Flag algorithm. */
function buildSteps(nums: number[], pivot: number): DutchFlagStep[] {
  const steps: DutchFlagStep[] = [];
  const array = [...nums];
  let low = 0;
  let mid = 0;
  let high = array.length - 1;

  steps.push({
    low,
    mid,
    high,
    array: [...array],
    action: 'equal',
    description: `Start: partition array around pivot ${pivot}`,
  });

  while (mid <= high) {
    if (array[mid] < pivot) {
      // Swap with low, advance both
      [array[low], array[mid]] = [array[mid], array[low]];
      steps.push({
        low,
        mid,
        high,
        array: [...array],
        action: 'less-than',
        description: `arr[${mid}]=${array[low]} < ${pivot}, swap with low[${low}], advance both`,
      });
      low++;
      mid++;
    } else if (array[mid] > pivot) {
      // Swap with high, only decrement high
      [array[mid], array[high]] = [array[high], array[mid]];
      steps.push({
        low,
        mid,
        high,
        array: [...array],
        action: 'greater-than',
        description: `arr[${mid}]=${array[mid]} > ${pivot}, swap with high[${high}], decrement high`,
      });
      high--;
    } else {
      // Equal to pivot, just advance mid
      steps.push({
        low,
        mid,
        high,
        array: [...array],
        action: 'equal',
        description: `arr[${mid}]=${array[mid]} == ${pivot}, already in correct section, advance mid`,
      });
      mid++;
    }
  }

  return steps;
}

const STEPS = buildSteps(INPUT, PIVOT);
const TOTAL_STEPS = STEPS.length;

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const COLORS = {
  low: '#3b82f6', // blue (< pivot)
  mid: '#f97316', // orange (scanner)
  high: '#ef4444', // red (> pivot)
  equal: '#22c55e', // green (== pivot)
  idle: '#3f3f46', // zinc-700
  border: '#52525b', // zinc-600
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function ArrayCell({
  value,
  index,
  status,
  pointerLabel,
  pivot,
}: {
  value: number;
  index: number;
  status: 'idle' | 'low' | 'mid' | 'high' | 'less' | 'equal' | 'greater';
  pointerLabel: 'L' | 'M' | 'H' | null;
  pivot: number;
}) {
  const bgColor =
    status === 'less'
      ? COLORS.low
      : status === 'equal'
        ? COLORS.equal
        : status === 'greater'
          ? COLORS.high
          : status === 'low'
            ? COLORS.low
            : status === 'mid'
              ? COLORS.mid
              : status === 'high'
                ? COLORS.high
                : COLORS.idle;

  const borderColor = status !== 'idle' ? bgColor : COLORS.border;
  const boxShadow = status !== 'idle' ? `0 0 12px ${bgColor}80, 0 0 24px ${bgColor}40` : 'none';

  const isPivot = value === pivot;

  return (
    <div className="flex flex-col items-center gap-1" style={{ minWidth: 64 }}>
      <div
        className="flex items-center justify-center rounded-lg transition-all duration-300 relative"
        style={{
          width: 64,
          height: 64,
          background: bgColor,
          border: `2px solid ${borderColor}`,
          boxShadow,
        }}
      >
        <span className="text-xl font-bold text-white select-none">{value}</span>
        {isPivot && (
          <span className="absolute -top-1 -right-1 text-xs bg-yellow-500 text-black px-1 rounded font-bold">
            P
          </span>
        )}
      </div>
      <span className="text-xs text-zinc-500 font-mono">{index}</span>
      {pointerLabel && (
        <div className="h-5 flex items-center justify-center">
          <span
            className="text-xs font-bold tracking-wider"
            style={{
              color:
                pointerLabel === 'L'
                  ? COLORS.low
                  : pointerLabel === 'M'
                    ? COLORS.mid
                    : COLORS.high,
            }}
          >
            {pointerLabel}
          </span>
        </div>
      )}
    </div>
  );
}

export default function DutchNationalFlagViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep: DutchFlagStep | null = step > 0 ? STEPS[step - 1] : null;
  const isComplete = step >= TOTAL_STEPS;

  const cellData = useMemo(() => {
    if (!currentStep) {
      return INPUT.map((value, index) => ({
        value,
        index,
        status: 'idle' as const,
        pointerLabel: null as const,
      }));
    }

    return currentStep.array.map((value, index) => {
      let status: 'idle' | 'low' | 'mid' | 'high' | 'less' | 'equal' | 'greater' = 'idle';
      let pointerLabel: 'L' | 'M' | 'H' | null = null;

      const isLow = index === currentStep.low;
      const isMid = index === currentStep.mid;
      const isHigh = index === currentStep.high;

      if (isLow) pointerLabel = 'L';
      if (isMid) pointerLabel = 'M';
      if (isHigh) pointerLabel = 'H';

      // Determine section based on position relative to boundaries
      if (index < currentStep.low) {
        status = 'less';
      } else if (index > currentStep.high) {
        status = 'greater';
      } else if (index >= currentStep.low && index < currentStep.mid) {
        status = 'equal';
      } else if (index === currentStep.mid) {
        status = 'mid';
      } else if (index === currentStep.low) {
        status = 'low';
      } else if (index === currentStep.high) {
        status = 'high';
      } else {
        // Between mid and high
        status = value < PIVOT ? 'less' : value === PIVOT ? 'equal' : 'greater';
      }

      return { value, index, status, pointerLabel };
    });
  }, [currentStep]);

  const description = currentStep?.description || 'Press Play or Step to partition array';

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
            background: `linear-gradient(135deg, ${COLORS.low}, ${COLORS.equal}, ${COLORS.high})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Dutch National Flag
        </h3>
        <p className="text-sm text-zinc-400">Three-way partition around pivot</p>
      </div>

      <div className="text-center">
        <span className="text-xs text-zinc-500 font-mono">
          Input: [{INPUT.join(', ')}] | Pivot: {PIVOT}
        </span>
      </div>

      <div className="flex justify-center gap-2 flex-wrap">
        {cellData.map((cell) => (
          <ArrayCell
            key={cell.index}
            value={cell.value}
            index={cell.index}
            status={cell.status}
            pointerLabel={cell.pointerLabel}
            pivot={PIVOT}
          />
        ))}
      </div>

      <div className="flex justify-center gap-6 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.low }} />
          <span className="text-zinc-400">Low (L) - &lt; pivot</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.mid }} />
          <span className="text-zinc-400">Mid (M) - Scanner</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.high }} />
          <span className="text-zinc-400">High (H) - &gt; pivot</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.equal }} />
          <span className="text-zinc-400">Equal (= pivot)</span>
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
              <span className="text-zinc-500 shrink-0">Low:</span>
              <span className="text-zinc-300">{currentStep.low}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-zinc-500 shrink-0">Mid:</span>
              <span className="text-zinc-300">{currentStep.mid}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-zinc-500 shrink-0">High:</span>
              <span className="text-zinc-300">{currentStep.high}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-zinc-500 shrink-0">Array:</span>
              <span className="text-zinc-300">[{currentStep.array.join(', ')}]</span>
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

      {isComplete && currentStep && (
        <div
          className="text-center py-3 px-4 rounded-xl font-bold text-white text-sm"
          style={{
            background: `linear-gradient(135deg, ${COLORS.low}, ${COLORS.equal}, ${COLORS.high})`,
            animation: 'fadeInUp 0.4s ease-out',
          }}
        >
          Partitioned: [{currentStep.array.join(', ')}] - &lt; {PIVOT} | = {PIVOT} | &gt; {PIVOT}
        </div>
      )}

      <VizControls controls={controls} accentColor={COLORS.mid} />
    </div>
  );
}
