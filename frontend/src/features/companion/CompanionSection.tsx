import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserPlus, MessageSquare } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { api } from '../../lib/api';

export function CompanionSection() {
  const [companion, setCompanion] = useState<{ name: string; role: string; has_active_plan: boolean; lesson_progress: { total: number; completed: number } } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const c = await api.companion.get();
        setCompanion(c);
      } catch {
        setCompanion(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return null;

  return (
    <Card>
      {companion ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-secondary)]/10">
                <Users size={20} className="text-[var(--color-secondary)]" />
              </div>
              <div>
                <p className="font-semibold">Study Companion</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{companion.name} &middot; {companion.role}</p>
              </div>
            </div>
            <Button variant="secondary" onClick={() => navigate('/companion')}>
              <MessageSquare size={14} /> View
            </Button>
          </div>
          {companion.has_active_plan && (
            <div>
              <p className="text-xs text-[var(--color-text-secondary)] mb-1">Companion's progress</p>
              <ProgressBar value={companion.lesson_progress.completed} max={companion.lesson_progress.total} />
              <p className="text-xs text-right text-[var(--color-text-secondary)] mt-1">
                {companion.lesson_progress.completed}/{companion.lesson_progress.total} lessons
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-secondary)]/10">
            <UserPlus size={20} className="text-[var(--color-secondary)]" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Find a Companion</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Pair with someone in your specialty</p>
          </div>
          <Button onClick={() => navigate('/companion')}>Find</Button>
        </div>
      )}
    </Card>
  );
}
