import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from '../components/LoadingSpinner';

const meta = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0f' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'primary',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    variant: 'primary',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    variant: 'primary',
  },
};

// Variants
export const PrimaryVariant: Story = {
  args: {
    size: 'md',
    variant: 'primary',
  },
};

export const DefaultVariant: Story = {
  args: {
    size: 'md',
    variant: 'default',
  },
};

export const SuccessVariant: Story = {
  args: {
    size: 'md',
    variant: 'success',
  },
};

export const ErrorVariant: Story = {
  args: {
    size: 'md',
    variant: 'error',
  },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="sm" variant="primary" />
        <span className="text-gray-400 text-xs">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="md" variant="primary" />
        <span className="text-gray-400 text-xs">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="lg" variant="primary" />
        <span className="text-gray-400 text-xs">Large</span>
      </div>
    </div>
  ),
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="lg" variant="default" />
        <span className="text-gray-400 text-xs">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="lg" variant="primary" />
        <span className="text-gray-400 text-xs">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="lg" variant="success" />
        <span className="text-gray-400 text-xs">Success</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="lg" variant="error" />
        <span className="text-gray-400 text-xs">Error</span>
      </div>
    </div>
  ),
};

// In context - loading state
export const InContext: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4 p-8 bg-gray-800 rounded-xl">
      <LoadingSpinner size="lg" variant="primary" />
      <p className="text-gray-300 text-sm">Loading questions...</p>
    </div>
  ),
};
