'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

// Display names for languages
const LANGUAGE_LABELS: Record<string, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  java: 'Java',
  go: 'Go',
  rust: 'Rust',
  ruby: 'Ruby',
  php: 'PHP',
  swift: 'Swift',
  kotlin: 'Kotlin',
  csharp: 'C#',
  cpp: 'C++',
  c: 'C',
  scala: 'Scala',
  haskell: 'Haskell',
  elixir: 'Elixir',
  clojure: 'Clojure',
  r: 'R',
  dart: 'Dart',
  perl: 'Perl',
  lua: 'Lua',
  mongodb: 'MongoDB',
  mysql: 'MySQL',
  postgresql: 'PostgreSQL',
};

// Category definitions keyed by their localStorage prefix pattern
interface CategoryDef {
  id: string;
  label: string;
  description: string;
  // 'prefix' means we match keys starting with this + language suffix
  // 'exact' means we match the key literally
  mode: 'prefix' | 'exact';
  keyPattern: string; // e.g. "coding-drills-problems-" for prefix, "coding-drills-progress" for exact
}

const CATEGORY_DEFS: CategoryDef[] = [
  {
    id: 'problems',
    label: 'Training Progress',
    description: 'Problem-solving progress per language (drills, streaks)',
    mode: 'prefix',
    keyPattern: 'coding-drills-problems-',
  },
  {
    id: 'exercises',
    label: 'Building Blocks Progress',
    description: 'Exercise completion progress per language',
    mode: 'prefix',
    keyPattern: 'coding-drills-exercises-',
  },
  {
    id: 'stats',
    label: 'Language Statistics',
    description: 'Performance stats and metrics per language',
    mode: 'prefix',
    keyPattern: 'coding-drills-stats-',
  },
  {
    id: 'progress',
    label: 'General Progress',
    description: 'Global drill and quiz progress across all languages',
    mode: 'exact',
    keyPattern: 'coding-drills-progress',
  },
  {
    id: 'leaderboard',
    label: 'Quiz Leaderboard',
    description: 'High scores and quiz history',
    mode: 'exact',
    keyPattern: 'coding-drills-leaderboard',
  },
  {
    id: 'settings',
    label: 'Settings & Preferences',
    description: 'App preferences, theme, and configuration',
    mode: 'exact',
    keyPattern: 'coding-drills-settings',
  },
  {
    id: 'theme',
    label: 'Theme',
    description: 'Dark/light mode preference',
    mode: 'exact',
    keyPattern: 'coding-drills-theme',
  },
];

// Represents a single localStorage entry detected
interface StorageEntry {
  key: string;
  size: number; // bytes (approximated as UTF-16)
  categoryId: string;
  language?: string; // for per-language entries
}

// Groups entries by category
interface CategoryGroup {
  def: CategoryDef;
  entries: StorageEntry[];
  totalSize: number;
}

// Uncategorized catch-all for keys not matching any known pattern
interface UncategorizedGroup {
  entries: StorageEntry[];
  totalSize: number;
}

/**
 * Scans localStorage for all coding-drills-* keys and classifies them.
 */
function scanStorage(): { categories: CategoryGroup[]; uncategorized: UncategorizedGroup } {
  const categories: CategoryGroup[] = CATEGORY_DEFS.map((def) => ({
    def,
    entries: [],
    totalSize: 0,
  }));
  const uncategorized: UncategorizedGroup = { entries: [], totalSize: 0 };

  if (typeof window === 'undefined') return { categories, uncategorized };

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith('coding-drills-')) continue;

    const value = localStorage.getItem(key);
    const size = value ? value.length * 2 : 0; // approximate bytes (UTF-16)

    let matched = false;
    for (const group of categories) {
      if (group.def.mode === 'exact' && key === group.def.keyPattern) {
        group.entries.push({ key, size, categoryId: group.def.id });
        group.totalSize += size;
        matched = true;
        break;
      }
      if (group.def.mode === 'prefix' && key.startsWith(group.def.keyPattern)) {
        const language = key.slice(group.def.keyPattern.length);
        group.entries.push({ key, size, categoryId: group.def.id, language });
        group.totalSize += size;
        matched = true;
        break;
      }
    }

    if (!matched) {
      uncategorized.entries.push({ key, size, categoryId: '_uncategorized' });
      uncategorized.totalSize += size;
    }
  }

  return { categories, uncategorized };
}

function formatSize(bytes: number): string {
  if (bytes === 0) return 'Empty';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getLanguageLabel(lang: string): string {
  return LANGUAGE_LABELS[lang] || lang.charAt(0).toUpperCase() + lang.slice(1);
}

// ─── Component ───────────────────────────────────────────────

interface ClearDataDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ClearDataDialog({ isOpen, onClose }: ClearDataDialogProps) {
  // Selected keys to delete
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  // Track which categories are expanded to show per-language breakdown
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Scan storage on open
  const { categories, uncategorized } = useMemo(() => {
    if (!isOpen) return { categories: [], uncategorized: { entries: [], totalSize: 0 } };
    return scanStorage();
  }, [isOpen]);

  // Only show categories that have data
  const nonEmptyCategories = useMemo(
    () => categories.filter((g) => g.entries.length > 0),
    [categories],
  );
  const hasUncategorized = uncategorized.entries.length > 0;
  const hasData = nonEmptyCategories.length > 0 || hasUncategorized;

  const handleClose = useCallback(() => {
    setSelectedKeys(new Set());
    setConfirmText('');
    setIsDeleting(false);
    setExpandedCategories(new Set());
    onClose();
  }, [onClose]);

  // Toggle a single key
  const toggleKey = useCallback((key: string) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  // Toggle all keys in a category
  const toggleCategory = useCallback((group: CategoryGroup | UncategorizedGroup) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      const allSelected = group.entries.every((e) => prev.has(e.key));
      if (allSelected) {
        for (const e of group.entries) next.delete(e.key);
      } else {
        for (const e of group.entries) next.add(e.key);
      }
      return next;
    });
  }, []);

  // Expand/collapse category to show per-language detail
  const toggleExpand = useCallback((categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  }, []);

  // Select all / clear all
  const selectAll = useCallback(() => {
    const allKeys = new Set<string>();
    for (const g of nonEmptyCategories) {
      for (const e of g.entries) allKeys.add(e.key);
    }
    for (const e of uncategorized.entries) allKeys.add(e.key);
    setSelectedKeys(allKeys);
  }, [nonEmptyCategories, uncategorized]);

  const clearSelection = useCallback(() => {
    setSelectedKeys(new Set());
  }, []);

  // Delete
  const handleDelete = useCallback(() => {
    if (confirmText.toLowerCase() !== 'delete' || selectedKeys.size === 0) return;

    setIsDeleting(true);
    for (const key of selectedKeys) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Failed to remove ${key}:`, error);
      }
    }

    setTimeout(() => {
      setIsDeleting(false);
      handleClose();
      window.location.reload();
    }, 500);
  }, [confirmText, selectedKeys, handleClose]);

  const totalSelectedSize = useMemo(() => {
    let total = 0;
    for (const g of categories) {
      for (const e of g.entries) {
        if (selectedKeys.has(e.key)) total += e.size;
      }
    }
    for (const e of uncategorized.entries) {
      if (selectedKeys.has(e.key)) total += e.size;
    }
    return total;
  }, [selectedKeys, categories, uncategorized]);

  const canDelete = confirmText.toLowerCase() === 'delete' && selectedKeys.size > 0;

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const renderCategoryRow = (group: CategoryGroup) => {
    const allSelected = group.entries.every((e) => selectedKeys.has(e.key));
    const someSelected = group.entries.some((e) => selectedKeys.has(e.key));
    const isExpanded = expandedCategories.has(group.def.id);
    const isPerLanguage = group.def.mode === 'prefix';

    return (
      <div key={group.def.id} className="rounded-lg border border-zinc-800 overflow-hidden">
        {/* Category header row */}
        <div
          className={`flex items-center gap-3 p-3 transition-colors ${
            allSelected
              ? 'bg-red-500/10 border-red-500/30'
              : someSelected
                ? 'bg-amber-500/5'
                : 'bg-zinc-800/50'
          }`}
        >
          {/* Checkbox */}
          <button
            type="button"
            onClick={() => toggleCategory(group)}
            className="flex-shrink-0 cursor-pointer"
            aria-label={`Select all ${group.def.label}`}
          >
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                allSelected
                  ? 'bg-red-500 border-red-500'
                  : someSelected
                    ? 'bg-amber-500/50 border-amber-500'
                    : 'border-zinc-600'
              }`}
            >
              {allSelected && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              {someSelected && !allSelected && <div className="w-2 h-0.5 bg-white rounded" />}
            </div>
          </button>

          {/* Label + description */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-zinc-100">{group.def.label}</div>
            <div className="text-xs text-zinc-500">{group.def.description}</div>
          </div>

          {/* Size badge */}
          <span className="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-300 flex-shrink-0">
            {formatSize(group.totalSize)}
          </span>

          {/* Expand button for per-language categories */}
          {isPerLanguage && group.entries.length > 1 && (
            <button
              type="button"
              onClick={() => toggleExpand(group.def.id)}
              className="p-1 text-zinc-500 hover:text-zinc-300 rounded transition-colors cursor-pointer"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              <svg
                className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Per-language breakdown (expanded) */}
        {isPerLanguage && isExpanded && (
          <div className="border-t border-zinc-800/50">
            {group.entries
              .sort((a, b) => b.size - a.size) // Sort by size descending
              .map((entry) => {
                const isSelected = selectedKeys.has(entry.key);
                return (
                  <button
                    key={entry.key}
                    type="button"
                    onClick={() => toggleKey(entry.key)}
                    className={`w-full flex items-center gap-3 px-3 py-2 pl-10 text-left transition-colors cursor-pointer ${
                      isSelected ? 'bg-red-500/10' : 'hover:bg-zinc-800/80'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-red-500 border-red-500' : 'border-zinc-600'
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-zinc-300 flex-1">
                      {getLanguageLabel(entry.language || '')}
                    </span>
                    <span className="text-xs text-zinc-500">{formatSize(entry.size)}</span>
                  </button>
                );
              })}
          </div>
        )}

        {/* Single language — show inline label */}
        {isPerLanguage && group.entries.length === 1 && (
          <div className="border-t border-zinc-800/50 px-3 py-1.5 pl-10">
            <span className="text-xs text-zinc-500">
              {getLanguageLabel(group.entries[0].language || '')}
            </span>
          </div>
        )}
      </div>
    );
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="clear-data-title"
        className="relative w-full max-w-lg bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h2 id="clear-data-title" className="text-lg font-semibold text-zinc-100">
            Clear Saved Data
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <svg
              className="w-5 h-5"
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
        </div>

        {/* Content */}
        <div className="px-6 py-4 max-h-[calc(100vh-300px)] overflow-y-auto">
          {!hasData ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-3 text-zinc-500">
                <svg
                  viewBox="0 0 24 24"
                  className="w-10 h-10"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" />
                  <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </div>
              <p className="text-zinc-400">No saved data found.</p>
              <p className="text-zinc-500 text-sm mt-1">
                Start practicing to create progress data!
              </p>
            </div>
          ) : (
            <>
              <p className="text-zinc-400 text-sm mb-4">
                Select the data you want to delete. Expand categories to manage per-language data.
                This action cannot be undone.
              </p>

              {/* Quick actions */}
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={selectAll}
                  className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors cursor-pointer"
                >
                  Select All
                </button>
                {selectedKeys.size > 0 && (
                  <button
                    type="button"
                    onClick={clearSelection}
                    className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors cursor-pointer"
                  >
                    Clear Selection
                  </button>
                )}
              </div>

              {/* Category list */}
              <div className="space-y-2">
                {nonEmptyCategories.map(renderCategoryRow)}

                {/* Uncategorized catch-all */}
                {hasUncategorized && (
                  <div className="rounded-lg border border-zinc-800 overflow-hidden">
                    <div
                      className={`flex items-center gap-3 p-3 transition-colors ${
                        uncategorized.entries.every((e) => selectedKeys.has(e.key))
                          ? 'bg-red-500/10'
                          : 'bg-zinc-800/50'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleCategory(uncategorized)}
                        className="flex-shrink-0 cursor-pointer"
                        aria-label="Select all other data"
                      >
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            uncategorized.entries.every((e) => selectedKeys.has(e.key))
                              ? 'bg-red-500 border-red-500'
                              : uncategorized.entries.some((e) => selectedKeys.has(e.key))
                                ? 'bg-amber-500/50 border-amber-500'
                                : 'border-zinc-600'
                          }`}
                        >
                          {uncategorized.entries.every((e) => selectedKeys.has(e.key)) && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </button>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-zinc-100">Other Data</div>
                        <div className="text-xs text-zinc-500">
                          {uncategorized.entries.length} miscellaneous item
                          {uncategorized.entries.length !== 1 ? 's' : ''} (logs, metrics, etc.)
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-300">
                        {formatSize(uncategorized.totalSize)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Selected summary */}
              {selectedKeys.size > 0 && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-red-400">
                      {selectedKeys.size} item{selectedKeys.size !== 1 ? 's' : ''} selected
                    </span>
                    <span className="text-red-400 font-medium">
                      {formatSize(totalSelectedSize)}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {hasData && (
          <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/50">
            {selectedKeys.size > 0 ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="confirm-delete" className="block text-sm text-zinc-400 mb-2">
                    Type <span className="font-mono text-red-400">delete</span> to confirm
                  </label>
                  <input
                    id="confirm-delete"
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="Type 'delete' to confirm"
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={!canDelete || isDeleting}
                    className={`flex-1 py-2.5 px-4 font-medium rounded-lg transition-colors cursor-pointer ${
                      canDelete && !isDeleting
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete Selected'}
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (typeof window === 'undefined') return null;
  return createPortal(modalContent, document.body);
}

export default ClearDataDialog;
