'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  FRAMEWORK_CONFIG,
  type FrameworkId,
  getCheatsheetSectionCount,
  getProblemCount,
  getQuizQuestionCount,
  getUIPatternCount,
  isValidFramework,
} from '@/lib/frontend-drills';

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

function LayoutGridIcon({ className = 'w-8 h-8' }: { className?: string }) {
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
        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
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

// Mode card component
interface ModeCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  badge?: string;
  config: (typeof FRAMEWORK_CONFIG)[FrameworkId];
}

function ModeCard({ href, icon, title, description, buttonText, badge, config }: ModeCardProps) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-2xl border ${config.borderColor} bg-zinc-900/50 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${config.hoverBg} cursor-pointer`}
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

export default function FrameworkPage() {
  const params = useParams();
  const router = useRouter();
  const framework = params.framework as string;
  const [mounted, setMounted] = useState(false);

  // Track mount state for hydration safety
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for hydration safety
    setMounted(true);
  }, []);

  // Validate framework on client
  useEffect(() => {
    if (!mounted) return;

    if (!isValidFramework(framework)) {
      router.replace('/not-found');
      return;
    }
  }, [framework, router, mounted]);

  if (!mounted) {
    return null;
  }

  if (!isValidFramework(framework)) {
    return null;
  }

  const config = FRAMEWORK_CONFIG[framework];
  const problemCount = getProblemCount(framework);
  const quizQuestionCount = getQuizQuestionCount(framework);
  const cheatsheetSectionCount = getCheatsheetSectionCount(framework);
  const uiPatternCount = getUIPatternCount(framework);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Framework header */}
      <div className="text-center mb-12">
        <div
          className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl ${config.bgColor} ${config.borderColor} border mb-6`}
        >
          <div className={`text-4xl font-bold ${config.color}`}>{config.icon}</div>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{config.name}</h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">{config.description}</p>
      </div>

      {/* Mode cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <ModeCard
          href={`/frontend-drills/${framework}/drill`}
          icon={<KeyboardIcon className="w-8 h-8" />}
          title="Drill Mode"
          description={`Write code solutions to ${config.name} challenges. Build muscle memory for ${config.name} patterns.`}
          buttonText="Start Drilling"
          config={config}
          badge={problemCount > 0 ? `${problemCount} problems` : undefined}
        />

        <ModeCard
          href={`/frontend-drills/${framework}/quiz`}
          icon={<LightbulbIcon className="w-8 h-8" />}
          title="Quiz Mode"
          description={`Test your knowledge with multiple choice questions about ${config.name} concepts and patterns.`}
          buttonText="Start Quiz"
          config={config}
          badge={quizQuestionCount > 0 ? `${quizQuestionCount} questions` : undefined}
        />

        <ModeCard
          href={`/frontend-drills/${framework}/ui-patterns`}
          icon={<LayoutGridIcon className="w-8 h-8" />}
          title="UI Patterns"
          description={`Explore common UI patterns for ${config.name}: forms, navigation, data display, interactive elements, and more.`}
          buttonText="Browse Patterns"
          config={config}
          badge={uiPatternCount > 0 ? `${uiPatternCount} patterns` : undefined}
        />

        <ModeCard
          href={`/frontend-drills/${framework}/cheatsheet`}
          icon={<BookIcon className="w-8 h-8" />}
          title="Cheatsheet"
          description={`Quick reference for ${config.name} syntax, APIs, patterns, and ecosystem tools.`}
          buttonText="View Cheatsheet"
          config={config}
          badge={cheatsheetSectionCount > 0 ? `${cheatsheetSectionCount} topics` : undefined}
        />
      </div>

      {/* Quick tips section */}
      <div className="mt-12 text-center">
        <h3 className="text-lg font-medium text-zinc-300 mb-4">Quick Tips for {config.name}</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            'Start with Drill Mode to practice patterns',
            'Use Quiz Mode to test understanding',
            'Build real-world components',
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
