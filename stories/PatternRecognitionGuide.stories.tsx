import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { PatternRecognitionGuide } from '../components/PatternRecognitionGuide';

const meta = {
  title: 'Overlays/PatternRecognitionGuide',
  component: PatternRecognitionGuide,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0f' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'closed' },
  },
} satisfies Meta<typeof PatternRecognitionGuide>;

export default meta;
type Story = StoryObj<typeof meta>;

// Modal in its open state - all sections collapsed by default
export const Open: Story = {
  args: {
    isOpen: true,
    onClose: fn(),
  },
};

// Modal closed (renders nothing - included for completeness)
export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: fn(),
  },
};

// Interactive story with a toggle button to open/close the modal
export const Interactive: Story = {
  render: function InteractiveGuide() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ padding: '48px', textAlign: 'center' }}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            border: 'none',
            padding: '12px 32px',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Open Pattern Recognition Guide
        </button>
        <PatternRecognitionGuide isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

// On light background to test contrast
export const OnLightBackground: Story = {
  args: {
    isOpen: true,
    onClose: fn(),
  },
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
};

// Shown over page content to demonstrate the overlay/backdrop behavior
export const OverPageContent: Story = {
  render: function GuideOverContent() {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div>
        <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ color: '#f1f5f9', fontSize: '2rem', marginBottom: '16px' }}>
            Practice Page
          </h1>
          <p style={{ color: '#94a3b8', marginBottom: '16px', lineHeight: '1.6' }}>
            This content is behind the modal overlay. The dark backdrop with blur ensures the modal
            content is readable while still providing context about where the user came from. Click
            the close button or press Escape to dismiss the guide.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginTop: '24px',
            }}
          >
            {[
              'Two Pointers',
              'Sliding Window',
              'Binary Search',
              'DFS/BFS',
              'Dynamic Programming',
              'Greedy',
            ].map((pattern) => (
              <div
                key={pattern}
                style={{
                  background: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center',
                }}
              >
                <h3 style={{ color: '#e2e8f0', fontSize: '0.875rem', fontWeight: 600 }}>
                  {pattern}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '4px' }}>
                  12 problems
                </p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            style={{
              marginTop: '24px',
              background: '#6366f1',
              color: 'white',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Reopen Guide
          </button>
        </div>
        <PatternRecognitionGuide isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};
