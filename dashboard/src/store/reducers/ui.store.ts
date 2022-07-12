import { createSlice } from "@reduxjs/toolkit";

type UIState = {
  loading: boolean;
};

const initialState: UIState = {
  loading: false,
};

const UI = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = UI.actions;

export const UIReducer = UI.reducer;
