'use client';

import Link from 'next/link';
import { PatternQuizContent } from '@/components/PatternQuizContent';

export default function PatternQuizPage() {
  return (
    <div>
      {/* Mode tabs */}
      <div className="bg-zinc-950 border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-4 flex gap-1 py-2">
          <Link
            href="/pattern-quiz"
            className="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-800 text-white"
          >
            Quiz
          </Link>
          <Link
            href="/pattern-quiz/study"
            className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
          >
            Study
          </Link>
        </div>
      </div>
      <PatternQuizContent backHref="/" />
    </div>
  );
}
