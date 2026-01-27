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
  left: {
    value: 2,
    left: { value: 4, left: null, right: null },
    right: { value: 5, left: null, right: null },
  },
  right: { value: 3, left: null, right: null },
};

interface DiameterStep {
  node: number | null;
  leftHeight: number;
  rightHeight: number;
  diameter: number;
  explanation: string;
}

function computeSteps(): DiameterStep[] {
  const steps: DiameterStep[] = [];
  let diameter = 0;

  function height(node: TreeNode | null): number {
    if (!node) {
      steps.push({
        node: null,
        leftHeight: 0,
        rightHeight: 0,
        diameter,
        explanation: 'Null node → height = 0',
      });
      return 0;
    }

    const leftH = height(node.left);
    const rightH = height(node.right);
    diameter = Math.max(diameter, leftH + rightH);

    steps.push({
      node: node.value,
      leftHeight: leftH,
      rightHeight: rightH,
      diameter,
      explanation: `Node ${node.value}: leftH=${leftH}, rightH=${rightH} → diameter at this node = ${leftH + rightH}, maxDiameter = ${diameter}`,
    });

    return 1 + Math.max(leftH, rightH);
  }

  height(TREE);

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  computed: '#22c55e',
  diameter: '#3b82f6',
} as const;

function renderTree(
  node: TreeNode | null,
  x: number,
  y: number,
  level: number,
  currentStep: DiameterStep | null,
): React.ReactNode {
  if (!node) return null;

  const isCurrent = currentStep?.node === node.value;
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
        fill={isCurrent ? COLORS.current : COLORS.computed}
        stroke={isCurrent ? COLORS.current : '#1f2937'}
        strokeWidth={isCurrent ? '3' : '2'}
        initial={{ scale: 0 }}
        animate={{ scale: isCurrent ? 1.2 : 1 }}
      />
      <text x={x} y={y + 5} textAnchor="middle" className="font-mono font-bold text-white text-sm">
        {node.value}
      </text>
      {isCurrent && (
        <text x={x} y={y - 35} textAnchor="middle" className="text-xs fill-zinc-400">
          leftH={currentStep.leftHeight}, rightH={currentStep.rightHeight}
        </text>
      )}

      {renderTree(node.left, leftX, nextY, level + 1, currentStep)}
      {renderTree(node.right, rightX, nextY, level + 1, currentStep)}
    </g>
  );
}

export default function TreeDiameterViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Binary Tree Diameter</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Diameter: {currentStep.diameter}</p>
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
          {renderTree(TREE, 200, 60, 0, currentStep)}
        </svg>
      </div>

      <VizControls controls={controls} accentColor={COLORS.diameter} />
    </div>
  );
}
