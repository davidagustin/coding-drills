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

const INITIAL_ARRAY = [2, 0, 2, 1, 1, 0] as const;
const PIVOT = 1;

/** Pre-compute every step of the Dutch National Flag algorithm. */
function buildSteps(initial: readonly number[], pivot: number): DutchFlagStep[] {
  const steps: DutchFlagStep[] = [];
  const array = [...initial];
  let low = 0;
  let mid = 0;
  let high = array.length - 1;

  // Initial state
  steps.push({
    low,
    mid,
    high,
    array: [...array],
    action: 'equal',
    description: `Initialize: low=${low}, mid=${mid}, high=${high}, pivot=${pivot}`,
  });

  while (mid <= high) {
    if (array[mid] < pivot) {
      // Swap with low, increment both
      [array[low], array[mid]] = [array[mid], array[low]];
      steps.push({
        low,
        mid,
        high,
        array: [...array],
        action: 'less-than',
        description: `arr[${mid}]=${array[low]} < ${pivot}, swap with low=${low}, increment low and mid`,
      });
      low++;
      mid++;
    } else if (array[mid] > pivot) {
      // Swap with high, decrement high only
      [array[mid], array[high]] = [array[high], array[mid]];
      steps.push({
        low,
        mid,
        high,
        array: [...array],
        action: 'greater-than',
        description: `arr[${mid}]=${array[mid]} > ${pivot}, swap with high=${high}, decrement high`,
      });
      high--;
    } else {
      // Equal to pivot, just increment mid
      steps.push({
        low,
        mid,
        high,
        array: [...array],
        action: 'equal',
        description: `arr[${mid}]=${array[mid]} == ${pivot}, keep in place, increment mid`,
      });
      mid++;
    }
  }

  return steps;
}

const STEPS = buildSteps(INITIAL_ARRAY, PIVOT);
const TOTAL_STEPS = STEPS.length;

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const COLORS = {
  low: '#ef4444', // red (less than)
  mid: '#3b82f6', // blue (scanner)
  high: '#f97316', // orange (greater than)
  lessThan: '#ef4444', // red
  equal: '#eab308', // yellow
  greaterThan: '#f97316', // orange
  swapped: '#22c55e', // green
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DutchNationalFlagViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep: DutchFlagStep | null = step > 0 ? STEPS[step - 1] : null;
  const array = currentStep?.array || [...INITIAL_ARRAY];

  // Determine partition boundaries
  const lessThanBoundary = currentStep?.low || 0;
  const equalBoundary = currentStep?.mid || 0;
  const greaterThanBoundary = currentStep?.high !== undefined ? currentStep.high + 1 : array.length;

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      <style>{`
        @keyframes dutchFlagPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes swapHighlight {
          0%, 100% { background: var(--swap-bg); }
          50% { background: ${COLORS.swapped}44; }
        }
      `}</style>

      {/* Title */}
      <div className="text-center space-y-1">
        <h3
          className="text-lg font-bold"
          style={{
            background: `linear-gradient(135deg, ${COLORS.lessThan}, ${COLORS.equal}, ${COLORS.greaterThan})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Dutch National Flag
        </h3>
        <p className="text-sm text-zinc-400">Three-way partition: &lt; {PIVOT} | = {PIVOT} | &gt; {PIVOT}</p>
      </div>

      {/* Partition visualization */}
      {currentStep && (
        <div className="flex justify-center gap-1 mb-2">
          {lessThanBoundary > 0 && (
            <div
              className="h-2 rounded-l-lg"
              style={{
                width: `${(lessThanBoundary / array.length) * 100}%`,
                background: COLORS.lessThan,
              }}
            />
          )}
          {equalBoundary > lessThanBoundary && (
            <div
              className="h-2"
              style={{
                width: `${((equalBoundary - lessThanBoundary) / array.length) * 100}%`,
                background: COLORS.equal,
              }}
            />
          )}
          {greaterThanBoundary < array.length && (
            <div
              className="h-2 rounded-r-lg"
              style={{
                width: `${((array.length - greaterThanBoundary) / array.length) * 100}%`,
                background: COLORS.greaterThan,
              }}
            />
          )}
        </div>
      )}

      {/* Array visualization */}
      <div className="flex justify-center gap-2 flex-wrap">
        {array.map((value, idx) => {
          const isLow = currentStep?.low === idx;
          const isMid = currentStep?.mid === idx;
          const isHigh = currentStep?.high === idx;
          const wasSwapped =
            currentStep?.action === 'less-than' &&
            (idx === currentStep.low || idx === currentStep.mid);
          const wasSwappedHigh =
            currentStep?.action === 'greater-than' &&
            (idx === currentStep.mid || idx === currentStep.high);

          let borderColor = '#52525b'; // zinc-600
          let bgColor = '#27272a'; // zinc-800
          let textColor = '#a1a1aa'; // zinc-400

          if (wasSwapped || wasSwappedHigh) {
            borderColor = COLORS.swapped;
            bgColor = `${COLORS.swapped}22`;
            textColor = COLORS.swapped;
          } else if (value < PIVOT) {
            borderColor = COLORS.lessThan;
            bgColor = `${COLORS.lessThan}22`;
            textColor = COLORS.lessThan;
          } else if (value === PIVOT) {
            borderColor = COLORS.equal;
            bgColor = `${COLORS.equal}22`;
            textColor = COLORS.equal;
          } else {
            borderColor = COLORS.greaterThan;
            bgColor = `${COLORS.greaterThan}22`;
            textColor = COLORS.greaterThan;
          }

          // Override for pointer highlighting
          if (isLow) {
            borderColor = COLORS.low;
            bgColor = `${COLORS.low}22`;
            textColor = COLORS.low;
          } else if (isMid) {
            borderColor = COLORS.mid;
            bgColor = `${COLORS.mid}22`;
            textColor = COLORS.mid;
          } else if (isHigh) {
            borderColor = COLORS.high;
            bgColor = `${COLORS.high}22`;
            textColor = COLORS.high;
          }

          const boxShadow =
            isLow || isMid || isHigh || wasSwapped || wasSwappedHigh
              ? `0 0 12px ${borderColor}80, 0 0 24px ${borderColor}40`
              : 'none';

          return (
            <div key={idx} className="flex flex-col items-center gap-1" style={{ minWidth: 56 }}>
              {/* Cell */}
              <div
                className="flex items-center justify-center rounded-lg transition-all duration-300 font-mono text-sm font-bold"
                style={{
                  width: 56,
                  height: 56,
                  background: bgColor,
                  border: `2px solid ${borderColor}`,
                  boxShadow,
                  color: textColor,
                  animation:
                    wasSwapped || wasSwappedHigh
                      ? 'swapHighlight 0.6s ease-in-out'
                      : isLow || isMid || isHigh
                        ? 'dutchFlagPulse 1.2s ease-in-out infinite'
                        : undefined,
                  '--swap-bg': bgColor,
                }}
              >
                {value}
              </div>

              {/* Index label */}
              <span className="text-xs text-zinc-500 font-mono">{idx}</span>

              {/* Pointer labels */}
              <div className="h-5 flex items-center justify-center gap-1">
                {isLow && (
                  <span
                    className="text-xs font-bold tracking-wider"
                    style={{ color: COLORS.low }}
                  >
                    L
                  </span>
                )}
                {isMid && (
                  <span
                    className="text-xs font-bold tracking-wider"
                    style={{ color: COLORS.mid }}
                  >
                    M
                  </span>
                )}
                {isHigh && (
                  <span
                    className="text-xs font-bold tracking-wider"
                    style={{ color: COLORS.high }}
                  >
                    H
                  </span>
                )}
                {(wasSwapped || wasSwappedHigh) && (
                  <span
                    className="text-xs font-bold tracking-wider"
                    style={{ color: COLORS.swapped }}
                  >
                    SWAP
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 flex-wrap text-xs">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.low }}
          />
          <span className="text-zinc-400">Low</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.mid }}
          />
          <span className="text-zinc-400">Mid</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.high }}
          />
          <span className="text-zinc-400">High</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.swapped }}
          />
          <span className="text-zinc-400">Swapped</span>
        </div>
      </div>

      {/* Status panel */}
      <div className="rounded-xl bg-zinc-800 border border-zinc-700 p-4 space-y-3 text-sm font-mono">
        {currentStep ? (
          <>
            <div className="flex items-start gap-2">
              <span className="text-zinc-500 shrink-0">Action:</span>
              <span className="text-zinc-200">{currentStep.description}</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 shrink-0">Low:</span>
                <span className="text-zinc-300">{currentStep.low}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 shrink-0">Mid:</span>
                <span className="text-zinc-300">{currentStep.mid}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 shrink-0">High:</span>
                <span className="text-zinc-300">{currentStep.high}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 shrink-0">Array:</span>
              <span className="text-zinc-300">[{array.join(', ')}]</span>
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
      <VizControls controls={controls} accentColor={COLORS.mid} />
    </div>
  );
}
