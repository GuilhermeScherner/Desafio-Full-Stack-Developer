from motor.motor_asyncio import AsyncIOMotorClient
from src.config import settings

client = AsyncIOMotorClient(str(settings.DATABASE_URL))