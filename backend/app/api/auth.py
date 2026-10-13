from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app import auth, models, schemas
from app.database import get_db

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=schemas.Token, status_code=201)
def register(payload: schemas.UserRegister, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.username == payload.username).first():
        raise HTTPException(400, "Этот username уже занят")

    user = models.User(
        username=payload.username,
        hashed_password=auth.hash_password(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = auth.create_access_token(user.id)
    return schemas.Token(access_token=token, user=user)


@router.post("/login", response_model=schemas.Token)
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == form.username).first()
    if not user or not auth.verify_password(form.password, user.hashed_password):
        raise HTTPException(401, "Неверный username или пароль")

    token = auth.create_access_token(user.id)
    return schemas.Token(access_token=token, user=user)


@router.get("/me", response_model=schemas.UserPublic)
def me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user
