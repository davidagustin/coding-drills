'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const WORDS = ['cat', 'car', 'dog'];
const SEARCH_WORD = 'cat';

interface TrieNode {
  [key: string]: TrieNode | boolean;
}

const TRIE: TrieNode = {
  c: {
    a: {
      t: { $: true },
      r: { $: true },
    },
  },
  d: {
    o: {
      g: { $: true },
    },
  },
};

interface SearchStep {
  char: string | null;
  path: string[];
  explanation: string;
  found: boolean;
}

function computeSteps(): SearchStep[] {
  const steps: SearchStep[] = [];
  let node: TrieNode | boolean = TRIE;
  const path: string[] = [];

  for (const char of SEARCH_WORD) {
    path.push(char);
    if (typeof node === 'boolean' || !node[char]) {
      steps.push({
        char,
        path: [...path],
        explanation: `Character '${char}' not found → word doesn't exist`,
        found: false,
      });
      return steps;
    }

    steps.push({
      char,
      path: [...path],
      explanation: `Found '${char}', traverse to next level`,
      found: false,
    });

    node = node[char] as TrieNode;
  }

  const isComplete = typeof node === 'object' && node.$ === true;
  steps.push({
    char: null,
    path: [...path],
    explanation: isComplete
      ? `Reached end, $ marker found → word exists!`
      : `Reached end but no $ marker → word doesn't exist`,
    found: isComplete,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  path: '#22c55e',
  found: '#3b82f6',
} as const;

export default function TrieSearchViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Trie Search</h2>
      <div className="mb-4 text-zinc-400">
        Search: <span className="font-mono text-white">{SEARCH_WORD}</span> | Words:{' '}
        <span className="font-mono text-white">{WORDS.join(', ')}</span>
      </div>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{currentStep.explanation}</p>
        {step === STEPS.length - 1 && (
          <p
            className={`font-bold text-lg mt-2 ${currentStep.found ? 'text-green-400' : 'text-red-400'}`}
          >
            {currentStep.found ? 'Word found!' : 'Word not found'}
          </p>
        )}
      </div>

      <div className="mb-6 flex items-center justify-center gap-2">
        {SEARCH_WORD.split('').map((char, idx) => {
          const isCurrent = currentStep.char === char && idx === currentStep.path.length - 1;
          const isInPath = idx < currentStep.path.length;

          return (
            <motion.div
              key={idx}
              className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white text-xl"
              style={{
                backgroundColor: isCurrent
                  ? `${COLORS.current}40`
                  : isInPath
                    ? `${COLORS.path}40`
                    : '#1f2937',
                borderColor: isCurrent ? COLORS.current : isInPath ? COLORS.path : '#374151',
              }}
              animate={{ scale: isCurrent ? 1.15 : 1 }}
            >
              {char}
            </motion.div>
          );
        })}
        {currentStep.path.length === SEARCH_WORD.length && (
          <div className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white text-xl bg-green-500">
            $
          </div>
        )}
      </div>

      <VizControls controls={controls} accentColor={COLORS.path} />
    </div>
  );
}
