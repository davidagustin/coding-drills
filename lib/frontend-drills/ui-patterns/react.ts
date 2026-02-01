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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.autocomplete { position: relative; }
input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
  font-size: 14px;
}
input:focus { border-color: #3b82f6; }
.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
}
.suggestion {
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
  color: #e2e8f0;
}
.suggestion:hover, .suggestion.active {
  background: #334155;
}
.suggestion mark {
  background: none;
  color: #3b82f6;
  font-weight: 600;
}`,
      js: `const { useState, useRef, useEffect } = React;

const fruits = ['Apple','Apricot','Avocado','Banana','Blueberry','Cherry','Cranberry','Date','Fig','Grape','Kiwi','Lemon','Mango','Orange','Papaya','Peach','Pear','Pineapple','Plum','Raspberry','Strawberry'];

function App() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const filtered = query ? fruits.filter(f => f.toLowerCase().includes(query.toLowerCase())) : [];

  const highlight = (text) => {
    const i = text.toLowerCase().indexOf(query.toLowerCase());
    if (i === -1) return text;
    return <>{text.slice(0,i)}<mark>{text.slice(i,i+query.length)}</mark>{text.slice(i+query.length)}</>;
  };

  const select = (val) => { setQuery(val); setOpen(false); };

  const onKey = (e) => {
    if (!open) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a+1, filtered.length-1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a-1, 0)); }
    if (e.key === 'Enter' && active >= 0) { select(filtered[active]); }
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div className="autocomplete">
      <input ref={inputRef} value={query} placeholder="Search fruits..."
        onChange={e => { setQuery(e.target.value); setOpen(true); setActive(-1); }}
        onKeyDown={onKey} onFocus={() => query && setOpen(true)}
        role="combobox" aria-expanded={open} aria-autocomplete="list" />
      {open && filtered.length > 0 && (
        <div className="suggestions" role="listbox">
          {filtered.map((f, i) => (
            <div key={f} className={'suggestion' + (i === active ? ' active' : '')}
              role="option" aria-selected={i === active}
              onMouseEnter={() => setActive(i)} onClick={() => select(f)}>
              {highlight(f)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  color: #94a3b8;
}
input, textarea {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
  font-size: 14px;
  margin-bottom: 12px;
}
textarea { min-height: 80px; resize: vertical; font-family: inherit; }
input:focus, textarea:focus { border-color: #3b82f6; }
.status {
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 6px;
  display: inline-block;
}
.status.saving { color: #eab308; background: rgba(234,179,8,0.1); }
.status.saved { color: #22c55e; background: rgba(34,197,94,0.1); }`,
      js: `const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [title, setTitle] = useState('My Draft Post');
  const [body, setBody] = useState('Start typing and your work is saved automatically...');
  const [status, setStatus] = useState('saved');
  const timerRef = useRef(null);

  const save = useCallback(() => {
    setStatus('saving');
    setTimeout(() => setStatus('saved'), 800);
  }, []);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setStatus('saving');
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(save, 1000);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <span style={{fontWeight:600,color:'#e2e8f0'}}>Autosave Editor</span>
        <span className={'status ' + status}>
          {status === 'saving' ? '\\u23F3 Saving...' : '\\u2713 Saved'}
        </span>
      </div>
      <label>Title</label>
      <input value={title} onChange={handleChange(setTitle)} />
      <label>Content</label>
      <textarea value={body} onChange={handleChange(setBody)} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.field { margin-bottom: 16px; }
label { display: block; margin-bottom: 4px; font-size: 14px; color: #94a3b8; }
input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 2px solid #334155;
  background: #1e293b;
  color: #e2e8f0;
  outline: none;
  transition: border-color 0.2s;
}
input.valid { border-color: #22c55e; }
input.invalid { border-color: #ef4444; }
input:focus { border-color: #3b82f6; }
.msg { font-size: 12px; margin-top: 4px; }
.msg.ok { color: #22c55e; }
.msg.err { color: #ef4444; }
.icon { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); font-size: 16px; }
.input-wrap { position: relative; }`,
      js: `const { useState } = React;

function App() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const emailValid = email === '' ? null : /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  const userValid = username === '' ? null : username.length >= 3;

  const Field = ({ label, value, onChange, valid, okMsg, errMsg }) => (
    <div className="field">
      <label>{label}</label>
      <div className="input-wrap">
        <input value={value} onChange={e => onChange(e.target.value)}
          className={valid === null ? '' : valid ? 'valid' : 'invalid'} />
        {valid !== null && <span className="icon">{valid ? '\\u2713' : '\\u2717'}</span>}
      </div>
      {valid === true && <div className="msg ok">{okMsg}</div>}
      {valid === false && <div className="msg err">{errMsg}</div>}
    </div>
  );

  return (
    <div>
      <Field label="Email" value={email} onChange={setEmail} valid={emailValid}
        okMsg="Valid email" errMsg="Enter a valid email" />
      <Field label="Username (min 3 chars)" value={username} onChange={setUsername} valid={userValid}
        okMsg="Username available" errMsg="Too short" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.dropzone {
  border: 2px dashed #475569;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  color: #94a3b8;
}
.dropzone.over { border-color: #3b82f6; background: rgba(59,130,246,0.05); }
.dropzone p { margin: 8px 0; }
.file-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: #1e293b;
  border-radius: 8px;
  margin-top: 8px;
}
.file-name { flex: 1; font-size: 14px; color: #e2e8f0; }
.file-size { font-size: 12px; color: #64748b; }
.progress-bar {
  height: 4px;
  background: #334155;
  border-radius: 2px;
  overflow: hidden;
  flex: 1;
}
.progress-fill {
  height: 100%;
  background: #3b82f6;
  transition: width 0.3s;
  border-radius: 2px;
}
.remove { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 16px; padding: 0; }`,
      js: `const { useState, useRef } = React;

function App() {
  const [files, setFiles] = useState([]);
  const [over, setOver] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (newFiles) => {
    const items = [...newFiles].map(f => ({
      name: f.name, size: (f.size/1024).toFixed(1) + ' KB', progress: 0, id: Math.random()
    }));
    setFiles(prev => [...prev, ...items]);
    items.forEach(item => {
      let p = 0;
      const iv = setInterval(() => {
        p += Math.random() * 30;
        if (p >= 100) { p = 100; clearInterval(iv); }
        setFiles(prev => prev.map(f => f.id === item.id ? {...f, progress: p} : f));
      }, 300);
    });
  };

  return (
    <div>
      <div className={'dropzone' + (over ? ' over' : '')}
        onDragOver={e => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={e => { e.preventDefault(); setOver(false); addFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current.click()}>
        <p style={{fontSize:24}}>\\u{1F4C1}</p>
        <p>Drag files here or click to browse</p>
        <input ref={inputRef} type="file" multiple hidden onChange={e => addFiles(e.target.files)} />
      </div>
      {files.map(f => (
        <div key={f.id} className="file-item">
          <span className="file-name">{f.name}</span>
          <span className="file-size">{f.size}</span>
          {f.progress < 100
            ? <div className="progress-bar" style={{width:80}}><div className="progress-fill" style={{width:f.progress+'%'}} /></div>
            : <span style={{color:'#22c55e'}}>\\u2713</span>}
          <button className="remove" onClick={() => setFiles(prev => prev.filter(x => x.id !== f.id))}>\\u00D7</button>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.picker { text-align: center; }
.preview {
  width: 80px; height: 80px;
  border-radius: 50%;
  margin: 0 auto 16px;
  border: 3px solid #475569;
}
.sliders { max-width: 280px; margin: 0 auto; }
.slider-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.slider-row label { width: 24px; font-size: 13px; color: #94a3b8; }
.slider-row input[type="range"] { flex: 1; accent-color: #3b82f6; }
.slider-row span { width: 40px; text-align: right; font-size: 13px; color: #e2e8f0; }
.hex-val {
  font-family: monospace;
  font-size: 16px;
  color: #e2e8f0;
  background: #1e293b;
  padding: 6px 16px;
  border-radius: 6px;
  display: inline-block;
  margin-top: 8px;
}`,
      js: `const { useState } = React;

function App() {
  const [h, setH] = useState(220);
  const [s, setS] = useState(80);
  const [l, setL] = useState(55);

  const hsl = 'hsl(' + h + ',' + s + '%,' + l + '%)';

  const hslToHex = (h, s, l) => {
    s /= 100; l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return '#' + f(0) + f(8) + f(4);
  };

  return (
    <div className="picker">
      <div className="preview" style={{background: hsl}} />
      <div className="sliders">
        <div className="slider-row">
          <label>H</label>
          <input type="range" min="0" max="360" value={h} onChange={e => setH(+e.target.value)} />
          <span>{h}\\u00B0</span>
        </div>
        <div className="slider-row">
          <label>S</label>
          <input type="range" min="0" max="100" value={s} onChange={e => setS(+e.target.value)} />
          <span>{s}%</span>
        </div>
        <div className="slider-row">
          <label>L</label>
          <input type="range" min="0" max="100" value={l} onChange={e => setL(+e.target.value)} />
          <span>{l}%</span>
        </div>
      </div>
      <div className="hex-val">{hslToHex(h, s, l)}</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.cal { max-width: 300px; margin: 0 auto; }
.cal-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;
}
.cal-header button {
  background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 18px; padding: 4px 8px;
}
.cal-header button:hover { color: #e2e8f0; }
.cal-title { font-weight: 600; color: #e2e8f0; }
.cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; text-align: center; }
.day-label { font-size: 11px; color: #64748b; padding: 4px; }
.day {
  padding: 8px 4px; border-radius: 6px; cursor: pointer; font-size: 13px; color: #e2e8f0;
  border: none; background: none;
}
.day:hover { background: #334155; }
.day.today { border: 1px solid #3b82f6; }
.day.selected { background: #3b82f6; color: white; }
.day.other { color: #475569; }
.selected-display { text-align: center; margin-top: 12px; font-size: 14px; color: #94a3b8; }`,
      js: `const { useState } = React;

function App() {
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState(null);
  const year = date.getFullYear(), month = date.getMonth();
  const today = new Date();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const prevDays = new Date(year, month, 0).getDate();
  const days = [];
  for (let i = startDay - 1; i >= 0; i--) days.push({ d: prevDays - i, other: true });
  for (let i = 1; i <= daysInMonth; i++) days.push({ d: i, other: false });
  const rem = 42 - days.length;
  for (let i = 1; i <= rem; i++) days.push({ d: i, other: true });

  const isToday = (d) => !d.other && d.d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  const isSel = (d) => selected && !d.other && d.d === selected.getDate() && month === selected.getMonth() && year === selected.getFullYear();
  const nav = (dir) => setDate(new Date(year, month + dir, 1));
  const labels = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  return (
    <div className="cal">
      <div className="cal-header">
        <button onClick={() => nav(-1)}>\\u25C0</button>
        <span className="cal-title">{monthNames[month]} {year}</span>
        <button onClick={() => nav(1)}>\\u25B6</button>
      </div>
      <div className="cal-grid">
        {labels.map(l => <div key={l} className="day-label">{l}</div>)}
        {days.map((d, i) => (
          <button key={i} className={'day' + (d.other ? ' other' : '') + (isToday(d) ? ' today' : '') + (isSel(d) ? ' selected' : '')}
            onClick={() => !d.other && setSelected(new Date(year, month, d.d))}>
            {d.d}
          </button>
        ))}
      </div>
      {selected && <div className="selected-display">Selected: {selected.toLocaleDateString()}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.slider-group { margin-bottom: 20px; }
.slider-label {
  display: flex; justify-content: space-between; margin-bottom: 8px;
  font-size: 14px; color: #94a3b8;
}
.slider-label span { color: #3b82f6; font-weight: 600; }
input[type="range"] {
  width: 100%; accent-color: #3b82f6; height: 6px;
}
.range-display {
  display: flex; justify-content: space-between; gap: 12px; margin-top: 16px;
}
.range-box {
  flex: 1; background: #1e293b; border-radius: 8px; padding: 12px;
  text-align: center;
}
.range-box .val { font-size: 24px; font-weight: 700; color: #3b82f6; }
.range-box .lbl { font-size: 12px; color: #64748b; margin-top: 4px; }`,
      js: `const { useState } = React;

function App() {
  const [price, setPrice] = useState(50);
  const [min, setMin] = useState(20);
  const [max, setMax] = useState(80);

  return (
    <div>
      <div className="slider-group">
        <div className="slider-label">Price <span>$\{price}</span></div>
        <input type="range" min="0" max="100" value={price} onChange={e => setPrice(+e.target.value)} />
      </div>
      <div className="slider-group">
        <div className="slider-label">Min Range <span>{min}</span></div>
        <input type="range" min="0" max={max} value={min} onChange={e => setMin(+e.target.value)} />
      </div>
      <div className="slider-group">
        <div className="slider-label">Max Range <span>{max}</span></div>
        <input type="range" min={min} max="100" value={max} onChange={e => setMax(+e.target.value)} />
      </div>
      <div className="range-display">
        <div className="range-box"><div className="val">{min}</div><div className="lbl">Min</div></div>
        <div className="range-box"><div className="val">{max - min}</div><div className="lbl">Range</div></div>
        <div className="range-box"><div className="val">{max}</div><div className="lbl">Max</div></div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.group { margin-bottom: 20px; }
.group-title { font-size: 14px; color: #94a3b8; margin-bottom: 8px; }
.option {
  display: flex; align-items: center; gap: 10px; padding: 10px 12px;
  background: #1e293b; border-radius: 8px; margin-bottom: 4px; cursor: pointer;
  border: 1px solid #334155; transition: all 0.15s;
}
.option:hover { border-color: #475569; }
.option.selected { border-color: #3b82f6; background: rgba(59,130,246,0.05); }
.radio-dot {
  width: 18px; height: 18px; border-radius: 50%; border: 2px solid #475569;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.radio-dot.active { border-color: #3b82f6; }
.radio-dot.active::after { content: ''; width: 10px; height: 10px; border-radius: 50%; background: #3b82f6; display: block; }
.check-box {
  width: 18px; height: 18px; border-radius: 4px; border: 2px solid #475569;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  font-size: 12px; color: white;
}
.check-box.active { background: #3b82f6; border-color: #3b82f6; }
.opt-label { font-size: 14px; color: #e2e8f0; }`,
      js: `const { useState } = React;

function App() {
  const [plan, setPlan] = useState('pro');
  const [features, setFeatures] = useState(['dark']);
  const plans = [{id:'free',label:'Free'},{id:'pro',label:'Pro'},{id:'enterprise',label:'Enterprise'}];
  const feats = [{id:'dark',label:'Dark Mode'},{id:'notif',label:'Notifications'},{id:'auto',label:'Auto-save'},{id:'2fa',label:'Two-Factor Auth'}];
  const toggleFeat = (id) => setFeatures(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);

  return (
    <div>
      <div className="group">
        <div className="group-title">Select Plan</div>
        {plans.map(p => (
          <div key={p.id} className={'option' + (plan === p.id ? ' selected' : '')} onClick={() => setPlan(p.id)}>
            <div className={'radio-dot' + (plan === p.id ? ' active' : '')} />
            <span className="opt-label">{p.label}</span>
          </div>
        ))}
      </div>
      <div className="group">
        <div className="group-title">Features</div>
        {feats.map(f => (
          <div key={f.id} className={'option' + (features.includes(f.id) ? ' selected' : '')} onClick={() => toggleFeat(f.id)}>
            <div className={'check-box' + (features.includes(f.id) ? ' active' : '')}>
              {features.includes(f.id) && '\\u2713'}
            </div>
            <span className="opt-label">{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.field { margin-bottom: 16px; }
label { display: block; margin-bottom: 4px; font-size: 14px; color: #94a3b8; }
input {
  width: 100%; padding: 10px 12px; border-radius: 8px;
  border: 1px solid #334155; background: #1e293b; color: #e2e8f0;
  outline: none; font-size: 16px; font-family: monospace;
}
input:focus { border-color: #3b82f6; }
.hint { font-size: 12px; color: #64748b; margin-top: 4px; }`,
      js: `const { useState } = React;

function App() {
  const [phone, setPhone] = useState('');
  const [card, setCard] = useState('');
  const [date, setDate] = useState('');

  const maskPhone = (v) => {
    const d = v.replace(/\\D/g, '').slice(0, 10);
    if (d.length <= 3) return d;
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

  return (
    <div>
      <div className="field">
        <label>Phone Number</label>
        <input value={phone} onChange={e => setPhone(maskPhone(e.target.value))} placeholder="(555) 123-4567" />
        <div className="hint">Format: (XXX) XXX-XXXX</div>
      </div>
      <div className="field">
        <label>Credit Card</label>
        <input value={card} onChange={e => setCard(maskCard(e.target.value))} placeholder="1234 5678 9012 3456" />
        <div className="hint">Format: XXXX XXXX XXXX XXXX</div>
      </div>
      <div className="field">
        <label>Date</label>
        <input value={date} onChange={e => setDate(maskDate(e.target.value))} placeholder="MM/DD/YYYY" />
        <div className="hint">Format: MM/DD/YYYY</div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.field { margin-bottom: 16px; }
label { display: block; margin-bottom: 4px; font-size: 14px; color: #94a3b8; }
input {
  width: 100%; padding: 10px 12px; border-radius: 8px;
  border: 1px solid #334155; background: #1e293b; color: #e2e8f0; outline: none;
}
input:focus { border-color: #3b82f6; }
.parsed {
  font-size: 13px; margin-top: 6px; padding: 8px 10px;
  background: rgba(59,130,246,0.1); border-radius: 6px; color: #93c5fd;
}`,
      js: `const { useState } = React;

function App() {
  const [dateRaw, setDateRaw] = useState('');
  const [numRaw, setNumRaw] = useState('');

  const parseDate = (s) => {
    if (!s) return null;
    const cleaned = s.replace(/[.\\/\\-]/g, '/');
    const d = new Date(cleaned);
    if (!isNaN(d.getTime())) return d.toLocaleDateString('en-US', {weekday:'long',year:'numeric',month:'long',day:'numeric'});
    const parts = cleaned.split('/');
    if (parts.length === 3) {
      const d2 = new Date(parts[2], parts[0]-1, parts[1]);
      if (!isNaN(d2.getTime())) return d2.toLocaleDateString('en-US', {weekday:'long',year:'numeric',month:'long',day:'numeric'});
    }
    return 'Could not parse date';
  };

  const parseNum = (s) => {
    if (!s) return null;
    const cleaned = s.replace(/[$,\\s]/g, '').replace(/k$/i, '000').replace(/m$/i, '000000');
    const n = parseFloat(cleaned);
    return isNaN(n) ? 'Could not parse' : '$' + n.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
  };

  return (
    <div>
      <div className="field">
        <label>Enter a date (any format)</label>
        <input value={dateRaw} onChange={e => setDateRaw(e.target.value)} placeholder="jan 15 2024, 1/15/24, 2024-01-15..." />
        {dateRaw && <div className="parsed">Parsed: {parseDate(dateRaw)}</div>}
      </div>
      <div className="field">
        <label>Enter a number/currency</label>
        <input value={numRaw} onChange={e => setNumRaw(e.target.value)} placeholder="$1,234.56, 5k, 2.5m..." />
        {numRaw && <div className="parsed">Parsed: {parseNum(numRaw)}</div>}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `label { display: block; margin-bottom: 4px; font-size: 14px; color: #94a3b8; }
textarea {
  width: 100%; min-height: 44px; padding: 10px 12px;
  border-radius: 8px; border: 1px solid #334155; background: #1e293b;
  color: #e2e8f0; outline: none; font-size: 14px; font-family: inherit;
  resize: none; overflow: hidden; line-height: 1.5;
}
textarea:focus { border-color: #3b82f6; }
.char-count { font-size: 12px; color: #64748b; text-align: right; margin-top: 4px; }`,
      js: `const { useState, useRef, useEffect } = React;

function App() {
  const [text, setText] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  }, [text]);

  return (
    <div>
      <label>Auto-expanding textarea</label>
      <textarea ref={ref} value={text} onChange={e => setText(e.target.value)}
        placeholder="Start typing... the textarea grows automatically as you type more content." />
      <div className="char-count">{text.length} characters</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.prompt-wrap { position: relative; }
input {
  width: 100%; padding: 10px 12px; border-radius: 8px;
  border: 1px solid #334155; background: #1e293b; color: #e2e8f0; outline: none;
}
input:focus { border-color: #3b82f6; }
.ghost {
  position: absolute; top: 0; left: 0; right: 0;
  padding: 10px 12px; font-size: 14px; color: #475569;
  pointer-events: none; white-space: nowrap; overflow: hidden;
}
.hint-text { font-size: 12px; color: #64748b; margin-top: 6px; }
.suggestions {
  display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px;
}
.chip {
  padding: 6px 12px; border-radius: 20px; font-size: 12px;
  background: #334155; color: #94a3b8; cursor: pointer; border: none;
}
.chip:hover { background: #475569; color: #e2e8f0; }`,
      js: `const { useState } = React;

const prompts = ['Build a todo app','Create a weather dashboard','Design a chat interface','Make a recipe finder','Build a music player'];

function App() {
  const [value, setValue] = useState('');
  const match = value ? prompts.find(p => p.toLowerCase().startsWith(value.toLowerCase())) : null;

  const onKey = (e) => {
    if (e.key === 'Tab' && match) { e.preventDefault(); setValue(match); }
  };

  return (
    <div>
      <label style={{display:'block',marginBottom:4,fontSize:14,color:'#94a3b8'}}>What would you like to build?</label>
      <div className="prompt-wrap">
        {match && <div className="ghost"><span style={{visibility:'hidden'}}>{value}</span>{match.slice(value.length)}</div>}
        <input value={value} onChange={e => setValue(e.target.value)} onKeyDown={onKey}
          placeholder="Start typing..." style={{position:'relative',background:'transparent'}} />
      </div>
      <div className="hint-text">Press Tab to autocomplete</div>
      <div className="suggestions">
        {prompts.map(p => <button key={p} className="chip" onClick={() => setValue(p)}>{p}</button>)}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.editable {
  padding: 8px 12px; border-radius: 6px; cursor: pointer;
  border: 1px solid transparent; min-height: 20px;
}
.editable:hover { background: #1e293b; border-color: #334155; }
.edit-input {
  width: 100%; padding: 8px 12px; border-radius: 6px;
  border: 2px solid #3b82f6; background: #1e293b; color: #e2e8f0;
  outline: none; font-size: inherit; font-family: inherit;
}
.item { margin-bottom: 12px; }
.item-label { font-size: 12px; color: #64748b; margin-bottom: 2px; }
.hint { font-size: 12px; color: #475569; margin-top: 12px; text-align: center; }`,
      js: `const { useState, useRef, useEffect } = React;

function EditableField({ label, value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef(null);

  useEffect(() => { if (editing && ref.current) ref.current.focus(); }, [editing]);

  const save = () => { onSave(draft); setEditing(false); };
  const cancel = () => { setDraft(value); setEditing(false); };

  return (
    <div className="item">
      <div className="item-label">{label}</div>
      {editing ? (
        <input ref={ref} className="edit-input" value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={save} onKeyDown={e => { if (e.key==='Enter') save(); if (e.key==='Escape') cancel(); }} />
      ) : (
        <div className="editable" onClick={() => setEditing(true)}
          style={{color: value ? '#e2e8f0' : '#475569'}}>
          {value || 'Click to edit...'}
        </div>
      )}
    </div>
  );
}

function App() {
  const [data, setData] = useState({ name: 'John Doe', email: 'john@example.com', bio: '' });
  const update = (key) => (val) => setData(d => ({...d, [key]: val}));

  return (
    <div>
      <EditableField label="Name" value={data.name} onSave={update('name')} />
      <EditableField label="Email" value={data.email} onSave={update('email')} />
      <EditableField label="Bio" value={data.bio} onSave={update('bio')} />
      <div className="hint">Click any field to edit inline</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.select-wrap { position: relative; }
.select-btn {
  width: 100%; padding: 10px 12px; border-radius: 8px;
  border: 1px solid #334155; background: #1e293b; color: #e2e8f0;
  cursor: pointer; display: flex; justify-content: space-between; align-items: center;
  font-size: 14px;
}
.select-btn:hover { border-color: #475569; }
.select-btn.open { border-color: #3b82f6; }
.dropdown {
  position: absolute; top: 100%; left: 0; right: 0; margin-top: 4px;
  background: #1e293b; border: 1px solid #334155; border-radius: 8px;
  max-height: 180px; overflow-y: auto; z-index: 10;
}
.opt {
  padding: 10px 12px; cursor: pointer; font-size: 14px; color: #e2e8f0;
  display: flex; justify-content: space-between;
}
.opt:hover, .opt.active { background: #334155; }
.opt.selected { color: #3b82f6; }
label { display: block; margin-bottom: 4px; font-size: 14px; color: #94a3b8; }`,
      js: `const { useState, useRef, useEffect } = React;

const options = ['JavaScript','TypeScript','Python','Rust','Go'];

function App() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [active, setActive] = useState(-1);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const onKey = (e) => {
    if (!open) { if (e.key === 'Enter' || e.key === ' ') { setOpen(true); e.preventDefault(); } return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a+1, options.length-1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a-1, 0)); }
    if (e.key === 'Enter' && active >= 0) { setSelected(options[active]); setOpen(false); }
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div>
      <label>Favorite Language</label>
      <div className="select-wrap" ref={ref}>
        <div className={'select-btn' + (open ? ' open' : '')} tabIndex="0"
          onClick={() => setOpen(!open)} onKeyDown={onKey}
          role="combobox" aria-expanded={open}>
          <span>{selected || 'Select...'}</span>
          <span>{open ? '\\u25B2' : '\\u25BC'}</span>
        </div>
        {open && (
          <div className="dropdown" role="listbox">
            {options.map((o, i) => (
              <div key={o} className={'opt' + (i === active ? ' active' : '') + (o === selected ? ' selected' : '')}
                role="option" aria-selected={o === selected}
                onMouseEnter={() => setActive(i)}
                onClick={() => { setSelected(o); setOpen(false); }}>
                {o} {o === selected && '\\u2713'}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.copy-box {
  background: #1e293b; border-radius: 8px; padding: 12px; margin-bottom: 12px;
  display: flex; align-items: center; gap: 8px; border: 1px solid #334155;
}
.copy-box code {
  flex: 1; font-family: monospace; font-size: 13px; color: #e2e8f0;
  overflow-x: auto; white-space: nowrap;
}
.copy-btn {
  padding: 6px 12px; border-radius: 6px; border: none;
  background: #334155; color: #94a3b8; cursor: pointer; font-size: 12px;
  white-space: nowrap; transition: all 0.15s;
}
.copy-btn:hover { background: #475569; color: #e2e8f0; }
.copy-btn.copied { background: rgba(34,197,94,0.2); color: #22c55e; }
label { display: block; margin-bottom: 6px; font-size: 14px; color: #94a3b8; }`,
      js: `const { useState } = React;

function CopyBox({ label, text }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div>
      <label>{label}</label>
      <div className="copy-box">
        <code>{text}</code>
        <button className={'copy-btn' + (copied ? ' copied' : '')} onClick={copy}>
          {copied ? '\\u2713 Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <CopyBox label="Install command" text="npm install react@latest" />
      <CopyBox label="API Key" text="sk_live_abc123def456ghi789" />
      <CopyBox label="Webhook URL" text="https://api.example.com/webhooks/events" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.cal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.cal-header button { background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 18px; }
.cal-header button:hover { color: #e2e8f0; }
.cal-title { font-weight: 600; color: #e2e8f0; }
.cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
.day-hdr { font-size: 11px; color: #64748b; text-align: center; padding: 4px; }
.day-cell {
  min-height: 60px; background: #1e293b; border-radius: 6px; padding: 4px;
  font-size: 11px; cursor: pointer;
}
.day-cell:hover { background: #334155; }
.day-cell .num { color: #94a3b8; margin-bottom: 2px; }
.day-cell.today .num { color: #3b82f6; font-weight: 700; }
.event-dot {
  font-size: 10px; padding: 1px 4px; border-radius: 3px; margin-bottom: 1px;
  overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
}`,
      js: `const { useState } = React;

const colors = ['#3b82f6','#22c55e','#eab308','#ef4444','#a855f7'];
const initEvents = [
  { id: 1, day: 5, title: 'Team standup', color: colors[0] },
  { id: 2, day: 12, title: 'Sprint review', color: colors[1] },
  { id: 3, day: 12, title: 'Lunch meeting', color: colors[3] },
  { id: 4, day: 20, title: 'Release day', color: colors[2] },
  { id: 5, day: 25, title: 'Workshop', color: colors[4] },
];

function App() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState(initEvents);
  const y = date.getFullYear(), m = date.getMonth();
  const daysInMonth = new Date(y, m+1, 0).getDate();
  const startDay = new Date(y, m, 1).getDay();
  const today = new Date();
  const labels = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);

  const addEvent = (day) => {
    const title = prompt('Event name:');
    if (title) setEvents(e => [...e, { id: Date.now(), day, title, color: colors[Math.floor(Math.random()*colors.length)] }]);
  };

  return (
    <div>
      <div className="cal-header">
        <button onClick={() => setDate(new Date(y, m-1, 1))}>\\u25C0</button>
        <span className="cal-title">{months[m]} {y}</span>
        <button onClick={() => setDate(new Date(y, m+1, 1))}>\\u25B6</button>
      </div>
      <div className="cal-grid">
        {labels.map(l => <div key={l} className="day-hdr">{l}</div>)}
        {cells.map((d, i) => d ? (
          <div key={i} className={'day-cell' + (d === today.getDate() && m === today.getMonth() && y === today.getFullYear() ? ' today' : '')}
            onClick={() => addEvent(d)}>
            <div className="num">{d}</div>
            {events.filter(e => e.day === d).map(e => (
              <div key={e.id} className="event-dot" style={{background: e.color + '33', color: e.color}}>{e.title}</div>
            ))}
          </div>
        ) : <div key={i} />)}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.6);
  display: flex; align-items: center; justify-content: center; z-index: 50;
}
.modal {
  background: #1e293b; border-radius: 12px; padding: 24px; width: 90%; max-width: 400px;
  border: 1px solid #334155;
}
.modal h2 { margin: 0 0 8px; color: #e2e8f0; font-size: 18px; }
.modal p { color: #94a3b8; font-size: 14px; margin: 0 0 20px; }
.modal-actions { display: flex; gap: 8px; justify-content: flex-end; }
.btn {
  padding: 8px 16px; border-radius: 6px; border: none; cursor: pointer; font-size: 14px;
}
.btn-primary { background: #3b82f6; color: white; }
.btn-primary:hover { background: #2563eb; }
.btn-secondary { background: #334155; color: #94a3b8; }
.btn-secondary:hover { background: #475569; }
.trigger { padding: 10px 20px; border-radius: 8px; border: none; background: #3b82f6; color: white; cursor: pointer; font-size: 14px; }
.trigger:hover { background: #2563eb; }`,
      js: `const { useState, useEffect, useRef } = React;

function Modal({ open, onClose, title, children }) {
  const ref = useRef(null);
  useEffect(() => {
    if (open && ref.current) ref.current.focus();
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  if (!open) return null;
  return ReactDOM.createPortal(
    <div className="overlay" onClick={onClose}>
      <div className="modal" ref={ref} tabIndex="-1" role="dialog" aria-modal="true"
        onClick={e => e.stopPropagation()}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>,
    document.body
  );
}

function App() {
  const [show, setShow] = useState(false);
  return (
    <div style={{textAlign:'center', paddingTop: 40}}>
      <button className="trigger" onClick={() => setShow(true)}>Open Modal</button>
      <Modal open={show} onClose={() => setShow(false)} title="Confirm Action">
        <p>Are you sure you want to proceed with this action? This cannot be undone.</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={() => setShow(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={() => setShow(false)}>Confirm</button>
        </div>
      </Modal>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.board { display: flex; gap: 12px; }
.column {
  flex: 1; background: #1e293b; border-radius: 10px; padding: 10px; min-height: 200px;
}
.col-title { font-size: 13px; font-weight: 600; color: #94a3b8; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
.card {
  background: #334155; border-radius: 8px; padding: 10px; margin-bottom: 6px;
  cursor: grab; font-size: 13px; color: #e2e8f0; border: 1px solid transparent;
}
.card:active { cursor: grabbing; }
.card.dragging { opacity: 0.5; border-color: #3b82f6; }
.column.over { background: #1e3a5f; }
.tag { display: inline-block; font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-top: 4px; }`,
      js: `const { useState } = React;

const init = {
  todo: [{ id: 1, text: 'Design mockups', tag: 'Design', color: '#a855f7' }, { id: 2, text: 'Set up CI/CD', tag: 'DevOps', color: '#22c55e' }],
  progress: [{ id: 3, text: 'Build API endpoints', tag: 'Backend', color: '#3b82f6' }],
  done: [{ id: 4, text: 'Write project brief', tag: 'Docs', color: '#eab308' }]
};

function App() {
  const [cols, setCols] = useState(init);
  const [dragging, setDragging] = useState(null);
  const [overCol, setOverCol] = useState(null);

  const onDragStart = (col, id) => setDragging({ col, id });
  const onDragOver = (e, col) => { e.preventDefault(); setOverCol(col); };
  const onDrop = (toCol) => {
    if (!dragging) return;
    const { col: fromCol, id } = dragging;
    if (fromCol === toCol) { setDragging(null); setOverCol(null); return; }
    setCols(c => {
      const item = c[fromCol].find(i => i.id === id);
      return { ...c, [fromCol]: c[fromCol].filter(i => i.id !== id), [toCol]: [...c[toCol], item] };
    });
    setDragging(null); setOverCol(null);
  };

  const titles = { todo: 'To Do', progress: 'In Progress', done: 'Done' };

  return (
    <div className="board">
      {Object.keys(cols).map(col => (
        <div key={col} className={'column' + (overCol === col ? ' over' : '')}
          onDragOver={e => onDragOver(e, col)} onDragLeave={() => setOverCol(null)} onDrop={() => onDrop(col)}>
          <div className="col-title">{titles[col]} ({cols[col].length})</div>
          {cols[col].map(item => (
            <div key={item.id} className={'card' + (dragging && dragging.id === item.id ? ' dragging' : '')}
              draggable onDragStart={() => onDragStart(col, item.id)}>
              {item.text}
              <div><span className="tag" style={{background: item.color + '33', color: item.color}}>{item.tag}</span></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `table { width: 100%; border-collapse: collapse; }
th {
  text-align: left; padding: 10px 12px; font-size: 12px; color: #64748b;
  border-bottom: 1px solid #334155; cursor: pointer; user-select: none;
  text-transform: uppercase; letter-spacing: 0.5px;
}
th:hover { color: #94a3b8; }
td { padding: 10px 12px; font-size: 14px; color: #e2e8f0; border-bottom: 1px solid #1e293b; }
tr:hover td { background: #1e293b; }
tr.selected td { background: rgba(59,130,246,0.1); }
.cb { width: 16px; height: 16px; accent-color: #3b82f6; cursor: pointer; }
.sort-icon { margin-left: 4px; font-size: 10px; }
.badge {
  display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 11px;
}`,
      js: `const { useState } = React;

const data = [
  { id: 1, name: 'Alice Johnson', role: 'Engineer', status: 'Active', salary: 95000 },
  { id: 2, name: 'Bob Smith', role: 'Designer', status: 'Active', salary: 85000 },
  { id: 3, name: 'Carol White', role: 'Manager', status: 'Away', salary: 110000 },
  { id: 4, name: 'Dan Brown', role: 'Engineer', status: 'Active', salary: 92000 },
];

const statusColors = { Active: '#22c55e', Away: '#eab308' };

function App() {
  const [sortKey, setSortKey] = useState('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [selected, setSelected] = useState([]);

  const sorted = [...data].sort((a, b) => {
    const v = a[sortKey] > b[sortKey] ? 1 : -1;
    return sortAsc ? v : -v;
  });

  const toggleSort = (key) => { if (sortKey === key) setSortAsc(!sortAsc); else { setSortKey(key); setSortAsc(true); } };
  const toggleSel = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const toggleAll = () => setSelected(s => s.length === data.length ? [] : data.map(d => d.id));
  const icon = (key) => sortKey === key ? (sortAsc ? ' \\u25B2' : ' \\u25BC') : '';

  return (
    <table>
      <thead>
        <tr>
          <th><input type="checkbox" className="cb" checked={selected.length === data.length} onChange={toggleAll} /></th>
          <th onClick={() => toggleSort('name')}>Name<span className="sort-icon">{icon('name')}</span></th>
          <th onClick={() => toggleSort('role')}>Role<span className="sort-icon">{icon('role')}</span></th>
          <th onClick={() => toggleSort('status')}>Status<span className="sort-icon">{icon('status')}</span></th>
          <th onClick={() => toggleSort('salary')}>Salary<span className="sort-icon">{icon('salary')}</span></th>
        </tr>
      </thead>
      <tbody>
        {sorted.map(r => (
          <tr key={r.id} className={selected.includes(r.id) ? 'selected' : ''}>
            <td><input type="checkbox" className="cb" checked={selected.includes(r.id)} onChange={() => toggleSel(r.id)} /></td>
            <td>{r.name}</td>
            <td>{r.role}</td>
            <td><span className="badge" style={{background: statusColors[r.status] + '22', color: statusColors[r.status]}}>{r.status}</span></td>
            <td>{'$' + r.salary.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
