import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  getTrainingLabel,
  isDatabaseLanguage,
  isValidLanguage,
  LANGUAGE_CONFIG,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from './config';
import { LanguageIcon } from './LanguageIcon';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SettingsMenu } from './SettingsMenu';

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
// Note: 'problems' label is dynamic (set in getModes) based on language type
const BASE_MODES: { slug: string; label: string; icon: ReactNode }[] = [
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
    slug: 'problems',
    label: 'Method Training',
    // Code brackets icon
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
        <path d="M8 3H5a2 2 0 00-2 2v14a2 2 0 002 2h3" {...s} />
        <path d="M16 3h3a2 2 0 012 2v14a2 2 0 01-2 2h-3" {...s} />
        <path d="M14 8l-4 8" {...s} />
      </svg>
    ),
  },
  {
    slug: 'exercises',
    label: 'Building Blocks',
    // Stacked layers icon
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
        <path d="M12 2l10 5-10 5L2 7l10-5z" {...s} />
        <path d="M2 12l10 5 10-5" {...s} />
        <path d="M2 17l10 5 10-5" {...s} />
      </svg>
    ),
  },
  {
    slug: '__regex__',
    label: 'Regex',
    // Magnifying glass with pattern marks icon
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
        <circle cx="11" cy="11" r="7" {...s} />
        <path d="M21 21l-4.35-4.35" {...s} />
        <path d="M8 9h6" {...s} />
        <path d="M8 13h4" {...s} />
      </svg>
    ),
  },
  {
    slug: 'reference',
    label: 'Reference',
    // Book icon
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" {...s} />
        <path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z" {...s} />
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
  {
    slug: 'interview',
    label: 'AI Mock Interview',
    // Chat bubble icon
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
        <path
          d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
          {...s}
        />
      </svg>
    ),
  },
];

function getModes(language: string) {
  const trainingLabel = getTrainingLabel(language);
  const isDb = isDatabaseLanguage(language);
  return BASE_MODES.filter((mode) => !(isDb && mode.slug === 'interview')).map((mode) =>
    mode.slug === 'problems' ? { ...mode, label: trainingLabel } : mode,
  );
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ language: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ language: string }>;
}): Promise<Metadata> {
  const { language } = await params;

  if (!isValidLanguage(language)) {
    return {
      title: 'Language Not Found - Coding Drills',
    };
  }

  const config = LANGUAGE_CONFIG[language];
  return {
    title: `${config.name} Coding Drills - Practice ${config.name} Methods`,
    description: `Master ${config.name} with interactive coding drills, quizzes, and method references. Practice typing code, test your knowledge, and build muscle memory.`,
  };
}

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((language) => ({
    language,
  }));
}

// Client component for mode navigation (needs usePathname)
function ModeNav({
  language,
  config,
}: {
  language: string;
  config: (typeof LANGUAGE_CONFIG)[SupportedLanguage];
}) {
  const modes = getModes(language);
  return (
    <nav className={`border-b ${config.borderColor} bg-zinc-900/30`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
          {modes.map((mode) => (
            <Link
              key={mode.slug}
              href={
                mode.slug === '__regex__' ? `/regex?from=${language}` : `/${language}/${mode.slug}`
              }
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

export default async function LanguageLayout({ children, params }: LayoutProps) {
  const { language } = await params;

  if (!isValidLanguage(language)) {
    notFound();
  }

  const config = LANGUAGE_CONFIG[language];

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header with language indicator */}
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
                href={`/${language}`}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <LanguageIcon language={language as SupportedLanguage} className="w-5 h-5" />
                <span className={`font-semibold ${config.color}`}>{config.name}</span>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              {/* Language switcher dropdown */}
              <LanguageSwitcher language={language as SupportedLanguage} />

              {/* Documentation Link */}
              <a
                href={config.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs px-2.5 py-1 rounded-full ${config.bgColor} ${config.color} ${config.borderColor} border hover:opacity-80 transition-opacity inline-flex items-center gap-1`}
                title="Official Documentation"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Docs
              </a>

              {/* Settings Menu */}
              <SettingsMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Mode Navigation */}
      <ModeNav language={language} config={config} />

      {/* Main content */}
      <main>{children}</main>
    </div>
  );
}
