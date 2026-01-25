/**
 * Storage Adapter
 *
 * Provides an abstraction layer over browser storage mechanisms.
 * This allows for:
 * - SSR compatibility (no direct window access)
 * - Easy testing with mock implementations
 * - Future migration to other storage backends (IndexedDB, etc.)
 *
 * Architecture Pattern: Adapter Pattern
 */

export interface IStorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): boolean;
  removeItem(key: string): boolean;
  clear(): boolean;
  isAvailable(): boolean;
}

/**
 * Browser LocalStorage Adapter
 * Safe wrapper for localStorage with SSR compatibility
 */
export class LocalStorageAdapter implements IStorageAdapter {
  private isBrowserEnvironment(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  isAvailable(): boolean {
    return this.isBrowserEnvironment();
  }

  getItem(key: string): string | null {
    if (!this.isBrowserEnvironment()) return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`StorageAdapter: Error reading key "${key}"`, error);
      return null;
    }
  }

  setItem(key: string, value: string): boolean {
    if (!this.isBrowserEnvironment()) return false;
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`StorageAdapter: Error writing key "${key}"`, error);
      return false;
    }
  }

  removeItem(key: string): boolean {
    if (!this.isBrowserEnvironment()) return false;
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`StorageAdapter: Error removing key "${key}"`, error);
      return false;
    }
  }

  clear(): boolean {
    if (!this.isBrowserEnvironment()) return false;
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('StorageAdapter: Error clearing storage', error);
      return false;
    }
  }
}

/**
 * In-Memory Storage Adapter
 * Useful for SSR, testing, and fallback scenarios
 */
export class MemoryStorageAdapter implements IStorageAdapter {
  private store: Map<string, string> = new Map();

  isAvailable(): boolean {
    return true;
  }

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string): boolean {
    this.store.set(key, value);
    return true;
  }

  removeItem(key: string): boolean {
    this.store.delete(key);
    return true;
  }

  clear(): boolean {
    this.store.clear();
    return true;
  }
}

/**
 * Factory function to get the appropriate storage adapter
 */
export function createStorageAdapter(): IStorageAdapter {
  const localStorageAdapter = new LocalStorageAdapter();
  if (localStorageAdapter.isAvailable()) {
    return localStorageAdapter;
  }
  return new MemoryStorageAdapter();
}

// Default singleton instance
let defaultAdapter: IStorageAdapter | null = null;

export function getStorageAdapter(): IStorageAdapter {
  if (!defaultAdapter) {
    defaultAdapter = createStorageAdapter();
  }
  return defaultAdapter;
}

/**
 * Set a custom adapter (useful for testing)
 */
export function setStorageAdapter(adapter: IStorageAdapter): void {
  defaultAdapter = adapter;
}
