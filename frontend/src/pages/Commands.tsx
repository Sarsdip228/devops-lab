import { useEffect, useState } from 'react'
import { api } from '../api'
import type { Command } from '../types'

export default function Commands() {
  const [commands, setCommands] = useState<Command[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')

    const timer = setTimeout(() => {
      api.getCommands(search || undefined)
        .then(setCommands)
        .catch(() => setError('Не удалось загрузить команды.'))
        .finally(() => setLoading(false))
    }, 300)

    return () => clearTimeout(timer)
  }, [search])

  return (
    <>
      <h2 className="section-title">⌨️ Шпаргалка по командам</h2>

      <input
        className="search"
        type="text"
        placeholder="Поиск команды..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {loading && <div className="loading">Загрузка...</div>}
      {error && <div className="loading">{error}</div>}

      {!loading && !error && commands.length === 0 && (
        <div className="loading">Ничего не найдено.</div>
      )}

      {!loading && commands.map(cmd => (
        <div key={cmd.id} className="command">
          <div className="command-name">{cmd.name}</div>
          <div className="command-syntax">{cmd.syntax}</div>
          <p style={{ color: '#cbd5e1' }}>{cmd.description}</p>
          {cmd.example && (
            <div className="command-example">$ {cmd.example}</div>
          )}
        </div>
      ))}
    </>
  )
}
