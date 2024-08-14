import pymongo.errors
from fastapi import HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from app.schema.auth import Token
from app.dependencies.auth import authenticate_user, ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta
from app.dependencies.auth import create_access_token
from app.schema.user import UserModel, UserIn, UserOut
from app.dependencies.auth import get_password_hash
from app.db.dao.users import save_user, get_user_by_email


def handle_login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]) -> Token:
    print("The form data as values of", form_data.username, form_data.password)
    user: UserModel | None = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


def handle_register(user_info: UserIn) -> UserOut:
    hashed_password = get_password_hash(user_info.password)
    to_save = UserModel(**dict(user_info), hashed_password=hashed_password)
    try:
        save_user(to_save)
    except pymongo.errors.DuplicateKeyError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email address already taken.")

    saved_user = get_user_by_email(user_info.email)

    return UserOut(**dict(saved_user))

