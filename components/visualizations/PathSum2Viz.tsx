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
    left: { value: 11, left: { value: 7, left: null, right: null }, right: { value: 2, left: null, right: null } },
    right: null,
  },
  right: {
    value: 8,
    left: { value: 13, left: null, right: null },
    right: { value: 4, left: { value: 5, left: null, right: null }, right: { value: 1, left: null, right: null } },
  },
};

const TARGET_SUM = 22;

interface PathSum2Step {
  node: number | null;
  currentSum: number;
  path: number[];
  paths: number[][];
  explanation: string;
}

function computeSteps(): PathSum2Step[] {
  const steps: PathSum2Step[] = [];
  const paths: number[][] = [];
  
  function findPaths(node: TreeNode | null, currentSum: number, path: number[]): void {
    if (!node) {
      steps.push({
        node: null,
        currentSum,
        path: [...path],
        paths: [...paths],
        explanation: 'Null node reached',
      });
      return;
    }
    
    const newPath = [...path, node.value];
    const newSum = currentSum + node.value;
    
    steps.push({
      node: node.value,
      currentSum: newSum,
      path: newPath,
      paths: [...paths],
      explanation: `Visit node ${node.value}, path: [${newPath.join(', ')}], sum: ${newSum}`,
    });
    
    if (!node.left && !node.right) {
      if (newSum === TARGET_SUM) {
        paths.push([...newPath]);
        steps.push({
          node: node.value,
          currentSum: newSum,
          path: newPath,
          paths: [...paths],
          explanation: `Leaf node ${node.value}: sum ${newSum} = target ${TARGET_SUM} ✓ Found path!`,
        });
      } else {
        steps.push({
          node: node.value,
          currentSum: newSum,
          path: newPath,
          paths: [...paths],
          explanation: `Leaf node ${node.value}: sum ${newSum} ≠ target ${TARGET_SUM}`,
        });
      }
      return;
    }
    
    findPaths(node.left, newSum, newPath);
    findPaths(node.right, newSum, newPath);
  }
  
  steps.push({
    node: null,
    currentSum: 0,
    path: [],
    paths: [],
    explanation: `Start: Find all paths with sum = ${TARGET_SUM}`,
  });
  
  findPaths(TREE, 0, []);
  
  steps.push({
    node: null,
    currentSum: 0,
    path: [],
    paths: [...paths],
    explanation: `Complete: Found ${paths.length} path(s)`,
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
  currentStep: PathSum2Step,
  pathNodes: Set<number>,
): React.ReactElement | null {
  if (!node) return null;

  const isCurrent = currentStep.node === node.value;
  const inPath = pathNodes.has(node.value);

  let nodeColor: string = COLORS.default;
  if (isCurrent) nodeColor = COLORS.current;
  else if (inPath) nodeColor = COLORS.found;

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
          {renderTree(node.left, leftX, childY, level + 1, currentStep, pathNodes)}
        </>
      )}
      {node.right && (
        <>
          <line x1={x} y1={y + 20} x2={rightX} y2={childY - 20} stroke="#6b7280" strokeWidth={2} />
          {renderTree(node.right, rightX, childY, level + 1, currentStep, pathNodes)}
        </>
      )}
    </g>
  );
}

export default function PathSum2Viz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const pathNodes = useMemo(() => {
    const set = new Set<number>();
    if (currentStep.path.length > 0) {
      currentStep.path.forEach(n => set.add(n));
    }
    return set;
  }, [currentStep]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Path Sum II (All Paths)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Found {currentStep.paths.length} path(s)
          </p>
        )}
      </div>

      <div className="mb-6 p-6 bg-zinc-950 rounded-lg border border-zinc-800">
        <svg width="100%" height="400" viewBox="0 0 400 400" className="overflow-visible" aria-label="Binary tree visualization">
          <title>Binary tree visualization</title>
          {renderTree(TREE, 200, 60, 0, currentStep, pathNodes)}
        </svg>
      </div>

      {currentStep.paths.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Found Paths</h3>
          <div className="space-y-2">
            {currentStep.paths.map((path, i) => (
              <div key={i} className="flex gap-2 items-center justify-center flex-wrap">
                <span className="text-zinc-400">Path {i + 1}:</span>
                {path.map((n, j) => (
                  <>
                    <div
                      key={j}
                      className="w-10 h-10 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white animate-scale-in"
                      style={{
                        backgroundColor: COLORS.found,
                        borderColor: COLORS.found,
                      }}
                    >
                      {n}
                    </div>
                    {j < path.length - 1 && <span className="text-zinc-500">→</span>}
                  </>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
