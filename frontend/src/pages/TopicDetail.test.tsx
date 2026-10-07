import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import TopicDetail from './TopicDetail'

function renderWithRoute(id = '1') {
  return render(
    <MemoryRouter initialEntries={[`/topics/${id}`]}>
      <Routes>
        <Route path="/topics/:id" element={<TopicDetail />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('TopicDetail', () => {
  it('renders 3 tabs', () => {
    renderWithRoute()
    expect(screen.getByText('План')).toBeInTheDocument()
    expect(screen.getByText('Теория')).toBeInTheDocument()
    expect(screen.getByText('Команды')).toBeInTheDocument()
  })

  it('shows Plan content by default', () => {
    renderWithRoute()
    expect(screen.getByText(/📋 План/)).toBeInTheDocument()
  })

  it('switches to Theory tab on click', async () => {
    const user = userEvent.setup()
    renderWithRoute()
    await user.click(screen.getByText('Теория'))
    expect(screen.getByText(/📖 Теория/)).toBeInTheDocument()
  })

  it('switches to Commands tab on click', async () => {
    const user = userEvent.setup()
    renderWithRoute()
    await user.click(screen.getByText('Команды'))
    expect(screen.getByText(/⌨️ Команды/)).toBeInTheDocument()
  })

  it('has a back link', () => {
    renderWithRoute()
    expect(screen.getByText(/Назад к темам/)).toBeInTheDocument()
  })
})
