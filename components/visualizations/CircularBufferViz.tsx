'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const CAPACITY = 3;
const OPERATIONS: Array<['enqueue' | 'dequeue', number?]> = [
  ['enqueue', 1],
  ['enqueue', 2],
  ['enqueue', 3],
  ['enqueue', 4],
  ['dequeue'],
];

interface CircularBufferStep {
  buffer: (number | undefined)[];
  head: number;
  tail: number;
  count: number;
  operation: number;
  explanation: string;
}

function computeSteps(): CircularBufferStep[] {
  const steps: CircularBufferStep[] = [];
  const buffer: (number | undefined)[] = new Array(CAPACITY);
  let head = 0;
  let tail = 0;
  let count = 0;

  steps.push({
    buffer: [...buffer],
    head,
    tail,
    count,
    operation: -1,
    explanation: `Start: Create circular buffer with capacity ${CAPACITY}`,
  });

  for (let op = 0; op < OPERATIONS.length; op++) {
    const [type, value] = OPERATIONS[op];
    if (type === 'enqueue') {
      if (count === CAPACITY) {
        steps.push({
          buffer: [...buffer],
          head,
          tail,
          count,
          operation: op,
          explanation: `Operation ${op + 1}: enqueue(${value}) → buffer full, rejected`,
        });
      } else {
        buffer[tail] = value;
        tail = (tail + 1) % CAPACITY;
        count++;
        steps.push({
          buffer: [...buffer],
          head,
          tail,
          count,
          operation: op,
          explanation: `Operation ${op + 1}: enqueue(${value}) → tail = ${tail}, count = ${count}`,
        });
      }
    } else {
      if (count === 0) {
        steps.push({
          buffer: [...buffer],
          head,
          tail,
          count,
          operation: op,
          explanation: `Operation ${op + 1}: dequeue() → buffer empty, return null`,
        });
      } else {
        const val = buffer[head];
        buffer[head] = undefined;
        head = (head + 1) % CAPACITY;
        count--;
        steps.push({
          buffer: [...buffer],
          head,
          tail,
          count,
          operation: op,
          explanation: `Operation ${op + 1}: dequeue() → return ${val}, head = ${head}, count = ${count}`,
        });
      }
    }
  }

  steps.push({
    buffer: [...buffer],
    head,
    tail,
    count,
    operation: -1,
    explanation: `Complete: Final state`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function CircularBufferViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { buffer, head, tail, count, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Circular Buffer</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Buffer */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Buffer</h3>
          <div className="flex gap-2 items-center">
            {buffer.map((val, idx) => {
              const isHead = idx === head && count > 0;
              const isTail = idx === tail && count < CAPACITY;
              const isEmpty = val === undefined;
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className={`w-20 h-20 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 ${
                      isHead && isTail
                        ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                        : isHead
                          ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                          : isTail
                            ? 'bg-green-500/20 border-green-500 text-green-400'
                            : isEmpty
                              ? 'bg-zinc-800 border-zinc-700 text-zinc-500'
                              : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                    }`}
                  >
                    {val ?? '—'}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {isHead && 'H'}
                    {isTail && 'T'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-400 mb-1">Head</div>
            <div className="text-2xl font-bold text-blue-400">{head}</div>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-400 mb-1">Tail</div>
            <div className="text-2xl font-bold text-green-400">{tail}</div>
          </div>
          <div className="p-4 bg-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-400 mb-1">Count</div>
            <div className="text-2xl font-bold text-purple-400">{count}</div>
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
