import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeOff, Loader2, Save, Trash2, User } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';

function maskNid(nid?: string | null): string {
  if (!nid || nid.length < 7) return nid || '—';
  return nid.slice(0, 3) + '****' + nid.slice(-3);
}

function maskMobile(mobile?: string | null): string {
  if (!mobile) return '—';
  if (mobile.length < 7) return mobile;
  return mobile.slice(0, 4) + '****' + mobile.slice(-3);
}

export function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const [name, setName] = useState((user?.name as string) || '');
  const [email, setEmail] = useState((user?.email as string) || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const updated = await api.users.update({ name, email });
      setUser(updated);
      setMessage('Profile updated.');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(String(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.users.delete();
      logout();
      navigate('/');
    } catch (err) {
      setMessage(String(err));
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">Profile</h1>

      <Card>
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-[var(--color-border)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
              <User size={24} className="text-[var(--color-primary)]" />
            </div>
            <div>
              <p className="font-semibold text-lg">{user?.name as string || 'Unnamed'}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{user?.role as string || 'No role set'}</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-[var(--color-text-secondary)]">Mobile Number</p>
              <p className="text-sm">{maskMobile(user?.mobile_number as string)}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-secondary)]">National ID</p>
              <p className="text-sm flex items-center gap-1">
                {maskNid(user?.national_id as string)}
                <EyeOff size={12} className="text-[var(--color-text-secondary)]" />
              </p>
            </div>
          </div>

          <div className="border-t border-[var(--color-border)] pt-4">
            <p className="text-sm font-medium mb-3">Edit Profile</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-[var(--color-text-secondary)] mb-1">Name</label>
                <input
                  type="text" value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--color-text-secondary)] mb-1">Email</label>
                <input
                  type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                Save
              </Button>
              {message && <p className="text-xs text-[var(--color-text-secondary)]">{message}</p>}
            </div>
          </div>
        </div>
      </Card>

      <div className="border-t border-[var(--color-border)] pt-4">
        <p className="text-sm font-medium text-[var(--color-error)] mb-2">Danger Zone</p>
        {!showDeleteConfirm ? (
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(true)}>
            <Trash2 size={14} /> Delete Account
          </Button>
        ) : (
          <Card className="border-[var(--color-error)]">
            <p className="text-sm mb-3">This will permanently delete your account and all associated data (plans, assessments, surveys). This action cannot be undone.</p>
            <div className="flex gap-2">
              <Button onClick={handleDelete} disabled={deleting}>
                {deleting ? <Loader2 size={14} className="animate-spin" /> : null}
                Confirm Delete
              </Button>
              <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)} disabled={deleting}>Cancel</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
