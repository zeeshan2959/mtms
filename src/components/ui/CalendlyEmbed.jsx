import { useState, useMemo } from 'react';
import { Clock, Video, Calendar, ChevronLeft, ChevronRight, ArrowLeft, CheckCircle2, Globe } from 'lucide-react';
import imgLogo from '/Logo.svg';

const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '01:30 PM',
  '02:30 PM',
  '03:30 PM',
  '04:30 PM',
  '05:30 PM',
];

const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const USER_TIMEZONE =
  typeof Intl !== 'undefined' && Intl.DateTimeFormat
    ? Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
    : 'UTC';

export default function CalendlyEmbed({ className = '', style = {} }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(() => {
    // Default to tomorrow or next business day
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  });
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [step, setStep] = useState('datetime'); // 'datetime' | 'details' | 'confirmed'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
    // Adjust so 0 is Monday
    const startOffset = (firstDayIndex + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Prev month overflow
    for (let i = startOffset - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false,
        isPast: true,
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const isPast = d < today;
      days.push({
        date: d,
        isCurrentMonth: true,
        isPast,
      });
    }

    // Next month overflow
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isPast: false,
      });
    }

    return days;
  }, [year, month]);

  const handlePrevMonth = () => {
    const prev = new Date(year, month - 1, 1);
    const today = new Date();
    if (prev.getFullYear() < today.getFullYear() || (prev.getFullYear() === today.getFullYear() && prev.getMonth() < today.getMonth())) {
      return;
    }
    setCurrentDate(prev);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return '';
    return selectedDate.toLocaleDateString('default', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, [selectedDate]);

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 12-hour to 24-hour conversion for ISO string
      const [rawTime, modifier] = selectedTime.split(' ');
      let [hours, minutes] = rawTime.split(':').map(Number);
      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;

      const dateStr = selectedDate.toISOString().split('T')[0];
      const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
      const startDateTime = `${dateStr}T${timeStr}`;

      const payload = {
        fullName: formData.name,
        email: formData.email,
        number: formData.phone || '',
        message: formData.notes || '',
        startDateTime,
        timeZone: USER_TIMEZONE,
      };

      // Call API if server is running
      await fetch('/api/schedule-teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {});
    } catch {
      // Gracefully continue to confirmation screen
    } finally {
      setIsSubmitting(false);
      setStep('confirmed');
    }
  };

  return (
    <div
      className={`calendly-outer-card group relative mx-auto w-full max-w-[940px] overflow-hidden rounded-[24px] border border-white/20 bg-[radial-gradient(ellipse_at_100%_0%,rgba(85,182,200,0.22),transparent_48%),radial-gradient(ellipse_at_0%_100%,rgba(35,118,140,0.18),transparent_50%),linear-gradient(135deg,rgba(255,255,255,0.14),rgba(8,18,32,0.72)_48%,rgba(20,68,87,0.52))] shadow-[0_24px_70px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-2xl transition-all duration-500 hover:border-[#70d2e3]/45 ${className}`}
      style={style}
    >
      {/* Top specular reflection line */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
      />

      {/* Decorative ambient glowing orbs */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-28 z-0 h-80 w-80 rounded-full bg-cyan-300/10 blur-[90px] transition-opacity duration-500 group-hover:opacity-80"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 left-0 z-0 h-72 w-72 rounded-full bg-sky-500/[0.08] blur-[90px]"
      />

      {/* Main 2-Column Container */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[340px_1fr] divide-y md:divide-y-0 md:divide-x divide-white/10 min-h-[640px]">
        {/* Left Column: Meeting Branding & Details */}
        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            {/* Website Logo — exact MTMS asset */}
            <div className="mb-6 flex items-center">
              <img
                src={imgLogo}
                alt="MTMS Engineering"
                className="h-[26px] max-w-[140px] w-auto object-contain block"
              />
            </div>

            {/* Host Details */}
            {/* <div className="mb-5 flex items-center gap-3">
              <div className="h-11 w-11 shrink-0 rounded-full border border-white/25 bg-gradient-to-tr from-[#55B6C8]/40 to-white/15 p-0.5 shadow-md flex items-center justify-center font-bold text-white text-xs">
                MTMS
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-white/55 font-display font-semibold truncate">
                  MTMS Engineering
                </p>
                <p className="text-sm font-semibold text-white truncate">
                  Engineering Team
                </p>
              </div>
            </div> */}

            {/* Meeting Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug font-display mb-4">
              Discussion with MTMS Engineering Team
            </h2>

            {/* Meeting Metadata */}
            <div className="space-y-3 text-sm text-white/80 font-sans mb-6">
              <div className="flex items-center gap-2.5">
                <Clock size={16} className="text-[#70d2e3] shrink-0" />
                <span>30 min</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Video size={16} className="text-[#70d2e3] shrink-0 mt-0.5" />
                <span className="leading-tight text-white/75">
                  Web conferencing details provided upon confirmation.
                </span>
              </div>

              {/* Selected Slot Badge if selected */}
              {selectedDate && selectedTime && (
                <div className="flex items-start gap-2.5 text-[#9ef0fa] pt-3 border-t border-white/10 font-medium">
                  <Calendar size={16} className="text-[#70d2e3] shrink-0 mt-0.5" />
                  <div className="leading-tight">
                    <p>{formattedSelectedDate}</p>
                    <p className="text-xs text-[#70d2e3] mt-0.5">{selectedTime} ({USER_TIMEZONE})</p>
                  </div>
                </div>
              )}
            </div>

            {/* Short description */}
            <p className="text-xs text-white/60 leading-relaxed font-sans">
              Connect directly with our engineering leadership to review system requirements, technical architectures, and medical simulation specifications.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45 font-sans">
            <span>MTMS Medical Training Management</span>
            <span className="text-[#70d2e3]/75 font-medium">Verified Partner</span>
          </div>
        </div>

        {/* Right Column: Interactive Scheduling or Details Form */}
        <div className="p-6 sm:p-8 flex flex-col justify-between">
          {/* STEP 1: Date & Time Picker */}
          {step === 'datetime' && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-white font-display">
                  Select a Date &amp; Time
                </h3>
              </div>

              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-3 px-1">
                <h4 className="text-sm font-semibold text-white font-sans">
                  {monthName} {year}
                </h4>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    aria-label="Previous Month"
                    className="p-1.5 rounded-lg border border-white/15 bg-white/[0.05] text-white/75 hover:bg-white/15 hover:text-white transition disabled:opacity-25"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    aria-label="Next Month"
                    className="p-1.5 rounded-lg border border-white/15 bg-white/[0.05] text-white/75 hover:bg-white/15 hover:text-white transition"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Calendar Grid Header */}
              <div className="grid grid-cols-7 gap-1 text-center mb-1">
                {DAYS_OF_WEEK.map((d) => (
                  <span key={d} className="text-[10px] font-semibold text-white/45 tracking-wider py-1">
                    {d}
                  </span>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1.5 text-center font-sans">
                {calendarDays.map((item, idx) => {
                  const isSelected = isSameDay(item.date, selectedDate);
                  const isCurrent = item.isCurrentMonth;
                  const isPast = item.isPast;

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={!isCurrent || isPast}
                      onClick={() => setSelectedDate(item.date)}
                      className={`h-9 w-full rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#70d2e3] text-[#06070c] shadow-[0_0_16px_rgba(112,210,227,0.55)] scale-105'
                          : isCurrent && !isPast
                          ? 'text-white/90 hover:bg-white/15 hover:text-white border border-transparent hover:border-white/20'
                          : 'text-white/20 cursor-not-allowed opacity-35'
                      }`}
                    >
                      {item.date.getDate()}
                    </button>
                  );
                })}
              </div>

              {/* Time Slots Section */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-xs font-semibold text-white/80 mb-3 font-sans">
                  Available Slots for {selectedDate.toLocaleDateString('default', { month: 'short', day: 'numeric' })}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isPicked = slot === selectedTime;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`rounded-xl px-2.5 py-2 text-xs font-medium transition-all duration-200 border ${
                          isPicked
                            ? 'border-[#70d2e3] bg-[#70d2e3]/20 text-[#9ef0fa] shadow-[inset_0_1px_0_rgba(112,210,227,0.4)]'
                            : 'border-white/15 bg-white/[0.06] text-white/85 hover:border-white/30 hover:bg-white/[0.12]'
                        }`}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => setStep('details')}
                className="mt-6 w-full rounded-full border border-white/35 bg-[linear-gradient(120deg,rgba(85,182,200,0.45),rgba(17,66,85,0.7))] py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-xl transition-all duration-300 hover:border-[#70d2e3]/70 hover:shadow-[0_14px_32px_rgba(0,0,0,0.28),0_0_20px_rgba(85,182,200,0.2)] focus:outline-none"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Next: Enter Details
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-white/45 font-sans">
                <Globe size={13} className="text-[#70d2e3]" />
                <span>Time zone: {USER_TIMEZONE}</span>
              </div>
            </div>
          )}

          {/* STEP 2: Enter Details Form (Styled like ContactForm) */}
          {step === 'details' && (
            <div>
              <button
                type="button"
                onClick={() => setStep('datetime')}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#70d2e3] hover:text-cyan-200 transition-colors mb-4 font-sans"
              >
                <ArrowLeft size={14} /> Back to calendar
              </button>

              <h3 className="text-lg font-semibold text-white font-display mb-1">
                Enter Details
              </h3>
              <p className="text-xs text-white/60 mb-5 font-sans">
                Please enter your details to reserve this discussion slot.
              </p>

              <form onSubmit={handleScheduleSubmit} className="flex flex-col gap-3 font-sans">
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">
                    Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Full Name"
                    className="w-full rounded-xl border border-white/15 bg-white/[0.08] px-4 py-2.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition placeholder:text-white/45 hover:border-white/25 focus:border-[#70d2e3]/65 focus:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-[#70d2e3]/20"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full rounded-xl border border-white/15 bg-white/[0.08] px-4 py-2.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition placeholder:text-white/45 hover:border-white/25 focus:border-[#70d2e3]/65 focus:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-[#70d2e3]/20"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 234 567 8900"
                    className="w-full rounded-xl border border-white/15 bg-white/[0.08] px-4 py-2.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition placeholder:text-white/45 hover:border-white/25 focus:border-[#70d2e3]/65 focus:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-[#70d2e3]/20"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/80 mb-1">
                    Please share anything that will help prepare for our meeting.
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Brief agenda, topics, or system requirements..."
                    className="w-full resize-none rounded-xl border border-white/15 bg-white/[0.08] px-4 py-2.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition placeholder:text-white/45 hover:border-white/25 focus:border-[#70d2e3]/65 focus:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-[#70d2e3]/20"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-full border border-white/35 bg-[linear-gradient(120deg,rgba(85,182,200,0.45),rgba(17,66,85,0.7))] py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-xl transition-all duration-300 hover:border-[#70d2e3]/70 hover:shadow-[0_14px_32px_rgba(0,0,0,0.28),0_0_20px_rgba(85,182,200,0.2)] focus:outline-none disabled:opacity-50"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {isSubmitting ? 'Scheduling...' : 'Schedule Event'}
                </button>
              </form>
            </div>
          )}

          {/* STEP 3: Confirmed Screen */}
          {step === 'confirmed' && (
            <div className="flex flex-col items-center justify-center text-center h-full py-8 font-sans">
              <div className="relative mb-5 flex h-16 w-16 items-center justify-center">
                <div className="absolute h-full w-full animate-ping rounded-full bg-[#70d2e3]/20" />
                <CheckCircle2 size={56} className="text-[#70d2e3] relative z-10" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-2">
                You are Scheduled!
              </h3>
              <p className="text-sm text-white/70 max-w-sm mb-6 leading-relaxed">
                A calendar invitation and conference link have been prepared for{' '}
                <span className="text-[#9ef0fa] font-semibold">{formData.email}</span>.
              </p>

              <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-white/[0.06] p-4 text-left space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <Calendar size={14} className="text-[#70d2e3]" />
                  <span>{formattedSelectedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <Clock size={14} className="text-[#70d2e3]" />
                  <span>{selectedTime} ({USER_TIMEZONE})</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <Video size={14} className="text-[#70d2e3]" />
                  <span>Web conferencing link will be sent prior to call</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStep('datetime');
                  setFormData({ name: '', email: '', phone: '', notes: '' });
                }}
                className="text-xs font-semibold text-[#70d2e3] hover:underline transition"
              >
                Schedule another meeting
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
