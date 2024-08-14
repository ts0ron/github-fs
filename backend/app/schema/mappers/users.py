from app.schema.user import UserOut, UserModel


def individual_serial(user) -> dict:
    return {
        "id": str(user["_id"]),
        "first_name": user["first_name"],
        "last_name": user["last_name"],
        "email": user["email"]
    }


def from_db_to_model_dict(user: dict):
    mapped_user = {
        "id": str(user['_id']),
        "first_name": user['first_name'],
        "last_name": user['last_name'],
        "email": user['email'],
        "hashed_password": user['hashed_password']
    }
    return mapped_user


def to_model(user: dict) -> UserModel:
    model_user = UserModel(**dict(user))

    return model_user


def list_serial(users) -> list:
    return [individual_serial(user) for user in users]


def dict_to_user_output(user: dict) -> UserOut:
    return UserOut(**user)
