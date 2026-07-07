import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Stethoscope } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { api } from '../../lib/api';

export function AssessmentPage() {
  const [specialties, setSpecialties] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState<string | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.catalog.specialties().then(setSpecialties).catch((err: Error) => setError(err.message || 'Failed to load specialties')).finally(() => setLoading(false));
  }, []);

  const handleStart = async (specialtyId: string) => {
    setStarting(specialtyId);
    try {
      const result = await api.assessment.start(specialtyId);
      navigate(`/assessment/${result.assessment_id}`);
    } catch (err) {
      console.error(err);
      setStarting(null);
    }
  };

  if (loading) return <p className="text-center text-[var(--color-text-secondary)]">Loading...</p>;
  if (error) return <p className="text-center text-[var(--color-error)]">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Brain className="text-[var(--color-primary)]" size={28} />
        <h1 className="font-heading text-2xl font-bold">Diagnostic Assessment</h1>
      </div>
      <p className="text-[var(--color-text-secondary)]">
        Choose a specialty to test your knowledge. The assessment will identify your strengths and
        weaknesses across branches, then adjust your study plan accordingly.
      </p>
      <div className="grid gap-3">
        {specialties.map((s) => (
          <Card
            key={s._id as string}
            onClick={() => handleStart(s._id as string)}
            className="cursor-pointer hover:border-[var(--color-secondary)] transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                <Stethoscope className="text-[var(--color-primary)]" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{s.name as string}</h3>
                <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">{s.description as string}</p>
                {starting === s._id && <p className="mt-1 text-xs text-[var(--color-primary)]">Starting assessment...</p>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
