'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Direction = 'right' | 'down' | 'left' | 'up';

interface SpiralStep {
  row: number;
  col: number;
  value: number;
  direction: Direction;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ROWS = 4;
const COLS = 4;
const TOTAL = ROWS * COLS; // 16

/** Build the 4x4 matrix values 1..16 */
const MATRIX: number[][] = Array.from({ length: ROWS }, (_, r) =>
  Array.from({ length: COLS }, (_, c) => r * COLS + c + 1),
);

/** Direction color palette */
const DIR_COLORS: Record<Direction, string> = {
  right: '#ec4899', // pink
  down: '#f97316', // orange
  left: '#06b6d4', // cyan
  up: '#22c55e', // green
};

/** Arrow characters for each direction */
const DIR_ARROWS: Record<Direction, string> = {
  right: '\u2192', // ->
  down: '\u2193', // v
  left: '\u2190', // <-
  up: '\u2191', // ^
};

/** Direction labels (capitalised) */
const DIR_LABELS: Record<Direction, string> = {
  right: 'Right',
  down: 'Down',
  left: 'Left',
  up: 'Up',
};

/* ------------------------------------------------------------------ */
/*  Pre-compute spiral order                                           */
/* ------------------------------------------------------------------ */

function computeSpiralOrder(): SpiralStep[] {
  const steps: SpiralStep[] = [];
  let top = 0;
  let bottom = ROWS - 1;
  let left = 0;
  let right = COLS - 1;

  while (top <= bottom && left <= right) {
    // Traverse right across top row
    for (let c = left; c <= right; c++) {
      steps.push({ row: top, col: c, value: MATRIX[top][c], direction: 'right' });
    }
    top++;

    // Traverse down along right column
    for (let r = top; r <= bottom; r++) {
      steps.push({ row: r, col: right, value: MATRIX[r][right], direction: 'down' });
    }
    right--;

    // Traverse left across bottom row
    if (top <= bottom) {
      for (let c = right; c >= left; c--) {
        steps.push({ row: bottom, col: c, value: MATRIX[bottom][c], direction: 'left' });
      }
      bottom--;
    }

    // Traverse up along left column
    if (left <= right) {
      for (let r = bottom; r >= top; r--) {
        steps.push({ row: r, col: left, value: MATRIX[r][left], direction: 'up' });
      }
      left++;
    }
  }

  return steps;
}

const SPIRAL_ORDER = computeSpiralOrder();

/* ------------------------------------------------------------------ */
/*  Inline keyframes (injected once via <style>)                       */
/* ------------------------------------------------------------------ */

const PULSE_KEYFRAMES = `
@keyframes spiralPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}
`;

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

/** A single cell in the 4x4 grid */
function MatrixCell({
  value,
  row,
  col,
  status,
  direction,
}: {
  value: number;
  row: number;
  col: number;
  status: 'unvisited' | 'visited' | 'current';
  direction: Direction | null;
}) {
  const color = direction ? DIR_COLORS[direction] : undefined;

  const bgColor =
    status === 'current'
      ? color
      : status === 'visited'
        ? `${color}28` // ~16% opacity hex
        : '#27272a'; // zinc-800

  const borderColor =
    status === 'current'
      ? color
      : status === 'visited'
        ? `${color}60` // ~38% opacity
        : '#3f3f46'; // zinc-700

  const textColor = status === 'current' ? '#ffffff' : status === 'visited' ? color : '#71717a'; // zinc-500

  const boxShadow = status === 'current' ? `0 0 16px ${color}80, 0 0 32px ${color}40` : 'none';

  return (
    <div
      style={{
        width: 64,
        height: 64,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        border: `2px solid ${borderColor}`,
        backgroundColor: bgColor,
        color: textColor,
        boxShadow,
        transition: 'all 0.3s ease',
        animation: status === 'current' ? 'spiralPulse 0.8s ease-in-out infinite' : 'none',
        position: 'relative',
      }}
    >
      <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}>{value}</span>
      <span style={{ fontSize: 9, opacity: 0.5, marginTop: 2 }}>
        [{row},{col}]
      </span>
    </div>
  );
}

/** Direction indicator panel */
function DirectionIndicator({
  direction,
  stepIndex,
}: {
  direction: Direction | null;
  stepIndex: number;
}) {
  if (!direction) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '8px 16px',
          borderRadius: 8,
          backgroundColor: '#27272a',
          border: '1px solid #3f3f46',
          minWidth: 180,
        }}
      >
        <span style={{ fontSize: 13, color: '#71717a' }}>Press Play to start</span>
      </div>
    );
  }

  const color = DIR_COLORS[direction];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: '8px 18px',
        borderRadius: 8,
        backgroundColor: `${color}18`,
        border: `1px solid ${color}50`,
        minWidth: 180,
        transition: 'all 0.3s ease',
      }}
    >
      <span style={{ fontSize: 22, color }}>{DIR_ARROWS[direction]}</span>
      <span style={{ fontSize: 14, fontWeight: 600, color }}>
        Direction: {DIR_LABELS[direction]}
      </span>
      <span style={{ fontSize: 12, color: '#a1a1aa', marginLeft: 4 }}>
        Step {stepIndex}/{TOTAL}
      </span>
    </div>
  );
}

/** The output array display that builds up over time */
function OutputArray({ visitedSteps }: { visitedSteps: SpiralStep[] }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#a1a1aa', marginBottom: 6 }}>
        Output Array:
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          padding: '10px 12px',
          borderRadius: 8,
          backgroundColor: '#18181b',
          border: '1px solid #27272a',
          minHeight: 36,
          alignItems: 'center',
        }}
      >
        <span style={{ color: '#52525b', fontSize: 14, fontWeight: 500 }}>[</span>
        {visitedSteps.map((s, i) => {
          const color = DIR_COLORS[s.direction];
          const isLast = i === visitedSteps.length - 1;
          return (
            <span
              key={`${s.row}-${s.col}`}
              style={{
                fontSize: 14,
                fontWeight: 600,
                color,
                fontFamily: 'monospace',
                opacity: isLast ? 1 : 0.8,
                transition: 'opacity 0.3s ease',
              }}
            >
              {s.value}
              {i < visitedSteps.length - 1 && (
                <span style={{ color: '#52525b', marginRight: 2 }}>,</span>
              )}
            </span>
          );
        })}
        <span style={{ color: '#52525b', fontSize: 14, fontWeight: 500 }}>]</span>
      </div>
    </div>
  );
}

/** Legend mapping directions to their colors */
function DirectionLegend() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 16,
        flexWrap: 'wrap',
        marginTop: 8,
      }}
    >
      {(['right', 'down', 'left', 'up'] as Direction[]).map((dir) => (
        <div key={dir} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              backgroundColor: DIR_COLORS[dir],
            }}
          />
          <span style={{ fontSize: 11, color: '#a1a1aa', fontWeight: 500 }}>
            {DIR_ARROWS[dir]} {DIR_LABELS[dir]}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function SpiralMatrixViz() {
  const controls = useVizAnimation(TOTAL);
  const { step } = controls.state;

  // Derive visited steps and lookup map
  const { visitedSteps, visitedMap, currentStep } = useMemo(() => {
    const visited = SPIRAL_ORDER.slice(0, step);
    const map = new Map<string, { index: number; direction: Direction }>();
    visited.forEach((s, i) => {
      map.set(`${s.row}-${s.col}`, { index: i, direction: s.direction });
    });
    const current = step > 0 ? SPIRAL_ORDER[step - 1] : null;
    return { visitedSteps: visited, visitedMap: map, currentStep: current };
  }, [step]);

  return (
    <>
      {/* Inject pulse animation keyframes */}
      <style>{PULSE_KEYFRAMES}</style>

      <div
        style={{
          backgroundColor: '#18181b',
          borderRadius: 12,
          padding: 24,
          border: '1px solid #27272a',
          maxWidth: 480,
          margin: '0 auto',
        }}
      >
        {/* Title */}
        <h3
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 700,
            marginTop: 0,
            marginBottom: 16,
            background: 'linear-gradient(135deg, #ec4899, #f97316, #06b6d4, #22c55e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Spiral Matrix Traversal
        </h3>

        {/* Direction indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          <DirectionIndicator direction={currentStep?.direction ?? null} stepIndex={step} />
        </div>

        {/* Direction legend */}
        <DirectionLegend />

        {/* 4x4 Grid */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 16,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${COLS}, 64px)`,
              gap: 6,
            }}
          >
            {MATRIX.flatMap((row, r) =>
              row.map((value, c) => {
                const key = `${r}-${c}`;
                const visited = visitedMap.get(key);
                const isCurrent =
                  currentStep !== null && currentStep.row === r && currentStep.col === c;

                let status: 'unvisited' | 'visited' | 'current' = 'unvisited';
                let direction: Direction | null = null;

                if (isCurrent) {
                  status = 'current';
                  direction = currentStep?.direction ?? null;
                } else if (visited) {
                  status = 'visited';
                  direction = visited.direction;
                }

                return (
                  <MatrixCell
                    key={key}
                    value={value}
                    row={r}
                    col={c}
                    status={status}
                    direction={direction}
                  />
                );
              }),
            )}
          </div>
        </div>

        {/* Output array */}
        <OutputArray visitedSteps={visitedSteps} />

        {/* Shared controls */}
        <VizControls controls={controls} accentColor="#ec4899" />
      </div>
    </>
  );
}
