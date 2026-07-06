import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

export function ThemeToggle() {
  const { theme, toggle } = useThemeStore();
  return (
    <button onClick={toggle} className="cursor-pointer rounded-lg p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors" title="Toggle theme">
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
