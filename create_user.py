import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), "backend"))

from core.db import engine
from models.user import User
from models.task import Task  # Import Task to resolve relationship
from services.user_service import get_password_hash
from sqlmodel import Session

def create_test_user():
    with Session(engine) as session:
        # Check if user already exists
        existing_user = session.query(User).filter(User.email == "test@example.com").first()
        if existing_user:
            print("Test user already exists")
            return

        # Create a test user
        hashed_password = get_password_hash("password123")
        user = User(email="test@example.com", hashed_password=hashed_password)
        session.add(user)
        session.commit()
        session.refresh(user)
        print(f"Test user created with ID: {user.id}")

if __name__ == "__main__":
    create_test_user()