import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';

export function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.auth.login(identifier, password);
      setAuth(res.token, res.user.mobile_number, res.user);
      navigate('/survey', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
            <LogIn className="text-[var(--color-primary)]" size={28} />
          </div>
          <h1 className="font-heading text-2xl font-bold">Welcome Back</h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Log in with your mobile number or email</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Mobile Number or Email"
            placeholder="01012345678 or you@example.com"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            error={error}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" loading={loading} className="w-full">
            Log In
          </Button>
        </form>

        <div className="text-center text-sm text-[var(--color-text-secondary)]">
          <Link to="/forgot-password" className="font-medium text-[var(--color-primary)] hover:underline">Forgot password?</Link>
        </div>

        <p className="text-center text-sm text-[var(--color-text-secondary)]">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-[var(--color-primary)] hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
