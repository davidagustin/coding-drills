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
      { id: 1, name: 'Dashboard', icon: '\\u{1F4CA}', color: '#3b82f6', category: 'Analytics', description: 'View your project metrics' },
      { id: 2, name: 'Settings', icon: '\\u{2699}', color: '#8b5cf6', category: 'Config', description: 'Manage app preferences' },
      { id: 3, name: 'Messages', icon: '\\u{1F4AC}', color: '#22c55e', category: 'Social', description: 'Chat with your team' },
      { id: 4, name: 'Profile', icon: '\\u{1F464}', color: '#f59e0b', category: 'Config', description: 'Edit your profile info' },
      { id: 5, name: 'Reports', icon: '\\u{1F4C4}', color: '#ef4444', category: 'Analytics', description: 'Generate detailed reports' },
      { id: 6, name: 'Friends', icon: '\\u{1F465}', color: '#06b6d4', category: 'Social', description: 'Manage your connections' },
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
          <span v-if="sortKey === col.key">{{ sortAsc ? '\\u25B2' : '\\u25BC' }}</span>
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
          <button @click="toggleSize(i)" class="action-btn">{{ panel.span === 'span 2' ? '\\u25A3' : '\\u25A1' }}</button>
          <button @click="removePanel(i)" class="action-btn">\\u00D7</button>
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
        <button class="toggle-btn" @click="expanded = !expanded">{{ expanded ? '\\u00AB' : '\\u00BB' }}</button>
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
      { id: 'home', label: 'Home', icon: '\\u{1F3E0}' },
      { id: 'analytics', label: 'Analytics', icon: '\\u{1F4CA}' },
      { id: 'messages', label: 'Messages', icon: '\\u{1F4AC}' },
      { id: 'settings', label: 'Settings', icon: '\\u{2699}' },
      { id: 'profile', label: 'Profile', icon: '\\u{1F464}' },
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
      <span class="tree-icon">{{ item.children ? '\\u{1F4C1}' : '\\u{1F4C4}' }}</span>
      <span>{{ item.name }}</span>
      <span v-if="item.children" class="chevron">\\u203A</span>
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
      { id: 'home', label: 'Home', icon: '\\u{1F3E0}', desc: 'Your personalized feed and latest updates.' },
      { id: 'search', label: 'Search', icon: '\\u{1F50D}', desc: 'Find people, places, and content.' },
      { id: 'add', label: 'Create', icon: '\\u{2795}', desc: 'Share a new post or story.' },
      { id: 'inbox', label: 'Inbox', icon: '\\u{1F514}', desc: 'View your notifications and messages.' },
      { id: 'profile', label: 'Profile', icon: '\\u{1F464}', desc: 'Manage your profile and settings.' },
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
    <button :disabled="currentPage <= 1" @click="currentPage = 1" class="pg-btn">\\u00AB</button>
    <button :disabled="currentPage <= 1" @click="currentPage--" class="pg-btn">\\u2039</button>
    <button v-for="p in displayedPages" :key="p" @click="currentPage = p"
      class="pg-btn" :class="{ active: p === currentPage }">{{ p }}</button>
    <button :disabled="currentPage >= totalPages" @click="currentPage++" class="pg-btn">\\u203A</button>
    <button :disabled="currentPage >= totalPages" @click="currentPage = totalPages" class="pg-btn">\\u00BB</button>
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
      <button class="bell-btn" @click="showPanel = !showPanel">\\u{1F514}</button>
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
      <button class="dismiss" @click.stop="dismiss(n.id)">\\u00D7</button>
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
        {{ isFavorite(item.id) ? '\\u2665' : '\\u2661' }}
      </button>
    </div>
  </div>
  <div v-if="favorites.length" class="fav-section">
    <h4>Favorited</h4>
    <div class="fav-chips">
      <span v-for="id in favorites" :key="id" class="fav-chip" @click="toggleFav(id)">
        {{ getItem(id).name }} \\u00D7
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
      { id: 1, name: 'Vue.js', icon: '\\u{1F49A}', color: '#22c55e', category: 'Framework' },
      { id: 2, name: 'TypeScript', icon: '\\u{1F4D8}', color: '#3b82f6', category: 'Language' },
      { id: 3, name: 'Vite', icon: '\\u{26A1}', color: '#8b5cf6', category: 'Build Tool' },
      { id: 4, name: 'Pinia', icon: '\\u{1F34D}', color: '#f59e0b', category: 'State' },
      { id: 5, name: 'Tailwind', icon: '\\u{1F3A8}', color: '#06b6d4', category: 'CSS' },
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
    <button @click="undo" :disabled="!canUndo" class="tb-btn">\\u21A9 Undo</button>
    <button @click="redo" :disabled="!canRedo" class="tb-btn">\\u21AA Redo</button>
    <span class="history-info">{{ historyIndex + 1 }} / {{ history.length }}</span>
  </div>
  <div class="canvas">
    <div v-for="(item, i) in current" :key="i" class="canvas-item" :style="{ background: item.color }">
      <span>{{ item.text }}</span>
      <button class="remove-btn" @click="removeItem(i)">\\u00D7</button>
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
      <div class="empty-icon">\\u{1F4E6}</div>
      <h3>No Data Yet</h3>
      <p>Start by adding your first item. It only takes a few seconds.</p>
      <button class="empty-action">Create First Item</button>
    </div>
    <div v-else-if="currentState === 'no-results'" class="empty-state">
      <div class="empty-icon">\\u{1F50D}</div>
      <h3>No Results Found</h3>
      <p>We couldn't find anything matching your search. Try different keywords.</p>
      <button class="empty-action secondary">Clear Filters</button>
    </div>
    <div v-else-if="currentState === 'error'" class="empty-state error">
      <div class="empty-icon">\\u{26A0}</div>
      <h3>Something Went Wrong</h3>
      <p>We encountered an error loading your data. Please try again.</p>
      <button class="empty-action danger">Retry</button>
    </div>
    <div v-else-if="currentState === 'success'" class="empty-state success">
      <div class="empty-icon">\\u{2705}</div>
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
];
