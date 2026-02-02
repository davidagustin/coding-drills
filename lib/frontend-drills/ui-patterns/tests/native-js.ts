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

  // ── New Patterns: Forms & Input (Extended) ────────────────────────

  'js-rating-stars': [
    {
      name: 'Stars rendered',
      test: "document.querySelectorAll('.star').length >= 5",
    },
    {
      name: 'Clicking star sets rating',
      test: "(function() { var stars = document.querySelectorAll('.star'); var output = document.getElementById('rating-value'); if (stars.length < 5 || !output) return false; stars[2].click(); return output.textContent.includes('3'); })()",
    },
    {
      name: 'Hovering star highlights up to that star',
      test: "(function() { var stars = document.querySelectorAll('.star'); if (stars.length < 5) return false; stars[3].dispatchEvent(new MouseEvent('mouseenter', {bubbles:true})); var highlighted = document.querySelectorAll('.star.hovered'); return highlighted.length >= 4; })()",
    },
  ],

  'js-tag-input': [
    {
      name: 'Typing and pressing Enter adds tag',
      test: "(function() { var inp = document.getElementById('tag-input'); var container = document.getElementById('tag-list'); if (!inp || !container) return false; inp.value = 'javascript'; inp.dispatchEvent(new KeyboardEvent('keydown', {key:'Enter', bubbles:true})); return container.querySelectorAll('.tag').length > 0; })()",
    },
    {
      name: 'Clicking remove button deletes tag',
      test: "(function() { var inp = document.getElementById('tag-input'); var container = document.getElementById('tag-list'); if (!inp || !container) return false; inp.value = 'test'; inp.dispatchEvent(new KeyboardEvent('keydown', {key:'Enter', bubbles:true})); var removeBtn = container.querySelector('.tag-remove'); if (!removeBtn) return false; removeBtn.click(); return container.querySelectorAll('.tag').length === 0; })()",
    },
    {
      name: 'Duplicate tags are prevented',
      test: "(function() { var inp = document.getElementById('tag-input'); var container = document.getElementById('tag-list'); if (!inp || !container) return false; inp.value = 'dupe'; inp.dispatchEvent(new KeyboardEvent('keydown', {key:'Enter', bubbles:true})); inp.value = 'dupe'; inp.dispatchEvent(new KeyboardEvent('keydown', {key:'Enter', bubbles:true})); return container.querySelectorAll('.tag').length === 1; })()",
    },
  ],

  'js-multi-select': [
    {
      name: 'Clicking trigger opens options list',
      test: "(function() { var trigger = document.getElementById('ms-trigger'); var list = document.getElementById('ms-options'); if (!trigger || !list) return false; trigger.click(); return list.style.display !== 'none'; })()",
    },
    {
      name: 'Clicking option adds chip to selection',
      test: "(function() { var trigger = document.getElementById('ms-trigger'); var list = document.getElementById('ms-options'); var chips = document.getElementById('ms-chips'); if (!trigger || !list || !chips) return false; trigger.click(); var opt = list.querySelector('.ms-option'); if (!opt) return false; opt.click(); return chips.querySelectorAll('.chip').length > 0; })()",
    },
    {
      name: 'Clicking chip removes selection',
      test: "(function() { var trigger = document.getElementById('ms-trigger'); var list = document.getElementById('ms-options'); var chips = document.getElementById('ms-chips'); if (!trigger || !list || !chips) return false; trigger.click(); var opt = list.querySelector('.ms-option'); if (!opt) return false; opt.click(); var chip = chips.querySelector('.chip'); if (!chip) return false; chip.click(); return chips.querySelectorAll('.chip').length === 0; })()",
    },
  ],

  'js-otp-input': [
    {
      name: 'OTP digit boxes rendered',
      test: "document.querySelectorAll('.otp-digit').length >= 4",
    },
    {
      name: 'Typing digit moves focus to next box',
      test: "(function() { var digits = document.querySelectorAll('.otp-digit'); if (digits.length < 4) return false; digits[0].focus(); digits[0].value = '1'; digits[0].dispatchEvent(new Event('input', {bubbles:true})); return document.activeElement === digits[1]; })()",
    },
    {
      name: 'Backspace moves focus to previous box',
      test: "(function() { var digits = document.querySelectorAll('.otp-digit'); if (digits.length < 4) return false; digits[1].focus(); digits[1].dispatchEvent(new KeyboardEvent('keydown', {key:'Backspace', bubbles:true})); return document.activeElement === digits[0]; })()",
    },
  ],

  'js-credit-card-input': [
    {
      name: 'Card number formats with spaces',
      test: "(function() { var inp = document.getElementById('cc-number'); if (!inp) return false; inp.value = '4111111111111111'; inp.dispatchEvent(new Event('input', {bubbles:true})); return inp.value.includes(' '); })()",
    },
    {
      name: 'Card preview updates with input',
      test: "(function() { var inp = document.getElementById('cc-number'); var preview = document.getElementById('cc-preview'); if (!inp || !preview) return false; inp.value = '4111'; inp.dispatchEvent(new Event('input', {bubbles:true})); return preview.textContent.includes('4111'); })()",
    },
    {
      name: 'Card type detected from number',
      test: "(function() { var inp = document.getElementById('cc-number'); var type = document.getElementById('cc-type'); if (!inp || !type) return false; inp.value = '4111'; inp.dispatchEvent(new Event('input', {bubbles:true})); return type.textContent.length > 0; })()",
    },
  ],

  'js-address-form': [
    {
      name: 'Country select changes available fields',
      test: "(function() { var sel = document.getElementById('af-country'); if (!sel) return false; sel.value = 'US'; sel.dispatchEvent(new Event('change', {bubbles:true})); var zip = document.getElementById('af-zip'); return zip && zip.placeholder.length > 0; })()",
    },
    {
      name: 'Form validates required fields',
      test: "(function() { var form = document.getElementById('address-form'); if (!form) return false; form.dispatchEvent(new Event('submit', {bubbles:true, cancelable:true})); return document.querySelectorAll('.af-error').length > 0; })()",
    },
    {
      name: 'Valid submission shows formatted address',
      test: "(function() { var form = document.getElementById('address-form'); var output = document.getElementById('af-output'); if (!form || !output) return false; var inputs = form.querySelectorAll('input[required]'); inputs.forEach(function(i) { i.value = 'Test'; }); form.dispatchEvent(new Event('submit', {bubbles:true, cancelable:true})); return output.textContent.length > 0; })()",
    },
  ],

  'js-survey-form': [
    {
      name: 'Survey questions rendered',
      test: "document.querySelectorAll('.survey-question').length >= 3",
    },
    {
      name: 'Selecting answer enables next',
      test: "(function() { var radio = document.querySelector('.survey-question input[type=\"radio\"]'); var next = document.getElementById('survey-next'); if (!radio || !next) return false; radio.click(); return !next.disabled; })()",
    },
    {
      name: 'Completing survey shows results',
      test: "(function() { var radios = document.querySelectorAll('.survey-question input[type=\"radio\"]'); var next = document.getElementById('survey-next'); var results = document.getElementById('survey-results'); if (radios.length === 0 || !next || !results) return false; radios[0].click(); next.click(); return results.style.display !== 'none' || document.querySelectorAll('.survey-question.active').length > 0; })()",
    },
  ],

  'js-textarea-autogrow': [
    {
      name: 'Textarea exists',
      test: "!!document.getElementById('auto-textarea')",
    },
    {
      name: 'Textarea grows when content exceeds height',
      test: "(function() { var ta = document.getElementById('auto-textarea'); if (!ta) return false; var before = ta.offsetHeight; ta.value = Array(10).join('\\nLine'); ta.dispatchEvent(new Event('input', {bubbles:true})); return ta.offsetHeight > before; })()",
    },
    {
      name: 'Character count updates',
      test: "(function() { var ta = document.getElementById('auto-textarea'); var count = document.getElementById('char-count'); if (!ta || !count) return false; ta.value = 'Hello'; ta.dispatchEvent(new Event('input', {bubbles:true})); return count.textContent.includes('5'); })()",
    },
  ],

  'js-phone-input': [
    {
      name: 'Phone input formats number',
      test: "(function() { var inp = document.getElementById('phone-input'); if (!inp) return false; inp.value = '2125551234'; inp.dispatchEvent(new Event('input', {bubbles:true})); return inp.value.includes('(') || inp.value.includes('-'); })()",
    },
    {
      name: 'Country code selector exists',
      test: "!!document.getElementById('country-code')",
    },
    {
      name: 'Changing country code updates format',
      test: "(function() { var sel = document.getElementById('country-code'); var inp = document.getElementById('phone-input'); if (!sel || !inp) return false; sel.value = '+44'; sel.dispatchEvent(new Event('change', {bubbles:true})); inp.value = '7911123456'; inp.dispatchEvent(new Event('input', {bubbles:true})); return inp.value.length > 0; })()",
    },
  ],

  'js-currency-input': [
    {
      name: 'Input formats value with currency symbol',
      test: "(function() { var inp = document.getElementById('currency-input'); if (!inp) return false; inp.value = '1234'; inp.dispatchEvent(new Event('input', {bubbles:true})); return inp.value.includes('$') || inp.value.includes(','); })()",
    },
    {
      name: 'Decimal places enforced',
      test: "(function() { var inp = document.getElementById('currency-input'); if (!inp) return false; inp.value = '99.999'; inp.dispatchEvent(new Event('blur', {bubbles:true})); var parts = inp.value.split('.'); return parts.length <= 2 && (!parts[1] || parts[1].replace(/[^0-9]/g,'').length <= 2); })()",
    },
    {
      name: 'Changing currency updates symbol',
      test: "(function() { var sel = document.getElementById('currency-select'); var inp = document.getElementById('currency-input'); if (!sel || !inp) return false; sel.value = 'EUR'; sel.dispatchEvent(new Event('change', {bubbles:true})); inp.value = '100'; inp.dispatchEvent(new Event('input', {bubbles:true})); return inp.value.includes('€') || document.getElementById('currency-symbol')?.textContent.includes('€'); })()",
    },
  ],

  'js-slider-range': [
    {
      name: 'Range slider rendered with two thumbs',
      test: "document.querySelectorAll('.range-thumb').length >= 2",
    },
    {
      name: 'Min and max labels display values',
      test: "(function() { var minLabel = document.getElementById('range-min-val'); var maxLabel = document.getElementById('range-max-val'); return minLabel && maxLabel && minLabel.textContent.length > 0 && maxLabel.textContent.length > 0; })()",
    },
    {
      name: 'Track fill reflects range between thumbs',
      test: "(function() { var fill = document.getElementById('range-fill'); if (!fill) return false; var w = parseFloat(fill.style.width); return !isNaN(w) && w > 0 && w < 100; })()",
    },
  ],

  'js-toggle-group': [
    {
      name: 'Toggle buttons rendered',
      test: "document.querySelectorAll('.toggle-btn').length >= 3",
    },
    {
      name: 'Clicking button activates it',
      test: "(function() { var btns = document.querySelectorAll('.toggle-btn'); if (btns.length < 3) return false; btns[1].click(); return btns[1].classList.contains('active'); })()",
    },
    {
      name: 'Only one button active at a time',
      test: "(function() { var btns = document.querySelectorAll('.toggle-btn'); if (btns.length < 3) return false; btns[0].click(); btns[2].click(); var active = document.querySelectorAll('.toggle-btn.active'); return active.length === 1 && btns[2].classList.contains('active'); })()",
    },
  ],

  'js-segmented-control': [
    {
      name: 'Segments rendered',
      test: "document.querySelectorAll('.segment').length >= 2",
    },
    {
      name: 'Clicking segment activates it and updates content',
      test: "(function() { var segs = document.querySelectorAll('.segment'); var content = document.getElementById('seg-content'); if (segs.length < 2 || !content) return false; var before = content.textContent; segs[1].click(); return segs[1].classList.contains('active') && content.textContent !== before; })()",
    },
    {
      name: 'Indicator slides to active segment',
      test: "(function() { var indicator = document.querySelector('.seg-indicator'); var segs = document.querySelectorAll('.segment'); if (!indicator || segs.length < 2) return false; segs[1].click(); var left = parseFloat(indicator.style.left || indicator.style.transform.replace(/[^0-9.-]/g,'')); return !isNaN(left); })()",
    },
  ],

  'js-combobox': [
    {
      name: 'Typing shows filtered options',
      test: "(function() { var inp = document.getElementById('combo-input'); var list = document.getElementById('combo-list'); if (!inp || !list) return false; inp.value = 'a'; inp.dispatchEvent(new Event('input', {bubbles:true})); return list.style.display !== 'none' && list.querySelectorAll('li').length > 0; })()",
    },
    {
      name: 'Clicking option fills input',
      test: "(function() { var inp = document.getElementById('combo-input'); var list = document.getElementById('combo-list'); if (!inp || !list) return false; inp.value = 'a'; inp.dispatchEvent(new Event('input', {bubbles:true})); var li = list.querySelector('li'); if (!li) return false; li.click(); return inp.value === li.textContent; })()",
    },
    {
      name: 'Arrow keys navigate options',
      test: "(function() { var inp = document.getElementById('combo-input'); var list = document.getElementById('combo-list'); if (!inp || !list) return false; inp.value = 'a'; inp.dispatchEvent(new Event('input', {bubbles:true})); inp.dispatchEvent(new KeyboardEvent('keydown', {key:'ArrowDown', bubbles:true})); return !!list.querySelector('li.active, li.highlighted, li[aria-selected=\"true\"]'); })()",
    },
  ],

  'js-mentions-input': [
    {
      name: 'Typing @ shows user suggestions',
      test: "(function() { var inp = document.getElementById('mentions-input'); var list = document.getElementById('mentions-list'); if (!inp || !list) return false; inp.value = '@'; inp.dispatchEvent(new Event('input', {bubbles:true})); return list.style.display !== 'none' && list.querySelectorAll('li').length > 0; })()",
    },
    {
      name: 'Clicking suggestion inserts mention',
      test: "(function() { var inp = document.getElementById('mentions-input'); var list = document.getElementById('mentions-list'); if (!inp || !list) return false; inp.value = '@'; inp.dispatchEvent(new Event('input', {bubbles:true})); var li = list.querySelector('li'); if (!li) return false; li.click(); return inp.value.includes('@') && list.style.display === 'none'; })()",
    },
  ],

  'js-code-input': [
    {
      name: 'Code editor area exists',
      test: "!!document.getElementById('code-editor')",
    },
    {
      name: 'Tab key inserts spaces or tab',
      test: "(function() { var editor = document.getElementById('code-editor'); if (!editor) return false; editor.focus(); var before = editor.value || editor.textContent; editor.dispatchEvent(new KeyboardEvent('keydown', {key:'Tab', bubbles:true})); var after = editor.value || editor.textContent; return after.length >= before.length; })()",
    },
    {
      name: 'Line numbers displayed',
      test: "(function() { var lines = document.getElementById('line-numbers'); return lines && lines.textContent.includes('1'); })()",
    },
  ],

  'js-signature-pad': [
    {
      name: 'Canvas element exists for drawing',
      test: "!!document.getElementById('sig-canvas')",
    },
    {
      name: 'Clear button resets canvas',
      test: "(function() { var canvas = document.getElementById('sig-canvas'); var clear = document.getElementById('sig-clear'); if (!canvas || !clear) return false; var ctx = canvas.getContext('2d'); ctx.fillRect(10,10,50,50); clear.click(); var data = ctx.getImageData(10,10,50,50).data; var isEmpty = true; for (var i = 3; i < data.length; i += 4) { if (data[i] > 0) { isEmpty = false; break; } } return isEmpty; })()",
    },
    {
      name: 'Mouse down starts drawing',
      test: "(function() { var canvas = document.getElementById('sig-canvas'); if (!canvas) return false; canvas.dispatchEvent(new MouseEvent('mousedown', {bubbles:true, clientX:50, clientY:50})); canvas.dispatchEvent(new MouseEvent('mousemove', {bubbles:true, clientX:100, clientY:100})); canvas.dispatchEvent(new MouseEvent('mouseup', {bubbles:true})); var ctx = canvas.getContext('2d'); var data = ctx.getImageData(0,0,canvas.width,canvas.height).data; var hasPixels = false; for (var i = 3; i < data.length; i += 4) { if (data[i] > 0) { hasPixels = true; break; } } return hasPixels; })()",
    },
  ],

  // ── New Patterns: Overlays & Popups ───────────────────────────────

  'js-tooltip': [
    {
      name: 'Hovering trigger shows tooltip',
      test: "(function() { var trigger = document.querySelector('.tooltip-trigger'); var tip = document.getElementById('tooltip'); if (!trigger || !tip) return false; trigger.dispatchEvent(new MouseEvent('mouseenter', {bubbles:true})); return tip.classList.contains('visible') || tip.style.display !== 'none'; })()",
    },
    {
      name: 'Mouse leave hides tooltip',
      test: "(function() { var trigger = document.querySelector('.tooltip-trigger'); var tip = document.getElementById('tooltip'); if (!trigger || !tip) return false; trigger.dispatchEvent(new MouseEvent('mouseenter', {bubbles:true})); trigger.dispatchEvent(new MouseEvent('mouseleave', {bubbles:true})); return !tip.classList.contains('visible') || tip.style.display === 'none'; })()",
    },
    {
      name: 'Tooltip content matches data attribute',
      test: "(function() { var trigger = document.querySelector('.tooltip-trigger'); var tip = document.getElementById('tooltip'); if (!trigger || !tip) return false; trigger.dispatchEvent(new MouseEvent('mouseenter', {bubbles:true})); return tip.textContent.length > 0; })()",
    },
  ],

  'js-popover': [
    {
      name: 'Clicking trigger shows popover',
      test: "(function() { var trigger = document.getElementById('popover-trigger'); var pop = document.getElementById('popover'); if (!trigger || !pop) return false; trigger.click(); return pop.classList.contains('open') || pop.style.display !== 'none'; })()",
    },
    {
      name: 'Clicking outside closes popover',
      test: "(function() { var trigger = document.getElementById('popover-trigger'); var pop = document.getElementById('popover'); if (!trigger || !pop) return false; trigger.click(); document.body.click(); return !pop.classList.contains('open') || pop.style.display === 'none'; })()",
    },
    {
      name: 'Popover has arrow element',
      test: "(function() { var trigger = document.getElementById('popover-trigger'); trigger?.click(); return !!document.querySelector('.popover-arrow'); })()",
    },
  ],

  'js-lightbox': [
    {
      name: 'Clicking image opens lightbox overlay',
      test: "(function() { var img = document.querySelector('.lb-thumb'); var overlay = document.getElementById('lb-overlay'); if (!img || !overlay) return false; img.click(); return overlay.classList.contains('open') || overlay.style.display !== 'none'; })()",
    },
    {
      name: 'Close button closes lightbox',
      test: "(function() { var img = document.querySelector('.lb-thumb'); var overlay = document.getElementById('lb-overlay'); var close = document.getElementById('lb-close-btn'); if (!img || !overlay || !close) return false; img.click(); close.click(); return !overlay.classList.contains('open') || overlay.style.display === 'none'; })()",
    },
    {
      name: 'Navigation arrows cycle images',
      test: "(function() { var img = document.querySelector('.lb-thumb'); var overlay = document.getElementById('lb-overlay'); var next = document.getElementById('lb-next-btn'); var caption = document.getElementById('lb-caption'); if (!img || !overlay || !next) return false; img.click(); var before = caption ? caption.textContent : overlay.querySelector('img')?.src; next.click(); var after = caption ? caption.textContent : overlay.querySelector('img')?.src; return before !== after; })()",
    },
  ],

  // ── New Patterns: Interactive Lists & Layouts ─────────────────────

  'js-sortable-list': [
    {
      name: 'List items rendered',
      test: "document.querySelectorAll('#sortable .sort-item').length >= 3",
    },
    {
      name: 'Drag start sets dragging state',
      test: "(function() { var item = document.querySelector('.sort-item'); if (!item) return false; item.dispatchEvent(new DragEvent('dragstart', {bubbles:true})); return item.classList.contains('dragging'); })()",
    },
    {
      name: 'Drag end clears dragging state',
      test: "(function() { var item = document.querySelector('.sort-item'); if (!item) return false; item.classList.add('dragging'); item.dispatchEvent(new DragEvent('dragend', {bubbles:true})); return !item.classList.contains('dragging'); })()",
    },
  ],

  'js-resizable-panels': [
    {
      name: 'Panels rendered',
      test: "document.querySelectorAll('.panel').length >= 2",
    },
    {
      name: 'Divider handle exists',
      test: "!!document.querySelector('.panel-divider, .resize-handle')",
    },
    {
      name: 'Panels have initial widths set',
      test: "(function() { var panels = document.querySelectorAll('.panel'); if (panels.length < 2) return false; return panels[0].style.width.length > 0 || panels[0].style.flex.length > 0; })()",
    },
  ],

  'js-split-view': [
    {
      name: 'Split panes rendered',
      test: "document.querySelectorAll('.split-pane').length >= 2",
    },
    {
      name: 'Splitter handle exists',
      test: "!!document.querySelector('.splitter')",
    },
    {
      name: 'Dragging splitter changes pane sizes',
      test: "(function() { var splitter = document.querySelector('.splitter'); var pane = document.querySelector('.split-pane'); if (!splitter || !pane) return false; var before = pane.offsetWidth; splitter.dispatchEvent(new MouseEvent('mousedown', {bubbles:true, clientX:200})); document.dispatchEvent(new MouseEvent('mousemove', {bubbles:true, clientX:300})); document.dispatchEvent(new MouseEvent('mouseup', {bubbles:true})); return true; })()",
    },
  ],

  'js-kanban-board': [
    {
      name: 'Columns rendered',
      test: "document.querySelectorAll('.kanban-column').length >= 3",
    },
    {
      name: 'Cards rendered in columns',
      test: "document.querySelectorAll('.kanban-card').length >= 3",
    },
    {
      name: 'Add card button creates new card',
      test: "(function() { var btn = document.querySelector('.add-card-btn'); var col = document.querySelector('.kanban-column .card-list'); if (!btn || !col) return false; var before = col.querySelectorAll('.kanban-card').length; btn.click(); return col.querySelectorAll('.kanban-card').length > before; })()",
    },
  ],

  'js-timeline': [
    {
      name: 'Timeline events rendered',
      test: "document.querySelectorAll('.timeline-event').length >= 3",
    },
    {
      name: 'Events have dates',
      test: "document.querySelectorAll('.timeline-date').length >= 3",
    },
    {
      name: 'Clicking event expands details',
      test: "(function() { var ev = document.querySelector('.timeline-event'); if (!ev) return false; ev.click(); return ev.classList.contains('expanded') || !!ev.querySelector('.event-details:not([style*=\"none\"])'); })()",
    },
  ],

  'js-tree-view': [
    {
      name: 'Tree nodes rendered',
      test: "document.querySelectorAll('.tree-node').length >= 3",
    },
    {
      name: 'Clicking toggle expands node children',
      test: "(function() { var toggle = document.querySelector('.tree-toggle'); if (!toggle) return false; toggle.click(); var parent = toggle.closest('.tree-node'); return parent && parent.classList.contains('expanded'); })()",
    },
    {
      name: 'Clicking expanded toggle collapses children',
      test: "(function() { var toggle = document.querySelector('.tree-toggle'); if (!toggle) return false; toggle.click(); toggle.click(); var parent = toggle.closest('.tree-node'); return parent && !parent.classList.contains('expanded'); })()",
    },
  ],

  'js-collapsible-panel': [
    {
      name: 'Panel header exists',
      test: "!!document.querySelector('.collapsible-header')",
    },
    {
      name: 'Clicking header toggles panel body',
      test: "(function() { var header = document.querySelector('.collapsible-header'); var body = document.querySelector('.collapsible-body'); if (!header || !body) return false; header.click(); return body.classList.contains('open') || body.style.display !== 'none'; })()",
    },
    {
      name: 'Toggle icon rotates on expand',
      test: "(function() { var header = document.querySelector('.collapsible-header'); var icon = document.querySelector('.collapsible-icon'); if (!header || !icon) return false; header.click(); return icon.classList.contains('rotated') || header.closest('.collapsible')?.classList.contains('open'); })()",
    },
  ],

  'js-drawer': [
    {
      name: 'Drawer hidden initially',
      test: "(function() { var drawer = document.getElementById('drawer'); return drawer && (!drawer.classList.contains('open')); })()",
    },
    {
      name: 'Open button shows drawer',
      test: "(function() { var btn = document.getElementById('drawer-open'); var drawer = document.getElementById('drawer'); if (!btn || !drawer) return false; btn.click(); return drawer.classList.contains('open'); })()",
    },
    {
      name: 'Close button hides drawer',
      test: "(function() { var open = document.getElementById('drawer-open'); var close = document.getElementById('drawer-close'); var drawer = document.getElementById('drawer'); if (!open || !close || !drawer) return false; open.click(); close.click(); return !drawer.classList.contains('open'); })()",
    },
  ],

  'js-bottom-sheet': [
    {
      name: 'Bottom sheet hidden initially',
      test: "(function() { var sheet = document.getElementById('bottom-sheet'); return sheet && !sheet.classList.contains('open'); })()",
    },
    {
      name: 'Trigger button shows bottom sheet',
      test: "(function() { var btn = document.getElementById('sheet-trigger'); var sheet = document.getElementById('bottom-sheet'); if (!btn || !sheet) return false; btn.click(); return sheet.classList.contains('open'); })()",
    },
    {
      name: 'Dragging handle down closes sheet',
      test: "(function() { var btn = document.getElementById('sheet-trigger'); var sheet = document.getElementById('bottom-sheet'); var handle = document.querySelector('.sheet-handle'); if (!btn || !sheet || !handle) return false; btn.click(); handle.dispatchEvent(new MouseEvent('mousedown', {bubbles:true, clientY:400})); document.dispatchEvent(new MouseEvent('mousemove', {bubbles:true, clientY:600})); document.dispatchEvent(new MouseEvent('mouseup', {bubbles:true})); return !sheet.classList.contains('open'); })()",
    },
  ],

  'js-command-palette': [
    {
      name: 'Ctrl+K opens command palette',
      test: "(function() { var palette = document.getElementById('cmd-palette'); if (!palette) return false; document.dispatchEvent(new KeyboardEvent('keydown', {key:'k', ctrlKey:true, bubbles:true})); return palette.classList.contains('open') || palette.style.display !== 'none'; })()",
    },
    {
      name: 'Typing filters commands',
      test: "(function() { var palette = document.getElementById('cmd-palette'); var input = document.getElementById('cmd-input'); var list = document.getElementById('cmd-list'); if (!palette || !input || !list) return false; document.dispatchEvent(new KeyboardEvent('keydown', {key:'k', ctrlKey:true, bubbles:true})); var before = list.querySelectorAll('li').length; input.value = 'set'; input.dispatchEvent(new Event('input', {bubbles:true})); var after = list.querySelectorAll('li').length; return after < before || after > 0; })()",
    },
    {
      name: 'Escape closes palette',
      test: "(function() { var palette = document.getElementById('cmd-palette'); if (!palette) return false; document.dispatchEvent(new KeyboardEvent('keydown', {key:'k', ctrlKey:true, bubbles:true})); document.dispatchEvent(new KeyboardEvent('keydown', {key:'Escape', bubbles:true})); return !palette.classList.contains('open') || palette.style.display === 'none'; })()",
    },
  ],

  'js-spotlight-search': [
    {
      name: 'Shortcut opens spotlight',
      test: "(function() { var spotlight = document.getElementById('spotlight'); if (!spotlight) return false; document.dispatchEvent(new KeyboardEvent('keydown', {key:'/', bubbles:true})); return spotlight.classList.contains('open') || spotlight.style.display !== 'none'; })()",
    },
    {
      name: 'Typing shows search results',
      test: "(function() { var spotlight = document.getElementById('spotlight'); var input = document.getElementById('spotlight-input'); var results = document.getElementById('spotlight-results'); if (!spotlight || !input || !results) return false; document.dispatchEvent(new KeyboardEvent('keydown', {key:'/', bubbles:true})); input.value = 'test'; input.dispatchEvent(new Event('input', {bubbles:true})); return new Promise(function(resolve) { setTimeout(function() { resolve(results.querySelectorAll('li').length > 0); }, 300); }); })()",
    },
  ],

  'js-floating-action-btn': [
    {
      name: 'FAB button exists',
      test: "!!document.getElementById('fab')",
    },
    {
      name: 'Clicking FAB expands action menu',
      test: "(function() { var fab = document.getElementById('fab'); var menu = document.getElementById('fab-menu'); if (!fab || !menu) return false; fab.click(); return menu.classList.contains('open') || menu.style.display !== 'none'; })()",
    },
    {
      name: 'Clicking action item triggers action',
      test: "(function() { var fab = document.getElementById('fab'); var menu = document.getElementById('fab-menu'); if (!fab || !menu) return false; fab.click(); var item = menu.querySelector('.fab-action'); if (!item) return false; item.click(); return !menu.classList.contains('open') || menu.style.display === 'none'; })()",
    },
  ],

  // ── New Patterns: UI Primitives & Indicators ──────────────────────

  'js-skeleton-loader': [
    {
      name: 'Skeleton placeholders rendered',
      test: "document.querySelectorAll('.skeleton').length > 0",
    },
    {
      name: 'Loading button triggers content load',
      test: "(function() { var btn = document.getElementById('load-btn'); if (!btn) return false; btn.click(); return new Promise(function(resolve) { setTimeout(function() { resolve(document.querySelectorAll('.skeleton').length === 0 || document.querySelectorAll('.loaded-content').length > 0); }, 1500); }); })()",
    },
  ],

  'js-progress-bar': [
    {
      name: 'Progress bar element exists',
      test: "!!document.getElementById('progress-bar')",
    },
    {
      name: 'Start button animates progress',
      test: "(function() { var btn = document.getElementById('progress-start'); var bar = document.getElementById('progress-fill'); if (!btn || !bar) return false; btn.click(); return new Promise(function(resolve) { setTimeout(function() { resolve(parseFloat(bar.style.width) > 0); }, 500); }); })()",
    },
    {
      name: 'Progress label shows percentage',
      test: "(function() { var btn = document.getElementById('progress-start'); var label = document.getElementById('progress-label'); if (!btn || !label) return false; btn.click(); return new Promise(function(resolve) { setTimeout(function() { resolve(label.textContent.includes('%')); }, 500); }); })()",
    },
  ],

  'js-badge': [
    {
      name: 'Badges rendered',
      test: "document.querySelectorAll('.badge').length >= 3",
    },
    {
      name: 'Increment button updates badge count',
      test: "(function() { var btn = document.getElementById('badge-inc'); var badge = document.getElementById('badge-count'); if (!btn || !badge) return false; var before = parseInt(badge.textContent); btn.click(); var after = parseInt(badge.textContent); return after > before; })()",
    },
    {
      name: 'Clear button resets badge',
      test: "(function() { var inc = document.getElementById('badge-inc'); var clear = document.getElementById('badge-clear'); var badge = document.getElementById('badge-count'); if (!inc || !clear || !badge) return false; inc.click(); clear.click(); return badge.textContent === '0' || badge.style.display === 'none'; })()",
    },
  ],

  'js-avatar': [
    {
      name: 'Avatar elements rendered',
      test: "document.querySelectorAll('.avatar').length >= 3",
    },
    {
      name: 'Avatars show initials when no image',
      test: "(function() { var avatars = document.querySelectorAll('.avatar'); for (var i = 0; i < avatars.length; i++) { if (avatars[i].textContent.trim().length > 0 && !avatars[i].querySelector('img')) return true; } return false; })()",
    },
    {
      name: 'Different size classes applied',
      test: "(function() { var sm = document.querySelector('.avatar.avatar-sm, .avatar.small'); var lg = document.querySelector('.avatar.avatar-lg, .avatar.large'); return !!sm || !!lg; })()",
    },
  ],

  'js-stat-card': [
    {
      name: 'Stat cards rendered',
      test: "document.querySelectorAll('.stat-card').length >= 3",
    },
    {
      name: 'Cards display numeric values',
      test: "(function() { var val = document.querySelector('.stat-value'); return val && val.textContent.match(/\\d/) !== null; })()",
    },
    {
      name: 'Refresh button updates values',
      test: "(function() { var btn = document.getElementById('refresh-stats'); var val = document.querySelector('.stat-value'); if (!btn || !val) return false; var before = val.textContent; btn.click(); return new Promise(function(resolve) { setTimeout(function() { resolve(val.textContent !== before || val.textContent.match(/\\d/) !== null); }, 300); }); })()",
    },
  ],

  // ── New Patterns: Content & Data Display ──────────────────────────

  'js-timeline-feed': [
    {
      name: 'Feed items rendered',
      test: "document.querySelectorAll('.feed-item').length >= 3",
    },
    {
      name: 'Items have timestamps',
      test: "document.querySelectorAll('.feed-time').length >= 3",
    },
    {
      name: 'Load more button adds items',
      test: "(function() { var btn = document.getElementById('load-more'); var feed = document.getElementById('feed-list'); if (!btn || !feed) return false; var before = feed.querySelectorAll('.feed-item').length; btn.click(); return new Promise(function(resolve) { setTimeout(function() { resolve(feed.querySelectorAll('.feed-item').length > before); }, 500); }); })()",
    },
  ],

  'js-activity-log': [
    {
      name: 'Log entries rendered',
      test: "document.querySelectorAll('.log-entry').length >= 3",
    },
    {
      name: 'Filter dropdown filters entries',
      test: "(function() { var filter = document.getElementById('log-filter'); var log = document.getElementById('activity-log'); if (!filter || !log) return false; var before = log.querySelectorAll('.log-entry').length; filter.value = 'error'; filter.dispatchEvent(new Event('change', {bubbles:true})); var after = log.querySelectorAll('.log-entry').length; return after <= before; })()",
    },
    {
      name: 'Clear button removes entries',
      test: "(function() { var clear = document.getElementById('clear-log'); var log = document.getElementById('activity-log'); if (!clear || !log) return false; clear.click(); return log.querySelectorAll('.log-entry').length === 0; })()",
    },
  ],

  'js-diff-viewer': [
    {
      name: 'Diff lines rendered',
      test: "document.querySelectorAll('.diff-line').length > 0",
    },
    {
      name: 'Added lines highlighted green',
      test: "document.querySelectorAll('.diff-line.added, .diff-line.add').length > 0",
    },
    {
      name: 'Removed lines highlighted red',
      test: "document.querySelectorAll('.diff-line.removed, .diff-line.del').length > 0",
    },
  ],

  'js-code-block': [
    {
      name: 'Code block rendered with content',
      test: "(function() { var block = document.querySelector('.code-block'); return block && block.textContent.trim().length > 0; })()",
    },
    {
      name: 'Copy button copies code',
      test: "(function() { var btn = document.querySelector('.code-copy-btn'); if (!btn) return false; btn.click(); return btn.textContent.includes('Copied') || btn.classList.contains('copied'); })()",
    },
    {
      name: 'Line numbers displayed',
      test: "(function() { var nums = document.querySelector('.code-line-numbers, .line-nums'); return nums && nums.textContent.includes('1'); })()",
    },
  ],

  'js-markdown-preview': [
    {
      name: 'Editor and preview panes exist',
      test: "!!document.getElementById('md-editor') && !!document.getElementById('md-preview')",
    },
    {
      name: 'Typing markdown updates preview',
      test: "(function() { var editor = document.getElementById('md-editor'); var preview = document.getElementById('md-preview'); if (!editor || !preview) return false; editor.value = '# Hello'; editor.dispatchEvent(new Event('input', {bubbles:true})); return preview.innerHTML.includes('<h1') || preview.innerHTML.includes('Hello'); })()",
    },
    {
      name: 'Bold syntax renders strong tag',
      test: "(function() { var editor = document.getElementById('md-editor'); var preview = document.getElementById('md-preview'); if (!editor || !preview) return false; editor.value = '**bold**'; editor.dispatchEvent(new Event('input', {bubbles:true})); return preview.innerHTML.includes('<strong') || preview.innerHTML.includes('<b'); })()",
    },
  ],

  'js-json-viewer': [
    {
      name: 'JSON tree rendered',
      test: "document.querySelectorAll('.json-node, .json-key').length > 0",
    },
    {
      name: 'Clicking object node collapses it',
      test: "(function() { var node = document.querySelector('.json-toggle, .json-collapsible'); if (!node) return false; node.click(); return node.classList.contains('collapsed') || node.parentElement.classList.contains('collapsed'); })()",
    },
    {
      name: 'Expand all button expands nodes',
      test: "(function() { var btn = document.getElementById('json-expand-all'); if (!btn) return false; btn.click(); var collapsed = document.querySelectorAll('.json-toggle.collapsed, .collapsed'); return collapsed.length === 0; })()",
    },
  ],

  'js-comparison-table': [
    {
      name: 'Table headers rendered',
      test: "document.querySelectorAll('#comparison-table th').length >= 3",
    },
    {
      name: 'Feature rows rendered',
      test: "document.querySelectorAll('#comparison-table tbody tr').length >= 3",
    },
    {
      name: 'Highlight column on hover',
      test: "(function() { var th = document.querySelectorAll('#comparison-table th'); if (th.length < 2) return false; th[1].dispatchEvent(new MouseEvent('mouseenter', {bubbles:true})); return th[1].classList.contains('highlighted') || document.querySelectorAll('.col-highlight').length > 0; })()",
    },
  ],

  'js-pricing-table': [
    {
      name: 'Pricing plans rendered',
      test: "document.querySelectorAll('.pricing-plan').length >= 2",
    },
    {
      name: 'Toggle between monthly and annual pricing',
      test: "(function() { var toggle = document.getElementById('billing-toggle'); var price = document.querySelector('.plan-price'); if (!toggle || !price) return false; var before = price.textContent; toggle.click(); var after = price.textContent; return before !== after; })()",
    },
    {
      name: 'CTA buttons exist for each plan',
      test: "document.querySelectorAll('.pricing-plan .plan-cta').length >= 2",
    },
  ],

  'js-feature-list': [
    {
      name: 'Feature items rendered',
      test: "document.querySelectorAll('.feature-item').length >= 4",
    },
    {
      name: 'Features have icons',
      test: "document.querySelectorAll('.feature-icon').length >= 4",
    },
    {
      name: 'Clicking feature shows details',
      test: "(function() { var item = document.querySelector('.feature-item'); if (!item) return false; item.click(); return item.classList.contains('expanded') || !!item.querySelector('.feature-details:not([style*=\"none\"])'); })()",
    },
  ],

  'js-testimonials': [
    {
      name: 'Testimonial cards rendered',
      test: "document.querySelectorAll('.testimonial').length >= 2",
    },
    {
      name: 'Navigation arrows exist',
      test: "!!document.getElementById('test-prev') && !!document.getElementById('test-next')",
    },
    {
      name: 'Next button cycles testimonial',
      test: "(function() { var next = document.getElementById('test-next'); var container = document.getElementById('testimonial-track'); if (!next || !container) return false; var before = container.style.transform || container.scrollLeft; next.click(); var after = container.style.transform || container.scrollLeft; return before !== after; })()",
    },
  ],

  'js-team-grid': [
    {
      name: 'Team member cards rendered',
      test: "document.querySelectorAll('.team-member').length >= 4",
    },
    {
      name: 'Members have names and roles',
      test: "document.querySelectorAll('.member-name').length >= 4 && document.querySelectorAll('.member-role').length >= 4",
    },
    {
      name: 'Clicking member shows bio',
      test: "(function() { var member = document.querySelector('.team-member'); if (!member) return false; member.click(); return !!document.querySelector('.member-bio:not([style*=\"none\"])') || member.classList.contains('expanded'); })()",
    },
  ],

  'js-changelog': [
    {
      name: 'Changelog entries rendered',
      test: "document.querySelectorAll('.changelog-entry').length >= 3",
    },
    {
      name: 'Entries have version and date',
      test: "(function() { var entry = document.querySelector('.changelog-entry'); if (!entry) return false; return !!entry.querySelector('.version') && !!entry.querySelector('.date, .changelog-date'); })()",
    },
    {
      name: 'Filter by type narrows entries',
      test: "(function() { var filter = document.getElementById('changelog-filter'); var entries = document.querySelectorAll('.changelog-entry'); if (!filter || entries.length === 0) return false; filter.value = 'feature'; filter.dispatchEvent(new Event('change', {bubbles:true})); return document.querySelectorAll('.changelog-entry:not([style*=\"none\"])').length <= entries.length; })()",
    },
  ],

  'js-status-page': [
    {
      name: 'Service status items rendered',
      test: "document.querySelectorAll('.status-item').length >= 3",
    },
    {
      name: 'Overall status indicator exists',
      test: "!!document.getElementById('overall-status')",
    },
    {
      name: 'Refresh button updates statuses',
      test: "(function() { var btn = document.getElementById('status-refresh'); if (!btn) return false; btn.click(); return new Promise(function(resolve) { setTimeout(function() { var items = document.querySelectorAll('.status-item'); resolve(items.length >= 3); }, 500); }); })()",
    },
  ],

  // ── New Patterns: Navigation & Routing ────────────────────────────

  'js-metric-dashboard': [
    {
      name: 'Metric widgets rendered',
      test: "document.querySelectorAll('.metric-widget').length >= 4",
    },
    {
      name: 'Widgets display numeric values',
      test: "(function() { var vals = document.querySelectorAll('.metric-value'); if (vals.length === 0) return false; return vals[0].textContent.match(/\\d/) !== null; })()",
    },
    {
      name: 'Time range selector updates data',
      test: "(function() { var sel = document.getElementById('time-range'); var val = document.querySelector('.metric-value'); if (!sel || !val) return false; var before = val.textContent; sel.value = '7d'; sel.dispatchEvent(new Event('change', {bubbles:true})); return new Promise(function(resolve) { setTimeout(function() { resolve(true); }, 300); }); })()",
    },
  ],

  'js-command-menu': [
    {
      name: 'Keyboard shortcut opens command menu',
      test: "(function() { var menu = document.getElementById('command-menu'); if (!menu) return false; document.dispatchEvent(new KeyboardEvent('keydown', {key:'k', metaKey:true, bubbles:true})); return menu.classList.contains('open') || menu.style.display !== 'none'; })()",
    },
    {
      name: 'Command items rendered',
      test: "(function() { var menu = document.getElementById('command-menu'); if (!menu) return false; document.dispatchEvent(new KeyboardEvent('keydown', {key:'k', metaKey:true, bubbles:true})); return menu.querySelectorAll('.cmd-item').length >= 3; })()",
    },
    {
      name: 'Typing filters commands',
      test: "(function() { var menu = document.getElementById('command-menu'); var input = document.getElementById('cmd-search'); if (!menu || !input) return false; document.dispatchEvent(new KeyboardEvent('keydown', {key:'k', metaKey:true, bubbles:true})); var before = menu.querySelectorAll('.cmd-item').length; input.value = 'z'; input.dispatchEvent(new Event('input', {bubbles:true})); var after = menu.querySelectorAll('.cmd-item:not([style*=\"none\"])').length; return after <= before; })()",
    },
  ],

  'js-mini-map': [
    {
      name: 'Mini map rendered',
      test: "!!document.getElementById('minimap')",
    },
    {
      name: 'Viewport indicator shown',
      test: "!!document.querySelector('.minimap-viewport')",
    },
    {
      name: 'Scrolling content moves viewport indicator',
      test: "(function() { var content = document.getElementById('minimap-content'); var viewport = document.querySelector('.minimap-viewport'); if (!content || !viewport) return false; var before = viewport.style.top; content.scrollTop = 200; content.dispatchEvent(new Event('scroll', {bubbles:true})); return viewport.style.top !== before; })()",
    },
  ],

  'js-scroll-to-top': [
    {
      name: 'Button hidden at top of page',
      test: "(function() { var btn = document.getElementById('scroll-top'); return btn && (btn.style.display === 'none' || !btn.classList.contains('visible')); })()",
    },
    {
      name: 'Button appears after scrolling',
      test: "(function() { var btn = document.getElementById('scroll-top'); var scroller = document.getElementById('scroll-area') || window; if (!btn) return false; if (scroller.scrollTop !== undefined) scroller.scrollTop = 500; scroller.dispatchEvent ? scroller.dispatchEvent(new Event('scroll', {bubbles:true})) : window.dispatchEvent(new Event('scroll')); return btn.classList.contains('visible') || btn.style.display !== 'none'; })()",
    },
    {
      name: 'Clicking button scrolls to top',
      test: "(function() { var btn = document.getElementById('scroll-top'); var scroller = document.getElementById('scroll-area') || document.documentElement; if (!btn) return false; scroller.scrollTop = 500; btn.click(); return new Promise(function(resolve) { setTimeout(function() { resolve(scroller.scrollTop < 500); }, 500); }); })()",
    },
  ],

  'js-anchor-links': [
    {
      name: 'Anchor links rendered',
      test: 'document.querySelectorAll(\'a[href^="#"]\').length >= 3',
    },
    {
      name: 'Clicking anchor scrolls to section',
      test: '(function() { var link = document.querySelector(\'a[href^="#"]\'); if (!link) return false; link.click(); return true; })()',
    },
    {
      name: 'Active anchor highlighted on scroll',
      test: "(function() { var links = document.querySelectorAll('.anchor-link'); var scroller = document.getElementById('anchor-content') || window; if (links.length === 0) return false; if (scroller.scrollTop !== undefined) scroller.scrollTop = 300; scroller.dispatchEvent ? scroller.dispatchEvent(new Event('scroll', {bubbles:true})) : window.dispatchEvent(new Event('scroll')); return !!document.querySelector('.anchor-link.active'); })()",
    },
  ],

  'js-table-of-contents': [
    {
      name: 'TOC items rendered from headings',
      test: "document.querySelectorAll('#toc li, .toc-item').length >= 3",
    },
    {
      name: 'TOC items link to headings',
      test: "(function() { var item = document.querySelector('#toc a, .toc-item a'); return item && item.getAttribute('href')?.startsWith('#'); })()",
    },
    {
      name: 'Clicking TOC item scrolls to heading',
      test: "(function() { var item = document.querySelector('#toc a, .toc-item a'); if (!item) return false; item.click(); return true; })()",
    },
  ],

  'js-step-indicator': [
    {
      name: 'Steps rendered',
      test: "document.querySelectorAll('.step-item').length >= 3",
    },
    {
      name: 'Current step is highlighted',
      test: "!!document.querySelector('.step-item.active, .step-item.current')",
    },
    {
      name: 'Next button advances step',
      test: "(function() { var btn = document.getElementById('step-next'); var steps = document.querySelectorAll('.step-item'); if (!btn || steps.length < 3) return false; btn.click(); return steps[1].classList.contains('active') || steps[1].classList.contains('current'); })()",
    },
  ],

  'js-app-shell': [
    {
      name: 'Shell layout with header, sidebar, main',
      test: "!!document.querySelector('.app-header') && !!document.querySelector('.app-sidebar') && !!document.querySelector('.app-main')",
    },
    {
      name: 'Sidebar toggle collapses sidebar',
      test: "(function() { var btn = document.getElementById('sidebar-toggle'); var sidebar = document.querySelector('.app-sidebar'); if (!btn || !sidebar) return false; btn.click(); return sidebar.classList.contains('collapsed'); })()",
    },
    {
      name: 'Nav items change main content',
      test: "(function() { var items = document.querySelectorAll('.app-nav-item'); var main = document.querySelector('.app-main'); if (items.length < 2 || !main) return false; var before = main.textContent; items[1].click(); return main.textContent !== before; })()",
    },
  ],

  'js-header-scroll-hide': [
    {
      name: 'Header visible at top',
      test: "(function() { var header = document.getElementById('scroll-header'); return header && !header.classList.contains('hidden'); })()",
    },
    {
      name: 'Scrolling down hides header',
      test: "(function() { var header = document.getElementById('scroll-header'); var scroller = document.getElementById('scroll-content') || window; if (!header) return false; if (scroller.scrollTop !== undefined) scroller.scrollTop = 200; scroller.dispatchEvent ? scroller.dispatchEvent(new Event('scroll', {bubbles:true})) : window.dispatchEvent(new Event('scroll')); return header.classList.contains('hidden') || parseFloat(header.style.transform?.replace(/[^0-9.-]/g,'')) < 0; })()",
    },
    {
      name: 'Scrolling up shows header again',
      test: "(function() { var header = document.getElementById('scroll-header'); var scroller = document.getElementById('scroll-content') || window; if (!header) return false; if (scroller.scrollTop !== undefined) { scroller.scrollTop = 300; scroller.dispatchEvent(new Event('scroll', {bubbles:true})); scroller.scrollTop = 100; scroller.dispatchEvent(new Event('scroll', {bubbles:true})); } return !header.classList.contains('hidden'); })()",
    },
  ],

  'js-sticky-header': [
    {
      name: 'Header element exists',
      test: "!!document.getElementById('sticky-header')",
    },
    {
      name: 'Header becomes sticky on scroll',
      test: "(function() { var header = document.getElementById('sticky-header'); var scroller = document.getElementById('sticky-content') || window; if (!header) return false; if (scroller.scrollTop !== undefined) scroller.scrollTop = 200; scroller.dispatchEvent ? scroller.dispatchEvent(new Event('scroll', {bubbles:true})) : window.dispatchEvent(new Event('scroll')); return header.classList.contains('sticky') || getComputedStyle(header).position === 'fixed'; })()",
    },
  ],

  'js-page-transitions': [
    {
      name: 'Pages exist in the DOM',
      test: "document.querySelectorAll('.page').length >= 2",
    },
    {
      name: 'Clicking navigation triggers transition',
      test: "(function() { var links = document.querySelectorAll('.page-link'); if (links.length < 2) return false; links[1].click(); return new Promise(function(resolve) { setTimeout(function() { var active = document.querySelector('.page.active, .page.visible'); resolve(!!active); }, 500); }); })()",
    },
  ],

  'js-route-guard': [
    {
      name: 'Protected route blocks unauthenticated access',
      test: "(function() { var link = document.querySelector('[data-route=\"protected\"]'); var msg = document.getElementById('guard-msg'); if (!link) return false; link.click(); return msg && msg.textContent.length > 0; })()",
    },
    {
      name: 'Login enables protected route access',
      test: "(function() { var loginBtn = document.getElementById('guard-login'); var link = document.querySelector('[data-route=\"protected\"]'); var content = document.getElementById('route-content'); if (!loginBtn || !link || !content) return false; loginBtn.click(); link.click(); return content.textContent.includes('Protected') || content.textContent.length > 0; })()",
    },
  ],

  'js-nested-routes': [
    {
      name: 'Parent route links rendered',
      test: "document.querySelectorAll('.parent-route').length >= 2",
    },
    {
      name: 'Clicking parent route shows child routes',
      test: "(function() { var parent = document.querySelector('.parent-route'); if (!parent) return false; parent.click(); return document.querySelectorAll('.child-route').length > 0; })()",
    },
    {
      name: 'Clicking child route shows nested content',
      test: "(function() { var parent = document.querySelector('.parent-route'); if (!parent) return false; parent.click(); var child = document.querySelector('.child-route'); if (!child) return false; child.click(); var content = document.getElementById('nested-content'); return content && content.textContent.length > 0; })()",
    },
  ],

  'js-tab-router': [
    {
      name: 'Router tabs rendered',
      test: "document.querySelectorAll('.router-tab').length >= 3",
    },
    {
      name: 'Clicking tab updates URL hash',
      test: "(function() { var tabs = document.querySelectorAll('.router-tab'); if (tabs.length < 2) return false; tabs[1].click(); return window.location.hash.length > 0; })()",
    },
    {
      name: 'Tab content changes on navigation',
      test: "(function() { var tabs = document.querySelectorAll('.router-tab'); var content = document.getElementById('router-content'); if (tabs.length < 2 || !content) return false; var before = content.textContent; tabs[1].click(); return content.textContent !== before; })()",
    },
  ],

  'js-deep-linking': [
    {
      name: 'URL hash read on load',
      test: "(function() { var content = document.getElementById('dl-content'); return !!content; })()",
    },
    {
      name: 'Clicking link updates hash and content',
      test: "(function() { var link = document.querySelector('.deep-link'); var content = document.getElementById('dl-content'); if (!link || !content) return false; var before = content.textContent; link.click(); return window.location.hash.length > 0; })()",
    },
  ],

  'js-url-state': [
    {
      name: 'State reflected in URL params',
      test: "(function() { var inp = document.getElementById('url-input'); if (!inp) return false; inp.value = 'test'; inp.dispatchEvent(new Event('input', {bubbles:true})); return window.location.search.includes('test') || window.location.hash.includes('test'); })()",
    },
    {
      name: 'Page loads state from URL',
      test: "(function() { var display = document.getElementById('url-display'); return !!display; })()",
    },
  ],

  'js-back-to-top': [
    {
      name: 'Button hidden initially',
      test: "(function() { var btn = document.getElementById('btt-btn'); return btn && (btn.style.display === 'none' || btn.style.opacity === '0' || !btn.classList.contains('visible')); })()",
    },
    {
      name: 'Button visible after scrolling down',
      test: "(function() { var btn = document.getElementById('btt-btn'); var scroller = document.getElementById('btt-area') || window; if (!btn) return false; if (scroller.scrollTop !== undefined) scroller.scrollTop = 500; scroller.dispatchEvent ? scroller.dispatchEvent(new Event('scroll', {bubbles:true})) : window.dispatchEvent(new Event('scroll')); return btn.classList.contains('visible') || btn.style.display !== 'none'; })()",
    },
  ],

  'js-scroll-spy': [
    {
      name: 'Spy links rendered',
      test: "document.querySelectorAll('.spy-link').length >= 3",
    },
    {
      name: 'Active link updates on scroll',
      test: "(function() { var scroller = document.getElementById('spy-content') || window; if (scroller.scrollTop !== undefined) scroller.scrollTop = 400; scroller.dispatchEvent ? scroller.dispatchEvent(new Event('scroll', {bubbles:true})) : window.dispatchEvent(new Event('scroll')); return !!document.querySelector('.spy-link.active'); })()",
    },
  ],

  // ── New Patterns: State & Accessibility ───────────────────────────

  'js-theme-switcher': [
    {
      name: 'Theme toggle button exists',
      test: "!!document.getElementById('theme-toggle')",
    },
    {
      name: 'Clicking toggle switches theme class on body',
      test: "(function() { var btn = document.getElementById('theme-toggle'); if (!btn) return false; var before = document.body.classList.contains('dark') || document.documentElement.getAttribute('data-theme'); btn.click(); var after = document.body.classList.contains('dark') || document.documentElement.getAttribute('data-theme'); return before !== after; })()",
    },
    {
      name: 'Theme persists to localStorage',
      test: "(function() { var btn = document.getElementById('theme-toggle'); if (!btn) return false; btn.click(); return localStorage.getItem('theme') !== null; })()",
    },
  ],

  'js-i18n-locale': [
    {
      name: 'Language selector exists',
      test: "!!document.getElementById('lang-select')",
    },
    {
      name: 'Changing language updates text content',
      test: "(function() { var sel = document.getElementById('lang-select'); var content = document.getElementById('i18n-content'); if (!sel || !content) return false; var before = content.textContent; sel.value = 'es'; sel.dispatchEvent(new Event('change', {bubbles:true})); var after = content.textContent; return before !== after; })()",
    },
    {
      name: 'Multiple text elements translate',
      test: "(function() { var sel = document.getElementById('lang-select'); if (!sel) return false; sel.value = 'fr'; sel.dispatchEvent(new Event('change', {bubbles:true})); return document.querySelectorAll('[data-i18n]').length >= 3; })()",
    },
  ],

  'js-a11y-focus-trap': [
    {
      name: 'Open button activates focus trap',
      test: "(function() { var btn = document.getElementById('trap-open'); var container = document.getElementById('trap-container'); if (!btn || !container) return false; btn.click(); return container.classList.contains('active') || container.style.display !== 'none'; })()",
    },
    {
      name: 'Tab key keeps focus within container',
      test: "(function() { var btn = document.getElementById('trap-open'); var container = document.getElementById('trap-container'); if (!btn || !container) return false; btn.click(); var focusable = container.querySelectorAll('button, input, a, [tabindex]'); if (focusable.length === 0) return false; focusable[focusable.length - 1].focus(); document.dispatchEvent(new KeyboardEvent('keydown', {key:'Tab', bubbles:true})); return container.contains(document.activeElement); })()",
    },
    {
      name: 'Escape key releases focus trap',
      test: "(function() { var btn = document.getElementById('trap-open'); var container = document.getElementById('trap-container'); if (!btn || !container) return false; btn.click(); document.dispatchEvent(new KeyboardEvent('keydown', {key:'Escape', bubbles:true})); return !container.classList.contains('active') || container.style.display === 'none'; })()",
    },
  ],

  'js-a11y-live-region': [
    {
      name: 'Live region element exists with aria-live',
      test: "!!document.querySelector('[aria-live]')",
    },
    {
      name: 'Trigger button updates live region content',
      test: "(function() { var btn = document.getElementById('live-trigger'); var region = document.querySelector('[aria-live]'); if (!btn || !region) return false; btn.click(); return region.textContent.length > 0; })()",
    },
    {
      name: 'Multiple announcements update region',
      test: "(function() { var btn = document.getElementById('live-trigger'); var region = document.querySelector('[aria-live]'); if (!btn || !region) return false; btn.click(); var first = region.textContent; btn.click(); return region.textContent.length > 0; })()",
    },
  ],

  // ── New Patterns: Real-time & Utilities ───────────────────────────

  'js-offline-indicator': [
    {
      name: 'Indicator element exists',
      test: "!!document.getElementById('offline-indicator')",
    },
    {
      name: 'Online state shows connected status',
      test: "(function() { var indicator = document.getElementById('offline-indicator'); if (!indicator) return false; window.dispatchEvent(new Event('online')); return indicator.classList.contains('online') || indicator.textContent.toLowerCase().includes('online'); })()",
    },
    {
      name: 'Offline event shows disconnected banner',
      test: "(function() { var indicator = document.getElementById('offline-indicator'); if (!indicator) return false; window.dispatchEvent(new Event('offline')); return indicator.classList.contains('offline') || indicator.textContent.toLowerCase().includes('offline'); })()",
    },
  ],

  'js-websocket-chat': [
    {
      name: 'Message input and send button exist',
      test: "!!document.getElementById('chat-input') && !!document.getElementById('chat-send')",
    },
    {
      name: 'Sending message adds to chat list',
      test: "(function() { var inp = document.getElementById('chat-input'); var btn = document.getElementById('chat-send'); var list = document.getElementById('chat-messages'); if (!inp || !btn || !list) return false; inp.value = 'Hello'; btn.click(); return list.querySelectorAll('.chat-msg').length > 0; })()",
    },
    {
      name: 'Input clears after send',
      test: "(function() { var inp = document.getElementById('chat-input'); var btn = document.getElementById('chat-send'); if (!inp || !btn) return false; inp.value = 'Test'; btn.click(); return inp.value === ''; })()",
    },
  ],

  'js-optimistic-update': [
    {
      name: 'List items rendered',
      test: "document.querySelectorAll('#opt-list .opt-item').length >= 1",
    },
    {
      name: 'Adding item appears immediately',
      test: "(function() { var btn = document.getElementById('opt-add'); var list = document.getElementById('opt-list'); if (!btn || !list) return false; var before = list.querySelectorAll('.opt-item').length; btn.click(); var after = list.querySelectorAll('.opt-item').length; return after > before; })()",
    },
    {
      name: 'Item shows pending state while saving',
      test: "(function() { var btn = document.getElementById('opt-add'); if (!btn) return false; btn.click(); var pending = document.querySelector('.opt-item.pending, .opt-item.saving'); return !!pending; })()",
    },
  ],

  'js-undo-manager': [
    {
      name: 'Action buttons exist',
      test: "!!document.getElementById('um-undo') && !!document.getElementById('um-redo')",
    },
    {
      name: 'Performing action and undoing reverts state',
      test: "(function() { var addBtn = document.getElementById('um-add'); var undoBtn = document.getElementById('um-undo'); var list = document.getElementById('um-list'); if (!addBtn || !undoBtn || !list) return false; addBtn.click(); var after = list.children.length; undoBtn.click(); return list.children.length < after; })()",
    },
    {
      name: 'Redo restores undone action',
      test: "(function() { var addBtn = document.getElementById('um-add'); var undoBtn = document.getElementById('um-undo'); var redoBtn = document.getElementById('um-redo'); var list = document.getElementById('um-list'); if (!addBtn || !undoBtn || !redoBtn || !list) return false; addBtn.click(); undoBtn.click(); var before = list.children.length; redoBtn.click(); return list.children.length > before; })()",
    },
  ],

  'js-clipboard-manager': [
    {
      name: 'Clipboard history list exists',
      test: "!!document.getElementById('clip-history')",
    },
    {
      name: 'Copying text adds to history',
      test: "(function() { var inp = document.getElementById('clip-input'); var btn = document.getElementById('clip-copy'); var history = document.getElementById('clip-history'); if (!inp || !btn || !history) return false; inp.value = 'Test clipboard'; btn.click(); return history.querySelectorAll('.clip-item').length > 0; })()",
    },
    {
      name: 'Clicking history item restores text',
      test: "(function() { var inp = document.getElementById('clip-input'); var btn = document.getElementById('clip-copy'); var history = document.getElementById('clip-history'); if (!inp || !btn || !history) return false; inp.value = 'First'; btn.click(); inp.value = ''; var item = history.querySelector('.clip-item'); if (!item) return false; item.click(); return inp.value === 'First' || inp.value.length > 0; })()",
    },
  ],

  'js-hotkey-manager': [
    {
      name: 'Hotkey list rendered',
      test: "document.querySelectorAll('.hotkey-item').length >= 3",
    },
    {
      name: 'Pressing registered hotkey triggers action',
      test: "(function() { var output = document.getElementById('hotkey-output'); if (!output) return false; document.dispatchEvent(new KeyboardEvent('keydown', {key:'n', ctrlKey:true, bubbles:true})); return output.textContent.length > 0; })()",
    },
    {
      name: 'Hotkey display updates last pressed key',
      test: "(function() { var display = document.getElementById('hotkey-display'); if (!display) return false; document.dispatchEvent(new KeyboardEvent('keydown', {key:'s', ctrlKey:true, bubbles:true})); return display.textContent.length > 0; })()",
    },
  ],

  'js-idle-detector': [
    {
      name: 'Status indicator exists',
      test: "!!document.getElementById('idle-status')",
    },
    {
      name: 'Activity resets idle state',
      test: "(function() { var status = document.getElementById('idle-status'); if (!status) return false; document.dispatchEvent(new MouseEvent('mousemove', {bubbles:true})); return status.textContent.toLowerCase().includes('active') || status.classList.contains('active'); })()",
    },
  ],

  'js-media-query-hook': [
    {
      name: 'Current breakpoint displayed',
      test: "(function() { var display = document.getElementById('breakpoint-display'); return display && display.textContent.length > 0; })()",
    },
    {
      name: 'Breakpoint indicator updates on resize',
      test: "(function() { var display = document.getElementById('breakpoint-display'); if (!display) return false; window.dispatchEvent(new Event('resize')); return display.textContent.length > 0; })()",
    },
  ],

  'js-portal-demo': [
    {
      name: 'Portal target container exists',
      test: "!!document.getElementById('portal-target')",
    },
    {
      name: 'Trigger button renders content in portal target',
      test: "(function() { var btn = document.getElementById('portal-trigger'); var target = document.getElementById('portal-target'); if (!btn || !target) return false; btn.click(); return target.children.length > 0; })()",
    },
    {
      name: 'Portal content removed on close',
      test: "(function() { var btn = document.getElementById('portal-trigger'); var target = document.getElementById('portal-target'); if (!btn || !target) return false; btn.click(); var close = target.querySelector('.portal-close'); if (close) close.click(); else btn.click(); return target.children.length === 0 || target.textContent.trim() === ''; })()",
    },
  ],

  'js-error-boundary': [
    {
      name: 'Content area exists',
      test: "!!document.getElementById('eb-content')",
    },
    {
      name: 'Error trigger shows fallback UI',
      test: "(function() { var btn = document.getElementById('eb-trigger-error'); var fallback = document.getElementById('eb-fallback'); if (!btn) return false; btn.click(); return fallback && (fallback.style.display !== 'none' || fallback.classList.contains('visible')); })()",
    },
    {
      name: 'Reset button restores content',
      test: "(function() { var triggerBtn = document.getElementById('eb-trigger-error'); var resetBtn = document.getElementById('eb-reset'); var content = document.getElementById('eb-content'); if (!triggerBtn || !resetBtn || !content) return false; triggerBtn.click(); resetBtn.click(); return content.style.display !== 'none'; })()",
    },
  ],

  'js-retry-mechanism': [
    {
      name: 'Fetch button exists',
      test: "!!document.getElementById('retry-fetch')",
    },
    {
      name: 'Failed fetch shows retry button',
      test: "(function() { var btn = document.getElementById('retry-fetch'); var retryBtn = document.getElementById('retry-btn'); if (!btn) return false; btn.click(); return new Promise(function(resolve) { setTimeout(function() { resolve(!!document.getElementById('retry-btn') || !!document.querySelector('.retry-msg')); }, 1000); }); })()",
    },
    {
      name: 'Status shows attempt count',
      test: "(function() { var btn = document.getElementById('retry-fetch'); var status = document.getElementById('retry-status'); if (!btn || !status) return false; btn.click(); return new Promise(function(resolve) { setTimeout(function() { resolve(status.textContent.match(/\\d/) !== null); }, 1000); }); })()",
    },
  ],

  'js-virtual-list-advanced': [
    {
      name: 'Virtual container exists',
      test: "!!document.getElementById('vl-container')",
    },
    {
      name: 'Visible rows rendered',
      test: "document.querySelectorAll('#vl-container .vl-row').length > 0",
    },
    {
      name: 'Scrolling changes visible rows',
      test: "(function() { var container = document.getElementById('vl-container'); if (!container) return false; var firstBefore = container.querySelector('.vl-row')?.textContent; container.scrollTop = 3000; container.dispatchEvent(new Event('scroll', {bubbles:true})); var firstAfter = container.querySelector('.vl-row')?.textContent; return firstBefore !== firstAfter; })()",
    },
  ],

  // ── New Patterns: Small UI Components ─────────────────────────────

  'js-spinner': [
    {
      name: 'Spinner element exists',
      test: "!!document.querySelector('.spinner')",
    },
    {
      name: 'Toggle button shows/hides spinner',
      test: "(function() { var btn = document.getElementById('spinner-toggle'); var spinner = document.querySelector('.spinner'); if (!btn || !spinner) return false; btn.click(); return spinner.classList.contains('active') || spinner.style.display !== 'none'; })()",
    },
  ],

  'js-chip': [
    {
      name: 'Chips rendered',
      test: "document.querySelectorAll('.chip').length >= 3",
    },
    {
      name: 'Clicking chip remove button deletes chip',
      test: "(function() { var chips = document.querySelectorAll('.chip'); if (chips.length === 0) return false; var before = chips.length; var removeBtn = chips[0].querySelector('.chip-remove'); if (!removeBtn) return false; removeBtn.click(); return document.querySelectorAll('.chip').length < before; })()",
    },
    {
      name: 'Clicking chip toggles selected state',
      test: "(function() { var chip = document.querySelector('.chip'); if (!chip) return false; chip.click(); return chip.classList.contains('selected') || chip.classList.contains('active'); })()",
    },
  ],

  'js-divider': [
    {
      name: 'Divider elements rendered',
      test: "document.querySelectorAll('.divider').length >= 2",
    },
    {
      name: 'Divider with text label exists',
      test: "(function() { var dividers = document.querySelectorAll('.divider'); for (var i = 0; i < dividers.length; i++) { if (dividers[i].textContent.trim().length > 0) return true; } return false; })()",
    },
  ],

  'js-alert-banner': [
    {
      name: 'Alert banners rendered',
      test: "document.querySelectorAll('.alert-banner').length >= 1",
    },
    {
      name: 'Dismiss button removes alert',
      test: "(function() { var alert = document.querySelector('.alert-banner'); if (!alert) return false; var btn = alert.querySelector('.alert-dismiss'); if (!btn) return false; btn.click(); return alert.style.display === 'none' || !document.body.contains(alert); })()",
    },
    {
      name: 'Different alert types have distinct classes',
      test: "(function() { var types = ['success', 'error', 'warning', 'info']; var found = 0; types.forEach(function(t) { if (document.querySelector('.alert-banner.' + t + ', .alert-banner.alert-' + t)) found++; }); return found >= 2; })()",
    },
  ],

  'js-callout': [
    {
      name: 'Callout elements rendered',
      test: "document.querySelectorAll('.callout').length >= 2",
    },
    {
      name: 'Callout has icon and content',
      test: "(function() { var callout = document.querySelector('.callout'); if (!callout) return false; return !!callout.querySelector('.callout-icon') && !!callout.querySelector('.callout-content'); })()",
    },
    {
      name: 'Dismissible callout can be closed',
      test: "(function() { var callout = document.querySelector('.callout.dismissible, .callout[data-dismissible]'); if (!callout) return true; var btn = callout.querySelector('.callout-close'); if (!btn) return false; btn.click(); return callout.style.display === 'none' || !document.body.contains(callout); })()",
    },
  ],

  'js-empty-state-v2': [
    {
      name: 'Empty state container rendered',
      test: "!!document.getElementById('empty-state')",
    },
    {
      name: 'Empty state has illustration and message',
      test: "(function() { var es = document.getElementById('empty-state'); if (!es) return false; return !!es.querySelector('.es-illustration, .es-icon') && !!es.querySelector('.es-message'); })()",
    },
    {
      name: 'Action button triggers content creation',
      test: "(function() { var btn = document.querySelector('#empty-state .es-action'); var es = document.getElementById('empty-state'); if (!btn || !es) return false; btn.click(); return es.style.display === 'none' || document.querySelectorAll('.content-item').length > 0; })()",
    },
  ],

  'js-avatar-group': [
    {
      name: 'Avatar group rendered',
      test: "document.querySelectorAll('.avatar-group .avatar').length >= 3",
    },
    {
      name: 'Overflow counter shown when too many avatars',
      test: "(function() { var overflow = document.querySelector('.avatar-overflow, .avatar-more'); return !!overflow && overflow.textContent.includes('+'); })()",
    },
    {
      name: 'Hovering avatar shows tooltip with name',
      test: "(function() { var avatar = document.querySelector('.avatar-group .avatar'); if (!avatar) return false; avatar.dispatchEvent(new MouseEvent('mouseenter', {bubbles:true})); return !!document.querySelector('.avatar-tooltip') || avatar.getAttribute('title')?.length > 0; })()",
    },
  ],

  'js-breadcrumb-overflow': [
    {
      name: 'Breadcrumb items rendered',
      test: "document.querySelectorAll('.bc-item').length >= 3",
    },
    {
      name: 'Overflow items collapsed into ellipsis',
      test: "!!document.querySelector('.bc-ellipsis, .bc-overflow')",
    },
    {
      name: 'Clicking ellipsis expands hidden items',
      test: "(function() { var ellipsis = document.querySelector('.bc-ellipsis, .bc-overflow'); if (!ellipsis) return false; ellipsis.click(); return document.querySelectorAll('.bc-item:not([style*=\"none\"])').length > 3; })()",
    },
  ],

  'js-truncated-text': [
    {
      name: 'Truncated text elements rendered',
      test: "document.querySelectorAll('.truncated').length >= 1",
    },
    {
      name: 'Show more button expands text',
      test: "(function() { var btn = document.querySelector('.show-more-btn'); var text = document.querySelector('.truncated'); if (!btn || !text) return false; btn.click(); return text.classList.contains('expanded') || !text.classList.contains('truncated'); })()",
    },
    {
      name: 'Show less button collapses text',
      test: "(function() { var showMore = document.querySelector('.show-more-btn'); var text = document.querySelector('.truncated'); if (!showMore || !text) return false; showMore.click(); var showLess = document.querySelector('.show-less-btn, .show-more-btn'); if (!showLess) return false; showLess.click(); return text.classList.contains('truncated') || !text.classList.contains('expanded'); })()",
    },
  ],

  'js-responsive-grid': [
    {
      name: 'Grid items rendered',
      test: "document.querySelectorAll('.grid-item').length >= 6",
    },
    {
      name: 'Grid container has CSS grid or flex layout',
      test: "(function() { var grid = document.getElementById('responsive-grid'); if (!grid) return false; var style = getComputedStyle(grid); return style.display === 'grid' || style.display === 'flex'; })()",
    },
    {
      name: 'Column selector changes layout',
      test: "(function() { var sel = document.getElementById('col-selector'); var grid = document.getElementById('responsive-grid'); if (!sel || !grid) return false; sel.value = '4'; sel.dispatchEvent(new Event('change', {bubbles:true})); return grid.style.gridTemplateColumns.length > 0 || grid.className.includes('4'); })()",
    },
  ],

  'js-masonry-layout': [
    {
      name: 'Masonry items rendered',
      test: "document.querySelectorAll('.masonry-item').length >= 6",
    },
    {
      name: 'Items have varying heights',
      test: "(function() { var items = document.querySelectorAll('.masonry-item'); if (items.length < 3) return false; var heights = new Set(); items.forEach(function(i) { heights.add(i.offsetHeight); }); return heights.size > 1; })()",
    },
  ],

  'js-aspect-ratio-box': [
    {
      name: 'Aspect ratio containers rendered',
      test: "document.querySelectorAll('.aspect-ratio-box').length >= 2",
    },
    {
      name: 'Boxes maintain aspect ratio',
      test: "(function() { var box = document.querySelector('.aspect-ratio-box'); if (!box) return false; var w = box.offsetWidth; var h = box.offsetHeight; return w > 0 && h > 0; })()",
    },
    {
      name: 'Ratio selector changes dimensions',
      test: "(function() { var sel = document.getElementById('ratio-select'); var box = document.querySelector('.aspect-ratio-box'); if (!sel || !box) return false; var before = box.offsetHeight; sel.value = '1:1'; sel.dispatchEvent(new Event('change', {bubbles:true})); return true; })()",
    },
  ],

  'js-scroll-snap': [
    {
      name: 'Snap container exists',
      test: "!!document.getElementById('snap-container')",
    },
    {
      name: 'Snap items rendered',
      test: "document.querySelectorAll('.snap-item').length >= 3",
    },
    {
      name: 'Indicator dots match item count',
      test: "(function() { var items = document.querySelectorAll('.snap-item'); var dots = document.querySelectorAll('.snap-dot'); return items.length === dots.length && dots.length > 0; })()",
    },
  ],

  'js-parallax': [
    {
      name: 'Parallax layers exist',
      test: "document.querySelectorAll('.parallax-layer').length >= 2",
    },
    {
      name: 'Scroll changes layer transform',
      test: "(function() { var layer = document.querySelector('.parallax-layer'); var scroller = document.getElementById('parallax-container') || window; if (!layer) return false; var before = layer.style.transform; if (scroller.scrollTop !== undefined) scroller.scrollTop = 200; scroller.dispatchEvent ? scroller.dispatchEvent(new Event('scroll', {bubbles:true})) : window.dispatchEvent(new Event('scroll')); return layer.style.transform !== before || layer.style.transform.length > 0; })()",
    },
  ],

  'js-animated-counter': [
    {
      name: 'Counter elements exist',
      test: "document.querySelectorAll('.counter').length >= 1",
    },
    {
      name: 'Start button triggers count animation',
      test: "(function() { var btn = document.getElementById('counter-start'); var counter = document.querySelector('.counter'); if (!btn || !counter) return false; btn.click(); return new Promise(function(resolve) { setTimeout(function() { resolve(parseInt(counter.textContent) > 0); }, 500); }); })()",
    },
    {
      name: 'Counter reaches target value',
      test: "(function() { var btn = document.getElementById('counter-start'); var counter = document.querySelector('.counter'); if (!btn || !counter) return false; btn.click(); return new Promise(function(resolve) { setTimeout(function() { resolve(parseInt(counter.textContent) > 0); }, 2000); }); })()",
    },
  ],

  'js-confetti': [
    {
      name: 'Trigger button exists',
      test: "!!document.getElementById('confetti-trigger')",
    },
    {
      name: 'Clicking trigger creates confetti particles',
      test: "(function() { var btn = document.getElementById('confetti-trigger'); if (!btn) return false; btn.click(); return new Promise(function(resolve) { setTimeout(function() { resolve(document.querySelectorAll('.confetti-particle, .confetti').length > 0); }, 200); }); })()",
    },
    {
      name: 'Confetti cleans up after animation',
      test: "(function() { var btn = document.getElementById('confetti-trigger'); if (!btn) return false; btn.click(); return new Promise(function(resolve) { setTimeout(function() { resolve(document.querySelectorAll('.confetti-particle, .confetti').length === 0); }, 4000); }); })()",
    },
  ],
};
