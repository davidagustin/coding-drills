'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const OPERATIONS: Array<['enqueue' | 'dequeue', number | null]> = [
  ['enqueue', 1],
  ['enqueue', 2],
  ['dequeue', null],
  ['enqueue', 3],
  ['dequeue', null],
];

interface QueueStep {
  operation: 'enqueue' | 'dequeue';
  value: number | null;
  inStack: number[];
  outStack: number[];
  explanation: string;
  returned: number | null;
}

function computeSteps(): QueueStep[] {
  const steps: QueueStep[] = [];
  const inStack: number[] = [];
  const outStack: number[] = [];

  for (const [op, val] of OPERATIONS) {
    if (op === 'enqueue') {
      if (val === null || val === undefined) continue;
      inStack.push(val);
      steps.push({
        operation: 'enqueue',
        value: val,
        inStack: [...inStack],
        outStack: [...outStack],
        explanation: `Enqueue ${val}: push to inStack`,
        returned: null,
      });
    } else {
      if (outStack.length === 0) {
        while (inStack.length > 0) {
          const transferred = inStack.pop();
          if (transferred === undefined) break;
          outStack.push(transferred);
          steps.push({
            operation: 'dequeue',
            value: null,
            inStack: [...inStack],
            outStack: [...outStack],
            explanation: `Transfer ${transferred} from inStack to outStack`,
            returned: null,
          });
        }
      }
      const returned = outStack.pop();
      if (returned === undefined) continue;
      steps.push({
        operation: 'dequeue',
        value: null,
        inStack: [...inStack],
        outStack: [...outStack],
        explanation: `Dequeue: pop from outStack → ${returned}`,
        returned,
      });
    }
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  inStack: '#3b82f6',
  outStack: '#22c55e',
  current: '#eab308',
} as const;

export default function TwoStackQueueViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Queue Using Two Stacks</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {currentStep.returned !== null && (
          <p className="text-yellow-400 font-bold text-lg mt-2">Returned: {currentStep.returned}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-sm font-semibold text-zinc-300 mb-2">In Stack</h3>
          <div className="h-48 bg-zinc-950 rounded-lg border border-zinc-800 flex flex-col-reverse items-center p-4">
            <AnimatePresence mode="popLayout">
              {currentStep.inStack.map((val, idx) => (
                <motion.div
                  key={`in-${val}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-20 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white mb-2"
                  style={{
                    backgroundColor: `${COLORS.inStack}40`,
                    borderColor: COLORS.inStack,
                  }}
                >
                  {val}
                </motion.div>
              ))}
            </AnimatePresence>
            {currentStep.inStack.length === 0 && (
              <div className="text-zinc-600 text-sm italic">Empty</div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-zinc-300 mb-2">Out Stack</h3>
          <div className="h-48 bg-zinc-950 rounded-lg border border-zinc-800 flex flex-col-reverse items-center p-4">
            <AnimatePresence mode="popLayout">
              {currentStep.outStack.map((val, idx) => (
                <motion.div
                  key={`out-${val}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-20 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white mb-2"
                  style={{
                    backgroundColor: `${COLORS.outStack}40`,
                    borderColor: COLORS.outStack,
                  }}
                >
                  {val}
                </motion.div>
              ))}
            </AnimatePresence>
            {currentStep.outStack.length === 0 && (
              <div className="text-zinc-600 text-sm italic">Empty</div>
            )}
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.inStack} />
    </div>
  );
}
