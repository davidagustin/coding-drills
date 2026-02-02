import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BackLink } from '../components/BackLink';

const meta = {
  title: 'Navigation/BackLink',
  component: BackLink,
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
  argTypes: {
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof BackLink>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default back link with href
export const Default: Story = {
  args: {
    href: '/',
    label: 'Back',
  },
};

// Custom label
export const CustomLabel: Story = {
  args: {
    href: '/drills',
    label: 'Back to Drills',
  },
};

// With a longer descriptive label
export const LongLabel: Story = {
  args: {
    href: '/languages/javascript',
    label: 'Back to JavaScript Fundamentals',
  },
};

// With custom className
export const WithClassName: Story = {
  args: {
    href: '/',
    label: 'Back',
    className: 'text-purple-400 hover:text-purple-300',
  },
};

// Using onClick handler (button variant)
export const WithOnClick: Story = {
  args: {
    label: 'Go Back',
    onClick: () => {},
  },
};

// Using router back
export const WithRouterBack: Story = {
  args: {
    label: 'Return',
    useRouterBack: true,
  },
};

// In context: placed above content like in a real page
export const InContext: Story = {
  render: () => (
    <div className="max-w-2xl">
      <BackLink href="/languages" label="Back to Languages" />
      <div className="mt-6 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
        <h1 className="text-2xl font-bold text-gray-100 mb-2">JavaScript Array Methods</h1>
        <p className="text-gray-400">Practice working with map, filter, reduce, and more.</p>
      </div>
    </div>
  ),
};

// All variants displayed together
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Default (href)
        </p>
        <BackLink href="/" label="Back" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Custom Label
        </p>
        <BackLink href="/drills" label="Back to Drills" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Long Label</p>
        <BackLink href="/languages/javascript" label="Back to JavaScript Fundamentals" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          With onClick
        </p>
        <BackLink label="Go Back" onClick={() => {}} />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Router Back
        </p>
        <BackLink label="Return" useRouterBack={true} />
      </div>
    </div>
  ),
};
