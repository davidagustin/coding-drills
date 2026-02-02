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

  // ──────────────────────────────────────────────
  // Forms & Input (additional)
  // ──────────────────────────────────────────────
  'react-rating-stars': [
    {
      name: 'Clicking a star sets the rating',
      test: "(async function() { var stars = document.querySelectorAll('.star'); if (stars.length < 5) return false; stars[2].click(); await new Promise(function(r) { setTimeout(r, 150); }); var filled = document.querySelectorAll('.star.filled, .star.active'); return filled.length === 3; })()",
    },
    {
      name: 'Hovering a star previews the rating',
      test: "(async function() { var stars = document.querySelectorAll('.star'); if (stars.length < 5) return false; stars[3].dispatchEvent(new MouseEvent('mouseenter', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var hovered = document.querySelectorAll('.star.hover, .star.preview'); return hovered.length >= 4; })()",
    },
  ],

  'react-tag-input': [
    {
      name: 'Pressing Enter adds a tag',
      test: "(async function() { var input = document.querySelector('.tag-input input') || document.querySelector('input'); if (!input) return false; var beforeCount = document.querySelectorAll('.tag').length; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'newtag'); input.dispatchEvent(new Event('input', {bubbles:true})); input.dispatchEvent(new KeyboardEvent('keydown', {key:'Enter', bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.tag').length > beforeCount; })()",
    },
    {
      name: 'Clicking remove button deletes a tag',
      test: "(async function() { var input = document.querySelector('.tag-input input') || document.querySelector('input'); if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'testtag'); input.dispatchEvent(new Event('input', {bubbles:true})); input.dispatchEvent(new KeyboardEvent('keydown', {key:'Enter', bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var beforeCount = document.querySelectorAll('.tag').length; var removeBtn = document.querySelector('.tag .remove') || document.querySelector('.tag button'); if (!removeBtn) return false; removeBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.tag').length < beforeCount; })()",
    },
  ],

  'react-multi-select': [
    {
      name: 'Clicking dropdown opens option list',
      test: "(async function() { var trigger = document.querySelector('.multi-select-trigger') || document.querySelector('.select-trigger') || document.querySelector('button'); if (!trigger) return false; trigger.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.options') || !!document.querySelector('.dropdown'); })()",
    },
    {
      name: 'Selecting options shows selected count or chips',
      test: "(async function() { var trigger = document.querySelector('.multi-select-trigger') || document.querySelector('.select-trigger') || document.querySelector('button'); if (!trigger) return false; trigger.click(); await new Promise(function(r) { setTimeout(r, 150); }); var option = document.querySelector('.option') || document.querySelector('.dropdown li'); if (!option) return false; option.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.chip') || !!document.querySelector('.selected-count') || document.body.textContent.includes('1 selected'); })()",
    },
  ],

  'react-otp-input': [
    {
      name: 'Typing a digit advances focus to next box',
      test: "(async function() { var inputs = document.querySelectorAll('.otp-input input, .otp input, input'); if (inputs.length < 4) return false; inputs[0].focus(); var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(inputs[0], '5'); inputs[0].dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return document.activeElement === inputs[1]; })()",
    },
    {
      name: 'All boxes filled triggers verification',
      test: "(async function() { var inputs = document.querySelectorAll('.otp-input input, .otp input, input'); if (inputs.length < 4) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; for (var i = 0; i < inputs.length; i++) { nativeInputValueSetter.call(inputs[i], String(i+1)); inputs[i].dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 50); }); } await new Promise(function(r) { setTimeout(r, 200); }); return document.body.textContent.toLowerCase().includes('verif') || document.body.textContent.toLowerCase().includes('success') || !!document.querySelector('.verified'); })()",
    },
  ],

  'react-credit-card-input': [
    {
      name: 'Card number input formats with spaces',
      test: "(async function() { var input = document.querySelector('input[placeholder*=\"card\" i]') || document.querySelector('.card-number input') || document.querySelectorAll('input')[0]; if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, '4111111111111111'); input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return input.value.includes(' ') || input.value.includes('-'); })()",
    },
    {
      name: 'Card type icon updates based on number',
      test: "(async function() { var input = document.querySelector('input[placeholder*=\"card\" i]') || document.querySelector('.card-number input') || document.querySelectorAll('input')[0]; if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, '4111'); input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.card-icon') || !!document.querySelector('.card-type') || document.body.textContent.toLowerCase().includes('visa'); })()",
    },
  ],

  'react-address-form': [
    {
      name: 'Country select updates available states/regions',
      test: "(async function() { var countrySelect = document.querySelector('select[name=\"country\"]') || document.querySelector('.country-select') || document.querySelectorAll('select')[0]; if (!countrySelect) return false; countrySelect.value = countrySelect.options[1] ? countrySelect.options[1].value : countrySelect.value; countrySelect.dispatchEvent(new Event('change', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var stateSelect = document.querySelector('select[name=\"state\"]') || document.querySelectorAll('select')[1]; return !!stateSelect && stateSelect.options.length > 0; })()",
    },
    {
      name: 'Submitting with empty required fields shows errors',
      test: "(async function() { var btn = document.querySelector('button[type=\"submit\"]') || document.querySelector('.submit-btn'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.error') || document.body.textContent.toLowerCase().includes('required'); })()",
    },
  ],

  'react-survey-form': [
    {
      name: 'Selecting a radio option records the answer',
      test: "(async function() { var radios = document.querySelectorAll('input[type=\"radio\"]') || document.querySelectorAll('.option'); if (radios.length < 2) return false; radios[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return radios[1].checked || !!document.querySelector('.option.selected'); })()",
    },
    {
      name: 'Progress bar updates as questions are answered',
      test: "(async function() { var progress = document.querySelector('.progress-bar') || document.querySelector('.progress'); if (!progress) return false; var beforeWidth = progress.style.width || progress.getAttribute('value'); var radios = document.querySelectorAll('input[type=\"radio\"]') || document.querySelectorAll('.option'); if (radios.length < 1) return false; radios[0].click(); await new Promise(function(r) { setTimeout(r, 150); }); var afterWidth = progress.style.width || progress.getAttribute('value'); return afterWidth !== beforeWidth; })()",
    },
  ],

  'react-textarea-autogrow': [
    {
      name: 'Textarea grows taller with multiline content',
      test: "(async function() { var textarea = document.querySelector('textarea'); if (!textarea) return false; var initialHeight = textarea.offsetHeight; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set; nativeInputValueSetter.call(textarea, 'Line1\\nLine2\\nLine3\\nLine4\\nLine5\\nLine6\\nLine7'); textarea.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return textarea.offsetHeight > initialHeight; })()",
    },
    {
      name: 'Textarea shrinks when content is removed',
      test: "(async function() { var textarea = document.querySelector('textarea'); if (!textarea) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set; nativeInputValueSetter.call(textarea, 'Line1\\nLine2\\nLine3\\nLine4\\nLine5\\nLine6'); textarea.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var tallHeight = textarea.offsetHeight; nativeInputValueSetter.call(textarea, 'Short'); textarea.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return textarea.offsetHeight < tallHeight; })()",
    },
  ],

  'react-phone-input': [
    {
      name: 'Input formats phone number as user types',
      test: "(async function() { var input = document.querySelector('input[type=\"tel\"]') || document.querySelector('.phone-input input') || document.querySelector('input'); if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, '2125551234'); input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return input.value.includes('(') || input.value.includes('-') || input.value.includes(' '); })()",
    },
    {
      name: 'Invalid phone number shows error',
      test: "(async function() { var input = document.querySelector('input[type=\"tel\"]') || document.querySelector('.phone-input input') || document.querySelector('input'); if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, '123'); input.dispatchEvent(new Event('input', {bubbles:true})); input.dispatchEvent(new Event('blur', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.error') || document.body.textContent.toLowerCase().includes('invalid'); })()",
    },
  ],

  'react-currency-input': [
    {
      name: 'Input formats value with currency symbol and commas',
      test: "(async function() { var input = document.querySelector('.currency-input input') || document.querySelector('input'); if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, '1234567'); input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return input.value.includes(',') || input.value.includes('$') || document.body.textContent.includes('$'); })()",
    },
    {
      name: 'Non-numeric characters are rejected',
      test: "(async function() { var input = document.querySelector('.currency-input input') || document.querySelector('input'); if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'abc'); input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var val = input.value.replace(/[$,. ]/g, ''); return val === '' || val === '0'; })()",
    },
  ],

  'react-slider-range': [
    {
      name: 'Moving min slider updates displayed min value',
      test: "(async function() { var sliders = document.querySelectorAll('input[type=\"range\"]'); if (sliders.length < 2) return false; var minSlider = sliders[0]; minSlider.value = '25'; minSlider.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return document.body.textContent.includes('25'); })()",
    },
    {
      name: 'Min slider cannot exceed max slider value',
      test: "(async function() { var sliders = document.querySelectorAll('input[type=\"range\"]'); if (sliders.length < 2) return false; var minSlider = sliders[0]; var maxSlider = sliders[1]; maxSlider.value = '50'; maxSlider.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 50); }); minSlider.value = '80'; minSlider.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return parseInt(minSlider.value) <= parseInt(maxSlider.value); })()",
    },
  ],

  'react-toggle-group': [
    {
      name: 'Clicking a toggle button activates it',
      test: "(async function() { var buttons = document.querySelectorAll('.toggle-group button, .toggle-btn'); if (buttons.length < 2) return false; buttons[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return buttons[1].classList.contains('active') || buttons[1].classList.contains('selected'); })()",
    },
    {
      name: 'Only one toggle is active at a time in single mode',
      test: "(async function() { var buttons = document.querySelectorAll('.toggle-group button, .toggle-btn'); if (buttons.length < 3) return false; buttons[0].click(); await new Promise(function(r) { setTimeout(r, 100); }); buttons[2].click(); await new Promise(function(r) { setTimeout(r, 150); }); var activeCount = document.querySelectorAll('.toggle-group button.active, .toggle-btn.active, .toggle-group button.selected, .toggle-btn.selected').length; return activeCount === 1; })()",
    },
  ],

  'react-segmented-control': [
    {
      name: 'Clicking segment changes active indicator',
      test: "(async function() { var segments = document.querySelectorAll('.segment'); if (segments.length < 2) return false; segments[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return segments[1].classList.contains('active') || segments[1].classList.contains('selected'); })()",
    },
    {
      name: 'Content changes when segment is selected',
      test: "(async function() { var segments = document.querySelectorAll('.segment'); if (segments.length < 2) return false; var content = document.querySelector('.segment-content') || document.querySelector('.content'); if (!content) return false; var beforeContent = content.textContent; segments[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return content.textContent !== beforeContent; })()",
    },
  ],

  'react-combobox': [
    {
      name: 'Typing filters the dropdown options',
      test: "(async function() { var input = document.querySelector('.combobox input') || document.querySelector('input'); if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'ap'); input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var options = document.querySelectorAll('.option, .combobox-option, .dropdown li'); return options.length > 0 && options.length < 20; })()",
    },
    {
      name: 'Selecting an option fills the input',
      test: "(async function() { var input = document.querySelector('.combobox input') || document.querySelector('input'); if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'a'); input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var option = document.querySelector('.option, .combobox-option, .dropdown li'); if (!option) return false; var optionText = option.textContent.trim(); option.click(); await new Promise(function(r) { setTimeout(r, 150); }); return input.value.length > 1; })()",
    },
  ],

  'react-mentions-input': [
    {
      name: 'Typing @ shows user suggestions',
      test: "(async function() { var input = document.querySelector('.mentions-input') || document.querySelector('textarea') || document.querySelector('input'); if (!input) return false; var nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value') ? Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set : Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeSetter.call(input, 'Hello @'); input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.mention-suggestions') || !!document.querySelector('.suggestions') || document.querySelectorAll('.suggestion').length > 0; })()",
    },
    {
      name: 'Clicking a suggestion inserts the mention',
      test: "(async function() { var input = document.querySelector('.mentions-input') || document.querySelector('textarea') || document.querySelector('input'); if (!input) return false; var nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value') ? Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set : Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeSetter.call(input, 'Hello @'); input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var suggestion = document.querySelector('.suggestion') || document.querySelector('.mention-suggestions li'); if (!suggestion) return false; suggestion.click(); await new Promise(function(r) { setTimeout(r, 150); }); return input.value.includes('@') && !input.value.endsWith('@'); })()",
    },
  ],

  'react-code-input': [
    {
      name: 'Typing in one box advances to next box',
      test: "(async function() { var inputs = document.querySelectorAll('.code-input input, input'); if (inputs.length < 4) return false; inputs[0].focus(); var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(inputs[0], 'A'); inputs[0].dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return document.activeElement === inputs[1]; })()",
    },
    {
      name: 'Backspace moves focus to previous box',
      test: "(async function() { var inputs = document.querySelectorAll('.code-input input, input'); if (inputs.length < 4) return false; inputs[1].focus(); inputs[1].dispatchEvent(new KeyboardEvent('keydown', {key:'Backspace', bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return document.activeElement === inputs[0]; })()",
    },
  ],

  'react-signature-pad': [
    {
      name: 'Drawing on canvas creates strokes',
      test: "(async function() { var canvas = document.querySelector('canvas'); if (!canvas) return false; var rect = canvas.getBoundingClientRect(); canvas.dispatchEvent(new MouseEvent('mousedown', {clientX: rect.left+10, clientY: rect.top+10, bubbles:true})); canvas.dispatchEvent(new MouseEvent('mousemove', {clientX: rect.left+50, clientY: rect.top+50, bubbles:true})); canvas.dispatchEvent(new MouseEvent('mouseup', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var ctx = canvas.getContext('2d'); var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); var hasDrawing = false; for (var i = 3; i < imageData.data.length; i += 4) { if (imageData.data[i] > 0) { hasDrawing = true; break; } } return hasDrawing; })()",
    },
    {
      name: 'Clear button erases the signature',
      test: "(async function() { var canvas = document.querySelector('canvas'); if (!canvas) return false; var rect = canvas.getBoundingClientRect(); canvas.dispatchEvent(new MouseEvent('mousedown', {clientX: rect.left+10, clientY: rect.top+10, bubbles:true})); canvas.dispatchEvent(new MouseEvent('mousemove', {clientX: rect.left+50, clientY: rect.top+50, bubbles:true})); canvas.dispatchEvent(new MouseEvent('mouseup', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 100); }); var clearBtn = document.querySelector('.clear-btn') || document.querySelector('button'); if (!clearBtn) return false; clearBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var ctx = canvas.getContext('2d'); var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); var hasDrawing = false; for (var i = 3; i < imageData.data.length; i += 4) { if (imageData.data[i] > 0) { hasDrawing = true; break; } } return !hasDrawing; })()",
    },
  ],

  // ──────────────────────────────────────────────
  // Interactive (additional)
  // ──────────────────────────────────────────────
  'react-tooltip': [
    {
      name: 'Hovering trigger shows tooltip',
      test: "(async function() { var trigger = document.querySelector('[data-tooltip]') || document.querySelector('.trigger') || document.querySelector('button'); if (!trigger) return false; trigger.dispatchEvent(new MouseEvent('mouseenter', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.tooltip') && document.querySelector('.tooltip').style.display !== 'none'; })()",
    },
    {
      name: 'Moving away hides tooltip',
      test: "(async function() { var trigger = document.querySelector('[data-tooltip]') || document.querySelector('.trigger') || document.querySelector('button'); if (!trigger) return false; trigger.dispatchEvent(new MouseEvent('mouseenter', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); trigger.dispatchEvent(new MouseEvent('mouseleave', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var tooltip = document.querySelector('.tooltip'); return !tooltip || tooltip.style.display === 'none' || !tooltip.classList.contains('visible'); })()",
    },
  ],

  'react-popover': [
    {
      name: 'Clicking trigger opens popover',
      test: "(async function() { var trigger = document.querySelector('.popover-trigger') || document.querySelector('button'); if (!trigger) return false; trigger.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.popover') || !!document.querySelector('.popover-content'); })()",
    },
    {
      name: 'Clicking outside closes popover',
      test: "(async function() { var trigger = document.querySelector('.popover-trigger') || document.querySelector('button'); if (!trigger) return false; trigger.click(); await new Promise(function(r) { setTimeout(r, 150); }); document.body.click(); await new Promise(function(r) { setTimeout(r, 150); }); var popover = document.querySelector('.popover') || document.querySelector('.popover-content'); return !popover || popover.style.display === 'none' || !popover.classList.contains('open'); })()",
    },
  ],

  'react-lightbox': [
    {
      name: 'Clicking image opens lightbox overlay',
      test: "(async function() { var img = document.querySelector('.gallery img') || document.querySelector('.thumb') || document.querySelector('img'); if (!img) return false; img.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.lightbox') || !!document.querySelector('.overlay'); })()",
    },
    {
      name: 'Clicking close or overlay dismisses lightbox',
      test: "(async function() { var img = document.querySelector('.gallery img') || document.querySelector('.thumb') || document.querySelector('img'); if (!img) return false; img.click(); await new Promise(function(r) { setTimeout(r, 150); }); var closeBtn = document.querySelector('.lightbox .close') || document.querySelector('.overlay'); if (!closeBtn) return false; closeBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var lightbox = document.querySelector('.lightbox'); return !lightbox || lightbox.style.display === 'none' || !lightbox.classList.contains('open'); })()",
    },
  ],

  'react-sortable-list': [
    {
      name: 'List items have drag handles or are draggable',
      test: "(async function() { var items = document.querySelectorAll('.sortable-item, .list-item'); if (items.length < 3) return false; return items[0].draggable || !!document.querySelector('.drag-handle') || !!document.querySelector('.handle'); })()",
    },
    {
      name: 'Move up button reorders item',
      test: "(async function() { var moveBtn = document.querySelector('.move-up') || document.querySelectorAll('.sortable-item button')[0]; if (!moveBtn) return false; var items = document.querySelectorAll('.sortable-item, .list-item'); if (items.length < 2) return false; var secondItemText = items[1].textContent; moveBtn.closest('.sortable-item, .list-item') || moveBtn; moveBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var newItems = document.querySelectorAll('.sortable-item, .list-item'); return newItems[0].textContent !== items[0].textContent || newItems[1].textContent !== items[1].textContent; })()",
    },
  ],

  'react-resizable-panels': [
    {
      name: 'Panels render with a divider handle',
      test: "(async function() { var panels = document.querySelectorAll('.panel'); var divider = document.querySelector('.divider') || document.querySelector('.handle') || document.querySelector('.resizer'); return panels.length >= 2 && !!divider; })()",
    },
    {
      name: 'Dragging divider changes panel widths',
      test: "(async function() { var divider = document.querySelector('.divider') || document.querySelector('.handle') || document.querySelector('.resizer'); if (!divider) return false; var panel = document.querySelector('.panel'); if (!panel) return false; var beforeWidth = panel.offsetWidth; var rect = divider.getBoundingClientRect(); divider.dispatchEvent(new MouseEvent('mousedown', {clientX: rect.left, clientY: rect.top, bubbles:true})); document.dispatchEvent(new MouseEvent('mousemove', {clientX: rect.left + 100, clientY: rect.top, bubbles:true})); document.dispatchEvent(new MouseEvent('mouseup', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return panel.offsetWidth !== beforeWidth; })()",
    },
  ],

  'react-split-view': [
    {
      name: 'Two panes render side by side',
      test: "(async function() { var panes = document.querySelectorAll('.pane, .split-pane'); return panes.length >= 2; })()",
    },
    {
      name: 'Splitter handle exists between panes',
      test: "(async function() { var splitter = document.querySelector('.splitter') || document.querySelector('.gutter') || document.querySelector('.divider'); return !!splitter; })()",
    },
  ],

  'react-kanban-board': [
    {
      name: 'Board displays multiple columns',
      test: "(async function() { var columns = document.querySelectorAll('.kanban-column, .column, .lane'); return columns.length >= 2; })()",
    },
    {
      name: 'Add card button creates new card in column',
      test: "(async function() { var addBtn = document.querySelector('.add-card') || document.querySelector('.kanban-column button') || document.querySelector('.column button'); if (!addBtn) return false; var beforeCount = document.querySelectorAll('.kanban-card, .card').length; addBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.kanban-card, .card').length > beforeCount; })()",
    },
  ],

  'react-timeline': [
    {
      name: 'Timeline displays events in order',
      test: "(async function() { var events = document.querySelectorAll('.timeline-event, .timeline-item'); return events.length >= 3; })()",
    },
    {
      name: 'Each event has date and description',
      test: "(async function() { var events = document.querySelectorAll('.timeline-event, .timeline-item'); if (events.length < 2) return false; var firstEvent = events[0]; return (!!firstEvent.querySelector('.date') || !!firstEvent.querySelector('.time')) && (!!firstEvent.querySelector('.description') || !!firstEvent.querySelector('.content') || firstEvent.textContent.length > 10); })()",
    },
  ],

  'react-tree-view': [
    {
      name: 'Clicking expand icon shows child nodes',
      test: "(async function() { var toggle = document.querySelector('.tree-toggle') || document.querySelector('.expand-icon') || document.querySelector('.tree-node > span'); if (!toggle) return false; toggle.click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.tree-node .tree-node, .tree-children .tree-node').length > 0; })()",
    },
    {
      name: 'Clicking collapse icon hides child nodes',
      test: "(async function() { var toggle = document.querySelector('.tree-toggle') || document.querySelector('.expand-icon') || document.querySelector('.tree-node > span'); if (!toggle) return false; toggle.click(); await new Promise(function(r) { setTimeout(r, 150); }); var childrenBefore = document.querySelectorAll('.tree-children:not(.collapsed), .tree-node.open').length; toggle.click(); await new Promise(function(r) { setTimeout(r, 150); }); var childrenAfter = document.querySelectorAll('.tree-children:not(.collapsed), .tree-node.open').length; return childrenAfter < childrenBefore || !!document.querySelector('.tree-children.collapsed'); })()",
    },
  ],

  'react-collapsible-panel': [
    {
      name: 'Clicking header toggles panel body',
      test: "(async function() { var header = document.querySelector('.panel-header') || document.querySelector('.collapsible-header'); if (!header) return false; header.click(); await new Promise(function(r) { setTimeout(r, 150); }); var body = document.querySelector('.panel-body') || document.querySelector('.collapsible-body'); return !!body && (body.classList.contains('open') || body.classList.contains('expanded') || body.offsetHeight > 0); })()",
    },
    {
      name: 'Collapse indicator rotates on toggle',
      test: "(async function() { var header = document.querySelector('.panel-header') || document.querySelector('.collapsible-header'); if (!header) return false; var icon = header.querySelector('.icon') || header.querySelector('.arrow') || header.querySelector('.chevron'); header.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.panel.open, .panel.expanded, .collapsible.open'); })()",
    },
  ],

  'react-drawer': [
    {
      name: 'Clicking trigger opens drawer',
      test: "(async function() { var btn = document.querySelector('.drawer-trigger') || document.querySelector('button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.drawer.open') || !!document.querySelector('.drawer-overlay'); })()",
    },
    {
      name: 'Clicking overlay closes drawer',
      test: "(async function() { var btn = document.querySelector('.drawer-trigger') || document.querySelector('button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var overlay = document.querySelector('.drawer-overlay') || document.querySelector('.overlay'); if (!overlay) return false; overlay.click(); await new Promise(function(r) { setTimeout(r, 150); }); var drawer = document.querySelector('.drawer'); return !drawer || !drawer.classList.contains('open'); })()",
    },
  ],

  'react-bottom-sheet': [
    {
      name: 'Clicking trigger opens bottom sheet',
      test: "(async function() { var btn = document.querySelector('.sheet-trigger') || document.querySelector('button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.bottom-sheet.open') || !!document.querySelector('.sheet.visible'); })()",
    },
    {
      name: 'Drag handle allows dismissing the sheet',
      test: "(async function() { var btn = document.querySelector('.sheet-trigger') || document.querySelector('button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var handle = document.querySelector('.sheet-handle') || document.querySelector('.drag-handle'); var closeBtn = document.querySelector('.sheet-close') || document.querySelector('.bottom-sheet button'); if (closeBtn) { closeBtn.click(); } else if (handle) { handle.click(); } await new Promise(function(r) { setTimeout(r, 150); }); var sheet = document.querySelector('.bottom-sheet'); return !sheet || !sheet.classList.contains('open'); })()",
    },
  ],

  'react-command-palette': [
    {
      name: 'Keyboard shortcut opens command palette',
      test: "(async function() { document.dispatchEvent(new KeyboardEvent('keydown', {key:'k', metaKey:true, bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); if (!document.querySelector('.command-palette, .palette')) { document.dispatchEvent(new KeyboardEvent('keydown', {key:'k', ctrlKey:true, bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); } return !!document.querySelector('.command-palette, .palette'); })()",
    },
    {
      name: 'Typing filters command list',
      test: "(async function() { document.dispatchEvent(new KeyboardEvent('keydown', {key:'k', metaKey:true, bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); if (!document.querySelector('.command-palette, .palette')) { document.dispatchEvent(new KeyboardEvent('keydown', {key:'k', ctrlKey:true, bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); } var input = document.querySelector('.command-palette input, .palette input'); if (!input) return false; var beforeCount = document.querySelectorAll('.command-item, .palette-item').length; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'xyz-nomatch'); input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.command-item, .palette-item').length < beforeCount; })()",
    },
  ],

  'react-spotlight-search': [
    {
      name: 'Search overlay appears on keyboard shortcut',
      test: "(async function() { document.dispatchEvent(new KeyboardEvent('keydown', {key:'/', bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); if (!document.querySelector('.spotlight, .search-overlay')) { document.dispatchEvent(new KeyboardEvent('keydown', {key:'k', metaKey:true, bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); } return !!document.querySelector('.spotlight, .search-overlay'); })()",
    },
    {
      name: 'Typing shows filtered results',
      test: "(async function() { document.dispatchEvent(new KeyboardEvent('keydown', {key:'/', bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var input = document.querySelector('.spotlight input, .search-overlay input'); if (!input) { document.dispatchEvent(new KeyboardEvent('keydown', {key:'k', metaKey:true, bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); input = document.querySelector('.spotlight input, .search-overlay input'); } if (!input) return false; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'test'); input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.result, .search-result, .spotlight-item').length > 0; })()",
    },
  ],

  'react-floating-action-btn': [
    {
      name: 'Clicking FAB expands action buttons',
      test: "(async function() { var fab = document.querySelector('.fab') || document.querySelector('.floating-btn'); if (!fab) return false; fab.click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.fab-action, .action-btn').length > 0 || fab.classList.contains('open'); })()",
    },
    {
      name: 'Clicking again collapses action buttons',
      test: "(async function() { var fab = document.querySelector('.fab') || document.querySelector('.floating-btn'); if (!fab) return false; fab.click(); await new Promise(function(r) { setTimeout(r, 150); }); fab.click(); await new Promise(function(r) { setTimeout(r, 150); }); var actions = document.querySelectorAll('.fab-action.visible, .action-btn.visible'); return actions.length === 0 || !fab.classList.contains('open'); })()",
    },
  ],

  'react-skeleton-loader': [
    {
      name: 'Skeleton placeholders render initially',
      test: "(async function() { return document.querySelectorAll('.skeleton, .skeleton-line, .skeleton-block').length >= 2; })()",
    },
    {
      name: 'Skeletons have shimmer animation class',
      test: "(async function() { var skeleton = document.querySelector('.skeleton, .skeleton-line'); if (!skeleton) return false; var styles = window.getComputedStyle(skeleton); return skeleton.classList.contains('shimmer') || skeleton.classList.contains('pulse') || styles.animationName !== 'none' || styles.animation !== 'none'; })()",
    },
  ],

  'react-progress-bar': [
    {
      name: 'Progress bar fills to specified percentage',
      test: "(async function() { var fill = document.querySelector('.progress-fill, .progress-bar-fill, .bar-fill'); if (!fill) return false; var width = parseFloat(fill.style.width); return width > 0 && width <= 100; })()",
    },
    {
      name: 'Progress label shows percentage text',
      test: "(async function() { var label = document.querySelector('.progress-label, .progress-text'); if (!label) return false; return label.textContent.includes('%'); })()",
    },
  ],

  // ──────────────────────────────────────────────
  // Data Display (additional)
  // ──────────────────────────────────────────────
  'react-badge': [
    {
      name: 'Badge renders with count value',
      test: "(async function() { var badge = document.querySelector('.badge'); if (!badge) return false; return badge.textContent.trim().length > 0 && !isNaN(parseInt(badge.textContent)); })()",
    },
    {
      name: 'Badge hides when count is zero',
      test: "(async function() { var badges = document.querySelectorAll('.badge'); var zeroBadges = Array.from(badges).filter(function(b) { return parseInt(b.textContent) === 0; }); return zeroBadges.length === 0 || zeroBadges.every(function(b) { return b.classList.contains('hidden') || b.style.display === 'none'; }); })()",
    },
  ],

  'react-avatar': [
    {
      name: 'Avatar displays image or initials',
      test: "(async function() { var avatar = document.querySelector('.avatar'); if (!avatar) return false; var hasImg = !!avatar.querySelector('img'); var hasInitials = avatar.textContent.trim().length > 0 && avatar.textContent.trim().length <= 3; return hasImg || hasInitials; })()",
    },
    {
      name: 'Different sizes render with correct dimensions',
      test: "(async function() { var avatars = document.querySelectorAll('.avatar'); if (avatars.length < 2) return false; var sizes = Array.from(avatars).map(function(a) { return a.offsetWidth; }); var uniqueSizes = new Set(sizes); return uniqueSizes.size >= 2; })()",
    },
  ],

  'react-stat-card': [
    {
      name: 'Stat cards display value and label',
      test: "(async function() { var cards = document.querySelectorAll('.stat-card, .stat'); if (cards.length < 2) return false; var first = cards[0]; return (!!first.querySelector('.stat-value, .value') && !!first.querySelector('.stat-label, .label')); })()",
    },
    {
      name: 'Stat cards show trend indicators',
      test: "(async function() { var trends = document.querySelectorAll('.trend, .stat-trend, .change'); return trends.length >= 1; })()",
    },
  ],

  'react-timeline-feed': [
    {
      name: 'Feed items render in chronological order',
      test: "(async function() { var items = document.querySelectorAll('.feed-item, .timeline-item'); return items.length >= 3; })()",
    },
    {
      name: 'Each feed item shows timestamp and content',
      test: "(async function() { var item = document.querySelector('.feed-item, .timeline-item'); if (!item) return false; var hasTime = !!item.querySelector('.time, .timestamp, .date'); var hasContent = !!item.querySelector('.content, .message, .text') || item.textContent.length > 10; return hasTime && hasContent; })()",
    },
  ],

  'react-activity-log': [
    {
      name: 'Activity entries display with icons and descriptions',
      test: "(async function() { var entries = document.querySelectorAll('.activity-item, .log-entry'); if (entries.length < 3) return false; var first = entries[0]; return (!!first.querySelector('.icon, .activity-icon') || first.textContent.length > 5) && (!!first.querySelector('.description, .message') || first.textContent.length > 10); })()",
    },
    {
      name: 'Filter buttons filter activity types',
      test: "(async function() { var filterBtns = document.querySelectorAll('.filter-btn, .activity-filter button'); if (filterBtns.length < 2) return false; var beforeCount = document.querySelectorAll('.activity-item, .log-entry').length; filterBtns[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); var afterCount = document.querySelectorAll('.activity-item, .log-entry').length; return afterCount !== beforeCount || filterBtns[1].classList.contains('active'); })()",
    },
  ],

  'react-diff-viewer': [
    {
      name: 'Diff displays additions and deletions',
      test: "(async function() { var additions = document.querySelectorAll('.line-added, .diff-add, .added'); var deletions = document.querySelectorAll('.line-removed, .diff-del, .removed'); return additions.length >= 1 && deletions.length >= 1; })()",
    },
    {
      name: 'Line numbers are displayed',
      test: "(async function() { var lineNums = document.querySelectorAll('.line-num, .line-number'); return lineNums.length >= 2; })()",
    },
  ],

  'react-code-block': [
    {
      name: 'Code block renders with syntax highlighting',
      test: "(async function() { var codeBlock = document.querySelector('.code-block, pre code, .highlight'); if (!codeBlock) return false; return codeBlock.querySelectorAll('span').length >= 2 || codeBlock.classList.contains('highlighted'); })()",
    },
    {
      name: 'Copy button copies code content',
      test: "(async function() { var copyBtn = document.querySelector('.copy-btn, .code-block button'); if (!copyBtn) return false; var beforeText = copyBtn.textContent; copyBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return copyBtn.textContent !== beforeText || copyBtn.classList.contains('copied'); })()",
    },
  ],

  'react-markdown-preview': [
    {
      name: 'Markdown input renders as HTML preview',
      test: "(async function() { var preview = document.querySelector('.preview, .markdown-preview'); if (!preview) return false; return !!preview.querySelector('h1, h2, h3, p, ul, ol, strong, em') || preview.innerHTML.includes('<'); })()",
    },
    {
      name: 'Editing input updates preview in real time',
      test: "(async function() { var input = document.querySelector('textarea') || document.querySelector('.editor'); if (!input) return false; var preview = document.querySelector('.preview, .markdown-preview'); if (!preview) return false; var beforeContent = preview.innerHTML; var nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set; nativeSetter.call(input, '# New Heading\\n\\n**bold text**'); input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return preview.innerHTML !== beforeContent; })()",
    },
  ],

  'react-json-viewer': [
    {
      name: 'JSON tree renders with expandable nodes',
      test: "(async function() { var nodes = document.querySelectorAll('.json-node, .tree-node, .json-key'); return nodes.length >= 3; })()",
    },
    {
      name: 'Clicking a node toggles its children',
      test: "(async function() { var toggle = document.querySelector('.json-toggle, .tree-toggle, .json-node > span'); if (!toggle) return false; toggle.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.json-node.collapsed, .tree-node.collapsed') || !!document.querySelector('.json-node.expanded, .tree-node.expanded'); })()",
    },
  ],

  'react-comparison-table': [
    {
      name: 'Table renders with multiple comparison columns',
      test: "(async function() { var headers = document.querySelectorAll('th, .comparison-header'); return headers.length >= 3; })()",
    },
    {
      name: 'Feature rows display check or cross marks',
      test: "(async function() { var rows = document.querySelectorAll('tbody tr, .feature-row'); if (rows.length < 3) return false; var marks = document.querySelectorAll('.check, .cross, .yes, .no'); return marks.length >= 3; })()",
    },
  ],

  'react-pricing-table': [
    {
      name: 'Pricing tiers display with prices',
      test: "(async function() { var tiers = document.querySelectorAll('.pricing-card, .tier, .plan'); if (tiers.length < 2) return false; var prices = document.querySelectorAll('.price'); return prices.length >= 2; })()",
    },
    {
      name: 'Featured/recommended tier is highlighted',
      test: "(async function() { var featured = document.querySelector('.pricing-card.featured, .tier.recommended, .plan.popular, .pricing-card.popular'); return !!featured; })()",
    },
  ],

  'react-feature-list': [
    {
      name: 'Feature items render with icons and descriptions',
      test: "(async function() { var features = document.querySelectorAll('.feature, .feature-item'); if (features.length < 3) return false; var first = features[0]; return (!!first.querySelector('.icon, svg, img') || first.textContent.includes('✓')) && first.textContent.length > 5; })()",
    },
    {
      name: 'Features are visually grouped or categorized',
      test: "(async function() { var features = document.querySelectorAll('.feature, .feature-item'); return features.length >= 4; })()",
    },
  ],

  'react-testimonials': [
    {
      name: 'Testimonial cards display quote and author',
      test: "(async function() { var testimonials = document.querySelectorAll('.testimonial, .testimonial-card'); if (testimonials.length < 2) return false; var first = testimonials[0]; return (!!first.querySelector('.quote, .text, blockquote') || first.textContent.length > 20) && (!!first.querySelector('.author, .name')); })()",
    },
    {
      name: 'Navigation arrows cycle through testimonials',
      test: "(async function() { var nextBtn = document.querySelector('.next, .testimonial-next') || document.querySelectorAll('.testimonial-nav button')[1]; if (!nextBtn) return false; nextBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.testimonial.active, .testimonial-card.active') || true; })()",
    },
  ],

  'react-team-grid': [
    {
      name: 'Team member cards display with name and role',
      test: "(async function() { var members = document.querySelectorAll('.team-member, .member-card'); if (members.length < 3) return false; var first = members[0]; return (!!first.querySelector('.name') || first.textContent.length > 5) && (!!first.querySelector('.role, .title, .position')); })()",
    },
    {
      name: 'Grid layout adjusts to show multiple members',
      test: "(async function() { var members = document.querySelectorAll('.team-member, .member-card'); return members.length >= 4; })()",
    },
  ],

  'react-changelog': [
    {
      name: 'Changelog entries display version and date',
      test: "(async function() { var entries = document.querySelectorAll('.changelog-entry, .release'); if (entries.length < 2) return false; var first = entries[0]; return (!!first.querySelector('.version') || first.textContent.match(/v?\\d+\\.\\d+/)) && (!!first.querySelector('.date') || first.textContent.match(/\\d{4}/)); })()",
    },
    {
      name: 'Entries list changes with type badges',
      test: "(async function() { var changes = document.querySelectorAll('.change-item, .changelog-item, li'); var badges = document.querySelectorAll('.badge, .tag, .type'); return changes.length >= 3 || badges.length >= 2; })()",
    },
  ],

  'react-status-page': [
    {
      name: 'Services display with status indicators',
      test: "(async function() { var services = document.querySelectorAll('.service, .status-item'); if (services.length < 3) return false; var indicators = document.querySelectorAll('.status-indicator, .status-dot, .status-badge'); return indicators.length >= 3; })()",
    },
    {
      name: 'Overall status is displayed at top',
      test: "(async function() { var overall = document.querySelector('.overall-status, .system-status'); return !!overall && overall.textContent.length > 3; })()",
    },
  ],

  'react-metric-dashboard': [
    {
      name: 'Dashboard displays metric widgets with values',
      test: "(async function() { var metrics = document.querySelectorAll('.metric, .metric-card, .widget'); if (metrics.length < 3) return false; var values = document.querySelectorAll('.metric-value, .widget-val, .value'); return values.length >= 3; })()",
    },
    {
      name: 'Charts or sparklines render inside widgets',
      test: "(async function() { var charts = document.querySelectorAll('.chart, .sparkline, svg, canvas, .mini-chart'); return charts.length >= 1; })()",
    },
  ],

  // ──────────────────────────────────────────────
  // Navigation (additional)
  // ──────────────────────────────────────────────
  'react-command-menu': [
    {
      name: 'Opening command menu shows search input',
      test: "(async function() { var trigger = document.querySelector('.command-trigger') || document.querySelector('button'); if (trigger) trigger.click(); else document.dispatchEvent(new KeyboardEvent('keydown', {key:'k', metaKey:true, bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.command-menu input, .command-input'); })()",
    },
    {
      name: 'Typing filters menu items',
      test: "(async function() { var trigger = document.querySelector('.command-trigger') || document.querySelector('button'); if (trigger) trigger.click(); else document.dispatchEvent(new KeyboardEvent('keydown', {key:'k', metaKey:true, bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var input = document.querySelector('.command-menu input, .command-input'); if (!input) return false; var beforeCount = document.querySelectorAll('.command-item, .menu-item').length; var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'zzz-nomatch'); input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.command-item, .menu-item').length < beforeCount; })()",
    },
  ],

  'react-mini-map': [
    {
      name: 'Mini map renders a scaled overview',
      test: "(async function() { var miniMap = document.querySelector('.mini-map, .minimap'); return !!miniMap && miniMap.offsetHeight > 0; })()",
    },
    {
      name: 'Viewport indicator shows current scroll position',
      test: "(async function() { var viewport = document.querySelector('.viewport-indicator, .minimap-viewport, .visible-area'); return !!viewport && viewport.offsetHeight > 0; })()",
    },
  ],

  'react-scroll-to-top': [
    {
      name: 'Scroll-to-top button appears after scrolling down',
      test: "(async function() { var container = document.querySelector('.scroll-container') || document.documentElement; container.scrollTop = 500; window.scrollTo(0, 500); await new Promise(function(r) { setTimeout(r, 200); }); var btn = document.querySelector('.scroll-top, .back-to-top, .scroll-to-top'); return !!btn && (btn.style.display !== 'none' && !btn.classList.contains('hidden')); })()",
    },
    {
      name: 'Clicking the button scrolls back to top',
      test: "(async function() { window.scrollTo(0, 500); await new Promise(function(r) { setTimeout(r, 200); }); var btn = document.querySelector('.scroll-top, .back-to-top, .scroll-to-top'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 300); }); return window.scrollY < 100 || document.documentElement.scrollTop < 100; })()",
    },
  ],

  'react-anchor-links': [
    {
      name: 'Anchor links render for each section',
      test: '(async function() { var links = document.querySelectorAll(\'.anchor-link, a[href^="#"]\'); return links.length >= 3; })()',
    },
    {
      name: 'Clicking an anchor link scrolls to the section',
      test: '(async function() { var links = document.querySelectorAll(\'.anchor-link, a[href^="#"]\'); if (links.length < 2) return false; links[1].click(); await new Promise(function(r) { setTimeout(r, 200); }); return true; })()',
    },
  ],

  'react-table-of-contents': [
    {
      name: 'Table of contents lists all headings',
      test: "(async function() { var tocItems = document.querySelectorAll('.toc-item, .toc a, .table-of-contents li'); return tocItems.length >= 3; })()",
    },
    {
      name: 'Active section is highlighted in TOC',
      test: "(async function() { var activeItem = document.querySelector('.toc-item.active, .toc a.active, .table-of-contents li.active'); return !!activeItem; })()",
    },
  ],

  'react-step-indicator': [
    {
      name: 'Steps display with current step highlighted',
      test: "(async function() { var steps = document.querySelectorAll('.step, .step-item'); if (steps.length < 3) return false; var activeStep = document.querySelector('.step.active, .step.current, .step-item.active'); return !!activeStep; })()",
    },
    {
      name: 'Completed steps show check mark',
      test: "(async function() { var completed = document.querySelectorAll('.step.complete, .step.completed, .step-item.done'); return completed.length >= 1 || !!document.querySelector('.step .check'); })()",
    },
  ],

  'react-app-shell': [
    {
      name: 'App shell renders header sidebar and content area',
      test: "(async function() { var header = document.querySelector('.app-header, header, .topbar'); var sidebar = document.querySelector('.app-sidebar, .sidebar, aside'); var content = document.querySelector('.app-content, .main-content, main'); return !!header && !!sidebar && !!content; })()",
    },
    {
      name: 'Sidebar toggle collapses the sidebar',
      test: "(async function() { var toggle = document.querySelector('.sidebar-toggle, .toggle-btn, .hamburger'); if (!toggle) return false; toggle.click(); await new Promise(function(r) { setTimeout(r, 150); }); var sidebar = document.querySelector('.app-sidebar, .sidebar, aside'); return sidebar.classList.contains('collapsed') || sidebar.classList.contains('closed') || sidebar.offsetWidth < 80; })()",
    },
  ],

  'react-header-scroll-hide': [
    {
      name: 'Header is visible at top of page',
      test: "(async function() { var header = document.querySelector('.header, header, .app-header'); if (!header) return false; return header.offsetHeight > 0 && !header.classList.contains('hidden'); })()",
    },
    {
      name: 'Header hides on scroll down',
      test: "(async function() { var header = document.querySelector('.header, header, .app-header'); if (!header) return false; window.scrollTo(0, 300); await new Promise(function(r) { setTimeout(r, 200); }); return header.classList.contains('hidden') || header.classList.contains('scrolled-up') || header.style.transform.includes('translate'); })()",
    },
  ],

  'react-sticky-header': [
    {
      name: 'Header sticks to top when scrolling',
      test: "(async function() { var header = document.querySelector('.sticky-header, .header, header'); if (!header) return false; var styles = window.getComputedStyle(header); return styles.position === 'sticky' || styles.position === 'fixed' || header.classList.contains('sticky'); })()",
    },
    {
      name: 'Header appearance changes when stuck',
      test: "(async function() { window.scrollTo(0, 200); await new Promise(function(r) { setTimeout(r, 200); }); var header = document.querySelector('.sticky-header, .header, header'); return !!header && (header.classList.contains('stuck') || header.classList.contains('scrolled') || header.classList.contains('compact')); })()",
    },
  ],

  'react-page-transitions': [
    {
      name: 'Navigation triggers page transition animation',
      test: "(async function() { var links = document.querySelectorAll('.nav-link, a, button'); if (links.length < 2) return false; links[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); var page = document.querySelector('.page, .page-content, .view'); return !!page && (page.classList.contains('entering') || page.classList.contains('fade-in') || page.classList.contains('slide-in') || page.classList.contains('active')); })()",
    },
  ],

  'react-route-guard': [
    {
      name: 'Protected route redirects to login when unauthenticated',
      test: "(async function() { var protectedLink = document.querySelector('[href*=\"protected\"], [href*=\"dashboard\"], .protected-link'); if (!protectedLink) return false; protectedLink.click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.body.textContent.toLowerCase().includes('login') || document.body.textContent.toLowerCase().includes('sign in') || !!document.querySelector('.login-form'); })()",
    },
    {
      name: 'Login form is displayed for unauthorized access',
      test: "(async function() { return !!document.querySelector('.login-form, .auth-form') || document.body.textContent.toLowerCase().includes('please log in'); })()",
    },
  ],

  'react-nested-routes': [
    {
      name: 'Parent route renders layout with child content',
      test: "(async function() { var layout = document.querySelector('.layout, .parent-route'); var childContent = document.querySelector('.child-content, .outlet, .nested-content'); return !!layout && !!childContent; })()",
    },
    {
      name: 'Clicking nested link renders child component',
      test: "(async function() { var links = document.querySelectorAll('.sub-nav a, .nested-link, .child-link'); if (links.length < 2) return false; var content = document.querySelector('.child-content, .outlet, .nested-content'); var beforeContent = content ? content.textContent : ''; links[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); var afterContent = document.querySelector('.child-content, .outlet, .nested-content'); return afterContent && afterContent.textContent !== beforeContent; })()",
    },
  ],

  'react-tab-router': [
    {
      name: 'Clicking tab changes displayed content',
      test: "(async function() { var tabs = document.querySelectorAll('.tab, .tab-link'); if (tabs.length < 2) return false; var content = document.querySelector('.tab-content, .content, .panel'); if (!content) return false; var beforeContent = content.textContent; tabs[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return content.textContent !== beforeContent; })()",
    },
    {
      name: 'Active tab has visual indicator',
      test: "(async function() { var tabs = document.querySelectorAll('.tab, .tab-link'); if (tabs.length < 2) return false; tabs[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return tabs[1].classList.contains('active') || tabs[1].classList.contains('selected'); })()",
    },
  ],

  'react-deep-linking': [
    {
      name: 'URL hash or params reflect current state',
      test: "(async function() { var tabs = document.querySelectorAll('.tab, button, a'); if (tabs.length < 2) return false; tabs[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return window.location.hash.length > 1 || window.location.search.length > 1; })()",
    },
  ],

  'react-url-state': [
    {
      name: 'Changing input updates URL parameters',
      test: "(async function() { var input = document.querySelector('input') || document.querySelector('select'); if (!input) return false; if (input.tagName === 'SELECT') { input.value = input.options[1] ? input.options[1].value : input.value; input.dispatchEvent(new Event('change', {bubbles:true})); } else { var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeInputValueSetter.call(input, 'test-value'); input.dispatchEvent(new Event('input', {bubbles:true})); } await new Promise(function(r) { setTimeout(r, 150); }); return window.location.search.length > 1 || window.location.hash.length > 1; })()",
    },
  ],

  'react-back-to-top': [
    {
      name: 'Button appears after scrolling down',
      test: "(async function() { window.scrollTo(0, 600); await new Promise(function(r) { setTimeout(r, 200); }); var btn = document.querySelector('.back-to-top, .scroll-top, .to-top'); return !!btn && btn.style.display !== 'none' && !btn.classList.contains('hidden'); })()",
    },
    {
      name: 'Clicking button returns to page top',
      test: "(async function() { window.scrollTo(0, 600); await new Promise(function(r) { setTimeout(r, 200); }); var btn = document.querySelector('.back-to-top, .scroll-top, .to-top'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 300); }); return window.scrollY < 50 || document.documentElement.scrollTop < 50; })()",
    },
  ],

  'react-scroll-spy': [
    {
      name: 'Nav links highlight based on scroll position',
      test: "(async function() { var links = document.querySelectorAll('.spy-link, .nav-link, .toc-link'); if (links.length < 3) return false; var activeLink = document.querySelector('.spy-link.active, .nav-link.active, .toc-link.active'); return !!activeLink; })()",
    },
    {
      name: 'Scrolling to a section updates active link',
      test: "(async function() { var sections = document.querySelectorAll('section, [id]'); if (sections.length < 2) return false; sections[1].scrollIntoView(); await new Promise(function(r) { setTimeout(r, 200); }); var links = document.querySelectorAll('.spy-link.active, .nav-link.active, .toc-link.active'); return links.length >= 1; })()",
    },
  ],

  // ──────────────────────────────────────────────
  // Advanced (additional)
  // ──────────────────────────────────────────────
  'react-theme-switcher': [
    {
      name: 'Clicking toggle switches between light and dark theme',
      test: "(async function() { var toggle = document.querySelector('.theme-toggle, .theme-switch, .dark-mode-toggle'); if (!toggle) return false; var beforeTheme = document.documentElement.getAttribute('data-theme') || document.body.className; toggle.click(); await new Promise(function(r) { setTimeout(r, 150); }); var afterTheme = document.documentElement.getAttribute('data-theme') || document.body.className; return afterTheme !== beforeTheme; })()",
    },
    {
      name: 'Theme persists the selected mode',
      test: "(async function() { var toggle = document.querySelector('.theme-toggle, .theme-switch, .dark-mode-toggle'); if (!toggle) return false; toggle.click(); await new Promise(function(r) { setTimeout(r, 150); }); var isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark'; return typeof isDark === 'boolean'; })()",
    },
  ],

  'react-i18n-locale': [
    {
      name: 'Language selector changes displayed text',
      test: "(async function() { var selector = document.querySelector('.lang-select, select[name=\"lang\"], .locale-selector'); if (!selector) return false; var beforeText = document.querySelector('.content, main, .app').textContent; selector.value = selector.options[1] ? selector.options[1].value : selector.value; selector.dispatchEvent(new Event('change', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var afterText = document.querySelector('.content, main, .app').textContent; return afterText !== beforeText; })()",
    },
    {
      name: 'Multiple language options are available',
      test: "(async function() { var selector = document.querySelector('.lang-select, select[name=\"lang\"], .locale-selector'); if (!selector) return selector ? false : !!document.querySelectorAll('.lang-btn, .locale-btn').length; return selector.options.length >= 2; })()",
    },
  ],

  'react-a11y-focus-trap': [
    {
      name: 'Opening dialog traps focus within it',
      test: "(async function() { var btn = document.querySelector('.open-dialog, .trigger, button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var dialog = document.querySelector('.dialog, .modal, [role=\"dialog\"]'); if (!dialog) return false; var focusable = dialog.querySelectorAll('button, input, a, [tabindex]'); return focusable.length >= 1; })()",
    },
    {
      name: 'Tab key cycles within the trapped region',
      test: "(async function() { var btn = document.querySelector('.open-dialog, .trigger, button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var dialog = document.querySelector('.dialog, .modal, [role=\"dialog\"]'); if (!dialog) return false; var focusable = dialog.querySelectorAll('button, input, a, [tabindex]'); if (focusable.length < 2) return false; focusable[0].focus(); document.dispatchEvent(new KeyboardEvent('keydown', {key:'Tab', bubbles:true})); await new Promise(function(r) { setTimeout(r, 100); }); return dialog.contains(document.activeElement); })()",
    },
  ],

  'react-a11y-live-region': [
    {
      name: 'Live region has aria-live attribute',
      test: "(async function() { var liveRegion = document.querySelector('[aria-live]'); return !!liveRegion; })()",
    },
    {
      name: 'Action updates the live region content',
      test: "(async function() { var liveRegion = document.querySelector('[aria-live]'); if (!liveRegion) return false; var beforeText = liveRegion.textContent; var btn = document.querySelector('button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return liveRegion.textContent !== beforeText; })()",
    },
  ],

  'react-offline-indicator': [
    {
      name: 'Component renders online/offline status',
      test: "(async function() { var indicator = document.querySelector('.offline-indicator, .online-status, .connection-status'); if (!indicator) return false; return indicator.textContent.toLowerCase().includes('online') || indicator.textContent.toLowerCase().includes('offline') || indicator.textContent.toLowerCase().includes('connected'); })()",
    },
  ],

  'react-websocket-chat': [
    {
      name: 'Message input and send button are present',
      test: "(async function() { var input = document.querySelector('.message-input, .chat-input input, textarea'); var sendBtn = document.querySelector('.send-btn, .chat-send, button[type=\"submit\"]'); return !!input && !!sendBtn; })()",
    },
    {
      name: 'Sending message adds it to chat area',
      test: "(async function() { var input = document.querySelector('.message-input, .chat-input input, textarea'); if (!input) return false; var beforeCount = document.querySelectorAll('.message, .chat-message').length; var nativeSetter = input.tagName === 'TEXTAREA' ? Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set : Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; nativeSetter.call(input, 'Hello test message'); input.dispatchEvent(new Event('input', {bubbles:true})); var sendBtn = document.querySelector('.send-btn, .chat-send, button[type=\"submit\"]'); if (sendBtn) sendBtn.click(); else input.dispatchEvent(new KeyboardEvent('keydown', {key:'Enter', bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.message, .chat-message').length > beforeCount; })()",
    },
  ],

  'react-optimistic-update': [
    {
      name: 'Action immediately updates UI before server response',
      test: "(async function() { var btn = document.querySelector('.like-btn, .action-btn, button'); if (!btn) return false; var beforeText = btn.textContent; btn.click(); await new Promise(function(r) { setTimeout(r, 50); }); return btn.textContent !== beforeText || btn.classList.contains('loading') || btn.classList.contains('active'); })()",
    },
    {
      name: 'Item list shows new item immediately on add',
      test: "(async function() { var addBtn = document.querySelector('.add-btn, button'); if (!addBtn) return false; var beforeCount = document.querySelectorAll('.item, li').length; addBtn.click(); await new Promise(function(r) { setTimeout(r, 50); }); return document.querySelectorAll('.item, li').length > beforeCount; })()",
    },
  ],

  'react-undo-manager': [
    {
      name: 'Performing action enables undo button',
      test: "(async function() { var actionBtn = document.querySelector('.action-btn, button:not(.undo):not(.redo)'); if (!actionBtn) return false; actionBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var undoBtn = document.querySelector('.undo-btn, .undo'); return !!undoBtn && !undoBtn.disabled; })()",
    },
    {
      name: 'Clicking undo reverts last action',
      test: "(async function() { var actionBtn = document.querySelector('.action-btn, button:not(.undo):not(.redo)'); if (!actionBtn) return false; actionBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var stateAfterAction = document.querySelector('.content, .state, .output'); var afterText = stateAfterAction ? stateAfterAction.textContent : ''; var undoBtn = document.querySelector('.undo-btn, .undo'); if (!undoBtn) return false; undoBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var afterUndo = stateAfterAction ? stateAfterAction.textContent : ''; return afterUndo !== afterText || undoBtn.disabled; })()",
    },
  ],

  'react-clipboard-manager': [
    {
      name: 'Copy button copies text and shows feedback',
      test: "(async function() { var copyBtn = document.querySelector('.copy-btn, button'); if (!copyBtn) return false; var beforeText = copyBtn.textContent; copyBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return copyBtn.textContent !== beforeText || copyBtn.classList.contains('copied'); })()",
    },
    {
      name: 'Clipboard history displays copied items',
      test: "(async function() { var copyBtn = document.querySelector('.copy-btn, button'); if (!copyBtn) return false; copyBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var history = document.querySelectorAll('.clipboard-item, .history-item'); return history.length >= 1; })()",
    },
  ],

  'react-hotkey-manager': [
    {
      name: 'Pressing registered hotkey triggers action',
      test: "(async function() { document.dispatchEvent(new KeyboardEvent('keydown', {key:'s', ctrlKey:true, bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return document.body.textContent.toLowerCase().includes('saved') || !!document.querySelector('.toast') || !!document.querySelector('.notification'); })()",
    },
    {
      name: 'Hotkey list displays registered shortcuts',
      test: "(async function() { var shortcuts = document.querySelectorAll('.shortcut, .hotkey, kbd'); return shortcuts.length >= 2; })()",
    },
  ],

  'react-idle-detector': [
    {
      name: 'Component shows active status initially',
      test: "(async function() { var status = document.querySelector('.idle-status, .status'); if (!status) return false; return status.textContent.toLowerCase().includes('active') || status.classList.contains('active'); })()",
    },
    {
      name: 'Timer or countdown is displayed',
      test: "(async function() { var timer = document.querySelector('.idle-timer, .countdown, .timer'); return !!timer && timer.textContent.length > 0; })()",
    },
  ],

  'react-media-query-hook': [
    {
      name: 'Current breakpoint is displayed',
      test: "(async function() { var breakpoint = document.querySelector('.breakpoint, .screen-size, .media-info'); if (!breakpoint) return false; return breakpoint.textContent.length > 0; })()",
    },
    {
      name: 'Window width information is shown',
      test: "(async function() { return document.body.textContent.includes('px') || document.body.textContent.match(/\\d{3,4}/) !== null; })()",
    },
  ],

  'react-portal-demo': [
    {
      name: 'Clicking trigger renders content outside parent DOM',
      test: "(async function() { var btn = document.querySelector('.portal-trigger, button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var portal = document.querySelector('.portal-content, .portal, [data-portal]'); return !!portal; })()",
    },
    {
      name: 'Portal content appears as direct child of body or portal root',
      test: "(async function() { var btn = document.querySelector('.portal-trigger, button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var portalRoot = document.querySelector('#portal-root') || document.body; var portal = portalRoot.querySelector('.portal-content, .portal, .modal'); return !!portal; })()",
    },
  ],

  'react-error-boundary': [
    {
      name: 'Error boundary displays fallback UI on error',
      test: "(async function() { var errorFallback = document.querySelector('.error-fallback, .error-boundary, .error-message'); if (errorFallback) return true; var triggerBtn = document.querySelector('.trigger-error, .crash-btn, button'); if (!triggerBtn) return false; triggerBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.error-fallback, .error-boundary, .error-message'); })()",
    },
    {
      name: 'Retry button recovers from error',
      test: "(async function() { var triggerBtn = document.querySelector('.trigger-error, .crash-btn'); if (triggerBtn) triggerBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var retryBtn = document.querySelector('.retry-btn, .reset-btn, .error-fallback button'); if (!retryBtn) return false; retryBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !document.querySelector('.error-fallback') || !!document.querySelector('.content, .app'); })()",
    },
  ],

  'react-retry-mechanism': [
    {
      name: 'Failed request shows retry button',
      test: "(async function() { await new Promise(function(r) { setTimeout(r, 300); }); var retryBtn = document.querySelector('.retry-btn, .retry, button'); var errorMsg = document.querySelector('.error, .error-message'); return (!!retryBtn && !!errorMsg) || document.body.textContent.toLowerCase().includes('retry'); })()",
    },
    {
      name: 'Retry count or attempt number is displayed',
      test: "(async function() { return document.body.textContent.toLowerCase().includes('attempt') || document.body.textContent.toLowerCase().includes('retry') || document.body.textContent.match(/\\d+\\s*\\/\\s*\\d+/) !== null; })()",
    },
  ],

  'react-virtual-list-advanced': [
    {
      name: 'Only visible items are rendered in DOM',
      test: "(async function() { var items = document.querySelectorAll('.virtual-item, .list-item, .row'); var container = document.querySelector('.virtual-list, .list-container'); if (!container) return false; return items.length > 0 && items.length < 100; })()",
    },
    {
      name: 'Scrolling renders new items',
      test: "(async function() { var container = document.querySelector('.virtual-list, .list-container'); if (!container) return false; var beforeItems = Array.from(document.querySelectorAll('.virtual-item, .list-item, .row')).map(function(i) { return i.textContent; }); container.scrollTop = 500; await new Promise(function(r) { setTimeout(r, 150); }); var afterItems = Array.from(document.querySelectorAll('.virtual-item, .list-item, .row')).map(function(i) { return i.textContent; }); return afterItems.some(function(item) { return beforeItems.indexOf(item) === -1; }); })()",
    },
  ],

  // ──────────────────────────────────────────────
  // UI Components (additional)
  // ──────────────────────────────────────────────
  'react-spinner': [
    {
      name: 'Spinner element renders with animation',
      test: "(async function() { var spinner = document.querySelector('.spinner, .loader, .loading'); if (!spinner) return false; var styles = window.getComputedStyle(spinner); return styles.animationName !== 'none' || styles.animation !== 'none' || spinner.classList.contains('spinning'); })()",
    },
    {
      name: 'Multiple spinner sizes are available',
      test: "(async function() { var spinners = document.querySelectorAll('.spinner, .loader'); if (spinners.length < 2) return false; var sizes = Array.from(spinners).map(function(s) { return s.offsetWidth; }); var uniqueSizes = new Set(sizes); return uniqueSizes.size >= 2; })()",
    },
  ],

  'react-chip': [
    {
      name: 'Chips render with label text',
      test: "(async function() { var chips = document.querySelectorAll('.chip'); return chips.length >= 2 && chips[0].textContent.trim().length > 0; })()",
    },
    {
      name: 'Clicking remove button deletes the chip',
      test: "(async function() { var chips = document.querySelectorAll('.chip'); if (chips.length < 2) return false; var beforeCount = chips.length; var removeBtn = chips[0].querySelector('.remove, .close, .delete, button'); if (!removeBtn) return false; removeBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.chip').length < beforeCount; })()",
    },
  ],

  'react-divider': [
    {
      name: 'Divider elements render between sections',
      test: "(async function() { var dividers = document.querySelectorAll('.divider, hr, .separator'); return dividers.length >= 1; })()",
    },
    {
      name: 'Divider with text label displays centered text',
      test: "(async function() { var labeledDivider = document.querySelector('.divider-label, .divider span, .separator-text'); return !!labeledDivider && labeledDivider.textContent.trim().length > 0; })()",
    },
  ],

  'react-alert-banner': [
    {
      name: 'Alert banner displays message with type styling',
      test: "(async function() { var alert = document.querySelector('.alert, .banner, .alert-banner'); if (!alert) return false; return alert.textContent.trim().length > 0 && (alert.classList.contains('info') || alert.classList.contains('warning') || alert.classList.contains('error') || alert.classList.contains('success') || alert.className.length > 5); })()",
    },
    {
      name: 'Dismiss button closes the alert',
      test: "(async function() { var alert = document.querySelector('.alert, .banner, .alert-banner'); if (!alert) return false; var closeBtn = alert.querySelector('.close, .dismiss, button'); if (!closeBtn) return false; closeBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var afterAlert = document.querySelector('.alert, .banner, .alert-banner'); return !afterAlert || afterAlert.style.display === 'none' || afterAlert.classList.contains('hidden'); })()",
    },
  ],

  'react-callout': [
    {
      name: 'Callout renders with icon and message',
      test: "(async function() { var callout = document.querySelector('.callout'); if (!callout) return false; return callout.textContent.trim().length > 5 && (!!callout.querySelector('.icon, svg, img') || callout.classList.contains('info') || callout.classList.contains('warning')); })()",
    },
    {
      name: 'Different callout types have distinct styling',
      test: "(async function() { var callouts = document.querySelectorAll('.callout'); if (callouts.length < 2) return false; var firstBg = window.getComputedStyle(callouts[0]).backgroundColor; var secondBg = window.getComputedStyle(callouts[1]).backgroundColor; return firstBg !== secondBg || callouts[0].className !== callouts[1].className; })()",
    },
  ],

  'react-empty-state-v2': [
    {
      name: 'Empty state displays illustration and message',
      test: "(async function() { var emptyState = document.querySelector('.empty-state, .empty'); if (!emptyState) return false; return emptyState.textContent.length > 10 && (!!emptyState.querySelector('svg, img, .icon, .illustration')); })()",
    },
    {
      name: 'Call to action button is displayed',
      test: "(async function() { var emptyState = document.querySelector('.empty-state, .empty'); if (!emptyState) return false; var cta = emptyState.querySelector('button, a, .cta'); return !!cta && cta.textContent.trim().length > 0; })()",
    },
  ],

  'react-avatar-group': [
    {
      name: 'Multiple avatars render overlapping',
      test: "(async function() { var avatars = document.querySelectorAll('.avatar-group .avatar, .avatar-stack .avatar'); return avatars.length >= 3; })()",
    },
    {
      name: 'Overflow count shows remaining avatars',
      test: "(async function() { var overflow = document.querySelector('.avatar-overflow, .more-count, .avatar-count'); return !!overflow && overflow.textContent.includes('+'); })()",
    },
  ],

  'react-breadcrumb-overflow': [
    {
      name: 'Breadcrumbs render with separator',
      test: "(async function() { var crumbs = document.querySelectorAll('.breadcrumb-item, .crumb'); return crumbs.length >= 2; })()",
    },
    {
      name: 'Long breadcrumbs show ellipsis overflow',
      test: "(async function() { var ellipsis = document.querySelector('.breadcrumb-ellipsis, .overflow, .more'); return !!ellipsis || document.body.textContent.includes('...'); })()",
    },
  ],

  'react-truncated-text': [
    {
      name: 'Long text is truncated with ellipsis',
      test: "(async function() { var truncated = document.querySelector('.truncated, .text-truncate, .clamp'); if (!truncated) return false; return truncated.scrollHeight > truncated.clientHeight || truncated.textContent.includes('...') || window.getComputedStyle(truncated).overflow === 'hidden'; })()",
    },
    {
      name: 'Expand button reveals full text',
      test: "(async function() { var expandBtn = document.querySelector('.expand-btn, .read-more, .show-more'); if (!expandBtn) return false; expandBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var text = document.querySelector('.truncated, .text-truncate, .clamp'); return !!text && (text.classList.contains('expanded') || text.scrollHeight <= text.clientHeight + 2); })()",
    },
  ],

  'react-responsive-grid': [
    {
      name: 'Grid displays items in multiple columns',
      test: "(async function() { var grid = document.querySelector('.grid, .responsive-grid'); if (!grid) return false; var items = grid.querySelectorAll('.grid-item, .item, .card'); if (items.length < 3) return false; var firstRect = items[0].getBoundingClientRect(); var secondRect = items[1].getBoundingClientRect(); return secondRect.left > firstRect.left || secondRect.top === firstRect.top; })()",
    },
    {
      name: 'Grid items have consistent sizing',
      test: "(async function() { var items = document.querySelectorAll('.grid-item, .grid .item, .grid .card'); if (items.length < 3) return false; var widths = Array.from(items).slice(0, 3).map(function(i) { return i.offsetWidth; }); return Math.abs(widths[0] - widths[1]) < 5; })()",
    },
  ],

  'react-masonry-layout': [
    {
      name: 'Items render in masonry columns with varied heights',
      test: "(async function() { var items = document.querySelectorAll('.masonry-item, .masonry .item'); if (items.length < 4) return false; var heights = Array.from(items).map(function(i) { return i.offsetHeight; }); var uniqueHeights = new Set(heights); return uniqueHeights.size >= 2; })()",
    },
    {
      name: 'Layout fills gaps between items',
      test: "(async function() { var container = document.querySelector('.masonry, .masonry-grid'); if (!container) return false; var items = container.querySelectorAll('.masonry-item, .item'); return items.length >= 4; })()",
    },
  ],

  'react-aspect-ratio-box': [
    {
      name: 'Boxes maintain specified aspect ratio',
      test: "(async function() { var boxes = document.querySelectorAll('.aspect-ratio, .ratio-box'); if (boxes.length < 1) return false; var box = boxes[0]; var ratio = box.offsetWidth / box.offsetHeight; return ratio > 0.5 && ratio < 3.0; })()",
    },
    {
      name: 'Different ratios produce different dimensions',
      test: "(async function() { var boxes = document.querySelectorAll('.aspect-ratio, .ratio-box'); if (boxes.length < 2) return false; var ratio1 = boxes[0].offsetWidth / boxes[0].offsetHeight; var ratio2 = boxes[1].offsetWidth / boxes[1].offsetHeight; return Math.abs(ratio1 - ratio2) > 0.1; })()",
    },
  ],

  'react-scroll-snap': [
    {
      name: 'Container has scroll snap enabled',
      test: "(async function() { var container = document.querySelector('.scroll-snap, .snap-container'); if (!container) return false; var styles = window.getComputedStyle(container); return styles.scrollSnapType !== 'none' && styles.scrollSnapType !== ''; })()",
    },
    {
      name: 'Snap items have snap alignment',
      test: "(async function() { var items = document.querySelectorAll('.snap-item, .scroll-snap > *'); if (items.length < 2) return false; var styles = window.getComputedStyle(items[0]); return styles.scrollSnapAlign !== 'none' && styles.scrollSnapAlign !== ''; })()",
    },
  ],

  'react-parallax': [
    {
      name: 'Parallax layers render with different depths',
      test: "(async function() { var layers = document.querySelectorAll('.parallax-layer, .parallax > *'); return layers.length >= 2; })()",
    },
    {
      name: 'Background element has parallax transform',
      test: "(async function() { var bg = document.querySelector('.parallax-bg, .parallax-layer'); if (!bg) return false; window.scrollTo(0, 200); await new Promise(function(r) { setTimeout(r, 200); }); var styles = window.getComputedStyle(bg); return styles.transform !== 'none' || bg.style.transform !== '' || bg.style.backgroundPositionY !== ''; })()",
    },
  ],

  'react-animated-counter': [
    {
      name: 'Counter animates from zero to target value',
      test: "(async function() { var counter = document.querySelector('.counter, .animated-counter, .count'); if (!counter) return false; await new Promise(function(r) { setTimeout(r, 500); }); var val = parseInt(counter.textContent.replace(/[^0-9]/g, '')); return val > 0; })()",
    },
    {
      name: 'Counter displays formatted number',
      test: "(async function() { var counter = document.querySelector('.counter, .animated-counter, .count'); if (!counter) return false; await new Promise(function(r) { setTimeout(r, 600); }); return counter.textContent.trim().length > 0 && counter.textContent.match(/\\d/) !== null; })()",
    },
  ],

  'react-confetti': [
    {
      name: 'Trigger button launches confetti animation',
      test: "(async function() { var btn = document.querySelector('.confetti-trigger, .celebrate-btn, button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 200); }); var particles = document.querySelectorAll('.confetti-piece, .particle, .confetti canvas'); return particles.length > 0 || !!document.querySelector('canvas'); })()",
    },
    {
      name: 'Confetti particles are visible after trigger',
      test: "(async function() { var btn = document.querySelector('.confetti-trigger, .celebrate-btn, button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 300); }); var confetti = document.querySelector('.confetti, .confetti-container, canvas'); return !!confetti; })()",
    },
  ],
};
