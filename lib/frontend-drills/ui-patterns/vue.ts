import type { UIPattern } from './types';

export const vueUIPatterns: UIPattern[] = [
  // Forms & Input
  {
    id: 'vue-form-validation',
    title: 'Form Validation',
    description:
      "Build a reactive form with v-model bindings and computed validators. Handle validation state, error messages, and submit logic using Vue's reactivity system.",
    difficulty: 'beginner',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-model', 'computed', 'reactive', 'Composition API'],
    demoCode: {
      html: `<div id="app">
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label>Name</label>
      <input v-model="form.name" @blur="touched.name = true" placeholder="Your name" />
      <div v-if="touched.name && errors.name" class="error">{{ errors.name }}</div>
    </div>
    <div class="form-group">
      <label>Email</label>
      <input v-model="form.email" @blur="touched.email = true" placeholder="you@example.com" />
      <div v-if="touched.email && errors.email" class="error">{{ errors.email }}</div>
    </div>
    <button type="submit" :disabled="hasErrors">Submit</button>
    <div v-if="submitted" class="success">Welcome, {{ form.name }}!</div>
  </form>
</div>`,
      css: `.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  color: #94a3b8;
}

input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
}

input:focus {
  border-color: #3b82f6;
}

.error {
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
}

.success {
  color: #22c55e;
  text-align: center;
  padding: 12px;
  border-radius: 8px;
  background: rgba(34,197,94,0.1);
  margin-top: 16px;
}

button {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #3b82f6;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background: #2563eb;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`,
      js: `const { createApp, reactive, computed, ref } = Vue;

createApp({
  setup() {
    const form = reactive({ name: '', email: '' });
    const touched = reactive({ name: false, email: false });
    const submitted = ref(false);

    const errors = computed(() => ({
      name: !form.name.trim() ? 'Name is required' : '',
      email: !form.email.includes('@') ? 'Valid email required' : '',
    }));

    const hasErrors = computed(() => Object.values(errors.value).some(e => e));

    const handleSubmit = () => {
      touched.name = true;
      touched.email = true;
      if (!hasErrors.value) submitted.value = true;
    };

    return { form, touched, errors, hasErrors, submitted, handleSubmit };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-vee-validate',
    title: 'VeeValidate Form',
    description:
      'Create a form using VeeValidate with Yup schemas for validation. Implement field-level validation, error handling, and form submission with the Composition API.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['VeeValidate', 'Yup', 'Composition API', 'v-model'],
  },
  {
    id: 'vue-autocomplete',
    title: 'Autocomplete Input',
    description:
      'Build an autocomplete component with debounced search using watchDebounced from VueUse. Implement keyboard navigation, v-model binding, and async data fetching.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-model', 'watch', 'composables', 'VueUse'],
  },
  {
    id: 'vue-file-upload',
    title: 'File Upload',
    description:
      'Create a drag-and-drop file upload component with reactive progress tracking. Use refs and reactive state to manage upload status, previews, and validation.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['reactive', 'refs', 'custom directives', 'Composition API'],
  },
  {
    id: 'vue-date-picker',
    title: 'Date Picker',
    description:
      'Build a custom date picker component with v-model support. Implement calendar navigation, date selection, and range picking with reactive computed properties.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-model', 'computed', 'reactive', 'slots'],
  },
  {
    id: 'vue-dynamic-forms',
    title: 'Dynamic Form Generator',
    description:
      'Create a dynamic form system that renders fields from JSON schema using component :is. Support different field types, validation rules, and nested form structures.',
    difficulty: 'advanced',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['dynamic components', 'v-model', 'provide/inject', 'recursion'],
  },
  {
    id: 'vue-input-masking',
    title: 'Input Masking',
    description:
      'Implement input masking with custom directives for phone numbers, credit cards, and dates. Create reusable v-mask directive with configurable patterns.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['custom directives', 'v-model', 'modifiers', 'Composition API'],
  },
  {
    id: 'vue-select-component',
    title: 'Custom Select',
    description:
      'Build a custom select component with named slots for options and selected value. Implement v-model, keyboard navigation, and search filtering.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-model', 'slots', 'Teleport', 'composables'],
  },
  {
    id: 'vue-inline-edit',
    title: 'Inline Editing',
    description:
      'Create inline editing functionality with smooth transitions between view and edit modes. Use v-model and transition components for seamless UX.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-model', 'transition', 'refs', 'Composition API'],
  },
  {
    id: 'vue-color-picker',
    title: 'Color Picker',
    description:
      'Build a color picker with reactive HSL state management. Implement gradient sliders, hex input, and v-model binding for color selection.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-model', 'reactive', 'computed', 'watch'],
  },

  // Interactive Elements
  {
    id: 'vue-modal',
    title: 'Modal Dialog',
    description:
      'Create a reusable modal component using Teleport to render at document root. Implement open/close transitions, focus management, and slot-based content.',
    difficulty: 'intermediate',
    category: 'interactive',
    framework: 'vue',
    concepts: ['Teleport', 'transition', 'slots', 'composables'],
  },
  {
    id: 'vue-drag-drop',
    title: 'Drag and Drop',
    description:
      'Implement drag-and-drop functionality using Vue Draggable or custom directives. Support list reordering, cross-list transfers, and reactive state updates.',
    difficulty: 'advanced',
    category: 'interactive',
    framework: 'vue',
    concepts: ['custom directives', 'reactive', 'transition-group', 'refs'],
  },
  {
    id: 'vue-data-table',
    title: 'Data Table',
    description:
      'Build a feature-rich data table with sortable columns, pagination, and filtering. Use computed properties for derived state and slots for custom cell rendering.',
    difficulty: 'advanced',
    category: 'interactive',
    framework: 'vue',
    concepts: ['computed', 'slots', 'v-model', 'Composition API'],
  },
  {
    id: 'vue-tabs',
    title: 'Tab Component',
    description:
      'Create a tab component with keep-alive for preserving inactive tab state. Use dynamic slots, provide/inject for tab registration, and Vue Router integration.',
    difficulty: 'intermediate',
    category: 'interactive',
    framework: 'vue',
    concepts: ['keep-alive', 'slots', 'provide/inject', 'Vue Router'],
  },
  {
    id: 'vue-accordion',
    title: 'Accordion',
    description:
      'Build an accordion component with transition-group animations. Support single and multiple expansion modes using reactive state and computed properties.',
    difficulty: 'intermediate',
    category: 'interactive',
    framework: 'vue',
    concepts: ['transition-group', 'reactive', 'slots', 'computed'],
  },
  {
    id: 'vue-stepper',
    title: 'Multi-Step Wizard',
    description:
      'Create a multi-step wizard with slot-based step content. Manage step navigation, validation, and progress tracking with Pinia or reactive state.',
    difficulty: 'intermediate',
    category: 'interactive',
    framework: 'vue',
    concepts: ['slots', 'Pinia', 'computed', 'transition'],
  },
  {
    id: 'vue-carousel',
    title: 'Carousel',
    description:
      'Build a touch-enabled carousel using the Composition API. Implement swipe gestures with VueUse, auto-play, and transition effects between slides.',
    difficulty: 'intermediate',
    category: 'interactive',
    framework: 'vue',
    concepts: ['Composition API', 'VueUse', 'transition', 'reactive'],
  },
  {
    id: 'vue-virtual-list',
    title: 'Virtual Scrolling',
    description:
      'Implement virtual scrolling for large lists to optimize performance. Calculate visible items, handle scroll events, and manage DOM recycling with reactive refs.',
    difficulty: 'advanced',
    category: 'interactive',
    framework: 'vue',
    concepts: ['refs', 'computed', 'watch', 'Composition API'],
  },
  {
    id: 'vue-context-menu',
    title: 'Context Menu',
    description:
      'Create a right-click context menu using Teleport for positioning. Handle menu positioning, keyboard navigation, and click-outside detection with composables.',
    difficulty: 'intermediate',
    category: 'interactive',
    framework: 'vue',
    concepts: ['Teleport', 'custom directives', 'composables', 'VueUse'],
  },
  {
    id: 'vue-toast',
    title: 'Toast Notifications',
    description:
      'Build a toast notification system using provide/inject pattern. Create a composable for triggering toasts and manage queue with Pinia and transition-group.',
    difficulty: 'intermediate',
    category: 'interactive',
    framework: 'vue',
    concepts: ['provide/inject', 'Pinia', 'transition-group', 'composables'],
  },

  // Data Display
  {
    id: 'vue-charts',
    title: 'Data Visualization',
    description:
      'Integrate Chart.js or ECharts with Vue for data visualization. Create reactive chart components that update when props change, using watch and lifecycle hooks.',
    difficulty: 'intermediate',
    category: 'data-display',
    framework: 'vue',
    concepts: ['watch', 'reactive', 'lifecycle hooks', 'refs'],
  },
  {
    id: 'vue-search-filter',
    title: 'Search and Filter',
    description:
      'Implement real-time search and filtering using computed properties. Create composable filter logic with debouncing and support for multiple filter criteria.',
    difficulty: 'intermediate',
    category: 'data-display',
    framework: 'vue',
    concepts: ['computed', 'watch', 'composables', 'VueUse'],
  },
  {
    id: 'vue-infinite-scroll',
    title: 'Infinite Scroll',
    description:
      'Build infinite scroll using Intersection Observer composable from VueUse. Manage loading states, pagination, and data fetching with reactive refs and async operations.',
    difficulty: 'intermediate',
    category: 'data-display',
    framework: 'vue',
    concepts: ['VueUse', 'composables', 'reactive', 'async/await'],
  },
  {
    id: 'vue-gallery',
    title: 'Image Gallery',
    description:
      'Create an image gallery with lightbox using transition components. Implement thumbnail grid, full-size viewer, and keyboard navigation with reactive state.',
    difficulty: 'intermediate',
    category: 'data-display',
    framework: 'vue',
    concepts: ['transition', 'Teleport', 'reactive', 'slots'],
  },
  {
    id: 'vue-card-grid',
    title: 'Responsive Card Grid',
    description:
      'Build a responsive card grid layout using CSS Grid and Vue components. Implement card slots for flexible content and reactive filtering/sorting.',
    difficulty: 'beginner',
    category: 'data-display',
    framework: 'vue',
    concepts: ['slots', 'computed', 'reactive', 'scoped slots'],
  },
  {
    id: 'vue-sortable-table',
    title: 'Sortable Table',
    description:
      'Create a table with sortable and filterable columns. Use computed properties for data transformation and slots for custom column rendering.',
    difficulty: 'intermediate',
    category: 'data-display',
    framework: 'vue',
    concepts: ['computed', 'slots', 'reactive', 'v-model'],
  },
  {
    id: 'vue-dashboard',
    title: 'Draggable Dashboard',
    description:
      'Build a dashboard with draggable and resizable panels using Pinia for state management. Persist layout to localStorage and support responsive breakpoints.',
    difficulty: 'advanced',
    category: 'data-display',
    framework: 'vue',
    concepts: ['Pinia', 'custom directives', 'reactive', 'localStorage'],
  },

  // Navigation
  {
    id: 'vue-sidebar',
    title: 'Collapsible Sidebar',
    description:
      'Create a collapsible sidebar with Vue Router integration. Use router-link active classes, transition effects, and Pinia for managing collapse state.',
    difficulty: 'intermediate',
    category: 'navigation',
    framework: 'vue',
    concepts: ['Vue Router', 'Pinia', 'transition', 'router-link'],
  },
  {
    id: 'vue-navbar',
    title: 'Responsive Navbar',
    description:
      'Build a responsive navbar with mobile drawer that transitions smoothly. Use Teleport for mobile menu, Vue Router for navigation, and reactive breakpoint detection.',
    difficulty: 'intermediate',
    category: 'navigation',
    framework: 'vue',
    concepts: ['Vue Router', 'Teleport', 'transition', 'VueUse'],
  },
  {
    id: 'vue-breadcrumbs',
    title: 'Auto Breadcrumbs',
    description:
      'Generate breadcrumbs automatically from Vue Router meta fields. Create a composable that watches route changes and builds breadcrumb trail dynamically.',
    difficulty: 'beginner',
    category: 'navigation',
    framework: 'vue',
    concepts: ['Vue Router', 'watch', 'computed', 'composables'],
  },
  {
    id: 'vue-bottom-nav',
    title: 'Bottom Navigation',
    description:
      'Create mobile bottom navigation with active route matching. Use Vue Router for navigation state and transition effects between views.',
    difficulty: 'beginner',
    category: 'navigation',
    framework: 'vue',
    concepts: ['Vue Router', 'computed', 'router-link', 'transition'],
  },
  {
    id: 'vue-mega-menu',
    title: 'Mega Menu',
    description:
      'Build a multi-level mega menu with hover and click toggle modes. Use Teleport for dropdowns, transition components, and reactive state for menu visibility.',
    difficulty: 'advanced',
    category: 'navigation',
    framework: 'vue',
    concepts: ['Teleport', 'transition', 'reactive', 'custom directives'],
  },
  {
    id: 'vue-pagination',
    title: 'Router Pagination',
    description:
      'Implement pagination that syncs with Vue Router query params. Create a composable for managing page state and updating URL without full page reload.',
    difficulty: 'intermediate',
    category: 'navigation',
    framework: 'vue',
    concepts: ['Vue Router', 'composables', 'watch', 'computed'],
  },

  // Advanced Features
  {
    id: 'vue-keyboard-shortcuts',
    title: 'Keyboard Shortcuts',
    description:
      'Create a global keyboard shortcuts system using a composable. Handle key combinations, context-specific shortcuts, and provide visual shortcut hints.',
    difficulty: 'advanced',
    category: 'advanced',
    framework: 'vue',
    concepts: ['composables', 'VueUse', 'provide/inject', 'lifecycle hooks'],
  },
  {
    id: 'vue-settings',
    title: 'Settings Panel',
    description:
      'Build a settings panel with Pinia store and localStorage persistence plugin. Support theme switching, user preferences, and reactive form bindings.',
    difficulty: 'intermediate',
    category: 'advanced',
    framework: 'vue',
    concepts: ['Pinia', 'plugins', 'localStorage', 'v-model'],
  },
  {
    id: 'vue-notifications',
    title: 'Notification Center',
    description:
      'Create a notification center using Pinia for state and transition-group for animations. Support different notification types, actions, and auto-dismiss timers.',
    difficulty: 'intermediate',
    category: 'advanced',
    framework: 'vue',
    concepts: ['Pinia', 'transition-group', 'composables', 'Teleport'],
  },
  {
    id: 'vue-favorites',
    title: 'Favorites System',
    description:
      'Implement a favorites system with Pinia and localStorage plugin. Support adding/removing favorites, persistence across sessions, and reactive UI updates.',
    difficulty: 'intermediate',
    category: 'advanced',
    framework: 'vue',
    concepts: ['Pinia', 'plugins', 'localStorage', 'reactive'],
  },
  {
    id: 'vue-undo-redo',
    title: 'Undo/Redo System',
    description:
      'Build an undo/redo system using Pinia with custom history plugin. Track state changes, support keyboard shortcuts, and handle complex state mutations.',
    difficulty: 'advanced',
    category: 'advanced',
    framework: 'vue',
    concepts: ['Pinia', 'plugins', 'composables', 'reactive'],
  },

  // UI Components
  {
    id: 'vue-loading-states',
    title: 'Loading Skeletons',
    description:
      'Create loading skeleton components using Suspense and transition. Build reusable skeleton shapes and implement smooth transitions between loading and loaded states.',
    difficulty: 'beginner',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['Suspense', 'transition', 'slots', 'async components'],
  },
  {
    id: 'vue-empty-states',
    title: 'Empty States',
    description:
      'Design empty state components with default slots for custom content. Support different empty state types (no data, no search results, errors) with transitions.',
    difficulty: 'beginner',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['slots', 'transition', 'computed', 'props'],
  },
  {
    id: 'vue-image-viewer',
    title: 'Image Zoom Viewer',
    description:
      'Build an image viewer with zoom and pan using custom directives. Implement touch gestures, keyboard controls, and smooth CSS transforms with reactive state.',
    difficulty: 'intermediate',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['custom directives', 'reactive', 'VueUse', 'Teleport'],
  },
  {
    id: 'vue-toggle',
    title: 'Toggle Switch',
    description:
      'Create an accessible toggle switch component with v-model support. Implement smooth transitions, keyboard accessibility, and customizable styling via props.',
    difficulty: 'beginner',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['v-model', 'transition', 'props', 'accessibility'],
  },
];
