import type { Meta, StoryObj } from '@storybook/react';
import { StatsBar } from '../components/StatsBar';

const meta = {
  title: 'Components/StatsBar',
  component: StatsBar,
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
} satisfies Meta<typeof StatsBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleStats = [
  { label: 'Correct', value: 8 },
  { label: 'Incorrect', value: 2 },
  { label: 'Streak', value: 5, highlight: true },
  { label: 'Accuracy', value: '80%' },
];

const statsWithTrends = [
  { label: 'Score', value: 850, trend: 'up' as const },
  { label: 'Rank', value: '#12', trend: 'up' as const },
  { label: 'Streak', value: 7, trend: 'neutral' as const, highlight: true },
  { label: 'Accuracy', value: '92%', trend: 'down' as const },
];

export const Default: Story = {
  args: {
    stats: sampleStats,
    variant: 'default',
  },
};

export const Compact: Story = {
  args: {
    stats: sampleStats,
    variant: 'compact',
  },
};

export const Card: Story = {
  args: {
    stats: sampleStats,
    variant: 'card',
  },
};

export const WithTrends: Story = {
  args: {
    stats: statsWithTrends,
    variant: 'default',
  },
};

export const WithTrendsCard: Story = {
  args: {
    stats: statsWithTrends,
    variant: 'card',
  },
};

export const WithTrendsCompact: Story = {
  args: {
    stats: statsWithTrends,
    variant: 'compact',
  },
};

// Quiz results stats
const quizResultStats = [
  { label: 'Questions', value: 10 },
  { label: 'Correct', value: 8, highlight: true },
  { label: 'Incorrect', value: 2 },
  { label: 'Time', value: '2:34' },
  { label: 'Score', value: '80%', highlight: true },
];

export const QuizResults: Story = {
  args: {
    stats: quizResultStats,
    variant: 'default',
  },
};

export const QuizResultsCard: Story = {
  args: {
    stats: quizResultStats,
    variant: 'card',
  },
};

// All variants comparison
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-gray-400 text-sm mb-3">Default Variant</p>
        <StatsBar stats={sampleStats} variant="default" />
      </div>
      <div>
        <p className="text-gray-400 text-sm mb-3">Compact Variant</p>
        <StatsBar stats={sampleStats} variant="compact" />
      </div>
      <div>
        <p className="text-gray-400 text-sm mb-3">Card Variant</p>
        <StatsBar stats={sampleStats} variant="card" />
      </div>
    </div>
  ),
};
