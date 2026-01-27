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
  value: 4,
  left: {
    value: 2,
    left: { value: 1, left: null, right: null },
    right: { value: 3, left: null, right: null },
  },
  right: {
    value: 7,
    left: { value: 6, left: null, right: null },
    right: { value: 9, left: null, right: null },
  },
};

interface InvertStep {
  node: number | null;
  action: string;
  tree: TreeNode;
}

function computeSteps(): InvertStep[] {
  const steps: InvertStep[] = [];

  function invertTree(node: TreeNode | null): TreeNode | null {
    if (!node) return null;

    steps.push({
      node: node.value,
      action: `Inverting node ${node.value}`,
      tree: JSON.parse(JSON.stringify(TREE)),
    });

    const left = invertTree(node.left);
    const right = invertTree(node.right);

    node.left = right;
    node.right = left;

    steps.push({
      node: node.value,
      action: `Swapped children of node ${node.value}`,
      tree: JSON.parse(JSON.stringify(TREE)),
    });

    return node;
  }

  steps.push({
    node: null,
    action: 'Start: Invert binary tree',
    tree: JSON.parse(JSON.stringify(TREE)),
  });

  invertTree(TREE);

  steps.push({
    node: null,
    action: 'Complete: Tree inverted',
    tree: JSON.parse(JSON.stringify(TREE)),
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
  currentStep: InvertStep,
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

export default function InvertTreeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const visited = useMemo(() => {
    const v = new Set<number>();
    for (let i = 0; i <= step && i < STEPS.length; i++) {
      if (STEPS[i].node !== null) {
        v.add(STEPS[i].node!);
      }
    }
    return v;
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Invert Binary Tree</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.action}</p>
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
          {renderTree(currentStep.tree, 200, 60, 0, currentStep, visited)}
        </svg>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
