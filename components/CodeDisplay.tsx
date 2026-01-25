'use client';

import Editor from '@monaco-editor/react';
import type { LanguageId } from '@/lib/types';

/**
 * Language ID to Monaco language mapping
 */
const LANGUAGE_TO_MONACO: Record<LanguageId, string> = {
  javascript: 'javascript',
  typescript: 'typescript',
  python: 'python',
  java: 'java',
  cpp: 'cpp',
  csharp: 'csharp',
  go: 'go',
  ruby: 'ruby',
  c: 'c',
  php: 'php',
  kotlin: 'kotlin',
  // New languages
  rust: 'rust',
  swift: 'swift',
  scala: 'scala',
  r: 'r',
  perl: 'perl',
  lua: 'lua',
  haskell: 'haskell',
  elixir: 'elixir',
  dart: 'dart',
  clojure: 'clojure',
};

interface CodeDisplayProps {
  /** The code content to display */
  code: string;
  /** Programming language for syntax highlighting */
  language: LanguageId;
  /** Height of the display (default: auto based on content) */
  height?: string | number;
  /** Whether to use dark theme (default: true) */
  darkMode?: boolean;
  /** Maximum height in pixels (for scrolling) */
  maxHeight?: number;
  /** Minimum height in pixels */
  minHeight?: number;
  /** Whether to show line numbers (default: true) */
  lineNumbers?: boolean;
  /** Title/label to show above the code */
  title?: string;
  /** Custom className for the container */
  className?: string;
  /** Whether to show a subtle border gradient at top */
  showAccent?: boolean;
  /** Accent color for the top border (CSS color value) */
  accentColor?: string;
}

/**
 * CodeDisplay Component
 *
 * A simplified read-only code display component using Monaco Editor
 * for consistent syntax highlighting. Ideal for showing:
 * - Setup code
 * - Expected output
 * - Solution examples
 * - Code snippets in documentation
 *
 * Features:
 * - Multi-language syntax highlighting
 * - Compact, minimal UI
 * - Auto-sizing based on content
 * - Optional title header
 * - Theme support
 */
export default function CodeDisplay({
  code,
  language,
  height,
  darkMode = true,
  maxHeight = 400,
  minHeight = 60,
  lineNumbers = true,
  title,
  className = '',
  showAccent = false,
  accentColor,
}: CodeDisplayProps) {
  const monacoLanguage = LANGUAGE_TO_MONACO[language] || 'plaintext';
  const theme = darkMode ? 'vs-dark' : 'vs';

  // Calculate height based on content if not specified
  const lineCount = code.split('\n').length;
  const calculatedHeight = height || Math.min(Math.max(lineCount * 20 + 24, minHeight), maxHeight);

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      {/* Optional title header */}
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-bg-elevated border-b border-border-subtle">
          <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
            {title}
          </span>
          <span className="text-xs text-text-muted font-mono">{language.toUpperCase()}</span>
        </div>
      )}

      {/* Accent border at top */}
      {showAccent && (
        <div
          className="h-0.5 w-full"
          style={{
            background: accentColor || 'var(--gradient-brand)',
          }}
        />
      )}

      {/* Code display area */}
      <div
        className="bg-bg-surface border border-border-default"
        style={{
          height: calculatedHeight,
          minHeight,
          maxHeight,
        }}
      >
        <Editor
          height="100%"
          language={monacoLanguage}
          value={code}
          theme={theme}
          options={{
            readOnly: true,
            domReadOnly: true,
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: lineNumbers ? 'on' : 'off',
            lineNumbersMinChars: 3,
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            bracketPairColorization: { enabled: true },
            matchBrackets: 'always',
            folding: false,
            fontFamily:
              'var(--font-jetbrains), "Fira Code", "Cascadia Code", "Consolas", monospace',
            fontLigatures: true,
            padding: { top: 8, bottom: 8 },
            scrollbar: {
              vertical: 'auto',
              horizontal: 'hidden',
              verticalScrollbarSize: 8,
            },
            overviewRulerBorder: false,
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            renderLineHighlight: 'none',
            selectionHighlight: false,
            occurrencesHighlight: 'off',
            codeLens: false,
            contextmenu: false,
            copyWithSyntaxHighlighting: true,
            cursorBlinking: 'solid',
            cursorStyle: 'line-thin',
            cursorWidth: 0,
            renderWhitespace: 'none',
            guides: {
              indentation: false,
              bracketPairs: false,
            },
            stickyScroll: { enabled: false },
            ariaLabel: `Code display: ${title || language}`,
          }}
          loading={
            <div className="flex items-center justify-center h-full bg-bg-surface">
              <div className="shimmer h-4 w-32 rounded" />
            </div>
          }
        />
      </div>
    </div>
  );
}

/**
 * CodeDisplayInline Component
 *
 * An even simpler inline code display without Monaco Editor.
 * Use this for very short code snippets where Monaco overhead isn't worth it.
 */
export function CodeDisplayInline({ code, className = '' }: { code: string; className?: string }) {
  return <code className={`code-inline text-sm font-mono ${className}`}>{code}</code>;
}

/**
 * OutputDisplay Component
 *
 * Specialized display for showing expected output or results.
 * Uses a distinctive styling to differentiate from code.
 */
export function OutputDisplay({
  output,
  title = 'Expected Output',
  className = '',
}: {
  output: string;
  title?: string;
  className?: string;
}) {
  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 px-4 py-2 bg-bg-elevated border border-border-subtle border-b-0 rounded-t-lg">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
          {title}
        </span>
      </div>
      <div className="bg-bg-surface border border-border-default border-t-0 rounded-b-lg p-4">
        <pre className="font-mono text-sm text-success whitespace-pre-wrap break-all">{output}</pre>
      </div>
    </div>
  );
}
