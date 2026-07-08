import { useEffect, useState } from 'react';
import { Clock, DollarSign, BookOpen, Stethoscope, FileText, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../lib/api';
import { ProgressBar } from '../../components/ui/ProgressBar';

interface Stage {
  _id: string;
  name: string;
  type: 'exam' | 'training_post' | 'application' | 'foundation';
  order: number;
  duration_months?: number;
  cost_usd?: number;
  description?: string;
}

interface PathWithStages {
  _id: string;
  name: string;
  target_country: string;
  total_duration_months?: number;
  total_estimated_cost_usd?: number;
  stages?: Stage[];
}

const stageIcons: Record<string, typeof BookOpen> = {
  exam: BookOpen, training_post: Stethoscope, application: FileText, foundation: GraduationCap,
};
const stageColors: Record<string, string> = {
  exam: 'var(--color-primary)', training_post: 'var(--color-secondary)', application: 'var(--color-accent-violet)', foundation: 'var(--color-success)',
};
const stageLabels: Record<string, string> = {
  exam: 'Exam', training_post: 'Training', application: 'Application', foundation: 'Foundation',
};

export function TimelineVisualizer() {
  const [allPaths, setAllPaths] = useState<Record<string, unknown>[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [pathData, setPathData] = useState<PathWithStages | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.catalog.paths().then(setAllPaths).catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    setLoading(true);
    api.catalog.path(selectedId)
      .then(data => setPathData(data as unknown as PathWithStages))
      .catch(() => setPathData(null))
      .finally(() => setLoading(false));
  }, [selectedId]);

  const pathsWithStages = allPaths.filter((p) => {
    const stages = (p as any).stages;
    return stages && stages.length > 0;
  }) as unknown as PathWithStages[];

  const stages = (pathData?.stages || []).sort((a, b) => a.order - b.order);
  const totalMonths = pathData?.total_duration_months || stages.reduce((s, st) => s + (st.duration_months || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Select a pathway with stages</label>
        <select
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
        >
          <option value="">Choose a path...</option>
          {pathsWithStages.map(p => (
            <option key={p._id} value={p._id}>{p.name} — {p.target_country}</option>
          ))}
        </select>
      </div>

      {loading && <p className="text-sm text-[var(--color-text-secondary)]">Loading timeline...</p>}

      {pathData && stages.length > 0 && (
        <div className="space-y-4">
          <div className="flex gap-4 flex-wrap">
            <div className="rounded-lg border border-[var(--color-border)] p-3 flex items-center gap-2">
              <Clock size={16} className="text-[var(--color-accent)]" />
              <div>
                <p className="text-xs text-[var(--color-text-secondary)]">Total Duration</p>
                <p className="text-sm font-semibold">{totalMonths} months (~{Math.round(totalMonths / 12)} years)</p>
              </div>
            </div>
            <div className="rounded-lg border border-[var(--color-border)] p-3 flex items-center gap-2">
              <DollarSign size={16} className="text-[var(--color-primary)]" />
              <div>
                <p className="text-xs text-[var(--color-text-secondary)]">Total Cost</p>
                <p className="text-sm font-semibold">${pathData.total_estimated_cost_usd?.toLocaleString() || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-[var(--color-border)]" />
            <div className="space-y-3">
              {stages.map((stage, idx) => {
                const Icon = stageIcons[stage.type] || BookOpen;
                const isExpanded = expanded === stage._id;
                const pct = totalMonths > 0 ? ((stage.duration_months || 0) / totalMonths) * 100 : 0;
                return (
                  <div key={stage._id} className="relative pl-12">
                    <div className="absolute left-[13px] top-[6px] h-3 w-3 rounded-full border-2" style={{ borderColor: stageColors[stage.type], backgroundColor: 'var(--color-bg)' }} />
                    <motion.div
                      layout
                      className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 cursor-pointer hover:border-[var(--color-border-accent-hover)] transition-colors"
                      onClick={() => setExpanded(isExpanded ? null : stage._id)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon size={16} style={{ color: stageColors[stage.type] }} className="shrink-0" />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-sm">{stage.name}</h3>
                              <span className="rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ backgroundColor: `${stageColors[stage.type]}15`, color: stageColors[stage.type] }}>
                                {stageLabels[stage.type]}
                              </span>
                            </div>
                            <div className="flex gap-3 mt-0.5 text-[10px] text-[var(--color-text-secondary)]">
                              {stage.duration_months != null && <span>{stage.duration_months} months</span>}
                              {stage.cost_usd != null && <span>${stage.cost_usd}</span>}
                            </div>
                          </div>
                        </div>
                        {isExpanded ? <ChevronUp size={16} className="shrink-0 text-[var(--color-text-secondary)]" /> : <ChevronDown size={16} className="shrink-0 text-[var(--color-text-secondary)]" />}
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full bg-[var(--color-border)] overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: stageColors[stage.type] }} />
                          </div>
                          <span className="text-[10px] text-[var(--color-text-secondary)] shrink-0">{Math.round(pct)}%</span>
                        </div>
                      </div>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 border-t border-[var(--color-border)] pt-3 space-y-2">
                              {stage.description && <p className="text-xs text-[var(--color-text-secondary)]">{stage.description}</p>}
                              {stage.cost_usd != null && (
                                <div className="flex items-center gap-1 text-xs">
                                  <DollarSign size={12} className="text-[var(--color-primary)]" />
                                  <span>Cost: ${stage.cost_usd}</span>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    {idx < stages.length - 1 && (
                      <div className="ml-[13px] mt-1 pl-1">
                        <div className="h-6 border-l-2 border-dashed border-[var(--color-border)] ml-0.5" style={{ borderColor: stageColors[stage.type] }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {pathData && stages.length === 0 && (
        <p className="text-sm text-[var(--color-text-secondary)]">This path does not have stage data yet.</p>
      )}
    </div>
  );
}
