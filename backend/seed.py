from app import models


def seed_data(db):
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

    db.add_all(
        [
            linux,
            docker,
            git,
            ci_cd,
            python,
            postgres,
            nginx,
            monitoring,
            cloud,
            kubernetes,
            security,
            bash,
        ]
    )
    db.commit()

    db.add_all(
        [
            models.Lesson(
                topic_id=linux.id,
                title="Навигация по файловой системе",
                content="pwd, ls, cd. Абсолютный путь начинается с /. Относительный — от текущей. . — текущая, .. — родительская, ~ — домашняя.",
                order=1,
            ),
            models.Lesson(
                topic_id=linux.id,
                title="Права доступа",
                content="chmod 755 file. chown user:group. 4=read, 2=write, 1=execute.",
                order=2,
            ),
            models.Lesson(
                topic_id=docker.id,
                title="Контейнер и образ",
                content="Контейнер — изолированный процесс на ядре хоста. Образ — шаблон, контейнер — запущенный экземпляр.",
                order=1,
            ),
            models.Lesson(
                topic_id=git.id,
                title="Основы Git",
                content="git init, add, commit, log, status.",
                order=1,
            ),
            models.Lesson(
                topic_id=ci_cd.id,
                title="Что такое CI/CD",
                content="CI — автосборка и тесты при коммите. CD — автодоставка на прод.",
                order=1,
            ),
        ]
    )

    db.add_all(
        [
            models.Command(
                topic_id=linux.id,
                name="ls",
                syntax="ls -la",
                description="Список файлов.",
                example="ls -lah /var/log",
            ),
            models.Command(
                topic_id=linux.id,
                name="cd",
                syntax="cd [путь]",
                description="Сменить директорию.",
                example="cd /etc/nginx",
            ),
            models.Command(
                topic_id=docker.id,
                name="docker run",
                syntax="docker run [опции] образ",
                description="Запустить контейнер.",
                example="docker run -d -p 8080:80 nginx",
            ),
            models.Command(
                topic_id=git.id,
                name="git commit",
                syntax="git commit -m 'msg'",
                description="Зафиксировать изменения.",
                example="git commit -m 'init'",
            ),
            models.Command(
                topic_id=ci_cd.id,
                name="gh workflow run",
                syntax="gh workflow run ci.yml",
                description="Запустить workflow.",
                example="gh workflow run ci.yml",
            ),
        ]
    )

    db.commit()
