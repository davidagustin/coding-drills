'use client';

import { useMemo, useState } from 'react';

interface LivePreviewProps {
  html: string;
  css: string;
  js: string;
  framework?: 'native-js' | 'react' | 'angular' | 'vue';
  height?: number;
}

export function LivePreview({
  html,
  css,
  js,
  framework = 'native-js',
  height = 400,
}: LivePreviewProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'html' | 'css' | 'js'>('preview');

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
    return `<!DOCTYPE html>
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
    ${css}
  </style>
  ${frameworkScripts}
</head>
<body>
  ${html}
  <script type="${scriptType}">
    ${js}
  </script>
</body>
</html>`;
  }, [html, css, js, frameworkScripts, scriptType]);

  const tabs = [
    { id: 'preview' as const, label: 'Preview' },
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

  const codeContent: Record<string, string> = {
    html,
    css,
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
        <div className="overflow-auto" style={{ height }}>
          <pre className="p-4 text-sm text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
            <code>{codeContent[activeTab]}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
