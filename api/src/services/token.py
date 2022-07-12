from typing import Any, Dict, Optional, Union

import jwt

from src.services.exceptions.exceptions import Unauthorized, NotFound, ErrorCodeEnum
from src.config import settings


class TokenService:
    @staticmethod
    def encode_jwt(user: Dict[str, Any], key: Any = settings.JWT_SECRET, algorithm: Any = settings.ACCESS_TOKEN_ALGORITHM) -> bytes:
        payload = {
            "email": user["email"],
            "name": user["name"],
            "id": str(user["_id"]),
        }
        token = jwt.encode(payload, key, algorithm)
        return token

    @staticmethod
    def decode_jwt(token: str) -> Optional[Dict]:
        try:
            decoded = jwt.decode(jwt=token, key=settings.JWT_SECRET, algorithms=[settings.ACCESS_TOKEN_ALGORITHM])
            if decoded:
                return decoded
            raise NotFound("Not found token")
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
            raise Unauthorized(ErrorCodeEnum.VALIDATION_ERROR, "token unauthorized")
