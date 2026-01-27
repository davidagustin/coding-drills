'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const GRAPH: Record<string, string[]> = {
  a: ['b', 'c'],
  b: ['d'],
  c: ['d'],
  d: [],
};

interface TopoStep {
  node: string | null;
  inDegree: Record<string, number>;
  queue: string[];
  result: string[];
  explanation: string;
}

function computeSteps(): TopoStep[] {
  const steps: TopoStep[] = [];
  const inDegree: Record<string, number> = {};
  const result: string[] = [];

  for (const node in GRAPH) {
    inDegree[node] = 0;
  }
  for (const node in GRAPH) {
    for (const neighbor of GRAPH[node]) {
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
    }
  }

  steps.push({
    node: null,
    inDegree: { ...inDegree },
    queue: [],
    result: [],
    explanation: `Calculate in-degrees: ${JSON.stringify(inDegree)}`,
  });

  const queue = Object.keys(inDegree).filter((n) => inDegree[n] === 0);

  steps.push({
    node: null,
    inDegree: { ...inDegree },
    queue: [...queue],
    result: [],
    explanation: `Start with nodes having in-degree 0: [${queue.join(', ')}]`,
  });

  while (queue.length > 0) {
    const node = queue.shift();
    if (!node) break;
    result.push(node);

    steps.push({
      node,
      inDegree: { ...inDegree },
      queue: [...queue],
      result: [...result],
      explanation: `Process node "${node}", add to result`,
    });

    for (const neighbor of GRAPH[node] || []) {
      inDegree[neighbor]--;
      steps.push({
        node: neighbor,
        inDegree: { ...inDegree },
        queue: [...queue],
        result: [...result],
        explanation: `Decrement in-degree of "${neighbor}" to ${inDegree[neighbor]}`,
      });

      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
        steps.push({
          node: neighbor,
          inDegree: { ...inDegree },
          queue: [...queue],
          result: [...result],
          explanation: `"${neighbor}" now has in-degree 0 → add to queue`,
        });
      }
    }
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  processed: '#22c55e',
  queued: '#3b82f6',
} as const;

export default function TopologicalSortViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">
        Topological Sort (Kahn&apos;s Algorithm)
      </h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Topological Order: [{currentStep.result.join(', ')}]
          </p>
        )}
      </div>

      <div className="mb-6 flex items-center justify-center gap-4">
        {Object.keys(GRAPH).map((node) => {
          const isCurrent = currentStep.node === node;
          const isProcessed = currentStep.result.includes(node);
          const isQueued = currentStep.queue.includes(node);
          const inDegree = currentStep.inDegree[node] || 0;

          let bgColor = '#1f2937';
          if (isProcessed) bgColor = COLORS.processed;
          else if (isCurrent) bgColor = COLORS.current;
          else if (isQueued) bgColor = COLORS.queued;

          return (
            <motion.div
              key={node}
              className="flex flex-col items-center"
              animate={{ scale: isCurrent ? 1.1 : 1 }}
            >
              <div
                className="w-16 h-16 rounded-full border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: `${bgColor}40`,
                  borderColor: bgColor,
                }}
              >
                {node}
              </div>
              <div className="text-xs text-zinc-500 mt-1">in={inDegree}</div>
            </motion.div>
          );
        })}
      </div>

      <VizControls controls={controls} accentColor={COLORS.queued} />
    </div>
  );
}
