'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const EDGES = [
  [0, 1, -1],
  [0, 2, 4],
  [1, 2, 3],
  [1, 3, 2],
  [1, 4, 2],
  [3, 2, 5],
  [3, 1, 1],
  [4, 3, -3],
];
const V = 5;
const START = 0;

interface BellmanFordStep {
  dist: number[];
  iteration: number;
  edge: number[];
  updated: boolean;
  explanation: string;
}

function computeSteps(): BellmanFordStep[] {
  const steps: BellmanFordStep[] = [];
  const dist = new Array(V).fill(Infinity);
  dist[START] = 0;

  steps.push({
    dist: [...dist],
    iteration: 0,
    edge: [],
    updated: false,
    explanation: `Start: Bellman-Ford from node ${START}`,
  });

  for (let i = 0; i < V - 1; i++) {
    steps.push({
      dist: [...dist],
      iteration: i + 1,
      edge: [],
      updated: false,
      explanation: `Iteration ${i + 1}: Relax all edges`,
    });

    for (const [u, v, w] of EDGES) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        const oldDist = dist[v];
        dist[v] = dist[u] + w;
        steps.push({
          dist: [...dist],
          iteration: i + 1,
          edge: [u, v, w],
          updated: true,
          explanation: `Relax edge ${u}→${v} (weight ${w}): dist[${v}] = ${oldDist} → ${dist[v]}`,
        });
      } else {
        steps.push({
          dist: [...dist],
          iteration: i + 1,
          edge: [u, v, w],
          updated: false,
          explanation: `Check edge ${u}→${v} (weight ${w}): no update`,
        });
      }
    }
  }

  steps.push({
    dist: [...dist],
    iteration: V,
    edge: [],
    updated: false,
    explanation: 'Complete: Shortest distances computed',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  updated: '#22c55e',
  default: '#3b82f6',
} as const;

export default function BellmanFordViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { dist, edge, updated, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Bellman-Ford Shortest Path</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Distances from Node {START}</h3>
        <div className="grid grid-cols-5 gap-4">
          {dist.map((d, idx) => {
            const isEdgeNode = edge.length > 0 && (edge[0] === idx || edge[1] === idx);

            let bgColor: string = COLORS.default;
            if (isEdgeNode && updated) {
              bgColor = COLORS.updated;
            } else if (isEdgeNode) {
              bgColor = COLORS.current;
            }

            return (
              <div
                key={idx}
                className="p-4 rounded-lg border-2 text-center"
                style={{
                  backgroundColor: `${bgColor}20`,
                  borderColor: bgColor,
                }}
              >
                <div className="text-zinc-400 text-sm">Node {idx}</div>
                <div className="text-white font-bold text-lg">{d === Infinity ? '∞' : d}</div>
              </div>
            );
          })}
        </div>
      </div>

      {edge.length > 0 && (
        <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
          <p className="text-white text-sm">
            Edge: {edge[0]} → {edge[1]} (weight: {edge[2]})
          </p>
        </div>
      )}

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
