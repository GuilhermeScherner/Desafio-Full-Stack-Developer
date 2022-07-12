from typing import List, Optional

from src.services.base import BaseService
import src.services.models.rates as app_models


class RatesService(BaseService):
    async def update_rates(self, rates: List[app_models.UpdateRatesRequest]) -> None:
        updated_rates = [rate.dict(include={"symbol", "prices"}) for rate in rates]
        await self.repository.update(updated_rates)

    async def add_rates(self, rates: app_models.AddRatesRequest) -> app_models.AddRatesResponse:
        exists_symbol = await self.repository.get_by_generic({"_id": rates.id})
        if exists_symbol:
            raise Exception("Symbol already exists")

        result = await self.repository.active(id=rates.id)
        if not result:
            raise Exception("Error in add symbol")
        return app_models.AddRatesResponse(id=str(result["id"]))

    async def list_rates(self) -> List[Optional[app_models.ListRatesResponse]]:
        all_rates = await self.repository.get_all()
        result = [
            app_models.ListRatesResponse(
                symbol=rate["symbol"],
                name=rate["name"],
                price=rate['prices']["price"] if "prices" in rate.keys() else 0,
                change_24h=rate['prices']["change_24h"] if "prices" in rate.keys() else 0,
            )
            for rate in all_rates
            if rate["active"] == True
        ]
        return result

    async def list_symbols(
        self, model_list_symbol: app_models.ListSymbolsRequest
    ) -> List[app_models.ListSymbolsResponse]:
        all_rates = await self.repository.get_all()
        if model_list_symbol.query:
            result = [
                app_models.ListSymbolsResponse(id=str(rate["_id"]), symbol=rate["symbol"], name=rate["name"])
                for rate in all_rates
                if model_list_symbol.query in rate["name"] and rate['active'] == False
            ]
        else:
            result = [
                app_models.ListSymbolsResponse(id=str(rate["_id"]), symbol=rate["symbol"], name=rate["name"])
                for rate in all_rates
            ]
        return result
