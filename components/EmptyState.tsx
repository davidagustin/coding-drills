'use client';

import Link from 'next/link';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

const defaultIcon = (
  <svg
    className="w-16 h-16 text-gray-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
    />
  </svg>
);

const buttonClasses = `
  inline-flex items-center gap-2 px-6 py-3
  bg-gradient-to-r from-purple-600 to-blue-600
  hover:from-purple-500 hover:to-blue-500
  text-white font-semibold rounded-xl
  transition-all duration-200
  hover:shadow-lg hover:shadow-purple-500/25
  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
`;

// Extracted outside render to prevent recreation on each render
function ActionButton({ action }: { action?: EmptyStateProps['action'] }) {
  if (!action) return null;

  if (action.href) {
    return (
      <Link href={action.href} className={buttonClasses}>
        {action.label}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    );
  }

  if (action.onClick) {
    return (
      <button onClick={action.onClick} className={buttonClasses}>
        {action.label}
      </button>
    );
  }

  return null;
}

export function EmptyState({
  icon = defaultIcon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        text-center py-16 px-6
        ${className}
      `}
    >
      {/* Icon container with subtle glow */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-2xl" />
        <div className="relative p-4 rounded-full bg-gray-800/50 border border-gray-700">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-200 mb-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-gray-500 max-w-md mb-6">
          {description}
        </p>
      )}

      {/* Action button */}
      {action && <ActionButton action={action} />}
    </div>
  );
}

// Preset empty states for common scenarios
export function NoResultsFound({
  searchTerm,
  onClear,
}: {
  searchTerm?: string;
  onClear?: () => void;
}) {
  return (
    <EmptyState
      icon={
        <svg
          className="w-16 h-16 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      }
      title="No results found"
      description={
        searchTerm
          ? `We couldn't find any results for "${searchTerm}". Try adjusting your search or filters.`
          : "We couldn't find any matching results. Try adjusting your filters."
      }
      action={onClear ? { label: 'Clear search', onClick: onClear } : undefined}
    />
  );
}

export function NoDrillsAvailable() {
  return (
    <EmptyState
      icon={
        <svg
          className="w-16 h-16 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      }
      title="No drills available yet"
      description="We're working on adding drills for this category. Check back soon!"
      action={{ label: 'Browse all languages', href: '/' }}
    />
  );
}

export function CompletedAllDrills() {
  return (
    <EmptyState
      icon={
        <svg
          className="w-16 h-16 text-emerald-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      }
      title="All drills completed!"
      description="Amazing work! You've completed all the drills in this category. Ready for a new challenge?"
      action={{ label: 'Try another language', href: '/' }}
    />
  );
}

export default EmptyState;
