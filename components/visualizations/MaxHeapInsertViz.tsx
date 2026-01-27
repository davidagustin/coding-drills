'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const INITIAL_HEAP = [50, 30, 40, 10, 20];
const VALUE_TO_INSERT = 60;

interface HeapStep {
  heap: number[];
  insertingIndex: number | null;
  parentIndex: number | null;
  action: string;
  isSwapping: boolean;
}

function computeSteps(): HeapStep[] {
  const steps: HeapStep[] = [];
  const heap: number[] = [...INITIAL_HEAP];

  steps.push({
    heap: [...heap],
    insertingIndex: null,
    parentIndex: null,
    action: `Initial max heap: [${heap.join(', ')}]`,
    isSwapping: false,
  });

  heap.push(VALUE_TO_INSERT);
  let i = heap.length - 1;
  steps.push({
    heap: [...heap],
    insertingIndex: i,
    parentIndex: null,
    action: `Add ${VALUE_TO_INSERT} to end (index ${i})`,
    isSwapping: false,
  });

  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    const currentVal = heap[i];
    const parentVal = heap[parent];

    if (parentVal >= currentVal) {
      steps.push({
        heap: [...heap],
        insertingIndex: i,
        parentIndex: parent,
        action: `heap[${parent}]=${parentVal} >= heap[${i}]=${currentVal} → stop (max heap property satisfied)`,
        isSwapping: false,
      });
      break;
    }

    steps.push({
      heap: [...heap],
      insertingIndex: i,
      parentIndex: parent,
      action: `heap[${parent}]=${parentVal} < heap[${i}]=${currentVal} → swap`,
      isSwapping: true,
    });

    [heap[parent], heap[i]] = [heap[i], heap[parent]];
    i = parent;

    steps.push({
      heap: [...heap],
      insertingIndex: i,
      parentIndex: i === 0 ? null : Math.floor((i - 1) / 2),
      action: `After swap: ${currentVal} moved to index ${i}`,
      isSwapping: false,
    });
  }

  steps.push({
    heap: [...heap],
    insertingIndex: null,
    parentIndex: null,
    action: `Final max heap: [${heap.join(', ')}]`,
    isSwapping: false,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  node: '#3b82f6',
  inserting: '#10b981',
  parent: '#f97316',
  swapping: '#ef4444',
  edge: '#52525b',
} as const;

function getChildren(
  index: number,
  heapLength: number,
): { left: number | null; right: number | null } {
  const left = 2 * index + 1;
  const right = 2 * index + 2;
  return {
    left: left < heapLength ? left : null,
    right: right < heapLength ? right : null,
  };
}

export default function MaxHeapInsertViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { heap, insertingIndex, parentIndex, action, isSwapping } = currentStep;

  const renderNode = (index: number, level: number, x: number, y: number): React.ReactNode => {
    if (index >= heap.length) return null;

    const value = heap[index];
    const isInserting = insertingIndex === index;
    const isParent = parentIndex === index;
    const isSwappingNode = isSwapping && (isInserting || isParent);

    const { left, right } = getChildren(index, heap.length);

    const nodeColor = isSwappingNode
      ? COLORS.swapping
      : isInserting
        ? COLORS.inserting
        : isParent
          ? COLORS.parent
          : COLORS.node;

    return (
      <g key={index}>
        {left !== null && (
          <line
            x1={x}
            y1={y + 25}
            x2={x - 60 + level * 20}
            y2={y + 80 - 25}
            stroke={COLORS.edge}
            strokeWidth="2"
          />
        )}
        {right !== null && (
          <line
            x1={x}
            y1={y + 25}
            x2={x + 60 - level * 20}
            y2={y + 80 - 25}
            stroke={COLORS.edge}
            strokeWidth="2"
          />
        )}

        <motion.circle
          cx={x}
          cy={y}
          r={25}
          fill={nodeColor}
          stroke={isSwappingNode ? COLORS.swapping : '#1f2937'}
          strokeWidth={isSwappingNode ? '3' : '2'}
          initial={{ scale: 0 }}
          animate={{ scale: isSwappingNode ? 1.2 : 1 }}
        />
        <text
          x={x}
          y={y + 5}
          textAnchor="middle"
          className="font-mono font-bold text-white text-sm"
        >
          {value}
        </text>

        {left !== null && renderNode(left, level + 1, x - 60 + level * 20, y + 80)}
        {right !== null && renderNode(right, level + 1, x + 60 - level * 20, y + 80)}
      </g>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Max Heap Insert</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{action}</p>
      </div>

      <div className="mb-6 p-6 bg-zinc-950 rounded-lg border border-zinc-800">
        <svg
          width="100%"
          height="400"
          viewBox="0 0 400 400"
          className="overflow-visible"
          aria-label="Max heap visualization"
        >
          <title>Max heap visualization</title>
          {renderNode(0, 0, 200, 60)}
        </svg>
      </div>

      <VizControls controls={controls} accentColor={COLORS.node} />
    </div>
  );
}
