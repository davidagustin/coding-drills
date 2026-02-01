/**
 * Test cases for Native JS UI pattern exercises.
 * Each test is a JavaScript expression that evaluates to boolean inside the sandbox iframe.
 * Tests verify BEHAVIOR that only works when user implements the JS logic.
 */
import type { PatternTestCase } from './index';

export const nativeJsTests: Record<string, PatternTestCase[]> = {
  // ── Forms & Input ──────────────────────────────────────────────────

  'js-form-validation': [
    {
      name: 'Invalid email shows error message',
      test: "(function() { var el = document.getElementById('email'); if (!el) return false; el.value = 'notanemail'; el.dispatchEvent(new Event('input', {bubbles:true})); var err = document.getElementById('email-error'); return err && err.textContent.length > 0; })()",
    },
    {
      name: 'Valid email removes error and adds valid class',
      test: "(function() { var el = document.getElementById('email'); if (!el) return false; el.value = 'test@example.com'; el.dispatchEvent(new Event('input', {bubbles:true})); return el.classList.contains('valid') && !el.classList.contains('invalid'); })()",
    },
    {
      name: 'Password too short shows error',
      test: "(function() { var el = document.getElementById('password'); if (!el) return false; el.value = 'short'; el.dispatchEvent(new Event('input', {bubbles:true})); var err = document.getElementById('password-error'); return err && err.textContent.length > 0; })()",
    },
    {
      name: 'Mismatched passwords show error',
      test: "(function() { var pw = document.getElementById('password'); var cf = document.getElementById('confirm'); if (!pw || !cf) return false; pw.value = 'password123'; cf.value = 'different123'; cf.dispatchEvent(new Event('input', {bubbles:true})); var err = document.getElementById('confirm-error'); return err && err.textContent.length > 0; })()",
    },
    {
      name: 'Valid form shows success message',
      test: "(function() { var form = document.getElementById('signup-form'); var em = document.getElementById('email'); var pw = document.getElementById('password'); var cf = document.getElementById('confirm'); if (!form || !em || !pw || !cf) return false; em.value = 'test@example.com'; pw.value = 'password123'; cf.value = 'password123'; em.dispatchEvent(new Event('input', {bubbles:true})); pw.dispatchEvent(new Event('input', {bubbles:true})); cf.dispatchEvent(new Event('input', {bubbles:true})); form.dispatchEvent(new Event('submit', {bubbles:true, cancelable:true})); var success = document.getElementById('success'); return success && success.style.display !== 'none'; })()",
    },
  ],

  'js-autocomplete': [
    {
      name: 'Typing query shows suggestions',
      test: "(function() { var inp = document.getElementById('search'); var list = document.getElementById('suggestions'); if (!inp || !list) return false; inp.value = 'app'; inp.dispatchEvent(new Event('input', {bubbles:true})); return new Promise(function(resolve) { setTimeout(function() { resolve(list.classList.contains('open') && list.querySelectorAll('li').length > 0); }, 300); }); })()",
    },
    {
      name: 'Clicking suggestion fills input',
      test: "(function() { var inp = document.getElementById('search'); var list = document.getElementById('suggestions'); if (!inp || !list) return false; inp.value = 'app'; inp.dispatchEvent(new Event('input', {bubbles:true})); return new Promise(function(resolve) { setTimeout(function() { var li = list.querySelector('li'); if (!li) { resolve(false); return; } li.click(); resolve(inp.value.length > 0 && inp.value !== 'app'); }, 300); }); })()",
    },
    {
      name: 'Empty input hides suggestions',
      test: "(function() { var inp = document.getElementById('search'); var list = document.getElementById('suggestions'); if (!inp || !list) return false; inp.value = 'app'; inp.dispatchEvent(new Event('input', {bubbles:true})); return new Promise(function(resolve) { setTimeout(function() { inp.value = ''; inp.dispatchEvent(new Event('input', {bubbles:true})); setTimeout(function() { resolve(!list.classList.contains('open')); }, 300); }, 300); }); })()",
    },
    {
      name: 'Arrow down highlights first item',
      test: "(function() { var inp = document.getElementById('search'); var list = document.getElementById('suggestions'); if (!inp || !list) return false; inp.value = 'app'; inp.dispatchEvent(new Event('input', {bubbles:true})); return new Promise(function(resolve) { setTimeout(function() { var ev = new KeyboardEvent('keydown', {key:'ArrowDown', bubbles:true}); inp.dispatchEvent(ev); setTimeout(function() { var active = list.querySelector('li.active'); resolve(!!active); }, 50); }, 300); }); })()",
    },
  ],

  'js-file-upload': [
    {
      name: 'Clicking drop zone opens file input',
      test: "(function() { var zone = document.getElementById('drop-zone'); var input = document.getElementById('file-input'); if (!zone || !input) return false; var clicked = false; input.click = function() { clicked = true; }; zone.click(); return clicked; })()",
    },
    {
      name: 'Drag over adds dragover class',
      test: "(function() { var zone = document.getElementById('drop-zone'); if (!zone) return false; var ev = new DragEvent('dragover', {bubbles:true}); zone.dispatchEvent(ev); return zone.classList.contains('dragover'); })()",
    },
    {
      name: 'Drag leave removes dragover class',
      test: "(function() { var zone = document.getElementById('drop-zone'); if (!zone) return false; zone.classList.add('dragover'); var ev = new DragEvent('dragleave', {bubbles:true}); zone.dispatchEvent(ev); return !zone.classList.contains('dragover'); })()",
    },
  ],

  'js-date-picker': [
    {
      name: 'Clicking input shows calendar',
      test: "(function() { var inp = document.getElementById('date-input'); var cal = document.getElementById('calendar'); if (!inp || !cal) return false; inp.click(); return cal.style.display !== 'none'; })()",
    },
    {
      name: 'Calendar renders day buttons',
      test: "(function() { var inp = document.getElementById('date-input'); var grid = document.getElementById('cal-grid'); if (!inp || !grid) return false; inp.click(); return grid.querySelectorAll('button').length >= 28; })()",
    },
    {
      name: 'Clicking next month changes month label',
      test: "(function() { var inp = document.getElementById('date-input'); var label = document.getElementById('month-label'); var btn = document.getElementById('next-month'); if (!inp || !label || !btn) return false; inp.click(); var before = label.textContent; btn.click(); return label.textContent !== before; })()",
    },
    {
      name: 'Selecting date fills input and closes calendar',
      test: "(function() { var inp = document.getElementById('date-input'); var cal = document.getElementById('calendar'); var grid = document.getElementById('cal-grid'); if (!inp || !cal || !grid) return false; inp.click(); var dayBtn = grid.querySelector('button:not(.empty)'); if (!dayBtn) return false; dayBtn.click(); return inp.value.length > 0 && cal.style.display === 'none'; })()",
    },
  ],

  'js-input-masking': [
    {
      name: 'Phone input formats with parentheses and dash',
      test: "(function() { var el = document.getElementById('phone'); if (!el) return false; el.value = '5551234567'; el.dispatchEvent(new Event('input', {bubbles:true})); return el.value.includes('(') && el.value.includes(')') && el.value.includes('-'); })()",
    },
    {
      name: 'Card input formats with spaces every 4 digits',
      test: "(function() { var el = document.getElementById('card'); if (!el) return false; el.value = '1234567890123456'; el.dispatchEvent(new Event('input', {bubbles:true})); var spaces = (el.value.match(/ /g) || []).length; return spaces === 3; })()",
    },
    {
      name: 'Date input formats with slashes',
      test: "(function() { var el = document.getElementById('date'); if (!el) return false; el.value = '12252024'; el.dispatchEvent(new Event('input', {bubbles:true})); return el.value.includes('/'); })()",
    },
    {
      name: 'Output updates when input changes',
      test: "(function() { var el = document.getElementById('phone'); var out = document.getElementById('output'); if (!el || !out) return false; el.value = '5551234567'; el.dispatchEvent(new Event('input', {bubbles:true})); return out.textContent.length > 0 && out.textContent !== 'Type in any field above...'; })()",
    },
  ],

  'js-range-slider': [
    {
      name: 'Min thumb positioned at min value',
      test: "(function() { var thumb = document.getElementById('thumb-min'); if (!thumb) return false; var left = parseFloat(thumb.style.left); return !isNaN(left) && left >= 0; })()",
    },
    {
      name: 'Fill bar width reflects range',
      test: "(function() { var fill = document.getElementById('fill'); if (!fill) return false; var width = parseFloat(fill.style.width); return !isNaN(width) && width > 0; })()",
    },
    {
      name: 'Min value label displays formatted price',
      test: "(function() { var label = document.getElementById('val-min'); if (!label) return false; return label.textContent.includes('$'); })()",
    },
    {
      name: 'Max value label displays formatted price',
      test: "(function() { var label = document.getElementById('val-max'); if (!label) return false; return label.textContent.includes('$'); })()",
    },
  ],

  'js-inline-edit': [
    {
      name: 'Clicking edit button shows input',
      test: "(function() { var item = document.querySelector('.edit-item'); if (!item) return false; var btn = item.querySelector('.edit-btn'); if (!btn) return false; btn.click(); return item.classList.contains('editing'); })()",
    },
    {
      name: 'Double-clicking display shows input',
      test: "(function() { var item = document.querySelector('.edit-item'); if (!item) return false; var disp = item.querySelector('.display'); if (!disp) return false; disp.dispatchEvent(new Event('dblclick', {bubbles:true})); return item.classList.contains('editing'); })()",
    },
    {
      name: 'Pressing Enter saves and exits edit mode',
      test: "(function() { var item = document.querySelector('.edit-item'); if (!item) return false; var btn = item.querySelector('.edit-btn'); var inp = item.querySelector('.edit-input'); if (!btn || !inp) return false; btn.click(); inp.value = 'Updated'; var ev = new KeyboardEvent('keydown', {key:'Enter', bubbles:true}); inp.dispatchEvent(ev); return !item.classList.contains('editing'); })()",
    },
  ],

  'js-custom-select': [
    {
      name: 'Clicking select opens dropdown',
      test: "(function() { var sel = document.getElementById('custom-select'); var list = document.getElementById('options'); if (!sel || !list) return false; sel.click(); return list.style.display !== 'none' && sel.getAttribute('aria-expanded') === 'true'; })()",
    },
    {
      name: 'Clicking option updates value and closes dropdown',
      test: "(function() { var sel = document.getElementById('custom-select'); var list = document.getElementById('options'); var val = document.getElementById('select-value'); if (!sel || !list || !val) return false; sel.click(); var opt = list.querySelector('li'); if (!opt) return false; opt.click(); return val.textContent.length > 0 && list.style.display === 'none'; })()",
    },
    {
      name: 'Arrow down opens and highlights first option',
      test: "(function() { var sel = document.getElementById('custom-select'); var list = document.getElementById('options'); if (!sel || !list) return false; var ev = new KeyboardEvent('keydown', {key:'ArrowDown', bubbles:true}); sel.dispatchEvent(ev); return list.style.display !== 'none'; })()",
    },
    {
      name: 'Escape key closes dropdown',
      test: "(function() { var sel = document.getElementById('custom-select'); var list = document.getElementById('options'); if (!sel || !list) return false; sel.click(); var ev = new KeyboardEvent('keydown', {key:'Escape', bubbles:true}); sel.dispatchEvent(ev); return list.style.display === 'none'; })()",
    },
  ],

  'js-password-strength': [
    {
      name: 'Empty password shows initial message',
      test: "(function() { var label = document.getElementById('strength-label'); if (!label) return false; return label.textContent === 'Enter a password'; })()",
    },
    {
      name: 'Short password shows weak strength',
      test: "(function() { var inp = document.getElementById('pw-input'); var label = document.getElementById('strength-label'); if (!inp || !label) return false; inp.value = 'ab'; inp.dispatchEvent(new Event('input', {bubbles:true})); return label.textContent.toLowerCase().includes('weak'); })()",
    },
    {
      name: 'Meeting length rule marks it as passed',
      test: "(function() { var inp = document.getElementById('pw-input'); var rule = document.getElementById('rule-len'); if (!inp || !rule) return false; inp.value = 'password'; inp.dispatchEvent(new Event('input', {bubbles:true})); return rule.classList.contains('pass'); })()",
    },
    {
      name: 'Meeting all rules shows strong strength',
      test: "(function() { var inp = document.getElementById('pw-input'); var label = document.getElementById('strength-label'); if (!inp || !label) return false; inp.value = 'Password123!'; inp.dispatchEvent(new Event('input', {bubbles:true})); return label.textContent.toLowerCase().includes('strong'); })()",
    },
  ],

  'js-dynamic-form': [
    {
      name: 'Field groups dynamically rendered from schema',
      test: "document.querySelectorAll('#dynamic-form .field-group').length >= 4",
    },
    {
      name: 'Required fields marked with asterisk',
      test: "document.querySelectorAll('#dynamic-form .req').length >= 2",
    },
    {
      name: 'Select field has options',
      test: "document.querySelector('#dynamic-form select')?.querySelectorAll('option').length > 1",
    },
    {
      name: 'Form submission validates and shows output',
      test: "(function() { var form = document.getElementById('dynamic-form'); var out = document.getElementById('form-output'); if (!form || !out) return false; form.querySelectorAll('input, select, textarea').forEach(function(el) { if (el.type === 'text' || el.type === 'email') el.value = 'test'; else if (el.tagName === 'SELECT') el.selectedIndex = 1; }); form.dispatchEvent(new Event('submit', {bubbles:true, cancelable:true})); return out.style.display !== 'none' && out.textContent.length > 0; })()",
    },
  ],

  // ── Interactive Elements ───────────────────────────────────────────

  'js-modal': [
    {
      name: 'Clicking open button shows modal',
      test: "(function() { var btn = document.getElementById('open-btn'); var backdrop = document.getElementById('backdrop'); if (!btn || !backdrop) return false; btn.click(); return backdrop.classList.contains('open'); })()",
    },
    {
      name: 'Clicking cancel button closes modal',
      test: "(function() { var open = document.getElementById('open-btn'); var cancel = document.getElementById('cancel-btn'); var backdrop = document.getElementById('backdrop'); if (!open || !cancel || !backdrop) return false; open.click(); cancel.click(); return !backdrop.classList.contains('open'); })()",
    },
    {
      name: 'Clicking confirm button closes modal and updates status',
      test: "(function() { var open = document.getElementById('open-btn'); var confirm = document.getElementById('confirm-btn'); var backdrop = document.getElementById('backdrop'); var status = document.getElementById('status'); if (!open || !confirm || !backdrop || !status) return false; open.click(); confirm.click(); return !backdrop.classList.contains('open') && status.textContent.includes('confirmed'); })()",
    },
    {
      name: 'Escape key closes modal',
      test: "(function() { var open = document.getElementById('open-btn'); var backdrop = document.getElementById('backdrop'); if (!open || !backdrop) return false; open.click(); var ev = new KeyboardEvent('keydown', {key:'Escape', bubbles:true}); document.dispatchEvent(ev); return !backdrop.classList.contains('open'); })()",
    },
  ],

  'js-drag-drop': [
    {
      name: 'Dragstart adds dragging class',
      test: "(function() { var item = document.querySelector('.sortable-item'); if (!item) return false; var ev = new DragEvent('dragstart', {bubbles:true}); item.dispatchEvent(ev); return item.classList.contains('dragging'); })()",
    },
    {
      name: 'Dragend removes dragging class',
      test: "(function() { var item = document.querySelector('.sortable-item'); if (!item) return false; item.classList.add('dragging'); var ev = new DragEvent('dragend', {bubbles:true}); item.dispatchEvent(ev); return !item.classList.contains('dragging'); })()",
    },
    {
      name: 'Items have drag handlers wired',
      test: "(function() { var item = document.querySelector('.sortable-item'); if (!item) return false; var ev = new DragEvent('dragstart', {bubbles:true}); var fired = false; item.addEventListener('dragstart', function() { fired = true; }, {once:true}); item.dispatchEvent(ev); return fired; })()",
    },
  ],

  'js-sortable-table': [
    {
      name: 'Table rows rendered from data',
      test: "document.querySelectorAll('#table-body tr').length >= 5",
    },
    {
      name: 'Clicking column header sorts table',
      test: "(function() { var header = document.querySelector('.sortable-col'); var tbody = document.getElementById('table-body'); if (!header || !tbody) return false; var firstBefore = tbody.querySelector('tr td')?.textContent; header.click(); var firstAfter = tbody.querySelector('tr td')?.textContent; return firstBefore !== firstAfter; })()",
    },
    {
      name: 'Clicking same header twice reverses sort',
      test: "(function() { var header = document.querySelector('.sortable-col'); var tbody = document.getElementById('table-body'); if (!header || !tbody) return false; header.click(); var firstAfterOne = tbody.querySelector('tr td')?.textContent; header.click(); var firstAfterTwo = tbody.querySelector('tr td')?.textContent; return firstAfterOne !== firstAfterTwo; })()",
    },
  ],

  'js-tabs': [
    {
      name: 'First tab is active initially',
      test: "document.querySelector('.tab')?.classList.contains('active')",
    },
    {
      name: 'Clicking second tab activates it',
      test: "(function() { var tabs = document.querySelectorAll('.tab'); if (tabs.length < 2) return false; tabs[1].click(); return tabs[1].classList.contains('active') && !tabs[0].classList.contains('active'); })()",
    },
    {
      name: 'Clicking tab shows corresponding panel',
      test: "(function() { var tabs = document.querySelectorAll('.tab'); var panels = document.querySelectorAll('.tab-panel'); if (tabs.length < 2 || panels.length < 2) return false; tabs[1].click(); return panels[1].classList.contains('active'); })()",
    },
    {
      name: 'Arrow right navigates to next tab',
      test: "(function() { var tabs = document.querySelectorAll('.tab'); var container = document.querySelector('.tabs'); if (!container || tabs.length < 2) return false; tabs[0].focus(); var ev = new KeyboardEvent('keydown', {key:'ArrowRight', bubbles:true}); container.dispatchEvent(ev); return tabs[1].classList.contains('active'); })()",
    },
  ],

  'js-accordion': [
    {
      name: 'All panels closed initially',
      test: "document.querySelectorAll('.accordion-body.open').length === 0",
    },
    {
      name: 'Clicking header opens panel',
      test: "(function() { var header = document.querySelector('.accordion-header'); if (!header) return false; header.click(); var body = header.nextElementSibling; return body && body.classList.contains('open'); })()",
    },
    {
      name: 'Clicking another header closes previous panel',
      test: "(function() { var headers = document.querySelectorAll('.accordion-header'); if (headers.length < 2) return false; headers[0].click(); headers[1].click(); var body0 = headers[0].nextElementSibling; return body0 && !body0.classList.contains('open'); })()",
    },
    {
      name: 'Clicking same header twice closes panel',
      test: "(function() { var header = document.querySelector('.accordion-header'); if (!header) return false; header.click(); header.click(); var body = header.nextElementSibling; return body && !body.classList.contains('open'); })()",
    },
  ],

  'js-carousel': [
    {
      name: 'Dots generated for each slide',
      test: "(function() { var slides = document.querySelectorAll('#track .slide'); var dots = document.querySelectorAll('#dots .dot'); return slides.length === dots.length && dots.length > 0; })()",
    },
    {
      name: 'First dot is active initially',
      test: "document.querySelector('#dots .dot')?.classList.contains('active')",
    },
    {
      name: 'Clicking next button advances slide',
      test: "(function() { var btn = document.getElementById('next-btn'); var track = document.getElementById('track'); if (!btn || !track) return false; var before = track.style.transform; btn.click(); var after = track.style.transform; return before !== after; })()",
    },
    {
      name: 'Clicking dot navigates to that slide',
      test: "(function() { var dots = document.querySelectorAll('#dots .dot'); if (dots.length < 2) return false; dots[1].click(); return dots[1].classList.contains('active'); })()",
    },
  ],

  'js-context-menu': [
    {
      name: 'Right-click shows context menu',
      test: "(function() { var area = document.getElementById('context-area'); var menu = document.getElementById('context-menu'); if (!area || !menu) return false; var ev = new MouseEvent('contextmenu', {bubbles:true, clientX:100, clientY:100}); area.dispatchEvent(ev); return menu.style.display !== 'none'; })()",
    },
    {
      name: 'Clicking menu item logs action',
      test: "(function() { var area = document.getElementById('context-area'); var menu = document.getElementById('context-menu'); var log = document.getElementById('action-log'); if (!area || !menu || !log) return false; var ev = new MouseEvent('contextmenu', {bubbles:true, clientX:100, clientY:100}); area.dispatchEvent(ev); var item = menu.querySelector('.menu-item'); if (!item) return false; item.click(); return log.textContent.length > 0; })()",
    },
    {
      name: 'Document click hides menu',
      test: "(function() { var area = document.getElementById('context-area'); var menu = document.getElementById('context-menu'); if (!area || !menu) return false; var ev = new MouseEvent('contextmenu', {bubbles:true, clientX:100, clientY:100}); area.dispatchEvent(ev); document.dispatchEvent(new MouseEvent('click', {bubbles:true})); return menu.style.display === 'none'; })()",
    },
  ],

  'js-infinite-scroll': [
    {
      name: 'Initial items loaded on start',
      test: "document.querySelectorAll('#items .scroll-item').length > 0",
    },
    {
      name: 'Scrolling to bottom loads more items',
      test: "(function() { var container = document.getElementById('scroll-container'); var items = document.getElementById('items'); if (!container || !items) return false; var before = items.querySelectorAll('.scroll-item').length; container.scrollTop = container.scrollHeight; return new Promise(function(resolve) { setTimeout(function() { var after = items.querySelectorAll('.scroll-item').length; resolve(after > before); }, 800); }); })()",
    },
  ],

  'js-toast-notifications': [
    {
      name: 'No toasts initially',
      test: "document.querySelectorAll('#toast-container .toast').length === 0",
    },
    {
      name: 'Clicking success button shows toast',
      test: "(function() { var btn = document.querySelector('.toast-btn[data-type=\"success\"]'); var container = document.getElementById('toast-container'); if (!btn || !container) return false; btn.click(); return new Promise(function(resolve) { setTimeout(function() { resolve(container.querySelectorAll('.toast').length > 0); }, 100); }); })()",
    },
    {
      name: 'Toast auto-dismisses',
      test: "(function() { var btn = document.querySelector('.toast-btn[data-type=\"success\"]'); var container = document.getElementById('toast-container'); if (!btn || !container) return false; btn.click(); return new Promise(function(resolve) { setTimeout(function() { resolve(container.querySelectorAll('.toast').length === 0); }, 3500); }); })()",
    },
  ],

  'js-wizard': [
    {
      name: 'First step is active initially',
      test: "document.querySelector('.step')?.classList.contains('active')",
    },
    {
      name: 'Clicking next advances to next step',
      test: "(function() { var steps = document.querySelectorAll('.step'); var btn = document.getElementById('next-btn'); var name = document.getElementById('name-input'); if (steps.length < 2 || !btn || !name) return false; name.value = 'Test'; btn.click(); return steps[1].classList.contains('active'); })()",
    },
    {
      name: 'Progress bar updates on step change',
      test: "(function() { var fill = document.getElementById('progress-fill'); var btn = document.getElementById('next-btn'); var name = document.getElementById('name-input'); if (!fill || !btn || !name) return false; var before = parseFloat(fill.style.width); name.value = 'Test'; btn.click(); var after = parseFloat(fill.style.width); return after > before; })()",
    },
    {
      name: 'Prev button goes back',
      test: "(function() { var steps = document.querySelectorAll('.step'); var next = document.getElementById('next-btn'); var prev = document.getElementById('prev-btn'); var name = document.getElementById('name-input'); if (steps.length < 2 || !next || !prev || !name) return false; name.value = 'Test'; next.click(); prev.click(); return steps[0].classList.contains('active'); })()",
    },
  ],

  // ── Data Display ───────────────────────────────────────────────────

  'js-search-filter': [
    {
      name: 'Initial items rendered',
      test: "document.querySelectorAll('#results li').length > 0",
    },
    {
      name: 'Typing search filters items',
      test: "(function() { var inp = document.getElementById('search-input'); var results = document.getElementById('results'); if (!inp || !results) return false; var before = results.querySelectorAll('li').length; inp.value = 'app'; inp.dispatchEvent(new Event('input', {bubbles:true})); return new Promise(function(resolve) { setTimeout(function() { var after = results.querySelectorAll('li').length; resolve(after < before); }, 300); }); })()",
    },
    {
      name: 'Clicking category tag filters items',
      test: "(function() { var tag = document.querySelector('.tag[data-cat=\"fruit\"]'); var results = document.getElementById('results'); if (!tag || !results) return false; var before = results.querySelectorAll('li').length; tag.click(); var after = results.querySelectorAll('li').length; return after !== before; })()",
    },
    {
      name: 'No results shows empty state',
      test: "(function() { var inp = document.getElementById('search-input'); var noResults = document.getElementById('no-results'); if (!inp || !noResults) return false; inp.value = 'zzzzzzz'; inp.dispatchEvent(new Event('input', {bubbles:true})); return new Promise(function(resolve) { setTimeout(function() { resolve(noResults.style.display !== 'none'); }, 300); }); })()",
    },
  ],

  'js-gallery': [
    {
      name: 'Thumbnails rendered',
      test: "document.querySelectorAll('#gallery .gallery-thumb').length >= 6",
    },
    {
      name: 'Clicking thumbnail opens lightbox',
      test: "(function() { var thumb = document.querySelector('.gallery-thumb'); var lb = document.getElementById('lightbox'); if (!thumb || !lb) return false; thumb.click(); return lb.style.display === 'flex'; })()",
    },
    {
      name: 'Close button closes lightbox',
      test: "(function() { var thumb = document.querySelector('.gallery-thumb'); var lb = document.getElementById('lightbox'); var close = document.getElementById('lb-close'); if (!thumb || !lb || !close) return false; thumb.click(); close.click(); return lb.style.display === 'none'; })()",
    },
    {
      name: 'Next button navigates to next image',
      test: "(function() { var thumb = document.querySelector('.gallery-thumb'); var lb = document.getElementById('lightbox'); var next = document.getElementById('lb-next'); var caption = document.getElementById('lb-caption'); if (!thumb || !lb || !next || !caption) return false; thumb.click(); var before = caption.textContent; next.click(); var after = caption.textContent; return before !== after; })()",
    },
  ],

  'js-cards-grid': [
    {
      name: 'Cards rendered from data',
      test: "document.querySelectorAll('#card-grid .card').length >= 6",
    },
    {
      name: 'Cards have icons',
      test: "document.querySelectorAll('#card-grid .card-icon').length >= 6",
    },
    {
      name: 'Cards have titles',
      test: "document.querySelectorAll('#card-grid .card-title').length >= 6",
    },
    {
      name: 'Cards have tags with classes',
      test: 'document.querySelectorAll(\'#card-grid .card-tag[class*="tag-"]\').length >= 6',
    },
  ],

  'js-table-sort-filter': [
    {
      name: 'Table rows rendered',
      test: "document.querySelectorAll('#tb tr').length > 0",
    },
    {
      name: 'Typing in filter reduces rows',
      test: "(function() { var inp = document.getElementById('tf'); var tbody = document.getElementById('tb'); if (!inp || !tbody) return false; var before = tbody.querySelectorAll('tr').length; inp.value = 'alice'; inp.dispatchEvent(new Event('input', {bubbles:true})); var after = tbody.querySelectorAll('tr').length; return after < before; })()",
    },
    {
      name: 'Clicking sort column reorders rows',
      test: "(function() { var col = document.querySelector('.sc'); var tbody = document.getElementById('tb'); if (!col || !tbody) return false; var firstBefore = tbody.querySelector('tr td')?.textContent; col.click(); var firstAfter = tbody.querySelector('tr td')?.textContent; return firstBefore !== firstAfter; })()",
    },
    {
      name: 'Pagination buttons rendered',
      test: "document.querySelectorAll('#tp .pg').length > 0",
    },
    {
      name: 'Clicking page button changes displayed rows',
      test: "(function() { var buttons = document.querySelectorAll('#tp .pg'); var tbody = document.getElementById('tb'); if (buttons.length < 2 || !tbody) return false; var firstBefore = tbody.querySelector('tr td')?.textContent; buttons[1].click(); var firstAfter = tbody.querySelector('tr td')?.textContent; return firstBefore !== firstAfter; })()",
    },
  ],

  'js-lazy-images': [
    {
      name: 'Lazy items rendered',
      test: "document.querySelectorAll('.lazy-item').length >= 8",
    },
    {
      name: 'Placeholder elements exist initially',
      test: "document.querySelectorAll('.lazy-placeholder').length > 0",
    },
    {
      name: 'Intersection observer loads images',
      test: "(function() { return new Promise(function(resolve) { setTimeout(function() { var loaded = document.querySelectorAll('.lazy-img.loaded'); resolve(loaded.length > 0); }, 1500); }); })()",
    },
  ],

  'js-data-chart': [
    {
      name: 'Canvas has 2D context',
      test: "!!document.getElementById('chart')?.getContext('2d')",
    },
    {
      name: 'Chart draws bars on canvas',
      test: "(function() { var canvas = document.getElementById('chart'); if (!canvas) return false; var ctx = canvas.getContext('2d'); if (!ctx) return false; var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); var hasPixels = false; for (var i = 3; i < imageData.data.length; i += 4) { if (imageData.data[i] > 0) { hasPixels = true; break; } } return hasPixels; })()",
    },
    {
      name: 'Mouse move shows tooltip',
      test: "(function() { var canvas = document.getElementById('chart'); var tooltip = document.getElementById('tooltip'); if (!canvas || !tooltip) return false; var rect = canvas.getBoundingClientRect(); var ev = new MouseEvent('mousemove', {bubbles:true, clientX:rect.left+100, clientY:rect.top+100}); canvas.dispatchEvent(ev); return tooltip.style.display !== 'none'; })()",
    },
  ],

  'js-virtual-scroll': [
    {
      name: 'Spacer has height set',
      test: "parseInt(document.getElementById('vsp')?.style.height || '0', 10) > 0",
    },
    {
      name: 'Virtual rows rendered',
      test: "document.querySelectorAll('#vsn .vsr').length > 0",
    },
    {
      name: 'Scrolling updates rendered rows',
      test: "(function() { var container = document.getElementById('vsc'); var content = document.getElementById('vsn'); if (!container || !content) return false; var firstBefore = content.querySelector('.vsr')?.textContent; container.scrollTop = 2000; container.dispatchEvent(new Event('scroll', {bubbles:true})); var firstAfter = content.querySelector('.vsr')?.textContent; return firstBefore !== firstAfter; })()",
    },
  ],

  // ── Navigation ─────────────────────────────────────────────────────

  'js-navbar': [
    {
      name: 'Hamburger toggles nav list',
      test: "(function() { var hb = document.getElementById('hb'); var nl = document.getElementById('nl'); if (!hb || !nl) return false; var before = nl.classList.contains('open'); hb.click(); var after = nl.classList.contains('open'); return before !== after; })()",
    },
    {
      name: 'Clicking nav link updates active state',
      test: "(function() { var links = document.querySelectorAll('.nk'); if (links.length < 2) return false; links[1].click(); return links[1].classList.contains('active') && !links[0].classList.contains('active'); })()",
    },
    {
      name: 'Clicking nav link updates page display',
      test: "(function() { var links = document.querySelectorAll('.nk'); var pd = document.getElementById('pd'); if (links.length < 2 || !pd) return false; var before = pd.textContent; links[1].click(); var after = pd.textContent; return before !== after; })()",
    },
  ],

  'js-sidebar': [
    {
      name: 'Sidebar closed initially',
      test: "!document.getElementById('sb')?.classList.contains('open')",
    },
    {
      name: 'Open button shows sidebar',
      test: "(function() { var btn = document.getElementById('os'); var sb = document.getElementById('sb'); if (!btn || !sb) return false; btn.click(); return sb.classList.contains('open'); })()",
    },
    {
      name: 'Close button hides sidebar',
      test: "(function() { var open = document.getElementById('os'); var close = document.getElementById('cs'); var sb = document.getElementById('sb'); if (!open || !close || !sb) return false; open.click(); close.click(); return !sb.classList.contains('open'); })()",
    },
    {
      name: 'Overlay click closes sidebar',
      test: "(function() { var open = document.getElementById('os'); var overlay = document.getElementById('ov'); var sb = document.getElementById('sb'); if (!open || !overlay || !sb) return false; open.click(); overlay.click(); return !sb.classList.contains('open'); })()",
    },
  ],

  'js-breadcrumbs': [
    {
      name: 'Initial crumbs rendered',
      test: "document.querySelectorAll('#bc li').length >= 1",
    },
    {
      name: 'Clicking path button updates breadcrumbs',
      test: "(function() { var btn = document.querySelector('.pbtn'); var bc = document.getElementById('bc'); if (!btn || !bc) return false; var before = bc.querySelectorAll('li').length; btn.click(); var after = bc.querySelectorAll('li').length; return after !== before; })()",
    },
    {
      name: 'Current path display updates',
      test: "(function() { var btn = document.querySelector('.pbtn'); var cp = document.getElementById('cp'); if (!btn || !cp) return false; var before = cp.textContent; btn.click(); var after = cp.textContent; return before !== after; })()",
    },
  ],

  'js-bottom-nav': [
    {
      name: 'Active nav item set',
      test: "!!document.querySelector('.bi.active')",
    },
    {
      name: 'Clicking nav item updates active state',
      test: "(function() { var items = document.querySelectorAll('.bi'); if (items.length < 2) return false; items[1].click(); return items[1].classList.contains('active') && !items[0].classList.contains('active'); })()",
    },
    {
      name: 'Scrolling down hides bottom nav',
      test: "(function() { var sa = document.getElementById('sa'); var bn = document.getElementById('bn'); if (!sa || !bn) return false; sa.scrollTop = 100; sa.dispatchEvent(new Event('scroll', {bubbles:true})); return bn.classList.contains('hidden'); })()",
    },
  ],

  'js-dropdown-menu': [
    {
      name: 'Clicking trigger opens dropdown',
      test: "(function() { var trigger = document.querySelector('.mt'); var list = document.querySelector('.dl'); if (!trigger || !list) return false; trigger.click(); return list.classList.contains('open'); })()",
    },
    {
      name: 'Clicking menu item updates selection display',
      test: "(function() { var trigger = document.querySelector('.mt'); var list = document.querySelector('.dl'); var ds = document.getElementById('ds'); if (!trigger || !list || !ds) return false; trigger.click(); var item = list.querySelector('[role=\"menuitem\"]'); if (!item) return false; item.click(); return ds.textContent.includes('Selected'); })()",
    },
    {
      name: 'Clicking menu item closes dropdown',
      test: "(function() { var trigger = document.querySelector('.mt'); var list = document.querySelector('.dl'); if (!trigger || !list) return false; trigger.click(); var item = list.querySelector('[role=\"menuitem\"]'); if (!item) return false; item.click(); return !list.classList.contains('open'); })()",
    },
  ],

  'js-pagination': [
    {
      name: 'Initial page items rendered',
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
    {
      name: 'Clicking next page button changes items',
      test: "(function() { var buttons = document.querySelectorAll('#pg .pb'); var items = document.getElementById('pi'); if (buttons.length < 2 || !items) return false; var firstBefore = items.querySelector('.pit')?.textContent; buttons[1].click(); var firstAfter = items.querySelector('.pit')?.textContent; return firstBefore !== firstAfter; })()",
    },
  ],

  // ── Advanced Features ──────────────────────────────────────────────

  'js-keyboard-shortcuts': [
    {
      name: 'Pressing Ctrl+B shows action',
      test: "(function() { var so = document.getElementById('so'); if (!so) return false; var ev = new KeyboardEvent('keydown', {key:'b', ctrlKey:true, bubbles:true}); document.dispatchEvent(ev); return so.textContent.includes('Bold'); })()",
    },
    {
      name: 'Pressing Ctrl+S shows action',
      test: "(function() { var so = document.getElementById('so'); if (!so) return false; var ev = new KeyboardEvent('keydown', {key:'s', ctrlKey:true, bubbles:true}); document.dispatchEvent(ev); return so.textContent.includes('saved'); })()",
    },
    {
      name: 'Key display updates on keypress',
      test: "(function() { var kd = document.getElementById('kd'); if (!kd) return false; var ev = new KeyboardEvent('keydown', {key:'b', ctrlKey:true, bubbles:true}); document.dispatchEvent(ev); return kd.textContent.length > 0; })()",
    },
  ],

  'js-notifications': [
    {
      name: 'Empty state shows initially',
      test: "document.getElementById('ne')?.style.display !== 'none'",
    },
    {
      name: 'Send button adds notification',
      test: "(function() { var btn = document.getElementById('sn'); var list = document.getElementById('nli'); if (!btn || !list) return false; btn.click(); return list.querySelectorAll('.ni').length > 0; })()",
    },
    {
      name: 'Adding notification hides empty state',
      test: "(function() { var btn = document.getElementById('sn'); var empty = document.getElementById('ne'); if (!btn || !empty) return false; btn.click(); return empty.style.display === 'none'; })()",
    },
    {
      name: 'Clear all removes notifications',
      test: "(function() { var send = document.getElementById('sn'); var clear = document.getElementById('cn'); var list = document.getElementById('nli'); if (!send || !clear || !list) return false; send.click(); clear.click(); return list.querySelectorAll('.ni').length === 0; })()",
    },
  ],

  'js-undo-redo': [
    {
      name: 'Add button creates item',
      test: "(function() { var btn = document.getElementById('ab'); var container = document.getElementById('uc'); if (!btn || !container) return false; btn.click(); return container.querySelectorAll('.ci').length > 0; })()",
    },
    {
      name: 'Undo button removes last item',
      test: "(function() { var add = document.getElementById('ab'); var undo = document.getElementById('ub'); var container = document.getElementById('uc'); if (!add || !undo || !container) return false; add.click(); add.click(); var before = container.querySelectorAll('.ci').length; undo.click(); var after = container.querySelectorAll('.ci').length; return after < before; })()",
    },
    {
      name: 'Redo button restores item',
      test: "(function() { var add = document.getElementById('ab'); var undo = document.getElementById('ub'); var redo = document.getElementById('rb'); var container = document.getElementById('uc'); if (!add || !undo || !redo || !container) return false; add.click(); undo.click(); var before = container.querySelectorAll('.ci').length; redo.click(); var after = container.querySelectorAll('.ci').length; return after > before; })()",
    },
  ],

  'js-clipboard': [
    {
      name: 'Copy button copies input value',
      test: "(function() { var inp = document.getElementById('ci'); var btn = document.getElementById('cb'); var status = document.getElementById('cst'); if (!inp || !btn || !status) return false; inp.value = 'test'; btn.click(); return new Promise(function(resolve) { setTimeout(function() { resolve(status.textContent.includes('Copied')); }, 100); }); })()",
    },
    {
      name: 'Quick copy snippet copies text',
      test: "(function() { var btn = document.querySelector('.snb'); var status = document.getElementById('cst'); if (!btn || !status) return false; btn.click(); return new Promise(function(resolve) { setTimeout(function() { resolve(status.textContent.includes('Copied')); }, 100); }); })()",
    },
  ],

  'js-local-storage': [
    {
      name: 'Add button creates note',
      test: "(function() { var inp = document.getElementById('ni'); var btn = document.getElementById('an'); var list = document.getElementById('nl'); if (!inp || !btn || !list) return false; inp.value = 'Test note'; btn.click(); return list.querySelectorAll('.nit').length > 0; })()",
    },
    {
      name: 'Storage info updates on add',
      test: "(function() { var inp = document.getElementById('ni'); var btn = document.getElementById('an'); var info = document.getElementById('si'); if (!inp || !btn || !info) return false; inp.value = 'Test'; btn.click(); return info.textContent.includes('1'); })()",
    },
    {
      name: 'Clear all removes notes',
      test: "(function() { var add = document.getElementById('an'); var clear = document.getElementById('ca'); var list = document.getElementById('nl'); var inp = document.getElementById('ni'); if (!add || !clear || !list || !inp) return false; inp.value = 'Test'; add.click(); clear.click(); return list.querySelectorAll('.nit').length === 0; })()",
    },
  ],

  // ── UI Components ──────────────────────────────────────────────────

  'js-loading-skeleton': [
    {
      name: 'Skeleton elements rendered initially',
      test: "document.querySelectorAll('.sk').length > 0",
    },
    {
      name: 'Toggle button switches to real content',
      test: "(function() { var btn = document.getElementById('tl'); var container = document.querySelector('.skd'); if (!btn || !container) return false; btn.click(); return new Promise(function(resolve) { setTimeout(function() { resolve(container.querySelector('.rr') !== null); }, 1000); }); })()",
    },
  ],

  'js-empty-states': [
    {
      name: 'Initial scene rendered',
      test: "document.getElementById('es')?.innerHTML.length > 0",
    },
    {
      name: 'Action button rendered',
      test: "!!document.querySelector('#es .eb')",
    },
    {
      name: 'Clicking scene tab changes content',
      test: "(function() { var tabs = document.querySelectorAll('.stb'); var es = document.getElementById('es'); if (tabs.length < 2 || !es) return false; var before = es.innerHTML; tabs[1].click(); var after = es.innerHTML; return before !== after; })()",
    },
  ],

  'js-image-zoom': [
    {
      name: 'Preview has cloned content',
      test: "document.getElementById('zp')?.querySelector('.zg') !== null",
    },
    {
      name: 'Mouse enter shows lens',
      test: "(function() { var zc = document.getElementById('zc'); var zl = document.getElementById('zl'); if (!zc || !zl) return false; var ev = new MouseEvent('mouseenter', {bubbles:true}); zc.dispatchEvent(ev); return zl.style.display !== 'none'; })()",
    },
    {
      name: 'Mouse leave hides lens',
      test: "(function() { var zc = document.getElementById('zc'); var zl = document.getElementById('zl'); if (!zc || !zl) return false; zc.dispatchEvent(new MouseEvent('mouseenter', {bubbles:true})); zc.dispatchEvent(new MouseEvent('mouseleave', {bubbles:true})); return zl.style.display === 'none'; })()",
    },
  ],

  'js-toggle-switch': [
    {
      name: 'Wi-Fi toggle checked shows On',
      test: "document.getElementById('tw')?.checked === true && document.getElementById('sw')?.textContent === 'On'",
    },
    {
      name: 'Toggling Wi-Fi updates status',
      test: "(function() { var toggle = document.getElementById('tw'); var status = document.getElementById('sw'); if (!toggle || !status) return false; var before = status.textContent; toggle.click(); var after = status.textContent; return before !== after; })()",
    },
    {
      name: 'Toggling Bluetooth updates status',
      test: "(function() { var toggle = document.getElementById('tb'); var status = document.getElementById('sb'); if (!toggle || !status) return false; var before = status.textContent; toggle.click(); var after = status.textContent; return before !== after; })()",
    },
  ],
};
