import React, { useState, useMemo } from 'react';
import { Calendar as CalIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

export default function Timers() {
    const [viewDate, setViewDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(new Date().getDate());
    const [time, setTime] = useState({ hour: 12, min: 0, p: 'AM' });

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

    return (
        <div className='flex flex-col items-center md:items-end justify-start'>
            <div className='flex flex-col items-center'>
                <h1 className='text-[20px] xl:text-[24px] 2xl:text-[30px] font-bold text-white text-center mb-5' style={{ fontFamily: 'Daminga, sans-serif' }}>Schedule a meeting</h1>
                <div className="bg-[rgba(221,221,221,0.20)] p-6 rounded-[12px] sm:w-[290px] 2xl:w-[340px]">
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