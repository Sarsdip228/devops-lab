import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Topics from './Topics'

const mockTopics = [
  {
    id: 1,
    title: 'Linux',
    description: 'Основы',
    icon: '🐧',
    difficulty: 'beginner',
    plan: [],
  },
  {
    id: 2,
    title: 'Docker',
    description: 'Контейнеры',
    icon: '🐳',
    difficulty: 'intermediate',
    plan: [],
  },
]

describe('Topics', () => {
  beforeEach(() => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockTopics,
    } as Response)
  })

  it('renders the title', async () => {
    render(
      <MemoryRouter>
        <Topics />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText(/Все темы/i)).toBeInTheDocument()
    })
  })

  it('renders topic cards from API', async () => {
    render(
      <MemoryRouter>
        <Topics />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText('Linux')).toBeInTheDocument()
      expect(screen.getByText('Docker')).toBeInTheDocument()
    })
  })
})
