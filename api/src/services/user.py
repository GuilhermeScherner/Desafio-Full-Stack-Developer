from typing import Optional, Any

from src.db.repositories.base import BaseRepository
from src.services.base import BaseService
from passlib.context import CryptContext

import src.services.models.user as user_models
from src.services.exceptions.exceptions import NotFound, Unauthorized, ErrorCodeEnum
from src.services.token import TokenService


class UserService(BaseService):
    def __init__(self, repository: BaseRepository, pwd_context: CryptContext):
        super().__init__(repository)
        self.pwd_context = pwd_context

    def verify_password(self, plain_password, hashed_password) -> bool:
        return self.pwd_context.verify(plain_password, hashed_password)

    def verification_user(self, user: Optional[Any], password: str) -> None:
        if not user:
            raise NotFound("user not found")
        valid_password = self.verify_password(password, user['password'])
        if not valid_password:
            raise Unauthorized(ErrorCodeEnum.VALIDATION_ERROR, "error password")

    async def login(self, username: str, password: str) -> user_models.TokenUserResponse:
        exists_user = await self.repository.get_by_generic({"email": username})
        self.verification_user(exists_user, password)

        access_token = TokenService.encode_jwt(exists_user)
        return user_models.TokenUserResponse(
            access_token=access_token, token_type="bearer"
        )
