from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database import Base


class Topic(Base):
    __tablename__ = "topics"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    icon = Column(String(10), default="📘")
    difficulty = Column(String(20), default="beginner")

    lessons = relationship("Lesson", back_populates="topic", cascade="all, delete-orphan")
    commands = relationship("Command", back_populates="topic", cascade="all, delete-orphan")


class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    topic_id = Column(Integer, ForeignKey("topics.id"), nullable=False)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    order = Column(Integer, default=0)

    topic = relationship("Topic", back_populates="lessons")


class Command(Base):
    __tablename__ = "commands"

    id = Column(Integer, primary_key=True, index=True)
    topic_id = Column(Integer, ForeignKey("topics.id"), nullable=False)
    name = Column(String(200), nullable=False)
    syntax = Column(String(500), nullable=False)
    description = Column(Text, nullable=False)
    example = Column(Text, default="")

    topic = relationship("Topic", back_populates="commands")
