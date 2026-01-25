'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
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
  const theme = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);

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
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#09090b' : '#ffffff');
    }
  }, [theme]);

  // Set theme function
  const setTheme = useCallback(
    (newTheme: Theme) => {
      store.setTheme(newTheme);
    },
    [store],
  );

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
    [theme, toggleTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
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
// Exports
// ============================================================================

// NOTE: ThemeToggle component is in a separate file (ThemeToggle.tsx)
// to avoid code duplication and maintain single responsibility

export default ThemeProvider;
