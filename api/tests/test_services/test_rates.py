import os
import pytest
from pytest_mock import MockerFixture
from starlette.testclient import TestClient
from api.dependencies.common import pwd_context
from db.repositories.base import BaseRepository
from db.repositories.rates import RatesRepository
from services.models.rates import ListSymbolsRequest, AddRatesRequest, UpdateRatesRequest, UpdateRatesPricesRequest
from services.rates import RatesService

pytestmark = pytest.mark.asyncio


@pytest.mark.parametrize(
    "data,expected_response",
    [
        (None, [{"id": "321ew13dasda31312fbee5844b", "symbol": "BTC", "name": "bitcoin"}]),
        ("e", []),
    ],
)
async def test_list_symbols(client: TestClient, get_db, data, expected_response, mocker: MockerFixture):
    repo: BaseRepository = RatesRepository(db=get_db)
    mocker.patch.object(
        repo, "get_all", return_value=[{"_id": "321ew13dasda31312fbee5844b", "symbol": "BTC", "name": "bitcoin"}]
    )
    service = RatesService(repo)
    model_list_symbol = ListSymbolsRequest(query=data)
    result = await service.list_symbols(model_list_symbol)
    assert [value.__dict__ for value in result] == expected_response


@pytest.mark.parametrize(
    "data,expected_response",
    [
        (None, [{"change_24h": 0.0, "name": "bitcoin", "price": 0.0, "symbol": "BTC"}]),
    ],
)
async def test_list_rates(client: TestClient, get_db, data, expected_response, mocker: MockerFixture):
    repo: BaseRepository = RatesRepository(db=get_db)
    mocker.patch.object(
        repo,
        "get_all",
        return_value=[{"_id": "321ew13dasda31312fbee5844b", "symbol": "BTC", "name": "bitcoin", "active": True}],
    )
    service = RatesService(repo)
    result = await service.list_rates()
    assert [value.__dict__ for value in result] == expected_response


@pytest.mark.parametrize(
    "data,expected_response",
    [
        ("62c6eb5c8832e77fbee5844e", {"id": "62c6eb5c8832e77fbee5844e"}),
    ],
)
async def test_add_rates(client: TestClient, get_db, data, expected_response, mocker: MockerFixture):
    repo: BaseRepository = RatesRepository(db=get_db)
    mocker.patch.object(
        repo,
        "get_by_generic",
        return_value=None,
    )
    mocker.patch.object(
        repo,
        "active",
        return_value={"id": data},
    )
    service = RatesService(repo)
    model = AddRatesRequest(id=data)
    result = await service.add_rates(model)
    assert result.dict() == expected_response


@pytest.mark.parametrize(
    "data,expected_response",
    [
        (None, None),
    ],
)
async def test_add_rates(client: TestClient, get_db, data, expected_response, mocker: MockerFixture):
    repo: BaseRepository = RatesRepository(db=get_db)
    mocker.patch.object(
        repo,
        "update",
        return_value=None,
    )
    service = RatesService(repo)
    model = [UpdateRatesRequest(symbol="BTC", prices={"USD": UpdateRatesPricesRequest(price=0.00, change_24h=0.0)})]
    await service.update_rates(model)
    assert True
