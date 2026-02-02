import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import QuickSortViz from '../components/visualizations/QuickSortViz';

const meta = {
  title: 'Visualizations/Sorting/QuickSort',
  component: QuickSortViz,
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
} satisfies Meta<typeof QuickSortViz>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
