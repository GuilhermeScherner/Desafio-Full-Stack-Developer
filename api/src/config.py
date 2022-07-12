from pydantic import AnyUrl, BaseSettings
from typing import List


class Settings(BaseSettings):
    PORT: int = 8000
    DATABASE_URL: AnyUrl
    ALLOWED_HOSTS: List[str] = ["*"]
    SELF_URL: AnyUrl
    JWT_SECRET: str = "3f3b1c8cc1463658059931652ad929b7e2c9f8b4fe804a2fc87d63ba3dcc4fb8"
    ACCESS_TOKEN_ALGORITHM: str = "HS256"


settings = Settings(_env_file='.env')
