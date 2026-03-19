import { UserPlus, CalendarPlus, FileText, ClipboardList, MessageSquare, Activity } from 'lucide-react';

const ACTIONS = [
  { icon: UserPlus,      label: 'Add Patient',    color: '#3b82f6', bg: 'rgba(59,130,246,0.12)'  },
  { icon: CalendarPlus,  label: 'Book Slot',      color: '#22c55e', bg: 'rgba(34,197,94,0.12)'   },
  { icon: FileText,      label: 'New Report',     color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)'  },
  { icon: ClipboardList, label: 'Add Task',       color: '#f97316', bg: 'rgba(249,115,22,0.12)'  },
  { icon: MessageSquare, label: 'Send Message',   color: '#06b6d4', bg: 'rgba(6,182,212,0.12)'   },
  { icon: Activity,      label: 'View Vitals',    color: '#eab308', bg: 'rgba(234,179,8,0.12)'   },
];

export default function QuickActions({ className = '' }) {
  return (
    <div
      className={`rounded-2xl p-5 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #1a2540 100%)',
        border: '1px solid rgba(51,65,85,0.5)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      }}
    >
      <h3 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Quick Actions
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {ACTIONS.map(({ icon: Icon, label, color, bg }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-2 py-3 px-2 rounded-xl transition-all duration-200 cursor-pointer"
            style={{ background: bg, border: `1px solid ${color}22` }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 6px 16px ${color}30`;
              e.currentTarget.style.borderColor = `${color}55`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = `${color}22`;
            }}
          >
            <Icon size={20} style={{ color }} strokeWidth={1.8} />
            <span className="text-xs font-medium text-slate-300 text-center leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
