/**
 * Test cases for Native JS UI pattern exercises.
 * Each test is a JavaScript expression that evaluates to boolean inside the sandbox iframe.
 */
import type { PatternTestCase } from './index';

export const nativeJsTests: Record<string, PatternTestCase[]> = {
  // ── Forms & Input ──────────────────────────────────────────────────

  'js-form-validation': [
    {
      name: 'Form element exists',
      test: "!!document.getElementById('signup-form')",
    },
    {
      name: 'Email input renders',
      test: "!!document.getElementById('email')",
    },
    {
      name: 'Password input renders',
      test: "!!document.getElementById('password')",
    },
    {
      name: 'Confirm input renders',
      test: "!!document.getElementById('confirm')",
    },
    {
      name: 'Submit button exists',
      test: '!!document.querySelector(\'#signup-form button[type="submit"]\')',
    },
  ],

  'js-autocomplete': [
    {
      name: 'Search input exists',
      test: "!!document.getElementById('search')",
    },
    {
      name: 'Suggestions list exists',
      test: "!!document.getElementById('suggestions')",
    },
    {
      name: 'Input has combobox role',
      test: "document.getElementById('search')?.getAttribute('role') === 'combobox'",
    },
    {
      name: 'Suggestions hidden initially',
      test: "!document.getElementById('suggestions').classList.contains('open')",
    },
  ],

  'js-file-upload': [
    {
      name: 'Drop zone exists',
      test: "!!document.getElementById('drop-zone')",
    },
    {
      name: 'File input exists',
      test: "!!document.getElementById('file-input')",
    },
    {
      name: 'File list container exists',
      test: "!!document.getElementById('file-list')",
    },
    {
      name: 'File input is hidden',
      test: "document.getElementById('file-input')?.hasAttribute('hidden') || document.getElementById('file-input')?.style.display === 'none'",
    },
  ],

  'js-date-picker': [
    {
      name: 'Date input exists',
      test: "!!document.getElementById('date-input')",
    },
    {
      name: 'Calendar container exists',
      test: "!!document.getElementById('calendar')",
    },
    {
      name: 'Calendar grid exists',
      test: "!!document.getElementById('cal-grid')",
    },
    {
      name: 'Month label renders',
      test: "!!document.getElementById('month-label') && document.getElementById('month-label').textContent.length > 0",
    },
    {
      name: 'Day-of-week headers rendered',
      test: "document.getElementById('cal-days')?.querySelectorAll('span').length >= 7",
    },
  ],

  'js-input-masking': [
    {
      name: 'Phone input exists',
      test: "!!document.getElementById('phone')",
    },
    {
      name: 'Card input exists',
      test: "!!document.getElementById('card')",
    },
    {
      name: 'Date input exists',
      test: "!!document.getElementById('date')",
    },
    {
      name: 'Output display exists',
      test: "!!document.getElementById('output')",
    },
  ],

  'js-range-slider': [
    {
      name: 'Slider track exists',
      test: "!!document.getElementById('slider')",
    },
    {
      name: 'Min thumb rendered',
      test: "!!document.getElementById('thumb-min')",
    },
    {
      name: 'Max thumb rendered',
      test: "!!document.getElementById('thumb-max')",
    },
    {
      name: 'Fill bar exists',
      test: "!!document.getElementById('fill')",
    },
    {
      name: 'Min value label shows $20',
      test: "document.getElementById('val-min')?.textContent?.includes('$')",
    },
  ],

  'js-inline-edit': [
    {
      name: 'Edit items rendered',
      test: "document.querySelectorAll('.edit-item').length >= 3",
    },
    {
      name: 'Display spans exist',
      test: "document.querySelectorAll('.edit-item .display').length >= 3",
    },
    {
      name: 'Edit buttons exist',
      test: "document.querySelectorAll('.edit-item .edit-btn').length >= 3",
    },
    {
      name: 'Edit inputs exist',
      test: "document.querySelectorAll('.edit-item .edit-input').length >= 3",
    },
  ],

  'js-custom-select': [
    {
      name: 'Custom select exists',
      test: "!!document.getElementById('custom-select')",
    },
    {
      name: 'Options list exists',
      test: "!!document.getElementById('options')",
    },
    {
      name: 'Options contain items',
      test: "document.querySelectorAll('#options li').length >= 5",
    },
    {
      name: 'Select value shows placeholder',
      test: "!!document.getElementById('select-value')?.textContent",
    },
    {
      name: 'Dropdown initially closed',
      test: "document.getElementById('custom-select')?.getAttribute('aria-expanded') === 'false'",
    },
  ],

  'js-password-strength': [
    {
      name: 'Password input exists',
      test: "!!document.getElementById('pw-input')",
    },
    {
      name: 'Meter fill bar exists',
      test: "!!document.getElementById('meter-fill')",
    },
    {
      name: 'Strength label exists',
      test: "!!document.getElementById('strength-label')",
    },
    {
      name: 'Rule items rendered',
      test: "document.querySelectorAll('#rules li').length === 5",
    },
    {
      name: 'Initial label text correct',
      test: "document.getElementById('strength-label')?.textContent === 'Enter a password'",
    },
  ],

  'js-dynamic-form': [
    {
      name: 'Dynamic form exists',
      test: "!!document.getElementById('dynamic-form')",
    },
    {
      name: 'Field groups generated',
      test: "document.querySelectorAll('#dynamic-form .field-group').length >= 4",
    },
    {
      name: 'Submit button created',
      test: '!!document.querySelector(\'#dynamic-form button[type="submit"]\')',
    },
    {
      name: 'Select field rendered',
      test: "!!document.querySelector('#dynamic-form select')",
    },
    {
      name: 'Output area exists',
      test: "!!document.getElementById('form-output')",
    },
  ],

  // ── Interactive Elements ───────────────────────────────────────────

  'js-modal': [
    {
      name: 'Open button exists',
      test: "!!document.getElementById('open-btn')",
    },
    {
      name: 'Backdrop exists',
      test: "!!document.getElementById('backdrop')",
    },
    {
      name: 'Cancel button exists',
      test: "!!document.getElementById('cancel-btn')",
    },
    {
      name: 'Confirm button exists',
      test: "!!document.getElementById('confirm-btn')",
    },
    {
      name: 'Modal hidden initially',
      test: "!document.getElementById('backdrop').classList.contains('open')",
    },
  ],

  'js-drag-drop': [
    {
      name: 'Sortable list exists',
      test: "!!document.getElementById('sortable')",
    },
    {
      name: 'Draggable items rendered',
      test: "document.querySelectorAll('#sortable .sortable-item').length >= 5",
    },
    {
      name: 'Items are draggable',
      test: "document.querySelector('#sortable .sortable-item')?.getAttribute('draggable') === 'true'",
    },
    {
      name: 'Items have text content',
      test: "document.querySelector('#sortable .sortable-item')?.textContent?.length > 0",
    },
  ],

  'js-sortable-table': [
    {
      name: 'Table body exists',
      test: "!!document.getElementById('table-body')",
    },
    {
      name: 'Sortable column headers exist',
      test: "document.querySelectorAll('.sortable-col').length >= 3",
    },
    {
      name: 'Table rows rendered',
      test: "document.querySelectorAll('#table-body tr').length >= 5",
    },
    {
      name: 'Rows have cells',
      test: "document.querySelectorAll('#table-body tr td').length >= 15",
    },
  ],

  'js-tabs': [
    {
      name: 'Tab buttons exist',
      test: "document.querySelectorAll('.tab').length >= 3",
    },
    {
      name: 'Tab panels exist',
      test: "document.querySelectorAll('.tab-panel').length >= 3",
    },
    {
      name: 'First tab is active',
      test: "document.querySelector('.tab')?.classList.contains('active')",
    },
    {
      name: 'Active panel visible',
      test: "document.querySelector('.tab-panel.active')?.textContent?.length > 0",
    },
    {
      name: 'Tabs have ARIA roles',
      test: "document.querySelector('.tab')?.getAttribute('role') === 'tab'",
    },
  ],

  'js-accordion': [
    {
      name: 'Accordion headers exist',
      test: "document.querySelectorAll('.accordion-header').length >= 3",
    },
    {
      name: 'Accordion bodies exist',
      test: "document.querySelectorAll('.accordion-body').length >= 3",
    },
    {
      name: 'Headers have aria-expanded',
      test: "document.querySelector('.accordion-header')?.hasAttribute('aria-expanded')",
    },
    {
      name: 'All panels closed initially',
      test: "document.querySelectorAll('.accordion-body.open').length === 0",
    },
  ],

  'js-carousel': [
    {
      name: 'Carousel track exists',
      test: "!!document.getElementById('track')",
    },
    {
      name: 'Slides rendered',
      test: "document.querySelectorAll('#track .slide').length >= 4",
    },
    {
      name: 'Dot indicators generated',
      test: "document.querySelectorAll('#dots .dot').length >= 4",
    },
    {
      name: 'First dot is active',
      test: "document.querySelector('#dots .dot')?.classList.contains('active')",
    },
    {
      name: 'Navigation buttons exist',
      test: "!!document.getElementById('prev-btn') && !!document.getElementById('next-btn')",
    },
  ],

  'js-context-menu': [
    {
      name: 'Context area exists',
      test: "!!document.getElementById('context-area')",
    },
    {
      name: 'Context menu exists',
      test: "!!document.getElementById('context-menu')",
    },
    {
      name: 'Menu items exist',
      test: "document.querySelectorAll('#context-menu .menu-item').length >= 4",
    },
    {
      name: 'Menu hidden initially',
      test: "document.getElementById('context-menu')?.style.display === 'none'",
    },
    {
      name: 'Action log exists',
      test: "!!document.getElementById('action-log')",
    },
  ],

  'js-infinite-scroll': [
    {
      name: 'Scroll container exists',
      test: "!!document.getElementById('scroll-container')",
    },
    {
      name: 'Items container exists',
      test: "!!document.getElementById('items')",
    },
    {
      name: 'Initial items loaded',
      test: "document.querySelectorAll('#items .scroll-item').length > 0",
    },
    {
      name: 'Sentinel element exists',
      test: "!!document.getElementById('sentinel')",
    },
    {
      name: 'Loader element exists',
      test: "!!document.getElementById('loader')",
    },
  ],

  'js-toast-notifications': [
    {
      name: 'Toast container exists',
      test: "!!document.getElementById('toast-container')",
    },
    {
      name: 'Toast trigger buttons exist',
      test: "document.querySelectorAll('.toast-btn').length >= 3",
    },
    {
      name: 'Buttons have data-type',
      test: "!!document.querySelector('.toast-btn')?.dataset?.type",
    },
    {
      name: 'No toasts initially',
      test: "document.querySelectorAll('#toast-container .toast').length === 0",
    },
  ],

  'js-wizard': [
    {
      name: 'Wizard steps exist',
      test: "document.querySelectorAll('.step').length >= 3",
    },
    {
      name: 'First step is active',
      test: "document.querySelector('.step')?.classList.contains('active')",
    },
    {
      name: 'Step indicator dots created',
      test: "document.querySelectorAll('#steps-indicator .step-dot').length >= 3",
    },
    {
      name: 'Progress bar exists',
      test: "!!document.getElementById('progress-fill')",
    },
    {
      name: 'Navigation buttons exist',
      test: "!!document.getElementById('prev-btn') && !!document.getElementById('next-btn')",
    },
  ],

  // ── Data Display ───────────────────────────────────────────────────

  'js-search-filter': [
    {
      name: 'Search input exists',
      test: "!!document.getElementById('search-input')",
    },
    {
      name: 'Results list exists',
      test: "!!document.getElementById('results')",
    },
    {
      name: 'Category tags exist',
      test: "document.querySelectorAll('.tag').length >= 3",
    },
    {
      name: 'Initial items rendered',
      test: "document.querySelectorAll('#results li').length > 0",
    },
    {
      name: '"All" tag is active by default',
      test: "document.querySelector('.tag[data-cat=\"all\"]')?.classList.contains('active')",
    },
  ],

  'js-gallery': [
    {
      name: 'Gallery grid exists',
      test: "!!document.getElementById('gallery')",
    },
    {
      name: 'Thumbnails rendered',
      test: "document.querySelectorAll('#gallery .gallery-thumb').length >= 6",
    },
    {
      name: 'Lightbox container exists',
      test: "!!document.getElementById('lightbox')",
    },
    {
      name: 'Lightbox hidden initially',
      test: "document.getElementById('lightbox')?.style.display === 'none'",
    },
    {
      name: 'Lightbox controls exist',
      test: "!!document.getElementById('lb-close') && !!document.getElementById('lb-prev') && !!document.getElementById('lb-next')",
    },
  ],

  'js-cards-grid': [
    {
      name: 'Card grid exists',
      test: "!!document.getElementById('card-grid')",
    },
    {
      name: 'Cards rendered',
      test: "document.querySelectorAll('#card-grid .card').length >= 6",
    },
    {
      name: 'Cards have titles',
      test: "document.querySelectorAll('#card-grid .card-title').length >= 6",
    },
    {
      name: 'Cards have tags',
      test: "document.querySelectorAll('#card-grid .card-tag').length >= 6",
    },
  ],

  'js-table-sort-filter': [
    {
      name: 'Table body exists',
      test: "!!document.getElementById('tb')",
    },
    {
      name: 'Filter input exists',
      test: "!!document.getElementById('tf')",
    },
    {
      name: 'Table rows rendered',
      test: "document.querySelectorAll('#tb tr').length > 0",
    },
    {
      name: 'Sortable columns exist',
      test: "document.querySelectorAll('.sc').length >= 3",
    },
    {
      name: 'Pagination rendered',
      test: "document.querySelectorAll('#tp .pg').length > 0",
    },
  ],

  'js-lazy-images': [
    {
      name: 'Lazy grid exists',
      test: "!!document.getElementById('lazy-grid')",
    },
    {
      name: 'Lazy items rendered',
      test: "document.querySelectorAll('.lazy-item').length >= 8",
    },
    {
      name: 'Placeholder elements present',
      test: "document.querySelectorAll('.lazy-placeholder').length >= 0",
    },
    {
      name: 'Image elements rendered',
      test: "document.querySelectorAll('.lazy-img').length >= 8",
    },
  ],

  'js-data-chart': [
    {
      name: 'Canvas element exists',
      test: "!!document.getElementById('chart')",
    },
    {
      name: 'Canvas has 2D context',
      test: "!!document.getElementById('chart')?.getContext('2d')",
    },
    {
      name: 'Tooltip element exists',
      test: "!!document.getElementById('tooltip')",
    },
    {
      name: 'Tooltip hidden initially',
      test: "document.getElementById('tooltip')?.style.display === 'none'",
    },
  ],

  'js-virtual-scroll': [
    {
      name: 'Scroll container exists',
      test: "!!document.getElementById('vsc')",
    },
    {
      name: 'Spacer element exists',
      test: "!!document.getElementById('vsp')",
    },
    {
      name: 'Content container exists',
      test: "!!document.getElementById('vsn')",
    },
    {
      name: 'Virtual rows rendered',
      test: "document.querySelectorAll('#vsn .vsr').length > 0",
    },
    {
      name: 'Spacer has height set',
      test: "parseInt(document.getElementById('vsp')?.style.height || '0', 10) > 0",
    },
  ],

  // ── Navigation ─────────────────────────────────────────────────────

  'js-navbar': [
    {
      name: 'Hamburger button exists',
      test: "!!document.getElementById('hb')",
    },
    {
      name: 'Nav list exists',
      test: "!!document.getElementById('nl')",
    },
    {
      name: 'Nav links rendered',
      test: "document.querySelectorAll('.nk').length >= 4",
    },
    {
      name: 'Active link set',
      test: "!!document.querySelector('.nk.active')",
    },
    {
      name: 'Page display exists',
      test: "!!document.getElementById('pd')",
    },
  ],

  'js-sidebar': [
    {
      name: 'Sidebar element exists',
      test: "!!document.getElementById('sb')",
    },
    {
      name: 'Overlay exists',
      test: "!!document.getElementById('ov')",
    },
    {
      name: 'Open button exists',
      test: "!!document.getElementById('os')",
    },
    {
      name: 'Close button exists',
      test: "!!document.getElementById('cs')",
    },
    {
      name: 'Sidebar closed initially',
      test: "!document.getElementById('sb').classList.contains('open')",
    },
  ],

  'js-breadcrumbs': [
    {
      name: 'Breadcrumb list exists',
      test: "!!document.getElementById('bc')",
    },
    {
      name: 'Initial crumbs rendered',
      test: "document.querySelectorAll('#bc li').length >= 1",
    },
    {
      name: 'Path buttons exist',
      test: "document.querySelectorAll('.pbtn').length >= 4",
    },
    {
      name: 'Current path display exists',
      test: "!!document.getElementById('cp')",
    },
  ],

  'js-bottom-nav': [
    {
      name: 'Scroll area exists',
      test: "!!document.getElementById('sa')",
    },
    {
      name: 'Bottom nav exists',
      test: "!!document.getElementById('bn')",
    },
    {
      name: 'Nav items rendered',
      test: "document.querySelectorAll('.bi').length >= 4",
    },
    {
      name: 'Active item set',
      test: "!!document.querySelector('.bi.active')",
    },
  ],

  'js-dropdown-menu': [
    {
      name: 'Dropdown containers exist',
      test: "document.querySelectorAll('.dd').length >= 2",
    },
    {
      name: 'Menu triggers exist',
      test: "document.querySelectorAll('.mt').length >= 2",
    },
    {
      name: 'Dropdown lists exist',
      test: "document.querySelectorAll('.dl').length >= 2",
    },
    {
      name: 'Menu items have role',
      test: 'document.querySelectorAll(\'[role="menuitem"]\').length >= 5',
    },
    {
      name: 'Selection display exists',
      test: "!!document.getElementById('ds')",
    },
  ],

  'js-pagination': [
    {
      name: 'Items container exists',
      test: "!!document.getElementById('pi')",
    },
    {
      name: 'Pagination controls exist',
      test: "!!document.getElementById('pg')",
    },
    {
      name: 'Page items rendered',
      test: "document.querySelectorAll('#pi .pit').length > 0",
    },
    {
      name: 'Page buttons rendered',
      test: "document.querySelectorAll('#pg .pb').length > 0",
    },
    {
      name: 'Active page button set',
      test: "!!document.querySelector('#pg .pb.active')",
    },
  ],

  // ── Advanced Features ──────────────────────────────────────────────

  'js-keyboard-shortcuts': [
    {
      name: 'Output display exists',
      test: "!!document.getElementById('so')",
    },
    {
      name: 'Key display exists',
      test: "!!document.getElementById('kd')",
    },
    {
      name: 'Shortcut list rendered',
      test: "document.querySelectorAll('.sr').length >= 5",
    },
    {
      name: 'Kbd elements rendered',
      test: "document.querySelectorAll('kbd').length >= 5",
    },
  ],

  'js-notifications': [
    {
      name: 'Notification list exists',
      test: "!!document.getElementById('nli')",
    },
    {
      name: 'Send button exists',
      test: "!!document.getElementById('sn')",
    },
    {
      name: 'Clear button exists',
      test: "!!document.getElementById('cn')",
    },
    {
      name: 'Empty state shows initially',
      test: "!!document.getElementById('ne') && document.getElementById('ne').style.display !== 'none'",
    },
  ],

  'js-undo-redo': [
    {
      name: 'Canvas container exists',
      test: "!!document.getElementById('uc')",
    },
    {
      name: 'Undo button exists',
      test: "!!document.getElementById('ub')",
    },
    {
      name: 'Redo button exists',
      test: "!!document.getElementById('rb')",
    },
    {
      name: 'Add button exists',
      test: "!!document.getElementById('ab')",
    },
    {
      name: 'History info displayed',
      test: "!!document.getElementById('ui')?.textContent",
    },
  ],

  'js-clipboard': [
    {
      name: 'Copy input exists',
      test: "!!document.getElementById('ci')",
    },
    {
      name: 'Paste input exists',
      test: "!!document.getElementById('pi')",
    },
    {
      name: 'Copy button exists',
      test: "!!document.getElementById('cb')",
    },
    {
      name: 'Paste button exists',
      test: "!!document.getElementById('pb')",
    },
    {
      name: 'Quick copy snippets exist',
      test: "document.querySelectorAll('.snb').length >= 3",
    },
  ],

  'js-local-storage': [
    {
      name: 'Note input exists',
      test: "!!document.getElementById('ni')",
    },
    {
      name: 'Note list exists',
      test: "!!document.getElementById('nl')",
    },
    {
      name: 'Add button exists',
      test: "!!document.getElementById('an')",
    },
    {
      name: 'Clear all button exists',
      test: "!!document.getElementById('ca')",
    },
    {
      name: 'Storage info display exists',
      test: "!!document.getElementById('si')",
    },
  ],

  // ── UI Components ──────────────────────────────────────────────────

  'js-loading-skeleton': [
    {
      name: 'Toggle button exists',
      test: "!!document.getElementById('tl')",
    },
    {
      name: 'Skeleton containers exist',
      test: "document.querySelectorAll('.skd').length >= 3",
    },
    {
      name: 'Skeleton elements rendered',
      test: "document.querySelectorAll('.sk').length > 0",
    },
    {
      name: 'Skeleton has shimmer animation',
      test: "document.querySelectorAll('.ska').length > 0 || document.querySelectorAll('.skt').length > 0",
    },
  ],

  'js-empty-states': [
    {
      name: 'Empty state container exists',
      test: "!!document.getElementById('es')",
    },
    {
      name: 'Scene tabs exist',
      test: "document.querySelectorAll('.stb').length >= 3",
    },
    {
      name: 'Active tab is set',
      test: "!!document.querySelector('.stb.active')",
    },
    {
      name: 'Scene content rendered',
      test: "document.getElementById('es')?.innerHTML.length > 0",
    },
    {
      name: 'Action button rendered',
      test: "!!document.querySelector('#es .eb')",
    },
  ],

  'js-image-zoom': [
    {
      name: 'Zoom container exists',
      test: "!!document.getElementById('zc')",
    },
    {
      name: 'Lens element exists',
      test: "!!document.getElementById('zl')",
    },
    {
      name: 'Preview panel exists',
      test: "!!document.getElementById('zp')",
    },
    {
      name: 'Grid cells rendered',
      test: "document.querySelectorAll('.zgl').length >= 9",
    },
    {
      name: 'Preview has cloned content',
      test: "document.getElementById('zp')?.querySelector('.zg') !== null",
    },
  ],

  'js-toggle-switch': [
    {
      name: 'Wi-Fi toggle exists',
      test: "!!document.getElementById('tw')",
    },
    {
      name: 'Bluetooth toggle exists',
      test: "!!document.getElementById('tb')",
    },
    {
      name: 'Dark mode toggle exists',
      test: "!!document.getElementById('td')",
    },
    {
      name: 'Status labels rendered',
      test: "!!document.getElementById('sw') && !!document.getElementById('sb') && !!document.getElementById('sd')",
    },
    {
      name: 'Wi-Fi checked shows On',
      test: "document.getElementById('tw')?.checked === true && document.getElementById('sw')?.textContent === 'On'",
    },
  ],
};
