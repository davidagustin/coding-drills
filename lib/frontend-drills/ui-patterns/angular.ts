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
    '<div class="item-card"><span class="name">' + item + '</span><button class="fav-btn' + (favorites.includes(item) ? ' active' : '') + '" data-item="' + item + '">' + (favorites.includes(item) ? '\\u2665' : '\\u2661') + '</button></div>'
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
    icon: '\\u{1F4E6}',
    title: 'No items yet',
    desc: 'Get started by creating your first item. It only takes a few seconds.',
    actions: '<button class="empty-action" onclick="alert(\\'Create clicked\\')">Create First Item</button>'
  },
  'no-results': {
    icon: '\\u{1F50D}',
    title: 'No results found',
    desc: 'Try adjusting your search or filters to find what you are looking for.',
    actions: '<button class="empty-action" onclick="alert(\\'Filters cleared\\')">Clear Filters</button><button class="empty-action secondary" onclick="alert(\\'Help opened\\')">Get Help</button>'
  },
  'error': {
    icon: '\\u{26A0}',
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
];
