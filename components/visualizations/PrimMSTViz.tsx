'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const GRAPH = [
  [0, 2, 0, 6, 0],
  [2, 0, 3, 8, 5],
  [0, 3, 0, 0, 7],
  [6, 8, 0, 0, 9],
  [0, 5, 7, 9, 0],
];
const V = 5;

interface PrimStep {
  key: number[];
  mstSet: boolean[];
  parent: number[];
  current: number;
  explanation: string;
}

function computeSteps(): PrimStep[] {
  const steps: PrimStep[] = [];
  const key = new Array(V).fill(Infinity);
  const mstSet = new Array(V).fill(false);
  const parent = new Array(V).fill(-1);
  key[0] = 0;

  steps.push({
    key: [...key],
    mstSet: [...mstSet],
    parent: [...parent],
    current: -1,
    explanation: 'Start: Prim MST algorithm',
  });

  for (let count = 0; count < V - 1; count++) {
    let u = -1;
    let minKey = Infinity;

    for (let v = 0; v < V; v++) {
      if (!mstSet[v] && key[v] < minKey) {
        minKey = key[v];
        u = v;
      }
    }

    mstSet[u] = true;
    steps.push({
      key: [...key],
      mstSet: [...mstSet],
      parent: [...parent],
      current: u,
      explanation: `Select node ${u} with minimum key ${key[u]}`,
    });

    for (let v = 0; v < V; v++) {
      if (GRAPH[u][v] !== 0 && !mstSet[v] && GRAPH[u][v] < key[v]) {
        parent[v] = u;
        key[v] = GRAPH[u][v];
        steps.push({
          key: [...key],
          mstSet: [...mstSet],
          parent: [...parent],
          current: v,
          explanation: `Update key[${v}] = ${GRAPH[u][v]} (from node ${u})`,
        });
      }
    }
  }

  steps.push({
    key: [...key],
    mstSet: [...mstSet],
    parent: [...parent],
    current: -1,
    explanation: 'Complete: MST constructed',
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  inMST: '#22c55e',
  default: '#3b82f6',
} as const;

export default function PrimMSTViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { key, mstSet, parent, current, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Prim&apos;s MST</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-300 mb-3">Nodes</h3>
        <div className="grid grid-cols-5 gap-4">
          {key.map((k, idx) => {
            const isCurrent = current === idx;
            const inMST = mstSet[idx];

            let bgColor: string = COLORS.default;
            if (isCurrent) {
              bgColor = COLORS.current;
            } else if (inMST) {
              bgColor = COLORS.inMST;
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
                <div className="text-white font-bold text-lg">{k === Infinity ? '∞' : k}</div>
                {parent[idx] >= 0 && (
                  <div className="text-zinc-500 text-xs">parent: {parent[idx]}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
