import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ErrorBoundary, ErrorFallback } from '../components/ErrorBoundary';

const meta = {
  title: 'Feedback/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0f' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

// A component that deliberately throws to trigger ErrorBoundary
function ThrowingComponent({ message }: { message: string }) {
  throw new Error(message);
}

// Page-level error boundary (full-page layout)
export const PageLevel: Story = {
  args: {
    level: 'page',
    showDetails: false,
    children: <ThrowingComponent message="Failed to load quiz data from the server" />,
  },
};

// Inline error boundary (compact, for smaller sections)
export const InlineLevel: Story = {
  args: {
    level: 'inline',
    showDetails: false,
    children: <ThrowingComponent message="Component rendering failed unexpectedly" />,
  },
};

// Page-level with custom title
export const WithCustomTitle: Story = {
  args: {
    level: 'page',
    showDetails: false,
    errorTitle: 'Quiz Failed to Load',
    children: <ThrowingComponent message="Network timeout while fetching questions" />,
  },
};

// Page-level with error details visible (development mode)
export const WithDetails: Story = {
  args: {
    level: 'page',
    showDetails: true,
    children: <ThrowingComponent message="Cannot read properties of undefined (reading 'map')" />,
  },
};

// Inline with custom title
export const InlineWithCustomTitle: Story = {
  args: {
    level: 'inline',
    showDetails: false,
    errorTitle: 'Code Editor Error',
    children: <ThrowingComponent message="Syntax highlighting engine crashed" />,
  },
};

// Inline with details
export const InlineWithDetails: Story = {
  args: {
    level: 'inline',
    showDetails: true,
    children: <ThrowingComponent message="Maximum call stack size exceeded" />,
  },
};

// Custom fallback using ErrorFallback component
export const DefaultFallback: Story = {
  args: {
    fallback: (
      <ErrorFallback
        error={new Error('Something went wrong while rendering the quiz')}
        title="Quiz Error"
        message="We encountered an issue loading this quiz. Please try again."
      />
    ),
    children: <ThrowingComponent message="This error is caught by custom fallback" />,
  },
};

// ErrorFallback with reset button
export const FallbackWithReset: Story = {
  args: {
    fallback: (
      <ErrorFallback
        error={new Error('Timer component failed to initialize')}
        resetErrorBoundary={() => {}}
        title="Timer Error"
        message="The quiz timer encountered an error."
      />
    ),
    children: <ThrowingComponent message="Timer init failed" />,
  },
};

// ErrorFallback without error details
export const FallbackMinimal: Story = {
  args: {
    fallback: (
      <ErrorFallback title="Oops!" message="Something unexpected happened. Please try again." />
    ),
    children: <ThrowingComponent message="Generic error" />,
  },
};

// Multiple inline errors stacked (simulating dashboard)
export const MultipleInlineErrors: Story = {
  render: () => (
    <div className="space-y-4 max-w-lg">
      <p className="text-xs text-zinc-500 mb-2">Multiple inline error boundaries in a layout</p>
      <ErrorBoundary level="inline" errorTitle="Stats Widget Error">
        <ThrowingComponent message="Failed to compute statistics" />
      </ErrorBoundary>
      <ErrorBoundary level="inline" errorTitle="Chart Error">
        <ThrowingComponent message="Chart data is malformed" />
      </ErrorBoundary>
      <ErrorBoundary level="inline" errorTitle="Leaderboard Error">
        <ThrowingComponent message="Could not fetch leaderboard" />
      </ErrorBoundary>
    </div>
  ),
};

// Comparison: page vs inline
export const PageVsInline: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-xs text-zinc-500 mb-2">Inline level</p>
        <div className="max-w-lg">
          <ErrorBoundary level="inline">
            <ThrowingComponent message="Inline error example" />
          </ErrorBoundary>
        </div>
      </div>
      <div>
        <p className="text-xs text-zinc-500 mb-2">
          ErrorFallback component (standalone, no boundary needed for display)
        </p>
        <div className="max-w-lg">
          <ErrorFallback
            error={new Error('Standalone fallback display')}
            resetErrorBoundary={() => {}}
            title="Standalone Fallback"
            message="This is the ErrorFallback component rendered directly."
          />
        </div>
      </div>
    </div>
  ),
};
