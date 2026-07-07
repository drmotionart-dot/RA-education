import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, GraduationCap } from 'lucide-react';
import { StaleBadge } from '../../components/ui/StaleBadge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { api } from '../../lib/api';

export function SpecialtyDetail() {
  const { id } = useParams();
  const [specialty, setSpecialty] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    api.catalog.specialty(id).then(setSpecialty).catch((err: Error) => setError(err.message || 'Failed to load specialty')).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center text-[var(--color-text-secondary)]">Loading...</p>;
  if (error) return <p className="text-center text-[var(--color-error)]">{error}</p>;
  if (!specialty) return <p className="text-center text-[var(--color-error)]">Specialty not found</p>;

  const branches = (specialty.branches || []) as Record<string, unknown>[];

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] cursor-pointer">
        <ArrowLeft size={16} /> Back
      </button>
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-heading text-2xl font-bold">{specialty.name as string}</h1>
          <StaleBadge isStale={!!specialty.is_stale} />
        </div>
        <p className="mt-1 text-[var(--color-text-secondary)]">{specialty.description as string}</p>
      </div>
      <div className="flex gap-4 text-sm">
        <span className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-[var(--color-primary)]">{specialty.training_duration_years as string} yr training</span>
        <span className="rounded-full bg-[var(--color-secondary)]/10 px-3 py-1 text-[var(--color-secondary)]">Demand: {specialty.market_demand_egypt as string}</span>
      </div>
      <div>
        <h2 className="font-heading text-lg font-semibold">Branches</h2>
        <div className="mt-2 grid gap-3">
          {branches.map((b) => (
            <Card key={b._id as string}>
              <div className="flex items-start gap-3">
                <BookOpen size={18} className="mt-1 text-[var(--color-primary)]" />
                <div>
                  <h3 className="font-medium">{b.name as string}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{b.description as string}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <Button onClick={() => navigate('/paths')}>
          <GraduationCap size={16} /> View Paths
        </Button>
        <Button variant="secondary" onClick={() => navigate(`/quick-pick?specialtyId=${id}`)}>
          Quick Pick This
        </Button>
      </div>
    </div>
  );
}
