import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Brain, ClipboardList, Compass, Plus, User } from 'lucide-react';
import { TiltCard } from '../../components/ui/TiltCard';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';

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
  const memberSince = user?.created_at
    ? new Date(user.created_at as string).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">
            {user?.name ? `Welcome, ${user.name as string}` : 'Dashboard'}
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {user?.role as string} &middot; {memberSince ? `Member since ${memberSince}` : ''}
          </p>
        </div>
        <button onClick={() => navigate('/profile')} className="flex cursor-pointer items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
          <User size={16} /> Profile
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <TiltCard onClick={() => navigate('/explore')}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
              <Compass size={20} className="text-[var(--color-primary)]" />
            </div>
            <div>
              <p className="font-semibold">Explore Specialties</p>
              <p className="text-xs text-[var(--color-text-secondary)]">Browse medical fields</p>
            </div>
          </div>
        </TiltCard>
        <TiltCard onClick={() => navigate('/quick-pick')}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
              <Plus size={20} className="text-[var(--color-primary)]" />
            </div>
            <div>
              <p className="font-semibold">Quick Pick</p>
              <p className="text-xs text-[var(--color-text-secondary)]">Create a study plan</p>
            </div>
          </div>
        </TiltCard>
        <TiltCard onClick={() => navigate('/survey')}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
              <ClipboardList size={20} className="text-[var(--color-primary)]" />
            </div>
            <div>
              <p className="font-semibold">Career Survey</p>
              <p className="text-xs text-[var(--color-text-secondary)]">Find your specialty match</p>
            </div>
          </div>
        </TiltCard>
        <TiltCard onClick={() => navigate('/assessment')}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
              <Brain size={20} className="text-[var(--color-primary)]" />
            </div>
            <div>
              <p className="font-semibold">Assessment</p>
              <p className="text-xs text-[var(--color-text-secondary)]">Test your knowledge</p>
            </div>
          </div>
        </TiltCard>
      </div>

      {loading ? (
        <p className="text-center text-sm text-[var(--color-text-secondary)]">Loading your plan...</p>
      ) : plan ? (
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                <BookOpen size={20} className="text-[var(--color-primary)]" />
              </div>
              <div>
                <p className="font-semibold">Active Study Plan</p>
                <p className="text-xs text-[var(--color-text-secondary)]">{String(plan.total_duration_months)} months &middot; {plan.source as string}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-[var(--color-primary)]">{completed}/{total}</p>
              <p className="text-xs text-[var(--color-text-secondary)]">lessons</p>
            </div>
          </div>
          <ProgressBar value={completed} max={total} className="mt-3" />
          <div className="mt-3 flex justify-end">
            <Button variant="secondary" onClick={() => navigate('/plan')}>View Plan</Button>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
              <BookOpen size={20} className="text-[var(--color-primary)]" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">No Active Plan</p>
              <p className="text-xs text-[var(--color-text-secondary)]">Create a study plan to get started</p>
            </div>
            <Button onClick={() => navigate('/quick-pick')}>Create</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
