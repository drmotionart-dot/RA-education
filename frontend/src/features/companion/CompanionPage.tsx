import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, UserPlus, Check, X, Send, Clock, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { api } from '../../lib/api';

export function CompanionPage() {
  const [companion, setCompanion] = useState<Record<string, unknown> | null>(null);
  const [requests, setRequests] = useState<{ incoming: Record<string, unknown>[]; outgoing: Record<string, unknown>[] }>({ incoming: [], outgoing: [] });
  const [matches, setMatches] = useState<Record<string, unknown>[]>([]);
  const [tab, setTab] = useState<'companion' | 'find' | 'requests'>('companion');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadAll = useCallback(async (currentTab: string) => {
    setLoading(true);
    try {
      const [c, reqs] = await Promise.all([
        api.companion.get(),
        api.companion.requests(),
      ]);
      setCompanion(c as Record<string, unknown> | null);
      setRequests(reqs as { incoming: Record<string, unknown>[]; outgoing: Record<string, unknown>[] });
      if (!c && currentTab === 'companion') setTab('find');
    } catch {
      setCompanion(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAll(tab); }, [loadAll, tab]);

  const loadMatches = useCallback(async () => {
    try {
      const m = await api.companion.match();
      setMatches(m as Record<string, unknown>[]);
    } catch { setMatches([]); }
  }, []);

  useEffect(() => {
    if (tab === 'find') loadMatches();
  }, [tab, loadMatches]);

  const sendRequest = async (toUserId: string) => {
    setSending(toUserId);
    try {
      await api.companion.request(toUserId);
      await loadAll(tab);
    } finally {
      setSending(null);
    }
  };

  const respond = async (requestId: string, action: 'accept' | 'decline') => {
    try {
      await api.companion.respond(requestId, action);
      await loadAll(tab);
    } catch { }
  };

  if (loading) return <p className="text-center text-[var(--color-text-secondary)]">Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-heading text-2xl font-bold">Companion</h1>
      </div>

      <div className="flex gap-2 border-b border-[var(--color-border)]">
        {['companion', 'find', 'requests'].map(t => (
          <button key={t} onClick={() => setTab(t as typeof tab)} className={`cursor-pointer px-4 py-2 text-sm font-medium -mb-px border-b-2 transition-colors ${tab === t ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'}`}>
            {t === 'companion' ? 'My Companion' : t === 'find' ? 'Find' : `Requests (${requests.incoming.length + requests.outgoing.length})`}
          </button>
        ))}
      </div>

      {tab === 'companion' && (
        companion ? (
          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-secondary)]/20">
                <Users size={24} className="text-[var(--color-secondary)]" />
              </div>
              <div>
                <p className="font-semibold text-lg">{companion.name as string}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{companion.role as string}</p>
              </div>
            </div>
            {!!companion.has_active_plan && (
              <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                Has an active study plan &middot; {(companion.lesson_progress as Record<string, number>).completed}/{(companion.lesson_progress as Record<string, number>).total} lessons
              </p>
            )}
          </Card>
        ) : (
          <p className="text-center text-[var(--color-text-secondary)]">You don't have a companion yet. Go to Find tab to search.</p>
        )
      )}

      {tab === 'find' && (
        matches.length === 0 ? (
          <p className="text-center text-[var(--color-text-secondary)]">No potential companions found. Other users need an active study plan in the same specialty.</p>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-[var(--color-text-secondary)]">Users in your specialty:</p>
            {matches.map(m => (
              <Card key={m.user_id as string}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{m.name as string}</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">{m.role as string} &middot; {m.same_path ? 'Same path' : 'Same specialty'} &middot; {m.match_score as number}% match</p>
                  </div>
                  <Button onClick={() => sendRequest(m.user_id as string)} disabled={sending === m.user_id}>
                    <Send size={14} /> {sending === m.user_id ? 'Sending...' : 'Request'}
                  </Button>
                </div>
              </Card>
            ))}
            <div className="text-center">
              <Button variant="secondary" onClick={loadMatches}>
                <RefreshCw size={14} /> Refresh
              </Button>
            </div>
          </div>
        )
      )}

      {tab === 'requests' && (
        <div className="space-y-4">
          {requests.incoming.length > 0 && (
            <div>
              <h2 className="font-heading text-lg font-semibold mb-2">Incoming Requests</h2>
              <div className="space-y-2">
                {requests.incoming.map(r => (
                  <Card key={r.request_id as string}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <UserPlus size={18} className="text-[var(--color-secondary)]" />
                        <div>
                          <p className="font-semibold">{(r.user as Record<string, string>).name}</p>
                          <p className="text-xs text-[var(--color-text-secondary)]">{(r.user as Record<string, string>).role}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => respond(r.request_id as string, 'accept')}><Check size={14} /> Accept</Button>
                        <Button variant="secondary" onClick={() => respond(r.request_id as string, 'decline')}><X size={14} /> Decline</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {requests.outgoing.length > 0 && (
            <div>
              <h2 className="font-heading text-lg font-semibold mb-2">Outgoing Requests</h2>
              <div className="space-y-2">
                {requests.outgoing.map(r => (
                  <Card key={r.request_id as string}>
                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-[var(--color-text-secondary)]" />
                      <div>
                        <p className="font-semibold">{(r.user as Record<string, string>).name}</p>
                        <p className="text-xs text-[var(--color-text-secondary)]">Waiting for response &middot; Sent {new Date(r.created_at as string).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {requests.incoming.length === 0 && requests.outgoing.length === 0 && (
            <p className="text-center text-[var(--color-text-secondary)]">No pending requests.</p>
          )}
        </div>
      )}
    </div>
  );
}
