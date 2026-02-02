/**
 * Hand-crafted starter code for Native JS UI patterns.
 * Each entry provides syntactically valid boilerplate with state declarations,
 * TODO steps, and framework wrappers so users focus on business logic.
 */
export const nativeJsStarters: Record<string, string> = {
  'js-form-validation': `const form = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');

// Step 1: Create a validate() helper function
// It should accept an input element, an error element ID, and a check function
// The check function receives the input value and returns an error message string (or empty/falsy if valid)
// Update the error element's textContent and toggle 'invalid'/'valid' classes on the input
// Return true if valid, false if invalid

// Step 2: Add 'input' event listeners to each field
// - emailInput: check that value is not empty and matches a basic email regex pattern
// - passwordInput: check that value is not empty and is at least 8 characters
// - confirmInput: check that value is not empty and matches passwordInput.value

// Step 3: Add a 'submit' event listener to the form
// Call e.preventDefault(), then run all three validations
// If all three return true, show the success element by setting display to 'block'
`,

  'js-autocomplete': `const fruits = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry', 'Grape', 'Kiwi', 'Lemon', 'Mango', 'Orange', 'Peach', 'Pear', 'Pineapple', 'Strawberry', 'Watermelon'];
const input = document.getElementById('search');
const list = document.getElementById('suggestions');
let activeIdx = -1;
let debounceTimer;

// Step 1: Create a showSuggestions(query) function
// - Clear list.innerHTML and reset activeIdx to -1
// - If query is empty, remove the 'open' class from list and set aria-expanded to 'false', then return
// - Filter fruits array (case-insensitive) to find matches containing the query
// - If no matches, hide the list the same way
// - For each match, create an <li> with role="option", id="opt-{index}"
// - Highlight the matching text by wrapping it in <mark> tags using a RegExp
// - Add a click listener on each <li> that sets input.value to the fruit name and hides the list
// - Append <li> to list, add 'open' class, set aria-expanded to 'true'

// Step 2: Add an 'input' event listener to the input with debouncing
// Use clearTimeout/setTimeout with a 200ms delay before calling showSuggestions(input.value)

// Step 3: Add a 'keydown' event listener to the input for keyboard navigation
// - ArrowDown: increment activeIdx (clamped to items.length - 1), add 'active' class, scrollIntoView
// - ArrowUp: decrement activeIdx (clamped to 0), add 'active' class
// - Enter: if activeIdx >= 0, set input.value to the active item's textContent, hide list
// - Escape: hide the list
// - Remove 'active' class from all items before adding to the new active one
`,

  'js-file-upload': `const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');

// Step 1: Create a formatSize(bytes) function
// Return a human-readable string: bytes < 1024 => "X B", < 1048576 => "X.X KB", else "X.X MB"

// Step 2: Create a simulateUpload(item) function
// - Query the '.progress-fill' element inside the item
// - Use setInterval to increment a percentage by a random amount (Math.random() * 25 + 5)
// - Update fill.style.width to the current percentage
// - When percentage >= 100, clearInterval, clamp to 100, and add 'done' class to item

// Step 3: Create an addFiles(files) function
// - Loop through Array.from(files)
// - For each file, create an <li> with className 'file-item'
// - Set innerHTML to include: a .name span (file.name), a .size span (formatSize(file.size)),
//   and a .progress-bar div containing a .progress-fill div at width:0%
// - Append to fileList, then call simulateUpload(li)

// Step 4: Wire up event listeners
// - dropZone click => trigger fileInput.click()
// - fileInput change => call addFiles(e.target.files)
// - dropZone dragover => e.preventDefault(), add 'dragover' class
// - dropZone dragleave => remove 'dragover' class
// - dropZone drop => e.preventDefault(), remove 'dragover' class, call addFiles(e.dataTransfer.files)
`,

  'js-date-picker': `const input = document.getElementById('date-input');
const calendar = document.getElementById('calendar');
const grid = document.getElementById('cal-grid');
const label = document.getElementById('month-label');
const daysRow = document.getElementById('cal-days');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let current = new Date();
let selected = null;

// Step 1: Populate the days-of-week header row
// Loop through ['Su','Mo','Tu','We','Th','Fr','Sa'], create a <span> for each, append to daysRow

// Step 2: Create a render() function
// - Get year (current.getFullYear()) and month (current.getMonth())
// - Set label.textContent to "MonthName Year"
// - Clear grid.innerHTML
// - Calculate the day-of-week of the 1st (new Date(y, m, 1).getDay()) and total days (new Date(y, m+1, 0).getDate())
// - Create empty placeholder buttons for days before the 1st (with class 'empty')
// - Create a button for each day 1..totalDays
//   - Add 'today' class if it matches today's date
//   - Add 'selected' class if it matches the selected date
//   - On click: set selected to new Date(y, m, d), format input.value as MM/DD/YYYY, hide calendar, re-render

// Step 3: Wire up event listeners
// - input click => toggle calendar display between 'none' and 'block', call render()
// - prev-month click => current.setMonth(current.getMonth() - 1), call render()
// - next-month click => current.setMonth(current.getMonth() + 1), call render()
// - document click => if click target is not inside '.datepicker-wrapper', hide calendar

function render() {
  // Implement calendar grid rendering here
}

render();
`,

  'js-input-masking': `const phoneInput = document.getElementById('phone');
const cardInput = document.getElementById('card');
const dateInput = document.getElementById('date');
const output = document.getElementById('output');

// Step 1: Create maskPhone(value) function
// - Strip non-digits, limit to 10 digits
// - Format as: (XXX) XXX-XXXX progressively
//   - 0 digits: return ''
//   - 1-3 digits: '(' + digits
//   - 4-6 digits: '(XXX) ' + remaining
//   - 7+ digits: '(XXX) XXX-' + remaining

// Step 2: Create maskCard(value) function
// - Strip non-digits, limit to 16 digits
// - Insert a space after every 4 digits using a regex like /(\\d{4})(?=\\d)/g

// Step 3: Create maskDate(value) function
// - Strip non-digits, limit to 8 digits
// - Format as MM/DD/YYYY progressively
//   - 1-2 digits: return as-is
//   - 3-4 digits: XX/ + remaining
//   - 5+ digits: XX/XX/ + remaining

// Step 4: Create applyMask(input, maskFn) function
// - Add an 'input' event listener to the input
// - Save selectionStart and value length before masking
// - Set input.value = maskFn(input.value)
// - Adjust cursor position based on length change using setSelectionRange
// - Call updateOutput()

// Step 5: Create updateOutput() function
// - Collect non-empty values from all three inputs
// - Display them joined by ' | ' in the output element
// - If none have values, show 'Type in any field above...'

// Step 6: Apply masks and initialize
// applyMask(phoneInput, maskPhone);
// applyMask(cardInput, maskCard);
// applyMask(dateInput, maskDate);
// updateOutput();
`,

  'js-range-slider': `const slider = document.getElementById('slider');
const thumbMin = document.getElementById('thumb-min');
const thumbMax = document.getElementById('thumb-max');
const fill = document.getElementById('fill');
let minVal = 20;
let maxVal = 80;

// Step 1: Create an updateUI() function
// - Set thumbMin.style.left to minVal + '%'
// - Set thumbMax.style.left to maxVal + '%'
// - Set fill.style.left to minVal + '%'
// - Set fill.style.width to (maxVal - minVal) + '%'
// - Update the text content of #val-min to '$' + minVal
// - Update the text content of #val-max to '$' + maxVal

// Step 2: Create a startDrag(thumb, isMin) function
// - Add 'active' class to the thumb
// - Create an onMove handler that:
//   - Gets the slider bounding rect
//   - Calculates percentage from mouse position: Math.round(((e.clientX - rect.left) / rect.width) * 100)
//   - Clamps between 0 and 100
//   - If isMin: set minVal = Math.min(pct, maxVal - 5)
//   - If !isMin: set maxVal = Math.max(pct, minVal + 5)
//   - Call updateUI()
// - Create an onUp handler that removes 'active' class and removes both event listeners
// - Add 'pointermove' and 'pointerup' listeners on document

// Step 3: Add pointerdown listeners
// thumbMin pointerdown => startDrag(thumbMin, true)
// thumbMax pointerdown => startDrag(thumbMax, false)

// Step 4: Initialize
// updateUI();
`,

  'js-inline-edit': `const editItems = document.querySelectorAll('.edit-item');

// Step 1: For each .edit-item, get references to its children:
// - const display = item.querySelector('.display')
// - const input = item.querySelector('.edit-input')
// - const btn = item.querySelector('.edit-btn')

// Step 2: Create a startEdit() function for each item
// - Add 'editing' class to the item
// - Set input.value to display.textContent
// - Call input.focus() and input.select()

// Step 3: Create a save() function
// - If input.value.trim() is not empty, set display.textContent to the trimmed value
// - Remove 'editing' class from the item

// Step 4: Create a cancel() function
// - Reset input.value to display.textContent
// - Remove 'editing' class from the item

// Step 5: Wire up event listeners for each item
// - btn click => startEdit
// - display dblclick => startEdit
// - input keydown: Enter => save(), Escape => cancel()
// - input blur => save()
`,

  'js-custom-select': `const select = document.getElementById('custom-select');
const optionsList = document.getElementById('options');
const valueEl = document.getElementById('select-value');
const resultEl = document.getElementById('result');
const items = optionsList.querySelectorAll('li');
let activeIdx = -1;
let isOpen = false;

// Step 1: Create open() and close() functions
// open(): set isOpen = true, show optionsList (display: 'block'), set aria-expanded to 'true'
// close(): set isOpen = false, hide optionsList (display: 'none'), set aria-expanded to 'false',
//          reset activeIdx to -1, remove 'active' class from all items

// Step 2: Create a selectItem(li) function
// - Remove 'selected' class from all items
// - Add 'selected' class to the clicked li
// - Set valueEl.textContent to li.textContent
// - Set resultEl.textContent to 'Selected: ' + li.dataset.value
// - Call close()

// Step 3: Add click listener on select to toggle open/close

// Step 4: Add click listeners on each li to call selectItem

// Step 5: Add keydown listener on select for keyboard navigation
// - Enter/Space: if closed, open(); if open and activeIdx >= 0, selectItem
// - ArrowDown: open if closed, increment activeIdx (max items.length-1), update 'active' class, scrollIntoView
// - ArrowUp: decrement activeIdx (min 0), update 'active' class
// - Escape: close()

// Step 6: Close when clicking outside
// document.addEventListener('click', (e) => { if (!e.target.closest('.select-wrapper')) close(); });
`,

  'js-password-strength': `const pwInput = document.getElementById('pw-input');
const meterFill = document.getElementById('meter-fill');
const strengthLabel = document.getElementById('strength-label');
const rules = {
  len: { el: document.getElementById('rule-len'), test: function(v) { return v.length >= 8; } },
  upper: { el: document.getElementById('rule-upper'), test: function(v) { return /[A-Z]/.test(v); } },
  lower: { el: document.getElementById('rule-lower'), test: function(v) { return /[a-z]/.test(v); } },
  num: { el: document.getElementById('rule-num'), test: function(v) { return /[0-9]/.test(v); } },
  special: { el: document.getElementById('rule-special'), test: function(v) { return /[^A-Za-z0-9]/.test(v); } },
};

const levels = [
  { label: 'Very Weak', color: '#ef4444', width: '20%' },
  { label: 'Weak', color: '#f97316', width: '40%' },
  { label: 'Fair', color: '#eab308', width: '60%' },
  { label: 'Strong', color: '#22c55e', width: '80%' },
  { label: 'Very Strong', color: '#10b981', width: '100%' },
];

// Step 1: Add an 'input' event listener to pwInput
// - Get the current value from pwInput
// - Initialize a score counter at 0
// - Loop through Object.values(rules), run each rule's test(value)
//   - Toggle the 'pass' class on the rule's element based on the result
//   - Increment score if the test passes

// Step 2: Handle empty input
// - If value is empty, reset meterFill width to '0%', background to '#334155'
// - Set strengthLabel text to 'Enter a password' with color '#64748b'
// - Return early

// Step 3: Update the meter and label based on score
// - Get the level from the levels array using index Math.max(0, score - 1)
// - Set meterFill.style.width, meterFill.style.background, strengthLabel.textContent, strengthLabel.style.color
`,

  'js-dynamic-form': `const schema = [
  { name: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'John Doe' },
  { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'john@example.com' },
  { name: 'role', label: 'Role', type: 'select', options: ['Developer', 'Designer', 'Manager', 'QA'], required: true },
  { name: 'bio', label: 'Short Bio', type: 'textarea', required: false, placeholder: 'Tell us about yourself...' },
];

const form = document.getElementById('dynamic-form');
const output = document.getElementById('form-output');

// Step 1: Loop through each field in the schema and generate form elements
// For each field:
// - Create a div.field-group container
// - Create a <label> with the field's label text; if required, append <span class="req">*</span>
// - Create the appropriate input element based on field.type:
//   - 'select': create a <select> with a default "Select..." option + options from field.options
//   - 'textarea': create a <textarea> with placeholder if provided
//   - default: create an <input> with type and placeholder
// - Set input.name = field.name, and if required, set input.required = true
// - Create a div.field-error for validation messages
// - Append label, input, and error div to the group, then append group to form

// Step 2: Create and append a submit button
// const btn = document.createElement('button');
// btn.type = 'submit'; btn.textContent = 'Submit';
// form.appendChild(btn);

// Step 3: Add a 'submit' event listener on the form
// - e.preventDefault()
// - Loop through each .field-group, find its input and error div
// - If the field is required and input.value.trim() is empty, set error text and mark invalid
// - If all valid, collect data using Object.fromEntries(new FormData(form))
// - Show the output div and display JSON.stringify(data, null, 2)
`,

  'js-modal': `const backdrop = document.getElementById('backdrop');
const openBtn = document.getElementById('open-btn');
const cancelBtn = document.getElementById('cancel-btn');
const confirmBtn = document.getElementById('confirm-btn');
const status = document.getElementById('status');

// Step 1: Create an openModal() function
// - Add 'open' class to backdrop
// - Focus the confirmBtn for accessibility

// Step 2: Create a closeModal() function
// - Remove 'open' class from backdrop
// - Return focus to openBtn

// Step 3: Wire up event listeners
// - openBtn click => openModal()
// - cancelBtn click => closeModal(), then update status text to 'Cancelled'
//   with a grey background (rgba(100,116,139,0.2)) and color (#94a3b8)
// - confirmBtn click => closeModal(), then update status text to 'Action confirmed!'
//   with a green background (rgba(34,197,94,0.15)) and color (#22c55e)
// - backdrop click => if e.target === backdrop (clicked outside modal), closeModal()
// - document keydown => if Escape key and backdrop has 'open' class, closeModal()
`,

  'js-drag-drop': `const list = document.getElementById('sortable');
let dragItem = null;

// Step 1: Add a 'dragstart' event listener on the list (event delegation)
// - Set dragItem to e.target
// - Add 'dragging' class to e.target
// - Set e.dataTransfer.effectAllowed = 'move'

// Step 2: Add a 'dragend' event listener on the list
// - Remove 'dragging' class from e.target
// - Remove 'over' class from all .sortable-item elements
// - Reset dragItem to null

// Step 3: Add a 'dragover' event listener on the list
// - Call e.preventDefault()
// - Set e.dataTransfer.dropEffect = 'move'
// - Find the closest .sortable-item from e.target
// - If found and it's not the dragItem:
//   - Remove 'over' class from all items, add 'over' to the target
//   - Get the target's bounding rect, calculate the vertical midpoint
//   - If mouse is above midpoint, insertBefore(dragItem, target)
//   - If mouse is below midpoint, insertBefore(dragItem, target.nextSibling)

// Step 4: Add a 'drop' event listener on the list
// - Call e.preventDefault()
// - Remove 'over' class from all items
`,

  'js-sortable-table': `const data = [
  { name: 'Alice', role: 'Engineer', score: 92 },
  { name: 'Bob', role: 'Designer', score: 87 },
  { name: 'Carol', role: 'Manager', score: 95 },
  { name: 'Dave', role: 'Engineer', score: 78 },
  { name: 'Eve', role: 'Designer', score: 91 },
];

const tbody = document.getElementById('table-body');
const headers = document.querySelectorAll('.sortable-col');
let sortCol = null;
let sortDir = 'asc';

// Step 1: Create a renderTable(rows) function
// - Set tbody.innerHTML using rows.map() to generate <tr><td>...</td></tr> strings
// - Each row should display name, role, and score columns

// Step 2: Create a sortData(col, type) function
// - Return a sorted copy of data ([...data].sort(...))
// - If type is 'number', sort numerically based on sortDir
// - Otherwise, sort as lowercase strings based on sortDir

// Step 3: Add click listeners to each header (th)
// - Get the column name from th.dataset.col
// - If clicking the same column, toggle sortDir between 'asc' and 'desc'
// - If a new column, set sortCol and reset sortDir to 'asc'
// - Remove 'asc'/'desc' classes from all headers, add current sortDir to clicked header
// - Call renderTable(sortData(col, th.dataset.type))

// Step 4: Initial render
function renderTable(rows) {
  // Render table rows here
}

renderTable(data);
`,

  'js-tabs': `const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');

// Step 1: Create an activate(tab) function
// - Remove 'active' class and set aria-selected='false' on all tabs, set tabIndex=-1
// - Remove 'active' class from all panels
// - Add 'active' class to the given tab, set aria-selected='true', tabIndex=0
// - Find the panel whose id matches tab's aria-controls attribute, add 'active' class to it

// Step 2: Add click listeners to each tab
// tabs.forEach(tab => tab.addEventListener('click', () => activate(tab)));

// Step 3: Add keyboard navigation on the tab container (.tabs)
// Listen for 'keydown' on document.querySelector('.tabs'):
// - Get the index of document.activeElement within the tabs NodeList
// - ArrowRight: activate the next tab (wrap around with modulo)
// - ArrowLeft: activate the previous tab (wrap around)
// - Home: activate the first tab
// - End: activate the last tab
// - Prevent default for all handled keys
// - Focus the newly activated tab
`,

  'js-accordion': `const headers = document.querySelectorAll('.accordion-header');

// Step 1: Add a click listener to each accordion header
// For each header:
// - Get the next sibling element (the .accordion-body)
// - Check if current header's aria-expanded is 'true' (i.e., it's already open)
// - Close all panels: loop through all headers, set aria-expanded='false',
//   remove 'open' class from each header's nextElementSibling
// - If the clicked header was NOT already open, set its aria-expanded='true'
//   and add 'open' class to its body

// Step 2: Add keyboard support to each header
// Listen for 'keydown': if Enter or Space, call e.preventDefault() and trigger header.click()
`,

  'js-carousel': `const track = document.getElementById('track');
const slides = track.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots');
let current = 0;
let startX = 0;
let isDragging = false;

// Step 1: Generate dot indicators
// Loop through slides, create a div.dot for each
// Add 'active' class to the first dot
// Add a click listener on each dot to call goTo(index)
// Append each dot to dotsContainer

// Step 2: Create a goTo(idx) function
// - Clamp idx between 0 and slides.length - 1, assign to current
// - Set track.style.transform = 'translateX(-' + (current * 100) + '%)'
// - Toggle 'active' class on dots: active only if index matches current

// Step 3: Wire up prev/next buttons
// document.getElementById('prev-btn').addEventListener('click', () => goTo(current - 1));
// document.getElementById('next-btn').addEventListener('click', () => goTo(current + 1));

// Step 4: Add touch/pointer swipe support
// - pointerdown: set isDragging=true, save startX=e.clientX, disable track transition
// - pointermove: if dragging, calculate diff and apply translateX with calc()
// - pointerup: stop dragging, re-enable transition, if diff < -50 go next, > 50 go prev, else stay

// Step 5: Add keyboard navigation
// document keydown: ArrowLeft => goTo(current - 1), ArrowRight => goTo(current + 1)

function goTo(idx) {
  // Implement slide navigation here
}
`,

  'js-context-menu': `const area = document.getElementById('context-area');
const menu = document.getElementById('context-menu');
const log = document.getElementById('action-log');

// Step 1: Add a 'contextmenu' event listener to the area
// - Call e.preventDefault() to suppress the default browser menu
// - Show the menu (display: 'block')
// - Position the menu at the cursor: use e.clientX/e.clientY
//   but clamp so menu stays within viewport (e.g., Math.min(e.clientX, window.innerWidth - 200))
// - Focus the first .menu-item inside the menu

// Step 2: Hide the menu on any document click
// document.addEventListener('click', () => { menu.style.display = 'none'; });

// Step 3: Add a click listener on the menu (event delegation)
// - Find the closest .menu-item from e.target
// - If found, read its data-action attribute
// - Update log.textContent with the action name (capitalize first letter)
// - Hide the menu

// Step 4: Add keyboard navigation inside the menu
// Listen for 'keydown' on the menu:
// - ArrowDown: focus next .menu-item (wrap around)
// - ArrowUp: focus previous .menu-item (wrap around)
// - Escape: hide the menu, return focus to the area
`,

  'js-infinite-scroll': `const container = document.getElementById('scroll-container');
const itemsEl = document.getElementById('items');
const sentinel = document.getElementById('sentinel');
const loader = document.getElementById('loader');
let page = 0;
let loading = false;
const maxPages = 5;

// Step 1: Create a generateItems(page) function
// - Create an array of 8 items for the given page
// - Each item should have an id (page * 8 + i + 1) and text ('Item entry #' + id)
// - Return the array

// Step 2: Create a loadMore() function
// - If already loading or page >= maxPages, return early
// - Set loading = true, update loader text to 'Loading...'
// - Use setTimeout (600ms delay) to simulate async loading:
//   - Call generateItems(page) to get items
//   - For each item, create a div.scroll-item with the text and an id badge
//   - Append each div to itemsEl
//   - Increment page, set loading = false
//   - If page >= maxPages, update loader to 'All items loaded', add 'done' class, disconnect observer

// Step 3: Create an IntersectionObserver
// - Callback: if the sentinel is intersecting, call loadMore()
// - Options: { root: container, threshold: 0.1 }
// - Observe the sentinel element

// Step 4: Trigger initial load
// loadMore();
`,

  'js-toast-notifications': `const container = document.getElementById('toast-container');
const messages = {
  success: 'Operation completed successfully!',
  error: 'Something went wrong. Please try again.',
  info: 'Here is some helpful information.',
};

// Step 1: Create a showToast(type) function
// - Create a div.toast with class matching the type ('success', 'error', or 'info')
// - Set innerHTML to include a <span> with the message text and a close button (&times;)
// - Append the toast to the container

// Step 2: Animate the toast in
// Use double requestAnimationFrame to trigger the CSS transition:
// requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));

// Step 3: Create a dismiss function
// - Remove 'show' class to trigger slide-out animation
// - After 300ms (matching CSS transition), remove the toast element from DOM

// Step 4: Auto-dismiss and close button
// - Add a click listener on the .close-toast button to call dismiss
// - Set a setTimeout of 3000ms to auto-dismiss

// Step 5: Wire up the trigger buttons
// document.querySelectorAll('.toast-btn').forEach(btn => {
//   btn.addEventListener('click', () => showToast(btn.dataset.type));
// });
`,

  'js-wizard': `const steps = document.querySelectorAll('.step');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressFill = document.getElementById('progress-fill');
const indicator = document.getElementById('steps-indicator');
const errorMsg = document.getElementById('error-msg');
let current = 0;

// Step 1: Generate step indicator dots
// Loop through steps, create div.step-dot for each with textContent = index + 1
// Add 'active' class to the first dot
// Append each dot to the indicator container

// Step 2: Create a goToStep(idx) function
// - Remove 'active' class from all steps, add 'active' to steps[idx]
// - Set current = idx
// - Disable prevBtn if idx === 0
// - Set nextBtn text to 'Finish' if on last step, otherwise 'Next'
// - Update progressFill.style.width to ((idx + 1) / steps.length * 100) + '%'
// - Update step dots: add 'done' class if index < idx, 'active' if index === idx
// - Clear errorMsg
// - If on the last step (idx === 2), populate the #summary div with name and email values

// Step 3: Add click listeners
// nextBtn: validate current step first
//   - Step 0: check #name-input is not empty
//   - Step 1: check #email-input is not empty
//   - Last step: set nextBtn text to 'Done!' and disable it
//   - Otherwise: call goToStep(current + 1)
// prevBtn: if current > 0, call goToStep(current - 1)
`,

  'js-search-filter': `const items = [
  { name: 'Apple', cat: 'fruit' },
  { name: 'Banana', cat: 'fruit' },
  { name: 'Carrot', cat: 'veggie' },
  { name: 'Cherry', cat: 'fruit' },
  { name: 'Broccoli', cat: 'veggie' },
  { name: 'Grape', cat: 'fruit' },
  { name: 'Spinach', cat: 'veggie' },
  { name: 'Mango', cat: 'fruit' },
];

const input = document.getElementById('search-input');
const results = document.getElementById('results');
const noResults = document.getElementById('no-results');
const tags = document.querySelectorAll('.tag');
let activeCat = 'all';
let debounceTimer;

// Step 1: Create a render() function
// - Get the trimmed, lowercased query from input.value
// - Filter items by activeCat (if not 'all', only items matching the category)
// - Further filter by query (case-insensitive name includes query)
// - Clear results.innerHTML
// - If no matches, show noResults element (display: 'block') and return
// - Otherwise hide noResults (display: 'none')
// - For each matched item, create an <li> with:
//   - The item name (with matching text wrapped in <mark> tags if query is present)
//   - A span.cat showing the category
//   - Append to results

// Step 2: Add debounced input listener
// input 'input' event => clearTimeout(debounceTimer), setTimeout(render, 200)

// Step 3: Add category tag click listeners
// Each .tag click:
// - Remove 'active' class from all tags, add to clicked tag
// - Set activeCat = tag.dataset.cat
// - Call render()

function render() {
  // Implement search and filter rendering here
}

render();
`,

  'js-gallery': `const images = [
  { bg: '#1e3a5f', label: 'Ocean', letter: 'A' },
  { bg: '#3b1f5e', label: 'Cosmos', letter: 'B' },
  { bg: '#1f4a3b', label: 'Forest', letter: 'C' },
  { bg: '#5e3b1f', label: 'Desert', letter: 'D' },
  { bg: '#1f3b5e', label: 'Mountain', letter: 'E' },
  { bg: '#4a1f3b', label: 'Sunset', letter: 'F' },
];

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lbContent = document.getElementById('lb-content');
const lbCaption = document.getElementById('lb-caption');
let ci = 0;

// Step 1: Generate the thumbnail grid
// Loop through images array, for each:
// - Create a div.gallery-thumb
// - Set style.background to img.bg
// - Set textContent to img.letter
// - Add click listener: set ci to the index, call update(), show lightbox (display: 'flex')
// - Append to gallery

// Step 2: Create an update() function
// - Get the current image from images[ci]
// - Set lbContent.style.background and lbContent.textContent
// - Set lbCaption.textContent to "Label (index/total)"

// Step 3: Wire up lightbox controls
// - lb-close click => hide lightbox (display: 'none')
// - lb-prev click => ci = (ci - 1 + images.length) % images.length, call update()
// - lb-next click => ci = (ci + 1) % images.length, call update()
// - lightbox click => if e.target is lightbox itself (not children), hide it

// Step 4: Keyboard navigation
// document keydown: if lightbox is hidden, return
// - Escape: hide lightbox
// - ArrowLeft: go to previous image, update()
// - ArrowRight: go to next image, update()

function update() {
  // Update lightbox content here
}
`,

  'js-cards-grid': `const cards = [
  { icon: '&#9889;', title: 'Performance', desc: 'Optimize load times', tag: 'Core', tc: 'tag-blue' },
  { icon: '&#128274;', title: 'Security', desc: 'Protect against threats', tag: 'Critical', tc: 'tag-orange' },
  { icon: '&#9834;', title: 'Accessibility', desc: 'Build inclusive UIs', tag: 'UX', tc: 'tag-green' },
  { icon: '&#128295;', title: 'Testing', desc: 'Write reliable tests', tag: 'Core', tc: 'tag-blue' },
  { icon: '&#127912;', title: 'Design System', desc: 'Consistent components', tag: 'UX', tc: 'tag-green' },
  { icon: '&#128640;', title: 'Deployment', desc: 'Automate CI/CD', tag: 'DevOps', tc: 'tag-orange' },
];

const grid = document.getElementById('card-grid');

// Step 1: Loop through the cards array
// For each card:
// - Create a div.card element
// - Set innerHTML to include:
//   - div.card-icon with the card's icon HTML entity
//   - div.card-title with the card's title
//   - div.card-desc with the card's description
//   - span.card-tag with the tag text, add the tc class (e.g., 'tag-blue')
// - Append the card to the grid
`,

  'js-table-sort-filter': `const data = [
  { name: 'Alice', dept: 'Eng', salary: 95000 },
  { name: 'Bob', dept: 'Design', salary: 82000 },
  { name: 'Carol', dept: 'Marketing', salary: 78000 },
  { name: 'Dave', dept: 'Eng', salary: 105000 },
  { name: 'Eve', dept: 'Design', salary: 88000 },
  { name: 'Frank', dept: 'Marketing', salary: 72000 },
  { name: 'Grace', dept: 'Eng', salary: 98000 },
];

const tb = document.getElementById('tb');
const fi = document.getElementById('tf');
const rc = document.getElementById('trc');
const pp = document.getElementById('tp');
let sc = null;
let sd = 'asc';
let fv = '';
let pg = 0;
const ps = 4;

// Step 1: Create a getRows() function
// - Start with a copy of data: let r = [...data]
// - If fv (filter value) is set, filter rows where name includes fv (case-insensitive)
// - If sc (sort column) is set, sort the rows:
//   - For numbers: compare numerically based on sd ('asc'/'desc')
//   - For strings: use localeCompare based on sd
// - Return the filtered/sorted array

// Step 2: Create a render() function
// - Call getRows() to get filtered/sorted data
// - Calculate total pages: Math.ceil(rows.length / ps)
// - Clamp pg to valid range
// - Slice rows for current page: rows.slice(pg * ps, (pg + 1) * ps)
// - Set tb.innerHTML to <tr> rows with name, dept, and formatted salary ($X,XXX)
// - Update rc.textContent with "X of Y" count
// - Generate page buttons in pp: for each page, create a button.pg
//   with 'active' class on current page, click handler to change pg and re-render

// Step 3: Add sort listeners on each .sc (sortable column) header
// - Read th.dataset.col, toggle sd if same column, reset to 'asc' if new column
// - Update header classes (asc/desc)
// - Call render()

// Step 4: Add filter input listener
// fi 'input' event => set fv to lowercased value, reset pg to 0, call render()

// Step 5: Add CSV export listener on #te
// - Build CSV string from getRows() with "Name,Dept,Salary" header
// - Create a Blob and trigger download with a temporary <a> element

// Step 6: Initial render
function render() {
  // Implement table rendering with pagination here
}

render();
`,

  'js-lazy-images': `const colors = ['#1e3a5f', '#3b1f5e', '#1f4a3b', '#5e3b1f', '#1f3b5e', '#4a1f3b', '#2d3a1f', '#3a1f2d'];
const grid = document.getElementById('lazy-grid');

// Step 1: Generate image placeholder items
// Loop through colors, for each (color, index):
// - Create a div.lazy-item
// - Set innerHTML to include:
//   - div.lazy-placeholder with text 'Loading...'
//   - div.lazy-img with background color set to the color, text content = index + 1
// - Append to grid

// Step 2: Create an IntersectionObserver
// - In the callback, loop through entries
// - For each intersecting entry:
//   - Find the .lazy-img element inside the target
//   - Use setTimeout with a random delay (300 + Math.random() * 700) to simulate loading
//   - Inside the timeout: add 'loaded' class to the img, remove the .lazy-placeholder element
//   - Unobserve the target after triggering

// Step 3: Observe all .lazy-item elements
// document.querySelectorAll('.lazy-item').forEach(item => observer.observe(item));
`,

  'js-data-chart': `const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');
const tooltip = document.getElementById('tooltip');

const data = [
  { l: 'Jan', v: 42 },
  { l: 'Feb', v: 58 },
  { l: 'Mar', v: 35 },
  { l: 'Apr', v: 72 },
  { l: 'May', v: 65 },
  { l: 'Jun', v: 88 },
];

const maxVal = Math.max(...data.map(function(d) { return d.v; }));
const padding = { t: 20, r: 20, b: 30, l: 40 };
const chartWidth = canvas.width - padding.l - padding.r;
const chartHeight = canvas.height - padding.t - padding.b;
const barWidth = chartWidth / data.length - 8;
const rects = [];

// Step 1: Create a draw() function
// - Clear the canvas: ctx.clearRect(0, 0, canvas.width, canvas.height)
// - Draw horizontal grid lines (5 lines from top to bottom of chart area)
//   - For each line, draw from padding.l to canvas.width - padding.r
//   - Label the Y axis with the value at that level
// - Draw bars for each data point:
//   - Calculate bar height as (d.v / maxVal) * chartHeight
//   - Calculate x position within the chart area
//   - Draw a filled rectangle with rounded top corners using ctx.roundRect or ctx.fillRect
//   - Store each bar's {x, y, w, h, label, value} in the rects array
//   - Draw the month label centered below each bar

// Step 2: Add mousemove listener on the canvas for tooltips
// - Convert mouse coordinates to canvas coordinates (account for canvas scaling)
// - Check if mouse is inside any bar rectangle
// - If inside, show tooltip with label and value, position near cursor
// - If not inside any bar, hide the tooltip

// Step 3: Add mouseleave listener to hide tooltip

function draw() {
  // Implement bar chart drawing here
}

draw();
`,

  'js-virtual-scroll': `const TOTAL = 10000;
const ROW_HEIGHT = 40;
const container = document.getElementById('vsc');
const spacer = document.getElementById('vsp');
const content = document.getElementById('vsn');

// Set the spacer height to simulate the full list height
spacer.style.height = (TOTAL * ROW_HEIGHT) + 'px';

// Step 1: Create a render() function
// - Calculate the scroll position: container.scrollTop
// - Calculate how many rows are visible: Math.ceil(container.clientHeight / ROW_HEIGHT) + 2 (buffer)
// - Calculate the start index: Math.floor(scrollTop / ROW_HEIGHT)
// - Calculate the end index: Math.min(startIndex + visibleCount, TOTAL)
// - Position the content container: content.style.top = (startIndex * ROW_HEIGHT) + 'px'
// - Clear content.innerHTML
// - For each row from startIndex to endIndex:
//   - Create a div.vsr with the item text ("Item #N") and a padded index string
//   - Append to content

// Step 2: Add scroll listener
// container.addEventListener('scroll', render);

// Step 3: Initial render
function render() {
  // Implement virtual scroll rendering here
}

render();
`,

  'js-navbar': `const hb = document.getElementById('hb');
const nl = document.getElementById('nl');
const pd = document.getElementById('pd');
const links = document.querySelectorAll('.nk');

// Step 1: Add hamburger toggle
// hb click => toggle 'open' class on nl (the nav list)

// Step 2: Add click listeners to each nav link
// For each link:
// - Prevent default
// - Remove 'active' class from all links, add to the clicked one
// - Update pd.textContent to the capitalized page name (from link.dataset.page)
// - Remove 'open' class from nl (close mobile menu)
`,

  'js-sidebar': `const sb = document.getElementById('sb');
const ov = document.getElementById('ov');
const os = document.getElementById('os');
const cs = document.getElementById('cs');

// Step 1: Create openSidebar() and closeSidebar() functions
// openSidebar(): add 'open' class to both sb and ov
// closeSidebar(): remove 'open' class from both sb and ov

// Step 2: Wire up event listeners
// - os (open button) click => openSidebar()
// - cs (close button) click => closeSidebar()
// - ov (overlay) click => closeSidebar()
// - document keydown => if Escape and sidebar is open, closeSidebar()

// Step 3: Add active link handling for sidebar navigation
// For each .sl link:
// - Prevent default
// - Remove 'active' class from all .sl links, add to the clicked one
`,

  'js-breadcrumbs': `const bc = document.getElementById('bc');
const cp = document.getElementById('cp');

// Step 1: Create an update(path) function
// - Split the path by '/' and filter out empty strings to get segments
// - Clear bc.innerHTML
// - Create the Home breadcrumb <li>:
//   - If no segments, render as current page: <span class="cur" aria-current="page">Home</span>
//   - If there are segments, render as a link: <a href="#">Home</a>
//     with a click listener that calls update('/')
// - Loop through segments:
//   - Capitalize each segment (first letter uppercase)
//   - If it's the last segment, render as current page span
//   - Otherwise, render as a clickable link; on click, call update with the sub-path
//     (e.g., '/' + segs.slice(0, i+1).join('/'))
// - Update cp.textContent to the current path

// Step 2: Wire up the navigation buttons
// For each .pbtn button:
// - Add click listener that calls update(btn.dataset.path)

// Step 3: Initialize with root path
// update('/');

function update(path) {
  // Implement breadcrumb generation here
}

update('/');
`,

  'js-bottom-nav': `const sa = document.getElementById('sa');
const bn = document.getElementById('bn');
let lastScroll = 0;

// Step 1: Add a scroll listener to the scroll area (sa)
// - Get current scroll position: sa.scrollTop
// - If scrolling down (current > lastScroll) and past threshold (> 40), add 'hidden' class to bn
// - If scrolling up, remove 'hidden' class from bn
// - Update lastScroll = current

// Step 2: Add active tab handling
// For each .bi (bottom nav item):
// - Add click listener
// - Remove 'active' from all .bi items, add to the clicked one
`,

  'js-dropdown-menu': `const ds = document.getElementById('ds');

// Step 1: For each .dd (dropdown container), get references:
// - const trigger = dd.querySelector('.mt')
// - const list = dd.querySelector('.dl')
// - const menuItems = list.querySelectorAll('[role="menuitem"]')
// - let focusIndex = -1

// Step 2: Create open() and close() functions for each dropdown
// open():
//   - Close all other dropdowns first (remove 'open' from all .dl, set aria-expanded='false')
//   - Add 'open' class to this list, set trigger's aria-expanded='true'
//   - Reset focusIndex to -1
// close():
//   - Remove 'open' class from list, set trigger's aria-expanded='false'
//   - Reset focusIndex, remove 'foc' class from all items

// Step 3: Add trigger click listener to toggle open/close

// Step 4: Add click listeners on each menu item
// - Update ds.textContent with 'Selected: ' + item text
// - Call close()

// Step 5: Add keyboard navigation
// On trigger keydown:
// - ArrowDown or Enter: preventDefault, open(), focus first item
// On list keydown:
// - ArrowDown: move focus to next item
// - ArrowUp: move focus to previous item
// - Enter: click the focused item
// - Escape: close(), focus trigger

// Step 6: Close all dropdowns when clicking outside
// document.addEventListener('click', (e) => { if (!e.target.closest('.dd')) closeAll(); });
`,

  'js-pagination': `const allItems = Array.from({ length: 30 }, function(_, i) { return 'Item #' + (i + 1); });
const perPage = 5;
let currentPage = 1;
const totalPages = Math.ceil(allItems.length / perPage);

const pi = document.getElementById('pi');
const pg = document.getElementById('pg');

// Step 1: Create a render() function
// - Calculate the start index: (currentPage - 1) * perPage
// - Slice allItems for the current page
// - Set pi.innerHTML to div.pit elements for each item
// - Clear pg.innerHTML
// - Create a "prev" button (disabled if on page 1), add click listener to decrement and re-render
// - Create numbered page buttons (1 through totalPages)
//   - Add 'active' class if it matches currentPage
//   - Add click listener to set currentPage and re-render
// - Create a "next" button (disabled if on last page), add click listener to increment and re-render

function render() {
  // Implement paginated item display here
}

render();
`,

  'js-keyboard-shortcuts': `const so = document.getElementById('so');
const kd = document.getElementById('kd');

const shortcuts = {
  'ctrl+b': 'Bold applied',
  'ctrl+i': 'Italic applied',
  'ctrl+s': 'Document saved',
  'ctrl+d': 'Item deleted',
  'escape': 'Cleared',
};

// Step 1: Add a 'keydown' event listener on document
// - Build the key combination string:
//   - Start with an empty array of parts
//   - If e.ctrlKey or e.metaKey, push 'ctrl'
//   - If e.shiftKey, push 'shift'
//   - If e.altKey, push 'alt'
//   - Get the key name: e.key.toLowerCase()
//   - If the key is not a modifier itself ('control','shift','alt','meta'), push it
//   - Join parts with '+'
// - Display the raw key combo in kd.textContent

// Step 2: Check if the combo matches a shortcut
// - If shortcuts[combo] exists:
//   - Call e.preventDefault() to block browser defaults (e.g., Ctrl+S save dialog)
//   - Set so.textContent to the shortcut's action message
//   - Add 'act' class to so for visual feedback
//   - Use setTimeout to remove 'act' class after 600ms
`,

  'js-notifications': `const nli = document.getElementById('nli');
const ne = document.getElementById('ne');

const notifications = [
  { t: 'info', title: 'New message', text: 'You have a new message from Alice' },
  { t: 'success', title: 'Deploy complete', text: 'Production deployment succeeded' },
  { t: 'warning', title: 'Storage warning', text: 'Storage usage is above 80%' },
  { t: 'info', title: 'Update available', text: 'Version 2.1.0 ready' },
];

let notifIndex = 0;

// Step 1: Create an addNotification() function
// - Hide the empty state element (ne.style.display = 'none')
// - Get the next notification from the array using notifIndex % notifications.length
// - Increment notifIndex
// - Create a div.ni with innerHTML containing:
//   - A colored dot indicator (div.ndt with the notification type as class)
//   - A body div (div.nbd) with:
//     - Title (div.ntt)
//     - Text (div.ntx)
//     - Timestamp (div.ntm) using new Date().toLocaleTimeString()
// - Insert the new notification at the top of nli (insertBefore with nli.firstChild)

// Step 2: Wire up the Send Notification button (#sn)
// document.getElementById('sn').addEventListener('click', addNotification);

// Step 3: Wire up the Clear All button (#cn)
// - Remove all .ni elements from nli
// - Show the empty state (ne.style.display = 'block')
`,

  'js-undo-redo': `const uc = document.getElementById('uc');
const undoBtn = document.getElementById('ub');
const redoBtn = document.getElementById('rb');
const ui = document.getElementById('ui');
const colors = ['#3b82f6', '#22c55e', '#ef4444', '#eab308', '#a855f7', '#ec4899'];
let items = [];
let history = [[]];
let historyIndex = 0;
let counter = 0;

// Step 1: Create a pushState() function
// - Slice history to discard any states after current position: history = history.slice(0, historyIndex + 1)
// - Push a deep copy of items: history.push(JSON.parse(JSON.stringify(items)))
// - Set historyIndex to the new last index
// - Call updateUI()

// Step 2: Create an updateUI() function
// - Clear uc.innerHTML
// - Loop through items, create div.ci for each with background color and id text
// - Add click listener on each chip to remove it from items and call pushState()
// - Disable/enable undo/redo buttons based on historyIndex position
// - Update ui.textContent with history length and current position

// Step 3: Create undo() and redo() functions
// undo(): if historyIndex > 0, decrement it, restore items from history[historyIndex], call updateUI()
// redo(): if historyIndex < history.length - 1, increment it, restore items, call updateUI()

// Step 4: Wire up the Add button (#ab)
// Increment counter, push new item with id and color (cycling through colors array), call pushState()

// Step 5: Wire up undo/redo buttons and keyboard shortcuts
// undoBtn click => undo()
// redoBtn click => redo()
// document keydown: Ctrl+Z => undo(), Ctrl+Y => redo()

// Step 6: Initialize
// updateUI();

function updateUI() {
  // Implement UI update here
}

updateUI();
`,

  'js-clipboard': `const ci = document.getElementById('ci');
const pi = document.getElementById('pi');
const cst = document.getElementById('cst');

// Step 1: Create a show(message, isSuccess) helper
// - Set cst.textContent to the message
// - Set cst.className to 'cst ok' if success, 'cst er' if failure
// - After 2000ms, clear the text and reset className to 'cst'

// Step 2: Create an async copyText(text) function
// - Try using navigator.clipboard.writeText(text)
// - On success, call show() with a "Copied" message
// - If it fails (catch), use the fallback:
//   - Create a temporary textarea, set its value, append to body
//   - Select it, run document.execCommand('copy'), then remove the textarea
//   - Call show() with a "Copied (fallback)" message

// Step 3: Wire up the Copy button (#cb)
// Click => call copyText(ci.value)

// Step 4: Wire up the Paste button (#pb)
// Click => try navigator.clipboard.readText(), set pi.value to the result
// If denied, show an error message telling user to use Ctrl+V

// Step 5: Wire up quick copy snippet buttons (.snb)
// For each .snb, click => call copyText(btn.dataset.text)
`,

  'js-local-storage': `const STORAGE_KEY = 'demo-notes';
const ni = document.getElementById('ni');
const nl = document.getElementById('nl');
const si = document.getElementById('si');

// Step 1: Create a load() function
// - Try to parse localStorage.getItem(STORAGE_KEY) as JSON
// - Return the parsed array, or an empty array if null or parse error

// Step 2: Create a save(notes) function
// - Call localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))

// Step 3: Create a render() function
// - Call load() to get the notes array
// - Clear nl.innerHTML
// - For each note, create an li.nit with:
//   - span.tx showing the note text
//   - span.tm showing the timestamp
//   - button.dl (&times;) with click handler that splices the note, saves, and re-renders
// - Update si.textContent with count and byte size

// Step 4: Wire up the Add button (#an)
// - Get trimmed value from ni input
// - If empty, return
// - Load existing notes, unshift new note with text and current time
// - Save, clear input, re-render

// Step 5: Wire up Enter key on input
// ni keydown: if Enter, trigger the Add button click

// Step 6: Wire up Clear All button (#ca)
// Click => localStorage.removeItem(STORAGE_KEY), re-render

// Step 7: Cross-tab sync
// window.addEventListener('storage', (e) => { if (e.key === STORAGE_KEY) render(); });

function render() {
  // Implement note list rendering here
}

render();
`,

  'js-loading-skeleton': `const realData = [
  { name: 'Alice Johnson', text: 'Working on the dashboard', color: '#3b82f6', initial: 'A' },
  { name: 'Bob Smith', text: 'Reviewing pull requests', color: '#22c55e', initial: 'B' },
  { name: 'Carol Davis', text: 'Setting up CI/CD', color: '#a855f7', initial: 'C' },
];

let isLoading = true;

// Step 1: Create a showSkeletons() function
// For each .skd container, set innerHTML to a skeleton layout:
// - A flex row (.skr) containing:
//   - A circular skeleton (.sk .ska) for the avatar
//   - A body div (.skb) with:
//     - A title skeleton (.sk .skt) - 60% width, 14px height
//     - A text skeleton (.sk .skx) - 90% width, 10px height
//     - A short skeleton (.sk .sks) - 50% width, 10px height

// Step 2: Create a showRealContent() function
// For each .skd container (at index i), set innerHTML to real content:
// - A flex row (.rr) containing:
//   - A colored avatar circle (.ra) with the initial letter
//   - A text block with name (.rt) and description (.rx)

// Step 3: Wire up the Toggle Loading button (#tl)
// On click:
// - Toggle isLoading boolean
// - If isLoading, call showSkeletons()
// - If not loading, use setTimeout(showRealContent, 800) to simulate loading delay

// Step 4: Initialize with skeletons
// showSkeletons();
`,

  'js-empty-states': `const scenes = {
  inbox: {
    icon: '&#128236;',
    title: 'Your inbox is empty',
    text: 'When you receive new messages, they will appear here.',
    btn: 'Compose Message',
    cls: 'ebp',
  },
  search: {
    icon: '&#128269;',
    title: 'No results found',
    text: 'Try adjusting your search terms or filters.',
    btn: 'Clear Filters',
    cls: 'ebs',
  },
  error: {
    icon: '&#9888;',
    title: 'Something went wrong',
    text: 'We could not load this content. Please try again.',
    btn: 'Retry',
    cls: 'ebp',
  },
};

const es = document.getElementById('es');
const sceneTabs = document.querySelectorAll('.stb');

// Step 1: Create a show(sceneName) function
// - Get the scene data from the scenes object
// - Set es.innerHTML to:
//   - div.ei with the icon
//   - div.etl with the title
//   - div.etx with the description text
//   - button.eb with the btn text and the appropriate cls class

// Step 2: Wire up the scene tab buttons
// For each .stb:
// - Add click listener
// - Remove 'active' class from all tabs, add to clicked
// - Call show(tab.dataset.scene)

// Step 3: Show initial scene
// show('inbox');

function show(sceneName) {
  // Implement empty state rendering here
}

show('inbox');
`,

  'js-image-zoom': `const zc = document.getElementById('zc');
const zl = document.getElementById('zl');
const zp = document.getElementById('zp');
const zoomFactor = 3;

// Step 1: Clone the grid for the preview panel
// - Get the original grid: zc.querySelector('.zg')
// - Clone it with cloneNode(true)
// - Scale the clone: set width and height to (original dimension * zoomFactor) + 'px'
// - Increase font sizes in the clone's children to match the zoom level
// - Append the clone to zp (the preview panel)

// Step 2: Show lens and preview on mouseenter
// zc mouseenter => set zl.style.display = 'block', zp.style.display = 'block'

// Step 3: Hide lens and preview on mouseleave
// zc mouseleave => set zl.style.display = 'none', zp.style.display = 'none'

// Step 4: Add mousemove listener on zc to track the lens position
// - Get the bounding rect of zc
// - Calculate x, y relative to the container, centered on the lens
// - Clamp x, y so the lens stays within bounds
// - Position the lens: zl.style.left = x + 'px', zl.style.top = y + 'px'
// - Update the cloned grid's transform: translate(-x*zoomFactor, -y*zoomFactor)
`,

  'js-toggle-switch': `const toggles = [
  { id: 'tw', statusId: 'sw' },
  { id: 'tb', statusId: 'sb' },
  { id: 'td', statusId: 'sd' },
];

// Step 1: For each toggle configuration:
// - Get the checkbox input by id
// - Get the status label element by statusId

// Step 2: Create an updateStatus() function for each toggle
// - Set the status element's textContent to 'On' if checked, 'Off' if unchecked
// - Set the status element's color to '#3b82f6' if checked, '#64748b' if unchecked

// Step 3: Add 'change' event listener on each checkbox input
// On change => call updateStatus()

// Step 4: Initialize each toggle's display
// Call updateStatus() for each toggle immediately
`,

  // ── forms-input ──────────────────────────────────────────────

  'js-rating-stars': `const container = document.getElementById('stars-container');
const output = document.getElementById('rating-output');
let currentRating = 0;

// Step 1: Generate 5 star elements
// Loop 1-5, create span.star for each with textContent '★'
// Add data-value attribute matching the index
// Append each star to the container

// Step 2: Add mouseover listener (event delegation on container)
// Get the hovered star's data-value, highlight all stars up to that value
// by adding 'hovered' class; remove 'hovered' from stars above it

// Step 3: Add mouseout listener to remove all 'hovered' classes
// Restore the 'selected' classes based on currentRating

// Step 4: Add click listener to set the rating
// Set currentRating to the clicked star's data-value
// Add 'selected' class to all stars up to currentRating
// Update output.textContent with the chosen rating
`,

  'js-tag-input': `const input = document.getElementById('tag-input');
const tagList = document.getElementById('tag-list');
const hiddenField = document.getElementById('tags-value');
let tags = [];

// Step 1: Create addTag(text) function
// Trim and lowercase the text; if empty or already in tags array, return
// Push to tags array, create span.tag with text and a remove button (×)
// Append to tagList, update hiddenField.value with tags joined by commas

// Step 2: Create removeTag(text) function
// Filter the text out of tags array, remove the span from DOM
// Update hiddenField.value

// Step 3: Listen for keydown on input
// On Enter or comma: preventDefault, call addTag(input.value), clear input
// On Backspace when input is empty: remove the last tag

// Step 4: Add click delegation on tagList
// If click target is a remove button, call removeTag for its parent tag
`,

  'js-multi-select': `const trigger = document.getElementById('ms-trigger');
const dropdown = document.getElementById('ms-dropdown');
const selectedContainer = document.getElementById('ms-selected');
let selected = new Set();

// Step 1: Toggle dropdown on trigger click
// Add/remove 'open' class on dropdown, set aria-expanded on trigger

// Step 2: Add click listeners on each .ms-option in the dropdown
// Toggle the option's data-value in the selected Set
// Toggle 'checked' class on the option
// Call renderSelected()

// Step 3: Create renderSelected() function
// Clear selectedContainer, loop through selected values
// Create span.ms-chip for each with text and remove button
// Update trigger text to show count or placeholder

// Step 4: Close dropdown when clicking outside
// document click: if target is not inside the multi-select wrapper, close dropdown
`,

  'js-otp-input': `const inputs = document.querySelectorAll('.otp-digit');
const result = document.getElementById('otp-result');

// Step 1: Add input event listener to each digit field
// On input: if value length === 1, move focus to the next input
// If value length > 1, keep only the last character

// Step 2: Add keydown listener for backspace navigation
// On Backspace: if the field is empty, move focus to previous input
// Clear the previous input value

// Step 3: Add paste handler on the first input
// Listen for 'paste', get clipboard text, split into characters
// Fill each input with one character, focus the last filled input

// Step 4: Create a checkComplete() function
// Gather all input values; if all 6 filled, show result with the code
// Call checkComplete() after each input and paste event
`,

  'js-credit-card-input': `const cardNumber = document.getElementById('cc-number');
const cardName = document.getElementById('cc-name');
const cardExpiry = document.getElementById('cc-expiry');
const cardCvc = document.getElementById('cc-cvc');
const preview = document.getElementById('cc-preview');

// Step 1: Format card number with spaces every 4 digits
// Add input listener on cardNumber: strip non-digits, limit to 16
// Insert space after every 4 digits, update preview display

// Step 2: Format expiry as MM/YY
// Add input listener on cardExpiry: strip non-digits, limit to 4
// Insert '/' after first 2 digits

// Step 3: Limit CVC to 3-4 digits
// Add input listener on cardCvc: strip non-digits, limit to 4

// Step 4: Update card preview on any input change
// Mirror cardNumber (with masking), cardName, and cardExpiry to preview elements
// Detect card type (Visa starts 4, MC starts 5, Amex starts 3) and show icon
`,

  'js-address-form': `const form = document.getElementById('address-form');
const countrySelect = document.getElementById('addr-country');
const stateGroup = document.getElementById('state-group');
const zipInput = document.getElementById('addr-zip');
const output = document.getElementById('addr-output');

// Step 1: Show/hide state field based on country selection
// Add change listener on countrySelect
// If country is 'US' or 'CA', show stateGroup; otherwise hide it

// Step 2: Apply zip code formatting based on country
// US: 5 digits or 5+4 format (XXXXX-XXXX)
// CA: alternating letter-number (A1A 1A1)
// Other: allow alphanumeric up to 10 chars

// Step 3: Validate required fields on submit
// preventDefault, loop through required inputs
// Check each is non-empty, show inline error if empty
// If all valid, display formatted address in output

// Step 4: Add real-time validation feedback
// On blur of each required field, validate and toggle valid/invalid classes
`,

  'js-survey-form': `const form = document.getElementById('survey-form');
const steps = document.querySelectorAll('.survey-step');
const progress = document.getElementById('survey-progress');
let currentStep = 0;

// Step 1: Create showStep(index) function
// Hide all steps, show steps[index]
// Update progress bar width to ((index + 1) / steps.length * 100) + '%'
// Update prev/next button states

// Step 2: Add next button handler with validation
// Check current step's required fields are filled
// If radio group, ensure one is selected
// If textarea, ensure non-empty
// Show error if invalid, otherwise advance to next step

// Step 3: Add previous button handler
// Decrement currentStep, call showStep()

// Step 4: Handle final submission
// On last step's submit, gather all form data with FormData
// Display summary of all answers in a results panel
`,

  'js-textarea-autogrow': `const textarea = document.getElementById('autogrow-textarea');
const charCount = document.getElementById('char-count');
const maxChars = 500;

// Step 1: Create resize() function
// Reset textarea.style.height to 'auto'
// Set textarea.style.height to textarea.scrollHeight + 'px'

// Step 2: Add input listener to textarea
// Call resize() to adjust height
// Update charCount with current length vs maxChars
// Add 'warning' class if within 50 chars of limit, 'error' if at limit

// Step 3: Enforce character limit
// If textarea.value.length > maxChars, truncate to maxChars

// Step 4: Handle initial content
// Call resize() on page load to handle pre-filled content
// Set initial char count display
`,

  'js-phone-input': `const phoneInput = document.getElementById('phone-number');
const countryCode = document.getElementById('phone-country');
const formatted = document.getElementById('phone-formatted');

const formats = {
  US: { code: '+1', mask: '(XXX) XXX-XXXX', maxDigits: 10 },
  UK: { code: '+44', mask: 'XXXX XXX XXXX', maxDigits: 11 },
  DE: { code: '+49', mask: 'XXXX XXXXXXX', maxDigits: 11 },
};

// Step 1: Create formatPhone(digits, country) function
// Get the format for the country, strip non-digits, limit to maxDigits
// Replace X placeholders with digits progressively
// Return the formatted string with country code prefix

// Step 2: Add input listener on phoneInput
// Strip non-digits, reformat, set phoneInput.value to formatted result
// Update formatted.textContent with full international format

// Step 3: Add change listener on countryCode select
// Clear phoneInput, update placeholder with the country mask
// Refocus phoneInput

// Step 4: Validate on blur
// Check digit count matches expected maxDigits
// Toggle valid/invalid classes and show error message if incomplete
`,

  'js-currency-input': `const amountInput = document.getElementById('currency-amount');
const currencySelect = document.getElementById('currency-type');
const display = document.getElementById('currency-display');

const currencies = {
  USD: { symbol: '$', locale: 'en-US', code: 'USD' },
  EUR: { symbol: '\\u20ac', locale: 'de-DE', code: 'EUR' },
  GBP: { symbol: '\\u00a3', locale: 'en-GB', code: 'GBP' },
  JPY: { symbol: '\\u00a5', locale: 'ja-JP', code: 'JPY', decimals: 0 },
};

// Step 1: Create formatCurrency(value, currency) function
// Parse the raw digits, insert decimal point (2 places, or 0 for JPY)
// Use Intl.NumberFormat with the locale and currency code
// Return formatted string

// Step 2: Add input listener on amountInput
// Strip non-digits, reformat and update both input display and preview
// Maintain cursor position after formatting

// Step 3: Add change listener on currencySelect
// Reformat the current value with new currency settings
// Update the display element

// Step 4: Handle paste events
// Strip non-numeric characters from pasted content
// Format and display the cleaned value
`,

  'js-slider-range': `const track = document.getElementById('range-track');
const thumbLow = document.getElementById('range-thumb-low');
const thumbHigh = document.getElementById('range-thumb-high');
const fill = document.getElementById('range-fill');
const minLabel = document.getElementById('range-min-label');
const maxLabel = document.getElementById('range-max-label');
let low = 25, high = 75, min = 0, max = 100;

// Step 1: Create updatePositions() function
// Calculate percentage for low and high values
// Set thumbLow.style.left, thumbHigh.style.left
// Set fill.style.left to low%, fill.style.width to (high - low)%
// Update minLabel and maxLabel text

// Step 2: Create startDrag(thumb, isLow) function
// On pointermove: calculate value from mouse position relative to track
// Clamp: if isLow, max is high - 1; if !isLow, min is low + 1
// Update low or high, call updatePositions()
// On pointerup: remove listeners

// Step 3: Add pointerdown listeners on both thumbs
// Prevent default, call startDrag with appropriate flag

// Step 4: Add click listener on track for jump-to-click
// Calculate clicked value, move the nearest thumb to that position
`,

  'js-toggle-group': `const container = document.getElementById('toggle-group');
const options = container.querySelectorAll('.toggle-option');
const output = document.getElementById('toggle-output');
let selectedValues = new Set();
const isMultiple = container.dataset.multiple === 'true';

// Step 1: Add click listener to each toggle option
// If isMultiple: toggle the value in selectedValues Set
// If single-select: clear selectedValues, add only clicked value
// Toggle 'active' class on the option, update aria-pressed

// Step 2: Create updateOutput() function
// Convert selectedValues to array, join with commas
// Display in output element; show 'None selected' if empty

// Step 3: Add keyboard support
// On keydown: Space or Enter toggles the focused option
// ArrowRight/ArrowLeft moves focus between options

// Step 4: Initialize from any pre-selected options
// Check for options with 'active' class on load, add to selectedValues
`,

  'js-segmented-control': `const control = document.getElementById('seg-control');
const segments = control.querySelectorAll('.segment');
const indicator = document.getElementById('seg-indicator');
const content = document.getElementById('seg-content');

// Step 1: Create activate(segment) function
// Remove 'active' from all segments, add to selected
// Animate indicator: set indicator.style.left and width to match segment position
// Update content area with segment's associated content

// Step 2: Add click listeners on each segment
// Call activate(clickedSegment)

// Step 3: Add keyboard navigation
// ArrowLeft/ArrowRight moves between segments
// Home goes to first, End goes to last
// Update aria-selected attributes

// Step 4: Initialize with first segment active
// Call activate(segments[0]) and set initial indicator position
`,

  'js-combobox': `const input = document.getElementById('combo-input');
const listbox = document.getElementById('combo-listbox');
const clearBtn = document.getElementById('combo-clear');
const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew'];
let filteredOptions = [...options];
let activeIndex = -1;

// Step 1: Create filterOptions(query) function
// Filter options by case-insensitive match
// Clear listbox, create li[role=option] for each match
// Highlight matching text with <mark> tags
// Set aria-expanded, update activeIndex to -1

// Step 2: Add input listener with debounce
// Filter on each keystroke, show/hide listbox based on matches

// Step 3: Add keyboard navigation
// ArrowDown/ArrowUp: navigate options, update aria-activedescendant
// Enter: select the active option, close listbox
// Escape: close listbox, clear filter

// Step 4: Add click selection on options
// Set input value to clicked option text, close listbox

// Step 5: Wire up clear button
// Reset input, clear filter, close listbox, focus input
`,

  'js-mentions-input': `const editor = document.getElementById('mentions-editor');
const dropdown = document.getElementById('mentions-dropdown');
const output = document.getElementById('mentions-output');
const users = ['alice', 'bob', 'carol', 'dave', 'eve', 'frank', 'grace'];

// Step 1: Listen for input events on the editor
// Detect '@' trigger: find the word starting with '@' near cursor
// Extract the query after '@', filter matching users

// Step 2: Show dropdown with matching users
// Position dropdown near the cursor/caret
// Create li elements for each match, highlight the query portion

// Step 3: Handle selection from dropdown
// On click or Enter: replace the @query with a styled mention span
// Insert the mention as a non-editable span.mention inside the editor
// Close dropdown, refocus editor

// Step 4: Parse mentions for output
// Extract all mention spans from editor content
// Build a plain text version with @username tokens for output display
`,

  'js-code-input': `const editor = document.getElementById('code-editor');
const lineNumbers = document.getElementById('line-numbers');
const output = document.getElementById('code-output');

// Step 1: Sync line numbers with editor content
// On input: count newlines in editor.value
// Generate line number elements (1 to lineCount)
// Update lineNumbers.innerHTML

// Step 2: Handle Tab key for indentation
// On keydown Tab: preventDefault, insert 2 spaces at cursor
// Shift+Tab: remove leading 2 spaces from current line

// Step 3: Auto-close brackets and quotes
// On typing '(', '[', '{', or quotes: insert the closing pair
// Position cursor between the pair

// Step 4: Sync scroll position
// When editor scrolls, match lineNumbers.scrollTop to editor.scrollTop

// Step 5: Update output with current code on change
// Set output.textContent to editor.value
`,

  'js-signature-pad': `const canvas = document.getElementById('sig-canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('sig-clear');
const saveBtn = document.getElementById('sig-save');
const output = document.getElementById('sig-output');
let isDrawing = false;
let lastX = 0, lastY = 0;

// Step 1: Set up canvas drawing context
// Set ctx.lineWidth, lineCap, lineJoin, strokeStyle
// Resize canvas to match container dimensions

// Step 2: Add pointer event listeners for drawing
// pointerdown: set isDrawing = true, record lastX/lastY
// pointermove: if drawing, draw line from last position to current
// pointerup/pointerleave: set isDrawing = false

// Step 3: Wire up clear button
// clearBtn click: clearRect the entire canvas

// Step 4: Wire up save button
// Convert canvas to data URL with canvas.toDataURL('image/png')
// Display as an img element in the output area

// Step 5: Handle touch events to prevent scrolling while drawing
// Add touch-action: none to canvas style, preventDefault on touchmove
`,

  // ── interactive ──────────────────────────────────────────────

  'js-tooltip': `const triggers = document.querySelectorAll('[data-tooltip]');
const tooltip = document.getElementById('tooltip');

// Step 1: Add mouseenter listener to each trigger
// Read data-tooltip attribute for the text
// Set tooltip.textContent, make tooltip visible (display: 'block')
// Position tooltip above the trigger using getBoundingClientRect()

// Step 2: Add mouseleave listener to hide tooltip
// Set tooltip.style.display = 'none'

// Step 3: Handle keyboard accessibility
// On focus: show tooltip (same as mouseenter)
// On blur: hide tooltip (same as mouseleave)

// Step 4: Edge detection - keep tooltip within viewport
// If tooltip would overflow right, shift left; if overflow top, show below instead
`,

  'js-popover': `const triggers = document.querySelectorAll('[data-popover]');
const popover = document.getElementById('popover');
let activeTarget = null;

// Step 1: Add click listener to each trigger
// Toggle popover visibility; if already open for this trigger, close it
// Set popover innerHTML from trigger's data-popover-content
// Position popover below the trigger using getBoundingClientRect()

// Step 2: Handle positioning with placement options
// Support data-placement: top, bottom, left, right
// Calculate position based on trigger rect and popover dimensions

// Step 3: Add arrow element pointing to the trigger
// Create/update a .popover-arrow div positioned at the edge

// Step 4: Close popover when clicking outside
// Document click: if target not inside popover or trigger, close

// Step 5: Close on Escape key
// Document keydown: if Escape, hide popover and reset activeTarget
`,

  'js-lightbox': `const thumbs = document.querySelectorAll('.lb-thumb');
const overlay = document.getElementById('lb-overlay');
const lbImage = document.getElementById('lb-image');
const lbCaption = document.getElementById('lb-caption');
const lbCounter = document.getElementById('lb-counter');
let currentIndex = 0;
const items = Array.from(thumbs);

// Step 1: Add click listener to each thumbnail
// Set currentIndex to the clicked thumb's index
// Update lbImage background/content, lbCaption text, lbCounter text
// Show overlay with display: 'flex', add 'open' class

// Step 2: Add prev/next navigation
// Prev button: decrement currentIndex (wrap with modulo), update display
// Next button: increment currentIndex (wrap with modulo), update display

// Step 3: Add keyboard navigation
// ArrowLeft: previous, ArrowRight: next, Escape: close overlay

// Step 4: Close on overlay background click
// If click target is the overlay itself (not content), close
`,

  'js-sortable-list': `const list = document.getElementById('sortable-list');
let draggedItem = null;
let placeholder = null;

// Step 1: Add dragstart listener to list items
// Set draggedItem to the dragged element, add 'dragging' class
// Create a placeholder element with same height
// Set dataTransfer effectAllowed to 'move'

// Step 2: Add dragover listener with insertion logic
// preventDefault, find the closest list item to the cursor
// Use mouse Y vs item midpoint to decide insertBefore or after
// Insert placeholder at the target position

// Step 3: Add drop listener
// Insert draggedItem where placeholder is, remove placeholder
// Remove 'dragging' class, reset draggedItem

// Step 4: Add dragend cleanup
// If placeholder still in DOM, remove it
// Remove 'dragging' class from all items
`,

  'js-resizable-panels': `const container = document.getElementById('panel-container');
const divider = document.getElementById('panel-divider');
const leftPanel = document.getElementById('panel-left');
const rightPanel = document.getElementById('panel-right');
let isResizing = false;

// Step 1: Add pointerdown listener on divider
// Set isResizing = true, add 'resizing' class to container
// Capture pointer with setPointerCapture

// Step 2: Add pointermove listener on divider
// If not resizing, return
// Calculate new left panel width from mouse X relative to container
// Clamp between min (20%) and max (80%) of container width
// Set leftPanel.style.flexBasis and rightPanel.style.flexBasis

// Step 3: Add pointerup listener
// Set isResizing = false, remove 'resizing' class
// Release pointer capture

// Step 4: Handle double-click to reset to 50/50
// On divider dblclick: set both panels to 50% flexBasis
`,

  'js-split-view': `const container = document.getElementById('split-container');
const handle = document.getElementById('split-handle');
const topPane = document.getElementById('split-top');
const bottomPane = document.getElementById('split-bottom');
let isDragging = false;
const isHorizontal = container.dataset.direction === 'horizontal';

// Step 1: Add pointerdown on handle to start resize
// Set isDragging = true, add 'active' class to handle
// Store initial mouse position and pane sizes

// Step 2: Add pointermove to resize panes
// Calculate delta from initial position
// If horizontal: adjust widths; if vertical: adjust heights
// Enforce minimum size of 100px for each pane

// Step 3: Add pointerup to stop resize
// Set isDragging = false, remove 'active' class

// Step 4: Add collapse/expand toggle
// Double-click handle: toggle between collapsed (one pane hidden) and restored
// Store the previous split ratio for restoration
`,

  'js-kanban-board': `const board = document.getElementById('kanban-board');
const columns = document.querySelectorAll('.kanban-column');
let draggedCard = null;

// Step 1: Make cards draggable
// For each .kanban-card: set draggable=true
// On dragstart: store reference, add 'dragging' class, set dataTransfer data

// Step 2: Set up drop zones on columns
// On dragover: preventDefault, add 'drag-over' class to column
// On dragleave: remove 'drag-over' class
// On drop: append draggedCard to column's card container, remove classes

// Step 3: Add card insertion ordering
// On dragover: find the card closest to cursor Y position
// Insert dragged card before or after that card based on mouse position

// Step 4: Update column card counts
// After each drop, update the count badge in each column header

// Step 5: Add new card functionality
// Wire up 'Add Card' button in each column to create new .kanban-card
`,

  'js-timeline': `const timeline = document.getElementById('timeline');
const entries = document.querySelectorAll('.timeline-entry');
let observer;

// Step 1: Create IntersectionObserver for scroll animation
// Observe each .timeline-entry
// When entry intersects (threshold 0.2), add 'visible' class
// Optionally unobserve after first appearance

// Step 2: Add alternating layout
// Loop entries: even indices get 'left' class, odd get 'right' class
// Position the dot connector on the timeline line

// Step 3: Add expand/collapse for entry details
// Click on entry: toggle 'expanded' class to show/hide detail content
// Animate height transition

// Step 4: Add date grouping headers
// Parse dates from entries, insert group headers when month/year changes
`,

  'js-tree-view': `const tree = document.getElementById('tree-view');

const treeData = [
  { id: 1, label: 'src', children: [
    { id: 2, label: 'components', children: [
      { id: 3, label: 'Button.tsx' },
      { id: 4, label: 'Modal.tsx' },
    ]},
    { id: 5, label: 'utils', children: [
      { id: 6, label: 'helpers.ts' },
    ]},
    { id: 7, label: 'index.ts' },
  ]},
];

// Step 1: Create renderNode(node, container, depth) recursive function
// Create li element with padding based on depth
// If node has children: add expand/collapse toggle arrow
// Add label span with node.label text
// If children exist, create nested ul and recurse for each child

// Step 2: Add toggle expand/collapse on click
// Click arrow or label: toggle 'expanded' class on the node li
// Show/hide the nested ul children

// Step 3: Add keyboard navigation
// ArrowRight: expand node or move to first child
// ArrowLeft: collapse node or move to parent
// ArrowUp/Down: move between visible nodes

// Step 4: Render the tree
// Call renderNode for each root item, append to tree container
`,

  'js-collapsible-panel': `const panels = document.querySelectorAll('.collapsible');

// Step 1: For each panel, get header and content elements
// const header = panel.querySelector('.collapsible-header')
// const content = panel.querySelector('.collapsible-content')

// Step 2: Add click listener on header to toggle
// Toggle 'open' class on the panel
// If opening: set content.style.maxHeight to content.scrollHeight + 'px'
// If closing: set content.style.maxHeight to '0'
// Update aria-expanded attribute

// Step 3: Handle accordion mode (only one open at a time)
// If panel has data-accordion attribute, close all other panels first

// Step 4: Add keyboard support
// Enter or Space on focused header: toggle the panel
// Support initial open state via 'open' class in HTML
`,

  'js-drawer': `const drawer = document.getElementById('drawer');
const overlay = document.getElementById('drawer-overlay');
const openBtn = document.getElementById('drawer-open');
const closeBtn = document.getElementById('drawer-close');

// Step 1: Create openDrawer() function
// Add 'open' class to drawer and overlay
// Set aria-hidden='false' on drawer
// Trap focus inside drawer (find first focusable element, focus it)

// Step 2: Create closeDrawer() function
// Remove 'open' class from drawer and overlay
// Set aria-hidden='true' on drawer
// Return focus to the trigger button

// Step 3: Wire up event listeners
// openBtn click: openDrawer()
// closeBtn click: closeDrawer()
// overlay click: closeDrawer()
// Escape key: closeDrawer()

// Step 4: Handle swipe-to-close on touch devices
// Track touchstart X, on touchmove calculate delta
// If swiped in close direction past threshold, close drawer
`,

  'js-bottom-sheet': `const sheet = document.getElementById('bottom-sheet');
const handle = document.getElementById('sheet-handle');
const sheetContent = document.getElementById('sheet-content');
const overlay = document.getElementById('sheet-overlay');
let startY = 0, currentY = 0, isDragging = false;
const snapPoints = [0.9, 0.5, 0.1]; // percentage of viewport height

// Step 1: Create setPosition(heightPercent) function
// Set sheet.style.height to (heightPercent * 100) + 'vh'
// If heightPercent <= 0.1, add 'collapsed' class; else remove it
// Update overlay opacity based on sheet height

// Step 2: Add drag handling on the handle
// pointerdown: record startY, set isDragging
// pointermove: calculate delta, update sheet height in real-time
// pointerup: snap to nearest snap point based on current height

// Step 3: Wire up overlay click to collapse
// Click overlay: animate to smallest snap point

// Step 4: Add open/close toggle button
// Button click: if collapsed, open to middle snap; if open, collapse
`,

  'js-command-palette': `const palette = document.getElementById('cmd-palette');
const input = document.getElementById('cmd-input');
const list = document.getElementById('cmd-list');
const overlay = document.getElementById('cmd-overlay');

const commands = [
  { name: 'New File', shortcut: 'Ctrl+N', icon: '\\u2795' },
  { name: 'Open File', shortcut: 'Ctrl+O', icon: '\\ud83d\\udcc2' },
  { name: 'Save', shortcut: 'Ctrl+S', icon: '\\ud83d\\udcbe' },
  { name: 'Search', shortcut: 'Ctrl+F', icon: '\\ud83d\\udd0d' },
  { name: 'Settings', shortcut: 'Ctrl+,', icon: '\\u2699' },
  { name: 'Toggle Theme', shortcut: 'Ctrl+T', icon: '\\ud83c\\udf19' },
];
let activeIndex = 0;

// Step 1: Open palette with Ctrl+K or Cmd+K
// Add keydown listener: if Ctrl/Cmd+K, preventDefault, show palette
// Focus the input, render all commands

// Step 2: Create renderCommands(query) function
// Filter commands by case-insensitive name match
// Create li for each with icon, name (highlighted match), and shortcut
// Set first item as active, update aria-activedescendant

// Step 3: Add keyboard navigation in the palette
// ArrowDown/Up: move activeIndex, update active class and scroll
// Enter: execute the active command, close palette
// Escape: close palette

// Step 4: Close palette on overlay click or Escape
// Reset input value, activeIndex, hide palette and overlay
`,

  'js-spotlight-search': `const spotlight = document.getElementById('spotlight');
const searchInput = document.getElementById('spotlight-input');
const results = document.getElementById('spotlight-results');
const overlay = document.getElementById('spotlight-overlay');
let activeIdx = 0;

const items = [
  { type: 'page', name: 'Dashboard', url: '/dashboard' },
  { type: 'page', name: 'Settings', url: '/settings' },
  { type: 'page', name: 'Profile', url: '/profile' },
  { type: 'action', name: 'Create New Project', action: 'new-project' },
  { type: 'action', name: 'Toggle Dark Mode', action: 'dark-mode' },
  { type: 'doc', name: 'API Reference', url: '/docs/api' },
];

// Step 1: Open spotlight with Cmd+K or /
// Show spotlight and overlay, focus searchInput
// Render initial items grouped by type

// Step 2: Create renderResults(query) function
// Filter items by name match, group by type
// Render section headers and result items with type icons
// Highlight matching text in item names

// Step 3: Add keyboard navigation
// ArrowUp/Down: move activeIdx through flat list of results
// Enter: activate the selected result (navigate or execute action)
// Escape: close spotlight

// Step 4: Close on overlay click
// Hide spotlight, clear input, reset results
`,

  'js-floating-action-btn': `const fab = document.getElementById('fab');
const fabMenu = document.getElementById('fab-menu');
const fabActions = document.querySelectorAll('.fab-action');
let isOpen = false;

// Step 1: Toggle FAB menu on click
// Click fab: toggle isOpen, toggle 'open' class on fab and fabMenu
// Rotate the fab icon (add 'rotated' class)
// Stagger-animate menu items appearing/disappearing

// Step 2: Animate menu items with staggered delays
// Loop fabActions: set transitionDelay based on index (50ms * i)
// On open: add 'visible' class to each action
// On close: remove 'visible' in reverse order

// Step 3: Add click handlers for each action
// Log or display which action was selected
// Close the menu after action is triggered

// Step 4: Close menu when clicking outside
// Document click: if not inside fab container, close menu
`,

  'js-skeleton-loader': `const container = document.getElementById('skeleton-container');
const loadBtn = document.getElementById('skeleton-load');
let isLoaded = false;

// Step 1: Create showSkeleton() function
// Generate skeleton HTML with animated pulse effect
// Include: avatar circle, title bar, 3 text lines, action bar
// Each skeleton element has .skeleton class with shimmer animation

// Step 2: Create showContent() function
// Replace skeleton HTML with real content
// Add 'fade-in' class for smooth transition
// Display avatar, name, description, and action buttons

// Step 3: Wire up load button to toggle states
// If showing skeleton: simulate load with setTimeout(showContent, 1500)
// If showing content: call showSkeleton() to reset

// Step 4: Add multiple skeleton variants
// Support 'card', 'list', 'profile' skeleton shapes
// Choose variant based on container's data-variant attribute
`,

  'js-progress-bar': `const progressFill = document.getElementById('progress-fill');
const progressLabel = document.getElementById('progress-label');
const progressValue = document.getElementById('progress-value');
const startBtn = document.getElementById('progress-start');
const resetBtn = document.getElementById('progress-reset');
let current = 0;
let intervalId = null;

// Step 1: Create updateProgress(value) function
// Clamp value between 0 and 100
// Set progressFill.style.width to value + '%'
// Update progressValue.textContent with value
// Change color based on thresholds: <30 red, <70 yellow, >=70 green

// Step 2: Create startProgress() function
// If already running, return
// Set interval that increments current by random amount (1-5)
// Call updateProgress(current) each tick
// When reaching 100, clear interval, update label to 'Complete!'

// Step 3: Wire up start button
// Click: call startProgress(), disable start button, enable reset

// Step 4: Wire up reset button
// Click: clearInterval, set current = 0, updateProgress(0)
// Reset label text, enable start button
`,

  // ── data-display ─────────────────────────────────────────────

  'js-badge': `const badgeContainer = document.getElementById('badge-container');
const countInput = document.getElementById('badge-count');
const toggleBtn = document.getElementById('badge-toggle');

// Step 1: Create updateBadge(count) function
// If count <= 0: hide badge dot, set aria-hidden='true'
// If count > 99: show '99+' text
// Otherwise: show the count number, set aria-hidden='false'

// Step 2: Add input listener on countInput
// Parse the value as integer, call updateBadge()

// Step 3: Add toggle for dot vs count badge style
// toggleBtn click: switch between 'dot' and 'count' mode
// In dot mode, show a small circle; in count mode, show the number

// Step 4: Add animation on badge change
// Add 'bounce' class on update, remove after animation completes (300ms)
`,

  'js-avatar': `const avatarContainer = document.getElementById('avatar-container');
const nameInput = document.getElementById('avatar-name');
const sizeSelect = document.getElementById('avatar-size');
const statusSelect = document.getElementById('avatar-status');

// Step 1: Create generateAvatar(name, size) function
// Extract initials from the name (first letter of first two words)
// Generate a background color from the name (hash the string)
// Create the avatar element with initials, size class, and background

// Step 2: Add input listener on nameInput
// Regenerate avatar on each keystroke with current name and size

// Step 3: Add status indicator
// Based on statusSelect value: add colored dot (green=online, yellow=away, red=busy, grey=offline)
// Position the dot at bottom-right of the avatar

// Step 4: Handle image fallback
// If an image URL is provided and fails to load, fall back to initials
`,

  'js-stat-card': `const cards = document.querySelectorAll('.stat-card');

const stats = [
  { label: 'Total Users', value: 12847, change: 12.5, icon: '\\ud83d\\udc65' },
  { label: 'Revenue', value: 48250, change: -3.2, icon: '\\ud83d\\udcb0', prefix: '$' },
  { label: 'Active Sessions', value: 1423, change: 8.1, icon: '\\ud83d\\udcca' },
];

// Step 1: Create animateValue(element, start, end, duration) function
// Use requestAnimationFrame to count from start to end over duration ms
// Update element.textContent each frame with formatted number

// Step 2: Create renderCard(card, stat) function
// Set icon, label, and format value (with prefix if present)
// Show change percentage with up/down arrow and green/red color

// Step 3: Observe cards with IntersectionObserver
// When card enters viewport, trigger animateValue for the number
// Only animate once per card

// Step 4: Render all stat cards on load
// Loop through cards and stats, call renderCard for each pair
`,

  'js-timeline-feed': `const feed = document.getElementById('timeline-feed');
const loadMoreBtn = document.getElementById('feed-load-more');
let page = 0;

const feedItems = [
  { user: 'Alice', action: 'pushed to', target: 'main', time: '2m ago', icon: '\\ud83d\\udce4' },
  { user: 'Bob', action: 'opened PR', target: '#42', time: '15m ago', icon: '\\ud83d\\udd00' },
  { user: 'Carol', action: 'commented on', target: 'issue #18', time: '1h ago', icon: '\\ud83d\\udcac' },
  { user: 'Dave', action: 'deployed to', target: 'production', time: '3h ago', icon: '\\ud83d\\ude80' },
];

// Step 1: Create renderFeedItem(item) function
// Create div.feed-item with icon, user name (bold), action text, target (link-styled), timestamp
// Add connecting line between items (vertical border on left)

// Step 2: Create loadPage(pageNum) function
// Generate items for the page (reuse feedItems with offset)
// Append each rendered item to feed container with fade-in animation

// Step 3: Wire up loadMoreBtn
// Click: increment page, call loadPage, disable button briefly during load

// Step 4: Add relative time updates
// Set interval to update all timestamps every minute
`,

  'js-activity-log': `const logContainer = document.getElementById('activity-log');
const filterBtns = document.querySelectorAll('.log-filter');
const clearBtn = document.getElementById('log-clear');
let activeFilter = 'all';

const activities = [
  { type: 'create', message: 'Created new project', user: 'Alice', time: Date.now() - 300000 },
  { type: 'update', message: 'Updated settings', user: 'Bob', time: Date.now() - 600000 },
  { type: 'delete', message: 'Removed old files', user: 'Carol', time: Date.now() - 900000 },
  { type: 'create', message: 'Added new team member', user: 'Dave', time: Date.now() - 1800000 },
];

// Step 1: Create renderLog(filter) function
// Filter activities by type if filter is not 'all'
// Create div.log-entry for each with colored type badge, message, user, relative time
// Clear and repopulate logContainer

// Step 2: Add filter button handlers
// Click: set activeFilter, toggle 'active' class, call renderLog

// Step 3: Create relativeTime(timestamp) function
// Calculate difference from now, return '5m ago', '1h ago', etc.

// Step 4: Wire up clear button
// Clear the activities array and re-render empty state
`,

  'js-diff-viewer': `const oldText = document.getElementById('diff-old');
const newText = document.getElementById('diff-new');
const diffOutput = document.getElementById('diff-output');
const computeBtn = document.getElementById('diff-compute');

// Step 1: Create computeDiff(oldLines, newLines) function
// Split both texts by newline
// Compare line by line: mark lines as added (+), removed (-), or unchanged
// Use a simple LCS or line-matching algorithm

// Step 2: Create renderDiff(diffResult) function
// For each diff entry, create a div with appropriate class
// Added lines: green background with '+' prefix
// Removed lines: red background with '-' prefix
// Unchanged: neutral background with ' ' prefix
// Show line numbers for both old and new sides

// Step 3: Wire up compute button
// Click: get values from textareas, compute diff, render result

// Step 4: Add unified vs split view toggle
// Toggle between side-by-side (split) and combined (unified) view
`,

  'js-code-block': `const codeBlocks = document.querySelectorAll('.code-block');

// Step 1: For each code block, add line numbers
// Get the code text, split by newlines
// Create a line-numbers gutter with numbered spans
// Wrap each code line in a span for potential highlighting

// Step 2: Add copy button to each code block
// Create button.copy-btn with clipboard icon
// On click: copy the code text to clipboard using navigator.clipboard.writeText
// Show 'Copied!' feedback for 2 seconds, then revert to icon

// Step 3: Add language label
// Read data-language attribute, display as a label in the top-right corner

// Step 4: Add line highlight support
// If data-highlight-lines is set (e.g., '3,5-7'), add 'highlighted' class
// to those line elements
`,

  'js-markdown-preview': `const editor = document.getElementById('md-editor');
const preview = document.getElementById('md-preview');

// Step 1: Create parseMarkdown(text) function
// Convert headings: # -> h1, ## -> h2, ### -> h3
// Convert bold: **text** -> <strong>text</strong>
// Convert italic: *text* -> <em>text</em>
// Convert inline code: \\\`code\\\` -> <code>code</code>
// Convert links: [text](url) -> <a href="url">text</a>

// Step 2: Handle block elements
// Convert code blocks (triple backtick) to <pre><code>
// Convert unordered lists (- or *) to <ul><li>
// Convert blockquotes (>) to <blockquote>
// Convert horizontal rules (---) to <hr>

// Step 3: Add live preview on input
// editor input event: parse content and set preview.innerHTML

// Step 4: Sync scroll positions
// When editor scrolls, proportionally scroll preview
`,

  'js-json-viewer': `const input = document.getElementById('json-input');
const viewer = document.getElementById('json-viewer');
const parseBtn = document.getElementById('json-parse');
const errorMsg = document.getElementById('json-error');

// Step 1: Create renderNode(key, value, depth) recursive function
// If value is object or array: create collapsible node
// Show key name, type indicator, and item count
// Recursively render children with increased depth (indentation)
// If primitive: show key: value with type-based coloring

// Step 2: Add collapse/toggle on object/array nodes
// Click the toggle arrow: show/hide children, rotate arrow icon
// Display preview (...) when collapsed

// Step 3: Wire up parse button
// Try JSON.parse on input value
// On success: clear error, call renderNode for root and set viewer.innerHTML
// On error: show error message with line/position info

// Step 4: Add copy-path feature
// Click on any key: copy the JSON path (e.g., 'data.users[0].name') to clipboard
`,

  'js-comparison-table': `const table = document.getElementById('comparison-table');
const highlightBtn = document.getElementById('compare-highlight');

const plans = [
  { name: 'Free', price: 0, storage: '1 GB', users: 1, support: 'Email', api: false },
  { name: 'Pro', price: 29, storage: '50 GB', users: 10, support: 'Priority', api: true },
  { name: 'Enterprise', price: 99, storage: 'Unlimited', users: -1, support: '24/7', api: true },
];

// Step 1: Create renderTable(plans) function
// Build table header with plan names
// Build rows for each feature (price, storage, users, support, api)
// Format values: price as $X/mo, users -1 as 'Unlimited', boolean as check/cross

// Step 2: Add highlight differences mode
// highlightBtn click: toggle 'highlight' mode
// In highlight mode, add colored backgrounds to cells that differ across plans

// Step 3: Add sticky column headers
// Make the first column (feature names) sticky on horizontal scroll

// Step 4: Add responsive collapse
// On narrow screens, allow selecting which plans to compare via checkboxes
`,

  'js-pricing-table': `const pricingContainer = document.getElementById('pricing-container');
const toggleBilling = document.getElementById('billing-toggle');
let isAnnual = false;

const tiers = [
  { name: 'Starter', monthly: 9, annual: 7, features: ['5 Projects', '1 GB Storage', 'Email Support'] },
  { name: 'Professional', monthly: 29, annual: 23, features: ['Unlimited Projects', '50 GB Storage', 'Priority Support', 'API Access'], popular: true },
  { name: 'Enterprise', monthly: 79, annual: 63, features: ['Everything in Pro', 'Unlimited Storage', '24/7 Support', 'Custom Integrations', 'SLA'] },
];

// Step 1: Create renderPricing(isAnnual) function
// For each tier: create div.pricing-card
// Show name, price (monthly or annual), billing period label
// List features with check marks
// Add 'popular' badge to the highlighted tier
// Add CTA button

// Step 2: Wire up billing toggle
// toggleBilling change: set isAnnual, animate price change, re-render
// Show savings percentage for annual billing

// Step 3: Add price animation on toggle
// Animate the price number counting up or down using requestAnimationFrame

// Step 4: Highlight the popular/recommended plan
// Add a 'recommended' banner and subtle scale transform
`,

  'js-feature-list': `const featureList = document.getElementById('feature-list');
const searchInput = document.getElementById('feature-search');

const features = [
  { name: 'Authentication', desc: 'OAuth, SSO, and MFA support', status: 'stable', category: 'Security' },
  { name: 'Real-time Sync', desc: 'WebSocket-based live updates', status: 'beta', category: 'Data' },
  { name: 'Dark Mode', desc: 'System-aware theme switching', status: 'stable', category: 'UI' },
  { name: 'Export API', desc: 'CSV and JSON data export', status: 'planned', category: 'Data' },
  { name: 'Audit Logs', desc: 'Track all user actions', status: 'stable', category: 'Security' },
];

// Step 1: Create renderFeatures(query) function
// Filter features by name/desc matching query (case-insensitive)
// Group by category, render category headers
// For each feature: show name, description, and status badge
// Status badge colors: stable=green, beta=yellow, planned=grey

// Step 2: Add search input listener with debounce
// Debounce 200ms, call renderFeatures on each input

// Step 3: Add status filter buttons
// 'All', 'Stable', 'Beta', 'Planned' filter buttons
// Toggle active filter, re-render list

// Step 4: Initial render
// Call renderFeatures('') to show all features
`,

  'js-testimonials': `const container = document.getElementById('testimonials');
const prevBtn = document.getElementById('test-prev');
const nextBtn = document.getElementById('test-next');
let currentSlide = 0;

const testimonials = [
  { name: 'Alice Chen', role: 'CTO at StartupX', text: 'Incredible tool that transformed our workflow.', rating: 5 },
  { name: 'Bob Martinez', role: 'Lead Developer', text: 'Best developer experience I have ever had.', rating: 5 },
  { name: 'Carol Johnson', role: 'Product Manager', text: 'Simplified our entire deployment process.', rating: 4 },
];

// Step 1: Create renderTestimonial(index) function
// Get testimonial at index, create card with quote text
// Show star rating (filled vs empty stars), author name and role
// Add fade-in animation class

// Step 2: Wire up prev/next navigation
// prevBtn: decrement currentSlide (wrap around), render
// nextBtn: increment currentSlide (wrap around), render

// Step 3: Add auto-rotation
// Set interval every 5 seconds to advance to next testimonial
// Pause auto-rotation on hover, resume on mouse leave

// Step 4: Add dot indicators
// Generate dots matching testimonial count, highlight active
// Click dot to jump to that testimonial
`,

  'js-team-grid': `const grid = document.getElementById('team-grid');
const filterInput = document.getElementById('team-filter');

const team = [
  { name: 'Alice Johnson', role: 'Engineering Lead', dept: 'Engineering', color: '#3b82f6', initial: 'AJ' },
  { name: 'Bob Smith', role: 'Product Designer', dept: 'Design', color: '#a855f7', initial: 'BS' },
  { name: 'Carol Davis', role: 'Marketing Manager', dept: 'Marketing', color: '#22c55e', initial: 'CD' },
  { name: 'Dave Wilson', role: 'Backend Developer', dept: 'Engineering', color: '#ef4444', initial: 'DW' },
];

// Step 1: Create renderTeam(filter) function
// Filter team by name or role matching filter string
// For each member: create div.team-card with colored avatar, name, role, dept badge
// Clear grid and append all cards

// Step 2: Add filter input listener
// Debounce 200ms, call renderTeam with input value

// Step 3: Add department group filter buttons
// Generate unique dept list, create filter buttons
// Click: filter to only that department, 'All' shows everyone

// Step 4: Initial render
// Call renderTeam('') to show all members
`,

  'js-changelog': `const changelog = document.getElementById('changelog');
const filterBtns = document.querySelectorAll('.changelog-filter');

const releases = [
  { version: '2.1.0', date: '2024-01-15', type: 'feature', items: ['Added dark mode', 'New export API', 'Improved search'] },
  { version: '2.0.1', date: '2024-01-10', type: 'fix', items: ['Fixed login timeout', 'Resolved memory leak'] },
  { version: '2.0.0', date: '2024-01-01', type: 'major', items: ['Complete UI redesign', 'New plugin system', 'Breaking: Updated API v2'] },
];

// Step 1: Create renderRelease(release) function
// Create div.release-entry with version badge, date, and type indicator
// Type colors: feature=blue, fix=green, major=purple
// List each item with bullet points

// Step 2: Create renderChangelog(filter) function
// Filter releases by type if filter is not 'all'
// Clear changelog, render each matching release

// Step 3: Wire up filter buttons
// Click: set active filter, toggle 'active' class, call renderChangelog

// Step 4: Add expand/collapse for release details
// Click release header to toggle item list visibility
// Show item count in collapsed state
`,

  'js-status-page': `const statusContainer = document.getElementById('status-page');
const overallBadge = document.getElementById('overall-status');

const services = [
  { name: 'API', status: 'operational', uptime: 99.98 },
  { name: 'Web App', status: 'operational', uptime: 99.95 },
  { name: 'Database', status: 'degraded', uptime: 99.80 },
  { name: 'CDN', status: 'operational', uptime: 99.99 },
  { name: 'Auth Service', status: 'operational', uptime: 99.90 },
];

// Step 1: Create renderService(service) function
// Create div.service-row with name, status dot (green/yellow/red), status text
// Add uptime bar visualization (colored bar to percentage width)

// Step 2: Calculate and display overall status
// If all operational: 'All Systems Operational' (green)
// If any degraded: 'Partial Outage' (yellow)
// If any down: 'Major Outage' (red)

// Step 3: Create uptime bar with 90-day history visualization
// Generate 90 small bars, color based on daily status
// Tooltip on hover showing date and uptime percentage

// Step 4: Render all services and overall status
// Loop services, call renderService, update overallBadge
`,

  'js-metric-dashboard': `const dashboard = document.getElementById('metric-dashboard');
const refreshBtn = document.getElementById('metric-refresh');

const metrics = [
  { name: 'Response Time', value: 145, unit: 'ms', target: 200, trend: 'down' },
  { name: 'Error Rate', value: 0.8, unit: '%', target: 1, trend: 'stable' },
  { name: 'Throughput', value: 1250, unit: 'req/s', target: 1000, trend: 'up' },
  { name: 'CPU Usage', value: 62, unit: '%', target: 80, trend: 'up' },
];

// Step 1: Create renderMetric(metric) function
// Create div.metric-card with name, formatted value+unit
// Show trend arrow (up/down/stable) with color coding
// Add progress ring or bar showing value vs target

// Step 2: Add health indicator
// If value within target: green badge 'Healthy'
// If approaching target (>80%): yellow badge 'Warning'
// If exceeding target: red badge 'Critical'

// Step 3: Wire up refresh button with simulated data update
// Randomize values slightly, re-render with animation
// Add loading spinner during refresh

// Step 4: Render all metrics
// Loop metrics array, call renderMetric for each, append to dashboard
`,

  // ── navigation ───────────────────────────────────────────────

  'js-command-menu': `const menu = document.getElementById('command-menu');
const menuInput = document.getElementById('cmd-menu-input');
const menuList = document.getElementById('cmd-menu-list');
const menuOverlay = document.getElementById('cmd-menu-overlay');
let selectedIdx = 0;

const actions = [
  { group: 'Navigation', items: [
    { label: 'Go to Dashboard', key: 'D' },
    { label: 'Go to Settings', key: 'S' },
    { label: 'Go to Profile', key: 'P' },
  ]},
  { group: 'Actions', items: [
    { label: 'Create New File', key: 'N' },
    { label: 'Toggle Theme', key: 'T' },
  ]},
];

// Step 1: Open menu with Ctrl+K / Cmd+K
// keydown: if Ctrl/Cmd+K, preventDefault, show menu and overlay, focus input

// Step 2: Create renderMenu(query) function
// Flatten and filter actions by label matching query
// Group results under section headers
// Highlight matching text in labels, show shortcut keys
// Set first item as selected

// Step 3: Add keyboard navigation
// ArrowUp/Down: move selectedIdx, update 'selected' class, scrollIntoView
// Enter: execute the selected action
// Escape: close menu

// Step 4: Close on overlay click or action execution
// Reset input, hide menu and overlay
`,

  'js-mini-map': `const content = document.getElementById('minimap-content');
const minimap = document.getElementById('minimap');
const viewport = document.getElementById('minimap-viewport');
const scale = 0.1;

// Step 1: Create renderMinimap() function
// Clone the content area at reduced scale
// Apply transform: scale(0.1) to the clone
// Replace minimap contents with the scaled clone

// Step 2: Create updateViewport() function
// Calculate visible portion of content relative to total scroll height
// Set viewport indicator height and top position proportionally
// viewport.style.top = (content.scrollTop / content.scrollHeight) * minimap.clientHeight

// Step 3: Add scroll sync
// content scroll event: call updateViewport()
// minimap click: calculate target scroll position, smooth-scroll content

// Step 4: Add drag on viewport indicator
// pointerdown on viewport: start tracking
// pointermove: update content.scrollTop proportionally
// pointerup: stop tracking
`,

  'js-scroll-to-top': `const scrollBtn = document.getElementById('scroll-to-top');
const scrollContainer = document.getElementById('scroll-content');

// Step 1: Show/hide button based on scroll position
// Add scroll listener on scrollContainer
// If scrollTop > 300: show button (add 'visible' class)
// If scrollTop <= 300: hide button (remove 'visible' class)

// Step 2: Smooth scroll to top on click
// scrollBtn click: scrollContainer.scrollTo({ top: 0, behavior: 'smooth' })

// Step 3: Add scroll progress indicator
// Calculate scroll percentage: scrollTop / (scrollHeight - clientHeight)
// Update a circular progress ring around the button
// Set stroke-dashoffset based on percentage

// Step 4: Add keyboard shortcut
// Home key: scroll to top
// Show tooltip on button hover with the keyboard shortcut hint
`,

  'js-anchor-links': `const navLinks = document.querySelectorAll('.anchor-link');
const sections = document.querySelectorAll('.anchor-section');
const scrollContainer = document.getElementById('anchor-content');

// Step 1: Add smooth scroll on link click
// For each anchor link: preventDefault
// Get target section by href hash (e.g., '#section-1')
// Scroll target into view with smooth behavior
// Update URL hash without jumping

// Step 2: Highlight active link based on scroll position
// Create IntersectionObserver for all sections
// When a section intersects (threshold 0.5), add 'active' class to matching link
// Remove 'active' from all other links

// Step 3: Add scroll offset for sticky header
// Account for fixed header height when scrolling to sections
// Adjust IntersectionObserver rootMargin accordingly

// Step 4: Generate anchor links dynamically
// Find all h2 elements in content, create id from text
// Build navigation list from discovered headings
`,

  'js-table-of-contents': `const content = document.getElementById('toc-content');
const tocContainer = document.getElementById('toc');
let headings = [];

// Step 1: Build TOC from headings
// Query all h2, h3, h4 elements in content
// For each: generate an id if missing, store level and text
// Create nested list structure: h2 at top, h3 nested under h2, h4 under h3

// Step 2: Create renderTOC(headings) function
// Build ul/li structure with proper nesting
// Each li contains an anchor link to the heading id
// Add indentation class based on heading level

// Step 3: Add scroll spy to highlight current section
// IntersectionObserver on all headings
// When heading enters viewport, add 'active' class to matching TOC link
// Scroll the TOC sidebar to keep active link visible

// Step 4: Add collapse/expand for nested sections
// Click on a parent item: toggle visibility of its children
// Show expand/collapse indicator icon
`,

  'js-step-indicator': `const steps = document.querySelectorAll('.step-item');
const progressLine = document.getElementById('step-progress-line');
const prevBtn = document.getElementById('step-prev');
const nextBtn = document.getElementById('step-next');
let currentStep = 0;

// Step 1: Create updateSteps(index) function
// Loop through steps: mark completed (< index), active (=== index), pending (> index)
// Add appropriate classes: 'completed', 'active', 'pending'
// Update progress line width to (index / (steps.length - 1)) * 100 + '%'

// Step 2: Wire up prev/next buttons
// prevBtn: if currentStep > 0, decrement and updateSteps
// nextBtn: if currentStep < steps.length - 1, increment and updateSteps
// Disable buttons at boundaries

// Step 3: Allow clicking on completed steps to jump back
// Add click listener on each step
// Only allow jumping to completed steps or the next step

// Step 4: Add transition animation
// Animate the progress line width with CSS transition
// Animate step icons from pending to active to completed
`,

  'js-app-shell': `const sidebar = document.getElementById('shell-sidebar');
const main = document.getElementById('shell-main');
const toggleBtn = document.getElementById('shell-toggle');
const navItems = document.querySelectorAll('.shell-nav-item');
const pageTitle = document.getElementById('shell-page-title');
let isSidebarOpen = true;

// Step 1: Toggle sidebar on button click
// toggleBtn click: toggle 'collapsed' class on sidebar
// Adjust main content margin/width accordingly
// Toggle icon between hamburger and close

// Step 2: Handle navigation
// For each navItem: add click listener
// Remove 'active' from all items, add to clicked
// Update pageTitle with the selected page name
// On mobile: close sidebar after navigation

// Step 3: Responsive behavior
// On resize: if width < 768px, auto-collapse sidebar
// If width >= 768px, restore sidebar state
// Add overlay on mobile when sidebar is open

// Step 4: Add keyboard shortcut for sidebar toggle
// Ctrl+B or Cmd+B: toggle sidebar
`,

  'js-header-scroll-hide': `const header = document.getElementById('scroll-header');
const content = document.getElementById('header-content');
let lastScrollY = 0;
let ticking = false;

// Step 1: Add scroll listener with requestAnimationFrame
// On scroll: if not ticking, request animation frame
// In the frame: compare current scrollY with lastScrollY

// Step 2: Show/hide header based on scroll direction
// Scrolling down past threshold (50px): add 'hidden' class to header (slide up)
// Scrolling up: remove 'hidden' class (slide down)
// At top of page: always show header, add 'at-top' class

// Step 3: Add shadow on scroll
// If scrollY > 0: add 'elevated' class for box-shadow
// If scrollY === 0: remove 'elevated' class

// Step 4: Handle smooth transition
// Use CSS transform: translateY(-100%) for hide
// Use transition property for smooth animation
// Debounce rapid scroll changes
`,

  'js-sticky-header': `const header = document.getElementById('sticky-header');
const sentinel = document.getElementById('sticky-sentinel');
const content = document.getElementById('sticky-content');

// Step 1: Create IntersectionObserver for the sentinel
// Place sentinel element just above where header should stick
// When sentinel leaves viewport: add 'stuck' class to header
// When sentinel enters viewport: remove 'stuck' class

// Step 2: Apply sticky styles when stuck
// Position: sticky with top: 0
// Add background color, shadow, and compact padding when 'stuck'
// Shrink logo/title when in stuck state

// Step 3: Add scroll progress bar
// Create a thin progress bar inside the header
// Width = (scrollTop / (scrollHeight - clientHeight)) * 100%
// Update on each scroll event

// Step 4: Handle content shift
// When header becomes sticky, add padding to content below
// to prevent layout shift (equal to header height)
`,

  'js-page-transitions': `const links = document.querySelectorAll('.transition-link');
const pages = document.querySelectorAll('.transition-page');
const transitionOverlay = document.getElementById('transition-overlay');
let currentPage = 'home';

// Step 1: Create navigateTo(pageId) function
// Add 'exiting' class to current page (triggers fade/slide out)
// Show transition overlay briefly
// After animation (300ms): hide current page, show target page
// Add 'entering' class to target page (triggers fade/slide in)
// Update currentPage reference

// Step 2: Wire up navigation links
// Click each link: preventDefault, get data-page target
// If same as current, ignore; otherwise call navigateTo

// Step 3: Support multiple transition types
// data-transition attribute: 'fade', 'slide-left', 'slide-up', 'zoom'
// Apply corresponding CSS classes during the transition

// Step 4: Handle browser back/forward
// Push state on navigation: history.pushState
// Listen for popstate event to navigate back
`,

  'js-route-guard': `const routes = {
  '/': { title: 'Home', requiresAuth: false },
  '/dashboard': { title: 'Dashboard', requiresAuth: true },
  '/settings': { title: 'Settings', requiresAuth: true },
  '/login': { title: 'Login', requiresAuth: false },
};

const content = document.getElementById('guard-content');
const navLinks = document.querySelectorAll('.guard-link');
let isAuthenticated = false;

// Step 1: Create navigate(path) function
// Look up route config; if unknown, show 404
// If requiresAuth and not authenticated: redirect to /login, show message
// Otherwise: render the page content, update document title

// Step 2: Create checkAuth() guard function
// Return isAuthenticated boolean
// Before each navigation, run the guard check

// Step 3: Wire up links and login/logout toggle
// Click links: preventDefault, call navigate with data-path
// Login button: set isAuthenticated = true, redirect to /dashboard
// Logout button: set isAuthenticated = false, redirect to /

// Step 4: Handle browser navigation
// Push history state on navigate
// Listen for popstate to re-run guard checks
`,

  'js-nested-routes': `const outlet = document.getElementById('route-outlet');
const subOutlet = document.getElementById('sub-outlet');
const navLinks = document.querySelectorAll('.route-link');

const routeTree = {
  '/': { component: 'HomePage' },
  '/docs': { component: 'DocsLayout', children: {
    '/': { component: 'DocsIndex' },
    '/guide': { component: 'DocsGuide' },
    '/api': { component: 'DocsAPI' },
  }},
  '/settings': { component: 'SettingsLayout', children: {
    '/': { component: 'SettingsGeneral' },
    '/profile': { component: 'SettingsProfile' },
  }},
};

// Step 1: Create matchRoute(path) function
// Split path into segments, traverse routeTree
// Return matched route config and any child route

// Step 2: Create renderRoute(route, outlet) function
// Render the component content in the given outlet element
// If route has children and a matched child, render child in subOutlet

// Step 3: Wire up navigation
// Click links: preventDefault, parse href, call matchRoute + renderRoute
// Push history state for back/forward support

// Step 4: Handle popstate for browser navigation
// On popstate: re-match and re-render the current URL
`,

  'js-tab-router': `const tabs = document.querySelectorAll('.router-tab');
const tabContent = document.getElementById('tab-content');
const routes = { home: 'Welcome to Home', about: 'About Us', contact: 'Contact Form' };
let activeRoute = 'home';

// Step 1: Create navigate(route) function
// Set activeRoute, update tabContent with route content
// Update URL hash to #route
// Toggle 'active' class on matching tab

// Step 2: Wire up tab clicks
// Each tab click: preventDefault, get data-route, call navigate

// Step 3: Handle hash-based routing
// On load: read window.location.hash, navigate to that route
// On hashchange: navigate to the new hash route

// Step 4: Add transition animation between tabs
// Fade out current content, swap, fade in new content
// Track direction (left/right) based on tab order for slide animation
`,

  'js-deep-linking': `const stateDisplay = document.getElementById('deep-state');
const controls = document.querySelectorAll('.deep-control');

// Step 1: Create readStateFromURL() function
// Parse URLSearchParams from window.location.search
// Return an object with all query parameters
// Handle missing params with defaults

// Step 2: Create writeStateToURL(state) function
// Build URLSearchParams from state object
// Use history.replaceState to update URL without reload
// Omit default values to keep URL clean

// Step 3: Wire up controls to update state
// Each control (select, checkbox, input) change: read value
// Update the state object, call writeStateToURL
// Update stateDisplay with current state summary

// Step 4: Initialize from URL on page load
// Call readStateFromURL, set control values from state
// Listen for popstate to sync state on back/forward
`,

  'js-url-state': `const filters = document.getElementById('url-filters');
const sortSelect = document.getElementById('url-sort');
const searchInput = document.getElementById('url-search');
const resultDisplay = document.getElementById('url-results');

// Step 1: Create getStateFromURL() function
// Read URLSearchParams: search, sort, page, filters
// Return parsed state object with defaults for missing params

// Step 2: Create setURLState(state) function
// Build new URLSearchParams from state
// Skip params that match defaults
// Use history.pushState to update URL

// Step 3: Create applyState(state) function
// Set searchInput.value, sortSelect.value from state
// Check/uncheck filter checkboxes based on state.filters
// Update resultDisplay to reflect current filters

// Step 4: Wire up controls
// Each control change: build new state, setURLState, applyState
// On popstate: getStateFromURL and applyState
// On load: initialize from current URL state
`,

  'js-back-to-top': `const backBtn = document.getElementById('back-to-top');
const scrollArea = document.getElementById('btt-scroll-area');
let isVisible = false;

// Step 1: Monitor scroll position
// Add scroll listener on scrollArea
// If scrollTop > 400 and not visible: show button with fade-in
// If scrollTop <= 400 and visible: hide button with fade-out

// Step 2: Smooth scroll to top on click
// backBtn click: scrollArea.scrollTo({ top: 0, behavior: 'smooth' })
// Disable button during scroll animation

// Step 3: Add scroll percentage indicator
// Calculate percentage scrolled through the page
// Display as a ring/arc around the button using SVG or CSS

// Step 4: Add keyboard shortcut
// Ctrl+Home or just Home at top level: scroll to top
// Show keyboard shortcut hint on button hover
`,

  'js-scroll-spy': `const sections = document.querySelectorAll('.spy-section');
const navLinks = document.querySelectorAll('.spy-link');
const scrollContainer = document.getElementById('spy-container');

// Step 1: Create IntersectionObserver for scroll spy
// Options: root=scrollContainer, rootMargin='-20% 0px -80% 0px'
// When section intersects: find matching nav link by href/id
// Add 'active' class to matching link, remove from others

// Step 2: Add smooth scroll on nav link click
// preventDefault, get target section by link href hash
// scrollContainer.scrollTo with smooth behavior and offset

// Step 3: Update visual indicator
// Move an indicator element (underline or dot) to align with active link
// Animate the indicator position with CSS transition

// Step 4: Handle edge cases
// First section active when at top
// Last section active when scrolled to bottom
// Debounce observer callbacks for performance
`,

  // ── advanced ─────────────────────────────────────────────────

  'js-theme-switcher': `const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const STORAGE_KEY = 'preferred-theme';

const themes = {
  light: { bg: '#ffffff', text: '#1a1a2e', primary: '#3b82f6', surface: '#f1f5f9' },
  dark: { bg: '#0f172a', text: '#e2e8f0', primary: '#60a5fa', surface: '#1e293b' },
  auto: null,
};

// Step 1: Create applyTheme(theme) function
// If 'auto': check prefers-color-scheme media query, pick light or dark
// Set CSS custom properties on root: --bg, --text, --primary, --surface
// Update data-theme attribute on root element
// Save choice to localStorage

// Step 2: Wire up toggle button
// Cycle through themes: light -> dark -> auto -> light
// Update button icon/text to reflect current theme

// Step 3: Listen for system theme changes
// matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ...)
// If current theme is 'auto', reapply on change

// Step 4: Initialize on load
// Read from localStorage, apply; default to 'auto' if nothing saved
`,

  'js-i18n-locale': `const langSelect = document.getElementById('lang-select');
const content = document.getElementById('i18n-content');

const translations = {
  en: { greeting: 'Hello', welcome: 'Welcome to our app', action: 'Get Started', language: 'Language' },
  es: { greeting: 'Hola', welcome: 'Bienvenido a nuestra app', action: 'Comenzar', language: 'Idioma' },
  fr: { greeting: 'Bonjour', welcome: 'Bienvenue dans notre app', action: 'Commencer', language: 'Langue' },
  ja: { greeting: '\\u3053\\u3093\\u306b\\u3061\\u306f', welcome: '\\u30a2\\u30d7\\u30ea\\u3078\\u3088\\u3046\\u3053\\u305d', action: '\\u59cb\\u3081\\u308b', language: '\\u8a00\\u8a9e' },
};

let currentLang = 'en';

// Step 1: Create translate(lang) function
// Get the translation map for lang
// Query all elements with data-i18n attribute
// Set each element's textContent to translations[lang][key]

// Step 2: Wire up language selector
// langSelect change: set currentLang, call translate
// Save preference to localStorage

// Step 3: Handle RTL languages
// If lang is 'ar' or 'he', set dir='rtl' on document
// Otherwise set dir='ltr'

// Step 4: Initialize on load
// Check localStorage for saved lang, fallback to navigator.language
// Call translate with determined language
`,

  'js-a11y-focus-trap': `const dialog = document.getElementById('trap-dialog');
const openBtn = document.getElementById('trap-open');
const closeBtn = document.getElementById('trap-close');

// Step 1: Create getFocusableElements(container) function
// Query all focusable elements: a, button, input, textarea, select, [tabindex]
// Filter out disabled and hidden elements
// Return array of focusable elements

// Step 2: Create trapFocus(container) function
// Get first and last focusable elements
// On keydown Tab: if on last element, focus first (wrap forward)
// On Shift+Tab: if on first element, focus last (wrap backward)
// Store the keydown handler for later removal

// Step 3: Create openDialog() function
// Show dialog, store previously focused element (document.activeElement)
// Call trapFocus(dialog)
// Focus the first focusable element inside dialog

// Step 4: Create closeDialog() function
// Hide dialog, remove the trap keydown handler
// Restore focus to the previously focused element
// Wire up openBtn, closeBtn, and Escape key
`,

  'js-a11y-live-region': `const liveRegion = document.getElementById('live-region');
const logContainer = document.getElementById('a11y-log');

// Step 1: Create announce(message, priority) function
// Set liveRegion.setAttribute('aria-live', priority) // 'polite' or 'assertive'
// Clear liveRegion first, then after a tick set textContent to message
// The brief clear-then-set forces screen readers to re-announce

// Step 2: Create logMessage(message, type) function
// Create a visible log entry with timestamp, type badge, and message
// Prepend to logContainer for visual history

// Step 3: Wire up demo buttons
// 'Polite' button: announce a status update with aria-live='polite'
// 'Assertive' button: announce an alert with aria-live='assertive'
// 'Status' button: update a role='status' region

// Step 4: Auto-clear announcements
// After 5 seconds, clear liveRegion textContent
// Keep visual log entries persistent
`,

  'js-offline-indicator': `const indicator = document.getElementById('offline-indicator');
const statusText = document.getElementById('connection-status');
const retryBtn = document.getElementById('offline-retry');
let isOnline = navigator.onLine;

// Step 1: Create updateStatus(online) function
// Set isOnline, update indicator class: 'online' or 'offline'
// Update statusText with connection state message
// Show/hide retryBtn based on status
// If coming back online, show brief 'Reconnected' toast

// Step 2: Listen for online/offline events
// window.addEventListener('online', () => updateStatus(true))
// window.addEventListener('offline', () => updateStatus(false))

// Step 3: Add periodic connectivity check
// Every 30 seconds: try fetch to a known endpoint (or /favicon.ico)
// If fetch fails, treat as offline even if browser says online
// Update status accordingly

// Step 4: Wire up retry button
// Click: attempt fetch, if succeeds update to online, else show error
`,

  'js-websocket-chat': `const messages = document.getElementById('chat-messages');
const input = document.getElementById('chat-input');
const sendBtn = document.getElementById('chat-send');
const status = document.getElementById('chat-status');
let ws = null;
const messageHistory = [];

// Step 1: Create simulateWebSocket() function
// Since we cannot connect to a real server, simulate with setTimeout
// Create a mock object with send() and onmessage
// Echo back messages after a random delay (500-2000ms)

// Step 2: Create addMessage(text, sender) function
// Create div.chat-msg with sender class ('user' or 'other')
// Add timestamp, message text, and sender name
// Append to messages container, scroll to bottom

// Step 3: Wire up send functionality
// sendBtn click: get input value, call addMessage for user
// Send via ws.send(), clear input, focus input
// Enter key: trigger send

// Step 4: Display connection status
// Show 'Connected', 'Disconnected', or 'Connecting...'
// Add reconnect logic with exponential backoff on disconnect
`,

  'js-optimistic-update': `const list = document.getElementById('opt-list');
const addBtn = document.getElementById('opt-add');
const undoContainer = document.getElementById('opt-undo');
let items = [
  { id: 1, text: 'First item', status: 'confirmed' },
  { id: 2, text: 'Second item', status: 'confirmed' },
];
let nextId = 3;
let pendingOps = [];

// Step 1: Create renderList() function
// Clear list, render each item with status indicator
// 'confirmed' items: normal style
// 'pending' items: slightly faded with spinner
// 'failed' items: red border with retry button

// Step 2: Create addItem(text) function (optimistic)
// Immediately add to items array with status 'pending', render
// Simulate API call with setTimeout (1-2s)
// On success: update status to 'confirmed', re-render
// On failure (random 20% chance): update status to 'failed', show undo

// Step 3: Create deleteItem(id) function (optimistic)
// Store item in pendingOps for undo, remove from items, render
// Simulate API call; on failure: restore item from pendingOps

// Step 4: Wire up undo functionality
// Show undo toast for 5 seconds after delete
// Click undo: restore the item, cancel the pending delete
`,

  'js-undo-manager': `const editor = document.getElementById('undo-editor');
const undoBtn = document.getElementById('undo-btn');
const redoBtn = document.getElementById('redo-btn');
const historyList = document.getElementById('undo-history');

const stateStack = [];
const redoStack = [];
const MAX_HISTORY = 50;

// Step 1: Create pushState(label) function
// Capture current editor state (innerHTML or value)
// Push to stateStack with label and timestamp
// Clear redoStack (new action invalidates redo)
// Trim stateStack if exceeding MAX_HISTORY
// Update UI buttons and history list

// Step 2: Create undo() function
// If stateStack is empty, return
// Pop from stateStack, push current state to redoStack
// Apply the popped state to editor
// Update buttons and history display

// Step 3: Create redo() function
// If redoStack is empty, return
// Pop from redoStack, push current to stateStack
// Apply popped state to editor
// Update buttons and history display

// Step 4: Wire up events
// undoBtn click: undo(), redoBtn click: redo()
// Ctrl+Z: undo(), Ctrl+Y or Ctrl+Shift+Z: redo()
// editor input: debounce pushState with descriptive label
`,

  'js-clipboard-manager': `const clipList = document.getElementById('clip-list');
const clipInput = document.getElementById('clip-input');
const copyBtn = document.getElementById('clip-copy');
const clearAllBtn = document.getElementById('clip-clear');
let clipHistory = [];
const MAX_ITEMS = 20;

// Step 1: Create addToClipboard(text) function
// Add text to front of clipHistory array
// Remove duplicates (if text already exists, move to front)
// Trim to MAX_ITEMS
// Save to localStorage, re-render list

// Step 2: Create renderClipList() function
// Clear clipList, for each entry create div.clip-item
// Show truncated text preview, full timestamp
// Add 'Copy' button to re-copy the item
// Add 'Delete' button to remove from history

// Step 3: Wire up main copy button
// copyBtn click: copy clipInput value to clipboard via navigator.clipboard
// Call addToClipboard with the text, show success feedback

// Step 4: Wire up re-copy and delete actions
// Re-copy click: write item text to clipboard, show 'Copied!' toast
// Delete click: remove from array, save, re-render
// clearAllBtn: empty array, save, re-render
`,

  'js-hotkey-manager': `const hotkeyDisplay = document.getElementById('hotkey-display');
const hotkeyList = document.getElementById('hotkey-list');
const registerBtn = document.getElementById('hotkey-register');

const registeredHotkeys = new Map();

// Step 1: Create registerHotkey(combo, label, callback) function
// Parse combo string (e.g., 'ctrl+shift+n') into modifier+key parts
// Store in registeredHotkeys Map with {combo, label, callback}
// Re-render the hotkeys list

// Step 2: Create global keydown listener
// Build combo string from event (ctrl/meta + shift + alt + key)
// Look up in registeredHotkeys Map
// If found: preventDefault, execute callback, flash the hotkey in display

// Step 3: Create renderHotkeyList() function
// For each registered hotkey: show combo badge and label
// Add 'Remove' button to unregister
// Show visual keyboard shortcut representation

// Step 4: Register default hotkeys and wire up custom registration
// Pre-register: Ctrl+N (New), Ctrl+S (Save), Ctrl+Z (Undo)
// registerBtn: read custom combo and label from inputs, register
`,

  'js-idle-detector': `const statusEl = document.getElementById('idle-status');
const timerEl = document.getElementById('idle-timer');
const activityLog = document.getElementById('idle-log');
let idleTimeout = null;
let warningTimeout = null;
let idleStart = null;
const IDLE_DELAY = 10000; // 10 seconds for demo
const WARNING_DELAY = 7000; // warn at 7 seconds

// Step 1: Create resetIdleTimer() function
// Clear existing timeouts
// Set warningTimeout: after WARNING_DELAY, show 'Going idle soon...' warning
// Set idleTimeout: after IDLE_DELAY, trigger onIdle()
// Update status to 'Active', record activity timestamp

// Step 2: Create onIdle() function
// Update status to 'Idle', record idle start time
// Start a visual countdown/timer showing idle duration
// Log the idle event with timestamp

// Step 3: Listen for user activity events
// mousemove, keydown, click, scroll, touchstart
// Each event calls resetIdleTimer()
// Throttle to avoid excessive resets (max once per second)

// Step 4: Create activity log
// Log transitions between active and idle states
// Show timestamp, duration of idle/active periods
`,

  'js-media-query-hook': `const display = document.getElementById('mq-display');
const breakpointLabel = document.getElementById('mq-breakpoint');
const featureList = document.getElementById('mq-features');

const breakpoints = {
  mobile: '(max-width: 639px)',
  tablet: '(min-width: 640px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
};

const features = {
  darkMode: '(prefers-color-scheme: dark)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
  highContrast: '(prefers-contrast: high)',
  hover: '(hover: hover)',
};

// Step 1: Create watchMediaQuery(query, callback) function
// Create MediaQueryList with matchMedia(query)
// Call callback with initial match state
// Add 'change' event listener to call callback on changes
// Return a cleanup function to remove the listener

// Step 2: Monitor all breakpoints
// For each breakpoint: watchMediaQuery
// Update breakpointLabel with current matching breakpoint name
// Update display with visual indicator

// Step 3: Monitor feature queries
// For each feature: watchMediaQuery
// Render featureList with feature name and on/off status
// Update in real-time when system preferences change

// Step 4: Show current viewport dimensions
// Update width/height display on resize (debounced)
`,

  'js-portal-demo': `const portalTarget = document.getElementById('portal-target');
const triggerBtn = document.getElementById('portal-trigger');
const contentArea = document.getElementById('portal-content');
let portalElement = null;

// Step 1: Create createPortal(content, target) function
// Create a container div for the portal
// Set innerHTML to the provided content
// Append the container to the target element (outside normal DOM flow)
// Return the container reference for later removal

// Step 2: Create removePortal(portal) function
// If portal exists, remove it from its parent
// Set reference to null

// Step 3: Wire up trigger button
// Click: if no portal exists, create one with modal/tooltip content
// Position it relative to viewport (fixed positioning)
// If portal exists, remove it (toggle behavior)

// Step 4: Handle cleanup and escape
// Escape key: remove any active portal
// Click outside portal: remove it
// On component unmount simulation: ensure portal is cleaned up
`,

  'js-error-boundary': `const appContainer = document.getElementById('error-app');
const errorDisplay = document.getElementById('error-display');
const retryBtn = document.getElementById('error-retry');
let hasError = false;

// Step 1: Create wrapWithErrorBoundary(fn) function
// Return a new function that wraps fn in try-catch
// On error: call showError(error), prevent app crash
// Log the error with stack trace

// Step 2: Create showError(error) function
// Set hasError = true
// Hide appContainer, show errorDisplay
// Display error message and stack (sanitized)
// Show retry button

// Step 3: Create recover() function
// Set hasError = false
// Hide errorDisplay, show appContainer
// Re-initialize the app component

// Step 4: Wire up global error handling
// window.onerror: catch unhandled errors, call showError
// window.onunhandledrejection: catch promise rejections
// retryBtn click: call recover()
`,

  'js-retry-mechanism': `const statusDisplay = document.getElementById('retry-status');
const logContainer = document.getElementById('retry-log');
const triggerBtn = document.getElementById('retry-trigger');
const configForm = document.getElementById('retry-config');

// Step 1: Create retry(fn, options) async function
// options: { maxRetries: 3, baseDelay: 1000, backoff: 'exponential' }
// Loop up to maxRetries, call fn() in try-catch
// On success: return result
// On failure: calculate delay (exponential: baseDelay * 2^attempt)
// Log each attempt with status, wait, then retry

// Step 2: Create logAttempt(attempt, status, delay) function
// Add entry to logContainer with attempt number, pass/fail, delay before next
// Color code: green for success, yellow for retry, red for final failure

// Step 3: Create simulateFlakryRequest() function
// Randomly fail with configurable failure rate (default 70%)
// Simulate network delay with setTimeout
// Return success or throw error

// Step 4: Wire up trigger button and config
// Read maxRetries, baseDelay, failRate from config form
// triggerBtn click: call retry(simulateFlakryRequest, config)
// Display final result (success after N retries, or max retries exceeded)
`,

  'js-virtual-list-advanced': `const container = document.getElementById('vlist-container');
const itemCount = 100000;
const estimatedHeight = 60;
let scrollTop = 0;
let visibleItems = [];
const itemHeights = new Map();

// Step 1: Create measureItem(index) function
// Render item off-screen, measure its actual height
// Cache in itemHeights Map for future use
// Return measured height (or estimatedHeight if not yet measured)

// Step 2: Create getVisibleRange() function
// Calculate total height from cached heights + estimates
// Find start index by accumulating heights until reaching scrollTop
// Find end index by continuing until accumulated height exceeds viewport
// Add buffer items above and below (5 each)

// Step 3: Create render() function
// Call getVisibleRange() to get start/end indices
// Calculate top padding (sum of heights before start)
// Create item elements only for visible range
// Position with absolute positioning or padding
// Set container total height for correct scrollbar

// Step 4: Wire up scroll and resize
// container scroll: update scrollTop, call render()
// Debounce render for performance
// ResizeObserver: re-measure visible items on container resize
`,

  // ── ui-components ────────────────────────────────────────────

  'js-spinner': `const spinnerContainer = document.getElementById('spinner-container');
const toggleBtn = document.getElementById('spinner-toggle');
const sizeSelect = document.getElementById('spinner-size');
let isLoading = false;

// Step 1: Create showSpinner(size) function
// Create a div.spinner element with size class ('sm', 'md', 'lg')
// Use CSS animation: border with transparent section + rotate keyframe
// Append to spinnerContainer

// Step 2: Create hideSpinner() function
// Remove spinner element from container
// Add fade-out transition before removal

// Step 3: Wire up toggle button
// Click: toggle isLoading, call showSpinner or hideSpinner
// Update button text to 'Stop' / 'Start'

// Step 4: Support different spinner variants
// Read data-variant: 'border' (spinning border), 'dots' (pulsing dots), 'bars' (growing bars)
// Render appropriate spinner type based on variant
`,

  'js-chip': `const chipContainer = document.getElementById('chip-container');
const chipInput = document.getElementById('chip-input');
const chipOutput = document.getElementById('chip-output');
let chips = ['JavaScript', 'TypeScript', 'React'];

// Step 1: Create renderChips() function
// Clear chipContainer, loop through chips array
// Create span.chip with text and close button (x)
// Add color variant based on index (cycle through palette)
// Update chipOutput with comma-separated values

// Step 2: Add new chip from input
// On Enter: get trimmed value, if non-empty and not duplicate, add to chips
// Clear input, call renderChips()

// Step 3: Wire up remove functionality
// Close button click: remove chip from array by index, re-render
// Add fade-out animation before removal

// Step 4: Add click-to-select behavior
// Click chip: toggle 'selected' class
// Track selected chips in a Set, update output to show selections
`,

  'js-divider': `const container = document.getElementById('divider-demo');
const controls = document.querySelectorAll('.divider-control');

// Step 1: Create renderDividers() function
// Generate horizontal dividers with different styles
// Solid, dashed, dotted, gradient, with label
// Each divider is a div.divider with appropriate class

// Step 2: Create divider with centered label
// Place text (e.g., 'OR', 'Section') centered on the line
// Use flexbox: line - text - line layout
// Support custom text via data-label attribute

// Step 3: Wire up controls for customization
// Color picker: update divider color via CSS custom property
// Thickness slider: update border-width
// Style select: switch between solid/dashed/dotted

// Step 4: Support vertical dividers
// If data-orientation='vertical': render as vertical line
// Set height instead of width, adjust flex direction
`,

  'js-alert-banner': `const bannerContainer = document.getElementById('banner-container');
const triggerBtns = document.querySelectorAll('.banner-trigger');

const bannerTypes = {
  info: { icon: '\\u2139\\ufe0f', color: '#3b82f6', bg: '#eff6ff' },
  success: { icon: '\\u2705', color: '#22c55e', bg: '#f0fdf4' },
  warning: { icon: '\\u26a0\\ufe0f', color: '#eab308', bg: '#fefce8' },
  error: { icon: '\\u274c', color: '#ef4444', bg: '#fef2f2' },
};

// Step 1: Create showBanner(type, message) function
// Get config from bannerTypes, create div.alert-banner
// Set icon, message text, background and border colors
// Add dismiss button (x) on the right
// Prepend to bannerContainer with slide-down animation

// Step 2: Create dismissBanner(banner) function
// Add 'dismissing' class for slide-up animation
// After animation (300ms), remove element from DOM

// Step 3: Wire up trigger buttons
// Each button has data-type: show a banner with sample message for that type

// Step 4: Add auto-dismiss option
// If data-auto-dismiss is set, dismiss after specified milliseconds
// Show countdown indicator bar at bottom of banner
`,

  'js-callout': `const calloutContainer = document.getElementById('callout-container');
const addBtn = document.getElementById('callout-add');

// Step 1: Create renderCallout(type, title, message) function
// Types: 'tip', 'warning', 'note', 'important'
// Create div.callout with left border color, icon, title, and message
// Icon per type: tip=lightbulb, warning=triangle, note=info, important=star

// Step 2: Add collapsible behavior
// Click callout header: toggle expanded/collapsed
// Animate content height transition
// Show/hide chevron indicator

// Step 3: Wire up add button
// Show a form to select type, enter title, and message
// On submit: render new callout, prepend to container

// Step 4: Add dismiss capability
// Show dismiss button on hover
// Click dismiss: slide out and remove callout from DOM
`,

  'js-empty-state-v2': `const container = document.getElementById('empty-state-container');
const sceneBtns = document.querySelectorAll('.scene-btn');

const scenes = {
  noData: { icon: '\\ud83d\\udcca', title: 'No data yet', message: 'Start by adding your first item.', action: 'Add Item' },
  noResults: { icon: '\\ud83d\\udd0d', title: 'No results found', message: 'Try adjusting your search or filters.', action: 'Clear Filters' },
  error: { icon: '\\u26a0\\ufe0f', title: 'Something went wrong', message: 'We could not load the data.', action: 'Try Again' },
  offline: { icon: '\\ud83c\\udf10', title: 'You are offline', message: 'Check your internet connection.', action: 'Retry' },
};

// Step 1: Create renderScene(sceneName) function
// Get scene config, clear container
// Create div.empty-state with icon, title, message, and action button
// Add entrance animation (fade-in + slight scale)

// Step 2: Wire up scene buttons
// Each button has data-scene, click: call renderScene

// Step 3: Style action button per scene
// noData: primary blue, noResults: secondary grey
// error: warning orange, offline: neutral

// Step 4: Add illustration area
// Create a simple SVG or CSS-drawn illustration above the text
// Match illustration to scene type
`,

  'js-avatar-group': `const groupContainer = document.getElementById('avatar-group');
const maxVisible = 4;

const users = [
  { name: 'Alice', color: '#3b82f6', initial: 'A' },
  { name: 'Bob', color: '#22c55e', initial: 'B' },
  { name: 'Carol', color: '#a855f7', initial: 'C' },
  { name: 'Dave', color: '#ef4444', initial: 'D' },
  { name: 'Eve', color: '#eab308', initial: 'E' },
  { name: 'Frank', color: '#ec4899', initial: 'F' },
];

// Step 1: Create renderAvatarGroup(users, maxVisible) function
// Show first maxVisible avatars with overlapping layout (negative margin)
// Each avatar: circular div with initial letter and background color
// If more users than maxVisible: show '+N' overflow indicator

// Step 2: Add hover tooltip on each avatar
// On hover: show tooltip with full user name
// On overflow indicator hover: show list of hidden names

// Step 3: Add click interaction
// Click avatar: highlight/select it, show user details below
// Click overflow: expand to show all avatars temporarily

// Step 4: Support different sizes
// Read data-size ('sm', 'md', 'lg') from container
// Adjust avatar dimensions and font size accordingly
`,

  'js-breadcrumb-overflow': `const breadcrumb = document.getElementById('breadcrumb-overflow');
const items = ['Home', 'Products', 'Electronics', 'Computers', 'Laptops', 'Gaming Laptops', 'Model XYZ'];
const maxVisible = 4;

// Step 1: Create renderBreadcrumb(items, maxVisible) function
// Always show first item and last (maxVisible - 2) items
// If items.length > maxVisible: show '...' ellipsis dropdown in between
// Add separator (/) between items

// Step 2: Create ellipsis dropdown
// Click '...': show dropdown with hidden intermediate items
// Each dropdown item is clickable to navigate

// Step 3: Add responsive behavior
// On narrow width: reduce maxVisible
// On very narrow: show only first and last with '...'
// Use ResizeObserver to recalculate

// Step 4: Wire up click navigation
// Click any breadcrumb item: truncate items to that point
// Update display, dispatch custom 'navigate' event
`,

  'js-truncated-text': `const textElements = document.querySelectorAll('.truncate-text');

// Step 1: For each text element, check if content overflows
// Compare scrollHeight/scrollWidth with clientHeight/clientWidth
// If overflowing: add 'truncated' class and show indicator

// Step 2: Add 'Show more' / 'Show less' toggle
// Create a toggle button after the text element
// Click 'Show more': remove line-clamp, change button to 'Show less'
// Click 'Show less': reapply line-clamp, change button to 'Show more'

// Step 3: Add tooltip for truncated text
// On hover of truncated text: show full content in a tooltip
// Position tooltip above or below based on available space

// Step 4: Handle dynamic content
// Use ResizeObserver to re-check overflow on content changes
// Update truncation indicator and toggle button accordingly
`,

  'js-responsive-grid': `const grid = document.getElementById('responsive-grid');
const colSlider = document.getElementById('grid-cols');
const gapSlider = document.getElementById('grid-gap');
const colLabel = document.getElementById('col-label');
const gapLabel = document.getElementById('gap-label');

// Step 1: Create renderGrid(cols, gap) function
// Set grid.style.gridTemplateColumns to repeat(cols, 1fr)
// Set grid.style.gap to gap + 'px'
// Generate 12 grid items if not already present
// Each item shows its index number

// Step 2: Wire up column slider
// colSlider input: update grid columns, update colLabel text

// Step 3: Wire up gap slider
// gapSlider input: update grid gap, update gapLabel text

// Step 4: Add responsive auto-fit mode
// Toggle button: switch between manual columns and auto-fit
// Auto-fit: gridTemplateColumns = repeat(auto-fit, minmax(150px, 1fr))
// Show current breakpoint and actual column count
`,

  'js-masonry-layout': `const masonry = document.getElementById('masonry');
const items = [];
const columnCount = 3;

// Step 1: Generate masonry items with varying heights
// Create 15+ items with random heights (100px to 300px)
// Each item has a colored background and index label

// Step 2: Create layoutMasonry() function
// Track column heights in an array [0, 0, 0]
// For each item: find the shortest column
// Position item in that column using absolute positioning
// Set top to shortest column height, left to column index * columnWidth
// Add item height to that column's tracked height
// Set container height to tallest column

// Step 3: Recalculate on resize
// Add ResizeObserver on the container
// Recalculate column width and re-layout all items
// Adjust columnCount based on container width

// Step 4: Add load animation
// Stagger item appearance with incremental delays
// Each item fades in and slides up on initial render
`,

  'js-aspect-ratio-box': `const boxes = document.querySelectorAll('.ratio-box');
const ratioSelect = document.getElementById('ratio-select');
const customWidth = document.getElementById('ratio-width');
const customHeight = document.getElementById('ratio-height');

// Step 1: Create setAspectRatio(box, ratio) function
// Parse ratio string (e.g., '16:9') into width and height numbers
// Set box.style.aspectRatio = width / height (modern CSS)
// Fallback: use padding-bottom percentage trick for older browsers

// Step 2: Wire up ratio selector
// ratioSelect change: apply selected ratio to all boxes
// Options: '1:1', '4:3', '16:9', '21:9', 'custom'

// Step 3: Handle custom ratio inputs
// When 'custom' selected: show width/height inputs
// On input change: calculate and apply custom ratio

// Step 4: Display ratio information
// Show current dimensions and ratio below each box
// Update on resize using ResizeObserver
`,

  'js-scroll-snap': `const snapContainer = document.getElementById('snap-container');
const indicators = document.getElementById('snap-indicators');
const items = document.querySelectorAll('.snap-item');
let currentSnap = 0;

// Step 1: Generate snap indicators (dots)
// Create one dot per snap item
// Set first dot as 'active'

// Step 2: Detect current snap position on scroll
// Add scroll listener with debounce
// Calculate which item is most centered in viewport
// Update currentSnap and active indicator dot

// Step 3: Add click navigation on indicators
// Click dot: scroll the corresponding item into view
// Use scrollIntoView({ behavior: 'smooth', inline: 'center' })

// Step 4: Add prev/next button navigation
// Prev: scroll to currentSnap - 1
// Next: scroll to currentSnap + 1
// Disable at boundaries
`,

  'js-parallax': `const parallaxLayers = document.querySelectorAll('.parallax-layer');
const scrollContainer = document.getElementById('parallax-container');

// Step 1: Set speed for each layer
// Read data-speed attribute from each layer (0.1 to 1.0)
// Slower speed = moves less = appears further back

// Step 2: Add scroll listener for parallax effect
// On scroll: for each layer, calculate translateY
// translateY = scrollTop * layer.dataset.speed
// Apply transform: translate3d(0, translateY, 0) for GPU acceleration

// Step 3: Add horizontal parallax option
// If data-direction='horizontal': apply translateX instead
// Support diagonal movement with both X and Y speeds

// Step 4: Handle performance
// Use requestAnimationFrame to throttle updates
// Disable parallax if prefers-reduced-motion is set
// Only apply to layers currently in/near viewport
`,

  'js-animated-counter': `const counters = document.querySelectorAll('.counter');
let observer;

// Step 1: Create animateCounter(element, target, duration) function
// Start from 0, animate to target value over duration ms
// Use requestAnimationFrame for smooth animation
// Apply easing function (ease-out) for deceleration effect
// Format number with commas for display (toLocaleString)

// Step 2: Create IntersectionObserver
// When counter element enters viewport (threshold 0.5)
// Read target from data-target attribute, duration from data-duration
// Call animateCounter, unobserve after triggering

// Step 3: Support different formats
// data-prefix: prepend (e.g., '$')
// data-suffix: append (e.g., '%', '+')
// data-decimals: number of decimal places

// Step 4: Add completion callback
// When animation finishes: add 'complete' class
// Show a subtle bounce or scale effect on completion
`,

  'js-confetti': `const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
const triggerBtn = document.getElementById('confetti-trigger');
let particles = [];
let animationId = null;

// Step 1: Create createParticle(x, y) function
// Return object with: x, y, vx (random), vy (random upward), color (random from palette)
// Include: size, rotation, rotationSpeed, gravity, opacity, shape ('circle'|'square'|'strip')

// Step 2: Create burst(x, y, count) function
// Generate count particles at position (x, y)
// Spread particles in a cone or full circle
// Add to particles array

// Step 3: Create animate() function
// Clear canvas, loop through particles
// Update each: apply gravity to vy, add velocity to position, reduce opacity
// Draw each particle (fillRect or arc based on shape, with rotation)
// Remove particles with opacity <= 0
// If particles remain, requestAnimationFrame(animate); else cancel

// Step 4: Wire up trigger button
// Click: burst from button position, or center of viewport
// Also support: triggerBtn center, random positions, full-screen shower
`,
};
