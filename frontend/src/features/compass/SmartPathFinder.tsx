import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, DollarSign, Clock, Languages, Filter, Search, TrendingUp } from 'lucide-react';
import { api } from '../../lib/api';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { TiltCard } from '../../components/ui/TiltCard';

interface SmartPath {
  _id: string;
  name: string;
  target_country: string;
  path_type: string;
  category: string;
  total_estimated_cost_usd?: number;
  total_duration_months?: number;
  required_language_tests?: { language: string }[];
  match_score?: number;
  content_status: string;
  visa_info?: { visa_type: string }[];
  expected_salary?: { min_annual?: number; max_annual?: number; currency?: string };
  competitiveness_rating?: string;
}

export function SmartPathFinder() {
  const navigate = useNavigate();
  const [results, setResults] = useState<SmartPath[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const [filters, setFilters] = useState({
    budget_max: '',
    duration_max: '',
    category: '',
    country: '',
    path_type: '',
    language: '',
  });

  const updateFilter = (key: string, value: string) => setFilters(prev => ({ ...prev, [key]: value }));

  const handleSearch = useCallback(async () => {
    setLoading(true);
    setSearched(true);
    try {
      const params: Record<string, string | number> = {};
      if (filters.budget_max) params.budget_max = Number(filters.budget_max);
      if (filters.duration_max) params.duration_max = Number(filters.duration_max);
      if (filters.category) params.category = filters.category;
      if (filters.country) params.country = filters.country;
      if (filters.path_type) params.path_type = filters.path_type;
      if (filters.language) params.language = filters.language;
      const data = await api.compass.smartFind(params as any);
      setResults(data as unknown as SmartPath[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const getLanguages = (p: SmartPath) => p.required_language_tests?.map(t => t.language).join(', ') || 'None';
  const getSalary = (p: SmartPath) => {
    if (!p.expected_salary) return null;
    const s = p.expected_salary;
    const cur = s.currency || 'USD';
    if (s.min_annual && s.max_annual) return `${cur} ${s.min_annual.toLocaleString()} – ${s.max_annual.toLocaleString()}`;
    if (s.min_annual) return `From ${cur} ${s.min_annual.toLocaleString()}`;
    return null;
  };

  const costRangeInputs = [
    { key: 'budget_max', label: 'Max Budget (USD)', icon: DollarSign, placeholder: 'e.g. 5000' },
    { key: 'duration_max', label: 'Max Duration (months)', icon: Clock, placeholder: 'e.g. 24' },
  ];

  const selectFilters = [
    { key: 'category', label: 'Category', options: [{ value: '', label: 'Any' }, { value: 'doctor', label: 'Doctor' }, { value: 'nurse', label: 'Nurse' }] },
    { key: 'path_type', label: 'Path Type', options: [{ value: '', label: 'Any' }, { value: 'migration', label: 'Migration' }, { value: 'career', label: 'Career' }, { value: 'training', label: 'Training' }] },
    { key: 'country', label: 'Country', placeholder: 'e.g. UK, Germany, UAE', icon: Globe },
    { key: 'language', label: 'Language Required', placeholder: 'e.g. English, German', icon: Languages },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 space-y-4">
        <h2 className="font-heading text-base font-semibold flex items-center gap-2">
          <Filter size={18} /> Find Your Ideal Path
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {costRangeInputs.map(inp => {
            const Icon = inp.icon;
            return (
              <div key={inp.key}>
                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">{inp.label}</label>
                <div className="relative">
                  <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
                  <input
                    type="number"
                    value={(filters as any)[inp.key]}
                    onChange={e => updateFilter(inp.key, e.target.value)}
                    placeholder={inp.placeholder}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] pl-8 pr-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                  />
                </div>
              </div>
            );
          })}
          {selectFilters.map(sf => {
            if ('options' in sf) {
              return (
                <div key={sf.key}>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">{sf.label}</label>
                  <select
                    value={(filters as any)[sf.key]}
                    onChange={e => updateFilter(sf.key, e.target.value)}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                  >
                    {'options' in sf && (sf as any).options.map((o: any) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              );
            }
            const Icon = sf.icon || Search;
            return (
              <div key={sf.key}>
                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">{sf.label}</label>
                <div className="relative">
                  <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
                  <input
                    type="text"
                    value={(filters as any)[sf.key]}
                    onChange={e => updateFilter(sf.key, e.target.value)}
                    placeholder={sf.placeholder}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] pl-8 pr-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary)]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <Search size={16} />
          {loading ? 'Searching...' : 'Find Paths'}
        </button>
      </div>

      {searched && !loading && results.length === 0 && (
        <div className="text-center py-8">
          <p className="text-[var(--color-text-secondary)]">No paths match your criteria. Try broadening your filters.</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Found {results.length} path{results.length !== 1 ? 's' : ''} — sorted by match score
          </p>
          {results.map((p) => (
            <TiltCard key={p._id} onClick={() => navigate(`/paths/${p._id}`)}>
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{p.name}</h3>
                    {p.match_score != null && (
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        p.match_score >= 70 ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' :
                        p.match_score >= 40 ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' :
                        'bg-[var(--color-error)]/10 text-[var(--color-error)]'
                      }`}>
                        {p.match_score}% match
                      </span>
                    )}
                    {p.content_status === 'stub' && (
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-medium bg-[var(--color-error)]/10 text-[var(--color-error)]">Stub</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1.5 text-xs text-[var(--color-text-secondary)]">
                    <span className="flex items-center gap-1"><Globe size={12} /> {p.target_country}</span>
                    <span className="flex items-center gap-1">{p.path_type}</span>
                    {p.total_estimated_cost_usd != null && (
                      <span className="flex items-center gap-1"><DollarSign size={12} /> ${p.total_estimated_cost_usd.toLocaleString()}</span>
                    )}
                    {p.total_duration_months != null && (
                      <span className="flex items-center gap-1"><Clock size={12} /> {p.total_duration_months} months</span>
                    )}
                    <span className="flex items-center gap-1"><Languages size={12} /> {getLanguages(p)}</span>
                  </div>
                  {p.match_score != null && (
                    <div className="mt-2">
                      <ProgressBar value={p.match_score} max={100} />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    {p.visa_info && p.visa_info.length > 0 && (
                      <span className="text-[10px] rounded bg-[var(--color-success)]/10 px-1.5 py-0.5 text-[var(--color-success)]">
                        {p.visa_info[0].visa_type}
                      </span>
                    )}
                    {getSalary(p) && (
                      <span className="text-[10px] rounded bg-[var(--color-primary)]/10 px-1.5 py-0.5 text-[var(--color-primary)]">
                        {getSalary(p)}
                      </span>
                    )}
                    {p.competitiveness_rating && (
                      <span className="text-[10px] rounded bg-[var(--color-accent-violet)]/10 px-1.5 py-0.5 text-[var(--color-accent-violet)]">
                        {p.competitiveness_rating}
                      </span>
                    )}
                  </div>
                </div>
                <TrendingUp size={20} className="shrink-0 text-[var(--color-primary)]" />
              </div>
            </TiltCard>
          ))}
        </div>
      )}
    </div>
  );
}
