import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getTrainingLabel,
  isDatabaseLanguage,
  isValidLanguage,
  LANGUAGE_CONFIG,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from './config';
import { LanguageIcon } from './LanguageIcon';
import { SettingsMenu } from './SettingsMenu';

// Mode definitions for navigation
// Note: 'problems' label is dynamic (set in getModes) based on language type
const BASE_MODES = [
  { slug: 'drill', label: 'Drill', icon: '🎯' },
  { slug: 'quiz', label: 'Quiz', icon: '🧠' },
  { slug: 'problems', label: 'Method Training', icon: '💪' },
  { slug: 'exercises', label: 'Building Blocks', icon: '🧱' },
  { slug: 'reference', label: 'Reference', icon: '📚' },
  { slug: 'cheatsheet', label: 'Cheatsheet', icon: '📋' },
  { slug: 'interview', label: 'AI Mock Interview', icon: '🎙️' },
] as const;

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
              href={`/${language}/${mode.slug}`}
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
              {/* Language indicator badge */}
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor} ${config.borderColor} border`}
              >
                <LanguageIcon language={language as SupportedLanguage} className="w-4 h-4" />
                <span className={`text-sm font-medium ${config.color}`}>{config.name}</span>
                <span className={`text-xs ${config.color} opacity-70`}>{config.version}</span>
              </div>

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
