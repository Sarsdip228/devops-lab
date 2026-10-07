import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response)
  })

  it('renders the logo', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText(/DevOps - база знаний/i)).toBeInTheDocument()
  })

  it('shows no nav links on home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.queryByText('Главная')).not.toBeInTheDocument()
    expect(screen.queryByText('Факты')).not.toBeInTheDocument()
  })

  it('shows nav links on /facts page', () => {
    render(
      <MemoryRouter initialEntries={['/facts']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText('Главная')).toBeInTheDocument()
    expect(screen.getByText('Факты')).toBeInTheDocument()
  })
})
