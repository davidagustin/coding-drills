'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MoveZeroesStep {
  readPointer: number;
  writePointer: number;
  array: number[];
  action: 'read-zero' | 'read-nonzero' | 'swap';
  description: string;
}

// ---------------------------------------------------------------------------
// Pre-computed data
// ---------------------------------------------------------------------------

const INPUT = [0, 1, 0, 3, 12];

/** Pre-compute every step of the move zeroes algorithm. */
function buildSteps(nums: number[]): MoveZeroesStep[] {
  const steps: MoveZeroesStep[] = [];
  const array = [...nums];
  let writePointer = 0;

  steps.push({
    readPointer: 0,
    writePointer: 0,
    array: [...array],
    action: 'read-zero',
    description: 'Start: both pointers at index 0',
  });

  for (let readPointer = 0; readPointer < array.length; readPointer++) {
    if (array[readPointer] !== 0) {
      if (readPointer !== writePointer) {
        // Swap
        [array[writePointer], array[readPointer]] = [array[readPointer], array[writePointer]];
        steps.push({
          readPointer,
          writePointer,
          array: [...array],
          action: 'swap',
          description: `Swap arr[${readPointer}]=${array[writePointer]} with arr[${writePointer}]=${array[readPointer]}`,
        });
      } else {
        steps.push({
          readPointer,
          writePointer,
          array: [...array],
          action: 'read-nonzero',
          description: `arr[${readPointer}]=${array[readPointer]} is non-zero, no swap needed`,
        });
      }
      writePointer++;
    } else {
      steps.push({
        readPointer,
        writePointer,
        array: [...array],
        action: 'read-zero',
        description: `arr[${readPointer}]=0, skip (don't move write pointer)`,
      });
    }
  }

  return steps;
}

const STEPS = buildSteps(INPUT);
const TOTAL_STEPS = STEPS.length;

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const COLORS = {
  read: '#3b82f6', // blue
  write: '#f97316', // orange
  zero: '#ef4444', // red
  nonzero: '#22c55e', // green
  swapped: '#eab308', // yellow
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
}: {
  value: number;
  index: number;
  status: 'idle' | 'read' | 'write' | 'swapped' | 'zero' | 'nonzero';
  pointerLabel: 'R' | 'W' | 'RW' | null;
}) {
  const bgColor =
    status === 'swapped'
      ? COLORS.swapped
      : status === 'read'
        ? COLORS.read
        : status === 'write'
          ? COLORS.write
          : status === 'zero'
            ? COLORS.zero
            : status === 'nonzero'
              ? COLORS.nonzero
              : COLORS.idle;

  const borderColor = status !== 'idle' ? bgColor : COLORS.border;
  const boxShadow = status !== 'idle' ? `0 0 12px ${bgColor}80, 0 0 24px ${bgColor}40` : 'none';

  return (
    <div className="flex flex-col items-center gap-1" style={{ minWidth: 64 }}>
      <div
        className="flex items-center justify-center rounded-lg transition-all duration-300"
        style={{
          width: 64,
          height: 64,
          background: bgColor,
          border: `2px solid ${borderColor}`,
          boxShadow,
        }}
      >
        <span className="text-xl font-bold text-white select-none">{value}</span>
      </div>
      <span className="text-xs text-zinc-500 font-mono">{index}</span>
      {pointerLabel && (
        <div className="h-5 flex items-center justify-center">
          <span
            className="text-xs font-bold tracking-wider"
            style={{
              color:
                pointerLabel === 'R'
                  ? COLORS.read
                  : pointerLabel === 'W'
                    ? COLORS.write
                    : COLORS.read,
            }}
          >
            {pointerLabel === 'RW' ? (
              <>
                <span style={{ color: COLORS.read }}>R</span>
                <span style={{ color: COLORS.write }}>W</span>
              </>
            ) : (
              pointerLabel
            )}
          </span>
        </div>
      )}
    </div>
  );
}

export default function MoveZeroesViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep: MoveZeroesStep | null = step > 0 ? STEPS[step - 1] : null;
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
      let status: 'idle' | 'read' | 'write' | 'swapped' | 'zero' | 'nonzero' = 'idle';
      let pointerLabel: 'R' | 'W' | 'RW' | null = null;

      const isRead = index === currentStep.readPointer;
      const isWrite = index === currentStep.writePointer;

      if (isRead && isWrite) {
        pointerLabel = 'RW';
        status = currentStep.action === 'swap' ? 'swapped' : value === 0 ? 'zero' : 'nonzero';
      } else if (isRead) {
        pointerLabel = 'R';
        status = 'read';
      } else if (isWrite) {
        pointerLabel = 'W';
        status = 'write';
      } else {
        status = value === 0 ? 'zero' : 'nonzero';
      }

      // Highlight swapped elements
      if (currentStep.action === 'swap' && (isRead || isWrite)) {
        status = 'swapped';
      }

      return { value, index, status, pointerLabel };
    });
  }, [currentStep]);

  const description = currentStep?.description || 'Press Play or Step to move zeros to the end';

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
            background: `linear-gradient(135deg, ${COLORS.read}, ${COLORS.write})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Move Zeroes
        </h3>
        <p className="text-sm text-zinc-400">Move all zeros to the end while preserving order</p>
      </div>

      <div className="text-center">
        <span className="text-xs text-zinc-500 font-mono">
          Input: [{INPUT.join(', ')}]
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
          />
        ))}
      </div>

      <div className="flex justify-center gap-6 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.read }} />
          <span className="text-zinc-400">Read (R)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.write }} />
          <span className="text-zinc-400">Write (W)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.swapped }} />
          <span className="text-zinc-400">Swapped</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.zero }} />
          <span className="text-zinc-400">Zero</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.nonzero }} />
          <span className="text-zinc-400">Non-zero</span>
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
              <span className="text-zinc-500 shrink-0">Read Pointer:</span>
              <span className="text-zinc-300">{currentStep.readPointer}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-zinc-500 shrink-0">Write Pointer:</span>
              <span className="text-zinc-300">{currentStep.writePointer}</span>
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
            background: `linear-gradient(135deg, ${COLORS.nonzero}, #16a34a)`,
            animation: 'fadeInUp 0.4s ease-out',
          }}
        >
          Result: [{currentStep.array.join(', ')}] - All zeros moved to the end!
        </div>
      )}

      <VizControls controls={controls} accentColor={COLORS.read} />
    </div>
  );
}
