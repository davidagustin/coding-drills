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
  value: 5,
  left: {
    value: 4,
    left: {
      value: 11,
      left: { value: 7, left: null, right: null },
      right: { value: 2, left: null, right: null },
    },
    right: null,
  },
  right: {
    value: 8,
    left: { value: 13, left: null, right: null },
    right: { value: 4, left: null, right: { value: 1, left: null, right: null } },
  },
};

const TARGET_SUM = 22;

interface PathSumStep {
  node: number | null;
  currentSum: number;
  targetSum: number;
  hasPath: boolean;
  explanation: string;
}

function computeSteps(): PathSumStep[] {
  const steps: PathSumStep[] = [];

  function hasPathSum(node: TreeNode | null, currentSum: number): boolean {
    if (!node) {
      steps.push({
        node: null,
        currentSum,
        targetSum: TARGET_SUM,
        hasPath: false,
        explanation: 'Null node reached',
      });
      return false;
    }

    const newSum = currentSum + node.value;

    steps.push({
      node: node.value,
      currentSum: newSum,
      targetSum: TARGET_SUM,
      hasPath: false,
      explanation: `Visiting node ${node.value}, sum = ${newSum}`,
    });

    if (!node.left && !node.right) {
      const isMatch = newSum === TARGET_SUM;
      steps.push({
        node: node.value,
        currentSum: newSum,
        targetSum: TARGET_SUM,
        hasPath: isMatch,
        explanation: isMatch
          ? `Leaf node ${node.value}: sum ${newSum} = target ${TARGET_SUM} ✓`
          : `Leaf node ${node.value}: sum ${newSum} ≠ target ${TARGET_SUM}`,
      });
      return isMatch;
    }

    const leftHas = hasPathSum(node.left, newSum);
    if (leftHas) return true;

    const rightHas = hasPathSum(node.right, newSum);
    return rightHas;
  }

  steps.push({
    node: null,
    currentSum: 0,
    targetSum: TARGET_SUM,
    hasPath: false,
    explanation: `Start: Find path with sum = ${TARGET_SUM}`,
  });

  const result = hasPathSum(TREE, 0);

  steps.push({
    node: null,
    currentSum: 0,
    targetSum: TARGET_SUM,
    hasPath: result,
    explanation: result ? `Complete: Path found with sum ${TARGET_SUM}` : `Complete: No path found`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  found: '#22c55e',
  default: '#3b82f6',
} as const;

function renderTree(
  node: TreeNode | null,
  x: number,
  y: number,
  level: number,
  currentStep: PathSumStep,
  path: Set<number>,
): React.ReactElement | null {
  if (!node) return null;

  const isCurrent = currentStep.node === node.value;
  const inPath = currentStep.hasPath && path.has(node.value);

  let nodeColor: string = COLORS.default;
  if (isCurrent) nodeColor = COLORS.current;
  else if (inPath) nodeColor = COLORS.found;

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
          {renderTree(node.left, leftX, childY, level + 1, currentStep, path)}
        </>
      )}
      {node.right && (
        <>
          <line x1={x} y1={y + 20} x2={rightX} y2={childY - 20} stroke="#6b7280" strokeWidth={2} />
          {renderTree(node.right, rightX, childY, level + 1, currentStep, path)}
        </>
      )}
    </g>
  );
}

export default function PathSumViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const path = useMemo(() => {
    const p = new Set<number>();
    if (currentStep.hasPath && currentStep.node !== null) {
      p.add(currentStep.node);
    }
    return p;
  }, [currentStep]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Path Sum</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            {currentStep.hasPath ? 'Path Found!' : 'No Path Found'}
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
          {renderTree(TREE, 200, 60, 0, currentStep, path)}
        </svg>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
