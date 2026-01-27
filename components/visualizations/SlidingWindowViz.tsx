'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Algorithm data
// ---------------------------------------------------------------------------
const DATA = [2, 1, 5, 1, 3, 2, 8, 1] as const;
const K = 3;
const TOTAL_STEPS = DATA.length - K + 1; // 6 window positions (steps 1..6)

interface WindowState {
  /** Left index of the window (inclusive) */
  left: number;
  /** Right index of the window (inclusive) */
  right: number;
  /** Sum of elements in the current window */
  sum: number;
  /** Best (maximum) sum found so far up to this step */
  bestSum: number;
  /** Whether this step discovered a new best */
  isNewBest: boolean;
}

// ---------------------------------------------------------------------------
// Pre-compute every window position
// ---------------------------------------------------------------------------
function precompute(): WindowState[] {
  const states: WindowState[] = [];
  let bestSum = -Infinity;

  for (let i = 0; i <= DATA.length - K; i++) {
    let sum = 0;
    for (let j = i; j < i + K; j++) {
      sum += DATA[j];
    }
    const isNewBest = sum > bestSum;
    if (isNewBest) bestSum = sum;
    states.push({ left: i, right: i + K - 1, sum, bestSum, isNewBest });
  }

  return states;
}

// ---------------------------------------------------------------------------
// Accent colours
// ---------------------------------------------------------------------------
const ACCENT = '#f59e0b'; // amber-500
const ACCENT_BG = 'rgba(245, 158, 11, 0.15)';
const GREEN = '#22c55e';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function SlidingWindowViz() {
  const windowStates = useMemo(() => precompute(), []);
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  // step 0 = initial state (no window selected yet), steps 1..6 = window positions
  const activeIndex = step > 0 ? step - 1 : null;
  const current: WindowState | null = activeIndex !== null ? windowStates[activeIndex] : null;

  // -----------------------------------------------------------------------
  // Flash effect when a new best is discovered (derived from step, no effect needed)
  // -----------------------------------------------------------------------
  const flash = current?.isNewBest ?? false;

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl bg-zinc-900 p-6 shadow-lg select-none">
      {/* Title */}
      <div className="text-center">
        <h3
          className="text-lg font-bold tracking-tight"
          style={{
            background: `linear-gradient(135deg, ${ACCENT}, #fbbf24)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Sliding Window
        </h3>
        <p className="mt-1 text-xs text-zinc-500">Maximum sum of k={K} consecutive elements</p>
      </div>

      {/* Array visualisation */}
      <div className="relative flex items-end gap-0">
        {/* Window frame overlay */}
        {current && (
          <div
            className="absolute top-0 bottom-0 rounded-lg pointer-events-none"
            style={{
              left: `${current.left * 56}px`,
              width: `${K * 56}px`,
              border: `2px solid ${ACCENT}`,
              background: ACCENT_BG,
              boxShadow: `0 0 16px ${ACCENT}44`,
              transition: 'left 0.35s cubic-bezier(0.4,0,0.2,1)',
              zIndex: 10,
            }}
          />
        )}

        {DATA.map((value, idx) => {
          const insideWindow = current !== null && idx >= current.left && idx <= current.right;

          return (
            <div
              key={idx}
              className="flex flex-col items-center"
              style={{ width: 56, position: 'relative', zIndex: 20 }}
            >
              {/* Cell */}
              <div
                className="flex items-center justify-center rounded-md text-sm font-bold transition-colors duration-300"
                style={{
                  width: 48,
                  height: 48,
                  margin: '0 auto',
                  background: insideWindow ? 'rgba(245, 158, 11, 0.22)' : '#27272a', // zinc-800
                  color: insideWindow ? '#fbbf24' : '#a1a1aa', // amber-300 / zinc-400
                  border: insideWindow ? `1.5px solid ${ACCENT}` : '1.5px solid #3f3f46', // zinc-700
                }}
              >
                {value}
              </div>

              {/* Index label */}
              <span className="mt-1 text-[10px] text-zinc-600">{idx}</span>
            </div>
          );
        })}
      </div>

      {/* Stats panel */}
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        {/* Window range */}
        <div className="flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2">
          <span className="text-zinc-500">Window:</span>
          <span className="font-mono font-semibold text-zinc-300">
            {current ? `[${current.left}..${current.right}]` : '--'}
          </span>
        </div>

        {/* Current window sum */}
        <div className="flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2">
          <span className="text-zinc-500">Window Sum:</span>
          <span
            className="font-mono font-semibold transition-colors duration-300"
            style={{ color: ACCENT }}
          >
            {current ? current.sum : '--'}
          </span>
        </div>

        {/* Best sum */}
        <div className="flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2">
          <span className="text-zinc-500">Best Sum:</span>
          <span
            className="font-mono font-semibold transition-colors duration-300"
            style={{
              color: flash ? GREEN : current ? '#e4e4e7' : '#71717a', // zinc-200 / zinc-500
              textShadow: flash ? `0 0 8px ${GREEN}88` : 'none',
            }}
          >
            {current ? current.bestSum : '--'}
          </span>
        </div>
      </div>

      {/* Step indicator */}
      <p className="text-xs text-zinc-600">
        Step {step} / {TOTAL_STEPS}
      </p>

      {/* Shared playback controls */}
      <VizControls controls={controls} accentColor={ACCENT} />
    </div>
  );
}
