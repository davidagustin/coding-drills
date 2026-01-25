'use client';

import { useState } from 'react';

interface MethodCardProps {
  method: string;
  description?: string;
  isSelected: boolean;
  isCorrect?: boolean | null;
  isRevealed?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function MethodCard({
  method,
  description,
  isSelected,
  isCorrect,
  isRevealed = false,
  onClick,
  disabled = false,
}: MethodCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getCardStyles = () => {
    // After reveal
    if (isRevealed) {
      if (isCorrect === true) {
        return {
          container: 'bg-emerald-50 border-emerald-500 dark:bg-emerald-900/30 dark:border-emerald-500',
          text: 'text-emerald-700 dark:text-emerald-300',
          icon: 'correct',
        };
      }
      if (isCorrect === false && isSelected) {
        return {
          container: 'bg-red-50 border-red-500 dark:bg-red-900/30 dark:border-red-500',
          text: 'text-red-700 dark:text-red-300',
          icon: 'incorrect',
        };
      }
      // Not selected and not correct (neutral after reveal)
      return {
        container: 'bg-gray-50 border-gray-300 dark:bg-gray-800/50 dark:border-gray-600 opacity-60',
        text: 'text-gray-500 dark:text-gray-400',
        icon: null,
      };
    }

    // Before reveal - selected state
    if (isSelected) {
      return {
        container: 'bg-blue-50 border-blue-500 dark:bg-blue-900/30 dark:border-blue-500 ring-2 ring-blue-500/30',
        text: 'text-blue-700 dark:text-blue-300',
        icon: 'selected',
      };
    }

    // Before reveal - default/hover state
    return {
      container: `
        bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600
        ${!disabled && 'hover:border-blue-400 hover:bg-blue-50/50 dark:hover:border-blue-500 dark:hover:bg-blue-900/20'}
      `,
      text: 'text-gray-900 dark:text-gray-100',
      icon: null,
    };
  };

  const styles = getCardStyles();

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

        {/* Hover arrow indicator (before reveal) */}
        {!isRevealed && !isSelected && !disabled && (
          <svg
            className={`
              w-5 h-5 text-gray-400 dark:text-gray-500
              transition-all duration-200
              ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
            `}
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
}

export default MethodCard;
