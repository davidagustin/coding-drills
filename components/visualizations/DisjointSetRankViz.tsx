'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const SIZE = 5;
const UNIONS: [number, number][] = [
  [0, 1],
  [2, 3],
  [1, 3],
];

interface DisjointSetRankStep {
  parent: number[];
  rank: number[];
  operation: string;
  x: number;
  y: number;
  rootX: number;
  rootY: number;
  explanation: string;
}

function computeSteps(): DisjointSetRankStep[] {
  const steps: DisjointSetRankStep[] = [];
  const parent: number[] = Array.from({ length: SIZE }, (_, i) => i);
  const rank: number[] = new Array(SIZE).fill(0);

  steps.push({
    parent: [...parent],
    rank: [...rank],
    operation: 'init',
    x: -1,
    y: -1,
    rootX: -1,
    rootY: -1,
    explanation: `Initialize: Each element is its own parent (root). All ranks are 0.`,
  });

  function find(x: number): number {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  for (let i = 0; i < UNIONS.length; i++) {
    const [x, y] = UNIONS[i];
    const rootX = find(x);
    const rootY = find(y);

    steps.push({
      parent: [...parent],
      rank: [...rank],
      operation: 'find',
      x,
      y,
      rootX,
      rootY,
      explanation: `Find roots: find(${x}) = ${rootX}, find(${y}) = ${rootY}`,
    });

    if (rootX === rootY) {
      steps.push({
        parent: [...parent],
        rank: [...rank],
        operation: 'skip',
        x,
        y,
        rootX,
        rootY,
        explanation: `Union(${x}, ${y}): Same root, skip (already connected)`,
      });
      continue;
    }

    if (rank[rootX] < rank[rootY]) {
      parent[rootX] = rootY;
      steps.push({
        parent: [...parent],
        rank: [...rank],
        operation: 'union',
        x,
        y,
        rootX,
        rootY,
        explanation: `Union(${x}, ${y}): rank[${rootX}] < rank[${rootY}], attach ${rootX} under ${rootY}`,
      });
    } else if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
      steps.push({
        parent: [...parent],
        rank: [...rank],
        operation: 'union',
        x,
        y,
        rootX,
        rootY,
        explanation: `Union(${x}, ${y}): rank[${rootX}] > rank[${rootY}], attach ${rootY} under ${rootX}`,
      });
    } else {
      parent[rootY] = rootX;
      rank[rootX]++;
      steps.push({
        parent: [...parent],
        rank: [...rank],
        operation: 'union',
        x,
        y,
        rootX,
        rootY,
        explanation: `Union(${x}, ${y}): Equal ranks, attach ${rootY} under ${rootX}, increment rank[${rootX}]`,
      });
    }
  }

  // Final path compression
  for (let i = 0; i < SIZE; i++) {
    find(i);
  }

  steps.push({
    parent: [...parent],
    rank: [...rank],
    operation: 'compress',
    x: -1,
    y: -1,
    rootX: -1,
    rootY: -1,
    explanation: `Path compression: All nodes now point directly to their roots`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function DisjointSetRankViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { parent, rank, x, y, rootX, rootY, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">
        Union-Find with Rank and Path Compression
      </h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Parent Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Parent Array</h3>
          <div className="flex gap-2 flex-wrap">
            {parent.map((p, idx) => {
              const isRoot = p === idx;
              const isX = idx === x;
              const isY = idx === y;
              const isRootX = idx === rootX && rootX !== -1;
              const isRootY = idx === rootY && rootY !== -1;
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-sm font-semibold border-2 ${
                    isRoot
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : isX || isY
                        ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                        : isRootX || isRootY
                          ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  <span className="text-xs text-zinc-500">{idx}</span>
                  <span className="text-lg">{p}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rank Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Rank Array</h3>
          <div className="flex gap-2 flex-wrap">
            {rank.map((r, idx) => {
              const isRootX = idx === rootX && rootX !== -1;
              const isRootY = idx === rootY && rootY !== -1;
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-sm font-semibold border-2 ${
                    isRootX || isRootY
                      ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  <span className="text-xs text-zinc-500">{idx}</span>
                  <span className="text-lg">{r}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
