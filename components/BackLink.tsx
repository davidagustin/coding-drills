'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BackLinkProps {
  href?: string;
  label?: string;
  onClick?: () => void;
  useRouterBack?: boolean;
  className?: string;
}

export function BackLink({
  href,
  label = 'Back',
  onClick,
  useRouterBack = false,
  className = '',
}: BackLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    } else if (useRouterBack) {
      e.preventDefault();
      router.back();
    }
  };

  const linkContent = (
    <>
      {/* Chevron Icon */}
      <svg
        className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>

      {/* Label */}
      <span className="text-sm font-medium">{label}</span>
    </>
  );

  const baseClasses = `
    inline-flex items-center gap-1.5
    text-text-secondary hover:text-text-primary
    transition-all duration-200
    py-1.5 px-2 -ml-2 rounded-lg
    hover:bg-bg-elevated/50
    focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60
    group
    ${className}
  `;

  // If href is provided and we're not using router.back(), render as Link
  if (href && !useRouterBack && !onClick) {
    return (
      <Link href={href} className={baseClasses}>
        {linkContent}
      </Link>
    );
  }

  // Otherwise, render as button
  return (
    <button type="button" onClick={handleClick} className={baseClasses}>
      {linkContent}
    </button>
  );
}
