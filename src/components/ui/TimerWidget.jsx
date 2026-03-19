import { useState, useEffect, useRef } from 'react';
import { Clock, Play, Pause, RotateCcw, Plus } from 'lucide-react';

function pad(n) {
  return String(n).padStart(2, '0');
}

function SingleTimer({ label, accent, initialSeconds = 0 }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const reset = () => { setRunning(false); setSeconds(initialSeconds); };
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const progress = (seconds % 60) / 60;
  const radius = 32;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className="flex items-center justify-between px-4 py-3 rounded-xl"
      style={{ background: 'rgba(51,65,85,0.2)', border: '1px solid rgba(51,65,85,0.3)' }}
    >
      {/* SVG ring */}
      <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
        <svg width="64" height="64" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="32" cy="32" r={radius} fill="none" stroke="rgba(51,65,85,0.5)" strokeWidth="3" />
          <circle
            cx="32" cy="32" r={radius}
            fill="none"
            stroke={accent}
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.9s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Clock size={16} style={{ color: accent }} />
        </div>
      </div>

      {/* Time display */}
      <div className="flex-1 px-3">
        <p className="text-xs text-slate-500 mb-0.5 font-medium">{label}</p>
        <p
          className="text-xl font-bold text-white"
          style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0.05em' }}
        >
          {h > 0 ? `${pad(h)}:` : ''}{pad(m)}:{pad(s)}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setRunning(r => !r)}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
          style={{ background: running ? 'rgba(239,68,68,0.15)' : `${accent}22`, color: running ? '#f87171' : accent }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
        >
          {running ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <button
          onClick={reset}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
          style={{ background: 'rgba(51,65,85,0.4)', color: '#64748b' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#cbd5e1'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; }}
        >
          <RotateCcw size={13} />
        </button>
      </div>
    </div>
  );
}

const DEFAULT_TIMERS = [
  { label: 'Procedure Timer',   accent: '#3b82f6', initialSeconds: 0 },
  { label: 'Consultation',      accent: '#22c55e', initialSeconds: 0 },
  { label: 'Break Timer',       accent: '#f97316', initialSeconds: 0 },
];

export default function TimerWidget({ className = '' }) {
  const [timers, setTimers] = useState(DEFAULT_TIMERS);

  const addTimer = () => {
    const colors = ['#8b5cf6', '#06b6d4', '#eab308'];
    setTimers(t => [
      ...t,
      { label: `Timer ${t.length + 1}`, accent: colors[t.length % colors.length], initialSeconds: 0 }
    ]);
  };

  return (
    <div
      className={`rounded-2xl p-5 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #1a2540 100%)',
        border: '1px solid rgba(51,65,85,0.5)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(249,115,22,0.15)' }}
          >
            <Clock size={16} color="#f97316" />
          </div>
          <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Active Timers
          </h3>
        </div>
        <button
          onClick={addTimer}
          className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-all"
          style={{ background: 'rgba(37,99,235,0.15)', color: '#60a5fa' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,99,235,0.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,99,235,0.15)'}
        >
          <Plus size={12} /> Add
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {timers.map((t, i) => (
          <SingleTimer key={i} {...t} />
        ))}
      </div>
    </div>
  );
}
