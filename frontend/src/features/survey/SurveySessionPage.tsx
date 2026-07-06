import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { api } from '../../lib/api';

interface Question {
  node_id: string;
  question_text: string;
  is_universal: boolean;
  options: { index: number; option_text: string }[];
}

interface Progress {
  answered: number;
  total: number;
}

interface SessionState {
  session_id: string;
  status: string;
  question?: Question;
  progress?: Progress;
  results?: {
    matches: { specialty_name: string; similarity: number; axes_contributing: string[] }[];
    top_match: string;
    confidence: number;
  };
}

type PageState = 'loading' | 'answering' | 'completed' | 'error';

export function SurveySessionPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pageState, setPageState] = useState<PageState>('loading');
  const [question, setQuestion] = useState<Question | null>(null);
  const [progress, setProgress] = useState<Progress>({ answered: 0, total: 35 });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const loadSession = async () => {
    if (!id) { navigate('/survey'); return; }
    setPageState('loading');
    setSelectedIndex(null);
    try {
      const state: SessionState = await api.survey.state(id);
      if (state.status === 'completed') {
        navigate(`/survey/${id}/results`, { replace: true });
      } else if (state.question) {
        setQuestion(state.question);
        setProgress(state.progress || { answered: 0, total: 35 });
        setPageState('answering');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load survey');
      setPageState('error');
    }
  };

  useEffect(() => { loadSession(); }, [id]);

  const handleAnswer = async () => {
    if (!id || !question || selectedIndex === null) return;
    setSubmitting(true);
    try {
      const res = await api.survey.answer(id, question.node_id, selectedIndex);
      if (res.status === 'completed') {
        navigate(`/survey/${id}/results`, { replace: true });
      } else if (res.question) {
        setQuestion(res.question);
        setProgress(res.progress || { answered: 0, total: 35 });
        setSelectedIndex(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit answer');
      setPageState('error');
    } finally {
      setSubmitting(false);
    }
  };

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
          <Button onClick={loadSession}>Try Again</Button>
          <Button variant="ghost" onClick={() => navigate('/survey')}>Back to Survey</Button>
        </div>
      </div>
    );
  }

  if (pageState === 'answering' && question) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 py-8">
        <button
          onClick={() => navigate('/survey')}
          className="flex cursor-pointer items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
        >
          <ArrowLeft size={16} /> Back to Survey
        </button>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
            <span>Survey progress</span>
            <span>{progress.answered} of {progress.total}</span>
          </div>
          <ProgressBar value={progress.answered} max={progress.total} />
        </div>

        <div>
          {question.is_universal && (
            <span className="mb-2 inline-block rounded bg-[var(--color-primary)]/10 px-2 py-0.5 text-xs text-[var(--color-primary)]">
              General
            </span>
          )}
          <h2 className="font-heading text-lg font-semibold leading-relaxed">
            {question.question_text}
          </h2>
        </div>

        <div className="space-y-2">
          {(question.options ?? []).map((o) => {
            const isSelected = selectedIndex === o.index;
            return (
              <button
                key={o.index}
                onClick={() => setSelectedIndex(o.index)}
                className={`w-full cursor-pointer rounded-lg border p-4 text-left text-sm transition-all ${
                  isSelected
                    ? 'border-[var(--color-secondary)] bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] font-medium'
                    : 'border-[var(--color-border)] hover:border-[var(--color-secondary)]'
                }`}
              >
                {o.option_text}
              </button>
            );
          })}
        </div>

        <Button
          onClick={handleAnswer}
          loading={submitting}
          disabled={selectedIndex === null}
          className="w-full"
        >
          Next Question
        </Button>
      </div>
    );
  }

  return null;
}
