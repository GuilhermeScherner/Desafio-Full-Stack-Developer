from typing import Optional, Any

from src.config import settings
from src.db.database import client
from fastapi.param_functions import Depends
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext

from src.services.exceptions.exceptions import NotFound, InternalServerError, ErrorCodeEnum
from src.services.models.user import User
from src.services.token import TokenService

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.SELF_URL}/user/token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    payload = TokenService.decode_jwt(token)
    if payload:
        user_id: Optional[Any] = payload.get("id")
        email: Optional[Any] = payload.get("email")
        name: Optional[Any] = payload.get("name")

        if user_id is None:
            raise NotFound("user not found")

        return User(id=user_id, email=email, name=name)
    else:
        raise InternalServerError(ErrorCodeEnum.INTERNAL_SERVER_ERROR, "error")


async def get_db():
    return client
