import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggle: () => void;
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

export const useThemeStore = create<ThemeState>((set) => {
  const initial = getInitialTheme();
  applyTheme(initial);
  return {
    theme: initial,
    toggle: () => {
      set((state) => {
        const next = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', next);
        applyTheme(next);
        return { theme: next };
      });
    },
  };
});
