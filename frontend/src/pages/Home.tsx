import { Link } from 'react-router-dom'
import HeroIllustration from '../components/HeroIllustration'

export default function Home() {
  return (
    <main className="main-content">
      <section className="hero-split">
        <div className="hero-left">
          <h1 className="hero-h1">
            Всё о <span className="hero-accent">DevOps</span> в одном месте
          </h1>

          <p className="hero-p">
            Инфраструктура как код, непрерывная доставка, контейнеры,
            мониторинг и автоматизация. Изучай по шагам — от Linux до
            Kubernetes.
          </p>

          <div className="hero-buttons">
            <Link to="/topics" className="hero-btn hero-btn-primary">
              📚 Темы
            </Link>
            <Link to="/facts" className="hero-btn hero-btn-secondary">
              💡 Факты
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <HeroIllustration />
        </div>
      </section>
    </main>
  )
}
