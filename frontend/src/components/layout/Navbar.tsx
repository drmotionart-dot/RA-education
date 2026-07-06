import { useLocation, Link } from 'react-router-dom';
import { BookOpen, Brain, ClipboardList, Compass, Home, LogOut, Plus, User, BarChart3 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const { logout } = useAuthStore();
  const location = useLocation();

  const navItems = [
    { to: '/dashboard', icon: Home, title: 'Dashboard' },
    { to: '/explore', icon: Compass, title: 'Explore' },
    { to: '/paths', icon: BarChart3, title: 'Paths' },
    { to: '/quick-pick', icon: Plus, title: 'Quick Pick' },
    { to: '/assessment', icon: Brain, title: 'Assessment' },
    { to: '/survey', icon: ClipboardList, title: 'Survey' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto flex h-14 max-w-5xl lg:max-w-6xl xl:max-w-7xl items-center justify-between px-4">
        <Link to="/dashboard" className="flex items-center gap-2 font-heading font-bold text-lg text-[var(--color-primary)] shrink-0">
          <BookOpen size={20} /> RA Edu
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5'
                }`}
                title={item.title}
              >
                <item.icon size={18} />
                <span className="hidden sm:inline">{item.title}</span>
              </Link>
            );
          })}
          <Link
            to="/profile"
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
              location.pathname === '/profile'
                ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5'
            }`}
            title="Profile"
          >
            <User size={18} />
            <span className="hidden sm:inline">Profile</span>
          </Link>
          <ThemeToggle />
          <button onClick={logout} className="cursor-pointer rounded-lg p-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/5 transition-colors" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
