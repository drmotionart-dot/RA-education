import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BarChart3, ExternalLink, Loader2, RotateCcw, Star } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { TiltCard } from '../../components/ui/TiltCard';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { api } from '../../lib/api';

interface Match {
  specialty_name: string;
  specialty_id: string | null;
  similarity: number;
  axes_contributing: string[];
}

interface SurveyResult {
  session_id: string;
  status: string;
  results: {
    matches: Match[];
    top_match: string;
    confidence: number;
  };
}

type PageState = 'loading' | 'ready' | 'error';

export function SurveyResultsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pageState, setPageState] = useState<PageState>('loading');
  const [result, setResult] = useState<SurveyResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) { navigate('/survey'); return; }

    const fetchResults = async () => {
      try {
        let data: SurveyResult;
        const state = await api.survey.state(id);
        if (state.status === 'completed' && state.results) {
          data = state as SurveyResult;
        } else {
          data = await api.survey.complete(id);
        }
        setResult(data);
        setPageState('ready');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load results');
        setPageState('error');
      }
    };

    fetchResults();
  }, [id]);

  if (pageState === 'loading') {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-[var(--color-primary)]" />
      </div>
    );
  }

  if (pageState === 'error') {
    return (
      <div className="mx-auto max-w-lg space-y-4 py-12 text-center">
        <h2 className="font-heading text-xl font-bold">Something went wrong</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">{error}</p>
        <div className="flex justify-center gap-2">
          <Button onClick={() => window.location.reload()}>Try Again</Button>
          <Button variant="ghost" onClick={() => navigate('/survey')}>Start New Survey</Button>
        </div>
      </div>
    );
  }

  if (!result?.results?.matches) return null;

  const { matches, top_match, confidence } = result.results;

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-8">
      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center gap-3">
          <BarChart3 className="text-[var(--color-primary)]" size={28} />
          <h1 className="font-heading text-2xl font-bold">Your Survey Results</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Based on your responses, here are your top matches
        </p>
      </div>

      {top_match && matches[0] && (
        <Link to={matches[0].specialty_id ? `/explore/specialties/${matches[0].specialty_id}` : '#'} className="block">
          <TiltCard className="border-[var(--color-accent-violet)] p-6 text-center">
            <Star size={32} className="mx-auto mb-2 text-[var(--color-secondary)]" />
            <h2 className="font-heading text-xl font-bold">{top_match}</h2>
            <div className="mt-2 flex items-center justify-center gap-2">
              <ProgressBar value={confidence} max={100} className="w-40" />
              <span className="text-sm font-bold text-[var(--color-primary)]">{confidence}%</span>
            </div>
            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">Best match</p>
          </TiltCard>
        </Link>
      )}

      <div className="space-y-3">
        <h2 className="font-heading text-lg font-semibold">Top 5 Matches</h2>
        {matches.map((m, i) => {
          const pct = Math.round(m.similarity * 100);
          const isTop = i === 0;
          const content = (
            <TiltCard key={m.specialty_name} className={isTop ? 'border-[var(--color-primary)]' : ''}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isTop && <Star size={14} className="text-[var(--color-secondary)]" />}
                  <span className="font-medium hover:text-[var(--color-secondary)] transition-colors">
                    {m.specialty_name}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-sm font-bold text-[var(--color-primary)]">
                  {pct}% {!isTop && <ExternalLink size={12} />}
                </span>
              </div>
              <ProgressBar value={pct} max={100} className="mt-2" />
              {isTop && m.axes_contributing.length > 0 && (
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-[var(--color-text-secondary)]">Why this matches:</p>
                  <ul className="space-y-0.5">
                    {m.axes_contributing.map((ax) => (
                      <li key={ax} className="text-xs text-[var(--color-text-secondary)]">
                        &bull; Strong alignment in {ax.replace(/_/g, ' ')}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TiltCard>
          );
          return m.specialty_id ? (
            <Link key={m.specialty_name} to={`/explore/specialties/${m.specialty_id}`}>{content}</Link>
          ) : content;
        })}
      </div>

      <div className="flex justify-center gap-3 pt-4">
        <Button onClick={() => navigate('/survey')}>
          <RotateCcw size={16} /> Take Another Survey
        </Button>
        <Button variant="ghost" onClick={() => navigate('/paths')}>
          <ExternalLink size={16} /> View Recommended Paths
        </Button>
      </div>
    </div>
  );
}
