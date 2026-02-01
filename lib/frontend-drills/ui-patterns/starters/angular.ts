/**
 * Hand-crafted starter code for Angular UI patterns.
 * Each entry provides syntactically valid boilerplate with state declarations,
 * TODO steps, and framework wrappers so users focus on business logic.
 */
export const angularStarters: Record<string, string> = {
  'ng-reactive-forms': `// Simulating Angular Reactive Forms behavior
const form = document.getElementById('ng-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

// Step 1: Create a validate() function
// It should accept an input element, an error element ID, and an array of rule objects
// Each rule has a test(value) function and a msg string
// Loop through rules, if any test fails, display the msg in the error element and return false
// If all pass, clear the error text and return true

// Step 2: Define validation rules for each field
// nameRules: require non-empty trimmed value
// emailRules: require non-empty value AND must contain '@'

// Step 3: Add 'input' event listeners on nameInput and emailInput
// Each should call validate() with the appropriate rules

// Step 4: Add 'submit' event listener on the form
// Prevent default, validate both fields
// If both valid, show the #result element with a welcome message`,

  'ng-template-forms': `// Simulating Angular template-driven forms with two-way binding
const username = document.getElementById('username');
const color = document.getElementById('color');
const agree = document.getElementById('agree');
const btn = document.getElementById('submit-btn');
const form = document.getElementById('tpl-form');
const hint = document.getElementById('username-hint');

// Step 1: Create a syncState() function
// Check if username has >= 2 chars, color is selected, and agree is checked
// Enable/disable the submit button based on validity
// Show hint text 'Min 2 characters' if username is non-empty but too short

// Step 2: Add 'input' listener on username, 'change' on color and agree
// All three should call syncState()

// Step 3: Add 'submit' listener on the form
// Prevent default, show #output element with a greeting that includes username and color`,

  'ng-custom-validators': `// Simulating Angular custom validators (sync + cross-field)
const pw = document.getElementById('password');
const cf = document.getElementById('confirm');
const form = document.getElementById('val-form');

// Password validation rules - each has an element reference and a test function
const rules = {
  len: { el: document.getElementById('rule-len'), test: null },
  upper: { el: document.getElementById('rule-upper'), test: null },
  num: { el: document.getElementById('rule-num'), test: null },
  special: { el: document.getElementById('rule-special'), test: null },
};

// Step 1: Fill in each rule's test function
// len: value.length >= 8
// upper: /[A-Z]/.test(value)
// num: /[0-9]/.test(value)
// special: /[!@#$%^&*]/.test(value)

// Step 2: Create validatePw() function
// Loop through rules, toggle 'pass' class on each rule element
// Show error in #pw-error if password has value but not all rules pass
// Return boolean indicating all rules pass

// Step 3: Create validateMatch() function
// Compare pw.value with cf.value
// Show error in #cf-error if confirm has value but doesn't match
// Return boolean

// Step 4: Add 'input' listeners on pw and cf
// pw input should call validatePw(), and also validateMatch() if cf has a value
// cf input should call validateMatch()

// Step 5: Add 'submit' listener on form
// Prevent default, if both validatePw() and validateMatch() pass, show #result`,

  'ng-autocomplete': `// Simulating Angular autocomplete with RxJS debounceTime + switchMap
const fruits = ['Apple','Apricot','Avocado','Banana','Blueberry','Cherry','Coconut','Cranberry','Dragon Fruit','Fig','Grape','Guava','Kiwi','Lemon','Lime','Mango','Melon','Nectarine','Orange','Papaya','Peach','Pear','Pineapple','Plum','Pomegranate','Raspberry','Strawberry','Watermelon'];
const input = document.getElementById('search');
const list = document.getElementById('results');
const spinner = document.getElementById('spinner');
let timer = null;

// Step 1: Create a highlight(text, query) function
// Find the query substring within text (case-insensitive)
// Wrap the matching portion in <mark> tags and return the result

// Step 2: Create a search(query) function
// Show the spinner, then use setTimeout (300ms) to simulate an async API call
// Filter fruits that include the query (case-insensitive)
// Render matches as <li> elements using highlight(), or show 'No results'
// Hide the spinner when done

// Step 3: Add 'input' listener on the input element
// Clear any existing timer (clearTimeout) and clear the results list
// If input is empty, hide spinner and return
// Set a new timer with 250ms delay (debounce) that calls search()

// Step 4: Add 'click' listener on the results list
// When a <li> is clicked, set input.value to the clicked text and clear the list`,

  'ng-file-upload': `// Simulating Angular HttpClient file upload with progress
const zone = document.getElementById('drop-zone');
const input = document.getElementById('file-input');
const list = document.getElementById('file-list');

// Step 1: Create a formatSize(bytes) function
// Return human-readable size: bytes as 'B', kilobytes as 'KB', megabytes as 'MB'

// Step 2: Add event listeners on the drop zone
// 'click' -> trigger input.click()
// 'dragover' -> preventDefault, add 'over' class
// 'dragleave' -> remove 'over' class
// 'drop' -> preventDefault, remove 'over' class, call handleFiles(e.dataTransfer.files)
// Also add 'change' listener on input to call handleFiles(input.files)

// Step 3: Create handleFiles(files) function
// For each file, create a div.file-item with:
//   - file name, formatted size, a progress bar (.fill at width:0%), and a status div
// Append to list, then call simulateUpload(item)

// Step 4: Create simulateUpload(item) function
// Use setInterval (200ms) to increment a percentage by random 5-20 each tick
// Update the .fill element width
// When >= 100%, clearInterval, set status to 'Upload complete'`,

  'ng-date-picker': `// Simulating Angular Material Datepicker
const input = document.getElementById('date-input');
const cal = document.getElementById('calendar');
const grid = document.getElementById('cal-grid');
const label = document.getElementById('month-label');
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
let current = new Date();
let selectedDate = null;

// Step 1: Create a toggle() function
// Toggle cal display between 'none' and 'block'
// If showing, call render()

// Step 2: Add click listeners on #cal-btn and input to call toggle()
// Add click listeners on #prev-month and #next-month
// prev-month: decrement current month, call render()
// next-month: increment current month, call render()

// Step 3: Create render() function
// Set label text to "Month Year"
// Render day-of-week labels (Su Mo Tu ... Sa) as .day-label divs
// Calculate first day of month and total days
// Add empty divs for offset, then .day divs for each date
// Mark today with 'today' class, selected date with 'selected' class

// Step 4: Add click listener on grid
// When a .day is clicked, set selectedDate, update input value (MM/DD/YYYY)
// Update #selected text, hide calendar

function render() {
  // Update the calendar grid based on current month/year
}

render();`,

  'ng-dynamic-forms': `// Simulating Angular dynamic form generation from schema
const form = document.getElementById('dynamic-form');
const submitBtn = document.getElementById('submit-btn');
let fieldId = 0;

// Step 1: Add click listener on .schema-bar
// Read e.target.dataset.type to determine field type (text, email, select, checkbox)
// Call addField(type) if a valid type is found

// Step 2: Create addField(type) function
// Increment fieldId, create a div.field element
// Based on type, generate appropriate HTML:
//   'select' -> <select> with placeholder and options A, B, C
//   'checkbox' -> <label> with <input type="checkbox">
//   'text'/'email' -> <input type="...">
// Add a .remove button, append to form, show submitBtn
// Add click listener on .remove to remove the field div

// Step 3: Add click listener on submitBtn
// Iterate all inputs/selects in the form
// Collect values (checkbox -> .checked, others -> .value)
// Display JSON in #output`,

  'ng-input-mask': `// Simulating Angular input mask directives via HostListener
const phone = document.getElementById('phone');
const card = document.getElementById('card');
const currency = document.getElementById('currency');
const vals = document.getElementById('values');

// Helper: strip all non-digit characters
function digits(v) { return v.replace(/\\D/g, ''); }

// Step 1: Add 'input' listener on phone
// Extract digits (max 10), format as (XXX) XXX-XXXX
// Set phone.value to the formatted string, call updateValues()

// Step 2: Add 'input' listener on card
// Extract digits (max 16), group into chunks of 4 separated by spaces
// Set card.value to the formatted string, call updateValues()

// Step 3: Add 'input' listener on currency
// Extract digits, divide by 100 to get dollar amount
// Format with $ prefix, 2 decimal places, and comma separators
// Set currency.value to the formatted string, call updateValues()

// Step 4: Create updateValues() function
// Display raw digit values for all three fields in the #values element`,

  'ng-select-dropdown': `// Simulating Angular custom select with ControlValueAccessor
const items = ['Angular','React','Vue','Svelte','Solid','Ember','Next.js','Nuxt','Remix','Astro'];
const trigger = document.getElementById('trigger');
const dropdown = document.getElementById('dropdown');
const optionsList = document.getElementById('options');
const filter = document.getElementById('filter');
const selText = document.getElementById('selected-text');
let selectedVal = '';
let activeIdx = -1;

// Step 1: Create renderOptions(query) function
// Filter items by query (case-insensitive)
// Render as <li> elements with data-value attribute
// Add 'selected' class if item matches selectedVal
// Add 'active' class if index matches activeIdx

// Step 2: Create open() and close() functions
// open: show dropdown, reset filter and activeIdx, call renderOptions(''), focus filter
// close: hide dropdown

// Step 3: Add click listener on trigger to toggle open/close
// Add input listener on filter to reset activeIdx and re-render options

// Step 4: Add click listener on optionsList
// When an option is clicked, set selectedVal, update selText, update #value-display, close()

// Step 5: Add keydown listener on document for keyboard navigation
// ArrowDown/ArrowUp: adjust activeIdx within bounds
// Enter: click the active option
// Escape: close the dropdown

// Step 6: Add click listener on document to close when clicking outside #select-wrap`,

  'ng-inline-edit': `// Simulating Angular inline editing with ControlValueAccessor
const data = [
  { name: 'Alice Johnson', role: 'Developer', email: 'alice@example.com' },
  { name: 'Bob Smith', role: 'Designer', email: 'bob@example.com' },
  { name: 'Carol White', role: 'Manager', email: 'carol@example.com' },
];
const tbody = document.getElementById('table-body');

// Step 1: Create render() function
// Generate table rows from data array
// Each <td> should have data-row (index) and data-col (field name) attributes

// Step 2: Add click listener on tbody
// Find the clicked <td>, skip if already editing
// Get the row index and column name from data attributes
// Store the original value
// Replace cell content with an <input> pre-filled with the original value
// Add 'editing' class, focus and select the input

// Step 3: Implement save and cancel behavior on the input
// 'Enter' key -> save: update data[row][col] with input value, re-render
// 'Escape' key -> cancel: restore original value, re-render
// 'blur' event -> save

function render() {
  // Render table rows from data
}

render();`,

  'ng-modal-dialog': `// Simulating Angular CDK Overlay modal dialog
const backdrop = document.getElementById('backdrop');
const status = document.getElementById('status');

// Step 1: Create openModal() function
// Set backdrop display to 'flex'

// Step 2: Create closeModal(msg) function
// Hide the backdrop, if msg is provided set status.textContent

// Step 3: Add click listeners
// #open-btn -> openModal()
// #close-x -> closeModal('Modal dismissed')
// #cancel-btn -> closeModal('Cancelled')
// #confirm-btn -> closeModal('Confirmed!')

// Step 4: Add click listener on backdrop
// If the click target is the backdrop itself (not modal content), dismiss

// Step 5: Add keydown listener on document
// If Escape is pressed while modal is visible, dismiss`,

  'ng-drag-drop': `// Simulating Angular CDK DragDrop
const tasks = [
  { text: 'Setup project', tag: 'config', col: 'todo' },
  { text: 'Design UI', tag: 'design', col: 'todo' },
  { text: 'Write API', tag: 'backend', col: 'todo' },
  { text: 'Auth module', tag: 'feature', col: 'progress' },
  { text: 'Unit tests', tag: 'testing', col: 'done' },
];

let dragIdx = null;

// Step 1: Create render() function
// For each column ('todo', 'progress', 'done'), get the zone element by ID
// Clear it, then create .card elements for tasks in that column
// Set draggable=true and data-idx to the task's index in the tasks array
// Each card shows the task text and a .tag span

// Step 2: Add dragstart listener on document
// If the dragged element is a .card, store its index in dragIdx
// Set opacity to 0.4 for visual feedback

// Step 3: Add dragend listener on document
// Restore opacity, remove 'over' class from all drop zones

// Step 4: For each .drop-zone element, add:
// 'dragover' -> preventDefault, add 'over' class
// 'dragleave' -> remove 'over' class
// 'drop' -> preventDefault, remove 'over', update tasks[dragIdx].col to zone.id, re-render

function render() {
  // Render task cards into their respective columns
}

render();`,

  'ng-data-table': `// Simulating Angular MatTable with MatSort and MatPaginator
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

// Step 1: Create sorted() function
// If no sortCol, return a copy of data
// Otherwise sort by sortCol: numbers use subtraction, strings use localeCompare
// Flip comparison based on sortDir ('asc' vs 'desc')

// Step 2: Create render() function
// Get sorted data, slice for current page (page * pageSize)
// Render rows into #tbody
// Update #page-info text ("Page X of Y")
// Enable/disable #prev-btn and #next-btn
// Show sort indicator (triangle) in the active column's sort span

// Step 3: Add click listeners on th.sortable elements
// Toggle sortDir if same column, otherwise set new sortCol with 'asc'
// Reset page to 0, re-render

// Step 4: Add click listeners on #prev-btn and #next-btn
// Decrement/increment page, re-render

function render() {
  // Display current page of sorted data
}

render();`,

  'ng-tabs': `// Simulating Angular tab navigation with lazy loading
const panels = {
  overview: '<div class="panel-title">Project Overview</div><p class="panel-text">This is a comprehensive project management tool built with Angular. It provides real-time collaboration, task tracking, and team analytics.</p>',
  features: '<ul class="feature-list"><li>Real-time collaboration</li><li>Drag & drop Kanban board</li><li>Team analytics dashboard</li><li>Custom workflows</li><li>API integrations</li></ul>',
  pricing: '<div class="price-card"><div class="amount">$29</div><div class="period">/month per user</div><p class="panel-text" style="margin-top:12px">Includes all features, unlimited projects, and priority support.</p></div>'
};

const tabBar = document.getElementById('tab-bar');
const panel = document.getElementById('panel');
const loading = document.getElementById('loading');

// Step 1: Create switchTab(tabId) function
// Toggle 'active' class on tab buttons based on tabId
// Clear the panel content
// Show the loading indicator
// After a 300ms delay (simulating lazy load), hide loading and set panel HTML from panels object

// Step 2: Add click listener on tabBar
// When a .tab button is clicked, call switchTab with the tab's data-tab value

// Step 3: Initialize by calling switchTab('overview')`,

  'ng-accordion': `// Simulating Angular animations API accordion
const accordion = document.getElementById('accordion');
let openIdx = -1;

// Step 1: Add click listener on the accordion container
// Find the closest .panel-header from the click target
// Get the panel index from data-idx attribute
// Check if this panel was already open

// Step 2: Close all panels
// Remove 'open' class from all .panel-header and .panel-body elements

// Step 3: If the clicked panel was NOT already open, open it
// Add 'open' class to the header and its next sibling (.panel-body)
// Update openIdx accordingly (set to clicked index, or -1 if closing)`,

  'ng-stepper': `// Simulating Angular MatStepper wizard
const formData = { email: '', password: '', name: '', bio: '' };
const content = document.getElementById('step-content');
const stepsEl = document.getElementById('steps');
let current = 0;

// Step templates - each returns HTML for its step
const stepTemplates = [
  function() { return '<label>Email</label><input id="f-email" placeholder="you@example.com" value="' + formData.email + '" /><label>Password</label><input id="f-password" type="password" placeholder="Password" value="' + formData.password + '" />'; },
  function() { return '<label>Full Name</label><input id="f-name" placeholder="Your name" value="' + formData.name + '" /><label>Bio</label><input id="f-bio" placeholder="Short bio" value="' + formData.bio + '" />'; },
  function() { return '<div class="review-item"><strong>Email:</strong> ' + (formData.email || '(empty)') + '</div><div class="review-item"><strong>Name:</strong> ' + (formData.name || '(empty)') + '</div><div class="review-item"><strong>Bio:</strong> ' + (formData.bio || '(empty)') + '</div>'; }
];

// Step 1: Create saveStep() function
// Based on current step index, read input values and save to formData
// Step 0: read f-email and f-password
// Step 1: read f-name and f-bio

// Step 2: Create render() function
// Set content.innerHTML from stepTemplates[current]()
// Update step indicators: 'active' for current, 'done' for completed steps
// Show/hide #prev-step button (hide on first step)
// Change #next-step text to 'Finish' on last step

// Step 3: Add click listener on #next-step
// Call saveStep(), advance to next step and render
// On final step, show completion message

// Step 4: Add click listener on #prev-step
// Call saveStep(), go back one step and render

function render() {
  // Display current step content and update step indicators
}

render();`,

  'ng-carousel': `// Simulating Angular carousel with animations and auto-play
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

// Step 1: Build the slide HTML
// Render slides into the track as .slide divs with background color, title, and description
// Render indicator dots into the indicators container, first dot active

// Step 2: Create goTo(idx) function
// Wrap index with modulo for looping
// Set track transform to translateX(-N%) where N = current * 100
// Toggle 'active' class on the corresponding indicator dot

// Step 3: Add click listeners
// #prev-btn -> goTo(current - 1)
// #next-btn -> goTo(current + 1)
// indicators -> when a .dot is clicked, goTo its data-idx

// Step 4: Create autoPlay() function
// Use setInterval (3000ms) to advance to next slide

// Step 5: Add click listener on #play-btn
// Toggle playing state, update button text ('Pause' / 'Play')
// Start or stop autoplay accordingly`,

  'ng-virtual-scroll': `// Simulating Angular CDK Virtual Scrolling
const TOTAL = 10000;
const ROW_HEIGHT = 40;
const viewport = document.getElementById('viewport');
const scrollContent = document.getElementById('scroll-content');
const renderedEl = document.getElementById('rendered');

// Set the scroll content height to TOTAL * ROW_HEIGHT
scrollContent.style.height = TOTAL * ROW_HEIGHT + 'px';

// Label generator for variety
function getLabel(i) {
  var names = ['Component','Service','Module','Directive','Pipe','Guard','Resolver','Interceptor'];
  return names[i % names.length] + ' #' + (i + 1);
}

// Step 1: Create renderVisible() function
// Calculate the visible range based on viewport.scrollTop and viewport.clientHeight
// startIdx = Math.floor(scrollTop / ROW_HEIGHT)
// endIdx = startIdx + Math.ceil(viewHeight / ROW_HEIGHT) + 2 (buffer), capped at TOTAL
// Generate .row divs with position:absolute and top set to i * ROW_HEIGHT
// Each row shows its index number and label
// Update renderedEl text with "Rendered: X of 10,000"

// Step 2: Add 'scroll' listener on viewport to call renderVisible()

// Step 3: Call renderVisible() on init`,

  'ng-context-menu': `// Simulating Angular CDK Overlay context menu
const menu = document.getElementById('context-menu');
const log = document.getElementById('log');
let targetItem = null;

// Step 1: Add 'contextmenu' listener on #items container
// Find the closest .item element from the event target
// Prevent default browser context menu
// Store the item's text in targetItem
// Show the custom menu, position it at the click coordinates
// Clamp position so menu doesn't overflow the viewport

// Step 2: Add click listener on the menu
// Read data-action from the clicked .menu-item
// Capitalize the action name and display it with the target item name in the log
// Hide the menu

// Step 3: Add click listener on document to hide the menu
// Step 4: Add keydown listener for Escape to hide the menu`,

  'ng-toast-notifications': `// Simulating Angular toast notification service with DI
const container = document.getElementById('toast-container');
const messages = {
  success: 'Operation completed successfully!',
  error: 'Something went wrong. Please try again.',
  warning: 'Please check your input values.',
  info: 'New updates are available.',
};
const icons = { success: '\\u2713', error: '\\u2717', warning: '\\u26A0', info: '\\u2139' };

// Step 1: Create showToast(type) function
// Create a div.toast with the type as a class
// Set innerHTML with icon, message, and a .close button
// Append to container
// Add click listener on .close to call removeToast()
// Set a 3500ms timeout to auto-remove the toast

// Step 2: Create removeToast(toast) function
// If toast is no longer in the DOM, return early
// Apply fadeOut animation, then remove element after 300ms

// Step 3: Add click listener on .btn-row
// Read data-type from the clicked button, call showToast(type)`,

  'ng-data-visualization': `// Simulating Angular data visualization (bar, line, pie charts)
const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const colors = ['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899'];
let chartType = 'bar';

function randData() { return labels.map(function() { return Math.floor(Math.random() * 80) + 20; }); }
let data = randData();

// Step 1: Create drawBar() function
// Calculate bar width and positions with padding
// For each data point, draw a filled rectangle using ctx.fillRect
// Draw labels below and values above each bar

// Step 2: Create drawLine() function
// Plot data points connected by a line using ctx.beginPath/moveTo/lineTo/stroke
// Draw circles at each data point using ctx.arc
// Draw labels below each point

// Step 3: Create drawPie() function
// Calculate total, draw arcs proportional to each value using ctx.arc
// Label each slice around the outside of the pie

// Step 4: Create draw() function
// Clear the canvas with ctx.clearRect
// Call the appropriate drawing function based on chartType

// Step 5: Add click listener on .chart-tabs
// Update chartType from data-chart attribute, toggle 'active' class, call draw()

// Step 6: Add click listener on #refresh to regenerate data and redraw`,

  'ng-search-filter': `// Simulating Angular custom pipe for search filtering
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

// Step 1: Create highlight(text, query) function
// Find query within text (case-insensitive)
// Wrap the matching portion in <mark> tags

// Step 2: Create render() function
// Get search query from input, filter items by:
//   - activeCat matches item.cat (or 'all' shows everything)
//   - query matches item.name (case-insensitive)
// Render as <li> with highlighted name and category badge
// Update countEl with "X of Y items"

// Step 3: Add 'input' listener on input to call render()

// Step 4: Add click listener on .tags container
// Read data-cat from clicked tag, set activeCat, toggle 'active' class, render()

render();`,

  'ng-infinite-scroll': `// Simulating Angular infinite scroll with Intersection Observer
const container = document.getElementById('items');
const sentinel = document.getElementById('sentinel');
const loader = document.getElementById('loader');
const statusEl = document.getElementById('status');
const avatarColors = ['#ef4444','#f97316','#22c55e','#3b82f6','#8b5cf6','#ec4899'];
let page = 0;
let loading = false;
const BATCH = 8;
const MAX = 50;

// Step 1: Create genItems(start, count) function
// Generate HTML for item cards from start index
// Each card has a colored avatar with a letter, a name, and a description
// Stop at MAX items

// Step 2: Create loadMore() function
// If already loading or all items loaded, return
// Set loading flag, show loader element
// After a 500ms delay (simulating API call):
//   - Append generated HTML to container
//   - Increment page, clear loading flag, hide loader
//   - Update status text with "Loaded: X of 50 items"

// Step 3: Set up IntersectionObserver
// Observe the sentinel element within #scroll-area
// When sentinel is visible (isIntersecting), call loadMore()

// Step 4: Trigger initial loadMore()`,

  'ng-gallery': `// Simulating Angular image gallery with lightbox overlay
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
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
let currentIdx = 0;

// Step 1: Render gallery thumbnails
// Create .thumb divs with background color, emoji, and data-idx attribute

// Step 2: Create showLightbox(idx) function
// Set currentIdx, update lbImg background and text content (emoji)
// Update lbCaption with label and position (e.g., "Sunrise (1/9)")
// Show lightbox

// Step 3: Create closeLightbox() function
// Hide the lightbox

// Step 4: Add click listener on gallery
// When a .thumb is clicked, call showLightbox with its data-idx

// Step 5: Add click listeners on lightbox controls
// #lb-close -> closeLightbox()
// #lb-prev -> show previous image (wrap around)
// #lb-next -> show next image (wrap around)
// Clicking lightbox backdrop -> closeLightbox()

// Step 6: Add keydown listener for keyboard navigation
// Escape -> close, ArrowLeft -> prev, ArrowRight -> next`,

  'ng-cards-grid': `// Simulating Angular Flex Layout responsive card grid
const cards = [
  { icon: '\\u{1F4E6}', title: 'Components', desc: 'Reusable building blocks for UI', tag: 'core' },
  { icon: '\\u{1F527}', title: 'Services', desc: 'Shared logic and data access', tag: 'core' },
  { icon: '\\u{1F6E1}', title: 'Guards', desc: 'Route protection and auth', tag: 'routing' },
  { icon: '\\u{1F4E1}', title: 'Interceptors', desc: 'HTTP request/response handling', tag: 'http' },
  { icon: '\\u{1F3AF}', title: 'Directives', desc: 'DOM manipulation utilities', tag: 'template' },
  { icon: '\\u{1F50D}', title: 'Pipes', desc: 'Data transformation in templates', tag: 'template' },
];

const grid = document.getElementById('grid');

// Step 1: Create render() function
// Generate .card elements from the cards array
// Each card has .card-icon, .card-title, .card-desc, and .card-tag sections

// Step 2: Add click listener on .toolbar
// Read data-cols from the clicked button
// Toggle 'active' class on column buttons
// Update grid.style.gridTemplateColumns to "repeat(N, 1fr)"

// Step 3: Call render() on init

function render() {
  // Render cards into the grid
}

render();`,

  'ng-sort-filter-table': `// Simulating Angular MatTableDataSource with custom filter predicate
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

// Step 1: Create filtered() function
// Read search query, department filter, and level filter
// Filter data matching all active criteria (name search is case-insensitive)
// If sortCol is set, sort the results (numbers by subtraction, strings by localeCompare)
// Flip comparison based on sortDir

// Step 2: Create render() function
// Call filtered() to get the visible rows
// Render into #tbody, or show "No results" if empty
// Update #result-count with "X of Y records"

// Step 3: Add input/change listeners on searchEl, deptEl, levelEl to call render()

// Step 4: Add click listeners on th.sortable elements
// Toggle sort direction if same column, otherwise reset to 'asc'
// Call render()

function render() {
  // Display filtered and sorted data
}

render();`,

  'ng-dashboard': `// Simulating Angular CDK DragDrop dashboard with local storage
const widgetTypes = [
  { title: 'Revenue', value: '$12.4K', label: 'This month' },
  { title: 'Users', value: '1,284', label: 'Active users' },
  { title: 'Orders', value: '356', label: 'Pending orders' },
  { title: 'Uptime', value: '99.9%', label: 'Last 30 days' },
];

let widgets = JSON.parse(localStorage.getItem('ng-dash') || 'null') || widgetTypes.slice(0, 4).map(function(w, i) { return Object.assign({}, w, { id: i }); });
let nextId = widgets.length;

function save() { localStorage.setItem('ng-dash', JSON.stringify(widgets)); }

// Step 1: Create render() function
// Build .widget elements from the widgets array, each with:
//   - draggable="true" and data-id attribute
//   - .widget-header with title and .remove button
//   - .widget-body with .big-num (value) and .label
// If no widgets, show a placeholder message
// Call setupDrag() after rendering

// Step 2: Create setupDrag() function
// For each .widget, add drag event listeners:
//   dragstart: store the widget id, add 'dragging' class
//   dragend: remove 'dragging' and 'over' classes
//   dragover: preventDefault, add 'over' class
//   dragleave: remove 'over' class
//   drop: swap positions in the widgets array, save and re-render
// For each .remove button, add click listener to remove widget from array

// Step 3: Add click listener on #add-widget
// Add a new widget from widgetTypes (cycling), save and render

// Step 4: Add click listener on #reset-btn
// Reset widgets to initial 4, save and render

function render() {
  // Render widgets into the dashboard grid
}

render();`,

  'ng-sidebar': `// Simulating Angular collapsible sidebar with router
const sidebar = document.getElementById('sidebar');
const navList = document.getElementById('nav-list');
const subMenu = document.getElementById('sub-settings');
const pageTitle = document.getElementById('page-title');

// Step 1: Add click listener on #toggle-btn
// Toggle 'collapsed' class on the sidebar element

// Step 2: Add click listener on navList
// Find the clicked .nav-item
// If it has 'has-sub' class, toggle the sub-menu visibility and arrow rotation
// Otherwise, remove 'active' from all nav items, add 'active' to the clicked one
// Update pageTitle text to the route name (capitalized)`,

  'ng-navbar': `// Simulating Angular responsive navbar with route guards
let loggedIn = false;
const links = document.getElementById('nav-links');
const pageName = document.getElementById('page-name');
const userBadge = document.getElementById('user-badge');
const loginBtn = document.getElementById('login-btn');
const mobileMenu = document.getElementById('mobile-menu');
const hamburger = document.getElementById('hamburger');

// Step 1: Create navigate(route, el) function
// If route is 'pricing' and user is not logged in, show "Access Denied" message
// Otherwise, remove 'active' from all .nav-link elements
// If el is provided, add 'active' class to it
// Update pageName text (capitalize route name)
// Hide mobile menu

// Step 2: Add click listener on links container
// Call navigate with the clicked element's data-route

// Step 3: Add click listener on mobileMenu
// Call navigate with the clicked element's data-route

// Step 4: Add click listener on hamburger
// Toggle mobile menu display between 'none' and 'flex'

// Step 5: Add click listener on loginBtn
// Toggle loggedIn state
// Update button text ('Login' / 'Logout') and badge text ('Guest' / 'Admin')`,

  'ng-breadcrumbs': `// Simulating Angular auto-generated breadcrumbs from router config
const crumbsEl = document.getElementById('breadcrumbs');
let currentPath = 'home';

// Step 1: Create renderBreadcrumbs(path) function
// Split path by '/' into parts
// For each part, build a .crumb span with:
//   - data-path set to the full path up to that point
//   - 'current' class on the last part
//   - Separator '/' between crumbs
// Capitalize each part name

// Step 2: Create navigate(path) function
// Set currentPath, call renderBreadcrumbs(path)
// Toggle 'active' class on .route-item elements matching the path

// Step 3: Add click listener on .route-tree
// When a .route-item is clicked, call navigate with its data-path

// Step 4: Add click listener on crumbsEl
// When a non-current .crumb is clicked, navigate to its data-path

// Step 5: Initialize with navigate('home')`,

  'ng-bottom-nav': `// Simulating Angular mobile bottom navigation with routerLinkActive
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

// Step 1: Add click listener on nav
// Find the clicked .bnav-item
// Get the route from data-route attribute
// Remove 'active' from all .bnav-item elements, add 'active' to clicked
// Update title text (capitalize route name)
// Update body text from the screens object`,

  'ng-mega-menu': `// Simulating Angular multi-level mega menu
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

// Step 1: Add click listener on bar
// Find the clicked .menu-trigger, get its data-menu value
// If same menu is already open, call closeMenu() and return
// Set activeMenu, toggle 'active' class on triggers
// Build mega panel HTML with .mega-columns grid
// Each column has an <h4> title and links from items array
// Show the panel

// Step 2: Create closeMenu() function
// Set activeMenu to null, hide panel, remove 'active' from all triggers

// Step 3: Add click listener on document
// If click is outside menu-bar and mega-panel, close menu

// Step 4: Add keydown listener for Escape to close menu`,

  'ng-pagination': `// Simulating Angular pagination with router query params
const allItems = Array.from({ length: 23 }, function(_, i) { return 'Item ' + (i + 1); });
let page = 1;
let pageSize = 5;

function totalPages() { return Math.ceil(allItems.length / pageSize); }

// Step 1: Create render() function
// Slice allItems for current page
// Render items as <li> elements in #item-list
// Build paginator HTML with prev button, numbered page buttons, and next button
// Add 'active' class to current page button
// Disable prev on first page, next on last page
// Update #url-bar with simulated URL "/items?page=X&size=Y"

// Step 2: Add click listener on #paginator (event delegation)
// Handle prev button, next button, and numbered page buttons
// Update page and re-render

// Step 3: Add change listener on #page-size select
// Update pageSize, reset page to 1, re-render

function render() {
  // Display current page of items with pagination controls
}

render();`,

  'ng-keyboard-shortcuts': `// Simulating Angular keyboard shortcut service with HostListener
const log = document.getElementById('log');
const overlay = document.getElementById('search-overlay');
let itemCount = 0;

// Shortcut definitions - each key maps to a handler function
const shortcuts = {
  'n': function() { itemCount++; return 'Created new item #' + itemCount; },
  's': function() { return 'Saved successfully!'; },
  'f': function() { overlay.style.display = 'block'; document.getElementById('search-input').focus(); return 'Search opened'; },
  'd': function() { return 'Item deleted'; },
};

// Step 1: Add keydown listener on document
// If Escape is pressed, hide the search overlay and show 'Cancelled' in log
// If Ctrl (or Meta on Mac) + key matches a shortcut:
//   - Prevent default browser behavior
//   - Execute the shortcut handler
//   - Display the returned message in the log`,

  'ng-settings-panel': `// Simulating Angular settings panel with localStorage persistence
let settings = JSON.parse(localStorage.getItem('ng-settings') || '{}');
settings = { theme: 'dark', accent: '#ef4444', fontSize: 14, notifications: false, ...settings };
const preview = document.getElementById('preview');

// Step 1: Create applySettings() function
// Update preview font size from settings.fontSize
// Update preview left border color from settings.accent
// Update #fs-value text display

// Step 2: Add click listener on .toggle-group (theme)
// Read data-theme from clicked .tg button
// Update settings.theme, toggle 'active' class on theme buttons

// Step 3: Add click listener on #color-options (accent color)
// Read data-color from clicked .color-dot
// Update settings.accent, toggle 'active' class, call applySettings()

// Step 4: Add input listener on #font-size range slider
// Update settings.fontSize, call applySettings()

// Step 5: Add click listener on #notif-switch
// Toggle settings.notifications, toggle 'on' class on the switch

// Step 6: Add click listener on #save-btn
// Save settings to localStorage as JSON
// Show #saved-msg briefly (2 seconds)

// Step 7: Initialize
// Call applySettings()
// Set initial 'on' class on notif-switch based on settings.notifications`,

  'ng-notifications-center': `// Simulating Angular notification center with RxJS Subject
const notifications = [
  { id: 1, text: 'New deployment succeeded', type: 'info', read: false, time: '2m ago' },
  { id: 2, text: 'Server CPU usage above 90%', type: 'alert', read: false, time: '5m ago' },
  { id: 3, text: 'User John signed up', type: 'info', read: true, time: '1h ago' },
  { id: 4, text: 'Payment failed for order #42', type: 'alert', read: true, time: '3h ago' },
];
let nextId = 5;
let filter = 'all';
const badge = document.getElementById('badge');

// Step 1: Create render() function
// Filter notifications based on current filter value:
//   'all' -> show all, 'unread' -> !read, 'info'/'alert' -> match type
// Render .notif divs with 'unread' class, colored dot, text, and time
// Update badge count (unread notifications), show/hide badge

// Step 2: Add click listener on #notif-list
// When a .notif is clicked, find the notification by data-id and mark it as read
// Re-render

// Step 3: Add click listener on .filter-tabs
// Update filter value, toggle 'active' class on filter buttons, render()

// Step 4: Add click listener on #mark-all
// Set all notifications to read, render()

// Step 5: Add click listener on #simulate-btn
// Add a random new notification to the beginning of the array
// Increment nextId, set read to false and time to 'now'
// Re-render

function render() {
  // Display filtered notifications and update badge
}

render();`,

  'ng-favorites': `// Simulating Angular favorites with NgRx-style state management
const items = ['Angular','React','Vue','Svelte','TypeScript','RxJS','NgRx','Tailwind'];
let favorites = JSON.parse(localStorage.getItem('ng-favs') || '[]');

function save() { localStorage.setItem('ng-favs', JSON.stringify(favorites)); }

// Step 1: Create render() function
// Render items grid: each .item-card has a name span and a .fav-btn button
// Button shows heart icon: filled (active) if in favorites, outline if not
// Render favorites list: each .fav-item has a name and a .remove-btn
// Update #fav-count with the number of favorites
// Show placeholder text if no favorites

// Step 2: Add click listener on #items container
// When a .fav-btn is clicked, toggle the item in/out of favorites array
// Save and re-render

// Step 3: Add click listener on #favorites container
// When a .remove-btn is clicked, remove the item from favorites
// Save and re-render

function render() {
  // Display items with favorite toggles and favorites list
}

render();`,

  'ng-undo-redo': `// Simulating Angular undo/redo with command pattern
const colors = ['#ef4444','#3b82f6','#22c55e','#f59e0b','#a855f7','#ec4899'];
let state = [];
let undoStack = [];
let redoStack = [];
const historyLog = document.getElementById('history-log');

function snapshot() { return JSON.parse(JSON.stringify(state)); }

// Step 1: Create execute(action, desc) function
// Push current state snapshot and description onto undoStack
// Clear redoStack (new action invalidates redo history)
// Execute the action function
// Update the UI and append description to history log

// Step 2: Add click listener on #add-btn
// Call execute with an action that pushes a random color to state

// Step 3: Add click listener on #color-btn
// If state is empty, return. Otherwise execute an action that changes the last item's color

// Step 4: Add click listener on #remove-btn
// If state is empty, return. Otherwise execute an action that pops the last item

// Step 5: Add click listener on #undo-btn
// Pop from undoStack, push current state to redoStack, restore the popped state

// Step 6: Add click listener on #redo-btn
// Pop from redoStack, push current state to undoStack, restore the popped state

// Step 7: Create updateUI() function
// Render colored .box divs from state array into #item-row
// Enable/disable undo and redo buttons based on stack lengths
// Update #history-info with stack counts

function updateUI() {
  // Render state boxes and update button states
}

updateUI();`,

  'ng-loading-states': `// Simulating Angular loading skeleton with structural directives
const content = document.getElementById('content');
const btn = document.getElementById('load-btn');
const people = [
  { name: 'Alice', role: 'Developer', email: 'alice@dev.io', color: '#ef4444' },
  { name: 'Bob', role: 'Designer', email: 'bob@design.io', color: '#3b82f6' },
];

let loaded = false;

// Step 1: Add click listener on btn
// If already loaded, reset to skeleton state:
//   - Replace content with skeleton-card HTML (shimmer animation placeholders)
//   - Set loaded = false, update button text to 'Load Data'
//   - Return early
// If not loaded:
//   - Disable button, set text to 'Loading...'
//   - After 1500ms delay, replace skeletons with real data cards
//   - Each .loaded-card has an .avatar (colored circle with initial), name, role, and email
//   - Re-enable button, set text to 'Reset', set loaded = true`,

  'ng-empty-states': `// Simulating Angular empty state with ng-content projection
const container = document.getElementById('empty-state');
const states = {
  'no-data': {
    icon: '\\u{1F4E6}',
    title: 'No items yet',
    desc: 'Get started by creating your first item. It only takes a few seconds.',
    actionLabel: 'Create First Item'
  },
  'no-results': {
    icon: '\\u{1F50D}',
    title: 'No results found',
    desc: 'Try adjusting your search or filters to find what you are looking for.',
    actionLabel: 'Clear Filters'
  },
  'error': {
    icon: '\\u{26A0}',
    title: 'Something went wrong',
    desc: 'We had trouble loading your data. Please check your connection and try again.',
    actionLabel: 'Retry'
  }
};

// Step 1: Create render(stateKey) function
// Look up the state object from states
// Set container innerHTML with:
//   - .empty-icon (the emoji)
//   - .empty-title
//   - .empty-desc
//   - .empty-action button(s) with appropriate label and click handler

// Step 2: Add click listener on .tabs container
// Read data-state from clicked .tab
// Toggle 'active' class on tabs
// Call render() with the new state key

// Step 3: Initialize with render('no-data')`,

  'ng-image-viewer': `// Simulating Angular CDK image viewer with zoom and pan
const viewer = document.getElementById('viewer');
const container = document.getElementById('image-container');
let scale = 1;
let panX = 0, panY = 0;
let dragging = false;
let startX, startY, startPanX, startPanY;

// Step 1: Create applyTransform() function
// Set container.style.transform using translate(panX, panY) and scale(scale)
// Update #zoom-level text with percentage (e.g., "100%")

// Step 2: Add mousedown listener on viewer
// Set dragging = true, record startX/Y (clientX/Y) and startPanX/Y

// Step 3: Add mousemove listener on document
// If dragging, update panX/panY based on mouse movement delta
// Call applyTransform()

// Step 4: Add mouseup listener on document
// Set dragging = false

// Step 5: Add wheel listener on viewer (with passive: false)
// Prevent default, calculate zoom delta from e.deltaY
// Clamp scale between 0.5 and 5
// Call applyTransform()

// Step 6: Add click listeners on zoom controls
// #zoom-in -> increase scale by 0.25 (max 5)
// #zoom-out -> decrease scale by 0.25 (min 0.5)
// #reset-btn -> reset scale=1, panX=0, panY=0
// Call applyTransform() after each

applyTransform();`,

  'ng-toggle-switch': `// Simulating Angular toggle switch with ControlValueAccessor
const state = { dark: false, notif: false, auto: true, premium: false };

// Step 1: Create updateDisplay() function
// For each key in state (except 'premium'):
//   - Find the .toggle element with matching data-key
//   - Toggle 'on' class based on state value
//   - Set aria-checked attribute
//   - Update the .status span text ('On' / 'Off')
// Update #form-value with JSON.stringify of state

// Step 2: Add click listeners on all .toggle:not(.disabled) elements
// Toggle the corresponding state value
// Call updateDisplay()

// Step 3: Add keydown listeners on the same toggle elements
// Space or Enter key should trigger a click (with preventDefault)

// Step 4: Call updateDisplay() on init`,
};
