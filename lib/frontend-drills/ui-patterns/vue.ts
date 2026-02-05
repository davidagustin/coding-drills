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
    demoCode: {
      html: `<div id="app">
  <div class="search-bar">
    <input v-model="query" placeholder="Search items..." />
    <select v-model="category">
      <option value="">All Categories</option>
      <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
    </select>
  </div>
  <div class="results-info">{{ filtered.length }} results found</div>
  <div class="item-list">
    <div v-for="item in filtered" :key="item.id" class="item-card">
      <span class="item-name">{{ item.name }}</span>
      <span class="item-cat">{{ item.category }}</span>
    </div>
    <div v-if="!filtered.length" class="empty">No items match your search.</div>
  </div>
</div>`,
      css: `.search-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.search-bar input {
  flex: 1;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
}

.search-bar input:focus {
  border-color: #3b82f6;
}

.search-bar select {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
}

.results-info {
  color: #94a3b8;
  font-size: 13px;
  margin-bottom: 8px;
}

.item-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  background: #1e293b;
  border-radius: 8px;
}

.item-name {
  color: #e2e8f0;
  font-size: 14px;
}

.item-cat {
  color: #3b82f6;
  font-size: 12px;
  background: rgba(59,130,246,0.1);
  padding: 2px 8px;
  border-radius: 4px;
}

.empty {
  text-align: center;
  color: #64748b;
  padding: 24px;
}`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const query = ref('');
    const category = ref('');
    const items = [
      { id: 1, name: 'Vue.js Guide', category: 'Docs' },
      { id: 2, name: 'Pinia Store', category: 'State' },
      { id: 3, name: 'Vue Router', category: 'Navigation' },
      { id: 4, name: 'Composition API', category: 'Docs' },
      { id: 5, name: 'Vuex Legacy', category: 'State' },
      { id: 6, name: 'Teleport Component', category: 'UI' },
      { id: 7, name: 'Transition Group', category: 'UI' },
      { id: 8, name: 'Route Guards', category: 'Navigation' },
    ];

    const categories = [...new Set(items.map(i => i.category))];

    const filtered = computed(() => {
      return items.filter(item => {
        const matchQuery = item.name.toLowerCase().includes(query.value.toLowerCase());
        const matchCat = !category.value || item.category === category.value;
        return matchQuery && matchCat;
      });
    });

    return { query, category, categories, filtered };
  }
}).mount('#app');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <div class="feed" ref="feedRef" @scroll="onScroll">
    <div v-for="item in items" :key="item.id" class="feed-item">
      <div class="item-header">
        <span class="item-id">#{{ item.id }}</span>
        <span class="item-title">{{ item.title }}</span>
      </div>
      <p class="item-body">{{ item.body }}</p>
    </div>
    <div v-if="loading" class="loader">Loading more...</div>
    <div v-if="allLoaded" class="done">All items loaded!</div>
  </div>
  <div class="status">{{ items.length }} / {{ totalItems }} items loaded</div>
</div>`,
      css: `.feed {
  height: 300px;
  overflow-y: auto;
  border-radius: 8px;
  background: #1e293b;
}

.feed-item {
  padding: 14px;
  border-bottom: 1px solid #0f172a;
}

.item-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.item-id {
  color: #3b82f6;
  font-family: monospace;
  font-size: 12px;
}

.item-title {
  color: #e2e8f0;
  font-weight: 600;
  font-size: 14px;
}

.item-body {
  color: #94a3b8;
  font-size: 13px;
  margin: 0;
  line-height: 1.4;
}

.loader {
  text-align: center;
  padding: 16px;
  color: #3b82f6;
  font-size: 14px;
}

.done {
  text-align: center;
  padding: 16px;
  color: #22c55e;
  font-size: 14px;
}

.status {
  text-align: center;
  color: #94a3b8;
  font-size: 13px;
  margin-top: 8px;
}`,
      js: `const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    const items = ref([]);
    const loading = ref(false);
    const allLoaded = ref(false);
    const totalItems = 50;
    const feedRef = ref(null);

    const generateItems = (start, count) => {
      const titles = ['Vue Component', 'Reactive Data', 'Composable Hook', 'Pinia Action', 'Router Guard'];
      return Array.from({ length: count }, (_, i) => ({
        id: start + i + 1,
        title: titles[(start + i) % titles.length] + ' ' + (start + i + 1),
        body: 'This is item number ' + (start + i + 1) + '. Scroll down to load more items dynamically.',
      }));
    };

    const loadMore = () => {
      if (loading.value || allLoaded.value) return;
      loading.value = true;
      setTimeout(() => {
        const newItems = generateItems(items.value.length, 10);
        items.value.push(...newItems);
        loading.value = false;
        if (items.value.length >= totalItems) allLoaded.value = true;
      }, 600);
    };

    const onScroll = (e) => {
      const el = e.target;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
        loadMore();
      }
    };

    onMounted(() => loadMore());

    return { items, loading, allLoaded, totalItems, feedRef, onScroll };
  }
}).mount('#app');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <div class="gallery-grid">
    <div v-for="(img, i) in images" :key="i" class="thumb" @click="openViewer(i)">
      <div class="thumb-inner" :style="{ background: img.color }">
        <span>{{ img.label }}</span>
      </div>
    </div>
  </div>
  <div v-if="viewerOpen" class="lightbox" @click.self="closeViewer">
    <button class="lb-nav lb-prev" @click="prevImage">&lt;</button>
    <div class="lb-content">
      <div class="lb-image" :style="{ background: images[currentIndex].color }">
        <span>{{ images[currentIndex].label }}</span>
      </div>
      <div class="lb-caption">{{ images[currentIndex].label }} - {{ currentIndex + 1 }} / {{ images.length }}</div>
    </div>
    <button class="lb-nav lb-next" @click="nextImage">&gt;</button>
    <button class="lb-close" @click="closeViewer">&times;</button>
  </div>
</div>`,
      css: `.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.thumb {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1;
}

.thumb-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
  transition: transform 0.2s;
}

.thumb:hover .thumb-inner {
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

.lb-content {
  text-align: center;
}

.lb-image {
  width: 280px;
  height: 200px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: 700;
}

.lb-caption {
  color: #94a3b8;
  font-size: 14px;
  margin-top: 12px;
}

.lb-nav {
  background: rgba(255,255,255,0.1);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  margin: 0 16px;
}

.lb-nav:hover {
  background: rgba(255,255,255,0.2);
}

.lb-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
}`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const images = [
      { label: 'Sunset', color: '#f59e0b' },
      { label: 'Ocean', color: '#3b82f6' },
      { label: 'Forest', color: '#22c55e' },
      { label: 'Mountain', color: '#8b5cf6' },
      { label: 'Desert', color: '#ef4444' },
      { label: 'Aurora', color: '#06b6d4' },
    ];

    const viewerOpen = ref(false);
    const currentIndex = ref(0);

    const openViewer = (i) => { currentIndex.value = i; viewerOpen.value = true; };
    const closeViewer = () => { viewerOpen.value = false; };
    const nextImage = () => { currentIndex.value = (currentIndex.value + 1) % images.length; };
    const prevImage = () => { currentIndex.value = (currentIndex.value - 1 + images.length) % images.length; };

    return { images, viewerOpen, currentIndex, openViewer, closeViewer, nextImage, prevImage };
  }
}).mount('#app');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <div class="toolbar">
    <input v-model="search" placeholder="Filter cards..." />
    <select v-model="sortBy">
      <option value="name">Sort by Name</option>
      <option value="category">Sort by Category</option>
    </select>
  </div>
  <div class="card-grid">
    <div v-for="card in filtered" :key="card.id" class="card">
      <div class="card-icon" :style="{ background: card.color }">{{ card.icon }}</div>
      <h4>{{ card.name }}</h4>
      <p>{{ card.description }}</p>
      <span class="card-tag">{{ card.category }}</span>
    </div>
  </div>
  <div v-if="!filtered.length" class="empty">No cards match your filter.</div>
</div>`,
      css: `.toolbar {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.toolbar input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
}

.toolbar select {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.card {
  background: #1e293b;
  border-radius: 10px;
  padding: 14px;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-2px);
}

.card-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-bottom: 8px;
}

.card h4 {
  margin: 0 0 4px;
  color: #e2e8f0;
  font-size: 14px;
}

.card p {
  margin: 0 0 8px;
  color: #94a3b8;
  font-size: 12px;
  line-height: 1.4;
}

.card-tag {
  font-size: 11px;
  color: #3b82f6;
  background: rgba(59,130,246,0.1);
  padding: 2px 8px;
  border-radius: 4px;
}

.empty {
  text-align: center;
  color: #64748b;
  padding: 24px;
}`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const search = ref('');
    const sortBy = ref('name');
    const cards = [
      { id: 1, name: 'Dashboard', icon: '📊', color: '#3b82f6', category: 'Analytics', description: 'View your project metrics' },
      { id: 2, name: 'Settings', icon: '⚙', color: '#8b5cf6', category: 'Config', description: 'Manage app preferences' },
      { id: 3, name: 'Messages', icon: '💬', color: '#22c55e', category: 'Social', description: 'Chat with your team' },
      { id: 4, name: 'Profile', icon: '👤', color: '#f59e0b', category: 'Config', description: 'Edit your profile info' },
      { id: 5, name: 'Reports', icon: '📄', color: '#ef4444', category: 'Analytics', description: 'Generate detailed reports' },
      { id: 6, name: 'Friends', icon: '👥', color: '#06b6d4', category: 'Social', description: 'Manage your connections' },
    ];

    const filtered = computed(() => {
      let result = cards.filter(c =>
        c.name.toLowerCase().includes(search.value.toLowerCase()) ||
        c.category.toLowerCase().includes(search.value.toLowerCase())
      );
      result.sort((a, b) => a[sortBy.value].localeCompare(b[sortBy.value]));
      return result;
    });

    return { search, sortBy, filtered };
  }
}).mount('#app');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <input v-model="filter" placeholder="Filter table..." class="filter-input" />
  <table>
    <thead>
      <tr>
        <th v-for="col in columns" :key="col.key" @click="sort(col.key)" class="sortable">
          {{ col.label }}
          <span v-if="sortKey === col.key">{{ sortAsc ? '▲' : '▼' }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in sortedData" :key="row.id">
        <td>{{ row.product }}</td>
        <td>{{ row.category }}</td>
        <td :class="{ highlight: row.price > 80 }">\${{ row.price }}</td>
        <td><span class="stock" :class="row.stock > 50 ? 'in' : 'low'">{{ row.stock }}</span></td>
      </tr>
      <tr v-if="!sortedData.length"><td colspan="4" class="empty">No results</td></tr>
    </tbody>
  </table>
</div>`,
      css: `.filter-input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
  margin-bottom: 10px;
}

.filter-input:focus {
  border-color: #3b82f6;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 10px 12px;
  border-bottom: 1px solid #1e293b;
  color: #e2e8f0;
  font-size: 14px;
}

th {
  background: #1e293b;
  color: #94a3b8;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
}

.sortable {
  cursor: pointer;
  user-select: none;
}

.sortable:hover {
  color: #3b82f6;
}

.highlight {
  color: #f59e0b;
  font-weight: 600;
}

.stock {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.stock.in {
  background: rgba(34,197,94,0.15);
  color: #22c55e;
}

.stock.low {
  background: rgba(239,68,68,0.15);
  color: #ef4444;
}

.empty {
  text-align: center;
  color: #64748b;
}`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const columns = [
      { key: 'product', label: 'Product' },
      { key: 'category', label: 'Category' },
      { key: 'price', label: 'Price' },
      { key: 'stock', label: 'Stock' },
    ];

    const data = [
      { id: 1, product: 'Keyboard', category: 'Electronics', price: 75, stock: 120 },
      { id: 2, product: 'Mouse', category: 'Electronics', price: 45, stock: 30 },
      { id: 3, product: 'Monitor', category: 'Electronics', price: 299, stock: 15 },
      { id: 4, product: 'Desk Chair', category: 'Furniture', price: 189, stock: 65 },
      { id: 5, product: 'Notebook', category: 'Stationery', price: 12, stock: 200 },
      { id: 6, product: 'Lamp', category: 'Furniture', price: 55, stock: 42 },
    ];

    const filter = ref('');
    const sortKey = ref('product');
    const sortAsc = ref(true);

    const sortedData = computed(() => {
      let rows = data.filter(r =>
        Object.values(r).some(v => String(v).toLowerCase().includes(filter.value.toLowerCase()))
      );
      rows.sort((a, b) => {
        const m = sortAsc.value ? 1 : -1;
        return a[sortKey.value] > b[sortKey.value] ? m : -m;
      });
      return rows;
    });

    const sort = (key) => {
      if (sortKey.value === key) sortAsc.value = !sortAsc.value;
      else { sortKey.value = key; sortAsc.value = true; }
    };

    return { columns, filter, sortKey, sortAsc, sortedData, sort };
  }
}).mount('#app');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <div class="dashboard">
    <div v-for="(panel, i) in panels" :key="panel.id" class="panel"
      :style="{ gridColumn: panel.span, background: panel.color }">
      <div class="panel-header">
        <span>{{ panel.title }}</span>
        <div class="panel-actions">
          <button @click="toggleSize(i)" class="action-btn">{{ panel.span === 'span 2' ? '▣' : '□' }}</button>
          <button @click="removePanel(i)" class="action-btn">×</button>
        </div>
      </div>
      <div class="panel-value">{{ panel.value }}</div>
      <div class="panel-label">{{ panel.label }}</div>
    </div>
  </div>
  <button class="add-btn" @click="addPanel">+ Add Widget</button>
</div>`,
      css: `.dashboard {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 12px;
}

.panel {
  border-radius: 10px;
  padding: 16px;
  min-height: 100px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.panel-header span {
  color: rgba(255,255,255,0.8);
  font-size: 13px;
  font-weight: 600;
}

.panel-actions {
  display: flex;
  gap: 4px;
}

.action-btn {
  background: rgba(255,255,255,0.15);
  border: none;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.panel-value {
  color: white;
  font-size: 28px;
  font-weight: 700;
}

.panel-label {
  color: rgba(255,255,255,0.6);
  font-size: 12px;
  margin-top: 4px;
}

.add-btn {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 2px dashed #334155;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  font-size: 14px;
}

.add-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    let nextId = 5;
    const panels = ref([
      { id: 1, title: 'Revenue', value: '$12,450', label: 'This month', color: '#3b82f6', span: 'span 1' },
      { id: 2, title: 'Users', value: '1,284', label: 'Active today', color: '#8b5cf6', span: 'span 1' },
      { id: 3, title: 'Conversion', value: '3.2%', label: 'Last 7 days', color: '#22c55e', span: 'span 2' },
      { id: 4, title: 'Orders', value: '384', label: 'This week', color: '#f59e0b', span: 'span 1' },
    ]);

    const toggleSize = (i) => {
      panels.value[i].span = panels.value[i].span === 'span 2' ? 'span 1' : 'span 2';
    };

    const removePanel = (i) => { panels.value.splice(i, 1); };

    const addPanel = () => {
      const colors = ['#3b82f6','#8b5cf6','#22c55e','#ef4444','#f59e0b','#06b6d4'];
      panels.value.push({
        id: nextId++,
        title: 'Widget ' + nextId,
        value: Math.floor(Math.random() * 1000),
        label: 'New metric',
        color: colors[Math.floor(Math.random() * colors.length)],
        span: 'span 1',
      });
    };

    return { panels, toggleSize, removePanel, addPanel };
  }
}).mount('#app');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <div class="layout">
    <div class="sidebar" :class="{ collapsed: !expanded }">
      <div class="sidebar-header">
        <span v-if="expanded" class="logo">MyApp</span>
        <button class="toggle-btn" @click="expanded = !expanded">{{ expanded ? '«' : '»' }}</button>
      </div>
      <nav class="nav-items">
        <div v-for="item in navItems" :key="item.id"
          class="nav-item" :class="{ active: activeItem === item.id }"
          @click="activeItem = item.id">
          <span class="nav-icon">{{ item.icon }}</span>
          <span v-if="expanded" class="nav-label">{{ item.label }}</span>
        </div>
      </nav>
    </div>
    <div class="main">
      <h3>{{ currentItem.label }}</h3>
      <p>Content area for {{ currentItem.label }} section.</p>
    </div>
  </div>
</div>`,
      css: `.layout {
  display: flex;
  height: 320px;
  border-radius: 12px;
  overflow: hidden;
  background: #0f172a;
}

.sidebar {
  width: 180px;
  background: #1e293b;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
}

.sidebar.collapsed {
  width: 56px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 12px;
  border-bottom: 1px solid #334155;
}

.logo {
  color: #3b82f6;
  font-weight: 700;
  font-size: 16px;
}

.toggle-btn {
  background: #334155;
  border: none;
  color: #e2e8f0;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.nav-items {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.nav-item:hover {
  background: #334155;
  color: #e2e8f0;
}

.nav-item.active {
  background: rgba(59,130,246,0.15);
  color: #3b82f6;
}

.nav-icon {
  font-size: 16px;
  min-width: 20px;
  text-align: center;
}

.nav-label {
  font-size: 14px;
}

.main {
  flex: 1;
  padding: 20px;
}

.main h3 {
  color: #e2e8f0;
  margin: 0 0 8px;
}

.main p {
  color: #94a3b8;
  font-size: 14px;
}`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const expanded = ref(true);
    const activeItem = ref('home');

    const navItems = [
      { id: 'home', label: 'Home', icon: '🏠' },
      { id: 'analytics', label: 'Analytics', icon: '📊' },
      { id: 'messages', label: 'Messages', icon: '💬' },
      { id: 'settings', label: 'Settings', icon: '⚙' },
      { id: 'profile', label: 'Profile', icon: '👤' },
    ];

    const currentItem = computed(() =>
      navItems.find(i => i.id === activeItem.value) || navItems[0]
    );

    return { expanded, activeItem, navItems, currentItem };
  }
}).mount('#app');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <nav class="navbar">
    <span class="brand">MyApp</span>
    <div class="nav-links" :class="{ open: menuOpen }">
      <a v-for="link in links" :key="link.id" :class="{ active: activeLink === link.id }"
        @click="activeLink = link.id; menuOpen = false">{{ link.label }}</a>
    </div>
    <button class="hamburger" @click="menuOpen = !menuOpen">
      <span></span><span></span><span></span>
    </button>
  </nav>
  <div class="page-content">
    <h3>{{ currentLink.label }}</h3>
    <p>{{ currentLink.desc }}</p>
  </div>
</div>`,
      css: `.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #1e293b;
  border-radius: 10px;
  margin-bottom: 12px;
}

.brand {
  color: #3b82f6;
  font-weight: 700;
  font-size: 18px;
}

.nav-links {
  display: flex;
  gap: 4px;
}

.nav-links a {
  color: #94a3b8;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.15s;
}

.nav-links a:hover {
  color: #e2e8f0;
  background: #334155;
}

.nav-links a.active {
  color: #3b82f6;
  background: rgba(59,130,246,0.1);
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background: #e2e8f0;
  border-radius: 1px;
}

.page-content {
  background: #1e293b;
  border-radius: 10px;
  padding: 20px;
}

.page-content h3 {
  color: #e2e8f0;
  margin: 0 0 8px;
}

.page-content p {
  color: #94a3b8;
  font-size: 14px;
  margin: 0;
}

@media (max-width: 480px) {
  .nav-links { display: none; }
  .nav-links.open { display: flex; flex-direction: column; position: absolute; top: 56px; left: 0; right: 0; background: #1e293b; padding: 8px; border-radius: 0 0 10px 10px; z-index: 10; }
  .hamburger { display: flex; }
}`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const menuOpen = ref(false);
    const activeLink = ref('home');

    const links = [
      { id: 'home', label: 'Home', desc: 'Welcome to the home page with latest updates and news.' },
      { id: 'about', label: 'About', desc: 'Learn more about our team, mission and values.' },
      { id: 'services', label: 'Services', desc: 'Explore our wide range of professional services.' },
      { id: 'contact', label: 'Contact', desc: 'Get in touch with us through our contact form.' },
    ];

    const currentLink = computed(() =>
      links.find(l => l.id === activeLink.value) || links[0]
    );

    return { menuOpen, activeLink, links, currentLink };
  }
}).mount('#app');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <div class="breadcrumb-bar">
    <span v-for="(crumb, i) in breadcrumbs" :key="i" class="crumb-item">
      <a v-if="i < breadcrumbs.length - 1" @click="navigateTo(i)" class="crumb-link">{{ crumb }}</a>
      <span v-else class="crumb-current">{{ crumb }}</span>
      <span v-if="i < breadcrumbs.length - 1" class="separator">/</span>
    </span>
  </div>
  <div class="tree">
    <div v-for="item in currentItems" :key="item.name" class="tree-item" @click="goInto(item)">
      <span class="tree-icon">{{ item.children ? '📁' : '📄' }}</span>
      <span>{{ item.name }}</span>
      <span v-if="item.children" class="chevron">›</span>
    </div>
    <div v-if="!currentItems.length" class="empty-dir">This folder is empty.</div>
  </div>
</div>`,
      css: `.breadcrumb-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  padding: 10px 14px;
  background: #1e293b;
  border-radius: 8px;
  margin-bottom: 10px;
}

.crumb-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.crumb-link {
  color: #3b82f6;
  cursor: pointer;
  font-size: 14px;
}

.crumb-link:hover {
  text-decoration: underline;
}

.crumb-current {
  color: #e2e8f0;
  font-size: 14px;
  font-weight: 600;
}

.separator {
  color: #475569;
  font-size: 14px;
}

.tree {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tree-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: #1e293b;
  border-radius: 8px;
  color: #e2e8f0;
  cursor: pointer;
  font-size: 14px;
}

.tree-item:hover {
  background: #334155;
}

.tree-icon {
  font-size: 16px;
}

.chevron {
  margin-left: auto;
  color: #475569;
  font-size: 18px;
}

.empty-dir {
  text-align: center;
  color: #64748b;
  padding: 24px;
}`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const fileTree = {
      name: 'Home',
      children: [
        { name: 'Documents', children: [
          { name: 'Reports', children: [{ name: 'Q1-Report.pdf' }, { name: 'Q2-Report.pdf' }] },
          { name: 'Notes', children: [{ name: 'meeting.md' }] },
        ]},
        { name: 'Photos', children: [
          { name: 'Vacation', children: [{ name: 'beach.jpg' }, { name: 'sunset.jpg' }] },
        ]},
        { name: 'readme.txt' },
      ],
    };

    const path = ref([fileTree]);

    const breadcrumbs = computed(() => path.value.map(p => p.name));

    const currentItems = computed(() => {
      const current = path.value[path.value.length - 1];
      return current.children || [];
    });

    const goInto = (item) => {
      if (item.children) {
        path.value = [...path.value, item];
      }
    };

    const navigateTo = (index) => {
      path.value = path.value.slice(0, index + 1);
    };

    return { breadcrumbs, currentItems, goInto, navigateTo };
  }
}).mount('#app');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <div class="phone-frame">
    <div class="phone-content">
      <h3>{{ currentTab.label }}</h3>
      <p>{{ currentTab.desc }}</p>
    </div>
    <div class="bottom-nav">
      <div v-for="tab in tabs" :key="tab.id" class="nav-tab"
        :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </div>
    </div>
  </div>
</div>`,
      css: `.phone-frame {
  max-width: 320px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid #334155;
  display: flex;
  flex-direction: column;
  height: 340px;
}

.phone-content {
  flex: 1;
  padding: 20px;
  background: #0f172a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.phone-content h3 {
  color: #e2e8f0;
  margin: 0 0 8px;
}

.phone-content p {
  color: #94a3b8;
  font-size: 14px;
  margin: 0;
}

.bottom-nav {
  display: flex;
  background: #1e293b;
  border-top: 1px solid #334155;
}

.nav-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 10px 0;
  cursor: pointer;
  transition: all 0.15s;
}

.nav-tab:hover {
  background: #334155;
}

.nav-tab.active {
  color: #3b82f6;
}

.tab-icon {
  font-size: 18px;
  color: #94a3b8;
}

.nav-tab.active .tab-icon {
  color: #3b82f6;
}

.tab-label {
  font-size: 11px;
  color: #94a3b8;
}

.nav-tab.active .tab-label {
  color: #3b82f6;
  font-weight: 600;
}`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const activeTab = ref('home');
    const tabs = [
      { id: 'home', label: 'Home', icon: '🏠', desc: 'Your personalized feed and latest updates.' },
      { id: 'search', label: 'Search', icon: '🔍', desc: 'Find people, places, and content.' },
      { id: 'add', label: 'Create', icon: '➕', desc: 'Share a new post or story.' },
      { id: 'inbox', label: 'Inbox', icon: '🔔', desc: 'View your notifications and messages.' },
      { id: 'profile', label: 'Profile', icon: '👤', desc: 'Manage your profile and settings.' },
    ];

    const currentTab = computed(() =>
      tabs.find(t => t.id === activeTab.value) || tabs[0]
    );

    return { activeTab, tabs, currentTab };
  }
}).mount('#app');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <div class="menu-bar">
    <div v-for="menu in menus" :key="menu.label" class="menu-trigger"
      @mouseenter="openMenu = menu.label" @mouseleave="openMenu = ''">
      <span class="menu-label">{{ menu.label }}</span>
      <div v-if="openMenu === menu.label" class="mega-dropdown">
        <div v-for="section in menu.sections" :key="section.title" class="mega-section">
          <h4>{{ section.title }}</h4>
          <a v-for="link in section.links" :key="link" class="mega-link"
            @click="selected = link; openMenu = ''">{{ link }}</a>
        </div>
      </div>
    </div>
  </div>
  <div v-if="selected" class="selected-page">
    Navigated to: <strong>{{ selected }}</strong>
  </div>
</div>`,
      css: `.menu-bar {
  display: flex;
  gap: 2px;
  background: #1e293b;
  border-radius: 10px;
  padding: 0 8px;
  position: relative;
}

.menu-trigger {
  position: relative;
  padding: 12px 16px;
  cursor: pointer;
}

.menu-label {
  color: #94a3b8;
  font-size: 14px;
  font-weight: 500;
}

.menu-trigger:hover .menu-label {
  color: #3b82f6;
}

.mega-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  gap: 24px;
  min-width: 320px;
  z-index: 50;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}

.mega-section h4 {
  color: #e2e8f0;
  font-size: 13px;
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.mega-link {
  display: block;
  color: #94a3b8;
  font-size: 14px;
  padding: 4px 0;
  cursor: pointer;
  transition: color 0.15s;
}

.mega-link:hover {
  color: #3b82f6;
}

.selected-page {
  margin-top: 16px;
  padding: 14px;
  background: #1e293b;
  border-radius: 8px;
  color: #94a3b8;
  font-size: 14px;
}

.selected-page strong {
  color: #3b82f6;
}`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const openMenu = ref('');
    const selected = ref('');

    const menus = [
      {
        label: 'Products',
        sections: [
          { title: 'Platform', links: ['API Builder', 'Dashboard', 'Analytics'] },
          { title: 'Tools', links: ['CLI', 'SDK', 'Plugins'] },
        ],
      },
      {
        label: 'Solutions',
        sections: [
          { title: 'By Industry', links: ['E-Commerce', 'SaaS', 'Healthcare'] },
          { title: 'By Size', links: ['Startup', 'Enterprise'] },
        ],
      },
      {
        label: 'Resources',
        sections: [
          { title: 'Learn', links: ['Docs', 'Tutorials', 'Blog'] },
          { title: 'Community', links: ['Forum', 'Discord', 'GitHub'] },
        ],
      },
    ];

    return { openMenu, selected, menus };
  }
}).mount('#app');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <div class="content">
    <div v-for="item in pageItems" :key="item" class="list-item">
      Item {{ item }}
    </div>
  </div>
  <div class="pagination">
    <button :disabled="currentPage <= 1" @click="currentPage = 1" class="pg-btn">«</button>
    <button :disabled="currentPage <= 1" @click="currentPage--" class="pg-btn">‹</button>
    <button v-for="p in displayedPages" :key="p" @click="currentPage = p"
      class="pg-btn" :class="{ active: p === currentPage }">{{ p }}</button>
    <button :disabled="currentPage >= totalPages" @click="currentPage++" class="pg-btn">›</button>
    <button :disabled="currentPage >= totalPages" @click="currentPage = totalPages" class="pg-btn">»</button>
  </div>
  <div class="pg-info">Page {{ currentPage }} of {{ totalPages }} ({{ allItems.length }} items)</div>
</div>`,
      css: `.content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}

.list-item {
  padding: 12px 14px;
  background: #1e293b;
  border-radius: 8px;
  color: #e2e8f0;
  font-size: 14px;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 4px;
}

.pg-btn {
  min-width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #94a3b8;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.15s;
}

.pg-btn:hover:not(:disabled) {
  background: #334155;
  color: #e2e8f0;
}

.pg-btn.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.pg-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.pg-info {
  text-align: center;
  color: #94a3b8;
  font-size: 13px;
  margin-top: 8px;
}`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const perPage = 5;
    const currentPage = ref(1);
    const allItems = Array.from({ length: 47 }, (_, i) => i + 1);

    const totalPages = computed(() => Math.ceil(allItems.length / perPage));

    const pageItems = computed(() => {
      const start = (currentPage.value - 1) * perPage;
      return allItems.slice(start, start + perPage);
    });

    const displayedPages = computed(() => {
      const pages = [];
      let start = Math.max(1, currentPage.value - 2);
      let end = Math.min(totalPages.value, start + 4);
      start = Math.max(1, end - 4);
      for (let i = start; i <= end; i++) pages.push(i);
      return pages;
    });

    return { currentPage, allItems, totalPages, pageItems, displayedPages };
  }
}).mount('#app');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <div class="shortcut-panel">
    <h3>Keyboard Shortcuts</h3>
    <p class="hint">Press the key combos below to trigger actions</p>
    <div class="shortcut-list">
      <div v-for="s in shortcuts" :key="s.key" class="shortcut-item" :class="{ triggered: lastTriggered === s.key }">
        <span class="shortcut-action">{{ s.action }}</span>
        <kbd>{{ s.display }}</kbd>
      </div>
    </div>
    <div v-if="lastTriggered" class="feedback">
      Triggered: <strong>{{ triggeredAction }}</strong>
    </div>
    <div class="try-section">
      <p>Or click to simulate:</p>
      <div class="btn-row">
        <button v-for="s in shortcuts" :key="s.key" @click="triggerAction(s.key)" class="sim-btn">{{ s.display }}</button>
      </div>
    </div>
  </div>
</div>`,
      css: `.shortcut-panel {
  background: #1e293b;
  border-radius: 12px;
  padding: 18px;
}

.shortcut-panel h3 {
  color: #e2e8f0;
  margin: 0 0 4px;
  font-size: 16px;
}

.hint {
  color: #64748b;
  font-size: 13px;
  margin: 0 0 14px;
}

.shortcut-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.shortcut-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: #0f172a;
  border-radius: 8px;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.shortcut-item.triggered {
  border-color: #3b82f6;
  background: rgba(59,130,246,0.1);
}

.shortcut-action {
  color: #e2e8f0;
  font-size: 14px;
}

kbd {
  background: #334155;
  color: #94a3b8;
  padding: 4px 10px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 13px;
  border: 1px solid #475569;
}

.feedback {
  padding: 10px;
  border-radius: 8px;
  background: rgba(59,130,246,0.1);
  color: #94a3b8;
  font-size: 14px;
  margin-bottom: 14px;
}

.feedback strong {
  color: #3b82f6;
}

.try-section p {
  color: #64748b;
  font-size: 13px;
  margin: 0 0 8px;
}

.btn-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.sim-btn {
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #0f172a;
  color: #94a3b8;
  cursor: pointer;
  font-family: monospace;
  font-size: 13px;
}

.sim-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}`,
      js: `const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const shortcuts = [
      { key: 'ctrl+s', display: 'Ctrl+S', action: 'Save Document' },
      { key: 'ctrl+n', display: 'Ctrl+N', action: 'New File' },
      { key: 'ctrl+f', display: 'Ctrl+F', action: 'Find' },
      { key: 'ctrl+z', display: 'Ctrl+Z', action: 'Undo' },
      { key: 'ctrl+shift+p', display: 'Ctrl+Shift+P', action: 'Command Palette' },
    ];

    const lastTriggered = ref('');

    const triggeredAction = computed(() => {
      const s = shortcuts.find(s => s.key === lastTriggered.value);
      return s ? s.action : '';
    });

    const triggerAction = (key) => {
      lastTriggered.value = key;
      setTimeout(() => { if (lastTriggered.value === key) lastTriggered.value = ''; }, 1500);
    };

    const handleKeyDown = (e) => {
      const parts = [];
      if (e.ctrlKey || e.metaKey) parts.push('ctrl');
      if (e.shiftKey) parts.push('shift');
      parts.push(e.key.toLowerCase());
      const combo = parts.join('+');
      const match = shortcuts.find(s => s.key === combo);
      if (match) {
        e.preventDefault();
        triggerAction(match.key);
      }
    };

    onMounted(() => document.addEventListener('keydown', handleKeyDown));
    onUnmounted(() => document.removeEventListener('keydown', handleKeyDown));

    return { shortcuts, lastTriggered, triggeredAction, triggerAction };
  }
}).mount('#app');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <div class="settings-panel">
    <h3>Settings</h3>
    <div class="setting-group">
      <label>Theme</label>
      <div class="btn-group">
        <button v-for="t in themes" :key="t" :class="{ active: settings.theme === t }" @click="settings.theme = t">{{ t }}</button>
      </div>
    </div>
    <div class="setting-group">
      <label>Font Size</label>
      <div class="range-row">
        <input type="range" v-model.number="settings.fontSize" min="12" max="24" />
        <span>{{ settings.fontSize }}px</span>
      </div>
    </div>
    <div class="setting-group">
      <div class="toggle-row">
        <span>Notifications</span>
        <div class="toggle" :class="{ on: settings.notifications }" @click="settings.notifications = !settings.notifications">
          <div class="toggle-knob"></div>
        </div>
      </div>
    </div>
    <div class="setting-group">
      <div class="toggle-row">
        <span>Auto-save</span>
        <div class="toggle" :class="{ on: settings.autoSave }" @click="settings.autoSave = !settings.autoSave">
          <div class="toggle-knob"></div>
        </div>
      </div>
    </div>
    <div class="setting-group">
      <label>Language</label>
      <select v-model="settings.language">
        <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
      </select>
    </div>
    <div class="preview" :style="{ fontSize: settings.fontSize + 'px' }">
      Preview text at {{ settings.fontSize }}px ({{ settings.theme }} theme, {{ settings.language }})
    </div>
  </div>
</div>`,
      css: `.settings-panel {
  background: #1e293b;
  border-radius: 12px;
  padding: 18px;
}

.settings-panel h3 {
  color: #e2e8f0;
  margin: 0 0 16px;
  font-size: 16px;
}

.setting-group {
  margin-bottom: 16px;
}

.setting-group label {
  display: block;
  color: #94a3b8;
  font-size: 13px;
  margin-bottom: 6px;
}

.btn-group {
  display: flex;
  gap: 4px;
}

.btn-group button {
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #0f172a;
  color: #94a3b8;
  cursor: pointer;
  font-size: 13px;
  text-transform: capitalize;
}

.btn-group button.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.range-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.range-row input {
  flex: 1;
  accent-color: #3b82f6;
}

.range-row span {
  color: #e2e8f0;
  font-family: monospace;
  min-width: 40px;
}

.toggle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #e2e8f0;
  font-size: 14px;
}

.toggle {
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: #334155;
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
}

.toggle.on {
  background: #3b82f6;
}

.toggle-knob {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.2s;
}

.toggle.on .toggle-knob {
  transform: translateX(20px);
}

select {
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #0f172a;
  color: #e2e8f0;
  outline: none;
}

.preview {
  padding: 12px;
  border-radius: 8px;
  background: #0f172a;
  color: #94a3b8;
  text-align: center;
  margin-top: 4px;
}`,
      js: `const { createApp, reactive, watch } = Vue;

createApp({
  setup() {
    const themes = ['dark', 'light', 'auto'];
    const languages = ['English', 'Spanish', 'French', 'German', 'Japanese'];

    const defaults = { theme: 'dark', fontSize: 16, notifications: true, autoSave: false, language: 'English' };
    const saved = localStorage.getItem('vue-settings');
    const settings = reactive(saved ? { ...defaults, ...JSON.parse(saved) } : { ...defaults });

    watch(settings, (val) => {
      localStorage.setItem('vue-settings', JSON.stringify(val));
    }, { deep: true });

    return { settings, themes, languages };
  }
}).mount('#app');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <div class="header-bar">
    <h3>Notification Center</h3>
    <div class="badge-wrap">
      <button class="bell-btn" @click="showPanel = !showPanel">🔔</button>
      <span v-if="unread > 0" class="badge">{{ unread }}</span>
    </div>
  </div>
  <div class="add-row">
    <button @click="addNotification('info')">Info</button>
    <button @click="addNotification('success')">Success</button>
    <button @click="addNotification('warning')">Warning</button>
    <button @click="addNotification('error')">Error</button>
  </div>
  <div v-if="showPanel" class="notif-panel">
    <div class="panel-header">
      <span>Notifications ({{ notifications.length }})</span>
      <button v-if="notifications.length" @click="markAllRead" class="link-btn">Mark all read</button>
    </div>
    <div v-for="n in notifications" :key="n.id" class="notif-item" :class="[n.type, { unread: !n.read }]" @click="n.read = true">
      <div class="notif-dot" :class="n.type"></div>
      <div class="notif-content">
        <span class="notif-msg">{{ n.message }}</span>
        <span class="notif-time">{{ n.time }}</span>
      </div>
      <button class="dismiss" @click.stop="dismiss(n.id)">×</button>
    </div>
    <div v-if="!notifications.length" class="empty">No notifications</div>
  </div>
</div>`,
      css: `.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.header-bar h3 {
  color: #e2e8f0;
  margin: 0;
  font-size: 16px;
}

.badge-wrap {
  position: relative;
}

.bell-btn {
  background: #1e293b;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
}

.badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background: #ef4444;
  color: white;
  font-size: 11px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.add-row {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}

.add-row button {
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 13px;
}

.add-row button:nth-child(1) { background: #3b82f6; }
.add-row button:nth-child(2) { background: #22c55e; }
.add-row button:nth-child(3) { background: #f59e0b; }
.add-row button:nth-child(4) { background: #ef4444; }

.notif-panel {
  background: #1e293b;
  border-radius: 10px;
  overflow: hidden;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-bottom: 1px solid #334155;
  color: #94a3b8;
  font-size: 13px;
}

.link-btn {
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  font-size: 13px;
}

.notif-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-bottom: 1px solid #0f172a;
  cursor: pointer;
}

.notif-item.unread {
  background: rgba(59,130,246,0.05);
}

.notif-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.notif-dot.info { background: #3b82f6; }
.notif-dot.success { background: #22c55e; }
.notif-dot.warning { background: #f59e0b; }
.notif-dot.error { background: #ef4444; }

.notif-content {
  flex: 1;
}

.notif-msg {
  color: #e2e8f0;
  font-size: 14px;
  display: block;
}

.notif-time {
  color: #64748b;
  font-size: 12px;
}

.dismiss {
  background: none;
  border: none;
  color: #475569;
  font-size: 16px;
  cursor: pointer;
}

.empty {
  text-align: center;
  color: #64748b;
  padding: 20px;
}`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const notifications = ref([]);
    const showPanel = ref(true);
    let nextId = 0;

    const messages = {
      info: ['New update available', 'System maintenance scheduled', 'Feature request received'],
      success: ['Deploy completed successfully', 'Tests passed', 'Backup created'],
      warning: ['Disk space running low', 'API rate limit approaching', 'Certificate expires soon'],
      error: ['Build failed', 'Connection lost', 'Payment declined'],
    };

    const unread = computed(() => notifications.value.filter(n => !n.read).length);

    const addNotification = (type) => {
      const msgs = messages[type];
      notifications.value.unshift({
        id: nextId++,
        type,
        message: msgs[Math.floor(Math.random() * msgs.length)],
        time: 'Just now',
        read: false,
      });
    };

    const dismiss = (id) => {
      notifications.value = notifications.value.filter(n => n.id !== id);
    };

    const markAllRead = () => {
      notifications.value.forEach(n => n.read = true);
    };

    return { notifications, showPanel, unread, addNotification, dismiss, markAllRead };
  }
}).mount('#app');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <h3 class="title">My Favorites <span class="fav-count">({{ favorites.length }})</span></h3>
  <div class="item-grid">
    <div v-for="item in items" :key="item.id" class="item-card">
      <div class="item-icon" :style="{ background: item.color }">{{ item.icon }}</div>
      <div class="item-info">
        <span class="item-name">{{ item.name }}</span>
        <span class="item-desc">{{ item.category }}</span>
      </div>
      <button class="fav-btn" :class="{ favorited: isFavorite(item.id) }" @click="toggleFav(item.id)">
        {{ isFavorite(item.id) ? '♥' : '♡' }}
      </button>
    </div>
  </div>
  <div v-if="favorites.length" class="fav-section">
    <h4>Favorited</h4>
    <div class="fav-chips">
      <span v-for="id in favorites" :key="id" class="fav-chip" @click="toggleFav(id)">
        {{ getItem(id).name }} ×
      </span>
    </div>
  </div>
</div>`,
      css: `.title {
  color: #e2e8f0;
  margin: 0 0 12px;
  font-size: 16px;
}

.fav-count {
  color: #3b82f6;
  font-size: 14px;
}

.item-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.item-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: #1e293b;
  border-radius: 10px;
}

.item-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.item-info {
  flex: 1;
}

.item-name {
  display: block;
  color: #e2e8f0;
  font-size: 14px;
  font-weight: 500;
}

.item-desc {
  color: #64748b;
  font-size: 12px;
}

.fav-btn {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #475569;
  transition: all 0.15s;
}

.fav-btn.favorited {
  color: #ef4444;
}

.fav-section h4 {
  color: #94a3b8;
  font-size: 13px;
  margin: 0 0 8px;
}

.fav-chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.fav-chip {
  padding: 6px 12px;
  border-radius: 20px;
  background: rgba(59,130,246,0.15);
  color: #3b82f6;
  font-size: 13px;
  cursor: pointer;
}

.fav-chip:hover {
  background: rgba(59,130,246,0.25);
}`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const items = [
      { id: 1, name: 'Vue.js', icon: '💚', color: '#22c55e', category: 'Framework' },
      { id: 2, name: 'TypeScript', icon: '📘', color: '#3b82f6', category: 'Language' },
      { id: 3, name: 'Vite', icon: '⚡', color: '#8b5cf6', category: 'Build Tool' },
      { id: 4, name: 'Pinia', icon: '🍍', color: '#f59e0b', category: 'State' },
      { id: 5, name: 'Tailwind', icon: '🎨', color: '#06b6d4', category: 'CSS' },
    ];

    const stored = localStorage.getItem('vue-favorites');
    const favorites = ref(stored ? JSON.parse(stored) : []);

    const isFavorite = (id) => favorites.value.includes(id);

    const toggleFav = (id) => {
      const idx = favorites.value.indexOf(id);
      if (idx >= 0) favorites.value.splice(idx, 1);
      else favorites.value.push(id);
      localStorage.setItem('vue-favorites', JSON.stringify(favorites.value));
    };

    const getItem = (id) => items.find(i => i.id === id) || items[0];

    return { items, favorites, isFavorite, toggleFav, getItem };
  }
}).mount('#app');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <div class="toolbar">
    <button @click="undo" :disabled="!canUndo" class="tb-btn">↩ Undo</button>
    <button @click="redo" :disabled="!canRedo" class="tb-btn">↪ Redo</button>
    <span class="history-info">{{ historyIndex + 1 }} / {{ history.length }}</span>
  </div>
  <div class="canvas">
    <div v-for="(item, i) in current" :key="i" class="canvas-item" :style="{ background: item.color }">
      <span>{{ item.text }}</span>
      <button class="remove-btn" @click="removeItem(i)">×</button>
    </div>
  </div>
  <div class="actions">
    <button @click="addItem" class="action-btn">+ Add Item</button>
    <button @click="shuffleColors" class="action-btn shuffle">Shuffle Colors</button>
  </div>
</div>`,
      css: `.toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.tb-btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #94a3b8;
  cursor: pointer;
  font-size: 13px;
}

.tb-btn:hover:not(:disabled) {
  border-color: #3b82f6;
  color: #3b82f6;
}

.tb-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.history-info {
  margin-left: auto;
  color: #64748b;
  font-size: 13px;
  font-family: monospace;
}

.canvas {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
  min-height: 80px;
}

.canvas-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.remove-btn {
  background: rgba(0,0,0,0.2);
  border: none;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #3b82f6;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
}

.action-btn.shuffle {
  background: #8b5cf6;
}`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const colors = ['#3b82f6','#22c55e','#ef4444','#f59e0b','#8b5cf6','#06b6d4','#ec4899'];
    const initialState = [
      { text: 'Item A', color: '#3b82f6' },
      { text: 'Item B', color: '#22c55e' },
    ];

    const history = ref([JSON.parse(JSON.stringify(initialState))]);
    const historyIndex = ref(0);

    const current = computed(() => history.value[historyIndex.value]);
    const canUndo = computed(() => historyIndex.value > 0);
    const canRedo = computed(() => historyIndex.value < history.value.length - 1);

    const pushState = (newState) => {
      history.value = history.value.slice(0, historyIndex.value + 1);
      history.value.push(JSON.parse(JSON.stringify(newState)));
      historyIndex.value = history.value.length - 1;
    };

    const undo = () => { if (canUndo.value) historyIndex.value--; };
    const redo = () => { if (canRedo.value) historyIndex.value++; };

    const addItem = () => {
      const next = [...current.value, {
        text: 'Item ' + String.fromCharCode(65 + current.value.length),
        color: colors[Math.floor(Math.random() * colors.length)],
      }];
      pushState(next);
    };

    const removeItem = (i) => {
      const next = current.value.filter((_, idx) => idx !== i);
      pushState(next);
    };

    const shuffleColors = () => {
      const next = current.value.map(item => ({
        ...item, color: colors[Math.floor(Math.random() * colors.length)],
      }));
      pushState(next);
    };

    return { history, historyIndex, current, canUndo, canRedo, undo, redo, addItem, removeItem, shuffleColors };
  }
}).mount('#app');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <div class="controls">
    <button @click="toggleLoading" class="ctrl-btn">{{ loading ? 'Show Content' : 'Show Skeleton' }}</button>
  </div>
  <div v-if="loading" class="skeleton-list">
    <div v-for="i in 3" :key="i" class="skeleton-card">
      <div class="skeleton-avatar pulse"></div>
      <div class="skeleton-lines">
        <div class="skeleton-line wide pulse"></div>
        <div class="skeleton-line medium pulse"></div>
        <div class="skeleton-line narrow pulse"></div>
      </div>
    </div>
  </div>
  <div v-else class="content-list">
    <div v-for="item in items" :key="item.id" class="content-card">
      <div class="avatar" :style="{ background: item.color }">{{ item.initials }}</div>
      <div class="card-body">
        <span class="card-title">{{ item.name }}</span>
        <span class="card-sub">{{ item.role }}</span>
        <span class="card-desc">{{ item.bio }}</span>
      </div>
    </div>
  </div>
</div>`,
      css: `.controls {
  margin-bottom: 14px;
}

.ctrl-btn {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background: #3b82f6;
  color: white;
  cursor: pointer;
  font-weight: 600;
}

.skeleton-list, .content-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-card {
  display: flex;
  gap: 14px;
  padding: 16px;
  background: #1e293b;
  border-radius: 10px;
}

.skeleton-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #334155;
  flex-shrink: 0;
}

.skeleton-lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 4px;
}

.skeleton-line {
  height: 12px;
  border-radius: 6px;
  background: #334155;
}

.skeleton-line.wide { width: 80%; }
.skeleton-line.medium { width: 60%; }
.skeleton-line.narrow { width: 40%; }

.pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.content-card {
  display: flex;
  gap: 14px;
  padding: 16px;
  background: #1e293b;
  border-radius: 10px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 16px;
  flex-shrink: 0;
}

.card-body {
  flex: 1;
}

.card-title {
  display: block;
  color: #e2e8f0;
  font-weight: 600;
  font-size: 15px;
}

.card-sub {
  display: block;
  color: #3b82f6;
  font-size: 13px;
  margin-bottom: 4px;
}

.card-desc {
  color: #94a3b8;
  font-size: 13px;
}`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const loading = ref(true);

    const items = [
      { id: 1, name: 'Alice Chen', initials: 'AC', role: 'Frontend Dev', bio: 'Vue.js and TypeScript enthusiast.', color: '#3b82f6' },
      { id: 2, name: 'Bob Smith', initials: 'BS', role: 'Designer', bio: 'Crafting beautiful user interfaces.', color: '#8b5cf6' },
      { id: 3, name: 'Carol Wu', initials: 'CW', role: 'Backend Dev', bio: 'Node.js and database expert.', color: '#22c55e' },
    ];

    const toggleLoading = () => { loading.value = !loading.value; };

    // Auto-reveal after 2 seconds on first load
    setTimeout(() => { loading.value = false; }, 2000);

    return { loading, items, toggleLoading };
  }
}).mount('#app');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <div class="controls">
    <button v-for="s in states" :key="s.id" @click="currentState = s.id"
      :class="{ active: currentState === s.id }" class="state-btn">{{ s.label }}</button>
  </div>
  <div class="empty-container">
    <div v-if="currentState === 'no-data'" class="empty-state">
      <div class="empty-icon">📦</div>
      <h3>No Data Yet</h3>
      <p>Start by adding your first item. It only takes a few seconds.</p>
      <button class="empty-action">Create First Item</button>
    </div>
    <div v-else-if="currentState === 'no-results'" class="empty-state">
      <div class="empty-icon">🔍</div>
      <h3>No Results Found</h3>
      <p>We couldn't find anything matching your search. Try different keywords.</p>
      <button class="empty-action secondary">Clear Filters</button>
    </div>
    <div v-else-if="currentState === 'error'" class="empty-state error">
      <div class="empty-icon">⚠</div>
      <h3>Something Went Wrong</h3>
      <p>We encountered an error loading your data. Please try again.</p>
      <button class="empty-action danger">Retry</button>
    </div>
    <div v-else-if="currentState === 'success'" class="empty-state success">
      <div class="empty-icon">✅</div>
      <h3>All Done!</h3>
      <p>You've completed all tasks. Great work!</p>
      <button class="empty-action success-btn">View Summary</button>
    </div>
  </div>
</div>`,
      css: `.controls {
  display: flex;
  gap: 4px;
  margin-bottom: 14px;
}

.state-btn {
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #94a3b8;
  cursor: pointer;
  font-size: 12px;
}

.state-btn.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.empty-container {
  background: #1e293b;
  border-radius: 12px;
  padding: 40px 20px;
}

.empty-state {
  text-align: center;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.empty-state h3 {
  color: #e2e8f0;
  margin: 0 0 8px;
  font-size: 18px;
}

.empty-state p {
  color: #94a3b8;
  font-size: 14px;
  margin: 0 0 20px;
  line-height: 1.5;
  max-width: 280px;
  margin-left: auto;
  margin-right: auto;
}

.empty-action {
  padding: 10px 24px;
  border-radius: 8px;
  border: none;
  background: #3b82f6;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
}

.empty-action.secondary {
  background: #334155;
  color: #e2e8f0;
}

.empty-action.danger {
  background: #ef4444;
}

.empty-action.success-btn {
  background: #22c55e;
}

.empty-state.error h3 {
  color: #ef4444;
}

.empty-state.success h3 {
  color: #22c55e;
}`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const currentState = ref('no-data');
    const states = [
      { id: 'no-data', label: 'No Data' },
      { id: 'no-results', label: 'No Results' },
      { id: 'error', label: 'Error' },
      { id: 'success', label: 'Complete' },
    ];

    return { currentState, states };
  }
}).mount('#app');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <div class="viewer-container">
    <div class="viewer" @wheel.prevent="onWheel" @mousedown="startPan" @mousemove="onPan" @mouseup="endPan" @mouseleave="endPan">
      <div class="image-wrapper" :style="transformStyle">
        <div class="demo-image">
          <div class="img-grid">
            <div v-for="i in 16" :key="i" class="img-cell" :style="{ background: cellColor(i) }"></div>
          </div>
          <span class="img-label">Zoomable Image</span>
        </div>
      </div>
    </div>
    <div class="viewer-controls">
      <button @click="zoomIn" class="v-btn">+</button>
      <span class="zoom-level">{{ Math.round(scale * 100) }}%</span>
      <button @click="zoomOut" class="v-btn">-</button>
      <button @click="resetView" class="v-btn reset">Reset</button>
    </div>
  </div>
</div>`,
      css: `.viewer-container {
  background: #1e293b;
  border-radius: 12px;
  overflow: hidden;
}

.viewer {
  height: 250px;
  overflow: hidden;
  cursor: grab;
  position: relative;
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
}

.viewer:active {
  cursor: grabbing;
}

.image-wrapper {
  transition: transform 0.1s;
  transform-origin: center center;
}

.demo-image {
  width: 180px;
  height: 180px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  border: 2px solid #334155;
}

.img-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  height: 100%;
}

.img-cell {
  transition: background 0.2s;
}

.img-label {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 12px;
  font-weight: 600;
  background: rgba(0,0,0,0.5);
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
}

.viewer-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: #1e293b;
  border-top: 1px solid #334155;
}

.v-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #0f172a;
  color: #e2e8f0;
  cursor: pointer;
  font-size: 16px;
}

.v-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.v-btn.reset {
  width: auto;
  padding: 0 14px;
  font-size: 13px;
}

.zoom-level {
  color: #94a3b8;
  font-family: monospace;
  font-size: 14px;
  min-width: 48px;
  text-align: center;
}`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const scale = ref(1);
    const panX = ref(0);
    const panY = ref(0);
    const isPanning = ref(false);
    const startX = ref(0);
    const startY = ref(0);

    const colors = ['#3b82f6','#2563eb','#1d4ed8','#60a5fa','#22c55e','#16a34a','#4ade80','#86efac',
                    '#f59e0b','#d97706','#fbbf24','#fcd34d','#ef4444','#dc2626','#f87171','#fca5a5'];

    const cellColor = (i) => colors[(i - 1) % colors.length];

    const transformStyle = computed(() =>
      'transform: scale(' + scale.value + ') translate(' + panX.value + 'px, ' + panY.value + 'px)'
    );

    const zoomIn = () => { scale.value = Math.min(scale.value + 0.25, 4); };
    const zoomOut = () => { scale.value = Math.max(scale.value - 0.25, 0.25); };
    const resetView = () => { scale.value = 1; panX.value = 0; panY.value = 0; };

    const onWheel = (e) => {
      if (e.deltaY < 0) zoomIn(); else zoomOut();
    };

    const startPan = (e) => {
      isPanning.value = true;
      startX.value = e.clientX - panX.value;
      startY.value = e.clientY - panY.value;
    };

    const onPan = (e) => {
      if (!isPanning.value) return;
      panX.value = e.clientX - startX.value;
      panY.value = e.clientY - startY.value;
    };

    const endPan = () => { isPanning.value = false; };

    return { scale, transformStyle, cellColor, zoomIn, zoomOut, resetView, onWheel, startPan, onPan, endPan };
  }
}).mount('#app');`,
    },
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
    demoCode: {
      html: `<div id="app">
  <div class="toggle-demo">
    <h3>Toggle Switches</h3>
    <div class="toggle-group">
      <div v-for="item in toggles" :key="item.id" class="toggle-row">
        <div class="toggle-info">
          <span class="toggle-label">{{ item.label }}</span>
          <span class="toggle-desc">{{ item.description }}</span>
        </div>
        <div class="toggle-switch" :class="{ on: item.value, disabled: item.disabled }"
          @click="!item.disabled && (item.value = !item.value)"
          role="switch" :aria-checked="item.value" tabindex="0"
          @keydown.space.prevent="!item.disabled && (item.value = !item.value)">
          <div class="knob"></div>
        </div>
      </div>
    </div>
    <div class="status-box">
      <div v-for="item in toggles" :key="item.id" class="status-item">
        <span class="status-dot" :class="item.value ? 'on' : 'off'"></span>
        {{ item.label }}: <strong>{{ item.value ? 'ON' : 'OFF' }}</strong>
      </div>
    </div>
  </div>
</div>`,
      css: `.toggle-demo {
  background: #1e293b;
  border-radius: 12px;
  padding: 18px;
}

.toggle-demo h3 {
  color: #e2e8f0;
  margin: 0 0 16px;
  font-size: 16px;
}

.toggle-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.toggle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #0f172a;
}

.toggle-info {
  flex: 1;
}

.toggle-label {
  display: block;
  color: #e2e8f0;
  font-size: 14px;
  font-weight: 500;
}

.toggle-desc {
  color: #64748b;
  font-size: 12px;
}

.toggle-switch {
  width: 48px;
  height: 26px;
  border-radius: 13px;
  background: #334155;
  cursor: pointer;
  position: relative;
  transition: background 0.25s;
  flex-shrink: 0;
}

.toggle-switch.on {
  background: #3b82f6;
}

.toggle-switch.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.knob {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: white;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.25s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.toggle-switch.on .knob {
  transform: translateX(22px);
}

.toggle-switch:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.status-box {
  background: #0f172a;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.status-item {
  color: #94a3b8;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-item strong {
  color: #e2e8f0;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-dot.on {
  background: #22c55e;
}

.status-dot.off {
  background: #475569;
}`,
      js: `const { createApp, reactive } = Vue;

createApp({
  setup() {
    const toggles = reactive([
      { id: 1, label: 'Dark Mode', description: 'Use dark color theme', value: true, disabled: false },
      { id: 2, label: 'Notifications', description: 'Receive push notifications', value: false, disabled: false },
      { id: 3, label: 'Auto-Save', description: 'Save changes automatically', value: true, disabled: false },
      { id: 4, label: 'Beta Features', description: 'Access experimental features', value: false, disabled: false },
      { id: 5, label: 'Maintenance Mode', description: 'Currently unavailable', value: false, disabled: true },
    ]);

    return { toggles };
  }
}).mount('#app');`,
    },
  },
  // --- NEW PATTERNS (100) ---
  // Forms & Input
  {
    id: 'vue-rating-stars',
    title: 'Rating Stars',
    description:
      'Build a star-rating component with hover preview and click-to-select. Supports half-star ratings via pointer position and emits the selected value reactively.',
    difficulty: 'beginner',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-for', 'mousemove', 'click events', 'ref'],
    demoCode: {
      html: `<div id="app">
  <div class="rating-wrap">
    <h3>Rate this item</h3>
    <div class="stars">
      <span v-for="star in 5" :key="star" class="star"
        :class="{ filled: star <= (hovered || rating) }"
        @mouseenter="hovered = star"
        @mouseleave="hovered = 0"
        @click="rating = star">&#9733;</span>
    </div>
    <p class="rating-text">{{ rating ? rating + ' / 5' : 'No rating yet' }}</p>
    <button v-if="rating" class="clear-btn" @click="rating = 0">Clear</button>
  </div>
</div>`,
      css: `.rating-wrap {
  background: #1a1a2e;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
}
.rating-wrap h3 { color: #e0e0e0; margin: 0 0 16px; }
.stars { display: flex; justify-content: center; gap: 8px; }
.star {
  font-size: 36px;
  color: #334155;
  cursor: pointer;
  transition: color 0.15s, transform 0.15s;
}
.star:hover { transform: scale(1.2); }
.star.filled { color: #facc15; }
.rating-text { color: #94a3b8; margin-top: 12px; font-size: 14px; }
.clear-btn {
  margin-top: 8px;
  padding: 6px 16px;
  border: 1px solid #4fc3f7;
  background: transparent;
  color: #4fc3f7;
  border-radius: 6px;
  cursor: pointer;
}
.clear-btn:hover { background: rgba(79,195,247,0.1); }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const rating = ref(0);
    const hovered = ref(0);
    return { rating, hovered };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-tag-input',
    title: 'Tag Input',
    description:
      'Create a tag-input field where users type text and press Enter or comma to add tags. Supports removal by click, duplicate prevention, and max-tag limits.',
    difficulty: 'beginner',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-model', 'keydown events', 'array manipulation', 'ref'],
    demoCode: {
      html: `<div id="app">
  <div class="tag-input-wrap">
    <h3>Add Tags</h3>
    <div class="tag-box">
      <span v-for="(tag, i) in tags" :key="tag" class="tag">
        {{ tag }}
        <button @click="removeTag(i)">&times;</button>
      </span>
      <input v-model="input" @keydown.enter.prevent="addTag" @keydown.,="addTag"
        placeholder="Type and press Enter" :disabled="tags.length >= 8" />
    </div>
    <p class="hint">{{ tags.length }} / 8 tags</p>
  </div>
</div>`,
      css: `.tag-input-wrap {
  background: #1a1a2e;
  padding: 24px;
  border-radius: 12px;
}
.tag-input-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.tag-box {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px;
  border: 1px solid #334155;
  border-radius: 8px;
  background: #0f172a;
  min-height: 44px;
  align-items: center;
}
.tag {
  background: #4fc3f7;
  color: #0f172a;
  padding: 4px 10px;
  border-radius: 14px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.tag button {
  background: none; border: none; color: #0f172a;
  cursor: pointer; font-size: 15px; line-height: 1;
}
.tag-box input {
  flex: 1; min-width: 100px; background: transparent;
  border: none; outline: none; color: #e0e0e0; font-size: 14px;
}
.hint { color: #64748b; font-size: 12px; margin-top: 8px; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const tags = ref(['vue', 'javascript']);
    const input = ref('');
    const addTag = () => {
      const val = input.value.replace(',', '').trim().toLowerCase();
      if (val && !tags.value.includes(val) && tags.value.length < 8) {
        tags.value.push(val);
      }
      input.value = '';
    };
    const removeTag = (i) => tags.value.splice(i, 1);
    return { tags, input, addTag, removeTag };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-multi-select',
    title: 'Multi Select',
    description:
      'Build a multi-select dropdown with checkboxes, search filtering, and selected-item chips. Handles keyboard navigation and click-outside to close.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-model', 'computed', 'v-for', 'click-outside'],
    demoCode: {
      html: `<div id="app">
  <div class="multi-wrap">
    <h3>Select Frameworks</h3>
    <div class="select-box" @click="open = !open">
      <div class="selected-chips">
        <span v-for="s in selected" :key="s" class="chip">{{ s }}
          <button @click.stop="toggle(s)">&times;</button>
        </span>
        <span v-if="!selected.length" class="placeholder">Choose...</span>
      </div>
      <span class="arrow">&#9662;</span>
    </div>
    <div v-if="open" class="dropdown">
      <input v-model="search" class="search-input" placeholder="Search..." />
      <label v-for="opt in filtered" :key="opt" class="option">
        <input type="checkbox" :checked="selected.includes(opt)" @change="toggle(opt)" />
        {{ opt }}
      </label>
    </div>
  </div>
</div>`,
      css: `.multi-wrap {
  background: #1a1a2e;
  padding: 24px;
  border-radius: 12px;
  position: relative;
}
.multi-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.select-box {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px; border: 1px solid #334155; border-radius: 8px;
  background: #0f172a; cursor: pointer; min-height: 42px;
}
.selected-chips { display: flex; flex-wrap: wrap; gap: 4px; flex: 1; }
.chip {
  background: #4fc3f7; color: #0f172a; padding: 2px 8px;
  border-radius: 10px; font-size: 12px; display: flex; align-items: center; gap: 2px;
}
.chip button { background: none; border: none; cursor: pointer; color: #0f172a; }
.placeholder { color: #64748b; font-size: 14px; }
.arrow { color: #64748b; }
.dropdown {
  position: absolute; left: 24px; right: 24px; top: 100%;
  background: #0f172a; border: 1px solid #334155; border-radius: 8px;
  margin-top: 4px; max-height: 200px; overflow-y: auto; z-index: 10;
}
.search-input {
  width: 100%; padding: 8px 10px; border: none; border-bottom: 1px solid #334155;
  background: transparent; color: #e0e0e0; outline: none;
}
.option {
  display: flex; align-items: center; gap: 8px; padding: 8px 10px;
  color: #e0e0e0; cursor: pointer; font-size: 14px;
}
.option:hover { background: rgba(79,195,247,0.1); }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const options = ['Vue', 'React', 'Angular', 'Svelte', 'Solid', 'Preact', 'Lit', 'Ember'];
    const selected = ref([]);
    const search = ref('');
    const open = ref(false);
    const filtered = computed(() =>
      options.filter(o => o.toLowerCase().includes(search.value.toLowerCase()))
    );
    const toggle = (opt) => {
      const idx = selected.value.indexOf(opt);
      if (idx >= 0) selected.value.splice(idx, 1);
      else selected.value.push(opt);
    };
    return { selected, search, open, filtered, toggle };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-otp-input',
    title: 'OTP Input',
    description:
      'Build a one-time-password input with individual digit boxes. Auto-focuses the next box on input and supports backspace navigation and paste handling.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['ref', 'template refs', 'keydown', 'nextTick', 'paste event'],
    demoCode: {
      html: `<div id="app">
  <div class="otp-wrap">
    <h3>Enter Verification Code</h3>
    <div class="otp-boxes">
      <input v-for="(d, i) in digits" :key="i" :ref="el => boxes[i] = el"
        :value="digits[i]" maxlength="1"
        @input="onInput(i, $event)" @keydown.backspace="onBackspace(i, $event)"
        @paste.prevent="onPaste" class="otp-box" />
    </div>
    <p class="otp-status" :class="{ filled: code.length === 6 }">
      {{ code.length === 6 ? 'Code: ' + code : 'Enter all 6 digits' }}
    </p>
  </div>
</div>`,
      css: `.otp-wrap {
  background: #1a1a2e; padding: 24px; border-radius: 12px; text-align: center;
}
.otp-wrap h3 { color: #e0e0e0; margin: 0 0 16px; }
.otp-boxes { display: flex; justify-content: center; gap: 10px; }
.otp-box {
  width: 48px; height: 56px; text-align: center; font-size: 24px;
  border: 2px solid #334155; border-radius: 8px;
  background: #0f172a; color: #e0e0e0; outline: none;
}
.otp-box:focus { border-color: #4fc3f7; }
.otp-status { color: #64748b; margin-top: 14px; font-size: 14px; }
.otp-status.filled { color: #4fc3f7; }`,
      js: `const { createApp, reactive, computed, nextTick } = Vue;

createApp({
  setup() {
    const digits = reactive(['', '', '', '', '', '']);
    const boxes = reactive([]);
    const code = computed(() => digits.join(''));
    const focus = (i) => { if (boxes[i]) boxes[i].focus(); };
    const onInput = (i, e) => {
      const val = e.target.value.replace(/\\D/, '');
      digits[i] = val;
      if (val && i < 5) nextTick(() => focus(i + 1));
    };
    const onBackspace = (i, e) => {
      if (!digits[i] && i > 0) { digits[i - 1] = ''; nextTick(() => focus(i - 1)); }
    };
    const onPaste = (e) => {
      const text = e.clipboardData.getData('text').replace(/\\D/g, '').slice(0, 6);
      text.split('').forEach((c, i) => { digits[i] = c; });
      nextTick(() => focus(Math.min(text.length, 5)));
    };
    return { digits, boxes, code, onInput, onBackspace, onPaste };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-credit-card-input',
    title: 'Credit Card Input',
    description:
      'Create a credit card form with number formatting, expiry date masking, and a live card preview that flips to show the CVV field.',
    difficulty: 'advanced',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-model', 'computed', 'watch', 'input masking', 'CSS transforms'],
    demoCode: {
      html: `<div id="app">
  <div class="cc-wrap">
    <div class="card-preview" :class="{ flipped: focusCvv }">
      <div class="card-front">
        <div class="card-number">{{ displayNumber }}</div>
        <div class="card-bottom">
          <span>{{ name || 'CARDHOLDER' }}</span>
          <span>{{ expiry || 'MM/YY' }}</span>
        </div>
      </div>
      <div class="card-back"><div class="cvv-strip">{{ cvv || '***' }}</div></div>
    </div>
    <div class="cc-form">
      <input v-model="number" placeholder="Card Number" maxlength="19" @input="formatNumber" />
      <input v-model="name" placeholder="Name on Card" />
      <div class="row">
        <input v-model="expiry" placeholder="MM/YY" maxlength="5" @input="formatExpiry" />
        <input v-model="cvv" placeholder="CVV" maxlength="4"
          @focus="focusCvv = true" @blur="focusCvv = false" />
      </div>
    </div>
  </div>
</div>`,
      css: `.cc-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.card-preview {
  perspective: 600px; height: 180px; margin-bottom: 20px; position: relative;
}
.card-front, .card-back {
  position: absolute; inset: 0; border-radius: 12px; padding: 24px;
  backface-visibility: hidden; transition: transform 0.6s;
  display: flex; flex-direction: column; justify-content: space-between;
}
.card-front { background: linear-gradient(135deg, #4fc3f7, #1a237e); }
.card-back {
  background: linear-gradient(135deg, #1a237e, #4fc3f7);
  transform: rotateY(180deg); align-items: center; justify-content: center;
}
.card-preview.flipped .card-front { transform: rotateY(180deg); }
.card-preview.flipped .card-back { transform: rotateY(0deg); }
.card-number { color: #fff; font-size: 22px; letter-spacing: 3px; font-family: monospace; }
.card-bottom { display: flex; justify-content: space-between; color: #e0e0e0; font-size: 13px; text-transform: uppercase; }
.cvv-strip { background: #0f172a; padding: 10px 40px; border-radius: 6px; color: #e0e0e0; font-size: 20px; letter-spacing: 4px; }
.cc-form { display: flex; flex-direction: column; gap: 10px; }
.cc-form input {
  padding: 10px 12px; border-radius: 8px; border: 1px solid #334155;
  background: #0f172a; color: #e0e0e0; outline: none; font-size: 14px;
}
.cc-form input:focus { border-color: #4fc3f7; }
.row { display: flex; gap: 10px; }
.row input { flex: 1; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const number = ref('');
    const name = ref('');
    const expiry = ref('');
    const cvv = ref('');
    const focusCvv = ref(false);
    const displayNumber = computed(() => {
      const raw = number.value.replace(/\\s/g, '');
      return raw.padEnd(16, '*').replace(/(....)/g, '$1 ').trim();
    });
    const formatNumber = () => {
      const raw = number.value.replace(/\\D/g, '').slice(0, 16);
      number.value = raw.replace(/(\\d{4})(?=\\d)/g, '$1 ');
    };
    const formatExpiry = () => {
      const raw = expiry.value.replace(/\\D/g, '').slice(0, 4);
      expiry.value = raw.length > 2 ? raw.slice(0, 2) + '/' + raw.slice(2) : raw;
    };
    return { number, name, expiry, cvv, focusCvv, displayNumber, formatNumber, formatExpiry };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-address-form',
    title: 'Address Form',
    description:
      'Build a multi-field address form with country-dependent fields, postal code formatting, and real-time address preview. Uses reactive form state with validation.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['reactive', 'computed', 'v-model', 'conditional rendering'],
    demoCode: {
      html: `<div id="app">
  <div class="addr-wrap">
    <h3>Shipping Address</h3>
    <form @submit.prevent class="addr-form">
      <input v-model="form.name" placeholder="Full Name" />
      <input v-model="form.line1" placeholder="Address Line 1" />
      <input v-model="form.line2" placeholder="Address Line 2 (optional)" />
      <div class="row">
        <input v-model="form.city" placeholder="City" />
        <input v-model="form.state" placeholder="State / Province" />
      </div>
      <div class="row">
        <input v-model="form.zip" placeholder="Postal Code" />
        <select v-model="form.country">
          <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
    </form>
    <div class="preview" v-if="form.name">
      <strong>{{ form.name }}</strong><br/>
      {{ form.line1 }}<br/>
      <span v-if="form.line2">{{ form.line2 }}<br/></span>
      {{ form.city }}, {{ form.state }} {{ form.zip }}<br/>
      {{ form.country }}
    </div>
  </div>
</div>`,
      css: `.addr-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.addr-wrap h3 { color: #e0e0e0; margin: 0 0 16px; }
.addr-form { display: flex; flex-direction: column; gap: 10px; }
.addr-form input, .addr-form select {
  padding: 10px 12px; border-radius: 8px; border: 1px solid #334155;
  background: #0f172a; color: #e0e0e0; outline: none; font-size: 14px;
}
.addr-form input:focus, .addr-form select:focus { border-color: #4fc3f7; }
.row { display: flex; gap: 10px; }
.row input, .row select { flex: 1; }
.preview {
  margin-top: 16px; padding: 14px; background: #0f172a;
  border-radius: 8px; color: #94a3b8; font-size: 13px; line-height: 1.6;
}
.preview strong { color: #e0e0e0; }`,
      js: `const { createApp, reactive } = Vue;

createApp({
  setup() {
    const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany'];
    const form = reactive({
      name: '', line1: '', line2: '', city: '', state: '', zip: '', country: 'United States'
    });
    return { form, countries };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-survey-form',
    title: 'Survey Form',
    description:
      'Create a multi-step survey with radio buttons, checkboxes, and text areas. Tracks progress with a step indicator and collects all answers into a summary.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['reactive', 'v-if', 'v-for', 'multi-step navigation', 'computed'],
    demoCode: {
      html: `<div id="app">
  <div class="survey-wrap">
    <div class="progress-bar"><div class="fill" :style="{ width: progress + '%' }"></div></div>
    <div v-if="step === 0" class="step">
      <h3>How do you rate our service?</h3>
      <label v-for="o in ['Excellent','Good','Average','Poor']" :key="o" class="radio-opt">
        <input type="radio" v-model="answers.rating" :value="o" /> {{ o }}
      </label>
    </div>
    <div v-else-if="step === 1" class="step">
      <h3>What features do you use?</h3>
      <label v-for="f in features" :key="f" class="check-opt">
        <input type="checkbox" :value="f" v-model="answers.features" /> {{ f }}
      </label>
    </div>
    <div v-else-if="step === 2" class="step">
      <h3>Additional feedback</h3>
      <textarea v-model="answers.feedback" rows="4" placeholder="Your thoughts..."></textarea>
    </div>
    <div v-else class="step summary">
      <h3>Thank you!</h3>
      <p>Rating: {{ answers.rating || 'N/A' }}</p>
      <p>Features: {{ answers.features.join(', ') || 'None' }}</p>
      <p>Feedback: {{ answers.feedback || 'None' }}</p>
    </div>
    <div class="nav-btns">
      <button v-if="step > 0 && step < 3" @click="step--">Back</button>
      <button v-if="step < 3" @click="step++">{{ step === 2 ? 'Submit' : 'Next' }}</button>
    </div>
  </div>
</div>`,
      css: `.survey-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.progress-bar { height: 4px; background: #334155; border-radius: 2px; margin-bottom: 20px; }
.fill { height: 100%; background: #4fc3f7; border-radius: 2px; transition: width 0.3s; }
.step h3 { color: #e0e0e0; margin: 0 0 14px; }
.radio-opt, .check-opt {
  display: flex; align-items: center; gap: 8px;
  color: #e0e0e0; padding: 8px 0; cursor: pointer; font-size: 14px;
}
textarea {
  width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #334155;
  background: #0f172a; color: #e0e0e0; outline: none; resize: vertical; font-size: 14px;
}
.nav-btns { display: flex; gap: 10px; margin-top: 16px; justify-content: flex-end; }
.nav-btns button {
  padding: 8px 20px; border-radius: 6px; border: none;
  background: #4fc3f7; color: #0f172a; font-weight: 600; cursor: pointer;
}
.nav-btns button:hover { background: #81d4fa; }
.summary p { color: #94a3b8; margin: 6px 0; font-size: 14px; }`,
      js: `const { createApp, ref, reactive, computed } = Vue;

createApp({
  setup() {
    const step = ref(0);
    const features = ['Dashboard', 'Reports', 'API', 'Notifications', 'Integrations'];
    const answers = reactive({ rating: '', features: [], feedback: '' });
    const progress = computed(() => Math.round((step.value / 3) * 100));
    return { step, features, answers, progress };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-textarea-autogrow',
    title: 'Textarea Autogrow',
    description:
      'Build a textarea that automatically grows in height as the user types. Uses a hidden mirror element or scrollHeight to calculate the needed height in real time.',
    difficulty: 'beginner',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['ref', 'watch', 'nextTick', 'template refs'],
    demoCode: {
      html: `<div id="app">
  <div class="auto-wrap">
    <h3>Auto-growing Textarea</h3>
    <textarea ref="ta" v-model="text" @input="resize" rows="2"
      placeholder="Start typing... the textarea will grow automatically."></textarea>
    <p class="char-count">{{ text.length }} characters</p>
  </div>
</div>`,
      css: `.auto-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.auto-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.auto-wrap textarea {
  width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #334155;
  background: #0f172a; color: #e0e0e0; outline: none; resize: none;
  font-size: 14px; line-height: 1.5; overflow: hidden; min-height: 48px;
  transition: height 0.1s;
}
.auto-wrap textarea:focus { border-color: #4fc3f7; }
.char-count { color: #64748b; font-size: 12px; margin-top: 6px; text-align: right; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const text = ref('');
    const ta = ref(null);
    const resize = () => {
      const el = ta.value;
      if (!el) return;
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    };
    return { text, ta, resize };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-phone-input',
    title: 'Phone Input',
    description:
      'Create a phone number input with automatic formatting, country code selector, and validation. Formats as the user types and shows a validation indicator.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-model', 'watch', 'input masking', 'computed'],
    demoCode: {
      html: `<div id="app">
  <div class="phone-wrap">
    <h3>Phone Number</h3>
    <div class="phone-row">
      <select v-model="country" class="country-sel">
        <option v-for="c in codes" :key="c.code" :value="c">{{ c.flag }} {{ c.dial }}</option>
      </select>
      <input v-model="phone" @input="format" placeholder="(555) 123-4567" class="phone-input" />
    </div>
    <p class="phone-status" :class="{ valid: isValid }">
      {{ isValid ? 'Valid number' : 'Enter a valid phone number' }}
    </p>
  </div>
</div>`,
      css: `.phone-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.phone-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.phone-row { display: flex; gap: 8px; }
.country-sel {
  padding: 10px; border-radius: 8px; border: 1px solid #334155;
  background: #0f172a; color: #e0e0e0; outline: none; width: 110px;
}
.phone-input {
  flex: 1; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155;
  background: #0f172a; color: #e0e0e0; outline: none; font-size: 16px;
}
.phone-input:focus { border-color: #4fc3f7; }
.phone-status { font-size: 13px; margin-top: 8px; color: #ef4444; }
.phone-status.valid { color: #22c55e; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const codes = [
      { code: 'US', dial: '+1', flag: '🇺🇸' },
      { code: 'GB', dial: '+44', flag: '🇬🇧' },
      { code: 'DE', dial: '+49', flag: '🇩🇪' },
    ];
    const country = ref(codes[0]);
    const phone = ref('');
    const format = () => {
      const raw = phone.value.replace(/\\D/g, '').slice(0, 10);
      if (raw.length >= 7) phone.value = '(' + raw.slice(0,3) + ') ' + raw.slice(3,6) + '-' + raw.slice(6);
      else if (raw.length >= 4) phone.value = '(' + raw.slice(0,3) + ') ' + raw.slice(3);
      else phone.value = raw;
    };
    const isValid = computed(() => phone.value.replace(/\\D/g, '').length === 10);
    return { codes, country, phone, format, isValid };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-currency-input',
    title: 'Currency Input',
    description:
      'Build a currency input that formats values with commas, decimal points, and a currency symbol. Supports multiple currencies and live conversion preview.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-model', 'watch', 'Intl.NumberFormat', 'computed'],
    demoCode: {
      html: `<div id="app">
  <div class="curr-wrap">
    <h3>Currency Input</h3>
    <div class="curr-row">
      <select v-model="currency">
        <option v-for="c in currencies" :key="c.code" :value="c">{{ c.symbol }} {{ c.code }}</option>
      </select>
      <input v-model="rawInput" @input="onInput" placeholder="0.00" class="curr-input" />
    </div>
    <p class="formatted">{{ formatted }}</p>
  </div>
</div>`,
      css: `.curr-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.curr-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.curr-row { display: flex; gap: 8px; }
.curr-row select {
  padding: 10px; border-radius: 8px; border: 1px solid #334155;
  background: #0f172a; color: #e0e0e0; outline: none;
}
.curr-input {
  flex: 1; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155;
  background: #0f172a; color: #e0e0e0; outline: none; font-size: 18px; text-align: right;
}
.curr-input:focus { border-color: #4fc3f7; }
.formatted { color: #4fc3f7; font-size: 20px; text-align: right; margin-top: 12px; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const currencies = [
      { code: 'USD', symbol: '$', locale: 'en-US' },
      { code: 'EUR', symbol: '€', locale: 'de-DE' },
      { code: 'GBP', symbol: '£', locale: 'en-GB' },
    ];
    const currency = ref(currencies[0]);
    const rawInput = ref('');
    const onInput = () => {
      rawInput.value = rawInput.value.replace(/[^0-9.]/g, '');
    };
    const formatted = computed(() => {
      const num = parseFloat(rawInput.value) || 0;
      return new Intl.NumberFormat(currency.value.locale, {
        style: 'currency', currency: currency.value.code
      }).format(num);
    });
    return { currencies, currency, rawInput, onInput, formatted };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-slider-range',
    title: 'Slider Range',
    description:
      'Build a dual-thumb range slider that lets users select a min/max range. Displays the selected range and handles thumb overlap prevention.',
    difficulty: 'beginner',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-model', 'input range', 'computed', 'reactive'],
    demoCode: {
      html: `<div id="app">
  <div class="range-wrap">
    <h3>Price Range</h3>
    <div class="range-values">\${{ min }} &mdash; \${{ max }}</div>
    <div class="slider-track">
      <div class="slider-fill" :style="fillStyle"></div>
    </div>
    <div class="sliders">
      <input type="range" :min="0" :max="1000" v-model.number="min" @input="clampMin" />
      <input type="range" :min="0" :max="1000" v-model.number="max" @input="clampMax" />
    </div>
  </div>
</div>`,
      css: `.range-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.range-wrap h3 { color: #e0e0e0; margin: 0 0 8px; }
.range-values { color: #4fc3f7; font-size: 20px; text-align: center; margin-bottom: 16px; }
.slider-track {
  height: 6px; background: #334155; border-radius: 3px; position: relative; margin-bottom: 4px;
}
.slider-fill { position: absolute; height: 100%; background: #4fc3f7; border-radius: 3px; }
.sliders { position: relative; height: 30px; }
.sliders input[type=range] {
  position: absolute; width: 100%; top: -10px;
  -webkit-appearance: none; background: transparent; pointer-events: none;
}
.sliders input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%;
  background: #4fc3f7; cursor: pointer; pointer-events: all;
  border: 2px solid #1a1a2e;
}`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const min = ref(200);
    const max = ref(800);
    const clampMin = () => { if (min.value > max.value - 50) min.value = max.value - 50; };
    const clampMax = () => { if (max.value < min.value + 50) max.value = min.value + 50; };
    const fillStyle = computed(() => ({
      left: (min.value / 1000 * 100) + '%',
      width: ((max.value - min.value) / 1000 * 100) + '%'
    }));
    return { min, max, clampMin, clampMax, fillStyle };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-toggle-group',
    title: 'Toggle Group',
    description:
      'Create a button toggle group that allows single or multiple selection. Supports disabled items, keyboard navigation, and aria attributes.',
    difficulty: 'beginner',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-for', 'reactive', 'class binding', 'aria'],
    demoCode: {
      html: `<div id="app">
  <div class="tg-wrap">
    <h3>Select Size</h3>
    <div class="toggle-grp" role="radiogroup">
      <button v-for="opt in options" :key="opt" class="tg-btn"
        :class="{ active: selected === opt }" @click="selected = opt"
        role="radio" :aria-checked="selected === opt">{{ opt }}</button>
    </div>
    <p class="tg-val">Selected: <strong>{{ selected }}</strong></p>
  </div>
</div>`,
      css: `.tg-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.tg-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.toggle-grp { display: flex; gap: 0; border-radius: 8px; overflow: hidden; border: 1px solid #334155; }
.tg-btn {
  flex: 1; padding: 10px 16px; border: none; background: #0f172a;
  color: #94a3b8; cursor: pointer; font-size: 14px; transition: all 0.2s;
  border-right: 1px solid #334155;
}
.tg-btn:last-child { border-right: none; }
.tg-btn:hover { background: #1e293b; }
.tg-btn.active { background: #4fc3f7; color: #0f172a; font-weight: 600; }
.tg-val { color: #94a3b8; margin-top: 12px; font-size: 14px; }
.tg-val strong { color: #e0e0e0; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const options = ['XS', 'S', 'M', 'L', 'XL'];
    const selected = ref('M');
    return { options, selected };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-segmented-control',
    title: 'Segmented Control',
    description:
      'Build an iOS-style segmented control with a sliding highlight indicator. The active segment has an animated background that transitions smoothly between options.',
    difficulty: 'beginner',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-for', 'ref', 'computed', 'CSS transitions'],
    demoCode: {
      html: `<div id="app">
  <div class="seg-wrap">
    <h3>View Mode</h3>
    <div class="seg-control">
      <div class="seg-indicator" :style="indicatorStyle"></div>
      <button v-for="(opt, i) in options" :key="opt" class="seg-btn"
        :class="{ active: activeIdx === i }" @click="activeIdx = i">{{ opt }}</button>
    </div>
    <div class="seg-content">
      <p>Current view: <strong>{{ options[activeIdx] }}</strong></p>
    </div>
  </div>
</div>`,
      css: `.seg-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.seg-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.seg-control {
  display: flex; position: relative; background: #0f172a;
  border-radius: 8px; padding: 3px;
}
.seg-indicator {
  position: absolute; top: 3px; bottom: 3px; border-radius: 6px;
  background: #4fc3f7; transition: left 0.3s ease, width 0.3s ease;
}
.seg-btn {
  flex: 1; padding: 8px 16px; border: none; background: transparent;
  color: #94a3b8; cursor: pointer; font-size: 13px; position: relative; z-index: 1;
  transition: color 0.3s;
}
.seg-btn.active { color: #0f172a; font-weight: 600; }
.seg-content { margin-top: 16px; color: #94a3b8; font-size: 14px; }
.seg-content strong { color: #4fc3f7; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const options = ['List', 'Grid', 'Board'];
    const activeIdx = ref(0);
    const indicatorStyle = computed(() => {
      const w = 100 / options.length;
      return { left: (activeIdx.value * w) + '%', width: w + '%' };
    });
    return { options, activeIdx, indicatorStyle };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-combobox',
    title: 'Combobox',
    description:
      'Build a combobox that combines a text input with a filterable dropdown list. Supports keyboard navigation (arrow keys, Enter, Escape) and custom option rendering.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-model', 'computed', 'keydown events', 'refs', 'focus management'],
    demoCode: {
      html: `<div id="app">
  <div class="combo-wrap">
    <h3>Select a Language</h3>
    <div class="combo-box">
      <input v-model="query" @focus="open = true" @keydown.down.prevent="moveDown"
        @keydown.up.prevent="moveUp" @keydown.enter.prevent="selectHighlighted"
        @keydown.escape="open = false" placeholder="Type to filter..." />
      <ul v-if="open && filtered.length" class="combo-list">
        <li v-for="(item, i) in filtered" :key="item" class="combo-item"
          :class="{ highlighted: i === hlIdx }" @mouseenter="hlIdx = i"
          @click="select(item)">{{ item }}</li>
      </ul>
    </div>
    <p class="combo-val" v-if="selected">Selected: <strong>{{ selected }}</strong></p>
  </div>
</div>`,
      css: `.combo-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; position: relative; }
.combo-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.combo-box { position: relative; }
.combo-box input {
  width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155;
  background: #0f172a; color: #e0e0e0; outline: none; font-size: 14px;
}
.combo-box input:focus { border-color: #4fc3f7; }
.combo-list {
  position: absolute; left: 0; right: 0; top: 100%; margin-top: 4px;
  background: #0f172a; border: 1px solid #334155; border-radius: 8px;
  max-height: 180px; overflow-y: auto; list-style: none; padding: 4px 0; z-index: 10;
}
.combo-item {
  padding: 8px 12px; color: #e0e0e0; cursor: pointer; font-size: 14px;
}
.combo-item.highlighted { background: rgba(79,195,247,0.15); }
.combo-val { color: #94a3b8; margin-top: 10px; font-size: 14px; }
.combo-val strong { color: #4fc3f7; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const langs = ['JavaScript', 'TypeScript', 'Python', 'Rust', 'Go', 'Java', 'C#', 'Ruby', 'Swift', 'Kotlin'];
    const query = ref('');
    const selected = ref('');
    const open = ref(false);
    const hlIdx = ref(0);
    const filtered = computed(() =>
      langs.filter(l => l.toLowerCase().includes(query.value.toLowerCase()))
    );
    const select = (item) => { selected.value = item; query.value = item; open.value = false; };
    const moveDown = () => { if (hlIdx.value < filtered.value.length - 1) hlIdx.value++; };
    const moveUp = () => { if (hlIdx.value > 0) hlIdx.value--; };
    const selectHighlighted = () => { if (filtered.value[hlIdx.value]) select(filtered.value[hlIdx.value]); };
    return { query, selected, open, hlIdx, filtered, select, moveDown, moveUp, selectHighlighted };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-mentions-input',
    title: 'Mentions Input',
    description:
      'Create a textarea that detects @-mentions and shows a user suggestion popup. Selected mentions are highlighted inline and stored as structured data.',
    difficulty: 'advanced',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['v-model', 'computed', 'selection range', 'popup positioning'],
    demoCode: {
      html: `<div id="app">
  <div class="mention-wrap">
    <h3>Mention Users</h3>
    <div class="mention-box">
      <textarea v-model="text" @input="checkMention" @keydown.down.prevent="hlDown"
        @keydown.up.prevent="hlUp" @keydown.enter.prevent="insertMention"
        rows="3" placeholder="Type @ to mention someone..."></textarea>
      <ul v-if="showSuggestions" class="suggestions">
        <li v-for="(u, i) in filtered" :key="u" :class="{ hl: i === hlIdx }"
          @click="pickUser(u)">@{{ u }}</li>
      </ul>
    </div>
    <div class="mentions-list" v-if="mentioned.length">
      <span v-for="m in mentioned" :key="m" class="mention-tag">@{{ m }}</span>
    </div>
  </div>
</div>`,
      css: `.mention-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; position: relative; }
.mention-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.mention-box { position: relative; }
.mention-box textarea {
  width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #334155;
  background: #0f172a; color: #e0e0e0; outline: none; resize: vertical; font-size: 14px;
}
.mention-box textarea:focus { border-color: #4fc3f7; }
.suggestions {
  position: absolute; left: 0; right: 0; bottom: 100%; margin-bottom: 4px;
  background: #0f172a; border: 1px solid #334155; border-radius: 8px;
  list-style: none; padding: 4px 0; z-index: 10;
}
.suggestions li {
  padding: 8px 12px; color: #e0e0e0; cursor: pointer; font-size: 14px;
}
.suggestions li.hl { background: rgba(79,195,247,0.15); }
.mentions-list { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; }
.mention-tag { background: rgba(79,195,247,0.2); color: #4fc3f7; padding: 2px 8px; border-radius: 10px; font-size: 12px; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const users = ['alice', 'bob', 'charlie', 'diana', 'eve', 'frank'];
    const text = ref('');
    const query = ref('');
    const showSuggestions = ref(false);
    const hlIdx = ref(0);
    const mentioned = ref([]);
    const filtered = computed(() =>
      users.filter(u => u.startsWith(query.value.toLowerCase())).slice(0, 5)
    );
    const checkMention = () => {
      const match = text.value.match(/@(\\w*)$/);
      if (match) { query.value = match[1]; showSuggestions.value = true; hlIdx.value = 0; }
      else { showSuggestions.value = false; }
    };
    const pickUser = (u) => {
      text.value = text.value.replace(/@\\w*$/, '@' + u + ' ');
      if (!mentioned.value.includes(u)) mentioned.value.push(u);
      showSuggestions.value = false;
    };
    const insertMention = () => {
      if (showSuggestions.value && filtered.value[hlIdx.value]) pickUser(filtered.value[hlIdx.value]);
    };
    const hlDown = () => { if (hlIdx.value < filtered.value.length - 1) hlIdx.value++; };
    const hlUp = () => { if (hlIdx.value > 0) hlIdx.value--; };
    return { text, showSuggestions, filtered, hlIdx, mentioned, checkMention, pickUser, insertMention, hlDown, hlUp };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-code-input',
    title: 'Code Input',
    description:
      'Build a simple code editor textarea with line numbers, tab key support, and basic syntax-like styling. Handles indentation and shows a live character/line count.',
    difficulty: 'intermediate',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['ref', 'computed', 'keydown', 'template refs', 'scroll sync'],
    demoCode: {
      html: `<div id="app">
  <div class="code-wrap">
    <h3>Code Editor</h3>
    <div class="editor">
      <div class="line-nums" ref="lineNums">
        <div v-for="n in lineCount" :key="n" class="ln">{{ n }}</div>
      </div>
      <textarea ref="codeArea" v-model="code" @keydown.tab.prevent="insertTab"
        @scroll="syncScroll" spellcheck="false"></textarea>
    </div>
    <div class="code-info">Lines: {{ lineCount }} | Chars: {{ code.length }}</div>
  </div>
</div>`,
      css: `.code-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.code-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.editor { display: flex; border: 1px solid #334155; border-radius: 8px; overflow: hidden; height: 200px; }
.line-nums {
  background: #0a0a1a; padding: 10px 0; min-width: 40px; overflow: hidden;
}
.ln { color: #475569; font-size: 13px; line-height: 1.5; text-align: right; padding: 0 8px; font-family: monospace; }
.editor textarea {
  flex: 1; padding: 10px; border: none; background: #0f172a; color: #e0e0e0;
  outline: none; resize: none; font-family: monospace; font-size: 13px;
  line-height: 1.5; tab-size: 2;
}
.code-info { color: #64748b; font-size: 12px; margin-top: 8px; text-align: right; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const code = ref('function hello() {\\n  console.log("Hello!");\\n}');
    const codeArea = ref(null);
    const lineNums = ref(null);
    const lineCount = computed(() => code.value.split('\\n').length);
    const insertTab = () => {
      const el = codeArea.value;
      const start = el.selectionStart;
      code.value = code.value.slice(0, start) + '  ' + code.value.slice(el.selectionEnd);
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 2; });
    };
    const syncScroll = () => {
      if (lineNums.value && codeArea.value) lineNums.value.scrollTop = codeArea.value.scrollTop;
    };
    return { code, codeArea, lineNums, lineCount, insertTab, syncScroll };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-signature-pad',
    title: 'Signature Pad',
    description:
      'Create a canvas-based signature pad where users draw with mouse or touch. Supports clearing, undo, and exporting the signature as a data URL.',
    difficulty: 'advanced',
    category: 'forms-input',
    framework: 'vue',
    concepts: ['canvas API', 'onMounted', 'mouse/touch events', 'ref', 'template refs'],
    demoCode: {
      html: `<div id="app">
  <div class="sig-wrap">
    <h3>Sign Below</h3>
    <canvas ref="canvas" width="400" height="200" class="sig-canvas"
      @mousedown="startDraw" @mousemove="draw" @mouseup="stopDraw" @mouseleave="stopDraw"
      @touchstart.prevent="startDrawTouch" @touchmove.prevent="drawTouch" @touchend="stopDraw"></canvas>
    <div class="sig-btns">
      <button @click="clear">Clear</button>
      <button @click="save" class="save-btn">Save</button>
    </div>
    <p v-if="saved" class="sig-saved">Signature saved!</p>
  </div>
</div>`,
      css: `.sig-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.sig-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.sig-canvas {
  width: 100%; height: 200px; background: #0f172a; border-radius: 8px;
  border: 1px solid #334155; cursor: crosshair; display: block;
}
.sig-btns { display: flex; gap: 10px; margin-top: 12px; }
.sig-btns button {
  padding: 8px 20px; border-radius: 6px; border: 1px solid #334155;
  background: transparent; color: #e0e0e0; cursor: pointer;
}
.sig-btns button:hover { background: #1e293b; }
.save-btn { background: #4fc3f7 !important; color: #0f172a !important; border: none !important; }
.sig-saved { color: #22c55e; font-size: 13px; margin-top: 8px; }`,
      js: `const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    const canvas = ref(null);
    const saved = ref(false);
    let ctx, drawing = false;
    onMounted(() => {
      ctx = canvas.value.getContext('2d');
      ctx.strokeStyle = '#4fc3f7';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
    });
    const getPos = (e) => {
      const r = canvas.value.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const startDraw = (e) => { drawing = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); };
    const draw = (e) => { if (!drawing) return; const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); };
    const stopDraw = () => { drawing = false; };
    const startDrawTouch = (e) => { const t = e.touches[0]; startDraw(t); };
    const drawTouch = (e) => { const t = e.touches[0]; draw(t); };
    const clear = () => { ctx.clearRect(0, 0, canvas.value.width, canvas.value.height); saved.value = false; };
    const save = () => { saved.value = true; };
    return { canvas, saved, startDraw, draw, stopDraw, startDrawTouch, drawTouch, clear, save };
  }
}).mount('#app');`,
    },
  },
  // Interactive
  {
    id: 'vue-tooltip',
    title: 'Tooltip',
    description:
      'Build a reusable tooltip that appears on hover with configurable placement (top, bottom, left, right). Supports delay, arrow indicator, and smooth fade transitions.',
    difficulty: 'beginner',
    category: 'interactive',
    framework: 'vue',
    concepts: ['mouseenter', 'mouseleave', 'v-if', 'CSS transitions', 'positioning'],
    demoCode: {
      html: `<div id="app">
  <div class="tip-wrap">
    <h3>Hover the buttons</h3>
    <div class="tip-row">
      <div v-for="pos in positions" :key="pos" class="tip-container"
        @mouseenter="active = pos" @mouseleave="active = ''">
        <button class="tip-btn">{{ pos }}</button>
        <div v-if="active === pos" class="tooltip" :class="pos">
          Tooltip on {{ pos }}
          <div class="arrow"></div>
        </div>
      </div>
    </div>
  </div>
</div>`,
      css: `.tip-wrap { background: #1a1a2e; padding: 32px; border-radius: 12px; }
.tip-wrap h3 { color: #e0e0e0; margin: 0 0 24px; text-align: center; }
.tip-row { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
.tip-container { position: relative; display: inline-block; }
.tip-btn {
  padding: 10px 24px; border-radius: 6px; border: 1px solid #334155;
  background: #0f172a; color: #e0e0e0; cursor: pointer; text-transform: capitalize;
}
.tip-btn:hover { border-color: #4fc3f7; }
.tooltip {
  position: absolute; background: #334155; color: #e0e0e0; padding: 6px 12px;
  border-radius: 6px; font-size: 12px; white-space: nowrap; z-index: 10;
  animation: fadeIn 0.2s;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.tooltip.top { bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 8px; }
.tooltip.bottom { top: 100%; left: 50%; transform: translateX(-50%); margin-top: 8px; }
.tooltip.left { right: 100%; top: 50%; transform: translateY(-50%); margin-right: 8px; }
.tooltip.right { left: 100%; top: 50%; transform: translateY(-50%); margin-left: 8px; }
.arrow {
  position: absolute; width: 8px; height: 8px; background: #334155; transform: rotate(45deg);
}
.tooltip.top .arrow { bottom: -4px; left: 50%; margin-left: -4px; }
.tooltip.bottom .arrow { top: -4px; left: 50%; margin-left: -4px; }
.tooltip.left .arrow { right: -4px; top: 50%; margin-top: -4px; }
.tooltip.right .arrow { left: -4px; top: 50%; margin-top: -4px; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const positions = ['top', 'bottom', 'left', 'right'];
    const active = ref('');
    return { positions, active };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-popover',
    title: 'Popover',
    description:
      'Create a popover component that opens on click and closes on click-outside. Supports rich content, configurable placement, and backdrop overlay.',
    difficulty: 'beginner',
    category: 'interactive',
    framework: 'vue',
    concepts: ['v-if', 'click events', 'click-outside', 'CSS positioning'],
    demoCode: {
      html: `<div id="app">
  <div class="pop-wrap">
    <h3>Click the button</h3>
    <div class="pop-anchor">
      <button class="pop-trigger" @click="open = !open">Show Popover</button>
      <div v-if="open" class="popover">
        <div class="pop-header">Settings</div>
        <div class="pop-body">
          <label class="pop-opt"><input type="checkbox" checked /> Dark mode</label>
          <label class="pop-opt"><input type="checkbox" /> Compact view</label>
          <label class="pop-opt"><input type="checkbox" checked /> Sounds</label>
        </div>
        <button class="pop-close" @click="open = false">Done</button>
      </div>
    </div>
  </div>
</div>`,
      css: `.pop-wrap { background: #1a1a2e; padding: 32px; border-radius: 12px; text-align: center; }
.pop-wrap h3 { color: #e0e0e0; margin: 0 0 20px; }
.pop-anchor { position: relative; display: inline-block; }
.pop-trigger {
  padding: 10px 24px; border-radius: 6px; border: none;
  background: #4fc3f7; color: #0f172a; font-weight: 600; cursor: pointer;
}
.popover {
  position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
  margin-top: 10px; background: #1e293b; border: 1px solid #334155;
  border-radius: 10px; width: 220px; z-index: 10; animation: fadeIn 0.2s;
  text-align: left;
}
@keyframes fadeIn { from { opacity: 0; transform: translateX(-50%) translateY(-4px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
.pop-header { padding: 12px 14px; border-bottom: 1px solid #334155; color: #e0e0e0; font-weight: 600; font-size: 14px; }
.pop-body { padding: 10px 14px; }
.pop-opt { display: flex; align-items: center; gap: 8px; color: #94a3b8; font-size: 13px; padding: 6px 0; cursor: pointer; }
.pop-close {
  width: 100%; padding: 10px; border: none; border-top: 1px solid #334155;
  background: transparent; color: #4fc3f7; cursor: pointer; border-radius: 0 0 10px 10px;
}
.pop-close:hover { background: rgba(79,195,247,0.1); }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const open = ref(false);
    return { open };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-lightbox',
    title: 'Lightbox',
    description:
      'Build a lightbox gallery that opens images in a full-screen overlay. Supports next/previous navigation, keyboard controls, and swipe gestures.',
    difficulty: 'intermediate',
    category: 'interactive',
    framework: 'vue',
    concepts: ['v-if', 'v-for', 'keydown', 'onMounted', 'onUnmounted', 'transitions'],
    demoCode: {
      html: `<div id="app">
  <div class="lb-wrap">
    <h3>Image Gallery</h3>
    <div class="lb-grid">
      <div v-for="(img, i) in images" :key="i" class="lb-thumb" @click="openLb(i)">
        <div class="lb-placeholder" :style="{ background: img.color }">{{ img.label }}</div>
      </div>
    </div>
    <div v-if="current !== null" class="lb-overlay" @click.self="current = null">
      <button class="lb-nav lb-prev" @click="prev">&lsaquo;</button>
      <div class="lb-content">
        <div class="lb-img" :style="{ background: images[current].color }">{{ images[current].label }}</div>
        <p class="lb-caption">{{ images[current].label }} ({{ current + 1 }}/{{ images.length }})</p>
      </div>
      <button class="lb-nav lb-next" @click="next">&rsaquo;</button>
      <button class="lb-close" @click="current = null">&times;</button>
    </div>
  </div>
</div>`,
      css: `.lb-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.lb-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.lb-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.lb-thumb { cursor: pointer; border-radius: 8px; overflow: hidden; }
.lb-placeholder {
  height: 80px; display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 13px; font-weight: 600;
}
.lb-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 100;
  display: flex; align-items: center; justify-content: center;
}
.lb-content { text-align: center; }
.lb-img {
  width: 320px; height: 220px; border-radius: 10px; display: flex;
  align-items: center; justify-content: center; color: #fff; font-size: 18px;
}
.lb-caption { color: #94a3b8; margin-top: 12px; font-size: 14px; }
.lb-nav {
  position: absolute; top: 50%; transform: translateY(-50%);
  background: none; border: none; color: #e0e0e0; font-size: 48px; cursor: pointer; padding: 16px;
}
.lb-prev { left: 16px; }
.lb-next { right: 16px; }
.lb-close {
  position: absolute; top: 16px; right: 16px;
  background: none; border: none; color: #e0e0e0; font-size: 32px; cursor: pointer;
}`,
      js: `const { createApp, ref, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const images = [
      { label: 'Sunset', color: '#e65100' },
      { label: 'Ocean', color: '#0277bd' },
      { label: 'Forest', color: '#2e7d32' },
      { label: 'Desert', color: '#f9a825' },
      { label: 'Mountain', color: '#4e342e' },
      { label: 'City', color: '#37474f' },
    ];
    const current = ref(null);
    const openLb = (i) => { current.value = i; };
    const next = () => { current.value = (current.value + 1) % images.length; };
    const prev = () => { current.value = (current.value - 1 + images.length) % images.length; };
    const onKey = (e) => {
      if (current.value === null) return;
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'Escape') current.value = null;
    };
    onMounted(() => window.addEventListener('keydown', onKey));
    onUnmounted(() => window.removeEventListener('keydown', onKey));
    return { images, current, openLb, next, prev };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-sortable-list',
    title: 'Sortable List',
    description:
      'Build a drag-and-drop sortable list using native HTML5 drag events. Items can be reordered by dragging, with visual indicators showing the drop target.',
    difficulty: 'intermediate',
    category: 'interactive',
    framework: 'vue',
    concepts: ['dragstart', 'dragover', 'drop', 'reactive', 'v-for'],
    demoCode: {
      html: `<div id="app">
  <div class="sort-wrap">
    <h3>Drag to Reorder</h3>
    <div class="sort-list">
      <div v-for="(item, i) in items" :key="item.id" class="sort-item"
        :class="{ dragging: dragIdx === i, over: overIdx === i }"
        draggable="true" @dragstart="dragIdx = i" @dragover.prevent="overIdx = i"
        @drop="drop(i)" @dragend="dragIdx = null; overIdx = null">
        <span class="grip">&#9776;</span>
        <span>{{ item.text }}</span>
      </div>
    </div>
  </div>
</div>`,
      css: `.sort-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.sort-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.sort-list { display: flex; flex-direction: column; gap: 6px; }
.sort-item {
  display: flex; align-items: center; gap: 12px; padding: 12px 14px;
  background: #0f172a; border-radius: 8px; color: #e0e0e0; cursor: grab;
  border: 1px solid transparent; transition: border-color 0.15s, opacity 0.15s;
}
.sort-item.dragging { opacity: 0.4; }
.sort-item.over { border-color: #4fc3f7; }
.grip { color: #475569; font-size: 14px; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const items = ref([
      { id: 1, text: 'Learn Vue 3' },
      { id: 2, text: 'Build components' },
      { id: 3, text: 'Add routing' },
      { id: 4, text: 'Write tests' },
      { id: 5, text: 'Deploy app' },
    ]);
    const dragIdx = ref(null);
    const overIdx = ref(null);
    const drop = (to) => {
      const from = dragIdx.value;
      if (from === null || from === to) return;
      const moved = items.value.splice(from, 1)[0];
      items.value.splice(to, 0, moved);
    };
    return { items, dragIdx, overIdx, drop };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-resizable-panels',
    title: 'Resizable Panels',
    description:
      'Create a resizable panel layout with a draggable divider. Users can resize left and right panels by dragging the separator, with configurable min/max widths.',
    difficulty: 'intermediate',
    category: 'interactive',
    framework: 'vue',
    concepts: ['mousedown', 'mousemove', 'mouseup', 'ref', 'onMounted', 'onUnmounted'],
    demoCode: {
      html: `<div id="app">
  <div class="panels-wrap">
    <h3>Resizable Panels</h3>
    <div class="panels">
      <div class="panel left" :style="{ width: leftWidth + 'px' }">
        <p>Left Panel</p><p class="dim">{{ leftWidth }}px</p>
      </div>
      <div class="divider" @mousedown="startResize"></div>
      <div class="panel right">
        <p>Right Panel</p><p class="dim">Fills remaining space</p>
      </div>
    </div>
  </div>
</div>`,
      css: `.panels-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.panels-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.panels { display: flex; height: 200px; border-radius: 8px; overflow: hidden; border: 1px solid #334155; }
.panel { padding: 16px; overflow: auto; }
.panel p { color: #e0e0e0; margin: 0; font-size: 14px; }
.dim { color: #64748b; font-size: 12px; margin-top: 4px; }
.left { background: #0f172a; flex-shrink: 0; }
.right { background: #0a0a1a; flex: 1; }
.divider {
  width: 6px; background: #334155; cursor: col-resize; flex-shrink: 0;
  transition: background 0.15s;
}
.divider:hover { background: #4fc3f7; }`,
      js: `const { createApp, ref, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const leftWidth = ref(200);
    let resizing = false;
    const startResize = () => { resizing = true; };
    const onMove = (e) => {
      if (!resizing) return;
      leftWidth.value = Math.max(100, Math.min(400, e.clientX - 40));
    };
    const stopResize = () => { resizing = false; };
    onMounted(() => {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', stopResize);
    });
    onUnmounted(() => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', stopResize);
    });
    return { leftWidth, startResize };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-split-view',
    title: 'Split View',
    description:
      'Build a split-view editor with a code pane and preview pane side by side. The preview updates live as the user types, with a toggle for horizontal/vertical split.',
    difficulty: 'intermediate',
    category: 'interactive',
    framework: 'vue',
    concepts: ['v-model', 'computed', 'v-html', 'ref', 'layout toggling'],
    demoCode: {
      html: `<div id="app">
  <div class="split-wrap">
    <div class="split-toolbar">
      <h3>Split View Editor</h3>
      <button @click="vertical = !vertical">{{ vertical ? 'Horizontal' : 'Vertical' }}</button>
    </div>
    <div class="split-panes" :class="{ vertical }">
      <div class="pane editor-pane">
        <textarea v-model="content" placeholder="Write some HTML..."></textarea>
      </div>
      <div class="pane preview-pane" v-html="content"></div>
    </div>
  </div>
</div>`,
      css: `.split-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.split-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.split-toolbar h3 { color: #e0e0e0; margin: 0; }
.split-toolbar button {
  padding: 6px 14px; border-radius: 6px; border: 1px solid #334155;
  background: transparent; color: #e0e0e0; cursor: pointer; font-size: 12px;
}
.split-panes { display: flex; gap: 2px; height: 200px; border-radius: 8px; overflow: hidden; }
.split-panes.vertical { flex-direction: column; }
.pane { flex: 1; overflow: auto; }
.editor-pane textarea {
  width: 100%; height: 100%; padding: 12px; border: none;
  background: #0f172a; color: #e0e0e0; outline: none; resize: none;
  font-family: monospace; font-size: 13px;
}
.preview-pane {
  background: #0a0a1a; padding: 12px; color: #e0e0e0; font-size: 14px;
}`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const content = ref('<h2 style="color:#4fc3f7">Hello!</h2>\\n<p>Edit me and see live preview.</p>');
    const vertical = ref(false);
    return { content, vertical };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-kanban-board',
    title: 'Kanban Board',
    description:
      'Create a Kanban board with columns (To Do, In Progress, Done). Cards can be dragged between columns using HTML5 drag-and-drop with visual feedback.',
    difficulty: 'advanced',
    category: 'interactive',
    framework: 'vue',
    concepts: ['reactive', 'drag-and-drop', 'v-for', 'data transfer'],
    demoCode: {
      html: `<div id="app">
  <div class="kb-wrap">
    <h3>Kanban Board</h3>
    <div class="kb-board">
      <div v-for="col in columns" :key="col.name" class="kb-col"
        @dragover.prevent @drop="dropCard(col.name, $event)"
        :class="{ dragover: dragOverCol === col.name }"
        @dragenter.prevent="dragOverCol = col.name" @dragleave="dragOverCol = null">
        <div class="kb-col-header">{{ col.name }} <span class="count">{{ col.cards.length }}</span></div>
        <div v-for="card in col.cards" :key="card" class="kb-card"
          draggable="true" @dragstart="startDrag(col.name, card)">{{ card }}</div>
      </div>
    </div>
  </div>
</div>`,
      css: `.kb-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.kb-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.kb-board { display: flex; gap: 12px; }
.kb-col {
  flex: 1; background: #0f172a; border-radius: 10px; padding: 12px; min-height: 200px;
  border: 2px solid transparent; transition: border-color 0.15s;
}
.kb-col.dragover { border-color: #4fc3f7; }
.kb-col-header {
  color: #94a3b8; font-size: 13px; font-weight: 600; text-transform: uppercase;
  margin-bottom: 10px; display: flex; justify-content: space-between;
}
.count { background: #334155; padding: 1px 8px; border-radius: 10px; font-size: 11px; }
.kb-card {
  background: #1e293b; color: #e0e0e0; padding: 10px 12px; border-radius: 6px;
  margin-bottom: 8px; cursor: grab; font-size: 13px;
  border-left: 3px solid #4fc3f7;
}
.kb-card:active { cursor: grabbing; }`,
      js: `const { createApp, reactive, ref } = Vue;

createApp({
  setup() {
    const columns = reactive([
      { name: 'To Do', cards: ['Design mockups', 'Write specs', 'Setup CI'] },
      { name: 'In Progress', cards: ['Build API', 'Auth module'] },
      { name: 'Done', cards: ['Project setup'] },
    ]);
    const dragOverCol = ref(null);
    let dragData = { from: '', card: '' };
    const startDrag = (col, card) => { dragData = { from: col, card }; };
    const dropCard = (toCol) => {
      dragOverCol.value = null;
      const fromCol = columns.find(c => c.name === dragData.from);
      const to = columns.find(c => c.name === toCol);
      if (!fromCol || !to || dragData.from === toCol) return;
      fromCol.cards = fromCol.cards.filter(c => c !== dragData.card);
      to.cards.push(dragData.card);
    };
    return { columns, dragOverCol, startDrag, dropCard };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-timeline',
    title: 'Timeline',
    description:
      'Build a vertical timeline component with dated entries, icons, and alternating left/right layout. Supports expandable entries and animated reveal on scroll.',
    difficulty: 'beginner',
    category: 'interactive',
    framework: 'vue',
    concepts: ['v-for', 'class binding', 'CSS pseudo-elements'],
    demoCode: {
      html: `<div id="app">
  <div class="tl-wrap">
    <h3>Project Timeline</h3>
    <div class="timeline">
      <div v-for="(evt, i) in events" :key="i" class="tl-item" :class="{ alt: i % 2 }">
        <div class="tl-dot"></div>
        <div class="tl-card">
          <div class="tl-date">{{ evt.date }}</div>
          <div class="tl-title">{{ evt.title }}</div>
          <div class="tl-desc">{{ evt.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</div>`,
      css: `.tl-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.tl-wrap h3 { color: #e0e0e0; margin: 0 0 16px; }
.timeline { position: relative; padding-left: 30px; }
.timeline::before {
  content: ''; position: absolute; left: 10px; top: 0; bottom: 0;
  width: 2px; background: #334155;
}
.tl-item { position: relative; margin-bottom: 20px; }
.tl-dot {
  position: absolute; left: -24px; top: 6px; width: 12px; height: 12px;
  border-radius: 50%; background: #4fc3f7; border: 2px solid #1a1a2e;
}
.tl-card { background: #0f172a; border-radius: 8px; padding: 14px; }
.tl-date { color: #4fc3f7; font-size: 11px; margin-bottom: 4px; }
.tl-title { color: #e0e0e0; font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.tl-desc { color: #94a3b8; font-size: 13px; }`,
      js: `const { createApp } = Vue;

createApp({
  setup() {
    const events = [
      { date: 'Jan 2025', title: 'Project Kickoff', desc: 'Initial planning and team setup.' },
      { date: 'Feb 2025', title: 'Design Phase', desc: 'Created wireframes and mockups.' },
      { date: 'Mar 2025', title: 'Development Start', desc: 'Built core features and API.' },
      { date: 'Apr 2025', title: 'Beta Launch', desc: 'Released to beta testers.' },
      { date: 'May 2025', title: 'Public Release', desc: 'Launched to production.' },
    ];
    return { events };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-tree-view',
    title: 'Tree View',
    description:
      'Build a recursive tree view component that renders nested data with expand/collapse toggles. Supports selection, icons for files vs folders, and indentation.',
    difficulty: 'intermediate',
    category: 'interactive',
    framework: 'vue',
    concepts: ['recursive rendering', 'v-for', 'v-if', 'reactive', 'click events'],
    demoCode: {
      html: `<div id="app">
  <div class="tree-wrap">
    <h3>File Explorer</h3>
    <div class="tree">
      <div v-for="node in tree" :key="node.name">
        <div class="tree-node" @click="toggle(node)">
          <span v-if="node.children" class="icon">{{ node.open ? '&#9660;' : '&#9654;' }}</span>
          <span v-else class="icon file-icon">&#9679;</span>
          <span :class="{ folder: !!node.children }">{{ node.name }}</span>
        </div>
        <div v-if="node.open && node.children" class="tree-children">
          <div v-for="child in node.children" :key="child.name" class="tree-node" @click="toggle(child)">
            <span v-if="child.children" class="icon">{{ child.open ? '&#9660;' : '&#9654;' }}</span>
            <span v-else class="icon file-icon">&#9679;</span>
            <span :class="{ folder: !!child.children }">{{ child.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
      css: `.tree-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.tree-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.tree { background: #0f172a; border-radius: 8px; padding: 12px; }
.tree-node {
  display: flex; align-items: center; gap: 6px; padding: 5px 8px;
  color: #e0e0e0; cursor: pointer; font-size: 13px; border-radius: 4px;
}
.tree-node:hover { background: rgba(79,195,247,0.1); }
.icon { color: #4fc3f7; font-size: 10px; width: 14px; text-align: center; }
.file-icon { color: #64748b; font-size: 8px; }
.folder { font-weight: 600; }
.tree-children { padding-left: 20px; }`,
      js: `const { createApp, reactive } = Vue;

createApp({
  setup() {
    const tree = reactive([
      { name: 'src', open: true, children: [
        { name: 'components', open: false, children: [
          { name: 'Button.vue' }, { name: 'Modal.vue' }, { name: 'Card.vue' }
        ]},
        { name: 'utils', open: false, children: [
          { name: 'helpers.ts' }, { name: 'api.ts' }
        ]},
        { name: 'App.vue' }, { name: 'main.ts' }
      ]},
      { name: 'public', open: false, children: [{ name: 'index.html' }, { name: 'favicon.ico' }] },
      { name: 'package.json' }, { name: 'tsconfig.json' },
    ]);
    const toggle = (node) => { if (node.children) node.open = !node.open; };
    return { tree, toggle };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-collapsible-panel',
    title: 'Collapsible Panel',
    description:
      'Create smooth collapsible/expandable panels with animated height transitions. Supports multiple panels open simultaneously or exclusive accordion mode.',
    difficulty: 'beginner',
    category: 'interactive',
    framework: 'vue',
    concepts: ['v-for', 'ref', 'CSS max-height transition', 'click events'],
    demoCode: {
      html: `<div id="app">
  <div class="coll-wrap">
    <h3>FAQ</h3>
    <div v-for="(item, i) in items" :key="i" class="coll-panel">
      <button class="coll-header" @click="toggle(i)" :class="{ open: item.open }">
        {{ item.q }}
        <span class="coll-arrow">{{ item.open ? '&#9650;' : '&#9660;' }}</span>
      </button>
      <div class="coll-body" :class="{ expanded: item.open }">
        <div class="coll-content">{{ item.a }}</div>
      </div>
    </div>
  </div>
</div>`,
      css: `.coll-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.coll-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.coll-panel { margin-bottom: 8px; border-radius: 8px; overflow: hidden; border: 1px solid #334155; }
.coll-header {
  width: 100%; padding: 12px 14px; background: #0f172a; border: none;
  color: #e0e0e0; cursor: pointer; font-size: 14px; text-align: left;
  display: flex; justify-content: space-between; align-items: center;
}
.coll-header.open { background: #1e293b; }
.coll-arrow { color: #4fc3f7; font-size: 10px; }
.coll-body { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
.coll-body.expanded { max-height: 200px; }
.coll-content { padding: 12px 14px; color: #94a3b8; font-size: 13px; background: #0a0a1a; }`,
      js: `const { createApp, reactive } = Vue;

createApp({
  setup() {
    const items = reactive([
      { q: 'What is Vue.js?', a: 'Vue.js is a progressive JavaScript framework for building user interfaces.', open: false },
      { q: 'Is Vue easy to learn?', a: 'Yes! Vue has a gentle learning curve and excellent documentation.', open: false },
      { q: 'Does Vue support TypeScript?', a: 'Vue 3 has first-class TypeScript support with the Composition API.', open: false },
      { q: 'What about state management?', a: 'Vue recommends Pinia for state management, replacing Vuex.', open: false },
    ]);
    const toggle = (i) => { items[i].open = !items[i].open; };
    return { items, toggle };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-drawer',
    title: 'Drawer',
    description:
      'Build a slide-out drawer panel that opens from the left or right edge. Includes a backdrop overlay, close on escape/click-outside, and smooth CSS transitions.',
    difficulty: 'beginner',
    category: 'interactive',
    framework: 'vue',
    concepts: ['v-if', 'CSS transitions', 'keydown', 'onMounted', 'onUnmounted'],
    demoCode: {
      html: `<div id="app">
  <div class="drawer-wrap">
    <h3>Drawer Component</h3>
    <button class="open-btn" @click="open = true">Open Drawer</button>
    <div v-if="open" class="drawer-backdrop" @click="open = false"></div>
    <div class="drawer-panel" :class="{ open: open }">
      <div class="drawer-header">
        <span>Menu</span>
        <button @click="open = false">&times;</button>
      </div>
      <div class="drawer-body">
        <a v-for="item in menu" :key="item" class="drawer-link">{{ item }}</a>
      </div>
    </div>
  </div>
</div>`,
      css: `.drawer-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.drawer-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.open-btn {
  padding: 10px 24px; border-radius: 6px; border: none;
  background: #4fc3f7; color: #0f172a; font-weight: 600; cursor: pointer;
}
.drawer-backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 50;
}
.drawer-panel {
  position: fixed; top: 0; left: 0; bottom: 0; width: 280px;
  background: #0f172a; z-index: 60; transform: translateX(-100%);
  transition: transform 0.3s ease; display: flex; flex-direction: column;
}
.drawer-panel.open { transform: translateX(0); }
.drawer-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px; border-bottom: 1px solid #334155;
  color: #e0e0e0; font-weight: 600;
}
.drawer-header button { background: none; border: none; color: #e0e0e0; font-size: 24px; cursor: pointer; }
.drawer-body { padding: 8px 0; flex: 1; }
.drawer-link {
  display: block; padding: 12px 16px; color: #94a3b8; text-decoration: none;
  font-size: 14px; cursor: pointer;
}
.drawer-link:hover { background: rgba(79,195,247,0.1); color: #e0e0e0; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const open = ref(false);
    const menu = ['Dashboard', 'Projects', 'Settings', 'Profile', 'Help'];
    return { open, menu };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-bottom-sheet',
    title: 'Bottom Sheet',
    description:
      'Create a mobile-style bottom sheet that slides up from the bottom of the screen. Supports drag-to-dismiss, snap points, and backdrop overlay.',
    difficulty: 'intermediate',
    category: 'interactive',
    framework: 'vue',
    concepts: ['CSS transforms', 'touch events', 'ref', 'transitions'],
    demoCode: {
      html: `<div id="app">
  <div class="bs-wrap">
    <h3>Bottom Sheet</h3>
    <button class="bs-trigger" @click="open = true">Open Sheet</button>
    <div v-if="open" class="bs-backdrop" @click="open = false"></div>
    <div class="bs-sheet" :class="{ open: open }">
      <div class="bs-handle" @click="open = false"><div class="handle-bar"></div></div>
      <div class="bs-content">
        <h4>Share with</h4>
        <div class="bs-options">
          <div v-for="opt in options" :key="opt.name" class="bs-opt">
            <div class="bs-icon" :style="{ background: opt.color }">{{ opt.icon }}</div>
            <span>{{ opt.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
      css: `.bs-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.bs-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.bs-trigger {
  padding: 10px 24px; border-radius: 6px; border: none;
  background: #4fc3f7; color: #0f172a; font-weight: 600; cursor: pointer;
}
.bs-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 50; }
.bs-sheet {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 60;
  background: #1e293b; border-radius: 16px 16px 0 0;
  transform: translateY(100%); transition: transform 0.3s ease;
  max-height: 60vh;
}
.bs-sheet.open { transform: translateY(0); }
.bs-handle {
  padding: 12px; text-align: center; cursor: pointer;
}
.handle-bar { width: 40px; height: 4px; background: #475569; border-radius: 2px; margin: 0 auto; }
.bs-content { padding: 0 20px 24px; }
.bs-content h4 { color: #e0e0e0; margin: 0 0 16px; }
.bs-options { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.bs-opt { text-align: center; cursor: pointer; }
.bs-icon {
  width: 48px; height: 48px; border-radius: 50%; margin: 0 auto 6px;
  display: flex; align-items: center; justify-content: center; font-size: 20px;
}
.bs-opt span { color: #94a3b8; font-size: 11px; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const open = ref(false);
    const options = [
      { name: 'Email', icon: '✉', color: '#ef4444' },
      { name: 'Copy', icon: '⎘', color: '#3b82f6' },
      { name: 'Save', icon: '↓', color: '#22c55e' },
      { name: 'Print', icon: '⎙', color: '#f59e0b' },
    ];
    return { open, options };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-command-palette',
    title: 'Command Palette',
    description:
      'Build a VS Code-style command palette that opens with Ctrl+K. Includes fuzzy search filtering, keyboard navigation, and grouped command categories.',
    difficulty: 'advanced',
    category: 'interactive',
    framework: 'vue',
    concepts: [
      'keydown',
      'computed',
      'v-for',
      'ref',
      'onMounted',
      'onUnmounted',
      'focus management',
    ],
    demoCode: {
      html: `<div id="app">
  <div class="cp-wrap">
    <h3>Command Palette</h3>
    <p class="cp-hint">Press <kbd>Ctrl+K</kbd> or click below</p>
    <button class="cp-trigger" @click="open = true">Open Palette</button>
    <div v-if="open" class="cp-overlay" @click.self="open = false">
      <div class="cp-dialog">
        <input ref="searchInput" v-model="query" class="cp-search" placeholder="Type a command..."
          @keydown.down.prevent="hlDown" @keydown.up.prevent="hlUp"
          @keydown.enter.prevent="execute" @keydown.escape="open = false" />
        <div class="cp-list">
          <div v-for="(cmd, i) in filtered" :key="cmd.name" class="cp-item"
            :class="{ hl: hlIdx === i }" @click="run(cmd)" @mouseenter="hlIdx = i">
            <span class="cp-icon">{{ cmd.icon }}</span>
            <span>{{ cmd.name }}</span>
            <span class="cp-shortcut" v-if="cmd.shortcut">{{ cmd.shortcut }}</span>
          </div>
          <div v-if="!filtered.length" class="cp-empty">No results</div>
        </div>
      </div>
    </div>
  </div>
</div>`,
      css: `.cp-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.cp-wrap h3 { color: #e0e0e0; margin: 0 0 8px; }
.cp-hint { color: #64748b; font-size: 13px; margin-bottom: 12px; }
kbd { background: #334155; padding: 2px 6px; border-radius: 4px; color: #e0e0e0; font-size: 12px; }
.cp-trigger {
  padding: 10px 24px; border-radius: 6px; border: none;
  background: #4fc3f7; color: #0f172a; font-weight: 600; cursor: pointer;
}
.cp-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 100;
  display: flex; align-items: flex-start; justify-content: center; padding-top: 15vh;
}
.cp-dialog {
  background: #0f172a; border: 1px solid #334155; border-radius: 12px;
  width: 420px; max-height: 350px; overflow: hidden;
}
.cp-search {
  width: 100%; padding: 14px 16px; border: none; border-bottom: 1px solid #334155;
  background: transparent; color: #e0e0e0; outline: none; font-size: 15px;
}
.cp-list { max-height: 280px; overflow-y: auto; padding: 4px 0; }
.cp-item {
  display: flex; align-items: center; gap: 10px; padding: 10px 16px;
  color: #e0e0e0; cursor: pointer; font-size: 14px;
}
.cp-item.hl { background: rgba(79,195,247,0.12); }
.cp-icon { font-size: 16px; width: 20px; text-align: center; }
.cp-shortcut { margin-left: auto; color: #64748b; font-size: 11px; }
.cp-empty { padding: 20px; text-align: center; color: #64748b; }`,
      js: `const { createApp, ref, computed, watch, onMounted, onUnmounted, nextTick } = Vue;

createApp({
  setup() {
    const open = ref(false);
    const query = ref('');
    const hlIdx = ref(0);
    const searchInput = ref(null);
    const commands = [
      { name: 'New File', icon: '+', shortcut: 'Ctrl+N' },
      { name: 'Open File', icon: '↑', shortcut: 'Ctrl+O' },
      { name: 'Save', icon: '↓', shortcut: 'Ctrl+S' },
      { name: 'Find', icon: '⌕', shortcut: 'Ctrl+F' },
      { name: 'Toggle Theme', icon: '☾', shortcut: '' },
      { name: 'Settings', icon: '⚙', shortcut: 'Ctrl+,' },
      { name: 'Terminal', icon: '>', shortcut: 'Ctrl+\\u0060' },
    ];
    const filtered = computed(() =>
      commands.filter(c => c.name.toLowerCase().includes(query.value.toLowerCase()))
    );
    const run = (cmd) => { open.value = false; query.value = ''; };
    const execute = () => { if (filtered.value[hlIdx.value]) run(filtered.value[hlIdx.value]); };
    const hlDown = () => { if (hlIdx.value < filtered.value.length - 1) hlIdx.value++; };
    const hlUp = () => { if (hlIdx.value > 0) hlIdx.value--; };
    watch(open, (v) => { if (v) { query.value = ''; hlIdx.value = 0; nextTick(() => searchInput.value?.focus()); } });
    const onKey = (e) => { if (e.ctrlKey && e.key === 'k') { e.preventDefault(); open.value = !open.value; } };
    onMounted(() => window.addEventListener('keydown', onKey));
    onUnmounted(() => window.removeEventListener('keydown', onKey));
    return { open, query, hlIdx, searchInput, filtered, run, execute, hlDown, hlUp };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-spotlight-search',
    title: 'Spotlight Search',
    description:
      'Create a macOS Spotlight-style search overlay with categorized results, recent searches, and real-time filtering across different content types.',
    difficulty: 'advanced',
    category: 'interactive',
    framework: 'vue',
    concepts: ['computed', 'v-for', 'ref', 'watch', 'onMounted', 'onUnmounted'],
    demoCode: {
      html: `<div id="app">
  <div class="sl-wrap">
    <h3>Spotlight Search</h3>
    <button class="sl-trigger" @click="open = true">Search Everything</button>
    <div v-if="open" class="sl-overlay" @click.self="open = false">
      <div class="sl-box">
        <div class="sl-input-row">
          <span class="sl-mag">&#x2315;</span>
          <input ref="slInput" v-model="query" placeholder="Search..." @keydown.escape="open = false" />
        </div>
        <div class="sl-results" v-if="query">
          <div v-for="group in groupedResults" :key="group.category" class="sl-group">
            <div class="sl-cat">{{ group.category }}</div>
            <div v-for="r in group.items" :key="r.name" class="sl-result" @click="open = false">
              {{ r.name }} <span class="sl-type">{{ r.type }}</span>
            </div>
          </div>
          <div v-if="!groupedResults.length" class="sl-empty">No results for "{{ query }}"</div>
        </div>
        <div v-else class="sl-recent">
          <div class="sl-cat">Recent</div>
          <div v-for="r in recent" :key="r" class="sl-result">{{ r }}</div>
        </div>
      </div>
    </div>
  </div>
</div>`,
      css: `.sl-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.sl-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.sl-trigger { padding: 10px 24px; border-radius: 6px; border: none; background: #4fc3f7; color: #0f172a; font-weight: 600; cursor: pointer; }
.sl-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 100; display: flex; align-items: flex-start; justify-content: center; padding-top: 12vh; }
.sl-box { background: #0f172a; border: 1px solid #334155; border-radius: 14px; width: 480px; overflow: hidden; }
.sl-input-row { display: flex; align-items: center; padding: 12px 16px; border-bottom: 1px solid #334155; }
.sl-mag { color: #64748b; font-size: 18px; margin-right: 10px; }
.sl-input-row input { flex: 1; background: transparent; border: none; color: #e0e0e0; outline: none; font-size: 16px; }
.sl-results, .sl-recent { max-height: 300px; overflow-y: auto; padding: 8px 0; }
.sl-group { margin-bottom: 4px; }
.sl-cat { padding: 4px 16px; color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 600; }
.sl-result { padding: 8px 16px; color: #e0e0e0; cursor: pointer; font-size: 14px; display: flex; justify-content: space-between; }
.sl-result:hover { background: rgba(79,195,247,0.1); }
.sl-type { color: #64748b; font-size: 11px; }
.sl-empty { padding: 24px; text-align: center; color: #64748b; }`,
      js: `const { createApp, ref, computed, watch, nextTick } = Vue;

createApp({
  setup() {
    const open = ref(false);
    const query = ref('');
    const slInput = ref(null);
    const recent = ['App.vue', 'Settings', 'Deploy'];
    const allItems = [
      { name: 'App.vue', type: 'file', category: 'Files' },
      { name: 'Header.vue', type: 'file', category: 'Files' },
      { name: 'Settings', type: 'page', category: 'Pages' },
      { name: 'Dashboard', type: 'page', category: 'Pages' },
      { name: 'Deploy to prod', type: 'action', category: 'Actions' },
      { name: 'Run tests', type: 'action', category: 'Actions' },
    ];
    const groupedResults = computed(() => {
      const q = query.value.toLowerCase();
      const matched = allItems.filter(i => i.name.toLowerCase().includes(q));
      const groups = {};
      matched.forEach(i => { (groups[i.category] = groups[i.category] || []).push(i); });
      return Object.entries(groups).map(([category, items]) => ({ category, items }));
    });
    watch(open, (v) => { if (v) { query.value = ''; nextTick(() => slInput.value?.focus()); } });
    return { open, query, slInput, recent, groupedResults };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-floating-action-btn',
    title: 'Floating Action Button',
    description:
      'Build a Material Design-style floating action button (FAB) with an expandable speed dial of sub-actions. Includes tooltip labels and smooth animation.',
    difficulty: 'beginner',
    category: 'interactive',
    framework: 'vue',
    concepts: ['v-for', 'v-if', 'CSS transitions', 'click events'],
    demoCode: {
      html: `<div id="app">
  <div class="fab-wrap">
    <h3>Floating Action Button</h3>
    <div class="fab-area">
      <p class="fab-placeholder">Scroll or interact with the page content here.</p>
      <div class="fab-container">
        <div v-if="expanded" class="fab-actions">
          <div v-for="action in actions" :key="action.label" class="fab-action" @click="expanded = false">
            <span class="fab-label">{{ action.label }}</span>
            <button class="fab-sub" :style="{ background: action.color }">{{ action.icon }}</button>
          </div>
        </div>
        <button class="fab-main" :class="{ open: expanded }" @click="expanded = !expanded">
          {{ expanded ? '✕' : '+' }}
        </button>
      </div>
    </div>
  </div>
</div>`,
      css: `.fab-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.fab-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.fab-area { position: relative; height: 260px; background: #0f172a; border-radius: 8px; }
.fab-placeholder { color: #475569; text-align: center; padding-top: 60px; font-size: 14px; }
.fab-container { position: absolute; bottom: 20px; right: 20px; display: flex; flex-direction: column; align-items: flex-end; }
.fab-actions { display: flex; flex-direction: column; gap: 10px; margin-bottom: 12px; animation: fadeUp 0.2s; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.fab-action { display: flex; align-items: center; gap: 8px; }
.fab-label { background: #334155; color: #e0e0e0; padding: 4px 10px; border-radius: 4px; font-size: 12px; }
.fab-sub { width: 40px; height: 40px; border-radius: 50%; border: none; color: #fff; font-size: 16px; cursor: pointer; }
.fab-main {
  width: 56px; height: 56px; border-radius: 50%; border: none;
  background: #4fc3f7; color: #0f172a; font-size: 28px; cursor: pointer;
  transition: transform 0.3s; box-shadow: 0 4px 12px rgba(79,195,247,0.3);
}
.fab-main.open { transform: rotate(45deg); background: #ef4444; color: #fff; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const expanded = ref(false);
    const actions = [
      { label: 'Upload', icon: '↑', color: '#3b82f6' },
      { label: 'Share', icon: '↗', color: '#22c55e' },
      { label: 'Edit', icon: '✎', color: '#f59e0b' },
    ];
    return { expanded, actions };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-skeleton-loader',
    title: 'Skeleton Loader',
    description:
      'Create animated skeleton loading placeholders that match content layout. Shows pulsing placeholder shapes while data is loading, then transitions to real content.',
    difficulty: 'beginner',
    category: 'interactive',
    framework: 'vue',
    concepts: ['v-if', 'v-else', 'ref', 'setTimeout', 'CSS animations'],
    demoCode: {
      html: `<div id="app">
  <div class="skel-wrap">
    <h3>Skeleton Loader</h3>
    <button class="skel-btn" @click="reload">{{ loading ? 'Loading...' : 'Reload' }}</button>
    <div class="skel-cards">
      <div v-for="i in 3" :key="i" class="skel-card">
        <template v-if="loading">
          <div class="skel skel-avatar"></div>
          <div class="skel skel-title"></div>
          <div class="skel skel-text"></div>
          <div class="skel skel-text short"></div>
        </template>
        <template v-else>
          <div class="real-avatar">U{{ i }}</div>
          <div class="real-title">User {{ i }}</div>
          <div class="real-text">This is the loaded content for card {{ i }}.</div>
        </template>
      </div>
    </div>
  </div>
</div>`,
      css: `.skel-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.skel-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.skel-btn {
  padding: 8px 20px; border-radius: 6px; border: none;
  background: #4fc3f7; color: #0f172a; font-weight: 600; cursor: pointer; margin-bottom: 14px;
}
.skel-cards { display: flex; gap: 12px; }
.skel-card { flex: 1; background: #0f172a; border-radius: 8px; padding: 16px; }
.skel { background: #1e293b; border-radius: 6px; animation: pulse 1.5s infinite; }
@keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
.skel-avatar { width: 40px; height: 40px; border-radius: 50%; margin-bottom: 12px; }
.skel-title { height: 14px; width: 60%; margin-bottom: 10px; }
.skel-text { height: 10px; width: 100%; margin-bottom: 6px; }
.skel-text.short { width: 70%; }
.real-avatar {
  width: 40px; height: 40px; border-radius: 50%; background: #4fc3f7;
  display: flex; align-items: center; justify-content: center;
  color: #0f172a; font-weight: 700; margin-bottom: 12px;
}
.real-title { color: #e0e0e0; font-weight: 600; font-size: 14px; margin-bottom: 6px; }
.real-text { color: #94a3b8; font-size: 13px; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const loading = ref(true);
    const reload = () => { loading.value = true; setTimeout(() => { loading.value = false; }, 2000); };
    setTimeout(() => { loading.value = false; }, 2000);
    return { loading, reload };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-progress-bar',
    title: 'Progress Bar',
    description:
      'Build animated progress bars with labels, percentages, and color coding. Supports determinate/indeterminate modes, striped patterns, and step progress.',
    difficulty: 'beginner',
    category: 'interactive',
    framework: 'vue',
    concepts: ['ref', 'computed', 'style binding', 'CSS animations', 'setInterval'],
    demoCode: {
      html: `<div id="app">
  <div class="pb-wrap">
    <h3>Progress Bars</h3>
    <div class="pb-item" v-for="bar in bars" :key="bar.label">
      <div class="pb-header">
        <span>{{ bar.label }}</span>
        <span>{{ bar.value }}%</span>
      </div>
      <div class="pb-track">
        <div class="pb-fill" :style="{ width: bar.value + '%', background: bar.color }"></div>
      </div>
    </div>
    <div class="pb-item">
      <div class="pb-header"><span>Indeterminate</span></div>
      <div class="pb-track"><div class="pb-fill indeterminate"></div></div>
    </div>
    <button class="pb-btn" @click="randomize">Randomize</button>
  </div>
</div>`,
      css: `.pb-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.pb-wrap h3 { color: #e0e0e0; margin: 0 0 16px; }
.pb-item { margin-bottom: 14px; }
.pb-header { display: flex; justify-content: space-between; color: #94a3b8; font-size: 13px; margin-bottom: 6px; }
.pb-track { height: 8px; background: #0f172a; border-radius: 4px; overflow: hidden; }
.pb-fill { height: 100%; border-radius: 4px; transition: width 0.5s ease; }
.pb-fill.indeterminate {
  width: 40%; background: #4fc3f7; animation: indeterminate 1.5s infinite;
}
@keyframes indeterminate { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }
.pb-btn {
  margin-top: 4px; padding: 8px 20px; border-radius: 6px; border: none;
  background: #4fc3f7; color: #0f172a; font-weight: 600; cursor: pointer;
}`,
      js: `const { createApp, reactive } = Vue;

createApp({
  setup() {
    const bars = reactive([
      { label: 'Upload', value: 72, color: '#4fc3f7' },
      { label: 'Processing', value: 45, color: '#22c55e' },
      { label: 'Storage', value: 90, color: '#f59e0b' },
    ]);
    const randomize = () => {
      bars.forEach(b => { b.value = Math.floor(Math.random() * 100); });
    };
    return { bars, randomize };
  }
}).mount('#app');`,
    },
  },
  // Data Display
  {
    id: 'vue-badge',
    title: 'Badge',
    description:
      'Create a badge/pill component with variant styles (success, warning, error, info), sizes, and optional dot indicators. Supports removable badges with close buttons.',
    difficulty: 'beginner',
    category: 'data-display',
    framework: 'vue',
    concepts: ['v-for', 'class binding', 'props pattern', 'dynamic styling'],
    demoCode: {
      html: `<div id="app">
  <div class="badge-wrap">
    <h3>Badges</h3>
    <div class="badge-row">
      <span v-for="b in badges" :key="b.label" class="badge" :class="b.variant">
        <span v-if="b.dot" class="badge-dot"></span>
        {{ b.label }}
        <button v-if="b.removable" @click="remove(b)" class="badge-close">&times;</button>
      </span>
    </div>
  </div>
</div>`,
      css: `.badge-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.badge-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.badge-row { display: flex; gap: 8px; flex-wrap: wrap; }
.badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;
}
.badge.info { background: rgba(79,195,247,0.15); color: #4fc3f7; }
.badge.success { background: rgba(34,197,94,0.15); color: #22c55e; }
.badge.warning { background: rgba(245,158,11,0.15); color: #f59e0b; }
.badge.error { background: rgba(239,68,68,0.15); color: #ef4444; }
.badge-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.badge-close { background: none; border: none; color: inherit; cursor: pointer; font-size: 14px; opacity: 0.7; }
.badge-close:hover { opacity: 1; }`,
      js: `const { createApp, reactive } = Vue;

createApp({
  setup() {
    const badges = reactive([
      { label: 'Active', variant: 'success', dot: true, removable: false },
      { label: 'Pending', variant: 'warning', dot: true, removable: false },
      { label: 'Error', variant: 'error', dot: false, removable: true },
      { label: 'Info', variant: 'info', dot: false, removable: true },
      { label: 'New', variant: 'info', dot: false, removable: true },
    ]);
    const remove = (b) => { const idx = badges.indexOf(b); if (idx >= 0) badges.splice(idx, 1); };
    return { badges, remove };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-avatar',
    title: 'Avatar',
    description:
      'Build an avatar component supporting images, initials fallback, and status indicators. Includes size variants, rounded shapes, and stacked avatar groups.',
    difficulty: 'beginner',
    category: 'data-display',
    framework: 'vue',
    concepts: ['v-for', 'computed', 'class binding', 'style binding'],
    demoCode: {
      html: `<div id="app">
  <div class="av-wrap">
    <h3>Avatars</h3>
    <div class="av-row">
      <div v-for="user in users" :key="user.name" class="avatar" :class="user.size"
        :style="{ background: user.color }">
        <span class="av-initials">{{ user.initials }}</span>
        <span v-if="user.status" class="av-status" :class="user.status"></span>
      </div>
    </div>
    <h4>Stacked</h4>
    <div class="av-stack">
      <div v-for="user in users.slice(0, 4)" :key="user.name" class="avatar sm"
        :style="{ background: user.color }">
        <span class="av-initials">{{ user.initials }}</span>
      </div>
      <div class="avatar sm overflow">+{{ users.length - 4 }}</div>
    </div>
  </div>
</div>`,
      css: `.av-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.av-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.av-wrap h4 { color: #94a3b8; margin: 16px 0 10px; font-size: 13px; }
.av-row { display: flex; gap: 14px; align-items: center; }
.avatar {
  position: relative; border-radius: 50%; display: flex; align-items: center;
  justify-content: center; font-weight: 600; color: #fff; flex-shrink: 0;
  width: 44px; height: 44px; font-size: 14px;
}
.avatar.sm { width: 32px; height: 32px; font-size: 11px; }
.avatar.lg { width: 56px; height: 56px; font-size: 18px; }
.av-initials { user-select: none; }
.av-status {
  position: absolute; bottom: 1px; right: 1px; width: 10px; height: 10px;
  border-radius: 50%; border: 2px solid #1a1a2e;
}
.av-status.online { background: #22c55e; }
.av-status.offline { background: #64748b; }
.av-status.busy { background: #ef4444; }
.av-stack { display: flex; }
.av-stack .avatar { margin-left: -10px; border: 2px solid #1a1a2e; }
.av-stack .avatar:first-child { margin-left: 0; }
.overflow { background: #334155; color: #94a3b8; }`,
      js: `const { createApp } = Vue;

createApp({
  setup() {
    const users = [
      { name: 'Alice', initials: 'A', color: '#3b82f6', status: 'online', size: '' },
      { name: 'Bob', initials: 'B', color: '#ef4444', status: 'busy', size: '' },
      { name: 'Charlie', initials: 'C', color: '#22c55e', status: 'offline', size: 'lg' },
      { name: 'Diana', initials: 'D', color: '#f59e0b', status: 'online', size: 'sm' },
      { name: 'Eve', initials: 'E', color: '#8b5cf6', status: '', size: '' },
    ];
    return { users };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-stat-card',
    title: 'Stat Card',
    description:
      'Create dashboard stat cards displaying key metrics with icons, trend indicators (up/down), and sparkline-style mini charts using CSS gradients.',
    difficulty: 'beginner',
    category: 'data-display',
    framework: 'vue',
    concepts: ['v-for', 'class binding', 'computed', 'reactive'],
    demoCode: {
      html: `<div id="app">
  <div class="stat-wrap">
    <h3>Dashboard Stats</h3>
    <div class="stat-grid">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
        <div class="stat-header">
          <span class="stat-icon" :style="{ background: stat.iconBg }">{{ stat.icon }}</span>
          <span class="stat-trend" :class="stat.trend > 0 ? 'up' : 'down'">
            {{ stat.trend > 0 ? '&#9650;' : '&#9660;' }} {{ Math.abs(stat.trend) }}%
          </span>
        </div>
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </div>
  </div>
</div>`,
      css: `.stat-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.stat-wrap h3 { color: #e0e0e0; margin: 0 0 16px; }
.stat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.stat-card { background: #0f172a; border-radius: 10px; padding: 16px; }
.stat-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.stat-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
.stat-trend { font-size: 12px; font-weight: 600; }
.stat-trend.up { color: #22c55e; }
.stat-trend.down { color: #ef4444; }
.stat-value { color: #e0e0e0; font-size: 28px; font-weight: 700; }
.stat-label { color: #64748b; font-size: 13px; margin-top: 2px; }`,
      js: `const { createApp } = Vue;

createApp({
  setup() {
    const stats = [
      { label: 'Revenue', value: '$12,450', icon: '$', iconBg: 'rgba(79,195,247,0.2)', trend: 12.5 },
      { label: 'Users', value: '3,284', icon: '★', iconBg: 'rgba(34,197,94,0.2)', trend: 8.2 },
      { label: 'Orders', value: '842', icon: '☆', iconBg: 'rgba(245,158,11,0.2)', trend: -3.1 },
      { label: 'Bounce Rate', value: '24%', icon: '↵', iconBg: 'rgba(239,68,68,0.2)', trend: -5.4 },
    ];
    return { stats };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-timeline-feed',
    title: 'Timeline Feed',
    description:
      'Build a social-media-style activity timeline feed with avatars, timestamps, and different event types (comment, commit, deploy). Supports relative time display.',
    difficulty: 'intermediate',
    category: 'data-display',
    framework: 'vue',
    concepts: ['v-for', 'computed', 'class binding', 'date formatting'],
    demoCode: {
      html: `<div id="app">
  <div class="feed-wrap">
    <h3>Activity Feed</h3>
    <div class="feed">
      <div v-for="item in feed" :key="item.id" class="feed-item">
        <div class="feed-dot" :class="item.type"></div>
        <div class="feed-content">
          <div class="feed-top">
            <strong>{{ item.user }}</strong> {{ item.action }}
          </div>
          <div class="feed-msg" v-if="item.message">{{ item.message }}</div>
          <div class="feed-time">{{ item.time }}</div>
        </div>
      </div>
    </div>
  </div>
</div>`,
      css: `.feed-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.feed-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.feed { position: relative; padding-left: 24px; }
.feed::before { content: ''; position: absolute; left: 7px; top: 0; bottom: 0; width: 2px; background: #334155; }
.feed-item { position: relative; margin-bottom: 18px; }
.feed-dot {
  position: absolute; left: -20px; top: 4px; width: 12px; height: 12px;
  border-radius: 50%; border: 2px solid #1a1a2e;
}
.feed-dot.comment { background: #3b82f6; }
.feed-dot.commit { background: #22c55e; }
.feed-dot.deploy { background: #f59e0b; }
.feed-dot.error { background: #ef4444; }
.feed-content { background: #0f172a; border-radius: 8px; padding: 12px; }
.feed-top { color: #e0e0e0; font-size: 13px; }
.feed-top strong { color: #4fc3f7; }
.feed-msg { color: #94a3b8; font-size: 12px; margin-top: 4px; }
.feed-time { color: #475569; font-size: 11px; margin-top: 6px; }`,
      js: `const { createApp } = Vue;

createApp({
  setup() {
    const feed = [
      { id: 1, user: 'Alice', action: 'deployed to production', type: 'deploy', message: '', time: '2 min ago' },
      { id: 2, user: 'Bob', action: 'pushed 3 commits', type: 'commit', message: 'feat: add user auth', time: '15 min ago' },
      { id: 3, user: 'Charlie', action: 'commented on PR #42', type: 'comment', message: 'Looks good, but needs tests.', time: '1 hour ago' },
      { id: 4, user: 'Diana', action: 'reported an error', type: 'error', message: 'Connection timeout on /api/users', time: '3 hours ago' },
    ];
    return { feed };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-activity-log',
    title: 'Activity Log',
    description:
      'Create a filterable activity log with timestamp, user, action type, and details. Supports category filtering, pagination, and search within log entries.',
    difficulty: 'intermediate',
    category: 'data-display',
    framework: 'vue',
    concepts: ['v-for', 'computed', 'v-model', 'reactive', 'filtering'],
    demoCode: {
      html: `<div id="app">
  <div class="log-wrap">
    <h3>Activity Log</h3>
    <div class="log-toolbar">
      <input v-model="search" placeholder="Search logs..." class="log-search" />
      <select v-model="filter">
        <option value="all">All</option>
        <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
      </select>
    </div>
    <div class="log-list">
      <div v-for="entry in filtered" :key="entry.id" class="log-entry">
        <span class="log-type" :class="entry.type">{{ entry.type }}</span>
        <span class="log-text"><strong>{{ entry.user }}</strong> {{ entry.action }}</span>
        <span class="log-time">{{ entry.time }}</span>
      </div>
      <div v-if="!filtered.length" class="log-empty">No matching entries</div>
    </div>
  </div>
</div>`,
      css: `.log-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.log-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.log-toolbar { display: flex; gap: 8px; margin-bottom: 12px; }
.log-search {
  flex: 1; padding: 8px 10px; border-radius: 6px; border: 1px solid #334155;
  background: #0f172a; color: #e0e0e0; outline: none; font-size: 13px;
}
.log-toolbar select {
  padding: 8px; border-radius: 6px; border: 1px solid #334155;
  background: #0f172a; color: #e0e0e0; outline: none;
}
.log-list { display: flex; flex-direction: column; gap: 4px; }
.log-entry {
  display: flex; align-items: center; gap: 10px; padding: 8px 10px;
  background: #0f172a; border-radius: 6px; font-size: 13px;
}
.log-type {
  padding: 2px 8px; border-radius: 4px; font-size: 10px;
  text-transform: uppercase; font-weight: 600; min-width: 55px; text-align: center;
}
.log-type.auth { background: rgba(79,195,247,0.2); color: #4fc3f7; }
.log-type.api { background: rgba(34,197,94,0.2); color: #22c55e; }
.log-type.error { background: rgba(239,68,68,0.2); color: #ef4444; }
.log-type.system { background: rgba(245,158,11,0.2); color: #f59e0b; }
.log-text { flex: 1; color: #e0e0e0; }
.log-text strong { color: #4fc3f7; }
.log-time { color: #475569; font-size: 11px; white-space: nowrap; }
.log-empty { text-align: center; color: #64748b; padding: 20px; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const types = ['auth', 'api', 'error', 'system'];
    const search = ref('');
    const filter = ref('all');
    const logs = [
      { id: 1, user: 'Alice', action: 'logged in', type: 'auth', time: '09:01' },
      { id: 2, user: 'System', action: 'backup completed', type: 'system', time: '09:00' },
      { id: 3, user: 'Bob', action: 'called GET /users', type: 'api', time: '08:55' },
      { id: 4, user: 'System', action: 'rate limit exceeded', type: 'error', time: '08:50' },
      { id: 5, user: 'Charlie', action: 'updated profile', type: 'api', time: '08:45' },
      { id: 6, user: 'Diana', action: 'failed login attempt', type: 'auth', time: '08:30' },
    ];
    const filtered = computed(() =>
      logs.filter(e =>
        (filter.value === 'all' || e.type === filter.value) &&
        (e.user + ' ' + e.action).toLowerCase().includes(search.value.toLowerCase())
      )
    );
    return { types, search, filter, filtered };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-diff-viewer',
    title: 'Diff Viewer',
    description:
      'Build a side-by-side diff viewer that highlights added, removed, and unchanged lines. Supports line numbers and color-coded change indicators.',
    difficulty: 'advanced',
    category: 'data-display',
    framework: 'vue',
    concepts: ['computed', 'v-for', 'class binding', 'string diff algorithm'],
    demoCode: {
      html: `<div id="app">
  <div class="diff-wrap">
    <h3>Diff Viewer</h3>
    <div class="diff-panels">
      <div class="diff-panel">
        <div class="diff-header">Original</div>
        <div v-for="(line, i) in diffLines" :key="'l'+i" class="diff-line" :class="line.type">
          <span class="diff-ln">{{ line.leftNum || '' }}</span>
          <span class="diff-code">{{ line.left }}</span>
        </div>
      </div>
      <div class="diff-panel">
        <div class="diff-header">Modified</div>
        <div v-for="(line, i) in diffLines" :key="'r'+i" class="diff-line" :class="line.type">
          <span class="diff-ln">{{ line.rightNum || '' }}</span>
          <span class="diff-code">{{ line.right }}</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
      css: `.diff-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.diff-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.diff-panels { display: flex; gap: 2px; font-family: monospace; font-size: 12px; }
.diff-panel { flex: 1; background: #0f172a; border-radius: 6px; overflow: hidden; }
.diff-header { padding: 8px 12px; background: #1e293b; color: #94a3b8; font-size: 11px; font-weight: 600; }
.diff-line { display: flex; padding: 1px 0; }
.diff-ln { width: 36px; text-align: right; padding-right: 8px; color: #475569; flex-shrink: 0; }
.diff-code { flex: 1; padding: 1px 8px; white-space: pre; }
.diff-line.same .diff-code { color: #94a3b8; }
.diff-line.added .diff-code { background: rgba(34,197,94,0.1); color: #22c55e; }
.diff-line.removed .diff-code { background: rgba(239,68,68,0.1); color: #ef4444; }`,
      js: `const { createApp } = Vue;

createApp({
  setup() {
    const original = ['function greet(name) {', '  console.log("Hello " + name);', '  return name;', '}'];
    const modified = ['function greet(name) {', '  const msg = \\u0060Hello \\u0024{name}!\\u0060;', '  console.log(msg);', '  return msg;', '}'];
    const diffLines = [];
    let li = 0, ri = 0;
    while (li < original.length || ri < modified.length) {
      if (li < original.length && ri < modified.length && original[li] === modified[ri]) {
        diffLines.push({ type: 'same', left: original[li], right: modified[ri], leftNum: li+1, rightNum: ri+1 });
        li++; ri++;
      } else if (li < original.length && !modified.includes(original[li])) {
        diffLines.push({ type: 'removed', left: original[li], right: '', leftNum: li+1, rightNum: '' });
        li++;
      } else {
        diffLines.push({ type: 'added', left: '', right: modified[ri], leftNum: '', rightNum: ri+1 });
        ri++;
      }
    }
    return { diffLines };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-code-block',
    title: 'Code Block',
    description:
      'Create a styled code block component with line numbers, a copy-to-clipboard button, and language label. Supports dark theme and word-wrap toggling.',
    difficulty: 'beginner',
    category: 'data-display',
    framework: 'vue',
    concepts: ['ref', 'v-for', 'computed', 'clipboard API'],
    demoCode: {
      html: `<div id="app">
  <div class="cb-wrap">
    <h3>Code Block</h3>
    <div class="code-block">
      <div class="cb-header">
        <span class="cb-lang">JavaScript</span>
        <button class="cb-copy" @click="copy">{{ copied ? 'Copied!' : 'Copy' }}</button>
      </div>
      <div class="cb-body">
        <div v-for="(line, i) in lines" :key="i" class="cb-line">
          <span class="cb-num">{{ i + 1 }}</span>
          <span class="cb-code">{{ line }}</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
      css: `.cb-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.cb-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.code-block { border-radius: 8px; overflow: hidden; border: 1px solid #334155; }
.cb-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 14px; background: #1e293b;
}
.cb-lang { color: #64748b; font-size: 12px; }
.cb-copy {
  padding: 3px 10px; border-radius: 4px; border: 1px solid #334155;
  background: transparent; color: #4fc3f7; cursor: pointer; font-size: 11px;
}
.cb-copy:hover { background: rgba(79,195,247,0.1); }
.cb-body { background: #0f172a; padding: 12px 0; font-family: monospace; font-size: 13px; }
.cb-line { display: flex; line-height: 1.6; }
.cb-num { width: 40px; text-align: right; padding-right: 12px; color: #475569; user-select: none; }
.cb-code { color: #e0e0e0; white-space: pre; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const source = 'const greet = (name) => {\\n  return \\u0060Hello, \\u0024{name}!\\u0060;\\n};\\n\\ngreet("World");';
    const lines = computed(() => source.split('\\n'));
    const copied = ref(false);
    const copy = async () => {
      await navigator.clipboard.writeText(source);
      copied.value = true;
      setTimeout(() => { copied.value = false; }, 2000);
    };
    return { lines, copied, copy };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-markdown-preview',
    title: 'Markdown Preview',
    description:
      'Build a live Markdown previewer with a side-by-side editor and rendered output. Supports basic Markdown syntax (headings, bold, italic, lists, code, links).',
    difficulty: 'intermediate',
    category: 'data-display',
    framework: 'vue',
    concepts: ['v-model', 'computed', 'v-html', 'regex replacement'],
    demoCode: {
      html: `<div id="app">
  <div class="md-wrap">
    <h3>Markdown Preview</h3>
    <div class="md-split">
      <textarea v-model="markdown" class="md-editor" placeholder="Write markdown..."></textarea>
      <div class="md-preview" v-html="rendered"></div>
    </div>
  </div>
</div>`,
      css: `.md-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.md-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.md-split { display: flex; gap: 2px; height: 220px; border-radius: 8px; overflow: hidden; }
.md-editor {
  flex: 1; padding: 12px; border: none; background: #0f172a; color: #e0e0e0;
  outline: none; resize: none; font-family: monospace; font-size: 13px;
}
.md-preview {
  flex: 1; padding: 12px; background: #0a0a1a; color: #e0e0e0; overflow-y: auto; font-size: 14px;
}
.md-preview h1, .md-preview h2, .md-preview h3 { color: #4fc3f7; margin: 8px 0; }
.md-preview code { background: #1e293b; padding: 2px 6px; border-radius: 4px; font-size: 12px; color: #f59e0b; }
.md-preview a { color: #4fc3f7; }
.md-preview ul { padding-left: 20px; }
.md-preview li { margin: 4px 0; color: #94a3b8; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const markdown = ref('# Hello World\\n\\nThis is **bold** and *italic*.\\n\\n- Item 1\\n- Item 2\\n\\n\\u0060code here\\u0060\\n\\n[Link](https://vuejs.org)');
    const rendered = computed(() => {
      let html = markdown.value
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
        .replace(/\\*(.+?)\\*/g, '<em>$1</em>')
        .replace(/\\u0060(.+?)\\u0060/g, '<code>$1</code>')
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        .replace(/\\[(.+?)\\]\\((.+?)\\)/g, '<a href="$2">$1</a>')
        .replace(/\\n/g, '<br/>');
      html = html.replace(/(<li>.*<\\/li>)/s, '<ul>$1</ul>');
      return html;
    });
    return { markdown, rendered };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-json-viewer',
    title: 'JSON Viewer',
    description:
      'Build a collapsible JSON tree viewer that renders nested objects and arrays with syntax coloring. Supports expand/collapse at each level and copy functionality.',
    difficulty: 'intermediate',
    category: 'data-display',
    framework: 'vue',
    concepts: ['recursive rendering', 'reactive', 'v-for', 'v-if', 'typeof checks'],
    demoCode: {
      html: `<div id="app">
  <div class="jv-wrap">
    <h3>JSON Viewer</h3>
    <div class="jv-tree">
      <div v-for="(val, key) in data" :key="key" class="jv-node">
        <div class="jv-row" @click="toggleKey(key)">
          <span v-if="isObject(val)" class="jv-toggle">{{ expanded[key] ? '&#9660;' : '&#9654;' }}</span>
          <span class="jv-key">{{ key }}</span>:
          <span v-if="!isObject(val)" :class="'jv-val jv-' + typeof val">{{ JSON.stringify(val) }}</span>
          <span v-else class="jv-preview">{{ Array.isArray(val) ? '[...]' : '{...}' }}</span>
        </div>
        <div v-if="isObject(val) && expanded[key]" class="jv-children">
          <div v-for="(v2, k2) in val" :key="k2" class="jv-row leaf">
            <span class="jv-key">{{ k2 }}</span>:
            <span :class="'jv-val jv-' + typeof v2">{{ JSON.stringify(v2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
      css: `.jv-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.jv-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.jv-tree { background: #0f172a; border-radius: 8px; padding: 14px; font-family: monospace; font-size: 13px; }
.jv-node { margin-bottom: 2px; }
.jv-row { display: flex; align-items: center; gap: 4px; padding: 3px 4px; border-radius: 4px; cursor: pointer; color: #94a3b8; }
.jv-row:hover { background: rgba(79,195,247,0.08); }
.jv-row.leaf { cursor: default; padding-left: 18px; }
.jv-toggle { font-size: 9px; color: #64748b; width: 14px; }
.jv-key { color: #4fc3f7; }
.jv-val.jv-string { color: #22c55e; }
.jv-val.jv-number { color: #f59e0b; }
.jv-val.jv-boolean { color: #ef4444; }
.jv-preview { color: #64748b; font-style: italic; }
.jv-children { padding-left: 20px; border-left: 1px solid #1e293b; margin-left: 6px; }`,
      js: `const { createApp, reactive } = Vue;

createApp({
  setup() {
    const data = {
      name: 'Vue App',
      version: 3.4,
      active: true,
      config: { theme: 'dark', locale: 'en', debug: false },
      tags: ['frontend', 'reactive', 'fast'],
    };
    const expanded = reactive({});
    const isObject = (v) => v !== null && typeof v === 'object';
    const toggleKey = (key) => { expanded[key] = !expanded[key]; };
    return { data, expanded, isObject, toggleKey };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-comparison-table',
    title: 'Comparison Table',
    description:
      'Create a feature comparison table with check/cross indicators, highlighted recommended column, and sticky headers. Supports toggling between monthly/yearly pricing.',
    difficulty: 'intermediate',
    category: 'data-display',
    framework: 'vue',
    concepts: ['v-for', 'reactive', 'class binding', 'computed'],
    demoCode: {
      html: `<div id="app">
  <div class="ct-wrap">
    <h3>Plan Comparison</h3>
    <div class="ct-table">
      <div class="ct-header">
        <div class="ct-cell feature-cell"></div>
        <div v-for="plan in plans" :key="plan.name" class="ct-cell"
          :class="{ recommended: plan.recommended }">
          <div class="plan-name">{{ plan.name }}</div>
          <div class="plan-price">{{ plan.price }}</div>
        </div>
      </div>
      <div v-for="feat in features" :key="feat" class="ct-row">
        <div class="ct-cell feature-cell">{{ feat }}</div>
        <div v-for="plan in plans" :key="plan.name" class="ct-cell"
          :class="{ recommended: plan.recommended }">
          <span :class="plan.features[feat] ? 'check' : 'cross'">
            {{ plan.features[feat] ? '&#10003;' : '&#10005;' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>`,
      css: `.ct-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.ct-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.ct-table { border-radius: 8px; overflow: hidden; border: 1px solid #334155; }
.ct-header, .ct-row { display: flex; }
.ct-header { background: #0f172a; }
.ct-row { border-top: 1px solid #1e293b; }
.ct-row:hover { background: rgba(79,195,247,0.04); }
.ct-cell { flex: 1; padding: 12px; text-align: center; color: #94a3b8; font-size: 13px; }
.feature-cell { text-align: left; color: #e0e0e0; font-weight: 500; }
.ct-cell.recommended { background: rgba(79,195,247,0.06); }
.plan-name { color: #e0e0e0; font-weight: 600; font-size: 14px; }
.plan-price { color: #4fc3f7; font-size: 12px; margin-top: 2px; }
.check { color: #22c55e; font-size: 16px; }
.cross { color: #475569; font-size: 16px; }`,
      js: `const { createApp } = Vue;

createApp({
  setup() {
    const features = ['API Access', 'Custom Domain', 'SSL Certificate', 'Priority Support', 'Analytics'];
    const plans = [
      { name: 'Free', price: '$0/mo', recommended: false,
        features: { 'API Access': true, 'Custom Domain': false, 'SSL Certificate': true, 'Priority Support': false, 'Analytics': false } },
      { name: 'Pro', price: '$19/mo', recommended: true,
        features: { 'API Access': true, 'Custom Domain': true, 'SSL Certificate': true, 'Priority Support': true, 'Analytics': false } },
      { name: 'Enterprise', price: '$49/mo', recommended: false,
        features: { 'API Access': true, 'Custom Domain': true, 'SSL Certificate': true, 'Priority Support': true, 'Analytics': true } },
    ];
    return { features, plans };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-pricing-table',
    title: 'Pricing Table',
    description:
      'Build a responsive pricing table with plan cards, feature lists, and a monthly/yearly toggle. The recommended plan is visually highlighted with a badge.',
    difficulty: 'beginner',
    category: 'data-display',
    framework: 'vue',
    concepts: ['v-for', 'ref', 'computed', 'class binding'],
    demoCode: {
      html: `<div id="app">
  <div class="price-wrap">
    <h3>Choose Your Plan</h3>
    <div class="price-toggle">
      <span :class="{ active: !yearly }">Monthly</span>
      <button class="toggle-sw" :class="{ on: yearly }" @click="yearly = !yearly">
        <div class="toggle-dot"></div>
      </button>
      <span :class="{ active: yearly }">Yearly <small>(-20%)</small></span>
    </div>
    <div class="price-grid">
      <div v-for="plan in plans" :key="plan.name" class="price-card" :class="{ featured: plan.featured }">
        <div v-if="plan.featured" class="price-badge">Popular</div>
        <div class="price-name">{{ plan.name }}</div>
        <div class="price-amount">{{ yearly ? plan.yearly : plan.monthly }}<span>/{{ yearly ? 'yr' : 'mo' }}</span></div>
        <ul class="price-features">
          <li v-for="f in plan.features" :key="f">&#10003; {{ f }}</li>
        </ul>
        <button class="price-btn" :class="{ primary: plan.featured }">Get Started</button>
      </div>
    </div>
  </div>
</div>`,
      css: `.price-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.price-wrap h3 { color: #e0e0e0; margin: 0 0 14px; text-align: center; }
.price-toggle { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 20px; color: #64748b; font-size: 13px; }
.price-toggle .active { color: #e0e0e0; }
.toggle-sw { width: 40px; height: 22px; border-radius: 11px; background: #334155; border: none; cursor: pointer; position: relative; }
.toggle-sw.on { background: #4fc3f7; }
.toggle-dot { width: 18px; height: 18px; border-radius: 50%; background: #fff; position: absolute; top: 2px; left: 2px; transition: transform 0.2s; }
.toggle-sw.on .toggle-dot { transform: translateX(18px); }
.price-grid { display: flex; gap: 12px; }
.price-card { flex: 1; background: #0f172a; border-radius: 10px; padding: 20px; position: relative; border: 1px solid #334155; }
.price-card.featured { border-color: #4fc3f7; }
.price-badge { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #4fc3f7; color: #0f172a; padding: 2px 12px; border-radius: 10px; font-size: 11px; font-weight: 600; }
.price-name { color: #94a3b8; font-size: 14px; margin-bottom: 4px; }
.price-amount { color: #e0e0e0; font-size: 32px; font-weight: 700; }
.price-amount span { font-size: 14px; color: #64748b; font-weight: 400; }
.price-features { list-style: none; padding: 0; margin: 16px 0; }
.price-features li { color: #94a3b8; font-size: 13px; padding: 4px 0; }
.price-btn { width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #334155; background: transparent; color: #e0e0e0; cursor: pointer; }
.price-btn.primary { background: #4fc3f7; color: #0f172a; border: none; font-weight: 600; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const yearly = ref(false);
    const plans = [
      { name: 'Starter', monthly: '$9', yearly: '$86', featured: false, features: ['1 Project', '1GB Storage', 'Email Support'] },
      { name: 'Pro', monthly: '$29', yearly: '$278', featured: true, features: ['10 Projects', '50GB Storage', 'Priority Support', 'API Access'] },
      { name: 'Enterprise', monthly: '$99', yearly: '$950', featured: false, features: ['Unlimited', '500GB Storage', '24/7 Support', 'SSO', 'SLA'] },
    ];
    return { yearly, plans };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-feature-list',
    title: 'Feature List',
    description:
      'Create a feature showcase section with icon, title, description, and optional action links. Supports grid layout with hover effects and category grouping.',
    difficulty: 'beginner',
    category: 'data-display',
    framework: 'vue',
    concepts: ['v-for', 'class binding', 'style binding'],
    demoCode: {
      html: `<div id="app">
  <div class="fl-wrap">
    <h3>Features</h3>
    <div class="fl-grid">
      <div v-for="f in features" :key="f.title" class="fl-card">
        <div class="fl-icon" :style="{ background: f.iconBg }">{{ f.icon }}</div>
        <div class="fl-title">{{ f.title }}</div>
        <div class="fl-desc">{{ f.desc }}</div>
      </div>
    </div>
  </div>
</div>`,
      css: `.fl-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.fl-wrap h3 { color: #e0e0e0; margin: 0 0 16px; }
.fl-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.fl-card {
  background: #0f172a; border-radius: 10px; padding: 18px;
  transition: transform 0.2s, border-color 0.2s; border: 1px solid transparent;
}
.fl-card:hover { transform: translateY(-2px); border-color: #4fc3f7; }
.fl-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-bottom: 12px; }
.fl-title { color: #e0e0e0; font-weight: 600; font-size: 14px; margin-bottom: 4px; }
.fl-desc { color: #94a3b8; font-size: 12px; line-height: 1.5; }`,
      js: `const { createApp } = Vue;

createApp({
  setup() {
    const features = [
      { title: 'Fast Build', desc: 'Lightning-fast HMR and optimized production builds.', icon: '⚡', iconBg: 'rgba(245,158,11,0.2)' },
      { title: 'TypeScript', desc: 'First-class TypeScript support out of the box.', icon: 'TS', iconBg: 'rgba(59,130,246,0.2)' },
      { title: 'Composables', desc: 'Reusable logic with the Composition API.', icon: '⚙', iconBg: 'rgba(34,197,94,0.2)' },
      { title: 'SSR Ready', desc: 'Server-side rendering with Nuxt or custom setup.', icon: '☁', iconBg: 'rgba(139,92,246,0.2)' },
    ];
    return { features };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-testimonials',
    title: 'Testimonials',
    description:
      'Build a testimonial carousel with user quotes, avatars, and names. Supports auto-play, manual navigation, and fade transitions between testimonials.',
    difficulty: 'beginner',
    category: 'data-display',
    framework: 'vue',
    concepts: ['ref', 'setInterval', 'v-if', 'CSS transitions', 'onMounted', 'onUnmounted'],
    demoCode: {
      html: `<div id="app">
  <div class="test-wrap">
    <h3>What People Say</h3>
    <div class="test-card">
      <div class="test-quote">"{{ current.quote }}"</div>
      <div class="test-author">
        <div class="test-avatar" :style="{ background: current.color }">{{ current.initials }}</div>
        <div>
          <div class="test-name">{{ current.name }}</div>
          <div class="test-role">{{ current.role }}</div>
        </div>
      </div>
    </div>
    <div class="test-dots">
      <span v-for="(t, i) in testimonials" :key="i" class="dot"
        :class="{ active: i === idx }" @click="idx = i"></span>
    </div>
  </div>
</div>`,
      css: `.test-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; text-align: center; }
.test-wrap h3 { color: #e0e0e0; margin: 0 0 20px; }
.test-card { background: #0f172a; border-radius: 10px; padding: 24px; margin-bottom: 16px; }
.test-quote { color: #e0e0e0; font-size: 15px; font-style: italic; line-height: 1.6; margin-bottom: 16px; }
.test-author { display: flex; align-items: center; gap: 10px; justify-content: center; }
.test-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 14px; }
.test-name { color: #e0e0e0; font-weight: 600; font-size: 14px; }
.test-role { color: #64748b; font-size: 12px; }
.test-dots { display: flex; justify-content: center; gap: 8px; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: #334155; cursor: pointer; }
.dot.active { background: #4fc3f7; }`,
      js: `const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const testimonials = [
      { name: 'Alice', role: 'Frontend Lead', initials: 'A', color: '#3b82f6', quote: 'Vue made our development 3x faster. The Composition API is a game changer.' },
      { name: 'Bob', role: 'CTO', initials: 'B', color: '#ef4444', quote: 'Migrating to Vue 3 was the best decision we made this year.' },
      { name: 'Charlie', role: 'Designer', initials: 'C', color: '#22c55e', quote: 'The reactivity system makes prototyping incredibly fast.' },
    ];
    const idx = ref(0);
    const current = computed(() => testimonials[idx.value]);
    let timer;
    onMounted(() => { timer = setInterval(() => { idx.value = (idx.value + 1) % testimonials.length; }, 4000); });
    onUnmounted(() => clearInterval(timer));
    return { testimonials, idx, current };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-team-grid',
    title: 'Team Grid',
    description:
      'Create a responsive team member grid with avatar, name, role, and social links. Supports hover effects with a bio overlay and filtering by department.',
    difficulty: 'beginner',
    category: 'data-display',
    framework: 'vue',
    concepts: ['v-for', 'reactive', 'class binding', 'hover effects'],
    demoCode: {
      html: `<div id="app">
  <div class="team-wrap">
    <h3>Our Team</h3>
    <div class="team-grid">
      <div v-for="m in members" :key="m.name" class="team-card">
        <div class="team-avatar" :style="{ background: m.color }">{{ m.initials }}</div>
        <div class="team-name">{{ m.name }}</div>
        <div class="team-role">{{ m.role }}</div>
        <div class="team-links">
          <span v-for="l in m.links" :key="l" class="team-link">{{ l }}</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
      css: `.team-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.team-wrap h3 { color: #e0e0e0; margin: 0 0 16px; }
.team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.team-card {
  background: #0f172a; border-radius: 10px; padding: 20px; text-align: center;
  transition: transform 0.2s; border: 1px solid transparent;
}
.team-card:hover { transform: translateY(-3px); border-color: #334155; }
.team-avatar {
  width: 56px; height: 56px; border-radius: 50%; margin: 0 auto 12px;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 700; font-size: 20px;
}
.team-name { color: #e0e0e0; font-weight: 600; font-size: 14px; }
.team-role { color: #64748b; font-size: 12px; margin-bottom: 8px; }
.team-links { display: flex; justify-content: center; gap: 8px; }
.team-link { color: #4fc3f7; font-size: 12px; cursor: pointer; }
.team-link:hover { text-decoration: underline; }`,
      js: `const { createApp } = Vue;

createApp({
  setup() {
    const members = [
      { name: 'Alice Chen', initials: 'AC', role: 'CEO', color: '#3b82f6', links: ['GitHub', 'Twitter'] },
      { name: 'Bob Smith', initials: 'BS', role: 'CTO', color: '#ef4444', links: ['GitHub', 'LinkedIn'] },
      { name: 'Charlie Kim', initials: 'CK', role: 'Designer', color: '#22c55e', links: ['Dribbble', 'Twitter'] },
      { name: 'Diana Park', initials: 'DP', role: 'Engineer', color: '#f59e0b', links: ['GitHub'] },
      { name: 'Eve Wilson', initials: 'EW', role: 'DevRel', color: '#8b5cf6', links: ['Twitter', 'YouTube'] },
      { name: 'Frank Lee', initials: 'FL', role: 'Engineer', color: '#ec4899', links: ['GitHub', 'Blog'] },
    ];
    return { members };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-changelog',
    title: 'Changelog',
    description:
      'Build a changelog component displaying version history with categorized changes (added, fixed, changed, removed). Supports collapsible entries and version badges.',
    difficulty: 'beginner',
    category: 'data-display',
    framework: 'vue',
    concepts: ['v-for', 'reactive', 'class binding'],
    demoCode: {
      html: `<div id="app">
  <div class="cl-wrap">
    <h3>Changelog</h3>
    <div v-for="release in releases" :key="release.version" class="cl-release">
      <div class="cl-header" @click="release.open = !release.open">
        <span class="cl-version">v{{ release.version }}</span>
        <span class="cl-date">{{ release.date }}</span>
        <span class="cl-arrow">{{ release.open ? '&#9650;' : '&#9660;' }}</span>
      </div>
      <div v-if="release.open" class="cl-body">
        <div v-for="(items, type) in release.changes" :key="type" class="cl-group">
          <span class="cl-type" :class="type">{{ type }}</span>
          <div v-for="item in items" :key="item" class="cl-item">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</div>`,
      css: `.cl-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.cl-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.cl-release { margin-bottom: 8px; border: 1px solid #334155; border-radius: 8px; overflow: hidden; }
.cl-header { display: flex; align-items: center; gap: 10px; padding: 12px 14px; background: #0f172a; cursor: pointer; }
.cl-version { color: #4fc3f7; font-weight: 700; font-size: 15px; }
.cl-date { color: #64748b; font-size: 12px; flex: 1; }
.cl-arrow { color: #64748b; font-size: 10px; }
.cl-body { padding: 12px 14px; background: #0a0a1a; }
.cl-group { margin-bottom: 10px; }
.cl-type { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; text-transform: uppercase; margin-bottom: 6px; }
.cl-type.added { background: rgba(34,197,94,0.2); color: #22c55e; }
.cl-type.fixed { background: rgba(59,130,246,0.2); color: #3b82f6; }
.cl-type.changed { background: rgba(245,158,11,0.2); color: #f59e0b; }
.cl-type.removed { background: rgba(239,68,68,0.2); color: #ef4444; }
.cl-item { color: #94a3b8; font-size: 13px; padding: 2px 0 2px 12px; }`,
      js: `const { createApp, reactive } = Vue;

createApp({
  setup() {
    const releases = reactive([
      { version: '2.1.0', date: 'Jan 15, 2025', open: true, changes: {
        added: ['Dark mode support', 'Export to CSV'],
        fixed: ['Fixed login timeout issue'],
      }},
      { version: '2.0.0', date: 'Dec 1, 2024', open: false, changes: {
        added: ['New dashboard UI', 'Real-time notifications'],
        changed: ['Updated API endpoints'],
        removed: ['Legacy auth flow'],
      }},
      { version: '1.5.0', date: 'Oct 20, 2024', open: false, changes: {
        added: ['Search functionality'],
        fixed: ['Memory leak in charts', 'Pagination offset bug'],
      }},
    ]);
    return { releases };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-status-page',
    title: 'Status Page',
    description:
      'Create a service status page showing operational status of multiple services with uptime percentages, incident history, and color-coded indicators.',
    difficulty: 'intermediate',
    category: 'data-display',
    framework: 'vue',
    concepts: ['v-for', 'computed', 'class binding', 'reactive'],
    demoCode: {
      html: `<div id="app">
  <div class="sp-wrap">
    <div class="sp-header">
      <h3>System Status</h3>
      <span class="sp-overall" :class="overallStatus">{{ overallStatus === 'operational' ? 'All Systems Operational' : 'Partial Outage' }}</span>
    </div>
    <div class="sp-services">
      <div v-for="svc in services" :key="svc.name" class="sp-row">
        <div class="sp-info">
          <span class="sp-dot" :class="svc.status"></span>
          <span class="sp-name">{{ svc.name }}</span>
        </div>
        <span class="sp-uptime">{{ svc.uptime }}%</span>
        <span class="sp-status-label" :class="svc.status">{{ svc.status }}</span>
      </div>
    </div>
  </div>
</div>`,
      css: `.sp-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.sp-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.sp-header h3 { color: #e0e0e0; margin: 0; }
.sp-overall { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
.sp-overall.operational { background: rgba(34,197,94,0.15); color: #22c55e; }
.sp-overall.degraded { background: rgba(245,158,11,0.15); color: #f59e0b; }
.sp-services { display: flex; flex-direction: column; gap: 6px; }
.sp-row {
  display: flex; align-items: center; padding: 12px 14px;
  background: #0f172a; border-radius: 8px;
}
.sp-info { display: flex; align-items: center; gap: 10px; flex: 1; }
.sp-dot { width: 10px; height: 10px; border-radius: 50%; }
.sp-dot.operational { background: #22c55e; }
.sp-dot.degraded { background: #f59e0b; }
.sp-dot.down { background: #ef4444; }
.sp-name { color: #e0e0e0; font-size: 14px; }
.sp-uptime { color: #94a3b8; font-size: 13px; margin-right: 16px; }
.sp-status-label { font-size: 11px; text-transform: capitalize; padding: 2px 8px; border-radius: 4px; }
.sp-status-label.operational { color: #22c55e; background: rgba(34,197,94,0.1); }
.sp-status-label.degraded { color: #f59e0b; background: rgba(245,158,11,0.1); }
.sp-status-label.down { color: #ef4444; background: rgba(239,68,68,0.1); }`,
      js: `const { createApp, computed } = Vue;

createApp({
  setup() {
    const services = [
      { name: 'API Server', status: 'operational', uptime: 99.98 },
      { name: 'Web Dashboard', status: 'operational', uptime: 99.95 },
      { name: 'Database', status: 'operational', uptime: 99.99 },
      { name: 'CDN', status: 'degraded', uptime: 98.50 },
      { name: 'Email Service', status: 'operational', uptime: 99.90 },
    ];
    const overallStatus = computed(() =>
      services.every(s => s.status === 'operational') ? 'operational' : 'degraded'
    );
    return { services, overallStatus };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-metric-dashboard',
    title: 'Metric Dashboard',
    description:
      'Build a metrics dashboard with KPI cards, mini bar charts built from CSS, and trend sparklines. Supports time range selection and animated value transitions.',
    difficulty: 'advanced',
    category: 'data-display',
    framework: 'vue',
    concepts: ['reactive', 'computed', 'v-for', 'style binding', 'watch'],
    demoCode: {
      html: `<div id="app">
  <div class="md-wrap">
    <div class="md-header">
      <h3>Metrics</h3>
      <div class="md-range">
        <button v-for="r in ranges" :key="r" :class="{ active: range === r }" @click="range = r">{{ r }}</button>
      </div>
    </div>
    <div class="md-grid">
      <div v-for="m in metrics" :key="m.label" class="md-card">
        <div class="md-label">{{ m.label }}</div>
        <div class="md-value">{{ m.value }}</div>
        <div class="md-bars">
          <div v-for="(v, i) in m.data" :key="i" class="md-bar" :style="{ height: v + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</div>`,
      css: `.md-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.md-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.md-header h3 { color: #e0e0e0; margin: 0; }
.md-range { display: flex; gap: 4px; }
.md-range button {
  padding: 4px 10px; border-radius: 4px; border: none;
  background: transparent; color: #64748b; cursor: pointer; font-size: 12px;
}
.md-range button.active { background: #4fc3f7; color: #0f172a; }
.md-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.md-card { background: #0f172a; border-radius: 10px; padding: 16px; }
.md-label { color: #64748b; font-size: 12px; margin-bottom: 4px; }
.md-value { color: #e0e0e0; font-size: 24px; font-weight: 700; margin-bottom: 12px; }
.md-bars { display: flex; align-items: flex-end; gap: 3px; height: 40px; }
.md-bar { flex: 1; background: #4fc3f7; border-radius: 2px 2px 0 0; min-height: 2px; transition: height 0.3s; }`,
      js: `const { createApp, ref, reactive } = Vue;

createApp({
  setup() {
    const ranges = ['7D', '30D', '90D'];
    const range = ref('7D');
    const metrics = reactive([
      { label: 'Page Views', value: '24.5K', data: [40, 65, 55, 80, 70, 90, 85] },
      { label: 'Unique Users', value: '8,421', data: [30, 45, 60, 50, 75, 65, 80] },
      { label: 'Avg Duration', value: '3m 42s', data: [60, 55, 70, 65, 80, 75, 90] },
      { label: 'Bounce Rate', value: '24.1%', data: [80, 70, 60, 55, 45, 50, 35] },
    ]);
    return { ranges, range, metrics };
  }
}).mount('#app');`,
    },
  },
  // Navigation
  {
    id: 'vue-command-menu',
    title: 'Command Menu',
    description:
      'Build a nested command menu with breadcrumb navigation. Selecting a group drills into sub-commands, with a back button to return to the parent level.',
    difficulty: 'intermediate',
    category: 'navigation',
    framework: 'vue',
    concepts: ['reactive', 'computed', 'v-for', 'ref', 'stack-based navigation'],
    demoCode: {
      html: `<div id="app">
  <div class="cm-wrap">
    <h3>Command Menu</h3>
    <div class="cm-box">
      <div class="cm-breadcrumb" v-if="stack.length">
        <button @click="goBack" class="cm-back">&larr; Back</button>
        <span>{{ currentGroup }}</span>
      </div>
      <input v-model="query" class="cm-search" placeholder="Search commands..." />
      <div class="cm-list">
        <div v-for="item in filtered" :key="item.label" class="cm-item"
          @click="item.children ? drillIn(item) : select(item)">
          <span>{{ item.label }}</span>
          <span v-if="item.children" class="cm-arrow">&rsaquo;</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
      css: `.cm-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.cm-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.cm-box { background: #0f172a; border: 1px solid #334155; border-radius: 10px; overflow: hidden; }
.cm-breadcrumb { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 12px; }
.cm-back { background: none; border: none; color: #4fc3f7; cursor: pointer; font-size: 13px; }
.cm-search { width: 100%; padding: 12px 14px; border: none; border-bottom: 1px solid #1e293b; background: transparent; color: #e0e0e0; outline: none; font-size: 14px; }
.cm-list { max-height: 220px; overflow-y: auto; }
.cm-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; color: #e0e0e0; cursor: pointer; font-size: 14px; }
.cm-item:hover { background: rgba(79,195,247,0.1); }
.cm-arrow { color: #64748b; }`,
      js: `const { createApp, ref, reactive, computed } = Vue;

createApp({
  setup() {
    const menuData = [
      { label: 'File', children: [{ label: 'New File' }, { label: 'Open File' }, { label: 'Save' }] },
      { label: 'Edit', children: [{ label: 'Undo' }, { label: 'Redo' }, { label: 'Find' }] },
      { label: 'View', children: [{ label: 'Zoom In' }, { label: 'Zoom Out' }, { label: 'Full Screen' }] },
      { label: 'Help' },
    ];
    const stack = reactive([]);
    const query = ref('');
    const currentItems = computed(() => stack.length ? stack[stack.length - 1].children : menuData);
    const currentGroup = computed(() => stack.length ? stack[stack.length - 1].label : '');
    const filtered = computed(() =>
      currentItems.value.filter(i => i.label.toLowerCase().includes(query.value.toLowerCase()))
    );
    const drillIn = (item) => { stack.push(item); query.value = ''; };
    const goBack = () => { stack.pop(); query.value = ''; };
    const select = (item) => {};
    return { stack, query, currentGroup, filtered, drillIn, goBack, select };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-mini-map',
    title: 'Mini Map',
    description:
      'Create a document mini-map sidebar that shows a zoomed-out overview of the content. A viewport indicator shows the currently visible area and can be dragged to scroll.',
    difficulty: 'advanced',
    category: 'navigation',
    framework: 'vue',
    concepts: ['ref', 'onMounted', 'scroll events', 'mouse events', 'computed'],
    demoCode: {
      html: `<div id="app">
  <div class="mm-wrap">
    <h3>Mini Map</h3>
    <div class="mm-container">
      <div class="mm-content" ref="content" @scroll="updateViewport">
        <div v-for="i in 20" :key="i" class="mm-block" :class="'color-' + (i % 4)">
          Section {{ i }}
        </div>
      </div>
      <div class="mm-map" @click="jumpTo($event)">
        <div v-for="i in 20" :key="i" class="mm-mini-block" :class="'color-' + (i % 4)"></div>
        <div class="mm-viewport" :style="vpStyle"></div>
      </div>
    </div>
  </div>
</div>`,
      css: `.mm-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.mm-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.mm-container { display: flex; gap: 8px; height: 240px; }
.mm-content { flex: 1; overflow-y: auto; border-radius: 8px; }
.mm-block { padding: 20px; margin-bottom: 4px; border-radius: 4px; color: #e0e0e0; font-size: 13px; }
.mm-block.color-0 { background: #1e3a5f; }
.mm-block.color-1 { background: #2d1b4e; }
.mm-block.color-2 { background: #1b3d2f; }
.mm-block.color-3 { background: #3d2b1b; }
.mm-map {
  width: 60px; background: #0f172a; border-radius: 6px; position: relative;
  cursor: pointer; flex-shrink: 0; overflow: hidden;
}
.mm-mini-block { height: 5%; margin-bottom: 0.2%; border-radius: 1px; }
.mm-mini-block.color-0 { background: #1e3a5f; }
.mm-mini-block.color-1 { background: #2d1b4e; }
.mm-mini-block.color-2 { background: #1b3d2f; }
.mm-mini-block.color-3 { background: #3d2b1b; }
.mm-viewport {
  position: absolute; left: 0; right: 0; background: rgba(79,195,247,0.25);
  border: 1px solid #4fc3f7; border-radius: 2px; pointer-events: none;
}`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const content = ref(null);
    const scrollTop = ref(0);
    const updateViewport = () => { scrollTop.value = content.value?.scrollTop || 0; };
    const vpStyle = computed(() => {
      const el = content.value;
      if (!el) return { top: '0px', height: '20%' };
      const ratio = el.clientHeight / el.scrollHeight;
      const top = (scrollTop.value / el.scrollHeight) * 100;
      return { top: top + '%', height: (ratio * 100) + '%' };
    });
    const jumpTo = (e) => {
      const el = content.value;
      if (!el) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientY - rect.top) / rect.height;
      el.scrollTop = pct * el.scrollHeight - el.clientHeight / 2;
    };
    return { content, updateViewport, vpStyle, jumpTo };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-scroll-to-top',
    title: 'Scroll to Top',
    description:
      'Build a scroll-to-top button that appears after scrolling down past a threshold. Includes smooth scroll animation and a progress indicator ring.',
    difficulty: 'beginner',
    category: 'navigation',
    framework: 'vue',
    concepts: ['ref', 'onMounted', 'onUnmounted', 'scroll events', 'smooth scroll'],
    demoCode: {
      html: `<div id="app">
  <div class="stt-wrap">
    <h3>Scroll to Top</h3>
    <div class="stt-content" ref="scrollEl" @scroll="onScroll">
      <div v-for="i in 20" :key="i" class="stt-block">Block {{ i }}</div>
    </div>
    <button v-if="showBtn" class="stt-btn" @click="scrollToTop">&#9650;</button>
  </div>
</div>`,
      css: `.stt-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; position: relative; }
.stt-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.stt-content { height: 220px; overflow-y: auto; border-radius: 8px; }
.stt-block { padding: 18px; background: #0f172a; margin-bottom: 4px; border-radius: 6px; color: #94a3b8; font-size: 13px; }
.stt-btn {
  position: absolute; bottom: 36px; right: 36px; width: 44px; height: 44px;
  border-radius: 50%; border: none; background: #4fc3f7; color: #0f172a;
  font-size: 18px; cursor: pointer; box-shadow: 0 4px 12px rgba(79,195,247,0.3);
  animation: fadeIn 0.2s;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
.stt-btn:hover { background: #81d4fa; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const scrollEl = ref(null);
    const showBtn = ref(false);
    const onScroll = () => {
      showBtn.value = (scrollEl.value?.scrollTop || 0) > 100;
    };
    const scrollToTop = () => {
      scrollEl.value?.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return { scrollEl, showBtn, onScroll, scrollToTop };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-anchor-links',
    title: 'Anchor Links',
    description:
      'Create smooth-scrolling anchor links that navigate to sections within the page. Highlights the active section in the navigation based on scroll position.',
    difficulty: 'beginner',
    category: 'navigation',
    framework: 'vue',
    concepts: ['ref', 'scroll events', 'scrollIntoView', 'v-for'],
    demoCode: {
      html: `<div id="app">
  <div class="al-wrap">
    <div class="al-nav">
      <a v-for="s in sections" :key="s.id" class="al-link" :class="{ active: active === s.id }"
        @click.prevent="scrollTo(s.id)">{{ s.label }}</a>
    </div>
    <div class="al-content" ref="contentEl" @scroll="onScroll">
      <div v-for="s in sections" :key="s.id" :id="s.id" class="al-section">
        <h4>{{ s.label }}</h4>
        <p>{{ s.desc }}</p>
      </div>
    </div>
  </div>
</div>`,
      css: `.al-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; display: flex; gap: 16px; }
.al-nav { display: flex; flex-direction: column; gap: 4px; min-width: 120px; }
.al-link { padding: 6px 12px; color: #64748b; font-size: 13px; text-decoration: none; border-radius: 6px; cursor: pointer; border-left: 2px solid transparent; }
.al-link:hover { color: #e0e0e0; }
.al-link.active { color: #4fc3f7; border-left-color: #4fc3f7; background: rgba(79,195,247,0.08); }
.al-content { flex: 1; height: 220px; overflow-y: auto; border-radius: 8px; }
.al-section { padding: 24px; background: #0f172a; margin-bottom: 4px; border-radius: 8px; min-height: 120px; }
.al-section h4 { color: #e0e0e0; margin: 0 0 8px; }
.al-section p { color: #94a3b8; font-size: 13px; margin: 0; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const sections = [
      { id: 'intro', label: 'Introduction', desc: 'Welcome to the Vue guide. This section covers the basics.' },
      { id: 'setup', label: 'Setup', desc: 'Learn how to set up a new Vue 3 project with Vite.' },
      { id: 'components', label: 'Components', desc: 'Understand single-file components and the Composition API.' },
      { id: 'routing', label: 'Routing', desc: 'Add client-side routing with Vue Router.' },
      { id: 'deploy', label: 'Deploy', desc: 'Deploy your Vue app to production.' },
    ];
    const active = ref('intro');
    const contentEl = ref(null);
    const scrollTo = (id) => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      active.value = id;
    };
    const onScroll = () => {
      const container = contentEl.value;
      if (!container) return;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop - container.scrollTop < 80) active.value = s.id;
      }
    };
    return { sections, active, contentEl, scrollTo, onScroll };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-table-of-contents',
    title: 'Table of Contents',
    description:
      'Build an auto-generated table of contents from heading elements. Highlights the current section, supports nested levels, and scrolls to sections on click.',
    difficulty: 'intermediate',
    category: 'navigation',
    framework: 'vue',
    concepts: ['onMounted', 'ref', 'v-for', 'scroll events', 'DOM querying'],
    demoCode: {
      html: `<div id="app">
  <div class="toc-wrap">
    <div class="toc-sidebar">
      <h4>Contents</h4>
      <a v-for="h in headings" :key="h.id" class="toc-link" :class="{ active: activeId === h.id, sub: h.level > 1 }"
        @click.prevent="goTo(h.id)">{{ h.text }}</a>
    </div>
    <div class="toc-content" ref="contentEl" @scroll="onScroll">
      <div id="toc-overview" class="toc-section"><h2>Overview</h2><p>An introduction to the project.</p></div>
      <div id="toc-features" class="toc-section"><h2>Features</h2><p>Key features and capabilities.</p></div>
      <div id="toc-api" class="toc-section"><h2>API</h2><p>REST API documentation.</p>
        <div id="toc-endpoints" class="toc-sub"><h3>Endpoints</h3><p>Available routes.</p></div>
        <div id="toc-auth" class="toc-sub"><h3>Authentication</h3><p>Auth mechanisms.</p></div>
      </div>
      <div id="toc-faq" class="toc-section"><h2>FAQ</h2><p>Frequently asked questions.</p></div>
    </div>
  </div>
</div>`,
      css: `.toc-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; display: flex; gap: 16px; }
.toc-sidebar { min-width: 140px; }
.toc-sidebar h4 { color: #e0e0e0; margin: 0 0 10px; font-size: 14px; }
.toc-link { display: block; padding: 4px 10px; color: #64748b; font-size: 13px; text-decoration: none; cursor: pointer; border-left: 2px solid transparent; margin-bottom: 2px; }
.toc-link.sub { padding-left: 22px; font-size: 12px; }
.toc-link:hover { color: #e0e0e0; }
.toc-link.active { color: #4fc3f7; border-left-color: #4fc3f7; }
.toc-content { flex: 1; height: 240px; overflow-y: auto; border-radius: 8px; }
.toc-section { padding: 20px; background: #0f172a; margin-bottom: 4px; border-radius: 8px; }
.toc-section h2 { color: #e0e0e0; margin: 0 0 6px; font-size: 16px; }
.toc-section p, .toc-sub p { color: #94a3b8; font-size: 13px; margin: 0; }
.toc-sub { padding: 12px 0 0 16px; }
.toc-sub h3 { color: #94a3b8; font-size: 14px; margin: 0 0 4px; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const headings = [
      { id: 'toc-overview', text: 'Overview', level: 1 },
      { id: 'toc-features', text: 'Features', level: 1 },
      { id: 'toc-api', text: 'API', level: 1 },
      { id: 'toc-endpoints', text: 'Endpoints', level: 2 },
      { id: 'toc-auth', text: 'Authentication', level: 2 },
      { id: 'toc-faq', text: 'FAQ', level: 1 },
    ];
    const activeId = ref('toc-overview');
    const contentEl = ref(null);
    const goTo = (id) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      activeId.value = id;
    };
    const onScroll = () => {
      const c = contentEl.value;
      if (!c) return;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.offsetTop - c.scrollTop < 80) activeId.value = h.id;
      }
    };
    return { headings, activeId, contentEl, goTo, onScroll };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-step-indicator',
    title: 'Step Indicator',
    description:
      'Create a horizontal step indicator/wizard showing progress through a multi-step process. Steps show completed, current, and upcoming states with connecting lines.',
    difficulty: 'beginner',
    category: 'navigation',
    framework: 'vue',
    concepts: ['v-for', 'ref', 'class binding', 'computed'],
    demoCode: {
      html: `<div id="app">
  <div class="si-wrap">
    <h3>Step Indicator</h3>
    <div class="si-steps">
      <div v-for="(step, i) in steps" :key="i" class="si-step" :class="{ done: i < current, active: i === current }">
        <div class="si-circle">{{ i < current ? '&#10003;' : i + 1 }}</div>
        <div class="si-label">{{ step }}</div>
        <div v-if="i < steps.length - 1" class="si-line" :class="{ filled: i < current }"></div>
      </div>
    </div>
    <div class="si-content">
      <p>Current step: <strong>{{ steps[current] }}</strong></p>
      <div class="si-btns">
        <button @click="current = Math.max(0, current - 1)" :disabled="current === 0">Back</button>
        <button @click="current = Math.min(steps.length - 1, current + 1)" class="primary" :disabled="current === steps.length - 1">Next</button>
      </div>
    </div>
  </div>
</div>`,
      css: `.si-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.si-wrap h3 { color: #e0e0e0; margin: 0 0 20px; }
.si-steps { display: flex; align-items: flex-start; margin-bottom: 24px; }
.si-step { display: flex; flex-direction: column; align-items: center; flex: 1; position: relative; }
.si-circle {
  width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  background: #334155; color: #64748b; font-size: 14px; font-weight: 600; z-index: 1;
}
.si-step.active .si-circle { background: #4fc3f7; color: #0f172a; }
.si-step.done .si-circle { background: #22c55e; color: #fff; }
.si-label { color: #64748b; font-size: 11px; margin-top: 6px; text-align: center; }
.si-step.active .si-label { color: #4fc3f7; }
.si-step.done .si-label { color: #22c55e; }
.si-line { position: absolute; top: 18px; left: 50%; width: 100%; height: 2px; background: #334155; }
.si-line.filled { background: #22c55e; }
.si-content { text-align: center; }
.si-content p { color: #94a3b8; font-size: 14px; margin: 0 0 14px; }
.si-content strong { color: #e0e0e0; }
.si-btns { display: flex; justify-content: center; gap: 10px; }
.si-btns button { padding: 8px 20px; border-radius: 6px; border: 1px solid #334155; background: transparent; color: #e0e0e0; cursor: pointer; }
.si-btns button.primary { background: #4fc3f7; color: #0f172a; border: none; font-weight: 600; }
.si-btns button:disabled { opacity: 0.4; cursor: not-allowed; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const steps = ['Account', 'Profile', 'Preferences', 'Confirm'];
    const current = ref(0);
    return { steps, current };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-app-shell',
    title: 'App Shell',
    description:
      'Build a full application shell layout with collapsible sidebar, header, and main content area. Supports responsive behavior and navigation highlights.',
    difficulty: 'intermediate',
    category: 'navigation',
    framework: 'vue',
    concepts: ['ref', 'v-for', 'class binding', 'layout composition'],
    demoCode: {
      html: `<div id="app">
  <div class="as-shell">
    <aside class="as-sidebar" :class="{ collapsed: collapsed }">
      <div class="as-brand">{{ collapsed ? 'V' : 'VueApp' }}</div>
      <nav class="as-nav">
        <a v-for="item in navItems" :key="item.label" class="as-link"
          :class="{ active: active === item.label }" @click="active = item.label">
          <span class="as-icon">{{ item.icon }}</span>
          <span v-if="!collapsed" class="as-text">{{ item.label }}</span>
        </a>
      </nav>
    </aside>
    <div class="as-main">
      <header class="as-header">
        <button class="as-toggle" @click="collapsed = !collapsed">&#9776;</button>
        <span class="as-title">{{ active }}</span>
      </header>
      <div class="as-content"><p>Content for {{ active }}</p></div>
    </div>
  </div>
</div>`,
      css: `.as-shell { display: flex; height: 280px; border-radius: 10px; overflow: hidden; border: 1px solid #334155; }
.as-sidebar { width: 180px; background: #0a0a1a; transition: width 0.3s; display: flex; flex-direction: column; flex-shrink: 0; }
.as-sidebar.collapsed { width: 54px; }
.as-brand { padding: 16px; color: #4fc3f7; font-weight: 700; font-size: 16px; border-bottom: 1px solid #1e293b; white-space: nowrap; overflow: hidden; }
.as-nav { flex: 1; padding: 8px 0; }
.as-link { display: flex; align-items: center; gap: 10px; padding: 10px 16px; color: #64748b; cursor: pointer; font-size: 13px; text-decoration: none; }
.as-link:hover { color: #e0e0e0; background: rgba(79,195,247,0.06); }
.as-link.active { color: #4fc3f7; background: rgba(79,195,247,0.1); }
.as-icon { font-size: 16px; min-width: 18px; text-align: center; }
.as-main { flex: 1; display: flex; flex-direction: column; background: #1a1a2e; }
.as-header { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-bottom: 1px solid #334155; }
.as-toggle { background: none; border: none; color: #e0e0e0; font-size: 18px; cursor: pointer; }
.as-title { color: #e0e0e0; font-weight: 600; font-size: 15px; }
.as-content { flex: 1; padding: 20px; color: #94a3b8; font-size: 14px; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const collapsed = ref(false);
    const active = ref('Dashboard');
    const navItems = [
      { label: 'Dashboard', icon: '⌂' },
      { label: 'Projects', icon: '☆' },
      { label: 'Messages', icon: '✉' },
      { label: 'Settings', icon: '⚙' },
    ];
    return { collapsed, active, navItems };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-header-scroll-hide',
    title: 'Header Scroll Hide',
    description:
      'Create a header that hides when scrolling down and reappears when scrolling up. Uses scroll delta detection for a smooth, non-jarring experience.',
    difficulty: 'intermediate',
    category: 'navigation',
    framework: 'vue',
    concepts: ['ref', 'scroll events', 'CSS transitions', 'computed'],
    demoCode: {
      html: `<div id="app">
  <div class="hsh-wrap">
    <h3>Scroll to Hide Header</h3>
    <div class="hsh-container" ref="containerEl" @scroll="onScroll">
      <div class="hsh-header" :class="{ hidden: headerHidden }">
        <span>App Header</span>
        <span class="hsh-badge">3</span>
      </div>
      <div class="hsh-body">
        <div v-for="i in 15" :key="i" class="hsh-block">Content Block {{ i }}</div>
      </div>
    </div>
  </div>
</div>`,
      css: `.hsh-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.hsh-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.hsh-container { position: relative; height: 220px; overflow-y: auto; border-radius: 8px; }
.hsh-header {
  position: sticky; top: 0; z-index: 10; display: flex; justify-content: space-between;
  align-items: center; padding: 12px 16px; background: #0f172a; border-bottom: 1px solid #334155;
  transition: transform 0.3s; color: #e0e0e0; font-weight: 600; font-size: 14px;
}
.hsh-header.hidden { transform: translateY(-100%); }
.hsh-badge { background: #ef4444; color: #fff; padding: 1px 8px; border-radius: 10px; font-size: 11px; }
.hsh-body { padding-top: 4px; }
.hsh-block { padding: 16px; background: #0a0a1a; margin-bottom: 4px; border-radius: 6px; color: #94a3b8; font-size: 13px; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const containerEl = ref(null);
    const headerHidden = ref(false);
    let lastScroll = 0;
    const onScroll = () => {
      const el = containerEl.value;
      if (!el) return;
      const st = el.scrollTop;
      headerHidden.value = st > lastScroll && st > 50;
      lastScroll = st;
    };
    return { containerEl, headerHidden, onScroll };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-sticky-header',
    title: 'Sticky Header',
    description:
      'Build a header that becomes sticky with a shadow after scrolling past a threshold. Includes a progress bar showing page scroll position.',
    difficulty: 'beginner',
    category: 'navigation',
    framework: 'vue',
    concepts: ['ref', 'scroll events', 'class binding', 'computed'],
    demoCode: {
      html: `<div id="app">
  <div class="sh-wrap">
    <div class="sh-container" ref="containerEl" @scroll="onScroll">
      <div class="sh-header" :class="{ stuck: isSticky }">
        <span>Sticky Header</span>
        <div class="sh-progress" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="sh-hero"><h3>Welcome</h3><p>Scroll down to see the sticky header.</p></div>
      <div class="sh-body">
        <div v-for="i in 12" :key="i" class="sh-block">Section {{ i }}</div>
      </div>
    </div>
  </div>
</div>`,
      css: `.sh-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.sh-container { height: 260px; overflow-y: auto; border-radius: 8px; position: relative; }
.sh-header {
  position: sticky; top: 0; z-index: 10; padding: 12px 16px; background: #0f172a;
  color: #e0e0e0; font-weight: 600; font-size: 14px; transition: box-shadow 0.2s;
}
.sh-header.stuck { box-shadow: 0 2px 8px rgba(0,0,0,0.4); }
.sh-progress { position: absolute; bottom: 0; left: 0; height: 2px; background: #4fc3f7; transition: width 0.1s; }
.sh-hero { padding: 30px 20px; background: linear-gradient(135deg, #1e3a5f, #1a1a2e); border-radius: 0 0 8px 8px; }
.sh-hero h3 { color: #e0e0e0; margin: 0 0 6px; }
.sh-hero p { color: #94a3b8; font-size: 13px; margin: 0; }
.sh-body { padding: 4px 0; }
.sh-block { padding: 16px; background: #0a0a1a; margin-bottom: 4px; border-radius: 6px; color: #94a3b8; font-size: 13px; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const containerEl = ref(null);
    const isSticky = ref(false);
    const progress = ref(0);
    const onScroll = () => {
      const el = containerEl.value;
      if (!el) return;
      isSticky.value = el.scrollTop > 80;
      progress.value = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
    };
    return { containerEl, isSticky, progress, onScroll };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-page-transitions',
    title: 'Page Transitions',
    description:
      'Create animated page transitions between views using Vue transition components. Supports fade, slide, and scale effects with configurable durations.',
    difficulty: 'intermediate',
    category: 'navigation',
    framework: 'vue',
    concepts: ['ref', 'transition', 'v-if', 'CSS animations'],
    demoCode: {
      html: `<div id="app">
  <div class="pt-wrap">
    <div class="pt-nav">
      <button v-for="p in pages" :key="p" @click="changePage(p)" :class="{ active: page === p }">{{ p }}</button>
    </div>
    <div class="pt-select">
      <label>Transition:</label>
      <select v-model="effect">
        <option>fade</option><option>slide</option><option>scale</option>
      </select>
    </div>
    <div class="pt-viewport">
      <transition :name="effect" mode="out-in">
        <div :key="page" class="pt-page">
          <h4>{{ page }}</h4>
          <p>This is the {{ page }} page content.</p>
        </div>
      </transition>
    </div>
  </div>
</div>`,
      css: `.pt-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.pt-nav { display: flex; gap: 6px; margin-bottom: 12px; }
.pt-nav button { padding: 6px 16px; border-radius: 6px; border: 1px solid #334155; background: transparent; color: #94a3b8; cursor: pointer; font-size: 13px; }
.pt-nav button.active { background: #4fc3f7; color: #0f172a; border: none; }
.pt-select { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; color: #94a3b8; font-size: 13px; }
.pt-select select { padding: 4px 8px; border-radius: 4px; border: 1px solid #334155; background: #0f172a; color: #e0e0e0; }
.pt-viewport { background: #0f172a; border-radius: 8px; min-height: 120px; overflow: hidden; }
.pt-page { padding: 24px; }
.pt-page h4 { color: #e0e0e0; margin: 0 0 8px; }
.pt-page p { color: #94a3b8; margin: 0; font-size: 13px; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: transform 0.3s, opacity 0.3s; }
.slide-enter-from { transform: translateX(30px); opacity: 0; }
.slide-leave-to { transform: translateX(-30px); opacity: 0; }
.scale-enter-active, .scale-leave-active { transition: transform 0.3s, opacity 0.3s; }
.scale-enter-from { transform: scale(0.9); opacity: 0; }
.scale-leave-to { transform: scale(1.1); opacity: 0; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const pages = ['Home', 'About', 'Contact'];
    const page = ref('Home');
    const effect = ref('fade');
    const changePage = (p) => { page.value = p; };
    return { pages, page, effect, changePage };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-route-guard',
    title: 'Route Guard',
    description:
      'Simulate route guard behavior with authentication checks. Shows a login form when accessing protected routes and redirects after successful authentication.',
    difficulty: 'intermediate',
    category: 'navigation',
    framework: 'vue',
    concepts: ['ref', 'reactive', 'computed', 'v-if', 'simulated routing'],
    demoCode: {
      html: `<div id="app">
  <div class="rg-wrap">
    <h3>Route Guard Demo</h3>
    <div class="rg-nav">
      <button v-for="r in routes" :key="r.name" @click="navigate(r)" :class="{ active: current === r.name }">
        {{ r.name }} {{ r.protected ? '&#x1f512;' : '' }}
      </button>
    </div>
    <div class="rg-content">
      <div v-if="showLogin" class="rg-login">
        <h4>Login Required</h4>
        <input v-model="password" type="password" placeholder="Enter password (any)" />
        <button @click="login">Login</button>
      </div>
      <div v-else class="rg-page">
        <h4>{{ current }}</h4>
        <p>{{ isLoggedIn ? 'Authenticated' : 'Public' }} page content.</p>
        <button v-if="isLoggedIn" @click="logout" class="rg-logout">Logout</button>
      </div>
    </div>
  </div>
</div>`,
      css: `.rg-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.rg-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.rg-nav { display: flex; gap: 6px; margin-bottom: 14px; }
.rg-nav button { padding: 6px 14px; border-radius: 6px; border: 1px solid #334155; background: transparent; color: #94a3b8; cursor: pointer; font-size: 13px; }
.rg-nav button.active { background: #4fc3f7; color: #0f172a; border: none; }
.rg-content { background: #0f172a; border-radius: 8px; padding: 20px; min-height: 100px; }
.rg-login { text-align: center; }
.rg-login h4 { color: #e0e0e0; margin: 0 0 12px; }
.rg-login input { padding: 8px 12px; border-radius: 6px; border: 1px solid #334155; background: #1e293b; color: #e0e0e0; margin-bottom: 10px; outline: none; }
.rg-login button { padding: 8px 20px; border-radius: 6px; border: none; background: #4fc3f7; color: #0f172a; cursor: pointer; font-weight: 600; }
.rg-page h4 { color: #e0e0e0; margin: 0 0 6px; }
.rg-page p { color: #94a3b8; font-size: 13px; }
.rg-logout { margin-top: 10px; padding: 6px 14px; border-radius: 6px; border: 1px solid #ef4444; background: transparent; color: #ef4444; cursor: pointer; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const routes = [
      { name: 'Home', protected: false },
      { name: 'Dashboard', protected: true },
      { name: 'Settings', protected: true },
      { name: 'About', protected: false },
    ];
    const current = ref('Home');
    const isLoggedIn = ref(false);
    const showLogin = ref(false);
    const password = ref('');
    let pendingRoute = '';
    const navigate = (r) => {
      if (r.protected && !isLoggedIn.value) {
        pendingRoute = r.name;
        showLogin.value = true;
      } else {
        current.value = r.name;
        showLogin.value = false;
      }
    };
    const login = () => {
      isLoggedIn.value = true;
      showLogin.value = false;
      current.value = pendingRoute || 'Home';
    };
    const logout = () => { isLoggedIn.value = false; current.value = 'Home'; };
    return { routes, current, isLoggedIn, showLogin, password, navigate, login, logout };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-nested-routes',
    title: 'Nested Routes',
    description:
      'Simulate nested routing with parent and child views rendered in nested outlets. Demonstrates layout composition with shared navigation and sub-navigation.',
    difficulty: 'intermediate',
    category: 'navigation',
    framework: 'vue',
    concepts: ['ref', 'computed', 'v-if', 'nested views', 'reactive'],
    demoCode: {
      html: `<div id="app">
  <div class="nr-wrap">
    <div class="nr-nav">
      <button v-for="r in parentRoutes" :key="r" @click="parent = r; child = ''" :class="{ active: parent === r }">{{ r }}</button>
    </div>
    <div class="nr-content">
      <div v-if="children.length" class="nr-subnav">
        <button v-for="c in children" :key="c" @click="child = c" :class="{ active: child === c }">{{ c }}</button>
      </div>
      <div class="nr-view">
        <h4>{{ parent }}{{ child ? ' / ' + child : '' }}</h4>
        <p>{{ child ? 'Nested child view: ' + child : 'Select a sub-route above.' }}</p>
      </div>
    </div>
  </div>
</div>`,
      css: `.nr-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.nr-nav { display: flex; gap: 6px; margin-bottom: 12px; }
.nr-nav button { padding: 6px 14px; border-radius: 6px; border: 1px solid #334155; background: transparent; color: #94a3b8; cursor: pointer; font-size: 13px; }
.nr-nav button.active { background: #4fc3f7; color: #0f172a; border: none; }
.nr-content { background: #0f172a; border-radius: 8px; overflow: hidden; }
.nr-subnav { display: flex; gap: 4px; padding: 10px 14px; border-bottom: 1px solid #1e293b; }
.nr-subnav button { padding: 4px 12px; border-radius: 4px; border: none; background: transparent; color: #64748b; cursor: pointer; font-size: 12px; }
.nr-subnav button.active { background: rgba(79,195,247,0.15); color: #4fc3f7; }
.nr-view { padding: 20px; }
.nr-view h4 { color: #e0e0e0; margin: 0 0 6px; }
.nr-view p { color: #94a3b8; font-size: 13px; margin: 0; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const routeMap = {
      Users: ['List', 'Create', 'Roles'],
      Settings: ['General', 'Security', 'Billing'],
      Docs: [],
    };
    const parentRoutes = Object.keys(routeMap);
    const parent = ref('Users');
    const child = ref('');
    const children = computed(() => routeMap[parent.value] || []);
    return { parentRoutes, parent, child, children };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-tab-router',
    title: 'Tab Router',
    description:
      'Build a tab-based router that renders different components per tab while preserving state across tab switches using keep-alive behavior.',
    difficulty: 'beginner',
    category: 'navigation',
    framework: 'vue',
    concepts: ['ref', 'v-for', 'v-show', 'class binding', 'state preservation'],
    demoCode: {
      html: `<div id="app">
  <div class="tr-wrap">
    <h3>Tab Router</h3>
    <div class="tr-tabs">
      <button v-for="t in tabs" :key="t.name" @click="active = t.name"
        :class="{ active: active === t.name }">{{ t.name }}</button>
    </div>
    <div class="tr-panels">
      <div v-for="t in tabs" :key="t.name" v-show="active === t.name" class="tr-panel">
        <p>{{ t.content }}</p>
        <input v-model="t.input" :placeholder="'Type in ' + t.name + '...'" />
      </div>
    </div>
  </div>
</div>`,
      css: `.tr-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.tr-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.tr-tabs { display: flex; gap: 0; border-bottom: 1px solid #334155; }
.tr-tabs button { padding: 10px 20px; border: none; background: transparent; color: #64748b; cursor: pointer; font-size: 13px; border-bottom: 2px solid transparent; }
.tr-tabs button.active { color: #4fc3f7; border-bottom-color: #4fc3f7; }
.tr-panel { padding: 16px 0; }
.tr-panel p { color: #94a3b8; font-size: 13px; margin: 0 0 10px; }
.tr-panel input { padding: 8px 12px; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: #e0e0e0; outline: none; width: 100%; font-size: 14px; }
.tr-panel input:focus { border-color: #4fc3f7; }`,
      js: `const { createApp, ref, reactive } = Vue;

createApp({
  setup() {
    const tabs = reactive([
      { name: 'Profile', content: 'Edit your profile details.', input: '' },
      { name: 'Account', content: 'Manage account settings.', input: '' },
      { name: 'Billing', content: 'View invoices and plans.', input: '' },
    ]);
    const active = ref('Profile');
    return { tabs, active };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-deep-linking',
    title: 'Deep Linking',
    description:
      'Implement deep linking by syncing component state with URL hash parameters. Changing state updates the hash, and loading a hash restores state.',
    difficulty: 'intermediate',
    category: 'navigation',
    framework: 'vue',
    concepts: ['ref', 'watch', 'onMounted', 'location.hash', 'hashchange event'],
    demoCode: {
      html: `<div id="app">
  <div class="dl-wrap">
    <h3>Deep Linking</h3>
    <div class="dl-tabs">
      <button v-for="t in tabs" :key="t" @click="setTab(t)" :class="{ active: tab === t }">{{ t }}</button>
    </div>
    <div class="dl-content">
      <p>Active tab: <strong>{{ tab }}</strong></p>
      <p class="dl-hash">Hash: <code>#tab={{ tab.toLowerCase() }}</code></p>
    </div>
  </div>
</div>`,
      css: `.dl-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.dl-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.dl-tabs { display: flex; gap: 6px; margin-bottom: 14px; }
.dl-tabs button { padding: 6px 16px; border-radius: 6px; border: 1px solid #334155; background: transparent; color: #94a3b8; cursor: pointer; font-size: 13px; }
.dl-tabs button.active { background: #4fc3f7; color: #0f172a; border: none; }
.dl-content { background: #0f172a; border-radius: 8px; padding: 16px; }
.dl-content p { color: #94a3b8; font-size: 14px; margin: 4px 0; }
.dl-content strong { color: #e0e0e0; }
.dl-hash code { color: #4fc3f7; background: #1e293b; padding: 2px 6px; border-radius: 4px; font-size: 12px; }`,
      js: `const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    const tabs = ['Overview', 'Features', 'Pricing'];
    const tab = ref('Overview');
    const setTab = (t) => {
      tab.value = t;
      location.hash = 'tab=' + t.toLowerCase();
    };
    const readHash = () => {
      const match = location.hash.match(/tab=(\\w+)/);
      if (match) {
        const found = tabs.find(t => t.toLowerCase() === match[1]);
        if (found) tab.value = found;
      }
    };
    onMounted(() => {
      readHash();
      window.addEventListener('hashchange', readHash);
    });
    return { tabs, tab, setTab };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-url-state',
    title: 'URL State',
    description:
      'Sync component state with URL search parameters for shareable links. Filter and sort state persists in the URL so users can bookmark or share the current view.',
    difficulty: 'intermediate',
    category: 'navigation',
    framework: 'vue',
    concepts: ['ref', 'watch', 'URLSearchParams', 'onMounted', 'computed'],
    demoCode: {
      html: `<div id="app">
  <div class="us-wrap">
    <h3>URL State Sync</h3>
    <div class="us-controls">
      <select v-model="sort" @change="syncUrl">
        <option>name</option><option>date</option><option>price</option>
      </select>
      <select v-model="category" @change="syncUrl">
        <option>all</option><option>electronics</option><option>books</option><option>clothing</option>
      </select>
      <input v-model="query" @input="syncUrl" placeholder="Search..." />
    </div>
    <div class="us-state">
      <p>Sort: <strong>{{ sort }}</strong></p>
      <p>Category: <strong>{{ category }}</strong></p>
      <p>Query: <strong>{{ query || '(none)' }}</strong></p>
      <code class="us-url">?sort={{ sort }}&category={{ category }}{{ query ? '&q=' + query : '' }}</code>
    </div>
  </div>
</div>`,
      css: `.us-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.us-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.us-controls { display: flex; gap: 8px; margin-bottom: 14px; }
.us-controls select, .us-controls input {
  padding: 8px 10px; border-radius: 6px; border: 1px solid #334155;
  background: #0f172a; color: #e0e0e0; outline: none; font-size: 13px;
}
.us-controls input { flex: 1; }
.us-state { background: #0f172a; border-radius: 8px; padding: 14px; }
.us-state p { color: #94a3b8; font-size: 13px; margin: 4px 0; }
.us-state strong { color: #e0e0e0; }
.us-url { display: block; margin-top: 10px; color: #4fc3f7; background: #1e293b; padding: 6px 10px; border-radius: 4px; font-size: 12px; word-break: break-all; }`,
      js: `const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    const sort = ref('name');
    const category = ref('all');
    const query = ref('');
    const syncUrl = () => {
      const params = new URLSearchParams();
      params.set('sort', sort.value);
      params.set('category', category.value);
      if (query.value) params.set('q', query.value);
      history.replaceState(null, '', '?' + params.toString());
    };
    onMounted(() => {
      const params = new URLSearchParams(location.search);
      if (params.get('sort')) sort.value = params.get('sort');
      if (params.get('category')) category.value = params.get('category');
      if (params.get('q')) query.value = params.get('q');
    });
    return { sort, category, query, syncUrl };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-back-to-top',
    title: 'Back to Top',
    description:
      'Create a back-to-top button with scroll progress ring indicator. The circular SVG progress shows how far the user has scrolled down the content.',
    difficulty: 'beginner',
    category: 'navigation',
    framework: 'vue',
    concepts: ['ref', 'computed', 'scroll events', 'SVG'],
    demoCode: {
      html: `<div id="app">
  <div class="btt-wrap">
    <h3>Back to Top with Progress</h3>
    <div class="btt-content" ref="scrollEl" @scroll="onScroll">
      <div v-for="i in 16" :key="i" class="btt-block">Content block {{ i }}</div>
    </div>
    <button v-if="showBtn" class="btt-btn" @click="scrollTop">
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="20" fill="none" stroke="#334155" stroke-width="2"/>
        <circle cx="22" cy="22" r="20" fill="none" stroke="#4fc3f7" stroke-width="2"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="circumference - (progress / 100) * circumference"
          stroke-linecap="round" transform="rotate(-90 22 22)"/>
      </svg>
      <span class="btt-arrow">&#9650;</span>
    </button>
  </div>
</div>`,
      css: `.btt-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; position: relative; }
.btt-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.btt-content { height: 200px; overflow-y: auto; border-radius: 8px; }
.btt-block { padding: 14px; background: #0f172a; margin-bottom: 4px; border-radius: 6px; color: #94a3b8; font-size: 13px; }
.btt-btn {
  position: absolute; bottom: 36px; right: 36px; width: 44px; height: 44px;
  border: none; background: transparent; cursor: pointer; padding: 0;
}
.btt-arrow { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #4fc3f7; font-size: 14px; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const scrollEl = ref(null);
    const progress = ref(0);
    const showBtn = ref(false);
    const circumference = 2 * Math.PI * 20;
    const onScroll = () => {
      const el = scrollEl.value;
      if (!el) return;
      const max = el.scrollHeight - el.clientHeight;
      progress.value = max > 0 ? (el.scrollTop / max) * 100 : 0;
      showBtn.value = el.scrollTop > 60;
    };
    const scrollTop = () => scrollEl.value?.scrollTo({ top: 0, behavior: 'smooth' });
    return { scrollEl, progress, showBtn, circumference, onScroll, scrollTop };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-scroll-spy',
    title: 'Scroll Spy',
    description:
      'Build a scroll spy that automatically highlights the navigation item corresponding to the currently visible section as the user scrolls through the page.',
    difficulty: 'intermediate',
    category: 'navigation',
    framework: 'vue',
    concepts: ['ref', 'onMounted', 'scroll events', 'IntersectionObserver', 'v-for'],
    demoCode: {
      html: `<div id="app">
  <div class="ss-wrap">
    <div class="ss-sidebar">
      <a v-for="s in sections" :key="s" class="ss-link" :class="{ active: active === s }"
        @click.prevent="goTo(s)">{{ s }}</a>
    </div>
    <div class="ss-content" ref="contentEl" @scroll="onScroll">
      <div v-for="s in sections" :key="s" :id="'ss-' + s" class="ss-section">
        <h4>{{ s }}</h4>
        <p>Content for the {{ s }} section. Scroll to see the navigation update.</p>
      </div>
    </div>
  </div>
</div>`,
      css: `.ss-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; display: flex; gap: 16px; }
.ss-sidebar { min-width: 110px; display: flex; flex-direction: column; gap: 2px; }
.ss-link { padding: 6px 12px; color: #64748b; font-size: 13px; cursor: pointer; border-radius: 6px; text-decoration: none; border-left: 2px solid transparent; }
.ss-link:hover { color: #e0e0e0; }
.ss-link.active { color: #4fc3f7; border-left-color: #4fc3f7; background: rgba(79,195,247,0.06); }
.ss-content { flex: 1; height: 220px; overflow-y: auto; border-radius: 8px; }
.ss-section { padding: 24px; background: #0f172a; margin-bottom: 4px; border-radius: 8px; min-height: 140px; }
.ss-section h4 { color: #e0e0e0; margin: 0 0 8px; }
.ss-section p { color: #94a3b8; font-size: 13px; margin: 0; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const sections = ['Intro', 'Features', 'API', 'Examples', 'Support'];
    const active = ref('Intro');
    const contentEl = ref(null);
    const goTo = (s) => {
      const el = document.getElementById('ss-' + s);
      el?.scrollIntoView({ behavior: 'smooth' });
    };
    const onScroll = () => {
      const c = contentEl.value;
      if (!c) return;
      for (const s of sections) {
        const el = document.getElementById('ss-' + s);
        if (el && el.offsetTop - c.scrollTop < 80) active.value = s;
      }
    };
    return { sections, active, contentEl, goTo, onScroll };
  }
}).mount('#app');`,
    },
  },
  // Advanced
  {
    id: 'vue-theme-switcher',
    title: 'Theme Switcher',
    description:
      'Build a theme switcher that toggles between light/dark/system themes. Persists preference to localStorage and applies CSS custom properties dynamically.',
    difficulty: 'intermediate',
    category: 'advanced',
    framework: 'vue',
    concepts: ['ref', 'watch', 'localStorage', 'CSS variables', 'onMounted'],
    demoCode: {
      html: `<div id="app">
  <div class="ts-wrap" :class="'theme-' + theme">
    <div class="ts-header">
      <h3>Theme Switcher</h3>
      <div class="ts-btns">
        <button v-for="t in themes" :key="t" @click="theme = t" :class="{ active: theme === t }">{{ t }}</button>
      </div>
    </div>
    <div class="ts-preview">
      <div class="ts-card">
        <h4>Card Title</h4>
        <p>This card respects the current theme.</p>
        <button class="ts-action">Action</button>
      </div>
    </div>
  </div>
</div>`,
      css: `.ts-wrap { padding: 24px; border-radius: 12px; transition: all 0.3s; }
.theme-dark { background: #1a1a2e; color: #e0e0e0; }
.theme-light { background: #f1f5f9; color: #1e293b; }
.theme-system { background: #1a1a2e; color: #e0e0e0; }
.ts-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.ts-header h3 { margin: 0; }
.ts-btns { display: flex; gap: 4px; }
.ts-btns button { padding: 4px 12px; border-radius: 4px; border: 1px solid #334155; background: transparent; color: inherit; cursor: pointer; font-size: 12px; text-transform: capitalize; }
.ts-btns button.active { background: #4fc3f7; color: #0f172a; border-color: #4fc3f7; }
.theme-light .ts-btns button { border-color: #cbd5e1; }
.ts-preview { display: flex; justify-content: center; }
.ts-card { padding: 20px; border-radius: 10px; width: 260px; }
.theme-dark .ts-card { background: #0f172a; }
.theme-light .ts-card { background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.ts-card h4 { margin: 0 0 8px; font-size: 16px; }
.ts-card p { font-size: 13px; opacity: 0.7; margin: 0 0 12px; }
.ts-action { padding: 6px 16px; border-radius: 6px; border: none; background: #4fc3f7; color: #0f172a; cursor: pointer; font-weight: 600; }`,
      js: `const { createApp, ref, watch, onMounted } = Vue;

createApp({
  setup() {
    const themes = ['dark', 'light', 'system'];
    const theme = ref(localStorage.getItem('theme') || 'dark');
    watch(theme, (val) => { localStorage.setItem('theme', val); });
    onMounted(() => {
      const saved = localStorage.getItem('theme');
      if (saved) theme.value = saved;
    });
    return { themes, theme };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-i18n-locale',
    title: 'i18n Locale',
    description:
      'Create a simple internationalization system with locale switching. Demonstrates reactive translations, RTL support detection, and pluralization rules.',
    difficulty: 'intermediate',
    category: 'advanced',
    framework: 'vue',
    concepts: ['reactive', 'computed', 'ref', 'watch'],
    demoCode: {
      html: `<div id="app">
  <div class="i18n-wrap" :dir="dir">
    <div class="i18n-header">
      <h3>{{ t('title') }}</h3>
      <select v-model="locale">
        <option v-for="l in locales" :key="l.code" :value="l.code">{{ l.flag }} {{ l.name }}</option>
      </select>
    </div>
    <div class="i18n-card">
      <p>{{ t('greeting') }}</p>
      <p>{{ t('items', count) }}</p>
      <div class="i18n-counter">
        <button @click="count = Math.max(0, count - 1)">-</button>
        <span>{{ count }}</span>
        <button @click="count++">+</button>
      </div>
    </div>
  </div>
</div>`,
      css: `.i18n-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.i18n-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.i18n-header h3 { color: #e0e0e0; margin: 0; }
.i18n-header select { padding: 6px 10px; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: #e0e0e0; }
.i18n-card { background: #0f172a; border-radius: 8px; padding: 18px; }
.i18n-card p { color: #94a3b8; font-size: 14px; margin: 6px 0; }
.i18n-counter { display: flex; align-items: center; gap: 12px; margin-top: 10px; }
.i18n-counter button { width: 32px; height: 32px; border-radius: 6px; border: none; background: #4fc3f7; color: #0f172a; font-size: 18px; cursor: pointer; }
.i18n-counter span { color: #e0e0e0; font-size: 20px; font-weight: 700; min-width: 30px; text-align: center; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const locales = [
      { code: 'en', name: 'English', flag: 'EN', dir: 'ltr' },
      { code: 'es', name: 'Spanish', flag: 'ES', dir: 'ltr' },
      { code: 'ar', name: 'Arabic', flag: 'AR', dir: 'rtl' },
    ];
    const messages = {
      en: { title: 'Internationalization', greeting: 'Hello, welcome!', items_one: '{n} item', items_other: '{n} items' },
      es: { title: 'Internacionalizacion', greeting: 'Hola, bienvenido!', items_one: '{n} elemento', items_other: '{n} elementos' },
      ar: { title: 'التدويل', greeting: '!مرحبا بكم', items_one: 'عنصر {n}', items_other: 'عناصر {n}' },
    };
    const locale = ref('en');
    const count = ref(3);
    const dir = computed(() => locales.find(l => l.code === locale.value)?.dir || 'ltr');
    const t = (key, n) => {
      const m = messages[locale.value];
      if (key === 'items') {
        const k = n === 1 ? 'items_one' : 'items_other';
        return (m[k] || '').replace('{n}', n);
      }
      return m[key] || key;
    };
    return { locales, locale, count, dir, t };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-a11y-focus-trap',
    title: 'A11y Focus Trap',
    description:
      'Implement a focus trap for modal dialogs that keeps keyboard focus within the dialog. Handles Tab/Shift+Tab cycling and restores focus when the dialog closes.',
    difficulty: 'advanced',
    category: 'advanced',
    framework: 'vue',
    concepts: ['onMounted', 'onUnmounted', 'keydown', 'template refs', 'focus management'],
    demoCode: {
      html: `<div id="app">
  <div class="ft-wrap">
    <h3>Focus Trap</h3>
    <button class="ft-open" @click="open = true">Open Dialog</button>
    <div v-if="open" class="ft-overlay">
      <div class="ft-dialog" ref="dialog" @keydown="trapFocus">
        <h4>Trapped Dialog</h4>
        <p>Tab key cycles focus within this dialog only.</p>
        <input placeholder="First input" />
        <input placeholder="Second input" />
        <div class="ft-actions">
          <button @click="open = false">Cancel</button>
          <button class="ft-primary" @click="open = false">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
      css: `.ft-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.ft-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.ft-open { padding: 10px 24px; border-radius: 6px; border: none; background: #4fc3f7; color: #0f172a; font-weight: 600; cursor: pointer; }
.ft-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 100; display: flex; align-items: center; justify-content: center; }
.ft-dialog { background: #0f172a; border: 1px solid #334155; border-radius: 12px; padding: 24px; width: 340px; display: flex; flex-direction: column; gap: 12px; }
.ft-dialog h4 { color: #e0e0e0; margin: 0; }
.ft-dialog p { color: #94a3b8; font-size: 13px; margin: 0; }
.ft-dialog input { padding: 8px 12px; border-radius: 6px; border: 1px solid #334155; background: #1e293b; color: #e0e0e0; outline: none; }
.ft-dialog input:focus { border-color: #4fc3f7; }
.ft-actions { display: flex; gap: 8px; justify-content: flex-end; }
.ft-actions button { padding: 8px 16px; border-radius: 6px; border: 1px solid #334155; background: transparent; color: #e0e0e0; cursor: pointer; }
.ft-primary { background: #4fc3f7 !important; color: #0f172a !important; border: none !important; font-weight: 600; }`,
      js: `const { createApp, ref, watch, nextTick } = Vue;

createApp({
  setup() {
    const open = ref(false);
    const dialog = ref(null);
    const trapFocus = (e) => {
      if (e.key !== 'Tab') return;
      const focusable = dialog.value?.querySelectorAll('input, button, [tabindex]');
      if (!focusable || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    watch(open, (v) => {
      if (v) nextTick(() => { dialog.value?.querySelector('input')?.focus(); });
    });
    return { open, dialog, trapFocus };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-a11y-live-region',
    title: 'A11y Live Region',
    description:
      'Create ARIA live regions that announce dynamic content changes to screen readers. Demonstrates polite and assertive announcements with visual feedback.',
    difficulty: 'intermediate',
    category: 'advanced',
    framework: 'vue',
    concepts: ['ref', 'aria-live', 'aria-atomic', 'setTimeout'],
    demoCode: {
      html: `<div id="app">
  <div class="lr-wrap">
    <h3>Live Region Announcements</h3>
    <div class="lr-controls">
      <button @click="announce('polite', 'Your file has been saved.')">Polite</button>
      <button @click="announce('assertive', 'Error: Connection lost!')" class="lr-err">Assertive</button>
    </div>
    <div class="lr-log">
      <div v-for="(msg, i) in messages" :key="i" class="lr-msg" :class="msg.type">
        <span class="lr-type">{{ msg.type }}</span> {{ msg.text }}
      </div>
    </div>
    <div aria-live="polite" aria-atomic="true" class="sr-only">{{ politeMsg }}</div>
    <div aria-live="assertive" aria-atomic="true" class="sr-only">{{ assertiveMsg }}</div>
  </div>
</div>`,
      css: `.lr-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.lr-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.lr-controls { display: flex; gap: 8px; margin-bottom: 14px; }
.lr-controls button { padding: 8px 20px; border-radius: 6px; border: none; background: #4fc3f7; color: #0f172a; font-weight: 600; cursor: pointer; }
.lr-err { background: #ef4444 !important; color: #fff !important; }
.lr-log { background: #0f172a; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; gap: 6px; min-height: 80px; }
.lr-msg { color: #94a3b8; font-size: 13px; padding: 6px 10px; border-radius: 4px; background: #1e293b; }
.lr-msg.polite { border-left: 3px solid #4fc3f7; }
.lr-msg.assertive { border-left: 3px solid #ef4444; }
.lr-type { font-size: 10px; font-weight: 600; text-transform: uppercase; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }`,
      js: `const { createApp, ref, reactive } = Vue;

createApp({
  setup() {
    const messages = reactive([]);
    const politeMsg = ref('');
    const assertiveMsg = ref('');
    const announce = (type, text) => {
      messages.unshift({ type, text });
      if (messages.length > 5) messages.pop();
      if (type === 'polite') { politeMsg.value = ''; setTimeout(() => { politeMsg.value = text; }, 50); }
      else { assertiveMsg.value = ''; setTimeout(() => { assertiveMsg.value = text; }, 50); }
    };
    return { messages, politeMsg, assertiveMsg, announce };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-offline-indicator',
    title: 'Offline Indicator',
    description:
      'Build an offline detection banner that shows when the user loses internet connectivity. Uses the Navigator.onLine API and online/offline events for real-time detection.',
    difficulty: 'beginner',
    category: 'advanced',
    framework: 'vue',
    concepts: ['ref', 'onMounted', 'onUnmounted', 'navigator.onLine', 'event listeners'],
    demoCode: {
      html: `<div id="app">
  <div class="oi-wrap">
    <h3>Offline Indicator</h3>
    <div class="oi-banner" :class="online ? 'online' : 'offline'">
      <span class="oi-dot"></span>
      <span>{{ online ? 'You are online' : 'You are offline' }}</span>
    </div>
    <div class="oi-info">
      <p>Status: <strong>{{ online ? 'Connected' : 'Disconnected' }}</strong></p>
      <p>Try toggling your network connection to see the indicator change.</p>
      <button @click="online = !online" class="oi-sim">Simulate Toggle</button>
    </div>
  </div>
</div>`,
      css: `.oi-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.oi-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.oi-banner {
  display: flex; align-items: center; gap: 10px; padding: 12px 16px;
  border-radius: 8px; font-size: 14px; font-weight: 500; margin-bottom: 14px;
  transition: all 0.3s;
}
.oi-banner.online { background: rgba(34,197,94,0.15); color: #22c55e; }
.oi-banner.offline { background: rgba(239,68,68,0.15); color: #ef4444; }
.oi-dot { width: 10px; height: 10px; border-radius: 50%; background: currentColor; }
.oi-info { background: #0f172a; border-radius: 8px; padding: 14px; }
.oi-info p { color: #94a3b8; font-size: 13px; margin: 4px 0; }
.oi-info strong { color: #e0e0e0; }
.oi-sim { margin-top: 10px; padding: 6px 16px; border-radius: 6px; border: 1px solid #334155; background: transparent; color: #e0e0e0; cursor: pointer; }`,
      js: `const { createApp, ref, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const online = ref(navigator.onLine);
    const setOnline = () => { online.value = true; };
    const setOffline = () => { online.value = false; };
    onMounted(() => {
      window.addEventListener('online', setOnline);
      window.addEventListener('offline', setOffline);
    });
    onUnmounted(() => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    });
    return { online };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-websocket-chat',
    title: 'WebSocket Chat',
    description:
      'Create a simulated WebSocket chat interface with message sending, typing indicators, and auto-scrolling. Demonstrates reactive messaging patterns without a real server.',
    difficulty: 'advanced',
    category: 'advanced',
    framework: 'vue',
    concepts: ['ref', 'reactive', 'nextTick', 'setTimeout', 'template refs', 'scroll management'],
    demoCode: {
      html: `<div id="app">
  <div class="wc-wrap">
    <div class="wc-header">Chat Room</div>
    <div class="wc-messages" ref="msgContainer">
      <div v-for="msg in messages" :key="msg.id" class="wc-msg" :class="msg.from">
        <span class="wc-author">{{ msg.from === 'me' ? 'You' : msg.from }}</span>
        <span class="wc-text">{{ msg.text }}</span>
      </div>
      <div v-if="typing" class="wc-typing">Bot is typing...</div>
    </div>
    <div class="wc-input">
      <input v-model="input" @keydown.enter="send" placeholder="Type a message..." />
      <button @click="send">Send</button>
    </div>
  </div>
</div>`,
      css: `.wc-wrap { background: #1a1a2e; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; height: 320px; }
.wc-header { padding: 12px 16px; background: #0f172a; color: #e0e0e0; font-weight: 600; font-size: 14px; border-bottom: 1px solid #334155; }
.wc-messages { flex: 1; overflow-y: auto; padding: 12px; display: flex; flex-direction: column; gap: 8px; }
.wc-msg { max-width: 75%; padding: 8px 12px; border-radius: 10px; font-size: 13px; }
.wc-msg.me { align-self: flex-end; background: #4fc3f7; color: #0f172a; }
.wc-msg.bot { align-self: flex-start; background: #1e293b; color: #e0e0e0; }
.wc-author { display: block; font-size: 10px; font-weight: 600; margin-bottom: 2px; opacity: 0.7; }
.wc-typing { color: #64748b; font-size: 12px; font-style: italic; padding: 4px; }
.wc-input { display: flex; gap: 8px; padding: 12px; border-top: 1px solid #334155; background: #0f172a; }
.wc-input input { flex: 1; padding: 8px 12px; border-radius: 6px; border: 1px solid #334155; background: #1e293b; color: #e0e0e0; outline: none; }
.wc-input button { padding: 8px 16px; border-radius: 6px; border: none; background: #4fc3f7; color: #0f172a; font-weight: 600; cursor: pointer; }`,
      js: `const { createApp, ref, reactive, nextTick } = Vue;

createApp({
  setup() {
    let msgId = 0;
    const messages = reactive([
      { id: msgId++, from: 'bot', text: 'Hello! How can I help you today?' },
    ]);
    const input = ref('');
    const typing = ref(false);
    const msgContainer = ref(null);
    const scrollBottom = () => {
      nextTick(() => {
        const el = msgContainer.value;
        if (el) el.scrollTop = el.scrollHeight;
      });
    };
    const send = () => {
      const text = input.value.trim();
      if (!text) return;
      messages.push({ id: msgId++, from: 'me', text });
      input.value = '';
      scrollBottom();
      typing.value = true;
      setTimeout(() => {
        typing.value = false;
        messages.push({ id: msgId++, from: 'bot', text: 'Thanks for your message! This is a simulated reply.' });
        scrollBottom();
      }, 1200);
    };
    return { messages, input, typing, msgContainer, send };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-optimistic-update',
    title: 'Optimistic Update',
    description:
      'Demonstrate optimistic UI updates that immediately reflect changes while an async operation runs in the background, with rollback on failure.',
    difficulty: 'advanced',
    category: 'advanced',
    framework: 'vue',
    concepts: ['reactive', 'ref', 'setTimeout', 'optimistic patterns', 'rollback'],
    demoCode: {
      html: `<div id="app">
  <div class="ou-wrap">
    <h3>Optimistic Updates</h3>
    <div class="ou-controls">
      <label class="ou-fail-toggle">
        <input type="checkbox" v-model="simulateFail" /> Simulate failure
      </label>
    </div>
    <div class="ou-list">
      <div v-for="item in items" :key="item.id" class="ou-item" :class="{ pending: item.pending, failed: item.failed }">
        <span>{{ item.text }}</span>
        <button @click="toggleLike(item)" :class="{ liked: item.liked }">
          {{ item.liked ? '&#9829;' : '&#9825;' }} {{ item.likes }}
        </button>
      </div>
    </div>
    <div v-if="lastError" class="ou-error">{{ lastError }}</div>
  </div>
</div>`,
      css: `.ou-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.ou-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.ou-controls { margin-bottom: 12px; }
.ou-fail-toggle { color: #94a3b8; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 6px; }
.ou-list { display: flex; flex-direction: column; gap: 6px; }
.ou-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 14px; background: #0f172a; border-radius: 8px; color: #e0e0e0; font-size: 14px; transition: opacity 0.2s; }
.ou-item.pending { opacity: 0.6; }
.ou-item.failed { border-left: 3px solid #ef4444; }
.ou-item button { background: none; border: none; font-size: 18px; cursor: pointer; color: #94a3b8; }
.ou-item button.liked { color: #ef4444; }
.ou-error { margin-top: 10px; padding: 8px 12px; background: rgba(239,68,68,0.15); color: #ef4444; border-radius: 6px; font-size: 13px; }`,
      js: `const { createApp, reactive, ref } = Vue;

createApp({
  setup() {
    const simulateFail = ref(false);
    const lastError = ref('');
    const items = reactive([
      { id: 1, text: 'Vue 3 Composition API', likes: 42, liked: false, pending: false, failed: false },
      { id: 2, text: 'Reactive state management', likes: 38, liked: true, pending: false, failed: false },
      { id: 3, text: 'TypeScript integration', likes: 25, liked: false, pending: false, failed: false },
    ]);
    const toggleLike = (item) => {
      const prevLiked = item.liked;
      const prevLikes = item.likes;
      item.liked = !item.liked;
      item.likes += item.liked ? 1 : -1;
      item.pending = true;
      item.failed = false;
      lastError.value = '';
      setTimeout(() => {
        item.pending = false;
        if (simulateFail.value) {
          item.liked = prevLiked;
          item.likes = prevLikes;
          item.failed = true;
          lastError.value = 'Server error: Like operation failed. Rolled back.';
        }
      }, 1000);
    };
    return { simulateFail, lastError, items, toggleLike };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-undo-manager',
    title: 'Undo Manager',
    description:
      'Build an undo/redo manager that tracks state history. Supports keyboard shortcuts (Ctrl+Z, Ctrl+Shift+Z), history visualization, and configurable max history depth.',
    difficulty: 'advanced',
    category: 'advanced',
    framework: 'vue',
    concepts: ['reactive', 'ref', 'watch', 'onMounted', 'onUnmounted', 'keydown'],
    demoCode: {
      html: `<div id="app">
  <div class="um-wrap">
    <h3>Undo Manager</h3>
    <div class="um-toolbar">
      <button @click="undo" :disabled="historyIdx <= 0">Undo</button>
      <button @click="redo" :disabled="historyIdx >= history.length - 1">Redo</button>
      <span class="um-pos">{{ historyIdx + 1 }} / {{ history.length }}</span>
    </div>
    <div class="um-canvas">
      <div v-for="(item, i) in items" :key="i" class="um-block"
        :style="{ background: item }" @click="changeColor(i)"></div>
    </div>
    <p class="um-hint">Click blocks to change colors. Use Ctrl+Z / Ctrl+Shift+Z.</p>
  </div>
</div>`,
      css: `.um-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.um-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.um-toolbar { display: flex; gap: 8px; align-items: center; margin-bottom: 14px; }
.um-toolbar button { padding: 6px 16px; border-radius: 6px; border: 1px solid #334155; background: transparent; color: #e0e0e0; cursor: pointer; font-size: 13px; }
.um-toolbar button:disabled { opacity: 0.3; cursor: not-allowed; }
.um-pos { color: #64748b; font-size: 12px; margin-left: auto; }
.um-canvas { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; }
.um-block { height: 50px; border-radius: 6px; cursor: pointer; transition: transform 0.15s; }
.um-block:hover { transform: scale(1.05); }
.um-hint { color: #64748b; font-size: 12px; margin-top: 10px; }`,
      js: `const { createApp, ref, reactive, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const colors = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899'];
    const items = reactive(['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899']);
    const history = reactive([JSON.stringify(items)]);
    const historyIdx = ref(0);
    const pushHistory = () => {
      history.splice(historyIdx.value + 1);
      history.push(JSON.stringify(items));
      historyIdx.value = history.length - 1;
    };
    const restore = () => {
      const state = JSON.parse(history[historyIdx.value]);
      state.forEach((c, i) => { items[i] = c; });
    };
    const undo = () => { if (historyIdx.value > 0) { historyIdx.value--; restore(); } };
    const redo = () => { if (historyIdx.value < history.length - 1) { historyIdx.value++; restore(); } };
    const changeColor = (i) => {
      const ci = colors.indexOf(items[i]);
      items[i] = colors[(ci + 1) % colors.length];
      pushHistory();
    };
    const onKey = (e) => {
      if (e.ctrlKey && e.key === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); }
    };
    onMounted(() => window.addEventListener('keydown', onKey));
    onUnmounted(() => window.removeEventListener('keydown', onKey));
    return { items, history, historyIdx, undo, redo, changeColor };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-clipboard-manager',
    title: 'Clipboard Manager',
    description:
      'Create a clipboard manager that tracks copied items, allows one-click re-copy, and shows a history of clipboard operations with timestamps.',
    difficulty: 'intermediate',
    category: 'advanced',
    framework: 'vue',
    concepts: ['ref', 'reactive', 'navigator.clipboard', 'async/await'],
    demoCode: {
      html: `<div id="app">
  <div class="clip-wrap">
    <h3>Clipboard Manager</h3>
    <div class="clip-input">
      <input v-model="text" placeholder="Type something to copy..." />
      <button @click="copyText">Copy</button>
    </div>
    <div class="clip-history">
      <h4>History</h4>
      <div v-for="(item, i) in history" :key="i" class="clip-item" @click="reCopy(item)">
        <span class="clip-text">{{ item.text }}</span>
        <span class="clip-time">{{ item.time }}</span>
      </div>
      <div v-if="!history.length" class="clip-empty">No items copied yet.</div>
    </div>
    <div v-if="notification" class="clip-notif">{{ notification }}</div>
  </div>
</div>`,
      css: `.clip-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.clip-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.clip-input { display: flex; gap: 8px; margin-bottom: 14px; }
.clip-input input { flex: 1; padding: 8px 12px; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: #e0e0e0; outline: none; }
.clip-input button { padding: 8px 18px; border-radius: 6px; border: none; background: #4fc3f7; color: #0f172a; font-weight: 600; cursor: pointer; }
.clip-history { background: #0f172a; border-radius: 8px; padding: 12px; }
.clip-history h4 { color: #94a3b8; margin: 0 0 8px; font-size: 13px; }
.clip-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 10px; border-radius: 6px; cursor: pointer; color: #e0e0e0; font-size: 13px; }
.clip-item:hover { background: rgba(79,195,247,0.1); }
.clip-text { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.clip-time { color: #475569; font-size: 11px; flex-shrink: 0; margin-left: 8px; }
.clip-empty { color: #475569; font-size: 13px; text-align: center; padding: 12px; }
.clip-notif { margin-top: 10px; padding: 6px 12px; background: rgba(34,197,94,0.15); color: #22c55e; border-radius: 6px; font-size: 12px; text-align: center; }`,
      js: `const { createApp, ref, reactive } = Vue;

createApp({
  setup() {
    const text = ref('');
    const history = reactive([]);
    const notification = ref('');
    const copyText = async () => {
      if (!text.value.trim()) return;
      try {
        await navigator.clipboard.writeText(text.value);
        history.unshift({ text: text.value, time: new Date().toLocaleTimeString() });
        if (history.length > 10) history.pop();
        notification.value = 'Copied to clipboard!';
        text.value = '';
      } catch { notification.value = 'Copy failed'; }
      setTimeout(() => { notification.value = ''; }, 2000);
    };
    const reCopy = async (item) => {
      try {
        await navigator.clipboard.writeText(item.text);
        notification.value = 'Re-copied: ' + item.text;
      } catch { notification.value = 'Copy failed'; }
      setTimeout(() => { notification.value = ''; }, 2000);
    };
    return { text, history, notification, copyText, reCopy };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-hotkey-manager',
    title: 'Hotkey Manager',
    description:
      'Build a keyboard shortcut manager that registers, displays, and handles hotkey combinations. Shows a cheat sheet overlay and supports multi-key combos.',
    difficulty: 'intermediate',
    category: 'advanced',
    framework: 'vue',
    concepts: ['onMounted', 'onUnmounted', 'keydown', 'reactive', 'ref'],
    demoCode: {
      html: `<div id="app">
  <div class="hk-wrap">
    <h3>Hotkey Manager</h3>
    <p class="hk-hint">Press <kbd>?</kbd> to show shortcuts, or try the hotkeys below.</p>
    <div class="hk-log">
      <div v-for="(entry, i) in log" :key="i" class="hk-entry">
        <kbd>{{ entry.keys }}</kbd> <span>{{ entry.action }}</span>
      </div>
      <div v-if="!log.length" class="hk-empty">Press a hotkey to see it logged here.</div>
    </div>
    <div v-if="showSheet" class="hk-overlay" @click="showSheet = false">
      <div class="hk-sheet">
        <h4>Keyboard Shortcuts</h4>
        <div v-for="hk in hotkeys" :key="hk.keys" class="hk-row">
          <kbd>{{ hk.keys }}</kbd> <span>{{ hk.desc }}</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
      css: `.hk-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.hk-wrap h3 { color: #e0e0e0; margin: 0 0 8px; }
.hk-hint { color: #64748b; font-size: 13px; margin-bottom: 12px; }
kbd { background: #334155; padding: 2px 6px; border-radius: 4px; color: #e0e0e0; font-size: 12px; font-family: monospace; }
.hk-log { background: #0f172a; border-radius: 8px; padding: 12px; min-height: 80px; }
.hk-entry { padding: 6px 0; color: #94a3b8; font-size: 13px; display: flex; align-items: center; gap: 10px; }
.hk-empty { color: #475569; font-size: 13px; text-align: center; padding: 16px; }
.hk-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 100; display: flex; align-items: center; justify-content: center; }
.hk-sheet { background: #0f172a; border: 1px solid #334155; border-radius: 12px; padding: 20px; width: 320px; }
.hk-sheet h4 { color: #e0e0e0; margin: 0 0 12px; }
.hk-row { display: flex; align-items: center; gap: 12px; padding: 6px 0; color: #94a3b8; font-size: 13px; }`,
      js: `const { createApp, ref, reactive, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const hotkeys = [
      { keys: 'Ctrl+S', desc: 'Save document' },
      { keys: 'Ctrl+N', desc: 'New file' },
      { keys: 'Ctrl+F', desc: 'Find' },
      { keys: '?', desc: 'Show shortcuts' },
    ];
    const log = reactive([]);
    const showSheet = ref(false);
    const onKey = (e) => {
      if (e.key === '?') { showSheet.value = !showSheet.value; return; }
      const combo = (e.ctrlKey ? 'Ctrl+' : '') + e.key.toUpperCase();
      const found = hotkeys.find(h => h.keys.toUpperCase() === combo.toUpperCase());
      if (found) {
        e.preventDefault();
        log.unshift({ keys: found.keys, action: found.desc });
        if (log.length > 8) log.pop();
      }
    };
    onMounted(() => window.addEventListener('keydown', onKey));
    onUnmounted(() => window.removeEventListener('keydown', onKey));
    return { hotkeys, log, showSheet };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-idle-detector',
    title: 'Idle Detector',
    description:
      'Detect user inactivity and show a warning after a configurable idle period. Tracks mouse movement, keyboard input, and touch events to reset the idle timer.',
    difficulty: 'intermediate',
    category: 'advanced',
    framework: 'vue',
    concepts: ['ref', 'onMounted', 'onUnmounted', 'setTimeout', 'event listeners'],
    demoCode: {
      html: `<div id="app">
  <div class="id-wrap">
    <h3>Idle Detector</h3>
    <div class="id-status" :class="idle ? 'idle' : 'active'">
      <span class="id-dot"></span>
      {{ idle ? 'You are idle' : 'Active' }}
    </div>
    <div class="id-info">
      <p>Idle timeout: {{ timeout / 1000 }}s</p>
      <p>Time since last activity: {{ elapsed }}s</p>
      <input type="range" :min="3" :max="15" v-model.number="timeout" step="1" />
    </div>
    <div v-if="idle" class="id-warning">
      <p>Are you still there?</p>
      <button @click="resetIdle">I'm here!</button>
    </div>
  </div>
</div>`,
      css: `.id-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.id-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.id-status { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 8px; font-size: 14px; font-weight: 500; margin-bottom: 12px; }
.id-status.active { background: rgba(34,197,94,0.15); color: #22c55e; }
.id-status.idle { background: rgba(245,158,11,0.15); color: #f59e0b; }
.id-dot { width: 8px; height: 8px; border-radius: 50%; background: currentColor; }
.id-info { background: #0f172a; border-radius: 8px; padding: 14px; margin-bottom: 12px; }
.id-info p { color: #94a3b8; font-size: 13px; margin: 4px 0; }
.id-info input { width: 100%; margin-top: 6px; }
.id-warning { background: rgba(245,158,11,0.1); border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; text-align: center; }
.id-warning p { color: #f59e0b; margin: 0 0 10px; font-weight: 600; }
.id-warning button { padding: 8px 20px; border-radius: 6px; border: none; background: #4fc3f7; color: #0f172a; font-weight: 600; cursor: pointer; }`,
      js: `const { createApp, ref, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const timeout = ref(5000);
    const idle = ref(false);
    const elapsed = ref(0);
    let timer, counter;
    const resetIdle = () => {
      idle.value = false;
      elapsed.value = 0;
      clearTimeout(timer);
      clearInterval(counter);
      counter = setInterval(() => { elapsed.value++; }, 1000);
      timer = setTimeout(() => { idle.value = true; clearInterval(counter); }, timeout.value);
    };
    const events = ['mousemove', 'keydown', 'touchstart', 'click'];
    onMounted(() => {
      events.forEach(e => window.addEventListener(e, resetIdle));
      resetIdle();
    });
    onUnmounted(() => {
      events.forEach(e => window.removeEventListener(e, resetIdle));
      clearTimeout(timer);
      clearInterval(counter);
    });
    return { timeout, idle, elapsed, resetIdle };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-media-query-hook',
    title: 'Media Query Hook',
    description:
      'Create a composable-style media query detector that reactively tracks viewport breakpoints. Shows the current breakpoint and adjusts layout accordingly.',
    difficulty: 'intermediate',
    category: 'advanced',
    framework: 'vue',
    concepts: ['ref', 'onMounted', 'onUnmounted', 'matchMedia', 'reactive'],
    demoCode: {
      html: `<div id="app">
  <div class="mq-wrap">
    <h3>Media Query Hook</h3>
    <div class="mq-status">
      <div v-for="bp in breakpoints" :key="bp.name" class="mq-bp" :class="{ active: bp.matches }">
        <span class="mq-dot"></span>
        <span>{{ bp.name }}: {{ bp.query }}</span>
        <span class="mq-match">{{ bp.matches ? 'MATCH' : '' }}</span>
      </div>
    </div>
    <div class="mq-current">
      Current: <strong>{{ currentBreakpoint }}</strong>
    </div>
    <div class="mq-demo" :class="currentBreakpoint">
      <div class="mq-box">Responsive Box</div>
      <div class="mq-box">Responsive Box</div>
      <div class="mq-box">Responsive Box</div>
    </div>
  </div>
</div>`,
      css: `.mq-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.mq-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.mq-status { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
.mq-bp { display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: #0f172a; border-radius: 6px; color: #64748b; font-size: 12px; }
.mq-bp.active { color: #e0e0e0; }
.mq-dot { width: 6px; height: 6px; border-radius: 50%; background: #475569; }
.mq-bp.active .mq-dot { background: #22c55e; }
.mq-match { margin-left: auto; color: #22c55e; font-weight: 600; font-size: 10px; }
.mq-current { color: #94a3b8; font-size: 14px; margin-bottom: 12px; }
.mq-current strong { color: #4fc3f7; }
.mq-demo { display: flex; gap: 8px; flex-wrap: wrap; }
.mq-box { flex: 1; min-width: 80px; padding: 16px; background: #0f172a; border-radius: 8px; color: #94a3b8; font-size: 12px; text-align: center; }`,
      js: `const { createApp, reactive, computed, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const breakpoints = reactive([
      { name: 'mobile', query: '(max-width: 480px)', matches: false, mql: null },
      { name: 'tablet', query: '(min-width: 481px) and (max-width: 768px)', matches: false, mql: null },
      { name: 'desktop', query: '(min-width: 769px)', matches: false, mql: null },
    ]);
    const currentBreakpoint = computed(() => {
      const match = breakpoints.find(b => b.matches);
      return match ? match.name : 'unknown';
    });
    onMounted(() => {
      breakpoints.forEach(bp => {
        bp.mql = window.matchMedia(bp.query);
        bp.matches = bp.mql.matches;
        bp.mql.addEventListener('change', (e) => { bp.matches = e.matches; });
      });
    });
    onUnmounted(() => {
      breakpoints.forEach(bp => { if (bp.mql) bp.mql = null; });
    });
    return { breakpoints, currentBreakpoint };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-portal-demo',
    title: 'Portal Demo',
    description:
      'Demonstrate Vue Teleport to render content outside the component tree. Shows how modals, tooltips, and notifications can be teleported to a target element.',
    difficulty: 'intermediate',
    category: 'advanced',
    framework: 'vue',
    concepts: ['Teleport', 'ref', 'v-if', 'portal pattern'],
    demoCode: {
      html: `<div id="app">
  <div class="port-wrap">
    <h3>Portal (Teleport) Demo</h3>
    <p class="port-desc">Content is rendered inside this component but teleported to the target area below.</p>
    <button class="port-btn" @click="showPortal = !showPortal">
      {{ showPortal ? 'Hide' : 'Show' }} Teleported Content
    </button>
    <div class="port-source">
      <h4>Source Container</h4>
      <p>The button above triggers teleported content.</p>
    </div>
  </div>
  <div id="portal-target" class="port-target">
    <h4>Target Container</h4>
    <p class="port-note">Teleported content appears here:</p>
  </div>
  <div v-if="showPortal" class="port-content">
    <div class="port-card">
      <p>I was teleported from the source component!</p>
      <button @click="showPortal = false">Close</button>
    </div>
  </div>
</div>`,
      css: `.port-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; margin-bottom: 12px; }
.port-wrap h3 { color: #e0e0e0; margin: 0 0 8px; }
.port-desc { color: #64748b; font-size: 13px; margin-bottom: 12px; }
.port-btn { padding: 8px 20px; border-radius: 6px; border: none; background: #4fc3f7; color: #0f172a; font-weight: 600; cursor: pointer; margin-bottom: 12px; }
.port-source { background: #0f172a; border-radius: 8px; padding: 14px; border: 1px dashed #334155; }
.port-source h4 { color: #94a3b8; margin: 0 0 4px; font-size: 13px; }
.port-source p { color: #64748b; font-size: 12px; margin: 0; }
.port-target { background: #0a1628; border-radius: 12px; padding: 18px; border: 2px dashed #4fc3f7; min-height: 80px; }
.port-target h4 { color: #4fc3f7; margin: 0 0 4px; font-size: 13px; }
.port-note { color: #64748b; font-size: 12px; margin: 0; }
.port-content { margin-top: 8px; }
.port-card { background: #22c55e; color: #0f172a; padding: 14px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; font-weight: 500; }
.port-card button { padding: 4px 12px; border-radius: 4px; border: none; background: rgba(0,0,0,0.2); color: #0f172a; cursor: pointer; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const showPortal = ref(false);
    return { showPortal };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-error-boundary',
    title: 'Error Boundary',
    description:
      'Create an error boundary component that catches rendering errors in child components and displays a fallback UI with error details and a retry button.',
    difficulty: 'advanced',
    category: 'advanced',
    framework: 'vue',
    concepts: ['onErrorCaptured', 'ref', 'v-if', 'error handling', 'lifecycle hooks'],
    demoCode: {
      html: `<div id="app">
  <div class="eb-wrap">
    <h3>Error Boundary</h3>
    <div v-if="!hasError" class="eb-content">
      <p>This component might throw errors.</p>
      <button @click="triggerError" class="eb-danger">Trigger Error</button>
      <div class="eb-counter">
        <button @click="count++">Count: {{ count }}</button>
      </div>
    </div>
    <div v-else class="eb-fallback">
      <div class="eb-icon">&#9888;</div>
      <h4>Something went wrong</h4>
      <p class="eb-error">{{ errorMsg }}</p>
      <button @click="recover" class="eb-retry">Retry</button>
    </div>
  </div>
</div>`,
      css: `.eb-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.eb-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.eb-content { background: #0f172a; border-radius: 8px; padding: 18px; }
.eb-content p { color: #94a3b8; font-size: 13px; margin: 0 0 12px; }
.eb-danger { padding: 8px 18px; border-radius: 6px; border: none; background: #ef4444; color: #fff; cursor: pointer; font-weight: 600; }
.eb-counter { margin-top: 12px; }
.eb-counter button { padding: 8px 18px; border-radius: 6px; border: 1px solid #334155; background: transparent; color: #e0e0e0; cursor: pointer; }
.eb-fallback { text-align: center; background: #0f172a; border-radius: 8px; padding: 30px; border: 1px solid #ef4444; }
.eb-icon { font-size: 40px; margin-bottom: 10px; }
.eb-fallback h4 { color: #ef4444; margin: 0 0 8px; }
.eb-error { color: #94a3b8; font-size: 13px; margin: 0 0 16px; font-family: monospace; background: #1e293b; padding: 8px; border-radius: 4px; }
.eb-retry { padding: 8px 24px; border-radius: 6px; border: none; background: #4fc3f7; color: #0f172a; font-weight: 600; cursor: pointer; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const hasError = ref(false);
    const errorMsg = ref('');
    const count = ref(0);
    const triggerError = () => {
      try {
        throw new Error('Simulated component error: Cannot read property of undefined');
      } catch (e) {
        hasError.value = true;
        errorMsg.value = e.message;
      }
    };
    const recover = () => {
      hasError.value = false;
      errorMsg.value = '';
      count.value = 0;
    };
    return { hasError, errorMsg, count, triggerError, recover };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-retry-mechanism',
    title: 'Retry Mechanism',
    description:
      'Build an async operation retry mechanism with exponential backoff, max retries, and visual feedback. Shows attempt count, delay, and success/failure states.',
    difficulty: 'advanced',
    category: 'advanced',
    framework: 'vue',
    concepts: ['ref', 'async/await', 'setTimeout', 'exponential backoff', 'reactive'],
    demoCode: {
      html: `<div id="app">
  <div class="rt-wrap">
    <h3>Retry Mechanism</h3>
    <div class="rt-config">
      <label>Failure rate: <input type="range" :min="0" :max="100" v-model.number="failRate" /> {{ failRate }}%</label>
      <label>Max retries: <input type="number" v-model.number="maxRetries" :min="1" :max="10" /></label>
    </div>
    <button class="rt-btn" @click="execute" :disabled="running">{{ running ? 'Running...' : 'Execute' }}</button>
    <div class="rt-log">
      <div v-for="(entry, i) in log" :key="i" class="rt-entry" :class="entry.status">
        <span class="rt-attempt">Attempt {{ entry.attempt }}</span>
        <span>{{ entry.message }}</span>
      </div>
    </div>
    <div v-if="finalResult" class="rt-result" :class="finalResult">
      {{ finalResult === 'success' ? 'Operation succeeded!' : 'All retries exhausted.' }}
    </div>
  </div>
</div>`,
      css: `.rt-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.rt-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.rt-config { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
.rt-config label { color: #94a3b8; font-size: 13px; display: flex; align-items: center; gap: 8px; }
.rt-config input[type=number] { width: 50px; padding: 4px; border-radius: 4px; border: 1px solid #334155; background: #0f172a; color: #e0e0e0; text-align: center; }
.rt-btn { padding: 8px 24px; border-radius: 6px; border: none; background: #4fc3f7; color: #0f172a; font-weight: 600; cursor: pointer; margin-bottom: 14px; }
.rt-btn:disabled { opacity: 0.5; }
.rt-log { display: flex; flex-direction: column; gap: 4px; }
.rt-entry { display: flex; gap: 10px; padding: 6px 10px; border-radius: 4px; font-size: 12px; }
.rt-entry.fail { background: rgba(239,68,68,0.1); color: #ef4444; }
.rt-entry.success { background: rgba(34,197,94,0.1); color: #22c55e; }
.rt-entry.pending { background: rgba(245,158,11,0.1); color: #f59e0b; }
.rt-attempt { font-weight: 600; min-width: 70px; }
.rt-result { margin-top: 10px; padding: 10px; border-radius: 6px; text-align: center; font-weight: 600; font-size: 14px; }
.rt-result.success { background: rgba(34,197,94,0.15); color: #22c55e; }
.rt-result.fail { background: rgba(239,68,68,0.15); color: #ef4444; }`,
      js: `const { createApp, ref, reactive } = Vue;

createApp({
  setup() {
    const failRate = ref(60);
    const maxRetries = ref(3);
    const running = ref(false);
    const log = reactive([]);
    const finalResult = ref('');
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const execute = async () => {
      running.value = true;
      log.length = 0;
      finalResult.value = '';
      for (let attempt = 1; attempt <= maxRetries.value; attempt++) {
        log.push({ attempt, status: 'pending', message: 'Attempting...' });
        await sleep(800);
        const success = Math.random() * 100 > failRate.value;
        log[log.length - 1].status = success ? 'success' : 'fail';
        log[log.length - 1].message = success ? 'Success!' : 'Failed. Retrying in ' + (attempt * 500) + 'ms...';
        if (success) { finalResult.value = 'success'; running.value = false; return; }
        if (attempt < maxRetries.value) await sleep(attempt * 500);
      }
      finalResult.value = 'fail';
      running.value = false;
    };
    return { failRate, maxRetries, running, log, finalResult, execute };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-virtual-list-advanced',
    title: 'Virtual List Advanced',
    description:
      'Build an advanced virtual scrolling list that only renders visible items for performance. Supports variable-height items, smooth scrolling, and dynamic loading.',
    difficulty: 'advanced',
    category: 'advanced',
    framework: 'vue',
    concepts: ['ref', 'computed', 'scroll events', 'dynamic sizing', 'performance'],
    demoCode: {
      html: `<div id="app">
  <div class="vl-wrap">
    <h3>Virtual List ({{ totalItems }} items)</h3>
    <div class="vl-container" ref="container" @scroll="onScroll">
      <div class="vl-spacer" :style="{ height: totalHeight + 'px' }"></div>
      <div class="vl-items" :style="{ transform: 'translateY(' + offsetY + 'px)' }">
        <div v-for="item in visibleItems" :key="item.id" class="vl-item">
          <span class="vl-id">#{{ item.id }}</span>
          <span>{{ item.text }}</span>
        </div>
      </div>
    </div>
    <div class="vl-info">Rendering {{ visibleItems.length }} of {{ totalItems }} items</div>
  </div>
</div>`,
      css: `.vl-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.vl-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.vl-container { height: 240px; overflow-y: auto; border-radius: 8px; position: relative; }
.vl-spacer { width: 100%; }
.vl-items { position: absolute; left: 0; right: 0; top: 0; }
.vl-item { padding: 12px 14px; background: #0f172a; border-bottom: 1px solid #1e293b; color: #e0e0e0; font-size: 13px; display: flex; align-items: center; gap: 12px; height: 44px; }
.vl-id { color: #4fc3f7; font-family: monospace; font-size: 11px; min-width: 50px; }
.vl-info { color: #64748b; font-size: 12px; margin-top: 8px; text-align: right; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const totalItems = 10000;
    const itemHeight = 44;
    const allItems = Array.from({ length: totalItems }, (_, i) => ({
      id: i + 1, text: 'Item ' + (i + 1) + ' - Virtual list entry with efficient rendering'
    }));
    const container = ref(null);
    const scrollTop = ref(0);
    const containerHeight = 240;
    const totalHeight = computed(() => totalItems * itemHeight);
    const startIdx = computed(() => Math.floor(scrollTop.value / itemHeight));
    const visibleCount = computed(() => Math.ceil(containerHeight / itemHeight) + 2);
    const visibleItems = computed(() => allItems.slice(startIdx.value, startIdx.value + visibleCount.value));
    const offsetY = computed(() => startIdx.value * itemHeight);
    const onScroll = () => { scrollTop.value = container.value?.scrollTop || 0; };
    return { totalItems, container, totalHeight, visibleItems, offsetY, onScroll };
  }
}).mount('#app');`,
    },
  },
  // UI Components
  {
    id: 'vue-spinner',
    title: 'Spinner',
    description:
      'Create a collection of loading spinner components with different styles (circular, dots, bars). Supports size variants, custom colors, and overlay mode.',
    difficulty: 'beginner',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['CSS animations', 'v-for', 'class binding', 'style binding'],
    demoCode: {
      html: `<div id="app">
  <div class="sp-wrap">
    <h3>Spinners</h3>
    <div class="sp-grid">
      <div class="sp-demo">
        <div class="spinner-ring"></div>
        <span>Ring</span>
      </div>
      <div class="sp-demo">
        <div class="spinner-dots">
          <span v-for="i in 3" :key="i" class="dot"></span>
        </div>
        <span>Dots</span>
      </div>
      <div class="sp-demo">
        <div class="spinner-bars">
          <span v-for="i in 4" :key="i" class="bar"></span>
        </div>
        <span>Bars</span>
      </div>
      <div class="sp-demo">
        <div class="spinner-pulse"></div>
        <span>Pulse</span>
      </div>
    </div>
  </div>
</div>`,
      css: `.sp-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.sp-wrap h3 { color: #e0e0e0; margin: 0 0 16px; }
.sp-grid { display: flex; gap: 20px; justify-content: center; }
.sp-demo { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.sp-demo > span { color: #64748b; font-size: 12px; }
.spinner-ring {
  width: 36px; height: 36px; border: 3px solid #334155; border-top-color: #4fc3f7;
  border-radius: 50%; animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.spinner-dots { display: flex; gap: 6px; }
.spinner-dots .dot {
  width: 10px; height: 10px; border-radius: 50%; background: #4fc3f7;
  animation: bounce 1.4s infinite both;
}
.spinner-dots .dot:nth-child(2) { animation-delay: 0.2s; }
.spinner-dots .dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce { 0%, 80%, 100% { transform: scale(0.3); opacity: 0.3; } 40% { transform: scale(1); opacity: 1; } }
.spinner-bars { display: flex; gap: 3px; align-items: flex-end; height: 24px; }
.spinner-bars .bar { width: 4px; background: #4fc3f7; border-radius: 2px; animation: barAnim 1s infinite; }
.spinner-bars .bar:nth-child(1) { animation-delay: 0s; }
.spinner-bars .bar:nth-child(2) { animation-delay: 0.15s; }
.spinner-bars .bar:nth-child(3) { animation-delay: 0.3s; }
.spinner-bars .bar:nth-child(4) { animation-delay: 0.45s; }
@keyframes barAnim { 0%, 100% { height: 8px; } 50% { height: 24px; } }
.spinner-pulse {
  width: 36px; height: 36px; border-radius: 50%; background: #4fc3f7;
  animation: pulse 1.5s infinite;
}
@keyframes pulse { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(1.3); opacity: 0; } }`,
      js: `const { createApp } = Vue;

createApp({
  setup() { return {}; }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-chip',
    title: 'Chip',
    description:
      'Build chip/tag components with variants (filled, outlined, avatar), click actions, and removable chips. Supports selection mode where chips act as toggle buttons.',
    difficulty: 'beginner',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['v-for', 'class binding', 'reactive', 'click events'],
    demoCode: {
      html: `<div id="app">
  <div class="ch-wrap">
    <h3>Chips</h3>
    <h4>Selectable</h4>
    <div class="ch-row">
      <span v-for="chip in selectable" :key="chip.label" class="chip selectable"
        :class="{ selected: chip.selected }" @click="chip.selected = !chip.selected">
        {{ chip.label }}
      </span>
    </div>
    <h4>Removable</h4>
    <div class="ch-row">
      <span v-for="(chip, i) in removable" :key="chip" class="chip removable">
        {{ chip }}
        <button @click="removable.splice(i, 1)">&times;</button>
      </span>
    </div>
  </div>
</div>`,
      css: `.ch-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.ch-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.ch-wrap h4 { color: #94a3b8; font-size: 12px; margin: 12px 0 8px; text-transform: uppercase; }
.ch-row { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  padding: 6px 14px; border-radius: 20px; font-size: 13px; cursor: pointer;
  border: 1px solid #334155; color: #94a3b8; background: transparent;
  transition: all 0.15s; display: inline-flex; align-items: center; gap: 6px;
}
.chip.selectable:hover { border-color: #4fc3f7; color: #e0e0e0; }
.chip.selected { background: #4fc3f7; color: #0f172a; border-color: #4fc3f7; }
.chip.removable { background: #1e293b; }
.chip button { background: none; border: none; color: inherit; cursor: pointer; font-size: 15px; line-height: 1; opacity: 0.6; }
.chip button:hover { opacity: 1; }`,
      js: `const { createApp, reactive } = Vue;

createApp({
  setup() {
    const selectable = reactive([
      { label: 'Vue', selected: true },
      { label: 'React', selected: false },
      { label: 'Angular', selected: false },
      { label: 'Svelte', selected: true },
    ]);
    const removable = reactive(['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust']);
    return { selectable, removable };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-divider',
    title: 'Divider',
    description:
      'Create a divider component with horizontal and vertical variants, text labels, and different styles (solid, dashed, gradient). Useful for sectioning content.',
    difficulty: 'beginner',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['v-for', 'class binding', 'slots pattern'],
    demoCode: {
      html: `<div id="app">
  <div class="dv-wrap">
    <h3>Dividers</h3>
    <p>Simple</p>
    <div class="divider"></div>
    <p>With Text</p>
    <div class="divider with-text"><span>OR</span></div>
    <p>Dashed</p>
    <div class="divider dashed"></div>
    <p>Gradient</p>
    <div class="divider gradient"></div>
    <p>With Icon</p>
    <div class="divider with-text"><span>&#9733;</span></div>
  </div>
</div>`,
      css: `.dv-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.dv-wrap h3 { color: #e0e0e0; margin: 0 0 16px; }
.dv-wrap p { color: #94a3b8; font-size: 13px; margin: 14px 0 8px; }
.divider { height: 1px; background: #334155; margin: 4px 0; }
.divider.dashed { background: none; border-top: 1px dashed #334155; }
.divider.gradient { background: linear-gradient(90deg, transparent, #4fc3f7, transparent); }
.divider.with-text {
  display: flex; align-items: center; gap: 12px; background: none; height: auto;
}
.divider.with-text::before, .divider.with-text::after {
  content: ''; flex: 1; height: 1px; background: #334155;
}
.divider.with-text span { color: #64748b; font-size: 12px; white-space: nowrap; }`,
      js: `const { createApp } = Vue;

createApp({
  setup() { return {}; }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-alert-banner',
    title: 'Alert Banner',
    description:
      'Create dismissible alert banners with info, success, warning, and error variants. Supports icons, action buttons, auto-dismiss timers, and smooth collapse animations.',
    difficulty: 'beginner',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['v-for', 'v-if', 'reactive', 'class binding', 'setTimeout'],
    demoCode: {
      html: `<div id="app">
  <div class="ab-wrap">
    <h3>Alert Banners</h3>
    <div v-for="alert in alerts" :key="alert.id" v-if="!alert.dismissed"
      class="alert-banner" :class="alert.type">
      <span class="ab-icon">{{ alert.icon }}</span>
      <span class="ab-msg">{{ alert.message }}</span>
      <button @click="alert.dismissed = true" class="ab-close">&times;</button>
    </div>
    <button class="ab-reset" @click="resetAlerts">Reset Alerts</button>
  </div>
</div>`,
      css: `.ab-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.ab-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.alert-banner {
  display: flex; align-items: center; gap: 10px; padding: 12px 14px;
  border-radius: 8px; margin-bottom: 8px; font-size: 13px;
  animation: slideDown 0.3s;
}
@keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
.alert-banner.info { background: rgba(79,195,247,0.12); color: #4fc3f7; border-left: 3px solid #4fc3f7; }
.alert-banner.success { background: rgba(34,197,94,0.12); color: #22c55e; border-left: 3px solid #22c55e; }
.alert-banner.warning { background: rgba(245,158,11,0.12); color: #f59e0b; border-left: 3px solid #f59e0b; }
.alert-banner.error { background: rgba(239,68,68,0.12); color: #ef4444; border-left: 3px solid #ef4444; }
.ab-icon { font-size: 16px; }
.ab-msg { flex: 1; }
.ab-close { background: none; border: none; color: inherit; cursor: pointer; font-size: 18px; opacity: 0.6; }
.ab-close:hover { opacity: 1; }
.ab-reset { margin-top: 8px; padding: 6px 14px; border-radius: 6px; border: 1px solid #334155; background: transparent; color: #e0e0e0; cursor: pointer; font-size: 12px; }`,
      js: `const { createApp, reactive } = Vue;

createApp({
  setup() {
    const makeAlerts = () => [
      { id: 1, type: 'info', icon: 'i', message: 'A new version is available.', dismissed: false },
      { id: 2, type: 'success', icon: '✓', message: 'Your changes have been saved.', dismissed: false },
      { id: 3, type: 'warning', icon: '⚠', message: 'Your trial expires in 3 days.', dismissed: false },
      { id: 4, type: 'error', icon: '✕', message: 'Failed to connect to the server.', dismissed: false },
    ];
    const alerts = reactive(makeAlerts());
    const resetAlerts = () => { alerts.splice(0, alerts.length, ...makeAlerts()); };
    return { alerts, resetAlerts };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-callout',
    title: 'Callout',
    description:
      'Build callout/admonition boxes for highlighting tips, warnings, notes, and important information in content. Supports collapsible content and custom titles.',
    difficulty: 'beginner',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['v-for', 'class binding', 'reactive'],
    demoCode: {
      html: `<div id="app">
  <div class="co-wrap">
    <h3>Callouts</h3>
    <div v-for="c in callouts" :key="c.title" class="callout" :class="c.type">
      <div class="co-header" @click="c.open = !c.open">
        <span class="co-icon">{{ c.icon }}</span>
        <span class="co-title">{{ c.title }}</span>
        <span class="co-toggle">{{ c.open ? '&#9650;' : '&#9660;' }}</span>
      </div>
      <div v-if="c.open" class="co-body">{{ c.body }}</div>
    </div>
  </div>
</div>`,
      css: `.co-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.co-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.callout { border-radius: 8px; margin-bottom: 8px; overflow: hidden; }
.co-header { display: flex; align-items: center; gap: 8px; padding: 10px 14px; cursor: pointer; font-size: 13px; font-weight: 600; }
.co-toggle { margin-left: auto; font-size: 10px; opacity: 0.6; }
.co-body { padding: 0 14px 12px 36px; font-size: 13px; opacity: 0.85; }
.callout.tip { background: rgba(34,197,94,0.1); color: #22c55e; }
.callout.warning { background: rgba(245,158,11,0.1); color: #f59e0b; }
.callout.note { background: rgba(79,195,247,0.1); color: #4fc3f7; }
.callout.danger { background: rgba(239,68,68,0.1); color: #ef4444; }
.co-icon { font-size: 15px; width: 18px; text-align: center; }`,
      js: `const { createApp, reactive } = Vue;

createApp({
  setup() {
    const callouts = reactive([
      { type: 'tip', icon: '✔', title: 'Tip', body: 'Use the Composition API for better TypeScript support.', open: true },
      { type: 'note', icon: 'i', title: 'Note', body: 'Vue 3 requires Node.js 16 or higher.', open: true },
      { type: 'warning', icon: '⚠', title: 'Warning', body: 'This API is deprecated and will be removed in v4.', open: false },
      { type: 'danger', icon: '✕', title: 'Danger', body: 'Never expose API keys in client-side code.', open: false },
    ]);
    return { callouts };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-empty-state-v2',
    title: 'Empty State V2',
    description:
      'Create enhanced empty state components for different scenarios (no data, no results, error, first-time). Includes illustrations, descriptions, and call-to-action buttons.',
    difficulty: 'beginner',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['v-for', 'ref', 'class binding'],
    demoCode: {
      html: `<div id="app">
  <div class="es-wrap">
    <h3>Empty States</h3>
    <div class="es-tabs">
      <button v-for="s in states" :key="s.type" @click="active = s.type" :class="{ active: active === s.type }">{{ s.type }}</button>
    </div>
    <div class="es-display">
      <div v-for="s in states" :key="s.type" v-show="active === s.type" class="es-content">
        <div class="es-icon" :style="{ background: s.iconBg }">{{ s.icon }}</div>
        <h4>{{ s.title }}</h4>
        <p>{{ s.desc }}</p>
        <button class="es-action">{{ s.action }}</button>
      </div>
    </div>
  </div>
</div>`,
      css: `.es-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.es-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.es-tabs { display: flex; gap: 4px; margin-bottom: 16px; }
.es-tabs button { padding: 4px 12px; border-radius: 4px; border: 1px solid #334155; background: transparent; color: #64748b; cursor: pointer; font-size: 12px; text-transform: capitalize; }
.es-tabs button.active { background: #4fc3f7; color: #0f172a; border: none; }
.es-display { background: #0f172a; border-radius: 10px; padding: 30px; text-align: center; min-height: 180px; }
.es-icon { width: 56px; height: 56px; border-radius: 50%; margin: 0 auto 14px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.es-content h4 { color: #e0e0e0; margin: 0 0 6px; }
.es-content p { color: #64748b; font-size: 13px; margin: 0 0 16px; max-width: 280px; margin-left: auto; margin-right: auto; }
.es-action { padding: 8px 20px; border-radius: 6px; border: none; background: #4fc3f7; color: #0f172a; font-weight: 600; cursor: pointer; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const states = [
      { type: 'no-data', icon: '∅', iconBg: 'rgba(79,195,247,0.2)', title: 'No Data Yet', desc: 'Start by creating your first item.', action: 'Create Item' },
      { type: 'no-results', icon: '?', iconBg: 'rgba(245,158,11,0.2)', title: 'No Results', desc: 'Try adjusting your search or filters.', action: 'Clear Filters' },
      { type: 'error', icon: '!', iconBg: 'rgba(239,68,68,0.2)', title: 'Something Went Wrong', desc: 'We could not load the data. Please try again.', action: 'Retry' },
      { type: 'welcome', icon: '★', iconBg: 'rgba(34,197,94,0.2)', title: 'Welcome!', desc: 'Get started by exploring the features.', action: 'Get Started' },
    ];
    const active = ref('no-data');
    return { states, active };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-avatar-group',
    title: 'Avatar Group',
    description:
      'Build a stacked avatar group that shows overlapping avatars with a +N overflow indicator. Supports hover to expand, tooltip names, and configurable max visible count.',
    difficulty: 'beginner',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['v-for', 'computed', 'style binding'],
    demoCode: {
      html: `<div id="app">
  <div class="ag-wrap">
    <h3>Avatar Group</h3>
    <div class="ag-row">
      <div v-for="(u, i) in visible" :key="u.name" class="ag-avatar"
        :style="{ background: u.color, zIndex: visible.length - i }" :title="u.name">
        {{ u.initials }}
      </div>
      <div v-if="overflow > 0" class="ag-avatar ag-overflow" :title="overflow + ' more'">+{{ overflow }}</div>
    </div>
    <div class="ag-controls">
      <label>Max visible: <input type="range" :min="2" :max="users.length" v-model.number="maxVisible" /> {{ maxVisible }}</label>
    </div>
    <div class="ag-names">
      <span v-for="u in users" :key="u.name" class="ag-name">{{ u.name }}</span>
    </div>
  </div>
</div>`,
      css: `.ag-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.ag-wrap h3 { color: #e0e0e0; margin: 0 0 16px; }
.ag-row { display: flex; margin-bottom: 14px; }
.ag-avatar {
  width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center;
  justify-content: center; color: #fff; font-weight: 700; font-size: 14px;
  border: 3px solid #1a1a2e; margin-left: -12px; position: relative; cursor: pointer;
  transition: transform 0.15s;
}
.ag-avatar:first-child { margin-left: 0; }
.ag-avatar:hover { transform: translateY(-4px); }
.ag-overflow { background: #334155; color: #94a3b8; font-size: 12px; }
.ag-controls { margin-bottom: 10px; color: #94a3b8; font-size: 13px; }
.ag-controls input { vertical-align: middle; }
.ag-names { display: flex; flex-wrap: wrap; gap: 6px; }
.ag-name { color: #64748b; font-size: 12px; background: #0f172a; padding: 2px 8px; border-radius: 4px; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const users = [
      { name: 'Alice', initials: 'A', color: '#3b82f6' },
      { name: 'Bob', initials: 'B', color: '#ef4444' },
      { name: 'Charlie', initials: 'C', color: '#22c55e' },
      { name: 'Diana', initials: 'D', color: '#f59e0b' },
      { name: 'Eve', initials: 'E', color: '#8b5cf6' },
      { name: 'Frank', initials: 'F', color: '#ec4899' },
      { name: 'Grace', initials: 'G', color: '#14b8a6' },
    ];
    const maxVisible = ref(4);
    const visible = computed(() => users.slice(0, maxVisible.value));
    const overflow = computed(() => Math.max(0, users.length - maxVisible.value));
    return { users, maxVisible, visible, overflow };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-breadcrumb-overflow',
    title: 'Breadcrumb Overflow',
    description:
      'Create a breadcrumb navigation that collapses middle items into an ellipsis dropdown when the path is too long. Supports clickable items and responsive behavior.',
    difficulty: 'intermediate',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['v-for', 'computed', 'ref', 'v-if'],
    demoCode: {
      html: `<div id="app">
  <div class="bo-wrap">
    <h3>Breadcrumb with Overflow</h3>
    <div class="bo-trail">
      <span v-for="(crumb, i) in displayCrumbs" :key="i" class="bo-item">
        <span v-if="crumb.type === 'ellipsis'" class="bo-ellipsis" @click="showHidden = !showHidden">
          ...
          <div v-if="showHidden" class="bo-dropdown">
            <a v-for="h in hiddenCrumbs" :key="h" class="bo-drop-item">{{ h }}</a>
          </div>
        </span>
        <a v-else class="bo-link" :class="{ current: i === displayCrumbs.length - 1 }">{{ crumb.label }}</a>
        <span v-if="i < displayCrumbs.length - 1" class="bo-sep">/</span>
      </span>
    </div>
    <div class="bo-full">Full path: {{ crumbs.join(' / ') }}</div>
  </div>
</div>`,
      css: `.bo-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.bo-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.bo-trail { display: flex; align-items: center; flex-wrap: wrap; gap: 2px; margin-bottom: 12px; }
.bo-item { display: flex; align-items: center; gap: 2px; }
.bo-link { color: #4fc3f7; font-size: 13px; text-decoration: none; cursor: pointer; }
.bo-link:hover { text-decoration: underline; }
.bo-link.current { color: #e0e0e0; cursor: default; }
.bo-link.current:hover { text-decoration: none; }
.bo-sep { color: #475569; font-size: 13px; margin: 0 4px; }
.bo-ellipsis { color: #4fc3f7; cursor: pointer; font-size: 13px; position: relative; }
.bo-dropdown { position: absolute; top: 100%; left: 0; background: #0f172a; border: 1px solid #334155; border-radius: 6px; padding: 4px 0; z-index: 10; min-width: 140px; margin-top: 4px; }
.bo-drop-item { display: block; padding: 6px 12px; color: #e0e0e0; font-size: 13px; text-decoration: none; cursor: pointer; }
.bo-drop-item:hover { background: rgba(79,195,247,0.1); }
.bo-full { color: #475569; font-size: 11px; }`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const crumbs = ['Home', 'Products', 'Electronics', 'Phones', 'Smartphones', 'iPhone 15'];
    const maxVisible = 3;
    const showHidden = ref(false);
    const hiddenCrumbs = computed(() => crumbs.slice(1, crumbs.length - maxVisible + 1));
    const displayCrumbs = computed(() => {
      if (crumbs.length <= maxVisible + 1) return crumbs.map(c => ({ type: 'crumb', label: c }));
      return [
        { type: 'crumb', label: crumbs[0] },
        { type: 'ellipsis' },
        ...crumbs.slice(-maxVisible + 1).map(c => ({ type: 'crumb', label: c })),
      ];
    });
    return { crumbs, showHidden, hiddenCrumbs, displayCrumbs };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-truncated-text',
    title: 'Truncated Text',
    description:
      'Build a text truncation component with expand/collapse toggle, line clamping, and tooltip preview on hover. Supports configurable max lines and character limits.',
    difficulty: 'beginner',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['ref', 'computed', 'v-if', 'class binding'],
    demoCode: {
      html: `<div id="app">
  <div class="tt-wrap">
    <h3>Truncated Text</h3>
    <div v-for="(item, i) in items" :key="i" class="tt-card">
      <h4>{{ item.title }}</h4>
      <p :class="{ truncated: !item.expanded }">{{ item.text }}</p>
      <button v-if="item.text.length > 120" @click="item.expanded = !item.expanded" class="tt-toggle">
        {{ item.expanded ? 'Show less' : 'Show more' }}
      </button>
    </div>
  </div>
</div>`,
      css: `.tt-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.tt-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.tt-card { background: #0f172a; border-radius: 8px; padding: 14px; margin-bottom: 10px; }
.tt-card h4 { color: #e0e0e0; margin: 0 0 6px; font-size: 14px; }
.tt-card p { color: #94a3b8; font-size: 13px; line-height: 1.6; margin: 0; }
.tt-card p.truncated {
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden; text-overflow: ellipsis;
}
.tt-toggle { background: none; border: none; color: #4fc3f7; cursor: pointer; font-size: 12px; padding: 4px 0; margin-top: 4px; }`,
      js: `const { createApp, reactive } = Vue;

createApp({
  setup() {
    const items = reactive([
      { title: 'About Vue.js', text: 'Vue.js is a progressive JavaScript framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library focuses on the view layer only, and is easy to pick up and integrate with other libraries.', expanded: false },
      { title: 'Composition API', text: 'The Composition API is a set of APIs that allows us to author Vue components using imported functions instead of declaring options. It provides better logic reuse and more flexible code organization.', expanded: false },
      { title: 'Short text', text: 'This text is short enough.', expanded: false },
    ]);
    return { items };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-responsive-grid',
    title: 'Responsive Grid',
    description:
      'Create a responsive grid layout that adapts column count based on container width. Supports configurable gap, min column width, and breakpoint-based layouts.',
    difficulty: 'beginner',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['v-for', 'ref', 'style binding', 'CSS grid'],
    demoCode: {
      html: `<div id="app">
  <div class="rg-wrap">
    <h3>Responsive Grid</h3>
    <div class="rg-controls">
      <label>Min width: <input type="range" :min="80" :max="200" v-model.number="minWidth" /> {{ minWidth }}px</label>
      <label>Gap: <input type="range" :min="4" :max="24" v-model.number="gap" /> {{ gap }}px</label>
    </div>
    <div class="rg-grid" :style="gridStyle">
      <div v-for="i in 12" :key="i" class="rg-item">{{ i }}</div>
    </div>
  </div>
</div>`,
      css: `.rg-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.rg-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.rg-controls { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 14px; color: #94a3b8; font-size: 13px; }
.rg-controls input { vertical-align: middle; }
.rg-grid { display: grid; }
.rg-item {
  background: #0f172a; border-radius: 8px; padding: 20px; text-align: center;
  color: #4fc3f7; font-weight: 700; font-size: 18px;
  border: 1px solid #334155;
}`,
      js: `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const minWidth = ref(120);
    const gap = ref(10);
    const gridStyle = computed(() => ({
      gridTemplateColumns: 'repeat(auto-fill, minmax(' + minWidth.value + 'px, 1fr))',
      gap: gap.value + 'px',
    }));
    return { minWidth, gap, gridStyle };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-masonry-layout',
    title: 'Masonry Layout',
    description:
      'Build a Pinterest-style masonry layout where items of varying heights are arranged in columns. Uses CSS columns or JavaScript-based positioning for optimal packing.',
    difficulty: 'intermediate',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['v-for', 'ref', 'CSS columns', 'computed'],
    demoCode: {
      html: `<div id="app">
  <div class="ms-wrap">
    <h3>Masonry Layout</h3>
    <div class="ms-controls">
      <label>Columns: <input type="range" :min="2" :max="4" v-model.number="cols" /> {{ cols }}</label>
    </div>
    <div class="ms-grid" :style="{ columnCount: cols }">
      <div v-for="item in items" :key="item.id" class="ms-item" :style="{ height: item.height + 'px' }">
        <div class="ms-label">{{ item.id }}</div>
        <div class="ms-bar" :style="{ background: item.color }"></div>
      </div>
    </div>
  </div>
</div>`,
      css: `.ms-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.ms-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.ms-controls { margin-bottom: 14px; color: #94a3b8; font-size: 13px; }
.ms-grid { column-gap: 10px; }
.ms-item {
  break-inside: avoid; margin-bottom: 10px; background: #0f172a;
  border-radius: 8px; padding: 12px; display: flex; flex-direction: column;
  justify-content: space-between;
}
.ms-label { color: #e0e0e0; font-weight: 600; font-size: 14px; }
.ms-bar { height: 4px; border-radius: 2px; margin-top: 8px; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const cols = ref(3);
    const colors = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];
    const items = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      height: 80 + Math.floor(Math.random() * 120),
      color: colors[i % colors.length],
    }));
    return { cols, items };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-aspect-ratio-box',
    title: 'Aspect Ratio Box',
    description:
      'Create a container that maintains a specific aspect ratio regardless of width. Useful for video embeds, image placeholders, and responsive media containers.',
    difficulty: 'beginner',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['v-for', 'ref', 'computed', 'CSS aspect-ratio'],
    demoCode: {
      html: `<div id="app">
  <div class="ar-wrap">
    <h3>Aspect Ratio Boxes</h3>
    <div class="ar-grid">
      <div v-for="r in ratios" :key="r.label" class="ar-container">
        <div class="ar-box" :style="{ aspectRatio: r.value }">
          <span class="ar-label">{{ r.label }}</span>
          <span class="ar-dim">{{ r.value }}</span>
        </div>
      </div>
    </div>
    <div class="ar-custom">
      <label>Custom: <input type="range" :min="0.5" :max="3" :step="0.1" v-model.number="custom" /></label>
      <div class="ar-box" :style="{ aspectRatio: custom }">
        <span class="ar-label">Custom</span>
        <span class="ar-dim">{{ custom.toFixed(1) }}</span>
      </div>
    </div>
  </div>
</div>`,
      css: `.ar-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.ar-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.ar-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
.ar-box {
  background: #0f172a; border: 1px solid #334155; border-radius: 8px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  width: 100%;
}
.ar-label { color: #e0e0e0; font-weight: 600; font-size: 13px; }
.ar-dim { color: #4fc3f7; font-size: 11px; margin-top: 2px; }
.ar-custom { margin-top: 8px; }
.ar-custom label { color: #94a3b8; font-size: 13px; display: block; margin-bottom: 8px; }
.ar-custom .ar-box { max-width: 200px; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const ratios = [
      { label: 'Square', value: '1/1' },
      { label: 'Video', value: '16/9' },
      { label: 'Photo', value: '4/3' },
    ];
    const custom = ref(1.5);
    return { ratios, custom };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-scroll-snap',
    title: 'Scroll Snap',
    description:
      'Build a horizontal scroll-snap carousel using CSS scroll-snap properties. Supports dot indicators, snap alignment, and smooth touch-friendly scrolling.',
    difficulty: 'beginner',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['v-for', 'ref', 'scroll events', 'CSS scroll-snap'],
    demoCode: {
      html: `<div id="app">
  <div class="sn-wrap">
    <h3>Scroll Snap Carousel</h3>
    <div class="sn-track" ref="track" @scroll="onScroll">
      <div v-for="(slide, i) in slides" :key="i" class="sn-slide" :style="{ background: slide.color }">
        <h4>{{ slide.title }}</h4>
        <p>{{ slide.desc }}</p>
      </div>
    </div>
    <div class="sn-dots">
      <span v-for="(s, i) in slides" :key="i" class="sn-dot" :class="{ active: activeSlide === i }"
        @click="goTo(i)"></span>
    </div>
  </div>
</div>`,
      css: `.sn-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.sn-wrap h3 { color: #e0e0e0; margin: 0 0 14px; }
.sn-track {
  display: flex; gap: 12px; overflow-x: auto; scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch; scroll-behavior: smooth;
  border-radius: 8px;
}
.sn-track::-webkit-scrollbar { display: none; }
.sn-slide {
  min-width: 100%; scroll-snap-align: center; border-radius: 8px;
  padding: 30px; flex-shrink: 0;
}
.sn-slide h4 { color: #fff; margin: 0 0 6px; }
.sn-slide p { color: rgba(255,255,255,0.7); font-size: 13px; margin: 0; }
.sn-dots { display: flex; justify-content: center; gap: 8px; margin-top: 12px; }
.sn-dot { width: 8px; height: 8px; border-radius: 50%; background: #334155; cursor: pointer; transition: background 0.2s; }
.sn-dot.active { background: #4fc3f7; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const slides = [
      { title: 'Slide 1', desc: 'Introduction to scroll snap.', color: '#1e3a5f' },
      { title: 'Slide 2', desc: 'CSS-powered smooth snapping.', color: '#2d1b4e' },
      { title: 'Slide 3', desc: 'Works great on touch devices.', color: '#1b3d2f' },
      { title: 'Slide 4', desc: 'No JavaScript for scrolling!', color: '#3d2b1b' },
    ];
    const track = ref(null);
    const activeSlide = ref(0);
    const onScroll = () => {
      const el = track.value;
      if (!el) return;
      activeSlide.value = Math.round(el.scrollLeft / el.clientWidth);
    };
    const goTo = (i) => {
      track.value?.scrollTo({ left: i * track.value.clientWidth, behavior: 'smooth' });
    };
    return { slides, track, activeSlide, onScroll, goTo };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-parallax',
    title: 'Parallax',
    description:
      'Create a parallax scrolling effect where background layers move at different speeds. Demonstrates depth perception using CSS transforms driven by scroll position.',
    difficulty: 'intermediate',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['ref', 'scroll events', 'style binding', 'CSS transforms'],
    demoCode: {
      html: `<div id="app">
  <div class="px-wrap">
    <h3>Parallax Scrolling</h3>
    <div class="px-viewport" ref="viewport" @scroll="onScroll">
      <div class="px-layer bg" :style="{ transform: 'translateY(' + (scroll * 0.3) + 'px)' }"></div>
      <div class="px-layer mid" :style="{ transform: 'translateY(' + (scroll * 0.15) + 'px)' }"></div>
      <div class="px-content">
        <div class="px-section" v-for="i in 6" :key="i">
          <h4>Section {{ i }}</h4>
          <p>Scroll to see the parallax effect on the background layers.</p>
        </div>
      </div>
    </div>
  </div>
</div>`,
      css: `.px-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.px-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.px-viewport { height: 240px; overflow-y: auto; border-radius: 8px; position: relative; }
.px-layer { position: absolute; inset: 0; height: 150%; }
.px-layer.bg { background: linear-gradient(180deg, #0a0a2e 0%, #1e3a5f 50%, #0a0a2e 100%); }
.px-layer.mid {
  background: repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(79,195,247,0.05) 40px, rgba(79,195,247,0.05) 41px);
}
.px-content { position: relative; z-index: 1; padding: 16px; }
.px-section { padding: 24px; margin-bottom: 8px; background: rgba(15,23,42,0.8); border-radius: 8px; backdrop-filter: blur(4px); }
.px-section h4 { color: #e0e0e0; margin: 0 0 6px; }
.px-section p { color: #94a3b8; font-size: 13px; margin: 0; }`,
      js: `const { createApp, ref } = Vue;

createApp({
  setup() {
    const viewport = ref(null);
    const scroll = ref(0);
    const onScroll = () => { scroll.value = viewport.value?.scrollTop || 0; };
    return { viewport, scroll, onScroll };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-animated-counter',
    title: 'Animated Counter',
    description:
      'Build an animated number counter that smoothly transitions between values. Supports configurable duration, easing functions, formatting, and prefix/suffix text.',
    difficulty: 'intermediate',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['ref', 'watch', 'requestAnimationFrame', 'easing functions'],
    demoCode: {
      html: `<div id="app">
  <div class="ac-wrap">
    <h3>Animated Counter</h3>
    <div class="ac-grid">
      <div v-for="c in counters" :key="c.label" class="ac-card">
        <div class="ac-value">{{ c.prefix }}{{ c.display }}{{ c.suffix }}</div>
        <div class="ac-label">{{ c.label }}</div>
      </div>
    </div>
    <button class="ac-btn" @click="randomize">Randomize Values</button>
  </div>
</div>`,
      css: `.ac-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.ac-wrap h3 { color: #e0e0e0; margin: 0 0 16px; }
.ac-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
.ac-card { background: #0f172a; border-radius: 10px; padding: 20px; text-align: center; }
.ac-value { color: #4fc3f7; font-size: 32px; font-weight: 700; font-family: monospace; }
.ac-label { color: #64748b; font-size: 12px; margin-top: 4px; }
.ac-btn { padding: 8px 20px; border-radius: 6px; border: none; background: #4fc3f7; color: #0f172a; font-weight: 600; cursor: pointer; }`,
      js: `const { createApp, reactive } = Vue;

createApp({
  setup() {
    const counters = reactive([
      { label: 'Users', target: 8421, display: 0, prefix: '', suffix: '' },
      { label: 'Revenue', target: 12450, display: 0, prefix: '$', suffix: '' },
      { label: 'Uptime', target: 99, display: 0, prefix: '', suffix: '%' },
    ]);
    const animateTo = (counter, target) => {
      const start = counter.display;
      const diff = target - start;
      const duration = 1000;
      const startTime = performance.now();
      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        counter.display = Math.round(start + diff * ease);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const randomize = () => {
      counters.forEach(c => {
        const newTarget = Math.floor(Math.random() * c.target * 2);
        animateTo(c, newTarget);
      });
    };
    counters.forEach(c => animateTo(c, c.target));
    return { counters, randomize };
  }
}).mount('#app');`,
    },
  },
  {
    id: 'vue-confetti',
    title: 'Confetti',
    description:
      'Create a confetti celebration animation using canvas or CSS. Particles burst from a point with randomized colors, sizes, velocities, and gravity physics.',
    difficulty: 'intermediate',
    category: 'ui-components',
    framework: 'vue',
    concepts: ['ref', 'onMounted', 'canvas API', 'requestAnimationFrame', 'physics'],
    demoCode: {
      html: `<div id="app">
  <div class="cf-wrap">
    <h3>Confetti Celebration</h3>
    <div class="cf-area">
      <canvas ref="canvas" width="400" height="250" class="cf-canvas"></canvas>
      <button class="cf-btn" @click="burst">Celebrate!</button>
    </div>
  </div>
</div>`,
      css: `.cf-wrap { background: #1a1a2e; padding: 24px; border-radius: 12px; }
.cf-wrap h3 { color: #e0e0e0; margin: 0 0 12px; }
.cf-area { position: relative; }
.cf-canvas { width: 100%; height: 250px; border-radius: 8px; background: #0f172a; display: block; }
.cf-btn {
  position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
  padding: 10px 28px; border-radius: 6px; border: none;
  background: #4fc3f7; color: #0f172a; font-weight: 700; font-size: 16px; cursor: pointer;
  box-shadow: 0 4px 12px rgba(79,195,247,0.3);
}
.cf-btn:hover { background: #81d4fa; }`,
      js: `const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    const canvas = ref(null);
    let ctx, particles = [];
    const colors = ['#4fc3f7', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#facc15'];
    onMounted(() => { ctx = canvas.value.getContext('2d'); });
    const burst = () => {
      particles = [];
      const cx = canvas.value.width / 2;
      const cy = canvas.value.height / 2;
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: cx, y: cy,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10 - 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 4 + Math.random() * 4,
          life: 1,
        });
      }
      animate();
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
      let alive = false;
      particles.forEach(p => {
        if (p.life <= 0) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.life -= 0.012;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      ctx.globalAlpha = 1;
      if (alive) requestAnimationFrame(animate);
    };
    return { canvas, burst };
  }
}).mount('#app');`,
    },
  },
];
