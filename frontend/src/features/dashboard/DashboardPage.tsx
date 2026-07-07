import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Brain, ClipboardList, Compass, Plus, User, Users, BarChart3, Calendar, Target, TrendingUp, Flame } from 'lucide-react';
import { TiltCard } from '../../components/ui/TiltCard';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { StatCard } from '../../components/ui/StatCard';
import { ProgressRing } from '../../components/ui/ProgressRing';
import { BarChart } from '../../components/ui/BarChart';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';
import { CompanionSection } from '../companion/CompanionSection';

const weeklyData = [
  { label: 'M', value: 2 },
  { label: 'T', value: 4 },
  { label: 'W', value: 3 },
  { label: 'T', value: 5 },
  { label: 'F', value: 1 },
  { label: 'S', value: 3 },
  { label: 'S', value: 2 },
];

const sparklineData = [3, 5, 2, 6, 4, 7, 5];

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

  const inProgressLessons = lessons.filter((l) => l.status === 'in_progress').slice(0, 3);

  return (
    <div className="space-y-6">

      {/* Hero */}
      <div className="rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-xl font-bold">
              {(user?.name as string)?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-bold font-heading">
                Welcome{user?.name ? `, ${user.name as string}` : ''}
              </h1>
              <p className="mt-0.5 text-sm text-white/70">
                {user?.role as string}
                {memberSince ? ` · Member since ${memberSince}` : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80">
              <Flame size={15} className="text-[var(--color-secondary)]" />
              <span>{daysSince} day streak</span>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/20 transition-colors"
            >
              <User size={15} /> Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={BookOpen}
          label="Lessons Done"
          value={`${completed}/${total}`}
          trend="up"
          trendValue="+2"
          sparklineData={sparklineData}
          color="var(--color-primary)"
        />
        <StatCard
          icon={Target}
          label="Plan Progress"
          value={`${pct}%`}
          trend={pct > 0 ? 'up' : undefined}
          trendValue={`${pct}%`}
          color="var(--color-secondary)"
        />
        <StatCard
          icon={TrendingUp}
          label="Days Active"
          value={`${daysSince}`}
          sparklineData={sparklineData.map((v) => v + 1)}
          color="var(--color-success)"
        />
        <StatCard
          icon={Calendar}
          label="This Month"
          value={new Date().toLocaleDateString('en-US', { month: 'short' })}
          color="var(--color-accent-violet)"
        />
      </div>

      {/* Progress + Activity */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {plan && (
          <Card className="!p-5">
            <h3 className="font-heading text-sm font-semibold text-[var(--color-text-primary)] mb-3">Overall Progress</h3>
            <div className="flex items-center gap-5">
              <div className="relative flex items-center justify-center">
                <ProgressRing percentage={pct} size={88} strokeWidth={7} progressColor="var(--color-secondary)" />
                <span className="absolute text-lg font-bold text-[var(--color-primary)]">{pct}%</span>
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[var(--color-text-secondary)]">Completed</span>
                    <span className="font-medium">{completed}/{total} lessons</span>
                  </div>
                  <ProgressBar value={completed} max={total} />
                </div>
                <p className="text-[10px] text-[var(--color-text-secondary)]">
                  {String(plan.total_duration_months ?? '—')} months
                  {plan.source ? ` · ${plan.source as string}` : ''}
                </p>
                <Button size="sm" variant="secondary" onClick={() => navigate('/plan')}>View Plan</Button>
              </div>
            </div>
          </Card>
        )}
        <Card className={`!p-5 ${!plan ? 'md:col-span-2' : ''}`}>
          <h3 className="font-heading text-sm font-semibold text-[var(--color-text-primary)] mb-3">Weekly Activity</h3>
          <BarChart data={weeklyData} height={96} barColor="var(--color-secondary)" className="mt-4" />
          <p className="mt-2 text-[10px] text-[var(--color-text-secondary)] text-center">Hours studied this week</p>
        </Card>
      </div>

      {/* Continue Studying */}
      {inProgressLessons.length > 0 && (
        <div>
          <h2 className="font-heading text-base font-semibold text-[var(--color-text-primary)] mb-3">Continue Studying</h2>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {inProgressLessons.map((lesson, i) => {
              const title = (lesson.lesson_title as string) || `Lesson ${lesson.sequence_order as string}`;
              const branch = lesson.branch_name as string;
              return (
                <Card key={i} hoverable onClick={() => navigate(`/plan/lessons/${lesson._id as string}`)}>
                  <p className="text-xs text-[var(--color-secondary)] font-medium mb-1">{branch || 'General'}</p>
                  <p className="font-semibold text-sm text-[var(--color-text-primary)]">{title}</p>
                  <div className="mt-2">
                    <ProgressBar value={0} max={1} />
                  </div>
                  <p className="text-[10px] text-[var(--color-text-secondary)] mt-1">Continue →</p>
                </Card>
              );
            })}
            <Card hoverable onClick={() => navigate('/plan')} className="flex items-center justify-center !p-4">
              <p className="text-sm text-[var(--color-text-secondary)]">View all lessons →</p>
            </Card>
          </div>
        </div>
      )}

      {/* No Plan Card */}
      {!loading && !plan && (
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

      {/* Loading */}
      {loading && (
        <Card>
          <p className="text-center text-sm text-[var(--color-text-secondary)]">Loading your plan...</p>
        </Card>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="font-heading text-base font-semibold text-[var(--color-text-primary)] mb-3">Quick Actions</h2>
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

      <CompanionSection />
    </div>
  );
}
