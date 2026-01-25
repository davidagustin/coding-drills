'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

interface Language {
  name: string;
  subtitle?: string;
  slug: string;
  icon: string | null;
  emoji: string | null;
  bgGradient: string;
  borderColor: string;
  hoverGlow: string;
  iconBg: string;
  iconText: string;
}

interface LanguageGridProps {
  languages: Language[];
}

type ViewMode = 'grid' | 'list';

export function LanguageGrid({ languages }: LanguageGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const filteredLanguages = useMemo(() => {
    if (!searchQuery.trim()) return languages;

    const query = searchQuery.toLowerCase().trim();
    return languages.filter(
      (lang) =>
        lang.name.toLowerCase().includes(query) ||
        lang.slug.toLowerCase().includes(query) ||
        lang.subtitle?.toLowerCase().includes(query),
    );
  }, [languages, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Search and View Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search languages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/50 border border-zinc-700/50 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
              aria-label="Clear search"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* View Toggle & Count */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {filteredLanguages.length} language{filteredLanguages.length !== 1 ? 's' : ''}
          </span>

          <div className="flex items-center bg-zinc-900/50 border border-zinc-700/50 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-zinc-700 text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'list' ? 'bg-zinc-700 text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* No Results */}
      {filteredLanguages.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-gray-400">No languages found matching &quot;{searchQuery}&quot;</p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="mt-3 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && filteredLanguages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filteredLanguages.map((lang) => (
            <Link
              key={lang.slug}
              href={`/${lang.slug}`}
              className={`
                group relative overflow-hidden rounded-2xl border ${lang.borderColor}
                bg-gradient-to-br ${lang.bgGradient} backdrop-blur-sm
                p-6 md:p-8 card-hover ${lang.hoverGlow}
              `}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex flex-col items-center text-center space-y-3">
                {/* Icon */}
                <div
                  className={`
                  w-14 h-14 md:w-16 md:h-16 rounded-xl ${lang.iconBg}
                  flex items-center justify-center
                  transform group-hover:scale-110 transition-transform duration-300
                `}
                >
                  {lang.emoji ? (
                    <span className="text-3xl md:text-4xl">{lang.emoji}</span>
                  ) : (
                    <span className={`text-lg md:text-xl ${lang.iconText}`}>{lang.icon}</span>
                  )}
                </div>

                {/* Language Name */}
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-100 group-hover:text-white transition-colors">
                    {lang.name}
                  </h3>
                  {lang.subtitle && <p className="text-xs text-gray-400 mt-1">{lang.subtitle}</p>}
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && filteredLanguages.length > 0 && (
        <div className="space-y-2">
          {filteredLanguages.map((lang) => (
            <Link
              key={lang.slug}
              href={`/${lang.slug}`}
              className={`
                group flex items-center gap-4 rounded-xl border ${lang.borderColor}
                bg-gradient-to-r ${lang.bgGradient} backdrop-blur-sm
                p-4 card-hover ${lang.hoverGlow}
              `}
            >
              {/* Icon */}
              <div
                className={`
                w-10 h-10 rounded-lg ${lang.iconBg}
                flex items-center justify-center flex-shrink-0
                transform group-hover:scale-110 transition-transform duration-300
              `}
              >
                {lang.emoji ? (
                  <span className="text-xl">{lang.emoji}</span>
                ) : (
                  <span className={`text-sm ${lang.iconText}`}>{lang.icon}</span>
                )}
              </div>

              {/* Language Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-100 group-hover:text-white transition-colors">
                  {lang.name}
                </h3>
                {lang.subtitle && <p className="text-xs text-gray-400 truncate">{lang.subtitle}</p>}
              </div>

              {/* Arrow */}
              <svg
                className="w-5 h-5 text-gray-500 group-hover:text-gray-300 transform group-hover:translate-x-1 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageGrid;
