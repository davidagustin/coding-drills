import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProgressBar } from '../components/ProgressBar';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
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
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    current: 3,
    total: 10,
    showLabel: false,
    variant: 'default',
    size: 'md',
  },
};

export const WithLabel: Story = {
  args: {
    current: 7,
    total: 10,
    showLabel: true,
    variant: 'default',
    size: 'md',
  },
};

export const Empty: Story = {
  args: {
    current: 0,
    total: 10,
    showLabel: true,
    variant: 'default',
    size: 'md',
  },
};

export const Complete: Story = {
  args: {
    current: 10,
    total: 10,
    showLabel: true,
    variant: 'success',
    size: 'md',
  },
};

// Variants
export const SuccessVariant: Story = {
  args: {
    current: 8,
    total: 10,
    showLabel: true,
    variant: 'success',
    size: 'md',
  },
};

export const WarningVariant: Story = {
  args: {
    current: 5,
    total: 10,
    showLabel: true,
    variant: 'warning',
    size: 'md',
  },
};

export const DangerVariant: Story = {
  args: {
    current: 2,
    total: 10,
    showLabel: true,
    variant: 'danger',
    size: 'md',
  },
};

export const InfoVariant: Story = {
  args: {
    current: 6,
    total: 10,
    showLabel: true,
    variant: 'info',
    size: 'md',
  },
};

// Sizes
export const SmallSize: Story = {
  args: {
    current: 5,
    total: 10,
    showLabel: false,
    variant: 'default',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    current: 5,
    total: 10,
    showLabel: false,
    variant: 'default',
    size: 'lg',
  },
};

// All variants together
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <p className="text-gray-400 text-sm mb-1">Default</p>
        <ProgressBar current={6} total={10} variant="default" size="md" />
      </div>
      <div>
        <p className="text-gray-400 text-sm mb-1">Success</p>
        <ProgressBar current={6} total={10} variant="success" size="md" />
      </div>
      <div>
        <p className="text-gray-400 text-sm mb-1">Warning</p>
        <ProgressBar current={6} total={10} variant="warning" size="md" />
      </div>
      <div>
        <p className="text-gray-400 text-sm mb-1">Danger</p>
        <ProgressBar current={6} total={10} variant="danger" size="md" />
      </div>
      <div>
        <p className="text-gray-400 text-sm mb-1">Info</p>
        <ProgressBar current={6} total={10} variant="info" size="md" />
      </div>
    </div>
  ),
};

// Progress animation
export const ProgressStages: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <ProgressBar current={0} total={10} showLabel variant="default" size="md" />
      <ProgressBar current={2} total={10} showLabel variant="default" size="md" />
      <ProgressBar current={5} total={10} showLabel variant="default" size="md" />
      <ProgressBar current={8} total={10} showLabel variant="default" size="md" />
      <ProgressBar current={10} total={10} showLabel variant="success" size="md" />
    </div>
  ),
};
