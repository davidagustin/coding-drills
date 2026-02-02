import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QuestionCounter } from '../components/QuestionCounter';

const meta = {
  title: 'Quiz/QuestionCounter',
  component: QuestionCounter,
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
} satisfies Meta<typeof QuestionCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default Variant ────────────────────────────────────────────────────────

export const DefaultAtStart: Story = {
  args: {
    current: 1,
    total: 10,
    showProgress: true,
    variant: 'default',
  },
};

export const DefaultAtMiddle: Story = {
  args: {
    current: 5,
    total: 10,
    showProgress: true,
    variant: 'default',
  },
};

export const DefaultAtEnd: Story = {
  args: {
    current: 10,
    total: 10,
    showProgress: true,
    variant: 'default',
  },
};

export const DefaultWithoutProgress: Story = {
  args: {
    current: 3,
    total: 10,
    showProgress: false,
    variant: 'default',
  },
};

// Large total (triggers progress bar instead of dots)
export const DefaultLargeTotal: Story = {
  args: {
    current: 15,
    total: 50,
    showProgress: true,
    variant: 'default',
  },
};

export const DefaultLargeTotalNearEnd: Story = {
  args: {
    current: 48,
    total: 50,
    showProgress: true,
    variant: 'default',
  },
};

// ─── Minimal Variant ────────────────────────────────────────────────────────

export const MinimalAtStart: Story = {
  args: {
    current: 1,
    total: 10,
    variant: 'minimal',
  },
};

export const MinimalAtMiddle: Story = {
  args: {
    current: 5,
    total: 10,
    variant: 'minimal',
  },
};

export const MinimalAtEnd: Story = {
  args: {
    current: 10,
    total: 10,
    variant: 'minimal',
  },
};

export const MinimalLargeNumbers: Story = {
  args: {
    current: 99,
    total: 150,
    variant: 'minimal',
  },
};

// ─── Pill Variant ───────────────────────────────────────────────────────────

export const PillAtStart: Story = {
  args: {
    current: 1,
    total: 10,
    variant: 'pill',
  },
};

export const PillAtMiddle: Story = {
  args: {
    current: 5,
    total: 10,
    variant: 'pill',
  },
};

export const PillAtEnd: Story = {
  args: {
    current: 10,
    total: 10,
    variant: 'pill',
  },
};

export const PillLargeNumbers: Story = {
  args: {
    current: 42,
    total: 100,
    variant: 'pill',
  },
};

// ─── Edge Cases ─────────────────────────────────────────────────────────────

export const SingleQuestion: Story = {
  args: {
    current: 1,
    total: 1,
    showProgress: true,
    variant: 'default',
  },
};

export const TwoQuestions: Story = {
  args: {
    current: 1,
    total: 2,
    showProgress: true,
    variant: 'default',
  },
};

export const MaxDotsExactly20: Story = {
  args: {
    current: 12,
    total: 20,
    showProgress: true,
    variant: 'default',
  },
};

export const JustOverDotThreshold: Story = {
  args: {
    current: 7,
    total: 21,
    showProgress: true,
    variant: 'default',
  },
};

// ─── All Variants Side by Side ──────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
          Default (with dots)
        </p>
        <QuestionCounter current={3} total={10} showProgress={true} variant="default" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
          Default (with progress bar)
        </p>
        <QuestionCounter current={15} total={50} showProgress={true} variant="default" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
          Default (no progress)
        </p>
        <QuestionCounter current={7} total={10} showProgress={false} variant="default" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">Minimal</p>
        <QuestionCounter current={3} total={10} variant="minimal" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">Pill</p>
        <QuestionCounter current={3} total={10} variant="pill" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
          Final Question (default)
        </p>
        <QuestionCounter current={10} total={10} showProgress={true} variant="default" />
      </div>
    </div>
  ),
};

// All variants at the same position for comparison
export const VariantComparison: Story = {
  render: () => (
    <div className="flex items-center gap-12">
      <div className="text-center">
        <p className="text-xs text-gray-500 mb-3">Default</p>
        <QuestionCounter current={5} total={10} showProgress={true} variant="default" />
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-500 mb-3">Minimal</p>
        <QuestionCounter current={5} total={10} variant="minimal" />
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-500 mb-3">Pill</p>
        <QuestionCounter current={5} total={10} variant="pill" />
      </div>
    </div>
  ),
};
