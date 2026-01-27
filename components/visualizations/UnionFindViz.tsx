'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const N = 5;
const OPERATIONS: Array<['union' | 'find', number, number?]> = [
  ['union', 0, 1],
  ['union', 2, 3],
  ['union', 1, 2],
  ['find', 0],
];

interface UFStep {
  operation: 'union' | 'find';
  x: number;
  y: number | null;
  parent: number[];
  explanation: string;
}

function computeSteps(): UFStep[] {
  const steps: UFStep[] = [];
  const parent = Array.from({ length: N }, (_, i) => i);

  steps.push({
    operation: 'find',
    x: 0,
    y: null,
    parent: [...parent],
    explanation: 'Initialize: each element is its own parent',
  });

  function find(x: number): number {
    if (parent[x] !== x) {
      const oldParent = parent[x];
      parent[x] = find(parent[x]);
      if (oldParent !== parent[x]) {
        steps.push({
          operation: 'find',
          x,
          y: null,
          parent: [...parent],
          explanation: `Path compression: parent[${x}] = find(${oldParent}) = ${parent[x]}`,
        });
      }
    }
    return parent[x];
  }

  function union(x: number, y: number): void {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX !== rootY) {
      parent[rootX] = rootY;
      steps.push({
        operation: 'union',
        x,
        y,
        parent: [...parent],
        explanation: `Union ${x} and ${y}: parent[${rootX}] = ${rootY}`,
      });
    }
  }

  for (const [op, x, y] of OPERATIONS) {
    if (op === 'union' && y !== undefined) {
      union(x, y);
    } else {
      const root = find(x);
      steps.push({
        operation: 'find',
        x,
        y: null,
        parent: [...parent],
        explanation: `Find(${x}) = ${root}`,
      });
    }
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  connected: '#22c55e',
  default: '#3b82f6',
} as const;

export default function UnionFindViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const components = useMemo(() => {
    const comps: Record<number, number[]> = {};
    for (let i = 0; i < N; i++) {
      let root = i;
      let temp = i;
      while (currentStep.parent[temp] !== temp) {
        temp = currentStep.parent[temp];
      }
      root = temp;
      if (!comps[root]) comps[root] = [];
      comps[root].push(i);
    }
    return comps;
  }, [currentStep.parent]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Union-Find (Disjoint Set)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
      </div>

      <div className="mb-6 flex items-center justify-center gap-4">
        {Array.from({ length: N }, (_, i) => {
          const isCurrent = currentStep.x === i || currentStep.y === i;
          const root = (() => {
            let r = i;
            while (currentStep.parent[r] !== r) {
              r = currentStep.parent[r];
            }
            return r;
          })();

          return (
            <motion.div
              key={i}
              className="flex flex-col items-center"
              animate={{ scale: isCurrent ? 1.1 : 1 }}
            >
              <div
                className="w-16 h-16 rounded-full border-2 flex items-center justify-center font-mono font-bold text-white"
                style={{
                  backgroundColor: isCurrent ? `${COLORS.current}40` : `${COLORS.default}40`,
                  borderColor: isCurrent ? COLORS.current : COLORS.default,
                }}
              >
                {i}
              </div>
              <div className="text-xs text-zinc-500 mt-1">parent={currentStep.parent[i]}</div>
              <div className="text-xs text-green-400 mt-1">root={root}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <div className="text-sm text-zinc-400 mb-2">Connected Components:</div>
        <div className="flex gap-2 flex-wrap">
          {Object.values(components).map((comp, idx) => (
            <div key={idx} className="flex gap-1">
              {comp.map((node) => (
                <span
                  key={node}
                  className="px-2 py-1 rounded bg-zinc-700 text-white font-mono text-sm"
                >
                  {node}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.default} />
    </div>
  );
}
