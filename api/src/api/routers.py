from fastapi import APIRouter
from src.api.controllers import rates, user


def include_routers(api: APIRouter):
    api.include_router(rates.router, prefix="/rates", tags=["rates"])
    api.include_router(user.router, prefix="/user", tags=["user"])