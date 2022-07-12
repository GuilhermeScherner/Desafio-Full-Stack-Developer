import axios from "../axios-config";

export type ListRatesResponse = {
  symbol: string;
  name: string;
  price: number;
  change_24h: number;
}[];

export const listRates = (): Promise<ListRatesResponse> => {
  return axios.get("/rates");
};
