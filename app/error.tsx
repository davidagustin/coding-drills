'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center px-6">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-lg text-center space-y-8">
        {/* Error icon with glow */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl" />
          <div className="relative w-24 h-24 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Error message */}
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-100">
            Something went wrong!
          </h1>
          <p className="text-gray-400 text-lg">
            We encountered an unexpected error.
            <br />
            Don't worry, these things happen in code.
          </p>
        </div>

        {/* Error details (development only - in production you might hide this) */}
        {error.message && (
          <div className="rounded-xl bg-gray-900/80 border border-gray-800 p-4 text-left">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
              Error Details
            </p>
            <code className="text-sm text-red-400 font-mono break-all">
              {error.message}
            </code>
            {error.digest && (
              <p className="text-xs text-gray-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="
              inline-flex items-center gap-2 px-6 py-3
              bg-gradient-to-r from-purple-600 to-blue-600
              hover:from-purple-500 hover:to-blue-500
              text-white font-semibold rounded-xl
              transition-all duration-200
              hover:shadow-lg hover:shadow-purple-500/25
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]
            "
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>

          <Link
            href="/"
            className="
              inline-flex items-center gap-2 px-6 py-3
              bg-gray-800 hover:bg-gray-700
              text-gray-300 font-semibold rounded-xl
              border border-gray-700 hover:border-gray-600
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]
            "
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Helpful suggestion */}
        <div className="text-sm text-gray-600 space-y-1">
          <p>If this keeps happening, try:</p>
          <ul className="text-gray-500">
            <li>Refreshing the page</li>
            <li>Clearing your browser cache</li>
            <li>Checking your internet connection</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
