import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Topics from './pages/Topics'
import TopicDetail from './pages/TopicDetail'
import Commands from './pages/Commands'
import Facts from './pages/Facts'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider, useAuth } from './contexts/AuthContext'

function Header() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="header">
      <div className="header-inner">
        <NavLink to="/" className="logo">
          📚 DevOps - база знаний
        </NavLink>

        <nav className="nav">
          {/* Навигация — только не на главной */}
          {!isHome && (
            <>
              <NavLink to="/">Главная</NavLink>
              <NavLink to="/facts">Факты</NavLink>
            </>
          )}

          {/* Пользователь / Войти — всегда */}
          {user ? (
            <div className="nav-user">
              <span className="nav-user-name">👤 {user.username}</span>
              <button onClick={logout} className="logout-btn">
                Выйти
              </button>
            </div>
          ) : (
            <NavLink to="/login">Войти / Регистрация</NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Header />
      <main className="container">
        <Routes>
          {/* ═══════════════════════════════════════════ */}
          {/*  ОТКРЫТЫЕ — доступны без входа             */}
          {/* ═══════════════════════════════════════════ */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* ═══════════════════════════════════════════ */}
          {/*  ЗАЩИЩЁННЫЕ — только после входа           */}
          {/* ═══════════════════════════════════════════ */}
          <Route
            path="/topics"
            element={
              <ProtectedRoute>
                <Topics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/topics/:id"
            element={
              <ProtectedRoute>
                <TopicDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/commands"
            element={
              <ProtectedRoute>
                <Commands />
              </ProtectedRoute>
            }
          />
          <Route
            path="/facts"
            element={
              <ProtectedRoute>
                <Facts />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </AuthProvider>
  )
}
