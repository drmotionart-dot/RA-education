import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { Menu, BookOpen } from 'lucide-react';
import { Sidebar } from './Sidebar';

export function AppLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('sidebar_collapsed') === 'true');
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapse = () => {
    setCollapsed((c) => {
      const next = !c;
      localStorage.setItem('sidebar_collapsed', String(next));
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] md:flex">
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="cursor-pointer rounded-lg p-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <Link to="/dashboard" className="flex items-center gap-2 font-heading font-bold text-lg text-[var(--color-primary)]">
          <BookOpen size={20} /> RA Edu
        </Link>
        <div className="w-9" />
      </div>

      {/* Desktop flex container */}
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={toggleCollapse}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main content */}
      <main className="flex-1 min-w-0 mx-auto w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
