from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.api import topics, lessons, commands

Base.metadata.create_all(bind=engine)

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
