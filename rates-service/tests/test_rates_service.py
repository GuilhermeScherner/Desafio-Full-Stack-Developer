import pytest
from pytest_mock import MockerFixture

from src.service import RatesService

pytestmark = pytest.mark.asyncio


async def test_update_rates(mocker: MockerFixture):
    service = RatesService()
    mocker.patch("src.clients.api.client.ApiClient.fetch_symbols", return_value={})
    mocker.patch(
        "src.clients.cryptocompare.client.CryptoCompareClient.fetch_data",
        return_value={"RAW": {"BTC": {"USD": {"PRICE": 0.00, "CHANGE24HOUR": 0.00}}}},
    )
    mocker.patch("src.clients.api.client.ApiClient.update_rates", return_value={})
    await service.update_rates()
    assert True
