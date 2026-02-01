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
    demoCode: {
      html: `<form id="signup-form" novalidate>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" placeholder="you@example.com" required />
    <span class="error" id="email-error"></span>
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" id="password" placeholder="Min 8 characters" required minlength="8" />
    <span class="error" id="password-error"></span>
  </div>
  <div class="form-group">
    <label for="confirm">Confirm Password</label>
    <input type="password" id="confirm" placeholder="Re-enter password" required />
    <span class="error" id="confirm-error"></span>
  </div>
  <button type="submit">Sign Up</button>
  <div id="success" class="success" style="display:none">Account created successfully!</div>
</form>`,
      css: `.form-group { margin-bottom: 16px; }
label { display: block; margin-bottom: 4px; font-size: 14px; color: #94a3b8; }
input { width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155; background: #1e293b; color: #e2e8f0; outline: none; transition: border-color 0.2s; }
input:focus { border-color: #3b82f6; }
input.invalid { border-color: #ef4444; }
input.valid { border-color: #22c55e; }
.error { color: #ef4444; font-size: 12px; margin-top: 4px; display: block; min-height: 18px; }
.success { color: #22c55e; text-align: center; padding: 12px; border-radius: 8px; background: rgba(34,197,94,0.1); margin-top: 16px; }
button { width: 100%; padding: 12px; border-radius: 8px; border: none; background: #3b82f6; color: white; font-weight: 600; cursor: pointer; transition: background 0.2s; }
button:hover { background: #2563eb; }`,
      js: `const form = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');

function validate(input, errorId, check) {
  const errorEl = document.getElementById(errorId);
  const msg = check(input.value);
  errorEl.textContent = msg || '';
  input.className = msg ? 'invalid' : input.value ? 'valid' : '';
  return !msg;
}

emailInput.addEventListener('input', () => validate(emailInput, 'email-error', v => {
  if (!v) return 'Email is required';
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v)) return 'Enter a valid email';
}));

passwordInput.addEventListener('input', () => validate(passwordInput, 'password-error', v => {
  if (!v) return 'Password is required';
  if (v.length < 8) return 'Must be at least 8 characters';
}));

confirmInput.addEventListener('input', () => validate(confirmInput, 'confirm-error', v => {
  if (!v) return 'Please confirm your password';
  if (v !== passwordInput.value) return 'Passwords do not match';
}));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const v1 = validate(emailInput, 'email-error', v => !v ? 'Email is required' : !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v) ? 'Enter a valid email' : '');
  const v2 = validate(passwordInput, 'password-error', v => !v ? 'Password is required' : v.length < 8 ? 'Must be at least 8 characters' : '');
  const v3 = validate(confirmInput, 'confirm-error', v => !v ? 'Please confirm' : v !== passwordInput.value ? 'Passwords do not match' : '');
  if (v1 && v2 && v3) document.getElementById('success').style.display = 'block';
});`,
    },
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
    demoCode: {
      html: `<div class="slider-container">
  <label>Price Range</label>
  <div class="slider-track" id="slider">
    <div class="slider-fill" id="fill"></div>
    <div class="slider-thumb" id="thumb-min" data-value="20"></div>
    <div class="slider-thumb" id="thumb-max" data-value="80"></div>
  </div>
  <div class="slider-values">
    <span id="val-min">$20</span>
    <span id="val-max">$80</span>
  </div>
</div>`,
      css: `.slider-container { padding: 20px 10px; }
label { display: block; margin-bottom: 16px; font-size: 14px; color: #94a3b8; }
.slider-track { position: relative; height: 6px; background: #334155; border-radius: 3px; margin: 20px 0; }
.slider-fill { position: absolute; height: 100%; background: #3b82f6; border-radius: 3px; }
.slider-thumb { position: absolute; top: 50%; width: 22px; height: 22px; background: #3b82f6; border: 2px solid #1e293b; border-radius: 50%; transform: translate(-50%, -50%); cursor: grab; transition: box-shadow 0.2s; z-index: 2; }
.slider-thumb:hover, .slider-thumb.active { box-shadow: 0 0 0 6px rgba(59,130,246,0.25); }
.slider-values { display: flex; justify-content: space-between; font-size: 18px; font-weight: 600; color: #e2e8f0; }`,
      js: `const slider = document.getElementById('slider');
const thumbMin = document.getElementById('thumb-min');
const thumbMax = document.getElementById('thumb-max');
const fill = document.getElementById('fill');
let minVal = 20, maxVal = 80;

function updateUI() {
  thumbMin.style.left = minVal + '%';
  thumbMax.style.left = maxVal + '%';
  fill.style.left = minVal + '%';
  fill.style.width = (maxVal - minVal) + '%';
  document.getElementById('val-min').textContent = '$' + minVal;
  document.getElementById('val-max').textContent = '$' + maxVal;
}
updateUI();

function startDrag(thumb, isMin) {
  thumb.classList.add('active');
  const onMove = (e) => {
    const rect = slider.getBoundingClientRect();
    let pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    pct = Math.max(0, Math.min(100, pct));
    if (isMin) { minVal = Math.min(pct, maxVal - 5); }
    else { maxVal = Math.max(pct, minVal + 5); }
    updateUI();
  };
  const onUp = () => { thumb.classList.remove('active'); document.removeEventListener('pointermove', onMove); document.removeEventListener('pointerup', onUp); };
  document.addEventListener('pointermove', onMove);
  document.addEventListener('pointerup', onUp);
}

thumbMin.addEventListener('pointerdown', () => startDrag(thumbMin, true));
thumbMax.addEventListener('pointerdown', () => startDrag(thumbMax, false));`,
    },
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
    demoCode: {
      html: `<button id="open-btn" class="open-btn">Open Modal</button>
<div id="backdrop" class="backdrop">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <h2 id="modal-title">Confirm Action</h2>
    <p>Are you sure you want to proceed? This action cannot be undone.</p>
    <div class="modal-actions">
      <button id="cancel-btn" class="btn-secondary">Cancel</button>
      <button id="confirm-btn" class="btn-primary">Confirm</button>
    </div>
  </div>
</div>
<div id="status" class="status"></div>`,
      css: `.open-btn { padding: 12px 24px; border-radius: 8px; border: none; background: #3b82f6; color: white; font-weight: 600; cursor: pointer; }
.open-btn:hover { background: #2563eb; }
.backdrop { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); justify-content: center; align-items: center; z-index: 50; }
.backdrop.open { display: flex; animation: fadeIn 0.2s; }
.modal { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 24px; max-width: 400px; width: 90%; animation: slideUp 0.3s; }
.modal h2 { margin-bottom: 8px; font-size: 20px; }
.modal p { color: #94a3b8; margin-bottom: 20px; font-size: 14px; }
.modal-actions { display: flex; gap: 12px; justify-content: flex-end; }
.btn-secondary { padding: 8px 16px; border-radius: 8px; border: 1px solid #475569; background: transparent; color: #94a3b8; cursor: pointer; }
.btn-primary { padding: 8px 16px; border-radius: 8px; border: none; background: #ef4444; color: white; cursor: pointer; font-weight: 600; }
.btn-primary:hover { background: #dc2626; }
.btn-secondary:hover { background: #334155; }
.status { margin-top: 16px; padding: 12px; border-radius: 8px; text-align: center; font-size: 14px; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`,
      js: `const backdrop = document.getElementById('backdrop');
const openBtn = document.getElementById('open-btn');
const cancelBtn = document.getElementById('cancel-btn');
const confirmBtn = document.getElementById('confirm-btn');
const status = document.getElementById('status');

function openModal() { backdrop.classList.add('open'); confirmBtn.focus(); }
function closeModal() { backdrop.classList.remove('open'); openBtn.focus(); }

openBtn.addEventListener('click', openModal);
cancelBtn.addEventListener('click', () => { closeModal(); status.textContent = 'Cancelled'; status.style.background = 'rgba(100,116,139,0.2)'; status.style.color = '#94a3b8'; });
confirmBtn.addEventListener('click', () => { closeModal(); status.textContent = 'Action confirmed!'; status.style.background = 'rgba(34,197,94,0.15)'; status.style.color = '#22c55e'; });
backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && backdrop.classList.contains('open')) closeModal(); });`,
    },
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
