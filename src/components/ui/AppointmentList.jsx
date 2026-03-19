import { Clock, User, MoreVertical, Video, MapPin } from 'lucide-react';

const APPOINTMENTS = [
  {
    id: 1,
    time: '08:30 AM',
    duration: '30 min',
    patient: 'Ahmed Khan',
    type: 'General Checkup',
    mode: 'in-person',
    status: 'confirmed',
    avatar: 'AK',
    avatarColor: '#1d4ed8',
  },
  {
    id: 2,
    time: '09:15 AM',
    duration: '45 min',
    patient: 'Sarah Johnson',
    type: 'Follow-up Consultation',
    mode: 'video',
    status: 'confirmed',
    avatar: 'SJ',
    avatarColor: '#7c3aed',
  },
  {
    id: 3,
    time: '10:00 AM',
    duration: '60 min',
    patient: 'Omar Farooq',
    type: 'Diagnostic Review',
    mode: 'in-person',
    status: 'pending',
    avatar: 'OF',
    avatarColor: '#0369a1',
  },
  {
    id: 4,
    time: '11:30 AM',
    duration: '30 min',
    patient: 'Maria Gonzalez',
    type: 'Lab Result Review',
    mode: 'video',
    status: 'confirmed',
    avatar: 'MG',
    avatarColor: '#15803d',
  },
  {
    id: 5,
    time: '02:00 PM',
    duration: '90 min',
    patient: 'James Wilson',
    type: 'Surgery Consultation',
    mode: 'in-person',
    status: 'urgent',
    avatar: 'JW',
    avatarColor: '#b91c1c',
  },
];

const STATUS_STYLES = {
  confirmed: { bg: 'rgba(34,197,94,0.12)',   color: '#4ade80',  label: 'Confirmed' },
  pending:   { bg: 'rgba(234,179,8,0.12)',   color: '#fbbf24',  label: 'Pending' },
  urgent:    { bg: 'rgba(239,68,68,0.12)',   color: '#f87171',  label: 'Urgent' },
};

export default function AppointmentList({ className = '' }) {
  return (
    <div
      className={`rounded-2xl p-5 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #1a2540 100%)',
        border: '1px solid rgba(51,65,85,0.5)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(6,182,212,0.15)' }}
          >
            <Clock size={16} color="#06b6d4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Today's Appointments
            </h3>
            <p className="text-xs text-slate-500">{APPOINTMENTS.length} scheduled</p>
          </div>
        </div>
        <button
          className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
          style={{ background: 'rgba(37,99,235,0.15)', color: '#60a5fa' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,99,235,0.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,99,235,0.15)'}
        >
          View all
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {APPOINTMENTS.map(appt => {
          const ss = STATUS_STYLES[appt.status];
          return (
            <div
              key={appt.id}
              className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 cursor-pointer"
              style={{ background: 'rgba(51,65,85,0.15)', border: '1px solid transparent' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(51,65,85,0.3)';
                e.currentTarget.style.borderColor = 'rgba(51,65,85,0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(51,65,85,0.15)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              {/* Time */}
              <div className="text-center flex-shrink-0" style={{ minWidth: 64 }}>
                <p className="text-xs font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {appt.time}
                </p>
                <p className="text-xs text-slate-500">{appt.duration}</p>
              </div>

              {/* Divider */}
              <div className="w-px h-10 rounded-full" style={{ background: 'rgba(51,65,85,0.6)' }} />

              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ background: appt.avatarColor + '33', border: `1.5px solid ${appt.avatarColor}55`, color: appt.avatarColor }}
              >
                {appt.avatar}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {appt.patient}
                  </p>
                  {appt.mode === 'video'
                    ? <Video size={12} color="#06b6d4" />
                    : <MapPin size={12} color="#94a3b8" />}
                </div>
                <p className="text-xs text-slate-500 truncate">{appt.type}</p>
              </div>

              {/* Status */}
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ background: ss.bg, color: ss.color }}
              >
                {ss.label}
              </span>

              <MoreVertical size={14} color="#475569" className="flex-shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
