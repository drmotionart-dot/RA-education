import { create } from 'zustand';
import { api } from '../lib/api';

interface AuthState {
  token: string | null;
  mobileNumber: string | null;
  user: Record<string, unknown> | null;
  setAuth: (token: string, mobileNumber: string, user?: Record<string, unknown>) => void;
  setUser: (user: Record<string, unknown>) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  mobileNumber: localStorage.getItem('mobileNumber'),
  user: (() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
  })(),
  setAuth: (token, mobileNumber, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('mobileNumber', mobileNumber);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      set({ token, mobileNumber, user });
    } else {
      set({ token, mobileNumber });
    }
  },
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('mobileNumber');
    localStorage.removeItem('user');
    set({ token: null, mobileNumber: null, user: null });
  },
  fetchUser: async () => {
    try {
      const user = await api.users.me();
      localStorage.setItem('user', JSON.stringify(user));
      set({ user });
    } catch {
      // Token invalid — logout
      localStorage.removeItem('token');
      localStorage.removeItem('mobileNumber');
      localStorage.removeItem('user');
      set({ token: null, mobileNumber: null, user: null });
    }
  },
}));
