'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

const MODES = [
  {
    slug: '',
    label: 'Quiz',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
        />
      </svg>
    ),
  },
  {
    slug: 'study',
    label: 'Study',
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
        />
      </svg>
    ),
  },
];

export default function PatternQuizLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <nav className="border-b border-purple-500/20 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 py-2">
            {MODES.map((mode) => {
              const href = mode.slug === '' ? '/pattern-quiz' : `/pattern-quiz/${mode.slug}`;
              const isActive =
                mode.slug === ''
                  ? pathname === '/pattern-quiz'
                  : pathname.startsWith(`/pattern-quiz/${mode.slug}`);
              return (
                <Link
                  key={mode.slug || 'quiz'}
                  href={href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg
                    text-sm font-medium whitespace-nowrap
                    transition-all duration-200 cursor-pointer
                    ${
                      isActive
                        ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                    }
                  `}
                >
                  <span>{mode.icon}</span>
                  <span>{mode.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}
