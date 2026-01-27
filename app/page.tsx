import Link from 'next/link';
import { LanguageGrid } from '@/components/LanguageGrid';
import { getProblemCountByLanguage } from '@/lib/problems/index';
import { getRegexProblemCount } from '@/lib/regexTrainer';

const languages = [
  {
    name: 'JavaScript',
    subtitle: '+ TypeScript in Drill Mode',
    slug: 'javascript',
    icon: 'JS',
    bgGradient: 'from-yellow-500/20 to-yellow-600/10',
    borderColor: 'border-yellow-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]',
    iconBg: 'bg-yellow-500',
    iconText: 'text-black font-bold',
  },
  {
    name: 'TypeScript',
    subtitle: '+ JavaScript in Drill Mode',
    slug: 'typescript',
    icon: 'TS',
    bgGradient: 'from-blue-500/20 to-blue-600/10',
    borderColor: 'border-blue-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]',
    iconBg: 'bg-blue-600',
    iconText: 'text-white font-bold',
  },
  {
    name: 'Python',
    slug: 'python',
    icon: 'Py',
    bgGradient: 'from-blue-500/20 via-yellow-500/10 to-blue-600/10',
    borderColor: 'border-blue-400/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]',
    iconBg: 'bg-gradient-to-br from-blue-500 to-yellow-400',
    iconText: 'text-white font-bold',
  },
  {
    name: 'Java',
    slug: 'java',
    icon: 'Ja',
    bgGradient: 'from-red-500/20 to-orange-500/10',
    borderColor: 'border-red-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]',
    iconBg: 'bg-gradient-to-br from-red-500 to-orange-500',
    iconText: 'text-white font-bold',
  },
  {
    name: 'C++',
    slug: 'cpp',
    icon: '</>',
    bgGradient: 'from-blue-600/20 to-blue-700/10',
    borderColor: 'border-blue-600/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]',
    iconBg: 'bg-blue-700',
    iconText: 'text-white font-mono text-sm',
  },
  {
    name: 'C#',
    slug: 'csharp',
    icon: '#',
    bgGradient: 'from-purple-500/20 to-purple-600/10',
    borderColor: 'border-purple-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]',
    iconBg: 'bg-purple-600',
    iconText: 'text-white font-bold text-2xl',
  },
  {
    name: 'Go',
    slug: 'go',
    icon: 'Go',
    bgGradient: 'from-cyan-500/20 to-cyan-600/10',
    borderColor: 'border-cyan-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]',
    iconBg: 'bg-cyan-500',
    iconText: 'text-white font-bold',
  },
  {
    name: 'Ruby',
    slug: 'ruby',
    icon: 'Rb',
    bgGradient: 'from-red-600/20 to-red-700/10',
    borderColor: 'border-red-600/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]',
    iconBg: 'bg-red-600',
    iconText: 'text-white font-bold',
  },
  {
    name: 'C',
    slug: 'c',
    icon: 'C',
    bgGradient: 'from-gray-500/20 to-gray-600/10',
    borderColor: 'border-gray-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(107,114,128,0.4)]',
    iconBg: 'bg-gray-600',
    iconText: 'text-white font-bold',
  },
  {
    name: 'PHP',
    slug: 'php',
    icon: 'PHP',
    bgGradient: 'from-indigo-500/20 to-indigo-600/10',
    borderColor: 'border-indigo-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]',
    iconBg: 'bg-indigo-600',
    iconText: 'text-white font-bold text-sm',
  },
  {
    name: 'Kotlin',
    slug: 'kotlin',
    icon: 'K',
    bgGradient: 'from-violet-500/20 to-orange-500/10',
    borderColor: 'border-violet-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]',
    iconBg: 'bg-gradient-to-br from-violet-500 to-orange-400',
    iconText: 'text-white font-bold',
  },
  // New languages
  {
    name: 'Rust',
    slug: 'rust',
    icon: 'Rs',
    bgGradient: 'from-orange-600/20 to-red-700/10',
    borderColor: 'border-orange-600/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(234,88,12,0.4)]',
    iconBg: 'bg-gradient-to-br from-orange-600 to-red-700',
    iconText: 'text-white font-bold',
  },
  {
    name: 'Swift',
    slug: 'swift',
    icon: 'Sw',
    bgGradient: 'from-orange-500/20 to-red-500/10',
    borderColor: 'border-orange-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]',
    iconBg: 'bg-gradient-to-br from-orange-500 to-red-500',
    iconText: 'text-white font-bold',
  },
  {
    name: 'Scala',
    slug: 'scala',
    icon: 'Sc',
    bgGradient: 'from-red-500/20 to-red-600/10',
    borderColor: 'border-red-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]',
    iconBg: 'bg-red-600',
    iconText: 'text-white font-bold',
  },
  {
    name: 'R',
    slug: 'r',
    icon: 'R',
    bgGradient: 'from-blue-400/20 to-gray-500/10',
    borderColor: 'border-blue-400/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(96,165,250,0.4)]',
    iconBg: 'bg-blue-500',
    iconText: 'text-white font-bold',
  },
  {
    name: 'Perl',
    slug: 'perl',
    icon: 'Pl',
    bgGradient: 'from-indigo-400/20 to-blue-500/10',
    borderColor: 'border-indigo-400/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(129,140,248,0.4)]',
    iconBg: 'bg-indigo-500',
    iconText: 'text-white font-bold',
  },
  {
    name: 'Lua',
    slug: 'lua',
    icon: 'Lu',
    bgGradient: 'from-blue-800/20 to-blue-900/10',
    borderColor: 'border-blue-800/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(30,64,175,0.4)]',
    iconBg: 'bg-blue-800',
    iconText: 'text-white font-bold',
  },
  {
    name: 'Haskell',
    slug: 'haskell',
    icon: 'λ',
    bgGradient: 'from-purple-600/20 to-purple-700/10',
    borderColor: 'border-purple-600/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(147,51,234,0.4)]',
    iconBg: 'bg-purple-700',
    iconText: 'text-white font-bold text-2xl',
  },
  {
    name: 'Elixir',
    slug: 'elixir',
    icon: 'Ex',
    bgGradient: 'from-purple-500/20 to-violet-600/10',
    borderColor: 'border-purple-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]',
    iconBg: 'bg-gradient-to-br from-purple-500 to-violet-600',
    iconText: 'text-white font-bold',
  },
  {
    name: 'Dart',
    slug: 'dart',
    icon: 'Da',
    bgGradient: 'from-cyan-400/20 to-blue-500/10',
    borderColor: 'border-cyan-400/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]',
    iconBg: 'bg-gradient-to-br from-cyan-400 to-blue-500',
    iconText: 'text-white font-bold',
  },
  {
    name: 'Clojure',
    slug: 'clojure',
    icon: 'Clj',
    bgGradient: 'from-green-500/20 to-teal-600/10',
    borderColor: 'border-green-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]',
    iconBg: 'bg-gradient-to-br from-green-500 to-teal-600',
    iconText: 'text-white font-bold text-sm',
  },
  // Database languages
  {
    name: 'PostgreSQL',
    slug: 'postgresql',
    icon: 'PG',
    bgGradient: 'from-sky-500/20 to-sky-600/10',
    borderColor: 'border-sky-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(14,165,233,0.4)]',
    iconBg: 'bg-sky-600',
    iconText: 'text-white font-bold',
  },
  {
    name: 'MySQL',
    slug: 'mysql',
    icon: 'MY',
    bgGradient: 'from-orange-500/20 to-orange-600/10',
    borderColor: 'border-orange-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]',
    iconBg: 'bg-orange-500',
    iconText: 'text-white font-bold',
  },
  {
    name: 'MongoDB',
    slug: 'mongodb',
    icon: 'MG',
    bgGradient: 'from-green-500/20 to-green-600/10',
    borderColor: 'border-green-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]',
    iconBg: 'bg-green-600',
    iconText: 'text-white font-bold',
  },
];

// Shared SVG props for mode icons
const modeIconProps = {
  viewBox: '0 0 24 24',
  className: 'w-8 h-8',
  'aria-hidden': true as const,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const modes = [
  {
    name: 'Drill Mode',
    icon: (
      <svg {...modeIconProps}>
        <title>Drill Mode</title>
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M7 8l4 4-4 4" />
        <path d="M13 16h4" />
      </svg>
    ),
    description:
      'Practice method implementations with guided exercises. Build muscle memory through repetition.',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    border: 'border-emerald-500/30',
  },
  {
    name: 'Quiz Mode',
    icon: (
      <svg {...modeIconProps}>
        <title>Quiz Mode</title>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    description:
      'Test your knowledge with multiple choice questions. Identify gaps in your understanding.',
    gradient: 'from-amber-500/20 to-orange-500/10',
    border: 'border-amber-500/30',
  },
  {
    name: 'Reference Mode',
    icon: (
      <svg {...modeIconProps}>
        <title>Reference Mode</title>
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z" />
      </svg>
    ),
    description:
      'Browse comprehensive documentation and examples. Quick lookup for syntax and patterns.',
    gradient: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/30',
  },
  {
    name: 'Interview Mode',
    icon: (
      <svg {...modeIconProps}>
        <title>Interview Mode</title>
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
    description:
      'Practice with an AI interviewer. Get real-time feedback and hints as you solve coding problems.',
    gradient: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-500/30',
  },
  {
    name: 'Regex Trainer',
    icon: (
      <svg {...modeIconProps}>
        <title>Regex Trainer</title>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M8 9h6" />
        <path d="M8 13h4" />
      </svg>
    ),
    description:
      'Master regular expressions with live pattern matching. Drill, practice, or experiment in the playground.',
    gradient: 'from-emerald-500/20 to-green-500/10',
    border: 'border-emerald-500/30',
  },
];

export default function Home() {
  const problemCounts = getProblemCountByLanguage();
  const totalProblems = Object.values(problemCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-mesh">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow delay-500" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-cyan-500/5 to-transparent blur-2xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16">
          {/* Main Title */}
          <div className="text-center space-y-6 animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              <span className="gradient-text">Coding Drills</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto animate-fade-in-up delay-100">
              Your complete coding interview prep toolkit
            </p>

            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed animate-fade-in-up delay-200">
              Practice {totalProblems.toLocaleString()}+ problems across 24 languages. Build muscle
              memory with drills, test yourself with quizzes, study cheatsheets, and rehearse with
              AI mock interviews.
            </p>

            {/* CTA Arrow */}
            <div className="pt-8 animate-fade-in-up delay-300">
              <div className="animate-float">
                <svg
                  className="w-8 h-8 mx-auto text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Language Selection Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-3 text-gray-100 animate-fade-in-up delay-400">
          Choose Your Language
        </h2>
        <p className="text-gray-500 text-center mb-8 animate-fade-in-up delay-500">
          Select a programming language to start practicing
        </p>

        <LanguageGrid languages={languages} problemCounts={problemCounts} />
      </section>

      {/* AI Mock Interview Quick Access */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 p-8 md:p-12">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Left: Icon and Title */}
              <div className="text-center md:text-left flex-1">
                <div className="text-cyan-400 mb-4">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-16 h-16"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-3">
                  AI Mock Interview
                </h2>
                <p className="text-gray-400 max-w-lg mb-2">
                  Practice coding interviews with an AI interviewer. Get real-time feedback, hints,
                  and improve your problem-solving skills.
                </p>
                <p className="text-gray-500 text-sm">
                  Language-agnostic algorithm problems • Focus on problem-solving patterns
                </p>
              </div>

              {/* Right: Start Button */}
              <div className="flex-shrink-0">
                <Link
                  href="/interview"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500
                             text-white font-semibold text-lg transition-all duration-200
                             shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 cursor-pointer"
                >
                  <span>Start Interview</span>
                  <svg
                    className="w-5 h-5"
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
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regex Trainer Quick Access */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-teal-500/10 p-8 md:p-12">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Left: Icon and Title */}
              <div className="text-center md:text-left flex-1">
                <div className="text-emerald-400 mb-4">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-16 h-16"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.35-4.35" />
                    <path d="M8 9h6" />
                    <path d="M8 13h4" />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-3">Regex Trainer</h2>
                <p className="text-gray-400 max-w-lg mb-2">
                  Master regular expressions with interactive challenges. Practice live pattern
                  matching, drill under time pressure, or experiment freely in the playground.
                </p>
                <p className="text-gray-500 text-sm">
                  {getRegexProblemCount()} patterns &middot; Drill &middot; Practice &middot;
                  Playground
                </p>
              </div>

              {/* Right: Start Button */}
              <div className="flex-shrink-0">
                <Link
                  href="/regex"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500
                             text-white font-semibold text-lg transition-all duration-200
                             shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 cursor-pointer"
                >
                  <span>Start Training</span>
                  <svg
                    className="w-5 h-5"
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
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mode Selection Preview */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-3 text-gray-100">
          Learning Modes
        </h2>
        <p className="text-gray-500 text-center mb-10">
          Multiple ways to master your chosen language
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modes.map((mode) => (
            <div
              key={mode.name}
              className={`
                relative overflow-hidden rounded-2xl border ${mode.border}
                bg-gradient-to-br ${mode.gradient} backdrop-blur-sm
                p-6 card-hover
              `}
            >
              {/* Mode Icon */}
              <div className="text-gray-300 mb-3">{mode.icon}</div>

              {/* Mode Name */}
              <h3 className="text-lg font-semibold text-gray-100 mb-2">{mode.name}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">{mode.description}</p>

              {/* Decorative corner glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            </div>
          ))}
        </div>
      </section>

      {/* Features Preview */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            {
              stat: '21',
              label: 'Languages',
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              ),
            },
            {
              stat: `${totalProblems.toLocaleString()}+`,
              label: 'Problems',
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              ),
            },
            {
              stat: '∞',
              label: 'Practice',
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 4v6h-6" />
                  <path d="M1 20v-6h6" />
                  <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                </svg>
              ),
            },
            {
              stat: 'Free',
              label: 'Open Source',
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              ),
            },
          ].map((item) => (
            <div key={item.label} className="p-6">
              <div className="text-gray-400 mb-2 flex justify-center">{item.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-gray-100">{item.stat}</div>
              <div className="text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold gradient-text">Coding Drills</span>
            </div>

            <p className="text-gray-500 text-sm text-center">
              Built for developers who believe in the power of practice.
            </p>

            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <span>Made with</span>
              <span className="text-red-500">♥</span>
              <span>using Next.js</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800/30 text-center text-gray-600 text-xs">
            © {new Date().getFullYear()} Coding Drills. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
