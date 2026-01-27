'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Tree structure and validation steps                               */
/* ------------------------------------------------------------------ */

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

// Example invalid BST: root=5, left=1, right=4 (but 4 has left=3 which is < 5)
const TREE: TreeNode = {
  val: 5,
  left: { val: 1, left: null, right: null },
  right: {
    val: 4,
    left: { val: 3, left: null, right: null },
    right: { val: 6, left: null, right: null },
  },
};

interface ValidationStep {
  nodeVal: number;
  min: number;
  max: number;
  isValid: boolean;
  explanation: string;
  path: number[]; // Path from root to current node
}

function computeSteps(): ValidationStep[] {
  const steps: ValidationStep[] = [];

  function validate(node: TreeNode | null, min: number, max: number, path: number[]): boolean {
    if (!node) {
      steps.push({
        nodeVal: -1,
        min,
        max,
        isValid: true,
        explanation: 'Null node is valid',
        path: [...path],
      });
      return true;
    }

    const currentPath = [...path, node.val];

    // Check bounds
    const violatesBounds = node.val <= min || node.val >= max;

    steps.push({
      nodeVal: node.val,
      min,
      max,
      isValid: !violatesBounds,
      explanation: violatesBounds
        ? `Node ${node.val} violates bounds: must be > ${min === -Infinity ? '-∞' : min} and < ${max === Infinity ? '∞' : max}`
        : `Node ${node.val} is valid: ${min === -Infinity ? '-∞' : min} < ${node.val} < ${max === Infinity ? '∞' : max}`,
      path: currentPath,
    });

    if (violatesBounds) {
      return false;
    }

    // Validate left subtree (update max to current node)
    const leftValid = validate(node.left, min, node.val, currentPath);
    if (!leftValid) return false;

    // Validate right subtree (update min to current node)
    const rightValid = validate(node.right, node.val, max, currentPath);
    return rightValid;
  }

  validate(TREE, -Infinity, Infinity, []);

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const COLORS = {
  valid: '#10b981',
  invalid: '#ef4444',
  current: '#eab308',
  visited: '#3b82f6',
  default: '#6366f1',
} as const;

/* ------------------------------------------------------------------ */
/*  Tree rendering helper                                              */
/* ------------------------------------------------------------------ */

function renderTree(
  node: TreeNode | null,
  x: number,
  y: number,
  level: number,
  currentStep: ValidationStep | null,
  visited: Set<number>,
): React.ReactNode {
  if (!node) return null;

  const isCurrent = currentStep?.nodeVal === node.val;
  const isVisited = visited.has(node.val);
  const isValid = currentStep?.isValid ?? true;

  const nodeColor = isCurrent
    ? COLORS.current
    : isVisited
      ? isValid
        ? COLORS.valid
        : COLORS.invalid
      : COLORS.default;

  const spacing = 120 / 2 ** level;
  const leftX = x - spacing;
  const rightX = x + spacing;
  const nextY = y + 80;

  return (
    <g key={node.val}>
      {/* Edges */}
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

      {/* Node */}
      <motion.circle
        cx={x}
        cy={y}
        r={25}
        fill={nodeColor}
        stroke={isCurrent ? COLORS.current : '#1f2937'}
        strokeWidth={isCurrent ? '3' : '2'}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      <text x={x} y={y + 5} textAnchor="middle" className="font-mono font-bold text-white text-sm">
        {node.val}
      </text>

      {/* Bounds display */}
      {isCurrent && (
        <g>
          <text x={x} y={y - 40} textAnchor="middle" className="text-xs fill-zinc-400">
            min: {currentStep.min === -Infinity ? '-∞' : currentStep.min}
          </text>
          <text x={x} y={y - 25} textAnchor="middle" className="text-xs fill-zinc-400">
            max: {currentStep.max === Infinity ? '∞' : currentStep.max}
          </text>
        </g>
      )}

      {/* Children */}
      {renderTree(node.left, leftX, nextY, level + 1, currentStep, visited)}
      {renderTree(node.right, rightX, nextY, level + 1, currentStep, visited)}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ValidateBSTViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const visited = useMemo(() => {
    const v = new Set<number>();
    for (let i = 0; i <= step && i < STEPS.length; i++) {
      if (STEPS[i].nodeVal !== -1) {
        v.add(STEPS[i].nodeVal);
      }
    }
    return v;
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Validate Binary Search Tree</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {currentStep.path.length > 0 && (
          <p className="text-zinc-500 text-xs mt-2">Path: {currentStep.path.join(' → ')}</p>
        )}
      </div>

      {/* Tree Visualization */}
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

      {/* Legend */}
      <div className="mb-6 flex gap-4 justify-center flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.current }} />
          <span className="text-xs text-zinc-400">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.valid }} />
          <span className="text-xs text-zinc-400">Valid</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.invalid }} />
          <span className="text-xs text-zinc-400">Invalid</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.default }} />
          <span className="text-xs text-zinc-400">Unvisited</span>
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.default} />
    </div>
  );
}
