import type { UIPattern } from './types';

export const vueUIPatterns: UIPattern[] = [
  // Forms & Input
  {
    id: 'vue-form-validation',
    title: 'Form Validation',
    description:
      "Build a reactive form with v-model bindings and computed validators. Handle validation state, error messages, and submit logic using Vue's reactivity system.",
    difficulty: 'beginner',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-model', 'computed', 'reactive', 'Composition API'],
    demoCode: {
      html: `<div id="app">
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label>Name</label>
      <input v-model="form.name" @blur="touched.name = true" placeholder="Your name" />
      <div v-if="touched.name && errors.name" class="error">{{ errors.name }}</div>
    </div>
    <div class="form-group">
      <label>Email</label>
      <input v-model="form.email" @blur="touched.email = true" placeholder="you@example.com" />
      <div v-if="touched.email && errors.email" class="error">{{ errors.email }}</div>
    </div>
    <button type="submit" :disabled="hasErrors">Submit</button>
    <div v-if="submitted" class="success">Welcome, {{ form.name }}!</div>
  </form>
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
  border-color: #3b82f6;
}

.error {
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
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
}

button:hover {
  background: #2563eb;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`,
      js: `const { createApp, reactive, computed, ref } = Vue;

createApp({
  setup() {
    const form = reactive({ name: '', email: '' });
    const touched = reactive({ name: false, email: false });
    const submitted = ref(false);

    const errors = computed(() => ({
      name: !form.name.trim() ? 'Name is required' : '',
      email: !form.email.includes('@') ? 'Valid email required' : '',
    }));

    const hasErrors = computed(() => Object.values(errors.value).some(e => e));

    const handleSubmit = () => {
      touched.name = true;
      touched.email = true;
      if (!hasErrors.value) submitted.value = true;
    };

    return { form, touched, errors, hasErrors, submitted, handleSubmit };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-vee-validate',
    title: 'VeeValidate Form',
    description:
      'Create a form using VeeValidate with Yup schemas for validation. Implement field-level validation, error handling, and form submission with the Composition API.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['VeeValidate', 'Yup', 'Composition API', 'v-model'],
    demoCode: {
      html: `<div id="app">
  <form @submit.prevent="handleSubmit">
    <div class="field">
      <label>Username</label>
      <input v-model="username" @blur="validateField('username')" placeholder="Enter username" />
      <span v-if="errors.username" class="error">{{ errors.username }}</span>
    </div>
    <div class="field">
      <label>Email</label>
      <input v-model="email" @blur="validateField('email')" placeholder="you@example.com" />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </div>
    <div class="field">
      <label>Password</label>
      <input v-model="password" type="password" @blur="validateField('password')" placeholder="Min 6 chars" />
      <span v-if="errors.password" class="error">{{ errors.password }}</span>
    </div>
    <button type="submit" :disabled="!isValid">Register</button>
    <div v-if="submitted" class="success">Registration successful!</div>
  </form>
</div>`,
      css: `.field { margin-bottom: 14px; }
label { display: block; font-size: 13px; color: #94a3b8; margin-bottom: 4px; }
input { width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155; background: #1e293b; color: #e2e8f0; outline: none; }
input:focus { border-color: #3b82f6; }
.error { color: #ef4444; font-size: 12px; margin-top: 2px; display: block; }
.success { color: #22c55e; text-align: center; padding: 12px; border-radius: 8px; background: rgba(34,197,94,0.1); margin-top: 12px; }
button { width: 100%; padding: 12px; border-radius: 8px; border: none; background: #3b82f6; color: white; font-weight: 600; cursor: pointer; }
button:disabled { opacity: 0.5; cursor: not-allowed; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const errors = ref({});
    const submitted = ref(false);

    const rules = {
      username: v => !v.trim() ? 'Username is required' : v.length < 3 ? 'Min 3 characters' : '',
      email: v => !v.includes('@') ? 'Valid email required' : '',
      password: v => v.length < 6 ? 'Min 6 characters' : '',
    };

    const validateField = (field) => {
      const vals = { username: username.value, email: email.value, password: password.value };
      errors.value = { ...errors.value, [field]: rules[field](vals[field]) };
    };

    const isValid = computed(() => {
      return username.value && email.value && password.value &&
        !rules.username(username.value) && !rules.email(email.value) && !rules.password(password.value);
    });

    const handleSubmit = () => {
      Object.keys(rules).forEach(validateField);
      if (isValid.value) submitted.value = true;
    };

    return { username, email, password, errors, submitted, isValid, validateField, handleSubmit };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-autocomplete',
    title: 'Autocomplete Input',
    description:
      'Build an autocomplete component with debounced search using watchDebounced from VueUse. Implement keyboard navigation, v-model binding, and async data fetching.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-model', 'watch', 'composables', 'VueUse'],
    demoCode: {
      html: `<div id="app">
  <div class="autocomplete">
    <input v-model="query" @input="onInput" @keydown.down.prevent="moveDown" @keydown.up.prevent="moveUp" @keydown.enter.prevent="selectCurrent" placeholder="Search fruits..." />
    <ul v-if="showList && filtered.length" class="dropdown">
      <li v-for="(item, i) in filtered" :key="item" :class="{ active: i === activeIndex }" @click="select(item)">{{ item }}</li>
    </ul>
    <div v-if="selected" class="selected">Selected: <strong>{{ selected }}</strong></div>
  </div>
</div>`,
      css: `.autocomplete { position: relative; }
input { width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155; background: #1e293b; color: #e2e8f0; outline: none; }
input:focus { border-color: #3b82f6; }
.dropdown { position: absolute; top: 100%; left: 0; right: 0; background: #1e293b; border: 1px solid #334155; border-radius: 8px; margin-top: 4px; list-style: none; padding: 4px 0; max-height: 160px; overflow-y: auto; z-index: 10; }
.dropdown li { padding: 8px 12px; cursor: pointer; color: #e2e8f0; }
.dropdown li:hover, .dropdown li.active { background: #334155; }
.selected { margin-top: 12px; padding: 10px; border-radius: 8px; background: rgba(59,130,246,0.1); color: #3b82f6; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const items = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry', 'Grape', 'Mango', 'Orange', 'Peach', 'Strawberry'];
    const query = ref('');
    const selected = ref('');
    const showList = ref(false);
    const activeIndex = ref(-1);

    const filtered = computed(() => {
      if (!query.value.trim()) return [];
      return items.filter(i => i.toLowerCase().includes(query.value.toLowerCase()));
    });

    const onInput = () => { showList.value = true; activeIndex.value = -1; selected.value = ''; };
    const select = (item) => { query.value = item; selected.value = item; showList.value = false; };
    const moveDown = () => { if (activeIndex.value < filtered.value.length - 1) activeIndex.value++; };
    const moveUp = () => { if (activeIndex.value > 0) activeIndex.value--; };
    const selectCurrent = () => { if (activeIndex.value >= 0) select(filtered.value[activeIndex.value]); };

    return { query, selected, showList, activeIndex, filtered, onInput, select, moveDown, moveUp, selectCurrent };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-file-upload',
    title: 'File Upload',
    description:
      'Create a drag-and-drop file upload component with reactive progress tracking. Use refs and reactive state to manage upload status, previews, and validation.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['reactive', 'refs', 'custom directives', 'Composition API'],
    demoCode: {
      html: `<div id="app">
  <div class="upload-zone" :class="{ dragover: isDragover }" @dragover.prevent="isDragover = true" @dragleave="isDragover = false" @drop.prevent="onDrop">
    <div v-if="!files.length" class="placeholder">
      <div class="icon">&#128230;</div>
      <p>Drag files here or <label class="browse">browse<input type="file" multiple @change="onSelect" hidden /></label></p>
    </div>
    <div v-for="(f, i) in files" :key="i" class="file-item">
      <div class="file-info">
        <span class="name">{{ f.name }}</span>
        <span class="size">{{ (f.size / 1024).toFixed(1) }} KB</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" :style="{ width: f.progress + '%' }"></div></div>
      <button class="remove" @click="files.splice(i, 1)">x</button>
    </div>
  </div>
</div>`,
      css: `.upload-zone { border: 2px dashed #334155; border-radius: 12px; padding: 24px; text-align: center; transition: border-color 0.2s; }
.upload-zone.dragover { border-color: #3b82f6; background: rgba(59,130,246,0.05); }
.icon { font-size: 32px; margin-bottom: 8px; }
.placeholder p { color: #94a3b8; margin: 0; }
.browse { color: #3b82f6; cursor: pointer; text-decoration: underline; }
.file-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #1e293b; }
.file-info { flex: 1; text-align: left; }
.name { color: #e2e8f0; font-size: 14px; display: block; }
.size { color: #94a3b8; font-size: 12px; }
.progress-bar { width: 80px; height: 6px; background: #1e293b; border-radius: 3px; overflow: hidden; }
.progress-fill { height: 100%; background: #3b82f6; transition: width 0.3s; }
.remove { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 14px; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const files = ref([]);
    const isDragover = ref(false);

    const addFiles = (fileList) => {
      Array.from(fileList).forEach(f => {
        const entry = { name: f.name, size: f.size, progress: 0 };
        files.value.push(entry);
        simulateUpload(entry);
      });
    };

    const simulateUpload = (entry) => {
      const interval = setInterval(() => {
        entry.progress = Math.min(entry.progress + Math.random() * 20, 100);
        if (entry.progress >= 100) clearInterval(interval);
      }, 300);
    };

    const onDrop = (e) => { isDragover.value = false; addFiles(e.dataTransfer.files); };
    const onSelect = (e) => { addFiles(e.target.files); };

    return { files, isDragover, onDrop, onSelect };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-date-picker',
    title: 'Date Picker',
    description:
      'Build a custom date picker component with v-model support. Implement calendar navigation, date selection, and range picking with reactive computed properties.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-model', 'computed', 'reactive', 'slots'],
    demoCode: {
      html: `<div id="app">
  <div class="picker">
    <div class="header">
      <button @click="prevMonth">&lt;</button>
      <span>{{ monthYear }}</span>
      <button @click="nextMonth">&gt;</button>
    </div>
    <div class="weekdays"><span v-for="d in days" :key="d">{{ d }}</span></div>
    <div class="grid">
      <span v-for="(cell, i) in calendarCells" :key="i"
        :class="{ day: cell, today: isToday(cell), selected: isSelected(cell), empty: !cell }"
        @click="cell && selectDate(cell)">{{ cell || '' }}</span>
    </div>
    <div v-if="selected" class="result">Selected: {{ selected }}</div>
  </div>
</div>`,
      css: `.picker { background: #1e293b; border-radius: 12px; padding: 16px; max-width: 300px; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; color: #e2e8f0; font-weight: 600; }
.header button { background: #334155; border: none; color: #e2e8f0; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; }
.weekdays { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; color: #94a3b8; font-size: 12px; margin-bottom: 8px; }
.grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; text-align: center; }
.grid span { padding: 8px 0; border-radius: 8px; cursor: pointer; font-size: 14px; color: #e2e8f0; }
.grid .empty { cursor: default; }
.grid .day:hover { background: #334155; }
.grid .today { border: 1px solid #3b82f6; }
.grid .selected { background: #3b82f6; color: white; }
.result { margin-top: 12px; text-align: center; color: #3b82f6; font-size: 14px; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
    const current = ref(new Date());
    const selected = ref('');

    const monthYear = computed(() => current.value.toLocaleString('default', { month: 'long', year: 'numeric' }));

    const calendarCells = computed(() => {
      const y = current.value.getFullYear(), m = current.value.getMonth();
      const firstDay = new Date(y, m, 1).getDay();
      const daysInMonth = new Date(y, m + 1, 0).getDate();
      const cells = Array(firstDay).fill(null);
      for (let d = 1; d <= daysInMonth; d++) cells.push(d);
      return cells;
    });

    const isToday = (d) => {
      if (!d) return false;
      const t = new Date(), y = current.value.getFullYear(), m = current.value.getMonth();
      return d === t.getDate() && m === t.getMonth() && y === t.getFullYear();
    };

    const isSelected = (d) => {
      if (!d) return false;
      const y = current.value.getFullYear(), m = current.value.getMonth();
      return selected.value === new Date(y, m, d).toLocaleDateString();
    };

    const selectDate = (d) => {
      const y = current.value.getFullYear(), m = current.value.getMonth();
      selected.value = new Date(y, m, d).toLocaleDateString();
    };

    const prevMonth = () => { const d = new Date(current.value); d.setMonth(d.getMonth() - 1); current.value = d; };
    const nextMonth = () => { const d = new Date(current.value); d.setMonth(d.getMonth() + 1); current.value = d; };

    return { days, monthYear, calendarCells, selected, isToday, isSelected, selectDate, prevMonth, nextMonth };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-dynamic-forms',
    title: 'Dynamic Form Generator',
    description:
      'Create a dynamic form system that renders fields from JSON schema using component :is. Support different field types, validation rules, and nested form structures.',
    difficulty: 'advanced',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['dynamic components', 'v-model', 'provide/inject', 'recursion'],
    demoCode: {
      html: `<div id="app">
  <h3 style="color:#e2e8f0;margin-bottom:12px;">Dynamic Form</h3>
  <div v-for="field in schema" :key="field.name" class="field">
    <label>{{ field.label }}</label>
    <input v-if="field.type === 'text' || field.type === 'email'" :type="field.type" v-model="formData[field.name]" :placeholder="field.placeholder" />
    <select v-else-if="field.type === 'select'" v-model="formData[field.name]">
      <option value="" disabled>Select...</option>
      <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
    </select>
    <textarea v-else-if="field.type === 'textarea'" v-model="formData[field.name]" :placeholder="field.placeholder" rows="3"></textarea>
    <span v-if="field.required && !formData[field.name]" class="req">Required</span>
  </div>
  <button @click="submitted = true" :disabled="!isValid">Submit</button>
  <pre v-if="submitted" class="output">{{ formData }}</pre>
</div>`,
      css: `.field { margin-bottom: 14px; }
label { display: block; font-size: 13px; color: #94a3b8; margin-bottom: 4px; }
input, select, textarea { width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155; background: #1e293b; color: #e2e8f0; outline: none; font-family: inherit; }
input:focus, select:focus, textarea:focus { border-color: #3b82f6; }
.req { color: #ef4444; font-size: 11px; }
button { width: 100%; padding: 12px; border-radius: 8px; border: none; background: #3b82f6; color: white; font-weight: 600; cursor: pointer; }
button:disabled { opacity: 0.5; cursor: not-allowed; }
.output { background: #1e293b; border-radius: 8px; padding: 12px; color: #22c55e; font-size: 13px; margin-top: 12px; white-space: pre-wrap; }`,
      js: `const { createApp, reactive, ref, computed } = Vue;

createApp({
  setup() {
    const schema = [
      { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com', required: true },
      { name: 'role', label: 'Role', type: 'select', options: ['Developer', 'Designer', 'Manager'], required: true },
      { name: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Tell us about yourself', required: false },
    ];

    const formData = reactive({});
    schema.forEach(f => formData[f.name] = '');
    const submitted = ref(false);

    const isValid = computed(() => schema.filter(f => f.required).every(f => formData[f.name]));

    return { schema, formData, submitted, isValid };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-input-masking',
    title: 'Input Masking',
    description:
      'Implement input masking with custom directives for phone numbers, credit cards, and dates. Create reusable v-mask directive with configurable patterns.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['custom directives', 'v-model', 'modifiers', 'Composition API'],
    demoCode: {
      html: `<div id="app">
  <div class="field">
    <label>Phone Number</label>
    <input :value="phone" @input="phone = maskPhone($event.target.value)" placeholder="(555) 123-4567" />
  </div>
  <div class="field">
    <label>Credit Card</label>
    <input :value="card" @input="card = maskCard($event.target.value)" placeholder="1234 5678 9012 3456" />
  </div>
  <div class="field">
    <label>Date</label>
    <input :value="date" @input="date = maskDate($event.target.value)" placeholder="MM/DD/YYYY" />
  </div>
  <div class="values">
    <div>Phone: <span>{{ phone || '-' }}</span></div>
    <div>Card: <span>{{ card || '-' }}</span></div>
    <div>Date: <span>{{ date || '-' }}</span></div>
  </div>
</div>`,
      css: `.field { margin-bottom: 14px; }
label { display: block; font-size: 13px; color: #94a3b8; margin-bottom: 4px; }
input { width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155; background: #1e293b; color: #e2e8f0; outline: none; font-family: monospace; font-size: 15px; letter-spacing: 1px; }
input:focus { border-color: #3b82f6; }
.values { background: #1e293b; border-radius: 8px; padding: 12px; margin-top: 8px; }
.values div { color: #94a3b8; font-size: 13px; margin-bottom: 4px; }
.values span { color: #3b82f6; font-family: monospace; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const phone = ref('');
    const card = ref('');
    const date = ref('');

    const maskPhone = (v) => {
      const d = v.replace(/\\D/g, '').slice(0, 10);
      if (d.length <= 3) return d.length ? '(' + d : '';
      if (d.length <= 6) return '(' + d.slice(0,3) + ') ' + d.slice(3);
      return '(' + d.slice(0,3) + ') ' + d.slice(3,6) + '-' + d.slice(6);
    };

    const maskCard = (v) => {
      const d = v.replace(/\\D/g, '').slice(0, 16);
      return d.replace(/(\\d{4})(?=\\d)/g, '$1 ');
    };

    const maskDate = (v) => {
      const d = v.replace(/\\D/g, '').slice(0, 8);
      if (d.length <= 2) return d;
      if (d.length <= 4) return d.slice(0,2) + '/' + d.slice(2);
      return d.slice(0,2) + '/' + d.slice(2,4) + '/' + d.slice(4);
    };

    return { phone, card, date, maskPhone, maskCard, maskDate };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-select-component',
    title: 'Custom Select',
    description:
      'Build a custom select component with named slots for options and selected value. Implement v-model, keyboard navigation, and search filtering.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-model', 'slots', 'Teleport', 'composables'],
    demoCode: {
      html: `<div id="app">
  <label class="label">Choose a framework</label>
  <div class="select" @click="open = !open">
    <span :class="{ placeholder: !selected }">{{ selected || 'Select...' }}</span>
    <span class="arrow">{{ open ? '&#9650;' : '&#9660;' }}</span>
  </div>
  <div v-if="open" class="dropdown">
    <input v-model="search" class="search" placeholder="Search..." />
    <div v-for="opt in filtered" :key="opt" class="option" :class="{ active: opt === selected }" @click="select(opt)">{{ opt }}</div>
    <div v-if="!filtered.length" class="empty">No results</div>
  </div>
  <div v-if="selected" class="result">Selected: <strong>{{ selected }}</strong></div>
</div>`,
      css: `.label { display: block; font-size: 13px; color: #94a3b8; margin-bottom: 6px; }
.select { display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155; background: #1e293b; color: #e2e8f0; cursor: pointer; }
.placeholder { color: #64748b; }
.arrow { font-size: 10px; color: #94a3b8; }
.dropdown { background: #1e293b; border: 1px solid #334155; border-radius: 8px; margin-top: 4px; overflow: hidden; }
.search { width: 100%; padding: 8px 12px; border: none; border-bottom: 1px solid #334155; background: transparent; color: #e2e8f0; outline: none; }
.option { padding: 8px 12px; cursor: pointer; color: #e2e8f0; }
.option:hover { background: #334155; }
.option.active { color: #3b82f6; }
.empty { padding: 8px 12px; color: #64748b; font-size: 13px; }
.result { margin-top: 12px; padding: 10px; border-radius: 8px; background: rgba(59,130,246,0.1); color: #3b82f6; font-size: 14px; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const options = ['Vue', 'React', 'Angular', 'Svelte', 'Solid'];
    const open = ref(false);
    const selected = ref('');
    const search = ref('');

    const filtered = computed(() =>
      options.filter(o => o.toLowerCase().includes(search.value.toLowerCase()))
    );

    const select = (opt) => { selected.value = opt; open.value = false; search.value = ''; };

    return { open, selected, search, filtered, select };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-inline-edit',
    title: 'Inline Editing',
    description:
      'Create inline editing functionality with smooth transitions between view and edit modes. Use v-model and transition components for seamless UX.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-model', 'transition', 'refs', 'Composition API'],
    demoCode: {
      html: `<div id="app">
  <div v-for="(item, i) in items" :key="i" class="item">
    <template v-if="editIndex !== i">
      <span class="text">{{ item }}</span>
      <button class="edit-btn" @click="startEdit(i)">Edit</button>
    </template>
    <template v-else>
      <input v-model="editValue" @keydown.enter="save(i)" @keydown.escape="cancel" class="edit-input" />
      <button class="save-btn" @click="save(i)">Save</button>
      <button class="cancel-btn" @click="cancel">Cancel</button>
    </template>
  </div>
  <div class="add-row">
    <input v-model="newItem" @keydown.enter="add" placeholder="Add new item..." class="edit-input" />
    <button class="save-btn" @click="add" :disabled="!newItem.trim()">Add</button>
  </div>
</div>`,
      css: `.item { display: flex; align-items: center; gap: 8px; padding: 10px; border-radius: 8px; background: #1e293b; margin-bottom: 6px; }
.text { flex: 1; color: #e2e8f0; }
.edit-input { flex: 1; padding: 8px 10px; border-radius: 6px; border: 1px solid #3b82f6; background: #0f172a; color: #e2e8f0; outline: none; }
.edit-btn { background: #334155; border: none; color: #94a3b8; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; }
.save-btn { background: #22c55e; border: none; color: white; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; }
.save-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.cancel-btn { background: #ef4444; border: none; color: white; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; }
.add-row { display: flex; gap: 8px; margin-top: 12px; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const items = ref(['Learn Vue 3', 'Build components', 'Ship to production']);
    const editIndex = ref(-1);
    const editValue = ref('');
    const newItem = ref('');

    const startEdit = (i) => { editIndex.value = i; editValue.value = items.value[i]; };
    const save = (i) => { if (editValue.value.trim()) { items.value[i] = editValue.value.trim(); } cancel(); };
    const cancel = () => { editIndex.value = -1; editValue.value = ''; };
    const add = () => { if (newItem.value.trim()) { items.value.push(newItem.value.trim()); newItem.value = ''; } };

    return { items, editIndex, editValue, newItem, startEdit, save, cancel, add };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-color-picker',
    title: 'Color Picker',
    description:
      'Build a color picker with reactive HSL state management. Implement gradient sliders, hex input, and v-model binding for color selection.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-model', 'reactive', 'computed', 'watch'],
    demoCode: {
      html: `<div id="app">
  <div class="color-picker">
    <div class="preview" :style="{ background: hexColor }"></div>
    <div class="sliders">
      <label>Hue: {{ hue }}<input type="range" v-model.number="hue" min="0" max="360" /></label>
      <label>Saturation: {{ sat }}%<input type="range" v-model.number="sat" min="0" max="100" /></label>
      <label>Lightness: {{ lit }}%<input type="range" v-model.number="lit" min="0" max="100" /></label>
    </div>
    <div class="hex-row">
      <label>Hex</label>
      <input :value="hexColor" @input="parseHex($event.target.value)" class="hex-input" maxlength="7" />
    </div>
    <div class="swatches">
      <div v-for="c in presets" :key="c" class="swatch" :style="{ background: c }" @click="parseHex(c)"></div>
    </div>
  </div>
</div>`,
      css: `.color-picker { background: #1e293b; border-radius: 12px; padding: 16px; }
.preview { width: 100%; height: 60px; border-radius: 8px; margin-bottom: 12px; border: 1px solid #475569; }
.sliders label { display: block; color: #94a3b8; font-size: 13px; margin-bottom: 10px; }
.sliders input[type="range"] { width: 100%; margin-top: 4px; accent-color: #3b82f6; }
.hex-row { display: flex; align-items: center; gap: 8px; margin: 12px 0; }
.hex-row label { color: #94a3b8; font-size: 13px; }
.hex-input { flex: 1; padding: 8px 10px; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: #e2e8f0; font-family: monospace; outline: none; }
.swatches { display: flex; gap: 6px; flex-wrap: wrap; }
.swatch { width: 28px; height: 28px; border-radius: 6px; cursor: pointer; border: 2px solid transparent; }
.swatch:hover { border-color: #e2e8f0; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const hue = ref(220);
    const sat = ref(80);
    const lit = ref(50);
    const presets = ['#3b82f6','#22c55e','#ef4444','#f59e0b','#8b5cf6','#ec4899','#06b6d4','#e2e8f0'];

    const hexColor = computed(() => {
      const h = hue.value, s = sat.value / 100, l = lit.value / 100;
      const a = s * Math.min(l, 1 - l);
      const f = n => { const k = (n + h / 30) % 12; return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1); };
      const toHex = x => Math.round(x * 255).toString(16).padStart(2, '0');
      return '#' + toHex(f(0)) + toHex(f(8)) + toHex(f(4));
    });

    const parseHex = (hex) => {
      if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return;
      const r = parseInt(hex.slice(1,3),16)/255, g = parseInt(hex.slice(3,5),16)/255, b = parseInt(hex.slice(5,7),16)/255;
      const max = Math.max(r,g,b), min = Math.min(r,g,b), d = max - min;
      lit.value = Math.round((max + min) / 2 * 100);
      sat.value = d === 0 ? 0 : Math.round(d / (1 - Math.abs(2 * lit.value / 100 - 1)) * 100);
      if (d === 0) hue.value = 0;
      else if (max === r) hue.value = Math.round(60 * (((g - b) / d) % 6));
      else if (max === g) hue.value = Math.round(60 * ((b - r) / d + 2));
      else hue.value = Math.round(60 * ((r - g) / d + 4));
      if (hue.value < 0) hue.value += 360;
    };

    return { hue, sat, lit, hexColor, presets, parseHex };
  }
}).mount('#app');`,
    },
  },

  // Interactive Elements
  {
    id: 'vue-modal',
    title: 'Modal Dialog',
    description:
      'Create a reusable modal component using Teleport to render at document root. Implement open/close transitions, focus management, and slot-based content.',
    difficulty: 'intermediate',
    category: 'interactive',
    framework: 'vue',
    concepts: ['Teleport', 'transition', 'slots', 'composables'],
    demoCode: {
      html: `<div id="app">
  <button class="open-btn" @click="showModal = true">Open Modal</button>
  <div v-if="showModal" class="overlay" @click.self="showModal = false">
    <div class="modal">
      <div class="modal-header">
        <h3>Confirm Action</h3>
        <button class="close" @click="showModal = false">&times;</button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to proceed with this action? This cannot be undone.</p>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" @click="showModal = false">Cancel</button>
        <button class="btn-confirm" @click="confirmed = true; showModal = false">Confirm</button>
      </div>
    </div>
  </div>
  <div v-if="confirmed" class="status">Action confirmed!</div>
</div>`,
      css: `.open-btn { padding: 12px 24px; border-radius: 8px; border: none; background: #3b82f6; color: white; font-weight: 600; cursor: pointer; }
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 50; }
.modal { background: #1e293b; border-radius: 12px; width: 90%; max-width: 400px; overflow: hidden; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid #334155; }
.modal-header h3 { margin: 0; color: #e2e8f0; font-size: 16px; }
.close { background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer; }
.modal-body { padding: 16px; }
.modal-body p { color: #94a3b8; margin: 0; font-size: 14px; line-height: 1.5; }
.modal-footer { display: flex; gap: 8px; justify-content: flex-end; padding: 16px; border-top: 1px solid #334155; }
.btn-cancel { padding: 8px 16px; border-radius: 6px; border: 1px solid #475569; background: transparent; color: #94a3b8; cursor: pointer; }
.btn-confirm { padding: 8px 16px; border-radius: 6px; border: none; background: #3b82f6; color: white; cursor: pointer; }
.status { margin-top: 16px; padding: 12px; border-radius: 8px; background: rgba(34,197,94,0.1); color: #22c55e; text-align: center; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const showModal = ref(false);
    const confirmed = ref(false);
    return { showModal, confirmed };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-drag-drop',
    title: 'Drag and Drop',
    description:
      'Implement drag-and-drop functionality using Vue Draggable or custom directives. Support list reordering, cross-list transfers, and reactive state updates.',
    difficulty: 'advanced',
    category: 'interactive',
    framework: 'vue',
    concepts: ['custom directives', 'reactive', 'transition-group', 'refs'],
    demoCode: {
      html: `<div id="app">
  <h3 style="color:#e2e8f0;margin-bottom:12px;">Sortable List</h3>
  <div class="list">
    <div v-for="(item, i) in items" :key="item.id" class="drag-item" draggable="true"
      @dragstart="dragStart(i)" @dragover.prevent="dragOver(i)" @dragend="dragEnd"
      :class="{ dragging: dragIndex === i, over: overIndex === i }">
      <span class="handle">&#9776;</span>
      <span>{{ item.text }}</span>
    </div>
  </div>
  <div class="order">Order: {{ items.map(i => i.text).join(', ') }}</div>
</div>`,
      css: `.list { display: flex; flex-direction: column; gap: 4px; }
.drag-item { display: flex; align-items: center; gap: 10px; padding: 12px; background: #1e293b; border-radius: 8px; color: #e2e8f0; cursor: grab; border: 1px solid transparent; transition: all 0.15s; }
.drag-item.dragging { opacity: 0.4; }
.drag-item.over { border-color: #3b82f6; background: rgba(59,130,246,0.1); }
.handle { color: #475569; font-size: 14px; }
.order { margin-top: 12px; padding: 10px; border-radius: 8px; background: #1e293b; color: #94a3b8; font-size: 13px; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const items = ref([
      { id: 1, text: 'Vue.js' },
      { id: 2, text: 'React' },
      { id: 3, text: 'Angular' },
      { id: 4, text: 'Svelte' },
      { id: 5, text: 'Solid' },
    ]);
    const dragIndex = ref(-1);
    const overIndex = ref(-1);

    const dragStart = (i) => { dragIndex.value = i; };
    const dragOver = (i) => {
      if (i === dragIndex.value) return;
      overIndex.value = i;
      const dragged = items.value.splice(dragIndex.value, 1)[0];
      items.value.splice(i, 0, dragged);
      dragIndex.value = i;
    };
    const dragEnd = () => { dragIndex.value = -1; overIndex.value = -1; };

    return { items, dragIndex, overIndex, dragStart, dragOver, dragEnd };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-data-table',
    title: 'Data Table',
    description:
      'Build a feature-rich data table with sortable columns, pagination, and filtering. Use computed properties for derived state and slots for custom cell rendering.',
    difficulty: 'advanced',
    category: 'interactive',
    framework: 'vue',
    concepts: ['computed', 'slots', 'v-model', 'Composition API'],
    demoCode: {
      html: `<div id="app">
  <div class="controls">
    <input v-model="search" placeholder="Filter..." class="search" />
    <span class="count">{{ filtered.length }} rows</span>
  </div>
  <table>
    <thead>
      <tr>
        <th v-for="col in columns" :key="col.key" @click="sortBy(col.key)" class="sortable">
          {{ col.label }} <span v-if="sortKey === col.key">{{ sortAsc ? '&#9650;' : '&#9660;' }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in paginated" :key="row.name">
        <td>{{ row.name }}</td><td>{{ row.role }}</td><td>{{ row.score }}</td>
      </tr>
    </tbody>
  </table>
  <div class="pagination">
    <button :disabled="page <= 1" @click="page--">&lt;</button>
    <span>{{ page }} / {{ totalPages }}</span>
    <button :disabled="page >= totalPages" @click="page++">&gt;</button>
  </div>
</div>`,
      css: `.controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.search { padding: 8px 12px; border-radius: 6px; border: 1px solid #334155; background: #1e293b; color: #e2e8f0; outline: none; }
.count { color: #94a3b8; font-size: 13px; }
table { width: 100%; border-collapse: collapse; }
th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #1e293b; color: #e2e8f0; font-size: 14px; }
th { background: #1e293b; color: #94a3b8; font-weight: 600; font-size: 12px; text-transform: uppercase; }
.sortable { cursor: pointer; user-select: none; }
.sortable:hover { color: #3b82f6; }
tr:hover td { background: rgba(59,130,246,0.05); }
.pagination { display: flex; justify-content: center; align-items: center; gap: 12px; margin-top: 12px; }
.pagination button { background: #334155; border: none; color: #e2e8f0; padding: 6px 12px; border-radius: 6px; cursor: pointer; }
.pagination button:disabled { opacity: 0.4; cursor: not-allowed; }
.pagination span { color: #94a3b8; font-size: 13px; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const columns = [{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }, { key: 'score', label: 'Score' }];
    const data = [
      { name: 'Alice', role: 'Dev', score: 92 }, { name: 'Bob', role: 'Design', score: 85 },
      { name: 'Carol', role: 'Dev', score: 97 }, { name: 'Dave', role: 'PM', score: 78 },
      { name: 'Eve', role: 'Design', score: 88 },
    ];
    const search = ref('');
    const sortKey = ref('name');
    const sortAsc = ref(true);
    const page = ref(1);
    const perPage = 3;

    const filtered = computed(() => {
      let rows = data.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(search.value.toLowerCase())));
      rows.sort((a, b) => { const m = sortAsc.value ? 1 : -1; return a[sortKey.value] > b[sortKey.value] ? m : -m; });
      return rows;
    });

    const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)));
    const paginated = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage));

    const sortBy = (key) => { if (sortKey.value === key) sortAsc.value = !sortAsc.value; else { sortKey.value = key; sortAsc.value = true; } page.value = 1; };

    return { columns, search, sortKey, sortAsc, page, filtered, totalPages, paginated, sortBy };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-tabs',
    title: 'Tab Component',
    description:
      'Create a tab component with keep-alive for preserving inactive tab state. Use dynamic slots, provide/inject for tab registration, and Vue Router integration.',
    difficulty: 'intermediate',
    category: 'interactive',
    framework: 'vue',
    concepts: ['keep-alive', 'slots', 'provide/inject', 'Vue Router'],
    demoCode: {
      html: `<div id="app">
  <div class="tabs">
    <button v-for="(tab, i) in tabs" :key="i" :class="{ active: activeTab === i }" @click="activeTab = i">{{ tab.title }}</button>
  </div>
  <div class="tab-content">
    <div v-for="(tab, i) in tabs" :key="i" v-show="activeTab === i">
      <h4>{{ tab.title }}</h4>
      <p>{{ tab.content }}</p>
      <input v-model="tab.input" :placeholder="'Type in ' + tab.title + '...'" class="tab-input" />
    </div>
  </div>
</div>`,
      css: `.tabs { display: flex; gap: 2px; background: #1e293b; border-radius: 8px 8px 0 0; overflow: hidden; }
.tabs button { flex: 1; padding: 10px; border: none; background: #1e293b; color: #94a3b8; cursor: pointer; font-weight: 500; transition: all 0.2s; }
.tabs button.active { background: #334155; color: #3b82f6; border-bottom: 2px solid #3b82f6; }
.tabs button:hover:not(.active) { color: #e2e8f0; }
.tab-content { background: #334155; border-radius: 0 0 8px 8px; padding: 16px; }
.tab-content h4 { margin: 0 0 8px; color: #e2e8f0; }
.tab-content p { color: #94a3b8; font-size: 14px; margin: 0 0 12px; }
.tab-input { width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid #475569; background: #1e293b; color: #e2e8f0; outline: none; }`,
      js: `const { createApp, ref, reactive } = Vue;

createApp({
  setup() {
    const activeTab = ref(0);
    const tabs = reactive([
      { title: 'Profile', content: 'Edit your profile info here. State is kept alive when switching tabs.', input: '' },
      { title: 'Settings', content: 'Manage your app settings. Try typing then switching tabs.', input: '' },
      { title: 'About', content: 'Version 1.0.0. Built with Vue 3 Composition API.', input: '' },
    ]);
    return { activeTab, tabs };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-accordion',
    title: 'Accordion',
    description:
      'Build an accordion component with transition-group animations. Support single and multiple expansion modes using reactive state and computed properties.',
    difficulty: 'intermediate',
    category: 'interactive',
    framework: 'vue',
    concepts: ['transition-group', 'reactive', 'slots', 'computed'],
    demoCode: {
      html: `<div id="app">
  <div class="accordion">
    <div v-for="(item, i) in items" :key="i" class="acc-item">
      <button class="acc-header" @click="toggle(i)" :class="{ open: openItems.includes(i) }">
        <span>{{ item.title }}</span>
        <span class="icon">{{ openItems.includes(i) ? '−' : '+' }}</span>
      </button>
      <div v-if="openItems.includes(i)" class="acc-body">
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>
  <label class="multi-toggle">
    <input type="checkbox" v-model="allowMultiple" /> Allow multiple open
  </label>
</div>`,
      css: `.accordion { display: flex; flex-direction: column; gap: 4px; }
.acc-item { border-radius: 8px; overflow: hidden; }
.acc-header { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 12px 14px; border: none; background: #1e293b; color: #e2e8f0; cursor: pointer; font-size: 14px; font-weight: 500; }
.acc-header.open { background: #334155; color: #3b82f6; }
.icon { font-size: 18px; }
.acc-body { padding: 12px 14px; background: #334155; }
.acc-body p { margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.5; }
.multi-toggle { display: flex; align-items: center; gap: 8px; margin-top: 14px; color: #94a3b8; font-size: 13px; cursor: pointer; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const items = [
      { title: 'What is Vue 3?', content: 'Vue 3 is a progressive JavaScript framework featuring the Composition API, improved performance via proxy-based reactivity, and Teleport/Suspense components.' },
      { title: 'What is the Composition API?', content: 'The Composition API lets you organize logic by feature using setup(), ref(), reactive(), and composables instead of the Options API.' },
      { title: 'What is Pinia?', content: 'Pinia is the official state management library for Vue, replacing Vuex with a simpler API, TypeScript support, and devtools integration.' },
    ];
    const openItems = ref([0]);
    const allowMultiple = ref(false);

    const toggle = (i) => {
      const idx = openItems.value.indexOf(i);
      if (idx >= 0) { openItems.value.splice(idx, 1); }
      else if (allowMultiple.value) { openItems.value.push(i); }
      else { openItems.value = [i]; }
    };

    return { items, openItems, allowMultiple, toggle };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-stepper',
    title: 'Multi-Step Wizard',
    description:
      'Create a multi-step wizard with slot-based step content. Manage step navigation, validation, and progress tracking with Pinia or reactive state.',
    difficulty: 'intermediate',
    category: 'interactive',
    framework: 'vue',
    concepts: ['slots', 'Pinia', 'computed', 'transition'],
    demoCode: {
      html: `<div id="app">
  <div class="stepper-bar">
    <div v-for="(s, i) in steps" :key="i" class="step-indicator" :class="{ active: i === current, done: i < current }">
      <div class="dot">{{ i < current ? '&#10003;' : i + 1 }}</div>
      <span>{{ s.title }}</span>
    </div>
  </div>
  <div class="step-content">
    <div v-if="current === 0" class="field"><label>Full Name</label><input v-model="form.name" placeholder="John Doe" /></div>
    <div v-if="current === 1" class="field"><label>Email</label><input v-model="form.email" placeholder="john@example.com" /></div>
    <div v-if="current === 2" class="summary">
      <p><strong>Name:</strong> {{ form.name }}</p>
      <p><strong>Email:</strong> {{ form.email }}</p>
      <div v-if="done" class="success">Registration complete!</div>
    </div>
  </div>
  <div class="nav-btns">
    <button v-if="current > 0 && !done" @click="current--" class="btn-back">Back</button>
    <button v-if="current < steps.length - 1" @click="current++" :disabled="!canNext" class="btn-next">Next</button>
    <button v-if="current === steps.length - 1 && !done" @click="done = true" class="btn-next">Submit</button>
  </div>
</div>`,
      css: `.stepper-bar { display: flex; justify-content: space-between; margin-bottom: 20px; }
.step-indicator { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
.dot { width: 32px; height: 32px; border-radius: 50%; background: #334155; color: #94a3b8; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; }
.step-indicator.active .dot { background: #3b82f6; color: white; }
.step-indicator.done .dot { background: #22c55e; color: white; }
.step-indicator span { font-size: 12px; color: #94a3b8; }
.step-indicator.active span { color: #3b82f6; }
.step-content { background: #1e293b; border-radius: 8px; padding: 16px; margin-bottom: 12px; }
.field label { display: block; color: #94a3b8; font-size: 13px; margin-bottom: 4px; }
.field input { width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155; background: #0f172a; color: #e2e8f0; outline: none; }
.summary p { color: #e2e8f0; margin: 6px 0; font-size: 14px; }
.success { color: #22c55e; padding: 10px; border-radius: 8px; background: rgba(34,197,94,0.1); margin-top: 10px; }
.nav-btns { display: flex; gap: 8px; justify-content: flex-end; }
.btn-back { padding: 10px 20px; border-radius: 8px; border: 1px solid #475569; background: transparent; color: #94a3b8; cursor: pointer; }
.btn-next { padding: 10px 20px; border-radius: 8px; border: none; background: #3b82f6; color: white; cursor: pointer; font-weight: 600; }
.btn-next:disabled { opacity: 0.5; cursor: not-allowed; }`,
      js: `const { createApp, ref, reactive, computed } = Vue;

createApp({
  setup() {
    const steps = [{ title: 'Name' }, { title: 'Email' }, { title: 'Confirm' }];
    const current = ref(0);
    const form = reactive({ name: '', email: '' });
    const done = ref(false);

    const canNext = computed(() => {
      if (current.value === 0) return form.name.trim().length > 0;
      if (current.value === 1) return form.email.includes('@');
      return true;
    });

    return { steps, current, form, done, canNext };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-carousel',
    title: 'Carousel',
    description:
      'Build a touch-enabled carousel using the Composition API. Implement swipe gestures with VueUse, auto-play, and transition effects between slides.',
    difficulty: 'intermediate',
    category: 'interactive',
    framework: 'vue',
    concepts: ['Composition API', 'VueUse', 'transition', 'reactive'],
    demoCode: {
      html: `<div id="app">
  <div class="carousel">
    <div class="slide" :style="{ background: slides[current].color }">
      <h3>{{ slides[current].title }}</h3>
      <p>{{ slides[current].text }}</p>
    </div>
    <button class="nav prev" @click="prev">&lt;</button>
    <button class="nav next" @click="next">&gt;</button>
    <div class="dots">
      <span v-for="(s, i) in slides" :key="i" :class="{ active: i === current }" @click="current = i"></span>
    </div>
  </div>
  <label class="auto-label"><input type="checkbox" v-model="autoplay" /> Autoplay</label>
</div>`,
      css: `.carousel { position: relative; border-radius: 12px; overflow: hidden; }
.slide { padding: 40px 24px; text-align: center; min-height: 180px; display: flex; flex-direction: column; justify-content: center; transition: background 0.4s; }
.slide h3 { margin: 0 0 8px; color: white; font-size: 20px; }
.slide p { margin: 0; color: rgba(255,255,255,0.8); font-size: 14px; }
.nav { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.3); border: none; color: white; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 16px; }
.prev { left: 8px; }
.next { right: 8px; }
.dots { display: flex; justify-content: center; gap: 6px; padding: 12px 0; }
.dots span { width: 10px; height: 10px; border-radius: 50%; background: #475569; cursor: pointer; }
.dots span.active { background: #3b82f6; }
.auto-label { display: flex; align-items: center; gap: 6px; color: #94a3b8; font-size: 13px; margin-top: 8px; cursor: pointer; }`,
      js: `const { createApp, ref, watch, onUnmounted } = Vue;

createApp({
  setup() {
    const slides = [
      { title: 'Slide One', text: 'Welcome to the Vue 3 carousel', color: '#3b82f6' },
      { title: 'Slide Two', text: 'Supports keyboard and swipe navigation', color: '#8b5cf6' },
      { title: 'Slide Three', text: 'Built with Composition API', color: '#22c55e' },
      { title: 'Slide Four', text: 'Auto-play with reactive toggle', color: '#ef4444' },
    ];
    const current = ref(0);
    const autoplay = ref(false);
    let timer = null;

    const next = () => { current.value = (current.value + 1) % slides.length; };
    const prev = () => { current.value = (current.value - 1 + slides.length) % slides.length; };

    watch(autoplay, (val) => {
      if (timer) clearInterval(timer);
      if (val) timer = setInterval(next, 2000);
    });

    onUnmounted(() => { if (timer) clearInterval(timer); });

    return { slides, current, autoplay, next, prev };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-virtual-list',
    title: 'Virtual Scrolling',
    description:
      'Implement virtual scrolling for large lists to optimize performance. Calculate visible items, handle scroll events, and manage DOM recycling with reactive refs.',
    difficulty: 'advanced',
    category: 'interactive',
    framework: 'vue',
    concepts: ['refs', 'computed', 'watch', 'Composition API'],
    demoCode: {
      html: `<div id="app">
  <div class="virtual-list" ref="containerRef" @scroll="onScroll">
    <div :style="{ height: totalHeight + 'px', position: 'relative' }">
      <div v-for="item in visibleItems" :key="item.index"
        class="list-item" :style="{ position: 'absolute', top: item.top + 'px', width: '100%' }">
        <span class="idx">#{{ item.index }}</span>
        <span>{{ item.text }}</span>
      </div>
    </div>
  </div>
  <div class="info">Showing {{ visibleItems.length }} of {{ items.length }} items</div>
</div>`,
      css: `.virtual-list { height: 260px; overflow-y: auto; border-radius: 8px; background: #1e293b; }
.list-item { display: flex; align-items: center; gap: 10px; padding: 0 14px; height: 44px; border-bottom: 1px solid #0f172a; color: #e2e8f0; font-size: 14px; box-sizing: border-box; }
.idx { color: #3b82f6; font-family: monospace; min-width: 40px; font-size: 12px; }
.info { text-align: center; color: #94a3b8; font-size: 13px; margin-top: 8px; }`,
      js: `const { createApp, ref, computed, onMounted } = Vue;

createApp({
  setup() {
    const itemHeight = 44;
    const containerRef = ref(null);
    const scrollTop = ref(0);
    const viewHeight = ref(260);

    const items = Array.from({ length: 10000 }, (_, i) => ({
      index: i, text: 'Item row ' + i + ' — virtual scrolling demo'
    }));

    const totalHeight = computed(() => items.length * itemHeight);

    const visibleItems = computed(() => {
      const start = Math.floor(scrollTop.value / itemHeight);
      const count = Math.ceil(viewHeight.value / itemHeight) + 2;
      return items.slice(start, start + count).map(item => ({
        ...item, top: item.index * itemHeight
      }));
    });

    const onScroll = (e) => { scrollTop.value = e.target.scrollTop; };

    return { containerRef, items, totalHeight, visibleItems, onScroll };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-context-menu',
    title: 'Context Menu',
    description:
      'Create a right-click context menu using Teleport for positioning. Handle menu positioning, keyboard navigation, and click-outside detection with composables.',
    difficulty: 'intermediate',
    category: 'interactive',
    framework: 'vue',
    concepts: ['Teleport', 'custom directives', 'composables', 'VueUse'],
    demoCode: {
      html: `<div id="app">
  <p class="hint">Right-click anywhere in the box below</p>
  <div class="area" @contextmenu.prevent="showMenu">
    <span v-if="lastAction" class="action-text">Last action: {{ lastAction }}</span>
    <span v-else class="action-text">Right-click here</span>
  </div>
  <div v-if="menuVisible" class="context-menu" :style="{ top: menuY + 'px', left: menuX + 'px' }">
    <div class="menu-item" v-for="item in menuItems" :key="item.label" @click="doAction(item.label)">
      <span class="menu-icon">{{ item.icon }}</span> {{ item.label }}
    </div>
  </div>
</div>`,
      css: `.hint { color: #94a3b8; font-size: 13px; margin-bottom: 8px; }
.area { background: #1e293b; border-radius: 12px; height: 180px; display: flex; align-items: center; justify-content: center; border: 1px dashed #334155; user-select: none; }
.action-text { color: #94a3b8; font-size: 14px; }
.context-menu { position: fixed; background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 4px 0; min-width: 160px; z-index: 100; box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
.menu-item { display: flex; align-items: center; gap: 8px; padding: 8px 14px; color: #e2e8f0; font-size: 14px; cursor: pointer; }
.menu-item:hover { background: #334155; }
.menu-icon { font-size: 14px; }`,
      js: `const { createApp, ref, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const menuVisible = ref(false);
    const menuX = ref(0);
    const menuY = ref(0);
    const lastAction = ref('');
    const menuItems = [
      { icon: '&#9998;', label: 'Edit' },
      { icon: '&#128203;', label: 'Copy' },
      { icon: '&#128465;', label: 'Delete' },
      { icon: '&#8505;', label: 'Info' },
    ];

    const showMenu = (e) => {
      menuX.value = e.clientX;
      menuY.value = e.clientY;
      menuVisible.value = true;
    };

    const doAction = (label) => { lastAction.value = label; menuVisible.value = false; };
    const closeMenu = () => { menuVisible.value = false; };

    onMounted(() => document.addEventListener('click', closeMenu));
    onUnmounted(() => document.removeEventListener('click', closeMenu));

    return { menuVisible, menuX, menuY, lastAction, menuItems, showMenu, doAction };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-toast',
    title: 'Toast Notifications',
    description:
      'Build a toast notification system using provide/inject pattern. Create a composable for triggering toasts and manage queue with Pinia and transition-group.',
    difficulty: 'intermediate',
    category: 'interactive',
    framework: 'vue',
    concepts: ['provide/inject', 'Pinia', 'transition-group', 'composables'],
    demoCode: {
      html: `<div id="app">
  <div class="btn-row">
    <button @click="addToast('success')">Success</button>
    <button @click="addToast('error')">Error</button>
    <button @click="addToast('info')">Info</button>
  </div>
  <div class="toast-container">
    <div v-for="t in toasts" :key="t.id" class="toast" :class="t.type">
      <span>{{ t.message }}</span>
      <button class="toast-close" @click="removeToast(t.id)">&times;</button>
    </div>
  </div>
</div>`,
      css: `.btn-row { display: flex; gap: 8px; margin-bottom: 16px; }
.btn-row button { padding: 10px 16px; border-radius: 8px; border: none; color: white; cursor: pointer; font-weight: 600; }
.btn-row button:nth-child(1) { background: #22c55e; }
.btn-row button:nth-child(2) { background: #ef4444; }
.btn-row button:nth-child(3) { background: #3b82f6; }
.toast-container { position: fixed; top: 16px; right: 16px; display: flex; flex-direction: column; gap: 8px; z-index: 100; }
.toast { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 16px; border-radius: 8px; min-width: 240px; color: white; font-size: 14px; animation: slideIn 0.3s ease; }
.toast.success { background: #166534; border-left: 4px solid #22c55e; }
.toast.error { background: #7f1d1d; border-left: 4px solid #ef4444; }
.toast.info { background: #1e3a5f; border-left: 4px solid #3b82f6; }
.toast-close { background: none; border: none; color: rgba(255,255,255,0.6); font-size: 18px; cursor: pointer; }
@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const toasts = ref([]);
    let nextId = 0;

    const messages = {
      success: 'Operation completed successfully!',
      error: 'Something went wrong. Please try again.',
      info: 'Here is some useful information.',
    };

    const addToast = (type) => {
      const id = nextId++;
      toasts.value.push({ id, type, message: messages[type] });
      setTimeout(() => removeToast(id), 3000);
    };

    const removeToast = (id) => {
      toasts.value = toasts.value.filter(t => t.id !== id);
    };

    return { toasts, addToast, removeToast };
  }
}).mount('#app');`,
    },
  },

  // Data Display
  {
    id: 'vue-charts',
    title: 'Data Visualization',
    description:
      'Integrate Chart.js or ECharts with Vue for data visualization. Create reactive chart components that update when props change, using watch and lifecycle hooks.',
    difficulty: 'intermediate',
    category: 'data-display',
    framework: 'vue',
    concepts: ['watch', 'reactive', 'lifecycle hooks', 'refs'],
    demoCode: {
      html: `<div id="app">
  <h3 style="color:#e2e8f0;margin-bottom:12px;">Sales Data</h3>
  <div class="chart-area">
    <div class="bars">
      <div v-for="(item, i) in data" :key="i" class="bar-col">
        <div class="bar" :style="{ height: (item.value / maxVal * 140) + 'px', background: item.color }">
          <span class="val">{{ item.value }}</span>
        </div>
        <span class="label">{{ item.label }}</span>
      </div>
    </div>
  </div>
  <div class="btn-row">
    <button @click="randomize">Randomize</button>
  </div>
</div>`,
      css: `.chart-area { background: #1e293b; border-radius: 12px; padding: 20px; }
.bars { display: flex; justify-content: space-around; align-items: flex-end; height: 160px; }
.bar-col { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.bar { width: 36px; border-radius: 6px 6px 0 0; display: flex; align-items: flex-start; justify-content: center; transition: height 0.5s ease; min-height: 8px; }
.val { color: white; font-size: 11px; font-weight: 600; margin-top: 4px; }
.label { color: #94a3b8; font-size: 12px; }
.btn-row { margin-top: 12px; text-align: center; }
.btn-row button { padding: 8px 20px; border-radius: 8px; border: none; background: #3b82f6; color: white; cursor: pointer; font-weight: 600; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const colors = ['#3b82f6','#22c55e','#f59e0b','#ef4444','#8b5cf6'];
    const labels = ['Jan','Feb','Mar','Apr','May'];
    const data = ref(labels.map((l, i) => ({ label: l, value: Math.floor(Math.random() * 80) + 20, color: colors[i] })));

    const maxVal = computed(() => Math.max(...data.value.map(d => d.value)));

    const randomize = () => {
      data.value = data.value.map(d => ({ ...d, value: Math.floor(Math.random() * 80) + 20 }));
    };

    return { data, maxVal, randomize };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-search-filter',
    title: 'Search and Filter',
    description:
      'Implement real-time search and filtering using computed properties. Create composable filter logic with debouncing and support for multiple filter criteria.',
    difficulty: 'intermediate',
    category: 'data-display',
    framework: 'vue',
    concepts: ['computed', 'watch', 'composables', 'VueUse'],
  },
  {
    id: 'vue-infinite-scroll',
    title: 'Infinite Scroll',
    description:
      'Build infinite scroll using Intersection Observer composable from VueUse. Manage loading states, pagination, and data fetching with reactive refs and async operations.',
    difficulty: 'intermediate',
    category: 'data-display',
    framework: 'vue',
    concepts: ['VueUse', 'composables', 'reactive', 'async/await'],
  },
  {
    id: 'vue-gallery',
    title: 'Image Gallery',
    description:
      'Create an image gallery with lightbox using transition components. Implement thumbnail grid, full-size viewer, and keyboard navigation with reactive state.',
    difficulty: 'intermediate',
    category: 'data-display',
    framework: 'vue',
    concepts: ['transition', 'Teleport', 'reactive', 'slots'],
  },
  {
    id: 'vue-card-grid',
    title: 'Responsive Card Grid',
    description:
      'Build a responsive card grid layout using CSS Grid and Vue components. Implement card slots for flexible content and reactive filtering/sorting.',
    difficulty: 'beginner',
    category: 'data-display',
    framework: 'vue',
    concepts: ['slots', 'computed', 'reactive', 'scoped slots'],
  },
  {
    id: 'vue-sortable-table',
    title: 'Sortable Table',
    description:
      'Create a table with sortable and filterable columns. Use computed properties for data transformation and slots for custom column rendering.',
    difficulty: 'intermediate',
    category: 'data-display',
    framework: 'vue',
    concepts: ['computed', 'slots', 'reactive', 'v-model'],
  },
  {
    id: 'vue-dashboard',
    title: 'Draggable Dashboard',
    description:
      'Build a dashboard with draggable and resizable panels using Pinia for state management. Persist layout to localStorage and support responsive breakpoints.',
    difficulty: 'advanced',
    category: 'data-display',
    framework: 'vue',
    concepts: ['Pinia', 'custom directives', 'reactive', 'localStorage'],
  },

  // Navigation
  {
    id: 'vue-sidebar',
    title: 'Collapsible Sidebar',
    description:
      'Create a collapsible sidebar with Vue Router integration. Use router-link active classes, transition effects, and Pinia for managing collapse state.',
    difficulty: 'intermediate',
    category: 'navigation',
    framework: 'vue',
    concepts: ['Vue Router', 'Pinia', 'transition', 'router-link'],
  },
  {
    id: 'vue-navbar',
    title: 'Responsive Navbar',
    description:
      'Build a responsive navbar with mobile drawer that transitions smoothly. Use Teleport for mobile menu, Vue Router for navigation, and reactive breakpoint detection.',
    difficulty: 'intermediate',
    category: 'navigation',
    framework: 'vue',
    concepts: ['Vue Router', 'Teleport', 'transition', 'VueUse'],
  },
  {
    id: 'vue-breadcrumbs',
    title: 'Auto Breadcrumbs',
    description:
      'Generate breadcrumbs automatically from Vue Router meta fields. Create a composable that watches route changes and builds breadcrumb trail dynamically.',
    difficulty: 'beginner',
    category: 'navigation',
    framework: 'vue',
    concepts: ['Vue Router', 'watch', 'computed', 'composables'],
  },
  {
    id: 'vue-bottom-nav',
    title: 'Bottom Navigation',
    description:
      'Create mobile bottom navigation with active route matching. Use Vue Router for navigation state and transition effects between views.',
    difficulty: 'beginner',
    category: 'navigation',
    framework: 'vue',
    concepts: ['Vue Router', 'computed', 'router-link', 'transition'],
  },
  {
    id: 'vue-mega-menu',
    title: 'Mega Menu',
    description:
      'Build a multi-level mega menu with hover and click toggle modes. Use Teleport for dropdowns, transition components, and reactive state for menu visibility.',
    difficulty: 'advanced',
    category: 'navigation',
    framework: 'vue',
    concepts: ['Teleport', 'transition', 'reactive', 'custom directives'],
  },
  {
    id: 'vue-pagination',
    title: 'Router Pagination',
    description:
      'Implement pagination that syncs with Vue Router query params. Create a composable for managing page state and updating URL without full page reload.',
    difficulty: 'intermediate',
    category: 'navigation',
    framework: 'vue',
    concepts: ['Vue Router', 'composables', 'watch', 'computed'],
  },

  // Advanced Features
  {
    id: 'vue-keyboard-shortcuts',
    title: 'Keyboard Shortcuts',
    description:
      'Create a global keyboard shortcuts system using a composable. Handle key combinations, context-specific shortcuts, and provide visual shortcut hints.',
    difficulty: 'advanced',
    category: 'advanced',
    framework: 'vue',
    concepts: ['composables', 'VueUse', 'provide/inject', 'lifecycle hooks'],
  },
  {
    id: 'vue-settings',
    title: 'Settings Panel',
    description:
      'Build a settings panel with Pinia store and localStorage persistence plugin. Support theme switching, user preferences, and reactive form bindings.',
    difficulty: 'intermediate',
    category: 'advanced',
    framework: 'vue',
    concepts: ['Pinia', 'plugins', 'localStorage', 'v-model'],
  },
  {
    id: 'vue-notifications',
    title: 'Notification Center',
    description:
      'Create a notification center using Pinia for state and transition-group for animations. Support different notification types, actions, and auto-dismiss timers.',
    difficulty: 'intermediate',
    category: 'advanced',
    framework: 'vue',
    concepts: ['Pinia', 'transition-group', 'composables', 'Teleport'],
  },
  {
    id: 'vue-favorites',
    title: 'Favorites System',
    description:
      'Implement a favorites system with Pinia and localStorage plugin. Support adding/removing favorites, persistence across sessions, and reactive UI updates.',
    difficulty: 'intermediate',
    category: 'advanced',
    framework: 'vue',
    concepts: ['Pinia', 'plugins', 'localStorage', 'reactive'],
  },
  {
    id: 'vue-undo-redo',
    title: 'Undo/Redo System',
    description:
      'Build an undo/redo system using Pinia with custom history plugin. Track state changes, support keyboard shortcuts, and handle complex state mutations.',
    difficulty: 'advanced',
    category: 'advanced',
    framework: 'vue',
    concepts: ['Pinia', 'plugins', 'composables', 'reactive'],
  },

  // UI Components
  {
    id: 'vue-loading-states',
    title: 'Loading Skeletons',
    description:
      'Create loading skeleton components using Suspense and transition. Build reusable skeleton shapes and implement smooth transitions between loading and loaded states.',
    difficulty: 'beginner',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['Suspense', 'transition', 'slots', 'async components'],
  },
  {
    id: 'vue-empty-states',
    title: 'Empty States',
    description:
      'Design empty state components with default slots for custom content. Support different empty state types (no data, no search results, errors) with transitions.',
    difficulty: 'beginner',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['slots', 'transition', 'computed', 'props'],
  },
  {
    id: 'vue-image-viewer',
    title: 'Image Zoom Viewer',
    description:
      'Build an image viewer with zoom and pan using custom directives. Implement touch gestures, keyboard controls, and smooth CSS transforms with reactive state.',
    difficulty: 'intermediate',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['custom directives', 'reactive', 'VueUse', 'Teleport'],
  },
  {
    id: 'vue-toggle',
    title: 'Toggle Switch',
    description:
      'Create an accessible toggle switch component with v-model support. Implement smooth transitions, keyboard accessibility, and customizable styling via props.',
    difficulty: 'beginner',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['v-model', 'transition', 'props', 'accessibility'],
  },
];
