'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const INPUT = 'aab';

interface StringPermsDedupStep {
  chars: string[];
  used: boolean[];
  current: string;
  result: string[];
  explanation: string;
}

function computeSteps(): StringPermsDedupStep[] {
  const steps: StringPermsDedupStep[] = [];
  const chars = INPUT.split('').sort();
  const used: boolean[] = new Array(chars.length).fill(false);
  const result: string[] = [];

  steps.push({
    chars: [...chars],
    used: [...used],
    current: '',
    result: [...result],
    explanation: `Start: Generate unique permutations of "${INPUT}" (sorted: "${chars.join('')}")`,
  });

  function backtrack(current: string): void {
    if (current.length === chars.length) {
      result.push(current);
      steps.push({
        chars: [...chars],
        used: [...used],
        current,
        result: [...result],
        explanation: `Found permutation: "${current}"`,
      });
      return;
    }

    for (let i = 0; i < chars.length; i++) {
      if (used[i]) {
        steps.push({
          chars: [...chars],
          used: [...used],
          current,
          result: [...result],
          explanation: `Skip index ${i} (char '${chars[i]}'): already used`,
        });
        continue;
      }

      if (i > 0 && chars[i] === chars[i - 1] && !used[i - 1]) {
        steps.push({
          chars: [...chars],
          used: [...used],
          current,
          result: [...result],
          explanation: `Skip index ${i} (char '${chars[i]}'): duplicate dedup rule (same as previous and previous not used)`,
        });
        continue;
      }

      used[i] = true;
      steps.push({
        chars: [...chars],
        used: [...used],
        current: current + chars[i],
        result: [...result],
        explanation: `Add '${chars[i]}' at index ${i}: current = "${current + chars[i]}"`,
      });

      backtrack(current + chars[i]);

      used[i] = false;
      steps.push({
        chars: [...chars],
        used: [...used],
        current,
        result: [...result],
        explanation: `Backtrack: unmark index ${i} (char '${chars[i]}')`,
      });
    }
  }

  backtrack('');

  steps.push({
    chars: [...chars],
    used: [...used],
    current: '',
    result: [...result],
    explanation: `Complete: Found ${result.length} unique permutations`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function StringPermsDedupViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { chars, used, current, result, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Unique String Permutations</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Characters */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Characters (sorted)</h3>
          <div className="flex gap-2 flex-wrap">
            {chars.map((char, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-sm font-semibold border-2 ${
                  used[idx]
                    ? 'bg-green-500/20 border-green-500 text-green-400'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                }`}
              >
                <span className="text-xs text-zinc-500">{idx}</span>
                <span className="text-lg">{char}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Permutation */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Current Permutation</h3>
          <div className="p-4 bg-zinc-800 rounded-lg font-mono text-lg text-cyan-400">
            {current || '(empty)'}
          </div>
        </div>

        {/* Results */}
        {result.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">
              Found Permutations ({result.length})
            </h3>
            <div className="flex gap-2 flex-wrap">
              {result.map((perm, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-green-500/20 border-2 border-green-500 rounded-lg font-mono text-sm font-semibold text-green-400"
                >
                  {perm}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
