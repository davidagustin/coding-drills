'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// ============================================================================
// Types
// ============================================================================

export type TimerMode = 'up' | 'down';

export interface UseTimerOptions {
  /** Timer mode: 'up' counts up from 0, 'down' counts down from initialSeconds */
  mode?: TimerMode;
  /** Initial seconds (required for 'down' mode, optional for 'up' mode) */
  initialSeconds?: number;
  /** Auto-start the timer when mounted */
  autoStart?: boolean;
  /** Callback when timer reaches 0 (only for 'down' mode) */
  onComplete?: () => void;
  /** Callback every second with current time */
  onTick?: (seconds: number) => void;
  /** Interval in milliseconds (default: 1000) */
  interval?: number;
}

export interface UseTimerReturn {
  /** Current time in seconds */
  time: number;
  /** Whether the timer is currently running */
  isRunning: boolean;
  /** Whether the timer has completed (only for 'down' mode) */
  isComplete: boolean;
  /** Start or resume the timer */
  start: () => void;
  /** Pause the timer */
  pause: () => void;
  /** Reset the timer to initial value */
  reset: () => void;
  /** Toggle between running and paused */
  toggle: () => void;
  /** Set time to a specific value */
  setTime: (seconds: number) => void;
  /** Get formatted time string (MM:SS or HH:MM:SS) */
  formatted: string;
  /** Get formatted time parts */
  parts: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Format seconds into time parts
 */
function getTimeParts(totalSeconds: number): { hours: number; minutes: number; seconds: number } {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds };
}

/**
 * Format seconds into string (MM:SS or HH:MM:SS)
 */
function formatTime(totalSeconds: number): string {
  const { hours, minutes, seconds } = getTimeParts(totalSeconds);

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
}

// ============================================================================
// useTimer Hook
// ============================================================================

/**
 * Timer hook that supports both count-up and count-down modes
 * Handles SSR by not starting automatically on server
 */
export function useTimer(options: UseTimerOptions = {}): UseTimerReturn {
  const {
    mode = 'up',
    initialSeconds = 0,
    autoStart = false,
    onComplete,
    onTick,
    interval = 1000,
  } = options;

  const [time, setTime] = useState(mode === 'down' ? initialSeconds : 0);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Refs for callbacks to avoid stale closures
  const onCompleteRef = useRef(onComplete);
  const onTickRef = useRef(onTick);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  // Auto-start effect (client-side only)
  useEffect(() => {
    if (autoStart && typeof window !== 'undefined') {
      setIsRunning(true);
    }
  }, [autoStart]);

  // Timer interval effect
  useEffect(() => {
    if (!isRunning || isComplete) return;

    const tick = () => {
      setTime((prevTime) => {
        let newTime: number;

        if (mode === 'down') {
          newTime = Math.max(0, prevTime - 1);

          // Check for completion
          if (newTime === 0) {
            setIsComplete(true);
            setIsRunning(false);
            onCompleteRef.current?.();
          }
        } else {
          newTime = prevTime + 1;
        }

        onTickRef.current?.(newTime);
        return newTime;
      });
    };

    const intervalId = setInterval(tick, interval);

    return () => clearInterval(intervalId);
  }, [isRunning, isComplete, mode, interval]);

  const start = useCallback(() => {
    if (isComplete && mode === 'down') {
      // Reset before starting if completed
      setTime(initialSeconds);
      setIsComplete(false);
    }
    setIsRunning(true);
  }, [isComplete, mode, initialSeconds]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsComplete(false);
    setTime(mode === 'down' ? initialSeconds : 0);
  }, [mode, initialSeconds]);

  const toggle = useCallback(() => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  }, [isRunning, pause, start]);

  const setTimeValue = useCallback((seconds: number) => {
    setTime(Math.max(0, Math.floor(seconds)));
    if (mode === 'down' && seconds > 0) {
      setIsComplete(false);
    }
  }, [mode]);

  const formatted = formatTime(time);
  const parts = getTimeParts(time);

  return {
    time,
    isRunning,
    isComplete,
    start,
    pause,
    reset,
    toggle,
    setTime: setTimeValue,
    formatted,
    parts,
  };
}

// ============================================================================
// useStopwatch Hook (convenience wrapper)
// ============================================================================

/**
 * Stopwatch hook - counts up from 0
 */
export function useStopwatch(options: Omit<UseTimerOptions, 'mode'> = {}): UseTimerReturn {
  return useTimer({ ...options, mode: 'up' });
}

// ============================================================================
// useCountdown Hook (convenience wrapper)
// ============================================================================

/**
 * Countdown hook - counts down from initialSeconds
 */
export function useCountdown(
  initialSeconds: number,
  options: Omit<UseTimerOptions, 'mode' | 'initialSeconds'> = {}
): UseTimerReturn {
  return useTimer({ ...options, mode: 'down', initialSeconds });
}

// ============================================================================
// useDebounce Hook (utility)
// ============================================================================

/**
 * Debounce a value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// ============================================================================
// useInterval Hook (utility)
// ============================================================================

/**
 * SetInterval as a hook
 */
export function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);

    return () => clearInterval(id);
  }, [delay]);
}

export default useTimer;
