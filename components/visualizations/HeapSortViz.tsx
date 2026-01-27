'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ARRAY = [4, 10, 3, 5, 1];

interface HeapStep {
  heap: number[];
  heapSize: number;
  action: 'heapify' | 'extract' | 'complete';
  currentIdx: number;
  explanation: string;
}

function computeSteps(): HeapStep[] {
  const steps: HeapStep[] = [];
  const heap = [...ARRAY];

  function heapify(arr: number[], n: number, i: number): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    steps.push({
      heap: [...arr],
      heapSize: n,
      action: 'heapify',
      currentIdx: i,
      explanation: `Heapify node at index ${i}`,
    });

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      steps.push({
        heap: [...arr],
        heapSize: n,
        action: 'heapify',
        currentIdx: largest,
        explanation: `Swap ${arr[i]} and ${arr[largest]}, continue heapifying`,
      });
      heapify(arr, n, largest);
    }
  }

  steps.push({
    heap: [...heap],
    heapSize: heap.length,
    action: 'heapify',
    currentIdx: -1,
    explanation: `Start: Build max heap from [${heap.join(', ')}]`,
  });

  for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
    heapify(heap, heap.length, i);
  }

  steps.push({
    heap: [...heap],
    heapSize: heap.length,
    action: 'extract',
    currentIdx: -1,
    explanation: 'Max heap built, start extracting',
  });

  for (let i = heap.length - 1; i > 0; i--) {
    [heap[0], heap[i]] = [heap[i], heap[0]];
    steps.push({
      heap: [...heap],
      heapSize: i,
      action: 'extract',
      currentIdx: i,
      explanation: `Extract max ${heap[i]} to position ${i}`,
    });
    heapify(heap, i, 0);
  }

  steps.push({
    heap: [...heap],
    heapSize: heap.length,
    action: 'complete',
    currentIdx: -1,
    explanation: `Complete: Sorted [${heap.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  sorted: '#22c55e',
  heap: '#3b82f6',
  default: '#6b7280',
} as const;

export default function HeapSortViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { heap, heapSize, action, currentIdx, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Heap Sort</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Array</h3>
        <div className="flex gap-2 justify-center">
          {heap.map((n, idx) => {
            let bgColor: string = COLORS.default;
            if (action === 'complete') {
              bgColor = COLORS.sorted;
            } else if (idx === currentIdx) {
              bgColor = COLORS.current;
            } else if (idx < heapSize) {
              bgColor = COLORS.heap;
            } else {
              bgColor = COLORS.sorted;
            }

            return (
              <motion.div
                key={idx}
                className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: bgColor,
                  borderColor: idx === currentIdx ? '#fff' : bgColor,
                }}
                animate={{
                  scale: idx === currentIdx ? 1.2 : 1,
                }}
              >
                {n}
              </motion.div>
            );
          })}
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
