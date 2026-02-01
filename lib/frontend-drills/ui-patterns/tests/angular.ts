/**
 * Test cases for Angular UI pattern exercises.
 * Each test is a JavaScript expression that evaluates to boolean inside the sandbox iframe.
 */
import type { PatternTestCase } from './index';

export const angularTests: Record<string, PatternTestCase[]> = {
  // ── Forms & Input ──────────────────────────────────────────────────
  'ng-reactive-forms': [
    { name: 'Form element exists', test: "!!document.getElementById('ng-form')" },
    { name: 'Name input renders', test: "!!document.getElementById('name')" },
    { name: 'Email input renders', test: "!!document.getElementById('email')" },
    { name: 'Submit button exists', test: '!!document.querySelector(\'button[type="submit"]\')' },
    {
      name: 'Error containers exist',
      test: "!!document.getElementById('name-error') && !!document.getElementById('email-error')",
    },
  ],

  'ng-template-forms': [
    { name: 'Form element exists', test: "!!document.getElementById('tpl-form')" },
    { name: 'Username input renders', test: "!!document.getElementById('username')" },
    {
      name: 'Color select renders',
      test: "!!document.getElementById('color') && document.getElementById('color').tagName === 'SELECT'",
    },
    {
      name: 'Agree checkbox exists',
      test: "!!document.getElementById('agree') && document.getElementById('agree').type === 'checkbox'",
    },
    {
      name: 'Submit button starts disabled',
      test: "!!document.getElementById('submit-btn') && document.getElementById('submit-btn').disabled === true",
    },
  ],

  'ng-custom-validators': [
    { name: 'Password input exists', test: "!!document.getElementById('password')" },
    { name: 'Confirm input exists', test: "!!document.getElementById('confirm')" },
    {
      name: 'Validation rules list renders',
      test: "!!document.getElementById('pw-rules') && document.querySelectorAll('#pw-rules li').length === 4",
    },
    {
      name: 'Rule elements exist',
      test: "!!document.getElementById('rule-len') && !!document.getElementById('rule-upper') && !!document.getElementById('rule-num') && !!document.getElementById('rule-special')",
    },
    { name: 'Result element exists', test: "!!document.getElementById('result')" },
  ],

  'ng-autocomplete': [
    { name: 'Search input exists', test: "!!document.getElementById('search')" },
    { name: 'Results list exists', test: "!!document.getElementById('results')" },
    { name: 'Spinner element exists', test: "!!document.getElementById('spinner')" },
    {
      name: 'Results list is empty initially',
      test: "document.getElementById('results').children.length === 0",
    },
  ],

  'ng-file-upload': [
    { name: 'Drop zone exists', test: "!!document.getElementById('drop-zone')" },
    {
      name: 'File input exists',
      test: "!!document.getElementById('file-input') && document.getElementById('file-input').type === 'file'",
    },
    {
      name: 'File input accepts multiple',
      test: "document.getElementById('file-input').hasAttribute('multiple')",
    },
    { name: 'File list container exists', test: "!!document.getElementById('file-list')" },
  ],

  'ng-date-picker': [
    { name: 'Date input exists', test: "!!document.getElementById('date-input')" },
    { name: 'Calendar button exists', test: "!!document.getElementById('cal-btn')" },
    { name: 'Calendar grid exists', test: "!!document.getElementById('cal-grid')" },
    {
      name: 'Month label exists',
      test: "!!document.getElementById('month-label') && document.getElementById('month-label').textContent.length > 0",
    },
    { name: 'Day cells rendered', test: "document.querySelectorAll('#cal-grid .day').length > 0" },
  ],

  'ng-dynamic-forms': [
    { name: 'Dynamic form exists', test: "!!document.getElementById('dynamic-form')" },
    {
      name: 'Schema buttons exist',
      test: "document.querySelectorAll('.schema-bar .add-btn').length === 4",
    },
    {
      name: 'Add-type buttons have data-type',
      test: '!!document.querySelector(\'.add-btn[data-type="text"]\') && !!document.querySelector(\'.add-btn[data-type="email"]\')',
    },
    {
      name: 'Submit button hidden initially',
      test: "!!document.getElementById('submit-btn') && document.getElementById('submit-btn').style.display === 'none'",
    },
    { name: 'Output element exists', test: "!!document.getElementById('output')" },
  ],

  'ng-input-mask': [
    { name: 'Phone input exists', test: "!!document.getElementById('phone')" },
    { name: 'Card input exists', test: "!!document.getElementById('card')" },
    { name: 'Currency input exists', test: "!!document.getElementById('currency')" },
    { name: 'Values display exists', test: "!!document.getElementById('values')" },
  ],

  'ng-select-dropdown': [
    { name: 'Select trigger exists', test: "!!document.getElementById('trigger')" },
    {
      name: 'Dropdown hidden initially',
      test: "!!document.getElementById('dropdown') && document.getElementById('dropdown').style.display === 'none'",
    },
    { name: 'Filter input exists', test: "!!document.getElementById('filter')" },
    { name: 'Options list exists', test: "!!document.getElementById('options')" },
    { name: 'Value display exists', test: "!!document.getElementById('value-display')" },
  ],

  'ng-inline-edit': [
    { name: 'Table body exists', test: "!!document.getElementById('table-body')" },
    {
      name: 'Table rows rendered',
      test: "document.querySelectorAll('#table-body tr').length >= 3",
    },
    { name: 'Table has columns', test: "document.querySelectorAll('#table-body td').length >= 9" },
    {
      name: 'Cells have data attributes',
      test: "!!document.querySelector('#table-body td[data-row]') && !!document.querySelector('#table-body td[data-col]')",
    },
  ],

  // ── Interactive Elements ───────────────────────────────────────────
  'ng-modal-dialog': [
    { name: 'Open button exists', test: "!!document.getElementById('open-btn')" },
    {
      name: 'Backdrop hidden initially',
      test: "!!document.getElementById('backdrop') && document.getElementById('backdrop').style.display === 'none'",
    },
    { name: 'Close button exists', test: "!!document.getElementById('close-x')" },
    {
      name: 'Confirm and cancel buttons exist',
      test: "!!document.getElementById('confirm-btn') && !!document.getElementById('cancel-btn')",
    },
    { name: 'Status element exists', test: "!!document.getElementById('status')" },
  ],

  'ng-drag-drop': [
    { name: 'Todo column exists', test: "!!document.getElementById('todo')" },
    { name: 'Progress column exists', test: "!!document.getElementById('progress')" },
    { name: 'Done column exists', test: "!!document.getElementById('done')" },
    { name: 'Cards rendered', test: "document.querySelectorAll('.card').length >= 5" },
    { name: 'Cards are draggable', test: '!!document.querySelector(\'.card[draggable="true"]\')' },
  ],

  'ng-data-table': [
    { name: 'Table body exists', test: "!!document.getElementById('tbody')" },
    {
      name: 'Sortable headers exist',
      test: "document.querySelectorAll('th.sortable').length === 3",
    },
    { name: 'Table rows rendered', test: "document.querySelectorAll('#tbody tr').length > 0" },
    {
      name: 'Pagination controls exist',
      test: "!!document.getElementById('prev-btn') && !!document.getElementById('next-btn')",
    },
    {
      name: 'Page info shown',
      test: "!!document.getElementById('page-info') && document.getElementById('page-info').textContent.includes('Page')",
    },
  ],

  'ng-tabs': [
    { name: 'Tab bar exists', test: "!!document.getElementById('tab-bar')" },
    {
      name: 'Three tabs rendered',
      test: "document.querySelectorAll('#tab-bar .tab').length === 3",
    },
    { name: 'One tab is active', test: "!!document.querySelector('#tab-bar .tab.active')" },
    { name: 'Panel container exists', test: "!!document.getElementById('panel')" },
    { name: 'Panel has content', test: "document.getElementById('panel').innerHTML.length > 0" },
  ],

  'ng-accordion': [
    { name: 'Accordion exists', test: "!!document.getElementById('accordion')" },
    {
      name: 'Three panels exist',
      test: "document.querySelectorAll('#accordion .panel').length === 3",
    },
    {
      name: 'Panel headers exist',
      test: "document.querySelectorAll('.panel-header').length === 3",
    },
    { name: 'Panel bodies exist', test: "document.querySelectorAll('.panel-body').length === 3" },
  ],

  'ng-stepper': [
    {
      name: 'Steps indicators exist',
      test: "document.querySelectorAll('#steps .step').length === 3",
    },
    { name: 'Step content area exists', test: "!!document.getElementById('step-content')" },
    { name: 'First step is active', test: "!!document.querySelector('#steps .step.active')" },
    { name: 'Next button exists', test: "!!document.getElementById('next-step')" },
    { name: 'Content has form inputs', test: "!!document.querySelector('#step-content input')" },
  ],

  'ng-carousel': [
    { name: 'Carousel track exists', test: "!!document.getElementById('track')" },
    { name: 'Slides rendered', test: "document.querySelectorAll('#track .slide').length >= 4" },
    {
      name: 'Indicators rendered',
      test: "document.querySelectorAll('#indicators .dot').length >= 4",
    },
    {
      name: 'Nav buttons exist',
      test: "!!document.getElementById('prev-btn') && !!document.getElementById('next-btn')",
    },
    { name: 'Play/pause button exists', test: "!!document.getElementById('play-btn')" },
  ],

  'ng-virtual-scroll': [
    { name: 'Viewport exists', test: "!!document.getElementById('viewport')" },
    { name: 'Scroll content exists', test: "!!document.getElementById('scroll-content')" },
    { name: 'Rows rendered', test: "document.querySelectorAll('.row').length > 0" },
    {
      name: 'Rendered count shown',
      test: "!!document.getElementById('rendered') && document.getElementById('rendered').textContent.includes('Rendered')",
    },
    {
      name: 'Not all rows rendered at once',
      test: "document.querySelectorAll('.row').length < 100",
    },
  ],

  'ng-context-menu': [
    { name: 'Items container exists', test: "!!document.getElementById('items')" },
    { name: 'Four items rendered', test: "document.querySelectorAll('#items .item').length === 4" },
    {
      name: 'Context menu hidden initially',
      test: "!!document.getElementById('context-menu') && document.getElementById('context-menu').style.display === 'none'",
    },
    {
      name: 'Menu items have actions',
      test: "document.querySelectorAll('#context-menu .menu-item[data-action]').length >= 4",
    },
    { name: 'Log element exists', test: "!!document.getElementById('log')" },
  ],

  'ng-toast-notifications': [
    { name: 'Toast container exists', test: "!!document.getElementById('toast-container')" },
    {
      name: 'Four type buttons exist',
      test: "document.querySelectorAll('.btn-row .btn[data-type]').length === 4",
    },
    {
      name: 'Success button exists',
      test: '!!document.querySelector(\'.btn[data-type="success"]\')',
    },
    { name: 'Error button exists', test: '!!document.querySelector(\'.btn[data-type="error"]\')' },
  ],

  // ── Data Display ───────────────────────────────────────────────────
  'ng-data-visualization': [
    {
      name: 'Canvas exists',
      test: "!!document.getElementById('chart') && document.getElementById('chart').tagName === 'CANVAS'",
    },
    {
      name: 'Chart type tabs exist',
      test: "document.querySelectorAll('.chart-tabs .ct').length === 3",
    },
    { name: 'Refresh button exists', test: "!!document.getElementById('refresh')" },
    {
      name: 'Bar tab is active by default',
      test: "!!document.querySelector('.ct.active') && document.querySelector('.ct.active').dataset.chart === 'bar'",
    },
  ],

  'ng-search-filter': [
    { name: 'Search input exists', test: "!!document.getElementById('search')" },
    { name: 'List container exists', test: "!!document.getElementById('list')" },
    { name: 'Category tags exist', test: "document.querySelectorAll('.tags .tag').length >= 4" },
    { name: 'Items rendered', test: "document.querySelectorAll('#list li').length > 0" },
    {
      name: 'Count display exists',
      test: "!!document.getElementById('count') && document.getElementById('count').textContent.includes('of')",
    },
  ],

  'ng-infinite-scroll': [
    { name: 'Scroll area exists', test: "!!document.getElementById('scroll-area')" },
    { name: 'Items container exists', test: "!!document.getElementById('items')" },
    { name: 'Initial items loaded', test: "document.querySelectorAll('.item-card').length > 0" },
    {
      name: 'Status shows loaded count',
      test: "!!document.getElementById('status') && document.getElementById('status').textContent.includes('Loaded')",
    },
    { name: 'Sentinel element exists', test: "!!document.getElementById('sentinel')" },
  ],

  'ng-gallery': [
    { name: 'Gallery grid exists', test: "!!document.getElementById('gallery')" },
    {
      name: 'Thumbnails rendered',
      test: "document.querySelectorAll('#gallery .thumb').length >= 9",
    },
    {
      name: 'Lightbox hidden initially',
      test: "!!document.getElementById('lightbox') && document.getElementById('lightbox').style.display === 'none'",
    },
    { name: 'Lightbox close button exists', test: "!!document.getElementById('lb-close')" },
    {
      name: 'Lightbox nav buttons exist',
      test: "!!document.getElementById('lb-prev') && !!document.getElementById('lb-next')",
    },
  ],

  'ng-cards-grid': [
    { name: 'Grid container exists', test: "!!document.getElementById('grid')" },
    { name: 'Cards rendered', test: "document.querySelectorAll('#grid .card').length >= 6" },
    {
      name: 'Column toggle buttons exist',
      test: "document.querySelectorAll('.toolbar .cols-btn').length === 3",
    },
    {
      name: 'Cards have titles',
      test: "document.querySelectorAll('.card .card-title').length >= 6",
    },
  ],

  'ng-sort-filter-table': [
    { name: 'Search input exists', test: "!!document.getElementById('search')" },
    {
      name: 'Department filter exists',
      test: "!!document.getElementById('filter-dept') && document.getElementById('filter-dept').tagName === 'SELECT'",
    },
    {
      name: 'Level filter exists',
      test: "!!document.getElementById('filter-level') && document.getElementById('filter-level').tagName === 'SELECT'",
    },
    { name: 'Table rows rendered', test: "document.querySelectorAll('#tbody tr').length > 0" },
    {
      name: 'Result count shown',
      test: "!!document.getElementById('result-count') && document.getElementById('result-count').textContent.includes('of')",
    },
  ],

  'ng-dashboard': [
    { name: 'Dashboard container exists', test: "!!document.getElementById('dashboard')" },
    { name: 'Widgets rendered', test: "document.querySelectorAll('.widget').length >= 1" },
    { name: 'Add widget button exists', test: "!!document.getElementById('add-widget')" },
    { name: 'Reset button exists', test: "!!document.getElementById('reset-btn')" },
    {
      name: 'Widgets have headers',
      test: "document.querySelectorAll('.widget-header').length >= 1",
    },
  ],

  // ── Navigation ─────────────────────────────────────────────────────
  'ng-sidebar': [
    { name: 'Sidebar exists', test: "!!document.getElementById('sidebar')" },
    { name: 'Toggle button exists', test: "!!document.getElementById('toggle-btn')" },
    {
      name: 'Nav items rendered',
      test: "document.querySelectorAll('#nav-list .nav-item').length >= 4",
    },
    { name: 'One item is active', test: "!!document.querySelector('#nav-list .nav-item.active')" },
    {
      name: 'Page title exists',
      test: "!!document.getElementById('page-title') && document.getElementById('page-title').textContent.length > 0",
    },
  ],

  'ng-navbar': [
    { name: 'Nav links exist', test: "!!document.getElementById('nav-links')" },
    {
      name: 'Links rendered',
      test: "document.querySelectorAll('#nav-links .nav-link').length >= 4",
    },
    { name: 'One link is active', test: "!!document.querySelector('.nav-link.active')" },
    { name: 'Login button exists', test: "!!document.getElementById('login-btn')" },
    {
      name: 'Page name shows',
      test: "!!document.getElementById('page-name') && document.getElementById('page-name').textContent.length > 0",
    },
  ],

  'ng-breadcrumbs': [
    { name: 'Breadcrumbs container exists', test: "!!document.getElementById('breadcrumbs')" },
    {
      name: 'Crumbs rendered',
      test: "document.querySelectorAll('#breadcrumbs .crumb').length >= 1",
    },
    { name: 'Route items exist', test: "document.querySelectorAll('.route-item').length >= 6" },
    { name: 'One route is active', test: "!!document.querySelector('.route-item.active')" },
  ],

  'ng-bottom-nav': [
    { name: 'Bottom nav exists', test: "!!document.getElementById('bottom-nav')" },
    {
      name: 'Five nav items',
      test: "document.querySelectorAll('#bottom-nav .bnav-item').length === 5",
    },
    {
      name: 'One item is active',
      test: "!!document.querySelector('#bottom-nav .bnav-item.active')",
    },
    {
      name: 'Screen title exists',
      test: "!!document.getElementById('screen-title') && document.getElementById('screen-title').textContent.length > 0",
    },
    { name: 'Badge rendered', test: "!!document.querySelector('.badge')" },
  ],

  'ng-mega-menu': [
    { name: 'Menu bar exists', test: "!!document.getElementById('menu-bar')" },
    {
      name: 'Three triggers exist',
      test: "document.querySelectorAll('#menu-bar .menu-trigger').length === 3",
    },
    {
      name: 'Mega panel hidden initially',
      test: "!!document.getElementById('mega-panel') && document.getElementById('mega-panel').style.display === 'none'",
    },
    {
      name: 'Triggers have data-menu',
      test: '!!document.querySelector(\'.menu-trigger[data-menu="products"]\') && !!document.querySelector(\'.menu-trigger[data-menu="solutions"]\')',
    },
  ],

  'ng-pagination': [
    { name: 'Item list exists', test: "!!document.getElementById('item-list')" },
    { name: 'Items rendered', test: "document.querySelectorAll('#item-list li').length > 0" },
    { name: 'Paginator exists', test: "!!document.getElementById('paginator')" },
    {
      name: 'Page size selector exists',
      test: "!!document.getElementById('page-size') && document.getElementById('page-size').tagName === 'SELECT'",
    },
    {
      name: 'URL bar shows route',
      test: "!!document.getElementById('url-bar') && document.getElementById('url-bar').textContent.includes('page=')",
    },
  ],

  // ── Advanced Features ──────────────────────────────────────────────
  'ng-keyboard-shortcuts': [
    { name: 'Shortcut list exists', test: "!!document.getElementById('shortcut-list')" },
    {
      name: 'Shortcuts displayed',
      test: "document.querySelectorAll('#shortcut-list .shortcut').length >= 5",
    },
    { name: 'Log element exists', test: "!!document.getElementById('log')" },
    { name: 'Search overlay exists', test: "!!document.getElementById('search-overlay')" },
    { name: 'Kbd elements rendered', test: "document.querySelectorAll('kbd').length >= 5" },
  ],

  'ng-settings-panel': [
    { name: 'Theme toggle exists', test: "document.querySelectorAll('.tg').length === 2" },
    {
      name: 'Color options exist',
      test: "document.querySelectorAll('#color-options .color-dot').length === 4",
    },
    {
      name: 'Font size slider exists',
      test: "!!document.getElementById('font-size') && document.getElementById('font-size').type === 'range'",
    },
    { name: 'Notification switch exists', test: "!!document.getElementById('notif-switch')" },
    { name: 'Save button exists', test: "!!document.getElementById('save-btn')" },
  ],

  'ng-notifications-center': [
    { name: 'Notification list exists', test: "!!document.getElementById('notif-list')" },
    { name: 'Notifications rendered', test: "document.querySelectorAll('.notif').length >= 1" },
    {
      name: 'Filter tabs exist',
      test: "document.querySelectorAll('.filter-tabs .ft').length >= 4",
    },
    { name: 'Mark all button exists', test: "!!document.getElementById('mark-all')" },
    { name: 'Simulate button exists', test: "!!document.getElementById('simulate-btn')" },
  ],

  'ng-favorites': [
    { name: 'Items grid exists', test: "!!document.getElementById('items')" },
    { name: 'Item cards rendered', test: "document.querySelectorAll('.item-card').length >= 8" },
    { name: 'Favorite buttons exist', test: "document.querySelectorAll('.fav-btn').length >= 8" },
    { name: 'Favorites section exists', test: "!!document.getElementById('favorites')" },
    { name: 'Fav count element exists', test: "!!document.getElementById('fav-count')" },
  ],

  'ng-undo-redo': [
    { name: 'Undo button exists', test: "!!document.getElementById('undo-btn')" },
    { name: 'Redo button exists', test: "!!document.getElementById('redo-btn')" },
    { name: 'Add button exists', test: "!!document.getElementById('add-btn')" },
    { name: 'Undo starts disabled', test: "document.getElementById('undo-btn').disabled === true" },
    { name: 'History info exists', test: "!!document.getElementById('history-info')" },
  ],

  // ── UI Components ──────────────────────────────────────────────────
  'ng-loading-states': [
    { name: 'Load button exists', test: "!!document.getElementById('load-btn')" },
    { name: 'Content container exists', test: "!!document.getElementById('content')" },
    {
      name: 'Skeleton cards shown',
      test: "document.querySelectorAll('.skeleton-card').length >= 2",
    },
    {
      name: 'Skeleton shimmer elements exist',
      test: "document.querySelectorAll('.skeleton').length >= 2",
    },
  ],

  'ng-empty-states': [
    { name: 'Empty state container exists', test: "!!document.getElementById('empty-state')" },
    { name: 'Tab buttons exist', test: "document.querySelectorAll('.tabs .tab').length === 3" },
    { name: 'Empty icon shown', test: "!!document.querySelector('.empty-icon')" },
    {
      name: 'Empty title shown',
      test: "!!document.querySelector('.empty-title') && document.querySelector('.empty-title').textContent.length > 0",
    },
    { name: 'Action button exists', test: "!!document.querySelector('.empty-action')" },
  ],

  'ng-image-viewer': [
    { name: 'Viewer exists', test: "!!document.getElementById('viewer')" },
    { name: 'Image container exists', test: "!!document.getElementById('image-container')" },
    { name: 'Zoom in button exists', test: "!!document.getElementById('zoom-in')" },
    { name: 'Zoom out button exists', test: "!!document.getElementById('zoom-out')" },
    {
      name: 'Zoom level shows 100%',
      test: "!!document.getElementById('zoom-level') && document.getElementById('zoom-level').textContent.includes('100')",
    },
  ],

  'ng-toggle-switch': [
    { name: 'Toggle switches exist', test: "document.querySelectorAll('.toggle').length >= 4" },
    {
      name: 'Toggles have ARIA role',
      test: 'document.querySelectorAll(\'.toggle[role="switch"]\').length >= 4',
    },
    {
      name: 'Auto-save is on by default',
      test: '!!document.querySelector(\'.toggle[data-key="auto"].on\')',
    },
    { name: 'Disabled toggle exists', test: "!!document.querySelector('.toggle.disabled')" },
    { name: 'Form value display exists', test: "!!document.getElementById('form-value')" },
  ],
};
