import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MergeSortViz from '../components/visualizations/MergeSortViz';

const meta = {
  title: 'Visualizations/Sorting/MergeSort',
  component: MergeSortViz,
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
} satisfies Meta<typeof MergeSortViz>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
