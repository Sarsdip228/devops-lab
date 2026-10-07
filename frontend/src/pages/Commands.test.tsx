import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Commands from './Commands'

const mockCommands = [
  { id: 1, topic_id: 1, name: 'ls', syntax: 'ls -la', description: 'Список файлов', example: 'ls -lah' },
  { id: 2, topic_id: 1, name: 'cd', syntax: 'cd [path]', description: 'Сменить папку', example: 'cd /etc' },
  { id: 3, topic_id: 2, name: 'docker run', syntax: 'docker run [img]', description: 'Запустить контейнер', example: 'docker run -d nginx' },
]

describe('Commands', () => {
  beforeEach(() => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockCommands,
    } as Response)
  })

  it('renders the title', async () => {
    render(<Commands />)
    await waitFor(() => {
      expect(screen.getByText(/Шпаргалка по командам/i)).toBeInTheDocument()
    })
  })

  it('renders commands from API', async () => {
    render(<Commands />)
    await waitFor(() => {
      expect(screen.getByText('ls')).toBeInTheDocument()
      expect(screen.getByText('cd')).toBeInTheDocument()
      expect(screen.getByText('docker run')).toBeInTheDocument()
    })
  })

  it('has a search input', () => {
    render(<Commands />)
    expect(screen.getByPlaceholderText(/Поиск команды/i)).toBeInTheDocument()
  })

  it('search input updates value', async () => {
    const user = userEvent.setup()
    render(<Commands />)
    const input = screen.getByPlaceholderText(/Поиск команды/i) as HTMLInputElement
    await user.type(input, 'docker')
    expect(input.value).toBe('docker')
  })
})
