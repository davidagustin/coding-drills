'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { complexityQuestions } from '@/lib/complexityProblems';
import { getExerciseCount } from '@/lib/exercises/index';
import { algorithmProblems } from '@/lib/interview/problems';
import { getMethodCountByLanguage } from '@/lib/methods/index';
import { problemsByLanguage } from '@/lib/problems/index';
import { getRegexProblemCount } from '@/lib/regexTrainer';
import type { LanguageId } from '@/lib/types';
import { isValidLanguage, LANGUAGE_CONFIG, type SupportedLanguage } from './config';
import { LanguageIcon } from './LanguageIcon';

// Stats interface for localStorage
interface UserStats {
  totalAnswered: number;
  correctAnswers: number;
  bestStreak: number;
}

// Icon components for mode cards
function KeyboardIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

function LightbulbIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
      />
    </svg>
  );
}

function BookIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
  );
}

function LoopIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

function ClipboardIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
      />
    </svg>
  );
}

function ListBulletIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  );
}

function ChatBubbleIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 21.192a5.974 5.974 0 01-2.217.348 6.01 6.01 0 01-.672-.038 6.052 6.052 0 01.206-4.248A8.224 8.224 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
      />
    </svg>
  );
}

function RegexIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9h6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 13h4" />
    </svg>
  );
}

function ArrowLeftIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  );
}

function ArrowRightIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function TrophyIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0116.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.997 6.997 0 01-5.27 2.499 6.997 6.997 0 01-5.27-2.499"
      />
    </svg>
  );
}

// Mode card component
interface ModeCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  config: (typeof LANGUAGE_CONFIG)[SupportedLanguage];
  badge?: string;
}

function ModeCard({ href, icon, title, description, buttonText, config, badge }: ModeCardProps) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-2xl border ${config.borderColor} bg-zinc-900/50 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${config.hoverBg}`}
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${config.bgColor}`}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${config.bgColor} ${config.color} mb-4`}
        >
          {icon}
        </div>

        {/* Title with optional badge */}
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {badge && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
              {badge}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-zinc-400 mb-6 leading-relaxed">{description}</p>

        {/* Button */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${config.bgColor} ${config.color} font-medium transition-all duration-200 group-hover:gap-3`}
        >
          {buttonText}
          <ArrowRightIcon className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}

// Stats section component
function StatsSection({
  stats,
  config,
}: {
  stats: UserStats;
  config: (typeof LANGUAGE_CONFIG)[SupportedLanguage];
}) {
  const accuracy =
    stats.totalAnswered > 0 ? Math.round((stats.correctAnswers / stats.totalAnswered) * 100) : 0;

  return (
    <div className={`rounded-2xl border ${config.borderColor} bg-zinc-900/30 p-6`}>
      <div className="flex items-center gap-2 mb-6">
        <TrophyIcon className={`w-6 h-6 ${config.color}`} />
        <h3 className="text-lg font-semibold text-white">Your Progress</h3>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Total Answered */}
        <div className="text-center">
          <div className={`text-3xl font-bold ${config.color}`}>{stats.totalAnswered}</div>
          <div className="text-sm text-zinc-500 mt-1">Questions Answered</div>
        </div>

        {/* Accuracy */}
        <div className="text-center">
          <div className={`text-3xl font-bold ${config.color}`}>{accuracy}%</div>
          <div className="text-sm text-zinc-500 mt-1">Accuracy</div>
        </div>

        {/* Best Streak */}
        <div className="text-center">
          <div className={`text-3xl font-bold ${config.color}`}>{stats.bestStreak}</div>
          <div className="text-sm text-zinc-500 mt-1">Best Streak</div>
        </div>
      </div>
    </div>
  );
}

export default function LanguagePage() {
  const params = useParams();
  const router = useRouter();
  const language = params.language as string;
  const [stats, setStats] = useState<UserStats | null>(null);
  const [mounted, setMounted] = useState(false);

  // Track mount state for hydration safety
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for hydration safety
    setMounted(true);
  }, []);

  // Validate language and load stats on client
  useEffect(() => {
    if (!mounted) return;

    // Redirect to not-found for invalid languages
    // Note: In Next.js 15, notFound() should only be called during server render.
    // For client-side validation, we redirect instead.
    if (!isValidLanguage(language)) {
      router.replace('/not-found');
      return;
    }

    // Load stats from localStorage
    const storageKey = `coding-drills-stats-${language}`;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as UserStats;
        if (parsed.totalAnswered > 0 || parsed.correctAnswers > 0 || parsed.bestStreak > 0) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- Loading from localStorage
          setStats(parsed);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [language, router, mounted]);

  if (!mounted) {
    return null;
  }

  if (!isValidLanguage(language)) {
    return null;
  }

  const config = LANGUAGE_CONFIG[language];

  // Database languages don't have algorithm exercises or method references
  const isDatabaseLanguage = ['postgresql', 'mysql', 'mongodb'].includes(language);

  // Get counts for badges
  const methodCounts = getMethodCountByLanguage();
  const methodCount = methodCounts[language] || 0;
  const exerciseCount = !isDatabaseLanguage ? getExerciseCount(language) : 0;
  const interviewProblemCount = algorithmProblems.length;
  const complexityCount = complexityQuestions.length;
  const quizTotalCount = methodCount + complexityCount;
  const regexProblemCount = getRegexProblemCount();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back to home link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Languages
      </Link>

      {/* Language header */}
      <div className="text-center mb-12">
        <div
          className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl ${config.bgColor} ${config.borderColor} border mb-6`}
        >
          <LanguageIcon language={language} className="w-16 h-16" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{config.name}</h1>

        {/* Version and Documentation Link */}
        <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
          <span
            className={`text-sm px-3 py-1 rounded-full ${config.bgColor} ${config.color} ${config.borderColor} border`}
          >
            {config.version}
          </span>
          <a
            href={config.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm px-3 py-1 rounded-full ${config.bgColor} ${config.color} ${config.borderColor} border hover:opacity-80 transition-opacity inline-flex items-center gap-1.5`}
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Official Docs
          </a>
        </div>

        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          {isDatabaseLanguage
            ? `Master ${config.name} through interactive drills, quizzes, and problem-solving.`
            : `Master ${config.name} methods through interactive drills, quizzes, and comprehensive references.`}
        </p>
      </div>

      {/* Mode cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <ModeCard
          href={`/${language}/drill`}
          icon={<KeyboardIcon className="w-8 h-8" />}
          title="Drill Mode"
          description="Type code solutions to method challenges. Build muscle memory and improve your typing speed."
          buttonText="Start Drilling"
          config={config}
          badge={methodCount > 0 ? `${methodCount} methods` : undefined}
        />

        {!isDatabaseLanguage && (
          <ModeCard
            href={`/${language}/quiz`}
            icon={<LightbulbIcon className="w-8 h-8" />}
            title="Quiz Mode"
            description="Match inputs and outputs to methods, plus time & space complexity challenges. Test your knowledge and learn new patterns."
            buttonText="Start Quiz"
            config={config}
            badge={quizTotalCount > 0 ? `${quizTotalCount} questions` : undefined}
          />
        )}

        <ModeCard
          href={`/${language}/problems`}
          icon={<ListBulletIcon className="w-8 h-8" />}
          title={isDatabaseLanguage ? 'Query Training' : 'Method Training'}
          description={
            isDatabaseLanguage
              ? 'Train your ability to write queries, use operators, and master database patterns. Build muscle memory for common operations.'
              : 'Train your ability to use methods, transform data, and write clean solutions. Build muscle memory for common patterns.'
          }
          buttonText="Start Training"
          config={config}
          badge={`${problemsByLanguage[language as LanguageId]?.length || 0} exercises`}
        />

        {!isDatabaseLanguage && (
          <>
            <ModeCard
              href={`/${language}/exercises`}
              icon={<LoopIcon className="w-8 h-8" />}
              title="Building Blocks"
              description="Master the reusable sub-patterns behind every coding problem: sliding windows, two pointers, binary search variants, DP, and more."
              buttonText="Train Patterns"
              config={config}
              badge={exerciseCount > 0 ? `${exerciseCount} exercises` : undefined}
            />

            <ModeCard
              href={`/${language}/reference`}
              icon={<BookIcon className="w-8 h-8" />}
              title="Method Reference"
              description="Browse all methods with examples. A comprehensive guide to the language's built-in methods."
              buttonText="View Reference"
              config={config}
              badge={methodCount > 0 ? `${methodCount} methods` : undefined}
            />
          </>
        )}

        <ModeCard
          href={`/${language}/regex`}
          icon={<RegexIcon className="w-8 h-8" />}
          title="Regex Trainer"
          description="Master regular expressions with live pattern matching. Drill timed challenges, study at your pace, or experiment in the playground."
          buttonText="Start Training"
          config={config}
          badge={`${regexProblemCount} patterns`}
        />

        <ModeCard
          href={`/${language}/cheatsheet`}
          icon={<ClipboardIcon className="w-8 h-8" />}
          title="Cheatsheet"
          description={
            isDatabaseLanguage
              ? 'Quick reference for coding interviews. Essential functions, queries, and syntax with examples and tips.'
              : 'Quick reference for coding interviews. Essential methods with syntax, complexity, and tips.'
          }
          buttonText="View Cheatsheet"
          config={config}
        />

        {!isDatabaseLanguage && (
          <ModeCard
            href={`/${language}/interview`}
            icon={<ChatBubbleIcon className="w-8 h-8" />}
            title="AI Mock Interview"
            description="Talk through coding problems with an AI interviewer. Practice explaining your approach and reasoning out loud."
            buttonText="Start Mock Interview"
            config={config}
            badge={interviewProblemCount > 0 ? `${interviewProblemCount} problems` : undefined}
          />
        )}
      </div>

      {/* Stats section (only if user has previous activity) */}
      {stats && <StatsSection stats={stats} config={config} />}

      {/* Quick tips section */}
      <div className="mt-12 text-center">
        <h3 className="text-lg font-medium text-zinc-300 mb-4">Quick Tips for {config.name}</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {isDatabaseLanguage
            ? [
                'Start with Drill Mode to practice queries',
                'Browse Problems for real-world scenarios',
                'Use Cheatsheet for quick reference',
              ].map((tip, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm ${config.bgColor} ${config.color} ${config.borderColor} border`}
                >
                  {tip}
                </span>
              ))
            : [
                'Start with Drill Mode to build muscle memory',
                'Use Quiz Mode to test retention',
                'Reference section for quick lookups',
              ].map((tip, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm ${config.bgColor} ${config.color} ${config.borderColor} border`}
                >
                  {tip}
                </span>
              ))}
        </div>
      </div>
    </div>
  );
}
