import { type InputHTMLAttributes, forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(({ label, error, className = '', ...props }, ref) => (
  <div className="space-y-1">
    {label && <label className="block text-sm font-medium text-[var(--color-text-secondary)]">{label}</label>}
    <input
      ref={ref}
      className={`w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] ${error ? 'border-[var(--color-error)]' : ''} ${className}`}
      {...props}
    />
    {error && <p className="text-xs text-[var(--color-error)]">{error}</p>}
  </div>
));

Input.displayName = 'Input';
