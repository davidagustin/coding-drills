'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MoveZeroesStep {
  read: number;
  write: number;
  array: number[];
  action: 'scan-zero' | 'swap-nonzero';
  description: string;
}

// ---------------------------------------------------------------------------
// Pre-computed data
// ---------------------------------------------------------------------------

const INITIAL_ARRAY = [0, 1, 0, 3, 12] as const;

/** Pre-compute every step of the move zeroes algorithm. */
function buildSteps(initial: readonly number[]): MoveZeroesStep[] {
  const steps: MoveZeroesStep[] = [];
  const array = [...initial];
  let write = 0;

  // Initial state
  steps.push({
    read: 0,
    write: 0,
    array: [...array],
    action: 'scan-zero',
    description: 'Initialize: read=0, write=0',
  });

  for (let read = 0; read < array.length; read++) {
    if (array[read] !== 0) {
      // Swap and increment write
      [array[write], array[read]] = [array[read], array[write]];
      steps.push({
        read,
        write,
        array: [...array],
        action: 'swap-nonzero',
        description: `Found non-zero ${array[write]} at index ${read}, swap with write position ${write}`,
      });
      write++;
    } else {
      steps.push({
        read,
        write,
        array: [...array],
        action: 'scan-zero',
        description: `Found zero at index ${read}, skip (write stays at ${write})`,
      });
    }
  }

  return steps;
}

const STEPS = buildSteps(INITIAL_ARRAY);
const TOTAL_STEPS = STEPS.length;

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const COLORS = {
  read: '#3b82f6', // blue
  write: '#f97316', // orange
  zero: '#71717a', // zinc-500
  nonzero: '#22c55e', // green
  swapped: '#eab308', // yellow
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MoveZeroesViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep: MoveZeroesStep | null = step > 0 ? STEPS[step - 1] : null;
  const array = currentStep?.array || [...INITIAL_ARRAY];

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      <style>{`
        @keyframes moveZeroesPulse {
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
            background: `linear-gradient(135deg, ${COLORS.read}, ${COLORS.write})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Move Zeroes
        </h3>
        <p className="text-sm text-zinc-400">Move all zeros to the end while preserving order</p>
      </div>

      {/* Array visualization */}
      <div className="flex justify-center gap-2 flex-wrap">
        {array.map((value, idx) => {
          const isRead = currentStep?.read === idx;
          const isWrite = currentStep?.write === idx;
          const isZero = value === 0;
          const wasSwapped =
            currentStep?.action === 'swap-nonzero' &&
            (idx === currentStep.read || idx === currentStep.write);

          let borderColor = '#52525b'; // zinc-600
          let bgColor = '#27272a'; // zinc-800
          let textColor = '#a1a1aa'; // zinc-400

          if (wasSwapped) {
            borderColor = COLORS.swapped;
            bgColor = `${COLORS.swapped}22`;
            textColor = COLORS.swapped;
          } else if (isRead && isWrite) {
            borderColor = COLORS.read;
            bgColor = `${COLORS.read}22`;
            textColor = COLORS.read;
          } else if (isRead) {
            borderColor = COLORS.read;
            bgColor = `${COLORS.read}22`;
            textColor = COLORS.read;
          } else if (isWrite) {
            borderColor = COLORS.write;
            bgColor = `${COLORS.write}22`;
            textColor = COLORS.write;
          } else if (isZero) {
            borderColor = COLORS.zero;
            bgColor = `${COLORS.zero}22`;
            textColor = COLORS.zero;
          } else {
            borderColor = COLORS.nonzero;
            bgColor = `${COLORS.nonzero}22`;
            textColor = COLORS.nonzero;
          }

          const boxShadow =
            isRead || isWrite || wasSwapped
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
                    wasSwapped
                      ? 'swapHighlight 0.6s ease-in-out'
                      : isRead || isWrite
                        ? 'moveZeroesPulse 1.2s ease-in-out infinite'
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
                {isRead && (
                  <span
                    className="text-xs font-bold tracking-wider"
                    style={{ color: COLORS.read }}
                  >
                    R
                  </span>
                )}
                {isWrite && (
                  <span
                    className="text-xs font-bold tracking-wider"
                    style={{ color: COLORS.write }}
                  >
                    W
                  </span>
                )}
                {wasSwapped && (
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
            style={{ background: COLORS.read }}
          />
          <span className="text-zinc-400">Read Pointer</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.write }}
          />
          <span className="text-zinc-400">Write Pointer</span>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 shrink-0">Read:</span>
                <span className="text-zinc-300">{currentStep.read}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 shrink-0">Write:</span>
                <span className="text-zinc-300">{currentStep.write}</span>
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
      <VizControls controls={controls} accentColor={COLORS.read} />
    </div>
  );
}
