import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ThemeProvider } from '../components/ThemeProvider';
import { ThemeToggle } from '../components/ThemeToggle';

const meta = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
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
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark">
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// Small size
export const Small: Story = {
  args: {
    size: 'sm',
  },
};

// Medium size (default)
export const Medium: Story = {
  args: {
    size: 'md',
  },
};

// Large size
export const Large: Story = {
  args: {
    size: 'lg',
  },
};

// With custom className
export const WithCustomClassName: Story = {
  args: {
    size: 'md',
    className: 'shadow-lg shadow-purple-500/20',
  },
};

// All sizes side by side
export const AllSizes: Story = {
  render: () => (
    <ThemeProvider defaultTheme="dark">
      <div className="flex items-center gap-6">
        <div className="text-center">
          <ThemeToggle size="sm" />
          <p className="text-xs text-gray-500 mt-2">Small</p>
        </div>
        <div className="text-center">
          <ThemeToggle size="md" />
          <p className="text-xs text-gray-500 mt-2">Medium</p>
        </div>
        <div className="text-center">
          <ThemeToggle size="lg" />
          <p className="text-xs text-gray-500 mt-2">Large</p>
        </div>
      </div>
    </ThemeProvider>
  ),
};

// In a dark navigation bar context
export const InNavBar: Story = {
  render: () => (
    <ThemeProvider defaultTheme="dark">
      <div className="flex items-center justify-between px-6 py-3 bg-gray-900 border border-gray-800 rounded-lg max-w-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500" />
          <span className="text-sm font-semibold text-gray-200">Coding Drills</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">Settings</span>
          <ThemeToggle size="sm" />
        </div>
      </div>
    </ThemeProvider>
  ),
};

// In a light theme context
export const InLightTheme: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div className="p-8 bg-white rounded-lg border border-gray-200">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  args: {
    size: 'md',
  },
};

// All sizes in light theme
export const AllSizesLightTheme: Story = {
  render: () => (
    <ThemeProvider defaultTheme="light">
      <div className="p-8 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <ThemeToggle size="sm" />
            <p className="text-xs text-gray-500 mt-2">Small</p>
          </div>
          <div className="text-center">
            <ThemeToggle size="md" />
            <p className="text-xs text-gray-500 mt-2">Medium</p>
          </div>
          <div className="text-center">
            <ThemeToggle size="lg" />
            <p className="text-xs text-gray-500 mt-2">Large</p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  ),
};
