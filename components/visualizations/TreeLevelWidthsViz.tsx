'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// Simple tree: 1 -> 2, 3; 2 -> 4, 5
const TREE = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4, left: null, right: null },
    right: { value: 5, left: null, right: null },
  },
  right: {
    value: 3,
    left: null,
    right: null,
  },
};

interface TreeLevelWidthsStep {
  queue: Array<{ value: number }>;
  widths: number[];
  currentLevel: number;
  levelSize: number;
  explanation: string;
}

function computeSteps(): TreeLevelWidthsStep[] {
  const steps: TreeLevelWidthsStep[] = [];
  const widths: number[] = [];
  const queue: Array<{ value: number; left: unknown; right: unknown }> = [TREE];
  let level = 0;

  steps.push({
    queue: queue.map((n) => ({ value: n.value })),
    widths: [],
    currentLevel: -1,
    levelSize: 0,
    explanation: `Start: Initialize queue with root node`,
  });

  while (queue.length > 0) {
    const levelSize = queue.length;
    widths.push(levelSize);

    steps.push({
      queue: queue.map((n) => ({ value: n.value })),
      widths: [...widths],
      currentLevel: level,
      levelSize,
      explanation: `Level ${level}: ${levelSize} node(s) in queue, width = ${levelSize}`,
    });

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (!node) continue;

      steps.push({
        queue: queue.map((n) => ({ value: n.value })),
        widths: [...widths],
        currentLevel: level,
        levelSize,
        explanation: `Process node ${node.value} at level ${level}`,
      });

      if (node.left) {
        queue.push(node.left as { value: number; left: unknown; right: unknown });
        steps.push({
          queue: queue.map((n) => ({ value: n.value })),
          widths: [...widths],
          currentLevel: level,
          levelSize,
          explanation: `Enqueue left child ${(node.left as { value: number }).value} for level ${level + 1}`,
        });
      }

      if (node.right) {
        queue.push(node.right as { value: number; left: unknown; right: unknown });
        steps.push({
          queue: queue.map((n) => ({ value: n.value })),
          widths: [...widths],
          currentLevel: level,
          levelSize,
          explanation: `Enqueue right child ${(node.right as { value: number }).value} for level ${level + 1}`,
        });
      }
    }

    level++;
  }

  steps.push({
    queue: [],
    widths: [...widths],
    currentLevel: -1,
    levelSize: 0,
    explanation: `Complete: Level widths = [${widths.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function TreeLevelWidthsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { queue, widths, currentLevel, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Tree Level Widths</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Queue */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Queue</h3>
          {queue.length === 0 ? (
            <div className="p-4 bg-zinc-800 rounded-lg text-center text-zinc-500">(empty)</div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {queue.map((node, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-cyan-500/20 border-2 border-cyan-500 rounded-lg font-mono text-sm font-semibold text-cyan-400"
                >
                  {node.value}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Widths */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Level Widths</h3>
          {widths.length === 0 ? (
            <div className="p-4 bg-zinc-800 rounded-lg text-center text-zinc-500">(empty)</div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {widths.map((width, idx) => {
                const isCurrent = idx === currentLevel && currentLevel !== -1;
                return (
                  <div
                    key={idx}
                    className={`px-4 py-2 rounded-lg font-mono text-sm font-semibold border-2 ${
                      isCurrent
                        ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                        : 'bg-green-500/20 border-green-500 text-green-400'
                    }`}
                  >
                    Level {idx}: {width}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
