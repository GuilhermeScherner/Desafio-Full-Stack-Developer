from typing import Dict, Optional, List
from pymongo import UpdateOne

from src.db.repositories.base import BaseRepository
from bson import ObjectId


class RatesRepository(BaseRepository):
    async def get_by_generic(self, batch: Dict) -> Optional[Dict]:
        collection = self.db.rates
        result = await collection.find_one(batch)
        return result

    async def get_all(self) -> List[Dict]:
        collection = self.db.rates
        cursor = collection.find({})
        result = [document async for document in cursor]
        return result

    async def update(self, dict_updates: List[Dict]) -> None:
        collection = self.db.rates
        list_bulk_write = [
            UpdateOne({"symbol": rate["symbol"]}, {"$set": {"prices": rate["prices"]["USD"]}}) for rate in dict_updates
        ]
        await collection.bulk_write(list_bulk_write)

    async def active(self, id: str) -> Dict:
        collection = self.db.rates
        await collection.update_one({"_id": ObjectId(id)}, {"$set": {"active": True}})
        return {"id": id}
