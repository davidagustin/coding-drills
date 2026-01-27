'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const BEGIN_WORD = 'hit';
const END_WORD = 'cog';
const WORD_LIST = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];

interface LadderStep {
  word: string;
  level: number;
  queue: string[];
  visited: Set<string>;
  explanation: string;
  found: boolean;
}

function computeSteps(): LadderStep[] {
  const steps: LadderStep[] = [];
  const queue: Array<[string, number]> = [[BEGIN_WORD, 1]];
  const visited = new Set<string>([BEGIN_WORD]);

  steps.push({
    word: BEGIN_WORD,
    level: 1,
    queue: [BEGIN_WORD],
    visited: new Set(visited),
    explanation: `Start BFS from "${BEGIN_WORD}"`,
    found: false,
  });

  while (queue.length > 0) {
    const item = queue.shift();
    if (!item) break;
    const [word, level] = item;

    if (word === END_WORD) {
      steps.push({
        word,
        level,
        queue: queue.map(([w]) => w),
        visited: new Set(visited),
        explanation: `Found "${END_WORD}" at level ${level}!`,
        found: true,
      });
      return steps;
    }

    for (const candidate of WORD_LIST) {
      if (visited.has(candidate)) continue;

      let diff = 0;
      for (let i = 0; i < word.length; i++) {
        if (word[i] !== candidate[i]) diff++;
      }

      if (diff === 1) {
        visited.add(candidate);
        queue.push([candidate, level + 1]);
        steps.push({
          word: candidate,
          level: level + 1,
          queue: queue.map(([w]) => w),
          visited: new Set(visited),
          explanation: `"${word}" → "${candidate}" (1 char diff, level ${level + 1})`,
          found: false,
        });
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
  found: '#3b82f6',
} as const;

export default function WordLadderViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Word Ladder</h2>
      <div className="mb-4 text-zinc-400">
        {BEGIN_WORD} → {END_WORD}
      </div>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {currentStep.found && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Shortest path length: {currentStep.level}
          </p>
        )}
      </div>

      <div className="mb-6 flex items-center justify-center gap-2 flex-wrap">
        {WORD_LIST.concat(BEGIN_WORD, END_WORD)
          .filter((w, i, arr) => arr.indexOf(w) === i)
          .map((word) => {
            const isCurrent = currentStep.word === word;
            const isVisited = currentStep.visited.has(word);
            const isFound = currentStep.found && word === END_WORD;

            let bgColor = '#1f2937';
            if (isFound) bgColor = COLORS.found;
            else if (isVisited) bgColor = COLORS.visited;
            else if (isCurrent) bgColor = COLORS.current;

            return (
              <motion.div
                key={word}
                className="px-4 py-2 rounded-lg border-2 font-mono font-bold text-white"
                style={{
                  backgroundColor: `${bgColor}40`,
                  borderColor: bgColor,
                }}
                animate={{ scale: isCurrent || isFound ? 1.15 : 1 }}
              >
                {word}
              </motion.div>
            );
          })}
      </div>

      <VizControls controls={controls} accentColor={COLORS.current} />
    </div>
  );
}
