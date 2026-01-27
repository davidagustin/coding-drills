'use client';

import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Pre-computed matrix rotation steps                                */
/* ------------------------------------------------------------------ */

const INITIAL_MATRIX = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
] as const;

interface MatrixStep {
  matrix: number[][];
  phase: 'transpose' | 'reverse' | 'complete';
  i: number | null;
  j: number | null;
  action: string;
  swapping: boolean;
}

function computeSteps(): MatrixStep[] {
  const steps: MatrixStep[] = [];
  const matrix: number[][] = INITIAL_MATRIX.map((row) => [...row]);
  const n = matrix.length;

  steps.push({
    matrix: matrix.map((row) => [...row]),
    phase: 'transpose',
    i: null,
    j: null,
    action: 'Initial matrix',
    swapping: false,
  });

  // Phase 1: Transpose
  steps.push({
    matrix: matrix.map((row) => [...row]),
    phase: 'transpose',
    i: null,
    j: null,
    action: 'Phase 1: Transpose (swap matrix[i][j] with matrix[j][i])',
    swapping: false,
  });

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      steps.push({
        matrix: matrix.map((row) => [...row]),
        phase: 'transpose',
        i,
        j,
        action: `Transpose: swap matrix[${i}][${j}]=${matrix[i][j]} with matrix[${j}][${i}]=${matrix[j][i]}`,
        swapping: true,
      });

      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];

      steps.push({
        matrix: matrix.map((row) => [...row]),
        phase: 'transpose',
        i,
        j,
        action: `After swap: matrix[${i}][${j}]=${matrix[i][j]}, matrix[${j}][${i}]=${matrix[j][i]}`,
        swapping: false,
      });
    }
  }

  steps.push({
    matrix: matrix.map((row) => [...row]),
    phase: 'reverse',
    i: null,
    j: null,
    action: 'Transpose complete. Phase 2: Reverse each row',
    swapping: false,
  });

  // Phase 2: Reverse each row
  for (let i = 0; i < n; i++) {
    steps.push({
      matrix: matrix.map((row) => [...row]),
      phase: 'reverse',
      i,
      j: null,
      action: `Reverse row ${i}: [${matrix[i].join(', ')}]`,
      swapping: false,
    });

    matrix[i].reverse();

    steps.push({
      matrix: matrix.map((row) => [...row]),
      phase: 'reverse',
      i,
      j: null,
      action: `Row ${i} reversed: [${matrix[i].join(', ')}]`,
      swapping: false,
    });
  }

  steps.push({
    matrix: matrix.map((row) => [...row]),
    phase: 'complete',
    i: null,
    j: null,
    action: 'Complete! Matrix rotated 90° clockwise',
    swapping: false,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const COLORS = {
  normal: '#3b82f6',
  swapping: '#ef4444',
  reversing: '#f97316',
  phase: '#10b981',
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function RotateMatrixViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const current: MatrixStep | null = step === 0 ? null : (STEPS[step - 1] ?? null);
  const matrix = current?.matrix ?? INITIAL_MATRIX.map((row) => [...row]);

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white">Rotate Matrix 90° Clockwise</h2>
        <p className="text-zinc-500 text-sm">Transpose + Reverse rows</p>
      </div>

      {/* Phase indicator */}
      {current && (
        <div className="bg-zinc-800 rounded-lg p-3 text-center">
          <span className="text-zinc-400 text-xs uppercase tracking-wider">Phase: </span>
          <span
            className="text-zinc-200 font-mono font-bold px-3 py-1 rounded"
            style={{
              backgroundColor:
                current.phase === 'transpose'
                  ? COLORS.swapping
                  : current.phase === 'reverse'
                    ? COLORS.reversing
                    : COLORS.phase,
              color: 'white',
            }}
          >
            {current.phase === 'transpose'
              ? '1. Transpose'
              : current.phase === 'reverse'
                ? '2. Reverse Rows'
                : 'Complete'}
          </span>
        </div>
      )}

      {/* Matrix visualization */}
      <div className="flex justify-center">
        <div className="space-y-1">
          {matrix.map((row, i) => (
            <div key={i} className="flex gap-1">
              {row.map((val, j) => {
                const isSwapping =
                  current?.swapping &&
                  current.i !== null &&
                  current.j !== null &&
                  ((i === current.i && j === current.j) || (i === current.j && j === current.i));
                const isReversing = current?.phase === 'reverse' && current.i === i;

                return (
                  <div
                    key={`${i}-${j}`}
                    className="w-16 h-16 rounded-lg flex items-center justify-center font-mono font-bold text-lg transition-all"
                    style={{
                      backgroundColor: isSwapping
                        ? COLORS.swapping
                        : isReversing
                          ? COLORS.reversing
                          : COLORS.normal,
                      border:
                        isSwapping || isReversing ? '3px solid #ffffff' : '2px solid transparent',
                      boxShadow:
                        isSwapping || isReversing
                          ? `0 0 12px ${isSwapping ? COLORS.swapping : COLORS.reversing}`
                          : 'none',
                    }}
                  >
                    <span className="text-white">{val}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Coordinates */}
      {current && current.i !== null && (
        <div className="bg-zinc-800 rounded-lg p-3 text-center">
          <span className="text-zinc-400 text-xs">
            {current.phase === 'transpose'
              ? `Swapping matrix[${current.i}][${current.j}] ↔ matrix[${current.j}][${current.i}]`
              : `Reversing row ${current.i}`}
          </span>
        </div>
      )}

      {/* Action description */}
      <div className="bg-zinc-800 rounded-lg p-4 text-center">
        <span className="text-zinc-300 text-sm font-mono">
          {current?.action || 'Press Play or Step to begin'}
        </span>
      </div>

      {/* Controls */}
      <VizControls controls={controls} accentColor={COLORS.normal} />
    </div>
  );
}
