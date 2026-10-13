import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

type Tab = 'plan' | 'theory' | 'commands'

// ═══════════════════════════════════════════
//  ТИПЫ
// ═══════════════════════════════════════════
type Command = {
  group: string        // группа (Навигация, Файлы, ...)
  name: string
  syntax: string
  description: string
  example: string
}

type TopicData = {
  title: string
  plan: string[]
  theory: string
  commands: Command[]
}

// ═══════════════════════════════════════════
//  ДАННЫЕ ВСЕХ ТЕМ
// ═══════════════════════════════════════════
const topicsData: Record<number, TopicData> = {

  // ═══════════════════════════════════════════
  //  ТЕМА 1: LINUX
  // ═══════════════════════════════════════════
  1: {
    title: 'Linux',
    plan: [
      'Навигация и терминал',
      'Файлы и директории',
      'Поиск файлов и текста',
      'Пользователи и права',
      'Процессы и система',
      'Диски и память',
      'Сеть',
      'Архивы',
      'Службы и логи',
    ],
    theory: `Linux — это семейство Unix-подобных операционных систем.
Основа для большинства серверов в мире.

Ключевые понятия:
• Ядро (kernel) — управляет железом
• Оболочка (shell) — интерфейс для команд
• Файловая система — иерархия от корня /
• Права доступа — rwx для owner/group/other`,
    commands: [
      // ─── 🖥️ Навигация ───
      { group: '🖥️ Навигация', name: 'pwd',     syntax: 'pwd',                description: 'Показать текущую директорию', example: 'pwd' },
      { group: '🖥️ Навигация', name: 'cd',      syntax: 'cd <путь>',          description: 'Перейти в директорию',        example: 'cd /var/log' },
      { group: '🖥️ Навигация', name: 'cd ..',   syntax: 'cd ..',              description: 'На уровень выше',             example: 'cd ..' },
      { group: '🖥️ Навигация', name: 'cd ~',    syntax: 'cd ~',               description: 'В домашнюю директорию',       example: 'cd ~' },
      { group: '🖥️ Навигация', name: 'clear',   syntax: 'clear',              description: 'Очистить экран',              example: 'clear' },
      { group: '🖥️ Навигация', name: 'history', syntax: 'history',            description: 'История команд',              example: 'history' },
      { group: '🖥️ Навигация', name: 'man',     syntax: 'man <команда>',      description: 'Справка по команде',          example: 'man ls' },
      { group: '🖥️ Навигация', name: '--help',  syntax: '<команда> --help',   description: 'Краткая справка',             example: 'ls --help' },
      { group: '🖥️ Навигация', name: 'exit',    syntax: 'exit',               description: 'Выйти из терминала',          example: 'exit' },

      // ─── 📁 Файлы ───
      { group: '📁 Файлы и директории', name: 'ls',      syntax: 'ls -la',              description: 'Список файлов',                example: 'ls -la' },
      { group: '📁 Файлы и директории', name: 'mkdir',   syntax: 'mkdir <имя>',         description: 'Создать директорию',           example: 'mkdir new_folder' },
      { group: '📁 Файлы и директории', name: 'touch',   syntax: 'touch <файл>',        description: 'Создать пустой файл',          example: 'touch file.txt' },
      { group: '📁 Файлы и директории', name: 'cp',      syntax: 'cp <откуда> <куда>',  description: 'Копировать',                   example: 'cp file.txt /tmp/' },
      { group: '📁 Файлы и директории', name: 'cp -r',   syntax: 'cp -r <папка> <куда>', description: 'Копировать директорию',       example: 'cp -r folder/ /backup/' },
      { group: '📁 Файлы и директории', name: 'mv',      syntax: 'mv <откуда> <куда>',  description: 'Переместить/переименовать',    example: 'mv old.txt new.txt' },
      { group: '📁 Файлы и директории', name: 'rm',      syntax: 'rm <файл>',           description: 'Удалить файл',                 example: 'rm file.txt' },
      { group: '📁 Файлы и директории', name: 'rm -r',   syntax: 'rm -r <папка>',       description: 'Удалить директорию',           example: 'rm -r folder/' },
      { group: '📁 Файлы и директории', name: 'cat',     syntax: 'cat <файл>',          description: 'Показать содержимое',          example: 'cat file.txt' },
      { group: '📁 Файлы и директории', name: 'less',    syntax: 'less <файл>',         description: 'Постраничный просмотр',        example: 'less file.txt' },
      { group: '📁 Файлы и директории', name: 'head',    syntax: 'head <файл>',         description: 'Первые 10 строк',              example: 'head file.log' },
      { group: '📁 Файлы и директории', name: 'tail',    syntax: 'tail <файл>',         description: 'Последние 10 строк',           example: 'tail file.log' },
      { group: '📁 Файлы и директории', name: 'tail -f', syntax: 'tail -f <файл>',      description: 'Следить за файлом',            example: 'tail -f app.log' },
      { group: '📁 Файлы и директории', name: 'nano',    syntax: 'nano <файл>',         description: 'Редактор Nano',                example: 'nano file.txt' },

      // ─── 🔍 Поиск ───
      { group: '🔍 Поиск', name: 'find',    syntax: 'find <путь> -name "<шаблон>"', description: 'Поиск файлов',        example: 'find /home -name "*.log"' },
      { group: '🔍 Поиск', name: 'grep',    syntax: 'grep "<текст>" <файл>',        description: 'Поиск текста',        example: 'grep "error" app.log' },
      { group: '🔍 Поиск', name: 'grep -r', syntax: 'grep -r "<текст>" <папка>',    description: 'Рекурсивный поиск',   example: 'grep -r "TODO" ./src' },
      { group: '🔍 Поиск', name: 'which',   syntax: 'which <команда>',              description: 'Путь к команде',      example: 'which python3' },

      // ─── 👤 Пользователи и права ───
      { group: '👤 Пользователи и права', name: 'whoami',   syntax: 'whoami',                   description: 'Текущий пользователь',  example: 'whoami' },
      { group: '👤 Пользователи и права', name: 'id',       syntax: 'id',                       description: 'UID, GID, группы',      example: 'id' },
      { group: '👤 Пользователи и права', name: 'sudo',     syntax: 'sudo <команда>',           description: 'Выполнить от root',     example: 'sudo apt update' },
      { group: '👤 Пользователи и права', name: 'su',       syntax: 'su <username>',            description: 'Сменить пользователя',  example: 'su username' },
      { group: '👤 Пользователи и права', name: 'chmod',    syntax: 'chmod <права> <файл>',     description: 'Изменить права',        example: 'chmod 755 script.sh' },
      { group: '👤 Пользователи и права', name: 'chmod +x', syntax: 'chmod +x <файл>',          description: 'Сделать исполняемым',   example: 'chmod +x script.sh' },
      { group: '👤 Пользователи и права', name: 'chown',    syntax: 'chown <user>:<group> <файл>', description: 'Сменить владельца',  example: 'chown user:group file.txt' },
      { group: '👤 Пользователи и права', name: 'passwd',   syntax: 'passwd',                   description: 'Сменить пароль',        example: 'passwd' },

      // ─── ⚙️ Процессы и система ───
      { group: '⚙️ Процессы и система', name: 'ps aux',    syntax: 'ps aux',                description: 'Список процессов',              example: 'ps aux' },
      { group: '⚙️ Процессы и система', name: 'top',       syntax: 'top',                   description: 'Мониторинг в реальном времени', example: 'top' },
      { group: '⚙️ Процессы и система', name: 'htop',      syntax: 'htop',                  description: 'Улучшенный монитор',            example: 'htop' },
      { group: '⚙️ Процессы и система', name: 'kill',      syntax: 'kill <PID>',            description: 'Убить по PID',                  example: 'kill 1234' },
      { group: '⚙️ Процессы и система', name: 'kill -9',   syntax: 'kill -9 <PID>',         description: 'Жёстко убить',                  example: 'kill -9 1234' },
      { group: '⚙️ Процессы и система', name: 'pkill',     syntax: 'pkill <имя>',           description: 'Убить по имени',                example: 'pkill nginx' },
      { group: '⚙️ Процессы и система', name: 'uname -a',  syntax: 'uname -a',              description: 'Информация о ядре',             example: 'uname -a' },
      { group: '⚙️ Процессы и система', name: 'uptime',    syntax: 'uptime',                description: 'Время работы и нагрузка',       example: 'uptime' },
      { group: '⚙️ Процессы и система', name: 'reboot',    syntax: 'sudo reboot',           description: 'Перезагрузка',                  example: 'sudo reboot' },
      { group: '⚙️ Процессы и система', name: 'shutdown',  syntax: 'sudo shutdown -h now',  description: 'Выключение',                    example: 'sudo shutdown -h now' },

      // ─── 💾 Диски и память ───
      { group: '💾 Диски и память', name: 'df -h',   syntax: 'df -h',         description: 'Свободное место на дисках', example: 'df -h' },
      { group: '💾 Диски и память', name: 'du -sh',  syntax: 'du -sh <путь>', description: 'Размер папки',              example: 'du -sh /var/log' },
      { group: '💾 Диски и память', name: 'free -h', syntax: 'free -h',       description: 'Оперативная память',        example: 'free -h' },

      // ─── 🌐 Сеть ───
      { group: '🌐 Сеть', name: 'ping',     syntax: 'ping <хост>',                description: 'Проверить доступность',  example: 'ping 8.8.8.8' },
      { group: '🌐 Сеть', name: 'ip a',     syntax: 'ip a',                       description: 'IP-адреса интерфейсов',  example: 'ip a' },
      { group: '🌐 Сеть', name: 'ss -tulnp',syntax: 'ss -tulnp',                  description: 'Открытые порты',         example: 'ss -tulnp' },
      { group: '🌐 Сеть', name: 'curl',     syntax: 'curl <URL>',                 description: 'HTTP-запросы',           example: 'curl -I https://google.com' },
      { group: '🌐 Сеть', name: 'wget',     syntax: 'wget <URL>',                 description: 'Скачать файл',           example: 'wget https://example.com/file.zip' },
      { group: '🌐 Сеть', name: 'ssh',      syntax: 'ssh <user>@<хост>',          description: 'Подключиться по SSH',    example: 'ssh user@192.168.1.10' },
      { group: '🌐 Сеть', name: 'scp',      syntax: 'scp <файл> <user>@<хост>:<путь>', description: 'Копировать по SSH',  example: 'scp file.txt user@host:/tmp/' },

      // ─── 📦 Архивы ───
      { group: '📦 Архивы', name: 'tar -czvf', syntax: 'tar -czvf <архив> <папка>', description: 'Создать .tar.gz',    example: 'tar -czvf archive.tar.gz folder/' },
      { group: '📦 Архивы', name: 'tar -xzvf', syntax: 'tar -xzvf <архив>',        description: 'Распаковать .tar.gz', example: 'tar -xzvf archive.tar.gz' },
      { group: '📦 Архивы', name: 'zip',       syntax: 'zip -r <архив> <папка>',   description: 'Создать .zip',        example: 'zip -r archive.zip folder/' },
      { group: '📦 Архивы', name: 'unzip',     syntax: 'unzip <архив>',            description: 'Распаковать .zip',    example: 'unzip archive.zip' },

      // ─── 🔧 Службы и логи ───
      { group: '🔧 Службы и логи', name: 'systemctl start',   syntax: 'sudo systemctl start <служба>',   description: 'Запустить службу',           example: 'sudo systemctl start nginx' },
      { group: '🔧 Службы и логи', name: 'systemctl stop',    syntax: 'sudo systemctl stop <служба>',    description: 'Остановить',                  example: 'sudo systemctl stop nginx' },
      { group: '🔧 Службы и логи', name: 'systemctl restart', syntax: 'sudo systemctl restart <служба>', description: 'Перезапустить',               example: 'sudo systemctl restart nginx' },
      { group: '🔧 Службы и логи', name: 'systemctl status',  syntax: 'systemctl status <служба>',       description: 'Статус службы',               example: 'systemctl status nginx' },
      { group: '🔧 Службы и логи', name: 'systemctl enable',  syntax: 'sudo systemctl enable <служба>',  description: 'Автозапуск',                  example: 'sudo systemctl enable nginx' },
      { group: '🔧 Службы и логи', name: 'journalctl -u',     syntax: 'journalctl -u <служба>',          description: 'Логи службы',                 example: 'journalctl -u nginx' },
      { group: '🔧 Службы и логи', name: 'journalctl -f',     syntax: 'journalctl -f',                   description: 'Логи в реальном времени',     example: 'journalctl -f' },
    ],
  },

  // ═══════════════════════════════════════════
  //  ТЕМА 2: НАВИГАЦИЯ (или Bash)
  // ═══════════════════════════════════════════
  2: {
    title: 'Bash',
    plan: [],
    theory: '',
    commands: [],
  },

  // ═══════════════════════════════════════════
  //  ОСТАЛЬНЫЕ ТЕМЫ (пустые, заполним позже)
  // ═══════════════════════════════════════════
  3:  { title: 'Git',          plan: [], theory: '', commands: [] },
  4:  { title: 'Python',       plan: [], theory: '', commands: [] },
  5:  { title: 'Docker',       plan: [], theory: '', commands: [] },
  6:  { title: 'Nginx',        plan: [], theory: '', commands: [] },
  7:  { title: 'PostgreSQL',   plan: [], theory: '', commands: [] },
  8:  { title: 'CI/CD',        plan: [], theory: '', commands: [] },
  9:  { title: 'Kubernetes',   plan: [], theory: '', commands: [] },
  10: { title: 'Мониторинг',   plan: [], theory: '', commands: [] },
  11: { title: 'Cloud',        plan: [], theory: '', commands: [] },
  12: { title: 'Безопасность', plan: [], theory: '', commands: [] },
  13:  { title: 'network',     plan: [], theory: '', commands: [] },
}


// ═══════════════════════════════════════════
//  ВКЛАДКИ
// ═══════════════════════════════════════════
const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: 'plan', label: 'План', icon: '📋' },
  { key: 'theory', label: 'Теория', icon: '📖' },
  { key: 'commands', label: 'Команды', icon: '⌨️' },
]


// ═══════════════════════════════════════════
//  КОМПОНЕНТ
// ═══════════════════════════════════════════
export default function TopicDetail() {
  const { id } = useParams<{ id: string }>()
  const [active, setActive] = useState<Tab>('plan')

  const topicId = Number(id)
  const topic = topicsData[topicId]

  if (!topic) {
    return (
      <>
        <Link to="/topics" className="back">← Назад к темам</Link>
        <p style={{ color: '#8b949e', marginTop: '1rem' }}>Тема не найдена 🤔</p>
      </>
    )
  }

  // Группируем команды по полю `group`
  const groupedCommands = topic.commands.reduce<Record<string, Command[]>>((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = []
    acc[cmd.group].push(cmd)
    return acc
  }, {})

  return (
    <>
      <Link to="/topics" className="back">← Назад к темам</Link>

      <h1 style={{ margin: '1rem 0', color: '#e6edf3', fontSize: '2rem' }}>
        {topic.title}
      </h1>

      {/* ВКЛАДКИ */}
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

      {/* СОДЕРЖИМОЕ */}
      <div className="tab-content">

        {/* ─── ПЛАН ─── */}
        {active === 'plan' && (
          <section>
            <h2 className="tab-content-title">📋 План</h2>
            {topic.plan.length > 0 ? (
              <ul style={{ lineHeight: 1.9, paddingLeft: '1.25rem' }}>
                {topic.plan.map((item, i) => (
                  <li key={i} style={{ color: '#c9d1d9', marginBottom: '0.25rem' }}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#8b949e' }}>План пока не заполнен</p>
            )}
          </section>
        )}

        {/* ─── ТЕОРИЯ ─── */}
        {active === 'theory' && (
          <section>
            <h2 className="tab-content-title">📖 Теория</h2>
            {topic.theory ? (
              <div style={{
                whiteSpace: 'pre-wrap',
                lineHeight: 1.7,
                color: '#c9d1d9',
                background: '#161b22',
                padding: '1.25rem',
                borderRadius: 8,
                border: '1px solid #30363d',
              }}>
                {topic.theory}
              </div>
            ) : (
              <p style={{ color: '#8b949e' }}>Теория пока не заполнена</p>
            )}
          </section>
        )}

        {/* ─── КОМАНДЫ ─── */}
        {active === 'commands' && (
          <section>
            <h2 className="tab-content-title">⌨️ Команды</h2>
            {topic.commands.length > 0 ? (
              <div>
                {Object.entries(groupedCommands).map(([group, cmds]) => (
                  <div key={group} style={{ marginBottom: '2rem' }}>
                    {/* Заголовок группы */}
                    <h3 style={{
                      color: '#58a6ff',
                      fontSize: '1.1rem',
                      marginBottom: '0.75rem',
                      paddingBottom: '0.5rem',
                      borderBottom: '1px solid #30363d',
                    }}>
                      {group}
                    </h3>

                    {/* Таблица команд */}
                    <div style={{ overflowX: 'auto', borderRadius: 8, border: '1px solid #30363d' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#0d1117' }}>
                        <thead>
                          <tr style={{ background: '#161b22', borderBottom: '2px solid #30363d' }}>
                            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#58a6ff', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>Команда</th>
                            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#58a6ff', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>Определение</th>
                            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#58a6ff', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>Пример</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cmds.map((cmd, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #21262d' }}>
                              <td style={{ padding: '0.75rem 1rem', verticalAlign: 'top' }}>
                                <code style={{
                                  background: '#1f2937',
                                  padding: '0.2rem 0.5rem',
                                  borderRadius: 4,
                                  color: '#79c0ff',
                                  fontFamily: 'Consolas, Monaco, monospace',
                                  fontSize: '0.9rem',
                                  fontWeight: 600,
                                  whiteSpace: 'nowrap',
                                }}>
                                  {cmd.name}
                                </code>
                              </td>
                              <td style={{ padding: '0.75rem 1rem', color: '#c9d1d9', verticalAlign: 'top' }}>
                                {cmd.description}
                              </td>
                              <td style={{ padding: '0.75rem 1rem', verticalAlign: 'top' }}>
                                <code style={{
                                  background: '#1a1f2e',
                                  padding: '0.2rem 0.5rem',
                                  borderRadius: 4,
                                  color: '#a5d6ff',
                                  fontFamily: 'Consolas, Monaco, monospace',
                                  fontSize: '0.85rem',
                                }}>
                                  {cmd.example}
                                </code>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#8b949e' }}>Команды пока не заполнены</p>
            )}
          </section>
        )}
      </div>
    </>
  )
}
