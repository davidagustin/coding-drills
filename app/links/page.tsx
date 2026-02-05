import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Other Projects - Coding Drills',
  description:
    'Explore more learning tools and practice platforms for system design, coding challenges, UI patterns, React, and AI/ML.',
};

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  stats?: string;
}

const projects: Project[] = [
  {
    title: 'Backend Engineer Detective',
    description:
      'An interactive detective game where you investigate real-world backend engineering incidents. Analyze logs, metrics, code, and testimonies to diagnose root causes across database, caching, networking, auth, memory, and distributed systems — with an AI mentor to guide your investigation using Socratic questioning.',
    tags: ['Backend', 'System Design', 'Debugging', 'AI Mentor', 'Cloudflare Workers'],
    githubUrl: 'https://github.com/davidagustin/backend-engineer-detective',
    liveUrl: 'https://backend-engineer-detective.davidsyagustin.workers.dev',
    stats: '22 cases, 6 categories, Junior → Principal difficulty',
  },
  {
    title: 'Coding Tricks Practice',
    description:
      'A LeetCode-style coding platform focused on JavaScript and TypeScript mastery. Features 155+ challenges across 19 categories with a Monaco Editor integration, sandboxed test runner, progress tracking, and real-time code validation.',
    tags: ['JavaScript', 'TypeScript', 'LeetCode-style', 'Monaco Editor'],
    githubUrl: 'https://github.com/davidagustin/coding-tricks-practice',
    liveUrl: 'https://coding-tricks-practice.vercel.app',
    stats: '155+ problems, 19 categories, 40+ test suites',
  },
  {
    title: 'UI Patterns React',
    description:
      'Production-ready collection of 90+ modern React UI patterns and components. Includes interactive event calendars, advanced data tables, drag-and-drop interfaces, form patterns, navigation systems, and data visualizations — all with TypeScript and accessibility compliance.',
    tags: ['React', 'UI/UX', 'Components', 'WCAG 2.1 AA'],
    githubUrl: 'https://github.com/davidagustin/ui-patterns-react',
    liveUrl: 'https://ui-patterns-react.vercel.app/',
    stats: '90+ components, 5 pattern categories',
  },
  {
    title: 'System Design Practice',
    description:
      'Interactive learning platform for mastering system design interviews. Covers 50 study topics, 40 core concepts, and 60 quiz questions spanning load balancing, database replication, caching strategies, microservices, event-driven architecture, and more.',
    tags: ['System Design', 'Next.js', 'TypeScript', 'Interviews'],
    githubUrl: 'https://github.com/davidagustin/system-design-practice',
    liveUrl: 'https://system-design-practice.vercel.app/',
    stats: '50 topics, 40 concepts, 60 quiz questions',
  },
  {
    title: 'React 30',
    description:
      "Modern React reimagining of Wes Bos's JavaScript30 course. All 30 vanilla JS projects rebuilt as type-safe React components using Next.js, TypeScript, and Tailwind CSS — covering DOM manipulation, Canvas API, WebRTC, Speech Recognition, Geolocation, and more.",
    tags: ['React', 'JavaScript30', 'Web APIs', 'Next.js'],
    githubUrl: 'https://github.com/davidagustin/react-30',
    liveUrl: 'https://react-30-nu.vercel.app',
    stats: '30 interactive projects',
  },
  {
    title: 'AI Learning Hub',
    description:
      'Comprehensive AI and machine learning learning platform with interactive mnemonics, character-based learning, and quizzes. Covers core ML, deep learning, computer vision, NLP, transformers, reinforcement learning, MLOps, and responsible AI across 30+ sections with 1000+ quiz questions.',
    tags: ['AI/ML', 'Deep Learning', 'NLP', 'Quizzes'],
    githubUrl: 'https://github.com/davidagustin/comprehensive-ai-learning-app',
    liveUrl: 'https://comprehensive-ai-learning-app.vercel.app',
    stats: '30+ sections, 1000+ questions, 10+ categories',
  },
  {
    title: 'Rules of Machine Learning',
    description:
      "Interactive memorization app for Google's 43 Rules of Machine Learning Engineering. Features browse, study, and flashcard modes with category filtering, search, progress tracking, and sequential or randomized learning sessions.",
    tags: ['Machine Learning', 'Flashcards', 'Google ML Rules'],
    githubUrl: 'https://github.com/davidagustin/rules-of-machine-learning',
    liveUrl: 'https://rules-of-machine-learning.vercel.app',
    stats: '43 rules, 3 study modes, 12 categories',
  },
];

function GitHubIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
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
  );
}

function ArrowLeftIcon() {
  return (
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
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </svg>
  );
}

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeftIcon />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Other Projects</h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            More learning tools and practice platforms covering system design, coding challenges, UI
            patterns, React, and AI/ML.
          </p>
        </div>

        {/* Projects grid */}
        <div className="space-y-6">
          {projects.map((project) => (
            <article
              key={project.githubUrl}
              className="border border-zinc-800 rounded-xl bg-zinc-900/50 p-6 hover:border-zinc-700 transition-colors"
            >
              <div className="flex flex-col gap-4">
                {/* Title and links row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <h2 className="text-xl font-semibold text-white">{project.title}</h2>
                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      <GitHubIcon />
                      <span>GitHub</span>
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        <ExternalLinkIcon />
                        <span>Visit</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-400 leading-relaxed">{project.description}</p>

                {/* Stats */}
                {project.stats && <p className="text-sm text-zinc-500">{project.stats}</p>}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
