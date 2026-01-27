'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const EDGES = [
  [0, 1, 10],
  [0, 2, 6],
  [0, 3, 5],
  [1, 3, 15],
  [2, 3, 4],
];
const V = 4;

interface KruskalStep {
  edges: number[][];
  mst: number[][];
  selected: number[];
  parent: number[];
  explanation: string;
}

function computeSteps(): KruskalStep[] {
  const steps: KruskalStep[] = [];
  const sortedEdges = [...EDGES].sort((a, b) => a[2] - b[2]);
  const parent = Array.from({ length: V }, (_, i) => i);
  const mst: number[][] = [];

  function find(x: number): number {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  function union(x: number, y: number): boolean {
    const px = find(x);
    const py = find(y);
    if (px === py) return false;
    parent[px] = py;
    return true;
  }

  steps.push({
    edges: [...sortedEdges],
    mst: [],
    selected: [],
    parent: [...parent],
    explanation: 'Start: Kruskal MST algorithm',
  });

  for (const [u, v, w] of sortedEdges) {
    steps.push({
      edges: [...sortedEdges],
      mst: [...mst],
      selected: [u, v],
      parent: [...parent],
      explanation: `Consider edge ${u}-${v} (weight ${w})`,
    });

    if (union(u, v)) {
      mst.push([u, v, w]);
      steps.push({
        edges: [...sortedEdges],
        mst: [...mst],
        selected: [u, v],
        parent: [...parent],
        explanation: `Add edge ${u}-${v} to MST (no cycle)`,
      });
    } else {
      steps.push({
        edges: [...sortedEdges],
        mst: [...mst],
        selected: [u, v],
        parent: [...parent],
        explanation: `Skip edge ${u}-${v} (would create cycle)`,
      });
    }
  }

  steps.push({
    edges: [...sortedEdges],
    mst: [...mst],
    selected: [],
    parent: [...parent],
    explanation: `Complete: MST with ${mst.length} edges`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  selected: '#22c55e',
  skipped: '#6b7280',
  default: '#3b82f6',
} as const;

export default function KruskalMSTViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { edges, mst, selected, explanation } = currentStep;
  const mstEdges = new Set(mst.map((e) => `${e[0]}-${e[1]}`));

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Kruskal&apos;s MST</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Edges (sorted by weight)</h3>
        <div className="space-y-2">
          {edges.map(([u, v, w], idx) => {
            const isCurrent = selected[0] === u && selected[1] === v;
            const inMST = mstEdges.has(`${u}-${v}`);

            let bgColor: string = COLORS.default;
            if (isCurrent) {
              bgColor = COLORS.current;
            } else if (inMST) {
              bgColor = COLORS.selected;
            }

            return (
              <motion.div
                key={idx}
                className="p-3 rounded-lg border-2 flex items-center justify-between"
                style={{
                  backgroundColor: bgColor + '20',
                  borderColor: bgColor,
                }}
                animate={{
                  scale: isCurrent ? 1.05 : 1,
                }}
              >
                <span className="text-white font-mono">
                  {u} → {v} (weight: {w})
                </span>
                {inMST && <span className="text-green-400 text-sm">✓ In MST</span>}
              </motion.div>
            );
          })}
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
