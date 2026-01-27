'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const MATRIX = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
] as const;

const ROWS = 3;
const COLS = 3;

/** One color per diagonal (indexed by row+col sum: 0..4) */
const DIAGONAL_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4'] as const;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface DiagonalStep {
  /** Which diagonal group (row+col sum) we are currently visiting. */
  currentDiagonal: number;
  /** Row of the cell being visited this step. */
  activeRow: number;
  /** Column of the cell being visited this step. */
  activeCol: number;
  /** The value at [activeRow, activeCol]. */
  value: number;
  /** All values collected so far (including this step). */
  collected: number[];
  /** Set of "row-col" keys for cells already visited before this step. */
  visitedCells: Set<string>;
  /** Description of what is happening. */
  description: string;
}

/* ------------------------------------------------------------------ */
/*  Pre-compute diagonal traversal steps                               */
/* ------------------------------------------------------------------ */

function computeSteps(): DiagonalStep[] {
  const steps: DiagonalStep[] = [];
  const collected: number[] = [];
  const visitedCells = new Set<string>();

  // Total number of diagonals = ROWS + COLS - 1
  const totalDiags = ROWS + COLS - 1;

  for (let d = 0; d < totalDiags; d++) {
    // Collect all cells where row + col === d
    const cells: { row: number; col: number }[] = [];
    for (let row = 0; row < ROWS; row++) {
      const col = d - row;
      if (col >= 0 && col < COLS) {
        cells.push({ row, col });
      }
    }

    // Visit each cell in this diagonal
    for (const { row, col } of cells) {
      const value = MATRIX[row][col];
      collected.push(value);

      steps.push({
        currentDiagonal: d,
        activeRow: row,
        activeCol: col,
        value,
        collected: [...collected],
        visitedCells: new Set(visitedCells),
        description: `Diagonal ${d} (r+c=${d}): visit [${row},${col}] = ${value}`,
      });

      visitedCells.add(`${row}-${col}`);
    }
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function DiagonalTraversalViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  // step=0 means "nothing yet", step=1 means show STEPS[0], etc.
  const current: DiagonalStep | null = step === 0 ? null : (STEPS[step - 1] ?? null);

  // Build a lookup of visited cells for rendering
  const visitedSet = useMemo<Set<string>>(() => {
    if (!current) return new Set();
    // Include the current cell plus all previously visited
    const set = new Set(current.visitedCells);
    set.add(`${current.activeRow}-${current.activeCol}`);
    return set;
  }, [current]);

  return (
    <div className="w-full max-w-2xl mx-auto select-none">
      {/* ---- Header ---- */}
      <div className="text-center mb-5">
        <h2
          className="text-xl font-bold mb-1"
          style={{
            background: 'linear-gradient(135deg, #ef4444, #f97316, #eab308, #22c55e, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Diagonal Matrix Traversal
        </h2>
        <p className="text-zinc-400 text-sm">
          Group cells by <span className="text-white font-semibold font-mono">row + col</span> sum
        </p>
      </div>

      {/* ---- Matrix grid ---- */}
      <div className="bg-zinc-800/80 rounded-xl p-5 border border-zinc-700/60">
        {/* Row+Col sum reference */}
        <div className="flex justify-center gap-3 mb-4 flex-wrap">
          {DIAGONAL_COLORS.map((color, d) => (
            <div key={d} className="flex items-center gap-1.5">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ background: color }}
              />
              <span className="text-zinc-400 text-xs font-mono">d={d}</span>
            </div>
          ))}
        </div>

        {/* 3x3 Grid */}
        <div className="flex justify-center">
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${COLS}, 72px)` }}>
            {MATRIX.flatMap((row, r) =>
              row.map((value, c) => {
                const key = `${r}-${c}`;
                const diagIndex = r + c;
                const diagColor = DIAGONAL_COLORS[diagIndex];
                const isActive =
                  current !== null && r === current.activeRow && c === current.activeCol;
                const isVisited = !isActive && visitedSet.has(key);
                const isUnvisited = !isActive && !isVisited;

                // Border
                let borderColor = 'rgba(63,63,70,0.6)';
                let boxShadow = 'none';
                let bg = 'rgba(39,39,42,0.8)';
                let textColor = '#71717a';

                if (isActive) {
                  borderColor = diagColor;
                  boxShadow = `0 0 14px ${diagColor}88, 0 0 30px ${diagColor}44`;
                  bg = diagColor;
                  textColor = '#ffffff';
                } else if (isVisited) {
                  borderColor = `${diagColor}60`;
                  bg = `${diagColor}22`;
                  textColor = diagColor;
                } else if (current !== null && !isUnvisited) {
                  // fallback
                  textColor = '#71717a';
                }

                return (
                  <div
                    key={key}
                    className="relative flex flex-col items-center justify-center rounded-lg font-mono"
                    style={{
                      width: 72,
                      height: 72,
                      border: `2px solid ${borderColor}`,
                      background: bg,
                      boxShadow,
                      color: textColor,
                      transition: 'all 0.35s cubic-bezier(.4,0,.2,1)',
                      animation: isActive ? 'dtv-pulse 1s ease-in-out infinite' : 'none',
                    }}
                  >
                    {/* Value */}
                    <span className="text-lg font-bold leading-none">{value}</span>

                    {/* Coordinate label */}
                    <span
                      className="text-[9px] mt-1"
                      style={{
                        color: isActive
                          ? 'rgba(255,255,255,0.7)'
                          : isVisited
                            ? `${diagColor}99`
                            : 'rgba(161,161,170,0.5)',
                        transition: 'color 0.35s',
                      }}
                    >
                      [{r},{c}]
                    </span>

                    {/* Diagonal badge (top-right corner) */}
                    <span
                      className="absolute top-0.5 right-1 text-[8px] font-semibold"
                      style={{
                        color: isActive
                          ? 'rgba(255,255,255,0.6)'
                          : isVisited
                            ? `${diagColor}88`
                            : 'rgba(161,161,170,0.3)',
                        transition: 'color 0.35s',
                      }}
                    >
                      r+c={diagIndex}
                    </span>

                    {/* Checkmark for visited */}
                    {isVisited && (
                      <span
                        className="absolute bottom-0.5 right-1 text-[10px] font-bold"
                        style={{ color: diagColor }}
                      >
                        ✓
                      </span>
                    )}
                  </div>
                );
              }),
            )}
          </div>
        </div>
      </div>

      {/* ---- Output array ---- */}
      <div className="mt-3 rounded-xl border border-zinc-700/60 bg-zinc-800/80 px-5 py-4">
        <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-2">
          Output Array
        </p>
        <div className="flex flex-wrap items-center gap-1 font-mono text-sm min-h-[28px]">
          <span className="text-zinc-600 font-semibold">[</span>
          {current !== null &&
            current.collected.map((val, i) => {
              const isLast = i === current.collected.length - 1;
              // Find the diagonal color for this value by looking it up in STEPS
              const stepData = STEPS[i];
              const valColor = DIAGONAL_COLORS[stepData.currentDiagonal];
              return (
                <span key={i} className="flex items-center">
                  <span
                    className="font-bold"
                    style={{
                      color: valColor,
                      opacity: isLast ? 1 : 0.75,
                      transition: 'opacity 0.3s',
                    }}
                  >
                    {val}
                  </span>
                  {i < current.collected.length - 1 && (
                    <span className="text-zinc-600 mr-0.5">,</span>
                  )}
                </span>
              );
            })}
          <span className="text-zinc-600 font-semibold">]</span>
        </div>
      </div>

      {/* ---- Status panel ---- */}
      <div
        className="mt-3 rounded-xl border border-zinc-700/60 bg-zinc-800/80 px-5 py-4 text-center"
        style={{ minHeight: 64, transition: 'all 0.3s' }}
      >
        {current === null ? (
          <p className="text-zinc-500 text-sm italic">
            Press <span className="font-semibold text-zinc-400">Play</span> or{' '}
            <span className="font-semibold text-zinc-400">Step</span> to begin
          </p>
        ) : (
          <>
            <p className="text-xs text-zinc-500 mb-1 uppercase tracking-wider font-semibold">
              Step {step} of {TOTAL_STEPS}
            </p>
            <p
              className="font-mono text-sm font-semibold"
              style={{
                color: DIAGONAL_COLORS[current.currentDiagonal],
                transition: 'color 0.3s',
              }}
            >
              {current.description}
            </p>
            <p className="text-zinc-500 text-xs mt-1">
              Diagonal {current.currentDiagonal} | Cell [{current.activeRow},{current.activeCol}] |
              Collected: {current.collected.length}/{TOTAL_STEPS}
            </p>
          </>
        )}
      </div>

      {/* ---- Diagonal groupings reference ---- */}
      <div className="mt-3 rounded-xl border border-zinc-700/60 bg-zinc-800/80 px-5 py-3">
        <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-2">
          Diagonal Groups
        </p>
        <div className="flex flex-wrap gap-2">
          {DIAGONAL_COLORS.map((color, d) => {
            const isActiveDiag = current !== null && current.currentDiagonal === d;
            // Gather cells for this diagonal
            const cells: string[] = [];
            for (let r = 0; r < ROWS; r++) {
              const c = d - r;
              if (c >= 0 && c < COLS) {
                cells.push(`${MATRIX[r][c]}`);
              }
            }
            return (
              <div
                key={d}
                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-mono transition-all"
                style={{
                  border: `1px solid ${isActiveDiag ? color : `${color}40`}`,
                  background: isActiveDiag ? `${color}22` : 'transparent',
                  color: isActiveDiag ? color : `${color}99`,
                  transition: 'all 0.3s',
                }}
              >
                <span className="font-bold">d{d}:</span>
                <span>[{cells.join(', ')}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---- Controls ---- */}
      <VizControls controls={controls} accentColor="#9775fa" />

      {/* ---- Inline keyframes ---- */}
      <style>{`
        @keyframes dtv-pulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}
