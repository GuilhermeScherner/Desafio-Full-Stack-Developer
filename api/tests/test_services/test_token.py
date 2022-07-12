import os

import jwt
import pytest
from pytest_mock import MockerFixture
from starlette.testclient import TestClient
from services.token import TokenService

pytestmark = pytest.mark.asyncio

TOKEN = os.environ["TOKEN"]
JWT_SECRET = os.environ["JWT_SECRET"]
ACCESS_TOKEN_ALGORITHM = os.environ["ACCESS_TOKEN_ALGORITHM"]


@pytest.mark.parametrize(
    "data,expected_response",
    [
        ({"email": "email", "name": "name", "_id": "id"}, TOKEN),
    ],
)
async def test_encode_jwt(client: TestClient, get_db, data, expected_response, mocker: MockerFixture):
    mocker.patch("jwt.encode", return_value=TOKEN)
    service = TokenService()
    result = service.encode_jwt(user=data, algorithm=ACCESS_TOKEN_ALGORITHM, key=JWT_SECRET)
    assert result == expected_response


@pytest.mark.parametrize(
    "data,expected_response",
    [
        (TOKEN, {"email": "email", "name": "name", "id": "_id"}),
    ],
)
async def test_decode_jwt(client: TestClient, get_db, data, expected_response, mocker: MockerFixture):
    mocker.patch("jwt.decode", return_value=expected_response)
    service = TokenService()
    result = service.decode_jwt(data)
    assert result == expected_response
