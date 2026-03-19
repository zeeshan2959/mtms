import { useState } from 'react';
import { CheckSquare, Square, Plus, MoreHorizontal } from 'lucide-react';

const INITIAL_TASKS = [
  { id: 1, text: 'Review patient files for morning rounds',     done: false, priority: 'high',   tag: 'Medical' },
  { id: 2, text: 'Submit monthly department report',            done: false, priority: 'medium', tag: 'Admin' },
  { id: 3, text: 'Update medication protocols',                 done: true,  priority: 'low',    tag: 'Protocol' },
  { id: 4, text: 'Attend CME webinar at 3:00 PM',               done: false, priority: 'medium', tag: 'Training' },
  { id: 5, text: 'Follow up with Lab on pending results',       done: false, priority: 'high',   tag: 'Medical' },
  { id: 6, text: 'Schedule equipment maintenance',              done: true,  priority: 'low',    tag: 'Admin' },
];

const PRIORITY_STYLES = {
  high:   { bg: 'rgba(239,68,68,0.12)',   color: '#f87171',  dot: '#ef4444' },
  medium: { bg: 'rgba(234,179,8,0.12)',   color: '#fbbf24',  dot: '#eab308' },
  low:    { bg: 'rgba(34,197,94,0.12)',   color: '#4ade80',  dot: '#22c55e' },
};

export default function TaskList({ className = '' }) {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTask, setNewTask] = useState('');
  const [adding, setAdding] = useState(false);

  const toggle = id => setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks(ts => [...ts, { id: Date.now(), text: newTask.trim(), done: false, priority: 'medium', tag: 'General' }]);
    setNewTask('');
    setAdding(false);
  };

  const done  = tasks.filter(t => t.done).length;
  const total = tasks.length;
  const pct   = Math.round((done / total) * 100);

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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(139,92,246,0.15)' }}
          >
            <CheckSquare size={16} color="#8b5cf6" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Today's Tasks
            </h3>
            <p className="text-xs text-slate-500">{done}/{total} completed</p>
          </div>
        </div>
        <button
          onClick={() => setAdding(a => !a)}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
          style={{ background: 'rgba(37,99,235,0.15)', color: '#60a5fa' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,99,235,0.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,99,235,0.15)'}
        >
          <Plus size={15} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="h-1.5 rounded-full" style={{ background: 'rgba(51,65,85,0.5)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #1d4ed8, #8b5cf6)',
            }}
          />
        </div>
        <p className="text-right text-xs text-slate-500 mt-1">{pct}%</p>
      </div>

      {/* Add task input */}
      {adding && (
        <div className="flex gap-2 mb-3">
          <input
            autoFocus
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') addTask(); if (e.key === 'Escape') setAdding(false); }}
            placeholder="Type task and press Enter..."
            className="flex-1 px-3 py-2 rounded-lg text-sm text-white placeholder-slate-500 outline-none"
            style={{
              background: 'rgba(51,65,85,0.4)',
              border: '1px solid rgba(37,99,235,0.5)',
              fontFamily: 'Inter, sans-serif',
            }}
          />
        </div>
      )}

      {/* Task items */}
      <div className="flex flex-col gap-1.5 overflow-y-auto" style={{ maxHeight: 280 }}>
        {tasks.map(task => {
          const ps = PRIORITY_STYLES[task.priority];
          return (
            <div
              key={task.id}
              className="flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 cursor-pointer"
              style={{ background: 'rgba(51,65,85,0.15)' }}
              onClick={() => toggle(task.id)}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(51,65,85,0.3)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(51,65,85,0.15)'}
            >
              <div className="mt-0.5 flex-shrink-0" style={{ color: task.done ? '#4ade80' : '#475569' }}>
                {task.done
                  ? <CheckSquare size={16} color="#22c55e" />
                  : <Square size={16} color="#475569" />}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm text-slate-300 leading-snug"
                  style={{
                    textDecoration: task.done ? 'line-through' : 'none',
                    color: task.done ? '#64748b' : '#cbd5e1',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {task.text}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-md font-medium"
                    style={{ background: ps.bg, color: ps.color }}
                  >
                    {task.priority}
                  </span>
                  <span className="text-xs text-slate-600">{task.tag}</span>
                </div>
              </div>
              <MoreHorizontal size={14} color="#475569" className="flex-shrink-0 mt-0.5" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
