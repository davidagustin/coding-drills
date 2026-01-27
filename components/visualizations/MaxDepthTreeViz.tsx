'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const TREE: TreeNode = {
  value: 3,
  left: {
    value: 9,
    left: null,
    right: null,
  },
  right: {
    value: 20,
    left: { value: 15, left: null, right: null },
    right: { value: 7, left: null, right: null },
  },
};

interface DepthStep {
  node: number | null;
  depth: number;
  maxDepth: number;
  explanation: string;
}

function computeSteps(): DepthStep[] {
  const steps: DepthStep[] = [];
  let maxDepth = 0;

  function maxDepthTree(node: TreeNode | null, depth: number): number {
    if (!node) {
      steps.push({
        node: null,
        depth,
        maxDepth,
        explanation: `Null node at depth ${depth}`,
      });
      return depth;
    }

    steps.push({
      node: node.value,
      depth,
      maxDepth,
      explanation: `Visiting node ${node.value} at depth ${depth}`,
    });

    const leftDepth = maxDepthTree(node.left, depth + 1);
    const rightDepth = maxDepthTree(node.right, depth + 1);

    const currentMax = Math.max(leftDepth, rightDepth);
    maxDepth = Math.max(maxDepth, currentMax);

    steps.push({
      node: node.value,
      depth,
      maxDepth,
      explanation: `Node ${node.value}: max depth = ${currentMax}`,
    });

    return currentMax;
  }

  steps.push({
    node: null,
    depth: 0,
    maxDepth: 0,
    explanation: 'Start: Find maximum depth',
  });

  const result = maxDepthTree(TREE, 0);

  steps.push({
    node: null,
    depth: result,
    maxDepth: result,
    explanation: `Complete: Maximum depth = ${result}`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  visited: '#22c55e',
  default: '#3b82f6',
} as const;

function renderTree(
  node: TreeNode | null,
  x: number,
  y: number,
  level: number,
  currentStep: DepthStep,
  visited: Set<number>,
): React.ReactElement | null {
  if (!node) return null;

  const isCurrent = currentStep.node === node.value;
  const isVisited = visited.has(node.value);

  let nodeColor: string = COLORS.default;
  if (isCurrent) nodeColor = COLORS.current;
  else if (isVisited) nodeColor = COLORS.visited;

  const spacing = 120 / 2 ** level;
  const leftX = x - spacing;
  const rightX = x + spacing;
  const childY = y + 80;

  return (
    <g key={`node-${node.value}-${level}`}>
      <circle cx={x} cy={y} r={20} fill={nodeColor} stroke="#fff" strokeWidth={2} />
      <text x={x} y={y + 5} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">
        {node.value}
      </text>
      <text x={x} y={y + 35} textAnchor="middle" fill="#6b7280" fontSize="10">
        d:{level}
      </text>
      {node.left && (
        <>
          <line x1={x} y1={y + 20} x2={leftX} y2={childY - 20} stroke="#6b7280" strokeWidth={2} />
          {renderTree(node.left, leftX, childY, level + 1, currentStep, visited)}
        </>
      )}
      {node.right && (
        <>
          <line x1={x} y1={y + 20} x2={rightX} y2={childY - 20} stroke="#6b7280" strokeWidth={2} />
          {renderTree(node.right, rightX, childY, level + 1, currentStep, visited)}
        </>
      )}
    </g>
  );
}

export default function MaxDepthTreeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const visited = useMemo(() => {
    const v = new Set<number>();
    for (let i = 0; i <= step && i < STEPS.length; i++) {
      const node = STEPS[i].node;
      if (node !== null) {
        v.add(node);
      }
    }
    return v;
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Maximum Depth of Binary Tree</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Maximum Depth: {currentStep.maxDepth}
          </p>
        )}
      </div>

      <div className="mb-6 p-6 bg-zinc-950 rounded-lg border border-zinc-800">
        <svg
          width="100%"
          height="400"
          viewBox="0 0 400 400"
          className="overflow-visible"
          aria-label="Binary tree visualization"
        >
          <title>Binary tree visualization</title>
          {renderTree(TREE, 200, 60, 0, currentStep, visited)}
        </svg>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
