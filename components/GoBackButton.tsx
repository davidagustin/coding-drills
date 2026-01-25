'use client';

/**
 * GoBackButton - A client component for browser history navigation
 *
 * This component is separated from the not-found page to maintain
 * proper Server Component / Client Component separation in Next.js 15.
 * The not-found page remains a Server Component for optimal performance,
 * while this button handles client-side navigation.
 */
export function GoBackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
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
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Go Back
    </button>
  );
}

export default GoBackButton;
