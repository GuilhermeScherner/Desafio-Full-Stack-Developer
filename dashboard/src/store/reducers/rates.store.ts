import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatusEnum } from "../enums";
import { apiClient } from "services";
import { AsyncOperationType, ResponseStoreType } from "../interfaces";
import {
  ListSymbolRequest,
  ListSymbolResponse,
} from "services/apiClient/rates/list-symbols";
import {
  AddRatesRequest,
  AddRatesResponse,
} from "services/apiClient/rates/add-rates";
import { ListRatesResponse } from "services/apiClient/rates/list-rates";

export const listSymbolsThunk = createAsyncThunk(
  "rates/list-symbol",
  async (request: ListSymbolRequest, { rejectWithValue }) => {
    return await apiClient.rates.listSymbols(request).catch((err) => {
      if (!err.response) throw err;
      else return rejectWithValue(err.response.data);
    });
  }
);

export const addRatesThunk = createAsyncThunk(
  "rates/add-rates",
  async (request: AddRatesRequest, { rejectWithValue }) => {
    return await apiClient.rates.addRates(request).catch((err) => {
      if (!err.response) throw err;
      else return rejectWithValue(err.response.data);
    });
  }
);

export const listRatesThunk = createAsyncThunk(
  "rates/list-rates",
  async (request: void, { rejectWithValue }) => {
    return await apiClient.rates.listRates().catch((err) => {
      if (!err.response) throw err;
      else return rejectWithValue(err.response.data);
    });
  }
);

type RatesStoreType = {
  listSymbolsState: AsyncOperationType<ListSymbolResponse>;
  addRatesState: AsyncOperationType<AddRatesResponse>;
  listRatesState: AsyncOperationType<ListRatesResponse>;
};

const initialState: RatesStoreType = {
  listSymbolsState: {
    status: RequestStatusEnum.IDLE,
  },
  addRatesState: {
    status: RequestStatusEnum.IDLE,
  },
  listRatesState: {
    status: RequestStatusEnum.IDLE,
  },
};
const Rates = createSlice({
  name: "RatesSlice",
  initialState: () => initialState,
  reducers: {
    listSymbolsReset(state) {
      state.listSymbolsState.status = RequestStatusEnum.IDLE;
      state.listSymbolsState.errorMessage = undefined;
    },
    addRatesReset(state) {
      state.addRatesState.status = RequestStatusEnum.IDLE;
      state.addRatesState.errorMessage = undefined;
    },
    listRatesReset(state) {
      state.listRatesState.status = RequestStatusEnum.IDLE;
      state.listRatesState.errorMessage = undefined;
    },
    listSymbolsDataReset(state) {
      state.listSymbolsState.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        listSymbolsThunk.fulfilled,
        (state, action: ResponseStoreType) => {
          state.listSymbolsState.status = RequestStatusEnum.SUCCESS;
          state.listSymbolsState.data = action.payload;
        }
      )
      .addCase(
        listSymbolsThunk.rejected,
        (state, action: ResponseStoreType) => {
          state.listSymbolsState.status = RequestStatusEnum.FAILED;
          state.listSymbolsState.errorMessage =
            action?.payload?.message ?? "Erro interno";
        }
      )
      .addCase(listSymbolsThunk.pending, (state) => {
        state.listSymbolsState.status = RequestStatusEnum.LOADING;
      })
      .addCase(addRatesThunk.fulfilled, (state, action: ResponseStoreType) => {
        state.addRatesState.status = RequestStatusEnum.SUCCESS;
        state.addRatesState.data = action.payload;
      })
      .addCase(addRatesThunk.rejected, (state, action: ResponseStoreType) => {
        state.addRatesState.status = RequestStatusEnum.FAILED;
        state.addRatesState.errorMessage =
          action?.payload?.message ?? "Erro interno";
      })
      .addCase(addRatesThunk.pending, (state) => {
        state.addRatesState.status = RequestStatusEnum.LOADING;
      })
      .addCase(listRatesThunk.fulfilled, (state, action: ResponseStoreType) => {
        state.listRatesState.status = RequestStatusEnum.SUCCESS;
        state.listRatesState.data = action.payload;
      })
      .addCase(listRatesThunk.rejected, (state, action: ResponseStoreType) => {
        state.listRatesState.status = RequestStatusEnum.FAILED;
        state.listRatesState.errorMessage =
          action?.payload?.message ?? "Erro interno";
      })
      .addCase(listRatesThunk.pending, (state) => {
        state.listRatesState.status = RequestStatusEnum.LOADING;
      });
  },
});

export const {
  listSymbolsReset,
  listRatesReset,
  addRatesReset,
  listSymbolsDataReset,
} = Rates.actions;

export const RatesReducer = Rates.reducer;
