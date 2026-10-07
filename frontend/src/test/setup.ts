import '@testing-library/jest-dom'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Чистим DOM после каждого теста
afterEach(() => {
  cleanup()
})

// Заглушаем fetch — по умолчанию undefined, чтобы тесты явно его мокали
vi.stubGlobal('fetch', vi.fn())
