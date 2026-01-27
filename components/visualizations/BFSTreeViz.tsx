'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Tree definition                                                    */
/* ------------------------------------------------------------------ */

interface TreeNode {
  id: number;
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

const tree: TreeNode = {
  id: 0,
  value: 1,
  left: {
    id: 1,
    value: 2,
    left: { id: 3, value: 4 },
    right: { id: 4, value: 5 },
  },
  right: {
    id: 2,
    value: 3,
    left: { id: 5, value: 6 },
    right: { id: 6, value: 7 },
  },
};

/* ------------------------------------------------------------------ */
/*  Layout coordinates for each node (centered in SVG viewport)        */
/* ------------------------------------------------------------------ */

interface NodeLayout {
  id: number;
  value: number;
  x: number;
  y: number;
  parentId: number | null;
}

const NODE_SIZE = 48;
const SVG_WIDTH = 440;
const SVG_HEIGHT = 220;

const LEVEL_HEIGHT = 70;
const CENTER_X = SVG_WIDTH / 2;
const TOP_Y = 40;

const nodeLayouts: NodeLayout[] = [
  // Level 0
  { id: 0, value: 1, x: CENTER_X, y: TOP_Y, parentId: null },
  // Level 1
  { id: 1, value: 2, x: CENTER_X - 110, y: TOP_Y + LEVEL_HEIGHT, parentId: 0 },
  { id: 2, value: 3, x: CENTER_X + 110, y: TOP_Y + LEVEL_HEIGHT, parentId: 0 },
  // Level 2
  { id: 3, value: 4, x: CENTER_X - 165, y: TOP_Y + LEVEL_HEIGHT * 2, parentId: 1 },
  { id: 4, value: 5, x: CENTER_X - 55, y: TOP_Y + LEVEL_HEIGHT * 2, parentId: 1 },
  { id: 5, value: 6, x: CENTER_X + 55, y: TOP_Y + LEVEL_HEIGHT * 2, parentId: 2 },
  { id: 6, value: 7, x: CENTER_X + 165, y: TOP_Y + LEVEL_HEIGHT * 2, parentId: 2 },
];

/* ------------------------------------------------------------------ */
/*  Pre-computed BFS steps                                             */
/*                                                                     */
/*  Each step represents dequeuing the front node, marking it as       */
/*  "processing", and enqueuing its children. The visualization shows  */
/*  the state AFTER that step completes.                               */
/* ------------------------------------------------------------------ */

interface BFSStepState {
  /** Node currently being processed (highlighted) */
  processingId: number;
  /** Node IDs currently in the queue (after enqueueing children) */
  queueIds: number[];
  /** Node IDs that have been fully visited (dequeued + processed) */
  visitedIds: number[];
  /** Description of what is happening in this step */
  description: string;
}

function precomputeSteps(): BFSStepState[] {
  const steps: BFSStepState[] = [];
  const queue: TreeNode[] = [tree];
  const visited: number[] = [];

  // Helper to get children node objects
  function getChildren(node: TreeNode): TreeNode[] {
    const children: TreeNode[] = [];
    if (node.left) children.push(node.left);
    if (node.right) children.push(node.right);
    return children;
  }

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break;
    const children = getChildren(current);

    // Enqueue children
    for (const child of children) {
      queue.push(child);
    }

    // Mark current as visited after processing
    visited.push(current.id);

    const childrenStr =
      children.length > 0
        ? `enqueue ${children.map((c) => c.value).join(', ')}`
        : 'no children to enqueue';

    steps.push({
      processingId: current.id,
      queueIds: queue.map((n) => n.id),
      visitedIds: [...visited],
      description: `Dequeue ${current.value} -- ${childrenStr}`,
    });
  }

  return steps;
}

const STEPS = precomputeSteps();
const TOTAL_STEPS = STEPS.length; // 7

/* ------------------------------------------------------------------ */
/*  Node status classification                                         */
/* ------------------------------------------------------------------ */

type NodeStatus = 'unvisited' | 'queued' | 'processing' | 'visited';

function getNodeStatus(nodeId: number, stepState: BFSStepState | null): NodeStatus {
  if (!stepState) return 'unvisited';
  if (stepState.processingId === nodeId) return 'processing';
  if (stepState.visitedIds.includes(nodeId)) return 'visited';
  if (stepState.queueIds.includes(nodeId)) return 'queued';
  return 'unvisited';
}

/* ------------------------------------------------------------------ */
/*  Styling helpers                                                    */
/* ------------------------------------------------------------------ */

function nodeStyles(status: NodeStatus) {
  switch (status) {
    case 'unvisited':
      return {
        fill: '#3f3f46', // zinc-700
        stroke: '#52525b', // zinc-600
        textFill: '#a1a1aa', // zinc-400
        filter: '',
      };
    case 'queued':
      return {
        fill: '#18181b', // zinc-900
        stroke: '#06b6d4', // cyan-500
        textFill: '#06b6d4',
        filter: '',
      };
    case 'processing':
      return {
        fill: '#06b6d4', // cyan-500
        stroke: '#22d3ee', // cyan-400
        textFill: '#18181b', // dark text
        filter: 'url(#glow)',
      };
    case 'visited':
      return {
        fill: 'rgba(6,182,212,0.15)', // cyan/20 bg
        stroke: 'rgba(6,182,212,0.4)',
        textFill: '#06b6d4',
        filter: '',
      };
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BFSTreeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const currentStep = controls.state.step;

  // Current BFS state (null means step 0 = initial, no processing yet)
  const stepState: BFSStepState | null = useMemo(() => {
    if (currentStep === 0) return null;
    return STEPS[currentStep - 1];
  }, [currentStep]);

  // Queue values to display
  const queueValues = useMemo(() => {
    if (!stepState) return [tree.value]; // initial queue has root
    return stepState.queueIds.map((id) => nodeLayouts.find((n) => n.id === id)?.value);
  }, [stepState]);

  // Visited values to display
  const visitedValues = useMemo(() => {
    if (!stepState) return [];
    return stepState.visitedIds.map((id) => nodeLayouts.find((n) => n.id === id)?.value);
  }, [stepState]);

  // Description text
  const description = useMemo(() => {
    if (currentStep === 0) return 'Press Play or Step to begin BFS traversal.';
    return STEPS[currentStep - 1].description;
  }, [currentStep]);

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-5">
      {/* Title */}
      <h3
        className="text-center text-lg font-bold tracking-tight"
        style={{
          background: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        BFS Tree Traversal
      </h3>

      {/* Step description */}
      <p className="text-center text-sm text-zinc-400 min-h-[20px] transition-all duration-300">
        {description}
      </p>

      {/* Tree SVG */}
      <div className="flex justify-center">
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          width={SVG_WIDTH}
          height={SVG_HEIGHT}
          className="max-w-full"
          role="img"
          aria-label="BFS tree traversal visualization"
        >
          <defs>
            {/* Glow filter for processing node */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feFlood floodColor="#06b6d4" floodOpacity="0.6" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="shadow" />
              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Pulsing animation for queued nodes */}
            <style>
              {`
                @keyframes pulse-border {
                  0%, 100% { stroke-opacity: 1; }
                  50% { stroke-opacity: 0.4; }
                }
                .queued-pulse {
                  animation: pulse-border 1.2s ease-in-out infinite;
                }
              `}
            </style>
          </defs>

          {/* Edges (drawn first so they appear behind nodes) */}
          {nodeLayouts
            .filter((n) => n.parentId !== null)
            .map((node) => {
              const parent = nodeLayouts.find((p) => p.id === node.parentId);
              if (!parent) return null;
              return (
                <line
                  key={`edge-${node.id}`}
                  x1={parent.x}
                  y1={parent.y}
                  x2={node.x}
                  y2={node.y}
                  stroke="#52525b"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              );
            })}

          {/* Nodes */}
          {nodeLayouts.map((node) => {
            const status = getNodeStatus(node.id, stepState);
            const styles = nodeStyles(status);
            const r = NODE_SIZE / 2;

            return (
              <g key={`node-${node.id}`} filter={styles.filter}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={r}
                  fill={styles.fill}
                  stroke={styles.stroke}
                  strokeWidth={status === 'queued' ? 2.5 : 2}
                  className={status === 'queued' ? 'queued-pulse' : ''}
                  style={{
                    transition: 'fill 0.3s ease, stroke 0.3s ease',
                  }}
                />
                <text
                  x={node.x}
                  y={node.y}
                  dy="0.35em"
                  textAnchor="middle"
                  fill={styles.textFill}
                  fontSize={18}
                  fontWeight={700}
                  fontFamily="ui-monospace, monospace"
                  style={{
                    transition: 'fill 0.3s ease',
                    pointerEvents: 'none',
                  }}
                >
                  {node.value}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Queue display */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 justify-center">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Queue
          </span>
          <div className="flex items-center gap-1.5 min-h-[32px] flex-wrap justify-center">
            {queueValues.length === 0 ? (
              <span className="text-xs text-zinc-600 italic">empty</span>
            ) : (
              queueValues.map((val, i) => (
                <span
                  key={`queue-${val}-${i}`}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md text-sm font-bold border"
                  style={{
                    background: i === 0 ? 'rgba(6,182,212,0.15)' : '#27272a',
                    borderColor: i === 0 ? '#06b6d4' : '#3f3f46',
                    color: i === 0 ? '#06b6d4' : '#a1a1aa',
                    animation: 'fadeSlideIn 0.3s ease forwards',
                  }}
                >
                  {val}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Visited / Output display */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 justify-center">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Visited
          </span>
          <div className="flex items-center gap-1.5 min-h-[32px] flex-wrap justify-center">
            {visitedValues.length === 0 ? (
              <span className="text-xs text-zinc-600 italic">none yet</span>
            ) : (
              visitedValues.map((val, i) => (
                <span
                  key={`visited-${val}-${i}`}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md text-sm font-bold"
                  style={{
                    background: 'rgba(6,182,212,0.12)',
                    color: '#22d3ee',
                    animation: 'fadeSlideIn 0.3s ease forwards',
                    animationDelay: `${i * 50}ms`,
                  }}
                >
                  {val}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Step counter */}
      <div className="text-center text-xs text-zinc-600">
        Step {currentStep} / {TOTAL_STEPS}
      </div>

      {/* Shared controls */}
      <VizControls controls={controls} accentColor="#06b6d4" />

      {/* Inline keyframes for slide-in animation */}
      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(6px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
