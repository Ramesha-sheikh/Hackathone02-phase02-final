import uuid
from typing import Optional
from sqlmodel import SQLModel, Field, Relationship

class Task(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    description: str | None = Field(default=None)
    status: str = Field(default="pending")

    user_id: uuid.UUID = Field(foreign_key="user.id")
    owner: Optional["User"] = Relationship(back_populates="tasks")  # noqa: F821
