import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import type { ReactNode } from 'react'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()

  // Пока проверяем токен — показываем заглушку
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#8b949e' }}>
        Загрузка...
      </div>
    )
  }

  // Не залогинен → редирект на /login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Залогинен → показываем контент
  return <>{children}</>
}
