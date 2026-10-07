import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import type { Topic } from '../types'

// Порядок изучения DevOps: от фундамента к продвинутому
const learningOrder = [
  'Linux',
  'Bash',
  'Git',
  'Python',
  'Docker',
  'Nginx',
  'PostgreSQL',
  'CI/CD',
  'Kubernetes',
  'Мониторинг',
  'Облака',
  'Безопасность',
]

export default function Topics() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .getTopics()
      .then(setTopics)
      .catch(() => setError('Не удалось загрузить темы. Бэкенд запущен?'))
      .finally(() => setLoading(false))
  }, [])

  // Сортируем по learningOrder
  const sortedTopics = [...topics].sort((a, b) => {
    const ai = learningOrder.indexOf(a.title)
    const bi = learningOrder.indexOf(b.title)
    // Если темы нет в списке — отправляем в конец
    const aIdx = ai === -1 ? 999 : ai
    const bIdx = bi === -1 ? 999 : bi
    return aIdx - bIdx
  })

  if (loading) return <div className="loading">Загрузка...</div>
  if (error) return <div className="loading">{error}</div>

  return (
    <>
      <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>
        Все темы
      </h1>
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
        Рекомендуемый порядок изучения — от фундамента к продвинутому
      </p>

      <div className="grid">
        {sortedTopics.map((topic, index) => (
          <Link key={topic.id} to={`/topics/${topic.id}`} className="card">
            <div className="card-icon">{topic.icon}</div>
            <div
              style={{
                fontSize: '0.75rem',
                color: '#38bdf8',
                fontWeight: 700,
                marginBottom: '0.25rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Шаг {index + 1}
            </div>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
            <span className={`badge ${topic.difficulty}`}>{topic.difficulty}</span>
          </Link>
        ))}
      </div>
    </>
  )
}
