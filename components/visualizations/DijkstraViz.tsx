'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const GRAPH = [
  [0, 4, 0, 0, 0, 0, 0, 8, 0],
  [4, 0, 8, 0, 0, 0, 0, 11, 0],
  [0, 8, 0, 7, 0, 4, 0, 0, 2],
  [0, 0, 7, 0, 9, 14, 0, 0, 0],
  [0, 0, 0, 9, 0, 10, 0, 0, 0],
  [0, 0, 4, 14, 10, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 1, 6],
  [8, 11, 0, 0, 0, 0, 1, 0, 7],
  [0, 0, 2, 0, 0, 0, 6, 7, 0],
];
const START = 0;

interface DijkstraStep {
  dist: number[];
  visited: boolean[];
  current: number;
  explanation: string;
}

function computeSteps(): DijkstraStep[] {
  const steps: DijkstraStep[] = [];
  const dist = new Array(GRAPH.length).fill(Infinity);
  const visited = new Array(GRAPH.length).fill(false);
  dist[START] = 0;

  steps.push({
    dist: [...dist],
    visited: [...visited],
    current: -1,
    explanation: `Start: Dijkstra from node ${START}`,
  });

  for (let count = 0; count < GRAPH.length - 1; count++) {
    let u = -1;
    let minDist = Infinity;

    for (let v = 0; v < GRAPH.length; v++) {
      if (!visited[v] && dist[v] < minDist) {
        minDist = dist[v];
        u = v;
      }
    }

    if (u === -1) break;

    visited[u] = true;
    steps.push({
      dist: [...dist],
      visited: [...visited],
      current: u,
      explanation: `Select node ${u} with distance ${dist[u]}`,
    });

    for (let v = 0; v < GRAPH.length; v++) {
      if (!visited[v] && GRAPH[u][v] !== 0 && dist[u] !== Infinity) {
        const newDist = dist[u] + GRAPH[u][v];
        if (newDist < dist[v]) {
          dist[v] = newDist;
          steps.push({
            dist: [...dist],
            visited: [...visited],
            current: v,
            explanation: `Update dist[${v}] = ${dist[u]} + ${GRAPH[u][v]} = ${newDist}`,
          });
        }
      }
    }
  }

  steps.push({
    dist: [...dist],
    visited: [...visited],
    current: -1,
    explanation: 'Complete: Shortest distances computed',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  visited: '#22c55e',
  updated: '#3b82f6',
  default: '#6b7280',
} as const;

export default function DijkstraViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { dist, visited, current, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Dijkstra&apos;s Shortest Path</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Distances from Node {START}</h3>
        <div className="grid grid-cols-3 gap-4">
          {dist.map((d, idx) => {
            const isCurrent = current === idx;
            const isVisited = visited[idx];

            let bgColor: string = COLORS.default;
            if (isCurrent) {
              bgColor = COLORS.current;
            } else if (isVisited) {
              bgColor = COLORS.visited;
            }

            return (
              <div
                key={idx}
                className="p-4 rounded-lg border-2 text-center"
                style={{
                  backgroundColor: bgColor + '20',
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

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
