'use client';

import { useState, useMemo, useCallback, memo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  LANGUAGE_CONFIG,
  isValidLanguage,
  type SupportedLanguage,
} from '../config';
import { getMethodsForLanguage, getCategoriesForLanguage } from '@/lib/methods';
import type { Method } from '@/lib/types';

type SortOption = 'alphabetical' | 'category' | 'default';

// Category color mapping - pre-computed for performance
const CATEGORY_COLORS: Record<string, string> = {
  'Array Methods': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'String Methods': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Object Methods': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Math Operations': 'bg-red-500/20 text-red-400 border-red-500/30',
  'JSON Methods': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Promise Methods': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  'Set Methods': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  'Map Methods': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'List Methods': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Dict Methods': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Built-in Functions': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

const DEFAULT_CATEGORY_COLOR = 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';

// Memoized category color lookup to avoid repeated object access
function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || DEFAULT_CATEGORY_COLOR;
}

// Pre-compute the background-only color for category headers
const CATEGORY_BG_COLORS: Record<string, string> = {};
for (const [category, color] of Object.entries(CATEGORY_COLORS)) {
  CATEGORY_BG_COLORS[category] = color.split(' ')[0];
}

function getCategoryBgColor(category: string): string {
  return CATEGORY_BG_COLORS[category] || 'bg-zinc-500/20';
}

// Method Card Component - Memoized to prevent unnecessary re-renders
const MethodCard = memo(function MethodCard({
  method,
  isExpanded,
  onToggle,
  languageConfig,
}: {
  method: Method;
  isExpanded: boolean;
  onToggle: () => void;
  languageConfig: typeof LANGUAGE_CONFIG[SupportedLanguage];
}) {
  // Memoize the category color to avoid recalculation
  const categoryColor = useMemo(() => getCategoryColor(method.category), [method.category]);

  return (
    <div
      id={`method-${method.name.replace(/\./g, '-')}`}
      className={`border rounded-lg transition-all duration-200 ${
        isExpanded
          ? `border-${languageConfig.color.replace('text-', '')}/50 bg-zinc-800/50`
          : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-800/30'
      }`}
    >
      {/* Card Header - Always Visible */}
      <button
        onClick={onToggle}
        className="w-full text-left p-4 flex items-start justify-between gap-4"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <code className={`text-lg font-mono font-semibold ${languageConfig.color}`}>
              {method.name}
            </code>
            <span
              className={`text-xs px-2 py-0.5 rounded-full border ${categoryColor}`}
            >
              {method.category}
            </span>
          </div>
          <p className="text-zinc-400 text-sm mt-1 line-clamp-1">
            {method.description}
          </p>
        </div>
        <div className="flex-shrink-0 mt-1">
          <svg
            className={`w-5 h-5 text-zinc-500 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-zinc-800">
          {/* Syntax */}
          <div className="mt-4">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Syntax
            </h4>
            <pre className="bg-zinc-950 rounded-lg p-3 overflow-x-auto">
              <code className="text-sm font-mono text-emerald-400">
                {method.syntax}
              </code>
            </pre>
          </div>

          {/* Description */}
          <div className="mt-4">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Description
            </h4>
            <p className="text-zinc-300 text-sm leading-relaxed">
              {method.description}
            </p>
          </div>

          {/* Arguments Table */}
          {method.arguments && method.arguments.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Arguments
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-zinc-500 border-b border-zinc-800">
                      <th className="pb-2 pr-4 font-medium">Name</th>
                      <th className="pb-2 pr-4 font-medium">Type</th>
                      <th className="pb-2 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {method.arguments.map((arg, idx) => (
                      <tr key={idx} className="border-b border-zinc-800/50 last:border-0">
                        <td className="py-2 pr-4">
                          <code className="text-cyan-400 font-mono">
                            {arg.name}
                            {arg.optional && (
                              <span className="text-zinc-500 text-xs ml-1">?</span>
                            )}
                          </code>
                        </td>
                        <td className="py-2 pr-4">
                          <code className="text-purple-400 font-mono text-xs">
                            {arg.type}
                          </code>
                        </td>
                        <td className="py-2 text-zinc-400">
                          {arg.description}
                          {arg.defaultValue && (
                            <span className="text-zinc-500 ml-1">
                              (default: <code className="text-orange-400">{arg.defaultValue}</code>)
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Return Value */}
          <div className="mt-4">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Returns
            </h4>
            <div className="flex items-start gap-3 bg-zinc-950/50 rounded-lg p-3">
              <code className="text-purple-400 font-mono text-sm flex-shrink-0">
                {method.returns.type}
              </code>
              <span className="text-zinc-400 text-sm">
                {method.returns.description}
              </span>
            </div>
          </div>

          {/* Examples */}
          {method.examples && method.examples.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Examples
              </h4>
              <div className="space-y-3">
                {method.examples.map((example, idx) => (
                  <div key={idx} className="bg-zinc-950 rounded-lg overflow-hidden">
                    <div className="p-3 border-b border-zinc-800">
                      <pre className="overflow-x-auto">
                        <code className="text-sm font-mono text-zinc-100">
                          {example.code}
                        </code>
                      </pre>
                    </div>
                    <div className="p-3 bg-zinc-950/50 flex items-center gap-2">
                      <span className="text-zinc-500 text-xs">Output:</span>
                      <code className="text-sm font-mono text-emerald-400">
                        {example.output}
                      </code>
                    </div>
                    {example.explanation && (
                      <div className="px-3 pb-3 text-xs text-zinc-500 italic">
                        {example.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Complexity */}
          {(method.timeComplexity || method.spaceComplexity) && (
            <div className="mt-4 flex gap-4">
              {method.timeComplexity && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500">Time:</span>
                  <code className="text-xs font-mono text-amber-400">
                    {method.timeComplexity}
                  </code>
                </div>
              )}
              {method.spaceComplexity && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500">Space:</span>
                  <code className="text-xs font-mono text-amber-400">
                    {method.spaceComplexity}
                  </code>
                </div>
              )}
            </div>
          )}

          {/* Related Methods */}
          {method.relatedMethods && method.relatedMethods.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Related Methods
              </h4>
              <div className="flex flex-wrap gap-2">
                {method.relatedMethods.map((related, idx) => (
                  <code
                    key={idx}
                    className="text-xs font-mono px-2 py-1 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 cursor-pointer transition-colors"
                  >
                    {related}
                  </code>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {method.notes && method.notes.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Notes
              </h4>
              <ul className="space-y-1">
                {method.notes.map((note, idx) => (
                  <li key={idx} className="text-sm text-zinc-400 flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">*</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Try in Drill Mode Button */}
          <div className="mt-6 pt-4 border-t border-zinc-800">
            <Link
              href={`?method=${encodeURIComponent(method.name)}`}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${languageConfig.bgColor} ${languageConfig.color} ${languageConfig.hoverBg} transition-colors font-medium text-sm`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Try in Drill Mode
            </Link>
          </div>
        </div>
      )}
    </div>
  );
});

// Quick Navigation Component - Memoized to prevent unnecessary re-renders
const QuickNav = memo(function QuickNav({
  categories,
  methods,
  languageConfig,
}: {
  categories: string[];
  methods: Method[];
  languageConfig: typeof LANGUAGE_CONFIG[SupportedLanguage];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const alphabet = useMemo(() => {
    const letters = new Set(methods.map((m) => m.name[0].toUpperCase()));
    return Array.from(letters).sort();
  }, [methods]);

  const scrollToCategory = useCallback((category: string) => {
    const element = document.getElementById(`category-${category.replace(/\s+/g, '-')}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  }, []);

  const scrollToLetter = useCallback((letter: string) => {
    const method = methods.find((m) => m.name[0].toUpperCase() === letter);
    if (method) {
      const element = document.getElementById(`method-${method.name.replace(/\./g, '-')}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsOpen(false);
  }, [methods]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed right-8 top-32 w-48 max-h-[calc(100vh-160px)] overflow-y-auto">
        <nav className="space-y-4">
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Categories
            </h3>
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => scrollToCategory(category)}
                    className="text-sm text-zinc-400 hover:text-white transition-colors text-left w-full truncate"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Alphabet
            </h3>
            <div className="flex flex-wrap gap-1">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => scrollToLetter(letter)}
                  className="w-6 h-6 text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </aside>

      {/* Mobile Floating Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${languageConfig.bgColor} ${languageConfig.color} border ${languageConfig.borderColor}`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 w-64 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl max-h-80 overflow-y-auto">
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Categories
                </h3>
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => scrollToCategory(category)}
                        className="text-sm text-zinc-400 hover:text-white transition-colors text-left w-full"
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Alphabet
                </h3>
                <div className="flex flex-wrap gap-1">
                  {alphabet.map((letter) => (
                    <button
                      key={letter}
                      onClick={() => scrollToLetter(letter)}
                      className="w-7 h-7 text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
});

// Print Styles Component
function PrintStyles() {
  return (
    <style jsx global>{`
      @media print {
        body {
          background: white !important;
          color: black !important;
        }
        .no-print {
          display: none !important;
        }
        .print-break {
          page-break-before: always;
        }
        pre, code {
          background: #f3f4f6 !important;
          color: #1f2937 !important;
          border: 1px solid #e5e7eb !important;
        }
      }
    `}</style>
  );
}

// Main Reference Page Component
export default function ReferencePage() {
  const params = useParams();
  const language = params.language as string;
  const isValid = isValidLanguage(language);

  // State - must be called before any conditional returns
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [expandedMethods, setExpandedMethods] = useState<Set<string>>(new Set());

  // Get data - memoized to prevent unnecessary recalculations
  const languageConfig = isValid ? LANGUAGE_CONFIG[language] : null;
  const methods = useMemo(() => isValid ? getMethodsForLanguage(language) : [], [isValid, language]);
  const categories = useMemo(() => isValid ? getCategoriesForLanguage(language) : [], [isValid, language]);

  // Filter and sort methods - hooks must be called unconditionally
  const filteredMethods = useMemo(() => {
    if (!isValid) return [];
    let result = [...methods];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query) ||
          m.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((m) => m.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'alphabetical':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'category':
        result.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order (grouped by category)
        break;
    }

    return result;
  }, [isValid, methods, searchQuery, selectedCategory, sortBy]);

  // Group methods by category for display
  const methodsByCategory = useMemo(() => {
    if (!isValid) return {};
    if (sortBy === 'alphabetical') {
      return { 'All Methods': filteredMethods };
    }
    return filteredMethods.reduce((acc, method) => {
      if (!acc[method.category]) {
        acc[method.category] = [];
      }
      acc[method.category].push(method);
      return acc;
    }, {} as Record<string, Method[]>);
  }, [isValid, filteredMethods, sortBy]);

  // Toggle method expansion
  const toggleMethod = useCallback((methodName: string) => {
    setExpandedMethods((prev) => {
      const next = new Set(prev);
      if (next.has(methodName)) {
        next.delete(methodName);
      } else {
        next.add(methodName);
      }
      return next;
    });
  }, []);

  // Validate language - early return AFTER all hooks
  if (!isValid || !languageConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-400">Language not found</p>
      </div>
    );
  }

  // Expand all / Collapse all
  const expandAll = () => {
    setExpandedMethods(new Set(filteredMethods.map((m) => m.name)));
  };

  const collapseAll = () => {
    setExpandedMethods(new Set());
  };

  // Handle print
  const handlePrint = () => {
    expandAll();
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <>
      <PrintStyles />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:pr-56">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
            <Link href={`/${language}`} className="hover:text-white transition-colors">
              {languageConfig.name}
            </Link>
            <span>/</span>
            <span className="text-zinc-300">Methods Reference</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {languageConfig.name} Methods Reference
          </h1>
          <p className="text-zinc-400">
            Comprehensive reference for {methods.length} {languageConfig.name} methods across{' '}
            {categories.length} categories.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="sticky top-20 z-30 bg-zinc-950/95 backdrop-blur-sm py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-6 no-print">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search methods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 cursor-pointer"
            >
              <option value="default">Sort: Default</option>
              <option value="alphabetical">Sort: A-Z</option>
              <option value="category">Sort: Category</option>
            </select>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-zinc-500">
              Showing {filteredMethods.length} of {methods.length} methods
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={expandAll}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Expand All
              </button>
              <span className="text-zinc-700">|</span>
              <button
                onClick={collapseAll}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Collapse All
              </button>
              <span className="text-zinc-700">|</span>
              <button
                onClick={handlePrint}
                className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Methods List */}
        <div className="space-y-8">
          {Object.entries(methodsByCategory).map(([category, categoryMethods]) => (
            <section key={category} id={`category-${category.replace(/\s+/g, '-')}`}>
              {sortBy !== 'alphabetical' && (
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3 print-break">
                  <span
                    className={`w-3 h-3 rounded-full ${getCategoryBgColor(category)}`}
                  />
                  {category}
                  <span className="text-sm font-normal text-zinc-500">
                    ({categoryMethods.length})
                  </span>
                </h2>
              )}
              <div className="space-y-3">
                {categoryMethods.map((method) => (
                  <MethodCard
                    key={method.name}
                    method={method}
                    isExpanded={expandedMethods.has(method.name)}
                    onToggle={() => toggleMethod(method.name)}
                    languageConfig={languageConfig}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* No Results */}
        {filteredMethods.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-zinc-700 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-zinc-300 mb-2">No methods found</h3>
            <p className="text-zinc-500">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className={`mt-4 px-4 py-2 rounded-lg ${languageConfig.bgColor} ${languageConfig.color} ${languageConfig.hoverBg} transition-colors`}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Quick Navigation */}
        <QuickNav
          categories={categories}
          methods={methods}
          languageConfig={languageConfig}
        />
      </div>
    </>
  );
}
