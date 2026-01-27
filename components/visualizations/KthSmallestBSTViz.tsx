'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Tree structure and inorder traversal steps                        */
/* ------------------------------------------------------------------ */

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const TREE: TreeNode = {
  val: 5,
  left: {
    val: 3,
    left: { val: 2, left: { val: 1, left: null, right: null }, right: null },
    right: { val: 4, left: null, right: null },
  },
  right: { val: 6, left: null, right: null },
};

const K = 3;

interface TraversalStep {
  currentNode: number | null;
  count: number;
  visited: number[];
  explanation: string;
  path: number[];
}

function computeSteps(): TraversalStep[] {
  const steps: TraversalStep[] = [];
  let count = 0;
  const visited: number[] = [];

  function inorder(node: TreeNode | null, path: number[]): void {
    if (!node) return;

    const currentPath = [...path, node.val];
    inorder(node.left, currentPath);

    count++;
    visited.push(node.val);
    steps.push({
      currentNode: node.val,
      count,
      visited: [...visited],
      explanation: `Inorder visit: ${node.val} (count=${count}${count === K ? ' → Found!' : ''})`,
      path: currentPath,
    });

    if (count === K) return;

    inorder(node.right, currentPath);
  }

  inorder(TREE, []);

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  visited: '#22c55e',
  target: '#ef4444',
  default: '#3b82f6',
} as const;

function renderTree(
  node: TreeNode | null,
  x: number,
  y: number,
  level: number,
  currentStep: TraversalStep | null,
  visited: Set<number>,
): React.ReactNode {
  if (!node) return null;

  const isCurrent = currentStep?.currentNode === node.val;
  const isVisited = visited.has(node.val);
  const isTarget = currentStep?.count === K && isCurrent;

  const nodeColor = isTarget
    ? COLORS.target
    : isCurrent
      ? COLORS.current
      : isVisited
        ? COLORS.visited
        : COLORS.default;

  const spacing = 120 / 2 ** level;
  const leftX = x - spacing;
  const rightX = x + spacing;
  const nextY = y + 80;

  return (
    <g key={node.val}>
      {node.left && (
        <line
          x1={x}
          y1={y + 25}
          x2={leftX}
          y2={nextY - 25}
          stroke={isVisited ? COLORS.visited : '#52525b'}
          strokeWidth="2"
        />
      )}
      {node.right && (
        <line
          x1={x}
          y1={y + 25}
          x2={rightX}
          y2={nextY - 25}
          stroke={isVisited ? COLORS.visited : '#52525b'}
          strokeWidth="2"
        />
      )}

      <motion.circle
        cx={x}
        cy={y}
        r={25}
        fill={nodeColor}
        stroke={isCurrent ? COLORS.current : '#1f2937'}
        strokeWidth={isCurrent ? '3' : '2'}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
      <text x={x} y={y + 5} textAnchor="middle" className="font-mono font-bold text-white text-sm">
        {node.val}
      </text>

      {renderTree(node.left, leftX, nextY, level + 1, currentStep, visited)}
      {renderTree(node.right, rightX, nextY, level + 1, currentStep, visited)}
    </g>
  );
}

export default function KthSmallestBSTViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const visited = useMemo(() => {
    const v = new Set<number>();
    for (let i = 0; i <= step && i < STEPS.length; i++) {
      if (STEPS[i].currentNode !== null) {
        const node = STEPS[i].currentNode;
        if (node !== null) v.add(node);
      }
    }
    return v;
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Kth Smallest Element in BST (K={K})</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {currentStep.count === K && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Found: {currentStep.currentNode} (Kth smallest)
          </p>
        )}
      </div>

      <div className="mb-6 p-6 bg-zinc-950 rounded-lg border border-zinc-800">
        <svg
          width="100%"
          height="400"
          viewBox="0 0 400 400"
          className="overflow-visible"
          aria-label="Binary search tree visualization"
        >
          <title>Binary search tree visualization</title>
          {renderTree(TREE, 200, 60, 0, currentStep, visited)}
        </svg>
      </div>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <div className="text-sm text-zinc-400 mb-2">Inorder Traversal:</div>
        <div className="flex gap-2 flex-wrap">
          {currentStep.visited.map((val, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 rounded font-mono ${
                idx + 1 === K ? 'bg-red-500 text-white' : 'bg-zinc-700 text-zinc-300'
              }`}
            >
              {val}
            </span>
          ))}
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.default} />
    </div>
  );
}
