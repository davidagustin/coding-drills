'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const ITEMS = [1, 2, 3, 4];
const OTHER_ITEMS = [3, 4, 5, 6];

interface IntersectionStep {
  items: number[];
  otherItems: number[];
  membershipSet: Set<number>;
  result: number[];
  currentIndex: number;
  explanation: string;
}

function computeSteps(): IntersectionStep[] {
  const steps: IntersectionStep[] = [];
  const membershipSet = new Set(OTHER_ITEMS);
  const result: number[] = [];

  steps.push({
    items: [...ITEMS],
    otherItems: [...OTHER_ITEMS],
    membershipSet: new Set(membershipSet),
    result: [],
    currentIndex: -1,
    explanation: `Start: Find intersection of [${ITEMS.join(', ')}] and [${OTHER_ITEMS.join(', ')}]`,
  });

  steps.push({
    items: [...ITEMS],
    otherItems: [...OTHER_ITEMS],
    membershipSet: new Set(membershipSet),
    result: [],
    currentIndex: -1,
    explanation: `Create membership Set from otherItems: {${[...membershipSet].join(', ')}} for O(1) lookup`,
  });

  for (let i = 0; i < ITEMS.length; i++) {
    const item = ITEMS[i];
    const inSet = membershipSet.has(item);

    steps.push({
      items: [...ITEMS],
      otherItems: [...OTHER_ITEMS],
      membershipSet: new Set(membershipSet),
      result: [...result],
      currentIndex: i,
      explanation: `Check items[${i}] = ${item}: ${inSet ? 'in membership set, include' : 'not in membership set, skip'}`,
    });

    if (inSet) {
      result.push(item);
      steps.push({
        items: [...ITEMS],
        otherItems: [...OTHER_ITEMS],
        membershipSet: new Set(membershipSet),
        result: [...result],
        currentIndex: i,
        explanation: `Add ${item} to result: [${result.join(', ')}]`,
      });
    }
  }

  steps.push({
    items: [...ITEMS],
    otherItems: [...OTHER_ITEMS],
    membershipSet: new Set(membershipSet),
    result: [...result],
    currentIndex: -1,
    explanation: `Complete: Intersection = [${result.join(', ')}]`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function IntersectionViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { items, otherItems, membershipSet, result, currentIndex, explanation } = currentStep;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Array Intersection</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
      </div>

      <div className="space-y-6">
        {/* Items Array */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Items Array</h3>
          <div className="flex gap-2 flex-wrap">
            {items.map((val, idx) => {
              const isCurrent = idx === currentIndex && currentIndex !== -1;
              const inSet = membershipSet.has(val);
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center font-mono text-sm font-semibold border-2 ${
                    isCurrent
                      ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                      : inSet
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                  }`}
                >
                  <span className="text-xs text-zinc-500">{idx}</span>
                  <span className="text-lg">{val}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Membership Set */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">
            Membership Set (from otherItems)
          </h3>
          <div className="flex gap-2 flex-wrap">
            {otherItems.map((val) => (
              <div
                key={val}
                className="px-4 py-2 bg-cyan-500/20 border-2 border-cyan-500 rounded-lg font-mono text-sm font-semibold text-cyan-400"
              >
                {val}
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Intersection Result</h3>
          {result.length === 0 ? (
            <div className="p-4 bg-zinc-800 rounded-lg text-center text-zinc-500">(empty)</div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {result.map((val, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-green-500/20 border-2 border-green-500 rounded-lg font-mono text-sm font-semibold text-green-400"
                >
                  {val}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
