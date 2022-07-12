from fastapi import APIRouter, Depends
from typing import List, Optional

import src.services.models.rates as app_models
from src.api.dependencies.common import get_current_user
from src.services.rates import RatesService
from src.api.dependencies.services import rates_service

router = APIRouter()


@router.get("/symbols", response_model=List[app_models.ListSymbolsResponse], dependencies=[Depends(get_current_user)])
async def list_symbols(
    model_list_symbol: app_models.ListSymbolsRequest = Depends(), service: RatesService = Depends(rates_service)
) -> List[app_models.ListSymbolsResponse]:
    return await service.list_symbols(model_list_symbol)


@router.post("", response_model=app_models.AddRatesResponse, dependencies=[Depends(get_current_user)])
async def add_rates(
    rates: app_models.AddRatesRequest, service: RatesService = Depends(rates_service)
) -> app_models.AddRatesResponse:
    return await service.add_rates(rates)


@router.get("", response_model=List[Optional[app_models.ListRatesResponse]], dependencies=[Depends(get_current_user)])
async def list_rates(service: RatesService = Depends(rates_service)) -> List[Optional[app_models.ListRatesResponse]]:
    return await service.list_rates()


@router.patch("")
async def update_rates(
    rates: List[app_models.UpdateRatesRequest], service: RatesService = Depends(rates_service)
):
    return await service.update_rates(rates)
