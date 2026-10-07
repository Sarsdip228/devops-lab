export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      className="hero-svg"
      aria-label="DevOps инфраструктура"
    >
      <defs>
        {/* Свечения */}
        <radialGradient id="glowBig" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#0ea5e9" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="serverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        <linearGradient id="topGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.9" />
        </linearGradient>

        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>

        {/* Фильтр свечения */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowStrong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Фоновое свечение по центру */}
      <circle cx="300" cy="300" r="280" fill="url(#glowBig)" />

      {/* СЕТКА (изометрическая) */}
      <g stroke="#38bdf8" strokeOpacity="0.08" strokeWidth="1">
        {[...Array(11)].map((_, i) => (
          <line key={`h${i}`} x1="100" y1={180 + i * 24} x2="500" y2={120 + i * 24} />
        ))}
        {[...Array(11)].map((_, i) => (
          <line key={`v${i}`} x1={120 + i * 32} y1="180" x2={180 + i * 32} y2="500" />
        ))}
      </g>

      {/* ЛИНИИ СВЯЗИ (светящиеся) */}
      <g stroke="url(#lineGrad)" strokeWidth="1.5" fill="none" opacity="0.7" filter="url(#glow)">
        <path d="M 200 200 Q 300 240 400 200" />
        <path d="M 400 200 Q 480 260 420 340" />
        <path d="M 420 340 Q 340 380 240 360" />
        <path d="M 240 360 Q 180 300 200 200" />
        <path d="M 300 300 Q 380 280 460 320" />
        <path d="M 300 300 Q 220 320 160 400" />
        <path d="M 300 300 Q 350 420 300 480" />
      </g>

      {/* ГЛАВНЫЙ СЕРВЕР (центр) */}
      <g transform="translate(300 300)">
        {/* Тень на «полу» */}
        <ellipse cx="0" cy="55" rx="70" ry="20" fill="#0ea5e9" opacity="0.2" />

        {/* Верхняя крышка */}
        <path
          d="M -60 -10 L 0 -40 L 60 -10 L 0 20 Z"
          fill="url(#topGrad)"
          filter="url(#glow)"
          opacity="0.9"
        />
        {/* Верхняя крышка обводка */}
        <path
          d="M -60 -10 L 0 -40 L 60 -10 L 0 20 Z"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.5"
        />

        {/* Передняя левая сторона */}
        <path
          d="M -60 -10 L -60 35 L 0 65 L 0 20 Z"
          fill="url(#serverGrad)"
          stroke="#38bdf8"
          strokeWidth="1"
          strokeOpacity="0.5"
        />

        {/* Передняя правая сторона */}
        <path
          d="M 60 -10 L 60 35 L 0 65 L 0 20 Z"
          fill="url(#serverGrad)"
          stroke="#a78bfa"
          strokeWidth="1"
          strokeOpacity="0.5"
        />

        {/* Индикаторы на передней стороне */}
        <g fill="#38bdf8" filter="url(#glow)">
          <circle cx="-40" cy="10" r="2" />
          <circle cx="-40" cy="20" r="2" />
          <circle cx="-40" cy="30" r="2" fill="#a78bfa" />
          <circle cx="40" cy="10" r="2" />
          <circle cx="40" cy="20" r="2" fill="#6ee7b7" />
          <circle cx="40" cy="30" r="2" />
        </g>

        {/* Центральная иконка (шестерёнка / облако) */}
        <circle cx="0" cy="-10" r="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        <text
          x="0"
          y="-4"
          textAnchor="middle"
          fontSize="12"
          fill="#38bdf8"
          fontFamily="monospace"
          fontWeight="700"
        >
          ⚙
        </text>
      </g>

      {/* ЛЕВЫЙ ВЕРХНИЙ МИНИ-СЕРВЕР */}
      <g transform="translate(180 180)">
        <ellipse cx="0" cy="28" rx="38" ry="11" fill="#38bdf8" opacity="0.15" />
        <path
          d="M -35 -8 L 0 -25 L 35 -8 L 0 9 Z"
          fill="#1e3a5f"
          stroke="#38bdf8"
          strokeWidth="1.2"
        />
        <path
          d="M -35 -8 L -35 20 L 0 37 L 0 9 Z"
          fill="#0f172a"
          stroke="#38bdf8"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <path
          d="M 35 -8 L 35 20 L 0 37 L 0 9 Z"
          fill="#0f172a"
          stroke="#a78bfa"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <circle cx="-20" cy="6" r="1.5" fill="#38bdf8" filter="url(#glow)" />
        <circle cx="-20" cy="14" r="1.5" fill="#6ee7b7" filter="url(#glow)" />
      </g>

      {/* ПРАВЫЙ ВЕРХНИЙ МИНИ-СЕРВЕР */}
      <g transform="translate(420 200)">
        <ellipse cx="0" cy="28" rx="38" ry="11" fill="#a78bfa" opacity="0.15" />
        <path
          d="M -35 -8 L 0 -25 L 35 -8 L 0 9 Z"
          fill="#1e3a5f"
          stroke="#a78bfa"
          strokeWidth="1.2"
        />
        <path
          d="M -35 -8 L -35 20 L 0 37 L 0 9 Z"
          fill="#0f172a"
          stroke="#38bdf8"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <path
          d="M 35 -8 L 35 20 L 0 37 L 0 9 Z"
          fill="#0f172a"
          stroke="#a78bfa"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <circle cx="20" cy="6" r="1.5" fill="#a78bfa" filter="url(#glow)" />
        <circle cx="20" cy="14" r="1.5" fill="#6ee7b7" filter="url(#glow)" />
      </g>

      {/* НОУТБУК (сверху справа) */}
      <g transform="translate(470 260)">
        {/* Экран */}
        <path
          d="M -50 -40 L 50 -40 L 50 20 L -50 20 Z"
          fill="#0f172a"
          stroke="#38bdf8"
          strokeWidth="1.5"
          filter="url(#glow)"
        />
        {/* Внутренний дашборд */}
        <g fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.7">
          <rect x="-42" y="-32" width="84" height="44" rx="2" />
          <polyline
            points="-38,8 -25,-10 -12,0 5,-20 18,-5 35,-15 42,-25"
            stroke="#6ee7b7"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
        <circle cx="-30" cy="-25" r="2" fill="#38bdf8" />
        <circle cx="-22" cy="-25" r="2" fill="#a78bfa" />
        <circle cx="-14" cy="-25" r="2" fill="#6ee7b7" />
        {/* Клавиатура */}
        <path
          d="M -55 20 L 55 20 L 65 32 L -65 32 Z"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="1"
        />
      </g>

      {/* ЛЕВЫЙ НИЖНИЙ КОНТЕЙНЕР */}
      <g transform="translate(160 420)">
        <ellipse cx="0" cy="35" rx="45" ry="13" fill="#a78bfa" opacity="0.15" />
        <path
          d="M -40 -5 L -40 25 L 0 45 L 0 15 Z"
          fill="#0f172a"
          stroke="#a78bfa"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <path
          d="M 40 -5 L 40 25 L 0 45 L 0 15 Z"
          fill="#0f172a"
          stroke="#38bdf8"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <path
          d="M -40 -5 L 0 -25 L 40 -5 L 0 15 Z"
          fill="#1e293b"
          stroke="#a78bfa"
          strokeWidth="1.2"
        />
        <circle
          cx="0"
          cy="-5"
          r="5"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="1.5"
          filter="url(#glow)"
        />
      </g>

      {/* ПРАВЫЙ НИЖНИЙ БЛОК */}
      <g transform="translate(440 440)">
        <ellipse cx="0" cy="30" rx="40" ry="12" fill="#38bdf8" opacity="0.15" />
        <path
          d="M -35 -5 L -35 22 L 0 40 L 0 13 Z"
          fill="#0f172a"
          stroke="#38bdf8"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <path
          d="M 35 -5 L 35 22 L 0 40 L 0 13 Z"
          fill="#0f172a"
          stroke="#a78bfa"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <path
          d="M -35 -5 L 0 -22 L 35 -5 L 0 13 Z"
          fill="#1e293b"
          stroke="#38bdf8"
          strokeWidth="1.2"
        />
        <circle cx="0" cy="-3" r="4" fill="#38bdf8" filter="url(#glow)" />
      </g>

      {/* ПЛАВАЮЩИЕ ТОЧКИ-ЧАСТИЦЫ */}
      <g filter="url(#glowStrong)">
        <circle cx="120" cy="120" r="3" fill="#38bdf8" className="float f1" />
        <circle cx="500" cy="140" r="3" fill="#a78bfa" className="float f2" />
        <circle cx="540" cy="380" r="3" fill="#38bdf8" className="float f3" />
        <circle cx="80" cy="320" r="3" fill="#6ee7b7" className="float f4" />
        <circle cx="300" cy="90" r="3" fill="#a78bfa" className="float f5" />
        <circle cx="280" cy="520" r="3" fill="#38bdf8" className="float f6" />
      </g>

      {/* КОЛЬЦО-РАДАР (справа-снизу) */}
      <g transform="translate(500 480)" filter="url(#glow)">
        <circle cx="0" cy="0" r="18" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.7" />
        <circle cx="0" cy="0" r="10" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.5" />
        <circle cx="0" cy="0" r="3" fill="#38bdf8" />
      </g>
    </svg>
  )
}
