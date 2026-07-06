import { Link } from 'react-router-dom';
import { BookOpen, Brain, ClipboardList, Compass, Home, LogOut, Plus, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const { logout } = useAuthStore();

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto flex h-14 max-w-5xl lg:max-w-6xl xl:max-w-7xl items-center justify-between px-4">
        <Link to="/dashboard" className="flex items-center gap-2 font-heading font-bold text-lg text-[var(--color-primary)]">
          <BookOpen size={20} /> RA Edu
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors" title="Dashboard">
            <Home size={20} />
          </Link>
          <Link to="/explore" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors" title="Explore">
            <Compass size={20} />
          </Link>
          <Link to="/quick-pick" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors" title="Quick Pick">
            <Plus size={20} />
          </Link>
          <Link to="/assessment" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors" title="Assessment">
            <Brain size={20} />
          </Link>
          <Link to="/survey" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors" title="Survey">
            <ClipboardList size={20} />
          </Link>
          <Link to="/profile" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors" title="Profile">
            <User size={20} />
          </Link>
          <ThemeToggle />
          <button onClick={logout} className="cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-error)] transition-colors" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
