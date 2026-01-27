'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ComparisonStep {
  left: number;
  right: number;
  char: string;
  isCenter: boolean;
}

type CellStatus = 'idle' | 'comparing' | 'matched';

// ---------------------------------------------------------------------------
// Pre-computed data
// ---------------------------------------------------------------------------

const INPUT = 'racecar';
const CHARS = INPUT.split('');

/** Pre-compute every comparison step for the two-pointer palindrome check. */
function buildSteps(str: string): ComparisonStep[] {
  const steps: ComparisonStep[] = [];
  let l = 0;
  let r = str.length - 1;
  while (l <= r) {
    const isCenter = l === r;
    steps.push({ left: l, right: r, char: str[l], isCenter });
    l++;
    r--;
  }
  return steps;
}

const STEPS = buildSteps(INPUT);
const TOTAL_STEPS = STEPS.length; // ceil(7/2) = 4

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ACCENT_LEFT = '#8b5cf6'; // indigo-violet
const ACCENT_RIGHT = '#ec4899'; // pink
const MATCHED_BG = '#22c55e'; // green

function getCellStatus(
  charIndex: number,
  currentStep: number,
  steps: ComparisonStep[],
): CellStatus {
  // Check if this index was matched in a previous step
  for (let s = 0; s < currentStep; s++) {
    const { left, right } = steps[s];
    if (charIndex === left || charIndex === right) return 'matched';
  }

  // Check if this index is currently being compared
  if (currentStep < steps.length) {
    const { left, right } = steps[currentStep];
    if (charIndex === left || charIndex === right) return 'comparing';
  }

  return 'idle';
}

function getPointerLabel(
  charIndex: number,
  currentStep: number,
  steps: ComparisonStep[],
): 'L' | 'R' | 'LR' | null {
  if (currentStep >= steps.length) return null;
  const { left, right } = steps[currentStep];
  const isLeft = charIndex === left;
  const isRight = charIndex === right;
  if (isLeft && isRight) return 'LR';
  if (isLeft) return 'L';
  if (isRight) return 'R';
  return null;
}

/** Build the running list of completed checks as a readable string. */
function buildChecksText(currentStep: number, steps: ComparisonStep[]): string {
  const parts: string[] = [];
  for (let s = 0; s < currentStep; s++) {
    const { right, char, isCenter } = steps[s];
    if (isCenter) {
      parts.push(`${char}(center)`);
    } else {
      parts.push(`${char}=${INPUT[right]}`);
    }
  }
  // Include the current step if it exists (actively comparing)
  if (currentStep < steps.length) {
    const { right, char, isCenter } = steps[currentStep];
    if (isCenter) {
      parts.push(`${char}(center)`);
    } else {
      parts.push(`${char}=${INPUT[right]}`);
    }
  }
  return parts.join(', ');
}

/** Build the comparison expression for the current step. */
function buildComparisonText(currentStep: number, steps: ComparisonStep[]): string {
  if (currentStep >= steps.length) {
    return 'All comparisons complete!';
  }
  const { left, right, isCenter } = steps[currentStep];
  if (isCenter) {
    return `str[${left}]='${INPUT[left]}' is the center character`;
  }
  const match = INPUT[left] === INPUT[right];
  return `str[${left}]='${INPUT[left]}' === str[${right}]='${INPUT[right]}' -> ${match ? 'Match!' : 'No Match'}`;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CharacterCell({
  char,
  index,
  status,
  pointerLabel,
}: {
  char: string;
  index: number;
  status: CellStatus;
  pointerLabel: 'L' | 'R' | 'LR' | null;
}) {
  // Background colour
  const bgColor =
    status === 'matched'
      ? MATCHED_BG
      : status === 'comparing'
        ? '#3f3f46' // zinc-700 with a subtle lift
        : '#3f3f46'; // zinc-700

  // Border / glow for comparing state
  const borderColor =
    status === 'comparing'
      ? pointerLabel === 'R'
        ? ACCENT_RIGHT
        : ACCENT_LEFT
      : status === 'matched'
        ? MATCHED_BG
        : '#52525b'; // zinc-600

  const boxShadow =
    status === 'comparing' ? `0 0 12px ${borderColor}80, 0 0 24px ${borderColor}40` : 'none';

  // Text colour
  const textColor =
    status === 'matched' ? '#ffffff' : status === 'comparing' ? '#ffffff' : '#d4d4d8'; // zinc-300

  return (
    <div className="flex flex-col items-center gap-1" style={{ minWidth: 56 }}>
      {/* Cell */}
      <div
        className="flex items-center justify-center rounded-lg transition-all duration-300"
        style={{
          width: 56,
          height: 56,
          background: bgColor,
          border: `2px solid ${borderColor}`,
          boxShadow,
          animation:
            status === 'comparing' ? 'twoPointerPulse 1.2s ease-in-out infinite' : undefined,
        }}
      >
        <span className="text-2xl font-bold select-none" style={{ color: textColor }}>
          {char}
        </span>
      </div>

      {/* Index label */}
      <span className="text-xs text-zinc-500 font-mono">{index}</span>

      {/* Pointer label */}
      <div className="h-5 flex items-center justify-center">
        {pointerLabel && (
          <span
            className="text-xs font-bold tracking-wider"
            style={{
              color:
                pointerLabel === 'LR'
                  ? ACCENT_LEFT
                  : pointerLabel === 'R'
                    ? ACCENT_RIGHT
                    : ACCENT_LEFT,
            }}
          >
            {pointerLabel === 'LR' ? (
              <>
                <span style={{ color: ACCENT_LEFT }}>L</span>
                <span style={{ color: ACCENT_RIGHT }}>R</span>
              </>
            ) : (
              pointerLabel
            )}
          </span>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function TwoPointerViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const isComplete = step >= TOTAL_STEPS;

  // Derive per-cell state
  const cellData = useMemo(
    () =>
      CHARS.map((char, i) => ({
        char,
        index: i,
        status: getCellStatus(i, step, STEPS),
        pointerLabel: getPointerLabel(i, step, STEPS),
      })),
    [step],
  );

  const comparisonText = useMemo(() => buildComparisonText(step, STEPS), [step]);
  const checksText = useMemo(() => buildChecksText(step, STEPS), [step]);

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      {/* Pulse keyframe (injected once) */}
      <style>{`
        @keyframes twoPointerPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.07); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Title */}
      <div className="text-center space-y-1">
        <h3
          className="text-lg font-bold"
          style={{
            background: `linear-gradient(135deg, ${ACCENT_LEFT}, ${ACCENT_RIGHT})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Two Pointer Technique
        </h3>
        <p className="text-sm text-zinc-400">Palindrome Check</p>
      </div>

      {/* Input label */}
      <div className="text-center">
        <span className="text-xs text-zinc-500 font-mono">
          Input: &quot;{INPUT}&quot; (length {INPUT.length})
        </span>
      </div>

      {/* Character cells */}
      <div className="flex justify-center gap-2 flex-wrap">
        {cellData.map((cell) => (
          <CharacterCell
            key={cell.index}
            char={cell.char}
            index={cell.index}
            status={cell.status}
            pointerLabel={cell.pointerLabel}
          />
        ))}
      </div>

      {/* Pointer legend */}
      <div className="flex justify-center gap-6 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: ACCENT_LEFT }} />
          <span className="text-zinc-400">Left pointer (L)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: ACCENT_RIGHT }} />
          <span className="text-zinc-400">Right pointer (R)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: MATCHED_BG }} />
          <span className="text-zinc-400">Matched</span>
        </div>
      </div>

      {/* Comparison panel */}
      <div className="rounded-xl bg-zinc-800 border border-zinc-700 p-4 space-y-3 text-sm font-mono">
        {/* Current comparison */}
        <div className="flex items-start gap-2">
          <span className="text-zinc-500 shrink-0">Compare:</span>
          <span className="text-zinc-200">{comparisonText}</span>
        </div>

        {/* Running checks */}
        <div className="flex items-start gap-2">
          <span className="text-zinc-500 shrink-0">Checks:</span>
          <span className="text-zinc-300">
            {checksText || <span className="text-zinc-600">--</span>}
          </span>
        </div>

        {/* Step counter */}
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 shrink-0">Step:</span>
          <span className="text-zinc-300">
            {Math.min(step + 1, TOTAL_STEPS)} / {TOTAL_STEPS}
          </span>
        </div>
      </div>

      {/* Palindrome confirmed banner */}
      {isComplete && (
        <div
          className="text-center py-3 px-4 rounded-xl font-bold text-white text-sm"
          style={{
            background: `linear-gradient(135deg, ${MATCHED_BG}, #16a34a)`,
            animation: 'fadeInUp 0.4s ease-out',
          }}
        >
          Palindrome Confirmed! &quot;{INPUT}&quot; reads the same forwards and backwards.
        </div>
      )}

      {/* Shared controls */}
      <VizControls controls={controls} accentColor={ACCENT_LEFT} />
    </div>
  );
}
