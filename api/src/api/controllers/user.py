from fastapi.security import OAuth2PasswordRequestFormStrict
import src.services.models.user as user_models
from fastapi import APIRouter, Depends

from src.services.user import UserService
from src.api.dependencies.services import user_service

router = APIRouter()


@router.post(
    "/token",
    response_model=user_models.TokenUserResponse,
    name="User: login",
)
async def login(
    form_data: OAuth2PasswordRequestFormStrict = Depends(), service: UserService = Depends(user_service)
) -> user_models.TokenUserResponse:
    response = await service.login(form_data.username, form_data.password)

    return response

