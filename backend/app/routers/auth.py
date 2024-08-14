from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from app.handlers.auth import handle_login, handle_register
from app.schema.user import UserIn, UserOut
from app.schema.auth import Token


router = APIRouter(prefix="/auth")


@router.post("/token")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]) -> Token:
    print("the form_data", form_data)
    return handle_login(form_data)


@router.post("/register")
async def login(user_info: UserIn) -> UserOut:
    return handle_register(user_info)
