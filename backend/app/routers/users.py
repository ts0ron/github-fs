from fastapi import APIRouter, Depends, Path, Body
from typing import Annotated
from app.handlers.users import handle_create_user, handle_get_user
from app.schema.user import UserIn, UserOut
from app.dependencies.auth import get_current_user

router = APIRouter(
    prefix="/user",
    dependencies=[Depends(get_current_user)]
)


@router.get("/{user_id}")
def get_user(user_id: Annotated[str, Path()]) -> UserOut:
    return handle_get_user(user_id)


@router.post("")
def create_user(user_input: Annotated[UserIn, Body()]):
    handle_create_user(user_input)
