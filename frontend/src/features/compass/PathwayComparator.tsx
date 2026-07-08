import { useEffect, useState } from 'react';
import { Check, X, ArrowLeftRight, Globe, DollarSign, Clock, Shield, Languages } from 'lucide-react';
import { api } from '../../lib/api';

interface PathSummary {
  _id: string;
  name: string;
  target_country: string;
  path_type: string;
  total_estimated_cost_usd?: number;
  total_duration_months?: number;
  required_exams?: { name: string }[];
  required_language_tests?: { language: string; test_name: string }[];
  visa_info?: { visa_type: string; processing_months: number; allows_family: boolean; pathway_to_pr: boolean }[];
  expected_salary?: { min_annual?: number; max_annual?: number; currency?: string };
  pass_rates?: { exam_name: string; pass_rate_pct: number }[];
  competitiveness_rating?: string;
  language_course_required?: boolean;
  egypt_specific_notes?: string;
}

interface CompareResult {
  paths: PathSummary[];
  summary: {
    cheapest: string;
    fastest: string;
    most_expensive: string;
    slowest: string;
    avg_cost: number;
    avg_duration: number;
  };
}

export function PathwayComparator() {
  const [allPaths, setAllPaths] = useState<Record<string, unknown>[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [compareResult, setCompareResult] = useState<CompareResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.catalog.paths().then(setAllPaths).catch(() => {});
  }, []);

  const toggleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else if (selected.length < 4) {
      setSelected([...selected, id]);
    }
  };

  const handleCompare = async () => {
    if (selected.length < 2) return;
    setLoading(true);
    try {
      const result = await api.compass.compare(selected);
      setCompareResult(result as unknown as CompareResult);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getReqExams = (p: PathSummary) => p.required_exams?.map(e => e.name).join(', ') || 'None';
  const getLangTests = (p: PathSummary) => p.required_language_tests?.map(t => `${t.language} (${t.test_name})`).join(', ') || 'None';
  const getVisaType = (p: PathSummary) => p.visa_info?.map(v => v.visa_type).join(', ') || 'N/A';
  const getSalary = (p: PathSummary) => {
    if (!p.expected_salary) return 'N/A';
    const s = p.expected_salary;
    const cur = s.currency || 'USD';
    if (s.min_annual && s.max_annual) return `${cur} ${s.min_annual.toLocaleString()} – ${s.max_annual.toLocaleString()}`;
    if (s.min_annual) return `From ${cur} ${s.min_annual.toLocaleString()}`;
    return 'N/A';
  };

  const grouped = (() => {
    const map: Record<string, Record<string, unknown>[]> = {};
    for (const p of allPaths) {
      const country = (p.target_country as string) || 'Other';
      if (!map[country]) map[country] = [];
      map[country].push(p);
    }
    return map;
  })();

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <p className="text-sm text-[var(--color-text-secondary)] mb-3">
          Select 2–4 paths to compare side-by-side.
        </p>
        <div className="max-h-60 overflow-y-auto space-y-1">
          {Object.entries(grouped).map(([country, countryPaths]) => (
            <div key={country}>
              <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mt-2 mb-1">{country}</p>
              {countryPaths.map((p) => {
                const id = p._id as string;
                const isSel = selected.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => toggleSelect(id)}
                    className={`w-full text-left flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors cursor-pointer ${
                      isSel ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'hover:bg-[var(--color-primary)]/5 text-[var(--color-text-primary)]'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                      isSel ? 'border-[var(--color-primary)] bg-[var(--color-primary)]' : 'border-[var(--color-border)]'
                    }`}>
                      {isSel && <Check size={12} className="text-white" />}
                    </div>
                    <span className="truncate">{p.name as string}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <button
          onClick={handleCompare}
          disabled={selected.length < 2 || loading}
          className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-primary)]/90 transition-colors cursor-pointer"
        >
          <ArrowLeftRight size={16} />
          Compare ({selected.length}) Paths
        </button>
      </div>

      {compareResult && compareResult.paths.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-lg border border-[var(--color-success)]/30 bg-[var(--color-success)]/5 p-3 text-center">
              <p className="text-xs text-[var(--color-text-secondary)]">Cheapest</p>
              <p className="text-sm font-semibold text-[var(--color-success)]">{compareResult.summary.cheapest}</p>
            </div>
            <div className="rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-3 text-center">
              <p className="text-xs text-[var(--color-text-secondary)]">Fastest</p>
              <p className="text-sm font-semibold text-[var(--color-accent)]">{compareResult.summary.fastest}</p>
            </div>
            <div className="rounded-lg border border-[var(--color-error)]/30 bg-[var(--color-error)]/5 p-3 text-center">
              <p className="text-xs text-[var(--color-text-secondary)]">Most Expensive</p>
              <p className="text-sm font-semibold text-[var(--color-error)]">{compareResult.summary.most_expensive}</p>
            </div>
            <div className="rounded-lg border border-[var(--color-secondary)]/30 bg-[var(--color-secondary)]/5 p-3 text-center">
              <p className="text-xs text-[var(--color-text-secondary)]">Slowest</p>
              <p className="text-sm font-semibold text-[var(--color-secondary)]">{compareResult.summary.slowest}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left py-2 pr-4 font-medium text-[var(--color-text-secondary)]">Metric</th>
                  {compareResult.paths.map(p => (
                    <th key={p._id} className="text-left py-2 px-3 font-semibold text-[var(--color-text-primary)] min-w-[180px]">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Country', icon: Globe, get: (p: PathSummary) => p.target_country },
                  { label: 'Type', icon: ArrowLeftRight, get: (p: PathSummary) => p.path_type },
                  { label: 'Cost (USD)', icon: DollarSign, get: (p: PathSummary) => p.total_estimated_cost_usd ? `$${p.total_estimated_cost_usd.toLocaleString()}` : 'N/A' },
                  { label: 'Duration', icon: Clock, get: (p: PathSummary) => p.total_duration_months ? `${p.total_duration_months} months` : 'N/A' },
                  { label: 'Exams', icon: Shield, get: getReqExams },
                  { label: 'Language Tests', icon: Languages, get: getLangTests },
                  { label: 'Visa Type', icon: Globe, get: getVisaType },
                  { label: 'Expected Salary', icon: DollarSign, get: getSalary },
                  { label: 'Competitiveness', icon: Shield, get: (p: PathSummary) => p.competitiveness_rating || 'N/A' },
                ].map(row => {
                  const Icon = row.icon;
                  return (
                    <tr key={row.label} className="border-b border-[var(--color-border)] last:border-b-0">
                      <td className="py-2.5 pr-4 flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                        <Icon size={14} /> {row.label}
                      </td>
                      {compareResult.paths.map(p => (
                        <td key={p._id} className="py-2.5 px-3 text-[var(--color-text-primary)]">
                          {row.get(p)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {compareResult.paths.some(p => p.egypt_specific_notes) && (
            <div className="rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-3">
              <p className="text-xs font-semibold text-[var(--color-accent)] mb-1">Egypt-Specific Notes</p>
              {compareResult.paths.filter(p => p.egypt_specific_notes).map(p => (
                <p key={p._id} className="text-xs text-[var(--color-text-secondary)] mt-1">
                  <strong>{p.name}:</strong> {p.egypt_specific_notes}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
