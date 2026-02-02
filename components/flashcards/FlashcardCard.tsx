'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Flashcard } from '@/lib/flashcards/types';

interface FlashcardCardProps {
  card: Flashcard;
  isRevealed: boolean;
  onReveal: () => void;
}

export function FlashcardCard({ card, isRevealed, onReveal }: FlashcardCardProps) {
  const [animateIn, setAnimateIn] = useState(false);

  // Trigger slide-up animation when answer is revealed
  useEffect(() => {
    // Small delay so the browser paints the hidden state first
    const id = requestAnimationFrame(() => setAnimateIn(isRevealed));
    return () => cancelAnimationFrame(id);
  }, [isRevealed]);

  // Keyboard shortcut: Space / Enter to reveal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isRevealed) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        onReveal();
      }
    },
    [isRevealed, onReveal],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Front (always visible) */}
      <div className="bg-zinc-800/50 rounded-2xl border border-zinc-700/50 p-6 mb-4">
        {/* Badge */}
        <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
          {card.front.badge}
        </span>

        {/* Prompt */}
        <h2 className="text-xl font-semibold text-white mb-4">{card.front.prompt}</h2>

        {/* Code snippet */}
        {card.front.code && (
          <pre className="bg-zinc-900 rounded-lg p-4 mb-4 font-mono text-sm text-blue-300 whitespace-pre-wrap break-words overflow-x-auto max-h-64 overflow-y-auto">
            <code className="block">{card.front.code}</code>
          </pre>
        )}

        {/* Detail / secondary info */}
        {card.front.detail && <p className="text-zinc-400 text-sm">{card.front.detail}</p>}
      </div>

      {/* Reveal button */}
      {!isRevealed && (
        <button
          type="button"
          onClick={onReveal}
          className="w-full py-4 bg-zinc-700/50 hover:bg-zinc-700 border border-zinc-600 rounded-xl
                     text-zinc-200 font-medium transition-all duration-200 cursor-pointer
                     flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Reveal Answer
          <span className="text-zinc-500 text-xs ml-1">(Space)</span>
        </button>
      )}

      {/* Back (slides up when revealed) */}
      {isRevealed && (
        <div
          className={`bg-zinc-800/50 rounded-2xl border border-emerald-700/40 p-6 transition-all duration-300 ease-out ${
            animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Answer</div>
          <div className="text-2xl font-bold text-emerald-400 mb-4">{card.back.answer}</div>

          {card.back.explanation && (
            <div className="bg-zinc-900/50 rounded-lg p-4 border-l-2 border-emerald-500/50">
              <p className="text-zinc-300 text-sm">{card.back.explanation}</p>
            </div>
          )}

          {card.back.meta && (
            <div className="mt-3 text-xs font-mono text-zinc-500">{card.back.meta}</div>
          )}
        </div>
      )}
    </div>
  );
}
