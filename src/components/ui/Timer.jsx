import React, { useState, useMemo } from 'react';
import { Calendar as CalIcon, Check, ChevronDown, ChevronLeft, ChevronRight, Clock, Search } from 'lucide-react';

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
        <div className='flex flex-col items-center md:items-end justify-start'>
            <div className='flex flex-col items-center'>
                <h1 className='text-[20px] xl:text-[24px] 2xl:text-[30px] font-bold text-white text-center mb-5' style={{ fontFamily: 'Daminga, sans-serif' }}>Schedule a meeting</h1>
                <div className="bg-[rgba(221,221,221,0.20)] p-6 rounded-[12px] sm:w-[290px] 2xl:w-[340px]">
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
                                className="flex w-full items-center justify-between gap-2 rounded-md border border-white/20 bg-[rgba(221,221,221,0.20)] px-2 py-2 text-left text-xs text-white transition-colors hover:bg-[rgba(221,221,221,0.30)] focus:outline-none focus:ring-1 focus:ring-white/50"
                            >
                                <span className="truncate">{timeZone.replaceAll('_', ' ')}</span>
                                <ChevronDown size={14} className={`shrink-0 transition-transform ${isTimeZoneOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isTimeZoneOpen && (
                                <div className="absolute right-0 top-full z-50 mt-2 w-[min(280px,calc(100vw-64px))] overflow-hidden rounded-lg border border-white/20 bg-[#15232b]/95 text-white shadow-xl backdrop-blur-xl">
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
                    <div className="flex justify-between items-center mb-8">
                        <button onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))} className="p-2 rounded-full bg-white/10 hover:bg-white/20"><ChevronLeft size={18} /></button>
                        <span className="font-medium">{label}</span>
                        <button onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))} className="p-2 rounded-full bg-white/10 hover:bg-white/20"><ChevronRight size={18} /></button>
                    </div>
                    <div className="grid grid-cols-7 text-center opacity-40 text-xs font-bold mb-4">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d}>{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {calendarDays.map((item, i) => (
                            <div key={i} onClick={() => item.current && setSelectedDay(item.d)}
                                className={`aspect-square flex items-center justify-center rounded-full cursor-pointer transition-all text-sm
                 ${item.current ? 'opacity-100' : 'opacity-35'}
                 ${item.current && item.d === selectedDay ? 'bg-[#23768C] text-[rgba(221,221,221,0.35)]' : 'bg-[rgba(221,221,221,0.35)] text-white'}`}>
                                {item.d}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Timer Section */}
            <div className="mt-6 bg-[rgba(221,221,221,0.20)] px-2 sm:px-6 py-2.5 rounded-[12px] flex items-center gap-6">
                <div className="flex flex-col items-center gap-2.5">
                    <button onClick={() => setTime({ ...time, hour: time.hour % 12 + 1 })} className="bg-[rgba(221,221,221,0.35)] h-[36px] w-[36px] rounded-full flex justify-center items-center"><ChevronLeft className="rotate-90 h-[24px] w-[24px]" /></button>
                    <span className="text-base 3xl:text-[18px]">{time.hour}</span>
                    <button onClick={() => setTime({ ...time, hour: time.hour === 1 ? 12 : time.hour - 1 })} className="bg-[rgba(221,221,221,0.35)] h-[36px] w-[36px] rounded-full flex justify-center items-center"><ChevronLeft className="rotate-[270deg] h-[24px] w-[24px]" /></button>
                </div>
                <span className="text-2xl opacity-40">:</span>
                <div className="flex flex-col items-center gap-2.5">
                    <button onClick={() => setTime({ ...time, min: (time.min + 1) % 60 })} className="bg-[rgba(221,221,221,0.35)] h-[36px] w-[36px] rounded-full flex justify-center items-center"><ChevronLeft className="rotate-90 h-[24px] w-[24px]" /></button>
                    <span className="text-base 3xl:text-[18px]">{time.min.toString().padStart(2, '0')}</span>
                    <button onClick={() => setTime({ ...time, min: time.min === 0 ? 59 : time.min - 1 })} className="bg-[rgba(221,221,221,0.35)] h-[36px] w-[36px] rounded-full flex justify-center items-center"><ChevronLeft className="rotate-[270deg] h-[24px] w-[24px]" /></button>
                </div>
                <button onClick={() => setTime({ ...time, p: time.p === 'AM' ? 'PM' : 'AM' })} className="bg-[rgba(221,221,221,0.35)] h-[36px] w-[36px] rounded-full flex justify-center items-center text-base 3xl:text-[18px] ml-2">
                    {time.p}
                </button>
            </div>
        </div>
    );
};