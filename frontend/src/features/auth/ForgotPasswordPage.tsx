import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { api } from '../../lib/api';

type Step = 'request' | 'reset';

export function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>('request');
  const [identifier, setIdentifier] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.auth.forgotPassword(identifier);
      setMessage(res.message);
      setStep('reset');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await api.auth.resetPassword(identifier, code, newPassword);
      navigate('/login', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
            <KeyRound className="text-[var(--color-primary)]" size={28} />
          </div>
          <h1 className="font-heading text-2xl font-bold">Reset Password</h1>
        </div>

        {step === 'request' ? (
          <form onSubmit={handleRequest} className="space-y-4">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Enter your mobile number or email. We'll send you a verification code.
            </p>
            <Input
              label="Mobile Number or Email"
              placeholder="01012345678 or you@example.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              error={error}
            />
            {message && <p className="text-sm text-[var(--color-secondary)]">{message}</p>}
            <Button type="submit" loading={loading} className="w-full">
              Send Code
            </Button>
            <p className="text-center text-sm text-[var(--color-text-secondary)]">
              <Link to="/login" className="font-medium text-[var(--color-primary)] hover:underline">Back to Log In</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Enter the 6-digit code sent to your Telegram or email, then set a new password.
            </p>
            <Input
              label="Verification Code"
              placeholder="6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            />
            <Input
              label="New Password"
              type="password"
              placeholder="At least 8 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Repeat your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={error}
            />
            <Button type="submit" loading={loading} className="w-full">
              Reset Password
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
