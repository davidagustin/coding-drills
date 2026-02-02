import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HeapSortViz from '../components/visualizations/HeapSortViz';

const meta = {
  title: 'Visualizations/Sorting/HeapSort',
  component: HeapSortViz,
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
} satisfies Meta<typeof HeapSortViz>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
