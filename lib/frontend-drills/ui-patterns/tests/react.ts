/**
 * Test cases for React UI pattern exercises.
 * Each test is a JavaScript expression that evaluates to boolean inside the sandbox iframe.
 */
import type { PatternTestCase } from './index';

export const reactTests: Record<string, PatternTestCase[]> = {
  // ──────────────────────────────────────────────
  // Forms & Input
  // ──────────────────────────────────────────────
  'react-forms': [
    { name: 'Form element renders', test: "!!document.querySelector('form')" },
    {
      name: 'Has name input',
      test: "!!document.querySelector('input[placeholder*=\"name\" i]') || document.querySelectorAll('input').length >= 2",
    },
    {
      name: 'Has email input',
      test: '!!document.querySelector(\'input[placeholder*="email" i]\') || !!document.querySelector(\'input[type="email"]\')',
    },
    { name: 'Has password input', test: '!!document.querySelector(\'input[type="password"]\')' },
    {
      name: 'Submit button exists',
      test: "!!document.querySelector('button[type=\"submit\"]') || !!document.querySelector('form button')",
    },
  ],

  'react-autocomplete': [
    { name: 'Input renders', test: "!!document.querySelector('input')" },
    { name: 'Has combobox role', test: '!!document.querySelector(\'[role="combobox"]\')' },
    { name: 'Autocomplete container exists', test: "!!document.querySelector('.autocomplete')" },
    {
      name: 'No suggestions initially',
      test: "!document.querySelector('.suggestions') || document.querySelectorAll('.suggestion').length === 0",
    },
  ],

  'react-autosave': [
    { name: 'Title input renders', test: "!!document.querySelector('input')" },
    { name: 'Textarea renders', test: "!!document.querySelector('textarea')" },
    { name: 'Status indicator exists', test: "!!document.querySelector('.status')" },
    {
      name: 'Shows saved status',
      test: "!!document.querySelector('.status.saved') || (document.querySelector('.status') && document.querySelector('.status').textContent.toLowerCase().includes('saved'))",
    },
  ],

  'react-input-feedback': [
    { name: 'Input fields render', test: "document.querySelectorAll('input').length >= 2" },
    {
      name: 'Labels exist',
      test: "document.querySelectorAll('label').length >= 2 || document.querySelectorAll('.field').length >= 2",
    },
    {
      name: 'No validation shown initially',
      test: "!document.querySelector('.msg') && !document.querySelector('.icon')",
    },
    {
      name: 'Input wrapper exists',
      test: "!!document.querySelector('.input-wrap') || !!document.querySelector('.field')",
    },
  ],

  'react-password-strength': [
    {
      name: 'Password input renders',
      test: '!!document.querySelector(\'input[type="password"]\')',
    },
    { name: 'Label exists', test: "!!document.querySelector('label')" },
    {
      name: 'Meter hidden when empty',
      test: "!document.querySelector('.meter-fill') || document.querySelector('.meter-fill').style.width === '0%'",
    },
    {
      name: 'Rules section structure',
      test: "!document.querySelector('.rules') || document.querySelectorAll('.rule').length === 0",
    },
  ],

  'react-file-upload': [
    { name: 'Dropzone renders', test: "!!document.querySelector('.dropzone')" },
    { name: 'Hidden file input exists', test: '!!document.querySelector(\'input[type="file"]\')' },
    { name: 'No files initially', test: "document.querySelectorAll('.file-item').length === 0" },
    {
      name: 'Dropzone has text',
      test: "document.querySelector('.dropzone') && document.querySelector('.dropzone').textContent.length > 0",
    },
  ],

  'react-color-picker': [
    { name: 'Preview circle renders', test: "!!document.querySelector('.preview')" },
    {
      name: 'Has three range sliders',
      test: 'document.querySelectorAll(\'input[type="range"]\').length >= 3',
    },
    { name: 'Hex value displayed', test: "!!document.querySelector('.hex-val')" },
    { name: 'Picker container exists', test: "!!document.querySelector('.picker')" },
  ],

  'react-calendar-picker': [
    { name: 'Calendar renders', test: "!!document.querySelector('.cal')" },
    {
      name: 'Navigation buttons exist',
      test: "document.querySelectorAll('.cal-header button').length >= 2",
    },
    { name: 'Day labels shown', test: "document.querySelectorAll('.day-label').length === 7" },
    { name: 'Day cells rendered', test: "document.querySelectorAll('.day').length >= 28" },
    {
      name: 'Month title shown',
      test: "!!document.querySelector('.cal-title') && document.querySelector('.cal-title').textContent.length > 0",
    },
  ],

  'react-range-slider': [
    {
      name: 'Range inputs render',
      test: 'document.querySelectorAll(\'input[type="range"]\').length >= 2',
    },
    { name: 'Slider labels exist', test: "document.querySelectorAll('.slider-label').length >= 2" },
    {
      name: 'Range display boxes exist',
      test: "document.querySelectorAll('.range-box').length >= 2",
    },
    { name: 'Values displayed', test: "document.querySelectorAll('.val').length >= 2" },
  ],

  'react-radio-checkbox': [
    { name: 'Radio options render', test: "document.querySelectorAll('.radio-dot').length >= 3" },
    {
      name: 'Checkbox options render',
      test: "document.querySelectorAll('.check-box').length >= 3",
    },
    { name: 'Group titles exist', test: "document.querySelectorAll('.group-title').length >= 2" },
    {
      name: 'One radio selected by default',
      test: "document.querySelectorAll('.radio-dot.active').length === 1",
    },
  ],

  'react-structured-format': [
    { name: 'Input fields render', test: "document.querySelectorAll('input').length >= 3" },
    { name: 'Labels exist', test: "document.querySelectorAll('label').length >= 3" },
    { name: 'Format hints shown', test: "document.querySelectorAll('.hint').length >= 3" },
    {
      name: 'Fields have placeholders',
      test: "Array.from(document.querySelectorAll('input')).every(function(el) { return el.placeholder.length > 0; })",
    },
  ],

  'react-forgiving-format': [
    { name: 'Input fields render', test: "document.querySelectorAll('input').length >= 2" },
    { name: 'Labels exist', test: "document.querySelectorAll('label').length >= 2" },
    {
      name: 'No parsed output initially',
      test: "document.querySelectorAll('.parsed').length === 0",
    },
    { name: 'Placeholders show examples', test: "!!document.querySelector('input[placeholder]')" },
  ],

  'react-expandable-input': [
    { name: 'Textarea renders', test: "!!document.querySelector('textarea')" },
    { name: 'Label exists', test: "!!document.querySelector('label')" },
    { name: 'Character count shown', test: "!!document.querySelector('.char-count')" },
    {
      name: 'Shows 0 characters initially',
      test: "document.querySelector('.char-count') && document.querySelector('.char-count').textContent.includes('0')",
    },
  ],

  'react-input-prompt': [
    { name: 'Input renders', test: "!!document.querySelector('input')" },
    { name: 'Suggestion chips exist', test: "document.querySelectorAll('.chip').length >= 3" },
    { name: 'Hint text shown', test: "!!document.querySelector('.hint-text')" },
    { name: 'Prompt wrapper exists', test: "!!document.querySelector('.prompt-wrap')" },
  ],

  'react-inplace-editor': [
    {
      name: 'Editable fields render',
      test: "document.querySelectorAll('.editable').length >= 2 || document.querySelectorAll('.item').length >= 2",
    },
    { name: 'Item labels exist', test: "document.querySelectorAll('.item-label').length >= 2" },
    { name: 'Hint text shown', test: "!!document.querySelector('.hint')" },
    {
      name: 'Fields show values',
      test: "document.querySelectorAll('.editable').length >= 1 && document.querySelector('.editable').textContent.trim().length > 0",
    },
  ],

  'react-select-dropdown': [
    { name: 'Select button renders', test: "!!document.querySelector('.select-btn')" },
    { name: 'Has combobox role', test: '!!document.querySelector(\'[role="combobox"]\')' },
    { name: 'Label exists', test: "!!document.querySelector('label')" },
    { name: 'Dropdown closed initially', test: "!document.querySelector('.dropdown')" },
  ],

  'react-copy-box': [
    { name: 'Copy boxes render', test: "document.querySelectorAll('.copy-box').length >= 2" },
    {
      name: 'Code elements exist',
      test: "document.querySelectorAll('.copy-box code').length >= 2",
    },
    { name: 'Copy buttons exist', test: "document.querySelectorAll('.copy-btn').length >= 2" },
    { name: 'Labels shown', test: "document.querySelectorAll('label').length >= 2" },
  ],

  // ──────────────────────────────────────────────
  // Interactive Elements
  // ──────────────────────────────────────────────
  'react-event-calendar': [
    { name: 'Calendar header renders', test: "!!document.querySelector('.cal-header')" },
    {
      name: 'Navigation buttons exist',
      test: "document.querySelectorAll('.cal-header button').length >= 2",
    },
    { name: 'Day headers shown', test: "document.querySelectorAll('.day-hdr').length === 7" },
    { name: 'Day cells rendered', test: "document.querySelectorAll('.day-cell').length >= 28" },
    { name: 'Events displayed', test: "document.querySelectorAll('.event-dot').length >= 1" },
  ],

  'react-modal': [
    {
      name: 'Trigger button renders',
      test: "!!document.querySelector('.trigger') || !!document.querySelector('button')",
    },
    { name: 'Modal hidden initially', test: "!document.querySelector('.overlay')" },
    {
      name: 'Button text correct',
      test: "document.querySelector('.trigger') && document.querySelector('.trigger').textContent.includes('Open')",
    },
  ],

  'react-drag-drop': [
    { name: 'Board renders', test: "!!document.querySelector('.board')" },
    { name: 'Three columns exist', test: "document.querySelectorAll('.column').length === 3" },
    { name: 'Cards rendered', test: "document.querySelectorAll('.card').length >= 3" },
    { name: 'Column titles shown', test: "document.querySelectorAll('.col-title').length === 3" },
  ],

  'react-tables': [
    { name: 'Table renders', test: "!!document.querySelector('table')" },
    { name: 'Table headers exist', test: "document.querySelectorAll('th').length >= 4" },
    { name: 'Table rows rendered', test: "document.querySelectorAll('tbody tr').length >= 3" },
    { name: 'Checkboxes exist', test: "document.querySelectorAll('.cb').length >= 2" },
    { name: 'Status badges shown', test: "document.querySelectorAll('.badge').length >= 1" },
  ],

  'react-data-grid': [
    { name: 'Grid renders', test: "!!document.querySelector('.grid')" },
    { name: 'Toolbar exists', test: "!!document.querySelector('.toolbar')" },
    { name: 'Search input exists', test: "!!document.querySelector('.toolbar input')" },
    { name: 'Grid rows rendered', test: "document.querySelectorAll('.grid-row').length >= 3" },
    { name: 'Category filter exists', test: "!!document.querySelector('.toolbar select')" },
  ],

  'react-carousel': [
    { name: 'Carousel renders', test: "!!document.querySelector('.carousel')" },
    { name: 'Slides exist', test: "document.querySelectorAll('.slide').length >= 3" },
    {
      name: 'Navigation buttons exist',
      test: "!!document.querySelector('.nav-btn.prev') && !!document.querySelector('.nav-btn.next')",
    },
    { name: 'Dots rendered', test: "document.querySelectorAll('.dot').length >= 3" },
    { name: 'Play/pause button exists', test: "!!document.querySelector('.play-btn')" },
  ],

  'react-tabs': [
    {
      name: 'Tab bar renders',
      test: "!!document.querySelector('.tabs-bar') || !!document.querySelector('[role=\"tablist\"]')",
    },
    { name: 'Tab buttons exist', test: "document.querySelectorAll('.tab-btn').length >= 3" },
    { name: 'Active tab shown', test: "!!document.querySelector('.tab-btn.active')" },
    { name: 'Tab content rendered', test: "!!document.querySelector('.tab-content')" },
  ],

  'react-swipe-actions': [
    { name: 'Swipe items render', test: "document.querySelectorAll('.swipe-item').length >= 3" },
    {
      name: 'Content elements exist',
      test: "document.querySelectorAll('.swipe-content').length >= 3",
    },
    {
      name: 'Titles shown',
      test: "document.querySelectorAll('.swipe-content .title').length >= 3",
    },
    { name: 'Hint text exists', test: "!!document.querySelector('.hint')" },
  ],

  'react-long-press': [
    { name: 'Cards render', test: "document.querySelectorAll('.card').length >= 3" },
    { name: 'Card titles shown', test: "document.querySelectorAll('.card .title').length >= 3" },
    { name: 'No context menu initially', test: "!document.querySelector('.context-menu')" },
    { name: 'Hint text exists', test: "!!document.querySelector('.hint')" },
  ],

  'react-pinch-zoom': [
    { name: 'Zoom container renders', test: "!!document.querySelector('.zoom-container')" },
    { name: 'Zoom controls exist', test: "!!document.querySelector('.zoom-controls')" },
    { name: 'Zoom level shown', test: "!!document.querySelector('.zoom-level')" },
    { name: 'Grid cells rendered', test: "document.querySelectorAll('.grid-cell').length >= 8" },
    {
      name: 'Shows 100% initially',
      test: "document.querySelector('.zoom-level') && document.querySelector('.zoom-level').textContent.includes('100%')",
    },
  ],

  'react-pull-refresh': [
    { name: 'Feed items render', test: "document.querySelectorAll('.feed-item').length >= 2" },
    { name: 'Refresh button exists', test: "!!document.querySelector('button')" },
    { name: 'Titles shown', test: "document.querySelectorAll('.feed-item .title').length >= 2" },
    { name: 'Timestamps shown', test: "document.querySelectorAll('.feed-item .time').length >= 2" },
  ],

  'react-drag-reorder': [
    { name: 'List items render', test: "document.querySelectorAll('.list-item').length >= 4" },
    { name: 'Drag handles exist', test: "document.querySelectorAll('.handle').length >= 4" },
    { name: 'Items are numbered', test: "document.querySelectorAll('.item-num').length >= 4" },
    { name: 'Item text shown', test: "document.querySelectorAll('.item-text').length >= 4" },
  ],

  'react-double-tap': [
    { name: 'Photo cards render', test: "document.querySelectorAll('.photo-card').length >= 2" },
    { name: 'Photo areas exist', test: "document.querySelectorAll('.photo-area').length >= 2" },
    { name: 'Like counts shown', test: "document.querySelectorAll('.likes').length >= 2" },
    { name: 'Like buttons exist', test: "document.querySelectorAll('.like-btn').length >= 2" },
  ],

  'react-tap-expand': [
    { name: 'Expand cards render', test: "document.querySelectorAll('.expand-card').length >= 3" },
    { name: 'Headers exist', test: "document.querySelectorAll('.expand-header').length >= 3" },
    { name: 'Titles shown', test: "document.querySelectorAll('.expand-title').length >= 3" },
    {
      name: 'All collapsed initially',
      test: "document.querySelectorAll('.expand-body.open').length <= 1",
    },
  ],

  'react-progressive-disclosure': [
    { name: 'Basic fields render', test: "document.querySelectorAll('input').length >= 2" },
    { name: 'Toggle link exists', test: "!!document.querySelector('.toggle-link')" },
    {
      name: 'Advanced hidden initially',
      test: "!!document.querySelector('.advanced.hidden') || !document.querySelector('.advanced.visible')",
    },
    {
      name: 'Section titles exist',
      test: "document.querySelectorAll('.section-title').length >= 1",
    },
  ],

  'react-wizard': [
    { name: 'Steps indicator renders', test: "document.querySelectorAll('.step').length >= 3" },
    { name: 'Step labels shown', test: "document.querySelectorAll('.step-label').length >= 3" },
    { name: 'Form inputs exist', test: "document.querySelectorAll('input').length >= 1" },
    { name: 'Navigation buttons exist', test: "document.querySelectorAll('.btn').length >= 1" },
    { name: 'First step is active', test: "!!document.querySelector('.step.active')" },
  ],

  'react-undo': [
    { name: 'Palette renders', test: "document.querySelectorAll('.color-opt').length >= 4" },
    { name: 'Undo button exists', test: "!!document.querySelector('.tool-btn')" },
    { name: 'Canvas rendered', test: "!!document.querySelector('.canvas')" },
    { name: 'Grid cells exist', test: "document.querySelectorAll('.cell').length >= 16" },
    { name: 'Status shown', test: "!!document.querySelector('.status')" },
  ],

  'react-wysiwyg': [
    { name: 'Toolbar renders', test: "!!document.querySelector('.editor-toolbar')" },
    { name: 'Format buttons exist', test: "document.querySelectorAll('.fmt-btn').length >= 4" },
    { name: 'Editor area exists', test: "!!document.querySelector('.editor-area')" },
    {
      name: 'Editor is contentEditable',
      test: "document.querySelector('.editor-area') && document.querySelector('.editor-area').contentEditable === 'true'",
    },
  ],

  'react-swipe-navigation': [
    { name: 'Navigation renders', test: "!!document.querySelector('.swipe-nav')" },
    { name: 'Pages exist', test: "document.querySelectorAll('.page').length >= 3" },
    { name: 'Navigation dots exist', test: "document.querySelectorAll('.nav-dot').length >= 3" },
    { name: 'Arrow buttons exist', test: "document.querySelectorAll('.nav-arr').length >= 2" },
  ],

  // ──────────────────────────────────────────────
  // Data Display
  // ──────────────────────────────────────────────
  'react-data-visualization': [
    {
      name: 'Chart renders',
      test: "!!document.querySelector('.chart') || !!document.querySelector('.bar-chart')",
    },
    { name: 'Bar chart exists', test: "!!document.querySelector('.bar-chart')" },
    { name: 'Bars rendered', test: "document.querySelectorAll('.bar').length >= 5" },
    { name: 'Bar labels exist', test: "document.querySelectorAll('.bar-label').length >= 4" },
    { name: 'Legend shown', test: "!!document.querySelector('.legend')" },
  ],

  'react-article-list': [
    { name: 'Articles render', test: "document.querySelectorAll('.article').length >= 3" },
    { name: 'Titles shown', test: "document.querySelectorAll('.article-title').length >= 3" },
    { name: 'Categories displayed', test: "document.querySelectorAll('.article-cat').length >= 3" },
    { name: 'Descriptions shown', test: "document.querySelectorAll('.article-desc').length >= 3" },
  ],

  'react-gallery': [
    { name: 'Gallery grid renders', test: "!!document.querySelector('.gallery-grid')" },
    { name: 'Gallery items exist', test: "document.querySelectorAll('.gallery-item').length >= 4" },
    { name: 'Overlays exist', test: "document.querySelectorAll('.overlay').length >= 4" },
    { name: 'Lightbox hidden initially', test: "!document.querySelector('.lightbox')" },
  ],

  'react-thumbnail': [
    { name: 'Thumbnail grid renders', test: "!!document.querySelector('.thumb-grid')" },
    { name: 'Thumbnails exist', test: "document.querySelectorAll('.thumb').length >= 6" },
    { name: 'Labels shown', test: "document.querySelectorAll('.thumb-label').length >= 6" },
    { name: 'No detail panel initially', test: "!document.querySelector('.detail')" },
  ],

  'react-cards': [
    { name: 'Cards grid renders', test: "!!document.querySelector('.cards')" },
    { name: 'Cards exist', test: "document.querySelectorAll('.card').length >= 3" },
    { name: 'Card titles shown', test: "document.querySelectorAll('.card-title').length >= 3" },
    { name: 'Card footers exist', test: "document.querySelectorAll('.card-footer').length >= 3" },
  ],

  'react-data-filtering': [
    { name: 'Filter buttons render', test: "document.querySelectorAll('.filter-btn').length >= 3" },
    { name: 'Items displayed', test: "document.querySelectorAll('.item').length >= 5" },
    { name: 'Item count shown', test: "!!document.querySelector('.count')" },
    {
      name: 'All filter active by default',
      test: "!!document.querySelector('.filter-btn.active')",
    },
  ],

  'react-search': [
    { name: 'Search box renders', test: "!!document.querySelector('.search-box')" },
    { name: 'Search input exists', test: "!!document.querySelector('.search-box input')" },
    { name: 'Results displayed', test: "document.querySelectorAll('.result').length >= 3" },
    { name: 'Result titles shown', test: "document.querySelectorAll('.result-title').length >= 3" },
  ],

  'react-search-filters': [
    { name: 'Filter panel renders', test: "!!document.querySelector('.filter-panel')" },
    { name: 'Search input exists', test: "!!document.querySelector('.filter-panel input')" },
    {
      name: 'Category select exists',
      test: "document.querySelectorAll('.filter-panel select').length >= 1",
    },
    { name: 'Items displayed', test: "document.querySelectorAll('.item-row').length >= 3" },
  ],

  'react-table-filter': [
    { name: 'Table renders', test: "!!document.querySelector('table')" },
    { name: 'Filter row exists', test: "!!document.querySelector('.filter-row')" },
    {
      name: 'Filter inputs exist',
      test: "document.querySelectorAll('.filter-row input, .filter-row select').length >= 2",
    },
    { name: 'Table rows rendered', test: "document.querySelectorAll('tbody tr').length >= 3" },
  ],

  'react-sort-column': [
    { name: 'Table renders', test: "!!document.querySelector('table')" },
    { name: 'Sortable headers exist', test: "document.querySelectorAll('th').length >= 3" },
    { name: 'Sorted column indicated', test: "!!document.querySelector('th.sorted')" },
    { name: 'Table rows rendered', test: "document.querySelectorAll('tbody tr').length >= 4" },
    { name: 'Sort arrow shown', test: "!!document.querySelector('.sort-arrow')" },
  ],

  'react-tag-cloud': [
    { name: 'Cloud renders', test: "!!document.querySelector('.cloud')" },
    { name: 'Tags exist', test: "document.querySelectorAll('.tag').length >= 8" },
    {
      name: 'Tags have varying sizes',
      test: "new Set(Array.from(document.querySelectorAll('.tag')).map(function(t) { return t.style.fontSize; })).size > 1",
    },
    {
      name: 'No detail initially',
      test: "!document.querySelector('.detail') || document.querySelectorAll('.tag.selected').length === 0",
    },
  ],

  'react-continuous-scrolling': [
    { name: 'Scroll list renders', test: "!!document.querySelector('.scroll-list')" },
    { name: 'Items loaded', test: "document.querySelectorAll('.scroll-item').length >= 5" },
    { name: 'Avatars displayed', test: "document.querySelectorAll('.avatar').length >= 5" },
    { name: 'Item count shown', test: "document.body.textContent.includes('items loaded')" },
  ],

  'react-dashboard': [
    { name: 'Dashboard grid renders', test: "!!document.querySelector('.dash-grid')" },
    { name: 'Widgets exist', test: "document.querySelectorAll('.widget').length >= 4" },
    { name: 'Widget titles shown', test: "document.querySelectorAll('.widget-title').length >= 4" },
    {
      name: 'Widget values displayed',
      test: "document.querySelectorAll('.widget-val').length >= 3",
    },
    { name: 'Mini chart exists', test: "document.querySelectorAll('.mini-bar').length >= 5" },
  ],

  'react-alternating-rows': [
    { name: 'Table renders', test: "!!document.querySelector('table')" },
    { name: 'Header row exists', test: "document.querySelectorAll('th').length >= 3" },
    { name: 'Data rows rendered', test: "document.querySelectorAll('tbody tr').length >= 4" },
    {
      name: 'Rows have alternating classes',
      test: "!!document.querySelector('tr.even') && !!document.querySelector('tr.odd')",
    },
  ],

  'react-formatting-data': [
    { name: 'Format rows render', test: "document.querySelectorAll('.format-row').length >= 5" },
    { name: 'Labels shown', test: "document.querySelectorAll('.format-label').length >= 5" },
    { name: 'Values displayed', test: "document.querySelectorAll('.format-value').length >= 5" },
    {
      name: 'Section titles exist',
      test: "document.querySelectorAll('.section-title').length >= 2",
    },
  ],

  // ──────────────────────────────────────────────
  // Navigation
  // ──────────────────────────────────────────────
  'react-navbar': [
    {
      name: 'Navbar renders',
      test: "!!document.querySelector('.navbar') || !!document.querySelector('nav')",
    },
    { name: 'Brand shown', test: "!!document.querySelector('.nav-brand')" },
    { name: 'Nav links exist', test: "document.querySelectorAll('.nav-link').length >= 3" },
    { name: 'Active link indicated', test: "!!document.querySelector('.nav-link.active')" },
  ],

  'react-sidebar': [
    { name: 'Layout renders', test: "!!document.querySelector('.layout')" },
    { name: 'Sidebar exists', test: "!!document.querySelector('.sidebar')" },
    { name: 'Nav items exist', test: "document.querySelectorAll('.nav-item').length >= 3" },
    { name: 'Toggle button exists', test: "!!document.querySelector('.toggle-btn')" },
    { name: 'Active item indicated', test: "!!document.querySelector('.nav-item.active')" },
  ],

  'react-mobile-menu': [
    { name: 'Header renders', test: "!!document.querySelector('.mobile-header')" },
    { name: 'Menu button exists', test: "!!document.querySelector('.menu-btn')" },
    { name: 'Brand shown', test: "!!document.querySelector('.brand')" },
    {
      name: 'Menu closed initially',
      test: "!!document.querySelector('.mobile-nav.closed') || !document.querySelector('.mobile-nav.open')",
    },
  ],

  'react-bottom-navigation': [
    { name: 'Phone frame renders', test: "!!document.querySelector('.phone-frame')" },
    { name: 'Bottom nav exists', test: "!!document.querySelector('.bottom-nav')" },
    { name: 'Tab buttons exist', test: "document.querySelectorAll('.bottom-tab').length >= 4" },
    { name: 'Active tab indicated', test: "!!document.querySelector('.bottom-tab.active')" },
  ],

  'react-dropdown-menu': [
    { name: 'Menu trigger renders', test: "!!document.querySelector('.menu-trigger')" },
    { name: 'Menu hidden initially', test: "!document.querySelector('.menu-dropdown')" },
    {
      name: 'Trigger button has text',
      test: "document.querySelector('.menu-trigger') && document.querySelector('.menu-trigger').textContent.includes('Actions')",
    },
  ],

  'react-accordion-menu': [
    {
      name: 'Accordion sections render',
      test: "document.querySelectorAll('.acc-section').length >= 3",
    },
    { name: 'Headers exist', test: "document.querySelectorAll('.acc-header').length >= 3" },
    { name: 'First section open', test: "document.querySelectorAll('.acc-body.open').length >= 1" },
    {
      name: 'Links exist in open section',
      test: "document.querySelectorAll('.acc-link').length >= 2",
    },
  ],

  'react-breadcrumbs': [
    { name: 'Breadcrumbs render', test: "!!document.querySelector('.breadcrumbs')" },
    { name: 'Crumb elements exist', test: "document.querySelectorAll('.crumb').length >= 2" },
    { name: 'Separators shown', test: "document.querySelectorAll('.separator').length >= 1" },
    { name: 'Current page indicated', test: "!!document.querySelector('.crumb.current')" },
    { name: 'Page title shown', test: "!!document.querySelector('.page-title')" },
  ],

  'react-navigation-tabs': [
    { name: 'Navigation tabs render', test: "!!document.querySelector('.nav-tabs')" },
    { name: 'Tab buttons exist', test: "document.querySelectorAll('.nav-tab').length >= 3" },
    { name: 'Active tab shown', test: "!!document.querySelector('.nav-tab.active')" },
    { name: 'View content rendered', test: "!!document.querySelector('.view')" },
  ],

  'react-module-tabs': [
    { name: 'Module cards render', test: "document.querySelectorAll('.module-card').length >= 3" },
    { name: 'Active module indicated', test: "!!document.querySelector('.module-card.active')" },
    { name: 'Content rendered', test: "!!document.querySelector('.content')" },
    {
      name: 'Content items shown',
      test: "document.querySelectorAll('.content .item').length >= 1",
    },
  ],

  'react-pagination': [
    { name: 'Items render', test: "document.querySelectorAll('.item').length >= 3" },
    { name: 'Pagination controls exist', test: "!!document.querySelector('.pagination')" },
    { name: 'Page buttons exist', test: "document.querySelectorAll('.page-btn').length >= 3" },
    { name: 'Active page indicated', test: "!!document.querySelector('.page-btn.active')" },
    { name: 'Page info shown', test: "!!document.querySelector('.page-info')" },
  ],

  'react-horizontal-dropdown': [
    {
      name: 'Navigation renders',
      test: "!!document.querySelector('.nav') || !!document.querySelector('nav')",
    },
    { name: 'Nav buttons exist', test: "document.querySelectorAll('.nav-btn').length >= 3" },
    { name: 'Dropdown hidden initially', test: "!document.querySelector('.dropdown')" },
    {
      name: 'Nav items contain menu labels',
      test: "document.querySelectorAll('.nav-item').length >= 3",
    },
  ],

  'react-vertical-dropdown': [
    { name: 'Sidebar renders', test: "!!document.querySelector('.sidebar')" },
    { name: 'Menu items exist', test: "document.querySelectorAll('.menu-btn').length >= 3" },
    {
      name: 'Submenu shown for active',
      test: "document.querySelectorAll('.submenu-item').length >= 2",
    },
    { name: 'Expand indicators exist', test: "document.querySelectorAll('.menu-btn').length >= 2" },
  ],

  'react-shortcut-dropdown': [
    { name: 'Trigger button renders', test: "!!document.querySelector('.trigger-btn')" },
    {
      name: 'Button has text',
      test: "document.querySelector('.trigger-btn') && document.querySelector('.trigger-btn').textContent.includes('Quick Actions')",
    },
    { name: 'Dropdown hidden initially', test: "!document.querySelector('.dropdown')" },
  ],

  'react-menus': [
    { name: 'Menu renders', test: "!!document.querySelector('.menu')" },
    { name: 'Menu items exist', test: "document.querySelectorAll('.menu-item').length >= 4" },
    { name: 'Divider exists', test: "!!document.querySelector('.divider')" },
    { name: 'Danger item exists', test: "!!document.querySelector('.menu-item.danger')" },
  ],

  'react-fat-footer': [
    {
      name: 'Footer renders',
      test: "!!document.querySelector('.footer') || !!document.querySelector('footer')",
    },
    { name: 'Footer columns exist', test: "document.querySelectorAll('.footer-col').length >= 3" },
    {
      name: 'Column headings shown',
      test: "document.querySelectorAll('.footer-col h3').length >= 3",
    },
    { name: 'Links exist', test: "document.querySelectorAll('.footer-col a').length >= 8" },
    { name: 'Bottom section exists', test: "!!document.querySelector('.footer-bottom')" },
  ],

  'react-home-link': [
    {
      name: 'Header renders',
      test: "!!document.querySelector('.header') || !!document.querySelector('header')",
    },
    { name: 'Home link exists', test: "!!document.querySelector('.home-link')" },
    { name: 'Logo shown', test: "!!document.querySelector('.logo')" },
    { name: 'Nav links exist', test: "document.querySelectorAll('.nav-link').length >= 2" },
  ],

  'react-jumping-hierarchy': [
    {
      name: 'Breadcrumb renders',
      test: "!!document.querySelector('.breadcrumb') || !!document.querySelector('nav')",
    },
    { name: 'Crumb elements exist', test: "document.querySelectorAll('.crumb').length >= 2" },
    { name: 'Level buttons exist', test: "document.querySelectorAll('.level-btn').length >= 2" },
    { name: 'Content shown', test: "!!document.querySelector('.content')" },
  ],

  'react-steps-left': [
    { name: 'Steps container renders', test: "!!document.querySelector('.steps-container')" },
    { name: 'Step dots exist', test: "document.querySelectorAll('.step-dot').length >= 3" },
    { name: 'Step content shown', test: "!!document.querySelector('.step-content')" },
    { name: 'Navigation buttons exist', test: "!!document.querySelector('.btn-next')" },
    { name: 'Steps remaining text shown', test: "!!document.querySelector('.steps-left-text')" },
  ],

  'react-adaptable-view': [
    { name: 'View container renders', test: "!!document.querySelector('.view-container')" },
    {
      name: 'View toggle buttons exist',
      test: "document.querySelectorAll('.view-toggles button').length >= 2",
    },
    {
      name: 'Active toggle indicated',
      test: "!!document.querySelector('.view-toggles button.active')",
    },
    {
      name: 'Items displayed',
      test: "document.querySelectorAll('.grid-card').length >= 4 || document.querySelectorAll('.list-row').length >= 4",
    },
  ],

  'react-preview': [
    { name: 'Preview container renders', test: "!!document.querySelector('.preview-container')" },
    { name: 'Card items exist', test: "document.querySelectorAll('.card-item').length >= 3" },
    { name: 'Card titles shown', test: "document.querySelectorAll('.card-title').length >= 3" },
    { name: 'Modal hidden initially', test: "!document.querySelector('.modal-overlay')" },
  ],

  'react-faq': [
    { name: 'FAQ container renders', test: "!!document.querySelector('.faq-container')" },
    { name: 'FAQ items exist', test: "document.querySelectorAll('.faq-item').length >= 4" },
    { name: 'Questions shown', test: "document.querySelectorAll('.faq-question').length >= 4" },
    { name: 'Search box exists', test: "!!document.querySelector('.search-box')" },
    {
      name: 'All answers collapsed initially',
      test: "document.querySelectorAll('.faq-answer.open').length <= 1",
    },
  ],

  // ──────────────────────────────────────────────
  // Advanced Features
  // ──────────────────────────────────────────────
  'react-keyboard-shortcuts': [
    {
      name: 'Shortcuts container renders',
      test: "!!document.querySelector('.shortcuts-container')",
    },
    { name: 'Shortcut rows exist', test: "document.querySelectorAll('.shortcut-row').length >= 4" },
    { name: 'Keyboard keys shown', test: "document.querySelectorAll('kbd').length >= 4" },
    { name: 'Last pressed area exists', test: "!!document.querySelector('.last-pressed')" },
  ],

  'react-rule-builder': [
    { name: 'Rule container renders', test: "!!document.querySelector('.rule-container')" },
    { name: 'Rule cards exist', test: "document.querySelectorAll('.rule-card').length >= 2" },
    { name: 'Logic toggle exists', test: "!!document.querySelector('.logic-toggle')" },
    { name: 'Add rule button exists', test: "!!document.querySelector('.add-rule-btn')" },
    { name: 'Output box shown', test: "!!document.querySelector('.output-box')" },
  ],

  'react-completeness-meter': [
    { name: 'Meter container renders', test: "!!document.querySelector('.meter-container')" },
    { name: 'Meter circle exists', test: "!!document.querySelector('.meter-circle')" },
    { name: 'Progress bar exists', test: "!!document.querySelector('.meter-bar-bg')" },
    { name: 'Checklist items exist', test: "document.querySelectorAll('.check-item').length >= 4" },
    {
      name: 'At least one item checked',
      test: "document.querySelectorAll('.checkbox.checked').length >= 1",
    },
  ],

  'react-favorites': [
    { name: 'Favorites container renders', test: "!!document.querySelector('.fav-container')" },
    {
      name: 'Tab buttons exist',
      test: "document.querySelectorAll('.fav-tabs button').length >= 2",
    },
    { name: 'Favorite items shown', test: "document.querySelectorAll('.fav-item').length >= 4" },
    { name: 'Star buttons exist', test: "document.querySelectorAll('.fav-star').length >= 4" },
  ],

  'react-tagging': [
    { name: 'Tagging container renders', test: "!!document.querySelector('.tagging-container')" },
    { name: 'Tag input wrapper exists', test: "!!document.querySelector('.tag-input-wrapper')" },
    { name: 'Tags displayed', test: "document.querySelectorAll('.tag').length >= 1" },
    { name: 'Tag input exists', test: "!!document.querySelector('.tag-input')" },
    { name: 'Tag count shown', test: "!!document.querySelector('.tag-count')" },
  ],

  'react-categorization': [
    { name: 'Category container renders', test: "!!document.querySelector('.cat-container')" },
    { name: 'Filter chips exist', test: "document.querySelectorAll('.cat-chip').length >= 4" },
    { name: 'Items displayed', test: "document.querySelectorAll('.cat-item').length >= 5" },
    { name: 'Active filter indicated', test: "!!document.querySelector('.cat-chip.active')" },
    { name: 'Item count shown', test: "!!document.querySelector('.count')" },
  ],

  'react-settings': [
    { name: 'Settings container renders', test: "!!document.querySelector('.settings-container')" },
    {
      name: 'Settings sections exist',
      test: "document.querySelectorAll('.settings-section').length >= 2",
    },
    { name: 'Toggle switches exist', test: "document.querySelectorAll('.toggle').length >= 2" },
    { name: 'Save button exists', test: "!!document.querySelector('.btn-save')" },
    {
      name: 'Section titles shown',
      test: "document.querySelectorAll('.section-title').length >= 2",
    },
  ],

  'react-archive': [
    { name: 'Archive container renders', test: "!!document.querySelector('.archive-container')" },
    { name: 'Tab bar exists', test: "!!document.querySelector('.tab-bar')" },
    { name: 'Items displayed', test: "document.querySelectorAll('.item-card').length >= 2" },
    {
      name: 'Archive buttons exist',
      test: "document.querySelectorAll('.archive-btn').length >= 2",
    },
  ],

  'react-notifications': [
    {
      name: 'Notification container renders',
      test: "!!document.querySelector('.notif-container')",
    },
    {
      name: 'Trigger buttons exist',
      test: "document.querySelectorAll('.notif-buttons button').length >= 4",
    },
    { name: 'No toasts initially', test: "document.querySelectorAll('.toast').length === 0" },
    {
      name: 'Button types correct',
      test: "!!document.querySelector('.btn-info') && !!document.querySelector('.btn-success')",
    },
  ],

  'react-captcha': [
    { name: 'Captcha container renders', test: "!!document.querySelector('.captcha-container')" },
    { name: 'Math problem shown', test: "!!document.querySelector('.math-problem')" },
    { name: 'Input field exists', test: "!!document.querySelector('.captcha-input')" },
    { name: 'Verify button exists', test: "!!document.querySelector('.verify-btn')" },
    { name: 'Refresh button exists', test: "!!document.querySelector('.refresh-btn')" },
  ],

  'react-inline-help': [
    { name: 'Help container renders', test: "!!document.querySelector('.help-container')" },
    { name: 'Field groups exist', test: "document.querySelectorAll('.field-group').length >= 3" },
    { name: 'Help icons exist', test: "document.querySelectorAll('.help-icon').length >= 3" },
    { name: 'Inline hints shown', test: "document.querySelectorAll('.inline-hint').length >= 3" },
  ],

  'react-good-defaults': [
    { name: 'Defaults container renders', test: "!!document.querySelector('.defaults-container')" },
    { name: 'Form fields exist', test: "document.querySelectorAll('.field').length >= 4" },
    {
      name: 'Input elements exist',
      test: "document.querySelectorAll('.field input, .field select').length >= 4",
    },
    { name: 'Hint texts shown', test: "document.querySelectorAll('.hint').length >= 2" },
    { name: 'Save button exists', test: "!!document.querySelector('.defaults-btn')" },
  ],

  // ──────────────────────────────────────────────
  // UI Components
  // ──────────────────────────────────────────────
  'react-image-upload': [
    { name: 'Upload container renders', test: "!!document.querySelector('.upload-container')" },
    { name: 'Dropzone exists', test: "!!document.querySelector('.dropzone')" },
    {
      name: 'Dropzone has text',
      test: "document.querySelector('.dropzone') && document.querySelector('.dropzone').textContent.length > 5",
    },
    {
      name: 'No previews initially',
      test: "document.querySelectorAll('.preview-item').length === 0",
    },
  ],

  'react-image-gallery': [
    { name: 'Gallery renders', test: "!!document.querySelector('.gallery')" },
    { name: 'Gallery grid exists', test: "!!document.querySelector('.gallery-grid')" },
    { name: 'Gallery items exist', test: "document.querySelectorAll('.gallery-item').length >= 5" },
    { name: 'Lightbox hidden initially', test: "!document.querySelector('.lightbox')" },
  ],

  'react-image-zoom': [
    { name: 'Zoom container renders', test: "!!document.querySelector('.zoom-container')" },
    { name: 'Zoom wrapper exists', test: "!!document.querySelector('.zoom-wrapper')" },
    { name: 'Zoom controls exist', test: "!!document.querySelector('.zoom-controls')" },
    {
      name: 'Zoom level shown',
      test: "!!document.querySelector('.zoom-level') && document.querySelector('.zoom-level').textContent.includes('100%')",
    },
  ],

  'react-slideshow': [
    { name: 'Slideshow renders', test: "!!document.querySelector('.slideshow')" },
    { name: 'Slide content shown', test: "!!document.querySelector('.slide')" },
    {
      name: 'Control buttons exist',
      test: "document.querySelectorAll('.controls button').length >= 2",
    },
    { name: 'Navigation dots exist', test: "document.querySelectorAll('.dot').length >= 3" },
    { name: 'Active dot indicated', test: "!!document.querySelector('.dot.active')" },
  ],

  'react-morphing-controls': [
    { name: 'Morph container renders', test: "!!document.querySelector('.morph-container')" },
    { name: 'Submit button exists', test: "!!document.querySelector('.morph-btn')" },
    { name: 'Toggle switch exists', test: "!!document.querySelector('.toggle-track')" },
    { name: 'Expand box exists', test: "!!document.querySelector('.expand-box')" },
    {
      name: 'Button text is Submit',
      test: "document.querySelector('.morph-btn') && document.querySelector('.morph-btn').textContent.trim() === 'Submit'",
    },
  ],

  'react-fill-blanks': [
    { name: 'Blanks container renders', test: "!!document.querySelector('.blanks-container')" },
    { name: 'Sentences displayed', test: "document.querySelectorAll('.sentence').length >= 3" },
    { name: 'Blank inputs exist', test: "document.querySelectorAll('.blank-input').length >= 3" },
    { name: 'Check button exists', test: "!!document.querySelector('.check-btn')" },
    { name: 'No score initially', test: "!document.querySelector('.score')" },
  ],
};
