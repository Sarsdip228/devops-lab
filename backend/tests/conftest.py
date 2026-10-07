"""
Общие фикстуры для всех тестов.
"""
import os
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from fastapi.testclient import TestClient

# Указываем SQLite in-memory ДО импорта app
os.environ["DATABASE_URL"] = "sqlite:///:memory:"

from app.database import Base, get_db  # noqa: E402
from app.main import app  # noqa: E402
from app import models  # noqa: E402


# Отдельный engine для тестов — in-memory SQLite
engine = create_engine(
    "sqlite:///:memory:",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function")
def db_session():
    """Создаёт чистую БД на каждый тест."""
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db_session):
    """HTTP-клиент с подменённой БД."""
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture
def sample_topic(db_session):
    """Создаёт одну тему с уроком и командой для тестов."""
    topic = models.Topic(
        title="Test Topic",
        description="Test description",
        icon="🧪",
        difficulty="beginner",
    )
    db_session.add(topic)
    db_session.commit()
    db_session.refresh(topic)

    lesson = models.Lesson(
        topic_id=topic.id,
        title="Test Lesson",
        content="Test content",
        order=1,
    )
    command = models.Command(
        topic_id=topic.id,
        name="test-cmd",
        syntax="test-cmd --arg",
        description="Test command",
        example="test-cmd --arg value",
    )
    db_session.add_all([lesson, command])
    db_session.commit()
    return topic
