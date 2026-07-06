import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';

export function VerifyOTPPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((s) => s.setAuth);
  const mobile = (location.state as { mobile?: string })?.mobile || '';

  if (!mobile) {
    navigate('/login', { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.auth.verifyOTP(mobile, code);
      setAuth(res.token, res.mobile_number);
      navigate('/onboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
            <ShieldCheck className="text-[var(--color-primary)]" size={28} />
          </div>
          <h1 className="font-heading text-2xl font-bold">Verify OTP</h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Code sent to {mobile}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="6-digit Code"
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            error={error}
          />
          <Button type="submit" loading={loading} className="w-full">
            Verify
          </Button>
        </form>
      </div>
    </div>
  );
}
