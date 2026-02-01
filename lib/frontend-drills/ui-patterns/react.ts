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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.toolbar { display: flex; gap: 8px; margin-bottom: 12px; align-items: center; }
.toolbar input, .toolbar select {
  padding: 8px 10px; border-radius: 6px; border: 1px solid #334155;
  background: #1e293b; color: #e2e8f0; font-size: 13px; outline: none;
}
.toolbar input:focus { border-color: #3b82f6; }
.grid { border: 1px solid #334155; border-radius: 8px; overflow: hidden; }
.grid-header, .grid-row { display: grid; grid-template-columns: 40px 1fr 100px 80px 80px; }
.grid-header { background: #1e293b; }
.grid-header div { padding: 10px 8px; font-size: 11px; color: #64748b; text-transform: uppercase; cursor: pointer; }
.grid-row { border-top: 1px solid #1e293b; }
.grid-row:hover { background: #1e293b; }
.grid-row div { padding: 8px; font-size: 13px; color: #e2e8f0; display: flex; align-items: center; }
.badge { padding: 2px 8px; border-radius: 10px; font-size: 11px; }
.cb { accent-color: #3b82f6; }`,
      js: `const { useState, useMemo } = React;

const rows = Array.from({length: 20}, (_, i) => ({
  id: i+1, name: ['Widget','Gadget','Doohickey','Thingamajig','Gizmo'][i%5] + ' ' + (i+1),
  category: ['Electronics','Hardware','Software','Services'][i%4],
  price: Math.round(10 + Math.random()*490), stock: Math.floor(Math.random()*200)
}));

function App() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [sortKey, setSortKey] = useState('id');
  const [asc, setAsc] = useState(true);

  const cats = ['All', ...new Set(rows.map(r => r.category))];

  const filtered = useMemo(() => {
    let d = rows;
    if (catFilter !== 'All') d = d.filter(r => r.category === catFilter);
    if (search) d = d.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));
    d = [...d].sort((a,b) => { const v = a[sortKey] > b[sortKey] ? 1 : -1; return asc ? v : -v; });
    return d;
  }, [search, catFilter, sortKey, asc]);

  const sort = (k) => { if (sortKey === k) setAsc(!asc); else { setSortKey(k); setAsc(true); } };

  return (
    <div>
      <div className="toolbar">
        <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} style={{flex:1}} />
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}>
          {cats.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="grid">
        <div className="grid-header">
          <div onClick={() => sort('id')}>#</div>
          <div onClick={() => sort('name')}>Name</div>
          <div onClick={() => sort('category')}>Category</div>
          <div onClick={() => sort('price')}>Price</div>
          <div onClick={() => sort('stock')}>Stock</div>
        </div>
        {filtered.slice(0,8).map(r => (
          <div key={r.id} className="grid-row">
            <div style={{color:'#64748b'}}>{r.id}</div>
            <div>{r.name}</div>
            <div><span className="badge" style={{background:'#334155'}}>{r.category}</span></div>
            <div>{'$'+r.price}</div>
            <div style={{color: r.stock < 50 ? '#ef4444' : '#22c55e'}}>{r.stock}</div>
          </div>
        ))}
      </div>
      <div style={{fontSize:12,color:'#64748b',marginTop:8}}>{filtered.length} items</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.carousel { position: relative; overflow: hidden; border-radius: 12px; }
.slides { display: flex; transition: transform 0.4s ease; }
.slide {
  min-width: 100%; aspect-ratio: 16/9; display: flex; align-items: center;
  justify-content: center; font-size: 24px; font-weight: 700; color: white;
}
.nav-btn {
  position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(0,0,0,0.5); border: none; color: white; width: 36px; height: 36px;
  border-radius: 50%; cursor: pointer; font-size: 16px; z-index: 2;
}
.nav-btn:hover { background: rgba(0,0,0,0.8); }
.nav-btn.prev { left: 8px; }
.nav-btn.next { right: 8px; }
.dots { display: flex; justify-content: center; gap: 6px; margin-top: 10px; }
.dot {
  width: 8px; height: 8px; border-radius: 50%; background: #475569;
  border: none; cursor: pointer; padding: 0;
}
.dot.active { background: #3b82f6; width: 20px; border-radius: 4px; }
.controls { display: flex; justify-content: center; margin-top: 8px; }
.play-btn { background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 14px; }`,
      js: `const { useState, useEffect, useRef } = React;

const slides = [
  { bg: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', label: 'Slide 1' },
  { bg: 'linear-gradient(135deg, #22c55e, #15803d)', label: 'Slide 2' },
  { bg: 'linear-gradient(135deg, #a855f7, #7c3aed)', label: 'Slide 3' },
  { bg: 'linear-gradient(135deg, #ef4444, #dc2626)', label: 'Slide 4' },
];

function App() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    if (playing) timerRef.current = setInterval(() => setIdx(i => (i + 1) % slides.length), 3000);
    return () => clearInterval(timerRef.current);
  }, [playing]);

  const go = (i) => setIdx(((i % slides.length) + slides.length) % slides.length);

  return (
    <div>
      <div className="carousel">
        <div className="slides" style={{transform: 'translateX(-' + (idx * 100) + '%)'}}>
          {slides.map((s, i) => (
            <div key={i} className="slide" style={{background: s.bg}}>{s.label}</div>
          ))}
        </div>
        <button className="nav-btn prev" onClick={() => go(idx - 1)}>\\u25C0</button>
        <button className="nav-btn next" onClick={() => go(idx + 1)}>\\u25B6</button>
      </div>
      <div className="dots">
        {slides.map((_, i) => <button key={i} className={'dot' + (i === idx ? ' active' : '')} onClick={() => setIdx(i)} />)}
      </div>
      <div className="controls">
        <button className="play-btn" onClick={() => setPlaying(!playing)}>{playing ? '\\u23F8 Pause' : '\\u25B6 Play'}</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.tabs-bar {
  display: flex; border-bottom: 1px solid #334155; margin-bottom: 16px;
}
.tab-btn {
  padding: 10px 20px; background: none; border: none; border-bottom: 2px solid transparent;
  color: #64748b; cursor: pointer; font-size: 14px; transition: all 0.2s;
}
.tab-btn:hover { color: #94a3b8; }
.tab-btn.active { color: #3b82f6; border-bottom-color: #3b82f6; }
.tab-content {
  animation: fadeIn 0.3s ease;
  color: #e2e8f0; font-size: 14px; line-height: 1.6;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
.tab-content h3 { margin: 0 0 8px; font-size: 16px; }
.tab-content p { color: #94a3b8; margin: 0; }`,
      js: `const { useState } = React;

const tabs = [
  { id: 'overview', label: 'Overview', content: { title: 'Project Overview', text: 'This dashboard provides a comprehensive view of your project metrics, team activity, and upcoming milestones.' } },
  { id: 'activity', label: 'Activity', content: { title: 'Recent Activity', text: '3 new commits pushed to main branch. Code review completed for PR #42. Deployment scheduled for Friday.' } },
  { id: 'settings', label: 'Settings', content: { title: 'Project Settings', text: 'Configure notifications, team permissions, and integration settings for your project workspace.' } },
];

function App() {
  const [active, setActive] = useState('overview');
  const tab = tabs.find(t => t.id === active);

  return (
    <div>
      <div className="tabs-bar" role="tablist">
        {tabs.map(t => (
          <button key={t.id} role="tab" aria-selected={t.id === active}
            className={'tab-btn' + (t.id === active ? ' active' : '')}
            onClick={() => setActive(t.id)}>{t.label}</button>
        ))}
      </div>
      <div className="tab-content" key={active} role="tabpanel">
        <h3>{tab.content.title}</h3>
        <p>{tab.content.text}</p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.swipe-item {
  position: relative; overflow: hidden; margin-bottom: 8px; border-radius: 8px;
}
.swipe-bg {
  position: absolute; inset: 0; display: flex; align-items: center;
  justify-content: flex-end; padding-right: 16px; font-size: 13px; font-weight: 600;
}
.swipe-bg.delete { background: #ef4444; color: white; }
.swipe-bg.archive { background: #3b82f6; color: white; justify-content: flex-start; padding-left: 16px; }
.swipe-content {
  background: #1e293b; padding: 14px 16px; position: relative;
  transition: transform 0.2s; cursor: grab; border: 1px solid #334155; border-radius: 8px;
}
.swipe-content .title { color: #e2e8f0; font-size: 14px; }
.swipe-content .sub { color: #64748b; font-size: 12px; margin-top: 2px; }
.hint { text-align: center; color: #475569; font-size: 12px; margin-top: 12px; }`,
      js: `const { useState, useRef } = React;

const initItems = [
  { id: 1, title: 'Meeting with team', sub: 'Tomorrow at 10am' },
  { id: 2, title: 'Review PR #42', sub: 'From Alice' },
  { id: 3, title: 'Deploy to staging', sub: 'Scheduled today' },
  { id: 4, title: 'Update documentation', sub: 'Due this week' },
];

function SwipeItem({ item, onDelete }) {
  const [offset, setOffset] = useState(0);
  const startX = useRef(0);
  const dragging = useRef(false);

  const onMouseDown = (e) => { startX.current = e.clientX; dragging.current = true; };
  const onMouseMove = (e) => { if (!dragging.current) return; setOffset(e.clientX - startX.current); };
  const onMouseUp = () => {
    dragging.current = false;
    if (offset < -80) { onDelete(item.id); }
    setOffset(0);
  };

  return (
    <div className="swipe-item">
      <div className={'swipe-bg' + (offset < 0 ? ' delete' : ' archive')}>
        {offset < 0 ? 'Delete' : 'Archive'}
      </div>
      <div className="swipe-content" style={{transform: 'translateX(' + offset + 'px)'}}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
        <div className="title">{item.title}</div>
        <div className="sub">{item.sub}</div>
      </div>
    </div>
  );
}

function App() {
  const [items, setItems] = useState(initItems);
  const onDelete = (id) => setItems(i => i.filter(x => x.id !== id));
  return (
    <div>
      {items.map(item => <SwipeItem key={item.id} item={item} onDelete={onDelete} />)}
      {items.length === 0 && <div style={{textAlign:'center',color:'#64748b',padding:20}}>All cleared!</div>}
      <div className="hint">Drag items left to delete</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.card {
  background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 16px;
  margin-bottom: 8px; cursor: pointer; user-select: none; transition: all 0.15s;
}
.card:hover { border-color: #475569; }
.card.pressed { transform: scale(0.98); border-color: #3b82f6; }
.card .title { color: #e2e8f0; font-size: 14px; }
.card .sub { color: #64748b; font-size: 12px; margin-top: 2px; }
.context-menu {
  position: fixed; background: #1e293b; border: 1px solid #334155; border-radius: 8px;
  padding: 4px; z-index: 100; min-width: 150px; box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}
.ctx-item {
  padding: 8px 12px; font-size: 13px; color: #e2e8f0; cursor: pointer; border-radius: 4px;
}
.ctx-item:hover { background: #334155; }
.hint { text-align: center; color: #475569; font-size: 12px; margin-top: 12px; }`,
      js: `const { useState, useRef, useEffect } = React;

function App() {
  const [menu, setMenu] = useState(null);
  const timerRef = useRef(null);
  const [pressed, setPressed] = useState(null);

  const items = [
    { id: 1, title: 'Project Alpha', sub: '3 tasks remaining' },
    { id: 2, title: 'Project Beta', sub: '7 tasks remaining' },
    { id: 3, title: 'Project Gamma', sub: 'Completed' },
  ];

  const startPress = (id, e) => {
    setPressed(id);
    timerRef.current = setTimeout(() => {
      setMenu({ id, x: e.clientX, y: e.clientY });
      setPressed(null);
    }, 600);
  };

  const endPress = () => { clearTimeout(timerRef.current); setPressed(null); };

  useEffect(() => {
    const close = () => setMenu(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  return (
    <div>
      {items.map(item => (
        <div key={item.id} className={'card' + (pressed === item.id ? ' pressed' : '')}
          onMouseDown={(e) => startPress(item.id, e)} onMouseUp={endPress} onMouseLeave={endPress}>
          <div className="title">{item.title}</div>
          <div className="sub">{item.sub}</div>
        </div>
      ))}
      {menu && (
        <div className="context-menu" style={{left: menu.x, top: menu.y}} onClick={e => e.stopPropagation()}>
          <div className="ctx-item" onClick={() => setMenu(null)}>\\u270F Edit</div>
          <div className="ctx-item" onClick={() => setMenu(null)}>\\u{1F4CB} Duplicate</div>
          <div className="ctx-item" onClick={() => setMenu(null)}>\\u{1F4E6} Archive</div>
          <div className="ctx-item" style={{color:'#ef4444'}} onClick={() => setMenu(null)}>\\u{1F5D1} Delete</div>
        </div>
      )}
      <div className="hint">Long press (hold) on an item for context menu</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.zoom-container {
  position: relative; overflow: hidden; border-radius: 12px;
  background: #1e293b; border: 1px solid #334155; height: 250px;
  cursor: grab; display: flex; align-items: center; justify-content: center;
}
.zoom-content { transition: transform 0.15s ease; user-select: none; }
.zoom-controls {
  display: flex; justify-content: center; gap: 8px; margin-top: 12px;
}
.zoom-btn {
  padding: 8px 16px; border-radius: 6px; border: none;
  background: #334155; color: #e2e8f0; cursor: pointer; font-size: 16px;
}
.zoom-btn:hover { background: #475569; }
.zoom-level { color: #94a3b8; font-size: 13px; padding: 8px; }
.grid-pattern {
  display: grid; grid-template-columns: repeat(4, 50px); gap: 8px;
}
.grid-cell {
  width: 50px; height: 50px; border-radius: 6px; display: flex;
  align-items: center; justify-content: center; font-size: 20px;
}`,
      js: `const { useState } = React;

const emojis = ['\\u{1F680}','\\u{2B50}','\\u{1F525}','\\u{1F48E}','\\u{1F30D}','\\u{1F308}','\\u{26A1}','\\u{1F3AF}',
  '\\u{1F4A1}','\\u{1F33F}','\\u{1F3B5}','\\u{2764}','\\u{1F680}','\\u{1F31F}','\\u{1F30A}','\\u{1F33B}'];
const colors = ['#3b82f6','#22c55e','#eab308','#ef4444','#a855f7','#ec4899','#06b6d4','#f97316'];

function App() {
  const [scale, setScale] = useState(1);

  const zoomIn = () => setScale(s => Math.min(s + 0.25, 3));
  const zoomOut = () => setScale(s => Math.max(s - 0.25, 0.5));
  const reset = () => setScale(1);
  const onWheel = (e) => { e.preventDefault(); e.deltaY < 0 ? zoomIn() : zoomOut(); };

  return (
    <div>
      <div className="zoom-container" onWheel={onWheel}>
        <div className="zoom-content" style={{transform: 'scale(' + scale + ')'}}>
          <div className="grid-pattern">
            {emojis.map((e, i) => (
              <div key={i} className="grid-cell" style={{background: colors[i % colors.length] + '22'}}>
                {e}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="zoom-controls">
        <button className="zoom-btn" onClick={zoomOut}>\\u2212</button>
        <span className="zoom-level">{Math.round(scale * 100)}%</span>
        <button className="zoom-btn" onClick={zoomIn}>+</button>
        <button className="zoom-btn" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.pull-area {
  text-align: center; overflow: hidden; transition: height 0.3s; color: #64748b; font-size: 13px;
  display: flex; align-items: center; justify-content: center;
}
.pull-area.refreshing { color: #3b82f6; }
.feed-item {
  padding: 12px 16px; background: #1e293b; border-radius: 8px; margin-bottom: 6px;
  border: 1px solid #334155;
}
.feed-item .title { color: #e2e8f0; font-size: 14px; }
.feed-item .time { color: #64748b; font-size: 12px; margin-top: 2px; }
.spinner { animation: spin 1s linear infinite; display: inline-block; }
@keyframes spin { to { transform: rotate(360deg); } }
.hint { text-align: center; color: #475569; font-size: 12px; margin-top: 12px; }`,
      js: `const { useState, useCallback } = React;

function App() {
  const [items, setItems] = useState([
    { id: 1, title: 'Server deployment complete', time: '2 min ago' },
    { id: 2, title: 'New user registered', time: '5 min ago' },
    { id: 3, title: 'Database backup finished', time: '12 min ago' },
  ]);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setItems(prev => [{
        id: Date.now(),
        title: ['Build passed','PR merged','Test suite green','Cache cleared'][Math.floor(Math.random()*4)],
        time: 'Just now'
      }, ...prev]);
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <div>
      <div className={'pull-area' + (refreshing ? ' refreshing' : '')} style={{height: refreshing ? 40 : 0}}>
        {refreshing && <span><span className="spinner">\\u21BB</span> Refreshing...</span>}
      </div>
      <button onClick={refresh} disabled={refreshing}
        style={{width:'100%',padding:'10px',borderRadius:8,border:'1px dashed #334155',background:'none',color:'#64748b',cursor:'pointer',marginBottom:12}}>
        {refreshing ? 'Refreshing...' : '\\u2193 Pull to refresh (click to simulate)'}
      </button>
      {items.map(item => (
        <div key={item.id} className="feed-item">
          <div className="title">{item.title}</div>
          <div className="time">{item.time}</div>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.list-item {
  display: flex; align-items: center; gap: 12px; padding: 12px 14px;
  background: #1e293b; border: 1px solid #334155; border-radius: 8px;
  margin-bottom: 4px; cursor: grab; user-select: none; transition: all 0.15s;
}
.list-item:hover { border-color: #475569; }
.list-item.dragging { opacity: 0.5; border-color: #3b82f6; }
.list-item.over { border-top: 2px solid #3b82f6; }
.handle { color: #475569; font-size: 16px; }
.item-text { flex: 1; color: #e2e8f0; font-size: 14px; }
.item-num { color: #64748b; font-size: 12px; min-width: 24px; }`,
      js: `const { useState } = React;

const init = ['Learn React hooks','Build a todo app','Write unit tests','Deploy to production','Set up CI/CD'];

function App() {
  const [items, setItems] = useState(init);
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);

  const onDragStart = (i) => setDragIdx(i);
  const onDragOver = (e, i) => { e.preventDefault(); setOverIdx(i); };
  const onDrop = (i) => {
    if (dragIdx === null) return;
    const newItems = [...items];
    const [moved] = newItems.splice(dragIdx, 1);
    newItems.splice(i, 0, moved);
    setItems(newItems);
    setDragIdx(null); setOverIdx(null);
  };
  const onDragEnd = () => { setDragIdx(null); setOverIdx(null); };

  return (
    <div>
      {items.map((item, i) => (
        <div key={item}
          className={'list-item' + (dragIdx === i ? ' dragging' : '') + (overIdx === i ? ' over' : '')}
          draggable onDragStart={() => onDragStart(i)} onDragOver={e => onDragOver(e, i)}
          onDrop={() => onDrop(i)} onDragEnd={onDragEnd}>
          <span className="handle">\\u2630</span>
          <span className="item-num">{i + 1}.</span>
          <span className="item-text">{item}</span>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.photo-card {
  position: relative; background: #1e293b; border-radius: 12px; overflow: hidden;
  margin-bottom: 12px; user-select: none; border: 1px solid #334155;
}
.photo-area {
  height: 150px; display: flex; align-items: center; justify-content: center;
  font-size: 48px; cursor: pointer;
}
.heart-anim {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%) scale(0);
  font-size: 60px; pointer-events: none; animation: heartPop 0.6s ease forwards;
}
@keyframes heartPop {
  0% { transform: translate(-50%,-50%) scale(0); opacity: 1; }
  50% { transform: translate(-50%,-50%) scale(1.2); opacity: 1; }
  100% { transform: translate(-50%,-50%) scale(1); opacity: 0; }
}
.card-footer {
  padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;
}
.likes { font-size: 14px; color: #e2e8f0; }
.like-btn { background: none; border: none; font-size: 20px; cursor: pointer; }`,
      js: `const { useState, useRef } = React;

const photos = [
  { id: 1, bg: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', emoji: '\\u{1F3DE}' },
  { id: 2, bg: 'linear-gradient(135deg, #22c55e, #06b6d4)', emoji: '\\u{1F305}' },
];

function PhotoCard({ photo }) {
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50));
  const [liked, setLiked] = useState(false);
  const [anim, setAnim] = useState(false);
  const lastTap = useRef(0);

  const handleClick = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (!liked) { setLikes(l => l + 1); setLiked(true); }
      setAnim(true);
      setTimeout(() => setAnim(false), 600);
    }
    lastTap.current = now;
  };

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(l => liked ? l - 1 : l + 1);
  };

  return (
    <div className="photo-card">
      <div className="photo-area" style={{background: photo.bg}} onClick={handleClick}>
        {photo.emoji}
        {anim && <span className="heart-anim">\\u2764\\uFE0F</span>}
      </div>
      <div className="card-footer">
        <span className="likes">{likes} likes</span>
        <button className="like-btn" onClick={toggleLike}>{liked ? '\\u2764\\uFE0F' : '\\u{1F90D}'}</button>
      </div>
    </div>
  );
}

function App() {
  return <div>{photos.map(p => <PhotoCard key={p.id} photo={p} />)}</div>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.expand-card {
  background: #1e293b; border: 1px solid #334155; border-radius: 10px;
  margin-bottom: 8px; overflow: hidden; transition: all 0.3s;
}
.expand-header {
  padding: 14px 16px; cursor: pointer; display: flex; justify-content: space-between;
  align-items: center;
}
.expand-header:hover { background: rgba(255,255,255,0.02); }
.expand-title { color: #e2e8f0; font-size: 14px; font-weight: 500; }
.expand-icon { color: #64748b; transition: transform 0.3s; font-size: 12px; }
.expand-icon.open { transform: rotate(180deg); }
.expand-body {
  max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s;
}
.expand-body.open { max-height: 200px; }
.expand-body-inner { padding: 0 16px 14px; color: #94a3b8; font-size: 13px; line-height: 1.5; }`,
      js: `const { useState } = React;

const items = [
  { title: 'What is React?', body: 'React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces of code called components.' },
  { title: 'What are hooks?', body: 'Hooks let you use state and other React features without writing a class. useState and useEffect are the most commonly used hooks.' },
  { title: 'What is JSX?', body: 'JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file. It gets compiled to React.createElement calls.' },
];

function App() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="expand-card">
          <div className="expand-header" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
            <span className="expand-title">{item.title}</span>
            <span className={'expand-icon' + (openIdx === i ? ' open' : '')}>\\u25BC</span>
          </div>
          <div className={'expand-body' + (openIdx === i ? ' open' : '')}>
            <div className="expand-body-inner">{item.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.section { margin-bottom: 16px; }
.section-title { font-size: 14px; color: #e2e8f0; margin-bottom: 8px; }
.basic-fields, .advanced-fields { display: flex; flex-direction: column; gap: 8px; }
input, select {
  width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155;
  background: #1e293b; color: #e2e8f0; outline: none; font-size: 14px;
}
input:focus, select:focus { border-color: #3b82f6; }
label { font-size: 13px; color: #94a3b8; }
.toggle-link {
  background: none; border: none; color: #3b82f6; cursor: pointer;
  font-size: 13px; padding: 8px 0; text-align: left;
}
.toggle-link:hover { text-decoration: underline; }
.advanced { overflow: hidden; transition: max-height 0.3s ease; }
.advanced.hidden { max-height: 0; }
.advanced.visible { max-height: 300px; }`,
      js: `const { useState } = React;

function App() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div>
      <div className="section">
        <div className="section-title">Basic Settings</div>
        <div className="basic-fields">
          <div><label>Display Name</label><input placeholder="John Doe" /></div>
          <div><label>Email</label><input type="email" placeholder="john@example.com" /></div>
        </div>
      </div>
      <button className="toggle-link" onClick={() => setShowAdvanced(!showAdvanced)}>
        {showAdvanced ? '\\u25B2 Hide' : '\\u25BC Show'} advanced options
      </button>
      <div className={'advanced' + (showAdvanced ? ' visible' : ' hidden')}>
        <div className="section" style={{marginTop: 8}}>
          <div className="section-title">Advanced Settings</div>
          <div className="advanced-fields">
            <div><label>Timezone</label>
              <select><option>UTC</option><option>EST</option><option>PST</option></select>
            </div>
            <div><label>Language</label>
              <select><option>English</option><option>Spanish</option><option>French</option></select>
            </div>
            <div><label>API Key</label><input placeholder="sk-..." /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.steps { display: flex; margin-bottom: 24px; }
.step {
  flex: 1; text-align: center; position: relative; padding-bottom: 12px;
}
.step::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0;
  height: 3px; background: #334155; border-radius: 2px;
}
.step.active::after { background: #3b82f6; }
.step.done::after { background: #22c55e; }
.step-num { font-size: 12px; color: #64748b; }
.step.active .step-num { color: #3b82f6; }
.step.done .step-num { color: #22c55e; }
.step-label { font-size: 11px; color: #475569; margin-top: 2px; }
input {
  width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155;
  background: #1e293b; color: #e2e8f0; outline: none; margin-bottom: 10px;
}
input:focus { border-color: #3b82f6; }
label { display: block; font-size: 13px; color: #94a3b8; margin-bottom: 4px; }
.actions { display: flex; gap: 8px; margin-top: 16px; }
.btn { padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-size: 14px; }
.btn-primary { background: #3b82f6; color: white; }
.btn-secondary { background: #334155; color: #94a3b8; }
.success { text-align: center; padding: 24px; color: #22c55e; }`,
      js: `const { useState } = React;

const stepLabels = ['Account', 'Profile', 'Confirm'];

function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ email: '', password: '', name: '', bio: '' });
  const [done, setDone] = useState(false);

  const update = (k) => (e) => setData(d => ({...d, [k]: e.target.value}));

  const pages = [
    <div key="0"><label>Email</label><input value={data.email} onChange={update('email')} placeholder="you@example.com" />
      <label>Password</label><input type="password" value={data.password} onChange={update('password')} placeholder="Min 6 chars" /></div>,
    <div key="1"><label>Full Name</label><input value={data.name} onChange={update('name')} placeholder="John Doe" />
      <label>Bio</label><input value={data.bio} onChange={update('bio')} placeholder="Tell us about yourself" /></div>,
    <div key="2" style={{color:'#94a3b8',fontSize:14}}>
      <p><strong style={{color:'#e2e8f0'}}>Email:</strong> {data.email || '(empty)'}</p>
      <p><strong style={{color:'#e2e8f0'}}>Name:</strong> {data.name || '(empty)'}</p>
      <p><strong style={{color:'#e2e8f0'}}>Bio:</strong> {data.bio || '(empty)'}</p>
    </div>
  ];

  if (done) return <div className="success"><div style={{fontSize:32}}>\\u2713</div><div style={{fontSize:18,marginTop:8}}>Account Created!</div></div>;

  return (
    <div>
      <div className="steps">
        {stepLabels.map((l, i) => (
          <div key={i} className={'step' + (i === step ? ' active' : '') + (i < step ? ' done' : '')}>
            <div className="step-num">{i < step ? '\\u2713' : i + 1}</div>
            <div className="step-label">{l}</div>
          </div>
        ))}
      </div>
      {pages[step]}
      <div className="actions">
        {step > 0 && <button className="btn btn-secondary" onClick={() => setStep(step-1)}>Back</button>}
        <button className="btn btn-primary" style={{marginLeft:'auto'}}
          onClick={() => step < 2 ? setStep(step+1) : setDone(true)}>
          {step === 2 ? 'Create Account' : 'Next'}
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.toolbar { display: flex; gap: 6px; margin-bottom: 12px; }
.tool-btn {
  padding: 6px 14px; border-radius: 6px; border: none; background: #334155;
  color: #94a3b8; cursor: pointer; font-size: 13px;
}
.tool-btn:hover:not(:disabled) { background: #475569; color: #e2e8f0; }
.tool-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.canvas {
  display: flex; flex-wrap: wrap; gap: 4px; padding: 12px;
  background: #1e293b; border-radius: 10px; border: 1px solid #334155;
}
.cell {
  width: 28px; height: 28px; border-radius: 4px; cursor: pointer;
  border: 1px solid #334155; transition: all 0.1s;
}
.cell:hover { border-color: #475569; }
.palette { display: flex; gap: 6px; margin-bottom: 12px; }
.color-opt {
  width: 28px; height: 28px; border-radius: 50%; cursor: pointer;
  border: 2px solid transparent;
}
.color-opt.active { border-color: white; }
.status { font-size: 12px; color: #64748b; margin-top: 8px; }`,
      js: `const { useState, useEffect, useCallback } = React;

const SIZE = 8;
const COLORS = ['#3b82f6','#22c55e','#ef4444','#eab308','#a855f7','#334155'];

function App() {
  const [color, setColor] = useState(COLORS[0]);
  const [grid, setGrid] = useState(Array(SIZE*SIZE).fill('#1e293b'));
  const [history, setHistory] = useState([Array(SIZE*SIZE).fill('#1e293b')]);
  const [histIdx, setHistIdx] = useState(0);

  const paint = (i) => {
    const newGrid = [...grid];
    newGrid[i] = color;
    setGrid(newGrid);
    const newHist = history.slice(0, histIdx + 1);
    newHist.push(newGrid);
    setHistory(newHist);
    setHistIdx(newHist.length - 1);
  };

  const undo = useCallback(() => {
    if (histIdx > 0) { setHistIdx(histIdx - 1); setGrid(history[histIdx - 1]); }
  }, [histIdx, history]);

  const redo = useCallback(() => {
    if (histIdx < history.length - 1) { setHistIdx(histIdx + 1); setGrid(history[histIdx + 1]); }
  }, [histIdx, history]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [undo, redo]);

  return (
    <div>
      <div className="palette">
        {COLORS.map(c => <div key={c} className={'color-opt' + (c === color ? ' active' : '')}
          style={{background: c}} onClick={() => setColor(c)} />)}
      </div>
      <div className="toolbar">
        <button className="tool-btn" disabled={histIdx <= 0} onClick={undo}>\\u21A9 Undo</button>
        <button className="tool-btn" disabled={histIdx >= history.length-1} onClick={redo}>Redo \\u21AA</button>
      </div>
      <div className="canvas">
        {grid.map((c, i) => <div key={i} className="cell" style={{background: c}} onClick={() => paint(i)} />)}
      </div>
      <div className="status">Step {histIdx} of {history.length - 1} | Ctrl+Z / Ctrl+Shift+Z</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.editor-toolbar {
  display: flex; gap: 4px; padding: 8px; background: #1e293b;
  border: 1px solid #334155; border-radius: 8px 8px 0 0; flex-wrap: wrap;
}
.fmt-btn {
  padding: 6px 10px; border-radius: 4px; border: none; background: #334155;
  color: #94a3b8; cursor: pointer; font-size: 13px; min-width: 32px;
}
.fmt-btn:hover { background: #475569; color: #e2e8f0; }
.fmt-btn.active { background: #3b82f6; color: white; }
.editor-area {
  min-height: 150px; padding: 16px; background: #0f172a;
  border: 1px solid #334155; border-top: none; border-radius: 0 0 8px 8px;
  color: #e2e8f0; font-size: 14px; line-height: 1.6; outline: none;
}
.editor-area:focus { border-color: #3b82f6; }`,
      js: `const { useRef, useState } = React;

function App() {
  const editorRef = useRef(null);
  const [active, setActive] = useState({});

  const exec = (cmd, value) => {
    document.execCommand(cmd, false, value);
    editorRef.current.focus();
    updateActive();
  };

  const updateActive = () => {
    setActive({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
    });
  };

  const btns = [
    { cmd: 'bold', label: 'B', style: {fontWeight:700} },
    { cmd: 'italic', label: 'I', style: {fontStyle:'italic'} },
    { cmd: 'underline', label: 'U', style: {textDecoration:'underline'} },
    { cmd: 'insertUnorderedList', label: '\\u2022 List' },
    { cmd: 'insertOrderedList', label: '1. List' },
  ];

  return (
    <div>
      <div className="editor-toolbar">
        {btns.map(b => (
          <button key={b.cmd} className={'fmt-btn' + (active[b.cmd] ? ' active' : '')}
            style={b.style} onMouseDown={e => { e.preventDefault(); exec(b.cmd); }}>
            {b.label}
          </button>
        ))}
        <button className="fmt-btn" onMouseDown={e => { e.preventDefault(); exec('formatBlock', 'h2'); }}>H2</button>
        <button className="fmt-btn" onMouseDown={e => { e.preventDefault(); exec('formatBlock', 'blockquote'); }}>\\u201C</button>
      </div>
      <div ref={editorRef} className="editor-area" contentEditable
        onKeyUp={updateActive} onMouseUp={updateActive}
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{__html: '<p>Start writing your <strong>rich text</strong> content here...</p>'}} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.swipe-nav { overflow: hidden; border-radius: 12px; border: 1px solid #334155; }
.pages { display: flex; transition: transform 0.3s ease; }
.page {
  min-width: 100%; padding: 40px 20px; text-align: center;
  min-height: 200px; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
}
.page-icon { font-size: 48px; margin-bottom: 12px; }
.page-title { font-size: 18px; font-weight: 600; color: #e2e8f0; margin-bottom: 6px; }
.page-desc { font-size: 14px; color: #94a3b8; }
.nav-dots { display: flex; justify-content: center; gap: 8px; padding: 12px; }
.nav-dot {
  width: 8px; height: 8px; border-radius: 50%; background: #475569;
  border: none; cursor: pointer;
}
.nav-dot.active { background: #3b82f6; width: 20px; border-radius: 4px; }
.nav-arrows { display: flex; justify-content: space-between; padding: 0 12px 12px; }
.nav-arr { background: none; border: none; color: #64748b; cursor: pointer; font-size: 14px; }
.nav-arr:hover { color: #e2e8f0; }`,
      js: `const { useState } = React;

const pages = [
  { icon: '\\u{1F680}', title: 'Welcome', desc: 'Swipe or use arrows to navigate', bg: 'linear-gradient(180deg, rgba(59,130,246,0.1), transparent)' },
  { icon: '\\u{2B50}', title: 'Features', desc: 'Discover powerful tools at your fingertips', bg: 'linear-gradient(180deg, rgba(234,179,8,0.1), transparent)' },
  { icon: '\\u{1F3AF}', title: 'Get Started', desc: 'Begin your journey today', bg: 'linear-gradient(180deg, rgba(34,197,94,0.1), transparent)' },
];

function App() {
  const [idx, setIdx] = useState(0);
  const go = (i) => setIdx(Math.max(0, Math.min(pages.length - 1, i)));

  return (
    <div className="swipe-nav">
      <div className="pages" style={{transform: 'translateX(-' + (idx * 100) + '%)'}}>
        {pages.map((p, i) => (
          <div key={i} className="page" style={{background: p.bg}}>
            <div className="page-icon">{p.icon}</div>
            <div className="page-title">{p.title}</div>
            <div className="page-desc">{p.desc}</div>
          </div>
        ))}
      </div>
      <div className="nav-dots">
        {pages.map((_, i) => <button key={i} className={'nav-dot' + (i === idx ? ' active' : '')} onClick={() => setIdx(i)} />)}
      </div>
      <div className="nav-arrows">
        <button className="nav-arr" onClick={() => go(idx-1)} disabled={idx===0}>\\u25C0 Previous</button>
        <button className="nav-arr" onClick={() => go(idx+1)} disabled={idx===pages.length-1}>Next \\u25B6</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.chart { text-align: center; }
.bar-chart { display: flex; align-items: flex-end; gap: 8px; height: 180px; padding: 12px; background: #1e293b; border-radius: 10px; }
.bar-group { flex: 1; display: flex; flex-direction: column; align-items: center; }
.bar {
  width: 100%; border-radius: 4px 4px 0 0; transition: height 0.5s ease;
  min-width: 20px; position: relative; cursor: pointer;
}
.bar:hover { opacity: 0.8; }
.bar-label { font-size: 11px; color: #64748b; margin-top: 6px; }
.bar-val { font-size: 11px; color: #e2e8f0; margin-bottom: 4px; }
.legend { display: flex; justify-content: center; gap: 16px; margin-top: 12px; }
.legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #94a3b8; }
.legend-dot { width: 10px; height: 10px; border-radius: 3px; }`,
      js: `const { useState } = React;

const data = [
  { label: 'Mon', a: 40, b: 24 },
  { label: 'Tue', a: 65, b: 45 },
  { label: 'Wed', a: 50, b: 35 },
  { label: 'Thu', a: 80, b: 55 },
  { label: 'Fri', a: 55, b: 40 },
];
const max = Math.max(...data.flatMap(d => [d.a, d.b]));

function App() {
  const [hover, setHover] = useState(null);

  return (
    <div className="chart">
      <div style={{fontSize:14,color:'#e2e8f0',marginBottom:12,fontWeight:600}}>Weekly Metrics</div>
      <div className="bar-chart">
        {data.map((d, i) => (
          <div key={i} className="bar-group" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            {hover === i && <div className="bar-val">{d.a} / {d.b}</div>}
            <div style={{display:'flex',gap:3,alignItems:'flex-end',width:'100%',height:'100%'}}>
              <div className="bar" style={{height:(d.a/max*100)+'%',background:'#3b82f6'}} />
              <div className="bar" style={{height:(d.b/max*100)+'%',background:'#22c55e'}} />
            </div>
            <div className="bar-label">{d.label}</div>
          </div>
        ))}
      </div>
      <div className="legend">
        <div className="legend-item"><div className="legend-dot" style={{background:'#3b82f6'}} />Views</div>
        <div className="legend-item"><div className="legend-dot" style={{background:'#22c55e'}} />Clicks</div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.article {
  padding: 16px; background: #1e293b; border-radius: 10px; margin-bottom: 8px;
  border: 1px solid #334155; cursor: pointer; transition: border-color 0.15s;
}
.article:hover { border-color: #475569; }
.article-meta { display: flex; gap: 8px; align-items: center; margin-bottom: 6px; }
.article-cat { font-size: 11px; padding: 2px 8px; border-radius: 10px; background: #3b82f633; color: #3b82f6; }
.article-date { font-size: 12px; color: #64748b; }
.article-title { font-size: 16px; font-weight: 600; color: #e2e8f0; margin-bottom: 4px; }
.article-desc { font-size: 13px; color: #94a3b8; line-height: 1.4; }
.article-footer { display: flex; gap: 12px; margin-top: 8px; font-size: 12px; color: #64748b; }`,
      js: `const { useState } = React;

const articles = [
  { id: 1, title: 'Getting Started with React Hooks', desc: 'Learn the fundamentals of useState, useEffect, and custom hooks for modern React development.', cat: 'Tutorial', date: 'Jan 15', reads: '2.4k', mins: 5 },
  { id: 2, title: 'Building Accessible Components', desc: 'A practical guide to ARIA attributes, keyboard navigation, and screen reader support.', cat: 'Guide', date: 'Jan 12', reads: '1.8k', mins: 8 },
  { id: 3, title: 'State Management Patterns', desc: 'Compare Context API, Redux, Zustand, and other state management solutions for React apps.', cat: 'Deep Dive', date: 'Jan 10', reads: '3.1k', mins: 12 },
];

function App() {
  return (
    <div>
      {articles.map(a => (
        <div key={a.id} className="article">
          <div className="article-meta">
            <span className="article-cat">{a.cat}</span>
            <span className="article-date">{a.date}</span>
          </div>
          <div className="article-title">{a.title}</div>
          <div className="article-desc">{a.desc}</div>
          <div className="article-footer">
            <span>\\u{1F4D6} {a.mins} min read</span>
            <span>\\u{1F441} {a.reads} reads</span>
          </div>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.gallery-item {
  aspect-ratio: 1; border-radius: 8px; cursor: pointer; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  font-size: 32px; transition: transform 0.2s; position: relative;
}
.gallery-item:hover { transform: scale(1.03); }
.gallery-item:hover .overlay { opacity: 1; }
.overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.4); opacity: 0;
  display: flex; align-items: center; justify-content: center;
  transition: opacity 0.2s; font-size: 14px; color: white;
}
.lightbox {
  position: fixed; inset: 0; background: rgba(0,0,0,0.8);
  display: flex; align-items: center; justify-content: center; z-index: 50;
}
.lightbox-content {
  background: #1e293b; border-radius: 12px; padding: 24px;
  text-align: center; font-size: 64px; min-width: 200px;
}
.lightbox-close {
  position: absolute; top: 16px; right: 16px; background: none;
  border: none; color: white; font-size: 24px; cursor: pointer;
}`,
      js: `const { useState } = React;

const items = [
  { emoji: '\\u{1F3DE}', label: 'Landscape', bg: '#1e3a5f' },
  { emoji: '\\u{1F305}', label: 'Sunset', bg: '#5f1e1e' },
  { emoji: '\\u{1F30A}', label: 'Ocean', bg: '#1e3a5f' },
  { emoji: '\\u{1F3D4}', label: 'Mountain', bg: '#2d3a1e' },
  { emoji: '\\u{1F33B}', label: 'Flower', bg: '#3a2d1e' },
  { emoji: '\\u{1F308}', label: 'Rainbow', bg: '#2d1e3a' },
];

function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <div className="gallery-grid">
        {items.map((item, i) => (
          <div key={i} className="gallery-item" style={{background: item.bg}} onClick={() => setSelected(item)}>
            {item.emoji}
            <div className="overlay">{item.label}</div>
          </div>
        ))}
      </div>
      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)}>
          <button className="lightbox-close">\\u00D7</button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <div>{selected.emoji}</div>
            <div style={{fontSize:16,color:'#e2e8f0',marginTop:12}}>{selected.label}</div>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.thumb-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.thumb {
  aspect-ratio: 1; border-radius: 8px; display: flex; flex-direction: column;
  align-items: center; justify-content: center; cursor: pointer;
  border: 2px solid transparent; transition: all 0.15s;
}
.thumb:hover { border-color: #475569; transform: translateY(-2px); }
.thumb.selected { border-color: #3b82f6; }
.thumb-icon { font-size: 28px; margin-bottom: 4px; }
.thumb-label { font-size: 11px; color: #94a3b8; }
.detail { margin-top: 12px; padding: 14px; background: #1e293b; border-radius: 8px; border: 1px solid #334155; text-align: center; }
.detail-icon { font-size: 48px; }
.detail-name { font-size: 16px; color: #e2e8f0; margin-top: 8px; font-weight: 600; }`,
      js: `const { useState } = React;

const thumbs = [
  { icon: '\\u{1F4C1}', label: 'Documents', bg: '#1e3a5f' },
  { icon: '\\u{1F3B5}', label: 'Music', bg: '#3a1e3a' },
  { icon: '\\u{1F3AC}', label: 'Videos', bg: '#3a2d1e' },
  { icon: '\\u{1F5BC}', label: 'Photos', bg: '#1e3a2d' },
  { icon: '\\u{1F4E6}', label: 'Packages', bg: '#3a3a1e' },
  { icon: '\\u{2699}', label: 'Settings', bg: '#2d2d3a' },
  { icon: '\\u{1F512}', label: 'Secure', bg: '#3a1e1e' },
  { icon: '\\u{2B50}', label: 'Favorites', bg: '#3a351e' },
];

function App() {
  const [sel, setSel] = useState(null);
  return (
    <div>
      <div className="thumb-grid">
        {thumbs.map((t, i) => (
          <div key={i} className={'thumb' + (sel === i ? ' selected' : '')}
            style={{background: t.bg}} onClick={() => setSel(i)}>
            <div className="thumb-icon">{t.icon}</div>
            <div className="thumb-label">{t.label}</div>
          </div>
        ))}
      </div>
      {sel !== null && (
        <div className="detail">
          <div className="detail-icon">{thumbs[sel].icon}</div>
          <div className="detail-name">{thumbs[sel].label}</div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.card {
  background: #1e293b; border-radius: 10px; overflow: hidden;
  border: 1px solid #334155; transition: all 0.2s;
}
.card:hover { border-color: #475569; transform: translateY(-2px); }
.card-img {
  height: 80px; display: flex; align-items: center; justify-content: center;
  font-size: 32px;
}
.card-body { padding: 12px; }
.card-title { font-size: 14px; font-weight: 600; color: #e2e8f0; margin-bottom: 4px; }
.card-desc { font-size: 12px; color: #94a3b8; line-height: 1.4; }
.card-footer {
  padding: 8px 12px; border-top: 1px solid #334155;
  display: flex; justify-content: space-between; align-items: center;
}
.card-tag { font-size: 11px; padding: 2px 8px; border-radius: 10px; }
.card-btn { background: none; border: none; color: #3b82f6; font-size: 12px; cursor: pointer; }`,
      js: `function App() {
  const cards = [
    { icon: '\\u{1F680}', title: 'Performance', desc: 'Optimize your app with code splitting and lazy loading.', tag: 'Core', color: '#3b82f6', bg: 'linear-gradient(135deg,#1e3a5f,#1e293b)' },
    { icon: '\\u{1F3A8}', title: 'Theming', desc: 'Dark mode, custom palettes, and CSS variables.', tag: 'UI', color: '#a855f7', bg: 'linear-gradient(135deg,#2d1e3a,#1e293b)' },
    { icon: '\\u{1F512}', title: 'Security', desc: 'Authentication, authorization, and input sanitization.', tag: 'Auth', color: '#ef4444', bg: 'linear-gradient(135deg,#3a1e1e,#1e293b)' },
    { icon: '\\u{1F4CA}', title: 'Analytics', desc: 'Track events, user flows, and conversion metrics.', tag: 'Data', color: '#22c55e', bg: 'linear-gradient(135deg,#1e3a2d,#1e293b)' },
  ];

  return (
    <div className="cards">
      {cards.map((c, i) => (
        <div key={i} className="card">
          <div className="card-img" style={{background: c.bg}}>{c.icon}</div>
          <div className="card-body">
            <div className="card-title">{c.title}</div>
            <div className="card-desc">{c.desc}</div>
          </div>
          <div className="card-footer">
            <span className="card-tag" style={{background: c.color+'22',color: c.color}}>{c.tag}</span>
            <button className="card-btn">Learn more \\u2192</button>
          </div>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.filters { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
.filter-btn {
  padding: 6px 14px; border-radius: 20px; border: 1px solid #334155;
  background: none; color: #94a3b8; cursor: pointer; font-size: 12px;
}
.filter-btn:hover { border-color: #475569; }
.filter-btn.active { background: #3b82f6; border-color: #3b82f6; color: white; }
.item {
  display: flex; align-items: center; gap: 10px; padding: 10px 12px;
  background: #1e293b; border-radius: 8px; margin-bottom: 4px; border: 1px solid #334155;
}
.item-icon { font-size: 20px; }
.item-name { flex: 1; color: #e2e8f0; font-size: 14px; }
.item-cat { font-size: 11px; padding: 2px 8px; border-radius: 10px; }
.count { font-size: 12px; color: #64748b; margin-top: 8px; }`,
      js: `const { useState, useMemo } = React;

const items = [
  { name: 'React Guide', cat: 'Tutorial', icon: '\\u{1F4D8}' },
  { name: 'Auth System', cat: 'Project', icon: '\\u{1F512}' },
  { name: 'CSS Grid Intro', cat: 'Tutorial', icon: '\\u{1F4D8}' },
  { name: 'E-commerce App', cat: 'Project', icon: '\\u{1F6D2}' },
  { name: 'Testing Basics', cat: 'Tutorial', icon: '\\u{1F4D8}' },
  { name: 'Chat App', cat: 'Project', icon: '\\u{1F4AC}' },
  { name: 'TypeScript Tips', cat: 'Article', icon: '\\u{1F4DD}' },
  { name: 'Performance Guide', cat: 'Article', icon: '\\u{1F4DD}' },
];

const catColors = { Tutorial: '#3b82f6', Project: '#22c55e', Article: '#eab308' };

function App() {
  const [filter, setFilter] = useState('All');
  const cats = ['All', ...new Set(items.map(i => i.cat))];
  const filtered = useMemo(() => filter === 'All' ? items : items.filter(i => i.cat === filter), [filter]);

  return (
    <div>
      <div className="filters">
        {cats.map(c => (
          <button key={c} className={'filter-btn' + (filter === c ? ' active' : '')}
            onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>
      {filtered.map((item, i) => (
        <div key={i} className="item">
          <span className="item-icon">{item.icon}</span>
          <span className="item-name">{item.name}</span>
          <span className="item-cat" style={{background: catColors[item.cat]+'22', color: catColors[item.cat]}}>{item.cat}</span>
        </div>
      ))}
      <div className="count">Showing {filtered.length} of {items.length} items</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.search-box {
  position: relative; margin-bottom: 12px;
}
.search-box input {
  width: 100%; padding: 10px 12px 10px 36px; border-radius: 8px;
  border: 1px solid #334155; background: #1e293b; color: #e2e8f0; outline: none;
}
.search-box input:focus { border-color: #3b82f6; }
.search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #64748b; }
.result {
  padding: 10px 12px; background: #1e293b; border-radius: 8px; margin-bottom: 4px;
  border: 1px solid #334155; cursor: pointer;
}
.result:hover { border-color: #475569; }
.result-title { color: #e2e8f0; font-size: 14px; }
.result-title mark { background: none; color: #3b82f6; font-weight: 600; }
.result-desc { color: #64748b; font-size: 12px; margin-top: 2px; }
.no-results { text-align: center; color: #64748b; padding: 20px; }`,
      js: `const { useState, useMemo } = React;

const data = [
  { title: 'React Hooks Guide', desc: 'Learn useState, useEffect, and custom hooks' },
  { title: 'CSS Grid Layout', desc: 'Master two-dimensional layouts with CSS Grid' },
  { title: 'TypeScript Basics', desc: 'Type safety for JavaScript applications' },
  { title: 'Node.js API Design', desc: 'RESTful API patterns with Express' },
  { title: 'Testing with Jest', desc: 'Unit and integration testing strategies' },
];

function App() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter(d => d.title.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q));
  }, [query]);

  const highlight = (text) => {
    if (!query) return text;
    const i = text.toLowerCase().indexOf(query.toLowerCase());
    if (i === -1) return text;
    return <>{text.slice(0,i)}<mark>{text.slice(i,i+query.length)}</mark>{text.slice(i+query.length)}</>;
  };

  return (
    <div>
      <div className="search-box">
        <span className="search-icon">\\u{1F50D}</span>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search resources..." />
      </div>
      {results.length === 0 ? (
        <div className="no-results">No results for "{query}"</div>
      ) : results.map((r, i) => (
        <div key={i} className="result">
          <div className="result-title">{highlight(r.title)}</div>
          <div className="result-desc">{r.desc}</div>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.filter-panel { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; align-items: center; }
.filter-panel input {
  flex: 1; min-width: 120px; padding: 8px 10px; border-radius: 6px;
  border: 1px solid #334155; background: #1e293b; color: #e2e8f0; outline: none; font-size: 13px;
}
.filter-panel select {
  padding: 8px 10px; border-radius: 6px; border: 1px solid #334155;
  background: #1e293b; color: #e2e8f0; outline: none; font-size: 13px;
}
.clear-btn {
  padding: 8px 12px; border-radius: 6px; border: none; background: #334155;
  color: #94a3b8; cursor: pointer; font-size: 12px;
}
.item-row {
  display: flex; justify-content: space-between; padding: 10px 12px;
  background: #1e293b; border-radius: 6px; margin-bottom: 4px; border: 1px solid #334155;
}
.item-name { color: #e2e8f0; font-size: 14px; }
.item-detail { color: #64748b; font-size: 12px; }
.active-filters { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 8px; }
.filter-chip {
  padding: 4px 10px; border-radius: 12px; font-size: 11px;
  background: #3b82f622; color: #3b82f6; display: flex; align-items: center; gap: 4px;
}
.filter-chip button { background: none; border: none; color: #3b82f6; cursor: pointer; }`,
      js: `const { useState, useMemo } = React;

const products = [
  { name: 'Laptop Pro', cat: 'Electronics', price: 1299, rating: 4.8 },
  { name: 'Wireless Mouse', cat: 'Electronics', price: 29, rating: 4.2 },
  { name: 'Standing Desk', cat: 'Furniture', price: 499, rating: 4.5 },
  { name: 'Monitor 27"', cat: 'Electronics', price: 399, rating: 4.6 },
  { name: 'Office Chair', cat: 'Furniture', price: 299, rating: 4.3 },
];

function App() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const filtered = useMemo(() => {
    let r = products;
    if (search) r = r.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (cat) r = r.filter(p => p.cat === cat);
    if (maxPrice) r = r.filter(p => p.price <= +maxPrice);
    return r;
  }, [search, cat, maxPrice]);

  const clear = () => { setSearch(''); setCat(''); setMaxPrice(''); };
  const hasFilters = search || cat || maxPrice;

  return (
    <div>
      <div className="filter-panel">
        <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        <select value={cat} onChange={e => setCat(e.target.value)}>
          <option value="">All Categories</option>
          <option>Electronics</option><option>Furniture</option>
        </select>
        <select value={maxPrice} onChange={e => setMaxPrice(e.target.value)}>
          <option value="">Any Price</option>
          <option value="100">Under $100</option><option value="500">Under $500</option><option value="1000">Under $1000</option>
        </select>
        {hasFilters && <button className="clear-btn" onClick={clear}>Clear All</button>}
      </div>
      {filtered.map((p, i) => (
        <div key={i} className="item-row">
          <span className="item-name">{p.name}</span>
          <span className="item-detail">{p.cat} \\u00B7 \${p.price} \\u00B7 \\u2605 {p.rating}</span>
        </div>
      ))}
      <div style={{fontSize:12,color:'#64748b',marginTop:8}}>{filtered.length} results</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.filter-row { display: flex; gap: 6px; margin-bottom: 12px; }
.filter-row input, .filter-row select {
  padding: 8px 10px; border-radius: 6px; border: 1px solid #334155;
  background: #1e293b; color: #e2e8f0; outline: none; font-size: 13px;
}
table { width: 100%; border-collapse: collapse; }
th { text-align: left; padding: 8px; font-size: 12px; color: #64748b; border-bottom: 1px solid #334155; }
td { padding: 8px; font-size: 13px; color: #e2e8f0; border-bottom: 1px solid #1e293b; }
tr:hover td { background: #1e293b; }
.badge { padding: 2px 8px; border-radius: 10px; font-size: 11px; }`,
      js: `const { useState, useMemo } = React;

const rows = [
  { name: 'Alice', dept: 'Engineering', status: 'Active' },
  { name: 'Bob', dept: 'Design', status: 'Active' },
  { name: 'Carol', dept: 'Engineering', status: 'Away' },
  { name: 'Dan', dept: 'Marketing', status: 'Active' },
  { name: 'Eve', dept: 'Design', status: 'Away' },
];

const statusColor = { Active: '#22c55e', Away: '#eab308' };

function App() {
  const [nameFilter, setNameFilter] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = useMemo(() => {
    let r = rows;
    if (nameFilter) r = r.filter(x => x.name.toLowerCase().includes(nameFilter.toLowerCase()));
    if (deptFilter) r = r.filter(x => x.dept === deptFilter);
    if (statusFilter) r = r.filter(x => x.status === statusFilter);
    return r;
  }, [nameFilter, deptFilter, statusFilter]);

  return (
    <div>
      <div className="filter-row">
        <input placeholder="Filter by name..." value={nameFilter} onChange={e => setNameFilter(e.target.value)} style={{flex:1}} />
        <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
          <option value="">All Depts</option>
          <option>Engineering</option><option>Design</option><option>Marketing</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option>Active</option><option>Away</option>
        </select>
      </div>
      <table>
        <thead><tr><th>Name</th><th>Department</th><th>Status</th></tr></thead>
        <tbody>
          {filtered.map((r, i) => (
            <tr key={i}>
              <td>{r.name}</td><td>{r.dept}</td>
              <td><span className="badge" style={{background: statusColor[r.status]+'22', color: statusColor[r.status]}}>{r.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `table { width: 100%; border-collapse: collapse; }
th {
  text-align: left; padding: 10px 8px; font-size: 12px; color: #64748b;
  border-bottom: 2px solid #334155; cursor: pointer; user-select: none;
}
th:hover { color: #94a3b8; }
th.sorted { color: #3b82f6; border-bottom-color: #3b82f6; }
td { padding: 10px 8px; font-size: 13px; color: #e2e8f0; border-bottom: 1px solid #1e293b; }
tr:hover td { background: #1e293b; }
.sort-arrow { margin-left: 4px; font-size: 10px; }`,
      js: `const { useState, useMemo } = React;

const data = [
  { name: 'React', stars: 220, issues: 890, license: 'MIT' },
  { name: 'Vue', stars: 210, issues: 450, license: 'MIT' },
  { name: 'Angular', stars: 95, issues: 1200, license: 'MIT' },
  { name: 'Svelte', stars: 78, issues: 320, license: 'MIT' },
  { name: 'Solid', stars: 32, issues: 98, license: 'MIT' },
];

function App() {
  const [sortKey, setSortKey] = useState('name');
  const [asc, setAsc] = useState(true);

  const sorted = useMemo(() => [...data].sort((a, b) => {
    const va = a[sortKey], vb = b[sortKey];
    const cmp = typeof va === 'string' ? va.localeCompare(vb) : va - vb;
    return asc ? cmp : -cmp;
  }), [sortKey, asc]);

  const toggle = (key) => {
    if (sortKey === key) setAsc(!asc);
    else { setSortKey(key); setAsc(true); }
  };

  const cols = [
    { key: 'name', label: 'Framework' },
    { key: 'stars', label: 'Stars (k)' },
    { key: 'issues', label: 'Issues' },
    { key: 'license', label: 'License' },
  ];

  return (
    <table>
      <thead><tr>
        {cols.map(c => (
          <th key={c.key} className={sortKey === c.key ? 'sorted' : ''} onClick={() => toggle(c.key)}>
            {c.label}
            {sortKey === c.key && <span className="sort-arrow">{asc ? '\\u25B2' : '\\u25BC'}</span>}
          </th>
        ))}
      </tr></thead>
      <tbody>
        {sorted.map(r => (
          <tr key={r.name}>
            <td style={{fontWeight:500}}>{r.name}</td>
            <td>{r.stars}k</td><td>{r.issues}</td><td>{r.license}</td>
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
    id: 'react-tag-cloud',
    title: 'Tag Cloud',
    category: 'data-display',
    difficulty: 'intermediate',
    description: 'Weighted tag visualization',
    concepts: ['data visualization', 'dynamic sizing', 'interactivity', 'responsive design'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/tag-cloud',
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.cloud { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; padding: 12px; }
.tag {
  padding: 6px 14px; border-radius: 20px; cursor: pointer;
  transition: all 0.15s; border: 1px solid transparent;
}
.tag:hover { border-color: #475569; transform: scale(1.05); }
.tag.selected { border-color: #3b82f6; }
.detail {
  margin-top: 16px; padding: 12px; background: #1e293b; border-radius: 8px;
  border: 1px solid #334155; text-align: center;
}
.detail-tag { font-size: 18px; font-weight: 600; margin-bottom: 4px; }
.detail-count { font-size: 13px; color: #64748b; }`,
      js: `const { useState } = React;

const tags = [
  { name: 'JavaScript', count: 95 },{ name: 'React', count: 88 },
  { name: 'TypeScript', count: 72 },{ name: 'CSS', count: 65 },
  { name: 'Node.js', count: 60 },{ name: 'Python', count: 55 },
  { name: 'HTML', count: 50 },{ name: 'Git', count: 45 },
  { name: 'Docker', count: 38 },{ name: 'GraphQL', count: 30 },
  { name: 'REST', count: 42 },{ name: 'SQL', count: 35 },
];

const colors = ['#3b82f6','#22c55e','#a855f7','#ef4444','#eab308','#ec4899'];

function App() {
  const [selected, setSelected] = useState(null);
  const maxCount = Math.max(...tags.map(t => t.count));

  return (
    <div>
      <div className="cloud">
        {tags.map((t, i) => {
          const ratio = t.count / maxCount;
          const size = 12 + ratio * 14;
          const color = colors[i % colors.length];
          return (
            <div key={t.name} className={'tag' + (selected === t.name ? ' selected' : '')}
              style={{fontSize: size, background: color + '15', color}}
              onClick={() => setSelected(selected === t.name ? null : t.name)}>
              {t.name}
            </div>
          );
        })}
      </div>
      {selected && (
        <div className="detail">
          <div className="detail-tag" style={{color: colors[tags.findIndex(t => t.name === selected) % colors.length]}}>{selected}</div>
          <div className="detail-count">{tags.find(t => t.name === selected).count} mentions</div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.scroll-list { max-height: 300px; overflow-y: auto; border: 1px solid #334155; border-radius: 10px; }
.scroll-item {
  padding: 12px 14px; border-bottom: 1px solid #1e293b;
  display: flex; align-items: center; gap: 10px;
}
.avatar { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; }
.item-info { flex: 1; }
.item-info .name { color: #e2e8f0; font-size: 14px; }
.item-info .sub { color: #64748b; font-size: 12px; }
.loader { text-align: center; padding: 16px; color: #64748b; font-size: 13px; }
.spinner { animation: spin 1s linear infinite; display: inline-block; }
@keyframes spin { to { transform: rotate(360deg); } }`,
      js: `const { useState, useRef, useCallback } = React;

const colors = ['#3b82f6','#22c55e','#a855f7','#ef4444','#eab308'];
const names = ['Alice','Bob','Carol','Dan','Eve','Frank','Grace','Hank','Ivy','Jack'];

function genItems(start, count) {
  return Array.from({length: count}, (_, i) => ({
    id: start + i, name: names[(start+i) % names.length] + ' #' + (start+i+1),
    color: colors[(start+i) % colors.length]
  }));
}

function App() {
  const [items, setItems] = useState(genItems(0, 10));
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  const loadMore = useCallback(() => {
    if (loading || items.length >= 50) return;
    setLoading(true);
    setTimeout(() => {
      setItems(prev => [...prev, ...genItems(prev.length, 10)]);
      setLoading(false);
    }, 800);
  }, [loading, items.length]);

  const onScroll = () => {
    const el = listRef.current;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) loadMore();
  };

  return (
    <div>
      <div className="scroll-list" ref={listRef} onScroll={onScroll}>
        {items.map(item => (
          <div key={item.id} className="scroll-item">
            <div className="avatar" style={{background: item.color + '33', color: item.color}}>{item.name[0]}</div>
            <div className="item-info">
              <div className="name">{item.name}</div>
              <div className="sub">Loaded item</div>
            </div>
          </div>
        ))}
        {loading && <div className="loader"><span className="spinner">\\u21BB</span> Loading more...</div>}
      </div>
      <div style={{fontSize:12,color:'#64748b',marginTop:8}}>{items.length} items loaded</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.dash-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.widget {
  background: #1e293b; border-radius: 10px; padding: 14px;
  border: 1px solid #334155;
}
.widget-title { font-size: 12px; color: #64748b; margin-bottom: 8px; text-transform: uppercase; }
.widget-val { font-size: 24px; font-weight: 700; }
.widget-change { font-size: 12px; margin-top: 4px; }
.wide { grid-column: span 2; }
.mini-chart { display: flex; align-items: flex-end; gap: 3px; height: 40px; margin-top: 8px; }
.mini-bar { flex: 1; border-radius: 2px; transition: height 0.3s; }
.activity-item { display: flex; gap: 8px; padding: 6px 0; border-bottom: 1px solid #1e293b; font-size: 13px; }
.activity-item:last-child { border: none; }
.dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 4px; flex-shrink: 0; }`,
      js: `const { useState } = React;

function App() {
  const stats = [
    { label: 'Revenue', value: '$12,450', change: '+12.5%', up: true, color: '#22c55e' },
    { label: 'Users', value: '1,234', change: '+8.2%', up: true, color: '#3b82f6' },
    { label: 'Orders', value: '356', change: '-2.1%', up: false, color: '#ef4444' },
    { label: 'Conversion', value: '3.24%', change: '+0.5%', up: true, color: '#a855f7' },
  ];
  const chartData = [30,45,35,60,50,70,55,80,65,75,85,60];
  const activity = [
    { text: 'New order #1234', time: '2m ago', color: '#22c55e' },
    { text: 'User signup', time: '5m ago', color: '#3b82f6' },
    { text: 'Payment received', time: '12m ago', color: '#a855f7' },
  ];

  return (
    <div className="dash-grid">
      {stats.map((s, i) => (
        <div key={i} className="widget">
          <div className="widget-title">{s.label}</div>
          <div className="widget-val" style={{color: s.color}}>{s.value}</div>
          <div className="widget-change" style={{color: s.up ? '#22c55e' : '#ef4444'}}>
            {s.up ? '\\u25B2' : '\\u25BC'} {s.change}
          </div>
        </div>
      ))}
      <div className="widget wide">
        <div className="widget-title">Traffic Overview</div>
        <div className="mini-chart">
          {chartData.map((v, i) => (
            <div key={i} className="mini-bar" style={{height: v+'%', background: '#3b82f6'}} />
          ))}
        </div>
      </div>
      <div className="widget wide">
        <div className="widget-title">Recent Activity</div>
        {activity.map((a, i) => (
          <div key={i} className="activity-item">
            <div className="dot" style={{background: a.color}} />
            <div style={{flex:1,color:'#e2e8f0'}}>{a.text}</div>
            <div style={{color:'#64748b',fontSize:11}}>{a.time}</div>
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
    id: 'react-alternating-rows',
    title: 'Alternating Rows',
    category: 'data-display',
    difficulty: 'beginner',
    description: 'Striped table row styling',
    concepts: ['styling', 'list rendering', 'accessibility', 'user experience'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/alternating-rows',
    demoCode: {
      html: `<div id="root"></div>`,
      css: `table { width: 100%; border-collapse: collapse; }
th { text-align: left; padding: 10px 12px; font-size: 12px; color: #64748b; border-bottom: 2px solid #334155; }
td { padding: 10px 12px; font-size: 13px; color: #e2e8f0; }
tr.even { background: #1e293b; }
tr.odd { background: #0f172a; }
tr:hover td { background: rgba(59,130,246,0.05); }`,
      js: `function App() {
  const data = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Engineer' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Designer' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Manager' },
    { id: 4, name: 'Dan Brown', email: 'dan@example.com', role: 'Engineer' },
    { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Designer' },
  ];

  return (
    <table>
      <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Role</th></tr></thead>
      <tbody>
        {data.map((r, i) => (
          <tr key={r.id} className={i % 2 === 0 ? 'even' : 'odd'}>
            <td style={{color:'#64748b'}}>{r.id}</td><td>{r.name}</td><td style={{color:'#94a3b8'}}>{r.email}</td><td>{r.role}</td>
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
    id: 'react-formatting-data',
    title: 'Formatting Data',
    category: 'data-display',
    difficulty: 'intermediate',
    description: 'Data presentation patterns',
    concepts: ['data formatting', 'internationalization', 'accessibility', 'user experience'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/formatting-data',
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.format-row {
  display: flex; justify-content: space-between; padding: 10px 12px;
  background: #1e293b; border-radius: 8px; margin-bottom: 6px; border: 1px solid #334155;
}
.format-label { font-size: 13px; color: #94a3b8; }
.format-value { font-size: 13px; color: #e2e8f0; font-family: monospace; }
.section-title { font-size: 14px; font-weight: 600; color: #e2e8f0; margin: 14px 0 8px; }`,
      js: `function App() {
  const num = 1234567.89;
  const date = new Date();
  const bytes = 1536000;

  const fmtBytes = (b) => {
    if (b < 1024) return b + ' B';
    if (b < 1048576) return (b/1024).toFixed(1) + ' KB';
    return (b/1048576).toFixed(1) + ' MB';
  };

  const fmtRelative = (d) => {
    const diff = Date.now() - d.getTime();
    const mins = Math.floor(diff/60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return mins + 'm ago';
    return Math.floor(mins/60) + 'h ago';
  };

  const Row = ({label, value}) => (
    <div className="format-row">
      <span className="format-label">{label}</span>
      <span className="format-value">{value}</span>
    </div>
  );

  return (
    <div>
      <div className="section-title">Numbers</div>
      <Row label="Default" value={num.toLocaleString()} />
      <Row label="Currency (USD)" value={num.toLocaleString('en-US',{style:'currency',currency:'USD'})} />
      <Row label="Currency (EUR)" value={num.toLocaleString('de-DE',{style:'currency',currency:'EUR'})} />
      <Row label="Compact" value={Intl.NumberFormat('en',{notation:'compact'}).format(num)} />
      <Row label="Percent" value={(0.1234).toLocaleString('en',{style:'percent',minimumFractionDigits:1})} />

      <div className="section-title">Dates</div>
      <Row label="Full" value={date.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})} />
      <Row label="Short" value={date.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})} />
      <Row label="ISO" value={date.toISOString().split('T')[0]} />
      <Row label="Relative" value={fmtRelative(new Date(Date.now()-300000))} />

      <div className="section-title">Other</div>
      <Row label="File size" value={fmtBytes(bytes)} />
      <Row label="Phone" value="+1 (555) 123-4567" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.navbar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 16px; background: #1e293b; border-radius: 10px; border: 1px solid #334155;
}
.nav-brand { font-weight: 700; font-size: 16px; color: #e2e8f0; }
.nav-links { display: flex; gap: 4px; }
.nav-link {
  padding: 6px 14px; border-radius: 6px; border: none; background: none;
  color: #94a3b8; cursor: pointer; font-size: 13px;
}
.nav-link:hover { color: #e2e8f0; background: #334155; }
.nav-link.active { color: #3b82f6; background: rgba(59,130,246,0.1); }
.hamburger {
  display: none; background: none; border: none; color: #e2e8f0;
  font-size: 20px; cursor: pointer;
}
.page { padding: 20px; text-align: center; color: #94a3b8; margin-top: 12px; }`,
      js: `const { useState } = React;

const links = ['Home','Features','Pricing','About'];

function App() {
  const [active, setActive] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand">\\u{1F680} AppName</div>
        <div className="nav-links">
          {links.map(l => (
            <button key={l} className={'nav-link' + (active === l ? ' active' : '')}
              onClick={() => setActive(l)}>{l}</button>
          ))}
        </div>
      </nav>
      <div className="page">
        <div style={{fontSize:24,marginBottom:8}}>{active}</div>
        <div>Content for the {active} page</div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.layout { display: flex; gap: 0; min-height: 250px; }
.sidebar {
  background: #1e293b; border-radius: 10px 0 0 10px; border: 1px solid #334155;
  padding: 12px 0; transition: width 0.3s; overflow: hidden; flex-shrink: 0;
}
.sidebar.open { width: 180px; }
.sidebar.closed { width: 50px; }
.toggle-btn {
  width: 100%; padding: 8px; background: none; border: none; color: #94a3b8;
  cursor: pointer; text-align: center; font-size: 16px; margin-bottom: 8px;
}
.nav-item {
  display: flex; align-items: center; gap: 10px; padding: 10px 14px;
  color: #94a3b8; cursor: pointer; white-space: nowrap; font-size: 13px; border: none; background: none; width: 100%; text-align: left;
}
.nav-item:hover { background: #334155; color: #e2e8f0; }
.nav-item.active { color: #3b82f6; background: rgba(59,130,246,0.1); }
.content { flex: 1; padding: 16px; background: #0f172a; border-radius: 0 10px 10px 0; }`,
      js: `const { useState } = React;

const items = [
  { icon: '\\u{1F3E0}', label: 'Dashboard' },
  { icon: '\\u{1F4CA}', label: 'Analytics' },
  { icon: '\\u{1F465}', label: 'Users' },
  { icon: '\\u2699', label: 'Settings' },
];

function App() {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState('Dashboard');

  return (
    <div className="layout">
      <div className={'sidebar' + (open ? ' open' : ' closed')}>
        <button className="toggle-btn" onClick={() => setOpen(!open)}>{open ? '\\u25C0' : '\\u25B6'}</button>
        {items.map(item => (
          <button key={item.label} className={'nav-item' + (active === item.label ? ' active' : '')}
            onClick={() => setActive(item.label)}>
            <span>{item.icon}</span>
            {open && <span>{item.label}</span>}
          </button>
        ))}
      </div>
      <div className="content">
        <div style={{color:'#e2e8f0',fontSize:18,fontWeight:600}}>{active}</div>
        <div style={{color:'#64748b',fontSize:14,marginTop:8}}>Content area for {active}</div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.mobile-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 16px; background: #1e293b; border-radius: 10px 10px 0 0; border: 1px solid #334155;
}
.brand { font-weight: 700; color: #e2e8f0; }
.menu-btn { background: none; border: none; color: #e2e8f0; font-size: 22px; cursor: pointer; }
.mobile-nav {
  overflow: hidden; transition: max-height 0.3s ease; background: #1e293b;
  border: 1px solid #334155; border-top: none; border-radius: 0 0 10px 10px;
}
.mobile-nav.open { max-height: 300px; }
.mobile-nav.closed { max-height: 0; border: none; }
.mobile-link {
  display: block; padding: 14px 16px; color: #94a3b8; font-size: 14px;
  border-bottom: 1px solid #334155; cursor: pointer; border: none; background: none; width: 100%; text-align: left;
}
.mobile-link:last-child { border-bottom: none; }
.mobile-link:hover { background: #334155; color: #e2e8f0; }
.mobile-link.active { color: #3b82f6; }`,
      js: `const { useState } = React;

const links = ['Home','Features','Pricing','Blog','Contact'];

function App() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('Home');

  return (
    <div>
      <div className="mobile-header">
        <span className="brand">\\u{1F4F1} MyApp</span>
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          {open ? '\\u2715' : '\\u2630'}
        </button>
      </div>
      <nav className={'mobile-nav' + (open ? ' open' : ' closed')}>
        {links.map(l => (
          <button key={l} className={'mobile-link' + (active === l ? ' active' : '')}
            onClick={() => { setActive(l); setOpen(false); }}>{l}</button>
        ))}
      </nav>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.phone-frame {
  border: 1px solid #334155; border-radius: 12px; overflow: hidden;
  display: flex; flex-direction: column; height: 300px;
}
.phone-content { flex: 1; display: flex; align-items: center; justify-content: center; padding: 16px; }
.bottom-nav {
  display: flex; background: #1e293b; border-top: 1px solid #334155;
}
.bottom-tab {
  flex: 1; padding: 10px 0; display: flex; flex-direction: column; align-items: center;
  gap: 2px; background: none; border: none; cursor: pointer; color: #64748b; font-size: 11px;
}
.bottom-tab:hover { color: #94a3b8; }
.bottom-tab.active { color: #3b82f6; }
.tab-icon { font-size: 18px; }`,
      js: `const { useState } = React;

const tabs = [
  { id: 'home', icon: '\\u{1F3E0}', label: 'Home' },
  { id: 'search', icon: '\\u{1F50D}', label: 'Search' },
  { id: 'add', icon: '\\u2795', label: 'Create' },
  { id: 'notif', icon: '\\u{1F514}', label: 'Alerts' },
  { id: 'profile', icon: '\\u{1F464}', label: 'Profile' },
];

function App() {
  const [active, setActive] = useState('home');
  const tab = tabs.find(t => t.id === active);

  return (
    <div className="phone-frame">
      <div className="phone-content">
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:48}}>{tab.icon}</div>
          <div style={{color:'#e2e8f0',fontSize:18,fontWeight:600,marginTop:8}}>{tab.label}</div>
          <div style={{color:'#64748b',fontSize:13,marginTop:4}}>Tap the bottom tabs to navigate</div>
        </div>
      </div>
      <nav className="bottom-nav">
        {tabs.map(t => (
          <button key={t.id} className={'bottom-tab' + (active === t.id ? ' active' : '')}
            onClick={() => setActive(t.id)}>
            <span className="tab-icon">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.menu-wrap { position: relative; display: inline-block; }
.menu-trigger {
  padding: 8px 16px; border-radius: 8px; border: 1px solid #334155;
  background: #1e293b; color: #e2e8f0; cursor: pointer; font-size: 14px;
}
.menu-trigger:hover { border-color: #475569; }
.menu-dropdown {
  position: absolute; top: 100%; left: 0; margin-top: 4px;
  background: #1e293b; border: 1px solid #334155; border-radius: 8px;
  min-width: 180px; padding: 4px; z-index: 20; box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}
.menu-item {
  display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 4px;
  color: #e2e8f0; cursor: pointer; font-size: 13px; border: none; background: none; width: 100%; text-align: left;
}
.menu-item:hover { background: #334155; }
.menu-item.danger { color: #ef4444; }
.divider { height: 1px; background: #334155; margin: 4px 0; }`,
      js: `const { useState, useRef, useEffect } = React;

function App() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const items = [
    { icon: '\\u270F', label: 'Edit' },
    { icon: '\\u{1F4CB}', label: 'Duplicate' },
    { icon: '\\u{1F4E6}', label: 'Archive' },
    'divider',
    { icon: '\\u{1F5D1}', label: 'Delete', danger: true },
  ];

  return (
    <div ref={ref} className="menu-wrap">
      <button className="menu-trigger" onClick={() => setOpen(!open)}>
        Actions \\u25BC
      </button>
      {open && (
        <div className="menu-dropdown">
          {items.map((item, i) =>
            item === 'divider' ? <div key={i} className="divider" /> : (
              <button key={i} className={'menu-item' + (item.danger ? ' danger' : '')}
                onClick={() => setOpen(false)}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.acc-section { border: 1px solid #334155; border-radius: 8px; margin-bottom: 4px; overflow: hidden; }
.acc-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 14px; background: #1e293b; cursor: pointer; border: none; width: 100%;
  color: #e2e8f0; font-size: 14px; font-weight: 500;
}
.acc-header:hover { background: #334155; }
.acc-icon { font-size: 12px; transition: transform 0.3s; color: #64748b; }
.acc-icon.open { transform: rotate(180deg); }
.acc-body { max-height: 0; overflow: hidden; transition: max-height 0.3s; }
.acc-body.open { max-height: 200px; }
.acc-link {
  display: block; padding: 8px 14px 8px 28px; color: #94a3b8; font-size: 13px;
  cursor: pointer; border: none; background: none; width: 100%; text-align: left;
}
.acc-link:hover { color: #e2e8f0; background: rgba(255,255,255,0.02); }`,
      js: `const { useState } = React;

const sections = [
  { title: 'Getting Started', items: ['Introduction','Installation','Quick Start'] },
  { title: 'Components', items: ['Buttons','Forms','Modals','Tables'] },
  { title: 'Advanced', items: ['Hooks','Context','Performance'] },
];

function App() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div>
      {sections.map((sec, i) => (
        <div key={i} className="acc-section">
          <button className="acc-header" onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
            <span>{sec.title}</span>
            <span className={'acc-icon' + (openIdx === i ? ' open' : '')}>\\u25BC</span>
          </button>
          <div className={'acc-body' + (openIdx === i ? ' open' : '')}>
            {sec.items.map(item => (
              <button key={item} className="acc-link">{item}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.breadcrumbs { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; margin-bottom: 16px; }
.crumb { color: #3b82f6; font-size: 13px; cursor: pointer; background: none; border: none; padding: 4px 2px; }
.crumb:hover { text-decoration: underline; }
.crumb.current { color: #e2e8f0; cursor: default; }
.crumb.current:hover { text-decoration: none; }
.separator { color: #475569; font-size: 12px; }
.page-title { font-size: 20px; font-weight: 700; color: #e2e8f0; margin-bottom: 8px; }
.page-desc { color: #94a3b8; font-size: 14px; }`,
      js: `const { useState } = React;

const paths = [
  ['Home'],
  ['Home','Products'],
  ['Home','Products','Electronics'],
  ['Home','Products','Electronics','Laptops'],
];

function App() {
  const [depth, setDepth] = useState(3);
  const crumbs = paths[depth];

  return (
    <div>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="separator">/</span>}
            <button className={'crumb' + (i === crumbs.length-1 ? ' current' : '')}
              onClick={() => i < crumbs.length-1 && setDepth(i)}
              aria-current={i === crumbs.length-1 ? 'page' : undefined}>
              {c}
            </button>
          </React.Fragment>
        ))}
      </nav>
      <div className="page-title">{crumbs[crumbs.length - 1]}</div>
      <div className="page-desc">You are viewing the {crumbs[crumbs.length - 1]} page. Click a breadcrumb to navigate back.</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.nav-tabs {
  display: flex; gap: 4px; background: #0f172a; padding: 4px; border-radius: 10px; margin-bottom: 20px;
}
.nav-tab {
  flex: 1; padding: 8px 16px; background: transparent; border: none; border-radius: 6px;
  color: #64748b; cursor: pointer; font-size: 13px; font-weight: 500; transition: all 0.2s;
}
.nav-tab:hover:not(.active) { background: #1e293b; color: #94a3b8; }
.nav-tab.active { background: #3b82f6; color: white; }
.view {
  animation: slideIn 0.25s ease;
  background: #1e293b; padding: 20px; border-radius: 10px; border: 1px solid #334155;
}
@keyframes slideIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: none; } }
.view h3 { margin: 0 0 8px; color: #e2e8f0; font-size: 16px; }
.view p { margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.5; }`,
      js: `const { useState } = React;

const views = [
  { id: 'home', label: 'Home', title: 'Welcome Home', text: 'Your personalized dashboard with recent activity and updates.' },
  { id: 'explore', label: 'Explore', title: 'Discover Content', text: 'Browse trending topics, featured articles, and recommended resources.' },
  { id: 'profile', label: 'Profile', title: 'Your Profile', text: 'Manage your account settings, preferences, and personal information.' },
];

function App() {
  const [view, setView] = useState('home');
  const current = views.find(v => v.id === view);

  return (
    <div>
      <nav className="nav-tabs" role="navigation">
        {views.map(v => (
          <button key={v.id}
            className={'nav-tab' + (v.id === view ? ' active' : '')}
            onClick={() => setView(v.id)}
            aria-current={v.id === view ? 'page' : undefined}>
            {v.label}
          </button>
        ))}
      </nav>
      <div className="view" key={view}>
        <h3>{current.title}</h3>
        <p>{current.text}</p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.modules {
  display: flex; gap: 12px; margin-bottom: 24px;
}
.module-card {
  flex: 1; padding: 16px; background: #1e293b; border: 2px solid #334155; border-radius: 8px;
  cursor: pointer; transition: all 0.2s;
}
.module-card:hover { border-color: #475569; }
.module-card.active { border-color: #3b82f6; background: #1e3a5f; }
.module-card h3 { margin: 0 0 4px; color: #e2e8f0; font-size: 14px; }
.module-card p { margin: 0; color: #64748b; font-size: 12px; }
.content {
  background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155;
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.content h2 { margin: 0 0 12px; color: #3b82f6; font-size: 18px; }
.content .item { padding: 8px; background: #0f172a; border-radius: 4px; margin-bottom: 8px; }
.content .item h4 { margin: 0 0 4px; color: #e2e8f0; font-size: 14px; }
.content .item p { margin: 0; color: #94a3b8; font-size: 13px; }`,
      js: `const { useState } = React;

const modules = [
  { id: 'users', label: 'Users', desc: 'Manage users', content: { title: 'User Management', items: [{ name: 'Active Users', val: '1,234' }, { name: 'New Today', val: '42' }] } },
  { id: 'analytics', label: 'Analytics', desc: 'View metrics', content: { title: 'Analytics Dashboard', items: [{ name: 'Page Views', val: '45.2K' }, { name: 'Bounce Rate', val: '23%' }] } },
  { id: 'settings', label: 'Settings', desc: 'Configuration', content: { title: 'System Settings', items: [{ name: 'Auto-save', val: 'Enabled' }, { name: 'Timezone', val: 'UTC' }] } },
];

function App() {
  const [active, setActive] = useState('users');
  const mod = modules.find(m => m.id === active);

  return (
    <div>
      <div className="modules">
        {modules.map(m => (
          <div key={m.id}
            className={'module-card' + (m.id === active ? ' active' : '')}
            onClick={() => setActive(m.id)}>
            <h3>{m.label}</h3>
            <p>{m.desc}</p>
          </div>
        ))}
      </div>
      <div className="content" key={active}>
        <h2>{mod.content.title}</h2>
        {mod.content.items.map((item, i) => (
          <div key={i} className="item">
            <h4>{item.name}</h4>
            <p>{item.val}</p>
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
    id: 'react-pagination',
    title: 'Pagination',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'Smart page navigation',
    concepts: ['navigation', 'state management', 'accessibility', 'user experience'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/pagination',
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.items {
  margin-bottom: 16px;
}
.item {
  padding: 12px; background: #1e293b; border: 1px solid #334155; border-radius: 6px;
  margin-bottom: 8px; color: #e2e8f0; font-size: 14px;
}
.pagination {
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.page-btn {
  padding: 6px 12px; background: #1e293b; border: 1px solid #334155; border-radius: 4px;
  color: #e2e8f0; cursor: pointer; font-size: 13px; transition: all 0.2s;
}
.page-btn:hover:not(:disabled):not(.active) { background: #334155; }
.page-btn.active { background: #3b82f6; border-color: #3b82f6; color: white; }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.page-info { color: #64748b; font-size: 13px; margin: 0 8px; }`,
      js: `const { useState } = React;

const allItems = Array.from({ length: 25 }, (_, i) => \`Item \${i + 1}: Sample content for item number \${i + 1}\`);
const perPage = 5;

function App() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allItems.length / perPage);
  const start = (page - 1) * perPage;
  const items = allItems.slice(start, start + perPage);

  return (
    <div>
      <div className="items">
        {items.map((item, i) => (
          <div key={start + i} className="item">{item}</div>
        ))}
      </div>
      <div className="pagination">
        <button className="page-btn" onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span className="page-info">Page {page} of {totalPages}</span>
        {[...Array(totalPages)].map((_, i) => {
          const p = i + 1;
          if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
            return (
              <button key={p}
                className={'page-btn' + (p === page ? ' active' : '')}
                onClick={() => setPage(p)}>
                {p}
              </button>
            );
          }
          if (Math.abs(p - page) === 2) return <span key={p} style={{ color: '#64748b' }}>...</span>;
          return null;
        })}
        <button className="page-btn" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.nav {
  display: flex; gap: 0; background: #1e293b; padding: 0; border-radius: 8px; border: 1px solid #334155;
}
.nav-item {
  position: relative;
}
.nav-btn {
  padding: 12px 20px; background: transparent; border: none; color: #e2e8f0;
  cursor: pointer; font-size: 14px; transition: background 0.2s;
}
.nav-btn:hover { background: #334155; }
.dropdown {
  position: absolute; top: 100%; left: 0; background: #1e293b; border: 1px solid #334155;
  border-radius: 6px; margin-top: 4px; min-width: 180px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  animation: slideDown 0.15s ease;
}
@keyframes slideDown { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
.dropdown-item {
  padding: 10px 16px; border: none; background: transparent; color: #e2e8f0;
  cursor: pointer; width: 100%; text-align: left; font-size: 13px; transition: background 0.15s;
}
.dropdown-item:hover { background: #334155; }
.dropdown-item:first-child { border-radius: 6px 6px 0 0; }
.dropdown-item:last-child { border-radius: 0 0 6px 6px; }`,
      js: `const { useState } = React;

function App() {
  const [open, setOpen] = useState(null);

  const menus = [
    { id: 'products', label: 'Products', items: ['Laptops', 'Phones', 'Tablets'] },
    { id: 'services', label: 'Services', items: ['Support', 'Training', 'Consulting'] },
    { id: 'company', label: 'Company', items: ['About', 'Careers', 'Contact'] },
  ];

  return (
    <nav className="nav">
      {menus.map(menu => (
        <div key={menu.id} className="nav-item">
          <button className="nav-btn"
            onClick={() => setOpen(open === menu.id ? null : menu.id)}
            onBlur={(e) => {
              if (!e.currentTarget.parentElement.contains(e.relatedTarget)) {
                setOpen(null);
              }
            }}>
            {menu.label}
          </button>
          {open === menu.id && (
            <div className="dropdown">
              {menu.items.map(item => (
                <button key={item} className="dropdown-item"
                  onClick={() => setOpen(null)}>
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.sidebar {
  width: 220px; background: #1e293b; border-radius: 8px; border: 1px solid #334155; padding: 8px;
}
.menu-item {
  margin-bottom: 4px;
}
.menu-btn {
  width: 100%; padding: 10px 12px; background: transparent; border: none;
  color: #e2e8f0; cursor: pointer; font-size: 14px; text-align: left;
  border-radius: 6px; transition: background 0.15s; display: flex; justify-content: space-between; align-items: center;
}
.menu-btn:hover { background: #334155; }
.menu-btn.active { background: #334155; }
.submenu {
  margin: 4px 0 0 12px; padding-left: 12px; border-left: 2px solid #334155;
  animation: expand 0.2s ease;
}
@keyframes expand { from { opacity: 0; max-height: 0; } to { opacity: 1; max-height: 200px; } }
.submenu-item {
  padding: 8px 12px; background: transparent; border: none; color: #94a3b8;
  cursor: pointer; font-size: 13px; text-align: left; width: 100%; border-radius: 4px;
  transition: all 0.15s;
}
.submenu-item:hover { background: #334155; color: #e2e8f0; }`,
      js: `const { useState } = React;

function App() {
  const [open, setOpen] = useState('dashboard');

  const menus = [
    { id: 'dashboard', label: 'Dashboard', items: null },
    { id: 'products', label: 'Products', items: ['All Products', 'Categories', 'Inventory'] },
    { id: 'users', label: 'Users', items: ['All Users', 'Roles', 'Permissions'] },
    { id: 'settings', label: 'Settings', items: ['General', 'Security', 'Integrations'] },
  ];

  return (
    <div className="sidebar">
      {menus.map(menu => (
        <div key={menu.id} className="menu-item">
          <button className={'menu-btn' + (open === menu.id && menu.items ? ' active' : '')}
            onClick={() => setOpen(open === menu.id ? null : menu.id)}>
            <span>{menu.label}</span>
            {menu.items && <span>{open === menu.id ? '▼' : '▶'}</span>}
          </button>
          {menu.items && open === menu.id && (
            <div className="submenu">
              {menu.items.map(item => (
                <button key={item} className="submenu-item">
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.trigger-btn {
  padding: 10px 16px; background: #3b82f6; border: none; border-radius: 6px;
  color: white; cursor: pointer; font-size: 14px; font-weight: 500;
}
.dropdown-wrap {
  position: relative; display: inline-block;
}
.dropdown {
  position: absolute; top: calc(100% + 4px); right: 0; background: #1e293b;
  border: 1px solid #334155; border-radius: 8px; min-width: 240px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3); animation: slideDown 0.15s ease;
}
@keyframes slideDown { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
.dropdown-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 14px; border: none; background: transparent; color: #e2e8f0;
  cursor: pointer; width: 100%; text-align: left; font-size: 13px; transition: background 0.15s;
}
.dropdown-item:hover { background: #334155; }
.dropdown-item:first-child { border-radius: 8px 8px 0 0; }
.dropdown-item:last-child { border-radius: 0 0 8px 8px; }
.shortcut {
  font-size: 11px; color: #64748b; background: #0f172a; padding: 2px 6px; border-radius: 3px;
}`,
      js: `const { useState, useEffect } = React;

function App() {
  const [open, setOpen] = useState(false);

  const actions = [
    { id: 'new', label: 'New Document', shortcut: 'Ctrl+N' },
    { id: 'open', label: 'Open File', shortcut: 'Ctrl+O' },
    { id: 'save', label: 'Save', shortcut: 'Ctrl+S' },
    { id: 'search', label: 'Search', shortcut: 'Ctrl+F' },
  ];

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  return (
    <div className="dropdown-wrap">
      <button className="trigger-btn" onClick={() => setOpen(!open)}>
        Quick Actions
      </button>
      {open && (
        <div className="dropdown">
          {actions.map(action => (
            <button key={action.id} className="dropdown-item"
              onClick={() => setOpen(false)}>
              <span>{action.label}</span>
              <span className="shortcut">{action.shortcut}</span>
            </button>
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
    id: 'react-menus',
    title: 'Menus',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'General menu patterns',
    concepts: ['navigation', 'accessibility', 'keyboard navigation', 'state management'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/menus',
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.menu {
  background: #1e293b; border-radius: 8px; border: 1px solid #334155; padding: 8px; min-width: 200px;
}
.menu-item {
  padding: 10px 12px; background: transparent; border: none; color: #e2e8f0;
  cursor: pointer; width: 100%; text-align: left; font-size: 14px; border-radius: 6px;
  transition: background 0.15s; display: flex; align-items: center; gap: 10px;
}
.menu-item:hover { background: #334155; }
.menu-item.danger { color: #ef4444; }
.menu-item.danger:hover { background: #7f1d1d; }
.divider {
  height: 1px; background: #334155; margin: 6px 0;
}
.icon {
  width: 16px; height: 16px; display: inline-block;
}`,
      js: `const { useState } = React;

function App() {
  const [selected, setSelected] = useState('');

  const menuItems = [
    { id: 'edit', label: 'Edit', icon: '✏️' },
    { id: 'duplicate', label: 'Duplicate', icon: '📋' },
    { id: 'share', label: 'Share', icon: '🔗' },
    { id: 'divider' },
    { id: 'archive', label: 'Archive', icon: '📦' },
    { id: 'delete', label: 'Delete', icon: '🗑️', danger: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div className="menu">
        {menuItems.map(item => {
          if (item.id === 'divider') return <div key={item.id} className="divider" />;
          return (
            <button key={item.id}
              className={'menu-item' + (item.danger ? ' danger' : '')}
              onClick={() => setSelected(item.label)}>
              <span className="icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
      {selected && (
        <div style={{ color: '#94a3b8', fontSize: '14px' }}>
          Selected: {selected}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.footer {
  background: #0f172a; border-top: 1px solid #334155; padding: 32px 20px 16px;
}
.footer-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 24px;
  margin-bottom: 24px;
}
.footer-col h3 {
  margin: 0 0 12px; color: #e2e8f0; font-size: 14px; font-weight: 600;
}
.footer-col ul {
  list-style: none; padding: 0; margin: 0;
}
.footer-col li {
  margin-bottom: 8px;
}
.footer-col a {
  color: #94a3b8; font-size: 13px; text-decoration: none; transition: color 0.15s;
}
.footer-col a:hover {
  color: #3b82f6;
}
.footer-bottom {
  text-align: center; padding-top: 16px; border-top: 1px solid #334155;
  color: #64748b; font-size: 12px;
}`,
      js: `const { useState } = React;

function App() {
  const sections = [
    { title: 'Product', links: ['Features', 'Pricing', 'Security', 'Roadmap'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
    { title: 'Resources', links: ['Documentation', 'Guides', 'API Reference', 'Support'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookie Policy', 'Licenses'] },
  ];

  return (
    <footer className="footer">
      <div className="footer-grid">
        {sections.map(section => (
          <div key={section.title} className="footer-col">
            <h3>{section.title}</h3>
            <ul>
              {section.links.map(link => (
                <li key={link}>
                  <a href="#" onClick={(e) => e.preventDefault()}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        © 2026 Your Company. All rights reserved.
      </div>
    </footer>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.header {
  background: #1e293b; padding: 16px 20px; border-bottom: 1px solid #334155;
  display: flex; align-items: center; gap: 20px;
}
.home-link {
  display: flex; align-items: center; gap: 8px; text-decoration: none;
  color: #e2e8f0; font-weight: 600; font-size: 16px; transition: color 0.2s;
}
.home-link:hover {
  color: #3b82f6;
}
.logo {
  width: 28px; height: 28px; background: #3b82f6; border-radius: 6px;
  display: flex; align-items: center; justify-content: center; font-size: 18px;
}
.nav-links {
  display: flex; gap: 16px; margin-left: auto;
}
.nav-link {
  color: #94a3b8; text-decoration: none; font-size: 14px; transition: color 0.2s;
}
.nav-link:hover {
  color: #e2e8f0;
}
.content {
  padding: 24px 20px; color: #e2e8f0;
}`,
      js: `const { useState } = React;

function App() {
  const [page, setPage] = useState('home');

  return (
    <div>
      <header className="header">
        <a href="#" className="home-link" onClick={(e) => { e.preventDefault(); setPage('home'); }}>
          <span className="logo">🏠</span>
          <span>MyApp</span>
        </a>
        <nav className="nav-links">
          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setPage('about'); }}>About</a>
          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); setPage('contact'); }}>Contact</a>
        </nav>
      </header>
      <div className="content">
        {page === 'home' && <h2>Welcome Home</h2>}
        {page === 'about' && <h2>About Us</h2>}
        {page === 'contact' && <h2>Contact</h2>}
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          Click the logo to return home from anywhere.
        </p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.breadcrumb {
  display: flex; align-items: center; gap: 8px; padding: 12px 16px;
  background: #1e293b; border-radius: 8px; border: 1px solid #334155; margin-bottom: 20px;
}
.crumb {
  color: #94a3b8; font-size: 13px; text-decoration: none; transition: color 0.15s;
}
.crumb:hover {
  color: #3b82f6;
}
.crumb.current {
  color: #e2e8f0; font-weight: 500;
}
.separator {
  color: #475569; font-size: 12px;
}
.level-nav {
  display: flex; gap: 12px; margin-bottom: 16px;
}
.level-btn {
  padding: 8px 14px; background: #1e293b; border: 1px solid #334155; border-radius: 6px;
  color: #e2e8f0; cursor: pointer; font-size: 13px; transition: all 0.2s;
}
.level-btn:hover {
  background: #334155;
}
.content {
  background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155;
}
.content h2 {
  margin: 0 0 8px; color: #3b82f6; font-size: 18px;
}
.content p {
  margin: 0; color: #94a3b8; font-size: 14px;
}`,
      js: `const { useState } = React;

function App() {
  const [path, setPath] = useState(['Dashboard', 'Projects', 'Web App']);

  const navigate = (index) => {
    setPath(path.slice(0, index + 1));
  };

  const addLevel = (name) => {
    setPath([...path, name]);
  };

  return (
    <div>
      <nav className="breadcrumb">
        {path.map((crumb, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="separator">/</span>}
            <a href="#"
              className={'crumb' + (i === path.length - 1 ? ' current' : '')}
              onClick={(e) => { e.preventDefault(); navigate(i); }}>
              {crumb}
            </a>
          </React.Fragment>
        ))}
      </nav>
      <div className="level-nav">
        <button className="level-btn" onClick={() => addLevel('Backend')}>Backend</button>
        <button className="level-btn" onClick={() => addLevel('Frontend')}>Frontend</button>
        <button className="level-btn" onClick={() => addLevel('Database')}>Database</button>
      </div>
      <div className="content">
        <h2>{path[path.length - 1]}</h2>
        <p>Click breadcrumbs to jump up the hierarchy, or buttons to go deeper.</p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.steps-container {
  max-width: 450px;
  margin: 0 auto;
  padding: 24px;
}

h2 {
  color: #e2e8f0;
  margin: 0 0 20px 0;
  font-size: 18px;
}

.progress-bar {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 24px;
}

.step-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
  color: white;
  background: #334155;
  border: 2px solid #334155;
  flex-shrink: 0;
  transition: all 0.3s;
  z-index: 1;
}

.step-dot.active {
  background: #3b82f6;
  border-color: #3b82f6;
}

.step-dot.done {
  background: #22c55e;
  border-color: #22c55e;
}

.step-line {
  flex: 1;
  height: 3px;
  background: #334155;
  transition: background 0.3s;
}

.step-line.done {
  background: #22c55e;
}

.step-content {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
}

.step-title {
  color: #e2e8f0;
  font-size: 16px;
  margin-bottom: 8px;
}

.step-desc {
  color: #94a3b8;
  font-size: 14px;
  margin-bottom: 16px;
}

.step-input {
  width: 100%;
  padding: 10px 12px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #e2e8f0;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.step-input:focus {
  border-color: #3b82f6;
}

.step-nav {
  display: flex;
  justify-content: space-between;
}

.step-nav button {
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.btn-back {
  background: #334155;
  color: #e2e8f0;
}

.btn-next {
  background: #3b82f6;
  color: white;
}

.steps-left-text {
  color: #94a3b8;
  font-size: 13px;
  text-align: center;
  margin-top: 12px;
}`,
      js: `const { useState } = React;

const steps = [
  { title: 'Account Info', desc: 'Enter your basic details', placeholder: 'Your name' },
  { title: 'Contact', desc: 'How can we reach you?', placeholder: 'Email address' },
  { title: 'Preferences', desc: 'Customize your experience', placeholder: 'Favorite color' },
  { title: 'Confirm', desc: 'Review and submit', placeholder: '' },
];

function App() {
  const [current, setCurrent] = useState(0);
  const [values, setValues] = useState(Array(steps.length).fill(''));

  const next = () => { if (current < steps.length - 1) setCurrent(c => c + 1); };
  const back = () => { if (current > 0) setCurrent(c => c - 1); };

  const remaining = steps.length - 1 - current;

  return (
    <div className="steps-container">
      <h2>Steps Left</h2>
      <div className="progress-bar">
        {steps.map((_, i) => (
          <React.Fragment key={i}>
            <div className={\\\`step-dot \\\${i < current ? 'done' : i === current ? 'active' : ''}\\\`}>
              {i < current ? '\u2713' : i + 1}
            </div>
            {i < steps.length - 1 && <div className={\\\`step-line \\\${i < current ? 'done' : ''}\\\`} />}
          </React.Fragment>
        ))}
      </div>
      <div className="step-content">
        <div className="step-title">{steps[current].title}</div>
        <div className="step-desc">{steps[current].desc}</div>
        {steps[current].placeholder && (
          <input
            className="step-input"
            placeholder={steps[current].placeholder}
            value={values[current]}
            onChange={e => { const v = [...values]; v[current] = e.target.value; setValues(v); }}
          />
        )}
        {current === steps.length - 1 && (
          <div style={{ color: '#94a3b8', fontSize: 14 }}>
            {values.filter(v => v.trim()).length} of {steps.length - 1} fields completed
          </div>
        )}
      </div>
      <div className="step-nav">
        <button className="btn-back" onClick={back} disabled={current === 0}>Back</button>
        <button className="btn-next" onClick={next}>
          {current === steps.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
      <div className="steps-left-text">
        {remaining > 0 ? \\\`\\\${remaining} step\\\${remaining > 1 ? 's' : ''} remaining\\\` : 'Final step!'}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.view-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.view-header h2 {
  color: #e2e8f0;
  margin: 0;
  font-size: 18px;
}

.view-toggles {
  display: flex;
  gap: 4px;
  background: #1e293b;
  border-radius: 6px;
  padding: 2px;
  border: 1px solid #334155;
}

.view-toggles button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  font-size: 16px;
}

.view-toggles button.active {
  background: #3b82f6;
  color: white;
}

.grid-view {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.grid-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.grid-card .icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.grid-card .name {
  color: #e2e8f0;
  font-size: 14px;
}

.grid-card .meta {
  color: #64748b;
  font-size: 12px;
}

.list-view {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.list-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
}

.list-row .icon {
  font-size: 22px;
}

.list-row .info { flex: 1; }

.list-row .name {
  color: #e2e8f0;
  font-size: 14px;
}

.list-row .meta {
  color: #64748b;
  font-size: 12px;
}`,
      js: `const { useState } = React;

const items = [
  { icon: '\uD83D\uDCC1', name: 'Documents', meta: '24 files' },
  { icon: '\uD83D\uDDBC\uFE0F', name: 'Images', meta: '136 files' },
  { icon: '\uD83C\uDFB5', name: 'Music', meta: '48 files' },
  { icon: '\uD83C\uDFAC', name: 'Videos', meta: '12 files' },
  { icon: '\uD83D\uDCE6', name: 'Archives', meta: '8 files' },
  { icon: '\u2B50', name: 'Favorites', meta: '15 files' },
];

function App() {
  const [view, setView] = useState('grid');

  return (
    <div className="view-container">
      <div className="view-header">
        <h2>Files</h2>
        <div className="view-toggles">
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} title="Grid">\u25A6</button>
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} title="List">\u2630</button>
        </div>
      </div>
      {view === 'grid' ? (
        <div className="grid-view">
          {items.map(it => (
            <div key={it.name} className="grid-card">
              <div className="icon">{it.icon}</div>
              <div className="name">{it.name}</div>
              <div className="meta">{it.meta}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="list-view">
          {items.map(it => (
            <div key={it.name} className="list-row">
              <span className="icon">{it.icon}</span>
              <div className="info">
                <div className="name">{it.name}</div>
                <div className="meta">{it.meta}</div>
              </div>
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
    id: 'react-preview',
    title: 'Preview',
    category: 'navigation',
    difficulty: 'intermediate',
    description: 'Content preview patterns',
    concepts: ['modal dialogs', 'lazy loading', 'user experience', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/preview',
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.preview-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
}

h2 {
  color: #e2e8f0;
  margin: 0 0 16px 0;
  font-size: 18px;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.card-item:hover {
  border-color: #3b82f6;
}

.card-thumb {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: #334155;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}

.card-info {
  flex: 1;
}

.card-title {
  color: #e2e8f0;
  font-size: 14px;
}

.card-desc {
  color: #64748b;
  font-size: 12px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-content {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.modal-header h3 {
  color: #e2e8f0;
  margin: 0;
  font-size: 18px;
}

.modal-close {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 20px;
  cursor: pointer;
}

.modal-icon {
  font-size: 60px;
  text-align: center;
  margin: 16px 0;
}

.modal-desc {
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.6;
}

.modal-tags {
  display: flex;
  gap: 6px;
  margin-top: 12px;
}

.modal-tag {
  padding: 3px 10px;
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  border-radius: 4px;
  font-size: 12px;
}`,
      js: `const { useState } = React;

const items = [
  { icon: '\uD83D\uDCDD', title: 'Blog Post', desc: 'A draft article about React hooks', full: 'This article covers useState, useEffect, and custom hooks with practical examples and best practices for production apps.', tags: ['react', 'hooks'] },
  { icon: '\uD83D\uDDBC\uFE0F', title: 'Design Mockup', desc: 'Landing page wireframe v2', full: 'Updated wireframe with improved hero section, social proof, and call-to-action placement based on A/B test results.', tags: ['design', 'ui'] },
  { icon: '\uD83D\uDCC4', title: 'API Docs', desc: 'REST endpoints reference', full: 'Complete documentation for all CRUD endpoints including authentication, pagination, and error handling conventions.', tags: ['api', 'docs'] },
  { icon: '\uD83D\uDCCA', title: 'Analytics Report', desc: 'Q4 performance data', full: 'Quarterly metrics showing 23% growth in active users and 15% improvement in page load times after optimization.', tags: ['data', 'report'] },
];

function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="preview-container">
      <h2>Preview</h2>
      <div className="card-list">
        {items.map((item, i) => (
          <div key={i} className="card-item" onClick={() => setSelected(item)}>
            <div className="card-thumb">{item.icon}</div>
            <div className="card-info">
              <div className="card-title">{item.title}</div>
              <div className="card-desc">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selected.title}</h3>
              <button className="modal-close" onClick={() => setSelected(null)}>\u2715</button>
            </div>
            <div className="modal-icon">{selected.icon}</div>
            <div className="modal-desc">{selected.full}</div>
            <div className="modal-tags">
              {selected.tags.map(t => <span key={t} className="modal-tag">{t}</span>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.faq-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
}

h2 {
  color: #e2e8f0;
  margin: 0 0 16px 0;
  font-size: 18px;
}

.faq-item {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  margin-bottom: 8px;
  overflow: hidden;
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  cursor: pointer;
  color: #e2e8f0;
  font-size: 14px;
  user-select: none;
}

.faq-question:hover {
  background: rgba(59, 130, 246, 0.05);
}

.faq-arrow {
  color: #94a3b8;
  transition: transform 0.3s;
  font-size: 12px;
}

.faq-arrow.open {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  color: #94a3b8;
  font-size: 13px;
  line-height: 1.6;
  padding: 0 16px;
}

.faq-answer.open {
  max-height: 200px;
  padding: 0 16px 14px;
}

.search-box {
  width: 100%;
  padding: 10px 14px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #e2e8f0;
  font-size: 14px;
  outline: none;
  margin-bottom: 16px;
  box-sizing: border-box;
}

.search-box:focus {
  border-color: #3b82f6;
}`,
      js: `const { useState } = React;

const faqs = [
  { q: 'How do I reset my password?', a: 'Go to Settings > Security > Reset Password and follow the prompts to create a new password.' },
  { q: 'Can I change my username?', a: 'Yes, navigate to Settings > Profile and click on your username to edit it. Changes take effect immediately.' },
  { q: 'How do I cancel my subscription?', a: 'Visit Settings > Billing > Cancel Plan. Your access will continue until the end of the billing period.' },
  { q: 'Is my data encrypted?', a: 'Yes, all data is encrypted at rest using AES-256 and in transit using TLS 1.3.' },
  { q: 'How do I export my data?', a: 'Go to Settings > Data > Export. You can download your data in JSON or CSV format.' },
];

function App() {
  const [openId, setOpenId] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = faqs.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <input
        className="search-box"
        placeholder="Search questions..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {filtered.map((f, i) => (
        <div key={i} className="faq-item">
          <div className="faq-question" onClick={() => setOpenId(openId === i ? null : i)}>
            <span>{f.q}</span>
            <span className={\\\`faq-arrow \\\${openId === i ? 'open' : ''}\\\`}>\u25BC</span>
          </div>
          <div className={\\\`faq-answer \\\${openId === i ? 'open' : ''}\\\`}>{f.a}</div>
        </div>
      ))}
      {filtered.length === 0 && <div style={{ color: '#64748b', textAlign: 'center', padding: 24 }}>No matching questions</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.shortcuts-container {
  max-width: 450px;
  margin: 0 auto;
  padding: 24px;
}

h2 {
  color: #e2e8f0;
  margin: 0 0 16px 0;
  font-size: 18px;
}

.shortcut-list {
  background: #1e293b;
  border-radius: 12px;
  border: 1px solid #334155;
  overflow: hidden;
}

.shortcut-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
}

.shortcut-row + .shortcut-row {
  border-top: 1px solid #334155;
}

.shortcut-action {
  color: #e2e8f0;
  font-size: 14px;
}

.key-combo {
  display: flex;
  gap: 4px;
}

kbd {
  padding: 4px 8px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 4px;
  color: #94a3b8;
  font-size: 12px;
  font-family: monospace;
  min-width: 24px;
  text-align: center;
}

.last-pressed {
  margin-top: 16px;
  padding: 16px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  text-align: center;
}

.last-pressed-label {
  color: #64748b;
  font-size: 12px;
  margin-bottom: 4px;
}

.last-pressed-key {
  color: #3b82f6;
  font-size: 20px;
  font-family: monospace;
}

.hint {
  color: #64748b;
  font-size: 12px;
  text-align: center;
  margin-top: 12px;
}`,
      js: `const { useState, useEffect } = React;

const shortcuts = [
  { keys: ['Ctrl', 'S'], action: 'Save' },
  { keys: ['Ctrl', 'Z'], action: 'Undo' },
  { keys: ['Ctrl', 'F'], action: 'Find' },
  { keys: ['Ctrl', 'N'], action: 'New' },
  { keys: ['Esc'], action: 'Close' },
];

function App() {
  const [lastKey, setLastKey] = useState('');
  const [triggered, setTriggered] = useState('');

  useEffect(() => {
    const handler = (e) => {
      const parts = [];
      if (e.ctrlKey || e.metaKey) parts.push('Ctrl');
      if (e.shiftKey) parts.push('Shift');
      if (e.altKey) parts.push('Alt');
      if (e.key !== 'Control' && e.key !== 'Meta' && e.key !== 'Shift' && e.key !== 'Alt') {
        parts.push(e.key.length === 1 ? e.key.toUpperCase() : e.key);
      }
      const combo = parts.join(' + ');
      setLastKey(combo);

      const match = shortcuts.find(s => {
        const sk = s.keys.join(' + ').toUpperCase();
        return combo.toUpperCase() === sk;
      });
      if (match) {
        e.preventDefault();
        setTriggered(match.action);
        setTimeout(() => setTriggered(''), 1500);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="shortcuts-container">
      <h2>Keyboard Shortcuts</h2>
      <div className="shortcut-list">
        {shortcuts.map(s => (
          <div key={s.action} className="shortcut-row" style={triggered === s.action ? { background: 'rgba(59,130,246,0.15)' } : {}}>
            <span className="shortcut-action">{s.action}</span>
            <div className="key-combo">
              {s.keys.map(k => <kbd key={k}>{k}</kbd>)}
            </div>
          </div>
        ))}
      </div>
      <div className="last-pressed">
        <div className="last-pressed-label">Last key pressed</div>
        <div className="last-pressed-key">{lastKey || 'Press any key...'}</div>
      </div>
      <div className="hint">Try pressing the keyboard shortcuts above</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.rule-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
}

h2 {
  color: #e2e8f0;
  margin: 0 0 16px 0;
  font-size: 18px;
}

.rule-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.rule-card select, .rule-card input {
  padding: 6px 10px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #e2e8f0;
  font-size: 13px;
  outline: none;
}

.rule-card select:focus, .rule-card input:focus {
  border-color: #3b82f6;
}

.rule-card input {
  width: 100px;
}

.remove-rule {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 16px;
  margin-left: auto;
}

.add-rule-btn {
  padding: 8px 16px;
  background: transparent;
  border: 1px dashed #334155;
  border-radius: 8px;
  color: #3b82f6;
  cursor: pointer;
  font-size: 13px;
  width: 100%;
  margin-top: 8px;
}

.add-rule-btn:hover {
  border-color: #3b82f6;
}

.logic-toggle {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
}

.logic-toggle button {
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid #334155;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  font-size: 12px;
}

.logic-toggle button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.output-box {
  margin-top: 16px;
  padding: 12px;
  background: #0f172a;
  border-radius: 8px;
  color: #94a3b8;
  font-size: 12px;
  font-family: monospace;
  white-space: pre-wrap;
}`,
      js: `const { useState } = React;

const fields = ['name', 'email', 'age', 'country', 'role'];
const operators = ['equals', 'contains', 'greater than', 'less than'];

let ruleId = 3;

function App() {
  const [rules, setRules] = useState([
    { id: 1, field: 'age', operator: 'greater than', value: '18' },
    { id: 2, field: 'role', operator: 'equals', value: 'admin' },
  ]);
  const [logic, setLogic] = useState('AND');

  const addRule = () => {
    setRules(prev => [...prev, { id: ++ruleId, field: 'name', operator: 'equals', value: '' }]);
  };

  const updateRule = (id, key, val) => setRules(prev =>
    prev.map(r => r.id === id ? { ...r, [key]: val } : r));

  const removeRule = (id) => setRules(prev => prev.filter(r => r.id !== id));

  const summary = rules.map(r => \\\`\\\${r.field} \\\${r.operator} "\\\${r.value}"\\\`).join(\\\` \\\${logic} \\\`);

  return (
    <div className="rule-container">
      <h2>Rule Builder</h2>
      <div className="logic-toggle">
        <button className={logic === 'AND' ? 'active' : ''} onClick={() => setLogic('AND')}>AND</button>
        <button className={logic === 'OR' ? 'active' : ''} onClick={() => setLogic('OR')}>OR</button>
      </div>
      {rules.map(r => (
        <div key={r.id} className="rule-card">
          <select value={r.field} onChange={e => updateRule(r.id, 'field', e.target.value)}>
            {fields.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <select value={r.operator} onChange={e => updateRule(r.id, 'operator', e.target.value)}>
            {operators.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <input value={r.value} onChange={e => updateRule(r.id, 'value', e.target.value)} placeholder="value" />
          <button className="remove-rule" onClick={() => removeRule(r.id)}>\u2715</button>
        </div>
      ))}
      <button className="add-rule-btn" onClick={addRule}>+ Add Rule</button>
      <div className="output-box">WHERE {summary || '...'}</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.meter-container {
  max-width: 450px;
  margin: 0 auto;
  padding: 24px;
}

h2 {
  color: #e2e8f0;
  margin: 0 0 20px 0;
  font-size: 18px;
}

.meter-card {
  background: #1e293b;
  border-radius: 12px;
  border: 1px solid #334155;
  padding: 24px;
}

.meter-visual {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.meter-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
  color: #e2e8f0;
  position: relative;
}

.meter-bar-bg {
  flex: 1;
  height: 8px;
  background: #334155;
  border-radius: 4px;
  overflow: hidden;
}

.meter-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.4s ease;
}

.meter-label {
  color: #94a3b8;
  font-size: 13px;
  margin-bottom: 4px;
}

.checklist {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  cursor: pointer;
  user-select: none;
}

.checkbox {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid #334155;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  transition: all 0.2s;
  flex-shrink: 0;
}

.checkbox.checked {
  background: #3b82f6;
  border-color: #3b82f6;
}

.check-text {
  color: #e2e8f0;
  font-size: 14px;
}

.check-text.done {
  color: #64748b;
  text-decoration: line-through;
}`,
      js: `const { useState } = React;

const steps = [
  { id: 'name', label: 'Add your name' },
  { id: 'avatar', label: 'Upload a photo' },
  { id: 'bio', label: 'Write a short bio' },
  { id: 'email', label: 'Verify your email' },
  { id: 'prefs', label: 'Set your preferences' },
];

function App() {
  const [completed, setCompleted] = useState(['name']);

  const toggle = (id) => setCompleted(prev =>
    prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);

  const pct = Math.round((completed.length / steps.length) * 100);
  const color = pct < 40 ? '#ef4444' : pct < 70 ? '#f59e0b' : '#22c55e';

  return (
    <div className="meter-container">
      <h2>Completeness Meter</h2>
      <div className="meter-card">
        <div className="meter-visual">
          <div className="meter-circle" style={{ border: \\\`4px solid \\\${color}\\\` }}>
            {pct}%
          </div>
          <div style={{ flex: 1 }}>
            <div className="meter-label">Profile completion</div>
            <div className="meter-bar-bg">
              <div className="meter-bar-fill" style={{ width: \\\`\\\${pct}%\\\`, background: color }} />
            </div>
          </div>
        </div>
        <div className="checklist">
          {steps.map(s => (
            <div key={s.id} className="check-item" onClick={() => toggle(s.id)}>
              <div className={\\\`checkbox \\\${completed.includes(s.id) ? 'checked' : ''}\\\`}>
                {completed.includes(s.id) ? '\u2713' : ''}
              </div>
              <span className={\\\`check-text \\\${completed.includes(s.id) ? 'done' : ''}\\\`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.fav-container {
  max-width: 450px;
  margin: 0 auto;
  padding: 24px;
}

h2 {
  color: #e2e8f0;
  margin: 0 0 16px 0;
  font-size: 18px;
}

.fav-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
}

.fav-tabs button {
  padding: 6px 14px;
  background: #1e293b;
  color: #94a3b8;
  border: 1px solid #334155;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.fav-tabs button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.fav-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
}

.fav-icon {
  font-size: 24px;
}

.fav-info {
  flex: 1;
}

.fav-name {
  color: #e2e8f0;
  font-size: 14px;
}

.fav-desc {
  color: #64748b;
  font-size: 12px;
}

.fav-star {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  transition: transform 0.2s;
}

.fav-star:hover {
  transform: scale(1.2);
}

.empty-msg {
  color: #64748b;
  text-align: center;
  padding: 32px;
  font-size: 14px;
}`,
      js: `const { useState } = React;

const allItems = [
  { id: 1, name: 'Dashboard', desc: 'Main overview', icon: '\uD83D\uDCCA' },
  { id: 2, name: 'Settings', desc: 'App configuration', icon: '\u2699\uFE0F' },
  { id: 3, name: 'Profile', desc: 'Your account', icon: '\uD83D\uDC64' },
  { id: 4, name: 'Reports', desc: 'Analytics data', icon: '\uD83D\uDCC8' },
  { id: 5, name: 'Messages', desc: 'Inbox and chats', icon: '\uD83D\uDCE8' },
  { id: 6, name: 'Calendar', desc: 'Schedule view', icon: '\uD83D\uDCC5' },
];

function App() {
  const [favorites, setFavorites] = useState([1, 4]);
  const [tab, setTab] = useState('all');

  const toggleFav = (id) => setFavorites(prev =>
    prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  const items = tab === 'all' ? allItems : allItems.filter(it => favorites.includes(it.id));

  return (
    <div className="fav-container">
      <h2>Favorites</h2>
      <div className="fav-tabs">
        <button className={tab === 'all' ? 'active' : ''} onClick={() => setTab('all')}>All</button>
        <button className={tab === 'favorites' ? 'active' : ''} onClick={() => setTab('favorites')}>
          Favorites ({favorites.length})
        </button>
      </div>
      <div className="fav-list">
        {items.length === 0 && <div className="empty-msg">No favorites yet. Star items to add them.</div>}
        {items.map(it => (
          <div key={it.id} className="fav-item">
            <span className="fav-icon">{it.icon}</span>
            <div className="fav-info">
              <div className="fav-name">{it.name}</div>
              <div className="fav-desc">{it.desc}</div>
            </div>
            <button className="fav-star" onClick={() => toggleFav(it.id)}>
              {favorites.includes(it.id) ? '\u2B50' : '\u2606'}
            </button>
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
    id: 'react-tagging',
    title: 'Tagging',
    category: 'advanced',
    difficulty: 'intermediate',
    description: 'Tag management interfaces',
    concepts: ['state management', 'autocomplete', 'data management', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/tagging',
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.tagging-container {
  max-width: 450px;
  margin: 0 auto;
  padding: 24px;
}

h2 {
  color: #e2e8f0;
  margin: 0 0 16px 0;
  font-size: 18px;
}

.tag-input-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  min-height: 44px;
  align-items: center;
  cursor: text;
}

.tag-input-wrapper:focus-within {
  border-color: #3b82f6;
}

.tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  border-radius: 4px;
  font-size: 13px;
}

.tag button {
  background: none;
  border: none;
  color: #60a5fa;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  line-height: 1;
}

.tag-input {
  flex: 1;
  min-width: 80px;
  padding: 4px 0;
  background: transparent;
  border: none;
  color: #e2e8f0;
  font-size: 14px;
  outline: none;
}

.suggestions {
  margin-top: 4px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
}

.suggestion {
  padding: 8px 12px;
  color: #e2e8f0;
  font-size: 13px;
  cursor: pointer;
}

.suggestion:hover {
  background: #334155;
}

.tag-hint {
  color: #64748b;
  font-size: 12px;
  margin-top: 8px;
}

.tag-count {
  color: #94a3b8;
  font-size: 13px;
  margin-top: 8px;
}`,
      js: `const { useState, useRef } = React;

const allSuggestions = ['react', 'javascript', 'typescript', 'css', 'html', 'nodejs', 'python', 'design', 'ux', 'api'];

function App() {
  const [tags, setTags] = useState(['react', 'javascript']);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const addTag = (tag) => {
    const t = tag.toLowerCase().trim();
    if (t && !tags.includes(t)) {
      setTags(prev => [...prev, t]);
    }
    setInput('');
  };

  const removeTag = (tag) => setTags(prev => prev.filter(t => t !== tag));

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) { e.preventDefault(); addTag(input); }
    if (e.key === 'Backspace' && !input && tags.length) { removeTag(tags[tags.length - 1]); }
  };

  const suggestions = input.length > 0
    ? allSuggestions.filter(s => s.startsWith(input.toLowerCase()) && !tags.includes(s))
    : [];

  return (
    <div className="tagging-container">
      <h2>Tagging</h2>
      <div className="tag-input-wrapper" onClick={() => inputRef.current?.focus()}>
        {tags.map(t => (
          <span key={t} className="tag">{t}<button onClick={() => removeTag(t)}>\u2715</button></span>
        ))}
        <input
          ref={inputRef}
          className="tag-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? 'Add tags...' : ''}
        />
      </div>
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map(s => (
            <div key={s} className="suggestion" onClick={() => addTag(s)}>{s}</div>
          ))}
        </div>
      )}
      <div className="tag-hint">Press Enter to add, Backspace to remove last</div>
      <div className="tag-count">{tags.length} tag{tags.length !== 1 ? 's' : ''}</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.cat-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
}

h2 {
  color: #e2e8f0;
  margin: 0 0 16px 0;
  font-size: 18px;
}

.cat-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.cat-chip {
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid #334155;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.cat-chip.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.cat-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
}

.cat-icon {
  font-size: 24px;
}

.cat-item-info {
  flex: 1;
}

.cat-item-name {
  color: #e2e8f0;
  font-size: 14px;
}

.cat-item-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  margin-top: 4px;
}

.tag-work { background: rgba(59,130,246,0.2); color: #60a5fa; }
.tag-personal { background: rgba(168,85,247,0.2); color: #c084fc; }
.tag-health { background: rgba(34,197,94,0.2); color: #4ade80; }
.tag-finance { background: rgba(245,158,11,0.2); color: #fbbf24; }

.count {
  color: #64748b;
  font-size: 13px;
  margin-top: 8px;
}`,
      js: `const { useState } = React;

const items = [
  { id: 1, name: 'Quarterly Review', icon: '\uD83D\uDCCA', category: 'work' },
  { id: 2, name: 'Grocery Shopping', icon: '\uD83D\uDED2', category: 'personal' },
  { id: 3, name: 'Morning Run', icon: '\uD83C\uDFC3', category: 'health' },
  { id: 4, name: 'Tax Filing', icon: '\uD83D\uDCB0', category: 'finance' },
  { id: 5, name: 'Team Standup', icon: '\uD83D\uDCAC', category: 'work' },
  { id: 6, name: 'Dentist Appt', icon: '\uD83E\uDE7A', category: 'health' },
  { id: 7, name: 'Book Club', icon: '\uD83D\uDCDA', category: 'personal' },
  { id: 8, name: 'Budget Review', icon: '\uD83D\uDCC8', category: 'finance' },
];

const categories = ['all', 'work', 'personal', 'health', 'finance'];

function App() {
  const [active, setActive] = useState('all');

  const filtered = active === 'all' ? items : items.filter(it => it.category === active);

  return (
    <div className="cat-container">
      <h2>Categorization</h2>
      <div className="cat-filters">
        {categories.map(c => (
          <button key={c} className={\\\`cat-chip \\\${active === c ? 'active' : ''}\\\`} onClick={() => setActive(c)}>
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>
      <div className="cat-items">
        {filtered.map(it => (
          <div key={it.id} className="cat-item">
            <span className="cat-icon">{it.icon}</span>
            <div className="cat-item-info">
              <div className="cat-item-name">{it.name}</div>
              <span className={\\\`cat-item-tag tag-\\\${it.category}\\\`}>{it.category}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="count">Showing {filtered.length} of {items.length} items</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.settings-container {
  max-width: 450px;
  margin: 0 auto;
  padding: 24px;
}

h2 {
  color: #e2e8f0;
  margin: 0 0 20px 0;
  font-size: 18px;
}

.settings-section {
  background: #1e293b;
  border-radius: 12px;
  border: 1px solid #334155;
  padding: 16px;
  margin-bottom: 12px;
}

.section-title {
  color: #94a3b8;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
}

.setting-row + .setting-row {
  border-top: 1px solid #334155;
}

.setting-label {
  color: #e2e8f0;
  font-size: 14px;
}

.setting-desc {
  color: #64748b;
  font-size: 12px;
}

.toggle {
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: #334155;
  position: relative;
  cursor: pointer;
  transition: background 0.3s;
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
  transition: transform 0.3s;
}

.toggle.on .toggle-knob {
  transform: translateX(20px);
}

.select-input {
  padding: 6px 10px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #e2e8f0;
  font-size: 13px;
  outline: none;
}

.save-bar {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}

.save-bar button {
  padding: 8px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 13px;
}

.btn-save {
  background: #3b82f6;
  color: white;
}

.btn-cancel {
  background: #334155;
  color: #e2e8f0;
}

.saved-msg {
  color: #22c55e;
  font-size: 13px;
  text-align: right;
  margin-top: 8px;
}`,
      js: `const { useState } = React;

const defaults = { darkMode: true, emailNotif: true, smsNotif: false, language: 'en', fontSize: 'medium' };

function App() {
  const [settings, setSettings] = useState({ ...defaults });
  const [saved, setSaved] = useState(false);

  const toggle = (key) => { setSettings(prev => ({ ...prev, [key]: !prev[key] })); setSaved(false); };
  const change = (key, val) => { setSettings(prev => ({ ...prev, [key]: val })); setSaved(false); };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="settings-section">
        <div className="section-title">Appearance</div>
        <div className="setting-row">
          <div><div className="setting-label">Dark Mode</div><div className="setting-desc">Use dark theme</div></div>
          <div className={\\\`toggle \\\${settings.darkMode ? 'on' : ''}\\\`} onClick={() => toggle('darkMode')}><div className="toggle-knob" /></div>
        </div>
        <div className="setting-row">
          <div className="setting-label">Font Size</div>
          <select className="select-input" value={settings.fontSize} onChange={e => change('fontSize', e.target.value)}>
            <option value="small">Small</option><option value="medium">Medium</option><option value="large">Large</option>
          </select>
        </div>
      </div>
      <div className="settings-section">
        <div className="section-title">Notifications</div>
        <div className="setting-row">
          <div><div className="setting-label">Email</div><div className="setting-desc">Receive email alerts</div></div>
          <div className={\\\`toggle \\\${settings.emailNotif ? 'on' : ''}\\\`} onClick={() => toggle('emailNotif')}><div className="toggle-knob" /></div>
        </div>
        <div className="setting-row">
          <div><div className="setting-label">SMS</div><div className="setting-desc">Receive text alerts</div></div>
          <div className={\\\`toggle \\\${settings.smsNotif ? 'on' : ''}\\\`} onClick={() => toggle('smsNotif')}><div className="toggle-knob" /></div>
        </div>
      </div>
      <div className="settings-section">
        <div className="section-title">Language</div>
        <div className="setting-row">
          <div className="setting-label">Language</div>
          <select className="select-input" value={settings.language} onChange={e => change('language', e.target.value)}>
            <option value="en">English</option><option value="es">Spanish</option><option value="fr">French</option>
          </select>
        </div>
      </div>
      <div className="save-bar">
        <button className="btn-cancel" onClick={() => { setSettings({ ...defaults }); setSaved(false); }}>Reset</button>
        <button className="btn-save" onClick={() => setSaved(true)}>Save</button>
      </div>
      {saved && <div className="saved-msg">Settings saved!</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.archive-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
}

h2 {
  color: #e2e8f0;
  margin: 0 0 16px 0;
  font-size: 18px;
}

.tab-bar {
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
}

.tab-bar button {
  padding: 8px 16px;
  background: #1e293b;
  color: #94a3b8;
  border: 1px solid #334155;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.tab-bar button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.item-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
}

.item-card.archived {
  opacity: 0.6;
}

.item-info {
  flex: 1;
}

.item-title {
  color: #e2e8f0;
  font-size: 14px;
}

.item-date {
  color: #64748b;
  font-size: 12px;
  margin-top: 2px;
}

.archive-btn {
  padding: 6px 12px;
  border: 1px solid #334155;
  border-radius: 6px;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  font-size: 12px;
}

.archive-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.empty {
  text-align: center;
  color: #64748b;
  padding: 32px;
  font-size: 14px;
}`,
      js: `const { useState } = React;

const initial = [
  { id: 1, title: 'Project Proposal', date: 'Jan 15', archived: false },
  { id: 2, title: 'Meeting Notes', date: 'Jan 12', archived: false },
  { id: 3, title: 'Q4 Report', date: 'Dec 30', archived: true },
  { id: 4, title: 'Budget Draft', date: 'Dec 20', archived: false },
  { id: 5, title: 'Old Roadmap', date: 'Nov 10', archived: true },
];

function App() {
  const [items, setItems] = useState(initial);
  const [tab, setTab] = useState('active');

  const toggle = (id) => setItems(prev =>
    prev.map(it => it.id === id ? { ...it, archived: !it.archived } : it));

  const shown = items.filter(it => tab === 'active' ? !it.archived : it.archived);

  return (
    <div className="archive-container">
      <h2>Archive</h2>
      <div className="tab-bar">
        <button className={tab === 'active' ? 'active' : ''} onClick={() => setTab('active')}>
          Active ({items.filter(i => !i.archived).length})
        </button>
        <button className={tab === 'archived' ? 'active' : ''} onClick={() => setTab('archived')}>
          Archived ({items.filter(i => i.archived).length})
        </button>
      </div>
      <div className="item-list">
        {shown.length === 0 && <div className="empty">No items here</div>}
        {shown.map(it => (
          <div key={it.id} className={\\\`item-card \\\${it.archived ? 'archived' : ''}\\\`}>
            <div className="item-info">
              <div className="item-title">{it.title}</div>
              <div className="item-date">{it.date}</div>
            </div>
            <button className="archive-btn" onClick={() => toggle(it.id)}>
              {it.archived ? 'Restore' : 'Archive'}
            </button>
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
    id: 'react-notifications',
    title: 'Notifications',
    category: 'advanced',
    difficulty: 'intermediate',
    description: 'Toast and alert systems',
    concepts: ['portal rendering', 'animations', 'state management', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/notifications',
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.notif-container {
  max-width: 450px;
  margin: 0 auto;
  padding: 24px;
}

h2 {
  color: #e2e8f0;
  margin: 0 0 16px 0;
  font-size: 18px;
}

.notif-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.notif-buttons button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  color: white;
}

.btn-info { background: #3b82f6; }
.btn-success { background: #22c55e; }
.btn-warning { background: #f59e0b; }
.btn-error { background: #ef4444; }

.toast-stack {
  position: fixed;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 100;
}

.toast {
  padding: 12px 16px;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 250px;
  animation: slideIn 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.toast.info { background: #1e40af; }
.toast.success { background: #166534; }
.toast.warning { background: #92400e; }
.toast.error { background: #991b1b; }

.toast-close {
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
}`,
      js: `const { useState, useEffect, useRef } = React;

let idCounter = 0;

function App() {
  const [toasts, setToasts] = useState([]);

  const addToast = (type, message) => {
    const id = ++idCounter;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  const icons = { info: '\u2139\uFE0F', success: '\u2705', warning: '\u26A0\uFE0F', error: '\u274C' };

  return (
    <div className="notif-container">
      <h2>Notifications</h2>
      <div className="notif-buttons">
        <button className="btn-info" onClick={() => addToast('info', 'New update available')}>Info</button>
        <button className="btn-success" onClick={() => addToast('success', 'Changes saved!')}>Success</button>
        <button className="btn-warning" onClick={() => addToast('warning', 'Storage almost full')}>Warning</button>
        <button className="btn-error" onClick={() => addToast('error', 'Connection lost')}>Error</button>
      </div>
      <div className="toast-stack">
        {toasts.map(t => (
          <div key={t.id} className={\\\`toast \\\${t.type}\\\`}>
            <span>{icons[t.type]}</span>
            <span>{t.message}</span>
            <button className="toast-close" onClick={() => removeToast(t.id)}>\u2715</button>
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
    id: 'react-captcha',
    title: 'CAPTCHA',
    category: 'advanced',
    difficulty: 'intermediate',
    description: 'Human verification',
    concepts: ['security', 'validation', 'accessibility', 'user experience'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/captcha',
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.captcha-container {
  max-width: 380px;
  margin: 0 auto;
  padding: 24px;
}

h2 {
  color: #e2e8f0;
  margin: 0 0 20px 0;
  font-size: 18px;
}

.captcha-card {
  background: #1e293b;
  border-radius: 12px;
  border: 1px solid #334155;
  padding: 24px;
  text-align: center;
}

.math-problem {
  font-size: 32px;
  color: #e2e8f0;
  margin: 16px 0;
  font-family: monospace;
  letter-spacing: 4px;
  background: #0f172a;
  padding: 16px;
  border-radius: 8px;
  user-select: none;
}

.captcha-input {
  width: 120px;
  padding: 10px;
  text-align: center;
  font-size: 18px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #e2e8f0;
  outline: none;
}

.captcha-input:focus {
  border-color: #3b82f6;
}

.captcha-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
}

.captcha-actions button {
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.verify-btn {
  background: #3b82f6;
  color: white;
}

.refresh-btn {
  background: #334155;
  color: #e2e8f0;
}

.captcha-result {
  margin-top: 12px;
  padding: 8px;
  border-radius: 6px;
  font-size: 14px;
}

.captcha-result.success {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.captcha-result.fail {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}`,
      js: `const { useState, useCallback } = React;

function genProblem() {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;
  return { a, b, answer: a + b };
}

function App() {
  const [problem, setProblem] = useState(genProblem);
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const refresh = () => { setProblem(genProblem()); setInput(''); setResult(null); };

  const verify = () => {
    if (parseInt(input, 10) === problem.answer) {
      setResult('success');
    } else {
      setResult('fail');
    }
  };

  return (
    <div className="captcha-container">
      <h2>CAPTCHA Verification</h2>
      <div className="captcha-card">
        <div style={{ color: '#94a3b8', fontSize: 13 }}>Solve to continue</div>
        <div className="math-problem">{problem.a} + {problem.b} = ?</div>
        <input
          className="captcha-input"
          value={input}
          onChange={e => { setInput(e.target.value); setResult(null); }}
          placeholder="?"
          onKeyDown={e => e.key === 'Enter' && verify()}
        />
        <div className="captcha-actions">
          <button className="refresh-btn" onClick={refresh}>\u21BB Refresh</button>
          <button className="verify-btn" onClick={verify}>Verify</button>
        </div>
        {result && (
          <div className={\\\`captcha-result \\\${result}\\\`}>
            {result === 'success' ? '\u2705 Verified! You are human.' : '\u274C Incorrect, try again.'}
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
    id: 'react-inline-help',
    title: 'Inline Help',
    category: 'advanced',
    difficulty: 'intermediate',
    description: 'Contextual assistance',
    concepts: ['tooltips', 'accessibility', 'user guidance', 'positioning'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/inline-help',
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.help-container {
  max-width: 450px;
  margin: 0 auto;
  padding: 24px;
}

h2 {
  color: #e2e8f0;
  margin: 0 0 20px 0;
  font-size: 18px;
}

.field-group {
  margin-bottom: 20px;
  position: relative;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #94a3b8;
  font-size: 13px;
  margin-bottom: 4px;
}

.help-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #334155;
  color: #94a3b8;
  font-size: 11px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}

.tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  color: #e2e8f0;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  border: 1px solid #334155;
  z-index: 10;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #334155;
}

.field-group input {
  width: 100%;
  padding: 10px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #e2e8f0;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.field-group input:focus {
  border-color: #3b82f6;
}

.inline-hint {
  color: #64748b;
  font-size: 12px;
  margin-top: 4px;
}`,
      js: `const { useState } = React;

const fields = [
  { id: 'api', label: 'API Key', tooltip: 'Found in your dashboard settings', hint: 'Starts with sk_', placeholder: 'sk_...' },
  { id: 'webhook', label: 'Webhook URL', tooltip: 'We send POST requests to this URL', hint: 'Must use HTTPS', placeholder: 'https://...' },
  { id: 'limit', label: 'Rate Limit', tooltip: 'Max requests per minute', hint: 'Default: 60', placeholder: '60' },
];

function App() {
  const [values, setValues] = useState({});
  const [activeTooltip, setActiveTooltip] = useState(null);

  return (
    <div className="help-container">
      <h2>Inline Help</h2>
      {fields.map(f => (
        <div key={f.id} className="field-group">
          <div className="field-label">
            {f.label}
            <span
              className="help-icon"
              onMouseEnter={() => setActiveTooltip(f.id)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              ?
              {activeTooltip === f.id && <span className="tooltip">{f.tooltip}</span>}
            </span>
          </div>
          <input
            placeholder={f.placeholder}
            value={values[f.id] || ''}
            onChange={e => setValues(prev => ({ ...prev, [f.id]: e.target.value }))}
          />
          <div className="inline-hint">{f.hint}</div>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.defaults-container {
  max-width: 450px;
  margin: 0 auto;
  padding: 24px;
}

h2 {
  color: #e2e8f0;
  margin: 0 0 16px 0;
  font-size: 18px;
}

.form-card {
  background: #1e293b;
  border-radius: 12px;
  border: 1px solid #334155;
  padding: 20px;
}

.field {
  margin-bottom: 16px;
}

.field label {
  display: block;
  color: #94a3b8;
  font-size: 13px;
  margin-bottom: 4px;
}

.field input, .field select {
  width: 100%;
  padding: 10px 12px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #e2e8f0;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.field input:focus, .field select:focus {
  border-color: #3b82f6;
}

.hint {
  color: #64748b;
  font-size: 12px;
  margin-top: 4px;
}

.defaults-btn {
  width: 100%;
  padding: 10px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 8px;
}

.reset-link {
  text-align: center;
  margin-top: 12px;
}

.reset-link button {
  background: none;
  border: none;
  color: #64748b;
  font-size: 13px;
  cursor: pointer;
  text-decoration: underline;
}`,
      js: `const { useState } = React;

const smartDefaults = {
  name: '',
  email: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
  language: navigator.language?.slice(0, 2) || 'en',
  theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
};

function App() {
  const [form, setForm] = useState({ ...smartDefaults });

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));
  const reset = () => setForm({ ...smartDefaults });

  return (
    <div className="defaults-container">
      <h2>Good Defaults</h2>
      <div className="form-card">
        <div className="field">
          <label>Name</label>
          <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name" />
        </div>
        <div className="field">
          <label>Email</label>
          <input value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="field">
          <label>Timezone</label>
          <input value={form.timezone} onChange={e => update('timezone', e.target.value)} />
          <div className="hint">Auto-detected from your browser</div>
        </div>
        <div className="field">
          <label>Language</label>
          <select value={form.language} onChange={e => update('language', e.target.value)}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
          <div className="hint">Defaults to your browser language</div>
        </div>
        <div className="field">
          <label>Theme</label>
          <select value={form.theme} onChange={e => update('theme', e.target.value)}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
          <div className="hint">Matches your OS preference</div>
        </div>
        <button className="defaults-btn">Save Preferences</button>
        <div className="reset-link"><button onClick={reset}>Reset to smart defaults</button></div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.upload-container {
  max-width: 450px;
  margin: 0 auto;
  padding: 24px;
}

h2 {
  color: #e2e8f0;
  margin: 0 0 16px 0;
  font-size: 18px;
}

.dropzone {
  border: 2px dashed #334155;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  background: #1e293b;
}

.dropzone.dragover {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

.dropzone-icon {
  font-size: 40px;
  margin-bottom: 8px;
}

.dropzone-text {
  color: #94a3b8;
  font-size: 14px;
}

.dropzone-text span {
  color: #3b82f6;
  text-decoration: underline;
}

.preview-list {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.preview-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
}

.preview-thumb {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: #334155;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.preview-info {
  flex: 1;
  color: #e2e8f0;
  font-size: 13px;
}

.preview-size {
  color: #64748b;
  font-size: 12px;
}

.preview-remove {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 16px;
}`,
      js: `const { useState, useRef } = React;

function App() {
  const [files, setFiles] = useState([]);
  const [dragover, setDragover] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (newFiles) => {
    const items = Array.from(newFiles).map(f => ({
      name: f.name || \\\`image_\\\${Date.now()}.png\\\`,
      size: f.size || Math.floor(Math.random() * 5000) + 500,
      id: Math.random().toString(36).slice(2),
    }));
    setFiles(prev => [...prev, ...items]);
  };

  const simulateAdd = () => {
    const names = ['photo.jpg', 'screenshot.png', 'avatar.webp', 'banner.gif'];
    addFiles([{ name: names[Math.floor(Math.random() * names.length)], size: Math.floor(Math.random() * 5000000) }]);
  };

  const removeFile = (id) => setFiles(prev => prev.filter(f => f.id !== id));

  const formatSize = (bytes) => bytes > 1000000 ? (bytes / 1000000).toFixed(1) + ' MB' : (bytes / 1000).toFixed(1) + ' KB';

  return (
    <div className="upload-container">
      <h2>Image Upload</h2>
      <div
        className={\\\`dropzone \\\${dragover ? 'dragover' : ''}\\\`}
        onClick={simulateAdd}
        onDragOver={e => { e.preventDefault(); setDragover(true); }}
        onDragLeave={() => setDragover(false)}
        onDrop={e => { e.preventDefault(); setDragover(false); simulateAdd(); }}
      >
        <div className="dropzone-icon">\u2601\uFE0F</div>
        <div className="dropzone-text">Click to upload or drag & drop<br /><span>Browse files</span></div>
      </div>
      <div className="preview-list">
        {files.map(f => (
          <div key={f.id} className="preview-item">
            <div className="preview-thumb">\uD83D\uDDBC\uFE0F</div>
            <div className="preview-info">
              {f.name}
              <div className="preview-size">{formatSize(f.size)}</div>
            </div>
            <button className="preview-remove" onClick={() => removeFile(f.id)}>\u2715</button>
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
    id: 'react-image-gallery',
    title: 'Image Gallery',
    category: 'ui-components',
    difficulty: 'intermediate',
    description: 'Advanced image displays',
    concepts: ['image loading', 'modal dialogs', 'keyboard navigation', 'accessibility'],
    framework: 'react',
    externalUrl: 'https://ui-patterns-react.vercel.app/patterns/image-gallery',
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.gallery {
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
}

h2 {
  color: #e2e8f0;
  margin: 0 0 16px 0;
  font-size: 18px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.gallery-item {
  aspect-ratio: 1;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
}

.gallery-item:hover {
  transform: scale(1.05);
  border-color: #3b82f6;
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.lightbox-content {
  text-align: center;
}

.lightbox-content .emoji {
  font-size: 120px;
}

.lightbox-content .caption {
  color: #e2e8f0;
  margin-top: 16px;
  font-size: 16px;
}

.lightbox-nav {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 16px;
}

.lightbox-nav button {
  padding: 8px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #e2e8f0;
  font-size: 24px;
  cursor: pointer;
}`,
      js: `const { useState } = React;

const images = [
  { emoji: '\uD83C\uDF05', caption: 'Sunrise' },
  { emoji: '\uD83C\uDFD4\uFE0F', caption: 'Mountain' },
  { emoji: '\uD83C\uDF0A', caption: 'Ocean' },
  { emoji: '\uD83C\uDF3B', caption: 'Sunflower' },
  { emoji: '\uD83C\uDF04', caption: 'Sunset' },
  { emoji: '\uD83C\uDF32', caption: 'Evergreen' },
];

function App() {
  const [selected, setSelected] = useState(null);

  const prev = () => setSelected(s => (s - 1 + images.length) % images.length);
  const next = () => setSelected(s => (s + 1) % images.length);

  return (
    <div className="gallery">
      <h2>Image Gallery</h2>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <div key={i} className="gallery-item" onClick={() => setSelected(i)}>
            {img.emoji}
          </div>
        ))}
      </div>
      {selected !== null && (
        <div className="lightbox" onClick={() => setSelected(null)}>
          <button className="lightbox-close">\u2715</button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <div className="emoji">{images[selected].emoji}</div>
            <div className="caption">{images[selected].caption}</div>
            <div className="lightbox-nav">
              <button onClick={prev}>\u25C0 Prev</button>
              <button onClick={next}>Next \u25B6</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.zoom-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
}

h2 {
  color: #e2e8f0;
  margin: 0 0 16px 0;
  font-size: 18px;
}

.zoom-wrapper {
  position: relative;
  width: 100%;
  height: 300px;
  background: #1e293b;
  border-radius: 12px;
  border: 1px solid #334155;
  overflow: hidden;
  cursor: zoom-in;
}

.zoom-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 120px;
  transition: transform 0.1s ease-out;
  transform-origin: center;
  user-select: none;
}

.zoom-controls {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 12px;
}

.zoom-controls button {
  padding: 8px 16px;
  background: #1e293b;
  color: #e2e8f0;
  border: 1px solid #334155;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.zoom-controls button:hover {
  border-color: #3b82f6;
}

.zoom-level {
  color: #94a3b8;
  text-align: center;
  margin-top: 8px;
  font-size: 13px;
}`,
      js: `const { useState, useRef } = React;

function App() {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef(null);

  const zoomIn = () => setScale(s => Math.min(s + 0.5, 5));
  const zoomOut = () => { setScale(s => Math.max(s - 0.5, 1)); if (scale <= 1.5) setOffset({ x: 0, y: 0 }); };
  const reset = () => { setScale(1); setOffset({ x: 0, y: 0 }); };

  const handleMouseMove = (e) => {
    if (scale <= 1) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * -50 * (scale - 1);
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -50 * (scale - 1);
    setOffset({ x, y });
  };

  return (
    <div className="zoom-container">
      <h2>Image Zoom</h2>
      <div className="zoom-wrapper" ref={wrapperRef} onMouseMove={handleMouseMove} onMouseLeave={() => { if (scale > 1) setOffset({ x: 0, y: 0 }); }}>
        <div className="zoom-image" style={{ transform: \\\`scale(\\\${scale}) translate(\\\${offset.x}px, \\\${offset.y}px)\\\` }}>
          \uD83C\uDF04
        </div>
      </div>
      <div className="zoom-controls">
        <button onClick={zoomOut}>\u2212</button>
        <button onClick={reset}>Reset</button>
        <button onClick={zoomIn}>+</button>
      </div>
      <div className="zoom-level">Zoom: {Math.round(scale * 100)}%</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.slideshow {
  max-width: 500px;
  margin: 0 auto;
  background: #1e293b;
  border-radius: 12px;
  border: 1px solid #334155;
  overflow: hidden;
}

.slide {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #e2e8f0;
  transition: opacity 0.5s ease;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 16px;
}

.controls button {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.controls button:hover {
  background: #2563eb;
}

.dots {
  display: flex;
  gap: 8px;
  justify-content: center;
  padding-bottom: 16px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #334155;
  cursor: pointer;
  transition: background 0.3s;
}

.dot.active {
  background: #3b82f6;
}

.play-btn {
  padding: 8px 16px;
  background: transparent;
  color: #94a3b8;
  border: 1px solid #334155;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}`,
      js: `const { useState, useEffect, useRef } = React;

const slides = [
  { bg: '#1e3a5f', text: 'Welcome to the App' },
  { bg: '#1e3a2f', text: 'Fast & Reliable' },
  { bg: '#3a1e3f', text: 'Built with React' },
  { bg: '#3f2a1e', text: 'Get Started Today' },
];

function App() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timer = useRef(null);

  useEffect(() => {
    if (playing) {
      timer.current = setInterval(() => {
        setCurrent(c => (c + 1) % slides.length);
      }, 2500);
    }
    return () => clearInterval(timer.current);
  }, [playing]);

  const go = (i) => { setCurrent(i); setPlaying(false); };

  return (
    <div className="slideshow">
      <div className="slide" style={{ background: slides[current].bg }}>
        {slides[current].text}
      </div>
      <div className="controls">
        <button onClick={() => go((current - 1 + slides.length) % slides.length)}>\u25C0 Prev</button>
        <button className="play-btn" onClick={() => setPlaying(!playing)}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <button onClick={() => go((current + 1) % slides.length)}>Next \u25B6</button>
      </div>
      <div className="dots">
        {slides.map((_, i) => (
          <div key={i} className={\\\`dot \\\${i === current ? 'active' : ''}\\\`} onClick={() => go(i)} />
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.morph-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.morph-btn {
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  background: #3b82f6;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.4s ease;
  min-width: 160px;
}

.morph-btn.loading {
  border-radius: 50%;
  min-width: 48px;
  width: 48px;
  height: 48px;
  padding: 0;
  font-size: 0;
  background: #3b82f6;
  border: 4px solid transparent;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
}

.morph-btn.success {
  background: #22c55e;
  border-radius: 8px;
  min-width: 160px;
  width: auto;
  height: auto;
  padding: 12px 32px;
  font-size: 16px;
  animation: none;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.toggle-row {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #e2e8f0;
}

.toggle-track {
  width: 48px;
  height: 26px;
  border-radius: 13px;
  background: #334155;
  position: relative;
  cursor: pointer;
  transition: background 0.3s;
}

.toggle-track.on {
  background: #3b82f6;
}

.toggle-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: white;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s;
}

.toggle-track.on .toggle-thumb {
  transform: translateX(22px);
}

.expand-box {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  cursor: pointer;
}

.expand-header {
  padding: 12px 16px;
  color: #e2e8f0;
  display: flex;
  justify-content: space-between;
}

.expand-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.4s ease;
  color: #94a3b8;
  padding: 0 16px;
}

.expand-body.open {
  max-height: 200px;
  padding: 0 16px 12px;
}`,
      js: `const { useState, useEffect } = React;

function App() {
  const [btnState, setBtnState] = useState('idle');
  const [toggled, setToggled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setBtnState('loading');
    setTimeout(() => setBtnState('success'), 1500);
    setTimeout(() => setBtnState('idle'), 3000);
  };

  const btnText = btnState === 'idle' ? 'Submit' : btnState === 'success' ? 'Done!' : '';

  return (
    <div className="morph-container">
      <button className={\\\`morph-btn \\\${btnState}\\\`} onClick={handleClick} disabled={btnState !== 'idle'}>
        {btnText}
      </button>

      <div className="toggle-row">
        <span>Notifications</span>
        <div className={\\\`toggle-track \\\${toggled ? 'on' : ''}\\\`} onClick={() => setToggled(!toggled)}>
          <div className="toggle-thumb" />
        </div>
        <span>{toggled ? 'On' : 'Off'}</span>
      </div>

      <div className="expand-box" onClick={() => setExpanded(!expanded)}>
        <div className="expand-header">
          <span>More Details</span>
          <span>{expanded ? '\u25B2' : '\u25BC'}</span>
        </div>
        <div className={\\\`expand-body \\\${expanded ? 'open' : ''}\\\`}>
          Controls morph between states using CSS transitions and animations for smooth UX.
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
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
    demoCode: {
      html: `<div id="root"></div>`,
      css: `.blanks-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
  background: #1e293b;
  border-radius: 12px;
  border: 1px solid #334155;
}

h2 {
  color: #e2e8f0;
  margin: 0 0 20px 0;
  font-size: 18px;
}

.sentence {
  color: #cbd5e1;
  font-size: 16px;
  line-height: 2.2;
}

.blank-input {
  width: 100px;
  padding: 4px 8px;
  border: none;
  border-bottom: 2px solid #3b82f6;
  background: transparent;
  color: #e2e8f0;
  font-size: 16px;
  outline: none;
  text-align: center;
  margin: 0 4px;
}

.blank-input:focus {
  border-bottom-color: #60a5fa;
  background: rgba(59, 130, 246, 0.1);
}

.blank-input.correct {
  border-bottom-color: #22c55e;
  color: #22c55e;
}

.blank-input.incorrect {
  border-bottom-color: #ef4444;
  color: #ef4444;
}

.check-btn {
  margin-top: 20px;
  padding: 10px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.score {
  margin-top: 12px;
  color: #94a3b8;
  font-size: 14px;
}`,
      js: `const { useState } = React;

const quiz = [
  { before: 'React uses a ', answer: 'virtual', after: ' DOM for efficient updates.' },
  { before: 'Components receive data via ', answer: 'props', after: ' from parents.' },
  { before: 'The ', answer: 'useState', after: ' hook manages local state.' },
];

function App() {
  const [answers, setAnswers] = useState(Array(quiz.length).fill(''));
  const [checked, setChecked] = useState(false);

  const handleChange = (i, val) => {
    const next = [...answers];
    next[i] = val;
    setAnswers(next);
    setChecked(false);
  };

  const score = quiz.reduce((s, q, i) =>
    s + (answers[i].toLowerCase().trim() === q.answer ? 1 : 0), 0);

  return (
    <div className="blanks-container">
      <h2>Fill in the Blanks</h2>
      {quiz.map((q, i) => {
        let cls = 'blank-input';
        if (checked) cls += answers[i].toLowerCase().trim() === q.answer ? ' correct' : ' incorrect';
        return (
          <div className="sentence" key={i}>
            {q.before}
            <input className={cls} value={answers[i]}
              onChange={e => handleChange(i, e.target.value)}
              placeholder="..." />
            {q.after}
          </div>
        );
      })}
      <button className="check-btn" onClick={() => setChecked(true)}>Check Answers</button>
      {checked && <div className="score">Score: {score}/{quiz.length}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    },
  },
];
