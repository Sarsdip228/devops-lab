from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/api/topics", tags=["topics"])


@router.get("/", response_model=List[schemas.Topic])
def list_topics(db: Session = Depends(get_db)):
    return db.query(models.Topic).all()


@router.get("/{topic_id}", response_model=schemas.TopicDetail)
def get_topic(topic_id: int, db: Session = Depends(get_db)):
    topic = db.query(models.Topic).filter(models.Topic.id == topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    return topic


@router.post("/", response_model=schemas.Topic, status_code=201)
def create_topic(payload: schemas.TopicCreate, db: Session = Depends(get_db)):
    topic = models.Topic(**payload.model_dump())
    db.add(topic)
    db.commit()
    db.refresh(topic)
    return topic
