'use client';

import { useMemo } from 'react';
import { useVizAnimation } from './useVizAnimation';
import VizControls from './VizControls';

const DISKS = 3;
const SOURCE = 'A';
const TARGET = 'C';
const AUXILIARY = 'B';

interface TowerOfHanoiStep {
  pegs: Record<string, number[]>;
  move: [string, string] | null;
  callStack: Array<{ disks: number; src: string; tgt: string; aux: string }>;
  explanation: string;
}

function computeSteps(): TowerOfHanoiStep[] {
  const steps: TowerOfHanoiStep[] = [];
  const pegs: Record<string, number[]> = {
    [SOURCE]: Array.from({ length: DISKS }, (_, i) => DISKS - i),
    [TARGET]: [],
    [AUXILIARY]: [],
  };
  const moves: Array<[string, string]> = [];
  const callStack: Array<{ disks: number; src: string; tgt: string; aux: string }> = [];

  steps.push({
    pegs: JSON.parse(JSON.stringify(pegs)),
    move: null,
    callStack: [],
    explanation: `Start: Tower of Hanoi with ${DISKS} disks on peg ${SOURCE}`,
  });

  function solve(disks: number, src: string, tgt: string, aux: string): void {
    callStack.push({ disks, src, tgt, aux });
    steps.push({
      pegs: JSON.parse(JSON.stringify(pegs)),
      move: null,
      callStack: [...callStack],
      explanation: `solve(${disks}, ${src}, ${tgt}, ${aux}): ${disks === 0 ? 'Base case, return' : `Move ${disks} disks from ${src} to ${tgt} using ${aux}`}`,
    });

    if (disks === 0) {
      callStack.pop();
      return;
    }

    // Step 1: Move n-1 disks to auxiliary
    solve(disks - 1, src, aux, tgt);
    callStack.pop();

    // Step 2: Move largest disk to target
    const disk = pegs[src].pop();
    if (disk === undefined) return;
    pegs[tgt].push(disk);
    moves.push([src, tgt]);
    steps.push({
      pegs: JSON.parse(JSON.stringify(pegs)),
      move: [src, tgt],
      callStack: [...callStack],
      explanation: `Move disk ${disk} from ${src} to ${tgt}`,
    });

    // Step 3: Move n-1 disks from auxiliary to target
    solve(disks - 1, aux, tgt, src);
    callStack.pop();
  }

  solve(DISKS, SOURCE, TARGET, AUXILIARY);

  steps.push({
    pegs: JSON.parse(JSON.stringify(pegs)),
    move: null,
    callStack: [],
    explanation: `Complete: All ${moves.length} moves executed`,
  });

  return steps;
}

const STEPS = computeSteps();
const TOTAL_STEPS = STEPS.length;

export default function TowerOfHanoiViz() {
  const controls = useVizAnimation(TOTAL_STEPS);
  const { step } = controls.state;

  const currentStep = useMemo(() => {
    return step < STEPS.length ? STEPS[step] : STEPS[STEPS.length - 1];
  }, [step]);

  const { pegs, move, callStack, explanation } = currentStep;
  const pegNames = [SOURCE, AUXILIARY, TARGET];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-2xl font-bold text-white mb-4">Tower of Hanoi</h2>

      <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
        <p className="text-white text-sm">{explanation}</p>
        {move && (
          <p className="text-green-400 font-semibold mt-2">
            Move: {move[0]} → {move[1]}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {/* Pegs */}
        <div>
          <h3 className="text-sm font-medium text-zinc-400 mb-2">Pegs</h3>
          <div className="flex gap-8 justify-center">
            {pegNames.map((pegName) => {
              const disks = pegs[pegName] || [];
              const isSource = move && move[0] === pegName;
              const isTarget = move && move[1] === pegName;
              return (
                <div key={pegName} className="flex flex-col items-center">
                  <div className="text-lg font-bold text-zinc-300 mb-2">{pegName}</div>
                  <div className="relative w-24 h-48 border-2 border-zinc-700 rounded-b-lg bg-zinc-800 flex flex-col-reverse items-center justify-end pb-2">
                    {disks.length === 0 ? (
                      <div className="text-zinc-600 text-xs">empty</div>
                    ) : (
                      disks.map((disk, idx) => {
                        const isMoving = isSource && idx === disks.length - 1;
                        return (
                          <div
                            key={idx}
                            className={`rounded-t-lg border-2 flex items-center justify-center font-mono text-xs font-semibold ${
                              isMoving
                                ? 'bg-red-500/20 border-red-500 text-red-400'
                                : isTarget && idx === disks.length - 1
                                  ? 'bg-green-500/20 border-green-500 text-green-400'
                                  : 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                            }`}
                            style={{
                              width: `${disk * 20 + 20}px`,
                              height: '24px',
                            }}
                          >
                            {disk}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call Stack */}
        {callStack.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Call Stack</h3>
            <div className="space-y-2">
              {callStack.map((call, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-zinc-800 rounded-lg border-2 border-zinc-700 font-mono text-sm"
                >
                  <span className="text-cyan-400">solve</span>
                  <span className="text-white">({call.disks}, </span>
                  <span className="text-yellow-400">{call.src}</span>
                  <span className="text-white">, </span>
                  <span className="text-green-400">{call.tgt}</span>
                  <span className="text-white">, </span>
                  <span className="text-purple-400">{call.aux}</span>
                  <span className="text-white">)</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <VizControls controls={controls} />
    </div>
  );
}
