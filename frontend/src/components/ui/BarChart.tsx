interface Props {
  data: { label: string; value: number }[];
  height?: number;
  barColor?: string;
  className?: string;
}

export function BarChart({ data, height = 80, barColor = 'var(--color-primary)', className = '' }: Props) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const barGap = 4;

  return (
    <div className={`flex items-end gap-[3px] ${className}`} style={{ height }}>
      {data.map((d, i) => {
        const barH = (d.value / max) * (height - 4);
        return (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="w-full rounded-t-sm transition-all duration-500"
              style={{ height: barH || 1, backgroundColor: barColor, minHeight: d.value > 0 ? 2 : 0 }}
            />
            <span className="text-[8px] text-[var(--color-text-secondary)] leading-none">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}
