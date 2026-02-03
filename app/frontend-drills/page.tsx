'use client';

import Link from 'next/link';
import {
  FRAMEWORK_CONFIG,
  FRAMEWORK_IDS,
  getProblemCount,
  getQuizQuestionCount,
} from '@/lib/frontend-drills';

export default function FrontendDrillsPage() {
  return (
    <div className="min-h-screen bg-mesh">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12 pb-8">
        {/* Back to Home Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors mb-8 group"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back to Home</span>
        </Link>

        {/* Title Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="gradient-text">Frontend Drills</span>
          </h1>
          <p className="text-xl text-zinc-300 font-light max-w-2xl mx-auto">
            Master frontend frameworks with hands-on practice
          </p>
          <p className="text-zinc-500 max-w-xl mx-auto leading-relaxed">
            Build real-world components, practice framework patterns, and test your knowledge with
            interactive challenges.
          </p>
        </div>
      </div>

      {/* Framework Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {FRAMEWORK_IDS.map((frameworkId) => {
            const fw = FRAMEWORK_CONFIG[frameworkId];
            const problemCount = getProblemCount(frameworkId);
            const quizCount = getQuizQuestionCount(frameworkId);
            const totalChallenges = problemCount + quizCount;

            return (
              <Link key={fw.id} href={`/frontend-drills/${fw.id}`}>
                <div
                  className={`
                    group relative overflow-hidden rounded-2xl border ${fw.borderColor}
                    bg-gradient-to-br ${fw.bgColor} backdrop-blur-sm
                    p-8 transition-all duration-300
                    hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/5
                    cursor-pointer
                  `}
                >
                  {/* Background decorative glow */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl transition-opacity group-hover:opacity-100 opacity-50" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon Circle */}
                    <div
                      className={`
                        inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4
                        ${fw.bgColor} ${fw.borderColor} border-2
                        transition-transform duration-300 group-hover:scale-110
                      `}
                    >
                      <span className={`text-2xl font-bold ${fw.color}`}>{fw.icon}</span>
                    </div>

                    {/* Framework Name */}
                    <h3 className="text-2xl font-bold text-zinc-100 mb-3 group-hover:text-white transition-colors">
                      {fw.name}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">
                      {fw.description}
                    </p>

                    {/* Challenge Count Badge */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`
                          inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                          ${fw.bgColor} ${fw.color} border ${fw.borderColor}
                        `}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        {totalChallenges} {totalChallenges === 1 ? 'challenge' : 'challenges'}
                      </span>
                    </div>

                    {/* Hover Arrow */}
                    <div
                      className={`
                        absolute bottom-6 right-6 transition-all duration-300
                        opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0
                      `}
                    >
                      <svg
                        className={`w-6 h-6 ${fw.color}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Features Preview */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-2xl font-semibold text-center mb-8 text-zinc-100">
          What You&apos;ll Practice
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {[
            {
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="18" rx="2" />
                  <path d="M7 8l4 4-4 4" />
                  <path d="M13 16h4" />
                </svg>
              ),
              title: 'Code Drills',
              description:
                'Write code solutions to framework challenges in a code editor with real-time feedback',
              color: 'text-cyan-400',
              bgColor: 'bg-cyan-400/10',
              borderColor: 'border-cyan-400/30',
            },
            {
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              ),
              title: 'Framework Quizzes',
              description:
                'Test your knowledge with multiple choice questions on framework concepts and APIs',
              color: 'text-purple-400',
              bgColor: 'bg-purple-400/10',
              borderColor: 'border-purple-400/30',
            },
            {
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              ),
              title: 'UI Patterns',
              description:
                'Browse 40+ common UI patterns: forms, navigation, data display, and interactive elements',
              color: 'text-amber-400',
              bgColor: 'bg-amber-400/10',
              borderColor: 'border-amber-400/30',
            },
            {
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 6.25a8.25 8.25 0 00-6-2.5c-1 0-2 .17-3 .5v14.5a8.25 8.25 0 013-.5c2.25 0 4.5.88 6 2.5m0-14.5a8.25 8.25 0 016-2.5c1 0 2 .17 3 .5v14.5a8.25 8.25 0 00-3-.5c-2.25 0-4.5.88-6 2.5m0-14.5v14.5" />
                </svg>
              ),
              title: 'Cheatsheets',
              description:
                'Quick reference with interactive code examples, syntax guides, and ecosystem overviews',
              color: 'text-emerald-400',
              bgColor: 'bg-emerald-400/10',
              borderColor: 'border-emerald-400/30',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className={`
                relative overflow-hidden rounded-xl border ${feature.borderColor}
                bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm
                p-6
              `}
            >
              <div className={`${feature.color} mb-3`}>{feature.icon}</div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">{feature.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>

              {/* Decorative corner glow */}
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
