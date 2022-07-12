from pydantic import BaseModel


class UserLoginResponse(BaseModel):
    id: str
    name: str


class User(BaseModel):
    email: str
    id: str
    name: str


class TokenUserResponse(BaseModel):
    access_token: str
    token_type: str
