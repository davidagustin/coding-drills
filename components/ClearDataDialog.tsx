'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

// All storage keys used by the app
const STORAGE_CATEGORIES = [
  {
    id: 'progress',
    label: 'General Progress',
    description: 'Drill and quiz progress data',
    keys: ['coding-drills-progress'],
  },
  {
    id: 'leaderboard',
    label: 'Quiz Leaderboard',
    description: 'High scores and quiz history',
    keys: ['coding-drills-leaderboard'],
  },
  {
    id: 'exercises',
    label: 'Exercise Progress',
    description: 'Progress on coding exercises for all languages',
    keys: [
      'coding-drills-exercises-javascript',
      'coding-drills-exercises-typescript',
      'coding-drills-exercises-python',
      'coding-drills-exercises-java',
      'coding-drills-exercises-cpp',
      'coding-drills-exercises-csharp',
      'coding-drills-exercises-go',
      'coding-drills-exercises-ruby',
      'coding-drills-exercises-c',
      'coding-drills-exercises-php',
      'coding-drills-exercises-kotlin',
      // New languages
      'coding-drills-exercises-rust',
      'coding-drills-exercises-swift',
      'coding-drills-exercises-scala',
      'coding-drills-exercises-r',
      'coding-drills-exercises-perl',
      'coding-drills-exercises-lua',
      'coding-drills-exercises-haskell',
      'coding-drills-exercises-elixir',
      'coding-drills-exercises-dart',
      'coding-drills-exercises-clojure',
    ],
  },
  {
    id: 'stats',
    label: 'Language Stats',
    description: 'Statistics and performance data per language',
    keys: [
      'coding-drills-stats-javascript',
      'coding-drills-stats-typescript',
      'coding-drills-stats-python',
      'coding-drills-stats-java',
      'coding-drills-stats-cpp',
      'coding-drills-stats-csharp',
      'coding-drills-stats-go',
      'coding-drills-stats-ruby',
      'coding-drills-stats-c',
      'coding-drills-stats-php',
      'coding-drills-stats-kotlin',
      // New languages
      'coding-drills-stats-rust',
      'coding-drills-stats-swift',
      'coding-drills-stats-scala',
      'coding-drills-stats-r',
      'coding-drills-stats-perl',
      'coding-drills-stats-lua',
      'coding-drills-stats-haskell',
      'coding-drills-stats-elixir',
      'coding-drills-stats-dart',
      'coding-drills-stats-clojure',
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'App preferences and configuration',
    keys: ['coding-drills-settings'],
  },
  {
    id: 'theme',
    label: 'Theme Preference',
    description: 'Dark/light mode preference',
    keys: ['coding-drills-theme'],
  },
  {
    id: 'logs',
    label: 'Debug Logs',
    description: 'Application logs and error reports',
    keys: [
      'coding-drills-logs',
      'coding-drills-metrics',
      'coding-drills-alerts',
      'coding-drills-error-log',
    ],
  },
] as const;

type StorageCategoryId = (typeof STORAGE_CATEGORIES)[number]['id'];

interface ClearDataDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ClearDataDialog({ isOpen, onClose }: ClearDataDialogProps) {
  const [selectedCategories, setSelectedCategories] = useState<Set<StorageCategoryId>>(new Set());
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Calculate storage sizes using useMemo (only recalculates when isOpen changes)
  const storageSizes = useMemo(() => {
    if (!isOpen || typeof window === 'undefined') return {};

    const sizes: Record<string, number> = {};
    for (const category of STORAGE_CATEGORIES) {
      let totalSize = 0;
      for (const key of category.keys) {
        const value = localStorage.getItem(key);
        if (value) {
          totalSize += value.length * 2; // Approximate bytes (UTF-16)
        }
      }
      sizes[category.id] = totalSize;
    }
    return sizes;
  }, [isOpen]);

  // Wrap onClose to reset state
  const handleClose = useCallback(() => {
    setSelectedCategories(new Set());
    setConfirmText('');
    setIsDeleting(false);
    onClose();
  }, [onClose]);

  const toggleCategory = useCallback((id: StorageCategoryId) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedCategories(new Set(STORAGE_CATEGORIES.map((c) => c.id)));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedCategories(new Set());
  }, []);

  const handleDelete = useCallback(() => {
    if (confirmText.toLowerCase() !== 'delete' || selectedCategories.size === 0) {
      return;
    }

    setIsDeleting(true);

    // Delete all selected storage keys
    for (const category of STORAGE_CATEGORIES) {
      if (selectedCategories.has(category.id)) {
        for (const key of category.keys) {
          try {
            localStorage.removeItem(key);
          } catch (error) {
            console.error(`Failed to remove ${key}:`, error);
          }
        }
      }
    }

    // Close dialog after a brief delay to show success
    setTimeout(() => {
      setIsDeleting(false);
      handleClose();
      // Reload the page to reset app state
      window.location.reload();
    }, 500);
  }, [confirmText, selectedCategories, handleClose]);

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return 'Empty';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const totalSelectedSize = STORAGE_CATEGORIES.filter((c) => selectedCategories.has(c.id)).reduce(
    (sum, c) => sum + (storageSizes[c.id] || 0),
    0,
  );

  const hasData = Object.values(storageSizes).some((size) => size > 0);
  const canDelete = confirmText.toLowerCase() === 'delete' && selectedCategories.size > 0;

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

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
              <div className="text-4xl mb-3">🗑️</div>
              <p className="text-zinc-400">No saved data found.</p>
              <p className="text-zinc-500 text-sm mt-1">
                Start practicing to create progress data!
              </p>
            </div>
          ) : (
            <>
              <p className="text-zinc-400 text-sm mb-4">
                Select the data you want to delete. This action cannot be undone.
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
                {selectedCategories.size > 0 && (
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
                {STORAGE_CATEGORIES.map((category) => {
                  const size = storageSizes[category.id] || 0;
                  const isEmpty = size === 0;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => !isEmpty && toggleCategory(category.id)}
                      disabled={isEmpty}
                      className={`w-full p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                        isEmpty
                          ? 'border-zinc-800 bg-zinc-900/50 opacity-50 cursor-not-allowed'
                          : selectedCategories.has(category.id)
                            ? 'border-red-500/50 bg-red-500/10'
                            : 'border-zinc-800 bg-zinc-800/50 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Checkbox */}
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                              isEmpty
                                ? 'border-zinc-700'
                                : selectedCategories.has(category.id)
                                  ? 'bg-red-500 border-red-500'
                                  : 'border-zinc-600'
                            }`}
                          >
                            {selectedCategories.has(category.id) && (
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
                          <div>
                            <div className="text-sm font-medium text-zinc-100">
                              {category.label}
                            </div>
                            <div className="text-xs text-zinc-500">{category.description}</div>
                          </div>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            isEmpty ? 'bg-zinc-800 text-zinc-600' : 'bg-zinc-700 text-zinc-300'
                          }`}
                        >
                          {formatSize(size)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected summary */}
              {selectedCategories.size > 0 && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-red-400">
                      {selectedCategories.size} item{selectedCategories.size !== 1 ? 's' : ''}{' '}
                      selected
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
            {selectedCategories.size > 0 ? (
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
