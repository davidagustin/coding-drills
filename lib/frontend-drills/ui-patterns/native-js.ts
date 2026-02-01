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
label { display: block; margin-bottom: 4px; font-size: 14px; color: #94a3b8; }
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
.hint { font-size: 12px; color: #64748b; margin-top: 12px; }`,
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
      css: `.select-wrapper { max-width: 280px; position: relative; }
label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #94a3b8;
}
.custom-select {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 12px; border-radius: 8px; border: 1px solid #334155;
  background: #1e293b; color: #e2e8f0; cursor: pointer; outline: none; font-size: 14px;
}
.custom-select:focus, .custom-select[aria-expanded="true"] { border-color: #3b82f6; }
.arrow { font-size: 12px; color: #64748b; transition: transform 0.2s; }
.custom-select[aria-expanded="true"] .arrow { transform: rotate(180deg); }
.select-options {
  position: absolute; top: 100%; left: 0; right: 0; margin-top: 4px; padding: 4px;
  background: #1e293b; border: 1px solid #334155; border-radius: 8px;
  list-style: none; z-index: 10; max-height: 180px; overflow-y: auto;
}
.select-options li {
  padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 14px; color: #e2e8f0;
}
.select-options li:hover, .select-options li.active { background: #334155; }
.select-options li.selected { background: #3b82f6; color: white; }
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

function open() { isOpen = true; optionsList.style.display = 'block'; select.setAttribute('aria-expanded','true'); }
function close() { isOpen = false; optionsList.style.display = 'none'; select.setAttribute('aria-expanded','false'); activeIdx = -1; items.forEach(i => i.classList.remove('active')); }

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
.meter-track { height: 6px; background: #334155; border-radius: 3px; margin-top: 12px; overflow: hidden; }
.meter-fill { height: 100%; width: 0%; border-radius: 3px; transition: width 0.3s, background 0.3s; }
.strength-label { font-size: 13px; margin-top: 8px; font-weight: 600; color: #64748b; }
.rules { list-style: none; padding: 0; margin-top: 12px; }
.rules li { font-size: 12px; color: #64748b; padding: 3px 0; transition: color 0.2s; }
.rules li::before { content: '\\2717 '; color: #ef4444; }
.rules li.pass { color: #94a3b8; }
.rules li.pass::before { content: '\\2713 '; color: #22c55e; }`,
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
.field-group label { display: block; margin-bottom: 4px; font-size: 13px; color: #94a3b8; }
.field-group label .req { color: #ef4444; }
.field-group input, .field-group select, .field-group textarea {
  width: 100%; padding: 8px 10px; border-radius: 6px; border: 1px solid #334155;
  background: #1e293b; color: #e2e8f0; outline: none; font-size: 13px;
}
.field-group input:focus, .field-group select:focus, .field-group textarea:focus { border-color: #3b82f6; }
.field-group textarea { resize: vertical; min-height: 60px; }
.field-error { font-size: 11px; color: #ef4444; margin-top: 2px; }
button[type="submit"] {
  width: 100%; padding: 10px; border-radius: 8px; border: none;
  background: #3b82f6; color: white; font-weight: 600; cursor: pointer; margin-top: 4px;
}
button[type="submit"]:hover { background: #2563eb; }
.output { margin-top: 12px; padding: 10px; background: #1e293b; border: 1px solid #334155; border-radius: 8px; font-size: 12px; color: #94a3b8; font-family: monospace; white-space: pre-wrap; }`,
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

function openModal() { backdrop.classList.add('open'); confirmBtn.focus(); }
function closeModal() { backdrop.classList.remove('open'); openBtn.focus(); }

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
.sortable-list { list-style: none; padding: 0; max-width: 340px; }
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
      css: `.sortable-table { width: 100%; border-collapse: collapse; }
th, td { padding: 10px 14px; text-align: left; font-size: 13px; }
th {
  background: #1e293b; color: #94a3b8; font-weight: 600; cursor: pointer;
  border-bottom: 2px solid #334155; user-select: none; white-space: nowrap;
}
th:hover { color: #e2e8f0; }
th.asc .sort-icon::after { content: ' \\2191'; color: #3b82f6; }
th.desc .sort-icon::after { content: ' \\2193'; color: #3b82f6; }
td { color: #e2e8f0; border-bottom: 1px solid #1e293b; }
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
    else { sortCol = col; sortDir = 'asc'; }
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
      css: `.tabs { display: flex; gap: 4px; border-bottom: 2px solid #1e293b; padding-bottom: 0; }
.tab {
  padding: 10px 20px; background: transparent; border: none; color: #94a3b8;
  font-size: 14px; font-weight: 500; cursor: pointer; border-bottom: 2px solid transparent;
  margin-bottom: -2px; transition: color 0.2s, border-color 0.2s; outline: none;
}
.tab:hover { color: #e2e8f0; }
.tab.active { color: #3b82f6; border-bottom-color: #3b82f6; }
.tab:focus-visible { box-shadow: 0 0 0 2px rgba(59,130,246,0.4); border-radius: 4px 4px 0 0; }
.tab-panel { display: none; padding: 20px 4px; animation: fadeTab 0.3s; }
.tab-panel.active { display: block; }
.tab-panel h4 { font-size: 16px; color: #e2e8f0; margin-bottom: 8px; }
.tab-panel p { font-size: 14px; color: #94a3b8; line-height: 1.6; }
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
      css: `.accordion { max-width: 400px; }
.accordion-item { border: 1px solid #334155; border-radius: 8px; margin-bottom: 6px; overflow: hidden; }
.accordion-header {
  width: 100%; display: flex; justify-content: space-between; align-items: center;
  padding: 14px 16px; background: #1e293b; border: none; color: #e2e8f0;
  font-size: 14px; font-weight: 500; cursor: pointer; text-align: left; outline: none;
  transition: background 0.2s;
}
.accordion-header:hover { background: #334155; }
.accordion-header:focus-visible { box-shadow: inset 0 0 0 2px #3b82f6; }
.accordion-header .icon { font-size: 18px; transition: transform 0.3s; color: #64748b; }
.accordion-header[aria-expanded="true"] .icon { transform: rotate(45deg); color: #3b82f6; }
.accordion-body {
  max-height: 0; overflow: hidden; transition: max-height 0.35s ease;
  background: rgba(30,41,59,0.5);
}
.accordion-body p { padding: 0 16px 14px; font-size: 13px; color: #94a3b8; line-height: 1.6; margin: 0; }
.accordion-body.open { max-height: 200px; padding-top: 10px; }`,
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
.carousel-viewport { overflow: hidden; border-radius: 12px; }
.carousel-track { display: flex; transition: transform 0.4s ease; }
.slide {
  min-width: 100%; height: 180px; display: flex; align-items: center; justify-content: center;
  font-size: 24px; font-weight: 700; color: #e2e8f0; user-select: none;
}
.carousel-controls { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 12px; }
.nav-btn {
  width: 36px; height: 36px; border-radius: 50%; border: 1px solid #475569;
  background: #1e293b; color: #e2e8f0; cursor: pointer; font-size: 16px;
  display: flex; align-items: center; justify-content: center;
}
.nav-btn:hover { background: #334155; border-color: #3b82f6; }
.dots { display: flex; gap: 8px; }
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
.menu-item:focus { outline: none; background: #334155; }
.menu-divider { height: 1px; background: #334155; margin: 4px 0; }
.action-log { margin-top: 12px; font-size: 13px; color: #94a3b8; text-align: center; }`,
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
.scroll-item .id { color: #64748b; font-size: 12px; font-family: monospace; }
.sentinel { padding: 16px; text-align: center; }
.loader { color: #3b82f6; font-size: 13px; }
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
.btn-group { display: flex; gap: 8px; flex-wrap: wrap; }
.toast-btn {
  padding: 10px 16px; border-radius: 8px; border: 1px solid #475569;
  background: #1e293b; color: #e2e8f0; cursor: pointer; font-size: 13px;
}
.toast-btn:hover { background: #334155; }
.toast-container { position: absolute; bottom: 0; right: 0; display: flex; flex-direction: column-reverse; gap: 8px; }
.toast {
  display: flex; align-items: center; gap: 10px; padding: 12px 16px; min-width: 240px;
  border-radius: 8px; font-size: 13px; color: #e2e8f0;
  transform: translateX(120%); transition: transform 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
.toast.show { transform: translateX(0); }
.toast.success { background: #1a3a2a; border: 1px solid #22c55e; }
.toast.error { background: #3a1a1a; border: 1px solid #ef4444; }
.toast.info { background: #1a2a3a; border: 1px solid #3b82f6; }
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
.progress-bar { height: 4px; background: #334155; border-radius: 2px; margin-bottom: 12px; }
.progress-fill { height: 100%; background: #3b82f6; border-radius: 2px; width: 33%; transition: width 0.3s; }
.steps-indicator { display: flex; justify-content: space-between; margin-bottom: 20px; }
.step-dot { width: 28px; height: 28px; border-radius: 50%; border: 2px solid #475569; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #64748b; transition: all 0.2s; }
.step-dot.active { border-color: #3b82f6; color: #3b82f6; background: rgba(59,130,246,0.1); }
.step-dot.done { border-color: #22c55e; background: #22c55e; color: white; }
.step { display: none; }
.step.active { display: block; animation: fadeIn 0.3s; }
.step h4 { font-size: 16px; color: #e2e8f0; margin-bottom: 12px; }
.step input {
  width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155;
  background: #1e293b; color: #e2e8f0; outline: none; font-size: 14px;
}
.step input:focus {
  border-color: #3b82f6;
}
.summary { padding: 12px; background: #1e293b; border-radius: 8px; font-size: 13px; color: #94a3b8; line-height: 1.8; }
.wizard-actions { display: flex; gap: 10px; margin-top: 20px; }
.btn-primary { flex: 1; padding: 10px; border-radius: 8px; border: none; background: #3b82f6; color: white; font-weight: 600; cursor: pointer; }
.btn-primary:hover { background: #2563eb; }
.btn-secondary { flex: 1; padding: 10px; border-radius: 8px; border: 1px solid #475569; background: transparent; color: #94a3b8; cursor: pointer; }
.btn-secondary:hover { background: #334155; }
.btn-secondary:disabled { opacity: 0.4; cursor: default; }
.error-msg { color: #ef4444; font-size: 12px; margin-top: 6px; min-height: 18px; }
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
.filter-tags { display: flex; gap: 6px; margin-bottom: 12px; }
.tag {
  padding: 5px 14px; border-radius: 20px; border: 1px solid #475569;
  background: transparent; color: #94a3b8; cursor: pointer; font-size: 12px;
}
.tag:hover { border-color: #3b82f6; color: #e2e8f0; }
.tag.active { background: #3b82f6; border-color: #3b82f6; color: white; }
.results { list-style: none; padding: 0; }
.results li {
  padding: 10px 12px; border-bottom: 1px solid #1e293b; font-size: 14px; color: #e2e8f0;
  display: flex; justify-content: space-between;
}
.results li .cat { font-size: 11px; color: #64748b; text-transform: uppercase; }
.results li mark { background: #3b82f6; color: white; border-radius: 2px; padding: 0 2px; }
.no-results { text-align: center; color: #64748b; font-size: 14px; }`,
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
  },
];
