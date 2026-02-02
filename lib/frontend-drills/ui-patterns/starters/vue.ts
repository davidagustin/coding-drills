/**
 * Hand-crafted starter code for Vue UI patterns.
 * Each entry provides syntactically valid boilerplate with state declarations,
 * TODO steps, and framework wrappers so users focus on business logic.
 */
export const vueStarters: Record<string, string> = {
  'vue-form-validation': `const { createApp, reactive, computed, ref } = Vue;

createApp({
  setup() {
    const form = reactive({ name: '', email: '' });
    const touched = reactive({ name: false, email: false });
    const submitted = ref(false);

    // Step 1: Create a computed property called "errors" that returns an object
    // with "name" and "email" keys. Validate that name is not empty and email
    // contains an "@" symbol. Return error message strings or empty strings.

    // Step 2: Create a computed property called "hasErrors" that checks if any
    // value in errors is a non-empty string (use Object.values and .some())

    // Step 3: Create a handleSubmit function that sets all touched fields to true,
    // then checks hasErrors - if no errors, set submitted.value to true

    return { form, touched, errors, hasErrors, submitted, handleSubmit };
  }
}).mount('#app');`,

  'vue-vee-validate': `const { createApp, ref, computed } = Vue;

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

    // Step 1: Create a validateField(field) function that reads the current value
    // of the matching ref (username, email, or password), runs the corresponding
    // rule function, and updates errors.value with the result using spread syntax

    // Step 2: Create a computed property "isValid" that returns true only when
    // all three fields have values AND all three rule functions return empty strings

    // Step 3: Create a handleSubmit function that calls validateField for each
    // field in rules (use Object.keys), then sets submitted to true if isValid

    return { username, email, password, errors, submitted, isValid, validateField, handleSubmit };
  }
}).mount('#app');`,

  'vue-autocomplete': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const items = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry', 'Grape', 'Mango', 'Orange', 'Peach', 'Strawberry'];
    const query = ref('');
    const selected = ref('');
    const showList = ref(false);
    const activeIndex = ref(-1);

    // Step 1: Create a computed property "filtered" that returns an empty array
    // if query is empty/whitespace, otherwise filters items where the lowercase
    // item includes the lowercase query string

    // Step 2: Create an onInput function that sets showList to true, resets
    // activeIndex to -1, and clears the selected value

    // Step 3: Create a select(item) function that sets query to the item,
    // selected to the item, and hides the dropdown list

    // Step 4: Create moveDown/moveUp functions that increment/decrement
    // activeIndex within bounds (0 to filtered.length - 1)

    // Step 5: Create a selectCurrent function that calls select() with the
    // item at activeIndex in the filtered list (only if activeIndex >= 0)

    return { query, selected, showList, activeIndex, filtered, onInput, select, moveDown, moveUp, selectCurrent };
  }
}).mount('#app');`,

  'vue-file-upload': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const files = ref([]);
    const isDragover = ref(false);

    // Step 1: Create an addFiles(fileList) function that iterates over the
    // FileList using Array.from(), creates an entry object for each file with
    // { name: f.name, size: f.size, progress: 0 }, pushes it to files.value,
    // and calls simulateUpload(entry) for each

    // Step 2: Create a simulateUpload(entry) function that uses setInterval
    // to increment entry.progress by a random amount (Math.random() * 20)
    // up to 100, clearing the interval when progress reaches 100

    // Step 3: Create an onDrop(e) handler that sets isDragover to false
    // and calls addFiles with e.dataTransfer.files

    // Step 4: Create an onSelect(e) handler that calls addFiles
    // with e.target.files

    return { files, isDragover, onDrop, onSelect };
  }
}).mount('#app');`,

  'vue-date-picker': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
    const current = ref(new Date());
    const selected = ref('');

    // Step 1: Create a computed "monthYear" that formats current.value
    // using toLocaleString('default', { month: 'long', year: 'numeric' })

    // Step 2: Create a computed "calendarCells" that builds an array of day
    // numbers for the month. Get the first day's weekday index with
    // new Date(y, m, 1).getDay(), fill that many nulls, then push 1 through
    // daysInMonth (use new Date(y, m + 1, 0).getDate())

    // Step 3: Create isToday(d) that checks if d matches today's date
    // by comparing day, month, and year of current.value with new Date()

    // Step 4: Create isSelected(d) that checks if the date string
    // new Date(y, m, d).toLocaleDateString() equals selected.value

    // Step 5: Create selectDate(d) that sets selected.value to
    // new Date(y, m, d).toLocaleDateString()

    // Step 6: Create prevMonth/nextMonth functions that clone current.value,
    // call setMonth to adjust by -1/+1, and assign back to current.value

    return { days, monthYear, calendarCells, selected, isToday, isSelected, selectDate, prevMonth, nextMonth };
  }
}).mount('#app');`,

  'vue-dynamic-forms': `const { createApp, reactive, ref, computed } = Vue;

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

    // Step 1: Create a computed property "isValid" that filters schema for
    // required fields and checks that every required field has a truthy value
    // in formData (use schema.filter(f => f.required).every(f => formData[f.name]))

    return { schema, formData, submitted, isValid };
  }
}).mount('#app');`,

  'vue-input-masking': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const phone = ref('');
    const card = ref('');
    const date = ref('');

    // Step 1: Create a maskPhone(v) function that strips non-digits with
    // v.replace(/\\D/g, '').slice(0, 10), then formats as (XXX) XXX-XXXX
    // based on length: <=3 digits add "(", <=6 add ") ", else add "-"

    // Step 2: Create a maskCard(v) function that strips non-digits, slices
    // to 16 chars, and inserts a space every 4 digits using
    // d.replace(/(\\d{4})(?=\\d)/g, '$1 ')

    // Step 3: Create a maskDate(v) function that strips non-digits, slices
    // to 8 chars, and formats as MM/DD/YYYY by inserting "/" at positions 2 and 4

    return { phone, card, date, maskPhone, maskCard, maskDate };
  }
}).mount('#app');`,

  'vue-select-component': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const options = ['Vue', 'React', 'Angular', 'Svelte', 'Solid'];
    const open = ref(false);
    const selected = ref('');
    const search = ref('');

    // Step 1: Create a computed property "filtered" that filters options
    // where the lowercase option includes the lowercase search string

    // Step 2: Create a select(opt) function that sets selected.value to opt,
    // closes the dropdown (open = false), and clears the search string

    return { open, selected, search, filtered, select };
  }
}).mount('#app');`,

  'vue-inline-edit': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const items = ref(['Learn Vue 3', 'Build components', 'Ship to production']);
    const editIndex = ref(-1);
    const editValue = ref('');
    const newItem = ref('');

    // Step 1: Create a startEdit(i) function that sets editIndex to i
    // and copies items.value[i] into editValue

    // Step 2: Create a save(i) function that trims editValue and if non-empty,
    // assigns it to items.value[i], then calls cancel()

    // Step 3: Create a cancel() function that resets editIndex to -1
    // and clears editValue

    // Step 4: Create an add() function that trims newItem and if non-empty,
    // pushes it to items.value and clears newItem

    return { items, editIndex, editValue, newItem, startEdit, save, cancel, add };
  }
}).mount('#app');`,

  'vue-color-picker': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const hue = ref(220);
    const sat = ref(80);
    const lit = ref(50);
    const presets = ['#3b82f6','#22c55e','#ef4444','#f59e0b','#8b5cf6','#ec4899','#06b6d4','#e2e8f0'];

    // Step 1: Create a computed "hexColor" that converts HSL to hex.
    // Use the formula: a = s * Math.min(l, 1-l), then for each channel
    // f(n) = l - a * Math.max(Math.min(k-3, 9-k, 1), -1) where k = (n + h/30) % 12
    // Convert each channel to hex with Math.round(x*255).toString(16).padStart(2,'0')
    // Remember to divide sat and lit by 100 first

    // Step 2: Create a parseHex(hex) function that validates the hex string
    // with regex /^#[0-9a-fA-F]{6}$/, parses r/g/b values (0-1 range),
    // then converts RGB to HSL and updates hue, sat, lit refs accordingly

    return { hue, sat, lit, hexColor, presets, parseHex };
  }
}).mount('#app');`,

  'vue-modal': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const showModal = ref(false);
    const confirmed = ref(false);

    // This pattern is mostly template-driven. The template handles:
    // - Opening the modal by setting showModal to true
    // - Closing on overlay click (@click.self) or close button
    // - Setting confirmed to true on confirm button click

    // Step 1: Try adding a method to handle confirm that sets confirmed
    // to true and showModal to false in one action

    return { showModal, confirmed };
  }
}).mount('#app');`,

  'vue-drag-drop': `const { createApp, ref } = Vue;

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

    // Step 1: Create a dragStart(i) function that stores the dragged
    // item's index in dragIndex

    // Step 2: Create a dragOver(i) function that skips if i equals dragIndex,
    // otherwise sets overIndex to i, splices the dragged item from its current
    // position, inserts it at position i, and updates dragIndex to i

    // Step 3: Create a dragEnd() function that resets both dragIndex
    // and overIndex to -1

    return { items, dragIndex, overIndex, dragStart, dragOver, dragEnd };
  }
}).mount('#app');`,

  'vue-data-table': `const { createApp, ref, computed } = Vue;

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

    // Step 1: Create a computed "filtered" that filters data rows where any
    // value (converted to string, lowercased) includes the search query.
    // Then sort the result using sortKey and sortAsc (multiply comparator by
    // sortAsc ? 1 : -1)

    // Step 2: Create a computed "totalPages" using Math.ceil(filtered.length / perPage)
    // with a minimum of 1

    // Step 3: Create a computed "paginated" that slices filtered from
    // (page - 1) * perPage to page * perPage

    // Step 4: Create a sortBy(key) function that toggles sortAsc if same key,
    // otherwise sets new sortKey and resets sortAsc to true. Reset page to 1.

    return { columns, search, sortKey, sortAsc, page, filtered, totalPages, paginated, sortBy };
  }
}).mount('#app');`,

  'vue-tabs': `const { createApp, ref, reactive } = Vue;

createApp({
  setup() {
    const activeTab = ref(0);
    const tabs = reactive([
      { title: 'Profile', content: 'Edit your profile info here. State is kept alive when switching tabs.', input: '' },
      { title: 'Settings', content: 'Manage your app settings. Try typing then switching tabs.', input: '' },
      { title: 'About', content: 'Version 1.0.0. Built with Vue 3 Composition API.', input: '' },
    ]);

    // This pattern is mostly template-driven. The tabs data and activeTab ref
    // are all you need. The template uses v-show="activeTab === i" to keep
    // tab state alive when switching (unlike v-if which destroys components).

    // Step 1: (Optional) Add a method to dynamically add a new tab
    // Step 2: (Optional) Add a method to remove a tab and adjust activeTab

    return { activeTab, tabs };
  }
}).mount('#app');`,

  'vue-accordion': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const items = [
      { title: 'What is Vue 3?', content: 'Vue 3 is a progressive JavaScript framework featuring the Composition API, improved performance via proxy-based reactivity, and Teleport/Suspense components.' },
      { title: 'What is the Composition API?', content: 'The Composition API lets you organize logic by feature using setup(), ref(), reactive(), and composables instead of the Options API.' },
      { title: 'What is Pinia?', content: 'Pinia is the official state management library for Vue, replacing Vuex with a simpler API, TypeScript support, and devtools integration.' },
    ];
    const openItems = ref([0]);
    const allowMultiple = ref(false);

    // Step 1: Create a toggle(i) function that:
    // - If i is already in openItems, removes it (use indexOf and splice)
    // - If allowMultiple is true, pushes i to openItems
    // - If allowMultiple is false, replaces openItems with [i] (single mode)

    return { items, openItems, allowMultiple, toggle };
  }
}).mount('#app');`,

  'vue-stepper': `const { createApp, ref, reactive, computed } = Vue;

createApp({
  setup() {
    const steps = [{ title: 'Name' }, { title: 'Email' }, { title: 'Confirm' }];
    const current = ref(0);
    const form = reactive({ name: '', email: '' });
    const done = ref(false);

    // Step 1: Create a computed property "canNext" that validates the current step:
    // - Step 0: form.name.trim().length > 0
    // - Step 1: form.email.includes('@')
    // - Otherwise: true

    return { steps, current, form, done, canNext };
  }
}).mount('#app');`,

  'vue-carousel': `const { createApp, ref, watch, onUnmounted } = Vue;

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

    // Step 1: Create a next() function that advances current to the next slide,
    // wrapping around using modulo: (current.value + 1) % slides.length

    // Step 2: Create a prev() function that goes to the previous slide,
    // wrapping: (current.value - 1 + slides.length) % slides.length

    // Step 3: Add a watch() on autoplay that clears any existing timer,
    // then if autoplay is true, starts a setInterval calling next every 2000ms

    // Step 4: Use onUnmounted to clean up the timer with clearInterval

    return { slides, current, autoplay, next, prev };
  }
}).mount('#app');`,

  'vue-virtual-list': `const { createApp, ref, computed, onMounted } = Vue;

createApp({
  setup() {
    const itemHeight = 44;
    const containerRef = ref(null);
    const scrollTop = ref(0);
    const viewHeight = ref(260);

    const items = Array.from({ length: 10000 }, (_, i) => ({
      index: i, text: 'Item row ' + i + ' -- virtual scrolling demo'
    }));

    // Step 1: Create a computed "totalHeight" that returns
    // items.length * itemHeight (the full scrollable height)

    // Step 2: Create a computed "visibleItems" that calculates which items
    // are visible. Find the start index with Math.floor(scrollTop / itemHeight),
    // compute the count with Math.ceil(viewHeight / itemHeight) + 2 for buffer,
    // slice items, and map each to include a "top" property: item.index * itemHeight

    // Step 3: Create an onScroll(e) handler that updates scrollTop.value
    // from e.target.scrollTop

    return { containerRef, items, totalHeight, visibleItems, onScroll };
  }
}).mount('#app');`,

  'vue-context-menu': `const { createApp, ref, onMounted, onUnmounted } = Vue;

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

    // Step 1: Create a showMenu(e) function that sets menuX and menuY
    // from e.clientX and e.clientY, and sets menuVisible to true

    // Step 2: Create a doAction(label) function that sets lastAction
    // to the label and hides the menu

    // Step 3: Create a closeMenu function that sets menuVisible to false

    // Step 4: Use onMounted to add a 'click' event listener on document
    // that calls closeMenu, and onUnmounted to remove it

    return { menuVisible, menuX, menuY, lastAction, menuItems, showMenu, doAction };
  }
}).mount('#app');`,

  'vue-toast': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const toasts = ref([]);
    let nextId = 0;

    const messages = {
      success: 'Operation completed successfully!',
      error: 'Something went wrong. Please try again.',
      info: 'Here is some useful information.',
    };

    // Step 1: Create an addToast(type) function that generates a unique id
    // (nextId++), pushes { id, type, message: messages[type] } to toasts.value,
    // and sets a setTimeout to call removeToast(id) after 3000ms

    // Step 2: Create a removeToast(id) function that filters toasts.value
    // to remove the toast with the matching id

    return { toasts, addToast, removeToast };
  }
}).mount('#app');`,

  'vue-charts': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const colors = ['#3b82f6','#22c55e','#f59e0b','#ef4444','#8b5cf6'];
    const labels = ['Jan','Feb','Mar','Apr','May'];
    const data = ref(labels.map((l, i) => ({ label: l, value: Math.floor(Math.random() * 80) + 20, color: colors[i] })));

    // Step 1: Create a computed "maxVal" that returns the maximum value
    // from data using Math.max(...data.value.map(d => d.value))

    // Step 2: Create a randomize() function that maps over data.value
    // and returns new objects with the same label/color but a random value
    // between 20 and 100: Math.floor(Math.random() * 80) + 20

    return { data, maxVal, randomize };
  }
}).mount('#app');`,

  'vue-search-filter': `const { createApp, ref, computed } = Vue;

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

    // Step 1: Create a computed "filtered" that filters items where:
    // - item.name lowercased includes query lowercased (text match)
    // - AND either category is empty OR item.category equals the selected category
    // Both conditions must be true for the item to appear

    return { query, category, categories, filtered };
  }
}).mount('#app');`,

  'vue-infinite-scroll': `const { createApp, ref, onMounted } = Vue;

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

    // Step 1: Create a loadMore() function that returns early if loading or
    // allLoaded is true. Set loading to true, then use setTimeout (600ms) to
    // generate 10 new items starting from items.value.length, push them to
    // items.value, set loading to false, and if items.value.length >= totalItems
    // set allLoaded to true

    // Step 2: Create an onScroll(e) handler that checks if the user has
    // scrolled near the bottom: el.scrollTop + el.clientHeight >= el.scrollHeight - 20
    // If so, call loadMore()

    // Step 3: Use onMounted to call loadMore() for the initial data load

    return { items, loading, allLoaded, totalItems, feedRef, onScroll };
  }
}).mount('#app');`,

  'vue-gallery': `const { createApp, ref } = Vue;

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

    // Step 1: Create openViewer(i) that sets currentIndex to i and
    // viewerOpen to true

    // Step 2: Create closeViewer() that sets viewerOpen to false

    // Step 3: Create nextImage() that advances currentIndex with wrap-around:
    // (currentIndex.value + 1) % images.length

    // Step 4: Create prevImage() that goes back with wrap-around:
    // (currentIndex.value - 1 + images.length) % images.length

    return { images, viewerOpen, currentIndex, openViewer, closeViewer, nextImage, prevImage };
  }
}).mount('#app');`,

  'vue-card-grid': `const { createApp, ref, computed } = Vue;

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

    // Step 1: Create a computed "filtered" that:
    // - Filters cards where name or category (lowercased) includes search (lowercased)
    // - Sorts the result by the sortBy field using localeCompare

    return { search, sortBy, filtered };
  }
}).mount('#app');`,

  'vue-sortable-table': `const { createApp, ref, computed } = Vue;

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

    // Step 1: Create a computed "sortedData" that:
    // - Filters data rows where any value (String(v).toLowerCase()) includes
    //   the filter string (lowercased)
    // - Sorts by sortKey with direction from sortAsc (multiply by 1 or -1)

    // Step 2: Create a sort(key) function that toggles sortAsc if the same key
    // is clicked, otherwise sets the new sortKey and resets sortAsc to true

    return { columns, filter, sortKey, sortAsc, sortedData, sort };
  }
}).mount('#app');`,

  'vue-dashboard': `const { createApp, ref } = Vue;

createApp({
  setup() {
    let nextId = 5;
    const panels = ref([
      { id: 1, title: 'Revenue', value: '$12,450', label: 'This month', color: '#3b82f6', span: 'span 1' },
      { id: 2, title: 'Users', value: '1,284', label: 'Active today', color: '#8b5cf6', span: 'span 1' },
      { id: 3, title: 'Conversion', value: '3.2%', label: 'Last 7 days', color: '#22c55e', span: 'span 2' },
      { id: 4, title: 'Orders', value: '384', label: 'This week', color: '#f59e0b', span: 'span 1' },
    ]);

    // Step 1: Create a toggleSize(i) function that toggles panels.value[i].span
    // between 'span 1' and 'span 2'

    // Step 2: Create a removePanel(i) function that removes the panel at index i
    // using splice

    // Step 3: Create an addPanel() function that pushes a new panel with
    // a unique id (nextId++), a random color from a predefined array,
    // a random value (Math.floor(Math.random() * 1000)), and span 'span 1'

    return { panels, toggleSize, removePanel, addPanel };
  }
}).mount('#app');`,

  'vue-sidebar': `const { createApp, ref, computed } = Vue;

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

    // Step 1: Create a computed "currentItem" that finds the nav item
    // whose id matches activeItem.value, falling back to navItems[0]

    return { expanded, activeItem, navItems, currentItem };
  }
}).mount('#app');`,

  'vue-navbar': `const { createApp, ref, computed } = Vue;

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

    // Step 1: Create a computed "currentLink" that finds the link object
    // whose id matches activeLink.value, falling back to links[0]

    return { menuOpen, activeLink, links, currentLink };
  }
}).mount('#app');`,

  'vue-breadcrumbs': `const { createApp, ref, computed } = Vue;

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

    // Step 1: Create a computed "breadcrumbs" that maps path.value to
    // an array of name strings: path.value.map(p => p.name)

    // Step 2: Create a computed "currentItems" that returns the children
    // array of the last item in path.value, or an empty array if no children

    // Step 3: Create a goInto(item) function that only navigates into items
    // with children - spread path.value and append the item

    // Step 4: Create a navigateTo(index) function that slices path.value
    // from 0 to index + 1, effectively going back up the tree

    return { breadcrumbs, currentItems, goInto, navigateTo };
  }
}).mount('#app');`,

  'vue-bottom-nav': `const { createApp, ref, computed } = Vue;

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

    // Step 1: Create a computed "currentTab" that finds the tab object
    // whose id matches activeTab.value, falling back to tabs[0]

    return { activeTab, tabs, currentTab };
  }
}).mount('#app');`,

  'vue-mega-menu': `const { createApp, ref } = Vue;

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

    // This pattern is mostly template-driven. The template handles:
    // - @mouseenter sets openMenu to the menu label
    // - @mouseleave clears openMenu
    // - Clicking a link sets selected and closes the menu

    // Step 1: (Optional) Convert to click-based toggle instead of hover
    // by creating a toggleMenu(label) function

    return { openMenu, selected, menus };
  }
}).mount('#app');`,

  'vue-pagination': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const perPage = 5;
    const currentPage = ref(1);
    const allItems = Array.from({ length: 47 }, (_, i) => i + 1);

    // Step 1: Create a computed "totalPages" using
    // Math.ceil(allItems.length / perPage)

    // Step 2: Create a computed "pageItems" that slices allItems
    // from (currentPage - 1) * perPage to currentPage * perPage

    // Step 3: Create a computed "displayedPages" that generates a window
    // of up to 5 page numbers centered around currentPage. Calculate
    // start = Math.max(1, currentPage - 2), end = Math.min(totalPages, start + 4),
    // then adjust start = Math.max(1, end - 4). Push each number from start to end.

    return { currentPage, allItems, totalPages, pageItems, displayedPages };
  }
}).mount('#app');`,

  'vue-keyboard-shortcuts': `const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

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

    // Step 1: Create a computed "triggeredAction" that finds the shortcut
    // matching lastTriggered.value and returns its action string (or '')

    // Step 2: Create a triggerAction(key) function that sets lastTriggered
    // to key, then uses setTimeout (1500ms) to clear it back to '' (only if
    // it still matches the key, to avoid clearing a newer trigger)

    // Step 3: Create a handleKeyDown(e) event handler that builds a combo
    // string from modifier keys (e.ctrlKey/e.metaKey -> 'ctrl', e.shiftKey ->
    // 'shift') and e.key.toLowerCase(), joined by '+'. If the combo matches
    // a shortcut, call e.preventDefault() and triggerAction()

    // Step 4: Use onMounted/onUnmounted to add/remove the 'keydown'
    // event listener on document

    return { shortcuts, lastTriggered, triggeredAction, triggerAction };
  }
}).mount('#app');`,

  'vue-settings': `const { createApp, reactive, watch } = Vue;

createApp({
  setup() {
    const themes = ['dark', 'light', 'auto'];
    const languages = ['English', 'Spanish', 'French', 'German', 'Japanese'];

    const defaults = { theme: 'dark', fontSize: 16, notifications: true, autoSave: false, language: 'English' };

    // Step 1: Read saved settings from localStorage using
    // localStorage.getItem('vue-settings'). If found, parse JSON and merge
    // with defaults. Create the settings reactive object with the result.
    const saved = localStorage.getItem('vue-settings');
    const settings = reactive(saved ? { ...defaults, ...JSON.parse(saved) } : { ...defaults });

    // Step 2: Add a deep watch on settings that saves to localStorage
    // whenever any setting changes. Use watch(settings, callback, { deep: true })
    // and localStorage.setItem('vue-settings', JSON.stringify(val))

    return { settings, themes, languages };
  }
}).mount('#app');`,

  'vue-notifications': `const { createApp, ref, computed } = Vue;

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

    // Step 1: Create a computed "unread" that counts notifications
    // where n.read is false

    // Step 2: Create addNotification(type) that picks a random message
    // from messages[type], unshifts a new notification object
    // { id: nextId++, type, message, time: 'Just now', read: false }
    // to notifications.value

    // Step 3: Create dismiss(id) that filters notifications.value
    // to remove the notification with matching id

    // Step 4: Create markAllRead() that sets n.read = true on every notification

    return { notifications, showPanel, unread, addNotification, dismiss, markAllRead };
  }
}).mount('#app');`,

  'vue-favorites': `const { createApp, ref } = Vue;

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

    // Step 1: Create isFavorite(id) that returns true if the id
    // exists in favorites.value (use .includes())

    // Step 2: Create toggleFav(id) that adds or removes the id from
    // favorites.value. If already present, find its index and splice it out.
    // If not present, push it. Then save to localStorage with
    // localStorage.setItem('vue-favorites', JSON.stringify(favorites.value))

    // Step 3: Create getItem(id) that finds the item by id from the items
    // array, falling back to items[0]

    return { items, favorites, isFavorite, toggleFav, getItem };
  }
}).mount('#app');`,

  'vue-undo-redo': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const colors = ['#3b82f6','#22c55e','#ef4444','#f59e0b','#8b5cf6','#06b6d4','#ec4899'];
    const initialState = [
      { text: 'Item A', color: '#3b82f6' },
      { text: 'Item B', color: '#22c55e' },
    ];

    const history = ref([JSON.parse(JSON.stringify(initialState))]);
    const historyIndex = ref(0);

    // Step 1: Create a computed "current" that returns history.value[historyIndex.value]

    // Step 2: Create computed "canUndo" (historyIndex > 0) and
    // "canRedo" (historyIndex < history.length - 1)

    // Step 3: Create pushState(newState) that truncates history after
    // historyIndex (history.value.slice(0, historyIndex + 1)), pushes a deep
    // clone of newState (JSON.parse(JSON.stringify(newState))), and updates
    // historyIndex to the new last index

    // Step 4: Create undo/redo functions that decrement/increment historyIndex
    // (only if canUndo/canRedo is true)

    // Step 5: Create addItem() that clones current, pushes a new item with
    // a letter label and random color, then calls pushState

    // Step 6: Create removeItem(i) that clones current, filters out index i,
    // then calls pushState

    // Step 7: Create shuffleColors() that maps current to new objects with
    // random colors, then calls pushState

    return { history, historyIndex, current, canUndo, canRedo, undo, redo, addItem, removeItem, shuffleColors };
  }
}).mount('#app');`,

  'vue-loading-states': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const loading = ref(true);

    const items = [
      { id: 1, name: 'Alice Chen', initials: 'AC', role: 'Frontend Dev', bio: 'Vue.js and TypeScript enthusiast.', color: '#3b82f6' },
      { id: 2, name: 'Bob Smith', initials: 'BS', role: 'Designer', bio: 'Crafting beautiful user interfaces.', color: '#8b5cf6' },
      { id: 3, name: 'Carol Wu', initials: 'CW', role: 'Backend Dev', bio: 'Node.js and database expert.', color: '#22c55e' },
    ];

    // Step 1: Create a toggleLoading() function that flips loading.value

    // Step 2: Add a setTimeout that sets loading to false after 2000ms
    // to simulate an initial data fetch
    setTimeout(() => { loading.value = false; }, 2000);

    return { loading, items, toggleLoading };
  }
}).mount('#app');`,

  'vue-empty-states': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const currentState = ref('no-data');
    const states = [
      { id: 'no-data', label: 'No Data' },
      { id: 'no-results', label: 'No Results' },
      { id: 'error', label: 'Error' },
      { id: 'success', label: 'Complete' },
    ];

    // This pattern is template-driven. The template uses v-if/v-else-if
    // to show different empty state designs based on currentState.
    // The buttons in the control bar switch currentState.

    // Step 1: (Optional) Add a method to handle the action button in each
    // state (e.g., "Create First Item", "Clear Filters", "Retry")

    return { currentState, states };
  }
}).mount('#app');`,

  'vue-image-viewer': `const { createApp, ref, computed } = Vue;

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

    // Step 1: Create a computed "transformStyle" that returns a CSS transform
    // string: 'transform: scale(' + scale + ') translate(' + panX + 'px, ' + panY + 'px)'

    // Step 2: Create zoomIn/zoomOut functions that adjust scale by 0.25,
    // clamping between 0.25 and 4

    // Step 3: Create resetView() that sets scale to 1 and panX/panY to 0

    // Step 4: Create onWheel(e) that calls zoomIn if deltaY < 0, else zoomOut

    // Step 5: Create startPan(e) that sets isPanning to true and records
    // the starting mouse position minus current pan offset

    // Step 6: Create onPan(e) that updates panX/panY if isPanning is true

    // Step 7: Create endPan() that sets isPanning to false

    return { scale, transformStyle, cellColor, zoomIn, zoomOut, resetView, onWheel, startPan, onPan, endPan };
  }
}).mount('#app');`,

  'vue-toggle': `const { createApp, reactive } = Vue;

createApp({
  setup() {
    const toggles = reactive([
      { id: 1, label: 'Dark Mode', description: 'Use dark color theme', value: true, disabled: false },
      { id: 2, label: 'Notifications', description: 'Receive push notifications', value: false, disabled: false },
      { id: 3, label: 'Auto-Save', description: 'Save changes automatically', value: true, disabled: false },
      { id: 4, label: 'Beta Features', description: 'Access experimental features', value: false, disabled: false },
      { id: 5, label: 'Maintenance Mode', description: 'Currently unavailable', value: false, disabled: true },
    ]);

    // This pattern is template-driven. The template handles toggling via:
    // @click="!item.disabled && (item.value = !item.value)"
    // The reactive array automatically updates the UI when values change.

    // Step 1: (Optional) Add a resetAll() method that sets all non-disabled
    // toggles back to their default values
    // Step 2: (Optional) Add keyboard support with @keydown.space.prevent

    return { toggles };
  }
}).mount('#app');`,

  // ── forms-input ──────────────────────────────────────────────────────

  'vue-rating-stars': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const rating = ref(0);
    const hovered = ref(0);
    const maxStars = 5;

    // Step 1: Create a computed "stars" that returns an array of maxStars
    // objects, each with { filled: i <= (hovered || rating), index: i }

    // Step 2: Create a setRating(i) function that sets rating.value to i,
    // or resets to 0 if the user clicks the same star again (toggle behavior)

    // Step 3: Create onMouseEnter(i) and onMouseLeave() functions that
    // set/clear hovered.value to preview the rating

    // Step 4: Create a computed "label" that returns a string like "3 of 5 stars"

    return { rating, hovered, maxStars, stars, setRating, onMouseEnter, onMouseLeave, label };
  }
}).mount('#app');`,

  'vue-tag-input': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const tags = ref(['vue', 'composition-api']);
    const input = ref('');
    const maxTags = 8;

    // Step 1: Create an addTag() function that trims input, converts to lowercase,
    // checks it is not empty, not a duplicate, and tags.length < maxTags,
    // then pushes to tags.value and clears input

    // Step 2: Create a removeTag(index) function that splices the tag at index

    // Step 3: Create an onKeydown(e) handler: if Enter or comma, call addTag;
    // if Backspace and input is empty, remove the last tag

    // Step 4: Create a computed "remaining" that returns maxTags - tags.length

    return { tags, input, maxTags, addTag, removeTag, onKeydown, remaining };
  }
}).mount('#app');`,

  'vue-multi-select': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const options = ['JavaScript', 'TypeScript', 'Python', 'Rust', 'Go', 'Ruby', 'Java', 'C#'];
    const selected = ref([]);
    const open = ref(false);
    const search = ref('');

    // Step 1: Create a computed "filtered" that filters options where the
    // lowercase option includes the lowercase search string

    // Step 2: Create a toggle(opt) function that adds or removes opt from
    // selected.value (check with includes, use indexOf + splice to remove)

    // Step 3: Create an isSelected(opt) function that returns
    // selected.value.includes(opt)

    // Step 4: Create a removeChip(opt) function that removes opt from selected

    // Step 5: Create a computed "label" that returns "N selected" or
    // "Select options" when none are chosen

    return { options, selected, open, search, filtered, toggle, isSelected, removeChip, label };
  }
}).mount('#app');`,

  'vue-otp-input': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const length = 6;
    const digits = ref(Array(length).fill(''));
    const inputRefs = ref([]);

    // Step 1: Create an onInput(index, e) handler that takes the last character
    // entered, updates digits[index], and auto-focuses the next input if not last

    // Step 2: Create an onKeydown(index, e) handler that on Backspace clears
    // current digit and moves focus to previous input if already empty

    // Step 3: Create an onPaste(e) handler that reads clipboard text, splits
    // into characters, fills digits array, and focuses the appropriate input

    // Step 4: Create a computed "code" that joins all digits into a single string

    // Step 5: Create a computed "isComplete" that returns true when every digit is filled

    return { length, digits, inputRefs, onInput, onKeydown, onPaste, code, isComplete };
  }
}).mount('#app');`,

  'vue-credit-card-input': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const cardNumber = ref('');
    const expiry = ref('');
    const cvc = ref('');
    const name = ref('');
    const flipped = ref(false);

    // Step 1: Create a computed "formattedNumber" that strips non-digits,
    // slices to 16, and inserts a space every 4 digits

    // Step 2: Create a computed "cardType" that detects Visa (starts with 4),
    // Mastercard (starts with 5), Amex (starts with 3), or unknown

    // Step 3: Create a maskExpiry(v) function that strips non-digits, slices
    // to 4, and inserts "/" after position 2

    // Step 4: Create a computed "isValid" that checks cardNumber has 16 digits,
    // expiry has 4 digits, cvc has 3+ digits, and name is non-empty

    return { cardNumber, expiry, cvc, name, flipped, formattedNumber, cardType, maskExpiry, isValid };
  }
}).mount('#app');`,

  'vue-address-form': `const { createApp, reactive, computed } = Vue;

createApp({
  setup() {
    const form = reactive({
      street: '', city: '', state: '', zip: '', country: 'US'
    });
    const countries = ['US', 'CA', 'UK', 'AU', 'DE', 'FR', 'JP'];
    const submitted = ref(false);

    // Step 1: Create a computed "errors" object that validates each field:
    // street must be non-empty, city non-empty, state non-empty,
    // zip must match a pattern (e.g., 5 digits for US), country required

    // Step 2: Create a computed "isValid" that checks all error values are empty

    // Step 3: Create a handleSubmit() function that sets submitted to true only
    // if isValid is true

    // Step 4: Create a formatAddress() computed that returns a formatted
    // multi-line address string from the form fields

    return { form, countries, submitted, errors, isValid, handleSubmit, formatAddress };
  }
}).mount('#app');`,

  'vue-survey-form': `const { createApp, ref, reactive, computed } = Vue;

createApp({
  setup() {
    const questions = [
      { id: 1, text: 'How satisfied are you?', type: 'rating', max: 5 },
      { id: 2, text: 'What do you like most?', type: 'select', options: ['Speed', 'Design', 'Features', 'Support'] },
      { id: 3, text: 'Additional feedback', type: 'text' },
    ];
    const answers = reactive({});
    const currentStep = ref(0);
    const submitted = ref(false);

    // Step 1: Create a computed "progress" that returns
    // Math.round((currentStep.value / questions.length) * 100)

    // Step 2: Create next() and prev() functions that increment/decrement
    // currentStep within bounds (0 to questions.length - 1)

    // Step 3: Create a computed "canProceed" that checks the current question
    // has a truthy answer in the answers object

    // Step 4: Create a submit() function that sets submitted to true

    return { questions, answers, currentStep, submitted, progress, next, prev, canProceed, submit };
  }
}).mount('#app');`,

  'vue-textarea-autogrow': `const { createApp, ref, watch } = Vue;

createApp({
  setup() {
    const text = ref('');
    const textareaRef = ref(null);
    const minRows = 3;
    const maxRows = 12;

    // Step 1: Create a resize() function that resets the textarea height to 'auto',
    // reads scrollHeight, computes minHeight (minRows * lineHeight) and
    // maxHeight (maxRows * lineHeight), clamps, and sets the style.height

    // Step 2: Add a watch on text that calls resize() on nextTick

    // Step 3: Create a computed "charCount" returning text.value.length

    // Step 4: Create a computed "wordCount" that splits text on whitespace
    // and filters empty strings

    return { text, textareaRef, minRows, maxRows, resize, charCount, wordCount };
  }
}).mount('#app');`,

  'vue-phone-input': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const raw = ref('');
    const countryCode = ref('+1');
    const codes = ['+1', '+44', '+49', '+33', '+81', '+61', '+86'];

    // Step 1: Create a computed "digits" that strips all non-digit characters
    // from raw.value and slices to 10

    // Step 2: Create a computed "formatted" that formats digits as
    // (XXX) XXX-XXXX based on length: <=3 just digits, <=6 add dash, else full format

    // Step 3: Create an onInput(e) handler that updates raw.value from
    // e.target.value, keeping only digits

    // Step 4: Create a computed "isValid" that checks digits.length === 10

    return { raw, countryCode, codes, digits, formatted, onInput, isValid };
  }
}).mount('#app');`,

  'vue-currency-input': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const raw = ref('');
    const currency = ref('USD');
    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];
    const symbols = { USD: '$', EUR: '\\u20AC', GBP: '\\u00A3', JPY: '\\u00A5', CAD: 'C$' };

    // Step 1: Create a computed "numericValue" that strips non-digit and non-dot
    // chars from raw, parses as float, returns 0 if NaN

    // Step 2: Create a computed "formatted" that formats numericValue as currency
    // using Intl.NumberFormat or manual prefix with symbols[currency.value]

    // Step 3: Create an onInput(e) handler that allows only digits and one decimal
    // point, updating raw.value accordingly

    // Step 4: Create a computed "inCents" that returns Math.round(numericValue * 100)

    return { raw, currency, currencies, symbols, numericValue, formatted, onInput, inCents };
  }
}).mount('#app');`,

  'vue-slider-range': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const min = 0;
    const max = 100;
    const low = ref(25);
    const high = ref(75);

    // Step 1: Create a computed "range" that returns high.value - low.value

    // Step 2: Create a computed "lowPercent" and "highPercent" that calculate
    // the percentage positions: ((value - min) / (max - min)) * 100

    // Step 3: Create onLowChange(e) that updates low.value, clamping so
    // it never exceeds high.value - 1

    // Step 4: Create onHighChange(e) that updates high.value, clamping so
    // it is never less than low.value + 1

    // Step 5: Create a computed "trackStyle" that returns CSS for the
    // highlighted range between low and high

    return { min, max, low, high, range, lowPercent, highPercent, onLowChange, onHighChange, trackStyle };
  }
}).mount('#app');`,

  'vue-toggle-group': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const options = ['Day', 'Week', 'Month', 'Year'];
    const selected = ref('Week');
    const allowMultiple = ref(false);
    const multiSelected = ref([]);

    // Step 1: Create a selectSingle(opt) function that sets selected.value to opt

    // Step 2: Create a toggleMulti(opt) function that adds/removes opt from
    // multiSelected.value using includes check and indexOf + splice / push

    // Step 3: Create an isActive(opt) function that returns true if opt matches
    // selected (single mode) or is in multiSelected (multi mode), based on allowMultiple

    // Step 4: Create a computed "activeLabel" that returns the currently active
    // option(s) as a comma-separated string

    return { options, selected, allowMultiple, multiSelected, selectSingle, toggleMulti, isActive, activeLabel };
  }
}).mount('#app');`,

  'vue-segmented-control': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const segments = ['All', 'Active', 'Completed', 'Archived'];
    const active = ref('All');
    const items = ref([
      { text: 'Learn Vue 3', status: 'Completed' },
      { text: 'Build components', status: 'Active' },
      { text: 'Write tests', status: 'Active' },
      { text: 'Old project', status: 'Archived' },
    ]);

    // Step 1: Create a computed "filtered" that returns all items when active
    // is 'All', otherwise filters items where item.status === active.value

    // Step 2: Create a computed "indicatorStyle" that calculates the CSS left
    // position and width based on the active segment index and segment count

    // Step 3: Create a computed "counts" object mapping each segment name
    // to the count of items matching that status (All = total count)

    return { segments, active, items, filtered, indicatorStyle, counts };
  }
}).mount('#app');`,

  'vue-combobox': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew'];
    const query = ref('');
    const selected = ref('');
    const open = ref(false);
    const highlightIndex = ref(-1);

    // Step 1: Create a computed "filtered" that filters options where the
    // lowercase option includes the lowercase query, returning all if query is empty

    // Step 2: Create a select(opt) function that sets selected and query to opt,
    // closes the dropdown, and resets highlightIndex

    // Step 3: Create onKeydown(e) to handle ArrowDown, ArrowUp, Enter, and Escape:
    // arrows move highlightIndex within filtered bounds, Enter selects the
    // highlighted option, Escape closes the dropdown

    // Step 4: Create an onInput() handler that opens the dropdown,
    // clears selected, and resets highlightIndex to -1

    return { options, query, selected, open, highlightIndex, filtered, select, onKeydown, onInput };
  }
}).mount('#app');`,

  'vue-mentions-input': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const text = ref('');
    const users = ['alice', 'bob', 'carol', 'dave', 'eve', 'frank'];
    const showSuggestions = ref(false);
    const suggestions = ref([]);
    const cursorPos = ref(0);

    // Step 1: Create an onInput(e) handler that updates text and cursorPos,
    // detects if the character before cursor is '@', extracts the partial
    // username after '@', and filters users to populate suggestions

    // Step 2: Create a selectUser(username) function that replaces the
    // partial @mention in text with the full @username, closes suggestions,
    // and restores focus to the input

    // Step 3: Create a computed "mentions" that extracts all @username
    // occurrences from text using a regex like /@(\\w+)/g

    // Step 4: Create a computed "highlightedText" that wraps each @mention
    // in the text with a span for styling

    return { text, users, showSuggestions, suggestions, cursorPos, onInput, selectUser, mentions, highlightedText };
  }
}).mount('#app');`,

  'vue-code-input': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const code = ref('function hello() {\\n  return "world";\\n}');
    const language = ref('javascript');
    const languages = ['javascript', 'python', 'html', 'css'];
    const lineNumbers = ref(true);

    // Step 1: Create a computed "lines" that splits code.value by newline
    // and returns an array of line strings

    // Step 2: Create a computed "lineCount" returning lines.value.length

    // Step 3: Create an onKeydown(e) handler that intercepts Tab to insert
    // two spaces at the cursor position instead of changing focus

    // Step 4: Create a computed "highlighted" that does basic syntax coloring
    // by wrapping keywords (function, return, const, let, var) in spans

    return { code, language, languages, lineNumbers, lines, lineCount, onKeydown, highlighted };
  }
}).mount('#app');`,

  'vue-signature-pad': `const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    const canvasRef = ref(null);
    const isDrawing = ref(false);
    const isEmpty = ref(true);
    let ctx = null;

    // Step 1: Use onMounted to get the 2D context from canvasRef, set
    // lineWidth, lineCap, and strokeStyle properties

    // Step 2: Create startDrawing(e) that sets isDrawing to true, calls
    // ctx.beginPath(), and moves to the event coordinates

    // Step 3: Create draw(e) that returns early if not drawing, otherwise
    // calls ctx.lineTo() with event coordinates and ctx.stroke()

    // Step 4: Create stopDrawing() that sets isDrawing to false and isEmpty
    // to false (since something was drawn)

    // Step 5: Create clear() that calls ctx.clearRect on the full canvas
    // dimensions and sets isEmpty to true

    return { canvasRef, isDrawing, isEmpty, startDrawing, draw, stopDrawing, clear };
  }
}).mount('#app');`,

  // ── interactive ──────────────────────────────────────────────────────

  'vue-tooltip': `const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const visible = ref(false);
    const position = ref({ x: 0, y: 0 });
    const placement = ref('top');
    const text = ref('Helpful tooltip text');

    // Step 1: Create show(e) and hide() functions that toggle visible and
    // capture the trigger element's bounding rect for positioning

    // Step 2: Create a computed "tooltipStyle" that returns top/left CSS
    // based on position and placement (top, bottom, left, right)

    // Step 3: Create a computed "arrowClass" that returns the correct
    // CSS class for the arrow direction based on placement

    return { visible, position, placement, text, show, hide, tooltipStyle, arrowClass };
  }
}).mount('#app');`,

  'vue-popover': `const { createApp, ref, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const open = ref(false);
    const triggerRef = ref(null);
    const popoverRef = ref(null);
    const position = ref({ top: 0, left: 0 });

    // Step 1: Create a toggle() function that flips open.value and
    // recalculates position from triggerRef's getBoundingClientRect

    // Step 2: Create a computed "popoverStyle" returning CSS top and left
    // from position, adding offset for the arrow

    // Step 3: Create a handleClickOutside(e) that closes the popover
    // if the click target is outside both triggerRef and popoverRef

    // Step 4: Use onMounted/onUnmounted to add/remove the click outside listener

    return { open, triggerRef, popoverRef, position, toggle, popoverStyle };
  }
}).mount('#app');`,

  'vue-lightbox': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const images = [
      { label: 'Sunrise', color: '#f59e0b' },
      { label: 'Ocean', color: '#3b82f6' },
      { label: 'Forest', color: '#22c55e' },
      { label: 'Night Sky', color: '#6366f1' },
      { label: 'Desert', color: '#ef4444' },
    ];
    const isOpen = ref(false);
    const currentIndex = ref(0);

    // Step 1: Create open(index) that sets currentIndex and isOpen to true

    // Step 2: Create close() that sets isOpen to false

    // Step 3: Create next() and prev() that navigate with wrap-around
    // using modulo arithmetic on images.length

    // Step 4: Create an onKeydown(e) handler for ArrowLeft, ArrowRight,
    // and Escape keys that calls prev, next, or close respectively

    return { images, isOpen, currentIndex, open, close, next, prev, onKeydown };
  }
}).mount('#app');`,

  'vue-sortable-list': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const items = ref([
      { id: 1, text: 'First item' },
      { id: 2, text: 'Second item' },
      { id: 3, text: 'Third item' },
      { id: 4, text: 'Fourth item' },
      { id: 5, text: 'Fifth item' },
    ]);
    const draggedIndex = ref(-1);

    // Step 1: Create moveUp(index) that swaps items[index] with items[index-1]
    // if index > 0, using array destructuring for the swap

    // Step 2: Create moveDown(index) that swaps items[index] with items[index+1]
    // if index < items.length - 1

    // Step 3: Create onDragStart(index) that stores the dragged index

    // Step 4: Create onDrop(index) that reorders by splicing the dragged item
    // out and inserting it at the drop position, then resets draggedIndex

    return { items, draggedIndex, moveUp, moveDown, onDragStart, onDrop };
  }
}).mount('#app');`,

  'vue-resizable-panels': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const leftWidth = ref(50);
    const isDragging = ref(false);
    const containerRef = ref(null);

    // Step 1: Create onMouseDown() that sets isDragging to true and adds
    // mousemove and mouseup listeners to document

    // Step 2: Create onMouseMove(e) that calculates the new leftWidth percentage
    // from the mouse X position relative to containerRef's bounding rect,
    // clamping between 20 and 80

    // Step 3: Create onMouseUp() that sets isDragging to false and removes
    // the document listeners

    // Step 4: Create a computed "rightWidth" returning 100 - leftWidth.value

    return { leftWidth, isDragging, containerRef, onMouseDown, rightWidth };
  }
}).mount('#app');`,

  'vue-split-view': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const orientation = ref('horizontal');
    const splitPercent = ref(50);
    const isDragging = ref(false);
    const containerRef = ref(null);

    // Step 1: Create startDrag() that sets isDragging true and attaches
    // mousemove/mouseup handlers to document

    // Step 2: Create onDrag(e) that computes splitPercent from mouse position
    // relative to container, using clientX for horizontal and clientY for vertical

    // Step 3: Create stopDrag() that sets isDragging false and removes listeners

    // Step 4: Create a computed "panelStyles" returning CSS objects for both
    // panels based on orientation and splitPercent

    return { orientation, splitPercent, isDragging, containerRef, startDrag, panelStyles };
  }
}).mount('#app');`,

  'vue-kanban-board': `const { createApp, ref, reactive } = Vue;

createApp({
  setup() {
    const columns = reactive([
      { id: 'todo', title: 'To Do', items: [{ id: 1, text: 'Design UI' }, { id: 2, text: 'Write tests' }] },
      { id: 'progress', title: 'In Progress', items: [{ id: 3, text: 'Build API' }] },
      { id: 'done', title: 'Done', items: [{ id: 4, text: 'Setup project' }] },
    ]);
    let nextId = 5;
    const dragItem = ref(null);
    const dragColumn = ref(null);

    // Step 1: Create addItem(colId, text) that finds the column by id and
    // pushes a new item with nextId++ and the given text

    // Step 2: Create onDragStart(colId, itemId) that stores which column and
    // item are being dragged

    // Step 3: Create onDrop(targetColId) that removes the item from its source
    // column and pushes it to the target column

    // Step 4: Create removeItem(colId, itemId) that splices the item out
    // of the specified column

    return { columns, dragItem, dragColumn, addItem, onDragStart, onDrop, removeItem };
  }
}).mount('#app');`,

  'vue-timeline': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const events = ref([
      { id: 1, date: '2024-01-15', title: 'Project Started', description: 'Initial project kickoff meeting', type: 'milestone' },
      { id: 2, date: '2024-02-01', title: 'Design Phase', description: 'UI/UX design completed', type: 'design' },
      { id: 3, date: '2024-03-10', title: 'Alpha Release', description: 'First internal alpha version', type: 'release' },
      { id: 4, date: '2024-04-20', title: 'Beta Launch', description: 'Public beta with user testing', type: 'release' },
    ]);
    const filter = ref('all');
    const types = ['all', 'milestone', 'design', 'release'];

    // Step 1: Create a computed "filtered" that returns all events when
    // filter is 'all', otherwise filters by event.type

    // Step 2: Create addEvent(event) that pushes a new event with an
    // auto-incremented id to the events array

    // Step 3: Create removeEvent(id) that filters out the event with matching id

    return { events, filter, types, filtered, addEvent, removeEvent };
  }
}).mount('#app');`,

  'vue-tree-view': `const { createApp, ref, reactive } = Vue;

createApp({
  setup() {
    const tree = reactive([
      { id: 1, label: 'src', expanded: true, children: [
        { id: 2, label: 'components', expanded: false, children: [
          { id: 3, label: 'Button.vue' },
          { id: 4, label: 'Modal.vue' },
        ]},
        { id: 5, label: 'utils', expanded: false, children: [
          { id: 6, label: 'helpers.ts' },
        ]},
        { id: 7, label: 'App.vue' },
      ]},
      { id: 8, label: 'package.json' },
    ]);
    const selectedId = ref(null);

    // Step 1: Create a toggle(node) function that flips node.expanded
    // (only if the node has children)

    // Step 2: Create a select(node) function that sets selectedId to node.id

    // Step 3: Create an isLeaf(node) function that returns true if the node
    // has no children array or children is empty

    // Step 4: Create a computed "selectedLabel" that recursively finds
    // the node with matching id and returns its label

    return { tree, selectedId, toggle, select, isLeaf, selectedLabel };
  }
}).mount('#app');`,

  'vue-collapsible-panel': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const panels = ref([
      { id: 1, title: 'Getting Started', content: 'Install the package and import the components you need.', open: true },
      { id: 2, title: 'Configuration', content: 'Set up your config file with the required options.', open: false },
      { id: 3, title: 'Advanced Usage', content: 'Use composables and plugins for extended functionality.', open: false },
    ]);

    // Step 1: Create a toggle(id) function that finds the panel by id and
    // flips its open property

    // Step 2: Create an expandAll() function that sets open to true on all panels

    // Step 3: Create a collapseAll() function that sets open to false on all panels

    // Step 4: Create a computed "openCount" returning the number of open panels

    return { panels, toggle, expandAll, collapseAll, openCount };
  }
}).mount('#app');`,

  'vue-drawer': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const isOpen = ref(false);
    const side = ref('left');
    const sides = ['left', 'right', 'top', 'bottom'];

    // Step 1: Create open() and close() functions that toggle isOpen

    // Step 2: Create a computed "drawerStyle" that returns CSS transform
    // based on side: translateX(-100%) for left, translateX(100%) for right,
    // translateY(-100%) for top, translateY(100%) for bottom when closed

    // Step 3: Create a computed "overlayVisible" that returns isOpen.value
    // (used for the backdrop overlay)

    // Step 4: Create onOverlayClick() that calls close() to dismiss on
    // backdrop click

    return { isOpen, side, sides, open, close, drawerStyle, overlayVisible, onOverlayClick };
  }
}).mount('#app');`,

  'vue-bottom-sheet': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const isOpen = ref(false);
    const snapPoints = [25, 50, 90];
    const currentSnap = ref(50);
    const isDragging = ref(false);
    const startY = ref(0);

    // Step 1: Create open() and close() functions toggling isOpen

    // Step 2: Create a computed "sheetStyle" that returns bottom offset and
    // height based on currentSnap percentage

    // Step 3: Create onTouchStart(e) that records the start Y position and
    // sets isDragging to true

    // Step 4: Create onTouchMove(e) that calculates the drag distance and
    // snaps to the nearest snap point

    // Step 5: Create onTouchEnd() that finalizes the snap position and
    // sets isDragging to false

    return { isOpen, snapPoints, currentSnap, isDragging, open, close, sheetStyle, onTouchStart, onTouchMove, onTouchEnd };
  }
}).mount('#app');`,

  'vue-command-palette': `const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const isOpen = ref(false);
    const query = ref('');
    const selectedIndex = ref(0);
    const commands = [
      { id: 1, label: 'Open File', shortcut: 'Ctrl+O', group: 'File' },
      { id: 2, label: 'Save File', shortcut: 'Ctrl+S', group: 'File' },
      { id: 3, label: 'Search', shortcut: 'Ctrl+F', group: 'Edit' },
      { id: 4, label: 'Toggle Theme', shortcut: 'Ctrl+T', group: 'View' },
      { id: 5, label: 'Settings', shortcut: 'Ctrl+,', group: 'View' },
    ];
    const lastAction = ref('');

    // Step 1: Create a computed "filtered" that filters commands where
    // label (lowercase) includes query (lowercase)

    // Step 2: Create a run(cmd) function that sets lastAction to cmd.label,
    // clears query, closes the palette

    // Step 3: Create onKeydown(e) for navigating with ArrowUp/Down, selecting
    // with Enter, and closing with Escape

    // Step 4: Use onMounted to listen for Ctrl+K / Cmd+K to toggle open

    return { isOpen, query, selectedIndex, commands, lastAction, filtered, run, onKeydown };
  }
}).mount('#app');`,

  'vue-spotlight-search': `const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const isOpen = ref(false);
    const query = ref('');
    const activeIndex = ref(0);
    const results = [
      { id: 1, title: 'Dashboard', type: 'page', icon: '\\u{1F4CA}' },
      { id: 2, title: 'User Settings', type: 'page', icon: '\\u{2699}' },
      { id: 3, title: 'Create Project', type: 'action', icon: '\\u{2795}' },
      { id: 4, title: 'Search Files', type: 'action', icon: '\\u{1F50D}' },
      { id: 5, title: 'Documentation', type: 'link', icon: '\\u{1F4D6}' },
    ];
    const lastResult = ref('');

    // Step 1: Create a computed "filtered" that filters results where title
    // (lowercase) includes query (lowercase), grouped by type

    // Step 2: Create select(item) that sets lastResult, clears query, closes

    // Step 3: Create keyboard navigation (ArrowUp/Down/Enter/Escape)

    // Step 4: Use onMounted for Ctrl+K / Cmd+K global shortcut to toggle

    return { isOpen, query, activeIndex, results, lastResult, filtered, select };
  }
}).mount('#app');`,

  'vue-floating-action-btn': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const isExpanded = ref(false);
    const lastAction = ref('');
    const actions = [
      { id: 'add', label: 'Add Item', icon: '\\u{2795}', color: '#3b82f6' },
      { id: 'edit', label: 'Edit', icon: '\\u{270F}', color: '#22c55e' },
      { id: 'share', label: 'Share', icon: '\\u{1F4E4}', color: '#f59e0b' },
      { id: 'delete', label: 'Delete', icon: '\\u{1F5D1}', color: '#ef4444' },
    ];

    // Step 1: Create toggle() that flips isExpanded

    // Step 2: Create doAction(action) that sets lastAction to action.label
    // and collapses the menu

    // Step 3: Create a computed "actionStyles" that returns an array of style
    // objects with transform offset based on index (stagger upward)

    return { isExpanded, lastAction, actions, toggle, doAction, actionStyles };
  }
}).mount('#app');`,

  'vue-skeleton-loader': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const loading = ref(true);
    const variant = ref('card');
    const variants = ['card', 'list', 'profile', 'table'];
    const items = [
      { id: 1, title: 'First Item', description: 'Description for the first item', avatar: '#3b82f6' },
      { id: 2, title: 'Second Item', description: 'Description for the second item', avatar: '#22c55e' },
      { id: 3, title: 'Third Item', description: 'Description for the third item', avatar: '#f59e0b' },
    ];

    // Step 1: Create toggleLoading() that flips loading.value

    // Step 2: Create a simulate() function that sets loading to true,
    // then uses setTimeout(1500ms) to set it back to false

    // Step 3: Create a computed "skeletonCount" returning the number of
    // skeleton placeholder rows to show based on variant

    return { loading, variant, variants, items, toggleLoading, simulate, skeletonCount };
  }
}).mount('#app');`,

  'vue-progress-bar': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const progress = ref(0);
    const isRunning = ref(false);
    const variant = ref('default');
    const variants = ['default', 'striped', 'indeterminate'];
    let intervalId = null;

    // Step 1: Create start() that sets isRunning true and starts a setInterval
    // incrementing progress by a random amount (1-5) every 100ms, stopping at 100

    // Step 2: Create pause() that clears the interval and sets isRunning false

    // Step 3: Create reset() that calls pause, then sets progress to 0

    // Step 4: Create a computed "progressStyle" that returns CSS width
    // as a percentage string and background color based on progress level
    // (green > 66, yellow > 33, red otherwise)

    return { progress, isRunning, variant, variants, start, pause, reset, progressStyle };
  }
}).mount('#app');`,

  // ── data-display ─────────────────────────────────────────────────────

  'vue-badge': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const count = ref(5);
    const variant = ref('default');
    const variants = ['default', 'success', 'warning', 'error', 'info'];
    const showBadge = ref(true);

    // Step 1: Create increment() and decrement() functions that adjust
    // count.value, clamping to 0 minimum

    // Step 2: Create clear() that sets count to 0

    // Step 3: Create a computed "displayCount" that returns count if <= 99,
    // otherwise returns "99+"

    // Step 4: Create a computed "badgeColor" that maps variant to a hex color

    return { count, variant, variants, showBadge, increment, decrement, clear, displayCount, badgeColor };
  }
}).mount('#app');`,

  'vue-avatar': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const name = ref('Alice Chen');
    const size = ref('md');
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    const status = ref('online');
    const statuses = ['online', 'offline', 'away', 'busy'];

    // Step 1: Create a computed "initials" that splits name by space,
    // takes the first letter of the first two words, and uppercases them

    // Step 2: Create a computed "bgColor" that generates a deterministic
    // color from the name using char codes (sum of codes modulo a color palette)

    // Step 3: Create a computed "sizeClass" that maps size to pixel dimensions

    // Step 4: Create a computed "statusColor" mapping status to a color
    // (green for online, gray for offline, yellow for away, red for busy)

    return { name, size, sizes, status, statuses, initials, bgColor, sizeClass, statusColor };
  }
}).mount('#app');`,

  'vue-stat-card': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const stats = ref([
      { label: 'Revenue', value: 12450, prefix: '$', change: 12.5, icon: '\\u{1F4B0}' },
      { label: 'Users', value: 1284, prefix: '', change: -3.2, icon: '\\u{1F465}' },
      { label: 'Orders', value: 384, prefix: '', change: 8.1, icon: '\\u{1F4E6}' },
      { label: 'Conversion', value: 3.2, prefix: '', suffix: '%', change: 1.4, icon: '\\u{1F4C8}' },
    ]);

    // Step 1: Create a formatValue(stat) function that applies prefix/suffix
    // and uses toLocaleString for number formatting

    // Step 2: Create a computed "totalRevenue" that sums values with prefix '$'

    // Step 3: Create a changeColor(change) function returning green if positive,
    // red if negative, gray if zero

    return { stats, formatValue, totalRevenue, changeColor };
  }
}).mount('#app');`,

  'vue-timeline-feed': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const feed = ref([
      { id: 1, user: 'Alice', action: 'pushed to main', time: '2 min ago', type: 'commit' },
      { id: 2, user: 'Bob', action: 'opened PR #42', time: '15 min ago', type: 'pr' },
      { id: 3, user: 'Carol', action: 'commented on issue', time: '1 hour ago', type: 'comment' },
      { id: 4, user: 'Dave', action: 'deployed to production', time: '3 hours ago', type: 'deploy' },
    ]);
    const filter = ref('all');
    const types = ['all', 'commit', 'pr', 'comment', 'deploy'];

    // Step 1: Create a computed "filtered" that returns all items when
    // filter is 'all', otherwise filters by type

    // Step 2: Create a typeIcon(type) function that returns an icon string
    // based on the activity type

    // Step 3: Create a typeColor(type) function mapping each type to a color

    return { feed, filter, types, filtered, typeIcon, typeColor };
  }
}).mount('#app');`,

  'vue-activity-log': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const logs = ref([
      { id: 1, action: 'Login', user: 'admin', timestamp: Date.now() - 60000, level: 'info' },
      { id: 2, action: 'File Upload', user: 'alice', timestamp: Date.now() - 120000, level: 'success' },
      { id: 3, action: 'Failed Auth', user: 'unknown', timestamp: Date.now() - 300000, level: 'error' },
      { id: 4, action: 'Config Change', user: 'admin', timestamp: Date.now() - 600000, level: 'warning' },
    ]);
    const levelFilter = ref('all');
    const levels = ['all', 'info', 'success', 'warning', 'error'];

    // Step 1: Create a computed "filtered" that filters logs by levelFilter

    // Step 2: Create a formatTime(ts) function that returns a relative time
    // string like "2 minutes ago" from the timestamp

    // Step 3: Create a levelColor(level) function mapping level to CSS color

    // Step 4: Create a clearLogs() function that empties the logs array

    return { logs, levelFilter, levels, filtered, formatTime, levelColor, clearLogs };
  }
}).mount('#app');`,

  'vue-diff-viewer': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const original = ref('function hello() {\\n  console.log("hello");\\n  return true;\\n}');
    const modified = ref('function hello(name) {\\n  console.log("hello " + name);\\n  return true;\\n}');
    const viewMode = ref('split');
    const modes = ['split', 'unified'];

    // Step 1: Create a computed "originalLines" and "modifiedLines" that
    // split each text by newline

    // Step 2: Create a computed "diff" that compares line by line and marks
    // each line as 'added', 'removed', or 'unchanged'

    // Step 3: Create a lineColor(status) function returning green for added,
    // red for removed, transparent for unchanged

    return { original, modified, viewMode, modes, originalLines, modifiedLines, diff, lineColor };
  }
}).mount('#app');`,

  'vue-code-block': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const code = ref('const greeting = "Hello, World!";\\nconsole.log(greeting);\\n\\nfunction add(a, b) {\\n  return a + b;\\n}');
    const language = ref('javascript');
    const showLineNumbers = ref(true);
    const copied = ref(false);

    // Step 1: Create a computed "lines" splitting code by newlines

    // Step 2: Create a copyToClipboard() function that uses
    // navigator.clipboard.writeText, sets copied to true, then resets
    // after 2 seconds with setTimeout

    // Step 3: Create a computed "highlighted" that applies basic keyword
    // highlighting (const, let, var, function, return) by wrapping in spans

    return { code, language, showLineNumbers, copied, lines, copyToClipboard, highlighted };
  }
}).mount('#app');`,

  'vue-markdown-preview': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const markdown = ref('# Hello World\\n\\nThis is **bold** and *italic* text.\\n\\n- Item one\\n- Item two\\n\\n\\u0060\\u0060\\u0060\\ncode block\\n\\u0060\\u0060\\u0060');
    const showPreview = ref(true);

    // Step 1: Create a computed "html" that converts markdown to HTML:
    // - # headings to <h1>, ## to <h2>, etc.
    // - **bold** to <strong>, *italic* to <em>
    // - - items to <li> within <ul>
    // - code blocks to <pre><code>

    // Step 2: Create a toggle() function that flips showPreview

    // Step 3: Create a computed "wordCount" counting words in the raw markdown

    return { markdown, showPreview, html, toggle, wordCount };
  }
}).mount('#app');`,

  'vue-json-viewer': `const { createApp, ref, reactive } = Vue;

createApp({
  setup() {
    const jsonData = reactive({
      name: 'Vue App',
      version: '3.0.0',
      config: { theme: 'dark', lang: 'en' },
      features: ['reactivity', 'composition-api', 'teleport'],
    });
    const expandedPaths = ref(new Set(['root']));
    const searchQuery = ref('');

    // Step 1: Create a toggle(path) function that adds or removes the path
    // from expandedPaths (toggle expansion of a JSON node)

    // Step 2: Create an isExpanded(path) function checking expandedPaths.has(path)

    // Step 3: Create a getType(value) function returning 'object', 'array',
    // 'string', 'number', 'boolean', or 'null'

    // Step 4: Create a computed "flatEntries" that recursively flattens the
    // JSON into an array of { path, key, value, depth, type } for rendering

    return { jsonData, expandedPaths, searchQuery, toggle, isExpanded, getType, flatEntries };
  }
}).mount('#app');`,

  'vue-comparison-table': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const features = ['Reactivity', 'TypeScript', 'SSR', 'File Size', 'Learning Curve', 'Community'];
    const items = ref([
      { name: 'Vue', values: { Reactivity: 'Proxy', TypeScript: 'Yes', SSR: 'Nuxt', 'File Size': '33kb', 'Learning Curve': 'Easy', Community: 'Large' } },
      { name: 'React', values: { Reactivity: 'Virtual DOM', TypeScript: 'Yes', SSR: 'Next.js', 'File Size': '42kb', 'Learning Curve': 'Medium', Community: 'Largest' } },
      { name: 'Svelte', values: { Reactivity: 'Compiler', TypeScript: 'Yes', SSR: 'SvelteKit', 'File Size': '1.6kb', 'Learning Curve': 'Easy', Community: 'Growing' } },
    ]);
    const highlighted = ref([]);

    // Step 1: Create toggleHighlight(name) that adds/removes name from highlighted

    // Step 2: Create isHighlighted(name) returning highlighted.includes(name)

    // Step 3: Create a computed "comparisonCount" returning items.value.length

    return { features, items, highlighted, toggleHighlight, isHighlighted, comparisonCount };
  }
}).mount('#app');`,

  'vue-pricing-table': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const annual = ref(false);
    const plans = ref([
      { name: 'Starter', monthlyPrice: 9, features: ['5 Projects', '10GB Storage', 'Email Support'], highlighted: false },
      { name: 'Pro', monthlyPrice: 29, features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'API Access'], highlighted: true },
      { name: 'Enterprise', monthlyPrice: 99, features: ['Everything in Pro', 'Custom Domain', 'SLA', 'Dedicated Manager'], highlighted: false },
    ]);

    // Step 1: Create a getPrice(plan) function that returns the monthly price,
    // or the annual price (monthly * 12 * 0.8) divided by 12 if annual is true

    // Step 2: Create a computed "savings" that calculates the percentage
    // saved with annual billing (20%)

    // Step 3: Create a formatPrice(price) function that returns a formatted
    // currency string with 2 decimal places

    return { annual, plans, getPrice, savings, formatPrice };
  }
}).mount('#app');`,

  'vue-feature-list': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const features = ref([
      { title: 'Composition API', description: 'Organize logic by feature', included: true, category: 'Core' },
      { title: 'Reactivity System', description: 'Proxy-based reactive state', included: true, category: 'Core' },
      { title: 'TypeScript Support', description: 'First-class TS integration', included: true, category: 'DX' },
      { title: 'DevTools', description: 'Browser extension for debugging', included: false, category: 'DX' },
      { title: 'SSR Support', description: 'Server-side rendering via Nuxt', included: false, category: 'Advanced' },
    ]);
    const categoryFilter = ref('All');

    // Step 1: Create a computed "categories" that extracts unique categories
    // from features and prepends 'All'

    // Step 2: Create a computed "filtered" that returns all features when
    // categoryFilter is 'All', otherwise filters by category

    // Step 3: Create a toggleIncluded(index) that flips the included property

    return { features, categoryFilter, categories, filtered, toggleIncluded };
  }
}).mount('#app');`,

  'vue-testimonials': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const testimonials = [
      { id: 1, name: 'Alice', role: 'Developer', text: 'Vue 3 transformed how we build UIs.', rating: 5, avatar: '#3b82f6' },
      { id: 2, name: 'Bob', role: 'Designer', text: 'The template syntax is incredibly intuitive.', rating: 4, avatar: '#22c55e' },
      { id: 3, name: 'Carol', role: 'CTO', text: 'Our team productivity doubled after switching.', rating: 5, avatar: '#8b5cf6' },
    ];
    const currentIndex = ref(0);
    const autoplay = ref(true);

    // Step 1: Create next() and prev() for cycling through testimonials
    // with wrap-around

    // Step 2: Create a computed "current" returning testimonials[currentIndex]

    // Step 3: Create a starsArray(rating) function that returns an array of
    // rating booleans (true for filled, false for empty up to 5)

    return { testimonials, currentIndex, autoplay, next, prev, current, starsArray };
  }
}).mount('#app');`,

  'vue-team-grid': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const members = ref([
      { id: 1, name: 'Alice Chen', role: 'Frontend Lead', department: 'Engineering', color: '#3b82f6' },
      { id: 2, name: 'Bob Smith', role: 'Designer', department: 'Design', color: '#8b5cf6' },
      { id: 3, name: 'Carol Wu', role: 'Backend Dev', department: 'Engineering', color: '#22c55e' },
      { id: 4, name: 'Dave Kim', role: 'PM', department: 'Product', color: '#f59e0b' },
      { id: 5, name: 'Eve Brown', role: 'QA Lead', department: 'Engineering', color: '#ef4444' },
      { id: 6, name: 'Frank Lee', role: 'DevOps', department: 'Engineering', color: '#06b6d4' },
    ]);
    const search = ref('');
    const department = ref('All');

    // Step 1: Create a computed "departments" that extracts unique departments
    // and prepends 'All'

    // Step 2: Create a computed "filtered" that filters members by search
    // (name or role) and department

    // Step 3: Create a computed "initials" helper that takes a name and returns
    // first letters of first two words, uppercased

    return { members, search, department, departments, filtered };
  }
}).mount('#app');`,

  'vue-changelog': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const entries = ref([
      { version: '3.0.0', date: '2024-04-01', type: 'major', changes: ['Composition API stable', 'Proxy reactivity', 'Fragments support'] },
      { version: '2.9.0', date: '2024-03-15', type: 'minor', changes: ['Performance improvements', 'New dev warnings'] },
      { version: '2.8.1', date: '2024-02-28', type: 'patch', changes: ['Fix SSR hydration bug', 'TypeScript definition updates'] },
    ]);
    const typeFilter = ref('all');
    const types = ['all', 'major', 'minor', 'patch'];

    // Step 1: Create a computed "filtered" that filters entries by typeFilter

    // Step 2: Create a typeBadgeColor(type) function returning red for major,
    // yellow for minor, green for patch

    // Step 3: Create a computed "latestVersion" returning the first entry's version

    return { entries, typeFilter, types, filtered, typeBadgeColor, latestVersion };
  }
}).mount('#app');`,

  'vue-status-page': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const services = ref([
      { name: 'API Server', status: 'operational', uptime: 99.99 },
      { name: 'Database', status: 'operational', uptime: 99.95 },
      { name: 'CDN', status: 'degraded', uptime: 98.5 },
      { name: 'Auth Service', status: 'operational', uptime: 99.98 },
      { name: 'Queue Worker', status: 'outage', uptime: 95.0 },
    ]);

    // Step 1: Create a computed "overallStatus" that returns 'outage' if any
    // service is in outage, 'degraded' if any is degraded, else 'operational'

    // Step 2: Create a statusColor(status) function mapping operational to green,
    // degraded to yellow, outage to red

    // Step 3: Create a computed "averageUptime" that calculates the mean
    // uptime across all services, formatted to 2 decimal places

    // Step 4: Create a toggleStatus(index) that cycles through statuses
    // for demo purposes

    return { services, overallStatus, statusColor, averageUptime, toggleStatus };
  }
}).mount('#app');`,

  'vue-metric-dashboard': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const metrics = ref([
      { label: 'CPU Usage', value: 45, unit: '%', threshold: 80, history: [30, 35, 42, 45] },
      { label: 'Memory', value: 62, unit: '%', threshold: 90, history: [55, 58, 60, 62] },
      { label: 'Disk I/O', value: 120, unit: 'MB/s', threshold: 500, history: [80, 100, 110, 120] },
      { label: 'Network', value: 340, unit: 'Mbps', threshold: 1000, history: [200, 280, 310, 340] },
    ]);
    const refreshInterval = ref(5);

    // Step 1: Create a computed "statusForMetric" that returns 'critical' if
    // value > threshold, 'warning' if > threshold * 0.75, else 'normal'

    // Step 2: Create a randomize() function that updates each metric's value
    // with a random variation and pushes to history (keeping last 10 entries)

    // Step 3: Create a computed "worstMetric" returning the metric closest
    // to or exceeding its threshold

    // Step 4: Create a sparkline(history) function that returns an SVG path
    // string for a mini chart from the history array

    return { metrics, refreshInterval, statusForMetric, randomize, worstMetric, sparkline };
  }
}).mount('#app');`,

  // ── navigation ───────────────────────────────────────────────────────

  'vue-command-menu': `const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const isOpen = ref(false);
    const query = ref('');
    const activeGroup = ref('all');
    const groups = ['all', 'navigation', 'actions', 'settings'];
    const menuItems = [
      { label: 'Go to Dashboard', group: 'navigation', shortcut: 'G D' },
      { label: 'Go to Settings', group: 'navigation', shortcut: 'G S' },
      { label: 'Create New Item', group: 'actions', shortcut: 'C N' },
      { label: 'Toggle Dark Mode', group: 'settings', shortcut: 'T D' },
      { label: 'Open Search', group: 'actions', shortcut: '/' },
    ];
    const lastAction = ref('');

    // Step 1: Create a computed "filtered" that filters by activeGroup (or all)
    // and then by query matching label (case-insensitive)

    // Step 2: Create execute(item) that sets lastAction, clears query, closes menu

    // Step 3: Create keyboard handler for Escape (close), ArrowUp/Down
    // (navigate), Enter (execute selected)

    // Step 4: Use onMounted for Ctrl+K global shortcut to toggle

    return { isOpen, query, activeGroup, groups, menuItems, lastAction, filtered, execute };
  }
}).mount('#app');`,

  'vue-mini-map': `const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const sections = ref([
      { id: 'hero', label: 'Hero', color: '#3b82f6' },
      { id: 'features', label: 'Features', color: '#22c55e' },
      { id: 'pricing', label: 'Pricing', color: '#f59e0b' },
      { id: 'faq', label: 'FAQ', color: '#8b5cf6' },
      { id: 'footer', label: 'Footer', color: '#ef4444' },
    ]);
    const activeSection = ref('hero');
    const scrollPercent = ref(0);

    // Step 1: Create an onScroll() handler that calculates scrollPercent
    // from window.scrollY / (document.body.scrollHeight - window.innerHeight)

    // Step 2: Create a computed "activeFromScroll" that determines which
    // section is active based on scrollPercent thresholds

    // Step 3: Create scrollTo(sectionId) that programmatically scrolls
    // to the target section using element.scrollIntoView({ behavior: 'smooth' })

    // Step 4: Use onMounted/onUnmounted for scroll listener

    return { sections, activeSection, scrollPercent, scrollTo };
  }
}).mount('#app');`,

  'vue-scroll-to-top': `const { createApp, ref, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const showButton = ref(false);
    const scrollProgress = ref(0);
    const threshold = 300;

    // Step 1: Create an onScroll() handler that sets showButton to true
    // when window.scrollY > threshold, and calculates scrollProgress
    // as a percentage of total scrollable height

    // Step 2: Create a scrollToTop() function using window.scrollTo
    // with behavior: 'smooth'

    // Step 3: Use onMounted/onUnmounted to add/remove scroll listener

    return { showButton, scrollProgress, scrollToTop };
  }
}).mount('#app');`,

  'vue-anchor-links': `const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const sections = [
      { id: 'introduction', label: 'Introduction' },
      { id: 'getting-started', label: 'Getting Started' },
      { id: 'api-reference', label: 'API Reference' },
      { id: 'examples', label: 'Examples' },
      { id: 'faq', label: 'FAQ' },
    ];
    const activeId = ref('introduction');

    // Step 1: Create scrollTo(id) that finds the element by id and calls
    // scrollIntoView with smooth behavior, then sets activeId

    // Step 2: Create an onScroll() handler that determines which section
    // is currently in view by checking each section element's offsetTop
    // against window.scrollY

    // Step 3: Use onMounted/onUnmounted for scroll listener

    return { sections, activeId, scrollTo };
  }
}).mount('#app');`,

  'vue-table-of-contents': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const headings = ref([
      { id: 'h1', text: 'Introduction', level: 1, children: [
        { id: 'h1-1', text: 'Overview', level: 2 },
        { id: 'h1-2', text: 'Prerequisites', level: 2 },
      ]},
      { id: 'h2', text: 'Installation', level: 1, children: [
        { id: 'h2-1', text: 'NPM', level: 2 },
        { id: 'h2-2', text: 'CDN', level: 2 },
      ]},
      { id: 'h3', text: 'Usage', level: 1 },
    ]);
    const activeId = ref('h1');
    const collapsed = ref(new Set());

    // Step 1: Create toggleCollapse(id) that adds/removes id from collapsed set

    // Step 2: Create isCollapsed(id) checking collapsed.has(id)

    // Step 3: Create scrollTo(id) that scrolls to the heading and sets activeId

    // Step 4: Create a computed "flatHeadings" that flattens the tree into
    // an ordered list with indentation level for rendering

    return { headings, activeId, collapsed, toggleCollapse, isCollapsed, scrollTo, flatHeadings };
  }
}).mount('#app');`,

  'vue-step-indicator': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const steps = ref([
      { label: 'Cart', description: 'Review items' },
      { label: 'Shipping', description: 'Enter address' },
      { label: 'Payment', description: 'Payment method' },
      { label: 'Confirm', description: 'Place order' },
    ]);
    const currentStep = ref(0);

    // Step 1: Create next() and prev() that increment/decrement currentStep
    // within valid bounds (0 to steps.length - 1)

    // Step 2: Create a stepStatus(index) function returning 'completed' if
    // index < currentStep, 'active' if index === currentStep, else 'pending'

    // Step 3: Create a computed "progress" returning percentage completion:
    // (currentStep / (steps.length - 1)) * 100

    return { steps, currentStep, next, prev, stepStatus, progress };
  }
}).mount('#app');`,

  'vue-app-shell': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const sidebarOpen = ref(true);
    const currentPage = ref('dashboard');
    const pages = [
      { id: 'dashboard', label: 'Dashboard', icon: '\\u{1F4CA}' },
      { id: 'users', label: 'Users', icon: '\\u{1F465}' },
      { id: 'settings', label: 'Settings', icon: '\\u{2699}' },
      { id: 'help', label: 'Help', icon: '\\u{2753}' },
    ];

    // Step 1: Create toggleSidebar() that flips sidebarOpen

    // Step 2: Create navigate(pageId) that sets currentPage

    // Step 3: Create a computed "currentPageData" that finds the page
    // object matching currentPage.value

    // Step 4: Create a computed "sidebarWidth" returning '240px' when open,
    // '60px' when collapsed

    return { sidebarOpen, currentPage, pages, toggleSidebar, navigate, currentPageData, sidebarWidth };
  }
}).mount('#app');`,

  'vue-header-scroll-hide': `const { createApp, ref, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const headerVisible = ref(true);
    const lastScrollY = ref(0);
    const scrollThreshold = 50;

    // Step 1: Create an onScroll() handler that compares current scrollY
    // with lastScrollY: hide header if scrolling down past threshold,
    // show if scrolling up

    // Step 2: Update lastScrollY after each scroll comparison

    // Step 3: Use onMounted/onUnmounted to attach/detach scroll listener

    return { headerVisible, onScroll };
  }
}).mount('#app');`,

  'vue-sticky-header': `const { createApp, ref, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const isSticky = ref(false);
    const headerRef = ref(null);
    const stickyOffset = ref(0);

    // Step 1: Use onMounted to read the header element's offsetTop and
    // store it in stickyOffset

    // Step 2: Create an onScroll() handler that sets isSticky to true
    // when window.scrollY >= stickyOffset

    // Step 3: Use onMounted/onUnmounted for scroll listener management

    return { isSticky, headerRef, onScroll };
  }
}).mount('#app');`,

  'vue-page-transitions': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const pages = ['Home', 'About', 'Contact', 'Blog'];
    const currentPage = ref('Home');
    const transition = ref('fade');
    const transitions = ['fade', 'slide-left', 'slide-right', 'scale', 'flip'];

    // Step 1: Create navigate(page) that sets currentPage to the new page

    // Step 2: Create a computed "transitionName" that returns the CSS
    // transition class name based on transition.value

    // Step 3: Create nextTransition() that cycles through the transitions array

    return { pages, currentPage, transition, transitions, navigate, transitionName, nextTransition };
  }
}).mount('#app');`,

  'vue-route-guard': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const isAuthenticated = ref(false);
    const currentRoute = ref('home');
    const routes = [
      { path: 'home', label: 'Home', requiresAuth: false },
      { path: 'dashboard', label: 'Dashboard', requiresAuth: true },
      { path: 'profile', label: 'Profile', requiresAuth: true },
      { path: 'login', label: 'Login', requiresAuth: false },
    ];
    const guardMessage = ref('');

    // Step 1: Create navigate(path) that checks if the route requiresAuth
    // and the user is not authenticated; if so, set guardMessage and redirect
    // to login; otherwise navigate normally

    // Step 2: Create login() and logout() toggling isAuthenticated

    // Step 3: Create a computed "availableRoutes" that filters routes the
    // user can access based on auth state

    return { isAuthenticated, currentRoute, routes, guardMessage, navigate, login, logout, availableRoutes };
  }
}).mount('#app');`,

  'vue-nested-routes': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const routes = [
      { path: 'users', label: 'Users', children: [
        { path: 'users/list', label: 'User List' },
        { path: 'users/create', label: 'Create User' },
      ]},
      { path: 'settings', label: 'Settings', children: [
        { path: 'settings/general', label: 'General' },
        { path: 'settings/security', label: 'Security' },
      ]},
    ];
    const currentPath = ref('users/list');

    // Step 1: Create navigate(path) that sets currentPath

    // Step 2: Create a computed "activeParent" that finds the parent route
    // whose path matches the first segment of currentPath

    // Step 3: Create a computed "breadcrumb" that builds an array of labels
    // from parent to current child route

    return { routes, currentPath, navigate, activeParent, breadcrumb };
  }
}).mount('#app');`,

  'vue-tab-router': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const tabs = ref([
      { id: 'overview', label: 'Overview', closable: false },
      { id: 'details', label: 'Details', closable: true },
      { id: 'history', label: 'History', closable: true },
    ]);
    const activeTab = ref('overview');
    let nextId = 4;

    // Step 1: Create activate(id) that sets activeTab to id

    // Step 2: Create closeTab(id) that removes the tab and if it was active,
    // activates the previous tab or the first available one

    // Step 3: Create addTab(label) that pushes a new tab with a unique id
    // and activates it

    // Step 4: Create a computed "activeTabData" returning the tab object
    // matching activeTab

    return { tabs, activeTab, activate, closeTab, addTab, activeTabData };
  }
}).mount('#app');`,

  'vue-deep-linking': `const { createApp, ref, watch, onMounted } = Vue;

createApp({
  setup() {
    const tab = ref('home');
    const search = ref('');
    const page = ref(1);

    // Step 1: Create a readFromUrl() function that parses window.location.hash
    // into key-value pairs and updates tab, search, and page refs

    // Step 2: Create a writeToUrl() function that serializes the current state
    // into a hash string like #tab=home&search=vue&page=1

    // Step 3: Add watchers on tab, search, and page that call writeToUrl

    // Step 4: Use onMounted to call readFromUrl for initial state restoration

    return { tab, search, page };
  }
}).mount('#app');`,

  'vue-url-state': `const { createApp, ref, watch, onMounted } = Vue;

createApp({
  setup() {
    const filters = ref({ category: '', sort: 'name', order: 'asc' });
    const items = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];

    // Step 1: Create syncToUrl() that writes filters to URL search params
    // using URLSearchParams and history.replaceState

    // Step 2: Create syncFromUrl() that reads URL search params and
    // updates filters ref

    // Step 3: Add a deep watch on filters that calls syncToUrl

    // Step 4: Use onMounted to call syncFromUrl for initial hydration

    // Step 5: Create a computed "sorted" that sorts/filters items based
    // on current filters

    return { filters, items, sorted };
  }
}).mount('#app');`,

  'vue-back-to-top': `const { createApp, ref, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const visible = ref(false);
    const progress = ref(0);

    // Step 1: Create an onScroll() handler that sets visible when scrollY > 200
    // and calculates progress as scroll percentage

    // Step 2: Create scrollToTop() using window.scrollTo with smooth behavior

    // Step 3: Use onMounted/onUnmounted for scroll listener

    return { visible, progress, scrollToTop };
  }
}).mount('#app');`,

  'vue-scroll-spy': `const { createApp, ref, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const sections = ['introduction', 'features', 'installation', 'usage', 'api'];
    const activeSection = ref('introduction');
    const sectionOffsets = ref({});

    // Step 1: Use onMounted to calculate and store each section's offsetTop
    // in sectionOffsets

    // Step 2: Create an onScroll() handler that iterates sectionOffsets to
    // find which section the user is currently viewing (scrollY + offset)

    // Step 3: Create scrollTo(section) for clicking nav links to scroll
    // to a section smoothly

    // Step 4: Use onMounted/onUnmounted for scroll listener management

    return { sections, activeSection, scrollTo };
  }
}).mount('#app');`,

  // ── advanced ─────────────────────────────────────────────────────────

  'vue-theme-switcher': `const { createApp, ref, watch } = Vue;

createApp({
  setup() {
    const themes = ['light', 'dark', 'auto'];
    const saved = localStorage.getItem('vue-theme') || 'light';
    const theme = ref(saved);

    // Step 1: Create a computed "resolvedTheme" that returns 'dark' or 'light'.
    // When theme is 'auto', check window.matchMedia('(prefers-color-scheme: dark)')

    // Step 2: Create setTheme(t) that updates theme and saves to localStorage

    // Step 3: Add a watch on resolvedTheme that applies 'data-theme' attribute
    // to document.documentElement

    // Step 4: Create a computed "icon" returning a sun/moon/auto icon
    // based on the current theme

    return { themes, theme, resolvedTheme, setTheme, icon };
  }
}).mount('#app');`,

  'vue-i18n-locale': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const locale = ref('en');
    const locales = ['en', 'es', 'fr', 'de', 'ja'];
    const messages = {
      en: { greeting: 'Hello', farewell: 'Goodbye', welcome: 'Welcome to our app' },
      es: { greeting: 'Hola', farewell: 'Adios', welcome: 'Bienvenido a nuestra app' },
      fr: { greeting: 'Bonjour', farewell: 'Au revoir', welcome: 'Bienvenue dans notre app' },
      de: { greeting: 'Hallo', farewell: 'Tschuss', welcome: 'Willkommen in unserer App' },
      ja: { greeting: 'Konnichiwa', farewell: 'Sayonara', welcome: 'Watashitachi no apuri e yokoso' },
    };

    // Step 1: Create a t(key) function that returns messages[locale.value][key]
    // or the key itself as fallback

    // Step 2: Create setLocale(loc) that updates locale.value

    // Step 3: Create a computed "direction" returning 'rtl' for Arabic/Hebrew
    // locales, 'ltr' otherwise

    return { locale, locales, messages, t, setLocale, direction };
  }
}).mount('#app');`,

  'vue-a11y-focus-trap': `const { createApp, ref, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const isOpen = ref(false);
    const trapRef = ref(null);

    // Step 1: Create open() that sets isOpen true and on nextTick focuses
    // the first focusable element inside trapRef

    // Step 2: Create close() that sets isOpen false and restores focus
    // to the previously focused element

    // Step 3: Create a handleKeydown(e) that traps Tab focus: get all
    // focusable elements inside trapRef, if Shift+Tab on first element
    // go to last, if Tab on last go to first

    // Step 4: Use onMounted/onUnmounted to add/remove keydown listener
    // when trap is active

    return { isOpen, trapRef, open, close, handleKeydown };
  }
}).mount('#app');`,

  'vue-a11y-live-region': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const announcements = ref([]);
    const politeness = ref('polite');
    const options = ['polite', 'assertive', 'off'];
    let nextId = 0;

    // Step 1: Create announce(message) that pushes a new announcement to the
    // array with id, message, and timestamp, using aria-live attribute
    // based on politeness setting

    // Step 2: Create clear() that empties the announcements array

    // Step 3: Create a computed "lastAnnouncement" returning the most
    // recent announcement text or empty string

    return { announcements, politeness, options, announce, clear, lastAnnouncement };
  }
}).mount('#app');`,

  'vue-offline-indicator': `const { createApp, ref, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const isOnline = ref(navigator.onLine);
    const lastOnline = ref(Date.now());
    const showBanner = ref(false);

    // Step 1: Create onOnline() handler that sets isOnline true and
    // shows a brief "Back online" banner

    // Step 2: Create onOffline() handler that sets isOnline false,
    // records lastOnline timestamp, and shows the offline banner

    // Step 3: Create a computed "offlineDuration" that returns a human-readable
    // string of how long the user has been offline

    // Step 4: Use onMounted/onUnmounted to add/remove online/offline listeners

    return { isOnline, lastOnline, showBanner, offlineDuration };
  }
}).mount('#app');`,

  'vue-websocket-chat': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const messages = ref([
      { id: 1, user: 'System', text: 'Welcome to the chat!', time: new Date().toLocaleTimeString() },
    ]);
    const input = ref('');
    const username = ref('User');
    const isConnected = ref(true);
    let nextId = 2;

    // Step 1: Create sendMessage() that pushes a new message with username,
    // input text, and current time, then clears input

    // Step 2: Create a simulateReceive() that adds a mock incoming message
    // after a short delay to simulate WebSocket behavior

    // Step 3: Create toggleConnection() that flips isConnected and adds
    // a system message about connect/disconnect

    // Step 4: Create a computed "messageCount" returning messages.value.length

    return { messages, input, username, isConnected, sendMessage, simulateReceive, toggleConnection, messageCount };
  }
}).mount('#app');`,

  'vue-optimistic-update': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const items = ref([
      { id: 1, text: 'First item', liked: false },
      { id: 2, text: 'Second item', liked: false },
      { id: 3, text: 'Third item', liked: false },
    ]);
    const pendingOps = ref(new Set());
    const errors = ref([]);

    // Step 1: Create toggleLike(id) that immediately flips the liked state
    // (optimistic), adds id to pendingOps, then simulates an API call with
    // setTimeout that randomly succeeds or fails

    // Step 2: On success, remove id from pendingOps

    // Step 3: On failure, revert the liked state, remove from pendingOps,
    // and push an error message to errors

    // Step 4: Create a clearErrors() function that empties the errors array

    return { items, pendingOps, errors, toggleLike, clearErrors };
  }
}).mount('#app');`,

  'vue-undo-manager': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const text = ref('Hello World');
    const undoStack = ref([]);
    const redoStack = ref([]);
    const maxHistory = 50;

    // Step 1: Create pushState() that pushes a snapshot of text.value
    // onto undoStack and clears redoStack (new action invalidates redo)

    // Step 2: Create undo() that pops from undoStack, pushes current state
    // to redoStack, and restores the popped value to text

    // Step 3: Create redo() that pops from redoStack, pushes current state
    // to undoStack, and restores the popped value to text

    // Step 4: Create computed "canUndo" (undoStack.length > 0) and
    // "canRedo" (redoStack.length > 0)

    return { text, undoStack, redoStack, pushState, undo, redo, canUndo, canRedo };
  }
}).mount('#app');`,

  'vue-clipboard-manager': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const history = ref([]);
    const input = ref('');
    const copiedId = ref(null);
    let nextId = 0;

    // Step 1: Create copyText() that uses navigator.clipboard.writeText
    // with the input value, pushes to history with id and timestamp, clears input

    // Step 2: Create copyFromHistory(id) that finds the item in history,
    // copies its text to clipboard, and sets copiedId briefly

    // Step 3: Create removeItem(id) that filters history to remove the item

    // Step 4: Create clearHistory() that empties the history array

    return { history, input, copiedId, copyText, copyFromHistory, removeItem, clearHistory };
  }
}).mount('#app');`,

  'vue-hotkey-manager': `const { createApp, ref, reactive, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const hotkeys = reactive([
      { combo: 'ctrl+b', label: 'Bold', triggered: false },
      { combo: 'ctrl+i', label: 'Italic', triggered: false },
      { combo: 'ctrl+u', label: 'Underline', triggered: false },
      { combo: 'ctrl+shift+s', label: 'Save As', triggered: false },
    ]);
    const lastTriggered = ref('');

    // Step 1: Create a parseCombo(e) function that builds a combo string
    // from event modifiers and key (e.g., 'ctrl+shift+s')

    // Step 2: Create a handleKeydown(e) handler that parses the combo,
    // finds a matching hotkey, prevents default, sets triggered, and
    // updates lastTriggered

    // Step 3: Reset triggered after a brief delay (500ms)

    // Step 4: Use onMounted/onUnmounted for keydown listener

    return { hotkeys, lastTriggered };
  }
}).mount('#app');`,

  'vue-idle-detector': `const { createApp, ref, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const isIdle = ref(false);
    const idleTimeout = ref(5000);
    const lastActivity = ref(Date.now());
    let timerId = null;

    // Step 1: Create resetTimer() that clears any existing timer, sets
    // isIdle to false, updates lastActivity to Date.now(), and starts
    // a new setTimeout that sets isIdle to true after idleTimeout ms

    // Step 2: Create activity event handlers for mousemove, keydown, click,
    // and scroll that call resetTimer

    // Step 3: Use onMounted to attach all activity listeners and start
    // the initial timer

    // Step 4: Use onUnmounted to clean up all listeners and the timer

    return { isIdle, idleTimeout, lastActivity, resetTimer };
  }
}).mount('#app');`,

  'vue-media-query-hook': `const { createApp, ref, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const breakpoints = {
      mobile: '(max-width: 640px)',
      tablet: '(min-width: 641px) and (max-width: 1024px)',
      desktop: '(min-width: 1025px)',
    };
    const matches = ref({ mobile: false, tablet: false, desktop: false });
    const listeners = {};

    // Step 1: Use onMounted to create MediaQueryList for each breakpoint,
    // set initial matches, and add change listeners

    // Step 2: Create handler functions that update matches.value when
    // the media query match state changes

    // Step 3: Use onUnmounted to remove all media query listeners

    // Step 4: Create a computed "currentBreakpoint" returning the first
    // matching breakpoint name

    return { breakpoints, matches, currentBreakpoint };
  }
}).mount('#app');`,

  'vue-portal-demo': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const showPortal = ref(false);
    const portalTarget = ref('body');
    const targets = ['body', '#modal-root', '#tooltip-root'];
    const message = ref('I am rendered via Teleport!');

    // Step 1: Create toggle() that flips showPortal

    // Step 2: Create setTarget(target) that updates portalTarget

    // Step 3: Create a computed "teleportProps" that returns the
    // teleport to attribute value based on portalTarget

    return { showPortal, portalTarget, targets, message, toggle, setTarget, teleportProps };
  }
}).mount('#app');`,

  'vue-error-boundary': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const hasError = ref(false);
    const errorMessage = ref('');
    const errorStack = ref('');
    const retryCount = ref(0);

    // Step 1: Create onError(err) handler that sets hasError to true,
    // captures error message and stack

    // Step 2: Create retry() that resets hasError, clears error details,
    // and increments retryCount

    // Step 3: Create a simulateError() function that throws a test error
    // to demonstrate the boundary catching it

    // Step 4: Create a computed "canRetry" returning true if retryCount < 3

    return { hasError, errorMessage, errorStack, retryCount, onError, retry, simulateError, canRetry };
  }
}).mount('#app');`,

  'vue-retry-mechanism': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const status = ref('idle');
    const attempts = ref(0);
    const maxRetries = 3;
    const result = ref(null);
    const error = ref('');
    const retryDelay = ref(1000);

    // Step 1: Create fetchData() that sets status to 'loading', simulates
    // an API call with setTimeout that randomly succeeds or fails

    // Step 2: On failure, increment attempts. If attempts < maxRetries,
    // set status to 'retrying' and schedule another fetchData call after
    // retryDelay * attempts (exponential backoff)

    // Step 3: On success, set status to 'success' and store the result

    // Step 4: Create reset() that clears status, attempts, result, and error

    return { status, attempts, maxRetries, result, error, retryDelay, fetchData, reset };
  }
}).mount('#app');`,

  'vue-virtual-list-advanced': `const { createApp, ref, computed, onMounted } = Vue;

createApp({
  setup() {
    const itemHeight = 50;
    const containerRef = ref(null);
    const scrollTop = ref(0);
    const viewHeight = ref(400);
    const overscan = 5;

    const items = Array.from({ length: 50000 }, (_, i) => ({
      id: i, text: 'Row ' + i, category: ['A','B','C'][i % 3], value: Math.floor(Math.random() * 100)
    }));
    const filterCategory = ref('');
    const sortKey = ref('id');

    // Step 1: Create a computed "processed" that filters by category (if set)
    // and sorts by sortKey

    // Step 2: Create a computed "totalHeight" from processed.length * itemHeight

    // Step 3: Create a computed "visibleItems" using scrollTop, viewHeight,
    // and overscan to calculate start/end indices, returning sliced items
    // with a top property for absolute positioning

    // Step 4: Create onScroll(e) updating scrollTop from e.target.scrollTop

    // Step 5: Create a computed "stats" returning total count, filtered count,
    // and visible range

    return { containerRef, items, filterCategory, sortKey, totalHeight, visibleItems, onScroll, stats };
  }
}).mount('#app');`,

  // ── ui-components ────────────────────────────────────────────────────

  'vue-spinner': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const loading = ref(true);
    const size = ref('md');
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    const variant = ref('border');
    const variants = ['border', 'dots', 'pulse', 'ring'];

    // Step 1: Create toggle() that flips loading.value

    // Step 2: Create a computed "spinnerSize" mapping size to pixel dimension
    // (xs=16, sm=24, md=32, lg=48, xl=64)

    // Step 3: Create a computed "spinnerStyle" returning CSS for the spinner
    // based on variant and size

    return { loading, size, sizes, variant, variants, toggle, spinnerSize, spinnerStyle };
  }
}).mount('#app');`,

  'vue-chip': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const chips = ref([
      { id: 1, label: 'Vue', color: '#22c55e', selected: false },
      { id: 2, label: 'React', color: '#3b82f6', selected: false },
      { id: 3, label: 'Angular', color: '#ef4444', selected: false },
      { id: 4, label: 'Svelte', color: '#f59e0b', selected: false },
      { id: 5, label: 'Solid', color: '#8b5cf6', selected: false },
    ]);
    const input = ref('');

    // Step 1: Create toggleChip(id) that flips the selected property
    // of the chip with matching id

    // Step 2: Create removeChip(id) that filters the chip out of the array

    // Step 3: Create addChip() that creates a new chip from input with
    // a random color and pushes it to the array

    // Step 4: Create a computed "selectedChips" returning only chips
    // where selected is true

    return { chips, input, toggleChip, removeChip, addChip, selectedChips };
  }
}).mount('#app');`,

  'vue-divider': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const orientation = ref('horizontal');
    const orientations = ['horizontal', 'vertical'];
    const label = ref('OR');
    const variant = ref('solid');
    const variants = ['solid', 'dashed', 'dotted'];

    // Step 1: Create a computed "dividerStyle" that returns CSS border style
    // based on orientation and variant

    // Step 2: Create a computed "hasLabel" returning label.value.trim().length > 0

    // Step 3: Create cycle() functions for orientation and variant that cycle
    // through the available options

    return { orientation, orientations, label, variant, variants, dividerStyle, hasLabel };
  }
}).mount('#app');`,

  'vue-alert-banner': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const alerts = ref([
      { id: 1, type: 'info', message: 'A new version is available.', dismissible: true },
      { id: 2, type: 'success', message: 'Your changes have been saved.', dismissible: true },
      { id: 3, type: 'warning', message: 'Your session expires in 5 minutes.', dismissible: true },
      { id: 4, type: 'error', message: 'Unable to connect to the server.', dismissible: false },
    ]);
    let nextId = 5;

    // Step 1: Create dismiss(id) that filters out the alert with matching id

    // Step 2: Create addAlert(type, message) that pushes a new alert

    // Step 3: Create a typeIcon(type) function returning an icon for each type

    // Step 4: Create a typeColor(type) function mapping type to background color

    return { alerts, dismiss, addAlert, typeIcon, typeColor };
  }
}).mount('#app');`,

  'vue-callout': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const variant = ref('info');
    const variants = ['info', 'tip', 'warning', 'danger', 'note'];
    const title = ref('Did you know?');
    const content = ref('Vue 3 Composition API allows you to organize code by logical concern.');
    const collapsed = ref(false);

    // Step 1: Create a computed "variantStyle" mapping variant to colors
    // and icon (blue/info, green/tip, yellow/warning, red/danger, gray/note)

    // Step 2: Create toggle() that flips collapsed

    // Step 3: Create a computed "icon" returning the appropriate icon
    // for the current variant

    return { variant, variants, title, content, collapsed, variantStyle, toggle, icon };
  }
}).mount('#app');`,

  'vue-empty-state-v2': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const scenario = ref('no-data');
    const scenarios = ['no-data', 'no-results', 'error', 'no-permission', 'first-time'];
    const configs = {
      'no-data': { icon: '\\u{1F4C2}', title: 'No data yet', description: 'Start by adding your first item.', action: 'Create Item' },
      'no-results': { icon: '\\u{1F50D}', title: 'No results found', description: 'Try adjusting your search or filters.', action: 'Clear Filters' },
      'error': { icon: '\\u{26A0}', title: 'Something went wrong', description: 'We encountered an error loading data.', action: 'Try Again' },
      'no-permission': { icon: '\\u{1F512}', title: 'Access denied', description: 'You do not have permission to view this.', action: 'Request Access' },
      'first-time': { icon: '\\u{1F44B}', title: 'Welcome!', description: 'Get started with our quick setup guide.', action: 'Get Started' },
    };

    // Step 1: Create a computed "currentConfig" returning configs[scenario.value]

    // Step 2: Create onAction() that logs the action or resets the scenario

    // Step 3: Create nextScenario() that cycles through scenarios

    return { scenario, scenarios, configs, currentConfig, onAction, nextScenario };
  }
}).mount('#app');`,

  'vue-avatar-group': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const users = ref([
      { id: 1, name: 'Alice', color: '#3b82f6' },
      { id: 2, name: 'Bob', color: '#22c55e' },
      { id: 3, name: 'Carol', color: '#8b5cf6' },
      { id: 4, name: 'Dave', color: '#f59e0b' },
      { id: 5, name: 'Eve', color: '#ef4444' },
      { id: 6, name: 'Frank', color: '#06b6d4' },
    ]);
    const maxVisible = ref(4);

    // Step 1: Create a computed "visibleUsers" that slices users to maxVisible

    // Step 2: Create a computed "overflowCount" returning
    // Math.max(0, users.length - maxVisible)

    // Step 3: Create a computed "initials" helper that takes a name and returns
    // the first letter uppercased

    return { users, maxVisible, visibleUsers, overflowCount };
  }
}).mount('#app');`,

  'vue-breadcrumb-overflow': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const items = ref(['Home', 'Products', 'Electronics', 'Computers', 'Laptops', 'Gaming', 'Model X']);
    const maxVisible = ref(3);
    const showOverflow = ref(false);

    // Step 1: Create a computed "visibleItems" that shows first item,
    // an ellipsis placeholder if items are truncated, and last (maxVisible-1) items

    // Step 2: Create a computed "hiddenItems" returning the items that are
    // collapsed into the ellipsis

    // Step 3: Create toggleOverflow() that shows/hides the overflow menu

    return { items, maxVisible, showOverflow, visibleItems, hiddenItems, toggleOverflow };
  }
}).mount('#app');`,

  'vue-truncated-text': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const text = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.');
    const maxLength = ref(80);
    const expanded = ref(false);

    // Step 1: Create a computed "isTruncatable" returning true if
    // text.length > maxLength

    // Step 2: Create a computed "displayText" returning the full text
    // if expanded or not truncatable, otherwise text.slice(0, maxLength) + '...'

    // Step 3: Create toggle() that flips expanded

    return { text, maxLength, expanded, isTruncatable, displayText, toggle };
  }
}).mount('#app');`,

  'vue-responsive-grid': `const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const items = ref(Array.from({ length: 12 }, (_, i) => ({
      id: i + 1, label: 'Item ' + (i + 1), color: ['#3b82f6','#22c55e','#f59e0b','#ef4444','#8b5cf6','#06b6d4'][i % 6]
    })));
    const columns = ref(3);
    const gap = ref(16);

    // Step 1: Create an updateColumns() function that reads window.innerWidth
    // and sets columns to 1 (<640px), 2 (<1024px), 3 (<1280px), or 4

    // Step 2: Create a computed "gridStyle" returning CSS grid-template-columns
    // and gap from the reactive values

    // Step 3: Use onMounted/onUnmounted for resize listener calling updateColumns

    return { items, columns, gap, gridStyle };
  }
}).mount('#app');`,

  'vue-masonry-layout': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const items = ref([
      { id: 1, height: 150, color: '#3b82f6', label: 'Short' },
      { id: 2, height: 250, color: '#22c55e', label: 'Tall' },
      { id: 3, height: 180, color: '#f59e0b', label: 'Medium' },
      { id: 4, height: 300, color: '#8b5cf6', label: 'Tallest' },
      { id: 5, height: 120, color: '#ef4444', label: 'Shortest' },
      { id: 6, height: 200, color: '#06b6d4', label: 'Medium' },
    ]);
    const columnCount = ref(3);

    // Step 1: Create a computed "columns" that distributes items into
    // columnCount arrays using a shortest-column-first algorithm

    // Step 2: Create a computed "columnHeights" tracking the total height
    // of each column

    // Step 3: Create addItem() that pushes a new item with random height
    // and color

    return { items, columnCount, columns, columnHeights, addItem };
  }
}).mount('#app');`,

  'vue-aspect-ratio-box': `const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const ratio = ref('16:9');
    const ratios = ['1:1', '4:3', '16:9', '21:9', '3:2'];
    const content = ref('Responsive content maintains aspect ratio');

    // Step 1: Create a computed "paddingTop" that parses the ratio string,
    // calculates (height/width * 100) + '%' for the padding-top trick

    // Step 2: Create a computed "label" returning the ratio as a descriptive
    // string (e.g., "16:9 - Widescreen")

    // Step 3: Create a computed "dimensions" that calculates sample pixel
    // dimensions for a 400px-wide container

    return { ratio, ratios, content, paddingTop, label, dimensions };
  }
}).mount('#app');`,

  'vue-scroll-snap': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const slides = ref([
      { id: 1, title: 'Slide 1', color: '#3b82f6' },
      { id: 2, title: 'Slide 2', color: '#22c55e' },
      { id: 3, title: 'Slide 3', color: '#f59e0b' },
      { id: 4, title: 'Slide 4', color: '#8b5cf6' },
      { id: 5, title: 'Slide 5', color: '#ef4444' },
    ]);
    const currentSlide = ref(0);
    const direction = ref('horizontal');
    const directions = ['horizontal', 'vertical'];

    // Step 1: Create an onScroll(e) handler that determines the current
    // slide index from scroll position and slide dimensions

    // Step 2: Create scrollTo(index) that programmatically scrolls to
    // the target slide

    // Step 3: Create a computed "snapStyle" returning CSS scroll-snap
    // properties based on direction

    return { slides, currentSlide, direction, directions, onScroll, scrollTo, snapStyle };
  }
}).mount('#app');`,

  'vue-parallax': `const { createApp, ref, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    const layers = ref([
      { id: 1, speed: 0.2, color: '#1e3a5f', label: 'Background' },
      { id: 2, speed: 0.5, color: '#2563eb', label: 'Middle' },
      { id: 3, speed: 0.8, color: '#3b82f6', label: 'Foreground' },
    ]);
    const scrollY = ref(0);

    // Step 1: Create an onScroll() handler that updates scrollY from
    // window.scrollY

    // Step 2: Create a getOffset(speed) function that returns
    // scrollY.value * speed for the parallax transform

    // Step 3: Create a layerStyle(layer) function returning CSS transform
    // with translateY based on getOffset

    // Step 4: Use onMounted/onUnmounted for scroll listener

    return { layers, scrollY, getOffset, layerStyle };
  }
}).mount('#app');`,

  'vue-animated-counter': `const { createApp, ref, watch } = Vue;

createApp({
  setup() {
    const target = ref(1000);
    const displayed = ref(0);
    const duration = ref(1500);
    const isAnimating = ref(false);

    // Step 1: Create animate(from, to) function that uses requestAnimationFrame
    // to increment displayed from "from" to "to" over duration ms,
    // using easeOutQuad easing

    // Step 2: Create a watch on target that calls animate(displayed.value, target.value)

    // Step 3: Create increment(amount) and decrement(amount) that adjust target

    // Step 4: Create a computed "formattedDisplay" that formats displayed
    // with toLocaleString for thousands separators

    return { target, displayed, duration, isAnimating, increment, decrement, formattedDisplay };
  }
}).mount('#app');`,

  'vue-confetti': `const { createApp, ref } = Vue;

createApp({
  setup() {
    const particles = ref([]);
    const isActive = ref(false);
    const particleCount = ref(50);
    const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

    // Step 1: Create launch() that generates particleCount particles with
    // random x position, color, size (5-15px), and animation delay,
    // sets isActive to true

    // Step 2: Create a computed "particleStyles" that maps each particle
    // to a CSS style object with position, color, animation properties

    // Step 3: Use setTimeout to clear particles after animation completes
    // (e.g., 3 seconds) and set isActive to false

    return { particles, isActive, particleCount, colors, launch, particleStyles };
  }
}).mount('#app');`,
};
