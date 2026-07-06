import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';

const roles = [
  { value: 'doctor', label: 'Doctor (Practicing)' },
  { value: 'doctor_student', label: 'Doctor (Student)' },
  { value: 'nurse', label: 'Nurse (Practicing)' },
  { value: 'nurse_student', label: 'Nurse (Student)' },
];

const GOVERNORATES = [
  'Alexandria', 'Aswan', 'Asyut', 'Beheira', 'Beni Suef', 'Cairo',
  'Dakahlia', 'Damietta', 'Fayoum', 'Gharbia', 'Giza', 'Ismailia',
  'Kafr El Sheikh', 'Luxor', 'Matrouh', 'Minya', 'Monufia', 'New Valley',
  'North Sinai', 'Port Said', 'Qalyubia', 'Qena', 'Sharqia', 'Sohag',
  'South Sinai', 'Suez',
];

export function RegisterPage() {
  const [form, setForm] = useState({ full_name: '', mobile_number: '', country_code: '+20', email: '', password: '', confirm_password: '', national_id: '', date_of_birth: '', gender: '', governorate: '', role: 'doctor' });
  const [error, setError] = useState('');
  const [nidError, setNidError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm_password) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.auth.register({
        full_name: form.full_name,
        mobile_number: form.country_code + form.mobile_number,
        email: form.email,
        password: form.password,
        national_id: form.national_id,
        date_of_birth: form.date_of_birth,
        gender: form.gender,
        governorate: form.governorate,
        role: form.role,
      });
      setAuth(res.token, res.user.mobile_number, res.user);
      navigate('/survey', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
            <UserPlus className="text-[var(--color-primary)]" size={28} />
          </div>
          <h1 className="font-heading text-2xl font-bold">Create Account</h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Join RA Education to start your specialty journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Full Name" placeholder="Your full name" value={form.full_name} onChange={(e) => update('full_name', e.target.value)} required />

          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">Mobile Number</label>
            <div className="flex gap-2">
              <select
                value={form.country_code}
                onChange={(e) => update('country_code', e.target.value)}
                className="w-24 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              >
                <option value="+20">🇪🇬 +20</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+966">🇸🇦 +966</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+49">🇩🇪 +49</option>
                <option value="+33">🇫🇷 +33</option>
              </select>
              <input
                placeholder="1000000000"
                value={form.mobile_number}
                onChange={(e) => update('mobile_number', e.target.value.replace(/\D/g, ''))}
                className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                required
              />
            </div>
            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">We'll send a verification code via Telegram or email.</p>
          </div>

          <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => update('email', e.target.value)} required />
          <Input label="Password" type="password" placeholder="At least 8 characters" value={form.password} onChange={(e) => update('password', e.target.value)} required />
          <Input label="Confirm Password" type="password" placeholder="Repeat your password" value={form.confirm_password} onChange={(e) => update('confirm_password', e.target.value)} required />

          <Input label="National ID" placeholder="14-digit Egyptian National ID" value={form.national_id} onChange={(e) => { const v = e.target.value.replace(/\D/g, '').slice(0, 14); update('national_id', v); setNidError(v.length === 14 ? '' : v.length > 0 ? 'Must be exactly 14 digits' : ''); }} error={nidError} required />

          <Input label="Date of Birth" type="date" value={form.date_of_birth} onChange={(e) => update('date_of_birth', e.target.value)} required />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Gender</label>
            <div className="flex gap-6">
              {['male', 'female'].map((g) => (
                <label key={g} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={(e) => update('gender', e.target.value)} className="text-[var(--color-secondary)] accent-[var(--color-secondary)]" />
                  <span className="text-sm text-[var(--color-text-primary)]">{g === 'male' ? 'Male' : 'Female'}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Governorate of Birth</label>
            <select
              value={form.governorate}
              onChange={(e) => update('governorate', e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              required
            >
              <option value="">Select governorate...</option>
              {GOVERNORATES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
              <option value="Foreign">Born Abroad</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Role</label>
            <select
              value={form.role}
              onChange={(e) => update('role', e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
            >
              {roles.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>

          {error && <p className="text-sm text-[var(--color-error)]">{error}</p>}

          <Button type="submit" loading={loading} className="w-full">
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-[var(--color-text-secondary)]">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[var(--color-primary)] hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
}
