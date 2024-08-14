from app.schema.user import UserModel
from app.db.config.db import users
from bson import ObjectId
from app.schema.mappers.users import to_model, from_db_to_model_dict


def get_user_by_id(id: str) -> UserModel:
    user = users.find_one(ObjectId(id))
    if user is None:
        return None
    return to_model(from_db_to_model_dict(user))


def get_user_by_email(email: str) -> UserModel:
    user = users.find_one({"email": email})

    if user is None:
        return None

    return to_model(from_db_to_model_dict(user))


def save_user(user: UserModel):
    user_dict = dict(user)
    del user_dict['id']
    users.insert_one(user_dict)
