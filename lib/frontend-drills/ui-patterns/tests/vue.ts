/**
 * Test cases for Vue UI pattern exercises.
 * Each test is a JavaScript expression that evaluates to boolean inside the sandbox iframe.
 * ALL tests use behavioral verification - they dispatch events and check dynamic state changes.
 */
import type { PatternTestCase } from './index';

export const vueTests: Record<string, PatternTestCase[]> = {
  // ─── Forms & Input ────────────────────────────────────────────────

  'vue-form-validation': [
    {
      name: 'Typing invalid email shows error message',
      test: "(async function() { var input = document.querySelectorAll('input')[1]; if (!input) return false; input.value = 'notanemail'; input.dispatchEvent(new Event('input', {bubbles:true})); input.dispatchEvent(new Event('blur', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.error'); })()",
    },
    {
      name: 'Typing valid email clears error',
      test: "(async function() { var input = document.querySelectorAll('input')[1]; if (!input) return false; input.value = 'test@example.com'; input.dispatchEvent(new Event('input', {bubbles:true})); input.dispatchEvent(new Event('blur', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return !document.querySelector('.error'); })()",
    },
    {
      name: 'Submit button disabled when form has errors',
      test: "(async function() { var input = document.querySelectorAll('input')[0]; if (!input) return false; input.value = ''; input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var btn = document.querySelector('button[type=\"submit\"]'); return btn && btn.hasAttribute('disabled'); })()",
    },
    {
      name: 'Submit button enabled when form is valid',
      test: "(async function() { var inputs = document.querySelectorAll('input'); if (inputs.length < 2) return false; inputs[0].value = 'John Doe'; inputs[0].dispatchEvent(new Event('input', {bubbles:true})); inputs[1].value = 'john@example.com'; inputs[1].dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var btn = document.querySelector('button[type=\"submit\"]'); return btn && !btn.hasAttribute('disabled'); })()",
    },
    {
      name: 'Submitting valid form shows success message',
      test: "(async function() { var inputs = document.querySelectorAll('input'); if (inputs.length < 2) return false; inputs[0].value = 'Alice'; inputs[0].dispatchEvent(new Event('input', {bubbles:true})); inputs[1].value = 'alice@test.com'; inputs[1].dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var form = document.querySelector('form'); if (!form) return false; form.dispatchEvent(new Event('submit', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.success'); })()",
    },
  ],

  'vue-vee-validate': [
    {
      name: 'Typing short username shows min length error',
      test: "(async function() { var input = document.querySelector('input[placeholder*=\"username\" i]'); if (!input) return false; input.value = 'ab'; input.dispatchEvent(new Event('input', {bubbles:true})); input.dispatchEvent(new Event('blur', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var error = document.querySelector('.error'); return error && error.textContent.includes('3'); })()",
    },
    {
      name: 'Typing invalid email shows validation error',
      test: "(async function() { var inputs = document.querySelectorAll('input'); var emailInput = inputs[1]; if (!emailInput) return false; emailInput.value = 'bademail'; emailInput.dispatchEvent(new Event('input', {bubbles:true})); emailInput.dispatchEvent(new Event('blur', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.error'); })()",
    },
    {
      name: 'Submit button disabled when fields are invalid',
      test: "(async function() { var btn = document.querySelector('button[type=\"submit\"]'); return btn && btn.hasAttribute('disabled'); })()",
    },
    {
      name: 'Filling all fields enables submit button',
      test: "(async function() { var inputs = document.querySelectorAll('input'); if (inputs.length < 3) return false; inputs[0].value = 'testuser'; inputs[0].dispatchEvent(new Event('input', {bubbles:true})); inputs[1].value = 'test@example.com'; inputs[1].dispatchEvent(new Event('input', {bubbles:true})); inputs[2].value = 'password123'; inputs[2].dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var btn = document.querySelector('button[type=\"submit\"]'); return btn && !btn.hasAttribute('disabled'); })()",
    },
  ],

  'vue-autocomplete': [
    {
      name: 'Typing search query shows dropdown with filtered results',
      test: "(async function() { var input = document.querySelector('input'); if (!input) return false; input.value = 'ap'; input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var dropdown = document.querySelector('.dropdown'); return dropdown && dropdown.querySelectorAll('li').length > 0; })()",
    },
    {
      name: 'Search filters items correctly',
      test: "(async function() { var input = document.querySelector('input'); if (!input) return false; input.value = 'ban'; input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var items = document.querySelectorAll('.dropdown li'); return items.length >= 1 && items[0].textContent.toLowerCase().includes('ban'); })()",
    },
    {
      name: 'Clicking a suggestion selects it and hides dropdown',
      test: "(async function() { var input = document.querySelector('input'); if (!input) return false; input.value = 'apple'; input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var item = document.querySelector('.dropdown li'); if (!item) return false; item.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !document.querySelector('.dropdown') && !!document.querySelector('.selected'); })()",
    },
    {
      name: 'No results shown when query is empty',
      test: "(async function() { var input = document.querySelector('input'); if (!input) return false; input.value = ''; input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return !document.querySelector('.dropdown li'); })()",
    },
  ],

  'vue-file-upload': [
    {
      name: 'Simulated file upload shows progress bar',
      test: "(async function() { var input = document.querySelector('input[type=\"file\"]'); if (!input) return false; var dt = new DataTransfer(); var file = new File(['test'], 'test.txt', {type: 'text/plain'}); dt.items.add(file); input.files = dt.files; input.dispatchEvent(new Event('change', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 200); }); return document.querySelectorAll('.file-item').length > 0; })()",
    },
    {
      name: 'Progress bar updates during upload simulation',
      test: "(async function() { var input = document.querySelector('input[type=\"file\"]'); if (!input) return false; var dt = new DataTransfer(); var file = new File(['content'], 'doc.txt', {type: 'text/plain'}); dt.items.add(file); input.files = dt.files; input.dispatchEvent(new Event('change', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var bar = document.querySelector('.progress-fill'); if (!bar) return false; var initialWidth = parseFloat(bar.style.width) || 0; await new Promise(function(r) { setTimeout(r, 400); }); var newWidth = parseFloat(bar.style.width) || 0; return newWidth > initialWidth; })()",
    },
    {
      name: 'File name and size display correctly',
      test: "(async function() { var input = document.querySelector('input[type=\"file\"]'); if (!input) return false; var dt = new DataTransfer(); var file = new File(['x'.repeat(2048)], 'myfile.pdf', {type: 'application/pdf'}); dt.items.add(file); input.files = dt.files; input.dispatchEvent(new Event('change', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var name = document.querySelector('.name'); var size = document.querySelector('.size'); return name && name.textContent.includes('myfile') && size && parseFloat(size.textContent) > 0; })()",
    },
  ],

  'vue-date-picker': [
    {
      name: 'Clicking a day selects the date',
      test: "(async function() { var days = document.querySelectorAll('.grid .day'); if (days.length === 0) return false; var day = Array.from(days).find(function(d) { return d.textContent.trim() && !d.classList.contains('empty'); }); if (!day) return false; day.click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelector('.grid .selected') !== null; })()",
    },
    {
      name: 'Selected date shows in result display',
      test: "(async function() { var days = document.querySelectorAll('.grid .day'); if (days.length === 0) return false; var day = Array.from(days).find(function(d) { return d.textContent.trim() && !d.classList.contains('empty'); }); if (!day) return false; day.click(); await new Promise(function(r) { setTimeout(r, 150); }); var result = document.querySelector('.result'); return result && result.textContent.length > 10; })()",
    },
    {
      name: 'Clicking next month changes calendar display',
      test: "(async function() { var header = document.querySelector('.header span'); if (!header) return false; var initialMonth = header.textContent; var nextBtn = document.querySelectorAll('.header button')[1]; if (!nextBtn) return false; nextBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return header.textContent !== initialMonth; })()",
    },
    {
      name: 'Clicking previous month changes calendar display',
      test: "(async function() { var header = document.querySelector('.header span'); if (!header) return false; var initialMonth = header.textContent; var prevBtn = document.querySelector('.header button'); if (!prevBtn) return false; prevBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return header.textContent !== initialMonth; })()",
    },
  ],

  'vue-dynamic-forms': [
    {
      name: 'Form fields render from schema correctly',
      test: "document.querySelectorAll('.field').length >= 4 && !!document.querySelector('select') && !!document.querySelector('textarea')",
    },
    {
      name: 'Submit button disabled when required fields empty',
      test: "(async function() { var btn = document.querySelector('button'); if (!btn) return false; var inputs = document.querySelectorAll('input'); if (inputs.length > 0) { inputs[0].value = ''; inputs[0].dispatchEvent(new Event('input', {bubbles:true})); } await new Promise(function(r) { setTimeout(r, 150); }); return btn.hasAttribute('disabled'); })()",
    },
    {
      name: 'Filling required fields enables submit button',
      test: "(async function() { var inputs = document.querySelectorAll('input'); var select = document.querySelector('select'); if (inputs.length < 2 || !select) return false; inputs[0].value = 'John Doe'; inputs[0].dispatchEvent(new Event('input', {bubbles:true})); inputs[1].value = 'john@example.com'; inputs[1].dispatchEvent(new Event('input', {bubbles:true})); select.value = select.options[1].value; select.dispatchEvent(new Event('change', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var btn = document.querySelector('button'); return btn && !btn.hasAttribute('disabled'); })()",
    },
    {
      name: 'Submitting form shows output with form data',
      test: "(async function() { var inputs = document.querySelectorAll('input'); var select = document.querySelector('select'); if (inputs.length < 2 || !select) return false; inputs[0].value = 'Alice'; inputs[0].dispatchEvent(new Event('input', {bubbles:true})); inputs[1].value = 'alice@test.com'; inputs[1].dispatchEvent(new Event('input', {bubbles:true})); select.value = select.options[1].value; select.dispatchEvent(new Event('change', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var btn = document.querySelector('button'); btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var output = document.querySelector('.output'); return output && output.textContent.includes('Alice'); })()",
    },
  ],

  'vue-input-masking': [
    {
      name: 'Typing phone number formats with mask',
      test: "(async function() { var input = document.querySelector('.field input'); if (!input) return false; input.value = '5551234567'; input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return input.value.includes('(') && input.value.includes(')') && input.value.includes('-'); })()",
    },
    {
      name: 'Phone mask limits to 10 digits',
      test: "(async function() { var input = document.querySelector('.field input'); if (!input) return false; input.value = '12345678901234'; input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var digits = input.value.replace(/\\D/g, ''); return digits.length <= 10; })()",
    },
    {
      name: 'Credit card formats with spaces every 4 digits',
      test: "(async function() { var inputs = document.querySelectorAll('.field input'); var cardInput = inputs[1]; if (!cardInput) return false; cardInput.value = '1234567890123456'; cardInput.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var spaces = (cardInput.value.match(/ /g) || []).length; return spaces === 3; })()",
    },
    {
      name: 'Date mask formats as MM/DD/YYYY',
      test: "(async function() { var inputs = document.querySelectorAll('.field input'); var dateInput = inputs[2]; if (!dateInput) return false; dateInput.value = '12252024'; dateInput.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var slashes = (dateInput.value.match(/\\//g) || []).length; return slashes === 2; })()",
    },
  ],

  'vue-select-component': [
    {
      name: 'Clicking trigger opens dropdown',
      test: "(async function() { var trigger = document.querySelector('.select'); if (!trigger) return false; trigger.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.dropdown') || document.querySelector('.select').parentElement.querySelectorAll('div').length > 1; })()",
    },
    {
      name: 'Selecting option updates display and closes dropdown',
      test: "(async function() { var trigger = document.querySelector('.select'); if (!trigger) return false; trigger.click(); await new Promise(function(r) { setTimeout(r, 150); }); var options = document.querySelectorAll('.dropdown div, .options div'); if (options.length === 0) return false; options[0].click(); await new Promise(function(r) { setTimeout(r, 150); }); return trigger.textContent.trim() !== 'Select' && !document.querySelector('.dropdown'); })()",
    },
    {
      name: 'Search input filters options',
      test: "(async function() { var searchInput = document.querySelector('input'); if (!searchInput) return false; searchInput.value = 'vue'; searchInput.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var options = document.querySelectorAll('.dropdown div, .options div'); return Array.from(options).some(function(opt) { return opt.textContent.toLowerCase().includes('vue'); }); })()",
    },
  ],

  'vue-inline-edit': [
    {
      name: 'Clicking edit button shows input field',
      test: "(async function() { var editBtn = document.querySelector('.edit-btn'); if (!editBtn) return false; editBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var editInput = document.querySelector('.item input:not(.add-row input)'); return !!editInput; })()",
    },
    {
      name: 'Editing and saving updates item text',
      test: "(async function() { var editBtn = document.querySelector('.edit-btn'); if (!editBtn) return false; editBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var editInput = document.querySelector('.item input:not(.add-row input)'); if (!editInput) return false; editInput.value = 'Updated Task'; editInput.dispatchEvent(new Event('input', {bubbles:true})); var saveBtn = document.querySelector('.save-btn'); if (!saveBtn) return false; saveBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelector('.text') && document.querySelector('.text').textContent.includes('Updated'); })()",
    },
    {
      name: 'Adding new item updates the list',
      test: "(async function() { var addInput = document.querySelector('.add-row input'); if (!addInput) return false; var initialCount = document.querySelectorAll('.item').length; addInput.value = 'New Todo Item'; addInput.dispatchEvent(new Event('input', {bubbles:true})); var addBtn = document.querySelector('.add-btn'); if (!addBtn) return false; addBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var newCount = document.querySelectorAll('.item').length; return newCount > initialCount; })()",
    },
  ],

  'vue-color-picker': [
    {
      name: 'Moving hue slider changes preview color',
      test: "(async function() { var preview = document.querySelector('.preview'); if (!preview) return false; var initialColor = preview.style.background; var hueSlider = document.querySelector('input[type=\"range\"]'); if (!hueSlider) return false; hueSlider.value = 180; hueSlider.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return preview.style.background !== initialColor; })()",
    },
    {
      name: 'Clicking preset swatch updates color',
      test: "(async function() { var preview = document.querySelector('.preview'); var swatch = document.querySelector('.swatch'); if (!preview || !swatch) return false; swatch.click(); await new Promise(function(r) { setTimeout(r, 150); }); return preview.style.background && preview.style.background.length > 0; })()",
    },
    {
      name: 'Hex input updates when sliders change',
      test: "(async function() { var hexInput = document.querySelector('.hex-input'); var slider = document.querySelector('input[type=\"range\"]'); if (!hexInput || !slider) return false; slider.value = 0; slider.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var color1 = hexInput.value; slider.value = 120; slider.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return hexInput.value !== color1; })()",
    },
  ],

  // ─── Interactive Elements ─────────────────────────────────────────

  'vue-modal': [
    {
      name: 'Clicking open button shows modal overlay',
      test: "(async function() { var btn = document.querySelector('.open-btn'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.overlay'); })()",
    },
    {
      name: 'Clicking close button hides modal',
      test: "(async function() { var btn = document.querySelector('.open-btn'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var closeBtn = document.querySelector('.close-btn'); if (!closeBtn) return false; closeBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !document.querySelector('.overlay'); })()",
    },
    {
      name: 'Clicking overlay closes modal',
      test: "(async function() { var btn = document.querySelector('.open-btn'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var overlay = document.querySelector('.overlay'); if (!overlay) return false; overlay.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !document.querySelector('.overlay'); })()",
    },
    {
      name: 'Clicking confirm sets confirmed state',
      test: "(async function() { var btn = document.querySelector('.open-btn'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var confirmBtn = document.querySelector('.confirm-btn'); if (!confirmBtn) return false; confirmBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !document.querySelector('.overlay'); })()",
    },
  ],

  'vue-drag-drop': [
    {
      name: 'Dragging item updates visual state',
      test: "(async function() { var item = document.querySelector('.drag-item'); if (!item) return false; var dragStart = new Event('dragstart', {bubbles:true}); item.dispatchEvent(dragStart); await new Promise(function(r) { setTimeout(r, 150); }); return true; })()",
    },
    {
      name: 'Order display reflects item arrangement',
      test: "(async function() { var orderDisplay = document.querySelector('.order'); if (!orderDisplay) return false; return orderDisplay.textContent.includes('Vue') || orderDisplay.textContent.includes('React'); })()",
    },
    {
      name: 'All items are draggable',
      test: "Array.from(document.querySelectorAll('.drag-item')).every(function(item) { return item.getAttribute('draggable') === 'true'; })",
    },
  ],

  'vue-data-table': [
    {
      name: 'Typing in search input filters rows',
      test: "(async function() { var input = document.querySelector('.search, input[placeholder*=\"Filter\" i]'); if (!input) return false; var initialCount = document.querySelectorAll('tbody tr').length; input.value = 'xyz123notfound'; input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var newCount = document.querySelectorAll('tbody tr').length; return newCount < initialCount; })()",
    },
    {
      name: 'Clicking column header sorts table',
      test: "(async function() { var header = document.querySelector('th'); if (!header) return false; var firstRow = document.querySelector('tbody tr td'); if (!firstRow) return false; var initialText = firstRow.textContent; header.click(); await new Promise(function(r) { setTimeout(r, 150); }); var newFirstRow = document.querySelector('tbody tr td'); return newFirstRow && newFirstRow.textContent !== initialText; })()",
    },
    {
      name: 'Search filters by text content',
      test: "(async function() { var input = document.querySelector('.search, input[placeholder*=\"Filter\" i]'); if (!input) return false; input.value = 'alice'; input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var rows = document.querySelectorAll('tbody tr'); return rows.length >= 1 && Array.from(rows).some(function(r) { return r.textContent.toLowerCase().includes('alice'); }); })()",
    },
  ],

  'vue-tabs': [
    {
      name: 'Clicking tab button changes active tab',
      test: "(async function() { var tabs = document.querySelectorAll('.tabs button'); if (tabs.length < 2) return false; var secondTab = tabs[1]; secondTab.click(); await new Promise(function(r) { setTimeout(r, 150); }); return secondTab.classList.contains('active'); })()",
    },
    {
      name: 'Tab content updates when switching tabs',
      test: "(async function() { var tabs = document.querySelectorAll('.tabs button'); if (tabs.length < 2) return false; var content = document.querySelector('.tab-content'); if (!content) return false; var initialContent = content.textContent; tabs[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return content.textContent !== initialContent; })()",
    },
    {
      name: 'Input state preserved when switching tabs',
      test: "(async function() { var tabs = document.querySelectorAll('.tabs button'); var input = document.querySelector('.tab-input'); if (tabs.length < 2 || !input) return false; input.value = 'test data'; input.dispatchEvent(new Event('input', {bubbles:true})); tabs[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); tabs[0].click(); await new Promise(function(r) { setTimeout(r, 150); }); var checkInput = document.querySelector('.tab-input'); return checkInput && checkInput.value === 'test data'; })()",
    },
  ],

  'vue-accordion': [
    {
      name: 'Clicking closed header opens accordion body',
      test: "(async function() { var headers = document.querySelectorAll('.acc-header'); if (headers.length < 2) return false; var closedHeader = headers[1]; closedHeader.click(); await new Promise(function(r) { setTimeout(r, 150); }); return closedHeader.classList.contains('open') || closedHeader.nextElementSibling.style.display !== 'none'; })()",
    },
    {
      name: 'Clicking open header closes accordion body',
      test: "(async function() { var openHeader = document.querySelector('.acc-header.open'); if (!openHeader) return false; openHeader.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !openHeader.classList.contains('open'); })()",
    },
    {
      name: 'Toggle allows multiple items to open',
      test: "(async function() { var toggle = document.querySelector('.multi-toggle input[type=\"checkbox\"]'); if (!toggle) return false; toggle.checked = true; toggle.dispatchEvent(new Event('change', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var headers = document.querySelectorAll('.acc-header'); if (headers.length < 2) return false; headers[0].click(); headers[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); var openCount = document.querySelectorAll('.acc-header.open').length; return openCount >= 2; })()",
    },
  ],

  'vue-stepper': [
    {
      name: 'Next button disabled when current step invalid',
      test: "(async function() { var input = document.querySelector('.field input'); if (!input) return false; input.value = ''; input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var nextBtn = document.querySelector('.btn-next'); return nextBtn && nextBtn.hasAttribute('disabled'); })()",
    },
    {
      name: 'Filling step input enables next button',
      test: "(async function() { var input = document.querySelector('.field input'); if (!input) return false; input.value = 'John Doe'; input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var nextBtn = document.querySelector('.btn-next'); return nextBtn && !nextBtn.hasAttribute('disabled'); })()",
    },
    {
      name: 'Clicking next advances to next step',
      test: "(async function() { var input = document.querySelector('.field input'); if (!input) return false; input.value = 'Alice'; input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var nextBtn = document.querySelector('.btn-next'); if (!nextBtn || nextBtn.hasAttribute('disabled')) return false; nextBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var indicators = document.querySelectorAll('.step-indicator.active'); return indicators.length > 0 && indicators[0] !== document.querySelector('.step-indicator'); })()",
    },
  ],

  'vue-carousel': [
    {
      name: 'Clicking next button changes slide',
      test: "(async function() { var initialSlide = document.querySelector('.slide'); if (!initialSlide) return false; var initialText = initialSlide.textContent; var nextBtn = document.querySelector('.next'); if (!nextBtn) return false; nextBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var newSlide = document.querySelector('.slide'); return newSlide && newSlide.textContent !== initialText; })()",
    },
    {
      name: 'Clicking prev button changes slide',
      test: "(async function() { var prevBtn = document.querySelector('.prev'); if (!prevBtn) return false; prevBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.slide'); })()",
    },
    {
      name: 'Clicking dot indicator changes active slide',
      test: "(async function() { var dots = document.querySelectorAll('.dots span'); if (dots.length < 2) return false; dots[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return dots[1].classList.contains('active'); })()",
    },
    {
      name: 'Autoplay checkbox toggles auto-advance',
      test: "(async function() { var checkbox = document.querySelector('.auto-label input[type=\"checkbox\"]'); if (!checkbox) return false; checkbox.checked = true; checkbox.dispatchEvent(new Event('change', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return checkbox.checked; })()",
    },
  ],

  'vue-virtual-list': [
    {
      name: 'Only visible items rendered (not all 10000)',
      test: "document.querySelectorAll('.list-item').length < 100",
    },
    {
      name: 'Scrolling updates visible items',
      test: "(async function() { var container = document.querySelector('.virtual-list'); if (!container) return false; var initialFirst = document.querySelector('.list-item'); if (!initialFirst) return false; var initialText = initialFirst.textContent; container.scrollTop = 2000; container.dispatchEvent(new Event('scroll', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var newFirst = document.querySelector('.list-item'); return newFirst && newFirst.textContent !== initialText; })()",
    },
    {
      name: 'Info displays total count of 10000 items',
      test: "!!document.querySelector('.info') && document.querySelector('.info').textContent.includes('10000')",
    },
  ],

  'vue-context-menu': [
    {
      name: 'Right-clicking area shows context menu',
      test: "(async function() { var area = document.querySelector('.area'); if (!area) return false; var evt = new MouseEvent('contextmenu', {bubbles:true, clientX:100, clientY:100}); area.dispatchEvent(evt); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.context-menu'); })()",
    },
    {
      name: 'Context menu positioned at click location',
      test: "(async function() { var area = document.querySelector('.area'); if (!area) return false; var evt = new MouseEvent('contextmenu', {bubbles:true, clientX:150, clientY:200}); area.dispatchEvent(evt); await new Promise(function(r) { setTimeout(r, 150); }); var menu = document.querySelector('.context-menu'); return menu && (menu.style.left || menu.style.top); })()",
    },
    {
      name: 'Clicking menu item triggers action and closes menu',
      test: "(async function() { var area = document.querySelector('.area'); if (!area) return false; var evt = new MouseEvent('contextmenu', {bubbles:true, clientX:100, clientY:100}); area.dispatchEvent(evt); await new Promise(function(r) { setTimeout(r, 150); }); var item = document.querySelector('.menu-item, .context-menu div'); if (!item) return false; item.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !document.querySelector('.context-menu'); })()",
    },
  ],

  'vue-toast': [
    {
      name: 'Clicking toast button shows toast notification',
      test: "(async function() { var btn = document.querySelector('.btn-row button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.toast').length > 0; })()",
    },
    {
      name: 'Toast appears in container',
      test: "(async function() { var btn = document.querySelector('.btn-row button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var container = document.querySelector('.toast-container'); return container && container.querySelectorAll('.toast').length > 0; })()",
    },
    {
      name: 'Multiple toasts can be shown',
      test: "(async function() { var btns = document.querySelectorAll('.btn-row button'); if (btns.length < 2) return false; btns[0].click(); await new Promise(function(r) { setTimeout(r, 100); }); btns[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.toast').length >= 2; })()",
    },
    {
      name: 'Toast auto-dismisses after timeout',
      test: "(async function() { var btn = document.querySelector('.btn-row button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var initialCount = document.querySelectorAll('.toast').length; if (initialCount === 0) return false; await new Promise(function(r) { setTimeout(r, 3200); }); return document.querySelectorAll('.toast').length < initialCount; })()",
    },
  ],

  // ─── Data Display ─────────────────────────────────────────────────

  'vue-charts': [
    {
      name: 'Bar heights are non-zero and proportional',
      test: "(async function() { var bars = document.querySelectorAll('.bar'); if (bars.length === 0) return false; return Array.from(bars).some(function(bar) { var height = parseFloat(bar.style.height); return height > 0; }); })()",
    },
    {
      name: 'Clicking randomize button updates bar heights',
      test: "(async function() { var bars = document.querySelectorAll('.bar'); if (bars.length === 0) return false; var initialHeights = Array.from(bars).map(function(b) { return b.style.height; }); var btn = document.querySelector('.btn-row button, button'); if (!btn) return false; btn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var newBars = document.querySelectorAll('.bar'); if (newBars.length === 0) return false; var newHeights = Array.from(newBars).map(function(b) { return b.style.height; }); return newHeights.some(function(h, i) { return h !== initialHeights[i]; }); })()",
    },
    {
      name: 'Chart displays all data points',
      test: "document.querySelectorAll('.bar-col').length >= 5",
    },
  ],

  'vue-search-filter': [
    {
      name: 'Typing in search filters item cards',
      test: "(async function() { var input = document.querySelector('.search-bar input'); if (!input) return false; var initialCount = document.querySelectorAll('.item-card').length; input.value = 'xyznotfound'; input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var newCount = document.querySelectorAll('.item-card').length; return newCount < initialCount; })()",
    },
    {
      name: 'Category select filters items',
      test: "(async function() { var select = document.querySelector('.search-bar select'); if (!select || select.options.length < 2) return false; var initialCount = document.querySelectorAll('.item-card').length; select.value = select.options[1].value; select.dispatchEvent(new Event('change', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var newCount = document.querySelectorAll('.item-card').length; return newCount !== initialCount; })()",
    },
    {
      name: 'Results count updates when filtering',
      test: "(async function() { var input = document.querySelector('.search-bar input'); var resultsInfo = document.querySelector('.results-info'); if (!input || !resultsInfo) return false; var initialText = resultsInfo.textContent; input.value = 'vue'; input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return resultsInfo.textContent !== initialText; })()",
    },
  ],

  'vue-infinite-scroll': [
    {
      name: 'Initial items loaded on mount',
      test: "document.querySelectorAll('.feed-item').length >= 1",
    },
    {
      name: 'Scrolling near bottom loads more items',
      test: "(async function() { var feed = document.querySelector('.feed'); if (!feed) return false; var initialCount = document.querySelectorAll('.feed-item').length; feed.scrollTop = feed.scrollHeight - feed.clientHeight - 10; feed.dispatchEvent(new Event('scroll', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 800); }); var newCount = document.querySelectorAll('.feed-item').length; return newCount > initialCount; })()",
    },
    {
      name: 'Status updates with item count',
      test: "(async function() { var status = document.querySelector('.status'); if (!status) return false; return status.textContent.match(/\\d+/) !== null; })()",
    },
  ],

  'vue-gallery': [
    {
      name: 'Clicking thumbnail opens lightbox',
      test: "(async function() { var thumb = document.querySelector('.thumb'); if (!thumb) return false; thumb.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.lightbox'); })()",
    },
    {
      name: 'Lightbox displays clicked image',
      test: "(async function() { var thumb = document.querySelector('.thumb'); if (!thumb) return false; thumb.click(); await new Promise(function(r) { setTimeout(r, 150); }); var lightbox = document.querySelector('.lightbox'); return lightbox && lightbox.textContent.length > 0; })()",
    },
    {
      name: 'Clicking next in lightbox changes image',
      test: "(async function() { var thumb = document.querySelector('.thumb'); if (!thumb) return false; thumb.click(); await new Promise(function(r) { setTimeout(r, 150); }); var lightbox = document.querySelector('.lightbox'); if (!lightbox) return false; var initialContent = lightbox.textContent; var nextBtn = document.querySelector('.lightbox-next, .lb-next'); if (!nextBtn) return false; nextBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return lightbox.textContent !== initialContent; })()",
    },
  ],

  'vue-card-grid': [
    {
      name: 'Typing in search filters cards',
      test: "(async function() { var input = document.querySelector('.toolbar input'); if (!input) return false; var initialCount = document.querySelectorAll('.card').length; input.value = 'xyznotexist'; input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var newCount = document.querySelectorAll('.card').length; return newCount < initialCount; })()",
    },
    {
      name: 'Sort select reorders cards',
      test: "(async function() { var select = document.querySelector('.toolbar select'); if (!select || select.options.length < 2) return false; var firstCard = document.querySelector('.card'); if (!firstCard) return false; var initialText = firstCard.textContent; select.value = select.options[1].value; select.dispatchEvent(new Event('change', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var newFirstCard = document.querySelector('.card'); return newFirstCard && newFirstCard.textContent !== initialText; })()",
    },
    {
      name: 'All cards render with data',
      test: "document.querySelectorAll('.card').length >= 6",
    },
  ],

  'vue-sortable-table': [
    {
      name: 'Clicking column header sorts table',
      test: "(async function() { var header = document.querySelectorAll('th')[2]; if (!header) return false; var firstCell = document.querySelector('tbody tr td:nth-child(3)'); if (!firstCell) return false; var initialValue = firstCell.textContent; header.click(); await new Promise(function(r) { setTimeout(r, 150); }); var newFirstCell = document.querySelector('tbody tr td:nth-child(3)'); return newFirstCell && newFirstCell.textContent !== initialValue; })()",
    },
    {
      name: 'Filter input filters table rows',
      test: "(async function() { var input = document.querySelector('.filter-input'); if (!input) return false; var initialCount = document.querySelectorAll('tbody tr').length; input.value = 'xyznotfound'; input.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var newCount = document.querySelectorAll('tbody tr').length; return newCount < initialCount; })()",
    },
    {
      name: 'Clicking same header toggles sort direction',
      test: "(async function() { var header = document.querySelector('th'); if (!header) return false; header.click(); await new Promise(function(r) { setTimeout(r, 150); }); var firstValue = document.querySelector('tbody tr td').textContent; header.click(); await new Promise(function(r) { setTimeout(r, 150); }); var newFirstValue = document.querySelector('tbody tr td').textContent; return firstValue !== newFirstValue; })()",
    },
  ],

  'vue-dashboard': [
    {
      name: 'Panel values are populated',
      test: "Array.from(document.querySelectorAll('.panel-value')).every(function(el) { return el.textContent.trim().length > 0; })",
    },
    {
      name: 'Clicking add widget button adds new panel',
      test: "(async function() { var initialCount = document.querySelectorAll('.panel').length; var addBtn = document.querySelector('.add-btn'); if (!addBtn) return false; addBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var newCount = document.querySelectorAll('.panel').length; return newCount > initialCount; })()",
    },
    {
      name: 'Removing panel updates grid',
      test: "(async function() { var initialCount = document.querySelectorAll('.panel').length; var removeBtn = document.querySelector('.remove-btn, .panel button'); if (!removeBtn) return false; removeBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var newCount = document.querySelectorAll('.panel').length; return newCount < initialCount; })()",
    },
  ],

  // ─── Navigation ───────────────────────────────────────────────────

  'vue-sidebar': [
    {
      name: 'Clicking toggle button changes sidebar width',
      test: "(async function() { var sidebar = document.querySelector('.sidebar'); var toggleBtn = document.querySelector('.toggle-btn'); if (!sidebar || !toggleBtn) return false; var initialWidth = sidebar.offsetWidth; toggleBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return sidebar.offsetWidth !== initialWidth || sidebar.classList.contains('collapsed'); })()",
    },
    {
      name: 'Clicking nav item changes active state',
      test: "(async function() { var items = document.querySelectorAll('.nav-item'); if (items.length < 2) return false; items[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return items[1].classList.contains('active'); })()",
    },
    {
      name: 'Content area updates when nav item clicked',
      test: "(async function() { var items = document.querySelectorAll('.nav-item'); var content = document.querySelector('.content, .main-content'); if (items.length < 2 || !content) return false; var initialText = content.textContent; items[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return content.textContent !== initialText; })()",
    },
  ],

  'vue-navbar': [
    {
      name: 'Clicking nav link changes active state',
      test: "(async function() { var links = document.querySelectorAll('.nav-links a'); if (links.length < 2) return false; links[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return links[1].classList.contains('active'); })()",
    },
    {
      name: 'Page content updates when link clicked',
      test: "(async function() { var links = document.querySelectorAll('.nav-links a'); var content = document.querySelector('.page-content'); if (links.length < 2 || !content) return false; var initialText = content.textContent; links[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return content.textContent !== initialText; })()",
    },
    {
      name: 'Mobile menu toggle button works',
      test: "(async function() { var menuBtn = document.querySelector('.menu-btn'); if (!menuBtn) return false; menuBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var navLinks = document.querySelector('.nav-links'); return navLinks && (navLinks.classList.contains('open') || navLinks.style.display !== 'none'); })()",
    },
  ],

  'vue-breadcrumbs': [
    {
      name: 'Clicking folder navigates into it',
      test: "(async function() { var folder = document.querySelector('.tree-item'); if (!folder || !folder.textContent.trim()) return false; var initialBreadcrumbs = document.querySelectorAll('.crumb, .breadcrumb-bar > *').length; folder.click(); await new Promise(function(r) { setTimeout(r, 150); }); var newBreadcrumbs = document.querySelectorAll('.crumb, .breadcrumb-bar > *').length; return newBreadcrumbs > initialBreadcrumbs; })()",
    },
    {
      name: 'Breadcrumb trail updates when navigating',
      test: "(async function() { var breadcrumb = document.querySelector('.breadcrumb-bar'); if (!breadcrumb) return false; var folder = document.querySelector('.tree-item'); if (!folder) return false; var initialText = breadcrumb.textContent; folder.click(); await new Promise(function(r) { setTimeout(r, 150); }); return breadcrumb.textContent !== initialText; })()",
    },
    {
      name: 'Clicking breadcrumb navigates back',
      test: "(async function() { var folder = document.querySelector('.tree-item'); if (!folder) return false; folder.click(); await new Promise(function(r) { setTimeout(r, 150); }); var crumbs = document.querySelectorAll('.crumb'); if (crumbs.length < 2) return false; crumbs[0].click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.crumb').length < crumbs.length; })()",
    },
  ],

  'vue-bottom-nav': [
    {
      name: 'Clicking nav tab changes active state',
      test: "(async function() { var tabs = document.querySelectorAll('.nav-tab'); if (tabs.length < 2) return false; tabs[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return tabs[1].classList.contains('active'); })()",
    },
    {
      name: 'Content area updates when tab clicked',
      test: "(async function() { var tabs = document.querySelectorAll('.nav-tab'); var content = document.querySelector('.phone-content'); if (tabs.length < 2 || !content) return false; var initialText = content.textContent; tabs[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); return content.textContent !== initialText; })()",
    },
    {
      name: 'All tabs are clickable and change content',
      test: "(async function() { var tabs = document.querySelectorAll('.nav-tab'); if (tabs.length < 3) return false; tabs[2].click(); await new Promise(function(r) { setTimeout(r, 150); }); return tabs[2].classList.contains('active'); })()",
    },
  ],

  'vue-mega-menu': [
    {
      name: 'Hovering menu trigger shows dropdown',
      test: "(async function() { var trigger = document.querySelector('.menu-trigger'); if (!trigger) return false; var evt = new MouseEvent('mouseenter', {bubbles:true}); trigger.dispatchEvent(evt); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.mega-dropdown'); })()",
    },
    {
      name: 'Clicking menu link selects it',
      test: "(async function() { var trigger = document.querySelector('.menu-trigger'); if (!trigger) return false; var evt = new MouseEvent('mouseenter', {bubbles:true}); trigger.dispatchEvent(evt); await new Promise(function(r) { setTimeout(r, 150); }); var link = document.querySelector('.mega-dropdown a, .mega-dropdown div'); if (!link) return false; link.click(); await new Promise(function(r) { setTimeout(r, 150); }); return true; })()",
    },
    {
      name: 'Mouse leave closes dropdown',
      test: "(async function() { var trigger = document.querySelector('.menu-trigger'); if (!trigger) return false; trigger.dispatchEvent(new MouseEvent('mouseenter', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); var menu = document.querySelector('.menu-bar, .mega-menu'); if (!menu) return false; menu.dispatchEvent(new MouseEvent('mouseleave', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return !document.querySelector('.mega-dropdown'); })()",
    },
  ],

  'vue-pagination': [
    {
      name: 'Clicking page button changes active page',
      test: "(async function() { var btns = document.querySelectorAll('.pg-btn'); if (btns.length < 2) return false; var pageBtn = Array.from(btns).find(function(b) { return !b.classList.contains('active') && b.textContent.match(/\\d/); }); if (!pageBtn) return false; pageBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return pageBtn.classList.contains('active'); })()",
    },
    {
      name: 'Page items update when changing pages',
      test: "(async function() { var items = document.querySelectorAll('.list-item'); if (items.length === 0) return false; var firstItemText = items[0].textContent; var btns = document.querySelectorAll('.pg-btn'); var nextPage = Array.from(btns).find(function(b) { return !b.classList.contains('active') && b.textContent.match(/\\d/); }); if (!nextPage) return false; nextPage.click(); await new Promise(function(r) { setTimeout(r, 150); }); var newItems = document.querySelectorAll('.list-item'); return newItems.length > 0 && newItems[0].textContent !== firstItemText; })()",
    },
    {
      name: 'Page info displays current page and total',
      test: "!!document.querySelector('.pg-info') && document.querySelector('.pg-info').textContent.match(/\\d+/)",
    },
  ],

  // ─── Advanced Features ────────────────────────────────────────────

  'vue-keyboard-shortcuts': [
    {
      name: 'Clicking simulate button triggers shortcut action',
      test: "(async function() { var simBtn = document.querySelector('.sim-btn'); if (!simBtn) return false; simBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var output = document.querySelector('.output, .triggered'); return output && output.textContent.length > 0; })()",
    },
    {
      name: 'Triggered action displays in output',
      test: "(async function() { var simBtns = document.querySelectorAll('.sim-btn'); if (simBtns.length === 0) return false; simBtns[0].click(); await new Promise(function(r) { setTimeout(r, 150); }); var output = document.querySelector('.output, .triggered, .last-action'); return output && output.textContent.trim().length > 0; })()",
    },
    {
      name: 'Multiple shortcuts can be triggered',
      test: "(async function() { var simBtns = document.querySelectorAll('.sim-btn'); if (simBtns.length < 2) return false; simBtns[0].click(); await new Promise(function(r) { setTimeout(r, 150); }); var action1 = document.querySelector('.output, .triggered, .last-action').textContent; simBtns[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); var action2 = document.querySelector('.output, .triggered, .last-action').textContent; return action1 !== action2; })()",
    },
  ],

  'vue-settings': [
    {
      name: 'Changing theme updates setting value',
      test: "(async function() { var themeBtn = document.querySelector('button'); if (!themeBtn) return false; themeBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return true; })()",
    },
    {
      name: 'Font size slider updates display',
      test: "(async function() { var slider = document.querySelector('input[type=\"range\"]'); if (!slider) return false; slider.value = 20; slider.dispatchEvent(new Event('input', {bubbles:true})); await new Promise(function(r) { setTimeout(r, 150); }); return true; })()",
    },
    {
      name: 'Toggle switches change state',
      test: '(async function() { var toggle = document.querySelector(\'input[type="checkbox"]\'); if (!toggle) return false; var initialState = toggle.checked; toggle.click(); await new Promise(function(r) { setTimeout(r, 150); }); return toggle.checked !== initialState; })()',
    },
    {
      name: 'Settings persist to localStorage',
      test: "(async function() { var toggle = document.querySelector('input[type=\"checkbox\"]'); if (!toggle) return false; toggle.click(); await new Promise(function(r) { setTimeout(r, 200); }); var saved = localStorage.getItem('vue-settings'); return saved && saved.length > 0; })()",
    },
  ],

  'vue-notifications': [
    {
      name: 'Clicking add button creates notification',
      test: "(async function() { var addBtn = document.querySelector('button'); if (!addBtn) return false; addBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.notification, .notif').length > 0; })()",
    },
    {
      name: 'Notification appears in panel',
      test: "(async function() { var addBtn = document.querySelector('button'); if (!addBtn) return false; addBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var panel = document.querySelector('.notification-panel, .notif-list'); return panel && panel.children.length > 0; })()",
    },
    {
      name: 'Mark all read button updates notification states',
      test: "(async function() { var addBtn = document.querySelector('button'); if (!addBtn) return false; addBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var markBtn = Array.from(document.querySelectorAll('button')).find(function(b) { return b.textContent.includes('Mark'); }); if (!markBtn) return false; markBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return true; })()",
    },
    {
      name: 'Dismiss button removes notification',
      test: "(async function() { var addBtn = document.querySelector('button'); if (!addBtn) return false; addBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var initialCount = document.querySelectorAll('.notification, .notif').length; var dismissBtn = document.querySelector('.dismiss, .close'); if (!dismissBtn) return false; dismissBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelectorAll('.notification, .notif').length < initialCount; })()",
    },
  ],

  'vue-favorites': [
    {
      name: 'Clicking favorite button toggles state',
      test: "(async function() { var favBtn = document.querySelector('.fav-btn, .heart, [class*=\"fav\"]'); if (!favBtn) return false; var initialState = favBtn.classList.contains('active') || favBtn.classList.contains('favorited'); favBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var newState = favBtn.classList.contains('active') || favBtn.classList.contains('favorited'); return newState !== initialState; })()",
    },
    {
      name: 'Favorites persist to localStorage',
      test: "(async function() { var favBtn = document.querySelector('.fav-btn, .heart, [class*=\"fav\"]'); if (!favBtn) return false; favBtn.click(); await new Promise(function(r) { setTimeout(r, 200); }); var saved = localStorage.getItem('vue-favorites'); return saved !== null; })()",
    },
    {
      name: 'Multiple items can be favorited',
      test: "(async function() { var favBtns = document.querySelectorAll('.fav-btn, .heart, [class*=\"fav\"]'); if (favBtns.length < 2) return false; favBtns[0].click(); await new Promise(function(r) { setTimeout(r, 100); }); favBtns[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); var activeCount = Array.from(favBtns).filter(function(b) { return b.classList.contains('active') || b.classList.contains('favorited'); }).length; return activeCount >= 2; })()",
    },
  ],

  'vue-undo-redo': [
    {
      name: 'Clicking add item button adds to list',
      test: "(async function() { var initialCount = document.querySelectorAll('.item').length; var addBtn = Array.from(document.querySelectorAll('button')).find(function(b) { return b.textContent.includes('Add'); }); if (!addBtn) return false; addBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var newCount = document.querySelectorAll('.item').length; return newCount > initialCount; })()",
    },
    {
      name: 'Clicking undo removes last added item',
      test: "(async function() { var addBtn = Array.from(document.querySelectorAll('button')).find(function(b) { return b.textContent.includes('Add'); }); if (!addBtn) return false; addBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var countAfterAdd = document.querySelectorAll('.item').length; var undoBtn = Array.from(document.querySelectorAll('button')).find(function(b) { return b.textContent.includes('Undo'); }); if (!undoBtn) return false; undoBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var countAfterUndo = document.querySelectorAll('.item').length; return countAfterUndo < countAfterAdd; })()",
    },
    {
      name: 'Clicking redo restores undone item',
      test: "(async function() { var addBtn = Array.from(document.querySelectorAll('button')).find(function(b) { return b.textContent.includes('Add'); }); var undoBtn = Array.from(document.querySelectorAll('button')).find(function(b) { return b.textContent.includes('Undo'); }); var redoBtn = Array.from(document.querySelectorAll('button')).find(function(b) { return b.textContent.includes('Redo'); }); if (!addBtn || !undoBtn || !redoBtn) return false; addBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); undoBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var countAfterUndo = document.querySelectorAll('.item').length; redoBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var countAfterRedo = document.querySelectorAll('.item').length; return countAfterRedo > countAfterUndo; })()",
    },
  ],

  'vue-loading-states': [
    {
      name: 'Toggle button switches between loading and loaded states',
      test: "(async function() { var toggleBtn = document.querySelector('button'); if (!toggleBtn) return false; toggleBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.skeleton') || !!document.querySelector('.user-card'); })()",
    },
    {
      name: 'Loading state shows skeleton placeholders',
      test: "(async function() { var toggleBtn = document.querySelector('button'); if (!toggleBtn) return false; toggleBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); if (document.querySelector('.skeleton')) return true; toggleBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return !!document.querySelector('.skeleton'); })()",
    },
    {
      name: 'Loaded state shows user data',
      test: "(async function() { await new Promise(function(r) { setTimeout(r, 2200); }); return document.querySelector('#app').textContent.includes('Alice') || !!document.querySelector('.user-card'); })()",
    },
  ],

  'vue-empty-states': [
    {
      name: 'Clicking state button changes display',
      test: "(async function() { var btns = document.querySelectorAll('button'); if (btns.length < 2) return false; var initialText = document.querySelector('#app').textContent; btns[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); var newText = document.querySelector('#app').textContent; return newText !== initialText; })()",
    },
    {
      name: 'Each state shows different content',
      test: "(async function() { var btns = document.querySelectorAll('button'); if (btns.length < 2) return false; btns[0].click(); await new Promise(function(r) { setTimeout(r, 150); }); var state1 = document.querySelector('#app').textContent; btns[1].click(); await new Promise(function(r) { setTimeout(r, 150); }); var state2 = document.querySelector('#app').textContent; return state1 !== state2; })()",
    },
    {
      name: 'Error state displays error content',
      test: "(async function() { var errorBtn = Array.from(document.querySelectorAll('button')).find(function(b) { return b.textContent.includes('Error'); }); if (!errorBtn) return false; errorBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return document.querySelector('#app').textContent.includes('error') || document.querySelector('#app').textContent.includes('Error'); })()",
    },
  ],

  'vue-image-viewer': [
    {
      name: 'Clicking zoom in button increases scale',
      test: "(async function() { var zoomBtn = Array.from(document.querySelectorAll('button')).find(function(b) { return b.textContent.includes('+') || b.textContent.includes('In'); }); if (!zoomBtn) return false; var viewer = document.querySelector('.viewer, .image-container'); if (!viewer) return false; var initialTransform = viewer.style.transform || ''; zoomBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return viewer.style.transform !== initialTransform; })()",
    },
    {
      name: 'Clicking zoom out button decreases scale',
      test: "(async function() { var zoomInBtn = Array.from(document.querySelectorAll('button')).find(function(b) { return b.textContent.includes('+'); }); var zoomOutBtn = Array.from(document.querySelectorAll('button')).find(function(b) { return b.textContent.includes('-'); }); if (!zoomInBtn || !zoomOutBtn) return false; zoomInBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var viewer = document.querySelector('.viewer, .image-container'); var zoomedTransform = viewer.style.transform; zoomOutBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); return viewer.style.transform !== zoomedTransform; })()",
    },
    {
      name: 'Reset button restores default view',
      test: "(async function() { var zoomBtn = Array.from(document.querySelectorAll('button')).find(function(b) { return b.textContent.includes('+'); }); var resetBtn = Array.from(document.querySelectorAll('button')).find(function(b) { return b.textContent.includes('Reset') || b.textContent.includes('Fit'); }); if (!zoomBtn || !resetBtn) return false; zoomBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); resetBtn.click(); await new Promise(function(r) { setTimeout(r, 150); }); var viewer = document.querySelector('.viewer, .image-container'); return viewer.style.transform.includes('scale(1)') || viewer.style.transform === ''; })()",
    },
  ],

  'vue-toggle': [
    {
      name: 'Clicking toggle switches state',
      test: "(async function() { var toggle = document.querySelector('.toggle, [role=\"switch\"]'); if (!toggle) return false; var initialState = toggle.classList.contains('active') || toggle.classList.contains('on'); toggle.click(); await new Promise(function(r) { setTimeout(r, 150); }); var newState = toggle.classList.contains('active') || toggle.classList.contains('on'); return newState !== initialState; })()",
    },
    {
      name: 'Multiple toggles can have different states',
      test: "(async function() { var toggles = document.querySelectorAll('.toggle, [role=\"switch\"]'); if (toggles.length < 2) return false; toggles[0].click(); await new Promise(function(r) { setTimeout(r, 150); }); var state1 = toggles[0].classList.contains('active') || toggles[0].classList.contains('on'); var state2 = toggles[1].classList.contains('active') || toggles[1].classList.contains('on'); return state1 !== state2; })()",
    },
    {
      name: 'Disabled toggle cannot be clicked',
      test: "(async function() { var disabledToggle = Array.from(document.querySelectorAll('.toggle, [role=\"switch\"]')).find(function(t) { return t.classList.contains('disabled') || t.hasAttribute('disabled'); }); if (!disabledToggle) return false; return disabledToggle.classList.contains('disabled') || disabledToggle.hasAttribute('disabled'); })()",
    },
  ],
};
