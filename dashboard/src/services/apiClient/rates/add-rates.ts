import axios from "../axios-config";

export type AddRatesRequest = {
  id: string;
};

export type AddRatesResponse = {
  name: string;
};

export const addRates = (
  request: AddRatesRequest
): Promise<AddRatesResponse> => {
  return axios.post("/rates", request);
};
