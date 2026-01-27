'use client';

import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Pre-computed subset steps                                         */
/* ------------------------------------------------------------------ */

const INPUT = [1, 2, 3] as const;

interface SubsetStep {
  element: number | null;
  subsets: number[][];
  newSubsets: number[][];
  action: string;
}

function computeSteps(): SubsetStep[] {
  const steps: SubsetStep[] = [];
  let subsets: number[][] = [[]];

  steps.push({
    element: null,
    subsets: [[]],
    newSubsets: [],
    action: 'Start with empty set: [[]]',
  });

  for (const element of INPUT) {
    const newSubsets: number[][] = [];

    steps.push({
      element,
      subsets: [...subsets],
      newSubsets: [],
      action: `Processing element ${element}`,
    });

    // Create new subsets by adding element to all existing subsets
    for (const subset of subsets) {
      const newSubset = [...subset, element];
      newSubsets.push(newSubset);
      steps.push({
        element,
        subsets: [...subsets],
        newSubsets: [...newSubsets],
        action: `Add ${element} to [${subset.join(', ') || 'empty'}] → [${newSubset.join(', ')}]`,
      });
    }

    // Combine old and new subsets
    subsets = [...subsets, ...newSubsets];
    steps.push({
      element,
      subsets: [...subsets],
      newSubsets: [],
      action: `Combine: ${subsets.length} total subsets`,
    });
  }

  steps.push({
    element: null,
    subsets: [...subsets],
    newSubsets: [],
    action: `Complete! Power set has ${subsets.length} = 2^${INPUT.length} subsets`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const COLORS = {
  element: '#3b82f6',
  existing: '#10b981',
  new: '#f97316',
  result: '#eab308',
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function GenerateSubsetsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const current: SubsetStep | null = step === 0 ? null : (STEPS[step - 1] ?? null);

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white">Generate All Subsets (Power Set)</h2>
        <p className="text-zinc-500 text-sm">Iterative doubling with reduce</p>
      </div>

      {/* Current element */}
      {current && current.element !== null && (
        <div className="bg-zinc-800 rounded-lg p-4 text-center">
          <span className="text-zinc-400 text-sm">Processing element: </span>
          <span
            className="text-2xl font-mono font-bold px-4 py-2 rounded inline-block"
            style={{ backgroundColor: COLORS.element, color: 'white' }}
          >
            {current.element}
          </span>
        </div>
      )}

      {/* Subsets visualization */}
      <div className="space-y-4">
        {/* Existing subsets */}
        <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
          <div className="text-zinc-400 text-xs uppercase tracking-wider">
            Existing Subsets ({current?.subsets.length ?? 0})
          </div>
          <div className="flex gap-2 items-start flex-wrap min-h-[80px]">
            {current?.subsets.map((subset, idx) => {
              const isNew = current.newSubsets.some(
                (ns) => ns.length === subset.length && ns.every((v, i) => v === subset[i]),
              );
              return (
                <div
                  key={idx}
                  className="flex gap-1 px-2 py-1 rounded border transition-all"
                  style={{
                    borderColor: isNew ? COLORS.new : COLORS.existing,
                    backgroundColor: isNew ? `${COLORS.new}20` : `${COLORS.existing}20`,
                  }}
                >
                  <span className="text-zinc-500 text-xs">[</span>
                  {subset.length > 0 ? (
                    subset.map((val, i) => (
                      <span key={i} className="text-white font-mono text-sm">
                        {val}
                        {i < subset.length - 1 && <span className="text-zinc-500">,</span>}
                      </span>
                    ))
                  ) : (
                    <span className="text-zinc-500 text-xs">empty</span>
                  )}
                  <span className="text-zinc-500 text-xs">]</span>
                </div>
              );
            })}
            {(!current || current.subsets.length === 0) && (
              <span className="text-zinc-600 text-sm italic">No subsets yet</span>
            )}
          </div>
        </div>

        {/* New subsets being created */}
        {current && current.newSubsets.length > 0 && (
          <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
            <div className="text-zinc-400 text-xs uppercase tracking-wider">
              New Subsets Being Created ({current.newSubsets.length})
            </div>
            <div className="flex gap-2 items-start flex-wrap min-h-[60px]">
              {current.newSubsets.map((subset, idx) => (
                <div
                  key={idx}
                  className="flex gap-1 px-2 py-1 rounded border transition-all"
                  style={{
                    borderColor: COLORS.new,
                    backgroundColor: `${COLORS.new}40`,
                    boxShadow: `0 0 8px ${COLORS.new}40`,
                  }}
                >
                  <span className="text-zinc-500 text-xs">[</span>
                  {subset.map((val, i) => (
                    <span key={i} className="text-white font-mono text-sm font-bold">
                      {val}
                      {i < subset.length - 1 && <span className="text-zinc-500">,</span>}
                    </span>
                  ))}
                  <span className="text-zinc-500 text-xs">]</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Power set size */}
      <div className="bg-zinc-800 rounded-lg p-3 text-center">
        <span className="text-zinc-400 text-sm">Power Set Size: </span>
        <span className="text-zinc-200 font-mono font-bold">
          {current?.subsets.length ?? 0} = 2^{INPUT.length} = {2 ** INPUT.length}
        </span>
      </div>

      {/* Action description */}
      <div className="bg-zinc-800 rounded-lg p-4 text-center">
        <span className="text-zinc-300 text-sm font-mono">
          {current?.action || 'Press Play or Step to begin'}
        </span>
      </div>

      {/* Controls */}
      <VizControls controls={controls} accentColor={COLORS.element} />
    </div>
  );
}
