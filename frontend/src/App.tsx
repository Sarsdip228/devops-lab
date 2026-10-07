import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Topics from './pages/Topics'
import TopicDetail from './pages/TopicDetail'
import Commands from './pages/Commands'
import Facts from './pages/Facts'

export default function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <NavLink to="/" className="logo">
            📚 DevOps - база знаний
          </NavLink>
          <nav className="nav">
            {/* На главной — пусто */}
            {isHome && null}

            {/* На всех остальных страницах — Главная + Факты */}
            {!isHome && (
              <>
                <NavLink to="/">Главная</NavLink>
                <NavLink to="/facts">Факты</NavLink>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:id" element={<TopicDetail />} />
          <Route path="/commands" element={<Commands />} />
          <Route path="/facts" element={<Facts />} />
        </Routes>
      </main>
    </>
  )
}
