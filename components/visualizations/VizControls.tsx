'use client';

import { useEffect, useRef, useState } from 'react';
import type { VizAnimationControls } from './useVizAnimation';

interface VizControlsProps {
  controls: VizAnimationControls;
  accentColor?: string;
}

/**
 * Shared play/pause/step/reset controls and speed slider for algorithm visualizations.
 */
export default function VizControls({ controls, accentColor = '#9775fa' }: VizControlsProps) {
  const { state, togglePlay, stepForward, stepBackward, reset, setSpeed, setStep, pause } =
    controls;
  const { step, isPlaying, speed, isComplete, totalSteps } = state;
  const [isDragging, setIsDragging] = useState(false);
  const [wasDragging, setWasDragging] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const progress = totalSteps > 0 ? (step / (totalSteps - 1)) * 100 : 0;

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (wasDragging) {
      setWasDragging(false);
      return;
    }
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newStep = Math.round(percentage * (totalSteps - 1));
    setStep(newStep);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isPlaying) {
      pause();
    }
    setIsDragging(true);
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newStep = Math.round(percentage * (totalSteps - 1));
    setStep(newStep);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !progressBarRef.current) return;
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const newStep = Math.round(percentage * (totalSteps - 1));
      setStep(newStep);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setWasDragging(true);
      }
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, totalSteps, setStep]);

  return (
    <div className="space-y-3 pt-4">
      {/* Progress Bar */}
      <div className="w-full">
        <div
          ref={progressBarRef}
          className="relative h-2 bg-zinc-700 rounded-full cursor-pointer group"
          onClick={handleProgressBarClick}
          onMouseDown={handleMouseDown}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              const rect = progressBarRef.current?.getBoundingClientRect();
              if (rect) {
                const x = rect.width / 2;
                const percentage = Math.max(0, Math.min(1, x / rect.width));
                const newStep = Math.round(percentage * (totalSteps - 1));
                setStep(newStep);
              }
            }
          }}
          role="slider"
          tabIndex={0}
          aria-label="Animation progress"
          aria-valuemin={0}
          aria-valuemax={totalSteps - 1}
          aria-valuenow={step}
        >
          {/* Progress fill */}
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-all"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${accentColor}, ${accentColor}dd)`,
            }}
          />
          {/* Progress handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
            style={{
              left: `calc(${progress}% - 8px)`,
              transform: 'translateY(-50%)',
            }}
          />
          {/* Current step indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md"
            style={{
              left: `calc(${progress}% - 6px)`,
              transform: 'translateY(-50%)',
            }}
          />
        </div>
        {/* Step counter */}
        <div className="flex justify-between items-center mt-1">
          <span className="text-zinc-500 text-xs">
            Step {step + 1} of {totalSteps}
          </span>
          <span className="text-zinc-500 text-xs">{Math.round(progress)}%</span>
        </div>
      </div>
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
