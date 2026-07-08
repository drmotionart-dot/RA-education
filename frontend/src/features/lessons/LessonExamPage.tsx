import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, RefreshCw, XCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { QuizQuestionCard } from '../../components/ui/QuizQuestionCard';
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

  const handleComplete = useCallback(async (lId: string, aId: string) => {
    setCompleting(true);
    try {
      const result = await api.lessons.complete(lId, aId);
      setCompleteResult(result);
      setState(result.passed ? 'completed' : 'failed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete lesson');
      setState('error');
    } finally {
      setCompleting(false);
    }
  }, []);

  const loadNext = useCallback(async (aId: string, pId: string) => {
    setState('loading');
    setSelectedOption(null);
    setFeedback(null);
    try {
      const result = await api.assessment.nextQuestion(aId);
      if (result.status === 'completed') {
        await handleComplete(pId, aId);
      } else if (result.question) {
        setQuestion(result.question);
        setProgress(result.progress || { answered: 0, total: 0 });
        setState('answering');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load question');
      setState('error');
    }
  }, [handleComplete]);

  useEffect(() => { if (assessmentId && planLessonId) loadNext(assessmentId, planLessonId); }, [assessmentId, planLessonId, loadNext]);

  const handleAnswer = async () => {
    if (!assessmentId || !question || !selectedOption) return;
    setSubmitting(true);
    try {
      const result = await api.assessment.submitAnswer(assessmentId, question._id as string, [selectedOption]);
      setFeedback({ is_correct: !!result.is_correct });
      setTimeout(() => { if (assessmentId && planLessonId) loadNext(assessmentId, planLessonId); }, 1000);
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
          <Button onClick={() => { if (assessmentId && planLessonId) loadNext(assessmentId, planLessonId); }}>Try Again</Button>
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
          <Button onClick={() => { if (assessmentId && planLessonId) { setState('loading'); loadNext(assessmentId, planLessonId); } }}>
            <RefreshCw size={14} /> Retry Exam
          </Button>
          <Button variant="ghost" onClick={() => navigate(`/plan/lessons/${planLessonId}`)}>Back to Lesson</Button>
        </div>
      </div>
    );
  }

  if (state === 'answering' && question) {
    return (
      <QuizQuestionCard
        question={question}
        progress={progress}
        selectedOption={selectedOption}
        onSelectOption={setSelectedOption}
        feedback={feedback}
        submitting={submitting}
        onSubmit={handleAnswer}
        onBack={() => navigate(`/plan/lessons/${planLessonId}`)}
      />
    );
  }

  return null;
}
