'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 0],
];
const DIRECTED = false;

interface BuildStep {
  edge: [number, number] | null;
  graph: Record<number, number[]>;
  explanation: string;
}

function computeSteps(): BuildStep[] {
  const steps: BuildStep[] = [];
  const graph: Record<number, number[]> = {};

  steps.push({
    edge: null,
    graph: {},
    explanation: 'Start with empty graph',
  });

  for (const [from, to] of EDGES) {
    if (!graph[from]) graph[from] = [];
    graph[from].push(to);

    if (!DIRECTED) {
      if (!graph[to]) graph[to] = [];
      graph[to].push(from);
    }

    steps.push({
      edge: [from, to],
      graph: JSON.parse(JSON.stringify(graph)),
      explanation: `Add edge ${from} → ${to}${!DIRECTED ? ` (and ${to} → ${from})` : ''}`,
    });
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  node: '#3b82f6',
  edge: '#8b5cf6',
  current: '#eab308',
} as const;

export default function GraphAdjacencyViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const nodes = useMemo(() => {
    const s = new Set<number>();
    EDGES.forEach(([from, to]) => {
      s.add(from);
      s.add(to);
    });
    return Array.from(s).sort();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">
        Build Adjacency List ({DIRECTED ? 'Directed' : 'Undirected'})
      </h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
      </div>

      <div className="mb-6 p-6 bg-zinc-950 rounded-lg border border-zinc-800">
        <svg
          width="100%"
          height="300"
          viewBox="0 0 400 300"
          className="overflow-visible"
          aria-label="Graph visualization"
        >
          <title>Graph visualization</title>
          {nodes.map((node, idx) => {
            const angle = (idx * 2 * Math.PI) / nodes.length;
            const x = 200 + 100 * Math.cos(angle);
            const y = 150 + 100 * Math.sin(angle);
            return (
              <g key={node}>
                <circle cx={x} cy={y} r={20} fill={COLORS.node} stroke="#1f2937" strokeWidth="2" />
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  className="font-mono font-bold text-white text-sm"
                >
                  {node}
                </text>
              </g>
            );
          })}
          {currentStep.edge && (
            <line
              x1={
                200 +
                100 * Math.cos((nodes.indexOf(currentStep.edge[0]) * 2 * Math.PI) / nodes.length)
              }
              y1={
                150 +
                100 * Math.sin((nodes.indexOf(currentStep.edge[0]) * 2 * Math.PI) / nodes.length)
              }
              x2={
                200 +
                100 * Math.cos((nodes.indexOf(currentStep.edge[1]) * 2 * Math.PI) / nodes.length)
              }
              y2={
                150 +
                100 * Math.sin((nodes.indexOf(currentStep.edge[1]) * 2 * Math.PI) / nodes.length)
              }
              stroke={COLORS.current}
              strokeWidth="3"
              markerEnd="url(#arrowhead)"
            />
          )}
        </svg>
      </div>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <div className="text-sm text-zinc-400 mb-2">Adjacency List:</div>
        <div className="space-y-2">
          {Object.entries(currentStep.graph).map(([node, neighbors]) => (
            <div key={node} className="flex items-center gap-2">
              <span className="font-mono font-bold text-white w-8">{node}:</span>
              <div className="flex gap-2">
                {neighbors.map((n, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded bg-zinc-700 text-white font-mono text-sm"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.node} />
    </div>
  );
}
