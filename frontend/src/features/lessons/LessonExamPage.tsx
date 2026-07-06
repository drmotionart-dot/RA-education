import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle, Loader2, RefreshCw, XCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { api } from '../../lib/api';

type State = 'loading' | 'answering' | 'completed' | 'failed' | 'error';

export function LessonExamPage() {
  const { planLessonId, assessmentId } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState<State>('loading');
  const [question, setQuestion] = useState<Record<string, unknown> | null>(null);
  const [progress, setProgress] = useState({ answered: 0, total: 0 });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ is_correct: boolean } | null>(null);
  const [completeResult, setCompleteResult] = useState<Record<string, unknown> | null>(null);
  const [completing, setCompleting] = useState(false);
  const [error, setError] = useState('');

  const loadNext = async () => {
    if (!assessmentId) return;
    setState('loading');
    setSelectedOption(null);
    setFeedback(null);
    try {
      const result = await api.assessment.nextQuestion(assessmentId);
      if (result.status === 'completed') {
        await handleComplete();
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

  const handleComplete = async () => {
    if (!planLessonId || !assessmentId) return;
    setCompleting(true);
    try {
      const result = await api.lessons.complete(planLessonId, assessmentId);
      setCompleteResult(result);
      setState(result.passed ? 'completed' : 'failed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete lesson');
      setState('error');
    } finally {
      setCompleting(false);
    }
  };

  useEffect(() => { loadNext(); }, [assessmentId]);

  const handleAnswer = async () => {
    if (!assessmentId || !question || !selectedOption) return;
    setSubmitting(true);
    try {
      const result = await api.assessment.submitAnswer(assessmentId, question._id as string, [selectedOption]);
      setFeedback({ is_correct: !!result.is_correct });
      setTimeout(() => { loadNext(); }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  if (completing) return <p className="text-center text-[var(--color-text-secondary)]">Marking lesson complete...</p>;

  if (state === 'loading') return <p className="text-center text-[var(--color-text-secondary)]">Loading question...</p>;

  if (state === 'error') {
    return (
      <div className="space-y-4 text-center">
        <h2 className="font-heading text-xl font-bold">Something went wrong</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">{error}</p>
        <div className="flex justify-center gap-2">
          <Button onClick={loadNext}>Try Again</Button>
          <Button variant="ghost" onClick={() => navigate(`/plan/lessons/${planLessonId}`)}>Back to Lesson</Button>
        </div>
      </div>
    );
  }

  if (state === 'completed') {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-success)]/10">
            <CheckCircle size={32} className="text-[var(--color-success)]" />
          </div>
        </div>
        <h1 className="font-heading text-2xl font-bold">Exam Passed!</h1>
        <div className="flex justify-center gap-2">
          <Button onClick={() => {
            if (completeResult?.next_lesson_id) {
              navigate(`/plan/lessons/${completeResult.next_lesson_id}`);
            } else {
              navigate('/plan');
            }
          }}>
            {completeResult?.next_lesson_id ? 'Next Lesson' : 'Back to Plan'}
          </Button>
        </div>
      </div>
    );
  }

  if (state === 'failed') {
    const suggestions = (completeResult?.suggestions || []) as { id: string; title: string; description: string }[];
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-error)]/10">
            <XCircle size={32} className="text-[var(--color-error)]" />
          </div>
        </div>
        <h1 className="font-heading text-2xl font-bold">Exam Not Passed</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Score: {Math.round((completeResult?.score as number) || 0)}% &middot; Minimum: {completeResult?.min_pass_score as number}%
        </p>

        {suggestions.length > 0 && (
          <div className="space-y-2 text-left">
            <p className="text-sm font-medium">Suggested related lessons:</p>
            {suggestions.map((s) => (
              <div key={s.id} className="rounded-lg border border-[var(--color-border)] p-3">
                <p className="text-sm font-medium">{s.title}</p>
                {s.description && <p className="text-xs text-[var(--color-text-secondary)]">{s.description}</p>}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center gap-2">
          <Button onClick={() => { setState('loading'); loadNext(); }}>
            <RefreshCw size={14} /> Retry Exam
          </Button>
          <Button variant="ghost" onClick={() => navigate(`/plan/lessons/${planLessonId}`)}>Back to Lesson</Button>
        </div>
      </div>
    );
  }

  if (state === 'answering' && question) {
    const options = (question.options || []) as { _id: string; option_text: string; order: number }[];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(`/plan/lessons/${planLessonId}`)} className="flex cursor-pointer items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
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
          {options.sort((a, b) => a.order - b.order).map((o) => {
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
