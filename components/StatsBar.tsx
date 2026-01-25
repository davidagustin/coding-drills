'use client';

interface Stat {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  highlight?: boolean;
}

interface StatsBarProps {
  stats: Stat[];
  variant?: 'default' | 'compact' | 'card';
}

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'neutral' }) => {
  if (trend === 'up') {
    return (
      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    );
  }
  if (trend === 'down') {
    return (
      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
    </svg>
  );
};

export function StatsBar({ stats, variant = 'default' }: StatsBarProps) {
  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap items-center gap-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`
              flex items-center gap-2
              ${index !== stats.length - 1 ? 'pr-4 border-r border-gray-300 dark:border-gray-600' : ''}
            `}
          >
            {stat.icon && (
              <span className="text-gray-500 dark:text-gray-400">{stat.icon}</span>
            )}
            <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}:</span>
            <span
              className={`
                text-sm font-semibold
                ${stat.highlight ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}
              `}
            >
              {stat.value}
            </span>
            {stat.trend && <TrendIcon trend={stat.trend} />}
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`
              flex flex-col items-center p-4 rounded-xl border transition-all duration-200
              ${
                stat.highlight
                  ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700'
                  : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
              }
              hover:shadow-md hover:scale-105
            `}
          >
            {stat.icon && (
              <span className="mb-2 text-gray-500 dark:text-gray-400">{stat.icon}</span>
            )}
            <span
              className={`
                text-2xl font-bold mb-1
                ${stat.highlight ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}
              `}
            >
              {stat.value}
            </span>
            <span className="text-xs text-center text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {stat.label}
            </span>
            {stat.trend && (
              <div className="mt-2">
                <TrendIcon trend={stat.trend} />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Default variant
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col items-center min-w-[80px]"
        >
          <div className="flex items-center gap-2 mb-1">
            {stat.icon && (
              <span className="text-gray-500 dark:text-gray-400">{stat.icon}</span>
            )}
            <span
              className={`
                text-xl sm:text-2xl font-bold
                ${stat.highlight ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}
              `}
            >
              {stat.value}
            </span>
            {stat.trend && <TrendIcon trend={stat.trend} />}
          </div>
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default StatsBar;
