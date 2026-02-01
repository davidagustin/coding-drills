import type { UIPattern } from './types';

export const nativeJsUIPatterns: UIPattern[] = [
  // Forms & Input
  {
    id: 'js-form-validation',
    title: 'Form Validation',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build a form with client-side validation using the Constraint Validation API. Handle custom validation rules, display error messages, and prevent submission of invalid forms.',
    concepts: ['Constraint Validation API', 'DOM API', 'Event delegation', 'Form events'],
  },
  {
    id: 'js-autocomplete',
    title: 'Autocomplete Input',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create an autocomplete search input with debounced fetching, keyboard navigation, and accessibility features using vanilla JavaScript and the Fetch API.',
    concepts: ['Fetch API', 'Debouncing', 'ARIA', 'Keyboard navigation'],
  },
  {
    id: 'js-file-upload',
    title: 'Drag & Drop File Upload',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Implement a drag-and-drop file upload interface with progress tracking using FileReader API, drag events, and visual feedback for upload status.',
    concepts: ['FileReader API', 'Drag and Drop API', 'Progress events', 'File API'],
  },
  {
    id: 'js-date-picker',
    title: 'Custom Date Picker',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a custom date picker with calendar view, date range selection, and keyboard navigation using the Date API and DOM manipulation.',
    concepts: ['Date API', 'DOM manipulation', 'Event delegation', 'Keyboard navigation'],
  },
  {
    id: 'js-input-masking',
    title: 'Input Masking',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create masked input fields for phone numbers, credit cards, and dates using input event listeners and string manipulation.',
    concepts: ['Input events', 'Regular expressions', 'String manipulation', 'Cursor position'],
  },
  {
    id: 'js-range-slider',
    title: 'Custom Range Slider',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a custom range slider with dual handles, tooltips, and smooth dragging using pointer events and CSS transforms.',
    concepts: ['Pointer events', 'CSS transforms', 'Event listeners', 'DOM manipulation'],
  },
  {
    id: 'js-inline-edit',
    title: 'Inline Editing',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Implement inline editing functionality that switches between display and edit modes using contentEditable or dynamic input elements.',
    concepts: ['contentEditable', 'Focus management', 'Event delegation', 'DOM manipulation'],
  },
  {
    id: 'js-custom-select',
    title: 'Custom Select Dropdown',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create a fully accessible custom select dropdown with search filtering, keyboard navigation, and custom styling replacing the native select element.',
    concepts: ['ARIA', 'Keyboard navigation', 'Event delegation', 'Focus management'],
  },
  {
    id: 'js-password-strength',
    title: 'Password Strength Meter',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build a password strength indicator that evaluates password quality using regex validation and displays visual feedback in real-time.',
    concepts: ['Regular expressions', 'Input events', 'DOM manipulation', 'CSS transitions'],
  },
  {
    id: 'js-dynamic-form',
    title: 'Dynamic Form Builder',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Generate forms dynamically from JSON schema with validation, conditional fields, and nested field groups using template literals and DOM API.',
    concepts: ['JSON parsing', 'Template literals', 'DOM API', 'Constraint Validation API'],
  },

  // Interactive Elements
  {
    id: 'js-modal',
    title: 'Modal Dialog',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create an accessible modal dialog with focus trap, ESC key handling, and backdrop click-to-close using the dialog element or custom implementation.',
    concepts: ['Dialog element', 'Focus trap', 'ARIA', 'Keyboard events'],
  },
  {
    id: 'js-drag-drop',
    title: 'Drag and Drop',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Implement drag-and-drop functionality for reordering items using the HTML5 Drag and Drop API with visual feedback and touch support.',
    concepts: ['Drag and Drop API', 'DataTransfer', 'Touch events', 'CSS transitions'],
  },
  {
    id: 'js-sortable-table',
    title: 'Sortable Table',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a sortable data table with click-to-sort columns, sort direction indicators, and support for different data types using DOM manipulation.',
    concepts: ['DOM manipulation', 'Event delegation', 'Array sorting', 'ARIA'],
  },
  {
    id: 'js-tabs',
    title: 'Tab Panel',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create an accessible tab panel with ARIA roles, keyboard navigation (arrow keys), and smooth panel transitions using vanilla JavaScript.',
    concepts: ['ARIA roles', 'Keyboard navigation', 'Event delegation', 'CSS transitions'],
  },
  {
    id: 'js-accordion',
    title: 'Accordion',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build an accordion component with expand/collapse animation, single or multi-panel modes, and keyboard accessibility using details/summary or custom implementation.',
    concepts: ['Details element', 'CSS transitions', 'ARIA', 'Event delegation'],
  },
  {
    id: 'js-carousel',
    title: 'Image Carousel',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create an image carousel with touch swipe support, keyboard navigation, auto-play, and thumbnail navigation using CSS transforms and touch events.',
    concepts: ['Touch events', 'CSS transforms', 'Intersection Observer', 'Keyboard events'],
  },
  {
    id: 'js-context-menu',
    title: 'Context Menu',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Implement a custom right-click context menu with nested submenus, keyboard navigation, and proper positioning using contextmenu event and event delegation.',
    concepts: ['Context menu event', 'Event delegation', 'Positioning', 'Keyboard navigation'],
  },
  {
    id: 'js-infinite-scroll',
    title: 'Infinite Scroll',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build infinite scroll functionality that loads more content as users scroll using IntersectionObserver and Fetch API with loading states.',
    concepts: ['IntersectionObserver', 'Fetch API', 'DOM manipulation', 'Loading states'],
  },
  {
    id: 'js-toast-notifications',
    title: 'Toast Notifications',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create a toast notification system with auto-dismiss, action buttons, and stacking behavior using CSS transitions and DOM manipulation.',
    concepts: ['CSS transitions', 'DOM manipulation', 'Timers', 'Event delegation'],
  },
  {
    id: 'js-wizard',
    title: 'Multi-Step Wizard',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a multi-step form wizard with navigation, validation per step, progress indicator, and browser history integration using history.pushState.',
    concepts: ['History API', 'Form validation', 'State management', 'Progress tracking'],
  },

  // Data Display
  {
    id: 'js-search-filter',
    title: 'Search & Filter',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Implement real-time search and filtering of data with debounced input, highlight matching text, and category filters using event delegation.',
    concepts: ['Debouncing', 'Regular expressions', 'DOM manipulation', 'Event delegation'],
  },
  {
    id: 'js-gallery',
    title: 'Image Gallery with Lightbox',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create an image gallery with lightbox viewer, thumbnail grid, keyboard navigation, and zoom functionality using dialog element and CSS transforms.',
    concepts: ['Dialog element', 'CSS transforms', 'Keyboard navigation', 'Image loading'],
  },
  {
    id: 'js-cards-grid',
    title: 'Responsive Card Grid',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build a responsive card grid layout using CSS Grid and template literals to generate cards from data with hover effects and loading states.',
    concepts: ['CSS Grid', 'Template literals', 'DOM manipulation', 'Responsive design'],
  },
  {
    id: 'js-table-sort-filter',
    title: 'Advanced Data Table',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Build a feature-rich data table with sorting, filtering, pagination, column visibility, and export functionality using vanilla JavaScript.',
    concepts: ['DOM manipulation', 'Event delegation', 'Array methods', 'CSV export'],
  },
  {
    id: 'js-lazy-images',
    title: 'Lazy Image Loading',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Implement lazy loading for images using IntersectionObserver with placeholder images and fade-in effects on load.',
    concepts: [
      'IntersectionObserver',
      'Image loading',
      'CSS transitions',
      'Performance optimization',
    ],
  },
  {
    id: 'js-data-chart',
    title: 'Canvas Data Charts',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create interactive data visualizations using Canvas API with tooltips, animations, and responsive sizing for charts like bar, line, and pie.',
    concepts: ['Canvas API', 'Animation', 'Mouse events', 'Responsive canvas'],
  },
  {
    id: 'js-virtual-scroll',
    title: 'Virtual Scrolling',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Implement virtual scrolling for rendering large datasets efficiently by only rendering visible items using scroll events and DOM recycling.',
    concepts: ['Virtual scrolling', 'Performance optimization', 'Scroll events', 'DOM recycling'],
  },

  // Navigation
  {
    id: 'js-navbar',
    title: 'Responsive Navbar',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build a responsive navigation bar with hamburger menu, dropdown submenus, and active link highlighting using media queries and event listeners.',
    concepts: ['Responsive design', 'Event delegation', 'CSS transitions', 'Mobile menu'],
  },
  {
    id: 'js-sidebar',
    title: 'Off-Canvas Sidebar',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create an off-canvas sidebar that slides in/out with overlay backdrop, touch swipe support, and focus trap using CSS transforms.',
    concepts: ['CSS transforms', 'Touch events', 'Focus trap', 'Event delegation'],
  },
  {
    id: 'js-breadcrumbs',
    title: 'Dynamic Breadcrumbs',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Generate breadcrumb navigation dynamically from URL path or page hierarchy with proper ARIA markup and separators.',
    concepts: ['URL parsing', 'DOM manipulation', 'ARIA', 'Navigation'],
  },
  {
    id: 'js-bottom-nav',
    title: 'Bottom Navigation',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build a mobile-style bottom navigation bar that shows/hides based on scroll direction using scroll events and CSS transforms.',
    concepts: ['Scroll events', 'CSS transforms', 'Event throttling', 'Mobile patterns'],
  },
  {
    id: 'js-dropdown-menu',
    title: 'Accessible Dropdown Menu',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create fully accessible dropdown menus with keyboard navigation, ARIA roles, and hover/click interactions using event delegation.',
    concepts: ['ARIA roles', 'Keyboard navigation', 'Event delegation', 'Focus management'],
  },
  {
    id: 'js-pagination',
    title: 'Pagination Component',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Implement client-side pagination with page numbers, previous/next buttons, and URL state synchronization using history API.',
    concepts: ['History API', 'Event delegation', 'State management', 'URL parameters'],
  },

  // Advanced Features
  {
    id: 'js-keyboard-shortcuts',
    title: 'Keyboard Shortcuts',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Build a global keyboard shortcut system supporting key combinations, context awareness, and customizable bindings using keydown events.',
    concepts: ['Keyboard events', 'Event handling', 'Key combinations', 'Command pattern'],
  },
  {
    id: 'js-notifications',
    title: 'Browser Notifications',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Implement browser push notifications with permission handling, notification actions, and fallback to in-app notifications using Notification API.',
    concepts: ['Notification API', 'Permissions API', 'Event handling', 'Feature detection'],
  },
  {
    id: 'js-undo-redo',
    title: 'Undo/Redo System',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Build an undo/redo system using the command pattern with keyboard shortcuts (Ctrl+Z/Ctrl+Y) and state history management.',
    concepts: ['Command pattern', 'State management', 'Keyboard events', 'History stack'],
  },
  {
    id: 'js-clipboard',
    title: 'Clipboard Operations',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Implement copy/paste functionality with rich content support using the Clipboard API with fallback for older browsers.',
    concepts: ['Clipboard API', 'Permissions API', 'Event handling', 'Feature detection'],
  },
  {
    id: 'js-local-storage',
    title: 'State Persistence',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Implement state persistence with localStorage including cross-tab synchronization using storage events and automatic serialization.',
    concepts: ['localStorage', 'Storage events', 'Serialization', 'State management'],
  },

  // UI Components
  {
    id: 'js-loading-skeleton',
    title: 'Loading Skeleton Screens',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create skeleton loading screens with animated placeholder content using CSS animations and template literals.',
    concepts: ['CSS animations', 'Template literals', 'Loading states', 'DOM manipulation'],
  },
  {
    id: 'js-empty-states',
    title: 'Empty State Components',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Design and implement empty state screens with illustrations, helpful messages, and call-to-action buttons using template literals.',
    concepts: ['Template literals', 'DOM manipulation', 'UX patterns', 'SVG'],
  },
  {
    id: 'js-image-zoom',
    title: 'Image Zoom on Hover',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Implement image zoom/magnify functionality on hover using CSS transform and pointer position tracking for product image previews.',
    concepts: ['Pointer events', 'CSS transform', 'Mouse tracking', 'Image manipulation'],
  },
  {
    id: 'js-toggle-switch',
    title: 'Toggle Switch',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create accessible toggle switches with smooth animations, disabled states, and keyboard support using checkbox inputs and CSS.',
    concepts: ['Checkbox input', 'CSS transitions', 'ARIA', 'Keyboard events'],
  },
];
