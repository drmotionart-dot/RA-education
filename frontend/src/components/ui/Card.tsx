import type { ReactNode } from 'react';

interface Props {
  title?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ title, children, className = '', onClick }: Props) {
  return (
    <div
      className={`rounded-xl border border-[var(--color-border-accent)] bg-[var(--color-surface)] p-4 ${onClick ? 'cursor-pointer hover:border-[var(--color-border-accent-hover)] hover:shadow-md transition-all' : ''} ${className}`}
      onClick={onClick}
    >
      {title && <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-primary)]">{title}</h3>}
      {children}
    </div>
  );
}
