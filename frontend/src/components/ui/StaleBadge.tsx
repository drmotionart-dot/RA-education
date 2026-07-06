import { AlertTriangle } from 'lucide-react';

export function StaleBadge({ isStale }: { isStale?: boolean }) {
  if (!isStale) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-error)]/10 px-2 py-0.5 text-xs text-[var(--color-error)]">
      <AlertTriangle size={10} /> Stub
    </span>
  );
}
