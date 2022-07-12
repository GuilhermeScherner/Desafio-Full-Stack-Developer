import axios from "../axios-config";

export type ListSymbolRequest = {
  query?: string;
};

export type ListSymbolResponse = {
  id: string;
  name: string;
  symbol: string;
}[];

export const listSymbols = (
  request: ListSymbolRequest
): Promise<ListSymbolResponse> => {
  return axios.get("/rates/symbols", { params: { ...request } });
};
