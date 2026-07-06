import { type ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
}

export function Button({ variant = 'secondary', loading, children, className = '', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition-colors disabled:opacity-50 cursor-pointer';

  const variants: Record<string, string> = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]',
    secondary: 'bg-[var(--color-secondary)] text-[var(--color-primary)] hover:opacity-90',
    ghost: 'text-[var(--color-text-primary)] hover:bg-[var(--color-border)]',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} disabled={loading || props.disabled} {...props}>
      {loading ? 'Loading...' : children}
    </button>
  );
}
