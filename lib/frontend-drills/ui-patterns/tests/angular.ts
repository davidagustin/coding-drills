/**
 * Test cases for Angular UI pattern exercises.
 * Each test is a JavaScript expression that evaluates to boolean inside the sandbox iframe.
 * Tests verify BEHAVIOR, not just DOM existence - they dispatch events and check dynamic responses.
 */
import type { PatternTestCase } from './index';

export const angularTests: Record<string, PatternTestCase[]> = {
  // ── Forms & Input ──────────────────────────────────────────────────
  'ng-reactive-forms': [
    {
      name: 'Name validation triggers on input',
      test: "(function() { var el = document.getElementById('name'); if (!el) return false; el.value = ''; el.dispatchEvent(new Event('input', {bubbles:true})); var err = document.getElementById('name-error'); return err && err.textContent.trim().length > 0; })()",
    },
    {
      name: 'Name validation clears with valid input',
      test: "(function() { var el = document.getElementById('name'); if (!el) return false; el.value = 'John'; el.dispatchEvent(new Event('input', {bubbles:true})); var err = document.getElementById('name-error'); return err && err.textContent.trim() === ''; })()",
    },
    {
      name: 'Email validation requires @ symbol',
      test: "(function() { var el = document.getElementById('email'); if (!el) return false; el.value = 'test'; el.dispatchEvent(new Event('input', {bubbles:true})); var err = document.getElementById('email-error'); return err && err.textContent.trim().length > 0; })()",
    },
    {
      name: 'Form submit shows success with valid data',
      test: "(function() { var name = document.getElementById('name'); var email = document.getElementById('email'); var form = document.getElementById('ng-form'); if (!name || !email || !form) return false; name.value = 'John'; email.value = 'john@test.com'; name.dispatchEvent(new Event('input', {bubbles:true})); email.dispatchEvent(new Event('input', {bubbles:true})); form.dispatchEvent(new Event('submit', {bubbles:true})); var result = document.getElementById('result'); return result && result.style.display !== 'none' && result.textContent.includes('John'); })()",
    },
  ],

  'ng-template-forms': [
    {
      name: 'Submit button disabled with empty username',
      test: "(function() { var el = document.getElementById('username'); var btn = document.getElementById('submit-btn'); if (!el || !btn) return false; el.value = ''; el.dispatchEvent(new Event('input', {bubbles:true})); return btn.disabled === true; })()",
    },
    {
      name: 'Hint shows when username too short',
      test: "(function() { var el = document.getElementById('username'); if (!el) return false; el.value = 'A'; el.dispatchEvent(new Event('input', {bubbles:true})); var hint = document.getElementById('username-hint'); return hint && hint.textContent.includes('2'); })()",
    },
    {
      name: 'Submit button enables with valid form',
      test: "(function() { var user = document.getElementById('username'); var color = document.getElementById('color'); var agree = document.getElementById('agree'); var btn = document.getElementById('submit-btn'); if (!user || !color || !agree || !btn) return false; user.value = 'John'; color.value = 'red'; agree.checked = true; user.dispatchEvent(new Event('input', {bubbles:true})); color.dispatchEvent(new Event('change', {bubbles:true})); agree.dispatchEvent(new Event('change', {bubbles:true})); return btn.disabled === false; })()",
    },
    {
      name: 'Form submit displays user data',
      test: "(function() { var user = document.getElementById('username'); var color = document.getElementById('color'); var agree = document.getElementById('agree'); var form = document.getElementById('tpl-form'); if (!user || !color || !agree || !form) return false; user.value = 'Alice'; color.value = 'blue'; agree.checked = true; user.dispatchEvent(new Event('input', {bubbles:true})); color.dispatchEvent(new Event('change', {bubbles:true})); agree.dispatchEvent(new Event('change', {bubbles:true})); form.dispatchEvent(new Event('submit', {bubbles:true})); var out = document.getElementById('output'); return out && out.style.display !== 'none' && out.textContent.includes('Alice') && out.textContent.includes('blue'); })()",
    },
  ],

  'ng-custom-validators': [
    {
      name: 'Password length rule validates',
      test: "(function() { var pw = document.getElementById('password'); if (!pw) return false; pw.value = 'short'; pw.dispatchEvent(new Event('input', {bubbles:true})); var rule = document.getElementById('rule-len'); return rule && !rule.classList.contains('pass'); })()",
    },
    {
      name: 'All password rules pass with valid password',
      test: "(function() { var pw = document.getElementById('password'); if (!pw) return false; pw.value = 'Test123!@#'; pw.dispatchEvent(new Event('input', {bubbles:true})); var len = document.getElementById('rule-len'); var upper = document.getElementById('rule-upper'); var num = document.getElementById('rule-num'); var special = document.getElementById('rule-special'); return len && upper && num && special && len.classList.contains('pass') && upper.classList.contains('pass') && num.classList.contains('pass') && special.classList.contains('pass'); })()",
    },
    {
      name: 'Confirm password mismatch shows error',
      test: "(function() { var pw = document.getElementById('password'); var cf = document.getElementById('confirm'); if (!pw || !cf) return false; pw.value = 'Test123!'; cf.value = 'Different'; pw.dispatchEvent(new Event('input', {bubbles:true})); cf.dispatchEvent(new Event('input', {bubbles:true})); var err = document.getElementById('cf-error'); return err && err.textContent.trim().length > 0; })()",
    },
    {
      name: 'Form submits when all validations pass',
      test: "(function() { var pw = document.getElementById('password'); var cf = document.getElementById('confirm'); var form = document.getElementById('val-form'); if (!pw || !cf || !form) return false; pw.value = 'Test123!'; cf.value = 'Test123!'; pw.dispatchEvent(new Event('input', {bubbles:true})); cf.dispatchEvent(new Event('input', {bubbles:true})); form.dispatchEvent(new Event('submit', {bubbles:true})); var result = document.getElementById('result'); return result && result.style.display !== 'none'; })()",
    },
  ],

  'ng-autocomplete': [
    {
      name: 'Typing in search triggers rendering',
      test: "(function() { var input = document.getElementById('search'); var list = document.getElementById('results'); if (!input || !list) return false; input.value = 'App'; input.dispatchEvent(new Event('input', {bubbles:true})); return new Promise(function(resolve) { setTimeout(function() { resolve(list.children.length > 0); }, 600); }); })()",
    },
    {
      name: 'Search results are filtered',
      test: "(function() { var input = document.getElementById('search'); var list = document.getElementById('results'); if (!input || !list) return false; input.value = 'Mango'; input.dispatchEvent(new Event('input', {bubbles:true})); return new Promise(function(resolve) { setTimeout(function() { var text = list.textContent || list.innerText; resolve(text.includes('Mango')); }, 600); }); })()",
    },
    {
      name: 'Clicking result populates input',
      test: "(function() { var input = document.getElementById('search'); var list = document.getElementById('results'); if (!input || !list) return false; input.value = 'Ban'; input.dispatchEvent(new Event('input', {bubbles:true})); return new Promise(function(resolve) { setTimeout(function() { var item = list.querySelector('li'); if (item) { item.click(); resolve(input.value === item.textContent.trim()); } else resolve(false); }, 600); }); })()",
    },
  ],

  'ng-file-upload': [
    {
      name: 'Drop zone click triggers file input',
      test: "(function() { var zone = document.getElementById('drop-zone'); var input = document.getElementById('file-input'); if (!zone || !input) return false; var clicked = false; input.addEventListener('click', function() { clicked = true; }); zone.click(); return clicked; })()",
    },
    {
      name: 'Drag over adds class to drop zone',
      test: "(function() { var zone = document.getElementById('drop-zone'); if (!zone) return false; zone.dispatchEvent(new DragEvent('dragover', {bubbles:true})); return zone.classList.contains('over'); })()",
    },
    {
      name: 'Drag leave removes class from drop zone',
      test: "(function() { var zone = document.getElementById('drop-zone'); if (!zone) return false; zone.dispatchEvent(new DragEvent('dragover', {bubbles:true})); zone.dispatchEvent(new DragEvent('dragleave', {bubbles:true})); return !zone.classList.contains('over'); })()",
    },
  ],

  'ng-date-picker': [
    {
      name: 'Clicking calendar button toggles calendar',
      test: "(function() { var cal = document.getElementById('calendar'); var btn = document.getElementById('cal-btn'); if (!cal || !btn) return false; var initialDisplay = cal.style.display; btn.click(); return cal.style.display !== initialDisplay && (cal.style.display === 'block' || cal.style.display === ''); })()",
    },
    {
      name: 'Next month button changes month label',
      test: "(function() { var label = document.getElementById('month-label'); var btn = document.getElementById('next-month'); if (!label || !btn) return false; var initial = label.textContent; btn.click(); return label.textContent !== initial && label.textContent.length > 0; })()",
    },
    {
      name: 'Clicking day updates input value',
      test: "(function() { var input = document.getElementById('date-input'); var grid = document.getElementById('cal-grid'); if (!input || !grid) return false; var day = grid.querySelector('.day'); if (!day) return false; day.click(); return input.value.length > 0 && input.value.includes('/'); })()",
    },
  ],

  'ng-dynamic-forms': [
    {
      name: 'Clicking schema button adds field',
      test: "(function() { var form = document.getElementById('dynamic-form'); var btn = document.querySelector('.schema-bar .add-btn[data-type=\"text\"]'); if (!form || !btn) return false; var before = form.querySelectorAll('.field').length; btn.click(); return form.querySelectorAll('.field').length > before; })()",
    },
    {
      name: 'Adding field shows submit button',
      test: "(function() { var btn = document.querySelector('.schema-bar .add-btn[data-type=\"email\"]'); var submit = document.getElementById('submit-btn'); if (!btn || !submit) return false; btn.click(); return submit.style.display !== 'none'; })()",
    },
    {
      name: 'Remove button deletes field',
      test: "(function() { var form = document.getElementById('dynamic-form'); var addBtn = document.querySelector('.schema-bar .add-btn[data-type=\"text\"]'); if (!form || !addBtn) return false; addBtn.click(); var before = form.querySelectorAll('.field').length; var removeBtn = form.querySelector('.remove'); if (!removeBtn) return false; removeBtn.click(); return form.querySelectorAll('.field').length < before; })()",
    },
    {
      name: 'Submit collects field values as JSON',
      test: "(function() { var addBtn = document.querySelector('.schema-bar .add-btn[data-type=\"checkbox\"]'); var submit = document.getElementById('submit-btn'); var output = document.getElementById('output'); if (!addBtn || !submit || !output) return false; addBtn.click(); submit.click(); return output.textContent.trim().length > 0 && (output.textContent.includes('{') || output.textContent.includes('[')); })()",
    },
  ],

  'ng-input-mask': [
    {
      name: 'Phone input formats on input',
      test: "(function() { var el = document.getElementById('phone'); if (!el) return false; el.value = '1234567890'; el.dispatchEvent(new Event('input', {bubbles:true})); return el.value.includes('(') && el.value.includes(')') && el.value.includes('-'); })()",
    },
    {
      name: 'Card input groups digits',
      test: "(function() { var el = document.getElementById('card'); if (!el) return false; el.value = '1234567812345678'; el.dispatchEvent(new Event('input', {bubbles:true})); return el.value.includes(' ') && el.value.split(' ').length === 4; })()",
    },
    {
      name: 'Currency input shows dollar format',
      test: "(function() { var el = document.getElementById('currency'); if (!el) return false; el.value = '12345'; el.dispatchEvent(new Event('input', {bubbles:true})); return el.value.includes('$') && el.value.includes('.'); })()",
    },
    {
      name: 'Values display updates with input',
      test: "(function() { var phone = document.getElementById('phone'); var vals = document.getElementById('values'); if (!phone || !vals) return false; phone.value = '5551234567'; phone.dispatchEvent(new Event('input', {bubbles:true})); return vals.textContent.includes('555'); })()",
    },
  ],

  'ng-select-dropdown': [
    {
      name: 'Clicking trigger opens dropdown',
      test: "(function() { var trigger = document.getElementById('trigger'); var dropdown = document.getElementById('dropdown'); if (!trigger || !dropdown) return false; trigger.click(); return dropdown.style.display !== 'none'; })()",
    },
    {
      name: 'Filter input filters options',
      test: "(function() { var trigger = document.getElementById('trigger'); var filter = document.getElementById('filter'); var options = document.getElementById('options'); if (!trigger || !filter || !options) return false; trigger.click(); filter.value = 'Angular'; filter.dispatchEvent(new Event('input', {bubbles:true})); return options.querySelectorAll('li').length > 0 && options.querySelectorAll('li').length < 10; })()",
    },
    {
      name: 'Clicking option updates selected text',
      test: "(function() { var trigger = document.getElementById('trigger'); var options = document.getElementById('options'); var selText = document.getElementById('selected-text'); if (!trigger || !options || !selText) return false; trigger.click(); var opt = options.querySelector('li'); if (!opt) return false; opt.click(); return selText.textContent.trim().length > 0; })()",
    },
    {
      name: 'Selecting option closes dropdown',
      test: "(function() { var trigger = document.getElementById('trigger'); var dropdown = document.getElementById('dropdown'); var options = document.getElementById('options'); if (!trigger || !dropdown || !options) return false; trigger.click(); var opt = options.querySelector('li'); if (!opt) return false; opt.click(); return dropdown.style.display === 'none'; })()",
    },
  ],

  'ng-inline-edit': [
    {
      name: 'Clicking cell enters edit mode',
      test: "(function() { var tbody = document.getElementById('table-body'); if (!tbody) return false; var cell = tbody.querySelector('td'); if (!cell) return false; cell.click(); return cell.querySelector('input') !== null; })()",
    },
    {
      name: 'Edit input is pre-filled with cell value',
      test: "(function() { var tbody = document.getElementById('table-body'); if (!tbody) return false; var cell = tbody.querySelector('td'); if (!cell) return false; var original = cell.textContent.trim(); cell.click(); var input = cell.querySelector('input'); return input && input.value === original; })()",
    },
    {
      name: 'Pressing Enter saves edit',
      test: "(function() { var tbody = document.getElementById('table-body'); if (!tbody) return false; var cell = tbody.querySelector('td'); if (!cell) return false; cell.click(); var input = cell.querySelector('input'); if (!input) return false; input.value = 'NewValue'; input.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', bubbles:true})); return !cell.querySelector('input'); })()",
    },
  ],

  // ── Interactive Elements ───────────────────────────────────────────
  'ng-modal-dialog': [
    {
      name: 'Clicking open button shows modal',
      test: "(function() { var btn = document.getElementById('open-btn'); var backdrop = document.getElementById('backdrop'); if (!btn || !backdrop) return false; btn.click(); return backdrop.style.display !== 'none'; })()",
    },
    {
      name: 'Clicking close button hides modal',
      test: "(function() { var open = document.getElementById('open-btn'); var close = document.getElementById('close-x'); var backdrop = document.getElementById('backdrop'); if (!open || !close || !backdrop) return false; open.click(); close.click(); return backdrop.style.display === 'none'; })()",
    },
    {
      name: 'Confirm button updates status',
      test: "(function() { var open = document.getElementById('open-btn'); var confirm = document.getElementById('confirm-btn'); var status = document.getElementById('status'); if (!open || !confirm || !status) return false; open.click(); confirm.click(); return status.textContent.trim().length > 0 && status.textContent.includes('Confirm'); })()",
    },
    {
      name: 'Escape key closes modal',
      test: "(function() { var open = document.getElementById('open-btn'); var backdrop = document.getElementById('backdrop'); if (!open || !backdrop) return false; open.click(); document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles:true})); return backdrop.style.display === 'none'; })()",
    },
  ],

  'ng-drag-drop': [
    {
      name: 'Cards render in correct columns',
      test: "(function() { var todo = document.getElementById('todo'); var progress = document.getElementById('progress'); var done = document.getElementById('done'); if (!todo || !progress || !done) return false; return todo.querySelectorAll('.card').length > 0 && done.querySelectorAll('.card').length > 0; })()",
    },
    {
      name: 'Dragstart stores card index',
      test: "(function() { var card = document.querySelector('.card'); if (!card) return false; card.dispatchEvent(new DragEvent('dragstart', {bubbles:true})); return card.style.opacity === '0.4'; })()",
    },
    {
      name: 'Drop zone highlights on dragover',
      test: "(function() { var zone = document.querySelector('.drop-zone'); if (!zone) return false; zone.dispatchEvent(new DragEvent('dragover', {bubbles:true})); return zone.classList.contains('over'); })()",
    },
  ],

  'ng-data-table': [
    {
      name: 'Initial data renders in table',
      test: "(function() { var tbody = document.getElementById('tbody'); if (!tbody) return false; return tbody.querySelectorAll('tr').length >= 4; })()",
    },
    {
      name: 'Clicking sort header changes data order',
      test: "(function() { var tbody = document.getElementById('tbody'); var header = document.querySelector('th.sortable'); if (!tbody || !header) return false; var firstBefore = tbody.querySelector('tr td').textContent; header.click(); var firstAfter = tbody.querySelector('tr td').textContent; return firstBefore !== firstAfter; })()",
    },
    {
      name: 'Next page button changes displayed rows',
      test: "(function() { var tbody = document.getElementById('tbody'); var next = document.getElementById('next-btn'); if (!tbody || !next) return false; var firstBefore = tbody.querySelector('tr td').textContent; next.click(); var firstAfter = tbody.querySelector('tr td').textContent; return firstBefore !== firstAfter; })()",
    },
    {
      name: 'Page info updates on navigation',
      test: "(function() { var info = document.getElementById('page-info'); var next = document.getElementById('next-btn'); if (!info || !next) return false; var before = info.textContent; next.click(); return info.textContent !== before; })()",
    },
  ],

  'ng-tabs': [
    {
      name: 'Clicking tab changes active state',
      test: "(function() { var tabs = document.querySelectorAll('#tab-bar .tab'); if (tabs.length < 2) return false; var second = tabs[1]; second.click(); return second.classList.contains('active'); })()",
    },
    {
      name: 'Switching tabs loads new content',
      test: "(function() { var tabs = document.querySelectorAll('#tab-bar .tab'); var panel = document.getElementById('panel'); if (tabs.length < 2 || !panel) return false; var before = panel.innerHTML; tabs[1].click(); return new Promise(function(resolve) { setTimeout(function() { resolve(panel.innerHTML !== before); }, 400); }); })()",
    },
    {
      name: 'Loading indicator shows during tab switch',
      test: "(function() { var tabs = document.querySelectorAll('#tab-bar .tab'); var loading = document.getElementById('loading'); if (tabs.length < 2 || !loading) return false; tabs[1].click(); var shown = loading.style.display !== 'none'; return shown; })()",
    },
  ],

  'ng-accordion': [
    {
      name: 'Clicking panel header toggles open class',
      test: "(function() { var header = document.querySelector('.panel-header'); if (!header) return false; var hadClass = header.classList.contains('open'); header.click(); return header.classList.contains('open') !== hadClass; })()",
    },
    {
      name: 'Panel body opens when header clicked',
      test: "(function() { var header = document.querySelector('.panel-header'); if (!header) return false; var body = header.nextElementSibling; if (!body || !body.classList.contains('panel-body')) return false; header.click(); return body.classList.contains('open'); })()",
    },
    {
      name: 'Clicking open panel closes it',
      test: "(function() { var header = document.querySelector('.panel-header'); if (!header) return false; header.click(); header.click(); return !header.classList.contains('open'); })()",
    },
  ],

  'ng-stepper': [
    {
      name: 'Initial step content loads',
      test: "(function() { var content = document.getElementById('step-content'); if (!content) return false; return content.querySelector('input') !== null; })()",
    },
    {
      name: 'Next button advances to next step',
      test: "(function() { var steps = document.querySelectorAll('#steps .step'); var next = document.getElementById('next-step'); if (steps.length < 2 || !next) return false; var firstActive = steps[0].classList.contains('active'); next.click(); return steps[1].classList.contains('active') && !steps[0].classList.contains('active'); })()",
    },
    {
      name: 'Prev button shows after first step',
      test: "(function() { var prev = document.getElementById('prev-step'); var next = document.getElementById('next-step'); if (!prev || !next) return false; next.click(); return prev.style.display !== 'none'; })()",
    },
    {
      name: 'Last step shows Finish button',
      test: "(function() { var next = document.getElementById('next-step'); if (!next) return false; next.click(); next.click(); return next.textContent.includes('Finish'); })()",
    },
  ],

  'ng-carousel': [
    {
      name: 'Next button advances slide',
      test: "(function() { var track = document.getElementById('track'); var next = document.getElementById('next-btn'); if (!track || !next) return false; var before = track.style.transform; next.click(); return track.style.transform !== before; })()",
    },
    {
      name: 'Indicators update on slide change',
      test: "(function() { var next = document.getElementById('next-btn'); var dots = document.querySelectorAll('#indicators .dot'); if (!next || dots.length < 2) return false; next.click(); return dots[1].classList.contains('active'); })()",
    },
    {
      name: 'Clicking indicator navigates to slide',
      test: "(function() { var dots = document.querySelectorAll('#indicators .dot'); var track = document.getElementById('track'); if (dots.length < 3 || !track) return false; dots[2].click(); return dots[2].classList.contains('active'); })()",
    },
    {
      name: 'Play button toggles autoplay',
      test: "(function() { var btn = document.getElementById('play-btn'); if (!btn) return false; var before = btn.textContent; btn.click(); return btn.textContent !== before; })()",
    },
  ],

  'ng-virtual-scroll': [
    {
      name: 'Initial rows render in viewport',
      test: "(function() { var viewport = document.getElementById('viewport'); if (!viewport) return false; return viewport.querySelectorAll('.row').length > 0 && viewport.querySelectorAll('.row').length < 100; })()",
    },
    {
      name: 'Scrolling updates visible rows',
      test: "(function() { var viewport = document.getElementById('viewport'); if (!viewport) return false; var first = viewport.querySelector('.row').textContent; viewport.scrollTop = 500; viewport.dispatchEvent(new Event('scroll', {bubbles:true})); return new Promise(function(resolve) { setTimeout(function() { var newFirst = viewport.querySelector('.row'); resolve(newFirst && newFirst.textContent !== first); }, 50); }); })()",
    },
    {
      name: 'Rendered count updates on scroll',
      test: "(function() { var viewport = document.getElementById('viewport'); var rendered = document.getElementById('rendered'); if (!viewport || !rendered) return false; viewport.scrollTop = 1000; viewport.dispatchEvent(new Event('scroll', {bubbles:true})); return new Promise(function(resolve) { setTimeout(function() { resolve(rendered.textContent.includes('Rendered')); }, 50); }); })()",
    },
  ],

  'ng-context-menu': [
    {
      name: 'Right-clicking item shows context menu',
      test: "(function() { var item = document.querySelector('#items .item'); var menu = document.getElementById('context-menu'); if (!item || !menu) return false; item.dispatchEvent(new MouseEvent('contextmenu', {bubbles:true, clientX:100, clientY:100})); return menu.style.display !== 'none'; })()",
    },
    {
      name: 'Menu positioned at cursor',
      test: "(function() { var item = document.querySelector('#items .item'); var menu = document.getElementById('context-menu'); if (!item || !menu) return false; item.dispatchEvent(new MouseEvent('contextmenu', {bubbles:true, clientX:150, clientY:200})); return menu.style.left && menu.style.top; })()",
    },
    {
      name: 'Clicking menu action updates log',
      test: "(function() { var item = document.querySelector('#items .item'); var menu = document.getElementById('context-menu'); var log = document.getElementById('log'); if (!item || !menu || !log) return false; item.dispatchEvent(new MouseEvent('contextmenu', {bubbles:true, clientX:100, clientY:100})); var action = menu.querySelector('.menu-item'); if (!action) return false; action.click(); return log.textContent.trim().length > 0; })()",
    },
  ],

  'ng-toast-notifications': [
    {
      name: 'Clicking button shows toast',
      test: "(function() { var btn = document.querySelector('.btn[data-type=\"success\"]'); var container = document.getElementById('toast-container'); if (!btn || !container) return false; btn.click(); return container.querySelectorAll('.toast').length > 0; })()",
    },
    {
      name: 'Toast has correct type class',
      test: "(function() { var btn = document.querySelector('.btn[data-type=\"error\"]'); var container = document.getElementById('toast-container'); if (!btn || !container) return false; btn.click(); var toast = container.querySelector('.toast'); return toast && toast.classList.contains('error'); })()",
    },
    {
      name: 'Close button removes toast',
      test: "(function() { var btn = document.querySelector('.btn[data-type=\"info\"]'); var container = document.getElementById('toast-container'); if (!btn || !container) return false; btn.click(); return new Promise(function(resolve) { setTimeout(function() { var toast = container.querySelector('.toast'); if (!toast) { resolve(false); return; } var close = toast.querySelector('.close'); if (!close) { resolve(false); return; } var before = container.querySelectorAll('.toast').length; close.click(); setTimeout(function() { resolve(container.querySelectorAll('.toast').length < before); }, 350); }, 50); }); })()",
    },
  ],

  // ── Data Display ───────────────────────────────────────────────────
  'ng-data-visualization': [
    {
      name: 'Canvas has drawn content',
      test: "(function() { var canvas = document.getElementById('chart'); if (!canvas) return false; var ctx = canvas.getContext('2d'); var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height); for (var i = 0; i < imgData.data.length; i += 4) { if (imgData.data[i+3] !== 0) return true; } return false; })()",
    },
    {
      name: 'Switching chart type redraws canvas',
      test: "(function() { var canvas = document.getElementById('chart'); var tabs = document.querySelectorAll('.chart-tabs .ct'); if (!canvas || tabs.length < 2) return false; var ctx = canvas.getContext('2d'); var before = ctx.getImageData(0, 0, canvas.width, canvas.height); tabs[1].click(); var after = ctx.getImageData(0, 0, canvas.width, canvas.height); for (var i = 0; i < before.data.length; i++) { if (before.data[i] !== after.data[i]) return true; } return false; })()",
    },
    {
      name: 'Refresh button regenerates data',
      test: "(function() { var canvas = document.getElementById('chart'); var refresh = document.getElementById('refresh'); if (!canvas || !refresh) return false; var ctx = canvas.getContext('2d'); var before = ctx.getImageData(0, 0, canvas.width, canvas.height); refresh.click(); var after = ctx.getImageData(0, 0, canvas.width, canvas.height); for (var i = 0; i < before.data.length; i++) { if (before.data[i] !== after.data[i]) return true; } return false; })()",
    },
  ],

  'ng-search-filter': [
    {
      name: 'Search input filters list',
      test: "(function() { var input = document.getElementById('search'); var list = document.getElementById('list'); if (!input || !list) return false; var before = list.querySelectorAll('li').length; input.value = 'Angular'; input.dispatchEvent(new Event('input', {bubbles:true})); return list.querySelectorAll('li').length < before; })()",
    },
    {
      name: 'Count updates with search filter',
      test: "(function() { var input = document.getElementById('search'); var count = document.getElementById('count'); if (!input || !count) return false; input.value = 'React'; input.dispatchEvent(new Event('input', {bubbles:true})); return count.textContent.includes('1'); })()",
    },
    {
      name: 'Category filter changes results',
      test: "(function() { var tag = document.querySelector('.tags .tag[data-cat=\"framework\"]'); var list = document.getElementById('list'); if (!tag || !list) return false; var before = list.querySelectorAll('li').length; tag.click(); return list.querySelectorAll('li').length < before; })()",
    },
    {
      name: 'Search highlights matching text',
      test: "(function() { var input = document.getElementById('search'); var list = document.getElementById('list'); if (!input || !list) return false; input.value = 'Type'; input.dispatchEvent(new Event('input', {bubbles:true})); return list.querySelector('mark') !== null; })()",
    },
  ],

  'ng-infinite-scroll': [
    {
      name: 'Initial batch loads automatically',
      test: "(function() { var items = document.getElementById('items'); var status = document.getElementById('status'); if (!items || !status) return false; return items.querySelectorAll('.item-card').length > 0 && status.textContent.includes('Loaded'); })()",
    },
    {
      name: 'Scrolling to bottom loads more items',
      test: "(function() { var scroll = document.getElementById('scroll-area'); var items = document.getElementById('items'); if (!scroll || !items) return false; var before = items.querySelectorAll('.item-card').length; scroll.scrollTop = scroll.scrollHeight; return new Promise(function(resolve) { setTimeout(function() { resolve(items.querySelectorAll('.item-card').length > before); }, 700); }); })()",
    },
    {
      name: 'Status updates with loaded count',
      test: "(function() { var scroll = document.getElementById('scroll-area'); var status = document.getElementById('status'); if (!scroll || !status) return false; var before = status.textContent; scroll.scrollTop = scroll.scrollHeight; return new Promise(function(resolve) { setTimeout(function() { resolve(status.textContent !== before); }, 700); }); })()",
    },
  ],

  'ng-gallery': [
    {
      name: 'Clicking thumbnail opens lightbox',
      test: "(function() { var thumb = document.querySelector('#gallery .thumb'); var lightbox = document.getElementById('lightbox'); if (!thumb || !lightbox) return false; thumb.click(); return lightbox.style.display !== 'none'; })()",
    },
    {
      name: 'Lightbox shows selected image',
      test: "(function() { var thumb = document.querySelector('#gallery .thumb'); var lbImg = document.getElementById('lb-img'); if (!thumb || !lbImg) return false; thumb.click(); return lbImg.textContent.trim().length > 0; })()",
    },
    {
      name: 'Next button navigates images',
      test: "(function() { var thumb = document.querySelector('#gallery .thumb'); var next = document.getElementById('lb-next'); var caption = document.getElementById('lb-caption'); if (!thumb || !next || !caption) return false; thumb.click(); var before = caption.textContent; next.click(); return caption.textContent !== before; })()",
    },
    {
      name: 'Close button hides lightbox',
      test: "(function() { var thumb = document.querySelector('#gallery .thumb'); var close = document.getElementById('lb-close'); var lightbox = document.getElementById('lightbox'); if (!thumb || !close || !lightbox) return false; thumb.click(); close.click(); return lightbox.style.display === 'none'; })()",
    },
  ],

  'ng-cards-grid': [
    {
      name: 'Cards render with content',
      test: "(function() { var cards = document.querySelectorAll('#grid .card'); if (cards.length < 6) return false; return cards[0].textContent.trim().length > 0; })()",
    },
    {
      name: 'Column button changes grid layout',
      test: "(function() { var grid = document.getElementById('grid'); var btn = document.querySelector('.toolbar .cols-btn[data-cols=\"2\"]'); if (!grid || !btn) return false; var before = grid.style.gridTemplateColumns; btn.click(); return grid.style.gridTemplateColumns !== before && grid.style.gridTemplateColumns.includes('2'); })()",
    },
    {
      name: 'Active class toggles on column buttons',
      test: "(function() { var buttons = document.querySelectorAll('.toolbar .cols-btn'); if (buttons.length < 2) return false; buttons[1].click(); return buttons[1].classList.contains('active'); })()",
    },
  ],

  'ng-sort-filter-table': [
    {
      name: 'Search input filters table rows',
      test: "(function() { var input = document.getElementById('search'); var tbody = document.getElementById('tbody'); if (!input || !tbody) return false; var before = tbody.querySelectorAll('tr').length; input.value = 'Alice'; input.dispatchEvent(new Event('input', {bubbles:true})); return tbody.querySelectorAll('tr').length < before; })()",
    },
    {
      name: 'Department filter changes results',
      test: "(function() { var select = document.getElementById('filter-dept'); var tbody = document.getElementById('tbody'); if (!select || !tbody) return false; var before = tbody.querySelectorAll('tr').length; select.value = 'Engineering'; select.dispatchEvent(new Event('change', {bubbles:true})); return tbody.querySelectorAll('tr').length < before; })()",
    },
    {
      name: 'Sorting changes row order',
      test: "(function() { var tbody = document.getElementById('tbody'); var header = document.querySelector('th.sortable'); if (!tbody || !header) return false; var first = tbody.querySelector('tr td').textContent; header.click(); return tbody.querySelector('tr td').textContent !== first; })()",
    },
    {
      name: 'Result count updates with filters',
      test: "(function() { var input = document.getElementById('search'); var count = document.getElementById('result-count'); if (!input || !count) return false; var before = count.textContent; input.value = 'xyz123notfound'; input.dispatchEvent(new Event('input', {bubbles:true})); return count.textContent !== before; })()",
    },
  ],

  'ng-dashboard': [
    {
      name: 'Widgets render with data',
      test: "(function() { var widgets = document.querySelectorAll('.widget'); if (widgets.length < 1) return false; return widgets[0].querySelector('.big-num') !== null; })()",
    },
    {
      name: 'Add widget button creates new widget',
      test: "(function() { var btn = document.getElementById('add-widget'); var dashboard = document.getElementById('dashboard'); if (!btn || !dashboard) return false; var before = dashboard.querySelectorAll('.widget').length; btn.click(); return dashboard.querySelectorAll('.widget').length > before; })()",
    },
    {
      name: 'Remove button deletes widget',
      test: "(function() { var dashboard = document.getElementById('dashboard'); if (!dashboard) return false; var widget = dashboard.querySelector('.widget'); if (!widget) return false; var remove = widget.querySelector('.remove'); if (!remove) return false; var before = dashboard.querySelectorAll('.widget').length; remove.click(); return dashboard.querySelectorAll('.widget').length < before; })()",
    },
    {
      name: 'Reset button restores initial widgets',
      test: "(function() { var reset = document.getElementById('reset-btn'); var dashboard = document.getElementById('dashboard'); if (!reset || !dashboard) return false; reset.click(); return dashboard.querySelectorAll('.widget').length === 4; })()",
    },
  ],

  // ── Navigation ─────────────────────────────────────────────────────
  'ng-sidebar': [
    {
      name: 'Toggle button collapses sidebar',
      test: "(function() { var btn = document.getElementById('toggle-btn'); var sidebar = document.getElementById('sidebar'); if (!btn || !sidebar) return false; var before = sidebar.classList.contains('collapsed'); btn.click(); return sidebar.classList.contains('collapsed') !== before; })()",
    },
    {
      name: 'Clicking nav item updates active state',
      test: "(function() { var items = document.querySelectorAll('#nav-list .nav-item'); if (items.length < 2) return false; items[1].click(); return items[1].classList.contains('active'); })()",
    },
    {
      name: 'Navigation updates page title',
      test: "(function() { var items = document.querySelectorAll('#nav-list .nav-item'); var title = document.getElementById('page-title'); if (items.length < 2 || !title) return false; var before = title.textContent; items[1].click(); return title.textContent !== before; })()",
    },
  ],

  'ng-navbar': [
    {
      name: 'Clicking nav link updates active state',
      test: "(function() { var links = document.querySelectorAll('#nav-links .nav-link'); if (links.length < 2) return false; links[1].click(); return links[1].classList.contains('active'); })()",
    },
    {
      name: 'Navigation updates page name',
      test: "(function() { var links = document.querySelectorAll('#nav-links .nav-link'); var name = document.getElementById('page-name'); if (links.length < 2 || !name) return false; var before = name.textContent; links[1].click(); return name.textContent !== before; })()",
    },
    {
      name: 'Login button toggles login state',
      test: "(function() { var btn = document.getElementById('login-btn'); if (!btn) return false; var before = btn.textContent; btn.click(); return btn.textContent !== before; })()",
    },
    {
      name: 'Hamburger toggles mobile menu',
      test: "(function() { var hamburger = document.getElementById('hamburger'); var menu = document.getElementById('mobile-menu'); if (!hamburger || !menu) return false; hamburger.click(); return menu.style.display !== 'none'; })()",
    },
  ],

  'ng-breadcrumbs': [
    {
      name: 'Breadcrumbs render for current path',
      test: "(function() { var crumbs = document.getElementById('breadcrumbs'); if (!crumbs) return false; return crumbs.querySelectorAll('.crumb').length > 0; })()",
    },
    {
      name: 'Clicking route updates breadcrumbs',
      test: "(function() { var item = document.querySelector('.route-item[data-path]'); var crumbs = document.getElementById('breadcrumbs'); if (!item || !crumbs) return false; var before = crumbs.querySelectorAll('.crumb').length; item.click(); return crumbs.querySelectorAll('.crumb').length !== before; })()",
    },
    {
      name: 'Clicking breadcrumb navigates back',
      test: "(function() { var items = document.querySelectorAll('.route-item[data-path]'); var crumbs = document.getElementById('breadcrumbs'); if (items.length < 2 || !crumbs) return false; items[1].click(); var crumb = crumbs.querySelector('.crumb:not(.current)'); if (!crumb) return false; var before = crumbs.querySelectorAll('.crumb').length; crumb.click(); return crumbs.querySelectorAll('.crumb').length < before; })()",
    },
  ],

  'ng-bottom-nav': [
    {
      name: 'Clicking nav item updates active state',
      test: "(function() { var items = document.querySelectorAll('#bottom-nav .bnav-item'); if (items.length < 2) return false; items[1].click(); return items[1].classList.contains('active'); })()",
    },
    {
      name: 'Navigation updates screen title',
      test: "(function() { var items = document.querySelectorAll('#bottom-nav .bnav-item'); var title = document.getElementById('screen-title'); if (items.length < 2 || !title) return false; var before = title.textContent; items[1].click(); return title.textContent !== before; })()",
    },
    {
      name: 'Navigation updates screen content',
      test: "(function() { var items = document.querySelectorAll('#bottom-nav .bnav-item'); var body = document.getElementById('screen-body'); if (items.length < 2 || !body) return false; var before = body.textContent; items[1].click(); return body.textContent !== before; })()",
    },
  ],

  'ng-mega-menu': [
    {
      name: 'Clicking trigger opens mega menu',
      test: "(function() { var trigger = document.querySelector('.menu-trigger'); var panel = document.getElementById('mega-panel'); if (!trigger || !panel) return false; trigger.click(); return panel.style.display !== 'none'; })()",
    },
    {
      name: 'Menu panel renders columns',
      test: "(function() { var trigger = document.querySelector('.menu-trigger'); var panel = document.getElementById('mega-panel'); if (!trigger || !panel) return false; trigger.click(); return panel.querySelectorAll('.mega-column').length > 0; })()",
    },
    {
      name: 'Clicking same trigger closes menu',
      test: "(function() { var trigger = document.querySelector('.menu-trigger'); var panel = document.getElementById('mega-panel'); if (!trigger || !panel) return false; trigger.click(); trigger.click(); return panel.style.display === 'none'; })()",
    },
  ],

  'ng-pagination': [
    {
      name: 'Initial items render on page',
      test: "(function() { var list = document.getElementById('item-list'); if (!list) return false; var items = list.querySelectorAll('li'); return items.length > 0 && items.length <= 5; })()",
    },
    {
      name: 'Next button changes displayed items',
      test: "(function() { var list = document.getElementById('item-list'); var next = document.querySelector('#paginator button:last-child'); if (!list || !next) return false; var first = list.querySelector('li').textContent; next.click(); return list.querySelector('li').textContent !== first; })()",
    },
    {
      name: 'Page size selector changes items per page',
      test: "(function() { var select = document.getElementById('page-size'); var list = document.getElementById('item-list'); if (!select || !list) return false; select.value = '10'; select.dispatchEvent(new Event('change', {bubbles:true})); return list.querySelectorAll('li').length === 10; })()",
    },
    {
      name: 'URL bar updates with page number',
      test: "(function() { var next = document.querySelector('#paginator button:last-child'); var urlBar = document.getElementById('url-bar'); if (!next || !urlBar) return false; var before = urlBar.textContent; next.click(); return urlBar.textContent !== before && urlBar.textContent.includes('page='); })()",
    },
  ],

  // ── Advanced Features ──────────────────────────────────────────────
  'ng-keyboard-shortcuts': [
    {
      name: 'Ctrl+N shortcut triggers action',
      test: "(function() { var log = document.getElementById('log'); if (!log) return false; document.dispatchEvent(new KeyboardEvent('keydown', {key: 'n', ctrlKey: true, bubbles:true})); return log.textContent.includes('Created'); })()",
    },
    {
      name: 'Ctrl+F opens search overlay',
      test: "(function() { var overlay = document.getElementById('search-overlay'); if (!overlay) return false; document.dispatchEvent(new KeyboardEvent('keydown', {key: 'f', ctrlKey: true, bubbles:true})); return overlay.style.display !== 'none'; })()",
    },
    {
      name: 'Escape closes search overlay',
      test: "(function() { var overlay = document.getElementById('search-overlay'); if (!overlay) return false; document.dispatchEvent(new KeyboardEvent('keydown', {key: 'f', ctrlKey: true, bubbles:true})); document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles:true})); return overlay.style.display === 'none'; })()",
    },
  ],

  'ng-settings-panel': [
    {
      name: 'Theme toggle changes active button',
      test: "(function() { var buttons = document.querySelectorAll('.toggle-group .tg'); if (buttons.length < 2) return false; buttons[1].click(); return buttons[1].classList.contains('active'); })()",
    },
    {
      name: 'Color selection updates preview',
      test: "(function() { var dot = document.querySelector('#color-options .color-dot'); var preview = document.getElementById('preview'); if (!dot || !preview) return false; dot.click(); return preview.style.borderLeftColor !== ''; })()",
    },
    {
      name: 'Font size slider updates preview',
      test: "(function() { var slider = document.getElementById('font-size'); var preview = document.getElementById('preview'); if (!slider || !preview) return false; slider.value = '20'; slider.dispatchEvent(new Event('input', {bubbles:true})); return preview.style.fontSize === '20px'; })()",
    },
    {
      name: 'Save button shows confirmation',
      test: "(function() { var btn = document.getElementById('save-btn'); var msg = document.getElementById('saved-msg'); if (!btn || !msg) return false; btn.click(); return msg.style.display !== 'none'; })()",
    },
  ],

  'ng-notifications-center': [
    {
      name: 'Notifications render with data',
      test: "(function() { var list = document.getElementById('notif-list'); if (!list) return false; var notifs = list.querySelectorAll('.notif'); return notifs.length > 0 && notifs[0].textContent.trim().length > 0; })()",
    },
    {
      name: 'Clicking notification marks it read',
      test: "(function() { var notif = document.querySelector('#notif-list .notif.unread'); if (!notif) return false; notif.click(); return !notif.classList.contains('unread'); })()",
    },
    {
      name: 'Filter tabs change displayed notifications',
      test: "(function() { var list = document.getElementById('notif-list'); var tab = document.querySelector('.filter-tabs .ft[data-filter=\"unread\"]'); if (!list || !tab) return false; var before = list.querySelectorAll('.notif').length; tab.click(); return list.querySelectorAll('.notif').length !== before; })()",
    },
    {
      name: 'Mark all button marks all as read',
      test: "(function() { var btn = document.getElementById('mark-all'); var badge = document.getElementById('badge'); if (!btn || !badge) return false; btn.click(); return badge.style.display === 'none' || badge.textContent === '0'; })()",
    },
  ],

  'ng-favorites': [
    {
      name: 'Clicking favorite button toggles state',
      test: "(function() { var btn = document.querySelector('.item-card .fav-btn'); if (!btn) return false; var before = btn.classList.contains('active'); btn.click(); return btn.classList.contains('active') !== before; })()",
    },
    {
      name: 'Adding favorite updates count',
      test: "(function() { var btn = document.querySelector('.item-card .fav-btn:not(.active)'); var count = document.getElementById('fav-count'); if (!btn || !count) return false; var before = parseInt(count.textContent) || 0; btn.click(); return parseInt(count.textContent) > before; })()",
    },
    {
      name: 'Favorite appears in favorites list',
      test: "(function() { var btn = document.querySelector('.item-card .fav-btn:not(.active)'); var list = document.getElementById('favorites'); if (!btn || !list) return false; var before = list.querySelectorAll('.fav-item').length; btn.click(); return list.querySelectorAll('.fav-item').length > before; })()",
    },
    {
      name: 'Remove button removes from favorites',
      test: "(function() { var fav = document.querySelector('#favorites .fav-item .remove-btn'); if (!fav) return false; var list = document.getElementById('favorites'); var before = list.querySelectorAll('.fav-item').length; fav.click(); return list.querySelectorAll('.fav-item').length < before; })()",
    },
  ],

  'ng-undo-redo': [
    {
      name: 'Add button creates item and enables undo',
      test: "(function() { var btn = document.getElementById('add-btn'); var undo = document.getElementById('undo-btn'); if (!btn || !undo) return false; btn.click(); return undo.disabled === false; })()",
    },
    {
      name: 'Undo button reverts action',
      test: "(function() { var add = document.getElementById('add-btn'); var undo = document.getElementById('undo-btn'); var row = document.getElementById('item-row'); if (!add || !undo || !row) return false; add.click(); var before = row.querySelectorAll('.box').length; undo.click(); return row.querySelectorAll('.box').length < before; })()",
    },
    {
      name: 'Redo button restores undone action',
      test: "(function() { var add = document.getElementById('add-btn'); var undo = document.getElementById('undo-btn'); var redo = document.getElementById('redo-btn'); var row = document.getElementById('item-row'); if (!add || !undo || !redo || !row) return false; add.click(); undo.click(); var before = row.querySelectorAll('.box').length; redo.click(); return row.querySelectorAll('.box').length > before; })()",
    },
    {
      name: 'History log updates with actions',
      test: "(function() { var add = document.getElementById('add-btn'); var log = document.getElementById('history-log'); if (!add || !log) return false; var before = log.children.length; add.click(); return log.children.length > before; })()",
    },
  ],

  // ── UI Components ──────────────────────────────────────────────────
  'ng-loading-states': [
    {
      name: 'Load button shows loading state',
      test: "(function() { var btn = document.getElementById('load-btn'); if (!btn) return false; btn.click(); return btn.textContent.includes('Loading'); })()",
    },
    {
      name: 'Content updates after loading delay',
      test: "(function() { var btn = document.getElementById('load-btn'); var content = document.getElementById('content'); if (!btn || !content) return false; btn.click(); return new Promise(function(resolve) { setTimeout(function() { resolve(content.querySelector('.loaded-card') !== null); }, 1600); }); })()",
    },
    {
      name: 'Reset button restores skeleton state',
      test: "(function() { var btn = document.getElementById('load-btn'); var content = document.getElementById('content'); if (!btn || !content) return false; btn.click(); return new Promise(function(resolve) { setTimeout(function() { btn.click(); setTimeout(function() { resolve(content.querySelector('.skeleton-card') !== null); }, 50); }, 1600); }); })()",
    },
  ],

  'ng-empty-states': [
    {
      name: 'Empty state renders with content',
      test: "(function() { var container = document.getElementById('empty-state'); if (!container) return false; return container.querySelector('.empty-title') && container.querySelector('.empty-title').textContent.length > 0; })()",
    },
    {
      name: 'Switching tabs changes empty state',
      test: "(function() { var tabs = document.querySelectorAll('.tabs .tab'); var title = document.querySelector('.empty-title'); if (tabs.length < 2 || !title) return false; var before = title.textContent; tabs[1].click(); return title.textContent !== before; })()",
    },
    {
      name: 'Action button exists for current state',
      test: "(function() { var action = document.querySelector('.empty-action'); return action && action.textContent.trim().length > 0; })()",
    },
  ],

  'ng-image-viewer': [
    {
      name: 'Zoom in button increases scale',
      test: "(function() { var btn = document.getElementById('zoom-in'); var level = document.getElementById('zoom-level'); if (!btn || !level) return false; var before = level.textContent; btn.click(); return level.textContent !== before && parseInt(level.textContent) > parseInt(before); })()",
    },
    {
      name: 'Zoom out button decreases scale',
      test: "(function() { var zoomIn = document.getElementById('zoom-in'); var zoomOut = document.getElementById('zoom-out'); var level = document.getElementById('zoom-level'); if (!zoomIn || !zoomOut || !level) return false; zoomIn.click(); zoomIn.click(); var before = level.textContent; zoomOut.click(); return parseInt(level.textContent) < parseInt(before); })()",
    },
    {
      name: 'Reset button restores 100% zoom',
      test: "(function() { var zoomIn = document.getElementById('zoom-in'); var reset = document.getElementById('reset-btn'); var level = document.getElementById('zoom-level'); if (!zoomIn || !reset || !level) return false; zoomIn.click(); reset.click(); return level.textContent.includes('100'); })()",
    },
    {
      name: 'Mouse drag pans the image',
      test: "(function() { var viewer = document.getElementById('viewer'); var container = document.getElementById('image-container'); if (!viewer || !container) return false; viewer.dispatchEvent(new MouseEvent('mousedown', {clientX: 100, clientY: 100, bubbles:true})); document.dispatchEvent(new MouseEvent('mousemove', {clientX: 150, clientY: 150, bubbles:true})); document.dispatchEvent(new MouseEvent('mouseup', {bubbles:true})); return container.style.transform.includes('translate'); })()",
    },
  ],

  'ng-toggle-switch': [
    {
      name: 'Clicking toggle changes state',
      test: "(function() { var toggle = document.querySelector('.toggle:not(.disabled)'); if (!toggle) return false; var before = toggle.classList.contains('on'); toggle.click(); return toggle.classList.contains('on') !== before; })()",
    },
    {
      name: 'Toggle updates status text',
      test: "(function() { var toggle = document.querySelector('.toggle:not(.disabled)'); if (!toggle) return false; var status = toggle.querySelector('.status'); if (!status) return false; var before = status.textContent; toggle.click(); return status.textContent !== before; })()",
    },
    {
      name: 'Form value updates with toggle',
      test: "(function() { var toggle = document.querySelector('.toggle:not(.disabled)'); var formValue = document.getElementById('form-value'); if (!toggle || !formValue) return false; var before = formValue.textContent; toggle.click(); return formValue.textContent !== before; })()",
    },
    {
      name: 'Space key toggles switch',
      test: "(function() { var toggle = document.querySelector('.toggle:not(.disabled)'); if (!toggle) return false; var before = toggle.classList.contains('on'); toggle.dispatchEvent(new KeyboardEvent('keydown', {key: ' ', bubbles:true})); return toggle.classList.contains('on') !== before; })()",
    },
  ],
};
