import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Brain, ClipboardList, Compass, Plus, User, Users, BarChart3, Calendar, Target, TrendingUp } from 'lucide-react';
import { TiltCard } from '../../components/ui/TiltCard';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';
import { CompanionSection } from '../companion/CompanionSection';

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const [plan, setPlan] = useState<Record<string, unknown> | null>(null);
  const [lessons, setLessons] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const p = await api.plan.current();
        setPlan(p);
        setLessons((p.lessons || []) as Record<string, unknown>[]);
      } catch {
        setPlan(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const total = lessons.length;
  const completed = lessons.filter((l) => l.status === 'completed').length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const memberSince = user?.created_at
    ? new Date(user.created_at as string).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  const daysSince = user?.created_at
    ? Math.floor((Date.now() - new Date(user.created_at as string).getTime()) / 86400000)
    : 0;

  const quickActions = [
    { label: 'Explore', desc: 'Browse specialties', icon: Compass, path: '/explore', color: 'var(--color-primary)' },
    { label: 'Quick Pick', desc: 'Create a plan', icon: Plus, path: '/quick-pick', color: 'var(--color-primary)' },
    { label: 'Survey', desc: 'Find your match', icon: ClipboardList, path: '/survey', color: 'var(--color-primary)' },
    { label: 'Assessment', desc: 'Test knowledge', icon: Brain, path: '/assessment', color: 'var(--color-primary)' },
    { label: 'Paths', desc: 'Career roadmaps', icon: BarChart3, path: '/paths', color: 'var(--color-secondary)' },
    { label: 'Companion', desc: 'Study buddy', icon: Users, path: '/companion', color: 'var(--color-secondary)' },
  ];

  return (
    <div className="space-y-6">

      {/* Hero */}
      <div className="rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-heading">
              Welcome{user?.name ? `, ${user.name as string}` : ''}
            </h1>
            <p className="mt-1 text-sm text-white/70">
              {user?.role as string}
              {memberSince ? ` · Member since ${memberSince}` : ''}
            </p>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/20 transition-colors"
          >
            <User size={15} /> Profile
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
              <BookOpen size={18} className="text-[var(--color-primary)]" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-primary)]">{completed}/{total}</p>
              <p className="text-[10px] text-[var(--color-text-secondary)]">Lessons Done</p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-secondary)]/10">
              <Target size={18} className="text-[var(--color-secondary)]" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-secondary)]">{pct}%</p>
              <p className="text-[10px] text-[var(--color-text-secondary)]">Plan Progress</p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-success)]/10">
              <TrendingUp size={18} className="text-[var(--color-success)]" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-success)]">{daysSince}</p>
              <p className="text-[10px] text-[var(--color-text-secondary)]">Days Active</p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-violet)]/10">
              <Calendar size={18} className="text-[var(--color-accent-violet)]" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--color-accent-violet)]">{memberSince ? new Date().toLocaleDateString('en-US', { month: 'short' }) : '—'}</p>
              <p className="text-[10px] text-[var(--color-text-secondary)]">Current Month</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-heading text-base font-semibold mb-3">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((a) => (
            <TiltCard key={a.label} onClick={() => navigate(a.path)}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${a.color}15` }}>
                  <a.icon size={20} style={{ color: a.color }} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{a.label}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{a.desc}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Active Plan / No Plan */}
      {loading ? (
        <Card>
          <p className="text-center text-sm text-[var(--color-text-secondary)]">Loading your plan...</p>
        </Card>
      ) : plan ? (
        <Card>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                <svg className="h-16 w-16 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--color-border)" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15.5" fill="none" stroke="var(--color-primary)" strokeWidth="3"
                    strokeDasharray={`${pct} ${100 - pct}`}
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />
                </svg>
                <span className="absolute text-xs font-bold text-[var(--color-primary)]">{pct}%</span>
              </div>
              <div>
                <p className="font-semibold">Active Study Plan</p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {String(plan.total_duration_months ?? '—')} months
                  {plan.source ? ` · ${plan.source as string}` : ''}
                </p>
                <div className="mt-2">
                  <ProgressBar value={completed} max={total} />
                </div>
                <p className="mt-0.5 text-[10px] text-[var(--color-text-secondary)]">{completed}/{total} lessons</p>
              </div>
            </div>
            <Button variant="secondary" onClick={() => navigate('/plan')} className="shrink-0">
              View Plan
            </Button>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                <BookOpen size={22} className="text-[var(--color-primary)]" />
              </div>
              <div>
                <p className="font-semibold">No Active Plan</p>
                <p className="text-xs text-[var(--color-text-secondary)]">Create a study plan to start learning</p>
              </div>
            </div>
            <Button onClick={() => navigate('/quick-pick')}>Create Plan</Button>
          </div>
        </Card>
      )}

      <CompanionSection />
    </div>
  );
}
