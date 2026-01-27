'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Pre-computed binary search steps                                  */
/* ------------------------------------------------------------------ */

const DATA = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91] as const;
const TARGET = 23;

interface BSearchState {
  left: number;
  right: number;
  mid: number;
  midValue: number;
  found: boolean;
  comparison: string;
  /** Indices that have been permanently eliminated from the search window. */
  eliminated: Set<number>;
}

/**
 * Walk through binary search on DATA looking for TARGET and record every
 * intermediate state so the visualisation can index directly into the array.
 */
function computeSteps(): BSearchState[] {
  const steps: BSearchState[] = [];
  let left = 0;
  let right = DATA.length - 1;
  const eliminated = new Set<number>();

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = DATA[mid];

    if (midValue === TARGET) {
      steps.push({
        left,
        right,
        mid,
        midValue,
        found: true,
        comparison: `arr[${mid}] = ${midValue} === ${TARGET}  --  Found!`,
        eliminated: new Set(eliminated),
      });
      break;
    }

    if (midValue < TARGET) {
      steps.push({
        left,
        right,
        mid,
        midValue,
        found: false,
        comparison: `arr[${mid}] = ${midValue} < ${TARGET}  \u2192  search right half`,
        eliminated: new Set(eliminated),
      });
      // eliminate left..mid
      for (let i = left; i <= mid; i++) eliminated.add(i);
      left = mid + 1;
    } else {
      steps.push({
        left,
        right,
        mid,
        midValue,
        found: false,
        comparison: `arr[${mid}] = ${midValue} > ${TARGET}  \u2192  search left half`,
        eliminated: new Set(eliminated),
      });
      // eliminate mid..right
      for (let i = mid; i <= right; i++) eliminated.add(i);
      right = mid - 1;
    }
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length; // advancing from step 0 -> last index

/* ------------------------------------------------------------------ */
/*  Colours                                                            */
/* ------------------------------------------------------------------ */

const COLORS = {
  left: '#3b82f6',
  right: '#f97316',
  mid: '#eab308',
  found: '#22c55e',
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function BinarySearchViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  // Current snapshot -- step acts as 1-based advancement counter from the hook,
  // but we use it as a direct index. step=0 means "nothing yet", step=1 means
  // we should show STEPS[0], etc.
  const current: BSearchState | null = step === 0 ? null : (STEPS[step - 1] ?? null);

  // All previously eliminated indices (cumulative from prior steps).
  const eliminatedSet = useMemo<Set<number>>(() => {
    if (!current) return new Set();
    return current.eliminated;
  }, [current]);

  return (
    <div className="w-full max-w-2xl mx-auto select-none">
      {/* ---- Header ---- */}
      <div className="text-center mb-5">
        <h2
          className="text-xl font-bold mb-1"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Binary Search
        </h2>
        <p className="text-zinc-400 text-sm">
          Target: <span className="text-white font-semibold">{TARGET}</span>
        </p>
      </div>

      {/* ---- Array visualisation ---- */}
      <div className="bg-zinc-800/80 rounded-xl p-5 border border-zinc-700/60">
        {/* Cells */}
        <div className="flex justify-center gap-1.5 flex-wrap">
          {DATA.map((value, idx) => {
            const isLeft = current !== null && idx === current.left;
            const isRight = current !== null && idx === current.right;
            const isMid = current !== null && idx === current.mid;
            const isFound = current?.found && isMid;
            const isEliminated =
              current !== null && !isMid && !isLeft && !isRight && eliminatedSet.has(idx);

            // Determine border / shadow
            let borderColor = 'rgba(63,63,70,0.6)'; // zinc-700
            let boxShadow = 'none';
            if (isFound) {
              borderColor = COLORS.found;
              boxShadow = `0 0 14px ${COLORS.found}88, 0 0 30px ${COLORS.found}44`;
            } else if (isMid) {
              borderColor = COLORS.mid;
              boxShadow = `0 0 10px ${COLORS.mid}66`;
            } else if (isLeft) {
              borderColor = COLORS.left;
            } else if (isRight) {
              borderColor = COLORS.right;
            }

            // Background
            let bg = 'rgba(39,39,42,0.8)'; // zinc-800ish
            if (isFound) {
              bg = `${COLORS.found}22`;
            } else if (isMid) {
              bg = `${COLORS.mid}18`;
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                {/* Cell */}
                <div
                  className="relative flex items-center justify-center rounded-lg font-mono text-sm font-bold"
                  style={{
                    width: 56,
                    height: 56,
                    border: `2px solid ${borderColor}`,
                    background: bg,
                    boxShadow,
                    color: isFound
                      ? COLORS.found
                      : isEliminated
                        ? 'rgba(161,161,170,0.3)'
                        : isMid
                          ? COLORS.mid
                          : '#e4e4e7',
                    opacity: isEliminated ? 0.35 : 1,
                    transition: 'all 0.4s cubic-bezier(.4,0,.2,1)',
                    animation:
                      isMid && !isFound
                        ? 'bsv-pulse 1.2s ease-in-out infinite'
                        : isFound
                          ? 'bsv-glow 0.8s ease-in-out infinite alternate'
                          : 'none',
                  }}
                >
                  {value}
                </div>

                {/* Index label */}
                <span
                  className="text-[10px] font-mono"
                  style={{
                    color: isEliminated ? 'rgba(161,161,170,0.25)' : 'rgba(161,161,170,0.55)',
                    transition: 'color 0.4s',
                  }}
                >
                  [{idx}]
                </span>

                {/* Pointer badges */}
                <div className="flex gap-0.5 h-5">
                  {current !== null && (
                    <>
                      {isFound && <Badge color={COLORS.found} label="FOUND" />}
                      {!isFound && isMid && <Badge color={COLORS.mid} label="mid" />}
                      {!isFound && isLeft && !isMid && <Badge color={COLORS.left} label="L" />}
                      {!isFound && isRight && !isMid && <Badge color={COLORS.right} label="R" />}
                      {/* When left===mid or right===mid show both */}
                      {!isFound && isMid && isLeft && <Badge color={COLORS.left} label="L" />}
                      {!isFound && isMid && isRight && <Badge color={COLORS.right} label="R" />}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ---- Legend ---- */}
        <div className="flex justify-center gap-4 mt-5 flex-wrap">
          <LegendItem color={COLORS.left} label="left" />
          <LegendItem color={COLORS.mid} label="mid" />
          <LegendItem color={COLORS.right} label="right" />
          <LegendItem color={COLORS.found} label="found" />
        </div>
      </div>

      {/* ---- Comparison panel ---- */}
      <div
        className="mt-3 rounded-xl border border-zinc-700/60 bg-zinc-800/80 px-5 py-4 text-center"
        style={{ minHeight: 64, transition: 'all 0.3s' }}
      >
        {current === null ? (
          <p className="text-zinc-500 text-sm italic">
            Press <span className="font-semibold text-zinc-400">Play</span> or{' '}
            <span className="font-semibold text-zinc-400">Step</span> to begin
          </p>
        ) : (
          <>
            <p className="text-xs text-zinc-500 mb-1 uppercase tracking-wider font-semibold">
              Step {step} of {TOTAL_STEPS}
            </p>
            <p
              className="font-mono text-sm font-semibold"
              style={{
                color: current.found ? COLORS.found : '#e4e4e7',
                transition: 'color 0.3s',
              }}
            >
              {current.comparison}
            </p>
            {!current.found && (
              <p className="text-zinc-500 text-xs mt-1">
                Window: [{current.left} .. {current.right}] | mid = {current.mid}
              </p>
            )}
          </>
        )}
      </div>

      {/* ---- Controls ---- */}
      <VizControls controls={controls} accentColor="#3b82f6" />

      {/* ---- Inline keyframes ---- */}
      <style>{`
        @keyframes bsv-pulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.08); }
        }
        @keyframes bsv-glow {
          from { box-shadow: 0 0 10px ${COLORS.found}66, 0 0 24px ${COLORS.found}33; }
          to   { box-shadow: 0 0 18px ${COLORS.found}aa, 0 0 40px ${COLORS.found}55; }
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small helper sub-components                                        */
/* ------------------------------------------------------------------ */

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
