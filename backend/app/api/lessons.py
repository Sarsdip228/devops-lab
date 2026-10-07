from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.database import get_db

router = APIRouter(prefix="/api/lessons", tags=["lessons"])


@router.get("/", response_model=list[schemas.Lesson])
def list_lessons(topic_id: int = None, db: Session = Depends(get_db)):
    query = db.query(models.Lesson)
    if topic_id is not None:
        query = query.filter(models.Lesson.topic_id == topic_id)
    return query.order_by(models.Lesson.order).all()


@router.get("/{lesson_id}", response_model=schemas.Lesson)
def get_lesson(lesson_id: int, db: Session = Depends(get_db)):
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson


@router.post("/", response_model=schemas.Lesson, status_code=201)
def create_lesson(payload: schemas.LessonCreate, db: Session = Depends(get_db)):
    topic = db.query(models.Topic).filter(models.Topic.id == payload.topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    lesson = models.Lesson(**payload.model_dump())
    db.add(lesson)
    db.commit()
    db.refresh(lesson)
    return lesson
