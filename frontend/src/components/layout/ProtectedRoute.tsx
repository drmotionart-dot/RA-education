import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export function ProtectedRoute() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const fetchUser = useAuthStore((s) => s.fetchUser);

  useEffect(() => {
    if (token && !user) fetchUser();
  }, [token, user, fetchUser]);

  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
}
