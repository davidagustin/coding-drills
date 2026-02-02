import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Modal, ModalBody, ModalFooter } from '../components/Modal';

const meta = {
  title: 'Overlays/Modal',
  component: Modal,
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
    onClose: { action: 'closed' },
  },
  args: {
    isOpen: true,
    title: 'Modal Title',
    showCloseButton: true,
    closeOnOverlayClick: true,
    closeOnEscape: true,
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default small modal
export const Default: Story = {
  args: {
    size: 'sm',
    children: (
      <ModalBody>
        <p>
          This is a small modal with some basic content. It is the default size and works well for
          simple confirmations or short messages.
        </p>
      </ModalBody>
    ),
  },
};

// Medium size
export const MediumSize: Story = {
  args: {
    size: 'md',
    title: 'Edit Profile',
    children: (
      <div>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="display-name"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Display Name
              </label>
              <input
                id="display-name"
                type="text"
                defaultValue="Jane Developer"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email Address
              </label>
              <input
                id="email-address"
                type="email"
                defaultValue="jane@example.com"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                id="bio"
                rows={3}
                defaultValue="Full-stack developer passionate about clean code and testing."
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </ModalFooter>
      </div>
    ),
  },
};

// Large size
export const LargeSize: Story = {
  args: {
    size: 'lg',
    title: 'Select a Coding Drill',
    children: (
      <div>
        <ModalBody>
          <p className="mb-4">Choose from the available drills below to practice your skills.</p>
          <div className="space-y-3">
            {[
              'Array.map() Transformations',
              'Promise Chaining',
              'Recursive Tree Traversal',
              'Object Destructuring Patterns',
              'Closure Scoping Rules',
            ].map((drill) => (
              <div
                key={drill}
                className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-blue-500 cursor-pointer transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-gray-200">{drill}</p>
                  <p className="text-xs text-gray-400 mt-0.5">JavaScript &middot; Medium</p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            ))}
          </div>
        </ModalBody>
      </div>
    ),
  },
};

// XL size
export const XLSize: Story = {
  args: {
    size: 'xl',
    title: 'Code Review',
    children: (
      <div>
        <ModalBody>
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
              <div className="text-gray-400 mb-2">{'// fibonacci.js'}</div>
              <div className="text-blue-400">function</div>
              <div className="text-yellow-300 ml-2">fibonacci(n) {'{'}</div>
              <div className="text-gray-300 ml-4">if (n {'<='} 1) return n;</div>
              <div className="text-gray-300 ml-4">return fibonacci(n - 1) + fibonacci(n - 2);</div>
              <div className="text-yellow-300 ml-2">{'}'}</div>
            </div>
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <p className="text-sm text-amber-200 font-medium">Performance Warning</p>
              <p className="text-xs text-amber-300/80 mt-1">
                This recursive implementation has exponential time complexity O(2^n). Consider
                memoization or an iterative approach for larger inputs.
              </p>
            </div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-200 font-medium">Suggestion</p>
              <p className="text-xs text-blue-300/80 mt-1">
                Use dynamic programming with a bottom-up approach to achieve O(n) time complexity
                and O(1) space complexity.
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Dismiss
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
          >
            Apply Suggestions
          </button>
        </ModalFooter>
      </div>
    ),
  },
};

// Full size
export const FullSize: Story = {
  args: {
    size: 'full',
    title: 'Quiz Results Summary',
    children: (
      <div>
        <ModalBody>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <p className="text-2xl font-bold text-emerald-400">8</p>
              <p className="text-xs text-emerald-300/70">Correct</p>
            </div>
            <div className="text-center p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-2xl font-bold text-red-400">2</p>
              <p className="text-xs text-red-300/70">Incorrect</p>
            </div>
            <div className="text-center p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-2xl font-bold text-blue-400">80%</p>
              <p className="text-xs text-blue-300/70">Score</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { question: 'What does Array.map() return?', correct: true },
              { question: 'Which method mutates the original array?', correct: true },
              { question: 'What is the time complexity of Array.find()?', correct: false },
              { question: 'How does Array.reduce() work?', correct: true },
              { question: 'What does Array.flat() do?', correct: true },
              { question: 'Which method returns a boolean?', correct: true },
              { question: 'What is Array.from() used for?', correct: false },
              { question: 'How does destructuring work with arrays?', correct: true },
              { question: 'What does the spread operator do?', correct: true },
              { question: 'Which method chains are most efficient?', correct: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-gray-700/30">
                <span className={`text-sm ${item.correct ? 'text-emerald-400' : 'text-red-400'}`}>
                  {item.correct ? '✓' : '✗'}
                </span>
                <span className="text-sm text-gray-300">{item.question}</span>
              </div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Review Answers
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </ModalFooter>
      </div>
    ),
  },
};

// With long content that scrolls
export const WithLongContent: Story = {
  args: {
    size: 'md',
    title: 'Terms of Service',
    children: (
      <ModalBody>
        <div className="space-y-4 text-sm">
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i}>
              <h4 className="font-semibold text-gray-200 mb-1">
                Section {i + 1}:{' '}
                {
                  [
                    'General Terms',
                    'User Accounts',
                    'Privacy Policy',
                    'Data Collection',
                    'Intellectual Property',
                    'Content Guidelines',
                    'Prohibited Activities',
                    'Payment Terms',
                    'Refund Policy',
                    'Liability',
                    'Indemnification',
                    'Dispute Resolution',
                    'Governing Law',
                    'Modifications',
                    'Contact Information',
                  ][i]
                }
              </h4>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur.
              </p>
            </div>
          ))}
        </div>
      </ModalBody>
    ),
  },
};

// With scrollable content and a footer
export const WithScrollableContent: Story = {
  args: {
    size: 'lg',
    title: 'Select Your Languages',
    children: (
      <div>
        <ModalBody>
          <p className="text-sm text-gray-400 mb-4">
            Choose the programming languages you want to practice with.
          </p>
          <div className="space-y-2">
            {[
              'JavaScript',
              'TypeScript',
              'Python',
              'Rust',
              'Go',
              'Java',
              'C++',
              'Ruby',
              'Swift',
              'Kotlin',
              'PHP',
              'C#',
            ].map((lang) => (
              <label
                key={lang}
                className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-500 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-200">{lang}</span>
              </label>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Skip
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
          >
            Continue
          </button>
        </ModalFooter>
      </div>
    ),
  },
};

// Without close button
export const WithoutCloseButton: Story = {
  args: {
    size: 'sm',
    title: 'Confirm Submission',
    showCloseButton: false,
    closeOnOverlayClick: false,
    closeOnEscape: false,
    children: (
      <div>
        <ModalBody>
          <p>Are you sure you want to submit your answers? This action cannot be undone.</p>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Go Back
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
          >
            Submit
          </button>
        </ModalFooter>
      </div>
    ),
  },
};

// Without title
export const WithoutTitle: Story = {
  args: {
    size: 'sm',
    title: undefined,
    children: (
      <div>
        <ModalBody>
          <div className="text-center py-4">
            <svg
              className="w-12 h-12 text-emerald-400 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-lg font-semibold text-gray-200">Quiz Completed!</p>
            <p className="text-sm text-gray-400 mt-1">You scored 9 out of 10</p>
          </div>
        </ModalBody>
      </div>
    ),
  },
};

// All sizes side by side (rendered statically without portal for comparison)
export const ModalSizes: Story = {
  render: () => (
    <div className="space-y-8">
      {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
        <div key={size}>
          <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">
            Size: {size}
          </p>
          <div
            className={`w-full ${
              size === 'sm'
                ? 'max-w-sm'
                : size === 'md'
                  ? 'max-w-md'
                  : size === 'lg'
                    ? 'max-w-lg'
                    : size === 'xl'
                      ? 'max-w-xl'
                      : 'max-w-4xl'
            } bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700`}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {size.toUpperCase()} Modal
              </h2>
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-600 dark:text-gray-300">
                This demonstrates the {size} modal size. The max-width constrains the modal content
                area.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};
