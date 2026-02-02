'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';

const CodeEditor = dynamic(
  () => import('@/components/CodeEditor').then((mod) => mod.default || mod),
  { ssr: false },
);

/** Simple CSS formatter: expands single-line rules into readable multi-line */
function formatCSS(raw: string): string {
  // Split on } to handle each rule block
  return raw
    .replace(/\{([^}]+)\}/g, (_match, body: string) => {
      // Split properties by semicolons, trim, and indent
      const props = body
        .split(';')
        .map((p: string) => p.trim())
        .filter(Boolean)
        .map((p: string) => `  ${p};`)
        .join('\n');
      return `{\n${props}\n}`;
    })
    .replace(/\}\s*/g, '}\n\n')
    .trim();
}

interface LivePreviewProps {
  html: string;
  css: string;
  js: string;
  framework?: 'native-js' | 'react' | 'angular' | 'vue';
  height?: number;
  /** When provided, only these code tabs (plus Preview) are shown. Omit to show all tabs. */
  showCodeTabs?: ('html' | 'css' | 'js')[];
}

export function LivePreview({
  html,
  css,
  js,
  framework = 'native-js',
  height = 400,
  showCodeTabs,
}: LivePreviewProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'html' | 'css' | 'js'>('preview');
  const [copied, setCopied] = useState(false);

  const frameworkScripts = useMemo(() => {
    switch (framework) {
      case 'react':
        return `
          <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        `;
      case 'vue':
        return `<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>`;
      case 'angular':
        // Angular uses Zone.js for change detection in the preview
        return `<script src="https://unpkg.com/zone.js"></script>`;
      default:
        return '';
    }
  }, [framework]);

  const scriptType = framework === 'react' ? 'text/babel' : 'text/javascript';

  const srcdoc = useMemo(() => {
    // Use string concatenation for css/html/js to avoid breaking the
    // template literal when code contains backticks or ${...} expressions
    const head = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 16px;
      background: #0f172a;
      color: #e2e8f0;
      line-height: 1.6;
    }
    input, select, textarea, button {
      font-family: inherit;
      font-size: inherit;
    }
    `;
    const mid = `
  </style>
  ${frameworkScripts}
</head>
<body>
  `;
    const script = `
  <script type="${scriptType}">
    `;
    const tail = `
  </script>
</body>
</html>`;
    return head + css + mid + html + script + js + tail;
  }, [html, css, js, frameworkScripts, scriptType]);

  const allCodeTabs = [
    { id: 'html' as const, label: 'HTML' },
    { id: 'css' as const, label: 'CSS' },
    {
      id: 'js' as const,
      label:
        framework === 'react'
          ? 'JSX'
          : framework === 'vue'
            ? 'Vue'
            : framework === 'angular'
              ? 'TS'
              : 'JS',
    },
  ];

  const filteredCodeTabs = showCodeTabs
    ? allCodeTabs.filter((t) => showCodeTabs.includes(t.id))
    : allCodeTabs;

  const tabs = [{ id: 'preview' as const, label: 'Preview' }, ...filteredCodeTabs];

  const formattedCSS = useMemo(() => formatCSS(css), [css]);

  const codeContent: Record<string, string> = {
    html,
    css: formattedCSS,
    js,
  };

  return (
    <div className="rounded-xl border border-slate-700/50 overflow-hidden bg-slate-900">
      {/* Tab Bar */}
      <div className="flex border-b border-slate-700/50 bg-slate-800/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'text-white bg-slate-700/50 border-b-2 border-blue-500'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'preview' ? (
        <iframe
          srcDoc={srcdoc}
          sandbox="allow-scripts"
          title="Live preview"
          className="w-full border-0 bg-slate-900"
          style={{ height }}
        />
      ) : (
        <div className="relative" style={{ height }}>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(codeContent[activeTab]);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="absolute top-2 right-2 px-2.5 py-1 text-xs font-medium rounded-md bg-slate-700/80 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors cursor-pointer z-10"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <CodeEditor
            code={codeContent[activeTab]}
            onChange={() => {}}
            language="javascript"
            monacoLanguageOverride={
              activeTab === 'html'
                ? 'html'
                : activeTab === 'css'
                  ? 'css'
                  : framework === 'react'
                    ? 'typescript'
                    : 'javascript'
            }
            readOnly={true}
            lineNumbers={true}
            height={height}
            minHeight={100}
            className="border-0 !rounded-none"
          />
        </div>
      )}
    </div>
  );
}
