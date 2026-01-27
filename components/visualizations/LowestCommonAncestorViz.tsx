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
  left: {
    value: 5,
    left: { value: 6, left: null, right: null },
    right: { value: 2, left: null, right: null },
  },
  right: { value: 1, left: null, right: null },
};

const P = 6;
const Q = 2;

interface LCAStep {
  node: number | null;
  foundP: boolean;
  foundQ: boolean;
  explanation: string;
  path: number[];
  isLCA: boolean;
}

function computeSteps(): LCAStep[] {
  const steps: LCAStep[] = [];

  function lca(node: TreeNode | null, path: number[]): { foundP: boolean; foundQ: boolean } {
    if (!node) {
      steps.push({
        node: null,
        foundP: false,
        foundQ: false,
        explanation: 'Null node → return (false, false)',
        path: [...path],
        isLCA: false,
      });
      return { foundP: false, foundQ: false };
    }

    const currentPath = [...path, node.value];
    const isP = node.value === P;
    const isQ = node.value === Q;

    if (isP || isQ) {
      steps.push({
        node: node.value,
        foundP: isP,
        foundQ: isQ,
        explanation: `Found ${isP ? 'P' : 'Q'} at node ${node.value} → return`,
        path: currentPath,
        isLCA: false,
      });
      return { foundP: isP, foundQ: isQ };
    }

    steps.push({
      node: node.value,
      foundP: false,
      foundQ: false,
      explanation: `Visit node ${node.value}, search left and right`,
      path: currentPath,
      isLCA: false,
    });

    const left = lca(node.left, currentPath);
    const right = lca(node.right, currentPath);

    const foundP = left.foundP || right.foundP;
    const foundQ = left.foundQ || right.foundQ;
    const isLCA = foundP && foundQ;

    if (isLCA) {
      steps.push({
        node: node.value,
        foundP: true,
        foundQ: true,
        explanation: `Both P and Q found in subtrees → LCA is ${node.value}`,
        path: currentPath,
        isLCA: true,
      });
    } else {
      steps.push({
        node: node.value,
        foundP,
        foundQ,
        explanation: `Return (foundP=${foundP}, foundQ=${foundQ})`,
        path: currentPath,
        isLCA: false,
      });
    }

    return { foundP, foundQ };
  }

  lca(TREE, []);

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  p: '#ef4444',
  q: '#3b82f6',
  lca: '#22c55e',
  current: '#eab308',
  visited: '#6b7280',
  default: '#8b5cf6',
} as const;

function renderTree(
  node: TreeNode | null,
  x: number,
  y: number,
  level: number,
  currentStep: LCAStep | null,
  visited: Set<number>,
): React.ReactNode {
  if (!node) return null;

  const isP = node.value === P;
  const isQ = node.value === Q;
  const isCurrent = currentStep?.node === node.value;
  const isLCA = currentStep?.isLCA && isCurrent;
  const isVisited = visited.has(node.value);

  let nodeColor: string = COLORS.default;
  if (isLCA) nodeColor = COLORS.lca;
  else if (isP) nodeColor = COLORS.p;
  else if (isQ) nodeColor = COLORS.q;
  else if (isCurrent) nodeColor = COLORS.current;
  else if (isVisited) nodeColor = COLORS.visited;

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

      <motion.circle
        cx={x}
        cy={y}
        r={25}
        fill={nodeColor}
        stroke={isCurrent ? COLORS.current : '#1f2937'}
        strokeWidth={isCurrent || isLCA ? '3' : '2'}
        initial={{ scale: 0 }}
        animate={{ scale: isLCA ? 1.2 : 1 }}
      />
      <text x={x} y={y + 5} textAnchor="middle" className="font-mono font-bold text-white text-sm">
        {node.value}
      </text>
      {(isP || isQ) && (
        <text x={x} y={y - 35} textAnchor="middle" className="text-xs fill-white">
          {isP ? 'P' : 'Q'}
        </text>
      )}

      {renderTree(node.left, leftX, nextY, level + 1, currentStep, visited)}
      {renderTree(node.right, rightX, nextY, level + 1, currentStep, visited)}
    </g>
  );
}

export default function LowestCommonAncestorViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const visited = useMemo(() => {
    const v = new Set<number>();
    for (let i = 0; i <= step && i < STEPS.length; i++) {
      if (STEPS[i].node !== null) {
        const node = STEPS[i].node;
        if (node !== null) v.add(node);
      }
    }
    return v;
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">
        Lowest Common Ancestor (P={P}, Q={Q})
      </h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {currentStep.isLCA && (
          <p className="text-green-400 font-bold text-lg mt-2">LCA Found: {currentStep.node}</p>
        )}
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

      <div className="mb-6 flex gap-4 justify-center flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.p }} />
          <span className="text-xs text-zinc-400">P ({P})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.q }} />
          <span className="text-xs text-zinc-400">Q ({Q})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.lca }} />
          <span className="text-xs text-zinc-400">LCA</span>
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.default} />
    </div>
  );
}
