'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const NUM_COURSES = 4;
const PREREQUISITES: [number, number][] = [
  [1, 0],
  [2, 0],
  [3, 1],
  [3, 2],
];

interface DFSStep {
  course: number;
  state: 'unvisited' | 'visiting' | 'visited';
  explanation: string;
  hasCycle: boolean;
  graph: Record<number, number[]>;
}

function computeSteps(): DFSStep[] {
  const steps: DFSStep[] = [];
  const graph: Record<number, number[]> = {};
  const visited = new Array(NUM_COURSES).fill(0); // 0: unvisited, 1: visiting, 2: visited

  // Build graph
  for (const [course, prereq] of PREREQUISITES) {
    if (!graph[course]) graph[course] = [];
    graph[course].push(prereq);
  }

  function hasCycle(course: number): boolean {
    if (visited[course] === 1) {
      steps.push({
        course,
        state: 'visiting',
        explanation: `Cycle detected! Course ${course} is already being visited`,
        hasCycle: true,
        graph: JSON.parse(JSON.stringify(graph)),
      });
      return true;
    }
    if (visited[course] === 2) {
      return false;
    }

    visited[course] = 1;
    steps.push({
      course,
      state: 'visiting',
      explanation: `Mark course ${course} as visiting, check prerequisites`,
      hasCycle: false,
      graph: JSON.parse(JSON.stringify(graph)),
    });

    for (const prereq of graph[course] || []) {
      if (hasCycle(prereq)) return true;
    }

    visited[course] = 2;
    steps.push({
      course,
      state: 'visited',
      explanation: `Mark course ${course} as completed`,
      hasCycle: false,
      graph: JSON.parse(JSON.stringify(graph)),
    });

    return false;
  }

  for (let i = 0; i < NUM_COURSES; i++) {
    if (visited[i] === 0) {
      if (hasCycle(i)) {
        steps.push({
          course: -1,
          state: 'unvisited',
          explanation: 'Cycle found → Cannot complete all courses',
          hasCycle: true,
          graph: JSON.parse(JSON.stringify(graph)),
        });
        return steps;
      }
    }
  }

  steps.push({
    course: -1,
    state: 'unvisited',
    explanation: 'No cycles found → All courses can be completed',
    hasCycle: false,
    graph: JSON.parse(JSON.stringify(graph)),
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  unvisited: '#6b7280',
  visiting: '#eab308',
  visited: '#22c55e',
  cycle: '#ef4444',
} as const;

export default function CourseScheduleViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const courseStates = useMemo(() => {
    const states: Record<number, 'unvisited' | 'visiting' | 'visited'> = {};
    for (let i = 0; i <= step && i < STEPS.length; i++) {
      if (STEPS[i].course >= 0) {
        states[STEPS[i].course] = STEPS[i].state;
      }
    }
    return states;
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Course Schedule (Cycle Detection)</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p
            className={`font-bold text-lg mt-2 ${
              currentStep.hasCycle ? 'text-red-400' : 'text-green-400'
            }`}
          >
            {currentStep.hasCycle ? 'Cannot complete' : 'Can complete'}
          </p>
        )}
      </div>

      <div className="mb-6 grid grid-cols-4 gap-4">
        {Array.from({ length: NUM_COURSES }, (_, i) => {
          const state = courseStates[i] || 'unvisited';
          const color =
            state === 'visiting'
              ? COLORS.visiting
              : state === 'visited'
                ? COLORS.visited
                : COLORS.unvisited;

          return (
            <motion.div
              key={i}
              className="p-4 rounded-lg border-2 text-center"
              style={{
                backgroundColor: `${color}20`,
                borderColor: color,
              }}
              animate={{ scale: currentStep.course === i ? 1.1 : 1 }}
            >
              <div className="text-xs text-zinc-500 mb-1">Course</div>
              <div className="text-lg font-mono font-bold" style={{ color }}>
                {i}
              </div>
              <div className="text-xs text-zinc-400 mt-1">{state}</div>
            </motion.div>
          );
        })}
      </div>

      <VizControls controls={controls} accentColor={COLORS.visiting} />
    </div>
  );
}
