import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Facts from './Facts'

describe('Facts', () => {
  it('renders the title', () => {
    render(<Facts />)
    expect(screen.getByText(/Интересные факты о DevOps/i)).toBeInTheDocument()
  })

  it('renders 8 fact cards', () => {
    render(<Facts />)
    const cards = screen.getAllByRole('heading', { level: 3 })
    expect(cards).toHaveLength(8)
  })

  it('contains Amazon fact', () => {
    render(<Facts />)
    expect(screen.getByText(/Amazon деплоит каждые 11 секунд/i)).toBeInTheDocument()
  })

  it('contains Docker fact', () => {
    render(<Facts />)
    expect(screen.getByText(/Контейнеры вместо ВМ/i)).toBeInTheDocument()
  })
})
