import type { UIPattern } from './types';

export const angularUIPatterns: UIPattern[] = [
  // Forms & Input
  {
    id: 'ng-reactive-forms',
    title: 'Reactive Forms with Validation',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Build type-safe reactive forms using FormBuilder, FormGroup, and FormControl with built-in and custom validators. Learn proper form state management and validation feedback.',
    concepts: ['Reactive Forms', 'FormBuilder', 'validators', 'form state'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <form id="ng-form">
    <div class="form-group">
      <label>Name</label>
      <input id="name" placeholder="Your name" />
      <div class="error" id="name-error"></div>
    </div>
    <div class="form-group">
      <label>Email</label>
      <input id="email" placeholder="you@example.com" />
      <div class="error" id="email-error"></div>
    </div>
    <button type="submit">Submit</button>
    <div id="result" class="success" style="display:none"></div>
  </form>
  <p class="note">Angular patterns use reactive forms. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.form-group { margin-bottom: 16px; }
label { display: block; margin-bottom: 4px; font-size: 14px; color: #94a3b8; }
input { width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155; background: #1e293b; color: #e2e8f0; outline: none; }
input:focus { border-color: #ef4444; }
.error { color: #ef4444; font-size: 12px; margin-top: 4px; min-height: 18px; }
.success { color: #22c55e; text-align: center; padding: 12px; border-radius: 8px; background: rgba(34,197,94,0.1); margin-top: 16px; }
button { width: 100%; padding: 12px; border-radius: 8px; border: none; background: #ef4444; color: white; font-weight: 600; cursor: pointer; }
button:hover { background: #dc2626; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular Reactive Forms behavior
const form = document.getElementById('ng-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

function validate(input, errorId, rules) {
  const el = document.getElementById(errorId);
  const val = input.value;
  for (const rule of rules) {
    if (!rule.test(val)) { el.textContent = rule.msg; return false; }
  }
  el.textContent = '';
  return true;
}

const nameRules = [{ test: v => v.trim().length > 0, msg: 'Name is required' }];
const emailRules = [
  { test: v => v.length > 0, msg: 'Email is required' },
  { test: v => v.includes('@'), msg: 'Must be a valid email' }
];

nameInput.addEventListener('input', () => validate(nameInput, 'name-error', nameRules));
emailInput.addEventListener('input', () => validate(emailInput, 'email-error', emailRules));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const v1 = validate(nameInput, 'name-error', nameRules);
  const v2 = validate(emailInput, 'email-error', emailRules);
  if (v1 && v2) {
    const result = document.getElementById('result');
    result.style.display = 'block';
    result.textContent = 'Welcome, ' + nameInput.value + '!';
  }
});`,
    },
  },
  {
    id: 'ng-template-forms',
    title: 'Template-Driven Forms',
    category: 'forms-input',
    difficulty: 'beginner',
    description:
      'Create forms using template-driven approach with ngModel two-way binding, template reference variables, and built-in validation directives.',
    concepts: ['ngModel', 'template forms', 'two-way binding', 'directives'],
    framework: 'angular',
  },
  {
    id: 'ng-custom-validators',
    title: 'Custom Validators',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Implement custom synchronous and asynchronous validators as functions or directives. Handle cross-field validation and server-side validation with proper error handling.',
    concepts: ['custom validators', 'async validators', 'ValidatorFn', 'RxJS'],
    framework: 'angular',
  },
  {
    id: 'ng-autocomplete',
    title: 'Autocomplete with RxJS',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Build an autocomplete input with debounced API calls using RxJS operators (debounceTime, switchMap, distinctUntilChanged). Handle loading states and error scenarios.',
    concepts: ['RxJS', 'debounceTime', 'switchMap', 'observables'],
    framework: 'angular',
  },
  {
    id: 'ng-file-upload',
    title: 'File Upload with Progress',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Implement file upload with progress tracking using HttpClient and reportProgress option. Display upload status, handle errors, and support multiple file selection.',
    concepts: ['HttpClient', 'file upload', 'progress events', 'observables'],
    framework: 'angular',
  },
  {
    id: 'ng-date-picker',
    title: 'Date Picker Integration',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Integrate Angular Material datepicker or build custom date picker using Angular CDK. Handle date formatting, timezone considerations, and range selection.',
    concepts: ['Angular CDK', 'Material datepicker', 'date formatting', 'forms'],
    framework: 'angular',
  },
  {
    id: 'ng-dynamic-forms',
    title: 'Dynamic Form Generation',
    category: 'forms-input',
    difficulty: 'advanced',
    description:
      'Generate forms dynamically from JSON schema or configuration objects. Build reusable form components that adapt to different field types and validation rules.',
    concepts: ['dynamic forms', 'FormArray', 'component factory', 'metadata'],
    framework: 'angular',
  },
  {
    id: 'ng-input-mask',
    title: 'Input Masking & Formatting',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Create attribute directives to mask and format inputs (phone numbers, credit cards, currency). Use HostListener for input events and handle cursor position.',
    concepts: ['directives', 'HostListener', 'input masking', 'attribute directives'],
    framework: 'angular',
  },
  {
    id: 'ng-select-dropdown',
    title: 'Custom Select Dropdown',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Build a custom select component with ng-content projection and ControlValueAccessor interface. Support keyboard navigation, search filtering, and multi-select.',
    concepts: ['ControlValueAccessor', 'ng-content', 'custom form controls', 'accessibility'],
    framework: 'angular',
  },
  {
    id: 'ng-inline-edit',
    title: 'Inline Editing',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Create inline editable fields that switch between view and edit modes. Implement ControlValueAccessor for seamless integration with reactive forms.',
    concepts: ['ControlValueAccessor', 'view/edit toggle', 'reactive forms', 'directives'],
    framework: 'angular',
  },

  // Interactive Elements
  {
    id: 'ng-modal-dialog',
    title: 'Modal Dialogs with CDK Overlay',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Create modal dialogs using Angular CDK Overlay service. Handle backdrop clicks, keyboard events (ESC), and pass data between parent and dialog components.',
    concepts: ['Angular CDK', 'Overlay', 'component injection', 'portal'],
    framework: 'angular',
  },
  {
    id: 'ng-drag-drop',
    title: 'Drag and Drop',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Implement drag-and-drop functionality using Angular CDK DragDrop module. Support item reordering, transferring between lists, and custom drag previews.',
    concepts: ['Angular CDK', 'DragDrop', 'CdkDrag', 'CdkDrop'],
    framework: 'angular',
  },
  {
    id: 'ng-data-table',
    title: 'Data Table with Sorting & Pagination',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Build data tables using Angular Material table with MatSort and MatPaginator. Handle large datasets efficiently with server-side pagination and sorting.',
    concepts: ['MatTable', 'MatSort', 'MatPaginator', 'data sources'],
    framework: 'angular',
  },
  {
    id: 'ng-tabs',
    title: 'Tab Navigation with Lazy Loading',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Create tab interfaces with lazy-loaded tab content. Use Angular router for URL-based tab state or manage tab state within the component.',
    concepts: ['tabs', 'lazy loading', 'ngComponentOutlet', 'router'],
    framework: 'angular',
  },
  {
    id: 'ng-accordion',
    title: 'Accordion Panels',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Build accordion components with smooth animations using Angular animations API. Support single or multi-panel expansion and keyboard navigation.',
    concepts: ['animations', 'trigger', 'state', 'transition'],
    framework: 'angular',
  },
  {
    id: 'ng-stepper',
    title: 'Multi-Step Wizard',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Create multi-step forms with MatStepper. Implement per-step validation, navigation guards, and save/resume functionality with local storage.',
    concepts: ['MatStepper', 'form validation', 'guards', 'state persistence'],
    framework: 'angular',
  },
  {
    id: 'ng-carousel',
    title: 'Content Carousel',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Build a touch-enabled carousel with auto-play, indicators, and navigation controls. Use Angular animations and handle swipe gestures for mobile support.',
    concepts: ['animations', 'touch events', 'carousel', 'interval'],
    framework: 'angular',
  },
  {
    id: 'ng-virtual-scroll',
    title: 'Virtual Scrolling',
    category: 'interactive',
    difficulty: 'advanced',
    description:
      'Implement virtual scrolling for large lists using CDK ScrollingModule. Optimize rendering performance by only displaying visible items in viewport.',
    concepts: ['Angular CDK', 'ScrollingModule', 'CdkVirtualScrollViewport', 'performance'],
    framework: 'angular',
  },
  {
    id: 'ng-context-menu',
    title: 'Context Menu',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Create right-click context menus using CDK Overlay and OverlayPositionBuilder. Handle click-outside to close and position menus relative to trigger element.',
    concepts: ['Angular CDK', 'Overlay', 'contextmenu event', 'positioning'],
    framework: 'angular',
  },
  {
    id: 'ng-toast-notifications',
    title: 'Toast Notifications',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Build a toast notification service with queue management, auto-dismiss, and animations. Use dependency injection to trigger toasts from any component.',
    concepts: ['services', 'dependency injection', 'animations', 'portal'],
    framework: 'angular',
  },

  // Data Display
  {
    id: 'ng-data-visualization',
    title: 'Data Visualization & Charts',
    category: 'data-display',
    difficulty: 'intermediate',
    description:
      'Integrate charting libraries like ng2-charts or ngx-charts. Display bar, line, pie, and area charts with real-time data updates using RxJS observables.',
    concepts: ['ng2-charts', 'ngx-charts', 'data binding', 'observables'],
    framework: 'angular',
  },
  {
    id: 'ng-search-filter',
    title: 'Real-Time Search with Pipes',
    category: 'data-display',
    difficulty: 'intermediate',
    description:
      'Implement client-side search filtering using custom pipes. Handle multiple criteria, debouncing for performance, and highlight matching results.',
    concepts: ['pipes', 'filtering', 'custom pipes', 'PipeTransform'],
    framework: 'angular',
  },
  {
    id: 'ng-infinite-scroll',
    title: 'Infinite Scroll',
    category: 'data-display',
    difficulty: 'intermediate',
    description:
      'Build infinite scroll using Intersection Observer API or scroll event listeners. Load data incrementally as user scrolls and handle loading states.',
    concepts: ['Intersection Observer', 'scroll events', 'observables', 'pagination'],
    framework: 'angular',
  },
  {
    id: 'ng-gallery',
    title: 'Image Gallery with Lightbox',
    category: 'data-display',
    difficulty: 'intermediate',
    description:
      'Create an image gallery with lightbox overlay for full-screen viewing. Support keyboard navigation, thumbnails, and lazy loading of images.',
    concepts: ['overlay', 'lazy loading', 'keyboard events', 'animations'],
    framework: 'angular',
  },
  {
    id: 'ng-cards-grid',
    title: 'Responsive Card Grid',
    category: 'data-display',
    difficulty: 'beginner',
    description:
      'Build responsive card grid layouts using Angular Flex Layout or CSS Grid. Support different breakpoints and dynamic card content with ng-content.',
    concepts: ['Flex Layout', 'responsive design', 'ng-content', 'breakpoints'],
    framework: 'angular',
  },
  {
    id: 'ng-sort-filter-table',
    title: 'Advanced Table Filtering',
    category: 'data-display',
    difficulty: 'intermediate',
    description:
      'Implement multi-column filtering, sorting, and searching in data tables. Use custom filter predicates and combine MatTableDataSource with reactive forms.',
    concepts: ['MatTableDataSource', 'filter predicate', 'MatSort', 'reactive forms'],
    framework: 'angular',
  },
  {
    id: 'ng-dashboard',
    title: 'Dashboard with Draggable Widgets',
    category: 'data-display',
    difficulty: 'advanced',
    description:
      'Create a customizable dashboard with draggable and resizable widget panels. Save layout preferences and support widget-specific configurations.',
    concepts: ['Angular CDK', 'DragDrop', 'local storage', 'dynamic components'],
    framework: 'angular',
  },

  // Navigation
  {
    id: 'ng-sidebar',
    title: 'Collapsible Sidebar',
    category: 'navigation',
    difficulty: 'intermediate',
    description:
      'Build a responsive sidebar with collapsible menu items and route-based active state highlighting. Use Angular router and animations for smooth transitions.',
    concepts: ['router', 'routerLinkActive', 'animations', 'sidenav'],
    framework: 'angular',
  },
  {
    id: 'ng-navbar',
    title: 'Responsive Navbar',
    category: 'navigation',
    difficulty: 'intermediate',
    description:
      'Create a responsive navigation bar with hamburger menu for mobile. Dynamically generate menu items from route configuration and handle authentication states.',
    concepts: ['router', 'responsive design', 'ngFor', 'route guards'],
    framework: 'angular',
  },
  {
    id: 'ng-breadcrumbs',
    title: 'Auto-Generated Breadcrumbs',
    category: 'navigation',
    difficulty: 'beginner',
    description:
      'Generate breadcrumb navigation automatically from Angular router configuration. Use route data to customize breadcrumb labels and support dynamic segments.',
    concepts: ['router', 'ActivatedRoute', 'route data', 'navigation'],
    framework: 'angular',
  },
  {
    id: 'ng-bottom-nav',
    title: 'Mobile Bottom Navigation',
    category: 'navigation',
    difficulty: 'beginner',
    description:
      'Implement mobile-friendly bottom navigation with route-based active states. Handle route guards and integrate with Angular Material components.',
    concepts: ['router', 'mobile UI', 'routerLinkActive', 'route guards'],
    framework: 'angular',
  },
  {
    id: 'ng-mega-menu',
    title: 'Multi-Level Mega Menu',
    category: 'navigation',
    difficulty: 'advanced',
    description:
      'Build complex multi-level navigation menus with lazy-loaded content. Handle keyboard navigation, hover states, and accessibility (ARIA) attributes.',
    concepts: ['nested components', 'lazy loading', 'accessibility', 'overlay'],
    framework: 'angular',
  },
  {
    id: 'ng-pagination',
    title: 'Pagination with Router Integration',
    category: 'navigation',
    difficulty: 'intermediate',
    description:
      'Create pagination controls with customizable page sizes and URL-based state using query parameters. Integrate with data tables or lists.',
    concepts: ['pagination', 'query params', 'router', 'MatPaginator'],
    framework: 'angular',
  },

  // Advanced Features
  {
    id: 'ng-keyboard-shortcuts',
    title: 'Global Keyboard Shortcuts',
    category: 'advanced',
    difficulty: 'advanced',
    description:
      'Implement a global keyboard shortcut service using HostListener and RxJS. Support key combinations, context-aware shortcuts, and configurable bindings.',
    concepts: ['HostListener', 'services', 'RxJS', 'keyboard events'],
    framework: 'angular',
  },
  {
    id: 'ng-settings-panel',
    title: 'Settings Panel with Persistence',
    category: 'advanced',
    difficulty: 'intermediate',
    description:
      'Build a settings panel using reactive forms with localStorage or IndexedDB persistence. Support themes, user preferences, and real-time preview of changes.',
    concepts: ['reactive forms', 'localStorage', 'services', 'state management'],
    framework: 'angular',
  },
  {
    id: 'ng-notifications-center',
    title: 'Notification Center',
    category: 'advanced',
    difficulty: 'intermediate',
    description:
      'Create a notification center with RxJS Subject-based event system. Support read/unread states, notification filtering, and real-time updates via WebSockets.',
    concepts: ['RxJS', 'Subject', 'observables', 'WebSockets'],
    framework: 'angular',
  },
  {
    id: 'ng-favorites',
    title: 'Favorites Management',
    category: 'advanced',
    difficulty: 'intermediate',
    description:
      'Implement favorites/bookmarks functionality with NgRx or service-based state management. Support adding, removing, organizing, and persisting user favorites.',
    concepts: ['NgRx', 'state management', 'services', 'local storage'],
    framework: 'angular',
  },
  {
    id: 'ng-undo-redo',
    title: 'Undo/Redo System',
    category: 'advanced',
    difficulty: 'advanced',
    description:
      'Build an undo/redo system using command pattern and RxJS. Track state changes, implement command history, and support keyboard shortcuts.',
    concepts: ['command pattern', 'RxJS', 'state management', 'memento pattern'],
    framework: 'angular',
  },

  // UI Components
  {
    id: 'ng-loading-states',
    title: 'Loading Skeletons & Spinners',
    category: 'ui-components',
    difficulty: 'beginner',
    description:
      'Create loading indicators and skeleton screens using structural directives. Show loading states during async operations with smooth transitions.',
    concepts: ['structural directives', 'loading states', 'async pipe', 'animations'],
    framework: 'angular',
  },
  {
    id: 'ng-empty-states',
    title: 'Empty State Placeholders',
    category: 'ui-components',
    difficulty: 'beginner',
    description:
      'Design empty state components with ng-content projection for customizable messages and actions. Handle different empty scenarios (no data, no results, errors).',
    concepts: ['ng-content', 'content projection', 'component composition', 'templates'],
    framework: 'angular',
  },
  {
    id: 'ng-image-viewer',
    title: 'Image Zoom & Pan Viewer',
    category: 'ui-components',
    difficulty: 'intermediate',
    description:
      'Build an image viewer with zoom and pan capabilities using Angular CDK gestures or custom touch/mouse event handlers. Support pinch-to-zoom on mobile.',
    concepts: ['Angular CDK', 'touch events', 'mouse events', 'transforms'],
    framework: 'angular',
  },
  {
    id: 'ng-toggle-switch',
    title: 'Custom Toggle Switch',
    category: 'ui-components',
    difficulty: 'beginner',
    description:
      'Create a custom toggle switch component implementing ControlValueAccessor. Support disabled states, labels, and integration with reactive forms.',
    concepts: ['ControlValueAccessor', 'custom form controls', 'accessibility', 'ARIA'],
    framework: 'angular',
  },
];
