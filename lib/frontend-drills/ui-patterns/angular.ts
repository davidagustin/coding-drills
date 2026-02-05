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
    document.getElementById('sort-' + c).textContent = sortCol === c ? (sortDir === 'asc' ? '▲' : '▼') : '';
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
const icons = { success: '✓', error: '✗', warning: '⚠', info: 'ℹ' };

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
  { emoji: '🌅', label: 'Sunrise', bg: '#7c3aed' },
  { emoji: '🏔', label: 'Mountain', bg: '#2563eb' },
  { emoji: '🌊', label: 'Ocean Wave', bg: '#0891b2' },
  { emoji: '🌻', label: 'Sunflower', bg: '#ca8a04' },
  { emoji: '🌌', label: 'Galaxy', bg: '#7c3aed' },
  { emoji: '🌈', label: 'Rainbow', bg: '#059669' },
  { emoji: '🏞', label: 'Landscape', bg: '#16a34a' },
  { emoji: '🌙', label: 'Night Sky', bg: '#1e3a5f' },
  { emoji: '🌿', label: 'Nature', bg: '#15803d' },
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
  { icon: '📦', title: 'Components', desc: 'Reusable building blocks for UI', tag: 'core' },
  { icon: '🔧', title: 'Services', desc: 'Shared logic and data access', tag: 'core' },
  { icon: '🛡', title: 'Guards', desc: 'Route protection and auth', tag: 'routing' },
  { icon: '📡', title: 'Interceptors', desc: 'HTTP request/response handling', tag: 'http' },
  { icon: '🎯', title: 'Directives', desc: 'DOM manipulation utilities', tag: 'template' },
  { icon: '🔍', title: 'Pipes', desc: 'Data transformation in templates', tag: 'template' },
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
    demoCode: {
      html: `<div id="app">
  <h3>Advanced Table Filtering</h3>
  <div class="filters">
    <input id="search" placeholder="Search name..." />
    <select id="filter-dept">
      <option value="">All Depts</option>
      <option value="Engineering">Engineering</option>
      <option value="Design">Design</option>
      <option value="Marketing">Marketing</option>
    </select>
    <select id="filter-level">
      <option value="">All Levels</option>
      <option value="junior">Junior</option>
      <option value="mid">Mid</option>
      <option value="senior">Senior</option>
    </select>
  </div>
  <table>
    <thead>
      <tr>
        <th class="sortable" data-col="name">Name</th>
        <th class="sortable" data-col="dept">Dept</th>
        <th class="sortable" data-col="level">Level</th>
        <th class="sortable" data-col="score">Score</th>
      </tr>
    </thead>
    <tbody id="tbody"></tbody>
  </table>
  <div id="result-count" class="count"></div>
</div>`,
      css: `.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.filters input, .filters select {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
  font-size: 13px;
  flex: 1;
  min-width: 90px;
}

.filters input:focus, .filters select:focus {
  border-color: #ef4444;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 8px 10px;
  font-size: 11px;
  color: #64748b;
  text-transform: uppercase;
  border-bottom: 2px solid #334155;
  cursor: pointer;
  user-select: none;
}

th:hover { color: #ef4444; }

td {
  padding: 8px 10px;
  font-size: 13px;
  color: #e2e8f0;
  border-bottom: 1px solid #1e293b;
}

.count {
  margin-top: 10px;
  font-size: 11px;
  color: #64748b;
  text-align: center;
}`,
      js: `// Simulating Angular MatTableDataSource with custom filter predicate
const data = [
  {name:'Alice',dept:'Engineering',level:'senior',score:95},
  {name:'Bob',dept:'Design',level:'mid',score:82},
  {name:'Carol',dept:'Marketing',level:'junior',score:78},
  {name:'Dave',dept:'Engineering',level:'mid',score:88},
  {name:'Eve',dept:'Design',level:'senior',score:91},
  {name:'Frank',dept:'Marketing',level:'mid',score:74},
  {name:'Grace',dept:'Engineering',level:'junior',score:85},
  {name:'Hank',dept:'Design',level:'junior',score:69},
];

let sortCol = null, sortDir = 'asc';
const searchEl = document.getElementById('search');
const deptEl = document.getElementById('filter-dept');
const levelEl = document.getElementById('filter-level');

function filtered() {
  const q = searchEl.value.toLowerCase();
  const dept = deptEl.value;
  const level = levelEl.value;
  let res = data.filter(r =>
    (!q || r.name.toLowerCase().includes(q)) &&
    (!dept || r.dept === dept) &&
    (!level || r.level === level)
  );
  if (sortCol) {
    res.sort((a, b) => {
      const va = a[sortCol], vb = b[sortCol];
      const cmp = typeof va === 'number' ? va - vb : String(va).localeCompare(String(vb));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }
  return res;
}

function render() {
  const rows = filtered();
  document.getElementById('tbody').innerHTML = rows.map(r =>
    '<tr><td>' + r.name + '</td><td>' + r.dept + '</td><td>' + r.level + '</td><td>' + r.score + '</td></tr>'
  ).join('') || '<tr><td colspan="4" style="text-align:center;color:#64748b">No results</td></tr>';
  document.getElementById('result-count').textContent = rows.length + ' of ' + data.length + ' records';
}

searchEl.addEventListener('input', render);
deptEl.addEventListener('change', render);
levelEl.addEventListener('change', render);

document.querySelectorAll('th.sortable').forEach(th => {
  th.addEventListener('click', () => {
    const col = th.dataset.col;
    if (sortCol === col) sortDir = sortDir === 'asc' ? 'desc' : 'asc';
    else { sortCol = col; sortDir = 'asc'; }
    render();
  });
});

render();`,
    },
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
    demoCode: {
      html: `<div id="app">
  <h3>Dashboard Widgets</h3>
  <div class="dash-toolbar">
    <button id="add-widget" class="add-btn">+ Add Widget</button>
    <button id="reset-btn" class="reset-btn">Reset</button>
  </div>
  <div class="dashboard" id="dashboard"></div>
</div>`,
      css: `.dash-toolbar {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.add-btn, .reset-btn {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #94a3b8;
  font-size: 12px;
  cursor: pointer;
}

.add-btn:hover { border-color: #ef4444; color: #ef4444; }
.reset-btn:hover { border-color: #64748b; }

.dashboard {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.widget {
  background: #1e293b;
  border-radius: 10px;
  border: 1px solid #334155;
  overflow: hidden;
  cursor: grab;
}

.widget:active { cursor: grabbing; }

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid #334155;
}

.widget-header .title {
  font-size: 12px;
  font-weight: 600;
  color: #e2e8f0;
}

.widget-header .remove {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  font-size: 14px;
}

.widget-body {
  padding: 14px;
  text-align: center;
}

.widget-body .big-num {
  font-size: 28px;
  font-weight: 700;
  color: #ef4444;
}

.widget-body .label {
  font-size: 11px;
  color: #64748b;
  margin-top: 4px;
}

.widget.dragging {
  opacity: 0.4;
}

.widget.over {
  border-color: #ef4444;
}`,
      js: `// Simulating Angular CDK DragDrop dashboard with local storage
const widgetTypes = [
  { title: 'Revenue', value: '$12.4K', label: 'This month' },
  { title: 'Users', value: '1,284', label: 'Active users' },
  { title: 'Orders', value: '356', label: 'Pending orders' },
  { title: 'Uptime', value: '99.9%', label: 'Last 30 days' },
];

let widgets = JSON.parse(localStorage.getItem('ng-dash') || 'null') || widgetTypes.slice(0, 4).map((w, i) => ({ ...w, id: i }));
let nextId = widgets.length;

function save() { localStorage.setItem('ng-dash', JSON.stringify(widgets)); }

function render() {
  const dash = document.getElementById('dashboard');
  dash.innerHTML = widgets.map(w =>
    '<div class="widget" draggable="true" data-id="' + w.id + '"><div class="widget-header"><span class="title">' + w.title + '</span><button class="remove" data-id="' + w.id + '">&times;</button></div><div class="widget-body"><div class="big-num">' + w.value + '</div><div class="label">' + w.label + '</div></div></div>'
  ).join('') || '<div style="grid-column:span 2;text-align:center;color:#64748b;padding:24px">No widgets. Click + Add Widget.</div>';
  setupDrag();
}

function setupDrag() {
  let dragId = null;
  document.querySelectorAll('.widget[draggable]').forEach(el => {
    el.addEventListener('dragstart', (e) => { dragId = parseInt(el.dataset.id); el.classList.add('dragging'); });
    el.addEventListener('dragend', () => { el.classList.remove('dragging'); document.querySelectorAll('.widget').forEach(w => w.classList.remove('over')); });
    el.addEventListener('dragover', (e) => { e.preventDefault(); el.classList.add('over'); });
    el.addEventListener('dragleave', () => el.classList.remove('over'));
    el.addEventListener('drop', (e) => {
      e.preventDefault();
      const dropId = parseInt(el.dataset.id);
      const fromIdx = widgets.findIndex(w => w.id === dragId);
      const toIdx = widgets.findIndex(w => w.id === dropId);
      if (fromIdx !== -1 && toIdx !== -1 && fromIdx !== toIdx) {
        const [moved] = widgets.splice(fromIdx, 1);
        widgets.splice(toIdx, 0, moved);
        save(); render();
      }
    });
  });
  document.querySelectorAll('.remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      widgets = widgets.filter(w => w.id !== parseInt(btn.dataset.id));
      save(); render();
    });
  });
}

document.getElementById('add-widget').addEventListener('click', () => {
  const t = widgetTypes[nextId % widgetTypes.length];
  widgets.push({ ...t, id: nextId++ });
  save(); render();
});

document.getElementById('reset-btn').addEventListener('click', () => {
  widgets = widgetTypes.slice(0, 4).map((w, i) => ({ ...w, id: i }));
  nextId = 4; save(); render();
});

render();`,
    },
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
    demoCode: {
      html: `<div id="app">
  <div class="layout">
    <div class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <span class="logo">&#9674; App</span>
        <button id="toggle-btn" class="toggle-btn">&#9776;</button>
      </div>
      <nav class="nav-list" id="nav-list">
        <div class="nav-item active" data-route="dashboard"><span class="icon">&#9632;</span><span class="label">Dashboard</span></div>
        <div class="nav-item" data-route="projects"><span class="icon">&#9733;</span><span class="label">Projects</span></div>
        <div class="nav-item has-sub" data-route="settings">
          <span class="icon">&#9881;</span><span class="label">Settings</span><span class="arrow">&#9662;</span>
        </div>
        <div class="sub-menu" id="sub-settings" style="display:none">
          <div class="nav-item sub" data-route="profile"><span class="label">Profile</span></div>
          <div class="nav-item sub" data-route="security"><span class="label">Security</span></div>
        </div>
        <div class="nav-item" data-route="help"><span class="icon">&#10067;</span><span class="label">Help</span></div>
      </nav>
    </div>
    <div class="main" id="main-content">
      <div class="page-title" id="page-title">Dashboard</div>
      <p class="page-desc">Click sidebar items to navigate. Toggle collapse with the menu button.</p>
    </div>
  </div>
</div>`,
      css: `.layout {
  display: flex;
  height: 280px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #334155;
}

.sidebar {
  width: 180px;
  background: #1e293b;
  transition: width 0.3s;
  overflow: hidden;
  flex-shrink: 0;
}

.sidebar.collapsed {
  width: 48px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid #334155;
}

.logo {
  color: #ef4444;
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
}

.sidebar.collapsed .logo { display: none; }

.toggle-btn {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 16px;
  cursor: pointer;
}

.nav-list {
  padding: 8px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  color: #94a3b8;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
}

.nav-item:hover { background: rgba(239,68,68,0.05); color: #e2e8f0; }
.nav-item.active { color: #ef4444; background: rgba(239,68,68,0.1); }
.nav-item.sub { padding-left: 36px; font-size: 12px; }

.arrow {
  margin-left: auto;
  font-size: 10px;
  transition: transform 0.2s;
}

.arrow.open { transform: rotate(180deg); }

.sidebar.collapsed .label,
.sidebar.collapsed .arrow { display: none; }

.main {
  flex: 1;
  padding: 16px;
  background: #0f172a;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 8px;
}

.page-desc {
  font-size: 13px;
  color: #64748b;
}`,
      js: `// Simulating Angular collapsible sidebar with router
const sidebar = document.getElementById('sidebar');
const navList = document.getElementById('nav-list');
const subMenu = document.getElementById('sub-settings');
const pageTitle = document.getElementById('page-title');

document.getElementById('toggle-btn').addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});

navList.addEventListener('click', (e) => {
  const item = e.target.closest('.nav-item');
  if (!item) return;
  const route = item.dataset.route;
  if (item.classList.contains('has-sub')) {
    const open = subMenu.style.display !== 'none';
    subMenu.style.display = open ? 'none' : 'block';
    item.querySelector('.arrow').classList.toggle('open', !open);
    return;
  }
  navList.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  item.classList.add('active');
  pageTitle.textContent = route.charAt(0).toUpperCase() + route.slice(1);
});`,
    },
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
    demoCode: {
      html: `<div id="app">
  <nav class="navbar">
    <div class="brand">&#9674; MyApp</div>
    <div class="nav-links" id="nav-links">
      <a class="nav-link active" data-route="home">Home</a>
      <a class="nav-link" data-route="features">Features</a>
      <a class="nav-link" data-route="pricing">Pricing</a>
      <a class="nav-link" data-route="contact">Contact</a>
    </div>
    <div class="nav-right">
      <span class="user" id="user-badge">Guest</span>
      <button id="login-btn" class="login-btn">Login</button>
    </div>
    <button class="hamburger" id="hamburger">&#9776;</button>
  </nav>
  <div class="mobile-menu" id="mobile-menu" style="display:none">
    <a class="mobile-link" data-route="home">Home</a>
    <a class="mobile-link" data-route="features">Features</a>
    <a class="mobile-link" data-route="pricing">Pricing</a>
    <a class="mobile-link" data-route="contact">Contact</a>
  </div>
  <div class="content" id="content">
    <div class="page-name" id="page-name">Home</div>
  </div>
</div>`,
      css: `.navbar {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #1e293b;
  border-radius: 10px 10px 0 0;
  gap: 12px;
}

.brand {
  font-weight: 700;
  color: #ef4444;
  font-size: 16px;
  margin-right: 8px;
}

.nav-links {
  display: flex;
  gap: 4px;
  flex: 1;
}

.nav-link, .mobile-link {
  padding: 6px 12px;
  border-radius: 6px;
  color: #94a3b8;
  font-size: 13px;
  cursor: pointer;
  text-decoration: none;
}

.nav-link:hover, .mobile-link:hover { background: rgba(239,68,68,0.05); color: #e2e8f0; }
.nav-link.active { color: #ef4444; background: rgba(239,68,68,0.1); }

.nav-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user {
  font-size: 12px;
  color: #64748b;
}

.login-btn {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #ef4444;
  background: transparent;
  color: #ef4444;
  font-size: 12px;
  cursor: pointer;
}

.login-btn:hover { background: #ef4444; color: white; }

.hamburger {
  display: none;
  background: none;
  border: none;
  color: #e2e8f0;
  font-size: 20px;
  cursor: pointer;
}

.mobile-menu {
  background: #1e293b;
  padding: 8px;
  display: flex;
  flex-direction: column;
}

.mobile-link {
  padding: 10px 12px;
  display: block;
}

.content {
  padding: 20px;
  background: #0f172a;
  border-radius: 0 0 10px 10px;
  min-height: 80px;
}

.page-name {
  font-size: 18px;
  font-weight: 600;
  color: #e2e8f0;
}`,
      js: `// Simulating Angular responsive navbar with route guards
let loggedIn = false;
const links = document.getElementById('nav-links');
const pageName = document.getElementById('page-name');
const userBadge = document.getElementById('user-badge');
const loginBtn = document.getElementById('login-btn');
const mobileMenu = document.getElementById('mobile-menu');
const hamburger = document.getElementById('hamburger');

function navigate(route, el) {
  if (route === 'pricing' && !loggedIn) {
    pageName.textContent = 'Access Denied - Login required for Pricing';
    return;
  }
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  if (el) el.classList.add('active');
  pageName.textContent = route.charAt(0).toUpperCase() + route.slice(1);
  mobileMenu.style.display = 'none';
}

links.addEventListener('click', (e) => {
  if (e.target.dataset.route) navigate(e.target.dataset.route, e.target);
});

mobileMenu.addEventListener('click', (e) => {
  if (e.target.dataset.route) navigate(e.target.dataset.route);
});

hamburger.addEventListener('click', () => {
  mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'flex' : 'none';
});

loginBtn.addEventListener('click', () => {
  loggedIn = !loggedIn;
  loginBtn.textContent = loggedIn ? 'Logout' : 'Login';
  userBadge.textContent = loggedIn ? 'Admin' : 'Guest';
});`,
    },
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
    demoCode: {
      html: `<div id="app">
  <h3>Auto-Generated Breadcrumbs</h3>
  <div class="breadcrumbs" id="breadcrumbs"></div>
  <div class="route-tree">
    <div class="route-item" data-path="home">Home</div>
    <div class="route-item" data-path="home/products">Products</div>
    <div class="route-item" data-path="home/products/electronics">Electronics</div>
    <div class="route-item" data-path="home/products/electronics/phones">Phones</div>
    <div class="route-item" data-path="home/settings">Settings</div>
    <div class="route-item" data-path="home/settings/profile">Profile</div>
  </div>
  <p class="hint">Click any route to see auto-generated breadcrumbs.</p>
</div>`,
      css: `.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: #1e293b;
  border-radius: 8px;
  margin-bottom: 14px;
  flex-wrap: wrap;
  min-height: 40px;
}

.crumb {
  font-size: 13px;
  color: #94a3b8;
  cursor: pointer;
}

.crumb:hover { color: #ef4444; }

.crumb.current {
  color: #e2e8f0;
  font-weight: 600;
  cursor: default;
}

.separator {
  color: #334155;
  font-size: 12px;
}

.route-tree {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.route-item {
  padding: 10px 14px;
  background: #1e293b;
  border-radius: 8px;
  color: #94a3b8;
  font-size: 13px;
  cursor: pointer;
  border-left: 3px solid transparent;
}

.route-item:hover {
  background: #334155;
  color: #e2e8f0;
}

.route-item.active {
  border-left-color: #ef4444;
  color: #ef4444;
}

.hint {
  margin-top: 14px;
  font-size: 11px;
  color: #64748b;
  text-align: center;
  font-style: italic;
}`,
      js: `// Simulating Angular auto-generated breadcrumbs from router config
const crumbsEl = document.getElementById('breadcrumbs');
let currentPath = 'home';

function renderBreadcrumbs(path) {
  const parts = path.split('/');
  let html = '';
  parts.forEach((part, i) => {
    const fullPath = parts.slice(0, i + 1).join('/');
    const isLast = i === parts.length - 1;
    if (i > 0) html += '<span class="separator">/</span>';
    html += '<span class="crumb' + (isLast ? ' current' : '') + '" data-path="' + fullPath + '">' + part.charAt(0).toUpperCase() + part.slice(1) + '</span>';
  });
  crumbsEl.innerHTML = html;
}

function navigate(path) {
  currentPath = path;
  renderBreadcrumbs(path);
  document.querySelectorAll('.route-item').forEach(r => r.classList.toggle('active', r.dataset.path === path));
}

document.querySelector('.route-tree').addEventListener('click', (e) => {
  const item = e.target.closest('.route-item');
  if (item) navigate(item.dataset.path);
});

crumbsEl.addEventListener('click', (e) => {
  const crumb = e.target.closest('.crumb:not(.current)');
  if (crumb) navigate(crumb.dataset.path);
});

navigate('home');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <div class="phone-frame">
    <div class="screen" id="screen">
      <div class="screen-title" id="screen-title">Home</div>
      <div class="screen-body" id="screen-body"></div>
    </div>
    <nav class="bottom-nav" id="bottom-nav">
      <div class="bnav-item active" data-route="home"><span class="bnav-icon">&#9632;</span><span class="bnav-label">Home</span></div>
      <div class="bnav-item" data-route="search"><span class="bnav-icon">&#128269;</span><span class="bnav-label">Search</span></div>
      <div class="bnav-item" data-route="add"><span class="bnav-icon">&#10133;</span><span class="bnav-label">Add</span></div>
      <div class="bnav-item" data-route="inbox"><span class="bnav-icon">&#9993;</span><span class="bnav-label">Inbox</span><span class="badge">3</span></div>
      <div class="bnav-item" data-route="profile"><span class="bnav-icon">&#9786;</span><span class="bnav-label">Profile</span></div>
    </nav>
  </div>
</div>`,
      css: `.phone-frame {
  width: 280px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid #334155;
  background: #0f172a;
}

.screen {
  min-height: 200px;
  padding: 16px;
}

.screen-title {
  font-size: 18px;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 12px;
}

.screen-body {
  font-size: 13px;
  color: #94a3b8;
}

.bottom-nav {
  display: flex;
  background: #1e293b;
  border-top: 1px solid #334155;
}

.bnav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 4px;
  cursor: pointer;
  position: relative;
  gap: 2px;
}

.bnav-icon {
  font-size: 18px;
  color: #64748b;
}

.bnav-label {
  font-size: 10px;
  color: #64748b;
}

.bnav-item.active .bnav-icon,
.bnav-item.active .bnav-label {
  color: #ef4444;
}

.bnav-item:hover .bnav-icon,
.bnav-item:hover .bnav-label {
  color: #e2e8f0;
}

.badge {
  position: absolute;
  top: 4px;
  right: calc(50% - 16px);
  background: #ef4444;
  color: white;
  font-size: 9px;
  min-width: 14px;
  height: 14px;
  line-height: 14px;
  border-radius: 7px;
  text-align: center;
  font-weight: 600;
}`,
      js: `// Simulating Angular mobile bottom navigation with routerLinkActive
const nav = document.getElementById('bottom-nav');
const title = document.getElementById('screen-title');
const body = document.getElementById('screen-body');

const screens = {
  home: 'Welcome to the app! Browse recent activity and updates.',
  search: 'Search for content, users, and more.',
  add: 'Create new content or start a new project.',
  inbox: 'You have 3 unread messages in your inbox.',
  profile: 'View and edit your profile settings.',
};

nav.addEventListener('click', (e) => {
  const item = e.target.closest('.bnav-item');
  if (!item) return;
  const route = item.dataset.route;
  nav.querySelectorAll('.bnav-item').forEach(i => i.classList.remove('active'));
  item.classList.add('active');
  title.textContent = route.charAt(0).toUpperCase() + route.slice(1);
  body.textContent = screens[route];
});`,
    },
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
    demoCode: {
      html: `<div id="app">
  <h3>Mega Menu</h3>
  <nav class="menu-bar" id="menu-bar">
    <div class="menu-trigger" data-menu="products">Products &#9662;</div>
    <div class="menu-trigger" data-menu="solutions">Solutions &#9662;</div>
    <div class="menu-trigger" data-menu="resources">Resources &#9662;</div>
  </nav>
  <div class="mega-panel" id="mega-panel" style="display:none"></div>
</div>`,
      css: `.menu-bar {
  display: flex;
  gap: 2px;
  background: #1e293b;
  border-radius: 8px;
  padding: 4px;
}

.menu-trigger {
  padding: 10px 16px;
  color: #94a3b8;
  font-size: 13px;
  cursor: pointer;
  border-radius: 6px;
}

.menu-trigger:hover, .menu-trigger.active {
  color: #ef4444;
  background: rgba(239,68,68,0.05);
}

.mega-panel {
  background: #1e293b;
  border-radius: 0 0 10px 10px;
  padding: 16px;
  border: 1px solid #334155;
  border-top: 2px solid #ef4444;
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}

.mega-columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.mega-col h4 {
  font-size: 12px;
  color: #ef4444;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 8px 0;
}

.mega-col a {
  display: block;
  padding: 6px 0;
  color: #94a3b8;
  font-size: 13px;
  text-decoration: none;
  cursor: pointer;
}

.mega-col a:hover {
  color: #e2e8f0;
}`,
      js: `// Simulating Angular multi-level mega menu
const menus = {
  products: [
    { title: 'Analytics', items: ['Dashboard','Reports','Insights'] },
    { title: 'Automation', items: ['Workflows','Triggers','Scheduler'] },
    { title: 'Integrations', items: ['API','Webhooks','Plugins'] }
  ],
  solutions: [
    { title: 'Enterprise', items: ['Security','Compliance','SSO'] },
    { title: 'Startups', items: ['Free Tier','Growth Plan','Support'] },
    { title: 'Teams', items: ['Collaboration','Shared Workspace','Chat'] }
  ],
  resources: [
    { title: 'Learn', items: ['Documentation','Tutorials','Videos'] },
    { title: 'Community', items: ['Forum','Discord','Events'] },
    { title: 'Support', items: ['Contact Us','FAQ','Status Page'] }
  ]
};

const bar = document.getElementById('menu-bar');
const panel = document.getElementById('mega-panel');
let activeMenu = null;

bar.addEventListener('click', (e) => {
  const trigger = e.target.closest('.menu-trigger');
  if (!trigger) return;
  const menuKey = trigger.dataset.menu;
  if (activeMenu === menuKey) {
    closeMenu();
    return;
  }
  activeMenu = menuKey;
  bar.querySelectorAll('.menu-trigger').forEach(t => t.classList.toggle('active', t.dataset.menu === menuKey));
  const cols = menus[menuKey];
  panel.innerHTML = '<div class="mega-columns">' + cols.map(col =>
    '<div class="mega-col"><h4>' + col.title + '</h4>' + col.items.map(item => '<a>' + item + '</a>').join('') + '</div>'
  ).join('') + '</div>';
  panel.style.display = 'block';
});

function closeMenu() {
  activeMenu = null;
  panel.style.display = 'none';
  bar.querySelectorAll('.menu-trigger').forEach(t => t.classList.remove('active'));
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('#menu-bar') && !e.target.closest('#mega-panel')) closeMenu();
});

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });`,
    },
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
    demoCode: {
      html: `<div id="app">
  <h3>Pagination</h3>
  <div class="size-control">
    <label>Per page:</label>
    <select id="page-size">
      <option value="3">3</option>
      <option value="5" selected>5</option>
      <option value="10">10</option>
    </select>
  </div>
  <ul id="item-list" class="item-list"></ul>
  <div class="paginator" id="paginator"></div>
  <div class="url-bar" id="url-bar"></div>
</div>`,
      css: `.size-control {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.size-control label {
  font-size: 12px;
  color: #64748b;
}

.size-control select {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
}

.item-list {
  list-style: none;
  padding: 0;
  margin: 0 0 12px 0;
}

.item-list li {
  padding: 10px 12px;
  background: #1e293b;
  border-radius: 6px;
  margin-bottom: 4px;
  font-size: 13px;
  color: #e2e8f0;
}

.paginator {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.paginator button {
  min-width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  font-size: 12px;
}

.paginator button:hover:not(:disabled) {
  border-color: #ef4444;
  color: #ef4444;
}

.paginator button.active {
  background: #ef4444;
  border-color: #ef4444;
  color: white;
}

.paginator button:disabled {
  opacity: 0.3;
  cursor: default;
}

.url-bar {
  margin-top: 10px;
  padding: 6px 10px;
  background: #1e293b;
  border-radius: 6px;
  font-size: 11px;
  color: #64748b;
  font-family: monospace;
  text-align: center;
}`,
      js: `// Simulating Angular pagination with router query params
const allItems = Array.from({ length: 23 }, (_, i) => 'Item ' + (i + 1));
let page = 1;
let pageSize = 5;

function totalPages() { return Math.ceil(allItems.length / pageSize); }

function render() {
  const start = (page - 1) * pageSize;
  const items = allItems.slice(start, start + pageSize);
  document.getElementById('item-list').innerHTML = items.map(i => '<li>' + i + '</li>').join('');
  const tp = totalPages();
  let html = '<button id="pg-prev">&lt;</button>';
  for (let i = 1; i <= tp; i++) {
    html += '<button class="pg-num' + (i === page ? ' active' : '') + '" data-page="' + i + '">' + i + '</button>';
  }
  html += '<button id="pg-next">&gt;</button>';
  document.getElementById('paginator').innerHTML = html;
  document.getElementById('pg-prev').disabled = page === 1;
  document.getElementById('pg-next').disabled = page === tp;
  document.getElementById('url-bar').textContent = '/items?page=' + page + '&size=' + pageSize;
}

document.getElementById('paginator').addEventListener('click', (e) => {
  if (e.target.id === 'pg-prev' && page > 1) { page--; render(); }
  else if (e.target.id === 'pg-next' && page < totalPages()) { page++; render(); }
  else if (e.target.dataset.page) { page = parseInt(e.target.dataset.page); render(); }
});

document.getElementById('page-size').addEventListener('change', (e) => {
  pageSize = parseInt(e.target.value);
  page = 1;
  render();
});

render();`,
    },
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
    demoCode: {
      html: `<div id="app">
  <h3>Keyboard Shortcuts</h3>
  <div class="shortcut-list" id="shortcut-list">
    <div class="shortcut"><kbd>Ctrl</kbd>+<kbd>N</kbd> <span>New item</span></div>
    <div class="shortcut"><kbd>Ctrl</kbd>+<kbd>S</kbd> <span>Save</span></div>
    <div class="shortcut"><kbd>Ctrl</kbd>+<kbd>F</kbd> <span>Search</span></div>
    <div class="shortcut"><kbd>Ctrl</kbd>+<kbd>D</kbd> <span>Delete</span></div>
    <div class="shortcut"><kbd>Esc</kbd> <span>Close / Cancel</span></div>
  </div>
  <div id="log" class="log">Press a shortcut key combination...</div>
  <div class="search-overlay" id="search-overlay" style="display:none">
    <input id="search-input" placeholder="Search..." />
  </div>
</div>`,
      css: `.shortcut-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.shortcut {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #1e293b;
  border-radius: 6px;
  font-size: 13px;
  color: #94a3b8;
}

kbd {
  display: inline-block;
  padding: 2px 8px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 4px;
  font-size: 11px;
  color: #e2e8f0;
  font-family: monospace;
}

.shortcut span {
  margin-left: auto;
}

.log {
  padding: 12px;
  background: #1e293b;
  border-radius: 8px;
  font-size: 13px;
  color: #22c55e;
  text-align: center;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #1e293b;
  border: 1px solid #ef4444;
  border-radius: 10px;
  padding: 12px;
  width: 80%;
  max-width: 300px;
  z-index: 10;
}

.search-overlay input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #0f172a;
  color: #e2e8f0;
  outline: none;
  font-size: 14px;
}`,
      js: `// Simulating Angular keyboard shortcut service with HostListener
const log = document.getElementById('log');
const overlay = document.getElementById('search-overlay');
let itemCount = 0;

const shortcuts = {
  'n': () => { itemCount++; return 'Created new item #' + itemCount; },
  's': () => 'Saved successfully!',
  'f': () => { overlay.style.display = 'block'; document.getElementById('search-input').focus(); return 'Search opened'; },
  'd': () => 'Item deleted',
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    overlay.style.display = 'none';
    log.textContent = 'Cancelled';
    return;
  }
  if ((e.ctrlKey || e.metaKey) && shortcuts[e.key]) {
    e.preventDefault();
    const msg = shortcuts[e.key]();
    log.textContent = msg;
    log.style.animation = 'none';
    void log.offsetWidth;
    log.style.animation = '';
  }
});`,
    },
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
    demoCode: {
      html: `<div id="app">
  <h3>Settings Panel</h3>
  <div class="settings">
    <div class="setting-row">
      <label>Theme</label>
      <div class="toggle-group">
        <button class="tg active" data-theme="dark">Dark</button>
        <button class="tg" data-theme="light">Light</button>
      </div>
    </div>
    <div class="setting-row">
      <label>Accent Color</label>
      <div class="color-options" id="color-options">
        <div class="color-dot active" data-color="#ef4444" style="background:#ef4444"></div>
        <div class="color-dot" data-color="#3b82f6" style="background:#3b82f6"></div>
        <div class="color-dot" data-color="#22c55e" style="background:#22c55e"></div>
        <div class="color-dot" data-color="#a855f7" style="background:#a855f7"></div>
      </div>
    </div>
    <div class="setting-row">
      <label>Font Size</label>
      <input type="range" id="font-size" min="12" max="20" value="14" />
      <span id="fs-value">14px</span>
    </div>
    <div class="setting-row">
      <label>Notifications</label>
      <div class="switch" id="notif-switch"><div class="switch-thumb"></div></div>
    </div>
  </div>
  <div class="preview" id="preview">
    <p>Preview text with current settings.</p>
  </div>
  <button id="save-btn" class="save-btn">Save Settings</button>
  <div id="saved-msg" class="saved" style="display:none">Settings saved!</div>
</div>`,
      css: `.settings {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 14px;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: #1e293b;
  border-radius: 8px;
}

.setting-row label {
  font-size: 13px;
  color: #94a3b8;
}

.toggle-group {
  display: flex;
  gap: 2px;
  background: #0f172a;
  border-radius: 6px;
  padding: 2px;
}

.tg {
  padding: 4px 12px;
  border: none;
  background: transparent;
  color: #64748b;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.tg.active {
  background: #ef4444;
  color: white;
}

.color-options {
  display: flex;
  gap: 6px;
}

.color-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
}

.color-dot.active {
  border-color: white;
}

input[type="range"] {
  flex: 1;
  margin: 0 10px;
  accent-color: #ef4444;
}

.switch {
  width: 40px;
  height: 22px;
  background: #334155;
  border-radius: 11px;
  cursor: pointer;
  padding: 2px;
  transition: background 0.2s;
}

.switch.on {
  background: #ef4444;
}

.switch-thumb {
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s;
}

.switch.on .switch-thumb {
  transform: translateX(18px);
}

.preview {
  padding: 14px;
  background: #1e293b;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: all 0.3s;
}

.preview p {
  margin: 0;
  color: #e2e8f0;
}

.save-btn {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #ef4444;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.saved {
  text-align: center;
  margin-top: 8px;
  font-size: 12px;
  color: #22c55e;
}`,
      js: `// Simulating Angular settings panel with localStorage persistence
let settings = JSON.parse(localStorage.getItem('ng-settings') || '{}');
settings = { theme: 'dark', accent: '#ef4444', fontSize: 14, notifications: false, ...settings };
const preview = document.getElementById('preview');

function applySettings() {
  preview.style.fontSize = settings.fontSize + 'px';
  preview.style.borderLeft = '3px solid ' + settings.accent;
  document.getElementById('fs-value').textContent = settings.fontSize + 'px';
}

// Theme toggle
document.querySelector('.toggle-group').addEventListener('click', (e) => {
  if (!e.target.classList.contains('tg')) return;
  settings.theme = e.target.dataset.theme;
  document.querySelectorAll('.tg').forEach(t => t.classList.toggle('active', t.dataset.theme === settings.theme));
});

// Accent color
document.getElementById('color-options').addEventListener('click', (e) => {
  const dot = e.target.closest('.color-dot');
  if (!dot) return;
  settings.accent = dot.dataset.color;
  document.querySelectorAll('.color-dot').forEach(d => d.classList.toggle('active', d.dataset.color === settings.accent));
  applySettings();
});

// Font size
document.getElementById('font-size').addEventListener('input', (e) => {
  settings.fontSize = parseInt(e.target.value);
  applySettings();
});

// Notifications toggle
document.getElementById('notif-switch').addEventListener('click', function() {
  settings.notifications = !settings.notifications;
  this.classList.toggle('on', settings.notifications);
});

// Save
document.getElementById('save-btn').addEventListener('click', () => {
  localStorage.setItem('ng-settings', JSON.stringify(settings));
  const msg = document.getElementById('saved-msg');
  msg.style.display = 'block';
  setTimeout(() => msg.style.display = 'none', 2000);
});

applySettings();
document.getElementById('notif-switch').classList.toggle('on', settings.notifications);`,
    },
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
    demoCode: {
      html: `<div id="app">
  <h3>Notification Center</h3>
  <div class="nc-header">
    <button id="bell" class="bell">&#128276; <span id="badge" class="badge" style="display:none">0</span></button>
    <div class="filter-tabs">
      <button class="ft active" data-filter="all">All</button>
      <button class="ft" data-filter="unread">Unread</button>
      <button class="ft" data-filter="info">Info</button>
      <button class="ft" data-filter="alert">Alert</button>
    </div>
    <button id="mark-all" class="mark-all">Mark all read</button>
  </div>
  <div id="notif-list" class="notif-list"></div>
  <button id="simulate-btn" class="sim-btn">Simulate New Notification</button>
</div>`,
      css: `.nc-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.bell {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  position: relative;
}

.badge {
  position: absolute;
  top: -4px;
  right: -6px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  min-width: 16px;
  height: 16px;
  line-height: 16px;
  border-radius: 8px;
  text-align: center;
  font-weight: 700;
}

.filter-tabs {
  display: flex;
  gap: 2px;
  flex: 1;
}

.ft {
  padding: 4px 10px;
  border-radius: 4px;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 11px;
  cursor: pointer;
}

.ft.active { color: #ef4444; background: rgba(239,68,68,0.1); }

.mark-all {
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid #334155;
  background: transparent;
  color: #64748b;
  font-size: 11px;
  cursor: pointer;
}

.notif-list {
  max-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.notif {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: #1e293b;
  border-radius: 8px;
  cursor: pointer;
  border-left: 3px solid transparent;
}

.notif.unread { border-left-color: #ef4444; background: #1a2744; }

.notif .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.notif .dot.info { background: #3b82f6; }
.notif .dot.alert { background: #ef4444; }

.notif .text { flex: 1; font-size: 13px; color: #e2e8f0; }
.notif .time { font-size: 10px; color: #64748b; }

.sim-btn {
  width: 100%;
  margin-top: 12px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #94a3b8;
  cursor: pointer;
  font-size: 12px;
}

.sim-btn:hover { border-color: #ef4444; color: #ef4444; }`,
      js: `// Simulating Angular notification center with RxJS Subject
const notifications = [
  { id: 1, text: 'New deployment succeeded', type: 'info', read: false, time: '2m ago' },
  { id: 2, text: 'Server CPU usage above 90%', type: 'alert', read: false, time: '5m ago' },
  { id: 3, text: 'User John signed up', type: 'info', read: true, time: '1h ago' },
  { id: 4, text: 'Payment failed for order #42', type: 'alert', read: true, time: '3h ago' },
];
let nextId = 5;
let filter = 'all';
const badge = document.getElementById('badge');

function render() {
  const filtered = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'info' || filter === 'alert') return n.type === filter;
    return true;
  });
  document.getElementById('notif-list').innerHTML = filtered.map(n =>
    '<div class="notif' + (n.read ? '' : ' unread') + '" data-id="' + n.id + '"><div class="dot ' + n.type + '"></div><div class="text">' + n.text + '</div><div class="time">' + n.time + '</div></div>'
  ).join('') || '<div style="padding:16px;text-align:center;color:#64748b;font-size:13px">No notifications</div>';
  const unread = notifications.filter(n => !n.read).length;
  badge.textContent = unread;
  badge.style.display = unread > 0 ? 'inline-block' : 'none';
}

document.getElementById('notif-list').addEventListener('click', (e) => {
  const el = e.target.closest('.notif');
  if (!el) return;
  const notif = notifications.find(n => n.id === parseInt(el.dataset.id));
  if (notif) { notif.read = true; render(); }
});

document.querySelector('.filter-tabs').addEventListener('click', (e) => {
  if (!e.target.dataset.filter) return;
  filter = e.target.dataset.filter;
  document.querySelectorAll('.ft').forEach(f => f.classList.toggle('active', f.dataset.filter === filter));
  render();
});

document.getElementById('mark-all').addEventListener('click', () => {
  notifications.forEach(n => n.read = true);
  render();
});

document.getElementById('simulate-btn').addEventListener('click', () => {
  const msgs = ['Build completed','New comment on PR','Alert: disk space low','User invited to team'];
  const types = ['info','alert'];
  notifications.unshift({
    id: nextId++,
    text: msgs[Math.floor(Math.random() * msgs.length)],
    type: types[Math.floor(Math.random() * 2)],
    read: false,
    time: 'now'
  });
  render();
});

render();`,
    },
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
    demoCode: {
      html: `<div id="app">
  <h3>Favorites Management</h3>
  <div class="section-label">Items</div>
  <div id="items" class="item-grid"></div>
  <div class="section-label">Favorites <span id="fav-count" class="fav-count">0</span></div>
  <div id="favorites" class="fav-list"></div>
</div>`,
      css: `.section-label {
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 12px 0 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.fav-count {
  background: #ef4444;
  color: white;
  font-size: 10px;
  min-width: 18px;
  height: 18px;
  line-height: 18px;
  border-radius: 9px;
  text-align: center;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
}

.item-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: #1e293b;
  border-radius: 8px;
}

.item-card .name {
  font-size: 13px;
  color: #e2e8f0;
}

.fav-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #334155;
  transition: color 0.2s;
}

.fav-btn.active {
  color: #ef4444;
}

.fav-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 40px;
}

.fav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: rgba(239,68,68,0.08);
  border-radius: 6px;
  border-left: 3px solid #ef4444;
}

.fav-item .name {
  font-size: 13px;
  color: #e2e8f0;
}

.remove-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 14px;
}

.empty {
  font-size: 12px;
  color: #64748b;
  text-align: center;
  padding: 12px;
}`,
      js: `// Simulating Angular favorites with NgRx-style state management
const items = ['Angular','React','Vue','Svelte','TypeScript','RxJS','NgRx','Tailwind'];
let favorites = JSON.parse(localStorage.getItem('ng-favs') || '[]');

function save() { localStorage.setItem('ng-favs', JSON.stringify(favorites)); }

function render() {
  document.getElementById('items').innerHTML = items.map(item =>
    '<div class="item-card"><span class="name">' + item + '</span><button class="fav-btn' + (favorites.includes(item) ? ' active' : '') + '" data-item="' + item + '">' + (favorites.includes(item) ? '♥' : '♡') + '</button></div>'
  ).join('');

  document.getElementById('fav-count').textContent = favorites.length;
  document.getElementById('favorites').innerHTML = favorites.length
    ? favorites.map(f => '<div class="fav-item"><span class="name">' + f + '</span><button class="remove-btn" data-item="' + f + '">&times;</button></div>').join('')
    : '<div class="empty">No favorites yet. Click a heart to add.</div>';
}

document.getElementById('items').addEventListener('click', (e) => {
  const btn = e.target.closest('.fav-btn');
  if (!btn) return;
  const item = btn.dataset.item;
  if (favorites.includes(item)) {
    favorites = favorites.filter(f => f !== item);
  } else {
    favorites.push(item);
  }
  save(); render();
});

document.getElementById('favorites').addEventListener('click', (e) => {
  const btn = e.target.closest('.remove-btn');
  if (!btn) return;
  favorites = favorites.filter(f => f !== btn.dataset.item);
  save(); render();
});

render();`,
    },
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
    demoCode: {
      html: `<div id="app">
  <h3>Undo/Redo System</h3>
  <div class="toolbar">
    <button id="undo-btn" class="tb" disabled>&#8592; Undo</button>
    <button id="redo-btn" class="tb" disabled>Redo &#8594;</button>
    <span id="history-info" class="info"></span>
  </div>
  <div class="canvas" id="canvas">
    <div class="item-row" id="item-row"></div>
    <div class="actions">
      <button id="add-btn" class="act-btn">+ Add</button>
      <button id="color-btn" class="act-btn">Change Color</button>
      <button id="remove-btn" class="act-btn">Remove Last</button>
    </div>
  </div>
  <div class="history" id="history-log"></div>
</div>`,
      css: `.toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.tb {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #94a3b8;
  font-size: 12px;
  cursor: pointer;
}

.tb:not(:disabled):hover {
  border-color: #ef4444;
  color: #ef4444;
}

.tb:disabled {
  opacity: 0.3;
  cursor: default;
}

.info {
  margin-left: auto;
  font-size: 11px;
  color: #64748b;
}

.canvas {
  background: #1e293b;
  border-radius: 10px;
  padding: 16px;
  min-height: 120px;
}

.item-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  min-height: 50px;
  margin-bottom: 12px;
}

.box {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  transition: all 0.2s;
}

.actions {
  display: flex;
  gap: 6px;
}

.act-btn {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #0f172a;
  color: #94a3b8;
  font-size: 12px;
  cursor: pointer;
}

.act-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.history {
  margin-top: 12px;
  max-height: 80px;
  overflow-y: auto;
  font-size: 11px;
  color: #64748b;
}

.history div {
  padding: 2px 0;
}`,
      js: `// Simulating Angular undo/redo with command pattern
const colors = ['#ef4444','#3b82f6','#22c55e','#f59e0b','#a855f7','#ec4899'];
let state = [];
let undoStack = [];
let redoStack = [];
const historyLog = document.getElementById('history-log');

function snapshot() { return JSON.parse(JSON.stringify(state)); }

function execute(action, desc) {
  undoStack.push({ state: snapshot(), desc: desc });
  redoStack = [];
  action();
  updateUI();
  historyLog.innerHTML += '<div>' + desc + '</div>';
  historyLog.scrollTop = historyLog.scrollHeight;
}

document.getElementById('add-btn').addEventListener('click', () => {
  execute(() => {
    state.push(colors[Math.floor(Math.random() * colors.length)]);
  }, 'Add box');
});

document.getElementById('color-btn').addEventListener('click', () => {
  if (state.length === 0) return;
  execute(() => {
    const idx = state.length - 1;
    state[idx] = colors[Math.floor(Math.random() * colors.length)];
  }, 'Change color');
});

document.getElementById('remove-btn').addEventListener('click', () => {
  if (state.length === 0) return;
  execute(() => { state.pop(); }, 'Remove last');
});

document.getElementById('undo-btn').addEventListener('click', () => {
  if (undoStack.length === 0) return;
  const entry = undoStack.pop();
  redoStack.push({ state: snapshot(), desc: 'Undo: ' + entry.desc });
  state = entry.state;
  updateUI();
});

document.getElementById('redo-btn').addEventListener('click', () => {
  if (redoStack.length === 0) return;
  const entry = redoStack.pop();
  undoStack.push({ state: snapshot(), desc: 'Redo' });
  state = entry.state;
  updateUI();
});

function updateUI() {
  document.getElementById('item-row').innerHTML = state.map(c =>
    '<div class="box" style="background:' + c + '"></div>'
  ).join('');
  document.getElementById('undo-btn').disabled = undoStack.length === 0;
  document.getElementById('redo-btn').disabled = redoStack.length === 0;
  document.getElementById('history-info').textContent = 'Undo: ' + undoStack.length + ' | Redo: ' + redoStack.length;
}

updateUI();`,
    },
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
    demoCode: {
      html: `<div id="app">
  <h3>Loading States</h3>
  <button id="load-btn" class="load-btn">Load Data</button>
  <div id="content" class="content">
    <div class="skeleton-card">
      <div class="skeleton skeleton-avatar"></div>
      <div class="skeleton-text">
        <div class="skeleton skeleton-line w-60"></div>
        <div class="skeleton skeleton-line w-80"></div>
        <div class="skeleton skeleton-line w-40"></div>
      </div>
    </div>
    <div class="skeleton-card">
      <div class="skeleton skeleton-avatar"></div>
      <div class="skeleton-text">
        <div class="skeleton skeleton-line w-70"></div>
        <div class="skeleton skeleton-line w-50"></div>
        <div class="skeleton skeleton-line w-90"></div>
      </div>
    </div>
  </div>
</div>`,
      css: `.load-btn {
  padding: 8px 20px;
  border-radius: 6px;
  border: none;
  background: #ef4444;
  color: white;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 14px;
}

.load-btn:hover { background: #dc2626; }
.load-btn:disabled { opacity: 0.5; }

.content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-card {
  display: flex;
  gap: 12px;
  padding: 14px;
  background: #1e293b;
  border-radius: 10px;
}

.skeleton {
  background: linear-gradient(90deg, #334155 25%, #475569 50%, #334155 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 6px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  flex-shrink: 0;
}

.skeleton-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.skeleton-line {
  height: 12px;
}

.w-40 { width: 40%; }
.w-50 { width: 50%; }
.w-60 { width: 60%; }
.w-70 { width: 70%; }
.w-80 { width: 80%; }
.w-90 { width: 90%; }

.loaded-card {
  display: flex;
  gap: 12px;
  padding: 14px;
  background: #1e293b;
  border-radius: 10px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  flex-shrink: 0;
}

.loaded-card .name {
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
}

.loaded-card .role {
  font-size: 12px;
  color: #94a3b8;
}

.loaded-card .email {
  font-size: 11px;
  color: #64748b;
}`,
      js: `// Simulating Angular loading skeleton with structural directives
const content = document.getElementById('content');
const btn = document.getElementById('load-btn');
const people = [
  { name: 'Alice', role: 'Developer', email: 'alice@dev.io', color: '#ef4444' },
  { name: 'Bob', role: 'Designer', email: 'bob@design.io', color: '#3b82f6' },
];

let loaded = false;

btn.addEventListener('click', () => {
  if (loaded) {
    // Reset to skeleton
    content.innerHTML = Array(2).fill(0).map(() =>
      '<div class="skeleton-card"><div class="skeleton skeleton-avatar"></div><div class="skeleton-text"><div class="skeleton skeleton-line w-60"></div><div class="skeleton skeleton-line w-80"></div><div class="skeleton skeleton-line w-40"></div></div></div>'
    ).join('');
    loaded = false;
    btn.textContent = 'Load Data';
    return;
  }
  btn.disabled = true;
  btn.textContent = 'Loading...';
  setTimeout(() => {
    content.innerHTML = people.map(p =>
      '<div class="loaded-card"><div class="avatar" style="background:' + p.color + '">' + p.name[0] + '</div><div><div class="name">' + p.name + '</div><div class="role">' + p.role + '</div><div class="email">' + p.email + '</div></div></div>'
    ).join('');
    btn.disabled = false;
    btn.textContent = 'Reset';
    loaded = true;
  }, 1500);
});`,
    },
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
    demoCode: {
      html: `<div id="app">
  <h3>Empty State Placeholders</h3>
  <div class="tabs">
    <button class="tab active" data-state="no-data">No Data</button>
    <button class="tab" data-state="no-results">No Results</button>
    <button class="tab" data-state="error">Error</button>
  </div>
  <div id="empty-state" class="empty-state"></div>
</div>`,
      css: `.tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
}

.tab {
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: transparent;
  color: #64748b;
  font-size: 12px;
  cursor: pointer;
}

.tab.active {
  background: #ef4444;
  border-color: #ef4444;
  color: white;
}

.empty-state {
  padding: 32px 16px;
  text-align: center;
  background: #1e293b;
  border-radius: 12px;
  border: 1px dashed #334155;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.empty-title {
  font-size: 16px;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 6px;
}

.empty-desc {
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 16px;
  line-height: 1.5;
}

.empty-action {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 6px;
  border: none;
  background: #ef4444;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
}

.empty-action:hover {
  background: #dc2626;
}

.empty-action.secondary {
  background: transparent;
  border: 1px solid #334155;
  color: #94a3b8;
  margin-left: 8px;
}`,
      js: `// Simulating Angular empty state with ng-content projection
const container = document.getElementById('empty-state');
const states = {
  'no-data': {
    icon: '📦',
    title: 'No items yet',
    desc: 'Get started by creating your first item. It only takes a few seconds.',
    actions: '<button class="empty-action" onclick="alert(\\'Create clicked\\')">Create First Item</button>'
  },
  'no-results': {
    icon: '🔍',
    title: 'No results found',
    desc: 'Try adjusting your search or filters to find what you are looking for.',
    actions: '<button class="empty-action" onclick="alert(\\'Filters cleared\\')">Clear Filters</button><button class="empty-action secondary" onclick="alert(\\'Help opened\\')">Get Help</button>'
  },
  'error': {
    icon: '⚠',
    title: 'Something went wrong',
    desc: 'We had trouble loading your data. Please check your connection and try again.',
    actions: '<button class="empty-action" onclick="alert(\\'Retrying...\\')">Retry</button>'
  }
};

function render(stateKey) {
  const s = states[stateKey];
  container.innerHTML = '<div class="empty-icon">' + s.icon + '</div><div class="empty-title">' + s.title + '</div><div class="empty-desc">' + s.desc + '</div><div>' + s.actions + '</div>';
}

document.querySelector('.tabs').addEventListener('click', (e) => {
  if (!e.target.dataset.state) return;
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.state === e.target.dataset.state));
  render(e.target.dataset.state);
});

render('no-data');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <h3>Image Zoom & Pan</h3>
  <div class="controls">
    <button id="zoom-in">+ Zoom In</button>
    <button id="zoom-out">- Zoom Out</button>
    <button id="reset-btn">Reset</button>
    <span id="zoom-level" class="zoom-level">100%</span>
  </div>
  <div class="viewer" id="viewer">
    <div class="image-container" id="image-container">
      <div class="placeholder-img" id="placeholder">
        <div class="grid-pattern">
          <div class="gp-row"><div class="gp-cell c1"></div><div class="gp-cell c2"></div><div class="gp-cell c3"></div></div>
          <div class="gp-row"><div class="gp-cell c4"></div><div class="gp-cell c5"></div><div class="gp-cell c6"></div></div>
          <div class="gp-row"><div class="gp-cell c7"></div><div class="gp-cell c8"></div><div class="gp-cell c9"></div></div>
        </div>
        <div class="img-label">Drag to pan / Scroll to zoom</div>
      </div>
    </div>
  </div>
</div>`,
      css: `.controls {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
  align-items: center;
}

.controls button {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #94a3b8;
  font-size: 12px;
  cursor: pointer;
}

.controls button:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.zoom-level {
  margin-left: auto;
  font-size: 12px;
  color: #64748b;
}

.viewer {
  width: 100%;
  height: 220px;
  overflow: hidden;
  border-radius: 10px;
  background: #0f172a;
  border: 1px solid #334155;
  cursor: grab;
  position: relative;
}

.viewer:active {
  cursor: grabbing;
}

.image-container {
  position: absolute;
  transform-origin: 0 0;
}

.placeholder-img {
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.grid-pattern {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.gp-row {
  display: flex;
  gap: 4px;
}

.gp-cell {
  width: 50px;
  height: 50px;
  border-radius: 6px;
}

.c1 { background: #ef4444; }
.c2 { background: #f97316; }
.c3 { background: #eab308; }
.c4 { background: #22c55e; }
.c5 { background: #3b82f6; }
.c6 { background: #8b5cf6; }
.c7 { background: #ec4899; }
.c8 { background: #14b8a6; }
.c9 { background: #f43f5e; }

.img-label {
  font-size: 12px;
  color: #64748b;
}`,
      js: `// Simulating Angular CDK image viewer with zoom and pan
const viewer = document.getElementById('viewer');
const container = document.getElementById('image-container');
let scale = 1;
let panX = 0, panY = 0;
let dragging = false;
let startX, startY, startPanX, startPanY;

function applyTransform() {
  container.style.transform = 'translate(' + panX + 'px,' + panY + 'px) scale(' + scale + ')';
  document.getElementById('zoom-level').textContent = Math.round(scale * 100) + '%';
}

viewer.addEventListener('mousedown', (e) => {
  dragging = true;
  startX = e.clientX; startY = e.clientY;
  startPanX = panX; startPanY = panY;
});

document.addEventListener('mousemove', (e) => {
  if (!dragging) return;
  panX = startPanX + (e.clientX - startX);
  panY = startPanY + (e.clientY - startY);
  applyTransform();
});

document.addEventListener('mouseup', () => { dragging = false; });

viewer.addEventListener('wheel', (e) => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  scale = Math.max(0.5, Math.min(5, scale + delta));
  applyTransform();
}, { passive: false });

document.getElementById('zoom-in').addEventListener('click', () => {
  scale = Math.min(5, scale + 0.25);
  applyTransform();
});

document.getElementById('zoom-out').addEventListener('click', () => {
  scale = Math.max(0.5, scale - 0.25);
  applyTransform();
});

document.getElementById('reset-btn').addEventListener('click', () => {
  scale = 1; panX = 0; panY = 0;
  applyTransform();
});

applyTransform();`,
    },
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
    demoCode: {
      html: `<div id="app">
  <h3>Custom Toggle Switch</h3>
  <div class="toggle-list">
    <div class="toggle-row">
      <span class="toggle-label">Dark Mode</span>
      <div class="toggle" data-key="dark" role="switch" aria-checked="false" tabindex="0">
        <div class="track"><div class="thumb"></div></div>
      </div>
      <span class="status" data-key="dark">Off</span>
    </div>
    <div class="toggle-row">
      <span class="toggle-label">Notifications</span>
      <div class="toggle" data-key="notif" role="switch" aria-checked="false" tabindex="0">
        <div class="track"><div class="thumb"></div></div>
      </div>
      <span class="status" data-key="notif">Off</span>
    </div>
    <div class="toggle-row">
      <span class="toggle-label">Auto-Save</span>
      <div class="toggle on" data-key="auto" role="switch" aria-checked="true" tabindex="0">
        <div class="track"><div class="thumb"></div></div>
      </div>
      <span class="status" data-key="auto">On</span>
    </div>
    <div class="toggle-row disabled">
      <span class="toggle-label">Premium Feature</span>
      <div class="toggle disabled" data-key="premium" role="switch" aria-checked="false" aria-disabled="true" tabindex="-1">
        <div class="track"><div class="thumb"></div></div>
      </div>
      <span class="status" data-key="premium">Locked</span>
    </div>
  </div>
  <pre id="form-value" class="form-value"></pre>
</div>`,
      css: `.toggle-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.toggle-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: #1e293b;
  border-radius: 8px;
}

.toggle-row.disabled {
  opacity: 0.5;
}

.toggle-label {
  flex: 1;
  font-size: 14px;
  color: #e2e8f0;
}

.toggle {
  cursor: pointer;
  outline: none;
}

.toggle.disabled {
  cursor: not-allowed;
}

.toggle:focus-visible .track {
  box-shadow: 0 0 0 2px #ef4444;
}

.track {
  width: 44px;
  height: 24px;
  background: #334155;
  border-radius: 12px;
  padding: 2px;
  transition: background 0.2s;
}

.toggle.on .track {
  background: #ef4444;
}

.thumb {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.toggle.on .thumb {
  transform: translateX(20px);
}

.status {
  font-size: 12px;
  color: #64748b;
  min-width: 30px;
}

.form-value {
  padding: 10px 14px;
  background: #1e293b;
  border-radius: 8px;
  font-size: 12px;
  color: #94a3b8;
  font-family: monospace;
}`,
      js: `// Simulating Angular toggle switch with ControlValueAccessor
const state = { dark: false, notif: false, auto: true, premium: false };

function updateDisplay() {
  Object.keys(state).forEach(key => {
    const toggle = document.querySelector('.toggle[data-key="' + key + '"]');
    const status = document.querySelector('.status[data-key="' + key + '"]');
    if (key === 'premium') return;
    toggle.classList.toggle('on', state[key]);
    toggle.setAttribute('aria-checked', state[key]);
    status.textContent = state[key] ? 'On' : 'Off';
  });
  document.getElementById('form-value').textContent = JSON.stringify(state, null, 2);
}

document.querySelectorAll('.toggle:not(.disabled)').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const key = toggle.dataset.key;
    state[key] = !state[key];
    updateDisplay();
  });
  toggle.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggle.click();
    }
  });
});

updateDisplay();`,
    },
  },
  // ===== BATCH 1: forms-input (10 patterns) =====
  {
    id: 'ng-rating-stars',
    title: 'Star Rating Input',
    category: 'forms-input',
    difficulty: 'beginner',
    description:
      'Build an interactive star rating component that lets users click to rate from 1 to 5 stars with hover preview and keyboard accessibility.',
    concepts: ['custom form control', 'event handling', 'aria attributes'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Star Rating</h3>
  <div id="stars" role="radiogroup" aria-label="Rating">
    <span class="star" data-value="1" role="radio" tabindex="0" aria-label="1 star">&#9733;</span>
    <span class="star" data-value="2" role="radio" tabindex="0" aria-label="2 stars">&#9733;</span>
    <span class="star" data-value="3" role="radio" tabindex="0" aria-label="3 stars">&#9733;</span>
    <span class="star" data-value="4" role="radio" tabindex="0" aria-label="4 stars">&#9733;</span>
    <span class="star" data-value="5" role="radio" tabindex="0" aria-label="5 stars">&#9733;</span>
  </div>
  <p id="rating-text" class="value">No rating selected</p>
  <p class="note">Angular patterns use ControlValueAccessor. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `#stars { display: flex; gap: 8px; justify-content: center; margin: 20px 0; }
.star { font-size: 32px; color: #334155; cursor: pointer; transition: color 0.15s, transform 0.15s; }
.star:hover, .star.hovered { color: #facc15; transform: scale(1.2); }
.star.active { color: #facc15; }
.value { text-align: center; color: #94a3b8; font-size: 14px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular star rating behavior
let rating = 0;
const stars = document.querySelectorAll('.star');
const text = document.getElementById('rating-text');

stars.forEach(star => {
  star.addEventListener('click', () => {
    rating = parseInt(star.dataset.value);
    updateStars();
  });
  star.addEventListener('mouseenter', () => {
    const val = parseInt(star.dataset.value);
    stars.forEach(s => s.classList.toggle('hovered', parseInt(s.dataset.value) <= val));
  });
  star.addEventListener('mouseleave', () => {
    stars.forEach(s => s.classList.remove('hovered'));
  });
  star.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); star.click(); }
  });
});

function updateStars() {
  stars.forEach(s => s.classList.toggle('active', parseInt(s.dataset.value) <= rating));
  text.textContent = rating + ' out of 5 stars';
}`,
    },
  },
  {
    id: 'ng-tag-input',
    title: 'Tag Input',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Create a tag input component where users can add and remove tags by typing and pressing Enter or comma, with duplicate prevention and a removable chip UI.',
    concepts: ['custom input', 'chip list', 'keyboard events', 'form integration'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Tag Input</h3>
  <div id="tag-container" class="tag-container">
    <div id="tags"></div>
    <input id="tag-input" placeholder="Type and press Enter..." />
  </div>
  <p id="count" class="count">0 tags</p>
  <p class="note">Angular patterns use reactive forms with chip list. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.tag-container { display: flex; flex-wrap: wrap; gap: 6px; padding: 8px; border: 1px solid #334155; border-radius: 8px; background: #1e293b; align-items: center; }
.tag-container:focus-within { border-color: #ef4444; }
#tags { display: flex; flex-wrap: wrap; gap: 6px; }
.tag { display: flex; align-items: center; gap: 4px; background: #ef4444; color: white; padding: 4px 10px; border-radius: 14px; font-size: 13px; }
.tag .remove { cursor: pointer; font-weight: bold; margin-left: 2px; }
#tag-input { flex: 1; min-width: 100px; border: none; background: transparent; color: #e2e8f0; outline: none; padding: 6px; font-size: 14px; }
.count { font-size: 12px; color: #64748b; margin-top: 8px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular tag input behavior
const tags = [];
const input = document.getElementById('tag-input');
const tagsEl = document.getElementById('tags');
const countEl = document.getElementById('count');

function render() {
  tagsEl.innerHTML = tags.map((t, i) =>
    '<span class="tag">' + t + '<span class="remove" data-index="' + i + '">&times;</span></span>'
  ).join('');
  countEl.textContent = tags.length + ' tag' + (tags.length !== 1 ? 's' : '');
  tagsEl.querySelectorAll('.remove').forEach(btn => {
    btn.addEventListener('click', () => { tags.splice(parseInt(btn.dataset.index), 1); render(); });
  });
}

input.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ',') && input.value.trim()) {
    e.preventDefault();
    const val = input.value.trim().replace(',', '');
    if (val && !tags.includes(val)) { tags.push(val); input.value = ''; render(); }
  }
  if (e.key === 'Backspace' && !input.value && tags.length) { tags.pop(); render(); }
});
render();`,
    },
  },
  {
    id: 'ng-multi-select',
    title: 'Multi-Select Dropdown',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Build a multi-select dropdown that displays selected items as chips, supports search filtering, and integrates with Angular forms.',
    concepts: ['multi-select', 'dropdown', 'search filter', 'chip display'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Multi-Select</h3>
  <div id="select-box" class="select-box">
    <div id="selected" class="selected">Select items...</div>
    <span class="arrow">&#9662;</span>
  </div>
  <div id="dropdown" class="dropdown" style="display:none">
    <input id="search" class="search" placeholder="Search..." />
    <div id="options"></div>
  </div>
  <p class="note">Angular patterns use MatSelect with multiple. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.select-box { display: flex; align-items: center; padding: 10px 12px; border: 1px solid #334155; border-radius: 8px; background: #1e293b; cursor: pointer; }
.selected { flex: 1; color: #94a3b8; font-size: 14px; display: flex; flex-wrap: wrap; gap: 4px; }
.selected .chip { background: #ef4444; color: white; padding: 2px 8px; border-radius: 10px; font-size: 12px; }
.arrow { color: #64748b; }
.dropdown { border: 1px solid #334155; border-radius: 8px; background: #1e293b; margin-top: 4px; max-height: 200px; overflow-y: auto; }
.search { width: 100%; padding: 8px; border: none; border-bottom: 1px solid #334155; background: transparent; color: #e2e8f0; outline: none; }
.option { padding: 8px 12px; cursor: pointer; font-size: 14px; color: #e2e8f0; }
.option:hover { background: #334155; }
.option.selected-opt { background: rgba(239,68,68,0.15); }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular multi-select behavior
const items = ['TypeScript', 'JavaScript', 'Python', 'Rust', 'Go', 'Java', 'C++', 'Swift'];
const chosen = new Set();
const box = document.getElementById('select-box');
const dd = document.getElementById('dropdown');
const selEl = document.getElementById('selected');
const optEl = document.getElementById('options');
const search = document.getElementById('search');

function render() {
  const filtered = items.filter(i => i.toLowerCase().includes(search.value.toLowerCase()));
  optEl.innerHTML = filtered.map(i =>
    '<div class="option' + (chosen.has(i) ? ' selected-opt' : '') + '" data-val="' + i + '">' + (chosen.has(i) ? '&#10003; ' : '') + i + '</div>'
  ).join('');
  optEl.querySelectorAll('.option').forEach(o => {
    o.addEventListener('click', () => { chosen.has(o.dataset.val) ? chosen.delete(o.dataset.val) : chosen.add(o.dataset.val); render(); });
  });
  selEl.innerHTML = chosen.size ? [...chosen].map(c => '<span class="chip">' + c + '</span>').join('') : 'Select items...';
}

box.addEventListener('click', () => { dd.style.display = dd.style.display === 'none' ? 'block' : 'none'; });
search.addEventListener('input', render);
render();`,
    },
  },
  {
    id: 'ng-otp-input',
    title: 'OTP Input',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Create a one-time password input with individual digit boxes that auto-focus to the next field, supporting paste and backspace navigation.',
    concepts: ['auto-focus', 'input masking', 'paste handling', 'form validation'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Enter OTP</h3>
  <div id="otp-group" class="otp-group">
    <input class="otp" maxlength="1" data-index="0" />
    <input class="otp" maxlength="1" data-index="1" />
    <input class="otp" maxlength="1" data-index="2" />
    <input class="otp" maxlength="1" data-index="3" />
    <input class="otp" maxlength="1" data-index="4" />
    <input class="otp" maxlength="1" data-index="5" />
  </div>
  <p id="otp-result" class="result"></p>
  <p class="note">Angular patterns use custom form controls. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.otp-group { display: flex; gap: 10px; justify-content: center; margin: 20px 0; }
.otp { width: 48px; height: 56px; text-align: center; font-size: 24px; font-weight: 700; border: 2px solid #334155; border-radius: 10px; background: #1e293b; color: #e2e8f0; outline: none; }
.otp:focus { border-color: #ef4444; }
.otp.filled { border-color: #22c55e; }
.result { text-align: center; font-size: 14px; color: #22c55e; min-height: 20px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular OTP input behavior
const inputs = document.querySelectorAll('.otp');
const result = document.getElementById('otp-result');

inputs.forEach((inp, i) => {
  inp.addEventListener('input', () => {
    inp.value = inp.value.replace(/[^0-9]/g, '');
    if (inp.value && i < inputs.length - 1) inputs[i + 1].focus();
    inp.classList.toggle('filled', !!inp.value);
    checkComplete();
  });
  inp.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !inp.value && i > 0) inputs[i - 1].focus();
  });
  inp.addEventListener('paste', (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    data.split('').forEach((ch, j) => { if (inputs[j]) { inputs[j].value = ch; inputs[j].classList.add('filled'); } });
    if (data.length > 0) inputs[Math.min(data.length, 5)].focus();
    checkComplete();
  });
});

function checkComplete() {
  const code = [...inputs].map(i => i.value).join('');
  result.textContent = code.length === 6 ? 'Code entered: ' + code : '';
}
inputs[0].focus();`,
    },
  },
  {
    id: 'ng-credit-card-input',
    title: 'Credit Card Input',
    category: 'forms-input',
    difficulty: 'advanced',
    description:
      'Build a credit card form with automatic formatting, card type detection (Visa, MasterCard, Amex), and real-time validation with visual feedback.',
    concepts: ['input masking', 'card detection', 'real-time validation', 'formatting'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Credit Card</h3>
  <div class="card-preview" id="card-preview">
    <div class="card-type" id="card-type">Card</div>
    <div class="card-number" id="card-display">**** **** **** ****</div>
    <div class="card-bottom"><span id="card-name">CARDHOLDER</span><span id="card-exp">MM/YY</span></div>
  </div>
  <div class="form-group"><label>Card Number</label><input id="cc-number" placeholder="1234 5678 9012 3456" maxlength="19" /></div>
  <div class="row"><div class="form-group half"><label>Expiry</label><input id="cc-exp" placeholder="MM/YY" maxlength="5" /></div>
  <div class="form-group half"><label>CVC</label><input id="cc-cvc" placeholder="123" maxlength="4" /></div></div>
  <div class="form-group"><label>Name</label><input id="cc-name" placeholder="Cardholder name" /></div>
  <p class="note">Angular patterns use custom validators and input directives. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.card-preview { background: linear-gradient(135deg, #ef4444, #b91c1c); border-radius: 12px; padding: 20px; margin-bottom: 16px; color: white; }
.card-type { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; }
.card-number { font-size: 20px; letter-spacing: 3px; font-family: monospace; margin-bottom: 12px; }
.card-bottom { display: flex; justify-content: space-between; font-size: 12px; text-transform: uppercase; }
.form-group { margin-bottom: 12px; }
.row { display: flex; gap: 12px; }
.half { flex: 1; }
label { display: block; font-size: 12px; color: #94a3b8; margin-bottom: 4px; }
input { width: 100%; padding: 10px; border: 1px solid #334155; border-radius: 8px; background: #1e293b; color: #e2e8f0; outline: none; font-size: 14px; }
input:focus { border-color: #ef4444; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular credit card input behavior
const ccNum = document.getElementById('cc-number');
const ccExp = document.getElementById('cc-exp');
const ccName = document.getElementById('cc-name');

ccNum.addEventListener('input', () => {
  let v = ccNum.value.replace(/\\D/g, '').slice(0, 16);
  ccNum.value = v.replace(/(\\d{4})(?=\\d)/g, '$1 ');
  document.getElementById('card-display').textContent = ccNum.value || '**** **** **** ****';
  const type = v.startsWith('4') ? 'Visa' : v.startsWith('5') ? 'MasterCard' : v.startsWith('3') ? 'Amex' : 'Card';
  document.getElementById('card-type').textContent = type;
});

ccExp.addEventListener('input', () => {
  let v = ccExp.value.replace(/\\D/g, '').slice(0, 4);
  if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
  ccExp.value = v;
  document.getElementById('card-exp').textContent = v || 'MM/YY';
});

ccName.addEventListener('input', () => {
  document.getElementById('card-name').textContent = ccName.value.toUpperCase() || 'CARDHOLDER';
});`,
    },
  },
  {
    id: 'ng-address-form',
    title: 'Address Form',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Create a multi-field address form with dependent dropdowns for country/state, postal code validation, and auto-formatting.',
    concepts: ['dependent selects', 'form groups', 'conditional validation', 'auto-format'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Address Form</h3>
  <div class="form-group"><label>Street</label><input id="street" placeholder="123 Main St" /></div>
  <div class="form-group"><label>City</label><input id="city" placeholder="City" /></div>
  <div class="row">
    <div class="form-group half"><label>Country</label><select id="country"><option value="">Select</option><option value="US">United States</option><option value="CA">Canada</option><option value="UK">United Kingdom</option></select></div>
    <div class="form-group half"><label>State/Province</label><select id="state"><option value="">Select country first</option></select></div>
  </div>
  <div class="form-group"><label>Postal Code</label><input id="postal" placeholder="Postal code" /></div>
  <div id="summary" class="summary" style="display:none"></div>
  <p class="note">Angular patterns use FormGroup with dependent controls. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.form-group { margin-bottom: 12px; }
.row { display: flex; gap: 12px; }
.half { flex: 1; }
label { display: block; font-size: 12px; color: #94a3b8; margin-bottom: 4px; }
input, select { width: 100%; padding: 10px; border: 1px solid #334155; border-radius: 8px; background: #1e293b; color: #e2e8f0; outline: none; font-size: 14px; }
input:focus, select:focus { border-color: #ef4444; }
.summary { padding: 12px; background: rgba(239,68,68,0.1); border-radius: 8px; font-size: 13px; color: #e2e8f0; margin-top: 12px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular address form behavior
const states = { US: ['California', 'New York', 'Texas'], CA: ['Ontario', 'Quebec', 'BC'], UK: ['England', 'Scotland', 'Wales'] };
const country = document.getElementById('country');
const state = document.getElementById('state');

country.addEventListener('change', () => {
  const opts = states[country.value] || [];
  state.innerHTML = opts.length ? opts.map(s => '<option>' + s + '</option>').join('') : '<option>Select country first</option>';
  updateSummary();
});

document.querySelectorAll('input, select').forEach(el => el.addEventListener('input', updateSummary));

function updateSummary() {
  const street = document.getElementById('street').value;
  const city = document.getElementById('city').value;
  const el = document.getElementById('summary');
  if (street && city) {
    el.style.display = 'block';
    el.textContent = street + ', ' + city + (state.value ? ', ' + state.value : '') + (country.value ? ' (' + country.value + ')' : '') + ' ' + document.getElementById('postal').value;
  } else { el.style.display = 'none'; }
}`,
    },
  },
  {
    id: 'ng-survey-form',
    title: 'Survey Form Builder',
    category: 'forms-input',
    difficulty: 'advanced',
    description:
      'Build a dynamic survey form that renders questions from a configuration array, supporting text, radio, checkbox, and rating question types with validation.',
    concepts: ['dynamic forms', 'FormArray', 'conditional rendering', 'survey logic'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Survey</h3>
  <div id="questions"></div>
  <button id="submit-btn" onclick="submitSurvey()">Submit Survey</button>
  <div id="results" class="results" style="display:none"></div>
  <p class="note">Angular patterns use FormArray for dynamic surveys. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.question { margin-bottom: 16px; padding: 12px; background: #1e293b; border-radius: 8px; border: 1px solid #334155; }
.question label { display: block; font-size: 14px; color: #e2e8f0; margin-bottom: 8px; font-weight: 600; }
.question input[type="text"] { width: 100%; padding: 8px; border: 1px solid #334155; border-radius: 6px; background: #0f172a; color: #e2e8f0; outline: none; }
.question input[type="text"]:focus { border-color: #ef4444; }
.radio-group label, .check-group label { font-weight: normal; font-size: 13px; color: #94a3b8; display: flex; align-items: center; gap: 6px; margin: 4px 0; }
button { width: 100%; padding: 12px; border: none; border-radius: 8px; background: #ef4444; color: white; font-weight: 600; cursor: pointer; margin-top: 8px; }
button:hover { background: #dc2626; }
.results { margin-top: 12px; padding: 12px; background: rgba(239,68,68,0.1); border-radius: 8px; font-size: 13px; color: #e2e8f0; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular survey form behavior
const questions = [
  { id: 'q1', text: 'What is your name?', type: 'text' },
  { id: 'q2', text: 'How do you rate Angular?', type: 'radio', options: ['Excellent', 'Good', 'Fair', 'Poor'] },
  { id: 'q3', text: 'Which features do you use?', type: 'checkbox', options: ['Components', 'Services', 'Pipes', 'Directives'] }
];

const qEl = document.getElementById('questions');
questions.forEach(q => {
  let html = '<div class="question"><label>' + q.text + '</label>';
  if (q.type === 'text') html += '<input type="text" id="' + q.id + '" />';
  else if (q.type === 'radio') html += '<div class="radio-group">' + q.options.map(o => '<label><input type="radio" name="' + q.id + '" value="' + o + '" /> ' + o + '</label>').join('') + '</div>';
  else if (q.type === 'checkbox') html += '<div class="check-group">' + q.options.map(o => '<label><input type="checkbox" name="' + q.id + '" value="' + o + '" /> ' + o + '</label>').join('') + '</div>';
  html += '</div>';
  qEl.innerHTML += html;
});

window.submitSurvey = function() {
  const answers = {};
  questions.forEach(q => {
    if (q.type === 'text') answers[q.id] = document.getElementById(q.id).value;
    else if (q.type === 'radio') { const c = document.querySelector('input[name="' + q.id + '"]:checked'); answers[q.id] = c ? c.value : 'N/A'; }
    else if (q.type === 'checkbox') answers[q.id] = [...document.querySelectorAll('input[name="' + q.id + '"]:checked')].map(c => c.value);
  });
  const el = document.getElementById('results');
  el.style.display = 'block';
  el.innerHTML = '<strong>Responses:</strong><br/>' + Object.entries(answers).map(([k, v]) => k + ': ' + (Array.isArray(v) ? v.join(', ') : v)).join('<br/>');
};`,
    },
  },
  {
    id: 'ng-textarea-autogrow',
    title: 'Auto-Growing Textarea',
    category: 'forms-input',
    difficulty: 'beginner',
    description:
      'Create a textarea that automatically expands its height as the user types, with a character counter and maximum height constraint.',
    concepts: ['auto-resize', 'scrollHeight', 'character count', 'max-height'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Auto-Growing Textarea</h3>
  <div class="textarea-wrap">
    <textarea id="auto-textarea" placeholder="Start typing... the textarea will grow automatically." rows="2"></textarea>
    <span id="char-count" class="char-count">0 / 500</span>
  </div>
  <p class="note">Angular patterns use cdkTextareaAutosize directive. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.textarea-wrap { position: relative; }
textarea { width: 100%; padding: 12px; border: 1px solid #334155; border-radius: 8px; background: #1e293b; color: #e2e8f0; outline: none; resize: none; font-size: 14px; line-height: 1.5; min-height: 60px; max-height: 200px; overflow-y: auto; font-family: inherit; }
textarea:focus { border-color: #ef4444; }
.char-count { position: absolute; bottom: 8px; right: 12px; font-size: 11px; color: #64748b; }
.char-count.warn { color: #ef4444; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular cdkTextareaAutosize behavior
const textarea = document.getElementById('auto-textarea');
const counter = document.getElementById('char-count');
const MAX = 500;

textarea.addEventListener('input', () => {
  if (textarea.value.length > MAX) textarea.value = textarea.value.slice(0, MAX);
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
  counter.textContent = textarea.value.length + ' / ' + MAX;
  counter.classList.toggle('warn', textarea.value.length > MAX * 0.9);
});`,
    },
  },
  {
    id: 'ng-phone-input',
    title: 'Phone Number Input',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Build a phone number input with country code selector, automatic formatting based on the selected country, and real-time validation.',
    concepts: ['input formatting', 'country codes', 'validation patterns', 'select integration'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Phone Input</h3>
  <div class="phone-wrap">
    <select id="country-code">
      <option value="+1">+1 US</option>
      <option value="+44">+44 UK</option>
      <option value="+81">+81 JP</option>
      <option value="+91">+91 IN</option>
    </select>
    <input id="phone" placeholder="(555) 123-4567" />
  </div>
  <p id="phone-display" class="display"></p>
  <p class="note">Angular patterns use custom form controls with formatters. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.phone-wrap { display: flex; gap: 8px; }
select { padding: 10px; border: 1px solid #334155; border-radius: 8px; background: #1e293b; color: #e2e8f0; outline: none; font-size: 14px; min-width: 90px; }
select:focus { border-color: #ef4444; }
input { flex: 1; padding: 10px; border: 1px solid #334155; border-radius: 8px; background: #1e293b; color: #e2e8f0; outline: none; font-size: 14px; }
input:focus { border-color: #ef4444; }
.display { margin-top: 12px; font-size: 14px; color: #94a3b8; text-align: center; min-height: 20px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular phone input behavior
const phone = document.getElementById('phone');
const code = document.getElementById('country-code');
const display = document.getElementById('phone-display');

phone.addEventListener('input', () => {
  let v = phone.value.replace(/\\D/g, '').slice(0, 10);
  if (v.length >= 6) v = '(' + v.slice(0,3) + ') ' + v.slice(3,6) + '-' + v.slice(6);
  else if (v.length >= 3) v = '(' + v.slice(0,3) + ') ' + v.slice(3);
  phone.value = v;
  updateDisplay();
});

code.addEventListener('change', updateDisplay);

function updateDisplay() {
  const raw = phone.value.replace(/\\D/g, '');
  display.textContent = raw ? code.value + ' ' + phone.value : '';
}`,
    },
  },
  {
    id: 'ng-currency-input',
    title: 'Currency Input',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Create a currency input that formats numbers with thousand separators, decimal precision, and a currency symbol selector, updating in real-time.',
    concepts: ['number formatting', 'locale-aware', 'Intl.NumberFormat', 'currency symbols'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Currency Input</h3>
  <div class="currency-wrap">
    <select id="currency-sel">
      <option value="USD">$ USD</option>
      <option value="EUR">&euro; EUR</option>
      <option value="GBP">&pound; GBP</option>
      <option value="JPY">&yen; JPY</option>
    </select>
    <input id="amount" placeholder="0.00" />
  </div>
  <p id="formatted" class="formatted"></p>
  <p class="note">Angular patterns use CurrencyPipe and custom directives. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.currency-wrap { display: flex; gap: 8px; }
select { padding: 10px; border: 1px solid #334155; border-radius: 8px; background: #1e293b; color: #e2e8f0; outline: none; font-size: 14px; }
input { flex: 1; padding: 10px; border: 1px solid #334155; border-radius: 8px; background: #1e293b; color: #e2e8f0; outline: none; font-size: 14px; text-align: right; }
input:focus, select:focus { border-color: #ef4444; }
.formatted { text-align: center; font-size: 20px; color: #ef4444; font-weight: 700; margin-top: 16px; min-height: 28px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular currency input behavior
const amount = document.getElementById('amount');
const curr = document.getElementById('currency-sel');
const formatted = document.getElementById('formatted');

amount.addEventListener('input', () => {
  amount.value = amount.value.replace(/[^0-9.]/g, '');
  updateFormatted();
});

curr.addEventListener('change', updateFormatted);

function updateFormatted() {
  const val = parseFloat(amount.value);
  if (isNaN(val)) { formatted.textContent = ''; return; }
  formatted.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: curr.value }).format(val);
}`,
    },
  },
  // ===== BATCH 2: remaining forms-input (7) + interactive start (3) =====
  {
    id: 'ng-slider-range',
    title: 'Range Slider',
    category: 'forms-input',
    difficulty: 'beginner',
    description:
      'Build a range slider with min/max labels, current value display, and customizable step size for numeric input.',
    concepts: ['range input', 'custom styling', 'value binding', 'step control'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Range Slider</h3>
  <div class="slider-wrap">
    <label>Volume</label>
    <input type="range" id="slider" min="0" max="100" value="50" step="1" />
    <div class="labels"><span>0</span><span id="slider-val" class="current">50</span><span>100</span></div>
  </div>
  <div class="slider-wrap">
    <label>Price Range</label>
    <input type="range" id="slider2" min="0" max="1000" value="250" step="50" />
    <div class="labels"><span>$0</span><span id="slider2-val" class="current">$250</span><span>$1000</span></div>
  </div>
  <p class="note">Angular patterns use MatSlider component. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.slider-wrap { margin-bottom: 20px; }
label { display: block; font-size: 13px; color: #94a3b8; margin-bottom: 8px; }
input[type="range"] { width: 100%; accent-color: #ef4444; height: 6px; cursor: pointer; }
.labels { display: flex; justify-content: space-between; font-size: 12px; color: #64748b; margin-top: 4px; }
.current { color: #ef4444; font-weight: 700; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular range slider behavior
document.getElementById('slider').addEventListener('input', (e) => {
  document.getElementById('slider-val').textContent = e.target.value;
});
document.getElementById('slider2').addEventListener('input', (e) => {
  document.getElementById('slider2-val').textContent = '$' + e.target.value;
});`,
    },
  },
  {
    id: 'ng-toggle-group',
    title: 'Toggle Button Group',
    category: 'forms-input',
    difficulty: 'beginner',
    description:
      'Create a group of toggle buttons where only one can be active at a time, functioning like a radio group with visual button styling.',
    concepts: ['button group', 'exclusive selection', 'aria-pressed', 'form value'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Toggle Group</h3>
  <label class="label">Select Size</label>
  <div id="toggle-group" class="toggle-group" role="radiogroup">
    <button class="toggle-btn" data-value="S" role="radio" aria-checked="false">S</button>
    <button class="toggle-btn" data-value="M" role="radio" aria-checked="false">M</button>
    <button class="toggle-btn active" data-value="L" role="radio" aria-checked="true">L</button>
    <button class="toggle-btn" data-value="XL" role="radio" aria-checked="false">XL</button>
  </div>
  <p id="toggle-val" class="value">Selected: L</p>
  <p class="note">Angular patterns use MatButtonToggleGroup. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.label { font-size: 13px; color: #94a3b8; display: block; margin-bottom: 8px; }
.toggle-group { display: flex; gap: 0; border-radius: 8px; overflow: hidden; border: 1px solid #334155; }
.toggle-btn { flex: 1; padding: 10px 16px; border: none; background: #1e293b; color: #94a3b8; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
.toggle-btn:not(:last-child) { border-right: 1px solid #334155; }
.toggle-btn:hover { background: #334155; }
.toggle-btn.active { background: #ef4444; color: white; }
.value { text-align: center; margin-top: 12px; font-size: 14px; color: #e2e8f0; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular toggle group behavior
const btns = document.querySelectorAll('.toggle-btn');
const val = document.getElementById('toggle-val');

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    btns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-checked', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-checked', 'true');
    val.textContent = 'Selected: ' + btn.dataset.value;
  });
});`,
    },
  },
  {
    id: 'ng-segmented-control',
    title: 'Segmented Control',
    category: 'forms-input',
    difficulty: 'beginner',
    description:
      'Build a segmented control (iOS-style) with a sliding indicator that animates between segments when the user selects an option.',
    concepts: ['segmented control', 'sliding indicator', 'CSS transitions', 'selection state'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Segmented Control</h3>
  <div class="segment-wrap">
    <div id="indicator" class="indicator"></div>
    <button class="segment active" data-index="0">Daily</button>
    <button class="segment" data-index="1">Weekly</button>
    <button class="segment" data-index="2">Monthly</button>
  </div>
  <p id="seg-val" class="value">View: Daily</p>
  <p class="note">Angular patterns use custom segmented control directives. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.segment-wrap { display: flex; position: relative; background: #1e293b; border-radius: 10px; padding: 4px; }
.indicator { position: absolute; top: 4px; left: 4px; width: calc(33.33% - 3px); height: calc(100% - 8px); background: #ef4444; border-radius: 8px; transition: transform 0.25s ease; }
.segment { flex: 1; padding: 10px; border: none; background: transparent; color: #94a3b8; font-size: 14px; font-weight: 600; cursor: pointer; position: relative; z-index: 1; transition: color 0.2s; }
.segment.active { color: white; }
.value { text-align: center; margin-top: 16px; font-size: 14px; color: #e2e8f0; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular segmented control behavior
const segs = document.querySelectorAll('.segment');
const indicator = document.getElementById('indicator');
const segVal = document.getElementById('seg-val');

segs.forEach(seg => {
  seg.addEventListener('click', () => {
    segs.forEach(s => s.classList.remove('active'));
    seg.classList.add('active');
    const idx = parseInt(seg.dataset.index);
    indicator.style.transform = 'translateX(' + (idx * 100) + '%)';
    segVal.textContent = 'View: ' + seg.textContent;
  });
});`,
    },
  },
  {
    id: 'ng-combobox',
    title: 'Combobox',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Create a combobox that combines a text input with a filterable dropdown list, supporting keyboard navigation, selection, and custom value entry.',
    concepts: ['combobox pattern', 'aria-combobox', 'keyboard navigation', 'filtering'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Combobox</h3>
  <div class="combo-wrap">
    <input id="combo-input" role="combobox" aria-expanded="false" placeholder="Type to search..." autocomplete="off" />
    <div id="combo-list" class="combo-list" role="listbox" style="display:none"></div>
  </div>
  <p id="combo-val" class="value"></p>
  <p class="note">Angular patterns use MatAutocomplete. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.combo-wrap { position: relative; }
input { width: 100%; padding: 10px 12px; border: 1px solid #334155; border-radius: 8px; background: #1e293b; color: #e2e8f0; outline: none; font-size: 14px; }
input:focus { border-color: #ef4444; }
.combo-list { position: absolute; top: 100%; left: 0; right: 0; background: #1e293b; border: 1px solid #334155; border-radius: 8px; margin-top: 4px; max-height: 180px; overflow-y: auto; z-index: 10; }
.combo-item { padding: 8px 12px; cursor: pointer; font-size: 14px; color: #e2e8f0; }
.combo-item:hover, .combo-item.highlighted { background: #334155; }
.value { margin-top: 12px; font-size: 14px; color: #94a3b8; text-align: center; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular combobox behavior
const items = ['Angular', 'React', 'Vue', 'Svelte', 'Next.js', 'Nuxt', 'Remix', 'Astro', 'SolidJS', 'Qwik'];
const input = document.getElementById('combo-input');
const list = document.getElementById('combo-list');
const valEl = document.getElementById('combo-val');
let highlighted = -1;

input.addEventListener('input', () => {
  const q = input.value.toLowerCase();
  const filtered = items.filter(i => i.toLowerCase().includes(q));
  list.innerHTML = filtered.map((i, idx) => '<div class="combo-item" data-idx="' + idx + '">' + i + '</div>').join('');
  list.style.display = filtered.length ? 'block' : 'none';
  input.setAttribute('aria-expanded', filtered.length ? 'true' : 'false');
  highlighted = -1;
  list.querySelectorAll('.combo-item').forEach(el => {
    el.addEventListener('click', () => { input.value = el.textContent; list.style.display = 'none'; valEl.textContent = 'Selected: ' + el.textContent; });
  });
});

input.addEventListener('keydown', (e) => {
  const items = list.querySelectorAll('.combo-item');
  if (e.key === 'ArrowDown') { e.preventDefault(); highlighted = Math.min(highlighted + 1, items.length - 1); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); highlighted = Math.max(highlighted - 1, 0); }
  else if (e.key === 'Enter' && highlighted >= 0 && items[highlighted]) { input.value = items[highlighted].textContent; list.style.display = 'none'; valEl.textContent = 'Selected: ' + input.value; }
  items.forEach((el, i) => el.classList.toggle('highlighted', i === highlighted));
});

input.addEventListener('blur', () => { setTimeout(() => { list.style.display = 'none'; }, 200); });`,
    },
  },
  {
    id: 'ng-mentions-input',
    title: 'Mentions Input',
    category: 'forms-input',
    difficulty: 'advanced',
    description:
      'Build an input that detects @ mentions, shows a user suggestion dropdown, and highlights mentioned users inline with styled tags.',
    concepts: ['mention detection', 'suggestion popup', 'contenteditable', 'text parsing'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Mentions Input</h3>
  <div id="editor" class="editor" contenteditable="true" data-placeholder="Type @ to mention someone..."></div>
  <div id="suggestions" class="suggestions" style="display:none"></div>
  <p id="mentions-list" class="mentions-list"></p>
  <p class="note">Angular patterns use custom directives for mention detection. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.editor { min-height: 80px; padding: 12px; border: 1px solid #334155; border-radius: 8px; background: #1e293b; color: #e2e8f0; outline: none; font-size: 14px; line-height: 1.6; }
.editor:focus { border-color: #ef4444; }
.editor:empty:before { content: attr(data-placeholder); color: #64748b; }
.editor .mention { color: #ef4444; font-weight: 600; }
.suggestions { border: 1px solid #334155; border-radius: 8px; background: #1e293b; margin-top: 4px; max-height: 150px; overflow-y: auto; }
.sug-item { padding: 8px 12px; cursor: pointer; font-size: 14px; color: #e2e8f0; }
.sug-item:hover { background: #334155; }
.mentions-list { font-size: 12px; color: #64748b; margin-top: 8px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular mentions input behavior
const users = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'];
const editor = document.getElementById('editor');
const sugs = document.getElementById('suggestions');
const mentionsList = document.getElementById('mentions-list');

editor.addEventListener('input', () => {
  const text = editor.textContent;
  const match = text.match(/@(\\w*)$/);
  if (match) {
    const q = match[1].toLowerCase();
    const filtered = users.filter(u => u.toLowerCase().startsWith(q));
    sugs.innerHTML = filtered.map(u => '<div class="sug-item">' + u + '</div>').join('');
    sugs.style.display = filtered.length ? 'block' : 'none';
    sugs.querySelectorAll('.sug-item').forEach(el => {
      el.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const before = text.slice(0, text.lastIndexOf('@'));
        editor.innerHTML = before + '<span class="mention">@' + el.textContent + '</span>&nbsp;';
        sugs.style.display = 'none';
        placeCaretAtEnd();
        updateMentions();
      });
    });
  } else { sugs.style.display = 'none'; }
  updateMentions();
});

function updateMentions() {
  const mentions = [...editor.querySelectorAll('.mention')].map(m => m.textContent);
  mentionsList.textContent = mentions.length ? 'Mentioned: ' + mentions.join(', ') : '';
}

function placeCaretAtEnd() {
  const range = document.createRange();
  range.selectNodeContents(editor);
  range.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}`,
    },
  },
  {
    id: 'ng-code-input',
    title: 'Code Input with Syntax Hints',
    category: 'forms-input',
    difficulty: 'intermediate',
    description:
      'Create a code input field with monospace font, line numbers, tab key support, and basic syntax keyword highlighting.',
    concepts: ['code editor', 'tab handling', 'line numbers', 'monospace display'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Code Input</h3>
  <div class="code-wrap">
    <div id="line-numbers" class="line-numbers">1</div>
    <textarea id="code-editor" class="code-editor" spellcheck="false" placeholder="Write some code..."></textarea>
  </div>
  <p id="line-count" class="info">Lines: 1</p>
  <p class="note">Angular patterns use custom code editor components. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.code-wrap { display: flex; border: 1px solid #334155; border-radius: 8px; overflow: hidden; background: #0f172a; }
.line-numbers { padding: 12px 8px; background: #1e293b; color: #64748b; font-family: monospace; font-size: 13px; line-height: 1.5; text-align: right; min-width: 35px; user-select: none; }
.code-editor { flex: 1; padding: 12px; border: none; background: transparent; color: #e2e8f0; font-family: monospace; font-size: 13px; line-height: 1.5; outline: none; resize: none; min-height: 120px; tab-size: 2; }
.info { font-size: 12px; color: #64748b; margin-top: 8px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular code input behavior
const editor = document.getElementById('code-editor');
const lineNums = document.getElementById('line-numbers');
const lineCount = document.getElementById('line-count');

editor.addEventListener('input', updateLines);
editor.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = editor.selectionStart;
    editor.value = editor.value.slice(0, start) + '  ' + editor.value.slice(editor.selectionEnd);
    editor.selectionStart = editor.selectionEnd = start + 2;
    updateLines();
  }
});

function updateLines() {
  const lines = editor.value.split('\\n').length;
  lineNums.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br/>');
  lineCount.textContent = 'Lines: ' + lines;
}

editor.addEventListener('scroll', () => { lineNums.scrollTop = editor.scrollTop; });`,
    },
  },
  {
    id: 'ng-signature-pad',
    title: 'Signature Pad',
    category: 'forms-input',
    difficulty: 'advanced',
    description:
      'Build a canvas-based signature pad that captures drawn signatures, with clear and save functionality, integrating as a custom form control.',
    concepts: ['canvas drawing', 'mouse/touch events', 'toDataURL', 'custom form control'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Signature Pad</h3>
  <canvas id="sig-canvas" width="400" height="200"></canvas>
  <div class="actions">
    <button id="clear-btn" class="btn-secondary">Clear</button>
    <button id="save-btn" class="btn-primary">Save</button>
  </div>
  <div id="saved-sig" class="saved" style="display:none"><img id="sig-img" alt="Saved signature" /></div>
  <p class="note">Angular patterns use ControlValueAccessor for canvas forms. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `canvas { display: block; width: 100%; border: 2px dashed #334155; border-radius: 8px; background: #0f172a; cursor: crosshair; }
.actions { display: flex; gap: 8px; margin-top: 8px; }
.btn-primary { flex: 1; padding: 10px; border: none; border-radius: 8px; background: #ef4444; color: white; font-weight: 600; cursor: pointer; }
.btn-secondary { flex: 1; padding: 10px; border: 1px solid #334155; border-radius: 8px; background: transparent; color: #94a3b8; cursor: pointer; }
.btn-primary:hover { background: #dc2626; }
.btn-secondary:hover { background: #1e293b; }
.saved { margin-top: 12px; text-align: center; }
.saved img { max-width: 100%; border: 1px solid #334155; border-radius: 8px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular signature pad behavior
const canvas = document.getElementById('sig-canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
ctx.strokeStyle = '#e2e8f0';
ctx.lineWidth = 2;
ctx.lineCap = 'round';

canvas.addEventListener('mousedown', (e) => { drawing = true; ctx.beginPath(); ctx.moveTo(e.offsetX, e.offsetY); });
canvas.addEventListener('mousemove', (e) => { if (drawing) { ctx.lineTo(e.offsetX, e.offsetY); ctx.stroke(); } });
canvas.addEventListener('mouseup', () => { drawing = false; });
canvas.addEventListener('mouseleave', () => { drawing = false; });

canvas.addEventListener('touchstart', (e) => { e.preventDefault(); drawing = true; const r = canvas.getBoundingClientRect(); const t = e.touches[0]; ctx.beginPath(); ctx.moveTo(t.clientX - r.left, t.clientY - r.top); });
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); if (drawing) { const r = canvas.getBoundingClientRect(); const t = e.touches[0]; ctx.lineTo(t.clientX - r.left, t.clientY - r.top); ctx.stroke(); } });
canvas.addEventListener('touchend', () => { drawing = false; });

document.getElementById('clear-btn').addEventListener('click', () => { ctx.clearRect(0, 0, canvas.width, canvas.height); document.getElementById('saved-sig').style.display = 'none'; });
document.getElementById('save-btn').addEventListener('click', () => {
  const img = document.getElementById('sig-img');
  img.src = canvas.toDataURL();
  document.getElementById('saved-sig').style.display = 'block';
});`,
    },
  },
  // ===== Start interactive patterns =====
  {
    id: 'ng-tooltip',
    title: 'Tooltip',
    category: 'interactive',
    difficulty: 'beginner',
    description:
      'Create a tooltip directive that shows contextual information on hover or focus, supporting multiple positions (top, bottom, left, right).',
    concepts: ['tooltip', 'positioning', 'hover/focus events', 'directive pattern'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Tooltips</h3>
  <div class="demo-area">
    <button class="tip-trigger" data-tip="Save your changes" data-pos="top">Hover me (top)</button>
    <button class="tip-trigger" data-tip="Delete this item" data-pos="bottom">Hover me (bottom)</button>
    <button class="tip-trigger" data-tip="Edit settings" data-pos="left">Hover me (left)</button>
    <button class="tip-trigger" data-tip="View details" data-pos="right">Hover me (right)</button>
  </div>
  <p class="note">Angular patterns use MatTooltip directive. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.demo-area { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; padding: 40px 0; }
.tip-trigger { position: relative; padding: 10px 16px; border: 1px solid #334155; border-radius: 8px; background: #1e293b; color: #e2e8f0; cursor: pointer; font-size: 13px; }
.tip-trigger:hover { border-color: #ef4444; }
.tooltip { position: absolute; background: #ef4444; color: white; padding: 6px 10px; border-radius: 6px; font-size: 12px; white-space: nowrap; z-index: 10; pointer-events: none; }
.tooltip.top { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.tooltip.bottom { top: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.tooltip.left { right: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
.tooltip.right { left: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular tooltip directive behavior
document.querySelectorAll('.tip-trigger').forEach(el => {
  el.addEventListener('mouseenter', () => {
    const tip = document.createElement('div');
    tip.className = 'tooltip ' + el.dataset.pos;
    tip.textContent = el.dataset.tip;
    el.appendChild(tip);
  });
  el.addEventListener('mouseleave', () => {
    const tip = el.querySelector('.tooltip');
    if (tip) tip.remove();
  });
  el.addEventListener('focus', () => el.dispatchEvent(new Event('mouseenter')));
  el.addEventListener('blur', () => el.dispatchEvent(new Event('mouseleave')));
});`,
    },
  },
  {
    id: 'ng-popover',
    title: 'Popover',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Build a popover component that shows rich content on click, with automatic positioning, click-outside-to-close, and arrow pointer.',
    concepts: ['popover', 'click-outside', 'dynamic positioning', 'template projection'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Popover</h3>
  <div class="demo-area">
    <button id="pop-trigger" class="pop-trigger">Click for Popover</button>
    <div id="popover" class="popover" style="display:none">
      <div class="pop-arrow"></div>
      <div class="pop-header">Settings</div>
      <div class="pop-body">
        <label><input type="checkbox" checked /> Enable notifications</label>
        <label><input type="checkbox" /> Dark mode</label>
        <label><input type="checkbox" checked /> Auto-save</label>
      </div>
    </div>
  </div>
  <p class="note">Angular patterns use CdkOverlay for popovers. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.demo-area { display: flex; justify-content: center; padding: 40px 0; position: relative; }
.pop-trigger { padding: 10px 20px; border: none; border-radius: 8px; background: #ef4444; color: white; font-weight: 600; cursor: pointer; }
.pop-trigger:hover { background: #dc2626; }
.popover { position: absolute; top: calc(100% + 12px); left: 50%; transform: translateX(-50%); background: #1e293b; border: 1px solid #334155; border-radius: 10px; min-width: 220px; box-shadow: 0 8px 24px rgba(0,0,0,0.3); z-index: 10; }
.pop-arrow { position: absolute; top: -6px; left: 50%; transform: translateX(-50%) rotate(45deg); width: 12px; height: 12px; background: #1e293b; border-left: 1px solid #334155; border-top: 1px solid #334155; }
.pop-header { padding: 10px 14px; font-weight: 600; font-size: 14px; color: #e2e8f0; border-bottom: 1px solid #334155; }
.pop-body { padding: 10px 14px; }
.pop-body label { display: block; font-size: 13px; color: #94a3b8; margin: 6px 0; cursor: pointer; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular popover behavior
const trigger = document.getElementById('pop-trigger');
const popover = document.getElementById('popover');

trigger.addEventListener('click', (e) => {
  e.stopPropagation();
  popover.style.display = popover.style.display === 'none' ? 'block' : 'none';
});

document.addEventListener('click', (e) => {
  if (!popover.contains(e.target) && e.target !== trigger) popover.style.display = 'none';
});`,
    },
  },
  {
    id: 'ng-lightbox',
    title: 'Image Lightbox',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Create an image lightbox overlay that opens on thumbnail click, supporting previous/next navigation, keyboard controls, and close on backdrop click.',
    concepts: ['overlay', 'keyboard navigation', 'image gallery', 'focus trap'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Image Lightbox</h3>
  <div id="thumbs" class="thumbs">
    <div class="thumb" data-index="0" style="background:#ef4444">1</div>
    <div class="thumb" data-index="1" style="background:#3b82f6">2</div>
    <div class="thumb" data-index="2" style="background:#22c55e">3</div>
    <div class="thumb" data-index="3" style="background:#f59e0b">4</div>
  </div>
  <div id="lightbox" class="lightbox" style="display:none">
    <div class="lb-backdrop"></div>
    <div class="lb-content">
      <button class="lb-close">&times;</button>
      <button class="lb-prev">&#8249;</button>
      <div class="lb-image" id="lb-image"></div>
      <button class="lb-next">&#8250;</button>
    </div>
    <div class="lb-counter" id="lb-counter"></div>
  </div>
  <p class="note">Angular patterns use MatDialog for lightbox overlays. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.thumbs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.thumb { aspect-ratio: 1; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 24px; cursor: pointer; transition: transform 0.15s; }
.thumb:hover { transform: scale(1.05); }
.lightbox { position: fixed; inset: 0; z-index: 100; display: flex; align-items: center; justify-content: center; }
.lb-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.85); }
.lb-content { position: relative; display: flex; align-items: center; gap: 16px; z-index: 1; }
.lb-image { width: 200px; height: 200px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 48px; font-weight: 700; }
.lb-prev, .lb-next { background: none; border: none; color: white; font-size: 36px; cursor: pointer; padding: 8px; }
.lb-close { position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 28px; cursor: pointer; }
.lb-counter { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); color: #94a3b8; font-size: 14px; z-index: 1; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular lightbox behavior
const colors = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b'];
let current = 0;
const lb = document.getElementById('lightbox');
const lbImage = document.getElementById('lb-image');
const lbCounter = document.getElementById('lb-counter');

function show(idx) {
  current = idx;
  lbImage.style.background = colors[idx];
  lbImage.textContent = idx + 1;
  lbCounter.textContent = (idx + 1) + ' / ' + colors.length;
  lb.style.display = 'flex';
}

document.querySelectorAll('.thumb').forEach(t => t.addEventListener('click', () => show(parseInt(t.dataset.index))));
document.querySelector('.lb-close').addEventListener('click', () => { lb.style.display = 'none'; });
document.querySelector('.lb-backdrop').addEventListener('click', () => { lb.style.display = 'none'; });
document.querySelector('.lb-prev').addEventListener('click', () => show((current - 1 + colors.length) % colors.length));
document.querySelector('.lb-next').addEventListener('click', () => show((current + 1) % colors.length));
document.addEventListener('keydown', (e) => {
  if (lb.style.display === 'none') return;
  if (e.key === 'Escape') lb.style.display = 'none';
  if (e.key === 'ArrowLeft') show((current - 1 + colors.length) % colors.length);
  if (e.key === 'ArrowRight') show((current + 1) % colors.length);
});`,
    },
  },
  // ===== BATCH 3: interactive continued (11 patterns) =====
  {
    id: 'ng-sortable-list',
    title: 'Sortable List',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Build a drag-and-drop sortable list using HTML5 drag events, with visual drop indicators and smooth reorder animations.',
    concepts: ['drag and drop', 'HTML5 DnD API', 'reorder', 'drop indicator'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Sortable List</h3>
  <ul id="sortable" class="sortable">
    <li class="sort-item" draggable="true">Learn TypeScript</li>
    <li class="sort-item" draggable="true">Build Components</li>
    <li class="sort-item" draggable="true">Write Services</li>
    <li class="sort-item" draggable="true">Add Routing</li>
    <li class="sort-item" draggable="true">Deploy App</li>
  </ul>
  <p class="note">Angular patterns use CdkDragDrop for sorting. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.sortable { list-style: none; padding: 0; margin: 0; }
.sort-item { padding: 12px 16px; background: #1e293b; border: 1px solid #334155; border-radius: 8px; margin-bottom: 6px; color: #e2e8f0; font-size: 14px; cursor: grab; transition: transform 0.15s, opacity 0.15s; }
.sort-item:hover { border-color: #ef4444; }
.sort-item.dragging { opacity: 0.4; transform: scale(0.95); }
.sort-item.over { border-color: #ef4444; border-style: dashed; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular CdkDragDrop sortable behavior
let dragItem = null;
const list = document.getElementById('sortable');

list.querySelectorAll('.sort-item').forEach(item => {
  item.addEventListener('dragstart', () => { dragItem = item; item.classList.add('dragging'); });
  item.addEventListener('dragend', () => { item.classList.remove('dragging'); list.querySelectorAll('.sort-item').forEach(i => i.classList.remove('over')); });
  item.addEventListener('dragover', (e) => { e.preventDefault(); if (item !== dragItem) item.classList.add('over'); });
  item.addEventListener('dragleave', () => item.classList.remove('over'));
  item.addEventListener('drop', (e) => {
    e.preventDefault();
    item.classList.remove('over');
    if (dragItem && dragItem !== item) {
      const items = [...list.children];
      const fromIdx = items.indexOf(dragItem);
      const toIdx = items.indexOf(item);
      if (fromIdx < toIdx) item.after(dragItem);
      else item.before(dragItem);
    }
  });
});`,
    },
  },
  {
    id: 'ng-resizable-panels',
    title: 'Resizable Panels',
    category: 'interactive',
    difficulty: 'advanced',
    description:
      'Create a split-pane layout with a draggable divider that resizes two adjacent panels, supporting min/max constraints and horizontal/vertical orientations.',
    concepts: ['resize handle', 'pointer events', 'flex layout', 'min/max constraints'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Resizable Panels</h3>
  <div class="panels">
    <div id="left-panel" class="panel" style="flex: 1">
      <div class="panel-header">Editor</div>
      <div class="panel-body">Left panel content. Drag the divider to resize.</div>
    </div>
    <div id="divider" class="divider"></div>
    <div id="right-panel" class="panel" style="flex: 1">
      <div class="panel-header">Preview</div>
      <div class="panel-body">Right panel content. Both panels have minimum widths.</div>
    </div>
  </div>
  <p class="note">Angular patterns use CdkSplitter for resizable panels. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.panels { display: flex; height: 200px; border: 1px solid #334155; border-radius: 8px; overflow: hidden; }
.panel { overflow: auto; }
.panel-header { padding: 8px 12px; background: #1e293b; font-size: 13px; font-weight: 600; color: #e2e8f0; border-bottom: 1px solid #334155; }
.panel-body { padding: 12px; font-size: 13px; color: #94a3b8; }
.divider { width: 6px; background: #334155; cursor: col-resize; flex-shrink: 0; transition: background 0.15s; }
.divider:hover, .divider.active { background: #ef4444; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular resizable panels behavior
const divider = document.getElementById('divider');
const left = document.getElementById('left-panel');
const right = document.getElementById('right-panel');
const container = document.querySelector('.panels');
let dragging = false;

divider.addEventListener('mousedown', () => { dragging = true; divider.classList.add('active'); });
document.addEventListener('mousemove', (e) => {
  if (!dragging) return;
  const rect = container.getBoundingClientRect();
  const pct = ((e.clientX - rect.left) / rect.width) * 100;
  const clamped = Math.max(20, Math.min(80, pct));
  left.style.flex = clamped + '';
  right.style.flex = (100 - clamped) + '';
});
document.addEventListener('mouseup', () => { dragging = false; divider.classList.remove('active'); });`,
    },
  },
  {
    id: 'ng-split-view',
    title: 'Split View',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Build a master-detail split view where selecting an item in the list panel shows its details in the adjacent detail panel.',
    concepts: ['master-detail', 'selection state', 'responsive layout', 'content projection'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Split View</h3>
  <div class="split-view">
    <div class="master">
      <div class="master-item active" data-id="0">Inbox (3)</div>
      <div class="master-item" data-id="1">Drafts (1)</div>
      <div class="master-item" data-id="2">Sent</div>
      <div class="master-item" data-id="3">Archive</div>
    </div>
    <div class="detail" id="detail">
      <div class="detail-title">Inbox</div>
      <div class="detail-body">You have 3 unread messages in your inbox.</div>
    </div>
  </div>
  <p class="note">Angular patterns use router-outlet for split views. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.split-view { display: flex; border: 1px solid #334155; border-radius: 8px; overflow: hidden; height: 220px; }
.master { width: 140px; border-right: 1px solid #334155; background: #1e293b; flex-shrink: 0; }
.master-item { padding: 12px; font-size: 13px; color: #94a3b8; cursor: pointer; border-bottom: 1px solid #334155; }
.master-item:hover { background: #334155; }
.master-item.active { color: #ef4444; background: rgba(239,68,68,0.1); border-left: 3px solid #ef4444; }
.detail { flex: 1; padding: 16px; }
.detail-title { font-size: 18px; font-weight: 700; color: #e2e8f0; margin-bottom: 8px; }
.detail-body { font-size: 14px; color: #94a3b8; line-height: 1.6; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular split view behavior
const data = [
  { title: 'Inbox', body: 'You have 3 unread messages in your inbox.' },
  { title: 'Drafts', body: 'You have 1 draft waiting to be sent.' },
  { title: 'Sent', body: 'All sent messages appear here.' },
  { title: 'Archive', body: 'Archived messages are stored here for reference.' }
];
const items = document.querySelectorAll('.master-item');
const detail = document.getElementById('detail');

items.forEach(item => {
  item.addEventListener('click', () => {
    items.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const d = data[parseInt(item.dataset.id)];
    detail.innerHTML = '<div class="detail-title">' + d.title + '</div><div class="detail-body">' + d.body + '</div>';
  });
});`,
    },
  },
  {
    id: 'ng-kanban-board',
    title: 'Kanban Board',
    category: 'interactive',
    difficulty: 'advanced',
    description:
      'Create a Kanban board with draggable cards across columns (Todo, In Progress, Done), supporting card creation and cross-column drag-and-drop.',
    concepts: ['drag between containers', 'column layout', 'card management', 'CdkDropList'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Kanban Board</h3>
  <div class="kanban">
    <div class="column" data-col="todo"><div class="col-header">To Do</div><div class="cards" id="todo"><div class="card" draggable="true">Design mockups</div><div class="card" draggable="true">Write specs</div></div></div>
    <div class="column" data-col="progress"><div class="col-header">In Progress</div><div class="cards" id="progress"><div class="card" draggable="true">Build API</div></div></div>
    <div class="column" data-col="done"><div class="col-header">Done</div><div class="cards" id="done"><div class="card" draggable="true">Setup repo</div></div></div>
  </div>
  <p class="note">Angular patterns use CdkDragDrop with connected drop lists. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.kanban { display: flex; gap: 10px; }
.column { flex: 1; background: #1e293b; border-radius: 8px; padding: 8px; min-height: 200px; }
.col-header { font-size: 13px; font-weight: 700; color: #e2e8f0; padding: 6px 8px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
.cards { min-height: 100px; }
.card { padding: 10px; background: #0f172a; border: 1px solid #334155; border-radius: 6px; margin-bottom: 6px; font-size: 13px; color: #e2e8f0; cursor: grab; }
.card:hover { border-color: #ef4444; }
.card.dragging { opacity: 0.4; }
.column.drag-over { background: rgba(239,68,68,0.1); }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular Kanban board behavior
let dragCard = null;

document.querySelectorAll('.card').forEach(initCard);

function initCard(card) {
  card.addEventListener('dragstart', () => { dragCard = card; card.classList.add('dragging'); });
  card.addEventListener('dragend', () => { card.classList.remove('dragging'); document.querySelectorAll('.column').forEach(c => c.classList.remove('drag-over')); });
}

document.querySelectorAll('.cards').forEach(col => {
  col.addEventListener('dragover', (e) => { e.preventDefault(); col.closest('.column').classList.add('drag-over'); });
  col.addEventListener('dragleave', () => col.closest('.column').classList.remove('drag-over'));
  col.addEventListener('drop', (e) => {
    e.preventDefault();
    col.closest('.column').classList.remove('drag-over');
    if (dragCard) { col.appendChild(dragCard); }
  });
});`,
    },
  },
  {
    id: 'ng-timeline',
    title: 'Timeline',
    category: 'interactive',
    difficulty: 'beginner',
    description:
      'Create a vertical timeline component displaying events in chronological order with alternating alignment, icons, and connecting lines.',
    concepts: ['timeline layout', 'CSS pseudo-elements', 'chronological display', 'icons'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Timeline</h3>
  <div class="timeline">
    <div class="tl-item"><div class="tl-dot"></div><div class="tl-content"><div class="tl-date">Jan 2024</div><div class="tl-title">Project Started</div><div class="tl-desc">Initial setup and planning phase completed.</div></div></div>
    <div class="tl-item"><div class="tl-dot"></div><div class="tl-content"><div class="tl-date">Mar 2024</div><div class="tl-title">MVP Released</div><div class="tl-desc">First working version deployed to staging.</div></div></div>
    <div class="tl-item"><div class="tl-dot"></div><div class="tl-content"><div class="tl-date">Jun 2024</div><div class="tl-title">Beta Launch</div><div class="tl-desc">Opened beta access to early adopters.</div></div></div>
    <div class="tl-item"><div class="tl-dot active"></div><div class="tl-content"><div class="tl-date">Sep 2024</div><div class="tl-title">Public Release</div><div class="tl-desc">Full production launch with all features.</div></div></div>
  </div>
  <p class="note">Angular patterns use custom timeline components. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.timeline { position: relative; padding-left: 30px; }
.timeline::before { content: ''; position: absolute; left: 10px; top: 0; bottom: 0; width: 2px; background: #334155; }
.tl-item { position: relative; margin-bottom: 20px; }
.tl-dot { position: absolute; left: -26px; top: 4px; width: 14px; height: 14px; border-radius: 50%; background: #334155; border: 2px solid #1a1a2e; z-index: 1; }
.tl-dot.active { background: #ef4444; }
.tl-content { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 12px; }
.tl-date { font-size: 11px; color: #ef4444; font-weight: 600; margin-bottom: 4px; }
.tl-title { font-size: 14px; font-weight: 700; color: #e2e8f0; margin-bottom: 4px; }
.tl-desc { font-size: 13px; color: #94a3b8; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular timeline behavior
document.querySelectorAll('.tl-item').forEach((item, i) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(10px)';
  item.style.transition = 'all 0.3s ease ' + (i * 0.15) + 's';
  setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 50);
});`,
    },
  },
  {
    id: 'ng-tree-view',
    title: 'Tree View',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Build a tree view component that renders hierarchical data with expand/collapse functionality, icons for folders and files, and keyboard navigation.',
    concepts: ['recursive rendering', 'tree structure', 'expand/collapse', 'nested data'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Tree View</h3>
  <div id="tree" class="tree"></div>
  <p class="note">Angular patterns use CdkTree for hierarchical views. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.tree { font-size: 14px; }
.tree-node { padding: 4px 0; }
.tree-label { display: flex; align-items: center; gap: 6px; padding: 4px 8px; border-radius: 4px; cursor: pointer; color: #e2e8f0; }
.tree-label:hover { background: #1e293b; }
.tree-label .icon { font-size: 12px; width: 16px; text-align: center; color: #64748b; }
.tree-label .name { flex: 1; }
.tree-label.folder .name { font-weight: 600; }
.tree-label.file .icon { color: #ef4444; }
.tree-children { padding-left: 20px; border-left: 1px solid #334155; margin-left: 10px; }
.tree-children.collapsed { display: none; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular tree view behavior
const treeData = [
  { name: 'src', children: [
    { name: 'app', children: [
      { name: 'app.component.ts' },
      { name: 'app.module.ts' },
      { name: 'components', children: [{ name: 'header.ts' }, { name: 'footer.ts' }] }
    ]},
    { name: 'assets', children: [{ name: 'logo.svg' }, { name: 'styles.css' }] },
    { name: 'main.ts' }
  ]},
  { name: 'package.json' },
  { name: 'tsconfig.json' }
];

function renderTree(nodes, container) {
  nodes.forEach(node => {
    const div = document.createElement('div');
    div.className = 'tree-node';
    const isFolder = !!node.children;
    div.innerHTML = '<div class="tree-label ' + (isFolder ? 'folder' : 'file') + '"><span class="icon">' + (isFolder ? '&#9660;' : '&#9679;') + '</span><span class="name">' + node.name + '</span></div>';
    if (isFolder) {
      const children = document.createElement('div');
      children.className = 'tree-children';
      renderTree(node.children, children);
      div.appendChild(children);
      div.querySelector('.tree-label').addEventListener('click', () => {
        children.classList.toggle('collapsed');
        div.querySelector('.icon').innerHTML = children.classList.contains('collapsed') ? '&#9654;' : '&#9660;';
      });
    }
    container.appendChild(div);
  });
}
renderTree(treeData, document.getElementById('tree'));`,
    },
  },
  {
    id: 'ng-collapsible-panel',
    title: 'Collapsible Panel',
    category: 'interactive',
    difficulty: 'beginner',
    description:
      'Create a collapsible panel (expansion panel) that smoothly expands and collapses content with animated height transitions.',
    concepts: ['expand/collapse', 'height animation', 'aria-expanded', 'content toggle'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Collapsible Panels</h3>
  <div class="panel"><button class="panel-header" aria-expanded="true" data-target="p1">Getting Started <span class="chevron">&#9660;</span></button><div class="panel-content" id="p1"><p>Install Angular CLI, create a new project, and start building components with TypeScript.</p></div></div>
  <div class="panel"><button class="panel-header" aria-expanded="false" data-target="p2">Components <span class="chevron">&#9654;</span></button><div class="panel-content collapsed" id="p2"><p>Components are the building blocks of Angular apps. They control a patch of screen called a view.</p></div></div>
  <div class="panel"><button class="panel-header" aria-expanded="false" data-target="p3">Services <span class="chevron">&#9654;</span></button><div class="panel-content collapsed" id="p3"><p>Services provide reusable business logic and data access that can be injected into components.</p></div></div>
  <p class="note">Angular patterns use MatExpansionPanel. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.panel { margin-bottom: 6px; border: 1px solid #334155; border-radius: 8px; overflow: hidden; }
.panel-header { width: 100%; padding: 12px 16px; border: none; background: #1e293b; color: #e2e8f0; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center; text-align: left; }
.panel-header:hover { background: #334155; }
.chevron { font-size: 12px; color: #64748b; transition: transform 0.2s; }
.panel-content { padding: 12px 16px; font-size: 13px; color: #94a3b8; line-height: 1.6; max-height: 200px; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease; }
.panel-content.collapsed { max-height: 0; padding-top: 0; padding-bottom: 0; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular collapsible panel behavior
document.querySelectorAll('.panel-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = document.getElementById(header.dataset.target);
    const expanded = header.getAttribute('aria-expanded') === 'true';
    header.setAttribute('aria-expanded', !expanded);
    content.classList.toggle('collapsed');
    header.querySelector('.chevron').innerHTML = expanded ? '&#9654;' : '&#9660;';
  });
});`,
    },
  },
  {
    id: 'ng-drawer',
    title: 'Drawer / Side Sheet',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Build a slide-in drawer component that opens from the side with a backdrop overlay, close on escape, and smooth transition animations.',
    concepts: ['slide animation', 'overlay', 'focus management', 'transform transitions'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Drawer</h3>
  <button id="open-drawer" class="btn-open">Open Drawer</button>
  <div id="drawer-overlay" class="drawer-overlay" style="display:none"></div>
  <div id="drawer" class="drawer">
    <div class="drawer-header"><span>Settings</span><button id="close-drawer" class="drawer-close">&times;</button></div>
    <div class="drawer-body">
      <p>Drawer content goes here. You can put forms, navigation, or any content.</p>
      <div class="drawer-item">Profile Settings</div>
      <div class="drawer-item">Notifications</div>
      <div class="drawer-item">Privacy</div>
      <div class="drawer-item">Help & Support</div>
    </div>
  </div>
  <p class="note">Angular patterns use MatSidenav for drawer navigation. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.btn-open { padding: 10px 20px; border: none; border-radius: 8px; background: #ef4444; color: white; font-weight: 600; cursor: pointer; }
.drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 50; }
.drawer { position: fixed; top: 0; right: -300px; width: 280px; height: 100%; background: #1e293b; z-index: 51; transition: right 0.3s ease; box-shadow: -4px 0 20px rgba(0,0,0,0.3); }
.drawer.open { right: 0; }
.drawer-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid #334155; font-weight: 700; color: #e2e8f0; }
.drawer-close { background: none; border: none; color: #94a3b8; font-size: 24px; cursor: pointer; }
.drawer-body { padding: 16px; }
.drawer-body p { font-size: 13px; color: #94a3b8; margin-bottom: 16px; }
.drawer-item { padding: 10px 12px; font-size: 14px; color: #e2e8f0; border-radius: 6px; cursor: pointer; margin-bottom: 4px; }
.drawer-item:hover { background: #334155; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular drawer behavior
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('drawer-overlay');

document.getElementById('open-drawer').addEventListener('click', () => {
  drawer.classList.add('open');
  overlay.style.display = 'block';
});

function closeDrawer() { drawer.classList.remove('open'); overlay.style.display = 'none'; }
document.getElementById('close-drawer').addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });`,
    },
  },
  {
    id: 'ng-bottom-sheet',
    title: 'Bottom Sheet',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Create a mobile-style bottom sheet that slides up from the bottom with drag-to-dismiss, snap points, and backdrop overlay.',
    concepts: ['bottom sheet', 'touch gestures', 'snap points', 'slide animation'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Bottom Sheet</h3>
  <button id="open-sheet" class="btn-open">Open Bottom Sheet</button>
  <div id="sheet-overlay" class="sheet-overlay" style="display:none"></div>
  <div id="bottom-sheet" class="bottom-sheet">
    <div class="sheet-handle"><div class="handle-bar"></div></div>
    <div class="sheet-content">
      <h4>Share with</h4>
      <div class="sheet-grid">
        <div class="share-item">&#9993; Email</div>
        <div class="share-item">&#128172; Message</div>
        <div class="share-item">&#128279; Copy Link</div>
        <div class="share-item">&#128247; Save</div>
      </div>
    </div>
  </div>
  <p class="note">Angular patterns use MatBottomSheet. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.btn-open { padding: 10px 20px; border: none; border-radius: 8px; background: #ef4444; color: white; font-weight: 600; cursor: pointer; }
.sheet-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 50; }
.bottom-sheet { position: fixed; bottom: -300px; left: 0; right: 0; background: #1e293b; border-radius: 16px 16px 0 0; z-index: 51; transition: bottom 0.3s ease; }
.bottom-sheet.open { bottom: 0; }
.sheet-handle { display: flex; justify-content: center; padding: 10px; cursor: grab; }
.handle-bar { width: 40px; height: 4px; background: #64748b; border-radius: 2px; }
.sheet-content { padding: 0 20px 24px; }
.sheet-content h4 { color: #e2e8f0; margin-bottom: 16px; }
.sheet-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.share-item { padding: 14px; background: #0f172a; border-radius: 8px; text-align: center; color: #e2e8f0; font-size: 14px; cursor: pointer; }
.share-item:hover { background: #334155; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular bottom sheet behavior
const sheet = document.getElementById('bottom-sheet');
const sheetOverlay = document.getElementById('sheet-overlay');

document.getElementById('open-sheet').addEventListener('click', () => {
  sheet.classList.add('open');
  sheetOverlay.style.display = 'block';
});

function closeSheet() { sheet.classList.remove('open'); sheetOverlay.style.display = 'none'; }
sheetOverlay.addEventListener('click', closeSheet);
document.querySelector('.sheet-handle').addEventListener('click', closeSheet);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSheet(); });`,
    },
  },
  {
    id: 'ng-command-palette',
    title: 'Command Palette',
    category: 'interactive',
    difficulty: 'advanced',
    description:
      'Build a VS Code-style command palette (Ctrl+K) with fuzzy search, keyboard navigation, grouped commands, and recent command tracking.',
    concepts: ['command palette', 'fuzzy search', 'keyboard shortcuts', 'command grouping'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Command Palette</h3>
  <p class="hint">Press <kbd>Ctrl+K</kbd> or click the button</p>
  <button id="open-cmd" class="btn-open">Open Command Palette</button>
  <div id="cmd-overlay" class="cmd-overlay" style="display:none">
    <div class="cmd-palette">
      <input id="cmd-search" class="cmd-search" placeholder="Type a command..." autofocus />
      <div id="cmd-list" class="cmd-list"></div>
    </div>
  </div>
  <div id="cmd-result" class="result"></div>
  <p class="note">Angular patterns use overlay services for command palettes. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.hint { font-size: 13px; color: #64748b; margin-bottom: 12px; }
kbd { background: #334155; padding: 2px 6px; border-radius: 4px; font-size: 12px; }
.btn-open { padding: 10px 20px; border: none; border-radius: 8px; background: #ef4444; color: white; font-weight: 600; cursor: pointer; }
.cmd-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 100; display: flex; justify-content: center; padding-top: 80px; }
.cmd-palette { background: #1e293b; border: 1px solid #334155; border-radius: 12px; width: 400px; max-height: 350px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
.cmd-search { width: 100%; padding: 14px 16px; border: none; border-bottom: 1px solid #334155; background: transparent; color: #e2e8f0; font-size: 15px; outline: none; }
.cmd-list { max-height: 260px; overflow-y: auto; }
.cmd-item { padding: 10px 16px; cursor: pointer; font-size: 14px; color: #e2e8f0; display: flex; justify-content: space-between; }
.cmd-item:hover, .cmd-item.highlighted { background: #334155; }
.cmd-item .shortcut { font-size: 12px; color: #64748b; }
.result { margin-top: 12px; font-size: 14px; color: #22c55e; min-height: 20px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular command palette behavior
const commands = [
  { name: 'New File', shortcut: 'Ctrl+N' }, { name: 'Open File', shortcut: 'Ctrl+O' },
  { name: 'Save', shortcut: 'Ctrl+S' }, { name: 'Find', shortcut: 'Ctrl+F' },
  { name: 'Replace', shortcut: 'Ctrl+H' }, { name: 'Toggle Sidebar', shortcut: 'Ctrl+B' },
  { name: 'Terminal', shortcut: 'Ctrl+\`' }, { name: 'Settings', shortcut: 'Ctrl+,' }
];
const overlay = document.getElementById('cmd-overlay');
const search = document.getElementById('cmd-search');
const list = document.getElementById('cmd-list');
const result = document.getElementById('cmd-result');
let hl = -1;

function open() { overlay.style.display = 'flex'; search.value = ''; render(); setTimeout(() => search.focus(), 50); }
function close() { overlay.style.display = 'none'; }
function render() {
  const q = search.value.toLowerCase();
  const filtered = commands.filter(c => c.name.toLowerCase().includes(q));
  list.innerHTML = filtered.map((c, i) => '<div class="cmd-item' + (i === hl ? ' highlighted' : '') + '" data-idx="' + i + '">' + c.name + '<span class="shortcut">' + c.shortcut + '</span></div>').join('');
  list.querySelectorAll('.cmd-item').forEach(el => el.addEventListener('click', () => { result.textContent = 'Executed: ' + filtered[parseInt(el.dataset.idx)].name; close(); }));
}

document.getElementById('open-cmd').addEventListener('click', open);
overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
search.addEventListener('input', () => { hl = -1; render(); });
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); overlay.style.display === 'none' ? open() : close(); }
  if (e.key === 'Escape') close();
});`,
    },
  },
  {
    id: 'ng-spotlight-search',
    title: 'Spotlight Search',
    category: 'interactive',
    difficulty: 'intermediate',
    description:
      'Create a spotlight-style search overlay that searches across multiple content types (pages, settings, actions) with categorized results.',
    concepts: ['global search', 'categorized results', 'keyboard shortcut', 'multi-type search'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Spotlight Search</h3>
  <button id="open-spot" class="btn-open">Search (Ctrl+/)</button>
  <div id="spot-overlay" class="spot-overlay" style="display:none">
    <div class="spot-box">
      <div class="spot-input-wrap"><span class="spot-icon">&#128269;</span><input id="spot-input" class="spot-input" placeholder="Search pages, settings, actions..." /></div>
      <div id="spot-results" class="spot-results"></div>
    </div>
  </div>
  <p class="note">Angular patterns use global search services. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.btn-open { padding: 10px 20px; border: none; border-radius: 8px; background: #ef4444; color: white; font-weight: 600; cursor: pointer; }
.spot-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 100; display: flex; justify-content: center; padding-top: 60px; }
.spot-box { background: #1e293b; border-radius: 12px; width: 450px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
.spot-input-wrap { display: flex; align-items: center; padding: 0 16px; border-bottom: 1px solid #334155; }
.spot-icon { font-size: 18px; margin-right: 8px; }
.spot-input { flex: 1; padding: 14px 0; border: none; background: transparent; color: #e2e8f0; font-size: 15px; outline: none; }
.spot-results { max-height: 300px; overflow-y: auto; padding: 8px; }
.spot-cat { font-size: 11px; color: #64748b; text-transform: uppercase; padding: 6px 8px; letter-spacing: 1px; }
.spot-item { padding: 8px 12px; border-radius: 6px; font-size: 14px; color: #e2e8f0; cursor: pointer; }
.spot-item:hover { background: #334155; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular spotlight search behavior
const data = {
  Pages: ['Dashboard', 'Settings', 'Profile', 'Analytics'],
  Actions: ['Create Project', 'Invite User', 'Export Data'],
  Settings: ['Theme', 'Language', 'Notifications', 'Privacy']
};
const spotOverlay = document.getElementById('spot-overlay');
const spotInput = document.getElementById('spot-input');
const spotResults = document.getElementById('spot-results');

function openSpot() { spotOverlay.style.display = 'flex'; spotInput.value = ''; renderResults(''); setTimeout(() => spotInput.focus(), 50); }
function closeSpot() { spotOverlay.style.display = 'none'; }

function renderResults(q) {
  let html = '';
  Object.entries(data).forEach(([cat, items]) => {
    const filtered = items.filter(i => i.toLowerCase().includes(q.toLowerCase()));
    if (filtered.length) {
      html += '<div class="spot-cat">' + cat + '</div>';
      html += filtered.map(i => '<div class="spot-item">' + i + '</div>').join('');
    }
  });
  spotResults.innerHTML = html || '<div class="spot-item" style="color:#64748b">No results found</div>';
}

document.getElementById('open-spot').addEventListener('click', openSpot);
spotOverlay.addEventListener('click', (e) => { if (e.target === spotOverlay) closeSpot(); });
spotInput.addEventListener('input', () => renderResults(spotInput.value));
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === '/') { e.preventDefault(); openSpot(); }
  if (e.key === 'Escape') closeSpot();
});
renderResults('');`,
    },
  },
  // ===== BATCH 4: interactive finish (3) + data-display start (9) =====
  {
    id: 'ng-floating-action-btn',
    title: 'Floating Action Button',
    category: 'interactive',
    difficulty: 'beginner',
    description:
      'Create a Material Design floating action button (FAB) with a speed-dial menu that fans out smaller action buttons on click.',
    concepts: ['FAB', 'speed dial', 'CSS transforms', 'Material Design'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Floating Action Button</h3>
  <div class="fab-area">
    <div class="content-placeholder">Page content goes here. The FAB floats in the corner.</div>
  </div>
  <div id="fab-menu" class="fab-menu">
    <button class="fab-mini" data-action="edit" title="Edit">&#9998;</button>
    <button class="fab-mini" data-action="share" title="Share">&#8689;</button>
    <button class="fab-mini" data-action="delete" title="Delete">&#128465;</button>
  </div>
  <button id="fab" class="fab">+</button>
  <p id="fab-result" class="result"></p>
  <p class="note">Angular patterns use MatFab for floating actions. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.fab-area { height: 120px; border: 1px dashed #334155; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.content-placeholder { color: #64748b; font-size: 13px; }
.fab { position: relative; float: right; width: 56px; height: 56px; border-radius: 50%; border: none; background: #ef4444; color: white; font-size: 28px; cursor: pointer; box-shadow: 0 4px 12px rgba(239,68,68,0.4); transition: transform 0.2s; z-index: 2; }
.fab:hover { background: #dc2626; }
.fab.open { transform: rotate(45deg); }
.fab-menu { float: right; margin-right: 8px; display: flex; flex-direction: column-reverse; gap: 8px; opacity: 0; transform: translateY(10px); transition: all 0.2s; pointer-events: none; }
.fab-menu.open { opacity: 1; transform: translateY(0); pointer-events: auto; }
.fab-mini { width: 40px; height: 40px; border-radius: 50%; border: none; background: #334155; color: #e2e8f0; font-size: 16px; cursor: pointer; }
.fab-mini:hover { background: #475569; }
.result { clear: both; padding-top: 8px; font-size: 14px; color: #22c55e; min-height: 20px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular FAB behavior
const fab = document.getElementById('fab');
const menu = document.getElementById('fab-menu');
const result = document.getElementById('fab-result');

fab.addEventListener('click', () => {
  fab.classList.toggle('open');
  menu.classList.toggle('open');
});

menu.querySelectorAll('.fab-mini').forEach(btn => {
  btn.addEventListener('click', () => {
    result.textContent = 'Action: ' + btn.dataset.action;
    fab.classList.remove('open');
    menu.classList.remove('open');
  });
});`,
    },
  },
  {
    id: 'ng-skeleton-loader',
    title: 'Skeleton Loader',
    category: 'interactive',
    difficulty: 'beginner',
    description:
      'Create skeleton loading placeholders that show animated shimmer effects while content loads, then transition smoothly to real content.',
    concepts: ['skeleton screen', 'loading state', 'CSS animation', 'shimmer effect'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Skeleton Loader</h3>
  <button id="reload-btn" class="btn-reload">Simulate Load</button>
  <div id="content-area" class="content-area">
    <div class="skeleton-card">
      <div class="skeleton skeleton-avatar"></div>
      <div class="skeleton-text"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line short"></div></div>
    </div>
    <div class="skeleton-card">
      <div class="skeleton skeleton-avatar"></div>
      <div class="skeleton-text"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line short"></div></div>
    </div>
  </div>
  <p class="note">Angular patterns use ngx-skeleton-loader. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.btn-reload { padding: 8px 16px; border: 1px solid #334155; border-radius: 8px; background: transparent; color: #94a3b8; cursor: pointer; margin-bottom: 12px; font-size: 13px; }
.skeleton-card { display: flex; gap: 12px; padding: 12px; background: #1e293b; border-radius: 8px; margin-bottom: 8px; }
.skeleton { background: linear-gradient(90deg, #334155 25%, #475569 50%, #334155 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 6px; }
.skeleton-avatar { width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0; }
.skeleton-text { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.skeleton-title { height: 16px; width: 60%; }
.skeleton-line { height: 12px; width: 100%; }
.skeleton-line.short { width: 40%; }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
.real-card { display: flex; gap: 12px; padding: 12px; background: #1e293b; border-radius: 8px; margin-bottom: 8px; }
.real-avatar { width: 48px; height: 48px; border-radius: 50%; background: #ef4444; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; }
.real-text .name { font-size: 14px; font-weight: 700; color: #e2e8f0; }
.real-text .desc { font-size: 13px; color: #94a3b8; margin-top: 4px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular skeleton loader behavior
const area = document.getElementById('content-area');
const skeletonHTML = area.innerHTML;
const realHTML = [
  { name: 'Alice Johnson', desc: 'Senior Angular Developer at TechCorp', initials: 'AJ' },
  { name: 'Bob Smith', desc: 'Full-stack engineer working on microservices', initials: 'BS' }
].map(u => '<div class="real-card"><div class="real-avatar">' + u.initials + '</div><div class="real-text"><div class="name">' + u.name + '</div><div class="desc">' + u.desc + '</div></div></div>').join('');

document.getElementById('reload-btn').addEventListener('click', () => {
  area.innerHTML = skeletonHTML;
  setTimeout(() => { area.innerHTML = realHTML; }, 2000);
});`,
    },
  },
  {
    id: 'ng-progress-bar',
    title: 'Progress Bar',
    category: 'interactive',
    difficulty: 'beginner',
    description:
      'Build progress bar variants including determinate, indeterminate, and buffer modes with animated fills and percentage labels.',
    concepts: [
      'progress indicator',
      'CSS animations',
      'determinate/indeterminate',
      'aria-valuenow',
    ],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Progress Bars</h3>
  <label class="label">Determinate (<span id="pct">0</span>%)</label>
  <div class="progress-track"><div id="progress-fill" class="progress-fill" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div>
  <label class="label">Indeterminate</label>
  <div class="progress-track"><div class="progress-fill indeterminate"></div></div>
  <label class="label">Buffer</label>
  <div class="progress-track"><div class="progress-fill buffer" id="buffer-fill"></div><div class="progress-fill primary" id="primary-fill"></div></div>
  <button id="start-btn" class="btn-start">Start Progress</button>
  <p class="note">Angular patterns use MatProgressBar. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.label { font-size: 13px; color: #94a3b8; display: block; margin: 12px 0 6px; }
.progress-track { width: 100%; height: 8px; background: #334155; border-radius: 4px; overflow: hidden; position: relative; }
.progress-fill { height: 100%; background: #ef4444; border-radius: 4px; transition: width 0.3s; position: absolute; top: 0; left: 0; }
.progress-fill.indeterminate { width: 40%; animation: indeterminate 1.5s infinite ease-in-out; }
.progress-fill.buffer { background: rgba(239,68,68,0.2); }
.progress-fill.primary { background: #ef4444; }
@keyframes indeterminate { 0% { left: -40%; } 100% { left: 100%; } }
.btn-start { margin-top: 16px; padding: 8px 16px; border: none; border-radius: 8px; background: #ef4444; color: white; font-weight: 600; cursor: pointer; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular progress bar behavior
const fill = document.getElementById('progress-fill');
const pct = document.getElementById('pct');
const bufferFill = document.getElementById('buffer-fill');
const primaryFill = document.getElementById('primary-fill');
let progress = 0;

document.getElementById('start-btn').addEventListener('click', () => {
  progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 8;
    if (progress >= 100) { progress = 100; clearInterval(interval); }
    fill.style.width = progress + '%';
    fill.setAttribute('aria-valuenow', Math.round(progress));
    pct.textContent = Math.round(progress);
    primaryFill.style.width = Math.max(0, progress - 10) + '%';
    bufferFill.style.width = Math.min(100, progress + 15) + '%';
  }, 200);
});`,
    },
  },
  // ===== data-display patterns start =====
  {
    id: 'ng-badge',
    title: 'Badge',
    category: 'data-display',
    difficulty: 'beginner',
    description:
      'Create badge components for status indicators, notification counts, and labels with various color variants and sizes.',
    concepts: ['badge', 'status indicator', 'color variants', 'inline display'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Badges</h3>
  <div class="badge-section">
    <span class="badge badge-red">Error</span>
    <span class="badge badge-green">Success</span>
    <span class="badge badge-yellow">Warning</span>
    <span class="badge badge-blue">Info</span>
    <span class="badge badge-gray">Default</span>
  </div>
  <div class="badge-section">
    <span class="badge-dot red"></span> Critical
    <span class="badge-dot green"></span> Online
    <span class="badge-dot yellow"></span> Idle
  </div>
  <div class="badge-section">
    <button class="icon-btn">Inbox <span class="count-badge" id="count-badge">3</span></button>
    <button id="add-btn" class="sm-btn">Add</button>
    <button id="clear-btn" class="sm-btn">Clear</button>
  </div>
  <p class="note">Angular patterns use MatBadge directive. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.badge-section { margin-bottom: 16px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.badge { padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
.badge-red { background: rgba(239,68,68,0.15); color: #ef4444; }
.badge-green { background: rgba(34,197,94,0.15); color: #22c55e; }
.badge-yellow { background: rgba(234,179,8,0.15); color: #eab308; }
.badge-blue { background: rgba(59,130,246,0.15); color: #3b82f6; }
.badge-gray { background: rgba(148,163,184,0.15); color: #94a3b8; }
.badge-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.badge-dot.red { background: #ef4444; }
.badge-dot.green { background: #22c55e; }
.badge-dot.yellow { background: #eab308; }
.icon-btn { position: relative; padding: 8px 16px; border: 1px solid #334155; border-radius: 8px; background: #1e293b; color: #e2e8f0; font-size: 14px; cursor: pointer; }
.count-badge { position: absolute; top: -8px; right: -8px; background: #ef4444; color: white; font-size: 11px; padding: 2px 6px; border-radius: 10px; min-width: 18px; text-align: center; }
.sm-btn { padding: 6px 12px; border: 1px solid #334155; border-radius: 6px; background: transparent; color: #94a3b8; cursor: pointer; font-size: 12px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular badge behavior
let count = 3;
const badge = document.getElementById('count-badge');
document.getElementById('add-btn').addEventListener('click', () => { count++; badge.textContent = count; });
document.getElementById('clear-btn').addEventListener('click', () => { count = 0; badge.textContent = '0'; });`,
    },
  },
  {
    id: 'ng-avatar',
    title: 'Avatar',
    category: 'data-display',
    difficulty: 'beginner',
    description:
      'Create avatar components supporting image, initials, and icon variants with different sizes, shapes, and online status indicators.',
    concepts: ['avatar', 'initials fallback', 'size variants', 'status ring'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Avatars</h3>
  <div class="avatar-row">
    <div class="avatar sm" style="background:#ef4444">AJ</div>
    <div class="avatar md" style="background:#3b82f6">BS</div>
    <div class="avatar lg" style="background:#22c55e">CD</div>
    <div class="avatar xl" style="background:#f59e0b">EF</div>
  </div>
  <div class="avatar-row">
    <div class="avatar-wrap"><div class="avatar md" style="background:#ef4444">AJ</div><span class="status-dot online"></span></div>
    <div class="avatar-wrap"><div class="avatar md" style="background:#3b82f6">BS</div><span class="status-dot offline"></span></div>
    <div class="avatar-wrap"><div class="avatar md" style="background:#22c55e">CD</div><span class="status-dot away"></span></div>
  </div>
  <div class="avatar-row">
    <div class="avatar md square" style="background:#8b5cf6">GH</div>
    <div class="avatar md square" style="background:#ec4899">IJ</div>
  </div>
  <p class="note">Angular patterns use custom avatar components. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.avatar-row { display: flex; gap: 12px; align-items: center; margin-bottom: 16px; }
.avatar { display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; border-radius: 50%; }
.avatar.sm { width: 32px; height: 32px; font-size: 12px; }
.avatar.md { width: 40px; height: 40px; font-size: 14px; }
.avatar.lg { width: 52px; height: 52px; font-size: 18px; }
.avatar.xl { width: 64px; height: 64px; font-size: 22px; }
.avatar.square { border-radius: 8px; }
.avatar-wrap { position: relative; display: inline-block; }
.status-dot { position: absolute; bottom: 0; right: 0; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #1a1a2e; }
.status-dot.online { background: #22c55e; }
.status-dot.offline { background: #64748b; }
.status-dot.away { background: #eab308; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular avatar behavior
// Avatars are purely CSS-driven, no JS needed for static display
document.querySelectorAll('.avatar').forEach(a => {
  a.style.cursor = 'pointer';
  a.addEventListener('click', () => {
    a.style.transform = a.style.transform === 'scale(1.2)' ? 'scale(1)' : 'scale(1.2)';
    a.style.transition = 'transform 0.2s';
  });
});`,
    },
  },
  {
    id: 'ng-stat-card',
    title: 'Stat Card',
    category: 'data-display',
    difficulty: 'beginner',
    description:
      'Build stat/metric cards that display key numbers with labels, trend indicators (up/down), and optional sparkline visuals.',
    concepts: ['stat display', 'trend indicator', 'card layout', 'number formatting'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Stat Cards</h3>
  <div class="stats-grid">
    <div class="stat-card"><div class="stat-label">Total Users</div><div class="stat-value">12,847</div><div class="stat-trend up">+12.5% &#9650;</div></div>
    <div class="stat-card"><div class="stat-label">Revenue</div><div class="stat-value">$48,290</div><div class="stat-trend up">+8.3% &#9650;</div></div>
    <div class="stat-card"><div class="stat-label">Bounce Rate</div><div class="stat-value">32.1%</div><div class="stat-trend down">-2.1% &#9660;</div></div>
    <div class="stat-card"><div class="stat-label">Avg. Session</div><div class="stat-value">4m 32s</div><div class="stat-trend up">+5.7% &#9650;</div></div>
  </div>
  <p class="note">Angular patterns use dashboard card components. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.stat-card { background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 16px; }
.stat-label { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
.stat-value { font-size: 24px; font-weight: 700; color: #e2e8f0; margin-bottom: 4px; }
.stat-trend { font-size: 13px; font-weight: 600; }
.stat-trend.up { color: #22c55e; }
.stat-trend.down { color: #ef4444; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular stat card behavior
document.querySelectorAll('.stat-value').forEach(el => {
  const target = el.textContent;
  el.textContent = '...';
  setTimeout(() => { el.textContent = target; el.style.transition = 'opacity 0.3s'; el.style.opacity = '1'; }, 500);
});`,
    },
  },
  {
    id: 'ng-timeline-feed',
    title: 'Timeline Feed',
    category: 'data-display',
    difficulty: 'intermediate',
    description:
      'Create a social-media-style activity feed with different event types (post, comment, like), timestamps, and user avatars.',
    concepts: ['activity feed', 'event types', 'relative timestamps', 'feed layout'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Activity Feed</h3>
  <div id="feed" class="feed"></div>
  <p class="note">Angular patterns use async pipe with Observable feeds. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.feed { display: flex; flex-direction: column; gap: 2px; }
.feed-item { display: flex; gap: 10px; padding: 12px; background: #1e293b; border-radius: 8px; }
.feed-avatar { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 13px; flex-shrink: 0; }
.feed-body { flex: 1; }
.feed-text { font-size: 14px; color: #e2e8f0; }
.feed-text .username { font-weight: 700; color: #ef4444; }
.feed-time { font-size: 11px; color: #64748b; margin-top: 4px; }
.feed-type { font-size: 11px; padding: 2px 6px; border-radius: 4px; margin-left: 8px; }
.type-post { background: rgba(59,130,246,0.15); color: #3b82f6; }
.type-comment { background: rgba(34,197,94,0.15); color: #22c55e; }
.type-like { background: rgba(239,68,68,0.15); color: #ef4444; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular timeline feed behavior
const events = [
  { user: 'Alice', initials: 'AJ', color: '#ef4444', type: 'post', text: 'published a new article', time: '2 min ago' },
  { user: 'Bob', initials: 'BS', color: '#3b82f6', type: 'comment', text: 'commented on your post', time: '15 min ago' },
  { user: 'Charlie', initials: 'CD', color: '#22c55e', type: 'like', text: 'liked your photo', time: '1 hour ago' },
  { user: 'Diana', initials: 'DE', color: '#f59e0b', type: 'post', text: 'shared a project update', time: '3 hours ago' },
  { user: 'Eve', initials: 'EF', color: '#8b5cf6', type: 'comment', text: 'replied to the thread', time: '5 hours ago' },
];

document.getElementById('feed').innerHTML = events.map(e =>
  '<div class="feed-item"><div class="feed-avatar" style="background:' + e.color + '">' + e.initials + '</div><div class="feed-body"><div class="feed-text"><span class="username">' + e.user + '</span> ' + e.text + '<span class="feed-type type-' + e.type + '">' + e.type + '</span></div><div class="feed-time">' + e.time + '</div></div></div>'
).join('');`,
    },
  },
  {
    id: 'ng-activity-log',
    title: 'Activity Log',
    category: 'data-display',
    difficulty: 'intermediate',
    description:
      'Build a filterable activity log with event type icons, timestamps, expandable details, and search functionality.',
    concepts: ['log display', 'filtering', 'event types', 'expandable rows'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Activity Log</h3>
  <div class="log-controls">
    <input id="log-search" placeholder="Search logs..." class="log-input" />
    <select id="log-filter" class="log-select"><option value="all">All</option><option value="info">Info</option><option value="warn">Warning</option><option value="error">Error</option></select>
  </div>
  <div id="log-list" class="log-list"></div>
  <p class="note">Angular patterns use pipes for log filtering. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.log-controls { display: flex; gap: 8px; margin-bottom: 12px; }
.log-input { flex: 1; padding: 8px 12px; border: 1px solid #334155; border-radius: 6px; background: #1e293b; color: #e2e8f0; outline: none; font-size: 13px; }
.log-select { padding: 8px; border: 1px solid #334155; border-radius: 6px; background: #1e293b; color: #e2e8f0; outline: none; }
.log-item { padding: 10px 12px; border-bottom: 1px solid #334155; display: flex; align-items: flex-start; gap: 10px; font-size: 13px; }
.log-icon { width: 8px; height: 8px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
.log-icon.info { background: #3b82f6; }
.log-icon.warn { background: #eab308; }
.log-icon.error { background: #ef4444; }
.log-text { flex: 1; color: #e2e8f0; }
.log-time { font-size: 11px; color: #64748b; white-space: nowrap; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular activity log behavior
const logs = [
  { type: 'info', text: 'User Alice logged in', time: '10:32 AM' },
  { type: 'warn', text: 'API rate limit approaching (85%)', time: '10:28 AM' },
  { type: 'error', text: 'Failed to connect to database', time: '10:15 AM' },
  { type: 'info', text: 'Deployment v2.1.0 completed', time: '09:45 AM' },
  { type: 'warn', text: 'Disk usage above 70%', time: '09:30 AM' },
  { type: 'info', text: 'Backup completed successfully', time: '08:00 AM' },
];

const listEl = document.getElementById('log-list');
const searchEl = document.getElementById('log-search');
const filterEl = document.getElementById('log-filter');

function renderLogs() {
  const q = searchEl.value.toLowerCase();
  const f = filterEl.value;
  const filtered = logs.filter(l => (f === 'all' || l.type === f) && l.text.toLowerCase().includes(q));
  listEl.innerHTML = filtered.map(l => '<div class="log-item"><div class="log-icon ' + l.type + '"></div><div class="log-text">' + l.text + '</div><div class="log-time">' + l.time + '</div></div>').join('');
}

searchEl.addEventListener('input', renderLogs);
filterEl.addEventListener('change', renderLogs);
renderLogs();`,
    },
  },
  {
    id: 'ng-diff-viewer',
    title: 'Diff Viewer',
    category: 'data-display',
    difficulty: 'advanced',
    description:
      'Create a side-by-side diff viewer that highlights additions, deletions, and modifications between two text versions with line numbers.',
    concepts: ['diff algorithm', 'syntax highlighting', 'line comparison', 'side-by-side view'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Diff Viewer</h3>
  <div class="diff-container">
    <div class="diff-panel"><div class="diff-header">Original</div><div id="diff-left" class="diff-body"></div></div>
    <div class="diff-panel"><div class="diff-header">Modified</div><div id="diff-right" class="diff-body"></div></div>
  </div>
  <p class="note">Angular patterns use custom diff components. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.diff-container { display: flex; gap: 2px; border: 1px solid #334155; border-radius: 8px; overflow: hidden; }
.diff-panel { flex: 1; }
.diff-header { padding: 8px 12px; background: #1e293b; font-size: 12px; font-weight: 700; color: #94a3b8; border-bottom: 1px solid #334155; }
.diff-body { font-family: monospace; font-size: 12px; }
.diff-line { display: flex; padding: 2px 8px; }
.diff-num { width: 30px; color: #64748b; text-align: right; margin-right: 8px; user-select: none; }
.diff-text { flex: 1; white-space: pre; }
.diff-line.added { background: rgba(34,197,94,0.1); }
.diff-line.added .diff-text { color: #22c55e; }
.diff-line.removed { background: rgba(239,68,68,0.1); }
.diff-line.removed .diff-text { color: #ef4444; }
.diff-line.normal .diff-text { color: #94a3b8; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular diff viewer behavior
const original = ['function greet(name) {', '  console.log("Hello, " + name);', '  return name;', '}'];
const modified = ['function greet(name, title) {', '  const greeting = "Hello, " + title + " " + name;', '  console.log(greeting);', '  return greeting;', '}'];

function renderDiff(lines, el, changes) {
  el.innerHTML = lines.map((line, i) => {
    const cls = changes[i] || 'normal';
    return '<div class="diff-line ' + cls + '"><span class="diff-num">' + (i + 1) + '</span><span class="diff-text">' + (cls === 'removed' ? '- ' : cls === 'added' ? '+ ' : '  ') + line + '</span></div>';
  }).join('');
}

renderDiff(original, document.getElementById('diff-left'), { 0: 'removed', 1: 'removed', 2: 'normal', 3: 'normal' });
renderDiff(modified, document.getElementById('diff-right'), { 0: 'added', 1: 'added', 2: 'normal', 3: 'added', 4: 'normal' });`,
    },
  },
  {
    id: 'ng-code-block',
    title: 'Code Block',
    category: 'data-display',
    difficulty: 'beginner',
    description:
      'Build a styled code block component with syntax-highlighted display, a copy-to-clipboard button, and language label.',
    concepts: ['code display', 'clipboard API', 'syntax highlighting', 'pre/code elements'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Code Block</h3>
  <div class="code-block">
    <div class="code-header"><span class="code-lang">TypeScript</span><button id="copy-btn" class="copy-btn">Copy</button></div>
    <pre class="code-pre"><code id="code-content">@Component({
  selector: 'app-hello',
  template: \`
    &lt;h1&gt;Hello, {{ name }}!&lt;/h1&gt;
    &lt;button (click)="greet()"&gt;Greet&lt;/button&gt;
  \`
})
export class HelloComponent {
  name = 'Angular';

  greet() {
    alert('Hello from ' + this.name);
  }
}</code></pre>
  </div>
  <p id="copy-feedback" class="feedback"></p>
  <p class="note">Angular patterns use custom code block components. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.code-block { border: 1px solid #334155; border-radius: 8px; overflow: hidden; }
.code-header { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #1e293b; border-bottom: 1px solid #334155; }
.code-lang { font-size: 12px; color: #ef4444; font-weight: 600; }
.copy-btn { padding: 4px 10px; border: 1px solid #334155; border-radius: 4px; background: transparent; color: #94a3b8; font-size: 12px; cursor: pointer; }
.copy-btn:hover { background: #334155; color: #e2e8f0; }
.code-pre { margin: 0; padding: 16px; font-size: 13px; line-height: 1.5; overflow-x: auto; color: #e2e8f0; }
.feedback { font-size: 12px; color: #22c55e; margin-top: 8px; min-height: 18px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular code block behavior
document.getElementById('copy-btn').addEventListener('click', () => {
  const code = document.getElementById('code-content').textContent;
  navigator.clipboard.writeText(code).then(() => {
    const fb = document.getElementById('copy-feedback');
    fb.textContent = 'Copied to clipboard!';
    setTimeout(() => { fb.textContent = ''; }, 2000);
    const btn = document.getElementById('copy-btn');
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
  });
});`,
    },
  },
  {
    id: 'ng-markdown-preview',
    title: 'Markdown Preview',
    category: 'data-display',
    difficulty: 'intermediate',
    description:
      'Create a live markdown editor with side-by-side preview that renders basic markdown (headings, bold, italic, lists, code) in real-time.',
    concepts: ['markdown parsing', 'live preview', 'text transformation', 'split editor'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Markdown Preview</h3>
  <div class="md-split">
    <div class="md-panel"><div class="md-header">Edit</div><textarea id="md-input" class="md-textarea"># Hello Angular
This is **bold** and *italic* text.

- Item one
- Item two
- Item three

\`inline code\` example</textarea></div>
    <div class="md-panel"><div class="md-header">Preview</div><div id="md-preview" class="md-preview"></div></div>
  </div>
  <p class="note">Angular patterns use ngx-markdown for rendering. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.md-split { display: flex; gap: 2px; border: 1px solid #334155; border-radius: 8px; overflow: hidden; height: 250px; }
.md-panel { flex: 1; display: flex; flex-direction: column; }
.md-header { padding: 8px 12px; background: #1e293b; font-size: 12px; font-weight: 700; color: #94a3b8; border-bottom: 1px solid #334155; }
.md-textarea { flex: 1; padding: 12px; border: none; background: #0f172a; color: #e2e8f0; font-family: monospace; font-size: 13px; outline: none; resize: none; }
.md-preview { flex: 1; padding: 12px; overflow-y: auto; font-size: 14px; color: #e2e8f0; line-height: 1.6; }
.md-preview h1 { font-size: 20px; color: #ef4444; margin-bottom: 8px; }
.md-preview h2 { font-size: 17px; color: #ef4444; margin-bottom: 6px; }
.md-preview strong { color: #f8fafc; }
.md-preview code { background: #334155; padding: 2px 6px; border-radius: 4px; font-size: 12px; }
.md-preview ul { padding-left: 20px; }
.md-preview li { margin: 4px 0; color: #94a3b8; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular markdown preview behavior
const mdInput = document.getElementById('md-input');
const mdPreview = document.getElementById('md-preview');

function renderMarkdown(text) {
  return text
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
    .replace(/\\*(.+?)\\*/g, '<em>$1</em>')
    .replace(/\\\`(.+?)\\\`/g, '<code>$1</code>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\\/li>)/s, '<ul>$1</ul>')
    .replace(/\\n/g, '<br/>');
}

mdInput.addEventListener('input', () => { mdPreview.innerHTML = renderMarkdown(mdInput.value); });
mdPreview.innerHTML = renderMarkdown(mdInput.value);`,
    },
  },
  // ===== BATCH 5: data-display finish (8) + navigation start (2) =====
  {
    id: 'ng-json-viewer',
    title: 'JSON Viewer',
    category: 'data-display',
    difficulty: 'intermediate',
    description:
      'Build a collapsible JSON tree viewer that renders JSON data with syntax coloring, expandable nodes, and key/value type indicators.',
    concepts: ['recursive rendering', 'JSON parsing', 'collapsible tree', 'type coloring'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>JSON Viewer</h3>
  <div id="json-tree" class="json-tree"></div>
  <p class="note">Angular patterns use custom JSON tree components. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.json-tree { font-family: monospace; font-size: 13px; background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 16px; overflow-x: auto; }
.json-key { color: #ef4444; }
.json-string { color: #22c55e; }
.json-number { color: #3b82f6; }
.json-bool { color: #f59e0b; }
.json-null { color: #64748b; }
.json-bracket { color: #94a3b8; }
.json-toggle { cursor: pointer; user-select: none; display: inline-block; width: 14px; color: #64748b; }
.json-node { padding-left: 20px; }
.json-node.collapsed { display: none; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular JSON viewer behavior
const data = {
  name: "Angular App",
  version: "17.0.0",
  features: ["signals", "standalone", "SSR"],
  config: { strict: true, production: false, port: 4200 },
  metadata: null
};

function renderJSON(obj, container, depth) {
  const isArray = Array.isArray(obj);
  const bracket = isArray ? ['[', ']'] : ['{', '}'];
  const entries = Object.entries(obj);

  let html = '<span class="json-bracket">' + bracket[0] + '</span>';
  html += '<span class="json-toggle" data-depth="' + depth + '">-</span>';
  html += '<div class="json-node" data-depth="' + depth + '">';

  entries.forEach(([key, val], i) => {
    html += '<div>';
    if (!isArray) html += '<span class="json-key">"' + key + '"</span>: ';
    if (val === null) html += '<span class="json-null">null</span>';
    else if (typeof val === 'string') html += '<span class="json-string">"' + val + '"</span>';
    else if (typeof val === 'number') html += '<span class="json-number">' + val + '</span>';
    else if (typeof val === 'boolean') html += '<span class="json-bool">' + val + '</span>';
    else if (typeof val === 'object') { const sub = document.createElement('span'); renderJSON(val, sub, depth + 1); html += sub.innerHTML; }
    if (i < entries.length - 1) html += ',';
    html += '</div>';
  });

  html += '</div><span class="json-bracket">' + bracket[1] + '</span>';
  container.innerHTML = html;
}

const tree = document.getElementById('json-tree');
renderJSON(data, tree, 0);

tree.addEventListener('click', (e) => {
  if (e.target.classList.contains('json-toggle')) {
    const d = e.target.dataset.depth;
    const node = e.target.nextElementSibling;
    node.classList.toggle('collapsed');
    e.target.textContent = node.classList.contains('collapsed') ? '+' : '-';
  }
});`,
    },
  },
  {
    id: 'ng-comparison-table',
    title: 'Comparison Table',
    category: 'data-display',
    difficulty: 'intermediate',
    description:
      'Create a feature comparison table with sticky header, highlight columns, and check/cross icons for feature availability.',
    concepts: ['comparison layout', 'sticky header', 'responsive table', 'feature matrix'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Comparison Table</h3>
  <div class="table-wrap">
    <table class="comp-table">
      <thead><tr><th>Feature</th><th>Basic</th><th class="highlight">Pro</th><th>Enterprise</th></tr></thead>
      <tbody>
        <tr><td>Users</td><td>1</td><td class="highlight">10</td><td>Unlimited</td></tr>
        <tr><td>Storage</td><td>5 GB</td><td class="highlight">100 GB</td><td>1 TB</td></tr>
        <tr><td>API Access</td><td class="no">&#10007;</td><td class="highlight yes">&#10003;</td><td class="yes">&#10003;</td></tr>
        <tr><td>Priority Support</td><td class="no">&#10007;</td><td class="highlight no">&#10007;</td><td class="yes">&#10003;</td></tr>
        <tr><td>Custom Domain</td><td class="no">&#10007;</td><td class="highlight yes">&#10003;</td><td class="yes">&#10003;</td></tr>
        <tr><td>Analytics</td><td>Basic</td><td class="highlight">Advanced</td><td>Full Suite</td></tr>
      </tbody>
    </table>
  </div>
  <p class="note">Angular patterns use MatTable for comparison tables. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.table-wrap { overflow-x: auto; border: 1px solid #334155; border-radius: 8px; }
.comp-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.comp-table th, .comp-table td { padding: 10px 14px; text-align: center; border-bottom: 1px solid #334155; color: #e2e8f0; }
.comp-table th { background: #1e293b; font-weight: 700; color: #94a3b8; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; position: sticky; top: 0; }
.comp-table td:first-child, .comp-table th:first-child { text-align: left; font-weight: 600; }
.highlight { background: rgba(239,68,68,0.08); }
th.highlight { color: #ef4444; }
.yes { color: #22c55e; font-size: 16px; }
.no { color: #64748b; font-size: 16px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular comparison table behavior
document.querySelectorAll('.comp-table th').forEach((th, i) => {
  if (i === 0) return;
  th.style.cursor = 'pointer';
  th.addEventListener('click', () => {
    document.querySelectorAll('.comp-table th, .comp-table td').forEach(cell => cell.classList.remove('highlight'));
    document.querySelectorAll('.comp-table tr').forEach(row => {
      const cells = row.querySelectorAll('th, td');
      if (cells[i]) cells[i].classList.add('highlight');
    });
  });
});`,
    },
  },
  {
    id: 'ng-pricing-table',
    title: 'Pricing Table',
    category: 'data-display',
    difficulty: 'beginner',
    description:
      'Build a pricing table with tiered plan cards, featured/popular indicator, feature lists, and CTA buttons.',
    concepts: ['pricing cards', 'featured plan', 'card layout', 'CTA design'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Pricing</h3>
  <div class="pricing-grid">
    <div class="plan-card">
      <div class="plan-name">Starter</div>
      <div class="plan-price">$9<span>/mo</span></div>
      <ul class="plan-features"><li>&#10003; 1 User</li><li>&#10003; 5 GB Storage</li><li>&#10003; Basic Support</li><li class="disabled">&#10007; API Access</li></ul>
      <button class="plan-btn">Get Started</button>
    </div>
    <div class="plan-card featured">
      <div class="plan-badge">Most Popular</div>
      <div class="plan-name">Pro</div>
      <div class="plan-price">$29<span>/mo</span></div>
      <ul class="plan-features"><li>&#10003; 10 Users</li><li>&#10003; 100 GB Storage</li><li>&#10003; Priority Support</li><li>&#10003; API Access</li></ul>
      <button class="plan-btn featured-btn">Get Started</button>
    </div>
    <div class="plan-card">
      <div class="plan-name">Enterprise</div>
      <div class="plan-price">$99<span>/mo</span></div>
      <ul class="plan-features"><li>&#10003; Unlimited Users</li><li>&#10003; 1 TB Storage</li><li>&#10003; 24/7 Support</li><li>&#10003; Full API</li></ul>
      <button class="plan-btn">Contact Sales</button>
    </div>
  </div>
  <p class="note">Angular patterns use card components for pricing. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.pricing-grid { display: flex; gap: 10px; }
.plan-card { flex: 1; background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px; text-align: center; position: relative; }
.plan-card.featured { border-color: #ef4444; transform: scale(1.03); }
.plan-badge { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #ef4444; color: white; font-size: 11px; padding: 3px 12px; border-radius: 10px; font-weight: 600; }
.plan-name { font-size: 16px; font-weight: 700; color: #e2e8f0; margin-bottom: 8px; }
.plan-price { font-size: 32px; font-weight: 800; color: #e2e8f0; margin-bottom: 16px; }
.plan-price span { font-size: 14px; color: #64748b; font-weight: 400; }
.plan-features { list-style: none; padding: 0; margin-bottom: 20px; text-align: left; }
.plan-features li { padding: 6px 0; font-size: 13px; color: #94a3b8; border-bottom: 1px solid #334155; }
.plan-features li.disabled { color: #475569; }
.plan-btn { width: 100%; padding: 10px; border: 1px solid #334155; border-radius: 8px; background: transparent; color: #e2e8f0; font-weight: 600; cursor: pointer; }
.featured-btn { background: #ef4444; border-color: #ef4444; color: white; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular pricing table behavior
document.querySelectorAll('.plan-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.textContent = 'Selected!';
    btn.style.background = '#22c55e';
    btn.style.borderColor = '#22c55e';
    setTimeout(() => {
      btn.textContent = btn.closest('.featured') ? 'Get Started' : btn.textContent === 'Selected!' ? 'Get Started' : btn.textContent;
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 1500);
  });
});`,
    },
  },
  {
    id: 'ng-feature-list',
    title: 'Feature List',
    category: 'data-display',
    difficulty: 'beginner',
    description:
      'Create an organized feature list with icons, descriptions, and categories for showcasing product capabilities.',
    concepts: ['feature showcase', 'icon layout', 'grid display', 'card design'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Features</h3>
  <div class="feature-grid" id="features"></div>
  <p class="note">Angular patterns use *ngFor for feature lists. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.feature-item { padding: 16px; background: #1e293b; border: 1px solid #334155; border-radius: 10px; }
.feature-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-bottom: 10px; }
.feature-title { font-size: 14px; font-weight: 700; color: #e2e8f0; margin-bottom: 4px; }
.feature-desc { font-size: 12px; color: #94a3b8; line-height: 1.5; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular feature list behavior
const features = [
  { icon: '&#9889;', color: '#ef4444', title: 'Fast Performance', desc: 'Optimized rendering with change detection strategies.' },
  { icon: '&#128274;', color: '#3b82f6', title: 'Type Safety', desc: 'Full TypeScript support with strict mode.' },
  { icon: '&#128640;', color: '#22c55e', title: 'Scalable', desc: 'Modular architecture for large applications.' },
  { icon: '&#128736;', color: '#f59e0b', title: 'CLI Tools', desc: 'Powerful CLI for scaffolding and builds.' },
];

document.getElementById('features').innerHTML = features.map(f =>
  '<div class="feature-item"><div class="feature-icon" style="background:' + f.color + '20;color:' + f.color + '">' + f.icon + '</div><div class="feature-title">' + f.title + '</div><div class="feature-desc">' + f.desc + '</div></div>'
).join('');`,
    },
  },
  {
    id: 'ng-testimonials',
    title: 'Testimonials',
    category: 'data-display',
    difficulty: 'beginner',
    description:
      'Build a testimonials section with quote cards, author avatars, star ratings, and automatic rotation or manual navigation.',
    concepts: ['testimonial cards', 'quote display', 'auto-rotate', 'rating display'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Testimonials</h3>
  <div id="testimonial" class="testimonial">
    <div class="quote-mark">&#8220;</div>
    <p id="quote-text" class="quote-text"></p>
    <div class="quote-stars" id="quote-stars"></div>
    <div class="quote-author"><div id="quote-avatar" class="quote-avatar"></div><div><div id="quote-name" class="quote-name"></div><div id="quote-role" class="quote-role"></div></div></div>
  </div>
  <div class="dots" id="dots"></div>
  <p class="note">Angular patterns use ngFor with animation for testimonials. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.testimonial { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 24px; text-align: center; transition: opacity 0.3s; }
.quote-mark { font-size: 48px; color: #ef4444; line-height: 1; }
.quote-text { font-size: 15px; color: #e2e8f0; line-height: 1.6; margin: 8px 0 12px; font-style: italic; }
.quote-stars { color: #facc15; font-size: 18px; margin-bottom: 12px; }
.quote-author { display: flex; align-items: center; justify-content: center; gap: 10px; }
.quote-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 14px; }
.quote-name { font-size: 14px; font-weight: 700; color: #e2e8f0; }
.quote-role { font-size: 12px; color: #64748b; }
.dots { display: flex; justify-content: center; gap: 6px; margin-top: 12px; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: #334155; cursor: pointer; }
.dot.active { background: #ef4444; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular testimonials behavior
const testimonials = [
  { text: 'Angular has transformed how we build enterprise apps. The tooling is incredible.', name: 'Alice Chen', role: 'CTO at TechCo', stars: 5, initials: 'AC', color: '#ef4444' },
  { text: 'The dependency injection system makes testing so much easier.', name: 'Bob Williams', role: 'Lead Dev at StartupX', stars: 5, initials: 'BW', color: '#3b82f6' },
  { text: 'Switching to signals improved our app performance dramatically.', name: 'Carol Davis', role: 'Frontend Architect', stars: 4, initials: 'CD', color: '#22c55e' },
];
let current = 0;

function showTestimonial(idx) {
  const t = testimonials[idx];
  document.getElementById('quote-text').textContent = t.text;
  document.getElementById('quote-stars').innerHTML = '&#9733;'.repeat(t.stars) + '&#9734;'.repeat(5 - t.stars);
  document.getElementById('quote-name').textContent = t.name;
  document.getElementById('quote-role').textContent = t.role;
  document.getElementById('quote-avatar').textContent = t.initials;
  document.getElementById('quote-avatar').style.background = t.color;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === idx));
}

document.getElementById('dots').innerHTML = testimonials.map((_, i) => '<div class="dot' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '"></div>').join('');
document.querySelectorAll('.dot').forEach(d => d.addEventListener('click', () => { current = parseInt(d.dataset.idx); showTestimonial(current); }));
showTestimonial(0);
setInterval(() => { current = (current + 1) % testimonials.length; showTestimonial(current); }, 4000);`,
    },
  },
  {
    id: 'ng-team-grid',
    title: 'Team Grid',
    category: 'data-display',
    difficulty: 'beginner',
    description:
      'Create a responsive team member grid with avatar cards, roles, social links, and hover effects.',
    concepts: ['card grid', 'responsive layout', 'hover effects', 'social links'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Our Team</h3>
  <div id="team-grid" class="team-grid"></div>
  <p class="note">Angular patterns use *ngFor with card components. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.team-card { background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 20px; text-align: center; transition: transform 0.2s; }
.team-card:hover { transform: translateY(-4px); border-color: #ef4444; }
.team-avatar { width: 56px; height: 56px; border-radius: 50%; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 20px; }
.team-name { font-size: 14px; font-weight: 700; color: #e2e8f0; }
.team-role { font-size: 12px; color: #64748b; margin-top: 2px; }
.team-links { margin-top: 10px; display: flex; justify-content: center; gap: 8px; }
.team-link { padding: 4px 8px; border-radius: 4px; background: #334155; color: #94a3b8; font-size: 11px; text-decoration: none; cursor: pointer; }
.team-link:hover { background: #ef4444; color: white; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular team grid behavior
const team = [
  { name: 'Alice', role: 'Lead Engineer', initials: 'AJ', color: '#ef4444' },
  { name: 'Bob', role: 'Designer', initials: 'BS', color: '#3b82f6' },
  { name: 'Carol', role: 'PM', initials: 'CD', color: '#22c55e' },
  { name: 'Dave', role: 'DevOps', initials: 'DE', color: '#f59e0b' },
  { name: 'Eve', role: 'QA Lead', initials: 'EF', color: '#8b5cf6' },
  { name: 'Frank', role: 'Backend', initials: 'FG', color: '#ec4899' },
];

document.getElementById('team-grid').innerHTML = team.map(m =>
  '<div class="team-card"><div class="team-avatar" style="background:' + m.color + '">' + m.initials + '</div><div class="team-name">' + m.name + '</div><div class="team-role">' + m.role + '</div><div class="team-links"><span class="team-link">GitHub</span><span class="team-link">LinkedIn</span></div></div>'
).join('');`,
    },
  },
  {
    id: 'ng-changelog',
    title: 'Changelog',
    category: 'data-display',
    difficulty: 'beginner',
    description:
      'Build a changelog display with version numbers, dates, categorized changes (added, changed, fixed), and collapsible release sections.',
    concepts: [
      'changelog display',
      'version grouping',
      'categorized items',
      'collapsible sections',
    ],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Changelog</h3>
  <div id="changelog" class="changelog"></div>
  <p class="note">Angular patterns use component templates for changelogs. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.changelog { display: flex; flex-direction: column; gap: 16px; }
.release { background: #1e293b; border: 1px solid #334155; border-radius: 10px; overflow: hidden; }
.release-header { padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
.release-header:hover { background: #334155; }
.release-ver { font-size: 16px; font-weight: 700; color: #e2e8f0; }
.release-date { font-size: 12px; color: #64748b; }
.release-body { padding: 0 16px 12px; }
.change-cat { font-size: 12px; font-weight: 600; margin-top: 8px; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 4px; }
.cat-added { background: rgba(34,197,94,0.15); color: #22c55e; }
.cat-changed { background: rgba(59,130,246,0.15); color: #3b82f6; }
.cat-fixed { background: rgba(239,68,68,0.15); color: #ef4444; }
.change-item { font-size: 13px; color: #94a3b8; padding: 3px 0 3px 12px; border-left: 2px solid #334155; margin: 4px 0; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular changelog behavior
const releases = [
  { ver: 'v2.1.0', date: 'Jan 15, 2024', changes: { added: ['Signals support', 'New CLI commands'], changed: ['Improved build performance'], fixed: ['Router navigation bug'] }},
  { ver: 'v2.0.0', date: 'Dec 1, 2023', changes: { added: ['Standalone components default', 'Deferrable views'], fixed: ['Memory leak in forms', 'SSR hydration'] }},
];

document.getElementById('changelog').innerHTML = releases.map(r => {
  let body = '';
  Object.entries(r.changes).forEach(([cat, items]) => {
    body += '<span class="change-cat cat-' + cat + '">' + cat.charAt(0).toUpperCase() + cat.slice(1) + '</span>';
    body += items.map(i => '<div class="change-item">' + i + '</div>').join('');
  });
  return '<div class="release"><div class="release-header"><span class="release-ver">' + r.ver + '</span><span class="release-date">' + r.date + '</span></div><div class="release-body">' + body + '</div></div>';
}).join('');`,
    },
  },
  {
    id: 'ng-status-page',
    title: 'Status Page',
    category: 'data-display',
    difficulty: 'intermediate',
    description:
      'Create a service status page showing operational status of multiple services with uptime bars, incident history, and overall system health.',
    concepts: ['status indicators', 'uptime display', 'service monitoring', 'health dashboard'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>System Status</h3>
  <div id="overall" class="overall"></div>
  <div id="services" class="services"></div>
  <p class="note">Angular patterns use services with HttpClient for status pages. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.overall { padding: 16px; border-radius: 10px; text-align: center; margin-bottom: 16px; font-weight: 700; font-size: 16px; }
.overall.operational { background: rgba(34,197,94,0.15); color: #22c55e; border: 1px solid rgba(34,197,94,0.3); }
.service { display: flex; align-items: center; padding: 12px; background: #1e293b; border: 1px solid #334155; border-radius: 8px; margin-bottom: 6px; }
.service-dot { width: 10px; height: 10px; border-radius: 50%; margin-right: 12px; flex-shrink: 0; }
.service-dot.up { background: #22c55e; }
.service-dot.degraded { background: #eab308; }
.service-dot.down { background: #ef4444; }
.service-name { flex: 1; font-size: 14px; color: #e2e8f0; font-weight: 600; }
.service-uptime { font-size: 12px; color: #64748b; margin-right: 12px; }
.uptime-bar { display: flex; gap: 1px; }
.uptime-bar span { width: 4px; height: 16px; border-radius: 1px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular status page behavior
const services = [
  { name: 'API Server', status: 'up', uptime: 99.98 },
  { name: 'Database', status: 'up', uptime: 99.95 },
  { name: 'CDN', status: 'degraded', uptime: 98.5 },
  { name: 'Auth Service', status: 'up', uptime: 99.99 },
  { name: 'Email Service', status: 'up', uptime: 99.9 },
];

const allUp = services.every(s => s.status === 'up');
document.getElementById('overall').className = 'overall operational';
document.getElementById('overall').textContent = allUp ? '&#10003; All Systems Operational' : '&#9888; Some Systems Degraded';

document.getElementById('services').innerHTML = services.map(s => {
  const bars = Array.from({ length: 30 }, () => {
    const r = Math.random();
    const color = s.status === 'up' ? '#22c55e' : (r > 0.9 ? '#eab308' : '#22c55e');
    return '<span style="background:' + color + '"></span>';
  }).join('');
  return '<div class="service"><div class="service-dot ' + s.status + '"></div><div class="service-name">' + s.name + '</div><div class="service-uptime">' + s.uptime + '%</div><div class="uptime-bar">' + bars + '</div></div>';
}).join('');`,
    },
  },
  {
    id: 'ng-metric-dashboard',
    title: 'Metric Dashboard',
    category: 'data-display',
    difficulty: 'advanced',
    description:
      'Build a metric dashboard with live-updating numbers, mini sparkline charts, KPI indicators, and time-range selectors.',
    concepts: ['dashboard layout', 'live updates', 'sparklines', 'KPI display'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Dashboard</h3>
  <div class="time-range"><button class="range-btn active" data-range="1h">1H</button><button class="range-btn" data-range="24h">24H</button><button class="range-btn" data-range="7d">7D</button></div>
  <div class="dash-grid">
    <div class="metric-card"><div class="metric-label">Requests/sec</div><div class="metric-value" id="m-rps">1,247</div><canvas class="spark" id="spark1" width="120" height="30"></canvas></div>
    <div class="metric-card"><div class="metric-label">Latency (ms)</div><div class="metric-value" id="m-lat">42</div><canvas class="spark" id="spark2" width="120" height="30"></canvas></div>
    <div class="metric-card"><div class="metric-label">Error Rate</div><div class="metric-value" id="m-err">0.12%</div><canvas class="spark" id="spark3" width="120" height="30"></canvas></div>
    <div class="metric-card"><div class="metric-label">CPU Usage</div><div class="metric-value" id="m-cpu">67%</div><canvas class="spark" id="spark4" width="120" height="30"></canvas></div>
  </div>
  <p class="note">Angular patterns use RxJS observables for live dashboards. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.time-range { display: flex; gap: 4px; margin-bottom: 12px; }
.range-btn { padding: 6px 12px; border: 1px solid #334155; border-radius: 6px; background: transparent; color: #94a3b8; cursor: pointer; font-size: 12px; }
.range-btn.active { background: #ef4444; color: white; border-color: #ef4444; }
.dash-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.metric-card { background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 14px; }
.metric-label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }
.metric-value { font-size: 24px; font-weight: 700; color: #e2e8f0; margin: 4px 0 8px; }
.spark { width: 100%; height: 30px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular metric dashboard behavior
function drawSpark(id, color) {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext('2d');
  const pts = Array.from({ length: 20 }, () => Math.random() * 25 + 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  pts.forEach((p, i) => { const x = (i / (pts.length - 1)) * canvas.width; i === 0 ? ctx.moveTo(x, p) : ctx.lineTo(x, p); });
  ctx.stroke();
}

drawSpark('spark1', '#22c55e');
drawSpark('spark2', '#3b82f6');
drawSpark('spark3', '#ef4444');
drawSpark('spark4', '#f59e0b');

document.querySelectorAll('.range-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.range-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    ['spark1','spark2','spark3','spark4'].forEach((id,i) => {
      const canvas = document.getElementById(id);
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      drawSpark(id, ['#22c55e','#3b82f6','#ef4444','#f59e0b'][i]);
    });
  });
});`,
    },
  },
  // ===== navigation patterns start =====
  {
    id: 'ng-command-menu',
    title: 'Command Menu',
    category: 'navigation',
    difficulty: 'advanced',
    description:
      'Build a navigational command menu with nested submenus, recent items, keyboard-driven browsing, and global shortcut activation.',
    concepts: ['command menu', 'nested navigation', 'keyboard browsing', 'recent tracking'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Command Menu</h3>
  <button id="open-menu" class="btn-open">Open Menu (Ctrl+M)</button>
  <div id="menu-overlay" class="menu-overlay" style="display:none">
    <div class="menu-box">
      <input id="menu-search" class="menu-search" placeholder="Navigate to..." />
      <div class="menu-section"><div class="menu-section-title">Recent</div><div class="menu-item" data-page="Dashboard">&#128202; Dashboard</div><div class="menu-item" data-page="Settings">&#9881; Settings</div></div>
      <div class="menu-section"><div class="menu-section-title">Pages</div><div class="menu-item" data-page="Analytics">&#128200; Analytics</div><div class="menu-item" data-page="Users">&#128101; Users</div><div class="menu-item" data-page="Reports">&#128196; Reports</div></div>
    </div>
  </div>
  <p id="nav-result" class="result"></p>
  <p class="note">Angular patterns use router with command menu. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.btn-open { padding: 10px 20px; border: none; border-radius: 8px; background: #ef4444; color: white; font-weight: 600; cursor: pointer; }
.menu-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 100; display: flex; justify-content: center; padding-top: 60px; }
.menu-box { background: #1e293b; border: 1px solid #334155; border-radius: 12px; width: 380px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
.menu-search { width: 100%; padding: 14px 16px; border: none; border-bottom: 1px solid #334155; background: transparent; color: #e2e8f0; font-size: 14px; outline: none; }
.menu-section { padding: 8px; }
.menu-section-title { font-size: 11px; color: #64748b; text-transform: uppercase; padding: 4px 8px; letter-spacing: 1px; }
.menu-item { padding: 8px 12px; border-radius: 6px; font-size: 14px; color: #e2e8f0; cursor: pointer; }
.menu-item:hover { background: #334155; }
.result { margin-top: 12px; font-size: 14px; color: #22c55e; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular command menu behavior
const menuOverlay = document.getElementById('menu-overlay');
const menuSearch = document.getElementById('menu-search');
const navResult = document.getElementById('nav-result');

function openMenu() { menuOverlay.style.display = 'flex'; setTimeout(() => menuSearch.focus(), 50); }
function closeMenu() { menuOverlay.style.display = 'none'; menuSearch.value = ''; }

document.getElementById('open-menu').addEventListener('click', openMenu);
menuOverlay.addEventListener('click', (e) => { if (e.target === menuOverlay) closeMenu(); });
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'm') { e.preventDefault(); openMenu(); }
  if (e.key === 'Escape') closeMenu();
});

document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => { navResult.textContent = 'Navigated to: ' + item.dataset.page; closeMenu(); });
});

menuSearch.addEventListener('input', () => {
  const q = menuSearch.value.toLowerCase();
  document.querySelectorAll('.menu-item').forEach(item => {
    item.style.display = item.dataset.page.toLowerCase().includes(q) ? 'block' : 'none';
  });
});`,
    },
  },
  {
    id: 'ng-mini-map',
    title: 'Mini Map',
    category: 'navigation',
    difficulty: 'advanced',
    description:
      'Create a code-editor-style minimap that shows a zoomed-out overview of content with a viewport indicator for quick navigation.',
    concepts: ['minimap', 'viewport tracking', 'scroll sync', 'scaled preview'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Mini Map</h3>
  <div class="editor-wrap">
    <div id="editor-content" class="editor-content"></div>
    <div class="minimap-wrap">
      <div id="minimap" class="minimap"></div>
      <div id="viewport" class="viewport-indicator"></div>
    </div>
  </div>
  <p class="note">Angular patterns use custom directives for minimap views. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.editor-wrap { display: flex; border: 1px solid #334155; border-radius: 8px; overflow: hidden; height: 200px; }
.editor-content { flex: 1; overflow-y: auto; padding: 12px; font-family: monospace; font-size: 12px; line-height: 1.5; color: #94a3b8; }
.minimap-wrap { width: 60px; background: #1e293b; position: relative; border-left: 1px solid #334155; overflow: hidden; }
.minimap { transform: scaleY(0.15) scaleX(0.4); transform-origin: top left; font-family: monospace; font-size: 12px; line-height: 1.5; color: #64748b; padding: 2px; white-space: nowrap; pointer-events: none; }
.viewport-indicator { position: absolute; top: 0; left: 0; right: 0; height: 30px; background: rgba(239,68,68,0.2); border: 1px solid rgba(239,68,68,0.5); border-radius: 2px; cursor: pointer; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular minimap behavior
const content = document.getElementById('editor-content');
const minimap = document.getElementById('minimap');
const viewport = document.getElementById('viewport');

const lines = Array.from({ length: 80 }, (_, i) => 'Line ' + (i + 1) + ': ' + 'const x = ' + Math.random().toFixed(4) + ';');
content.innerHTML = lines.map(l => '<div>' + l + '</div>').join('');
minimap.innerHTML = lines.map(l => '<div>' + l + '</div>').join('');

content.addEventListener('scroll', () => {
  const ratio = content.scrollTop / (content.scrollHeight - content.clientHeight);
  const maxTop = 200 - 30;
  viewport.style.top = (ratio * maxTop) + 'px';
});

document.querySelector('.minimap-wrap').addEventListener('click', (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const ratio = (e.clientY - rect.top) / rect.height;
  content.scrollTop = ratio * (content.scrollHeight - content.clientHeight);
});`,
    },
  },
  // ===== BATCH 6: navigation continued (10 patterns) =====
  {
    id: 'ng-scroll-to-top',
    title: 'Scroll to Top',
    category: 'navigation',
    difficulty: 'beginner',
    description:
      'Create a scroll-to-top button that appears after scrolling down, with smooth scroll animation and fade-in/out transitions.',
    concepts: ['scroll detection', 'smooth scroll', 'visibility toggle', 'scroll events'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Scroll to Top</h3>
  <div id="scroll-area" class="scroll-area">
    <p>Scroll down in this container to see the button appear.</p>
    <div class="filler"></div>
    <div class="filler"></div>
    <div class="filler"></div>
    <p>Keep scrolling...</p>
    <div class="filler"></div>
    <div class="filler"></div>
    <p>Almost there...</p>
    <div class="filler"></div>
    <p>End of content.</p>
  </div>
  <button id="scroll-top-btn" class="scroll-top-btn" style="opacity:0;pointer-events:none" title="Scroll to top">&#8593;</button>
  <p class="note">Angular patterns use @HostListener for scroll detection. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.scroll-area { height: 200px; overflow-y: auto; border: 1px solid #334155; border-radius: 8px; padding: 16px; position: relative; }
.scroll-area p { color: #e2e8f0; font-size: 14px; }
.filler { height: 80px; background: #1e293b; border-radius: 6px; margin: 8px 0; }
.scroll-top-btn { position: absolute; bottom: 20px; right: 20px; width: 40px; height: 40px; border-radius: 50%; border: none; background: #ef4444; color: white; font-size: 18px; cursor: pointer; transition: opacity 0.3s; box-shadow: 0 4px 12px rgba(239,68,68,0.4); }
.scroll-top-btn:hover { background: #dc2626; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular scroll-to-top behavior
const scrollArea = document.getElementById('scroll-area');
const scrollBtn = document.getElementById('scroll-top-btn');

scrollArea.addEventListener('scroll', () => {
  const show = scrollArea.scrollTop > 100;
  scrollBtn.style.opacity = show ? '1' : '0';
  scrollBtn.style.pointerEvents = show ? 'auto' : 'none';
});

scrollBtn.addEventListener('click', () => {
  scrollArea.scrollTo({ top: 0, behavior: 'smooth' });
});`,
    },
  },
  {
    id: 'ng-anchor-links',
    title: 'Anchor Links',
    category: 'navigation',
    difficulty: 'beginner',
    description:
      'Build anchor link navigation that smoothly scrolls to sections within the page, with active state highlighting based on scroll position.',
    concepts: ['anchor navigation', 'smooth scrolling', 'active section', 'IntersectionObserver'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Anchor Links</h3>
  <nav class="anchor-nav">
    <a class="anchor-link active" href="#s1">Introduction</a>
    <a class="anchor-link" href="#s2">Features</a>
    <a class="anchor-link" href="#s3">Pricing</a>
    <a class="anchor-link" href="#s4">Contact</a>
  </nav>
  <div id="anchor-scroll" class="anchor-scroll">
    <section id="s1" class="section"><h4>Introduction</h4><p>Welcome to the application overview.</p></section>
    <section id="s2" class="section"><h4>Features</h4><p>Explore our powerful feature set.</p></section>
    <section id="s3" class="section"><h4>Pricing</h4><p>Affordable plans for every team.</p></section>
    <section id="s4" class="section"><h4>Contact</h4><p>Get in touch with our team.</p></section>
  </div>
  <p class="note">Angular patterns use Router fragment navigation. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.anchor-nav { display: flex; gap: 4px; margin-bottom: 12px; padding: 4px; background: #1e293b; border-radius: 8px; }
.anchor-link { flex: 1; text-align: center; padding: 8px; font-size: 13px; color: #94a3b8; text-decoration: none; border-radius: 6px; transition: all 0.2s; }
.anchor-link:hover { color: #e2e8f0; }
.anchor-link.active { background: #ef4444; color: white; }
.anchor-scroll { height: 180px; overflow-y: auto; scroll-behavior: smooth; }
.section { padding: 20px; min-height: 150px; background: #1e293b; border: 1px solid #334155; border-radius: 8px; margin-bottom: 8px; }
.section h4 { color: #e2e8f0; margin-bottom: 8px; }
.section p { color: #94a3b8; font-size: 14px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular anchor links behavior
const scrollContainer = document.getElementById('anchor-scroll');
const links = document.querySelectorAll('.anchor-link');

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) scrollContainer.scrollTo({ top: target.offsetTop - scrollContainer.offsetTop, behavior: 'smooth' });
  });
});

scrollContainer.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.section');
  let activeId = '';
  sections.forEach(s => {
    if (s.offsetTop - scrollContainer.offsetTop <= scrollContainer.scrollTop + 40) activeId = s.id;
  });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + activeId));
});`,
    },
  },
  {
    id: 'ng-table-of-contents',
    title: 'Table of Contents',
    category: 'navigation',
    difficulty: 'intermediate',
    description:
      'Create an auto-generated table of contents from heading elements, with nested indentation, scroll tracking, and jump-to-section.',
    concepts: ['heading extraction', 'nested TOC', 'scroll spy', 'auto-generation'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Table of Contents</h3>
  <div class="toc-layout">
    <nav id="toc" class="toc-sidebar"></nav>
    <div id="toc-content" class="toc-content">
      <h2 id="h-intro" class="heading">Introduction</h2><p class="para">Overview of the Angular framework and its core concepts.</p>
      <h2 id="h-comp" class="heading">Components</h2><p class="para">Building blocks of Angular applications with templates and logic.</p>
      <h3 id="h-template" class="heading sub">Templates</h3><p class="para">HTML templates with Angular template syntax and data binding.</p>
      <h3 id="h-styles" class="heading sub">Styles</h3><p class="para">Component-scoped styling with CSS encapsulation.</p>
      <h2 id="h-services" class="heading">Services</h2><p class="para">Reusable business logic with dependency injection.</p>
      <h2 id="h-routing" class="heading">Routing</h2><p class="para">Client-side navigation and route configuration.</p>
    </div>
  </div>
  <p class="note">Angular patterns use ContentChildren for TOC generation. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.toc-layout { display: flex; gap: 12px; }
.toc-sidebar { width: 150px; flex-shrink: 0; position: sticky; top: 0; max-height: 200px; overflow-y: auto; }
.toc-item { display: block; padding: 4px 8px; font-size: 12px; color: #94a3b8; text-decoration: none; border-left: 2px solid #334155; cursor: pointer; }
.toc-item:hover { color: #e2e8f0; }
.toc-item.active { color: #ef4444; border-left-color: #ef4444; }
.toc-item.sub { padding-left: 20px; font-size: 11px; }
.toc-content { flex: 1; height: 200px; overflow-y: auto; padding-right: 12px; }
.heading { color: #e2e8f0; margin-top: 16px; font-size: 16px; }
.heading.sub { font-size: 14px; color: #94a3b8; }
.para { font-size: 13px; color: #64748b; margin: 8px 0 16px; line-height: 1.6; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular table of contents behavior
const toc = document.getElementById('toc');
const content = document.getElementById('toc-content');
const headings = content.querySelectorAll('.heading');

headings.forEach(h => {
  const item = document.createElement('a');
  item.className = 'toc-item' + (h.classList.contains('sub') ? ' sub' : '');
  item.textContent = h.textContent;
  item.addEventListener('click', () => { content.scrollTo({ top: h.offsetTop - content.offsetTop, behavior: 'smooth' }); });
  toc.appendChild(item);
});

content.addEventListener('scroll', () => {
  const items = toc.querySelectorAll('.toc-item');
  let activeIdx = 0;
  headings.forEach((h, i) => { if (h.offsetTop - content.offsetTop <= content.scrollTop + 30) activeIdx = i; });
  items.forEach((item, i) => item.classList.toggle('active', i === activeIdx));
});`,
    },
  },
  {
    id: 'ng-step-indicator',
    title: 'Step Indicator',
    category: 'navigation',
    difficulty: 'beginner',
    description:
      'Build a step indicator (progress stepper) showing the current step in a multi-step process with completed, active, and upcoming states.',
    concepts: ['stepper UI', 'step states', 'progress tracking', 'linear flow'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Step Indicator</h3>
  <div class="stepper">
    <div class="step completed" data-step="0"><div class="step-circle">&#10003;</div><div class="step-label">Account</div></div>
    <div class="step-line completed"></div>
    <div class="step active" data-step="1"><div class="step-circle">2</div><div class="step-label">Profile</div></div>
    <div class="step-line"></div>
    <div class="step" data-step="2"><div class="step-circle">3</div><div class="step-label">Payment</div></div>
    <div class="step-line"></div>
    <div class="step" data-step="3"><div class="step-circle">4</div><div class="step-label">Confirm</div></div>
  </div>
  <div class="step-actions">
    <button id="prev-step" class="step-btn">Previous</button>
    <button id="next-step" class="step-btn primary">Next</button>
  </div>
  <p class="note">Angular patterns use MatStepper for multi-step forms. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.stepper { display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.step { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.step-circle { width: 32px; height: 32px; border-radius: 50%; border: 2px solid #334155; display: flex; align-items: center; justify-content: center; font-size: 13px; color: #64748b; font-weight: 700; }
.step.active .step-circle { border-color: #ef4444; color: #ef4444; background: rgba(239,68,68,0.1); }
.step.completed .step-circle { border-color: #22c55e; color: white; background: #22c55e; }
.step-label { font-size: 11px; color: #64748b; }
.step.active .step-label { color: #ef4444; }
.step.completed .step-label { color: #22c55e; }
.step-line { flex: 1; height: 2px; background: #334155; margin: 0 8px; margin-bottom: 20px; }
.step-line.completed { background: #22c55e; }
.step-actions { display: flex; gap: 8px; justify-content: center; }
.step-btn { padding: 8px 20px; border: 1px solid #334155; border-radius: 8px; background: transparent; color: #94a3b8; cursor: pointer; font-size: 13px; }
.step-btn.primary { background: #ef4444; color: white; border-color: #ef4444; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular step indicator behavior
let currentStep = 1;
const steps = document.querySelectorAll('.step');
const lines = document.querySelectorAll('.step-line');

function updateSteps() {
  steps.forEach((s, i) => {
    s.classList.remove('active', 'completed');
    if (i < currentStep) { s.classList.add('completed'); s.querySelector('.step-circle').innerHTML = '&#10003;'; }
    else if (i === currentStep) { s.classList.add('active'); s.querySelector('.step-circle').textContent = i + 1; }
    else { s.querySelector('.step-circle').textContent = i + 1; }
  });
  lines.forEach((l, i) => l.classList.toggle('completed', i < currentStep));
}

document.getElementById('next-step').addEventListener('click', () => { if (currentStep < 3) { currentStep++; updateSteps(); } });
document.getElementById('prev-step').addEventListener('click', () => { if (currentStep > 0) { currentStep--; updateSteps(); } });`,
    },
  },
  {
    id: 'ng-app-shell',
    title: 'App Shell',
    category: 'navigation',
    difficulty: 'intermediate',
    description:
      'Create an application shell layout with a sidebar, top bar, and content area that forms the structural foundation of a single-page app.',
    concepts: ['app layout', 'shell pattern', 'sidebar toggle', 'responsive scaffold'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <div class="app-shell">
    <div id="sidebar" class="sidebar">
      <div class="sidebar-brand">&#9632; MyApp</div>
      <nav class="sidebar-nav">
        <a class="nav-item active">&#127968; Home</a>
        <a class="nav-item">&#128202; Dashboard</a>
        <a class="nav-item">&#128101; Users</a>
        <a class="nav-item">&#9881; Settings</a>
      </nav>
    </div>
    <div class="main-area">
      <div class="topbar"><button id="toggle-sidebar" class="menu-btn">&#9776;</button><span class="topbar-title">Dashboard</span></div>
      <div class="content-area"><p>Main content renders here based on the active route.</p></div>
    </div>
  </div>
  <p class="note">Angular patterns use router-outlet with layout components. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.app-shell { display: flex; border: 1px solid #334155; border-radius: 8px; overflow: hidden; height: 240px; }
.sidebar { width: 160px; background: #1e293b; border-right: 1px solid #334155; flex-shrink: 0; transition: width 0.3s; overflow: hidden; }
.sidebar.collapsed { width: 0; }
.sidebar-brand { padding: 14px 16px; font-weight: 800; color: #ef4444; font-size: 14px; border-bottom: 1px solid #334155; }
.sidebar-nav { padding: 8px; }
.nav-item { display: block; padding: 8px 10px; font-size: 13px; color: #94a3b8; border-radius: 6px; cursor: pointer; margin-bottom: 2px; text-decoration: none; }
.nav-item:hover { background: #334155; color: #e2e8f0; }
.nav-item.active { background: rgba(239,68,68,0.15); color: #ef4444; }
.main-area { flex: 1; display: flex; flex-direction: column; }
.topbar { display: flex; align-items: center; gap: 12px; padding: 10px 16px; border-bottom: 1px solid #334155; background: #1e293b; }
.menu-btn { background: none; border: none; color: #94a3b8; font-size: 18px; cursor: pointer; }
.topbar-title { font-size: 14px; font-weight: 700; color: #e2e8f0; }
.content-area { flex: 1; padding: 16px; }
.content-area p { font-size: 14px; color: #94a3b8; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular app shell behavior
const sidebar = document.getElementById('sidebar');
document.getElementById('toggle-sidebar').addEventListener('click', () => sidebar.classList.toggle('collapsed'));

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    document.querySelector('.topbar-title').textContent = item.textContent.trim();
    document.querySelector('.content-area p').textContent = 'Viewing: ' + item.textContent.trim();
  });
});`,
    },
  },
  {
    id: 'ng-header-scroll-hide',
    title: 'Header Scroll Hide',
    category: 'navigation',
    difficulty: 'intermediate',
    description:
      'Build a header that hides on scroll down and reveals on scroll up, with smooth slide transition and shadow on scroll state.',
    concepts: ['scroll direction', 'header visibility', 'transform animation', 'scroll state'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <div id="scroll-container" class="scroll-container">
    <header id="hide-header" class="hide-header">Scroll Down to Hide Me</header>
    <div class="scroll-content">
      <p>Scroll within this container. The header hides on scroll down and reappears on scroll up.</p>
      <div class="block"></div><div class="block"></div><div class="block"></div>
      <p>More content below...</p>
      <div class="block"></div><div class="block"></div><div class="block"></div>
    </div>
  </div>
  <p class="note">Angular patterns use @HostListener scroll events. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.scroll-container { position: relative; height: 220px; overflow-y: auto; border: 1px solid #334155; border-radius: 8px; }
.hide-header { position: sticky; top: 0; padding: 12px 16px; background: #ef4444; color: white; font-weight: 700; font-size: 14px; z-index: 5; transition: transform 0.3s; text-align: center; }
.hide-header.hidden { transform: translateY(-100%); }
.scroll-content { padding: 16px; }
.scroll-content p { color: #94a3b8; font-size: 14px; margin-bottom: 12px; }
.block { height: 60px; background: #1e293b; border-radius: 6px; margin-bottom: 8px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular header scroll hide behavior
const container = document.getElementById('scroll-container');
const header = document.getElementById('hide-header');
let lastScrollTop = 0;

container.addEventListener('scroll', () => {
  const st = container.scrollTop;
  header.classList.toggle('hidden', st > lastScrollTop && st > 50);
  lastScrollTop = st;
});`,
    },
  },
  {
    id: 'ng-sticky-header',
    title: 'Sticky Header',
    category: 'navigation',
    difficulty: 'beginner',
    description:
      'Create a sticky header that remains fixed at the top when scrolling, with optional compact mode and background change on scroll.',
    concepts: ['sticky positioning', 'compact header', 'scroll detection', 'CSS transitions'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <div id="sticky-scroll" class="sticky-scroll">
    <header id="sticky-header" class="sticky-header">
      <span class="brand">&#9632; Brand</span>
      <nav class="header-nav"><a class="header-link">Home</a><a class="header-link">About</a><a class="header-link">Contact</a></nav>
    </header>
    <div class="page-content">
      <p>Scroll to see the header stick and become compact.</p>
      <div class="block"></div><div class="block"></div><div class="block"></div>
      <div class="block"></div><div class="block"></div><div class="block"></div>
    </div>
  </div>
  <p class="note">Angular patterns use position:sticky with scroll listeners. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.sticky-scroll { height: 220px; overflow-y: auto; border: 1px solid #334155; border-radius: 8px; }
.sticky-header { position: sticky; top: 0; z-index: 5; display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; background: #1e293b; border-bottom: 1px solid #334155; transition: all 0.3s; }
.sticky-header.compact { padding: 8px 16px; background: rgba(30,41,59,0.95); backdrop-filter: blur(8px); box-shadow: 0 2px 8px rgba(0,0,0,0.3); }
.brand { font-weight: 800; color: #ef4444; font-size: 14px; }
.header-nav { display: flex; gap: 12px; }
.header-link { font-size: 13px; color: #94a3b8; cursor: pointer; }
.header-link:hover { color: #e2e8f0; }
.page-content { padding: 16px; }
.page-content p { color: #94a3b8; font-size: 14px; margin-bottom: 12px; }
.block { height: 60px; background: #0f172a; border-radius: 6px; margin-bottom: 8px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular sticky header behavior
const stickyScroll = document.getElementById('sticky-scroll');
const stickyHeader = document.getElementById('sticky-header');

stickyScroll.addEventListener('scroll', () => {
  stickyHeader.classList.toggle('compact', stickyScroll.scrollTop > 30);
});`,
    },
  },
  {
    id: 'ng-page-transitions',
    title: 'Page Transitions',
    category: 'navigation',
    difficulty: 'intermediate',
    description:
      'Build animated page transitions that smoothly fade/slide between views when navigating, using CSS transitions triggered by route changes.',
    concepts: ['page transition', 'CSS animations', 'view switching', 'route animation'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Page Transitions</h3>
  <nav class="page-nav">
    <button class="page-link active" data-page="home">Home</button>
    <button class="page-link" data-page="about">About</button>
    <button class="page-link" data-page="contact">Contact</button>
  </nav>
  <div class="page-container">
    <div id="page-home" class="page active">
      <h4>Home</h4><p>Welcome to the home page with smooth transitions.</p>
    </div>
    <div id="page-about" class="page">
      <h4>About</h4><p>Learn more about us and our mission.</p>
    </div>
    <div id="page-contact" class="page">
      <h4>Contact</h4><p>Get in touch via email or phone.</p>
    </div>
  </div>
  <p class="note">Angular patterns use route animations with @angular/animations. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.page-nav { display: flex; gap: 4px; margin-bottom: 12px; }
.page-link { padding: 8px 16px; border: 1px solid #334155; border-radius: 8px; background: transparent; color: #94a3b8; cursor: pointer; font-size: 13px; }
.page-link.active { background: #ef4444; color: white; border-color: #ef4444; }
.page-container { position: relative; min-height: 120px; overflow: hidden; }
.page { position: absolute; inset: 0; padding: 16px; background: #1e293b; border-radius: 8px; opacity: 0; transform: translateX(20px); transition: all 0.3s ease; pointer-events: none; }
.page.active { opacity: 1; transform: translateX(0); pointer-events: auto; position: relative; }
.page h4 { color: #e2e8f0; margin-bottom: 8px; }
.page p { color: #94a3b8; font-size: 14px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular page transitions behavior
const pageLinks = document.querySelectorAll('.page-link');
const pages = document.querySelectorAll('.page');

pageLinks.forEach(link => {
  link.addEventListener('click', () => {
    pageLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + link.dataset.page).classList.add('active');
  });
});`,
    },
  },
  {
    id: 'ng-route-guard',
    title: 'Route Guard',
    category: 'navigation',
    difficulty: 'intermediate',
    description:
      'Simulate Angular route guards (canActivate, canDeactivate) with a login check, unsaved changes warning, and navigation blocking.',
    concepts: ['route guards', 'canActivate', 'canDeactivate', 'auth check'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Route Guard Demo</h3>
  <div class="guard-controls">
    <label><input type="checkbox" id="auth-check" /> Logged In</label>
    <label><input type="checkbox" id="dirty-check" /> Has Unsaved Changes</label>
  </div>
  <nav class="guard-nav">
    <button class="guard-link" data-page="public">Public Page</button>
    <button class="guard-link" data-page="protected">Protected Page</button>
    <button class="guard-link" data-page="editor">Editor</button>
  </nav>
  <div id="guard-content" class="guard-content"><p>Click a link to navigate. Toggle checkboxes to simulate auth and dirty state.</p></div>
  <div id="guard-log" class="guard-log"></div>
  <p class="note">Angular patterns use CanActivate and CanDeactivate guards. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.guard-controls { display: flex; gap: 16px; margin-bottom: 12px; font-size: 13px; color: #94a3b8; }
.guard-nav { display: flex; gap: 4px; margin-bottom: 12px; }
.guard-link { padding: 8px 14px; border: 1px solid #334155; border-radius: 6px; background: transparent; color: #94a3b8; cursor: pointer; font-size: 13px; }
.guard-link:hover { border-color: #ef4444; color: #e2e8f0; }
.guard-content { padding: 16px; background: #1e293b; border-radius: 8px; min-height: 60px; margin-bottom: 8px; }
.guard-content p { color: #e2e8f0; font-size: 14px; }
.guard-log { font-size: 12px; color: #64748b; }
.guard-log .blocked { color: #ef4444; }
.guard-log .allowed { color: #22c55e; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular route guard behavior
const authCheck = document.getElementById('auth-check');
const dirtyCheck = document.getElementById('dirty-check');
const content = document.getElementById('guard-content');
const log = document.getElementById('guard-log');
let currentPage = 'public';

document.querySelectorAll('.guard-link').forEach(link => {
  link.addEventListener('click', () => {
    const page = link.dataset.page;
    // canDeactivate check
    if (dirtyCheck.checked && currentPage === 'editor') {
      log.innerHTML += '<div class="blocked">Blocked: Unsaved changes in editor!</div>';
      return;
    }
    // canActivate check
    if (page === 'protected' && !authCheck.checked) {
      log.innerHTML += '<div class="blocked">Blocked: Login required for ' + page + '</div>';
      return;
    }
    log.innerHTML += '<div class="allowed">Navigated to: ' + page + '</div>';
    currentPage = page;
    content.innerHTML = '<p>You are on the <strong>' + page + '</strong> page.</p>';
  });
});`,
    },
  },
  {
    id: 'ng-nested-routes',
    title: 'Nested Routes',
    category: 'navigation',
    difficulty: 'intermediate',
    description:
      'Demonstrate nested routing with parent and child views, where child content renders inside the parent layout using simulated router-outlet.',
    concepts: ['nested routing', 'child routes', 'router-outlet', 'route hierarchy'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Nested Routes</h3>
  <nav class="parent-nav">
    <button class="parent-link active" data-parent="dashboard">Dashboard</button>
    <button class="parent-link" data-parent="settings">Settings</button>
  </nav>
  <div class="parent-content">
    <div id="parent-view" class="parent-view">
      <nav id="child-nav" class="child-nav">
        <button class="child-link active" data-child="overview">Overview</button>
        <button class="child-link" data-child="stats">Stats</button>
      </nav>
      <div id="child-view" class="child-view"><p>Dashboard / Overview</p></div>
    </div>
  </div>
  <p class="note">Angular patterns use children routes with router-outlet. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.parent-nav { display: flex; gap: 4px; margin-bottom: 8px; }
.parent-link { padding: 8px 14px; border: 1px solid #334155; border-radius: 6px; background: transparent; color: #94a3b8; cursor: pointer; font-size: 13px; }
.parent-link.active { background: #ef4444; color: white; border-color: #ef4444; }
.parent-content { background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 12px; }
.child-nav { display: flex; gap: 4px; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #334155; }
.child-link { padding: 6px 12px; border: 1px solid #334155; border-radius: 6px; background: transparent; color: #94a3b8; cursor: pointer; font-size: 12px; }
.child-link.active { background: #334155; color: #e2e8f0; }
.child-view p { font-size: 14px; color: #e2e8f0; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular nested routes behavior
const childRoutes = {
  dashboard: ['overview', 'stats'],
  settings: ['profile', 'security']
};
let parentRoute = 'dashboard';
let childRoute = 'overview';

document.querySelectorAll('.parent-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.parent-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    parentRoute = link.dataset.parent;
    const children = childRoutes[parentRoute];
    childRoute = children[0];
    document.getElementById('child-nav').innerHTML = children.map((c, i) => '<button class="child-link' + (i === 0 ? ' active' : '') + '" data-child="' + c + '">' + c.charAt(0).toUpperCase() + c.slice(1) + '</button>').join('');
    updateChildView();
    bindChildLinks();
  });
});

function bindChildLinks() {
  document.querySelectorAll('.child-link').forEach(cl => {
    cl.addEventListener('click', () => {
      document.querySelectorAll('.child-link').forEach(l => l.classList.remove('active'));
      cl.classList.add('active');
      childRoute = cl.dataset.child;
      updateChildView();
    });
  });
}

function updateChildView() {
  document.getElementById('child-view').innerHTML = '<p>' + parentRoute.charAt(0).toUpperCase() + parentRoute.slice(1) + ' / ' + childRoute.charAt(0).toUpperCase() + childRoute.slice(1) + '</p>';
}

bindChildLinks();`,
    },
  },
  // ===== BATCH 7: navigation finish (5) + advanced start (7) =====
  {
    id: 'ng-tab-router',
    title: 'Tab Router',
    category: 'navigation',
    difficulty: 'intermediate',
    description:
      'Build a tab-based router where each tab maps to a route, preserving tab state across navigation and supporting lazy loading indicators.',
    concepts: ['tab routing', 'lazy loading', 'state preservation', 'route-tab mapping'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Tab Router</h3>
  <div class="tab-bar">
    <button class="tab active" data-tab="feed">Feed</button>
    <button class="tab" data-tab="explore">Explore</button>
    <button class="tab" data-tab="messages">Messages</button>
    <button class="tab" data-tab="profile">Profile</button>
    <div id="tab-indicator" class="tab-indicator"></div>
  </div>
  <div class="tab-content">
    <div id="tab-feed" class="tab-panel active"><p>Your personalized feed content.</p></div>
    <div id="tab-explore" class="tab-panel"><p>Explore trending topics and users.</p></div>
    <div id="tab-messages" class="tab-panel"><p>Your message inbox (3 unread).</p></div>
    <div id="tab-profile" class="tab-panel"><p>Your profile settings and info.</p></div>
  </div>
  <p class="note">Angular patterns use router with tab components. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.tab-bar { display: flex; position: relative; background: #1e293b; border-radius: 8px 8px 0 0; border-bottom: 1px solid #334155; }
.tab { flex: 1; padding: 12px; border: none; background: transparent; color: #94a3b8; font-size: 13px; font-weight: 600; cursor: pointer; transition: color 0.2s; }
.tab.active { color: #ef4444; }
.tab:hover { color: #e2e8f0; }
.tab-indicator { position: absolute; bottom: 0; left: 0; width: 25%; height: 2px; background: #ef4444; transition: left 0.25s ease; }
.tab-content { background: #1e293b; border-radius: 0 0 8px 8px; padding: 16px; min-height: 80px; }
.tab-panel { display: none; }
.tab-panel.active { display: block; }
.tab-panel p { font-size: 14px; color: #e2e8f0; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular tab router behavior
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');
const indicator = document.getElementById('tab-indicator');

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    indicator.style.left = (i * 25) + '%';
  });
});`,
    },
  },
  {
    id: 'ng-deep-linking',
    title: 'Deep Linking',
    category: 'navigation',
    difficulty: 'intermediate',
    description:
      'Implement deep linking that syncs application state with URL hash parameters, allowing direct navigation to specific views and states.',
    concepts: ['deep linking', 'hash routing', 'URL state', 'history API'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Deep Linking</h3>
  <div class="link-controls">
    <button class="deep-link" data-hash="#/products">Products</button>
    <button class="deep-link" data-hash="#/products/42">Product #42</button>
    <button class="deep-link" data-hash="#/settings">Settings</button>
  </div>
  <div class="url-display">URL: <code id="current-url">#/</code></div>
  <div id="deep-content" class="deep-content"><p>Home page. Click links above to navigate via deep links.</p></div>
  <p class="note">Angular patterns use ActivatedRoute for deep linking. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.link-controls { display: flex; gap: 6px; margin-bottom: 12px; }
.deep-link { padding: 8px 14px; border: 1px solid #334155; border-radius: 6px; background: transparent; color: #94a3b8; cursor: pointer; font-size: 13px; }
.deep-link:hover { border-color: #ef4444; color: #e2e8f0; }
.url-display { font-size: 13px; color: #64748b; margin-bottom: 12px; }
.url-display code { background: #1e293b; padding: 4px 8px; border-radius: 4px; color: #ef4444; }
.deep-content { padding: 16px; background: #1e293b; border-radius: 8px; min-height: 60px; }
.deep-content p { font-size: 14px; color: #e2e8f0; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular deep linking behavior
const urlEl = document.getElementById('current-url');
const deepContent = document.getElementById('deep-content');

const routes = {
  '#/': 'Home page. Click links above to navigate via deep links.',
  '#/products': 'Product listing with filters and search.',
  '#/products/42': 'Product #42: Angular Framework - The complete platform.',
  '#/settings': 'Application settings and preferences.'
};

function navigate(hash) {
  urlEl.textContent = hash;
  const content = routes[hash] || 'Page not found (404)';
  deepContent.innerHTML = '<p>' + content + '</p>';
}

document.querySelectorAll('.deep-link').forEach(link => {
  link.addEventListener('click', () => navigate(link.dataset.hash));
});

navigate('#/');`,
    },
  },
  {
    id: 'ng-url-state',
    title: 'URL State Management',
    category: 'navigation',
    difficulty: 'advanced',
    description:
      'Sync complex filter/sort/page state with URL query parameters, enabling shareable and bookmarkable filtered views.',
    concepts: ['URL params', 'state sync', 'query strings', 'shareable state'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>URL State</h3>
  <div class="filter-bar">
    <select id="state-category"><option value="">All Categories</option><option value="tech">Tech</option><option value="design">Design</option><option value="business">Business</option></select>
    <select id="state-sort"><option value="newest">Newest</option><option value="oldest">Oldest</option><option value="popular">Popular</option></select>
    <input id="state-search" placeholder="Search..." />
  </div>
  <div class="state-display">State URL: <code id="state-url">?</code></div>
  <div id="state-results" class="state-results"></div>
  <p class="note">Angular patterns use ActivatedRoute queryParams. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.filter-bar { display: flex; gap: 8px; margin-bottom: 12px; }
select, input { padding: 8px; border: 1px solid #334155; border-radius: 6px; background: #1e293b; color: #e2e8f0; outline: none; font-size: 13px; }
select:focus, input:focus { border-color: #ef4444; }
input { flex: 1; }
.state-display { font-size: 12px; color: #64748b; margin-bottom: 12px; }
.state-display code { background: #1e293b; padding: 4px 8px; border-radius: 4px; color: #ef4444; word-break: break-all; }
.state-results { padding: 12px; background: #1e293b; border-radius: 8px; font-size: 13px; color: #e2e8f0; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular URL state management behavior
const cat = document.getElementById('state-category');
const sort = document.getElementById('state-sort');
const search = document.getElementById('state-search');
const urlEl = document.getElementById('state-url');
const results = document.getElementById('state-results');

function updateState() {
  const params = new URLSearchParams();
  if (cat.value) params.set('category', cat.value);
  if (sort.value !== 'newest') params.set('sort', sort.value);
  if (search.value) params.set('q', search.value);
  const qs = params.toString();
  urlEl.textContent = '?' + (qs || '(default)');
  results.textContent = 'Showing results for: category=' + (cat.value || 'all') + ', sort=' + sort.value + ', search="' + search.value + '"';
}

cat.addEventListener('change', updateState);
sort.addEventListener('change', updateState);
search.addEventListener('input', updateState);
updateState();`,
    },
  },
  {
    id: 'ng-back-to-top',
    title: 'Back to Top',
    category: 'navigation',
    difficulty: 'beginner',
    description:
      'Create a simple back-to-top button with progress ring indicator showing how far the user has scrolled.',
    concepts: ['scroll progress', 'SVG circle', 'smooth scroll', 'progress indicator'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Back to Top with Progress</h3>
  <div id="btt-scroll" class="btt-scroll">
    <p>Scroll down to see the progress ring fill up.</p>
    <div class="filler"></div><div class="filler"></div><div class="filler"></div>
    <div class="filler"></div><div class="filler"></div><div class="filler"></div>
    <p>End of content.</p>
  </div>
  <button id="btt-btn" class="btt-btn" style="opacity:0;pointer-events:none">
    <svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#334155" stroke-width="2"/><circle id="btt-ring" cx="20" cy="20" r="18" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="113" stroke-dashoffset="113" transform="rotate(-90 20 20)"/></svg>
    <span class="btt-arrow">&#8593;</span>
  </button>
  <p class="note">Angular patterns use scroll directives for back-to-top. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.btt-scroll { height: 200px; overflow-y: auto; border: 1px solid #334155; border-radius: 8px; padding: 16px; position: relative; }
.btt-scroll p { color: #e2e8f0; font-size: 14px; }
.filler { height: 60px; background: #1e293b; border-radius: 6px; margin: 8px 0; }
.btt-btn { position: absolute; bottom: 20px; right: 20px; width: 44px; height: 44px; border-radius: 50%; border: none; background: #1e293b; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: opacity 0.3s; }
.btt-arrow { position: absolute; color: #ef4444; font-size: 16px; font-weight: 700; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular back-to-top with progress behavior
const bttScroll = document.getElementById('btt-scroll');
const bttBtn = document.getElementById('btt-btn');
const ring = document.getElementById('btt-ring');
const circumference = 113;

bttScroll.addEventListener('scroll', () => {
  const pct = bttScroll.scrollTop / (bttScroll.scrollHeight - bttScroll.clientHeight);
  ring.style.strokeDashoffset = circumference - (pct * circumference);
  bttBtn.style.opacity = pct > 0.1 ? '1' : '0';
  bttBtn.style.pointerEvents = pct > 0.1 ? 'auto' : 'none';
});

bttBtn.addEventListener('click', () => bttScroll.scrollTo({ top: 0, behavior: 'smooth' }));`,
    },
  },
  {
    id: 'ng-scroll-spy',
    title: 'Scroll Spy',
    category: 'navigation',
    difficulty: 'intermediate',
    description:
      'Implement a scroll spy that highlights the navigation link corresponding to the currently visible section as the user scrolls.',
    concepts: [
      'scroll spy',
      'IntersectionObserver',
      'active section detection',
      'nav highlighting',
    ],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Scroll Spy</h3>
  <div class="spy-layout">
    <nav class="spy-nav">
      <a class="spy-link active" data-section="s-intro">Introduction</a>
      <a class="spy-link" data-section="s-setup">Setup</a>
      <a class="spy-link" data-section="s-usage">Usage</a>
      <a class="spy-link" data-section="s-api">API Reference</a>
      <a class="spy-link" data-section="s-faq">FAQ</a>
    </nav>
    <div id="spy-content" class="spy-content">
      <div id="s-intro" class="spy-section"><h4>Introduction</h4><p>Overview of the framework and getting started guide.</p></div>
      <div id="s-setup" class="spy-section"><h4>Setup</h4><p>Installation steps and environment configuration.</p></div>
      <div id="s-usage" class="spy-section"><h4>Usage</h4><p>Basic usage patterns and best practices.</p></div>
      <div id="s-api" class="spy-section"><h4>API Reference</h4><p>Complete API documentation with examples.</p></div>
      <div id="s-faq" class="spy-section"><h4>FAQ</h4><p>Frequently asked questions and troubleshooting.</p></div>
    </div>
  </div>
  <p class="note">Angular patterns use directives for scroll spy behavior. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.spy-layout { display: flex; gap: 12px; }
.spy-nav { width: 130px; flex-shrink: 0; }
.spy-link { display: block; padding: 6px 10px; font-size: 12px; color: #94a3b8; border-left: 2px solid #334155; cursor: pointer; text-decoration: none; margin-bottom: 2px; }
.spy-link:hover { color: #e2e8f0; }
.spy-link.active { color: #ef4444; border-left-color: #ef4444; font-weight: 600; }
.spy-content { flex: 1; height: 200px; overflow-y: auto; scroll-behavior: smooth; }
.spy-section { padding: 16px; background: #1e293b; border: 1px solid #334155; border-radius: 8px; margin-bottom: 8px; min-height: 120px; }
.spy-section h4 { color: #e2e8f0; margin-bottom: 8px; }
.spy-section p { color: #94a3b8; font-size: 13px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular scroll spy behavior
const spyContent = document.getElementById('spy-content');
const spyLinks = document.querySelectorAll('.spy-link');
const spySections = document.querySelectorAll('.spy-section');

spyLinks.forEach(link => {
  link.addEventListener('click', () => {
    const target = document.getElementById(link.dataset.section);
    if (target) spyContent.scrollTo({ top: target.offsetTop - spyContent.offsetTop, behavior: 'smooth' });
  });
});

spyContent.addEventListener('scroll', () => {
  let activeId = '';
  spySections.forEach(s => {
    if (s.offsetTop - spyContent.offsetTop <= spyContent.scrollTop + 40) activeId = s.id;
  });
  spyLinks.forEach(l => l.classList.toggle('active', l.dataset.section === activeId));
});`,
    },
  },
  // ===== advanced patterns start =====
  {
    id: 'ng-theme-switcher',
    title: 'Theme Switcher',
    category: 'advanced',
    difficulty: 'intermediate',
    description:
      'Build a theme switcher that toggles between light and dark modes with smooth transitions, persisting preference to localStorage.',
    concepts: ['theme switching', 'CSS variables', 'localStorage', 'prefers-color-scheme'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <div id="theme-demo" class="theme-demo" data-theme="dark">
    <div class="theme-header">
      <h3>Theme Switcher</h3>
      <button id="theme-toggle" class="theme-toggle">&#9788; Light</button>
    </div>
    <div class="theme-card"><p>This card changes appearance based on the selected theme. The preference is persisted.</p></div>
    <div class="theme-card"><p>All colors are driven by CSS custom properties that update when the theme changes.</p></div>
  </div>
  <p class="note">Angular patterns use services with BehaviorSubject for theming. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.theme-demo { padding: 16px; border-radius: 10px; transition: all 0.3s; }
.theme-demo[data-theme="dark"] { background: #1a1a2e; color: #e2e8f0; }
.theme-demo[data-theme="light"] { background: #f8fafc; color: #1e293b; }
.theme-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.theme-toggle { padding: 6px 14px; border: 1px solid #334155; border-radius: 20px; background: transparent; cursor: pointer; font-size: 13px; transition: all 0.3s; }
.theme-demo[data-theme="dark"] .theme-toggle { color: #e2e8f0; border-color: #334155; }
.theme-demo[data-theme="light"] .theme-toggle { color: #1e293b; border-color: #cbd5e1; }
.theme-card { padding: 14px; border-radius: 8px; margin-bottom: 8px; transition: all 0.3s; }
.theme-demo[data-theme="dark"] .theme-card { background: #0f172a; border: 1px solid #334155; }
.theme-demo[data-theme="light"] .theme-card { background: white; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.theme-card p { font-size: 13px; line-height: 1.6; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular theme switcher behavior
const demo = document.getElementById('theme-demo');
const toggle = document.getElementById('theme-toggle');

toggle.addEventListener('click', () => {
  const isDark = demo.dataset.theme === 'dark';
  demo.dataset.theme = isDark ? 'light' : 'dark';
  toggle.innerHTML = isDark ? '&#9790; Dark' : '&#9788; Light';
});`,
    },
  },
  {
    id: 'ng-i18n-locale',
    title: 'i18n Locale Switcher',
    category: 'advanced',
    difficulty: 'intermediate',
    description:
      'Create an internationalization demo that switches between languages, updating all visible text, date formats, and number formatting.',
    concepts: ['i18n', 'locale switching', 'text translation', 'Intl API'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <div class="i18n-header"><h3 id="i18n-title">Internationalization</h3>
  <select id="locale-select"><option value="en">English</option><option value="es">Espa&#241;ol</option><option value="ja">&#26085;&#26412;&#35486;</option></select></div>
  <div class="i18n-card">
    <p id="i18n-greeting"></p>
    <p id="i18n-date"></p>
    <p id="i18n-number"></p>
    <button id="i18n-btn" class="i18n-btn"></button>
  </div>
  <p class="note">Angular patterns use @angular/localize for i18n. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.i18n-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
select { padding: 6px 10px; border: 1px solid #334155; border-radius: 6px; background: #1e293b; color: #e2e8f0; outline: none; }
.i18n-card { background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 16px; }
.i18n-card p { font-size: 14px; color: #e2e8f0; margin-bottom: 8px; }
.i18n-btn { padding: 8px 16px; border: none; border-radius: 6px; background: #ef4444; color: white; font-weight: 600; cursor: pointer; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular i18n locale behavior
const translations = {
  en: { title: 'Internationalization', greeting: 'Hello! Welcome to our app.', btn: 'Get Started', locale: 'en-US' },
  es: { title: 'Internacionalización', greeting: '¡Hola! Bienvenido a nuestra app.', btn: 'Comenzar', locale: 'es-ES' },
  ja: { title: '国際化', greeting: 'こんにちは！アプリへようこそ。', btn: '始める', locale: 'ja-JP' }
};

const sel = document.getElementById('locale-select');
function updateLocale() {
  const t = translations[sel.value];
  document.getElementById('i18n-title').textContent = t.title;
  document.getElementById('i18n-greeting').textContent = t.greeting;
  document.getElementById('i18n-date').textContent = new Date().toLocaleDateString(t.locale, { dateStyle: 'full' });
  document.getElementById('i18n-number').textContent = (1234567.89).toLocaleString(t.locale, { style: 'currency', currency: sel.value === 'ja' ? 'JPY' : sel.value === 'es' ? 'EUR' : 'USD' });
  document.getElementById('i18n-btn').textContent = t.btn;
}
sel.addEventListener('change', updateLocale);
updateLocale();`,
    },
  },
  {
    id: 'ng-a11y-focus-trap',
    title: 'Accessibility Focus Trap',
    category: 'advanced',
    difficulty: 'advanced',
    description:
      'Implement a focus trap that keeps keyboard focus within a modal or dialog, cycling through focusable elements and preventing focus escape.',
    concepts: ['focus trap', 'keyboard a11y', 'tab cycling', 'focusable elements'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Focus Trap</h3>
  <button id="open-trap" class="btn-open">Open Dialog with Focus Trap</button>
  <div id="trap-overlay" class="trap-overlay" style="display:none">
    <div id="trap-dialog" class="trap-dialog" role="dialog" aria-modal="true" aria-label="Focus trap demo">
      <h4>Focus Trap Active</h4>
      <p>Tab key cycles only within this dialog.</p>
      <input id="trap-input" placeholder="Name..." />
      <div class="trap-actions">
        <button class="trap-btn secondary" id="trap-cancel">Cancel</button>
        <button class="trap-btn primary" id="trap-confirm">Confirm</button>
      </div>
    </div>
  </div>
  <p id="trap-result" class="result"></p>
  <p class="note">Angular patterns use CdkTrapFocus for accessibility. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.btn-open { padding: 10px 20px; border: none; border-radius: 8px; background: #ef4444; color: white; font-weight: 600; cursor: pointer; }
.trap-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 100; display: flex; align-items: center; justify-content: center; }
.trap-dialog { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 24px; width: 320px; }
.trap-dialog h4 { color: #e2e8f0; margin-bottom: 8px; }
.trap-dialog p { font-size: 13px; color: #94a3b8; margin-bottom: 16px; }
.trap-dialog input { width: 100%; padding: 10px; border: 1px solid #334155; border-radius: 6px; background: #0f172a; color: #e2e8f0; outline: none; margin-bottom: 16px; }
.trap-dialog input:focus { border-color: #ef4444; }
.trap-actions { display: flex; gap: 8px; }
.trap-btn { flex: 1; padding: 10px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
.trap-btn.primary { background: #ef4444; color: white; }
.trap-btn.secondary { background: #334155; color: #94a3b8; }
.result { margin-top: 12px; font-size: 14px; color: #22c55e; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular focus trap behavior
const overlay = document.getElementById('trap-overlay');
const dialog = document.getElementById('trap-dialog');

function openTrap() {
  overlay.style.display = 'flex';
  const focusable = dialog.querySelectorAll('input, button');
  focusable[0].focus();

  dialog.addEventListener('keydown', function trapHandler(e) {
    if (e.key === 'Tab') {
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (e.key === 'Escape') closeTrap();
  });
}

function closeTrap() { overlay.style.display = 'none'; }

document.getElementById('open-trap').addEventListener('click', openTrap);
document.getElementById('trap-cancel').addEventListener('click', closeTrap);
document.getElementById('trap-confirm').addEventListener('click', () => {
  document.getElementById('trap-result').textContent = 'Confirmed: ' + document.getElementById('trap-input').value;
  closeTrap();
});`,
    },
  },
  {
    id: 'ng-a11y-live-region',
    title: 'Accessibility Live Region',
    category: 'advanced',
    difficulty: 'intermediate',
    description:
      'Demonstrate ARIA live regions that announce dynamic content changes to screen readers using polite and assertive modes.',
    concepts: ['aria-live', 'screen reader', 'polite/assertive', 'dynamic announcements'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>ARIA Live Regions</h3>
  <div class="live-controls">
    <button id="polite-btn" class="live-btn">Polite Update</button>
    <button id="assertive-btn" class="live-btn warning">Assertive Alert</button>
    <button id="clear-btn" class="live-btn secondary">Clear</button>
  </div>
  <div class="live-section">
    <label>Polite Region (aria-live="polite")</label>
    <div id="polite-region" class="live-region" aria-live="polite" role="status"></div>
  </div>
  <div class="live-section">
    <label>Assertive Region (aria-live="assertive")</label>
    <div id="assertive-region" class="live-region assertive" aria-live="assertive" role="alert"></div>
  </div>
  <div id="log" class="live-log"></div>
  <p class="note">Angular patterns use LiveAnnouncer from CDK. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.live-controls { display: flex; gap: 8px; margin-bottom: 16px; }
.live-btn { padding: 8px 16px; border: none; border-radius: 6px; background: #ef4444; color: white; font-weight: 600; cursor: pointer; font-size: 13px; }
.live-btn.warning { background: #f59e0b; }
.live-btn.secondary { background: #334155; color: #94a3b8; }
.live-section { margin-bottom: 12px; }
.live-section label { font-size: 12px; color: #64748b; display: block; margin-bottom: 4px; }
.live-region { padding: 12px; background: #1e293b; border: 1px solid #334155; border-radius: 8px; min-height: 40px; font-size: 14px; color: #e2e8f0; transition: border-color 0.3s; }
.live-region.assertive { border-color: #f59e0b; }
.live-region.flash { border-color: #ef4444; }
.live-log { font-size: 11px; color: #64748b; max-height: 60px; overflow-y: auto; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular LiveAnnouncer behavior
let counter = 0;
const polite = document.getElementById('polite-region');
const assertive = document.getElementById('assertive-region');
const log = document.getElementById('log');

document.getElementById('polite-btn').addEventListener('click', () => {
  counter++;
  const msg = 'Update #' + counter + ': Data refreshed successfully at ' + new Date().toLocaleTimeString();
  polite.textContent = msg;
  polite.classList.add('flash');
  setTimeout(() => polite.classList.remove('flash'), 500);
  log.innerHTML += '<div>Polite: ' + msg + '</div>';
});

document.getElementById('assertive-btn').addEventListener('click', () => {
  const msg = 'Alert: Immediate attention required!';
  assertive.textContent = msg;
  assertive.classList.add('flash');
  setTimeout(() => assertive.classList.remove('flash'), 500);
  log.innerHTML += '<div>Assertive: ' + msg + '</div>';
});

document.getElementById('clear-btn').addEventListener('click', () => {
  polite.textContent = '';
  assertive.textContent = '';
  log.innerHTML = '';
});`,
    },
  },
  // ===== BATCH 8: advanced continued (12 patterns) =====
  {
    id: 'ng-offline-indicator',
    title: 'Offline Indicator',
    category: 'advanced',
    difficulty: 'intermediate',
    description:
      'Create an offline/online status indicator that detects network connectivity changes and shows a notification banner with retry functionality.',
    concepts: ['navigator.onLine', 'online/offline events', 'status banner', 'retry logic'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Offline Indicator</h3>
  <div id="status-banner" class="status-banner online">
    <span id="status-icon">&#9679;</span>
    <span id="status-text">Online</span>
  </div>
  <div class="sim-controls">
    <button id="go-offline" class="sim-btn">Simulate Offline</button>
    <button id="go-online" class="sim-btn">Simulate Online</button>
  </div>
  <div id="pending-actions" class="pending"></div>
  <p class="note">Angular patterns use service workers for offline support. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.status-banner { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 8px; font-size: 14px; font-weight: 600; transition: all 0.3s; margin-bottom: 12px; }
.status-banner.online { background: rgba(34,197,94,0.15); color: #22c55e; border: 1px solid rgba(34,197,94,0.3); }
.status-banner.offline { background: rgba(239,68,68,0.15); color: #ef4444; border: 1px solid rgba(239,68,68,0.3); }
.sim-controls { display: flex; gap: 8px; margin-bottom: 12px; }
.sim-btn { padding: 8px 14px; border: 1px solid #334155; border-radius: 6px; background: transparent; color: #94a3b8; cursor: pointer; font-size: 13px; }
.sim-btn:hover { border-color: #ef4444; color: #e2e8f0; }
.pending { font-size: 13px; color: #94a3b8; }
.pending .item { padding: 6px 0; border-bottom: 1px solid #334155; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular offline indicator behavior
const banner = document.getElementById('status-banner');
const icon = document.getElementById('status-icon');
const text = document.getElementById('status-text');
const pending = document.getElementById('pending-actions');
let isOnline = true;
const queue = [];

function setOnline(online) {
  isOnline = online;
  banner.className = 'status-banner ' + (online ? 'online' : 'offline');
  icon.innerHTML = online ? '&#9679;' : '&#9888;';
  text.textContent = online ? 'Online' : 'Offline - Actions will be queued';
  if (online && queue.length) {
    pending.innerHTML = '<div class="item">Syncing ' + queue.length + ' queued actions...</div>';
    setTimeout(() => { queue.length = 0; pending.innerHTML = '<div class="item">All actions synced!</div>'; }, 1000);
  }
}

document.getElementById('go-offline').addEventListener('click', () => {
  setOnline(false);
  queue.push('action-' + Date.now());
  pending.innerHTML = '<div class="item">' + queue.length + ' action(s) queued for sync</div>';
});
document.getElementById('go-online').addEventListener('click', () => setOnline(true));`,
    },
  },
  {
    id: 'ng-websocket-chat',
    title: 'WebSocket Chat',
    category: 'advanced',
    difficulty: 'advanced',
    description:
      'Build a real-time chat interface simulating WebSocket communication with message sending, typing indicators, and auto-scroll.',
    concepts: ['WebSocket', 'real-time messaging', 'typing indicator', 'auto-scroll'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Chat</h3>
  <div id="chat-messages" class="chat-messages"></div>
  <div id="typing" class="typing" style="display:none">Bot is typing...</div>
  <div class="chat-input-wrap">
    <input id="chat-input" class="chat-input" placeholder="Type a message..." />
    <button id="send-btn" class="send-btn">Send</button>
  </div>
  <p class="note">Angular patterns use RxJS WebSocket for real-time chat. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.chat-messages { height: 180px; overflow-y: auto; padding: 12px; background: #0f172a; border: 1px solid #334155; border-radius: 8px 8px 0 0; display: flex; flex-direction: column; gap: 8px; }
.msg { max-width: 80%; padding: 8px 12px; border-radius: 12px; font-size: 13px; line-height: 1.4; }
.msg.sent { align-self: flex-end; background: #ef4444; color: white; border-bottom-right-radius: 4px; }
.msg.received { align-self: flex-start; background: #1e293b; color: #e2e8f0; border-bottom-left-radius: 4px; }
.typing { padding: 4px 12px; font-size: 12px; color: #64748b; font-style: italic; }
.chat-input-wrap { display: flex; gap: 8px; padding: 8px; background: #1e293b; border: 1px solid #334155; border-top: none; border-radius: 0 0 8px 8px; }
.chat-input { flex: 1; padding: 8px 12px; border: 1px solid #334155; border-radius: 6px; background: #0f172a; color: #e2e8f0; outline: none; font-size: 13px; }
.send-btn { padding: 8px 16px; border: none; border-radius: 6px; background: #ef4444; color: white; font-weight: 600; cursor: pointer; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular WebSocket chat behavior
const messages = document.getElementById('chat-messages');
const input = document.getElementById('chat-input');
const typing = document.getElementById('typing');
const replies = ['That sounds great!', 'Tell me more about it.', 'Interesting approach!', 'I agree with that.', 'Let me think about it...'];

function addMsg(text, type) {
  const div = document.createElement('div');
  div.className = 'msg ' + type;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function send() {
  const text = input.value.trim();
  if (!text) return;
  addMsg(text, 'sent');
  input.value = '';
  typing.style.display = 'block';
  setTimeout(() => {
    typing.style.display = 'none';
    addMsg(replies[Math.floor(Math.random() * replies.length)], 'received');
  }, 1000 + Math.random() * 1000);
}

document.getElementById('send-btn').addEventListener('click', send);
input.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });
addMsg('Welcome! How can I help you today?', 'received');`,
    },
  },
  {
    id: 'ng-optimistic-update',
    title: 'Optimistic Update',
    category: 'advanced',
    difficulty: 'advanced',
    description:
      'Demonstrate optimistic UI updates that immediately show changes while an async operation completes, with rollback on failure.',
    concepts: ['optimistic UI', 'rollback', 'async operations', 'pending states'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Optimistic Update</h3>
  <div id="todo-list" class="todo-list"></div>
  <div class="add-wrap"><input id="new-todo" placeholder="Add item..." /><button id="add-btn" class="add-btn">Add</button></div>
  <div class="sim-toggle"><label><input type="checkbox" id="fail-toggle" /> Simulate server failure</label></div>
  <div id="opt-log" class="opt-log"></div>
  <p class="note">Angular patterns use NgRx with optimistic actions. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.todo-list { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
.todo-item { display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: #1e293b; border: 1px solid #334155; border-radius: 6px; font-size: 14px; color: #e2e8f0; }
.todo-item.pending { opacity: 0.6; border-style: dashed; }
.todo-item.error { border-color: #ef4444; background: rgba(239,68,68,0.1); }
.todo-item .status { font-size: 11px; margin-left: auto; }
.add-wrap { display: flex; gap: 8px; margin-bottom: 12px; }
.add-wrap input { flex: 1; padding: 8px; border: 1px solid #334155; border-radius: 6px; background: #1e293b; color: #e2e8f0; outline: none; }
.add-btn { padding: 8px 14px; border: none; border-radius: 6px; background: #ef4444; color: white; font-weight: 600; cursor: pointer; }
.sim-toggle { font-size: 13px; color: #94a3b8; margin-bottom: 8px; }
.opt-log { font-size: 11px; color: #64748b; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular optimistic update behavior
const items = [{ id: 1, text: 'Learn Angular', saved: true }, { id: 2, text: 'Build app', saved: true }];
let nextId = 3;
const listEl = document.getElementById('todo-list');
const logEl = document.getElementById('opt-log');

function render() {
  listEl.innerHTML = items.map(i =>
    '<div class="todo-item' + (!i.saved ? ' pending' : '') + (i.error ? ' error' : '') + '">' + i.text + '<span class="status">' + (i.error ? 'Failed' : !i.saved ? 'Saving...' : 'Saved') + '</span></div>'
  ).join('');
}

document.getElementById('add-btn').addEventListener('click', () => {
  const text = document.getElementById('new-todo').value.trim();
  if (!text) return;
  const item = { id: nextId++, text, saved: false };
  items.push(item);
  render();
  logEl.innerHTML += '<div>Optimistically added: ' + text + '</div>';
  document.getElementById('new-todo').value = '';

  setTimeout(() => {
    if (document.getElementById('fail-toggle').checked) {
      item.error = true;
      logEl.innerHTML += '<div style="color:#ef4444">Failed! Rolling back: ' + text + '</div>';
      setTimeout(() => { items.splice(items.indexOf(item), 1); render(); }, 1500);
    } else {
      item.saved = true;
      logEl.innerHTML += '<div style="color:#22c55e">Saved: ' + text + '</div>';
    }
    render();
  }, 1500);
});
render();`,
    },
  },
  {
    id: 'ng-undo-manager',
    title: 'Undo Manager',
    category: 'advanced',
    difficulty: 'advanced',
    description:
      'Build an undo/redo system that tracks state changes, supports multiple undo levels, and provides keyboard shortcuts (Ctrl+Z/Ctrl+Y).',
    concepts: ['undo/redo stack', 'state history', 'command pattern', 'keyboard shortcuts'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Undo Manager</h3>
  <div class="undo-toolbar">
    <button id="undo-btn" class="undo-btn" disabled>Undo (Ctrl+Z)</button>
    <button id="redo-btn" class="undo-btn" disabled>Redo (Ctrl+Y)</button>
    <span id="stack-info" class="stack-info"></span>
  </div>
  <div class="color-grid" id="color-grid"></div>
  <p class="hint">Click cells to change colors. Undo/redo tracks every change.</p>
  <p class="note">Angular patterns use services for state management with undo. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.undo-toolbar { display: flex; gap: 8px; align-items: center; margin-bottom: 12px; }
.undo-btn { padding: 6px 14px; border: 1px solid #334155; border-radius: 6px; background: transparent; color: #94a3b8; cursor: pointer; font-size: 12px; }
.undo-btn:hover:not(:disabled) { border-color: #ef4444; color: #e2e8f0; }
.undo-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.stack-info { font-size: 11px; color: #64748b; margin-left: auto; }
.color-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px; }
.color-cell { aspect-ratio: 1; border-radius: 6px; cursor: pointer; transition: transform 0.1s; border: 2px solid transparent; }
.color-cell:hover { transform: scale(1.1); border-color: #ef4444; }
.hint { font-size: 12px; color: #64748b; margin-top: 8px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular undo manager behavior
const colors = ['#334155', '#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6'];
const grid = Array(18).fill('#334155');
const undoStack = [];
const redoStack = [];
const gridEl = document.getElementById('color-grid');
const undoBtn = document.getElementById('undo-btn');
const redoBtn = document.getElementById('redo-btn');
const info = document.getElementById('stack-info');

function render() {
  gridEl.innerHTML = grid.map((c, i) => '<div class="color-cell" data-idx="' + i + '" style="background:' + c + '"></div>').join('');
  gridEl.querySelectorAll('.color-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      const idx = parseInt(cell.dataset.idx);
      const oldColor = grid[idx];
      const newColor = colors[(colors.indexOf(oldColor) + 1) % colors.length];
      undoStack.push({ idx, oldColor, newColor });
      redoStack.length = 0;
      grid[idx] = newColor;
      render();
    });
  });
  undoBtn.disabled = !undoStack.length;
  redoBtn.disabled = !redoStack.length;
  info.textContent = 'Undo: ' + undoStack.length + ' | Redo: ' + redoStack.length;
}

undoBtn.addEventListener('click', () => {
  const action = undoStack.pop();
  if (action) { redoStack.push(action); grid[action.idx] = action.oldColor; render(); }
});

redoBtn.addEventListener('click', () => {
  const action = redoStack.pop();
  if (action) { undoStack.push(action); grid[action.idx] = action.newColor; render(); }
});

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); undoBtn.click(); }
  if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); redoBtn.click(); }
});

render();`,
    },
  },
  {
    id: 'ng-clipboard-manager',
    title: 'Clipboard Manager',
    category: 'advanced',
    difficulty: 'intermediate',
    description:
      'Create a clipboard manager with copy/paste functionality, history tracking, and a visual clipboard content display.',
    concepts: ['Clipboard API', 'copy/paste events', 'history tracking', 'permissions'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Clipboard Manager</h3>
  <div class="clip-input-wrap">
    <input id="clip-input" class="clip-input" placeholder="Type text to copy..." />
    <button id="clip-copy" class="clip-btn">Copy</button>
  </div>
  <div class="clip-section">
    <label>Clipboard History</label>
    <div id="clip-history" class="clip-history"><p class="empty">No items copied yet.</p></div>
  </div>
  <div class="clip-section">
    <label>Paste Area</label>
    <div id="paste-area" class="paste-area" contenteditable="true" data-placeholder="Paste here (Ctrl+V)..."></div>
  </div>
  <p class="note">Angular patterns use CDK Clipboard module. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.clip-input-wrap { display: flex; gap: 8px; margin-bottom: 12px; }
.clip-input { flex: 1; padding: 10px; border: 1px solid #334155; border-radius: 6px; background: #1e293b; color: #e2e8f0; outline: none; }
.clip-btn { padding: 10px 16px; border: none; border-radius: 6px; background: #ef4444; color: white; font-weight: 600; cursor: pointer; }
.clip-section { margin-bottom: 12px; }
.clip-section label { font-size: 12px; color: #64748b; display: block; margin-bottom: 4px; }
.clip-history { max-height: 100px; overflow-y: auto; }
.clip-item { display: flex; justify-content: space-between; padding: 6px 10px; background: #1e293b; border: 1px solid #334155; border-radius: 4px; margin-bottom: 3px; font-size: 13px; color: #e2e8f0; cursor: pointer; }
.clip-item:hover { border-color: #ef4444; }
.clip-item .time { font-size: 11px; color: #64748b; }
.empty { font-size: 13px; color: #64748b; padding: 8px; }
.paste-area { min-height: 40px; padding: 10px; border: 1px dashed #334155; border-radius: 6px; color: #e2e8f0; font-size: 14px; outline: none; }
.paste-area:empty:before { content: attr(data-placeholder); color: #64748b; }
.paste-area:focus { border-color: #ef4444; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular clipboard manager behavior
const history = [];
const historyEl = document.getElementById('clip-history');
const clipInput = document.getElementById('clip-input');

function addToHistory(text) {
  if (!text.trim()) return;
  history.unshift({ text, time: new Date().toLocaleTimeString() });
  if (history.length > 10) history.pop();
  renderHistory();
}

function renderHistory() {
  historyEl.innerHTML = history.map(h =>
    '<div class="clip-item" data-text="' + h.text.replace(/"/g, '&quot;') + '">' + h.text.slice(0, 40) + '<span class="time">' + h.time + '</span></div>'
  ).join('') || '<p class="empty">No items copied yet.</p>';
  historyEl.querySelectorAll('.clip-item').forEach(el => {
    el.addEventListener('click', () => navigator.clipboard.writeText(el.dataset.text));
  });
}

document.getElementById('clip-copy').addEventListener('click', () => {
  const text = clipInput.value;
  if (text) {
    navigator.clipboard.writeText(text);
    addToHistory(text);
    clipInput.value = '';
  }
});`,
    },
  },
  {
    id: 'ng-hotkey-manager',
    title: 'Hotkey Manager',
    category: 'advanced',
    difficulty: 'intermediate',
    description:
      'Build a hotkey system that registers keyboard shortcuts with modifier keys, displays them in a help panel, and handles conflicts.',
    concepts: ['keyboard shortcuts', 'modifier keys', 'shortcut registry', 'key event handling'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Hotkey Manager</h3>
  <div class="hotkey-hint">Press <kbd>?</kbd> to show shortcuts</div>
  <div id="hotkey-panel" class="hotkey-panel" style="display:none">
    <div class="hotkey-header">Keyboard Shortcuts</div>
    <div id="hotkey-list" class="hotkey-list"></div>
  </div>
  <div id="hotkey-output" class="hotkey-output">Press a shortcut to see it trigger.</div>
  <p class="note">Angular patterns use HostListener for hotkey management. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.hotkey-hint { font-size: 13px; color: #64748b; margin-bottom: 12px; }
kbd { background: #334155; padding: 2px 6px; border-radius: 4px; font-size: 12px; color: #e2e8f0; }
.hotkey-panel { background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 12px; margin-bottom: 12px; }
.hotkey-header { font-size: 14px; font-weight: 700; color: #e2e8f0; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #334155; }
.hotkey-item { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; }
.hotkey-item .action { color: #e2e8f0; }
.hotkey-item .keys { color: #ef4444; font-family: monospace; }
.hotkey-output { padding: 14px; background: #1e293b; border: 1px solid #334155; border-radius: 8px; font-size: 14px; color: #e2e8f0; text-align: center; min-height: 48px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular hotkey manager behavior
const shortcuts = [
  { keys: 'Ctrl+S', action: 'Save', handler: () => 'Document saved!' },
  { keys: 'Ctrl+N', action: 'New File', handler: () => 'New file created!' },
  { keys: 'Ctrl+F', action: 'Find', handler: () => 'Find panel opened!' },
  { keys: 'Ctrl+P', action: 'Print', handler: () => 'Print dialog opened!' },
  { keys: '?', action: 'Show shortcuts', handler: null },
];

const panel = document.getElementById('hotkey-panel');
const list = document.getElementById('hotkey-list');
const output = document.getElementById('hotkey-output');

list.innerHTML = shortcuts.map(s => '<div class="hotkey-item"><span class="action">' + s.action + '</span><span class="keys">' + s.keys + '</span></div>').join('');

document.addEventListener('keydown', (e) => {
  if (e.key === '?') { panel.style.display = panel.style.display === 'none' ? 'block' : 'none'; return; }
  for (const s of shortcuts) {
    const parts = s.keys.split('+');
    const key = parts[parts.length - 1];
    const needCtrl = parts.includes('Ctrl');
    if ((needCtrl ? (e.ctrlKey || e.metaKey) : true) && e.key.toUpperCase() === key) {
      e.preventDefault();
      if (s.handler) output.textContent = s.handler();
      return;
    }
  }
});`,
    },
  },
  {
    id: 'ng-idle-detector',
    title: 'Idle Detector',
    category: 'advanced',
    difficulty: 'intermediate',
    description:
      'Create an idle detection system that tracks user inactivity, shows a warning before session timeout, and allows extending the session.',
    concepts: ['idle detection', 'session timeout', 'activity tracking', 'timer management'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Idle Detector</h3>
  <div class="idle-status">
    <div>Status: <span id="idle-state" class="state active">Active</span></div>
    <div>Idle for: <span id="idle-timer">0s</span></div>
    <div>Session expires in: <span id="session-timer">30s</span></div>
  </div>
  <div id="idle-warning" class="idle-warning" style="display:none">
    <p>You have been idle. Session will expire soon!</p>
    <button id="extend-btn" class="extend-btn">I'm still here</button>
  </div>
  <div class="activity-hint">Move your mouse or press a key to reset the idle timer.</div>
  <p class="note">Angular patterns use idle detection services. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.idle-status { display: flex; gap: 20px; padding: 14px; background: #1e293b; border-radius: 8px; margin-bottom: 12px; font-size: 13px; color: #94a3b8; }
.state { font-weight: 700; }
.state.active { color: #22c55e; }
.state.idle { color: #f59e0b; }
.state.expired { color: #ef4444; }
.idle-warning { padding: 14px; background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); border-radius: 8px; text-align: center; margin-bottom: 12px; }
.idle-warning p { color: #ef4444; font-size: 14px; margin-bottom: 8px; }
.extend-btn { padding: 8px 16px; border: none; border-radius: 6px; background: #ef4444; color: white; font-weight: 600; cursor: pointer; }
.activity-hint { font-size: 12px; color: #64748b; text-align: center; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular idle detector behavior
let idleTime = 0;
let sessionTime = 30;
const stateEl = document.getElementById('idle-state');
const idleTimerEl = document.getElementById('idle-timer');
const sessionTimerEl = document.getElementById('session-timer');
const warning = document.getElementById('idle-warning');

function resetIdle() {
  idleTime = 0;
  sessionTime = 30;
  stateEl.textContent = 'Active';
  stateEl.className = 'state active';
  warning.style.display = 'none';
}

const timer = setInterval(() => {
  idleTime++;
  sessionTime = Math.max(0, sessionTime - 1);
  idleTimerEl.textContent = idleTime + 's';
  sessionTimerEl.textContent = sessionTime + 's';
  if (idleTime >= 10) {
    stateEl.textContent = 'Idle';
    stateEl.className = 'state idle';
    warning.style.display = 'block';
  }
  if (sessionTime <= 0) {
    stateEl.textContent = 'Expired';
    stateEl.className = 'state expired';
    clearInterval(timer);
  }
}, 1000);

['mousemove', 'keydown', 'click'].forEach(e => document.addEventListener(e, resetIdle));
document.getElementById('extend-btn').addEventListener('click', resetIdle);`,
    },
  },
  {
    id: 'ng-media-query-hook',
    title: 'Media Query Hook',
    category: 'advanced',
    difficulty: 'intermediate',
    description:
      'Create a responsive media query observer that detects viewport breakpoints and updates UI layout and component visibility accordingly.',
    concepts: ['matchMedia', 'responsive design', 'breakpoint detection', 'layout switching'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Media Query Observer</h3>
  <div class="bp-display">
    <div class="bp-item" id="bp-sm"><span class="bp-dot"></span> Small (&lt;640px)</div>
    <div class="bp-item" id="bp-md"><span class="bp-dot"></span> Medium (640-1024px)</div>
    <div class="bp-item" id="bp-lg"><span class="bp-dot"></span> Large (&gt;1024px)</div>
  </div>
  <div class="bp-info">
    <div>Current: <strong id="current-bp">--</strong></div>
    <div>Width: <strong id="current-width">--</strong></div>
  </div>
  <div id="layout-demo" class="layout-demo">
    <div class="layout-box">A</div><div class="layout-box">B</div><div class="layout-box">C</div>
  </div>
  <p class="note">Angular patterns use BreakpointObserver from CDK. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.bp-display { display: flex; gap: 12px; margin-bottom: 12px; }
.bp-item { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #64748b; padding: 8px 12px; background: #1e293b; border-radius: 6px; }
.bp-item.active { color: #ef4444; }
.bp-dot { width: 8px; height: 8px; border-radius: 50%; background: #334155; }
.bp-item.active .bp-dot { background: #ef4444; }
.bp-info { display: flex; gap: 20px; font-size: 13px; color: #94a3b8; margin-bottom: 12px; }
.bp-info strong { color: #ef4444; }
.layout-demo { display: flex; gap: 8px; }
.layout-box { flex: 1; padding: 16px; background: #1e293b; border: 1px solid #334155; border-radius: 8px; text-align: center; color: #e2e8f0; font-weight: 700; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular BreakpointObserver behavior
function updateBreakpoint() {
  const w = window.innerWidth;
  document.getElementById('current-width').textContent = w + 'px';
  document.querySelectorAll('.bp-item').forEach(el => el.classList.remove('active'));
  if (w < 640) {
    document.getElementById('bp-sm').classList.add('active');
    document.getElementById('current-bp').textContent = 'Small';
  } else if (w < 1024) {
    document.getElementById('bp-md').classList.add('active');
    document.getElementById('current-bp').textContent = 'Medium';
  } else {
    document.getElementById('bp-lg').classList.add('active');
    document.getElementById('current-bp').textContent = 'Large';
  }
}

window.addEventListener('resize', updateBreakpoint);
updateBreakpoint();`,
    },
  },
  {
    id: 'ng-portal-demo',
    title: 'Portal / Teleport',
    category: 'advanced',
    difficulty: 'advanced',
    description:
      'Demonstrate the portal pattern where content is rendered in a different DOM location than its logical parent, useful for modals and tooltips.',
    concepts: ['CDK Portal', 'DOM teleporting', 'content projection', 'overlay positioning'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Portal Demo</h3>
  <div class="portal-source">
    <h4>Source Component</h4>
    <p>This component owns the content, but renders it elsewhere.</p>
    <button id="portal-btn" class="portal-btn">Toggle Portal Content</button>
    <div class="portal-info">Content is <span id="portal-state">hidden</span></div>
  </div>
  <div class="portal-target">
    <h4>Target Container (Portal Outlet)</h4>
    <div id="portal-outlet" class="portal-outlet">
      <p class="empty-hint">Portal content will appear here.</p>
    </div>
  </div>
  <p class="note">Angular patterns use CdkPortal and CdkPortalOutlet. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.portal-source, .portal-target { padding: 14px; border: 1px solid #334155; border-radius: 8px; margin-bottom: 10px; }
.portal-source { background: #1e293b; }
.portal-target { background: #0f172a; border-style: dashed; }
h4 { font-size: 14px; color: #e2e8f0; margin-bottom: 8px; }
p { font-size: 13px; color: #94a3b8; margin-bottom: 8px; }
.portal-btn { padding: 8px 14px; border: none; border-radius: 6px; background: #ef4444; color: white; font-weight: 600; cursor: pointer; }
.portal-info { font-size: 12px; color: #64748b; margin-top: 8px; }
#portal-state { color: #ef4444; font-weight: 600; }
.portal-outlet { min-height: 60px; padding: 12px; border: 1px solid #334155; border-radius: 6px; }
.empty-hint { color: #475569; font-style: italic; }
.portal-content { background: #ef4444; color: white; padding: 14px; border-radius: 6px; text-align: center; font-weight: 600; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular CDK Portal behavior
const outlet = document.getElementById('portal-outlet');
const state = document.getElementById('portal-state');
let isPortalActive = false;
const originalContent = outlet.innerHTML;

document.getElementById('portal-btn').addEventListener('click', () => {
  isPortalActive = !isPortalActive;
  if (isPortalActive) {
    outlet.innerHTML = '<div class="portal-content">This content was teleported from the source component via a Portal!</div>';
    state.textContent = 'visible in target';
    state.style.color = '#22c55e';
  } else {
    outlet.innerHTML = originalContent;
    state.textContent = 'hidden';
    state.style.color = '#ef4444';
  }
});`,
    },
  },
  {
    id: 'ng-error-boundary',
    title: 'Error Boundary',
    category: 'advanced',
    difficulty: 'advanced',
    description:
      'Build an error boundary that catches rendering errors, displays a fallback UI with error details, and provides a retry mechanism.',
    concepts: ['error handling', 'ErrorHandler', 'fallback UI', 'error recovery'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Error Boundary</h3>
  <div id="error-boundary" class="boundary">
    <div id="normal-content" class="normal-content">
      <h4>Widget Dashboard</h4>
      <div class="widget">Widget A: Working fine</div>
      <div class="widget">Widget B: <span id="risky-widget">Loading...</span></div>
      <button id="trigger-error" class="trigger-btn">Trigger Error in Widget B</button>
    </div>
    <div id="error-fallback" class="error-fallback" style="display:none">
      <div class="error-icon">&#9888;</div>
      <h4>Something went wrong</h4>
      <p id="error-msg" class="error-msg"></p>
      <button id="retry-btn" class="retry-btn">Retry</button>
    </div>
  </div>
  <div id="error-log" class="error-log"></div>
  <p class="note">Angular patterns use ErrorHandler service. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.boundary { border: 2px solid #334155; border-radius: 10px; overflow: hidden; }
.boundary.error { border-color: #ef4444; }
.normal-content { padding: 16px; }
h4 { color: #e2e8f0; margin-bottom: 12px; }
.widget { padding: 10px 14px; background: #1e293b; border-radius: 6px; margin-bottom: 6px; font-size: 14px; color: #e2e8f0; }
.trigger-btn { margin-top: 8px; padding: 8px 14px; border: 1px solid #f59e0b; border-radius: 6px; background: transparent; color: #f59e0b; cursor: pointer; font-size: 13px; }
.error-fallback { padding: 24px; text-align: center; background: rgba(239,68,68,0.05); }
.error-icon { font-size: 48px; margin-bottom: 8px; }
.error-fallback h4 { color: #ef4444; }
.error-msg { font-size: 13px; color: #94a3b8; margin-bottom: 16px; font-family: monospace; background: #0f172a; padding: 8px; border-radius: 6px; }
.retry-btn { padding: 10px 20px; border: none; border-radius: 8px; background: #ef4444; color: white; font-weight: 600; cursor: pointer; }
.error-log { margin-top: 8px; font-size: 11px; color: #64748b; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular error boundary behavior
const boundary = document.getElementById('error-boundary');
const normal = document.getElementById('normal-content');
const fallback = document.getElementById('error-fallback');
const logEl = document.getElementById('error-log');

document.getElementById('trigger-error').addEventListener('click', () => {
  const error = 'TypeError: Cannot read property "data" of undefined';
  boundary.classList.add('error');
  normal.style.display = 'none';
  fallback.style.display = 'block';
  document.getElementById('error-msg').textContent = error;
  logEl.innerHTML += '<div>Error caught: ' + error + '</div>';
});

document.getElementById('retry-btn').addEventListener('click', () => {
  boundary.classList.remove('error');
  fallback.style.display = 'none';
  normal.style.display = 'block';
  document.getElementById('risky-widget').textContent = 'Recovered!';
  logEl.innerHTML += '<div style="color:#22c55e">Component recovered after retry</div>';
});`,
    },
  },
  {
    id: 'ng-retry-mechanism',
    title: 'Retry Mechanism',
    category: 'advanced',
    difficulty: 'advanced',
    description:
      'Implement a retry mechanism with exponential backoff for failed API calls, showing attempt count, delay, and success/failure states.',
    concepts: ['retry logic', 'exponential backoff', 'error recovery', 'RxJS retry'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Retry Mechanism</h3>
  <div class="retry-controls">
    <label>Failure rate: <select id="fail-rate"><option value="0">0%</option><option value="50">50%</option><option value="80" selected>80%</option><option value="100">100%</option></select></label>
    <button id="start-retry" class="start-btn">Start Request</button>
  </div>
  <div id="retry-log" class="retry-log"></div>
  <div id="retry-result" class="retry-result"></div>
  <p class="note">Angular patterns use RxJS retry and retryWhen operators. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.retry-controls { display: flex; gap: 12px; align-items: center; margin-bottom: 12px; }
.retry-controls label { font-size: 13px; color: #94a3b8; }
select { padding: 6px; border: 1px solid #334155; border-radius: 4px; background: #1e293b; color: #e2e8f0; }
.start-btn { padding: 8px 16px; border: none; border-radius: 6px; background: #ef4444; color: white; font-weight: 600; cursor: pointer; }
.retry-log { background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 12px; max-height: 150px; overflow-y: auto; font-family: monospace; font-size: 12px; margin-bottom: 8px; }
.retry-log .attempt { color: #f59e0b; }
.retry-log .fail { color: #ef4444; }
.retry-log .success { color: #22c55e; }
.retry-log .info { color: #64748b; }
.retry-result { padding: 12px; border-radius: 8px; font-size: 14px; font-weight: 600; text-align: center; }
.retry-result.ok { background: rgba(34,197,94,0.15); color: #22c55e; }
.retry-result.fail { background: rgba(239,68,68,0.15); color: #ef4444; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular retry mechanism with exponential backoff
const logEl = document.getElementById('retry-log');
const resultEl = document.getElementById('retry-result');
const MAX_RETRIES = 5;

document.getElementById('start-retry').addEventListener('click', () => {
  logEl.innerHTML = '';
  resultEl.textContent = '';
  resultEl.className = 'retry-result';
  const failRate = parseInt(document.getElementById('fail-rate').value) / 100;
  let attempt = 0;

  function tryRequest() {
    attempt++;
    const delay = Math.min(1000 * Math.pow(2, attempt - 1), 8000);
    logEl.innerHTML += '<div class="attempt">Attempt ' + attempt + '/' + MAX_RETRIES + '...</div>';

    setTimeout(() => {
      const success = Math.random() > failRate;
      if (success) {
        logEl.innerHTML += '<div class="success">&#10003; Success! Data received.</div>';
        resultEl.textContent = 'Request succeeded on attempt ' + attempt;
        resultEl.className = 'retry-result ok';
      } else if (attempt < MAX_RETRIES) {
        logEl.innerHTML += '<div class="fail">&#10007; Failed. Retrying in ' + (delay * 2 / 1000) + 's...</div>';
        setTimeout(tryRequest, delay);
      } else {
        logEl.innerHTML += '<div class="fail">&#10007; All retries exhausted.</div>';
        resultEl.textContent = 'Request failed after ' + MAX_RETRIES + ' attempts';
        resultEl.className = 'retry-result fail';
      }
      logEl.scrollTop = logEl.scrollHeight;
    }, 500);
  }

  tryRequest();
});`,
    },
  },
  {
    id: 'ng-virtual-list-advanced',
    title: 'Advanced Virtual List',
    category: 'advanced',
    difficulty: 'advanced',
    description:
      'Build an advanced virtual scrolling list with variable-height items, dynamic loading, smooth scrolling, and scroll position restoration.',
    concepts: ['virtual scroll', 'variable height', 'windowing', 'scroll restoration'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Virtual List (10,000 items)</h3>
  <div class="vl-info">Rendered: <span id="vl-rendered">0</span> / 10,000 items | Scroll: <span id="vl-scroll">0</span>px</div>
  <div id="vl-container" class="vl-container">
    <div id="vl-spacer" class="vl-spacer"></div>
    <div id="vl-content" class="vl-content"></div>
  </div>
  <button id="vl-top" class="vl-btn">Jump to Top</button>
  <button id="vl-bottom" class="vl-btn">Jump to Bottom</button>
  <p class="note">Angular patterns use CdkVirtualScrollViewport. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.vl-info { font-size: 12px; color: #64748b; margin-bottom: 8px; }
.vl-info span { color: #ef4444; font-weight: 700; }
.vl-container { height: 250px; overflow-y: auto; border: 1px solid #334155; border-radius: 8px; position: relative; }
.vl-spacer { width: 100%; }
.vl-content { position: absolute; top: 0; left: 0; right: 0; }
.vl-item { padding: 10px 14px; border-bottom: 1px solid #334155; font-size: 13px; color: #e2e8f0; display: flex; justify-content: space-between; }
.vl-item:hover { background: #1e293b; }
.vl-item .idx { color: #ef4444; font-weight: 700; font-size: 12px; }
.vl-btn { padding: 6px 12px; border: 1px solid #334155; border-radius: 6px; background: transparent; color: #94a3b8; cursor: pointer; font-size: 12px; margin-top: 8px; margin-right: 4px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular advanced virtual list behavior
const TOTAL = 10000;
const ITEM_HEIGHT = 38;
const container = document.getElementById('vl-container');
const spacer = document.getElementById('vl-spacer');
const content = document.getElementById('vl-content');
const renderedEl = document.getElementById('vl-rendered');
const scrollEl = document.getElementById('vl-scroll');

spacer.style.height = TOTAL * ITEM_HEIGHT + 'px';

function renderVisible() {
  const scrollTop = container.scrollTop;
  const viewHeight = container.clientHeight;
  const start = Math.floor(scrollTop / ITEM_HEIGHT);
  const visible = Math.ceil(viewHeight / ITEM_HEIGHT) + 2;
  const end = Math.min(start + visible, TOTAL);

  content.style.top = start * ITEM_HEIGHT + 'px';
  content.innerHTML = '';
  for (let i = start; i < end; i++) {
    content.innerHTML += '<div class="vl-item"><span>Item ' + i + ' - Virtual list entry with dynamic content</span><span class="idx">#' + i + '</span></div>';
  }
  renderedEl.textContent = end - start;
  scrollEl.textContent = Math.round(scrollTop);
}

container.addEventListener('scroll', renderVisible);
renderVisible();

document.getElementById('vl-top').addEventListener('click', () => container.scrollTo({ top: 0, behavior: 'smooth' }));
document.getElementById('vl-bottom').addEventListener('click', () => container.scrollTo({ top: TOTAL * ITEM_HEIGHT, behavior: 'smooth' }));`,
    },
  },
  // ===== BATCH 9: ui-components first half (8 patterns) =====
  {
    id: 'ng-spinner',
    title: 'Spinner',
    category: 'ui-components',
    difficulty: 'beginner',
    description:
      'Create spinner/loading indicator components in various styles (circular, dots, pulse) with size and color customization.',
    concepts: ['loading spinner', 'CSS animations', 'keyframes', 'size variants'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Spinners</h3>
  <div class="spinner-grid">
    <div class="spinner-card"><div class="spinner ring"></div><span>Ring</span></div>
    <div class="spinner-card"><div class="spinner dots"><span></span><span></span><span></span></div><span>Dots</span></div>
    <div class="spinner-card"><div class="spinner pulse"></div><span>Pulse</span></div>
    <div class="spinner-card"><div class="spinner bars"><span></span><span></span><span></span><span></span></div><span>Bars</span></div>
  </div>
  <p class="note">Angular patterns use MatSpinner and MatProgressSpinner. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.spinner-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.spinner-card { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 20px; background: #1e293b; border-radius: 8px; font-size: 12px; color: #94a3b8; }
.spinner.ring { width: 32px; height: 32px; border: 3px solid #334155; border-top-color: #ef4444; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.spinner.dots { display: flex; gap: 6px; }
.spinner.dots span { width: 8px; height: 8px; background: #ef4444; border-radius: 50%; animation: bounce 1.2s ease-in-out infinite; }
.spinner.dots span:nth-child(2) { animation-delay: 0.2s; }
.spinner.dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; } 40% { transform: scale(1); opacity: 1; } }
.spinner.pulse { width: 32px; height: 32px; background: #ef4444; border-radius: 50%; animation: pulse 1.2s ease-in-out infinite; }
@keyframes pulse { 0% { transform: scale(0.8); opacity: 0.5; } 50% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(0.8); opacity: 0.5; } }
.spinner.bars { display: flex; gap: 3px; align-items: end; height: 24px; }
.spinner.bars span { width: 4px; background: #ef4444; border-radius: 2px; animation: barGrow 1s ease-in-out infinite; }
.spinner.bars span:nth-child(1) { animation-delay: 0s; }
.spinner.bars span:nth-child(2) { animation-delay: 0.15s; }
.spinner.bars span:nth-child(3) { animation-delay: 0.3s; }
.spinner.bars span:nth-child(4) { animation-delay: 0.45s; }
@keyframes barGrow { 0%, 100% { height: 8px; } 50% { height: 24px; } }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular spinner behavior
// Spinners are purely CSS animation-driven
document.querySelectorAll('.spinner-card').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    const spinner = card.querySelector('.spinner');
    spinner.style.animationPlayState = spinner.style.animationPlayState === 'paused' ? 'running' : 'paused';
    if (spinner.querySelectorAll('span').length) {
      spinner.querySelectorAll('span').forEach(s => s.style.animationPlayState = spinner.style.animationPlayState);
    }
  });
});`,
    },
  },
  {
    id: 'ng-chip',
    title: 'Chip',
    category: 'ui-components',
    difficulty: 'beginner',
    description:
      'Create chip/tag components with multiple variants (filled, outlined, deletable), click actions, and avatar/icon support.',
    concepts: ['chip component', 'variants', 'deletable', 'selectable'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Chips</h3>
  <div class="chip-section"><label>Filled</label>
    <div class="chip-row"><span class="chip filled red">Angular</span><span class="chip filled blue">TypeScript</span><span class="chip filled green">RxJS</span></div>
  </div>
  <div class="chip-section"><label>Outlined</label>
    <div class="chip-row"><span class="chip outlined">Design</span><span class="chip outlined">Frontend</span><span class="chip outlined">Testing</span></div>
  </div>
  <div class="chip-section"><label>Deletable</label>
    <div id="deletable-chips" class="chip-row"></div>
  </div>
  <p class="note">Angular patterns use MatChip and MatChipList. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.chip-section { margin-bottom: 14px; }
.chip-section label { font-size: 12px; color: #64748b; display: block; margin-bottom: 6px; }
.chip-row { display: flex; gap: 6px; flex-wrap: wrap; }
.chip { display: inline-flex; align-items: center; gap: 4px; padding: 4px 12px; border-radius: 16px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
.chip.filled { color: white; }
.chip.filled.red { background: #ef4444; }
.chip.filled.blue { background: #3b82f6; }
.chip.filled.green { background: #22c55e; }
.chip.outlined { background: transparent; border: 1px solid #334155; color: #94a3b8; }
.chip.outlined:hover { border-color: #ef4444; color: #e2e8f0; }
.chip .delete { margin-left: 4px; cursor: pointer; font-size: 14px; opacity: 0.7; }
.chip .delete:hover { opacity: 1; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular chip behavior
const deletableItems = ['Removable', 'Click X', 'To Delete', 'Me Too'];
const container = document.getElementById('deletable-chips');

function renderDeletable() {
  container.innerHTML = deletableItems.map((item, i) =>
    '<span class="chip filled red">' + item + '<span class="delete" data-idx="' + i + '">&times;</span></span>'
  ).join('');
  container.querySelectorAll('.delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      deletableItems.splice(parseInt(btn.dataset.idx), 1);
      renderDeletable();
    });
  });
}
renderDeletable();`,
    },
  },
  {
    id: 'ng-divider',
    title: 'Divider',
    category: 'ui-components',
    difficulty: 'beginner',
    description:
      'Create divider components supporting horizontal and vertical orientations, with optional text labels and inset variants.',
    concepts: ['divider', 'horizontal/vertical', 'labeled divider', 'CSS layout'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Dividers</h3>
  <p class="content">Content above the divider.</p>
  <div class="divider"></div>
  <p class="content">Content below a simple divider.</p>
  <div class="divider-labeled"><span>OR</span></div>
  <p class="content">Content below a labeled divider.</p>
  <div class="divider-labeled"><span>Section 2</span></div>
  <div class="horizontal-demo">
    <span class="content">Left</span>
    <div class="divider-vertical"></div>
    <span class="content">Center</span>
    <div class="divider-vertical"></div>
    <span class="content">Right</span>
  </div>
  <p class="note">Angular patterns use MatDivider component. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.content { font-size: 14px; color: #94a3b8; padding: 8px 0; }
.divider { height: 1px; background: #334155; margin: 8px 0; }
.divider-labeled { display: flex; align-items: center; margin: 12px 0; }
.divider-labeled::before, .divider-labeled::after { content: ''; flex: 1; height: 1px; background: #334155; }
.divider-labeled span { padding: 0 12px; font-size: 12px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
.horizontal-demo { display: flex; align-items: center; gap: 12px; padding: 12px; background: #1e293b; border-radius: 8px; margin-top: 12px; }
.divider-vertical { width: 1px; height: 24px; background: #334155; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular divider behavior
// Dividers are purely CSS-driven
document.querySelectorAll('.divider, .divider-labeled, .divider-vertical').forEach(d => {
  d.style.transition = 'background 0.3s';
  d.addEventListener('mouseenter', () => {
    if (d.classList.contains('divider')) d.style.background = '#ef4444';
    else if (d.classList.contains('divider-vertical')) d.style.background = '#ef4444';
  });
  d.addEventListener('mouseleave', () => {
    if (d.classList.contains('divider')) d.style.background = '#334155';
    else if (d.classList.contains('divider-vertical')) d.style.background = '#334155';
  });
});`,
    },
  },
  {
    id: 'ng-alert-banner',
    title: 'Alert Banner',
    category: 'ui-components',
    difficulty: 'beginner',
    description:
      'Build alert/banner components with info, success, warning, and error variants, supporting dismissal and action buttons.',
    concepts: ['alert types', 'dismissible', 'icon display', 'action buttons'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Alert Banners</h3>
  <div id="alerts">
    <div class="alert alert-info"><span class="alert-icon">&#8505;</span><div class="alert-body"><strong>Info:</strong> A new version is available.</div><button class="alert-close">&times;</button></div>
    <div class="alert alert-success"><span class="alert-icon">&#10003;</span><div class="alert-body"><strong>Success:</strong> Your changes have been saved.</div><button class="alert-close">&times;</button></div>
    <div class="alert alert-warning"><span class="alert-icon">&#9888;</span><div class="alert-body"><strong>Warning:</strong> Your trial expires in 3 days.</div><button class="alert-close">&times;</button></div>
    <div class="alert alert-error"><span class="alert-icon">&#10007;</span><div class="alert-body"><strong>Error:</strong> Failed to connect to server.</div><button class="alert-close">&times;</button></div>
  </div>
  <button id="reset-alerts" class="reset-btn">Reset Alerts</button>
  <p class="note">Angular patterns use custom alert components. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.alert { display: flex; align-items: flex-start; gap: 10px; padding: 12px; border-radius: 8px; margin-bottom: 8px; transition: opacity 0.3s, max-height 0.3s; overflow: hidden; }
.alert-info { background: rgba(59,130,246,0.12); border: 1px solid rgba(59,130,246,0.3); }
.alert-info .alert-icon { color: #3b82f6; }
.alert-success { background: rgba(34,197,94,0.12); border: 1px solid rgba(34,197,94,0.3); }
.alert-success .alert-icon { color: #22c55e; }
.alert-warning { background: rgba(234,179,8,0.12); border: 1px solid rgba(234,179,8,0.3); }
.alert-warning .alert-icon { color: #eab308; }
.alert-error { background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.3); }
.alert-error .alert-icon { color: #ef4444; }
.alert-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
.alert-body { flex: 1; font-size: 13px; color: #e2e8f0; }
.alert-body strong { font-weight: 700; }
.alert-close { background: none; border: none; color: #64748b; font-size: 18px; cursor: pointer; padding: 0; line-height: 1; }
.reset-btn { padding: 6px 14px; border: 1px solid #334155; border-radius: 6px; background: transparent; color: #94a3b8; cursor: pointer; font-size: 12px; margin-top: 4px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular alert banner behavior
const alertsHTML = document.getElementById('alerts').innerHTML;

document.querySelectorAll('.alert-close').forEach(btn => {
  btn.addEventListener('click', () => {
    const alert = btn.closest('.alert');
    alert.style.opacity = '0';
    alert.style.maxHeight = '0';
    alert.style.padding = '0';
    alert.style.margin = '0';
    setTimeout(() => alert.remove(), 300);
  });
});

document.getElementById('reset-alerts').addEventListener('click', () => {
  document.getElementById('alerts').innerHTML = alertsHTML;
  document.querySelectorAll('.alert-close').forEach(btn => {
    btn.addEventListener('click', () => { const a = btn.closest('.alert'); a.style.opacity='0'; setTimeout(() => a.remove(), 300); });
  });
});`,
    },
  },
  {
    id: 'ng-callout',
    title: 'Callout',
    category: 'ui-components',
    difficulty: 'beginner',
    description:
      'Create callout/highlight boxes for tips, notes, warnings, and important information with icons and styled backgrounds.',
    concepts: ['callout box', 'info display', 'icon integration', 'visual emphasis'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Callouts</h3>
  <div class="callout callout-tip"><span class="callout-icon">&#128161;</span><div><strong>Tip:</strong> Use OnPush change detection for better performance in large apps.</div></div>
  <div class="callout callout-note"><span class="callout-icon">&#128221;</span><div><strong>Note:</strong> Standalone components are the recommended approach since Angular 17.</div></div>
  <div class="callout callout-warn"><span class="callout-icon">&#9888;</span><div><strong>Warning:</strong> Avoid using ngDoCheck for expensive operations.</div></div>
  <div class="callout callout-danger"><span class="callout-icon">&#9940;</span><div><strong>Important:</strong> Never store sensitive data in localStorage without encryption.</div></div>
  <p class="note">Angular patterns use custom callout components. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.callout { display: flex; gap: 10px; padding: 14px; border-radius: 8px; margin-bottom: 8px; border-left: 4px solid; font-size: 13px; color: #e2e8f0; line-height: 1.5; }
.callout-tip { background: rgba(34,197,94,0.08); border-left-color: #22c55e; }
.callout-note { background: rgba(59,130,246,0.08); border-left-color: #3b82f6; }
.callout-warn { background: rgba(234,179,8,0.08); border-left-color: #eab308; }
.callout-danger { background: rgba(239,68,68,0.08); border-left-color: #ef4444; }
.callout-icon { font-size: 18px; flex-shrink: 0; }
.callout strong { font-weight: 700; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular callout behavior
document.querySelectorAll('.callout').forEach(c => {
  c.style.cursor = 'pointer';
  c.style.transition = 'transform 0.15s';
  c.addEventListener('click', () => {
    c.style.transform = c.style.transform === 'scale(1.02)' ? 'scale(1)' : 'scale(1.02)';
  });
});`,
    },
  },
  {
    id: 'ng-empty-state-v2',
    title: 'Empty State v2',
    category: 'ui-components',
    difficulty: 'beginner',
    description:
      'Build enhanced empty state components with illustrations, actionable CTAs, and contextual messages for different scenarios.',
    concepts: ['empty state', 'illustration', 'CTA button', 'contextual messaging'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Empty States</h3>
  <div class="empty-tabs">
    <button class="empty-tab active" data-type="inbox">Inbox</button>
    <button class="empty-tab" data-type="search">Search</button>
    <button class="empty-tab" data-type="error">Error</button>
  </div>
  <div id="empty-display" class="empty-display"></div>
  <p class="note">Angular patterns use custom empty state components. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.empty-tabs { display: flex; gap: 4px; margin-bottom: 12px; }
.empty-tab { padding: 6px 14px; border: 1px solid #334155; border-radius: 6px; background: transparent; color: #94a3b8; cursor: pointer; font-size: 12px; }
.empty-tab.active { background: #ef4444; color: white; border-color: #ef4444; }
.empty-display { padding: 40px 20px; background: #1e293b; border: 1px solid #334155; border-radius: 10px; text-align: center; }
.empty-icon { font-size: 48px; margin-bottom: 12px; }
.empty-title { font-size: 16px; font-weight: 700; color: #e2e8f0; margin-bottom: 6px; }
.empty-desc { font-size: 13px; color: #94a3b8; margin-bottom: 16px; max-width: 280px; margin-left: auto; margin-right: auto; }
.empty-cta { padding: 10px 20px; border: none; border-radius: 8px; background: #ef4444; color: white; font-weight: 600; cursor: pointer; font-size: 14px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular empty state behavior
const states = {
  inbox: { icon: '&#128235;', title: 'Your inbox is empty', desc: 'When you receive messages, they will appear here.', cta: 'Compose Message' },
  search: { icon: '&#128269;', title: 'No results found', desc: 'Try adjusting your search terms or filters.', cta: 'Clear Filters' },
  error: { icon: '&#9888;', title: 'Something went wrong', desc: 'We could not load the data. Please try again.', cta: 'Retry' }
};

const display = document.getElementById('empty-display');

function showEmpty(type) {
  const s = states[type];
  display.innerHTML = '<div class="empty-icon">' + s.icon + '</div><div class="empty-title">' + s.title + '</div><p class="empty-desc">' + s.desc + '</p><button class="empty-cta">' + s.cta + '</button>';
}

document.querySelectorAll('.empty-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.empty-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    showEmpty(tab.dataset.type);
  });
});
showEmpty('inbox');`,
    },
  },
  {
    id: 'ng-avatar-group',
    title: 'Avatar Group',
    category: 'ui-components',
    difficulty: 'intermediate',
    description:
      'Create a stacked avatar group that shows overlapping avatars with a "+N more" overflow indicator and tooltip on hover.',
    concepts: ['avatar stacking', 'overflow counter', 'negative margin', 'z-index ordering'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Avatar Group</h3>
  <div class="ag-section">
    <label>Small</label>
    <div id="ag-small" class="avatar-group sm"></div>
  </div>
  <div class="ag-section">
    <label>Medium</label>
    <div id="ag-medium" class="avatar-group md"></div>
  </div>
  <div class="ag-section">
    <label>Large</label>
    <div id="ag-large" class="avatar-group lg"></div>
  </div>
  <p class="note">Angular patterns use custom avatar group components. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.ag-section { margin-bottom: 16px; }
label { font-size: 12px; color: #64748b; display: block; margin-bottom: 6px; }
.avatar-group { display: flex; }
.ag-avatar { border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; border: 2px solid #1a1a2e; position: relative; }
.avatar-group.sm .ag-avatar { width: 28px; height: 28px; font-size: 10px; margin-left: -8px; }
.avatar-group.md .ag-avatar { width: 36px; height: 36px; font-size: 12px; margin-left: -10px; }
.avatar-group.lg .ag-avatar { width: 44px; height: 44px; font-size: 14px; margin-left: -12px; }
.ag-avatar:first-child { margin-left: 0; }
.ag-avatar:hover { z-index: 10; transform: scale(1.15); transition: transform 0.15s; }
.ag-overflow { background: #334155; color: #94a3b8; font-weight: 600; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular avatar group behavior
const users = [
  { initials: 'AJ', color: '#ef4444' }, { initials: 'BS', color: '#3b82f6' },
  { initials: 'CD', color: '#22c55e' }, { initials: 'DE', color: '#f59e0b' },
  { initials: 'EF', color: '#8b5cf6' }, { initials: 'GH', color: '#ec4899' },
  { initials: 'IJ', color: '#06b6d4' }, { initials: 'KL', color: '#84cc16' },
];

function renderGroup(elId, maxShow) {
  const el = document.getElementById(elId);
  const show = users.slice(0, maxShow);
  const rest = users.length - maxShow;
  el.innerHTML = show.map((u, i) =>
    '<div class="ag-avatar" style="background:' + u.color + ';z-index:' + (show.length - i) + '" title="' + u.initials + '">' + u.initials + '</div>'
  ).join('') + (rest > 0 ? '<div class="ag-avatar ag-overflow" style="z-index:0">+' + rest + '</div>' : '');
}

renderGroup('ag-small', 5);
renderGroup('ag-medium', 4);
renderGroup('ag-large', 3);`,
    },
  },
  {
    id: 'ng-breadcrumb-overflow',
    title: 'Breadcrumb with Overflow',
    category: 'ui-components',
    difficulty: 'intermediate',
    description:
      'Build a breadcrumb navigation that handles long paths by collapsing middle items into a dropdown overflow menu.',
    concepts: ['breadcrumb', 'overflow handling', 'dropdown menu', 'path truncation'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Breadcrumb Overflow</h3>
  <nav id="breadcrumb" class="breadcrumb" aria-label="Breadcrumb"></nav>
  <div class="controls">
    <button id="add-level" class="ctrl-btn">Add Level</button>
    <button id="reset-bc" class="ctrl-btn">Reset</button>
  </div>
  <p class="note">Angular patterns use custom breadcrumb components. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.breadcrumb { display: flex; align-items: center; gap: 4px; padding: 10px 14px; background: #1e293b; border-radius: 8px; margin-bottom: 12px; flex-wrap: nowrap; overflow: hidden; }
.bc-item { font-size: 13px; color: #94a3b8; cursor: pointer; white-space: nowrap; }
.bc-item:hover { color: #ef4444; }
.bc-item.current { color: #e2e8f0; font-weight: 600; cursor: default; }
.bc-sep { font-size: 12px; color: #475569; }
.bc-overflow { position: relative; }
.bc-overflow-btn { background: #334155; border: none; color: #94a3b8; padding: 2px 8px; border-radius: 4px; cursor: pointer; font-size: 14px; }
.bc-dropdown { position: absolute; top: 100%; left: 0; background: #1e293b; border: 1px solid #334155; border-radius: 6px; margin-top: 4px; z-index: 10; min-width: 120px; }
.bc-dropdown .bc-item { display: block; padding: 6px 10px; }
.bc-dropdown .bc-item:hover { background: #334155; }
.controls { display: flex; gap: 8px; }
.ctrl-btn { padding: 6px 12px; border: 1px solid #334155; border-radius: 6px; background: transparent; color: #94a3b8; cursor: pointer; font-size: 12px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular breadcrumb overflow behavior
let path = ['Home', 'Projects', 'Angular', 'Components'];
const MAX_VISIBLE = 3;
const bcEl = document.getElementById('breadcrumb');

function renderBreadcrumb() {
  let html = '';
  if (path.length <= MAX_VISIBLE + 1) {
    html = path.map((p, i) => {
      const isCurrent = i === path.length - 1;
      return (i > 0 ? '<span class="bc-sep">/</span>' : '') + '<span class="bc-item' + (isCurrent ? ' current' : '') + '">' + p + '</span>';
    }).join('');
  } else {
    html = '<span class="bc-item">' + path[0] + '</span><span class="bc-sep">/</span>';
    html += '<span class="bc-overflow"><button class="bc-overflow-btn" id="bc-expand">...</button></span><span class="bc-sep">/</span>';
    const tail = path.slice(-MAX_VISIBLE);
    html += tail.map((p, i) => (i > 0 ? '<span class="bc-sep">/</span>' : '') + '<span class="bc-item' + (i === tail.length - 1 ? ' current' : '') + '">' + p + '</span>').join('');
  }
  bcEl.innerHTML = html;
  const expBtn = document.getElementById('bc-expand');
  if (expBtn) {
    expBtn.addEventListener('click', () => {
      const hidden = path.slice(1, -MAX_VISIBLE);
      const dd = document.createElement('div');
      dd.className = 'bc-dropdown';
      dd.innerHTML = hidden.map(h => '<span class="bc-item">' + h + '</span>').join('');
      expBtn.parentElement.appendChild(dd);
      setTimeout(() => document.addEventListener('click', () => dd.remove(), { once: true }), 10);
    });
  }
}

document.getElementById('add-level').addEventListener('click', () => { path.push('Level ' + path.length); renderBreadcrumb(); });
document.getElementById('reset-bc').addEventListener('click', () => { path = ['Home', 'Projects', 'Angular', 'Components']; renderBreadcrumb(); });
renderBreadcrumb();`,
    },
  },
  // ===== BATCH 10: ui-components final (8 patterns) =====
  {
    id: 'ng-truncated-text',
    title: 'Truncated Text',
    category: 'ui-components',
    difficulty: 'beginner',
    description:
      'Create a text truncation component with line clamping, "Read more"/"Read less" toggle, and expandable content reveal.',
    concepts: ['text truncation', 'line-clamp', 'expand/collapse', 'read more'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Truncated Text</h3>
  <div class="trunc-card">
    <h4>Article Title</h4>
    <p id="trunc-text" class="trunc-text clamped">Angular is a powerful platform for building mobile and desktop web applications. It provides a comprehensive set of tools for development, testing, and deployment. With features like signals, standalone components, and server-side rendering, Angular continues to evolve and improve developer experience. The framework offers excellent TypeScript support, dependency injection, and a robust CLI for project scaffolding.</p>
    <button id="trunc-toggle" class="trunc-toggle">Read more</button>
  </div>
  <p class="note">Angular patterns use custom truncation directives. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.trunc-card { background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 16px; }
h4 { color: #e2e8f0; margin-bottom: 8px; }
.trunc-text { font-size: 14px; color: #94a3b8; line-height: 1.6; transition: max-height 0.3s; }
.trunc-text.clamped { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.trunc-toggle { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 13px; font-weight: 600; padding: 4px 0; margin-top: 4px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular truncated text behavior
const text = document.getElementById('trunc-text');
const toggle = document.getElementById('trunc-toggle');
let expanded = false;

toggle.addEventListener('click', () => {
  expanded = !expanded;
  text.classList.toggle('clamped', !expanded);
  toggle.textContent = expanded ? 'Read less' : 'Read more';
});`,
    },
  },
  {
    id: 'ng-responsive-grid',
    title: 'Responsive Grid',
    category: 'ui-components',
    difficulty: 'intermediate',
    description:
      'Build a responsive grid layout system with configurable columns, gap control, and automatic breakpoint adjustments.',
    concepts: ['CSS Grid', 'responsive columns', 'breakpoints', 'auto-fit/fill'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Responsive Grid</h3>
  <div class="grid-controls">
    <label>Columns: <select id="col-select"><option value="2">2</option><option value="3" selected>3</option><option value="4">4</option></select></label>
    <label>Gap: <select id="gap-select"><option value="4">4px</option><option value="8" selected>8px</option><option value="16">16px</option></select></label>
  </div>
  <div id="grid-demo" class="grid-demo" style="grid-template-columns: repeat(3, 1fr); gap: 8px;">
    <div class="grid-item">1</div><div class="grid-item">2</div><div class="grid-item">3</div>
    <div class="grid-item">4</div><div class="grid-item">5</div><div class="grid-item">6</div>
    <div class="grid-item">7</div><div class="grid-item">8</div><div class="grid-item">9</div>
  </div>
  <p class="note">Angular patterns use Flex Layout or CSS Grid directives. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.grid-controls { display: flex; gap: 16px; margin-bottom: 12px; font-size: 13px; color: #94a3b8; }
select { padding: 4px 8px; border: 1px solid #334155; border-radius: 4px; background: #1e293b; color: #e2e8f0; }
.grid-demo { display: grid; }
.grid-item { padding: 20px; background: #1e293b; border: 1px solid #334155; border-radius: 8px; text-align: center; font-size: 18px; font-weight: 700; color: #e2e8f0; transition: all 0.2s; }
.grid-item:hover { background: rgba(239,68,68,0.15); border-color: #ef4444; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular responsive grid behavior
const grid = document.getElementById('grid-demo');
const colSelect = document.getElementById('col-select');
const gapSelect = document.getElementById('gap-select');

colSelect.addEventListener('change', updateGrid);
gapSelect.addEventListener('change', updateGrid);

function updateGrid() {
  grid.style.gridTemplateColumns = 'repeat(' + colSelect.value + ', 1fr)';
  grid.style.gap = gapSelect.value + 'px';
}`,
    },
  },
  {
    id: 'ng-masonry-layout',
    title: 'Masonry Layout',
    category: 'ui-components',
    difficulty: 'intermediate',
    description:
      'Create a Pinterest-style masonry layout where items of varying heights are arranged in columns with minimal vertical gaps.',
    concepts: ['masonry', 'column layout', 'variable heights', 'CSS columns'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Masonry Layout</h3>
  <div id="masonry" class="masonry"></div>
  <p class="note">Angular patterns use custom masonry directives. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.masonry { column-count: 3; column-gap: 8px; }
.masonry-item { break-inside: avoid; margin-bottom: 8px; padding: 16px; background: #1e293b; border: 1px solid #334155; border-radius: 8px; color: #e2e8f0; }
.masonry-item h4 { font-size: 14px; margin-bottom: 6px; }
.masonry-item p { font-size: 12px; color: #94a3b8; line-height: 1.5; }
.masonry-item .tag { display: inline-block; padding: 2px 8px; background: rgba(239,68,68,0.15); color: #ef4444; border-radius: 10px; font-size: 11px; margin-top: 8px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular masonry layout behavior
const items = [
  { title: 'Getting Started', text: 'Set up your Angular development environment with the CLI.', tag: 'beginner' },
  { title: 'Components', text: 'Build reusable UI components with templates, styles, and logic encapsulated together.', tag: 'core' },
  { title: 'Services', text: 'Create injectable services for shared business logic and data access.', tag: 'core' },
  { title: 'Routing', text: 'Navigate between views with the Angular Router. Configure lazy loading for optimal bundle sizes and set up route guards for access control.', tag: 'navigation' },
  { title: 'Forms', text: 'Reactive and template-driven forms.', tag: 'forms' },
  { title: 'HTTP', text: 'Use HttpClient to communicate with backend APIs. Handle request/response interceptors and error handling patterns.', tag: 'data' },
  { title: 'Testing', text: 'Unit test with Jasmine and Karma.', tag: 'testing' },
  { title: 'Signals', text: 'Fine-grained reactivity with Angular Signals for better performance.', tag: 'advanced' },
  { title: 'SSR', text: 'Server-side rendering with Angular Universal.', tag: 'advanced' },
];

document.getElementById('masonry').innerHTML = items.map(i =>
  '<div class="masonry-item"><h4>' + i.title + '</h4><p>' + i.text + '</p><span class="tag">' + i.tag + '</span></div>'
).join('');`,
    },
  },
  {
    id: 'ng-aspect-ratio-box',
    title: 'Aspect Ratio Box',
    category: 'ui-components',
    difficulty: 'beginner',
    description:
      'Build containers that maintain specific aspect ratios (16:9, 4:3, 1:1) regardless of width, useful for video players and image galleries.',
    concepts: ['aspect-ratio', 'responsive containers', 'CSS aspect-ratio', 'media embeds'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Aspect Ratio Boxes</h3>
  <div class="ar-grid">
    <div class="ar-card">
      <label>16:9</label>
      <div class="ar-box" style="aspect-ratio: 16/9"><span>16:9</span></div>
    </div>
    <div class="ar-card">
      <label>4:3</label>
      <div class="ar-box" style="aspect-ratio: 4/3"><span>4:3</span></div>
    </div>
    <div class="ar-card">
      <label>1:1</label>
      <div class="ar-box" style="aspect-ratio: 1/1"><span>1:1</span></div>
    </div>
    <div class="ar-card">
      <label>21:9</label>
      <div class="ar-box" style="aspect-ratio: 21/9"><span>21:9</span></div>
    </div>
  </div>
  <p class="note">Angular patterns use custom directives for aspect ratio. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.ar-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.ar-card label { font-size: 12px; color: #64748b; display: block; margin-bottom: 4px; }
.ar-box { background: linear-gradient(135deg, #1e293b, #0f172a); border: 1px solid #334155; border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.ar-box span { font-size: 16px; font-weight: 700; color: #ef4444; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular aspect ratio box behavior
document.querySelectorAll('.ar-box').forEach(box => {
  box.addEventListener('mouseenter', () => { box.style.borderColor = '#ef4444'; });
  box.addEventListener('mouseleave', () => { box.style.borderColor = '#334155'; });
});`,
    },
  },
  {
    id: 'ng-scroll-snap',
    title: 'Scroll Snap',
    category: 'ui-components',
    difficulty: 'intermediate',
    description:
      'Create a scroll snap container with smooth, magnetized scrolling that snaps to items, useful for carousels and page sections.',
    concepts: ['scroll-snap', 'CSS snap points', 'horizontal scroll', 'snap alignment'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Scroll Snap</h3>
  <div id="snap-container" class="snap-container">
    <div class="snap-item" style="background:#ef4444"><h4>Slide 1</h4><p>Swipe or scroll horizontally</p></div>
    <div class="snap-item" style="background:#3b82f6"><h4>Slide 2</h4><p>Items snap into place</p></div>
    <div class="snap-item" style="background:#22c55e"><h4>Slide 3</h4><p>Smooth scrolling experience</p></div>
    <div class="snap-item" style="background:#f59e0b"><h4>Slide 4</h4><p>CSS scroll-snap powers this</p></div>
    <div class="snap-item" style="background:#8b5cf6"><h4>Slide 5</h4><p>Last slide reached!</p></div>
  </div>
  <div id="snap-dots" class="snap-dots"></div>
  <p class="note">Angular patterns use CdkScrollable for scroll snap. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.snap-container { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 10px; padding: 4px 0; scrollbar-width: none; }
.snap-container::-webkit-scrollbar { display: none; }
.snap-item { flex: 0 0 100%; scroll-snap-align: center; border-radius: 12px; padding: 30px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; min-height: 150px; }
.snap-item h4 { color: white; font-size: 20px; margin-bottom: 8px; }
.snap-item p { color: rgba(255,255,255,0.8); font-size: 14px; }
.snap-dots { display: flex; justify-content: center; gap: 6px; margin-top: 10px; }
.snap-dot { width: 8px; height: 8px; border-radius: 50%; background: #334155; cursor: pointer; transition: background 0.2s; }
.snap-dot.active { background: #ef4444; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular scroll snap behavior
const snapContainer = document.getElementById('snap-container');
const snapItems = snapContainer.querySelectorAll('.snap-item');
const dotsEl = document.getElementById('snap-dots');

dotsEl.innerHTML = [...snapItems].map((_, i) => '<div class="snap-dot' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '"></div>').join('');

dotsEl.querySelectorAll('.snap-dot').forEach(dot => {
  dot.addEventListener('click', () => {
    snapItems[parseInt(dot.dataset.idx)].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  });
});

snapContainer.addEventListener('scroll', () => {
  const idx = Math.round(snapContainer.scrollLeft / snapContainer.clientWidth);
  dotsEl.querySelectorAll('.snap-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
});`,
    },
  },
  {
    id: 'ng-parallax',
    title: 'Parallax Scroll',
    category: 'ui-components',
    difficulty: 'intermediate',
    description:
      'Build a parallax scrolling effect where background layers move at different speeds than foreground content, creating a depth illusion.',
    concepts: ['parallax', 'scroll-based animation', 'layer movement', 'transform translate'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Parallax Scroll</h3>
  <div id="parallax-container" class="parallax-container">
    <div class="parallax-bg" id="parallax-bg"></div>
    <div class="parallax-content">
      <div class="px-section"><h4>Welcome</h4><p>Scroll to see the parallax effect on the background.</p></div>
      <div class="px-spacer"></div>
      <div class="px-section"><h4>Features</h4><p>The background moves slower than the content.</p></div>
      <div class="px-spacer"></div>
      <div class="px-section"><h4>Built with Angular</h4><p>Custom directives make parallax easy to implement.</p></div>
      <div class="px-spacer"></div>
    </div>
  </div>
  <p class="note">Angular patterns use custom directives for parallax effects. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.parallax-container { position: relative; height: 220px; overflow-y: auto; border: 1px solid #334155; border-radius: 8px; }
.parallax-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #ef4444 60%, #1e293b 100%); background-size: 200% 200%; height: 150%; opacity: 0.3; z-index: 0; transition: transform 0.1s linear; }
.parallax-content { position: relative; z-index: 1; padding: 20px; }
.px-section { background: rgba(30,41,59,0.9); border: 1px solid #334155; border-radius: 8px; padding: 20px; }
.px-section h4 { color: #ef4444; font-size: 16px; margin-bottom: 6px; }
.px-section p { color: #94a3b8; font-size: 14px; }
.px-spacer { height: 80px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular parallax scroll behavior
const pxContainer = document.getElementById('parallax-container');
const pxBg = document.getElementById('parallax-bg');

pxContainer.addEventListener('scroll', () => {
  const speed = 0.4;
  pxBg.style.transform = 'translateY(' + (-pxContainer.scrollTop * speed) + 'px)';
});`,
    },
  },
  {
    id: 'ng-animated-counter',
    title: 'Animated Counter',
    category: 'ui-components',
    difficulty: 'intermediate',
    description:
      'Create animated number counters that smoothly count up to target values with easing, formatters, and duration control.',
    concepts: ['count animation', 'requestAnimationFrame', 'easing functions', 'number formatting'],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Animated Counters</h3>
  <div class="counter-grid">
    <div class="counter-card"><div class="counter-value" data-target="12847" data-prefix="" data-suffix="">0</div><div class="counter-label">Users</div></div>
    <div class="counter-card"><div class="counter-value" data-target="48290" data-prefix="$" data-suffix="">0</div><div class="counter-label">Revenue</div></div>
    <div class="counter-card"><div class="counter-value" data-target="99" data-prefix="" data-suffix="%">0</div><div class="counter-label">Uptime</div></div>
    <div class="counter-card"><div class="counter-value" data-target="1250" data-prefix="" data-suffix="+">0</div><div class="counter-label">Projects</div></div>
  </div>
  <button id="restart-counters" class="restart-btn">Restart Animation</button>
  <p class="note">Angular patterns use animation callbacks for counters. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.counter-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 12px; }
.counter-card { background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 16px; text-align: center; }
.counter-value { font-size: 28px; font-weight: 800; color: #ef4444; margin-bottom: 4px; }
.counter-label { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }
.restart-btn { padding: 6px 14px; border: 1px solid #334155; border-radius: 6px; background: transparent; color: #94a3b8; cursor: pointer; font-size: 12px; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular animated counter behavior
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const prefix = el.dataset.prefix;
  const suffix = el.dataset.suffix;
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = prefix + current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function startAll() {
  document.querySelectorAll('.counter-value').forEach(el => {
    el.textContent = el.dataset.prefix + '0' + el.dataset.suffix;
    animateCounter(el);
  });
}

document.getElementById('restart-counters').addEventListener('click', startAll);
startAll();`,
    },
  },
  {
    id: 'ng-confetti',
    title: 'Confetti Effect',
    category: 'ui-components',
    difficulty: 'intermediate',
    description:
      'Build a confetti celebration effect with colorful particles that burst and fall with gravity, triggered by user actions.',
    concepts: [
      'canvas animation',
      'particle system',
      'physics simulation',
      'requestAnimationFrame',
    ],
    framework: 'angular',
    demoCode: {
      html: `<div id="app">
  <h3>Confetti Effect</h3>
  <div class="confetti-area">
    <canvas id="confetti-canvas" width="400" height="250"></canvas>
    <button id="confetti-btn" class="confetti-btn">&#127881; Celebrate!</button>
  </div>
  <p class="note">Angular patterns use custom animation services for confetti. This demo simulates the behavior with vanilla JS.</p>
</div>`,
      css: `.confetti-area { position: relative; border: 1px solid #334155; border-radius: 8px; overflow: hidden; }
canvas { display: block; width: 100%; background: #0f172a; }
.confetti-btn { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); padding: 12px 24px; border: none; border-radius: 10px; background: #ef4444; color: white; font-size: 16px; font-weight: 700; cursor: pointer; z-index: 2; }
.confetti-btn:hover { background: #dc2626; }
.note { margin-top: 20px; font-size: 11px; color: #64748b; text-align: center; font-style: italic; }`,
      js: `// Simulating Angular confetti effect behavior
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
const colors = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
let particles = [];
let animId = null;

function createParticles() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 100,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: -Math.random() * 10 - 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 3,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.15,
      opacity: 1
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let alive = false;
  particles.forEach(p => {
    p.x += p.vx;
    p.vy += p.gravity;
    p.y += p.vy;
    p.rotation += p.rotSpeed;
    p.opacity -= 0.005;
    if (p.opacity > 0 && p.y < canvas.height + 20) {
      alive = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }
  });
  if (alive) animId = requestAnimationFrame(animate);
}

document.getElementById('confetti-btn').addEventListener('click', () => {
  if (animId) cancelAnimationFrame(animId);
  createParticles();
  animate();
});`,
    },
  },
];
