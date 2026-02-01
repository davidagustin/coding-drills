import type { UIPattern } from './types';

export const angularUIPatterns: UIPattern[] = [
  // Forms & Input
  {
    id: 'ng-reactive-forms',
    title: 'Reactive Forms with Validation',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Build type-safe reactive forms using FormBuilder, FormGroup, and FormControl with built-in and custom validators. Learn proper form state management and validation feedback.',
    concepts: ['Reactive Forms', 'FormBuilder', 'validators', 'form state'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <form id="ng-form">
    <div class="form-group">
      <label>Name</label>
      <input id="name" placeholder="Your name" />
      <div class="error" id="name-error"></div>
    </div>
    <div class="form-group">
      <label>Email</label>
      <input id="email" placeholder="you@example.com" />
      <div class="error" id="email-error"></div>
    </div>
    <button type="submit">Submit</button>
    <div id="result" class="success" style="display:none"></div>
  </form>
  <p class="note">Angular patterns use reactive forms. This demo simulates the behavior with vanilla JS.</p>
</div>`,
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
}

input:focus {
  border-color: #ef4444;
}

.error {
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
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
  background: #ef4444;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background: #dc2626;
}

.note {
  margin-top: 20px;
  font-size: 11px;
  color: #64748b;
  text-align: center;
  font-style: italic;
}`,
      js: `// Simulating Angular Reactive Forms behavior
const form = document.getElementById('ng-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

function validate(input, errorId, rules) {
  const el = document.getElementById(errorId);
  const val = input.value;
  for (const rule of rules) {
    if (!rule.test(val)) { el.textContent = rule.msg; return false; }
  }
  el.textContent = '';
  return true;
}

const nameRules = [{ test: v => v.trim().length > 0, msg: 'Name is required' }];
const emailRules = [
  { test: v => v.length > 0, msg: 'Email is required' },
  { test: v => v.includes('@'), msg: 'Must be a valid email' }
];

nameInput.addEventListener('input', () => validate(nameInput, 'name-error', nameRules));
emailInput.addEventListener('input', () => validate(emailInput, 'email-error', emailRules));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const v1 = validate(nameInput, 'name-error', nameRules);
  const v2 = validate(emailInput, 'email-error', emailRules);
  if (v1 && v2) {
    const result = document.getElementById('result');
    result.style.display = 'block';
    result.textContent = 'Welcome, ' + nameInput.value + '!';
  }
});`,
    },
  },
  {
    id: 'ng-template-forms',
    title: 'Template-Driven Forms',
    category: 'forms-input',
    difficulty: 'beginner',
    description:
      'Create forms using template-driven approach with ngModel two-way binding, template reference variables, and built-in validation directives.',
    concepts: ['ngModel', 'template forms', 'two-way binding', 'directives'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Template-Driven Form</h3>
  <form id="tpl-form">
    <div class="form-group">
      <label>Username</label>
      <input id="username" placeholder="Enter username" />
      <span class="hint" id="username-hint"></span>
    </div>
    <div class="form-group">
      <label>Favorite Color</label>
      <select id="color">
        <option value="">-- Select --</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </select>
    </div>
    <div class="form-group">
      <label><input type="checkbox" id="agree" /> I agree to terms</label>
    </div>
    <button type="submit" id="submit-btn" disabled>Submit</button>
    <div id="output" class="output" style="display:none"></div>
  </form>
</div>`,
      css: `.form-group {
  margin-bottom: 14px;
}

label {
  display: block;
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 4px;
}

input[type="text"], input:not([type]), select {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
}

input:focus, select:focus {
  border-color: #ef4444;
}

.hint {
  font-size: 11px;
  color: #ef4444;
  min-height: 16px;
  display: block;
  margin-top: 2px;
}

button {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #ef4444;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.output {
  margin-top: 14px;
  padding: 12px;
  background: rgba(34,197,94,0.1);
  color: #22c55e;
  border-radius: 8px;
  text-align: center;
}`,
      js: `// Simulating Angular template-driven forms with two-way binding
const username = document.getElementById('username');
const color = document.getElementById('color');
const agree = document.getElementById('agree');
const btn = document.getElementById('submit-btn');
const form = document.getElementById('tpl-form');
const hint = document.getElementById('username-hint');

function syncState() {
  const valid = username.value.trim().length >= 2 && color.value && agree.checked;
  btn.disabled = !valid;
  hint.textContent = username.value && username.value.trim().length < 2 ? 'Min 2 characters' : '';
}

username.addEventListener('input', syncState);
color.addEventListener('change', syncState);
agree.addEventListener('change', syncState);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const out = document.getElementById('output');
  out.style.display = 'block';
  out.textContent = 'Hello ' + username.value + '! You picked ' + color.value + '.';
});`,
    },
  },
  {
    id: 'ng-custom-validators',
    title: 'Custom Validators',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Implement custom synchronous and asynchronous validators as functions or directives. Handle cross-field validation and server-side validation with proper error handling.',
    concepts: ['custom validators', 'async validators', 'ValidatorFn', 'RxJS'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Custom Validators</h3>
  <form id="val-form">
    <div class="form-group">
      <label>Password</label>
      <input id="password" type="password" placeholder="Enter password" />
      <div class="error" id="pw-error"></div>
      <ul class="rules" id="pw-rules">
        <li id="rule-len">At least 8 characters</li>
        <li id="rule-upper">One uppercase letter</li>
        <li id="rule-num">One number</li>
        <li id="rule-special">One special character</li>
      </ul>
    </div>
    <div class="form-group">
      <label>Confirm Password</label>
      <input id="confirm" type="password" placeholder="Re-enter password" />
      <div class="error" id="cf-error"></div>
    </div>
    <button type="submit">Register</button>
    <div id="result" class="success" style="display:none">Validation passed!</div>
  </form>
</div>`,
      css: `.form-group {
  margin-bottom: 14px;
}

label {
  display: block;
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 4px;
}

input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
}

input:focus {
  border-color: #ef4444;
}

.error {
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
  min-height: 16px;
}

.rules {
  list-style: none;
  padding: 0;
  margin: 6px 0 0 0;
}

.rules li {
  font-size: 11px;
  color: #64748b;
  padding: 2px 0;
}

.rules li.pass {
  color: #22c55e;
}

.rules li.pass::before {
  content: '\\2713 ';
}

.rules li:not(.pass)::before {
  content: '\\2717 ';
}

button {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #ef4444;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background: #dc2626;
}

.success {
  margin-top: 14px;
  padding: 12px;
  background: rgba(34,197,94,0.1);
  color: #22c55e;
  border-radius: 8px;
  text-align: center;
}`,
      js: `// Simulating Angular custom validators (sync + cross-field)
const pw = document.getElementById('password');
const cf = document.getElementById('confirm');
const form = document.getElementById('val-form');

const rules = {
  len: { el: document.getElementById('rule-len'), test: v => v.length >= 8 },
  upper: { el: document.getElementById('rule-upper'), test: v => /[A-Z]/.test(v) },
  num: { el: document.getElementById('rule-num'), test: v => /[0-9]/.test(v) },
  special: { el: document.getElementById('rule-special'), test: v => /[!@#$%^&*]/.test(v) },
};

function validatePw() {
  const val = pw.value;
  let allPass = true;
  for (const k of Object.keys(rules)) {
    const pass = rules[k].test(val);
    rules[k].el.className = pass ? 'pass' : '';
    if (!pass) allPass = false;
  }
  document.getElementById('pw-error').textContent = val && !allPass ? 'Password does not meet requirements' : '';
  return allPass;
}

function validateMatch() {
  const match = pw.value === cf.value;
  document.getElementById('cf-error').textContent = cf.value && !match ? 'Passwords do not match' : '';
  return match;
}

pw.addEventListener('input', () => { validatePw(); if (cf.value) validateMatch(); });
cf.addEventListener('input', validateMatch);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validatePw() && validateMatch()) {
    document.getElementById('result').style.display = 'block';
  }
});`,
    },
  },
  {
    id: 'ng-autocomplete',
    title: 'Autocomplete with RxJS',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Build an autocomplete input with debounced API calls using RxJS operators (debounceTime, switchMap, distinctUntilChanged). Handle loading states and error scenarios.',
    concepts: ['RxJS', 'debounceTime', 'switchMap', 'observables'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Autocomplete Search</h3>
  <div class="search-wrap">
    <input id="search" placeholder="Search fruits..." autocomplete="off" />
    <div id="spinner" class="spinner" style="display:none"></div>
    <ul id="results" class="results"></ul>
  </div>
  <p class="note">Type to search. Results appear after a debounce delay.</p>
</div>`,
      css: `.search-wrap {
  position: relative;
}

input {
  width: 100%;
  padding: 10px 36px 10px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
  font-size: 14px;
}

input:focus {
  border-color: #ef4444;
}

.spinner {
  position: absolute;
  right: 10px;
  top: 12px;
  width: 16px;
  height: 16px;
  border: 2px solid #334155;
  border-top-color: #ef4444;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.results {
  list-style: none;
  padding: 0;
  margin: 4px 0 0 0;
  border-radius: 8px;
  overflow: hidden;
}

.results li {
  padding: 10px 12px;
  background: #1e293b;
  color: #e2e8f0;
  cursor: pointer;
  border-bottom: 1px solid #0f172a;
  font-size: 13px;
}

.results li:hover {
  background: #334155;
}

.results li mark {
  background: transparent;
  color: #ef4444;
  font-weight: 700;
}

.note {
  margin-top: 16px;
  font-size: 11px;
  color: #64748b;
  text-align: center;
  font-style: italic;
}`,
      js: `// Simulating Angular autocomplete with RxJS debounceTime + switchMap
const fruits = ['Apple','Apricot','Avocado','Banana','Blueberry','Cherry','Coconut','Cranberry','Dragon Fruit','Fig','Grape','Guava','Kiwi','Lemon','Lime','Mango','Melon','Nectarine','Orange','Papaya','Peach','Pear','Pineapple','Plum','Pomegranate','Raspberry','Strawberry','Watermelon'];
const input = document.getElementById('search');
const list = document.getElementById('results');
const spinner = document.getElementById('spinner');
let timer = null;

function highlight(text, query) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return text.slice(0, idx) + '<mark>' + text.slice(idx, idx + query.length) + '</mark>' + text.slice(idx + query.length);
}

function search(query) {
  spinner.style.display = 'block';
  // Simulate async API call
  setTimeout(() => {
    spinner.style.display = 'none';
    const matches = fruits.filter(f => f.toLowerCase().includes(query.toLowerCase()));
    list.innerHTML = matches.length
      ? matches.map(m => '<li>' + highlight(m, query) + '</li>').join('')
      : '<li style="color:#64748b">No results</li>';
  }, 300);
}

input.addEventListener('input', () => {
  clearTimeout(timer);
  list.innerHTML = '';
  if (!input.value.trim()) { spinner.style.display = 'none'; return; }
  // debounceTime simulation
  timer = setTimeout(() => search(input.value.trim()), 250);
});

list.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    input.value = e.target.textContent;
    list.innerHTML = '';
  }
});`,
    },
  },
  {
    id: 'ng-file-upload',
    title: 'File Upload with Progress',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Implement file upload with progress tracking using HttpClient and reportProgress option. Display upload status, handle errors, and support multiple file selection.',
    concepts: ['HttpClient', 'file upload', 'progress events', 'observables'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>File Upload</h3>
  <div class="drop-zone" id="drop-zone">
    <div class="drop-icon">&#128193;</div>
    <p>Drag & drop files here or <label class="browse" for="file-input">browse</label></p>
    <input type="file" id="file-input" multiple hidden />
  </div>
  <div id="file-list" class="file-list"></div>
</div>`,
      css: `.drop-zone {
  border: 2px dashed #334155;
  border-radius: 12px;
  padding: 32px 16px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s;
}

.drop-zone.over {
  border-color: #ef4444;
  background: rgba(239,68,68,0.05);
}

.drop-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.drop-zone p {
  color: #94a3b8;
  font-size: 13px;
  margin: 0;
}

.browse {
  color: #ef4444;
  cursor: pointer;
  text-decoration: underline;
}

.file-list {
  margin-top: 14px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #1e293b;
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
  font-size: 11px;
  color: #64748b;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: #334155;
  border-radius: 2px;
  margin-top: 6px;
  overflow: hidden;
}

.progress-bar .fill {
  height: 100%;
  background: #ef4444;
  border-radius: 2px;
  transition: width 0.2s;
}

.status {
  font-size: 11px;
  color: #22c55e;
  margin-top: 4px;
}`,
      js: `// Simulating Angular HttpClient file upload with progress
const zone = document.getElementById('drop-zone');
const input = document.getElementById('file-input');
const list = document.getElementById('file-list');

zone.addEventListener('click', () => input.click());
zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('over'); });
zone.addEventListener('dragleave', () => zone.classList.remove('over'));
zone.addEventListener('drop', (e) => {
  e.preventDefault();
  zone.classList.remove('over');
  handleFiles(e.dataTransfer.files);
});
input.addEventListener('change', () => handleFiles(input.files));

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function handleFiles(files) {
  Array.from(files).forEach(file => {
    const item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = '<div><div class="name">' + file.name + '</div><div class="size">' + formatSize(file.size) + '</div><div class="progress-bar"><div class="fill" style="width:0%"></div></div><div class="status"></div></div>';
    list.appendChild(item);
    simulateUpload(item);
  });
}

function simulateUpload(item) {
  const fill = item.querySelector('.fill');
  const status = item.querySelector('.status');
  let pct = 0;
  const iv = setInterval(() => {
    pct += Math.random() * 15 + 5;
    if (pct >= 100) {
      pct = 100;
      clearInterval(iv);
      status.textContent = 'Upload complete';
    }
    fill.style.width = Math.min(pct, 100) + '%';
  }, 200);
}`,
    },
  },
  {
    id: 'ng-date-picker',
    title: 'Date Picker Integration',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Integrate Angular Material datepicker or build custom date picker using Angular CDK. Handle date formatting, timezone considerations, and range selection.',
    concepts: ['Angular CDK', 'Material datepicker', 'date formatting', 'forms'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Date Picker</h3>
  <div class="picker-wrap">
    <input id="date-input" placeholder="MM/DD/YYYY" readonly />
    <button id="cal-btn" class="cal-btn">&#128197;</button>
  </div>
  <div id="calendar" class="calendar" style="display:none">
    <div class="cal-header">
      <button id="prev-month">&lt;</button>
      <span id="month-label"></span>
      <button id="next-month">&gt;</button>
    </div>
    <div class="cal-grid" id="cal-grid"></div>
  </div>
  <div id="selected" class="selected"></div>
</div>`,
      css: `.picker-wrap {
  display: flex;
  gap: 8px;
}

input {
  flex: 1;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
  font-size: 14px;
  cursor: pointer;
}

.cal-btn {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  cursor: pointer;
  font-size: 16px;
}

.calendar {
  margin-top: 8px;
  background: #1e293b;
  border-radius: 10px;
  padding: 12px;
  border: 1px solid #334155;
}

.cal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.cal-header button {
  background: none;
  border: none;
  color: #e2e8f0;
  font-size: 16px;
  cursor: pointer;
  padding: 4px 8px;
}

.cal-header span {
  color: #e2e8f0;
  font-weight: 600;
  font-size: 14px;
}

.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  text-align: center;
}

.cal-grid .day-label {
  font-size: 11px;
  color: #64748b;
  padding: 4px;
}

.cal-grid .day {
  padding: 6px;
  font-size: 13px;
  color: #94a3b8;
  cursor: pointer;
  border-radius: 6px;
}

.cal-grid .day:hover {
  background: #334155;
}

.cal-grid .day.today {
  border: 1px solid #ef4444;
}

.cal-grid .day.selected {
  background: #ef4444;
  color: white;
}

.selected {
  margin-top: 12px;
  font-size: 13px;
  color: #94a3b8;
  text-align: center;
}`,
      js: `// Simulating Angular Material Datepicker
const input = document.getElementById('date-input');
const cal = document.getElementById('calendar');
const grid = document.getElementById('cal-grid');
const label = document.getElementById('month-label');
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
let current = new Date();
let selectedDate = null;

document.getElementById('cal-btn').addEventListener('click', toggle);
input.addEventListener('click', toggle);

function toggle() {
  cal.style.display = cal.style.display === 'none' ? 'block' : 'none';
  if (cal.style.display === 'block') render();
}

document.getElementById('prev-month').addEventListener('click', () => { current.setMonth(current.getMonth() - 1); render(); });
document.getElementById('next-month').addEventListener('click', () => { current.setMonth(current.getMonth() + 1); render(); });

function render() {
  const y = current.getFullYear(), m = current.getMonth();
  label.textContent = months[m] + ' ' + y;
  grid.innerHTML = days.map(d => '<div class="day-label">' + d + '</div>').join('');
  const first = new Date(y, m, 1).getDay();
  const count = new Date(y, m + 1, 0).getDate();
  const today = new Date();
  for (let i = 0; i < first; i++) grid.innerHTML += '<div></div>';
  for (let d = 1; d <= count; d++) {
    const isToday = d === today.getDate() && m === today.getMonth() && y === today.getFullYear();
    const isSel = selectedDate && d === selectedDate.getDate() && m === selectedDate.getMonth() && y === selectedDate.getFullYear();
    grid.innerHTML += '<div class="day' + (isToday ? ' today' : '') + (isSel ? ' selected' : '') + '" data-day="' + d + '">' + d + '</div>';
  }
}

grid.addEventListener('click', (e) => {
  if (!e.target.classList.contains('day')) return;
  const d = parseInt(e.target.dataset.day);
  selectedDate = new Date(current.getFullYear(), current.getMonth(), d);
  input.value = (selectedDate.getMonth()+1) + '/' + d + '/' + selectedDate.getFullYear();
  document.getElementById('selected').textContent = 'Selected: ' + input.value;
  cal.style.display = 'none';
});

render();`,
    },
  },
  {
    id: 'ng-dynamic-forms',
    title: 'Dynamic Form Generation',
    category: 'forms-input',
    difficulty: 'advanced',
    description:
      'Generate forms dynamically from JSON schema or configuration objects. Build reusable form components that adapt to different field types and validation rules.',
    concepts: ['dynamic forms', 'FormArray', 'component factory', 'metadata'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Dynamic Form Generator</h3>
  <div class="schema-bar">
    <button class="add-btn" data-type="text">+ Text</button>
    <button class="add-btn" data-type="email">+ Email</button>
    <button class="add-btn" data-type="select">+ Select</button>
    <button class="add-btn" data-type="checkbox">+ Checkbox</button>
  </div>
  <form id="dynamic-form"></form>
  <button id="submit-btn" style="display:none">Submit Form</button>
  <pre id="output" class="output" style="display:none"></pre>
</div>`,
      css: `.schema-bar {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.add-btn {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #94a3b8;
  font-size: 12px;
  cursor: pointer;
}

.add-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.field {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  background: #1e293b;
  padding: 10px;
  border-radius: 8px;
}

.field input, .field select {
  flex: 1;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #0f172a;
  color: #e2e8f0;
  outline: none;
  font-size: 13px;
}

.field input:focus, .field select:focus {
  border-color: #ef4444;
}

.field .label {
  font-size: 12px;
  color: #64748b;
  min-width: 60px;
}

.field .remove {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 16px;
  padding: 0 4px;
}

#submit-btn {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #ef4444;
  color: white;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
}

.output {
  margin-top: 12px;
  padding: 12px;
  background: #1e293b;
  border-radius: 8px;
  color: #22c55e;
  font-size: 12px;
  white-space: pre-wrap;
}`,
      js: `// Simulating Angular dynamic form generation from schema
const form = document.getElementById('dynamic-form');
const submitBtn = document.getElementById('submit-btn');
let fieldId = 0;

document.querySelector('.schema-bar').addEventListener('click', (e) => {
  const type = e.target.dataset.type;
  if (!type) return;
  addField(type);
});

function addField(type) {
  fieldId++;
  const div = document.createElement('div');
  div.className = 'field';
  div.dataset.id = fieldId;
  const name = type + '_' + fieldId;
  let inputHtml = '';
  if (type === 'select') {
    inputHtml = '<select name="' + name + '"><option value="">Choose...</option><option value="A">Option A</option><option value="B">Option B</option><option value="C">Option C</option></select>';
  } else if (type === 'checkbox') {
    inputHtml = '<label style="color:#e2e8f0;font-size:13px"><input type="checkbox" name="' + name + '" /> Enabled</label>';
  } else {
    inputHtml = '<input type="' + type + '" name="' + name + '" placeholder="Enter ' + type + '..." />';
  }
  div.innerHTML = '<span class="label">' + type + '</span>' + inputHtml + '<button class="remove">&times;</button>';
  form.appendChild(div);
  submitBtn.style.display = 'block';
  div.querySelector('.remove').addEventListener('click', () => {
    div.remove();
    if (!form.children.length) submitBtn.style.display = 'none';
  });
}

submitBtn.addEventListener('click', () => {
  const data = {};
  form.querySelectorAll('input, select').forEach(el => {
    if (el.type === 'checkbox') data[el.name] = el.checked;
    else data[el.name] = el.value;
  });
  const out = document.getElementById('output');
  out.style.display = 'block';
  out.textContent = JSON.stringify(data, null, 2);
});`,
    },
  },
  {
    id: 'ng-input-mask',
    title: 'Input Masking & Formatting',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Create attribute directives to mask and format inputs (phone numbers, credit cards, currency). Use HostListener for input events and handle cursor position.',
    concepts: ['directives', 'HostListener', 'input masking', 'attribute directives'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Input Masking</h3>
  <div class="form-group">
    <label>Phone Number</label>
    <input id="phone" placeholder="(123) 456-7890" maxlength="14" />
  </div>
  <div class="form-group">
    <label>Credit Card</label>
    <input id="card" placeholder="1234 5678 9012 3456" maxlength="19" />
  </div>
  <div class="form-group">
    <label>Currency (USD)</label>
    <input id="currency" placeholder="$0.00" />
  </div>
  <div id="values" class="values"></div>
</div>`,
      css: `.form-group {
  margin-bottom: 14px;
}

label {
  display: block;
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 4px;
}

input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
  font-size: 15px;
  letter-spacing: 0.5px;
  font-family: monospace;
}

input:focus {
  border-color: #ef4444;
}

.values {
  margin-top: 16px;
  padding: 12px;
  background: #1e293b;
  border-radius: 8px;
  font-size: 12px;
  color: #64748b;
  font-family: monospace;
}`,
      js: `// Simulating Angular input mask directives via HostListener
const phone = document.getElementById('phone');
const card = document.getElementById('card');
const currency = document.getElementById('currency');
const vals = document.getElementById('values');

function digits(v) { return v.replace(/\\D/g, ''); }

phone.addEventListener('input', () => {
  const d = digits(phone.value).slice(0, 10);
  let f = '';
  if (d.length > 0) f = '(' + d.slice(0, 3);
  if (d.length >= 3) f += ') ' + d.slice(3, 6);
  if (d.length >= 6) f += '-' + d.slice(6);
  phone.value = f;
  updateValues();
});

card.addEventListener('input', () => {
  const d = digits(card.value).slice(0, 16);
  card.value = d.match(/.{1,4}/g)?.join(' ') || '';
  updateValues();
});

currency.addEventListener('input', () => {
  const d = digits(currency.value);
  if (!d) { currency.value = ''; updateValues(); return; }
  const num = parseInt(d, 10) / 100;
  currency.value = '$' + num.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
  updateValues();
});

function updateValues() {
  vals.innerHTML = 'Raw values:<br>Phone: ' + digits(phone.value) + '<br>Card: ' + digits(card.value) + '<br>Currency: ' + digits(currency.value);
}`,
    },
  },
  {
    id: 'ng-select-dropdown',
    title: 'Custom Select Dropdown',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Build a custom select component with ng-content projection and ControlValueAccessor interface. Support keyboard navigation, search filtering, and multi-select.',
    concepts: ['ControlValueAccessor', 'ng-content', 'custom form controls', 'accessibility'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Custom Select Dropdown</h3>
  <div class="select-wrap" id="select-wrap">
    <div class="select-trigger" id="trigger">
      <span id="selected-text">Choose a framework...</span>
      <span class="arrow">&#9662;</span>
    </div>
    <div class="dropdown" id="dropdown" style="display:none">
      <input id="filter" class="filter" placeholder="Search..." />
      <ul id="options"></ul>
    </div>
  </div>
  <div id="value-display" class="value-display"></div>
</div>`,
      css: `.select-wrap {
  position: relative;
}

.select-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  cursor: pointer;
  font-size: 14px;
}

.select-trigger:hover {
  border-color: #ef4444;
}

.arrow {
  color: #64748b;
  font-size: 12px;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
  z-index: 10;
}

.filter {
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-bottom: 1px solid #334155;
  background: #0f172a;
  color: #e2e8f0;
  outline: none;
  font-size: 13px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 160px;
  overflow-y: auto;
}

ul li {
  padding: 9px 12px;
  color: #94a3b8;
  cursor: pointer;
  font-size: 13px;
}

ul li:hover, ul li.active {
  background: #334155;
  color: #e2e8f0;
}

ul li.selected {
  color: #ef4444;
  font-weight: 600;
}

.value-display {
  margin-top: 14px;
  font-size: 13px;
  color: #64748b;
  text-align: center;
}`,
      js: `// Simulating Angular custom select with ControlValueAccessor
const items = ['Angular','React','Vue','Svelte','Solid','Ember','Next.js','Nuxt','Remix','Astro'];
const trigger = document.getElementById('trigger');
const dropdown = document.getElementById('dropdown');
const optionsList = document.getElementById('options');
const filter = document.getElementById('filter');
const selText = document.getElementById('selected-text');
let selectedVal = '';
let activeIdx = -1;

function renderOptions(query) {
  const filtered = items.filter(i => i.toLowerCase().includes((query || '').toLowerCase()));
  optionsList.innerHTML = filtered.map((item, i) =>
    '<li data-value="' + item + '" class="' + (item === selectedVal ? 'selected' : '') + (i === activeIdx ? ' active' : '') + '">' + item + '</li>'
  ).join('') || '<li style="color:#64748b">No matches</li>';
}

function open() { dropdown.style.display = 'block'; filter.value = ''; activeIdx = -1; renderOptions(''); filter.focus(); }
function close() { dropdown.style.display = 'none'; }

trigger.addEventListener('click', () => dropdown.style.display === 'none' ? open() : close());
filter.addEventListener('input', () => { activeIdx = -1; renderOptions(filter.value); });

optionsList.addEventListener('click', (e) => {
  if (e.target.dataset.value) {
    selectedVal = e.target.dataset.value;
    selText.textContent = selectedVal;
    document.getElementById('value-display').textContent = 'Value: ' + selectedVal;
    close();
  }
});

document.addEventListener('keydown', (e) => {
  if (dropdown.style.display === 'none') return;
  const lis = optionsList.querySelectorAll('li[data-value]');
  if (e.key === 'ArrowDown') { activeIdx = Math.min(activeIdx + 1, lis.length - 1); }
  else if (e.key === 'ArrowUp') { activeIdx = Math.max(activeIdx - 1, 0); }
  else if (e.key === 'Enter' && lis[activeIdx]) { lis[activeIdx].click(); }
  else if (e.key === 'Escape') { close(); }
  lis.forEach((li, i) => li.classList.toggle('active', i === activeIdx));
});

document.addEventListener('click', (e) => { if (!document.getElementById('select-wrap').contains(e.target)) close(); });`,
    },
  },
  {
    id: 'ng-inline-edit',
    title: 'Inline Editing',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Create inline editable fields that switch between view and edit modes. Implement ControlValueAccessor for seamless integration with reactive forms.',
    concepts: ['ControlValueAccessor', 'view/edit toggle', 'reactive forms', 'directives'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Inline Editing</h3>
  <table>
    <thead>
      <tr><th>Name</th><th>Role</th><th>Email</th></tr>
    </thead>
    <tbody id="table-body"></tbody>
  </table>
  <p class="hint">Click any cell to edit. Press Enter to save, Escape to cancel.</p>
</div>`,
      css: `table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 10px;
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #334155;
}

td {
  padding: 10px;
  font-size: 13px;
  color: #e2e8f0;
  border-bottom: 1px solid #1e293b;
  cursor: pointer;
}

td:hover {
  background: rgba(239,68,68,0.05);
}

td.editing {
  padding: 4px;
}

td input {
  width: 100%;
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #ef4444;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
  font-size: 13px;
}

.hint {
  margin-top: 14px;
  font-size: 11px;
  color: #64748b;
  text-align: center;
  font-style: italic;
}`,
      js: `// Simulating Angular inline editing with ControlValueAccessor
const data = [
  { name: 'Alice Johnson', role: 'Developer', email: 'alice@example.com' },
  { name: 'Bob Smith', role: 'Designer', email: 'bob@example.com' },
  { name: 'Carol White', role: 'Manager', email: 'carol@example.com' },
];
const tbody = document.getElementById('table-body');

function render() {
  tbody.innerHTML = data.map((row, i) =>
    '<tr>' + ['name','role','email'].map(col =>
      '<td data-row="' + i + '" data-col="' + col + '">' + row[col] + '</td>'
    ).join('') + '</tr>'
  ).join('');
}

tbody.addEventListener('click', (e) => {
  const td = e.target.closest('td');
  if (!td || td.classList.contains('editing')) return;
  const row = parseInt(td.dataset.row);
  const col = td.dataset.col;
  const original = data[row][col];
  td.classList.add('editing');
  td.innerHTML = '<input value="' + original + '" />';
  const input = td.querySelector('input');
  input.focus();
  input.select();
  function save() {
    data[row][col] = input.value || original;
    render();
  }
  function cancel() {
    data[row][col] = original;
    render();
  }
  input.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') save();
    if (ev.key === 'Escape') cancel();
  });
  input.addEventListener('blur', save);
});

render();`,
    },
  },

  // Interactive Elements
  {
    id: 'ng-modal-dialog',
    title: 'Modal Dialogs with CDK Overlay',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Create modal dialogs using Angular CDK Overlay service. Handle backdrop clicks, keyboard events (ESC), and pass data between parent and dialog components.',
    concepts: ['Angular CDK', 'Overlay', 'component injection', 'portal'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Modal Dialog</h3>
  <button id="open-btn" class="open-btn">Open Modal</button>
  <div id="backdrop" class="backdrop" style="display:none">
    <div class="modal">
      <div class="modal-header">
        <span class="modal-title">Confirm Action</span>
        <button id="close-x" class="close-x">&times;</button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to proceed? This action cannot be undone.</p>
      </div>
      <div class="modal-footer">
        <button id="cancel-btn" class="btn-secondary">Cancel</button>
        <button id="confirm-btn" class="btn-primary">Confirm</button>
      </div>
    </div>
  </div>
  <div id="status" class="status"></div>
</div>`,
      css: `.open-btn {
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  background: #ef4444;
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: block;
  margin: 20px auto;
}

.open-btn:hover {
  background: #dc2626;
}

.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  background: #1e293b;
  border-radius: 12px;
  width: 90%;
  max-width: 380px;
  border: 1px solid #334155;
  animation: fadeIn 0.2s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #334155;
}

.modal-title {
  font-weight: 600;
  color: #e2e8f0;
  font-size: 16px;
}

.close-x {
  background: none;
  border: none;
  color: #64748b;
  font-size: 20px;
  cursor: pointer;
}

.modal-body {
  padding: 16px;
  color: #94a3b8;
  font-size: 14px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid #334155;
}

.btn-secondary {
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
}

.btn-primary {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background: #ef4444;
  color: white;
  cursor: pointer;
}

.status {
  text-align: center;
  margin-top: 16px;
  font-size: 13px;
  color: #94a3b8;
}`,
      js: `// Simulating Angular CDK Overlay modal dialog
const backdrop = document.getElementById('backdrop');
const status = document.getElementById('status');

function openModal() { backdrop.style.display = 'flex'; }
function closeModal(msg) {
  backdrop.style.display = 'none';
  if (msg) { status.textContent = msg; }
}

document.getElementById('open-btn').addEventListener('click', openModal);
document.getElementById('close-x').addEventListener('click', () => closeModal('Modal dismissed'));
document.getElementById('cancel-btn').addEventListener('click', () => closeModal('Cancelled'));
document.getElementById('confirm-btn').addEventListener('click', () => closeModal('Confirmed!'));

backdrop.addEventListener('click', (e) => {
  if (e.target === backdrop) closeModal('Dismissed (backdrop click)');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && backdrop.style.display === 'flex') closeModal('Dismissed (ESC)');
});`,
    },
  },
  {
    id: 'ng-drag-drop',
    title: 'Drag and Drop',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Implement drag-and-drop functionality using Angular CDK DragDrop module. Support item reordering, transferring between lists, and custom drag previews.',
    concepts: ['Angular CDK', 'DragDrop', 'CdkDrag', 'CdkDrop'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Drag and Drop</h3>
  <div class="columns">
    <div class="column">
      <div class="col-header">To Do</div>
      <div class="drop-zone" id="todo"></div>
    </div>
    <div class="column">
      <div class="col-header">In Progress</div>
      <div class="drop-zone" id="progress"></div>
    </div>
    <div class="column">
      <div class="col-header">Done</div>
      <div class="drop-zone" id="done"></div>
    </div>
  </div>
</div>`,
      css: `.columns {
  display: flex;
  gap: 10px;
}

.column {
  flex: 1;
  min-width: 0;
}

.col-header {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  padding: 0 4px;
}

.drop-zone {
  min-height: 120px;
  background: #1e293b;
  border-radius: 10px;
  padding: 8px;
  border: 2px dashed transparent;
  transition: border-color 0.2s;
}

.drop-zone.over {
  border-color: #ef4444;
}

.card {
  padding: 10px;
  background: #0f172a;
  border-radius: 8px;
  margin-bottom: 6px;
  cursor: grab;
  font-size: 13px;
  color: #e2e8f0;
  border-left: 3px solid #ef4444;
  user-select: none;
}

.card:active {
  cursor: grabbing;
  opacity: 0.7;
}

.card .tag {
  display: inline-block;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(239,68,68,0.15);
  color: #ef4444;
  margin-top: 4px;
}`,
      js: `// Simulating Angular CDK DragDrop
const tasks = [
  { text: 'Setup project', tag: 'config', col: 'todo' },
  { text: 'Design UI', tag: 'design', col: 'todo' },
  { text: 'Write API', tag: 'backend', col: 'todo' },
  { text: 'Auth module', tag: 'feature', col: 'progress' },
  { text: 'Unit tests', tag: 'testing', col: 'done' },
];

function render() {
  ['todo','progress','done'].forEach(col => {
    const zone = document.getElementById(col);
    zone.innerHTML = '';
    tasks.filter(t => t.col === col).forEach((t, i) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.draggable = true;
      card.dataset.idx = tasks.indexOf(t);
      card.innerHTML = t.text + '<div class="tag">' + t.tag + '</div>';
      zone.appendChild(card);
    });
  });
}

let dragIdx = null;

document.addEventListener('dragstart', (e) => {
  if (!e.target.classList.contains('card')) return;
  dragIdx = parseInt(e.target.dataset.idx);
  e.target.style.opacity = '0.4';
});

document.addEventListener('dragend', (e) => {
  e.target.style.opacity = '1';
  document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('over'));
});

document.querySelectorAll('.drop-zone').forEach(zone => {
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('over'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('over');
    if (dragIdx !== null) {
      tasks[dragIdx].col = zone.id;
      render();
    }
  });
});

render();`,
    },
  },
  {
    id: 'ng-data-table',
    title: 'Data Table with Sorting & Pagination',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Build data tables using Angular Material table with MatSort and MatPaginator. Handle large datasets efficiently with server-side pagination and sorting.',
    concepts: ['MatTable', 'MatSort', 'MatPaginator', 'data sources'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Data Table</h3>
  <table>
    <thead>
      <tr>
        <th class="sortable" data-col="name">Name <span id="sort-name"></span></th>
        <th class="sortable" data-col="age">Age <span id="sort-age"></span></th>
        <th class="sortable" data-col="city">City <span id="sort-city"></span></th>
      </tr>
    </thead>
    <tbody id="tbody"></tbody>
  </table>
  <div class="pagination">
    <button id="prev-btn" disabled>&lt; Prev</button>
    <span id="page-info"></span>
    <button id="next-btn">Next &gt;</button>
  </div>
</div>`,
      css: `table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 10px;
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #334155;
}

th.sortable {
  cursor: pointer;
  user-select: none;
}

th.sortable:hover {
  color: #ef4444;
}

td {
  padding: 10px;
  font-size: 13px;
  color: #e2e8f0;
  border-bottom: 1px solid #1e293b;
}

tr:hover td {
  background: rgba(239,68,68,0.04);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
}

.pagination button {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #94a3b8;
  cursor: pointer;
  font-size: 12px;
}

.pagination button:disabled {
  opacity: 0.4;
  cursor: default;
}

.pagination button:not(:disabled):hover {
  border-color: #ef4444;
  color: #ef4444;
}

#page-info {
  font-size: 12px;
  color: #64748b;
}`,
      js: `// Simulating Angular MatTable with MatSort and MatPaginator
const data = [
  {name:'Alice',age:28,city:'NYC'},{name:'Bob',age:35,city:'LA'},
  {name:'Carol',age:22,city:'Chicago'},{name:'Dave',age:41,city:'NYC'},
  {name:'Eve',age:30,city:'Boston'},{name:'Frank',age:27,city:'LA'},
  {name:'Grace',age:33,city:'Seattle'},{name:'Hank',age:45,city:'Denver'},
  {name:'Ivy',age:26,city:'Miami'},{name:'Jack',age:38,city:'Portland'},
  {name:'Kate',age:29,city:'Austin'},{name:'Leo',age:31,city:'Chicago'},
];
const pageSize = 4;
let page = 0;
let sortCol = null;
let sortDir = 'asc';

function sorted() {
  if (!sortCol) return [...data];
  return [...data].sort((a, b) => {
    const va = a[sortCol], vb = b[sortCol];
    const cmp = typeof va === 'number' ? va - vb : va.localeCompare(vb);
    return sortDir === 'asc' ? cmp : -cmp;
  });
}

function render() {
  const d = sorted();
  const start = page * pageSize;
  const rows = d.slice(start, start + pageSize);
  document.getElementById('tbody').innerHTML = rows.map(r =>
    '<tr><td>' + r.name + '</td><td>' + r.age + '</td><td>' + r.city + '</td></tr>'
  ).join('');
  document.getElementById('page-info').textContent = 'Page ' + (page + 1) + ' of ' + Math.ceil(d.length / pageSize);
  document.getElementById('prev-btn').disabled = page === 0;
  document.getElementById('next-btn').disabled = start + pageSize >= d.length;
  ['name','age','city'].forEach(c => {
    document.getElementById('sort-' + c).textContent = sortCol === c ? (sortDir === 'asc' ? '\\u25B2' : '\\u25BC') : '';
  });
}

document.querySelectorAll('th.sortable').forEach(th => {
  th.addEventListener('click', () => {
    const col = th.dataset.col;
    if (sortCol === col) sortDir = sortDir === 'asc' ? 'desc' : 'asc';
    else { sortCol = col; sortDir = 'asc'; }
    page = 0;
    render();
  });
});

document.getElementById('prev-btn').addEventListener('click', () => { page--; render(); });
document.getElementById('next-btn').addEventListener('click', () => { page++; render(); });
render();`,
    },
  },
  {
    id: 'ng-tabs',
    title: 'Tab Navigation with Lazy Loading',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Create tab interfaces with lazy-loaded tab content. Use Angular router for URL-based tab state or manage tab state within the component.',
    concepts: ['tabs', 'lazy loading', 'ngComponentOutlet', 'router'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Tab Navigation</h3>
  <div class="tab-bar" id="tab-bar">
    <button class="tab active" data-tab="overview">Overview</button>
    <button class="tab" data-tab="features">Features</button>
    <button class="tab" data-tab="pricing">Pricing</button>
  </div>
  <div class="tab-content" id="tab-content">
    <div class="loading" id="loading" style="display:none">Loading...</div>
    <div id="panel"></div>
  </div>
</div>`,
      css: `.tab-bar {
  display: flex;
  border-bottom: 2px solid #1e293b;
  gap: 2px;
}

.tab {
  padding: 10px 18px;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s;
}

.tab:hover {
  color: #e2e8f0;
}

.tab.active {
  color: #ef4444;
  border-bottom-color: #ef4444;
}

.tab-content {
  padding: 16px 4px;
  min-height: 100px;
}

.loading {
  text-align: center;
  color: #64748b;
  font-size: 13px;
  padding: 20px;
}

.panel-title {
  font-size: 15px;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 8px;
}

.panel-text {
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.6;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  padding: 8px 0;
  border-bottom: 1px solid #1e293b;
  font-size: 13px;
  color: #94a3b8;
}

.feature-list li::before {
  content: '\\2713 ';
  color: #ef4444;
  margin-right: 6px;
}

.price-card {
  background: #1e293b;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  border: 1px solid #334155;
}

.price-card .amount {
  font-size: 28px;
  font-weight: 700;
  color: #ef4444;
}

.price-card .period {
  color: #64748b;
  font-size: 12px;
}`,
      js: `// Simulating Angular tab navigation with lazy loading
const panels = {
  overview: '<div class="panel-title">Project Overview</div><p class="panel-text">This is a comprehensive project management tool built with Angular. It provides real-time collaboration, task tracking, and team analytics.</p>',
  features: '<ul class="feature-list"><li>Real-time collaboration</li><li>Drag & drop Kanban board</li><li>Team analytics dashboard</li><li>Custom workflows</li><li>API integrations</li></ul>',
  pricing: '<div class="price-card"><div class="amount">$29</div><div class="period">/month per user</div><p class="panel-text" style="margin-top:12px">Includes all features, unlimited projects, and priority support.</p></div>'
};

const tabBar = document.getElementById('tab-bar');
const panel = document.getElementById('panel');
const loading = document.getElementById('loading');

function switchTab(tabId) {
  tabBar.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
  panel.innerHTML = '';
  loading.style.display = 'block';
  // Simulate lazy loading delay
  setTimeout(() => {
    loading.style.display = 'none';
    panel.innerHTML = panels[tabId];
  }, 300);
}

tabBar.addEventListener('click', (e) => {
  if (e.target.classList.contains('tab')) switchTab(e.target.dataset.tab);
});

switchTab('overview');`,
    },
  },
  {
    id: 'ng-accordion',
    title: 'Accordion Panels',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Build accordion components with smooth animations using Angular animations API. Support single or multi-panel expansion and keyboard navigation.',
    concepts: ['animations', 'trigger', 'state', 'transition'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Accordion Panels</h3>
  <div id="accordion" class="accordion">
    <div class="panel">
      <button class="panel-header" data-idx="0">What is Angular? <span class="icon">+</span></button>
      <div class="panel-body">Angular is a platform and framework for building single-page client applications using HTML and TypeScript. It provides a complete solution with routing, forms, HTTP client, and testing utilities.</div>
    </div>
    <div class="panel">
      <button class="panel-header" data-idx="1">What are Angular animations? <span class="icon">+</span></button>
      <div class="panel-body">Angular animations are built on the Web Animations API and use triggers, states, and transitions to create smooth motion. You define animation metadata in the component decorator using the @angular/animations package.</div>
    </div>
    <div class="panel">
      <button class="panel-header" data-idx="2">How does dependency injection work? <span class="icon">+</span></button>
      <div class="panel-body">Angular has a hierarchical dependency injection system. Services are registered with providers and injected into components via constructor parameters. The injector resolves dependencies and manages singleton instances.</div>
    </div>
  </div>
</div>`,
      css: `.accordion {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.panel {
  border-radius: 8px;
  overflow: hidden;
  background: #1e293b;
}

.panel-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border: none;
  background: #1e293b;
  color: #e2e8f0;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
}

.panel-header:hover {
  background: #334155;
}

.icon {
  font-size: 18px;
  color: #ef4444;
  transition: transform 0.3s;
}

.panel-header.open .icon {
  transform: rotate(45deg);
}

.panel-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  padding: 0 16px;
  color: #94a3b8;
  font-size: 13px;
  line-height: 1.6;
}

.panel-body.open {
  max-height: 200px;
  padding: 0 16px 14px;
}`,
      js: `// Simulating Angular animations API accordion
const accordion = document.getElementById('accordion');
let openIdx = -1;

accordion.addEventListener('click', (e) => {
  const header = e.target.closest('.panel-header');
  if (!header) return;
  const idx = parseInt(header.dataset.idx);
  const wasOpen = openIdx === idx;
  // Close all
  accordion.querySelectorAll('.panel-header').forEach(h => h.classList.remove('open'));
  accordion.querySelectorAll('.panel-body').forEach(b => b.classList.remove('open'));
  if (!wasOpen) {
    header.classList.add('open');
    header.nextElementSibling.classList.add('open');
    openIdx = idx;
  } else {
    openIdx = -1;
  }
});`,
    },
  },
  {
    id: 'ng-stepper',
    title: 'Multi-Step Wizard',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Create multi-step forms with MatStepper. Implement per-step validation, navigation guards, and save/resume functionality with local storage.',
    concepts: ['MatStepper', 'form validation', 'guards', 'state persistence'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Multi-Step Wizard</h3>
  <div class="stepper">
    <div class="steps" id="steps">
      <div class="step active" data-step="0"><span class="num">1</span> Account</div>
      <div class="step" data-step="1"><span class="num">2</span> Profile</div>
      <div class="step" data-step="2"><span class="num">3</span> Review</div>
    </div>
    <div class="step-content" id="step-content"></div>
    <div class="step-actions">
      <button id="prev-step" style="display:none">Back</button>
      <button id="next-step">Next</button>
    </div>
  </div>
</div>`,
      css: `.stepper {
  background: #1e293b;
  border-radius: 12px;
  padding: 16px;
}

.steps {
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
}

.step {
  flex: 1;
  text-align: center;
  padding: 10px 6px;
  font-size: 12px;
  color: #64748b;
  border-bottom: 2px solid #334155;
}

.step.active {
  color: #ef4444;
  border-bottom-color: #ef4444;
}

.step.done {
  color: #22c55e;
  border-bottom-color: #22c55e;
}

.num {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  background: #334155;
  font-size: 11px;
  margin-right: 4px;
}

.step.active .num {
  background: #ef4444;
  color: white;
}

.step.done .num {
  background: #22c55e;
  color: white;
}

.step-content {
  min-height: 100px;
  padding: 8px 0;
}

.step-content label {
  display: block;
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 4px;
  margin-top: 10px;
}

.step-content input {
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #0f172a;
  color: #e2e8f0;
  outline: none;
  font-size: 13px;
}

.step-content input:focus {
  border-color: #ef4444;
}

.step-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}

.step-actions button {
  padding: 8px 20px;
  border-radius: 6px;
  border: none;
  background: #ef4444;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
}

.step-actions button:first-child {
  background: #334155;
}

.review-item {
  padding: 6px 0;
  font-size: 13px;
  color: #94a3b8;
  border-bottom: 1px solid #0f172a;
}

.review-item strong {
  color: #e2e8f0;
}`,
      js: `// Simulating Angular MatStepper wizard
const formData = { email: '', password: '', name: '', bio: '' };
const content = document.getElementById('step-content');
const stepsEl = document.getElementById('steps');
let current = 0;

const stepTemplates = [
  () => '<label>Email</label><input id="f-email" placeholder="you@example.com" value="' + formData.email + '" /><label>Password</label><input id="f-password" type="password" placeholder="Password" value="' + formData.password + '" />',
  () => '<label>Full Name</label><input id="f-name" placeholder="Your name" value="' + formData.name + '" /><label>Bio</label><input id="f-bio" placeholder="Short bio" value="' + formData.bio + '" />',
  () => '<div class="review-item"><strong>Email:</strong> ' + (formData.email || '(empty)') + '</div><div class="review-item"><strong>Name:</strong> ' + (formData.name || '(empty)') + '</div><div class="review-item"><strong>Bio:</strong> ' + (formData.bio || '(empty)') + '</div>'
];

function saveStep() {
  if (current === 0) {
    const e = document.getElementById('f-email'); if (e) formData.email = e.value;
    const p = document.getElementById('f-password'); if (p) formData.password = p.value;
  } else if (current === 1) {
    const n = document.getElementById('f-name'); if (n) formData.name = n.value;
    const b = document.getElementById('f-bio'); if (b) formData.bio = b.value;
  }
}

function render() {
  content.innerHTML = stepTemplates[current]();
  stepsEl.querySelectorAll('.step').forEach((s, i) => {
    s.className = 'step' + (i === current ? ' active' : '') + (i < current ? ' done' : '');
  });
  document.getElementById('prev-step').style.display = current > 0 ? 'block' : 'none';
  document.getElementById('next-step').textContent = current === 2 ? 'Finish' : 'Next';
}

document.getElementById('next-step').addEventListener('click', () => {
  saveStep();
  if (current < 2) { current++; render(); }
  else { content.innerHTML = '<div style="text-align:center;color:#22c55e;padding:20px">Registration complete!</div>'; }
});

document.getElementById('prev-step').addEventListener('click', () => {
  saveStep();
  if (current > 0) { current--; render(); }
});

render();`,
    },
  },
  {
    id: 'ng-carousel',
    title: 'Content Carousel',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Build a touch-enabled carousel with auto-play, indicators, and navigation controls. Use Angular animations and handle swipe gestures for mobile support.',
    concepts: ['animations', 'touch events', 'carousel', 'interval'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Content Carousel</h3>
  <div class="carousel">
    <button class="nav-btn prev" id="prev-btn">&lt;</button>
    <div class="carousel-viewport" id="viewport">
      <div class="carousel-track" id="track"></div>
    </div>
    <button class="nav-btn next" id="next-btn">&gt;</button>
  </div>
  <div class="indicators" id="indicators"></div>
  <div class="controls">
    <button id="play-btn" class="play-btn">Pause</button>
  </div>
</div>`,
      css: `.carousel {
  display: flex;
  align-items: center;
  gap: 6px;
}

.carousel-viewport {
  flex: 1;
  overflow: hidden;
  border-radius: 10px;
}

.carousel-track {
  display: flex;
  transition: transform 0.4s ease;
}

.slide {
  min-width: 100%;
  padding: 32px 20px;
  text-align: center;
  border-radius: 10px;
}

.slide h4 {
  font-size: 18px;
  color: #e2e8f0;
  margin: 0 0 8px 0;
}

.slide p {
  font-size: 13px;
  color: #94a3b8;
  margin: 0;
}

.nav-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  cursor: pointer;
  font-size: 14px;
}

.nav-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.indicators {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 10px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #334155;
  cursor: pointer;
}

.dot.active {
  background: #ef4444;
}

.controls {
  text-align: center;
  margin-top: 10px;
}

.play-btn {
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #94a3b8;
  cursor: pointer;
  font-size: 12px;
}`,
      js: `// Simulating Angular carousel with animations and auto-play
const slides = [
  { title: 'Angular Components', desc: 'Build reusable UI building blocks', bg: '#1e293b' },
  { title: 'RxJS Observables', desc: 'Handle async data streams elegantly', bg: '#172135' },
  { title: 'Dependency Injection', desc: 'Manage services with a hierarchical DI system', bg: '#1a2332' },
  { title: 'Angular CLI', desc: 'Scaffold, build, and deploy with ease', bg: '#1e293b' },
];

const track = document.getElementById('track');
const indicators = document.getElementById('indicators');
let current = 0;
let playing = true;
let timer;

track.innerHTML = slides.map(s => '<div class="slide" style="background:' + s.bg + '"><h4>' + s.title + '</h4><p>' + s.desc + '</p></div>').join('');
indicators.innerHTML = slides.map((_, i) => '<div class="dot' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '"></div>').join('');

function goTo(idx) {
  current = (idx + slides.length) % slides.length;
  track.style.transform = 'translateX(-' + (current * 100) + '%)';
  indicators.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
}

document.getElementById('prev-btn').addEventListener('click', () => goTo(current - 1));
document.getElementById('next-btn').addEventListener('click', () => goTo(current + 1));
indicators.addEventListener('click', (e) => { if (e.target.dataset.idx !== undefined) goTo(parseInt(e.target.dataset.idx)); });

function autoPlay() { timer = setInterval(() => goTo(current + 1), 3000); }
autoPlay();

document.getElementById('play-btn').addEventListener('click', (e) => {
  playing = !playing;
  e.target.textContent = playing ? 'Pause' : 'Play';
  if (playing) autoPlay(); else clearInterval(timer);
});`,
    },
  },
  {
    id: 'ng-virtual-scroll',
    title: 'Virtual Scrolling',
    category: 'interactive',
    difficulty: 'advanced',
    description:
      'Implement virtual scrolling for large lists using CDK ScrollingModule. Optimize rendering performance by only displaying visible items in viewport.',
    concepts: ['Angular CDK', 'ScrollingModule', 'CdkVirtualScrollViewport', 'performance'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Virtual Scrolling</h3>
  <div class="info">
    <span id="count">10,000 items</span>
    <span id="rendered">Rendered: 0</span>
  </div>
  <div class="viewport" id="viewport">
    <div class="scroll-content" id="scroll-content"></div>
  </div>
</div>`,
      css: `.info {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #64748b;
  margin-bottom: 8px;
  padding: 0 4px;
}

.viewport {
  height: 260px;
  overflow-y: auto;
  border-radius: 10px;
  background: #1e293b;
  border: 1px solid #334155;
}

.scroll-content {
  position: relative;
}

.row {
  position: absolute;
  left: 0;
  right: 0;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  font-size: 13px;
  color: #e2e8f0;
  border-bottom: 1px solid #0f172a;
}

.row:hover {
  background: rgba(239,68,68,0.05);
}

.row .idx {
  color: #ef4444;
  font-weight: 600;
  min-width: 50px;
  font-size: 11px;
}

.row .text {
  color: #94a3b8;
}`,
      js: `// Simulating Angular CDK Virtual Scrolling
const TOTAL = 10000;
const ROW_HEIGHT = 40;
const viewport = document.getElementById('viewport');
const scrollContent = document.getElementById('scroll-content');
const renderedEl = document.getElementById('rendered');

scrollContent.style.height = TOTAL * ROW_HEIGHT + 'px';

function getLabel(i) {
  const names = ['Component','Service','Module','Directive','Pipe','Guard','Resolver','Interceptor'];
  return names[i % names.length] + ' #' + (i + 1);
}

function renderVisible() {
  const scrollTop = viewport.scrollTop;
  const viewHeight = viewport.clientHeight;
  const startIdx = Math.floor(scrollTop / ROW_HEIGHT);
  const endIdx = Math.min(startIdx + Math.ceil(viewHeight / ROW_HEIGHT) + 2, TOTAL);
  let html = '';
  for (let i = startIdx; i < endIdx; i++) {
    html += '<div class="row" style="top:' + (i * ROW_HEIGHT) + 'px"><span class="idx">#' + (i + 1) + '</span><span class="text">' + getLabel(i) + '</span></div>';
  }
  scrollContent.innerHTML = html;
  renderedEl.textContent = 'Rendered: ' + (endIdx - startIdx) + ' of ' + TOTAL.toLocaleString();
}

viewport.addEventListener('scroll', renderVisible);
renderVisible();`,
    },
  },
  {
    id: 'ng-context-menu',
    title: 'Context Menu',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Create right-click context menus using CDK Overlay and OverlayPositionBuilder. Handle click-outside to close and position menus relative to trigger element.',
    concepts: ['Angular CDK', 'Overlay', 'contextmenu event', 'positioning'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Context Menu</h3>
  <div class="items" id="items">
    <div class="item" data-id="1">Document A.pdf</div>
    <div class="item" data-id="2">Photo B.jpg</div>
    <div class="item" data-id="3">Notes C.txt</div>
    <div class="item" data-id="4">Spreadsheet D.xlsx</div>
  </div>
  <div id="context-menu" class="context-menu" style="display:none">
    <div class="menu-item" data-action="open">Open</div>
    <div class="menu-item" data-action="rename">Rename</div>
    <div class="menu-item" data-action="copy">Copy</div>
    <div class="divider"></div>
    <div class="menu-item danger" data-action="delete">Delete</div>
  </div>
  <div id="log" class="log"></div>
  <p class="hint">Right-click on any item to see the context menu.</p>
</div>`,
      css: `.items {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item {
  padding: 12px 14px;
  background: #1e293b;
  border-radius: 8px;
  color: #e2e8f0;
  font-size: 13px;
  cursor: context-menu;
  user-select: none;
}

.item:hover {
  background: #334155;
}

.context-menu {
  position: fixed;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 4px 0;
  min-width: 140px;
  z-index: 100;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}

.menu-item {
  padding: 8px 14px;
  font-size: 13px;
  color: #e2e8f0;
  cursor: pointer;
}

.menu-item:hover {
  background: #334155;
}

.menu-item.danger {
  color: #ef4444;
}

.divider {
  height: 1px;
  background: #334155;
  margin: 4px 0;
}

.log {
  margin-top: 14px;
  font-size: 12px;
  color: #64748b;
  text-align: center;
  min-height: 20px;
}

.hint {
  margin-top: 10px;
  font-size: 11px;
  color: #64748b;
  text-align: center;
  font-style: italic;
}`,
      js: `// Simulating Angular CDK Overlay context menu
const menu = document.getElementById('context-menu');
const log = document.getElementById('log');
let targetItem = null;

document.getElementById('items').addEventListener('contextmenu', (e) => {
  const item = e.target.closest('.item');
  if (!item) return;
  e.preventDefault();
  targetItem = item.textContent;
  menu.style.display = 'block';
  menu.style.left = Math.min(e.clientX, window.innerWidth - 160) + 'px';
  menu.style.top = Math.min(e.clientY, window.innerHeight - 160) + 'px';
});

menu.addEventListener('click', (e) => {
  const action = e.target.dataset.action;
  if (!action) return;
  log.textContent = action.charAt(0).toUpperCase() + action.slice(1) + ': ' + targetItem;
  menu.style.display = 'none';
});

document.addEventListener('click', () => menu.style.display = 'none');
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') menu.style.display = 'none'; });`,
    },
  },
  {
    id: 'ng-toast-notifications',
    title: 'Toast Notifications',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Build a toast notification service with queue management, auto-dismiss, and animations. Use dependency injection to trigger toasts from any component.',
    concepts: ['services', 'dependency injection', 'animations', 'portal'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Toast Notifications</h3>
  <div class="btn-row">
    <button class="btn success" data-type="success">Success</button>
    <button class="btn error" data-type="error">Error</button>
    <button class="btn warning" data-type="warning">Warning</button>
    <button class="btn info" data-type="info">Info</button>
  </div>
  <div id="toast-container" class="toast-container"></div>
</div>`,
      css: `.btn-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 12px;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
}

.btn.success { background: #22c55e; }
.btn.error { background: #ef4444; }
.btn.warning { background: #f59e0b; }
.btn.info { background: #3b82f6; }

.toast-container {
  position: fixed;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 100;
  max-width: 280px;
}

.toast {
  padding: 12px 16px;
  border-radius: 8px;
  color: white;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: slideIn 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.toast.success { background: #16a34a; }
.toast.error { background: #dc2626; }
.toast.warning { background: #d97706; }
.toast.info { background: #2563eb; }

.toast .close {
  margin-left: auto;
  background: none;
  border: none;
  color: rgba(255,255,255,0.7);
  cursor: pointer;
  font-size: 16px;
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes fadeOut {
  to { opacity: 0; transform: translateX(50%); }
}`,
      js: `// Simulating Angular toast notification service with DI
const container = document.getElementById('toast-container');
const messages = {
  success: 'Operation completed successfully!',
  error: 'Something went wrong. Please try again.',
  warning: 'Please check your input values.',
  info: 'New updates are available.',
};
const icons = { success: '\\u2713', error: '\\u2717', warning: '\\u26A0', info: '\\u2139' };

function showToast(type) {
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.innerHTML = '<span>' + icons[type] + '</span><span>' + messages[type] + '</span><button class="close">&times;</button>';
  container.appendChild(toast);
  toast.querySelector('.close').addEventListener('click', () => removeToast(toast));
  setTimeout(() => removeToast(toast), 3500);
}

function removeToast(toast) {
  if (!toast.parentNode) return;
  toast.style.animation = 'fadeOut 0.3s ease forwards';
  setTimeout(() => toast.remove(), 300);
}

document.querySelector('.btn-row').addEventListener('click', (e) => {
  const type = e.target.dataset.type;
  if (type) showToast(type);
});`,
    },
  },

  // Data Display
  {
    id: 'ng-data-visualization',
    title: 'Data Visualization & Charts',
    category: 'data-display',
    difficulty: 'intermediate',
    description:
      'Integrate charting libraries like ng2-charts or ngx-charts. Display bar, line, pie, and area charts with real-time data updates using RxJS observables.',
    concepts: ['ng2-charts', 'ngx-charts', 'data binding', 'observables'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Data Visualization</h3>
  <div class="chart-tabs">
    <button class="ct active" data-chart="bar">Bar</button>
    <button class="ct" data-chart="line">Line</button>
    <button class="ct" data-chart="pie">Pie</button>
  </div>
  <canvas id="chart" width="360" height="200"></canvas>
  <button id="refresh" class="refresh-btn">Refresh Data</button>
</div>`,
      css: `.chart-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
}

.ct {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: transparent;
  color: #64748b;
  font-size: 12px;
  cursor: pointer;
}

.ct.active {
  background: #ef4444;
  border-color: #ef4444;
  color: white;
}

canvas {
  display: block;
  width: 100%;
  background: #1e293b;
  border-radius: 10px;
}

.refresh-btn {
  display: block;
  margin: 12px auto 0;
  padding: 8px 20px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #94a3b8;
  cursor: pointer;
  font-size: 12px;
}

.refresh-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
}`,
      js: `// Simulating Angular data visualization (bar, line, pie charts)
const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const colors = ['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899'];
let chartType = 'bar';

function randData() { return labels.map(() => Math.floor(Math.random() * 80) + 20); }
let data = randData();

function drawBar() {
  const w = canvas.width, h = canvas.height, pad = 40;
  const barW = (w - pad * 2) / labels.length - 8;
  const maxVal = Math.max(...data);
  data.forEach((v, i) => {
    const x = pad + i * ((w - pad * 2) / labels.length) + 4;
    const bh = (v / maxVal) * (h - pad * 2);
    ctx.fillStyle = colors[i];
    ctx.fillRect(x, h - pad - bh, barW, bh);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(labels[i], x + barW / 2, h - pad + 14);
    ctx.fillText(v, x + barW / 2, h - pad - bh - 6);
  });
}

function drawLine() {
  const w = canvas.width, h = canvas.height, pad = 40;
  const maxVal = Math.max(...data);
  const step = (w - pad * 2) / (data.length - 1);
  ctx.beginPath();
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  data.forEach((v, i) => {
    const x = pad + i * step;
    const y = h - pad - (v / maxVal) * (h - pad * 2);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();
  data.forEach((v, i) => {
    const x = pad + i * step;
    const y = h - pad - (v / maxVal) * (h - pad * 2);
    ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fillStyle = '#ef4444'; ctx.fill();
    ctx.fillStyle = '#94a3b8'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(labels[i], x, h - pad + 14);
  });
}

function drawPie() {
  const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;
  const total = data.reduce((a, b) => a + b, 0);
  let start = -Math.PI / 2;
  data.forEach((v, i) => {
    const angle = (v / total) * Math.PI * 2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, start, start + angle); ctx.fillStyle = colors[i]; ctx.fill();
    const mid = start + angle / 2;
    ctx.fillStyle = '#e2e8f0'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(labels[i], cx + Math.cos(mid) * (r + 16), cy + Math.sin(mid) * (r + 16));
    start += angle;
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (chartType === 'bar') drawBar();
  else if (chartType === 'line') drawLine();
  else drawPie();
}

document.querySelector('.chart-tabs').addEventListener('click', (e) => {
  if (!e.target.dataset.chart) return;
  chartType = e.target.dataset.chart;
  document.querySelectorAll('.ct').forEach(b => b.classList.toggle('active', b.dataset.chart === chartType));
  draw();
});

document.getElementById('refresh').addEventListener('click', () => { data = randData(); draw(); });
draw();`,
    },
  },
  {
    id: 'ng-search-filter',
    title: 'Real-Time Search with Pipes',
    category: 'data-display',
    difficulty: 'intermediate',
    description:
      'Implement client-side search filtering using custom pipes. Handle multiple criteria, debouncing for performance, and highlight matching results.',
    concepts: ['pipes', 'filtering', 'custom pipes', 'PipeTransform'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Real-Time Search</h3>
  <input id="search" placeholder="Type to filter..." />
  <div class="tags">
    <button class="tag active" data-cat="all">All</button>
    <button class="tag" data-cat="framework">Frameworks</button>
    <button class="tag" data-cat="tool">Tools</button>
    <button class="tag" data-cat="language">Languages</button>
  </div>
  <ul id="list" class="list"></ul>
  <div id="count" class="count"></div>
</div>`,
      css: `input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
  font-size: 14px;
  margin-bottom: 10px;
}

input:focus {
  border-color: #ef4444;
}

.tags {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 12px;
  border-radius: 14px;
  border: 1px solid #334155;
  background: transparent;
  color: #64748b;
  font-size: 12px;
  cursor: pointer;
}

.tag.active {
  background: #ef4444;
  border-color: #ef4444;
  color: white;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list li {
  padding: 10px 12px;
  background: #1e293b;
  border-radius: 6px;
  margin-bottom: 4px;
  font-size: 13px;
  color: #e2e8f0;
  display: flex;
  justify-content: space-between;
}

.list li .cat {
  font-size: 11px;
  color: #64748b;
}

.list li mark {
  background: transparent;
  color: #ef4444;
  font-weight: 700;
}

.count {
  margin-top: 10px;
  font-size: 11px;
  color: #64748b;
  text-align: center;
}`,
      js: `// Simulating Angular custom pipe for search filtering
const items = [
  {name:'Angular',cat:'framework'},{name:'React',cat:'framework'},
  {name:'Vue',cat:'framework'},{name:'Svelte',cat:'framework'},
  {name:'TypeScript',cat:'language'},{name:'JavaScript',cat:'language'},
  {name:'Python',cat:'language'},{name:'Rust',cat:'language'},
  {name:'Webpack',cat:'tool'},{name:'Vite',cat:'tool'},
  {name:'ESLint',cat:'tool'},{name:'Prettier',cat:'tool'},
];
const input = document.getElementById('search');
const list = document.getElementById('list');
const countEl = document.getElementById('count');
let activeCat = 'all';

function highlight(text, q) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return text;
  return text.slice(0, i) + '<mark>' + text.slice(i, i + q.length) + '</mark>' + text.slice(i + q.length);
}

function render() {
  const q = input.value.trim();
  const filtered = items.filter(i =>
    (activeCat === 'all' || i.cat === activeCat) &&
    (!q || i.name.toLowerCase().includes(q.toLowerCase()))
  );
  list.innerHTML = filtered.map(i =>
    '<li><span>' + highlight(i.name, q) + '</span><span class="cat">' + i.cat + '</span></li>'
  ).join('') || '<li style="color:#64748b;justify-content:center">No matches</li>';
  countEl.textContent = filtered.length + ' of ' + items.length + ' items';
}

input.addEventListener('input', render);

document.querySelector('.tags').addEventListener('click', (e) => {
  if (!e.target.dataset.cat) return;
  activeCat = e.target.dataset.cat;
  document.querySelectorAll('.tag').forEach(t => t.classList.toggle('active', t.dataset.cat === activeCat));
  render();
});

render();`,
    },
  },
  {
    id: 'ng-infinite-scroll',
    title: 'Infinite Scroll',
    category: 'data-display',
    difficulty: 'intermediate',
    description:
      'Build infinite scroll using Intersection Observer API or scroll event listeners. Load data incrementally as user scrolls and handle loading states.',
    concepts: ['Intersection Observer', 'scroll events', 'observables', 'pagination'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Infinite Scroll</h3>
  <div class="scroll-area" id="scroll-area">
    <div id="items"></div>
    <div id="sentinel" class="sentinel"></div>
    <div id="loader" class="loader" style="display:none">Loading more...</div>
  </div>
  <div id="status" class="status">Loaded: 0 items</div>
</div>`,
      css: `.scroll-area {
  height: 280px;
  overflow-y: auto;
  border-radius: 10px;
  background: #1e293b;
  padding: 8px;
}

.item-card {
  padding: 12px;
  background: #0f172a;
  border-radius: 8px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.item-card .avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  color: white;
  flex-shrink: 0;
}

.item-card .details {
  flex: 1;
}

.item-card .name {
  font-size: 13px;
  color: #e2e8f0;
  font-weight: 500;
}

.item-card .desc {
  font-size: 11px;
  color: #64748b;
  margin-top: 2px;
}

.sentinel {
  height: 1px;
}

.loader {
  text-align: center;
  padding: 12px;
  color: #ef4444;
  font-size: 13px;
}

.status {
  margin-top: 8px;
  font-size: 11px;
  color: #64748b;
  text-align: center;
}`,
      js: `// Simulating Angular infinite scroll with Intersection Observer
const container = document.getElementById('items');
const sentinel = document.getElementById('sentinel');
const loader = document.getElementById('loader');
const statusEl = document.getElementById('status');
const avatarColors = ['#ef4444','#f97316','#22c55e','#3b82f6','#8b5cf6','#ec4899'];
let page = 0;
let loading = false;
const BATCH = 8;
const MAX = 50;

function genItems(start, count) {
  let html = '';
  for (let i = start; i < start + count && i < MAX; i++) {
    const color = avatarColors[i % avatarColors.length];
    const letter = String.fromCharCode(65 + (i % 26));
    html += '<div class="item-card"><div class="avatar" style="background:' + color + '">' + letter + '</div><div class="details"><div class="name">User ' + (i + 1) + '</div><div class="desc">Item loaded on page ' + Math.floor(i / BATCH + 1) + '</div></div></div>';
  }
  return html;
}

function loadMore() {
  if (loading) return;
  const start = page * BATCH;
  if (start >= MAX) return;
  loading = true;
  loader.style.display = 'block';
  setTimeout(() => {
    container.innerHTML += genItems(start, BATCH);
    page++;
    loading = false;
    loader.style.display = 'none';
    const total = Math.min(page * BATCH, MAX);
    statusEl.textContent = 'Loaded: ' + total + ' of ' + MAX + ' items';
    if (total >= MAX) statusEl.textContent += ' (all loaded)';
  }, 500);
}

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) loadMore();
}, { root: document.getElementById('scroll-area'), threshold: 0.1 });

observer.observe(sentinel);
loadMore();`,
    },
  },
  {
    id: 'ng-gallery',
    title: 'Image Gallery with Lightbox',
    category: 'data-display',
    difficulty: 'intermediate',
    description:
      'Create an image gallery with lightbox overlay for full-screen viewing. Support keyboard navigation, thumbnails, and lazy loading of images.',
    concepts: ['overlay', 'lazy loading', 'keyboard events', 'animations'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Image Gallery</h3>
  <div class="grid" id="gallery"></div>
  <div id="lightbox" class="lightbox" style="display:none">
    <button class="lb-close" id="lb-close">&times;</button>
    <button class="lb-nav lb-prev" id="lb-prev">&lt;</button>
    <div class="lb-content">
      <div class="lb-img" id="lb-img"></div>
      <div class="lb-caption" id="lb-caption"></div>
    </div>
    <button class="lb-nav lb-next" id="lb-next">&gt;</button>
  </div>
</div>`,
      css: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.thumb {
  aspect-ratio: 1;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: transform 0.2s;
}

.thumb:hover {
  transform: scale(1.05);
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.lb-close {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
}

.lb-nav {
  background: rgba(255,255,255,0.1);
  border: none;
  color: white;
  font-size: 24px;
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 6px;
}

.lb-nav:hover {
  background: rgba(255,255,255,0.2);
}

.lb-content {
  text-align: center;
  flex: 1;
  max-width: 280px;
}

.lb-img {
  width: 200px;
  height: 200px;
  border-radius: 12px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
}

.lb-caption {
  color: #e2e8f0;
  font-size: 14px;
  margin-top: 12px;
}`,
      js: `// Simulating Angular image gallery with lightbox overlay
const images = [
  { emoji: '\\u{1F305}', label: 'Sunrise', bg: '#7c3aed' },
  { emoji: '\\u{1F3D4}', label: 'Mountain', bg: '#2563eb' },
  { emoji: '\\u{1F30A}', label: 'Ocean Wave', bg: '#0891b2' },
  { emoji: '\\u{1F33B}', label: 'Sunflower', bg: '#ca8a04' },
  { emoji: '\\u{1F30C}', label: 'Galaxy', bg: '#7c3aed' },
  { emoji: '\\u{1F308}', label: 'Rainbow', bg: '#059669' },
  { emoji: '\\u{1F3DE}', label: 'Landscape', bg: '#16a34a' },
  { emoji: '\\u{1F319}', label: 'Night Sky', bg: '#1e3a5f' },
  { emoji: '\\u{1F33F}', label: 'Nature', bg: '#15803d' },
];

const gallery = document.getElementById('gallery');
gallery.innerHTML = images.map((img, i) =>
  '<div class="thumb" style="background:' + img.bg + '" data-idx="' + i + '">' + img.emoji + '</div>'
).join('');

const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
let currentIdx = 0;

function showLightbox(idx) {
  currentIdx = idx;
  const img = images[idx];
  lbImg.style.background = img.bg;
  lbImg.textContent = img.emoji;
  lbCaption.textContent = img.label + ' (' + (idx + 1) + '/' + images.length + ')';
  lightbox.style.display = 'flex';
}

function closeLightbox() { lightbox.style.display = 'none'; }

gallery.addEventListener('click', (e) => {
  const t = e.target.closest('.thumb');
  if (t) showLightbox(parseInt(t.dataset.idx));
});

document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.getElementById('lb-prev').addEventListener('click', () => showLightbox((currentIdx - 1 + images.length) % images.length));
document.getElementById('lb-next').addEventListener('click', () => showLightbox((currentIdx + 1) % images.length));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display !== 'flex') return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showLightbox((currentIdx - 1 + images.length) % images.length);
  if (e.key === 'ArrowRight') showLightbox((currentIdx + 1) % images.length);
});`,
    },
  },
  {
    id: 'ng-cards-grid',
    title: 'Responsive Card Grid',
    category: 'data-display',
    difficulty: 'beginner',
    description:
      'Build responsive card grid layouts using Angular Flex Layout or CSS Grid. Support different breakpoints and dynamic card content with ng-content.',
    concepts: ['Flex Layout', 'responsive design', 'ng-content', 'breakpoints'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Responsive Card Grid</h3>
  <div class="toolbar">
    <button class="cols-btn active" data-cols="2">2 Col</button>
    <button class="cols-btn" data-cols="3">3 Col</button>
    <button class="cols-btn" data-cols="1">List</button>
  </div>
  <div class="grid" id="grid"></div>
</div>`,
      css: `.toolbar {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}

.cols-btn {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: transparent;
  color: #64748b;
  font-size: 12px;
  cursor: pointer;
}

.cols-btn.active {
  background: #ef4444;
  border-color: #ef4444;
  color: white;
}

.grid {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(2, 1fr);
  transition: all 0.3s;
}

.card {
  background: #1e293b;
  border-radius: 10px;
  padding: 14px;
  border: 1px solid #334155;
}

.card .card-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.card .card-title {
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 4px;
}

.card .card-desc {
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.4;
}

.card .card-tag {
  display: inline-block;
  margin-top: 8px;
  padding: 2px 8px;
  font-size: 10px;
  border-radius: 10px;
  background: rgba(239,68,68,0.1);
  color: #ef4444;
}`,
      js: `// Simulating Angular Flex Layout responsive card grid
const cards = [
  { icon: '\\u{1F4E6}', title: 'Components', desc: 'Reusable building blocks for UI', tag: 'core' },
  { icon: '\\u{1F527}', title: 'Services', desc: 'Shared logic and data access', tag: 'core' },
  { icon: '\\u{1F6E1}', title: 'Guards', desc: 'Route protection and auth', tag: 'routing' },
  { icon: '\\u{1F4E1}', title: 'Interceptors', desc: 'HTTP request/response handling', tag: 'http' },
  { icon: '\\u{1F3AF}', title: 'Directives', desc: 'DOM manipulation utilities', tag: 'template' },
  { icon: '\\u{1F50D}', title: 'Pipes', desc: 'Data transformation in templates', tag: 'template' },
];

const grid = document.getElementById('grid');

function render() {
  grid.innerHTML = cards.map(c =>
    '<div class="card"><div class="card-icon">' + c.icon + '</div><div class="card-title">' + c.title + '</div><div class="card-desc">' + c.desc + '</div><div class="card-tag">' + c.tag + '</div></div>'
  ).join('');
}

document.querySelector('.toolbar').addEventListener('click', (e) => {
  const cols = e.target.dataset.cols;
  if (!cols) return;
  document.querySelectorAll('.cols-btn').forEach(b => b.classList.toggle('active', b.dataset.cols === cols));
  grid.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
});

render();`,
    },
  },
  {
    id: 'ng-sort-filter-table',
    title: 'Advanced Table Filtering',
    category: 'data-display',
    difficulty: 'intermediate',
    description:
      'Implement multi-column filtering, sorting, and searching in data tables. Use custom filter predicates and combine MatTableDataSource with reactive forms.',
    concepts: ['MatTableDataSource', 'filter predicate', 'MatSort', 'reactive forms'],
    framework: 'angular',
  },
  {
    id: 'ng-dashboard',
    title: 'Dashboard with Draggable Widgets',
    category: 'data-display',
    difficulty: 'advanced',
    description:
      'Create a customizable dashboard with draggable and resizable widget panels. Save layout preferences and support widget-specific configurations.',
    concepts: ['Angular CDK', 'DragDrop', 'local storage', 'dynamic components'],
    framework: 'angular',
  },

  // Navigation
  {
    id: 'ng-sidebar',
    title: 'Collapsible Sidebar',
    category: 'navigation',
    difficulty: 'intermediate',
    description:
      'Build a responsive sidebar with collapsible menu items and route-based active state highlighting. Use Angular router and animations for smooth transitions.',
    concepts: ['router', 'routerLinkActive', 'animations', 'sidenav'],
    framework: 'angular',
  },
  {
    id: 'ng-navbar',
    title: 'Responsive Navbar',
    category: 'navigation',
    difficulty: 'intermediate',
    description:
      'Create a responsive navigation bar with hamburger menu for mobile. Dynamically generate menu items from route configuration and handle authentication states.',
    concepts: ['router', 'responsive design', 'ngFor', 'route guards'],
    framework: 'angular',
  },
  {
    id: 'ng-breadcrumbs',
    title: 'Auto-Generated Breadcrumbs',
    category: 'navigation',
    difficulty: 'beginner',
    description:
      'Generate breadcrumb navigation automatically from Angular router configuration. Use route data to customize breadcrumb labels and support dynamic segments.',
    concepts: ['router', 'ActivatedRoute', 'route data', 'navigation'],
    framework: 'angular',
  },
  {
    id: 'ng-bottom-nav',
    title: 'Mobile Bottom Navigation',
    category: 'navigation',
    difficulty: 'beginner',
    description:
      'Implement mobile-friendly bottom navigation with route-based active states. Handle route guards and integrate with Angular Material components.',
    concepts: ['router', 'mobile UI', 'routerLinkActive', 'route guards'],
    framework: 'angular',
  },
  {
    id: 'ng-mega-menu',
    title: 'Multi-Level Mega Menu',
    category: 'navigation',
    difficulty: 'advanced',
    description:
      'Build complex multi-level navigation menus with lazy-loaded content. Handle keyboard navigation, hover states, and accessibility (ARIA) attributes.',
    concepts: ['nested components', 'lazy loading', 'accessibility', 'overlay'],
    framework: 'angular',
  },
  {
    id: 'ng-pagination',
    title: 'Pagination with Router Integration',
    category: 'navigation',
    difficulty: 'intermediate',
    description:
      'Create pagination controls with customizable page sizes and URL-based state using query parameters. Integrate with data tables or lists.',
    concepts: ['pagination', 'query params', 'router', 'MatPaginator'],
    framework: 'angular',
  },

  // Advanced Features
  {
    id: 'ng-keyboard-shortcuts',
    title: 'Global Keyboard Shortcuts',
    category: 'advanced',
    difficulty: 'advanced',
    description:
      'Implement a global keyboard shortcut service using HostListener and RxJS. Support key combinations, context-aware shortcuts, and configurable bindings.',
    concepts: ['HostListener', 'services', 'RxJS', 'keyboard events'],
    framework: 'angular',
  },
  {
    id: 'ng-settings-panel',
    title: 'Settings Panel with Persistence',
    category: 'advanced',
    difficulty: 'intermediate',
    description:
      'Build a settings panel using reactive forms with localStorage or IndexedDB persistence. Support themes, user preferences, and real-time preview of changes.',
    concepts: ['reactive forms', 'localStorage', 'services', 'state management'],
    framework: 'angular',
  },
  {
    id: 'ng-notifications-center',
    title: 'Notification Center',
    category: 'advanced',
    difficulty: 'intermediate',
    description:
      'Create a notification center with RxJS Subject-based event system. Support read/unread states, notification filtering, and real-time updates via WebSockets.',
    concepts: ['RxJS', 'Subject', 'observables', 'WebSockets'],
    framework: 'angular',
  },
  {
    id: 'ng-favorites',
    title: 'Favorites Management',
    category: 'advanced',
    difficulty: 'intermediate',
    description:
      'Implement favorites/bookmarks functionality with NgRx or service-based state management. Support adding, removing, organizing, and persisting user favorites.',
    concepts: ['NgRx', 'state management', 'services', 'local storage'],
    framework: 'angular',
  },
  {
    id: 'ng-undo-redo',
    title: 'Undo/Redo System',
    category: 'advanced',
    difficulty: 'advanced',
    description:
      'Build an undo/redo system using command pattern and RxJS. Track state changes, implement command history, and support keyboard shortcuts.',
    concepts: ['command pattern', 'RxJS', 'state management', 'memento pattern'],
    framework: 'angular',
  },

  // UI Components
  {
    id: 'ng-loading-states',
    title: 'Loading Skeletons & Spinners',
    category: 'ui-components',
    difficulty: 'beginner',
    description:
      'Create loading indicators and skeleton screens using structural directives. Show loading states during async operations with smooth transitions.',
    concepts: ['structural directives', 'loading states', 'async pipe', 'animations'],
    framework: 'angular',
  },
  {
    id: 'ng-empty-states',
    title: 'Empty State Placeholders',
    category: 'ui-components',
    difficulty: 'beginner',
    description:
      'Design empty state components with ng-content projection for customizable messages and actions. Handle different empty scenarios (no data, no results, errors).',
    concepts: ['ng-content', 'content projection', 'component composition', 'templates'],
    framework: 'angular',
  },
  {
    id: 'ng-image-viewer',
    title: 'Image Zoom & Pan Viewer',
    category: 'ui-components',
    difficulty: 'intermediate',
    description:
      'Build an image viewer with zoom and pan capabilities using Angular CDK gestures or custom touch/mouse event handlers. Support pinch-to-zoom on mobile.',
    concepts: ['Angular CDK', 'touch events', 'mouse events', 'transforms'],
    framework: 'angular',
  },
  {
    id: 'ng-toggle-switch',
    title: 'Custom Toggle Switch',
    category: 'ui-components',
    difficulty: 'beginner',
    description:
      'Create a custom toggle switch component implementing ControlValueAccessor. Support disabled states, labels, and integration with reactive forms.',
    concepts: ['ControlValueAccessor', 'custom form controls', 'accessibility', 'ARIA'],
    framework: 'angular',
  },
];
