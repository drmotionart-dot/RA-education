import { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Home, Compass, Plus, Brain, ClipboardList, CheckCircle2,
  User, LogOut, GraduationCap, PanelLeftClose, PanelLeft, FileText, Map,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { ThemeToggle } from './ThemeToggle';
import { api } from '../../lib/api';
import { Button } from '../ui/Button';

interface Props {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

interface NavItemData {
  to: string;
  icon: typeof Home;
  label: string;
}

interface SurveyStatus {
  doctor_specialty: boolean;
  nurse_specialty: boolean;
  doctor_path: boolean;
  nurse_path: boolean;
  hasCompletedSurvey: boolean;
  hasPlanFromSurvey: boolean;
}

const navItems: NavItemData[] = [
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/plan', icon: FileText, label: 'Plan' },
  { to: '/compass', icon: Map, label: 'Compass' },
  { to: '/companion', icon: GraduationCap, label: 'Companion' },
  { to: '/explore', icon: Compass, label: 'Explore' },
  { to: '/assessment', icon: Brain, label: 'Assessment' },
  { to: '/quick-pick', icon: Plus, label: 'Quick Pick' },
  { to: '/survey', icon: ClipboardList, label: 'Survey' },
];

function NavItem({ item, collapsed, index, surveyStatus, onSurveyClick }: {
  item: NavItemData;
  collapsed: boolean;
  index: number;
  surveyStatus?: SurveyStatus | null;
  onSurveyClick?: () => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
  const isSurvey = item.to === '/survey';
  const isTaken = isSurvey && surveyStatus?.hasCompletedSurvey;

  const handleClick = () => {
    if (isSurvey && surveyStatus?.hasCompletedSurvey) {
      onSurveyClick?.();
    } else {
      navigate(item.to);
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={handleClick}
        className={`
          flex items-center w-full rounded-lg transition-all duration-150 cursor-pointer text-left
          ${isActive
            ? 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] font-medium'
            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5'
          }
          ${isTaken ? 'opacity-55' : ''}
          ${collapsed ? 'justify-center h-11 w-11 mx-auto' : 'gap-3 px-3 py-2.5'}
        `}
        title={item.label}
      >
        {isActive && !collapsed && (
          <motion.div
            layoutId="activeTab"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-[var(--color-secondary)]"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
        <div className="relative">
          <item.icon size={20} className="shrink-0" />
          {isTaken && (
            <CheckCircle2 size={10} className="absolute -top-1 -right-1 text-[var(--color-secondary)]" />
          )}
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03, duration: 0.15 }}
            className="text-sm truncate"
          >
            {item.label}
          </motion.span>
        )}
      </button>
      {collapsed && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-[var(--color-primary)] text-white text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 pointer-events-none z-50 shadow-lg">
          {item.label}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onMobileClose }: Props) {
  const user = useAuthStore((s) => s.user);
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [surveyStatus, setSurveyStatus] = useState<SurveyStatus | null>(null);
  const [showResurveyConfirm, setShowResurveyConfirm] = useState(false);

  useEffect(() => {
    api.survey.status()
      .then(setSurveyStatus)
      .catch(() => setSurveyStatus({ doctor_specialty: false, nurse_specialty: false, doctor_path: false, nurse_path: false, hasCompletedSurvey: false, hasPlanFromSurvey: false }));
  }, []);

  const handleNav = (path: string) => {
    onMobileClose();
    navigate(path);
  };

  const handleSurveyClick = () => {
    setShowResurveyConfirm(true);
  };

  const confirmResurvey = () => {
    setShowResurveyConfirm(false);
    onMobileClose();
    navigate('/survey');
  };

  const sidebarContent = (
    <div className="flex flex-col md:min-h-screen">
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-[var(--color-border)] shrink-0">
        {collapsed ? (
          <button onClick={() => handleNav('/dashboard')} className="mx-auto cursor-pointer">
            <BookOpen size={22} className="text-[var(--color-primary)] shrink-0" />
          </button>
        ) : (
          <Link to="/dashboard" onClick={onMobileClose} className="flex items-center gap-2 font-heading font-bold text-lg text-[var(--color-primary)]">
            <BookOpen size={22} /> RA Edu
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5 scrollbar-none">
        {navItems.map((item, i) => (
          <NavItem key={item.to} item={item} collapsed={collapsed} index={i} surveyStatus={surveyStatus} onSurveyClick={handleSurveyClick} />
        ))}
      </nav>

      {/* Survey retake confirmation modal */}
      {showResurveyConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={() => setShowResurveyConfirm(false)}>
          {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
          <div className="!p-5 max-w-sm w-full mx-4 rounded-xl border border-[var(--color-border-accent)] bg-[var(--color-surface)] shadow-sm" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-heading font-semibold text-sm text-[var(--color-text-primary)] mb-2">Re-take Survey?</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              You've already completed a survey. Taking it again will create new recommendations.
            </p>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setShowResurveyConfirm(false)}>Cancel</Button>
              <Button onClick={confirmResurvey}>Continue</Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-[var(--color-border)] shrink-0">
        {collapsed ? (
          <div className="flex flex-col items-center gap-2 py-3">
            <button onClick={() => handleNav('/profile')} className="cursor-pointer" title="Profile">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-sm font-bold text-[var(--color-primary)]">
                {(user?.name as string)?.[0]?.toUpperCase() || 'U'}
              </div>
            </button>
            <ThemeToggle />
            <button onClick={logout} className="cursor-pointer rounded-lg p-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/5 transition-colors" title="Logout">
              <LogOut size={16} />
            </button>
            <button onClick={onToggleCollapse} className="cursor-pointer rounded-lg p-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-colors" title="Expand sidebar">
              <PanelLeft size={16} />
            </button>
          </div>
        ) : (
          <div className="p-3 space-y-2">
            <button onClick={() => handleNav('/profile')} className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-colors cursor-pointer" title="Profile">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-sm font-bold text-[var(--color-primary)] shrink-0">
                {(user?.name as string)?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">{user?.name as string || 'User'}</p>
                <p className="text-[10px] text-[var(--color-text-secondary)] truncate">{user?.role as string || ''}</p>
              </div>
            </button>
            <div className="flex items-center gap-1 px-1">
              <ThemeToggle />
              <button onClick={logout} className="cursor-pointer rounded-lg p-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/5 transition-colors" title="Logout">
                <LogOut size={16} />
              </button>
              <div className="flex-1" />
              <button onClick={onToggleCollapse} className="cursor-pointer rounded-lg p-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-colors" title="Collapse sidebar">
                <PanelLeftClose size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        className={`
          fixed md:sticky md:top-0 inset-y-0 left-0 z-50
          flex flex-col
          border-r border-[var(--color-border)]
          bg-white/80 dark:bg-[#14181F]/85 backdrop-blur-xl
          overflow-hidden
          md:h-screen md:self-start
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          transition-transform duration-300 ease-in-out md:transition-none
        `}
      >
        {sidebarContent}
      </motion.aside>
    </>
  );
}
