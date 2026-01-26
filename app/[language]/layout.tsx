import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  isValidLanguage,
  LANGUAGE_CONFIG,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from './config';
import { LanguageIcon } from './LanguageIcon';
import { SettingsMenu } from './SettingsMenu';

// Mode definitions for navigation
const MODES = [
  { slug: 'drill', label: 'Drill', icon: '🎯' },
  { slug: 'quiz', label: 'Quiz', icon: '🧠' },
  { slug: 'problems', label: 'Problems', icon: '📝' },
  { slug: 'exercises', label: 'Algorithm Exercises', icon: '🔄' },
  { slug: 'reference', label: 'Reference', icon: '📚' },
  { slug: 'cheatsheet', label: 'Cheatsheet', icon: '📋' },
  { slug: 'interview', label: 'AI Mock Interview', icon: '🎙️' },
] as const;

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
  return (
    <nav className={`border-b ${config.borderColor} bg-zinc-900/30`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
          {MODES.map((mode) => (
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
              </div>

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
