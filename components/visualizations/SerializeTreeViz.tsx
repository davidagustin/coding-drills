'use client';

import { motion } from 'motion/react';
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
  left: { value: 2, left: null, right: null },
  right: { value: 3, left: { value: 4, left: null, right: null }, right: null },
};

interface SerializeStep {
  node: number | null;
  serialized: string[];
  explanation: string;
  phase: 'serialize' | 'complete';
}

function computeSteps(): SerializeStep[] {
  const steps: SerializeStep[] = [];
  const serialized: string[] = [];

  function preorder(node: TreeNode | null): void {
    if (!node) {
      serialized.push('null');
      steps.push({
        node: null,
        serialized: [...serialized],
        explanation: 'Null node → add "null"',
        phase: 'serialize',
      });
      return;
    }

    serialized.push(String(node.value));
    steps.push({
      node: node.value,
      serialized: [...serialized],
      explanation: `Visit node ${node.value} → add "${node.value}"`,
      phase: 'serialize',
    });

    preorder(node.left);
    preorder(node.right);
  }

  preorder(TREE);

  steps.push({
    node: null,
    serialized: [...serialized],
    explanation: `Complete: "${serialized.join(',')}"`,
    phase: 'complete',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  serialized: '#22c55e',
} as const;

function renderTree(
  node: TreeNode | null,
  x: number,
  y: number,
  level: number,
  currentStep: SerializeStep | null,
  visited: Set<number>,
): React.ReactNode {
  if (!node) return null;

  const isCurrent = currentStep?.node === node.value;
  const isVisited = visited.has(node.value);

  const spacing = 120 / 2 ** level;
  const leftX = x - spacing;
  const rightX = x + spacing;
  const nextY = y + 80;

  return (
    <g key={node.value}>
      {node.left && (
        <line
          x1={x}
          y1={y + 25}
          x2={leftX}
          y2={nextY - 25}
          stroke={isVisited ? COLORS.serialized : '#52525b'}
          strokeWidth="2"
        />
      )}
      {node.right && (
        <line
          x1={x}
          y1={y + 25}
          x2={rightX}
          y2={nextY - 25}
          stroke={isVisited ? COLORS.serialized : '#52525b'}
          strokeWidth="2"
        />
      )}

      <motion.circle
        cx={x}
        cy={y}
        r={25}
        fill={isCurrent ? COLORS.current : isVisited ? COLORS.serialized : '#3b82f6'}
        stroke={isCurrent ? COLORS.current : '#1f2937'}
        strokeWidth={isCurrent ? '3' : '2'}
        initial={{ scale: 0 }}
        animate={{ scale: isCurrent ? 1.2 : 1 }}
      />
      <text x={x} y={y + 5} textAnchor="middle" className="font-mono font-bold text-white text-sm">
        {node.value}
      </text>

      {renderTree(node.left, leftX, nextY, level + 1, currentStep, visited)}
      {renderTree(node.right, rightX, nextY, level + 1, currentStep, visited)}
    </g>
  );
}

export default function SerializeTreeViz() {
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
      <h2 className="text-2xl font-bold text-white mb-4">Serialize Binary Tree</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
      </div>

      <div className="mb-6 p-6 bg-zinc-950 rounded-lg border border-zinc-800">
        <svg
          width="100%"
          height="400"
          viewBox="0 0 400 400"
          className="overflow-visible"
          aria-label="Tree visualization"
        >
          <title>Tree visualization</title>
          {renderTree(TREE, 200, 60, 0, currentStep, visited)}
        </svg>
      </div>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <div className="text-sm text-zinc-400 mb-2">Serialized String:</div>
        <div className="flex gap-2 flex-wrap">
          {currentStep.serialized.map((token, idx) => (
            <span key={idx} className="px-3 py-1 rounded bg-zinc-700 text-white font-mono text-sm">
              {token}
            </span>
          ))}
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.serialized} />
    </div>
  );
}
