'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

interface PQItem {
  value: string;
  priority: number;
  id: string;
}

const OPERATIONS: Array<['enqueue' | 'dequeue', string?, number?]> = [
  ['enqueue', 'Task A', 3],
  ['enqueue', 'Task B', 1],
  ['enqueue', 'Task C', 2],
  ['dequeue'],
  ['dequeue'],
];

interface PQStep {
  operation: 'enqueue' | 'dequeue';
  item: PQItem | null;
  heap: PQItem[];
  explanation: string;
  returned: string | null;
}

function computeSteps(): PQStep[] {
  const steps: PQStep[] = [];
  const heap: PQItem[] = [];
  let idCounter = 0;

  function bubbleUp(idx: number): void {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (heap[parent].priority <= heap[idx].priority) break;
      [heap[parent], heap[idx]] = [heap[idx], heap[parent]];
      idx = parent;
    }
  }

  function bubbleDown(idx: number): void {
    while (true) {
      let smallest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;

      if (left < heap.length && heap[left].priority < heap[smallest].priority) {
        smallest = left;
      }
      if (right < heap.length && heap[right].priority < heap[smallest].priority) {
        smallest = right;
      }

      if (smallest === idx) break;
      [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
      idx = smallest;
    }
  }

  for (const [op, value, priority] of OPERATIONS) {
    if (op === 'enqueue') {
      if (value === undefined || priority === undefined) continue;
      const item: PQItem = { value, priority, id: `item-${++idCounter}` };
      heap.push(item);
      bubbleUp(heap.length - 1);
      steps.push({
        operation: 'enqueue',
        item,
        heap: heap.map((i) => ({ ...i })),
        explanation: `Enqueue "${value}" with priority ${priority}`,
        returned: null,
      });
    } else {
      const returned = heap[0];
      heap[0] = heap[heap.length - 1];
      heap.pop();
      if (heap.length > 0) bubbleDown(0);
      steps.push({
        operation: 'dequeue',
        item: null,
        heap: heap.map((i) => ({ ...i })),
        explanation: `Dequeue: "${returned.value}" (priority ${returned.priority})`,
        returned: returned.value,
      });
    }
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  high: '#ef4444',
  medium: '#f97316',
  low: '#22c55e',
  current: '#eab308',
} as const;

function getPriorityColor(priority: number): string {
  if (priority === 1) return COLORS.high;
  if (priority === 2) return COLORS.medium;
  return COLORS.low;
}

export default function PriorityQueueCustomViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Priority Queue (Min-Heap)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {currentStep.returned && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Returned: {currentStep.returned}</p>
        )}
      </div>

      <div className="mb-6 p-6 bg-zinc-950 rounded-lg border border-zinc-800">
        <div className="flex flex-col-reverse items-center gap-2 h-64">
          <AnimatePresence mode="popLayout">
            {currentStep.heap.map((item, _idx) => {
              const isCurrent = currentStep.item && currentStep.item.id === item.id;
              const color = getPriorityColor(item.priority);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-24 h-16 rounded-lg border-2 flex flex-col items-center justify-center font-mono font-bold text-white mb-2"
                  style={{
                    backgroundColor: isCurrent ? `${COLORS.current}40` : `${color}40`,
                    borderColor: isCurrent ? COLORS.current : color,
                  }}
                >
                  <div className="text-xs">{item.value}</div>
                  <div className="text-xs opacity-70">p={item.priority}</div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {currentStep.heap.length === 0 && (
            <div className="text-zinc-600 text-sm italic">Empty</div>
          )}
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.high} />
    </div>
  );
}
