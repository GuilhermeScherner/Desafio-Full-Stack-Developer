import { Action, CombinedState, Dispatch, Store } from "@reduxjs/toolkit";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { RootState } from "store";
import axiosConfig from "./axios-config";

const unauthorizedRoutes = ["/user/token"];

export const setupInterceptors = (
  store: Store<CombinedState<RootState>, Action> & {
    dispatch: Dispatch<any>;
  }
) => {
  axiosConfig.interceptors.request.use((config: AxiosRequestConfig) => {
    return new Promise<AxiosRequestConfig>((res, rej) => {
      if (
        unauthorizedRoutes.some((route) => route.includes(config.url ?? ""))
      ) {
        res(config);
        return;
      }
      const userData = JSON.parse(localStorage.userData);
      if (userData?.accessToken) {
        if (config?.headers)
          config.headers.Authorization = `Bearer ${userData.accessToken}`;
      }
      res(config);
    });
  });

  axiosConfig.interceptors.response.use((response: AxiosResponse) => {
    return response;
  });
};
