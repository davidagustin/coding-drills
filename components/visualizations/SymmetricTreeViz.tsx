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
  value: 1,
  left: {
    value: 2,
    left: { value: 3, left: null, right: null },
    right: { value: 4, left: null, right: null },
  },
  right: {
    value: 2,
    left: { value: 4, left: null, right: null },
    right: { value: 3, left: null, right: null },
  },
};

interface SymmetricStep {
  node1: number | null;
  node2: number | null;
  isSymmetric: boolean;
  explanation: string;
}

function computeSteps(): SymmetricStep[] {
  const steps: SymmetricStep[] = [];

  function isSymmetric(left: TreeNode | null, right: TreeNode | null): boolean {
    if (!left && !right) {
      steps.push({
        node1: null,
        node2: null,
        isSymmetric: true,
        explanation: 'Both nodes are null → symmetric',
      });
      return true;
    }

    if (!left || !right) {
      steps.push({
        node1: left?.value ?? null,
        node2: right?.value ?? null,
        isSymmetric: false,
        explanation: 'One node is null, other is not → not symmetric',
      });
      return false;
    }

    if (left.value !== right.value) {
      steps.push({
        node1: left.value,
        node2: right.value,
        isSymmetric: false,
        explanation: `Values differ: ${left.value} ≠ ${right.value}`,
      });
      return false;
    }

    steps.push({
      node1: left.value,
      node2: right.value,
      isSymmetric: true,
      explanation: `Values match: ${left.value} = ${right.value}, checking children`,
    });

    const outerMatch = isSymmetric(left.left, right.right);
    if (!outerMatch) return false;

    const innerMatch = isSymmetric(left.right, right.left);
    return innerMatch;
  }

  steps.push({
    node1: null,
    node2: null,
    isSymmetric: false,
    explanation: 'Start: Check if tree is symmetric',
  });

  if (!TREE) {
    steps.push({
      node1: null,
      node2: null,
      isSymmetric: true,
      explanation: 'Empty tree is symmetric',
    });
    return steps;
  }

  const result = isSymmetric(TREE.left, TREE.right);

  steps.push({
    node1: null,
    node2: null,
    isSymmetric: result,
    explanation: result ? 'Complete: Tree is symmetric' : 'Complete: Tree is not symmetric',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  symmetric: '#22c55e',
  asymmetric: '#ef4444',
  default: '#3b82f6',
} as const;

function renderTree(
  node: TreeNode | null,
  x: number,
  y: number,
  level: number,
  currentStep: SymmetricStep,
  isLeft: boolean,
): React.ReactElement | null {
  if (!node) return null;

  const isCurrent = (isLeft ? currentStep.node1 : currentStep.node2) === node.value;
  const isMatch = currentStep.isSymmetric && isCurrent;

  let nodeColor: string = COLORS.default;
  if (isCurrent) {
    nodeColor = isMatch ? COLORS.symmetric : COLORS.asymmetric;
  }

  const spacing = 100 / 2 ** level;
  const leftX = x - spacing;
  const rightX = x + spacing;
  const childY = y + 60;

  return (
    <g key={`node-${node.value}-${level}-${isLeft}`}>
      <circle cx={x} cy={y} r={18} fill={nodeColor} stroke="#fff" strokeWidth={2} />
      <text x={x} y={y + 5} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">
        {node.value}
      </text>
      {node.left && (
        <>
          <line x1={x} y1={y + 18} x2={leftX} y2={childY - 18} stroke="#6b7280" strokeWidth={2} />
          {renderTree(node.left, leftX, childY, level + 1, currentStep, isLeft)}
        </>
      )}
      {node.right && (
        <>
          <line x1={x} y1={y + 18} x2={rightX} y2={childY - 18} stroke="#6b7280" strokeWidth={2} />
          {renderTree(node.right, rightX, childY, level + 1, currentStep, isLeft)}
        </>
      )}
    </g>
  );
}

export default function SymmetricTreeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Symmetric Tree</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p
            className={`font-bold text-lg mt-2 ${currentStep.isSymmetric ? 'text-green-400' : 'text-red-400'}`}
          >
            {currentStep.isSymmetric ? 'Tree is Symmetric ✓' : 'Tree is Not Symmetric ✗'}
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
          {TREE && (
            <>
              <circle cx={200} cy={40} r={18} fill={COLORS.default} stroke="#fff" strokeWidth={2} />
              <text x={200} y={45} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">
                {TREE.value}
              </text>
              {TREE.left && (
                <>
                  <line x1={200} y1={58} x2={100} y2={100} stroke="#6b7280" strokeWidth={2} />
                  {renderTree(TREE.left, 100, 100, 1, currentStep, true)}
                </>
              )}
              {TREE.right && (
                <>
                  <line x1={200} y1={58} x2={300} y2={100} stroke="#6b7280" strokeWidth={2} />
                  {renderTree(TREE.right, 300, 100, 1, currentStep, false)}
                </>
              )}
            </>
          )}
        </svg>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
