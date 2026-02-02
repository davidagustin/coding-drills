/**
 * Auto-generated scaffolded starter code.
 * Each starter provides the full UI structure (JSX/template with correct class names)
 * and empty function stubs. Users only implement business logic inside the function bodies.
 *
 * Generated from reference demoCode — DO NOT manually edit individual entries.
 * To regenerate, run: npx tsx scripts/generate-starters.ts
 */
export const reactStarters: Record<string, string> = {
  'react-forms': `const { useState } = React;

function SignupForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    // TODO: Implement validate
  };

  const handleChange = (field) => (e) => {
    // TODO: Handle change — update state
  };

  const handleSubmit = (e) => {
    // TODO: Handle submit — update state, prevent default, validate input
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

  'react-autocomplete': `const { useState, useRef, useEffect } = React;

const fruits = ['Apple','Apricot','Avocado','Banana','Blueberry','Cherry','Cranberry','Date','Fig','Grape','Kiwi','Lemon','Mango','Orange','Papaya','Peach','Pear','Pineapple','Plum','Raspberry','Strawberry'];

function App() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const filtered = query ? fruits.filter(f => f.toLowerCase().includes(query.toLowerCase())) : [];

  const highlight = (text) => {
    // TODO: Implement highlight
  };

  const select = (val) => {
    // TODO: Implement select
  };

  const onKey = (e) => {
    // TODO: On key — update state, filter items, remove item
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

  'react-autosave': `const { useState, useEffect, useRef, useCallback } = React;

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
    // TODO: Handle change — update state, handle timing
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

  'react-input-feedback': `const { useState } = React;

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

  'react-password-strength': `const { useState, useMemo } = React;

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

  'react-file-upload': `const { useState, useRef } = React;

function App() {
  const [files, setFiles] = useState([]);
  const [over, setOver] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (newFiles) => {
    // TODO: Add files — update state, handle timing, calculate values
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

  'react-color-picker': `const { useState } = React;

function App() {
  const [h, setH] = useState(220);
  const [s, setS] = useState(80);
  const [l, setL] = useState(55);

  const hsl = 'hsl(' + h + ',' + s + '%,' + l + '%)';

  const hslToHex = (h, s, l) => {
    // TODO: Hsl to hex — calculate values
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

  'react-calendar-picker': `const { useState } = React;

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

  const isToday = (d) => {
    // TODO: Implement isToday
  };
  const isSel = (d) => {
    // TODO: Implement isSel
  };
  const nav = (dir) => {
    // TODO: Nav — update state
  };
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

  'react-range-slider': `const { useState } = React;

function App() {
  const [price, setPrice] = useState(50);
  const [min, setMin] = useState(20);
  const [max, setMax] = useState(80);

  return (
    <div>
      <div className="slider-group">
        <div className="slider-label">Price <span>\${price}</span></div>
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

  'react-radio-checkbox': `const { useState } = React;

function App() {
  const [plan, setPlan] = useState('pro');
  const [features, setFeatures] = useState(['dark']);
  const plans = [{id:'free',label:'Free'},{id:'pro',label:'Pro'},{id:'enterprise',label:'Enterprise'}];
  const feats = [{id:'dark',label:'Dark Mode'},{id:'notif',label:'Notifications'},{id:'auto',label:'Auto-save'},{id:'2fa',label:'Two-Factor Auth'}];
  const toggleFeat = (id) => {
    // TODO: Toggle feat — update state, filter items, remove item
  };

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

  'react-structured-format': `const { useState } = React;

function App() {
  const [phone, setPhone] = useState('');
  const [card, setCard] = useState('');
  const [date, setDate] = useState('');

  const maskPhone = (v) => {
    // TODO: Implement maskPhone
  };

  const maskCard = (v) => {
    // TODO: Implement maskCard
  };

  const maskDate = (v) => {
    // TODO: Implement maskDate
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

  'react-forgiving-format': `const { useState } = React;

function App() {
  const [dateRaw, setDateRaw] = useState('');
  const [numRaw, setNumRaw] = useState('');

  const parseDate = (s) => {
    // TODO: Implement parseDate
  };

  const parseNum = (s) => {
    // TODO: Implement parseNum
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

  'react-expandable-input': `const { useState, useRef, useEffect } = React;

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

  'react-input-prompt': `const { useState } = React;

const prompts = ['Build a todo app','Create a weather dashboard','Design a chat interface','Make a recipe finder','Build a music player'];

function App() {
  const [value, setValue] = useState('');
  const match = value ? prompts.find(p => p.toLowerCase().startsWith(value.toLowerCase())) : null;

  const onKey = (e) => {
    // TODO: On key — update state, prevent default, handle keyboard events
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

  'react-inplace-editor': `const { useState, useRef, useEffect } = React;

function EditableField({ label, value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef(null);

  useEffect(() => { if (editing && ref.current) ref.current.focus(); }, [editing]);

  const save = () => {
    // TODO: Implement save
  };
  const cancel = () => {
    // TODO: Implement cancel
  };

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
  const update = (key) => (val) => {
    // TODO: Update — update state
  };

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

  'react-select-dropdown': `const { useState, useRef, useEffect } = React;

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
    // TODO: On key — update state, prevent default, handle keyboard events
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

  'react-copy-box': `const { useState } = React;

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

  'react-event-calendar': `const { useState } = React;

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
    // TODO: Add event — update state, calculate values
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

  'react-modal': `const { useState, useEffect, useRef } = React;

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

  'react-drag-drop': `const { useState } = React;

const init = {
  todo: [{ id: 1, text: 'Design mockups', tag: 'Design', color: '#a855f7' }, { id: 2, text: 'Set up CI/CD', tag: 'DevOps', color: '#22c55e' }],
  progress: [{ id: 3, text: 'Build API endpoints', tag: 'Backend', color: '#3b82f6' }],
  done: [{ id: 4, text: 'Write project brief', tag: 'Docs', color: '#eab308' }]
};

function App() {
  const [cols, setCols] = useState(init);
  const [dragging, setDragging] = useState(null);
  const [overCol, setOverCol] = useState(null);

  const onDragStart = (col, id) => {
    // TODO: On drag start — update state
  };
  const onDragOver = (e, col) => {
    // TODO: Implement onDragOver
  };
  const onDrop = (toCol) => {
    // TODO: On drop — update state, filter items, remove item
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

  'react-tables': `const { useState } = React;

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

  const toggleSort = (key) => {
    // TODO: Implement toggleSort
  };
  const toggleSel = (id) => {
    // TODO: Toggle sel — update state, filter items, remove item
  };
  const toggleAll = () => {
    // TODO: Toggle all — update state
  };
  const icon = (key) => {
    // TODO: Implement icon
  };

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

  'react-data-grid': `const { useState, useMemo } = React;

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

  const sort = (k) => {
    // TODO: Implement sort
  };

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

  'react-carousel': `const { useState, useEffect, useRef } = React;

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

  const go = (i) => {
    // TODO: Go — update state
  };

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

  'react-tabs': `const { useState } = React;

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

  'react-swipe-actions': `const { useState, useRef } = React;

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

  const onMouseDown = (e) => {
    // TODO: Implement onMouseDown
  };
  const onMouseMove = (e) => {
    // TODO: Implement onMouseMove
  };
  const onMouseUp = () => {
    // TODO: On mouse up — update state
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
  const onDelete = (id) => {
    // TODO: On delete — update state, filter items, remove item
  };
  return (
    <div>
      {items.map(item => <SwipeItem key={item.id} item={item} onDelete={onDelete} />)}
      {items.length === 0 && <div style={{textAlign:'center',color:'#64748b',padding:20}}>All cleared!</div>}
      <div className="hint">Drag items left to delete</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-long-press': `const { useState, useRef, useEffect } = React;

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
    // TODO: Start press — update state, handle timing
  };

  const endPress = () => {
    // TODO: Implement endPress
  };

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

  'react-pinch-zoom': `const { useState } = React;

const emojis = ['\\u{1F680}','\\u{2B50}','\\u{1F525}','\\u{1F48E}','\\u{1F30D}','\\u{1F308}','\\u{26A1}','\\u{1F3AF}',
  '\\u{1F4A1}','\\u{1F33F}','\\u{1F3B5}','\\u{2764}','\\u{1F680}','\\u{1F31F}','\\u{1F30A}','\\u{1F33B}'];
const colors = ['#3b82f6','#22c55e','#eab308','#ef4444','#a855f7','#ec4899','#06b6d4','#f97316'];

function App() {
  const [scale, setScale] = useState(1);

  const zoomIn = () => {
    // TODO: Zoom in — update state, calculate values
  };
  const zoomOut = () => {
    // TODO: Zoom out — update state, calculate values
  };
  const reset = () => {
    // TODO: Reset — update state
  };
  const onWheel = (e) => {
    // TODO: Implement onWheel
  };

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

  'react-pull-refresh': `const { useState, useCallback } = React;

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

  'react-drag-reorder': `const { useState } = React;

const init = ['Learn React hooks','Build a todo app','Write unit tests','Deploy to production','Set up CI/CD'];

function App() {
  const [items, setItems] = useState(init);
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);

  const onDragStart = (i) => {
    // TODO: On drag start — update state
  };
  const onDragOver = (e, i) => {
    // TODO: Implement onDragOver
  };
  const onDrop = (i) => {
    // TODO: On drop — update state, remove item
  };
  const onDragEnd = () => {
    // TODO: Implement onDragEnd
  };

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

  'react-double-tap': `const { useState, useRef } = React;

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
    // TODO: Handle click — update state, handle timing
  };

  const toggleLike = () => {
    // TODO: Toggle like — update state
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

  'react-tap-expand': `const { useState } = React;

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

  'react-progressive-disclosure': `const { useState } = React;

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

  'react-wizard': `const { useState } = React;

const stepLabels = ['Account', 'Profile', 'Confirm'];

function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ email: '', password: '', name: '', bio: '' });
  const [done, setDone] = useState(false);

  const update = (k) => (e) => {
    // TODO: Update — update state
  };

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

  'react-undo': `const { useState, useEffect, useCallback } = React;

const SIZE = 8;
const COLORS = ['#3b82f6','#22c55e','#ef4444','#eab308','#a855f7','#334155'];

function App() {
  const [color, setColor] = useState(COLORS[0]);
  const [grid, setGrid] = useState(Array(SIZE*SIZE).fill('#1e293b'));
  const [history, setHistory] = useState([Array(SIZE*SIZE).fill('#1e293b')]);
  const [histIdx, setHistIdx] = useState(0);

  const paint = (i) => {
    // TODO: Paint — update state, add item
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

  'react-wysiwyg': `const { useRef, useState } = React;

function App() {
  const editorRef = useRef(null);
  const [active, setActive] = useState({});

  const exec = (cmd, value) => {
    // TODO: Implement exec
  };

  const updateActive = () => {
    // TODO: Update active — update state
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

  'react-swipe-navigation': `const { useState } = React;

const pages = [
  { icon: '\\u{1F680}', title: 'Welcome', desc: 'Swipe or use arrows to navigate', bg: 'linear-gradient(180deg, rgba(59,130,246,0.1), transparent)' },
  { icon: '\\u{2B50}', title: 'Features', desc: 'Discover powerful tools at your fingertips', bg: 'linear-gradient(180deg, rgba(234,179,8,0.1), transparent)' },
  { icon: '\\u{1F3AF}', title: 'Get Started', desc: 'Begin your journey today', bg: 'linear-gradient(180deg, rgba(34,197,94,0.1), transparent)' },
];

function App() {
  const [idx, setIdx] = useState(0);
  const go = (i) => {
    // TODO: Go — update state, calculate values
  };

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

  'react-data-visualization': `const { useState } = React;

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

  'react-article-list': `const { useState } = React;

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

  'react-gallery': `const { useState } = React;

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

  'react-thumbnail': `const { useState } = React;

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

  'react-cards': `function App() {
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

  'react-data-filtering': `const { useState, useMemo } = React;

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

  'react-search': `const { useState, useMemo } = React;

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
    // TODO: Implement highlight
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

  'react-search-filters': `const { useState, useMemo } = React;

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

  const clear = () => {
    // TODO: Implement clear
  };
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

  'react-table-filter': `const { useState, useMemo } = React;

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

  'react-sort-column': `const { useState, useMemo } = React;

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
    // TODO: Toggle — update state
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

  'react-tag-cloud': `const { useState } = React;

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

  'react-continuous-scrolling': `const { useState, useRef, useCallback } = React;

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
    // TODO: Implement onScroll
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

  'react-dashboard': `const { useState } = React;

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

  'react-alternating-rows': `function App() {
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

  'react-formatting-data': `function App() {
  const num = 1234567.89;
  const date = new Date();
  const bytes = 1536000;

  const fmtBytes = (b) => {
    // TODO: Implement fmtBytes
  };

  const fmtRelative = (d) => {
    // TODO: Fmt relative — calculate values
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

  'react-navbar': `const { useState } = React;

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

  'react-sidebar': `const { useState } = React;

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

  'react-mobile-menu': `const { useState } = React;

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

  'react-bottom-navigation': `const { useState } = React;

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

  'react-dropdown-menu': `const { useState, useRef, useEffect } = React;

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

  'react-accordion-menu': `const { useState } = React;

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

  'react-breadcrumbs': `const { useState } = React;

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

  'react-navigation-tabs': `const { useState } = React;

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

  'react-module-tabs': `const { useState } = React;

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

  'react-pagination': `const { useState } = React;

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

  'react-horizontal-dropdown': `const { useState } = React;

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

  'react-vertical-dropdown': `const { useState } = React;

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

  'react-shortcut-dropdown': `const { useState, useEffect } = React;

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

  'react-menus': `const { useState } = React;

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

  'react-fat-footer': `const { useState } = React;

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

  'react-home-link': `const { useState } = React;

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

  'react-jumping-hierarchy': `const { useState } = React;

function App() {
  const [path, setPath] = useState(['Dashboard', 'Projects', 'Web App']);

  const navigate = (index) => {
    // TODO: Navigate — update state
  };

  const addLevel = (name) => {
    // TODO: Add level — update state
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

  'react-steps-left': `const { useState } = React;

const steps = [
  { title: 'Account Info', desc: 'Enter your basic details', placeholder: 'Your name' },
  { title: 'Contact', desc: 'How can we reach you?', placeholder: 'Email address' },
  { title: 'Preferences', desc: 'Customize your experience', placeholder: 'Favorite color' },
  { title: 'Confirm', desc: 'Review and submit', placeholder: '' },
];

function App() {
  const [current, setCurrent] = useState(0);
  const [values, setValues] = useState(Array(steps.length).fill(''));

  const next = () => {
    // TODO: Implement next
  };
  const back = () => {
    // TODO: Implement back
  };

  const remaining = steps.length - 1 - current;

  return (
    <div className="steps-container">
      <h2>Steps Left</h2>
      <div className="progress-bar">
        {steps.map((_, i) => (
          <React.Fragment key={i}>
            <div className={\\\`step-dot \\\${i < current ? 'done' : i === current ? 'active' : ''}\\\`}>
              {i < current ? '✓' : i + 1}
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

  'react-adaptable-view': `const { useState } = React;

const items = [
  { icon: '📁', name: 'Documents', meta: '24 files' },
  { icon: '🖼️', name: 'Images', meta: '136 files' },
  { icon: '🎵', name: 'Music', meta: '48 files' },
  { icon: '🎬', name: 'Videos', meta: '12 files' },
  { icon: '📦', name: 'Archives', meta: '8 files' },
  { icon: '⭐', name: 'Favorites', meta: '15 files' },
];

function App() {
  const [view, setView] = useState('grid');

  return (
    <div className="view-container">
      <div className="view-header">
        <h2>Files</h2>
        <div className="view-toggles">
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} title="Grid">▦</button>
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} title="List">☰</button>
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

  'react-preview': `const { useState } = React;

const items = [
  { icon: '📝', title: 'Blog Post', desc: 'A draft article about React hooks', full: 'This article covers useState, useEffect, and custom hooks with practical examples and best practices for production apps.', tags: ['react', 'hooks'] },
  { icon: '🖼️', title: 'Design Mockup', desc: 'Landing page wireframe v2', full: 'Updated wireframe with improved hero section, social proof, and call-to-action placement based on A/B test results.', tags: ['design', 'ui'] },
  { icon: '📄', title: 'API Docs', desc: 'REST endpoints reference', full: 'Complete documentation for all CRUD endpoints including authentication, pagination, and error handling conventions.', tags: ['api', 'docs'] },
  { icon: '📊', title: 'Analytics Report', desc: 'Q4 performance data', full: 'Quarterly metrics showing 23% growth in active users and 15% improvement in page load times after optimization.', tags: ['data', 'report'] },
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
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
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

  'react-faq': `const { useState } = React;

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
            <span className={\\\`faq-arrow \\\${openId === i ? 'open' : ''}\\\`}>▼</span>
          </div>
          <div className={\\\`faq-answer \\\${openId === i ? 'open' : ''}\\\`}>{f.a}</div>
        </div>
      ))}
      {filtered.length === 0 && <div style={{ color: '#64748b', textAlign: 'center', padding: 24 }}>No matching questions</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-keyboard-shortcuts': `const { useState, useEffect } = React;

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

  'react-rule-builder': `const { useState } = React;

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
    // TODO: Add rule — update state
  };

  const updateRule = (id, key, val) => setRules(prev =>
    prev.map(r => r.id === id ? { ...r, [key]: val } : r));

  const removeRule = (id) => {
    // TODO: Remove rule — update state, filter items, remove item
  };

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
          <button className="remove-rule" onClick={() => removeRule(r.id)}>✕</button>
        </div>
      ))}
      <button className="add-rule-btn" onClick={addRule}>+ Add Rule</button>
      <div className="output-box">WHERE {summary || '...'}</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-completeness-meter': `const { useState } = React;

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
                {completed.includes(s.id) ? '✓' : ''}
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

  'react-favorites': `const { useState } = React;

const allItems = [
  { id: 1, name: 'Dashboard', desc: 'Main overview', icon: '📊' },
  { id: 2, name: 'Settings', desc: 'App configuration', icon: '⚙️' },
  { id: 3, name: 'Profile', desc: 'Your account', icon: '👤' },
  { id: 4, name: 'Reports', desc: 'Analytics data', icon: '📈' },
  { id: 5, name: 'Messages', desc: 'Inbox and chats', icon: '📨' },
  { id: 6, name: 'Calendar', desc: 'Schedule view', icon: '📅' },
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
              {favorites.includes(it.id) ? '⭐' : '☆'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-tagging': `const { useState, useRef } = React;

const allSuggestions = ['react', 'javascript', 'typescript', 'css', 'html', 'nodejs', 'python', 'design', 'ux', 'api'];

function App() {
  const [tags, setTags] = useState(['react', 'javascript']);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const addTag = (tag) => {
    // TODO: Add tag — update state
  };

  const removeTag = (tag) => {
    // TODO: Remove tag — update state, filter items, remove item
  };

  const handleKeyDown = (e) => {
    // TODO: Handle key down — prevent default, handle keyboard events
  };

  const suggestions = input.length > 0
    ? allSuggestions.filter(s => s.startsWith(input.toLowerCase()) && !tags.includes(s))
    : [];

  return (
    <div className="tagging-container">
      <h2>Tagging</h2>
      <div className="tag-input-wrapper" onClick={() => inputRef.current?.focus()}>
        {tags.map(t => (
          <span key={t} className="tag">{t}<button onClick={() => removeTag(t)}>✕</button></span>
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

  'react-categorization': `const { useState } = React;

const items = [
  { id: 1, name: 'Quarterly Review', icon: '📊', category: 'work' },
  { id: 2, name: 'Grocery Shopping', icon: '🛒', category: 'personal' },
  { id: 3, name: 'Morning Run', icon: '🏃', category: 'health' },
  { id: 4, name: 'Tax Filing', icon: '💰', category: 'finance' },
  { id: 5, name: 'Team Standup', icon: '💬', category: 'work' },
  { id: 6, name: 'Dentist Appt', icon: '🩺', category: 'health' },
  { id: 7, name: 'Book Club', icon: '📚', category: 'personal' },
  { id: 8, name: 'Budget Review', icon: '📈', category: 'finance' },
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

  'react-settings': `const { useState } = React;

const defaults = { darkMode: true, emailNotif: true, smsNotif: false, language: 'en', fontSize: 'medium' };

function App() {
  const [settings, setSettings] = useState({ ...defaults });
  const [saved, setSaved] = useState(false);

  const toggle = (key) => {
    // TODO: Implement toggle
  };
  const change = (key, val) => {
    // TODO: Implement change
  };

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

  'react-archive': `const { useState } = React;

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

  'react-notifications': `const { useState, useEffect, useRef } = React;

let idCounter = 0;

function App() {
  const [toasts, setToasts] = useState([]);

  const addToast = (type, message) => {
    // TODO: Add toast — update state, handle timing
  };

  const removeToast = (id) => {
    // TODO: Remove toast — update state, filter items, remove item
  };

  const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌' };

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
            <button className="toast-close" onClick={() => removeToast(t.id)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-captcha': `const { useState, useCallback } = React;

function genProblem() {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;
  return { a, b, answer: a + b };
}

function App() {
  const [problem, setProblem] = useState(genProblem);
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const refresh = () => {
    // TODO: Implement refresh
  };

  const verify = () => {
    // TODO: Verify — update state
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
          <button className="refresh-btn" onClick={refresh}>↻ Refresh</button>
          <button className="verify-btn" onClick={verify}>Verify</button>
        </div>
        {result && (
          <div className={\\\`captcha-result \\\${result}\\\`}>
            {result === 'success' ? '✅ Verified! You are human.' : '❌ Incorrect, try again.'}
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-inline-help': `const { useState } = React;

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

  'react-good-defaults': `const { useState } = React;

const smartDefaults = {
  name: '',
  email: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
  language: navigator.language?.slice(0, 2) || 'en',
  theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
};

function App() {
  const [form, setForm] = useState({ ...smartDefaults });

  const update = (key, val) => {
    // TODO: Update — update state
  };
  const reset = () => {
    // TODO: Reset — update state
  };

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

  'react-image-upload': `const { useState, useRef } = React;

function App() {
  const [files, setFiles] = useState([]);
  const [dragover, setDragover] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (newFiles) => {
    // TODO: Add files — update state, calculate values
  };

  const simulateAdd = () => {
    // TODO: Simulate add — calculate values
  };

  const removeFile = (id) => {
    // TODO: Remove file — update state, filter items, remove item
  };

  const formatSize = (bytes) => {
    // TODO: Implement formatSize
  };

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
        <div className="dropzone-icon">☁️</div>
        <div className="dropzone-text">Click to upload or drag & drop<br /><span>Browse files</span></div>
      </div>
      <div className="preview-list">
        {files.map(f => (
          <div key={f.id} className="preview-item">
            <div className="preview-thumb">🖼️</div>
            <div className="preview-info">
              {f.name}
              <div className="preview-size">{formatSize(f.size)}</div>
            </div>
            <button className="preview-remove" onClick={() => removeFile(f.id)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-image-gallery': `const { useState } = React;

const images = [
  { emoji: '🌅', caption: 'Sunrise' },
  { emoji: '🏔️', caption: 'Mountain' },
  { emoji: '🌊', caption: 'Ocean' },
  { emoji: '🌻', caption: 'Sunflower' },
  { emoji: '🌄', caption: 'Sunset' },
  { emoji: '🌲', caption: 'Evergreen' },
];

function App() {
  const [selected, setSelected] = useState(null);

  const prev = () => {
    // TODO: Prev — update state
  };
  const next = () => {
    // TODO: Next — update state
  };

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
          <button className="lightbox-close">✕</button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <div className="emoji">{images[selected].emoji}</div>
            <div className="caption">{images[selected].caption}</div>
            <div className="lightbox-nav">
              <button onClick={prev}>◀ Prev</button>
              <button onClick={next}>Next ▶</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-image-zoom': `const { useState, useRef } = React;

function App() {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef(null);

  const zoomIn = () => {
    // TODO: Zoom in — update state, calculate values
  };
  const zoomOut = () => {
    // TODO: Implement zoomOut
  };
  const reset = () => {
    // TODO: Implement reset
  };

  const handleMouseMove = (e) => {
    // TODO: Handle mouse move — update state
  };

  return (
    <div className="zoom-container">
      <h2>Image Zoom</h2>
      <div className="zoom-wrapper" ref={wrapperRef} onMouseMove={handleMouseMove} onMouseLeave={() => { if (scale > 1) setOffset({ x: 0, y: 0 }); }}>
        <div className="zoom-image" style={{ transform: \\\`scale(\\\${scale}) translate(\\\${offset.x}px, \\\${offset.y}px)\\\` }}>
          🌄
        </div>
      </div>
      <div className="zoom-controls">
        <button onClick={zoomOut}>−</button>
        <button onClick={reset}>Reset</button>
        <button onClick={zoomIn}>+</button>
      </div>
      <div className="zoom-level">Zoom: {Math.round(scale * 100)}%</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-slideshow': `const { useState, useEffect, useRef } = React;

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

  const go = (i) => {
    // TODO: Implement go
  };

  return (
    <div className="slideshow">
      <div className="slide" style={{ background: slides[current].bg }}>
        {slides[current].text}
      </div>
      <div className="controls">
        <button onClick={() => go((current - 1 + slides.length) % slides.length)}>◀ Prev</button>
        <button className="play-btn" onClick={() => setPlaying(!playing)}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <button onClick={() => go((current + 1) % slides.length)}>Next ▶</button>
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

  'react-morphing-controls': `const { useState, useEffect } = React;

function App() {
  const [btnState, setBtnState] = useState('idle');
  const [toggled, setToggled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    // TODO: Handle click — update state, handle timing
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
          <span>{expanded ? '▲' : '▼'}</span>
        </div>
        <div className={\\\`expand-body \\\${expanded ? 'open' : ''}\\\`}>
          Controls morph between states using CSS transitions and animations for smooth UX.
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-fill-blanks': `const { useState } = React;

const quiz = [
  { before: 'React uses a ', answer: 'virtual', after: ' DOM for efficient updates.' },
  { before: 'Components receive data via ', answer: 'props', after: ' from parents.' },
  { before: 'The ', answer: 'useState', after: ' hook manages local state.' },
];

function App() {
  const [answers, setAnswers] = useState(Array(quiz.length).fill(''));
  const [checked, setChecked] = useState(false);

  const handleChange = (i, val) => {
    // TODO: Handle change — update state
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

  'react-rating-stars': `const { useState } = React;

function App() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  return (
    <div>
      <h3 style={{marginBottom: 12}}>Rate this item</h3>
      <div className="rating">
        {[1,2,3,4,5].map(i => (
          <button key={i} className={\`star \${i <= rating ? 'active' : ''} \${i <= hover ? 'hovered' : ''}\`}
            onClick={() => setRating(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            aria-label={\`\${i} star\`}>&#9733;</button>
        ))}
        <span className="rating-label">{labels[hover || rating] || 'Select a rating'}</span>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-tag-input': `const { useState, useRef } = React;

function App() {
  const [tags, setTags] = useState(['React', 'TypeScript']);
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const addTag = () => {
    // TODO: Add tag — update state
  };

  const removeTag = (idx) => {
    // TODO: Remove tag — update state, filter items, remove item
  };

  const onKey = (e) => {
    // TODO: On key — prevent default, handle keyboard events
  };

  return (
    <div className="tag-input-wrap">
      <label style={{fontSize:14,color:'#94a3b8',display:'block',marginBottom:6}}>Tags</label>
      <div className="tags-container" onClick={() => inputRef.current.focus()}>
        {tags.map((t, i) => (
          <span className="tag" key={i}>{t}<button onClick={() => removeTag(i)}>&times;</button></span>
        ))}
        <input ref={inputRef} className="tag-input" value={value} onChange={e => setValue(e.target.value)}
          onKeyDown={onKey} placeholder={tags.length ? '' : 'Add tags...'} />
      </div>
      <div className="hint">Press Enter to add, Backspace to remove last</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-multi-select': `const { useState, useRef, useEffect } = React;

const options = ['JavaScript', 'TypeScript', 'Python', 'Rust', 'Go', 'Java', 'C++', 'Swift'];

function App() {
  const [selected, setSelected] = useState(['JavaScript']);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = (opt) => {
    // TODO: Toggle — update state, filter items, remove item
  };

  return (
    <div className="ms-wrap" ref={ref}>
      <label style={{fontSize:14,color:'#94a3b8',display:'block',marginBottom:6}}>Languages</label>
      <button className="ms-trigger" onClick={() => setOpen(!open)}>
        <span>{selected.length ? \`\${selected.length} selected\` : 'Select...'}</span>
        <span>{open ? '\\u25B2' : '\\u25BC'}</span>
      </button>
      {open && (
        <div className="ms-dropdown">
          {options.map(opt => (
            <label className="ms-option" key={opt}>
              <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)} />
              {opt}
            </label>
          ))}
        </div>
      )}
      <div className="ms-chips">
        {selected.map(s => <span className="ms-chip" key={s}>{s}</span>)}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-otp-input': `const { useState, useRef } = React;

function App() {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const refs = useRef([]);
  const [done, setDone] = useState(false);

  const handleChange = (i, val) => {
    // TODO: Handle change — update state
  };

  const handleKey = (i, e) => {
    // TODO: Handle key — handle keyboard events
  };

  return (
    <div className="otp-wrap">
      <h3>Enter verification code</h3>
      <div className="otp-inputs">
        {otp.map((d, i) => (
          <input key={i} className="otp-box" maxLength={1} value={d}
            ref={el => refs.current[i] = el}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKey(i, e)} />
        ))}
      </div>
      {done ? <div className="otp-success">Code entered!</div> : <div className="otp-msg">We sent a 6-digit code to your email</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-credit-card-input': `const { useState } = React;

function App() {
  const [card, setCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const formatCard = (v) => {
    // TODO: Implement formatCard
  };
  const formatExpiry = (v) => {
    // TODO: Implement formatExpiry
  };
  const getType = (n) => {
    // TODO: Implement getType
  };

  return (
    <div className="card-form">
      <h3 style={{marginBottom: 16, color: '#4fc3f7'}}>Payment Details</h3>
      <div className="field">
        <label>Card Number</label>
        <input value={card} onChange={e => setCard(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" />
        {getType(card) && <div className="card-type">{getType(card)}</div>}
      </div>
      <div className="row">
        <div className="field">
          <label>Expiry</label>
          <input value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" />
        </div>
        <div className="field">
          <label>CVC</label>
          <input value={cvc} onChange={e => setCvc(e.target.value.replace(/\\D/g, '').slice(0, 4))} placeholder="123" />
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-address-form': `const { useState } = React;

function App() {
  const [f, setF] = useState({ street: '', city: '', state: '', zip: '', country: 'US' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const upd = (k) => (e) => {
    // TODO: Implement upd
  };

  const submit = (e) => {
    // TODO: Submit — update state, prevent default
  };

  if (submitted) return <div className="addr-form"><div className="done">Address saved!</div></div>;

  return (
    <form className="addr-form" onSubmit={submit}>
      <h3 style={{marginBottom: 16}}>Shipping Address</h3>
      <div className="fg"><label>Country</label><select value={f.country} onChange={upd('country')}><option value="US">United States</option><option value="CA">Canada</option><option value="UK">United Kingdom</option></select></div>
      <div className="fg"><label>Street</label><input value={f.street} onChange={upd('street')} placeholder="123 Main St" />{errors.street && <div className="err">{errors.street}</div>}</div>
      <div className="row2">
        <div className="fg"><label>City</label><input value={f.city} onChange={upd('city')} />{errors.city && <div className="err">{errors.city}</div>}</div>
        <div className="fg"><label>{f.country === 'UK' ? 'Postcode' : 'State'}</label><input value={f.state} onChange={upd('state')} /></div>
      </div>
      <div className="fg"><label>{f.country === 'UK' ? 'Postcode' : 'ZIP Code'}</label><input value={f.zip} onChange={upd('zip')} />{errors.zip && <div className="err">{errors.zip}</div>}</div>
      <button className="btn" type="submit">Save Address</button>
    </form>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-survey-form': `const { useState } = React;

const questions = [
  { q: 'How often do you code?', opts: ['Daily', 'Weekly', 'Monthly', 'Rarely'] },
  { q: 'Preferred language?', opts: ['JavaScript', 'Python', 'Rust', 'Go', 'Other'] },
  { q: 'Experience level?', opts: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
];

function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const done = step >= questions.length;
  const progress = ((done ? questions.length : step) / questions.length) * 100;

  const select = (val) => {
    // TODO: Select — update state
  };

  return (
    <div className="survey">
      <div className="progress-bar"><div className="progress-fill" style={{width: progress + '%'}} /></div>
      {done ? (
        <div>
          <h3>Survey Complete!</h3>
          <div className="summary">{questions.map((q, i) => <p key={i}><strong>{q.q}</strong><br/>{answers[i]}</p>)}</div>
        </div>
      ) : (
        <div className="question">
          <h4>Q{step+1}/{questions.length}: {questions[step].q}</h4>
          {questions[step].opts.map(o => (
            <div key={o} className={\`opt \${answers[step] === o ? 'selected' : ''}\`} onClick={() => select(o)}>{o}</div>
          ))}
          <div className="nav-btns">
            {step > 0 && <button className="prev" onClick={() => setStep(step-1)}>Back</button>}
            <button className="next" disabled={!answers[step]} onClick={() => setStep(step+1)}>{step === questions.length - 1 ? 'Submit' : 'Next'}</button>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-textarea-autogrow': `const { useState, useRef, useCallback } = React;

function App() {
  const [value, setValue] = useState('');
  const ref = useRef(null);

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
    const ta = ref.current;
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  }, []);

  return (
    <div className="autogrow-wrap">
      <label>Write your message</label>
      <textarea ref={ref} value={value} onChange={handleChange} placeholder="Start typing... the textarea will grow automatically." rows={1} />
      <div className="char-count">{value.length} characters</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-phone-input': `const { useState } = React;

const codes = [{ code: '+1', flag: 'US' }, { code: '+44', flag: 'UK' }, { code: '+91', flag: 'IN' }, { code: '+81', flag: 'JP' }, { code: '+49', flag: 'DE' }];

function formatPhone(v) {
  const d = v.replace(/\\D/g, '').slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return '(' + d.slice(0,3) + ') ' + d.slice(3);
  return '(' + d.slice(0,3) + ') ' + d.slice(3,6) + '-' + d.slice(6);
}

function App() {
  const [country, setCountry] = useState('+1');
  const [phone, setPhone] = useState('');

  return (
    <div className="phone-wrap">
      <label>Phone Number</label>
      <div className="phone-row">
        <select value={country} onChange={e => setCountry(e.target.value)}>
          {codes.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
        </select>
        <input value={phone} onChange={e => setPhone(formatPhone(e.target.value))} placeholder="(555) 123-4567" />
      </div>
      {phone && <div className="phone-display">Full: {country} {phone}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-currency-input': `const { useState } = React;

function App() {
  const [raw, setRaw] = useState('');

  const handleChange = (e) => {
    // TODO: Handle change — update state
  };

  const formatted = raw ? Number(raw).toLocaleString('en-US') : '';

  return (
    <div className="currency-wrap">
      <label>Amount</label>
      <div className="currency-row">
        <span className="currency-symbol">$</span>
        <input value={formatted} onChange={handleChange} placeholder="0" />
      </div>
      <div className="currency-hint">{raw ? 'Value: $' + formatted + '.00' : 'Enter an amount'}</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-slider-range': `const { useState } = React;

function App() {
  const [min, setMin] = useState(20);
  const [max, setMax] = useState(80);
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);

  return (
    <div className="slider-wrap">
      <label>Price Range: \${lo} - \${hi}</label>
      <div className="range-container">
        <div className="track" />
        <div className="track-fill" style={{left: lo + '%', width: (hi - lo) + '%'}} />
        <input type="range" min={0} max={100} value={min} onChange={e => setMin(+e.target.value)} />
        <input type="range" min={0} max={100} value={max} onChange={e => setMax(+e.target.value)} />
      </div>
      <div className="vals"><span>\${lo}</span><span>\${hi}</span></div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-toggle-group': `const { useState } = React;

const items = ['React', 'Vue', 'Angular', 'Svelte', 'Solid', 'Preact', 'Lit', 'Qwik'];

function App() {
  const [selected, setSelected] = useState(new Set(['React']));

  const toggle = (item) => {
    // TODO: Toggle — update state
  };

  return (
    <div className="tg-wrap">
      <h3>Select frameworks</h3>
      <div className="tg-group">
        {items.map(item => (
          <button key={item} className={\`tg-btn \${selected.has(item) ? 'active' : ''}\`}
            onClick={() => toggle(item)}>{item}</button>
        ))}
      </div>
      <div className="tg-result">Selected: {[...selected].join(', ') || 'None'}</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-segmented-control': `const { useState, useRef, useEffect } = React;

const tabs = ['Daily', 'Weekly', 'Monthly'];

function App() {
  const [active, setActive] = useState(0);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const btnsRef = useRef([]);

  useEffect(() => {
    const btn = btnsRef.current[active];
    if (btn) setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [active]);

  return (
    <div className="seg-wrap">
      <div className="seg-control">
        <div className="seg-indicator" style={{ left: indicator.left, width: indicator.width }} />
        {tabs.map((t, i) => (
          <button key={t} ref={el => btnsRef.current[i] = el}
            className={\`seg-btn \${i === active ? 'active' : ''}\`}
            onClick={() => setActive(i)}>{t}</button>
        ))}
      </div>
      <div className="seg-content">Showing <strong>{tabs[active]}</strong> data view</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-combobox': `const { useState, useRef, useEffect } = React;

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon', 'Mango', 'Orange', 'Papaya'];

function App() {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState(-1);
  const ref = useRef(null);
  const filtered = items.filter(i => i.toLowerCase().includes(value.toLowerCase()));

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const onKey = (e) => {
    // TODO: On key — update state, filter items, remove item
  };

  return (
    <div className="cb-wrap" ref={ref}>
      <label>Choose a fruit</label>
      <input className="cb-input" value={value}
        onChange={e => { setValue(e.target.value); setOpen(true); setFocusIdx(-1); }}
        onFocus={() => setOpen(true)} onKeyDown={onKey} placeholder="Type to search..." />
      {open && (
        <div className="cb-list">
          {filtered.length ? filtered.map((item, i) => (
            <div key={item} className={\`cb-item \${i === focusIdx ? 'focused' : ''}\`}
              onClick={() => { setValue(item); setOpen(false); }}>{item}</div>
          )) : <div className="cb-empty">No results</div>}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-mentions-input': `const { useState } = React;

const users = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'];

function App() {
  const [text, setText] = useState('');
  const [mentioning, setMentioning] = useState(null);

  const onChange = (e) => {
    // TODO: On change — update state
  };

  const insertMention = (name) => {
    // TODO: Insert mention — update state
  };

  const filtered = mentioning !== null ? users.filter(u => u.toLowerCase().startsWith(mentioning.toLowerCase())) : [];

  return (
    <div className="mention-wrap">
      <label style={{display:'block',fontSize:14,color:'#94a3b8',marginBottom:6}}>Post a comment (type @ to mention)</label>
      <textarea value={text} onChange={onChange} placeholder="Write something... use @ to mention people" />
      {filtered.length > 0 && (
        <div className="mention-popup" style={{bottom: 'calc(100% - 70px)'}}>
          {filtered.map(u => (
            <div key={u} className="mention-item" onClick={() => insertMention(u)}>
              <span className="mention-avatar">{u[0]}</span>{u}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-code-input': `const { useState } = React;

function App() {
  const [code, setCode] = useState('function hello() {\\n  console.log("Hello!");\\n}');
  const lines = code.split('\\n');

  const onKey = (e) => {
    // TODO: On key — update state, prevent default, handle keyboard events
  };

  return (
    <div className="code-wrap">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <span style={{fontSize:14,color:'#94a3b8'}}>Code Editor</span>
        <span style={{fontSize:12,color:'#4fc3f7'}}>JavaScript</span>
      </div>
      <div className="code-editor">
        <div className="line-nums">{lines.map((_, i) => <div key={i}>{i + 1}</div>)}</div>
        <textarea value={code} onChange={e => setCode(e.target.value)} onKeyDown={onKey} spellCheck={false} />
      </div>
      <div className="code-info"><span>{lines.length} lines</span><span>{code.length} chars</span></div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-signature-pad': `const { useRef, useEffect, useState, useCallback } = React;

function App() {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    c.width = 396;
    c.height = 160;
    const ctx = c.getContext('2d');
    ctx.strokeStyle = '#4fc3f7';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
  }, []);

  const getPos = (e) => {
    // TODO: Implement getPos
  };

  const start = useCallback((e) => {
    e.preventDefault();
    drawing.current = true;
    const ctx = canvasRef.current.getContext('2d');
    const p = getPos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }, []);

  const move = useCallback((e) => {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    const p = getPos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }, []);

  const stop = useCallback(() => { drawing.current = false; }, []);

  const clear = () => {
    // TODO: Clear — update state
  };

  const save = () => {
    // TODO: Implement save
  };

  return (
    <div className="sig-wrap">
      <h3>Sign Below</h3>
      <canvas ref={canvasRef}
        onMouseDown={start} onMouseMove={move} onMouseUp={stop} onMouseLeave={stop}
        onTouchStart={start} onTouchMove={move} onTouchEnd={stop} />
      <div className="sig-btns">
        <button className="sig-clear" onClick={clear}>Clear</button>
        <button className="sig-save" onClick={save}>Save Signature</button>
      </div>
      <div className="sig-hint">{saved ? 'Signature saved!' : 'Draw your signature above'}</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-tooltip': `const { useState } = React;

function Tooltip({ text, children }) {
  return (
    <span className="tip-wrap">
      {children}
      <span className="tooltip">{text}</span>
    </span>
  );
}

function App() {
  return (
    <div className="demo">
      <Tooltip text="Save your work"><button className="tip-trigger">Save</button></Tooltip>
      <Tooltip text="Edit this item"><button className="tip-trigger">Edit</button></Tooltip>
      <Tooltip text="Delete permanently"><button className="tip-trigger">Delete</button></Tooltip>
      <Tooltip text="Share with others"><button className="tip-trigger">Share</button></Tooltip>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-popover': `const { useState, useRef, useEffect } = React;

function Popover({ trigger, title, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="pop-wrap" ref={ref}>
      <button className="pop-trigger" onClick={() => setOpen(!open)}>{trigger}</button>
      {open && (
        <div className="popover">
          <h4>{title}</h4>
          {children}
          <button className="pop-close" onClick={() => setOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div style={{textAlign:'center'}}>
      <Popover trigger="Click me" title="Popover Title">
        <p>This is a rich popover with any content you want. It dismisses when you click outside.</p>
      </Popover>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-lightbox': `const { useState, useEffect } = React;

const images = [
  { emoji: '\\u{1F304}', label: 'Sunrise' },
  { emoji: '\\u{1F30A}', label: 'Wave' },
  { emoji: '\\u{1F3D4}', label: 'Mountain' },
  { emoji: '\\u{1F308}', label: 'Rainbow' },
  { emoji: '\\u{1F33B}', label: 'Sunflower' },
  { emoji: '\\u{1F30C}', label: 'Galaxy' },
];

function App() {
  const [idx, setIdx] = useState(null);

  useEffect(() => {
    if (idx === null) return;
    const handler = (e) => {
      if (e.key === 'Escape') setIdx(null);
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setIdx(i => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [idx]);

  return (
    <div>
      <h3 style={{marginBottom:12}}>Gallery</h3>
      <div className="grid">
        {images.map((img, i) => (
          <div key={i} className="thumb" onClick={() => setIdx(i)}>{img.emoji}</div>
        ))}
      </div>
      {idx !== null && (
        <div className="lb-overlay" onClick={() => setIdx(null)}>
          <button className="lb-close" onClick={() => setIdx(null)}>&times;</button>
          <button className="lb-nav lb-prev" onClick={e => { e.stopPropagation(); setIdx((idx - 1 + images.length) % images.length); }}>&lsaquo;</button>
          <div onClick={e => e.stopPropagation()}>
            <div className="lb-content">{images[idx].emoji}</div>
            <div className="lb-label">{images[idx].label} ({idx + 1}/{images.length})</div>
          </div>
          <button className="lb-nav lb-next" onClick={e => { e.stopPropagation(); setIdx((idx + 1) % images.length); }}>&rsaquo;</button>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-sortable-list': `const { useState, useRef } = React;

const initial = ['Learn React', 'Build a project', 'Write tests', 'Deploy app', 'Get feedback'];

function App() {
  const [items, setItems] = useState(initial);
  const dragIdx = useRef(null);
  const [overIdx, setOverIdx] = useState(null);

  const onDragStart = (i) => {
    // TODO: Implement onDragStart
  };
  const onDragOver = (e, i) => {
    // TODO: Implement onDragOver
  };
  const onDrop = (i) => {
    // TODO: On drop — update state, remove item
  };

  return (
    <div className="sort-wrap">
      <h3 style={{marginBottom:12}}>Priority List</h3>
      {items.map((item, i) => (
        <div key={item}
          className={\`sort-item \${dragIdx.current === i ? 'dragging' : ''} \${overIdx === i ? 'over' : ''}\`}
          draggable
          onDragStart={() => onDragStart(i)}
          onDragOver={(e) => onDragOver(e, i)}
          onDrop={() => onDrop(i)}
          onDragEnd={() => { dragIdx.current = null; setOverIdx(null); }}>
          <span className="drag-handle">&#x2630;</span>
          <span className="sort-idx">{i + 1}</span>
          {item}
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-resizable-panels': `const { useState, useRef, useCallback } = React;

function App() {
  const [leftWidth, setLeftWidth] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef(null);

  const onMouseDown = useCallback(() => { dragging.current = true; }, []);

  const onMouseMove = useCallback((e) => {
    if (!dragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setLeftWidth(Math.max(20, Math.min(80, pct)));
  }, []);

  const onMouseUp = useCallback(() => { dragging.current = false; }, []);

  return (
    <div>
      <h3 style={{marginBottom:12}}>Resizable Panels</h3>
      <div className="panels" ref={containerRef}
        onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
        <div className="panel panel-left" style={{width: leftWidth + '%'}}>
          <h4>Left Panel</h4>
          <p>Drag the divider to resize. This panel can be resized between 20% and 80% of the total width.</p>
        </div>
        <div className={\`divider \${dragging.current ? 'active' : ''}\`} onMouseDown={onMouseDown} />
        <div className="panel panel-right" style={{flex:1}}>
          <h4>Right Panel</h4>
          <p>This panel takes the remaining space. The divider snaps smoothly as you drag it.</p>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-split-view': `const { useState } = React;

function simpleMarkdown(text) {
  return text
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
    .replace(/\\*(.+?)\\*/g, '<em>$1</em>')
    .replace(/\`(.+?)\`/g, '<code style="background:#334155;padding:2px 4px;border-radius:3px">$1</code>')
    .replace(/\\n/g, '<br/>');
}

function App() {
  const [text, setText] = useState('# Hello World\\n\\nThis is a **split view** editor.\\n\\n## Features\\n- Real-time *preview*\\n- Simple \`markdown\` support\\n- Side by side layout');

  return (
    <div>
      <h3 style={{marginBottom:10}}>Split View Editor</h3>
      <div className="split">
        <div className="split-pane">
          <div className="pane-header">Editor</div>
          <textarea value={text} onChange={e => setText(e.target.value)} />
        </div>
        <div className="split-divider" />
        <div className="split-pane">
          <div className="pane-header">Preview</div>
          <div className="preview" dangerouslySetInnerHTML={{__html: simpleMarkdown(text)}} />
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-kanban-board': `const { useState, useRef } = React;

const init = {
  todo: ['Design UI', 'Setup DB', 'Write docs'],
  progress: ['Build API', 'Auth flow'],
  done: ['Project setup'],
};

function App() {
  const [cols, setCols] = useState(init);
  const drag = useRef(null);
  const [overCol, setOverCol] = useState(null);

  const onDragStart = (col, idx) => {
    // TODO: Implement onDragStart
  };
  const onDragOver = (e, col) => {
    // TODO: Implement onDragOver
  };
  const onDrop = (toCol) => {
    // TODO: On drop — update state, filter items, remove item
  };

  const labels = { todo: 'To Do', progress: 'In Progress', done: 'Done' };

  return (
    <div>
      <h3 style={{marginBottom:12}}>Kanban Board</h3>
      <div className="kanban">
        {Object.keys(cols).map(col => (
          <div key={col} className="column"
            onDragOver={e => onDragOver(e, col)} onDrop={() => onDrop(col)}>
            <div className="col-header">{labels[col]} <span className="col-count">{cols[col].length}</span></div>
            {cols[col].map((item, i) => (
              <div key={item + i} className={\`card \${overCol === col ? 'over' : ''}\`}
                draggable onDragStart={() => onDragStart(col, i)}>{item}</div>
            ))}
            <div className={\`col-drop \${overCol === col ? 'active' : ''}\`} />
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-timeline': `const { useState } = React;

const events = [
  { date: 'Jan 2024', title: 'Project Started', desc: 'Initial commit and project setup' },
  { date: 'Feb 2024', title: 'MVP Launched', desc: 'First version deployed to production' },
  { date: 'Apr 2024', title: 'Team Expanded', desc: 'Hired 3 new developers' },
  { date: 'Jul 2024', title: 'v2.0 Released', desc: 'Major redesign with new features' },
  { date: 'Oct 2024', title: '10K Users', desc: 'Reached ten thousand active users' },
];

function App() {
  return (
    <div>
      <h3 style={{textAlign:'center',marginBottom:16}}>Project Timeline</h3>
      <div className="timeline">
        {events.map((e, i) => (
          <div className="tl-item" key={i}>
            <div className="tl-dot" />
            <div className="tl-date">{e.date}</div>
            <div className="tl-card">
              <h4>{e.title}</h4>
              <p>{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-tree-view': `const { useState } = React;

const data = [
  { name: 'src', children: [
    { name: 'components', children: [
      { name: 'Button.tsx' }, { name: 'Modal.tsx' }, { name: 'Input.tsx' },
    ]},
    { name: 'hooks', children: [{ name: 'useAuth.ts' }, { name: 'useFetch.ts' }] },
    { name: 'App.tsx' }, { name: 'index.ts' },
  ]},
  { name: 'public', children: [{ name: 'index.html' }, { name: 'favicon.ico' }] },
  { name: 'package.json' }, { name: 'tsconfig.json' },
];

function TreeNode({ node, depth = 0 }) {
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div className={\`tree-label \${hasChildren ? '' : 'tree-leaf'}\`} onClick={() => hasChildren && setOpen(!open)} style={{paddingLeft: depth * 12}}>
        <span className="tree-icon">{hasChildren ? (open ? '\\u25BC' : '\\u25B6') : '\\u25CB'}</span>
        <span className="tree-name">{hasChildren ? '\\u{1F4C1}' : '\\u{1F4C4}'} {node.name}</span>
      </div>
      {open && hasChildren && (
        <div className="tree-node">
          {node.children.map((child, i) => <TreeNode key={i} node={child} depth={depth + 1} />)}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="tree">
      <h3 style={{marginBottom:10}}>File Explorer</h3>
      {data.map((node, i) => <TreeNode key={i} node={node} />)}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-collapsible-panel': `const { useState, useRef, useEffect } = React;

const panels = [
  { title: 'Getting Started', content: 'Install dependencies with npm install, then run npm start to launch the development server. The app will be available at localhost:3000.' },
  { title: 'Configuration', content: 'Edit the config.ts file to change settings. Environment variables can be set in the .env file. Remember to restart the server after changes.' },
  { title: 'Deployment', content: 'Run npm run build to create a production build. Deploy the dist folder to your hosting provider. CI/CD pipelines can be configured in the .github folder.' },
];

function Panel({ title, content }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) setHeight(bodyRef.current.scrollHeight);
  }, [content]);

  return (
    <div className="panel">
      <div className="panel-header" onClick={() => setOpen(!open)}>
        {title}
        <span className={\`panel-arrow \${open ? 'open' : ''}\`}>\\u25BC</span>
      </div>
      <div className="panel-body" ref={bodyRef} style={{maxHeight: open ? height : 0}}>
        <div className="panel-content">{content}</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="panels">
      <h3 style={{marginBottom:12}}>Documentation</h3>
      {panels.map((p, i) => <Panel key={i} {...p} />)}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-drawer': `const { useState } = React;

function App() {
  const [open, setOpen] = useState(false);
  const items = ['Dashboard', 'Profile', 'Settings', 'Notifications', 'Help', 'Logout'];

  return (
    <div>
      <button className="open-btn" onClick={() => setOpen(true)}>Open Drawer</button>
      <div className={\`drawer-overlay \${open ? 'open' : ''}\`} onClick={() => setOpen(false)} />
      <div className={\`drawer \${open ? 'open' : ''}\`}>
        <button className="drawer-close" onClick={() => setOpen(false)}>&times;</button>
        <h3>Navigation</h3>
        {items.map(item => (
          <div key={item} className="drawer-item" onClick={() => setOpen(false)}>{item}</div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-bottom-sheet': `const { useState, useRef } = React;

function App() {
  const [open, setOpen] = useState(false);
  const startY = useRef(0);

  const onTouchStart = (e) => {
    // TODO: Implement onTouchStart
  };
  const onTouchEnd = (e) => {
    // TODO: On touch end — update state
  };

  const actions = ['Share', 'Copy Link', 'Edit', 'Move to Folder', 'Delete', 'Report'];

  return (
    <div>
      <button className="open-btn" onClick={() => setOpen(true)}>Open Bottom Sheet</button>
      <div className={\`bs-overlay \${open ? 'open' : ''}\`} onClick={() => setOpen(false)} />
      <div className={\`bs \${open ? 'open' : ''}\`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="bs-handle"><div className="bs-handle-bar" /></div>
        <div className="bs-content">
          <h3>Actions</h3>
          {actions.map(a => <div key={a} className="bs-item" onClick={() => setOpen(false)}>{a}</div>)}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-command-palette': `const { useState, useEffect, useRef } = React;

const commands = [
  { name: 'Open File', shortcut: 'Ctrl+O' },
  { name: 'Save File', shortcut: 'Ctrl+S' },
  { name: 'New Terminal', shortcut: 'Ctrl+\`' },
  { name: 'Toggle Sidebar', shortcut: 'Ctrl+B' },
  { name: 'Find in Files', shortcut: 'Ctrl+Shift+F' },
  { name: 'Go to Line', shortcut: 'Ctrl+G' },
  { name: 'Format Document', shortcut: 'Shift+Alt+F' },
  { name: 'Toggle Word Wrap', shortcut: 'Alt+Z' },
  { name: 'Split Editor', shortcut: 'Ctrl+\\\\' },
  { name: 'Close Tab', shortcut: 'Ctrl+W' },
];

function App() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const filtered = commands.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(o => !o); setQuery(''); setActive(0); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);

  const onKey = (e) => {
    // TODO: On key — update state, filter items, remove item
  };

  return (
    <div>
      <div className="hint">Press <strong>Ctrl+K</strong> to open command palette</div>
      {open && (
        <div className="cp-overlay" onClick={() => setOpen(false)}>
          <div className="cp" onClick={e => e.stopPropagation()}>
            <input ref={inputRef} className="cp-input" value={query} onChange={e => { setQuery(e.target.value); setActive(0); }}
              onKeyDown={onKey} placeholder="Type a command..." />
            <div className="cp-list">
              {filtered.map((c, i) => (
                <div key={c.name} className={\`cp-item \${i === active ? 'active' : ''}\`}
                  onClick={() => setOpen(false)} onMouseEnter={() => setActive(i)}>
                  <span>{c.name}</span>
                  <span className="cp-shortcut">{c.shortcut}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-spotlight-search': `const { useState, useEffect, useRef } = React;

const data = {
  Files: ['index.ts', 'App.tsx', 'styles.css', 'config.json'],
  Commands: ['Build Project', 'Run Tests', 'Deploy', 'Lint Code'],
  People: ['Alice Smith', 'Bob Jones', 'Charlie Lee'],
};

function App() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') { e.preventDefault(); setOpen(o => !o); setQ(''); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => { if (open && ref.current) ref.current.focus(); }, [open]);

  const results = Object.entries(data).reduce((acc, [cat, items]) => {
    const f = items.filter(i => i.toLowerCase().includes(q.toLowerCase()));
    if (f.length) acc.push([cat, f]);
    return acc;
  }, []);

  return (
    <div>
      <div className="hint2">Press <strong>Ctrl+/</strong> to search</div>
      {open && (
        <div className="spot-overlay" onClick={() => setOpen(false)}>
          <div className="spot" onClick={e => e.stopPropagation()}>
            <input ref={ref} value={q} onChange={e => setQ(e.target.value)} placeholder="Search everything..." />
            {results.map(([cat, items]) => (
              <div key={cat}>
                <div className="spot-cat">{cat}</div>
                {items.map(item => <div key={item} className="spot-item" onClick={() => setOpen(false)}>{item}</div>)}
              </div>
            ))}
            {q && !results.length && <div style={{padding:16,textAlign:'center',color:'#555'}}>No results</div>}
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-floating-action-btn': `const { useState } = React;

const actions = [
  { icon: '\\u{1F4DD}', label: 'New Note' },
  { icon: '\\u{1F4F7}', label: 'Upload Photo' },
  { icon: '\\u{1F517}', label: 'Add Link' },
];

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="page-content"><p>Page content goes here. The FAB is in the bottom-right corner.</p></div>
      <div className="fab-container">
        <button className={\`fab \${open ? 'open' : ''}\`} onClick={() => setOpen(!open)}>+</button>
        {actions.map((a, i) => (
          <button key={i} className={\`fab-action \${open ? 'show' : ''}\`}
            style={{transitionDelay: open ? (i * 0.05) + 's' : '0s'}}
            onClick={() => setOpen(false)}>
            {a.icon}
            <span className="fab-label">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-skeleton-loader': `const { useState, useEffect } = React;

function SkeletonCard() {
  return (
    <div className="skel-card">
      <div className="skel-row"><div className="skel skel-avatar" /><div style={{flex:1}}><div className="skel skel-line" style={{width:'50%'}} /><div className="skel skel-line short" style={{width:'30%'}} /></div></div>
      <div className="skel skel-line" /><div className="skel skel-line" /><div className="skel skel-line short" />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 2500); return () => clearTimeout(t); }, []);

  return (
    <div className="skel-wrap">
      <button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2500); }}>Reload</button>
      {loading ? (
        <>{[1,2,3].map(i => <SkeletonCard key={i} />)}</>
      ) : (
        [{name:'Alice',text:'Working on the new dashboard feature.'},{name:'Bob',text:'Just deployed v2.0 to production!'},{name:'Charlie',text:'Fixed the authentication bug.'}].map((p,i) => (
          <div className="loaded-card" key={i}><h4>{p.name}</h4><p>{p.text}</p></div>
        ))
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-progress-bar': `const { useState, useEffect } = React;

function Progress({ label, value, color }) {
  return (
    <div className="prog-group">
      <div className="prog-label"><span>{label}</span><span>{value}%</span></div>
      <div className="prog-track"><div className={\`prog-fill \${color}\`} style={{width: value + '%'}} /></div>
    </div>
  );
}

function App() {
  const [vals, setVals] = useState([72, 45, 88, 30, 60]);

  const randomize = () => {
    // TODO: Randomize — update state, calculate values
  };

  return (
    <div className="prog-wrap">
      <h3 style={{marginBottom:16}}>Progress Bars</h3>
      <Progress label="Upload" value={vals[0]} color="blue" />
      <Progress label="Storage" value={vals[1]} color="green" />
      <Progress label="CPU Usage" value={vals[2]} color="orange" />
      <Progress label="Memory" value={vals[3]} color="red" />
      <Progress label="Bandwidth" value={vals[4]} color="striped" />
      <button onClick={randomize}>Randomize</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-badge': `const { useState } = React;

function App() {
  return (
    <div className="badge-wrap">
      <h3 style={{marginBottom:12}}>Badges</h3>
      <h4 style={{fontSize:13,color:'#94a3b8',marginBottom:8}}>Status</h4>
      <div className="row">
        <span className="badge badge-blue">Active</span>
        <span className="badge badge-green">Completed</span>
        <span className="badge badge-red">Failed</span>
        <span className="badge badge-yellow">Pending</span>
        <span className="badge badge-outline">Draft</span>
      </div>
      <h4 style={{fontSize:13,color:'#94a3b8',marginBottom:8}}>With Dot</h4>
      <div className="row">
        <span className="badge badge-green"><span style={{width:6,height:6,borderRadius:'50%',background:'#4ade80',display:'inline-block'}} /> Online</span>
        <span className="badge badge-red"><span style={{width:6,height:6,borderRadius:'50%',background:'#f87171',display:'inline-block'}} /> Offline</span>
      </div>
      <h4 style={{fontSize:13,color:'#94a3b8',marginBottom:8}}>Icon Badges</h4>
      <div className="row">
        <span className="icon-badge">&#x1F514;<span className="dot" /></span>
        <span className="icon-badge">&#x2709;&#xFE0F;<span className="count">3</span></span>
        <span className="icon-badge">&#x1F4AC;<span className="count">12</span></span>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-avatar': `const { useState } = React;

function Avatar({ name, size = 'md', status }) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  const colorIdx = name.length % 5;
  return (
    <div className={\`avatar \${size} colors-\${colorIdx}\`}>
      {initials}
      {status && <span className={\`av-status av-\${status}\`} />}
    </div>
  );
}

function App() {
  return (
    <div className="av-wrap">
      <h3 style={{marginBottom:12}}>Avatars</h3>
      <h4 style={{fontSize:13,color:'#94a3b8',marginBottom:8}}>Sizes</h4>
      <div className="av-row">
        <Avatar name="Alice B" size="sm" />
        <Avatar name="Bob C" size="md" />
        <Avatar name="Charlie D" size="lg" />
        <Avatar name="Diana E" size="xl" />
      </div>
      <h4 style={{fontSize:13,color:'#94a3b8',marginBottom:8}}>With Status</h4>
      <div className="av-row">
        <Avatar name="Eve F" size="lg" status="online" />
        <Avatar name="Frank G" size="lg" status="offline" />
        <Avatar name="Grace H" size="lg" status="busy" />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-stat-card': `const { useState } = React;

const stats = [
  { label: 'Total Revenue', value: '$48,200', trend: '+12.5%', up: true },
  { label: 'Active Users', value: '2,847', trend: '+8.2%', up: true },
  { label: 'Bounce Rate', value: '34.1%', trend: '-2.4%', up: false },
  { label: 'Avg Session', value: '4m 23s', trend: '+0.8%', up: true },
];

function App() {
  return (
    <div>
      <h3 style={{marginBottom:12,textAlign:'center'}}>Dashboard</h3>
      <div className="stats">
        {stats.map((s, i) => (
          <div className="stat" key={i}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className={\`stat-trend \${s.up ? 'trend-up' : 'trend-down'}\`}>
              {s.up ? '\\u25B2' : '\\u25BC'} {s.trend}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-timeline-feed': `const { useState } = React;

const items = [
  { type: 'commit', icon: '\\u{1F4E6}', user: 'Alice', action: 'pushed 3 commits to', target: 'main', time: '2m ago', desc: 'feat: add user dashboard' },
  { type: 'merge', icon: '\\u{1F500}', user: 'Bob', action: 'merged PR #42 into', target: 'main', time: '15m ago', desc: 'fix: resolve auth race condition' },
  { type: 'issue', icon: '\\u{1F41B}', user: 'Charlie', action: 'opened issue', target: '#128', time: '1h ago', desc: 'Bug: sidebar collapse broken on mobile' },
  { type: 'comment', icon: '\\u{1F4AC}', user: 'Diana', action: 'commented on', target: '#125', time: '2h ago', desc: 'This looks good, approved!' },
  { type: 'commit', icon: '\\u{1F4E6}', user: 'Eve', action: 'pushed 1 commit to', target: 'feature/api', time: '3h ago', desc: 'chore: update dependencies' },
];

function App() {
  return (
    <div className="feed">
      <h3 style={{marginBottom:8}}>Activity Feed</h3>
      {items.map((item, i) => (
        <div className="feed-item" key={i}>
          <div className={\`feed-icon \${item.type}\`}>{item.icon}</div>
          <div className="feed-body">
            <div className="feed-title"><strong>{item.user}</strong> {item.action} <strong>{item.target}</strong></div>
            <div className="feed-time">{item.time}</div>
            <div className="feed-desc">{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-activity-log': `const { useState } = React;

const logs = [
  { time: '14:32', type: 'info', msg: 'Server started on port 3000' },
  { time: '14:33', type: 'success', msg: 'Database connection established' },
  { time: '14:34', type: 'info', msg: 'Loading configuration from env' },
  { time: '14:35', type: 'warning', msg: 'Cache TTL not set, using default 300s' },
  { time: '14:36', type: 'error', msg: 'Failed to connect to Redis cluster' },
  { time: '14:37', type: 'info', msg: 'Fallback to in-memory cache' },
  { time: '14:38', type: 'success', msg: 'All routes registered successfully' },
  { time: '14:39', type: 'warning', msg: 'Rate limiter threshold at 80%' },
  { time: '14:40', type: 'success', msg: 'Health check endpoint responding' },
];

function App() {
  const [filter, setFilter] = useState('all');
  const types = ['all', 'info', 'success', 'warning', 'error'];
  const filtered = filter === 'all' ? logs : logs.filter(l => l.type === filter);

  return (
    <div className="log-wrap">
      <h3 style={{marginBottom:10}}>System Log</h3>
      <div className="log-filters">
        {types.map(t => (
          <button key={t} className={\`log-filter \${filter === t ? 'active' : ''}\`} onClick={() => setFilter(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div className="log-list">
        {filtered.map((l, i) => (
          <div className="log-entry" key={i}>
            <span className="log-time">{l.time}</span>
            <span className={\`log-dot \${l.type}\`} />
            <span>{l.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-diff-viewer': `const { useState } = React;

const oldLines = [
  'function greet(name) {',
  '  console.log("Hello " + name);',
  '  return name;',
  '}',
];

const newLines = [
  'function greet(name) {',
  '  const msg = \\\`Hello \\\${name}!\\\`;',
  '  console.log(msg);',
  '  return msg;',
  '}',
];

function DiffPane({ title, lines, other }) {
  return (
    <div className="diff-pane">
      <div className="diff-header">{title}</div>
      {lines.map((line, i) => {
        const inOther = other.includes(line);
        const cls = !inOther ? (title.includes('Old') ? 'line-removed' : 'line-added') : 'line-normal';
        return (
          <div key={i} className={\`diff-line \${cls}\`}>
            <span className="diff-num">{i + 1}</span>
            <span className="diff-text">{line}</span>
          </div>
        );
      })}
    </div>
  );
}

function App() {
  return (
    <div className="diff-wrap">
      <h3 style={{marginBottom:10}}>Diff Viewer</h3>
      <div className="diff-container">
        <DiffPane title="Old Version" lines={oldLines} other={newLines} />
        <DiffPane title="New Version" lines={newLines} other={oldLines} />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-code-block': `const { useState } = React;

function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    // TODO: Copy — update state, handle timing
  };
  return (
    <div className="code-block">
      <div className="cb-header">
        <span className="cb-lang">{language}</span>
        <button className="cb-copy" onClick={copy}>{copied ? 'Copied!' : 'Copy'}</button>
      </div>
      <div className="cb-code">{code}</div>
    </div>
  );
}

function App() {
  return (
    <div className="cb-wrap">
      <h3 style={{marginBottom:12}}>Code Blocks</h3>
      <CodeBlock language="JavaScript" code={\`const sum = (a, b) => a + b;\\nconsole.log(sum(2, 3)); // 5\`} />
      <CodeBlock language="Python" code={\`def greet(name):\\n    return f"Hello, {name}!"\\n\\nprint(greet("World"))\`} />
      <CodeBlock language="CSS" code={\`.container {\\n  display: grid;\\n  gap: 16px;\\n  grid-template-columns: repeat(3, 1fr);\\n}\`} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-markdown-preview': `const { useState } = React;

function parse(md) {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
    .replace(/\\*(.+?)\\*/g, '<em>$1</em>')
    .replace(/\`(.+?)\`/g, '<code>$1</code>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\\/li>)/s, '<ul>$1</ul>')
    .replace(/\\n/g, '<br/>');
}

function App() {
  const [md, setMd] = useState('# Markdown Preview\\n\\n## Features\\n\\n- **Bold** text\\n- *Italic* text\\n- \`inline code\`\\n\\n> This is a blockquote\\n\\nType markdown on the left to see the preview on the right.');

  return (
    <div className="md-wrap">
      <h3 style={{marginBottom:8}}>Markdown Preview</h3>
      <div className="md-split">
        <div className="md-pane">
          <div className="md-pane-label">Markdown</div>
          <textarea value={md} onChange={e => setMd(e.target.value)} />
        </div>
        <div className="md-pane">
          <div className="md-pane-label">Preview</div>
          <div className="md-preview" dangerouslySetInnerHTML={{__html: parse(md)}} />
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-json-viewer': `const { useState } = React;

const sampleData = {
  name: "Project Alpha",
  version: "2.1.0",
  active: true,
  tags: ["react", "typescript", "ui"],
  config: { port: 3000, debug: false, db: { host: "localhost", name: "app_db" } },
  author: null
};

function JsonNode({ data, depth = 0 }) {
  const [open, setOpen] = useState(depth < 2);
  if (data === null) return <span className="jv-null">null</span>;
  if (typeof data === 'string') return <span className="jv-string">"{data}"</span>;
  if (typeof data === 'number') return <span className="jv-number">{data}</span>;
  if (typeof data === 'boolean') return <span className="jv-bool">{String(data)}</span>;

  const isArr = Array.isArray(data);
  const entries = isArr ? data.map((v, i) => [i, v]) : Object.entries(data);

  return (
    <span>
      <span className="jv-toggle" onClick={() => setOpen(!open)}>{open ? '\\u25BC' : '\\u25B6'} </span>
      {isArr ? '[' : '{'}
      {open ? (
        <div>{entries.map(([k, v]) => (
          <div className="jv-row" key={k}>
            {!isArr && <><span className="jv-key">"{k}"</span>: </>}
            <JsonNode data={v} depth={depth + 1} />
            {','}
          </div>
        ))}</div>
      ) : <span style={{color:'#555'}}> ... {entries.length} items </span>}
      {isArr ? ']' : '}'}
    </span>
  );
}

function App() {
  return (
    <div className="jv-wrap">
      <h3 style={{marginBottom:8}}>JSON Viewer</h3>
      <div className="jv"><JsonNode data={sampleData} /></div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-comparison-table': `const { useState } = React;

const features = [
  { name: 'Users', free: '1', pro: '10', enterprise: 'Unlimited' },
  { name: 'Storage', free: '1 GB', pro: '50 GB', enterprise: '1 TB' },
  { name: 'API Access', free: false, pro: true, enterprise: true },
  { name: 'Custom Domain', free: false, pro: true, enterprise: true },
  { name: 'Analytics', free: false, pro: false, enterprise: true },
  { name: 'Priority Support', free: false, pro: false, enterprise: true },
  { name: 'SSO', free: false, pro: false, enterprise: true },
];

function Cell({ val }) {
  if (val === true) return <span className="check">\\u2713</span>;
  if (val === false) return <span className="cross">\\u2717</span>;
  return <span>{val}</span>;
}

function App() {
  return (
    <div className="ct-wrap">
      <h3 style={{marginBottom:10}}>Plan Comparison</h3>
      <table className="ct">
        <thead><tr><th>Feature</th><th>Free</th><th className="highlight">Pro</th><th>Enterprise</th></tr></thead>
        <tbody>
          {features.map((f, i) => (
            <tr key={i}><td>{f.name}</td><td><Cell val={f.free} /></td><td className="highlight"><Cell val={f.pro} /></td><td><Cell val={f.enterprise} /></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-pricing-table': `const { useState } = React;

const plans = [
  { name: 'Starter', monthly: 9, features: ['1 User', '5 GB Storage', 'Email Support'] },
  { name: 'Pro', monthly: 29, features: ['10 Users', '50 GB Storage', 'Priority Support', 'API Access'], popular: true },
  { name: 'Enterprise', monthly: 99, features: ['Unlimited Users', '1 TB Storage', '24/7 Support', 'SSO', 'Custom Domain'] },
];

function App() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="pricing-wrap">
      <h3 style={{marginBottom:12}}>Pricing</h3>
      <div className="billing-toggle">
        <button className={!annual ? 'active' : ''} onClick={() => setAnnual(false)}>Monthly</button>
        <button className={annual ? 'active' : ''} onClick={() => setAnnual(true)}>Annual (save 20%)</button>
      </div>
      <div className="plans">
        {plans.map(p => (
          <div key={p.name} className={\`plan \${p.popular ? 'popular' : ''}\`}>
            {p.popular && <span className="pop-badge">Popular</span>}
            <div className="plan-name">{p.name}</div>
            <div className="plan-price">\${annual ? Math.round(p.monthly * 0.8) : p.monthly}</div>
            <div className="plan-period">per month{annual ? ', billed annually' : ''}</div>
            {p.features.map(f => <div key={f} className="plan-feature">\\u2713 {f}</div>)}
            <button className={\`plan-btn \${p.popular ? 'primary' : 'secondary'}\`}>Get Started</button>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-feature-list': `const { useState } = React;

const features = [
  { icon: '\\u26A1', title: 'Lightning Fast', desc: 'Optimized for speed with lazy loading and code splitting.' },
  { icon: '\\u{1F512}', title: 'Secure', desc: 'Built-in authentication and authorization with JWT tokens.' },
  { icon: '\\u{1F4F1}', title: 'Responsive', desc: 'Works beautifully on desktop, tablet, and mobile devices.' },
  { icon: '\\u{1F527}', title: 'Customizable', desc: 'Fully themeable with CSS variables and design tokens.' },
  { icon: '\\u{1F4E6}', title: 'Modular', desc: 'Pick only the components you need. Tree-shakeable.' },
  { icon: '\\u{267F}', title: 'Accessible', desc: 'WCAG 2.1 AA compliant with full keyboard support.' },
];

function App() {
  return (
    <div className="fl-wrap">
      <h3 style={{marginBottom:12,textAlign:'center'}}>Features</h3>
      <div className="fl-grid">
        {features.map((f, i) => (
          <div className="fl-card" key={i}>
            <div className="fl-icon">{f.icon}</div>
            <div className="fl-title">{f.title}</div>
            <div className="fl-desc">{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-testimonials': `const { useState } = React;

const testimonials = [
  { name: 'Sarah K.', role: 'Product Manager', quote: 'This tool transformed our workflow. We shipped features 3x faster after adopting it.', stars: 5 },
  { name: 'Mike D.', role: 'Senior Developer', quote: 'The API is intuitive and the docs are excellent. Best DX I have experienced.', stars: 5 },
  { name: 'Lisa R.', role: 'UX Designer', quote: 'Beautiful components out of the box. Saved us weeks of design implementation time.', stars: 4 },
];

function App() {
  return (
    <div className="test-wrap">
      <h3 style={{marginBottom:12,textAlign:'center'}}>What People Say</h3>
      {testimonials.map((t, i) => (
        <div className="test-card" key={i}>
          <div className="test-stars">{'\\u2605'.repeat(t.stars)}{'\\u2606'.repeat(5 - t.stars)}</div>
          <div className="test-quote">{t.quote}</div>
          <div className="test-author">
            <div className="test-av">{t.name[0]}</div>
            <div><div className="test-name">{t.name}</div><div className="test-role">{t.role}</div></div>
          </div>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-team-grid': `const { useState } = React;

const team = [
  { name: 'Alice Chen', role: 'CEO' },
  { name: 'Bob Park', role: 'CTO' },
  { name: 'Carol Wu', role: 'Design Lead' },
  { name: 'Dan Kim', role: 'Lead Dev' },
  { name: 'Eve Patel', role: 'PM' },
  { name: 'Frank Lee', role: 'DevOps' },
];

function App() {
  return (
    <div className="team-wrap">
      <h3 style={{marginBottom:12,textAlign:'center'}}>Our Team</h3>
      <div className="team-grid">
        {team.map((t, i) => (
          <div className="team-card" key={i}>
            <div className={\`team-avatar c\${i % 6}\`}>{t.name.split(' ').map(n => n[0]).join('')}</div>
            <div className="team-name">{t.name}</div>
            <div className="team-role">{t.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-changelog': `const { useState } = React;

const changelog = [
  { version: '2.1.0', date: 'Jan 15, 2025', items: [
    { type: 'added', text: 'Dark mode support for all components' },
    { type: 'added', text: 'New Kanban board component' },
    { type: 'fixed', text: 'Modal focus trap not working in Safari' },
    { type: 'changed', text: 'Upgraded to React 19' },
  ]},
  { version: '2.0.0', date: 'Dec 1, 2024', items: [
    { type: 'added', text: 'Complete TypeScript rewrite' },
    { type: 'changed', text: 'New design system with CSS variables' },
    { type: 'removed', text: 'Legacy class components' },
    { type: 'fixed', text: 'Memory leak in virtual list' },
  ]},
];

function App() {
  return (
    <div className="cl-wrap">
      <h3 style={{marginBottom:16}}>Changelog</h3>
      {changelog.map(v => (
        <div className="cl-version" key={v.version}>
          <div className="cl-header">
            <span className="cl-badge">v{v.version}</span>
            <span className="cl-date">{v.date}</span>
          </div>
          {v.items.map((item, i) => (
            <div className="cl-item" key={i}>
              <span className={\`cl-tag \${item.type}\`}>{item.type}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-status-page': `const { useState } = React;

const services = [
  { name: 'API Server', status: 'up', uptime: 99.98, bars: Array(30).fill('ok') },
  { name: 'Web App', status: 'up', uptime: 99.95, bars: [...Array(28).fill('ok'), 'warn', 'ok'] },
  { name: 'Database', status: 'up', uptime: 99.99, bars: Array(30).fill('ok') },
  { name: 'CDN', status: 'degraded', uptime: 98.50, bars: [...Array(26).fill('ok'), 'warn', 'down', 'warn', 'ok'] },
  { name: 'Email Service', status: 'up', uptime: 99.90, bars: [...Array(29).fill('ok'), 'warn'] },
];

function App() {
  return (
    <div className="sp-wrap">
      <h3 style={{marginBottom:12}}>System Status</h3>
      <div className="sp-overall ok">All Systems Operational</div>
      {services.map((s, i) => (
        <div className="sp-service" key={i}>
          <div className="sp-row">
            <span className="sp-name">{s.name}</span>
            <span className={\`sp-status \${s.status}\`}><span className={\`sp-dot \${s.status}\`} />{s.status === 'up' ? 'Operational' : 'Degraded'}</span>
          </div>
          <div className="sp-uptime">{s.bars.map((b, j) => <div key={j} className={\`sp-bar \${b}\`} />)}</div>
          <div className="sp-uptime-label">{s.uptime}% uptime (30 days)</div>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-metric-dashboard': `const { useState, useEffect, useRef } = React;

function Sparkline({ data, color }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    c.width = c.offsetWidth * 2;
    c.height = 60;
    ctx.clearRect(0, 0, c.width, c.height);
    const max = Math.max(...data), min = Math.min(...data);
    const range = max - min || 1;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    data.forEach((v, i) => {
      const x = (i / (data.length - 1)) * c.width;
      const y = c.height - ((v - min) / range) * (c.height - 4) - 2;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [data, color]);
  return <div className="md-spark"><canvas ref={ref} /></div>;
}

function App() {
  const [metrics, setMetrics] = useState([
    { label: 'Requests/s', val: 1247, change: 12.3, up: true, data: Array.from({length: 20}, () => 1000 + Math.random() * 500), color: '#4fc3f7' },
    { label: 'Latency (ms)', val: 42, change: -5.1, up: false, data: Array.from({length: 20}, () => 30 + Math.random() * 30), color: '#4ade80' },
    { label: 'Error Rate', val: 0.3, change: 0.1, up: true, data: Array.from({length: 20}, () => Math.random() * 1), color: '#f87171' },
    { label: 'CPU Usage', val: 67, change: -2.4, up: false, data: Array.from({length: 20}, () => 50 + Math.random() * 40), color: '#fb923c' },
  ]);

  useEffect(() => {
    const id = setInterval(() => {
      setMetrics(prev => prev.map(m => ({
        ...m,
        val: +(m.val + (Math.random() - 0.5) * m.val * 0.05).toFixed(m.val < 10 ? 1 : 0),
        data: [...m.data.slice(1), m.val + (Math.random() - 0.5) * m.val * 0.1],
      })));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="md-wrap">
      <h3 style={{marginBottom:10}}>Live Metrics</h3>
      <div className="md-cards">
        {metrics.map((m, i) => (
          <div className="md-card" key={i}>
            <div className="md-card-label">{m.label}</div>
            <div className="md-card-val">{m.val}</div>
            <div className={\`md-card-change \${m.change > 0 ? 'up' : 'down'}\`}>
              {m.change > 0 ? '\\u25B2' : '\\u25BC'} {Math.abs(m.change)}%
            </div>
            <Sparkline data={m.data} color={m.color} />
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-command-menu': `const { useState, useEffect, useRef } = React;

const menus = {
  root: { sections: [
    { label: 'Navigation', items: [{ name: 'Go to Dashboard', action: true }, { name: 'Go to Settings', action: true }] },
    { label: 'Actions', items: [{ name: 'Create...', sub: 'create' }, { name: 'Edit...', sub: 'edit' }] },
  ]},
  create: { sections: [{ label: 'Create', items: [{ name: 'New File', action: true }, { name: 'New Folder', action: true }, { name: 'New Project', action: true }] }] },
  edit: { sections: [{ label: 'Edit', items: [{ name: 'Undo', action: true }, { name: 'Redo', action: true }, { name: 'Find & Replace', action: true }] }] },
};

function App() {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState(['root']);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const current = menus[path[path.length - 1]];
  const allItems = current.sections.flatMap(s => s.items).filter(i => i.name.toLowerCase().includes(q.toLowerCase()));

  const select = (item) => {
    // TODO: Select — update state
  };

  useEffect(() => {
    const h = (e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(o => !o); setPath(['root']); setQ(''); } if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  return (
    <div>
      <button className="trigger" onClick={() => { setOpen(true); setPath(['root']); setQ(''); }}>Open Command Menu (Ctrl+K)</button>
      {open && (
        <div className="cm-overlay" onClick={() => setOpen(false)}>
          <div className="cm" onClick={e => e.stopPropagation()}>
            <input value={q} onChange={e => { setQ(e.target.value); setActive(0); }} placeholder="Search commands..." autoFocus />
            {path.length > 1 && <div className="cm-crumb" onClick={() => { setPath(path.slice(0, -1)); setQ(''); }}>&larr; Back</div>}
            {allItems.map((item, i) => (
              <div key={item.name} className={\`cm-item \${i === active ? 'active' : ''}\`}
                onClick={() => select(item)} onMouseEnter={() => setActive(i)}>
                <span>{item.name}</span>
                {item.sub && <span className="cm-hint">&rarr;</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-mini-map': `const { useState, useRef, useEffect, useCallback } = React;

const sections = Array.from({length: 8}, (_, i) => ({
  title: 'Section ' + (i + 1),
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. '.repeat(2),
}));

function App() {
  const contentRef = useRef(null);
  const [vp, setVp] = useState({ top: 0, height: 30 });

  const onScroll = useCallback(() => {
    const el = contentRef.current;
    if (!el) return;
    const pct = el.scrollTop / el.scrollHeight;
    const hPct = (el.clientHeight / el.scrollHeight) * 100;
    setVp({ top: pct * 100, height: hPct });
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    el.addEventListener('scroll', onScroll);
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const clickMinimap = (e) => {
    // TODO: Implement clickMinimap
  };

  return (
    <div className="mm-layout">
      <div className="mm-content" ref={contentRef}>
        {sections.map((s, i) => <div key={i}><h2>{s.title}</h2><p>{s.text}</p></div>)}
      </div>
      <div className="mm-sidebar" onClick={clickMinimap}>
        <div className="mm-track">
          {sections.map((_, i) => <div key={i}><div className="mm-line heading" />{Array(4).fill(0).map((_, j) => <div key={j} className="mm-line" />)}</div>)}
        </div>
        <div className="mm-viewport" style={{top: vp.top + '%', height: vp.height + '%'}} />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-scroll-to-top': `const { useState, useRef, useEffect } = React;

function App() {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const handler = () => setShow(el.scrollTop > 150);
    el.addEventListener('scroll', handler);
    return () => el.removeEventListener('scroll', handler);
  }, []);

  const scrollTop = () => {
    // TODO: Implement scrollTop
  };

  return (
    <div className="page" ref={ref}>
      <h3>Scroll Down</h3>
      {Array(15).fill(0).map((_, i) => <p key={i}>Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>)}
      <button className={\`stt-btn \${show ? 'visible' : ''}\`} onClick={scrollTop}>\\u2191</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-anchor-links': `const { useState, useRef, useEffect } = React;

const sections = ['Introduction', 'Features', 'Installation', 'Usage', 'API Reference'];

function App() {
  const [active, setActive] = useState(0);
  const contentRef = useRef(null);
  const sectionRefs = useRef([]);

  const scrollTo = (idx) => {
    // TODO: Implement scrollTo
  };

  useEffect(() => {
    const el = contentRef.current;
    const handler = () => {
      const positions = sectionRefs.current.map(s => s?.offsetTop || 0);
      const scrollPos = el.scrollTop + 40;
      let idx = 0;
      positions.forEach((p, i) => { if (scrollPos >= p) idx = i; });
      setActive(idx);
    };
    el.addEventListener('scroll', handler);
    return () => el.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="al-layout">
      <nav className="al-nav">
        {sections.map((s, i) => (
          <div key={s} className={\`al-link \${i === active ? 'active' : ''}\`} onClick={() => scrollTo(i)}>{s}</div>
        ))}
      </nav>
      <div className="al-content" ref={contentRef}>
        {sections.map((s, i) => (
          <div key={s} className="al-section" ref={el => sectionRefs.current[i] = el}>
            <h2>{s}</h2>
            <p>Content for the {s.toLowerCase()} section. This demonstrates smooth scrolling anchor navigation with active state tracking as you scroll through the document.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-table-of-contents': `const { useState, useRef, useEffect } = React;

const doc = [
  { level: 2, text: 'Getting Started', body: 'Welcome to the documentation. This guide will help you set up and run the project.' },
  { level: 3, text: 'Prerequisites', body: 'You need Node.js 18+ and npm installed on your machine.' },
  { level: 3, text: 'Quick Start', body: 'Run npx create-app and follow the prompts to set up your project.' },
  { level: 2, text: 'Configuration', body: 'The project can be configured through various config files.' },
  { level: 3, text: 'Environment Variables', body: 'Create a .env file in the root directory with your settings.' },
  { level: 3, text: 'Build Options', body: 'Configure the build pipeline in the build.config.ts file.' },
  { level: 2, text: 'API Reference', body: 'The complete API reference for all exported functions and components.' },
  { level: 3, text: 'Components', body: 'All React components exported by the library.' },
  { level: 3, text: 'Hooks', body: 'Custom React hooks for common patterns.' },
  { level: 2, text: 'Deployment', body: 'Instructions for deploying to various platforms.' },
];

function App() {
  const [activeIdx, setActiveIdx] = useState(0);
  const contentRef = useRef(null);
  const headingRefs = useRef([]);

  const scrollTo = (idx) => {
    // TODO: Implement scrollTo
  };

  useEffect(() => {
    const el = contentRef.current;
    const handler = () => {
      const scrollPos = el.scrollTop + 30;
      let idx = 0;
      headingRefs.current.forEach((ref, i) => { if (ref && ref.offsetTop <= scrollPos) idx = i; });
      setActiveIdx(idx);
    };
    el.addEventListener('scroll', handler);
    return () => el.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="toc-layout">
      <div className="toc-sidebar">
        <h4>Contents</h4>
        {doc.map((d, i) => (
          <div key={i} className={\`toc-item \${d.level === 3 ? 'h3' : ''} \${i === activeIdx ? 'active' : ''}\`}
            onClick={() => scrollTo(i)}>{d.text}</div>
        ))}
      </div>
      <div className="toc-content" ref={contentRef}>
        {doc.map((d, i) => (
          <div key={i} ref={el => headingRefs.current[i] = el}>
            {d.level === 2 ? <h2>{d.text}</h2> : <h3>{d.text}</h3>}
            <p>{d.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-step-indicator': `const { useState } = React;

const stepNames = ['Account', 'Profile', 'Settings', 'Review'];

function App() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="step-wrap">
      <div className="steps">
        {stepNames.map((_, i) => (
          <React.Fragment key={i}>
            <div className={\`step-circle \${i < current ? 'completed' : i === current ? 'active' : 'upcoming'}\`}>
              {i < current ? '\\u2713' : i + 1}
            </div>
            {i < stepNames.length - 1 && <div className={\`step-line \${i < current ? 'done' : ''}\`} />}
          </React.Fragment>
        ))}
      </div>
      <div className="step-labels">
        {stepNames.map((name, i) => <span key={i} className={\`step-label \${i === current ? 'active-label' : ''}\`}>{name}</span>)}
      </div>
      <div className="step-content">
        <h3>{stepNames[current]}</h3>
        <p style={{color:'#94a3b8',fontSize:14}}>Complete the {stepNames[current].toLowerCase()} step to continue.</p>
      </div>
      <div className="step-btns">
        {current > 0 && <button className="btn-prev" onClick={() => setCurrent(current - 1)}>Previous</button>}
        <button className="btn-next" onClick={() => setCurrent(Math.min(current + 1, stepNames.length - 1))}>
          {current === stepNames.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-app-shell': `const { useState } = React;

const navItems = ['Dashboard', 'Projects', 'Team', 'Analytics', 'Settings'];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [active, setActive] = useState(0);

  return (
    <div className="shell">
      <div className="shell-header">
        <button className="shell-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>&#x2630;</button>
        <span className="shell-title">My Application</span>
      </div>
      <div className="shell-body">
        <div className={\`shell-sidebar \${sidebarOpen ? '' : 'collapsed'}\`}>
          {navItems.map((item, i) => (
            <div key={item} className={\`shell-nav-item \${i === active ? 'active' : ''}\`}
              onClick={() => setActive(i)}>{item}</div>
          ))}
        </div>
        <div className="shell-content">
          <h2 style={{color:'#4fc3f7',marginBottom:8}}>{navItems[active]}</h2>
          <p style={{color:'#94a3b8',fontSize:14,lineHeight:1.7}}>This is the {navItems[active].toLowerCase()} page. The sidebar can be toggled with the hamburger menu in the header.</p>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-header-scroll-hide': `const { useState, useRef, useEffect } = React;

function App() {
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    const handler = () => {
      const current = el.scrollTop;
      setHidden(current > 80 && current > lastScroll.current);
      lastScroll.current = current;
    };
    el.addEventListener('scroll', handler);
    return () => el.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="hsh-container" ref={containerRef}>
      <div className={\`hsh-header \${hidden ? 'hidden' : ''}\`}>
        <h3>My App</h3>
        <span className="hsh-badge">Scroll down then up</span>
      </div>
      <div className="hsh-content">
        {Array(20).fill(0).map((_, i) => <p key={i}>Paragraph {i + 1}: Scroll down to hide the header, then scroll up to reveal it. The header uses scroll direction detection with a CSS transform transition.</p>)}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-sticky-header': `const { useState, useRef, useEffect } = React;

function App() {
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const handler = () => setScrolled(el.scrollTop > 80);
    el.addEventListener('scroll', handler);
    return () => el.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="sh-container" ref={ref}>
      <div className="sh-hero">
        <h1>Welcome</h1>
        <p>Scroll down to see the sticky header</p>
      </div>
      <div className={\`sh-header \${scrolled ? 'scrolled' : ''}\`}>
        <span style={{fontSize:14,fontWeight:700,color:'#4fc3f7'}}>Logo</span>
        {['Home','Features','Docs','Blog'].map(n => <span key={n} className="sh-nav">{n}</span>)}
      </div>
      <div className="sh-content">
        {Array(15).fill(0).map((_, i) => <p key={i}>Section content paragraph {i + 1}. The header becomes sticky with a shadow effect once you scroll past the hero section above.</p>)}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-page-transitions': `const { useState, useEffect, useRef } = React;

const pages = [
  { name: 'Home', icon: '\\u{1F3E0}', desc: 'Welcome to the home page. Navigate between pages to see the transition effects.' },
  { name: 'About', icon: '\\u{1F4CB}', desc: 'This is the about page. Notice the smooth slide and fade transition.' },
  { name: 'Contact', icon: '\\u{2709}', desc: 'Get in touch! Each page transition animates in from the right.' },
];

function App() {
  const [current, setCurrent] = useState(0);
  const [anim, setAnim] = useState('entering');
  const pendingRef = useRef(null);

  const navigate = (idx) => {
    // TODO: Navigate — update state, handle timing
  };

  return (
    <div className="pt-wrap">
      <div className="pt-nav">
        {pages.map((p, i) => (
          <div key={p.name} className={\`pt-nav-item \${i === current ? 'active' : ''}\`}
            onClick={() => navigate(i)}>{p.name}</div>
        ))}
      </div>
      <div className="pt-content">
        <div className={\`pt-page \${anim}\`}>
          <div style={{fontSize:48}}>{pages[current].icon}</div>
          <h2>{pages[current].name}</h2>
          <p>{pages[current].desc}</p>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-route-guard': `const { useState } = React;

function LoginPage({ onLogin }) {
  return (
    <div className="rg-card">
      <div className="rg-lock">\\u{1F512}</div>
      <h3>Login Required</h3>
      <p>You must be logged in to access this page.</p>
      <button className="rg-btn rg-login" onClick={onLogin}>Log In</button>
    </div>
  );
}

function ProtectedPage({ page, onLogout }) {
  return (
    <div className="rg-card">
      <h3>{page}</h3>
      <span className="rg-badge auth">Authenticated</span>
      <p>Welcome! You have access to the {page.toLowerCase()} page.</p>
      <button className="rg-btn rg-logout" onClick={onLogout}>Log Out</button>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState('Dashboard');
  const protectedPages = ['Dashboard', 'Settings', 'Admin'];

  return (
    <div className="rg-wrap">
      <div className="rg-nav">
        {protectedPages.map(p => (
          <button key={p} className={page === p ? 'active' : ''} onClick={() => setPage(p)}>
            {loggedIn ? '' : '\\u{1F512} '}{p}
          </button>
        ))}
      </div>
      {loggedIn ? (
        <ProtectedPage page={page} onLogout={() => setLoggedIn(false)} />
      ) : (
        <LoginPage onLogin={() => setLoggedIn(true)} />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-nested-routes': `const { useState } = React;

const routes = {
  Dashboard: { subs: ['Overview', 'Analytics', 'Reports'] },
  Settings: { subs: ['General', 'Security', 'Notifications'] },
  Users: { subs: ['All Users', 'Roles', 'Invitations'] },
};

function App() {
  const [page, setPage] = useState('Dashboard');
  const [sub, setSub] = useState('Overview');
  const topNav = Object.keys(routes);

  const changePage = (p) => {
    // TODO: Implement changePage
  };

  return (
    <div className="nr-app">
      <div className="nr-top-nav">
        {topNav.map(p => <div key={p} className={\`nr-top-item \${p === page ? 'active' : ''}\`} onClick={() => changePage(p)}>{p}</div>)}
      </div>
      <div className="nr-body">
        <div className="nr-sub-nav">
          {routes[page].subs.map(s => <div key={s} className={\`nr-sub-item \${s === sub ? 'active' : ''}\`} onClick={() => setSub(s)}>{s}</div>)}
        </div>
        <div className="nr-content">
          <div className="nr-crumbs">{page} / <span>{sub}</span></div>
          <h3>{sub}</h3>
          <p style={{color:'#94a3b8',fontSize:14}}>This is the {sub} view inside the {page} section. The parent layout persists while the child content changes.</p>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-tab-router': `const { useState } = React;

function TabContent({ name, preserved }) {
  const [count, setCount] = useState(0);
  return (
    <div className="tr-panel">
      <h3>{name}</h3>
      <p>This tab has its own state that is preserved when you switch tabs.</p>
      <div className="tr-counter">
        <button onClick={() => setCount(c => c - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount(c => c + 1)}>+</button>
      </div>
    </div>
  );
}

const tabs = ['Home', 'Profile', 'Messages'];

function App() {
  const [active, setActive] = useState(0);

  return (
    <div className="tr-wrap">
      <div className="tr-tabs">
        {tabs.map((t, i) => (
          <div key={t} className={\`tr-tab \${i === active ? 'active' : ''}\`} onClick={() => setActive(i)}>{t}</div>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t} style={{display: i === active ? 'block' : 'none'}}>
          <TabContent name={t} />
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-deep-linking': `const { useState, useEffect } = React;

const pages = {
  home: { title: 'Home', desc: 'Welcome to the home page.' },
  about: { title: 'About', desc: 'Learn about our project.' },
  features: { title: 'Features', desc: 'Explore our features.' },
  pricing: { title: 'Pricing', desc: 'View pricing plans.' },
};

function App() {
  const [page, setPage] = useState('home');

  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash.slice(1) || 'home';
      if (pages[hash]) setPage(hash);
    };
    window.addEventListener('hashchange', handler);
    handler();
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const navigate = (p) => {
    // TODO: Navigate — update state
  };

  const current = pages[page];

  return (
    <div className="dl-wrap">
      <h3 style={{marginBottom:10}}>Deep Linking</h3>
      <div className="dl-nav">
        {Object.keys(pages).map(p => (
          <button key={p} className={\`dl-link \${p === page ? 'active' : ''}\`} onClick={() => navigate(p)}>
            {pages[p].title}
          </button>
        ))}
      </div>
      <div className="dl-content">
        <h3>{current.title}</h3>
        <p>{current.desc}</p>
        <div className="dl-url">URL hash: #{page}</div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-url-state': `const { useState, useMemo } = React;

const items = [
  { name: 'React', category: 'frontend', year: 2013 },
  { name: 'Vue', category: 'frontend', year: 2014 },
  { name: 'Express', category: 'backend', year: 2010 },
  { name: 'Django', category: 'backend', year: 2005 },
  { name: 'Next.js', category: 'fullstack', year: 2016 },
  { name: 'Remix', category: 'fullstack', year: 2021 },
];

function App() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');

  const filtered = useMemo(() => {
    return items
      .filter(i => category === 'all' || i.category === category)
      .filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => sort === 'year' ? a.year - b.year : a.name.localeCompare(b.name));
  }, [category, search, sort]);

  const urlPreview = '?category=' + category + '&search=' + encodeURIComponent(search) + '&sort=' + sort;

  return (
    <div className="us-wrap">
      <h3 style={{marginBottom:10}}>URL State Sync</h3>
      <div className="us-controls">
        <div className="us-group"><label>Category</label><select value={category} onChange={e => setCategory(e.target.value)}><option value="all">All</option><option value="frontend">Frontend</option><option value="backend">Backend</option><option value="fullstack">Fullstack</option></select></div>
        <div className="us-group"><label>Search</label><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter..." /></div>
        <div className="us-group"><label>Sort</label><select value={sort} onChange={e => setSort(e.target.value)}><option value="name">Name</option><option value="year">Year</option></select></div>
      </div>
      <div className="us-url">{urlPreview}</div>
      <div className="us-result">
        {filtered.map(i => <div className="us-item" key={i.name}>{i.name} <span style={{color:'#555'}}>({i.category}, {i.year})</span></div>)}
        {!filtered.length && <div style={{color:'#555',textAlign:'center'}}>No results</div>}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-back-to-top': `const { useState, useRef, useEffect } = React;

function App() {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const handler = () => {
      const scrollable = el.scrollHeight - el.clientHeight;
      const pct = scrollable > 0 ? (el.scrollTop / scrollable) * 100 : 0;
      setProgress(pct);
      setShow(el.scrollTop > 100);
    };
    el.addEventListener('scroll', handler);
    return () => el.removeEventListener('scroll', handler);
  }, []);

  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="btt-container" ref={ref}>
      <h3 style={{color:'#4fc3f7',marginBottom:12}}>Scroll Progress</h3>
      {Array(20).fill(0).map((_, i) => <p key={i}>Paragraph {i + 1}: Scroll down to see the progress indicator on the back-to-top button.</p>)}
      <button className={\`btt-btn \${show ? 'visible' : ''}\`} onClick={() => ref.current.scrollTo({top:0,behavior:'smooth'})}>
        <svg width="48" height="48"><circle cx="24" cy="24" r="18" fill="none" stroke="#334155" strokeWidth="3" /><circle cx="24" cy="24" r="18" fill="none" stroke="#4fc3f7" strokeWidth="3" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" /></svg>
        <span className="btt-arrow">\\u2191</span>
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-scroll-spy': `const { useState, useRef, useEffect } = React;

const sections = ['Overview', 'Installation', 'Configuration', 'API', 'Examples', 'FAQ'];

function App() {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { root: container, threshold: 0.3 }
    );
    sectionRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (idx) => {
    // TODO: Implement scrollTo
  };

  return (
    <div className="ss-layout">
      <div className="ss-nav">
        {sections.map((s, i) => (
          <div key={s} className={\`ss-nav-item \${i === active ? 'active' : ''}\`} onClick={() => scrollTo(i)}>{s}</div>
        ))}
      </div>
      <div className="ss-content" ref={containerRef}>
        {sections.map((s, i) => (
          <div key={s} className="ss-section" ref={el => sectionRefs.current[i] = el}>
            <h2>{s}</h2>
            <p>Content for the {s} section. Scroll through the sections to see the navigation highlight update automatically using the Intersection Observer API.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-theme-switcher': `const { useState } = React;

function App() {
  const [dark, setDark] = useState(true);

  return (
    <div className={\`theme-wrap \${dark ? 'dark' : 'light'}\`}>
      <div className="theme-toggle">
        <span>{dark ? '\\u{1F319}' : '\\u2600\\uFE0F'}</span>
        <div className="toggle-track" onClick={() => setDark(!dark)}>
          <div className="toggle-thumb" />
        </div>
        <span>{dark ? 'Dark' : 'Light'} Mode</span>
      </div>
      <div className="theme-card"><h4>Card Title</h4><p>This card adapts to the current theme automatically.</p></div>
      <div className="theme-card"><h4>Another Card</h4><p>Toggle the switch above to change between light and dark themes.</p></div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-i18n-locale': `const { useState } = React;

const translations = {
  en: { greeting: 'Hello, World!', desc: 'This page demonstrates internationalization. Switch languages to see translations update in real-time.', cta: 'Get Started', locale: 'English', dir: 'ltr' },
  es: { greeting: '\\u00A1Hola, Mundo!', desc: 'Esta p\\u00E1gina demuestra la internacionalizaci\\u00F3n. Cambia de idioma para ver las traducciones actualizarse en tiempo real.', cta: 'Comenzar', locale: 'Espa\\u00F1ol', dir: 'ltr' },
  ja: { greeting: '\\u3053\\u3093\\u306B\\u3061\\u306F\\u4E16\\u754C\\uFF01', desc: '\\u3053\\u306E\\u30DA\\u30FC\\u30B8\\u306F\\u56FD\\u969B\\u5316\\u3092\\u5B9F\\u6F14\\u3057\\u307E\\u3059\\u3002\\u8A00\\u8A9E\\u3092\\u5207\\u308A\\u66FF\\u3048\\u3066\\u3001\\u30EA\\u30A2\\u30EB\\u30BF\\u30A4\\u30E0\\u3067\\u7FFB\\u8A33\\u304C\\u66F4\\u65B0\\u3055\\u308C\\u308B\\u306E\\u3092\\u3054\\u89A7\\u304F\\u3060\\u3055\\u3044\\u3002', cta: '\\u59CB\\u3081\\u308B', locale: '\\u65E5\\u672C\\u8A9E', dir: 'ltr' },
  ar: { greeting: '\\u0645\\u0631\\u062D\\u0628\\u0627 \\u0628\\u0627\\u0644\\u0639\\u0627\\u0644\\u0645!', desc: '\\u062A\\u0648\\u0636\\u062D \\u0647\\u0630\\u0647 \\u0627\\u0644\\u0635\\u0641\\u062D\\u0629 \\u0627\\u0644\\u062A\\u062F\\u0648\\u064A\\u0644. \\u0642\\u0645 \\u0628\\u062A\\u0628\\u062F\\u064A\\u0644 \\u0627\\u0644\\u0644\\u063A\\u0627\\u062A \\u0644\\u0631\\u0624\\u064A\\u0629 \\u0627\\u0644\\u062A\\u0631\\u062C\\u0645\\u0627\\u062A.', cta: '\\u0627\\u0628\\u062F\\u0623', locale: '\\u0627\\u0644\\u0639\\u0631\\u0628\\u064A\\u0629', dir: 'rtl' },
};

function App() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  return (
    <div className="i18n-wrap">
      <div className="lang-switcher">
        {Object.keys(translations).map(l => (
          <button key={l} className={\`lang-btn \${l === lang ? 'active' : ''}\`} onClick={() => setLang(l)}>
            {translations[l].locale}
          </button>
        ))}
      </div>
      <div className="i18n-card" style={{direction: t.dir}}>
        <h2>{t.greeting}</h2>
        <p>{t.desc}</p>
        <button className="i18n-btn">{t.cta}</button>
        <div className="i18n-meta">Locale: {lang} | Direction: {t.dir}</div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-a11y-focus-trap': `const { useState, useRef, useEffect, useCallback } = React;

function FocusTrap({ children, active }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!active || !ref.current) return;
    const focusable = ref.current.querySelectorAll('input, button, [tabindex]');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const handler = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [active]);

  return <div ref={ref}>{children}</div>;
}

function App() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  const close = useCallback(() => { setOpen(false); triggerRef.current?.focus(); }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, close]);

  return (
    <div>
      <button className="trigger-btn" ref={triggerRef} onClick={() => setOpen(true)}>Open Modal (Focus Trapped)</button>
      <div className="ft-hint">Try tabbing - focus stays inside the modal</div>
      {open && (
        <div className="ft-overlay" role="dialog" aria-modal="true" aria-label="Form dialog">
          <FocusTrap active={open}>
            <div className="ft-modal">
              <h3>Focus Trapped Modal</h3>
              <p>Tab through the fields. Focus wraps from last to first element.</p>
              <div className="ft-field"><label>Name</label><input placeholder="Your name" /></div>
              <div className="ft-field"><label>Email</label><input placeholder="Your email" /></div>
              <div className="ft-btns">
                <button className="ft-cancel" onClick={close}>Cancel</button>
                <button className="ft-confirm" onClick={close}>Confirm</button>
              </div>
            </div>
          </FocusTrap>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-a11y-live-region': `const { useState } = React;

function App() {
  const [messages, setMessages] = useState([]);
  const [polite, setPolite] = useState('');
  const [assertive, setAssertive] = useState('');
  const [status, setStatus] = useState('');

  const announce = (type, text) => {
    // TODO: Announce — update state, handle timing
  };

  return (
    <div className="lr-wrap">
      <h3 style={{marginBottom:10}}>ARIA Live Regions</h3>
      <div className="lr-demo">
        <h4>Trigger Announcements</h4>
        <button className="lr-btn lr-polite" onClick={() => announce('polite', 'Item added to cart (polite)')}>Polite</button>
        <button className="lr-btn lr-assertive" onClick={() => announce('assertive', 'Error: form validation failed! (assertive)')}>Assertive</button>
        <button className="lr-btn lr-status" onClick={() => announce('status', 'Loading complete (status)')}>Status</button>
      </div>
      <div>
        {messages.slice(-5).reverse().map(m => (
          <div key={m.id} className={\`lr-announce \${m.type === 'polite' ? 'pol' : m.type === 'assertive' ? 'ass' : 'stat'}\`}>
            [{m.type}] {m.text}
          </div>
        ))}
      </div>
      <div aria-live="polite" aria-atomic="true" className="sr-only">{polite}</div>
      <div aria-live="assertive" aria-atomic="true" className="sr-only">{assertive}</div>
      <div role="status" aria-atomic="true" className="sr-only">{status}</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-offline-indicator': `const { useState, useEffect } = React;

function App() {
  const [online, setOnline] = useState(true);
  const [simulated, setSimulated] = useState(false);

  useEffect(() => {
    if (simulated) return;
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    setOnline(navigator.onLine);
    return () => { window.removeEventListener('online', goOnline); window.removeEventListener('offline', goOffline); };
  }, [simulated]);

  const toggleSimulate = () => {
    // TODO: Toggle simulate — update state
  };

  return (
    <div className="oi-wrap">
      <h3 style={{marginBottom:10}}>Network Status</h3>
      <div className={\`oi-banner \${online ? 'online' : 'offline'}\`}>
        <span className={\`oi-dot \${online ? 'on' : 'off'}\`} />
        {online ? 'You are online' : 'You are offline - some features may be unavailable'}
      </div>
      <div className="oi-card">
        <p>{online ? 'All features are available. Your connection is stable.' : 'You appear to be offline. Cached content is still available, but new data cannot be fetched.'}</p>
        <button className="oi-btn oi-toggle" onClick={toggleSimulate}>
          Simulate {online ? 'Offline' : 'Online'}
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-websocket-chat': `const { useState, useRef, useEffect } = React;

const botReplies = ['That sounds great!', 'Interesting, tell me more.', 'I see what you mean.', 'Good point!', 'Let me think about that...'];

function App() {
  const [messages, setMessages] = useState([
    { text: 'Hey! How are you?', self: false, time: '10:30' },
    { text: 'Doing great, thanks!', self: true, time: '10:31' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const send = () => {
    // TODO: Send — update state, handle timing, calculate values
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <div className="chat-avatar">B</div>
        <div><div className="chat-name">Bot</div><div className="chat-status">{typing ? 'typing...' : 'online'}</div></div>
      </div>
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={\`msg \${m.self ? 'msg-self' : 'msg-other'}\`}>
            {m.text}<div className="msg-time">{m.time}</div>
          </div>
        ))}
        {typing && <div className="typing">Bot is typing...</div>}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Type a message..." />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-optimistic-update': `const { useState, useCallback } = React;

const fakeApi = () => new Promise((resolve, reject) => {
  setTimeout(() => Math.random() > 0.3 ? resolve() : reject(new Error('Network error')), 800);
});

function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'React Patterns', likes: 42, status: 'saved' },
    { id: 2, name: 'TypeScript Tips', likes: 28, status: 'saved' },
    { id: 3, name: 'CSS Tricks', likes: 35, status: 'saved' },
    { id: 4, name: 'Node.js Guide', likes: 19, status: 'saved' },
  ]);

  const toggleLike = useCallback(async (id) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, likes: i.likes + 1, status: 'saving' } : i));
    try {
      await fakeApi();
      setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'saved' } : i));
    } catch {
      setItems(prev => prev.map(i => i.id === id ? { ...i, likes: i.likes - 1, status: 'failed' } : i));
    }
  }, []);

  return (
    <div className="ou-wrap">
      <h3 style={{marginBottom:10}}>Optimistic Updates</h3>
      {items.map(item => (
        <div key={item.id} className={\`ou-item \${item.status === 'saving' ? 'pending' : ''} \${item.status === 'failed' ? 'error' : ''}\`}>
          <button className="ou-like" onClick={() => toggleLike(item.id)}>\\u2764\\uFE0F</button>
          <span className="ou-count">{item.likes}</span>
          <span>{item.name}</span>
          <span className={\`ou-status \${item.status}\`}>{item.status === 'saving' ? 'Saving...' : item.status === 'failed' ? 'Failed!' : 'Saved'}</span>
        </div>
      ))}
      <div className="ou-note">Click heart to like. ~30% chance of simulated failure with rollback.</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-undo-manager': `const { useState, useCallback } = React;

const colors = ['#4fc3f7', '#f87171', '#4ade80', '#facc15', '#a78bfa', '#1e293b'];
const initGrid = Array(64).fill('#1e293b');

function App() {
  const [grid, setGrid] = useState(initGrid);
  const [history, setHistory] = useState([initGrid]);
  const [histIdx, setHistIdx] = useState(0);
  const [color, setColor] = useState('#4fc3f7');

  const paint = useCallback((idx) => {
    const next = [...grid];
    next[idx] = color;
    const newHistory = [...history.slice(0, histIdx + 1), next];
    setGrid(next);
    setHistory(newHistory);
    setHistIdx(newHistory.length - 1);
  }, [grid, history, histIdx, color]);

  const undo = () => {
    // TODO: Undo — update state
  };
  const redo = () => {
    // TODO: Redo — update state
  };

  return (
    <div className="um-wrap">
      <h3 style={{marginBottom:8}}>Pixel Painter (Undo/Redo)</h3>
      <div className="um-toolbar">
        <button className="um-btn" onClick={undo} disabled={histIdx === 0}>\\u21A9 Undo</button>
        <button className="um-btn" onClick={redo} disabled={histIdx >= history.length - 1}>\\u21AA Redo</button>
        <button className="um-btn" onClick={() => { setGrid(initGrid); setHistory([initGrid]); setHistIdx(0); }}>Clear</button>
        <span style={{marginLeft:'auto',fontSize:11,color:'#555'}}>{histIdx}/{history.length - 1} steps</span>
      </div>
      <div className="um-colors">
        {colors.map(c => <div key={c} className={\`um-color \${c === color ? 'active' : ''}\`} style={{background:c}} onClick={() => setColor(c)} />)}
      </div>
      <div className="um-canvas">
        {grid.map((c, i) => <div key={i} className="um-cell" style={{background:c}} onClick={() => paint(i)} />)}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-clipboard-manager': `const { useState } = React;

function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    'npm install react',
    'git commit -m "initial commit"',
    'console.log("Hello World")',
  ]);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const addToHistory = () => {
    // TODO: Add to history — update state
  };

  const copyText = async (text, idx) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    } catch { setCopiedIdx(idx); setTimeout(() => setCopiedIdx(null), 1500); }
  };

  return (
    <div className="cm-wrap">
      <h3 style={{marginBottom:10}}>Clipboard Manager</h3>
      <div className="cm-input-row">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addToHistory()} placeholder="Type text to copy..." />
        <button onClick={addToHistory}>Copy</button>
      </div>
      <div className="cm-label">History ({history.length} items)</div>
      {history.map((item, i) => (
        <div className="cm-item" key={i}>
          <span className="cm-text">{item}</span>
          <button className={\`cm-copy \${copiedIdx === i ? 'copied' : ''}\`} onClick={() => copyText(item, i)}>
            {copiedIdx === i ? 'Copied!' : 'Copy'}
          </button>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-hotkey-manager': `const { useState, useEffect } = React;

const hotkeys = [
  { keys: ['Ctrl', 'S'], action: 'Save', combo: (e) => (e.ctrlKey || e.metaKey) && e.key === 's' },
  { keys: ['Ctrl', 'Z'], action: 'Undo', combo: (e) => (e.ctrlKey || e.metaKey) && e.key === 'z' },
  { keys: ['Ctrl', 'Shift', 'P'], action: 'Command Palette', combo: (e) => (e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P' },
  { keys: ['Esc'], action: 'Close', combo: (e) => e.key === 'Escape' },
  { keys: ['Ctrl', '/'], action: 'Toggle Comment', combo: (e) => (e.ctrlKey || e.metaKey) && e.key === '/' },
];

function App() {
  const [log, setLog] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      for (const hk of hotkeys) {
        if (hk.combo(e)) {
          e.preventDefault();
          const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          setLog(prev => [{ time, action: hk.action, keys: hk.keys.join('+') }, ...prev].slice(0, 20));
          break;
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="hk-wrap">
      <h3 style={{marginBottom:10}}>Hotkey Manager</h3>
      {hotkeys.map((hk, i) => (
        <div className="hk-item" key={i}>
          <span className="hk-action">{hk.action}</span>
          <div className="hk-keys">{hk.keys.map(k => <span key={k} className="hk-key">{k}</span>)}</div>
        </div>
      ))}
      <div className="hk-log">
        {log.length ? log.map((l, i) => (
          <div key={i} className="hk-log-item"><span className="time">[{l.time}]</span> <span className="action">{l.action}</span> ({l.keys})</div>
        )) : <div style={{color:'#555',fontSize:12,textAlign:'center'}}>Press a shortcut to see it logged here</div>}
      </div>
      <div className="hk-hint">Try pressing the keyboard shortcuts above</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-idle-detector': `const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [idle, setIdle] = useState(0);
  const [status, setStatus] = useState('active');
  const lastActivity = useRef(Date.now());
  const IDLE_THRESHOLD = 5;
  const AWAY_THRESHOLD = 15;

  const resetIdle = useCallback(() => {
    lastActivity.current = Date.now();
    setIdle(0);
    setStatus('active');
  }, []);

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach(e => window.addEventListener(e, resetIdle));
    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - lastActivity.current) / 1000);
      setIdle(seconds);
      if (seconds >= AWAY_THRESHOLD) setStatus('away');
      else if (seconds >= IDLE_THRESHOLD) setStatus('idle');
      else setStatus('active');
    }, 1000);
    return () => {
      events.forEach(e => window.removeEventListener(e, resetIdle));
      clearInterval(interval);
    };
  }, [resetIdle]);

  return (
    <div className="id-wrap">
      <h3>Idle Detector</h3>
      <div className={\`id-circle \${status}\`}>
        <span className="id-icon">{status === 'active' ? '\\u{1F7E2}' : status === 'idle' ? '\\u{1F7E1}' : '\\u{1F534}'}</span>
        <span className="id-label">{status.toUpperCase()}</span>
      </div>
      <div className="id-timer">Idle for: {idle}s</div>
      <div className="id-info">Active: 0-{IDLE_THRESHOLD}s | Idle: {IDLE_THRESHOLD}-{AWAY_THRESHOLD}s | Away: {AWAY_THRESHOLD}s+</div>
      <div className="id-info">Move your mouse or press a key to reset</div>
      <button className="id-btn" onClick={resetIdle}>Manual Reset</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-media-query-hook': `const { useState, useEffect, useCallback } = React;

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);
  return matches;
}

function App() {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');
  const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const device = isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop';
  const icon = isMobile ? '\\u{1F4F1}' : isTablet ? '\\u{1F4BB}' : '\\u{1F5A5}';

  const queries = [
    ['Mobile (<=640px)', isMobile],
    ['Tablet (641-1024px)', isTablet],
    ['Desktop (>1024px)', isDesktop],
    ['Prefers Dark Mode', isDark],
    ['Prefers Reduced Motion', isReducedMotion],
  ];

  return (
    <div className="mq-wrap">
      <h3 style={{marginBottom:10}}>Media Query Hook</h3>
      <div className="mq-card">
        {queries.map(([label, val]) => (
          <div className="mq-row" key={label}>
            <span className="mq-label">{label}</span>
            <span className={\`mq-val \${val}\`}>{val ? 'Yes' : 'No'}</span>
          </div>
        ))}
        <div className="mq-row">
          <span className="mq-label">Viewport</span>
          <span className="mq-val" style={{color:'#4fc3f7'}}>{size.w} x {size.h}</span>
        </div>
      </div>
      <div className="mq-device">
        <div className="mq-device-icon">{icon}</div>
        <div className="mq-device-label">Current: {device}</div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-portal-demo': `const { useState } = React;

function PortalPopup({ onClose }) {
  return ReactDOM.createPortal(
    <div className="pd-tooltip">
      <h4>Portal Popup</h4>
      <p>I rendered outside the parent container via a portal! I escape overflow:hidden.</p>
      <button className="pd-close" onClick={onClose}>Close</button>
    </div>,
    document.getElementById('portal-root')
  );
}

function App() {
  const [showPortal, setShowPortal] = useState(false);
  const [showNormal, setShowNormal] = useState(false);

  return (
    <div className="pd-wrap">
      <h3 style={{marginBottom:10}}>React Portal</h3>
      <div className="pd-container">
        <h4>Container (overflow: hidden)</h4>
        <p>This container has overflow:hidden. Normal popups get clipped, but portals escape!</p>
        <div className="pd-overflow-note">overflow: hidden is set on this container</div>
        <button className="pd-btn portal" onClick={() => setShowPortal(true)}>Show Portal Popup</button>
        <button className="pd-btn normal" onClick={() => setShowNormal(!showNormal)}>Show Normal Popup</button>
        {showNormal && <div className="pd-normal-popup">I am clipped by overflow:hidden! <button style={{marginTop:4,display:'block'}} className="pd-close" onClick={() => setShowNormal(false)}>x</button></div>}
      </div>
      {showPortal && <PortalPopup onClose={() => setShowPortal(false)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-error-boundary': `const { useState, Component } = React;

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div className="eb-fallback">
          <h3>Something went wrong</h3>
          <p>An error occurred while rendering this component.</p>
          <code>{this.state.error.message}</code>
          <button className="eb-retry" onClick={() => { this.setState({ error: null }); this.props.onRetry?.(); }}>Try Again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function BuggyComponent({ shouldCrash }) {
  if (shouldCrash) throw new Error('Component crashed! This is a simulated error.');
  return <div className="eb-card"><h4>Working Component</h4><p>This component is rendering correctly.</p></div>;
}

function App() {
  const [crash, setCrash] = useState(false);
  const [key, setKey] = useState(0);

  return (
    <div className="eb-wrap">
      <h3 style={{marginBottom:10}}>Error Boundary</h3>
      <ErrorBoundary key={key} onRetry={() => { setCrash(false); setKey(k => k + 1); }}>
        <BuggyComponent shouldCrash={crash} />
      </ErrorBoundary>
      <button className="eb-btn" onClick={() => setCrash(true)}>Trigger Error</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-retry-mechanism': `const { useState, useCallback } = React;

function App() {
  const [status, setStatus] = useState('idle');
  const [attempts, setAttempts] = useState(0);
  const [maxRetries, setMaxRetries] = useState(3);
  const [failRate, setFailRate] = useState(70);
  const [log, setLog] = useState([]);

  const addLog = (msg, type) => {
    // TODO: Add log — update state
  };

  const fetchWithRetry = useCallback(async () => {
    setStatus('loading');
    setAttempts(0);
    setLog([]);

    for (let i = 0; i <= maxRetries; i++) {
      setAttempts(i + 1);
      const delay = Math.min(1000 * Math.pow(2, i), 8000);
      if (i > 0) {
        addLog('Waiting ' + delay + 'ms (backoff)...', 'info');
        await new Promise(r => setTimeout(r, delay));
      }
      addLog('Attempt ' + (i + 1) + '/' + (maxRetries + 1) + '...', 'info');
      await new Promise(r => setTimeout(r, 500));

      if (Math.random() * 100 > failRate) {
        addLog('Success!', 'ok');
        setStatus('success');
        return;
      }
      addLog('Failed (simulated ' + failRate + '% fail rate)', 'err');
    }
    addLog('All retries exhausted.', 'err');
    setStatus('error');
  }, [maxRetries, failRate]);

  return (
    <div className="rt-wrap">
      <h3 style={{marginBottom:10}}>Retry with Backoff</h3>
      <div className="rt-settings">
        <div><label>Max Retries</label><br/><select value={maxRetries} onChange={e => setMaxRetries(+e.target.value)}>{[1,2,3,5].map(n => <option key={n} value={n}>{n}</option>)}</select></div>
        <div><label>Fail Rate</label><br/><select value={failRate} onChange={e => setFailRate(+e.target.value)}>{[30,50,70,90].map(n => <option key={n} value={n}>{n}%</option>)}</select></div>
      </div>
      <div className="rt-card">
        <div className="rt-status">
          <span className={\`rt-dot \${status}\`} />
          <span className="rt-label">{status === 'idle' ? 'Ready' : status === 'loading' ? 'Fetching...' : status === 'success' ? 'Success!' : 'Failed'}</span>
        </div>
        {attempts > 0 && <div className="rt-attempts">Attempts: {attempts}/{maxRetries + 1}</div>}
        <div className="rt-log">
          {log.map((l, i) => <div key={i} className={l.type}>[{l.time}] {l.msg}</div>)}
        </div>
      </div>
      <button className="rt-btn" onClick={fetchWithRetry} disabled={status === 'loading'}>
        {status === 'loading' ? 'Retrying...' : 'Start Fetch'}
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-virtual-list-advanced': `const { useState, useRef, useEffect, useMemo, useCallback } = React;

const TOTAL = 10000;
const ITEM_HEIGHT = 48;
const colors = ['#4fc3f7','#a78bfa','#fb923c','#4ade80','#f87171','#facc15'];
const names = ['Alice','Bob','Charlie','Diana','Eve','Frank','Grace','Hank','Iris','Jack'];

const data = Array.from({ length: TOTAL }, (_, i) => ({
  id: i,
  name: names[i % names.length] + ' #' + i,
  email: 'user' + i + '@example.com',
  color: colors[i % colors.length],
}));

function App() {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(300);

  useEffect(() => {
    const el = containerRef.current;
    setContainerHeight(el.clientHeight);
    const handler = () => setScrollTop(el.scrollTop);
    el.addEventListener('scroll', handler);
    return () => el.removeEventListener('scroll', handler);
  }, []);

  const startIdx = Math.floor(scrollTop / ITEM_HEIGHT);
  const endIdx = Math.min(startIdx + Math.ceil(containerHeight / ITEM_HEIGHT) + 2, TOTAL);
  const visibleItems = data.slice(startIdx, endIdx);

  return (
    <div className="vl-wrap">
      <h3 style={{marginBottom:6}}>Virtual List ({TOTAL.toLocaleString()} items)</h3>
      <div className="vl-info">
        <span>Rendering: {visibleItems.length} items</span>
        <span>Scroll: {Math.round(scrollTop)}px</span>
      </div>
      <div className="vl-container" ref={containerRef}>
        <div style={{ height: TOTAL * ITEM_HEIGHT, position: 'relative' }}>
          {visibleItems.map(item => (
            <div key={item.id} className="vl-item" style={{ top: item.id * ITEM_HEIGHT, height: ITEM_HEIGHT }}>
              <span className="vl-idx">{item.id}</span>
              <div className="vl-avatar" style={{background:item.color}}>{item.name[0]}</div>
              <div><div className="vl-name">{item.name}</div><div className="vl-email">{item.email}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-spinner': `const { useState } = React;

function App() {
  return (
    <div className="sp-wrap">
      <h3 style={{marginBottom:16,textAlign:'center'}}>Spinners</h3>
      <h4 style={{fontSize:13,color:'#94a3b8',marginBottom:8}}>Sizes</h4>
      <div className="sp-row">
        <div><div className="spinner sm" /><div className="sp-label">Small</div></div>
        <div><div className="spinner md" /><div className="sp-label">Medium</div></div>
        <div><div className="spinner lg" /><div className="sp-label">Large</div></div>
      </div>
      <h4 style={{fontSize:13,color:'#94a3b8',marginBottom:8}}>Colors</h4>
      <div className="sp-row">
        <div className="spinner md" />
        <div className="spinner md green" />
        <div className="spinner md red" />
        <div className="spinner md orange" />
      </div>
      <h4 style={{fontSize:13,color:'#94a3b8',marginBottom:8}}>Dots</h4>
      <div className="sp-row">
        <div className="dots-spinner"><span /><span /><span /></div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-chip': `const { useState } = React;

function App() {
  const [chips, setChips] = useState(['React', 'TypeScript', 'CSS', 'Node.js', 'GraphQL']);

  const remove = (idx) => {
    // TODO: Remove — update state, filter items, remove item
  };

  return (
    <div className="chip-wrap">
      <h3 style={{marginBottom:12}}>Chips</h3>
      <h4 style={{fontSize:13,color:'#94a3b8',marginBottom:8}}>Variants</h4>
      <div className="chip-row">
        <span className="chip chip-blue">Blue</span>
        <span className="chip chip-green">Green</span>
        <span className="chip chip-red">Red</span>
        <span className="chip chip-yellow">Yellow</span>
        <span className="chip chip-outline">Outline</span>
      </div>
      <h4 style={{fontSize:13,color:'#94a3b8',marginBottom:8}}>Dismissible</h4>
      <div className="chip-row">
        {chips.map((c, i) => (
          <span key={c} className="chip chip-blue">
            {c}
            <button className="chip-dismiss" onClick={() => remove(i)}>&times;</button>
          </span>
        ))}
      </div>
      {chips.length === 0 && <div style={{fontSize:13,color:'#555'}}>All chips dismissed. Refresh to reset.</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-divider': `const { useState } = React;

function Divider({ text, variant = '' }) {
  return (
    <div className={\`divider \${variant}\`}>
      <div className="divider-line" />
      {text && <span className="divider-text">{text}</span>}
      {text && <div className="divider-line" />}
    </div>
  );
}

function App() {
  return (
    <div className="div-wrap">
      <h3 style={{marginBottom:8}}>Dividers</h3>
      <div className="section-card">Content above</div>
      <Divider />
      <div className="section-card">Simple divider</div>
      <Divider text="OR" />
      <div className="section-card">With text label</div>
      <Divider text="DASHED" variant="divider-dashed" />
      <div className="section-card">Dashed style</div>
      <Divider text="ACCENT" variant="divider-accent" />
      <div className="section-card">Accent color</div>
      <h4 style={{fontSize:13,color:'#94a3b8',marginTop:16,marginBottom:8}}>Vertical</h4>
      <div className="v-demo">
        <span className="v-item">Home</span>
        <span className="v-divider" />
        <span className="v-item">About</span>
        <span className="v-divider" />
        <span className="v-item">Contact</span>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-alert-banner': `const { useState } = React;

const alerts = [
  { type: 'info', icon: '\\u{2139}\\uFE0F', title: 'Info', msg: 'A new update is available for download.' },
  { type: 'success', icon: '\\u2705', title: 'Success', msg: 'Your changes have been saved successfully.' },
  { type: 'warning', icon: '\\u26A0\\uFE0F', title: 'Warning', msg: 'Your storage is almost full (90% used).' },
  { type: 'error', icon: '\\u274C', title: 'Error', msg: 'Failed to process payment. Please try again.' },
];

function App() {
  const [visible, setVisible] = useState(alerts.map(() => true));

  const dismiss = (idx) => {
    // TODO: Dismiss — update state
  };

  const reset = () => {
    // TODO: Reset — update state
  };

  return (
    <div className="ab-wrap">
      <h3 style={{marginBottom:12}}>Alert Banners</h3>
      {alerts.map((a, i) => visible[i] && (
        <div key={i} className={\`alert \${a.type}\`}>
          <span className="alert-icon">{a.icon}</span>
          <div className="alert-body"><div className="alert-title">{a.title}</div><div className="alert-msg">{a.msg}</div></div>
          <button className="alert-close" onClick={() => dismiss(i)}>&times;</button>
        </div>
      ))}
      {visible.some(v => !v) && <button style={{padding:'6px 12px',border:'none',borderRadius:6,background:'#334155',color:'#e0e0e0',cursor:'pointer',fontSize:12}} onClick={reset}>Reset All</button>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-callout': `const { useState } = React;

function Callout({ type, title, children }) {
  const icons = { note: '\\u{1F4DD}', tip: '\\u{1F4A1}', warning: '\\u26A0\\uFE0F', danger: '\\u{1F6A8}' };
  return (
    <div className={\`callout \${type}\`}>
      <div className="callout-header">{icons[type]} {title}</div>
      <p>{children}</p>
    </div>
  );
}

function App() {
  return (
    <div className="co-wrap">
      <h3 style={{marginBottom:12}}>Callouts</h3>
      <Callout type="note" title="Note">This is general information that might be useful to the reader.</Callout>
      <Callout type="tip" title="Tip">Use keyboard shortcuts to speed up your workflow significantly.</Callout>
      <Callout type="warning" title="Warning">This action cannot be undone. Please proceed with caution.</Callout>
      <Callout type="danger" title="Danger">Deleting this resource will permanently remove all associated data.</Callout>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-empty-state-v2': `const { useState } = React;

const states = [
  { icon: '\\u{1F4E6}', title: 'No Projects Yet', desc: 'Create your first project to get started building something amazing.', action: 'Create Project' },
  { icon: '\\u{1F50D}', title: 'No Results Found', desc: 'Try adjusting your search or filter to find what you are looking for.', action: 'Clear Filters' },
  { icon: '\\u{1F514}', title: 'No Notifications', desc: 'You are all caught up! New notifications will appear here.', action: 'Settings' },
];

function App() {
  const [active, setActive] = useState(0);
  const s = states[active];

  return (
    <div className="es-wrap">
      <h3 style={{marginBottom:10}}>Empty States</h3>
      <div className="es-tabs">
        {states.map((st, i) => (
          <button key={i} className={\`es-tab \${i === active ? 'active' : ''}\`} onClick={() => setActive(i)}>{st.title.split(' ').slice(1).join(' ')}</button>
        ))}
      </div>
      <div className="empty-state">
        <div className="es-icon">{s.icon}</div>
        <div className="es-title">{s.title}</div>
        <div className="es-desc">{s.desc}</div>
        <button className="es-btn">{s.action}</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-avatar-group': `const { useState } = React;

const users = [
  { name: 'Alice', color: '#4fc3f7' },
  { name: 'Bob', color: '#a78bfa' },
  { name: 'Carol', color: '#fb923c' },
  { name: 'Dan', color: '#4ade80' },
  { name: 'Eve', color: '#f87171' },
  { name: 'Frank', color: '#facc15' },
  { name: 'Grace', color: '#4fc3f7' },
];

function AvatarGroup({ people, max = 4, className = '' }) {
  const visible = people.slice(0, max);
  const remaining = people.length - max;

  return (
    <div className={\`avatar-group \${className}\`}>
      {visible.map((p, i) => (
        <div key={i} className="ag-item" style={{ background: p.color, zIndex: visible.length - i }}>
          {p.name[0]}
          <span className="ag-tooltip">{p.name}</span>
        </div>
      ))}
      {remaining > 0 && <div className="ag-item ag-more" style={{zIndex: 0}}>+{remaining}</div>}
    </div>
  );
}

function App() {
  return (
    <div className="ag-wrap">
      <h3 style={{marginBottom:16}}>Avatar Groups</h3>
      <h4 style={{fontSize:13,color:'#94a3b8',marginBottom:8}}>Default (max 4)</h4>
      <AvatarGroup people={users} max={4} />
      <h4 style={{fontSize:13,color:'#94a3b8',marginTop:20,marginBottom:8}}>Show all</h4>
      <AvatarGroup people={users} max={7} />
      <div className="ag-sizes">
        <h4 style={{fontSize:13,color:'#94a3b8',marginBottom:8}}>Small</h4>
        <AvatarGroup people={users} max={5} className="ag-sm" />
        <h4 style={{fontSize:13,color:'#94a3b8',marginTop:16,marginBottom:8}}>Large</h4>
        <AvatarGroup people={users.slice(0, 4)} max={4} className="ag-lg" />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-breadcrumb-overflow': `const { useState, useRef, useEffect } = React;

const paths = ['Home', 'Documents', 'Projects', 'Web', 'Frontend', 'Components', 'Breadcrumbs'];

function Breadcrumbs({ items, maxVisible = 3 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const needsCollapse = items.length > maxVisible;
  const first = items[0];
  const last = items.slice(-(maxVisible - 1));
  const hidden = needsCollapse ? items.slice(1, items.length - maxVisible + 1) : [];

  const renderItem = (item, isLast) => (
    <span key={item} className={\`bc-item \${isLast ? 'current' : ''}\`}>{item}</span>
  );

  return (
    <div className="breadcrumbs">
      {renderItem(first, !needsCollapse && items.length === 1)}
      {needsCollapse && (
        <>
          <span className="bc-sep">/</span>
          <span className="bc-ellipsis" ref={ref}>
            <span className="bc-item" onClick={() => setMenuOpen(!menuOpen)}>...</span>
            {menuOpen && (
              <div className="bc-menu">
                {hidden.map(h => <div key={h} className="bc-menu-item" onClick={() => setMenuOpen(false)}>{h}</div>)}
              </div>
            )}
          </span>
        </>
      )}
      {(needsCollapse ? last : items.slice(1)).map((item, i, arr) => (
        <React.Fragment key={item}>
          <span className="bc-sep">/</span>
          {renderItem(item, i === arr.length - 1)}
        </React.Fragment>
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="bc-wrap">
      <h3 style={{marginBottom:12}}>Breadcrumb Overflow</h3>
      <h4 style={{fontSize:12,color:'#555',marginBottom:4}}>Full path (7 items, collapsed)</h4>
      <Breadcrumbs items={paths} maxVisible={3} />
      <h4 style={{fontSize:12,color:'#555',marginBottom:4}}>Short path (no collapse)</h4>
      <Breadcrumbs items={paths.slice(0, 3)} maxVisible={3} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-truncated-text': `const { useState } = React;

function TruncatedText({ text, lines = 3 }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div className={\`tt-text \${expanded ? '' : 'clamped'}\`}
        style={expanded ? {} : { WebkitLineClamp: lines }}>
        {text}
      </div>
      <button className="tt-toggle" onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Show less' : 'Read more'}
      </button>
    </div>
  );
}

const longText = 'React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called components. React has been designed from the start for gradual adoption, and you can use as little or as much React as you need. Whether you want to get a taste of React, add some interactivity to a simple HTML page, or start a complex React-powered app, this section will help you get started. It was created by Facebook and has grown into one of the most popular frontend libraries in the world.';

function App() {
  return (
    <div className="tt-wrap">
      <h3 style={{marginBottom:12}}>Truncated Text</h3>
      <div className="tt-card">
        <h4>2 Lines</h4>
        <TruncatedText text={longText} lines={2} />
      </div>
      <div className="tt-card">
        <h4>3 Lines</h4>
        <TruncatedText text={longText} lines={3} />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-responsive-grid': `const { useState } = React;

function App() {
  const [minWidth, setMinWidth] = useState(120);
  const items = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="rg-wrap">
      <h3 style={{marginBottom:8}}>Responsive Grid</h3>
      <div className="rg-controls">
        <label>Min card width: {minWidth}px</label>
        <input type="range" min={80} max={200} value={minWidth} onChange={e => setMinWidth(+e.target.value)} />
      </div>
      <div className="rg-grid" style={{ gridTemplateColumns: \`repeat(auto-fit, minmax(\${minWidth}px, 1fr))\` }}>
        {items.map(i => (
          <div className="rg-card" key={i}>
            <div className="rg-card-num">{i}</div>
            <div className="rg-card-label">Card {i}</div>
          </div>
        ))}
      </div>
      <div className="rg-info">grid-template-columns: repeat(auto-fit, minmax({minWidth}px, 1fr))</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-masonry-layout': `const { useState } = React;

const cards = [
  { icon: '\\u{1F3A8}', title: 'Design', desc: 'Beautiful interfaces with modern design principles.' },
  { icon: '\\u{1F680}', title: 'Performance', desc: 'Optimized for speed.' },
  { icon: '\\u{1F512}', title: 'Security', desc: 'Built-in authentication and authorization with industry-standard protocols and encryption.' },
  { icon: '\\u{1F4F1}', title: 'Mobile', desc: 'Responsive and touch-friendly.' },
  { icon: '\\u{2699}', title: 'Config', desc: 'Highly customizable with environment variables, config files, and runtime options for any deployment.' },
  { icon: '\\u{1F4CA}', title: 'Analytics', desc: 'Real-time insights and dashboards.' },
  { icon: '\\u{1F310}', title: 'i18n', desc: 'Multi-language support with RTL layout handling and locale-aware formatting for dates and numbers.' },
  { icon: '\\u{1F9EA}', title: 'Testing', desc: 'Comprehensive test suite.' },
  { icon: '\\u{1F4E6}', title: 'Deploy', desc: 'One-click deployments.' },
];

function App() {
  const [cols, setCols] = useState(3);

  return (
    <div className="mas-wrap">
      <h3 style={{marginBottom:8}}>Masonry Layout</h3>
      <div className="mas-cols">
        {[2, 3, 4].map(n => <button key={n} className={cols === n ? 'active' : ''} onClick={() => setCols(n)}>{n} Columns</button>)}
      </div>
      <div className="masonry" style={{ columnCount: cols }}>
        {cards.map((c, i) => (
          <div className="mas-item" key={i}>
            <div className="mas-icon">{c.icon}</div>
            <div className="mas-title">{c.title}</div>
            <div className="mas-desc">{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-aspect-ratio-box': `const { useState } = React;

const ratios = [
  { label: '1:1', value: '1/1' },
  { label: '16:9', value: '16/9' },
  { label: '4:3', value: '4/3' },
  { label: '3:2', value: '3/2' },
  { label: '21:9', value: '21/9' },
  { label: '9:16', value: '9/16' },
];

function App() {
  const [selected, setSelected] = useState('16/9');

  return (
    <div className="ar-wrap">
      <h3 style={{marginBottom:8}}>Aspect Ratio Boxes</h3>
      <div className="ar-grid">
        {ratios.map(r => (
          <div key={r.value} className="ar-box" style={{ aspectRatio: r.value }}
            onClick={() => setSelected(r.value)}>
            <div>
              <div className="ar-ratio">{r.label}</div>
              <div className="ar-label">aspect-ratio: {r.value}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="ar-controls">
        <label>Preview:</label>
        {ratios.map(r => (
          <button key={r.value} className={\`ar-btn \${selected === r.value ? 'active' : ''}\`}
            onClick={() => setSelected(r.value)}>{r.label}</button>
        ))}
      </div>
      <div className="ar-preview" style={{ aspectRatio: selected }}>
        <span>{ratios.find(r => r.value === selected)?.label}</span>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-scroll-snap': `const { useState, useRef, useEffect } = React;

const cards = [
  { icon: '\\u{1F3AF}', title: 'Focus', desc: 'Stay focused on what matters most with smart prioritization.' },
  { icon: '\\u26A1', title: 'Speed', desc: 'Lightning-fast performance with optimized rendering pipeline.' },
  { icon: '\\u{1F6E1}', title: 'Secure', desc: 'Enterprise-grade security with end-to-end encryption.' },
  { icon: '\\u{1F4CA}', title: 'Insights', desc: 'Real-time analytics and actionable business insights.' },
  { icon: '\\u{1F91D}', title: 'Collaborate', desc: 'Seamless team collaboration with real-time sync.' },
];

function App() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    const handler = () => {
      const idx = Math.round(el.scrollLeft / 292);
      setActiveIdx(Math.min(idx, cards.length - 1));
    };
    el.addEventListener('scroll', handler);
    return () => el.removeEventListener('scroll', handler);
  }, []);

  const scrollToCard = (idx) => {
    // TODO: Implement scrollToCard
  };

  return (
    <div className="ss-wrap">
      <h3 style={{marginBottom:10}}>Scroll Snap Carousel</h3>
      <div className="ss-container" ref={containerRef}>
        {cards.map((c, i) => (
          <div className="ss-card" key={i}>
            <div className="ss-card-icon">{c.icon}</div>
            <h4>{c.title}</h4>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>
      <div className="ss-dots">
        {cards.map((_, i) => <div key={i} className={\`ss-dot \${i === activeIdx ? 'active' : ''}\`} onClick={() => scrollToCard(i)} />)}
      </div>
      <div className="ss-hint">Swipe or scroll horizontally</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-parallax': `const { useState, useRef, useEffect, useCallback } = React;

const sections = [
  { bg: '\\u{1F30C}', title: 'Explore', desc: 'Discover new horizons with parallax scrolling.', cls: 's1' },
  { bg: '\\u{1F3D4}', title: 'Adventure', desc: 'Each layer moves at a different speed creating depth.', cls: 's2' },
  { bg: '\\u{1F30A}', title: 'Create', desc: 'Build immersive experiences with simple scroll effects.', cls: 's3' },
];

function App() {
  const containerRef = useRef(null);
  const bgRefs = useRef([]);
  const speeds = [0.3, 0.5, 0.2];

  const onScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const scrollTop = el.scrollTop;
    bgRefs.current.forEach((bg, i) => {
      if (bg) {
        const offset = scrollTop * speeds[i];
        bg.style.transform = 'translateY(' + offset + 'px)';
      }
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return (
    <div className="px-container" ref={containerRef}>
      {sections.map((s, i) => (
        <div className={\`px-section \${s.cls}\`} key={i}>
          <div className="px-bg" ref={el => bgRefs.current[i] = el}>{s.bg}</div>
          <div className="px-content">
            <h2>{s.title}</h2>
            <p>{s.desc}</p>
          </div>
        </div>
      ))}
      <div style={{height:200,background:'#0f172a',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <p style={{color:'#555',fontSize:14}}>Scroll up to see the parallax effect</p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-animated-counter': `const { useState, useEffect, useRef, useCallback } = React;

function useAnimatedCounter(target, duration = 2000) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);

  const animate = useCallback(() => {
    setValue(0);
    startTimeRef.current = null;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const step = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
  }, [target, duration]);

  useEffect(() => { animate(); return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); }; }, [animate]);

  return [value, animate];
}

function Counter({ target, label, color, prefix = '', suffix = '' }) {
  const [val, replay] = useAnimatedCounter(target, 2000);
  return (
    <div className="ac-card" onClick={replay} style={{cursor:'pointer'}}>
      <div className={\`ac-num \${color}\`}>{prefix}{val.toLocaleString()}{suffix}</div>
      <div className="ac-label">{label}</div>
    </div>
  );
}

function App() {
  const [key, setKey] = useState(0);
  return (
    <div className="ac-wrap" key={key}>
      <h3 style={{marginBottom:12,textAlign:'center'}}>Animated Counters</h3>
      <div className="ac-grid">
        <Counter target={12847} label="Users" color="blue" />
        <Counter target={98} label="Uptime" color="green" suffix="%" />
        <Counter target={4200} label="Revenue" color="orange" prefix="$" />
      </div>
      <button className="ac-btn" onClick={() => setKey(k => k + 1)}>Replay Animation</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,

  'react-confetti': `const { useRef, useCallback } = React;

const colors = ['#4fc3f7', '#f87171', '#4ade80', '#facc15', '#a78bfa', '#fb923c', '#ec4899'];

function App() {
  const canvasRef = useRef(null);

  const fire = useCallback(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const particles = [];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 15,
        vy: Math.random() * -12 - 4,
        w: Math.random() * 8 + 4,
        h: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.15 + Math.random() * 0.1,
        opacity: 1,
      });
    }

    let frame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = 0;
      particles.forEach(p => {
        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.opacity -= 0.005;
        if (p.opacity <= 0) return;
        alive++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (alive > 0) frame = requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="conf-wrap">
      <canvas ref={canvasRef} />
      <button className="conf-btn" onClick={fire}>\\u{1F389} Celebrate!</button>
      <div className="conf-msg">Click the button to launch confetti</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
};
