from fastapi import Depends
from src.api.dependencies.common import get_db, pwd_context
from src.db.repositories.base import BaseRepository
from src.db.repositories.user import UserRepository
from src.db.repositories.rates import RatesRepository
from src.services.rates import RatesService
from src.services.user import UserService


def rates_service(db=Depends(get_db)):
    repo: BaseRepository = RatesRepository(db)
    return RatesService(repo)


def user_service(db=Depends(get_db)):
    repo: BaseRepository = UserRepository(db)
    return UserService(repo, pwd_context)
