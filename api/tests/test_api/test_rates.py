from typing import Dict

import pytest
from pytest_mock import MockerFixture
from starlette.testclient import TestClient

import src.services.user

pytestmark = pytest.mark.asyncio

result_list_symbols = [{"id": "321ew13dasda31312fbee5844b", "symbol": "BTC", "name": "bitcoin"}]


@pytest.mark.parametrize(
    "data,expected_status,expected_response",
    [
        ("", 200, result_list_symbols),
    ],
)
async def test_list_symbols(
    client: TestClient, headers: Dict, data, expected_status, expected_response, mocker: MockerFixture
):
    mocker.patch("src.services.rates.RatesService.list_symbols", return_value=result_list_symbols)
    response = client.get("/api/rates/symbols", headers=headers, data=data)
    assert response.status_code == expected_status
    assert response.json() == expected_response


result_add_rates = {"id": "321ew13dasda31312fbee5844b"}

required_params_add_rates = {
    "error": {
        "code": "validation-error",
        "details": [
            {
                "loc": ["body", "id"],
                "msg": "field required",
                "type": "value_error.missing",
            },
        ],
        "message": "validation error",
    }
}


@pytest.mark.parametrize(
    "data,expected_status,expected_response",
    [
        ({}, 422, required_params_add_rates),
        ({"id": "321ew13dasda31312fbee5844b"}, 200, result_add_rates),
    ],
)
async def test_add_rates(
    client: TestClient, headers: Dict, data, expected_status, expected_response, mocker: MockerFixture
):
    mocker.patch("src.services.rates.RatesService.add_rates", return_value=result_add_rates)
    response = client.post("/api/rates", headers=headers, json=data)
    assert response.status_code == expected_status
    assert response.json() == expected_response


result_list_rates = [{"symbol": "BTC", "name": "bitcoin", "price": 0.00, "change_24h": 0.00}]


@pytest.mark.parametrize(
    "data,expected_status,expected_response",
    [
        (None, 200, result_list_rates),
    ],
)
async def test_list_rates(
    client: TestClient, headers: Dict, data, expected_status, expected_response, mocker: MockerFixture
):
    mocker.patch("src.services.rates.RatesService.list_rates", return_value=result_list_rates)
    response = client.get("/api/rates", headers=headers, data=data)
    assert response.status_code == expected_status
    assert response.json() == expected_response


required_params_update_rates = {
    "error": {
        "code": "validation-error",
        "details": [{"loc": ["body"], "msg": "field required", "type": "value_error.missing"}],
        "message": "validation error",
    }
}


@pytest.mark.parametrize(
    "data,expected_status,expected_response",
    [
        (None, 422, required_params_update_rates),
        (
            [
                {
                    "symbol": "BTC",
                    "prices": {
                        "USD": {"price": 0.00, "change_24h": 0.0},
                    },
                }
            ],
            200,
            None,
        ),
    ],
)
async def test_update_rates(
    client: TestClient, headers: Dict, data, expected_status, expected_response, mocker: MockerFixture
):
    mocker.patch("src.services.rates.RatesService.update_rates", return_value=None)
    response = client.patch("/api/rates", headers=headers, json=data)
    assert response.status_code == expected_status
    assert response.json() == expected_response
