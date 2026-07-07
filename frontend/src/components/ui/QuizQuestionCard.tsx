import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';

interface QuizQuestionCardProps {
  question: Record<string, unknown>;
  progress: { answered: number; total: number };
  selectedOption: string | null;
  onSelectOption: (id: string) => void;
  feedback: { is_correct: boolean } | null;
  submitting: boolean;
  onSubmit: () => void;
  onBack: () => void;
}

export function QuizQuestionCard({
  question,
  progress,
  selectedOption,
  onSelectOption,
  feedback,
  submitting,
  onSubmit,
  onBack,
}: QuizQuestionCardProps) {
  const options = (question.options || []) as { _id: string; option_text: string; order: number }[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex cursor-pointer items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
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
              onClick={() => !feedback && onSelectOption(o._id)}
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
        onClick={onSubmit}
        loading={submitting}
        disabled={!selectedOption || !!feedback}
        className="w-full"
      >
        {feedback ? 'Next...' : 'Submit Answer'}
      </Button>
    </div>
  );
}
