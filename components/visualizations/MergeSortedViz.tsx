'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Pre-computed merge steps                                          */
/* ------------------------------------------------------------------ */

const ARR1 = [1, 3, 5] as const;
const ARR2 = [2, 4, 6] as const;

interface MergeStep {
  i: number; // pointer in arr1
  j: number; // pointer in arr2
  result: number[];
  action: string;
  comparing: boolean;
  comparedValues: { val1: number | null; val2: number | null } | null;
}

function computeSteps(): MergeStep[] {
  const steps: MergeStep[] = [];
  const result: number[] = [];
  let i = 0;
  let j = 0;

  steps.push({
    i: 0,
    j: 0,
    result: [],
    action: 'Initialize: i=0, j=0, result=[]',
    comparing: false,
    comparedValues: null,
  });

  while (i < ARR1.length && j < ARR2.length) {
    const val1 = ARR1[i];
    const val2 = ARR2[j];

    // Step: comparing
    steps.push({
      i,
      j,
      result: [...result],
      action: `Comparing arr1[${i}]=${val1} vs arr2[${j}]=${val2}`,
      comparing: true,
      comparedValues: { val1, val2 },
    });

    // Step: take smaller
    if (val1 <= val2) {
      result.push(val1);
      steps.push({
        i: i + 1,
        j,
        result: [...result],
        action: `${val1} <= ${val2} → take ${val1}, increment i`,
        comparing: false,
        comparedValues: null,
      });
      i++;
    } else {
      result.push(val2);
      steps.push({
        i,
        j: j + 1,
        result: [...result],
        action: `${val1} > ${val2} → take ${val2}, increment j`,
        comparing: false,
        comparedValues: null,
      });
      j++;
    }
  }

  // Append remaining elements
  if (i < ARR1.length) {
    const remaining = ARR1.slice(i);
    result.push(...remaining);
    steps.push({
      i: ARR1.length,
      j,
      result: [...result],
      action: `Append remaining from arr1: [${remaining.join(', ')}]`,
      comparing: false,
      comparedValues: null,
    });
  } else if (j < ARR2.length) {
    const remaining = ARR2.slice(j);
    result.push(...remaining);
    steps.push({
      i,
      j: ARR2.length,
      result: [...result],
      action: `Append remaining from arr2: [${remaining.join(', ')}]`,
      comparing: false,
      comparedValues: null,
    });
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const COLORS = {
  arr1: '#3b82f6', // blue
  arr2: '#10b981', // green
  result: '#eab308', // yellow
  pointer: '#ef4444', // red
  comparing: '#f97316', // orange
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MergeSortedViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const current: MergeStep | null = step === 0 ? null : (STEPS[step - 1] ?? null);

  const arr1Display = useMemo(() => {
    return ARR1.map((val, idx) => ({
      value: val,
      index: idx,
      isPointer: current !== null && idx === current.i,
      isCompared: current?.comparing && current.comparedValues?.val1 === val,
    }));
  }, [current]);

  const arr2Display = useMemo(() => {
    return ARR2.map((val, idx) => ({
      value: val,
      index: idx,
      isPointer: current !== null && idx === current.j,
      isCompared: current?.comparing && current.comparedValues?.val2 === val,
    }));
  }, [current]);

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white">Merge Two Sorted Arrays</h2>
        <p className="text-zinc-500 text-sm">Two-pointer technique</p>
      </div>

      {/* Arrays visualization */}
      <div className="space-y-6">
        {/* Array 1 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 text-sm font-mono">arr1:</span>
            <span className="text-xs text-zinc-500">[1, 3, 5]</span>
          </div>
          <div className="flex gap-2 items-center">
            {arr1Display.map((item, idx) => (
              <div
                key={idx}
                className="relative flex flex-col items-center"
                style={{
                  opacity: current && idx >= current.i && !current.comparing ? 0.4 : 1,
                }}
              >
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center font-mono font-bold text-lg transition-all"
                  style={{
                    backgroundColor: item.isCompared
                      ? COLORS.comparing
                      : item.isPointer
                        ? COLORS.pointer
                        : COLORS.arr1,
                    border: item.isPointer
                      ? `3px solid ${COLORS.pointer}`
                      : '2px solid transparent',
                    boxShadow: item.isCompared
                      ? `0 0 16px ${COLORS.comparing}`
                      : item.isPointer
                        ? `0 0 12px ${COLORS.pointer}`
                        : 'none',
                  }}
                >
                  <span className="text-white">{item.value}</span>
                </div>
                <span className="text-xs text-zinc-500 mt-1">{idx}</span>
                {item.isPointer && (
                  <span
                    className="absolute -top-6 text-xs font-bold"
                    style={{ color: COLORS.pointer }}
                  >
                    i
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
            <span className="text-xs text-zinc-500">[2, 4, 6]</span>
          </div>
          <div className="flex gap-2 items-center">
            {arr2Display.map((item, idx) => (
              <div
                key={idx}
                className="relative flex flex-col items-center"
                style={{
                  opacity: current && idx >= current.j && !current.comparing ? 0.4 : 1,
                }}
              >
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center font-mono font-bold text-lg transition-all"
                  style={{
                    backgroundColor: item.isCompared
                      ? COLORS.comparing
                      : item.isPointer
                        ? COLORS.pointer
                        : COLORS.arr2,
                    border: item.isPointer
                      ? `3px solid ${COLORS.pointer}`
                      : '2px solid transparent',
                    boxShadow: item.isCompared
                      ? `0 0 16px ${COLORS.comparing}`
                      : item.isPointer
                        ? `0 0 12px ${COLORS.pointer}`
                        : 'none',
                  }}
                >
                  <span className="text-white">{item.value}</span>
                </div>
                <span className="text-xs text-zinc-500 mt-1">{idx}</span>
                {item.isPointer && (
                  <span
                    className="absolute -top-6 text-xs font-bold"
                    style={{ color: COLORS.pointer }}
                  >
                    j
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Result array */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 text-sm font-mono">result:</span>
          </div>
          <div className="flex gap-2 items-center flex-wrap min-h-[80px]">
            {current?.result.map((val, idx) => (
              <motion.div
                key={`${val}-${idx}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 rounded-lg flex items-center justify-center font-mono font-bold text-lg"
                style={{
                  backgroundColor: COLORS.result,
                }}
              >
                <span className="text-white">{val}</span>
              </motion.div>
            ))}
            {(!current || current.result.length === 0) && (
              <span className="text-zinc-600 text-sm italic">[]</span>
            )}
          </div>
        </div>
      </div>

      {/* Action description */}
      <div className="bg-zinc-800 rounded-lg p-4 text-center">
        <span className="text-zinc-300 text-sm font-mono">
          {current?.action || 'Press Play or Step to begin'}
        </span>
      </div>

      {/* Controls */}
      <VizControls controls={controls} accentColor={COLORS.arr1} />
    </div>
  );
}
