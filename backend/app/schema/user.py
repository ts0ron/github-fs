from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    email: EmailStr
    first_name: str | None = None
    last_name: str | None = None


class UserIn(UserBase):
    password: str


class UserOut(UserBase):
    id: str


class UserModel(UserBase):
    id: str | None = None
    hashed_password: str

