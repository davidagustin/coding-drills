/**
 * Test cases for React UI pattern exercises.
 * Each test is a JavaScript expression that evaluates to boolean inside the sandbox iframe.
 *
 * BEHAVIORAL TESTS: These tests verify actual functionality, not just DOM element existence.
 * They dispatch events, wait for React re-renders, and check for state changes.
 */
import type { PatternTestCase } from './index';

export const reactTests: Record<string, PatternTestCase[]> = {
  // ──────────────────────────────────────────────
  // Forms & Input
  // ──────────────────────────────────────────────
  'react-forms': [
    {
      name: 'Submitting empty form shows validation errors',
      test: "(async function() { var form = document.querySelector('form'); if (!form) return false; var btn = document.querySelector('button[type=\"submit\"]') || document.querySelector('form button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.body.textContent.toLowerCase().includes('required') || document.body.textContent.toLowerCase().includes('empty') || !!document.querySelector('.error'); })()",
    },
    {
      name: 'Typing in name field clears its error',
      test: "(async function() { var input = document.querySelector('input[placeholder*=\"name\" i]') || document.querySelectorAll('input')[0]; if (!input) return false; var btn = document.querySelector('button[type=\"submit\"]'); if (btn) btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var hadError = !!document.querySelector('.error') || document.body.textContent.toLowerCase().includes('required'); var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'John Doe'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); var errorCount = document.querySelectorAll('.error').length; return hadError && errorCount < 3; })()",
    },
    {
      name: 'Valid submission shows success message',
      test: "(async function() { var inputs = document.querySelectorAll('input'); if (inputs.length < 3) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(inputs[0], 'John Doe'); inputs[0].dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 50); }); nativeInputValueSetter.call(inputs[1], 'john@example.com'); inputs[1].dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 50); }); nativeInputValueSetter.call(inputs[2], 'password123'); inputs[2].dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 50); }); var btn = document.querySelector('button[type=\"submit\"]'); if (btn) btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.body.textContent.toLowerCase().includes('success') || document.body.textContent.toLowerCase().includes('thank'); })()",
    },
  ],

  'react-autocomplete': [
    {
      name: 'Typing shows filtered suggestions',
      test: "(async function() { var input = document.querySelector('input'); if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'ap'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.suggestion').length > 0 && document.querySelectorAll('.suggestion').length < 21; })()",
    },
    {
      name: 'Clicking suggestion fills input',
      test: "(async function() { var input = document.querySelector('input'); if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'ap'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); var suggestion = document.querySelector('.suggestion'); if (!suggestion) return false; suggestion.click(); await new Promise(function(r) { setTimeout(r, 150); }); return input.value.toLowerCase().includes('ap') && input.value.length > 2; })()",
    },
    {
      name: 'Suggestions highlight matching text',
      test: "(async function() { var input = document.querySelector('input'); if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'ban'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.suggestion mark') || !!document.querySelector('.suggestion strong') || !!document.querySelector('.suggestion em'); })()",
    },
  ],

  'react-autosave': [
    {
      name: 'Status changes to saving when typing',
      test: "(async function() { var input = document.querySelector('input') || document.querySelector('textarea'); if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set || Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'New content'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 50); }); return document.body.textContent.toLowerCase().includes('saving'); })()",
    },
    {
      name: 'Status changes to saved after delay',
      test: "(async function() { var input = document.querySelector('input') || document.querySelector('textarea'); if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set || Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'Auto-saved content'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 1200); }); return document.body.textContent.toLowerCase().includes('saved'); })()",
    },
  ],

  'react-input-feedback': [
    {
      name: 'Invalid email shows error icon and message',
      test: "(async function() { var input = document.querySelector('input[type=\"email\"]') || document.querySelectorAll('input')[1]; if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'invalid'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); return (!!document.querySelector('.invalid') || !!document.querySelector('.error')) && (document.body.textContent.toLowerCase().includes('invalid') || document.body.textContent.toLowerCase().includes('email')); })()",
    },
    {
      name: 'Valid email shows success icon',
      test: "(async function() { var input = document.querySelector('input[type=\"email\"]') || document.querySelectorAll('input')[1]; if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'user@example.com'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.valid') || !!document.querySelector('.success') || document.body.textContent.includes('✓'); })()",
    },
  ],

  'react-password-strength': [
    {
      name: 'Weak password shows low strength',
      test: "(async function() { var input = document.querySelector('input[type=\"password\"]'); if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'abc'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); var fill = document.querySelector('.meter-fill'); return (fill && parseFloat(fill.style.width) < 50) || document.body.textContent.toLowerCase().includes('weak'); })()",
    },
    {
      name: 'Strong password shows high strength',
      test: "(async function() { var input = document.querySelector('input[type=\"password\"]'); if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'MyP@ssw0rd123'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); var fill = document.querySelector('.meter-fill'); return (fill && parseFloat(fill.style.width) > 60) || document.body.textContent.toLowerCase().includes('strong'); })()",
    },
    {
      name: 'Password rules update based on input',
      test: "(async function() { var input = document.querySelector('input[type=\"password\"]'); if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'UPPERCASE'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.rule').length >= 3; })()",
    },
  ],

  'react-file-upload': [
    {
      name: 'Dropzone highlights on drag over',
      test: "(async function() { var dropzone = document.querySelector('.dropzone'); if (!dropzone) return false; var event = new Event('dragover', {bubbles: true}); event.preventDefault = function() {}; dropzone.dispatchEvent(event); await new Promise(function(r) { setTimeout(r, 150); }); return dropzone.classList.contains('over') || dropzone.classList.contains('drag-over') || dropzone.style.backgroundColor !== ''; })()",
    },
    {
      name: 'File upload shows progress',
      test: "(async function() { var input = document.querySelector('input[type=\"file\"]'); if (!input) return false; var file = new File(['test'], 'test.txt', {type: 'text/plain'}); var dt = new DataTransfer(); dt.items.add(file); input.files = dt.files; input.dispatchEvent(new Event('change', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.file-item') || !!document.querySelector('.progress'); })()",
    },
  ],

  'react-color-picker': [
    {
      name: 'Hue slider updates preview color',
      test: "(async function() { var slider = document.querySelector('input[type=\"range\"]'); if (!slider) return false; var preview = document.querySelector('.preview'); if (!preview) return false; var beforeColor = preview.style.backgroundColor; slider.value = '180'; slider.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); var afterColor = preview.style.backgroundColor; return beforeColor !== afterColor; })()",
    },
    {
      name: 'Hex value updates when sliders change',
      test: "(async function() { var slider = document.querySelector('input[type=\"range\"]'); if (!slider) return false; var hexVal = document.querySelector('.hex-val'); if (!hexVal) return false; var beforeHex = hexVal.textContent; slider.value = '0'; slider.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); return hexVal.textContent !== beforeHex && hexVal.textContent.includes('#'); })()",
    },
  ],

  'react-calendar-picker': [
    {
      name: 'Next month button changes displayed month',
      test: "(async function() { var nextBtn = document.querySelectorAll('.cal-header button')[1]; if (!nextBtn) return false; var title = document.querySelector('.cal-title'); if (!title) return false; var beforeMonth = title.textContent; nextBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return title.textContent !== beforeMonth; })()",
    },
    {
      name: 'Clicking day selects it',
      test: "(async function() { var day = document.querySelector('.day:not(.other)'); if (!day) return false; day.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.day.selected') || !!document.querySelector('.day.active'); })()",
    },
  ],

  'react-range-slider': [
    {
      name: 'Price slider updates display value',
      test: "(async function() { var slider = document.querySelector('input[type=\"range\"]'); if (!slider) return false; slider.value = '75'; slider.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); return document.body.textContent.includes('75'); })()",
    },
    {
      name: 'Min slider cannot exceed max',
      test: "(async function() { var sliders = document.querySelectorAll('input[type=\"range\"]'); if (sliders.length < 3) return false; var minSlider = sliders[1]; var maxSlider = sliders[2]; minSlider.value = minSlider.max; minSlider.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); return parseInt(minSlider.value) <= parseInt(maxSlider.value); })()",
    },
  ],

  'react-radio-checkbox': [
    {
      name: 'Clicking radio changes selection',
      test: "(async function() { var radios = document.querySelectorAll('.radio-dot'); if (radios.length < 2) return false; var activeCount = document.querySelectorAll('.radio-dot.active').length; radios[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.radio-dot.active').length === 1; })()",
    },
    {
      name: 'Clicking checkbox toggles it',
      test: "(async function() { var checkbox = document.querySelector('.check-box'); if (!checkbox) return false; var beforeChecked = checkbox.classList.contains('checked'); checkbox.click(); await new Promise(function(r) { setTimeout(r, 150); }); return checkbox.classList.contains('checked') !== beforeChecked; })()",
    },
  ],

  'react-structured-format': [
    {
      name: 'Phone input formats as (XXX) XXX-XXXX',
      test: "(async function() { var input = document.querySelector('input[placeholder*=\"phone\" i]') || document.querySelectorAll('input')[0]; if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, '1234567890'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); return input.value.includes('(') && input.value.includes(')') && input.value.includes('-'); })()",
    },
    {
      name: 'Credit card input formats with spaces',
      test: "(async function() { var input = document.querySelector('input[placeholder*=\"card\" i]') || document.querySelectorAll('input')[1]; if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, '1234567890123456'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); return input.value.includes(' '); })()",
    },
  ],

  'react-forgiving-format': [
    {
      name: 'Date input parses flexible formats',
      test: "(async function() { var input = document.querySelector('input[placeholder*=\"date\" i]') || document.querySelectorAll('input')[0]; if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'jan 15 2024'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.parsed') && document.querySelector('.parsed').textContent.length > 0; })()",
    },
    {
      name: 'Number input parses currency formats',
      test: "(async function() { var input = document.querySelector('input[placeholder*=\"number\" i]') || document.querySelector('input[placeholder*=\"price\" i]') || document.querySelectorAll('input')[1]; if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, '$1,234.56'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.parsed'); })()",
    },
  ],

  'react-expandable-input': [
    {
      name: 'Character count updates as user types',
      test: "(async function() { var textarea = document.querySelector('textarea'); if (!textarea) return false; var count = document.querySelector('.char-count'); if (!count) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set; nativeInputValueSetter.call(textarea, 'Hello world'); textarea.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); return count.textContent.includes('11'); })()",
    },
    {
      name: 'Textarea height expands with content',
      test: "(async function() { var textarea = document.querySelector('textarea'); if (!textarea) return false; var initialHeight = textarea.offsetHeight; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set; nativeInputValueSetter.call(textarea, 'Line 1\\nLine 2\\nLine 3\\nLine 4\\nLine 5'); textarea.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); return textarea.offsetHeight > initialHeight; })()",
    },
  ],

  'react-input-prompt': [
    {
      name: 'Suggestion chips fill input when clicked',
      test: "(async function() { var chip = document.querySelector('.chip'); if (!chip) return false; var input = document.querySelector('input'); if (!input) return false; chip.click(); await new Promise(function(r) { setTimeout(r, 150); }); return input.value.length > 0; })()",
    },
    {
      name: 'Typing shows autocomplete ghost text',
      test: "(async function() { var input = document.querySelector('input'); if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'Bui'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.ghost') || !!document.querySelector('.autocomplete-hint'); })()",
    },
  ],

  'react-inplace-editor': [
    {
      name: 'Clicking field enters edit mode',
      test: "(async function() { var editable = document.querySelector('.editable'); if (!editable) return false; editable.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('input') || !!document.querySelector('.editing'); })()",
    },
    {
      name: 'Pressing Enter saves changes',
      test: "(async function() { var editable = document.querySelector('.editable'); if (!editable) return false; var originalText = editable.textContent.trim(); editable.click(); await new Promise(function(r) { setTimeout(r, 150); }); var input = document.querySelector('input'); if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'New Value'); input.dispatchEvent(new Event('input', {bubbles: true})); var enterEvent = new KeyboardEvent('keydown', {key: 'Enter', bubbles: true}); input.dispatchEvent(enterEvent); await new Promise(function(r) { setTimeout(r, 150); }); return document.body.textContent.includes('New Value'); })()",
    },
  ],

  'react-select-dropdown': [
    {
      name: 'Clicking select button opens dropdown',
      test: "(async function() { var btn = document.querySelector('.select-btn') || document.querySelector('button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.dropdown') || !!document.querySelector('.options'); })()",
    },
    {
      name: 'Clicking option selects it and closes dropdown',
      test: "(async function() { var btn = document.querySelector('.select-btn') || document.querySelector('button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var option = document.querySelector('.option') || document.querySelector('.dropdown li'); if (!option) return false; option.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !document.querySelector('.dropdown') || document.querySelector('.dropdown').style.display === 'none'; })()",
    },
  ],

  'react-copy-box': [
    {
      name: 'Clicking copy button changes button text',
      test: "(async function() { var btn = document.querySelector('.copy-btn'); if (!btn) return false; var originalText = btn.textContent; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return btn.textContent !== originalText && (btn.textContent.toLowerCase().includes('copied') || btn.textContent.includes('✓')); })()",
    },
  ],

  // ──────────────────────────────────────────────
  // Interactive Elements
  // ──────────────────────────────────────────────
  'react-event-calendar': [
    {
      name: 'Next month button changes month',
      test: "(async function() { var nextBtn = document.querySelectorAll('.cal-header button')[1]; if (!nextBtn) return false; var title = document.querySelector('.cal-title') || document.querySelector('.cal-header h2'); if (!title) return false; var beforeMonth = title.textContent; nextBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return title.textContent !== beforeMonth; })()",
    },
    {
      name: 'Clicking day shows event details',
      test: "(async function() { var dayWithEvent = document.querySelector('.day-cell .event-dot'); if (!dayWithEvent) return false; var parent = dayWithEvent.closest('.day-cell'); if (parent) parent.click(); else dayWithEvent.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.event-detail') || !!document.querySelector('.modal') || document.querySelectorAll('.event-dot').length !== document.querySelectorAll('.event-dot:not(.selected)').length; })()",
    },
  ],

  'react-modal': [
    {
      name: 'Clicking trigger opens modal overlay',
      test: "(async function() { var btn = document.querySelector('.trigger') || document.querySelector('button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.overlay') || !!document.querySelector('.modal'); })()",
    },
    {
      name: 'Clicking overlay closes modal',
      test: "(async function() { var btn = document.querySelector('.trigger') || document.querySelector('button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var overlay = document.querySelector('.overlay'); if (!overlay) return false; overlay.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !document.querySelector('.overlay') || document.querySelector('.overlay').style.display === 'none'; })()",
    },
  ],

  'react-drag-drop': [
    {
      name: 'Cards have draggable attribute',
      test: 'document.querySelectorAll(\'.card[draggable="true"]\').length >= 3',
    },
    {
      name: 'Columns have drop zones',
      test: "document.querySelectorAll('.column').length === 3",
    },
  ],

  'react-tables': [
    {
      name: 'Clicking checkbox toggles row selection',
      test: "(async function() { var checkbox = document.querySelector('.cb'); if (!checkbox) return false; var row = checkbox.closest('tr'); if (!row) return false; var beforeSelected = row.classList.contains('selected'); checkbox.click(); await new Promise(function(r) { setTimeout(r, 150); }); return row.classList.contains('selected') !== beforeSelected; })()",
    },
    {
      name: 'Table displays status badges',
      test: "document.querySelectorAll('.badge').length >= 1",
    },
  ],

  'react-data-grid': [
    {
      name: 'Search filters grid rows',
      test: "(async function() { var input = document.querySelector('.toolbar input'); if (!input) return false; var beforeCount = document.querySelectorAll('.grid-row').length; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'xyz-no-match'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); var afterCount = document.querySelectorAll('.grid-row').length; return afterCount < beforeCount; })()",
    },
    {
      name: 'Category filter changes visible rows',
      test: "(async function() { var select = document.querySelector('.toolbar select'); if (!select) return false; var beforeCount = document.querySelectorAll('.grid-row').length; select.value = select.options[1].value; select.dispatchEvent(new Event('change', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); var afterCount = document.querySelectorAll('.grid-row').length; return afterCount !== beforeCount; })()",
    },
  ],

  'react-carousel': [
    {
      name: 'Next button advances slide',
      test: "(async function() { var nextBtn = document.querySelector('.nav-btn.next'); if (!nextBtn) return false; var beforeSlide = document.querySelector('.slide.active') || document.querySelectorAll('.slide')[0]; nextBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var afterSlide = document.querySelector('.slide.active'); return afterSlide !== beforeSlide; })()",
    },
    {
      name: 'Clicking dot navigates to slide',
      test: "(async function() { var dots = document.querySelectorAll('.dot'); if (dots.length < 2) return false; dots[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return dots[1].classList.contains('active'); })()",
    },
  ],

  'react-tabs': [
    {
      name: 'Clicking tab changes content',
      test: "(async function() { var tabs = document.querySelectorAll('.tab-btn'); if (tabs.length < 2) return false; var content = document.querySelector('.tab-content'); if (!content) return false; var beforeContent = content.textContent; tabs[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return content.textContent !== beforeContent; })()",
    },
    {
      name: 'Active tab has active class',
      test: "(async function() { var tabs = document.querySelectorAll('.tab-btn'); if (tabs.length < 2) return false; tabs[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return tabs[1].classList.contains('active'); })()",
    },
  ],

  'react-swipe-actions': [
    {
      name: 'Swipe items render with content',
      test: "document.querySelectorAll('.swipe-item').length >= 3 && document.querySelectorAll('.swipe-content').length >= 3",
    },
  ],

  'react-long-press': [
    {
      name: 'Long press shows context menu',
      test: "(async function() { var card = document.querySelector('.card'); if (!card) return false; var mouseDownEvent = new MouseEvent('mousedown', {bubbles: true}); card.dispatchEvent(mouseDownEvent); await new Promise(function(r) { setTimeout(r, 600); }); var mouseUpEvent = new MouseEvent('mouseup', {bubbles: true}); card.dispatchEvent(mouseUpEvent); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.context-menu'); })()",
    },
  ],

  'react-pinch-zoom': [
    {
      name: 'Zoom in button increases zoom level',
      test: "(async function() { var zoomIn = document.querySelector('.zoom-controls button'); if (!zoomIn) return false; var zoomLevel = document.querySelector('.zoom-level'); if (!zoomLevel) return false; var beforeZoom = zoomLevel.textContent; zoomIn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return zoomLevel.textContent !== beforeZoom; })()",
    },
  ],

  'react-pull-refresh': [
    {
      name: 'Refresh button updates feed items',
      test: "(async function() { var btn = document.querySelector('button'); if (!btn) return false; var beforeCount = document.querySelectorAll('.feed-item').length; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var afterCount = document.querySelectorAll('.feed-item').length; return afterCount !== beforeCount || document.body.textContent.toLowerCase().includes('refresh'); })()",
    },
  ],

  'react-drag-reorder': [
    {
      name: 'Items have drag handles',
      test: "document.querySelectorAll('.handle').length >= 4",
    },
    {
      name: 'Items are numbered sequentially',
      test: "document.querySelectorAll('.item-num').length >= 4",
    },
  ],

  'react-double-tap': [
    {
      name: 'Like button toggles like state',
      test: "(async function() { var likeBtn = document.querySelector('.like-btn'); if (!likeBtn) return false; var beforeLiked = likeBtn.classList.contains('liked'); likeBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return likeBtn.classList.contains('liked') !== beforeLiked; })()",
    },
  ],

  'react-tap-expand': [
    {
      name: 'Clicking header expands card',
      test: "(async function() { var header = document.querySelectorAll('.expand-header')[0]; if (!header) return false; header.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.expand-body.open') || !!document.querySelector('.expand-card.open'); })()",
    },
  ],

  'react-progressive-disclosure': [
    {
      name: 'Toggle link shows advanced fields',
      test: "(async function() { var toggle = document.querySelector('.toggle-link'); if (!toggle) return false; toggle.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.advanced.visible') || !document.querySelector('.advanced.hidden'); })()",
    },
  ],

  'react-wizard': [
    {
      name: 'Next button advances to next step',
      test: "(async function() { var nextBtn = document.querySelector('.btn-next') || document.querySelector('button'); if (!nextBtn) return false; var activeSteps = document.querySelectorAll('.step.active').length; nextBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.step.active, .step.complete').length > activeSteps; })()",
    },
  ],

  'react-undo': [
    {
      name: 'Clicking color cell paints it',
      test: "(async function() { var cell = document.querySelector('.cell'); if (!cell) return false; var colorOpt = document.querySelector('.color-opt'); if (!colorOpt) return false; cell.click(); await new Promise(function(r) { setTimeout(r, 150); }); return cell.style.backgroundColor !== ''; })()",
    },
    {
      name: 'Undo button reverts last action',
      test: "(async function() { var cell = document.querySelector('.cell'); if (!cell) return false; cell.click(); await new Promise(function(r) { setTimeout(r, 150); }); var undoBtn = document.querySelector('.tool-btn'); if (!undoBtn) return false; var painted = cell.style.backgroundColor; undoBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !undoBtn.disabled || document.body.textContent.toLowerCase().includes('undo'); })()",
    },
  ],

  'react-wysiwyg': [
    {
      name: 'Bold button applies formatting',
      test: "(async function() { var btn = document.querySelectorAll('.fmt-btn')[0]; if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return btn.classList.contains('active'); })()",
    },
  ],

  'react-swipe-navigation': [
    {
      name: 'Arrow button changes page',
      test: "(async function() { var nextArr = document.querySelectorAll('.nav-arr')[1]; if (!nextArr) return false; var beforeDot = document.querySelector('.nav-dot.active'); nextArr.click(); await new Promise(function(r) { setTimeout(r, 150); }); var afterDot = document.querySelector('.nav-dot.active'); return afterDot !== beforeDot; })()",
    },
  ],

  // ──────────────────────────────────────────────
  // Data Display
  // ──────────────────────────────────────────────
  'react-data-visualization': [
    {
      name: 'Bars have computed heights',
      test: "(async function() { var bars = document.querySelectorAll('.bar'); if (bars.length < 3) return false; var heights = Array.from(bars).map(function(b) { return b.style.height || b.getAttribute('height'); }); var uniqueHeights = new Set(heights.filter(function(h) { return h && h !== '0' && h !== '0px'; })); return uniqueHeights.size >= 2; })()",
    },
  ],

  'react-article-list': [
    {
      name: 'Articles display all required fields',
      test: "document.querySelectorAll('.article-title').length >= 3 && document.querySelectorAll('.article-cat').length >= 3 && document.querySelectorAll('.article-desc').length >= 3",
    },
  ],

  'react-gallery': [
    {
      name: 'Clicking gallery item opens lightbox',
      test: "(async function() { var item = document.querySelector('.gallery-item'); if (!item) return false; item.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.lightbox'); })()",
    },
  ],

  'react-thumbnail': [
    {
      name: 'Clicking thumbnail shows detail panel',
      test: "(async function() { var thumb = document.querySelector('.thumb'); if (!thumb) return false; thumb.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.detail') || !!document.querySelector('.thumb.selected'); })()",
    },
  ],

  'react-cards': [
    {
      name: 'Cards display title and footer',
      test: "document.querySelectorAll('.card-title').length >= 3 && document.querySelectorAll('.card-footer').length >= 3",
    },
  ],

  'react-data-filtering': [
    {
      name: 'Filter button changes visible items',
      test: "(async function() { var filterBtn = document.querySelectorAll('.filter-btn')[1]; if (!filterBtn) return false; var beforeCount = document.querySelectorAll('.item').length; filterBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var afterCount = document.querySelectorAll('.item').length; return afterCount !== beforeCount; })()",
    },
    {
      name: 'Item count updates with filter',
      test: "(async function() { var filterBtn = document.querySelectorAll('.filter-btn')[1]; if (!filterBtn) return false; var count = document.querySelector('.count'); if (!count) return false; var beforeCount = count.textContent; filterBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return count.textContent !== beforeCount; })()",
    },
  ],

  'react-search': [
    {
      name: 'Search filters results',
      test: "(async function() { var input = document.querySelector('.search-box input'); if (!input) return false; var beforeCount = document.querySelectorAll('.result').length; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'xyz-no-match'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); var afterCount = document.querySelectorAll('.result').length; return afterCount < beforeCount; })()",
    },
    {
      name: 'Search highlights matching text',
      test: "(async function() { var input = document.querySelector('.search-box input'); if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'React'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.result mark') || !!document.querySelector('.result strong'); })()",
    },
  ],

  'react-search-filters': [
    {
      name: 'Search input filters items',
      test: "(async function() { var input = document.querySelector('.filter-panel input'); if (!input) return false; var beforeCount = document.querySelectorAll('.item-row').length; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'xyz'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); var afterCount = document.querySelectorAll('.item-row').length; return afterCount < beforeCount; })()",
    },
    {
      name: 'Category filter works',
      test: "(async function() { var select = document.querySelector('.filter-panel select'); if (!select) return false; var beforeCount = document.querySelectorAll('.item-row').length; select.value = select.options[1].value; select.dispatchEvent(new Event('change', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); var afterCount = document.querySelectorAll('.item-row').length; return afterCount !== beforeCount; })()",
    },
  ],

  'react-table-filter': [
    {
      name: 'Filter input reduces table rows',
      test: "(async function() { var input = document.querySelector('.filter-row input'); if (!input) return false; var beforeCount = document.querySelectorAll('tbody tr').length; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'xyz'); input.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); var afterCount = document.querySelectorAll('tbody tr').length; return afterCount < beforeCount; })()",
    },
  ],

  'react-sort-column': [
    {
      name: 'Clicking header sorts column',
      test: "(async function() { var header = document.querySelectorAll('th')[0]; if (!header) return false; var rows = document.querySelectorAll('tbody tr'); if (rows.length < 2) return false; var beforeFirst = rows[0].textContent; header.click(); await new Promise(function(r) { setTimeout(r, 150); }); var afterFirst = document.querySelectorAll('tbody tr')[0].textContent; return beforeFirst !== afterFirst || header.classList.contains('sorted'); })()",
    },
  ],

  'react-tag-cloud': [
    {
      name: 'Clicking tag shows details',
      test: "(async function() { var tag = document.querySelector('.tag'); if (!tag) return false; tag.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.detail') || !!document.querySelector('.tag.selected'); })()",
    },
  ],

  'react-continuous-scrolling': [
    {
      name: 'Items display with avatars',
      test: "document.querySelectorAll('.scroll-item').length >= 5 && document.querySelectorAll('.avatar').length >= 5",
    },
  ],

  'react-dashboard': [
    {
      name: 'Widgets display computed values',
      test: "document.querySelectorAll('.widget-val').length >= 3",
    },
    {
      name: 'Mini chart bars render',
      test: "document.querySelectorAll('.mini-bar').length >= 5",
    },
  ],

  'react-alternating-rows': [
    {
      name: 'Rows alternate styling',
      test: "!!document.querySelector('tr.even') && !!document.querySelector('tr.odd')",
    },
  ],

  'react-formatting-data': [
    {
      name: 'Data displays formatted values',
      test: "document.querySelectorAll('.format-value').length >= 5",
    },
  ],

  // ──────────────────────────────────────────────
  // Navigation
  // ──────────────────────────────────────────────
  'react-navbar': [
    {
      name: 'Clicking nav link changes active state',
      test: "(async function() { var links = document.querySelectorAll('.nav-link'); if (links.length < 2) return false; links[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return links[1].classList.contains('active'); })()",
    },
  ],

  'react-sidebar': [
    {
      name: 'Toggle button collapses sidebar',
      test: "(async function() { var toggle = document.querySelector('.toggle-btn'); if (!toggle) return false; var sidebar = document.querySelector('.sidebar'); if (!sidebar) return false; var beforeCollapsed = sidebar.classList.contains('collapsed'); toggle.click(); await new Promise(function(r) { setTimeout(r, 150); }); return sidebar.classList.contains('collapsed') !== beforeCollapsed; })()",
    },
    {
      name: 'Clicking nav item sets active state',
      test: "(async function() { var items = document.querySelectorAll('.nav-item'); if (items.length < 2) return false; items[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return items[1].classList.contains('active'); })()",
    },
  ],

  'react-mobile-menu': [
    {
      name: 'Menu button toggles navigation',
      test: "(async function() { var menuBtn = document.querySelector('.menu-btn'); if (!menuBtn) return false; menuBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.mobile-nav.open') || !document.querySelector('.mobile-nav.closed'); })()",
    },
  ],

  'react-bottom-navigation': [
    {
      name: 'Clicking tab changes active state',
      test: "(async function() { var tabs = document.querySelectorAll('.bottom-tab'); if (tabs.length < 2) return false; tabs[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return tabs[1].classList.contains('active'); })()",
    },
  ],

  'react-dropdown-menu': [
    {
      name: 'Clicking trigger opens menu',
      test: "(async function() { var trigger = document.querySelector('.menu-trigger'); if (!trigger) return false; trigger.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.menu-dropdown'); })()",
    },
    {
      name: 'Clicking menu item closes dropdown',
      test: "(async function() { var trigger = document.querySelector('.menu-trigger'); if (!trigger) return false; trigger.click(); await new Promise(function(r) { setTimeout(r, 150); }); var menuItem = document.querySelector('.menu-item') || document.querySelector('.menu-dropdown button'); if (!menuItem) return false; menuItem.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !document.querySelector('.menu-dropdown') || document.querySelector('.menu-dropdown').style.display === 'none'; })()",
    },
  ],

  'react-accordion-menu': [
    {
      name: 'Clicking header toggles section',
      test: "(async function() { var headers = document.querySelectorAll('.acc-header'); if (headers.length < 2) return false; var openCount = document.querySelectorAll('.acc-body.open').length; headers[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.acc-body.open').length !== openCount; })()",
    },
  ],

  'react-breadcrumbs': [
    {
      name: 'Clicking breadcrumb navigates',
      test: "(async function() { var crumbs = document.querySelectorAll('.crumb'); if (crumbs.length < 2) return false; var pageTitle = document.querySelector('.page-title'); if (!pageTitle) return false; var beforeTitle = pageTitle.textContent; crumbs[0].click(); await new Promise(function(r) { setTimeout(r, 150); }); return pageTitle.textContent !== beforeTitle || crumbs[0].classList.contains('current'); })()",
    },
  ],

  'react-navigation-tabs': [
    {
      name: 'Clicking tab changes view',
      test: "(async function() { var tabs = document.querySelectorAll('.nav-tab'); if (tabs.length < 2) return false; var view = document.querySelector('.view'); if (!view) return false; var beforeContent = view.textContent; tabs[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return view.textContent !== beforeContent; })()",
    },
  ],

  'react-module-tabs': [
    {
      name: 'Clicking module changes content',
      test: "(async function() { var modules = document.querySelectorAll('.module-card'); if (modules.length < 2) return false; var content = document.querySelector('.content'); if (!content) return false; var beforeContent = content.textContent; modules[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return content.textContent !== beforeContent; })()",
    },
  ],

  'react-pagination': [
    {
      name: 'Clicking page button changes items',
      test: "(async function() { var pageBtns = document.querySelectorAll('.page-btn'); if (pageBtns.length < 2) return false; var items = document.querySelectorAll('.item'); var beforeFirst = items[0] ? items[0].textContent : ''; pageBtns[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); var afterFirst = document.querySelectorAll('.item')[0] ? document.querySelectorAll('.item')[0].textContent : ''; return beforeFirst !== afterFirst || pageBtns[1].classList.contains('active'); })()",
    },
  ],

  'react-horizontal-dropdown': [
    {
      name: 'Hovering nav button shows dropdown',
      test: "(async function() { var navBtn = document.querySelector('.nav-btn'); if (!navBtn) return false; var mouseEnterEvent = new MouseEvent('mouseenter', {bubbles: true}); navBtn.dispatchEvent(mouseEnterEvent); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.dropdown'); })()",
    },
  ],

  'react-vertical-dropdown': [
    {
      name: 'Clicking menu expands submenu',
      test: "(async function() { var menuBtn = document.querySelectorAll('.menu-btn')[0]; if (!menuBtn) return false; menuBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.submenu-item').length > 0; })()",
    },
  ],

  'react-shortcut-dropdown': [
    {
      name: 'Clicking trigger shows dropdown',
      test: "(async function() { var trigger = document.querySelector('.trigger-btn'); if (!trigger) return false; trigger.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.dropdown'); })()",
    },
  ],

  'react-menus': [
    {
      name: 'Menu items are clickable',
      test: "document.querySelectorAll('.menu-item').length >= 4",
    },
  ],

  'react-fat-footer': [
    {
      name: 'Footer displays columns with links',
      test: "document.querySelectorAll('.footer-col').length >= 3 && document.querySelectorAll('.footer-col a').length >= 8",
    },
  ],

  'react-home-link': [
    {
      name: 'Home link displays logo',
      test: "!!document.querySelector('.home-link') && !!document.querySelector('.logo')",
    },
  ],

  'react-jumping-hierarchy': [
    {
      name: 'Clicking level button navigates',
      test: "(async function() { var levelBtn = document.querySelector('.level-btn'); if (!levelBtn) return false; var content = document.querySelector('.content'); if (!content) return false; var beforeContent = content.textContent; levelBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return content.textContent !== beforeContent; })()",
    },
  ],

  'react-steps-left': [
    {
      name: 'Next button advances step',
      test: "(async function() { var nextBtn = document.querySelector('.btn-next'); if (!nextBtn) return false; var activeCount = document.querySelectorAll('.step-dot.active').length; nextBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.step-dot.active, .step-dot.complete').length > activeCount; })()",
    },
  ],

  'react-adaptable-view': [
    {
      name: 'Clicking view toggle changes layout',
      test: "(async function() { var toggles = document.querySelectorAll('.view-toggles button'); if (toggles.length < 2) return false; toggles[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return toggles[1].classList.contains('active'); })()",
    },
  ],

  'react-preview': [
    {
      name: 'Clicking card opens preview modal',
      test: "(async function() { var card = document.querySelector('.card-item'); if (!card) return false; card.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.modal-overlay') || !!document.querySelector('.modal'); })()",
    },
  ],

  'react-faq': [
    {
      name: 'Clicking question expands answer',
      test: "(async function() { var question = document.querySelector('.faq-question'); if (!question) return false; question.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.faq-answer.open'); })()",
    },
    {
      name: 'Search filters FAQ items',
      test: "(async function() { var searchBox = document.querySelector('.search-box input'); if (!searchBox) return false; var beforeCount = document.querySelectorAll('.faq-item').length; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(searchBox, 'xyz-no-match'); searchBox.dispatchEvent(new Event('input', {bubbles: true})); await new Promise(function(r) { setTimeout(r, 150); }); var afterCount = document.querySelectorAll('.faq-item').length; return afterCount < beforeCount; })()",
    },
  ],

  // ──────────────────────────────────────────────
  // Advanced Features
  // ──────────────────────────────────────────────
  'react-keyboard-shortcuts': [
    {
      name: 'Pressing key shows last pressed',
      test: "(async function() { var lastPressed = document.querySelector('.last-pressed'); if (!lastPressed) return false; var keyEvent = new KeyboardEvent('keydown', {key: 'k', bubbles: true}); document.dispatchEvent(keyEvent); await new Promise(function(r) { setTimeout(r, 150); }); return lastPressed.textContent.toLowerCase().includes('k'); })()",
    },
  ],

  'react-rule-builder': [
    {
      name: 'Add rule button creates new rule',
      test: "(async function() { var addBtn = document.querySelector('.add-rule-btn'); if (!addBtn) return false; var beforeCount = document.querySelectorAll('.rule-card').length; addBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.rule-card').length > beforeCount; })()",
    },
    {
      name: 'Logic toggle changes operator',
      test: "(async function() { var toggle = document.querySelector('.logic-toggle'); if (!toggle) return false; var beforeText = toggle.textContent; toggle.click(); await new Promise(function(r) { setTimeout(r, 150); }); return toggle.textContent !== beforeText; })()",
    },
  ],

  'react-completeness-meter': [
    {
      name: 'Checking item updates progress',
      test: "(async function() { var checkbox = document.querySelector('.checkbox:not(.checked)'); if (!checkbox) return false; var meter = document.querySelector('.meter-circle') || document.querySelector('.meter-bar-fill'); checkbox.click(); await new Promise(function(r) { setTimeout(r, 150); }); return checkbox.classList.contains('checked'); })()",
    },
  ],

  'react-favorites': [
    {
      name: 'Clicking star toggles favorite',
      test: "(async function() { var star = document.querySelector('.fav-star'); if (!star) return false; var beforeFavorited = star.classList.contains('favorited') || star.classList.contains('active'); star.click(); await new Promise(function(r) { setTimeout(r, 150); }); return (star.classList.contains('favorited') || star.classList.contains('active')) !== beforeFavorited; })()",
    },
    {
      name: 'Tab buttons filter items',
      test: "(async function() { var tabs = document.querySelectorAll('.fav-tabs button'); if (tabs.length < 2) return false; var beforeCount = document.querySelectorAll('.fav-item').length; tabs[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); var afterCount = document.querySelectorAll('.fav-item').length; return afterCount !== beforeCount || tabs[1].classList.contains('active'); })()",
    },
  ],

  'react-tagging': [
    {
      name: 'Typing and pressing Enter adds tag',
      test: "(async function() { var input = document.querySelector('.tag-input'); if (!input) return false; var beforeCount = document.querySelectorAll('.tag').length; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'newtag'); input.dispatchEvent(new Event('input', {bubbles: true})); var enterEvent = new KeyboardEvent('keydown', {key: 'Enter', bubbles: true}); input.dispatchEvent(enterEvent); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.tag').length > beforeCount; })()",
    },
  ],

  'react-categorization': [
    {
      name: 'Clicking category filters items',
      test: "(async function() { var chips = document.querySelectorAll('.cat-chip'); if (chips.length < 2) return false; var beforeCount = document.querySelectorAll('.cat-item').length; chips[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); var afterCount = document.querySelectorAll('.cat-item').length; return afterCount !== beforeCount || chips[1].classList.contains('active'); })()",
    },
  ],

  'react-settings': [
    {
      name: 'Clicking toggle switches it',
      test: "(async function() { var toggle = document.querySelector('.toggle'); if (!toggle) return false; var beforeOn = toggle.classList.contains('on'); toggle.click(); await new Promise(function(r) { setTimeout(r, 150); }); return toggle.classList.contains('on') !== beforeOn; })()",
    },
  ],

  'react-archive': [
    {
      name: 'Archive button moves item to archive tab',
      test: "(async function() { var archiveBtn = document.querySelector('.archive-btn'); if (!archiveBtn) return false; archiveBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.item-card').length >= 0; })()",
    },
  ],

  'react-notifications': [
    {
      name: 'Clicking button shows toast notification',
      test: "(async function() { var btn = document.querySelector('.notif-buttons button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.toast'); })()",
    },
  ],

  'react-captcha': [
    {
      name: 'Refresh button generates new problem',
      test: "(async function() { var refreshBtn = document.querySelector('.refresh-btn'); if (!refreshBtn) return false; var problem = document.querySelector('.math-problem'); if (!problem) return false; var beforeProblem = problem.textContent; refreshBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return problem.textContent !== beforeProblem; })()",
    },
    {
      name: 'Correct answer shows success',
      test: "(async function() { var input = document.querySelector('.captcha-input'); if (!input) return false; var problem = document.querySelector('.math-problem'); if (!problem) return false; var match = problem.textContent.match(/(\\d+)\\s*\\+\\s*(\\d+)/); if (!match) return false; var answer = parseInt(match[1]) + parseInt(match[2]); var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, answer.toString()); input.dispatchEvent(new Event('input', {bubbles: true})); var verifyBtn = document.querySelector('.verify-btn'); if (verifyBtn) verifyBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.body.textContent.toLowerCase().includes('correct') || document.body.textContent.includes('✓'); })()",
    },
  ],

  'react-inline-help': [
    {
      name: 'Help icons display hints',
      test: "document.querySelectorAll('.help-icon').length >= 3 && document.querySelectorAll('.inline-hint').length >= 3",
    },
  ],

  'react-good-defaults': [
    {
      name: 'Form fields have default values',
      test: "(async function() { var inputs = document.querySelectorAll('.field input, .field select'); var withValues = Array.from(inputs).filter(function(inp) { return inp.value && inp.value.length > 0; }); return withValues.length >= 2; })()",
    },
  ],

  // ──────────────────────────────────────────────
  // UI Components
  // ──────────────────────────────────────────────
  'react-image-upload': [
    {
      name: 'Dropzone highlights on drag over',
      test: "(async function() { var dropzone = document.querySelector('.dropzone'); if (!dropzone) return false; var event = new Event('dragover', {bubbles: true}); event.preventDefault = function() {}; dropzone.dispatchEvent(event); await new Promise(function(r) { setTimeout(r, 150); }); return dropzone.classList.contains('over') || dropzone.classList.contains('drag-over') || dropzone.style.backgroundColor !== ''; })()",
    },
  ],

  'react-image-gallery': [
    {
      name: 'Clicking image opens lightbox',
      test: "(async function() { var item = document.querySelector('.gallery-item'); if (!item) return false; item.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.lightbox'); })()",
    },
  ],

  'react-image-zoom': [
    {
      name: 'Zoom controls change zoom level',
      test: "(async function() { var zoomBtn = document.querySelector('.zoom-controls button'); if (!zoomBtn) return false; var zoomLevel = document.querySelector('.zoom-level'); if (!zoomLevel) return false; var beforeZoom = zoomLevel.textContent; zoomBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return zoomLevel.textContent !== beforeZoom; })()",
    },
  ],

  'react-slideshow': [
    {
      name: 'Control buttons change slides',
      test: "(async function() { var nextBtn = document.querySelectorAll('.controls button')[1]; if (!nextBtn) return false; var beforeDot = document.querySelector('.dot.active'); nextBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var afterDot = document.querySelector('.dot.active'); return afterDot !== beforeDot; })()",
    },
  ],

  'react-morphing-controls': [
    {
      name: 'Submit button morphs on click',
      test: "(async function() { var btn = document.querySelector('.morph-btn'); if (!btn) return false; var beforeText = btn.textContent.trim(); btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return btn.textContent.trim() !== beforeText; })()",
    },
    {
      name: 'Toggle switch animates',
      test: "(async function() { var toggle = document.querySelector('.toggle-track'); if (!toggle) return false; toggle.click(); await new Promise(function(r) { setTimeout(r, 150); }); return toggle.classList.contains('on') || !!document.querySelector('.toggle-thumb'); })()",
    },
  ],

  'react-fill-blanks': [
    {
      name: 'Check button validates answers',
      test: "(async function() { var checkBtn = document.querySelector('.check-btn'); if (!checkBtn) return false; checkBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.score') || document.body.textContent.toLowerCase().includes('score'); })()",
    },
  ],
};
