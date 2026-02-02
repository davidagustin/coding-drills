'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ThreeSumStep {
  fixedIndex: number;
  fixedValue: number;
  left: number;
  right: number;
  leftValue: number;
  rightValue: number;
  sum: number;
  action: 'compare' | 'found' | 'skip-duplicate' | 'move-left' | 'move-right';
  description: string;
  triplets: number[][];
}

// ---------------------------------------------------------------------------
// Pre-computed data
// ---------------------------------------------------------------------------

const INPUT = [-1, 0, 1, 2, -1, -4];
const SORTED = [...INPUT].sort((a, b) => a - b);

/** Pre-compute every step of the three-sum algorithm. */
function buildSteps(nums: number[]): ThreeSumStep[] {
  const steps: ThreeSumStep[] = [];
  const triplets: number[][] = [];
  const sorted = [...nums].sort((a, b) => a - b);

  for (let fixedIndex = 0; fixedIndex < sorted.length - 2; fixedIndex++) {
    // Skip duplicate values for the fixed element
    if (fixedIndex > 0 && sorted[fixedIndex] === sorted[fixedIndex - 1]) {
      steps.push({
        fixedIndex,
        fixedValue: sorted[fixedIndex],
        left: fixedIndex + 1,
        right: sorted.length - 1,
        leftValue: sorted[fixedIndex + 1],
        rightValue: sorted[sorted.length - 1],
        sum: 0,
        action: 'skip-duplicate',
        description: `Skipping duplicate fixed element at index ${fixedIndex}`,
        triplets: [...triplets],
      });
      continue;
    }

    let left = fixedIndex + 1;
    let right = sorted.length - 1;

    while (left < right) {
      const sum = sorted[fixedIndex] + sorted[left] + sorted[right];

      if (sum === 0) {
        triplets.push([sorted[fixedIndex], sorted[left], sorted[right]]);
        steps.push({
          fixedIndex,
          fixedValue: sorted[fixedIndex],
          left,
          right,
          leftValue: sorted[left],
          rightValue: sorted[right],
          sum,
          action: 'found',
          description: `Found triplet: [${sorted[fixedIndex]}, ${sorted[left]}, ${sorted[right]}]`,
          triplets: [...triplets],
        });

        // Skip duplicates for left and right pointers
        while (left < right && sorted[left] === sorted[left + 1]) {
          left++;
          steps.push({
            fixedIndex,
            fixedValue: sorted[fixedIndex],
            left,
            right,
            leftValue: sorted[left],
            rightValue: sorted[right],
            sum: 0,
            action: 'skip-duplicate',
            description: `Skipping duplicate left value`,
            triplets: [...triplets],
          });
        }
        while (left < right && sorted[right] === sorted[right - 1]) {
          right--;
          steps.push({
            fixedIndex,
            fixedValue: sorted[fixedIndex],
            left,
            right,
            leftValue: sorted[left],
            rightValue: sorted[right],
            sum: 0,
            action: 'skip-duplicate',
            description: `Skipping duplicate right value`,
            triplets: [...triplets],
          });
        }

        left++;
        right--;
      } else if (sum < 0) {
        steps.push({
          fixedIndex,
          fixedValue: sorted[fixedIndex],
          left,
          right,
          leftValue: sorted[left],
          rightValue: sorted[right],
          sum,
          action: 'move-left',
          description: `Sum ${sum} < 0, move left pointer to increase sum`,
          triplets: [...triplets],
        });
        left++;
      } else {
        steps.push({
          fixedIndex,
          fixedValue: sorted[fixedIndex],
          left,
          right,
          leftValue: sorted[left],
          rightValue: sorted[right],
          sum,
          action: 'move-right',
          description: `Sum ${sum} > 0, move right pointer to decrease sum`,
          triplets: [...triplets],
        });
        right--;
      }
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
  fixed: '#8b5cf6', // purple
  left: '#3b82f6', // blue
  right: '#f97316', // orange
  found: '#22c55e', // green
  idle: '#3f3f46', // zinc-700
  sorted: '#52525b', // zinc-600
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function ArrayCell({
  value,
  index,
  status,
  pointerLabel,
}: {
  value: number;
  index: number;
  status: 'idle' | 'fixed' | 'left' | 'right' | 'found';
  pointerLabel: 'F' | 'L' | 'R' | 'FL' | 'FR' | 'LR' | null;
}) {
  const bgColor =
    status === 'found'
      ? COLORS.found
      : status === 'fixed'
        ? COLORS.fixed
        : status === 'left'
          ? COLORS.left
          : status === 'right'
            ? COLORS.right
            : COLORS.idle;

  const borderColor =
    status === 'found'
      ? COLORS.found
      : status === 'fixed'
        ? COLORS.fixed
        : status === 'left'
          ? COLORS.left
          : status === 'right'
            ? COLORS.right
            : COLORS.sorted;

  const boxShadow =
    status !== 'idle' ? `0 0 12px ${borderColor}80, 0 0 24px ${borderColor}40` : 'none';

  return (
    <div className="flex flex-col items-center gap-1" style={{ minWidth: 64 }}>
      <div
        className="flex items-center justify-center rounded-lg transition-all duration-300"
        style={{
          width: 64,
          height: 64,
          background: bgColor,
          border: `2px solid ${borderColor}`,
          boxShadow,
        }}
      >
        <span className="text-xl font-bold text-white select-none">{value}</span>
      </div>
      <span className="text-xs text-zinc-500 font-mono">{index}</span>
      {pointerLabel && (
        <div className="h-5 flex items-center justify-center">
          <span
            className="text-xs font-bold tracking-wider"
            style={{
              color:
                pointerLabel === 'F'
                  ? COLORS.fixed
                  : pointerLabel === 'L'
                    ? COLORS.left
                    : pointerLabel === 'R'
                      ? COLORS.right
                      : COLORS.fixed,
            }}
          >
            {pointerLabel}
          </span>
        </div>
      )}
    </div>
  );
}

export default function ThreeSumViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep: ThreeSumStep | null = step > 0 ? STEPS[step - 1] : null;
  const isComplete = step >= TOTAL_STEPS;

  const cellData = useMemo(() => {
    if (!currentStep) {
      return SORTED.map((value, index) => ({
        value,
        index,
        status: 'idle' as const,
        pointerLabel: null as const,
      }));
    }

    return SORTED.map((value, index) => {
      let status: 'idle' | 'fixed' | 'left' | 'right' | 'found' = 'idle';
      let pointerLabel: 'F' | 'L' | 'R' | 'FL' | 'FR' | 'LR' | null = null;

      if (index === currentStep.fixedIndex) {
        status = 'fixed';
        pointerLabel = 'F';
      } else if (index === currentStep.left) {
        status = 'left';
        pointerLabel = 'L';
      } else if (index === currentStep.right) {
        status = 'right';
        pointerLabel = 'R';
      }

      // Check if this triplet was found in a previous step
      if (currentStep.triplets.length > 0) {
        const lastTriplet = currentStep.triplets[currentStep.triplets.length - 1];
        if (
          currentStep.action === 'found' &&
          (value === lastTriplet[0] || value === lastTriplet[1] || value === lastTriplet[2])
        ) {
          status = 'found';
        }
      }

      return { value, index, status, pointerLabel };
    });
  }, [currentStep]);

  const description = currentStep?.description || 'Press Play or Step to begin three-sum search';
  const triplets = currentStep?.triplets || [];

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
            background: `linear-gradient(135deg, ${COLORS.fixed}, ${COLORS.left})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Three Sum Algorithm
        </h3>
        <p className="text-sm text-zinc-400">Find all unique triplets that sum to zero</p>
      </div>

      <div className="text-center">
        <span className="text-xs text-zinc-500 font-mono">
          Input: [{INPUT.join(', ')}] → Sorted: [{SORTED.join(', ')}]
        </span>
      </div>

      <div className="flex justify-center gap-2 flex-wrap">
        {cellData.map((cell) => (
          <ArrayCell
            key={cell.index}
            value={cell.value}
            index={cell.index}
            status={cell.status}
            pointerLabel={cell.pointerLabel}
          />
        ))}
      </div>

      <div className="flex justify-center gap-6 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.fixed }} />
          <span className="text-zinc-400">Fixed (F)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.left }} />
          <span className="text-zinc-400">Left (L)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.right }} />
          <span className="text-zinc-400">Right (R)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLORS.found }} />
          <span className="text-zinc-400">Found</span>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-800 border border-zinc-700 p-4 space-y-3 text-sm font-mono">
        <div className="flex items-start gap-2">
          <span className="text-zinc-500 shrink-0">Status:</span>
          <span className="text-zinc-200">{description}</span>
        </div>

        {currentStep && (
          <div className="flex items-start gap-2">
            <span className="text-zinc-500 shrink-0">Sum:</span>
            <span className="text-zinc-300">
              {currentStep.fixedValue} + {currentStep.leftValue} + {currentStep.rightValue} ={' '}
              {currentStep.sum}
            </span>
          </div>
        )}

        {triplets.length > 0 && (
          <div className="flex items-start gap-2">
            <span className="text-zinc-500 shrink-0">Triplets:</span>
            <span className="text-zinc-300">
              {triplets.map((t, i) => `[${t.join(', ')}]`).join(', ')}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-zinc-500 shrink-0">Step:</span>
          <span className="text-zinc-300">
            {Math.min(step, TOTAL_STEPS)} / {TOTAL_STEPS}
          </span>
        </div>
      </div>

      {isComplete && triplets.length > 0 && (
        <div
          className="text-center py-3 px-4 rounded-xl font-bold text-white text-sm"
          style={{
            background: `linear-gradient(135deg, ${COLORS.found}, #16a34a)`,
            animation: 'fadeInUp 0.4s ease-out',
          }}
        >
          Found {triplets.length} unique triplet{triplets.length !== 1 ? 's' : ''}!
        </div>
      )}

      <VizControls controls={controls} accentColor={COLORS.fixed} />
    </div>
  );
}
