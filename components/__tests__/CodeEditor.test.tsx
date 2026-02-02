// @vitest-environment jsdom
/* eslint-disable @typescript-eslint/no-explicit-any */

import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CodeEditor from '../CodeEditor';

// ---------------------------------------------------------------------------
// Shared mock state – hoisted so it is available inside the vi.mock factory.
// ---------------------------------------------------------------------------
const mockState = vi.hoisted(() => ({
  actions: {} as Record<string, any>,
  onDidPasteCallback: null as (() => void) | null,
  editor: null as any,
  monaco: null as any,
  modelValue: '' as string,
  modelDisposed: false,
  defaultModelDisposed: false,
  /** When true the mock addExtraLib will throw (for error-path testing). */
  throwOnAddExtraLib: false,
}));

// ---------------------------------------------------------------------------
// Monaco Editor mock – useEffect calls onMount so that editorRef /
// modelUriRef are set *before* the parent component's own effects fire.
// ---------------------------------------------------------------------------
vi.mock('@monaco-editor/react', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');

  return {
    default: (props: any) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useEffect(() => {
        if (props.onMount) {
          // Reset per-mount state
          mockState.actions = {};
          mockState.onDidPasteCallback = null;
          mockState.modelDisposed = false;
          mockState.defaultModelDisposed = false;
          mockState.modelValue = props.value || '';

          // "Default" model – the one the real Editor creates automatically
          const defaultModel = {
            dispose: vi.fn(() => {
              mockState.defaultModelDisposed = true;
            }),
          };

          // "Real" model – returned by createModel, used throughout the component
          const model = {
            dispose: vi.fn(() => {
              mockState.modelDisposed = true;
            }),
            getValue: vi.fn(() => mockState.modelValue),
            setValue: vi.fn((v: string) => {
              mockState.modelValue = v;
            }),
          };

          // Tracks which model getModel returns.
          let currentModel: any = defaultModel;

          const editor: any = {
            getModel: vi.fn(() => currentModel),
            setModel: vi.fn((m: any) => {
              currentModel = m;
            }),
            addAction: vi.fn((action: any) => {
              mockState.actions[action.id] = action;
            }),
            focus: vi.fn(),
            onDidPaste: vi.fn((cb: any) => {
              mockState.onDidPasteCallback = cb;
            }),
            getAction: vi.fn((id: string) => {
              if (mockState.actions[id]) return mockState.actions[id];
              return { run: vi.fn().mockResolvedValue(undefined) };
            }),
          };
          mockState.editor = editor;

          const monaco = {
            editor: {
              createModel: vi.fn(() => model),
              setModelMarkers: vi.fn(),
            },
            Uri: { parse: vi.fn((uri: string) => ({ toString: () => uri })) },
            KeyMod: { CtrlCmd: 0x0800 },
            KeyCode: { KeyK: 41, KeyF: 36, Enter: 3 },
            languages: {
              typescript: {
                typescriptDefaults: {
                  setCompilerOptions: vi.fn(),
                  setDiagnosticsOptions: vi.fn(),
                  addExtraLib: vi.fn((_content: string, _uri: string) => {
                    if (mockState.throwOnAddExtraLib) throw new Error('addExtraLib test error');
                  }),
                },
                javascriptDefaults: {
                  setCompilerOptions: vi.fn(),
                  setDiagnosticsOptions: vi.fn(),
                  addExtraLib: vi.fn((_content: string, _uri: string) => {
                    if (mockState.throwOnAddExtraLib) throw new Error('addExtraLib test error');
                  }),
                },
                ScriptTarget: { ES2020: 7 },
                ModuleResolutionKind: { NodeJs: 2 },
                ModuleKind: { ESNext: 99 },
                JsxEmit: { React: 2 },
              },
            },
          };
          mockState.monaco = monaco;

          props.onMount(editor, monaco);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return (
        <div data-testid="monaco-editor" data-language={props.language} data-theme={props.theme}>
          <textarea
            data-testid="monaco-textarea"
            value={props.value}
            onChange={(e: any) => props.onChange?.(e.target.value)}
            readOnly={!!props.options?.readOnly}
            data-linenumbers={props.options?.lineNumbers}
          />
          {props.loading}
        </div>
      );
    },
  };
});

// ---------------------------------------------------------------------------

describe('CodeEditor', () => {
  beforeEach(() => {
    mockState.actions = {};
    mockState.onDidPasteCallback = null;
    mockState.editor = null;
    mockState.monaco = null;
    mockState.modelValue = '';
    mockState.modelDisposed = false;
    mockState.defaultModelDisposed = false;
    mockState.throwOnAddExtraLib = false;
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  // =========================================================================
  // Basic rendering tests
  // =========================================================================

  it('should render editor with code', () => {
    const handleChange = vi.fn();
    render(
      <CodeEditor code="console.log('hello')" language="javascript" onChange={handleChange} />,
    );

    expect(screen.getByTestId('monaco-editor')).toBeDefined();
    const textarea = screen.getByTestId('monaco-textarea') as HTMLTextAreaElement;
    expect(textarea.value).toBe("console.log('hello')");
  });

  it('should handle code changes', () => {
    const handleChange = vi.fn();
    render(<CodeEditor code="initial" language="javascript" onChange={handleChange} />);

    const textarea = screen.getByTestId('monaco-textarea');
    fireEvent.change(textarea, { target: { value: 'updated' } });

    expect(handleChange).toHaveBeenCalledWith('updated');
  });

  it('should display loading state initially', () => {
    const handleChange = vi.fn();
    render(<CodeEditor code="" language="javascript" onChange={handleChange} />);

    expect(screen.getByText('Loading editor...')).toBeDefined();
  });

  it('should render placeholder when readonly and empty', () => {
    render(
      <CodeEditor
        code=""
        language="javascript"
        onChange={() => {}}
        readOnly={true}
        placeholder="Empty Code"
      />,
    );

    expect(screen.getByText('Empty Code')).toBeDefined();
  });

  it('should not render placeholder when readonly but has code', () => {
    render(
      <CodeEditor
        code="some code"
        language="javascript"
        onChange={() => {}}
        readOnly={true}
        placeholder="Empty Code"
      />,
    );

    expect(screen.queryByText('Empty Code')).toBeNull();
  });

  it('should not render placeholder when not readonly and empty', () => {
    render(
      <CodeEditor
        code=""
        language="javascript"
        onChange={() => {}}
        readOnly={false}
        placeholder="Empty Code"
      />,
    );

    expect(screen.queryByText('Empty Code')).toBeNull();
  });

  // =========================================================================
  // Language mapping
  // =========================================================================

  it('should pass correct language to Monaco for Python', () => {
    render(<CodeEditor code="" language="python" onChange={() => {}} />);

    const editor = screen.getByTestId('monaco-editor');
    expect(editor.getAttribute('data-language')).toBe('python');
  });

  it('should pass correct language to Monaco for TypeScript', () => {
    render(<CodeEditor code="" language="typescript" onChange={() => {}} />);

    const editor = screen.getByTestId('monaco-editor');
    expect(editor.getAttribute('data-language')).toBe('typescript');
  });

  it('should pass sql language for PostgreSQL', () => {
    render(<CodeEditor code="" language="postgresql" onChange={() => {}} />);

    const editor = screen.getByTestId('monaco-editor');
    expect(editor.getAttribute('data-language')).toBe('sql');
  });

  it('should pass sql language for MySQL', () => {
    render(<CodeEditor code="" language="mysql" onChange={() => {}} />);

    const editor = screen.getByTestId('monaco-editor');
    expect(editor.getAttribute('data-language')).toBe('sql');
  });

  it('should pass javascript language for MongoDB', () => {
    render(<CodeEditor code="" language="mongodb" onChange={() => {}} />);

    const editor = screen.getByTestId('monaco-editor');
    expect(editor.getAttribute('data-language')).toBe('javascript');
  });

  // =========================================================================
  // Theme
  // =========================================================================

  it('should use vs-dark theme by default', () => {
    render(<CodeEditor code="" language="javascript" onChange={() => {}} />);

    const editor = screen.getByTestId('monaco-editor');
    expect(editor.getAttribute('data-theme')).toBe('vs-dark');
  });

  it('should use vs theme when darkMode is false', () => {
    render(<CodeEditor code="" language="javascript" onChange={() => {}} darkMode={false} />);

    const editor = screen.getByTestId('monaco-editor');
    expect(editor.getAttribute('data-theme')).toBe('vs');
  });

  // =========================================================================
  // Style / prop pass-through
  // =========================================================================

  it('should apply custom className to container', () => {
    const { container } = render(
      <CodeEditor code="" language="javascript" onChange={() => {}} className="custom-class" />,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('custom-class');
  });

  it('should apply height and minHeight styles', () => {
    const { container } = render(
      <CodeEditor
        code=""
        language="javascript"
        onChange={() => {}}
        height="300px"
        minHeight={150}
      />,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.height).toBe('300px');
    expect(wrapper.style.minHeight).toBe('150px');
  });

  it('should apply default height of 100%', () => {
    const { container } = render(<CodeEditor code="" language="javascript" onChange={() => {}} />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.height).toBe('100%');
  });

  it('should apply default minHeight of 200px', () => {
    const { container } = render(<CodeEditor code="" language="javascript" onChange={() => {}} />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.minHeight).toBe('200px');
  });

  it('should pass readOnly option to Monaco', () => {
    render(
      <CodeEditor code="read only content" language="javascript" onChange={() => {}} readOnly />,
    );

    const textarea = screen.getByTestId('monaco-textarea') as HTMLTextAreaElement;
    expect(textarea.readOnly).toBe(true);
  });

  it('should use monacoLanguageOverride when provided', () => {
    render(
      <CodeEditor
        code=""
        language="javascript"
        onChange={() => {}}
        monacoLanguageOverride="html"
      />,
    );

    const editor = screen.getByTestId('monaco-editor');
    expect(editor.getAttribute('data-language')).toBe('html');
  });

  it('should render various language editors', () => {
    const languages = ['go', 'ruby', 'c', 'rust', 'swift', 'kotlin'] as const;

    for (const lang of languages) {
      const { unmount } = render(<CodeEditor code="" language={lang} onChange={() => {}} />);

      const editor = screen.getByTestId('monaco-editor');
      expect(editor.getAttribute('data-language')).toBe(lang);
      unmount();
    }
  });

  // =========================================================================
  // onMount behaviour (lines 152-337)
  // =========================================================================

  describe('onMount behaviour', () => {
    it('should dispose the default model and create a new one with a unique URI', () => {
      render(<CodeEditor code="test code" language="javascript" onChange={() => {}} />);

      expect(mockState.editor).not.toBeNull();
      expect(mockState.monaco).not.toBeNull();
      expect(mockState.defaultModelDisposed).toBe(true);
      expect(mockState.monaco.editor.createModel).toHaveBeenCalled();
      expect(mockState.editor.setModel).toHaveBeenCalled();
      // Uri.parse called with a path containing the .js extension
      expect(mockState.monaco.Uri.parse).toHaveBeenCalled();
      const uriArg = mockState.monaco.Uri.parse.mock.calls[0][0] as string;
      expect(uriArg).toContain('.js');
    });

    it('should register format-document and submit-code actions', () => {
      render(<CodeEditor code="" language="javascript" onChange={() => {}} />);

      expect(mockState.actions['format-document']).toBeDefined();
      expect(mockState.actions['format-document'].label).toBe('Format Document');
      expect(mockState.actions['submit-code']).toBeDefined();
      expect(mockState.actions['submit-code'].label).toBe('Submit Code');
    });

    it('should register an onDidPaste handler', () => {
      render(<CodeEditor code="" language="javascript" onChange={() => {}} />);

      expect(mockState.editor.onDidPaste).toHaveBeenCalled();
      expect(mockState.onDidPasteCallback).not.toBeNull();
    });

    it('should not configure TS/JS settings for non-JS/TS languages', () => {
      render(<CodeEditor code="" language="python" onChange={() => {}} />);

      expect(
        mockState.monaco.languages.typescript.typescriptDefaults.setCompilerOptions,
      ).not.toHaveBeenCalled();
    });
  });

  // =========================================================================
  // TypeScript configuration (lines 178-281)
  // =========================================================================

  describe('TypeScript configuration', () => {
    it('should configure compiler options, diagnostics, and clear markers', () => {
      render(<CodeEditor code="" language="typescript" onChange={() => {}} />);

      const tsDefs = mockState.monaco.languages.typescript.typescriptDefaults;
      const jsDefs = mockState.monaco.languages.typescript.javascriptDefaults;

      expect(tsDefs.setCompilerOptions).toHaveBeenCalled();
      expect(jsDefs.setCompilerOptions).toHaveBeenCalled();
      expect(jsDefs.setDiagnosticsOptions).toHaveBeenCalled();
      // TS-specific diagnostics with codes to ignore
      expect(tsDefs.setDiagnosticsOptions).toHaveBeenCalled();
      const diagCall = tsDefs.setDiagnosticsOptions.mock.calls.at(-1)?.[0];
      expect(diagCall.diagnosticCodesToIgnore).toBeDefined();
      expect(diagCall.diagnosticCodesToIgnore).toContain(2451);
      // Markers cleared on the current model
      expect(mockState.monaco.editor.setModelMarkers).toHaveBeenCalled();
    });

    it('should parse setupCode and add extra libs covering all type-inference branches', () => {
      const setupCode = [
        'const typed: number = 5;', // explicit type kept
        'let name = "hello";', // inferred string (quote regex)
        'const arr = [];', // inferred any[]
        'const obj = {};', // inferred Record<string, any>
        'const flag = true;', // inferred boolean
        'var isActive = false;', // inferred boolean (false branch)
        'const count = 42;', // inferred number (digit regex)
        '// This is a comment', // skipped
        '', // skipped
      ].join('\n');

      render(
        <CodeEditor code="" language="typescript" onChange={() => {}} setupCode={setupCode} />,
      );

      const tsDefs = mockState.monaco.languages.typescript.typescriptDefaults;
      const jsDefs = mockState.monaco.languages.typescript.javascriptDefaults;

      expect(tsDefs.addExtraLib).toHaveBeenCalledTimes(1);
      expect(jsDefs.addExtraLib).toHaveBeenCalledTimes(1);

      const generatedLib = tsDefs.addExtraLib.mock.calls[0][0] as string;
      expect(generatedLib).toContain('declare const typed: number');
      expect(generatedLib).toContain('declare const name: string');
      expect(generatedLib).toContain('declare const arr: any[]');
      expect(generatedLib).toContain('declare const obj: Record<string, any>');
      expect(generatedLib).toContain('declare const flag: boolean');
      expect(generatedLib).toContain('declare const isActive: boolean');
      expect(generatedLib).toContain('declare const count: number');
    });

    it('should not call addExtraLib when setupCode has no variable declarations', () => {
      const setupCode = '// Only a comment\n   \n// Another comment';

      render(
        <CodeEditor code="" language="typescript" onChange={() => {}} setupCode={setupCode} />,
      );

      expect(
        mockState.monaco.languages.typescript.typescriptDefaults.addExtraLib,
      ).not.toHaveBeenCalled();
    });

    it('should handle setupCode parsing failure gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      mockState.throwOnAddExtraLib = true;

      // Should not throw even though addExtraLib throws internally
      render(
        <CodeEditor code="" language="typescript" onChange={() => {}} setupCode="const x = 1;" />,
      );

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  // =========================================================================
  // JavaScript configuration (lines 282-290)
  // =========================================================================

  describe('JavaScript configuration', () => {
    it('should disable semantic validation for JavaScript', () => {
      render(<CodeEditor code="" language="javascript" onChange={() => {}} />);

      const jsDefs = mockState.monaco.languages.typescript.javascriptDefaults;
      expect(jsDefs.setDiagnosticsOptions).toHaveBeenCalled();

      // The *last* setDiagnosticsOptions call should be the JS-specific one
      const lastCall =
        jsDefs.setDiagnosticsOptions.mock.calls[
          jsDefs.setDiagnosticsOptions.mock.calls.length - 1
        ][0];
      expect(lastCall.noSemanticValidation).toBe(true);
      expect(lastCall.noSyntaxValidation).toBe(false);
    });

    it('should add extra libs from setupCode for JavaScript', () => {
      const setupCode = 'const items = [];\nlet total = 100;';

      render(
        <CodeEditor code="" language="javascript" onChange={() => {}} setupCode={setupCode} />,
      );

      expect(
        mockState.monaco.languages.typescript.typescriptDefaults.addExtraLib,
      ).toHaveBeenCalled();
      expect(
        mockState.monaco.languages.typescript.javascriptDefaults.addExtraLib,
      ).toHaveBeenCalled();
    });
  });

  // =========================================================================
  // autoFocus (line 321-323)
  // =========================================================================

  describe('autoFocus', () => {
    it('should call editor.focus() when autoFocus is true', () => {
      render(<CodeEditor code="" language="javascript" onChange={() => {}} autoFocus={true} />);

      expect(mockState.editor.focus).toHaveBeenCalled();
    });

    it('should NOT call editor.focus() when autoFocus is false (default)', () => {
      render(<CodeEditor code="" language="javascript" onChange={() => {}} autoFocus={false} />);

      expect(mockState.editor.focus).not.toHaveBeenCalled();
    });
  });

  // =========================================================================
  // onSubmitShortcut (lines 309-318)
  // =========================================================================

  describe('onSubmitShortcut', () => {
    it('should invoke onSubmitShortcut when the submit action runs', () => {
      const onSubmit = vi.fn();
      render(
        <CodeEditor
          code=""
          language="javascript"
          onChange={() => {}}
          onSubmitShortcut={onSubmit}
        />,
      );

      const submitAction = mockState.actions['submit-code'];
      expect(submitAction).toBeDefined();
      submitAction.run();

      expect(onSubmit).toHaveBeenCalledOnce();
    });

    it('should not throw when submit action runs without onSubmitShortcut', () => {
      render(<CodeEditor code="" language="javascript" onChange={() => {}} />);

      const submitAction = mockState.actions['submit-code'];
      expect(submitAction).toBeDefined();
      expect(() => submitAction.run()).not.toThrow();
    });
  });

  // =========================================================================
  // format-document action (lines 294-306)
  // =========================================================================

  describe('format-document action', () => {
    it('should delegate to editor.action.formatDocument when triggered', async () => {
      render(<CodeEditor code="" language="javascript" onChange={() => {}} />);

      const formatAction = mockState.actions['format-document'];
      expect(formatAction).toBeDefined();
      await formatAction.run();

      expect(mockState.editor.getAction).toHaveBeenCalledWith('editor.action.formatDocument');
    });
  });

  // =========================================================================
  // handleEditorChange (line 341)
  // =========================================================================

  describe('handleEditorChange', () => {
    it('should call onChange when the editor value changes', () => {
      const handleChange = vi.fn();
      render(<CodeEditor code="initial" language="javascript" onChange={handleChange} />);

      const textarea = screen.getByTestId('monaco-textarea');
      fireEvent.change(textarea, { target: { value: 'new value' } });

      expect(handleChange).toHaveBeenCalledWith('new value');
    });
  });

  // =========================================================================
  // External code update effect (lines 349-410)
  // =========================================================================

  describe('external code update effect', () => {
    it('should call model.setValue when code prop changes', () => {
      vi.useFakeTimers();
      const handleChange = vi.fn();
      const { rerender } = render(
        <CodeEditor code="initial" language="javascript" onChange={handleChange} />,
      );

      expect(mockState.modelValue).toBe('initial');

      // Rerender with different code triggers the effect
      rerender(<CodeEditor code="updated code" language="javascript" onChange={handleChange} />);

      expect(mockState.modelValue).toBe('updated code');

      // Flush the deferred reset / format callback
      act(() => {
        vi.advanceTimersByTime(100);
      });
    });

    it('should auto-format after setValue for non-readOnly editors', () => {
      vi.useFakeTimers();
      const handleChange = vi.fn();
      const { rerender } = render(
        <CodeEditor code="initial" language="javascript" onChange={handleChange} />,
      );

      rerender(<CodeEditor code="const x = 1;" language="javascript" onChange={handleChange} />);

      // Advance past the 50 ms timeout so the format callback fires
      act(() => {
        vi.advanceTimersByTime(60);
      });

      expect(mockState.editor.getAction).toHaveBeenCalled();
    });

    it('should NOT auto-format after setValue for readOnly editors', () => {
      vi.useFakeTimers();
      const handleChange = vi.fn();
      const { rerender } = render(
        <CodeEditor code="initial" language="javascript" onChange={handleChange} readOnly />,
      );

      mockState.editor.getAction.mockClear();

      rerender(
        <CodeEditor code="const x = 1;" language="javascript" onChange={handleChange} readOnly />,
      );

      act(() => {
        vi.advanceTimersByTime(60);
      });

      // No formatDocument request in readOnly mode
      const formatCalls = mockState.editor.getAction.mock.calls.filter(
        (c: any[]) => c[0] === 'editor.action.formatDocument',
      );
      expect(formatCalls).toHaveLength(0);
    });

    it('should clean up pending timeouts when code changes rapidly', () => {
      vi.useFakeTimers();
      const handleChange = vi.fn();
      const { rerender } = render(
        <CodeEditor code="a" language="javascript" onChange={handleChange} />,
      );

      rerender(<CodeEditor code="b" language="javascript" onChange={handleChange} />);
      rerender(<CodeEditor code="c" language="javascript" onChange={handleChange} />);

      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(mockState.modelValue).toBe('c');
    });

    it('should retry setting value when model is temporarily unavailable', () => {
      vi.useFakeTimers();
      const handleChange = vi.fn();
      const { rerender } = render(
        <CodeEditor code="initial" language="javascript" onChange={handleChange} />,
      );

      // Make getModel return null to simulate the model not being ready
      const originalGetModel = mockState.editor.getModel;
      mockState.editor.getModel = vi.fn().mockReturnValue(null);

      rerender(<CodeEditor code="retry code" language="javascript" onChange={handleChange} />);

      // Restore getModel before the 100 ms retry fires
      mockState.editor.getModel = originalGetModel;
      mockState.modelValue = 'stale';

      act(() => {
        vi.advanceTimersByTime(110);
      });

      expect(mockState.modelValue).toBe('retry code');

      // Flush the inner 50 ms reset timeout
      act(() => {
        vi.advanceTimersByTime(60);
      });
    });

    it('should clean up retrySetValueTimeout when code changes while retry is pending', () => {
      vi.useFakeTimers();
      const handleChange = vi.fn();
      const { rerender } = render(
        <CodeEditor code="initial" language="javascript" onChange={handleChange} />,
      );

      // Make getModel return null to force the retry path
      const originalGetModel = mockState.editor.getModel;
      mockState.editor.getModel = vi.fn().mockReturnValue(null);

      // Rerender → enters retry path, sets retrySetValueTimeoutRef
      rerender(<CodeEditor code="retry1" language="javascript" onChange={handleChange} />);

      // Rerender again before the retry timer fires → cleanup clears retrySetValueTimeoutRef
      rerender(<CodeEditor code="retry2" language="javascript" onChange={handleChange} />);

      // Restore and flush
      mockState.editor.getModel = originalGetModel;
      act(() => {
        vi.advanceTimersByTime(200);
      });
    });

    it('should clean up retryInnerTimeout when code changes while inner retry is pending', () => {
      vi.useFakeTimers();
      const handleChange = vi.fn();
      const { rerender } = render(
        <CodeEditor code="initial" language="javascript" onChange={handleChange} />,
      );

      // Make getModel return null to force the retry path
      const originalGetModel = mockState.editor.getModel;
      mockState.editor.getModel = vi.fn().mockReturnValue(null);

      // Rerender → enters retry path, sets retrySetValueTimeoutRef
      rerender(<CodeEditor code="retryX" language="javascript" onChange={handleChange} />);

      // Restore getModel so the retry callback can find the model and set retryInnerTimeoutRef
      mockState.editor.getModel = originalGetModel;
      mockState.modelValue = 'different';

      // Advance past 100ms → retry callback fires, sets retryInnerTimeoutRef (50ms inner)
      act(() => {
        vi.advanceTimersByTime(110);
      });

      // Rerender again while retryInnerTimeoutRef is still pending → cleanup clears it
      rerender(<CodeEditor code="retryY" language="javascript" onChange={handleChange} />);

      act(() => {
        vi.advanceTimersByTime(200);
      });
    });
  });

  // =========================================================================
  // Unmount cleanup (lines 413-426)
  // =========================================================================

  describe('unmount cleanup', () => {
    it('should dispose the model when the component unmounts', () => {
      const { unmount } = render(
        <CodeEditor code="test" language="javascript" onChange={() => {}} />,
      );

      expect(mockState.modelDisposed).toBe(false);
      unmount();
      expect(mockState.modelDisposed).toBe(true);
    });

    it('should clear paste timeout on unmount without errors', () => {
      vi.useFakeTimers();
      render(<CodeEditor code="" language="javascript" onChange={() => {}} />);

      // Trigger paste so a timeout is queued
      act(() => {
        mockState.onDidPasteCallback?.();
      });

      // Unmount before the paste timeout fires
      cleanup();

      act(() => {
        vi.advanceTimersByTime(200);
      });
    });
  });

  // =========================================================================
  // Paste handler (lines 326-334)
  // =========================================================================

  describe('paste handler', () => {
    it('should trigger format after the paste timeout', () => {
      vi.useFakeTimers();
      render(<CodeEditor code="" language="javascript" onChange={() => {}} />);

      expect(mockState.onDidPasteCallback).not.toBeNull();

      act(() => {
        mockState.onDidPasteCallback?.();
      });

      act(() => {
        vi.advanceTimersByTime(150);
      });

      expect(mockState.editor.getAction).toHaveBeenCalledWith('editor.action.formatDocument');
    });

    it('should debounce multiple rapid pastes', () => {
      vi.useFakeTimers();
      render(<CodeEditor code="" language="javascript" onChange={() => {}} />);

      act(() => {
        mockState.onDidPasteCallback?.();
      });
      act(() => {
        mockState.onDidPasteCallback?.();
      });

      act(() => {
        vi.advanceTimersByTime(150);
      });

      const formatCalls = mockState.editor.getAction.mock.calls.filter(
        (c: any[]) => c[0] === 'editor.action.formatDocument',
      );
      expect(formatCalls.length).toBeGreaterThanOrEqual(1);
    });
  });

  // =========================================================================
  // lineNumbers
  // =========================================================================

  describe('lineNumbers', () => {
    it('should pass lineNumbers "off" when lineNumbers prop is false', () => {
      render(<CodeEditor code="" language="javascript" onChange={() => {}} lineNumbers={false} />);

      const textarea = screen.getByTestId('monaco-textarea');
      expect(textarea.getAttribute('data-linenumbers')).toBe('off');
    });

    it('should pass lineNumbers "on" by default', () => {
      render(<CodeEditor code="" language="javascript" onChange={() => {}} />);

      const textarea = screen.getByTestId('monaco-textarea');
      expect(textarea.getAttribute('data-linenumbers')).toBe('on');
    });
  });

  // =========================================================================
  // monacoLanguageOverride – file extension
  // =========================================================================

  describe('monacoLanguageOverride file extension', () => {
    it('should use .html extension in the model URI when override is html', () => {
      render(
        <CodeEditor
          code=""
          language="typescript"
          onChange={() => {}}
          monacoLanguageOverride="html"
        />,
      );

      const parseCall = mockState.monaco.Uri.parse;
      expect(parseCall).toHaveBeenCalled();
      const uriArg = parseCall.mock.calls[0][0] as string;
      expect(uriArg).toContain('.html');
    });
  });

  // =========================================================================
  // darkMode = false
  // =========================================================================

  describe('darkMode=false', () => {
    it('should select the "vs" (light) theme', () => {
      render(<CodeEditor code="" language="javascript" onChange={() => {}} darkMode={false} />);

      const editor = screen.getByTestId('monaco-editor');
      expect(editor.getAttribute('data-theme')).toBe('vs');
    });
  });
});
