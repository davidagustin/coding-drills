'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MinWindowStep {
  start: number;
  end: number;
  windowFreq: Map<string, number>;
  satisfied: number;
  required: number;
  minWindow: { start: number; length: number } | null;
  action: 'expand' | 'shrink' | 'found';
  description: string;
}

// ---------------------------------------------------------------------------
// Pre-computed data
// ---------------------------------------------------------------------------

const S = 'ADOBECODEBANC';
const T = 'ABC';

/** Pre-compute every step of the minimum window substring algorithm. */
function buildSteps(s: string, t: string): MinWindowStep[] {
  const steps: MinWindowStep[] = [];
  const targetFreq = new Map<string, number>();
  for (const char of t) {
    targetFreq.set(char, (targetFreq.get(char) || 0) + 1);
  }

  const required = targetFreq.size;
  let satisfied = 0;
  const windowFreq = new Map<string, number>();
  let start = 0;
  let minWindow: { start: number; length: number } | null = null;

  steps.push({
    start: 0,
    end: -1,
    windowFreq: new Map(),
    satisfied: 0,
    required,
    minWindow: null,
    action: 'expand',
    description: `Start: find window containing all chars from "${t}"`,
  });

  for (let end = 0; end < s.length; end++) {
    const char = s[end];
    windowFreq.set(char, (windowFreq.get(char) || 0) + 1);

    if (targetFreq.has(char) && windowFreq.get(char) === targetFreq.get(char)) {
      satisfied++;
    }

    steps.push({
      start,
      end,
      windowFreq: new Map(windowFreq),
      satisfied,
      required,
      minWindow,
      action: 'expand',
      description: `Expand: add '${char}' at ${end}, satisfied: ${satisfied}/${required}`,
    });

    while (satisfied === required) {
      const currentLength = end - start + 1;
      if (!minWindow || currentLength < minWindow.length) {
        minWindow = { start, length: currentLength };
        steps.push({
          start,
          end,
          windowFreq: new Map(windowFreq),
          satisfied,
          required,
          minWindow,
          action: 'found',
          description: `Found valid window: "${s.substring(start, end + 1)}" (length ${currentLength})`,
        });
      }

      const removedChar = s[start];
      windowFreq.set(removedChar, windowFreq.get(removedChar)! - 1);

      if (targetFreq.has(removedChar) && windowFreq.get(removedChar)! < targetFreq.get(removedChar)!) {
        satisfied--;
      }

      steps.push({
        start,
        end,
        windowFreq: new Map(windowFreq),
        satisfied,
        required,
        minWindow,
        action: 'shrink',
        description: `Shrink: remove '${removedChar}' at ${start}, satisfied: ${satisfied}/${required}`,
      });

      start++;
    }
  }

  return steps;
}

const STEPS = buildSteps(S, T);
const TOTAL_STEPS = STEPS.length;

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const COLORS = {
  window: '#3b82f6', // blue
  min: '#22c55e', // green
  start: '#f97316', // orange
  end: '#ec4899', // pink
  required: '#eab308', // yellow
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
  isRequired,
}: {
  char: string;
  index: number;
  status: 'idle' | 'window' | 'min' | 'start' | 'end' | 'required';
  pointerLabel: 'S' | 'E' | null;
  isInWindow: boolean;
  isRequired: boolean;
}) {
  const bgColor =
    status === 'min'
      ? COLORS.min
      : status === 'window' || isInWindow
        ? COLORS.window
        : status === 'start'
          ? COLORS.start
          : status === 'end'
            ? COLORS.end
            : status === 'required' || isRequired
              ? COLORS.required
              : COLORS.idle;

  const borderColor = status !== 'idle' ? bgColor : COLORS.border;
  const boxShadow = status !== 'idle' ? `0 0 12px ${bgColor}80, 0 0 24px ${bgColor}40` : 'none';

  return (
    <div className="flex flex-col items-center gap-1" style={{ minWidth: 48 }}>
      <div
        className="flex items-center justify-center rounded-lg transition-all duration-300 relative"
        style={{
          width: 48,
          height: 48,
          background: bgColor,
          border: `2px solid ${borderColor}`,
          boxShadow,
        }}
      >
        <span className="text-lg font-bold text-white select-none">{char}</span>
        {isRequired && (
          <span className="absolute -top-1 -right-1 text-xs bg-yellow-500 text-black px-1 rounded font-bold">
            T
          </span>
        )}
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

export default function MinWindowSubstrViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep: MinWindowStep | null = step > 0 ? STEPS[step - 1] : null;
  const isComplete = step >= TOTAL_STEPS;

  const chars = S.split('');
  const targetChars = new Set(T.split(''));

  const cellData = useMemo(() => {
    if (!currentStep) {
      return chars.map((char, index) => ({
        char,
        index,
        status: 'idle' as const,
        pointerLabel: null as const,
        isInWindow: false,
        isRequired: targetChars.has(char),
      }));
    }

    return chars.map((char, index) => {
      let status: 'idle' | 'window' | 'min' | 'start' | 'end' | 'required' = 'idle';
      let pointerLabel: 'S' | 'E' | null = null;
      const isInWindow = index >= currentStep.start && index <= currentStep.end;
      const isRequired = targetChars.has(char);

      if (index === currentStep.start) {
        status = 'start';
        pointerLabel = 'S';
      } else if (index === currentStep.end) {
        status = 'end';
        pointerLabel = 'E';
      } else if (isInWindow) {
        // Check if this is the minimum window
        if (
          currentStep.minWindow &&
          index >= currentStep.minWindow.start &&
          index < currentStep.minWindow.start + currentStep.minWindow.length
        ) {
          status = 'min';
        } else {
          status = 'window';
        }
      } else if (isRequired) {
        status = 'required';
      }

      return { char, index, status, pointerLabel, isInWindow, isRequired };
    });
  }, [currentStep, chars, targetChars]);

  const description = currentStep?.description || 'Press Play or Step to find minimum window';

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
          Minimum Window Substring
        </h3>
        <p className="text-sm text-zinc-400">Find smallest window containing all chars from &quot;{T}&quot;</p>
      </div>

      <div className="text-center">
        <span className="text-xs text-zinc-500 font-mono">
          S: &quot;{S}&quot; | T: &quot;{T}&quot;
        </span>
      </div>

      <div className="flex justify-center gap-1 flex-wrap">
        {cellData.map((cell) => (
          <CharCell
            key={cell.index}
            char={cell.char}
            index={cell.index}
            status={cell.status}
            pointerLabel={cell.pointerLabel}
            isInWindow={cell.isInWindow}
            isRequired={cell.isRequired}
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
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.min }} />
          <span className="text-zinc-400">Min Window</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.required }} />
          <span className="text-zinc-400">Required (T)</span>
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
                {S.substring(currentStep.start, currentStep.end + 1)}&quot;
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-zinc-500 shrink-0">Satisfied:</span>
              <span className="text-zinc-300">
                {currentStep.satisfied} / {currentStep.required}
              </span>
            </div>
            {currentStep.minWindow && (
              <div className="flex items-start gap-2">
                <span className="text-zinc-500 shrink-0">Min Window:</span>
                <span className="text-zinc-300 font-bold" style={{ color: COLORS.min }}>
                  &quot;{S.substring(currentStep.minWindow.start, currentStep.minWindow.start + currentStep.minWindow.length)}&quot; (length {currentStep.minWindow.length})
                </span>
              </div>
            )}
          </>
        )}

        <div className="flex items-center gap-2">
          <span className="text-zinc-500 shrink-0">Step:</span>
          <span className="text-zinc-300">
            {Math.min(step, TOTAL_STEPS)} / {TOTAL_STEPS}
          </span>
        </div>
      </div>

      {isComplete && currentStep?.minWindow && (
        <div
          className="text-center py-3 px-4 rounded-xl font-bold text-white text-sm"
          style={{
            background: `linear-gradient(135deg, ${COLORS.min}, #16a34a)`,
            animation: 'fadeInUp 0.4s ease-out',
          }}
        >
          Minimum window: &quot;{S.substring(currentStep.minWindow.start, currentStep.minWindow.start + currentStep.minWindow.length)}&quot;
        </div>
      )}

      <VizControls controls={controls} accentColor={COLORS.start} />
    </div>
  );
}
