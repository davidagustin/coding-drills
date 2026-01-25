'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles = {
  default: {
    bar: 'bg-blue-500 dark:bg-blue-400',
    glow: 'shadow-blue-500/50',
  },
  success: {
    bar: 'bg-emerald-500 dark:bg-emerald-400',
    glow: 'shadow-emerald-500/50',
  },
  warning: {
    bar: 'bg-amber-500 dark:bg-amber-400',
    glow: 'shadow-amber-500/50',
  },
  danger: {
    bar: 'bg-red-500 dark:bg-red-400',
    glow: 'shadow-red-500/50',
  },
  info: {
    bar: 'bg-cyan-500 dark:bg-cyan-400',
    glow: 'shadow-cyan-500/50',
  },
};

const sizeStyles = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export function ProgressBar({
  current,
  total,
  showLabel = false,
  variant = 'default',
  size = 'md',
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.min(Math.max((current / total) * 100, 0), 100) : 0;
  const styles = variantStyles[variant];
  const heightClass = sizeStyles[size];

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {current} / {total}
            <span className="ml-2 text-gray-500 dark:text-gray-400">
              ({percentage.toFixed(0)}%)
            </span>
          </span>
        </div>
      )}

      <div
        className={`
          w-full ${heightClass} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden
          relative
        `}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Progress: ${current} of ${total}`}
      >
        {/* Background shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

        {/* Progress fill */}
        <div
          className={`
            ${heightClass} ${styles.bar} rounded-full
            transition-all duration-500 ease-out
            relative overflow-hidden
            ${percentage > 0 ? `shadow-lg ${styles.glow}` : ''}
          `}
          style={{ width: `${percentage}%` }}
        >
          {/* Animated shine effect */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-r from-transparent via-white/30 to-transparent
              animate-shine
            "
          />

          {/* Pulse effect at the end of the bar */}
          {percentage > 0 && percentage < 100 && (
            <div
              className={`
                absolute right-0 top-0 bottom-0 w-2
                ${styles.bar} animate-pulse
                rounded-full
              `}
            />
          )}
        </div>

        {/* Completion celebration effect */}
        {percentage === 100 && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        )}
      </div>

      {/* Milestone markers for larger sizes */}
      {size === 'lg' && (
        <div className="flex justify-between mt-1">
          {[0, 25, 50, 75, 100].map((milestone) => (
            <div
              key={milestone}
              className={`
                text-xs font-medium
                ${percentage >= milestone ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'}
              `}
            >
              {milestone}%
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProgressBar;
