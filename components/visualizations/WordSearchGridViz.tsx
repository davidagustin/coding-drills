'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const BOARD = [
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E'],
];
const WORD = 'ABCCED';

interface SearchStep {
  r: number;
  c: number;
  idx: number;
  board: string[][];
  path: Array<[number, number]>;
  explanation: string;
  found: boolean;
}

function computeSteps(): SearchStep[] {
  const steps: SearchStep[] = [];
  const board = BOARD.map((row) => [...row]);
  const path: Array<[number, number]> = [];

  function dfs(r: number, c: number, idx: number): boolean {
    if (idx === WORD.length) {
      steps.push({
        r,
        c,
        idx,
        board: board.map((row) => [...row]),
        path: [...path],
        explanation: `Found word "${WORD}"!`,
        found: true,
      });
      return true;
    }

    if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return false;
    if (board[r][c] !== WORD[idx]) return false;

    const temp = board[r][c];
    board[r][c] = '#';
    path.push([r, c]);

    steps.push({
      r,
      c,
      idx,
      board: board.map((row) => [...row]),
      path: [...path],
      explanation: `Match '${WORD[idx]}' at [${r}, ${c}], searching for '${WORD[idx + 1] || 'END'}'`,
      found: false,
    });

    const found =
      dfs(r + 1, c, idx + 1) ||
      dfs(r - 1, c, idx + 1) ||
      dfs(r, c + 1, idx + 1) ||
      dfs(r, c - 1, idx + 1);

    if (!found) {
      board[r][c] = temp;
      path.pop();
    }

    return found;
  }

  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      if (dfs(r, c, 0)) {
        return steps;
      }
    }
  }

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  visited: '#22c55e',
  path: '#3b82f6',
  default: '#6b7280',
} as const;

export default function WordSearchGridViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Word Search in Grid</h2>
      <div className="mb-4 text-zinc-400">
        Word: <span className="font-mono text-white">{WORD}</span>
      </div>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
      </div>

      <div className="mb-6 flex justify-center">
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${BOARD[0].length}, 1fr)` }}
        >
          {currentStep.board.map((row, r) =>
            row.map((char, c) => {
              const isCurrent = currentStep.r === r && currentStep.c === c;
              const isInPath = currentStep.path.some(([pr, pc]) => pr === r && pc === c);
              const isVisited = char === '#';

              let bgColor: string = COLORS.default;
              if (isCurrent) bgColor = COLORS.current;
              else if (isInPath) bgColor = COLORS.path;
              else if (isVisited) bgColor = COLORS.visited;

              return (
                <motion.div
                  key={`${r}-${c}`}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: `${bgColor}40`,
                    borderColor: bgColor,
                  }}
                  animate={{ scale: isCurrent ? 1.15 : 1 }}
                >
                  {char === '#' ? '#' : char}
                </motion.div>
              );
            }),
          )}
        </div>
      </div>

      <VizControls controls={controls} accentColor={COLORS.path} />
    </div>
  );
}
