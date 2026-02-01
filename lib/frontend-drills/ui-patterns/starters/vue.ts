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
};
