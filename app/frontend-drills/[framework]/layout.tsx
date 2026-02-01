import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  FRAMEWORK_CONFIG,
  FRAMEWORK_IDS,
  type FrameworkId,
  isValidFramework,
} from '@/lib/frontend-drills';
import { FrameworkSwitcher } from './FrameworkSwitcher';

// Shared icon props for nav SVGs
const iconClass = 'w-4 h-4';
const s = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// Mode definitions for navigation
const MODES: { slug: string; label: string; icon: ReactNode }[] = [
  {
    slug: 'drill',
    label: 'Drill',
    // Terminal/code prompt icon
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
        <rect x="2" y="3" width="20" height="18" rx="2" {...s} />
        <path d="M7 8l4 4-4 4" {...s} />
        <path d="M13 16h4" {...s} />
      </svg>
    ),
  },
  {
    slug: 'quiz',
    label: 'Quiz',
    // Lightning bolt icon
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" {...s} />
      </svg>
    ),
  },
  {
    slug: 'ui-patterns',
    label: 'UI Patterns',
    // Grid layout icon (4 squares)
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" {...s} />
        <rect x="14" y="3" width="7" height="7" rx="1" {...s} />
        <rect x="3" y="14" width="7" height="7" rx="1" {...s} />
        <rect x="14" y="14" width="7" height="7" rx="1" {...s} />
      </svg>
    ),
  },
  {
    slug: 'cheatsheet',
    label: 'Cheatsheet',
    // Document/list icon
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" {...s} />
        <path d="M14 2v6h6" {...s} />
        <path d="M8 13h8" {...s} />
        <path d="M8 17h8" {...s} />
      </svg>
    ),
  },
];

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ framework: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ framework: string }>;
}): Promise<Metadata> {
  const { framework } = await params;

  if (!isValidFramework(framework)) {
    return {
      title: 'Framework Not Found - Coding Drills',
    };
  }

  const config = FRAMEWORK_CONFIG[framework];
  return {
    title: `${config.name} Frontend Drills - Practice ${config.name} Patterns`,
    description: `Master ${config.name} with interactive coding drills, quizzes, UI patterns, and cheatsheets. Practice building real components and test your knowledge.`,
  };
}

export function generateStaticParams() {
  return FRAMEWORK_IDS.map((framework) => ({
    framework,
  }));
}

// Server component for mode navigation
function ModeNav({
  framework,
  config,
}: {
  framework: string;
  config: (typeof FRAMEWORK_CONFIG)[FrameworkId];
}) {
  return (
    <nav className={`border-b ${config.borderColor} bg-zinc-900/30`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
          {MODES.map((mode) => (
            <Link
              key={mode.slug}
              href={`/frontend-drills/${framework}/${mode.slug}`}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg
                text-sm font-medium whitespace-nowrap
                transition-all duration-200 cursor-pointer
                text-zinc-400 hover:text-white hover:bg-zinc-800
              `}
            >
              <span>{mode.icon}</span>
              <span>{mode.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default async function FrameworkLayout({ children, params }: LayoutProps) {
  const { framework } = await params;

  if (!isValidFramework(framework)) {
    notFound();
  }

  const config = FRAMEWORK_CONFIG[framework];

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header with framework indicator */}
      <header
        className={`border-b ${config.borderColor} bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-50`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and breadcrumbs */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-zinc-400 hover:text-white transition-colors font-medium cursor-pointer"
              >
                Coding Drills
              </Link>
              <span className="text-zinc-600">/</span>
              <Link
                href="/frontend-drills"
                className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Frontend
              </Link>
              <span className="text-zinc-600">/</span>
              <Link
                href={`/frontend-drills/${framework}`}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold ${config.bgColor} ${config.color} ${config.borderColor} border`}
                >
                  {config.icon}
                </span>
                <span className={`font-semibold ${config.color}`}>{config.name}</span>
              </Link>
            </div>

            {/* Framework switcher dropdown */}
            <div className="flex items-center gap-3">
              <FrameworkSwitcher framework={framework as FrameworkId} />
            </div>
          </div>
        </div>
      </header>

      {/* Mode Navigation */}
      <ModeNav framework={framework} config={config} />

      {/* Main content */}
      <main>{children}</main>
    </div>
  );
}
