'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Data & types
// ---------------------------------------------------------------------------

interface ListNode {
  value: number;
  next: number | null; // index of next node, null for tail
}

const LINKED_LIST: ListNode[] = [
  { value: 10, next: 1 },
  { value: 20, next: 2 },
  { value: 30, next: 3 },
  { value: 40, next: 4 },
  { value: 50, next: null },
];

const TOTAL_STEPS = LINKED_LIST.length + 1; // visit each node + reach null

const ACCENT = '#14b8a6'; // teal-500

// ---------------------------------------------------------------------------
// Pre-computed step snapshots
// ---------------------------------------------------------------------------

interface StepSnapshot {
  /** Index of `current` pointer (-1 means past the end / null) */
  currentIdx: number;
  /** Values collected so far */
  collected: number[];
  /** Description of what happened this step */
  codeText: string;
  /** Indices of nodes already visited (not including current) */
  visitedIndices: number[];
  /** Is `current` at null? */
  reachedNull: boolean;
}

function precomputeSteps(): StepSnapshot[] {
  const steps: StepSnapshot[] = [];

  // Step 0: initial state, current = head (index 0), nothing collected yet
  steps.push({
    currentIdx: 0,
    collected: [],
    codeText: 'current = head',
    visitedIndices: [],
    reachedNull: false,
  });

  // Steps 1..N-1: visiting nodes 1..N-1, collecting previous node value
  for (let i = 1; i < LINKED_LIST.length; i++) {
    const visited = Array.from({ length: i }, (_, k) => k);
    const collected = LINKED_LIST.slice(0, i).map((n) => n.value);
    steps.push({
      currentIdx: i,
      collected,
      codeText: 'current = current.next',
      visitedIndices: visited,
      reachedNull: false,
    });
  }

  // Final step: current = null (past end)
  steps.push({
    currentIdx: -1,
    collected: LINKED_LIST.map((n) => n.value),
    codeText: 'current === null',
    visitedIndices: LINKED_LIST.map((_, i) => i),
    reachedNull: true,
  });

  return steps;
}

// ---------------------------------------------------------------------------
// Layout constants for SVG
// ---------------------------------------------------------------------------

const NODE_W = 100;
const NODE_H = 48;
const NODE_GAP = 60; // gap between nodes (arrow space)
const NULL_W = 52;
const PADDING_X = 32;
const PADDING_TOP = 52; // space for "current" pointer badge
const SVG_H = NODE_H + PADDING_TOP + 20;

function calcSVGWidth(): number {
  const nodesWidth = LINKED_LIST.length * NODE_W;
  const arrowsWidth = LINKED_LIST.length * NODE_GAP; // includes arrow to null
  return nodesWidth + arrowsWidth + NULL_W + PADDING_X * 2;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LinkedListViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const allSteps = useMemo(() => precomputeSteps(), []);
  const snap = allSteps[Math.min(step, allSteps.length - 1)];

  const svgWidth = useMemo(() => calcSVGWidth(), []);

  // Determine node state for styling
  const getNodeState = (idx: number): 'current' | 'visited' | 'unvisited' => {
    if (snap.currentIdx === idx) return 'current';
    if (snap.visitedIndices.includes(idx)) return 'visited';
    return 'unvisited';
  };

  // Is the arrow from node[idx] -> node[idx+1] traversed?
  const isArrowTraversed = (fromIdx: number): boolean => {
    // Arrow is traversed if the destination node is current or visited
    const destIdx = fromIdx + 1;
    if (destIdx >= LINKED_LIST.length) {
      // Arrow to null: traversed if we've reached null
      return snap.reachedNull;
    }
    return snap.visitedIndices.includes(destIdx) || snap.currentIdx === destIdx;
  };

  return (
    <div className="w-full rounded-xl bg-zinc-900 border border-zinc-700/60 p-5 sm:p-6 space-y-5">
      {/* ---- Header ---- */}
      <div className="text-center space-y-1">
        <h3
          className="text-lg sm:text-xl font-bold"
          style={{
            background: `linear-gradient(135deg, ${ACCENT}, #5eead4)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Linked List Traversal
        </h3>
        <p className="text-zinc-400 text-xs sm:text-sm">Following the chain of pointers</p>
      </div>

      {/* ---- Linked List SVG ---- */}
      <div className="overflow-x-auto pb-2">
        <svg
          width={svgWidth}
          height={SVG_H}
          viewBox={`0 0 ${svgWidth} ${SVG_H}`}
          className="mx-auto block"
          style={{ minWidth: svgWidth }}
          role="img"
          aria-label="Linked list traversal visualization"
        >
          <defs>
            {/* Arrowhead markers */}
            <marker
              id="arrow-teal"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L8,3 L0,6 Z" fill={ACCENT} />
            </marker>
            <marker
              id="arrow-zinc"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L8,3 L0,6 Z" fill="#52525b" />
            </marker>
            <marker id="arrow-ptr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill={ACCENT} />
            </marker>
          </defs>

          {LINKED_LIST.map((node, idx) => {
            const x = PADDING_X + idx * (NODE_W + NODE_GAP);
            const y = PADDING_TOP;
            const state = getNodeState(idx);

            // Style lookup
            const bgColor =
              state === 'current'
                ? ACCENT
                : state === 'visited'
                  ? 'rgba(20,184,166,0.2)'
                  : '#3f3f46'; // zinc-700
            const textColor =
              state === 'current' ? '#18181b' : state === 'visited' ? ACCENT : '#a1a1aa'; // zinc-400
            const borderColor =
              state === 'current'
                ? ACCENT
                : state === 'visited'
                  ? 'rgba(20,184,166,0.5)'
                  : '#52525b'; // zinc-600

            const traversed = isArrowTraversed(idx);
            const arrowColor = traversed ? ACCENT : '#52525b';
            const arrowMarker = traversed ? 'url(#arrow-teal)' : 'url(#arrow-zinc)';

            return (
              <g key={idx}>
                {/* ---- "current" pointer badge ---- */}
                {state === 'current' && (
                  <g>
                    <rect x={x + NODE_W / 2 - 32} y={0} width={64} height={22} rx={6} fill={ACCENT}>
                      <animate
                        attributeName="opacity"
                        values="1;0.7;1"
                        dur="1.2s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <text
                      x={x + NODE_W / 2}
                      y={15}
                      textAnchor="middle"
                      fill="#18181b"
                      fontSize={11}
                      fontWeight={700}
                      fontFamily="monospace"
                    >
                      current
                    </text>
                    {/* Down arrow from badge to node */}
                    <line
                      x1={x + NODE_W / 2}
                      y1={22}
                      x2={x + NODE_W / 2}
                      y2={y - 2}
                      stroke={ACCENT}
                      strokeWidth={2}
                      markerEnd="url(#arrow-ptr)"
                    />
                  </g>
                )}

                {/* ---- Node box with glow ---- */}
                {state === 'current' && (
                  <rect
                    x={x - 3}
                    y={y - 3}
                    width={NODE_W + 6}
                    height={NODE_H + 6}
                    rx={10}
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth={2}
                    opacity={0.35}
                  >
                    <animate
                      attributeName="opacity"
                      values="0.35;0.15;0.35"
                      dur="1.2s"
                      repeatCount="indefinite"
                    />
                  </rect>
                )}

                {/* Node outer rect */}
                <rect
                  x={x}
                  y={y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={8}
                  fill={bgColor}
                  stroke={borderColor}
                  strokeWidth={1.5}
                />

                {/* Divider line (value | next) */}
                <line
                  x1={x + NODE_W * 0.6}
                  y1={y + 6}
                  x2={x + NODE_W * 0.6}
                  y2={y + NODE_H - 6}
                  stroke={borderColor}
                  strokeWidth={1}
                  opacity={0.6}
                />

                {/* Value text */}
                <text
                  x={x + NODE_W * 0.3}
                  y={y + NODE_H / 2 + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={textColor}
                  fontSize={16}
                  fontWeight={700}
                  fontFamily="monospace"
                >
                  {node.value}
                </text>

                {/* "next" label */}
                <text
                  x={x + NODE_W * 0.8}
                  y={y + NODE_H / 2 + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={state === 'current' ? '#18181b' : '#71717a'}
                  fontSize={10}
                  fontFamily="monospace"
                  opacity={0.8}
                >
                  next
                </text>

                {/* ---- Arrow to next node or null ---- */}
                {idx < LINKED_LIST.length - 1 ? (
                  <line
                    x1={x + NODE_W + 4}
                    y1={y + NODE_H / 2}
                    x2={x + NODE_W + NODE_GAP - 4}
                    y2={y + NODE_H / 2}
                    stroke={arrowColor}
                    strokeWidth={2}
                    markerEnd={arrowMarker}
                  />
                ) : (
                  <>
                    {/* Arrow from last node to null */}
                    <line
                      x1={x + NODE_W + 4}
                      y1={y + NODE_H / 2}
                      x2={x + NODE_W + NODE_GAP - 8}
                      y2={y + NODE_H / 2}
                      stroke={arrowColor}
                      strokeWidth={2}
                      markerEnd={arrowMarker}
                    />
                    {/* null box */}
                    <rect
                      x={x + NODE_W + NODE_GAP - 4}
                      y={y + NODE_H / 2 - 14}
                      width={NULL_W}
                      height={28}
                      rx={6}
                      fill={snap.reachedNull ? 'rgba(20,184,166,0.15)' : '#27272a'}
                      stroke={snap.reachedNull ? ACCENT : '#3f3f46'}
                      strokeWidth={1}
                    />
                    <text
                      x={x + NODE_W + NODE_GAP - 4 + NULL_W / 2}
                      y={y + NODE_H / 2 + 1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={snap.reachedNull ? ACCENT : '#71717a'}
                      fontSize={13}
                      fontWeight={600}
                      fontFamily="monospace"
                    >
                      null
                    </text>

                    {/* "current" badge above null when reached */}
                    {snap.reachedNull && (
                      <g>
                        <rect
                          x={x + NODE_W + NODE_GAP - 4 + NULL_W / 2 - 32}
                          y={0}
                          width={64}
                          height={22}
                          rx={6}
                          fill={ACCENT}
                        >
                          <animate
                            attributeName="opacity"
                            values="1;0.7;1"
                            dur="1.2s"
                            repeatCount="indefinite"
                          />
                        </rect>
                        <text
                          x={x + NODE_W + NODE_GAP - 4 + NULL_W / 2}
                          y={15}
                          textAnchor="middle"
                          fill="#18181b"
                          fontSize={11}
                          fontWeight={700}
                          fontFamily="monospace"
                        >
                          current
                        </text>
                        <line
                          x1={x + NODE_W + NODE_GAP - 4 + NULL_W / 2}
                          y1={22}
                          x2={x + NODE_W + NODE_GAP - 4 + NULL_W / 2}
                          y2={y + NODE_H / 2 - 16}
                          stroke={ACCENT}
                          strokeWidth={2}
                          markerEnd="url(#arrow-ptr)"
                        />
                      </g>
                    )}
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* ---- Code-like display ---- */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
        <div className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700/60 font-mono text-sm">
          <span className="text-zinc-500">{'> '}</span>
          <span style={{ color: ACCENT }}>{snap.codeText}</span>
        </div>

        {snap.reachedNull && (
          <div className="px-3 py-1.5 rounded-md bg-teal-900/30 border border-teal-700/40 text-teal-300 text-xs font-semibold">
            End of list
          </div>
        )}
      </div>

      {/* ---- Collected output ---- */}
      <div className="text-center">
        <span className="text-zinc-500 text-xs font-mono">Collected: </span>
        <span className="font-mono text-sm" style={{ color: ACCENT }}>
          {'['}
          {snap.collected.join(', ')}
          {']'}
        </span>
      </div>

      {/* ---- Controls ---- */}
      <VizControls controls={controls} accentColor={ACCENT} />
    </div>
  );
}
