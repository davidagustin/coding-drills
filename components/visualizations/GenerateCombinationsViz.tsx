'use client';

import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Pre-computed combination steps                                    */
/* ------------------------------------------------------------------ */

const INPUT = [1, 2, 3, 4] as const;
const K = 2;

interface CombinationStep {
  current: number[];
  remaining: number[];
  start: number;
  result: number[][];
  action: string;
  level: number;
  isBaseCase: boolean;
}

function computeSteps(): CombinationStep[] {
  const steps: CombinationStep[] = [];
  const result: number[][] = [];

  function backtrack(start: number, current: number[], level: number): void {
    if (current.length === K) {
      steps.push({
        current: [...current],
        remaining: [],
        start,
        result: [...result],
        action: `Base case: current.length === ${K} → add [${current.join(', ')}] to result`,
        level,
        isBaseCase: true,
      });
      result.push([...current]);
      steps.push({
        current: [...current],
        remaining: [],
        start,
        result: [...result],
        action: `Added combination: [${current.join(', ')}]`,
        level,
        isBaseCase: false,
      });
      return;
    }

    for (let i = start; i < INPUT.length; i++) {
      const chosen = INPUT[i];
      const newCurrent = [...current, chosen];

      steps.push({
        current: [...current],
        remaining: INPUT.slice(i + 1),
        start: i,
        result: [...result],
        action: `Choose ${chosen} at index ${i} (start=${start})`,
        level,
        isBaseCase: false,
      });

      steps.push({
        current: [...newCurrent],
        remaining: INPUT.slice(i + 1),
        start: i + 1,
        result: [...result],
        action: `Recurse: current=[${newCurrent.join(', ')}], start=${i + 1}`,
        level,
        isBaseCase: false,
      });

      backtrack(i + 1, newCurrent, level + 1);

      steps.push({
        current: [...current],
        remaining: INPUT.slice(i + 1),
        start: i,
        result: [...result],
        action: `Backtrack: remove ${chosen}, try next element`,
        level,
        isBaseCase: false,
      });
    }
  }

  steps.push({
    current: [],
    remaining: [...INPUT],
    start: 0,
    result: [],
    action: `Start: generate combinations of size ${K} from [${INPUT.join(', ')}]`,
    level: 0,
    isBaseCase: false,
  });

  backtrack(0, [], 0);

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const COLORS = {
  current: '#3b82f6',
  remaining: '#10b981',
  result: '#eab308',
  chosen: '#f97316',
  baseCase: '#ef4444',
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function GenerateCombinationsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const current: CombinationStep | null = step === 0 ? null : (STEPS[step - 1] ?? null);

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white">Generate Combinations (n choose k)</h2>
        <p className="text-zinc-500 text-sm">Backtracking with forward-only start index</p>
      </div>

      {/* Current state */}
      <div className="grid grid-cols-2 gap-4">
        {/* Current combination being built */}
        <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
          <div className="text-zinc-400 text-xs uppercase tracking-wider">
            Current ({current?.current.length ?? 0} / {K})
          </div>
          <div className="flex gap-2 items-center min-h-[60px]">
            {current?.current.length ? (
              current.current.map((val, idx) => (
                <div
                  key={idx}
                  className="w-12 h-12 rounded-lg flex items-center justify-center font-mono font-bold text-sm"
                  style={{ backgroundColor: COLORS.current }}
                >
                  <span className="text-white">{val}</span>
                </div>
              ))
            ) : (
              <span className="text-zinc-600 text-sm italic">[]</span>
            )}
          </div>
        </div>

        {/* Remaining elements (from start index) */}
        <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
          <div className="text-zinc-400 text-xs uppercase tracking-wider">
            Remaining (start={current?.start ?? 0})
          </div>
          <div className="flex gap-2 items-center min-h-[60px] flex-wrap">
            {current?.remaining.length ? (
              current.remaining.map((val, idx) => (
                <div
                  key={idx}
                  className="w-12 h-12 rounded-lg flex items-center justify-center font-mono font-bold text-sm"
                  style={{ backgroundColor: COLORS.remaining }}
                >
                  <span className="text-white">{val}</span>
                </div>
              ))
            ) : (
              <span className="text-zinc-600 text-sm italic">Empty</span>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
        <div className="text-zinc-400 text-xs uppercase tracking-wider">
          Results ({current?.result.length ?? 0} / C({INPUT.length},{K}) ={' '}
          {INPUT.length === 4 && K === 2 ? 6 : '?'})
        </div>
        <div className="flex gap-2 items-start flex-wrap min-h-[80px]">
          {current?.result.map((comb, idx) => (
            <div
              key={idx}
              className="flex gap-1 px-2 py-1 rounded border"
              style={{
                borderColor: COLORS.result,
                backgroundColor: `${COLORS.result}20`,
              }}
            >
              {comb.map((val, i) => (
                <span key={i} className="text-white font-mono text-sm">
                  {val}
                </span>
              ))}
            </div>
          ))}
          {(!current || current.result.length === 0) && (
            <span className="text-zinc-600 text-sm italic">No combinations yet</span>
          )}
        </div>
      </div>

      {/* Level indicator */}
      {current && (
        <div className="bg-zinc-800 rounded-lg p-3 text-center">
          <span className="text-zinc-400 text-xs">Recursion Level: </span>
          <span className="text-zinc-200 font-mono font-bold">{current.level}</span>
          <span className="text-zinc-500 mx-2">|</span>
          <span className="text-zinc-400 text-xs">Start Index: </span>
          <span className="text-zinc-200 font-mono font-bold">{current.start}</span>
        </div>
      )}

      {/* Action description */}
      <div className="bg-zinc-800 rounded-lg p-4 text-center">
        <span className="text-zinc-300 text-sm font-mono">
          {current?.action || 'Press Play or Step to begin'}
        </span>
      </div>

      {/* Controls */}
      <VizControls controls={controls} accentColor={COLORS.current} />
    </div>
  );
}
