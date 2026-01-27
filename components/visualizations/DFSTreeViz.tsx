'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ──────────────────────────────────────────────
// Tree data model
// ──────────────────────────────────────────────

interface TreeNode {
  val: number;
  left?: TreeNode;
  right?: TreeNode;
}

/** Build the fixed binary tree:
 *          1
 *         / \
 *        2   3
 *       / \ / \
 *      4  5 6  7
 */
function buildTree(): TreeNode {
  return {
    val: 1,
    left: {
      val: 2,
      left: { val: 4 },
      right: { val: 5 },
    },
    right: {
      val: 3,
      left: { val: 6 },
      right: { val: 7 },
    },
  };
}

// ──────────────────────────────────────────────
// Layout: compute (x, y) positions for each node
// ──────────────────────────────────────────────

interface LayoutNode {
  val: number;
  x: number;
  y: number;
  left?: LayoutNode;
  right?: LayoutNode;
}

/**
 * Assigns pixel-positions to every node.
 * Level 0 centred at (cx, topY), children spread by `xSpread / 2^level`.
 */
function layoutTree(
  node: TreeNode | undefined,
  cx: number,
  cy: number,
  xSpread: number,
  yGap: number,
): LayoutNode | undefined {
  if (!node) return undefined;
  return {
    val: node.val,
    x: cx,
    y: cy,
    left: layoutTree(node.left, cx - xSpread / 2, cy + yGap, xSpread / 2, yGap),
    right: layoutTree(node.right, cx + xSpread / 2, cy + yGap, xSpread / 2, yGap),
  };
}

/** Flatten tree to an array for easy iteration */
function flattenLayout(node: LayoutNode | undefined): LayoutNode[] {
  if (!node) return [];
  return [node, ...flattenLayout(node.left), ...flattenLayout(node.right)];
}

/** Collect parent-child edges */
interface Edge {
  from: number; // parent val
  to: number; // child val
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function collectEdges(node: LayoutNode | undefined): Edge[] {
  if (!node) return [];
  const edges: Edge[] = [];
  if (node.left) {
    edges.push({
      from: node.val,
      to: node.left.val,
      x1: node.x,
      y1: node.y,
      x2: node.left.x,
      y2: node.left.y,
    });
    edges.push(...collectEdges(node.left));
  }
  if (node.right) {
    edges.push({
      from: node.val,
      to: node.right.val,
      x1: node.x,
      y1: node.y,
      x2: node.right.x,
      y2: node.right.y,
    });
    edges.push(...collectEdges(node.right));
  }
  return edges;
}

// ──────────────────────────────────────────────
// DFS step pre-computation
// ──────────────────────────────────────────────

type StepAction = 'push' | 'visit' | 'pop';

interface DFSStep {
  action: StepAction;
  nodeVal: number;
  /** The stack state AFTER this step */
  stack: number[];
  /** The visited output AFTER this step */
  visited: number[];
  /** Edge being traversed (parent -> child) when pushing */
  activeEdge: { from: number; to: number } | null;
  /** Current recursion depth (stack size during visit) */
  depth: number;
  /** The node currently being "looked at" */
  currentNode: number;
  /** Human-readable description */
  description: string;
}

/**
 * Pre-computes every animation step for a pre-order DFS.
 *
 * For each node we generate:
 *   1. PUSH  -- node is placed on the call stack (edge from parent highlights)
 *   2. VISIT -- node is "processed" (added to visited output)
 *   3. (recurse left, recurse right)
 *   4. POP   -- node returns from the call stack
 */
function precomputeSteps(): DFSStep[] {
  const steps: DFSStep[] = [];
  const stack: number[] = [];
  const visited: number[] = [];

  function dfs(node: TreeNode | undefined, parent: number | null) {
    if (!node) return;

    // 1. Push onto call stack
    stack.push(node.val);
    steps.push({
      action: 'push',
      nodeVal: node.val,
      stack: [...stack],
      visited: [...visited],
      activeEdge: parent !== null ? { from: parent, to: node.val } : null,
      depth: stack.length,
      currentNode: node.val,
      description:
        parent !== null
          ? `Push ${node.val} onto stack (from ${parent})`
          : `Push root ${node.val} onto stack`,
    });

    // 2. Visit (pre-order: process before children)
    visited.push(node.val);
    steps.push({
      action: 'visit',
      nodeVal: node.val,
      stack: [...stack],
      visited: [...visited],
      activeEdge: null,
      depth: stack.length,
      currentNode: node.val,
      description: `Visit node ${node.val} -- add to output`,
    });

    // 3. Recurse left, then right
    dfs(node.left, node.val);
    dfs(node.right, node.val);

    // 4. Pop from call stack (backtrack)
    stack.pop();
    steps.push({
      action: 'pop',
      nodeVal: node.val,
      stack: [...stack],
      visited: [...visited],
      activeEdge: null,
      depth: stack.length,
      currentNode: stack.length > 0 ? stack[stack.length - 1] : node.val,
      description: `Pop ${node.val} -- backtrack${stack.length > 0 ? ` to ${stack[stack.length - 1]}` : ''}`,
    });
  }

  dfs(buildTree(), null);
  return steps;
}

// ──────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────

const ACCENT = '#a855f7';
const ACCENT_DIM = 'rgba(168,85,247,0.2)';
const NODE_R = 24; // radius in SVG units
const SVG_W = 360;
const SVG_H = 220;

// ──────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────

export default function DFSTreeViz() {
  // Pre-compute layout + steps once
  const { nodes, edges, steps } = useMemo(() => {
    const tree = buildTree();
    const root = layoutTree(tree, SVG_W / 2, 40, 160, 60);
    return {
      nodes: flattenLayout(root),
      edges: collectEdges(root),
      steps: precomputeSteps(),
    };
  }, []);

  const controls = useVizAnimation(steps.length);
  const { step } = controls.state;

  // Derive current DFS state from step index
  const currentStep: DFSStep | null = step > 0 ? steps[step - 1] : null;

  const stackDisplay = useMemo(() => currentStep?.stack ?? [], [currentStep]);
  const visitedDisplay = useMemo(() => currentStep?.visited ?? [], [currentStep]);
  const activeEdge = currentStep?.activeEdge ?? null;
  const currentNodeVal = currentStep?.currentNode ?? null;
  const currentDepth = currentStep?.depth ?? 0;
  const description = currentStep?.description ?? 'Press Play or Step to begin DFS traversal';
  const currentAction = currentStep?.action ?? null;

  // Derive sets for colouring
  const visitedSet = useMemo(() => new Set(visitedDisplay), [visitedDisplay]);
  const stackSet = useMemo(() => new Set(stackDisplay), [stackDisplay]);

  /** Determine visual state of a node */
  function nodeState(val: number): 'current' | 'onStack' | 'visited' | 'unvisited' {
    if (val === currentNodeVal && (currentAction === 'visit' || currentAction === 'push'))
      return 'current';
    if (stackSet.has(val)) return 'onStack';
    if (visitedSet.has(val)) return 'visited';
    return 'unvisited';
  }

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl bg-zinc-900 border border-zinc-700/60 p-5 shadow-lg space-y-4">
      {/* Title */}
      <h3 className="text-center text-lg font-bold tracking-tight">
        <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: `linear-gradient(135deg, ${ACCENT}, #c084fc)` }}
        >
          DFS Tree Traversal
        </span>
      </h3>

      {/* Description + Depth indicator */}
      <div className="flex items-center justify-between gap-2 text-xs">
        <p className="text-zinc-400 flex-1 min-w-0 truncate">{description}</p>
        <span
          className="shrink-0 px-2 py-0.5 rounded font-mono text-xs font-semibold"
          style={{
            background: currentDepth > 0 ? ACCENT_DIM : 'transparent',
            color: currentDepth > 0 ? ACCENT : '#71717a',
          }}
        >
          Depth: {currentDepth}
        </span>
      </div>

      {/* Main content: tree SVG + stack panel */}
      <div className="flex gap-4">
        {/* SVG tree */}
        <div className="flex-1 min-w-0">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="w-full"
            style={{ maxHeight: 240 }}
            role="img"
            aria-label="DFS tree traversal visualization"
          >
            {/* Glow filter for active elements */}
            <defs>
              <filter id="dfs-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="dfs-edge-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Edges */}
            {edges.map((e) => {
              const isActive =
                activeEdge !== null && activeEdge.from === e.from && activeEdge.to === e.to;
              return (
                <line
                  key={`${e.from}-${e.to}`}
                  x1={e.x1}
                  y1={e.y1}
                  x2={e.x2}
                  y2={e.y2}
                  stroke={isActive ? ACCENT : '#52525b'}
                  strokeWidth={isActive ? 3 : 1.5}
                  strokeLinecap="round"
                  filter={isActive ? 'url(#dfs-edge-glow)' : undefined}
                  style={{
                    transition: 'stroke 0.3s, stroke-width 0.3s',
                  }}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((n) => {
              const state = nodeState(n.val);
              const isCurrent = state === 'current';
              const isOnStack = state === 'onStack';
              const isVisited = state === 'visited';

              let fill = '#3f3f46'; // zinc-700 unvisited
              let stroke = '#52525b';
              let strokeW = 1.5;
              let textFill = '#a1a1aa'; // zinc-400
              let strokeDash = 'none';
              let filterAttr: string | undefined;

              if (isCurrent) {
                fill = ACCENT;
                stroke = ACCENT;
                strokeW = 2;
                textFill = '#18181b'; // dark text on purple
                filterAttr = 'url(#dfs-glow)';
              } else if (isOnStack) {
                fill = '#3f3f46';
                stroke = ACCENT;
                strokeW = 2;
                strokeDash = '4 3';
                textFill = ACCENT;
              } else if (isVisited) {
                fill = ACCENT_DIM;
                stroke = 'rgba(168,85,247,0.4)';
                strokeW = 1.5;
                textFill = ACCENT;
              }

              return (
                <g key={n.val}>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={NODE_R}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={strokeW}
                    strokeDasharray={strokeDash}
                    filter={filterAttr}
                    style={{ transition: 'fill 0.3s, stroke 0.3s' }}
                  >
                    {isCurrent && (
                      <animate
                        attributeName="r"
                        values={`${NODE_R};${NODE_R + 3};${NODE_R}`}
                        dur="0.8s"
                        repeatCount="indefinite"
                      />
                    )}
                  </circle>
                  <text
                    x={n.x}
                    y={n.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={textFill}
                    fontSize="14"
                    fontWeight="700"
                    fontFamily="ui-monospace, monospace"
                    style={{ transition: 'fill 0.3s', pointerEvents: 'none' }}
                  >
                    {n.val}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Stack panel (right side, vertical LIFO) */}
        <div className="shrink-0 w-20 flex flex-col items-center">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-1">
            Stack
          </span>
          <div className="relative flex flex-col-reverse items-center gap-1 min-h-[140px] w-full rounded-lg border border-zinc-700/50 bg-zinc-800/60 p-2">
            {stackDisplay.length === 0 && (
              <span className="text-zinc-600 text-[10px] italic mt-auto mb-auto">empty</span>
            )}
            {stackDisplay.map((val, idx) => {
              const isTop = idx === stackDisplay.length - 1;
              return (
                <div
                  key={`${val}-${idx}`}
                  className="flex items-center justify-center rounded text-xs font-bold font-mono transition-all duration-300"
                  style={{
                    width: 40,
                    height: 28,
                    background: isTop ? ACCENT : ACCENT_DIM,
                    color: isTop ? '#18181b' : ACCENT,
                    border: isTop ? `2px solid ${ACCENT}` : '1px solid rgba(168,85,247,0.3)',
                    boxShadow: isTop ? `0 0 10px ${ACCENT}55` : 'none',
                  }}
                >
                  {val}
                </div>
              );
            })}
            {/* Top-of-stack label */}
            {stackDisplay.length > 0 && (
              <span className="text-[8px] text-zinc-500 mt-0.5">TOP</span>
            )}
          </div>
        </div>
      </div>

      {/* Visited output array */}
      <div className="space-y-1">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
          Visited Output
        </span>
        <div className="flex items-center gap-1.5 flex-wrap min-h-[36px] rounded-lg border border-zinc-700/50 bg-zinc-800/60 px-3 py-2">
          {visitedDisplay.length === 0 && (
            <span className="text-zinc-600 text-xs italic">none yet</span>
          )}
          {visitedDisplay.map((val, idx) => (
            <span
              key={`${val}-${idx}`}
              className="inline-flex items-center justify-center rounded font-mono text-xs font-bold transition-all duration-300"
              style={{
                width: 32,
                height: 28,
                background:
                  idx === visitedDisplay.length - 1 && currentAction === 'visit'
                    ? ACCENT
                    : ACCENT_DIM,
                color:
                  idx === visitedDisplay.length - 1 && currentAction === 'visit'
                    ? '#18181b'
                    : ACCENT,
                boxShadow:
                  idx === visitedDisplay.length - 1 && currentAction === 'visit'
                    ? `0 0 8px ${ACCENT}55`
                    : 'none',
              }}
            >
              {val}
            </span>
          ))}
          {visitedDisplay.length > 0 && (
            <span className="text-zinc-500 text-[10px] ml-1">[{visitedDisplay.join(', ')}]</span>
          )}
        </div>
      </div>

      {/* Step counter */}
      <div className="text-center text-[10px] text-zinc-600 font-mono">
        Step {step} / {steps.length}
      </div>

      {/* Shared controls */}
      <VizControls controls={controls} accentColor={ACCENT} />
    </div>
  );
}
