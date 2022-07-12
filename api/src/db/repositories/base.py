import abc
from typing import Dict, Optional, List

from motor.motor_asyncio import AsyncIOMotorClient


class BaseRepository(metaclass=abc.ABCMeta):
    def __init__(self, db: AsyncIOMotorClient):
        self.db = db.test

    def __aiter__(self):
        return self

    @abc.abstractmethod
    async def get_by_generic(self, batch: Dict) -> Optional[Dict]:
        pass

    @abc.abstractmethod
    async def get_all(self) -> List[Dict]:
        pass

    @abc.abstractmethod
    async def update(self, dict_updates: List[Dict]) -> None:
        pass

    @abc.abstractmethod
    async def active(self, id: str) -> Dict:
        pass

