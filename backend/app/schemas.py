from pydantic import BaseModel


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
    lessons: list[Lesson] = []
    commands: list[Command] = []




# ═══════════════════════════════════════════
#  AUTH
# ═══════════════════════════════════════════
from datetime import datetime
from pydantic import BaseModel, Field


class UserRegister(BaseModel):
    username: str = Field(min_length=3, max_length=50, pattern=r"^[a-zA-Z0-9_-]+$")
    password: str = Field(min_length=6, max_length=100)


class UserPublic(BaseModel):
    id: int
    username: str
    is_admin: bool
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserPublic
