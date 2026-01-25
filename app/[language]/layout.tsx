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
                className="text-zinc-400 hover:text-white transition-colors font-medium"
              >
                Coding Drills
              </Link>
              <span className="text-zinc-600">/</span>
              <div className="flex items-center gap-2">
                <LanguageIcon language={language as SupportedLanguage} className="w-5 h-5" />
                <span className={`font-semibold ${config.color}`}>{config.name}</span>
              </div>
            </div>

            {/* Language indicator badge */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor} ${config.borderColor} border`}
            >
              <LanguageIcon language={language as SupportedLanguage} className="w-4 h-4" />
              <span className={`text-sm font-medium ${config.color}`}>{config.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>{children}</main>
    </div>
  );
}
