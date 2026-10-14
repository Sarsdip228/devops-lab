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
  13: {   // ← ПОМЕНЯЙ на фактический id из URL
    title: 'Сеть',
    plan: [
      'Что такое сеть и зачем она нужна',
      'Модель OSI — 7 уровней (обзор)',
      'TCP/IP — 4 уровня (практика)',
      'IP-адреса и маски подсетей',
      'DNS — как домены превращаются в IP',
      'Порты и протоколы (TCP vs UDP)',
      'Как ходит пакет — пошагово',
      'Диагностика: ping, traceroute, mtr',
      'HTTP-запросы: curl, wget',
      'SSH и удалённое управление',
      'Firewall: iptables, ufw',
      'Анализ трафика: tcpdump, ss',
    ],
    theory: `Сеть — это способ передать данные от одного устройства к другому.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 МОДЕЛЬ OSI — 7 уровней
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

7. Application  — HTTP, DNS, SSH (что видит пользователь)
6. Presentation — шифрование, сжатие (TLS)
5. Session      — сессии между приложениями
4. Transport    — TCP, UDP (порты, надёжность)
3. Network      — IP, маршрутизация (адреса)
2. Data Link    — Ethernet, MAC-адреса (локальная сеть)
1. Physical     — кабели, Wi-Fi (биты)

На практике используют TCP/IP — 4 уровня:
• Application    (HTTP, DNS, SSH)
• Transport      (TCP, UDP)
• Internet       (IP)
• Network Access (Ethernet, Wi-Fi)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 ЧТО ТАКОЕ ПАКЕТ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Данные разбиваются на пакеты. Каждый содержит:
• Заголовок (header) — откуда, куда, какой протокол
• Данные (payload) — кусок информации

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 КАК ХОДИТ ПАКЕТ (пример: открываешь сайт)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Вводишь google.com в браузере

2. DNS-запрос: браузер спрашивает DNS-сервер
   "Какой IP у google.com?"
   DNS отвечает: 142.250.185.78

3. TCP-соединение (3-way handshake):
   Ты → SYN → Google
   Ты ← SYN-ACK ← Google
   Ты → ACK → Google
   Соединение установлено.

4. HTTP-запрос:
   GET / HTTP/1.1
   Host: google.com

5. Пакет идёт по сети:
   • Компьютер → роутер (по MAC)
   • Роутер → провайдер (по IP)
   • Провайдер → маршрутизаторы
   • ... → сервер Google

6. Google отвечает:
   HTTP/1.1 200 OK
   <html>...</html>

7. Браузер рендерит страницу.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔑 КЛЮЧЕВЫЕ ПОНЯТИЯ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IP-адрес  — уникальный адрес устройства (192.168.1.1)
Маска     — где network, где host (255.255.255.0)
Порт      — «дверь» сервиса (80 HTTP, 443 HTTPS, 22 SSH)
DNS       — домен → IP (телефонная книга интернета)
TCP       — надёжный протокол (проверяет доставку)
UDP       — быстрый, без проверки (видео, игры)
MAC-адрес — физический адрес сетевой карты
Router    — устройство, соединяющее сети
Firewall  — фильтр трафика (что пропускать)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 ЗАЧЕМ ЭТО В DEVOPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Диагностика: "почему сервис не отвечает?" → ping, curl, ss
• Firewall: "какие порты открыть?" → ufw, iptables
• Балансировка: "как распределить трафик?" → Nginx
• Мониторинг: "доступен ли сервер?" → ping, mtr
• Отладка API: "что вернул сервер?" → curl -v`,
    commands: [
      // ─── 🌐 Базовое ───
      { group: '🌐 Базовое', name: 'ping',        syntax: 'ping <хост>',        description: 'Проверить доступность узла', example: 'ping 8.8.8.8' },
      { group: '🌐 Базовое', name: 'ping -c 4',   syntax: 'ping -c 4 <хост>',   description: '4 пакета и стоп',            example: 'ping -c 4 google.com' },
      { group: '🌐 Базовое', name: 'ip a',        syntax: 'ip a',               description: 'IP-адреса интерфейсов',      example: 'ip a' },
      { group: '🌐 Базовое', name: 'ip link',     syntax: 'ip link show',       description: 'Сетевые интерфейсы (L2)',    example: 'ip link show' },
      { group: '🌐 Базовое', name: 'hostname -I', syntax: 'hostname -I',        description: 'IP-адреса машины',           example: 'hostname -I' },

      // ─── 🌐 DNS ───
      { group: '🌐 DNS', name: 'nslookup',              syntax: 'nslookup <домен>',        description: 'DNS-запрос',              example: 'nslookup google.com' },
      { group: '🌐 DNS', name: 'dig',                   syntax: 'dig <домен>',             description: 'DNS-запрос (подробно)',   example: 'dig google.com' },
      { group: '🌐 DNS', name: 'dig +short',            syntax: 'dig +short <домен>',      description: 'Только IP',               example: 'dig +short google.com' },
      { group: '🌐 DNS', name: 'dig MX',                syntax: 'dig MX <домен>',          description: 'MX-записи (почта)',       example: 'dig MX google.com' },
      { group: '🌐 DNS', name: 'host',                  syntax: 'host <домен>',            description: 'DNS-запрос (кратко)',     example: 'host google.com' },
      { group: '🌐 DNS', name: 'cat /etc/resolv.conf',  syntax: 'cat /etc/resolv.conf',    description: 'DNS-серверы системы',     example: 'cat /etc/resolv.conf' },

      // ─── 🌐 Порты и диагностика ───
      { group: '🌐 Порты и диагностика', name: 'ss -tulnp', syntax: 'ss -tulnp',              description: 'Открытые порты',            example: 'ss -tulnp' },
      { group: '🌐 Порты и диагностика', name: 'ss -tuln',  syntax: 'ss -tuln',               description: 'Без процессов',             example: 'ss -tuln' },
      { group: '🌐 Порты и диагностика', name: 'ss -tan',   syntax: 'ss -tan',                description: 'Все TCP-соединения',        example: 'ss -tan' },
      { group: '🌐 Порты и диагностика', name: 'nc -zv',    syntax: 'nc -zv <хост> <порт>',   description: 'Проверить порт (netcat)',   example: 'nc -zv google.com 443' },
      { group: '🌐 Порты и диагностика', name: 'nc -l',     syntax: 'nc -l <порт>',           description: 'Слушать порт',              example: 'nc -l 8080' },
      { group: '🌐 Порты и диагностика', name: 'traceroute',syntax: 'traceroute <хост>',      description: 'Путь пакетов',              example: 'traceroute google.com' },
      { group: '🌐 Порты и диагностика', name: 'mtr',       syntax: 'mtr <хост>',             description: 'traceroute + ping live',    example: 'mtr google.com' },

      // ─── 🌐 HTTP и API ───
      { group: '🌐 HTTP и API', name: 'curl',         syntax: 'curl <URL>',                     description: 'HTTP-запрос',         example: 'curl https://api.example.com' },
      { group: '🌐 HTTP и API', name: 'curl -I',      syntax: 'curl -I <URL>',                  description: 'Только заголовки',    example: 'curl -I https://google.com' },
      { group: '🌐 HTTP и API', name: 'curl -v',      syntax: 'curl -v <URL>',                  description: 'Подробно (отладка)',  example: 'curl -v https://google.com' },
      { group: '🌐 HTTP и API', name: 'curl -X POST', syntax: 'curl -X POST -d <данные> <URL>', description: 'POST-запрос',         example: 'curl -X POST -d \'{"k":"v"}\' https://api.example.com' },
      { group: '🌐 HTTP и API', name: 'curl -H',      syntax: 'curl -H "<Header>" <URL>',       description: 'С заголовком',        example: 'curl -H "Authorization: Bearer xxx" https://api.example.com' },
      { group: '🌐 HTTP и API', name: 'curl -o',      syntax: 'curl -o <файл> <URL>',           description: 'Сохранить в файл',    example: 'curl -o file.zip https://example.com/file.zip' },
      { group: '🌐 HTTP и API', name: 'wget',         syntax: 'wget <URL>',                     description: 'Скачать файл',        example: 'wget https://example.com/file.zip' },

      // ─── 🌐 SSH и файлы ───
      { group: '🌐 SSH и файлы', name: 'ssh',        syntax: 'ssh <user>@<хост>',              description: 'Подключиться по SSH',   example: 'ssh user@192.168.1.10' },
      { group: '🌐 SSH и файлы', name: 'ssh -p',     syntax: 'ssh -p <порт> <user>@<хост>',    description: 'SSH на другом порту',   example: 'ssh -p 2222 user@host' },
      { group: '🌐 SSH и файлы', name: 'ssh -i',     syntax: 'ssh -i <ключ> <user>@<хост>',    description: 'С указанием ключа',     example: 'ssh -i ~/.ssh/key user@host' },
      { group: '🌐 SSH и файлы', name: 'scp',        syntax: 'scp <файл> <user>@<хост>:<путь>', description: 'Копировать по SSH',    example: 'scp file.txt user@host:/tmp/' },
      { group: '🌐 SSH и файлы', name: 'scp -r',     syntax: 'scp -r <папка> <user>@<хост>:<путь>', description: 'Копировать папку',  example: 'scp -r folder/ user@host:/tmp/' },
      { group: '🌐 SSH и файлы', name: 'ssh-keygen', syntax: 'ssh-keygen -t ed25519',          description: 'Создать SSH-ключ',      example: 'ssh-keygen -t ed25519' },

      // ─── 🌐 Firewall ───
      { group: '🌐 Firewall', name: 'iptables -L', syntax: 'sudo iptables -L',      description: 'Правила firewall',   example: 'sudo iptables -L' },
      { group: '🌐 Firewall', name: 'iptables -A', syntax: 'sudo iptables -A INPUT -p tcp --dport <порт> -j ACCEPT', description: 'Добавить правило', example: 'sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT' },
      { group: '🌐 Firewall', name: 'ufw status',  syntax: 'sudo ufw status',       description: 'Статус UFW',         example: 'sudo ufw status' },
      { group: '🌐 Firewall', name: 'ufw allow',   syntax: 'sudo ufw allow <порт>', description: 'Открыть порт',       example: 'sudo ufw allow 22' },
      { group: '🌐 Firewall', name: 'ufw deny',    syntax: 'sudo ufw deny <порт>',  description: 'Закрыть порт',       example: 'sudo ufw deny 3306' },
      { group: '🌐 Firewall', name: 'ufw enable',  syntax: 'sudo ufw enable',       description: 'Включить UFW',       example: 'sudo ufw enable' },

      // ─── 🌐 Анализ трафика ───
      { group: '🌐 Анализ трафика', name: 'tcpdump',      syntax: 'sudo tcpdump -i <интерфейс>', description: 'Захват пакетов',    example: 'sudo tcpdump -i eth0' },
      { group: '🌐 Анализ трафика', name: 'tcpdump port', syntax: 'sudo tcpdump port <порт>',    description: 'Захват по порту',   example: 'sudo tcpdump port 80' },
      { group: '🌐 Анализ трафика', name: 'tcpdump -w',   syntax: 'sudo tcpdump -w <файл>',      description: 'Записать в файл',   example: 'sudo tcpdump -w capture.pcap' },
      { group: '🌐 Анализ трафика', name: 'arp -a',       syntax: 'arp -a',                      description: 'ARP-таблица',       example: 'arp -a' },
      { group: '🌐 Анализ трафика', name: 'nmap',         syntax: 'nmap -p <порты> <хост>',      description: 'Сканирование портов', example: 'nmap -p 1-1000 192.168.1.1' },

      // ─── 🌐 Маршрутизация ───
      { group: '🌐 Маршрутизация', name: 'ip route',      syntax: 'ip route',                       description: 'Таблица маршрутов',    example: 'ip route' },
      { group: '🌐 Маршрутизация', name: 'ip route add',  syntax: 'sudo ip route add <сеть> via <шлюз>', description: 'Добавить маршрут', example: 'sudo ip route add 10.0.0.0/24 via 192.168.1.1' },
      { group: '🌐 Маршрутизация', name: 'ip route del',  syntax: 'sudo ip route del <сеть>',       description: 'Удалить маршрут',      example: 'sudo ip route del 10.0.0.0/24' },
      { group: '🌐 Маршрутизация', name: 'traceroute -n', syntax: 'traceroute -n <хост>',           description: 'Без DNS-имён',         example: 'traceroute -n google.com' },

      // ─── 🌐 Конфигурация ───
      { group: '🌐 Конфигурация', name: 'ip addr add',      syntax: 'sudo ip addr add <IP>/<маска> dev <интерфейс>', description: 'Добавить IP',         example: 'sudo ip addr add 192.168.1.100/24 dev eth0' },
      { group: '🌐 Конфигурация', name: 'ip addr del',      syntax: 'sudo ip addr del <IP>/<маска> dev <интерфейс>', description: 'Удалить IP',          example: 'sudo ip addr del 192.168.1.100/24 dev eth0' },
      { group: '🌐 Конфигурация', name: 'ip link set up',   syntax: 'sudo ip link set <интерфейс> up',   description: 'Включить интерфейс',    example: 'sudo ip link set eth0 up' },
      { group: '🌐 Конфигурация', name: 'ip link set down', syntax: 'sudo ip link set <интерфейс> down', description: 'Выключить интерфейс',   example: 'sudo ip link set eth0 down' },
      { group: '🌐 Конфигурация', name: 'hostnamectl',      syntax: 'hostnamectl',                       description: 'Инфо о хосте',          example: 'hostnamectl' },

      // ─── 🌐 Мониторинг сети ───
      { group: '🌐 Мониторинг сети', name: 'watch -n 1 ss -s', syntax: 'watch -n 1 ss -s',   description: 'Мониторинг соединений',       example: 'watch -n 1 ss -s' },
      { group: '🌐 Мониторинг сети', name: 'ip -s link',       syntax: 'ip -s link',         description: 'Статистика интерфейсов',      example: 'ip -s link' },
      { group: '🌐 Мониторинг сети', name: 'ss -s',            syntax: 'ss -s',              description: 'Сводка по сокетам',           example: 'ss -s' },
      { group: '🌐 Мониторинг сети', name: 'nload',            syntax: 'nload',              description: 'Загрузка сети в реальном времени', example: 'nload' },
    ],
  },
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
