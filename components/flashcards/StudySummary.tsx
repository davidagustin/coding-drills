'use client';

import type { Flashcard, SessionResult } from '@/lib/flashcards/types';

interface StudySummaryProps {
  result: SessionResult;
  onStudyAgain: () => void;
  onChangeSettings: () => void;
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

function RecallBadge({ rate }: { rate: number }) {
  const color = rate >= 80 ? 'text-emerald-400' : rate >= 50 ? 'text-amber-400' : 'text-red-400';
  return <span className={`text-2xl font-bold ${color}`}>{rate}%</span>;
}

export function StudySummary({ result, onStudyAgain, onChangeSettings }: StudySummaryProps) {
  const { totalCards, tally, weakCards, elapsedSeconds } = result;
  const recallRate = totalCards > 0 ? Math.round((tally['knew-it'] / totalCards) * 100) : 0;

  const allCorrect = tally.missed === 0 && tally.shaky === 0;

  // Bar chart percentages
  const pctKnew = totalCards > 0 ? (tally['knew-it'] / totalCards) * 100 : 0;
  const pctShaky = totalCards > 0 ? (tally.shaky / totalCards) * 100 : 0;
  const pctMissed = totalCards > 0 ? (tally.missed / totalCards) * 100 : 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Session Complete</h1>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-800/50 rounded-xl p-4 text-center border border-zinc-700/50">
            <div className="text-2xl font-bold text-blue-400">{totalCards}</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider">Cards Reviewed</div>
          </div>
          <div className="bg-zinc-800/50 rounded-xl p-4 text-center border border-zinc-700/50">
            <RecallBadge rate={recallRate} />
            <div className="text-xs text-zinc-400 uppercase tracking-wider">Recall Rate</div>
          </div>
          <div className="bg-zinc-800/50 rounded-xl p-4 text-center border border-zinc-700/50">
            <div className="text-2xl font-bold text-red-400">{tally.missed + tally.shaky}</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider">Need Review</div>
          </div>
          <div className="bg-zinc-800/50 rounded-xl p-4 text-center border border-zinc-700/50">
            <div className="text-2xl font-bold text-purple-400">{formatTime(elapsedSeconds)}</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider">Study Time</div>
          </div>
        </div>

        {/* Breakdown bar */}
        <div className="bg-zinc-800/50 rounded-xl p-6 mb-6 border border-zinc-700/50">
          <h3 className="text-lg font-semibold mb-4">Breakdown</h3>

          {/* Stacked horizontal bar */}
          <div className="h-6 rounded-full overflow-hidden flex mb-4">
            {pctKnew > 0 && (
              <div
                className="bg-emerald-500 transition-all duration-500"
                style={{ width: `${pctKnew}%` }}
              />
            )}
            {pctShaky > 0 && (
              <div
                className="bg-amber-500 transition-all duration-500"
                style={{ width: `${pctShaky}%` }}
              />
            )}
            {pctMissed > 0 && (
              <div
                className="bg-red-500 transition-all duration-500"
                style={{ width: `${pctMissed}%` }}
              />
            )}
          </div>

          {/* Legend */}
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-zinc-300">Knew It</span>
              <span className="text-zinc-500">
                {tally['knew-it']} ({Math.round(pctKnew)}%)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-zinc-300">Shaky</span>
              <span className="text-zinc-500">
                {tally.shaky} ({Math.round(pctShaky)}%)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-zinc-300">Missed</span>
              <span className="text-zinc-500">
                {tally.missed} ({Math.round(pctMissed)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Weak cards review */}
        {allCorrect ? (
          <div className="bg-emerald-500/10 rounded-xl p-6 mb-6 border border-emerald-500/30 text-center">
            <svg
              className="w-8 h-8 mx-auto mb-2 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-emerald-400 font-semibold">Clean sweep. You knew every card.</p>
          </div>
        ) : (
          <WeakCardsSection cards={weakCards} />
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onChangeSettings}
            className="flex-1 py-3 bg-zinc-700 hover:bg-zinc-600 rounded-xl font-semibold transition-colors cursor-pointer"
          >
            Change Settings
          </button>
          <button
            type="button"
            onClick={onStudyAgain}
            className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl font-semibold transition-all cursor-pointer"
          >
            Study Again
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Weak Cards Section ───────────────────────────────────────

function WeakCardsSection({ cards }: { cards: Flashcard[] }) {
  if (cards.length === 0) return null;

  return (
    <div className="bg-zinc-800/50 rounded-xl p-6 mb-6 border border-zinc-700/50">
      <h3 className="text-lg font-semibold mb-4">Review These Again</h3>
      <div className="space-y-3">
        {cards.map((card) => (
          <div key={card.id} className="bg-zinc-900/50 rounded-lg p-4 border-l-2 border-red-500/40">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-zinc-200 mb-1">{card.front.prompt}</div>
                {card.front.code && (
                  <pre className="text-xs font-mono text-zinc-500 truncate max-w-full">
                    {card.front.code.split('\n')[0]}
                  </pre>
                )}
              </div>
              <div className="text-sm font-mono font-semibold text-emerald-400 flex-shrink-0">
                {card.back.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
