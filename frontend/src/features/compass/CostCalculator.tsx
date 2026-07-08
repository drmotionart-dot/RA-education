import { useEffect, useState } from 'react';
import { DollarSign, Clock, ArrowRight } from 'lucide-react';
import { api } from '../../lib/api';
import { ProgressBar } from '../../components/ui/ProgressBar';

interface CostItem {
  name: string;
  cost_usd: number;
  cost_converted: number;
}

interface CostData {
  path: { _id: string; name: string; target_country: string };
  currency: string;
  exchange_rate: number;
  total_estimated_cost_usd: number;
  total_estimated_cost_converted: number;
  breakdown: {
    stage_costs: CostItem[];
    exam_costs: CostItem[];
    language_course_cost: { included: boolean; cost_usd?: number; duration_months?: number } | null;
  };
}

interface PathSummary {
  _id: string;
  name: string;
  target_country: string;
  total_estimated_cost_usd: number;
  total_duration_months: number;
}

const currencies = [
  { code: 'USD', label: 'US Dollar ($)', symbol: '$' },
  { code: 'EUR', label: 'Euro (€)', symbol: '€' },
  { code: 'GBP', label: 'British Pound (£)', symbol: '£' },
  { code: 'AUD', label: 'Australian Dollar (A$)', symbol: 'A$' },
  { code: 'CAD', label: 'Canadian Dollar (C$)', symbol: 'C$' },
  { code: 'NZD', label: 'New Zealand Dollar (NZ$)', symbol: 'NZ$' },
  { code: 'SAR', label: 'Saudi Riyal (SR)', symbol: 'SR' },
  { code: 'AED', label: 'UAE Dirham (AED)', symbol: 'AED' },
  { code: 'EGP', label: 'Egyptian Pound (E£)', symbol: 'E£' },
];

export function CostCalculator() {
  const [paths, setPaths] = useState<PathSummary[]>([]);
  const [selectedPathId, setSelectedPathId] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [costData, setCostData] = useState<CostData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.compass.costCalculator().then(data => setPaths(data as unknown as PathSummary[])).catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedPathId) return;
    setLoading(true);
    api.compass.costCalculator(selectedPathId, selectedCurrency)
      .then(data => setCostData(data as unknown as CostData))
      .catch(() => setCostData(null))
      .finally(() => setLoading(false));
  }, [selectedPathId, selectedCurrency]);

  const selectedPath = paths.find(p => p._id === selectedPathId);
  const selectedCurr = currencies.find(c => c.code === selectedCurrency);

  const allItems = [
    ...(costData?.breakdown.stage_costs || []),
    ...(costData?.breakdown.exam_costs || []),
  ];
  if (costData?.breakdown.language_course_cost?.included && costData.breakdown.language_course_cost.cost_usd) {
    allItems.push({
      name: 'Language Course',
      cost_usd: costData.breakdown.language_course_cost.cost_usd,
      cost_converted: Math.round(costData.breakdown.language_course_cost.cost_usd * costData.exchange_rate),
    });
  }
  const maxCost = Math.max(...allItems.map(i => i.cost_converted), 1);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Pathway</label>
          <select
            value={selectedPathId}
            onChange={e => setSelectedPathId(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
          >
            <option value="">Select a path...</option>
            {paths.map(p => (
              <option key={p._id} value={p._id}>{p.name} — {p.target_country}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Currency</label>
          <select
            value={selectedCurrency}
            onChange={e => setSelectedCurrency(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
          >
            {currencies.map(c => (
              <option key={c.code} value={c.code}>{c.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          {selectedPath && (
            <div className="text-sm text-[var(--color-text-secondary)]">
              <p><span className="font-medium">{selectedPath.name}</span></p>
              <p>{selectedPath.target_country} · {selectedPath.total_duration_months} months</p>
            </div>
          )}
        </div>
      </div>

      {loading && <p className="text-sm text-[var(--color-text-secondary)]">Loading cost breakdown...</p>}

      {costData && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-lg border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Total Cost (USD)</p>
              <p className="text-lg font-bold text-[var(--color-text-primary)]">${costData.total_estimated_cost_usd?.toLocaleString() || 'N/A'}</p>
            </div>
            <div className="rounded-lg border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Total Cost ({costData.currency})</p>
              <p className="text-lg font-bold text-[var(--color-primary)]">
                {selectedCurr?.symbol}{costData.total_estimated_cost_converted?.toLocaleString() || 'N/A'}
              </p>
            </div>
            <div className="rounded-lg border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Exchange Rate</p>
              <p className="text-lg font-bold text-[var(--color-text-primary)]">1 USD = {costData.exchange_rate} {costData.currency}</p>
            </div>
            <div className="rounded-lg border border-[var(--color-border)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">Avg Monthly Cost</p>
              <p className="text-lg font-bold text-[var(--color-accent)]">
                {selectedCurr?.symbol}{(costData.total_estimated_cost_converted / (selectedPath?.total_duration_months || 1)).toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-base font-semibold">Cost Breakdown</h3>
            {allItems.map((item, i) => (
              <div key={i} className="rounded-lg border border-[var(--color-border)] p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-sm font-semibold">{selectedCurr?.symbol}{item.cost_converted.toLocaleString()}</span>
                </div>
                <ProgressBar value={item.cost_converted} max={maxCost} />
                <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">${item.cost_usd} USD</p>
              </div>
            ))}
          </div>

          {costData.breakdown.language_course_cost?.included && (
            <div className="rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-3 flex items-start gap-2">
              <Clock size={16} className="text-[var(--color-accent)] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-[var(--color-accent)]">Language Course Included</p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  Duration: {costData.breakdown.language_course_cost.duration_months} months
                  {costData.breakdown.language_course_cost.cost_usd && ` · Cost: $${costData.breakdown.language_course_cost.cost_usd}`}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
