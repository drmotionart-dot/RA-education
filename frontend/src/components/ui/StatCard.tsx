import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './Card';
import { Sparkline } from './Sparkline';

interface Props {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  sparklineData?: number[];
  color?: string;
  className?: string;
}

export function StatCard({ icon: Icon, label, value, trend, trendValue, sparklineData, color = 'var(--color-primary)', className = '' }: Props) {
  return (
    <Card className={`!p-4 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${color}18` }}>
            <Icon size={18} style={{ color }} />
          </div>
          <div>
            <p className="text-lg font-bold text-[var(--color-text-primary)]">{value}</p>
            <p className="text-[10px] text-[var(--color-text-secondary)]">{label}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          {trend && (
            <div className={`flex items-center gap-0.5 text-[10px] ${trend === 'up' ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
              {trend === 'up' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              <span>{trendValue}</span>
            </div>
          )}
          {sparklineData && <Sparkline data={sparklineData} color={color} />}
        </div>
      </div>
    </Card>
  );
}
