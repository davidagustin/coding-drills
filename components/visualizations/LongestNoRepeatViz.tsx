'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LongestNoRepeatStep {
  start: number;
  end: number;
  char: string;
  lastSeen: Map<string, number>;
  maxLength: number;
  action: 'expand' | 'shrink' | 'update-max';
  description: string;
}

// ---------------------------------------------------------------------------
// Pre-computed data
// ---------------------------------------------------------------------------

const INPUT = 'abcabcbb';

/** Pre-compute every step of the longest substring without repeating characters algorithm. */
function buildSteps(s: string): LongestNoRepeatStep[] {
  const steps: LongestNoRepeatStep[] = [];
  const lastSeen = new Map<string, number>();
  let start = 0;
  let maxLength = 0;

  steps.push({
    start: 0,
    end: -1,
    char: '',
    lastSeen: new Map(),
    maxLength: 0,
    action: 'expand',
    description: 'Start: initialize window',
  });

  for (let end = 0; end < s.length; end++) {
    const char = s[end];

    const prevCharIndex = lastSeen.get(char);
    if (prevCharIndex !== undefined && prevCharIndex >= start) {
      // Duplicate found, shrink window
      const prevIndex = prevCharIndex;
      steps.push({
        start,
        end,
        char,
        lastSeen: new Map(lastSeen),
        maxLength,
        action: 'shrink',
        description: `Duplicate '${char}' found at ${end}, last seen at ${prevIndex}. Move start to ${prevIndex + 1}`,
      });
      start = prevIndex + 1;
    } else {
      steps.push({
        start,
        end,
        char,
        lastSeen: new Map(lastSeen),
        maxLength,
        action: 'expand',
        description: `Add '${char}' at ${end}, no duplicate in window`,
      });
    }

    lastSeen.set(char, end);
    const currentLength = end - start + 1;
    maxLength = Math.max(maxLength, currentLength);

    if (currentLength === maxLength) {
      steps.push({
        start,
        end,
        char,
        lastSeen: new Map(lastSeen),
        maxLength,
        action: 'update-max',
        description: `New max length: ${maxLength}`,
      });
    }
  }

  return steps;
}

const STEPS = buildSteps(INPUT);
const TOTAL_STEPS = STEPS.length;

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const COLORS = {
  window: '#3b82f6', // blue
  max: '#22c55e', // green
  duplicate: '#ef4444', // red
  start: '#f97316', // orange
  end: '#ec4899', // pink
  idle: '#3f3f46', // zinc-700
  border: '#52525b', // zinc-600
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function CharCell({
  char,
  index,
  status,
  pointerLabel,
  isInWindow,
}: {
  char: string;
  index: number;
  status: 'idle' | 'window' | 'max' | 'duplicate' | 'start' | 'end';
  pointerLabel: 'S' | 'E' | null;
  isInWindow: boolean;
}) {
  const bgColor =
    status === 'duplicate'
      ? COLORS.duplicate
      : status === 'max'
        ? COLORS.max
        : status === 'window' || isInWindow
          ? COLORS.window
          : status === 'start'
            ? COLORS.start
            : status === 'end'
              ? COLORS.end
              : COLORS.idle;

  const borderColor = status !== 'idle' ? bgColor : COLORS.border;
  const boxShadow = status !== 'idle' ? `0 0 12px ${bgColor}80, 0 0 24px ${bgColor}40` : 'none';

  return (
    <div className="flex flex-col items-center gap-1" style={{ minWidth: 56 }}>
      <div
        className="flex items-center justify-center rounded-lg transition-all duration-300"
        style={{
          width: 56,
          height: 56,
          background: bgColor,
          border: `2px solid ${borderColor}`,
          boxShadow,
        }}
      >
        <span className="text-2xl font-bold text-white select-none">{char}</span>
      </div>
      <span className="text-xs text-zinc-500 font-mono">{index}</span>
      {pointerLabel && (
        <div className="h-5 flex items-center justify-center">
          <span
            className="text-xs font-bold tracking-wider"
            style={{
              color: pointerLabel === 'S' ? COLORS.start : COLORS.end,
            }}
          >
            {pointerLabel}
          </span>
        </div>
      )}
    </div>
  );
}

export default function LongestNoRepeatViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep: LongestNoRepeatStep | null = step > 0 ? STEPS[step - 1] : null;
  const isComplete = step >= TOTAL_STEPS;

  const chars = INPUT.split('');

  const cellData = useMemo(() => {
    if (!currentStep) {
      return chars.map((char, index) => ({
        char,
        index,
        status: 'idle' as const,
        pointerLabel: null,
        isInWindow: false,
      }));
    }

    return chars.map((char, index) => {
      let status: 'idle' | 'window' | 'max' | 'duplicate' | 'start' | 'end' = 'idle';
      let pointerLabel: 'S' | 'E' | null = null;
      const isInWindow = index >= currentStep.start && index <= currentStep.end;

      if (index === currentStep.start) {
        status = 'start';
        pointerLabel = 'S';
      } else if (index === currentStep.end) {
        status = 'end';
        pointerLabel = 'E';
      } else if (isInWindow) {
        // Check if this is the max window
        const windowLength = currentStep.end - currentStep.start + 1;
        status = windowLength === currentStep.maxLength ? 'max' : 'window';
      }

      // Highlight duplicate if this is the duplicate character
      if (
        currentStep.action === 'shrink' &&
        index === currentStep.end &&
        currentStep.lastSeen.has(char) &&
        (currentStep.lastSeen.get(char) ?? -1) >= currentStep.start
      ) {
        status = 'duplicate';
      }

      return { char, index, status, pointerLabel, isInWindow };
    });
  }, [currentStep, chars]);

  const description = currentStep?.description || 'Press Play or Step to find longest substring';

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="text-center space-y-1">
        <h3
          className="text-lg font-bold"
          style={{
            background: `linear-gradient(135deg, ${COLORS.start}, ${COLORS.end})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Longest Substring Without Repeating Characters
        </h3>
        <p className="text-sm text-zinc-400">Find longest substring with all unique characters</p>
      </div>

      <div className="text-center">
        <span className="text-xs text-zinc-500 font-mono">Input: &quot;{INPUT}&quot;</span>
      </div>

      <div className="flex justify-center gap-2 flex-wrap">
        {cellData.map((cell) => (
          <CharCell
            key={cell.index}
            char={cell.char}
            index={cell.index}
            status={cell.status}
            pointerLabel={cell.pointerLabel}
            isInWindow={cell.isInWindow}
          />
        ))}
      </div>

      <div className="flex justify-center gap-6 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.start }} />
          <span className="text-zinc-400">Start (S)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.end }} />
          <span className="text-zinc-400">End (E)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.window }} />
          <span className="text-zinc-400">Window</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.max }} />
          <span className="text-zinc-400">Max Length</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: COLORS.duplicate }}
          />
          <span className="text-zinc-400">Duplicate</span>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-800 border border-zinc-700 p-4 space-y-3 text-sm font-mono">
        <div className="flex items-start gap-2">
          <span className="text-zinc-500 shrink-0">Status:</span>
          <span className="text-zinc-200">{description}</span>
        </div>

        {currentStep && (
          <>
            <div className="flex items-start gap-2">
              <span className="text-zinc-500 shrink-0">Window:</span>
              <span className="text-zinc-300">
                [{currentStep.start}..{currentStep.end}] = &quot;
                {INPUT.substring(currentStep.start, currentStep.end + 1)}&quot;
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-zinc-500 shrink-0">Window Length:</span>
              <span className="text-zinc-300">
                {currentStep.end >= currentStep.start ? currentStep.end - currentStep.start + 1 : 0}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-zinc-500 shrink-0">Max Length:</span>
              <span className="text-zinc-300 font-bold" style={{ color: COLORS.max }}>
                {currentStep.maxLength}
              </span>
            </div>
          </>
        )}

        <div className="flex items-center gap-2">
          <span className="text-zinc-500 shrink-0">Step:</span>
          <span className="text-zinc-300">
            {Math.min(step, TOTAL_STEPS)} / {TOTAL_STEPS}
          </span>
        </div>
      </div>

      {isComplete && currentStep && (
        <div
          className="text-center py-3 px-4 rounded-xl font-bold text-white text-sm"
          style={{
            background: `linear-gradient(135deg, ${COLORS.max}, #16a34a)`,
            animation: 'fadeInUp 0.4s ease-out',
          }}
        >
          Longest substring without repeating characters: {currentStep.maxLength}
        </div>
      )}

      <VizControls controls={controls} accentColor={COLORS.start} />
    </div>
  );
}
