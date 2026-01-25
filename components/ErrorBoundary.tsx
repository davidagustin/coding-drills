'use client';

import {
  Component,
  type ReactNode,
  type ErrorInfo,
} from 'react';

// ============================================================================
// Types
// ============================================================================

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// ============================================================================
// Error Boundary Component
// ============================================================================

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error Info:', errorInfo);

    // Store error info for potential display
    this.setState({ errorInfo });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you might want to send to an error reporting service
    // e.g., Sentry, LogRocket, etc.
  }

  handleRetry = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = (): void => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  handleGoHome = (): void => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback, showDetails = false } = this.props;

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
          <div className="max-w-lg w-full">
            {/* Error Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
              {/* Error Icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              {/* Error Title */}
              <h1 className="text-2xl font-bold text-white mb-2">
                Something went wrong
              </h1>

              {/* Error Description */}
              <p className="text-zinc-400 mb-6">
                We encountered an unexpected error. Don&apos;t worry, your progress is saved.
              </p>

              {/* Error Details (development only) */}
              {showDetails && error && (
                <div className="mb-6 text-left">
                  <details className="bg-zinc-800/50 rounded-lg overflow-hidden">
                    <summary className="px-4 py-3 cursor-pointer text-sm text-zinc-300 hover:text-white transition-colors">
                      View error details
                    </summary>
                    <div className="px-4 pb-4 space-y-3">
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">Error Message:</p>
                        <code className="block text-xs text-red-400 bg-zinc-800 p-2 rounded overflow-auto max-h-24">
                          {error.message}
                        </code>
                      </div>
                      {error.stack && (
                        <div>
                          <p className="text-xs text-zinc-500 mb-1">Stack Trace:</p>
                          <code className="block text-xs text-zinc-400 bg-zinc-800 p-2 rounded overflow-auto max-h-32 whitespace-pre-wrap">
                            {error.stack}
                          </code>
                        </div>
                      )}
                      {errorInfo?.componentStack && (
                        <div>
                          <p className="text-xs text-zinc-500 mb-1">Component Stack:</p>
                          <code className="block text-xs text-zinc-400 bg-zinc-800 p-2 rounded overflow-auto max-h-32 whitespace-pre-wrap">
                            {errorInfo.componentStack}
                          </code>
                        </div>
                      )}
                    </div>
                  </details>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {/* Retry Button */}
                <button
                  onClick={this.handleRetry}
                  className="
                    px-6 py-3 rounded-lg
                    bg-gradient-to-r from-purple-500 to-blue-500
                    hover:from-purple-600 hover:to-blue-600
                    text-white font-medium
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900
                    flex items-center justify-center gap-2
                  "
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Try Again
                </button>

                {/* Reload Button */}
                <button
                  onClick={this.handleReload}
                  className="
                    px-6 py-3 rounded-lg
                    bg-zinc-800 hover:bg-zinc-700
                    text-zinc-300 hover:text-white
                    font-medium
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900
                    flex items-center justify-center gap-2
                  "
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Reload Page
                </button>

                {/* Go Home Button */}
                <button
                  onClick={this.handleGoHome}
                  className="
                    px-6 py-3 rounded-lg
                    bg-zinc-800 hover:bg-zinc-700
                    text-zinc-300 hover:text-white
                    font-medium
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900
                    flex items-center justify-center gap-2
                  "
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Go Home
                </button>
              </div>
            </div>

            {/* Help Text */}
            <p className="text-center text-zinc-500 text-sm mt-6">
              If this problem persists, please try clearing your browser cache or contact support.
            </p>
          </div>
        </div>
      );
    }

    return children;
  }
}

// ============================================================================
// Functional Wrapper for Hooks Support
// ============================================================================

interface ErrorBoundaryWrapperProps extends ErrorBoundaryProps {
  resetKey?: string | number;
}

/**
 * A functional component wrapper that allows resetting the error boundary
 * when certain props change (useful for route changes, etc.)
 */
export function ErrorBoundaryWrapper({
  children,
  resetKey,
  ...props
}: ErrorBoundaryWrapperProps): ReactNode {
  return (
    <ErrorBoundary key={resetKey} {...props}>
      {children}
    </ErrorBoundary>
  );
}

// ============================================================================
// Error Fallback Component
// ============================================================================

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  title?: string;
  message?: string;
}

/**
 * A reusable error fallback component that can be used
 * as the fallback prop for ErrorBoundary
 */
export function ErrorFallback({
  error,
  resetErrorBoundary,
  title = 'Something went wrong',
  message = 'An unexpected error occurred.',
}: ErrorFallbackProps): ReactNode {
  return (
    <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl text-center">
      <h2 className="text-lg font-semibold text-red-400 mb-2">{title}</h2>
      <p className="text-zinc-400 mb-4">{message}</p>
      {error?.message && (
        <p className="text-sm text-zinc-500 mb-4 font-mono">
          {error.message}
        </p>
      )}
      {resetErrorBoundary && (
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// ============================================================================
// Exports
// ============================================================================

export default ErrorBoundary;
