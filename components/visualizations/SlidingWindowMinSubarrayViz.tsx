'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Algorithm data
// ---------------------------------------------------------------------------
const DATA = [2, 1, 5, 1, 3, 2, 8, 1] as const;
const TARGET = 7;
const TOTAL_STEPS = DATA.length; // We'll slide through the array

interface WindowState {
  left: number;
  right: number;
  sum: number;
  minLength: number;
  action: string;
  found: boolean;
}

// ---------------------------------------------------------------------------
// Pre-compute every window position
// ---------------------------------------------------------------------------
function precompute(): WindowState[] {
  const states: WindowState[] = [];
  let minLength = Infinity;
  let left = 0;
  let sum = 0;

  // Initial state
  states.push({
    left: 0,
    right: -1,
    sum: 0,
    minLength: Infinity,
    action: 'Initialize: Start with empty window',
    found: false,
  });

  for (let right = 0; right < DATA.length; right++) {
    sum += DATA[right];

    // Shrink window while sum >= target
    while (sum >= TARGET && left <= right) {
      const currentLength = right - left + 1;
      if (currentLength < minLength) {
        minLength = currentLength;
        states.push({
          left,
          right,
          sum,
          minLength,
          action: `Window [${left}..${right}] sums to ${sum} >= ${TARGET}, length ${currentLength} (new min!)`,
          found: true,
        });
      } else {
        states.push({
          left,
          right,
          sum,
          minLength,
          action: `Window [${left}..${right}] sums to ${sum} >= ${TARGET}, length ${currentLength}`,
          found: false,
        });
      }
      sum -= DATA[left];
      left++;
    }

    // Window doesn't meet target yet
    if (sum < TARGET) {
      states.push({
        left,
        right,
        sum,
        minLength,
        action: `Window [${left}..${right}] sums to ${sum} < ${TARGET}, expand right`,
        found: false,
      });
    }
  }

  // Final state
  states.push({
    left: -1,
    right: -1,
    sum: 0,
    minLength: minLength === Infinity ? 0 : minLength,
    action: `Complete! Minimum subarray length: ${minLength === Infinity ? 0 : minLength}`,
    found: false,
  });

  return states;
}

// ---------------------------------------------------------------------------
// Accent colours
// ---------------------------------------------------------------------------
const ACCENT = '#f59e0b'; // amber-500
const ACCENT_BG = 'rgba(245, 158, 11, 0.15)';
const GREEN = '#22c55e';
const RED = '#ef4444';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function SlidingWindowMinSubarrayViz() {
  const windowStates = useMemo(() => precompute(), []);
  const controls = useVizAnimation(windowStates.length);
  const { step } = controls.state;

  const current: WindowState | null =
    step < windowStates.length ? windowStates[step] : windowStates[windowStates.length - 1];
  const isComplete = step >= windowStates.length - 1;

  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-lg select-none">
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
          Minimum Size Subarray Sum
        </h3>
        <p className="mt-1 text-xs text-zinc-500">
          Find minimum length subarray with sum &ge; {TARGET}
        </p>
      </div>

      {/* Array visualisation */}
      <div className="relative flex items-end gap-0">
        {/* Window frame overlay */}
        {current && current.left >= 0 && (
          <div
            className="absolute top-0 bottom-0 rounded-lg pointer-events-none"
            style={{
              left: `${current.left * 56}px`,
              width: `${(current.right - current.left + 1) * 56}px`,
              border: `2px solid ${current.found ? GREEN : ACCENT}`,
              background: current.found ? 'rgba(34, 197, 94, 0.15)' : ACCENT_BG,
              boxShadow: `0 0 16px ${current.found ? GREEN : ACCENT}44`,
              transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
              zIndex: 10,
            }}
          />
        )}

        {DATA.map((value, idx) => {
          const insideWindow =
            current !== null &&
            current.left >= 0 &&
            idx >= current.left &&
            idx <= current.right;

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
                  background: insideWindow
                    ? current?.found
                      ? 'rgba(34, 197, 94, 0.22)'
                      : 'rgba(245, 158, 11, 0.22)'
                    : '#27272a', // zinc-800
                  color: insideWindow
                    ? current?.found
                      ? '#4ade80'
                      : '#fbbf24'
                    : '#a1a1aa', // zinc-400
                  border: insideWindow
                    ? `1.5px solid ${current?.found ? GREEN : ACCENT}`
                    : '1.5px solid #3f3f46', // zinc-700
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
            {current && current.left >= 0
              ? `[${current.left}..${current.right}]`
              : '--'}
          </span>
        </div>

        {/* Current window sum */}
        <div className="flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2">
          <span className="text-zinc-500">Sum:</span>
          <span
            className="font-mono font-semibold"
            style={{
              color:
                current && current.sum >= TARGET
                  ? current.found
                    ? GREEN
                    : ACCENT
                  : '#a1a1aa',
            }}
          >
            {current ? current.sum : '--'}
          </span>
        </div>

        {/* Target */}
        <div className="flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2">
          <span className="text-zinc-500">Target:</span>
          <span className="font-mono font-semibold text-zinc-300">{TARGET}</span>
        </div>

        {/* Minimum length */}
        <div className="flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2">
          <span className="text-zinc-500">Min Length:</span>
          <span
            className="font-mono font-bold"
            style={{
              color:
                current && current.minLength !== Infinity ? GREEN : '#a1a1aa',
            }}
          >
            {current && current.minLength !== Infinity ? current.minLength : '--'}
          </span>
        </div>
      </div>

      {/* Action panel */}
      <div className="w-full rounded-xl bg-zinc-800 border border-zinc-700 p-4 text-sm">
        <div className="flex items-start gap-2">
          <span className="text-zinc-500 shrink-0">Action:</span>
          <span className="text-zinc-200 font-mono">{current?.action || '--'}</span>
        </div>
      </div>

      {/* Complete banner */}
      {isComplete && current && current.minLength !== Infinity && (
        <div
          className="text-center py-3 px-4 rounded-xl font-bold text-white text-sm w-full"
          style={{
            background: `linear-gradient(135deg, ${GREEN}, #16a34a)`,
            animation: 'fadeInUp 0.4s ease-out',
          }}
        >
          Minimum subarray length: {current.minLength}
        </div>
      )}

      {/* Controls */}
      <VizControls controls={controls} accentColor={ACCENT} />
    </div>
  );
}
