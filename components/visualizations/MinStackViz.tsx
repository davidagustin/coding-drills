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
  id: string;
}

interface Operation {
  type: 'push' | 'pop' | 'top' | 'getMin';
  value: number | null;
  label: string;
}

interface StepState {
  mainStack: StackItem[];
  minStack: StackItem[];
  operation: Operation;
  returned: number | null;
  highlighting: {
    main: number | null;
    min: number | null;
  };
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
/*  Pre-compute operations                                             */
/* ------------------------------------------------------------------ */

const OPERATIONS: Operation[] = [
  { type: 'push', value: -2, label: 'push(-2)' },
  { type: 'push', value: 0, label: 'push(0)' },
  { type: 'push', value: -3, label: 'push(-3)' },
  { type: 'getMin', value: null, label: 'getMin()' },
  { type: 'pop', value: -3, label: 'pop()' },
  { type: 'top', value: 0, label: 'top()' },
  { type: 'getMin', value: null, label: 'getMin()' },
];

let idCounter = 0;
function nextId(): string {
  return `item-${++idCounter}`;
}

function precomputeStates(): StepState[] {
  idCounter = 0;
  const states: StepState[] = [];
  let mainStack: StackItem[] = [];
  let minStack: StackItem[] = [];

  for (const op of OPERATIONS) {
    let returned: number | null = null;
    const highlighting = { main: null as number | null, min: null as number | null };

    if (op.type === 'push') {
      if (op.value === null || op.value === undefined) continue;
      const newItem = { value: op.value, id: nextId() };
      mainStack = [...mainStack, newItem];

      if (minStack.length === 0 || op.value <= minStack[minStack.length - 1].value) {
        minStack = [...minStack, { value: op.value, id: nextId() }];
        highlighting.min = minStack.length - 1;
      }
      highlighting.main = mainStack.length - 1;
    } else if (op.type === 'pop') {
      const popped = mainStack[mainStack.length - 1];
      mainStack = mainStack.slice(0, -1);
      returned = popped.value;

      if (minStack.length > 0 && popped.value === minStack[minStack.length - 1].value) {
        minStack = minStack.slice(0, -1);
        highlighting.min = minStack.length > 0 ? minStack.length - 1 : null;
      }
    } else if (op.type === 'top') {
      returned = mainStack[mainStack.length - 1]?.value ?? null;
      highlighting.main = mainStack.length - 1;
    } else if (op.type === 'getMin') {
      returned = minStack[minStack.length - 1]?.value ?? null;
      highlighting.min = minStack.length - 1;
    }

    states.push({
      mainStack: [...mainStack],
      minStack: [...minStack],
      operation: op,
      returned,
      highlighting: { ...highlighting },
    });
  }

  return states;
}

const ALL_STATES = precomputeStates();
const TOTAL_STEPS = ALL_STATES.length;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MinStackViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const step = controls.state.step;

  const currentState: StepState | null = step === 0 ? null : ALL_STATES[step - 1];
  const mainStack = currentState?.mainStack ?? [];
  const minStack = currentState?.minStack ?? [];
  const currentOp = currentState?.operation ?? null;
  const returned = currentState?.returned ?? null;

  const history = useMemo(() => {
    if (step === 0) return [];
    return ALL_STATES.slice(0, step).map((s) => s.operation);
  }, [step]);

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-5">
      <div className="text-center space-y-1">
        <h3
          className="text-xl font-bold"
          style={{
            background: 'linear-gradient(135deg, #10b981, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Min Stack (O(1) getMin)
        </h3>
        <p className="text-zinc-500 text-sm">Auxiliary stack tracks minimums</p>
      </div>

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
                      : currentOp.type === 'getMin'
                        ? '#eab308'
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

      <div className="grid grid-cols-2 gap-6">
        {/* Main Stack */}
        <div className="space-y-3">
          <div className="text-center">
            <h4 className="text-sm font-semibold text-zinc-300 mb-2">Main Stack</h4>
            <div className="relative h-64 bg-zinc-950 rounded-lg border border-zinc-800 flex flex-col-reverse items-center p-4">
              <AnimatePresence mode="popLayout">
                {mainStack.map((item, idx) => {
                  const isHighlighted = currentState?.highlighting.main === idx;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        borderColor: isHighlighted ? '#eab308' : colorForValue(item.value),
                        boxShadow: isHighlighted
                          ? `0 0 20px ${colorForValue(item.value)}40`
                          : 'none',
                      }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="w-20 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white mb-2"
                      style={{
                        backgroundColor: colorForValue(item.value),
                      }}
                    >
                      {item.value}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {mainStack.length === 0 && <div className="text-zinc-600 text-sm italic">Empty</div>}
            </div>
          </div>
        </div>

        {/* Min Stack */}
        <div className="space-y-3">
          <div className="text-center">
            <h4 className="text-sm font-semibold text-zinc-300 mb-2">Min Stack</h4>
            <div className="relative h-64 bg-zinc-950 rounded-lg border border-zinc-800 flex flex-col-reverse items-center p-4">
              <AnimatePresence mode="popLayout">
                {minStack.map((item, idx) => {
                  const isHighlighted = currentState?.highlighting.min === idx;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        borderColor: isHighlighted ? '#eab308' : '#10b981',
                        boxShadow: isHighlighted ? '0 0 20px #10b98140' : 'none',
                      }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="w-20 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white mb-2"
                      style={{
                        backgroundColor: '#10b981',
                      }}
                    >
                      {item.value}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {minStack.length === 0 && <div className="text-zinc-600 text-sm italic">Empty</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Operation History */}
      {history.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-zinc-300">Operation History</h4>
          <div className="flex flex-wrap gap-2">
            {history.map((op, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-800 text-zinc-300 border border-zinc-700"
              >
                {op.label}
              </span>
            ))}
          </div>
        </div>
      )}

      <VizControls controls={controls} accentColor="#3b82f6" />
    </div>
  );
}
