// @vitest-environment jsdom

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CodeEditor from '../CodeEditor';

// Mock Monaco Editor
vi.mock('@monaco-editor/react', () => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: ({ value, onChange, onMount, loading, readOnly }: any) => {
      // Trigger onMount to simulate editor readiness
      if (onMount) {
        // ... setup ...
      }

      return (
        <div data-testid="monaco-editor">
          <textarea
            data-testid="monaco-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            readOnly={!!readOnly}
          />
          {loading}
        </div>
      );
    },
  };
});

describe('CodeEditor', () => {
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
    // Our mock renders loading prop. In CodeEditor, loading prop is passed.
    // We can verify "Loading editor..." text is present if the mock renders it.
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
});
