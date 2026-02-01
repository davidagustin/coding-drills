'use client';

import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  type CheatsheetContentBlock,
  type CheatsheetSection,
  type CheatsheetSectionId,
  FRAMEWORK_CONFIG,
  type FrameworkId,
  getCheatsheet,
  isValidFramework,
} from '@/lib/frontend-drills';

// Lazy-load CodeEditor so Monaco only loads when an interactive section is expanded
const CodeEditor = dynamic(() => import('@/components/CodeEditor'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-48 bg-zinc-900/50 rounded-lg border border-zinc-700/50">
      <div className="flex items-center gap-3 text-zinc-400">
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-zinc-600 border-t-zinc-300" />
        <span className="text-sm">Loading editor...</span>
      </div>
    </div>
  ),
});

// ─── Icon Components ─────────────────────────────────────────

function ChevronIcon({ className = 'w-4 h-4', open }: { className?: string; open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`${className} transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

function ResetIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
      />
    </svg>
  );
}

function MenuIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

function SectionIcon({
  id,
  className = 'w-5 h-5',
}: {
  id: CheatsheetSectionId;
  className?: string;
}) {
  switch (id) {
    case 'overview':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={className}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
          />
          <rect x="9" y="3" width="6" height="4" rx="1" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 14h6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 18h4" />
        </svg>
      );
    case 'core-concepts':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={className}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="2" />
          <ellipse cx="12" cy="12" rx="9" ry="4" />
          <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)" />
        </svg>
      );
    case 'key-apis':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={className}
          aria-hidden="true"
        >
          <circle cx="8" cy="15" r="5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.5 11.5L21 2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7l2-2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 5l2 2" />
        </svg>
      );
    case 'common-patterns':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={className}
          aria-hidden="true"
        >
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case 'code-examples':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={className}
          aria-hidden="true"
        >
          <rect x="2" y="3" width="20" height="18" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 8l4 4-4 4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h4" />
        </svg>
      );
    case 'ecosystem':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={className}
          aria-hidden="true"
        >
          <circle cx="12" cy="5" r="2.5" />
          <circle cx="5" cy="19" r="2.5" />
          <circle cx="19" cy="19" r="2.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5v4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17.5l3.5-6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 17.5l-3.5-6" />
        </svg>
      );
    default:
      return null;
  }
}

// ─── Content Block Components ────────────────────────────────

function TextBlock({ content }: { content: string }) {
  return <p className="text-zinc-300 leading-relaxed">{content}</p>;
}

function SubheadingBlock({ text }: { text: string }) {
  return <h4 className="text-lg font-semibold text-white mt-6 mb-2">{text}</h4>;
}

function StaticCodeBlock({
  code,
  title,
  language,
}: {
  code: string;
  title?: string;
  language: string;
}) {
  return (
    <div className="rounded-lg border border-zinc-700/40 overflow-hidden shadow-sm shadow-black/10">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/80 border-b border-zinc-700/50">
          <span className="text-xs font-medium text-zinc-400">{title}</span>
          <span className="text-xs text-zinc-500">{language}</span>
        </div>
      )}
      <pre className="overflow-x-auto p-4 bg-zinc-900/80 text-sm leading-relaxed">
        <code className="text-zinc-300 font-mono">{code}</code>
      </pre>
    </div>
  );
}

function InteractiveCodeExample({
  defaultCode,
  title,
  description,
  language,
  isExpanded,
}: {
  defaultCode: string;
  title: string;
  description?: string;
  language: string;
  isExpanded: boolean;
}) {
  const [code, setCode] = useState(defaultCode);
  const handleReset = useCallback(() => setCode(defaultCode), [defaultCode]);

  // Only render Monaco when the parent section is expanded
  if (!isExpanded) return null;

  // Map cheatsheet language string to CodeEditor's LanguageId + Monaco override
  const editorLanguage = 'javascript' as const;
  const monacoOverride =
    language === 'html' ? 'html' : language === 'typescript' ? 'typescript' : undefined;

  return (
    <div className="rounded-lg border border-zinc-700/40 overflow-hidden shadow-md shadow-black/20">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/80 border-b border-zinc-700/50">
        <div>
          <span className="text-sm font-medium text-white">{title}</span>
          {description && <p className="text-xs text-zinc-400 mt-0.5">{description}</p>}
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-700/50 hover:bg-zinc-700 rounded-md transition-colors"
          title="Reset to original code"
        >
          <ResetIcon className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>
      <CodeEditor
        code={code}
        onChange={setCode}
        language={editorLanguage}
        monacoLanguageOverride={monacoOverride}
        height="240px"
        minHeight={200}
        lineNumbers
      />
    </div>
  );
}

function ListBlock({ style, items }: { style: 'bullet' | 'numbered'; items: string[] }) {
  const Tag = style === 'numbered' ? 'ol' : 'ul';
  return (
    <Tag
      className={`space-y-1.5 ${style === 'numbered' ? 'list-decimal' : 'list-disc'} list-inside text-zinc-300`}
    >
      {items.map((item, i) => (
        <li key={i} className="leading-relaxed">
          {item}
        </li>
      ))}
    </Tag>
  );
}

function TableBlock({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-700/40 shadow-sm shadow-black/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-zinc-800/90 border-b border-zinc-700/40">
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left px-4 py-2.5 text-zinc-300 font-medium whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className="border-b border-zinc-800/50 last:border-b-0 hover:bg-zinc-800/30"
            >
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-2.5 text-zinc-400">
                  <code className="text-xs bg-zinc-800/50 px-1 py-0.5 rounded font-mono">
                    {cell}
                  </code>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TipBlock({ content }: { content: string }) {
  return (
    <div className="flex gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 shadow-sm shadow-emerald-900/10">
      <span className="text-emerald-400 text-lg flex-shrink-0" aria-hidden="true">
        💡
      </span>
      <p className="text-emerald-200/90 text-sm leading-relaxed">{content}</p>
    </div>
  );
}

function WarningBlock({ content }: { content: string }) {
  return (
    <div className="flex gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 shadow-sm shadow-amber-900/10">
      <span className="text-amber-400 text-lg flex-shrink-0" aria-hidden="true">
        ⚠️
      </span>
      <p className="text-amber-200/90 text-sm leading-relaxed">{content}</p>
    </div>
  );
}

// ─── Content Block Renderer ──────────────────────────────────

function ContentBlockRenderer({
  block,
  isExpanded,
}: {
  block: CheatsheetContentBlock;
  isExpanded: boolean;
}) {
  switch (block.type) {
    case 'text':
      return <TextBlock content={block.content} />;
    case 'code':
      return <StaticCodeBlock code={block.code} title={block.title} language={block.language} />;
    case 'interactive-code':
      return (
        <InteractiveCodeExample
          defaultCode={block.defaultCode}
          title={block.title}
          description={block.description}
          language={block.language}
          isExpanded={isExpanded}
        />
      );
    case 'list':
      return <ListBlock style={block.style} items={block.items} />;
    case 'table':
      return <TableBlock headers={block.headers} rows={block.rows} />;
    case 'tip':
      return <TipBlock content={block.content} />;
    case 'warning':
      return <WarningBlock content={block.content} />;
    case 'subheading':
      return <SubheadingBlock text={block.text} />;
    default: {
      // Exhaustive check — TypeScript will error if a block type is unhandled
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

// ─── Cheatsheet Section ──────────────────────────────────────

function CheatsheetSectionComponent({
  section,
  isExpanded,
  onToggle,
  config,
}: {
  section: CheatsheetSection;
  isExpanded: boolean;
  onToggle: () => void;
  config: (typeof FRAMEWORK_CONFIG)[FrameworkId];
}) {
  return (
    <section id={section.id} className="scroll-mt-24">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-700/40 hover:bg-zinc-800/60 hover:border-zinc-600/50 hover:shadow-lg hover:shadow-black/20 transition-all duration-200 group text-left"
      >
        <ChevronIcon
          className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300 flex-shrink-0"
          open={isExpanded}
        />
        <SectionIcon
          id={section.id}
          className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors flex-shrink-0"
        />
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-white">{section.title}</h3>
          <p className="text-sm text-zinc-400">{section.description}</p>
        </div>
      </button>

      {isExpanded && (
        <div className={`mt-3 ml-4 pl-6 border-l-2 ${config.borderColor} space-y-5 pb-4`}>
          {section.content.map((block, i) => (
            <ContentBlockRenderer key={i} block={block} isExpanded={isExpanded} />
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Table of Contents ───────────────────────────────────────

function TableOfContents({
  sections,
  activeSection,
  config,
}: {
  sections: CheatsheetSection[];
  activeSection: CheatsheetSectionId | null;
  config: (typeof FRAMEWORK_CONFIG)[FrameworkId];
}) {
  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-xl bg-zinc-900/40 border border-zinc-800/60 p-4"
    >
      <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
        Contents
      </h2>
      <ul className="space-y-1">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => handleClick(section.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                  isActive
                    ? `${config.bgColor} ${config.color} font-medium`
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                <SectionIcon id={section.id} className="w-4 h-4 flex-shrink-0" />
                {section.title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ─── Mobile TOC Dropdown ─────────────────────────────────────

function MobileTOC({
  sections,
  activeSection,
  config,
}: {
  sections: CheatsheetSection[];
  activeSection: CheatsheetSectionId | null;
  config: (typeof FRAMEWORK_CONFIG)[FrameworkId];
}) {
  const [open, setOpen] = useState(false);

  const handleClick = useCallback((id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const current = sections.find((s) => s.id === activeSection);

  return (
    <div className="lg:hidden mb-6">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-700/50"
      >
        <div className="flex items-center gap-2">
          <MenuIcon className="w-5 h-5 text-zinc-400" />
          {current && <SectionIcon id={current.id} className="w-4 h-4 text-zinc-300" />}
          <span className="text-sm text-zinc-300">{current ? current.title : 'Contents'}</span>
        </div>
        <ChevronIcon className={`w-4 h-4 text-zinc-400 ${open ? 'rotate-90' : ''}`} open={open} />
      </button>

      {open && (
        <div className="mt-2 p-2 rounded-xl bg-zinc-900/95 border border-zinc-700/40 backdrop-blur-md shadow-xl shadow-black/30">
          <ul className="space-y-1">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => handleClick(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                      isActive
                        ? `${config.bgColor} ${config.color} font-medium`
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                    }`}
                  >
                    <SectionIcon id={section.id} className="w-4 h-4 flex-shrink-0" />
                    {section.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Cheatsheet Header ───────────────────────────────────────

function CheatsheetHeader({
  config,
  title,
  lastUpdated,
}: {
  config: (typeof FRAMEWORK_CONFIG)[FrameworkId];
  title: string;
  lastUpdated: string;
}) {
  return (
    <div className="mb-8 pb-6 border-b border-zinc-800/60">
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${config.bgColor} ${config.borderColor} border`}
        >
          <span className={`text-2xl font-bold ${config.color}`}>{config.icon}</span>
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{title}</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-sm text-zinc-400">Quick reference</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-700/50 text-zinc-400 border border-zinc-600/50">
              Updated {lastUpdated}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page Component ─────────────────────────────────────

export default function CheatsheetPage() {
  const params = useParams();
  const router = useRouter();
  const framework = params.framework as string;
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<CheatsheetSectionId | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Track mount state for hydration safety
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for hydration safety
    setMounted(true);
  }, []);

  // Validate framework
  useEffect(() => {
    if (!mounted) return;
    if (!isValidFramework(framework)) {
      router.replace('/not-found');
    }
  }, [framework, router, mounted]);

  // Get cheatsheet data
  const cheatsheet = useMemo(() => {
    if (!mounted || !isValidFramework(framework)) return null;
    return getCheatsheet(framework);
  }, [framework, mounted]);

  // Track collapsed sections (inverted — all expanded by default)
  const [collapsedSections, setCollapsedSections] = useState<Set<CheatsheetSectionId>>(new Set());

  // Scroll spy with IntersectionObserver + bottom-of-page fallback
  useEffect(() => {
    if (!cheatsheet || !mounted) return;

    const lastSectionId = cheatsheet.sections[cheatsheet.sections.length - 1]?.id;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as CheatsheetSectionId);
          }
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      },
    );

    // When scrolled near the bottom, force the last section active since
    // the IntersectionObserver hot-zone can never reach the final section.
    function handleScroll() {
      if (!lastSectionId) return;
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (nearBottom) {
        setActiveSection(lastSectionId);
      }
    }

    // Observe each section element
    const timer = setTimeout(() => {
      for (const section of cheatsheet.sections) {
        const el = document.getElementById(section.id);
        if (el) {
          observer.observe(el);
          sectionRefs.current.set(section.id, el);
        }
      }
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [cheatsheet, mounted]);

  const toggleSection = useCallback((id: CheatsheetSectionId) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  if (!mounted || !cheatsheet) return null;

  const config = FRAMEWORK_CONFIG[framework as FrameworkId];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <CheatsheetHeader
        config={config}
        title={cheatsheet.title}
        lastUpdated={cheatsheet.lastUpdated}
      />

      {/* Mobile TOC */}
      <MobileTOC sections={cheatsheet.sections} activeSection={activeSection} config={config} />

      {/* Two-column layout */}
      <div className="flex gap-8">
        {/* Desktop Sidebar TOC */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <TableOfContents
              sections={cheatsheet.sections}
              activeSection={activeSection}
              config={config}
            />

            {/* Expand/Collapse all */}
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setCollapsedSections(new Set())}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Expand all
              </button>
              <span className="text-zinc-700">|</span>
              <button
                type="button"
                onClick={() => setCollapsedSections(new Set(cheatsheet.sections.map((s) => s.id)))}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Collapse all
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 space-y-6">
          {cheatsheet.sections.map((section) => (
            <CheatsheetSectionComponent
              key={section.id}
              section={section}
              isExpanded={!collapsedSections.has(section.id)}
              onToggle={() => toggleSection(section.id)}
              config={config}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
