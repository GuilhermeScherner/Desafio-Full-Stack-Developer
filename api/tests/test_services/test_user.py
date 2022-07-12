import os
import pytest
from pytest_mock import MockerFixture
from starlette.testclient import TestClient
from api.dependencies.common import pwd_context
from db.repositories.base import BaseRepository
from db.repositories.user import UserRepository
from services.user import UserService

pytestmark = pytest.mark.asyncio

TOKEN = os.environ['TOKEN']


@pytest.mark.parametrize(
    "data,expected_response",
    [
        (None, {"access_token": TOKEN, "token_type": "bearer"}),
    ],
)
async def test_login(client: TestClient, get_db, data, expected_response, mocker: MockerFixture):
    mocker.patch("src.services.token.TokenService.encode_jwt", return_value=TOKEN)
    repo: BaseRepository = UserRepository(db=get_db)
    service = UserService(repo, pwd_context)
    mocker.patch.object(repo, "get_by_generic", return_value={})
    mocker.patch.object(service, "verification_user", return_value=None)
    result = await service.login("username", "password")
    assert result.dict() == expected_response

