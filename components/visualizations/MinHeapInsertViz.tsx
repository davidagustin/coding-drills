'use client';

import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Pre-computed heap insert steps                                    */
/* ------------------------------------------------------------------ */

const INITIAL_HEAP = [1, 3, 5] as const;
const VALUE_TO_INSERT = 2;

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

  // Initial state
  steps.push({
    heap: [...heap],
    insertingIndex: null,
    parentIndex: null,
    action: `Initial heap: [${heap.join(', ')}]`,
    isSwapping: false,
  });

  // Add value to end
  heap.push(VALUE_TO_INSERT);
  let i = heap.length - 1;
  steps.push({
    heap: [...heap],
    insertingIndex: i,
    parentIndex: null,
    action: `Add ${VALUE_TO_INSERT} to end (index ${i})`,
    isSwapping: false,
  });

  // Bubble up
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    const currentVal = heap[i];
    const parentVal = heap[parent];

    if (parentVal <= currentVal) {
      steps.push({
        heap: [...heap],
        insertingIndex: i,
        parentIndex: parent,
        action: `heap[${parent}]=${parentVal} <= heap[${i}]=${currentVal} → stop (heap property satisfied)`,
        isSwapping: false,
      });
      break;
    }

    // Show swap
    steps.push({
      heap: [...heap],
      insertingIndex: i,
      parentIndex: parent,
      action: `heap[${parent}]=${parentVal} > heap[${i}]=${currentVal} → swap`,
      isSwapping: true,
    });

    // Perform swap
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

  // Final state
  steps.push({
    heap: [...heap],
    insertingIndex: null,
    parentIndex: null,
    action: `Final heap: [${heap.join(', ')}]`,
    isSwapping: false,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const COLORS = {
  node: '#3b82f6',
  inserting: '#10b981',
  parent: '#f97316',
  swapping: '#ef4444',
  edge: '#52525b',
} as const;

/* ------------------------------------------------------------------ */
/*  Helper: Get children indices                                      */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MinHeapInsertViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const current: HeapStep | null = step === 0 ? null : (STEPS[step - 1] ?? null);
  const heap = current?.heap ?? INITIAL_HEAP;

  // Render heap as tree
  const renderNode = (index: number, level: number, x: number, y: number): React.ReactNode => {
    if (index >= heap.length) return null;

    const value = heap[index];
    const isInserting = current?.insertingIndex === index;
    const isParent = current?.parentIndex === index;
    const isSwapping = current?.isSwapping && (isInserting || isParent);

    const { left, right } = getChildren(index, heap.length);

    const nodeColor = isSwapping
      ? COLORS.swapping
      : isInserting
        ? COLORS.inserting
        : isParent
          ? COLORS.parent
          : COLORS.node;

    return (
      <g key={index}>
        {/* Edges to children */}
        {left !== null && (
          <line
            x1={x}
            y1={y + 30}
            x2={x - 60 + level * 20}
            y2={y + 80}
            stroke={COLORS.edge}
            strokeWidth="2"
          />
        )}
        {right !== null && (
          <line
            x1={x}
            y1={y + 30}
            x2={x + 60 - level * 20}
            y2={y + 80}
            stroke={COLORS.edge}
            strokeWidth="2"
          />
        )}

        {/* Node circle */}
        <circle
          cx={x}
          cy={y}
          r="25"
          fill={nodeColor}
          stroke={isSwapping ? '#ffffff' : 'transparent'}
          strokeWidth="3"
          style={{
            filter: isSwapping ? 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))' : 'none',
          }}
        />

        {/* Value */}
        <text
          x={x}
          y={y + 5}
          textAnchor="middle"
          fill="white"
          fontSize="16"
          fontWeight="bold"
          fontFamily="mono"
        >
          {value}
        </text>

        {/* Index label */}
        <text x={x} y={y + 45} textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="mono">
          [{index}]
        </text>

        {/* Recursively render children */}
        {left !== null && renderNode(left, level + 1, x - 60 + level * 20, y + 80)}
        {right !== null && renderNode(right, level + 1, x + 60 - level * 20, y + 80)}
      </g>
    );
  };

  // Calculate tree width to center it
  const treeHeight = Math.ceil(Math.log2(heap.length + 1)) * 80;
  const treeWidth = 2 ** (Math.ceil(Math.log2(heap.length + 1)) - 1) * 120;

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white">Min Heap Insert</h2>
        <p className="text-zinc-500 text-sm">Bubble-up to maintain heap property</p>
      </div>

      {/* Array representation */}
      <div className="bg-zinc-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-zinc-400 text-sm font-mono">Array:</span>
          <div className="flex gap-2">
            {heap.map((val, idx) => {
              const isInserting = current?.insertingIndex === idx;
              const isParent = current?.parentIndex === idx;
              const isSwapping = current?.isSwapping && (isInserting || isParent);

              return (
                <div key={idx} className="relative flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center font-mono font-bold text-sm transition-all"
                    style={{
                      backgroundColor: isSwapping
                        ? COLORS.swapping
                        : isInserting
                          ? COLORS.inserting
                          : isParent
                            ? COLORS.parent
                            : COLORS.node,
                      border: isSwapping ? '2px solid #ffffff' : '2px solid transparent',
                      boxShadow: isSwapping
                        ? `0 0 12px ${COLORS.swapping}`
                        : isInserting || isParent
                          ? `0 0 8px ${isInserting ? COLORS.inserting : COLORS.parent}`
                          : 'none',
                    }}
                  >
                    <span className="text-white">{val}</span>
                  </div>
                  <span className="text-xs text-zinc-500 mt-1">{idx}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tree visualization */}
      <div className="flex justify-center">
        <svg
          width={Math.max(400, treeWidth)}
          height={treeHeight + 100}
          className="overflow-visible"
          role="img"
          aria-label="Min heap tree structure"
        >
          <title>Min Heap Tree Visualization</title>
          {heap.length > 0 && renderNode(0, 0, treeWidth / 2, 50)}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 text-xs flex-wrap">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.inserting }}
          />
          <span className="text-zinc-400">Inserting</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.parent }} />
          <span className="text-zinc-400">Parent</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.swapping }}
          />
          <span className="text-zinc-400">Swapping</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.node }} />
          <span className="text-zinc-400">Normal</span>
        </div>
      </div>

      {/* Action description */}
      <div className="bg-zinc-800 rounded-lg p-4 text-center">
        <span className="text-zinc-300 text-sm font-mono">
          {current?.action || 'Press Play or Step to begin'}
        </span>
      </div>

      {/* Controls */}
      <VizControls controls={controls} accentColor={COLORS.inserting} />
    </div>
  );
}
