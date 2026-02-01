import type { UIPattern } from './types';

export const reactUIPatterns: UIPattern[] = [
  // Forms & Input
  {
    id: 'react-forms',
    title: 'Multi-Field Forms',
    category: 'forms-input',
    difficulty: 'intermediate',
    description: 'Multi-field forms with validation and real-time feedback',
    concepts: ['form validation', 'state management', 'error handling', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/forms',
    demoCode: {
      html: `<div id="root"></div>`,
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
      js: `const { useState } = React;

function SignupForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (form.password.length < 6) e.password = 'Min 6 characters';
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  if (submitted) return <div className="success">Welcome, {form.name}!</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input value={form.name} onChange={handleChange('name')} placeholder="Your name" />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <div className="form-group">
        <label>Email</label>
        <input value={form.email} onChange={handleChange('email')} placeholder="you@example.com" />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" value={form.password} onChange={handleChange('password')} placeholder="Min 6 chars" />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<SignupForm />);`,
    },
  },
  {
    id: 'react-autocomplete',
    title: 'Autocomplete',
    category: 'forms-input',
    difficulty: 'intermediate',
    description: 'Search suggestions with keyboard navigation',
    concepts: ['keyboard navigation', 'debouncing', 'focus management', 'ARIA attributes'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/autocomplete',
  },
  {
    id: 'react-autosave',
    title: 'Autosave',
    category: 'forms-input',
    difficulty: 'intermediate',
    description: 'Real-time form saving with debounced updates',
    concepts: ['debouncing', 'state management', 'async operations', 'user feedback'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/autosave',
  },
  {
    id: 'react-input-feedback',
    title: 'Input Feedback',
    category: 'forms-input',
    difficulty: 'intermediate',
    description: 'Real-time validation with visual indicators',
    concepts: ['form validation', 'visual feedback', 'state management', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/input-feedback',
  },
  {
    id: 'react-password-strength',
    title: 'Password Strength',
    category: 'forms-input',
    difficulty: 'intermediate',
    description: 'Dynamic password strength meter',
    concepts: ['validation logic', 'visual feedback', 'security patterns', 'state management'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/password-strength',
    demoCode: {
      html: `<div id="root"></div>`,
      css: `label {
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
  margin-bottom: 12px;
}

input:focus {
  border-color: #3b82f6;
}

.meter {
  height: 6px;
  border-radius: 3px;
  background: #1e293b;
  overflow: hidden;
  margin-bottom: 8px;
}

.meter-fill {
  height: 100%;
  transition: all 0.3s;
  border-radius: 3px;
}

.rules {
  font-size: 12px;
}

.rule {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.rule.pass {
  color: #22c55e;
}

.rule.fail {
  color: #64748b;
}`,
      js: `const { useState, useMemo } = React;

function PasswordStrength() {
  const [password, setPassword] = useState('');

  const rules = useMemo(() => [
    { label: 'At least 8 characters', test: password.length >= 8 },
    { label: 'Contains uppercase', test: /[A-Z]/.test(password) },
    { label: 'Contains lowercase', test: /[a-z]/.test(password) },
    { label: 'Contains number', test: /[0-9]/.test(password) },
    { label: 'Contains special char', test: /[^A-Za-z0-9]/.test(password) },
  ], [password]);

  const strength = rules.filter(r => r.test).length;
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];
  const labels = ['Very weak', 'Weak', 'Fair', 'Strong', 'Very strong'];

  return (
    <div>
      <label>Create Password</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
      {password && (
        <>
          <div className="meter">
            <div className="meter-fill" style={{ width: (strength / 5 * 100) + '%', background: colors[strength - 1] || '#334155' }} />
          </div>
          <div style={{ fontSize: 13, color: colors[strength - 1] || '#64748b', marginBottom: 12 }}>
            {strength > 0 ? labels[strength - 1] : ''}
          </div>
          <div className="rules">
            {rules.map((r, i) => (
              <div key={i} className={'rule ' + (r.test ? 'pass' : 'fail')}>
                {r.test ? '\\u2713' : '\\u25CB'} {r.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PasswordStrength />);`,
    },
  },
  {
    id: 'react-file-upload',
    title: 'File Upload',
    category: 'forms-input',
    difficulty: 'intermediate',
    description: 'Drag-and-drop file upload with progress',
    concepts: ['drag and drop', 'file handling', 'progress tracking', 'async operations'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/file-upload',
  },
  {
    id: 'react-color-picker',
    title: 'Color Picker',
    category: 'forms-input',
    difficulty: 'intermediate',
    description: 'HSL color selection with preview',
    concepts: ['color manipulation', 'event handling', 'visual feedback', 'state management'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/color-picker',
  },
  {
    id: 'react-calendar-picker',
    title: 'Calendar Picker',
    category: 'forms-input',
    difficulty: 'intermediate',
    description: 'Interactive date selection calendar',
    concepts: ['date handling', 'keyboard navigation', 'accessibility', 'state management'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/calendar-picker',
  },
  {
    id: 'react-range-slider',
    title: 'Range Slider',
    category: 'forms-input',
    difficulty: 'intermediate',
    description: 'Value range selection with handles',
    concepts: ['mouse events', 'touch gestures', 'state management', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/range-slider',
  },
  {
    id: 'react-radio-checkbox',
    title: 'Radio & Checkbox',
    category: 'forms-input',
    difficulty: 'beginner',
    description: 'Custom styled form controls',
    concepts: ['form controls', 'accessibility', 'state management', 'styling'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/radio-checkbox',
  },
  {
    id: 'react-structured-format',
    title: 'Structured Format',
    category: 'forms-input',
    difficulty: 'intermediate',
    description: 'Input formatting and masks',
    concepts: ['input masking', 'validation', 'event handling', 'state management'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/structured-format',
  },
  {
    id: 'react-forgiving-format',
    title: 'Forgiving Format',
    category: 'forms-input',
    difficulty: 'intermediate',
    description: 'Flexible input parsing',
    concepts: ['input parsing', 'validation', 'user experience', 'state management'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/forgiving-format',
  },
  {
    id: 'react-expandable-input',
    title: 'Expandable Input',
    category: 'forms-input',
    difficulty: 'intermediate',
    description: 'Auto-expanding text areas',
    concepts: ['dynamic sizing', 'DOM manipulation', 'event handling', 'user experience'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/expandable-input',
  },
  {
    id: 'react-input-prompt',
    title: 'Input Prompt',
    category: 'forms-input',
    difficulty: 'intermediate',
    description: 'Guided input with suggestions',
    concepts: ['autocomplete', 'user guidance', 'state management', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/input-prompt',
  },
  {
    id: 'react-inplace-editor',
    title: 'Inplace Editor',
    category: 'forms-input',
    difficulty: 'intermediate',
    description: 'Edit content directly in context',
    concepts: ['inline editing', 'focus management', 'state management', 'user experience'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/inplace-editor',
  },
  {
    id: 'react-select-dropdown',
    title: 'Select Dropdown',
    category: 'forms-input',
    difficulty: 'intermediate',
    description: 'Custom select dropdown menus',
    concepts: ['dropdown menus', 'keyboard navigation', 'accessibility', 'state management'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/select-dropdown',
  },
  {
    id: 'react-copy-box',
    title: 'Copy Box',
    category: 'forms-input',
    difficulty: 'beginner',
    description: 'Copy-to-clipboard content boxes',
    concepts: ['clipboard API', 'user feedback', 'event handling', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/copy-box',
  },

  // Interactive Elements
  {
    id: 'react-event-calendar',
    title: 'Event Calendar',
    category: 'interactive',
    difficulty: 'advanced',
    description: 'Full-featured calendar with drag-and-drop events',
    concepts: ['drag and drop', 'date handling', 'complex state', 'event scheduling'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/event-calendar',
  },
  {
    id: 'react-modal',
    title: 'Modal',
    category: 'interactive',
    difficulty: 'intermediate',
    description: 'Overlay dialogs with focus management',
    concepts: ['focus management', 'accessibility', 'portal rendering', 'keyboard navigation'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/modal',
  },
  {
    id: 'react-drag-drop',
    title: 'Drag & Drop',
    category: 'interactive',
    difficulty: 'advanced',
    description: 'Kanban-style task management',
    concepts: ['drag and drop', 'state management', 'touch gestures', 'animations'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/drag-drop',
  },
  {
    id: 'react-tables',
    title: 'Tables',
    category: 'interactive',
    difficulty: 'intermediate',
    description: 'Advanced data tables with sorting and selection',
    concepts: ['data sorting', 'row selection', 'state management', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/tables',
  },
  {
    id: 'react-data-grid',
    title: 'Data Grid',
    category: 'interactive',
    difficulty: 'advanced',
    description: 'Enterprise data grid with filtering',
    concepts: ['virtual scrolling', 'data filtering', 'complex state', 'performance optimization'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/data-grid',
  },
  {
    id: 'react-carousel',
    title: 'Carousel',
    category: 'interactive',
    difficulty: 'intermediate',
    description: 'Image/content sliders with auto-play',
    concepts: ['animations', 'touch gestures', 'auto-play', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/carousel',
  },
  {
    id: 'react-tabs',
    title: 'Tabs',
    category: 'interactive',
    difficulty: 'intermediate',
    description: 'Content organization with smooth transitions',
    concepts: ['state management', 'animations', 'keyboard navigation', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/tabs',
  },
  {
    id: 'react-swipe-actions',
    title: 'Swipe Actions',
    category: 'interactive',
    difficulty: 'intermediate',
    description: 'Mobile-friendly swipe gestures',
    concepts: ['touch gestures', 'animations', 'mobile patterns', 'event handling'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/swipe-actions',
  },
  {
    id: 'react-long-press',
    title: 'Long Press',
    category: 'interactive',
    difficulty: 'intermediate',
    description: 'Context menus and touch actions',
    concepts: ['touch gestures', 'timers', 'context menus', 'mobile patterns'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/long-press',
  },
  {
    id: 'react-pinch-zoom',
    title: 'Pinch Zoom',
    category: 'interactive',
    difficulty: 'intermediate',
    description: 'Touch-based zoom controls',
    concepts: ['touch gestures', 'transformations', 'mobile patterns', 'state management'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/pinch-zoom',
  },
  {
    id: 'react-pull-refresh',
    title: 'Pull to Refresh',
    category: 'interactive',
    difficulty: 'intermediate',
    description: 'Mobile pull-to-refresh pattern',
    concepts: ['touch gestures', 'animations', 'async operations', 'mobile patterns'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/pull-refresh',
  },
  {
    id: 'react-drag-reorder',
    title: 'Drag Reorder',
    category: 'interactive',
    difficulty: 'intermediate',
    description: 'Sortable list reordering',
    concepts: ['drag and drop', 'list manipulation', 'state management', 'animations'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/drag-reorder',
  },
  {
    id: 'react-double-tap',
    title: 'Double Tap',
    category: 'interactive',
    difficulty: 'intermediate',
    description: 'Quick action triggers',
    concepts: ['touch gestures', 'timers', 'event handling', 'mobile patterns'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/double-tap',
  },
  {
    id: 'react-tap-expand',
    title: 'Tap to Expand',
    category: 'interactive',
    difficulty: 'intermediate',
    description: 'Expandable content sections',
    concepts: ['animations', 'state management', 'accessibility', 'progressive disclosure'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/tap-expand',
  },
  {
    id: 'react-progressive-disclosure',
    title: 'Progressive Disclosure',
    category: 'interactive',
    difficulty: 'intermediate',
    description: 'Collapsible content areas',
    concepts: ['animations', 'state management', 'user experience', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/progressive-disclosure',
  },
  {
    id: 'react-wizard',
    title: 'Wizard',
    category: 'interactive',
    difficulty: 'advanced',
    description: 'Multi-step form flows',
    concepts: ['state management', 'validation', 'navigation', 'user guidance'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/wizard',
  },
  {
    id: 'react-undo',
    title: 'Undo/Redo',
    category: 'interactive',
    difficulty: 'intermediate',
    description: 'Action history with undo/redo',
    concepts: ['state management', 'history tracking', 'keyboard shortcuts', 'user experience'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/undo',
  },
  {
    id: 'react-wysiwyg',
    title: 'WYSIWYG Editor',
    category: 'interactive',
    difficulty: 'advanced',
    description: 'Rich text editor with formatting',
    concepts: ['contenteditable', 'selection API', 'complex state', 'keyboard shortcuts'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/wysiwyg',
  },
  {
    id: 'react-swipe-navigation',
    title: 'Swipe Navigation',
    category: 'interactive',
    difficulty: 'intermediate',
    description: 'Swipe-based page navigation',
    concepts: ['touch gestures', 'animations', 'navigation', 'mobile patterns'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/swipe-navigation',
  },

  // Data Display
  {
    id: 'react-data-visualization',
    title: 'Data Visualization',
    category: 'data-display',
    difficulty: 'intermediate',
    description: 'Interactive charts and graphs',
    concepts: ['SVG', 'data transformation', 'animations', 'interactivity'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/data-visualization',
  },
  {
    id: 'react-article-list',
    title: 'Article List',
    category: 'data-display',
    difficulty: 'intermediate',
    description: 'Content listing with metadata',
    concepts: ['list rendering', 'responsive design', 'data formatting', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/article-list',
  },
  {
    id: 'react-gallery',
    title: 'Gallery',
    category: 'data-display',
    difficulty: 'intermediate',
    description: 'Responsive image gallery layouts',
    concepts: ['responsive design', 'lazy loading', 'grid layouts', 'image optimization'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/gallery',
  },
  {
    id: 'react-thumbnail',
    title: 'Thumbnail',
    category: 'data-display',
    difficulty: 'beginner',
    description: 'Grid thumbnail displays',
    concepts: ['grid layouts', 'image loading', 'responsive design', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/thumbnail',
  },
  {
    id: 'react-cards',
    title: 'Cards',
    category: 'data-display',
    difficulty: 'beginner',
    description: 'Flexible content containers',
    concepts: ['component composition', 'responsive design', 'styling', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/cards',
  },
  {
    id: 'react-data-filtering',
    title: 'Data Filtering',
    category: 'data-display',
    difficulty: 'intermediate',
    description: 'Advanced filter interfaces',
    concepts: ['state management', 'data filtering', 'form controls', 'user experience'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/data-filtering',
  },
  {
    id: 'react-search',
    title: 'Search',
    category: 'data-display',
    difficulty: 'intermediate',
    description: 'Real-time search with suggestions',
    concepts: ['debouncing', 'async operations', 'filtering', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/search',
  },
  {
    id: 'react-search-filters',
    title: 'Search Filters',
    category: 'data-display',
    difficulty: 'intermediate',
    description: 'Multi-criteria filtering',
    concepts: ['state management', 'data filtering', 'form controls', 'URL state'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/search-filters',
  },
  {
    id: 'react-table-filter',
    title: 'Table Filter',
    category: 'data-display',
    difficulty: 'intermediate',
    description: 'Table-specific filter controls',
    concepts: ['data filtering', 'table management', 'state management', 'user experience'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/table-filter',
  },
  {
    id: 'react-sort-column',
    title: 'Sort Column',
    category: 'data-display',
    difficulty: 'intermediate',
    description: 'Sortable table columns',
    concepts: ['data sorting', 'table management', 'state management', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/sort-column',
  },
  {
    id: 'react-tag-cloud',
    title: 'Tag Cloud',
    category: 'data-display',
    difficulty: 'intermediate',
    description: 'Weighted tag visualization',
    concepts: ['data visualization', 'dynamic sizing', 'interactivity', 'responsive design'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/tag-cloud',
  },
  {
    id: 'react-continuous-scrolling',
    title: 'Continuous Scrolling',
    category: 'data-display',
    difficulty: 'intermediate',
    description: 'Infinite scroll implementation',
    concepts: ['lazy loading', 'scroll events', 'performance optimization', 'async operations'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/continuous-scrolling',
  },
  {
    id: 'react-dashboard',
    title: 'Dashboard',
    category: 'data-display',
    difficulty: 'advanced',
    description: 'Data dashboard with widgets',
    concepts: [
      'component composition',
      'data visualization',
      'responsive design',
      'state management',
    ],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/dashboard',
  },
  {
    id: 'react-alternating-rows',
    title: 'Alternating Rows',
    category: 'data-display',
    difficulty: 'beginner',
    description: 'Striped table row styling',
    concepts: ['styling', 'list rendering', 'accessibility', 'user experience'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/alternating-rows',
  },
  {
    id: 'react-formatting-data',
    title: 'Formatting Data',
    category: 'data-display',
    difficulty: 'intermediate',
    description: 'Data presentation patterns',
    concepts: ['data formatting', 'internationalization', 'accessibility', 'user experience'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/formatting-data',
  },

  // Navigation
  {
    id: 'react-navbar',
    title: 'Navbar',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'Responsive navigation bars',
    concepts: ['responsive design', 'mobile menus', 'accessibility', 'state management'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/navbar',
  },
  {
    id: 'react-sidebar',
    title: 'Sidebar',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'Collapsible side navigation',
    concepts: ['animations', 'state management', 'responsive design', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/sidebar',
  },
  {
    id: 'react-mobile-menu',
    title: 'Mobile Menu',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'Touch-optimized mobile menus',
    concepts: ['mobile patterns', 'touch gestures', 'animations', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/mobile-menu',
  },
  {
    id: 'react-bottom-navigation',
    title: 'Bottom Navigation',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'Mobile bottom tab navigation',
    concepts: ['mobile patterns', 'navigation', 'accessibility', 'state management'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/bottom-navigation',
  },
  {
    id: 'react-dropdown-menu',
    title: 'Dropdown Menu',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'Context-aware dropdown menus',
    concepts: ['dropdown menus', 'keyboard navigation', 'accessibility', 'positioning'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/dropdown-menu',
  },
  {
    id: 'react-accordion-menu',
    title: 'Accordion Menu',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'Collapsible menu sections',
    concepts: ['animations', 'state management', 'accessibility', 'progressive disclosure'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/accordion-menu',
  },
  {
    id: 'react-breadcrumbs',
    title: 'Breadcrumbs',
    category: 'navigation',
    difficulty: 'beginner',
    description: 'Navigation hierarchy indicators',
    concepts: ['navigation', 'accessibility', 'responsive design', 'user experience'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/breadcrumbs',
  },
  {
    id: 'react-navigation-tabs',
    title: 'Navigation Tabs',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'Tab-based content navigation',
    concepts: ['navigation', 'state management', 'accessibility', 'animations'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/navigation-tabs',
  },
  {
    id: 'react-module-tabs',
    title: 'Module Tabs',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'Feature module organization',
    concepts: ['navigation', 'component organization', 'state management', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/module-tabs',
  },
  {
    id: 'react-pagination',
    title: 'Pagination',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'Smart page navigation',
    concepts: ['navigation', 'state management', 'accessibility', 'user experience'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/pagination',
  },
  {
    id: 'react-horizontal-dropdown',
    title: 'Horizontal Dropdown',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'Horizontal menu layouts',
    concepts: ['dropdown menus', 'positioning', 'accessibility', 'responsive design'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/horizontal-dropdown',
  },
  {
    id: 'react-vertical-dropdown',
    title: 'Vertical Dropdown',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'Vertical menu structures',
    concepts: ['dropdown menus', 'positioning', 'accessibility', 'keyboard navigation'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/vertical-dropdown',
  },
  {
    id: 'react-shortcut-dropdown',
    title: 'Shortcut Dropdown',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'Quick access menus',
    concepts: ['dropdown menus', 'keyboard shortcuts', 'accessibility', 'user experience'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/shortcut-dropdown',
  },
  {
    id: 'react-menus',
    title: 'Menus',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'General menu patterns',
    concepts: ['navigation', 'accessibility', 'keyboard navigation', 'state management'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/menus',
  },
  {
    id: 'react-fat-footer',
    title: 'Fat Footer',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'Comprehensive page footers',
    concepts: ['responsive design', 'navigation', 'accessibility', 'component composition'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/fat-footer',
  },
  {
    id: 'react-home-link',
    title: 'Home Link',
    category: 'navigation',
    difficulty: 'beginner',
    description: 'Navigation home shortcuts',
    concepts: ['navigation', 'accessibility', 'user experience', 'routing'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/home-link',
  },
  {
    id: 'react-jumping-hierarchy',
    title: 'Jumping Hierarchy',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'Multi-level navigation',
    concepts: ['navigation', 'state management', 'accessibility', 'user experience'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/jumping-hierarchy',
  },
  {
    id: 'react-steps-left',
    title: 'Steps Left',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'Progress indication',
    concepts: ['progress tracking', 'visual feedback', 'accessibility', 'user guidance'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/steps-left',
  },
  {
    id: 'react-adaptable-view',
    title: 'Adaptable View',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'Responsive view modes',
    concepts: ['responsive design', 'state management', 'user preferences', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/adaptable-view',
  },
  {
    id: 'react-preview',
    title: 'Preview',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'Content preview patterns',
    concepts: ['modal dialogs', 'lazy loading', 'user experience', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/preview',
  },
  {
    id: 'react-faq',
    title: 'FAQ',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'FAQ accordion sections',
    concepts: ['accordion', 'state management', 'accessibility', 'progressive disclosure'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/faq',
  },

  // Advanced Features
  {
    id: 'react-keyboard-shortcuts',
    title: 'Keyboard Shortcuts',
    category: 'advanced',
    difficulty: 'advanced',
    description: 'Global hotkey management',
    concepts: ['keyboard events', 'event delegation', 'accessibility', 'user experience'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/keyboard-shortcuts',
  },
  {
    id: 'react-rule-builder',
    title: 'Rule Builder',
    category: 'advanced',
    difficulty: 'advanced',
    description: 'Dynamic form/rule generation',
    concepts: ['complex state', 'dynamic forms', 'validation', 'component composition'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/rule-builder',
  },
  {
    id: 'react-completeness-meter',
    title: 'Completeness Meter',
    category: 'advanced',
    difficulty: 'intermediate',
    description: 'Progress tracking',
    concepts: ['progress tracking', 'visual feedback', 'state management', 'user guidance'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/completeness-meter',
  },
  {
    id: 'react-favorites',
    title: 'Favorites',
    category: 'advanced',
    difficulty: 'intermediate',
    description: 'Bookmark management system',
    concepts: ['state management', 'local storage', 'user preferences', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/favorites',
  },
  {
    id: 'react-tagging',
    title: 'Tagging',
    category: 'advanced',
    difficulty: 'intermediate',
    description: 'Tag management interfaces',
    concepts: ['state management', 'autocomplete', 'data management', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/tagging',
  },
  {
    id: 'react-categorization',
    title: 'Categorization',
    category: 'advanced',
    difficulty: 'intermediate',
    description: 'Content organization',
    concepts: ['state management', 'data organization', 'filtering', 'user experience'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/categorization',
  },
  {
    id: 'react-settings',
    title: 'Settings',
    category: 'advanced',
    difficulty: 'intermediate',
    description: 'Configuration interfaces',
    concepts: ['form management', 'state persistence', 'validation', 'user preferences'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/settings',
  },
  {
    id: 'react-archive',
    title: 'Archive',
    category: 'advanced',
    difficulty: 'intermediate',
    description: 'Content archiving patterns',
    concepts: ['state management', 'data filtering', 'user experience', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/archive',
  },
  {
    id: 'react-notifications',
    title: 'Notifications',
    category: 'advanced',
    difficulty: 'intermediate',
    description: 'Toast and alert systems',
    concepts: ['portal rendering', 'animations', 'state management', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/notifications',
  },
  {
    id: 'react-captcha',
    title: 'CAPTCHA',
    category: 'advanced',
    difficulty: 'intermediate',
    description: 'Human verification',
    concepts: ['security', 'validation', 'accessibility', 'user experience'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/captcha',
  },
  {
    id: 'react-inline-help',
    title: 'Inline Help',
    category: 'advanced',
    difficulty: 'intermediate',
    description: 'Contextual assistance',
    concepts: ['tooltips', 'accessibility', 'user guidance', 'positioning'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/inline-help',
  },
  {
    id: 'react-good-defaults',
    title: 'Good Defaults',
    category: 'advanced',
    difficulty: 'intermediate',
    description: 'Smart default behaviors',
    concepts: ['user experience', 'state management', 'accessibility', 'progressive enhancement'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/good-defaults',
  },

  // UI Components
  {
    id: 'react-image-upload',
    title: 'Image Upload',
    category: 'ui-components',
    difficulty: 'intermediate',
    description: 'File upload with preview',
    concepts: ['file handling', 'image preview', 'drag and drop', 'validation'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/image-upload',
  },
  {
    id: 'react-image-gallery',
    title: 'Image Gallery',
    category: 'ui-components',
    difficulty: 'intermediate',
    description: 'Advanced image displays',
    concepts: ['image loading', 'modal dialogs', 'keyboard navigation', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/image-gallery',
  },
  {
    id: 'react-image-zoom',
    title: 'Image Zoom',
    category: 'ui-components',
    difficulty: 'intermediate',
    description: 'Zoomable image viewers',
    concepts: ['transformations', 'mouse events', 'touch gestures', 'animations'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/image-zoom',
  },
  {
    id: 'react-slideshow',
    title: 'Slideshow',
    category: 'ui-components',
    difficulty: 'intermediate',
    description: 'Automated content slideshows',
    concepts: ['animations', 'timers', 'keyboard navigation', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/slideshow',
  },
  {
    id: 'react-morphing-controls',
    title: 'Morphing Controls',
    category: 'ui-components',
    difficulty: 'intermediate',
    description: 'Animated UI transitions',
    concepts: ['animations', 'state management', 'transitions', 'user experience'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/morphing-controls',
  },
  {
    id: 'react-fill-blanks',
    title: 'Fill in the Blanks',
    category: 'ui-components',
    difficulty: 'intermediate',
    description: 'Interactive form filling',
    concepts: ['form management', 'validation', 'user guidance', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/fill-blanks',
  },
];
