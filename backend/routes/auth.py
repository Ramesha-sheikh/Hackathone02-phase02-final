from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
import bcrypt
from passlib.context import CryptContext
from pydantic import BaseModel

from models.user import User
from core.db import get_session
from services.auth_service import create_user_access_token

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

# Pydantic model to read JSON from frontend
class UserLogin(BaseModel):
    email: str
    password: str

def truncate_password(password: str) -> str:
    """
    Truncate password safely for bcrypt (max 72 bytes)
    """
    return password.encode("utf-8")[:72].decode("utf-8", errors="ignore")

@router.post("/signup")
def signup(user: UserLogin, session: Session = Depends(get_session)):
    existing_user = session.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    safe_password = truncate_password(user.password)
    hashed_password = pwd_context.hash(safe_password)

    new_user = User(email=user.email, hashed_password=hashed_password)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return {"id": str(new_user.id), "email": new_user.email}

@router.post("/signin")
def login(user: UserLogin, session: Session = Depends(get_session)):
    db_user = session.query(User).filter(User.email == user.email).first()
    if not db_user or not pwd_context.verify(truncate_password(user.password), db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_user_access_token(db_user)
    return {"access_token": access_token, "token_type": "bearer"}
