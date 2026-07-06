import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Stethoscope } from 'lucide-react';
import { StaleBadge } from '../../components/ui/StaleBadge';
import { TiltCard } from '../../components/ui/TiltCard';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';

export function SpecialtiesPage() {
  const user = useAuthStore((s) => s.user);
  const category = (user?.role as string)?.split('_')[0] || '';

  const [specialties, setSpecialties] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.catalog.specialties(category).then(setSpecialties).catch(console.error).finally(() => setLoading(false));
  }, [category]);

  const filtered = useMemo(() => {
    if (!search) return specialties;
    const q = search.toLowerCase();
    return specialties.filter((s) => (s.name as string)?.toLowerCase().includes(q));
  }, [specialties, search]);

  if (loading) return <p className="text-center text-[var(--color-text-secondary)]">Loading...</p>;

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold">Medical Specialties</h1>
      <p className="text-sm text-[var(--color-text-secondary)]">Explore specialties to find the right path for you.</p>
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
        <input
          type="text" placeholder="Search specialties..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-2 pl-9 pr-3 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
        />
      </div>
      <div className="grid gap-3">
        {filtered.map((s) => (
          <TiltCard key={s._id as string} onClick={() => navigate(`/explore/specialties/${s._id}`)}>
              <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                <Stethoscope className="text-[var(--color-primary)]" size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{s.name as string}</h3>
                  <StaleBadge isStale={!!s.is_stale} />
                </div>
                <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">{s.description as string}</p>
              </div>
            </div>
          </TiltCard>
        ))}
        {filtered.length === 0 && <p className="text-sm text-[var(--color-text-secondary)]">No specialties match your search.</p>}
      </div>
    </div>
  );
}
