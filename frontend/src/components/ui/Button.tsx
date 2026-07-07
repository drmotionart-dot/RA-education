import { type ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({ variant = 'secondary', size = 'md', loading, children, className = '', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-lg font-medium transition disabled:opacity-50 cursor-pointer hover:scale-[1.02] active:scale-[0.98]';

  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  };

  const variants: Record<string, string> = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]',
    secondary: 'bg-[var(--color-secondary)] text-[var(--color-primary)] hover:opacity-90',
    ghost: 'text-[var(--color-text-primary)] hover:bg-[var(--color-border)]',
    outline: 'border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]',
  };

  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} disabled={loading || props.disabled} {...props}>
      {loading ? 'Loading...' : children}
    </button>
  );
}
