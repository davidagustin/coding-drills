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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for hydration safety
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-pulse text-slate-500">Loading pattern...</div>
      </div>
    );
  }

  if (!isValidFramework(framework)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
          <h1 className="text-2xl font-bold mb-4">Framework not found</h1>
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
          <h1 className="text-2xl font-bold mb-4">Pattern not found</h1>
          <p className="text-slate-400 mb-6">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Breadcrumbs and Exit Button */}
        <div className="flex items-center justify-between mb-8">
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
            className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50 flex-shrink-0"
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

        {/* Hero Section */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
            Build Challenge
          </p>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {pattern.title}
          </h1>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span
              className={`text-sm px-3 py-1 rounded-full ${diffConfig.bgColor} ${diffConfig.color}`}
            >
              {diffConfig.name}
            </span>
            <span className="text-sm px-3 py-1 rounded-full bg-slate-700/50 text-slate-300">
              {categoryConfig.name}
            </span>
            <span
              className={`text-sm px-3 py-1 rounded-full ${frameworkConfig.bgColor} ${frameworkConfig.color}`}
            >
              {frameworkConfig.name}
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto">{pattern.description}</p>
        </div>

        {/* Live Demo Section */}
        {pattern.demoCode ? (
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
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
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">Live Demo</h2>
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 ml-auto">
                Interactive
              </span>
            </div>
            <LivePreview
              html={pattern.demoCode.html}
              css={pattern.demoCode.css}
              js={pattern.demoCode.js}
              framework={framework as FrameworkId}
              height={400}
            />
          </div>
        ) : (
          <div className="bg-slate-800/30 rounded-2xl p-8 border border-dashed border-slate-700/50 mb-6 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-slate-500"
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
            <p className="text-slate-500 text-sm">Live demo coming soon</p>
            <p className="text-slate-600 text-xs mt-1">
              Use the AI prompt below to build this pattern yourself
            </p>
          </div>
        )}

        {/* Building Blocks Section */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
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
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Building Blocks</h2>
            <span className="text-sm text-slate-500 ml-auto">
              {pattern.concepts.length} {pattern.concepts.length === 1 ? 'step' : 'steps'}
            </span>
          </div>

          <div className="space-y-3">
            {pattern.concepts.map((concept, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-slate-800/50 rounded-xl p-5 border border-slate-700/50"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${frameworkConfig.bgColor} ${frameworkConfig.color} flex items-center justify-center font-bold text-lg flex-shrink-0`}
                >
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold mb-1">{concept}</h3>
                  <p className="text-slate-400 text-sm">
                    {getImplementationHint(concept, frameworkConfig.name)}
                  </p>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-slate-600 flex-shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </div>

        {/* Build with AI Section */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
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
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Build with AI</h2>
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Copy this prompt to your favorite AI assistant to get step-by-step guidance building
            this pattern.
          </p>

          <div className="bg-slate-900 rounded-xl p-4 border border-slate-700/50 max-h-64 overflow-y-auto mb-4">
            <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
              {generatedPrompt}
            </pre>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition-all ${
              copied
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {copied ? 'Copied!' : 'Copy Prompt'}
          </button>
        </div>

        {/* Live Demo Link (optional) */}
        {pattern.externalUrl && (
          <div className="mb-6 text-center">
            <a
              href={pattern.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors"
            >
              View reference implementation
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
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
          </div>
        )}

        {/* Back to Patterns Button */}
        <div className="flex justify-center">
          <Link
            href={`/frontend-drills/${framework}/ui-patterns`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-all"
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
