'use client';

import type { VizAnimationControls } from './useVizAnimation';

interface VizControlsProps {
  controls: VizAnimationControls;
  accentColor?: string;
}

/**
 * Shared play/pause/step/reset controls and speed slider for algorithm visualizations.
 */
export default function VizControls({ controls, accentColor = '#9775fa' }: VizControlsProps) {
  const { state, togglePlay, stepForward, stepBackward, reset, setSpeed } = controls;
  const { step, isPlaying, speed, isComplete } = state;

  return (
    <div className="space-y-3 pt-4">
      <div className="flex justify-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={togglePlay}
          className="px-5 py-2 text-sm font-semibold rounded-lg border-none cursor-pointer text-white transition-all"
          style={{
            background: isPlaying
              ? 'linear-gradient(135deg, #ef4444, #dc2626)'
              : 'linear-gradient(135deg, #22c55e, #16a34a)',
          }}
        >
          {isPlaying ? 'Pause' : isComplete ? 'Replay' : 'Play'}
        </button>

        <button
          type="button"
          onClick={stepBackward}
          disabled={isPlaying || step === 0}
          className="px-4 py-2 text-sm font-semibold rounded-lg border-none cursor-pointer text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}
        >
          Back
        </button>

        <button
          type="button"
          onClick={stepForward}
          disabled={isPlaying || isComplete}
          className="px-4 py-2 text-sm font-semibold rounded-lg border-none cursor-pointer text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}
        >
          Step
        </button>

        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 text-sm font-semibold rounded-lg border border-zinc-600 bg-transparent text-zinc-400 cursor-pointer transition-all hover:border-zinc-400 hover:text-zinc-200"
        >
          Reset
        </button>
      </div>

      <div className="flex justify-center items-center gap-3">
        <span className="text-zinc-500 text-xs">Speed:</span>
        <input
          type="range"
          min="100"
          max="1200"
          step="100"
          value={1300 - speed}
          onChange={(e) => setSpeed(1300 - Number(e.target.value))}
          className="w-24"
          style={{ accentColor }}
        />
        <span className="text-zinc-500 text-xs w-12">
          {speed < 300 ? 'Fast' : speed < 700 ? 'Med' : 'Slow'}
        </span>
      </div>
    </div>
  );
}
