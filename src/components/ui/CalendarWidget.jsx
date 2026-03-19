import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

const EVENTS = {
  3:  [{ color: '#3b82f6', label: 'Team Meeting' }],
  7:  [{ color: '#22c55e', label: 'Patient Check' }],
  12: [{ color: '#f97316', label: 'Surgery' }],
  15: [{ color: '#8b5cf6', label: 'Conference' }],
  18: [{ color: '#ef4444', label: 'Emergency' }],
  22: [{ color: '#3b82f6', label: 'Lab Results' }],
  25: [{ color: '#22c55e', label: 'Follow-up' }],
  28: [{ color: '#eab308', label: 'Training' }],
};

export default function CalendarWidget({ className = '' }) {
  const today = new Date();
  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(today.getDate());

  const year  = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prev = () => setCurrent(new Date(year, month - 1, 1));
  const next = () => setCurrent(new Date(year, month + 1, 1));

  const isToday = d => d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div
      className={`rounded-2xl p-5 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #1a2540 100%)',
        border: '1px solid rgba(51,65,85,0.5)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(37,99,235,0.15)' }}
          >
            <Calendar size={16} color="#3b82f6" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {MONTHS[month]} {year}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={prev}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: 'rgba(51,65,85,0.5)', color: '#94a3b8' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#334155'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(51,65,85,0.5)'; e.currentTarget.style.color = '#94a3b8'; }}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={next}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: 'rgba(51,65,85,0.5)', color: '#94a3b8' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#334155'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(51,65,85,0.5)'; e.currentTarget.style.color = '#94a3b8'; }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-xs font-medium text-slate-500 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, idx) => {
          if (!day) return <div key={`e-${idx}`} />;
          const hasEvent  = EVENTS[day];
          const isSel     = day === selected;
          const todayDate = isToday(day);
          return (
            <button
              key={day}
              onClick={() => setSelected(day)}
              className="relative flex flex-col items-center justify-center rounded-lg py-1.5 transition-all duration-150"
              style={{
                background: isSel
                  ? 'linear-gradient(135deg, #1d4ed8, #2563eb)'
                  : todayDate
                  ? 'rgba(37,99,235,0.15)'
                  : 'transparent',
                color: isSel ? '#fff' : todayDate ? '#93c5fd' : '#94a3b8',
                fontWeight: isSel || todayDate ? 600 : 400,
                fontSize: '0.75rem',
                boxShadow: isSel ? '0 0 12px rgba(37,99,235,0.4)' : 'none',
                border: todayDate && !isSel ? '1px solid rgba(37,99,235,0.4)' : '1px solid transparent',
              }}
            >
              {day}
              {hasEvent && (
                <div className="flex gap-0.5 mt-0.5">
                  {hasEvent.slice(0, 2).map((ev, i) => (
                    <span
                      key={i}
                      className="w-1 h-1 rounded-full"
                      style={{ background: isSel ? 'rgba(255,255,255,0.7)' : ev.color }}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected day events */}
      {EVENTS[selected] && (
        <div className="mt-4 border-t border-slate-700/50 pt-4">
          <p className="text-xs text-slate-500 mb-2 font-medium">
            Events on {MONTHS[month]} {selected}
          </p>
          {EVENTS[selected].map((ev, i) => (
            <div
              key={i}
              className="flex items-center gap-2 py-1.5 px-3 rounded-lg mb-1"
              style={{ background: 'rgba(51,65,85,0.3)' }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: ev.color }} />
              <span className="text-xs text-slate-300 font-medium">{ev.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
