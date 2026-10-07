from app.database import SessionLocal, engine, Base
from app import models

Base.metadata.create_all(bind=engine)
db = SessionLocal()

if db.query(models.Topic).count() > 0:
    print("Данные уже есть, выходим.")
    db.close()
    exit()

linux = models.Topic(
    title="Linux",
    description="Основы работы с Linux: файловая система, права, процессы, пакеты.",
    icon="🐧",
    difficulty="beginner",
)
docker = models.Topic(
    title="Docker",
    description="Контейнеризация приложений: образы, контейнеры, volumes, networks.",
    icon="🐳",
    difficulty="intermediate",
)
git = models.Topic(
    title="Git",
    description="Система контроля версий: коммиты, ветки, слияния, remote.",
    icon="🌿",
    difficulty="beginner",
)
ci_cd = models.Topic(
    title="CI/CD",
    description="Непрерывная интеграция и доставка: GitHub Actions, пайплайны.",
    icon="⚙️",
    difficulty="advanced",
)
python = models.Topic(
    title="Python",
    description="Язык для автоматизации, скриптов, работы с API и инфраструктурой.",
    icon="🐍",
    difficulty="beginner",
)
postgres = models.Topic(
    title="PostgreSQL",
    description="Реляционная база данных: SQL, индексы, транзакции, бэкапы.",
    icon="🐘",
    difficulty="intermediate",
)
nginx = models.Topic(
    title="Nginx",
    description="Веб-сервер и reverse proxy: конфиги, балансировка, TLS.",
    icon="🌐",
    difficulty="intermediate",
)
monitoring = models.Topic(
    title="Мониторинг",
    description="Prometheus, Grafana, Zabbix: метрики, дашборды, алерты.",
    icon="📊",
    difficulty="advanced",
)
cloud = models.Topic(
    title="Облака",
    description="AWS, GCP, Render, VPS: виртуалки, сети, хранилища, деплой.",
    icon="☁️",
    difficulty="intermediate",
)
kubernetes = models.Topic(
    title="Kubernetes",
    description="Оркестрация контейнеров: pods, services, deployments, ingress.",
    icon="☸️",
    difficulty="advanced",
)
security = models.Topic(
    title="Безопасность",
    description="SSH, TLS, secrets management, принцип минимальных привилегий.",
    icon="🔐",
    difficulty="intermediate",
)
bash = models.Topic(
    title="Bash",
    description="Скрипты командной строки: переменные, циклы, пайпы, автоматизация.",
    icon="📜",
    difficulty="beginner",
)

db.add_all([
    linux, docker, git, ci_cd,
    python, postgres, nginx, monitoring,
    cloud, kubernetes, security, bash,
])
db.commit()

# --- Уроки ---
db.add_all([
    models.Lesson(topic_id=linux.id, title="Навигация по файловой системе",
                  content="Основные команды: pwd, ls, cd. Абсолютный путь начинается с /. Относительный — от текущей папки. Спецсимволы: . — текущая, .. — родительская, ~ — домашняя.",
                  order=1),
    models.Lesson(topic_id=linux.id, title="Права доступа",
                  content="chmod 755 file — rwxr-xr-x. chown user:group file меняет владельца. Числа: 4=read, 2=write, 1=execute.",
                  order=2),
    models.Lesson(topic_id=linux.id, title="Процессы",
                  content="ps aux — список процессов. top/htop — монитор. kill -9 PID — жёсткое завершение. systemctl status service — состояние службы.",
                  order=3),
    models.Lesson(topic_id=docker.id, title="Что такое контейнер",
                  content="Контейнер — изолированный процесс, использующий ядро хоста. В отличие от ВМ, не требует отдельной ОС. Образ — шаблон, контейнер — запущенный экземпляр.",
                  order=1),
    models.Lesson(topic_id=docker.id, title="Dockerfile",
                  content="FROM (базовый образ), RUN (команда при сборке), COPY (копировать файлы), CMD (команда при запуске), EXPOSE (порт), ENV (переменная окружения).",
                  order=2),
    models.Lesson(topic_id=git.id, title="Основы Git",
                  content="git init — создать репозиторий. git add — добавить в индекс. git commit -m 'msg' — зафиксировать. git log — история. git status — состояние.",
                  order=1),
    models.Lesson(topic_id=git.id, title="Ветки",
                  content="git branch — список веток. git checkout -b new-branch — создать и переключиться. git merge — слить. git rebase — перебазировать.",
                  order=2),
    models.Lesson(topic_id=ci_cd.id, title="Что такое CI/CD",
                  content="CI (Continuous Integration) — автосборка и тесты при каждом коммите. CD (Continuous Delivery/Deployment) — автодоставка на прод. Инструменты: GitHub Actions, GitLab CI, Jenkins.",
                  order=1),
    models.Lesson(topic_id=python.id, title="Виртуальные окружения",
                  content="python -m venv .venv — создать окружение. source .venv/bin/activate (Linux) или .venv\\Scripts\\activate (Windows) — активировать. pip install -r requirements.txt — установить зависимости.",
                  order=1),
    models.Lesson(topic_id=postgres.id, title="Основы SQL",
                  content="SELECT * FROM table; INSERT INTO table VALUES (...); UPDATE table SET col=val WHERE id=1; DELETE FROM table WHERE id=1;",
                  order=1),
    models.Lesson(topic_id=nginx.id, title="Что такое reverse proxy",
                  content="Nginx принимает запросы на порт 80/443 и проксирует их на внутренние сервисы. Позволяет балансировать нагрузку, терминировать TLS, отдавать статику.",
                  order=1),
    models.Lesson(topic_id=monitoring.id, title="Метрики и алерты",
                  content="Prometheus собирает метрики с /metrics. Grafana визуализирует. Alertmanager шлёт уведомления при срабатывании правил.",
                  order=1),
    models.Lesson(topic_id=cloud.id, title="Виды облачных сервисов",
                  content="IaaS (VPS, EC2), PaaS (Render, Heroku), SaaS (Gmail, Slack). Serverless (Lambda, Cloud Functions).",
                  order=1),
    models.Lesson(topic_id=kubernetes.id, title="Pods и Deployments",
                  content="Pod — минимальная единица, один или несколько контейнеров. Deployment — декларативное описание, сколько реплик пода держать.",
                  order=1),
    models.Lesson(topic_id=security.id, title="SSH-ключи",
                  content="ssh-keygen -t ed25519 создаёт пару ключей. Публичный (~/.ssh/id_ed25519.pub) добавляется на сервер в ~/.ssh/authorized_keys.",
                  order=1),
    models.Lesson(topic_id=bash.id, title="Переменные и циклы",
                  content="VAR=value — присвоить. echo $VAR — вывести. for i in 1 2 3; do echo $i; done — цикл. if [ -f file ]; then ...; fi — условие.",
                  order=1),
])

# --- Команды ---
db.add_all([
    models.Command(topic_id=linux.id, name="ls", syntax="ls [опции] [путь]",
                   description="Список файлов и папок.", example="ls -lah /var/log"),
    models.Command(topic_id=linux.id, name="cd", syntax="cd [путь]",
                   description="Сменить директорию.", example="cd /etc/nginx"),
    models.Command(topic_id=linux.id, name="chmod", syntax="chmod [права] файл",
                   description="Изменить права доступа.", example="chmod 755 script.sh"),
    models.Command(topic_id=linux.id, name="grep", syntax="grep [опции] шаблон файл",
                   description="Поиск строк по шаблону.", example="grep -rn 'error' /var/log/"),
    models.Command(topic_id=linux.id, name="ps", syntax="ps aux",
                   description="Список всех процессов.", example="ps aux | grep nginx"),
    models.Command(topic_id=linux.id, name="systemctl", syntax="systemctl [действие] служба",
                   description="Управление systemd-службами.", example="systemctl restart nginx"),
    models.Command(topic_id=docker.id, name="docker build", syntax="docker build -t имя:тег .",
                   description="Собрать образ из Dockerfile.", example="docker build -t myapp:1.0 ."),
    models.Command(topic_id=docker.id, name="docker run", syntax="docker run [опции] образ",
                   description="Запустить контейнер.", example="docker run -d -p 8080:80 nginx"),
    models.Command(topic_id=docker.id, name="docker ps", syntax="docker ps [-a]",
                   description="Список запущенных (или всех) контейнеров.", example="docker ps -a"),
    models.Command(topic_id=docker.id, name="docker exec", syntax="docker exec -it контейнер команда",
                   description="Выполнить команду внутри контейнера.", example="docker exec -it myapp bash"),
    models.Command(topic_id=docker.id, name="docker logs", syntax="docker logs [опции] контейнер",
                   description="Логи контейнера.", example="docker logs -f myapp"),
    models.Command(topic_id=git.id, name="git init", syntax="git init",
                   description="Инициализировать репозиторий.", example="git init"),
    models.Command(topic_id=git.id, name="git clone", syntax="git clone URL",
                   description="Клонировать удалённый репозиторий.", example="git clone https://github.com/user/repo.git"),
    models.Command(topic_id=git.id, name="git commit", syntax="git commit -m 'сообщение'",
                   description="Зафиксировать изменения.", example="git commit -m 'add feature'"),
    models.Command(topic_id=git.id, name="git push", syntax="git push origin ветка",
                   description="Отправить изменения на удалённый репозиторий.", example="git push origin main"),
    models.Command(topic_id=git.id, name="git pull", syntax="git pull origin ветка",
                   description="Забрать изменения с удалённого репозитория.", example="git pull origin main"),
    models.Command(topic_id=ci_cd.id, name="gh workflow run", syntax="gh workflow run имя.yml",
                   description="Запустить GitHub Actions workflow вручную.", example="gh workflow run ci.yml"),
    models.Command(topic_id=ci_cd.id, name="gh run list", syntax="gh run list",
                   description="Список последних запусков workflow.", example="gh run list --limit 10"),
    models.Command(topic_id=python.id, name="python -m venv", syntax="python -m venv .venv",
                   description="Создать виртуальное окружение.", example="python -m venv .venv"),
    models.Command(topic_id=python.id, name="pip install", syntax="pip install -r requirements.txt",
                   description="Установить зависимости из файла.", example="pip install -r requirements.txt"),
    models.Command(topic_id=postgres.id, name="psql", syntax="psql -U user -d dbname",
                   description="Подключиться к базе.", example="psql -U postgres -d mydb"),
    models.Command(topic_id=postgres.id, name="pg_dump", syntax="pg_dump -U user dbname > dump.sql",
                   description="Сделать дамп базы.", example="pg_dump -U postgres mydb > backup.sql"),
    models.Command(topic_id=nginx.id, name="nginx -t", syntax="nginx -t",
                   description="Проверить конфиг на ошибки.", example="nginx -t"),
    models.Command(topic_id=nginx.id, name="nginx -s reload", syntax="nginx -s reload",
                   description="Перезагрузить конфиг без остановки.", example="nginx -s reload"),
    models.Command(topic_id=monitoring.id, name="promtool check", syntax="promtool check config prometheus.yml",
                   description="Проверить конфиг Prometheus.", example="promtool check config prometheus.yml"),
    models.Command(topic_id=cloud.id, name="ssh", syntax="ssh user@host",
                   description="Подключиться к удалённому серверу.", example="ssh root@192.168.1.1"),
    models.Command(topic_id=cloud.id, name="scp", syntax="scp file user@host:/path",
                   description="Скопировать файл на удалённый сервер.", example="scp app.py root@server:/opt/"),
    models.Command(topic_id=kubernetes.id, name="kubectl get", syntax="kubectl get pods",
                   description="Список подов.", example="kubectl get pods -n default"),
    models.Command(topic_id=kubernetes.id, name="kubectl apply", syntax="kubectl apply -f file.yaml",
                   description="Применить манифест.", example="kubectl apply -f deployment.yaml"),
    models.Command(topic_id=security.id, name="ssh-keygen", syntax="ssh-keygen -t ed25519",
                   description="Сгенерировать SSH-ключ.", example="ssh-keygen -t ed25519 -C 'me@example.com'"),
    models.Command(topic_id=security.id, name="openssl", syntax="openssl req -x509 -newkey rsa:4096 ...",
                   description="Сгенерировать самоподписанный сертификат.", example="openssl req -x509 -newkey rsa:4096 -days 365 -nodes -keyout key.pem -out cert.pem"),
    models.Command(topic_id=bash.id, name="chmod +x", syntax="chmod +x script.sh",
                   description="Сделать скрипт исполняемым.", example="chmod +x deploy.sh"),
    models.Command(topic_id=bash.id, name="bash", syntax="bash script.sh",
                   description="Запустить скрипт.", example="bash deploy.sh"),
])

db.commit()
db.close()
print("✅ База наполнена 12 темами, уроками и командами.")
