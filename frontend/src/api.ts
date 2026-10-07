import type { Topic, TopicDetail, Lesson, Command } from './types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }
  return res.json()
}

export const api = {
  getTopics: (): Promise<Topic[]> => request('/api/topics/'),

  getTopic: (id: number): Promise<TopicDetail> => request(`/api/topics/${id}`),

  getCommands: (search?: string): Promise<Command[]> => {
    const q = search ? `?search=${encodeURIComponent(search)}` : ''
    return request(`/api/commands/${q}`)
  },

  getLessons: (topicId?: number): Promise<Lesson[]> => {
    const q = topicId ? `?topic_id=${topicId}` : ''
    return request(`/api/lessons/${q}`)
  },

  createTopic: (data: Omit<Topic, 'id'>): Promise<Topic> =>
    request('/api/topics/', { method: 'POST', body: JSON.stringify(data) }),
}
