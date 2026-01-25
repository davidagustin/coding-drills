'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

// ============================================================================
// Types
// ============================================================================

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  isLight: boolean;
}

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEY = 'coding-drills-theme';
const DEFAULT_THEME: Theme = 'dark';

// ============================================================================
// Storage Helpers (external system)
// ============================================================================

function getStoredTheme(storageKey: string, defaultTheme: Theme): Theme {
  if (typeof window === 'undefined') return defaultTheme;

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // localStorage might not be available
  }

  return defaultTheme;
}

function setStoredTheme(storageKey: string, theme: Theme): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    // localStorage might not be available
  }
}

// ============================================================================
// Theme Store (for useSyncExternalStore)
// ============================================================================

type ThemeListener = () => void;

function createThemeStore(storageKey: string, defaultTheme: Theme) {
  let currentTheme = defaultTheme;
  const listeners = new Set<ThemeListener>();

  return {
    getSnapshot: () => currentTheme,
    getServerSnapshot: () => defaultTheme,
    subscribe: (listener: ThemeListener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    setTheme: (theme: Theme) => {
      currentTheme = theme;
      setStoredTheme(storageKey, theme);
      listeners.forEach((listener) => listener());
    },
    initialize: () => {
      currentTheme = getStoredTheme(storageKey, defaultTheme);
      listeners.forEach((listener) => listener());
    },
  };
}

// ============================================================================
// Context
// ============================================================================

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ============================================================================
// Provider Component
// ============================================================================

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
  // Create store once per provider instance
  const [store] = useState(() => createThemeStore(storageKey, defaultTheme));

  // Use sync external store for SSR-safe theme reading
  const theme = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );

  // Initialize from localStorage on mount
  useEffect(() => {
    store.initialize();
  }, [store]);

  // Apply theme to document when it changes
  useEffect(() => {
    const root = document.documentElement;

    // Remove both classes first
    root.classList.remove('light', 'dark');

    // Add the current theme class
    root.classList.add(theme);

    // Also set color-scheme for native elements
    root.style.colorScheme = theme;

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === 'dark' ? '#09090b' : '#ffffff'
      );
    }
  }, [theme]);

  // Set theme function
  const setTheme = useCallback((newTheme: Theme) => {
    store.setTheme(newTheme);
  }, [store]);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    store.setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, store]);

  // Memoized context value
  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme,
      setTheme,
      isDark: theme === 'dark',
      isLight: theme === 'light',
    }),
    [theme, toggleTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ============================================================================
// Hook
// ============================================================================

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

// ============================================================================
// Theme Toggle Button Component
// ============================================================================

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
  const { toggleTheme, isDark } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]}
        inline-flex items-center justify-center
        rounded-lg
        bg-zinc-800 hover:bg-zinc-700
        dark:bg-zinc-800 dark:hover:bg-zinc-700
        light:bg-zinc-200 light:hover:bg-zinc-300
        text-zinc-300 hover:text-white
        dark:text-zinc-300 dark:hover:text-white
        light:text-zinc-600 light:hover:text-zinc-900
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        focus:ring-zinc-500 focus:ring-offset-zinc-900
        ${className}
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        // Sun icon for dark mode (clicking will switch to light)
        <svg
          className={iconSizes[size]}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        // Moon icon for light mode (clicking will switch to dark)
        <svg
          className={iconSizes[size]}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}

// ============================================================================
// Exports
// ============================================================================

export default ThemeProvider;
