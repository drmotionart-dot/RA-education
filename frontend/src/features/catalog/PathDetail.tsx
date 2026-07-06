import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Globe, BookOpen, Languages, DollarSign, Clock, ChevronDown, ChevronUp, Award, Stethoscope, FileText, GraduationCap } from 'lucide-react';
import { StaleBadge } from '../../components/ui/StaleBadge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { api } from '../../lib/api';

interface Stage {
  _id: string;
  name: string;
  type: 'exam' | 'training_post' | 'application' | 'foundation';
  order: number;
  duration_months?: number;
  cost_usd?: number;
  description?: string;
  prerequisites?: string[];
  exams?: { name: string; format?: string; cost_usd?: number; official_link?: string }[];
  language_tests?: { language: string; test_name: string; min_score?: string }[];
}

const stageIcons: Record<string, typeof Stethoscope> = {
  exam: BookOpen,
  training_post: Stethoscope,
  application: FileText,
  foundation: GraduationCap,
};

const stageColors: Record<string, string> = {
  exam: 'var(--color-primary)',
  training_post: 'var(--color-secondary)',
  application: 'var(--color-accent-violet)',
  foundation: 'var(--color-success)',
};

const stageLabels: Record<string, string> = {
  exam: 'Exam',
  training_post: 'Training Post',
  application: 'Application',
  foundation: 'Foundation',
};

export function PathDetail() {
  const { id } = useParams();
  const [path, setPath] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    api.catalog.path(id).then(setPath).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center text-[var(--color-text-secondary)]">Loading...</p>;
  if (!path) return <p className="text-center text-[var(--color-error)]">Path not found</p>;

  const exams = (path.required_exams || []) as Record<string, string | number>[];
  const langTests = (path.required_language_tests || []) as Record<string, string>[];
  const stages = (path.stages || []) as Stage[];
  const pathType = path.path_type as string;

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] cursor-pointer">
        <ArrowLeft size={16} /> Back
      </button>

      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="font-heading text-2xl font-bold">{path.name as string}</h1>
          <StaleBadge isStale={!!path.is_stale} />
          {pathType && (
            <span className="rounded-full bg-[var(--color-accent-violet)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--color-accent-violet)]">
              {pathType.charAt(0).toUpperCase() + pathType.slice(1)}
            </span>
          )}
        </div>
        <p className="mt-1 text-[var(--color-text-secondary)]">{path.description as string}</p>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-[var(--color-primary)]">
          <Globe size={14} /> {path.target_country as string}
        </span>
        {path.total_estimated_cost_usd != null && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-secondary)]/10 px-3 py-1 text-[var(--color-secondary)]">
            <DollarSign size={14} /> ${String(path.total_estimated_cost_usd)}
          </span>
        )}
        {path.total_duration_months != null && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-[var(--color-accent)]">
            <Clock size={14} /> {path.total_duration_months as string} months
          </span>
        )}
      </div>

      {stages.length > 0 && (
        <div>
          <h2 className="font-heading text-lg font-semibold flex items-center gap-2 mb-4">
            <Award size={18} /> Training Stages
          </h2>
          <div className="relative">
            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-[var(--color-border)]" />
            <div className="space-y-4">
              {[...stages].sort((a, b) => a.order - b.order).map((stage) => {
                const Icon = stageIcons[stage.type] || BookOpen;
                const isExpanded = expandedStage === stage._id;
                return (
                  <div key={stage._id} className="relative pl-10">
                    <div className="absolute left-[9px] top-[6px] h-3 w-3 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-bg)]" style={{ borderColor: stageColors[stage.type] }} />
                    <motion.div
                      layout
                      className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 cursor-pointer hover:border-[var(--color-border-accent-hover)] transition-colors"
                      onClick={() => setExpandedStage(isExpanded ? null : stage._id)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon size={16} style={{ color: stageColors[stage.type] }} className="shrink-0" />
                          <div className="min-w-0">
                            <h3 className="font-medium text-sm truncate">{stage.name}</h3>
                            <div className="flex flex-wrap gap-2 mt-0.5">
                              <span className="rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ backgroundColor: `${stageColors[stage.type]}15`, color: stageColors[stage.type] }}>
                                {stageLabels[stage.type]}
                              </span>
                              {stage.duration_months != null && (
                                <span className="text-[10px] text-[var(--color-text-secondary)]">{stage.duration_months} months</span>
                              )}
                              {stage.cost_usd != null && (
                                <span className="text-[10px] text-[var(--color-text-secondary)]">${stage.cost_usd}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        {isExpanded ? <ChevronUp size={16} className="shrink-0 text-[var(--color-text-secondary)]" /> : <ChevronDown size={16} className="shrink-0 text-[var(--color-text-secondary)]" />}
                      </div>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 space-y-3 border-t border-[var(--color-border)] pt-3">
                              {stage.description && (
                                <p className="text-xs text-[var(--color-text-secondary)]">{stage.description}</p>
                              )}
                              {stage.prerequisites && stage.prerequisites.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-[var(--color-text-primary)] mb-1">Prerequisites</p>
                                  <ul className="space-y-1">
                                    {stage.prerequisites.map((pr, i) => (
                                      <li key={i} className="flex items-start gap-1.5 text-xs text-[var(--color-text-secondary)]">
                                        <span className="mt-0.5 block h-1 w-1 rounded-full bg-[var(--color-text-secondary)] shrink-0" />
                                        {pr}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {stage.exams && stage.exams.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-[var(--color-text-primary)] mb-1">Exams</p>
                                  <div className="space-y-1.5">
                                    {stage.exams.map((ex, i) => (
                                      <div key={i} className="rounded border border-[var(--color-border)] p-2">
                                        <p className="text-xs font-medium">{ex.name}</p>
                                        {ex.format && <p className="text-[10px] text-[var(--color-text-secondary)]">Format: {ex.format}</p>}
                                        {ex.cost_usd != null && <p className="text-[10px] text-[var(--color-text-secondary)]">Cost: ${ex.cost_usd}</p>}
                                        {ex.official_link && (
                                          <a href={ex.official_link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[var(--color-primary)] hover:underline">Official site</a>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {exams.length > 0 && (
        <Card title={<span className="flex items-center gap-2"><BookOpen size={18} /> Required Exams</span>}>
          <div className="space-y-2">
            {exams.map((e, i) => (
              <div key={i} className="rounded-lg border border-[var(--color-border)] p-3">
                <h3 className="font-medium">{e.name as string}</h3>
                {e.format && <p className="text-sm text-[var(--color-text-secondary)]">Format: {e.format as string}</p>}
                {e.cost_usd && <p className="text-sm text-[var(--color-text-secondary)]">Cost: ${String(e.cost_usd)}</p>}
                {e.retake_policy && <p className="text-sm text-[var(--color-text-secondary)]">Retake: {e.retake_policy as string}</p>}
                {e.official_link && <a href={e.official_link as string} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-primary)] hover:underline">Official site</a>}
              </div>
            ))}
          </div>
        </Card>
      )}

      {langTests.length > 0 && (
        <Card title={<span className="flex items-center gap-2"><Languages size={18} /> Language Tests</span>}>
          <div className="space-y-2">
            {langTests.map((t, i) => (
              <div key={i} className="rounded-lg border border-[var(--color-border)] p-3">
                <h3 className="font-medium">{t.test_name as string}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">Language: {t.language as string}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">Min score: {t.min_score as string}</p>
                {t.official_link && <a href={t.official_link as string} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-primary)] hover:underline">Official site</a>}
              </div>
            ))}
          </div>
        </Card>
      )}

      {!!path.egypt_specific_notes && (
        <div className="rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-3">
          <h2 className="font-heading text-sm font-semibold text-[var(--color-accent)]">Egypt-Specific Notes</h2>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{path.egypt_specific_notes as string}</p>
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <Button onClick={() => navigate(`/quick-pick?pathId=${id}`)}>
          Start This Path
        </Button>
        <Button variant="ghost" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
}
