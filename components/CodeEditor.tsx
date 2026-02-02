'use client';

import Editor, { type OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { useCallback, useEffect, useRef } from 'react';
import type { LanguageId } from '@/lib/types';

/**
 * Language ID to Monaco language mapping
 * Maps our application's language identifiers to Monaco Editor's language modes
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
  // Database languages
  postgresql: 'sql',
  mysql: 'sql',
  mongodb: 'javascript', // MongoDB uses JavaScript syntax
};

/**
 * File extension mapping for creating unique model URIs
 */
const LANGUAGE_EXTENSIONS: Record<LanguageId, string> = {
  javascript: '.js',
  typescript: '.ts',
  python: '.py',
  java: '.java',
  cpp: '.cpp',
  csharp: '.cs',
  go: '.go',
  ruby: '.rb',
  c: '.c',
  php: '.php',
  kotlin: '.kt',
  // New languages
  rust: '.rs',
  swift: '.swift',
  scala: '.scala',
  r: '.r',
  perl: '.pl',
  lua: '.lua',
  haskell: '.hs',
  elixir: '.ex',
  dart: '.dart',
  clojure: '.clj',
  // Database languages
  postgresql: '.sql',
  mysql: '.sql',
  mongodb: '.js',
};

/**
 * Map non-standard language overrides to valid Monaco language IDs.
 * Monaco doesn't recognize 'typescriptreact' or 'javascriptreact' —
 * those are VS Code-specific. JSX support comes from the compiler
 * options + file extension (.tsx/.jsx), not the language ID.
 */
const LANGUAGE_OVERRIDE_NORMALIZE: Record<string, { language: string; extension: string }> = {
  typescriptreact: { language: 'typescript', extension: '.tsx' },
  javascriptreact: { language: 'javascript', extension: '.jsx' },
};

interface CodeEditorProps {
  /** The code content to display/edit */
  code: string;
  /** Callback when code changes (not called in readOnly mode) */
  onChange: (code: string) => void;
  /** Programming language for syntax highlighting */
  language: LanguageId;
  /** Whether the editor is read-only */
  readOnly?: boolean;
  /** Height of the editor (default: 100%) */
  height?: string | number;
  /** Whether to use dark theme (default: true for this dark-themed app) */
  darkMode?: boolean;
  /** Minimum height in pixels */
  minHeight?: number;
  /** Whether to show line numbers */
  lineNumbers?: boolean;
  /** Placeholder text when empty */
  placeholder?: string;
  /** Custom className for the container */
  className?: string;
  /** Callback when Cmd/Ctrl+Enter is pressed (for submit actions) */
  onSubmitShortcut?: () => void;
  /** Whether to auto-focus the editor on mount */
  autoFocus?: boolean;
  /** Setup code context for TypeScript/JavaScript validation (optional) */
  setupCode?: string;
  /** Override the Monaco language (e.g. 'html' for Angular templates) */
  monacoLanguageOverride?: string;
}

/**
 * CodeEditor Component
 *
 * A Monaco Editor wrapper with multi-language support, theme integration,
 * and auto-formatting capabilities.
 *
 * Features:
 * - Support for 9 programming languages (JS, TS, Python, Java, C++, C#, Go, Ruby, C)
 * - Dark/light theme support
 * - Auto-formatting on paste
 * - Read-only mode for displaying code
 * - Proper cleanup and memory management
 */
export default function CodeEditor({
  code,
  onChange,
  language,
  readOnly = false,
  height = '100%',
  darkMode = true,
  minHeight = 200,
  lineNumbers = true,
  placeholder,
  className = '',
  onSubmitShortcut,
  autoFocus = false,
  setupCode,
  monacoLanguageOverride,
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const isSettingValueRef = useRef(false);
  const modelUriRef = useRef<string | null>(null);
  const pasteTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const setValueTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retrySetValueTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryInnerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onSubmitShortcutRef = useRef(onSubmitShortcut);

  // Keep the ref updated with the latest callback
  useEffect(() => {
    onSubmitShortcutRef.current = onSubmitShortcut;
  }, [onSubmitShortcut]);

  // Get Monaco language from our language ID (allow override for e.g. Angular HTML templates)
  // Normalize non-standard language IDs (e.g. 'typescriptreact' → 'typescript')
  const normalizedOverride = monacoLanguageOverride
    ? LANGUAGE_OVERRIDE_NORMALIZE[monacoLanguageOverride]
    : undefined;
  const monacoLanguage =
    normalizedOverride?.language ||
    monacoLanguageOverride ||
    LANGUAGE_TO_MONACO[language] ||
    'plaintext';
  const fileExtension =
    normalizedOverride?.extension ||
    (monacoLanguageOverride === 'html' ? '.html' : LANGUAGE_EXTENSIONS[language] || '.txt');

  const handleEditorDidMount: OnMount = useCallback(
    (editor, monaco) => {
      editorRef.current = editor;

      // Create a unique model URI for this editor instance to prevent conflicts
      if (!modelUriRef.current) {
        const uniqueId = `file:///editor-${Date.now()}-${Math.random().toString(36).substring(2, 11)}${fileExtension}`;
        modelUriRef.current = uniqueId;

        // Dispose the default model created by the Editor component to avoid
        // duplicate function declarations visible to the TypeScript language service
        const defaultModel = editor.getModel();
        if (defaultModel) {
          defaultModel.dispose();
        }

        // Create a new model with the unique URI
        const model = monaco.editor.createModel(
          code || '',
          monacoLanguage,
          monaco.Uri.parse(uniqueId),
        );
        editor.setModel(model);
      }

      // Configure TypeScript/JavaScript settings
      if (language === 'typescript' || language === 'javascript') {
        const isTypeScript = language === 'typescript';

        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
          target: monaco.languages.typescript.ScriptTarget.ES2020,
          allowNonTsExtensions: true,
          moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
          module: monaco.languages.typescript.ModuleKind.ESNext,
          noEmit: true,
          esModuleInterop: true,
          jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
          allowJs: !isTypeScript,
          typeRoots: ['node_modules/@types'],
          preserveConstEnums: false,
          strict: false,
          skipLibCheck: true,
        });

        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
          target: monaco.languages.typescript.ScriptTarget.ES2020,
          allowNonTsExtensions: true,
          allowJs: true,
          checkJs: false, // Don't check JavaScript for type errors - reduces red underlines
        });

        // Configure JavaScript diagnostics to be less strict
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: true, // Disable semantic validation for JS to reduce red underlines
          noSyntaxValidation: false, // Keep syntax validation
          noSuggestionDiagnostics: false,
        });

        // Add setup code as extra libs for better type checking context
        // This helps TypeScript/JavaScript understand variables from setup code
        if (setupCode && (isTypeScript || language === 'javascript')) {
          try {
            // Extract variable declarations and convert to type declarations
            const declarations: string[] = [];
            const lines = setupCode.split('\n');

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || trimmed.startsWith('//')) continue;

              // Match: const name: type = value or const name = value
              const constMatch = trimmed.match(/(?:const|let|var)\s+(\w+)(?::\s*([^=]+))?/);
              if (constMatch) {
                const varName = constMatch[1];
                let type = constMatch[2]?.trim() || 'any';

                // Infer type from value if not explicitly typed
                if (type === 'any' || !type) {
                  if (trimmed.includes('[]')) type = 'any[]';
                  else if (trimmed.includes('{}')) type = 'Record<string, any>';
                  else if (trimmed.match(/['"]/)) type = 'string';
                  else if (trimmed.match(/\d+/)) type = 'number';
                  else if (trimmed.includes('true') || trimmed.includes('false')) type = 'boolean';
                }

                declarations.push(`declare const ${varName}: ${type};`);
              }
            }

            if (declarations.length > 0) {
              const setupLib = declarations.join('\n');
              const libUri = `file:///setup-${Date.now()}.d.ts`;

              monaco.languages.typescript.typescriptDefaults.addExtraLib(setupLib, libUri);
              monaco.languages.typescript.javascriptDefaults.addExtraLib(setupLib, libUri);
            }
          } catch (e) {
            // Silently fail if setup code parsing fails
            console.debug('Failed to parse setup code for type context:', e);
          }
        }

        // Configure diagnostics - be less strict during typing
        if (isTypeScript) {
          const diagnosticCodesToIgnore = [
            8006, // enum declarations
            2451, // Cannot redeclare block-scoped variable
            2300, // Duplicate identifier
            2393, // Duplicate function implementation (expected across exercise editors)
            2551, // Property does not exist (too strict for incomplete code)
            2554, // Expected X arguments but got Y (too strict while typing)
            2345, // Argument of type X is not assignable (too strict while typing)
            2552, // Cannot find name (too strict while typing)
            2304, // Cannot find name (variable not defined - too strict while typing)
            2874, // JSX tag requires 'React' in scope (handled by automatic runtime)
            2875, // JSX tag requires module path 'react/jsx-runtime' (not available in Monaco virtual FS)
          ];

          monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false,
            noSuggestionDiagnostics: false,
            diagnosticCodesToIgnore,
            // Only show errors, not warnings, to reduce red underlines
            onlyVisible: false,
          });

          const model = editor.getModel();
          if (model) {
            monaco.editor.setModelMarkers(model, 'typescript', []);
          }
        } else if (language === 'javascript') {
          // For JavaScript, disable semantic validation to avoid red underlines
          // We'll validate on submit instead
          monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true, // Disable semantic validation for JS
            noSyntaxValidation: false, // Keep syntax validation
            noSuggestionDiagnostics: false,
          });
        }
      }

      // Enable auto-formatting action
      editor.addAction({
        id: 'format-document',
        label: 'Format Document',
        keybindings: [
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK,
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF,
        ],
        contextMenuGroupId: '1_modification',
        contextMenuOrder: 1.5,
        run: async () => {
          await editor.getAction('editor.action.formatDocument')?.run();
        },
      });

      // Submit shortcut action (Cmd/Ctrl + Enter)
      editor.addAction({
        id: 'submit-code',
        label: 'Submit Code',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
        run: () => {
          if (onSubmitShortcutRef.current) {
            onSubmitShortcutRef.current();
          }
        },
      });

      // Auto-focus if requested
      if (autoFocus) {
        editor.focus();
      }

      // Format on paste
      editor.onDidPaste(async () => {
        if (pasteTimeoutRef.current) {
          clearTimeout(pasteTimeoutRef.current);
        }
        pasteTimeoutRef.current = setTimeout(async () => {
          await editor.getAction('editor.action.formatDocument')?.run();
          pasteTimeoutRef.current = null;
        }, 100);
      });
    },
    [code, fileExtension, language, monacoLanguage, autoFocus, setupCode],
  );

  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      if (value !== undefined && !isSettingValueRef.current) {
        onChange(value);
      }
    },
    [onChange],
  );

  // Update code when it changes externally
  useEffect(() => {
    // Clear any pending timeouts
    if (setValueTimeoutRef.current) {
      clearTimeout(setValueTimeoutRef.current);
      setValueTimeoutRef.current = null;
    }
    if (retrySetValueTimeoutRef.current) {
      clearTimeout(retrySetValueTimeoutRef.current);
      retrySetValueTimeoutRef.current = null;
    }
    if (retryInnerTimeoutRef.current) {
      clearTimeout(retryInnerTimeoutRef.current);
      retryInnerTimeoutRef.current = null;
    }

    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        const currentValue = model.getValue();
        if (code !== currentValue) {
          isSettingValueRef.current = true;
          model.setValue(code || '');
          setValueTimeoutRef.current = setTimeout(() => {
            isSettingValueRef.current = false;
            setValueTimeoutRef.current = null;
            // Auto-format after setting value (only if not read-only)
            if (!readOnly && code && code.trim()) {
              editorRef.current?.getAction('editor.action.formatDocument')?.run();
            }
          }, 50);
        }
      } else if (code) {
        retrySetValueTimeoutRef.current = setTimeout(() => {
          retrySetValueTimeoutRef.current = null;
          const model = editorRef.current?.getModel();
          if (model && model.getValue() !== code) {
            isSettingValueRef.current = true;
            model.setValue(code);
            retryInnerTimeoutRef.current = setTimeout(() => {
              isSettingValueRef.current = false;
              retryInnerTimeoutRef.current = null;
            }, 50);
          }
        }, 100);
      }
    }

    return () => {
      if (setValueTimeoutRef.current) {
        clearTimeout(setValueTimeoutRef.current);
        setValueTimeoutRef.current = null;
      }
      if (retrySetValueTimeoutRef.current) {
        clearTimeout(retrySetValueTimeoutRef.current);
        retrySetValueTimeoutRef.current = null;
      }
      if (retryInnerTimeoutRef.current) {
        clearTimeout(retryInnerTimeoutRef.current);
        retryInnerTimeoutRef.current = null;
      }
    };
  }, [code, readOnly]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pasteTimeoutRef.current) {
        clearTimeout(pasteTimeoutRef.current);
        pasteTimeoutRef.current = null;
      }
      if (editorRef.current && modelUriRef.current) {
        const model = editorRef.current.getModel();
        if (model) {
          model.dispose();
        }
      }
    };
  }, []);

  const theme = darkMode ? 'vs-dark' : 'vs';

  return (
    <div
      className={`relative w-full rounded-lg border border-border-default overflow-hidden bg-bg-surface ${className}`}
      style={{ height, minHeight }}
    >
      <Editor
        height="100%"
        language={monacoLanguage}
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme={theme}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: lineNumbers ? 'on' : 'off',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          formatOnPaste: true,
          formatOnType: true,
          autoIndent: 'full',
          bracketPairColorization: { enabled: true },
          suggestOnTriggerCharacters: !readOnly,
          acceptSuggestionOnEnter: readOnly ? 'off' : 'on',
          tabCompletion: readOnly ? 'off' : 'on',
          quickSuggestions: readOnly
            ? false
            : {
                other: true,
                comments: false,
                strings: true,
              },
          suggestSelection: 'first',
          snippetSuggestions: readOnly ? 'none' : 'top',
          renderWhitespace: 'selection',
          showFoldingControls: 'always',
          folding: true,
          foldingStrategy: 'indentation',
          matchBrackets: 'always',
          cursorBlinking: readOnly ? 'solid' : 'smooth',
          cursorSmoothCaretAnimation: readOnly ? 'off' : 'on',
          smoothScrolling: true,
          fontFamily: 'var(--font-jetbrains), "Fira Code", "Cascadia Code", "Consolas", monospace',
          fontLigatures: true,
          padding: { top: 12, bottom: 12 },
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
          overviewRulerBorder: false,
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          renderLineHighlight: readOnly ? 'none' : 'line',
          selectionHighlight: !readOnly,
          occurrencesHighlight: readOnly ? 'off' : 'singleFile',
          codeLens: false,
          contextmenu: !readOnly,
          copyWithSyntaxHighlighting: true,
          domReadOnly: readOnly,
          ariaLabel: readOnly ? 'Code display (read-only)' : 'Code editor',
        }}
        loading={
          <div className="flex items-center justify-center h-full bg-bg-surface text-text-secondary">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-text-muted border-t-info"></div>
              <span className="text-sm">Loading editor...</span>
            </div>
          </div>
        }
      />
      {/* Placeholder overlay when empty and read-only */}
      {readOnly && !code && placeholder && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-text-muted text-sm">{placeholder}</span>
        </div>
      )}
    </div>
  );
}
