import type { UIPattern } from './types';

export const nativeJsUIPatterns: UIPattern[] = [
  // Forms & Input
  {
    id: 'js-form-validation',
    title: 'Form Validation',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build a form with client-side validation using the Constraint Validation API. Handle custom validation rules, display error messages, and prevent submission of invalid forms.',
    concepts: ['Constraint Validation API', 'DOM API', 'Event delegation', 'Form events'],
    demoCode: {
      html: `<form id="signup-form" novalidate>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" placeholder="you@example.com" required />
    <span class="error" id="email-error"></span>
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" id="password" placeholder="Min 8 characters" required minlength="8" />
    <span class="error" id="password-error"></span>
  </div>
  <div class="form-group">
    <label for="confirm">Confirm Password</label>
    <input type="password" id="confirm" placeholder="Re-enter password" required />
    <span class="error" id="confirm-error"></span>
  </div>
  <button type="submit">Sign Up</button>
  <div id="success" class="success" style="display:none">Account created successfully!</div>
</form>`,
      css: `.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  color: #94a3b8;
}

input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #3b82f6;
}

input.invalid {
  border-color: #ef4444;
}

input.valid {
  border-color: #22c55e;
}

.error {
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
  display: block;
  min-height: 18px;
}

.success {
  color: #22c55e;
  text-align: center;
  padding: 12px;
  border-radius: 8px;
  background: rgba(34,197,94,0.1);
  margin-top: 16px;
}

button {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #3b82f6;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #2563eb;
}`,
      js: `const form = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');

function validate(input, errorId, check) {
  const errorEl = document.getElementById(errorId);
  const msg = check(input.value);
  errorEl.textContent = msg || '';
  input.className = msg ? 'invalid' : input.value ? 'valid' : '';
  return !msg;
}

emailInput.addEventListener('input', () => validate(emailInput, 'email-error', v => {
  if (!v) return 'Email is required';
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v)) return 'Enter a valid email';
}));

passwordInput.addEventListener('input', () => validate(passwordInput, 'password-error', v => {
  if (!v) return 'Password is required';
  if (v.length < 8) return 'Must be at least 8 characters';
}));

confirmInput.addEventListener('input', () => validate(confirmInput, 'confirm-error', v => {
  if (!v) return 'Please confirm your password';
  if (v !== passwordInput.value) return 'Passwords do not match';
}));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const v1 = validate(emailInput, 'email-error', v => !v ? 'Email is required' : !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v) ? 'Enter a valid email' : '');
  const v2 = validate(passwordInput, 'password-error', v => !v ? 'Password is required' : v.length < 8 ? 'Must be at least 8 characters' : '');
  const v3 = validate(confirmInput, 'confirm-error', v => !v ? 'Please confirm' : v !== passwordInput.value ? 'Passwords do not match' : '');
  if (v1 && v2 && v3) document.getElementById('success').style.display = 'block';
});`,
    },
  },
  {
    id: 'js-autocomplete',
    title: 'Autocomplete Input',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create an autocomplete search input with debounced fetching, keyboard navigation, and accessibility features using vanilla JavaScript and the Fetch API.',
    concepts: ['Fetch API', 'Debouncing', 'ARIA', 'Keyboard navigation'],
    demoCode: {
      html: `<div class="autocomplete-wrapper">
  <label for="search">Search Fruits</label>
  <div class="input-wrapper">
    <input type="text" id="search" placeholder="Type to search..." autocomplete="off" role="combobox" aria-expanded="false" aria-controls="suggestions" />
    <ul id="suggestions" class="suggestions" role="listbox"></ul>
  </div>
  <p class="hint">Try: apple, banana, cherry, grape, mango, orange, peach, strawberry</p>
</div>`,
      css: `.autocomplete-wrapper {
  max-width: 360px;
}
label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #94a3b8;
}
.input-wrapper {
  position: relative;
}
input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
  font-size: 14px;
  transition: border-color 0.2s;
}
input:focus {
  border-color: #3b82f6;
}
.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 4px 0 0;
  padding: 4px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  list-style: none;
  display: none;
  max-height: 180px;
  overflow-y: auto;
  z-index: 10;
}
.suggestions.open {
  display: block;
}
.suggestions li {
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #e2e8f0;
}
.suggestions li.active, .suggestions li:hover {
  background: #334155;
}
.suggestions li mark {
  background: #3b82f6;
  color: white;
  border-radius: 2px;
  padding: 0 2px;
}
.hint {
  font-size: 12px;
  color: #64748b;
  margin-top: 8px;
}`,
      js: `const fruits = ['Apple','Apricot','Banana','Blueberry','Cherry','Grape','Kiwi','Lemon','Mango','Orange','Peach','Pear','Pineapple','Strawberry','Watermelon'];
const input = document.getElementById('search');
const list = document.getElementById('suggestions');
let activeIdx = -1, debounceTimer;

function showSuggestions(query) {
  list.innerHTML = '';
  activeIdx = -1;
  if (!query) { list.classList.remove('open'); input.setAttribute('aria-expanded','false'); return; }
  const matches = fruits.filter(f => f.toLowerCase().includes(query.toLowerCase()));
  if (!matches.length) { list.classList.remove('open'); input.setAttribute('aria-expanded','false'); return; }
  matches.forEach((fruit, i) => {
    const li = document.createElement('li');
    li.setAttribute('role','option');
    li.id = 'opt-'+i;
    const regex = new RegExp('('+query.replace(/[.*+?^\${}()|[\\]\\\\]/g,'\\\\$&')+')','gi');
    li.innerHTML = fruit.replace(regex, '<mark>$1</mark>');
    li.addEventListener('click', () => { input.value = fruit; list.classList.remove('open'); });
    list.appendChild(li);
  });
  list.classList.add('open');
  input.setAttribute('aria-expanded','true');
}

input.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => showSuggestions(input.value), 200);
});

input.addEventListener('keydown', (e) => {
  const items = list.querySelectorAll('li');
  if (!items.length) return;
  if (e.key === 'ArrowDown') { e.preventDefault(); activeIdx = Math.min(activeIdx+1, items.length-1); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); activeIdx = Math.max(activeIdx-1, 0); }
  else if (e.key === 'Enter' && activeIdx >= 0) { e.preventDefault(); input.value = items[activeIdx].textContent; list.classList.remove('open'); return; }
  else if (e.key === 'Escape') { list.classList.remove('open'); return; }
  items.forEach(li => li.classList.remove('active'));
  if (activeIdx >= 0) { items[activeIdx].classList.add('active'); items[activeIdx].scrollIntoView({block:'nearest'}); }
});`,
    },
  },
  {
    id: 'js-file-upload',
    title: 'Drag & Drop File Upload',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Implement a drag-and-drop file upload interface with progress tracking using FileReader API, drag events, and visual feedback for upload status.',
    concepts: ['FileReader API', 'Drag and Drop API', 'Progress events', 'File API'],
    demoCode: {
      html: `<div class="upload-zone" id="drop-zone">
  <div class="upload-icon">&#128228;</div>
  <p>Drag & drop files here</p>
  <p class="hint">or click to browse</p>
  <input type="file" id="file-input" multiple hidden />
</div>
<ul id="file-list" class="file-list"></ul>`,
      css: `.upload-zone {
  border: 2px dashed #475569;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}
.upload-zone.dragover {
  border-color: #3b82f6;
  background: rgba(59,130,246,0.08);
}
.upload-icon {
  font-size: 36px;
  margin-bottom: 8px;
}
.upload-zone p {
  color: #94a3b8;
  margin: 4px 0;
  font-size: 14px;
}
.hint {
  font-size: 12px !important;
  color: #64748b !important;
}
.file-list {
  list-style: none;
  padding: 0;
  margin-top: 16px;
}
.file-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  margin-bottom: 8px;
}
.file-item .name {
  flex: 1;
  font-size: 13px;
  color: #e2e8f0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.file-item .size {
  font-size: 12px;
  color: #64748b;
}
.progress-bar {
  width: 80px;
  height: 6px;
  background: #334155;
  border-radius: 3px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: #3b82f6;
  border-radius: 3px;
  transition: width 0.3s;
}
.done .progress-fill {
  background: #22c55e;
}`,
      js: `const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes/1024).toFixed(1) + ' KB';
  return (bytes/1048576).toFixed(1) + ' MB';
}

function simulateUpload(item) {
  const fill = item.querySelector('.progress-fill');
  let pct = 0;
  const iv = setInterval(() => {
    pct += Math.random() * 25 + 5;
    if (pct >= 100) { pct = 100; clearInterval(iv); item.classList.add('done'); }
    fill.style.width = pct + '%';
  }, 200);
}

function addFiles(files) {
  Array.from(files).forEach(file => {
    const li = document.createElement('li');
    li.className = 'file-item';
    li.innerHTML = '<span class="name">'+file.name+'</span><span class="size">'+formatSize(file.size)+'</span><div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>';
    fileList.appendChild(li);
    simulateUpload(li);
  });
}

dropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => addFiles(e.target.files));
dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
dropZone.addEventListener('drop', (e) => { e.preventDefault(); dropZone.classList.remove('dragover'); addFiles(e.dataTransfer.files); });`,
    },
  },
  {
    id: 'js-date-picker',
    title: 'Custom Date Picker',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a custom date picker with calendar view, date range selection, and keyboard navigation using the Date API and DOM manipulation.',
    concepts: ['Date API', 'DOM manipulation', 'Event delegation', 'Keyboard navigation'],
    demoCode: {
      html: `<div class="datepicker-wrapper">
  <label for="date-input">Select Date</label>
  <input type="text" id="date-input" placeholder="MM/DD/YYYY" readonly />
  <div id="calendar" class="calendar" style="display:none">
    <div class="cal-header">
      <button id="prev-month" class="cal-nav">&larr;</button>
      <span id="month-label" class="month-label"></span>
      <button id="next-month" class="cal-nav">&rarr;</button>
    </div>
    <div class="cal-days" id="cal-days"></div>
    <div class="cal-grid" id="cal-grid"></div>
  </div>
</div>`,
      css: `.datepicker-wrapper {
  position: relative;
  max-width: 280px;
}
label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #94a3b8;
}
input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  cursor: pointer;
  outline: none;
  font-size: 14px;
}
input:focus {
  border-color: #3b82f6;
}
.calendar {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 6px;
  padding: 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  z-index: 10;
  width: 280px;
}
.cal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.month-label {
  font-size: 15px;
  font-weight: 600;
  color: #e2e8f0;
}
.cal-nav {
  background: none;
  border: 1px solid #475569;
  color: #94a3b8;
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
}
.cal-nav:hover {
  background: #334155;
  color: #e2e8f0;
}
.cal-days, .cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  text-align: center;
}
.cal-days {
  margin-bottom: 4px;
}
.cal-days span {
  font-size: 11px;
  color: #64748b;
  padding: 4px 0;
}
.cal-grid button {
  padding: 8px 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  font-size: 13px;
}
.cal-grid button:hover {
  background: #334155;
  color: #e2e8f0;
}
.cal-grid button.today {
  border: 1px solid #3b82f6;
  color: #3b82f6;
}
.cal-grid button.selected {
  background: #3b82f6;
  color: white;
}
.cal-grid button.empty {
  visibility: hidden;
}`,
      js: `const input = document.getElementById('date-input');
const calendar = document.getElementById('calendar');
const grid = document.getElementById('cal-grid');
const label = document.getElementById('month-label');
const daysRow = document.getElementById('cal-days');
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let current = new Date(), selected = null;

['Su','Mo','Tu','We','Th','Fr','Sa'].forEach(d => { const s = document.createElement('span'); s.textContent = d; daysRow.appendChild(s); });

function render() {
  const y = current.getFullYear(), m = current.getMonth();
  label.textContent = months[m] + ' ' + y;
  grid.innerHTML = '';
  const first = new Date(y, m, 1).getDay(), days = new Date(y, m+1, 0).getDate();
  const today = new Date();
  for (let i = 0; i < first; i++) { const b = document.createElement('button'); b.className = 'empty'; b.textContent = '.'; grid.appendChild(b); }
  for (let d = 1; d <= days; d++) {
    const b = document.createElement('button');
    b.textContent = d;
    if (d === today.getDate() && m === today.getMonth() && y === today.getFullYear()) b.classList.add('today');
    if (selected && d === selected.getDate() && m === selected.getMonth() && y === selected.getFullYear()) b.classList.add('selected');
    b.addEventListener('click', () => {
      selected = new Date(y, m, d);
      input.value = String(m+1).padStart(2,'0')+'/'+String(d).padStart(2,'0')+'/'+y;
      calendar.style.display = 'none';
      render();
    });
    grid.appendChild(b);
  }
}

input.addEventListener('click', () => { calendar.style.display = calendar.style.display === 'none' ? 'block' : 'none'; render(); });
document.getElementById('prev-month').addEventListener('click', () => { current.setMonth(current.getMonth()-1); render(); });
document.getElementById('next-month').addEventListener('click', () => { current.setMonth(current.getMonth()+1); render(); });
document.addEventListener('click', (e) => { if (!e.target.closest('.datepicker-wrapper')) calendar.style.display = 'none'; });
render();`,
    },
  },
  {
    id: 'js-input-masking',
    title: 'Input Masking',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create masked input fields for phone numbers, credit cards, and dates using input event listeners and string manipulation.',
    concepts: ['Input events', 'Regular expressions', 'String manipulation', 'Cursor position'],
    demoCode: {
      html: `<div class="masks">
  <div class="form-group">
    <label>Phone Number</label>
    <input type="text" id="phone" placeholder="(___) ___-____" maxlength="14" />
  </div>
  <div class="form-group">
    <label>Credit Card</label>
    <input type="text" id="card" placeholder="____ ____ ____ ____" maxlength="19" />
  </div>
  <div class="form-group">
    <label>Date</label>
    <input type="text" id="date" placeholder="MM/DD/YYYY" maxlength="10" />
  </div>
  <div id="output" class="output"></div>
</div>`,
      css: `.masks {
  max-width: 320px;
}
.form-group {
  margin-bottom: 16px;
}
label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  color: #94a3b8;
}
input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
  font-size: 16px;
  font-family: monospace;
  letter-spacing: 1px;
  transition: border-color 0.2s;
}
input:focus {
  border-color: #3b82f6;
}
.output {
  margin-top: 12px;
  padding: 10px;
  background: #1e293b;
  border-radius: 8px;
  font-size: 12px;
  color: #64748b;
  font-family: monospace;
  min-height: 40px;
}`,
      js: `const phoneInput = document.getElementById('phone');
const cardInput = document.getElementById('card');
const dateInput = document.getElementById('date');
const output = document.getElementById('output');

function maskPhone(v) {
  const d = v.replace(/\\D/g, '').slice(0, 10);
  if (d.length === 0) return '';
  if (d.length <= 3) return '(' + d;
  if (d.length <= 6) return '(' + d.slice(0,3) + ') ' + d.slice(3);
  return '(' + d.slice(0,3) + ') ' + d.slice(3,6) + '-' + d.slice(6);
}

function maskCard(v) {
  const d = v.replace(/\\D/g, '').slice(0, 16);
  return d.replace(/(\\d{4})(?=\\d)/g, '$1 ');
}

function maskDate(v) {
  const d = v.replace(/\\D/g, '').slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return d.slice(0,2) + '/' + d.slice(2);
  return d.slice(0,2) + '/' + d.slice(2,4) + '/' + d.slice(4);
}

function applyMask(input, maskFn) {
  input.addEventListener('input', () => {
    const pos = input.selectionStart;
    const before = input.value.length;
    input.value = maskFn(input.value);
    const after = input.value.length;
    const newPos = pos + (after - before);
    input.setSelectionRange(newPos, newPos);
    updateOutput();
  });
}

function updateOutput() {
  const parts = [];
  if (phoneInput.value) parts.push('Phone: ' + phoneInput.value);
  if (cardInput.value) parts.push('Card: ' + cardInput.value);
  if (dateInput.value) parts.push('Date: ' + dateInput.value);
  output.textContent = parts.length ? parts.join(' | ') : 'Type in any field above...';
}

applyMask(phoneInput, maskPhone);
applyMask(cardInput, maskCard);
applyMask(dateInput, maskDate);
updateOutput();`,
    },
  },
  {
    id: 'js-range-slider',
    title: 'Custom Range Slider',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a custom range slider with dual handles, tooltips, and smooth dragging using pointer events and CSS transforms.',
    concepts: ['Pointer events', 'CSS transforms', 'Event listeners', 'DOM manipulation'],
    demoCode: {
      html: `<div class="slider-container">
  <label>Price Range</label>
  <div class="slider-track" id="slider">
    <div class="slider-fill" id="fill"></div>
    <div class="slider-thumb" id="thumb-min" data-value="20"></div>
    <div class="slider-thumb" id="thumb-max" data-value="80"></div>
  </div>
  <div class="slider-values">
    <span id="val-min">$20</span>
    <span id="val-max">$80</span>
  </div>
</div>`,
      css: `.slider-container {
  padding: 20px 10px;
}

label {
  display: block;
  margin-bottom: 16px;
  font-size: 14px;
  color: #94a3b8;
}

.slider-track {
  position: relative;
  height: 6px;
  background: #334155;
  border-radius: 3px;
  margin: 20px 0;
}

.slider-fill {
  position: absolute;
  height: 100%;
  background: #3b82f6;
  border-radius: 3px;
}

.slider-thumb {
  position: absolute;
  top: 50%;
  width: 22px;
  height: 22px;
  background: #3b82f6;
  border: 2px solid #1e293b;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: grab;
  transition: box-shadow 0.2s;
  z-index: 2;
}

.slider-thumb:hover, .slider-thumb.active {
  box-shadow: 0 0 0 6px rgba(59,130,246,0.25);
}

.slider-values {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 600;
  color: #e2e8f0;
}`,
      js: `const slider = document.getElementById('slider');
const thumbMin = document.getElementById('thumb-min');
const thumbMax = document.getElementById('thumb-max');
const fill = document.getElementById('fill');
let minVal = 20, maxVal = 80;

function updateUI() {
  thumbMin.style.left = minVal + '%';
  thumbMax.style.left = maxVal + '%';
  fill.style.left = minVal + '%';
  fill.style.width = (maxVal - minVal) + '%';
  document.getElementById('val-min').textContent = '$' + minVal;
  document.getElementById('val-max').textContent = '$' + maxVal;
}
updateUI();

function startDrag(thumb, isMin) {
  thumb.classList.add('active');
  const onMove = (e) => {
    const rect = slider.getBoundingClientRect();
    let pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    pct = Math.max(0, Math.min(100, pct));
    if (isMin) { minVal = Math.min(pct, maxVal - 5); }
    else { maxVal = Math.max(pct, minVal + 5); }
    updateUI();
  };
  const onUp = () => { thumb.classList.remove('active'); document.removeEventListener('pointermove', onMove); document.removeEventListener('pointerup', onUp); };
  document.addEventListener('pointermove', onMove);
  document.addEventListener('pointerup', onUp);
}

thumbMin.addEventListener('pointerdown', () => startDrag(thumbMin, true));
thumbMax.addEventListener('pointerdown', () => startDrag(thumbMax, false));`,
    },
  },
  {
    id: 'js-inline-edit',
    title: 'Inline Editing',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Implement inline editing functionality that switches between display and edit modes using contentEditable or dynamic input elements.',
    concepts: ['contentEditable', 'Focus management', 'Event delegation', 'DOM manipulation'],
    demoCode: {
      html: `<div class="inline-edit-list">
  <h3>Team Members</h3>
  <div class="edit-item" data-field="name1">
    <span class="display">Alice Johnson</span>
    <input class="edit-input" value="Alice Johnson" />
    <button class="edit-btn">Edit</button>
  </div>
  <div class="edit-item" data-field="name2">
    <span class="display">Bob Smith</span>
    <input class="edit-input" value="Bob Smith" />
    <button class="edit-btn">Edit</button>
  </div>
  <div class="edit-item" data-field="name3">
    <span class="display">Carol Davis</span>
    <input class="edit-input" value="Carol Davis" />
    <button class="edit-btn">Edit</button>
  </div>
  <p class="hint">Click "Edit" or double-click text to edit. Press Enter to save, Escape to cancel.</p>
</div>`,
      css: `.inline-edit-list {
  max-width: 360px;
}
h3 {
  font-size: 16px;
  margin-bottom: 12px;
  color: #e2e8f0;
}
.edit-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  margin-bottom: 8px;
}
.edit-item .display {
  flex: 1;
  color: #e2e8f0;
  font-size: 14px;
  cursor: pointer;
}
.edit-item .edit-input {
  flex: 1;
  display: none;
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid #3b82f6;
  background: #0f172a;
  color: #e2e8f0;
  outline: none;
  font-size: 14px;
}
.edit-item.editing .display {
  display: none;
}
.edit-item.editing .edit-input {
  display: block;
}
.edit-item.editing .edit-btn {
  display: none;
}
.edit-btn {
  padding: 4px 12px;
  border-radius: 6px;
  border: 1px solid #475569;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  font-size: 12px;
}
.edit-btn:hover {
  background: #334155;
  color: #e2e8f0;
}
.hint {
  font-size: 12px;
  color: #64748b;
  margin-top: 12px;
}`,
      js: `document.querySelectorAll('.edit-item').forEach(item => {
  const display = item.querySelector('.display');
  const input = item.querySelector('.edit-input');
  const btn = item.querySelector('.edit-btn');

  function startEdit() {
    item.classList.add('editing');
    input.value = display.textContent;
    input.focus();
    input.select();
  }
  function save() {
    if (input.value.trim()) display.textContent = input.value.trim();
    item.classList.remove('editing');
  }
  function cancel() {
    input.value = display.textContent;
    item.classList.remove('editing');
  }

  btn.addEventListener('click', startEdit);
  display.addEventListener('dblclick', startEdit);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') save();
    if (e.key === 'Escape') cancel();
  });
  input.addEventListener('blur', save);
});`,
    },
  },
  {
    id: 'js-custom-select',
    title: 'Custom Select Dropdown',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create a fully accessible custom select dropdown with search filtering, keyboard navigation, and custom styling replacing the native select element.',
    concepts: ['ARIA', 'Keyboard navigation', 'Event delegation', 'Focus management'],
    demoCode: {
      html: `<div class="select-wrapper">
  <label id="sel-label">Choose a Framework</label>
  <div class="custom-select" id="custom-select" role="combobox" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="sel-label" tabindex="0">
    <span class="select-value" id="select-value">Select...</span>
    <span class="arrow">&#9662;</span>
  </div>
  <ul class="select-options" id="options" role="listbox" style="display:none">
    <li role="option" data-value="react">React</li>
    <li role="option" data-value="vue">Vue</li>
    <li role="option" data-value="angular">Angular</li>
    <li role="option" data-value="svelte">Svelte</li>
    <li role="option" data-value="solid">SolidJS</li>
  </ul>
  <p class="hint" id="result"></p>
</div>`,
      css: `.select-wrapper {
  max-width: 280px;
  position: relative;
}
label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #94a3b8;
}
.custom-select {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  cursor: pointer;
  outline: none;
  font-size: 14px;
}
.custom-select:focus, .custom-select[aria-expanded="true"] {
  border-color: #3b82f6;
}
.arrow {
  font-size: 12px;
  color: #64748b;
  transition: transform 0.2s;
}
.custom-select[aria-expanded="true"] .arrow {
  transform: rotate(180deg);
}
.select-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  padding: 4px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  list-style: none;
  z-index: 10;
  max-height: 180px;
  overflow-y: auto;
}
.select-options li {
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #e2e8f0;
}
.select-options li:hover, .select-options li.active {
  background: #334155;
}
.select-options li.selected {
  background: #3b82f6;
  color: white;
}
.hint {
  font-size: 12px;
  color: #64748b;
  margin-top: 8px;
}`,
      js: `const select = document.getElementById('custom-select');
const optionsList = document.getElementById('options');
const valueEl = document.getElementById('select-value');
const resultEl = document.getElementById('result');
const items = optionsList.querySelectorAll('li');
let activeIdx = -1, isOpen = false;

function open() {
  isOpen = true;
  optionsList.style.display = 'block';
  select.setAttribute('aria-expanded','true');
}
function close() {
  isOpen = false;
  optionsList.style.display = 'none';
  select.setAttribute('aria-expanded','false');
  activeIdx = -1;
  items.forEach(i => i.classList.remove('active'));
}

function selectItem(li) {
  items.forEach(i => i.classList.remove('selected'));
  li.classList.add('selected');
  valueEl.textContent = li.textContent;
  resultEl.textContent = 'Selected: ' + li.dataset.value;
  close();
}

select.addEventListener('click', () => isOpen ? close() : open());
items.forEach(li => li.addEventListener('click', () => selectItem(li)));

select.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    if (!isOpen) { open(); }
    else if (activeIdx >= 0) { selectItem(items[activeIdx]); }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault(); if (!isOpen) open();
    activeIdx = Math.min(activeIdx+1, items.length-1);
    items.forEach(i => i.classList.remove('active'));
    items[activeIdx].classList.add('active');
    items[activeIdx].scrollIntoView({block:'nearest'});
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeIdx = Math.max(activeIdx-1, 0);
    items.forEach(i => i.classList.remove('active'));
    items[activeIdx].classList.add('active');
  } else if (e.key === 'Escape') { close(); }
});

document.addEventListener('click', (e) => { if (!e.target.closest('.select-wrapper')) close(); });`,
    },
  },
  {
    id: 'js-password-strength',
    title: 'Password Strength Meter',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build a password strength indicator that evaluates password quality using regex validation and displays visual feedback in real-time.',
    concepts: ['Regular expressions', 'Input events', 'DOM manipulation', 'CSS transitions'],
    demoCode: {
      html: `<div class="password-meter">
  <label for="pw-input">Create Password</label>
  <input type="password" id="pw-input" placeholder="Enter a password..." />
  <div class="meter-track">
    <div class="meter-fill" id="meter-fill"></div>
  </div>
  <p class="strength-label" id="strength-label">Enter a password</p>
  <ul class="rules" id="rules">
    <li id="rule-len">At least 8 characters</li>
    <li id="rule-upper">Contains uppercase letter</li>
    <li id="rule-lower">Contains lowercase letter</li>
    <li id="rule-num">Contains a number</li>
    <li id="rule-special">Contains special character</li>
  </ul>
</div>`,
      css: `.password-meter { max-width: 320px; }
label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #94a3b8;
}
input {
  width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155;
  background: #1e293b; color: #e2e8f0; outline: none; font-size: 14px;
}
input:focus {
  border-color: #3b82f6;
}
.meter-track {
  height: 6px;
  background: #334155;
  border-radius: 3px;
  margin-top: 12px;
  overflow: hidden;
}
.meter-fill {
  height: 100%;
  width: 0%;
  border-radius: 3px;
  transition: width 0.3s, background 0.3s;
}
.strength-label {
  font-size: 13px;
  margin-top: 8px;
  font-weight: 600;
  color: #64748b;
}
.rules {
  list-style: none;
  padding: 0;
  margin-top: 12px;
}
.rules li {
  font-size: 12px;
  color: #64748b;
  padding: 3px 0;
  transition: color 0.2s;
}
.rules li::before {
  content: '\\2717 ';
  color: #ef4444;
}
.rules li.pass { color: #94a3b8; }
.rules li.pass::before {
  content: '\\2713 ';
  color: #22c55e;
}`,
      js: `const pwInput = document.getElementById('pw-input');
const meterFill = document.getElementById('meter-fill');
const strengthLabel = document.getElementById('strength-label');
const rules = {
  len: { el: document.getElementById('rule-len'), test: v => v.length >= 8 },
  upper: { el: document.getElementById('rule-upper'), test: v => /[A-Z]/.test(v) },
  lower: { el: document.getElementById('rule-lower'), test: v => /[a-z]/.test(v) },
  num: { el: document.getElementById('rule-num'), test: v => /[0-9]/.test(v) },
  special: { el: document.getElementById('rule-special'), test: v => /[^A-Za-z0-9]/.test(v) },
};

const levels = [
  { label: 'Very Weak', color: '#ef4444', width: '20%' },
  { label: 'Weak', color: '#f97316', width: '40%' },
  { label: 'Fair', color: '#eab308', width: '60%' },
  { label: 'Strong', color: '#22c55e', width: '80%' },
  { label: 'Very Strong', color: '#10b981', width: '100%' },
];

pwInput.addEventListener('input', () => {
  const v = pwInput.value;
  let score = 0;
  Object.values(rules).forEach(r => {
    const pass = r.test(v);
    r.el.classList.toggle('pass', pass);
    if (pass) score++;
  });
  if (!v) { meterFill.style.width = '0%'; meterFill.style.background = '#334155'; strengthLabel.textContent = 'Enter a password'; strengthLabel.style.color = '#64748b'; return; }
  const level = levels[Math.max(0, score - 1)];
  meterFill.style.width = level.width;
  meterFill.style.background = level.color;
  strengthLabel.textContent = level.label;
  strengthLabel.style.color = level.color;
});`,
    },
  },
  {
    id: 'js-dynamic-form',
    title: 'Dynamic Form Builder',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Generate forms dynamically from JSON schema with validation, conditional fields, and nested field groups using template literals and DOM API.',
    concepts: ['JSON parsing', 'Template literals', 'DOM API', 'Constraint Validation API'],
    demoCode: {
      html: `<div id="form-builder">
  <h3>Dynamic Form</h3>
  <form id="dynamic-form"></form>
  <div id="form-output" class="output" style="display:none"></div>
</div>`,
      css: `#form-builder {
  max-width: 360px;
}
h3 {
  font-size: 16px;
  margin-bottom: 12px;
  color: #e2e8f0;
}
.field-group { margin-bottom: 14px; }
.field-group label {
  display: block;
  margin-bottom: 4px;
  font-size: 13px;
  color: #94a3b8;
}
.field-group label .req { color: #ef4444; }
.field-group input, .field-group select, .field-group textarea {
  width: 100%; padding: 8px 10px; border-radius: 6px; border: 1px solid #334155;
  background: #1e293b; color: #e2e8f0; outline: none; font-size: 13px;
}
.field-group input:focus, .field-group select:focus, .field-group textarea:focus { border-color: #3b82f6; }
.field-group textarea {
  resize: vertical;
  min-height: 60px;
}
.field-error {
  font-size: 11px;
  color: #ef4444;
  margin-top: 2px;
}
button[type="submit"] {
  width: 100%; padding: 10px; border-radius: 8px; border: none;
  background: #3b82f6; color: white; font-weight: 600; cursor: pointer; margin-top: 4px;
}
button[type="submit"]:hover { background: #2563eb; }
.output {
  margin-top: 12px;
  padding: 10px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  font-size: 12px;
  color: #94a3b8;
  font-family: monospace;
  white-space: pre-wrap;
}`,
      js: `const schema = [
  { name: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'John Doe' },
  { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'john@example.com' },
  { name: 'role', label: 'Role', type: 'select', options: ['Developer','Designer','Manager','QA'], required: true },
  { name: 'bio', label: 'Short Bio', type: 'textarea', required: false, placeholder: 'Tell us about yourself...' },
];

const form = document.getElementById('dynamic-form');
const output = document.getElementById('form-output');

schema.forEach(field => {
  const group = document.createElement('div');
  group.className = 'field-group';
  const lbl = document.createElement('label');
  lbl.innerHTML = field.label + (field.required ? ' <span class="req">*</span>' : '');
  group.appendChild(lbl);

  let input;
  if (field.type === 'select') {
    input = document.createElement('select');
    input.innerHTML = '<option value="">Select...</option>' + field.options.map(o => '<option value="'+o+'">'+o+'</option>').join('');
  } else if (field.type === 'textarea') {
    input = document.createElement('textarea');
    if (field.placeholder) input.placeholder = field.placeholder;
  } else {
    input = document.createElement('input');
    input.type = field.type;
    if (field.placeholder) input.placeholder = field.placeholder;
  }
  input.name = field.name;
  if (field.required) input.required = true;
  group.appendChild(input);

  const err = document.createElement('div');
  err.className = 'field-error';
  group.appendChild(err);
  form.appendChild(group);
});

const btn = document.createElement('button');
btn.type = 'submit'; btn.textContent = 'Submit';
form.appendChild(btn);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll('.field-group').forEach((g, i) => {
    const input = g.querySelector('input, select, textarea');
    const err = g.querySelector('.field-error');
    if (schema[i] && schema[i].required && !input.value.trim()) {
      err.textContent = schema[i].label + ' is required';
      valid = false;
    } else { err.textContent = ''; }
  });
  if (valid) {
    const data = Object.fromEntries(new FormData(form));
    output.style.display = 'block';
    output.textContent = JSON.stringify(data, null, 2);
  }
});`,
    },
  },

  // Interactive Elements
  {
    id: 'js-modal',
    title: 'Modal Dialog',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create an accessible modal dialog with focus trap, ESC key handling, and backdrop click-to-close using the dialog element or custom implementation.',
    concepts: ['Dialog element', 'Focus trap', 'ARIA', 'Keyboard events'],
    demoCode: {
      html: `<button id="open-btn" class="open-btn">Open Modal</button>
<div id="backdrop" class="backdrop">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <h2 id="modal-title">Confirm Action</h2>
    <p>Are you sure you want to proceed? This action cannot be undone.</p>
    <div class="modal-actions">
      <button id="cancel-btn" class="btn-secondary">Cancel</button>
      <button id="confirm-btn" class="btn-primary">Confirm</button>
    </div>
  </div>
</div>
<div id="status" class="status"></div>`,
      css: `.open-btn {
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  background: #3b82f6;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.open-btn:hover {
  background: #2563eb;
}

.backdrop {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.backdrop.open {
  display: flex;
  animation: fadeIn 0.2s;
}

.modal {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  animation: slideUp 0.3s;
}

.modal h2 {
  margin-bottom: 8px;
  font-size: 20px;
}

.modal p {
  color: #94a3b8;
  margin-bottom: 20px;
  font-size: 14px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-secondary {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #475569;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
}

.btn-primary {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: #ef4444;
  color: white;
  cursor: pointer;
  font-weight: 600;
}

.btn-primary:hover {
  background: #dc2626;
}

.btn-secondary:hover {
  background: #334155;
}

.status {
  margin-top: 16px;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}`,
      js: `const backdrop = document.getElementById('backdrop');
const openBtn = document.getElementById('open-btn');
const cancelBtn = document.getElementById('cancel-btn');
const confirmBtn = document.getElementById('confirm-btn');
const status = document.getElementById('status');

function openModal() {
  backdrop.classList.add('open');
  confirmBtn.focus();
}
function closeModal() {
  backdrop.classList.remove('open');
  openBtn.focus();
}

openBtn.addEventListener('click', openModal);
cancelBtn.addEventListener('click', () => { closeModal(); status.textContent = 'Cancelled'; status.style.background = 'rgba(100,116,139,0.2)'; status.style.color = '#94a3b8'; });
confirmBtn.addEventListener('click', () => { closeModal(); status.textContent = 'Action confirmed!'; status.style.background = 'rgba(34,197,94,0.15)'; status.style.color = '#22c55e'; });
backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && backdrop.classList.contains('open')) closeModal(); });`,
    },
  },
  {
    id: 'js-drag-drop',
    title: 'Drag and Drop',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Implement drag-and-drop functionality for reordering items using the HTML5 Drag and Drop API with visual feedback and touch support.',
    concepts: ['Drag and Drop API', 'DataTransfer', 'Touch events', 'CSS transitions'],
    demoCode: {
      html: `<h3>Drag to Reorder</h3>
<ul id="sortable" class="sortable-list">
  <li draggable="true" class="sortable-item">Build UI components</li>
  <li draggable="true" class="sortable-item">Write unit tests</li>
  <li draggable="true" class="sortable-item">Review pull requests</li>
  <li draggable="true" class="sortable-item">Deploy to staging</li>
  <li draggable="true" class="sortable-item">Update documentation</li>
</ul>`,
      css: `h3 {
  font-size: 16px;
  margin-bottom: 12px;
  color: #e2e8f0;
}
.sortable-list {
  list-style: none;
  padding: 0;
  max-width: 340px;
}
.sortable-item {
  padding: 12px 16px; margin-bottom: 6px; background: #1e293b;
  border: 1px solid #334155; border-radius: 8px; color: #e2e8f0;
  cursor: grab; font-size: 14px; transition: transform 0.15s, box-shadow 0.15s;
  user-select: none;
}
.sortable-item:active { cursor: grabbing; }
.sortable-item.dragging {
  opacity: 0.5; transform: scale(0.98);
  border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59,130,246,0.3);
}
.sortable-item.over {
  border-color: #3b82f6; border-style: dashed;
}`,
      js: `const list = document.getElementById('sortable');
let dragItem = null;

list.addEventListener('dragstart', (e) => {
  dragItem = e.target;
  e.target.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
});

list.addEventListener('dragend', (e) => {
  e.target.classList.remove('dragging');
  list.querySelectorAll('.sortable-item').forEach(i => i.classList.remove('over'));
  dragItem = null;
});

list.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  const target = e.target.closest('.sortable-item');
  if (target && target !== dragItem) {
    list.querySelectorAll('.sortable-item').forEach(i => i.classList.remove('over'));
    target.classList.add('over');
    const rect = target.getBoundingClientRect();
    const mid = rect.top + rect.height / 2;
    if (e.clientY < mid) {
      list.insertBefore(dragItem, target);
    } else {
      list.insertBefore(dragItem, target.nextSibling);
    }
  }
});

list.addEventListener('drop', (e) => {
  e.preventDefault();
  list.querySelectorAll('.sortable-item').forEach(i => i.classList.remove('over'));
});`,
    },
  },
  {
    id: 'js-sortable-table',
    title: 'Sortable Table',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a sortable data table with click-to-sort columns, sort direction indicators, and support for different data types using DOM manipulation.',
    concepts: ['DOM manipulation', 'Event delegation', 'Array sorting', 'ARIA'],
    demoCode: {
      html: `<table class="sortable-table" id="data-table">
  <thead>
    <tr>
      <th data-col="name" class="sortable-col">Name <span class="sort-icon"></span></th>
      <th data-col="role" class="sortable-col">Role <span class="sort-icon"></span></th>
      <th data-col="score" data-type="number" class="sortable-col">Score <span class="sort-icon"></span></th>
    </tr>
  </thead>
  <tbody id="table-body"></tbody>
</table>`,
      css: `.sortable-table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 10px 14px;
  text-align: left;
  font-size: 13px;
}
th {
  background: #1e293b; color: #94a3b8; font-weight: 600; cursor: pointer;
  border-bottom: 2px solid #334155; user-select: none; white-space: nowrap;
}
th:hover { color: #e2e8f0; }
th.asc .sort-icon::after {
  content: ' \\2191';
  color: #3b82f6;
}
th.desc .sort-icon::after {
  content: ' \\2193';
  color: #3b82f6;
}
td {
  color: #e2e8f0;
  border-bottom: 1px solid #1e293b;
}
tr:hover td { background: rgba(59,130,246,0.05); }`,
      js: `const data = [
  { name: 'Alice', role: 'Engineer', score: 92 },
  { name: 'Bob', role: 'Designer', score: 87 },
  { name: 'Carol', role: 'Manager', score: 95 },
  { name: 'Dave', role: 'Engineer', score: 78 },
  { name: 'Eve', role: 'Designer', score: 91 },
];

const tbody = document.getElementById('table-body');
const headers = document.querySelectorAll('.sortable-col');
let sortCol = null, sortDir = 'asc';

function renderTable(rows) {
  tbody.innerHTML = rows.map(r =>
    '<tr><td>'+r.name+'</td><td>'+r.role+'</td><td>'+r.score+'</td></tr>'
  ).join('');
}

function sortData(col, type) {
  return [...data].sort((a, b) => {
    let va = a[col], vb = b[col];
    if (type === 'number') return sortDir === 'asc' ? va - vb : vb - va;
    va = String(va).toLowerCase(); vb = String(vb).toLowerCase();
    if (va < vb) return sortDir === 'asc' ? -1 : 1;
    if (va > vb) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });
}

headers.forEach(th => {
  th.addEventListener('click', () => {
    const col = th.dataset.col;
    if (sortCol === col) { sortDir = sortDir === 'asc' ? 'desc' : 'asc'; }
    else {
      sortCol = col;
      sortDir = 'asc';
    }
    headers.forEach(h => h.classList.remove('asc','desc'));
    th.classList.add(sortDir);
    renderTable(sortData(col, th.dataset.type));
  });
});

renderTable(data);`,
    },
  },
  {
    id: 'js-tabs',
    title: 'Tab Panel',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create an accessible tab panel with ARIA roles, keyboard navigation (arrow keys), and smooth panel transitions using vanilla JavaScript.',
    concepts: ['ARIA roles', 'Keyboard navigation', 'Event delegation', 'CSS transitions'],
    demoCode: {
      html: `<div class="tabs" role="tablist" aria-label="Settings">
  <button class="tab active" role="tab" aria-selected="true" aria-controls="panel-general" id="tab-general">General</button>
  <button class="tab" role="tab" aria-selected="false" aria-controls="panel-profile" id="tab-profile">Profile</button>
  <button class="tab" role="tab" aria-selected="false" aria-controls="panel-notifications" id="tab-notifications">Alerts</button>
</div>
<div class="tab-panel active" id="panel-general" role="tabpanel" aria-labelledby="tab-general">
  <h4>General Settings</h4>
  <p>Configure your general application preferences here. Adjust language, timezone, and display options.</p>
</div>
<div class="tab-panel" id="panel-profile" role="tabpanel" aria-labelledby="tab-profile">
  <h4>Profile Settings</h4>
  <p>Manage your personal information, avatar, and account details.</p>
</div>
<div class="tab-panel" id="panel-notifications" role="tabpanel" aria-labelledby="tab-notifications">
  <h4>Alert Preferences</h4>
  <p>Choose which notifications you want to receive via email and push notifications.</p>
</div>`,
      css: `.tabs {
  display: flex;
  gap: 4px;
  border-bottom: 2px solid #1e293b;
  padding-bottom: 0;
}
.tab {
  padding: 10px 20px; background: transparent; border: none; color: #94a3b8;
  font-size: 14px; font-weight: 500; cursor: pointer; border-bottom: 2px solid transparent;
  margin-bottom: -2px; transition: color 0.2s, border-color 0.2s; outline: none;
}
.tab:hover { color: #e2e8f0; }
.tab.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
}
.tab:focus-visible {
  box-shadow: 0 0 0 2px rgba(59,130,246,0.4);
  border-radius: 4px 4px 0 0;
}
.tab-panel {
  display: none;
  padding: 20px 4px;
  animation: fadeTab 0.3s;
}
.tab-panel.active {
  display: block;
}
.tab-panel h4 {
  font-size: 16px;
  color: #e2e8f0;
  margin-bottom: 8px;
}
.tab-panel p {
  font-size: 14px;
  color: #94a3b8;
  line-height: 1.6;
}
@keyframes fadeTab { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }`,
      js: `const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');

function activate(tab) {
  tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); t.tabIndex = -1; });
  panels.forEach(p => p.classList.remove('active'));
  tab.classList.add('active');
  tab.setAttribute('aria-selected','true');
  tab.tabIndex = 0;
  document.getElementById(tab.getAttribute('aria-controls')).classList.add('active');
}

tabs.forEach(tab => tab.addEventListener('click', () => activate(tab)));

document.querySelector('.tabs').addEventListener('keydown', (e) => {
  const idx = Array.from(tabs).indexOf(document.activeElement);
  if (idx < 0) return;
  let newIdx = idx;
  if (e.key === 'ArrowRight') newIdx = (idx + 1) % tabs.length;
  else if (e.key === 'ArrowLeft') newIdx = (idx - 1 + tabs.length) % tabs.length;
  else if (e.key === 'Home') newIdx = 0;
  else if (e.key === 'End') newIdx = tabs.length - 1;
  else return;
  e.preventDefault();
  activate(tabs[newIdx]);
  tabs[newIdx].focus();
});`,
    },
  },
  {
    id: 'js-accordion',
    title: 'Accordion',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build an accordion component with expand/collapse animation, single or multi-panel modes, and keyboard accessibility using details/summary or custom implementation.',
    concepts: ['Details element', 'CSS transitions', 'ARIA', 'Event delegation'],
    demoCode: {
      html: `<div class="accordion" id="accordion">
  <div class="accordion-item">
    <button class="accordion-header" aria-expanded="false">What is vanilla JavaScript?<span class="icon">+</span></button>
    <div class="accordion-body"><p>Vanilla JavaScript refers to using plain JavaScript without any libraries or frameworks. It provides full control over the DOM and browser APIs.</p></div>
  </div>
  <div class="accordion-item">
    <button class="accordion-header" aria-expanded="false">Why learn native DOM APIs?<span class="icon">+</span></button>
    <div class="accordion-body"><p>Understanding native DOM APIs helps you write more efficient code and gives you a deeper understanding of how frameworks work under the hood.</p></div>
  </div>
  <div class="accordion-item">
    <button class="accordion-header" aria-expanded="false">Is vanilla JS suitable for production?<span class="icon">+</span></button>
    <div class="accordion-body"><p>Absolutely! Many production sites use vanilla JS for performance-critical sections. It has zero dependencies and the smallest possible bundle size.</p></div>
  </div>
</div>`,
      css: `.accordion {
  max-width: 400px;
}
.accordion-item {
  border: 1px solid #334155;
  border-radius: 8px;
  margin-bottom: 6px;
  overflow: hidden;
}
.accordion-header {
  width: 100%; display: flex; justify-content: space-between; align-items: center;
  padding: 14px 16px; background: #1e293b; border: none; color: #e2e8f0;
  font-size: 14px; font-weight: 500; cursor: pointer; text-align: left; outline: none;
  transition: background 0.2s;
}
.accordion-header:hover { background: #334155; }
.accordion-header:focus-visible { box-shadow: inset 0 0 0 2px #3b82f6; }
.accordion-header .icon {
  font-size: 18px;
  transition: transform 0.3s;
  color: #64748b;
}
.accordion-header[aria-expanded="true"] .icon { transform: rotate(45deg); color: #3b82f6; }
.accordion-body {
  max-height: 0; overflow: hidden; transition: max-height 0.35s ease;
  background: rgba(30,41,59,0.5);
}
.accordion-body p {
  padding: 0 16px 14px;
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.6;
  margin: 0;
}
.accordion-body.open {
  max-height: 200px;
  padding-top: 10px;
}`,
      js: `const headers = document.querySelectorAll('.accordion-header');

headers.forEach(header => {
  header.addEventListener('click', () => {
    const body = header.nextElementSibling;
    const isOpen = header.getAttribute('aria-expanded') === 'true';

    // Close all others (single mode)
    headers.forEach(h => {
      h.setAttribute('aria-expanded', 'false');
      h.nextElementSibling.classList.remove('open');
    });

    if (!isOpen) {
      header.setAttribute('aria-expanded', 'true');
      body.classList.add('open');
    }
  });

  header.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); header.click(); }
  });
});`,
    },
  },
  {
    id: 'js-carousel',
    title: 'Image Carousel',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create an image carousel with touch swipe support, keyboard navigation, auto-play, and thumbnail navigation using CSS transforms and touch events.',
    concepts: ['Touch events', 'CSS transforms', 'Intersection Observer', 'Keyboard events'],
    demoCode: {
      html: `<div class="carousel-wrapper">
  <div class="carousel-viewport" id="viewport">
    <div class="carousel-track" id="track">
      <div class="slide" style="background:#1e3a5f">Slide 1</div>
      <div class="slide" style="background:#3b1f5e">Slide 2</div>
      <div class="slide" style="background:#1f4a3b">Slide 3</div>
      <div class="slide" style="background:#5e3b1f">Slide 4</div>
    </div>
  </div>
  <div class="carousel-controls">
    <button id="prev-btn" class="nav-btn">&larr;</button>
    <div class="dots" id="dots"></div>
    <button id="next-btn" class="nav-btn">&rarr;</button>
  </div>
</div>`,
      css: `.carousel-wrapper { max-width: 380px; }
.carousel-viewport {
  overflow: hidden;
  border-radius: 12px;
}
.carousel-track {
  display: flex;
  transition: transform 0.4s ease;
}
.slide {
  min-width: 100%; height: 180px; display: flex; align-items: center; justify-content: center;
  font-size: 24px; font-weight: 700; color: #e2e8f0; user-select: none;
}
.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 12px;
}
.nav-btn {
  width: 36px; height: 36px; border-radius: 50%; border: 1px solid #475569;
  background: #1e293b; color: #e2e8f0; cursor: pointer; font-size: 16px;
  display: flex; align-items: center; justify-content: center;
}
.nav-btn:hover {
  background: #334155;
  border-color: #3b82f6;
}
.dots {
  display: flex;
  gap: 8px;
}
.dot {
  width: 10px; height: 10px; border-radius: 50%; background: #475569;
  cursor: pointer; transition: background 0.2s;
}
.dot.active { background: #3b82f6; }`,
      js: `const track = document.getElementById('track');
const slides = track.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots');
let current = 0, startX = 0, isDragging = false;

slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});

function goTo(idx) {
  current = Math.max(0, Math.min(idx, slides.length - 1));
  track.style.transform = 'translateX(-' + (current * 100) + '%)';
  dotsContainer.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
}

document.getElementById('prev-btn').addEventListener('click', () => goTo(current - 1));
document.getElementById('next-btn').addEventListener('click', () => goTo(current + 1));

track.addEventListener('pointerdown', (e) => { isDragging = true; startX = e.clientX; track.style.transition = 'none'; });
track.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  const diff = e.clientX - startX;
  track.style.transform = 'translateX(calc(-' + (current * 100) + '% + ' + diff + 'px))';
});
track.addEventListener('pointerup', (e) => {
  if (!isDragging) return;
  isDragging = false;
  track.style.transition = 'transform 0.4s ease';
  const diff = e.clientX - startX;
  if (diff < -50) goTo(current + 1);
  else if (diff > 50) goTo(current - 1);
  else goTo(current);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') goTo(current - 1);
  if (e.key === 'ArrowRight') goTo(current + 1);
});`,
    },
  },
  {
    id: 'js-context-menu',
    title: 'Context Menu',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Implement a custom right-click context menu with nested submenus, keyboard navigation, and proper positioning using contextmenu event and event delegation.',
    concepts: ['Context menu event', 'Event delegation', 'Positioning', 'Keyboard navigation'],
    demoCode: {
      html: `<div class="context-area" id="context-area">
  <p>Right-click anywhere in this area to open the context menu</p>
</div>
<div class="context-menu" id="context-menu" style="display:none">
  <button class="menu-item" data-action="copy">&#128203; Copy</button>
  <button class="menu-item" data-action="paste">&#128196; Paste</button>
  <button class="menu-item" data-action="cut">&#9986; Cut</button>
  <div class="menu-divider"></div>
  <button class="menu-item" data-action="select">&#9744; Select All</button>
  <button class="menu-item" data-action="delete" style="color:#ef4444">&#128465; Delete</button>
</div>
<div id="action-log" class="action-log"></div>`,
      css: `.context-area {
  height: 180px; display: flex; align-items: center; justify-content: center;
  background: #1e293b; border: 2px dashed #334155; border-radius: 12px;
  color: #64748b; font-size: 14px; user-select: none;
}
.context-menu {
  position: fixed; min-width: 180px; padding: 6px;
  background: #1e293b; border: 1px solid #334155; border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4); z-index: 100;
}
.menu-item {
  display: block; width: 100%; padding: 8px 12px; text-align: left;
  background: none; border: none; color: #e2e8f0; font-size: 13px;
  cursor: pointer; border-radius: 6px;
}
.menu-item:hover { background: #334155; }
.menu-item:focus {
  outline: none;
  background: #334155;
}
.menu-divider {
  height: 1px;
  background: #334155;
  margin: 4px 0;
}
.action-log {
  margin-top: 12px;
  font-size: 13px;
  color: #94a3b8;
  text-align: center;
}`,
      js: `const area = document.getElementById('context-area');
const menu = document.getElementById('context-menu');
const log = document.getElementById('action-log');

area.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  menu.style.display = 'block';
  const x = Math.min(e.clientX, window.innerWidth - 200);
  const y = Math.min(e.clientY, window.innerHeight - 200);
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
  menu.querySelector('.menu-item').focus();
});

document.addEventListener('click', () => { menu.style.display = 'none'; });

menu.addEventListener('click', (e) => {
  const item = e.target.closest('.menu-item');
  if (item) {
    const action = item.dataset.action;
    log.textContent = 'Action: ' + action.charAt(0).toUpperCase() + action.slice(1);
    menu.style.display = 'none';
  }
});

menu.addEventListener('keydown', (e) => {
  const items = menu.querySelectorAll('.menu-item');
  const idx = Array.from(items).indexOf(document.activeElement);
  if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length].focus(); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); items[(idx - 1 + items.length) % items.length].focus(); }
  else if (e.key === 'Escape') { menu.style.display = 'none'; area.focus(); }
});`,
    },
  },
  {
    id: 'js-infinite-scroll',
    title: 'Infinite Scroll',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build infinite scroll functionality that loads more content as users scroll using IntersectionObserver and Fetch API with loading states.',
    concepts: ['IntersectionObserver', 'Fetch API', 'DOM manipulation', 'Loading states'],
    demoCode: {
      html: `<div class="scroll-container" id="scroll-container">
  <div id="items"></div>
  <div id="sentinel" class="sentinel">
    <div class="loader" id="loader">Loading...</div>
  </div>
</div>`,
      css: `.scroll-container { max-height: 320px; overflow-y: auto; border-radius: 10px; border: 1px solid #334155; }
.scroll-item {
  padding: 14px 16px; border-bottom: 1px solid #1e293b; font-size: 14px; color: #e2e8f0;
  display: flex; justify-content: space-between; align-items: center;
}
.scroll-item:hover { background: rgba(59,130,246,0.05); }
.scroll-item .id {
  color: #64748b;
  font-size: 12px;
  font-family: monospace;
}
.sentinel {
  padding: 16px;
  text-align: center;
}
.loader {
  color: #3b82f6;
  font-size: 13px;
}
.loader.done { color: #64748b; }`,
      js: `const container = document.getElementById('scroll-container');
const itemsEl = document.getElementById('items');
const sentinel = document.getElementById('sentinel');
const loader = document.getElementById('loader');
let page = 0, loading = false, maxPages = 5;

function generateItems(page) {
  const items = [];
  for (let i = 0; i < 8; i++) {
    const id = page * 8 + i + 1;
    items.push({ id, text: 'Item entry #' + id });
  }
  return items;
}

function loadMore() {
  if (loading || page >= maxPages) return;
  loading = true;
  loader.textContent = 'Loading...';

  setTimeout(() => {
    const items = generateItems(page);
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'scroll-item';
      div.innerHTML = '<span>' + item.text + '</span><span class="id">#' + item.id + '</span>';
      itemsEl.appendChild(div);
    });
    page++;
    loading = false;
    if (page >= maxPages) {
      loader.textContent = 'All items loaded';
      loader.classList.add('done');
      observer.disconnect();
    }
  }, 600);
}

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) loadMore();
}, { root: container, threshold: 0.1 });

observer.observe(sentinel);
loadMore();`,
    },
  },
  {
    id: 'js-toast-notifications',
    title: 'Toast Notifications',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create a toast notification system with auto-dismiss, action buttons, and stacking behavior using CSS transitions and DOM manipulation.',
    concepts: ['CSS transitions', 'DOM manipulation', 'Timers', 'Event delegation'],
    demoCode: {
      html: `<div class="toast-demo">
  <div class="btn-group">
    <button class="toast-btn" data-type="success">Success Toast</button>
    <button class="toast-btn" data-type="error">Error Toast</button>
    <button class="toast-btn" data-type="info">Info Toast</button>
  </div>
  <div class="toast-container" id="toast-container"></div>
</div>`,
      css: `.toast-demo { position: relative; min-height: 220px; }
.btn-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.toast-btn {
  padding: 10px 16px; border-radius: 8px; border: 1px solid #475569;
  background: #1e293b; color: #e2e8f0; cursor: pointer; font-size: 13px;
}
.toast-btn:hover { background: #334155; }
.toast-container {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
}
.toast {
  display: flex; align-items: center; gap: 10px; padding: 12px 16px; min-width: 240px;
  border-radius: 8px; font-size: 13px; color: #e2e8f0;
  transform: translateX(120%); transition: transform 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
.toast.show { transform: translateX(0); }
.toast.success {
  background: #1a3a2a;
  border: 1px solid #22c55e;
}
.toast.error {
  background: #3a1a1a;
  border: 1px solid #ef4444;
}
.toast.info {
  background: #1a2a3a;
  border: 1px solid #3b82f6;
}
.toast .close-toast {
  margin-left: auto; background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 16px;
}`,
      js: `const container = document.getElementById('toast-container');
const messages = {
  success: 'Operation completed successfully!',
  error: 'Something went wrong. Please try again.',
  info: 'Here is some helpful information.',
};

function showToast(type) {
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.innerHTML = '<span>' + messages[type] + '</span><button class="close-toast">&times;</button>';
  container.appendChild(toast);

  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));

  const dismiss = () => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  };

  toast.querySelector('.close-toast').addEventListener('click', dismiss);
  setTimeout(dismiss, 3000);
}

document.querySelectorAll('.toast-btn').forEach(btn => {
  btn.addEventListener('click', () => showToast(btn.dataset.type));
});`,
    },
  },
  {
    id: 'js-wizard',
    title: 'Multi-Step Wizard',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a multi-step form wizard with navigation, validation per step, progress indicator, and browser history integration using history.pushState.',
    concepts: ['History API', 'Form validation', 'State management', 'Progress tracking'],
    demoCode: {
      html: `<div class="wizard">
  <div class="progress-bar">
    <div class="progress-fill" id="progress-fill"></div>
  </div>
  <div class="steps-indicator" id="steps-indicator"></div>
  <div class="step active" id="step-0">
    <h4>Step 1: Personal Info</h4>
    <input type="text" id="name-input" placeholder="Full Name" />
  </div>
  <div class="step" id="step-1">
    <h4>Step 2: Contact</h4>
    <input type="email" id="email-input" placeholder="Email Address" />
  </div>
  <div class="step" id="step-2">
    <h4>Step 3: Confirm</h4>
    <div id="summary" class="summary"></div>
  </div>
  <div class="wizard-actions">
    <button id="prev-btn" class="btn-secondary" disabled>Back</button>
    <button id="next-btn" class="btn-primary">Next</button>
  </div>
  <p class="error-msg" id="error-msg"></p>
</div>`,
      css: `.wizard { max-width: 360px; }
.progress-bar {
  height: 4px;
  background: #334155;
  border-radius: 2px;
  margin-bottom: 12px;
}
.progress-fill {
  height: 100%;
  background: #3b82f6;
  border-radius: 2px;
  width: 33%;
  transition: width 0.3s;
}
.steps-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.step-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #64748b;
  transition: all 0.2s;
}
.step-dot.active {
  border-color: #3b82f6;
  color: #3b82f6;
  background: rgba(59,130,246,0.1);
}
.step-dot.done {
  border-color: #22c55e;
  background: #22c55e;
  color: white;
}
.step { display: none; }
.step.active {
  display: block;
  animation: fadeIn 0.3s;
}
.step h4 {
  font-size: 16px;
  color: #e2e8f0;
  margin-bottom: 12px;
}
.step input {
  width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155;
  background: #1e293b; color: #e2e8f0; outline: none; font-size: 14px;
}
.step input:focus {
  border-color: #3b82f6;
}
.summary {
  padding: 12px;
  background: #1e293b;
  border-radius: 8px;
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.8;
}
.wizard-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.btn-primary {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #3b82f6;
  color: white;
  font-weight: 600;
  cursor: pointer;
}
.btn-primary:hover { background: #2563eb; }
.btn-secondary {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #475569;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
}
.btn-secondary:hover { background: #334155; }
.btn-secondary:disabled {
  opacity: 0.4;
  cursor: default;
}
.error-msg {
  color: #ef4444;
  font-size: 12px;
  margin-top: 6px;
  min-height: 18px;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`,
      js: `const steps = document.querySelectorAll('.step');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressFill = document.getElementById('progress-fill');
const indicator = document.getElementById('steps-indicator');
const errorMsg = document.getElementById('error-msg');
let current = 0;

steps.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'step-dot' + (i === 0 ? ' active' : '');
  dot.textContent = i + 1;
  indicator.appendChild(dot);
});

function goToStep(idx) {
  steps.forEach(s => s.classList.remove('active'));
  steps[idx].classList.add('active');
  current = idx;
  prevBtn.disabled = idx === 0;
  nextBtn.textContent = idx === steps.length - 1 ? 'Finish' : 'Next';
  progressFill.style.width = ((idx + 1) / steps.length * 100) + '%';
  const dots = indicator.querySelectorAll('.step-dot');
  dots.forEach((d, i) => { d.className = 'step-dot'; if (i < idx) d.classList.add('done'); if (i === idx) d.classList.add('active'); });
  errorMsg.textContent = '';
  if (idx === 2) {
    const name = document.getElementById('name-input').value || '(empty)';
    const email = document.getElementById('email-input').value || '(empty)';
    document.getElementById('summary').innerHTML = 'Name: <strong>' + name + '</strong><br>Email: <strong>' + email + '</strong>';
  }
}

nextBtn.addEventListener('click', () => {
  errorMsg.textContent = '';
  if (current === 0 && !document.getElementById('name-input').value.trim()) { errorMsg.textContent = 'Name is required'; return; }
  if (current === 1 && !document.getElementById('email-input').value.trim()) { errorMsg.textContent = 'Email is required'; return; }
  if (current === steps.length - 1) { nextBtn.textContent = 'Done!'; nextBtn.disabled = true; return; }
  goToStep(current + 1);
});
prevBtn.addEventListener('click', () => { if (current > 0) goToStep(current - 1); });`,
    },
  },

  // Data Display
  {
    id: 'js-search-filter',
    title: 'Search & Filter',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Implement real-time search and filtering of data with debounced input, highlight matching text, and category filters using event delegation.',
    concepts: ['Debouncing', 'Regular expressions', 'DOM manipulation', 'Event delegation'],
    demoCode: {
      html: `<div class="search-filter">
  <input type="text" id="search-input" placeholder="Search items..." />
  <div class="filter-tags">
    <button class="tag active" data-cat="all">All</button>
    <button class="tag" data-cat="fruit">Fruit</button>
    <button class="tag" data-cat="veggie">Veggie</button>
  </div>
  <ul id="results" class="results"></ul>
  <p id="no-results" class="no-results" style="display:none">No items found</p>
</div>`,
      css: `.search-filter { max-width: 340px; }
input {
  width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155;
  background: #1e293b; color: #e2e8f0; outline: none; font-size: 14px; margin-bottom: 10px;
}
input:focus {
  border-color: #3b82f6;
}
.filter-tags {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}
.tag {
  padding: 5px 14px; border-radius: 20px; border: 1px solid #475569;
  background: transparent; color: #94a3b8; cursor: pointer; font-size: 12px;
}
.tag:hover {
  border-color: #3b82f6;
  color: #e2e8f0;
}
.tag.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}
.results {
  list-style: none;
  padding: 0;
}
.results li {
  padding: 10px 12px; border-bottom: 1px solid #1e293b; font-size: 14px; color: #e2e8f0;
  display: flex; justify-content: space-between;
}
.results li .cat {
  font-size: 11px;
  color: #64748b;
  text-transform: uppercase;
}
.results li mark {
  background: #3b82f6;
  color: white;
  border-radius: 2px;
  padding: 0 2px;
}
.no-results {
  text-align: center;
  color: #64748b;
  font-size: 14px;
}`,
      js: `const items = [
  { name: 'Apple', cat: 'fruit' }, { name: 'Banana', cat: 'fruit' },
  { name: 'Carrot', cat: 'veggie' }, { name: 'Cherry', cat: 'fruit' },
  { name: 'Broccoli', cat: 'veggie' }, { name: 'Grape', cat: 'fruit' },
  { name: 'Spinach', cat: 'veggie' }, { name: 'Mango', cat: 'fruit' },
];

const input = document.getElementById('search-input');
const results = document.getElementById('results');
const noResults = document.getElementById('no-results');
const tags = document.querySelectorAll('.tag');
let activeCat = 'all', debounceTimer;

function render() {
  const query = input.value.trim().toLowerCase();
  let filtered = items.filter(i => activeCat === 'all' || i.cat === activeCat);
  if (query) filtered = filtered.filter(i => i.name.toLowerCase().includes(query));
  results.innerHTML = '';
  if (!filtered.length) { noResults.style.display = 'block'; return; }
  noResults.style.display = 'none';
  filtered.forEach(item => {
    const li = document.createElement('li');
    let name = item.name;
    if (query) {
      const regex = new RegExp('(' + query.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&') + ')', 'gi');
      name = name.replace(regex, '<mark>$1</mark>');
    }
    li.innerHTML = '<span>' + name + '</span><span class="cat">' + item.cat + '</span>';
    results.appendChild(li);
  });
}

input.addEventListener('input', () => { clearTimeout(debounceTimer); debounceTimer = setTimeout(render, 200); });
tags.forEach(tag => tag.addEventListener('click', () => {
  tags.forEach(t => t.classList.remove('active'));
  tag.classList.add('active');
  activeCat = tag.dataset.cat;
  render();
}));
render();`,
    },
  },
  {
    id: 'js-gallery',
    title: 'Image Gallery with Lightbox',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create an image gallery with lightbox viewer, thumbnail grid, keyboard navigation, and zoom functionality using dialog element and CSS transforms.',
    concepts: ['Dialog element', 'CSS transforms', 'Keyboard navigation', 'Image loading'],
    demoCode: {
      html: `<div class="gallery-grid" id="gallery"></div>
<div class="lightbox" id="lightbox" style="display:none">
  <button class="lb-close" id="lb-close">&times;</button>
  <button class="lb-nav lb-prev" id="lb-prev">&larr;</button>
  <div class="lb-content" id="lb-content"></div>
  <button class="lb-nav lb-next" id="lb-next">&rarr;</button>
  <div class="lb-caption" id="lb-caption"></div>
</div>`,
      css: `.gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.gallery-thumb {
  aspect-ratio: 1; border-radius: 8px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; font-weight: 700; color: white; transition: transform 0.2s;
}
.gallery-thumb:hover { transform: scale(1.05); }
.lightbox {
  position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center; z-index: 100;
}
.lb-close { position: absolute; top: 16px; right: 16px; background: none; border: none; color: white; font-size: 28px; cursor: pointer; z-index: 10; }
.lb-nav { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.1); border: none; color: white; font-size: 24px; padding: 12px 16px; cursor: pointer; border-radius: 8px; }
.lb-nav:hover { background: rgba(255,255,255,0.2); }
.lb-prev { left: 16px; }
.lb-next { right: 16px; }
.lb-content { width: 280px; height: 280px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 64px; font-weight: 700; color: white; }
.lb-caption { position: absolute; bottom: 24px; text-align: center; width: 100%; color: #94a3b8; font-size: 14px; }`,
      js: `const images = [{bg:'#1e3a5f',label:'Ocean',letter:'A'},{bg:'#3b1f5e',label:'Cosmos',letter:'B'},{bg:'#1f4a3b',label:'Forest',letter:'C'},{bg:'#5e3b1f',label:'Desert',letter:'D'},{bg:'#1f3b5e',label:'Mountain',letter:'E'},{bg:'#4a1f3b',label:'Sunset',letter:'F'}];
const gallery=document.getElementById('gallery'),lightbox=document.getElementById('lightbox'),lbContent=document.getElementById('lb-content'),lbCaption=document.getElementById('lb-caption');
let ci=0;
images.forEach((img,i)=>{const d=document.createElement('div');d.className='gallery-thumb';d.style.background=img.bg;d.textContent=img.letter;d.addEventListener('click',()=>{ci=i;upd();lightbox.style.display='flex';});gallery.appendChild(d);});
function upd(){const img=images[ci];lbContent.style.background=img.bg;lbContent.textContent=img.letter;lbCaption.textContent=img.label+' ('+(ci+1)+'/'+images.length+')';}
document.getElementById('lb-close').addEventListener('click',()=>lightbox.style.display='none');
document.getElementById('lb-prev').addEventListener('click',()=>{ci=(ci-1+images.length)%images.length;upd();});
document.getElementById('lb-next').addEventListener('click',()=>{ci=(ci+1)%images.length;upd();});
lightbox.addEventListener('click',(e)=>{if(e.target===lightbox)lightbox.style.display='none';});
document.addEventListener('keydown',(e)=>{if(lightbox.style.display==='none')return;if(e.key==='Escape')lightbox.style.display='none';if(e.key==='ArrowLeft'){ci=(ci-1+images.length)%images.length;upd();}if(e.key==='ArrowRight'){ci=(ci+1)%images.length;upd();}});`,
    },
  },
  {
    id: 'js-cards-grid',
    title: 'Responsive Card Grid',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build a responsive card grid layout using CSS Grid and template literals to generate cards from data with hover effects and loading states.',
    concepts: ['CSS Grid', 'Template literals', 'DOM manipulation', 'Responsive design'],
    demoCode: {
      html: `<div class="card-grid" id="card-grid"></div>`,
      css: `.card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
.card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 16px; transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
.card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); border-color: #3b82f6; }
.card-icon { font-size: 32px; margin-bottom: 10px; }
.card-title { font-size: 14px; font-weight: 600; color: #e2e8f0; margin-bottom: 4px; }
.card-desc { font-size: 12px; color: #94a3b8; line-height: 1.5; }
.card-tag { display: inline-block; margin-top: 10px; padding: 2px 8px; border-radius: 12px; font-size: 10px; font-weight: 600; text-transform: uppercase; }
.tag-blue { background: rgba(59,130,246,0.15); color: #3b82f6; }
.tag-green { background: rgba(34,197,94,0.15); color: #22c55e; }
.tag-orange { background: rgba(249,115,22,0.15); color: #f97316; }`,
      js: `const cards=[{icon:'&#9889;',title:'Performance',desc:'Optimize load times',tag:'Core',tc:'tag-blue'},{icon:'&#128274;',title:'Security',desc:'Protect against threats',tag:'Critical',tc:'tag-orange'},{icon:'&#9834;',title:'Accessibility',desc:'Build inclusive UIs',tag:'UX',tc:'tag-green'},{icon:'&#128295;',title:'Testing',desc:'Write reliable tests',tag:'Core',tc:'tag-blue'},{icon:'&#127912;',title:'Design System',desc:'Consistent components',tag:'UX',tc:'tag-green'},{icon:'&#128640;',title:'Deployment',desc:'Automate CI/CD',tag:'DevOps',tc:'tag-orange'}];
const grid=document.getElementById('card-grid');
cards.forEach(c=>{const d=document.createElement('div');d.className='card';d.innerHTML='<div class="card-icon">'+c.icon+'</div><div class="card-title">'+c.title+'</div><div class="card-desc">'+c.desc+'</div><span class="card-tag '+c.tc+'">'+c.tag+'</span>';grid.appendChild(d);});`,
    },
  },
  {
    id: 'js-table-sort-filter',
    title: 'Advanced Data Table',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Build a feature-rich data table with sorting, filtering, pagination, column visibility, and export functionality using vanilla JavaScript.',
    concepts: ['DOM manipulation', 'Event delegation', 'Array methods', 'CSV export'],
    demoCode: {
      html: `<div class="tc"><input type="text" id="tf" placeholder="Filter..." /><button id="te" class="tb">Export CSV</button></div>
<table class="at"><thead><tr><th data-col="name" class="sc">Name</th><th data-col="dept" class="sc">Dept</th><th data-col="salary" data-type="number" class="sc">Salary</th></tr></thead><tbody id="tb"></tbody></table>
<div class="tf"><span id="trc"></span><div id="tp"></div></div>`,
      css: `
.tc {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}
.tc input {
  flex: 1;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
  font-size: 13px;
}
.tc input:focus {
  border-color: #3b82f6;
}
.tb {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #475569;
  background: #1e293b;
  color: #94a3b8;
  cursor: pointer;
  font-size: 12px;
}
.tb:hover {
  background: #334155;
}
.at {
  width: 100%;
  border-collapse: collapse;
}
.at th {
  background: #1e293b;
  color: #94a3b8;
  font-size: 12px;
  padding: 8px;
  cursor: pointer;
  text-align: left;
  border-bottom: 2px solid #334155;
  user-select: none;
}
.at th:hover {
  color: #e2e8f0;
}
.at th.asc::after {
  content: " \u2191";
  color: #3b82f6;
}
.at th.desc::after {
  content: " \u2193";
  color: #3b82f6;
}
.at td {
  padding: 8px;
  font-size: 13px;
  color: #e2e8f0;
  border-bottom: 1px solid #1e293b;
}
.at tr:hover td {
  background: rgba(59, 130, 246, 0.05);
}
.tf {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: #64748b;
}
#tp {
  display: flex;
  gap: 4px;
}
.pg {
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid #334155;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  font-size: 12px;
}
.pg:hover,
.pg.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}
      `,
      js: `const data=[{name:'Alice',dept:'Eng',salary:95000},{name:'Bob',dept:'Design',salary:82000},{name:'Carol',dept:'Marketing',salary:78000},{name:'Dave',dept:'Eng',salary:105000},{name:'Eve',dept:'Design',salary:88000},{name:'Frank',dept:'Marketing',salary:72000},{name:'Grace',dept:'Eng',salary:98000}];
const tb=document.getElementById('tb'),fi=document.getElementById('tf'),rc=document.getElementById('trc'),pp=document.getElementById('tp');
let sc=null,sd='asc',fv='',pg=0,ps=4;
function gr(){let r=[...data];if(fv)r=r.filter(x=>x.name.toLowerCase().includes(fv));if(sc)r.sort((a,b)=>{let va=a[sc],vb=b[sc];if(typeof va==='number')return sd==='asc'?va-vb:vb-va;return sd==='asc'?String(va).localeCompare(String(vb)):String(vb).localeCompare(String(va));});return r;}
function render(){const rows=gr(),tp=Math.ceil(rows.length/ps);pg=Math.min(pg,Math.max(0,tp-1));tb.innerHTML=rows.slice(pg*ps,(pg+1)*ps).map(r=>'<tr><td>'+r.name+'</td><td>'+r.dept+'</td><td>$'+r.salary.toLocaleString()+'</td></tr>').join('');rc.textContent=rows.length+' of '+data.length;pp.innerHTML='';for(let i=0;i<tp;i++){const b=document.createElement('button');b.className='pg'+(i===pg?' active':'');b.textContent=i+1;b.addEventListener('click',()=>{pg=i;render();});pp.appendChild(b);}}
document.querySelectorAll('.sc').forEach(th=>th.addEventListener('click',()=>{const c=th.dataset.col;if(sc===c)sd=sd==='asc'?'desc':'asc';else{sc=c;sd='asc';}document.querySelectorAll('.sc').forEach(h=>h.classList.remove('asc','desc'));th.classList.add(sd);render();}));
fi.addEventListener('input',()=>{fv=fi.value.toLowerCase();pg=0;render();});
document.getElementById('te').addEventListener('click',()=>{const csv='Name,Dept,Salary\n'+gr().map(r=>r.name+','+r.dept+','+r.salary).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='data.csv';a.click();});
render();`,
    },
  },
  {
    id: 'js-lazy-images',
    title: 'Lazy Image Loading',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Implement lazy loading for images using IntersectionObserver with placeholder images and fade-in effects on load.',
    concepts: [
      'IntersectionObserver',
      'Image loading',
      'CSS transitions',
      'Performance optimization',
    ],
    demoCode: {
      html: `<div class="lazy-grid" id="lazy-grid"></div>`,
      css: `
.lazy-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.lazy-item {
  aspect-ratio: 4/3;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  background: #1e293b;
  border: 1px solid #334155;
}
.lazy-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(110deg, #1e293b 30%, #334155 50%, #1e293b 70%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  color: #475569;
  font-size: 12px;
}
.lazy-img {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 700;
  color: white;
  opacity: 0;
  transition: opacity 0.5s;
}
.lazy-img.loaded {
  opacity: 1;
}
@keyframes shimmer {
  to {
    background-position: -200% 0;
  }
}
      `,
      js: `const colors=['#1e3a5f','#3b1f5e','#1f4a3b','#5e3b1f','#1f3b5e','#4a1f3b','#2d3a1f','#3a1f2d'];
const grid=document.getElementById('lazy-grid');
colors.forEach((c,i)=>{const item=document.createElement('div');item.className='lazy-item';item.innerHTML='<div class="lazy-placeholder">Loading...</div><div class="lazy-img" style="background:'+c+'">'+(i+1)+'</div>';grid.appendChild(item);});
const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){const img=entry.target.querySelector('.lazy-img');setTimeout(()=>{img.classList.add('loaded');const p=entry.target.querySelector('.lazy-placeholder');if(p)p.remove();},300+Math.random()*700);observer.unobserve(entry.target);}});},{threshold:0.1});
document.querySelectorAll('.lazy-item').forEach(item=>observer.observe(item));`,
    },
  },
  {
    id: 'js-data-chart',
    title: 'Canvas Data Charts',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create interactive data visualizations using Canvas API with tooltips, animations, and responsive sizing for charts like bar, line, and pie.',
    concepts: ['Canvas API', 'Animation', 'Mouse events', 'Responsive canvas'],
    demoCode: {
      html: `
<div class="cw">
  <h4>Monthly Revenue</h4>
  <canvas id="chart" width="360" height="200"></canvas>
  <div class="ct" id="tooltip" style="display: none"></div>
</div>
      `,
      css: `
.cw {
  position: relative;
  max-width: 380px;
}
h4 {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 12px;
}
canvas {
  background: #1e293b;
  border-radius: 10px;
  display: block;
  width: 100%;
}
.ct {
  position: absolute;
  padding: 6px 10px;
  background: #334155;
  border-radius: 6px;
  font-size: 12px;
  color: #e2e8f0;
  pointer-events: none;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
      `,
      js: `const canvas=document.getElementById('chart'),ctx=canvas.getContext('2d'),tooltip=document.getElementById('tooltip');
const data=[{l:'Jan',v:42},{l:'Feb',v:58},{l:'Mar',v:35},{l:'Apr',v:72},{l:'May',v:65},{l:'Jun',v:88}];
const mv=Math.max(...data.map(d=>d.v)),p={t:20,r:20,b:30,l:40},cW=canvas.width-p.l-p.r,cH=canvas.height-p.t-p.b,bW=cW/data.length-8,rects=[];
function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.strokeStyle='#334155';ctx.lineWidth=0.5;for(let i=0;i<=4;i++){const y=p.t+(cH/4)*i;ctx.beginPath();ctx.moveTo(p.l,y);ctx.lineTo(canvas.width-p.r,y);ctx.stroke();ctx.fillStyle='#64748b';ctx.font='10px sans-serif';ctx.textAlign='right';ctx.fillText(Math.round(mv-(mv/4)*i),p.l-6,y+4);}data.forEach((d,i)=>{const bH=(d.v/mv)*cH,x=p.l+i*(cW/data.length)+4,y=p.t+cH-bH;ctx.fillStyle='#3b82f6';ctx.beginPath();ctx.roundRect(x,y,bW,bH,[4,4,0,0]);ctx.fill();rects[i]={x,y,w:bW,h:bH,l:d.l,v:d.v};ctx.fillStyle='#94a3b8';ctx.font='11px sans-serif';ctx.textAlign='center';ctx.fillText(d.l,x+bW/2,canvas.height-8);});}
draw();
canvas.addEventListener('mousemove',(e)=>{const r=canvas.getBoundingClientRect(),mx=(e.clientX-r.left)*(canvas.width/r.width),my=(e.clientY-r.top)*(canvas.height/r.height);let f=false;rects.forEach(b=>{if(mx>=b.x&&mx<=b.x+b.w&&my>=b.y&&my<=b.y+b.h){tooltip.style.display='block';tooltip.style.left=(e.clientX-canvas.parentElement.getBoundingClientRect().left+12)+'px';tooltip.style.top=(e.clientY-canvas.parentElement.getBoundingClientRect().top-30)+'px';tooltip.textContent=b.l+': $'+b.v+'k';f=true;}});if(!f)tooltip.style.display='none';});
canvas.addEventListener('mouseleave',()=>tooltip.style.display='none');`,
    },
  },
  {
    id: 'js-virtual-scroll',
    title: 'Virtual Scrolling',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Implement virtual scrolling for rendering large datasets efficiently by only rendering visible items using scroll events and DOM recycling.',
    concepts: ['Virtual scrolling', 'Performance optimization', 'Scroll events', 'DOM recycling'],
    demoCode: {
      html: `
<div class="vsi">Rendering 10,000 items virtually</div>
<div class="vsc" id="vsc">
  <div class="vsp" id="vsp"></div>
  <div class="vsn" id="vsn"></div>
</div>
      `,
      css: `
.vsi {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 8px;
}
.vsc {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #334155;
  border-radius: 10px;
  position: relative;
}
.vsp {
  width: 100%;
}
.vsn {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.vsr {
  padding: 10px 14px;
  border-bottom: 1px solid #1e293b;
  font-size: 13px;
  color: #e2e8f0;
  display: flex;
  justify-content: space-between;
}
.vsr:hover {
  background: rgba(59, 130, 246, 0.05);
}
.vsr .idx {
  color: #64748b;
  font-family: monospace;
  font-size: 12px;
}
      `,
      js: `const T=10000,RH=40,c=document.getElementById('vsc'),sp=document.getElementById('vsp'),cn=document.getElementById('vsn');
sp.style.height=(T*RH)+'px';
function render(){const st=c.scrollTop,vc=Math.ceil(c.clientHeight/RH)+2,si=Math.floor(st/RH),ei=Math.min(si+vc,T);cn.style.top=(si*RH)+'px';cn.innerHTML='';for(let i=si;i<ei;i++){const r=document.createElement('div');r.className='vsr';r.innerHTML='<span>Item #'+(i+1)+'</span><span class="idx">'+String(i+1).padStart(5,'0')+'</span>';cn.appendChild(r);}}
c.addEventListener('scroll',render);render();`,
    },
  },

  // Navigation
  {
    id: 'js-navbar',
    title: 'Responsive Navbar',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build a responsive navigation bar with hamburger menu, dropdown submenus, and active link highlighting using media queries and event listeners.',
    concepts: ['Responsive design', 'Event delegation', 'CSS transitions', 'Mobile menu'],
    demoCode: {
      html: `
<nav class="nb">
  <div class="nb-brand">MyApp</div>
  <button class="hb" id="hb" aria-label="Toggle menu">
    <span></span>
    <span></span>
    <span></span>
  </button>
  <ul class="nl" id="nl">
    <li><a href="#" class="nk active" data-page="home">Home</a></li>
    <li><a href="#" class="nk" data-page="about">About</a></li>
    <li><a href="#" class="nk" data-page="services">Services</a></li>
    <li><a href="#" class="nk" data-page="contact">Contact</a></li>
  </ul>
</nav>
<div id="pd" class="pd">Home Page</div>
      `,
      css: `
.nb {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #1e293b;
  border-radius: 10px;
  border: 1px solid #334155;
}
.nb-brand {
  font-weight: 700;
  font-size: 18px;
  color: #3b82f6;
}
.hb {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  flex-direction: column;
  gap: 4px;
}
.hb span {
  display: block;
  width: 22px;
  height: 2px;
  background: #e2e8f0;
  border-radius: 2px;
}
.nl {
  display: flex;
  list-style: none;
  gap: 4px;
  padding: 0;
  margin: 0;
}
.nk {
  display: block;
  padding: 8px 14px;
  border-radius: 6px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
}
.nk:hover {
  color: #e2e8f0;
  background: #334155;
}
.nk.active {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}
.pd {
  margin-top: 16px;
  padding: 20px;
  text-align: center;
  color: #64748b;
  font-size: 14px;
  background: #1e293b;
  border-radius: 8px;
}
      `,
      js: `const hb=document.getElementById('hb'),nl=document.getElementById('nl'),pd=document.getElementById('pd'),links=document.querySelectorAll('.nk');
hb.addEventListener('click',()=>nl.classList.toggle('open'));
links.forEach(l=>l.addEventListener('click',(e)=>{e.preventDefault();links.forEach(x=>x.classList.remove('active'));l.classList.add('active');pd.textContent=l.dataset.page.charAt(0).toUpperCase()+l.dataset.page.slice(1)+' Page';nl.classList.remove('open');}));`,
    },
  },
  {
    id: 'js-sidebar',
    title: 'Off-Canvas Sidebar',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create an off-canvas sidebar that slides in/out with overlay backdrop, touch swipe support, and focus trap using CSS transforms.',
    concepts: ['CSS transforms', 'Touch events', 'Focus trap', 'Event delegation'],
    demoCode: {
      html: `
<button id="os" class="ob">Open Sidebar</button>
<div class="so" id="ov"></div>
<aside class="sb" id="sb">
  <div class="sh">
    <span class="st">Menu</span>
    <button class="cb" id="cs">&times;</button>
  </div>
  <nav class="sn">
    <a href="#" class="sl active">Dashboard</a>
    <a href="#" class="sl">Analytics</a>
    <a href="#" class="sl">Settings</a>
    <a href="#" class="sl">Profile</a>
  </nav>
</aside>
      `,
      css: `
.ob {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background: #3b82f6;
  color: white;
  font-weight: 600;
  cursor: pointer;
}
.ob:hover {
  background: #2563eb;
}
.so {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  z-index: 40;
}
.so.open {
  opacity: 1;
  visibility: visible;
}
.sb {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 240px;
  background: #1e293b;
  border-right: 1px solid #334155;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 50;
}
.sb.open {
  transform: translateX(0);
}
.sh {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #334155;
}
.st {
  font-weight: 600;
  font-size: 16px;
  color: #e2e8f0;
}
.cb {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 24px;
  cursor: pointer;
}
.sn {
  padding: 8px;
}
.sl {
  display: block;
  padding: 10px 12px;
  border-radius: 6px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
  margin-bottom: 2px;
}
.sl:hover {
  background: #334155;
  color: #e2e8f0;
}
.sl.active {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}
      `,
      js: `const sb=document.getElementById('sb'),ov=document.getElementById('ov'),os=document.getElementById('os'),cs=document.getElementById('cs');
function oSB(){sb.classList.add('open');ov.classList.add('open');}
function cSB(){sb.classList.remove('open');ov.classList.remove('open');}
os.addEventListener('click',oSB);cs.addEventListener('click',cSB);ov.addEventListener('click',cSB);
document.addEventListener('keydown',(e)=>{if(e.key==='Escape'&&sb.classList.contains('open'))cSB();});
document.querySelectorAll('.sl').forEach(l=>l.addEventListener('click',(e)=>{e.preventDefault();document.querySelectorAll('.sl').forEach(x=>x.classList.remove('active'));l.classList.add('active');}));`,
    },
  },
  {
    id: 'js-breadcrumbs',
    title: 'Dynamic Breadcrumbs',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Generate breadcrumb navigation dynamically from URL path or page hierarchy with proper ARIA markup and separators.',
    concepts: ['URL parsing', 'DOM manipulation', 'ARIA', 'Navigation'],
    demoCode: {
      html: `
<nav aria-label="Breadcrumb"><ol class="bc" id="bc"></ol></nav>
<div class="pb">
  <button class="pbtn" data-path="/">Home</button>
  <button class="pbtn" data-path="/products">Products</button>
  <button class="pbtn" data-path="/products/electronics">Electronics</button>
  <button class="pbtn" data-path="/products/electronics/laptops">
    Laptops
  </button>
</div>
<div class="cp" id="cp">/</div>
      `,
      css: `
.bc {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 10px 14px;
  margin: 0 0 12px;
  background: #1e293b;
  border-radius: 8px;
  border: 1px solid #334155;
}
.bc li {
  display: flex;
  align-items: center;
  font-size: 13px;
}
.bc li + li::before {
  content: "/";
  color: #475569;
  margin: 0 8px;
}
.bc a {
  color: #3b82f6;
  text-decoration: none;
}
.bc a:hover {
  text-decoration: underline;
}
.bc .cur {
  color: #e2e8f0;
  font-weight: 500;
}
.pb {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.pbtn {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #475569;
  background: #1e293b;
  color: #94a3b8;
  cursor: pointer;
  font-size: 12px;
}
.pbtn:hover {
  background: #334155;
  color: #e2e8f0;
}
.cp {
  font-family: monospace;
  font-size: 13px;
  color: #64748b;
  padding: 8px;
  background: #1e293b;
  border-radius: 6px;
}
      `,
      js: `const bc=document.getElementById('bc'),cp=document.getElementById('cp');
function upd(path){const segs=path.split('/').filter(Boolean);bc.innerHTML='';const h=document.createElement('li');if(!segs.length)h.innerHTML='<span class="cur" aria-current="page">Home</span>';else{h.innerHTML='<a href="#">Home</a>';h.querySelector('a').addEventListener('click',(e)=>{e.preventDefault();upd('/');});}bc.appendChild(h);segs.forEach((s,i)=>{const li=document.createElement('li');const lbl=s.charAt(0).toUpperCase()+s.slice(1);if(i===segs.length-1)li.innerHTML='<span class="cur" aria-current="page">'+lbl+'</span>';else{const sp='/'+segs.slice(0,i+1).join('/');li.innerHTML='<a href="#">'+lbl+'</a>';li.querySelector('a').addEventListener('click',(e)=>{e.preventDefault();upd(sp);});}bc.appendChild(li);});cp.textContent=path;}
document.querySelectorAll('.pbtn').forEach(b=>b.addEventListener('click',()=>upd(b.dataset.path)));upd('/');`,
    },
  },
  {
    id: 'js-bottom-nav',
    title: 'Bottom Navigation',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build a mobile-style bottom navigation bar that shows/hides based on scroll direction using scroll events and CSS transforms.',
    concepts: ['Scroll events', 'CSS transforms', 'Event throttling', 'Mobile patterns'],
    demoCode: {
      html: `
<div class="sa" id="sa">
  <p>Scroll up/down to show/hide bottom nav</p>
  <div class="fl"></div>
  <div class="fl"></div>
  <div class="fl"></div>
  <div class="fl"></div>
</div>
<nav class="bn" id="bn">
  <button class="bi active" data-tab="home">
    <span class="bic">&#8962;</span>
    <span class="bil">Home</span>
  </button>
  <button class="bi" data-tab="search">
    <span class="bic">&#128269;</span>
    <span class="bil">Search</span>
  </button>
  <button class="bi" data-tab="add">
    <span class="bic">&#10010;</span>
    <span class="bil">Add</span>
  </button>
  <button class="bi" data-tab="profile">
    <span class="bic">&#9787;</span>
    <span class="bil">Profile</span>
  </button>
</nav>
      `,
      css: `
.sa {
  height: 250px;
  overflow-y: auto;
  padding: 16px;
  border: 1px solid #334155;
  border-radius: 10px;
}
.sa p {
  color: #94a3b8;
  font-size: 14px;
  margin-bottom: 16px;
}
.fl {
  height: 120px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  margin-bottom: 10px;
}
.bn {
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  margin-top: 8px;
  transition:
    transform 0.3s,
    opacity 0.3s;
}
.bn.hidden {
  transform: translateY(10px);
  opacity: 0;
  pointer-events: none;
}
.bi {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
}
.bi:hover {
  color: #94a3b8;
}
.bi.active {
  color: #3b82f6;
}
.bic {
  font-size: 20px;
}
.bil {
  font-size: 10px;
  font-weight: 600;
}
      `,
      js: `const sa=document.getElementById('sa'),bn=document.getElementById('bn');let ls=0;
sa.addEventListener('scroll',()=>{const c=sa.scrollTop;if(c>ls&&c>40)bn.classList.add('hidden');else bn.classList.remove('hidden');ls=c;});
document.querySelectorAll('.bi').forEach(i=>i.addEventListener('click',()=>{document.querySelectorAll('.bi').forEach(x=>x.classList.remove('active'));i.classList.add('active');}));`,
    },
  },
  {
    id: 'js-dropdown-menu',
    title: 'Accessible Dropdown Menu',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create fully accessible dropdown menus with keyboard navigation, ARIA roles, and hover/click interactions using event delegation.',
    concepts: ['ARIA roles', 'Keyboard navigation', 'Event delegation', 'Focus management'],
    demoCode: {
      html: `
<div class="mb">
  <div class="dd" id="ddf">
    <button class="mt" aria-haspopup="true" aria-expanded="false">File</button>
    <ul class="dl" role="menu">
      <li role="menuitem" tabindex="-1">New File</li>
      <li role="menuitem" tabindex="-1">Open</li>
      <li role="menuitem" tabindex="-1">Save</li>
      <li class="dv" role="separator"></li>
      <li role="menuitem" tabindex="-1">Exit</li>
    </ul>
  </div>
  <div class="dd" id="dde">
    <button class="mt" aria-haspopup="true" aria-expanded="false">Edit</button>
    <ul class="dl" role="menu">
      <li role="menuitem" tabindex="-1">Undo</li>
      <li role="menuitem" tabindex="-1">Redo</li>
      <li class="dv" role="separator"></li>
      <li role="menuitem" tabindex="-1">Cut</li>
      <li role="menuitem" tabindex="-1">Copy</li>
      <li role="menuitem" tabindex="-1">Paste</li>
    </ul>
  </div>
</div>
<div id="ds" class="ds"></div>
      `,
      css: `
.mb {
  display: flex;
  gap: 2px;
  background: #1e293b;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid #334155;
}
.dd {
  position: relative;
}
.mt {
  padding: 8px 16px;
  background: none;
  border: none;
  color: #e2e8f0;
  font-size: 13px;
  cursor: pointer;
  border-radius: 6px;
}
.mt:hover,
.mt[aria-expanded="true"] {
  background: #334155;
}
.dl {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 160px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 4px;
  margin-top: 4px;
  list-style: none;
  z-index: 20;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
.dl.open {
  display: block;
}
.dl li[role="menuitem"] {
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  color: #e2e8f0;
  cursor: pointer;
}
.dl li[role="menuitem"]:hover,
.dl li.foc {
  background: #334155;
}
.dv {
  height: 1px;
  background: #334155;
  margin: 4px 0;
}
.ds {
  margin-top: 12px;
  font-size: 13px;
  color: #94a3b8;
  text-align: center;
}
      `,
      js: `const ds=document.getElementById('ds');
document.querySelectorAll('.dd').forEach(dd=>{const tr=dd.querySelector('.mt'),li=dd.querySelector('.dl'),its=li.querySelectorAll('[role="menuitem"]');let fi=-1;
function op(){document.querySelectorAll('.dl').forEach(l=>{l.classList.remove('open');l.closest('.dd').querySelector('.mt').setAttribute('aria-expanded','false');});li.classList.add('open');tr.setAttribute('aria-expanded','true');fi=-1;}
function cl(){li.classList.remove('open');tr.setAttribute('aria-expanded','false');fi=-1;its.forEach(i=>i.classList.remove('foc'));}
tr.addEventListener('click',()=>li.classList.contains('open')?cl():op());
its.forEach(it=>it.addEventListener('click',()=>{ds.textContent='Selected: '+it.textContent;cl();}));
tr.addEventListener('keydown',(e)=>{if(e.key==='ArrowDown'||e.key==='Enter'){e.preventDefault();op();fi=0;its[0].classList.add('foc');its[0].focus();}});
li.addEventListener('keydown',(e)=>{if(e.key==='ArrowDown'){e.preventDefault();its[fi]?.classList.remove('foc');fi=Math.min(fi+1,its.length-1);its[fi].classList.add('foc');its[fi].focus();}else if(e.key==='ArrowUp'){e.preventDefault();its[fi]?.classList.remove('foc');fi=Math.max(fi-1,0);its[fi].classList.add('foc');its[fi].focus();}else if(e.key==='Enter')its[fi]?.click();else if(e.key==='Escape'){cl();tr.focus();}});});
document.addEventListener('click',(e)=>{if(!e.target.closest('.dd'))document.querySelectorAll('.dl').forEach(l=>l.classList.remove('open'));});`,
    },
  },
  {
    id: 'js-pagination',
    title: 'Pagination Component',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Implement client-side pagination with page numbers, previous/next buttons, and URL state synchronization using history API.',
    concepts: ['History API', 'Event delegation', 'State management', 'URL parameters'],
    demoCode: {
      html: `<div id="pi" class="pi"></div><div class="pg" id="pg"></div>`,
      css: `
.pi {
  margin-bottom: 12px;
}
.pit {
  padding: 10px 14px;
  border-bottom: 1px solid #1e293b;
  font-size: 14px;
  color: #e2e8f0;
}
.pit:hover {
  background: rgba(59, 130, 246, 0.05);
}
.pg {
  display: flex;
  justify-content: center;
  gap: 4px;
}
.pb {
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #94a3b8;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.pb:hover {
  border-color: #3b82f6;
  color: #e2e8f0;
}
.pb.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}
.pb:disabled {
  opacity: 0.3;
  cursor: default;
}
      `,
      js: `const all=Array.from({length:30},(_,i)=>'Item #'+(i+1));const pp=5;let cp=1;const tp=Math.ceil(all.length/pp);
const pi=document.getElementById('pi'),pg=document.getElementById('pg');
function render(){const s=(cp-1)*pp;pi.innerHTML=all.slice(s,s+pp).map(i=>'<div class="pit">'+i+'</div>').join('');pg.innerHTML='';
const pv=document.createElement('button');pv.className='pb';pv.textContent='\u2190';pv.disabled=cp===1;pv.addEventListener('click',()=>{cp--;render();});pg.appendChild(pv);
for(let i=1;i<=tp;i++){const b=document.createElement('button');b.className='pb'+(i===cp?' active':'');b.textContent=i;b.addEventListener('click',()=>{cp=i;render();});pg.appendChild(b);}
const nx=document.createElement('button');nx.className='pb';nx.textContent='\u2192';nx.disabled=cp===tp;nx.addEventListener('click',()=>{cp++;render();});pg.appendChild(nx);}
render();`,
    },
  },

  // Advanced Features
  {
    id: 'js-keyboard-shortcuts',
    title: 'Keyboard Shortcuts',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Build a global keyboard shortcut system supporting key combinations, context awareness, and customizable bindings using keydown events.',
    concepts: ['Keyboard events', 'Event handling', 'Key combinations', 'Command pattern'],
    demoCode: {
      html: `
<div class="sp">
  <h4>Keyboard Shortcuts</h4>
  <div class="sl">
    <div class="sr">
      <kbd>Ctrl</kbd>
      +
      <kbd>B</kbd>
      <span>Bold</span>
    </div>
    <div class="sr">
      <kbd>Ctrl</kbd>
      +
      <kbd>I</kbd>
      <span>Italic</span>
    </div>
    <div class="sr">
      <kbd>Ctrl</kbd>
      +
      <kbd>S</kbd>
      <span>Save</span>
    </div>
    <div class="sr">
      <kbd>Ctrl</kbd>
      +
      <kbd>D</kbd>
      <span>Delete</span>
    </div>
    <div class="sr">
      <kbd>Esc</kbd>
      <span>Clear</span>
    </div>
  </div>
  <div class="so" id="so">Press a shortcut...</div>
  <div class="kd" id="kd"></div>
</div>
      `,
      css: `
.sp {
  max-width: 340px;
}
h4 {
  font-size: 16px;
  color: #e2e8f0;
  margin-bottom: 12px;
}
.sr {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 0;
  font-size: 13px;
  color: #94a3b8;
}
.sr span {
  margin-left: auto;
  color: #64748b;
}
kbd {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  background: #334155;
  border: 1px solid #475569;
  color: #e2e8f0;
  font-family: monospace;
}
.so {
  padding: 16px;
  background: #1e293b;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #3b82f6;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #334155;
  transition: all 0.2s;
}
.so.act {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.08);
}
.kd {
  margin-top: 8px;
  text-align: center;
  font-size: 11px;
  color: #475569;
  font-family: monospace;
}
      `,
      js: `const so=document.getElementById('so'),kd=document.getElementById('kd');
const sc={'ctrl+b':'Bold applied','ctrl+i':'Italic applied','ctrl+s':'Document saved','ctrl+d':'Item deleted','escape':'Cleared'};
document.addEventListener('keydown',(e)=>{const p=[];if(e.ctrlKey||e.metaKey)p.push('ctrl');if(e.shiftKey)p.push('shift');if(e.altKey)p.push('alt');const k=e.key.toLowerCase();if(!['control','shift','alt','meta'].includes(k))p.push(k);const c=p.join('+');kd.textContent='Keys: '+c;if(sc[c]){e.preventDefault();so.textContent=sc[c];so.classList.add('act');setTimeout(()=>so.classList.remove('act'),600);}});`,
    },
  },
  {
    id: 'js-notifications',
    title: 'Browser Notifications',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Implement browser push notifications with permission handling, notification actions, and fallback to in-app notifications using Notification API.',
    concepts: ['Notification API', 'Permissions API', 'Event handling', 'Feature detection'],
    demoCode: {
      html: `
<div class="nd">
  <h4>Notification Center</h4>
  <div class="nc">
    <button id="sn" class="nb primary">Send Notification</button>
    <button id="cn" class="nb secondary">Clear All</button>
  </div>
  <div class="nli" id="nli">
    <div class="ne" id="ne">No notifications yet</div>
  </div>
</div>
      `,
      css: `
.nd {
  max-width: 360px;
}
h4 {
  font-size: 16px;
  color: #e2e8f0;
  margin-bottom: 12px;
}
.nc {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.nb {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-size: 13px;
  cursor: pointer;
  font-weight: 500;
}
.nb.primary {
  background: #3b82f6;
  color: white;
}
.nb.primary:hover {
  background: #2563eb;
}
.nb.secondary {
  background: #334155;
  color: #94a3b8;
}
.nb.secondary:hover {
  background: #475569;
}
.nli {
  max-height: 250px;
  overflow-y: auto;
  border: 1px solid #334155;
  border-radius: 10px;
}
.ne {
  padding: 24px;
  text-align: center;
  color: #64748b;
  font-size: 14px;
}
.ni {
  padding: 12px 14px;
  border-bottom: 1px solid #1e293b;
  animation: nsIn 0.3s;
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
.ndt {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 5px;
  flex-shrink: 0;
}
.ndt.info {
  background: #3b82f6;
}
.ndt.success {
  background: #22c55e;
}
.ndt.warning {
  background: #eab308;
}
.nbd {
  flex: 1;
}
.ntt {
  font-size: 13px;
  font-weight: 600;
  color: #e2e8f0;
}
.ntx {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 2px;
}
.ntm {
  font-size: 10px;
  color: #475569;
  margin-top: 4px;
}
@keyframes nsIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
      `,
      js: `const nli=document.getElementById('nli'),ne=document.getElementById('ne');
const ns=[{t:'info',title:'New message',text:'You have a new message from Alice'},{t:'success',title:'Deploy complete',text:'Production deployment succeeded'},{t:'warning',title:'Storage warning',text:'Storage usage is above 80%'},{t:'info',title:'Update available',text:'Version 2.1.0 ready'}];
let ni=0;
function add(){ne.style.display='none';const n=ns[ni%ns.length];ni++;const d=document.createElement('div');d.className='ni';d.innerHTML='<div class="ndt '+n.t+'"></div><div class="nbd"><div class="ntt">'+n.title+'</div><div class="ntx">'+n.text+'</div><div class="ntm">'+new Date().toLocaleTimeString()+'</div></div>';nli.insertBefore(d,nli.firstChild);}
document.getElementById('sn').addEventListener('click',add);
document.getElementById('cn').addEventListener('click',()=>{nli.querySelectorAll('.ni').forEach(i=>i.remove());ne.style.display='block';});`,
    },
  },
  {
    id: 'js-undo-redo',
    title: 'Undo/Redo System',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Build an undo/redo system using the command pattern with keyboard shortcuts (Ctrl+Z/Ctrl+Y) and state history management.',
    concepts: ['Command pattern', 'State management', 'Keyboard events', 'History stack'],
    demoCode: {
      html: `
<div class="ud">
  <div class="ub">
    <button id="ub" class="tb" disabled>&#8630; Undo</button>
    <button id="rb" class="tb" disabled>&#8631; Redo</button>
    <button id="ab" class="tb ad">+ Add</button>
  </div>
  <div class="uc" id="uc"></div>
  <div class="ui" id="ui">History: 0</div>
</div>
      `,
      css: `
.ud {
  max-width: 360px;
}
.ub {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
}
.tb {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #475569;
  background: #1e293b;
  color: #94a3b8;
  cursor: pointer;
  font-size: 12px;
}
.tb:hover:not(:disabled) {
  background: #334155;
  color: #e2e8f0;
}
.tb:disabled {
  opacity: 0.3;
  cursor: default;
}
.tb.ad {
  border-color: #3b82f6;
  color: #3b82f6;
}
.tb.ad:hover {
  background: rgba(59, 130, 246, 0.1);
}
.uc {
  min-height: 140px;
  padding: 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-content: flex-start;
}
.ci {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 15px;
  color: white;
  cursor: pointer;
  transition: transform 0.15s;
}
.ci:hover {
  transform: scale(1.1);
}
.ui {
  margin-top: 8px;
  font-size: 11px;
  color: #475569;
  text-align: center;
}
      `,
      js: `const uc=document.getElementById('uc'),ub=document.getElementById('ub'),rb=document.getElementById('rb'),ui=document.getElementById('ui');
const cols=['#3b82f6','#22c55e','#ef4444','#eab308','#a855f7','#ec4899'];
let its=[],hist=[[]],hi=0,cnt=0;
function push(){hist=hist.slice(0,hi+1);hist.push(JSON.parse(JSON.stringify(its)));hi=hist.length-1;upd();}
function upd(){uc.innerHTML='';its.forEach((it,i)=>{const d=document.createElement('div');d.className='ci';d.style.background=it.c;d.textContent=it.id;d.addEventListener('click',()=>{its.splice(i,1);push();});uc.appendChild(d);});ub.disabled=hi<=0;rb.disabled=hi>=hist.length-1;ui.textContent='History: '+hist.length+' (pos '+(hi+1)+')';}
function undo(){if(hi>0){hi--;its=JSON.parse(JSON.stringify(hist[hi]));upd();}}
function redo(){if(hi<hist.length-1){hi++;its=JSON.parse(JSON.stringify(hist[hi]));upd();}}
document.getElementById('ab').addEventListener('click',()=>{cnt++;its.push({id:cnt,c:cols[(cnt-1)%cols.length]});push();});
ub.addEventListener('click',undo);rb.addEventListener('click',redo);
document.addEventListener('keydown',(e)=>{if((e.ctrlKey||e.metaKey)&&e.key==='z'){e.preventDefault();undo();}if((e.ctrlKey||e.metaKey)&&e.key==='y'){e.preventDefault();redo();}});
upd();`,
    },
  },
  {
    id: 'js-clipboard',
    title: 'Clipboard Operations',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Implement copy/paste functionality with rich content support using the Clipboard API with fallback for older browsers.',
    concepts: ['Clipboard API', 'Permissions API', 'Event handling', 'Feature detection'],
    demoCode: {
      html: `
<div class="cd">
  <div class="cs">
    <label>Text to copy</label>
    <div class="cr">
      <input type="text" id="ci" value="Hello, clipboard!" />
      <button id="cb" class="ab">Copy</button>
    </div>
  </div>
  <div class="cs">
    <label>Paste area</label>
    <div class="cr">
      <input type="text" id="pi" placeholder="Click paste or Ctrl+V" readonly />
      <button id="pb" class="ab">Paste</button>
    </div>
  </div>
  <div class="sn">
    <p class="snl">Quick copy:</p>
    <button class="snb" data-text="npm install">npm install</button>
    <button class="snb" data-text="git commit">git commit</button>
    <button class="snb" data-text="console.log()">console.log</button>
  </div>
  <div id="cst" class="cst"></div>
</div>
      `,
      css: `
.cd {
  max-width: 360px;
}
label {
  display: block;
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 4px;
}
.cs {
  margin-bottom: 14px;
}
.cr {
  display: flex;
  gap: 6px;
}
.cr input {
  flex: 1;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
  font-size: 13px;
}
.cr input:focus {
  border-color: #3b82f6;
}
.ab {
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  background: #3b82f6;
  color: white;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
}
.ab:hover {
  background: #2563eb;
}
.snl {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 6px;
}
.snb {
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #94a3b8;
  cursor: pointer;
  font-size: 11px;
  font-family: monospace;
  margin-right: 4px;
}
.snb:hover {
  border-color: #3b82f6;
  color: #e2e8f0;
}
.cst {
  margin-top: 10px;
  font-size: 12px;
  text-align: center;
  padding: 6px;
  border-radius: 6px;
}
.cst.ok {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}
.cst.er {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
      `,
      js: `const ci=document.getElementById('ci'),pi=document.getElementById('pi'),cst=document.getElementById('cst');
function show(m,ok){cst.textContent=m;cst.className='cst '+(ok?'ok':'er');setTimeout(()=>{cst.textContent='';cst.className='cst';},2000);}
async function cp(t){try{await navigator.clipboard.writeText(t);show('Copied: "'+t+'"',true);}catch{const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);show('Copied (fallback)',true);}}
document.getElementById('cb').addEventListener('click',()=>cp(ci.value));
document.getElementById('pb').addEventListener('click',async()=>{try{pi.value=await navigator.clipboard.readText();show('Pasted!',true);}catch{show('Paste denied - use Ctrl+V',false);}});
document.querySelectorAll('.snb').forEach(b=>b.addEventListener('click',()=>cp(b.dataset.text)));`,
    },
  },
  {
    id: 'js-local-storage',
    title: 'State Persistence',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Implement state persistence with localStorage including cross-tab synchronization using storage events and automatic serialization.',
    concepts: ['localStorage', 'Storage events', 'Serialization', 'State management'],
    demoCode: {
      html: `
<div class="sd">
  <h4>Persistent Notes</h4>
  <div class="nr">
    <input type="text" id="ni" placeholder="Add a note..." />
    <button id="an" class="adb">Add</button>
  </div>
  <ul id="nl" class="nl"></ul>
  <div class="sf">
    <span id="si"></span>
    <button id="ca" class="clb">Clear All</button>
  </div>
</div>
      `,
      css: `
.sd {
  max-width: 340px;
}
h4 {
  font-size: 16px;
  color: #e2e8f0;
  margin-bottom: 12px;
}
.nr {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}
.nr input {
  flex: 1;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
  font-size: 13px;
}
.nr input:focus {
  border-color: #3b82f6;
}
.adb {
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  background: #3b82f6;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
}
.nl {
  list-style: none;
  padding: 0;
}
.nit {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  margin-bottom: 6px;
}
.nit .tx {
  flex: 1;
  font-size: 13px;
  color: #e2e8f0;
}
.nit .tm {
  font-size: 10px;
  color: #475569;
}
.nit .dl {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  font-size: 16px;
}
.nit .dl:hover {
  color: #ef4444;
}
.sf {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}
#si {
  font-size: 11px;
  color: #475569;
}
.clb {
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid #334155;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  font-size: 11px;
}
.clb:hover {
  color: #ef4444;
  border-color: #ef4444;
}
      `,
      js: `const K='demo-notes',ni=document.getElementById('ni'),nl=document.getElementById('nl'),si=document.getElementById('si');
function ld(){try{return JSON.parse(localStorage.getItem(K))||[];}catch{return[];}}
function sv(n){localStorage.setItem(K,JSON.stringify(n));}
function render(){const notes=ld();nl.innerHTML='';notes.forEach((n,i)=>{const li=document.createElement('li');li.className='nit';li.innerHTML='<span class="tx">'+n.text+'</span><span class="tm">'+n.time+'</span><button class="dl">&times;</button>';li.querySelector('.dl').addEventListener('click',()=>{notes.splice(i,1);sv(notes);render();});nl.appendChild(li);});const b=new Blob([localStorage.getItem(K)||'']).size;si.textContent=notes.length+' notes ('+b+' bytes)';}
document.getElementById('an').addEventListener('click',()=>{const t=ni.value.trim();if(!t)return;const n=ld();n.unshift({text:t,time:new Date().toLocaleTimeString()});sv(n);ni.value='';render();});
ni.addEventListener('keydown',(e)=>{if(e.key==='Enter')document.getElementById('an').click();});
document.getElementById('ca').addEventListener('click',()=>{localStorage.removeItem(K);render();});
window.addEventListener('storage',(e)=>{if(e.key===K)render();});render();`,
    },
  },

  // UI Components
  {
    id: 'js-loading-skeleton',
    title: 'Loading Skeleton Screens',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create skeleton loading screens with animated placeholder content using CSS animations and template literals.',
    concepts: ['CSS animations', 'Template literals', 'Loading states', 'DOM manipulation'],
    demoCode: {
      html: `
<button id="tl" class="tlb">Toggle Loading</button>
<div class="skc" id="skc">
  <div class="skd" id="s1"></div>
  <div class="skd" id="s2"></div>
  <div class="skd" id="s3"></div>
</div>
      `,
      css: `
.tlb {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: #3b82f6;
  color: white;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 12px;
}
.skc {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.skd {
  padding: 14px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
}
.sk {
  border-radius: 4px;
  background: linear-gradient(110deg, #334155 30%, #475569 50%, #334155 70%);
  background-size: 200% 100%;
  animation: shim 1.5s infinite;
}
.ska {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.skt {
  height: 14px;
  width: 60%;
  margin-bottom: 8px;
}
.skx {
  height: 10px;
  width: 90%;
  margin-bottom: 6px;
}
.sks {
  height: 10px;
  width: 50%;
}
.skr {
  display: flex;
  gap: 12px;
  align-items: center;
}
.skb {
  flex: 1;
}
.rr {
  display: flex;
  gap: 12px;
  align-items: center;
}
.ra {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  font-size: 16px;
}
.rt {
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 4px;
}
.rx {
  font-size: 12px;
  color: #94a3b8;
}
@keyframes shim {
  to {
    background-position: -200% 0;
  }
}
      `,
      js: `const rd=[{name:'Alice Johnson',text:'Working on the dashboard',color:'#3b82f6',i:'A'},{name:'Bob Smith',text:'Reviewing pull requests',color:'#22c55e',i:'B'},{name:'Carol Davis',text:'Setting up CI/CD',color:'#a855f7',i:'C'}];
let il=true;
function showSk(){document.querySelectorAll('.skd').forEach(c=>{c.innerHTML='<div class="skr"><div class="sk ska"></div><div class="skb"><div class="sk skt"></div><div class="sk skx"></div><div class="sk sks"></div></div></div>';});}
function showRl(){document.querySelectorAll('.skd').forEach((c,i)=>{const d=rd[i];c.innerHTML='<div class="rr"><div class="ra" style="background:'+d.color+'">'+d.i+'</div><div><div class="rt">'+d.name+'</div><div class="rx">'+d.text+'</div></div></div>';});}
document.getElementById('tl').addEventListener('click',()=>{il=!il;if(il)showSk();else setTimeout(showRl,800);});
showSk();`,
    },
  },
  {
    id: 'js-empty-states',
    title: 'Empty State Components',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Design and implement empty state screens with illustrations, helpful messages, and call-to-action buttons using template literals.',
    concepts: ['Template literals', 'DOM manipulation', 'UX patterns', 'SVG'],
    demoCode: {
      html: `
<div class="ed">
  <div class="et">
    <button class="stb active" data-scene="inbox">Inbox</button>
    <button class="stb" data-scene="search">Search</button>
    <button class="stb" data-scene="error">Error</button>
  </div>
  <div class="es" id="es"></div>
</div>
      `,
      css: `
.ed {
  max-width: 380px;
}
.et {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
}
.stb {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  font-size: 12px;
}
.stb:hover {
  border-color: #3b82f6;
}
.stb.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}
.es {
  text-align: center;
  padding: 32px 16px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
}
.ei {
  font-size: 48px;
  margin-bottom: 12px;
}
.etl {
  font-size: 18px;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 6px;
}
.etx {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 16px;
  line-height: 1.6;
}
.eb {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
}
.ebp {
  background: #3b82f6;
  color: white;
}
.ebs {
  background: #334155;
  color: #94a3b8;
}
      `,
      js: `const scenes={inbox:{icon:'&#128236;',title:'Your inbox is empty',text:'When you receive new messages, they will appear here.',btn:'Compose Message',cls:'ebp'},search:{icon:'&#128269;',title:'No results found',text:'Try adjusting your search terms or filters.',btn:'Clear Filters',cls:'ebs'},error:{icon:'&#9888;',title:'Something went wrong',text:'We could not load this content. Please try again.',btn:'Retry',cls:'ebp'}};
const es=document.getElementById('es'),tabs=document.querySelectorAll('.stb');
function show(s){const d=scenes[s];es.innerHTML='<div class="ei">'+d.icon+'</div><div class="etl">'+d.title+'</div><div class="etx">'+d.text+'</div><button class="eb '+d.cls+'">'+d.btn+'</button>';}
tabs.forEach(t=>t.addEventListener('click',()=>{tabs.forEach(x=>x.classList.remove('active'));t.classList.add('active');show(t.dataset.scene);}));
show('inbox');`,
    },
  },
  {
    id: 'js-image-zoom',
    title: 'Image Zoom on Hover',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Implement image zoom/magnify functionality on hover using CSS transform and pointer position tracking for product image previews.',
    concepts: ['Pointer events', 'CSS transform', 'Mouse tracking', 'Image manipulation'],
    demoCode: {
      html: `
<div class="zd">
  <p class="zh">Hover over the image to zoom</p>
  <div class="zc" id="zc">
    <div class="zi">
      <div class="zg">
        <div class="zgl" style="background: #1e3a5f">A1</div>
        <div class="zgl" style="background: #3b1f5e">B2</div>
        <div class="zgl" style="background: #1f4a3b">C3</div>
        <div class="zgl" style="background: #5e3b1f">D4</div>
        <div class="zgl" style="background: #1f3b5e">E5</div>
        <div class="zgl" style="background: #4a1f3b">F6</div>
        <div class="zgl" style="background: #2d3a1f">G7</div>
        <div class="zgl" style="background: #3a1f2d">H8</div>
        <div class="zgl" style="background: #1f2d3a">I9</div>
      </div>
    </div>
    <div class="zl" id="zl"></div>
  </div>
  <div class="zp" id="zp"></div>
</div>
      `,
      css: `
.zd {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: flex-start;
}
.zh {
  width: 100%;
  font-size: 12px;
  color: #64748b;
  margin-bottom: 4px;
}
.zc {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #334155;
  cursor: crosshair;
}
.zi {
  width: 100%;
  height: 100%;
}
.zg {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 100%;
}
.zgl {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
}
.zl {
  position: absolute;
  width: 60px;
  height: 60px;
  border: 2px solid #3b82f6;
  background: rgba(59, 130, 246, 0.15);
  pointer-events: none;
  display: none;
}
.zp {
  width: 160px;
  height: 160px;
  border-radius: 10px;
  border: 1px solid #334155;
  overflow: hidden;
  background: #1e293b;
  display: none;
}
.zp .zg {
  width: 600px;
  height: 600px;
}
.zp .zgl {
  font-size: 60px;
}
      `,
      js: `const zc=document.getElementById('zc'),zl=document.getElementById('zl'),zp=document.getElementById('zp'),f=3;
const og=zc.querySelector('.zg'),cl=og.cloneNode(true);
cl.style.width=(zc.offsetWidth*f)+'px';cl.style.height=(zc.offsetHeight*f)+'px';
cl.querySelectorAll('.zgl').forEach(c=>c.style.fontSize='60px');
zp.appendChild(cl);
zc.addEventListener('mouseenter',()=>{zl.style.display='block';zp.style.display='block';});
zc.addEventListener('mouseleave',()=>{zl.style.display='none';zp.style.display='none';});
zc.addEventListener('mousemove',(e)=>{const r=zc.getBoundingClientRect(),lw=zl.offsetWidth/2,lh=zl.offsetHeight/2;let x=e.clientX-r.left-lw,y=e.clientY-r.top-lh;x=Math.max(0,Math.min(x,r.width-zl.offsetWidth));y=Math.max(0,Math.min(y,r.height-zl.offsetHeight));zl.style.left=x+'px';zl.style.top=y+'px';cl.style.transform='translate(-'+(x*f)+'px,-'+(y*f)+'px)';});`,
    },
  },
  {
    id: 'js-toggle-switch',
    title: 'Toggle Switch',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create accessible toggle switches with smooth animations, disabled states, and keyboard support using checkbox inputs and CSS.',
    concepts: ['Checkbox input', 'CSS transitions', 'ARIA', 'Keyboard events'],
    demoCode: {
      html: `
<div class="tgs">
  <div class="tr">
    <label class="tw">
      <input type="checkbox" id="tw" checked />
      <span class="ts"></span>
    </label>
    <span class="tl">Wi-Fi</span>
    <span class="tt" id="sw">On</span>
  </div>
  <div class="tr">
    <label class="tw">
      <input type="checkbox" id="tb" />
      <span class="ts"></span>
    </label>
    <span class="tl">Bluetooth</span>
    <span class="tt" id="sb">Off</span>
  </div>
  <div class="tr">
    <label class="tw">
      <input type="checkbox" id="td" checked />
      <span class="ts"></span>
    </label>
    <span class="tl">Dark Mode</span>
    <span class="tt" id="sd">On</span>
  </div>
  <div class="tr dis">
    <label class="tw">
      <input type="checkbox" id="ta" disabled />
      <span class="ts"></span>
    </label>
    <span class="tl">Airplane Mode</span>
    <span class="tt" id="sa">Disabled</span>
  </div>
</div>
      `,
      css: `
.tgs {
  max-width: 300px;
}
.tr {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  margin-bottom: 8px;
}
.tr.dis {
  opacity: 0.4;
}
.tl {
  flex: 1;
  font-size: 14px;
  color: #e2e8f0;
}
.tt {
  font-size: 12px;
  color: #64748b;
  min-width: 50px;
  text-align: right;
}
.tw {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  flex-shrink: 0;
}
.tw input {
  opacity: 0;
  width: 0;
  height: 0;
}
.ts {
  position: absolute;
  inset: 0;
  background: #475569;
  border-radius: 24px;
  cursor: pointer;
  transition: background 0.3s;
}
.ts::before {
  content: "";
  position: absolute;
  left: 2px;
  bottom: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s;
}
input:checked + .ts {
  background: #3b82f6;
}
input:checked + .ts::before {
  transform: translateX(20px);
}
input:focus-visible + .ts {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
}
input:disabled + .ts {
  cursor: not-allowed;
}
      `,
      js: `
[
  { id: 'tw', sid: 'sw' },
  { id: 'tb', sid: 'sb' },
  { id: 'td', sid: 'sd' },
].forEach(({ id, sid }) => {
  const inp = document.getElementById(id),
    st = document.getElementById(sid);
  function u() {
    st.textContent = inp.checked ? 'On' : 'Off';
    st.style.color = inp.checked ? '#3b82f6' : '#64748b';
  }
  inp.addEventListener('change', u);
  u();
});
      `,
    },
  },
  // ========== NEW PATTERNS (100) ==========
  // --- forms-input ---
  {
    id: 'js-rating-stars',
    title: 'Star Rating',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build an interactive star rating component with hover preview, click selection, and keyboard support using vanilla JS.',
    concepts: ['Mouse events', 'Keyboard navigation', 'CSS transitions', 'Data attributes'],
    demoCode: {
      html: `
<div class="rating-wrap">
  <p class="rating-label">Rate this item</p>
  <div class="stars" id="stars" role="radiogroup" aria-label="Rating"></div>
  <p class="rating-text" id="rating-text">No rating</p>
</div>
      `,
      css: `
.rating-wrap {
  text-align: center;
}
.rating-label {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 8px;
}
.stars {
  display: inline-flex;
  gap: 4px;
}
.star {
  font-size: 32px;
  cursor: pointer;
  color: #475569;
  transition:
    color 0.15s,
    transform 0.15s;
  user-select: none;
}
.star:hover,
.star.hovered {
  color: #facc15;
  transform: scale(1.15);
}
.star.active {
  color: #facc15;
}
.rating-text {
  font-size: 13px;
  color: #64748b;
  margin-top: 8px;
}
      `,
      js: `
const container = document.getElementById('stars'),
  text = document.getElementById('rating-text');
let rating = 0;
for (let i = 1; i <= 5; i++) {
  const s = document.createElement('span');
  s.className = 'star';
  s.textContent = '\\u2605';
  s.dataset.value = i;
  s.tabIndex = 0;
  s.setAttribute('role', 'radio');
  s.setAttribute('aria-label', i + ' star' + (i > 1 ? 's' : ''));
  container.appendChild(s);
}
const stars = container.querySelectorAll('.star');
function highlight(n) {
  stars.forEach((s, i) => {
    s.classList.toggle('hovered', i < n);
  });
}
function select(n) {
  rating = n;
  stars.forEach((s, i) => {
    s.classList.toggle('active', i < n);
    s.setAttribute('aria-checked', i < n);
  });
  text.textContent = n + '/5 stars';
}
container.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('star')) highlight(+e.target.dataset.value);
});
container.addEventListener('mouseout', () => highlight(0));
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('star')) select(+e.target.dataset.value);
});
container.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.classList.contains('star'))
    select(+e.target.dataset.value);
});
      `,
    },
  },
  {
    id: 'js-tag-input',
    title: 'Tag Input',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create a tag input component where users can add, remove, and manage tags with keyboard shortcuts and duplicate prevention.',
    concepts: ['Keyboard events', 'DOM manipulation', 'Array management', 'Focus management'],
    demoCode: {
      html: `
<div class="tag-wrap">
  <label class="tag-label">Add Tags</label>
  <div class="tag-container" id="tag-container">
    <input type="text" id="tag-input" placeholder="Type and press Enter" />
  </div>
  <p class="tag-hint">Press Enter to add, Backspace to remove last</p>
</div>
      `,
      css: `
.tag-wrap {
  max-width: 400px;
}
.tag-label {
  display: block;
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 6px;
}
.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  min-height: 42px;
  align-items: center;
  cursor: text;
}
.tag-container:focus-within {
  border-color: #4fc3f7;
}
.tag {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #4fc3f7;
  color: #1a1a2e;
  padding: 2px 8px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 600;
}
.tag .remove {
  cursor: pointer;
  font-size: 15px;
  line-height: 1;
  opacity: 0.7;
}
.tag .remove:hover {
  opacity: 1;
}
#tag-input {
  border: none;
  background: transparent;
  color: #e0e0e0;
  outline: none;
  flex: 1;
  min-width: 80px;
  font-size: 14px;
}
.tag-hint {
  font-size: 12px;
  color: #64748b;
  margin-top: 6px;
}
      `,
      js: `
const container = document.getElementById('tag-container'),
  input = document.getElementById('tag-input');
let tags = [];
function render() {
  container.querySelectorAll('.tag').forEach((t) => t.remove());
  tags.forEach((t, i) => {
    const el = document.createElement('span');
    el.className = 'tag';
    el.innerHTML =
      t + '<span class="remove" data-idx="' + i + '">&times;</span>';
    container.insertBefore(el, input);
  });
}
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    tags.splice(+e.target.dataset.idx, 1);
    render();
  } else {
    input.focus();
  }
});
input.addEventListener('keydown', (e) => {
  const val = input.value.trim();
  if (e.key === 'Enter' && val) {
    e.preventDefault();
    if (!tags.includes(val)) {
      tags.push(val);
      input.value = '';
      render();
    }
  }
  if (e.key === 'Backspace' && !input.value && tags.length) {
    tags.pop();
    render();
  }
});
      `,
    },
  },
  {
    id: 'js-multi-select',
    title: 'Multi-Select Dropdown',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a multi-select dropdown with checkboxes, search filtering, select all, and chip display for selected items.',
    concepts: ['Checkbox state', 'Filtering', 'Dropdown toggling', 'Event delegation'],
    demoCode: {
      html: `
<div class="ms-wrap" id="ms-wrap">
  <label class="ms-label">Select Fruits</label>
  <div class="ms-trigger" id="ms-trigger">
    <span class="ms-placeholder" id="ms-display">Choose...</span>
    <span class="ms-arrow">&#9662;</span>
  </div>
  <div class="ms-dropdown" id="ms-dropdown">
    <input class="ms-search" id="ms-search" placeholder="Search..." />
    <label class="ms-option">
      <input type="checkbox" value="__all" />
      Select All
    </label>
    <label class="ms-option">
      <input type="checkbox" value="apple" />
      Apple
    </label>
    <label class="ms-option">
      <input type="checkbox" value="banana" />
      Banana
    </label>
    <label class="ms-option">
      <input type="checkbox" value="cherry" />
      Cherry
    </label>
    <label class="ms-option">
      <input type="checkbox" value="grape" />
      Grape
    </label>
    <label class="ms-option">
      <input type="checkbox" value="mango" />
      Mango
    </label>
    <label class="ms-option">
      <input type="checkbox" value="orange" />
      Orange
    </label>
  </div>
</div>
      `,
      css: `
.ms-wrap {
  position: relative;
  max-width: 320px;
}
.ms-label {
  display: block;
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 6px;
}
.ms-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  cursor: pointer;
  color: #e0e0e0;
  font-size: 14px;
}
.ms-trigger:hover {
  border-color: #4fc3f7;
}
.ms-arrow {
  font-size: 12px;
  color: #64748b;
}
.ms-dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 6px;
  z-index: 10;
  max-height: 220px;
  overflow-y: auto;
}
.ms-dropdown.open {
  display: block;
}
.ms-search {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #334155;
  border-radius: 6px;
  background: #0f172a;
  color: #e0e0e0;
  font-size: 13px;
  margin-bottom: 4px;
  outline: none;
}
.ms-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #e0e0e0;
}
.ms-option:hover {
  background: #334155;
}
.ms-option input {
  accent-color: #4fc3f7;
}
      `,
      js: `
const trigger = document.getElementById('ms-trigger'),
  dd = document.getElementById('ms-dropdown'),
  display = document.getElementById('ms-display'),
  search = document.getElementById('ms-search');
let selected = new Set();
trigger.addEventListener('click', () => dd.classList.toggle('open'));
document.addEventListener('click', (e) => {
  if (!document.getElementById('ms-wrap').contains(e.target))
    dd.classList.remove('open');
});
search.addEventListener('input', () => {
  const q = search.value.toLowerCase();
  dd.querySelectorAll('.ms-option').forEach((o) => {
    if (o.querySelector('input').value === '__all') {
      o.style.display = '';
      return;
    }
    o.style.display = o.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
});
dd.addEventListener('change', (e) => {
  const cb = e.target;
  if (cb.value === '__all') {
    const checks = dd.querySelectorAll('.ms-option input:not([value="__all"])');
    checks.forEach((c) => {
      c.checked = cb.checked;
      if (cb.checked) selected.add(c.value);
      else selected.delete(c.value);
    });
  } else {
    if (cb.checked) selected.add(cb.value);
    else selected.delete(cb.value);
  }
  display.textContent = selected.size ? [...selected].join(', ') : 'Choose...';
});
      `,
    },
  },
  {
    id: 'js-otp-input',
    title: 'OTP Input',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create a one-time password input with auto-focus, paste support, and backspace navigation for verification codes.',
    concepts: ['Input events', 'Focus management', 'Clipboard API', 'Keyboard navigation'],
    demoCode: {
      html: `
<div class="otp-wrap">
  <p class="otp-title">Enter verification code</p>
  <div class="otp-inputs" id="otp-inputs"></div>
  <p class="otp-result" id="otp-result"></p>
</div>
      `,
      css: `
.otp-wrap {
  text-align: center;
}
.otp-title {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 12px;
}
.otp-inputs {
  display: inline-flex;
  gap: 8px;
}
.otp-input {
  width: 44px;
  height: 52px;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  background: #1e293b;
  border: 2px solid #334155;
  border-radius: 8px;
  color: #e0e0e0;
  outline: none;
  transition: border-color 0.2s;
}
.otp-input:focus {
  border-color: #4fc3f7;
}
.otp-input.filled {
  border-color: #4fc3f7;
  background: #1a2744;
}
.otp-result {
  font-size: 13px;
  color: #4fc3f7;
  margin-top: 12px;
  min-height: 20px;
}
      `,
      js: `
const container = document.getElementById('otp-inputs'),
  result = document.getElementById('otp-result'),
  len = 6;
for (let i = 0; i < len; i++) {
  const inp = document.createElement('input');
  inp.className = 'otp-input';
  inp.type = 'text';
  inp.maxLength = 1;
  inp.inputMode = 'numeric';
  inp.dataset.idx = i;
  container.appendChild(inp);
}
const inputs = container.querySelectorAll('.otp-input');
function check() {
  const code = [...inputs].map((i) => i.value).join('');
  if (code.length === len) result.textContent = 'Code: ' + code;
  else result.textContent = '';
}
inputs.forEach((inp, i) => {
  inp.addEventListener('input', () => {
    inp.value = inp.value.replace(/[^0-9]/g, '');
    inp.classList.toggle('filled', !!inp.value);
    if (inp.value && i < len - 1) inputs[i + 1].focus();
    check();
  });
  inp.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !inp.value && i > 0) {
      inputs[i - 1].focus();
      inputs[i - 1].value = '';
      inputs[i - 1].classList.remove('filled');
    }
  });
  inp.addEventListener('paste', (e) => {
    e.preventDefault();
    const data = e.clipboardData
      .getData('text')
      .replace(/[^0-9]/g, '')
      .slice(0, len);
    [...data].forEach((c, j) => {
      if (inputs[j]) {
        inputs[j].value = c;
        inputs[j].classList.add('filled');
      }
    });
    if (data.length > 0) inputs[Math.min(data.length, len - 1)].focus();
    check();
  });
});
inputs[0].focus();
      `,
    },
  },
  {
    id: 'js-credit-card-input',
    title: 'Credit Card Input',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a credit card form with real-time formatting, card type detection, and visual card preview using input masking.',
    concepts: ['Input masking', 'RegExp', 'Real-time validation', 'CSS transforms'],
    demoCode: {
      html: `
<div class="cc-wrap">
  <div class="cc-card" id="cc-card">
    <div class="cc-number" id="cc-display">**** **** **** ****</div>
    <div class="cc-bottom">
      <span id="cc-name-display">CARDHOLDER</span>
      <span id="cc-exp-display">MM/YY</span>
    </div>
  </div>
  <div class="cc-form">
    <input id="cc-number" placeholder="Card Number" maxlength="19" />
    <input id="cc-name" placeholder="Name on Card" />
    <div class="cc-row">
      <input id="cc-exp" placeholder="MM/YY" maxlength="5" />
      <input id="cc-cvv" placeholder="CVV" maxlength="3" type="password" />
    </div>
  </div>
</div>
      `,
      css: `
.cc-wrap {
  max-width: 340px;
}
.cc-card {
  background: linear-gradient(135deg, #1e3a5f, #4fc3f7);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  color: #fff;
  font-family: monospace;
}
.cc-number {
  font-size: 18px;
  letter-spacing: 2px;
  margin-bottom: 16px;
}
.cc-bottom {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  text-transform: uppercase;
}
.cc-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cc-form input {
  padding: 10px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 14px;
  outline: none;
}
.cc-form input:focus {
  border-color: #4fc3f7;
}
.cc-row {
  display: flex;
  gap: 8px;
}
.cc-row input {
  flex: 1;
}
      `,
      js: `
const numIn = document.getElementById('cc-number'),
  nameIn = document.getElementById('cc-name'),
  expIn = document.getElementById('cc-exp'),
  numD = document.getElementById('cc-display'),
  nameD = document.getElementById('cc-name-display'),
  expD = document.getElementById('cc-exp-display');
numIn.addEventListener('input', () => {
  let v = numIn.value.replace(/\\D/g, '').slice(0, 16);
  numIn.value = v.replace(/(\\d{4})(?=\\d)/g, '$1 ');
  numD.textContent = numIn.value || '**** **** **** ****';
});
nameIn.addEventListener('input', () => {
  nameD.textContent = nameIn.value.toUpperCase() || 'CARDHOLDER';
});
expIn.addEventListener('input', () => {
  let v = expIn.value.replace(/\\D/g, '').slice(0, 4);
  if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
  expIn.value = v;
  expD.textContent = v || 'MM/YY';
});
      `,
    },
  },
  {
    id: 'js-address-form',
    title: 'Address Form',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build a structured address form with dependent dropdowns for country/state, auto-formatting, and real-time preview.',
    concepts: ['Dependent selects', 'Form data', 'DOM updates', 'Input formatting'],
    demoCode: {
      html: `
<div class="af-wrap">
  <h3 class="af-title">Shipping Address</h3>
  <form id="af-form">
    <input id="af-street" placeholder="Street Address" />
    <input id="af-city" placeholder="City" />
    <div class="af-row">
      <select id="af-country">
        <option value="">Country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
      </select>
      <select id="af-state">
        <option value="">State/Province</option>
      </select>
    </div>
    <input id="af-zip" placeholder="ZIP / Postal Code" maxlength="10" />
    <div class="af-preview" id="af-preview">Fill in the form above</div>
  </form>
</div>
      `,
      css: `
.af-wrap {
  max-width: 380px;
}
.af-title {
  font-size: 16px;
  color: #e0e0e0;
  margin-bottom: 12px;
}
.af-wrap input,
.af-wrap select {
  width: 100%;
  padding: 10px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 14px;
  outline: none;
  margin-bottom: 8px;
}
.af-wrap input:focus,
.af-wrap select:focus {
  border-color: #4fc3f7;
}
.af-row {
  display: flex;
  gap: 8px;
}
.af-row > * {
  flex: 1;
}
.af-preview {
  margin-top: 8px;
  padding: 12px;
  background: #0f172a;
  border-radius: 8px;
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.6;
}
      `,
      js: `
const states = {
  US: ['California', 'New York', 'Texas', 'Florida'],
  CA: ['Ontario', 'Quebec', 'British Columbia', 'Alberta'],
};
const country = document.getElementById('af-country'),
  state = document.getElementById('af-state'),
  preview = document.getElementById('af-preview');
country.addEventListener('change', () => {
  state.innerHTML = '<option value="">State/Province</option>';
  (states[country.value] || []).forEach((s) => {
    const o = document.createElement('option');
    o.value = s;
    o.textContent = s;
    state.appendChild(o);
  });
  update();
});
function update() {
  const parts = [
    document.getElementById('af-street').value,
    document.getElementById('af-city').value,
    state.value,
    country.selectedOptions[0]?.textContent,
    document.getElementById('af-zip').value,
  ].filter(Boolean);
  preview.textContent = parts.length
    ? parts.join(', ')
    : 'Fill in the form above';
}
document.getElementById('af-form').addEventListener('input', update);
      `,
    },
  },
  {
    id: 'js-survey-form',
    title: 'Survey Form',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create a multi-question survey form with radio buttons, checkboxes, text areas, and a progress indicator showing completion.',
    concepts: ['Radio/checkbox groups', 'Form progress', 'Validation', 'Event delegation'],
    demoCode: {
      html: `
<div class="sv-wrap">
  <div class="sv-progress"><div class="sv-bar" id="sv-bar"></div></div>
  <p class="sv-ptext" id="sv-ptext">0% complete</p>
  <form id="sv-form">
    <fieldset class="sv-q">
      <legend>1. How satisfied are you?</legend>
      <label>
        <input type="radio" name="q1" value="very" />
        Very satisfied
      </label>
      <label>
        <input type="radio" name="q1" value="somewhat" />
        Somewhat
      </label>
      <label>
        <input type="radio" name="q1" value="not" />
        Not satisfied
      </label>
    </fieldset>
    <fieldset class="sv-q">
      <legend>2. What features do you use?</legend>
      <label>
        <input type="checkbox" name="q2" value="search" />
        Search
      </label>
      <label>
        <input type="checkbox" name="q2" value="filter" />
        Filters
      </label>
      <label>
        <input type="checkbox" name="q2" value="export" />
        Export
      </label>
    </fieldset>
    <fieldset class="sv-q">
      <legend>3. Any feedback?</legend>
      <textarea
        id="sv-feedback"
        rows="3"
        placeholder="Your thoughts..."
      ></textarea>
    </fieldset>
    <button type="submit">Submit</button>
  </form>
</div>
      `,
      css: `
.sv-wrap {
  max-width: 400px;
}
.sv-progress {
  height: 6px;
  background: #1e293b;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 4px;
}
.sv-bar {
  height: 100%;
  width: 0;
  background: #4fc3f7;
  transition: width 0.3s;
}
.sv-ptext {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 12px;
}
.sv-q {
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
}
.sv-q legend {
  font-size: 14px;
  color: #e0e0e0;
  font-weight: 600;
}
.sv-q label {
  display: block;
  padding: 4px 0;
  font-size: 13px;
  color: #94a3b8;
  cursor: pointer;
}
.sv-q textarea {
  width: 100%;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #e0e0e0;
  padding: 8px;
  outline: none;
  font-size: 13px;
  resize: vertical;
}
.sv-q textarea:focus {
  border-color: #4fc3f7;
}
button {
  width: 100%;
  padding: 10px;
  background: #4fc3f7;
  color: #1a1a2e;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
button:hover {
  background: #81d4fa;
}
      `,
      js: `
const form = document.getElementById('sv-form'),
  bar = document.getElementById('sv-bar'),
  ptext = document.getElementById('sv-ptext');
function progress() {
  const q1 = form.querySelector('input[name="q1"]:checked');
  const q2 = form.querySelectorAll('input[name="q2"]:checked').length > 0;
  const q3 = document.getElementById('sv-feedback').value.trim().length > 0;
  const done = [!!q1, q2, q3].filter(Boolean).length;
  const pct = Math.round((done / 3) * 100);
  bar.style.width = pct + '%';
  ptext.textContent = pct + '% complete';
}
form.addEventListener('change', progress);
document.getElementById('sv-feedback').addEventListener('input', progress);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  ptext.textContent = 'Survey submitted!';
  ptext.style.color = '#4fc3f7';
});
      `,
    },
  },
  {
    id: 'js-textarea-autogrow',
    title: 'Textarea Auto-Grow',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build a textarea that automatically adjusts its height as the user types, with min/max height constraints and character counter.',
    concepts: ['scrollHeight', 'Resize observer', 'Input events', 'CSS constraints'],
    demoCode: {
      html: `
<div class="ag-wrap">
  <label class="ag-label">Message</label>
  <textarea
    id="ag-textarea"
    class="ag-textarea"
    placeholder="Start typing... the textarea will grow"
    rows="2"
  ></textarea>
  <div class="ag-footer">
    <span id="ag-count">0 characters</span>
    <span id="ag-lines">1 line</span>
  </div>
</div>
      `,
      css: `
.ag-wrap {
  max-width: 400px;
}
.ag-label {
  display: block;
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 6px;
}
.ag-textarea {
  width: 100%;
  padding: 10px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 14px;
  outline: none;
  resize: none;
  min-height: 60px;
  max-height: 200px;
  overflow-y: auto;
  line-height: 1.5;
  transition: border-color 0.2s;
}
.ag-textarea:focus {
  border-color: #4fc3f7;
}
.ag-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
}
      `,
      js: `
const ta = document.getElementById('ag-textarea'),
  count = document.getElementById('ag-count'),
  lines = document.getElementById('ag-lines');
function grow() {
  ta.style.height = 'auto';
  ta.style.height = Math.min(ta.scrollHeight, 200) + 'px';
  count.textContent = ta.value.length + ' characters';
  lines.textContent =
    ta.value.split('\\n').length +
    ' line' +
    (ta.value.split('\\n').length !== 1 ? 's' : '');
}
ta.addEventListener('input', grow);
grow();
      `,
    },
  },
  {
    id: 'js-phone-input',
    title: 'Phone Number Input',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create a phone number input with automatic formatting, country code prefix, and real-time validation feedback.',
    concepts: ['Input masking', 'RegExp formatting', 'Validation', 'Cursor management'],
    demoCode: {
      html: `
<div class="ph-wrap">
  <label class="ph-label">Phone Number</label>
  <div class="ph-row">
    <select id="ph-code">
      <option value="+1">+1 US</option>
      <option value="+44">+44 UK</option>
      <option value="+81">+81 JP</option>
      <option value="+91">+91 IN</option>
    </select>
    <input id="ph-input" type="tel" placeholder="(555) 123-4567" />
  </div>
  <p class="ph-status" id="ph-status"></p>
</div>
      `,
      css: `
.ph-wrap {
  max-width: 340px;
}
.ph-label {
  display: block;
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 6px;
}
.ph-row {
  display: flex;
  gap: 8px;
}
.ph-row select {
  padding: 10px 8px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 13px;
  outline: none;
}
.ph-row select:focus {
  border-color: #4fc3f7;
}
.ph-row input {
  flex: 1;
  padding: 10px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 14px;
  outline: none;
}
.ph-row input:focus {
  border-color: #4fc3f7;
}
.ph-status {
  font-size: 12px;
  margin-top: 6px;
  min-height: 18px;
}
      `,
      js: `
const input = document.getElementById('ph-input'),
  status = document.getElementById('ph-status');
function fmt(v) {
  const d = v.replace(/\\D/g, '').slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return '(' + d.slice(0, 3) + ') ' + d.slice(3);
  return '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6);
}
input.addEventListener('input', () => {
  const raw = input.value.replace(/\\D/g, '');
  input.value = fmt(input.value);
  if (raw.length === 10) {
    status.textContent = 'Valid phone number';
    status.style.color = '#4ade80';
  } else if (raw.length > 0) {
    status.textContent = 'Enter 10 digits';
    status.style.color = '#facc15';
  } else {
    status.textContent = '';
  }
});
      `,
    },
  },
  {
    id: 'js-currency-input',
    title: 'Currency Input',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build a currency input field with real-time formatting, currency symbol prefix, thousand separators, and decimal handling.',
    concepts: ['Intl.NumberFormat', 'Input events', 'Formatting', 'Locale support'],
    demoCode: {
      html: `
<div class="ci-wrap">
  <label class="ci-label">Amount</label>
  <div class="ci-row">
    <select id="ci-currency">
      <option value="USD">$ USD</option>
      <option value="EUR">&#8364; EUR</option>
      <option value="GBP">&#163; GBP</option>
    </select>
    <input id="ci-input" type="text" placeholder="0.00" />
  </div>
  <p class="ci-formatted" id="ci-formatted"></p>
</div>
      `,
      css: `
.ci-wrap {
  max-width: 340px;
}
.ci-label {
  display: block;
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 6px;
}
.ci-row {
  display: flex;
  gap: 8px;
}
.ci-row select {
  padding: 10px 8px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 13px;
  outline: none;
}
.ci-row select:focus {
  border-color: #4fc3f7;
}
.ci-row input {
  flex: 1;
  padding: 10px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 16px;
  font-weight: 600;
  outline: none;
  text-align: right;
}
.ci-row input:focus {
  border-color: #4fc3f7;
}
.ci-formatted {
  font-size: 13px;
  color: #4fc3f7;
  margin-top: 8px;
  text-align: right;
  min-height: 20px;
}
      `,
      js: `
const input = document.getElementById('ci-input'),
  cur = document.getElementById('ci-currency'),
  display = document.getElementById('ci-formatted');
function format() {
  const raw = input.value.replace(/[^0-9.]/g, '');
  const num = parseFloat(raw);
  if (isNaN(num)) {
    display.textContent = '';
    return;
  }
  try {
    display.textContent = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: cur.value,
    }).format(num);
  } catch (e) {
    display.textContent = raw;
  }
}
input.addEventListener('input', format);
cur.addEventListener('change', format);
      `,
    },
  },
  {
    id: 'js-slider-range',
    title: 'Range Slider',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a dual-handle range slider for selecting min/max values with real-time labels and a filled track between handles.',
    concepts: ['Range inputs', 'CSS custom properties', 'Input events', 'Constraint logic'],
    demoCode: {
      html: `
<div class="sr-wrap">
  <label class="sr-label">Price Range</label>
  <div class="sr-values">
    <span id="sr-min-val">$20</span>
    <span id="sr-max-val">$80</span>
  </div>
  <div class="sr-track">
    <input type="range" id="sr-min" min="0" max="100" value="20" />
    <input type="range" id="sr-max" min="0" max="100" value="80" />
    <div class="sr-fill" id="sr-fill"></div>
  </div>
</div>
      `,
      css: `
.sr-wrap {
  max-width: 360px;
}
.sr-label {
  display: block;
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 8px;
}
.sr-values {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #4fc3f7;
  font-weight: 600;
  margin-bottom: 8px;
}
.sr-track {
  position: relative;
  height: 36px;
}
.sr-track input[type="range"] {
  position: absolute;
  width: 100%;
  top: 8px;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  pointer-events: none;
  height: 6px;
}
.sr-track input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: #4fc3f7;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  border: 2px solid #1a1a2e;
}
.sr-fill {
  position: absolute;
  top: 14px;
  height: 6px;
  background: #4fc3f7;
  border-radius: 3px;
  pointer-events: none;
}
.sr-track::before {
  content: "";
  position: absolute;
  top: 14px;
  left: 0;
  right: 0;
  height: 6px;
  background: #334155;
  border-radius: 3px;
}
      `,
      js: `
const mn = document.getElementById('sr-min'),
  mx = document.getElementById('sr-max'),
  fill = document.getElementById('sr-fill'),
  mnV = document.getElementById('sr-min-val'),
  mxV = document.getElementById('sr-max-val');
function update() {
  let lo = +mn.value,
    hi = +mx.value;
  if (lo > hi) {
    mn.value = hi;
    mx.value = lo;
    lo = hi;
    hi = +mx.value;
  }
  mnV.textContent = '$' + lo;
  mxV.textContent = '$' + hi;
  fill.style.left = lo + '%';
  fill.style.width = hi - lo + '%';
}
mn.addEventListener('input', update);
mx.addEventListener('input', update);
update();
      `,
    },
  },
  {
    id: 'js-toggle-group',
    title: 'Toggle Group',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create a button toggle group allowing single or multi-selection with visual active states and keyboard navigation.',
    concepts: ['Button groups', 'classList', 'ARIA', 'State management'],
    demoCode: {
      html: `
<div class="tg-wrap">
  <p class="tg-label">View Mode</p>
  <div class="tg-group" id="tg-single" role="radiogroup">
    <button class="tg-btn active" data-val="grid" aria-pressed="true">
      Grid
    </button>
    <button class="tg-btn" data-val="list" aria-pressed="false">List</button>
    <button class="tg-btn" data-val="table" aria-pressed="false">Table</button>
  </div>
  <p class="tg-label" style="margin-top: 16px">Features (multi)</p>
  <div class="tg-group" id="tg-multi" data-multi="true">
    <button class="tg-btn" data-val="bold">B</button>
    <button class="tg-btn" data-val="italic">I</button>
    <button class="tg-btn" data-val="underline">U</button>
  </div>
  <p class="tg-status" id="tg-status"></p>
</div>
      `,
      css: `
.tg-wrap {
  max-width: 360px;
}
.tg-label {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 8px;
}
.tg-group {
  display: inline-flex;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
}
.tg-btn {
  padding: 8px 16px;
  background: #1e293b;
  border: none;
  color: #94a3b8;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s;
  border-right: 1px solid #334155;
}
.tg-btn:last-child {
  border-right: none;
}
.tg-btn:hover {
  background: #293548;
}
.tg-btn.active {
  background: #4fc3f7;
  color: #1a1a2e;
  font-weight: 600;
}
.tg-status {
  font-size: 12px;
  color: #64748b;
  margin-top: 8px;
  min-height: 18px;
}
      `,
      js: `
const status = document.getElementById('tg-status');
document.getElementById('tg-single').addEventListener('click', (e) => {
  const btn = e.target.closest('.tg-btn');
  if (!btn) return;
  btn.parentElement.querySelectorAll('.tg-btn').forEach((b) => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');
  status.textContent = 'View: ' + btn.dataset.val;
});
document.getElementById('tg-multi').addEventListener('click', (e) => {
  const btn = e.target.closest('.tg-btn');
  if (!btn) return;
  btn.classList.toggle('active');
  const sel = [...btn.parentElement.querySelectorAll('.tg-btn.active')].map(
    (b) => b.dataset.val,
  );
  status.textContent = sel.length
    ? 'Format: ' + sel.join(', ')
    : 'No formatting';
});
      `,
    },
  },
  {
    id: 'js-segmented-control',
    title: 'Segmented Control',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build an iOS-style segmented control with animated sliding indicator, keyboard support, and content switching.',
    concepts: ['CSS transforms', 'offsetLeft', 'Transitions', 'Content switching'],
    demoCode: {
      html: `
<div class="sc-wrap">
  <div class="sc-control" id="sc-control">
    <div class="sc-indicator" id="sc-ind"></div>
    <button class="sc-btn active" data-idx="0">Daily</button>
    <button class="sc-btn" data-idx="1">Weekly</button>
    <button class="sc-btn" data-idx="2">Monthly</button>
  </div>
  <div class="sc-content" id="sc-content">
    <div class="sc-panel active">Daily view: 24 tasks completed</div>
    <div class="sc-panel">Weekly view: 142 tasks completed</div>
    <div class="sc-panel">Monthly view: 580 tasks completed</div>
  </div>
</div>
      `,
      css: `
.sc-wrap {
  max-width: 360px;
}
.sc-control {
  position: relative;
  display: flex;
  background: #1e293b;
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
}
.sc-indicator {
  position: absolute;
  top: 3px;
  bottom: 3px;
  background: #4fc3f7;
  border-radius: 6px;
  transition:
    left 0.25s,
    width 0.25s;
}
.sc-btn {
  flex: 1;
  position: relative;
  z-index: 1;
  padding: 8px 12px;
  border: none;
  background: transparent;
  color: #94a3b8;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  transition: color 0.2s;
}
.sc-btn.active {
  color: #1a1a2e;
}
.sc-content {
  margin-top: 12px;
}
.sc-panel {
  display: none;
  padding: 16px;
  background: #1e293b;
  border-radius: 8px;
  font-size: 14px;
  color: #e0e0e0;
}
.sc-panel.active {
  display: block;
}
      `,
      js: `
const ctrl = document.getElementById('sc-control'),
  ind = document.getElementById('sc-ind'),
  panels = document.querySelectorAll('.sc-panel'),
  btns = ctrl.querySelectorAll('.sc-btn');
function activate(idx) {
  btns.forEach((b, i) => {
    b.classList.toggle('active', i === idx);
  });
  panels.forEach((p, i) => p.classList.toggle('active', i === idx));
  const ab = btns[idx];
  ind.style.left = ab.offsetLeft + 'px';
  ind.style.width = ab.offsetWidth + 'px';
}
ctrl.addEventListener('click', (e) => {
  const btn = e.target.closest('.sc-btn');
  if (btn) activate(+btn.dataset.idx);
});
activate(0);
      `,
    },
  },
  {
    id: 'js-combobox',
    title: 'Combobox',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Build a fully accessible combobox with editable input, filtered listbox, ARIA roles, and complete keyboard navigation.',
    concepts: ['ARIA combobox pattern', 'Keyboard navigation', 'Focus management', 'Filtering'],
    demoCode: {
      html: `
<div class="cb-wrap">
  <label id="cb-label" class="cb-lbl">Select a color</label>
  <div class="cb-container">
    <input
      id="cb-input"
      type="text"
      role="combobox"
      aria-expanded="false"
      aria-controls="cb-list"
      aria-labelledby="cb-label"
      aria-autocomplete="list"
      placeholder="Type or select..."
    />
    <button
      class="cb-toggle"
      id="cb-toggle"
      aria-label="Toggle list"
      tabindex="-1"
    >
      &#9662;
    </button>
    <ul id="cb-list" class="cb-list" role="listbox"></ul>
  </div>
</div>
      `,
      css: `
.cb-wrap {
  max-width: 300px;
}
.cb-lbl {
  display: block;
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 6px;
}
.cb-container {
  position: relative;
  display: flex;
}
.cb-container input {
  flex: 1;
  padding: 10px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px 0 0 8px;
  color: #e0e0e0;
  font-size: 14px;
  outline: none;
}
.cb-container input:focus {
  border-color: #4fc3f7;
}
.cb-toggle {
  padding: 10px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-left: none;
  border-radius: 0 8px 8px 0;
  color: #94a3b8;
  cursor: pointer;
  font-size: 14px;
}
.cb-toggle:hover {
  color: #4fc3f7;
}
.cb-list {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  list-style: none;
  padding: 4px;
  max-height: 180px;
  overflow-y: auto;
  z-index: 10;
}
.cb-list.open {
  display: block;
}
.cb-list li {
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #e0e0e0;
}
.cb-list li.active,
.cb-list li:hover {
  background: #334155;
}
.cb-list li[aria-selected="true"] {
  color: #4fc3f7;
  font-weight: 600;
}
      `,
      js: `
const colors = [
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Indigo',
  'Violet',
  'Cyan',
  'Magenta',
  'Teal',
  'Lime',
  'Pink',
];
const inp = document.getElementById('cb-input'),
  list = document.getElementById('cb-list'),
  toggle = document.getElementById('cb-toggle');
let idx = -1,
  filtered = colors;
function render(items) {
  list.innerHTML = '';
  idx = -1;
  filtered = items;
  items.forEach((c, i) => {
    const li = document.createElement('li');
    li.textContent = c;
    li.setAttribute('role', 'option');
    li.id = 'cb-opt-' + i;
    li.addEventListener('click', () => select(c));
    list.appendChild(li);
  });
}
function select(v) {
  inp.value = v;
  close();
}
function open() {
  list.classList.add('open');
  inp.setAttribute('aria-expanded', 'true');
  render(filtered);
}
function close() {
  list.classList.remove('open');
  inp.setAttribute('aria-expanded', 'false');
  idx = -1;
}
function hi(i) {
  list
    .querySelectorAll('li')
    .forEach((l, j) => l.classList.toggle('active', j === i));
  if (list.children[i]) list.children[i].scrollIntoView({ block: 'nearest' });
}
toggle.addEventListener('click', () =>
  list.classList.contains('open') ? close() : open(),
);
inp.addEventListener('input', () => {
  filtered = colors.filter((c) =>
    c.toLowerCase().includes(inp.value.toLowerCase()),
  );
  open();
  render(filtered);
});
inp.addEventListener('keydown', (e) => {
  if (
    !list.classList.contains('open') &&
    (e.key === 'ArrowDown' || e.key === 'ArrowUp')
  ) {
    open();
    return;
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    idx = Math.min(idx + 1, filtered.length - 1);
    hi(idx);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    idx = Math.max(idx - 1, 0);
    hi(idx);
  } else if (e.key === 'Enter' && idx >= 0) {
    e.preventDefault();
    select(filtered[idx]);
  } else if (e.key === 'Escape') close();
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('.cb-container')) close();
});
render(colors);
      `,
    },
  },
  {
    id: 'js-mentions-input',
    title: 'Mentions Input',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Create a text input that triggers a user mention dropdown when typing @, with filtering, keyboard selection, and highlighted mentions.',
    concepts: ['Caret position', 'Popup positioning', 'Text manipulation', 'Event handling'],
    demoCode: {
      html: `
<div class="mi-wrap">
  <label class="mi-label">Comment</label>
  <div class="mi-container">
    <textarea
      id="mi-input"
      class="mi-input"
      rows="3"
      placeholder="Type @ to mention someone..."
    ></textarea>
    <ul id="mi-dropdown" class="mi-dropdown"></ul>
  </div>
</div>
      `,
      css: `
.mi-wrap {
  max-width: 400px;
}
.mi-label {
  display: block;
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 6px;
}
.mi-container {
  position: relative;
}
.mi-input {
  width: 100%;
  padding: 10px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 14px;
  outline: none;
  resize: vertical;
  line-height: 1.5;
}
.mi-input:focus {
  border-color: #4fc3f7;
}
.mi-dropdown {
  display: none;
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  margin-bottom: 4px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  list-style: none;
  padding: 4px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
}
.mi-dropdown.open {
  display: block;
}
.mi-dropdown li {
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #e0e0e0;
}
.mi-dropdown li.active,
.mi-dropdown li:hover {
  background: #334155;
}
      `,
      js: `
const users = [
  'Alice',
  'Bob',
  'Charlie',
  'Diana',
  'Eve',
  'Frank',
  'Grace',
  'Henry',
];
const input = document.getElementById('mi-input'),
  dd = document.getElementById('mi-dropdown');
let mentioning = false,
  query = '',
  idx = -1,
  startPos = 0;
function show(items) {
  dd.innerHTML = '';
  idx = -1;
  if (!items.length) {
    dd.classList.remove('open');
    return;
  }
  items.forEach((u, i) => {
    const li = document.createElement('li');
    li.textContent = '@' + u;
    li.addEventListener('click', () => pick(u));
    dd.appendChild(li);
  });
  dd.classList.add('open');
}
function pick(u) {
  const v = input.value;
  input.value =
    v.slice(0, startPos) + '@' + u + ' ' + v.slice(input.selectionStart);
  input.focus();
  dd.classList.remove('open');
  mentioning = false;
}
input.addEventListener('input', () => {
  const v = input.value,
    pos = input.selectionStart;
  const before = v.slice(0, pos);
  const atIdx = before.lastIndexOf('@');
  if (
    atIdx >= 0 &&
    (atIdx === 0 || before[atIdx - 1] === ' ' || before[atIdx - 1] === '\\n')
  ) {
    mentioning = true;
    startPos = atIdx;
    query = before.slice(atIdx + 1);
    const filtered = users.filter((u) =>
      u.toLowerCase().startsWith(query.toLowerCase()),
    );
    show(filtered);
  } else {
    mentioning = false;
    dd.classList.remove('open');
  }
});
input.addEventListener('keydown', (e) => {
  if (!dd.classList.contains('open')) return;
  const items = dd.querySelectorAll('li');
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    idx = Math.min(idx + 1, items.length - 1);
    items.forEach((l, j) => l.classList.toggle('active', j === idx));
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    idx = Math.max(idx - 1, 0);
    items.forEach((l, j) => l.classList.toggle('active', j === idx));
  } else if (e.key === 'Enter' && idx >= 0) {
    e.preventDefault();
    pick(
      users.filter((u) => u.toLowerCase().startsWith(query.toLowerCase()))[idx],
    );
  } else if (e.key === 'Escape') {
    dd.classList.remove('open');
    mentioning = false;
  }
});
      `,
    },
  },
  {
    id: 'js-code-input',
    title: 'Code Input',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Build a simple code editor textarea with line numbers, tab indentation, auto-indent on Enter, and basic syntax highlighting preview.',
    concepts: ['Line numbering', 'Tab handling', 'keydown events', 'Scroll synchronization'],
    demoCode: {
      html: `
<div class="ce-wrap">
  <div class="ce-editor">
    <div class="ce-lines" id="ce-lines">1</div>
    <textarea
      id="ce-code"
      class="ce-code"
      spellcheck="false"
      placeholder="Write some code..."
    >
function hello() {\n  return 'world';\n}</textarea
    >
  </div>
</div>
      `,
      css: `
.ce-wrap {
  max-width: 500px;
}
.ce-editor {
  display: flex;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
  font-family: "Courier New", monospace;
  font-size: 14px;
  line-height: 1.6;
}
.ce-lines {
  padding: 10px 8px;
  background: #1e293b;
  color: #475569;
  text-align: right;
  user-select: none;
  min-width: 36px;
}
.ce-code {
  flex: 1;
  padding: 10px 12px;
  background: transparent;
  border: none;
  color: #e0e0e0;
  outline: none;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  tab-size: 2;
  white-space: pre;
}
      `,
      js: `
const code = document.getElementById('ce-code'),
  lines = document.getElementById('ce-lines');
function updateLines() {
  const n = code.value.split('\\n').length;
  lines.textContent = Array.from({ length: n }, (_, i) => i + 1).join('\\n');
}
code.addEventListener('input', updateLines);
code.addEventListener('scroll', () => {
  lines.scrollTop = code.scrollTop;
});
code.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const s = code.selectionStart,
      en = code.selectionEnd;
    code.value = code.value.substring(0, s) + '  ' + code.value.substring(en);
    code.selectionStart = code.selectionEnd = s + 2;
    updateLines();
  }
  if (e.key === 'Enter') {
    const s = code.selectionStart;
    const line = code.value.substring(0, s).split('\\n').pop();
    const indent = line.match(/^\\s*/)[0];
    setTimeout(() => {
      const pos = code.selectionStart;
      code.value =
        code.value.substring(0, pos) + indent + code.value.substring(pos);
      code.selectionStart = code.selectionEnd = pos + indent.length;
      updateLines();
    }, 0);
  }
});
updateLines();
      `,
    },
  },
  {
    id: 'js-signature-pad',
    title: 'Signature Pad',
    category: 'forms-input',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create a canvas-based signature pad with smooth drawing, touch support, undo functionality, and export to PNG.',
    concepts: ['Canvas API', 'Mouse/touch events', 'Drawing paths', 'toDataURL'],
    demoCode: {
      html: `
<div class="sp-wrap">
  <label class="sp-label">Draw your signature</label>
  <canvas id="sp-canvas" class="sp-canvas" width="400" height="160"></canvas>
  <div class="sp-actions">
    <button id="sp-undo" class="sp-btn">Undo</button>
    <button id="sp-clear" class="sp-btn">Clear</button>
  </div>
</div>
      `,
      css: `
.sp-wrap {
  max-width: 420px;
}
.sp-label {
  display: block;
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 6px;
}
.sp-canvas {
  width: 100%;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  cursor: crosshair;
  touch-action: none;
}
.sp-actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
.sp-btn {
  flex: 1;
  padding: 8px;
  background: #334155;
  border: none;
  border-radius: 6px;
  color: #e0e0e0;
  font-size: 13px;
  cursor: pointer;
}
.sp-btn:hover {
  background: #475569;
}
      `,
      js: `
const canvas = document.getElementById('sp-canvas'),
  ctx = canvas.getContext('2d');
let drawing = false,
  strokes = [],
  current = [];
ctx.strokeStyle = '#4fc3f7';
ctx.lineWidth = 2;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
function getPos(e) {
  const r = canvas.getBoundingClientRect();
  const t = e.touches ? e.touches[0] : e;
  return { x: t.clientX - r.left, y: t.clientY - r.top };
}
function start(e) {
  drawing = true;
  current = [getPos(e)];
  e.preventDefault();
}
function move(e) {
  if (!drawing) return;
  const p = getPos(e);
  current.push(p);
  ctx.beginPath();
  ctx.moveTo(current[current.length - 2].x, current[current.length - 2].y);
  ctx.lineTo(p.x, p.y);
  ctx.stroke();
  e.preventDefault();
}
function end() {
  if (!drawing) return;
  drawing = false;
  if (current.length) strokes.push([...current]);
  current = [];
}
function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  strokes.forEach((s) => {
    if (s.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(s[0].x, s[0].y);
    for (let i = 1; i < s.length; i++) ctx.lineTo(s[i].x, s[i].y);
    ctx.stroke();
  });
}
canvas.addEventListener('mousedown', start);
canvas.addEventListener('mousemove', move);
canvas.addEventListener('mouseup', end);
canvas.addEventListener('mouseleave', end);
canvas.addEventListener('touchstart', start);
canvas.addEventListener('touchmove', move);
canvas.addEventListener('touchend', end);
document.getElementById('sp-undo').addEventListener('click', () => {
  strokes.pop();
  redraw();
});
document.getElementById('sp-clear').addEventListener('click', () => {
  strokes = [];
  redraw();
});
      `,
    },
  },
  // --- interactive ---
  {
    id: 'js-tooltip',
    title: 'Tooltip',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build customizable tooltips with multiple placement options, arrow indicators, and smooth fade animations using pure CSS and JS.',
    concepts: ['Positioning', 'getBoundingClientRect', 'CSS transitions', 'Mouse events'],
    demoCode: {
      html: `
<div class="tt-wrap">
  <button class="tt-trigger" data-tip="Tooltip on top" data-pos="top">
    Top
  </button>
  <button class="tt-trigger" data-tip="Tooltip on right" data-pos="right">
    Right
  </button>
  <button class="tt-trigger" data-tip="Tooltip on bottom" data-pos="bottom">
    Bottom
  </button>
  <button class="tt-trigger" data-tip="Tooltip on left" data-pos="left">
    Left
  </button>
  <div class="tt-tooltip" id="tt-tooltip"></div>
</div>
      `,
      css: `
.tt-wrap {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 40px 20px;
  position: relative;
}
.tt-trigger {
  padding: 10px 20px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 14px;
  cursor: pointer;
}
.tt-trigger:hover {
  border-color: #4fc3f7;
}
.tt-tooltip {
  position: fixed;
  padding: 6px 12px;
  background: #334155;
  color: #e0e0e0;
  font-size: 12px;
  border-radius: 6px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s;
  z-index: 100;
  white-space: nowrap;
}
      `,
      js: `
const tip = document.getElementById('tt-tooltip');
document.querySelectorAll('.tt-trigger').forEach((btn) => {
  btn.addEventListener('mouseenter', () => {
    const r = btn.getBoundingClientRect(),
      pos = btn.dataset.pos;
    tip.textContent = btn.dataset.tip;
    tip.style.opacity = '1';
    const tw = tip.offsetWidth,
      th = tip.offsetHeight,
      gap = 8;
    switch (pos) {
      case 'top':
        tip.style.left = r.left + r.width / 2 - tw / 2 + 'px';
        tip.style.top = r.top - th - gap + 'px';
        break;
      case 'bottom':
        tip.style.left = r.left + r.width / 2 - tw / 2 + 'px';
        tip.style.top = r.bottom + gap + 'px';
        break;
      case 'left':
        tip.style.left = r.left - tw - gap + 'px';
        tip.style.top = r.top + r.height / 2 - th / 2 + 'px';
        break;
      case 'right':
        tip.style.left = r.right + gap + 'px';
        tip.style.top = r.top + r.height / 2 - th / 2 + 'px';
        break;
    }
  });
  btn.addEventListener('mouseleave', () => {
    tip.style.opacity = '0';
  });
});
      `,
    },
  },
  {
    id: 'js-popover',
    title: 'Popover',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create click-triggered popovers with rich content, auto-positioning, outside-click dismissal, and focus trapping.',
    concepts: ['Click outside', 'Positioning logic', 'Focus trap', 'ARIA popover'],
    demoCode: {
      html: `
<div class="po-wrap">
  <button class="po-trigger" id="po-btn">Show Popover</button>
  <div class="po-popover" id="po-popover">
    <div class="po-header">Settings</div>
    <div class="po-body">
      <label class="po-opt">
        <input type="checkbox" checked />
        Notifications
      </label>
      <label class="po-opt">
        <input type="checkbox" />
        Dark mode
      </label>
      <label class="po-opt">
        <input type="checkbox" checked />
        Auto-save
      </label>
    </div>
    <div class="po-footer">
      <button class="po-close" id="po-close">Done</button>
    </div>
  </div>
</div>
      `,
      css: `
.po-wrap {
  position: relative;
  display: inline-block;
}
.po-trigger {
  padding: 10px 20px;
  background: #4fc3f7;
  color: #1a1a2e;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
}
.po-trigger:hover {
  background: #81d4fa;
}
.po-popover {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  width: 220px;
  z-index: 20;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
.po-popover.open {
  display: block;
}
.po-header {
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #e0e0e0;
  border-bottom: 1px solid #334155;
}
.po-body {
  padding: 8px 12px;
}
.po-opt {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  font-size: 13px;
  color: #94a3b8;
  cursor: pointer;
}
.po-opt input {
  accent-color: #4fc3f7;
}
.po-footer {
  padding: 8px 12px;
  border-top: 1px solid #334155;
}
.po-close {
  width: 100%;
  padding: 6px;
  background: #334155;
  border: none;
  border-radius: 6px;
  color: #e0e0e0;
  cursor: pointer;
  font-size: 13px;
}
.po-close:hover {
  background: #475569;
}
      `,
      js: `
const btn = document.getElementById('po-btn'),
  pop = document.getElementById('po-popover'),
  close = document.getElementById('po-close');
btn.addEventListener('click', () => pop.classList.toggle('open'));
close.addEventListener('click', () => pop.classList.remove('open'));
document.addEventListener('click', (e) => {
  if (!e.target.closest('.po-wrap')) pop.classList.remove('open');
});
      `,
    },
  },
  {
    id: 'js-lightbox',
    title: 'Lightbox',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build an image lightbox gallery with zoom overlay, navigation arrows, keyboard controls, and smooth transitions.',
    concepts: ['Overlay management', 'Keyboard navigation', 'CSS transitions', 'Image loading'],
    demoCode: {
      html: `
<div class="lb-wrap">
  <div class="lb-grid" id="lb-grid"></div>
  <div class="lb-overlay" id="lb-overlay">
    <button class="lb-close" id="lb-close">&times;</button>
    <button class="lb-nav lb-prev" id="lb-prev">&#8249;</button>
    <div class="lb-img-wrap">
      <div class="lb-img" id="lb-img"></div>
      <p class="lb-caption" id="lb-caption"></p>
    </div>
    <button class="lb-nav lb-next" id="lb-next">&#8250;</button>
  </div>
</div>
      `,
      css: `
.lb-wrap {
  max-width: 500px;
}
.lb-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.lb-thumb {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  transition: transform 0.2s;
}
.lb-thumb:hover {
  transform: scale(1.05);
}
.lb-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 100;
  align-items: center;
  justify-content: center;
}
.lb-overlay.open {
  display: flex;
}
.lb-close {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  color: #e0e0e0;
  font-size: 32px;
  cursor: pointer;
}
.lb-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #e0e0e0;
  font-size: 36px;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
}
.lb-prev {
  left: 12px;
}
.lb-next {
  right: 12px;
}
.lb-img-wrap {
  text-align: center;
}
.lb-img {
  width: 300px;
  height: 300px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  margin: 0 auto;
}
.lb-caption {
  color: #94a3b8;
  font-size: 14px;
  margin-top: 12px;
}
      `,
      js: `
const items = [
  { bg: '#1e3a5f', emoji: '🌊', cap: 'Ocean' },
  { bg: '#3b1f5e', emoji: '🌌', cap: 'Galaxy' },
  { bg: '#1f4a3b', emoji: '🌲', cap: 'Forest' },
  { bg: '#5e3b1f', emoji: '\\u{1F3DC}', cap: 'Desert' },
  { bg: '#1f3b5e', emoji: '❄', cap: 'Snow' },
  { bg: '#4a1f3b', emoji: '\\u{1F338}', cap: 'Blossom' },
];
const grid = document.getElementById('lb-grid'),
  overlay = document.getElementById('lb-overlay'),
  lbImg = document.getElementById('lb-img'),
  caption = document.getElementById('lb-caption');
let cur = 0;
items.forEach((item, i) => {
  const d = document.createElement('div');
  d.className = 'lb-thumb';
  d.style.background = item.bg;
  d.textContent = item.emoji;
  d.addEventListener('click', () => openLb(i));
  grid.appendChild(d);
});
function openLb(i) {
  cur = i;
  lbImg.style.background = items[i].bg;
  lbImg.textContent = items[i].emoji;
  caption.textContent = items[i].cap;
  overlay.classList.add('open');
}
function closeLb() {
  overlay.classList.remove('open');
}
document.getElementById('lb-close').addEventListener('click', closeLb);
document
  .getElementById('lb-prev')
  .addEventListener('click', () =>
    openLb((cur - 1 + items.length) % items.length),
  );
document
  .getElementById('lb-next')
  .addEventListener('click', () => openLb((cur + 1) % items.length));
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeLb();
});
document.addEventListener('keydown', (e) => {
  if (!overlay.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') openLb((cur - 1 + items.length) % items.length);
  if (e.key === 'ArrowRight') openLb((cur + 1) % items.length);
});
      `,
    },
  },
  {
    id: 'js-sortable-list',
    title: 'Sortable List',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create a drag-and-drop sortable list with visual drop indicators, smooth animations, and touch support.',
    concepts: ['Drag events', 'DOM reordering', 'CSS transitions', 'Touch events'],
    demoCode: {
      html: `
<div class="sl-wrap">
  <p class="sl-title">Drag to reorder</p>
  <ul class="sl-list" id="sl-list">
    <li class="sl-item" draggable="true">1. Learn HTML</li>
    <li class="sl-item" draggable="true">2. Learn CSS</li>
    <li class="sl-item" draggable="true">3. Learn JavaScript</li>
    <li class="sl-item" draggable="true">4. Build projects</li>
    <li class="sl-item" draggable="true">5. Get hired</li>
  </ul>
</div>
      `,
      css: `
.sl-wrap {
  max-width: 350px;
}
.sl-title {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 8px;
}
.sl-list {
  list-style: none;
  padding: 0;
}
.sl-item {
  padding: 12px 16px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  margin-bottom: 6px;
  cursor: grab;
  color: #e0e0e0;
  font-size: 14px;
  transition:
    transform 0.15s,
    opacity 0.15s,
    box-shadow 0.15s;
}
.sl-item:active {
  cursor: grabbing;
}
.sl-item.dragging {
  opacity: 0.4;
  transform: scale(0.97);
}
.sl-item.over {
  border-color: #4fc3f7;
  box-shadow: 0 0 0 2px rgba(79, 195, 247, 0.2);
}
      `,
      js: `
const list = document.getElementById('sl-list');
let dragEl = null;
list.addEventListener('dragstart', (e) => {
  dragEl = e.target;
  e.target.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
});
list.addEventListener('dragend', (e) => {
  e.target.classList.remove('dragging');
  list.querySelectorAll('.sl-item').forEach((i) => i.classList.remove('over'));
});
list.addEventListener('dragover', (e) => {
  e.preventDefault();
  const target = e.target.closest('.sl-item');
  if (target && target !== dragEl) {
    target.classList.add('over');
  }
});
list.addEventListener('dragleave', (e) => {
  const target = e.target.closest('.sl-item');
  if (target) target.classList.remove('over');
});
list.addEventListener('drop', (e) => {
  e.preventDefault();
  const target = e.target.closest('.sl-item');
  if (target && target !== dragEl) {
    const items = [...list.children];
    const dragIdx = items.indexOf(dragEl),
      dropIdx = items.indexOf(target);
    if (dragIdx < dropIdx) target.after(dragEl);
    else target.before(dragEl);
  }
  list.querySelectorAll('.sl-item').forEach((i) => i.classList.remove('over'));
});
      `,
    },
  },
  {
    id: 'js-resizable-panels',
    title: 'Resizable Panels',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a split-pane layout with draggable dividers that allow users to resize panels horizontally with min/max constraints.',
    concepts: ['Mouse tracking', 'Flex basis', 'Pointer events', 'Layout calculation'],
    demoCode: {
      html: `
<div class="rp-wrap">
  <div class="rp-container" id="rp-container">
    <div class="rp-panel" id="rp-left">
      <div class="rp-content">Left Panel</div>
    </div>
    <div class="rp-divider" id="rp-divider"></div>
    <div class="rp-panel" id="rp-right">
      <div class="rp-content">Right Panel</div>
    </div>
  </div>
</div>
      `,
      css: `
.rp-wrap {
  max-width: 500px;
}
.rp-container {
  display: flex;
  height: 200px;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
}
.rp-panel {
  overflow: auto;
  min-width: 60px;
}
.rp-content {
  padding: 16px;
  font-size: 14px;
  color: #e0e0e0;
}
#rp-left {
  flex: 1;
  background: #1e293b;
}
#rp-right {
  flex: 1;
  background: #0f172a;
}
.rp-divider {
  width: 6px;
  background: #334155;
  cursor: col-resize;
  flex-shrink: 0;
  transition: background 0.15s;
}
.rp-divider:hover,
.rp-divider.active {
  background: #4fc3f7;
}
      `,
      js: `
const container = document.getElementById('rp-container'),
  divider = document.getElementById('rp-divider'),
  left = document.getElementById('rp-left'),
  right = document.getElementById('rp-right');
let dragging = false;
divider.addEventListener('mousedown', () => {
  dragging = true;
  divider.classList.add('active');
  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';
});
document.addEventListener('mousemove', (e) => {
  if (!dragging) return;
  const rect = container.getBoundingClientRect();
  const pct = ((e.clientX - rect.left) / rect.width) * 100;
  const clamped = Math.max(15, Math.min(85, pct));
  left.style.flex = '0 0 ' + clamped + '%';
  right.style.flex = '1';
});
document.addEventListener('mouseup', () => {
  dragging = false;
  divider.classList.remove('active');
  document.body.style.cursor = '';
  document.body.style.userSelect = '';
});
      `,
    },
  },
  {
    id: 'js-split-view',
    title: 'Split View',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create a vertical split view editor with synchronized scrolling, like a markdown editor with live preview.',
    concepts: ['Scroll synchronization', 'innerHTML rendering', 'Split layout', 'Debouncing'],
    demoCode: {
      html: `
<div class="sv-wrap">
  <div class="sv-header">
    <span class="sv-tab active">Editor</span>
    <span class="sv-tab">Preview</span>
  </div>
  <div class="sv-panels">
    <textarea
      id="sv-editor"
      class="sv-editor"
      placeholder="Type markdown here..."
    >
## Hello World\n\nThis is a **live preview** split view.\n\n- Item one\n- Item two\n- Item three</textarea
    >
    <div id="sv-preview" class="sv-preview"></div>
  </div>
</div>
      `,
      css: `
.sv-wrap {
  max-width: 600px;
}
.sv-header {
  display: flex;
  gap: 2px;
  background: #0f172a;
  border-radius: 8px 8px 0 0;
  padding: 4px;
}
.sv-tab {
  flex: 1;
  text-align: center;
  padding: 6px;
  font-size: 12px;
  color: #64748b;
  background: #1e293b;
  border-radius: 4px;
}
.sv-tab.active {
  color: #4fc3f7;
}
.sv-panels {
  display: flex;
  gap: 1px;
  background: #334155;
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  height: 200px;
}
.sv-editor {
  flex: 1;
  padding: 12px;
  background: #1e293b;
  border: none;
  color: #e0e0e0;
  font-size: 13px;
  font-family: monospace;
  outline: none;
  resize: none;
  line-height: 1.6;
}
.sv-preview {
  flex: 1;
  padding: 12px;
  background: #0f172a;
  color: #e0e0e0;
  font-size: 13px;
  line-height: 1.6;
  overflow-y: auto;
}
.sv-preview h2 {
  font-size: 18px;
  color: #4fc3f7;
  margin: 0 0 8px;
}
.sv-preview strong {
  color: #4fc3f7;
}
.sv-preview ul {
  padding-left: 20px;
}
.sv-preview li {
  margin: 4px 0;
}
      `,
      js: `
const editor = document.getElementById('sv-editor');
const preview = document.getElementById('sv-preview');

function render() {
  let md = editor.value;
  md = md.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  md = md.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>');
  md = md.replace(/^- (.+)$/gm, '<li>$1</li>');
  md = md.replace(/(<li>.*<\\/li>)/s, (m) => '<ul>' + m + '</ul>');
  md = md.replace(/\\n\\n/g, '<br/><br/>');
  preview.innerHTML = md;
}

editor.addEventListener('input', render);

editor.addEventListener('scroll', () => {
  const pct = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
  preview.scrollTop = pct * (preview.scrollHeight - preview.clientHeight);
});

render();
      `,
    },
  },
  {
    id: 'js-kanban-board',
    title: 'Kanban Board',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Build a kanban board with drag-and-drop cards across columns, add/delete cards, and persistent state using localStorage.',
    concepts: ['Drag and Drop API', 'Column management', 'localStorage', 'Dynamic DOM'],
    demoCode: {
      html: `
<div class="kb-wrap">
  <div class="kb-board" id="kb-board">
    <div class="kb-col" data-col="todo">
      <div class="kb-col-header">
        To Do
        <button class="kb-add" data-col="todo">+</button>
      </div>
      <div class="kb-cards" data-col="todo">
        <div class="kb-card" draggable="true">Design mockups</div>
        <div class="kb-card" draggable="true">Write specs</div>
      </div>
    </div>
    <div class="kb-col" data-col="progress">
      <div class="kb-col-header">
        In Progress
        <button class="kb-add" data-col="progress">+</button>
      </div>
      <div class="kb-cards" data-col="progress">
        <div class="kb-card" draggable="true">Build API</div>
      </div>
    </div>
    <div class="kb-col" data-col="done">
      <div class="kb-col-header">
        Done
        <button class="kb-add" data-col="done">+</button>
      </div>
      <div class="kb-cards" data-col="done">
        <div class="kb-card" draggable="true">Setup repo</div>
      </div>
    </div>
  </div>
</div>
      `,
      css: `
.kb-wrap {
  overflow-x: auto;
}
.kb-board {
  display: flex;
  gap: 12px;
  min-width: 600px;
}
.kb-col {
  flex: 1;
  background: #0f172a;
  border-radius: 8px;
  padding: 8px;
  min-height: 200px;
}
.kb-col-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #94a3b8;
  border-bottom: 1px solid #334155;
  margin-bottom: 8px;
}
.kb-add {
  background: none;
  border: 1px solid #334155;
  color: #4fc3f7;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
}
.kb-cards {
  min-height: 100px;
}
.kb-card {
  padding: 10px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  margin-bottom: 6px;
  cursor: grab;
  color: #e0e0e0;
  font-size: 13px;
  transition: opacity 0.15s;
}
.kb-card.dragging {
  opacity: 0.4;
}
.kb-cards.drag-over {
  background: rgba(79, 195, 247, 0.05);
  border-radius: 6px;
}
      `,
      js: `
const board = document.getElementById('kb-board');
let dragCard = null;
board.addEventListener('dragstart', (e) => {
  if (!e.target.classList.contains('kb-card')) return;
  dragCard = e.target;
  e.target.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
});
board.addEventListener('dragend', (e) => {
  if (dragCard) dragCard.classList.remove('dragging');
  board
    .querySelectorAll('.kb-cards')
    .forEach((c) => c.classList.remove('drag-over'));
});
board.addEventListener('dragover', (e) => {
  e.preventDefault();
  const zone = e.target.closest('.kb-cards');
  if (zone) zone.classList.add('drag-over');
});
board.addEventListener('dragleave', (e) => {
  const zone = e.target.closest('.kb-cards');
  if (zone) zone.classList.remove('drag-over');
});
board.addEventListener('drop', (e) => {
  e.preventDefault();
  const zone = e.target.closest('.kb-cards');
  if (zone && dragCard) {
    zone.appendChild(dragCard);
  }
  board
    .querySelectorAll('.kb-cards')
    .forEach((c) => c.classList.remove('drag-over'));
});
board.querySelectorAll('.kb-add').forEach((btn) => {
  btn.addEventListener('click', () => {
    const col = btn.dataset.col;
    const cards = board.querySelector('.kb-cards[data-col="' + col + '"]');
    const card = document.createElement('div');
    card.className = 'kb-card';
    card.draggable = true;
    card.contentEditable = true;
    card.textContent = 'New task';
    cards.appendChild(card);
    card.focus();
  });
});
      `,
    },
  },
  {
    id: 'js-timeline',
    title: 'Timeline',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create a vertical timeline component with alternating items, connecting lines, animated entry on scroll, and status indicators.',
    concepts: ['CSS pseudo-elements', 'IntersectionObserver', 'Alternating layout', 'Animations'],
    demoCode: {
      html: `
<div class="tl-wrap" id="tl-wrap">
  <div class="tl-item">
    <div class="tl-dot done"></div>
    <div class="tl-content">
      <h4>Project Started</h4>
      <p>Initial setup and planning phase</p>
      <span class="tl-date">Jan 2024</span>
    </div>
  </div>
  <div class="tl-item">
    <div class="tl-dot done"></div>
    <div class="tl-content">
      <h4>Design Phase</h4>
      <p>UI/UX mockups completed</p>
      <span class="tl-date">Feb 2024</span>
    </div>
  </div>
  <div class="tl-item">
    <div class="tl-dot active"></div>
    <div class="tl-content">
      <h4>Development</h4>
      <p>Building core features</p>
      <span class="tl-date">Mar 2024</span>
    </div>
  </div>
  <div class="tl-item">
    <div class="tl-dot"></div>
    <div class="tl-content">
      <h4>Testing</h4>
      <p>QA and bug fixes</p>
      <span class="tl-date">Apr 2024</span>
    </div>
  </div>
</div>
      `,
      css: `
.tl-wrap {
  position: relative;
  padding-left: 24px;
  max-width: 400px;
}
.tl-wrap::before {
  content: "";
  position: absolute;
  left: 7px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #334155;
}
.tl-item {
  position: relative;
  margin-bottom: 24px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.4s;
}
.tl-item.visible {
  opacity: 1;
  transform: translateY(0);
}
.tl-dot {
  position: absolute;
  left: -24px;
  top: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #334155;
  border: 2px solid #1a1a2e;
  z-index: 1;
}
.tl-dot.done {
  background: #4fc3f7;
}
.tl-dot.active {
  background: #facc15;
  box-shadow: 0 0 0 4px rgba(250, 204, 21, 0.2);
}
.tl-content {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 12px;
}
.tl-content h4 {
  font-size: 14px;
  color: #e0e0e0;
  margin: 0 0 4px;
}
.tl-content p {
  font-size: 13px;
  color: #94a3b8;
  margin: 0;
}
.tl-date {
  font-size: 11px;
  color: #64748b;
  margin-top: 6px;
  display: block;
}
      `,
      js: `
const items = document.querySelectorAll('.tl-item');
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  },
  { threshold: 0.2 },
);
items.forEach((i) => obs.observe(i));
      `,
    },
  },
  {
    id: 'js-tree-view',
    title: 'Tree View',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a hierarchical tree view component with expand/collapse, icons, lazy loading indicators, and keyboard navigation.',
    concepts: ['Recursive rendering', 'Toggle state', 'Nested DOM', 'ARIA tree pattern'],
    demoCode: {
      html: `<div class="tv-wrap"><ul class="tv-tree" id="tv-tree" role="tree"></ul></div>`,
      css: `
.tv-wrap {
  max-width: 320px;
}
.tv-tree {
  list-style: none;
  padding: 0;
}
.tv-tree ul {
  list-style: none;
  padding-left: 20px;
}
.tv-node {
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #e0e0e0;
  user-select: none;
}
.tv-node:hover {
  background: #1e293b;
}
.tv-node .arrow {
  color: #64748b;
  font-size: 10px;
  width: 14px;
  text-align: center;
  transition: transform 0.2s;
}
.tv-node .arrow.open {
  transform: rotate(90deg);
}
.tv-node .icon {
  font-size: 14px;
}
      `,
      js: `
const data = [
  {
    name: 'src',
    children: [
      {
        name: 'components',
        children: [
          { name: 'Button.tsx' },
          { name: 'Modal.tsx' },
          { name: 'Input.tsx' },
        ],
      },
      {
        name: 'pages',
        children: [{ name: 'Home.tsx' }, { name: 'About.tsx' }],
      },
      { name: 'index.ts' },
    ],
  },
  {
    name: 'public',
    children: [{ name: 'index.html' }, { name: 'styles.css' }],
  },
  { name: 'package.json' },
  { name: 'README.md' },
];
const tree = document.getElementById('tv-tree');
function buildTree(items, parent) {
  items.forEach((item) => {
    const li = document.createElement('li');
    li.setAttribute('role', 'treeitem');
    const node = document.createElement('div');
    node.className = 'tv-node';
    const isFolder = !!item.children;
    if (isFolder) {
      const arrow = document.createElement('span');
      arrow.className = 'arrow';
      arrow.textContent = '▶';
      node.appendChild(arrow);
      const icon = document.createElement('span');
      icon.className = 'icon';
      icon.textContent = '📁';
      node.appendChild(icon);
    } else {
      const sp = document.createElement('span');
      sp.style.width = '14px';
      node.appendChild(sp);
      const icon = document.createElement('span');
      icon.className = 'icon';
      icon.textContent = '📄';
      node.appendChild(icon);
    }
    const name = document.createElement('span');
    name.textContent = item.name;
    node.appendChild(name);
    li.appendChild(node);
    if (isFolder) {
      const sub = document.createElement('ul');
      sub.style.display = 'none';
      sub.setAttribute('role', 'group');
      buildTree(item.children, sub);
      li.appendChild(sub);
      node.addEventListener('click', () => {
        const open = sub.style.display !== 'none';
        sub.style.display = open ? 'none' : 'block';
        node.querySelector('.arrow').classList.toggle('open', !open);
      });
    }
    parent.appendChild(li);
  });
}
buildTree(data, tree);
      `,
    },
  },
  {
    id: 'js-collapsible-panel',
    title: 'Collapsible Panel',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create animated collapsible panels with smooth height transitions, nested sections, and expand-all/collapse-all controls.',
    concepts: ['Max-height animation', 'scrollHeight', 'Toggle state', 'Event delegation'],
    demoCode: {
      html: `
<div class="cp-wrap">
  <div class="cp-controls">
    <button id="cp-expand-all" class="cp-ctrl">Expand All</button>
    <button id="cp-collapse-all" class="cp-ctrl">Collapse All</button>
  </div>
  <div class="cp-panel">
    <div class="cp-header" data-target="cp-1">
      Getting Started
      <span class="cp-arrow">&#9662;</span>
    </div>
    <div class="cp-body" id="cp-1">
      <p>
        Welcome! This section covers the basics of getting started with the
        platform.
      </p>
    </div>
  </div>
  <div class="cp-panel">
    <div class="cp-header" data-target="cp-2">
      Configuration
      <span class="cp-arrow">&#9662;</span>
    </div>
    <div class="cp-body" id="cp-2">
      <p>Learn how to configure your environment and customize settings.</p>
    </div>
  </div>
  <div class="cp-panel">
    <div class="cp-header" data-target="cp-3">
      Advanced Usage
      <span class="cp-arrow">&#9662;</span>
    </div>
    <div class="cp-body" id="cp-3">
      <p>Explore advanced features and patterns for power users.</p>
    </div>
  </div>
</div>
      `,
      css: `
.cp-wrap {
  max-width: 400px;
}
.cp-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}
.cp-ctrl {
  padding: 6px 12px;
  background: #334155;
  border: none;
  border-radius: 6px;
  color: #e0e0e0;
  font-size: 12px;
  cursor: pointer;
}
.cp-ctrl:hover {
  background: #475569;
}
.cp-panel {
  margin-bottom: 4px;
}
.cp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #e0e0e0;
  transition: background 0.15s;
}
.cp-header:hover {
  background: #293548;
}
.cp-header.open {
  border-radius: 8px 8px 0 0;
}
.cp-arrow {
  font-size: 12px;
  color: #64748b;
  transition: transform 0.2s;
}
.cp-header.open .cp-arrow {
  transform: rotate(180deg);
}
.cp-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: #0f172a;
  border: 1px solid #334155;
  border-top: none;
  border-radius: 0 0 8px 8px;
}
.cp-body p {
  padding: 12px;
  margin: 0;
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.5;
}
      `,
      js: `
function toggle(header) {
  const body = document.getElementById(header.dataset.target);
  const isOpen = header.classList.contains('open');
  header.classList.toggle('open');
  body.style.maxHeight = isOpen ? '0' : body.scrollHeight + 'px';
}
document
  .querySelectorAll('.cp-header')
  .forEach((h) => h.addEventListener('click', () => toggle(h)));
document.getElementById('cp-expand-all').addEventListener('click', () => {
  document.querySelectorAll('.cp-header').forEach((h) => {
    if (!h.classList.contains('open')) toggle(h);
  });
});
document.getElementById('cp-collapse-all').addEventListener('click', () => {
  document.querySelectorAll('.cp-header').forEach((h) => {
    if (h.classList.contains('open')) toggle(h);
  });
});
      `,
    },
  },
  {
    id: 'js-drawer',
    title: 'Drawer',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a slide-in drawer component with overlay backdrop, multiple positions (left/right), close on escape, and transition animations.',
    concepts: ['CSS transforms', 'Overlay management', 'Keyboard events', 'Focus trap'],
    demoCode: {
      html: `
<div class="dr-wrap">
  <button id="dr-open-left" class="dr-btn">Open Left</button>
  <button id="dr-open-right" class="dr-btn">Open Right</button>
  <div class="dr-overlay" id="dr-overlay"></div>
  <div class="dr-drawer dr-left" id="dr-left">
    <div class="dr-header">
      Left Drawer
      <button class="dr-close" data-drawer="dr-left">&times;</button>
    </div>
    <div class="dr-body">
      <p>Navigation menu or sidebar content goes here.</p>
      <ul>
        <li>Dashboard</li>
        <li>Settings</li>
        <li>Profile</li>
      </ul>
    </div>
  </div>
  <div class="dr-drawer dr-right" id="dr-right">
    <div class="dr-header">
      Right Drawer
      <button class="dr-close" data-drawer="dr-right">&times;</button>
    </div>
    <div class="dr-body"><p>Details panel or notifications go here.</p></div>
  </div>
</div>
      `,
      css: `
.dr-wrap {
  display: flex;
  gap: 12px;
}
.dr-btn {
  padding: 10px 20px;
  background: #4fc3f7;
  color: #1a1a2e;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
}
.dr-btn:hover {
  background: #81d4fa;
}
.dr-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;
}
.dr-overlay.open {
  display: block;
}
.dr-drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 280px;
  background: #1e293b;
  z-index: 50;
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
}
.dr-left {
  left: 0;
  transform: translateX(-100%);
}
.dr-right {
  right: 0;
  transform: translateX(100%);
}
.dr-drawer.open {
  transform: translateX(0);
}
.dr-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #334155;
  font-size: 16px;
  font-weight: 600;
  color: #e0e0e0;
}
.dr-close {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 24px;
  cursor: pointer;
}
.dr-body {
  padding: 16px;
  color: #94a3b8;
  font-size: 14px;
  flex: 1;
  overflow-y: auto;
}
.dr-body ul {
  list-style: none;
  padding: 0;
  margin: 8px 0;
}
.dr-body li {
  padding: 8px 0;
  border-bottom: 1px solid #334155;
}
      `,
      js: `
const overlay = document.getElementById('dr-overlay');
function openDrawer(id) {
  document.getElementById(id).classList.add('open');
  overlay.classList.add('open');
}
function closeAll() {
  document
    .querySelectorAll('.dr-drawer')
    .forEach((d) => d.classList.remove('open'));
  overlay.classList.remove('open');
}
document
  .getElementById('dr-open-left')
  .addEventListener('click', () => openDrawer('dr-left'));
document
  .getElementById('dr-open-right')
  .addEventListener('click', () => openDrawer('dr-right'));
overlay.addEventListener('click', closeAll);
document
  .querySelectorAll('.dr-close')
  .forEach((b) => b.addEventListener('click', closeAll));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAll();
});
      `,
    },
  },
  {
    id: 'js-bottom-sheet',
    title: 'Bottom Sheet',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create a mobile-style bottom sheet with drag-to-dismiss, snap points, backdrop overlay, and smooth spring animations.',
    concepts: ['Touch events', 'CSS transforms', 'Snap points', 'Gesture detection'],
    demoCode: {
      html: `
<div class="bs-wrap">
  <button id="bs-open" class="bs-btn">Open Bottom Sheet</button>
  <div class="bs-overlay" id="bs-overlay"></div>
  <div class="bs-sheet" id="bs-sheet">
    <div class="bs-handle" id="bs-handle"><div class="bs-bar"></div></div>
    <div class="bs-content">
      <h3>Bottom Sheet</h3>
      <p>Drag the handle to resize or dismiss.</p>
      <ul>
        <li>Share</li>
        <li>Copy Link</li>
        <li>Edit</li>
        <li>Delete</li>
      </ul>
    </div>
  </div>
</div>
      `,
      css: `
.bs-wrap {
  text-align: center;
}
.bs-btn {
  padding: 10px 24px;
  background: #4fc3f7;
  color: #1a1a2e;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
}
.bs-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;
}
.bs-overlay.open {
  display: block;
}
.bs-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #1e293b;
  border-radius: 12px 12px 0 0;
  z-index: 50;
  transform: translateY(100%);
  transition: transform 0.3s;
}
.bs-sheet.open {
  transform: translateY(0);
}
.bs-handle {
  display: flex;
  justify-content: center;
  padding: 12px;
  cursor: grab;
}
.bs-bar {
  width: 40px;
  height: 4px;
  background: #475569;
  border-radius: 2px;
}
.bs-content {
  padding: 0 20px 24px;
  color: #e0e0e0;
}
.bs-content h3 {
  font-size: 16px;
  margin: 0 0 8px;
}
.bs-content p {
  font-size: 13px;
  color: #94a3b8;
  margin: 0 0 12px;
}
.bs-content ul {
  list-style: none;
  padding: 0;
}
.bs-content li {
  padding: 12px 0;
  border-bottom: 1px solid #334155;
  font-size: 14px;
  cursor: pointer;
}
.bs-content li:hover {
  color: #4fc3f7;
}
      `,
      js: `
const sheet = document.getElementById('bs-sheet'),
  overlay = document.getElementById('bs-overlay'),
  handle = document.getElementById('bs-handle');
let startY = 0,
  currentY = 0,
  dragging = false;
document.getElementById('bs-open').addEventListener('click', () => {
  sheet.classList.add('open');
  overlay.classList.add('open');
});
function close() {
  sheet.classList.remove('open');
  overlay.classList.remove('open');
}
overlay.addEventListener('click', close);
handle.addEventListener('touchstart', (e) => {
  startY = e.touches[0].clientY;
  dragging = true;
  sheet.style.transition = 'none';
});
document.addEventListener('touchmove', (e) => {
  if (!dragging) return;
  currentY = e.touches[0].clientY - startY;
  if (currentY > 0) sheet.style.transform = 'translateY(' + currentY + 'px)';
});
document.addEventListener('touchend', () => {
  if (!dragging) return;
  dragging = false;
  sheet.style.transition = 'transform .3s';
  if (currentY > 100) close();
  else sheet.style.transform = 'translateY(0)';
  currentY = 0;
});
handle.addEventListener('mousedown', (e) => {
  startY = e.clientY;
  dragging = true;
  sheet.style.transition = 'none';
});
document.addEventListener('mousemove', (e) => {
  if (!dragging) return;
  currentY = e.clientY - startY;
  if (currentY > 0) sheet.style.transform = 'translateY(' + currentY + 'px)';
});
document.addEventListener('mouseup', () => {
  if (!dragging) return;
  dragging = false;
  sheet.style.transition = 'transform .3s';
  if (currentY > 100) close();
  else sheet.style.transform = 'translateY(0)';
  currentY = 0;
});
      `,
    },
  },
  {
    id: 'js-command-palette',
    title: 'Command Palette',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Build a VS Code-style command palette with fuzzy search, keyboard navigation, grouped results, and shortcut key activation.',
    concepts: ['Keyboard shortcuts', 'Fuzzy matching', 'Focus management', 'ARIA listbox'],
    demoCode: {
      html: `
<div class="cmd-wrap">
  <p class="cmd-hint">Press Ctrl+K to open</p>
  <div class="cmd-overlay" id="cmd-overlay">
    <div class="cmd-palette" id="cmd-palette">
      <input id="cmd-input" class="cmd-input" placeholder="Type a command..." />
      <ul id="cmd-list" class="cmd-list"></ul>
    </div>
  </div>
</div>
      `,
      css: `
.cmd-wrap {
  text-align: center;
}
.cmd-hint {
  font-size: 13px;
  color: #64748b;
}
.cmd-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  justify-content: center;
  padding-top: 80px;
}
.cmd-overlay.open {
  display: flex;
}
.cmd-palette {
  width: 400px;
  max-height: 320px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.cmd-input {
  padding: 14px 16px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #334155;
  color: #e0e0e0;
  font-size: 15px;
  outline: none;
}
.cmd-list {
  list-style: none;
  padding: 4px;
  margin: 0;
  overflow-y: auto;
  flex: 1;
}
.cmd-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #e0e0e0;
}
.cmd-item:hover,
.cmd-item.active {
  background: #334155;
}
.cmd-key {
  font-size: 11px;
  color: #64748b;
  background: #0f172a;
  padding: 2px 6px;
  border-radius: 4px;
}
      `,
      js: `
const commands = [
  { name: 'New File', key: 'Ctrl+N' },
  { name: 'Open File', key: 'Ctrl+O' },
  { name: 'Save', key: 'Ctrl+S' },
  { name: 'Find', key: 'Ctrl+F' },
  { name: 'Replace', key: 'Ctrl+H' },
  { name: 'Toggle Sidebar', key: 'Ctrl+B' },
  { name: 'Settings', key: 'Ctrl+,' },
  { name: 'Toggle Terminal', key: 'Ctrl+\`' },
  { name: 'Format Document', key: 'Shift+Alt+F' },
  { name: 'Go to Line', key: 'Ctrl+G' },
];

const overlay = document.getElementById('cmd-overlay');
const input = document.getElementById('cmd-input');
const list = document.getElementById('cmd-list');
let idx = -1;

function render(items) {
  list.innerHTML = '';
  idx = -1;
  items.forEach((c) => {
    const li = document.createElement('li');
    li.className = 'cmd-item';
    li.innerHTML = c.name + '<span class="cmd-key">' + c.key + '</span>';
    li.addEventListener('click', () => close());
    list.appendChild(li);
  });
}

function open() {
  overlay.classList.add('open');
  input.value = '';
  input.focus();
  render(commands);
}

function close() {
  overlay.classList.remove('open');
}

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    overlay.classList.contains('open') ? close() : open();
  }
  if (!overlay.classList.contains('open')) return;
  const items = list.querySelectorAll('.cmd-item');
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    idx = Math.min(idx + 1, items.length - 1);
    items.forEach((l, j) => l.classList.toggle('active', j === idx));
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    idx = Math.max(idx - 1, 0);
    items.forEach((l, j) => l.classList.toggle('active', j === idx));
  } else if (e.key === 'Enter' && idx >= 0) {
    close();
  } else if (e.key === 'Escape') {
    close();
  }
});

input.addEventListener('input', () => {
  const q = input.value.toLowerCase();
  render(commands.filter((c) => c.name.toLowerCase().includes(q)));
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) close();
});
      `,
    },
  },
  {
    id: 'js-spotlight-search',
    title: 'Spotlight Search',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Create a macOS Spotlight-style search with categorized results, recent searches, and keyboard navigation across sections.',
    concepts: ['Search indexing', 'Grouped results', 'Keyboard navigation', 'Local storage'],
    demoCode: {
      html: `
<div class="ss-wrap">
  <p class="ss-hint">Press Ctrl+Space to search</p>
  <div class="ss-overlay" id="ss-overlay">
    <div class="ss-box">
      <input id="ss-input" class="ss-input" placeholder="Search anything..." />
      <div id="ss-results" class="ss-results"></div>
    </div>
  </div>
</div>
      `,
      css: `
.ss-wrap {
  text-align: center;
}
.ss-hint {
  font-size: 13px;
  color: #64748b;
}
.ss-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  justify-content: center;
  padding-top: 60px;
}
.ss-overlay.open {
  display: flex;
}
.ss-box {
  width: 440px;
  max-height: 380px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.ss-input {
  padding: 14px 16px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #334155;
  color: #e0e0e0;
  font-size: 15px;
  outline: none;
}
.ss-results {
  overflow-y: auto;
  padding: 4px;
  flex: 1;
}
.ss-group {
  padding: 8px 12px;
  font-size: 11px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.ss-item {
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #e0e0e0;
  display: flex;
  align-items: center;
  gap: 8px;
}
.ss-item:hover,
.ss-item.active {
  background: #334155;
}
.ss-icon {
  font-size: 16px;
}
      `,
      js: `
const data = {
  Pages: [
    { name: 'Home', icon: '🏠' },
    { name: 'Dashboard', icon: '📊' },
    { name: 'Settings', icon: '⚙' },
  ],
  Actions: [
    { name: 'Create New', icon: '➕' },
    { name: 'Import Data', icon: '📥' },
    { name: 'Export PDF', icon: '📄' },
  ],
  Users: [
    { name: 'Alice Johnson', icon: '👤' },
    { name: 'Bob Smith', icon: '👤' },
    { name: 'Carol White', icon: '👤' },
  ],
};
const overlay = document.getElementById('ss-overlay'),
  input = document.getElementById('ss-input'),
  results = document.getElementById('ss-results');
let idx = -1,
  flat = [];
function render(q) {
  results.innerHTML = '';
  flat = [];
  Object.entries(data).forEach(([group, items]) => {
    const filtered = items.filter((i) =>
      i.name.toLowerCase().includes(q.toLowerCase()),
    );
    if (!filtered.length) return;
    const gh = document.createElement('div');
    gh.className = 'ss-group';
    gh.textContent = group;
    results.appendChild(gh);
    filtered.forEach((item) => {
      const d = document.createElement('div');
      d.className = 'ss-item';
      d.innerHTML =
        '<span class="ss-icon">' + item.icon + '</span>' + item.name;
      flat.push(d);
      results.appendChild(d);
    });
  });
  idx = -1;
}
function open() {
  overlay.classList.add('open');
  input.value = '';
  input.focus();
  render('');
}
function close() {
  overlay.classList.remove('open');
}
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.code === 'Space') {
    e.preventDefault();
    overlay.classList.contains('open') ? close() : open();
  }
  if (!overlay.classList.contains('open')) return;
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    idx = Math.min(idx + 1, flat.length - 1);
    flat.forEach((f, i) => f.classList.toggle('active', i === idx));
    if (flat[idx]) flat[idx].scrollIntoView({ block: 'nearest' });
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    idx = Math.max(idx - 1, 0);
    flat.forEach((f, i) => f.classList.toggle('active', i === idx));
  } else if (e.key === 'Escape') close();
});
input.addEventListener('input', () => render(input.value));
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) close();
});
      `,
    },
  },
  {
    id: 'js-floating-action-btn',
    title: 'Floating Action Button',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build a Material Design floating action button with expandable speed-dial menu, ripple effect, and smooth animations.',
    concepts: ['CSS animations', 'Transform origin', 'Click events', 'Staggered transitions'],
    demoCode: {
      html: `
<div class="fab-wrap">
  <div class="fab-menu" id="fab-menu">
    <button class="fab-mini" data-label="Share" style="--i: 1">S</button>
    <button class="fab-mini" data-label="Edit" style="--i: 2">E</button>
    <button class="fab-mini" data-label="Delete" style="--i: 3">D</button>
  </div>
  <button class="fab-main" id="fab-main">
    <span class="fab-icon" id="fab-icon">+</span>
  </button>
</div>
      `,
      css: `
.fab-wrap {
  position: relative;
  height: 250px;
}
.fab-main {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #4fc3f7;
  border: none;
  cursor: pointer;
  font-size: 28px;
  color: #1a1a2e;
  box-shadow: 0 4px 12px rgba(79, 195, 247, 0.3);
  transition: transform 0.2s;
  z-index: 5;
}
.fab-main:hover {
  transform: scale(1.05);
}
.fab-icon {
  display: block;
  transition: transform 0.3s;
}
.fab-wrap.open .fab-icon {
  transform: rotate(45deg);
}
.fab-menu {
  position: absolute;
  bottom: 80px;
  right: 24px;
  display: flex;
  flex-direction: column-reverse;
  gap: 12px;
  z-index: 4;
}
.fab-mini {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #334155;
  border: none;
  color: #e0e0e0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  opacity: 0;
  transform: scale(0.5) translateY(20px);
  transition: all 0.2s;
  transition-delay: calc(var(--i) * 0.05s);
}
.fab-wrap.open .fab-mini {
  opacity: 1;
  transform: scale(1) translateY(0);
}
.fab-mini:hover {
  background: #4fc3f7;
  color: #1a1a2e;
}
      `,
      js: `
const wrap = document.querySelector('.fab-wrap'),
  main = document.getElementById('fab-main');
main.addEventListener('click', () => wrap.classList.toggle('open'));
document.addEventListener('click', (e) => {
  if (!wrap.contains(e.target)) wrap.classList.remove('open');
});
document.querySelectorAll('.fab-mini').forEach((b) => {
  b.addEventListener('click', () => {
    wrap.classList.remove('open');
  });
});
      `,
    },
  },
  {
    id: 'js-skeleton-loader',
    title: 'Skeleton Loader',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create animated skeleton loading placeholders that transition smoothly to real content, with shimmer effects and various shapes.',
    concepts: ['CSS animations', 'Keyframes', 'Content replacement', 'Loading states'],
    demoCode: {
      html: `
<div class="sk-wrap">
  <button id="sk-toggle" class="sk-btn">Toggle Loading</button>
  <div class="sk-card" id="sk-card">
    <div class="sk-avatar sk-shimmer"></div>
    <div class="sk-text">
      <div class="sk-line sk-shimmer" style="width: 60%"></div>
      <div class="sk-line sk-shimmer" style="width: 80%"></div>
      <div class="sk-line sk-shimmer" style="width: 40%"></div>
    </div>
  </div>
</div>
      `,
      css: `
.sk-wrap {
  max-width: 360px;
}
.sk-btn {
  padding: 8px 16px;
  background: #4fc3f7;
  color: #1a1a2e;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
  margin-bottom: 12px;
}
.sk-card {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
}
.sk-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #334155;
  flex-shrink: 0;
}
.sk-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.sk-line {
  height: 12px;
  border-radius: 4px;
  background: #334155;
}
.sk-shimmer {
  position: relative;
  overflow: hidden;
}
.sk-shimmer::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.05),
    transparent
  );
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
.sk-card.loaded .sk-avatar {
  background: #4fc3f7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #1a1a2e;
  font-size: 16px;
}
.sk-card.loaded .sk-shimmer::after {
  display: none;
}
.sk-card.loaded .sk-line {
  background: transparent;
  height: auto;
}
      `,
      js: `
const card = document.getElementById('sk-card');
let loaded = false;
document.getElementById('sk-toggle').addEventListener('click', () => {
  loaded = !loaded;
  if (loaded) {
    card.classList.add('loaded');
    card.querySelector('.sk-avatar').textContent = 'JD';
    const lines = card.querySelectorAll('.sk-line');
    lines[0].textContent = 'John Doe';
    lines[0].style.color = '#e0e0e0';
    lines[0].style.fontSize = '14px';
    lines[0].style.fontWeight = '600';
    lines[1].textContent = 'Software Engineer at Acme Corp';
    lines[1].style.color = '#94a3b8';
    lines[1].style.fontSize = '13px';
    lines[2].textContent = 'San Francisco, CA';
    lines[2].style.color = '#64748b';
    lines[2].style.fontSize = '12px';
  } else {
    card.classList.remove('loaded');
    card.querySelector('.sk-avatar').textContent = '';
    const lines = card.querySelectorAll('.sk-line');
    lines.forEach((l) => {
      l.textContent = '';
      l.style.cssText = '';
    });
  }
});
      `,
    },
  },
  {
    id: 'js-progress-bar',
    title: 'Progress Bar',
    category: 'interactive',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build various progress bar styles including linear, circular, stepped, and indeterminate with animations and percentage labels.',
    concepts: ['CSS animations', 'SVG stroke', 'Keyframes', 'Dynamic styles'],
    demoCode: {
      html: `
<div class="pb-wrap">
  <p class="pb-label">Linear Progress</p>
  <div class="pb-track"><div class="pb-fill" id="pb-fill"></div></div>
  <p class="pb-pct" id="pb-pct">0%</p>
  <p class="pb-label">Circular Progress</p>
  <div class="pb-circle-wrap">
    <svg class="pb-circle" viewBox="0 0 100 100">
      <circle class="pb-bg-ring" cx="50" cy="50" r="42" />
      <circle class="pb-fg-ring" id="pb-ring" cx="50" cy="50" r="42" />
    </svg>
    <span class="pb-circle-text" id="pb-circle-text">0%</span>
  </div>
  <button id="pb-start" class="pb-btn">Start</button>
</div>
      `,
      css: `
.pb-wrap {
  max-width: 300px;
  text-align: center;
}
.pb-label {
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 6px;
  text-align: left;
}
.pb-track {
  height: 8px;
  background: #334155;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 4px;
}
.pb-fill {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, #4fc3f7, #81d4fa);
  border-radius: 4px;
  transition: width 0.3s;
}
.pb-pct {
  font-size: 12px;
  color: #4fc3f7;
  text-align: right;
  margin-bottom: 16px;
}
.pb-circle-wrap {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 16px;
}
.pb-circle {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}
.pb-bg-ring {
  fill: none;
  stroke: #334155;
  stroke-width: 8;
}
.pb-fg-ring {
  fill: none;
  stroke: #4fc3f7;
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: 264;
  stroke-dashoffset: 264;
  transition: stroke-dashoffset 0.3s;
}
.pb-circle-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: #4fc3f7;
}
.pb-btn {
  padding: 8px 24px;
  background: #4fc3f7;
  color: #1a1a2e;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
}
      `,
      js: `
const fill = document.getElementById('pb-fill'),
  pct = document.getElementById('pb-pct'),
  ring = document.getElementById('pb-ring'),
  ctext = document.getElementById('pb-circle-text');
let progress = 0,
  timer = null;
document.getElementById('pb-start').addEventListener('click', () => {
  progress = 0;
  clearInterval(timer);
  timer = setInterval(() => {
    progress += 2;
    if (progress > 100) {
      progress = 100;
      clearInterval(timer);
    }
    fill.style.width = progress + '%';
    pct.textContent = progress + '%';
    const offset = 264 - (264 * progress) / 100;
    ring.style.strokeDashoffset = offset;
    ctext.textContent = progress + '%';
  }, 80);
});
      `,
    },
  },
  // --- data-display ---
  {
    id: 'js-badge',
    title: 'Badge',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create badge components with multiple variants (status, count, dot), positions, colors, and animated notifications.',
    concepts: ['CSS positioning', 'Pseudo-elements', 'Dynamic classes', 'Counter badges'],
    demoCode: {
      html: `
<div class="bg-wrap">
  <div class="bg-row">
    <div class="bg-icon-wrap">
      <div class="bg-icon">M</div>
      <span class="bg-badge bg-count" id="bg-count">3</span>
    </div>
    <span class="bg-label">Messages</span>
  </div>
  <div class="bg-row">
    <div class="bg-icon-wrap">
      <div class="bg-icon">N</div>
      <span class="bg-badge bg-dot bg-pulse"></span>
    </div>
    <span class="bg-label">Notifications</span>
  </div>
  <div class="bg-row">
    <span class="bg-status bg-online"></span>
    <span class="bg-label">Online</span>
    <span class="bg-status bg-away"></span>
    <span class="bg-label">Away</span>
    <span class="bg-status bg-offline"></span>
    <span class="bg-label">Offline</span>
  </div>
  <button id="bg-add" class="bg-btn">Add Message</button>
</div>
      `,
      css: `
.bg-wrap {
  max-width: 300px;
}
.bg-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.bg-icon-wrap {
  position: relative;
  display: inline-block;
}
.bg-icon {
  width: 40px;
  height: 40px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #e0e0e0;
  font-size: 16px;
}
.bg-badge {
  position: absolute;
  top: -6px;
  right: -6px;
}
.bg-count {
  background: #ef4444;
  color: white;
  font-size: 11px;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}
.bg-dot {
  width: 10px;
  height: 10px;
  background: #4fc3f7;
  border-radius: 50%;
  border: 2px solid #1a1a2e;
}
.bg-pulse {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
.bg-status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.bg-online {
  background: #4ade80;
}
.bg-away {
  background: #facc15;
}
.bg-offline {
  background: #64748b;
}
.bg-label {
  font-size: 14px;
  color: #e0e0e0;
}
.bg-btn {
  padding: 6px 14px;
  background: #334155;
  border: none;
  border-radius: 6px;
  color: #e0e0e0;
  font-size: 12px;
  cursor: pointer;
}
.bg-btn:hover {
  background: #475569;
}
      `,
      js: `
let count = 3;
const badge = document.getElementById('bg-count');
document.getElementById('bg-add').addEventListener('click', () => {
  count++;
  badge.textContent = count > 99 ? '99+' : count;
  badge.style.transform = 'scale(1.3)';
  setTimeout(() => (badge.style.transform = 'scale(1)'), 200);
});
      `,
    },
  },
  {
    id: 'js-avatar',
    title: 'Avatar',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build avatar components with initials, status indicators, sizes, stacked groups, and fallback states.',
    concepts: ['CSS border-radius', 'Initials generation', 'Stacking context', 'Fallbacks'],
    demoCode: {
      html: `
<div class="av-wrap">
  <p class="av-label">Sizes</p>
  <div class="av-row">
    <div class="av-circle av-sm" style="background: #1e3a5f">AB</div>
    <div class="av-circle av-md" style="background: #3b1f5e">CD</div>
    <div class="av-circle av-lg" style="background: #1f4a3b">EF</div>
  </div>
  <p class="av-label">With Status</p>
  <div class="av-row">
    <div class="av-stack">
      <div class="av-circle av-md" style="background: #5e3b1f">GH</div>
      <span class="av-status av-online"></span>
    </div>
    <div class="av-stack">
      <div class="av-circle av-md" style="background: #1f3b5e">IJ</div>
      <span class="av-status av-away"></span>
    </div>
    <div class="av-stack">
      <div class="av-circle av-md" style="background: #4a1f3b">KL</div>
      <span class="av-status av-offline"></span>
    </div>
  </div>
  <p class="av-label">Group</p>
  <div class="av-group" id="av-group"></div>
</div>
      `,
      css: `
.av-wrap {
  max-width: 360px;
}
.av-label {
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 8px;
}
.av-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.av-circle {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
}
.av-sm {
  width: 32px;
  height: 32px;
  font-size: 12px;
}
.av-md {
  width: 40px;
  height: 40px;
  font-size: 14px;
}
.av-lg {
  width: 52px;
  height: 52px;
  font-size: 18px;
}
.av-stack {
  position: relative;
  display: inline-block;
}
.av-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #1a1a2e;
}
.av-online {
  background: #4ade80;
}
.av-away {
  background: #facc15;
}
.av-offline {
  background: #64748b;
}
.av-group {
  display: flex;
}
.av-group .av-circle {
  margin-left: -10px;
  border: 2px solid #1a1a2e;
}
.av-group .av-circle:first-child {
  margin-left: 0;
}
      `,
      js: `
const group = document.getElementById('av-group');
const names = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve'];
const colors = ['#1e3a5f', '#3b1f5e', '#1f4a3b', '#5e3b1f', '#4a1f3b'];
names.forEach((n, i) => {
  const d = document.createElement('div');
  d.className = 'av-circle av-md';
  d.style.background = colors[i];
  d.textContent = n[0];
  group.appendChild(d);
});
const more = document.createElement('div');
more.className = 'av-circle av-md';
more.style.background = '#334155';
more.textContent = '+3';
group.appendChild(more);
      `,
    },
  },
  {
    id: 'js-stat-card',
    title: 'Stat Card',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create dashboard stat cards with animated counters, trend indicators, sparkline visuals, and responsive grid layout.',
    concepts: ['Counter animation', 'requestAnimationFrame', 'CSS Grid', 'Number formatting'],
    demoCode: {
      html: `
<div class="stc-grid" id="stc-grid">
  <div
    class="stc-card"
    data-target="12459"
    data-label="Total Users"
    data-trend="+12.5%"
  ></div>
  <div
    class="stc-card"
    data-target="3847"
    data-label="Revenue"
    data-trend="+8.2%"
    data-prefix="$"
  ></div>
  <div
    class="stc-card"
    data-target="94"
    data-label="Uptime"
    data-trend="+0.3%"
    data-suffix="%"
  ></div>
  <div
    class="stc-card"
    data-target="287"
    data-label="Active Now"
    data-trend="-2.1%"
  ></div>
</div>
      `,
      css: `
.stc-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  max-width: 500px;
}
.stc-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 16px;
}
.stc-label {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 4px;
}
.stc-value {
  font-size: 24px;
  font-weight: 700;
  color: #e0e0e0;
  margin-bottom: 4px;
}
.stc-trend {
  font-size: 12px;
  font-weight: 600;
}
.stc-up {
  color: #4ade80;
}
.stc-down {
  color: #ef4444;
}
      `,
      js: `
document.querySelectorAll('.stc-card').forEach((card) => {
  const target = +card.dataset.target;
  const label = card.dataset.label;
  const trend = card.dataset.trend;
  const prefix = card.dataset.prefix || '';
  const suffix = card.dataset.suffix || '';
  card.innerHTML =
    '<div class="stc-label">' +
    label +
    '</div><div class="stc-value" id="v-' +
    label.replace(/\\s/g, '') +
    '">' +
    prefix +
    '0' +
    suffix +
    '</div><div class="stc-trend ' +
    (trend.startsWith('+') ? 'stc-up' : 'stc-down') +
    '">' +
    trend +
    '</div>';
  const el = card.querySelector('.stc-value');
  let current = 0;
  const step = target / 60;
  function animate() {
    current = Math.min(current + step, target);
    el.textContent = prefix + Math.round(current).toLocaleString() + suffix;
    if (current < target) requestAnimationFrame(animate);
  }
  animate();
});
      `,
    },
  },
  {
    id: 'js-timeline-feed',
    title: 'Timeline Feed',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a social-media-style timeline feed with avatar, timestamps, action types, and load-more pagination.',
    concepts: ['Dynamic rendering', 'Date formatting', 'Pagination', 'Template literals'],
    demoCode: {
      html: `
<div class="tf-wrap">
  <div id="tf-feed" class="tf-feed"></div>
  <button id="tf-more" class="tf-btn">Load More</button>
</div>
      `,
      css: `
.tf-wrap {
  max-width: 400px;
}
.tf-feed {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.tf-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #1e293b;
  border-radius: 8px;
}
.tf-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  flex-shrink: 0;
}
.tf-body {
  flex: 1;
}
.tf-name {
  font-size: 13px;
  font-weight: 600;
  color: #e0e0e0;
}
.tf-action {
  font-size: 13px;
  color: #94a3b8;
}
.tf-action strong {
  color: #4fc3f7;
}
.tf-time {
  font-size: 11px;
  color: #64748b;
  margin-top: 2px;
}
.tf-btn {
  width: 100%;
  padding: 10px;
  background: #334155;
  border: none;
  border-radius: 8px;
  color: #e0e0e0;
  cursor: pointer;
  font-size: 13px;
  margin-top: 8px;
}
.tf-btn:hover {
  background: #475569;
}
      `,
      js: `
const feed = document.getElementById('tf-feed');
const events = [
  {
    user: 'Alice',
    color: '#1e3a5f',
    action: 'pushed to <strong>main</strong>',
    time: '2m ago',
  },
  {
    user: 'Bob',
    color: '#3b1f5e',
    action: 'opened PR <strong>#42</strong>',
    time: '15m ago',
  },
  {
    user: 'Carol',
    color: '#1f4a3b',
    action: 'commented on issue <strong>#18</strong>',
    time: '1h ago',
  },
  {
    user: 'Dave',
    color: '#5e3b1f',
    action: 'merged PR <strong>#39</strong>',
    time: '3h ago',
  },
  {
    user: 'Eve',
    color: '#4a1f3b',
    action: 'created branch <strong>feature/auth</strong>',
    time: '5h ago',
  },
  {
    user: 'Frank',
    color: '#1f3b5e',
    action: 'deployed to <strong>production</strong>',
    time: '8h ago',
  },
];
let page = 0;
const perPage = 3;
function renderPage() {
  const start = page * perPage;
  const items = events.slice(start, start + perPage);
  items.forEach((e) => {
    const d = document.createElement('div');
    d.className = 'tf-item';
    d.innerHTML =
      '<div class="tf-avatar" style="background:' +
      e.color +
      '">' +
      e.user[0] +
      '</div><div class="tf-body"><span class="tf-name">' +
      e.user +
      '</span> <span class="tf-action">' +
      e.action +
      '</span><div class="tf-time">' +
      e.time +
      '</div></div>';
    feed.appendChild(d);
  });
  page++;
  if (page * perPage >= events.length)
    document.getElementById('tf-more').style.display = 'none';
}
renderPage();
document.getElementById('tf-more').addEventListener('click', renderPage);
      `,
    },
  },
  {
    id: 'js-activity-log',
    title: 'Activity Log',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create a filterable activity log with type badges, timestamps, expandable details, and real-time additions.',
    concepts: ['Filtering', 'Dynamic DOM', 'Date formatting', 'Event delegation'],
    demoCode: {
      html: `
<div class="al-wrap">
  <div class="al-filters" id="al-filters">
    <button class="al-filter active" data-type="all">All</button>
    <button class="al-filter" data-type="info">Info</button>
    <button class="al-filter" data-type="warn">Warning</button>
    <button class="al-filter" data-type="error">Error</button>
  </div>
  <div class="al-list" id="al-list"></div>
</div>
      `,
      css: `
.al-wrap {
  max-width: 450px;
}
.al-filters {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
}
.al-filter {
  padding: 6px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #94a3b8;
  font-size: 12px;
  cursor: pointer;
}
.al-filter:hover {
  border-color: #4fc3f7;
}
.al-filter.active {
  background: #4fc3f7;
  color: #1a1a2e;
  border-color: #4fc3f7;
}
.al-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.al-entry {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  background: #1e293b;
  border-radius: 8px;
  border-left: 3px solid transparent;
}
.al-entry[data-type="info"] {
  border-left-color: #4fc3f7;
}
.al-entry[data-type="warn"] {
  border-left-color: #facc15;
}
.al-entry[data-type="error"] {
  border-left-color: #ef4444;
}
.al-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
}
.al-badge.info {
  background: rgba(79, 195, 247, 0.15);
  color: #4fc3f7;
}
.al-badge.warn {
  background: rgba(250, 204, 21, 0.15);
  color: #facc15;
}
.al-badge.error {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}
.al-msg {
  font-size: 13px;
  color: #e0e0e0;
  flex: 1;
}
.al-time {
  font-size: 11px;
  color: #64748b;
  white-space: nowrap;
}
      `,
      js: `
const list = document.getElementById('al-list');
const logs = [
  { type: 'info', msg: 'User logged in successfully', time: '10:32 AM' },
  { type: 'warn', msg: 'API response slow (2.3s)', time: '10:28 AM' },
  { type: 'error', msg: 'Failed to connect to database', time: '10:15 AM' },
  { type: 'info', msg: 'Deployment completed', time: '10:00 AM' },
  { type: 'warn', msg: 'Memory usage at 85%', time: '09:45 AM' },
  { type: 'error', msg: 'Payment gateway timeout', time: '09:30 AM' },
];
function renderLogs(type) {
  list.innerHTML = '';
  logs
    .filter((l) => type === 'all' || l.type === type)
    .forEach((l) => {
      const d = document.createElement('div');
      d.className = 'al-entry';
      d.dataset.type = l.type;
      d.innerHTML =
        '<span class="al-badge ' +
        l.type +
        '">' +
        l.type +
        '</span><span class="al-msg">' +
        l.msg +
        '</span><span class="al-time">' +
        l.time +
        '</span>';
      list.appendChild(d);
    });
}
renderLogs('all');
document.getElementById('al-filters').addEventListener('click', (e) => {
  const btn = e.target.closest('.al-filter');
  if (!btn) return;
  document
    .querySelectorAll('.al-filter')
    .forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  renderLogs(btn.dataset.type);
});
      `,
    },
  },
  {
    id: 'js-diff-viewer',
    title: 'Diff Viewer',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Build a side-by-side diff viewer showing line additions, deletions, and modifications with line numbers and highlighting.',
    concepts: ['String diffing', 'Line comparison', 'Synchronized scroll', 'CSS Grid'],
    demoCode: {
      html: `
<div class="dv-wrap">
  <div class="dv-header">
    <span class="dv-file">file.js</span>
    <span class="dv-stats">
      <span class="dv-add">+3</span>
      <span class="dv-del">-2</span>
    </span>
  </div>
  <div class="dv-panels" id="dv-panels">
    <div class="dv-panel" id="dv-old"></div>
    <div class="dv-panel" id="dv-new"></div>
  </div>
</div>
      `,
      css: `
.dv-wrap {
  max-width: 600px;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
}
.dv-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #0f172a;
  border-bottom: 1px solid #334155;
}
.dv-file {
  font-size: 13px;
  color: #e0e0e0;
  font-family: monospace;
}
.dv-stats {
  font-size: 12px;
}
.dv-add {
  color: #4ade80;
}
.dv-del {
  color: #ef4444;
}
.dv-panels {
  display: flex;
}
.dv-panel {
  flex: 1;
  font-family: monospace;
  font-size: 12px;
  overflow-x: auto;
}
.dv-line {
  display: flex;
  padding: 1px 8px;
  min-height: 20px;
  line-height: 20px;
  white-space: pre;
}
.dv-ln {
  color: #475569;
  min-width: 28px;
  text-align: right;
  padding-right: 8px;
  user-select: none;
}
.dv-code {
  color: #e0e0e0;
}
.dv-line.add {
  background: rgba(74, 222, 128, 0.08);
}
.dv-line.add .dv-code {
  color: #4ade80;
}
.dv-line.del {
  background: rgba(239, 68, 68, 0.08);
}
.dv-line.del .dv-code {
  color: #ef4444;
}
.dv-line.mod {
  background: rgba(250, 204, 21, 0.06);
}
.dv-line.mod .dv-code {
  color: #facc15;
}
      `,
      js: `
const oldLines = [
  'function greet(name) {',
  '  console.log("Hello " + name);',
  '  return true;',
  '}',
  '',
  'module.exports = greet;',
];
const newLines = [
  'function greet(name, greeting = "Hello") {',
  '  const msg = greeting + " " + name;',
  '  console.log(msg);',
  '  return msg;',
  '}',
  '',
  'module.exports = greet;',
];
const oldPanel = document.getElementById('dv-old'),
  newPanel = document.getElementById('dv-new');
function renderLine(panel, num, code, type) {
  const d = document.createElement('div');
  d.className = 'dv-line' + (type ? ' ' + type : '');
  d.innerHTML =
    '<span class="dv-ln">' +
    (num || '') +
    '</span><span class="dv-code">' +
    code +
    '</span>';
  panel.appendChild(d);
}
const types = { 0: 'del', 1: 'add', 2: 'mod' };
oldLines.forEach((l, i) => {
  const nl = newLines[i];
  if (!nl && nl !== '') renderLine(oldPanel, i + 1, l, 'del');
  else if (l !== nl) renderLine(oldPanel, i + 1, l, 'mod');
  else renderLine(oldPanel, i + 1, l, '');
});
newLines.forEach((l, i) => {
  const ol = oldLines[i];
  if (!ol && ol !== '') renderLine(newPanel, i + 1, l, 'add');
  else if (l !== ol) renderLine(newPanel, i + 1, l, 'mod');
  else renderLine(newPanel, i + 1, l, '');
});
const panels = document.getElementById('dv-panels');
oldPanel.addEventListener('scroll', () => {
  newPanel.scrollTop = oldPanel.scrollTop;
});
newPanel.addEventListener('scroll', () => {
  oldPanel.scrollTop = newPanel.scrollTop;
});
      `,
    },
  },
  {
    id: 'js-code-block',
    title: 'Code Block',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a styled code block component with line numbers, copy-to-clipboard button, language label, and basic keyword highlighting.',
    concepts: ['Clipboard API', 'RegExp highlighting', 'Line numbering', 'Template rendering'],
    demoCode: {
      html: `
<div class="cbl-wrap">
  <div class="cbl-header">
    <span class="cbl-lang">JavaScript</span>
    <button class="cbl-copy" id="cbl-copy">Copy</button>
  </div>
  <div class="cbl-body">
    <pre class="cbl-lines" id="cbl-lines"></pre>
    <pre class="cbl-code" id="cbl-code"></pre>
  </div>
</div>
      `,
      css: `
.cbl-wrap {
  max-width: 500px;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
}
.cbl-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #0f172a;
  border-bottom: 1px solid #334155;
}
.cbl-lang {
  font-size: 12px;
  color: #64748b;
}
.cbl-copy {
  padding: 4px 10px;
  background: #334155;
  border: none;
  border-radius: 4px;
  color: #e0e0e0;
  font-size: 11px;
  cursor: pointer;
}
.cbl-copy:hover {
  background: #475569;
}
.cbl-body {
  display: flex;
  background: #1e293b;
  padding: 12px 0;
  font-family: monospace;
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
}
.cbl-lines {
  padding: 0 12px;
  color: #475569;
  text-align: right;
  user-select: none;
  border-right: 1px solid #334155;
  margin: 0;
}
.cbl-code {
  padding: 0 16px;
  color: #e0e0e0;
  margin: 0;
  flex: 1;
}
.cbl-code .kw {
  color: #c084fc;
}
.cbl-code .str {
  color: #4ade80;
}
.cbl-code .fn {
  color: #4fc3f7;
}
.cbl-code .cm {
  color: #64748b;
  font-style: italic;
}
      `,
      js: `
const code =
  '// Fibonacci generator\\nfunction fibonacci(n) {\\n  const seq = [0, 1];\\n  for (let i = 2; i < n; i++) {\\n    seq.push(seq[i-1] + seq[i-2]);\\n  }\\n  return seq;\\n}\\n\\nconsole.log(fibonacci(10));';

const lines = code.split('\\n');
document.getElementById('cbl-lines').textContent = lines
  .map((_, i) => i + 1)
  .join('\\n');

let highlighted = code.replace(
  /\\/\\/.*/g,
  (m) => '<span class="cm">' + m + '</span>'
);
highlighted = highlighted.replace(
  /\\b(function|const|let|var|for|return|if|else)\\b/g,
  '<span class="kw">$1</span>'
);
highlighted = highlighted.replace(
  /'[^']*'/g,
  (m) => '<span class="str">' + m + '</span>'
);
highlighted = highlighted.replace(
  /\\b(fibonacci|console|log|push)\\b(?=\\()/g,
  '<span class="fn">$1</span>'
);

document.getElementById('cbl-code').innerHTML = highlighted;

document.getElementById('cbl-copy').addEventListener('click', function () {
  navigator.clipboard.writeText(code).then(() => {
    this.textContent = 'Copied!';
    setTimeout(() => (this.textContent = 'Copy'), 2000);
  });
});
      `,
    },
  },
  {
    id: 'js-markdown-preview',
    title: 'Markdown Preview',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create a simple markdown renderer that converts headings, bold, italic, lists, links, and code blocks into styled HTML.',
    concepts: ['RegExp parsing', 'innerHTML rendering', 'String replacement', 'CSS typography'],
    demoCode: {
      html: `<div class="mp-wrap"><textarea id="mp-input" class="mp-input" rows="8"># Hello World\n\nThis is **bold** and *italic* text.\n\n## Features\n\n- Item one\n- Item two\n- Item three\n\n[Visit site](https://example.com)\n\n\`inline code\` here</textarea><div id="mp-output" class="mp-output"></div></div>`,
      css: `
.mp-wrap {
  display: flex;
  gap: 12px;
  max-width: 700px;
}
.mp-input {
  flex: 1;
  padding: 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #e0e0e0;
  font-family: monospace;
  font-size: 13px;
  resize: vertical;
  outline: none;
}
.mp-input:focus {
  border-color: #4fc3f7;
}
.mp-output {
  flex: 1;
  padding: 12px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  font-size: 14px;
  color: #e0e0e0;
  line-height: 1.6;
  overflow-y: auto;
}
.mp-output h1 {
  font-size: 22px;
  color: #4fc3f7;
  border-bottom: 1px solid #334155;
  padding-bottom: 6px;
  margin: 0 0 8px;
}
.mp-output h2 {
  font-size: 17px;
  color: #4fc3f7;
  margin: 12px 0 6px;
}
.mp-output strong {
  color: #4fc3f7;
}
.mp-output em {
  color: #facc15;
}
.mp-output ul {
  padding-left: 20px;
  margin: 8px 0;
}
.mp-output li {
  margin: 4px 0;
  color: #94a3b8;
}
.mp-output a {
  color: #4fc3f7;
  text-decoration: underline;
}
.mp-output code {
  background: #1e293b;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: #4ade80;
}
      `,
      js: `
const input = document.getElementById('mp-input');
const output = document.getElementById('mp-output');

function parse(md) {
  let html = md;
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>');
  html = html.replace(/\\*(.+?)\\*/g, '<em>$1</em>');
  html = html.replace(/\`([^\`]+)\`/g, '<code>$1</code>');
  html = html.replace(
    /\\[([^\\]]+)\\]\\(([^)]+)\\)/g,
    '<a href="$2" target="_blank">$1</a>'
  );
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(
    /(<li>.*<\\/li>)/gs,
    (m) => '<ul>' + m + '</ul>'
  );
  html = html.replace(/\\n\\n/g, '<br/>');
  return html;
}

function render() {
  output.innerHTML = parse(input.value);
}

input.addEventListener('input', render);
render();
      `,
    },
  },
  {
    id: 'js-json-viewer',
    title: 'JSON Viewer',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Build a collapsible JSON tree viewer with syntax coloring, expand/collapse all, copy path, and search highlighting.',
    concepts: ['Recursive rendering', 'JSON parsing', 'Tree toggle', 'Type detection'],
    demoCode: {
      html: `
<div class="jv-wrap">
  <div class="jv-header">
    <button class="jv-btn" id="jv-expand">Expand All</button>
    <button class="jv-btn" id="jv-collapse">Collapse All</button>
  </div>
  <div class="jv-tree" id="jv-tree"></div>
</div>
      `,
      css: `
.jv-wrap {
  max-width: 500px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
}
.jv-header {
  display: flex;
  gap: 6px;
  padding: 8px;
  border-bottom: 1px solid #334155;
}
.jv-btn {
  padding: 4px 10px;
  background: #334155;
  border: none;
  border-radius: 4px;
  color: #e0e0e0;
  font-size: 11px;
  cursor: pointer;
}
.jv-btn:hover {
  background: #475569;
}
.jv-tree {
  padding: 12px;
  font-family: monospace;
  font-size: 13px;
  max-height: 300px;
  overflow-y: auto;
}
.jv-node {
  margin-left: 16px;
}
.jv-key {
  color: #4fc3f7;
  cursor: pointer;
}
.jv-str {
  color: #4ade80;
}
.jv-num {
  color: #facc15;
}
.jv-bool {
  color: #c084fc;
}
.jv-null {
  color: #64748b;
}
.jv-bracket {
  color: #94a3b8;
}
.jv-toggle {
  cursor: pointer;
  user-select: none;
  color: #64748b;
  font-size: 10px;
  margin-right: 4px;
}
.jv-hidden {
  display: none;
}
.jv-count {
  color: #64748b;
  font-size: 11px;
}
      `,
      js: `
const data = {
  name: 'Project',
  version: '1.0.0',
  config: { debug: true, port: 3000, db: { host: 'localhost', port: 5432 } },
  tags: ['web', 'api', 'typescript'],
  active: true,
  meta: null,
};
const tree = document.getElementById('jv-tree');
function render(obj, parent, depth = 0) {
  if (Array.isArray(obj)) {
    const wrap = document.createElement('div');
    const toggle = document.createElement('span');
    toggle.className = 'jv-toggle';
    toggle.textContent = '▼ ';
    const bracket = document.createElement('span');
    bracket.className = 'jv-bracket';
    bracket.textContent = '[';
    const count = document.createElement('span');
    count.className = 'jv-count';
    count.textContent = ' ' + obj.length + ' items';
    const inner = document.createElement('div');
    inner.className = 'jv-node';
    obj.forEach((v, i) => {
      const line = document.createElement('div');
      renderValue(v, line, depth + 1);
      if (i < obj.length - 1) {
        const comma = document.createElement('span');
        comma.className = 'jv-bracket';
        comma.textContent = ',';
        line.appendChild(comma);
      }
      inner.appendChild(line);
    });
    const close = document.createElement('span');
    close.className = 'jv-bracket';
    close.textContent = ']';
    toggle.addEventListener('click', () => {
      const hidden = inner.classList.toggle('jv-hidden');
      toggle.textContent = hidden ? '▶ ' : '▼ ';
      count.style.display = hidden ? 'inline' : 'none';
    });
    wrap.appendChild(toggle);
    wrap.appendChild(bracket);
    wrap.appendChild(count);
    parent.appendChild(wrap);
    parent.appendChild(inner);
    parent.appendChild(close);
  } else if (obj && typeof obj === 'object') {
    const wrap = document.createElement('div');
    const toggle = document.createElement('span');
    toggle.className = 'jv-toggle';
    toggle.textContent = '▼ ';
    const bracket = document.createElement('span');
    bracket.className = 'jv-bracket';
    bracket.textContent = '{';
    const keys = Object.keys(obj);
    const count = document.createElement('span');
    count.className = 'jv-count';
    count.textContent = ' ' + keys.length + ' keys';
    const inner = document.createElement('div');
    inner.className = 'jv-node';
    keys.forEach((k, i) => {
      const line = document.createElement('div');
      const key = document.createElement('span');
      key.className = 'jv-key';
      key.textContent = '"' + k + '": ';
      line.appendChild(key);
      renderValue(obj[k], line, depth + 1);
      if (i < keys.length - 1) {
        const comma = document.createElement('span');
        comma.className = 'jv-bracket';
        comma.textContent = ',';
        line.appendChild(comma);
      }
      inner.appendChild(line);
    });
    const close = document.createElement('span');
    close.className = 'jv-bracket';
    close.textContent = '}';
    toggle.addEventListener('click', () => {
      const hidden = inner.classList.toggle('jv-hidden');
      toggle.textContent = hidden ? '▶ ' : '▼ ';
      count.style.display = hidden ? 'inline' : 'none';
    });
    wrap.appendChild(toggle);
    wrap.appendChild(bracket);
    wrap.appendChild(count);
    parent.appendChild(wrap);
    parent.appendChild(inner);
    parent.appendChild(close);
  } else {
    renderValue(obj, parent, depth);
  }
}
function renderValue(v, parent, depth) {
  if (v === null) {
    const s = document.createElement('span');
    s.className = 'jv-null';
    s.textContent = 'null';
    parent.appendChild(s);
  } else if (typeof v === 'string') {
    const s = document.createElement('span');
    s.className = 'jv-str';
    s.textContent = '"' + v + '"';
    parent.appendChild(s);
  } else if (typeof v === 'number') {
    const s = document.createElement('span');
    s.className = 'jv-num';
    s.textContent = v;
    parent.appendChild(s);
  } else if (typeof v === 'boolean') {
    const s = document.createElement('span');
    s.className = 'jv-bool';
    s.textContent = v;
    parent.appendChild(s);
  } else {
    render(v, parent, depth);
  }
}
render(data, tree);
document.getElementById('jv-expand').addEventListener('click', () => {
  tree
    .querySelectorAll('.jv-hidden')
    .forEach((n) => n.classList.remove('jv-hidden'));
  tree
    .querySelectorAll('.jv-toggle')
    .forEach((t) => (t.textContent = '▼ '));
  tree.querySelectorAll('.jv-count').forEach((c) => (c.style.display = 'none'));
});
document.getElementById('jv-collapse').addEventListener('click', () => {
  tree
    .querySelectorAll('.jv-node')
    .forEach((n) => n.classList.add('jv-hidden'));
  tree
    .querySelectorAll('.jv-toggle')
    .forEach((t) => (t.textContent = '▶ '));
  tree
    .querySelectorAll('.jv-count')
    .forEach((c) => (c.style.display = 'inline'));
});
      `,
    },
  },
  {
    id: 'js-comparison-table',
    title: 'Comparison Table',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a feature comparison table with check/cross indicators, sticky headers, highlighted columns, and responsive scrolling.',
    concepts: [
      'Table rendering',
      'Sticky positioning',
      'Dynamic highlights',
      'Responsive overflow',
    ],
    demoCode: {
      html: `
<div class="ct-wrap">
  <table class="ct-table" id="ct-table">
    <thead>
      <tr>
        <th>Feature</th>
        <th class="ct-plan">Basic</th>
        <th class="ct-plan ct-pop">Pro</th>
        <th class="ct-plan">Enterprise</th>
      </tr>
    </thead>
    <tbody id="ct-body"></tbody>
  </table>
</div>
      `,
      css: `
.ct-wrap {
  overflow-x: auto;
  max-width: 500px;
}
.ct-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.ct-table th,
.ct-table td {
  padding: 10px 14px;
  text-align: center;
  border-bottom: 1px solid #334155;
}
.ct-table th:first-child,
.ct-table td:first-child {
  text-align: left;
  color: #e0e0e0;
}
.ct-table thead th {
  background: #0f172a;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 600;
  position: sticky;
  top: 0;
}
.ct-plan {
  min-width: 80px;
}
.ct-pop {
  background: rgba(79, 195, 247, 0.08) !important;
  color: #4fc3f7 !important;
}
.ct-check {
  color: #4ade80;
  font-size: 16px;
}
.ct-cross {
  color: #475569;
  font-size: 16px;
}
.ct-table tbody tr:hover {
  background: rgba(79, 195, 247, 0.04);
}
      `,
      js: `
const features = [
  { name: 'Users', basic: '10', pro: '100', ent: 'Unlimited' },
  { name: 'Storage', basic: '1 GB', pro: '50 GB', ent: '500 GB' },
  { name: 'API Access', basic: false, pro: true, ent: true },
  { name: 'Analytics', basic: false, pro: true, ent: true },
  { name: 'Custom Domain', basic: false, pro: false, ent: true },
  { name: 'Priority Support', basic: false, pro: true, ent: true },
  { name: 'SSO', basic: false, pro: false, ent: true },
];
const tbody = document.getElementById('ct-body');
features.forEach((f) => {
  const tr = document.createElement('tr');
  function cell(v) {
    const td = document.createElement('td');
    if (typeof v === 'boolean') {
      td.innerHTML = v
        ? '<span class="ct-check">\\u2713</span>'
        : '<span class="ct-cross">\\u2717</span>';
    } else {
      td.textContent = v;
      td.style.color = '#e0e0e0';
      td.style.fontWeight = '600';
    }
    return td;
  }
  tr.appendChild(cell(f.name));
  tr.appendChild(cell(f.basic));
  const proCell = cell(f.pro);
  proCell.classList.add('ct-pop');
  tr.appendChild(proCell);
  tr.appendChild(cell(f.ent));
  tbody.appendChild(tr);
});
      `,
    },
  },
  {
    id: 'js-pricing-table',
    title: 'Pricing Table',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create a responsive pricing table with monthly/annual toggle, featured plan highlighting, and animated price transitions.',
    concepts: ['Toggle state', 'Number animation', 'CSS Grid', 'Responsive design'],
    demoCode: {
      html: `
<div class="pt-wrap">
  <div class="pt-toggle">
    <span>Monthly</span>
    <label class="pt-switch">
      <input type="checkbox" id="pt-annual" />
      <span class="pt-slider"></span>
    </label>
    <span>
      Annual
      <span class="pt-save">Save 20%</span>
    </span>
  </div>
  <div class="pt-grid" id="pt-grid"></div>
</div>
      `,
      css: `
.pt-wrap {
  max-width: 600px;
}
.pt-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #94a3b8;
}
.pt-switch {
  position: relative;
  width: 40px;
  height: 22px;
}
.pt-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.pt-slider {
  position: absolute;
  inset: 0;
  background: #334155;
  border-radius: 22px;
  cursor: pointer;
  transition: background 0.2s;
}
.pt-slider::before {
  content: "";
  position: absolute;
  left: 2px;
  bottom: 2px;
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s;
}
input:checked + .pt-slider {
  background: #4fc3f7;
}
input:checked + .pt-slider::before {
  transform: translateX(18px);
}
.pt-save {
  color: #4ade80;
  font-size: 11px;
  font-weight: 600;
}
.pt-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.pt-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}
.pt-card.featured {
  border-color: #4fc3f7;
  background: #1a2744;
}
.pt-name {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 4px;
}
.pt-price {
  font-size: 28px;
  font-weight: 700;
  color: #e0e0e0;
  margin-bottom: 4px;
  transition: all 0.3s;
}
.pt-period {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 12px;
}
.pt-features {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
  text-align: left;
  font-size: 12px;
  color: #94a3b8;
}
.pt-features li {
  padding: 4px 0;
}
.pt-features li::before {
  content: "\\u2713 ";
  color: #4fc3f7;
}
.pt-cta {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
  background: #334155;
  color: #e0e0e0;
}
.pt-card.featured .pt-cta {
  background: #4fc3f7;
  color: #1a1a2e;
}
      `,
      js: `
const plans = [
  {
    name: 'Starter',
    monthly: 9,
    features: ['5 projects', '1 GB storage', 'Email support'],
  },
  {
    name: 'Pro',
    monthly: 29,
    featured: true,
    features: [
      'Unlimited projects',
      '50 GB storage',
      'Priority support',
      'API access',
    ],
  },
  {
    name: 'Enterprise',
    monthly: 99,
    features: [
      'Everything in Pro',
      '500 GB storage',
      'SSO',
      'Dedicated manager',
    ],
  },
];
const grid = document.getElementById('pt-grid'),
  toggle = document.getElementById('pt-annual');
function render() {
  grid.innerHTML = '';
  const annual = toggle.checked;
  plans.forEach((p) => {
    const price = annual ? Math.round(p.monthly * 12 * 0.8) : p.monthly;
    const period = annual ? '/year' : '/month';
    const d = document.createElement('div');
    d.className = 'pt-card' + (p.featured ? ' featured' : '');
    d.innerHTML =
      '<div class="pt-name">' +
      p.name +
      '</div><div class="pt-price">$' +
      price +
      '</div><div class="pt-period">' +
      period +
      '</div><ul class="pt-features">' +
      p.features.map((f) => '<li>' + f + '</li>').join('') +
      '</ul><button class="pt-cta">Choose Plan</button>';
    grid.appendChild(d);
  });
}
toggle.addEventListener('change', render);
render();
      `,
    },
  },
  {
    id: 'js-feature-list',
    title: 'Feature List',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build a feature showcase list with icons, descriptions, expandable details, and category filtering.',
    concepts: ['Accordion pattern', 'Filtering', 'Template rendering', 'Event delegation'],
    demoCode: {
      html: `<div class="fl-wrap"><div class="fl-list" id="fl-list"></div></div>`,
      css: `
.fl-wrap {
  max-width: 420px;
}
.fl-item {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  margin-bottom: 8px;
  overflow: hidden;
}
.fl-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  cursor: pointer;
}
.fl-header:hover {
  background: #293548;
}
.fl-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}
.fl-info {
  flex: 1;
}
.fl-name {
  font-size: 14px;
  color: #e0e0e0;
  font-weight: 600;
}
.fl-desc {
  font-size: 12px;
  color: #64748b;
}
.fl-arrow {
  color: #64748b;
  font-size: 12px;
  transition: transform 0.2s;
}
.fl-item.open .fl-arrow {
  transform: rotate(90deg);
}
.fl-detail {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s;
  padding: 0 12px;
}
.fl-item.open .fl-detail {
  max-height: 100px;
  padding: 0 12px 12px;
}
.fl-detail p {
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.5;
  margin: 0;
}
      `,
      js: `
const features = [
  {
    icon: '⚡',
    bg: '#1e3a5f',
    name: 'Fast Performance',
    desc: 'Optimized for speed',
    detail:
      'Built with cutting-edge web technologies for sub-second load times.',
  },
  {
    icon: '🔒',
    bg: '#3b1f5e',
    name: 'Secure',
    desc: 'Enterprise-grade security',
    detail:
      'End-to-end encryption, SSO, and compliance with industry standards.',
  },
  {
    icon: '🌍',
    bg: '#1f4a3b',
    name: 'Global CDN',
    desc: 'Worldwide distribution',
    detail: 'Content delivered from 200+ edge locations across 6 continents.',
  },
  {
    icon: '📈',
    bg: '#5e3b1f',
    name: 'Analytics',
    desc: 'Real-time insights',
    detail: 'Track user behavior, conversions, and custom events in real time.',
  },
];
const list = document.getElementById('fl-list');
features.forEach((f) => {
  const d = document.createElement('div');
  d.className = 'fl-item';
  d.innerHTML =
    '<div class="fl-header"><div class="fl-icon" style="background:' +
    f.bg +
    '">' +
    f.icon +
    '</div><div class="fl-info"><div class="fl-name">' +
    f.name +
    '</div><div class="fl-desc">' +
    f.desc +
    '</div></div><span class="fl-arrow">▶</span></div><div class="fl-detail"><p>' +
    f.detail +
    '</p></div>';
  d.querySelector('.fl-header').addEventListener('click', () =>
    d.classList.toggle('open'),
  );
  list.appendChild(d);
});
      `,
    },
  },
  {
    id: 'js-testimonials',
    title: 'Testimonials',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create a testimonials carousel/grid with avatar, rating stars, quote display, and auto-rotation.',
    concepts: ['Carousel logic', 'setInterval', 'Dynamic rendering', 'CSS transitions'],
    demoCode: {
      html: `
<div class="tm-wrap">
  <div class="tm-card" id="tm-card"></div>
  <div class="tm-dots" id="tm-dots"></div>
</div>
      `,
      css: `
.tm-wrap {
  max-width: 380px;
  text-align: center;
}
.tm-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 12px;
  transition: opacity 0.3s;
}
.tm-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
}
.tm-stars {
  color: #facc15;
  font-size: 16px;
  margin-bottom: 8px;
  letter-spacing: 2px;
}
.tm-quote {
  font-size: 14px;
  color: #e0e0e0;
  line-height: 1.5;
  font-style: italic;
  margin-bottom: 12px;
}
.tm-name {
  font-size: 13px;
  font-weight: 600;
  color: #e0e0e0;
}
.tm-role {
  font-size: 12px;
  color: #64748b;
}
.tm-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
}
.tm-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #334155;
  cursor: pointer;
  transition: background 0.2s;
}
.tm-dot.active {
  background: #4fc3f7;
}
      `,
      js: `
const testimonials = [
  {
    name: 'Alice Chen',
    role: 'Product Manager',
    color: '#1e3a5f',
    stars: 5,
    quote: 'Absolutely transformed our workflow. The team loves it!',
  },
  {
    name: 'Bob Kumar',
    role: 'Developer',
    color: '#3b1f5e',
    stars: 5,
    quote:
      'Best developer experience I have encountered. Clean APIs and great docs.',
  },
  {
    name: 'Carol Smith',
    role: 'Designer',
    color: '#1f4a3b',
    stars: 4,
    quote:
      'Beautiful components that are easy to customize. Highly recommended.',
  },
];
const card = document.getElementById('tm-card'),
  dots = document.getElementById('tm-dots');
let cur = 0;
testimonials.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'tm-dot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => show(i));
  dots.appendChild(d);
});
function show(i) {
  cur = i;
  const t = testimonials[i];
  card.style.opacity = 0;
  setTimeout(() => {
    card.innerHTML =
      '<div class="tm-avatar" style="background:' +
      t.color +
      '">' +
      t.name[0] +
      '</div><div class="tm-stars">' +
      '\\u2605'.repeat(t.stars) +
      '\\u2606'.repeat(5 - t.stars) +
      '</div><p class="tm-quote">"' +
      t.quote +
      '"</p><div class="tm-name">' +
      t.name +
      '</div><div class="tm-role">' +
      t.role +
      '</div>';
    card.style.opacity = 1;
  }, 200);
  dots
    .querySelectorAll('.tm-dot')
    .forEach((d, j) => d.classList.toggle('active', j === i));
}
show(0);
setInterval(() => show((cur + 1) % testimonials.length), 4000);
      `,
    },
  },
  {
    id: 'js-team-grid',
    title: 'Team Grid',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build a responsive team member grid with avatars, roles, social links, and hover effects.',
    concepts: ['CSS Grid', 'Dynamic rendering', 'Hover effects', 'Responsive layout'],
    demoCode: {
      html: `<div class="tg-wrap"><div class="tg-grid" id="tg-grid"></div></div>`,
      css: `
.tg-wrap {
  max-width: 500px;
}
.tg-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.tg-member {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  transition:
    transform 0.2s,
    border-color 0.2s;
}
.tg-member:hover {
  transform: translateY(-2px);
  border-color: #4fc3f7;
}
.tg-av {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin: 0 auto 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
}
.tg-name {
  font-size: 14px;
  font-weight: 600;
  color: #e0e0e0;
  margin-bottom: 2px;
}
.tg-role {
  font-size: 12px;
  color: #64748b;
}
      `,
      js: `
const team = [
  { name: 'Alice', role: 'CEO', color: '#1e3a5f' },
  { name: 'Bob', role: 'CTO', color: '#3b1f5e' },
  { name: 'Carol', role: 'Design Lead', color: '#1f4a3b' },
  { name: 'Dave', role: 'Engineer', color: '#5e3b1f' },
  { name: 'Eve', role: 'Engineer', color: '#4a1f3b' },
  { name: 'Frank', role: 'Marketing', color: '#1f3b5e' },
];
const grid = document.getElementById('tg-grid');
team.forEach((m) => {
  const d = document.createElement('div');
  d.className = 'tg-member';
  d.innerHTML =
    '<div class="tg-av" style="background:' +
    m.color +
    '">' +
    m.name[0] +
    '</div><div class="tg-name">' +
    m.name +
    '</div><div class="tg-role">' +
    m.role +
    '</div>';
  grid.appendChild(d);
});
      `,
    },
  },
  {
    id: 'js-changelog',
    title: 'Changelog',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create a styled changelog/release notes display with version badges, date labels, and categorized entries (added/fixed/changed).',
    concepts: ['Semantic markup', 'Badge styling', 'List rendering', 'Version formatting'],
    demoCode: {
      html: `<div class="cl-wrap" id="cl-wrap"></div>`,
      css: `
.cl-wrap {
  max-width: 450px;
}
.cl-release {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 12px;
}
.cl-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.cl-version {
  background: #4fc3f7;
  color: #1a1a2e;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
}
.cl-date {
  font-size: 12px;
  color: #64748b;
}
.cl-section {
  margin-bottom: 8px;
}
.cl-type {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: 3px;
  display: inline-block;
  margin-bottom: 4px;
}
.cl-added {
  background: rgba(74, 222, 128, 0.15);
  color: #4ade80;
}
.cl-fixed {
  background: rgba(79, 195, 247, 0.15);
  color: #4fc3f7;
}
.cl-changed {
  background: rgba(250, 204, 21, 0.15);
  color: #facc15;
}
.cl-items {
  list-style: none;
  padding: 0;
  margin: 0;
}
.cl-items li {
  font-size: 13px;
  color: #94a3b8;
  padding: 2px 0 2px 16px;
  position: relative;
}
.cl-items li::before {
  content: "\\u2022";
  position: absolute;
  left: 4px;
  color: #475569;
}
      `,
      js: `
const releases = [
  {
    version: '2.1.0',
    date: 'Jan 28, 2024',
    sections: [
      {
        type: 'added',
        items: ['Dark mode support', 'Export to PDF', 'Keyboard shortcuts'],
      },
      {
        type: 'fixed',
        items: ['Login redirect issue', 'Chart rendering on mobile'],
      },
    ],
  },
  {
    version: '2.0.0',
    date: 'Jan 15, 2024',
    sections: [
      {
        type: 'added',
        items: ['New dashboard layout', 'Real-time notifications'],
      },
      {
        type: 'changed',
        items: ['Updated API endpoints', 'Redesigned settings page'],
      },
      { type: 'fixed', items: ['Memory leak in WebSocket connection'] },
    ],
  },
];
const wrap = document.getElementById('cl-wrap');
releases.forEach((r) => {
  const d = document.createElement('div');
  d.className = 'cl-release';
  let html =
    '<div class="cl-header"><span class="cl-version">v' +
    r.version +
    '</span><span class="cl-date">' +
    r.date +
    '</span></div>';
  r.sections.forEach((s) => {
    html +=
      '<div class="cl-section"><span class="cl-type cl-' +
      s.type +
      '">' +
      s.type +
      '</span><ul class="cl-items">' +
      s.items.map((i) => '<li>' + i + '</li>').join('') +
      '</ul></div>';
  });
  d.innerHTML = html;
  wrap.appendChild(d);
});
      `,
    },
  },
  {
    id: 'js-status-page',
    title: 'Status Page',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a service status page with uptime indicators, incident history, and real-time status updates.',
    concepts: ['Status indicators', 'Dynamic rendering', 'Color coding', 'Time formatting'],
    demoCode: {
      html: `
<div class="sp-wrap">
  <div class="sp-overall" id="sp-overall"></div>
  <div class="sp-services" id="sp-services"></div>
  <div class="sp-incidents">
    <h4 class="sp-inc-title">Recent Incidents</h4>
    <div id="sp-incidents"></div>
  </div>
</div>
      `,
      css: `
.sp-wrap {
  max-width: 450px;
}
.sp-overall {
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 16px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}
.sp-ok {
  background: rgba(74, 222, 128, 0.1);
  color: #4ade80;
  border: 1px solid rgba(74, 222, 128, 0.2);
}
.sp-service {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  margin-bottom: 6px;
}
.sp-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.sp-dot.up {
  background: #4ade80;
}
.sp-dot.degraded {
  background: #facc15;
}
.sp-dot.down {
  background: #ef4444;
}
.sp-sname {
  flex: 1;
  font-size: 14px;
  color: #e0e0e0;
}
.sp-uptime {
  font-size: 12px;
  color: #64748b;
}
.sp-inc-title {
  font-size: 14px;
  color: #e0e0e0;
  margin: 16px 0 8px;
}
.sp-incident {
  padding: 10px 12px;
  background: #0f172a;
  border-radius: 8px;
  margin-bottom: 6px;
  border-left: 3px solid #facc15;
}
.sp-inc-date {
  font-size: 11px;
  color: #64748b;
}
.sp-inc-msg {
  font-size: 13px;
  color: #94a3b8;
  margin-top: 2px;
}
      `,
      js: `
const services = [
  { name: 'API Server', status: 'up', uptime: '99.98%' },
  { name: 'Web App', status: 'up', uptime: '99.95%' },
  { name: 'Database', status: 'up', uptime: '99.99%' },
  { name: 'CDN', status: 'degraded', uptime: '98.50%' },
  { name: 'Email Service', status: 'up', uptime: '99.90%' },
];
const incidents = [
  {
    date: 'Jan 27, 14:30 UTC',
    msg: 'CDN latency increased in EU region. Investigating.',
  },
  {
    date: 'Jan 25, 09:15 UTC',
    msg: 'Scheduled maintenance on Database cluster. No downtime.',
  },
];
const allUp = services.every((s) => s.status === 'up');
const overall = document.getElementById('sp-overall');
overall.className = 'sp-overall ' + (allUp ? 'sp-ok' : 'sp-ok');
overall.textContent = allUp
  ? 'All Systems Operational'
  : 'Some Systems Degraded';
const svc = document.getElementById('sp-services');
services.forEach((s) => {
  const d = document.createElement('div');
  d.className = 'sp-service';
  d.innerHTML =
    '<div class="sp-dot ' +
    s.status +
    '"></div><span class="sp-sname">' +
    s.name +
    '</span><span class="sp-uptime">' +
    s.uptime +
    '</span>';
  svc.appendChild(d);
});
const inc = document.getElementById('sp-incidents');
incidents.forEach((i) => {
  const d = document.createElement('div');
  d.className = 'sp-incident';
  d.innerHTML =
    '<div class="sp-inc-date">' +
    i.date +
    '</div><div class="sp-inc-msg">' +
    i.msg +
    '</div>';
  inc.appendChild(d);
});
      `,
    },
  },
  {
    id: 'js-metric-dashboard',
    title: 'Metric Dashboard',
    category: 'data-display',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create a metrics dashboard with mini bar charts, percentage rings, trend arrows, and real-time counter updates.',
    concepts: ['SVG circles', 'requestAnimationFrame', 'Mini charts', 'Responsive grid'],
    demoCode: {
      html: `<div class="md-wrap"><div class="md-grid" id="md-grid"></div></div>`,
      css: `
.md-wrap {
  max-width: 500px;
}
.md-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.md-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 16px;
}
.md-label {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 6px;
}
.md-value {
  font-size: 22px;
  font-weight: 700;
  color: #e0e0e0;
  margin-bottom: 4px;
}
.md-trend {
  font-size: 12px;
  font-weight: 600;
}
.md-up {
  color: #4ade80;
}
.md-down {
  color: #ef4444;
}
.md-bars {
  display: flex;
  align-items: end;
  gap: 3px;
  height: 40px;
  margin-top: 8px;
}
.md-bar {
  flex: 1;
  background: #4fc3f7;
  border-radius: 2px;
  opacity: 0.7;
  transition: height 0.3s;
}
      `,
      js: `
const metrics = [
  {
    label: 'Page Views',
    value: 48293,
    trend: '+15.2%',
    up: true,
    bars: [60, 45, 80, 70, 90, 75, 95],
  },
  {
    label: 'Bounce Rate',
    value: 32,
    trend: '-4.8%',
    up: false,
    bars: [50, 55, 45, 40, 38, 35, 32],
    suffix: '%',
  },
  {
    label: 'Avg Duration',
    value: 245,
    trend: '+8.1%',
    up: true,
    bars: [30, 40, 50, 55, 60, 65, 70],
    suffix: 's',
  },
  {
    label: 'Conversions',
    value: 1847,
    trend: '+22.3%',
    up: true,
    bars: [20, 30, 45, 55, 60, 70, 85],
  },
];
const grid = document.getElementById('md-grid');
metrics.forEach((m) => {
  const d = document.createElement('div');
  d.className = 'md-card';
  const barHtml = m.bars
    .map((b) => '<div class="md-bar" style="height:' + b + '%"></div>')
    .join('');
  d.innerHTML =
    '<div class="md-label">' +
    m.label +
    '</div><div class="md-value">' +
    m.value.toLocaleString() +
    (m.suffix || '') +
    '</div><div class="md-trend ' +
    (m.up ? 'md-up' : 'md-down') +
    '">' +
    (m.up ? '\\u2191' : '\\u2193') +
    ' ' +
    m.trend +
    '</div><div class="md-bars">' +
    barHtml +
    '</div>';
  grid.appendChild(d);
});
      `,
    },
  },
  // --- navigation ---
  {
    id: 'js-command-menu',
    title: 'Command Menu',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Build a command menu with nested sub-menus, breadcrumb navigation, recent items, and fuzzy search across menu layers.',
    concepts: ['Menu stack', 'Breadcrumb state', 'Keyboard nav', 'Nested rendering'],
    demoCode: {
      html: `
<div class="cmn-wrap">
  <p class="cmn-hint">Press / to open</p>
  <div class="cmn-overlay" id="cmn-overlay">
    <div class="cmn-menu">
      <div class="cmn-breadcrumb" id="cmn-bc">Home</div>
      <input class="cmn-input" id="cmn-input" placeholder="Search..." />
      <ul class="cmn-list" id="cmn-list"></ul>
    </div>
  </div>
</div>
      `,
      css: `
.cmn-wrap {
  text-align: center;
}
.cmn-hint {
  font-size: 13px;
  color: #64748b;
}
.cmn-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  justify-content: center;
  padding-top: 80px;
}
.cmn-overlay.open {
  display: flex;
}
.cmn-menu {
  width: 380px;
  max-height: 320px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.cmn-breadcrumb {
  padding: 8px 12px;
  font-size: 11px;
  color: #64748b;
  border-bottom: 1px solid #334155;
}
.cmn-input {
  padding: 12px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #334155;
  color: #e0e0e0;
  font-size: 14px;
  outline: none;
}
.cmn-list {
  list-style: none;
  padding: 4px;
  margin: 0;
  overflow-y: auto;
  flex: 1;
}
.cmn-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #e0e0e0;
}
.cmn-item:hover,
.cmn-item.active {
  background: #334155;
}
.cmn-arrow {
  color: #64748b;
  font-size: 10px;
}
      `,
      js: `
const menus = {
  root: [
    { name: 'File', sub: 'file' },
    { name: 'Edit', sub: 'edit' },
    { name: 'View', sub: 'view' },
    { name: 'Help', action: true },
  ],
  file: [
    { name: 'New File', action: true },
    { name: 'Open', action: true },
    { name: 'Save', action: true },
    { name: 'Export', sub: 'export' },
  ],
  edit: [
    { name: 'Undo', action: true },
    { name: 'Redo', action: true },
    { name: 'Cut', action: true },
    { name: 'Copy', action: true },
  ],
  view: [
    { name: 'Zoom In', action: true },
    { name: 'Zoom Out', action: true },
    { name: 'Full Screen', action: true },
  ],
  export: [
    { name: 'PDF', action: true },
    { name: 'CSV', action: true },
    { name: 'JSON', action: true },
  ],
};
const overlay = document.getElementById('cmn-overlay'),
  input = document.getElementById('cmn-input'),
  list = document.getElementById('cmn-list'),
  bc = document.getElementById('cmn-bc');
let stack = ['root'],
  idx = -1;
function render(q) {
  const key = stack[stack.length - 1];
  const items = (menus[key] || []).filter(
    (i) => !q || i.name.toLowerCase().includes(q.toLowerCase()),
  );
  list.innerHTML = '';
  idx = -1;
  items.forEach((i) => {
    const li = document.createElement('li');
    li.className = 'cmn-item';
    li.innerHTML =
      i.name + (i.sub ? '<span class="cmn-arrow">▶</span>' : '');
    li.addEventListener('click', () => {
      if (i.sub) {
        stack.push(i.sub);
        bc.textContent = stack.join(' > ');
        input.value = '';
        render('');
      } else {
        close();
      }
    });
    list.appendChild(li);
  });
  bc.textContent = stack
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' > ');
}
function open() {
  overlay.classList.add('open');
  stack = ['root'];
  input.value = '';
  input.focus();
  render('');
}
function close() {
  overlay.classList.remove('open');
}
document.addEventListener('keydown', (e) => {
  if (e.key === '/') {
    e.preventDefault();
    open();
  }
  if (!overlay.classList.contains('open')) return;
  if (e.key === 'Escape') {
    if (stack.length > 1) {
      stack.pop();
      input.value = '';
      render('');
    } else close();
  }
  if (e.key === 'Backspace' && !input.value && stack.length > 1) {
    stack.pop();
    render('');
  }
  const items = list.querySelectorAll('.cmn-item');
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    idx = Math.min(idx + 1, items.length - 1);
    items.forEach((l, j) => l.classList.toggle('active', j === idx));
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    idx = Math.max(idx - 1, 0);
    items.forEach((l, j) => l.classList.toggle('active', j === idx));
  } else if (e.key === 'Enter' && idx >= 0) {
    items[idx].click();
  }
});
input.addEventListener('input', () => render(input.value));
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) close();
});
      `,
    },
  },
  {
    id: 'js-mini-map',
    title: 'Mini Map',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Build a document minimap showing a scaled overview of the page content with a viewport indicator that syncs with scrolling.',
    concepts: ['Scale transforms', 'Scroll sync', 'Viewport calculation', 'Cloning DOM'],
    demoCode: {
      html: `
<div class="mm-wrap">
  <div class="mm-content" id="mm-content">
    <h2>Document Title</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore.
    </p>
    <h3>Section One</h3>
    <p>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip.
    </p>
    <h3>Section Two</h3>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur.
    </p>
    <h3>Section Three</h3>
    <p>
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
      deserunt mollit anim.
    </p>
    <h3>Section Four</h3>
    <p>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium.
    </p>
  </div>
  <div class="mm-minimap" id="mm-minimap">
    <div class="mm-viewport" id="mm-viewport"></div>
  </div>
</div>
      `,
      css: `
.mm-wrap {
  display: flex;
  gap: 8px;
  max-width: 500px;
  position: relative;
}
.mm-content {
  flex: 1;
  height: 200px;
  overflow-y: auto;
  padding: 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.6;
}
.mm-content h2 {
  font-size: 16px;
  color: #e0e0e0;
  margin: 0 0 8px;
}
.mm-content h3 {
  font-size: 14px;
  color: #4fc3f7;
  margin: 12px 0 4px;
}
.mm-minimap {
  width: 60px;
  height: 200px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}
.mm-viewport {
  position: absolute;
  left: 0;
  right: 0;
  background: rgba(79, 195, 247, 0.15);
  border: 1px solid rgba(79, 195, 247, 0.4);
  border-radius: 2px;
  pointer-events: none;
}
      `,
      js: `
const content = document.getElementById('mm-content'),
  minimap = document.getElementById('mm-minimap'),
  viewport = document.getElementById('mm-viewport');
function updateViewport() {
  const ratio = minimap.clientHeight / content.scrollHeight;
  const top = content.scrollTop * ratio;
  const height = content.clientHeight * ratio;
  viewport.style.top = top + 'px';
  viewport.style.height = Math.max(height, 10) + 'px';
}
content.addEventListener('scroll', updateViewport);
minimap.addEventListener('click', (e) => {
  const rect = minimap.getBoundingClientRect();
  const y = (e.clientY - rect.top) / minimap.clientHeight;
  content.scrollTop = y * content.scrollHeight - content.clientHeight / 2;
});
updateViewport();
      `,
    },
  },
  {
    id: 'js-scroll-to-top',
    title: 'Scroll to Top',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create a scroll-to-top button that appears when the user scrolls down, with smooth animation and progress indicator.',
    concepts: ['Scroll events', 'scrollTo', 'IntersectionObserver', 'CSS transitions'],
    demoCode: {
      html: `
<div class="stt-wrap">
  <div class="stt-content" id="stt-content">
    <p>Scroll down to see the button appear...</p>
    <div class="stt-spacer"></div>
    <p>Keep scrolling...</p>
    <div class="stt-spacer"></div>
    <p>Almost there...</p>
    <div class="stt-spacer"></div>
    <p>The button is now visible!</p>
  </div>
  <button class="stt-btn" id="stt-btn" title="Back to top">&#8593;</button>
</div>
      `,
      css: `
.stt-wrap {
  position: relative;
  max-width: 400px;
}
.stt-content {
  height: 200px;
  overflow-y: auto;
  padding: 16px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  font-size: 14px;
  color: #94a3b8;
}
.stt-spacer {
  height: 150px;
}
.stt-btn {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #4fc3f7;
  color: #1a1a2e;
  border: none;
  font-size: 18px;
  cursor: pointer;
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 0.2s,
    transform 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.stt-btn.visible {
  opacity: 1;
  transform: translateY(0);
}
.stt-btn:hover {
  background: #81d4fa;
}
      `,
      js: `
const content = document.getElementById('stt-content'),
  btn = document.getElementById('stt-btn');
content.addEventListener('scroll', () => {
  btn.classList.toggle('visible', content.scrollTop > 100);
});
btn.addEventListener('click', () => {
  content.scrollTo({ top: 0, behavior: 'smooth' });
});
      `,
    },
  },
  {
    id: 'js-anchor-links',
    title: 'Anchor Links',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build smooth-scrolling anchor links that navigate to page sections with active state tracking and offset support.',
    concepts: ['scrollIntoView', 'IntersectionObserver', 'Active tracking', 'Smooth scroll'],
    demoCode: {
      html: `
<div class="an-wrap">
  <nav class="an-nav" id="an-nav">
    <a class="an-link active" href="#an-s1">Intro</a>
    <a class="an-link" href="#an-s2">Features</a>
    <a class="an-link" href="#an-s3">Pricing</a>
    <a class="an-link" href="#an-s4">Contact</a>
  </nav>
  <div class="an-content" id="an-content">
    <section id="an-s1" class="an-section">
      <h3>Introduction</h3>
      <p>Welcome to our platform.</p>
    </section>
    <section id="an-s2" class="an-section">
      <h3>Features</h3>
      <p>Discover amazing features.</p>
    </section>
    <section id="an-s3" class="an-section">
      <h3>Pricing</h3>
      <p>Affordable plans for everyone.</p>
    </section>
    <section id="an-s4" class="an-section">
      <h3>Contact</h3>
      <p>Get in touch with us.</p>
    </section>
  </div>
</div>
      `,
      css: `
.an-wrap {
  display: flex;
  gap: 12px;
  max-width: 500px;
}
.an-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 80px;
  position: sticky;
  top: 0;
}
.an-link {
  padding: 6px 10px;
  font-size: 13px;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 6px;
  border-left: 2px solid transparent;
  transition: all 0.15s;
}
.an-link:hover {
  color: #e0e0e0;
}
.an-link.active {
  color: #4fc3f7;
  border-left-color: #4fc3f7;
  background: rgba(79, 195, 247, 0.08);
}
.an-content {
  flex: 1;
  height: 200px;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.an-section {
  padding: 16px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  margin-bottom: 8px;
  min-height: 120px;
}
.an-section h3 {
  font-size: 15px;
  color: #e0e0e0;
  margin: 0 0 6px;
}
.an-section p {
  font-size: 13px;
  color: #94a3b8;
  margin: 0;
}
      `,
      js: `
const content = document.getElementById('an-content'),
  links = document.querySelectorAll('.an-link'),
  sections = document.querySelectorAll('.an-section');
links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = content.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
content.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((s) => {
    if (s.offsetTop - content.scrollTop < 60) current = '#' + s.id;
  });
  links.forEach((l) => {
    l.classList.toggle('active', l.getAttribute('href') === current);
  });
});
      `,
    },
  },
  {
    id: 'js-table-of-contents',
    title: 'Table of Contents',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create an auto-generated table of contents from headings with nested indentation, scroll spy, and progress tracking.',
    concepts: ['querySelectorAll headings', 'Nesting logic', 'Scroll spy', 'Dynamic generation'],
    demoCode: {
      html: `
<div class="toc-wrap">
  <aside class="toc-sidebar" id="toc-sidebar"></aside>
  <div class="toc-content" id="toc-content">
    <h2 id="toc-h1">Getting Started</h2>
    <p>Introduction to the platform and setup instructions.</p>
    <h3 id="toc-h2">Installation</h3>
    <p>Run npm install to get started with the project.</p>
    <h3 id="toc-h3">Configuration</h3>
    <p>Set up your environment variables and config files.</p>
    <h2 id="toc-h4">Core Concepts</h2>
    <p>Understanding the fundamental architecture.</p>
    <h3 id="toc-h5">Components</h3>
    <p>Reusable building blocks of the application.</p>
    <h2 id="toc-h6">Advanced</h2>
    <p>Power user features and optimization techniques.</p>
  </div>
</div>
      `,
      css: `
.toc-wrap {
  display: flex;
  gap: 12px;
  max-width: 550px;
}
.toc-sidebar {
  min-width: 140px;
  position: sticky;
  top: 0;
  align-self: flex-start;
}
.toc-item {
  display: block;
  padding: 4px 8px;
  font-size: 12px;
  color: #64748b;
  text-decoration: none;
  border-left: 2px solid #334155;
  cursor: pointer;
  transition: all 0.15s;
}
.toc-item:hover {
  color: #e0e0e0;
}
.toc-item.active {
  color: #4fc3f7;
  border-left-color: #4fc3f7;
}
.toc-item.indent {
  padding-left: 20px;
}
.toc-content {
  flex: 1;
  height: 220px;
  overflow-y: auto;
  padding: 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  scroll-behavior: smooth;
}
.toc-content h2 {
  font-size: 16px;
  color: #e0e0e0;
  margin: 16px 0 6px;
}
.toc-content h3 {
  font-size: 14px;
  color: #4fc3f7;
  margin: 12px 0 4px;
}
.toc-content p {
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.5;
  margin: 0 0 8px;
}
      `,
      js: `
const sidebar = document.getElementById('toc-sidebar'),
  content = document.getElementById('toc-content');
const headings = content.querySelectorAll('h2,h3');
headings.forEach((h) => {
  const a = document.createElement('a');
  a.className = 'toc-item' + (h.tagName === 'H3' ? ' indent' : '');
  a.textContent = h.textContent;
  a.dataset.target = h.id;
  a.addEventListener('click', () => {
    content
      .querySelector('#' + h.id)
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  sidebar.appendChild(a);
});
const tocItems = sidebar.querySelectorAll('.toc-item');
content.addEventListener('scroll', () => {
  let current = '';
  headings.forEach((h) => {
    if (h.offsetTop - content.scrollTop < 40) current = h.id;
  });
  tocItems.forEach((t) => {
    t.classList.toggle('active', t.dataset.target === current);
  });
});
      `,
    },
  },
  {
    id: 'js-step-indicator',
    title: 'Step Indicator',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a multi-step progress indicator with numbered steps, connecting lines, active/completed states, and step navigation.',
    concepts: ['Step state machine', 'CSS pseudo-elements', 'Dynamic classes', 'Linear flow'],
    demoCode: {
      html: `
<div class="si-wrap">
  <div class="si-steps" id="si-steps">
    <div class="si-step completed" data-step="0">
      <div class="si-num">1</div>
      <div class="si-label">Account</div>
    </div>
    <div class="si-line completed"></div>
    <div class="si-step active" data-step="1">
      <div class="si-num">2</div>
      <div class="si-label">Profile</div>
    </div>
    <div class="si-line"></div>
    <div class="si-step" data-step="2">
      <div class="si-num">3</div>
      <div class="si-label">Settings</div>
    </div>
    <div class="si-line"></div>
    <div class="si-step" data-step="3">
      <div class="si-num">4</div>
      <div class="si-label">Review</div>
    </div>
  </div>
  <div class="si-content" id="si-content">Step 2: Complete your profile</div>
  <div class="si-actions">
    <button id="si-prev" class="si-btn">Previous</button>
    <button id="si-next" class="si-btn si-primary">Next</button>
  </div>
</div>
      `,
      css: `
.si-wrap {
  max-width: 500px;
}
.si-steps {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.si-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}
.si-num {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  background: #334155;
  color: #94a3b8;
  transition: all 0.2s;
}
.si-step.active .si-num {
  background: #4fc3f7;
  color: #1a1a2e;
}
.si-step.completed .si-num {
  background: #4ade80;
  color: #1a1a2e;
}
.si-label {
  font-size: 11px;
  color: #64748b;
}
.si-step.active .si-label {
  color: #4fc3f7;
}
.si-line {
  flex: 1;
  height: 2px;
  background: #334155;
  margin: 0 4px;
  transition: background 0.2s;
}
.si-line.completed {
  background: #4ade80;
}
.si-content {
  padding: 20px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  font-size: 14px;
  color: #e0e0e0;
  margin-bottom: 12px;
  text-align: center;
  min-height: 60px;
}
.si-actions {
  display: flex;
  justify-content: space-between;
}
.si-btn {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  background: #334155;
  color: #e0e0e0;
}
.si-btn:hover {
  background: #475569;
}
.si-primary {
  background: #4fc3f7;
  color: #1a1a2e;
}
.si-primary:hover {
  background: #81d4fa;
}
      `,
      js: `
const steps = document.querySelectorAll('.si-step'),
  lines = document.querySelectorAll('.si-line'),
  content = document.getElementById('si-content');
const labels = [
  'Step 1: Create your account',
  'Step 2: Complete your profile',
  'Step 3: Configure settings',
  'Step 4: Review and submit',
];
let current = 1;
function update() {
  steps.forEach((s, i) => {
    s.classList.remove('active', 'completed');
    if (i < current) s.classList.add('completed');
    if (i === current) s.classList.add('active');
  });
  lines.forEach((l, i) => {
    l.classList.toggle('completed', i < current);
  });
  content.textContent = labels[current];
}
document.getElementById('si-prev').addEventListener('click', () => {
  if (current > 0) {
    current--;
    update();
  }
});
document.getElementById('si-next').addEventListener('click', () => {
  if (current < 3) {
    current++;
    update();
  }
});
steps.forEach((s) =>
  s.addEventListener('click', () => {
    current = +s.dataset.step;
    update();
  }),
);
      `,
    },
  },
  {
    id: 'js-app-shell',
    title: 'App Shell',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create a complete app shell layout with header, collapsible sidebar, main content area, and responsive behavior.',
    concepts: ['CSS Grid layout', 'Sidebar toggle', 'Responsive design', 'Layout patterns'],
    demoCode: {
      html: `
<div class="as-wrap">
  <header class="as-header">
    <button class="as-toggle" id="as-toggle">&#9776;</button>
    <span class="as-title">My App</span>
    <div class="as-user">JD</div>
  </header>
  <div class="as-body">
    <aside class="as-sidebar" id="as-sidebar">
      <a class="as-nav-item active">Dashboard</a>
      <a class="as-nav-item">Projects</a>
      <a class="as-nav-item">Settings</a>
      <a class="as-nav-item">Help</a>
    </aside>
    <main class="as-main">
      <h3>Dashboard</h3>
      <p>Welcome to the application shell.</p>
    </main>
  </div>
</div>
      `,
      css: `
.as-wrap {
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
  max-width: 500px;
  height: 250px;
  display: flex;
  flex-direction: column;
}
.as-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: #0f172a;
  border-bottom: 1px solid #334155;
}
.as-toggle {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 18px;
  cursor: pointer;
  padding: 2px 4px;
}
.as-toggle:hover {
  color: #e0e0e0;
}
.as-title {
  flex: 1;
  font-size: 15px;
  font-weight: 600;
  color: #e0e0e0;
}
.as-user {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #4fc3f7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  color: #1a1a2e;
}
.as-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.as-sidebar {
  width: 140px;
  background: #1e293b;
  border-right: 1px solid #334155;
  padding: 8px;
  transition:
    width 0.2s,
    padding 0.2s;
  overflow: hidden;
}
.as-sidebar.collapsed {
  width: 0;
  padding: 0;
}
.as-nav-item {
  display: block;
  padding: 8px 10px;
  font-size: 13px;
  color: #94a3b8;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 2px;
  text-decoration: none;
  white-space: nowrap;
}
.as-nav-item:hover {
  background: #334155;
  color: #e0e0e0;
}
.as-nav-item.active {
  background: rgba(79, 195, 247, 0.1);
  color: #4fc3f7;
}
.as-main {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background: #0f172a;
}
.as-main h3 {
  font-size: 16px;
  color: #e0e0e0;
  margin: 0 0 8px;
}
.as-main p {
  font-size: 13px;
  color: #94a3b8;
}
      `,
      js: `
document.getElementById('as-toggle').addEventListener('click', () => {
  document.getElementById('as-sidebar').classList.toggle('collapsed');
});
document.querySelectorAll('.as-nav-item').forEach((item) => {
  item.addEventListener('click', () => {
    document
      .querySelectorAll('.as-nav-item')
      .forEach((i) => i.classList.remove('active'));
    item.classList.add('active');
    document.querySelector('.as-main h3').textContent = item.textContent;
  });
});
      `,
    },
  },
  {
    id: 'js-header-scroll-hide',
    title: 'Header Scroll Hide',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a header that hides on scroll down and reappears on scroll up, with smooth transitions and threshold control.',
    concepts: [
      'Scroll direction detection',
      'CSS transforms',
      'requestAnimationFrame',
      'Throttling',
    ],
    demoCode: {
      html: `
<div class="hsh-wrap" id="hsh-wrap">
  <header class="hsh-header" id="hsh-header">
    <span>Auto-Hide Header</span>
    <span class="hsh-hint">Scroll to see effect</span>
  </header>
  <div class="hsh-content" id="hsh-content">
    <p>Scroll down - the header will hide.</p>
    <div style="height: 100px"></div>
    <p>Scroll up - the header reappears.</p>
    <div style="height: 100px"></div>
    <p>This creates more content space on mobile.</p>
    <div style="height: 100px"></div>
    <p>End of content.</p>
  </div>
</div>
      `,
      css: `
.hsh-wrap {
  position: relative;
  max-width: 400px;
  height: 220px;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
}
.hsh-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: #0f172a;
  border-bottom: 1px solid #334155;
  transition: transform 0.3s;
  font-size: 14px;
  font-weight: 600;
  color: #e0e0e0;
}
.hsh-header.hidden {
  transform: translateY(-100%);
}
.hsh-hint {
  font-size: 11px;
  color: #64748b;
  font-weight: 400;
}
.hsh-content {
  height: 100%;
  overflow-y: auto;
  padding: 52px 14px 14px;
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.6;
  background: #1e293b;
}
      `,
      js: `
const header = document.getElementById('hsh-header'),
  content = document.getElementById('hsh-content');
let lastScroll = 0;
content.addEventListener('scroll', () => {
  const cur = content.scrollTop;
  header.classList.toggle('hidden', cur > lastScroll && cur > 50);
  lastScroll = cur;
});
      `,
    },
  },
  {
    id: 'js-sticky-header',
    title: 'Sticky Header',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create a header that becomes sticky with a shadow effect when scrolling past a threshold, with smooth visual transitions.',
    concepts: ['position: sticky', 'Scroll events', 'CSS transitions', 'classList toggling'],
    demoCode: {
      html: `
<div class="stk-wrap" id="stk-wrap">
  <div class="stk-hero">Hero Section</div>
  <header class="stk-header" id="stk-header">
    <span class="stk-logo">Brand</span>
    <nav class="stk-nav">
      <a>Home</a>
      <a>About</a>
      <a>Contact</a>
    </nav>
  </header>
  <div class="stk-body">
    <p>Content below the sticky header.</p>
    <div style="height: 80px"></div>
    <p>More content...</p>
    <div style="height: 80px"></div>
    <p>Even more content...</p>
    <div style="height: 80px"></div>
    <p>End of page.</p>
  </div>
</div>
      `,
      css: `
.stk-wrap {
  max-width: 400px;
  height: 220px;
  overflow-y: auto;
  border: 1px solid #334155;
  border-radius: 8px;
  background: #0f172a;
}
.stk-hero {
  padding: 20px;
  background: linear-gradient(135deg, #1e3a5f, #4fc3f7);
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: white;
}
.stk-header {
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: #1e293b;
  transition: box-shadow 0.2s;
}
.stk-header.stuck {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
.stk-logo {
  font-size: 14px;
  font-weight: 700;
  color: #4fc3f7;
}
.stk-nav {
  display: flex;
  gap: 12px;
}
.stk-nav a {
  font-size: 12px;
  color: #94a3b8;
  cursor: pointer;
}
.stk-nav a:hover {
  color: #e0e0e0;
}
.stk-body {
  padding: 14px;
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.6;
}
      `,
      js: `
const wrap = document.getElementById('stk-wrap'),
  header = document.getElementById('stk-header');
wrap.addEventListener('scroll', () => {
  header.classList.toggle('stuck', wrap.scrollTop > 60);
});
      `,
    },
  },
  {
    id: 'js-page-transitions',
    title: 'Page Transitions',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build smooth page transition animations (fade, slide, zoom) between content sections using CSS transitions and JS orchestration.',
    concepts: ['CSS transitions', 'Animation orchestration', 'State machine', 'Content swapping'],
    demoCode: {
      html: `
<div class="ptr-wrap">
  <nav class="ptr-nav">
    <button class="ptr-link active" data-page="0">Home</button>
    <button class="ptr-link" data-page="1">About</button>
    <button class="ptr-link" data-page="2">Contact</button>
  </nav>
  <div class="ptr-viewport">
    <div class="ptr-page active" id="ptr-page-0">
      <h3>Home</h3>
      <p>Welcome to the home page with smooth transitions.</p>
    </div>
    <div class="ptr-page" id="ptr-page-1">
      <h3>About</h3>
      <p>Learn more about our mission and values.</p>
    </div>
    <div class="ptr-page" id="ptr-page-2">
      <h3>Contact</h3>
      <p>Get in touch with us today.</p>
    </div>
  </div>
</div>
      `,
      css: `
.ptr-wrap {
  max-width: 400px;
}
.ptr-nav {
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
}
.ptr-link {
  padding: 8px 16px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #94a3b8;
  cursor: pointer;
  font-size: 13px;
}
.ptr-link:hover {
  border-color: #4fc3f7;
}
.ptr-link.active {
  background: #4fc3f7;
  color: #1a1a2e;
  border-color: #4fc3f7;
}
.ptr-viewport {
  position: relative;
  height: 150px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
}
.ptr-page {
  position: absolute;
  inset: 0;
  padding: 20px;
  opacity: 0;
  transform: translateX(20px);
  transition:
    opacity 0.3s,
    transform 0.3s;
  pointer-events: none;
}
.ptr-page.active {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
}
.ptr-page.exit {
  opacity: 0;
  transform: translateX(-20px);
}
.ptr-page h3 {
  font-size: 16px;
  color: #e0e0e0;
  margin: 0 0 8px;
}
.ptr-page p {
  font-size: 13px;
  color: #94a3b8;
}
      `,
      js: `
const pages = document.querySelectorAll('.ptr-page'),
  links = document.querySelectorAll('.ptr-link');
let current = 0;
links.forEach((link) => {
  link.addEventListener('click', () => {
    const target = +link.dataset.page;
    if (target === current) return;
    pages[current].classList.add('exit');
    pages[current].classList.remove('active');
    links[current].classList.remove('active');
    setTimeout(() => {
      pages[current].classList.remove('exit');
      current = target;
      pages[current].classList.add('active');
      links[current].classList.add('active');
    }, 300);
  });
});
      `,
    },
  },
  {
    id: 'js-route-guard',
    title: 'Route Guard',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Implement client-side route guards that check authentication state before allowing navigation, with redirect and confirmation dialogs.',
    concepts: ['Navigation interception', 'Auth state', 'Confirmation dialog', 'Route matching'],
    demoCode: {
      html: `
<div class="rg-wrap">
  <div class="rg-auth">
    <label>
      <input type="checkbox" id="rg-auth" />
      Logged In
    </label>
  </div>
  <nav class="rg-nav">
    <button class="rg-link" data-route="home">Home</button>
    <button class="rg-link" data-route="dashboard">
      Dashboard (Protected)
    </button>
    <button class="rg-link" data-route="admin">Admin (Protected)</button>
  </nav>
  <div class="rg-view" id="rg-view">Home - Public page</div>
  <div class="rg-alert" id="rg-alert"></div>
</div>
      `,
      css: `
.rg-wrap {
  max-width: 400px;
}
.rg-auth {
  margin-bottom: 8px;
  font-size: 13px;
  color: #94a3b8;
}
.rg-auth input {
  accent-color: #4fc3f7;
}
.rg-nav {
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
}
.rg-link {
  padding: 8px 14px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #94a3b8;
  cursor: pointer;
  font-size: 13px;
}
.rg-link:hover {
  border-color: #4fc3f7;
}
.rg-link.active {
  background: #4fc3f7;
  color: #1a1a2e;
  border-color: #4fc3f7;
}
.rg-view {
  padding: 16px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  font-size: 14px;
  color: #e0e0e0;
  min-height: 60px;
}
.rg-alert {
  margin-top: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  display: none;
}
.rg-alert.show {
  display: block;
}
.rg-alert.error {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}
.rg-alert.success {
  background: rgba(74, 222, 128, 0.1);
  color: #4ade80;
  border: 1px solid rgba(74, 222, 128, 0.2);
}
      `,
      js: `
const routes = {
  home: { content: 'Home - Public page', protected: false },
  dashboard: {
    content: 'Dashboard - Your analytics and data',
    protected: true,
  },
  admin: { content: 'Admin Panel - System configuration', protected: true },
};
const view = document.getElementById('rg-view'),
  alert = document.getElementById('rg-alert'),
  auth = document.getElementById('rg-auth');
function navigate(route) {
  const r = routes[route];
  if (r.protected && !auth.checked) {
    alert.className = 'rg-alert show error';
    alert.textContent = 'Access denied. Please log in first.';
    return;
  }
  alert.className = 'rg-alert show success';
  alert.textContent = 'Navigated to ' + route;
  view.textContent = r.content;
  document.querySelectorAll('.rg-link').forEach((l) => {
    l.classList.toggle('active', l.dataset.route === route);
  });
}
document.querySelectorAll('.rg-link').forEach((l) => {
  l.addEventListener('click', () => navigate(l.dataset.route));
});
      `,
    },
  },
  {
    id: 'js-nested-routes',
    title: 'Nested Routes',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a nested routing system with parent/child views, URL path matching, and outlet rendering using hash-based navigation.',
    concepts: ['Hash routing', 'Nested outlets', 'Route matching', 'Dynamic rendering'],
    demoCode: {
      html: `
<div class="nr-wrap">
  <nav class="nr-nav">
    <a class="nr-link active" href="#/settings">Settings</a>
    <a class="nr-link" href="#/settings/profile">Profile</a>
    <a class="nr-link" href="#/settings/security">Security</a>
    <a class="nr-link" href="#/settings/notifications">Notifications</a>
  </nav>
  <div class="nr-parent" id="nr-parent">
    <div class="nr-sidebar" id="nr-sidebar"></div>
    <div class="nr-child" id="nr-child">Select a section</div>
  </div>
</div>
      `,
      css: `
.nr-wrap {
  max-width: 450px;
}
.nr-nav {
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}
.nr-link {
  padding: 6px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #94a3b8;
  font-size: 12px;
  text-decoration: none;
}
.nr-link:hover {
  border-color: #4fc3f7;
}
.nr-link.active {
  background: #4fc3f7;
  color: #1a1a2e;
  border-color: #4fc3f7;
}
.nr-parent {
  display: flex;
  gap: 8px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
  min-height: 120px;
}
.nr-sidebar {
  width: 100px;
  background: #1e293b;
  padding: 8px;
}
.nr-sb-item {
  display: block;
  padding: 6px 8px;
  font-size: 12px;
  color: #94a3b8;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 2px;
}
.nr-sb-item:hover {
  background: #334155;
}
.nr-sb-item.active {
  color: #4fc3f7;
}
.nr-child {
  flex: 1;
  padding: 16px;
  font-size: 14px;
  color: #e0e0e0;
}
      `,
      js: `
const child = document.getElementById('nr-child'),
  sidebar = document.getElementById('nr-sidebar');
const sections = {
  profile: {
    title: 'Profile Settings',
    desc: 'Manage your name, email, and avatar.',
  },
  security: {
    title: 'Security Settings',
    desc: 'Password, 2FA, and session management.',
  },
  notifications: {
    title: 'Notification Preferences',
    desc: 'Email, push, and in-app notification settings.',
  },
};
sidebar.innerHTML = Object.keys(sections)
  .map(
    (k) =>
      '<span class="nr-sb-item" data-key="' +
      k +
      '">' +
      sections[k].title.split(' ')[0] +
      '</span>',
  )
  .join('');
function route() {
  const hash = location.hash || '#/settings';
  const parts = hash.split('/');
  const section = parts[2];
  if (section && sections[section]) {
    child.innerHTML =
      '<h4 style="margin:0 0 8px;color:#4fc3f7">' +
      sections[section].title +
      '</h4><p style="margin:0;font-size:13px;color:#94a3b8">' +
      sections[section].desc +
      '</p>';
    sidebar
      .querySelectorAll('.nr-sb-item')
      .forEach((s) => s.classList.toggle('active', s.dataset.key === section));
  } else {
    child.textContent = 'Select a section';
    sidebar
      .querySelectorAll('.nr-sb-item')
      .forEach((s) => s.classList.remove('active'));
  }
  document
    .querySelectorAll('.nr-link')
    .forEach((l) =>
      l.classList.toggle('active', l.getAttribute('href') === hash),
    );
}
sidebar.addEventListener('click', (e) => {
  if (e.target.classList.contains('nr-sb-item'))
    location.hash = '/settings/' + e.target.dataset.key;
});
window.addEventListener('hashchange', route);
route();
      `,
    },
  },
  {
    id: 'js-tab-router',
    title: 'Tab Router',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create a tab-based router that syncs selected tab with URL hash, supports keyboard navigation, and preserves scroll positions.',
    concepts: ['Hash navigation', 'Tab management', 'Scroll preservation', 'Keyboard support'],
    demoCode: {
      html: `
<div class="tr-wrap">
  <div class="tr-tabs" id="tr-tabs" role="tablist">
    <button
      class="tr-tab active"
      data-tab="overview"
      role="tab"
      aria-selected="true"
    >
      Overview
    </button>
    <button class="tr-tab" data-tab="features" role="tab" aria-selected="false">
      Features
    </button>
    <button class="tr-tab" data-tab="docs" role="tab" aria-selected="false">
      Docs
    </button>
  </div>
  <div class="tr-panels">
    <div class="tr-panel active" id="tr-overview" role="tabpanel">
      Overview: A comprehensive summary of the product.
    </div>
    <div class="tr-panel" id="tr-features" role="tabpanel">
      Features: Fast, secure, and scalable architecture.
    </div>
    <div class="tr-panel" id="tr-docs" role="tabpanel">
      Documentation: Guides, API reference, and tutorials.
    </div>
  </div>
</div>
      `,
      css: `
.tr-wrap {
  max-width: 400px;
}
.tr-tabs {
  display: flex;
  gap: 2px;
  background: #0f172a;
  border-radius: 8px 8px 0 0;
  padding: 4px;
}
.tr-tab {
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  color: #94a3b8;
  font-size: 13px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s;
}
.tr-tab:hover {
  color: #e0e0e0;
}
.tr-tab.active {
  background: #1e293b;
  color: #4fc3f7;
  font-weight: 600;
}
.tr-panel {
  display: none;
  padding: 16px;
  background: #1e293b;
  border-radius: 0 0 8px 8px;
  border: 1px solid #334155;
  border-top: none;
  font-size: 14px;
  color: #e0e0e0;
  min-height: 60px;
}
.tr-panel.active {
  display: block;
}
      `,
      js: `
const tabs = document.querySelectorAll('.tr-tab'),
  panels = document.querySelectorAll('.tr-panel');
function switchTab(name) {
  tabs.forEach((t) => {
    const isActive = t.dataset.tab === name;
    t.classList.toggle('active', isActive);
    t.setAttribute('aria-selected', isActive);
  });
  panels.forEach((p) => p.classList.toggle('active', p.id === 'tr-' + name));
}
document.getElementById('tr-tabs').addEventListener('click', (e) => {
  const tab = e.target.closest('.tr-tab');
  if (tab) switchTab(tab.dataset.tab);
});
document.getElementById('tr-tabs').addEventListener('keydown', (e) => {
  const active = document.querySelector('.tr-tab.active');
  const allTabs = [...tabs];
  const idx = allTabs.indexOf(active);
  if (e.key === 'ArrowRight') {
    e.preventDefault();
    const next = allTabs[(idx + 1) % allTabs.length];
    switchTab(next.dataset.tab);
    next.focus();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    const prev = allTabs[(idx - 1 + allTabs.length) % allTabs.length];
    switchTab(prev.dataset.tab);
    prev.focus();
  }
});
      `,
    },
  },
  {
    id: 'js-deep-linking',
    title: 'Deep Linking',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Implement deep linking that encodes app state in the URL hash, allowing direct navigation to specific views and filter states.',
    concepts: ['URL hash encoding', 'State serialization', 'History API', 'State restoration'],
    demoCode: {
      html: `
<div class="dl-wrap">
  <div class="dl-controls">
    <select id="dl-category">
      <option value="">All</option>
      <option value="web">Web</option>
      <option value="mobile">Mobile</option>
      <option value="api">API</option>
    </select>
    <select id="dl-sort">
      <option value="name">Name</option>
      <option value="date">Date</option>
    </select>
    <input id="dl-search" placeholder="Search..." />
  </div>
  <div class="dl-url" id="dl-url"></div>
  <div class="dl-items" id="dl-items"></div>
</div>
      `,
      css: `
.dl-wrap {
  max-width: 400px;
}
.dl-controls {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}
.dl-controls select,
.dl-controls input {
  padding: 6px 8px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #e0e0e0;
  font-size: 12px;
  outline: none;
}
.dl-controls input {
  flex: 1;
}
.dl-url {
  padding: 6px 10px;
  background: #0f172a;
  border-radius: 4px;
  font-family: monospace;
  font-size: 11px;
  color: #64748b;
  margin-bottom: 8px;
  word-break: break-all;
}
.dl-items {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.dl-item {
  padding: 8px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  font-size: 13px;
  color: #e0e0e0;
}
      `,
      js: `
const items = [
  { name: 'Landing Page', cat: 'web', date: '2024-01' },
  { name: 'Dashboard', cat: 'web', date: '2024-02' },
  { name: 'iOS App', cat: 'mobile', date: '2024-01' },
  { name: 'Android App', cat: 'mobile', date: '2024-03' },
  { name: 'REST API', cat: 'api', date: '2024-02' },
  { name: 'GraphQL', cat: 'api', date: '2024-03' },
];
const cat = document.getElementById('dl-category'),
  sort = document.getElementById('dl-sort'),
  search = document.getElementById('dl-search'),
  urlEl = document.getElementById('dl-url'),
  listEl = document.getElementById('dl-items');
function updateURL() {
  const params = new URLSearchParams();
  if (cat.value) params.set('cat', cat.value);
  if (sort.value !== 'name') params.set('sort', sort.value);
  if (search.value) params.set('q', search.value);
  const hash = params.toString() ? '#?' + params.toString() : '#';
  urlEl.textContent = location.pathname + hash;
}
function render() {
  let filtered = items.filter(
    (i) =>
      (!cat.value || i.cat === cat.value) &&
      (!search.value ||
        i.name.toLowerCase().includes(search.value.toLowerCase())),
  );
  if (sort.value === 'date')
    filtered.sort((a, b) => b.date.localeCompare(a.date));
  else filtered.sort((a, b) => a.name.localeCompare(b.name));
  listEl.innerHTML = filtered
    .map(
      (i) =>
        '<div class="dl-item">' +
        i.name +
        ' <span style="color:#64748b;font-size:11px">[' +
        i.cat +
        ']</span></div>',
    )
    .join('');
  updateURL();
}
[cat, sort, search].forEach((el) => el.addEventListener('input', render));
render();
      `,
    },
  },
  {
    id: 'js-url-state',
    title: 'URL State',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Manage application state through URL search parameters, enabling shareable links with filters, pagination, and view preferences.',
    concepts: ['URLSearchParams', 'History pushState', 'State sync', 'Parameter parsing'],
    demoCode: {
      html: `
<div class="us-wrap">
  <div class="us-bar">
    <label>
      Page:
      <input type="number" id="us-page" min="1" max="10" value="1" />
    </label>
    <label>
      Per page:
      <select id="us-perpage">
        <option>10</option>
        <option>25</option>
        <option>50</option>
      </select>
    </label>
    <label>
      Theme:
      <select id="us-theme">
        <option>dark</option>
        <option>light</option>
      </select>
    </label>
  </div>
  <div class="us-state" id="us-state"></div>
</div>
      `,
      css: `
.us-wrap {
  max-width: 400px;
}
.us-bar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}
.us-bar label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #94a3b8;
}
.us-bar input,
.us-bar select {
  padding: 4px 6px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 4px;
  color: #e0e0e0;
  font-size: 12px;
  outline: none;
  width: 60px;
}
.us-state {
  padding: 12px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  font-family: monospace;
  font-size: 12px;
  color: #4fc3f7;
  word-break: break-all;
}
      `,
      js: `
const page = document.getElementById('us-page'),
  perpage = document.getElementById('us-perpage'),
  theme = document.getElementById('us-theme'),
  stateEl = document.getElementById('us-state');
function sync() {
  const params = new URLSearchParams();
  params.set('page', page.value);
  params.set('perpage', perpage.value);
  params.set('theme', theme.value);
  stateEl.textContent = JSON.stringify(Object.fromEntries(params), null, 2);
}
[page, perpage, theme].forEach((el) => el.addEventListener('input', sync));
sync();
      `,
    },
  },
  {
    id: 'js-back-to-top',
    title: 'Back to Top',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create a scroll progress indicator combined with a back-to-top button, showing reading progress as a circular SVG ring.',
    concepts: ['Scroll percentage', 'SVG stroke-dashoffset', 'Smooth scrolling', 'CSS animations'],
    demoCode: {
      html: `
<div class="btt-wrap">
  <div class="btt-content" id="btt-content">
    <p>Start reading this content...</p>
    <div style="height: 120px"></div>
    <p>More paragraphs here...</p>
    <div style="height: 120px"></div>
    <p>Almost at the bottom...</p>
    <div style="height: 120px"></div>
    <p>The end!</p>
  </div>
  <button class="btt-btn" id="btt-btn" title="Back to top">
    <svg viewBox="0 0 36 36" class="btt-ring">
      <circle cx="18" cy="18" r="16" class="btt-bg" />
      <circle cx="18" cy="18" r="16" class="btt-fg" id="btt-fg" />
    </svg>
    <span class="btt-arrow">&#8593;</span>
  </button>
</div>
      `,
      css: `
.btt-wrap {
  position: relative;
  max-width: 400px;
}
.btt-content {
  height: 200px;
  overflow-y: auto;
  padding: 16px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.6;
}
.btt-btn {
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1e293b;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btt-btn.visible {
  opacity: 1;
}
.btt-ring {
  position: absolute;
  inset: 0;
  transform: rotate(-90deg);
}
.btt-bg {
  fill: none;
  stroke: #334155;
  stroke-width: 3;
}
.btt-fg {
  fill: none;
  stroke: #4fc3f7;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 100.5;
  stroke-dashoffset: 100.5;
  transition: stroke-dashoffset 0.1s;
}
.btt-arrow {
  color: #4fc3f7;
  font-size: 16px;
  z-index: 1;
}
      `,
      js: `
const content = document.getElementById('btt-content'),
  btn = document.getElementById('btt-btn'),
  fg = document.getElementById('btt-fg');
const circum = 2 * Math.PI * 16;
fg.style.strokeDasharray = circum;
content.addEventListener('scroll', () => {
  const pct = content.scrollTop / (content.scrollHeight - content.clientHeight);
  fg.style.strokeDashoffset = circum * (1 - pct);
  btn.classList.toggle('visible', content.scrollTop > 50);
});
btn.addEventListener('click', () => {
  content.scrollTo({ top: 0, behavior: 'smooth' });
});
      `,
    },
  },
  {
    id: 'js-scroll-spy',
    title: 'Scroll Spy',
    category: 'navigation',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Implement a scroll spy that highlights the current section in navigation as the user scrolls through content.',
    concepts: [
      'IntersectionObserver',
      'Active state tracking',
      'Scroll events',
      'Threshold detection',
    ],
    demoCode: {
      html: `
<div class="spy-wrap">
  <nav class="spy-nav" id="spy-nav">
    <a class="spy-link active" data-section="spy-intro">Intro</a>
    <a class="spy-link" data-section="spy-features">Features</a>
    <a class="spy-link" data-section="spy-pricing">Pricing</a>
    <a class="spy-link" data-section="spy-faq">FAQ</a>
  </nav>
  <div class="spy-content" id="spy-content">
    <div id="spy-intro" class="spy-section">
      <h3>Introduction</h3>
      <p>
        Welcome to our platform. We help teams build better products faster.
      </p>
    </div>
    <div id="spy-features" class="spy-section">
      <h3>Features</h3>
      <p>AI-powered analytics, real-time collaboration, and more.</p>
    </div>
    <div id="spy-pricing" class="spy-section">
      <h3>Pricing</h3>
      <p>Plans starting from $9/month. Free tier available.</p>
    </div>
    <div id="spy-faq" class="spy-section">
      <h3>FAQ</h3>
      <p>Common questions and answers about the platform.</p>
    </div>
  </div>
</div>
      `,
      css: `
.spy-wrap {
  display: flex;
  gap: 12px;
  max-width: 500px;
}
.spy-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 80px;
}
.spy-link {
  padding: 6px 10px;
  font-size: 12px;
  color: #64748b;
  cursor: pointer;
  border-left: 2px solid #334155;
  transition: all 0.15s;
  text-decoration: none;
}
.spy-link:hover {
  color: #e0e0e0;
}
.spy-link.active {
  color: #4fc3f7;
  border-left-color: #4fc3f7;
  background: rgba(79, 195, 247, 0.05);
}
.spy-content {
  flex: 1;
  height: 200px;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.spy-section {
  padding: 16px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  margin-bottom: 8px;
  min-height: 120px;
}
.spy-section h3 {
  font-size: 15px;
  color: #e0e0e0;
  margin: 0 0 8px;
}
.spy-section p {
  font-size: 13px;
  color: #94a3b8;
  margin: 0;
  line-height: 1.5;
}
      `,
      js: `
const content = document.getElementById('spy-content'),
  links = document.querySelectorAll('.spy-link');
links.forEach((l) => {
  l.addEventListener('click', () => {
    const target = document.getElementById(l.dataset.section);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
content.addEventListener('scroll', () => {
  const sections = content.querySelectorAll('.spy-section');
  let activeId = '';
  sections.forEach((s) => {
    if (s.offsetTop - content.scrollTop < 60) activeId = s.id;
  });
  links.forEach((l) =>
    l.classList.toggle('active', l.dataset.section === activeId),
  );
});
      `,
    },
  },
  // --- advanced ---
  {
    id: 'js-theme-switcher',
    title: 'Theme Switcher',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a theme switcher with light/dark/system modes, CSS custom properties, localStorage persistence, and smooth transitions.',
    concepts: ['CSS custom properties', 'prefers-color-scheme', 'localStorage', 'matchMedia'],
    demoCode: {
      html: `
<div class="ts-wrap" id="ts-wrap">
  <div class="ts-controls">
    <button class="ts-btn active" data-theme="dark">Dark</button>
    <button class="ts-btn" data-theme="light">Light</button>
    <button class="ts-btn" data-theme="system">System</button>
  </div>
  <div class="ts-preview">
    <h4>Preview Card</h4>
    <p>This card adapts to the selected theme.</p>
    <button class="ts-action">Action Button</button>
  </div>
</div>
      `,
      css: `
.ts-wrap {
  max-width: 360px;
  transition: all 0.3s;
}
.ts-wrap[data-mode="dark"] {
  --bg: #1e293b;
  --bg2: #0f172a;
  --text: #e0e0e0;
  --muted: #94a3b8;
  --accent: #4fc3f7;
  --border: #334155;
}
.ts-wrap[data-mode="light"] {
  --bg: #f8fafc;
  --bg2: #ffffff;
  --text: #1e293b;
  --muted: #64748b;
  --accent: #0284c7;
  --border: #e2e8f0;
}
.ts-controls {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
}
.ts-btn {
  padding: 8px 16px;
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--muted);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.ts-btn:hover {
  border-color: var(--accent);
}
.ts-btn.active {
  background: var(--accent);
  color: #1a1a2e;
  border-color: var(--accent);
}
.ts-preview {
  padding: 16px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  transition: all 0.3s;
}
.ts-preview h4 {
  font-size: 15px;
  color: var(--text);
  margin: 0 0 6px;
}
.ts-preview p {
  font-size: 13px;
  color: var(--muted);
  margin: 0 0 12px;
}
.ts-action {
  padding: 8px 16px;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}
      `,
      js: `
const wrap = document.getElementById('ts-wrap');
wrap.dataset.mode = 'dark';
document.querySelectorAll('.ts-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document
      .querySelectorAll('.ts-btn')
      .forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    let mode = btn.dataset.theme;
    if (mode === 'system') {
      mode = window.matchMedia('(prefers-color-scheme:light)').matches
        ? 'light'
        : 'dark';
    }
    wrap.dataset.mode = mode;
  });
});
      `,
    },
  },
  {
    id: 'js-i18n-locale',
    title: 'i18n Locale Switcher',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create an internationalization system with language switching, dynamic text replacement, number/date formatting, and RTL support.',
    concepts: ['Intl API', 'Translation dictionaries', 'Data attributes', 'RTL layout'],
    demoCode: {
      html: `
<div class="i18-wrap" id="i18-wrap">
  <div class="i18-bar">
    <select id="i18-lang">
      <option value="en">English</option>
      <option value="es">Espanol</option>
      <option value="ja">Japanese</option>
    </select>
  </div>
  <div class="i18-card">
    <h3 data-i18n="title"></h3>
    <p data-i18n="description"></p>
    <p class="i18-info">
      <span data-i18n="price_label"></span>
      :
      <span id="i18-price"></span>
    </p>
    <p class="i18-info">
      <span data-i18n="date_label"></span>
      :
      <span id="i18-date"></span>
    </p>
    <button class="i18-btn" data-i18n="button"></button>
  </div>
</div>
      `,
      css: `
.i18-wrap {
  max-width: 360px;
}
.i18-bar {
  margin-bottom: 8px;
}
.i18-bar select {
  padding: 6px 10px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #e0e0e0;
  font-size: 13px;
  outline: none;
}
.i18-card {
  padding: 16px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
}
.i18-card h3 {
  font-size: 16px;
  color: #e0e0e0;
  margin: 0 0 8px;
}
.i18-card p {
  font-size: 13px;
  color: #94a3b8;
  margin: 0 0 6px;
  line-height: 1.5;
}
.i18-info {
  font-size: 13px;
  color: #64748b;
}
.i18-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background: #4fc3f7;
  color: #1a1a2e;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
}
      `,
      js: `
const translations = {
  en: {
    title: 'Welcome',
    description: 'Build amazing products with our platform.',
    price_label: 'Price',
    date_label: 'Date',
    button: 'Get Started',
  },
  es: {
    title: 'Bienvenido',
    description: 'Construye productos increibles con nuestra plataforma.',
    price_label: 'Precio',
    date_label: 'Fecha',
    button: 'Comenzar',
  },
  ja: {
    title: '\\u3088\\u3046\\u3053\\u305D',
    description:
      '\\u79C1\\u305F\\u3061\\u306E\\u30D7\\u30E9\\u30C3\\u30C8\\u30D5\\u30A9\\u30FC\\u30E0\\u3067\\u7D20\\u6674\\u3089\\u3057\\u3044\\u88FD\\u54C1\\u3092\\u4F5C\\u308A\\u307E\\u3057\\u3087\\u3046\\u3002',
    price_label: '\\u4FA1\\u683C',
    date_label: '\\u65E5\\u4ED8',
    button: '\\u59CB\\u3081\\u308B',
  },
};
const lang = document.getElementById('i18-lang');
function update() {
  const l = lang.value;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = translations[l][el.dataset.i18n] || '';
  });
  document.getElementById('i18-price').textContent = new Intl.NumberFormat(l, {
    style: 'currency',
    currency: l === 'ja' ? 'JPY' : l === 'es' ? 'EUR' : 'USD',
  }).format(29.99);
  document.getElementById('i18-date').textContent = new Intl.DateTimeFormat(l, {
    dateStyle: 'long',
  }).format(new Date());
}
lang.addEventListener('change', update);
update();
      `,
    },
  },
  {
    id: 'js-a11y-focus-trap',
    title: 'Accessibility Focus Trap',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Implement a focus trap for modal dialogs that keeps keyboard focus within the dialog, manages tab order, and restores focus on close.',
    concepts: ['Focus management', 'Tab trapping', 'ARIA dialog', 'Focus restoration'],
    demoCode: {
      html: `
<div class="ft-wrap">
  <button id="ft-open" class="ft-btn">Open Dialog</button>
  <div
    class="ft-overlay"
    id="ft-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby="ft-title"
  >
    <div class="ft-dialog">
      <h3 id="ft-title">Focus Trapped Dialog</h3>
      <p>Tab key stays within this dialog. Try it!</p>
      <input class="ft-input" placeholder="First input" />
      <input class="ft-input" placeholder="Second input" />
      <div class="ft-actions">
        <button class="ft-cancel" id="ft-cancel">Cancel</button>
        <button class="ft-confirm" id="ft-confirm">Confirm</button>
      </div>
    </div>
  </div>
</div>
      `,
      css: `
.ft-wrap {
  text-align: center;
}
.ft-btn {
  padding: 10px 20px;
  background: #4fc3f7;
  color: #1a1a2e;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
}
.ft-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
  align-items: center;
  justify-content: center;
}
.ft-overlay.open {
  display: flex;
}
.ft-dialog {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 20px;
  width: 300px;
}
.ft-dialog h3 {
  font-size: 16px;
  color: #e0e0e0;
  margin: 0 0 8px;
}
.ft-dialog p {
  font-size: 13px;
  color: #94a3b8;
  margin: 0 0 12px;
}
.ft-input {
  width: 100%;
  padding: 8px 10px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #e0e0e0;
  font-size: 13px;
  outline: none;
  margin-bottom: 8px;
}
.ft-input:focus {
  border-color: #4fc3f7;
}
.ft-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
.ft-cancel,
.ft-confirm {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}
.ft-cancel {
  background: #334155;
  color: #e0e0e0;
}
.ft-confirm {
  background: #4fc3f7;
  color: #1a1a2e;
  font-weight: 600;
}
      `,
      js: `
const openBtn = document.getElementById('ft-open'),
  overlay = document.getElementById('ft-overlay');
let prevFocus = null;
function open() {
  prevFocus = document.activeElement;
  overlay.classList.add('open');
  const focusable = overlay.querySelectorAll('input,button');
  if (focusable.length) focusable[0].focus();
  overlay.addEventListener('keydown', trap);
}
function close() {
  overlay.classList.remove('open');
  overlay.removeEventListener('keydown', trap);
  if (prevFocus) prevFocus.focus();
}
function trap(e) {
  if (e.key === 'Escape') {
    close();
    return;
  }
  if (e.key !== 'Tab') return;
  const focusable = [...overlay.querySelectorAll('input,button')];
  const first = focusable[0],
    last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}
openBtn.addEventListener('click', open);
document.getElementById('ft-cancel').addEventListener('click', close);
document.getElementById('ft-confirm').addEventListener('click', close);
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) close();
});
      `,
    },
  },
  {
    id: 'js-a11y-live-region',
    title: 'ARIA Live Region',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Demonstrate ARIA live regions for screen reader announcements with polite and assertive modes for dynamic content updates.',
    concepts: ['aria-live', 'Screen reader', 'Dynamic announcements', 'Polite vs assertive'],
    demoCode: {
      html: `
<div class="lr-wrap">
  <h4 class="lr-title">Live Region Demo</h4>
  <p class="lr-desc">Updates below are announced to screen readers.</p>
  <div class="lr-controls">
    <button class="lr-btn" id="lr-polite">Polite Update</button>
    <button class="lr-btn lr-assert" id="lr-assertive">Assertive Alert</button>
  </div>
  <div class="lr-region" aria-live="polite" id="lr-polite-region">
    <p class="lr-label">Polite region (aria-live="polite")</p>
    <div id="lr-polite-content" class="lr-content">No updates yet.</div>
  </div>
  <div
    class="lr-region lr-alert"
    aria-live="assertive"
    role="alert"
    id="lr-assertive-region"
  >
    <p class="lr-label">Assertive region (role="alert")</p>
    <div id="lr-assertive-content" class="lr-content">No alerts.</div>
  </div>
</div>
      `,
      css: `
.lr-wrap {
  max-width: 400px;
}
.lr-title {
  font-size: 15px;
  color: #e0e0e0;
  margin: 0 0 4px;
}
.lr-desc {
  font-size: 12px;
  color: #64748b;
  margin: 0 0 12px;
}
.lr-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.lr-btn {
  padding: 8px 16px;
  background: #4fc3f7;
  color: #1a1a2e;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
}
.lr-assert {
  background: #facc15;
  color: #1a1a2e;
}
.lr-region {
  padding: 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  margin-bottom: 8px;
}
.lr-alert {
  border-color: #facc15;
}
.lr-label {
  font-size: 11px;
  color: #64748b;
  margin: 0 0 6px;
}
.lr-content {
  font-size: 13px;
  color: #e0e0e0;
  min-height: 20px;
}
      `,
      js: `
let count = 0;
document.getElementById('lr-polite').addEventListener('click', () => {
  count++;
  document.getElementById('lr-polite-content').textContent =
    'Update #' +
    count +
    ': New data loaded at ' +
    new Date().toLocaleTimeString();
});
document.getElementById('lr-assertive').addEventListener('click', () => {
  document.getElementById('lr-assertive-content').textContent =
    'ALERT: Connection lost at ' + new Date().toLocaleTimeString();
  setTimeout(() => {
    document.getElementById('lr-assertive-content').textContent =
      'Connection restored.';
  }, 2000);
});
      `,
    },
  },
  {
    id: 'js-offline-indicator',
    title: 'Offline Indicator',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create an offline/online status indicator with banner notifications, queued action display, and auto-retry on reconnection.',
    concepts: ['navigator.onLine', 'Online/offline events', 'Status banners', 'Queue management'],
    demoCode: {
      html: `
<div class="oi-wrap">
  <div class="oi-banner" id="oi-banner">
    <span class="oi-dot" id="oi-dot"></span>
    <span id="oi-status">Online</span>
  </div>
  <div class="oi-card">
    <p>Current status is detected from browser events.</p>
    <button class="oi-btn" id="oi-simulate">Simulate Offline</button>
    <div class="oi-queue" id="oi-queue"></div>
  </div>
</div>
      `,
      css: `
.oi-wrap {
  max-width: 360px;
}
.oi-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
}
.oi-banner.online {
  background: rgba(74, 222, 128, 0.1);
  color: #4ade80;
  border: 1px solid rgba(74, 222, 128, 0.2);
}
.oi-banner.offline {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}
.oi-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.oi-banner.online .oi-dot {
  background: #4ade80;
}
.oi-banner.offline .oi-dot {
  background: #ef4444;
}
.oi-card {
  padding: 14px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  font-size: 13px;
  color: #94a3b8;
}
.oi-btn {
  margin-top: 8px;
  padding: 6px 14px;
  background: #334155;
  border: none;
  border-radius: 6px;
  color: #e0e0e0;
  font-size: 12px;
  cursor: pointer;
}
.oi-btn:hover {
  background: #475569;
}
.oi-queue {
  margin-top: 8px;
  font-size: 12px;
  color: #64748b;
}
      `,
      js: `
const banner = document.getElementById('oi-banner'),
  status = document.getElementById('oi-status'),
  queue = document.getElementById('oi-queue');
let offline = false;
function update(isOff) {
  offline = isOff;
  banner.className = 'oi-banner ' + (isOff ? 'offline' : 'online');
  status.textContent = isOff ? 'Offline' : 'Online';
  queue.textContent = isOff ? 'Actions will be queued until reconnected.' : '';
}
update(!navigator.onLine);
window.addEventListener('online', () => update(false));
window.addEventListener('offline', () => update(true));
document.getElementById('oi-simulate').addEventListener('click', () => {
  update(!offline);
});
      `,
    },
  },
  {
    id: 'js-websocket-chat',
    title: 'WebSocket Chat',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Build a simulated real-time chat interface with message bubbles, typing indicators, timestamps, and auto-scroll to newest messages.',
    concepts: ['Message queue', 'Auto-scroll', 'Typing indicator', 'Time formatting'],
    demoCode: {
      html: `
<div class="wsc-wrap">
  <div class="wsc-header">
    Chat Room
    <span class="wsc-online">2 online</span>
  </div>
  <div class="wsc-messages" id="wsc-messages"></div>
  <div class="wsc-typing" id="wsc-typing"></div>
  <div class="wsc-input-row">
    <input id="wsc-input" class="wsc-input" placeholder="Type a message..." />
    <button id="wsc-send" class="wsc-send">Send</button>
  </div>
</div>
      `,
      css: `
.wsc-wrap {
  max-width: 380px;
  border: 1px solid #334155;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 300px;
}
.wsc-header {
  padding: 10px 14px;
  background: #0f172a;
  border-bottom: 1px solid #334155;
  font-size: 14px;
  font-weight: 600;
  color: #e0e0e0;
  display: flex;
  justify-content: space-between;
}
.wsc-online {
  font-size: 12px;
  color: #4ade80;
  font-weight: 400;
}
.wsc-messages {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.wsc-msg {
  max-width: 75%;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 13px;
  line-height: 1.4;
  word-wrap: break-word;
}
.wsc-msg.sent {
  align-self: flex-end;
  background: #4fc3f7;
  color: #1a1a2e;
  border-bottom-right-radius: 4px;
}
.wsc-msg.received {
  align-self: flex-start;
  background: #334155;
  color: #e0e0e0;
  border-bottom-left-radius: 4px;
}
.wsc-time {
  font-size: 10px;
  opacity: 0.6;
  margin-top: 2px;
}
.wsc-typing {
  padding: 4px 14px;
  font-size: 11px;
  color: #64748b;
  min-height: 18px;
}
.wsc-input-row {
  display: flex;
  padding: 8px;
  border-top: 1px solid #334155;
  background: #0f172a;
  gap: 6px;
}
.wsc-input {
  flex: 1;
  padding: 8px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 20px;
  color: #e0e0e0;
  font-size: 13px;
  outline: none;
}
.wsc-input:focus {
  border-color: #4fc3f7;
}
.wsc-send {
  padding: 8px 16px;
  background: #4fc3f7;
  color: #1a1a2e;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
}
      `,
      js: `
const messages = document.getElementById('wsc-messages'),
  input = document.getElementById('wsc-input'),
  typing = document.getElementById('wsc-typing');
const replies = [
  'Interesting!',
  'Tell me more.',
  'I agree.',
  'That sounds great!',
  'Nice one!',
];
function addMsg(text, type) {
  const d = document.createElement('div');
  d.className = 'wsc-msg ' + type;
  const time = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  d.innerHTML = text + '<div class="wsc-time">' + time + '</div>';
  messages.appendChild(d);
  messages.scrollTop = messages.scrollHeight;
}
function send() {
  const text = input.value.trim();
  if (!text) return;
  addMsg(text, 'sent');
  input.value = '';
  typing.textContent = 'Bot is typing...';
  setTimeout(
    () => {
      typing.textContent = '';
      addMsg(replies[Math.floor(Math.random() * replies.length)], 'received');
    },
    1000 + Math.random() * 1000,
  );
}
document.getElementById('wsc-send').addEventListener('click', send);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') send();
});
addMsg('Welcome to the chat!', 'received');
      `,
    },
  },
  {
    id: 'js-optimistic-update',
    title: 'Optimistic Update',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Demonstrate the optimistic update pattern where UI updates immediately before server confirmation, with rollback on failure.',
    concepts: ['Optimistic UI', 'Rollback', 'Async simulation', 'State snapshots'],
    demoCode: {
      html: `
<div class="ou-wrap">
  <div class="ou-controls">
    <label>
      <input type="checkbox" id="ou-fail" />
      Simulate failure
    </label>
  </div>
  <div class="ou-list" id="ou-list"></div>
  <div class="ou-add">
    <input id="ou-input" placeholder="New item..." />
    <button id="ou-btn" class="ou-btn">Add</button>
  </div>
  <div class="ou-log" id="ou-log"></div>
</div>
      `,
      css: `
.ou-wrap {
  max-width: 360px;
}
.ou-controls {
  margin-bottom: 8px;
  font-size: 12px;
  color: #94a3b8;
}
.ou-controls input {
  accent-color: #4fc3f7;
}
.ou-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
  min-height: 40px;
}
.ou-item {
  padding: 8px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  font-size: 13px;
  color: #e0e0e0;
  display: flex;
  justify-content: space-between;
  transition: all 0.3s;
}
.ou-item.pending {
  opacity: 0.6;
  border-style: dashed;
}
.ou-item.error {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}
.ou-add {
  display: flex;
  gap: 6px;
}
.ou-add input {
  flex: 1;
  padding: 8px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #e0e0e0;
  font-size: 13px;
  outline: none;
}
.ou-btn {
  padding: 8px 14px;
  background: #4fc3f7;
  color: #1a1a2e;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
}
.ou-log {
  margin-top: 8px;
  font-size: 11px;
  color: #64748b;
  max-height: 60px;
  overflow-y: auto;
}
      `,
      js: `
const list = document.getElementById('ou-list'),
  input = document.getElementById('ou-input'),
  log = document.getElementById('ou-log'),
  failCb = document.getElementById('ou-fail');
let items = ['Buy groceries', 'Walk the dog'];
function render() {
  list.innerHTML = '';
  items.forEach((item) => {
    const d = document.createElement('div');
    d.className = 'ou-item';
    d.textContent = item;
    list.appendChild(d);
  });
}
function addLog(msg) {
  const p = document.createElement('div');
  p.textContent = new Date().toLocaleTimeString() + ' - ' + msg;
  log.prepend(p);
}
document.getElementById('ou-btn').addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return;
  items.push(text);
  input.value = '';
  render();
  const lastEl = list.lastElementChild;
  lastEl.classList.add('pending');
  lastEl.innerHTML =
    text + ' <span style="font-size:11px;color:#64748b">saving...</span>';
  addLog('Optimistic: added "' + text + '"');
  setTimeout(() => {
    if (failCb.checked) {
      items = items.filter((i) => i !== text);
      render();
      addLog('Rollback: "' + text + '" failed');
      lastEl.classList.add('error');
    } else {
      lastEl.classList.remove('pending');
      lastEl.innerHTML = text;
      addLog('Confirmed: "' + text + '" saved');
    }
  }, 1500);
});
render();
      `,
    },
  },
  {
    id: 'js-undo-manager',
    title: 'Undo Manager',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Build a full undo/redo manager with action history stack, state snapshots, Ctrl+Z/Ctrl+Y support, and history visualization.',
    concepts: ['Command pattern', 'History stack', 'State snapshots', 'Keyboard shortcuts'],
    demoCode: {
      html: `
<div class="um-wrap">
  <div class="um-toolbar">
    <button id="um-undo" class="um-btn" disabled>Undo</button>
    <button id="um-redo" class="um-btn" disabled>Redo</button>
    <span class="um-hint">Ctrl+Z / Ctrl+Y</span>
  </div>
  <div class="um-canvas" id="um-canvas">
    <div
      class="um-box"
      id="um-box"
      style="background: #4fc3f7; left: 50px; top: 50px"
    ></div>
  </div>
  <div class="um-actions">
    <button class="um-act" data-action="color">Change Color</button>
    <button class="um-act" data-action="move">Move Right</button>
    <button class="um-act" data-action="size">Grow</button>
  </div>
  <div class="um-history" id="um-history"></div>
</div>
      `,
      css: `
.um-wrap {
  max-width: 400px;
}
.um-toolbar {
  display: flex;
  gap: 6px;
  align-items: center;
  margin-bottom: 8px;
}
.um-btn {
  padding: 6px 14px;
  background: #334155;
  border: none;
  border-radius: 6px;
  color: #e0e0e0;
  font-size: 12px;
  cursor: pointer;
}
.um-btn:disabled {
  opacity: 0.3;
  cursor: default;
}
.um-btn:not(:disabled):hover {
  background: #475569;
}
.um-hint {
  font-size: 11px;
  color: #64748b;
  margin-left: auto;
}
.um-canvas {
  position: relative;
  height: 140px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  margin-bottom: 8px;
  overflow: hidden;
}
.um-box {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  transition: all 0.2s;
}
.um-actions {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}
.um-act {
  padding: 6px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #94a3b8;
  font-size: 12px;
  cursor: pointer;
}
.um-act:hover {
  border-color: #4fc3f7;
}
.um-history {
  font-size: 11px;
  color: #64748b;
  max-height: 50px;
  overflow-y: auto;
}
      `,
      js: `
const box = document.getElementById('um-box'),
  undoBtn = document.getElementById('um-undo'),
  redoBtn = document.getElementById('um-redo'),
  historyEl = document.getElementById('um-history');
const colors = ['#4fc3f7', '#4ade80', '#facc15', '#ef4444', '#c084fc'];
let history = [],
  pos = -1;
function getState() {
  return {
    bg: box.style.background,
    left: parseInt(box.style.left),
    top: parseInt(box.style.top),
    w: box.offsetWidth,
    h: box.offsetHeight,
  };
}
function setState(s) {
  box.style.background = s.bg;
  box.style.left = s.left + 'px';
  box.style.top = s.top + 'px';
  box.style.width = s.w + 'px';
  box.style.height = s.h + 'px';
}
function push(label) {
  history = history.slice(0, pos + 1);
  history.push({ state: getState(), label });
  pos = history.length - 1;
  updateBtns();
  showHistory();
}
function undo() {
  if (pos <= 0) return;
  pos--;
  setState(history[pos].state);
  updateBtns();
  showHistory();
}
function redo() {
  if (pos >= history.length - 1) return;
  pos++;
  setState(history[pos].state);
  updateBtns();
  showHistory();
}
function updateBtns() {
  undoBtn.disabled = pos <= 0;
  redoBtn.disabled = pos >= history.length - 1;
}
function showHistory() {
  historyEl.innerHTML = history
    .map(
      (h, i) =>
        '<div style="color:' +
        (i === pos ? '#4fc3f7' : '#475569') +
        '">' +
        (i === pos ? '> ' : '') +
        h.label +
        '</div>',
    )
    .join('');
}
push('Initial');
document.querySelectorAll('.um-act').forEach((btn) => {
  btn.addEventListener('click', () => {
    const a = btn.dataset.action;
    if (a === 'color') {
      box.style.background = colors[Math.floor(Math.random() * colors.length)];
      push('Color changed');
    } else if (a === 'move') {
      box.style.left = parseInt(box.style.left) + 30 + 'px';
      push('Moved right');
    } else if (a === 'size') {
      box.style.width = box.offsetWidth + 10 + 'px';
      box.style.height = box.offsetHeight + 10 + 'px';
      push('Grew');
    }
  });
});
undoBtn.addEventListener('click', undo);
redoBtn.addEventListener('click', redo);
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
    e.preventDefault();
    undo();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
    e.preventDefault();
    redo();
  }
});
      `,
    },
  },
  {
    id: 'js-clipboard-manager',
    title: 'Clipboard Manager',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create a clipboard manager with copy, paste, and history tracking using the Clipboard API and visual feedback.',
    concepts: ['Clipboard API', 'History stack', 'Visual feedback', 'Async operations'],
    demoCode: {
      html: `
<div class="cm-wrap">
  <div class="cm-input-row">
    <input id="cm-input" class="cm-input" placeholder="Type text to copy..." />
    <button id="cm-copy" class="cm-btn">Copy</button>
  </div>
  <div class="cm-paste-row">
    <button id="cm-paste" class="cm-btn cm-secondary">Paste</button>
    <div class="cm-pasted" id="cm-pasted"></div>
  </div>
  <div class="cm-history">
    <p class="cm-label">Clipboard History</p>
    <div id="cm-history-list" class="cm-list"></div>
  </div>
</div>
      `,
      css: `
.cm-wrap {
  max-width: 360px;
}
.cm-input-row {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}
.cm-input {
  flex: 1;
  padding: 8px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #e0e0e0;
  font-size: 13px;
  outline: none;
}
.cm-input:focus {
  border-color: #4fc3f7;
}
.cm-btn {
  padding: 8px 14px;
  background: #4fc3f7;
  color: #1a1a2e;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
}
.cm-secondary {
  background: #334155;
  color: #e0e0e0;
}
.cm-paste-row {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
}
.cm-pasted {
  font-size: 13px;
  color: #94a3b8;
  flex: 1;
}
.cm-label {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 6px;
}
.cm-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.cm-hist-item {
  padding: 6px 10px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 6px;
  font-size: 12px;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.cm-hist-item:hover {
  border-color: #4fc3f7;
}
.cm-copied {
  color: #4ade80;
  font-size: 11px;
}
      `,
      js: `
const input = document.getElementById('cm-input'),
  pasted = document.getElementById('cm-pasted'),
  histList = document.getElementById('cm-history-list');
let history = [];
function addToHistory(text) {
  if (!text) return;
  history = history.filter((h) => h !== text);
  history.unshift(text);
  if (history.length > 5) history.pop();
  renderHistory();
}
function renderHistory() {
  histList.innerHTML = '';
  history.forEach((h) => {
    const d = document.createElement('div');
    d.className = 'cm-hist-item';
    d.innerHTML =
      '<span>' + h.slice(0, 30) + (h.length > 30 ? '...' : '') + '</span>';
    d.addEventListener('click', () => {
      navigator.clipboard.writeText(h).then(() => {
        d.innerHTML += '<span class="cm-copied">Copied!</span>';
        setTimeout(() => renderHistory(), 1000);
      });
    });
    histList.appendChild(d);
  });
}
document.getElementById('cm-copy').addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    addToHistory(text);
    input.value = '';
    input.placeholder = 'Copied!';
    setTimeout(() => (input.placeholder = 'Type text to copy...'), 1500);
  });
});
document.getElementById('cm-paste').addEventListener('click', () => {
  navigator.clipboard
    .readText()
    .then((text) => {
      pasted.textContent = text || '(empty)';
      addToHistory(text);
    })
    .catch(() => {
      pasted.textContent = 'Clipboard access denied';
    });
});
      `,
    },
  },
  {
    id: 'js-hotkey-manager',
    title: 'Hotkey Manager',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a keyboard shortcut manager that registers, displays, and handles multiple hotkeys with modifier key support.',
    concepts: ['KeyboardEvent', 'Modifier keys', 'Shortcut registry', 'Event prevention'],
    demoCode: {
      html: `
<div class="hk-wrap">
  <h4 class="hk-title">Keyboard Shortcuts</h4>
  <div class="hk-list" id="hk-list"></div>
  <div class="hk-log" id="hk-log">Press a shortcut to see it here</div>
</div>
      `,
      css: `
.hk-wrap {
  max-width: 380px;
}
.hk-title {
  font-size: 15px;
  color: #e0e0e0;
  margin: 0 0 10px;
}
.hk-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}
.hk-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
}
.hk-action {
  font-size: 13px;
  color: #e0e0e0;
}
.hk-keys {
  display: flex;
  gap: 4px;
}
.hk-key {
  padding: 2px 8px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 4px;
  font-size: 11px;
  font-family: monospace;
  color: #94a3b8;
}
.hk-log {
  padding: 12px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  font-size: 13px;
  color: #4fc3f7;
  text-align: center;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
      `,
      js: `
const shortcuts = [
  { keys: ['Ctrl', 'S'], action: 'Save', handler: () => 'Document saved!' },
  {
    keys: ['Ctrl', 'N'],
    action: 'New File',
    handler: () => 'New file created!',
  },
  { keys: ['Ctrl', 'F'], action: 'Find', handler: () => 'Search opened!' },
  {
    keys: ['Ctrl', 'Shift', 'P'],
    action: 'Command Palette',
    handler: () => 'Command palette opened!',
  },
  { keys: ['Esc'], action: 'Close', handler: () => 'Panel closed!' },
];
const list = document.getElementById('hk-list'),
  log = document.getElementById('hk-log');
shortcuts.forEach((s) => {
  const d = document.createElement('div');
  d.className = 'hk-item';
  d.innerHTML =
    '<span class="hk-action">' +
    s.action +
    '</span><div class="hk-keys">' +
    s.keys.map((k) => '<span class="hk-key">' + k + '</span>').join('') +
    '</div>';
  list.appendChild(d);
});
document.addEventListener('keydown', (e) => {
  shortcuts.forEach((s) => {
    const ctrl =
      s.keys.includes('Ctrl') === e.ctrlKey ||
      s.keys.includes('Ctrl') === e.metaKey;
    const shift = s.keys.includes('Shift') === e.shiftKey;
    const key = s.keys[s.keys.length - 1];
    const match =
      ctrl &&
      shift &&
      (e.key.toUpperCase() === key.toUpperCase() || e.key === key);
    if (match) {
      e.preventDefault();
      log.textContent = s.handler();
      log.style.color = '#4ade80';
      setTimeout(() => {
        log.style.color = '#4fc3f7';
      }, 1000);
    }
  });
});
      `,
    },
  },
  {
    id: 'js-idle-detector',
    title: 'Idle Detector',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create an idle detection system that tracks user inactivity, shows warnings, and triggers logout after a timeout period.',
    concepts: ['Activity detection', 'setTimeout/clearTimeout', 'Event listeners', 'State machine'],
    demoCode: {
      html: `
<div class="id-wrap">
  <div class="id-status" id="id-status">
    <div class="id-dot" id="id-dot"></div>
    <span id="id-state">Active</span>
  </div>
  <div class="id-timer">
    Idle for:
    <span id="id-time">0s</span>
  </div>
  <div class="id-settings">
    <label>
      Idle timeout:
      <select id="id-timeout">
        <option value="5">5 sec</option>
        <option value="10" selected>10 sec</option>
        <option value="30">30 sec</option>
      </select>
    </label>
  </div>
  <div class="id-log" id="id-log"></div>
</div>
      `,
      css: `
.id-wrap {
  max-width: 320px;
}
.id-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  margin-bottom: 8px;
}
.id-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transition: background 0.2s;
}
.id-dot.active {
  background: #4ade80;
}
.id-dot.idle {
  background: #facc15;
}
.id-dot.away {
  background: #ef4444;
}
#id-state {
  font-size: 14px;
  font-weight: 600;
  color: #e0e0e0;
}
.id-timer {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 8px;
}
.id-settings {
  margin-bottom: 10px;
  font-size: 12px;
  color: #94a3b8;
}
.id-settings select {
  padding: 2px 6px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 4px;
  color: #e0e0e0;
  font-size: 12px;
}
.id-log {
  max-height: 80px;
  overflow-y: auto;
  font-size: 11px;
  color: #475569;
}
      `,
      js: `
const dot = document.getElementById('id-dot'),
  stateEl = document.getElementById('id-state'),
  timeEl = document.getElementById('id-time'),
  logEl = document.getElementById('id-log'),
  timeoutSel = document.getElementById('id-timeout');
let idleTimer = null,
  countTimer = null,
  idleSec = 0;
function addLog(msg) {
  const d = document.createElement('div');
  d.textContent = new Date().toLocaleTimeString() + ' ' + msg;
  logEl.prepend(d);
}
function setActive() {
  idleSec = 0;
  timeEl.textContent = '0s';
  dot.className = 'id-dot active';
  stateEl.textContent = 'Active';
  clearTimeout(idleTimer);
  clearInterval(countTimer);
  countTimer = setInterval(() => {
    idleSec++;
    timeEl.textContent = idleSec + 's';
    if (idleSec >= Math.floor(+timeoutSel.value * 0.6)) {
      dot.className = 'id-dot idle';
      stateEl.textContent = 'Idle';
    }
  }, 1000);
  idleTimer = setTimeout(() => {
    dot.className = 'id-dot away';
    stateEl.textContent = 'Away';
    clearInterval(countTimer);
    addLog('User went away');
  }, +timeoutSel.value * 1000);
}
['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach((ev) => {
  document.addEventListener(ev, () => {
    if (stateEl.textContent !== 'Active') addLog('User returned');
    setActive();
  });
});
setActive();
      `,
    },
  },
  {
    id: 'js-media-query-hook',
    title: 'Media Query Hook',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a responsive design utility that reacts to media query changes, showing current breakpoint and adapting layout dynamically.',
    concepts: ['matchMedia', 'Change events', 'Breakpoint detection', 'Responsive logic'],
    demoCode: {
      html: `
<div class="mq-wrap">
  <div class="mq-current" id="mq-current"></div>
  <div class="mq-grid" id="mq-grid">
    <div class="mq-card">Card 1</div>
    <div class="mq-card">Card 2</div>
    <div class="mq-card">Card 3</div>
    <div class="mq-card">Card 4</div>
  </div>
  <div class="mq-info" id="mq-info"></div>
</div>
      `,
      css: `
.mq-wrap {
  max-width: 500px;
}
.mq-current {
  padding: 10px 14px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #4fc3f7;
  text-align: center;
}
.mq-grid {
  display: grid;
  gap: 8px;
  margin-bottom: 8px;
}
.mq-card {
  padding: 16px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  font-size: 13px;
  color: #e0e0e0;
  text-align: center;
}
.mq-info {
  font-size: 12px;
  color: #64748b;
}
      `,
      js: `
const currentEl = document.getElementById('mq-current'),
  grid = document.getElementById('mq-grid'),
  info = document.getElementById('mq-info');
const breakpoints = [
  { name: 'Mobile', query: '(max-width: 480px)', cols: 1 },
  {
    name: 'Tablet',
    query: '(min-width: 481px) and (max-width: 768px)',
    cols: 2,
  },
  { name: 'Desktop', query: '(min-width: 769px)', cols: 2 },
];
function update() {
  const w = window.innerWidth;
  let bp = breakpoints[breakpoints.length - 1];
  breakpoints.forEach((b) => {
    if (window.matchMedia(b.query).matches) bp = b;
  });
  currentEl.textContent = 'Breakpoint: ' + bp.name + ' (' + w + 'px)';
  grid.style.gridTemplateColumns = 'repeat(' + bp.cols + ',1fr)';
  info.textContent = 'Columns: ' + bp.cols + ' | Query: ' + bp.query;
}
breakpoints.forEach((b) => {
  window.matchMedia(b.query).addEventListener('change', update);
});
update();
window.addEventListener('resize', update);
      `,
    },
  },
  {
    id: 'js-portal-demo',
    title: 'Portal Demo',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Demonstrate the portal pattern by rendering content into a different DOM location while maintaining logical parent context.',
    concepts: ['DOM portals', 'appendChild to body', 'Position calculation', 'Cleanup'],
    demoCode: {
      html: `
<div class="pt-wrap">
  <div class="pt-parent" id="pt-parent">
    <p>Parent container (overflow: hidden)</p>
    <button id="pt-open" class="pt-btn">Show Portal Popup</button>
  </div>
  <div class="pt-info">
    The popup escapes overflow:hidden by rendering as a portal outside this
    container.
  </div>
</div>
      `,
      css: `
.pt-wrap {
  max-width: 400px;
}
.pt-parent {
  padding: 16px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}
.pt-parent p {
  font-size: 13px;
  color: #94a3b8;
  margin: 0 0 10px;
}
.pt-btn {
  padding: 8px 16px;
  background: #4fc3f7;
  color: #1a1a2e;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
}
.pt-portal {
  position: fixed;
  background: #1e293b;
  border: 1px solid #4fc3f7;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  z-index: 200;
  min-width: 200px;
}
.pt-portal h4 {
  font-size: 14px;
  color: #e0e0e0;
  margin: 0 0 6px;
}
.pt-portal p {
  font-size: 12px;
  color: #94a3b8;
  margin: 0 0 10px;
}
.pt-portal button {
  padding: 6px 12px;
  background: #334155;
  border: none;
  border-radius: 6px;
  color: #e0e0e0;
  cursor: pointer;
  font-size: 12px;
}
.pt-info {
  margin-top: 8px;
  font-size: 12px;
  color: #64748b;
  font-style: italic;
}
      `,
      js: `
let portal = null;
document.getElementById('pt-open').addEventListener('click', function () {
  if (portal) {
    portal.remove();
    portal = null;
    return;
  }
  portal = document.createElement('div');
  portal.className = 'pt-portal';
  portal.innerHTML =
    '<h4>Portal Popup</h4><p>This renders outside the overflow:hidden parent!</p><button id="pt-close">Close</button>';
  const rect = this.getBoundingClientRect();
  portal.style.top = rect.bottom + 8 + 'px';
  portal.style.left = rect.left + 'px';
  document.body.appendChild(portal);
  portal.querySelector('#pt-close').addEventListener('click', () => {
    portal.remove();
    portal = null;
  });
});
document.addEventListener('click', (e) => {
  if (portal && !portal.contains(e.target) && e.target.id !== 'pt-open') {
    portal.remove();
    portal = null;
  }
});
      `,
    },
  },
  {
    id: 'js-error-boundary',
    title: 'Error Boundary',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Implement an error boundary pattern for vanilla JS with try-catch component rendering, fallback UI, and error reporting.',
    concepts: ['Error handling', 'Fallback UI', 'try-catch', 'Error reporting'],
    demoCode: {
      html: `
<div class="eb-wrap">
  <div class="eb-controls">
    <button class="eb-btn" id="eb-safe">Render Safe</button>
    <button class="eb-btn eb-danger" id="eb-crash">Render Crash</button>
    <button class="eb-btn" id="eb-reset">Reset</button>
  </div>
  <div class="eb-boundary" id="eb-boundary"></div>
  <div class="eb-errors" id="eb-errors"></div>
</div>
      `,
      css: `
.eb-wrap {
  max-width: 380px;
}
.eb-controls {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}
.eb-btn {
  padding: 6px 14px;
  background: #334155;
  border: none;
  border-radius: 6px;
  color: #e0e0e0;
  font-size: 12px;
  cursor: pointer;
}
.eb-btn:hover {
  background: #475569;
}
.eb-danger {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}
.eb-boundary {
  min-height: 80px;
  padding: 16px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  margin-bottom: 8px;
}
.eb-fallback {
  text-align: center;
  color: #ef4444;
}
.eb-fallback h4 {
  font-size: 14px;
  margin: 0 0 6px;
}
.eb-fallback p {
  font-size: 12px;
  margin: 0;
  color: #94a3b8;
}
.eb-content {
  font-size: 14px;
  color: #e0e0e0;
}
.eb-content p {
  margin: 0;
  color: #94a3b8;
  font-size: 13px;
}
.eb-errors {
  font-size: 11px;
  color: #ef4444;
  max-height: 60px;
  overflow-y: auto;
}
      `,
      js: `
const boundary = document.getElementById('eb-boundary'),
  errors = document.getElementById('eb-errors');
function renderSafe() {
  return '<div class="eb-content"><h4 style="margin:0 0 6px;color:#4ade80">Component Loaded</h4><p>Everything is working correctly.</p></div>';
}
function renderCrash() {
  throw new Error('Component failed to render!');
}
function renderWithBoundary(renderFn) {
  try {
    boundary.innerHTML = renderFn();
  } catch (err) {
    boundary.innerHTML =
      '<div class="eb-fallback"><h4>Something went wrong</h4><p>' +
      err.message +
      '</p></div>';
    const log = document.createElement('div');
    log.textContent =
      new Date().toLocaleTimeString() + ' ERROR: ' + err.message;
    errors.prepend(log);
  }
}
document
  .getElementById('eb-safe')
  .addEventListener('click', () => renderWithBoundary(renderSafe));
document
  .getElementById('eb-crash')
  .addEventListener('click', () => renderWithBoundary(renderCrash));
document.getElementById('eb-reset').addEventListener('click', () => {
  boundary.innerHTML =
    '<p style="color:#64748b;font-size:13px;text-align:center">Click a button above</p>';
});
boundary.innerHTML =
  '<p style="color:#64748b;font-size:13px;text-align:center">Click a button above</p>';
      `,
    },
  },
  {
    id: 'js-retry-mechanism',
    title: 'Retry Mechanism',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Build a configurable retry mechanism with exponential backoff, max retries, visual progress, and cancel support.',
    concepts: ['Exponential backoff', 'Promise retry', 'Abort controller', 'Progress tracking'],
    demoCode: {
      html: `
<div class="rt-wrap">
  <div class="rt-config">
    <label>
      Fail rate:
      <select id="rt-rate">
        <option value="0.3">30%</option>
        <option value="0.6" selected>60%</option>
        <option value="0.9">90%</option>
      </select>
    </label>
    <label>
      Max retries:
      <select id="rt-max">
        <option value="3" selected>3</option>
        <option value="5">5</option>
      </select>
    </label>
  </div>
  <button id="rt-start" class="rt-btn">Start Request</button>
  <div class="rt-log" id="rt-log"></div>
</div>
      `,
      css: `
.rt-wrap {
  max-width: 380px;
}
.rt-config {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
  font-size: 12px;
  color: #94a3b8;
}
.rt-config select {
  padding: 2px 6px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 4px;
  color: #e0e0e0;
  font-size: 12px;
}
.rt-btn {
  padding: 8px 20px;
  background: #4fc3f7;
  color: #1a1a2e;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
  margin-bottom: 10px;
}
.rt-btn:disabled {
  opacity: 0.5;
  cursor: default;
}
.rt-log {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
}
.rt-entry {
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-family: monospace;
}
.rt-try {
  background: #1e293b;
  color: #94a3b8;
  border: 1px solid #334155;
}
.rt-success {
  background: rgba(74, 222, 128, 0.1);
  color: #4ade80;
  border: 1px solid rgba(74, 222, 128, 0.2);
}
.rt-fail {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}
.rt-wait {
  background: rgba(250, 204, 21, 0.1);
  color: #facc15;
  border: 1px solid rgba(250, 204, 21, 0.2);
}
      `,
      js: `
const logEl = document.getElementById('rt-log'),
  startBtn = document.getElementById('rt-start');
function addLog(msg, type) {
  const d = document.createElement('div');
  d.className = 'rt-entry rt-' + type;
  d.textContent = new Date().toLocaleTimeString() + ' ' + msg;
  logEl.appendChild(d);
  logEl.scrollTop = logEl.scrollHeight;
}
async function retryFetch() {
  const failRate = +document.getElementById('rt-rate').value;
  const maxRetries = +document.getElementById('rt-max').value;
  startBtn.disabled = true;
  logEl.innerHTML = '';
  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    addLog('Attempt ' + attempt + '...', attempt === 1 ? 'try' : 'wait');
    await new Promise((r) => setTimeout(r, 500));
    const success = Math.random() > failRate;
    if (success) {
      addLog('Success on attempt ' + attempt, 'success');
      startBtn.disabled = false;
      return;
    }
    addLog('Failed attempt ' + attempt, 'fail');
    if (attempt <= maxRetries) {
      const delay = Math.pow(2, attempt - 1) * 500;
      addLog('Retrying in ' + delay / 1000 + 's (backoff)', 'wait');
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  addLog('All retries exhausted. Request failed.', 'fail');
  startBtn.disabled = false;
}
startBtn.addEventListener('click', retryFetch);
      `,
    },
  },
  {
    id: 'js-virtual-list-advanced',
    title: 'Advanced Virtual List',
    category: 'advanced',
    framework: 'native-js',
    difficulty: 'advanced',
    description:
      'Build an advanced virtual scroll list with variable height items, smooth scrolling, search filtering, and scroll position restoration.',
    concepts: [
      'Virtual scrolling',
      'Viewport calculation',
      'Dynamic heights',
      'Scroll restoration',
    ],
    demoCode: {
      html: `
<div class="vla-wrap">
  <input
    id="vla-search"
    class="vla-search"
    placeholder="Search 10,000 items..."
  />
  <div class="vla-info" id="vla-info">10,000 items</div>
  <div class="vla-viewport" id="vla-viewport">
    <div class="vla-spacer" id="vla-spacer"></div>
    <div class="vla-content" id="vla-content"></div>
  </div>
</div>
      `,
      css: `
.vla-wrap {
  max-width: 380px;
}
.vla-search {
  width: 100%;
  padding: 8px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 13px;
  outline: none;
  margin-bottom: 6px;
}
.vla-search:focus {
  border-color: #4fc3f7;
}
.vla-info {
  font-size: 11px;
  color: #64748b;
  margin-bottom: 4px;
}
.vla-viewport {
  height: 220px;
  overflow-y: auto;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  position: relative;
}
.vla-spacer {
  width: 100%;
}
.vla-content {
  position: absolute;
  left: 0;
  right: 0;
}
.vla-item {
  padding: 10px 14px;
  border-bottom: 1px solid #1e293b;
  font-size: 13px;
  color: #e0e0e0;
}
.vla-item:hover {
  background: #1e293b;
}
.vla-idx {
  color: #64748b;
  font-size: 11px;
  margin-right: 8px;
}
      `,
      js: `
const TOTAL = 10000,
  ITEM_H = 38;
let allItems = Array.from({ length: TOTAL }, (_, i) => ({
  id: i,
  text:
    'Item #' +
    (i + 1) +
    ' - ' +
    ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'][i % 5] +
    ' data entry',
}));
let filtered = allItems;
const viewport = document.getElementById('vla-viewport'),
  spacer = document.getElementById('vla-spacer'),
  content = document.getElementById('vla-content'),
  infoEl = document.getElementById('vla-info');
function render() {
  const scrollTop = viewport.scrollTop;
  const viewH = viewport.clientHeight;
  spacer.style.height = filtered.length * ITEM_H + 'px';
  const start = Math.floor(scrollTop / ITEM_H);
  const visible = Math.ceil(viewH / ITEM_H) + 2;
  const end = Math.min(start + visible, filtered.length);
  content.style.top = start * ITEM_H + 'px';
  content.innerHTML = '';
  for (let i = start; i < end; i++) {
    const d = document.createElement('div');
    d.className = 'vla-item';
    d.innerHTML =
      '<span class="vla-idx">#' +
      (filtered[i].id + 1) +
      '</span>' +
      filtered[i].text;
    content.appendChild(d);
  }
}
viewport.addEventListener('scroll', render);
document.getElementById('vla-search').addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  filtered = q
    ? allItems.filter((i) => i.text.toLowerCase().includes(q))
    : allItems;
  infoEl.textContent = filtered.length.toLocaleString() + ' items';
  viewport.scrollTop = 0;
  render();
});
render();
      `,
    },
  },
  // --- ui-components ---
  {
    id: 'js-spinner',
    title: 'Spinner',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create multiple spinner/loading indicator variants including circular, dots, bars, and pulse with customizable sizes and colors.',
    concepts: ['CSS animations', 'Keyframes', 'Animation timing', 'SVG animation'],
    demoCode: {
      html: `
<div class="spn-wrap">
  <div class="spn-row">
    <div class="spn-circular"></div>
    <span>Circular</span>
  </div>
  <div class="spn-row">
    <div class="spn-dots">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <span>Dots</span>
  </div>
  <div class="spn-row">
    <div class="spn-bars">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <span>Bars</span>
  </div>
  <div class="spn-row">
    <div class="spn-pulse"></div>
    <span>Pulse</span>
  </div>
</div>
      `,
      css: `
.spn-wrap {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  align-items: center;
}
.spn-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.spn-row span {
  font-size: 11px;
  color: #64748b;
}
.spn-circular {
  width: 32px;
  height: 32px;
  border: 3px solid #334155;
  border-top-color: #4fc3f7;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.spn-dots {
  display: flex;
  gap: 4px;
}
.spn-dots div {
  width: 8px;
  height: 8px;
  background: #4fc3f7;
  border-radius: 50%;
  animation: dotBounce 0.6s infinite alternate;
}
.spn-dots div:nth-child(2) {
  animation-delay: 0.2s;
}
.spn-dots div:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes dotBounce {
  from {
    opacity: 0.3;
    transform: translateY(0);
  }
  to {
    opacity: 1;
    transform: translateY(-8px);
  }
}
.spn-bars {
  display: flex;
  gap: 3px;
  align-items: end;
  height: 24px;
}
.spn-bars div {
  width: 4px;
  background: #4fc3f7;
  border-radius: 2px;
  animation: barGrow 0.8s infinite alternate;
}
.spn-bars div:nth-child(1) {
  animation-delay: 0s;
  height: 12px;
}
.spn-bars div:nth-child(2) {
  animation-delay: 0.15s;
  height: 18px;
}
.spn-bars div:nth-child(3) {
  animation-delay: 0.3s;
  height: 10px;
}
.spn-bars div:nth-child(4) {
  animation-delay: 0.45s;
  height: 20px;
}
@keyframes barGrow {
  from {
    height: 8px;
    opacity: 0.4;
  }
  to {
    height: 24px;
    opacity: 1;
  }
}
.spn-pulse {
  width: 32px;
  height: 32px;
  background: #4fc3f7;
  border-radius: 50%;
  animation: pulse2 1.2s infinite;
}
@keyframes pulse2 {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.4);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
      `,
      js: `// Spinners are pure CSS - no JS needed for basic animations.
// Optionally toggle visibility:
document.querySelectorAll('.spn-row').forEach(r=>{
  r.style.cursor='pointer';
  r.addEventListener('click',()=>{
    const spinner=r.firstElementChild;
    spinner.style.animationPlayState=spinner.style.animationPlayState==='paused'?'running':'paused';
    if(spinner.children.length){
      [...spinner.children].forEach(c=>c.style.animationPlayState=spinner.style.animationPlayState);
    }
  });
});`,
    },
  },
  {
    id: 'js-chip',
    title: 'Chip',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build chip/tag components with multiple variants (filled, outlined), dismissible close buttons, selectable states, and icons.',
    concepts: ['Component variants', 'Close events', 'Toggle selection', 'Dynamic styling'],
    demoCode: {
      html: `
<div class="ch-wrap">
  <p class="ch-label">Filled Chips</p>
  <div class="ch-row" id="ch-filled"></div>
  <p class="ch-label">Selectable Chips</p>
  <div class="ch-row" id="ch-selectable"></div>
</div>
      `,
      css: `
.ch-wrap {
  max-width: 400px;
}
.ch-label {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 6px;
}
.ch-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.ch-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  user-select: none;
}
.ch-filled {
  background: #334155;
  color: #e0e0e0;
  border: 1px solid transparent;
}
.ch-filled:hover {
  background: #475569;
}
.ch-close {
  font-size: 14px;
  line-height: 1;
  opacity: 0.6;
  cursor: pointer;
  margin-left: 2px;
}
.ch-close:hover {
  opacity: 1;
}
.ch-selectable {
  background: transparent;
  color: #94a3b8;
  border: 1px solid #334155;
}
.ch-selectable:hover {
  border-color: #4fc3f7;
}
.ch-selectable.selected {
  background: #4fc3f7;
  color: #1a1a2e;
  border-color: #4fc3f7;
}
      `,
      js: `
const tags = ['React', 'Vue', 'Angular', 'Svelte', 'Solid'];
const filledRow = document.getElementById('ch-filled');
tags.forEach((t) => {
  const d = document.createElement('span');
  d.className = 'ch-chip ch-filled';
  d.innerHTML = t + '<span class="ch-close">&times;</span>';
  d.querySelector('.ch-close').addEventListener('click', () => d.remove());
  filledRow.appendChild(d);
});
const selRow = document.getElementById('ch-selectable');
['Small', 'Medium', 'Large', 'XL'].forEach((s) => {
  const d = document.createElement('span');
  d.className = 'ch-chip ch-selectable';
  d.textContent = s;
  d.addEventListener('click', () => d.classList.toggle('selected'));
  selRow.appendChild(d);
});
      `,
    },
  },
  {
    id: 'js-divider',
    title: 'Divider',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create horizontal and vertical divider components with labels, dashed styles, and spacing variants.',
    concepts: ['CSS pseudo-elements', 'Flexbox alignment', 'Border styles', 'Semantic markup'],
    demoCode: {
      html: `
<div class="dv-wrap">
  <p class="dv-text">Content above</p>
  <div class="dv-hr"></div>
  <p class="dv-text">Simple divider above</p>
  <div class="dv-hr dv-label"><span>OR</span></div>
  <p class="dv-text">Labeled divider above</p>
  <div class="dv-hr dv-dashed"></div>
  <p class="dv-text">Dashed divider above</p>
  <div class="dv-vertical-demo">
    <span>Left</span>
    <div class="dv-vr"></div>
    <span>Right</span>
  </div>
</div>
      `,
      css: `
.dv-wrap {
  max-width: 360px;
}
.dv-text {
  font-size: 13px;
  color: #94a3b8;
  margin: 8px 0;
}
.dv-hr {
  height: 1px;
  background: #334155;
  margin: 12px 0;
}
.dv-dashed {
  background: none;
  border-top: 1px dashed #334155;
}
.dv-label {
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  height: auto;
}
.dv-label::before,
.dv-label::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #334155;
}
.dv-label span {
  font-size: 12px;
  color: #64748b;
  white-space: nowrap;
}
.dv-vertical-demo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  font-size: 13px;
  color: #94a3b8;
}
.dv-vr {
  width: 1px;
  height: 20px;
  background: #334155;
}
      `,
      js: `// Dividers are purely CSS components.
// This JS adds dynamic divider creation for demonstration.
const wrap=document.querySelector('.dv-wrap');
const btn=document.createElement('button');
btn.textContent='Add Custom Divider';
btn.style.cssText='margin-top:12px;padding:6px 12px;background:#334155;border:none;border-radius:6px;color:#e0e0e0;font-size:12px;cursor:pointer';
btn.addEventListener('click',()=>{
  const hr=document.createElement('div');
  hr.className='dv-hr dv-label';
  const span=document.createElement('span');
  span.textContent='Section '+(wrap.querySelectorAll('.dv-label').length+1);
  hr.appendChild(span);
  wrap.insertBefore(hr,btn);
});
wrap.appendChild(btn);`,
    },
  },
  {
    id: 'js-alert-banner',
    title: 'Alert Banner',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build alert/banner components with info, success, warning, and error variants, dismissible close, and auto-dismiss timer.',
    concepts: ['Alert variants', 'Auto-dismiss', 'CSS transitions', 'ARIA roles'],
    demoCode: {
      html: `
<div class="ab-wrap">
  <div class="ab-controls">
    <button class="ab-trigger" data-type="info">Info</button>
    <button class="ab-trigger" data-type="success">Success</button>
    <button class="ab-trigger" data-type="warning">Warning</button>
    <button class="ab-trigger" data-type="error">Error</button>
  </div>
  <div class="ab-container" id="ab-container"></div>
</div>
      `,
      css: `
.ab-wrap {
  max-width: 420px;
}
.ab-controls {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
}
.ab-trigger {
  padding: 6px 14px;
  background: #334155;
  border: none;
  border-radius: 6px;
  color: #e0e0e0;
  font-size: 12px;
  cursor: pointer;
}
.ab-trigger:hover {
  background: #475569;
}
.ab-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.ab-alert {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 13px;
  animation: slideIn 0.2s;
}
.ab-alert.info {
  background: rgba(79, 195, 247, 0.1);
  color: #4fc3f7;
  border: 1px solid rgba(79, 195, 247, 0.2);
}
.ab-alert.success {
  background: rgba(74, 222, 128, 0.1);
  color: #4ade80;
  border: 1px solid rgba(74, 222, 128, 0.2);
}
.ab-alert.warning {
  background: rgba(250, 204, 21, 0.1);
  color: #facc15;
  border: 1px solid rgba(250, 204, 21, 0.2);
}
.ab-alert.error {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}
.ab-msg {
  flex: 1;
}
.ab-dismiss {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  opacity: 0.6;
  padding: 0;
}
.ab-dismiss:hover {
  opacity: 1;
}
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
      `,
      js: `
const container = document.getElementById('ab-container');
const msgs = {
  info: 'This is an informational message.',
  success: 'Action completed successfully!',
  warning: 'Please review before proceeding.',
  error: 'An error occurred. Please try again.',
};
document.querySelectorAll('.ab-trigger').forEach((btn) => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;
    const alert = document.createElement('div');
    alert.className = 'ab-alert ' + type;
    alert.setAttribute('role', 'alert');
    alert.innerHTML =
      '<span class="ab-msg">' +
      msgs[type] +
      '</span><button class="ab-dismiss">&times;</button>';
    alert
      .querySelector('.ab-dismiss')
      .addEventListener('click', () => alert.remove());
    container.appendChild(alert);
    setTimeout(() => {
      if (alert.parentElement) alert.remove();
    }, 5000);
  });
});
      `,
    },
  },
  {
    id: 'js-callout',
    title: 'Callout',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create callout/admonition boxes with icon, title, body, collapsible content, and multiple theme variants.',
    concepts: ['Themed variants', 'Collapsible content', 'Icon display', 'Semantic styling'],
    demoCode: {
      html: `
<div class="co-wrap">
  <div class="co-callout co-info">
    <div class="co-icon">i</div>
    <div class="co-body">
      <div class="co-title">Note</div>
      <p>This is a helpful piece of information for the reader.</p>
    </div>
  </div>
  <div class="co-callout co-tip">
    <div class="co-icon">!</div>
    <div class="co-body">
      <div class="co-title">Tip</div>
      <p>Use keyboard shortcuts for faster navigation.</p>
    </div>
  </div>
  <div class="co-callout co-warn">
    <div class="co-icon">!</div>
    <div class="co-body">
      <div class="co-title">Warning</div>
      <p>This action cannot be undone. Proceed with caution.</p>
    </div>
  </div>
</div>
      `,
      css: `
.co-wrap {
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.co-callout {
  display: flex;
  gap: 10px;
  padding: 12px;
  border-radius: 8px;
  border-left: 3px solid;
}
.co-info {
  background: rgba(79, 195, 247, 0.06);
  border-left-color: #4fc3f7;
}
.co-tip {
  background: rgba(74, 222, 128, 0.06);
  border-left-color: #4ade80;
}
.co-warn {
  background: rgba(250, 204, 21, 0.06);
  border-left-color: #facc15;
}
.co-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}
.co-info .co-icon {
  background: #4fc3f7;
  color: #1a1a2e;
}
.co-tip .co-icon {
  background: #4ade80;
  color: #1a1a2e;
}
.co-warn .co-icon {
  background: #facc15;
  color: #1a1a2e;
}
.co-title {
  font-size: 13px;
  font-weight: 600;
  color: #e0e0e0;
  margin-bottom: 2px;
}
.co-body p {
  font-size: 12px;
  color: #94a3b8;
  margin: 0;
  line-height: 1.5;
}
      `,
      js: `
document.querySelectorAll('.co-callout').forEach((c) => {
  c.style.cursor = 'pointer';
  const body = c.querySelector('p');
  c.addEventListener('click', () => {
    const isHidden = body.style.display === 'none';
    body.style.display = isHidden ? '' : 'none';
  });
});
      `,
    },
  },
  {
    id: 'js-empty-state-v2',
    title: 'Empty State V2',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build improved empty state displays with illustrations, actions, search suggestions, and contextual messaging.',
    concepts: ['Placeholder UI', 'Call-to-action', 'Conditional rendering', 'SVG illustrations'],
    demoCode: {
      html: `
<div class="es2-wrap">
  <div class="es2-card" id="es2-card">
    <div class="es2-icon">&#128269;</div>
    <h3 class="es2-title">No Results Found</h3>
    <p class="es2-desc">
      Try adjusting your search or filters to find what you are looking for.
    </p>
    <div class="es2-suggestions">
      <span class="es2-tag">Clear filters</span>
      <span class="es2-tag">Browse all</span>
    </div>
    <button class="es2-btn" id="es2-toggle">Show Content</button>
  </div>
</div>
      `,
      css: `
.es2-wrap {
  max-width: 360px;
}
.es2-card {
  text-align: center;
  padding: 32px 20px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
}
.es2-icon {
  font-size: 48px;
  margin-bottom: 12px;
}
.es2-title {
  font-size: 16px;
  color: #e0e0e0;
  margin: 0 0 6px;
}
.es2-desc {
  font-size: 13px;
  color: #94a3b8;
  margin: 0 0 14px;
  line-height: 1.5;
}
.es2-suggestions {
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-bottom: 14px;
}
.es2-tag {
  padding: 4px 10px;
  background: #334155;
  border-radius: 12px;
  font-size: 12px;
  color: #94a3b8;
  cursor: pointer;
}
.es2-tag:hover {
  background: #475569;
  color: #e0e0e0;
}
.es2-btn {
  padding: 8px 20px;
  background: #4fc3f7;
  color: #1a1a2e;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
}
.es2-content {
  padding: 16px;
  font-size: 14px;
  color: #e0e0e0;
}
      `,
      js: `
let showing = false;
const card = document.getElementById('es2-card'),
  btn = document.getElementById('es2-toggle');
btn.addEventListener('click', () => {
  showing = !showing;
  if (showing) {
    card.innerHTML =
      '<div class="es2-content"><p>Here is the actual content!</p><p style="color:#94a3b8;font-size:13px">Items have been loaded successfully.</p><button class="es2-btn" id="es2-back">Show Empty State</button></div>';
    card.querySelector('#es2-back').addEventListener('click', () => {
      location.reload();
    });
  }
});
      `,
    },
  },
  {
    id: 'js-avatar-group',
    title: 'Avatar Group',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build a stacked avatar group with overlap, max display count, tooltip on hover, and expandable overflow indicator.',
    concepts: ['Negative margins', 'z-index stacking', 'Hover tooltips', 'Overflow counting'],
    demoCode: {
      html: `
<div class="ag-wrap">
  <p class="ag-label">Team Members</p>
  <div class="ag-group" id="ag-group"></div>
  <p class="ag-label" style="margin-top: 16px">Max 3 visible</p>
  <div class="ag-group" id="ag-limited"></div>
</div>
      `,
      css: `
.ag-wrap {
  max-width: 360px;
}
.ag-label {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 8px;
}
.ag-group {
  display: flex;
  align-items: center;
}
.ag-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  border: 2px solid #1a1a2e;
  margin-left: -10px;
  cursor: pointer;
  position: relative;
  transition: transform 0.15s;
}
.ag-avatar:first-child {
  margin-left: 0;
}
.ag-avatar:hover {
  transform: scale(1.15);
  z-index: 10;
}
.ag-more {
  background: #334155;
  color: #94a3b8;
  font-size: 11px;
}
.ag-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 8px;
  background: #334155;
  color: #e0e0e0;
  font-size: 11px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.15s;
  pointer-events: none;
}
.ag-avatar:hover .ag-tooltip {
  opacity: 1;
}
      `,
      js: `
const people = [
  { name: 'Alice', color: '#1e3a5f' },
  { name: 'Bob', color: '#3b1f5e' },
  { name: 'Carol', color: '#1f4a3b' },
  { name: 'Dave', color: '#5e3b1f' },
  { name: 'Eve', color: '#4a1f3b' },
  { name: 'Frank', color: '#1f3b5e' },
];
function renderGroup(container, max) {
  const display = max ? people.slice(0, max) : people;
  const overflow = max ? people.length - max : 0;
  display.forEach((p) => {
    const d = document.createElement('div');
    d.className = 'ag-avatar';
    d.style.background = p.color;
    d.textContent = p.name[0];
    d.innerHTML += '<div class="ag-tooltip">' + p.name + '</div>';
    container.appendChild(d);
  });
  if (overflow > 0) {
    const more = document.createElement('div');
    more.className = 'ag-avatar ag-more';
    more.textContent = '+' + overflow;
    container.appendChild(more);
  }
}
renderGroup(document.getElementById('ag-group'));
renderGroup(document.getElementById('ag-limited'), 3);
      `,
    },
  },
  {
    id: 'js-breadcrumb-overflow',
    title: 'Breadcrumb Overflow',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create breadcrumbs that collapse middle items into an ellipsis dropdown when they overflow the available width.',
    concepts: ['Overflow detection', 'Dropdown menu', 'Responsive breadcrumbs', 'ResizeObserver'],
    demoCode: {
      html: `
<div class="bo-wrap">
  <nav class="bo-nav" id="bo-nav">
    <a class="bo-crumb">Home</a>
    <span class="bo-sep">/</span>
    <a class="bo-crumb">Products</a>
    <span class="bo-sep">/</span>
    <a class="bo-crumb">Electronics</a>
    <span class="bo-sep">/</span>
    <a class="bo-crumb">Phones</a>
    <span class="bo-sep">/</span>
    <a class="bo-crumb">Smartphones</a>
    <span class="bo-sep">/</span>
    <a class="bo-crumb bo-current">iPhone 15</a>
  </nav>
</div>
      `,
      css: `
.bo-wrap {
  max-width: 360px;
}
.bo-nav {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
  flex-wrap: nowrap;
}
.bo-crumb {
  font-size: 13px;
  color: #94a3b8;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
}
.bo-crumb:hover {
  color: #4fc3f7;
}
.bo-current {
  color: #4fc3f7;
  font-weight: 600;
}
.bo-sep {
  color: #475569;
  font-size: 12px;
  flex-shrink: 0;
}
.bo-ellipsis {
  padding: 2px 6px;
  background: #334155;
  border-radius: 4px;
  color: #94a3b8;
  cursor: pointer;
  font-size: 12px;
  flex-shrink: 0;
  position: relative;
}
.bo-ellipsis:hover {
  background: #475569;
}
.bo-dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  padding: 4px;
  min-width: 120px;
  z-index: 10;
}
.bo-dropdown.open {
  display: block;
}
.bo-dropdown a {
  display: block;
  padding: 6px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #94a3b8;
  text-decoration: none;
  cursor: pointer;
}
.bo-dropdown a:hover {
  background: #334155;
  color: #e0e0e0;
}
      `,
      js: `
const nav = document.getElementById('bo-nav');
const crumbs = [...nav.querySelectorAll('.bo-crumb')];
if (crumbs.length > 3) {
  const middle = crumbs.slice(1, -1);
  middle.forEach((c) => {
    c.previousElementSibling?.remove();
    c.remove();
  });
  const ellipsis = document.createElement('span');
  ellipsis.className = 'bo-ellipsis';
  ellipsis.textContent = '...';
  const dd = document.createElement('div');
  dd.className = 'bo-dropdown';
  middle.forEach((c) => {
    const a = document.createElement('a');
    a.textContent = c.textContent;
    dd.appendChild(a);
  });
  ellipsis.appendChild(dd);
  ellipsis.addEventListener('click', (e) => {
    e.stopPropagation();
    dd.classList.toggle('open');
  });
  document.addEventListener('click', () => dd.classList.remove('open'));
  const sep = document.createElement('span');
  sep.className = 'bo-sep';
  sep.textContent = '/';
  const firstSep = nav.querySelector('.bo-sep');
  firstSep.after(sep);
  sep.after(ellipsis);
  const sep2 = document.createElement('span');
  sep2.className = 'bo-sep';
  sep2.textContent = '/';
  ellipsis.after(sep2);
}
      `,
    },
  },
  {
    id: 'js-truncated-text',
    title: 'Truncated Text',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build a text truncation component with "Show more/less" toggle, line clamping, and smooth expand/collapse animation.',
    concepts: ['CSS line-clamp', 'Text overflow', 'Toggle expand', 'Max-height animation'],
    demoCode: {
      html: `
<div class="tt-wrap">
  <div class="tt-card">
    <p class="tt-text" id="tt-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur.
    </p>
    <button class="tt-toggle" id="tt-toggle">Show more</button>
  </div>
</div>
      `,
      css: `
.tt-wrap {
  max-width: 360px;
}
.tt-card {
  padding: 14px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
}
.tt-text {
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.6;
  margin: 0;
  overflow: hidden;
  transition: max-height 0.3s;
}
.tt-text.clamped {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-height: 62px;
}
.tt-toggle {
  background: none;
  border: none;
  color: #4fc3f7;
  font-size: 12px;
  cursor: pointer;
  padding: 4px 0;
  margin-top: 4px;
}
      `,
      js: `
const text = document.getElementById('tt-text'),
  toggle = document.getElementById('tt-toggle');
text.classList.add('clamped');
toggle.addEventListener('click', () => {
  const expanded = !text.classList.contains('clamped');
  text.classList.toggle('clamped');
  toggle.textContent = expanded ? 'Show more' : 'Show less';
  if (!expanded) {
    text.style.maxHeight = text.scrollHeight + 'px';
    text.style.display = 'block';
    text.style.webkitLineClamp = 'unset';
  } else {
    text.style.maxHeight = '62px';
  }
});
      `,
    },
  },
  {
    id: 'js-responsive-grid',
    title: 'Responsive Grid',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create a responsive grid system with auto-fit, configurable columns, gap control, and breakpoint-aware layout switching.',
    concepts: ['CSS Grid auto-fit', 'minmax', 'Custom properties', 'Layout switching'],
    demoCode: {
      html: `
<div class="rg-wrap">
  <div class="rg-controls">
    <label>
      Columns:
      <select id="rg-cols">
        <option value="auto">Auto</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </label>
    <label>
      Gap:
      <select id="rg-gap">
        <option value="8">8px</option>
        <option value="12" selected>12px</option>
        <option value="16">16px</option>
      </select>
    </label>
  </div>
  <div class="rg-grid" id="rg-grid"></div>
</div>
      `,
      css: `
.rg-wrap {
  max-width: 500px;
}
.rg-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
  font-size: 12px;
  color: #94a3b8;
}
.rg-controls select {
  padding: 2px 6px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 4px;
  color: #e0e0e0;
  font-size: 12px;
}
.rg-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;
}
.rg-cell {
  padding: 16px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  text-align: center;
  font-size: 13px;
  color: #e0e0e0;
  transition: all 0.2s;
}
.rg-cell:hover {
  border-color: #4fc3f7;
}
      `,
      js: `
const grid = document.getElementById('rg-grid'),
  cols = document.getElementById('rg-cols'),
  gap = document.getElementById('rg-gap');
for (let i = 1; i <= 8; i++) {
  const d = document.createElement('div');
  d.className = 'rg-cell';
  d.textContent = 'Cell ' + i;
  grid.appendChild(d);
}
function update() {
  const c = cols.value;
  const g = gap.value;
  grid.style.gap = g + 'px';
  if (c === 'auto')
    grid.style.gridTemplateColumns = 'repeat(auto-fit,minmax(100px,1fr))';
  else grid.style.gridTemplateColumns = 'repeat(' + c + ',1fr)';
}
cols.addEventListener('change', update);
gap.addEventListener('change', update);
      `,
    },
  },
  {
    id: 'js-masonry-layout',
    title: 'Masonry Layout',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a Pinterest-style masonry grid layout with variable height items and responsive column count.',
    concepts: ['Column balancing', 'Absolute positioning', 'Resize handling', 'Dynamic layout'],
    demoCode: {
      html: `<div class="ma-wrap"><div class="ma-grid" id="ma-grid"></div></div>`,
      css: `
.ma-wrap {
  max-width: 500px;
}
.ma-grid {
  column-count: 3;
  column-gap: 8px;
}
.ma-item {
  break-inside: avoid;
  margin-bottom: 8px;
  padding: 16px;
  border-radius: 8px;
  font-size: 13px;
  color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  transition: transform 0.2s;
}
.ma-item:hover {
  transform: scale(1.02);
}
      `,
      js: `
const grid = document.getElementById('ma-grid');
const items = [
  { h: 80, bg: '#1e3a5f', text: 'Short' },
  { h: 140, bg: '#3b1f5e', text: 'Tall' },
  { h: 100, bg: '#1f4a3b', text: 'Medium' },
  { h: 160, bg: '#5e3b1f', text: 'Extra Tall' },
  { h: 90, bg: '#4a1f3b', text: 'Short' },
  { h: 120, bg: '#1f3b5e', text: 'Medium' },
  { h: 150, bg: '#2d3a1f', text: 'Tall' },
  { h: 70, bg: '#3a1f2d', text: 'Tiny' },
  { h: 130, bg: '#1f2d3a', text: 'Medium' },
];
items.forEach((item) => {
  const d = document.createElement('div');
  d.className = 'ma-item';
  d.style.height = item.h + 'px';
  d.style.background = item.bg;
  d.textContent = item.text;
  grid.appendChild(d);
});
      `,
    },
  },
  {
    id: 'js-aspect-ratio-box',
    title: 'Aspect Ratio Box',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Create responsive aspect ratio containers that maintain proportions regardless of width, with common presets.',
    concepts: ['CSS aspect-ratio', 'Padding trick', 'Responsive sizing', 'Content fitting'],
    demoCode: {
      html: `
<div class="ar-wrap">
  <div class="ar-controls">
    <button class="ar-btn active" data-ratio="16/9">16:9</button>
    <button class="ar-btn" data-ratio="4/3">4:3</button>
    <button class="ar-btn" data-ratio="1/1">1:1</button>
    <button class="ar-btn" data-ratio="21/9">21:9</button>
  </div>
  <div class="ar-box" id="ar-box">
    <div class="ar-content" id="ar-content">16:9</div>
  </div>
</div>
      `,
      css: `
.ar-wrap {
  max-width: 400px;
}
.ar-controls {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}
.ar-btn {
  padding: 6px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #94a3b8;
  font-size: 12px;
  cursor: pointer;
}
.ar-btn:hover {
  border-color: #4fc3f7;
}
.ar-btn.active {
  background: #4fc3f7;
  color: #1a1a2e;
  border-color: #4fc3f7;
}
.ar-box {
  width: 100%;
  aspect-ratio: 16/9;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
  transition: aspect-ratio 0.3s;
}
.ar-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: #4fc3f7;
}
      `,
      js: `
const box = document.getElementById('ar-box'),
  content = document.getElementById('ar-content');
document.querySelectorAll('.ar-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document
      .querySelectorAll('.ar-btn')
      .forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    box.style.aspectRatio = btn.dataset.ratio;
    content.textContent = btn.dataset.ratio.replace('/', ':');
  });
});
      `,
    },
  },
  {
    id: 'js-scroll-snap',
    title: 'Scroll Snap',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Build a horizontal scroll snap container with page indicators, smooth snapping, and navigation buttons.',
    concepts: ['CSS scroll-snap', 'Scroll events', 'IntersectionObserver', 'Page indicators'],
    demoCode: {
      html: `
<div class="ss-wrap">
  <div class="ss-container" id="ss-container">
    <div class="ss-slide" style="background: #1e3a5f">Slide 1</div>
    <div class="ss-slide" style="background: #3b1f5e">Slide 2</div>
    <div class="ss-slide" style="background: #1f4a3b">Slide 3</div>
    <div class="ss-slide" style="background: #5e3b1f">Slide 4</div>
  </div>
  <div class="ss-nav">
    <button class="ss-prev" id="ss-prev">&#8249;</button>
    <div class="ss-dots" id="ss-dots"></div>
    <button class="ss-next" id="ss-next">&#8250;</button>
  </div>
</div>
      `,
      css: `
.ss-wrap {
  max-width: 400px;
}
.ss-container {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 0;
  border-radius: 8px;
  scrollbar-width: none;
}
.ss-container::-webkit-scrollbar {
  display: none;
}
.ss-slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
}
.ss-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 8px;
}
.ss-prev,
.ss-next {
  background: #334155;
  border: none;
  color: #e0e0e0;
  font-size: 20px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
}
.ss-prev:hover,
.ss-next:hover {
  background: #475569;
}
.ss-dots {
  display: flex;
  gap: 6px;
}
.ss-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #334155;
  cursor: pointer;
  transition: background 0.2s;
}
.ss-dot.active {
  background: #4fc3f7;
}
      `,
      js: `
const container = document.getElementById('ss-container'),
  dots = document.getElementById('ss-dots');
const slides = container.querySelectorAll('.ss-slide');
let cur = 0;
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'ss-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => scrollTo(i));
  dots.appendChild(dot);
});
function scrollTo(i) {
  cur = i;
  container.scrollTo({ left: i * container.offsetWidth, behavior: 'smooth' });
  updateDots();
}
function updateDots() {
  dots
    .querySelectorAll('.ss-dot')
    .forEach((d, i) => d.classList.toggle('active', i === cur));
}
container.addEventListener('scroll', () => {
  const idx = Math.round(container.scrollLeft / container.offsetWidth);
  if (idx !== cur) {
    cur = idx;
    updateDots();
  }
});
document
  .getElementById('ss-prev')
  .addEventListener('click', () => scrollTo(Math.max(0, cur - 1)));
document
  .getElementById('ss-next')
  .addEventListener('click', () =>
    scrollTo(Math.min(slides.length - 1, cur + 1)),
  );
      `,
    },
  },
  {
    id: 'js-parallax',
    title: 'Parallax',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create a parallax scrolling effect with layered elements moving at different speeds for a depth illusion.',
    concepts: ['Scroll events', 'Transform translate', 'Layer speeds', 'Perspective'],
    demoCode: {
      html: `
<div class="px-wrap" id="px-wrap">
  <div class="px-layer px-back" id="px-back">
    <div class="px-star" style="left: 10%; top: 20%"></div>
    <div class="px-star" style="left: 40%; top: 10%"></div>
    <div class="px-star" style="left: 70%; top: 30%"></div>
    <div class="px-star" style="left: 90%; top: 15%"></div>
  </div>
  <div class="px-layer px-mid" id="px-mid">
    <div class="px-cloud" style="left: 15%; top: 40%"></div>
    <div class="px-cloud" style="left: 60%; top: 25%"></div>
  </div>
  <div class="px-layer px-front" id="px-front"><div class="px-hill"></div></div>
  <div class="px-content">
    <p>Scroll to see parallax effect</p>
    <div style="height: 200px"></div>
    <p>Different layers move at different speeds</p>
    <div style="height: 200px"></div>
    <p>Creating depth illusion</p>
  </div>
</div>
      `,
      css: `
.px-wrap {
  position: relative;
  height: 220px;
  overflow-y: auto;
  border: 1px solid #334155;
  border-radius: 8px;
  max-width: 400px;
  background: #0a0a1a;
}
.px-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
}
.px-star {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #e0e0e0;
  border-radius: 50%;
}
.px-cloud {
  position: absolute;
  width: 60px;
  height: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
}
.px-hill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #1e293b;
  border-radius: 50% 50% 0 0;
}
.px-content {
  position: relative;
  z-index: 1;
  padding: 16px;
  font-size: 14px;
  color: #94a3b8;
}
      `,
      js: `
const wrap = document.getElementById('px-wrap'),
  back = document.getElementById('px-back'),
  mid = document.getElementById('px-mid'),
  front = document.getElementById('px-front');
wrap.addEventListener('scroll', () => {
  const s = wrap.scrollTop;
  back.style.transform = 'translateY(' + s * 0.1 + 'px)';
  mid.style.transform = 'translateY(' + s * 0.3 + 'px)';
  front.style.transform = 'translateY(' + s * 0.5 + 'px)';
});
      `,
    },
  },
  {
    id: 'js-animated-counter',
    title: 'Animated Counter',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'beginner',
    description:
      'Build animated number counters that count up from zero with easing, locale formatting, and trigger-on-scroll support.',
    concepts: [
      'requestAnimationFrame',
      'Easing functions',
      'Number formatting',
      'IntersectionObserver',
    ],
    demoCode: {
      html: `
<div class="ac-wrap">
  <div class="ac-grid">
    <div class="ac-card">
      <div class="ac-num" data-target="15847">0</div>
      <div class="ac-label">Users</div>
    </div>
    <div class="ac-card">
      <div class="ac-num" data-target="98.5" data-decimals="1">0</div>
      <div class="ac-label">Uptime %</div>
    </div>
    <div class="ac-card">
      <div class="ac-num" data-target="2500000" data-prefix="$">0</div>
      <div class="ac-label">Revenue</div>
    </div>
  </div>
</div>
      `,
      css: `
.ac-wrap {
  max-width: 500px;
}
.ac-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.ac-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}
.ac-num {
  font-size: 28px;
  font-weight: 700;
  color: #4fc3f7;
  margin-bottom: 4px;
}
.ac-label {
  font-size: 12px;
  color: #64748b;
}
      `,
      js: `
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const decimals = parseInt(el.dataset.decimals || '0');
  const prefix = el.dataset.prefix || '';
  const duration = 2000;
  const start = performance.now();
  function ease(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }
  function update(now) {
    const elapsed = Math.min((now - start) / duration, 1);
    const val = ease(elapsed) * target;
    if (decimals > 0) {
      el.textContent = prefix + val.toFixed(decimals);
    } else {
      el.textContent = prefix + Math.round(val).toLocaleString();
    }
    if (elapsed < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 },
);
document.querySelectorAll('.ac-num').forEach((el) => obs.observe(el));
      `,
    },
  },
  {
    id: 'js-confetti',
    title: 'Confetti',
    category: 'ui-components',
    framework: 'native-js',
    difficulty: 'intermediate',
    description:
      'Create a canvas-based confetti animation with particle physics, multiple colors, and burst/continuous modes.',
    concepts: ['Canvas API', 'Particle system', 'requestAnimationFrame', 'Physics simulation'],
    demoCode: {
      html: `
<div class="cf-wrap">
  <canvas id="cf-canvas" class="cf-canvas" width="400" height="250"></canvas>
  <div class="cf-controls">
    <button id="cf-burst" class="cf-btn">Burst!</button>
    <button id="cf-rain" class="cf-btn cf-secondary">Toggle Rain</button>
  </div>
</div>
      `,
      css: `
.cf-wrap {
  max-width: 420px;
  position: relative;
}
.cf-canvas {
  width: 100%;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
}
.cf-controls {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
.cf-btn {
  flex: 1;
  padding: 8px;
  background: #4fc3f7;
  color: #1a1a2e;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
}
.cf-secondary {
  background: #334155;
  color: #e0e0e0;
}
      `,
      js: `
const canvas = document.getElementById('cf-canvas'),
  ctx = canvas.getContext('2d');
const colors = [
  '#4fc3f7',
  '#4ade80',
  '#facc15',
  '#ef4444',
  '#c084fc',
  '#fb923c',
];
let particles = [],
  raining = false;
function Particle(x, y, burst) {
  this.x = x;
  this.y = y;
  this.vx = (Math.random() - 0.5) * (burst ? 8 : 2);
  this.vy = burst ? -Math.random() * 8 - 2 : -Math.random() * 1 - 0.5;
  this.size = Math.random() * 6 + 2;
  this.color = colors[Math.floor(Math.random() * colors.length)];
  this.life = 1;
  this.decay = Math.random() * 0.02 + 0.005;
  this.rotation = Math.random() * 360;
  this.rotSpeed = (Math.random() - 0.5) * 10;
}
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (raining && Math.random() < 0.3) {
    particles.push(new Particle(Math.random() * canvas.width, -10, false));
  }
  particles = particles.filter((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.15;
    p.life -= p.decay;
    p.rotation += p.rotSpeed;
    if (p.life <= 0) return false;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();
    return p.y < canvas.height + 20;
  });
  requestAnimationFrame(update);
}
document.getElementById('cf-burst').addEventListener('click', () => {
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle(canvas.width / 2, canvas.height / 2, true));
  }
});
document.getElementById('cf-rain').addEventListener('click', () => {
  raining = !raining;
});
update();
      `,
    },
  },
];
