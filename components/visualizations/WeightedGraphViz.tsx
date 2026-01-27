'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const SIZE = 3;
const EDGES: [number, number, number][] = [
  [0, 1, 5],
  [1, 2, 3],
];

interface WeightedGraphStep {
  graph: Record<number, Array<{ node: number; weight: number }>>;
  currentEdge: [number, number, number] | null;
  explanation: string;
}

function computeSteps(): WeightedGraphStep[] {
  const steps: WeightedGraphStep[] = [];
  const graph: Record<number, Array<{ node: number; weight: number }>> = {};

  // Initialize empty arrays
  for (let i = 0; i < SIZE; i++) {
    graph[i] = [];
  }

  steps.push({
    graph: JSON.parse(JSON.stringify(graph)),
    currentEdge: null,
    explanation: `Initialize: Create empty adjacency list for ${SIZE} nodes`,
  });

  for (let i = 0; i < EDGES.length; i++) {
    const [u, v, w] = EDGES[i];

    steps.push({
      graph: JSON.parse(JSON.stringify(graph)),
      currentEdge: [u, v, w],
      explanation: `Processing edge: ${u} --${w}--> ${v} (undirected, adding both directions)`,
    });

    graph[u].push({ node: v, weight: w });
    graph[v].push({ node: u, weight: w });

    steps.push({
      graph: JSON.parse(JSON.stringify(graph)),
      currentEdge: [u, v, w],
      explanation: `Added: graph[${u}].push({node: ${v}, weight: ${w}}) and graph[${v}].push({node: ${u}, weight: ${w}})`,
    });
  }

  steps.push({
    graph: JSON.parse(JSON.stringify(graph)),
    currentEdge: null,
    explanation: `Complete: Weighted adjacency list built`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function WeightedGraphViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { graph, currentEdge, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Build Weighted Adjacency List</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-4">
        {/* Graph Visualization */}
        {Object.entries(graph).map(([node, neighbors]) => (
          <div key={node} className="bg-zinc-800 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center font-mono font-bold text-cyan-400">
                {node}
              </div>
              <div className="flex-1">
                <div className="text-xs text-zinc-500 mb-2">Neighbors:</div>
                <div className="flex gap-2 flex-wrap">
                  {neighbors.length === 0 ? (
                    <span className="text-zinc-500 text-sm">(none)</span>
                  ) : (
                    neighbors.map((neighbor, idx) => {
                      const isCurrent =
                        currentEdge &&
                        ((Number(node) === currentEdge[0] && neighbor.node === currentEdge[1]) ||
                          (Number(node) === currentEdge[1] && neighbor.node === currentEdge[0]));
                      return (
                        <div
                          key={idx}
                          className={`px-3 py-1 rounded-lg border-2 flex items-center gap-2 ${
                            isCurrent
                              ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                              : 'bg-zinc-700 border-zinc-600 text-zinc-300'
                          }`}
                        >
                          <span className="font-mono">{neighbor.node}</span>
                          <span className="text-xs text-zinc-400">w:{neighbor.weight}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
