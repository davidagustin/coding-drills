'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const N = 5;
const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 4],
];

interface TreeStep {
  edge: [number, number] | null;
  parent: number[];
  explanation: string;
  isValid: boolean;
  hasCycle: boolean;
}

function computeSteps(): TreeStep[] {
  const steps: TreeStep[] = [];
  const parent = Array.from({ length: N }, (_, i) => i);

  steps.push({
    edge: null,
    parent: [...parent],
    explanation: `Check: ${N} nodes, ${EDGES.length} edges. Tree requires exactly ${N - 1} edges.`,
    isValid: EDGES.length === N - 1,
    hasCycle: false,
  });

  if (EDGES.length !== N - 1) {
    return steps;
  }

  function find(x: number): number {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  function union(x: number, y: number): boolean {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX === rootY) {
      return false; // Cycle detected
    }
    parent[rootX] = rootY;
    return true;
  }

  for (const [u, v] of EDGES) {
    const noCycle = union(u, v);
    steps.push({
      edge: [u, v],
      parent: [...parent],
      explanation: noCycle
        ? `Add edge [${u}, ${v}]: no cycle`
        : `Add edge [${u}, ${v}]: cycle detected!`,
      isValid: noCycle,
      hasCycle: !noCycle,
    });

    if (!noCycle) {
      return steps;
    }
  }

  steps.push({
    edge: null,
    parent: [...parent],
    explanation: 'All edges processed, no cycles → Valid tree!',
    isValid: true,
    hasCycle: false,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  valid: '#22c55e',
  cycle: '#ef4444',
  current: '#eab308',
} as const;

export default function GraphValidTreeViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Graph Valid Tree</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p
            className={`font-bold text-lg mt-2 ${currentStep.isValid ? 'text-green-400' : 'text-red-400'}`}
          >
            {currentStep.isValid ? 'Valid tree!' : 'Not a valid tree'}
          </p>
        )}
      </div>

      <div className="mb-6 p-6 bg-zinc-950 rounded-lg border border-zinc-800">
        <svg
          width="100%"
          height="300"
          viewBox="0 0 400 300"
          className="overflow-visible"
          aria-label="Graph tree visualization"
        >
          <title>Graph tree visualization</title>
          {Array.from({ length: N }, (_, i) => {
            const angle = (i * 2 * Math.PI) / N;
            const x = 200 + 100 * Math.cos(angle);
            const y = 150 + 100 * Math.sin(angle);
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={20} fill={COLORS.valid} stroke="#1f2937" strokeWidth="2" />
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  className="font-mono font-bold text-white text-sm"
                >
                  {i}
                </text>
              </g>
            );
          })}
          {EDGES.map(([u, v], idx) => {
            const isCurrent =
              currentStep.edge && currentStep.edge[0] === u && currentStep.edge[1] === v;
            const angleU = (u * 2 * Math.PI) / N;
            const angleV = (v * 2 * Math.PI) / N;
            const x1 = 200 + 100 * Math.cos(angleU);
            const y1 = 150 + 100 * Math.sin(angleU);
            const x2 = 200 + 100 * Math.cos(angleV);
            const y2 = 150 + 100 * Math.sin(angleV);

            return (
              <line
                key={idx}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={
                  isCurrent ? COLORS.current : currentStep.hasCycle ? COLORS.cycle : COLORS.valid
                }
                strokeWidth={isCurrent ? '3' : '2'}
              />
            );
          })}
        </svg>
      </div>

      <VizControls controls={controls} accentColor={COLORS.valid} />
    </div>
  );
}
