import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Brain, ClipboardList, Compass, Plus, User, Users, BarChart3, Calendar, Target, TrendingUp, Flame, ArrowRight, GraduationCap, Award } from 'lucide-react';
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

const categoryData = [
  { name: 'Medicine', pct: 60, color: 'var(--color-secondary)' },
  { name: 'Surgery', pct: 30, color: 'var(--color-success)' },
  { name: 'Pediatrics', pct: 45, color: 'var(--color-accent-violet)' },
  { name: 'ICU', pct: 20, color: 'var(--color-primary)' },
];

function SectionHeader({ title, action }: { title: string; action?: { label: string; onClick: () => void } }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="h-6 w-1 rounded-full bg-[var(--color-secondary)]" />
        <h2 className="font-heading text-base font-semibold text-[var(--color-text-primary)]">{title}</h2>
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="flex items-center gap-1 text-xs font-medium text-[var(--color-secondary)] hover:underline cursor-pointer"
        >
          {action.label} <ArrowRight size={12} />
        </button>
      )}
    </div>
  );
}

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
    <div className="space-y-8">

      {/* ───── Hero ───── */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] p-6 sm:p-8 text-white">
        <svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="hero-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl font-bold ring-2 ring-white/20 ring-offset-2 ring-offset-[var(--color-primary)]">
              {(user?.name as string)?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-heading">
                Welcome{user?.name ? `, ${user.name as string}` : ''}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/70">
                <span className="flex items-center gap-1"><GraduationCap size={14} />{user?.role as string}</span>
                {memberSince && <span>· Member since {memberSince}</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 backdrop-blur-sm">
              <Flame size={16} className="text-[var(--color-secondary)]" />
              <span className="font-semibold">{daysSince}</span>
              <span className="text-white/60">day streak</span>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              <User size={15} /> Profile
            </button>
          </div>
        </div>
      </div>

      {/* ───── Stats ───── */}
      <div>
        <SectionHeader title="Overview" action={{ label: 'View Profile', onClick: () => navigate('/profile') }} />
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={BookOpen}
            label="Lessons Done"
            value={`${completed}/${total}`}
            trend="up"
            trendValue="+2 this week"
            sparklineData={sparklineData}
            color="var(--color-primary)"
          />
          <StatCard
            icon={Target}
            label="Plan Progress"
            value={`${pct}%`}
            trend={pct > 0 ? 'up' : undefined}
            trendValue={`${pct}% complete`}
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
      </div>

      {/* ───── Progress + Activity ───── */}
      <div>
        <SectionHeader title="Your Progress" action={plan ? { label: 'View Full Plan', onClick: () => navigate('/plan') } : undefined} />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {plan ? (
            <Card className="!p-6">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-6">
                  <div className="relative flex items-center justify-center">
                    <ProgressRing percentage={pct} size={96} strokeWidth={8} progressColor="var(--color-secondary)" />
                    <span className="absolute text-xl font-bold text-[var(--color-primary)]">{pct}%</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[var(--color-text-secondary)]">Lessons completed</span>
                        <span className="font-semibold">{completed}/{total}</span>
                      </div>
                      <ProgressBar value={completed} max={total} />
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {String(plan.total_duration_months ?? '—')} months
                      {plan.source ? ` · ${plan.source as string}` : ''}
                    </p>
                  </div>
                </div>
                <div className="border-t border-[var(--color-border)] pt-4">
                  <p className="text-xs font-semibold text-[var(--color-text-secondary)] mb-3 uppercase tracking-wider">Category Breakdown</p>
                  <div className="space-y-2.5">
                    {categoryData.map((cat) => (
                      <div key={cat.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[var(--color-text-primary)]">{cat.name}</span>
                          <span className="font-medium" style={{ color: cat.color }}>{cat.pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[var(--color-border)] overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${cat.pct}%`, backgroundColor: cat.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ) : !loading ? (
            <Card className="!p-6 flex items-center gap-4 md:col-span-2">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--color-secondary)]/10">
                <Award size={28} className="text-[var(--color-secondary)]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[var(--color-text-primary)]">No active study plan yet</p>
                <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">Take a survey or use Quick Pick to create your personalized plan</p>
              </div>
              <Button onClick={() => navigate('/survey')}>Get Started</Button>
            </Card>
          ) : null}
          <Card className="!p-6">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-heading text-sm font-semibold text-[var(--color-text-primary)]">Weekly Activity</h3>
              <span className="text-xs text-[var(--color-text-secondary)]">17 hrs this week</span>
            </div>
            <BarChart data={weeklyData} height={110} barColor="var(--color-secondary)" className="mt-4" />
          </Card>
        </div>
      </div>

      {/* ───── Continue Studying ───── */}
      {inProgressLessons.length > 0 && (
        <div>
          <SectionHeader title="Continue Studying" action={{ label: 'View All', onClick: () => navigate('/plan') }} />
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {inProgressLessons.map((lesson, i) => {
              const title = (lesson.lesson_title as string) || `Lesson ${lesson.sequence_order as string}`;
              const branch = lesson.branch_name as string;
              return (
                <Card key={i} hoverable onClick={() => navigate(`/plan/lessons/${lesson._id as string}`)} className="!p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-secondary)]/10">
                      <BookOpen size={18} className="text-[var(--color-secondary)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      {branch && (
                        <span className="inline-block rounded-md bg-[var(--color-secondary)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--color-secondary)] mb-1.5">
                          {branch}
                        </span>
                      )}
                      <p className="font-semibold text-sm text-[var(--color-text-primary)] truncate">{title}</p>
                      <div className="mt-2">
                        <ProgressBar value={0} max={1} />
                      </div>
                      <p className="text-[11px] text-[var(--color-secondary)] font-medium mt-1.5 flex items-center gap-1">
                        Continue <ArrowRight size={11} />
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
            <Card hoverable onClick={() => navigate('/plan')} className="flex items-center justify-center !p-5 border-dashed">
              <div className="text-center">
                <p className="text-sm font-medium text-[var(--color-text-secondary)]">View all lessons</p>
                <ArrowRight size={16} className="mx-auto mt-1 text-[var(--color-text-secondary)]" />
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ───── Loading ───── */}
      {loading && (
        <Card className="!p-8">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-secondary)] border-t-transparent" />
            <p className="text-sm text-[var(--color-text-secondary)]">Loading your dashboard...</p>
          </div>
        </Card>
      )}

      {/* ───── Quick Actions ───── */}
      <div>
        <SectionHeader title="Quick Actions" />
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
