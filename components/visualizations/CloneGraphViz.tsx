'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

interface GraphNode {
  val: number;
  neighbors: GraphNode[];
}

const ORIGINAL: GraphNode = {
  val: 1,
  neighbors: [
    {
      val: 2,
      neighbors: [
        {
          val: 3,
          neighbors: [],
        },
      ],
    },
  ],
};
ORIGINAL.neighbors[0].neighbors[0].neighbors.push(ORIGINAL);

interface CloneStep {
  node: number | null;
  action: string;
  explanation: string;
  cloned: Set<number>;
}

function computeSteps(): CloneStep[] {
  const steps: CloneStep[] = [];
  const cloned = new Set<number>();

  function dfs(node: GraphNode): void {
    if (cloned.has(node.val)) {
      steps.push({
        node: node.val,
        action: 'skip',
        explanation: `Node ${node.val} already cloned → skip`,
        cloned: new Set(cloned),
      });
      return;
    }

    steps.push({
      node: node.val,
      action: 'clone',
      explanation: `Clone node ${node.val}`,
      cloned: new Set(cloned),
    });
    cloned.add(node.val);

    for (const neighbor of node.neighbors) {
      dfs(neighbor);
    }
  }

  dfs(ORIGINAL);

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  original: '#3b82f6',
  cloned: '#22c55e',
  current: '#eab308',
} as const;

export default function CloneGraphViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Clone Graph (DFS)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-zinc-300 mb-3">Original Graph</h3>
          <div className="flex gap-2">
            {[1, 2, 3].map((val) => (
              <div
                key={val}
                className="w-16 h-16 rounded-full border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: `${COLORS.original}20`,
                  borderColor: COLORS.original,
                }}
              >
                {val}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-300 mb-3">Cloned Graph</h3>
          <div className="flex gap-2">
            {[1, 2, 3].map((val) => {
              const isCloned = currentStep.cloned.has(val);
              return (
                <motion.div
                  key={val}
                  className="w-16 h-16 rounded-full border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: `${isCloned ? COLORS.cloned : COLORS.original}20`,
                    borderColor: isCloned ? COLORS.cloned : COLORS.original,
                  }}
                  animate={{ scale: isCloned ? 1.1 : 1 }}
                >
                  {val}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.original} />
    </div>
  );
}
