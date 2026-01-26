export default function ProblemsLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Back link skeleton */}
      <div className="h-5 w-32 bg-zinc-800 rounded mb-6" />

      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-9 w-64 bg-zinc-800 rounded mb-2" />
        <div className="h-5 w-48 bg-zinc-800 rounded" />
      </div>

      {/* Progress stats skeleton */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="h-4 w-24 bg-zinc-800 rounded" />
          <div className="h-6 w-16 bg-zinc-800 rounded" />
        </div>
        <div className="h-2 bg-zinc-800 rounded-full mb-3" />
        <div className="flex gap-4">
          <div className="h-4 w-20 bg-zinc-800 rounded" />
          <div className="h-4 w-24 bg-zinc-800 rounded" />
          <div className="h-4 w-16 bg-zinc-800 rounded" />
        </div>
      </div>

      {/* Filters skeleton */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="h-4 w-12 bg-zinc-800 rounded mb-1" />
            <div className="h-10 bg-zinc-800 rounded-lg" />
          </div>
          <div className="w-40">
            <div className="h-4 w-16 bg-zinc-800 rounded mb-1" />
            <div className="h-10 bg-zinc-800 rounded-lg" />
          </div>
          <div className="w-40">
            <div className="h-4 w-16 bg-zinc-800 rounded mb-1" />
            <div className="h-10 bg-zinc-800 rounded-lg" />
          </div>
          <div className="w-32">
            <div className="h-4 w-12 bg-zinc-800 rounded mb-1" />
            <div className="h-10 bg-zinc-800 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Table skeleton */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4 px-4 py-3 bg-zinc-800/50 border-b border-zinc-700">
          <div className="w-12 h-4 bg-zinc-700 rounded" />
          <div className="w-8 h-4 bg-zinc-700 rounded" />
          <div className="flex-1 h-4 bg-zinc-700 rounded" />
          <div className="hidden sm:block w-40 h-4 bg-zinc-700 rounded" />
          <div className="w-20 h-4 bg-zinc-700 rounded" />
        </div>

        {/* Rows */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-4 py-3 border-b border-zinc-800 last:border-b-0"
          >
            <div className="w-12 h-4 bg-zinc-800 rounded" />
            <div className="w-8 h-5 bg-zinc-800 rounded-full" />
            <div className="flex-1 h-5 bg-zinc-800 rounded" />
            <div className="hidden sm:block w-40">
              <div className="h-6 w-24 bg-zinc-800 rounded-full" />
            </div>
            <div className="w-20">
              <div className="h-6 w-16 bg-zinc-800 rounded-full" />
            </div>
          </div>
        ))}

        {/* Footer */}
        <div className="px-4 py-3 bg-zinc-800/50 border-t border-zinc-700">
          <div className="h-4 w-40 bg-zinc-700 rounded" />
        </div>
      </div>
    </div>
  );
}
