'use client';

interface SkeletonProps {
  className?: string;
}

function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`
        animate-pulse
        bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800
        bg-[length:200%_100%]
        rounded
        ${className}
      `}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 space-y-4">
      {/* Icon placeholder */}
      <Skeleton className="w-14 h-14 rounded-xl" />

      {/* Title */}
      <Skeleton className="h-6 w-3/4 rounded-lg" />

      {/* Description lines */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
      </div>
    </div>
  );
}

export function CodeBlockSkeleton() {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/80 overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/40" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
          <div className="w-3 h-3 rounded-full bg-green-500/40" />
        </div>
        <Skeleton className="h-4 w-24 ml-2 rounded" />
      </div>

      {/* Code lines */}
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-4/5 rounded" />
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
        <Skeleton className="h-4 w-4/5 rounded" />
      </div>
    </div>
  );
}

export function MethodCardSkeleton() {
  return (
    <div className="rounded-xl border-2 border-gray-700 bg-gray-800/50 p-4">
      <div className="flex items-start gap-3">
        {/* Radio button placeholder */}
        <Skeleton className="w-6 h-6 rounded-full flex-shrink-0" />

        <div className="flex-1 space-y-2">
          {/* Method name */}
          <Skeleton className="h-5 w-32 rounded" />

          {/* Description */}
          <Skeleton className="h-4 w-full rounded" />
        </div>
      </div>
    </div>
  );
}

export function QuizSkeleton() {
  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-48 rounded-lg" />
        <Skeleton className="h-8 w-full rounded-lg" />
        <Skeleton className="h-8 w-3/4 rounded-lg" />
      </div>

      {/* Code block */}
      <CodeBlockSkeleton />

      {/* Options */}
      <div className="space-y-3">
        <MethodCardSkeleton />
        <MethodCardSkeleton />
        <MethodCardSkeleton />
        <MethodCardSkeleton />
      </div>
    </div>
  );
}

export function LanguageGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30">
          <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/2 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export { Skeleton };
export default CardSkeleton;
