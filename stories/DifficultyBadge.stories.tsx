import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DifficultyBadge } from '../components/DifficultyBadge';

const meta = {
  title: 'Components/DifficultyBadge',
  component: DifficultyBadge,
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
} satisfies Meta<typeof DifficultyBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Easy: Story = {
  args: {
    difficulty: 'easy',
    size: 'md',
    showIcon: true,
  },
};

export const Medium: Story = {
  args: {
    difficulty: 'medium',
    size: 'md',
    showIcon: true,
  },
};

export const Hard: Story = {
  args: {
    difficulty: 'hard',
    size: 'md',
    showIcon: true,
  },
};

// Size variants
export const SmallSize: Story = {
  args: {
    difficulty: 'medium',
    size: 'sm',
    showIcon: true,
  },
};

export const LargeSize: Story = {
  args: {
    difficulty: 'medium',
    size: 'lg',
    showIcon: true,
  },
};

// Without icon
export const NoIcon: Story = {
  args: {
    difficulty: 'hard',
    size: 'md',
    showIcon: false,
  },
};

// All difficulties together
export const AllDifficulties: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <DifficultyBadge difficulty="easy" size="md" showIcon={true} />
      <DifficultyBadge difficulty="medium" size="md" showIcon={true} />
      <DifficultyBadge difficulty="hard" size="md" showIcon={true} />
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <DifficultyBadge difficulty="medium" size="sm" showIcon={true} />
      <DifficultyBadge difficulty="medium" size="md" showIcon={true} />
      <DifficultyBadge difficulty="medium" size="lg" showIcon={true} />
    </div>
  ),
};
