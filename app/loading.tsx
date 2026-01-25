import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Loading content */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Spinner with glow effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
          <LoadingSpinner size="lg" variant="primary" />
        </div>

        {/* Loading text */}
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-gray-300">
            Loading...
          </p>
          <p className="text-sm text-gray-500">
            Preparing your coding drills
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-1.5">
          <div
            className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <div
            className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <div
            className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
}
