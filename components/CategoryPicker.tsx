'use client';

import { useCallback } from 'react';

interface Category {
  id: string;
  label: string;
  icon?: string;
  count?: number;
}

interface CategoryPickerProps {
  categories: Category[];
  selected: string[];
  onChange: (selected: string[]) => void;
  showCounts?: boolean;
}

export function CategoryPicker({
  categories,
  selected,
  onChange,
  showCounts = false,
}: CategoryPickerProps) {
  // Simple boolean comparisons don't need useMemo - the overhead outweighs the benefit
  const allSelected = selected.length === categories.length;
  const noneSelected = selected.length === 0;

  const handleToggleAll = useCallback(() => {
    if (allSelected) {
      onChange([]);
    } else {
      onChange(categories.map((c) => c.id));
    }
  }, [allSelected, categories, onChange]);

  const handleToggleCategory = useCallback(
    (categoryId: string) => {
      if (selected.includes(categoryId)) {
        onChange(selected.filter((id) => id !== categoryId));
      } else {
        onChange([...selected, categoryId]);
      }
    },
    [selected, onChange],
  );

  return (
    <div className="space-y-3">
      {/* Header with All toggle */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Categories
          {!noneSelected && (
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
              ({selected.length} selected)
            </span>
          )}
        </span>

        <button
          type="button"
          onClick={handleToggleAll}
          className={`
            px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200
            ${
              allSelected
                ? 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }
          `}
        >
          {allSelected ? 'Clear All' : 'Select All'}
        </button>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selected.includes(category.id);

          return (
            <button
              type="button"
              key={category.id}
              onClick={() => handleToggleCategory(category.id)}
              className={`
                inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium
                rounded-full border-2 transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                dark:focus:ring-offset-gray-900
                ${
                  isSelected
                    ? 'bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 dark:bg-blue-600 dark:border-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:text-blue-400'
                }
              `}
              aria-pressed={isSelected}
            >
              {/* Icon */}
              {category.icon && (
                <span className="text-base" role="img" aria-hidden="true">
                  {category.icon}
                </span>
              )}

              {/* Label */}
              <span>{category.label}</span>

              {/* Count badge */}
              {showCounts && category.count !== undefined && (
                <span
                  className={`
                    ml-1 px-1.5 py-0.5 text-xs font-semibold rounded-full
                    ${
                      isSelected
                        ? 'bg-blue-400/30 text-blue-100'
                        : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    }
                  `}
                >
                  {category.count}
                </span>
              )}

              {/* Selection indicator */}
              {isSelected && (
                <svg
                  className="w-3.5 h-3.5 ml-0.5"
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
            </button>
          );
        })}
      </div>

      {/* Empty state */}
      {categories.length === 0 && (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          No categories available
        </div>
      )}
    </div>
  );
}

export default CategoryPicker;
