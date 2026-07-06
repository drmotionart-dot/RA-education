const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error || `Request failed (${res.status})`);
  }

  return res.json();
}

export const api = {
  auth: {
    register: (data: { full_name: string; mobile_number: string; email: string; password: string; national_id: string; date_of_birth: string; gender: string; governorate: string; role: string }) =>
      request<{ token: string; user: { mobile_number: string; name: string; role: string; email: string } }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    login: (identifier: string, password: string) =>
      request<{ token: string; user: { mobile_number: string; name: string; role: string; email: string } }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, password }),
      }),
    forgotPassword: (identifier: string) =>
      request<{ message: string }>('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ identifier }),
      }),
    resetPassword: (identifier: string, code: string, new_password: string) =>
      request<{ message: string }>('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ identifier, code, new_password }),
      }),
    requestOTP: (mobile: string) =>
      request<{ message: string }>('/auth/otp/request', {
        method: 'POST',
        body: JSON.stringify({ mobile_number: mobile }),
      }),
    verifyOTP: (mobile: string, code: string) =>
      request<{ token: string; mobile_number: string }>('/auth/otp/verify', {
        method: 'POST',
        body: JSON.stringify({ mobile_number: mobile, code }),
      }),
  },
  users: {
    onboard: (data: Record<string, unknown>) =>
      request<Record<string, unknown>>('/users/onboard', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    me: () => request<Record<string, unknown>>('/users/me'),
    update: (data: { name?: string; email?: string }) =>
      request<Record<string, unknown>>('/users/me', {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: () =>
      request<{ message: string }>('/users/me', { method: 'DELETE' }),
  },
  catalog: {
    specialties: (category?: string) =>
      request<Record<string, unknown>[]>(`/catalog/specialties${category ? `?category=${category}` : ''}`),
    specialty: (id: string) =>
      request<Record<string, unknown>>(`/catalog/specialties/${id}`),
    paths: (category?: string) =>
      request<Record<string, unknown>[]>(`/catalog/paths${category ? `?category=${category}` : ''}`),
    path: (id: string) =>
      request<Record<string, unknown>>(`/catalog/paths/${id}`),
  },
  quickpick: {
    create: (data: { specialty_id: string; path_id: string; preset_duration_months: number }) =>
      request<Record<string, unknown>>('/quickpick', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
  plan: {
    generate: (quickpickId: string) =>
      request<Record<string, unknown>>('/plan/generate', {
        method: 'POST',
        body: JSON.stringify({ quickpick_id: quickpickId }),
      }),
    current: () => request<Record<string, unknown>>('/plan/current'),
    restart: () =>
      request<Record<string, unknown>>('/plan/restart', { method: 'POST' }),
  },
  survey: {
    start: (type: string, role: string) =>
      request<{ session_id: string; status: string; question: { node_id: string; question_text: string; is_universal: boolean; options: { index: number; option_text: string }[] }; progress: { answered: number; total: number } }>('/survey/start', {
        method: 'POST',
        body: JSON.stringify({ type, role }),
      }),
    answer: (sessionId: string, nodeId: string, optionIndex: number) =>
      request<{ session_id: string; status: string; question?: { node_id: string; question_text: string; is_universal: boolean; options: { index: number; option_text: string }[] }; progress?: { answered: number; total: number }; results?: { matches: { specialty_name: string; specialty_id: string | null; similarity: number; axes_contributing: string[] }[]; top_match: string; confidence: number } }>(`/survey/${sessionId}/answer`, {
        method: 'POST',
        body: JSON.stringify({ node_id: nodeId, option_index: optionIndex }),
      }),
    state: (sessionId: string) =>
      request<{ session_id: string; status: string; question?: { node_id: string; question_text: string; is_universal: boolean; options: { index: number; option_text: string }[] }; progress?: { answered: number; total: number }; results?: { matches: { specialty_name: string; specialty_id: string | null; similarity: number; axes_contributing: string[] }[]; top_match: string; confidence: number } }>(`/survey/${sessionId}/state`),
    complete: (sessionId: string) =>
      request<{ session_id: string; status: string; results: { matches: { specialty_name: string; specialty_id: string | null; similarity: number; axes_contributing: string[] }[]; top_match: string; confidence: number } }>(`/survey/${sessionId}/complete`, { method: 'POST' }),
  },
  assessment: {
    start: (specialtyId: string) =>
      request<{ assessment_id: string; specialty_name: string; question_count: number; status: string }>('/assessment/start', {
        method: 'POST',
        body: JSON.stringify({ specialty_id: specialtyId }),
      }),
    nextQuestion: (id: string) =>
      request<{
        status: string;
        question?: { _id: string; question_text: string; question_type: string; options: { _id: string; option_text: string; order: number }[]; difficulty: string };
        progress?: { answered: number; total: number };
      }>(`/assessment/${id}/next`),
    submitAnswer: (id: string, questionId: string, selectedOptionIds: string[]) =>
      request<{ status: string; is_correct?: boolean }>(`/assessment/${id}/answer`, {
        method: 'POST',
        body: JSON.stringify({ question_id: questionId, selected_option_ids: selectedOptionIds }),
      }),
    results: (id: string) =>
      request<{
        assessment_id: string;
        specialty_id: string;
        status: string;
        question_count: number;
        answered_count: number;
        scoring: { branch_id: string; branch_name: string; correct: number; total: number; score_pct: number }[];
        started_at: string;
        completed_at: string | null;
        next_action: { can_reallocate: boolean; plan_id: string } | null;
      }>(`/assessment/${id}/results`),
    reallocate: (id: string) =>
      request<Record<string, unknown>>(`/assessment/${id}/reallocate`, { method: 'POST' }),
  },
};
