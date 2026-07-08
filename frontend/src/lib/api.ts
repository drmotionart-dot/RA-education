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
  lessons: {
    get: (id: string) => request<Record<string, unknown>>(`/lessons/${id}`),
    resources: (id: string) => request<Record<string, unknown>>(`/lessons/${id}/resources`),
    startExam: (planLessonId: string) =>
      request<{ assessment_id: string; lesson_id: string; lesson_title: string; question_count: number; status: string }>('/lessons/start-exam', {
        method: 'POST',
        body: JSON.stringify({ plan_lesson_id: planLessonId }),
      }),
    complete: (planLessonId: string, assessmentId?: string) =>
      request<{ passed: boolean; next_lesson_id?: string; completed_lesson_id?: string; score?: number; min_pass_score?: number; suggestions?: { id: string; title: string; description: string; duration_minutes: number }[] }>('/lessons/complete', {
        method: 'POST',
        body: JSON.stringify({ plan_lesson_id: planLessonId, assessment_id: assessmentId }),
      }),
    suggestions: (planLessonId: string) =>
      request<{ id: string; title: string; description: string; duration_minutes: number }[]>('/lessons/suggestions', {
        method: 'POST',
        body: JSON.stringify({ plan_lesson_id: planLessonId }),
      }),
  },
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
  compass: {
    paths: (params?: { category?: string; path_type?: string; country?: string }) => {
      const q = new URLSearchParams();
      if (params?.category) q.set('category', params.category);
      if (params?.path_type) q.set('path_type', params.path_type);
      if (params?.country) q.set('country', params.country);
      const qs = q.toString();
      return request<Record<string, unknown>[]>(`/catalog/compass/paths${qs ? `?${qs}` : ''}`);
    },
    compare: (ids: string[]) =>
      request<Record<string, unknown>>(`/catalog/compass/paths/compare?ids=${ids.join(',')}`),
    costCalculator: (pathId?: string, currency?: string) => {
      const q = new URLSearchParams();
      if (pathId) q.set('path_id', pathId);
      if (currency) q.set('currency', currency);
      const qs = q.toString();
      return request<Record<string, unknown> | Record<string, unknown>[]>(`/catalog/compass/cost-calculator${qs ? `?${qs}` : ''}`);
    },
    smartFind: (params: { budget_max?: number; duration_max?: number; category?: string; country?: string; path_type?: string; language?: string }) => {
      const q = new URLSearchParams();
      if (params.budget_max != null) q.set('budget_max', String(params.budget_max));
      if (params.duration_max != null) q.set('duration_max', String(params.duration_max));
      if (params.category) q.set('category', params.category);
      if (params.country) q.set('country', params.country);
      if (params.path_type) q.set('path_type', params.path_type);
      if (params.language) q.set('language', params.language);
      const qs = q.toString();
      return request<Record<string, unknown>[]>(`/catalog/compass/smart-find${qs ? `?${qs}` : ''}`);
    },
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
    history: () =>
      request<Record<string, unknown>[]>('/plan/history'),
  },
  survey: {
    start: (type: string, role: string) =>
      request<{ session_id: string; status: string; question: { node_id: string; question_text: string; is_universal: boolean; options: { index: number; option_text: string }[] }; progress: { answered: number; total: number } }>('/survey/start', {
        method: 'POST',
        body: JSON.stringify({ type, role }),
      }),
    answer: (sessionId: string, nodeId: string, optionIndex: number) =>
      request<{ session_id: string; status: string; question?: { node_id: string; question_text: string; is_universal: boolean; options: { index: number; option_text: string }[] }; progress?: { answered: number; total: number }; results?: { matches: { specialty_name: string; specialty_id: string | null; similarity: number; strongest_axes: string[]; distinguishing_axes: string[] }[]; top_match: string; confidence: number; unhit_axes_warning?: string } }>(`/survey/${sessionId}/answer`, {
        method: 'POST',
        body: JSON.stringify({ node_id: nodeId, option_index: optionIndex }),
      }),
    state: (sessionId: string) =>
      request<{ session_id: string; status: string; question?: { node_id: string; question_text: string; is_universal: boolean; options: { index: number; option_text: string }[] }; progress?: { answered: number; total: number }; results?: { matches: { specialty_name: string; specialty_id: string | null; similarity: number; strongest_axes: string[]; distinguishing_axes: string[] }[]; top_match: string; confidence: number; unhit_axes_warning?: string } }>(`/survey/${sessionId}/state`),
    complete: (sessionId: string) =>
      request<{ session_id: string; status: string; results: { matches: { specialty_name: string; specialty_id: string | null; similarity: number; strongest_axes: string[]; distinguishing_axes: string[] }[]; top_match: string; confidence: number; unhit_axes_warning?: string } }>(`/survey/${sessionId}/complete`, { method: 'POST' }),
    createPlan: (sessionId: string) =>
      request<{ plan: Record<string, unknown>; source: string }>(`/survey/${sessionId}/create-plan`, { method: 'POST' }),
    status: () =>
      request<{ doctor_specialty: boolean; nurse_specialty: boolean; doctor_path: boolean; nurse_path: boolean; hasCompletedSurvey: boolean; hasPlanFromSurvey: boolean }>('/survey/status'),
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
  dashboard: {
    stats: () => request<{
      weeklyActivity: { label: string; value: number }[];
      sparklineData: number[];
      categoryBreakdown: { name: string; pct: number; color: string }[];
      hoursThisWeek: number;
    }>('/dashboard/stats'),
  },
  companion: {
    match: () => request<{ user_id: string; name: string; role: string; same_path: boolean; match_score: number }[]>('/companion/match'),
    request: (toUserId: string) =>
      request<{ request_id: string; status: string }>('/companion/request', {
        method: 'POST',
        body: JSON.stringify({ to_user_id: toUserId }),
      }),
    respond: (requestId: string, action: 'accept' | 'decline') =>
      request<{ status: string; companion_id?: string }>('/companion/respond', {
        method: 'POST',
        body: JSON.stringify({ request_id: requestId, action }),
      }),
    get: () =>
      request<{ user_id: string; name: string; role: string; has_active_plan: boolean; lesson_progress: { total: number; completed: number } } | null>('/companion'),
    requests: () =>
      request<{
        incoming: { request_id: string; user: { id: string; name: string; role: string }; created_at: string }[];
        outgoing: { request_id: string; user: { id: string; name: string; role: string }; created_at: string }[];
      }>('/companion/requests'),
  },
};
