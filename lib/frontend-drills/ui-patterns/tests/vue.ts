/**
 * Test cases for Vue UI pattern exercises.
 * Each test is a JavaScript expression that evaluates to boolean inside the sandbox iframe.
 */
import type { PatternTestCase } from './index';

export const vueTests: Record<string, PatternTestCase[]> = {
  // ─── Forms & Input ────────────────────────────────────────────────

  'vue-form-validation': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Form element renders', test: "!!document.querySelector('form')" },
    { name: 'Name and email inputs exist', test: "document.querySelectorAll('input').length >= 2" },
    { name: 'Submit button exists', test: '!!document.querySelector(\'button[type="submit"]\')' },
    {
      name: 'Submit button has disabled attribute',
      test: "document.querySelector('button[type=\"submit\"]').hasAttribute('disabled')",
    },
  ],

  'vue-vee-validate': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    {
      name: 'Form with three inputs renders',
      test: "document.querySelectorAll('input').length >= 3",
    },
    {
      name: 'Username input has placeholder',
      test: '!!document.querySelector(\'input[placeholder*="username" i]\')',
    },
    {
      name: 'Password input is type password',
      test: '!!document.querySelector(\'input[type="password"]\')',
    },
    {
      name: 'Register button exists and is disabled initially',
      test: "!!document.querySelector('button[type=\"submit\"]') && document.querySelector('button[type=\"submit\"]').hasAttribute('disabled')",
    },
  ],

  'vue-autocomplete': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    {
      name: 'Search input renders',
      test: '!!document.querySelector(\'input[placeholder*="Search" i]\') || !!document.querySelector(\'input[placeholder*="fruit" i]\')',
    },
    { name: 'Autocomplete wrapper exists', test: "!!document.querySelector('.autocomplete')" },
    {
      name: 'No dropdown visible initially',
      test: "!document.querySelector('.dropdown') || document.querySelector('.dropdown') === null || document.querySelectorAll('.dropdown li').length === 0",
    },
  ],

  'vue-file-upload': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Upload zone renders', test: "!!document.querySelector('.upload-zone')" },
    { name: 'File input exists', test: '!!document.querySelector(\'input[type="file"]\')' },
    {
      name: 'Placeholder text visible',
      test: "!!document.querySelector('.placeholder') || document.querySelector('.upload-zone').textContent.includes('Drag')",
    },
  ],

  'vue-date-picker': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Picker container renders', test: "!!document.querySelector('.picker')" },
    {
      name: 'Month/year header displays',
      test: "!!document.querySelector('.header') && document.querySelector('.header').textContent.trim().length > 0",
    },
    {
      name: 'Weekday labels render',
      test: "document.querySelectorAll('.weekdays span').length === 7",
    },
    {
      name: 'Calendar grid has day cells',
      test: "document.querySelectorAll('.grid span').length >= 28",
    },
  ],

  'vue-dynamic-forms': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    {
      name: 'Form fields render from schema',
      test: "document.querySelectorAll('.field').length >= 4",
    },
    { name: 'Select element exists for role', test: "!!document.querySelector('select')" },
    { name: 'Textarea exists for bio', test: "!!document.querySelector('textarea')" },
    {
      name: 'Submit button exists',
      test: "!!document.querySelector('button') && document.querySelector('button').textContent.includes('Submit')",
    },
  ],

  'vue-input-masking': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    {
      name: 'Three masked inputs render',
      test: "document.querySelectorAll('.field input').length >= 3",
    },
    {
      name: 'Phone input has placeholder',
      test: '!!document.querySelector(\'input[placeholder*="555"]\')',
    },
    {
      name: 'Card input has placeholder',
      test: '!!document.querySelector(\'input[placeholder*="1234"]\')',
    },
    { name: 'Values section renders', test: "!!document.querySelector('.values')" },
  ],

  'vue-select-component': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Custom select trigger renders', test: "!!document.querySelector('.select')" },
    {
      name: 'Placeholder text visible',
      test: "document.querySelector('.select').textContent.includes('Select')",
    },
    { name: 'Label exists', test: "!!document.querySelector('.label')" },
  ],

  'vue-inline-edit': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'List items render', test: "document.querySelectorAll('.item').length >= 3" },
    { name: 'Edit buttons exist', test: "document.querySelectorAll('.edit-btn').length >= 3" },
    { name: 'Add input exists', test: "!!document.querySelector('.add-row input')" },
    {
      name: 'Item text displays correctly',
      test: "!!document.querySelector('.text') && document.querySelector('.text').textContent.includes('Learn Vue')",
    },
  ],

  'vue-color-picker': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Color preview renders', test: "!!document.querySelector('.preview')" },
    {
      name: 'Three range sliders exist',
      test: 'document.querySelectorAll(\'input[type="range"]\').length >= 3',
    },
    { name: 'Hex input exists', test: "!!document.querySelector('.hex-input')" },
    { name: 'Preset swatches render', test: "document.querySelectorAll('.swatch').length >= 8" },
  ],

  // ─── Interactive Elements ─────────────────────────────────────────

  'vue-modal': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Open button renders', test: "!!document.querySelector('.open-btn')" },
    { name: 'Modal is hidden initially', test: "!document.querySelector('.overlay')" },
    {
      name: 'Open button has correct text',
      test: "document.querySelector('.open-btn').textContent.includes('Open')",
    },
  ],

  'vue-drag-drop': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Draggable items render', test: "document.querySelectorAll('.drag-item').length >= 5" },
    {
      name: 'Items are draggable',
      test: "document.querySelector('.drag-item').getAttribute('draggable') === 'true'",
    },
    { name: 'Drag handles exist', test: "document.querySelectorAll('.handle').length >= 5" },
    {
      name: 'Order display renders',
      test: "!!document.querySelector('.order') && document.querySelector('.order').textContent.includes('Vue.js')",
    },
  ],

  'vue-data-table': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Table element renders', test: "!!document.querySelector('table')" },
    { name: 'Column headers render', test: "document.querySelectorAll('th').length >= 3" },
    { name: 'Table rows render', test: "document.querySelectorAll('tbody tr').length >= 1" },
    {
      name: 'Search input exists',
      test: "!!document.querySelector('.search') || !!document.querySelector('input[placeholder*=\"Filter\" i]')",
    },
  ],

  'vue-tabs': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Tab buttons render', test: "document.querySelectorAll('.tabs button').length >= 3" },
    { name: 'First tab is active', test: "!!document.querySelector('.tabs button.active')" },
    { name: 'Tab content area renders', test: "!!document.querySelector('.tab-content')" },
    {
      name: 'Tab input exists for state preservation',
      test: "!!document.querySelector('.tab-input')",
    },
  ],

  'vue-accordion': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Accordion items render', test: "document.querySelectorAll('.acc-item').length >= 3" },
    { name: 'First item is open by default', test: "!!document.querySelector('.acc-header.open')" },
    {
      name: 'Accordion body visible for first item',
      test: "!!document.querySelector('.acc-body')",
    },
    {
      name: 'Allow-multiple toggle exists',
      test: '!!document.querySelector(\'.multi-toggle input[type="checkbox"]\')',
    },
  ],

  'vue-stepper': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    {
      name: 'Step indicators render',
      test: "document.querySelectorAll('.step-indicator').length >= 3",
    },
    { name: 'First step is active', test: "!!document.querySelector('.step-indicator.active')" },
    { name: 'Name input visible on first step', test: "!!document.querySelector('.field input')" },
    { name: 'Next button exists', test: "!!document.querySelector('.btn-next')" },
  ],

  'vue-carousel': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Carousel slide renders', test: "!!document.querySelector('.slide')" },
    {
      name: 'Navigation buttons exist',
      test: "!!document.querySelector('.prev') && !!document.querySelector('.next')",
    },
    { name: 'Dot indicators render', test: "document.querySelectorAll('.dots span').length >= 4" },
    {
      name: 'Autoplay checkbox exists',
      test: '!!document.querySelector(\'.auto-label input[type="checkbox"]\')',
    },
  ],

  'vue-virtual-list': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Virtual list container renders', test: "!!document.querySelector('.virtual-list')" },
    { name: 'Visible items render', test: "document.querySelectorAll('.list-item').length >= 1" },
    {
      name: 'Items are positioned absolutely',
      test: "!!document.querySelector('.list-item') && getComputedStyle(document.querySelector('.list-item')).position === 'absolute'",
    },
    {
      name: 'Info shows total count of 10000',
      test: "!!document.querySelector('.info') && document.querySelector('.info').textContent.includes('10000')",
    },
  ],

  'vue-context-menu': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Right-click area renders', test: "!!document.querySelector('.area')" },
    { name: 'Context menu hidden initially', test: "!document.querySelector('.context-menu')" },
    {
      name: 'Hint text visible',
      test: "!!document.querySelector('.hint') && document.querySelector('.hint').textContent.includes('Right-click')",
    },
  ],

  'vue-toast': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    {
      name: 'Toast trigger buttons render',
      test: "document.querySelectorAll('.btn-row button').length >= 3",
    },
    { name: 'Toast container exists', test: "!!document.querySelector('.toast-container')" },
    {
      name: 'No toasts visible initially',
      test: "document.querySelectorAll('.toast').length === 0",
    },
  ],

  // ─── Data Display ─────────────────────────────────────────────────

  'vue-charts': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Chart area renders', test: "!!document.querySelector('.chart-area')" },
    { name: 'Bar columns render', test: "document.querySelectorAll('.bar-col').length >= 5" },
    {
      name: 'Bars have height styles',
      test: "!!document.querySelector('.bar') && document.querySelector('.bar').style.height !== ''",
    },
    {
      name: 'Randomize button exists',
      test: "!!document.querySelector('button') && document.querySelector('.btn-row button').textContent.includes('Randomize')",
    },
  ],

  'vue-search-filter': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Search input renders', test: "!!document.querySelector('.search-bar input')" },
    { name: 'Category select renders', test: "!!document.querySelector('.search-bar select')" },
    { name: 'Item cards render', test: "document.querySelectorAll('.item-card').length >= 1" },
    {
      name: 'Results count displays',
      test: "!!document.querySelector('.results-info') && document.querySelector('.results-info').textContent.includes('results')",
    },
  ],

  'vue-infinite-scroll': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Feed container renders', test: "!!document.querySelector('.feed')" },
    {
      name: 'Feed items load initially',
      test: "document.querySelectorAll('.feed-item').length >= 1",
    },
    {
      name: 'Status shows item count',
      test: "!!document.querySelector('.status') && document.querySelector('.status').textContent.includes('items loaded')",
    },
  ],

  'vue-gallery': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Gallery grid renders', test: "!!document.querySelector('.gallery-grid')" },
    { name: 'Thumbnail items render', test: "document.querySelectorAll('.thumb').length >= 6" },
    { name: 'Lightbox is hidden initially', test: "!document.querySelector('.lightbox')" },
    {
      name: 'Thumbnails have colored backgrounds',
      test: "!!document.querySelector('.thumb-inner') && document.querySelector('.thumb-inner').style.background !== ''",
    },
  ],

  'vue-card-grid': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Card grid renders', test: "!!document.querySelector('.card-grid')" },
    { name: 'Cards render', test: "document.querySelectorAll('.card').length >= 6" },
    { name: 'Search input exists in toolbar', test: "!!document.querySelector('.toolbar input')" },
    { name: 'Sort select exists in toolbar', test: "!!document.querySelector('.toolbar select')" },
  ],

  'vue-sortable-table': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Table renders', test: "!!document.querySelector('table')" },
    { name: 'Four column headers render', test: "document.querySelectorAll('th').length >= 4" },
    {
      name: 'Table rows render with data',
      test: "document.querySelectorAll('tbody tr').length >= 1",
    },
    { name: 'Filter input exists', test: "!!document.querySelector('.filter-input')" },
  ],

  'vue-dashboard': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Dashboard grid renders', test: "!!document.querySelector('.dashboard')" },
    { name: 'Panels render', test: "document.querySelectorAll('.panel').length >= 4" },
    { name: 'Panel values display', test: "document.querySelectorAll('.panel-value').length >= 4" },
    {
      name: 'Add widget button exists',
      test: "!!document.querySelector('.add-btn') && document.querySelector('.add-btn').textContent.includes('Add')",
    },
  ],

  // ─── Navigation ───────────────────────────────────────────────────

  'vue-sidebar': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Sidebar renders', test: "!!document.querySelector('.sidebar')" },
    { name: 'Navigation items render', test: "document.querySelectorAll('.nav-item').length >= 5" },
    {
      name: 'Logo text displays',
      test: "!!document.querySelector('.logo') && document.querySelector('.logo').textContent.includes('MyApp')",
    },
    { name: 'Toggle collapse button exists', test: "!!document.querySelector('.toggle-btn')" },
  ],

  'vue-navbar': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Navbar renders', test: "!!document.querySelector('.navbar')" },
    {
      name: 'Brand text displays',
      test: "!!document.querySelector('.brand') && document.querySelector('.brand').textContent.includes('MyApp')",
    },
    {
      name: 'Navigation links render',
      test: "document.querySelectorAll('.nav-links a').length >= 4",
    },
    { name: 'Page content area renders', test: "!!document.querySelector('.page-content')" },
  ],

  'vue-breadcrumbs': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Breadcrumb bar renders', test: "!!document.querySelector('.breadcrumb-bar')" },
    {
      name: 'Home crumb displays',
      test: "!!document.querySelector('.crumb-current') && document.querySelector('.crumb-current').textContent.includes('Home')",
    },
    { name: 'File tree items render', test: "document.querySelectorAll('.tree-item').length >= 1" },
    { name: 'Folder icons present', test: "!!document.querySelector('.tree-icon')" },
  ],

  'vue-bottom-nav': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Phone frame renders', test: "!!document.querySelector('.phone-frame')" },
    { name: 'Bottom nav tabs render', test: "document.querySelectorAll('.nav-tab').length >= 5" },
    { name: 'Home tab is active by default', test: "!!document.querySelector('.nav-tab.active')" },
    {
      name: 'Content area shows current tab info',
      test: "!!document.querySelector('.phone-content h3')",
    },
  ],

  'vue-mega-menu': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Menu bar renders', test: "!!document.querySelector('.menu-bar')" },
    {
      name: 'Menu triggers render',
      test: "document.querySelectorAll('.menu-trigger').length >= 3",
    },
    {
      name: 'Menu labels display',
      test: "!!document.querySelector('.menu-label') && document.querySelector('.menu-label').textContent.includes('Products')",
    },
    { name: 'Dropdown hidden initially', test: "!document.querySelector('.mega-dropdown')" },
  ],

  'vue-pagination': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'List items render', test: "document.querySelectorAll('.list-item').length >= 1" },
    { name: 'Pagination buttons render', test: "document.querySelectorAll('.pg-btn').length >= 5" },
    { name: 'Active page button highlighted', test: "!!document.querySelector('.pg-btn.active')" },
    {
      name: 'Page info shows total',
      test: "!!document.querySelector('.pg-info') && document.querySelector('.pg-info').textContent.includes('47')",
    },
  ],

  // ─── Advanced Features ────────────────────────────────────────────

  'vue-keyboard-shortcuts': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Shortcut panel renders', test: "!!document.querySelector('.shortcut-panel')" },
    {
      name: 'Shortcut items render',
      test: "document.querySelectorAll('.shortcut-item').length >= 5",
    },
    {
      name: 'Kbd elements display key combos',
      test: "document.querySelectorAll('kbd').length >= 5",
    },
    { name: 'Simulate buttons render', test: "document.querySelectorAll('.sim-btn').length >= 5" },
  ],

  'vue-settings': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    {
      name: 'Settings form renders',
      test: "!!document.querySelector('#app') && document.querySelector('#app').textContent.includes('Theme')",
    },
    {
      name: 'Theme options exist',
      test: "!!document.querySelector('select') || document.querySelectorAll('input[type=\"radio\"]').length >= 1 || document.querySelectorAll('button').length >= 3",
    },
    {
      name: 'Font size control exists',
      test: "!!document.querySelector('input[type=\"range\"]') || document.querySelector('#app').textContent.includes('Font')",
    },
    {
      name: 'Toggle switches or checkboxes exist',
      test: "document.querySelectorAll('input[type=\"checkbox\"]').length >= 1 || document.querySelectorAll('.toggle').length >= 1",
    },
  ],

  'vue-notifications': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    {
      name: 'Add notification buttons render',
      test: "document.querySelectorAll('button').length >= 4",
    },
    {
      name: 'Notification panel exists',
      test: "!!document.querySelector('#app') && (document.querySelector('#app').textContent.includes('Notification') || document.querySelector('#app').textContent.includes('notification'))",
    },
    {
      name: 'Mark all read button exists',
      test: "!!document.querySelector('#app') && (document.querySelector('#app').textContent.includes('Mark') || document.querySelector('#app').textContent.includes('Read'))",
    },
  ],

  'vue-favorites': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    {
      name: 'Items list renders',
      test: "document.querySelector('#app').textContent.includes('Vue.js')",
    },
    {
      name: 'Favorite toggle elements exist',
      test: "document.querySelectorAll('button').length >= 1 || document.querySelectorAll('[class*=\"fav\"]').length >= 1 || document.querySelectorAll('[class*=\"heart\"]').length >= 1",
    },
    {
      name: 'Multiple items display',
      test: "document.querySelector('#app').textContent.includes('TypeScript') && document.querySelector('#app').textContent.includes('Vite')",
    },
  ],

  'vue-undo-redo': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    {
      name: 'Undo button exists',
      test: "!!document.querySelector('#app') && (document.querySelector('#app').textContent.includes('Undo') || document.querySelector('#app').innerHTML.includes('undo'))",
    },
    {
      name: 'Redo button exists',
      test: "!!document.querySelector('#app') && (document.querySelector('#app').textContent.includes('Redo') || document.querySelector('#app').innerHTML.includes('redo'))",
    },
    {
      name: 'Items display with text',
      test: "document.querySelector('#app').textContent.includes('Item A') && document.querySelector('#app').textContent.includes('Item B')",
    },
    { name: 'Action buttons render', test: "document.querySelectorAll('button').length >= 3" },
  ],

  'vue-loading-states': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    {
      name: 'Toggle loading button exists',
      test: "document.querySelectorAll('button').length >= 1",
    },
    {
      name: 'Content renders (skeleton or loaded)',
      test: "document.querySelector('#app').children.length >= 1",
    },
    {
      name: 'Contains user data or skeleton placeholders',
      test: "document.querySelector('#app').textContent.includes('Alice') || document.querySelector('#app').innerHTML.includes('skeleton') || document.querySelector('#app').innerHTML.includes('pulse') || document.querySelector('#app').innerHTML.includes('loading')",
    },
  ],

  'vue-empty-states': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    {
      name: 'State selector buttons render',
      test: "document.querySelectorAll('button').length >= 4",
    },
    {
      name: 'Empty state content visible',
      test: "document.querySelector('#app').textContent.includes('No') || document.querySelector('#app').textContent.includes('Empty') || document.querySelector('#app').textContent.includes('data')",
    },
    {
      name: 'Multiple state options available',
      test: "document.querySelector('#app').textContent.includes('No Data') || document.querySelector('#app').textContent.includes('Error') || document.querySelector('#app').textContent.includes('No Results')",
    },
  ],

  'vue-image-viewer': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    { name: 'Zoom controls render', test: "document.querySelectorAll('button').length >= 3" },
    {
      name: 'Image grid or content renders',
      test: "document.querySelector('#app').innerHTML.includes('transform') || document.querySelector('#app').querySelectorAll('[style]').length >= 1",
    },
    {
      name: 'Zoom in/out buttons exist',
      test: "document.querySelector('#app').textContent.includes('+') || document.querySelector('#app').textContent.includes('Zoom') || document.querySelector('#app').textContent.includes('In')",
    },
    {
      name: 'Reset button exists',
      test: "document.querySelector('#app').textContent.includes('Reset') || document.querySelector('#app').textContent.includes('Fit') || document.querySelectorAll('button').length >= 3",
    },
  ],

  'vue-toggle': [
    {
      name: 'App mounts to #app',
      test: "!!document.querySelector('#app') && document.querySelector('#app').innerHTML.trim() !== ''",
    },
    {
      name: 'Toggle items render',
      test: "document.querySelector('#app').textContent.includes('Dark Mode') && document.querySelector('#app').textContent.includes('Notifications')",
    },
    {
      name: 'Multiple toggle switches exist',
      test: 'document.querySelectorAll(\'[class*="toggle"]\').length >= 5 || document.querySelectorAll(\'[role="switch"]\').length >= 1 || document.querySelectorAll(\'input[type="checkbox"]\').length >= 1',
    },
    {
      name: 'Disabled toggle exists',
      test: "document.querySelector('#app').textContent.includes('Maintenance') && document.querySelector('#app').textContent.includes('unavailable')",
    },
    {
      name: 'Toggle descriptions display',
      test: "document.querySelector('#app').textContent.includes('dark color theme') || document.querySelector('#app').textContent.includes('push notifications')",
    },
  ],
};
