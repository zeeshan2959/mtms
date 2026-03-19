import { Activity, UserPlus, FileText, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const FEED = [
  { icon: UserPlus,     color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',  text: 'New patient Ahmed Khan registered',      time: '2 min ago' },
  { icon: CheckCircle,  color: '#22c55e', bg: 'rgba(34,197,94,0.12)',   text: 'Task "Lab results review" completed',    time: '15 min ago' },
  { icon: AlertCircle,  color: '#ef4444', bg: 'rgba(239,68,68,0.12)',   text: 'Urgent: Patient James Wilson escalated', time: '28 min ago' },
  { icon: FileText,     color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)',  text: 'Monthly report submitted successfully',  time: '1 hr ago' },
  { icon: Clock,        color: '#f97316', bg: 'rgba(249,115,22,0.12)',  text: 'Appointment rescheduled for 3:00 PM',    time: '2 hr ago' },
  { icon: CheckCircle,  color: '#22c55e', bg: 'rgba(34,197,94,0.12)',   text: 'Equipment maintenance completed',        time: '3 hr ago' },
];

export default function ActivityFeed({ className = '' }) {
  return (
    <div
      className={`rounded-2xl p-5 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #1a2540 100%)',
        border: '1px solid rgba(51,65,85,0.5)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      }}
    >
      <div className="flex items-center gap-2 mb-5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(37,99,235,0.15)' }}
        >
          <Activity size={16} color="#3b82f6" />
        </div>
        <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Recent Activity
        </h3>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div
          className="absolute left-[15px] top-2 bottom-2 w-px"
          style={{ background: 'rgba(51,65,85,0.5)' }}
        />

        <div className="flex flex-col gap-4">
          {FEED.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-start gap-3 pl-1">
                {/* Icon dot */}
                <div
                  className="relative z-10 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: item.bg }}
                >
                  <Icon size={13} style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-sm text-slate-300 leading-snug" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {item.text}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">{item.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
