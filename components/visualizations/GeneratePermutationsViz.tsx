'use client';

import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Pre-computed permutation steps                                    */
/* ------------------------------------------------------------------ */

const INPUT = [1, 2, 3] as const;

interface PermutationStep {
  current: number[];
  remaining: number[];
  result: number[][];
  action: string;
  level: number;
  isBaseCase: boolean;
}

function computeSteps(): PermutationStep[] {
  const steps: PermutationStep[] = [];
  const result: number[][] = [];

  function permute(current: number[], remaining: number[], level: number): void {
    if (remaining.length === 0) {
      steps.push({
        current: [...current],
        remaining: [],
        result: [...result],
        action: `Base case: remaining empty → add [${current.join(', ')}] to result`,
        level,
        isBaseCase: true,
      });
      result.push([...current]);
      steps.push({
        current: [...current],
        remaining: [],
        result: [...result],
        action: `Added permutation: [${current.join(', ')}]`,
        level,
        isBaseCase: false,
      });
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      const chosen = remaining[i];
      const newCurrent = [...current, chosen];
      const newRemaining = [...remaining.slice(0, i), ...remaining.slice(i + 1)];

      steps.push({
        current: [...current],
        remaining: [...remaining],
        result: [...result],
        action: `Choose ${chosen} from remaining [${remaining.join(', ')}]`,
        level,
        isBaseCase: false,
      });

      steps.push({
        current: [...newCurrent],
        remaining: [...newRemaining],
        result: [...result],
        action: `Recurse: current=[${newCurrent.join(', ')}], remaining=[${newRemaining.join(', ')}]`,
        level,
        isBaseCase: false,
      });

      permute(newCurrent, newRemaining, level + 1);

      steps.push({
        current: [...current],
        remaining: [...remaining],
        result: [...result],
        action: `Backtrack: return to level ${level}, try next element`,
        level,
        isBaseCase: false,
      });
    }
  }

  steps.push({
    current: [],
    remaining: [...INPUT],
    result: [],
    action: `Start: generate permutations of [${INPUT.join(', ')}]`,
    level: 0,
    isBaseCase: false,
  });

  permute([], [...INPUT], 0);

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

export default function GeneratePermutationsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const current: PermutationStep | null = step === 0 ? null : (STEPS[step - 1] ?? null);

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white">Generate Permutations</h2>
        <p className="text-zinc-500 text-sm">Backtracking recursion</p>
      </div>

      {/* Current state */}
      <div className="grid grid-cols-2 gap-4">
        {/* Current permutation being built */}
        <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
          <div className="text-zinc-400 text-xs uppercase tracking-wider">Current</div>
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

        {/* Remaining elements */}
        <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
          <div className="text-zinc-400 text-xs uppercase tracking-wider">Remaining</div>
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
          Results ({current?.result.length ?? 0} / {INPUT.length}! ={' '}
          {INPUT.length === 3 ? 6 : INPUT.length === 2 ? 2 : 1})
        </div>
        <div className="flex gap-2 items-start flex-wrap min-h-[80px]">
          {current?.result.map((perm, idx) => (
            <div
              key={idx}
              className="flex gap-1 px-2 py-1 rounded border"
              style={{
                borderColor: COLORS.result,
                backgroundColor: `${COLORS.result}20`,
              }}
            >
              {perm.map((val, i) => (
                <span key={i} className="text-white font-mono text-sm">
                  {val}
                </span>
              ))}
            </div>
          ))}
          {(!current || current.result.length === 0) && (
            <span className="text-zinc-600 text-sm italic">No permutations yet</span>
          )}
        </div>
      </div>

      {/* Level indicator */}
      {current && (
        <div className="bg-zinc-800 rounded-lg p-3 text-center">
          <span className="text-zinc-400 text-xs">Recursion Level: </span>
          <span className="text-zinc-200 font-mono font-bold">{current.level}</span>
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
