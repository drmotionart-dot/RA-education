import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';

export function OnboardingPage() {
  const [form, setForm] = useState({ name: '', email: '', national_id: '', role: 'doctor', graduation_year: '', experience_years: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data: Record<string, unknown> = { name: form.name, role: form.role };
      if (form.email) data.email = form.email;
      if (form.national_id) data.national_id = form.national_id;
      if (form.graduation_year) data.graduation_year = Number(form.graduation_year);
      if (form.experience_years) data.experience_years = Number(form.experience_years);
      const user = await api.users.onboard(data);
      setUser(user);
      navigate('/explore');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Onboarding failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
            <UserPlus className="text-[var(--color-primary)]" size={28} />
          </div>
          <h1 className="font-heading text-2xl font-bold">Complete Profile</h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Tell us about yourself</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Full Name" placeholder="Ahmed Ali" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email (optional)" type="email" placeholder="ahmed@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input label="National ID (optional)" placeholder="12345678901234" value={form.national_id} onChange={(e) => setForm({ ...form, national_id: e.target.value })} />
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Role</label>
            <select className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="doctor">Doctor</option>
              <option value="doctor_student">Doctor-student</option>
              <option value="nurse">Nurse</option>
              <option value="nurse_student">Nurse-student</option>
            </select>
          </div>
          <Input label="Graduation Year (optional)" type="number" placeholder="2020" value={form.graduation_year} onChange={(e) => setForm({ ...form, graduation_year: e.target.value })} />
          <Input label="Years of Experience (optional)" type="number" placeholder="4" value={form.experience_years} onChange={(e) => setForm({ ...form, experience_years: e.target.value })} />
          {error && <p className="text-sm text-[var(--color-error)]">{error}</p>}
          <Button type="submit" loading={loading} className="w-full">Save & Continue</Button>
        </form>
      </div>
    </div>
  );
}
