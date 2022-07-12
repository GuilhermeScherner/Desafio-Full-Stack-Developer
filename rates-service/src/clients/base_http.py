from contextlib import asynccontextmanager
import httpx

class BaseHttpClient:
    def __init__(self, base_url):
        self.base_url = base_url

    @asynccontextmanager
    async def client(self):
        try:
            client = httpx.AsyncClient(base_url=self.base_url)
            yield client
        finally:
            await client.aclose()

