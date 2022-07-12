import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "services";
import { LoginRequest, LoginResponse } from "services/apiClient/user/login";
import { AsyncOperationType, ResponseStoreType } from "../interfaces";
import { RequestStatusEnum } from "../enums";
import { parseJWT } from "helpers";

export const loginThunk = createAsyncThunk(
  "user/login",
  async (request: LoginRequest, { rejectWithValue }) => {
    return await apiClient.user.login(request).catch((err: any) => {
      if (!err.response) throw err;
      else return rejectWithValue(err.response.data);
    });
  }
);

type UserStoreType = {
  loginState: AsyncOperationType<LoginResponse>;
};

const initialState: UserStoreType = {
  loginState: {
    status: RequestStatusEnum.IDLE,
  },
};

const User = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    loginReset(state) {
      state.loginState.status = RequestStatusEnum.IDLE;
      state.loginState.errorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action: ResponseStoreType) => {
        state.loginState.status = RequestStatusEnum.SUCCESS;
        state.loginState.data = action.payload;
        const { email, name } = parseJWT(action.payload?.access_token ?? "");
        localStorage.setItem(
          "userData",
          JSON.stringify({
            name,
            email,
            accessToken: action.payload?.access_token ?? "",
            isAuthenticated: true,
          })
        );
      })
      .addCase(loginThunk.rejected, (state, action: ResponseStoreType) => {
        state.loginState.status = RequestStatusEnum.FAILED;
        state.loginState.errorMessage =
          action?.payload?.message ?? "Erro interno";
      })
      .addCase(loginThunk.pending, (state) => {
        state.loginState.status = RequestStatusEnum.LOADING;
      });
  },
});

export const { loginReset } = User.actions;

export const UserReducer = User.reducer;
