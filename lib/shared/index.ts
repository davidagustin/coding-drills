/**
 * Shared utility functions used across the lib modules
 * Consolidates common logic to avoid duplication
 */

// ============================================================================
// Environment Detection
// ============================================================================

/**
 * Check if code is running in browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Check if localStorage is available
 */
export function hasLocalStorage(): boolean {
  if (!isBrowser()) return false;
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

// ============================================================================
// Array Utilities
// ============================================================================

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param array - Array to shuffle
 * @param randomFn - Optional custom random function (useful for seeded randomness)
 * @returns A new shuffled array
 */
export function shuffleArray<T>(
  array: T[],
  randomFn: () => number = Math.random
): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(randomFn() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Gets a random element from an array
 * @param array - Array to pick from
 * @param randomFn - Optional custom random function
 * @returns A random element or undefined if array is empty
 */
export function getRandomElement<T>(
  array: T[],
  randomFn: () => number = Math.random
): T | undefined {
  if (array.length === 0) return undefined;
  return array[Math.floor(randomFn() * array.length)];
}

/**
 * Gets n random elements from an array (without duplicates)
 * @param array - Array to pick from
 * @param count - Number of elements to pick
 * @param randomFn - Optional custom random function
 * @returns Array of random elements
 */
export function getRandomElements<T>(
  array: T[],
  count: number,
  randomFn: () => number = Math.random
): T[] {
  const shuffled = shuffleArray(array, randomFn);
  return shuffled.slice(0, Math.min(count, array.length));
}

// ============================================================================
// Value Formatting
// ============================================================================

interface FormatOptions {
  prettyPrint?: boolean;
  maxDepth?: number;
}

/**
 * Format a value for display
 * @param value - Any value to format
 * @param options - Formatting options
 * @returns Formatted string representation
 */
export function formatValue(value: unknown, options: FormatOptions = {}): string {
  const { prettyPrint = false, maxDepth = 10 } = options;

  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  if (typeof value === 'string') return '"' + value + '"';
  if (typeof value === 'function') return '[Function]';
  if (typeof value === 'symbol') return value.toString();
  if (typeof value === 'bigint') return value.toString() + 'n';
  
  if (Array.isArray(value)) {
    if (maxDepth <= 0) return '[...]';
    const items = value.map(function(v) {
      return formatValue(v, { prettyPrint, maxDepth: maxDepth - 1 });
    });
    return '[' + items.join(', ') + ']';
  }
  
  if (typeof value === 'object') {
    try {
      return prettyPrint 
        ? JSON.stringify(value, null, 2)
        : JSON.stringify(value);
    } catch {
      return '[Object]';
    }
  }
  
  return String(value);
}

// ============================================================================
// ID Generation
// ============================================================================

/**
 * Generate a unique ID
 * @param prefix - Optional prefix for the ID
 * @param timestamp - Optional timestamp (defaults to Date.now())
 * @param randomFn - Optional random function for testability
 * @returns A unique ID string
 */
export function generateId(
  prefix: string = '',
  timestamp: number = Date.now(),
  randomFn: () => number = Math.random
): string {
  const randomPart = randomFn().toString(36).substring(2, 11);
  return prefix ? prefix + '-' + timestamp + '-' + randomPart : timestamp + '-' + randomPart;
}

/**
 * Get current ISO date string
 * @param date - Optional date (defaults to now)
 * @returns ISO date string
 */
export function getCurrentISODate(date: Date = new Date()): string {
  return date.toISOString();
}

// ============================================================================
// Seeded Random Number Generator
// ============================================================================

/**
 * Seeded random number generator for reproducible random sequences
 * Uses a Linear Congruential Generator (LCG) with standard parameters:
 * - Multiplier (a): 1103515245
 * - Increment (c): 12345
 * - Modulus (m): 2^31 (via bit masking with 0x7fffffff)
 * These are the same parameters used by glibc's rand() function.
 */
export class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  /**
   * Get next random number between 0 and 1
   */
  next(): number {
    // LCG parameters from glibc
    this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff;
    return this.seed / 0x7fffffff;
  }

  /**
   * Get random integer in range [min, max] inclusive
   */
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /**
   * Get random float in range [min, max)
   */
  nextFloat(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  /**
   * Shuffle an array using this seeded random
   */
  shuffle<T>(array: T[]): T[] {
    return shuffleArray(array, () => this.next());
  }

  /**
   * Pick a random element from an array
   */
  pick<T>(array: T[]): T | undefined {
    return getRandomElement(array, () => this.next());
  }
}

// ============================================================================
// Type Guards and Validation
// ============================================================================

/**
 * Check if a value is a non-null object
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Check if a value is a non-empty string
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Check if a value is a positive number
 */
export function isPositiveNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value) && value > 0;
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(function(item) { return deepClone(item); }) as unknown as T;
  }
  
  const cloned: Record<string, unknown> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone((obj as Record<string, unknown>)[key]);
    }
  }
  return cloned as T;
}

// ============================================================================
// String Utilities
// ============================================================================

/**
 * Escape special regex characters in a string
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Normalize a string for comparison
 */
export function normalizeString(
  str: string,
  options: { trim?: boolean; lowercase?: boolean; removeSpaces?: boolean } = {}
): string {
  let result = str;
  if (options.trim !== false) result = result.trim();
  if (options.lowercase) result = result.toLowerCase();
  if (options.removeSpaces) result = result.replace(/\s+/g, '');
  return result;
}
