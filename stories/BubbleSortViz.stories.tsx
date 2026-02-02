import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BubbleSortViz from '../components/visualizations/BubbleSortViz';

const meta = {
  title: 'Visualizations/Sorting/BubbleSort',
  component: BubbleSortViz,
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
} satisfies Meta<typeof BubbleSortViz>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
