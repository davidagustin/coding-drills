'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface StackItem {
  value: number;
  id: string; // stable key for AnimatePresence
}

type OpType = 'push' | 'pop' | 'peek';

interface Operation {
  type: OpType;
  value: number; // value being pushed, or value returned by pop/peek
  label: string; // display string, e.g. "push(10)" or "pop() -> 30"
}

interface StepState {
  stack: StackItem[];
  operation: Operation;
  returned: number | null;
  /** When a pop is about to happen we show the item highlighted before removal */
  poppingIndex: number | null;
}

/* ------------------------------------------------------------------ */
/*  Color palette for stack items                                      */
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
  // Deterministic color based on value
  return ITEM_COLORS[Math.abs(value) % ITEM_COLORS.length];
}

/* ------------------------------------------------------------------ */
/*  Pre-compute all operation steps                                    */
/* ------------------------------------------------------------------ */

/**
 * Operations: push(10), push(20), push(30), pop()->30, push(40),
 *             pop()->40, pop()->20, push(50), peek()->50
 *
 * We model each operation as TWO steps for push/pop to allow animation:
 *   push: step A = "pushing" (item appears with animation)
 *   pop:  step A = "popping" (item highlighted red), step B = "popped" (item removed)
 *   peek: single step (highlight top item)
 *
 * However, for simplicity and alignment with the shared hook (which advances
 * one step at a time), we use one step per operation and let CSS/Framer Motion
 * handle entrance/exit animations via AnimatePresence.
 */

const OPERATIONS: Operation[] = [
  { type: 'push', value: 10, label: 'push(10)' },
  { type: 'push', value: 20, label: 'push(20)' },
  { type: 'push', value: 30, label: 'push(30)' },
  { type: 'pop', value: 30, label: 'pop() -> 30' },
  { type: 'push', value: 40, label: 'push(40)' },
  { type: 'pop', value: 40, label: 'pop() -> 40' },
  { type: 'pop', value: 20, label: 'pop() -> 20' },
  { type: 'push', value: 50, label: 'push(50)' },
  { type: 'peek', value: 50, label: 'peek() -> 50' },
];

const TOTAL_STEPS = OPERATIONS.length;

let idCounter = 0;
function nextId(): string {
  return `item-${++idCounter}`;
}

function precomputeStates(): StepState[] {
  idCounter = 0;
  const states: StepState[] = [];
  let stack: StackItem[] = [];

  // Step 0 = initial state (empty stack, no operation yet) -- we handle this
  // in the component by checking step === 0.

  for (const op of OPERATIONS) {
    let returned: number | null = null;
    let poppingIndex: number | null = null;

    if (op.type === 'push') {
      stack = [...stack, { value: op.value, id: nextId() }];
    } else if (op.type === 'pop') {
      returned = op.value;
      poppingIndex = stack.length - 1;
      stack = stack.slice(0, -1);
    } else if (op.type === 'peek') {
      returned = op.value;
    }

    states.push({
      stack: [...stack],
      operation: op,
      returned,
      poppingIndex,
    });
  }

  return states;
}

const ALL_STATES = precomputeStates();

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function StackViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const step = controls.state.step;

  // Derive the current display state
  const currentState: StepState | null = step === 0 ? null : ALL_STATES[step - 1];
  const stackItems = currentState?.stack ?? [];
  const currentOp = currentState?.operation ?? null;
  const returned = currentState?.returned ?? null;

  // Build operation history (all operations executed so far)
  const history = useMemo(() => {
    if (step === 0) return [];
    return ALL_STATES.slice(0, step).map((s) => s.operation);
  }, [step]);

  // For pop operations, we want to show the item being removed. We track
  // the "previous step" stack so AnimatePresence can animate exit.
  // Actually, since we pre-removed the item in our state, the exit animation
  // is handled by AnimatePresence automatically when the item disappears.

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-5">
      {/* Title */}
      <div className="text-center space-y-1">
        <h3
          className="text-xl font-bold"
          style={{
            background: 'linear-gradient(135deg, #10b981, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Stack Operations
        </h3>
        <p className="text-zinc-500 text-sm">Last In, First Out (LIFO)</p>
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
                color:
                  currentOp.type === 'push'
                    ? '#10b981'
                    : currentOp.type === 'pop'
                      ? '#f97316'
                      : '#3b82f6',
              }}
            >
              {currentOp.label}
            </span>
            {returned !== null && (
              <span className="text-sm text-zinc-400 mt-0.5">
                Returned: <span className="font-mono font-bold text-yellow-400">{returned}</span>
              </span>
            )}
          </>
        ) : (
          <span className="text-zinc-600 text-sm italic">Press Play or Step to begin</span>
        )}
      </div>

      {/* Main content: Stack + History */}
      <div className="flex gap-6 justify-center items-start">
        {/* Stack visualization */}
        <div className="flex flex-col items-center">
          <span className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Stack</span>

          {/* Stack container */}
          <div className="relative flex flex-col-reverse items-center min-h-[260px] justify-start">
            {/* Bottom plate */}
            <div
              className="w-[220px] h-2 rounded-b-lg mt-1"
              style={{
                background: 'linear-gradient(90deg, #52525b, #71717a, #52525b)',
              }}
            />

            {/* Stack items */}
            <AnimatePresence mode="popLayout">
              {stackItems.map((item, index) => {
                const isTop = index === stackItems.length - 1;
                const isPeeking = currentOp?.type === 'peek' && isTop;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: -40, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      boxShadow: isPeeking
                        ? '0 0 16px rgba(59, 130, 246, 0.5)'
                        : '0 2px 8px rgba(0,0,0,0.3)',
                    }}
                    exit={{
                      opacity: 0,
                      y: -50,
                      scale: 0.8,
                      backgroundColor: '#ef4444',
                      transition: { duration: 0.3 },
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                    }}
                    className="relative w-[200px] py-3 rounded-lg mb-1 flex items-center justify-center"
                    style={{
                      backgroundColor: isPeeking ? '#3b82f6' : colorForValue(item.value),
                      border: isPeeking ? '2px solid #60a5fa' : '2px solid transparent',
                    }}
                  >
                    <span className="text-white font-mono font-bold text-lg">{item.value}</span>

                    {/* TOP label */}
                    {isTop && (
                      <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute -right-14 text-xs font-bold tracking-wider"
                        style={{ color: '#10b981' }}
                      >
                        TOP
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Empty state */}
            {stackItems.length === 0 && (
              <div className="w-[200px] py-8 flex items-center justify-center">
                <span className="text-zinc-600 text-sm italic">Empty</span>
              </div>
            )}
          </div>

          {/* Stack size */}
          <div className="mt-3 text-center">
            <span className="text-zinc-500 text-xs">Size: </span>
            <span className="text-zinc-300 font-mono font-bold text-sm">{stackItems.length}</span>
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
                        color:
                          op.type === 'push'
                            ? '#10b981'
                            : op.type === 'pop'
                              ? '#f97316'
                              : '#3b82f6',
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
      <VizControls controls={controls} accentColor="#10b981" />
    </div>
  );
}
