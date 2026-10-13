import type { Topic, TopicDetail, Lesson, Command, AuthResponse, User } from './types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const TOKEN_KEY = 'devops_lab_token'

// ═══════════════════════════════════════════
//  ТОКЕН
// ═══════════════════════════════════════════
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

// ═══════════════════════════════════════════
//  БАЗОВЫЙ ЗАПРОС
// ═══════════════════════════════════════════
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options?.headers || {}),
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })

  if (res.status === 401) {
    clearToken()
    throw new Error('UNAUTHORIZED')
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || `API error: ${res.status}`)
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

// ═══════════════════════════════════════════
//  API
// ═══════════════════════════════════════════
export const api = {
  // ─── Темы ───
  getTopics: (): Promise<Topic[]> => request('/api/topics/'),
  getTopic: (id: number): Promise<TopicDetail> => request(`/api/topics/${id}`),

  // ─── Команды ───
  getCommands: (search?: string): Promise<Command[]> => {
    const q = search ? `?search=${encodeURIComponent(search)}` : ''
    return request(`/api/commands/${q}`)
  },

  // ─── Уроки ───
  getLessons: (topicId?: number): Promise<Lesson[]> => {
    const q = topicId ? `?topic_id=${topicId}` : ''
    return request(`/api/lessons/${q}`)
  },

  // ─── Регистрация ───
  register: (username: string, password: string): Promise<AuthResponse> =>
    request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  // ─── Вход ───
  login: async (username: string, password: string): Promise<AuthResponse> => {
    const body = new URLSearchParams({ username, password })
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.detail || 'Неверный username или пароль')
    }
    return res.json()
  },

  // ─── Текущий пользователь ───
  me: (): Promise<User> => request('/api/auth/me'),
}
