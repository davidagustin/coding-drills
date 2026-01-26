export default function ProblemDetailLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 animate-pulse">
      {/* Navigation Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="h-5 w-20 bg-zinc-800 rounded" />
            <div className="h-5 w-32 bg-zinc-800 rounded" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-16 bg-zinc-800 rounded-lg" />
              <div className="h-8 w-16 bg-zinc-800 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Problem Description */}
          <div className="space-y-4">
            {/* Problem Header */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="h-7 w-48 bg-zinc-800 rounded" />
                <div className="flex items-center gap-2">
                  <div className="h-6 w-20 bg-zinc-800 rounded-full" />
                  <div className="h-6 w-16 bg-zinc-800 rounded-full" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-zinc-800 rounded" />
                <div className="h-4 w-3/4 bg-zinc-800 rounded" />
                <div className="h-4 w-5/6 bg-zinc-800 rounded" />
              </div>
            </div>

            {/* Setup Code */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-800/50">
                <div className="h-4 w-24 bg-zinc-700 rounded" />
              </div>
              <div className="p-4">
                <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800">
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-zinc-800 rounded" />
                    <div className="h-4 w-1/2 bg-zinc-800 rounded" />
                    <div className="h-4 w-2/3 bg-zinc-800 rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* Expected Output */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-800/50">
                <div className="h-4 w-32 bg-zinc-700 rounded" />
              </div>
              <div className="p-4">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <div className="h-5 w-24 bg-green-500/20 rounded" />
                </div>
              </div>
            </div>

            {/* Collapsible sections */}
            <div className="border border-zinc-800 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-zinc-800/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-zinc-700 rounded" />
                  <div className="h-4 w-12 bg-zinc-700 rounded" />
                </div>
                <div className="h-4 w-4 bg-zinc-700 rounded" />
              </div>
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="space-y-4">
            {/* Code Editor */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-800/50 flex items-center justify-between">
                <div className="h-4 w-24 bg-zinc-700 rounded" />
                <div className="h-3 w-40 bg-zinc-700 rounded" />
              </div>
              <div className="p-4">
                <div className="h-[300px] bg-zinc-950 rounded-lg border border-zinc-800" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <div className="flex-1 h-12 bg-zinc-700 rounded-lg" />
              <div className="h-12 w-24 bg-zinc-800 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
