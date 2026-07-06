import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Compass, Stethoscope, Syringe } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { api } from '../../lib/api';

type SurveyType = 'specialty' | 'path' | null;
type Role = 'doctor' | 'nurse' | null;

export function SurveyLandingPage() {
  const navigate = useNavigate();
  const [surveyType, setSurveyType] = useState<SurveyType>(null);
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStart = async () => {
    if (!surveyType || !role) return;
    setLoading(true);
    setError('');
    try {
      const res = await api.survey.start(surveyType, role);
      navigate(`/survey/${res.session_id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start survey');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-8">
      <div className="space-y-2 text-center">
        <h1 className="font-heading text-3xl font-bold">Career Guidance Survey</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Answer a few questions and we&apos;ll match you with the specialties or paths that suit you best.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading text-lg font-semibold">What would you like to explore?</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card
            className={`border-2 p-6 text-center transition-all ${
              surveyType === 'specialty'
                ? 'border-[var(--color-secondary)] bg-[var(--color-secondary)]/5'
                : 'border-[var(--color-border)]'
            }`}
            onClick={() => setSurveyType('specialty')}
          >
            <Stethoscope size={32} className="mx-auto mb-2 text-[var(--color-primary)]" />
            <h3 className="font-heading font-semibold">Specialties</h3>
            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
              Find which medical specialty fits your personality
            </p>
          </Card>
          <Card
            className={`border-2 p-6 text-center transition-all ${
              surveyType === 'path'
                ? 'border-[var(--color-secondary)] bg-[var(--color-secondary)]/5'
                : 'border-[var(--color-border)]'
            }`}
            onClick={() => setSurveyType('path')}
          >
            <Compass size={32} className="mx-auto mb-2 text-[var(--color-primary)]" />
            <h3 className="font-heading font-semibold">Paths</h3>
            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
              Discover which career path aligns with your goals
            </p>
          </Card>
        </div>
      </div>

      {surveyType && (
        <div className="space-y-4 animate-[fadeIn_0.3s_ease]">
          <h2 className="font-heading text-lg font-semibold">What is your role?</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card
              className={`border-2 p-6 text-center transition-all ${
                role === 'doctor'
                  ? 'border-[var(--color-secondary)] bg-[var(--color-secondary)]/5'
                  : 'border-[var(--color-border)]'
              }`}
              onClick={() => setRole('doctor')}
            >
              <ClipboardList size={32} className="mx-auto mb-2 text-[var(--color-primary)]" />
              <h3 className="font-heading font-semibold">Doctor</h3>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">I am a medical doctor</p>
            </Card>
            <Card
              className={`border-2 p-6 text-center transition-all ${
                role === 'nurse'
                  ? 'border-[var(--color-secondary)] bg-[var(--color-secondary)]/5'
                  : 'border-[var(--color-border)]'
              }`}
              onClick={() => setRole('nurse')}
            >
              <Syringe size={32} className="mx-auto mb-2 text-[var(--color-primary)]" />
              <h3 className="font-heading font-semibold">Nurse</h3>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">I am a nurse</p>
            </Card>
          </div>
        </div>
      )}

      {error && (
        <p className="text-center text-sm text-[var(--color-error)]">{error}</p>
      )}

      {surveyType && role && (
        <div className="text-center">
          <Button onClick={handleStart} loading={loading} className="px-8">
            Start Survey
          </Button>
        </div>
      )}
    </div>
  );
}
