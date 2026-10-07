from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models
from app.api import commands, lessons, topics
from app.database import Base, SessionLocal, engine

Base.metadata.create_all(bind=engine)


def auto_seed():
    """Наполняет БД начальными данными, если она пустая."""
    db = SessionLocal()
    try:
        if db.query(models.Topic).count() == 0:
            from seed import seed_data

            seed_data(db)
            print("✅ База наполнена начальными данными")
        else:
            print(f"ℹ️  В базе уже {db.query(models.Topic).count()} тем")
    except Exception as e:
        print(f"⚠️  Ошибка автосеялки: {e}")
    finally:
        db.close()


auto_seed()

app = FastAPI(
    title="DevOps Lab API",
    description="База знаний по DevOps: топики, уроки, команды",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(topics.router)
app.include_router(lessons.router)
app.include_router(commands.router)


@app.get("/")
def root():
    return {"message": "DevOps Lab API 🚀", "docs": "/docs"}


@app.get("/api/health")
def health():
    return {"status": "ok"}
