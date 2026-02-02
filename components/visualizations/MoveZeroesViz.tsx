'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Algorithm data
// ---------------------------------------------------------------------------
const DATA = [0, 1, 0, 3, 12] as const;

interface MoveZeroesStep {
  readPointer: number;
  writePointer: number;
  array: number[];
  action: string;
  swapped: boolean;
}

// ---------------------------------------------------------------------------
// Pre-compute steps
// ---------------------------------------------------------------------------
function precomputeSteps(): MoveZeroesStep[] {
  const steps: MoveZeroesStep[] = [];
  const arr = [...DATA];
  let write = 0;

  // Initial state
  steps.push({
    readPointer: 0,
    writePointer: write,
    array: [...arr],
    action: 'Initialize: write pointer at 0',
    swapped: false,
  });

  for (let read = 0; read < arr.length; read++) {
    if (arr[read] !== 0) {
      // Swap if read and write are different
      if (read !== write) {
        [arr[write], arr[read]] = [arr[read], arr[write]];
        steps.push({
          readPointer: read,
          writePointer: write,
          array: [...arr],
          action: `Found non-zero ${arr[write]} at index ${read}, swap with write position ${write}`,
          swapped: true,
        });
      } else {
        steps.push({
          readPointer: read,
          writePointer: write,
          array: [...arr],
          action: `Found non-zero ${arr[read]} at index ${read}, already at write position`,
          swapped: false,
        });
      }
      write++;
    } else {
      steps.push({
        readPointer: read,
        writePointer: write,
        array: [...arr],
        action: `Found zero at index ${read}, skip (only advance read pointer)`,
        swapped: false,
      });
    }
  }

  // Final state
  steps.push({
    readPointer: arr.length,
    writePointer: write,
    array: [...arr],
    action: 'Complete: All zeros moved to end',
    swapped: false,
  });

  return steps;
}

const STEPS = precomputeSteps();
const TOTAL_STEPS = STEPS.length;

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------
const ACCENT_READ = '#3b82f6'; // blue
const ACCENT_WRITE = '#22c55e'; // green
const ZERO_COLOR = '#ef4444'; // red
const NON_ZERO_COLOR = '#f59e0b'; // amber

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function MoveZeroesViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  const isComplete = step >= TOTAL_STEPS - 1;

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      {/* Title */}
      <div className="text-center space-y-1">
        <h3
          className="text-lg font-bold"
          style={{
            background: `linear-gradient(135deg, ${ACCENT_READ}, ${ACCENT_WRITE})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Move Zeroes
        </h3>
        <p className="text-sm text-zinc-400">Two-Pointer In-Place Partition</p>
      </div>

      {/* Array visualization */}
      <div className="flex justify-center gap-2 flex-wrap">
        {currentStep.array.map((value, idx) => {
          const isRead = idx === currentStep.readPointer && !isComplete;
          const isWrite = idx === currentStep.writePointer && !isComplete;
          const isZero = value === 0;
          const isSwapped =
            currentStep.swapped &&
            (idx === currentStep.readPointer || idx === currentStep.writePointer);

          const bgColor = isZero
            ? isRead
              ? '#7f1d1d' // dark red
              : '#3f1f1f' // darker red
            : isRead || isWrite
              ? '#1e3a1e' // dark green
              : '#3f3f46'; // zinc-700

          const borderColor = isRead
            ? ACCENT_READ
            : isWrite
              ? ACCENT_WRITE
              : isZero
                ? ZERO_COLOR
                : NON_ZERO_COLOR;

          const boxShadow =
            isRead || isWrite
              ? `0 0 12px ${borderColor}80, 0 0 24px ${borderColor}40`
              : 'none';

          return (
            <div key={idx} className="flex flex-col items-center gap-1" style={{ minWidth: 56 }}>
              {/* Cell */}
              <div
                className="flex items-center justify-center rounded-lg transition-all duration-300"
                style={{
                  width: 56,
                  height: 56,
                  background: bgColor,
                  border: `2px solid ${borderColor}`,
                  boxShadow,
                  animation:
                    isSwapped
                      ? 'swapPulse 0.5s ease-out'
                      : isRead || isWrite
                        ? 'pointerPulse 1.2s ease-in-out infinite'
                        : undefined,
                }}
              >
                <span
                  className="text-xl font-bold select-none"
                  style={{ color: isZero ? '#fca5a5' : '#fbbf24' }}
                >
                  {value}
                </span>
              </div>

              {/* Index label */}
              <span className="text-xs text-zinc-500 font-mono">{idx}</span>

              {/* Pointer labels */}
              <div className="h-5 flex items-center justify-center gap-1">
                {isRead && (
                  <span
                    className="text-xs font-bold tracking-wider"
                    style={{ color: ACCENT_READ }}
                  >
                    R
                  </span>
                )}
                {isWrite && (
                  <span
                    className="text-xs font-bold tracking-wider"
                    style={{ color: ACCENT_WRITE }}
                  >
                    W
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pointer legend */}
      <div className="flex justify-center gap-6 text-xs">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: ACCENT_READ }}
          />
          <span className="text-zinc-400">Read pointer (R)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: ACCENT_WRITE }}
          />
          <span className="text-zinc-400">Write pointer (W)</span>
        </div>
      </div>

      {/* Action panel */}
      <div className="rounded-xl bg-zinc-800 border border-zinc-700 p-4 space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <span className="text-zinc-500 shrink-0">Action:</span>
          <span className="text-zinc-200 font-mono">{currentStep.action}</span>
        </div>
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
            background: `linear-gradient(135deg, ${ACCENT_WRITE}, #16a34a)`,
            animation: 'fadeInUp 0.4s ease-out',
          }}
        >
          Complete! All zeros moved to end: [{currentStep.array.join(', ')}]
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes pointerPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes swapPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Controls */}
      <VizControls controls={controls} accentColor={ACCENT_READ} />
    </div>
  );
}
