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
    <Card className={`!p-5 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-lg"
            style={{ backgroundColor: `${color}18`, boxShadow: `0 4px 12px ${color}25` }}
          >
            <Icon size={22} style={{ color }} />
          </div>
          <div>
            <p className="text-2xl font-bold text-[var(--color-text-primary)]">{value}</p>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] mt-0.5">{label}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          {trend && (
            <div className={`flex items-center gap-0.5 text-[11px] font-medium ${trend === 'up' ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
              {trend === 'up' ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              <span>{trendValue}</span>
            </div>
          )}
          {sparklineData && <Sparkline data={sparklineData} color={color} width={68} height={30} />}
        </div>
      </div>
    </Card>
  );
}
