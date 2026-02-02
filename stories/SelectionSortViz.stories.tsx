import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SelectionSortViz from '../components/visualizations/SelectionSortViz';

const meta = {
  title: 'Visualizations/Sorting/SelectionSort',
  component: SelectionSortViz,
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
} satisfies Meta<typeof SelectionSortViz>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
