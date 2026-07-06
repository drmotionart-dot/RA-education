import type { ReactNode } from 'react';

interface Props {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ title, children, className = '', onClick, hoverable }: Props) {
  const canHover = onClick || hoverable;
  return (
    <div
      className={`rounded-xl border border-[var(--color-border-accent)] bg-[var(--color-surface)] p-4 shadow-sm ${canHover ? 'cursor-pointer hover:border-[var(--color-border-accent-hover)] hover:shadow-md transition-all' : ''} ${className}`}
      onClick={onClick}
    >
      {title && <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-primary)]">{typeof title === 'string' ? title : title}</h3>}
      {children}
    </div>
  );
}
