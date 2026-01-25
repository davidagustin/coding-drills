'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

type TimerMode = 'countdown' | 'stopwatch';

interface TimerProps {
  mode: TimerMode;
  initialTime?: number; // in seconds
  onComplete?: () => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(Math.abs(seconds) / 60);
  const secs = Math.abs(seconds) % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function Timer({ mode, initialTime = 60, onComplete }: TimerProps) {
  const [time, setTime] = useState(mode === 'countdown' ? initialTime : 0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Keep onComplete ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Timer logic
  useEffect(() => {
    if (isRunning && !hasCompleted) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (mode === 'countdown') {
            if (prevTime <= 1) {
              setIsRunning(false);
              setHasCompleted(true);
              onCompleteRef.current?.();
              return 0;
            }
            return prevTime - 1;
          } else {
            return prevTime + 1;
          }
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mode, hasCompleted]);

  const handleStart = useCallback(() => {
    setIsRunning(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setHasCompleted(false);
    setTime(mode === 'countdown' ? initialTime : 0);
  }, [mode, initialTime]);

  // Calculate urgency level for countdown
  const urgencyLevel = mode === 'countdown'
    ? time <= 10 ? 'critical' : time <= 30 ? 'warning' : 'normal'
    : 'normal';

  const getUrgencyStyles = () => {
    switch (urgencyLevel) {
      case 'critical':
        return {
          container: 'bg-red-900/30 border-red-500 dark:bg-red-950/50 dark:border-red-600',
          text: 'text-red-400 dark:text-red-300',
          pulse: true,
        };
      case 'warning':
        return {
          container: 'bg-amber-900/30 border-amber-500 dark:bg-amber-950/50 dark:border-amber-600',
          text: 'text-amber-400 dark:text-amber-300',
          pulse: false,
        };
      default:
        return {
          container: 'bg-gray-800/50 border-gray-600 dark:bg-gray-900/50 dark:border-gray-700',
          text: 'text-gray-100 dark:text-gray-200',
          pulse: false,
        };
    }
  };

  const styles = getUrgencyStyles();

  return (
    <div
      className={`
        inline-flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300
        ${styles.container}
        ${styles.pulse ? 'animate-pulse' : ''}
      `}
    >
      {/* Timer display */}
      <div className="flex items-center gap-2">
        <svg
          className={`w-5 h-5 ${styles.text}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span
          className={`
            text-3xl font-mono font-bold tabular-nums tracking-tight
            ${styles.text}
          `}
        >
          {formatTime(time)}
        </span>
      </div>

      {/* Mode indicator */}
      <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {mode === 'countdown' ? 'Time Remaining' : 'Elapsed Time'}
      </span>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {!isRunning ? (
          <button
            onClick={handleStart}
            disabled={hasCompleted && mode === 'countdown'}
            className="
              flex items-center gap-1.5 px-4 py-2 text-sm font-medium
              bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-600 disabled:cursor-not-allowed
              text-white rounded-lg transition-colors duration-200
            "
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Start
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="
              flex items-center gap-1.5 px-4 py-2 text-sm font-medium
              bg-amber-600 hover:bg-amber-500
              text-white rounded-lg transition-colors duration-200
            "
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
            Pause
          </button>
        )}

        <button
          onClick={handleReset}
          className="
            flex items-center gap-1.5 px-4 py-2 text-sm font-medium
            bg-gray-600 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600
            text-white rounded-lg transition-colors duration-200
          "
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Reset
        </button>
      </div>

      {/* Completion message */}
      {hasCompleted && mode === 'countdown' && (
        <div className="text-sm font-medium text-red-400 dark:text-red-300 animate-bounce">
          Time is up!
        </div>
      )}
    </div>
  );
}

export default Timer;
