from src.clients.base_http import BaseHttpClient
from src.config import settings
from typing import List


class CryptoCompareClient(BaseHttpClient):
    def __init__(self):
        super().__init__(settings.CRYPTOCOMPARE_API_URL)

    async def fetch_data(self, symbols: List[str], tsyms=None):
        async with self.client() as client:
            params = {
                "fsyms": symbols,
                "tsyms": tsyms or "USD,BRL"
            }

            res = await client.get("/data/pricemultifull", params=params)
            return res.json()
