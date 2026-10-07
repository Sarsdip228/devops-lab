import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

describe('Home', () => {
  it('renders the main heading', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    expect(screen.getByText(/DevOps/i)).toBeInTheDocument()
  })

  it('renders Temы and Fakty buttons', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    expect(screen.getByText(/Темы/i)).toBeInTheDocument()
    expect(screen.getByText(/Факты/i)).toBeInTheDocument()
  })
})
