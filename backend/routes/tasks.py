from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
from uuid import UUID
from pydantic import BaseModel

from models.task import Task
from models.user import User
from core.db import get_session
from core.jwt_auth import verify_jwt_token

router = APIRouter()

# Pydantic model for task creation
class TaskCreate(BaseModel):
    title: str
    description: str | None = None

class TaskUpdate(BaseModel):
    status: str

@router.post("/", response_model=Task)
def create_task(task: TaskCreate, user_id: UUID = Depends(verify_jwt_token), session: Session = Depends(get_session)):
    new_task = Task(title=task.title, description=task.description, user_id=user_id)
    session.add(new_task)
    session.commit()
    session.refresh(new_task)
    return new_task

@router.get("/", response_model=List[Task])
def get_tasks(user_id: UUID = Depends(verify_jwt_token), session: Session = Depends(get_session)):
    tasks = session.exec(select(Task).where(Task.user_id == user_id)).all()
    return tasks

@router.get("/{task_id}", response_model=Task)
def get_task(task_id: int, user_id: UUID = Depends(verify_jwt_token), session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task or task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{task_id}", response_model=Task)
def update_task(task_id: int, task_update: TaskUpdate, user_id: UUID = Depends(verify_jwt_token), session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task or task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")
    task.status = task_update.status
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@router.delete("/{task_id}")
def delete_task(task_id: int, user_id: UUID = Depends(verify_jwt_token), session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task or task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")
    session.delete(task)
    session.commit()
    return {"detail": "Task deleted"}
