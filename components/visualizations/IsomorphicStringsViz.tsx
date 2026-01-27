'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const S1 = 'egg';
const S2 = 'add';

interface IsomorphicStep {
  char1: string;
  char2: string;
  index: number;
  map1: Record<string, string>;
  map2: Record<string, string>;
  isIsomorphic: boolean;
  explanation: string;
}

function computeSteps(): IsomorphicStep[] {
  const steps: IsomorphicStep[] = [];
  const map1: Record<string, string> = {};
  const map2: Record<string, string> = {};
  
  steps.push({
    char1: '',
    char2: '',
    index: -1,
    map1: {},
    map2: {},
    isIsomorphic: true,
    explanation: `Start: Check if "${S1}" and "${S2}" are isomorphic`,
  });
  
  for (let i = 0; i < S1.length; i++) {
    const char1 = S1[i];
    const char2 = S2[i];
    
    if (map1[char1] && map1[char1] !== char2) {
      steps.push({
        char1,
        char2,
        index: i,
        map1: { ...map1 },
        map2: { ...map2 },
        isIsomorphic: false,
        explanation: `Conflict: ${char1} already maps to ${map1[char1]}, but found ${char2}`,
      });
      return steps;
    }
    
    if (map2[char2] && map2[char2] !== char1) {
      steps.push({
        char1,
        char2,
        index: i,
        map1: { ...map1 },
        map2: { ...map2 },
        isIsomorphic: false,
        explanation: `Conflict: ${char2} already maps to ${map2[char2]}, but found ${char1}`,
      });
      return steps;
    }
    
    map1[char1] = char2;
    map2[char2] = char1;
    
    steps.push({
      char1,
      char2,
      index: i,
      map1: { ...map1 },
      map2: { ...map2 },
      isIsomorphic: true,
      explanation: `Map ${char1} ↔ ${char2}`,
    });
  }
  
  steps.push({
    char1: '',
    char2: '',
    index: S1.length,
    map1: { ...map1 },
    map2: { ...map2 },
    isIsomorphic: true,
    explanation: 'Complete: Strings are isomorphic ✓',
  });
  
  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

const COLORS = {
  current: '#eab308',
  mapped: '#22c55e',
  conflict: '#ef4444',
  default: '#3b82f6',
} as const;

export default function IsomorphicStringsViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { index, map1, map2, isIsomorphic, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Isomorphic Strings</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-zinc-400 text-sm mb-2">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
        <p className="text-white text-sm">{explanation}</p>
        {step === STEPS.length - 1 && (
          <p className={`font-bold text-lg mt-2 ${isIsomorphic ? 'text-green-400' : 'text-red-400'}`}>
            {isIsomorphic ? 'Isomorphic ✓' : 'Not Isomorphic ✗'}
          </p>
        )}
      </div>

      <div className="mb-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">String 1: &quot;{S1}&quot;</h3>
          <div className="flex gap-2 justify-center">
            {S1.split('').map((c, i) => {
              const isCurrent = index === i;
              return (
                <motion.div
                  key={i}
                  className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: isCurrent ? COLORS.current : COLORS.default,
                    borderColor: isCurrent ? '#fff' : COLORS.default,
                  }}
                  animate={{
                    scale: isCurrent ? 1.2 : 1,
                  }}
                >
                  {c}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">String 2: &quot;{S2}&quot;</h3>
          <div className="flex gap-2 justify-center">
            {S2.split('').map((c, i) => {
              const isCurrent = index === i;
              return (
                <motion.div
                  key={i}
                  className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                  style={{
                    backgroundColor: isCurrent ? COLORS.current : COLORS.default,
                    borderColor: isCurrent ? '#fff' : COLORS.default,
                  }}
                  animate={{
                    scale: isCurrent ? 1.2 : 1,
                  }}
                >
                  {c}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-3">Mappings</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-zinc-400 text-sm mb-2">S1 → S2</p>
              <div className="space-y-2">
                {Object.entries(map1).map(([k, v]) => (
                  <div
                    key={k}
                    className="p-2 rounded bg-zinc-800 border border-zinc-700 text-center"
                  >
                    <span className="text-white font-mono">{k}</span>
                    <span className="text-zinc-500 mx-2">→</span>
                    <span className="text-white font-mono">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-zinc-400 text-sm mb-2">S2 → S1</p>
              <div className="space-y-2">
                {Object.entries(map2).map(([k, v]) => (
                  <div
                    key={k}
                    className="p-2 rounded bg-zinc-800 border border-zinc-700 text-center"
                  >
                    <span className="text-white font-mono">{k}</span>
                    <span className="text-zinc-500 mx-2">→</span>
                    <span className="text-white font-mono">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <VizControls controls={controls} accentColor="#eab308" />
    </div>
  );
}
