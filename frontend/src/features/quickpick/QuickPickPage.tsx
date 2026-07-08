import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Zap } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';

export function QuickPickPage() {
  const user = useAuthStore((s) => s.user);
  const category = (user?.role as string)?.split('_')[0] || '';
  const [searchParams] = useSearchParams();
  const preselectedPathId = searchParams.get('pathId') || '';
  const preselectedSpecialtyId = searchParams.get('specialtyId') || '';

  const [specialties, setSpecialties] = useState<Record<string, unknown>[]>([]);
  const [paths, setPaths] = useState<Record<string, unknown>[]>([]);
  const [selSpecialty, setSelSpecialty] = useState(preselectedSpecialtyId);
  const [selPath, setSelPath] = useState(preselectedPathId);
  const [duration, setDuration] = useState(12);
  const [step, setStep] = useState<'specialty' | 'path' | 'duration' | 'confirm'>(
    preselectedSpecialtyId ? 'path' : 'specialty'
  );
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [preselectedPath, setPreselectedPath] = useState<Record<string, unknown> | null>(null);
  const [preselectedSpecialty, setPreselectedSpecialty] = useState<Record<string, unknown> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.catalog.specialties(category).then(setSpecialties).catch((err: Error) => setError(err.message || 'Failed to load specialties'));
    api.catalog.paths(category).then(setPaths).catch((err: Error) => setError(err.message || 'Failed to load paths'));
  }, [category]);

  // If a pathId was passed, fetch and pre-select that path
  useEffect(() => {
    if (preselectedPathId) {
      api.catalog.path(preselectedPathId).then((p) => {
        setPreselectedPath(p);
        setSelPath(preselectedPathId);
      }).catch((err: Error) => setError(err.message || 'Failed to load path'));
    }
  }, [preselectedPathId]);

  // If a specialtyId was passed, fetch and pre-select that specialty
  useEffect(() => {
    if (preselectedSpecialtyId) {
      api.catalog.specialty(preselectedSpecialtyId).then((s) => {
        setPreselectedSpecialty(s);
        setSelSpecialty(preselectedSpecialtyId);
      }).catch((err: Error) => setError(err.message || 'Failed to load specialty'));
    }
  }, [preselectedSpecialtyId]);

  // When a path is preselected without a specialty, auto-match by category
  useEffect(() => {
    if (preselectedPathId && preselectedPath && specialties.length > 0 && !preselectedSpecialtyId) {
      const pathCategory = preselectedPath.category as string;
      if (pathCategory) {
        const match = specialties.find((s) => (s.category as string) === pathCategory);
        if (match) {
          setSelSpecialty(match._id as string);
          setStep('duration');
        }
      }
    }
  }, [preselectedPathId, preselectedPath, specialties, preselectedSpecialtyId]);

  const preselectedPathName = (preselectedPath?.name as string) || '';
  const preselectedSpecialtyName = (preselectedSpecialty?.name as string) || '';

  const filteredSpecialties = useMemo(() => {
    if (!search) return specialties;
    const q = search.toLowerCase();
    return specialties.filter((s) => (s.name as string)?.toLowerCase().includes(q));
  }, [specialties, search]);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const selection = await api.quickpick.create({ specialty_id: selSpecialty, path_id: selPath, preset_duration_months: duration });
      await api.plan.generate(selection.id as string);
      navigate('/plan');
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const onSpecialtyPicked = (id: string) => {
    setSelSpecialty(id);
    if (preselectedPathId) {
      setStep('duration');
    } else {
      setStep('path');
    }
  };

  if (error) return (
    <div className="mx-auto max-w-lg space-y-4 py-12 text-center">
      <h2 className="font-heading text-xl font-bold">Something went wrong</h2>
      <p className="text-sm text-[var(--color-text-secondary)]">{error}</p>
      <Button onClick={() => window.location.reload()}>Try Again</Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Zap className="text-[var(--color-secondary)]" size={28} />
        <h1 className="font-heading text-2xl font-bold">Quick Pick</h1>
      </div>

      {preselectedSpecialtyName && (
        <div className="rounded-lg border border-[var(--color-secondary)]/30 bg-[var(--color-secondary)]/5 px-4 py-2 text-sm">
          Specialty pre-selected: <strong>{preselectedSpecialtyName}</strong>
        </div>
      )}
      {preselectedPathName && (
        <div className="rounded-lg border border-[var(--color-secondary)]/30 bg-[var(--color-secondary)]/5 px-4 py-2 text-sm">
          Path pre-selected: <strong>{preselectedPathName}</strong>
        </div>
      )}

      {step === 'specialty' && (
        <div className="space-y-3">
          <h2 className="font-heading text-lg font-semibold">Choose a Specialty</h2>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
            <input
              type="text" placeholder="Search specialties..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-2 pl-9 pr-3 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
            />
          </div>
          {filteredSpecialties.map((s) => (
            <Card key={s._id as string} onClick={() => onSpecialtyPicked(s._id as string)} className={selSpecialty === s._id ? 'border-[var(--color-secondary)]' : ''}>
              <h3 className="font-semibold">{s.name as string}</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">{s.description as string}</p>
            </Card>
          ))}
          {filteredSpecialties.length === 0 && <p className="text-sm text-[var(--color-text-secondary)]">No specialties match your search.</p>}
        </div>
      )}

      {step === 'path' && (
        <div className="space-y-3">
          <h2 className="font-heading text-lg font-semibold">Choose a Path</h2>
          {paths.filter((p) => (p.category as string) === ((specialties.find((s) => s._id === selSpecialty)?.category as string) || '')).map((p) => (
            <Card key={p._id as string} onClick={() => { setSelPath(p._id as string); setStep('duration'); }} className={selPath === p._id ? 'border-[var(--color-secondary)]' : ''}>
              <h3 className="font-semibold">{p.name as string}</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">{p.description as string}</p>
              <div className="mt-1 flex gap-3 text-xs text-[var(--color-text-secondary)]">${String(p.total_estimated_cost_usd)} &middot; {String(p.total_duration_months)} months</div>
            </Card>
          ))}
          <Button variant="ghost" onClick={() => setStep('specialty')}>Back</Button>
        </div>
      )}

      {step === 'duration' && (
        <div className="space-y-4">
          <h2 className="font-heading text-lg font-semibold">Study Duration</h2>
          <div className="flex gap-2">
            {[6, 12, 18, 24].map((m) => (
              <button key={m} onClick={() => { setDuration(m); setStep('confirm'); }} className={`flex-1 cursor-pointer rounded-lg border p-3 text-center font-medium transition-colors ${duration === m ? 'border-[var(--color-secondary)] bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-secondary)]'}`}>
                {m} mo
              </button>
            ))}
          </div>
          <Button variant="ghost" onClick={() => setStep(preselectedPathId ? 'specialty' : 'path')}>Back</Button>
        </div>
      )}

      {step === 'confirm' && (
        <div className="space-y-4">
          <h2 className="font-heading text-lg font-semibold">Confirm Your Selection</h2>
          <Card>
            <p><strong>Specialty:</strong> {specialties.find((s) => s._id === selSpecialty)?.name as string}</p>
            <p><strong>Path:</strong> {paths.find((p) => p._id === selPath)?.name as string || preselectedPathName}</p>
            <p><strong>Duration:</strong> {duration} months</p>
          </Card>
          <div className="flex gap-2">
            <Button onClick={handleGenerate} loading={generating}>Generate Study Plan</Button>
            <Button variant="ghost" onClick={() => setStep('duration')}>Change</Button>
          </div>
        </div>
      )}
    </div>
  );
}
