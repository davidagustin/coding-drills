import { LanguageGrid } from '@/components/LanguageGrid';
import { getProblemCountByLanguage } from '@/lib/problems/index';

const languages = [
  {
    name: 'JavaScript',
    subtitle: '+ TypeScript in Drill Mode',
    slug: 'javascript',
    icon: 'JS',
    emoji: null,
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
    emoji: null,
    bgGradient: 'from-blue-500/20 to-blue-600/10',
    borderColor: 'border-blue-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]',
    iconBg: 'bg-blue-600',
    iconText: 'text-white font-bold',
  },
  {
    name: 'Python',
    slug: 'python',
    icon: null,
    emoji: '🐍',
    bgGradient: 'from-blue-500/20 via-yellow-500/10 to-blue-600/10',
    borderColor: 'border-blue-400/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]',
    iconBg: 'bg-gradient-to-br from-blue-500 to-yellow-400',
    iconText: 'text-white',
  },
  {
    name: 'Java',
    slug: 'java',
    icon: null,
    emoji: '☕',
    bgGradient: 'from-red-500/20 to-orange-500/10',
    borderColor: 'border-red-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]',
    iconBg: 'bg-gradient-to-br from-red-500 to-orange-500',
    iconText: 'text-white',
  },
  {
    name: 'C++',
    slug: 'cpp',
    icon: '</>',
    emoji: null,
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
    emoji: null,
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
    emoji: null,
    bgGradient: 'from-cyan-500/20 to-cyan-600/10',
    borderColor: 'border-cyan-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]',
    iconBg: 'bg-cyan-500',
    iconText: 'text-white font-bold',
  },
  {
    name: 'Ruby',
    slug: 'ruby',
    icon: null,
    emoji: '💎',
    bgGradient: 'from-red-600/20 to-red-700/10',
    borderColor: 'border-red-600/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]',
    iconBg: 'bg-red-600',
    iconText: 'text-white',
  },
  {
    name: 'C',
    slug: 'c',
    icon: 'C',
    emoji: null,
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
    emoji: null,
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
    emoji: null,
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
    icon: null,
    emoji: '🦀',
    bgGradient: 'from-orange-600/20 to-red-700/10',
    borderColor: 'border-orange-600/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(234,88,12,0.4)]',
    iconBg: 'bg-gradient-to-br from-orange-600 to-red-700',
    iconText: 'text-white',
  },
  {
    name: 'Swift',
    slug: 'swift',
    icon: null,
    emoji: '🐦',
    bgGradient: 'from-orange-500/20 to-red-500/10',
    borderColor: 'border-orange-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]',
    iconBg: 'bg-gradient-to-br from-orange-500 to-red-500',
    iconText: 'text-white',
  },
  {
    name: 'Scala',
    slug: 'scala',
    icon: 'Sc',
    emoji: null,
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
    emoji: null,
    bgGradient: 'from-blue-400/20 to-gray-500/10',
    borderColor: 'border-blue-400/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(96,165,250,0.4)]',
    iconBg: 'bg-blue-500',
    iconText: 'text-white font-bold',
  },
  {
    name: 'Perl',
    slug: 'perl',
    icon: null,
    emoji: '🐪',
    bgGradient: 'from-indigo-400/20 to-blue-500/10',
    borderColor: 'border-indigo-400/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(129,140,248,0.4)]',
    iconBg: 'bg-indigo-500',
    iconText: 'text-white',
  },
  {
    name: 'Lua',
    slug: 'lua',
    icon: null,
    emoji: '🌙',
    bgGradient: 'from-blue-800/20 to-blue-900/10',
    borderColor: 'border-blue-800/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(30,64,175,0.4)]',
    iconBg: 'bg-blue-800',
    iconText: 'text-white',
  },
  {
    name: 'Haskell',
    slug: 'haskell',
    icon: 'λ',
    emoji: null,
    bgGradient: 'from-purple-600/20 to-purple-700/10',
    borderColor: 'border-purple-600/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(147,51,234,0.4)]',
    iconBg: 'bg-purple-700',
    iconText: 'text-white font-bold text-2xl',
  },
  {
    name: 'Elixir',
    slug: 'elixir',
    icon: null,
    emoji: '💧',
    bgGradient: 'from-purple-500/20 to-violet-600/10',
    borderColor: 'border-purple-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]',
    iconBg: 'bg-gradient-to-br from-purple-500 to-violet-600',
    iconText: 'text-white',
  },
  {
    name: 'Dart',
    slug: 'dart',
    icon: null,
    emoji: '🎯',
    bgGradient: 'from-cyan-400/20 to-blue-500/10',
    borderColor: 'border-cyan-400/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]',
    iconBg: 'bg-gradient-to-br from-cyan-400 to-blue-500',
    iconText: 'text-white',
  },
  {
    name: 'Clojure',
    slug: 'clojure',
    icon: null,
    emoji: '☯',
    bgGradient: 'from-green-500/20 to-teal-600/10',
    borderColor: 'border-green-500/30',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]',
    iconBg: 'bg-gradient-to-br from-green-500 to-teal-600',
    iconText: 'text-white',
  },
];

const modes = [
  {
    name: 'Drill Mode',
    icon: '🎯',
    description:
      'Practice method implementations with guided exercises. Build muscle memory through repetition.',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    border: 'border-emerald-500/30',
  },
  {
    name: 'Quiz Mode',
    icon: '🧠',
    description:
      'Test your knowledge with multiple choice questions. Identify gaps in your understanding.',
    gradient: 'from-amber-500/20 to-orange-500/10',
    border: 'border-amber-500/30',
  },
  {
    name: 'Reference Mode',
    icon: '📚',
    description:
      'Browse comprehensive documentation and examples. Quick lookup for syntax and patterns.',
    gradient: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/30',
  },
  {
    name: 'Interview Mode',
    icon: '🤖',
    description:
      'Practice with an AI interviewer. Get real-time feedback and hints as you solve coding problems.',
    gradient: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-500/30',
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
              Practice {totalProblems.toLocaleString()}+ problems across 21 languages. Build muscle
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

      {/* Mode Selection Preview */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-3 text-gray-100">
          Learning Modes
        </h2>
        <p className="text-gray-500 text-center mb-10">
          Multiple ways to master your chosen language
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {modes.map((mode) => (
            <div
              key={mode.name}
              className={`
                relative overflow-hidden rounded-2xl border ${mode.border}
                bg-gradient-to-br ${mode.gradient} backdrop-blur-sm
                p-6 md:p-8 card-hover
              `}
            >
              {/* Mode Icon */}
              <div className="text-4xl md:text-5xl mb-4">{mode.icon}</div>

              {/* Mode Name */}
              <h3 className="text-xl font-semibold text-gray-100 mb-3">{mode.name}</h3>

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
            { stat: '21', label: 'Languages', icon: '🌐' },
            { stat: `${totalProblems.toLocaleString()}+`, label: 'Problems', icon: '⚡' },
            { stat: '∞', label: 'Practice', icon: '🔄' },
            { stat: 'Free', label: 'Forever', icon: '✨' },
          ].map((item) => (
            <div key={item.label} className="p-6">
              <div className="text-3xl mb-2">{item.icon}</div>
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
              <span>and Next.js</span>
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
