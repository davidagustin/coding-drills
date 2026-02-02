import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  CardSkeleton,
  CodeBlockSkeleton,
  LanguageGridSkeleton,
  ListSkeleton,
  MethodCardSkeleton,
  QuizSkeleton,
  Skeleton,
} from '../components/LoadingSkeleton';

// ─── Skeleton (Base) ────────────────────────────────────────────────────────

const skeletonMeta = {
  title: 'Feedback/LoadingSkeleton',
  component: Skeleton,
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
} satisfies Meta<typeof Skeleton>;

export default skeletonMeta;
type Story = StoryObj<typeof skeletonMeta>;

// Base Skeleton in various shapes
export const SkeletonLine: Story = {
  args: {
    className: 'h-4 w-full rounded',
  },
};

export const SkeletonSquare: Story = {
  args: {
    className: 'h-16 w-16 rounded-lg',
  },
};

export const SkeletonCircle: Story = {
  args: {
    className: 'h-12 w-12 rounded-full',
  },
};

export const SkeletonWide: Story = {
  args: {
    className: 'h-6 w-3/4 rounded-lg',
  },
};

export const SkeletonNarrow: Story = {
  args: {
    className: 'h-4 w-1/3 rounded',
  },
};

// Multiple skeleton lines forming a paragraph
export const SkeletonParagraph: Story = {
  render: () => (
    <div className="space-y-3 max-w-md">
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-5/6 rounded" />
      <Skeleton className="h-4 w-4/5 rounded" />
      <Skeleton className="h-4 w-3/4 rounded" />
      <Skeleton className="h-4 w-2/3 rounded" />
    </div>
  ),
};

// ─── CardSkeleton ───────────────────────────────────────────────────────────

export const Card: Story = {
  render: () => (
    <div className="max-w-sm">
      <CardSkeleton />
    </div>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-2xl">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  ),
};

// ─── CodeBlockSkeleton ──────────────────────────────────────────────────────

export const CodeBlock: Story = {
  render: () => (
    <div className="max-w-lg">
      <CodeBlockSkeleton />
    </div>
  ),
};

// ─── MethodCardSkeleton ─────────────────────────────────────────────────────

export const MethodCard: Story = {
  render: () => (
    <div className="max-w-md">
      <MethodCardSkeleton />
    </div>
  ),
};

export const MethodCardList: Story = {
  render: () => (
    <div className="space-y-3 max-w-md">
      <MethodCardSkeleton />
      <MethodCardSkeleton />
      <MethodCardSkeleton />
      <MethodCardSkeleton />
    </div>
  ),
};

// ─── QuizSkeleton ───────────────────────────────────────────────────────────

export const Quiz: Story = {
  render: () => (
    <div className="max-w-2xl">
      <QuizSkeleton />
    </div>
  ),
};

// ─── LanguageGridSkeleton ───────────────────────────────────────────────────

export const LanguageGrid: Story = {
  render: () => <LanguageGridSkeleton />,
};

// ─── ListSkeleton ───────────────────────────────────────────────────────────

export const ListDefault: Story = {
  render: () => (
    <div className="max-w-md">
      <ListSkeleton />
    </div>
  ),
};

export const ListThreeItems: Story = {
  render: () => (
    <div className="max-w-md">
      <ListSkeleton count={3} />
    </div>
  ),
};

export const ListTenItems: Story = {
  render: () => (
    <div className="max-w-md">
      <ListSkeleton count={10} />
    </div>
  ),
};

// ─── All Skeleton Types ─────────────────────────────────────────────────────

export const AllSkeletonTypes: Story = {
  render: () => (
    <div className="space-y-12 max-w-4xl">
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
          Base Skeleton Shapes
        </p>
        <div className="flex items-end gap-4">
          <div className="space-y-1 text-center">
            <Skeleton className="h-4 w-32 rounded" />
            <span className="text-xs text-gray-600">Line</span>
          </div>
          <div className="space-y-1 text-center">
            <Skeleton className="h-16 w-16 rounded-lg" />
            <span className="text-xs text-gray-600">Square</span>
          </div>
          <div className="space-y-1 text-center">
            <Skeleton className="h-12 w-12 rounded-full" />
            <span className="text-xs text-gray-600">Circle</span>
          </div>
          <div className="space-y-1 text-center">
            <Skeleton className="h-8 w-48 rounded-xl" />
            <span className="text-xs text-gray-600">Wide</span>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
          Card Skeleton
        </p>
        <div className="max-w-sm">
          <CardSkeleton />
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
          Code Block Skeleton
        </p>
        <div className="max-w-lg">
          <CodeBlockSkeleton />
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
          Method Card Skeleton
        </p>
        <div className="max-w-md">
          <MethodCardSkeleton />
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
          Quiz Skeleton
        </p>
        <div className="max-w-2xl">
          <QuizSkeleton />
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
          Language Grid Skeleton
        </p>
        <LanguageGridSkeleton />
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
          List Skeleton (5 items)
        </p>
        <div className="max-w-md">
          <ListSkeleton count={5} />
        </div>
      </div>
    </div>
  ),
};
