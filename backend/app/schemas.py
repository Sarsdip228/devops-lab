from pydantic import BaseModel
from typing import List


class LessonBase(BaseModel):
    title: str
    content: str
    order: int = 0


class LessonCreate(LessonBase):
    topic_id: int


class Lesson(LessonBase):
    id: int
    topic_id: int

    class Config:
        from_attributes = True


class CommandBase(BaseModel):
    name: str
    syntax: str
    description: str
    example: str = ""


class CommandCreate(CommandBase):
    topic_id: int


class Command(CommandBase):
    id: int
    topic_id: int

    class Config:
        from_attributes = True


class TopicBase(BaseModel):
    title: str
    description: str
    icon: str = "📘"
    difficulty: str = "beginner"


class TopicCreate(TopicBase):
    pass


class Topic(TopicBase):
    id: int

    class Config:
        from_attributes = True


class TopicDetail(Topic):
    lessons: List[Lesson] = []
    commands: List[Command] = []
