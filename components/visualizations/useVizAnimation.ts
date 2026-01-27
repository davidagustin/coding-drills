'use client';

import { useCallback, useEffect, useState } from 'react';

export interface VizAnimationState {
  step: number;
  isPlaying: boolean;
  speed: number;
  isComplete: boolean;
}

export interface VizAnimationControls {
  state: VizAnimationState;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
}

/**
 * Shared animation hook for algorithm visualizations.
 * Manages play/pause, step-by-step, and speed controls.
 *
 * @param totalSteps - Total number of animation steps
 * @param onStep - Optional callback fired on each step advance
 */
export function useVizAnimation(
  totalSteps: number,
  onStep?: (step: number) => void,
): VizAnimationControls {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);

  const isComplete = step >= totalSteps;

  // The `step` dependency is needed to re-schedule the timeout after each advance,
  // even though we use the functional updater form for setStep.
  // biome-ignore lint/correctness/useExhaustiveDependencies: step triggers re-schedule
  useEffect(() => {
    if (!isPlaying || isComplete) return;

    const timer = setTimeout(() => {
      setStep((prev) => {
        const next = prev + 1;
        onStep?.(next);
        if (next >= totalSteps) {
          setIsPlaying(false);
        }
        return next;
      });
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, step, speed, totalSteps, isComplete, onStep]);

  const play = useCallback(() => {
    if (isComplete) {
      setStep(0);
    }
    setIsPlaying(true);
  }, [isComplete]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const stepForward = useCallback(() => {
    if (step < totalSteps) {
      const nextStep = step + 1;
      setStep(nextStep);
      onStep?.(nextStep);
    }
  }, [step, totalSteps, onStep]);

  const stepBackward = useCallback(() => {
    if (step > 0) {
      const prevStep = step - 1;
      setStep(prevStep);
      onStep?.(prevStep);
    }
  }, [step, onStep]);

  const reset = useCallback(() => {
    setStep(0);
    setIsPlaying(false);
  }, []);

  return {
    state: { step, isPlaying, speed, isComplete },
    play,
    pause,
    togglePlay,
    stepForward,
    stepBackward,
    reset,
    setSpeed,
  };
}
