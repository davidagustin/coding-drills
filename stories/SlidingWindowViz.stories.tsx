import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SlidingWindowMaxViz from '../components/visualizations/SlidingWindowMaxViz';

const meta = {
  title: 'Visualizations/Patterns/SlidingWindow',
  component: SlidingWindowMaxViz,
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
} satisfies Meta<typeof SlidingWindowMaxViz>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
