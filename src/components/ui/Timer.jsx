import React, { useState, useMemo } from 'react';
import { Calendar as CalIcon, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Clock, Search } from 'lucide-react';

const LOCAL_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
const TIME_ZONES = typeof Intl.supportedValuesOf === 'function'
    ? Intl.supportedValuesOf('timeZone')
    : ['UTC', 'America/Los_Angeles', 'America/Chicago', 'America/New_York', 'Europe/London', 'Europe/Paris', 'Asia/Kolkata', 'Asia/Tokyo', 'Australia/Sydney'];

export default function Timers() {
    const [viewDate, setViewDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(new Date().getDate());
    const [time, setTime] = useState({ hour: 12, min: 0, p: 'AM' });
    const [timeZone, setTimeZone] = useState(LOCAL_TIME_ZONE);
    const [isTimeZoneOpen, setIsTimeZoneOpen] = useState(false);
    const [timeZoneQuery, setTimeZoneQuery] = useState('');

    const { calendarDays, label } = useMemo(() => {
        const y = viewDate.getFullYear(), m = viewDate.getMonth();
        const first = new Date(y, m, 1).getDay(), total = new Date(y, m + 1, 0).getDate();
        const prevTotal = new Date(y, m, 0).getDate();
        const days = [];
        for (let i = first - 1; i >= 0; i--) days.push({ d: prevTotal - i, current: false });
        for (let i = 1; i <= total; i++) days.push({ d: i, current: true });
        while (days.length < 42) days.push({ d: days.length - total - first + 1, current: false });
        return { calendarDays: days, label: viewDate.toLocaleString('default', { month: 'long', year: 'numeric' }) };
    }, [viewDate]);
    const filteredTimeZones = useMemo(() => {
        const zones = TIME_ZONES.includes(timeZone) ? TIME_ZONES : [timeZone, ...TIME_ZONES];
        const query = timeZoneQuery.trim().toLowerCase();
        return zones.filter((zone) => zone.toLowerCase().includes(query));
    }, [timeZone, timeZoneQuery]);

    return (
        <div className='flex w-full min-w-0 flex-col items-center justify-start md:w-auto md:items-end'>
            <div className='flex w-full min-w-0 flex-col items-center md:w-auto'>
                <h1 className='text-[20px] xl:text-[24px] 2xl:text-[30px] font-bold text-white text-center mb-5' style={{ fontFamily: 'Daminga, sans-serif' }}>Schedule a meeting</h1>
                <div className="relative isolate w-full min-w-0 overflow-hidden rounded-[22px] border border-white/25 bg-[radial-gradient(ellipse_at_100%_0%,rgba(85,182,200,0.2),transparent_44%),linear-gradient(140deg,rgba(255,255,255,0.17),rgba(11,24,40,0.76)_54%,rgba(23,66,82,0.58))] p-5 text-white shadow-[0_22px_60px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-2xl transition-all duration-300 hover:border-[#70d2e3]/40 sm:p-6 md:w-[290px] 2xl:w-[340px]">
                    <span aria-hidden="true" className="pointer-events-none absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-white/65 to-transparent" />
                    <span aria-hidden="true" className="pointer-events-none absolute -right-14 -top-20 -z-10 h-48 w-48 rounded-full bg-[#55B6C8]/20 blur-3xl" />
                    <div className="mb-5 flex items-center gap-3 text-xs text-white/75" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        <span className="shrink-0">Time zone</span>
                        <div
                            className="relative min-w-0 flex-1"
                            onBlur={(event) => {
                                if (!event.currentTarget.contains(event.relatedTarget)) setIsTimeZoneOpen(false);
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Escape') setIsTimeZoneOpen(false);
                            }}
                        >
                            <button
                                type="button"
                                aria-label={`Meeting time zone: ${timeZone.replaceAll('_', ' ')}`}
                                aria-haspopup="listbox"
                                aria-expanded={isTimeZoneOpen}
                                onClick={() => setIsTimeZoneOpen((open) => !open)}
                                className="flex w-full items-center justify-between gap-2 rounded-xl border border-white/20 bg-white/[0.09] px-2 py-2 text-left text-xs text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition hover:border-[#70d2e3]/45 hover:bg-white/[0.14] focus:outline-none focus:ring-2 focus:ring-[#70d2e3]/30"
                            >
                                <span className="truncate">{timeZone.replaceAll('_', ' ')}</span>
                                <ChevronDown size={14} className={`shrink-0 transition-transform ${isTimeZoneOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isTimeZoneOpen && (
                                <div className="absolute right-0 top-full z-50 mt-2 w-[min(280px,calc(100vw-32px))] overflow-hidden rounded-xl border border-white/25 bg-[linear-gradient(145deg,rgba(27,48,62,0.96),rgba(8,20,34,0.97))] text-white shadow-[0_20px_48px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-2xl">
                                    <div className="border-b border-white/10 p-2">
                                        <div className="flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-2">
                                            <Search size={14} className="shrink-0 text-white/50" />
                                            <input
                                                type="search"
                                                aria-label="Search time zones"
                                                value={timeZoneQuery}
                                                onChange={(event) => setTimeZoneQuery(event.target.value)}
                                                placeholder="Search time zones"
                                                className="min-w-0 flex-1 bg-transparent py-2 text-xs text-white placeholder:text-white/45 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div role="listbox" aria-label="Time zones" className="max-h-52 overflow-y-auto p-1">
                                        {filteredTimeZones.length > 0 ? filteredTimeZones.map((zone) => (
                                            <button
                                                key={zone}
                                                type="button"
                                                role="option"
                                                aria-selected={zone === timeZone}
                                                onClick={() => {
                                                    setTimeZone(zone);
                                                    setTimeZoneQuery('');
                                                    setIsTimeZoneOpen(false);
                                                }}
                                                className={`flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-xs transition-colors hover:bg-white/10 ${zone === timeZone ? 'bg-white/10 text-white' : 'text-white/75'}`}
                                            >
                                                <span>{zone.replaceAll('_', ' ')}</span>
                                                {zone === timeZone && <Check size={14} className="shrink-0 text-[#45E7EF]" />}
                                            </button>
                                        )) : (
                                            <p className="px-2 py-3 text-xs text-white/55">No time zones found</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="relative z-10 mb-6 flex items-center justify-between">
                        <button type="button" aria-label="Previous month" onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))} className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(9,20,35,0.42))] text-white/80 shadow-[0_6px_18px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-[#70d2e3]/60 hover:bg-[#23768C]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70d2e3]/60"><ChevronLeft size={18} className="transition-transform group-hover:-translate-x-0.5" /></button>
                        <span className="font-semibold tracking-wide text-white">{label}</span>
                        <button type="button" aria-label="Next month" onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))} className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(9,20,35,0.42))] text-white/80 shadow-[0_6px_18px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-[#70d2e3]/60 hover:bg-[#23768C]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70d2e3]/60"><ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5" /></button>
                    </div>
                    <div className="relative z-10 mb-3 grid grid-cols-7 text-center text-xs font-bold text-white/45">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d}>{d}</div>)}
                    </div>
                    <div className="relative z-10 grid grid-cols-7 gap-1.5">
                        {calendarDays.map((item, i) => (
                            <button
                                key={i}
                                type="button"
                                disabled={!item.current}
                                aria-label={`${item.current ? 'Select' : 'Adjacent month'}, day ${item.d}`}
                                aria-pressed={item.current && item.d === selectedDay}
                                onClick={() => item.current && setSelectedDay(item.d)}
                                className={`aspect-square flex items-center justify-center rounded-full border text-xs sm:text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70d2e3]/70
                 ${item.current ? 'cursor-pointer opacity-100' : 'cursor-default opacity-25'}
                 ${item.current && item.d === selectedDay ? 'scale-105 border-[#8ce9f2]/80 bg-[linear-gradient(145deg,rgba(85,182,200,0.82),rgba(24,92,112,0.96))] font-semibold text-white shadow-[0_0_20px_rgba(85,182,200,0.3),inset_0_1px_0_rgba(255,255,255,0.3)]' : 'border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.11),rgba(9,20,35,0.26))] text-white/85 hover:-translate-y-0.5 hover:border-[#70d2e3]/55 hover:bg-[linear-gradient(145deg,rgba(85,182,200,0.3),rgba(9,32,49,0.6))] hover:text-white'}`}
                            >
                                {item.d}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Timer Section */}
            <div className="mt-5 flex w-full items-center justify-between gap-6 rounded-[18px] border border-white/20 bg-[linear-gradient(140deg,rgba(255,255,255,0.14),rgba(11,24,40,0.62)_54%,rgba(23,66,82,0.42))] px-3 py-2.5 text-white shadow-[0_16px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-2xl sm:px-6 md:w-auto">
                <div className="flex flex-col items-center gap-2.5">
                    <button type="button" aria-label="Increase hour" onClick={() => setTime({ ...time, hour: time.hour % 12 + 1 })} className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-white/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(9,20,35,0.46))] text-white/80 shadow-[0_6px_16px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all hover:-translate-y-0.5 hover:border-[#70d2e3]/60 hover:bg-[#23768C]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70d2e3]/60"><ChevronUp className="h-[20px] w-[20px]" /></button>
                    <span className="min-w-8 text-center text-lg font-semibold tabular-nums text-white 3xl:text-[18px]">{time.hour}</span>
                    <button type="button" aria-label="Decrease hour" onClick={() => setTime({ ...time, hour: time.hour === 1 ? 12 : time.hour - 1 })} className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-white/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(9,20,35,0.46))] text-white/80 shadow-[0_6px_16px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all hover:translate-y-0.5 hover:border-[#70d2e3]/60 hover:bg-[#23768C]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70d2e3]/60"><ChevronDown className="h-[20px] w-[20px]" /></button>
                </div>
                <span className="text-2xl font-light text-[#70d2e3]/75">:</span>
                <div className="flex flex-col items-center gap-2.5">
                    <button type="button" aria-label="Increase minutes" onClick={() => setTime({ ...time, min: (time.min + 1) % 60 })} className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-white/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(9,20,35,0.46))] text-white/80 shadow-[0_6px_16px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all hover:-translate-y-0.5 hover:border-[#70d2e3]/60 hover:bg-[#23768C]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70d2e3]/60"><ChevronUp className="h-[20px] w-[20px]" /></button>
                    <span className="min-w-8 text-center text-lg font-semibold tabular-nums text-white 3xl:text-[18px]">{time.min.toString().padStart(2, '0')}</span>
                    <button type="button" aria-label="Decrease minutes" onClick={() => setTime({ ...time, min: time.min === 0 ? 59 : time.min - 1 })} className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-white/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(9,20,35,0.46))] text-white/80 shadow-[0_6px_16px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all hover:translate-y-0.5 hover:border-[#70d2e3]/60 hover:bg-[#23768C]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70d2e3]/60"><ChevronDown className="h-[20px] w-[20px]" /></button>
                </div>
                <button type="button" aria-label={`Switch to ${time.p === 'AM' ? 'PM' : 'AM'}`} onClick={() => setTime({ ...time, p: time.p === 'AM' ? 'PM' : 'AM' })} className="ml-2 flex h-[42px] min-w-[42px] items-center justify-center rounded-full border border-[#70d2e3]/55 bg-[linear-gradient(145deg,rgba(85,182,200,0.52),rgba(17,66,85,0.78))] px-2 text-sm font-bold tracking-wide text-white shadow-[0_8px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.24)] transition-all hover:-translate-y-0.5 hover:border-[#8ce9f2]/80 hover:shadow-[0_10px_24px_rgba(0,0,0,0.25),0_0_16px_rgba(85,182,200,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70d2e3]/60 3xl:text-[18px]">
                    {time.p}
                </button>
            </div>
        </div>
    );
};