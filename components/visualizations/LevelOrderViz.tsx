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

interface LevelStep {
  level: number;
  nodes: number[];
  current: number | null;
  explanation: string;
}

function computeSteps(): LevelStep[] {
  const steps: LevelStep[] = [];
  const queue: Array<{ node: TreeNode; level: number }> = [];
  
  steps.push({
    level: -1,
    nodes: [],
    current: null,
    explanation: 'Start: Level order traversal',
  });
  
  queue.push({ node: TREE, level: 0 });
  
  while (queue.length > 0) {
    const item = queue.shift();
    if (!item) break;
    const { node, level } = item;
    
    steps.push({
      level,
      nodes: [],
      current: node.value,
      explanation: `Visit node ${node.value} at level ${level}`,
    });
    
    if (node.left) {
      queue.push({ node: node.left, level: level + 1 });
    }
    if (node.right) {
      queue.push({ node: node.right, level: level + 1 });
    }
  }
  
  const levelOrder: number[] = [];
  const levelMap = new Map<number, number[]>();
  
  function traverse(node: TreeNode | null, level: number): void {
    if (!node) return;
    if (!levelMap.has(level)) {
      levelMap.set(level, []);
    }
    levelMap.get(level)!.push(node.value);
    traverse(node.left, level + 1);
    traverse(node.right, level + 1);
  }
  
  traverse(TREE, 0);
  
  for (let i = 0; i < levelMap.size; i++) {
    const nodes = levelMap.get(i) || [];
    levelOrder.push(...nodes);
    steps.push({
      level: i,
      nodes: [...levelOrder],
      current: null,
      explanation: `Level ${i}: [${nodes.join(', ')}]`,
    });
  }
  
  steps.push({
    level: -1,
    nodes: levelOrder,
    current: null,
    explanation: `Complete: [${levelOrder.join(', ')}]`,
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
  currentStep: LevelStep,
  visited: Set<number>,
): React.ReactElement | null {
  if (!node) return null;

  const isCurrent = currentStep.current === node.value;
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
      <circle
        cx={x}
        cy={y}
        r={20}
        fill={nodeColor}
        stroke="#fff"
        strokeWidth={2}
      />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fill="#fff"
        fontSize="14"
        fontWeight="bold"
      >
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

export default function LevelOrderViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const visited = useMemo(() => {
    const v = new Set<number>();
    for (let i = 0; i <= step && i < STEPS.length; i++) {
      if (STEPS[i].current !== null) {
        v.add(STEPS[i].current!);
      }
    }
    return v;
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Level Order Traversal</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Result: [{currentStep.nodes.join(', ')}]
          </p>
        )}
      </div>

      <div className="mb-6 p-6 bg-zinc-950 rounded-lg border border-zinc-800">
        <svg width="100%" height="400" viewBox="0 0 400 400" className="overflow-visible" aria-label="Binary tree visualization">
          <title>Binary tree visualization</title>
          {renderTree(TREE, 200, 60, 0, currentStep, visited)}
        </svg>
      </div>

      {currentStep.nodes.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Traversal Order</h3>
          <div className="flex gap-2 justify-center flex-wrap">
            {currentStep.nodes.map((n, i) => (
              <motion.div
                key={i}
                className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: COLORS.visited,
                  borderColor: COLORS.visited,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {n}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
