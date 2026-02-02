'use client';

import type { SessionRatingTally } from '@/lib/flashcards/types';

interface StudyProgressProps {
  current: number;
  total: number;
  tally: SessionRatingTally;
}

export function StudyProgress({ current, total, tally }: StudyProgressProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      {/* Progress text */}
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-zinc-400">
          Card {current} of {total}
        </span>
        <div className="flex items-center gap-4 text-xs font-medium">
          {tally.missed > 0 && <span className="text-red-400">Missed: {tally.missed}</span>}
          {tally.shaky > 0 && <span className="text-amber-400">Shaky: {tally.shaky}</span>}
          {tally['knew-it'] > 0 && (
            <span className="text-emerald-400">Knew It: {tally['knew-it']}</span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
