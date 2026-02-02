import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  CompletedAllDrills,
  EmptyState,
  NoDrillsAvailable,
  NoResultsFound,
} from '../components/EmptyState';

const meta = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
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
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default empty state with icon and description
export const Default: Story = {
  args: {
    title: 'No items found',
    description:
      'There are no items to display at this time. Try creating a new one or adjusting your filters.',
  },
};

// With an action button that links somewhere
export const WithLinkAction: Story = {
  args: {
    title: 'No drills started',
    description:
      'You have not started any coding drills yet. Browse our collection to find exercises that match your skill level.',
    action: {
      label: 'Browse Drills',
      href: '/drills',
    },
  },
};

// With an action button that triggers an onClick
export const WithClickAction: Story = {
  args: {
    title: 'Search returned no results',
    description:
      'We could not find any drills matching your search criteria. Try broadening your search or clearing filters.',
    action: {
      label: 'Clear Filters',
      onClick: () => {},
    },
  },
  argTypes: {
    action: { control: false },
  },
};

// With a custom icon
export const WithCustomIcon: Story = {
  args: {
    icon: (
      <svg
        className="w-16 h-16 text-amber-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    title: 'Connection Error',
    description:
      'Unable to connect to the server. Please check your internet connection and try again.',
    action: {
      label: 'Retry Connection',
      onClick: () => {},
    },
  },
};

// Without description
export const NoDescription: Story = {
  args: {
    title: 'Nothing here yet',
  },
};

// Long description text
export const LongDescription: Story = {
  args: {
    title: 'Feature Coming Soon',
    description:
      'We are actively working on bringing this feature to Coding Drills. Our team is building interactive exercises that will help you master advanced programming patterns including closures, generators, async iterators, proxies, and metaprogramming techniques. Stay tuned for updates and thank you for your patience.',
  },
};

// Without icon
export const WithoutIcon: Story = {
  args: {
    icon: null,
    title: 'Queue is empty',
    description:
      'All pending tasks have been completed. New tasks will appear here when they are added to the queue.',
  },
};

// With custom className
export const WithCustomClassName: Story = {
  args: {
    title: 'Custom styled empty state',
    description: 'This empty state has a custom background applied via className.',
    className: 'bg-gray-800/50 rounded-2xl border border-gray-700',
  },
};

// Preset: NoResultsFound with search term
export const PresetNoResultsWithSearchTerm: Story = {
  render: () => <NoResultsFound searchTerm="Array.prototype" onClear={() => {}} />,
};

// Preset: NoResultsFound without search term
export const PresetNoResultsGeneric: Story = {
  render: () => <NoResultsFound onClear={() => {}} />,
};

// Preset: NoDrillsAvailable
export const PresetNoDrills: Story = {
  render: () => <NoDrillsAvailable />,
};

// Preset: CompletedAllDrills
export const PresetCompletedAll: Story = {
  render: () => <CompletedAllDrills />,
};

// All variants displayed together
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">Default</p>
        <EmptyState
          title="No items found"
          description="There are no items to display at this time."
        />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
          With Link Action
        </p>
        <EmptyState
          title="Get started with drills"
          description="Pick a language and start practicing."
          action={{ label: 'Browse Languages', href: '/' }}
        />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
          No Results Found
        </p>
        <NoResultsFound searchTerm="async/await" onClear={() => {}} />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
          No Drills Available
        </p>
        <NoDrillsAvailable />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
          All Drills Completed
        </p>
        <CompletedAllDrills />
      </div>
    </div>
  ),
};
