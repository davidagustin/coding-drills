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

interface BalancedStep {
  node: number | null;
  height: number;
  isBalanced: boolean;
  explanation: string;
}

function computeSteps(): BalancedStep[] {
  const steps: BalancedStep[] = [];
  let isBalanced = true;

  function checkBalanced(node: TreeNode | null): number {
    if (!node) {
      steps.push({
        node: null,
        height: 0,
        isBalanced: true,
        explanation: 'Null node: height = 0',
      });
      return 0;
    }

    steps.push({
      node: node.value,
      height: -1,
      isBalanced: true,
      explanation: `Checking node ${node.value}`,
    });

    const leftHeight = checkBalanced(node.left);
    const rightHeight = checkBalanced(node.right);

    const heightDiff = Math.abs(leftHeight - rightHeight);
    const currentHeight = Math.max(leftHeight, rightHeight) + 1;
    const nodeBalanced = heightDiff <= 1;

    if (!nodeBalanced) {
      isBalanced = false;
    }

    steps.push({
      node: node.value,
      height: currentHeight,
      isBalanced: nodeBalanced,
      explanation: nodeBalanced
        ? `Node ${node.value}: heights ${leftHeight} and ${rightHeight}, diff = ${heightDiff} ≤ 1 ✓`
        : `Node ${node.value}: heights ${leftHeight} and ${rightHeight}, diff = ${heightDiff} > 1 ✗`,
    });

    return currentHeight;
  }

  steps.push({
    node: null,
    height: 0,
    isBalanced: true,
    explanation: 'Start: Check if tree is balanced',
  });

  checkBalanced(TREE);

  steps.push({
    node: null,
    height: 0,
    isBalanced,
    explanation: isBalanced ? 'Complete: Tree is balanced' : 'Complete: Tree is not balanced',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  balanced: '#22c55e',
  unbalanced: '#ef4444',
  default: '#3b82f6',
} as const;

function renderTree(
  node: TreeNode | null,
  x: number,
  y: number,
  level: number,
  currentStep: BalancedStep,
  nodeBalanced: Map<number, boolean>,
): React.ReactElement | null {
  if (!node) return null;

  const isCurrent = currentStep.node === node.value;
  const balanced = nodeBalanced.get(node.value) ?? true;

  let nodeColor: string = COLORS.default;
  if (isCurrent) {
    nodeColor = balanced ? COLORS.balanced : COLORS.unbalanced;
  } else if (!balanced) {
    nodeColor = COLORS.unbalanced;
  }

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
      {currentStep.height > 0 && (
        <text x={x} y={y + 35} textAnchor="middle" fill="#6b7280" fontSize="10">
          h:{currentStep.height}
        </text>
      )}
      {node.left && (
        <>
          <line x1={x} y1={y + 20} x2={leftX} y2={childY - 20} stroke="#6b7280" strokeWidth={2} />
          {renderTree(node.left, leftX, childY, level + 1, currentStep, nodeBalanced)}
        </>
      )}
      {node.right && (
        <>
          <line x1={x} y1={y + 20} x2={rightX} y2={childY - 20} stroke="#6b7280" strokeWidth={2} />
          {renderTree(node.right, rightX, childY, level + 1, currentStep, nodeBalanced)}
        </>
      )}
    </g>
  );
}

export default function BalancedTreeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const nodeBalanced = useMemo(() => {
    const map = new Map<number, boolean>();
    for (let i = 0; i <= step && i < STEPS.length; i++) {
      if (STEPS[i].node !== null) {
        map.set(STEPS[i].node!, STEPS[i].isBalanced);
      }
    }
    return map;
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Balanced Binary Tree</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p
            className={`font-bold text-lg mt-2 ${currentStep.isBalanced ? 'text-green-400' : 'text-red-400'}`}
          >
            {currentStep.isBalanced ? 'Tree is Balanced ✓' : 'Tree is Not Balanced ✗'}
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
          {renderTree(TREE, 200, 60, 0, currentStep, nodeBalanced)}
        </svg>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
