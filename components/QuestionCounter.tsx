'use client';

interface QuestionCounterProps {
  current: number;
  total: number;
  showProgress?: boolean;
  variant?: 'default' | 'minimal' | 'pill';
}

export function QuestionCounter({
  current,
  total,
  showProgress = true,
  variant = 'default',
}: QuestionCounterProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  if (variant === 'minimal') {
    return (
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {current}/{total}
      </span>
    );
  }

  if (variant === 'pill') {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
          {current}
        </span>
        <span className="text-gray-400 dark:text-gray-500">/</span>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {total}
        </span>
      </div>
    );
  }

  // Default variant
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Question indicator */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Question
        </span>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-gray-900 dark:text-gray-100 tabular-nums">
            {current}
          </span>
          <span className="text-lg text-gray-400 dark:text-gray-500">/</span>
          <span className="text-lg font-medium text-gray-500 dark:text-gray-400 tabular-nums">
            {total}
          </span>
        </div>
      </div>

      {/* Progress dots */}
      {showProgress && total <= 20 && (
        <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-xs">
          {Array.from({ length: total }, (_, i) => i + 1).map((num) => (
            <div
              key={num}
              className={`
                w-2.5 h-2.5 rounded-full transition-all duration-300
                ${
                  num < current
                    ? 'bg-emerald-500 dark:bg-emerald-400'
                    : num === current
                    ? 'bg-blue-500 dark:bg-blue-400 ring-2 ring-blue-500/30 scale-125'
                    : 'bg-gray-300 dark:bg-gray-600'
                }
              `}
              aria-hidden="true"
            />
          ))}
        </div>
      )}

      {/* Progress bar for larger totals */}
      {showProgress && total > 20 && (
        <div className="w-full max-w-xs">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Completion status */}
      {current === total && (
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 animate-pulse">
          Final Question!
        </span>
      )}
    </div>
  );
}

export default QuestionCounter;
