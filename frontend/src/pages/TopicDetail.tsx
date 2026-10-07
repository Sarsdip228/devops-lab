import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

type Tab = 'plan' | 'theory' | 'commands'

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: 'plan', label: 'План', icon: '📋' },
  { key: 'theory', label: 'Теория', icon: '📖' },
  { key: 'commands', label: 'Команды', icon: '⌨️' },
]

export default function TopicDetail() {
  const { id } = useParams<{ id: string }>()
  const [active, setActive] = useState<Tab>('plan')

  return (
    <>
      <Link to="/topics" className="back">
        ← Назад к темам
      </Link>

      {/* ТРИ ПРЯМОУГОЛЬНИКА ПО ЦЕНТРУ */}
      <div className="tabs-row">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`tab-box ${active === tab.key ? 'tab-box-active' : ''}`}
            onClick={() => setActive(tab.key)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* СОДЕРЖИМОЕ ВЫБРАННОГО БЛОКА */}
      <div className="tab-content">
        {active === 'plan' && (
          <section>
            <h2 className="tab-content-title">📋 План</h2>
            {/* тут будет план */}
          </section>
        )}

        {active === 'theory' && (
          <section>
            <h2 className="tab-content-title">📖 Теория</h2>
            {/* тут будет теория */}
          </section>
        )}

        {active === 'commands' && (
          <section>
            <h2 className="tab-content-title">⌨️ Команды</h2>
            {/* тут будут команды */}
          </section>
        )}
      </div>

      {/* id темы — пригодится позже, пока не используется */}
      <span style={{ display: 'none' }}>{id}</span>
    </>
  )
}
