interface Props {
  value: number;
  max: number;
  className?: string;
}

export function ProgressBar({ value, max, className = '' }: Props) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className={`h-2 w-full rounded-full bg-[var(--color-border)] ${className}`}>
      <div
        className="h-full rounded-full bg-[var(--color-primary)] transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
