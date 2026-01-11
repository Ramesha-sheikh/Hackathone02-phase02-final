import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), "backend"))

from core.db import engine
from models.user import User
from models.task import Task
from sqlmodel import Session
import uuid

def create_test_task():
    with Session(engine) as session:
        # Find the test user we created
        user = session.query(User).filter(User.email == "test@example.com").first()
        if not user:
            print("Test user not found. Please create a user first.")
            return
        
        # Create a test task
        task = Task(
            title="Test Task",
            description="This is a test task created via script",
            status="pending",
            user_id=user.id  # Associate with the test user
        )
        session.add(task)
        session.commit()
        session.refresh(task)
        print(f"Test task created with ID: {task.id}")

if __name__ == "__main__":
    create_test_task()