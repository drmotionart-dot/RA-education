import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock, Lock, RefreshCw, Brain, AlertTriangle, History } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { api } from '../../lib/api';

export function StudyPlanPage() {
  const [plan, setPlan] = useState<Record<string, unknown> | null>(null);
  const [lessons, setLessons] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [restarting, setRestarting] = useState(false);
  const navigate = useNavigate();

  const loadPlan = async () => {
    try {
      const p = await api.plan.current();
      setPlan(p);
      setLessons((p.lessons || []) as Record<string, unknown>[]);
    } catch {
      setPlan(null);
      setLessons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPlan(); }, []);

  if (loading) return <p className="text-center text-[var(--color-text-secondary)]">Loading...</p>;

  if (!plan) {
    return (
      <div className="space-y-4 text-center">
        <h1 className="font-heading text-2xl font-bold">No Active Plan</h1>
        <p className="text-[var(--color-text-secondary)]">You haven't created a study plan yet.</p>
        <div className="flex justify-center gap-2">
          <Button onClick={() => navigate('/quick-pick')}>Create One</Button>
          <Button variant="secondary" onClick={() => navigate('/explore')}>Browse Specialties</Button>
        </div>
      </div>
    );
  }

  const total = lessons.length;
  const completed = lessons.filter((l) => l.status === 'completed').length;
  const inProgress = lessons.filter((l) => l.status === 'in_progress').length;

  const statusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-[var(--color-success)]" />;
      case 'in_progress': return <Clock size={16} className="text-[var(--color-primary)]" />;
      case 'failed_needs_retry': return <AlertTriangle size={16} className="text-[var(--color-error)]" />;
      default: return <Lock size={16} className="text-[var(--color-text-secondary)]" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">My Study Plan</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/assessment')} className="flex cursor-pointer items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
            <Brain size={14} /> Assess
          </button>
          <button onClick={() => navigate('/plan/history')} className="flex cursor-pointer items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
            <History size={14} /> History
          </button>
          <button onClick={async () => { setRestarting(true); try { await api.plan.restart(); await loadPlan(); } finally { setRestarting(false); } }} className="flex cursor-pointer items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
            <RefreshCw size={14} className={restarting ? 'animate-spin' : ''} /> Restart
          </button>
        </div>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[var(--color-text-secondary)]">Duration: {String(plan.total_duration_months)} months</p>
            <p className="text-sm text-[var(--color-text-secondary)]">Source: {plan.source as string}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-[var(--color-primary)]">{completed}/{total}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">lessons done</p>
          </div>
        </div>
        <ProgressBar value={completed} max={total} className="mt-3" />
      </Card>

      <div className="space-y-2">
        <h2 className="font-heading text-lg font-semibold">Lessons</h2>
        {lessons.map((l) => {
          const status = l.status as string;
          const linkable = status === 'in_progress' || status === 'completed' || status === 'failed_needs_retry';
          const content = (
            <Card key={l._id as string} className={`flex items-center gap-3 ${linkable ? 'cursor-pointer hover:border-[var(--color-secondary)]' : ''}`}>
              {statusIcon(status)}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${status === 'locked' ? 'text-[var(--color-text-secondary)]' : ''}`}>
                  {(l as any).lesson_title || `Lesson ${String(l.sequence_order)}`}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {String(l.allocated_days)} days
                  {l.exam_status === 'passed' ? ' &middot; Exam passed' : ''}
                  {l.exam_status === 'failed' ? ' &middot; Exam failed' : ''}
                  {status === 'failed_needs_retry' ? ' &middot; Needs retry' : ''}
                  {status === 'locked' ? ' &middot; Locked' : ''}
                </p>
              </div>
            </Card>
          );

          return linkable ? (
            <Link key={l._id as string} to={`/plan/lessons/${l._id}`}>{content}</Link>
          ) : (
            content
          );
        })}
      </div>
    </div>
  );
}
