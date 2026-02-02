import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LinkedListViz from '../components/visualizations/LinkedListViz';

const meta = {
  title: 'Visualizations/DataStructures/LinkedList',
  component: LinkedListViz,
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
} satisfies Meta<typeof LinkedListViz>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
