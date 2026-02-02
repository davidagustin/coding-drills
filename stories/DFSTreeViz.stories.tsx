import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DFSTreeViz from '../components/visualizations/DFSTreeViz';

const meta = {
  title: 'Visualizations/Traversal/DFSTree',
  component: DFSTreeViz,
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
} satisfies Meta<typeof DFSTreeViz>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
