import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, BookOpen, Languages, DollarSign, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { api } from '../../lib/api';

export function PathDetail() {
  const { id } = useParams();
  const [path, setPath] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    api.catalog.path(id).then(setPath).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center text-[var(--color-text-secondary)]">Loading...</p>;
  if (!path) return <p className="text-center text-[var(--color-error)]">Path not found</p>;

const exams = (path.required_exams || []) as Record<string, string | number>[];
const langTests = (path.required_language_tests || []) as Record<string, string>[];

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] cursor-pointer">
        <ArrowLeft size={16} /> Back
      </button>

      <div>
        <h1 className="font-heading text-2xl font-bold">{path.name as string}</h1>
        <p className="mt-1 text-[var(--color-text-secondary)]">{path.description as string}</p>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-[var(--color-primary)]">
          <Globe size={14} /> {path.target_country as string}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-secondary)]/10 px-3 py-1 text-[var(--color-secondary)]">
          <DollarSign size={14} /> ${String(path.total_estimated_cost_usd)}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-[var(--color-accent)]">
          <Clock size={14} /> {path.total_duration_months as string} months
        </span>
      </div>

      {exams.length > 0 && (
        <div>
          <h2 className="font-heading text-lg font-semibold flex items-center gap-2"><BookOpen size={18} /> Required Exams</h2>
          <div className="mt-2 space-y-2">
            {exams.map((e, i) => (
              <div key={i} className="rounded-lg border border-[var(--color-border)] p-3">
                <h3 className="font-medium">{e.name as string}</h3>
                {e.format && <p className="text-sm text-[var(--color-text-secondary)]">Format: {e.format as string}</p>}
                {e.cost_usd && <p className="text-sm text-[var(--color-text-secondary)]">Cost: ${String(e.cost_usd)}</p>}
                {e.retake_policy && <p className="text-sm text-[var(--color-text-secondary)]">Retake: {e.retake_policy as string}</p>}
                {e.official_link && <a href={e.official_link as string} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-primary)] hover:underline">Official site</a>}
              </div>
            ))}
          </div>
        </div>
      )}

      {langTests.length > 0 && (
        <div>
          <h2 className="font-heading text-lg font-semibold flex items-center gap-2"><Languages size={18} /> Language Tests</h2>
          <div className="mt-2 space-y-2">
            {langTests.map((t, i) => (
              <div key={i} className="rounded-lg border border-[var(--color-border)] p-3">
                <h3 className="font-medium">{t.test_name as string}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">Language: {t.language as string}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">Min score: {t.min_score as string}</p>
                {t.official_link && <a href={t.official_link as string} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-primary)] hover:underline">Official site</a>}
              </div>
            ))}
          </div>
        </div>
      )}

      {!!path.egypt_specific_notes && (
        <div className="rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-3">
          <h2 className="font-heading text-sm font-semibold text-[var(--color-accent)]">Egypt-Specific Notes</h2>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{path.egypt_specific_notes as string}</p>
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <Button onClick={() => navigate(`/quick-pick?pathId=${id}`)}>
          Start This Path
        </Button>
      </div>
    </div>
  );
}
