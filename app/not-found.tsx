import Link from 'next/link';
import { GoBackButton } from '@/components/GoBackButton';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center px-6">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-lg text-center space-y-8">
        {/* 404 illustration */}
        <div className="relative">
          {/* Glowing background for the number */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl" />

          {/* Large 404 text */}
          <h1 className="relative text-[10rem] md:text-[12rem] font-bold leading-none tracking-tighter">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              404
            </span>
          </h1>
        </div>

        {/* Fun illustration - confused code brackets */}
        <div className="flex items-center justify-center gap-4 text-6xl opacity-60">
          <span className="transform -rotate-12">{`{`}</span>
          <span className="text-4xl">?</span>
          <span className="transform rotate-12">{`}`}</span>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-100">Page Not Found</h2>
          <p className="text-gray-400 text-lg">
            Looks like this code path doesn&apos;t exist.
            <br />
            Maybe it was refactored away?
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
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
              aria-hidden="true"
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

          <GoBackButton />
        </div>

        {/* Helpful tip */}
        <p className="text-sm text-gray-600">
          Tip: Use the navigation to find your way to coding drills
        </p>
      </div>
    </div>
  );
}
