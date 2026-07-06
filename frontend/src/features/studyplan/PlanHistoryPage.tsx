import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, XCircle, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { api } from '../../lib/api';

const statusLabels: Record<string, string> = {
  active: 'Active',
  abandoned: 'Abandoned',
  completed: 'Completed',
};

const statusColors: Record<string, string> = {
  active: 'text-[var(--color-primary)]',
  abandoned: 'text-[var(--color-text-secondary)]',
  completed: 'text-[var(--color-success)]',
};

const statusIcons: Record<string, React.ReactNode> = {
  active: <Clock size={16} className="text-[var(--color-primary)]" />,
  abandoned: <XCircle size={16} className="text-[var(--color-text-secondary)]" />,
  completed: <CheckCircle size={16} className="text-[var(--color-success)]" />,
};

export function PlanHistoryPage() {
  const [plans, setPlans] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await api.plan.history();
        setPlans(data as Record<string, unknown>[]);
      } catch {
        setPlans([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="text-center text-[var(--color-text-secondary)]">Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-heading text-2xl font-bold">Plan History</h1>
      </div>

      {plans.length === 0 ? (
        <p className="text-center text-[var(--color-text-secondary)]">No plans yet.</p>
      ) : (
        <div className="space-y-3">
          {plans.map((plan) => {
            const total = Number(plan.lesson_count) || 0;
            const completed = Number(plan.completed_count) || 0;
            const status = (plan.status as string) || 'abandoned';

            return (
              <Card key={plan._id as string}>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {statusIcons[status]}
                      <span className={`text-sm font-semibold ${statusColors[status]}`}>
                        {statusLabels[status]}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      Duration: {String(plan.total_duration_months)} months
                      &middot; Created: {new Date(plan.created_at as string).toLocaleDateString()}
                    </p>
                    {!!plan.restarted_from_plan_id && (
                      <p className="text-xs text-[var(--color-secondary)] flex items-center gap-1">
                        <RefreshCw size={12} /> Restarted from a previous plan
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[var(--color-primary)]">{completed}/{total}</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">lessons</p>
                  </div>
                </div>
                {total > 0 && (
                  <ProgressBar value={completed} max={total} className="mt-2" />
                )}
              </Card>
            );
          })}
        </div>
      )}

      <div className="text-center">
        <Button variant="secondary" onClick={() => navigate('/plan')}>
          Back to Active Plan
        </Button>
      </div>
    </div>
  );
}
