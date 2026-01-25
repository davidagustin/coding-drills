'use client';

import { memo, useMemo } from 'react';

interface MethodCardProps {
  method: string;
  description?: string;
  isSelected: boolean;
  isCorrect?: boolean | null;
  isRevealed?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

// Pre-computed style objects to avoid object creation on every render
const STYLES = {
  correct: {
    container: 'bg-emerald-50 border-emerald-500 dark:bg-emerald-900/30 dark:border-emerald-500',
    text: 'text-emerald-700 dark:text-emerald-300',
    icon: 'correct' as const,
  },
  incorrect: {
    container: 'bg-red-50 border-red-500 dark:bg-red-900/30 dark:border-red-500',
    text: 'text-red-700 dark:text-red-300',
    icon: 'incorrect' as const,
  },
  neutral: {
    container: 'bg-gray-50 border-gray-300 dark:bg-gray-800/50 dark:border-gray-600 opacity-60',
    text: 'text-gray-500 dark:text-gray-400',
    icon: null,
  },
  selected: {
    container: 'bg-blue-50 border-blue-500 dark:bg-blue-900/30 dark:border-blue-500 ring-2 ring-blue-500/30',
    text: 'text-blue-700 dark:text-blue-300',
    icon: 'selected' as const,
  },
  defaultEnabled: {
    container: 'bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:border-blue-500 dark:hover:bg-blue-900/20',
    text: 'text-gray-900 dark:text-gray-100',
    icon: null,
  },
  defaultDisabled: {
    container: 'bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600',
    text: 'text-gray-900 dark:text-gray-100',
    icon: null,
  },
} as const;

// Memoized style computation to avoid recalculation
function getCardStyles(
  isRevealed: boolean,
  isCorrect: boolean | null | undefined,
  isSelected: boolean,
  disabled: boolean
) {
  if (isRevealed) {
    if (isCorrect === true) return STYLES.correct;
    if (isCorrect === false && isSelected) return STYLES.incorrect;
    return STYLES.neutral;
  }
  if (isSelected) return STYLES.selected;
  return disabled ? STYLES.defaultDisabled : STYLES.defaultEnabled;
}

export const MethodCard = memo(function MethodCard({
  method,
  description,
  isSelected,
  isCorrect,
  isRevealed = false,
  onClick,
  disabled = false,
}: MethodCardProps) {
  // Memoize styles to avoid recalculation on every render
  const styles = useMemo(
    () => getCardStyles(isRevealed, isCorrect, isSelected, disabled),
    [isRevealed, isCorrect, isSelected, disabled]
  );

  const renderIcon = () => {
    switch (styles.icon) {
      case 'correct':
        return (
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center animate-scale-in">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'incorrect':
        return (
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center animate-shake">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      case 'selected':
        return (
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-colors" />
        );
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isRevealed}
      className={`
        group w-full p-4 rounded-xl border-2 text-left
        transition-all duration-200 ease-out
        ${styles.container}
        ${disabled || isRevealed ? 'cursor-default' : 'cursor-pointer'}
        ${!disabled && !isRevealed && 'active:scale-[0.98]'}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        dark:focus:ring-offset-gray-900
      `}
      aria-pressed={isSelected}
    >
      <div className="flex items-start gap-3">
        {/* Selection indicator */}
        {renderIcon()}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <code
            className={`
              text-base sm:text-lg font-mono font-semibold
              ${styles.text}
              transition-colors duration-200
            `}
          >
            {method}
          </code>

          {description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Hover arrow indicator (before reveal) - uses CSS group-hover instead of state */}
        {!isRevealed && !isSelected && !disabled && (
          <svg
            className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-all duration-200 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </div>
    </button>
  );
});

export default MethodCard;
