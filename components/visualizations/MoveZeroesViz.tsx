'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Pre-computed data
// ---------------------------------------------------------------------------

const INPUT = [0, 1, 0, 3, 12] as const;

interface MoveZeroesStep {
  read: number;
  write: number;
  array: number[];
  action: string;
  swapped: boolean;
}

function computeSteps(): MoveZeroesStep[] {
  const steps: MoveZeroesStep[] = [];
  const arr = [...INPUT];
  let write = 0;

  steps.push({
    read: 0,
    write: 0,
    array: [...arr],
    action: 'Initialize: read pointer = 0, write pointer = 0',
    swapped: false,
  });

  for (let read = 0; read < arr.length; read++) {
    if (arr[read] !== 0) {
      // Swap
      [arr[write], arr[read]] = [arr[read], arr[write]];
      steps.push({
        read,
        write,
        array: [...arr],
        action: `arr[${read}] (${INPUT[read]}) !== 0 → swap with arr[${write}], increment write`,
        swapped: true,
      });
      write++;
    } else {
      steps.push({
        read,
        write,
        array: [...arr],
        action: `arr[${read}] (${INPUT[read]}) === 0 → skip, only increment read`,
        swapped: false,
      });
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
  read: '#3b82f6', // blue
  write: '#22c55e', // green
  zero: '#6b7280', // gray
  nonZero: '#eab308', // yellow
  swapped: '#ef4444', // red
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MoveZeroesViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const current: MoveZeroesStep | null = step === 0 ? null : (STEPS[step - 1] ?? null);
  const isComplete = step >= TOTAL_STEPS;

  return (
    <div className="w-full max-w-3xl mx-auto select-none">
      {/* Header */}
      <div className="text-center mb-6">
        <h2
          className="text-xl font-bold mb-1"
          style={{
            background: 'linear-gradient(135deg, #22c55e, #4ade80)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Move Zeroes
        </h2>
        <p className="text-zinc-400 text-sm">
          Input: <span className="text-white font-mono">[{INPUT.join(', ')}]</span>
        </p>
      </div>

      {/* Array visualization */}
      <div className="bg-zinc-800/80 rounded-xl p-6 border border-zinc-700/60 mb-4">
        <div className="flex justify-center gap-2 flex-wrap">
          {current?.array.map((value, idx) => {
            const isRead = idx === current.read;
            const isWrite = idx === current.write;
            const isZero = value === 0;
            const wasSwapped = current.swapped && (idx === current.read || idx === current.write);

            let borderColor = 'rgba(63,63,70,0.6)';
            let bg = 'rgba(39,39,42,0.8)';
            let textColor = '#e4e4e7';

            if (wasSwapped) {
              borderColor = COLORS.swapped;
              bg = `${COLORS.swapped}22`;
              textColor = COLORS.swapped;
            } else if (isZero) {
              borderColor = COLORS.zero;
              bg = `${COLORS.zero}22`;
              textColor = COLORS.zero;
            } else {
              borderColor = COLORS.nonZero;
              bg = `${COLORS.nonZero}22`;
              textColor = COLORS.nonZero;
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
                      isRead || isWrite
                        ? `0 0 12px ${isRead ? COLORS.read : COLORS.write}66, 0 0 24px ${isRead ? COLORS.read : COLORS.write}33`
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
                      {isRead && <Badge color={COLORS.read} label="read" />}
                      {isWrite && <Badge color={COLORS.write} label="write" />}
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
                Read: <span className="text-white font-semibold">{current.read}</span>
              </span>
              <span>
                Write: <span className="text-white font-semibold">{current.write}</span>
              </span>
            </div>
          </>
        )}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mb-4 flex-wrap">
        <LegendItem color={COLORS.read} label="read pointer" />
        <LegendItem color={COLORS.write} label="write pointer" />
        <LegendItem color={COLORS.zero} label="zero" />
        <LegendItem color={COLORS.nonZero} label="non-zero" />
        <LegendItem color={COLORS.swapped} label="swapped" />
      </div>

      {/* Controls */}
      <VizControls controls={controls} accentColor="#22c55e" />

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
