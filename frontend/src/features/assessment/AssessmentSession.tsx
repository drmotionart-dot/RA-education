import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart3, CheckCircle, RefreshCw, XCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { TiltCard } from '../../components/ui/TiltCard';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { api } from '../../lib/api';

type State = 'loading' | 'answering' | 'completed' | 'error';

export function AssessmentSession() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState<State>('loading');
  const [question, setQuestion] = useState<Record<string, unknown> | null>(null);
  const [progress, setProgress] = useState({ answered: 0, total: 0 });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ is_correct: boolean } | null>(null);
  const [results, setResults] = useState<Record<string, unknown> | null>(null);
  const [reallocating, setReallocating] = useState(false);
  const [error, setError] = useState('');

  const loadNext = async () => {
    if (!id) return;
    setState('loading');
    setSelectedOption(null);
    setFeedback(null);
    try {
      const result = await api.assessment.nextQuestion(id);
      if (result.status === 'completed') {
        const r = await api.assessment.results(id);
        setResults(r);
        setState('completed');
      } else if (result.question) {
        setQuestion(result.question);
        setProgress(result.progress || { answered: 0, total: 0 });
        setState('answering');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load question');
      setState('error');
    }
  };

  useEffect(() => { loadNext(); }, [id]);

  const handleAnswer = async () => {
    if (!id || !question || !selectedOption) return;
    setSubmitting(true);
    try {
      const result = await api.assessment.submitAnswer(id, question._id as string, [selectedOption]);
      setFeedback({ is_correct: !!result.is_correct });
      setTimeout(() => {
        loadNext();
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReallocate = async () => {
    if (!id) return;
    setReallocating(true);
    try {
      await api.assessment.reallocate(id);
      navigate('/plan');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reallocation failed');
      setReallocating(false);
    }
  };

  if (state === 'loading') {
    return <p className="text-center text-[var(--color-text-secondary)]">Loading question...</p>;
  }

  if (state === 'error') {
    return (
      <div className="space-y-4 text-center">
        <h2 className="font-heading text-xl font-bold">Something went wrong</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">{error}</p>
        <div className="flex justify-center gap-2">
          <Button onClick={loadNext}>Try Again</Button>
          <Button variant="ghost" onClick={() => navigate('/assessment')}>Pick Another Specialty</Button>
        </div>
      </div>
    );
  }

  if (state === 'completed' && results) {
    const scoring = (results.scoring || []) as {
      branch_id: string;
      branch_name: string;
      correct: number;
      total: number;
      score_pct: number;
    }[];
    const nextAction = results.next_action as { can_reallocate: boolean; plan_id: string } | null;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="text-[var(--color-primary)]" size={28} />
          <h1 className="font-heading text-2xl font-bold">Assessment Results</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Answered {results.answered_count as number} of {results.question_count as number} questions
        </p>

        <div className="space-y-3">
          <h2 className="font-heading text-lg font-semibold">Per-Branch Performance</h2>
          {scoring.map((s) => {
            const pct = Math.round(s.score_pct * 100);
            const color = pct >= 70 ? 'var(--color-success)' : pct >= 40 ? 'var(--color-secondary)' : 'var(--color-error)';
            return (
              <TiltCard key={s.branch_id}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{s.branch_name}</span>
                  <span className="text-sm font-bold" style={{ color }}>{pct}%</span>
                </div>
                <ProgressBar value={s.correct} max={s.total} className="mt-2" />
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{s.correct}/{s.total} correct</p>
              </TiltCard>
            );
          })}
        </div>

        {nextAction?.can_reallocate && (
          <div className="flex gap-2 pt-2">
            <Button onClick={handleReallocate} loading={reallocating}>
              <RefreshCw size={16} /> Apply to Study Plan
            </Button>
            <Button variant="ghost" onClick={() => navigate('/plan')}>View Current Plan</Button>
          </div>
        )}

        <Button variant="ghost" onClick={() => navigate('/assessment')}>
          <ArrowLeft size={16} /> New Assessment
        </Button>
      </div>
    );
  }

  if (state === 'answering' && question) {
    const options = (question.options || []) as { _id: string; option_text: string; order: number }[];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/assessment')} className="flex cursor-pointer items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
            <ArrowLeft size={16} /> Back
          </button>
          <span className="text-xs text-[var(--color-text-secondary)]">
            {progress.answered + 1} of {progress.total}
          </span>
        </div>

        <ProgressBar value={progress.answered + 1} max={progress.total} />

        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded bg-[var(--color-primary)]/10 px-2 py-0.5 text-xs text-[var(--color-primary)]">
              {question.difficulty as string}
            </span>
            <span className="text-xs text-[var(--color-text-secondary)]">
              {question.question_type === 'true_false' ? 'True / False' : 'Multiple Choice'}
            </span>
          </div>
          <h2 className="font-heading text-lg font-semibold leading-relaxed">
            {question.question_text as string}
          </h2>
        </div>

        <div className="space-y-2">
          {options
            .sort((a, b) => a.order - b.order)
            .map((o) => {
              const isSelected = selectedOption === o._id;
              return (
                <button
                  key={o._id}
                  onClick={() => !feedback && setSelectedOption(o._id)}
                  className={`w-full cursor-pointer rounded-lg border p-3 text-left text-sm transition-all ${
                    isSelected
                      ? feedback
                        ? feedback.is_correct
                          ? 'border-[var(--color-success)] bg-[var(--color-success)]/20 text-[var(--color-success)] font-medium'
                          : 'border-[var(--color-error)] bg-[var(--color-error)]/20 text-[var(--color-error)] font-medium'
                        : 'border-[var(--color-secondary)] bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] font-medium'
                      : feedback && o._id === selectedOption
                      ? feedback.is_correct
                        ? 'border-[var(--color-success)] bg-[var(--color-success)]/10'
                        : 'border-[var(--color-error)] bg-[var(--color-error)]/10'
                      : 'border-[var(--color-border)] hover:border-[var(--color-secondary)]'
                  }`}
                  disabled={!!feedback}
                >
                  {o.option_text}
                </button>
              );
            })}
        </div>

        {feedback && (
          <div className={`flex items-center gap-2 rounded-lg p-3 text-sm ${feedback.is_correct ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-[var(--color-error)]/10 text-[var(--color-error)]'}`}>
            {feedback.is_correct ? <CheckCircle size={16} /> : <XCircle size={16} />}
            {feedback.is_correct ? 'Correct!' : 'Incorrect'}
          </div>
        )}

        <Button
          onClick={handleAnswer}
          loading={submitting}
          disabled={!selectedOption || !!feedback}
          className="w-full"
        >
          {feedback ? 'Next...' : 'Submit Answer'}
        </Button>
      </div>
    );
  }

  return null;
}
