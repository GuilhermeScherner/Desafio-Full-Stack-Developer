from pydantic import BaseModel
from typing import Dict, Optional
from uuid import UUID


class UpdateRatesPricesRequest(BaseModel):
    price: float
    change_24h: float


class UpdateRatesRequest(BaseModel):
    symbol: str
    prices: Dict[str, UpdateRatesPricesRequest]


class UpdateRatesResponse(BaseModel):
    id: UUID


class ListSymbolsRequest(BaseModel):
    query: Optional[str]


class AddRatesRequest(BaseModel):
    id: str


class AddRatesResponse(BaseModel):
    id: str


class ListRatesResponse(BaseModel):
    symbol: Optional[str]
    name: Optional[str]
    price: Optional[float]
    change_24h: Optional[float]


class ListSymbolsResponse(BaseModel):
    id: str
    symbol: str
    name: str
