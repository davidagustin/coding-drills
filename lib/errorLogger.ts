/**
 * Centralized Error Logging Service
 *
 * Provides consistent error logging, user-friendly message formatting,
 * and optional integration with error reporting services.
 */

// ============================================================================
// Error Types
// ============================================================================

export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';
export type ErrorCategory =
  | 'storage'
  | 'network'
  | 'validation'
  | 'execution'
  | 'rendering'
  | 'navigation'
  | 'unknown';

export interface LoggedError {
  id: string;
  timestamp: string;
  message: string;
  userMessage: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  stack?: string;
  context?: Record<string, unknown>;
  componentStack?: string;
}

export interface ErrorLoggerConfig {
  enableConsole: boolean;
  enablePersistence: boolean;
  maxStoredErrors: number;
  onError?: (error: LoggedError) => void;
}

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEY = 'coding-drills-error-log';
const MAX_STORED_ERRORS = 50;
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// User-friendly error messages
const USER_FRIENDLY_MESSAGES: Record<string, string> = {
  // Storage errors
  'QuotaExceededError': 'Storage is full. Please clear some browser data or export your progress.',
  'NS_ERROR_DOM_QUOTA_REACHED': 'Storage is full. Please clear some browser data.',

  // Network errors
  'NetworkError': 'Unable to connect. Please check your internet connection.',
  'Failed to fetch': 'Unable to connect to the server. Please check your internet connection.',
  'Load failed': 'Failed to load resources. Please refresh the page.',

  // Code execution errors
  'Maximum call stack size exceeded': 'Your code has infinite recursion. Check your recursive functions.',
  'Unexpected token': 'Syntax error in your code. Check for missing brackets or typos.',
  'is not defined': 'Variable or function not found. Check for typos or missing declarations.',
  'is not a function': 'Attempted to call something that is not a function.',

  // Generic errors
  'ChunkLoadError': 'Failed to load the page. Please refresh your browser.',
  'Script error': 'An error occurred loading the application. Please refresh the page.',
};

// ============================================================================
// Default Configuration
// ============================================================================

let config: ErrorLoggerConfig = {
  enableConsole: true,
  enablePersistence: IS_DEVELOPMENT,
  maxStoredErrors: MAX_STORED_ERRORS,
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Generate a unique error ID
 */
function generateErrorId(): string {
  return `err-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Check if running in browser environment
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

/**
 * Get user-friendly message for an error
 */
export function getUserFriendlyMessage(error: Error | string): string {
  const errorMessage = typeof error === 'string' ? error : error.message;

  // Check for known error patterns
  for (const [pattern, friendlyMessage] of Object.entries(USER_FRIENDLY_MESSAGES)) {
    if (errorMessage.includes(pattern)) {
      return friendlyMessage;
    }
  }

  // Default message based on common patterns
  if (errorMessage.toLowerCase().includes('network') ||
      errorMessage.toLowerCase().includes('fetch')) {
    return 'A network error occurred. Please check your connection and try again.';
  }

  if (errorMessage.toLowerCase().includes('timeout')) {
    return 'The operation took too long. Please try again.';
  }

  if (errorMessage.toLowerCase().includes('permission')) {
    return 'Permission denied. Please check your browser settings.';
  }

  // In development, show the actual error; in production, show a generic message
  if (IS_DEVELOPMENT) {
    return errorMessage;
  }

  return 'Something went wrong. Please try again or refresh the page.';
}

/**
 * Determine error category from error object
 */
function categorizeError(error: Error | string, context?: Record<string, unknown>): ErrorCategory {
  const message = typeof error === 'string' ? error : error.message;
  const errorName = typeof error === 'string' ? '' : error.name;

  // Check context for hints
  if (context?.category) {
    return context.category as ErrorCategory;
  }

  // Storage-related errors
  if (
    errorName === 'QuotaExceededError' ||
    message.includes('localStorage') ||
    message.includes('storage')
  ) {
    return 'storage';
  }

  // Network-related errors
  if (
    errorName === 'TypeError' && message.includes('fetch') ||
    message.includes('network') ||
    message.includes('NetworkError')
  ) {
    return 'network';
  }

  // Code execution errors
  if (
    errorName === 'SyntaxError' ||
    errorName === 'ReferenceError' ||
    errorName === 'TypeError' ||
    message.includes('execution')
  ) {
    return 'execution';
  }

  // Validation errors
  if (message.includes('validation') || message.includes('invalid')) {
    return 'validation';
  }

  // Rendering errors
  if (
    message.includes('render') ||
    message.includes('component') ||
    message.includes('React')
  ) {
    return 'rendering';
  }

  // Navigation errors
  if (message.includes('navigation') || message.includes('route')) {
    return 'navigation';
  }

  return 'unknown';
}

/**
 * Determine error severity
 */
function determineSeverity(error: Error | string, category: ErrorCategory): ErrorSeverity {
  const message = typeof error === 'string' ? error : error.message;

  // Critical: App-breaking errors
  if (
    category === 'rendering' ||
    message.includes('ChunkLoadError') ||
    message.includes('Script error')
  ) {
    return 'critical';
  }

  // High: Important functionality affected
  if (
    category === 'storage' ||
    category === 'network'
  ) {
    return 'high';
  }

  // Medium: Feature-level errors
  if (category === 'execution' || category === 'validation') {
    return 'medium';
  }

  // Low: Minor issues
  return 'low';
}

// ============================================================================
// Storage Functions
// ============================================================================

/**
 * Get stored errors from localStorage
 */
function getStoredErrors(): LoggedError[] {
  if (!isBrowser() || !config.enablePersistence) return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Store errors to localStorage
 */
function storeErrors(errors: LoggedError[]): void {
  if (!isBrowser() || !config.enablePersistence) return;

  try {
    // Keep only the most recent errors
    const trimmed = errors.slice(-config.maxStoredErrors);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Storage might be full; silently fail
  }
}

/**
 * Add an error to storage
 */
function persistError(error: LoggedError): void {
  const errors = getStoredErrors();
  errors.push(error);
  storeErrors(errors);
}

// ============================================================================
// Core Logging Functions
// ============================================================================

/**
 * Configure the error logger
 */
export function configureErrorLogger(newConfig: Partial<ErrorLoggerConfig>): void {
  config = { ...config, ...newConfig };
}

/**
 * Log an error with full details
 */
export function logError(
  error: Error | string,
  context?: Record<string, unknown>
): LoggedError {
  const errorObj = typeof error === 'string' ? new Error(error) : error;
  const category = categorizeError(errorObj, context);
  const severity = determineSeverity(errorObj, category);

  const loggedError: LoggedError = {
    id: generateErrorId(),
    timestamp: new Date().toISOString(),
    message: errorObj.message,
    userMessage: getUserFriendlyMessage(errorObj),
    category,
    severity,
    stack: errorObj.stack,
    context,
  };

  // Console logging
  if (config.enableConsole) {
    const consoleMethod = severity === 'critical' || severity === 'high'
      ? console.error
      : console.warn;

    consoleMethod(
      `[${severity.toUpperCase()}] ${category}: ${errorObj.message}`,
      context ? { context } : ''
    );

    if (IS_DEVELOPMENT && errorObj.stack) {
      console.debug('Stack trace:', errorObj.stack);
    }
  }

  // Persist error
  if (config.enablePersistence) {
    persistError(loggedError);
  }

  // Call external handler if configured
  if (config.onError) {
    try {
      config.onError(loggedError);
    } catch {
      // Prevent error handler from causing infinite loops
    }
  }

  return loggedError;
}

/**
 * Log a warning (non-error condition that might need attention)
 */
export function logWarning(
  message: string,
  context?: Record<string, unknown>
): void {
  if (config.enableConsole) {
    console.warn(`[WARNING] ${message}`, context ? { context } : '');
  }
}

/**
 * Log component error (for error boundaries)
 */
export function logComponentError(
  error: Error,
  componentStack?: string,
  context?: Record<string, unknown>
): LoggedError {
  return logError(error, {
    ...context,
    category: 'rendering',
    componentStack,
  });
}

/**
 * Log async operation error with recovery suggestion
 */
export function logAsyncError(
  error: Error | string,
  operation: string,
  context?: Record<string, unknown>
): LoggedError {
  return logError(error, {
    ...context,
    operation,
    recoverable: true,
  });
}

// ============================================================================
// Error History and Debugging
// ============================================================================

/**
 * Get all stored errors for debugging
 */
export function getErrorHistory(): LoggedError[] {
  return getStoredErrors();
}

/**
 * Clear all stored errors
 */
export function clearErrorHistory(): void {
  if (!isBrowser()) return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently fail
  }
}

/**
 * Get error statistics
 */
export function getErrorStats(): {
  total: number;
  byCategory: Record<ErrorCategory, number>;
  bySeverity: Record<ErrorSeverity, number>;
  recentCount: number;
} {
  const errors = getStoredErrors();
  const oneHourAgo = Date.now() - 60 * 60 * 1000;

  const byCategory: Record<ErrorCategory, number> = {
    storage: 0,
    network: 0,
    validation: 0,
    execution: 0,
    rendering: 0,
    navigation: 0,
    unknown: 0,
  };

  const bySeverity: Record<ErrorSeverity, number> = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  };

  let recentCount = 0;

  for (const error of errors) {
    byCategory[error.category]++;
    bySeverity[error.severity]++;

    if (new Date(error.timestamp).getTime() > oneHourAgo) {
      recentCount++;
    }
  }

  return {
    total: errors.length,
    byCategory,
    bySeverity,
    recentCount,
  };
}

// ============================================================================
// React Integration Helpers
// ============================================================================

/**
 * Create an error handler for async operations in React components
 */
export function createAsyncErrorHandler(
  setError: (error: string | null) => void,
  operation: string
) {
  return (error: unknown) => {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    const logged = logAsyncError(errorObj, operation);
    setError(logged.userMessage);
  };
}

/**
 * Wrap an async function with error handling
 */
export function withErrorHandling<T>(
  asyncFn: () => Promise<T>,
  operation: string,
  onError?: (error: LoggedError) => void
): () => Promise<T | null> {
  return async () => {
    try {
      return await asyncFn();
    } catch (error) {
      const logged = logAsyncError(
        error instanceof Error ? error : new Error(String(error)),
        operation
      );
      onError?.(logged);
      return null;
    }
  };
}

// ============================================================================
// Export Default
// ============================================================================

export const errorLogger = {
  log: logError,
  warn: logWarning,
  logComponent: logComponentError,
  logAsync: logAsyncError,
  configure: configureErrorLogger,
  getUserMessage: getUserFriendlyMessage,
  getHistory: getErrorHistory,
  clearHistory: clearErrorHistory,
  getStats: getErrorStats,
  createHandler: createAsyncErrorHandler,
  withHandling: withErrorHandling,
};

export default errorLogger;
