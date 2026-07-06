import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, FileText, Globe, Loader2, Monitor, Youtube } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { api } from '../../lib/api';

const resourceIcons: Record<string, typeof Youtube> = {
  youtube_egyptian: Youtube,
  youtube_international: Youtube,
  pdf: FileText,
  official_site: Globe,
  telegram_channel: Monitor,
};

const resourceLabels: Record<string, string> = {
  youtube_egyptian: 'Arabic Video',
  youtube_international: 'Video',
  pdf: 'PDF',
  official_site: 'Website',
  telegram_channel: 'Telegram',
};

export function LessonViewPage() {
  const { planLessonId } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState<Record<string, unknown> | null>(null);
  const [planLesson, setPlanLesson] = useState<Record<string, unknown> | null>(null);
  const [resources, setResources] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [startingExam, setStartingExam] = useState(false);

  useEffect(() => {
    if (!planLessonId) return;
    (async () => {
      try {
        const plan = await api.plan.current();
        const lessons = (plan.lessons || []) as Record<string, unknown>[];
        const pl = lessons.find((l) => l._id === planLessonId);
        if (pl) {
          setPlanLesson(pl);
          const lessonData = await api.lessons.get(pl.lesson_id as string);
          setLesson(lessonData);
          const res = await api.lessons.resources(pl.lesson_id as string);
          setResources((res.resources || []) as Record<string, unknown>[]);
        }
      } catch {
        navigate('/plan');
      } finally {
        setLoading(false);
      }
    })();
  }, [planLessonId, navigate]);

  const handleStartExam = async () => {
    if (!planLessonId) return;
    setStartingExam(true);
    try {
      const exam = await api.lessons.startExam(planLessonId);
      navigate(`/plan/lessons/${planLessonId}/exam/${exam.assessment_id}`);
    } catch (err) {
      setStartingExam(false);
    }
  };

  if (loading) return <p className="text-center text-[var(--color-text-secondary)]">Loading...</p>;
  if (!lesson || !planLesson) return <p className="text-center text-[var(--color-text-secondary)]">Lesson not found</p>;

  const status = planLesson.status as string;
  const examStatus = planLesson.exam_status as string;

  const statusBadge = () => {
    if (status === 'completed') return <span className="rounded bg-[var(--color-success)]/10 px-2 py-0.5 text-xs text-[var(--color-success)]">Completed</span>;
    if (status === 'in_progress') return <span className="rounded bg-[var(--color-primary)]/10 px-2 py-0.5 text-xs text-[var(--color-primary)]">In Progress</span>;
    if (status === 'failed_needs_retry') return <span className="rounded bg-[var(--color-error)]/10 px-2 py-0.5 text-xs text-[var(--color-error)]">Needs Retry</span>;
    return <span className="rounded bg-[var(--color-text-secondary)]/10 px-2 py-0.5 text-xs text-[var(--color-text-secondary)]">Locked</span>;
  };

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/plan')} className="flex cursor-pointer items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
        <ArrowLeft size={16} /> Back to Plan
      </button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">{lesson.title as string}</h1>
          <div className="mt-1 flex items-center gap-2">
            {statusBadge()}
            {examStatus === 'passed' && <span className="rounded bg-[var(--color-success)]/10 px-2 py-0.5 text-xs text-[var(--color-success)]">Exam Passed</span>}
            {examStatus === 'failed' && <span className="rounded bg-[var(--color-error)]/10 px-2 py-0.5 text-xs text-[var(--color-error)]">Exam Failed</span>}
          </div>
        </div>
      </div>

      {(lesson.description as string) && (
        <p className="text-sm text-[var(--color-text-secondary)]">{lesson.description as string}</p>
      )}

      {(lesson.duration_minutes as number) && (
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
          <Clock size={14} />
          <span>{lesson.duration_minutes as number} minutes</span>
        </div>
      )}

      {resources.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-heading text-lg font-semibold">Study Resources</h2>
          <div className="space-y-2">
            {resources.map((r, i) => {
              const Icon = resourceIcons[r.type as string] || FileText;
              return (
                <Card key={i} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                    <Icon size={16} className="text-[var(--color-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{r.title as string}</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">{resourceLabels[r.type as string] || r.type as string} &middot; {r.language as string === 'ar' ? 'Arabic' : 'English'}</p>
                  </div>
                  <a href={r.url as string} target="_blank" rel="noopener noreferrer" className="shrink-0 text-xs text-[var(--color-primary)] hover:underline">Open</a>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {(status === 'in_progress' || status === 'failed_needs_retry') && (
        <div className="flex gap-2 pt-2">
          <Button onClick={handleStartExam} loading={startingExam}>
            {examStatus === 'failed' ? 'Retry Exam' : 'Start Exam'}
          </Button>
        </div>
      )}

      {status === 'completed' && (
        <div className="flex items-center gap-2 rounded-lg bg-[var(--color-success)]/10 p-3 text-sm text-[var(--color-success)]">
          <BookOpen size={16} />
          Lesson completed
        </div>
      )}
    </div>
  );
}
