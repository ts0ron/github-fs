from app.schema.user import UserIn, UserModel, UserOut
from app.dependencies.auth import generate_hash
from app.db.dao.users import save_user, get_user_by_id
from fastapi import HTTPException, status


def handle_create_user(user_input: UserIn):
    hashed_pass = generate_hash(user_input.password)

    user_to_create = UserModel(email=user_input.email,
                               last_name=user_input.last_name,
                               first_name=user_input.first_name,
                               hashed_password=hashed_pass)
    save_user(dict(user_to_create))


def handle_get_user(user_id: str):
    user = get_user_by_id(user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    user_output = UserOut(**dict(user))
    return user_output
