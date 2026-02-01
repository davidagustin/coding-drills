'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { LivePreview } from '@/components/LivePreview';
import {
  FRAMEWORK_CONFIG,
  type FrameworkId,
  getUIPatternById,
  isValidFramework,
  UI_PATTERN_CATEGORIES,
  UI_PATTERN_DIFFICULTY_CONFIG,
} from '@/lib/frontend-drills';

function getImplementationHint(concept: string, framework: string): string {
  const hints: Record<string, string> = {
    'form validation': 'Set up validation rules and error display logic',
    'state management': 'Design the component state structure and update flows',
    'error handling': 'Add error boundaries and user-friendly error messages',
    accessibility: 'Implement ARIA attributes, keyboard navigation, and screen reader support',
    'keyboard navigation': 'Handle arrow keys, Enter, Escape, and Tab for full keyboard control',
    debouncing: 'Add debounced handlers to prevent excessive API calls or re-renders',
    'focus management': 'Control focus flow between interactive elements',
    'aria attributes': 'Add proper roles, labels, and live regions for assistive technology',
    'visual feedback': 'Show loading states, success/error indicators, and transitions',
    'async operations': 'Handle promises, loading states, and error recovery',
    'drag and drop': 'Implement drag handlers, drop zones, and visual drag indicators',
    animation: 'Add smooth transitions and micro-interactions',
    'responsive design': 'Ensure the component works across all screen sizes',
    'event delegation': 'Use event bubbling to efficiently handle dynamic elements',
    'dom manipulation': 'Create, update, and remove DOM elements programmatically',
  };

  const lower = concept.toLowerCase();
  for (const [key, hint] of Object.entries(hints)) {
    if (lower.includes(key) || key.includes(lower)) return hint;
  }
  return `Implement ${concept} using ${framework} patterns and best practices`;
}

export default function UIPatternDetail() {
  const params = useParams();
  const framework = params.framework as string;
  const patternId = params.patternId as string;
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [aiPromptExpanded, setAiPromptExpanded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for hydration safety
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-pulse text-zinc-500">Loading pattern...</div>
      </div>
    );
  }

  if (!isValidFramework(framework)) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
          <h1 className="text-2xl font-bold mb-4">Framework Not Found</h1>
          <Link
            href="/frontend-drills"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Back to Frontend Drills
          </Link>
        </div>
      </div>
    );
  }

  const frameworkConfig = FRAMEWORK_CONFIG[framework];
  const pattern = getUIPatternById(framework, patternId);

  if (!pattern) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
          <h1 className="text-2xl font-bold mb-4">Pattern Not Found</h1>
          <p className="text-zinc-400 mb-6">
            The pattern you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
          <Link
            href={`/frontend-drills/${framework}/ui-patterns`}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to UI Patterns
          </Link>
        </div>
      </div>
    );
  }

  const diffConfig = UI_PATTERN_DIFFICULTY_CONFIG[pattern.difficulty];
  const categoryConfig = UI_PATTERN_CATEGORIES[pattern.category];

  const generatedPrompt = `Help me build a "${pattern.title}" UI component using ${frameworkConfig.name}.

## Requirements
${pattern.description}

## Key Concepts to Implement
${pattern.concepts.map((c, i) => `${i + 1}. ${c}`).join('\n')}

## Implementation Steps
Please guide me through building this step by step:
${pattern.concepts.map((c, i) => `${i + 1}. Implement ${c}`).join('\n')}${
  pattern.promptDescription
    ? `

## Additional Context
${pattern.promptDescription}`
    : ''
}

Please provide the complete working code with explanations for each step. Use modern ${frameworkConfig.name} best practices.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumbs and Exit Button */}
        <div className="flex items-center justify-between mb-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Frontend Drills', href: '/frontend-drills' },
              { label: frameworkConfig.name, href: `/frontend-drills/${framework}` },
              { label: 'UI Patterns', href: `/frontend-drills/${framework}/ui-patterns` },
              { label: pattern.title },
            ]}
            className="text-sm"
          />
          <Link
            href={`/frontend-drills/${framework}/ui-patterns`}
            className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50 flex-shrink-0"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              role="img"
              aria-label="Exit"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-sm font-medium">Exit</span>
          </Link>
        </div>

        {/* Compact Hero Section */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {pattern.title}
            </h1>
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full ${diffConfig.bgColor} ${diffConfig.color} whitespace-nowrap`}
            >
              {diffConfig.name}
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-700/50 text-zinc-300 whitespace-nowrap">
              {categoryConfig.name}
            </span>
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full ${frameworkConfig.bgColor} ${frameworkConfig.color} whitespace-nowrap`}
            >
              {frameworkConfig.name}
            </span>
          </div>
          <p className="text-zinc-400 text-base leading-relaxed max-w-3xl">{pattern.description}</p>
        </div>

        {/* Two-Column Layout: Live Demo (left ~60%) + Building Blocks (right ~40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* Live Demo Section - Takes 3 columns (60%) */}
          <div className="lg:col-span-3">
            {pattern.demoCode ? (
              <div className="bg-gradient-to-br from-emerald-950/40 via-zinc-900/60 to-zinc-900/80 rounded-3xl p-1.5 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 h-full">
                <div className="bg-zinc-900/90 rounded-2xl p-6 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-white">Live Demo</h2>
                      <p className="text-xs text-emerald-400/80">Interactive preview</p>
                    </div>
                    <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                      Running
                    </span>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-zinc-700/50 bg-zinc-950/50">
                    <LivePreview
                      html={pattern.demoCode.html}
                      css={pattern.demoCode.css}
                      js={pattern.demoCode.js}
                      framework={framework as FrameworkId}
                      height={480}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-800/20 rounded-3xl p-12 border-2 border-dashed border-zinc-700/40 h-full flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-20 h-20 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-5 rotate-3 shadow-xl">
                  <svg
                    className="w-10 h-10 text-zinc-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                    />
                  </svg>
                </div>
                <p className="text-zinc-500 text-lg font-medium mb-2">Live demo coming soon</p>
                <p className="text-zinc-600 text-sm max-w-xs">
                  Use the AI prompt below to build this pattern yourself and see it in action
                </p>
              </div>
            )}
          </div>

          {/* Building Blocks Section - Takes 2 columns (40%) */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-800/30 rounded-2xl p-5 border border-zinc-700/30 backdrop-blur-sm h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-white">Building Blocks</h2>
                  <p className="text-xs text-zinc-500">
                    {pattern.concepts.length} {pattern.concepts.length === 1 ? 'step' : 'steps'} to
                    master
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-zinc-800/50 scrollbar-thumb-zinc-700/50">
                {pattern.concepts.map((concept, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/30 hover:border-zinc-600/50 transition-all group"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg ${frameworkConfig.bgColor} ${frameworkConfig.color} flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-lg`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-blue-300 transition-colors">
                        {concept}
                      </h3>
                      <p className="text-zinc-500 text-xs leading-relaxed">
                        {getImplementationHint(concept, frameworkConfig.name)}
                      </p>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-zinc-600 flex-shrink-0 mt-0.5 group-hover:border-blue-500/50 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Build with AI Section - Full Width Below */}
        <div className="bg-gradient-to-r from-purple-950/20 via-zinc-900/40 to-blue-950/20 rounded-2xl border border-purple-500/10 overflow-hidden mb-8">
          <button
            type="button"
            onClick={() => setAiPromptExpanded(!aiPromptExpanded)}
            className="w-full flex items-center justify-between p-5 hover:bg-zinc-900/30 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  Build with AI
                </h2>
                <p className="text-zinc-400 text-sm">
                  Copy this prompt to your favorite AI assistant for step-by-step guidance
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy();
                }}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  copied
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {copied ? 'Copied!' : 'Copy Prompt'}
              </button>
              <svg
                className={`w-5 h-5 text-zinc-400 transition-transform ${aiPromptExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </button>

          {aiPromptExpanded && (
            <div className="px-5 pb-5">
              <div className="bg-zinc-950/80 rounded-xl p-5 border border-zinc-700/30 max-h-80 overflow-y-auto scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-700">
                <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono leading-relaxed">
                  {generatedPrompt}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer: External Link + Back Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-800/50">
          <div>
            {pattern.externalUrl && (
              <a
                href={pattern.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-blue-400 transition-colors group"
              >
                <svg
                  className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
                View reference implementation
              </a>
            )}
          </div>
          <Link
            href={`/frontend-drills/${framework}/ui-patterns`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 hover:border-zinc-600 transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Patterns
          </Link>
        </div>
      </div>
    </div>
  );
}
