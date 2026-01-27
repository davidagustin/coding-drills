'use client';

import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Algorithm data
// ---------------------------------------------------------------------------
const DATA = [4, 5, 6, 7, 0, 1, 2] as const;
const TARGET = 0;

interface SearchStep {
  left: number;
  right: number;
  mid: number;
  midValue: number;
  found: boolean;
  action: string;
  leftSorted: boolean;
  rightSorted: boolean;
  eliminated: Set<number>;
}

// ---------------------------------------------------------------------------
// Pre-compute steps
// ---------------------------------------------------------------------------
function precomputeSteps(): SearchStep[] {
  const steps: SearchStep[] = [];
  let left = 0;
  let right = DATA.length - 1;
  const eliminated = new Set<number>();

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = DATA[mid];

    // Check if found
    if (midValue === TARGET) {
      steps.push({
        left,
        right,
        mid,
        midValue,
        found: true,
        action: `arr[${mid}] = ${midValue} === ${TARGET} -- Found!`,
        leftSorted: DATA[left] <= DATA[mid],
        rightSorted: DATA[mid] <= DATA[right],
        eliminated: new Set(eliminated),
      });
      break;
    }

    // Determine which half is sorted
    const leftSorted = DATA[left] <= DATA[mid];
    const rightSorted = DATA[mid] <= DATA[right];

    let action = '';
    let eliminateLeft = false;
    let _eliminateRight = false;

    if (leftSorted) {
      // Left half is sorted
      if (DATA[left] <= TARGET && TARGET < DATA[mid]) {
        // Target is in left half
        action = `Left half [${left}..${mid}] is sorted, ${DATA[left]} <= ${TARGET} < ${DATA[mid]} → search left`;
        _eliminateRight = true;
      } else {
        // Target is in right half
        action = `Left half [${left}..${mid}] is sorted, but target not in range → search right`;
        eliminateLeft = true;
      }
    } else {
      // Right half is sorted
      if (DATA[mid] < TARGET && TARGET <= DATA[right]) {
        // Target is in right half
        action = `Right half [${mid}..${right}] is sorted, ${DATA[mid]} < ${TARGET} <= ${DATA[right]} → search right`;
        eliminateLeft = true;
      } else {
        // Target is in left half
        action = `Right half [${mid}..${right}] is sorted, but target not in range → search left`;
        _eliminateRight = true;
      }
    }

    steps.push({
      left,
      right,
      mid,
      midValue,
      found: false,
      action,
      leftSorted,
      rightSorted,
      eliminated: new Set(eliminated),
    });

    // Eliminate half
    if (eliminateLeft) {
      for (let i = left; i <= mid; i++) eliminated.add(i);
      left = mid + 1;
    } else {
      for (let i = mid; i <= right; i++) eliminated.add(i);
      right = mid - 1;
    }
  }

  // Not found case
  if (left > right) {
    steps.push({
      left,
      right,
      mid: -1,
      midValue: -1,
      found: false,
      action: `Target ${TARGET} not found`,
      leftSorted: false,
      rightSorted: false,
      eliminated: new Set(eliminated),
    });
  }

  return steps;
}

const STEPS = precomputeSteps();
const TOTAL_STEPS = STEPS.length;

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------
const COLORS = {
  left: '#3b82f6',
  right: '#f97316',
  mid: '#eab308',
  found: '#22c55e',
  eliminated: '#3f3f46',
  sorted: '#22c55e',
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function SearchRotatedViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  const isComplete = step >= TOTAL_STEPS - 1;

  return (
    <div className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
      {/* Title */}
      <div className="text-center space-y-1">
        <h3
          className="text-lg font-bold"
          style={{
            background: `linear-gradient(135deg, ${COLORS.mid}, ${COLORS.left})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Search in Rotated Sorted Array
        </h3>
        <p className="text-sm text-zinc-400">Binary search with rotation handling</p>
      </div>

      {/* Array visualization */}
      <div className="flex justify-center gap-2 flex-wrap">
        {DATA.map((value, idx) => {
          const isLeft = idx === currentStep.left && !isComplete;
          const isRight = idx === currentStep.right && !isComplete;
          const isMid = idx === currentStep.mid && !isComplete;
          const isEliminated = currentStep.eliminated.has(idx);
          const isFound = currentStep.found && idx === currentStep.mid;

          const bgColor = isFound
            ? COLORS.found
            : isEliminated
              ? COLORS.eliminated
              : isMid
                ? '#3f3f1f' // dark yellow
                : isLeft || isRight
                  ? '#1e3a3f' // dark blue/orange
                  : '#3f3f46'; // zinc-700

          const borderColor = isFound
            ? COLORS.found
            : isMid
              ? COLORS.mid
              : isLeft
                ? COLORS.left
                : isRight
                  ? COLORS.right
                  : isEliminated
                    ? COLORS.eliminated
                    : '#52525b';

          const boxShadow =
            isMid || isLeft || isRight || isFound
              ? `0 0 12px ${borderColor}80, 0 0 24px ${borderColor}40`
              : 'none';

          return (
            <div key={idx} className="flex flex-col items-center gap-1" style={{ minWidth: 56 }}>
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
                    isMid || isLeft || isRight || isFound
                      ? 'pulse 1.2s ease-in-out infinite'
                      : undefined,
                }}
              >
                <span
                  className="text-xl font-bold select-none"
                  style={{
                    color: isFound ? '#ffffff' : isEliminated ? '#52525b' : '#d4d4d8',
                  }}
                >
                  {value}
                </span>
              </div>

              {/* Index label */}
              <span className="text-xs text-zinc-500 font-mono">{idx}</span>

              {/* Pointer labels */}
              <div className="h-5 flex items-center justify-center gap-1">
                {isMid && (
                  <span className="text-xs font-bold tracking-wider" style={{ color: COLORS.mid }}>
                    Mid
                  </span>
                )}
                {isLeft && (
                  <span className="text-xs font-bold tracking-wider" style={{ color: COLORS.left }}>
                    L
                  </span>
                )}
                {isRight && (
                  <span
                    className="text-xs font-bold tracking-wider"
                    style={{ color: COLORS.right }}
                  >
                    R
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info panel */}
      <div className="rounded-xl bg-zinc-800 border border-zinc-700 p-4 space-y-3 text-sm">
        <div className="flex items-start gap-2">
          <span className="text-zinc-500 shrink-0">Action:</span>
          <span className="text-zinc-200 font-mono">{currentStep.action}</span>
        </div>
        {!isComplete && currentStep.mid >= 0 && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-zinc-500">Left sorted:</span>
              <span
                className="ml-2 font-mono"
                style={{ color: currentStep.leftSorted ? COLORS.sorted : '#ef4444' }}
              >
                {currentStep.leftSorted ? 'Yes' : 'No'}
              </span>
            </div>
            <div>
              <span className="text-zinc-500">Right sorted:</span>
              <span
                className="ml-2 font-mono"
                style={{ color: currentStep.rightSorted ? COLORS.sorted : '#ef4444' }}
              >
                {currentStep.rightSorted ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 shrink-0">Step:</span>
          <span className="text-zinc-300">
            {Math.min(step + 1, TOTAL_STEPS)} / {TOTAL_STEPS}
          </span>
        </div>
      </div>

      {/* Found banner */}
      {currentStep.found && (
        <div
          className="text-center py-3 px-4 rounded-xl font-bold text-white text-sm"
          style={{
            background: `linear-gradient(135deg, ${COLORS.found}, #16a34a)`,
            animation: 'fadeInUp 0.4s ease-out',
          }}
        >
          Found {TARGET} at index {currentStep.mid}!
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Controls */}
      <VizControls controls={controls} accentColor={COLORS.mid} />
    </div>
  );
}
