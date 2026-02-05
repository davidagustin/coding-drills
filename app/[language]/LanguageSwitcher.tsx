'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FRAMEWORK_CONFIG, FRAMEWORK_IDS, type FrameworkId } from '@/lib/frontend-drills';
import { LANGUAGE_CONFIG, type SupportedLanguage } from './config';
import { LanguageIcon } from './LanguageIcon';

const PROGRAMMING_LANGUAGES: SupportedLanguage[] = [
  'javascript',
  'typescript',
  'python',
  'java',
  'cpp',
  'csharp',
  'go',
  'ruby',
  'c',
  'php',
  'kotlin',
  'rust',
  'swift',
  'scala',
  'r',
  'perl',
  'lua',
  'haskell',
  'elixir',
  'dart',
  'clojure',
];

const DATABASE_LANGUAGES: SupportedLanguage[] = ['postgresql', 'mysql', 'mongodb', 'redis'];

export function LanguageSwitcher({ language }: { language: SupportedLanguage }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const config = LANGUAGE_CONFIG[language];

  // Close on outside click or Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelectLanguage = useCallback(
    (target: SupportedLanguage) => {
      if (target === language) {
        setIsOpen(false);
        return;
      }
      // Replace current language segment in the path
      const newPath = pathname.replace(`/${language}`, `/${target}`);
      setIsOpen(false);
      router.push(newPath);
    },
    [language, pathname, router],
  );

  const handleSelectFramework = useCallback(
    (fw: FrameworkId) => {
      setIsOpen(false);
      router.push(`/frontend-drills/${fw}`);
    },
    [router],
  );

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor} ${config.borderColor} border cursor-pointer hover:opacity-80 transition-opacity`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Switch language"
      >
        <LanguageIcon language={language} className="w-4 h-4" />
        <span className={`text-sm font-medium ${config.color}`}>{config.name}</span>
        <span className={`text-xs ${config.color} opacity-70`}>{config.version}</span>
        {/* Chevron */}
        <svg
          className={`w-3 h-3 ${config.color} opacity-70 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          role="listbox"
          aria-label="Select language or framework"
          className="absolute right-0 mt-2 w-72 max-h-96 overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg z-50"
        >
          <div className="py-1">
            {/* Frontend Frameworks Section */}
            <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Frontend Frameworks
            </div>
            {FRAMEWORK_IDS.map((fwId) => {
              const fwConfig = FRAMEWORK_CONFIG[fwId];
              return (
                <button
                  key={fwId}
                  type="button"
                  role="option"
                  aria-selected={false}
                  onClick={() => handleSelectFramework(fwId)}
                  className="w-full px-3 py-2 text-left text-sm flex items-center gap-3 transition-colors cursor-pointer text-zinc-300 hover:bg-zinc-800 hover:text-white"
                >
                  <span
                    className={`flex items-center justify-center w-6 h-6 rounded text-xs font-bold ${fwConfig.bgColor} ${fwConfig.color}`}
                  >
                    {fwConfig.icon}
                  </span>
                  <span className="flex-1 font-medium">{fwConfig.name}</span>
                  <span className="text-xs opacity-60">{fwConfig.version}</span>
                </button>
              );
            })}

            {/* Divider */}
            <div className="border-t border-zinc-800 my-1" />

            {/* Programming Languages Section */}
            <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Languages
            </div>
            {PROGRAMMING_LANGUAGES.map((lang) => {
              const langConfig = LANGUAGE_CONFIG[lang];
              const isActive = lang === language;
              return (
                <button
                  key={lang}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelectLanguage(lang)}
                  className={`w-full px-3 py-2 text-left text-sm flex items-center gap-3 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <LanguageIcon language={lang} className="w-4 h-4" />
                  <span className="flex-1 font-medium">{langConfig.name}</span>
                  <span className="text-xs opacity-60">{langConfig.version}</span>
                  {isActive && (
                    <svg
                      className="w-4 h-4 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              );
            })}

            {/* Divider */}
            <div className="border-t border-zinc-800 my-1" />

            {/* Database Languages Section */}
            <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Databases
            </div>
            {DATABASE_LANGUAGES.map((lang) => {
              const langConfig = LANGUAGE_CONFIG[lang];
              const isActive = lang === language;
              return (
                <button
                  key={lang}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelectLanguage(lang)}
                  className={`w-full px-3 py-2 text-left text-sm flex items-center gap-3 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <LanguageIcon language={lang} className="w-4 h-4" />
                  <span className="flex-1 font-medium">{langConfig.name}</span>
                  <span className="text-xs opacity-60">{langConfig.version}</span>
                  {isActive && (
                    <svg
                      className="w-4 h-4 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
