'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const TREE1: TreeNode = {
  value: 1,
  left: { value: 2, left: null, right: null },
  right: { value: 3, left: null, right: null },
};

const TREE2: TreeNode = {
  value: 1,
  left: { value: 2, left: null, right: null },
  right: { value: 3, left: null, right: null },
};

interface SameStep {
  node1: number | null;
  node2: number | null;
  areSame: boolean;
  explanation: string;
}

function computeSteps(): SameStep[] {
  const steps: SameStep[] = [];

  function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (!p && !q) {
      steps.push({
        node1: null,
        node2: null,
        areSame: true,
        explanation: 'Both nodes are null → same',
      });
      return true;
    }

    if (!p || !q) {
      steps.push({
        node1: p?.value ?? null,
        node2: q?.value ?? null,
        areSame: false,
        explanation: 'One node is null, other is not → different',
      });
      return false;
    }

    if (p.value !== q.value) {
      steps.push({
        node1: p.value,
        node2: q.value,
        areSame: false,
        explanation: `Values differ: ${p.value} ≠ ${q.value}`,
      });
      return false;
    }

    steps.push({
      node1: p.value,
      node2: q.value,
      areSame: true,
      explanation: `Values match: ${p.value} = ${q.value}, checking children`,
    });

    const leftSame = isSameTree(p.left, q.left);
    if (!leftSame) return false;

    const rightSame = isSameTree(p.right, q.right);
    return rightSame;
  }

  steps.push({
    node1: null,
    node2: null,
    areSame: false,
    explanation: 'Start: Check if trees are the same',
  });

  const result = isSameTree(TREE1, TREE2);

  steps.push({
    node1: null,
    node2: null,
    areSame: result,
    explanation: result ? 'Complete: Trees are the same' : 'Complete: Trees are different',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  same: '#22c55e',
  different: '#ef4444',
  default: '#3b82f6',
} as const;

function renderTree(
  node: TreeNode | null,
  x: number,
  y: number,
  level: number,
  currentStep: SameStep,
  isTree1: boolean,
): React.ReactElement | null {
  if (!node) return null;

  const isCurrent = (isTree1 ? currentStep.node1 : currentStep.node2) === node.value;
  const isSame = currentStep.areSame && isCurrent;

  let nodeColor: string = COLORS.default;
  if (isCurrent) {
    nodeColor = isSame ? COLORS.same : COLORS.different;
  }

  const spacing = 100 / 2 ** level;
  const leftX = x - spacing;
  const rightX = x + spacing;
  const childY = y + 60;

  return (
    <g key={`node-${node.value}-${level}-${isTree1}`}>
      <circle cx={x} cy={y} r={18} fill={nodeColor} stroke="#fff" strokeWidth={2} />
      <text x={x} y={y + 5} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">
        {node.value}
      </text>
      {node.left && (
        <>
          <line x1={x} y1={y + 18} x2={leftX} y2={childY - 18} stroke="#6b7280" strokeWidth={2} />
          {renderTree(node.left, leftX, childY, level + 1, currentStep, isTree1)}
        </>
      )}
      {node.right && (
        <>
          <line x1={x} y1={y + 18} x2={rightX} y2={childY - 18} stroke="#6b7280" strokeWidth={2} />
          {renderTree(node.right, rightX, childY, level + 1, currentStep, isTree1)}
        </>
      )}
    </g>
  );
}

export default function SameTreeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Same Tree</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
          <p className="text-zinc-400 text-sm mb-2 text-center">Tree 1</p>
          <svg
            width="100%"
            height="250"
            viewBox="0 0 200 250"
            className="overflow-visible"
            aria-label="Tree 1 visualization"
          >
            <title>Tree 1 visualization</title>
            {renderTree(TREE1, 100, 40, 0, currentStep, true)}
          </svg>
        </div>
        <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
          <p className="text-zinc-400 text-sm mb-2 text-center">Tree 2</p>
          <svg
            width="100%"
            height="250"
            viewBox="0 0 200 250"
            className="overflow-visible"
            aria-label="Tree 2 visualization"
          >
            <title>Tree 2 visualization</title>
            {renderTree(TREE2, 100, 40, 0, currentStep, false)}
          </svg>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
