from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
import os

from mongomock_motor import AsyncMongoMockClient
import pytest
from starlette.testclient import TestClient
from fastapi import FastAPI

from db.repositories.user import UserRepository
from services.user import UserService
from src.main import get_application
from httpx import AsyncClient

TOKEN = os.environ['TOKEN']


@pytest.fixture
def authorization_prefix():
    return "bearer"


@pytest.fixture
def app() -> FastAPI:
    from src.main import get_application

    return get_application()


@pytest.fixture
def client(app: FastAPI):
    client = TestClient(app=app, base_url="http://testserver")
    yield client


@pytest.fixture
async def headers(authorization_prefix: str) -> AsyncClient:
    headers = {
        "Content-Type": "application/json",
        f"Authorization": f"{authorization_prefix} {TOKEN}",
    }
    return headers



@pytest.fixture
def client_motor():
    return AsyncMongoMockClient()


@pytest.fixture
def get_db(client_motor):
    return client_motor


#
# @pytest.fixture
# def user_service(db):
#     aa = UserRepository(client_motor)
#     return UserService()