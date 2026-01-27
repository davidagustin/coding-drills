'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface QueueItem {
  value: number;
  id: string;
}

type OpType = 'enqueue' | 'dequeue';

interface Operation {
  type: OpType;
  value: number;
  label: string;
}

interface StepState {
  queue: QueueItem[];
  operation: Operation;
  returned: number | null;
  dequeuingIndex: number | null;
}

/* ------------------------------------------------------------------ */
/*  Color palette                                                      */
/* ------------------------------------------------------------------ */

const ITEM_COLORS: string[] = [
  '#6366f1', // indigo
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#f59e0b', // amber
  '#10b981', // emerald
  '#3b82f6', // blue
  '#ef4444', // red
  '#14b8a6', // teal
  '#f97316', // orange
  '#a855f7', // purple
];

function colorForValue(value: number): string {
  return ITEM_COLORS[Math.abs(value) % ITEM_COLORS.length];
}

/* ------------------------------------------------------------------ */
/*  Pre-compute all operation steps                                    */
/* ------------------------------------------------------------------ */

const OPERATIONS: Operation[] = [
  { type: 'enqueue', value: 1, label: 'enqueue(1)' },
  { type: 'enqueue', value: 2, label: 'enqueue(2)' },
  { type: 'enqueue', value: 3, label: 'enqueue(3)' },
  { type: 'dequeue', value: 1, label: 'dequeue() -> 1' },
  { type: 'enqueue', value: 4, label: 'enqueue(4)' },
  { type: 'dequeue', value: 2, label: 'dequeue() -> 2' },
  { type: 'dequeue', value: 3, label: 'dequeue() -> 3' },
  { type: 'enqueue', value: 5, label: 'enqueue(5)' },
];

const TOTAL_STEPS = OPERATIONS.length;

let idCounter = 0;
function nextId(): string {
  return `item-${++idCounter}`;
}

function precomputeStates(): StepState[] {
  idCounter = 0;
  const states: StepState[] = [];
  let queue: QueueItem[] = [];

  for (const op of OPERATIONS) {
    let returned: number | null = null;
    let dequeuingIndex: number | null = null;

    if (op.type === 'enqueue') {
      queue = [...queue, { value: op.value, id: nextId() }];
    } else if (op.type === 'dequeue') {
      if (queue.length > 0) {
        returned = op.value;
        dequeuingIndex = 0;
        queue = queue.slice(1);
      } else {
        returned = null;
      }
    }

    states.push({
      queue: [...queue],
      operation: op,
      returned,
      dequeuingIndex,
    });
  }

  return states;
}

const ALL_STATES = precomputeStates();

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function QueueViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const step = controls.state.step;

  const currentState: StepState | null = step === 0 ? null : ALL_STATES[step - 1];
  const queueItems = currentState?.queue ?? [];
  const currentOp = currentState?.operation ?? null;
  const returned = currentState?.returned ?? null;

  const history = useMemo(() => {
    if (step === 0) return [];
    return ALL_STATES.slice(0, step).map((s) => s.operation);
  }, [step]);

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-5">
      {/* Title */}
      <div className="text-center space-y-1">
        <h3
          className="text-xl font-bold"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Queue Operations
        </h3>
        <p className="text-zinc-500 text-sm">First In, First Out (FIFO)</p>
      </div>

      {/* Current operation display */}
      <div className="text-center min-h-[3rem] flex flex-col items-center justify-center">
        {currentOp ? (
          <>
            <span className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
              Current Operation
            </span>
            <span
              className="text-lg font-mono font-bold"
              style={{
                color: currentOp.type === 'enqueue' ? '#10b981' : '#f97316',
              }}
            >
              {currentOp.label}
            </span>
            {returned !== null && (
              <span className="text-sm text-zinc-400 mt-0.5">
                Returned:{' '}
                <span className="font-mono font-bold text-yellow-400">
                  {returned === null ? 'null' : returned}
                </span>
              </span>
            )}
          </>
        ) : (
          <span className="text-zinc-600 text-sm italic">Press Play or Step to begin</span>
        )}
      </div>

      {/* Main content: Queue + History */}
      <div className="flex gap-6 justify-center items-start">
        {/* Queue visualization */}
        <div className="flex flex-col items-center">
          <span className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Queue</span>

          {/* Queue container - horizontal */}
          <div className="relative flex items-center min-w-[400px] min-h-[120px] justify-start px-4">
            {/* Left arrow (front) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="text-xs font-bold text-zinc-500 mb-1">FRONT</span>
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-blue-500" />
            </div>

            {/* Queue items */}
            <div className="flex gap-2 items-center ml-8">
              <AnimatePresence mode="popLayout">
                {queueItems.map((item, index) => {
                  const isFront = index === 0;
                  const isBack = index === queueItems.length - 1;
                  const isDequeuing = currentOp?.type === 'dequeue' && index === 0;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -40, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        boxShadow: isDequeuing
                          ? '0 0 16px rgba(239, 68, 68, 0.5)'
                          : '0 2px 8px rgba(0,0,0,0.3)',
                      }}
                      exit={{
                        opacity: 0,
                        x: -50,
                        scale: 0.8,
                        backgroundColor: '#ef4444',
                        transition: { duration: 0.3 },
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                      }}
                      className="relative py-3 px-6 rounded-lg flex items-center justify-center min-w-[60px]"
                      style={{
                        backgroundColor: isDequeuing ? '#ef4444' : colorForValue(item.value),
                        border: isDequeuing ? '2px solid #f87171' : '2px solid transparent',
                      }}
                    >
                      <span className="text-white font-mono font-bold text-lg">{item.value}</span>

                      {/* FRONT label */}
                      {isFront && (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold tracking-wider"
                          style={{ color: '#3b82f6' }}
                        >
                          FRONT
                        </motion.span>
                      )}

                      {/* BACK label */}
                      {isBack && (
                        <motion.span
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold tracking-wider"
                          style={{ color: '#10b981' }}
                        >
                          BACK
                        </motion.span>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Right arrow (back) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="text-xs font-bold text-zinc-500 mb-1">BACK</span>
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-green-500" />
            </div>

            {/* Empty state */}
            {queueItems.length === 0 && (
              <div className="w-full py-8 flex items-center justify-center">
                <span className="text-zinc-600 text-sm italic">Empty</span>
              </div>
            )}
          </div>

          {/* Queue size */}
          <div className="mt-3 text-center">
            <span className="text-zinc-500 text-xs">Size: </span>
            <span className="text-zinc-300 font-mono font-bold text-sm">{queueItems.length}</span>
          </div>
        </div>

        {/* Operation history */}
        <div className="flex flex-col min-w-[180px]">
          <span className="text-zinc-500 text-xs uppercase tracking-wider mb-2 text-center">
            Operation History
          </span>
          <div className="bg-zinc-800 rounded-lg border border-zinc-700 p-3 min-h-[260px] max-h-[300px] overflow-y-auto">
            {history.length === 0 ? (
              <span className="text-zinc-600 text-xs italic">No operations yet</span>
            ) : (
              <ol className="space-y-1.5 list-none m-0 p-0">
                {history.map((op, i) => (
                  <motion.li
                    key={`${op.label}-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-zinc-600 text-xs font-mono w-4 text-right shrink-0">
                      {i + 1}.
                    </span>
                    <span
                      className="text-xs font-mono font-medium"
                      style={{
                        color: op.type === 'enqueue' ? '#10b981' : '#f97316',
                      }}
                    >
                      {op.label}
                    </span>
                  </motion.li>
                ))}
              </ol>
            )}
          </div>

          {/* Step counter */}
          <div className="mt-2 text-center">
            <span className="text-zinc-600 text-xs">
              Step {step} / {TOTAL_STEPS}
            </span>
          </div>
        </div>
      </div>

      {/* Shared controls */}
      <VizControls controls={controls} accentColor="#3b82f6" />
    </div>
  );
}
