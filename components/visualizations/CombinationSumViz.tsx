'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const CANDIDATES = [2, 3, 6, 7];
const TARGET = 7;

interface CombinationStep {
  candidates: number[];
  current: number[];
  sum: number;
  index: number;
  combinations: number[][];
  explanation: string;
}

function computeSteps(): CombinationStep[] {
  const steps: CombinationStep[] = [];
  const combinations: number[][] = [];
  
  function backtrack(current: number[], start: number, sum: number): void {
    if (sum === TARGET) {
      combinations.push([...current]);
      steps.push({
        candidates: [...CANDIDATES],
        current: [...current],
        sum,
        index: start,
        combinations: combinations.map(c => [...c]),
        explanation: `Sum = ${TARGET} → Found combination [${current.join(', ')}]`,
      });
      return;
    }
    
    if (sum > TARGET) {
      steps.push({
        candidates: [...CANDIDATES],
        current: [...current],
        sum,
        index: start,
        combinations: combinations.map(c => [...c]),
        explanation: `Sum ${sum} > ${TARGET} → backtrack`,
      });
      return;
    }
    
    for (let i = start; i < CANDIDATES.length; i++) {
      current.push(CANDIDATES[i]);
      steps.push({
        candidates: [...CANDIDATES],
        current: [...current],
        sum: sum + CANDIDATES[i],
        index: i,
        combinations: combinations.map(c => [...c]),
        explanation: `Add ${CANDIDATES[i]}, current: [${current.join(', ')}], sum: ${sum + CANDIDATES[i]}`,
      });
      
      backtrack(current, i, sum + CANDIDATES[i]);
      
      current.pop();
      steps.push({
        candidates: [...CANDIDATES],
        current: [...current],
        sum: sum,
        index: i,
        combinations: combinations.map(c => [...c]),
        explanation: `Remove ${CANDIDATES[i]}, backtrack`,
      });
    }
  }
  
  steps.push({
    candidates: [...CANDIDATES],
    current: [],
    sum: 0,
    index: -1,
    combinations: [],
    explanation: `Start: Find combinations that sum to ${TARGET}`,
  });
  
  backtrack([], 0, 0);
  
  steps.push({
    candidates: [...CANDIDATES],
    current: [],
    sum: 0,
    index: -1,
    combinations: combinations.map(c => [...c]),
    explanation: `Complete: Found ${combinations.length} combination(s)`,
  });
  
  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  selected: '#22c55e',
  default: '#3b82f6',
} as const;

export default function CombinationSumViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { candidates, current, sum, index, combinations, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Combination Sum</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        <p className="text-zinc-400 text-sm mt-1">Current sum: {sum} / {TARGET}</p>
        {step === STEPS.length - 1 && (
          <p className="text-yellow-400 font-bold text-lg mt-2">
            Found {combinations.length} combination(s)
          </p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Candidates</h3>
          <div className="flex gap-2 justify-center">
            {candidates.map((n, i) => {
              const isCurrent = index === i;
              return (
                <motion.div
                  key={i}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: isCurrent ? COLORS.current : COLORS.default,
                    borderColor: isCurrent ? '#fff' : COLORS.default,
                  }}
                  animate={{
                    scale: isCurrent ? 1.2 : 1,
                  }}
                >
                  {n}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Current Combination</h3>
          <div className="flex gap-2 justify-center">
            {current.length === 0 ? (
              <p className="text-zinc-500">Empty</p>
            ) : (
              current.map((n, i) => (
                <motion.div
                  key={i}
                  className="w-16 h-16 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: COLORS.selected,
                    borderColor: COLORS.selected,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {n}
                </motion.div>
              ))
            )}
          </div>
        </div>

        {combinations.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-3">Found Combinations</h3>
            <div className="space-y-2">
              {combinations.map((combo, i) => (
                <div key={i} className="flex gap-2 items-center justify-center flex-wrap">
                  <span className="text-zinc-400">[{i + 1}]:</span>
                  {combo.map((n, j) => (
                    <motion.div
                      key={j}
                      className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                      style={{
                        backgroundColor: COLORS.selected,
                        borderColor: COLORS.selected,
                      }}
                    >
                      {n}
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
