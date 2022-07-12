from typing import List, Dict

from src.clients.base_http import BaseHttpClient
from src.config import settings
from httpx_auth import Basic


class ApiClient(BaseHttpClient):
    def __init__(self):
        super().__init__(settings.API_URL)

    async def fetch_symbols(self):
        async with self.client() as client:
            res = await client.get("api/rates/symbols", headers={"Authorization": f"Bearer {settings.TOKEN}"})
            return res.json()

    async def update_rates(self, payload: List[Dict]):
        async with self.client() as client:
            res = await client.patch("api/rates", json=payload, headers={"Authorization": f"Bearer {settings.TOKEN}"})
            return res.json()

