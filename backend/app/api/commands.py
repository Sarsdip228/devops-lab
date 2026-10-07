from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/api/commands", tags=["commands"])


@router.get("/", response_model=List[schemas.Command])
def list_commands(topic_id: int = None, search: str = None, db: Session = Depends(get_db)):
    query = db.query(models.Command)
    if topic_id is not None:
        query = query.filter(models.Command.topic_id == topic_id)
    if search:
        query = query.filter(models.Command.name.ilike(f"%{search}%"))
    return query.all()


@router.get("/{command_id}", response_model=schemas.Command)
def get_command(command_id: int, db: Session = Depends(get_db)):
    cmd = db.query(models.Command).filter(models.Command.id == command_id).first()
    if not cmd:
        raise HTTPException(status_code=404, detail="Command not found")
    return cmd


@router.post("/", response_model=schemas.Command, status_code=201)
def create_command(payload: schemas.CommandCreate, db: Session = Depends(get_db)):
    topic = db.query(models.Topic).filter(models.Topic.id == payload.topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    cmd = models.Command(**payload.model_dump())
    db.add(cmd)
    db.commit()
    db.refresh(cmd)
    return cmd
