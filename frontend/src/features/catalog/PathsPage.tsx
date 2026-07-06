import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Search } from 'lucide-react';
import { TiltCard } from '../../components/ui/TiltCard';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';

export function PathsPage() {
  const user = useAuthStore((s) => s.user);
  const category = (user?.role as string)?.split('_')[0] || '';

  const [paths, setPaths] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.catalog.paths(category).then(setPaths).catch(console.error).finally(() => setLoading(false));
  }, [category]);

  const filtered = useMemo(() => {
    if (!search) return paths;
    const q = search.toLowerCase();
    return paths.filter((p) =>
      (p.name as string)?.toLowerCase().includes(q) ||
      (p.target_country as string)?.toLowerCase().includes(q)
    );
  }, [paths, search]);

  const grouped = useMemo(() => {
    const map: Record<string, Record<string, unknown>[]> = {};
    for (const p of filtered) {
      const country = (p.target_country as string) || 'Other';
      if (!map[country]) map[country] = [];
      map[country].push(p);
    }
    return map;
  }, [filtered]);

  if (loading) return <p className="text-center text-[var(--color-text-secondary)]">Loading...</p>;

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold">Career Paths</h1>
      <p className="text-sm text-[var(--color-text-secondary)]">Browse certification and migration paths.</p>
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
        <input
          type="text" placeholder="Search paths or country..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-2 pl-9 pr-3 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
        />
      </div>
      {Object.entries(grouped).map(([country, countryPaths]) => (
        <div key={country} className="space-y-2">
          <h2 className="font-heading text-base font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">{country}</h2>
          <div className="grid gap-3">
            {countryPaths.map((p) => (
              <TiltCard key={p._id as string} onClick={() => navigate(`/paths/${p._id}`)}>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-secondary)]/10">
                    <Globe className="text-[var(--color-secondary)]" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{p.name as string}</h3>
                    <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">{p.description as string}</p>
                    <div className="mt-2 flex gap-3 text-xs text-[var(--color-text-secondary)]">
                      <span>${String(p.total_estimated_cost_usd)}</span>
                      <span>{String(p.total_duration_months)} months</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      ))}
      {filtered.length === 0 && <p className="text-sm text-[var(--color-text-secondary)]">No paths match your search.</p>}
    </div>
  );
}
