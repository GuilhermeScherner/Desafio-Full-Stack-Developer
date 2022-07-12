from typing import Dict, List, Optional

from src.db.repositories.base import BaseRepository
from pymongo import UpdateOne


class UserRepository(BaseRepository):
    async def get_by_generic(self, batch: Dict) -> Optional[Dict]:
        collection = self.db.user
        result = await collection.find_one(batch)
        return result

    async def get_all(self) -> List[Dict]:
        collection = self.db.user
        cursor = collection.find_one({})
        result = [document async for document in cursor]
        return result

    async def insert(self, batch: Dict) -> Dict:
        collection = self.db.user
        await collection.insert_one(batch)
        result = await collection.find_one({"email": batch["email"]})
        return result

    async def update(self, dict_updates: List[Dict]) -> None:
        collection = self.db.user
        list_bulk_write = [UpdateOne({"id": user["id"]}, {"$set": {user}}) for user in dict_updates]
        await collection.bulk_write(list_bulk_write)

    async def active(self, id: str) -> Dict:
        collection = self.db.user
        await collection.update_one({"i": id}, {"$set": {"active": "true"}})
        new_document = await collection.find_one({"i": id})
        return {"id": new_document["_id"]}
