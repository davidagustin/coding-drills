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
    value: 5,
    left: null,
    right: { value: 6, left: null, right: null },
  },
};

interface FlattenStep {
  node: number | null;
  action: string;
  result: number[];
}

function computeSteps(): FlattenStep[] {
  const steps: FlattenStep[] = [];
  const result: number[] = [];
  
  function flatten(node: TreeNode | null, prev: TreeNode | null): TreeNode | null {
    if (!node) return prev;
    
    steps.push({
      node: node.value,
      action: `Process node ${node.value}`,
      result: [...result],
    });
    
    const right = node.right;
    const left = node.left;
    
    if (prev) {
      prev.right = node;
      prev.left = null;
      steps.push({
        node: node.value,
        action: `Link previous node to ${node.value}`,
        result: [...result],
      });
    }
    
    result.push(node.value);
    
    const leftTail = flatten(left, node);
    const rightTail = flatten(right, leftTail || node);
    
    return rightTail || leftTail || node;
  }
  
  steps.push({
    node: null,
    action: 'Start: Flatten binary tree to linked list',
    result: [],
  });
  
  flatten(TREE, null);
  
  steps.push({
    node: null,
    action: 'Complete: Tree flattened',
    result: [...result],
  });
  
  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  processed: '#22c55e',
  default: '#3b82f6',
} as const;

function renderTree(
  node: TreeNode | null,
  x: number,
  y: number,
  level: number,
  currentStep: FlattenStep,
  visited: Set<number>,
): React.ReactElement | null {
  if (!node) return null;

  const isCurrent = currentStep.node === node.value;
  const isVisited = visited.has(node.value);

  let nodeColor: string = COLORS.default;
  if (isCurrent) nodeColor = COLORS.current;
  else if (isVisited) nodeColor = COLORS.processed;

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

export default function FlattenTreeViz() {
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
      <h2 className="text-2xl font-bold text-white mb-4">Flatten Binary Tree to Linked List</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.action}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Result: [{currentStep.result.join(' → ')}]
          </p>
        )}
      </div>

      <div className="mb-6 p-6 bg-zinc-950 rounded-lg border border-zinc-800">
        <svg width="100%" height="400" viewBox="0 0 400 400" className="overflow-visible" aria-label="Binary tree visualization">
          <title>Binary tree visualization</title>
          {renderTree(TREE, 200, 60, 0, currentStep, visited)}
        </svg>
      </div>

      {currentStep.result.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Flattened List</h3>
          <div className="flex gap-2 justify-center flex-wrap">
            {currentStep.result.map((n, i) => (
              <>
                <div
                  key={i}
                  className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white animate-scale-in"
                  style={{
                    backgroundColor: COLORS.processed,
                    borderColor: COLORS.processed,
                  }}
                >
                  {n}
                </div>
                {i < currentStep.result.length - 1 && (
                  <span className="text-zinc-500 text-2xl">→</span>
                )}
              </>
            ))}
          </div>
        </div>
      )}

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
