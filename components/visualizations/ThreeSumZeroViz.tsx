'use client';

import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Algorithm data
// ---------------------------------------------------------------------------
const DATA = [-1, 0, 1, 2, -1, -4] as const;
const SORTED_DATA = [...DATA].sort((a, b) => a - b);

interface ThreeSumStep {
  fixed: number;
  fixedIndex: number;
  left: number;
  right: number;
  sum: number;
  triplets: number[][];
  action: string;
  skipDuplicate: boolean;
}

// ---------------------------------------------------------------------------
// Pre-compute steps
// ---------------------------------------------------------------------------
function precomputeSteps(): ThreeSumStep[] {
  const steps: ThreeSumStep[] = [];
  const arr = [...SORTED_DATA];
  const triplets: number[][] = [];
  const seen = new Set<string>();

  // Initial state
  steps.push({
    fixed: arr[0],
    fixedIndex: 0,
    left: 1,
    right: arr.length - 1,
    sum: 0,
    triplets: [],
    action: 'Start: Sort array and fix first element',
    skipDuplicate: false,
  });

  for (let i = 0; i < arr.length - 2; i++) {
    // Skip duplicates for fixed element
    if (i > 0 && arr[i] === arr[i - 1]) {
      steps.push({
        fixed: arr[i],
        fixedIndex: i,
        left: i + 1,
        right: arr.length - 1,
        sum: 0,
        triplets: [...triplets],
        action: `Skip duplicate fixed element ${arr[i]}`,
        skipDuplicate: true,
      });
      continue;
    }

    let left = i + 1;
    let right = arr.length - 1;

    steps.push({
      fixed: arr[i],
      fixedIndex: i,
      left,
      right,
      sum: arr[i] + arr[left] + arr[right],
      triplets: [...triplets],
      action: `Fix element ${arr[i]} at index ${i}, use two pointers`,
      skipDuplicate: false,
    });

    while (left < right) {
      const sum = arr[i] + arr[left] + arr[right];

      if (sum === 0) {
        const triplet = [arr[i], arr[left], arr[right]];
        const key = triplet.join(',');
        if (!seen.has(key)) {
          seen.add(key);
          triplets.push(triplet);
          steps.push({
            fixed: arr[i],
            fixedIndex: i,
            left,
            right,
            sum,
            triplets: [...triplets],
            action: `Found triplet: [${triplet.join(', ')}] = 0`,
            skipDuplicate: false,
          });
        } else {
          steps.push({
            fixed: arr[i],
            fixedIndex: i,
            left,
            right,
            sum,
            triplets: [...triplets],
            action: `Duplicate triplet skipped: [${triplet.join(', ')}]`,
            skipDuplicate: true,
          });
        }
        left++;
        // Skip duplicates
        while (left < right && arr[left] === arr[left - 1]) left++;
        right--;
        while (left < right && arr[right] === arr[right + 1]) right--;
      } else if (sum < 0) {
        steps.push({
          fixed: arr[i],
          fixedIndex: i,
          left,
          right,
          sum,
          triplets: [...triplets],
          action: `Sum ${sum} < 0, move left pointer right`,
          skipDuplicate: false,
        });
        left++;
      } else {
        steps.push({
          fixed: arr[i],
          fixedIndex: i,
          left,
          right,
          sum,
          triplets: [...triplets],
          action: `Sum ${sum} > 0, move right pointer left`,
          skipDuplicate: false,
        });
        right--;
      }
    }
  }

  // Final state
  steps.push({
    fixed: 0,
    fixedIndex: -1,
    left: -1,
    right: -1,
    sum: 0,
    triplets: [...triplets],
    action: `Complete! Found ${triplets.length} unique triplets`,
    skipDuplicate: false,
  });

  return steps;
}

const STEPS = precomputeSteps();
const TOTAL_STEPS = STEPS.length;

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------
const ACCENT_FIXED = '#8b5cf6'; // purple
const ACCENT_LEFT = '#3b82f6'; // blue
const ACCENT_RIGHT = '#f97316'; // orange
const FOUND_COLOR = '#22c55e'; // green

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function ThreeSumZeroViz() {
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
            background: `linear-gradient(135deg, ${ACCENT_FIXED}, ${ACCENT_LEFT})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Three Sum Zero
        </h3>
        <p className="text-sm text-zinc-400">Find all unique triplets that sum to zero</p>
      </div>

      {/* Array visualization */}
      <div className="flex justify-center gap-2 flex-wrap">
        {SORTED_DATA.map((value, idx) => {
          const isFixed = idx === currentStep.fixedIndex && !isComplete;
          const isLeft = idx === currentStep.left && !isComplete;
          const isRight = idx === currentStep.right && !isComplete;
          const isFound =
            !isComplete &&
            currentStep.triplets.length > 0 &&
            currentStep.triplets[currentStep.triplets.length - 1]?.includes(value);

          const bgColor = isFixed
            ? '#3f1f3f' // dark purple
            : isLeft || isRight
              ? '#1e3a3f' // dark blue/orange
              : '#3f3f46'; // zinc-700

          const borderColor = isFixed
            ? ACCENT_FIXED
            : isLeft
              ? ACCENT_LEFT
              : isRight
                ? ACCENT_RIGHT
                : isFound
                  ? FOUND_COLOR
                  : '#52525b';

          const boxShadow =
            isFixed || isLeft || isRight
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
                    isFixed || isLeft || isRight
                      ? 'pointerPulse 1.2s ease-in-out infinite'
                      : undefined,
                }}
              >
                <span className="text-xl font-bold select-none text-zinc-200">{value}</span>
              </div>

              {/* Index label */}
              <span className="text-xs text-zinc-500 font-mono">{idx}</span>

              {/* Pointer labels */}
              <div className="h-5 flex items-center justify-center gap-1">
                {isFixed && (
                  <span
                    className="text-xs font-bold tracking-wider"
                    style={{ color: ACCENT_FIXED }}
                  >
                    Fixed
                  </span>
                )}
                {isLeft && (
                  <span className="text-xs font-bold tracking-wider" style={{ color: ACCENT_LEFT }}>
                    L
                  </span>
                )}
                {isRight && (
                  <span
                    className="text-xs font-bold tracking-wider"
                    style={{ color: ACCENT_RIGHT }}
                  >
                    R
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pointer legend */}
      <div className="flex justify-center gap-4 text-xs flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: ACCENT_FIXED }} />
          <span className="text-zinc-400">Fixed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: ACCENT_LEFT }} />
          <span className="text-zinc-400">Left</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: ACCENT_RIGHT }} />
          <span className="text-zinc-400">Right</span>
        </div>
      </div>

      {/* Triplets found */}
      {currentStep.triplets.length > 0 && (
        <div className="rounded-xl bg-zinc-800 border border-zinc-700 p-4">
          <div className="text-sm text-zinc-400 mb-2">Triplets Found:</div>
          <div className="flex flex-wrap gap-2">
            {currentStep.triplets.map((triplet, idx) => (
              <div
                key={idx}
                className="px-3 py-1 rounded-lg font-mono text-sm"
                style={{
                  background: FOUND_COLOR + '20',
                  border: `1px solid ${FOUND_COLOR}`,
                  color: FOUND_COLOR,
                }}
              >
                [{triplet.join(', ')}]
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action panel */}
      <div className="rounded-xl bg-zinc-800 border border-zinc-700 p-4 space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <span className="text-zinc-500 shrink-0">Action:</span>
          <span className="text-zinc-200 font-mono">{currentStep.action}</span>
        </div>
        {!isComplete && currentStep.fixedIndex >= 0 && (
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 shrink-0">Sum:</span>
            <span className="text-zinc-300 font-mono">
              {currentStep.fixed} + {SORTED_DATA[currentStep.left]} +{' '}
              {SORTED_DATA[currentStep.right]} = {currentStep.sum}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 shrink-0">Step:</span>
          <span className="text-zinc-300">
            {Math.min(step + 1, TOTAL_STEPS)} / {TOTAL_STEPS}
          </span>
        </div>
      </div>

      {/* Complete banner */}
      {isComplete && (
        <div
          className="text-center py-3 px-4 rounded-xl font-bold text-white text-sm"
          style={{
            background: `linear-gradient(135deg, ${FOUND_COLOR}, #16a34a)`,
            animation: 'fadeInUp 0.4s ease-out',
          }}
        >
          Complete! Found {currentStep.triplets.length} unique triplets
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes pointerPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Controls */}
      <VizControls controls={controls} accentColor={ACCENT_FIXED} />
    </div>
  );
}
