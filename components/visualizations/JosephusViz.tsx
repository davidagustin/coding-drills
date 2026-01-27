'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const N = 7;
const K = 3;

/* ------------------------------------------------------------------ */
/*  Step interface                                                     */
/* ------------------------------------------------------------------ */

interface JosephusStep {
  /** 'counting' = highlighting the person being counted, 'eliminate' = removing person, 'done' = finished */
  phase: 'counting' | 'eliminate' | 'done';
  /** Current count within this elimination round (1..K) */
  count: number;
  /** Index (0-based) of the person currently being pointed at */
  currentPerson: number;
  /** Set of already-eliminated person indices */
  eliminated: Set<number>;
  /** Ordered list of eliminated person indices so far */
  eliminationOrder: number[];
  /** Description of what is happening */
  description: string;
  /** The survivor index (only set in the 'done' phase) */
  survivor: number | null;
}

/* ------------------------------------------------------------------ */
/*  Pre-compute all steps                                              */
/* ------------------------------------------------------------------ */

function computeSteps(): JosephusStep[] {
  const steps: JosephusStep[] = [];
  const eliminated = new Set<number>();
  const eliminationOrder: number[] = [];
  let current = 0; // start at person 0

  while (eliminated.size < N - 1) {
    // Count K people (skipping eliminated ones)
    let count = 0;
    while (count < K) {
      // Skip eliminated people
      while (eliminated.has(current)) {
        current = (current + 1) % N;
      }

      count++;

      if (count < K) {
        // Intermediate counting step
        steps.push({
          phase: 'counting',
          count,
          currentPerson: current,
          eliminated: new Set(eliminated),
          eliminationOrder: [...eliminationOrder],
          description: `Count ${count} of ${K} \u2192 Person ${current + 1}`,
          survivor: null,
        });
        // Move to next alive person
        current = (current + 1) % N;
      } else {
        // count === K: first show the counting step, then eliminate
        steps.push({
          phase: 'counting',
          count,
          currentPerson: current,
          eliminated: new Set(eliminated),
          eliminationOrder: [...eliminationOrder],
          description: `Count ${count} of ${K} \u2192 Person ${current + 1} (eliminate!)`,
          survivor: null,
        });

        // Elimination step
        eliminated.add(current);
        eliminationOrder.push(current);
        steps.push({
          phase: 'eliminate',
          count: K,
          currentPerson: current,
          eliminated: new Set(eliminated),
          eliminationOrder: [...eliminationOrder],
          description: `Eliminated Person ${current + 1} (elimination #${eliminationOrder.length})`,
          survivor: null,
        });

        // Move to next alive person for the next round
        current = (current + 1) % N;
      }
    }
  }

  // Find the survivor
  let survivor = -1;
  for (let i = 0; i < N; i++) {
    if (!eliminated.has(i)) {
      survivor = i;
      break;
    }
  }

  steps.push({
    phase: 'done',
    count: 0,
    currentPerson: survivor,
    eliminated: new Set(eliminated),
    eliminationOrder: [...eliminationOrder],
    description: `Survivor: Person ${survivor + 1}!`,
    survivor,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Colours                                                            */
/* ------------------------------------------------------------------ */

const COLORS = {
  accent: '#fbbf24',
  eliminated: '#ef4444',
  counting: '#3b82f6',
  survivor: '#22c55e',
  idle: '#71717a',
  ring: '#3f3f46',
} as const;

/* ------------------------------------------------------------------ */
/*  SVG layout helpers                                                 */
/* ------------------------------------------------------------------ */

const SVG_SIZE = 360;
const CENTER = SVG_SIZE / 2;
const RADIUS = 130;
const PERSON_RADIUS = 24;

function personPosition(index: number): { x: number; y: number } {
  // Start from the top (-PI/2) and go clockwise
  const angle = (2 * Math.PI * index) / N - Math.PI / 2;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function JosephusViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const current: JosephusStep | null = step === 0 ? null : (STEPS[step - 1] ?? null);

  const eliminatedSet = useMemo<Set<number>>(() => {
    if (!current) return new Set();
    return current.eliminated;
  }, [current]);

  const eliminationOrder = useMemo<number[]>(() => {
    if (!current) return [];
    return current.eliminationOrder;
  }, [current]);

  return (
    <div className="w-full max-w-2xl mx-auto select-none">
      {/* ---- Header ---- */}
      <div className="text-center mb-5">
        <h2
          className="text-xl font-bold mb-1"
          style={{
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Josephus Problem
        </h2>
        <p className="text-zinc-400 text-sm">
          <span className="text-white font-semibold">N = {N}</span> people,{' '}
          <span className="text-white font-semibold">K = {K}</span> skip count
        </p>
      </div>

      {/* ---- Circle visualisation ---- */}
      <div className="bg-zinc-800/80 rounded-xl p-5 border border-zinc-700/60">
        <div className="flex justify-center">
          <svg
            width={SVG_SIZE}
            height={SVG_SIZE}
            viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
            className="overflow-visible"
            aria-label="Josephus problem visualization"
          >
            <title>Josephus problem visualization</title>
            {/* Background circle ring */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke={COLORS.ring}
              strokeWidth={2}
              strokeDasharray="6 4"
              opacity={0.5}
            />

            {/* Connection lines between adjacent alive people */}
            {Array.from({ length: N }, (_, i) => {
              const next = (i + 1) % N;
              const iElim = eliminatedSet.has(i);
              const nextElim = eliminatedSet.has(next);
              if (iElim && nextElim) return null;
              const p1 = personPosition(i);
              const p2 = personPosition(next);
              return (
                <line
                  key={`line-${i}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={iElim || nextElim ? COLORS.ring : 'rgba(113,113,122,0.3)'}
                  strokeWidth={1.5}
                  opacity={iElim || nextElim ? 0.2 : 0.4}
                />
              );
            })}

            {/* Person nodes */}
            {Array.from({ length: N }, (_, i) => {
              const pos = personPosition(i);
              const isEliminated = eliminatedSet.has(i);
              const isCurrent = current !== null && current.currentPerson === i;
              const isSurvivor = current?.phase === 'done' && current.survivor === i;
              const isCounting = current?.phase === 'counting' && isCurrent && !isEliminated;
              const isBeingEliminated = current?.phase === 'eliminate' && isCurrent;

              // Determine fill color
              let fill: string = 'rgba(63,63,70,0.8)';
              let stroke: string = COLORS.idle;
              let textColor: string = '#e4e4e7';
              let glowShadow: string = '';
              let animClass: string = '';

              if (isSurvivor) {
                fill = `${COLORS.survivor}22`;
                stroke = COLORS.survivor;
                textColor = COLORS.survivor;
                glowShadow = `0 0 16px ${COLORS.survivor}88, 0 0 32px ${COLORS.survivor}44`;
                animClass = 'jpv-survivor';
              } else if (isBeingEliminated) {
                fill = `${COLORS.eliminated}22`;
                stroke = COLORS.eliminated;
                textColor = COLORS.eliminated;
                glowShadow = `0 0 12px ${COLORS.eliminated}66`;
                animClass = 'jpv-eliminate';
              } else if (isCounting) {
                fill = `${COLORS.counting}22`;
                stroke = COLORS.counting;
                textColor = COLORS.counting;
                glowShadow = `0 0 10px ${COLORS.counting}66`;
                animClass = 'jpv-pulse';
              } else if (isEliminated) {
                fill = 'rgba(39,39,42,0.4)';
                stroke = 'rgba(63,63,70,0.3)';
                textColor = 'rgba(161,161,170,0.3)';
              }

              // Elimination order badge number
              const elimIndex = eliminationOrder.indexOf(i);

              return (
                <g key={`person-${i}`} className={animClass}>
                  {/* Glow effect for active states */}
                  {glowShadow && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={PERSON_RADIUS + 4}
                      fill="none"
                      stroke={stroke}
                      strokeWidth={2}
                      opacity={0.3}
                    />
                  )}

                  {/* Person circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={PERSON_RADIUS}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={2}
                    style={{
                      transition: 'all 0.4s cubic-bezier(.4,0,.2,1)',
                    }}
                  />

                  {/* Person number */}
                  <text
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="text-sm font-bold font-mono"
                    style={{
                      fill: textColor,
                      transition: 'fill 0.4s',
                    }}
                  >
                    {i + 1}
                  </text>

                  {/* X mark for eliminated */}
                  {isEliminated && !isBeingEliminated && (
                    <>
                      <line
                        x1={pos.x - 8}
                        y1={pos.y - 8}
                        x2={pos.x + 8}
                        y2={pos.y + 8}
                        stroke={COLORS.eliminated}
                        strokeWidth={2.5}
                        opacity={0.5}
                        strokeLinecap="round"
                      />
                      <line
                        x1={pos.x + 8}
                        y1={pos.y - 8}
                        x2={pos.x - 8}
                        y2={pos.y + 8}
                        stroke={COLORS.eliminated}
                        strokeWidth={2.5}
                        opacity={0.5}
                        strokeLinecap="round"
                      />
                    </>
                  )}

                  {/* Elimination order badge */}
                  {elimIndex >= 0 && (
                    <>
                      <circle
                        cx={pos.x + PERSON_RADIUS * 0.7}
                        cy={pos.y - PERSON_RADIUS * 0.7}
                        r={9}
                        fill={COLORS.eliminated}
                        opacity={0.85}
                      />
                      <text
                        x={pos.x + PERSON_RADIUS * 0.7}
                        y={pos.y - PERSON_RADIUS * 0.7}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-[9px] font-bold font-mono"
                        style={{ fill: '#ffffff' }}
                      >
                        {elimIndex + 1}
                      </text>
                    </>
                  )}

                  {/* Counting indicator (shows current count) */}
                  {isCounting && current && (
                    <>
                      <circle
                        cx={pos.x - PERSON_RADIUS * 0.7}
                        cy={pos.y - PERSON_RADIUS * 0.7}
                        r={9}
                        fill={COLORS.counting}
                        opacity={0.9}
                      />
                      <text
                        x={pos.x - PERSON_RADIUS * 0.7}
                        y={pos.y - PERSON_RADIUS * 0.7}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-[9px] font-bold font-mono"
                        style={{ fill: '#ffffff' }}
                      >
                        {current.count}
                      </text>
                    </>
                  )}
                </g>
              );
            })}

            {/* Center label */}
            <text
              x={CENTER}
              y={CENTER - 10}
              textAnchor="middle"
              dominantBaseline="central"
              className="text-xs font-semibold"
              style={{ fill: 'rgba(161,161,170,0.6)' }}
            >
              J({N},{K})
            </text>
            <text
              x={CENTER}
              y={CENTER + 8}
              textAnchor="middle"
              dominantBaseline="central"
              className="text-[10px] font-mono"
              style={{ fill: 'rgba(161,161,170,0.4)' }}
            >
              = {josephus(N, K) + 1}
            </text>
          </svg>
        </div>

        {/* ---- Legend ---- */}
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <LegendItem color={COLORS.counting} label="Counting" />
          <LegendItem color={COLORS.eliminated} label="Eliminated" />
          <LegendItem color={COLORS.survivor} label="Survivor" />
          <LegendItem color={COLORS.accent} label="Current" />
        </div>
      </div>

      {/* ---- Status panel ---- */}
      <div
        className="mt-3 rounded-xl border border-zinc-700/60 bg-zinc-800/80 px-5 py-4 text-center"
        style={{ minHeight: 64, transition: 'all 0.3s' }}
      >
        {current === null ? (
          <p className="text-zinc-500 text-sm italic">
            Press <span className="font-semibold text-zinc-400">Play</span> or{' '}
            <span className="font-semibold text-zinc-400">Step</span> to begin
          </p>
        ) : (
          <>
            <p className="text-xs text-zinc-500 mb-1 uppercase tracking-wider font-semibold">
              Step {step} of {TOTAL_STEPS}
            </p>
            <p
              className="font-mono text-sm font-semibold"
              style={{
                color:
                  current.phase === 'done'
                    ? COLORS.survivor
                    : current.phase === 'eliminate'
                      ? COLORS.eliminated
                      : '#e4e4e7',
                transition: 'color 0.3s',
              }}
            >
              {current.description}
            </p>
            {current.eliminationOrder.length > 0 && (
              <p className="text-zinc-500 text-xs mt-1">
                Elimination order: {current.eliminationOrder.map((idx) => idx + 1).join(' \u2192 ')}
              </p>
            )}
          </>
        )}
      </div>

      {/* ---- Formula ---- */}
      <div className="mt-3 rounded-xl border border-zinc-700/60 bg-zinc-800/80 px-5 py-3 text-center">
        <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold mb-1">
          Recursive Formula
        </p>
        <p className="font-mono text-sm text-zinc-300">J(n, k) = (J(n-1, k) + k) % n</p>
        <p className="font-mono text-xs text-zinc-500 mt-1">
          J(1, {K}) = 0 {'\u2192'} J({N}, {K}) = {josephus(N, K)} {'\u2192'} Person{' '}
          <span className="font-semibold" style={{ color: COLORS.survivor }}>
            {josephus(N, K) + 1}
          </span>{' '}
          survives
        </p>
      </div>

      {/* ---- Controls ---- */}
      <VizControls controls={controls} accentColor={COLORS.accent} />

      {/* ---- Inline keyframes ---- */}
      <style>{`
        @keyframes jpv-pulse-anim {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.08); }
        }
        @keyframes jpv-eliminate-anim {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.15); }
          100% { transform: scale(0.95); }
        }
        @keyframes jpv-survivor-anim {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.1); }
        }
        @keyframes jpv-glow {
          from { opacity: 0.3; }
          to   { opacity: 0.7; }
        }
        .jpv-pulse {
          animation: jpv-pulse-anim 1.2s ease-in-out infinite;
          transform-origin: center;
        }
        .jpv-eliminate {
          animation: jpv-eliminate-anim 0.5s ease-out forwards;
          transform-origin: center;
        }
        .jpv-survivor {
          animation: jpv-survivor-anim 1.5s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Josephus formula (0-indexed result)                                */
/* ------------------------------------------------------------------ */

function josephus(n: number, k: number): number {
  let result = 0;
  for (let i = 2; i <= n; i++) {
    result = (result + k) % i;
  }
  return result;
}

/* ------------------------------------------------------------------ */
/*  Small helper sub-components                                        */
/* ------------------------------------------------------------------ */

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: color }} />
      <span className="text-zinc-400 text-xs">{label}</span>
    </div>
  );
}
