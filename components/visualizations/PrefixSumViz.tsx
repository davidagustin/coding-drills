'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Pre-computed prefix sum steps                                      */
/* ------------------------------------------------------------------ */

const INPUT = [1, 2, 3, 4] as const;

interface PrefixStep {
  index: number;
  prefixSum: number[];
  currentSum: number;
  action: string;
  highlightingIndex: number | null;
}

function computeSteps(): PrefixStep[] {
  const steps: PrefixStep[] = [];
  const prefixSum: number[] = [];

  // Initial state
  steps.push({
    index: -1,
    prefixSum: [],
    currentSum: 0,
    action: 'Initialize: prefixSum = []',
    highlightingIndex: null,
  });

  // Build prefix sum
  for (let i = 0; i < INPUT.length; i++) {
    const currentValue = INPUT[i];
    const previousSum = i === 0 ? 0 : prefixSum[i - 1];
    const newSum = previousSum + currentValue;

    // Step: showing calculation
    steps.push({
      index: i,
      prefixSum: [...prefixSum],
      currentSum: newSum,
      action: `prefixSum[${i}] = ${previousSum} + ${currentValue} = ${newSum}`,
      highlightingIndex: i,
    });

    prefixSum.push(newSum);

    // Step: after adding
    steps.push({
      index: i,
      prefixSum: [...prefixSum],
      currentSum: newSum,
      action: `Added prefixSum[${i}] = ${newSum}`,
      highlightingIndex: i,
    });
  }

  // Final state
  steps.push({
    index: INPUT.length,
    prefixSum: [...prefixSum],
    currentSum: prefixSum[prefixSum.length - 1],
    action: `Complete! Prefix sum array: [${prefixSum.join(', ')}]`,
    highlightingIndex: null,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const COLORS = {
  input: '#3b82f6',
  prefix: '#10b981',
  highlighting: '#f97316',
  calculation: '#eab308',
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PrefixSumViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const current: PrefixStep | null = step === 0 ? null : (STEPS[step - 1] ?? null);

  const inputDisplay = useMemo(() => {
    return INPUT.map((val, idx) => ({
      value: val,
      index: idx,
      isHighlighting: current?.highlightingIndex === idx,
    }));
  }, [current]);

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white">Prefix Sum Array</h2>
        <p className="text-zinc-500 text-sm">Cumulative sum preprocessing</p>
      </div>

      {/* Input array */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 text-sm font-mono">Input:</span>
          <span className="text-xs text-zinc-500">[1, 2, 3, 4]</span>
        </div>
        <div className="flex gap-2 items-center">
          {inputDisplay.map((item, idx) => (
            <div key={idx} className="relative flex flex-col items-center">
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center font-mono font-bold text-lg transition-all"
                style={{
                  backgroundColor: item.isHighlighting ? COLORS.highlighting : COLORS.input,
                  border: item.isHighlighting
                    ? `3px solid ${COLORS.highlighting}`
                    : '2px solid transparent',
                  boxShadow: item.isHighlighting ? `0 0 12px ${COLORS.highlighting}` : 'none',
                }}
              >
                <span className="text-white">{item.value}</span>
              </div>
              <span className="text-xs text-zinc-500 mt-1">{idx}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Prefix sum array */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 text-sm font-mono">Prefix Sum:</span>
        </div>
        <div className="flex gap-2 items-center flex-wrap min-h-[80px]">
          {current?.prefixSum.map((val, idx) => {
            const isNew = current.highlightingIndex === idx && current.index === idx;
            return (
              <div key={idx} className="relative flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center font-mono font-bold text-lg transition-all"
                  style={{
                    backgroundColor: isNew ? COLORS.calculation : COLORS.prefix,
                    border: isNew ? `3px solid ${COLORS.calculation}` : '2px solid transparent',
                    boxShadow: isNew ? `0 0 12px ${COLORS.calculation}` : 'none',
                  }}
                >
                  <span className="text-white">{val}</span>
                </div>
                <span className="text-xs text-zinc-500 mt-1">{idx}</span>
              </div>
            );
          })}
          {(!current || current.prefixSum.length === 0) && (
            <span className="text-zinc-600 text-sm italic">[]</span>
          )}
        </div>
      </div>

      {/* Calculation visualization */}
      {current && current.highlightingIndex !== null && (
        <div className="bg-zinc-800 rounded-lg p-4">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-zinc-400">prefixSum[{current.highlightingIndex}] =</span>
            {current.highlightingIndex === 0 ? (
              <>
                <span className="text-zinc-300 font-mono">0</span>
                <span className="text-zinc-500">+</span>
                <span
                  className="font-mono font-bold px-2 py-1 rounded"
                  style={{ backgroundColor: COLORS.highlighting, color: 'white' }}
                >
                  {INPUT[current.highlightingIndex]}
                </span>
              </>
            ) : (
              <>
                <span
                  className="font-mono font-bold px-2 py-1 rounded"
                  style={{ backgroundColor: COLORS.prefix, color: 'white' }}
                >
                  {current.prefixSum[current.highlightingIndex - 1]}
                </span>
                <span className="text-zinc-500">+</span>
                <span
                  className="font-mono font-bold px-2 py-1 rounded"
                  style={{ backgroundColor: COLORS.highlighting, color: 'white' }}
                >
                  {INPUT[current.highlightingIndex]}
                </span>
              </>
            )}
            <span className="text-zinc-500">=</span>
            <span
              className="font-mono font-bold px-2 py-1 rounded"
              style={{ backgroundColor: COLORS.calculation, color: 'white' }}
            >
              {current.currentSum}
            </span>
          </div>
        </div>
      )}

      {/* Action description */}
      <div className="bg-zinc-800 rounded-lg p-4 text-center">
        <span className="text-zinc-300 text-sm font-mono">
          {current?.action || 'Press Play or Step to begin'}
        </span>
      </div>

      {/* Controls */}
      <VizControls controls={controls} accentColor={COLORS.prefix} />
    </div>
  );
}
