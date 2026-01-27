'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const TREE: TreeNode = {
  val: 1,
  left: { val: 2, left: null, right: { val: 5, left: null, right: null } },
  right: { val: 3, left: null, right: { val: 4, left: null, right: null } },
};

interface BFSStep {
  level: number;
  nodes: number[];
  rightmost: number | null;
  explanation: string;
  result: number[];
}

function computeSteps(): BFSStep[] {
  const steps: BFSStep[] = [];
  const result: number[] = [];
  const queue: Array<{ node: TreeNode; level: number }> = [{ node: TREE, level: 0 }];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const levelNodes: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const item = queue.shift();
      if (!item) break;
      const { node, level } = item;
      levelNodes.push(node.val);

      if (node.left) queue.push({ node: node.left, level: level + 1 });
      if (node.right) queue.push({ node: node.right, level: level + 1 });
    }

    const rightmost = levelNodes[levelNodes.length - 1];
    result.push(rightmost);

    steps.push({
      level: steps.length,
      nodes: [...levelNodes],
      rightmost,
      explanation: `Level ${steps.length}: [${levelNodes.join(', ')}] → Rightmost: ${rightmost}`,
      result: [...result],
    });
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  rightmost: '#22c55e',
  other: '#6b7280',
  current: '#eab308',
} as const;

function renderTree(
  node: TreeNode | null,
  x: number,
  y: number,
  level: number,
  currentStep: BFSStep | null,
  rightmostNodes: Set<number>,
): React.ReactNode {
  if (!node) return null;

  const isRightmost = rightmostNodes.has(node.val);
  const isCurrentLevel = currentStep && currentStep.level === level;

  const nodeColor = isRightmost ? COLORS.rightmost : COLORS.other;

  const spacing = 120 / 2 ** level;
  const leftX = x - spacing;
  const rightX = x + spacing;
  const nextY = y + 80;

  return (
    <g key={node.val}>
      {node.left && (
        <line x1={x} y1={y + 25} x2={leftX} y2={nextY - 25} stroke="#52525b" strokeWidth="2" />
      )}
      {node.right && (
        <line x1={x} y1={y + 25} x2={rightX} y2={nextY - 25} stroke="#52525b" strokeWidth="2" />
      )}

      <motion.circle
        cx={x}
        cy={y}
        r={25}
        fill={nodeColor}
        stroke={isCurrentLevel ? COLORS.current : '#1f2937'}
        strokeWidth={isRightmost ? '3' : '2'}
        initial={{ scale: 0 }}
        animate={{ scale: isRightmost ? 1.1 : 1 }}
      />
      <text x={x} y={y + 5} textAnchor="middle" className="font-mono font-bold text-white text-sm">
        {node.val}
      </text>

      {renderTree(node.left, leftX, nextY, level + 1, currentStep, rightmostNodes)}
      {renderTree(node.right, rightX, nextY, level + 1, currentStep, rightmostNodes)}
    </g>
  );
}

export default function RightSideViewViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const rightmostNodes = useMemo(() => {
    const s = new Set<number>();
    for (let i = 0; i <= step && i < STEPS.length; i++) {
      const rightmost = STEPS[i].rightmost;
      if (rightmost !== null) {
        s.add(rightmost);
      }
    }
    return s;
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Binary Tree Right Side View</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Result: [{currentStep.result.join(', ')}]
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
          {renderTree(TREE, 200, 60, 0, currentStep, rightmostNodes)}
        </svg>
      </div>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <div className="text-sm text-zinc-400 mb-2">Right Side View:</div>
        <div className="flex gap-2">
          {currentStep.result.map((val, idx) => (
            <span key={idx} className="px-3 py-1 rounded bg-green-500 text-white font-mono">
              {val}
            </span>
          ))}
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.rightmost} />
    </div>
  );
}
