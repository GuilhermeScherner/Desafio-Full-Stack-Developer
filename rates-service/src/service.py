from apscheduler.schedulers.asyncio import AsyncIOScheduler
from src.config import settings
from src.clients.api.client import ApiClient
from src.clients.cryptocompare.client import CryptoCompareClient
import asyncio


class RatesService:
    def __init__(self):
        self.scheduler = AsyncIOScheduler()
        self.cryptocompare_client = CryptoCompareClient()
        self.api_client = ApiClient()

    def _build_rates(self, data):
        symbol, info = data

        prices = {k: {
            "price": v["PRICE"],
            "change_24h": v["CHANGE24HOUR"]
        } for k, v in info.items()}

        return {
            "symbol": symbol,
            "prices": prices
        }

    async def update_rates(self):
        try:
            symbols = await self.api_client.fetch_symbols()
            symbols_list = [symbol['symbol'] for symbol in symbols]
            data = await self.cryptocompare_client.fetch_data(symbols_list)
            rates = list(map(self._build_rates, data['RAW'].items()))
            result = await self.api_client.update_rates(rates)
            return result
        except Exception as e:
            Exception(e)

    def stop(self):
        self.scheduler.shutdown()

    def start(self):
        self.scheduler.add_job(self.update_rates, 'interval', seconds=settings.FETCH_INTERVAL_SEC)
        self.scheduler.start()


def main():
    service = RatesService()
    service.start()

    loop = asyncio.get_event_loop()
    try:
        loop.run_forever()
    except KeyboardInterrupt:
        pass
    finally:
        service.stop()
        loop.close()

