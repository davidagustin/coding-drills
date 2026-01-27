'use client';

import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Pre-computed heap extract steps                                   */
/* ------------------------------------------------------------------ */

const INITIAL_HEAP = [1, 3, 2, 7, 6, 4, 5] as const;

interface HeapStep {
  heap: number[];
  extracted: number | null;
  siftingIndex: number | null;
  leftChild: number | null;
  rightChild: number | null;
  smallest: number | null;
  action: string;
  isSwapping: boolean;
}

function computeSteps(): HeapStep[] {
  const steps: HeapStep[] = [];
  const heap: number[] = [...INITIAL_HEAP];

  // Initial state
  steps.push({
    heap: [...heap],
    extracted: null,
    siftingIndex: null,
    leftChild: null,
    rightChild: null,
    smallest: null,
    action: `Initial heap: [${heap.join(', ')}]`,
    isSwapping: false,
  });

  if (heap.length === 0) {
    steps.push({
      heap: [],
      extracted: null,
      siftingIndex: null,
      leftChild: null,
      rightChild: null,
      smallest: null,
      action: 'Empty heap → return null',
      isSwapping: false,
    });
    return steps;
  }

  // Extract min (root)
  const min = heap[0];
  steps.push({
    heap: [...heap],
    extracted: min,
    siftingIndex: null,
    leftChild: null,
    rightChild: null,
    smallest: null,
    action: `Extract min: ${min} (root)`,
    isSwapping: false,
  });

  if (heap.length === 1) {
    heap.pop();
    steps.push({
      heap: [],
      extracted: min,
      siftingIndex: null,
      leftChild: null,
      rightChild: null,
      smallest: null,
      action: 'Single element → heap becomes empty',
      isSwapping: false,
    });
    return steps;
  }

  // Move last element to root
  const last = heap.pop()!;
  heap[0] = last;
  steps.push({
    heap: [...heap],
    extracted: min,
    siftingIndex: 0,
    leftChild: null,
    rightChild: null,
    smallest: null,
    action: `Move last element ${last} to root (index 0)`,
    isSwapping: false,
  });

  // Sift down
  let i = 0;
  while (true) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let smallest = i;

    // Check left child
    if (left < heap.length) {
      steps.push({
        heap: [...heap],
        extracted: min,
        siftingIndex: i,
        leftChild: left,
        rightChild: right < heap.length ? right : null,
        smallest,
        action: `Compare heap[${i}]=${heap[i]} with left child heap[${left}]=${heap[left]}`,
        isSwapping: false,
      });

      if (heap[left] < heap[smallest]) {
        smallest = left;
        steps.push({
          heap: [...heap],
          extracted: min,
          siftingIndex: i,
          leftChild: left,
          rightChild: right < heap.length ? right : null,
          smallest,
          action: `Left child is smaller → smallest = ${left}`,
          isSwapping: false,
        });
      }
    }

    // Check right child
    if (right < heap.length) {
      steps.push({
        heap: [...heap],
        extracted: min,
        siftingIndex: i,
        leftChild: left < heap.length ? left : null,
        rightChild: right,
        smallest,
        action: `Compare heap[${smallest}]=${heap[smallest]} with right child heap[${right}]=${heap[right]}`,
        isSwapping: false,
      });

      if (heap[right] < heap[smallest]) {
        smallest = right;
        steps.push({
          heap: [...heap],
          extracted: min,
          siftingIndex: i,
          leftChild: left < heap.length ? left : null,
          rightChild: right,
          smallest,
          action: `Right child is smaller → smallest = ${right}`,
          isSwapping: false,
        });
      }
    }

    if (smallest === i) {
      steps.push({
        heap: [...heap],
        extracted: min,
        siftingIndex: i,
        leftChild: left < heap.length ? left : null,
        rightChild: right < heap.length ? right : null,
        smallest,
        action: `heap[${i}]=${heap[i]} is smallest → stop (heap property satisfied)`,
        isSwapping: false,
      });
      break;
    }

    // Swap
    steps.push({
      heap: [...heap],
      extracted: min,
      siftingIndex: i,
      leftChild: left < heap.length ? left : null,
      rightChild: right < heap.length ? right : null,
      smallest,
      action: `Swap heap[${i}]=${heap[i]} with heap[${smallest}]=${heap[smallest]}`,
      isSwapping: true,
    });

    [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
    i = smallest;

    steps.push({
      heap: [...heap],
      extracted: min,
      siftingIndex: i,
      leftChild: null,
      rightChild: null,
      smallest: null,
      action: `After swap: continue sifting from index ${i}`,
      isSwapping: false,
    });
  }

  // Final state
  steps.push({
    heap: [...heap],
    extracted: min,
    siftingIndex: null,
    leftChild: null,
    rightChild: null,
    smallest: null,
    action: `Complete! Extracted ${min}, final heap: [${heap.join(', ')}]`,
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
  extracted: '#10b981',
  sifting: '#f97316',
  swapping: '#ef4444',
  child: '#eab308',
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

export default function HeapExtractMinViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const current: HeapStep | null = step === 0 ? null : (STEPS[step - 1] ?? null);
  const heap = current?.heap ?? INITIAL_HEAP;

  // Render heap as tree
  const renderNode = (index: number, level: number, x: number, y: number): React.ReactNode => {
    if (index >= heap.length) return null;

    const value = heap[index];
    const isSifting = current?.siftingIndex === index;
    const isLeftChild = current?.leftChild === index;
    const isRightChild = current?.rightChild === index;
    const isSmallest = current?.smallest === index;
    const isSwapping = current?.isSwapping && (isSifting || isSmallest);

    const { left, right } = getChildren(index, heap.length);

    const nodeColor = isSwapping
      ? COLORS.swapping
      : isSifting
        ? COLORS.sifting
        : isLeftChild || isRightChild
          ? COLORS.child
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
            filter: isSwapping
              ? 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))'
              : isSifting
                ? 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.8))'
                : 'none',
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

  const treeHeight = Math.ceil(Math.log2(heap.length + 1)) * 80;
  const treeWidth = 2 ** (Math.ceil(Math.log2(heap.length + 1)) - 1) * 120;

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white">Min Heap: Extract Minimum</h2>
        <p className="text-zinc-500 text-sm">Sift-down to restore heap property</p>
      </div>

      {/* Extracted value */}
      {current && current.extracted !== null && (
        <div className="bg-zinc-800 rounded-lg p-4 text-center">
          <span className="text-zinc-400 text-sm">Extracted: </span>
          <span
            className="text-2xl font-mono font-bold px-4 py-2 rounded inline-block"
            style={{ backgroundColor: COLORS.extracted, color: 'white' }}
          >
            {current.extracted}
          </span>
        </div>
      )}

      {/* Array representation */}
      <div className="bg-zinc-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-zinc-400 text-sm font-mono">Heap Array:</span>
          <div className="flex gap-2">
            {heap.map((val, idx) => {
              const isSifting = current?.siftingIndex === idx;
              const isLeftChild = current?.leftChild === idx;
              const isRightChild = current?.rightChild === idx;
              const isSmallest = current?.smallest === idx;
              const isSwapping = current?.isSwapping && (isSifting || isSmallest);

              return (
                <div key={idx} className="relative flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center font-mono font-bold text-sm transition-all"
                    style={{
                      backgroundColor: isSwapping
                        ? COLORS.swapping
                        : isSifting
                          ? COLORS.sifting
                          : isLeftChild || isRightChild
                            ? COLORS.child
                            : COLORS.node,
                      border: isSwapping ? '2px solid #ffffff' : '2px solid transparent',
                      boxShadow: isSwapping
                        ? `0 0 12px ${COLORS.swapping}`
                        : isSifting
                          ? `0 0 8px ${COLORS.sifting}`
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
            style={{ background: COLORS.sifting }}
          />
          <span className="text-zinc-400">Sifting</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.child }} />
          <span className="text-zinc-400">Comparing</span>
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
      <VizControls controls={controls} accentColor={COLORS.extracted} />
    </div>
  );
}
