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
  value: 3,
  left: { value: 9, left: null, right: null },
  right: {
    value: 20,
    left: { value: 15, left: null, right: null },
    right: { value: 7, left: null, right: null },
  },
};

interface ZigzagStep {
  level: number;
  nodes: number[];
  direction: 'left-to-right' | 'right-to-left';
  explanation: string;
  result: number[][];
}

function computeSteps(): ZigzagStep[] {
  const steps: ZigzagStep[] = [];
  const result: number[][] = [];
  const queue: Array<{ node: TreeNode; level: number }> = [{ node: TREE, level: 0 }];
  let leftToRight = true;

  while (queue.length > 0) {
    const levelSize = queue.length;
    const levelNodes: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const item = queue.shift();
      if (!item) break;
      const { node, level } = item;
      levelNodes.push(node.value);

      if (node.left) queue.push({ node: node.left, level: level + 1 });
      if (node.right) queue.push({ node: node.right, level: level + 1 });
    }

    const finalLevel = leftToRight ? levelNodes : [...levelNodes].reverse();
    result.push(finalLevel);

    steps.push({
      level: steps.length,
      nodes: [...levelNodes],
      direction: leftToRight ? 'left-to-right' : 'right-to-left',
      explanation: `Level ${steps.length}: [${levelNodes.join(', ')}] → ${leftToRight ? 'L→R' : 'R→L'}: [${finalLevel.join(', ')}]`,
      result: result.map((r) => [...r]),
    });

    leftToRight = !leftToRight;
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  level0: '#3b82f6',
  level1: '#8b5cf6',
  level2: '#ec4899',
  current: '#eab308',
} as const;

function renderTree(
  node: TreeNode | null,
  x: number,
  y: number,
  level: number,
  currentStep: ZigzagStep | null,
): React.ReactNode {
  if (!node) return null;

  const isCurrentLevel = currentStep && currentStep.level === level;
  const levelColors = [COLORS.level0, COLORS.level1, COLORS.level2];
  const nodeColor = levelColors[level % levelColors.length] || COLORS.level0;

  const spacing = 120 / 2 ** level;
  const leftX = x - spacing;
  const rightX = x + spacing;
  const nextY = y + 80;

  return (
    <g key={node.value}>
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
        strokeWidth={isCurrentLevel ? '3' : '2'}
        initial={{ scale: 0 }}
        animate={{ scale: isCurrentLevel ? 1.1 : 1 }}
      />
      <text x={x} y={y + 5} textAnchor="middle" className="font-mono font-bold text-white text-sm">
        {node.value}
      </text>

      {renderTree(node.left, leftX, nextY, level + 1, currentStep)}
      {renderTree(node.right, rightX, nextY, level + 1, currentStep)}
    </g>
  );
}

export default function ZigzagLevelOrderViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Zigzag Level Order Traversal</h2>

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
          {renderTree(TREE, 200, 60, 0, currentStep)}
        </svg>
      </div>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <div className="text-sm text-zinc-400 mb-2">Zigzag Result:</div>
        <div className="space-y-2">
          {currentStep.result.map((level, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-xs text-zinc-500 w-12">Level {idx}:</span>
              {level.map((val, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded bg-zinc-700 text-white font-mono"
                  style={{
                    backgroundColor:
                      idx === currentStep.level && i === level.length - 1 ? '#22c55e' : undefined,
                  }}
                >
                  {val}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.level0} />
    </div>
  );
}
