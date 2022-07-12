import os
import pytest
from pytest_mock import MockerFixture
from starlette.testclient import TestClient

pytestmark = pytest.mark.asyncio

TOKEN = os.environ['TOKEN']

required_params = {
    "error": {
        "code": "validation-error",
        "details": [
            {
                "loc": ["body", "grant_type"],
                "msg": "field required",
                "type": "value_error.missing",
            },
            {
                "loc": ["body", "username"],
                "msg": "field required",
                "type": "value_error.missing",
            },
            {
                "loc": ["body", "password"],
                "msg": "field required",
                "type": "value_error.missing",
            },
        ],
        "message": "validation error",
    }
}
grant_type_required = {
    "error": {
        "code": "validation-error",
        "details": [
            {
                "loc": ["body", "grant_type"],
                "msg": "field required",
                "type": "value_error.missing",
            },
        ],
        "message": "validation error",
    }
}

grant_type_incorrect = {
    "error": {
        "code": "validation-error",
        "details": [
            {
                "loc": ["body", "grant_type"],
                "msg": 'string does not match regex "password"',
                "type": "value_error.str.regex",
                "ctx": {"pattern": "password"},
            }
        ],
        "message": "validation error",
    }
}

response_login = {
    "access_token": TOKEN,
    "token_type": "bearer"
}


@pytest.mark.parametrize(
    "data,expected_status,expected_response",
    [
        (None, 422, required_params),
        ({"username": "email@email.com", "password": "password"}, 422, grant_type_required),
        (
            {"username": "email@email.com", "password": "password", "grant_type": "incorrect"},
            422,
            grant_type_incorrect,
        ),
        (
            {"username": "email@email.com", "password": "password", "grant_type": "password"},
            200,
            {
                "access_token": TOKEN,
                "token_type": "bearer",
            },
        ),
    ],
)
async def test_login(client: TestClient, data, expected_status, expected_response, mocker: MockerFixture):
    mocker.patch("src.services.user.UserService.login", return_value=response_login)
    response = client.post("/api/user/token", data=data)
    assert response.status_code == expected_status
    assert response.json() == expected_response

