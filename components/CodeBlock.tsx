'use client';

import { useState, useCallback } from 'react';

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

const languageKeywords: Record<string, string[]> = {
  javascript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'default', 'from', 'async', 'await', 'try', 'catch', 'throw', 'new', 'this', 'typeof', 'instanceof', 'true', 'false', 'null', 'undefined'],
  typescript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'default', 'from', 'async', 'await', 'try', 'catch', 'throw', 'new', 'this', 'typeof', 'instanceof', 'true', 'false', 'null', 'undefined', 'interface', 'type', 'enum', 'implements', 'extends', 'public', 'private', 'protected', 'readonly', 'as', 'is', 'keyof', 'infer'],
  python: ['def', 'return', 'if', 'elif', 'else', 'for', 'while', 'class', 'import', 'from', 'as', 'try', 'except', 'raise', 'with', 'lambda', 'True', 'False', 'None', 'and', 'or', 'not', 'in', 'is', 'pass', 'break', 'continue', 'yield', 'async', 'await', 'self'],
  java: ['public', 'private', 'protected', 'class', 'interface', 'extends', 'implements', 'static', 'final', 'void', 'int', 'String', 'boolean', 'return', 'if', 'else', 'for', 'while', 'try', 'catch', 'throw', 'throws', 'new', 'this', 'super', 'import', 'package', 'true', 'false', 'null'],
  go: ['func', 'return', 'if', 'else', 'for', 'range', 'switch', 'case', 'default', 'struct', 'interface', 'type', 'var', 'const', 'import', 'package', 'defer', 'go', 'chan', 'select', 'map', 'make', 'new', 'true', 'false', 'nil'],
  rust: ['fn', 'let', 'mut', 'const', 'return', 'if', 'else', 'for', 'while', 'loop', 'match', 'struct', 'enum', 'impl', 'trait', 'pub', 'use', 'mod', 'crate', 'self', 'super', 'where', 'async', 'await', 'move', 'true', 'false', 'Some', 'None', 'Ok', 'Err'],
  ruby: ['def', 'end', 'return', 'if', 'elsif', 'else', 'unless', 'for', 'while', 'do', 'class', 'module', 'require', 'include', 'extend', 'attr_accessor', 'attr_reader', 'attr_writer', 'true', 'false', 'nil', 'self', 'yield', 'block_given?', 'lambda', 'proc'],
  php: ['function', 'return', 'if', 'elseif', 'else', 'for', 'foreach', 'while', 'class', 'interface', 'extends', 'implements', 'public', 'private', 'protected', 'static', 'const', 'use', 'namespace', 'require', 'include', 'new', 'this', 'true', 'false', 'null', 'echo', 'print'],
  swift: ['func', 'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'class', 'struct', 'enum', 'protocol', 'extension', 'import', 'var', 'let', 'guard', 'defer', 'async', 'await', 'try', 'catch', 'throw', 'true', 'false', 'nil', 'self', 'super'],
  kotlin: ['fun', 'return', 'if', 'else', 'for', 'while', 'when', 'class', 'interface', 'object', 'data', 'sealed', 'import', 'package', 'val', 'var', 'override', 'open', 'abstract', 'suspend', 'true', 'false', 'null', 'this', 'super', 'is', 'as', 'in'],
};

function highlightCode(code: string, language: string): string {
  const keywords = languageKeywords[language.toLowerCase()] || languageKeywords['javascript'];
  let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Highlight strings (single and double quotes)
  highlighted = highlighted.replace(
    /(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g,
    '<span class="text-emerald-400">$&</span>'
  );

  // Highlight comments (single line)
  highlighted = highlighted.replace(
    /(\/\/.*$|#.*$)/gm,
    '<span class="text-gray-500 italic">$&</span>'
  );

  // Highlight numbers
  highlighted = highlighted.replace(
    /\b(\d+\.?\d*)\b/g,
    '<span class="text-amber-400">$1</span>'
  );

  // Highlight keywords
  const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  highlighted = highlighted.replace(
    keywordPattern,
    '<span class="text-purple-400 font-semibold">$1</span>'
  );

  // Highlight function calls
  highlighted = highlighted.replace(
    /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g,
    '<span class="text-blue-400">$1</span>'
  );

  return highlighted;
}

export function CodeBlock({ code, language, showLineNumbers = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }, [code]);

  const lines = code.split('\n');
  const highlightedCode = highlightCode(code, language);
  const highlightedLines = highlightedCode.split('\n');

  return (
    <div className="relative group rounded-lg overflow-hidden bg-gray-900 dark:bg-gray-950 border border-gray-700 dark:border-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-800">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded transition-colors duration-200"
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono leading-relaxed">
          <code>
            {highlightedLines.map((line, index) => (
              <div key={index} className="flex">
                {showLineNumbers && (
                  <span className="select-none pr-4 text-gray-600 dark:text-gray-500 text-right w-8 flex-shrink-0">
                    {index + 1}
                  </span>
                )}
                <span
                  className="flex-1 text-gray-100"
                  dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }}
                />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default CodeBlock;
