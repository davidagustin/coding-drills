import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QuestionCountSlider } from '../components/QuestionCountSlider';

const meta = {
  title: 'Quiz/QuestionCountSlider',
  component: QuestionCountSlider,
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
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof QuestionCountSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state with mid-range value
export const Default: Story = {
  args: {
    value: 10,
    min: 1,
    max: 50,
    label: 'Questions',
    showLabel: true,
    showPresets: false,
  },
};

// With preset quick-select buttons visible
export const WithPresets: Story = {
  args: {
    value: 15,
    min: 1,
    max: 50,
    label: 'Questions',
    showLabel: true,
    showPresets: true,
  },
};

// Without preset buttons
export const WithoutPresets: Story = {
  args: {
    value: 20,
    min: 1,
    max: 50,
    label: 'Questions',
    showLabel: true,
    showPresets: false,
  },
};

// Slider at minimum value
export const MinValue: Story = {
  args: {
    value: 1,
    min: 1,
    max: 50,
    label: 'Questions',
    showLabel: true,
    showPresets: false,
  },
};

// Slider at maximum value
export const MaxValue: Story = {
  args: {
    value: 50,
    min: 1,
    max: 50,
    label: 'Questions',
    showLabel: true,
    showPresets: false,
  },
};

// Custom range with smaller bounds
export const CustomRange: Story = {
  args: {
    value: 3,
    min: 1,
    max: 10,
    label: 'Quick Quiz',
    showLabel: true,
    showPresets: true,
  },
};

// With label displayed
export const WithLabel: Story = {
  args: {
    value: 25,
    min: 1,
    max: 50,
    label: 'Number of Questions',
    showLabel: true,
    showPresets: false,
  },
};

// Without label displayed
export const WithoutLabel: Story = {
  args: {
    value: 25,
    min: 1,
    max: 50,
    label: 'Questions',
    showLabel: false,
    showPresets: false,
  },
};

// Presets with a selected preset value highlighted
export const PresetSelected: Story = {
  args: {
    value: 20,
    min: 1,
    max: 50,
    label: 'Questions',
    showLabel: true,
    showPresets: true,
  },
};

// Presets with some disabled (max < preset value)
export const PresetsPartiallyDisabled: Story = {
  args: {
    value: 5,
    min: 1,
    max: 12,
    label: 'Short Quiz',
    showLabel: true,
    showPresets: true,
  },
};

// Wide range slider
export const WideRange: Story = {
  args: {
    value: 50,
    min: 1,
    max: 200,
    label: 'Practice Problems',
    showLabel: true,
    showPresets: true,
  },
};

// All variants displayed together
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 max-w-md">
      <div>
        <p className="text-xs text-zinc-500 mb-2">Default (no presets)</p>
        <QuestionCountSlider
          value={10}
          onChange={() => {}}
          min={1}
          max={50}
          label="Questions"
          showLabel={true}
          showPresets={false}
        />
      </div>
      <div>
        <p className="text-xs text-zinc-500 mb-2">With presets</p>
        <QuestionCountSlider
          value={15}
          onChange={() => {}}
          min={1}
          max={50}
          label="Questions"
          showLabel={true}
          showPresets={true}
        />
      </div>
      <div>
        <p className="text-xs text-zinc-500 mb-2">Without label</p>
        <QuestionCountSlider
          value={25}
          onChange={() => {}}
          min={1}
          max={50}
          showLabel={false}
          showPresets={false}
        />
      </div>
      <div>
        <p className="text-xs text-zinc-500 mb-2">Min value</p>
        <QuestionCountSlider
          value={1}
          onChange={() => {}}
          min={1}
          max={50}
          label="Questions"
          showLabel={true}
          showPresets={false}
        />
      </div>
      <div>
        <p className="text-xs text-zinc-500 mb-2">Max value</p>
        <QuestionCountSlider
          value={50}
          onChange={() => {}}
          min={1}
          max={50}
          label="Questions"
          showLabel={true}
          showPresets={false}
        />
      </div>
      <div>
        <p className="text-xs text-zinc-500 mb-2">Custom short range (1-10) with presets</p>
        <QuestionCountSlider
          value={5}
          onChange={() => {}}
          min={1}
          max={10}
          label="Quick Quiz"
          showLabel={true}
          showPresets={true}
        />
      </div>
    </div>
  ),
};
