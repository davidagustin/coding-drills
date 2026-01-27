'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Pre-computed merge in-place steps                                 */
/* ------------------------------------------------------------------ */

const ARR1_INITIAL = [1, 2, 3, 0, 0, 0] as const;
const M = 3; // valid elements in arr1
const ARR2 = [2, 5, 6] as const;
const N = ARR2.length;

interface MergeInPlaceStep {
  arr1: number[];
  p1: number;
  p2: number;
  write: number;
  action: string;
  comparing: boolean;
}

function computeSteps(): MergeInPlaceStep[] {
  const steps: MergeInPlaceStep[] = [];
  const arr1: number[] = [...ARR1_INITIAL];
  let p1 = M - 1;
  let p2 = N - 1;
  let write = M + N - 1;

  steps.push({
    arr1: [...arr1],
    p1,
    p2,
    write,
    action: `Initialize: p1=${p1} (end of arr1), p2=${p2} (end of arr2), write=${write}`,
    comparing: false,
  });

  while (p1 >= 0 && p2 >= 0) {
    const val1 = arr1[p1];
    const val2 = ARR2[p2];

    steps.push({
      arr1: [...arr1],
      p1,
      p2,
      write,
      action: `Compare arr1[${p1}]=${val1} vs arr2[${p2}]=${val2}`,
      comparing: true,
    });

    if (val1 > val2) {
      arr1[write] = val1;
      steps.push({
        arr1: [...arr1],
        p1: p1 - 1,
        p2,
        write: write - 1,
        action: `${val1} > ${val2} → write ${val1} at index ${write}, decrement p1 and write`,
        comparing: false,
      });
      p1--;
    } else {
      arr1[write] = val2;
      steps.push({
        arr1: [...arr1],
        p1,
        p2: p2 - 1,
        write: write - 1,
        action: `${val1} <= ${val2} → write ${val2} at index ${write}, decrement p2 and write`,
        comparing: false,
      });
      p2--;
    }
    write--;
  }

  // Copy remaining from arr2
  while (p2 >= 0) {
    arr1[write] = ARR2[p2];
    steps.push({
      arr1: [...arr1],
      p1,
      p2: p2 - 1,
      write: write - 1,
      action: `Copy remaining arr2[${p2}]=${ARR2[p2]} to index ${write}`,
      comparing: false,
    });
    p2--;
    write--;
  }

  steps.push({
    arr1: [...arr1],
    p1: -1,
    p2: -1,
    write: -1,
    action: `Complete! Merged array: [${arr1.join(', ')}]`,
    comparing: false,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const COLORS = {
  arr1: '#3b82f6',
  arr2: '#10b981',
  pointer: '#ef4444',
  write: '#f97316',
  comparing: '#eab308',
  written: '#22c55e',
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MergeInPlaceViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const current: MergeInPlaceStep | null = step === 0 ? null : (STEPS[step - 1] ?? null);
  const arr1 = current?.arr1 ?? ARR1_INITIAL;

  const arr1Display = useMemo(() => {
    return arr1.map((val, idx) => ({
      value: val,
      index: idx,
      isP1: current !== null && idx === current.p1,
      isWrite: current !== null && idx === current.write,
      isValid: idx < M,
      isWritten: current !== null && idx <= current.write && idx >= M,
    }));
  }, [arr1, current]);

  const arr2Display = useMemo(() => {
    return ARR2.map((val, idx) => ({
      value: val,
      index: idx,
      isP2: current !== null && idx === current.p2,
    }));
  }, [current]);

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white">Merge Two Sorted Arrays In-Place</h2>
        <p className="text-zinc-500 text-sm">Backward merge from end</p>
      </div>

      {/* Arrays visualization */}
      <div className="space-y-6">
        {/* Array 1 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 text-sm font-mono">arr1:</span>
            <span className="text-xs text-zinc-500">
              [{ARR1_INITIAL.slice(0, M).join(', ')}] + zeros
            </span>
          </div>
          <div className="flex gap-2 items-center">
            {arr1Display.map((item, idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center font-mono font-bold text-lg transition-all"
                  style={{
                    backgroundColor: item.isWrite
                      ? COLORS.write
                      : item.isP1
                        ? COLORS.pointer
                        : item.isWritten
                          ? COLORS.written
                          : item.isValid
                            ? COLORS.arr1
                            : '#52525b',
                    border:
                      item.isWrite || item.isP1
                        ? `3px solid ${item.isWrite ? COLORS.write : COLORS.pointer}`
                        : '2px solid transparent',
                    boxShadow:
                      item.isWrite || item.isP1
                        ? `0 0 12px ${item.isWrite ? COLORS.write : COLORS.pointer}`
                        : 'none',
                  }}
                >
                  <span className="text-white">{item.value}</span>
                </div>
                <span className="text-xs text-zinc-500 mt-1">{idx}</span>
                {item.isP1 && (
                  <span
                    className="absolute -top-6 text-xs font-bold"
                    style={{ color: COLORS.pointer }}
                  >
                    p1
                  </span>
                )}
                {item.isWrite && (
                  <span
                    className="absolute -bottom-6 text-xs font-bold"
                    style={{ color: COLORS.write }}
                  >
                    write
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Array 2 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 text-sm font-mono">arr2:</span>
            <span className="text-xs text-zinc-500">[2, 5, 6]</span>
          </div>
          <div className="flex gap-2 items-center">
            {arr2Display.map((item, idx) => (
              <div
                key={idx}
                className="relative flex flex-col items-center"
                style={{
                  opacity: current && idx > current.p2 ? 0.4 : 1,
                }}
              >
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center font-mono font-bold text-lg transition-all"
                  style={{
                    backgroundColor: item.isP2 ? COLORS.pointer : COLORS.arr2,
                    border: item.isP2 ? `3px solid ${COLORS.pointer}` : '2px solid transparent',
                    boxShadow: item.isP2 ? `0 0 12px ${COLORS.pointer}` : 'none',
                  }}
                >
                  <span className="text-white">{item.value}</span>
                </div>
                <span className="text-xs text-zinc-500 mt-1">{idx}</span>
                {item.isP2 && (
                  <span
                    className="absolute -top-6 text-xs font-bold"
                    style={{ color: COLORS.pointer }}
                  >
                    p2
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action description */}
      <div className="bg-zinc-800 rounded-lg p-4 text-center">
        <span className="text-zinc-300 text-sm font-mono">
          {current?.action || 'Press Play or Step to begin'}
        </span>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 text-xs flex-wrap">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.pointer }}
          />
          <span className="text-zinc-400">Pointer</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.write }} />
          <span className="text-zinc-400">Write Position</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.written }}
          />
          <span className="text-zinc-400">Written</span>
        </div>
      </div>

      {/* Controls */}
      <VizControls controls={controls} accentColor={COLORS.arr1} />
    </div>
  );
}
