import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, subtitle, icon: Icon, iconBg, trend, trendValue, accent }) {
  const isPositive = trend === 'up';

  return (
    <div
      className="stat-card"
      style={{
        borderLeft: accent ? `3px solid ${accent}` : undefined,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: iconBg || 'rgba(37,99,235,0.15)' }}
        >
          {Icon && <Icon size={22} style={{ color: accent || '#3b82f6' }} strokeWidth={1.8} />}
        </div>
        {trendValue !== undefined && (
          <span
            className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg"
            style={{
              background: isPositive ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
              color: isPositive ? '#4ade80' : '#f87171',
            }}
          >
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trendValue}
          </span>
        )}
      </div>

      <div>
        <p className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {value}
        </p>
        <p className="text-sm font-medium text-slate-300">{title}</p>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
