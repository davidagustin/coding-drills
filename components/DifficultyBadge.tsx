'use client';

type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const difficultyConfig = {
  easy: {
    label: 'Easy',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/40',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    borderColor: 'border-emerald-300 dark:border-emerald-700',
    dotColor: 'bg-emerald-500',
    icon: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  medium: {
    label: 'Medium',
    bgColor: 'bg-amber-100 dark:bg-amber-900/40',
    textColor: 'text-amber-700 dark:text-amber-300',
    borderColor: 'border-amber-300 dark:border-amber-700',
    dotColor: 'bg-amber-500',
    icon: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="8" cy="12" r="3" />
        <circle cx="16" cy="12" r="3" />
      </svg>
    ),
  },
  hard: {
    label: 'Hard',
    bgColor: 'bg-red-100 dark:bg-red-900/40',
    textColor: 'text-red-700 dark:text-red-300',
    borderColor: 'border-red-300 dark:border-red-700',
    dotColor: 'bg-red-500',
    icon: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="12" cy="12" r="2.5" />
        <circle cx="18" cy="12" r="2.5" />
      </svg>
    ),
  },
};

const sizeConfig = {
  sm: {
    padding: 'px-2 py-0.5',
    text: 'text-xs',
    iconSize: 'w-3 h-3',
  },
  md: {
    padding: 'px-2.5 py-1',
    text: 'text-sm',
    iconSize: 'w-4 h-4',
  },
  lg: {
    padding: 'px-3 py-1.5',
    text: 'text-base',
    iconSize: 'w-5 h-5',
  },
};

export function DifficultyBadge({
  difficulty,
  size = 'md',
  showIcon = true,
}: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];
  const sizes = sizeConfig[size];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-semibold rounded-full border
        ${config.bgColor} ${config.textColor} ${config.borderColor}
        ${sizes.padding} ${sizes.text}
        transition-all duration-200
      `}
      role="status"
      aria-label={`Difficulty: ${config.label}`}
    >
      {showIcon && (
        <span className={`${sizes.iconSize} flex-shrink-0`} aria-hidden="true">
          {config.icon}
        </span>
      )}
      <span>{config.label}</span>
    </span>
  );
}

export default DifficultyBadge;
