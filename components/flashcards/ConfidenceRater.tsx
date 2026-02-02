'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ConfidenceRating } from '@/lib/flashcards/types';

interface ConfidenceRaterProps {
  onRate: (rating: ConfidenceRating) => void;
}

const RATINGS: {
  key: string;
  rating: ConfidenceRating;
  label: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}[] = [
  {
    key: '1',
    rating: 'missed',
    label: 'Missed',
    bgColor: 'bg-red-500/20 hover:bg-red-500/30',
    textColor: 'text-red-400',
    borderColor: 'border-red-500/30',
  },
  {
    key: '2',
    rating: 'shaky',
    label: 'Shaky',
    bgColor: 'bg-amber-500/20 hover:bg-amber-500/30',
    textColor: 'text-amber-400',
    borderColor: 'border-amber-500/30',
  },
  {
    key: '3',
    rating: 'knew-it',
    label: 'Knew It',
    bgColor: 'bg-emerald-500/20 hover:bg-emerald-500/30',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
  },
];

export function ConfidenceRater({ onRate }: ConfidenceRaterProps) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setFadeIn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Keyboard shortcuts: 1, 2, 3
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const match = RATINGS.find((r) => r.key === e.key);
      if (match) {
        e.preventDefault();
        onRate(match.rating);
      }
    },
    [onRate],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className={`flex gap-3 w-full max-w-2xl mx-auto mt-4 transition-all duration-300 ${
        fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      {RATINGS.map((r) => (
        <button
          key={r.rating}
          type="button"
          onClick={() => onRate(r.rating)}
          className={`flex-1 py-3 px-4 rounded-xl border font-medium transition-all duration-200 cursor-pointer
            ${r.bgColor} ${r.textColor} ${r.borderColor}`}
        >
          <span className="text-xs opacity-60 mr-1.5">{r.key}</span>
          {r.label}
        </button>
      ))}
    </div>
  );
}
